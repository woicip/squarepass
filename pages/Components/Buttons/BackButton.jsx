import 'tailwindcss/tailwind.css';

export default function BackButton(props){

    const { setMoveNext, setPassword, Handler } = props;

    function backHandler(){
        if(typeof setMoveNext === 'function' && typeof setPassword === 'function'){
            setMoveNext(false);
            setPassword('');
        } else if(typeof Handler === 'function'){
            Handler();
        }
    }

    return (
        <button className="text-spblue font-medium text-[13px] py-[10px] px-[5px] flex items-center animate-fadeInAnimate" onClick={backHandler}>
            <img src="/Arrow Left Blue.svg" alt="arrow" className='w-[20px] mr-3'/>
            {props.children}
        </button>
    )
}