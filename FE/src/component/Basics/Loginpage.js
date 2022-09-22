import React, { useState } from "react";
import "./style.css";
import useScript from "./script";
import axios from "axios";


const Loginpage = () => {
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPasswd, setInputPasswd] = useState(""); 
    const [loginEmail, setLoginName] = useState("");
    const [loginPasswd, setLoginPasswd] = useState("");

    const SubmitButton = async () => {
        if (inputName && inputEmail && inputPasswd) {
            try {
                const userData = {
                    name: inputName,
                    email: inputEmail,
                    password: inputPasswd,
                };
                console.log(userData);
                // await fetch ("http://localhost:5000/users", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     body: JSON.stringify(userData),
                // }).then((res) => {
                //     console.log(res);
                // });
                await axios({
                    method: 'post',
                    url: 'http://localhost:5000/users',
                    data: userData
                })
                .then((res) => {
                    console.log(res);
                });
                alert("Registration Successful");
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            alert("Please fill all the fields");
        }
    }

    const LoginButton = async () => {
        if(loginEmail && loginPasswd){
            try{
                const user={
                    email: loginEmail,
                    password: loginPasswd,
                }
                console.log(user);
                await fetch ("http://localhost:5000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user),
                }).then((res) => {
                    if(res.status === 200){
                        console.log("Login Successful");
                    }
                    else{
                        console.log("Login Failed");
                    }
                });
            }
            catch(err){

                console.log('Errorrrrrrr ');
            }
        }
    }

    return (
        <>
            <h2>WCE Event Manager</h2>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" value = { inputName } onChange={(e) => setInputName(e.target.value)} />
                        <input type="email" placeholder="Email" value = { inputEmail } onChange={(e) => setInputEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value ={ inputPasswd } onChange={(e) => setInputPasswd(e.target.value)} />
                        <button onClick={ SubmitButton }>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" value={ loginEmail } onChange={(e) => setLoginName(e.target.value)} />
                        <input type="password" placeholder="Password" value={ loginPasswd } onChange={(e) => setLoginPasswd(e.target.value)}/>
                        <a href="https://www.google.com">Forgot your password?</a>
                        <button onClick={ LoginButton } >Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" >Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            {useScript()}
        </>
    );
};

export default Loginpage;   