import 'tailwindcss/tailwind.css';

export default function MicroInvalidMessage(props){

    const { message } = props;

    return (
        <p className='flex items-center text-[#FF4B4B] text-[12px] font-medium animate-fadeInAnimate'>
            <img src="/icons/Interface Alert Warning Circle Red.svg" alt="warning" className='w-[16px] mr-2' />
            { message }
        </p>
    )
}