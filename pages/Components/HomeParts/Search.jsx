import 'tailwindcss/tailwind.css';
import { useState } from 'react';

export default function Search(props){

    const { gridMode, setGridMode } = props;
    const [ normalDay, setNormalDay ] = useState(true);

    function toggleGridOn(){
        setGridMode(true)
        localStorage.setItem('grid_mode', 'on');
    }

    function toggleGridOff(){
        setGridMode(false)
        localStorage.removeItem('grid_mode');
    }

    const NormalDay = () => {
        return (
            <section className="w-full h-[60px] flex items-center justify-between px-[20px] py-[8px] border-b border-[#EFEFEF]">
                <button className="flex items-center">
                    <img src="/SquarePass_Emblem.svg" alt="SquarePass" className="w-[28px]" />
                    <p className="ml-[10px] text-[#111] font-bold text-[15px]">SquarePass</p>
                </button>
                
                <div>
                    { !gridMode &&
                        <button className="px-[12px] py-[12px] rounded-full hover:bg-black/5 transition ease-out" onClick={toggleGridOn}>
                            <img src="/icons/grid-mode.svg" alt="grid-mode" className="w-[18px]" />
                        </button>
                    }

                    { gridMode &&
                        <button className="px-[12px] py-[12px] rounded-full hover:bg-black/5 transition ease-out" onClick={toggleGridOff}>
                            <img src="/icons/list-mode.svg" alt="grid-mode" className="w-[18px]" />
                        </button>
                    }

                    <button className="ml-[5px] px-[12px] py-[12px] rounded-full hover:bg-black/5 transition ease-out" onClick={() => setNormalDay(false)}>
                        <img src="/icons/Icon_Search.svg" alt="Search_Icon" className="w-[18px]" />
                    </button>
                </div>
            </section>
        )
    }

    const SearchDay = () => {
        return (
            <section className="w-full h-[60px] flex items-center bg-spblue animate-fadeInAnimate">
                <input type="text" placeholder="Search Secret" autoFocus className="w-full h-full caret-white text-white font-medium px-[20px] placeholder:text-white/80 bg-[#4876B2] focus:outline-none" />

                <button className="bg-spblue w-[70px] h-full flex items-center justify-center" onClick={() => setNormalDay(true)}>
                    <img src="/Icons/Icon_Close_Search.svg" alt="Close Search Icon" className="w-[17px]" />
                </button>
            </section>
        )
    }

    return (
        <section className="w-[414px] mobileL:w-screen fixed bg-white z-10">
            { normalDay && <NormalDay /> }
            { !normalDay && <SearchDay /> }
        </section>
    )
}