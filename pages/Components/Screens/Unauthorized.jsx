import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import Link from 'next/link';

export default function NotFound(props){
    return (
        <section className="w-full h-screen">
            <Head>
                <title>Unauthorized</title>
                <meta name="description" content="Unauthorized" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="h-full flex flex-col items-center justify-center">
                <h1 className="text-black/20 font-semibold text-5xl">401</h1>
                <p className="mt-[10px] text-[14px] text-black/30 w-[200px] text-center">Oops sorry, You are not allowed to access this page</p>
                <Link href="/login">
                    <a className="mt-[30px] text-[14px] text-spblue py-[5px] px-[10px] rounded-[5px] ring-1 ring-spblue opacity-80 hover:opacity-100 hover:bg-spblue hover:text-white">Login</a>
                </Link>
            </section>

        </section>
    )
}