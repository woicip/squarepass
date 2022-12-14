import 'tailwindcss/tailwind.css';
import Link from 'next/link';

export default function Menu(props){

    const { name, icon, page } = props;

    return (
        <section className='w-full'>
            <Link href={page}>
                <button className="w-full my-[5px] py-[15px] px-[20px] flex items-center bg-[#FEFEFE] ring-1 ring-[#F1F1F1] rounded-[8px] focus:ring-2 focus:ring-spblue">
                    <img src={`/account/${icon}.svg`} alt={name} className="group-focus:invert" />
                    <p className="ml-[20px] text-[14px]">{name}</p>
                </button>
            </Link>
        </section>
    );
}