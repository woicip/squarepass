import 'tailwindcss/tailwind.css';
import styled from 'styled-components';
import { useState, useEffect, useReducer, useContext } from 'react';
import Head from 'next/head';

// Context Component
import { PageContext } from './Context/Context';

// Fetchs
import FetchCheckEmail from './Fetchs/FetchCheckEmail';
import FetchLogin from './Fetchs/FetchLogin';

// Components
import Logo from './Components/Logo/Logo';
import Email from './Components/FormInput/Email';
import Password from './Components/FormInput/Password';
import WrongEmail from './Components/FormInput/WrongEmail';
import NextButton from './Components/Buttons/NextButton';
import NextButtonDisabled from './Components/Buttons/NextButtonDisabled';
import SignInButton from './Components/Buttons/SignInButton';
import SignInButtonDisabled from './Components/Buttons/SignInButtonDisabled';
import MicroInvalidMessage from './Components/FormInput/MicroInvalidMessage';
import BackButton from './Components/Buttons/BackButton';
import BelowForm from './Components/FormInput/BelowForm';

const FormContainer = styled.section.attrs(props => ({
    className: "formContainer",
}))`
    position: absolute;
    left: 0;

    width: max-content;
    height: fit-content;

    border: 1px solid red;

    display: grid;
    gap: 100px;
    grid-template-columns: 1fr 1fr;

    transition: .3s ease-in-out;
    transform: ${ props => props.move ? 'translateX(-56%)' : 'translateX(0%)' };

    @media only screen and (max-width: 425px){
        transform: ${ props => props.move ? 'translateX(-56%)' : 'translateX(0%)' };
    }

    @media only screen and (max-width: 375px){
        transform: ${ props => props.move ? 'translateX(-56.7%)' : 'translateX(0%)' };
    }

    @media only screen and (max-width: 320px){
        transform: ${ props => props.move ? 'translateX(-58%)' : 'translateX(0%)' };
    }
`;

function EmailForm(props){

    const { next, microInvalid, wrongEmail, SetWrongEmail, email, InputCheckEmail, SetEmail, inputCheck, SubmitCheckEmail } = props;

    return (
        <section className='w-[350px] mobileL:w-[360px] mobileM:w-[310px] mobileS:w-[255px] flex flex-col justify-between bg-white animate-fadeInAnimate'>
            <div className='flex items-center justify-between mb-[10px]'>
                <label htmlFor='email' className='w-fit text-[15px] font-semibold animate-fadeInAnimate'>Insert Email Address</label>
                { microInvalid.status && <MicroInvalidMessage message={microInvalid.message} /> }
            </div>

            { !wrongEmail && <Email email={email} InputCheckEmail={InputCheckEmail} inputCheck={inputCheck} SubmitCheckEmail={SubmitCheckEmail} /> }
            { wrongEmail &&  <WrongEmail email={email} SetEmail={SetEmail} SetWrongEmail={SetWrongEmail} inputCheck={inputCheck} /> }

            { next && <NextButton Handler={SubmitCheckEmail} /> }
            { !next && <NextButtonDisabled /> }

            <BelowForm data={{ titleBlack: "Don't have account ?", titleBlue: "Create an Account", href: "/register" }} />
        </section>
    )
}

function PasswordForm(props){

    const { signIn, microInvalid, wrongPassword, password, setPassword, setSignIn, SubmitCheckPassword } = props;

    return (
        <section className='w-[350px] mobileL:w-[360px] mobileM:w-[310px] mobileS:w-[255px] flex flex-col justify-between bg-white animate-fadeInAnimate'>
            <div className='flex items-center justify-between mb-[20px]'>
                <label htmlFor='password' className='w-fit text-[16px] font-semibold'>Insert your password</label>
                { microInvalid.status && <MicroInvalidMessage message={microInvalid.message} /> }
            </div>

            { !wrongPassword && <Password password={password} setPassword={setPassword} setSignIn={setSignIn} /> }
            { wrongPassword &&  <Password password={password} setPassword={setPassword} /> }

            { signIn && <SignInButton SubmitCheckPassword={SubmitCheckPassword} /> }
            { !signIn && <SignInButtonDisabled /> }

            <BelowForm data={{ titleBlack: "Forget Your Password ?", titleBlue: "Request Reset Password", href: "/reset-password" }} />
        </section>
    )
}


