import 'tailwindcss/tailwind.css';

export default function Account(props){

    const { secret_id, platform_name, name, platform_icon } = props;

    function ClickHandler(){
        localStorage.setItem('xyzsec_id', secret_id);
        location.href = "/detail";
    }

    return (
        <button className="w-full my-[12px] flex items-center py-[10px] px-[15px] rounded-[10px] animate-fadeInAnimate cursor-pointer bg-[#FEFEFE] focus:border-none ring-1 ring-[#F1F1F1] focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-spblue" onClick={ClickHandler}>
            <div className="rounded-[10px] overflow-hidden shadow-lg">
                <img src={platform_icon} alt={name} className="w-[48px] scale-[1.2] " />
            </div>

            <div className="ml-[18px] text-left">
                <h1 className="font-bold text-[15px]">{platform_name}</h1>
                <p className="text-[12px] text-[#a1a1a1]">{name}</p>
            </div>
        </button>
    )
};