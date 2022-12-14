import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useEffect, useContext } from 'react';

// Context
import { PageContext } from './Context/Context';

export default function SupportDev(props){

    const { setCurrentPage, resetCurrentPage, state: { isLoggedIn, fetch_address }, setLoggedIn } = useContext(PageContext);
    
    useEffect(() => {
        setCurrentPage('support-dev');
        return () => resetCurrentPage();
    }, []);
    
    return (
        <section className="animate-fadeInAnimate">
            <Head>
                <title>Support Dev</title>
                <meta name="description" content="Support the dev" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="border-b border-[#EEEEEE] py-[20px] px-[30px] flex items-center">
                <img src="./account/support-the-dev.svg" alt="Platform Request" className="w-[21px] h-[21px]" />
                <h1 className="ml-[15px] text-[16px] text-[#111111] font-semibold">Support The Dev</h1>
            </section>

            <section className="px-[30px]">
                <section className="mt-[22px] flex items-center">
                    <img src="https://www.geoguessr.com/images/auto/288/288/ce/0/plain/pin/6a2bc8005fbb510505ea7e57076efd59.png" alt="avatar" className="w-[60px] rounded-[15px]" />
                    <div className="ml-[15px]">
                        <h1 className="font-bold text-[#111111]">Gunawan Cipta</h1>
                        <p className="text-[13px] text-[#BEBEBE]">Designer & Developer</p>
                    </div>
                </section>
                <p className="mt-[25px] text-[14px]">
                    If you found SquarePass is helping your problem  
                    please consider to support me via a donation. I would 
                    appreciate that and make SquarePass better.
                </p>

                <section className="mt-[70px]">
                    <div className="py-[10px] border-b border-[#EEEEEE] flex ">
                        <img src="./icons/Interface Security Shield 3.svg" alt="donate" className="w-[18px]" />
                        <h1 className="ml-[12px] font-bold">Donation Method</h1>
                    </div>

                    <a href="https://saweria.co/gnwncpta" target="_blank" className="block w-full mt-[20px] py-[14px] text-[#3E3939] text-center font-bold rounded-lg bg-[#FAAE2B]">Saweria.co</a>
                </section>
            </section>
        </section>
    )
}