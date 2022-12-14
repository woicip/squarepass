import 'tailwindcss/tailwind.css';

export default function InputEmail(props){

    const { title, placeholder, email, Handler, NextStepHandler } = props;

    function valueHandler(e){
        Handler(e.target.value);
    }

    return (
        <section className="mb-[12px] rounded-lg border-2 border-[#FF4B4B] relative">
            <label for="email" className="pt-[8px] px-[10px] text-[10px] text-[#707070] absolute">{title}</label>
            <input type="email" id="email" name="email" placeholder={placeholder} value={email} className="w-full h-full bg-inputwrong font-medium py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-lg focus:outline-none" onChange={valueHandler} />
        </section>
    );
}