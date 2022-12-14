import 'tailwindcss/tailwind.css';

export default function InputEmail(props){

    const { title, placeholder, email, Handler, NextStepHandler } = props;

    function valueHandler(e){
        Handler(e.target.value);
    }    

    return (
        <section className="mb-[12px] rounded-lg ring-1 ring-[#e9e9e9] relative animate-fadeInAnimate">
            <label htmlFor="email" className="pt-[8px] px-[10px] text-[10px] text-[#707070] absolute">{title}</label>
            <input type="email" id="email" name="email" placeholder={placeholder} value={email} className="w-full h-full font-medium py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-spblue" onChange={valueHandler} />
        </section>
    )
}