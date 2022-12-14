import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useEffect, useState, useContext } from 'react';

// Context Components
import { PageContext } from './Context/Context';

// Fetchs
import FetchSurvey from './Fetchs/FetchSurvey';
import FetchUpdateEmail from './Fetchs/FetchUpdateEmail';
import FetchCheckPassword from './Fetchs/FetchCheckPassword';

// Components
import InputEmail from './Components/FormInput/InputEmail';
import InputWrongEmail from './Components/FormInput/InputWrongEmail';
import InputPassword from './Components/FormInput/InputPassword';
import InputWrongPassword from './Components/FormInput/InputWrongPassword';
import SubmitButton from './Components/Buttons/SubmitButton';
import MicroInvalidMessage from './Components/FormInput/MicroInvalidMessage';
import Unauthorized from './Components/Screens/Unauthorized';

export default function ChangeEmail(props){

    // Initialize state navigation context
    const { setCurrentPage, resetCurrentPage, state: { isLoggedIn, user, fetch_address }, setLoggedIn } = useContext(PageContext);
    
    useEffect(() => {
        setCurrentPage('change-email');
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

    const [ email, setEmail ] = useState('');
    const [ wrongEmail, setWrongEmail ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ wrongPassword, setWrongPassword ] = useState(false);
    const [ formComplete, setFormComplete ] = useState(false);

    function emailHandler(value){ 
        setEmail(value);
    }

    function passwordHandler(value){
        setPassword(value);
    }

    function checkEmailHandler(){
        if(email.includes('@')){ // jika ada @
            if(email.includes('.')){ // jika ada .
                if(email[email.lastIndexOf('.') + 2] !== undefined){ // dan juga ... jika ada nama domain setelah .
 
                    FetchCheckPassword(password, (res) => {
                        if(res.success){
                            FetchUpdateEmail(email, (result) => {
                                if(result.success){
                                    localStorage.setItem('squarepass_access_token', result.token)
    
                                    setWrongPassword(false);
                                    setWrongEmail(false);
                                    setFormComplete(true);

                                    location.href = "/account";
                                } else {
                                    alert("Failed Update Email");
                                }
                            });

                        } else {
                            setWrongPassword(true);
                        }
                    });

                } else {
                    setWrongEmail(true);
                    setFormComplete(false);
                }
            } else { // jika tidak ada .
                setWrongEmail(true);
                setFormComplete(false);
            }
        } else { // jika tidak ada @
            setWrongEmail(true);
            setFormComplete(false);
        }
    }

    useEffect(() => {
        if(email.length && password.length){
            setFormComplete(true);
        } else {
            setFormComplete(false);
        }

        return () => window.document.title = "";
    });

    if(isLoggedIn){
        return (
            <section>
                <Head>
                    <title>Change Email</title>
                    <meta name="description" content="Account" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
    
                <section className="pt-[50px] p-[20px] flex items-center">
                    <img src="/icons/Mail Sign At.svg" alt="mail-icon" className="w-[36px]" />
                    <div className="ml-[16px]">
                        <p className="leading-tight text-[14px]">Your current email is</p>
                        <h1 className="text-[18px] font-bold leading-tight">{user.email_address}</h1>
                    </div>
                </section>
    
                <section className="mt-[170px] p-[20px]">
                    <div className="mb-[8px]">
                        { wrongEmail && <MicroInvalidMessage message="Invalid Email!" /> }
                        { wrongPassword && <MicroInvalidMessage message="Wrong Password!" /> }
                    </div>
                    { !wrongEmail && <InputEmail title="Insert New Email" placeholder="newmail@email.com" email={email} Handler={emailHandler} /> }
                    { wrongEmail && <InputWrongEmail title="Insert New Email" placeholder="newmail@email.com" email={email} Handler={emailHandler} /> }
                    
                    { !wrongPassword && <InputPassword title="Insert Your Password" placeholder="Confirm Your Password" password={password} Handler={passwordHandler}  /> }
                    { wrongPassword && <InputWrongPassword title="Insert Your Password" placeholder="Confirm Your Password" password={password} PasswordHandler={passwordHandler}  /> }
                    
                    <div className="mt-[15px]">
                        { formComplete && <SubmitButton buttonName="Update Email" handler={checkEmailHandler} /> }
                    </div>
                </section>
            </section>
        );
    } else {
        return null;
    }
}