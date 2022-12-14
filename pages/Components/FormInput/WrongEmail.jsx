import 'tailwindcss/tailwind.css';

// Components
import True from '../MicroInteraction/True';

export default function WrongEmail(props){

    const { email, SetEmail, inputCheck } = props;

    return (
        <div className='flex items-center border-2 border-[#FF4B4B] bg-inputwrong focus:outline-none rounded-lg relative'>
            <input type="text" placeholder="yourmail@email.com" id="email" autoFocus className='w-full py-[14px] px-[14px] rounded-lg bg-transparent focus:outline-none' value={email} onChange={(e) => SetEmail(e.target.value)} />
    
            { inputCheck && <True /> }
        </div>
    );
}