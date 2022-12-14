import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState, useEffect, useContext } from 'react';

// Context Components
import { PageContext } from './Context/Context';

// Fetchs
import FetchSurvey from './Fetchs/FetchSurvey';
import FetchDeleteAccount from './Fetchs/FetchDeleteAccount';

// Components
import PickReason from './Components/DeleteAccountParts/PickReason';
import DeleteButton from './Components/Buttons/DeleteButton';
import DeletingAccount from './Components/DeleteAccountParts/DeletingAccount';
import Unauthorized from './Components/Screens/Unauthorized';

export default function DeleteAccount(props){

    // Initialize state navigation context
    const { setCurrentPage, resetCurrentPage, state: { isLoggedIn, fetch_address }, setLoggedIn } = useContext(PageContext);
    
    useEffect(() => {
        setCurrentPage('delete-account');
        return () => resetCurrentPage();
    }, []);

    useEffect(() => {
        /*
            Function to check whether the user's access_token is still valid
            If it isn't setLoggedIn to false otherwise true 
        */ 

        const access_token = localStorage.getItem('squarepass_access_token');
        
        if(access_token === null){
            setLoggedIn(false);
            location.href = "/login";
        
        } else {
            FetchSurvey((result) => {
                !result.authorized ? location.href = "/login" : setLoggedIn(true);
            });
        }
    }, []);

    const [ showReasons, setShowReasons ] = useState(false);
    const [ reasonPick, setReasonPick ] = useState('Pick Your Reason');
    const [ somethingElse, setSomethingElse ] = useState(false);
    const [ textReason, setTextReason ] = useState('');
    const [ deleteButtonDisabled, setDeleteButtonDisabled ] = useState(false);
    const [ deleting, setDeleting ] = useState(false);

    function showReasonsHandler(){
        showReasons ? setShowReasons(false) : setShowReasons(true);
    }

    function reasonHandler(value){
        if(value === 'Something Else'){
            setSomethingElse(true);
            setDeleteButtonDisabled(true);
        } else {
            setSomethingElse(false);
            setDeleteButtonDisabled(false);
        }
        
        setReasonPick(value);
        setShowReasons(false);
    }

    function textReasonHandler(value){
        setTextReason(value);
    }

    function deletingHandler(){
        setDeleting(true);

        FetchDeleteAccount(reasonPick, (result) => {
            if(result.success){
                localStorage.removeItem('squarepass_access_token');
                localStorage.removeItem('grid_mode');
                localStorage.removeItem('xyzsec_id');
                location.href = "/login"
            } else {
                setDeleting(false);
                alert("Failed delete user account");
            }
        });
    }

    useEffect(() => {
        if(somethingElse){
            if(textReason.length > 5){
                setDeleteButtonDisabled(false);
            } else {
                setDeleteButtonDisabled(true);
            }
        }

        return () => "";
    });

    const [ dots, setDots ] = useState('');

    useEffect(() => {
        const id = setInterval(() => {
            if(dots === '...'){
                setDots('')
            } else { 
                setDots(`${dots}.`);
            }
        }, 500);

        return () => clearInterval(id);
    });

    if(isLoggedIn){
        if(deleting){
            return (
                <section>
                    <Head>
                        <title>Deleting Account {dots}</title>
                        <meta name="description" content="Account" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
    
                    <DeletingAccount />
                </section>
            )
        } else {
            return (
                <section>
                    <Head>
                        <title>Delete Account</title>
                        <meta name="description" content="Account" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
        
                    <section className="pt-[50px] p-[20px] flex items-center animate-fadeInAnimate">
                        <img src="/icons/Interface Delete Bin 2.svg" alt="delete-icon" className="w-[36px]" />
                        <div className="ml-[16px]">
                            <p className="leading-tight text-[16px] font-semibold">Are you sure want to delete this account ?</p>
                        </div>
                    </section>
                
                    <section className="p-[20px] mt-[40px]">
                        <h1 className='w-fit font-semibold text-center px-[45px] animate-fadeInAnimate'>What is your reason to delete your account ?</h1>
        
                        <PickReason reasonPick={reasonPick} showReasonsHandler={showReasonsHandler}>
                            <div>
                                { showReasons && 
                                    <section className="w-full mt-[10px] mobile:w-[318px] h-fit top-13 border border-spblue py-[0px] rounded-md absolute z-10 bg-white overflow-y-scroll animate-fadeInAnimate">
                                        <button className="w-full text-left text-[15px] py-[14px] px-[20px] hover:text-white hover:bg-spblue border-b font-medium focus:text-white focus:bg-spblue" onClick={(e) => reasonHandler(e.target.innerText)}>I don't like this app</button>
                                        <button className="w-full text-left text-[15px] py-[14px] px-[20px] hover:text-white hover:bg-spblue border-b font-medium focus:text-white focus:bg-spblue" onClick={(e) => reasonHandler(e.target.innerText)}>Bad experience with the app</button>
                                        <button className="w-full text-left text-[15px] py-[14px] px-[20px] hover:text-white hover:bg-spblue border-b font-medium focus:text-white focus:bg-spblue" onClick={(e) => reasonHandler(e.target.innerText)}>The app is confusing me</button>
                                        <button className="w-full text-left text-[15px] py-[14px] px-[20px] hover:text-white hover:bg-spblue border-b font-medium focus:text-white focus:bg-spblue" onClick={(e) => reasonHandler(e.target.innerText)}>Something Else</button>
                                    </section>
                                }
                            </div>
                        </PickReason>
        
        
                        { somethingElse &&
                            <textarea placeholder="Tell me your reason ..." value={textReason} className="w-full h-[100px] mt-[10px] py-[14px] px-[20px] ring-1 ring-[#e9e9e9] rounded-[7px]" onChange={(e) => textReasonHandler(e.target.value)} />
                        }
        
                        <div className="mt-[10px]">
                            { reasonPick !== 'Pick Your Reason' && <DeleteButton buttonName="Delete My Account" disabled={deleteButtonDisabled} handler={deletingHandler} /> }
                            
                            { reasonPick !== 'Pick Your Reason' && 
                                <p className="text-[12px] mt-[10px] text-[#BEBEBE] leading-tight animate-fadeInAnimate">By clicking <span className="text-red-400">Delete My Account</span> means you are agree that you data will be lost forever and we won't backup your data. This process can't be undone.</p>
                            }
                        </div>
                        
                    </section>
                </section>
            )
        }
    } else {
        return null;
    }

}