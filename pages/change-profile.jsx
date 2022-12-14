import 'tailwindcss/tailwind.css';
import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';

// Context Components
import { PageContext } from './Context/Context';

// Fetchs
import FetchSurvey from './Fetchs/FetchSurvey';
import FetchUpdateProfile from './Fetchs/FetchUpdateProfile';

// Components
import InputFullName from './Components/FormInput/InputFullName';
import Unauthorized from './Components/Screens/Unauthorized';

export default function ChangeProfile(props){

    // Initialize state navigation context
    const { setCurrentPage, resetCurrentPage, state: { isLoggedIn, user, fetch_address }, setLoggedIn } = useContext(PageContext);
    
    useEffect(() => {
        setCurrentPage('change-profile');
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

    const [ fullName, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ avatar, setNewAvatar ] = useState('');
    const [ rawAvatar, setRawAvatar ] = useState('');
    const [ fileName, setFileName ] = useState('');
    const [ showButton, setShowButton ] = useState(false);

    useEffect(() => {
        setFullName(user.full_name);
        setEmail(user.email_address);
        setNewAvatar(user.avatar);
    }, []);

    function fullNameHandler(value){
        setFullName(value);
    }

    function chooseNewAvatarHandler(e){
        const new_ava = e.target.files[0];
        let file = null;

        if(new_ava === undefined){
            return;
        } else {
            file = URL.createObjectURL(new_ava);
        }

        if(new_ava.type.includes('video')){
            return alert("Video file is not supported");
        } 

        setFileName(new_ava.name);
        setNewAvatar(file);
        setRawAvatar(new_ava);
    }

    function UpdateHandler(){
        FetchUpdateProfile({ new_full_name: fullName, new_avatar: rawAvatar }, (res) => {
            localStorage.setItem('squarepass_access_token', res.token);
            res.success ? (() => location.href = "/account")() : alert("Update Profile Failed");
        });
    }

    useEffect(() => {
        if(user.full_name !== fullName){
            setShowButton(true);

        } else if(fileName.length){
            setShowButton(true);
        }
    })

    if(isLoggedIn){
        return (
            <section>
                <Head>
                    <title>Change Profile</title>
                    <meta name="description" content="Account" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
    
                <section className="py-[12px] px-[20px] border-b flex items-center justify-between animate-fadeInAnimate">
                    <p className="font-bold text-[14px]">Preview</p>
                </section>
    
                <section className="py-[20px] animate-fadeInAnimate">
                    <div className="px-[20px] flex items-center justify-between">
                        <div className="flex items-center">
                            <img src={avatar} alt="profile-pict" className="w-[67px] h-[67px] rounded-xl object-cover" />
                            <div className="ml-[15px]">
                                <h1 className="text-[18px] font-bold">{fullName}</h1>
                                <p className="text-[12px]">{email}</p>
                            </div>
                        </div>
    
                    </div>
                </section>
    
                <section className="mt-[20px] px-[20px]">
                    <InputFullName title="Full Name" placeholder="New Full Name" fullName={fullName} Handler={fullNameHandler} />
    
                    <div className="h-fit flex items-center ring-1 ring-[#e9e9e9] rounded-[7px] overflow-hidden animate-fadeInAnimate hover:ring-2 hover:ring-spblue">
                        <div className="max-w-[140px] h-full">
                            { avatar.length && 
                                <div className="">
                                    <img src={avatar} alt={avatar} className="bg-cover" />
                                </div>
                            }
        
                            { !avatar.length && 
                                <div className="w-full flex items-center justify-center bg-spblue">
                                    <p className="text-[14px] text-white font-medium">No Avatar</p>
                                </div>
                            }
                        </div>
    
                        <div className="w-full flex flex-col items-center justify-center relative">
                            <input type="file" name="avatar" id="avatar" className="w-full h-[130px] absolute border opacity-0 cursor-pointer" accept=".jpg, .jpeg, .png" onChange={chooseNewAvatarHandler} />
                            <img src="/icons/Interface Upload Button 2.svg" alt="upload-icon" className="w-[20px]" />
                            { !fileName.length &&
                                <div className="text-center">
                                    <p className="mt-[3px] text-[14px] font-medium">Pick New Avatar</p>
                                    <p className="mt-[3px] text-[10px] text-[#7A7A7A]">Min. 512x512px</p>
                                </div>
                            }
    
                            { fileName.length > 0 &&
                                <p className="mt-[10px] text-[12px] px-[20px] font-medium text-center">{fileName}</p>
                            }
                        </div>
                    </div>
                    
                    { showButton && <button className="mt-[15px] w-full py-[14px] text-[15px] text-white font-semibold bg-spblue rounded-lg animate-fadeInAnimate" onClick={UpdateHandler}> Update Profile </button> }
                </section>

            </section>
        );
    } else {
        return null;
    }
}