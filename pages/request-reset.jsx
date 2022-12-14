import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import Head from 'next/head';

// Fetchs
import FetchCheckEmail from './Fetchs/FetchCheckEmail';

// Functions
import PasswordStrength from './Functions/PasswordStrength';

// Components
import MicroInvalidMessage from './Components/FormInput/MicroInvalidMessage';
import InputEmail from './Components/FormInput/InputEmail';
import InputWrongFullName from './Components/FormInput/InputWrongFullName'; 
import InputFullName from './Components/FormInput/InputFullName'; 
import InputWrongEmail from './Components/FormInput/InputWrongEmail';
import InputPassword from './Components/FormInput/InputPassword';
import InputWrongPassword from './Components/FormInput/InputWrongPassword';
import SubmitButton from './Components/Buttons/SubmitButton';
import SubmitButtonDisabled from './Components/Buttons/SubmitButtonDisabled';
import BackButton from './Components/Buttons/BackButton';
import PasswordLevel from './Components/RegisterParts/PasswordLevel';
import Success from './Components/Screens/Success';

function Request(props){

    const { NextStep, GlobalEmailHandler } = props;
    const [ email, setEmail ] = useState('');
    const [ emailNotFound, setEmailNotFound ] = useState(false);

    function EmailHandler(value){
        setEmail(value);
    }

    function CheckEmail(){
        FetchCheckEmail({ email }, (result) => {
            if(result.success) {
                GlobalEmailHandler(email);
                NextStep();
            }
            else setEmailNotFound(true);
        });
    }

    return (
        <section className="h-full animate-fadeInAnimate">
            <section className="w-full pt-[80px] flex flex-col items-center">
                <img src="./icons/Interface Lock Circle.svg" alt="Password Reset Icon" className="w-[31px]" />
                <h1 className="mt-[10px] text-[#111111] font-bold text-[28px]">Request Reset</h1>
                <p className="text-[#ACACAC]">Please insert your email below.</p>
            </section>

            <section className="w-full mt-[166px]">
                <section className="mb-[10px]">
                    { emailNotFound && <MicroInvalidMessage message="Email Not Found" /> }
                </section>

                { !emailNotFound && <InputEmail title="Insert Email" placeholder="squarepass@mail.com" email={email} Handler={EmailHandler} /> }

                { emailNotFound && <InputWrongEmail title="Insert Email" placeholder="squarepass@mail.com" email={email} Handler={EmailHandler} /> }
                
                { email.length > 0 && <SubmitButton buttonName="Proceed Request" handler={CheckEmail} /> }

                { email.length < 1 && <SubmitButtonDisabled buttonName="Proceed Request" /> }
            </section>
        </section>
    );
}

function SecurityQuestion(props){

    const { NextStep, globalEmail } = props;

    const [ questionOrder, setQuestionOrder ] = useState(1);
    const [ questions, setQuestions ] = useState([]);
    const [ answer, setAnswer ] = useState('');
    const [ wrongAnswer, setWrongAnswer ] = useState(false);

    useEffect(() => {
        (function GetSecurityQuestion(){
            const data = { data: { email_address: globalEmail } };
            fetch(`${process.env.API_URL}/getSecurityQuestion`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    if(res.code === 200){
                        console.log(res.result.security_question);
                        setQuestions(res.result.security_question);
                    } else {
                        return;
                    }
                })
        })();
    }, []);

    function AnswerHandler(value){
        setAnswer(value);
    }

    function ChangeQuestion(){
        if(questionOrder !== 3){
            setQuestionOrder(questionOrder + 1);
        } else if(questionOrder === 3){
            setQuestionOrder(1);
        }
    }

    function CheckAnswer(){
        if(answer.toLocaleLowerCase() === questions[questionOrder-1].answer.toLocaleLowerCase()){
            setWrongAnswer(false);
            NextStep();
        } else {
            setWrongAnswer(true);
        }
    }

    return (
        <section className="h-full animate-fadeInAnimate">
            <section className="w-full pt-[80px] flex flex-col items-center">
                <img src="./icons/Interface Lock Circle.svg" alt="Password Reset Icon" className="w-[31px]" />
                <h1 className="mt-[10px] text-[#111111] font-bold text-[28px]">Security Question</h1>
                <p className="text-[#ACACAC]">Please the question below.</p>
            </section>

            <section className="w-full flex items-center justify-center">
                { questions.length > 1 && <p className="w-fit mt-[80px] text-center font-semibold text-[18px]">{questions[questionOrder-1].question}</p> }
            </section>

            <section className="w-full mt-[60px]">
                <section className="mb-[10px]">
                    { wrongAnswer && <MicroInvalidMessage message="The answer is not correct" /> }
                </section>

                { !wrongAnswer && <InputFullName title="Your Answer" placeholder="squarepass" email={answer} Handler={AnswerHandler} /> }

                { wrongAnswer && <InputWrongFullName title="Your Answer" placeholder="squarepass" email={answer} Handler={AnswerHandler} /> }
                
                { answer.length > 0 && <SubmitButton buttonName="Proceed Request" handler={CheckAnswer} /> }
                { answer.length < 1 && <SubmitButtonDisabled buttonName="Proceed Request" /> }
                
                <section className="w-full flex items-center justify-center">
                    <button className="w-fit mt-[20px] font-medium text-[#5186CB]" onClick={ChangeQuestion}>Change Question</button>
                </section>
            </section>
        </section>
    )
}


