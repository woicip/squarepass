import 'tailwindcss/tailwind.css';

export default function LoadingGrid(){
    return (
        <section className="mb-[10px] h-fit w-full flex flex-col items-start py-[10px] px-[15px] rounded-[10px] border border-[#F1F1F1] bg-[#F5F5F5]">
            <div className="w-[50px] h-[50px] rounded-[10px] bg-[#b8b8b8] animate-iconOpacity"></div>

            <div className="mt-[10px]">
                <div className="w-[100px] h-[22px] rounded-md bg-[#b8b8b8] animate-titleOpacity"></div>
                <div className="mt-[5px] w-[50%] h-[14px] rounded-[4px] bg-[#b8b8b8] animate-descOpacity"></div>
            </div>
        </section>
    )
}