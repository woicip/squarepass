import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';

// Context
import { PageContext } from './Context/Context';

// Fetch
import FetchSurvey from './Fetchs/FetchSurvey';
import FetchCreate from './Fetchs/FetchCreate';

// Components
import InputFullName from './Components/FormInput/InputFullName';
import InputPassword from './Components/FormInput/InputPassword';
import SubmitButton from './Components/Buttons/SubmitButton';
import PlatformPicks from './Components/CreateParts/PlatformPicks';
import PickedPlatform from './Components/CreateParts/PickedPlatform';
import Screen from './Components/Screens/Success';
import Finding from './Components/CreateParts/Finding';

export default function Create(props){

    // Initialize state navigatoin context
    const { setCurrentPage, resetCurrentPage, state: { isLoggedIn, platforms }, setLoggedIn, setSuccessContext } = useContext(PageContext);

    useEffect(() => {
        setCurrentPage('create');
        return () => resetCurrentPage();
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

    const [ name, setName ] = useState('');
    const [ phrase, setPhrase ] = useState('');
    const [ thumbnail, setThumbnail ] = useState('');
    const [ Icon, setIcon ] = useState('');
    const [ showCreateButton, setShowCreateButton ] = useState(false);
    const [ successCreate, setSuccessCreate ] = useState(false);
    const [ showFinding, setShowFinding ] = useState(false);

    const nameHandler = (nm) => setName(nm);
    const phraseHandler = (pass) => setPhrase(pass);

    const showFindingHandler = (value) => showFinding ? setShowFinding(false) : setShowFinding(true);

    const [ platformList, setPlatformList ] = useState([]);

    useEffect(() => {
        setPlatformList(platforms);
    }, []);

    const [ platformSearchResult, setPlatformSearchResult ] = useState([]);

    const [ showPlatform, setShowPlatform ] = useState(false);
    const [ userPlatformName, setUserPlatformName ] = useState('');
    const [ platformPick, setPlatformPick ] = useState({ 
        name: "", 
        icon: "/icons/Interface Edit Select Area Rectangle Dash Grey.svg", 
        thumbnail: "/platform/unknown-platform.svg" 
    });

    const userPlatformNameHandler = (value) => setUserPlatformName(value);

    function searchPlatformHandler(value){
        const platforms = platformList;

        const filtered = platforms.filter(platform => {
            const smallUserValue = value.toLocaleLowerCase();
            const smallLetterPlatform = platform.name.toLocaleLowerCase();
            return smallLetterPlatform.includes(smallUserValue);
        });

        setPlatformSearchResult(filtered);
    }

    function platformPickHandler(platform){ // platform pick handler
        const { name, icon, thumbnail } = platform;

        setPlatformPick(platform);
        setTimeout(() => setUserPlatformName(name), 5); // i wrote setTimeout function so that the userPlatformName is changed. 
        setPlatformSearchResult([]);
        setThumbnail(thumbnail);
        setIcon(icon);
    }

    function showPlatformHandler(){ // to toggle between show/not show a 
        showPlatform ? setShowPlatform(false) : setShowPlatform(true);
        showFindingHandler();
        userPlatformNameHandler(platformPick.name);
    }

    const Thumbnail = () => {

        if(showFinding){
            return <Finding />
            
        } else if (thumbnail.length < 1){
            return (
                <div className="h-[215px] flex flex-col items-center justify-center bg-[#5186CB]">
                    <p className="text-white text-[14px] font-semibold">No Platform Selected</p>
                </div>
            )
        } 
    }

    useEffect(() => {
        if(name.length > 0){
            if(phrase.length > 0){
                setShowCreateButton(true);
            } else {
                setShowCreateButton(false);
            }
        } else {
            setShowCreateButton(false);
        }

        return () => ""
    });

    function CreateSecretHandler(){
        FetchCreate({ platform_name: userPlatformName, platform_thumbnail: thumbnail, platform_icon: Icon, name, phrase }, () => {
            setSuccessCreate(true);
            setSuccessContext(true);
        });
    }

    if(isLoggedIn){
        if(successCreate){
            return <Screen title={`${platformPick.name} Added`} desc={name} page="/home" buttonName="Home" metaTitle="Secret Added" />
    
        } else {
            return (
                <section>
                    <Head>
                        <title>Create New</title>
                        <meta name="description" content="Login - Square Pass" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
        
                    <div className="w-full">
                        { <Thumbnail /> }
                        { !showFinding && <img src={thumbnail} className="w-full" /> }
                    </div>
        
                    <section className="relative pb-[100px]">
                        <section className=" p-[20px] bg-white">
                            <PickedPlatform name={userPlatformName} icon={platformPick.icon} showPlatformHandler={showPlatformHandler} userPlatformNameHandler={userPlatformNameHandler} searchPlatformHandler={searchPlatformHandler}>
                                { showPlatform && <PlatformPicks platformList={platformList} platformSearchResult={platformSearchResult} platformPickHandler={platformPickHandler} showPlatformHandler={showPlatformHandler}  /> }
                            </PickedPlatform>
            
                            <InputFullName title="Name" placeholder="E.g. username, email, phone" fullName={name} Handler={nameHandler} />
                            <InputPassword title="Phrase" placeholder="*********" password={phrase} PasswordHandler={phraseHandler} />
            
                            <div className="mt-[20px]">
                                { showCreateButton && <SubmitButton buttonName="Create Secret" handler={CreateSecretHandler} /> }
                            </div>
                        </section>
                    </section>
                </section>
            );
        }
    }

}