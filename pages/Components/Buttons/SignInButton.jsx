import 'tailwindcss/tailwind.css';

export default function SignInButton(props){

    const { SubmitCheckPassword } = props;

    return (
        <button type="submit" className='mt-[10px] py-[14px] font-bold text-white bg-spblue rounded-lg flex items-center justify-center focus:outline-2 focus:outline-blue-400 focus:outline focus:outline-offset-2' onClick={SubmitCheckPassword}>Sign In <img src="/arrow.svg" alt="arrow-right" className="ml-3" /></button>
    )
}