import { useState, useEffect, useReducer } from 'react';
import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import styled from 'styled-components';

// Components
import Logo from './Components/Logo/Logo';
import BackButton from './Components/Buttons/BackButton';
import Success from './Components/Screens/Success';

// Register Parts
import NameEmail from './Components/RegisterParts/NameEmail';
import SetYourPassword from './Components/RegisterParts/SetYourPassword';
import SetSecurityQuestion from './Components/RegisterParts/SetSecurityQuestion';
import CreatingAccount from './Components/RegisterParts/CreatingAccount';

// Functions
import PasswordStrength from './Functions/PasswordStrength';

// Styled Components
const MovingFormContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 400px;
    transition: .2s ease-in-out;
    transform: translateX(${props => {
        if(props.step === 1) return '0px' 
        else if(props.step === 2) return '-748px'
        else if(props.step === 3) return '-1500px'
    }});

    @media (max-width: 425px){
        transform: translateX(${props => {
            if(props.step === 1) return '0px'
            else if(props.step === 2) return '-700px'
            else if(props.step === 3) return '-1395px'
        }});
    };
`;

function SlideTransition(){
    return (
        <MovingFormContainer step={step}>
    
            <NameEmail fullName={fullName} email={email} FullNameHandler={FullNameHandler} EmailHandler={EmailHandler} NextStepHandler={NextStepHandler} />

            <SetYourPassword
                password={password} PasswordHandler={PasswordHandler}
                confirmPassword={confirmPassword} ConfirmPasswordHandler={ConfirmPasswordHandler}
                passwordLevel={passwordLevel} PasswordLevelHandler={PasswordLevelHandler} 
                NextStepHandler={NextStepHandler}
            />

            <SetSecurityQuestion 
                successPageHandler={successPageHandler} creatingPageHandler={creatingPageHandler}
                fullName={fullName} email={email} password={password} questionCollection={questionCollection} 
                dropdown={dropdown} ToggleDropdownHandler={ToggleDropdownHandler}
                answer={answer} AnswerHandler={AnswerHandler}
                questionPick={questionPick} QuestionPickHandler={QuestionPickHandler}
                questionOrder={questionOrder} QuestionOrderHandler={QuestionOrderHandler} 
                ResetQuestionAnswer={ResetQuestionAnswer} SaveQuestionHandler={SaveQuestionHandler} 
                questionList={questionList} RemoveOneQuestionHandler={RemoveOneQuestionHandler}
            />

        </MovingFormContainer>
    )
}

const initialState = {
    step: 1,
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    passwordLevel: 'None',
    questionOrder: 1,
    questionList: [ 
        "What is your pet's name ?", "What is your mother's name ?", 
        "What is your father's name ?", "What city do you live in ?",  
        "What is your favourite movie ?"
    ],
    questionPick: 'Select Question',
    answer: '',
    questionCollection: [],
    dropdown: false,
}

function reducer(state, action){
    switch(action.type){
        case "ADD_STEP":
            return { ...state, step: state.step + 1 };

        case "BACK_STEP":
            return { ...state, step: state.step - 1 };
        
        case "SET_FULLNAME":
            return { ...state, fullName: action.payload };

        case "SET_EMAIL":
            return { ...state, email: action.payload };

        case "SET_PASSWORD":
            return { ...state, password: action.payload };

        case "SET_CONFIRM_PASSWORD":
            return { ...state, confirmPassword: action.payload };

        case "SET_PASSWORD_LEVEL":
            return { ...state, passwordLevel: action.payload };

        case "ADD_QUESTION_ORDER":
            return { ...state, questionOrder: state.questionOrder + 1 };

        case "RESET_QUESTION_ORDER":
            return { ...state, questionOrder: 1 };

        case "REMOVE_QUESTION_LIST":
            return { ...state, questionList: action.payload };

        case "RESET_QUESTION_LIST":
            return { ...state, questionList: [ "What is your pet's name ?", "What is your mother's name ?", "What is your father's name ?", "What city do you live in ?", "What is your favourite movie ?" ]};

        case "SET_QUESTION_PICK":
            return { ...state, questionPick: action.payload };

        case "SET_ANSWER":
            return { ...state, answer: action.payload };

        case "RESET_QUESTION_ANSWER":
            return { ...state, questionPick: "Select Question", answer: "" };

        case "ADD_QUESTION_COLLECTION":
            return { ...state, questionCollection: [ ...state.questionCollection, action.payload ] };

        case "RESET_QUESTION_COLLECTION":
            return { ...state, questionCollection: [] };

        case "TOGGLE_DROPDOWN":
            return { ...state, dropdown: state.dropdown ? false : true };

        default:
            return state;
    }
}

export default function Register(props){
    
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const { step, fullName, email, password, confirmPassword, passwordLevel, questionOrder, questionList, questionPick, answer, questionCollection, dropdown } = state;

    const NextStepHandler = () => {
        dispatch({ type: "ADD_STEP" });
    }

    const BackStepHandler = () => {
        dispatch({ type: "BACK_STEP" });
    }

    const FullNameHandler = (fullName) => {
        dispatch({ type: "SET_FULLNAME", payload: fullName });
    }

    const EmailHandler = (email) => {
        dispatch({ type: "SET_EMAIL", payload: email });
    }

    const PasswordHandler = (password) => {
        dispatch({ type: "SET_PASSWORD", payload: password });
    }

    const ConfirmPasswordHandler = (confirmPassword) => {
        dispatch({ type: "SET_CONFIRM_PASSWORD", payload: confirmPassword });
    }

    const PasswordLevelHandler = (value) => {
        const strength = PasswordStrength(value);
        dispatch({ type: "SET_PASSWORD_LEVEL", payload: strength });
    }

    const QuestionOrderHandler = () => {
        dispatch({ type: "ADD_QUESTION_ORDER" });
    }

    const RemoveOneQuestionHandler = (question) => {
        const newQuestionList = state.questionList.filter(q => q !== state.questionPick);
        dispatch({ type: "REMOVE_QUESTION_LIST", payload: newQuestionList });
    }

    const QuestionPickHandler = (question) => {
        dispatch({ type: "SET_QUESTION_PICK", payload: question });
    }

    const AnswerHandler = (answer) => {
        dispatch({ type: "SET_ANSWER", payload: answer });
    }

    const ResetQuestionAnswer = () => {
        dispatch({ type: "RESET_QUESTION_ANSWER" });
    }

    const SaveQuestionHandler = () => {
        const QnA = { question: state.questionPick, answer: state.answer };
        dispatch({ type: "ADD_QUESTION_COLLECTION", payload: QnA });
    }

    const ToggleDropdownHandler = () => {
        dispatch({ type: "TOGGLE_DROPDOWN" });
    }

    const ResetSecurityQuestionHandler = () => {
        dispatch({ type: "RESET_QUESTION_ORDER" });
        dispatch({ type: "RESET_QUESTION_LIST" });
        dispatch({ type: "RESET_QUESTION_COLLECTION" });
        ResetQuestionAnswer();
    }

    function BackHandler(){
        BackStepHandler();
        ResetSecurityQuestionHandler();
    }

    // For testing purpose
    // useEffect(() => {
    //     console.log(state);
    // }, [state]);

    // Creating Your Account
    const [ creatingPage, setCreatingPage ] = useState(false);
    function creatingPageHandler(){ creatingPage ? setCreatingPage(false) : setCreatingPage(true) };

    // Success Page
    const [ success, setSuccess ] = useState(false);
    function successPageHandler(){ 
        setCreatingPage(false);
        setSuccess(true);
    };

    if(creatingPage){
        return (
            <section className="flex flex-col h-full p-[20px] overflow-hidden">
                <Head>
                    <title>Creating Your Account ...</title>
                    <meta name="description" content="Sign Up - Square Pass" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <CreatingAccount />
            </section>
        );

    } else if(success) {
        return (
            <section className="flex flex-col h-full p-[20px] overflow-hidden">
                <Head>
                    <title>Creating Your Account ...</title>
                    <meta name="description" content="Sign Up - Square Pass" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Success title="Success Created Account" desc="You now can login" page="/login" buttonName="Go to Login" metaTitle="Success Created Account" />
            </section>
        )
    }else {
        return (
            <section className="flex flex-col justify-between h-full p-[30px] pb-[40px] overflow-hidden">
                <Head>
                    <title>Sign Up</title>
                    <meta name="description" content="Sign Up - Square Pass" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
    
                { step < 3 ? <Logo /> : '' }
    
                <section className='max-h-full mobile:mt-[0px] relative'>
                    
                    { step === 1 &&
                        <NameEmail fullName={fullName} email={email} FullNameHandler={FullNameHandler} EmailHandler={EmailHandler} NextStepHandler={NextStepHandler} />
                    }

                    { step === 2 &&
                        <SetYourPassword
                            password={password} PasswordHandler={PasswordHandler}
                            confirmPassword={confirmPassword} ConfirmPasswordHandler={ConfirmPasswordHandler}
                            passwordLevel={passwordLevel} PasswordLevelHandler={PasswordLevelHandler} 
                            NextStepHandler={NextStepHandler}
                        />
                    }

                    { step === 3 &&
                        <SetSecurityQuestion
                            successPageHandler={successPageHandler} creatingPageHandler={creatingPageHandler}
                            fullName={fullName} email={email} password={password} questionCollection={questionCollection} 
                            dropdown={dropdown} ToggleDropdownHandler={ToggleDropdownHandler}
                            answer={answer} AnswerHandler={AnswerHandler}
                            questionPick={questionPick} QuestionPickHandler={QuestionPickHandler}
                            questionOrder={questionOrder} QuestionOrderHandler={QuestionOrderHandler} 
                            ResetQuestionAnswer={ResetQuestionAnswer} SaveQuestionHandler={SaveQuestionHandler} 
                            questionList={questionList} RemoveOneQuestionHandler={RemoveOneQuestionHandler}
                        />
                    }
    
                </section>

                <section className="">
                    { step > 1 ? <BackButton Handler={BackHandler}> Back </BackButton> : "" }
                </section>
                
    
            </section>
        );
    }

}