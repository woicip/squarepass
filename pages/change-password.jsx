import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useEffect, useState, useContext } from 'react';
import md5 from 'md5';

// Context Components
import { PageContext } from './Context/Context';

// Fetchs
import FetchSurvey from './Fetchs/FetchSurvey';
import FetchPassword from './Fetchs/FetchPassword';
import FetchUpdatePassword from './Fetchs/FetchUpdatePassword';

// Components
import InputPassword from './Components/FormInput/InputPassword';
import InputWrongPassword from './Components/FormInput/InputWrongPassword';
import InputConfirmPassword from './Components/FormInput/InputConfirmPassword';
import InputWrongConfirmPassword from './Components/FormInput/InputWrongConfirmPassword';
import SubmitButton from './Components/Buttons/SubmitButton';
import MicroInvalidMessage from './Components/FormInput/MicroInvalidMessage';
import Unauthorized from './Components/Screens/Unauthorized';

function PasswordCensor(props){
    const { password } = props;

    let passCensor = '';
    const passLength = password.length - 2;
    const passTail = password.slice(password.length - 2, password.length);

    for(var i = 0; i < passLength; i++){
        passCensor += '*';
    }

    const passCombine = `${passCensor}${passTail}`;

    return <span>{passCombine}</span>

}

export default function ChangePassword(props){

    // Initialize state navigation context
    const { setCurrentPage, resetCurrentPage, state: { isLoggedIn, fetch_address }, setLoggedIn } = useContext(PageContext);
    
    useEffect(() => {
        setCurrentPage('change-password');
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

    const [ userPassword, setUserPassword ] = useState('');

    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const [ wrongPass, setWrongPass ] = useState(false);
    const [ newPassNotMatch, setNewPassNotMatch ] = useState(false);

    const [ formComplete, setFormComplete ] = useState(false);

    function currentPasswordHandler(value){
        setCurrentPassword(value);
    }

    function newPasswordHandler(value){
        setNewPassword(value);
    }

    function confirmPasswordHandler(value){
        setConfirmPassword(value);
    }

    function checkNewPasswordHandler(){
        const md5password = md5(currentPassword);

        if(md5password !== userPassword){
            return setWrongPass(true);
        } else {
            setWrongPass(false);
        }

        if(newPassword !== confirmPassword){
            return setNewPassNotMatch(true);

        } else {
            setNewPassNotMatch(false);

            const md5NewPassword = md5(newPassword);
            FetchUpdatePassword({ new_password: md5NewPassword }, (result) => {
                if(result.success){
                    location.href = "/account";
                } else {
                    alert("Failed update password");
                }
            });
        }
    }

    useEffect(() => FetchPassword((res) => {
        setUserPassword(res.phrase);
    }), []);

    useEffect(() => {
        if(currentPassword.length && newPassword.length && confirmPassword.length){
            setFormComplete(true);
        }

        return () => window.document.title = "";
    });
    
    if(isLoggedIn){
        return (
            <section>
                <Head>
                    <title>Change Password</title>
                    <meta name="description" content="Account" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
    
                <section className="pt-[50px] p-[20px] flex items-center animate-fadeInAnimate">
                    <img src="/icons/Interface Login Password.svg" alt="mail-icon" className="w-[44px]" />
                    <div className="ml-[16px]">
                        <p className="font-semibold">Change your password to a new <br/> password.</p>
                    </div>
                </section>
    
                <section className="mt-[140px] p-[20px]">
                    <div className="mb-[8px]">
                        { newPassNotMatch && <MicroInvalidMessage message="Password Not Match" /> }
                        { wrongPass && <MicroInvalidMessage message="Wrong Current Password" /> }
                    </div>
    
                    { !wrongPass && <InputPassword title="Current Password" placeholder="Your current password" password={currentPassword} Handler={currentPasswordHandler} /> }
                    { wrongPass && <InputWrongPassword title="Current Password" placeholder="Your current password" password={currentPassword} PasswordHandler={currentPasswordHandler} /> }
                    
    
                    { !newPassNotMatch && 
                        <div>
                            <InputPassword title="Insert New Password" placeholder="New Password" password={newPassword} Handler={newPasswordHandler} />
                            <InputConfirmPassword title="Confirm New Password" placeholder="Confirm New Password" confirmPassword={confirmPassword} ConfirmPasswordHandler={confirmPasswordHandler} />
                        </div>
                    }
                    
                    { newPassNotMatch && 
                        <div>
                            <InputWrongPassword title="Insert New Password" placeholder="New Password" password={newPassword} PasswordHandler={newPasswordHandler} />
                            <InputWrongConfirmPassword title="Confirm New Password" placeholder="Confirm New Password" confirmPassword={confirmPassword} ConfirmPasswordHandler={confirmPasswordHandler} />
                        </div>
                    }
    
                    <div className="mt-[15px]">
                        { formComplete && <SubmitButton buttonName="Update Password" handler={checkNewPasswordHandler} /> }
                    </div>
                </section> 
    
            </section>
        );
    } else {
        return null;
    }
}