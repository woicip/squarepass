import 'tailwindcss/tailwind.css';

export default function DetailHeader(props){

    const { name, date, showMiniDelete, showMiniDeleteHandler } = props;

    function DateFormat(){
        const dt = new Date(date);
        const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        const day = dt.getDate();
        const month = months[dt.getMonth()];
        const year = dt.getFullYear();

        return `${month} ${day}, ${year}`;
    }

    if(!showMiniDelete){
        return (
            <div className="p-[20px] flex items-center justify-between animate-fadeInAnimate">
                <div>
                    <h1 className="text-[22px] font-bold">{name}</h1>
                    <p className="text-[14px] text-[#BEBEBE]">{DateFormat()}</p>
                </div>

                <button onClick={showMiniDeleteHandler}>
                    <img src="/icons/Interface Delete Bin 2 Grey.svg" alt="delete" className="w-[24px] mr-3" />
                </button>
            </div>
        )
    } else {
        return;
    }

}