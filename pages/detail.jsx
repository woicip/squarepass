import 'tailwindcss/tailwind.css';
import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { decode } from 'js-base64';

// Context
import { PageContext } from './Context/Context.js';

// Fetchs
import FetchSurvey from './Fetchs/FetchSurvey.js';
import FetchGetDetail from './Fetchs/FetchGetDetail.js';

// Components
import MiniDelete from './Components/DetailParts/MiniDelete.jsx';
import DetailHeader from './Components/DetailParts/DetailHeader.jsx';
import Name from './Components/DetailParts/Name.jsx';
import Phrase from './Components/DetailParts/Phrase.jsx';
import Success from './Components/Screens/Success';

const SaveChanges = () => <button className="mt-[20px] w-full text-white mobile:text-[15px] font-bold py-[15px] rounded-[7px] bg-spblue animate-fadeInAnimate">Save Changes</button>

export default function Details(props){

    const { setCurrentPage, resetCurrentPage, state: { isLoggedIn, fetch_address }, setLoggedIn } = useContext(PageContext);

    useEffect(() => {
        setCurrentPage('detail');
        return function cleanup(){
            resetCurrentPage();
        }
    }, []);
    
    useEffect(() => {
        /*
            Function to check whether the user's access_token is still valid
            If it isn't setLoggedIn to false otherwise true 
        */ 

        const access_token = localStorage.getItem('squarepass_access_token');
        
        if(access_token === null){
            setLoggedIn(false);
            location.href = "/login";
        
        } else {
            FetchSurvey((result) => {
                !result.authorized ? location.href = "/login" : setLoggedIn(true);
            });
        }
    }, []);

    const [ secret, setSecret ] = useState([]);
    const [ thumbnailPath, setThumbnailPath ] = useState('');
    const [ showSuccess, setShowSuccess ] = useState(false);

    useEffect(() => {
        const xyzsec_id = localStorage.getItem('xyzsec_id');

        FetchGetDetail(xyzsec_id, (res) => {
            setSecret([...secret, res.result.detail]);
        });
    }, []);

    useEffect(() => {
        // This effect is to re-correct the URL endpoint of a server
        if(secret.length){
            const hostLastIndex = secret[0].platform_thumbnail.indexOf('/static');
            const thumbnail = secret[0].platform_thumbnail.slice(hostLastIndex, secret[0].platform_thumbnail.length);
            const path = `${process.env.API_URL}${thumbnail}`;
            setThumbnailPath(path);
        }
    }, [secret]);

    const [ showMiniDelete, setShowMiniDelete ] = useState(false);
    const showMiniDeleteHandler = () => showMiniDelete ? setShowMiniDelete(false) : setShowMiniDelete(true);

    function DeleteAccount(){
        const xyzsec_id = localStorage.getItem('xyzsec_id');

        const data = { data: { xyzsec_id } };
        const options = { 
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('squarepass_access_token')}` },
            body: JSON.stringify(data)
        };

        fetch(`${process.env.API_URL}/deleteSecret`, options).then(res => res.json())
            .then(res => {
                if(res.code === 200){
                    setShowSuccess(true);
                } else {
                    return;
                }
            })
    }
    

    if(isLoggedIn){
        if(showSuccess){
            return <Success title={`${secret[0].platform_name} Deleted`} desc="Success deleted the secret" page="/home" buttonName="Home" metaTitle="Success Deleted Secret" />

        } else {
            return (
                <section>
                    <Head>
                        <title>Detail</title>
                        <meta name="description" content="Login - Square Pass" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
    
                    { secret.length > 0 &&
                        <div>
                            <img src={thumbnailPath} alt={secret[0].platform_name} className="w-full mobile:w-screen animate-fadeInAnimate" />
                
                            { !showMiniDelete && <DetailHeader name={secret[0].platform_name} date={secret[0].date} showMiniDeleteHandler={showMiniDeleteHandler} /> }
                            { showMiniDelete &&  <MiniDelete showMiniDelete={showMiniDelete} showMiniDeleteHandler={showMiniDeleteHandler} Handler={DeleteAccount} /> }
                        
                
                            <div className="p-[20px]">
                                <Name name={secret[0].name} />
                                <Phrase password={decode(secret[0].phrase)} />
    
                                {/* <SaveChanges /> */}
                            </div>
                        </div>
                    }
                </section>
            );
        }

    } else {
        return null;
    }
}