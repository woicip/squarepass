import 'tailwindcss/tailwind.css';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';

let color = {
    weak: '#DE1515',
    good: '#5186CB',
    strong: '#2CC90E',
};

const BarLeftAnimation = keyframes`
    from {
        width: 0px;
    }

    to {
        width: 27px;
    }
`;

const BarLeft = styled.div`
    position: absolute;
    width: 27px;
    height: 5px;
    background-color: ${props => props.color};
    border-radius: 10px 0 0 10px;
    animation: ${BarLeftAnimation} .2s linear;
`;

const BarCenter = styled.div`
    position: absolute;
    width: 27px;
    height: 5px;
    background-color: ${props => props.color};
    animation: ${BarLeftAnimation} .2s linear;
`;

const BarRight = styled.div`
    position: absolute;
    width: 27px;
    height: 5px;
    border-radius: 0 10px 10px 0;
    background-color: ${props => props.color};
    animation: ${BarLeftAnimation} .2s linear;
`;


export default function PasswordLevel(props){

    const { passwordLevel } = props;

    const [ weakTurn, setWeakTurn ] = useState(false);
    const [ goodTurn, setGoodTurn ] = useState(false);
    const [ strongCenterTurn, setStrongCenterTurn ] = useState(false);
    const [ strongTurn, setStrongTurn ] = useState(false);

    useEffect(() => {
        if(passwordLevel === "Weak"){
            setWeakTurn(true);
            setGoodTurn(false);
            setStrongCenterTurn(false)
            setStrongTurn(false);
        } else if(passwordLevel === "Good"){
            setWeakTurn(false);
            setTimeout(() => setGoodTurn(true), 200);
            setStrongCenterTurn(false)
            setStrongTurn(false);
        } else if(passwordLevel === "Strong"){
            setWeakTurn(false);
            setGoodTurn(false);
            setTimeout(() => setStrongCenterTurn(true), 200);
            setTimeout(() => setStrongTurn(true), 400);
        } else {
            setWeakTurn(false);
            setGoodTurn(false);
            setStrongCenterTurn(false);
            setStrongTurn(false);
        }

        return () => "OKEY";
    });

    function PasswordLevelColoring(){
        if(passwordLevel === 'Weak'){
            return <span className="font-semibold text-[#DE1515]">{passwordLevel}</span>

        } else if(passwordLevel === 'Good'){
            return <span className="font-semibold text-[#5186CB]">{passwordLevel}</span>

        } else if(passwordLevel === 'Strong'){
            return <span className="font-semibold text-[#2CC90E]">{passwordLevel}</span>

        } else if(passwordLevel === 'None') {
            return <span className="font-semibold text-[#E4E4E4]">{passwordLevel}</span>
        }
    }

    return (
        <div className="flex items-center">
            <p className="text-[13px] font-semibold text-[#E4E4E4] mr-[13px]">{ <PasswordLevelColoring/> }</p>

            <div className="grid grid-cols-3 gap-1">

                <div>
                    { passwordLevel === "Weak" ? <BarLeft color={color.weak} /> : "" }
                    { passwordLevel === "Good" ? <BarLeft color={color.good} /> : "" }
                    { passwordLevel === "Strong" ? <BarLeft color={color.strong} /> : "" }
                    <div className="w-[27px] h-[5px] rounded-tl-[10px] rounded-bl-[10px] bg-[#E4E4E4]"></div>
                </div>

                <div>
                    { goodTurn && <BarCenter color={color.good} /> }
                    { strongCenterTurn && <BarCenter color={color.strong} /> }
                    <div className="w-[27px] h-[5px] bg-[#E4E4E4]"></div>
                </div>

                <div>
                    { strongTurn && <BarRight color={color.strong} />  }
                    <div className="w-[27px] h-[5px] rounded-tr-[10px] rounded-br-[10px] bg-[#E4E4E4]"></div>
                </div>

            </div>
        </div>
    );
}