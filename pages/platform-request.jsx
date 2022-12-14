import 'tailwindcss/tailwind.css';
import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';

// Context
import { PageContext } from './Context/Context';

// Components
import InputFullName from './Components/FormInput/InputFullName';
import SubmitButton from './Components/Buttons/SubmitButton';

export default function PlatformRequest(props){

    const { setCurrentPage, resetCurrentPage, state: { isLoggedIn, fetch_address }, setLoggedIn } = useContext(PageContext);
    
    useEffect(() => {
        setCurrentPage('platform-request');
        return () => resetCurrentPage();
    }, []);

    const [ platformName, setPlatformName ] = useState('');
    const [ platformLink, setPlatformLink ] = useState('');

    function PNameHandler(name){
        setPlatformName(name);
    }
    
    function PLinkHandler(link){
        setPlatformLink(link);
    }

    return (
        <section className="animate-fadeInAnimate">
            <Head>
                <title>Platform Request</title>
                <meta name="description" content="Platform Request" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="border-b border-[#EEEEEE] py-[20px] px-[30px] flex items-center">
                <img src="./account/request-new-platform.svg" alt="Platform Request" className="w-[21px] h-[21px]" />
                <h1 className="ml-[15px] text-[16px] text-[#111111] font-semibold">Platform Request</h1>
            </section>

            <section className="mt-[220px] px-[30px] pb-[100px]">
                <InputFullName title="Platform Name" placeholder="SquarePass" fullName={platformName} Handler={PNameHandler} />
                <InputFullName title="Platform Link" placeholder="https://squarepass.com" fullName={platformLink} Handler={PLinkHandler} />
                <section className="mt-[20px]">
                    <SubmitButton buttonName="Send Request" />
                    <p className="mt-[10px] text-[12px] font-light text-[#BEBEBE] text-center">After you submitted the request we will make sure that the <br/>
                    platform is exist and we'll add it to SquarePass.</p>
                </section>
            </section>
        </section>
    )
}