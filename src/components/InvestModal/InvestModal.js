import React, {useState} from "react"
import {useDispatch} from "react-redux"

import { setInvestmentAmount } from '../../redux/actions';


function continueButton(investAmount, onClose, dispatch) {

    if (investAmount <= 0) {

        alert("Invalid input!");
        return;

    }

    const invest = () => {

        dispatch(setInvestmentAmount(investAmount));

    }
    
    onClose(investAmount);

}

export function InvestModal({ onClose = (investedAmount) => {}}) {

    var [investAmount, getInvestAmount] = useState(0);

    const dispatch = useDispatch();

    return(
        <div className="modal">
        <div className="modal-content">

            <h2>Welcome!</h2>
            <div>
            <ul>
                <input type = "number" placeholder = "How much would you like to invest?" value = {investAmount} onChange = {(event) => getInvestAmount(event.target.value)}/>
                <li>How much would you like to invest?</li>
                <li>The investment will go into the accounts below based on the percentages</li>
                <li>50%=Savings. 30%=401(k). 20%=Stock Investment.</li>
                <li>6 month wait to withdraw from savings.</li>
                <li>Withdraw from 401(k) in 59.5 years.</li>
            </ul>
            <button onClick = {() => continueButton(investAmount, () => onClose(investAmount), dispatch)}>Continue</button>
            <h3 className="text-center">Happy playing!</h3>
            </div>
        </div>
        </div>
    );

}