import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';

export default function InputConfirmPassword(props){

    const { title, placeholder, confirmPassword, ConfirmPasswordHandler } = props;

    const [ showPass, setShowPass ] = useState(false);

    function confirmPasswordHandler(e){
        ConfirmPasswordHandler(e.target.value);
    }

    function showPassHandler(){
        showPass ? setShowPass(false) : setShowPass(true);
    }

    useEffect(() => {
        showPassHandler();
        return () => "";
    }, []);

    return (
        <section className="mb-[12px] rounded-lg border-2 border-[#FF4B4B] relative">
            <p className="pt-[8px] px-[10px] text-[10px] text-[#707070] absolute">{title}</p>

            { showPass && <input type="text" placeholder={placeholder} value={confirmPassword} className="w-full h-full font-medium bg-inputwrong py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-md focus:outline-none" onChange={confirmPasswordHandler}/> }

            { !showPass && <input type="password" placeholder={placeholder} value={confirmPassword} className="w-full h-full font-medium bg-inputwrong py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-md focus:outline-none" onChange={confirmPasswordHandler}/> }

            { showPass && <img src="/icons/Interface Edit View Off.SVG" className="w-[22px] h-[80%] cursor-pointer absolute right-4 top-[7px]" onClick={showPassHandler} /> }
            { !showPass && <img src="/icons/Interface Edit View.SVG" className="w-[22px] h-[80%] cursor-pointer absolute right-4 top-[7px]" onClick={showPassHandler}/> }

        </section>
    )
}