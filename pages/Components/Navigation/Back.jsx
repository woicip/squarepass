import 'tailwindcss/tailwind.css';

export default function Back(props){
    return (
        <section className="fixed bottom-0 w-[414px] mobile:w-screen border-t border-[#E4E4E4] flex items-center justify-evenly bg-white animate-fadeInAnimate">
            <Link href="/account">
                <button className="px-[20px] py-[14px] w-full text-left relative flex items-center">
                    <img src="/navigations/back-black.svg" alt="Back" className="w-[20px]" />
                    <p className="ml-[15px] text-[14px] font-medium text-[#111111]">Back</p>
                </button>
            </Link>
        </section>
    )
}