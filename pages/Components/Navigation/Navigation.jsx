import 'tailwindcss/tailwind.css';

export default function Navigation(props){

    const [ active, setActive ] = useState('');

    const Context = useContext(PageContext);
    const { state: { current } } = Context;

    useEffect(() => {
        if(current === 'home') setActive('home');
        else if(current === 'create') setActive('create');
        else if(current === 'account') setActive('account');
    });

    return (
        <section className="fixed bottom-0 w-[414px] border-t mobileL:w-screen mobileM:w-screen mobileS:w-screen flex items-center justify-evenly bg-white animate-fadeInAnimate">
            <Link href="/home">
                <button className="px-[20px] py-[12px] relative flex flex-col items-center" onClick={() => setActive("home")}>
                    { active !== 'home' &&  <img src="/navigations/home.svg" alt="Home" className="w-[24px]" /> } 
                    { active === 'home' &&  <img src="/navigations/home-active.svg" alt="Home" className="w-[24px]" /> }
                </button>
            </Link>

            <Link href="/create">
                <button className="px-[20px] py-[12px] relative flex flex-col items-center" onClick={() => setActive("create")}>
                    { active !== 'create' && <img src="/navigations/add.svg" alt="Create" className="w-[24px]" /> }
                    { active === 'create' && <img src="/navigations/add-active.svg" alt="Create" className="w-[24px]" /> }
                </button>
            </Link>

            <Link href="/account">
                <button className="px-[20px] py-[12px] relative flex flex-col items-center" onClick={() => setActive("account")}>
                    { active !== 'account' && <img src="/navigations/account.svg" alt="Account" className="w-[24px]" /> }
                    { active === 'account' && <img src="/navigations/account-active.svg" alt="Account" className="w-[24px]" /> }
                </button>
            </Link>
        </section>
    );
}