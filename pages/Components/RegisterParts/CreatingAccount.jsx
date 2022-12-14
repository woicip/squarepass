import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';

export default function CreatingAccount(props){

    const [ dots, setDots ] = useState('');

    useEffect(() => {
        const id = setInterval(() => {
            if(dots === '...'){
                setDots('.')
            } else { 
                setDots(`${dots}.`);
            }
        }, 1000);

        return () => clearInterval(id);
    });

    return (
        <section className="h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <img src="/icons/Interface User Circle.svg" alt="user-cirlce" className="w-[60px]" />
                <h1 className='w-[300px] text-2xl font-bold mt-[20px]'>Creating Your Account {dots}</h1>
            </div>

            <p className='mt-[30px] text-[14px] flex items-center justify-center'>
                <img src="/icons/Interface Page Controller Loading 1.svg" alt="loading" className="w-[16px] mr-2 animate-spin" />
                Setting Up Your Profile
            </p>
        </section>
    )
}