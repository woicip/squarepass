import 'tailwindcss/tailwind.css';

export default function InputFullName(props){

    const { title, placeholder, fullName, Handler } = props;

    function valueHandler(e){
        Handler(e.target.value);
    }

    return (
        <section className="mb-[12px] rounded-lg ring-1 ring-[#e9e9e9] relative animate-fadeInAnimate">
            <p className="pt-[8px] px-[10px] text-[10px] text-[#707070] absolute">{title}</p>
            <input type="email" placeholder={placeholder} value={fullName} className="w-full h-full font-medium py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-spblue" onChange={valueHandler}/>
        </section>
    )
}