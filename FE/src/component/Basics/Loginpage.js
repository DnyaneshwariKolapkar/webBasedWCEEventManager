import { React, useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPasswd, setInputPasswd] = useState("");
    const [loginEmail, setLoginName] = useState("");
    const [loginPasswd, setLoginPasswd] = useState("");
    const navigate = useNavigate();

    const SubmitButton = async () => {
        try {
            if (inputName && inputEmail && inputPasswd) {
                const user = {
                    name: inputName,
                    email: inputEmail,
                    password: inputPasswd
                }
                console.log(user);
                const res = await axios.post("http://localhost:5000/users", user);
                console.log(res.data);
                if (res.status === 201) {
                    alert("User created");
                    navigate("verificartionpage");
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const LoginButton = async () => {
        try {
            if (loginEmail && loginPasswd) {
                const user = {
                    email: loginEmail,
                    password: loginPasswd
                }
                console.log(user);
                const res = await axios.post("http://localhost:5000/login", user);
                console.log(res.data);
                if (res.status === 200) {
                    alert("Login successful");
                    navigate("/mainpage");
                }
                else {
                    console.log(res);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });
        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }, []);

    return (
        <>
            <div className="bodyloginpage">
                <h2>WCE Event Manager</h2>
                <div className="container" id="container">
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>Create Account</h1>
                            <input type="text" placeholder="Name" value={inputName} onChange={(e) => setInputName(e.target.value)} />
                            <input type="email" placeholder="Email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={inputPasswd} onChange={(e) => setInputPasswd(e.target.value)} />
                            <button onClick={SubmitButton} className="buttonloginpage" >Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#">
                            <h1>Sign in</h1>
                            <span>or use your account</span>
                            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginName(e.target.value)} />
                            <input type="password" placeholder="Password" value={loginPasswd} onChange={(e) => setLoginPasswd(e.target.value)} />
                            <a href="https://www.google.com">Forgot your password?</a>
                            <button onClick={LoginButton} className="buttonloginpage" >Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p className="ploginpage" >To keep connected with us please login with your personal info</p>
                                <button className="ghost buttonloginpage" id="signIn" >Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p className="ploginpage" >Enter your personal details and start journey with us</p>
                                <button className="ghost buttonloginpage" id="signUp" >Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Loginpage;   