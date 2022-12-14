import 'tailwindcss/tailwind.css';

export default function NextButtonDisabled(props){
    return (
        <button className='mt-[10px] w-full py-[14px] font-bold text-white bg-[#BEBEBE] rounded-lg flex items-center justify-center cursor-not-allowed animate-fadeInAnimate'>Next <img src="/arrow.svg" className="ml-3"/></button>
    )
}