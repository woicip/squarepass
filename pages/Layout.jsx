import 'tailwindcss/tailwind.css';
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { decode } from 'js-base64';

// Context
import { PageContext } from './Context/Context.js';

// Fetchs
import FetchSurvey from './Fetchs/FetchSurvey.js';
import FetchPlatforms from './Fetchs/FetchPlatforms.js';

function Navigation(props){

    const [ active, setActive ] = useState('');

    const Context = useContext(PageContext);
    const { state: { current } } = Context;

    useEffect(() => {
        if(current === 'home') setActive('home');
        else if(current === 'create') setActive('create');
        else if(current === 'account') setActive('account');
    });

    const ActiveIndicator = (props) => <div className="w-[24px] h-[5px] bg-white rounded-full absolute bottom-[-2px] animate-fadeInAnimate"></div>

    return (
        <section className="fixed bottom-0 w-[414px] border-t mobileL:w-screen mobileM:w-screen mobileS:w-screen flex items-center justify-evenly bg-white animate-fadeInAnimate">
            <Link href="/home">
                <button className="px-[20px] py-[12px] relative flex flex-col items-center" onClick={() => setActive("home")}>
                    { active !== 'home' &&  <img src="/navigations/home.svg" alt="Home" className="w-[24px]" /> } 
                    { active === 'home' &&  <img src="/navigations/home-active.svg" alt="Home" className="w-[24px]" /> }
                </button>
            </Link>

            <Link href="/create">
                <button className="px-[20px] py-[12px] relative flex flex-col items-center" onClick={() => setActive("create")}>
                    { active !== 'create' && <img src="/navigations/add.svg" alt="Create" className="w-[24px]" /> }
                    { active === 'create' && <img src="/navigations/add-active.svg" alt="Create" className="w-[24px]" /> }
                </button>
            </Link>

            <Link href="/account">
                <button className="px-[20px] py-[12px] relative flex flex-col items-center" onClick={() => setActive("account")}>
                    { active !== 'account' && <img src="/navigations/account.svg" alt="Account" className="w-[24px]" /> }
                    { active === 'account' && <img src="/navigations/account-active.svg" alt="Account" className="w-[24px]" /> }
                </button>
            </Link>
        </section>
    );
}

function BackNavigation(props){
    return (
        <section className="fixed bottom-0 w-[414px] mobile:w-screen border-t border-[#E4E4E4] flex items-center justify-evenly bg-white animate-fadeInAnimate">
            <Link href={`/${props.page}`}>
                <button className="px-[20px] py-[14px] w-full text-left relative flex items-center">
                    <img src="/navigations/back-black.svg" alt="Back" className="w-[20px]" />
                    <p className="ml-[15px] text-[14px] font-medium text-[#111111]">Back</p>
                </button>
            </Link>
        </section>
    )
}

export default function Layout(props){

    const Context = useContext(PageContext);
    const { state: { current, isLoggedIn, success, platforms, fetch_address }, setLoggedIn, setUserAvatar, setUserEmail, setUserFullname, setPlatforms } = Context;

    const [ showNavigation, setShowNavigation ] = useState(false);
    const [ showBack, setShowBack ] = useState(false);
    const [ backPage, setBackPage ] = useState('');

    useEffect(() => {
        console.log(backPage);
        console.log(isLoggedIn ? "LOGGED IN" : "NOT LOGGED IN")
    }, [isLoggedIn]);

    useEffect(() => {
        if(isLoggedIn) location.href = "/home";
    }, []);

    useEffect(() =>{
        // useEffect function to get the user's data from the token
        const access_token = localStorage.getItem('squarepass_access_token');

        if(access_token !== null){
            const user_data = access_token.split('.')[1];
            const decoded = decode(user_data);
            const parsed = JSON.parse(decoded);

            const hostLastIndex = parsed.avatar.indexOf('/static');
            const avatar = parsed.avatar.slice(hostLastIndex, parsed.avatar.length);
            const avatarPath = `${process.env.API_URL}${avatar}`;

            setUserAvatar(avatarPath);
            setUserFullname(parsed.full_name);
            setUserEmail(parsed.email_address);
        }
    }, []);

    useEffect(() => {
        if(current === 'home' || current === 'create' || current === 'account') setShowNavigation(true);
        else setShowNavigation(false);

        if(current === 'detail'){
            setBackPage('home');
            setShowBack(true);
        } else if(current === 'change-profile' || current === 'change-email' || current === 'change-password' || current === 'delete-account' || current === 'platform-request' || current === 'support-dev' || current === 'about'){
            setBackPage('account');
            setShowBack(true);
        }
        else setShowBack(false);
    }, [Context]);

    useEffect(() => {
        success ? setShowNavigation(false) : setShowNavigation(true);
    }, [success]);

    useEffect(() => {
        
        if(!platforms.length){
            FetchPlatforms((result) => {
                if(result.success){
                    const { platforms } = result;

                    const arrangedPlatforms = platforms.map(platform => {
                        const hostLastIndexThumbnail = platform.thumbnail.indexOf('/static');
                        const thumbnail = platform.thumbnail.slice(hostLastIndexThumbnail, platform.thumbnail.length);
                        const pathThumbnail = `${process.env.API_URL}${thumbnail}`;
                        platform.thumbnail = pathThumbnail;
            
                        const hostLastIndexIcon = platform.icon.indexOf('/static');
                        const icon = platform.icon.slice(hostLastIndexIcon, platform.icon.length);
                        const pathIcon = `${process.env.API_URL}${icon}`;
                        platform.icon = pathIcon;
            
                        return { name: platform.name, icon: pathIcon, thumbnail: pathThumbnail };
                    });

                    setPlatforms(arrangedPlatforms);
                } else {
                    setLoggedIn(false);
                }
            });
        }
        
    }, []);

    return (
        <main className="bg-[#3a6092] h-screen mobileL:h-screen">
            <section className="w-[414px] h-full mx-auto bg-white mobileL:w-screen mobileL:h-full relative">
                <section className="h-full">
                    { props.children }
                </section>

                { isLoggedIn &&
                    <div>
                        { showNavigation && !success && <Navigation /> }
                        { showBack && <BackNavigation page={backPage} /> }
                    </div>
                }
            </section>
        </main>
    )
}