import 'tailwindcss/tailwind.css';

export default function SecurityQuestionPicks(props){  

    const { questionList, QuestionPickHandler, ToggleDropdownHandler } = props;

    function itemClickHandler(e){
        QuestionPickHandler(e.target.innerText);
        ToggleDropdownHandler();
    }

    function QuestionListDOM(){
        return questionList.map((question, index) => {
            if(index === 0){
                return <button key={index+1} className="w-full text-left text-[15px] py-[15px] px-[20px] border-y border-[#BEBEBE] focus:bg-[#5186CB] focus:text-white hover:bg-[#5186CB] hover:text-white" onClick={itemClickHandler}>{question}</button>

            } else {
                return <button key={index+1} className="w-full text-left text-[15px] py-[15px] px-[20px] border-b border-[#BEBEBE] focus:bg-[#5186CB] focus:text-white hover:bg-[#5186CB] hover:text-white" onClick={itemClickHandler}>{question}</button>
            }
        });
    }

    return (
        <section className="w-full h-[200px] overflow-y-scroll top-13 border border-[#5186CB] py-[10px] rounded-md absolute bg-white">
            { <QuestionListDOM /> }
        </section>
    );
}