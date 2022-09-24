import React, {useState} from "react";

import axios from "axios";

import "../Signup/Form.css"

function loginAuth(email, password) {

    axios.post("http://localhost:3001/login", {

        email: email,
        password: password

    }).then((response) => {

        if (!response["data"]["success"]) {

            alert("INVALID EMAIL OR PASSWORD");

        }

        else {

            window.location = "http://localhost:3000/play";

        }

    })

}

export function Login() {

    var [email, getEmail] = useState("");
    var [password, getPassword] = useState("");

    return(

        <div className = "formDiv">

            <form className = "form">
                <input type = "input" placeholder = "Enter Email" className = "formInput" value = {email} onChange = {(event) => getEmail(event.target.value)}></input>
                <input type = "password" placeholder = "Enter Password" className = "formInput" value = {password} onChange = {(event) => getPassword(event.target.value)}></input>
                <input type = "button" value = "Login" className = "formInput" onClick = {() => loginAuth(email, password)}></input>
            </form>

        </div>

    )

}