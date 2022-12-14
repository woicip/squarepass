import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useContext } from 'react';

// Context
import { PageContext } from './Context/Context';

// Fetchs
import FetchSurvey from './Fetchs/FetchSurvey';

// Components
import Menu from './Components/AccountParts/Menu';

export default function Account(props){

    // Initialize state navigation context
    const { setCurrentPage, resetCurrentPage, state: { isLoggedIn, user, fetch_address }, setLoggedIn } = useContext(PageContext);

    useEffect(() => {
        setCurrentPage('account');
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

    const DestroySession = () => {
        localStorage.removeItem('squarepass_access_token');
        window.location.href = "/";
    }

    if(isLoggedIn){
        return (
            <section>
                <Head>
                    <title>Account</title>
                    <meta name="description" content="Account" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
    
                <section className="py-[20px] border-b border-[#F1F1F1] animate-fadeInAnimate">
                    <div className="px-[20px] flex items-center justify-between">
                        <div className="flex items-center">
                            <img src={user.avatar} alt="profile-pict" className="w-[60px] h-[60px] rounded-xl" />
                            <div className="ml-[15px]">
                                <h1 className="text-[16px] font-bold">{user.full_name}</h1>
                                <p className="text-[12px] text-[#111]/50">{user.email_address}</p>
                            </div>
                        </div>
    
                        <button className="py-[14px] px-[14px] flex items-center justify-center rounded-lg hover:bg-red-500/20" onClick={DestroySession}>
                            <img src="/icons/Log Out Red.svg" alt="log-out-icon" className="w-[20px]" />
                        </button>
                    </div>
                </section>
    
                <section className="mt-[25px] px-[20px] animate-fadeInAnimate">
                    <div> 
                        {/* <p className="text-[15px] font-bold">Menu</p> */}
    
                        <div className="mt-[15px] flex flex-col items-start justify-between">
                            <section className="w-full mb-[30px]">
                                <p className="mb-[10px] font-bold text-[15px]">Account</p>

                                <Menu name="Change Profile" icon="edit-profile" page="/change-profile" />
                                <Menu name="Change Email Address" icon="change-email-address" page="/change-email" />
                                <Menu name="Change Password" icon="change-password" page="/change-password" />
                                <Menu name="Delete My Account" icon="delete-my-account" page="/delete-account" />
                            </section>

                            <section className="w-full mb-[30px]">
                                <p className="mb-[10px] font-bold text-[15px]">Support</p>

                                <Menu name="Platform Request" icon="request-new-platform" page="/platform-request" />
                                <Menu name="Support The Dev" icon="support-the-dev" page="/support-dev" />
                            </section>

                            <section className="w-full mb-[30px]">
                                <p className="mb-[10px] font-bold text-[15px]">Help</p>

                                <Menu name="About App" icon="about-app" page="/about" />
                            </section>
                        </div>
                    </div>
                </section>
    
            </section>
        );

    } else {
        return null;
    }
}