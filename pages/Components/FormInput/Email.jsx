import 'tailwindcss/tailwind.css';

// Components
import True from '../MicroInteraction/True';

export default function Email(props){

    const { email, InputCheckEmail, inputCheck, SubmitCheckEmail } = props;

    function enterHandler(e){
        if(e.key === 'Enter'){
            SubmitCheckEmail(e);
        }
    }

    return (
        <div className='flex items-center ring-1 ring-[#e9e9e9] rounded-lg relative animate-fadeInAnimate'>
            <input type="email" placeholder="yourmail@email.com" id="email" className='py-[14px] px-[14px] text-[15px] w-full rounded-lg focus:outline-none placeholder:text-[15px] focus:ring-2 focus:ring-spblue' value={email} onChange={(e) => InputCheckEmail(e)} onKeyUp={enterHandler}/>

            { inputCheck && <True /> }
        </div>
    );
}