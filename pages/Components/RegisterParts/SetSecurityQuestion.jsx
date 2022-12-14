import 'tailwindcss/tailwind.css';
import { useEffect } from 'react';

// Fetchs
import FetchRegister from '../../Fetchs/FetchRegister';

// Components
import SecurityQuestionPicks from './SecurityQuestionPicks';
import NextButton from '../Buttons/NextButton';
import SubmitButton from '../Buttons/SubmitButton';

export default function SetSecurityQuestion(props){

    const { 
        successPageHandler, creatingPageHandler,
        fullName, email, password, questionCollection, 
        dropdown, ToggleDropdownHandler, 
        answer, AnswerHandler, 
        questionPick, QuestionPickHandler, 
        questionOrder, QuestionOrderHandler, 
        ResetQuestionAnswer, SaveQuestionHandler, 
        questionList, RemoveOneQuestionHandler  } = props;

    let next;
    let create;

    function FetchRegister(){
        creatingPageHandler();

        const RegisterData = {
            data: {
                full_name: fullName, 
                email_address: email, 
                password: password, 
                security_question: questionCollection,
            }
        }

        setTimeout(() => {
            FetchRegister(() => {
                window.location.href = "/login";
            });
        }, 3000)
    }

    function CreateAccountHandler(){
        // Fetched register to API Service
        // Save the last question and answer
        SaveQuestionHandler();
        ResetQuestionAnswer();
        RemoveOneQuestionHandler();
    }

    function Next(){
        SaveQuestionHandler();
        QuestionOrderHandler();
        ResetQuestionAnswer();
        RemoveOneQuestionHandler();
    }

    useEffect(() => {
        if(questionCollection.length == 3) FetchRegister();
    }, [questionCollection]);


    if(answer.length && questionPick.length && questionOrder < 3){
        next = <NextButton Handler={Next} />
    } 

    if(answer.length && questionPick.length && questionOrder === 3){
        create = <SubmitButton buttonName="Create Account" handler={CreateAccountHandler}  /> 
    }

    return (
        <section className="w-full max-h-full mb-[100px] section-3 animate-fadeInAnimate">
            <div>
                <div className="flex items-start justify-between">
                    <img src="/icons/Interface Pad Lock Shield.svg" alt="Pad-Lock-Shield" className="w-[32px] mr-[10px]" />
                    <h1 className="w-full text-[28px] font-bold mobileL:text-[23px] leading-tight">Set Security Question</h1>
                </div>

                <p className='mt-[14px] text-[14px] text-[#ACACAC]'>It'll be useful when you forget your password in the future.</p>
            </div>


            <div className='mt-[150px]'>
                <div className="w-fit text-[13px] mb-[15px] py-[6px] px-[15px] bg-spblue rounded-full text-white font-medium">{questionOrder} of 3</div>

                <div className='relative'>
                    <button className='flex items-center justify-between w-full mb-[10px] py-[14px] px-[15px] text-[15px] text-left font-medium ring-1 ring-[#e9e9e9] rounded-lg focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#5186CB]' onClick={ToggleDropdownHandler}>{questionPick} <img src="/icons/Dropdown.svg" alt="dropdown" className="w-[12px] mr-[6px]" /> </button>
                     
                    { dropdown && <SecurityQuestionPicks
                        questionList={questionList}
                        QuestionPickHandler={QuestionPickHandler}
                        ToggleDropdownHandler={ToggleDropdownHandler}
                    /> }

                    <input type="text" placeholder="Your Answer" value={answer} className="w-full py-[14px] text-[15px] px-[15px] ring-1 ring-[#e9e9e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-spblue" onChange={(e) => AnswerHandler(e.target.value) } /> 

                    { next }
                    
                    { create !== undefined &&
                        <div>
                            {create}
                            <p className="text-[12px] mt-[12px] text-[#DBDBDB] animate-fadeInAnimate">
                                By clicking <span className="underline">Create Account</span> means you're agree that we won't
                                share your data to anyone or another network.
                            </p>
                        </div>
                    }
                    
                </div>
            </div>
        </section>
    );
}