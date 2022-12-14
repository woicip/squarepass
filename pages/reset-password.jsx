import 'tailwindcss/tailwind.css';
import styled from 'styled-components';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const ResetContainer = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 140px;
    transition: .2s ease-in-out;
    transform: ${(props) => {
        if(props.page === 1){
            return 'translateX(0px)'
        } else if(props.page === 2){
            return 'translateX(-553px)'
        } else if(props.page === 3){
            return 'translateX(-1108px)'
        }
    }};
`;

// Functions
import passwordStrength from './Functions/PasswordStrength';

// Components
import SubmitButton from './Components/Buttons/SubmitButton';
import MicroInvalidMessage from './Components/FormInput/MicroInvalidMessage';
import PasswordLevel from './Components/RegisterParts/PasswordLevel';
import InputPassword from './Components/FormInput/InputPassword';
import InputWrongPassword from './Components/FormInput/InputWrongPassword';
import InputConfirmPassword from './Components/FormInput/InputConfirmPassword';
import InputWrongConfirmPassword from './Components/FormInput/InputWrongConfirmPassword';
import Success from './Components/Screens/Success';


function RequestReset(props){

    const { nextPageHandler } = props;

    const [ email, setEmail ] = useState('');
    const [ wrongEmail, setWrongEmail ] = useState(false);
    const [ requestComplete, setRequestComplete ] = useState(false);

    function emailHandler(value){
        setEmail(value);
    }

    function requestHandler(){
        if(email.includes('@')){ // jika ada @
            if(email.includes('.')){ // jika ada .
                if(email[email.lastIndexOf('.') + 2] !== undefined){ // danjuga ... jika ada nama domain setelah .
                    setWrongEmail(false);
                    setRequestComplete(true);
                    nextPageHandler();
                } else {
                    setWrongEmail(true);
                    setRequestComplete(false);
                }
            } else { // jika tidak ada .
                setWrongEmail(true);
                setRequestComplete(false);
            }
        } else { // jika tidak ada @
            setWrongEmail(true);
            setRequestComplete(false);
        }
    }

    useEffect(() => {
        if(email.length > 0){
            setRequestComplete(true);
        } else {
            setRequestComplete(false);
        }

        return () => "";
    });

    return (
        <section className="w-[414px] mobile:w-screen">
            <section className="p-[20px] py-[80px] flex flex-col items-center justify-center">
                <img src="/icons/Interface Lock Circle.svg" alt="Lock Circle" className="w-[32px]" />
                <h1 className="text-[28px] font-bold mt-[10px]">Request Reset</h1>
                <p className="text-[#ACACAC] leading-tight">Please insert your email below.</p>
            </section>

            <section className="p-[30px]">
                <div className="flex items-center justify-between">
                    <label htmlFor="email" className="text-[16px] font-semibold">Insert Email</label>
                    { wrongEmail && <MicroInvalidMessage message="Invalid Email!" /> }
                </div>

                { !wrongEmail && <input type="text" id="email" placeholder="yourmail@mail.com" value={email} className="block mt-[15px] w-full font-medium py-[17px] px-[15px] ring-1 ring-[#BEBEBE] rounded-[7px] focus:outline-none focus:ring-2 focus:ring-spblue" onChange={(e) => emailHandler(e.target.value)} /> }
                
                { wrongEmail && <input type="text" id="email" placeholder="yourmail@mail.com" value={email} className="block mt-[15px] w-full font-medium py-[17px] px-[15px] ring-2 ring-[#FF4B4B] bg-[#FF4B4B]/10 rounded-[7px] focus:outline-none" onChange={(e) => emailHandler(e.target.value)} /> }

                <div className="mt-[15px]">
                    { requestComplete && <SubmitButton buttonName="Request Reset" handler={requestHandler} /> }
                </div>
            </section>
        </section>
    );
}

function SecurityQuestion(props){

    const { nextPageHandler } = props;

    const [ answer, setAnswer ] = useState('');
    const [ questionCollection, setQuestionCollection ] = useState([
        { question: "What is your favorite movie ?", answer: "MARVEL" },
        { question: "What city do you live in ?", answer: "JKT" },
        { question: "What is your pet's name ?", answer: "AGUS" }
    ]);
    const [ questionOrder, setQuestionOrder ] = useState(1);
    const [ wrongAnswer, setWrongAnswer ] = useState(false);
    const [ proceedComplete, setProceedComplete ] = useState(false);

    function questionGenerator(){
        return questionCollection[questionOrder - 1].question;
    }

    function changeQuestionHandler(){
        if(questionOrder === 3){
            setQuestionOrder(1);
        } else {
            setQuestionOrder(questionOrder + 1);
        }
    }

    function answerHandler(value){
        setAnswer(value);
    }

    function checkAnswerHandler(){
        const getQuestion = questionGenerator();
        const qna = questionCollection.filter(qna => qna.question === getQuestion)[0];
        if(answer === qna.answer){
            setWrongAnswer(false);
            nextPageHandler();

        } else {
            setWrongAnswer(true);
        }
    }

    useEffect(() => {
        if(answer.length){
            setProceedComplete(true);
        } else {
            setProceedComplete(false);
        }
    });

    return (
        <section className="w-[414px] mobile:w-screen">
            <section className="p-[20px] py-[80px] flex flex-col items-center justify-center">
                <img src="/icons/Interface Pad Lock Shield.svg" alt="Lock Circle" className="w-[32px] animate-fadeInAnimate" />
                <h1 className="text-[28px] font-bold mt-[10px] animate-fadeInAnimate">Security Question</h1>
                <p className="text-[#ACACAC] leading-tight animate-fadeInAnimate">Please answer the question below.</p>
            </section>

            <section className="p-[30px] flex flex-col items-center justify-center">
                <h1 className="text-[18px] font-semibold mb-[55px] animate-fadeInAnimate">{questionGenerator()}</h1>

                <div className="w-full flex justify-start">
                    { wrongAnswer && <MicroInvalidMessage message="Wrong Answer!" /> }
                </div>

                { !wrongAnswer && <input type="text" placeholder="Answer" value={answer} className="block mt-[15px] w-full font-medium py-[17px] px-[15px] ring-1 ring-[#BEBEBE] rounded-[7px] focus:outline-none focus:ring-2 focus:ring-spblue" onChange={(e) => answerHandler(e.target.value)} /> }

                { wrongAnswer && <input type="text" placeholder="Answer" value={answer} className="block mt-[15px] w-full font-medium bg-[#FF4B4B]/10 py-[17px] px-[15px] ring-2 ring-[#FF4B4B] rounded-[7px] focus:outline-none" onChange={(e) => answerHandler(e.target.value)} /> }
                

                { proceedComplete && <SubmitButton buttonName="Proceed Reset" handler={checkAnswerHandler} /> }
                <button className="py-[18px] font-medium text-[#5186CB]" onClick={changeQuestionHandler}>Change Question</button>
            </section>
        </section>
    );
}

function SetYourPassword(props){
    
    const { nextPageHandler, resetPasswordHandler } = props;

    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ wrongPassword, setWrongPassword ] = useState(false);
    const [ passwordLevel, setPasswordLevel ] = useState('None');

    function passwordHandler(value){
        setPassword(value);
        const strength = passwordStrength(value);
        setPasswordLevel(strength);
    }

    function confirmPasswordHandler(value){
        setConfirmPassword(value);
    }
    
    function check2Password(){
        if(password !== confirmPassword){
            setWrongPassword(true);
        } else {
            setWrongPassword(false);
            resetPasswordHandler();
        }
    }

    return (
        <section className="p-[30px] w-[414px] mobile:w-screen">
            <section className="p-[20px] py-[80px] flex flex-col items-center justify-center">
                <img src="/icons/Interface Lock.svg" alt="Lock Circle" className="w-[32px]" />
                <h1 className="text-[28px] font-bold mt-[10px]">Set New Password</h1>
                <p className="text-[#ACACAC] leading-tight">Set your new password below.</p>
            </section>

            <section>
                <div className="mb-[12px] flex items-center justify-between">
                    <PasswordLevel passwordLevel={passwordLevel} />
                    { wrongPassword && <MicroInvalidMessage message="Password are not match!" /> }
                </div>

                { !wrongPassword &&
                    <div>
                        <InputPassword title="New Password" password={password} passwordHandler={passwordHandler} />
                        <InputConfirmPassword title="Confirm Password" confirmPassword={confirmPassword} setConfirmPassword={confirmPasswordHandler} />
                    </div>
                }

                { wrongPassword &&
                    <div>
                        <InputWrongPassword title="New Password" password={password} passwordHandler={passwordHandler} />
                        <InputWrongConfirmPassword title="Confirm Password" confirmPassword={confirmPassword} setConfirmPassword={confirmPasswordHandler} />
                    </div>
                }

                { confirmPassword.length > 0 && <SubmitButton buttonName="Reset Password" handler={check2Password} /> }
            </section>
        </section>
    )
}

export default function ResetPassword(props){

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ resetPassword, setResetPassword ] = useState(false);

    function userEmailHandler(value){
        setUserEmail(value);
    }
    
    function nextPageHandler(){
        setCurrentPage(currentPage + 1);
    }

    function resetPasswordHandler(){
        setResetPassword(true);
    }

    if(resetPassword){
        return <Success title="Password Resetted" desc="Your new password can be used now" page="/login" buttonName="Login" metaTitle="Success Reset" />

    } else {
        return (
            <section>
                <Head>
                    <title>Reset Password</title>
                    <meta name="description" content="Account" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
    
                <section className="w-full overflow-hidden">
                    <ResetContainer page={currentPage}>
                        <RequestReset userEmailHandler={userEmailHandler} nextPageHandler={nextPageHandler} />
                        <SecurityQuestion nextPageHandler={nextPageHandler} />
                        <SetYourPassword resetPasswordHandler={resetPasswordHandler} />
                    </ResetContainer>
                </section>
            </section>
        )
    }
}