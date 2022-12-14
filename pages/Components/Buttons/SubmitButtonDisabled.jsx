import 'tailwindcss/tailwind.css';

export default function SubmitButton(props){

    const { buttonName } = props;

    return (
        <button type="submit" className='w-full mt-[10px] py-[16px] font-bold text-white bg-[#BEBEBE] rounded-lg flex items-center justify-center cursor-not-allowed'> {buttonName} </button>
    )
}