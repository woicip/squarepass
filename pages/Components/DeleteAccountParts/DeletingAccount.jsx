import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';

export default function DeletingAccount(props){

    const [ dots, setDots ] = useState('');

    useEffect(() => {
        const id = setInterval(() => {
            if(dots === '...'){
                setDots('');
            } else { 
                setDots(`${dots}.`);
            }
        }, 500);

        return () => clearInterval(id);
    });

    return (
        <section className="h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <img src="/icons/Interface User Circle.svg" alt="user-cirlce" className="w-[60px]" />
                <h1 className='w-[300px] text-2xl font-bold mt-[20px]'>Deleting Your Account {dots}</h1>
            </div>

            <p className='mt-[10px] text-[14px] text-[#BEBEBE] flex items-center justify-center'> This process can't be undone.</p>
        </section>
    )
}