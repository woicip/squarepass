import 'tailwindcss/tailwind.css';

export default function SubmitButton(props){

    const { buttonName, handler } = props;

    function clickHandler(){
        if(typeof handler === 'function'){
            handler();
        }
    }

    return (
        <button type="submit" className='w-full mt-[10px] py-[16px] font-bold text-[15px] text-white bg-spblue rounded-lg flex items-center justify-center animate-fadeInAnimate focus:outline-2 focus:outline-blue-400 focus:outline focus:outline-offset-2' onClick={clickHandler}> {buttonName} </button>
    )
}