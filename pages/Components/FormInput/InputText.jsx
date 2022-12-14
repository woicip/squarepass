import 'tailwindcss/tailwind.css';

export default function InputText(props){

    const { title, placeholder, fullName, email, fullNameHandler, emailHandler } = props;

    function valueHandler(e){
        if(typeof fullNameHandler === 'function'){
            fullNameHandler(e.target.value);
        } else if(typeof fullNameHandler === 'function'){
            emailHandler(e.target.value);
        }
    }

    return (
        <section className="mb-[12px] rounded-lg border border-[#BEBEBE] relative">
            <p className="pt-[8px] px-[10px] text-[10px] text-[#707070] absolute">{title}</p>
            <input type="text" placeholder={placeholder} value={fullName} className="w-full h-full font-medium py-[17px] pt-[27px] pb-[11px] px-[10px] placeholder:text-[#DBDBDB] rounded-lg" onChange={valueHandler}/>

            <img src="/icons/Interface Edit View.SVG" className="w-[22px] h-[80%] cursor-pointer absolute right-4 top-[7px] bg-white" />
        </section>
    )
}