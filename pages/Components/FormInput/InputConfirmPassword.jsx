import 'tailwindcss/tailwind.css';
import { useState } from 'react';

export default function InputConfirmPassword(props){

    const { title, placeholder, confirmPassword, ConfirmPasswordHandler } = props;

    const [ showPass, setShowPass ] = useState(false);

    function confirmPasswordHandler(e){
        ConfirmPasswordHandler(e.target.value);
    }

    function showPassHandler(){
        showPass ? setShowPass(false) : setShowPass(true);
    }

    return (
        <section className="mb-[12px] rounded-lg ring-1 ring-[#e9e9e9] relative animate-fadeInAnimate">
            <p className="pt-[8px] px-[10px] text-[10px] text-[#707070] absolute">{title}</p>

            { showPass &&
                <input type="text" placeholder={placeholder} value={confirmPassword} className="w-full h-full font-medium py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-spblue" onChange={confirmPasswordHandler}/>
            }

            { !showPass && 
                <input type="password" placeholder={placeholder} value={confirmPassword} className="w-full h-full font-medium py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-spblue" onChange={confirmPasswordHandler}/>
            }

            { showPass && 
                <img src="/icons/Interface Edit View Off.SVG" className="w-[22px] h-[80%] cursor-pointer absolute right-4 top-[7px] bg-white" onClick={showPassHandler} />
            }

            { !showPass &&
                <img src="/icons/Interface Edit View.SVG" className="w-[22px] h-[80%] cursor-pointer absolute right-4 top-[7px] bg-white" onClick={showPassHandler}/>
            }

        </section>
    )
}