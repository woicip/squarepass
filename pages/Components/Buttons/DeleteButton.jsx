import 'tailwindcss/tailwind.css';

export default function DeleteButton(props){

    const { buttonName, disabled, handler } = props;

    function clickHandler(){
        if(typeof handler === 'function'){
            handler();
        }
    }

    if(disabled){
        return (
            <button type="submit" className='w-full mt-[10px] py-[15px] font-bold text-[15px] text-white bg-[#E4E4E4] rounded-lg flex items-center justify-center animate-fadeInAnimate cursor-not-allowed'> {buttonName} </button>
        );
    }

    return (
        <button type="submit" className='w-full mt-[10px] py-[15px] font-bold text-[15px] text-[#FF2929] bg-[#FF0000]/30 rounded-lg flex items-center justify-center animate-fadeInAnimate focus:outline-2 focus:outline-[#FF2929] focus:outline focus:outline-offset-2' onClick={clickHandler}> {buttonName} </button>
    )
}