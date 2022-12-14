import 'tailwindcss/tailwind.css';

export default function InputWrongFullName(props){

    const { title, placeholder, fullName, Handler } = props;

    function valueHandler(e){
        Handler(e.target.value);
    }

    return (
        <section className="mb-[12px] rounded-lg ring-1 ring-[#FF4B4B] relative animate-fadeInAnimate">
            <p className="pt-[8px] px-[10px] text-[10px] text-[#707070] absolute">{title}</p>
            <input type="email" placeholder={placeholder} value={fullName} className="w-full h-full font-medium py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-lg bg-inputwrong focus:outline-none" onChange={valueHandler}/>
        </section>
    )
}