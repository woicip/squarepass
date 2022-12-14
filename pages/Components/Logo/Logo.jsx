import 'tailwindcss/tailwind.css';
import Link from 'next/link';

export default function Logo(props){
    return (
        <Link href="/">
            <img src="/logo-welcome.svg" alt="Logo" className='w-[151px] cursor-pointer animate-fadeInAnimate'/>
        </Link>
    )
}