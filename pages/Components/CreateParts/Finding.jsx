import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';

export default function Finding(){

    const [ dots, setDots ] = useState('');

    // Dots animation
    useEffect(() => {
        const id = setInterval(() => {
            if(dots === '...'){
                setDots('');
            } else {
                setDots(`${dots}.`);
            }
        }, 600);

        return () => clearInterval(id);
    });

    return (
        <div className="w-full h-[215px] flex flex-col items-center justify-center bg-[#5186CB] animate-fadeInAnimate">
            <img src="/icons/Interface Search White.svg" alt="search blue" className="w-[22px] relative right-1" />
            <p className="w-[135px] mt-[7px] text-white font-semibold">Listening Input {dots}</p>
        </div>
    );
}