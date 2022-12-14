import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';

export default function Name(props){

    const { name } = props;

    const [ localName, setLocalName ] = useState('');

    useEffect(() => {
        name.length > 0 ? setLocalName(name) : "";
    }, [name]);

    function localNameHandler(e){
        setLocalName(e.target.value);
    }

    function copyToClipboard(){
        navigator.clipboard.writeText(localName);
    }

    return (
        <div className="flex items-center mb-[10px] animate-fadeInAnimate">
            <p className="font-semibold mobile:text-[14px] mr-[20px]">Name</p>

            <div className="w-full flex items-center border rounded-[7px] overflow-hidden relative">
                <input type="text" value={localName} className="w-full h-[50px] mobile:text-[15px] pl-[15px] focus:outline-none" onChange={localNameHandler} />
                <button className="w-[50px] h-[50px] flex items-center justify-center rounded-r-[6px] bg-spblue absolute right-0" onClick={copyToClipboard}>
                    <img src="/icons/Interface File Double White.svg" alt="copy" className="w-[16px]" />
                </button>
            </div>
        </div>
    )
}