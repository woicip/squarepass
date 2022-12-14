import 'tailwindcss/tailwind.css';
import Head from "next/head";
import Link from "next/link";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { keyframes } from 'styled-components';
import { animated, config, useSpring } from '@react-spring/web';
import style from '../styles/welcome.module.css';


const BarActiveAnimate = keyframes`
    from {
        width: 0%;
    }

    to {
        width: 100%;
    }
`;

const BarActive = styled.button`
    position: absolute;
    width: 0%;
    height: 4px;
    border-radius: 10px;
    background-color: #5186CB;
    z-index: 1;
    animation: ${BarActiveAnimate} 5s linear infinite;
`;

export default function Welcome(props){

    const contents = {
        one: <span>
                  Keep Your <br/>
                  Secret With <br/>
                  SquarePass.
              </span>,

        two: <span>
                  Never Leave <br/>
                  Your Secret <br/>
                  Online.
              </span>,

        three: <span>
                  Your Secret <br/>
                  Is Your Key <br/>
                  To  Internet.
              </span>,
    };

    const FadeIn = ({ isVisible, children }) => {
        const styles = useSpring({
            from: { opacity: 0 }, 
            to: { opacity: 1 },
            config: { duration: 1200 },
        });

        return <animated.span style={styles}>{children}</animated.span>
    };

    const [ order, setOrder ] = useState(null);
    const [ quotesContent, setQuotesContent ] = useState(contents.one);

    useEffect(() => {

        setOrder(1); // initialize snap order

        let prev = 1;

        const id = setInterval(() => {
            
            if (prev == 1){
                // console.log('one');
                prev = 2
                setOrder(2);
                setQuotesContent(contents.two);

            } else if (prev == 2){
                // console.log('two');
                prev = 3
                setOrder(3);
                setQuotesContent(contents.three);

            } else if (prev == 3){
                // console.log('three');
                prev = 1
                setOrder(1);
                setQuotesContent(contents.one);
            }

        }, 5000);

        return () => clearInterval(id);
    }, []);

    function GetStartedHandler(){
        const access_token = localStorage.getItem('squarepass_access_token');

        if(access_token !== null){
            fetch(`${process.env.API_URL}/survey`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
                .then(res => res.json())
                .then(res => {
                    if(res.code === 200) location.href = "/home";
                    else location.href = "/login";
                })
                .catch(err => console.log(err));
        } else {
            location.href = "/login";
        }

    }

    return (
        <section className="flex flex-col justify-between h-full">
            <Head>
                <title>Welcome</title>
                <meta name="description" content="Welcome to SquarePass" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="p-[30px]">
                <div className={style.snapContainer}>

                    <div className={`${style.sliderContainer} mr-2 animate-fadeInAnimate`}>
                        { order === 1 ? <BarActive /> : "" }
                        
                        <button className={style.placeholder}></button>
                    </div>

                    <div className={`${style.sliderContainer} animate-fadeInAnimate`}>
                        { order === 2 ? <BarActive /> : "" }
                        <button className={style.placeholder}></button>
                    </div>

                    <div className={`${style.sliderContainer} ml-2 animate-fadeInAnimate`}>
                        { order === 3 ? <BarActive /> : "" }
                        <button className={style.placeholder}></button>
                    </div>

                </div>

                <img src="/logo-welcome.svg" alt="SquarePass" width="120px" className='my-[30px] animate-fadeInAnimate'/>

                <h1 className='w-full text-[58px] leading-[70px] font-semibold mobileL:leading-[60px] mobileL:text-[13.5vw]'>
                    <FadeIn>{quotesContent}</FadeIn> 
                </h1>
            </section>

            
            <div className="w-[414px] p-[30px] mobileL:w-screen fixed mobileL:left-0 bottom-0 mt-[311px]">
                <button className='w-full bg-spblue py-[14px] font-bold rounded-lg text-white animate-fadeInAnimate focus:outline-2 focus:outline-blue-400 focus:outline focus:outline-offset-2' onClick={GetStartedHandler}>Get Started</button>
            </div>

        </section>
    )
}