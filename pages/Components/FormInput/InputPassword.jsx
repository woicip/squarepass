import 'tailwindcss/tailwind.css';
import { useState } from 'react';

export default function InputPassword(props){

    const { title, placeholder, password, PasswordHandler, PasswordLevelHandler, Handler } = props;

    const [ showPass, setShowPass ] = useState(false);

    function passHandler(e){
        if(typeof PasswordHandler === 'function' && typeof PasswordLevelHandler === 'function'){
            PasswordHandler(e.target.value);
            PasswordLevelHandler(e.target.value);
        } else if(typeof PasswordHandler === 'function'){
            PasswordHandler(e.target.value); 
        } else if(typeof Handler === 'function'){
            Handler(e.target.value);
        }

    }

    function showPassHandler(){
        showPass ? setShowPass(false) : setShowPass(true);
    }

    return (
        <section className="mb-[12px] rounded-lg ring-1 ring-[#e9e9e9] relative animate-fadeInAnimate">
            <p className="pt-[8px] px-[10px] text-[10px] text-[#707070] absolute">{title}</p>

            { showPass &&
                <input type="text" placeholder={placeholder} value={password} className="w-full h-full font-medium py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-spblue" onChange={passHandler}/>
            }

            { !showPass && 
                <input type="password" placeholder={placeholder} value={password} className="w-full h-full font-medium py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-spblue" onChange={passHandler}/>
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