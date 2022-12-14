import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';

// Context
import { PageContext } from './Context/Context';

// Fetchs
import FetchSurvey from './Fetchs/FetchSurvey';
import FetchSecrets from './Fetchs/FetchSecrets';

// Components
import Account from './Components/HomeParts/Account';
import SquareAccount from './Components/HomeParts/SquareAccount';
import Search from './Components/HomeParts/Search';
import LoadingAccount from './Components/HomeParts/LoadingAccount';
import LoadingGrid from './Components/HomeParts/LoadingGrid';
import EmptyState from './Components/HomeParts/EmptyState';
import Unauthorized from './Components/Screens/Unauthorized';

function OldAccount(props){

    const { secret_id, platform_name, name, thumbnail } = props;

    function ClickHandler(e){
        localStorage.setItem('xyzsec_id', secret_id);
    }

    return (
        <Link href="/detail">
            <button className="w-full my-[12px] flex items-center py-[10px] px-[15px] rounded-[10px] animate-fadeInAnimate cursor-pointer bg-[#FEFEFE] focus:border-none ring-1 ring-[#F1F1F1] focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-spblue" onClick={ClickHandler}>
                <div className="rounded-[7px] overflow-hidden">
                    <img src={thumbnail} alt="gmail" className="w-[76px] scale-150" />
                </div>

                <div className="ml-[18px] text-left">
                    <h1 className="font-bold">{platform_name}</h1>
                    <p className="text-[12px] text-[#a1a1a1]">{name}</p>
                </div>
            </button>
        </Link>
    )
}

function OldSearch(props){
    return (
        <section className="w-[414px] h-[110px] mobileL:w-screen fixed bg-gradient-to-b from-white to-transparent p-[20px] z-10 animate-fadeInAnimate">
            <section className="relative w-full flex items-center rounded-full bg-[#F9F9F9] border">
                <img src="/icons/Interface Search.svg" alt="search-icon" className="w-[17px] absolute left-4" />
                <input type="text" placeholder="Search" className="w-full h-full text-[15px] font-medium py-[15px] pl-[45px] text-[#111111] rounded-full focus:outline-none bg-[#F9F9F9] focus:text-[#111] hover:bg-white ring-1 ring-[#E9E9E9] focus:ring-spblue focus:ring-2 focus:bg-white placeholder:text-[#111]" />
            </section>
        </section>
    )
}

function OfflineState(props){
    return (
        <section className="h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <div className="text-center flex flex-col items-center justify-center">
                    <img src="/icons/Programming Cloud Off.svg" alt="Cloud Off" className="w-[49px]" />
                    <p className="mt-[10px] text-[14px] text-[#111111] leading-tight">You are offline right now. <br/>Try reconnect.</p>
                </div>
                <button className="mt-[30px] py-[10px] px-[15px] font-semibold text-[14px] text-spblue rounded-[8px] ring-1 ring-spblue bg-spblue/10">Reconnect</button>
            </div>
        </section>
    )
}


const AccountCollection = ({ gridMode, secrets }) => {
    if(gridMode){
        return (
            secrets.map((secret, index) => {
                const hostLastIndex = secret.platform_icon.indexOf('/static');
                const image = secret.platform_icon.slice(hostLastIndex, secret.platform_icon.length);
                const imagePath = `${process.env.API_URL}${image}`;
                return <SquareAccount key={index+1} secret_id={secret.secret_id} platform_name={secret.platform_name} name={secret.name} platform_icon={imagePath} />
            })
        )

    } else {
        return (
            <section className="pb-[55px]">
                { secrets.map((secret, index) => {
                    const hostLastIndex = secret.platform_icon.indexOf('/static');
                    const image = secret.platform_icon.slice(hostLastIndex, secret.platform_icon.length);
                    const imagePath = `${process.env.API_URL}${image}`;
                    return <Account key={index+1} secret_id={secret.secret_id} platform_name={secret.platform_name} name={secret.name} platform_icon={imagePath} />
                }) }
            </section>
        )
    }
}   


export default function Home(props){
    
    // Initialize state navigation context
    const { setCurrentPage, resetCurrentPage, state: { isLoggedIn, fetch_address }, setLoggedIn } = useContext(PageContext);
    
    useEffect(() => {
        setCurrentPage('home');
        localStorage.removeItem('xyzsec_id');
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

    const [ secrets, setSecrets ] = useState([]);
    const [ gridMode, setGridMode ] = useState(false);
    
    useEffect(() => {
        const grid_mode = localStorage.getItem('grid_mode');
        grid_mode === 'on' ? setGridMode(true) : setGridMode(false);
    }, []);

    useEffect(() => {
        FetchSecrets((res) => {
            if(res.code === 200){
                setSecrets(res.result.secrets);

            } else if(res.code === 401) {
                setLoggedIn(false);

            }
        });
    }, []);

    // useEffect(() => {
    //     setTimeout(() => !secrets.length ? setShowLoading(false) : setShowLoading(true), 5000);
    // }, [secrets]);
    
    if(isLoggedIn){
        return (
            <section className="flex flex-col h-full pb-[130px] overflow-y-scroll scroll-smooth">
                <Head>
                    <title>Home</title>
                    <meta name="description" content="Login - Square Pass" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
    
                <Search gridMode={gridMode} setGridMode={setGridMode} />

                <section className='h-full px-[20px]'>

                    { navigator.onLine &&
                        <div>
                            { secrets.length < 1 && 
                                <section className="mt-[70px] flex flex-col">
                                    { gridMode &&
                                        <section className="grid grid-cols-2 gap-[10px]">
                                            <LoadingGrid />
                                            <LoadingGrid />
                                        </section>
                                    }
            
                                    { !gridMode &&
                                        <section>
                                            <LoadingAccount />
                                            <LoadingAccount />
                                            <LoadingAccount />
                                        </section>
                                    }
                                </section>
                            }
            
                            { secrets.length < 1 && <EmptyState /> }
            
                            { gridMode &&
                                <section className='w-full mt-[60px] py-[15px] pb-[100px] grid grid-cols-2 gap-[10px]'>
                                    { secrets.length > 0 && <AccountCollection gridMode={gridMode} secrets={secrets} /> }
                                </section>
                            }
            
                            { !gridMode &&
                                <section className='w-full mt-[60px] py-[5px]'>
                                    { secrets.length > 0 && <AccountCollection gridMode={gridMode} secrets={secrets} /> }
                                </section>
                            }
                        </div>
                    }

                    { !navigator.onLine &&
                        <section>
                            <OfflineState />
                        </section>
                    }

                    
                </section>
    
            </section>
        );
    } else {
        return null;
    }
}