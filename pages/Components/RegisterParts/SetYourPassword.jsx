import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';

import PasswordLevel from './PasswordLevel';
import InputPassword from '../FormInput/InputPassword';
import InputConfirmPassword from '../FormInput/InputConfirmPassword';
import InputWrongPassword from '../FormInput/InputWrongPassword';
import InputWrongConfirmPassword from '../FormInput/InputWrongConfirmPassword';
import NextButton from '../Buttons/NextButton';
import NextButtonDisabled from '../Buttons/NextButtonDisabled';
import MicroInvalidMessage from '../FormInput/MicroInvalidMessage';

export default function SetYourPassword(props){

    const { password, PasswordHandler, confirmPassword, ConfirmPasswordHandler, passwordLevel, PasswordLevelHandler, NextStepHandler } = props;

    const [ passwordMatch, setPasswordMatch ] = useState(true);
    const [ microInvalid, setMicroInvalid ] = useState('');

    function PasswordCheck(){
        if(password.length === confirmPassword.length){ // check length
            if(password === confirmPassword){
                setPasswordMatch(true);
                NextStepHandler();
            }

        } else {
            setMicroInvalid('Password Not Match');
            setPasswordMatch(false);
        }
    }

    return (
        <section className="w-full max-h-full mb-[100px] section-2 animate-fadeInAnimate">
            <div className='mb-[40px] flex flex-col items-center justify-center'>
                <img src="/icons/Interface Lock.svg" alt="lock-icon" className="w-[30px]" />
                <h1 className="text-[26px] font-bold mt-[10px]">Set Your Password</h1>
            </div>

            <div className='mb-[12px] flex items-center justify-between'>
                <PasswordLevel passwordLevel={passwordLevel} />
                { !passwordMatch &&<MicroInvalidMessage message={microInvalid} /> }
            </div>

            { passwordMatch &&
                <div>
                    <InputPassword title="Password" password={password} PasswordHandler={PasswordHandler} PasswordLevelHandler={PasswordLevelHandler} />
                    <InputConfirmPassword title="Confirm Password" confirmPassword={confirmPassword} ConfirmPasswordHandler={ConfirmPasswordHandler} />
                </div>
            }

            { !passwordMatch &&
                <div>
                    <InputWrongPassword title="Password" password={password} PasswordHandler={PasswordHandler} PasswordLevelHandler={PasswordLevelHandler} />
                    <InputWrongConfirmPassword title="Confirm Password" confirmPassword={confirmPassword} ConfirmPasswordHandler={ConfirmPasswordHandler} />
                </div>
            }

            { password.length && confirmPassword.length ? <NextButton Handler={PasswordCheck} /> : <NextButtonDisabled /> }

        </section> 
    )
};