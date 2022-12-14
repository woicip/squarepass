import 'tailwindcss/tailwind.css';
import { useState } from 'react';

export default function InputPassword(props){

    const { title, placeholder, password, PasswordHandler, passwordLevelHandler } = props;

    const [ showPass, setShowPass ] = useState(false);

    function Handler(e){
        PasswordHandler(e.target.value);
        
        if(typeof passwordLevelHandler === 'function'){
            passwordLevelHandler(e.target.value);
        }
    }

    function showPassHandler(){
        showPass ? setShowPass(false) : setShowPass(true);
    }

    return (
        <section className="mb-[12px] rounded-lg border-2 border-[#FF4B4B] relative">
            <p className="pt-[8px] px-[10px] text-[10px] text-[#707070] absolute">{title}</p>

            { showPass && <input type="text" placeholder={placeholder} value={password} className="w-full h-full font-medium bg-inputwrong py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-md focus:outline-none" onChange={Handler}/> }
            
            { !showPass && <input type="password" placeholder={placeholder} value={password} className="w-full h-full font-medium bg-inputwrong py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-md focus:outline-none" onChange={Handler}/> }

            { showPass && <img src="/icons/Interface Edit View Off.SVG" className="w-[22px] h-[80%] cursor-pointer absolute right-4 top-[7px]" onClick={showPassHandler} /> }
            { !showPass && <img src="/icons/Interface Edit View.SVG" className="w-[22px] h-[80%] cursor-pointer absolute right-4 top-[7px]" onClick={showPassHandler}/> }

        </section>
    )
}