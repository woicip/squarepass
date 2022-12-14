import 'tailwindcss/tailwind.css';

export default function PickedPlatform(props){
    
    const { name, icon, showPlatformHandler, searchPlatformHandler, userPlatformNameHandler } = props;

    function Handler(e){
        userPlatformNameHandler(e.target.value);
        searchPlatformHandler(e.target.value);
    }

    return (
        <section className="relative">
            <button className="w-full h-full mb-[12px] flex items-center relative animate-fadeInAnimate group ring-1 ring-[#e9e9e9] rounded-[7px] focus:ring-2 focus:ring-spblue" onClick={showPlatformHandler}>
                <div className="w-full flex items-center pl-[15px]">
                    <img src={icon} alt={name} className="w-[40px]" />
                    <input type="text" placeholder="Select Platform" value={name} className="w-full h-full font-semibold cursor-pointer ml-[18px] py-[18px] rounded-[7px] group-focus:placeholder:text-spblue focus:outline-none focus:placeholder:text-spblue" onChange={Handler} onClick={showPlatformHandler} />
                </div>

                <img src="/icons/Dropdown.svg" alt="dropdown" className="absolute right-5" />
            </button>

            {props.children}
        </section>
    )
}