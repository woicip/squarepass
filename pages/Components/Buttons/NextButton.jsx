import 'tailwindcss/tailwind.css';

export default function NextButton(props){

    const { SubmitCheckEmail, SaveQuestionHandler, QuestionOrderHandler, ResetQuestionAnswer, stepHandler, PasswordCheck, EmailCheck, RemoveOneQuestionHandler, questionPick, Handler } = props;

    function clickHandler(e){
        Handler(e);
    }

    return (
        <button type="submit" className='w-full mt-[10px] py-[14px] font-bold text-white bg-spblue rounded-lg flex items-center justify-center focus:outline-2 focus:outline-blue-400 focus:outline focus:outline-offset-2 animate-fadeInAnimate' onClick={clickHandler}> Next <img src="/arrow.svg" alt="arrow-right" className="ml-3" /> </button>
    )
}