import React, {useState} from 'react';
import classes from "./Login.module.css";
import {app} from "../../Firebase.js";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const Login = ({setUser}) => {

    const auth = getAuth(app);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const onChangeLogin = (event) => {
        setLogin(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const loginUser = () => {
        signInWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                setLogin("");
                setPassword("");
                console.log(user);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setPassword("");
            });
    }

    return (
        <div className={classes.loginRoot}>
            <p style={{fontSize: "20px", color: "white"}}>Test accounts: test@chat.com 12345678<br/>test1@chat.com 12345678</p>
            <input className={classes.loginField} type="email" placeholder="Enter your email" value={login} onChange={onChangeLogin}/>
            <input className={classes.passwordField} type="password" placeholder="Enter your password" value={password} onChange={onChangePassword}/>
            <button className={classes.loginButton} type="button" onClick={loginUser}>Login</button>
            {success && <p className={classes.result}>Logged in successfully</p>}
        </div>
    );
};

export default Login;