function SetPassword(props){

    const { ShowSuccess } = props;

    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ strength, setStrength ] = useState('None');
    const [ notMatch, setNotMatch ] = useState(false);

    function PasswordHandler(value){
        setPassword(value);
        setStrength(PasswordStrength(value));
    }

    function ConfirmPasswordHandler(value){
        setConfirmPassword(value);
    }

    function SavePassword(){
        if(password !== confirmPassword){
            setNotMatch(true);
        } else {
            setNotMatch(false);
            ShowSuccess();
        }
    }

    return (
        <section className="h-full animate-fadeInAnimate">
            <section className="w-full pt-[80px] flex flex-col items-center">
                <img src="./icons/Interface Lock.svg" alt="Password Reset Icon" className="w-[31px]" />
                <h1 className="mt-[10px] text-[#111111] font-bold text-[28px]">Set New Password</h1>
            </section>

            <section className="mt-[60px]"> 
                <section className="mb-[12px] flex items-center justify-between">
                    <PasswordLevel passwordLevel={strength} />
                    { notMatch && <MicroInvalidMessage message="Password Not Match" /> }
                </section>

                { !notMatch && 
                    <>
                        <InputPassword title="New Password" placeholder="**********" password={password} Handler={PasswordHandler} />
                        <InputPassword title="Confirm Password" placeholder="**********" password={confirmPassword} Handler={ConfirmPasswordHandler} />
                    </>
                }

                { notMatch && 
                    <>
                        <InputWrongPassword title="New Password" placeholder="**********" password={password} PasswordHandler={PasswordHandler} />
                        <InputWrongPassword title="Confirm Password" placeholder="**********" password={confirmPassword} PasswordHandler={ConfirmPasswordHandler} />
                    </>
                }

                <section className="mt-[15px]">
                    <SubmitButton buttonName="Reset Password" handler={SavePassword} />
                </section>
            </section>
        </section>
    )
}


export default function RequestReset(props){

    const [ globalEmail, setGlobalEmail ] = useState('');
    const [ success, setSuccess ] = useState(false);
    const [ step, setStep ] = useState(1);

    function NextStep(){
        setStep(step + 1);
    }

    function BackStep(){
        setStep(step - 1);
    }

    function ShowSuccess(){
        setSuccess(true);
    }

    function GlobalEmailHandler(value){
        setGlobalEmail(value);
    }

    return (
        <section className="h-full px-[30px]">
            <Head>
                <title>Request Password Reset</title>
                <meta name="description" content="Request Password Reset" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            { !success && 
                <>
                    { step === 1 && <Request NextStep={NextStep} GlobalEmailHandler={GlobalEmailHandler} /> }
                    { step === 2 && <SecurityQuestion NextStep={NextStep} globalEmail={globalEmail} /> }
                    { step === 3 && <SetPassword ShowSuccess={ShowSuccess} /> }
                    
                    { step > 1 &&
                        <section className="fixed bottom-0 py-[20px] animate-fadeInAnimate">
                            <BackButton Handler={BackStep}>Back</BackButton>
                        </section>
                    }
                </>
            }

            { success && <Success title="Password Resetted" desc="Your new password can be used now" page="/login" buttonName="Login" metaTitle="Success Reset Password" /> }
        </section>
    )
}