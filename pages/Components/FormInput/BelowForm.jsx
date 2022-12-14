import 'tailwindcss/tailwind.css';
import Link from 'next/link';

export default function BelowForm(props){

    const { data } = props;

    return (
        <div className='mt-[33px] mb-[12px] animate-fadeInAnimate'>
            <p className="text-[12px] text-[#474747]">{data.titleBlack}</p>
            <Link href={data.href}>
                <p className="w-fit text-[12px] text-[#5186CB] cursor-pointer underline">{data.titleBlue}</p>
            </Link>
        </div>
    );
};