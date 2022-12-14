import 'tailwindcss/tailwind.css';

export default function PickReason(props){

    const { reasonPick, showReasonsHandler } = props;

    return (
        <section className="w-full mt-[40px] relative">
            <button className="w-full text-left px-[20px] py-[14px] ring-1 ring-[#e9e9e9] rounded-lg hover:ring-spblue hover:ring-2 animate-fadeInAnimate focus:outline-none focus:ring-2 focus:ring-spblue" onClick={showReasonsHandler}>
                <div className="flex items-center justify-between">
                    <p className="font-medium text-[15px]">{reasonPick}</p>
                    <img src="/icons/Dropdown.svg" alt="arrow" />
                </div>

            </button>

            { props.children }
        </section>
    )
}