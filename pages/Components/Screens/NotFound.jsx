import 'tailwindcss/tailwind.css';
import Head from 'next/head';

export default function NotFound(props){
    return (
        <section className="w-full h-screen">
            <Head>
                <title>Page Not Found</title>
                <meta name="description" content="Page Not Found" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="h-full flex flex-col items-center justify-center">
                <h1 className="text-black/20 font-semibold text-5xl">404</h1>
                <p className="mt-[10px] text-[14px] text-black/30 w-[200px] text-center">The page that you requested are not found</p>
            </section>

        </section>
    )
}