function SlideTransition(props){

    const { moveNext, next, signIn, microInvalid, Email, Password } = props;

    return (
        <FormContainer move={moveNext}>
            <EmailForm next={next} microInvalid={microInvalid} wrongEmail={Email.wrongEmail} 
                email={Email.email} InputCheckEmail={Email.InputCheckEmail} inputCheck={Email.inputCheck} SubmitCheckEmail={Email.SubmitCheckEmail} />

            <PasswordForm signIn={signIn} microInvalid={microInvalid} wrongPassword={Password.wrongPassword} 
                password={Password.password} setPassword={Password.setPassword} setSignIn={Password.setSignIn} SubmitCheckPassword={Password.SubmitCheckPassword}  />
        </FormContainer>
    )
}

const loginState = {
    email: "",
    password: "",
    wrongEmail: false,
    inputCheck: false,
    next: false,
    microInvalid: { status: false, message: "" },
    moveNext: false,
    wrongPassword: false,
    signIn: false
}

function reducer(state, action){
    switch(action.type){
        case "SET_EMAIL":
            return { ...state, email: action.payload };

        case "SET_PASSWORD":
            return { ...state, password: action.payload };

        case "SET_WRONG_EMAIL":
            return { ...state, wrongEmail: action.payload };

        case "SET_INPUT_CHECK":
            return { ...state, inputCheck: action.payload };

        case "SET_NEXT":
            return { ...state, next: action.payload };

        case "SET_MICRO_INVALID":
            return { ...state, microInvalid: action.payload };

        case "SET_MOVE_NEXT":
            return { ...state, moveNext: action.payload };

        case "SET_WRONG_PASSWORD":
            return { ...state, wrongPassword: action.payload };

        case "SET_SIGN_IN":
            return { ...state, signIn: action.payload };
    }
}

