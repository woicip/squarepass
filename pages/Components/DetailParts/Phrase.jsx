import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';

export default function Phrase(props){

    const { password } = props;
    const [ localPass, setLocalPass ] = useState(password);
    const [ showPass, setShowPass ] = useState(false);

    useEffect(() => {
        password.length > 0 ? setLocalPass(password) : "";
    }, [password]);

    function showPassHandler(){
        showPass ? setShowPass(false) : setShowPass(true);
    }

    function localPassHandler(e){
        setLocalPass(e.target.value);
    }

    return (
        <div className="flex items-center mb-[10px] animate-fadeInAnimate">
            <p className="font-semibold mobile:text-[14px] mr-[13px]">Phrase</p>

            <div className="w-full flex items-center border rounded-[7px] overflow-hidden relative">
                { !showPass && <input type="password" value={localPass} className="w-full h-[50px] mobile:text-[15px] pl-[15px] focus:outline-none" onChange={localPassHandler} /> }
                { showPass && <input type="type" value={localPass} className="w-full h-[50px] mobile:text-[15px] pl-[15px] focus:outline-none" onChange={localPassHandler} /> }
                <button className="w-[50px] h-[50px] flex items-center justify-center rounded-r-[6px] bg-spblue absolute right-0" onClick={showPassHandler}>
                    <img src="/icons/Interface Edit View White.svg" alt="copy" className="w-[20px]" />
                </button>
            </div>
        </div>
    )
}