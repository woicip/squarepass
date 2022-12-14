import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useEffect, useContext } from 'react';

// Context
import { PageContext } from './Context/Context';

export default function About(props){

    const { setCurrentPage, resetCurrentPage, state: { isLoggedIn, fetch_address }, setLoggedIn } = useContext(PageContext);
    
    useEffect(() => {
        setCurrentPage('about');
        return () => resetCurrentPage();
    }, []);

    return (
        <section className="h-screen flex flex-col items-center justify-center animate-fadeInAnimate">
            <Head>
                <title>About SquarePass</title>
                <meta name="description" content="About SquarePass" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="text-center flex flex-col items-center justify-center">
                <img src="./icons/Interface Setting Wrench.svg" alt="Page Under Development" className="w-[36px]" />
                <h1 className="mt-[10px] font-bold text-[22px]">Under Development</h1>
                <p className="mt-[6px] text-[14px] text-[#ACACAC] leading-tight">This page is under development. <br/>Please keep your eyes on further updates.</p>
            </section>

            <></>
        </section>
    )
}