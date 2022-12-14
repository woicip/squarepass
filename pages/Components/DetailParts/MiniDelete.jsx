import 'tailwindcss/tailwind.css';

export default function MiniDelete(props){

    const { showMiniDelete, showMiniDeleteHandler, Handler } = props;

    function DeleteHandler(){
        Handler();
    }

    if(showMiniDelete){
        return (
            <div className="px-[20px] py-[10px] flex items-center justify-between bg-[#EC4F4F] animate-fadeInAnimate">
                <p className='w-[134px] mobile:text-[14px] text-[14px] text-white font-medium'>Are you sure ?</p>
                <div className='grid grid-cols-2'>
                    <button className="px-[25px] mobile:text-[14px] text-[14px] font-semibold text-white" onClick={showMiniDeleteHandler}>No</button>
                    <button className="py-[10px] px-[15px] bg-[#ffffff] text-[14px] font-semibold text-[#C84848] rounded-md" onClick={DeleteHandler}>Remove</button>
                </div>
            </div>
        )
    } else {
        return;        
    }

}