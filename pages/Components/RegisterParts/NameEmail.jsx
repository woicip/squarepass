import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';

// Components
import InputFullName from '../FormInput/InputFullName';
import InputEmail from '../FormInput/InputEmail';
import NextButton from '../Buttons/NextButton';
import BelowForm from '../FormInput/BelowForm';
import MicroInvalidMessage from '../FormInput/MicroInvalidMessage';
import InputWrongEmail from '../FormInput/InputWrongEmail';

export default function NameEmail(props){

    const { fullName, email, FullNameHandler, EmailHandler, NextStepHandler } = props;

    const [ microInvalid, setMicroInvalid ] = useState({ status: false, message: '' });

    function EmailCheck(){
        if(email.includes('@')){
            if(email.includes('.')){
                if(email[email.lastIndexOf('.') + 2] !== undefined){ // dan juga ... jika ada nama domain setelah .
                    setMicroInvalid({ status: false, message: "" });
                    NextStepHandler();
                } else {
                    setMicroInvalid({ status: true, message: "Invalid Email!" });
                }
            } else {
                setMicroInvalid({ status: true, message: "Invalid Email!" });
            }
        } else {
            setMicroInvalid({ status: true, message: "Invalid Email!" });
        }
    }

    function FullName(value){
        FullNameHandler(value);
    }

    function Email(value){
        EmailHandler(value);
    }

    return (
        <section className="w-full section-1">
            <h1 className="text-[32px] mb-[40px] font-bold animate-fadeInAnimate">Start Today, <br/> Easy Later.</h1>

            { microInvalid.status && 
                <div className='mb-[18px] flex items-center justify-between'>
                    <MicroInvalidMessage message={microInvalid.message} />
                </div>
            }

            <InputFullName title="Full Name" placeholder="John Wells" type="text" fullName={fullName} Handler={FullName} />
            { !microInvalid.status && <InputEmail title="Email" placeholder="johnwells@mail.com" type="text" email={email} Handler={Email} NextStepHandler={NextStepHandler} EmailCheck={EmailCheck} /> }
            { microInvalid.status && <InputWrongEmail title="Email" placeholder="johnwells@mail.com" type="text" email={email} Handler={Email} NextStepHandler={NextStepHandler} EmailCheck={EmailCheck} /> }

            { fullName.length && email.length ? <NextButton Handler={EmailCheck} /> : "" }
            
            <BelowForm data={{ titleBlack: "Already have an account ?", titleBlue: "Go to Login", href: "/login"}} />
        </section>
    )
};