import React, {useState} from "react";

import axios from "axios";


import "./Form.css"

function nextForm(password, passwordAgain, formNum, fname, lname, dob, email, accountNumber, routingNumber) {

    if (formNum == 1) {

        document.getElementById("signupDiv1").style.display = "none";
        document.getElementById("signupDiv2").style.display = "block";

    }

    else if (formNum == 2) {

        if (password != passwordAgain) {

            document.getElementsByClassName("passwordError")[0].style.visibility = "visible";
    
        }
    
        else {

            axios.post("http://localhost:3001/emailValidation", {

                email: email

            }).then((response) => {

                if (response["data"]["success"] == true) {

                    document.getElementById("signupDiv2").style.display = "none";
                    document.getElementById("signupDiv3").style.display = "block";

                }

                else {

                    alert("This email is already associated with an account!");

                }

            })
    
            

        }

    }

    else if (formNum == 3) {


        axios.post("http://localhost:3001/signup", {

            fname: fname, 
            lname: lname, 
            dob: dob, 
            email: email,
            password: password,
            accountNumber: accountNumber,
            routingNumber: routingNumber

        })

        window.location = "http://localhost:3000/login";
        

    }

    

}

export function Signup() {

    var [fname, getFname] = useState("");
    var [lname, getLname] = useState("");
    var [dob, getDob] = useState("");

    var [email, getEmail] = useState("");
    var [password, getPassword] = useState("");
    var [passwordAgain, getPasswordAgain] = useState("");

    var [accountNumber, getAccountNumber] = useState("");
    var [routingNumber, getRoutingNumber] = useState("");
    

    return(
   
        <div className = "formDiv">

            <form className = "form" id = "signupDiv1">

                <input type = "text" placeholder = "Enter first name" value = {fname} required onChange = {(event) => getFname(event.target.value)} className = "formInput" />
                <input type = "text" placeholder = "Enter last name" value = {lname} required onChange = {(event) => getLname(event.target.value)} className = "formInput"/>
                <input type = "text" placeholder = "Enter DoB (MM/DD/YYYY)" required value = {dob} onChange = {(event) => getDob(event.target.value)} className = "formInput"></input>
                <input type = "button" value = "Next" className = "formInput" onClick = {() => nextForm(password, passwordAgain, 1, fname, lname, dob, email, accountNumber, routingNumber)} />

            </form>

            <form className = "form" id = "signupDiv2">

                <input type = "email" placeholder = "Enter email" value = {email} required onChange = {(event) => getEmail(event.target.value)} className = "formInput" />
                <input type = "password" placeholder = "Enter password" value = {password} required onChange = {(event) => getPassword(event.target.value)} className = "formInput" />
                <input type = "password" placeholder = "Re-enter password" value = {passwordAgain} required onChange = {(event) => getPasswordAgain(event.target.value)} className = "formInput" />
                <span className = "passwordError">Password's don't match!</span>
                <input type = "button" value = "Next" className = "formInput" onClick = {() => nextForm(password, passwordAgain, 2, fname, lname, dob, email, accountNumber, routingNumber)} />

            </form>

            <form className = "form" id = "signupDiv3">

                <input type = "text" placeholder = "Enter account number" value = {accountNumber} onChange = {(event) => getAccountNumber(event.target.value)} className = "formInput"/>
                <input type = "text" placeholder = "Enter routing number" value = {routingNumber} onChange = {(event) => getRoutingNumber(event.target.value)} className = "formInput"/>
                <input type = "button" value = "Next" className = "formInput" onClick = {() => nextForm(password, passwordAgain, 3,fname, lname, dob, email, accountNumber, routingNumber)}  />


            </form>

        </div>

    )

}