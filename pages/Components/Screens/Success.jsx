import 'tailwindcss/tailwind.css';
import { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { PageContext } from '../../Context/Context';

export default function Success(props){

    const { setSuccessContext } = useContext(PageContext);
    const { title, desc, page, buttonName, metaTitle } = props;

    return (
        <section className="h-screen flex flex-col items-center justify-center p-[30px] z-20">
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content="Success Create Secret" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div></div>

            <div className="flex flex-col items-center justify-center animate-fadeInAnimate">
                <img src="/icons/Interaction True.svg" alt="complete-icon" className="w-[60px]" />
                <h1 className="font-bold mt-[20px] text-[26px]">{title}</h1>
                <p className="text-[#ACACAC] text-[14px]">{desc}</p>
            </div>
            
            <section className="w-[414px] mobileL:w-screen p-[30px] fixed bottom-0">
                <Link href={page}>
                    <button className="w-full font-bold text-[15px] py-[14px] text-white bg-spblue rounded-[10px] animate-fadeInAnimate focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-spblue" onClick={() => setSuccessContext(false)}>Go to {buttonName}</button>
                </Link>
            </section>
        </section>
    )
}