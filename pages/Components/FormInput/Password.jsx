import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import Image from 'next/image';

// import showPass from '../../../public/icons/Interface Edit View.svg';
// import OffPass from '../../../public/icons/Interface Edit View Off.svg';

// Components

export default function Password(props){

    const { password, setPassword, setSignIn } = props;

    const [ showPass, setShowPass ] = useState(false);

    function showPassHandler(){
        showPass ? setShowPass(false) : setShowPass(true);
    }

    return (
        <div className='flex items-center ring-1 ring-[#e9e9e9] rounded-lg relative'>
            { !showPass &&
                <input type="password" placeholder="Insert Password" id="password" className='py-[14px] px-[14px] w-full text-[15px] rounded-lg placeholder:text-[15px] focus:outline-none focus:ring-2 focus:ring-spblue' value={password} onChange={(e) => setPassword(e.target.value)} />
            }

            { showPass &&
                <input type="text" placeholder="Insert Password" id="password" className='py-[14px] px-[14px] w-full text-[15px] rounded-lg placeholder:text-[15px] focus:outline-none focus:ring-2 focus:ring-spblue' value={password} onChange={(e) => setPassword(e.target.value)} />
            }

            { !showPass && 
                <img src="/icons/Interface Edit View.SVG" className="w-[22px] h-full cursor-pointer absolute right-3" onClick={showPassHandler} />
            }

            { showPass && 
                <img src="/icons/Interface Edit View Off.SVG" className="w-[22px] h-full cursor-pointer absolute right-3" onClick={showPassHandler} />
            }

        </div>
    );
}