export default function Login(props){

    const { setLoggedIn, state: { fetch_address } } = useContext(PageContext);

    const [ state, dispatch ] = useReducer(reducer, loginState);

    const SetEmail = (email) => dispatch({ type: "SET_EMAIL", payload: email });
    const SetPassword = (password) => dispatch({ type: "SET_PASSWORD", payload: password });
    const SetWrongEmail = (value) => dispatch({ type: "SET_WRONG_EMAIL", payload: value });
    const SetInputCheck = (value) => dispatch({ type: "SET_INPUT_CHECK", paylod: value });
    const SetNext = (value) => dispatch({ type: "SET_NEXT", payload: value });
    const SetMicroInvalid = (value) => dispatch({ type: "SET_MICRO_INVALID", payload: value });
    const SetMoveNext = (value) => dispatch({ type: "SET_MOVE_NEXT", payload: value });
    const SetWrongPassword = (value) => dispatch({ type: "SET_WRONG_PASSWORD", payload: value });
    const SetSignIn = (value) => dispatch({ type: "SET_SIGN_IN", payload: value });

    const InputCheckEmail = (e) => {
        const email = e.target.value;
        SetEmail(email);

        if(!state.email.length){
            SetWrongEmail(false);
            SetMicroInvalid({ status: false, message: "" });
        }

        if(state.email.includes('@')){ // jika ada @
            if(state.email.includes('.')){ // jika ada .
                if(state.email[state.email.lastIndexOf('.') + 2] !== undefined){ // danjuga ... jika ada nama domain setelah .
                    SetInputCheck(true);
                    SetWrongEmail(false);
                    SetMicroInvalid({ status: false, message: "" });

                } else {
                    SetInputCheck(false);
                }
            } else { // jika tidak ada .
                SetInputCheck(false);
            }
        } else { // jika tidak ada @
            SetInputCheck(false);
        }
    }


    function SubmitCheckEmail(e){
        e.preventDefault();
        const { email } = state;

        if(email.includes('@')){
            if(email.includes('.')){
                if(email[email.lastIndexOf('.') + 2] !== undefined){ // danjuga ... jika ada nama domain setelah .
                    FetchCheckEmail({ email: state.email }, ({ success }) => {
                        if(success){
                            SetWrongEmail(false);
                            SetMicroInvalid({ status: false, message: "" });
                            SetMoveNext(true);
                        } else {
                            SetWrongEmail(true);
                            SetMicroInvalid({ status: true, message: "Email Not Found" });
                        }
                    });

                } else {
                    SetWrongEmail(true);
                    SetMicroInvalid({ status: true, message: "Email is Invalid" });
                }
            } else {
                SetWrongEmail(true);
                SetMicroInvalid({ status: true, message: "Email is Invalid" });
            }
        } else {
            SetWrongEmail(true);
            SetMicroInvalid({ status: true, message: "Email is Invalid" });
        }
    }

    function FailedLoginHandler(failed){
        if(failed){
            SetWrongPassword(true);
            SetMicroInvalid({ status: true, message: "Wrong Password" });
            
        } else {
            SetWrongPassword(false);
            SetMicroInvalid({ status: false, message: "" });
        }
    }

    function SubmitCheckPassword(){
        // Code here to check fetched password with input password
        // If password is same then bring user to home.

        FetchLogin({ email: state.email, password: state.password }, (result) => {
            if(result.success){
                localStorage.setItem('squarepass_access_token', result.token);
                FailedLoginHandler(false);
                setLoggedIn(true);
                location.href = "/home";
                
            } else {
                FailedLoginHandler(true);
                setLoggedIn(false);
            }
        });
    }

    // if email include @ set Next button active
    useEffect(() => {
        state.email.includes('@') ? SetNext(true) :  SetNext(false);
    }, [state.email]);


    // If password length is more than 0 make Sign In button active
    useEffect(() => {
        state.password.length > 0 ? SetSignIn(true) : SetSignIn(false);
    }, [state.password]);

    return (
        <section className='flex flex-col justify-between h-full p-[30px] pb-[50px] overflow-hidden'>
            <Head>
                <title>Sign In</title>
                <meta name="description" content="Login - Square Pass" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Logo />

            <section className='mt-[150px] mb-[100px] w-full h-full relative flex items-center justify-center'>
                {/* <SlideTransition moveNext={state.moveNext} next={state.next} signIn={state.signIn} microInvalid={state.microInvalid} 
                Email={{ wrongEmail: state.wrongEmail, email: state.email, InputCheckEmail, inputCheck: state.inputCheck, SubmitCheckEmail }} 
                Password={{ wrongPassword: state.wrongPassword, password: state.password, setPassword: SetPassword, setSignIn: SetSignIn, SubmitCheckPassword }} /> */}

                { !state.moveNext &&
                    <EmailForm next={state.next} microInvalid={state.microInvalid} wrongEmail={state.wrongEmail} SetWrongEmail={SetWrongEmail}
                    email={state.email} InputCheckEmail={InputCheckEmail} SetEmail={SetEmail} inputCheck={state.inputCheck} SubmitCheckEmail={SubmitCheckEmail} />
                }

                { state.moveNext &&
                    <PasswordForm signIn={state.signIn} microInvalid={state.microInvalid} wrongPassword={state.wrongPassword} 
                    password={state.password} setPassword={SetPassword} setSignIn={SetSignIn} SubmitCheckPassword={SubmitCheckPassword} />
                }

            </section>

            { state.moveNext && <BackButton setMoveNext={SetMoveNext} setPassword={SetPassword} >Back to Email</BackButton> }

        </section>
    );
}