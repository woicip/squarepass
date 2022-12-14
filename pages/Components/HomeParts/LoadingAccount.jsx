import 'tailwindcss/tailwind.css';

export default function LoadingAccount(props){
    return (
        <section className="mb-[10px] h-[70px] w-full flex items-center py-[10px] px-[15px] rounded-[10px] border border-[#F1F1F1] bg-[#F5F5F5]">
            <div className="w-[50px] h-full rounded-[10px] bg-[#b8b8b8] animate-iconOpacity"></div>

            <div className="ml-[18px]">
                <div className="w-[180px] h-[22px] rounded-md bg-[#b8b8b8] animate-titleOpacity"></div>
                <div className="mt-[5px] w-[50%] h-[14px] rounded-[4px] bg-[#b8b8b8] animate-descOpacity"></div>
            </div>
        </section>
    )
}