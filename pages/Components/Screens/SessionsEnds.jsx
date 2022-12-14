import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import Link from 'next/link';

export default function SessionsEnds(props){
    return (
        <section className="h-full p-[30px] flex flex-col items-center justify-between bg-spblue animate-fadeInAnimate">
            <Head>
                <title>Session Ends</title>
                <meta name="description" content="Session Ends" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <span></span>

            <h1 className="w-[300px] text-[#C2DCFF] font-bold text-[40px] text-center leading-tight">Your Session Ends</h1>
            
            <Link href="/login">
                <button className="w-full h-[60px] rounded-[10px] bg-[#C2DCFF] font-bold text-[#5186CB] text-center">Login</button>
            </Link>
        </section>
    )
}