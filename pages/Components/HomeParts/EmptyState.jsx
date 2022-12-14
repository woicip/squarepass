import 'tailwindcss/tailwind.css';

export default function EmptyState(){
    return (
        <section className="flex flex-col items-center">
            <div className="mt-[300px] mobile:mt-[200px] flex flex-col items-center justify-center w-fit h-fit">
                <p className="mt-[10px] text-[#BEBEBE] text-[14px] text-center animate-fadeInAnimate">
                    There's no account,<br/>
                    Add your new account.
                </p>
            </div>
        </section>
    );
}