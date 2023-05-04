import React, {useState} from 'react';
import classes from "./Singup.module.css";
import {app, database} from "../../Firebase";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";

const Signup = () => {

    const auth = getAuth(app)

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const collectionRef = collection(database, 'users');

    const onChangeLogin = (event) => {
        setLogin(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const signupUser = () => {
        createUserWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                setLogin("");
                setPassword("");
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
                addDoc(collectionRef, {
                    email: login,
                    password: password,
                }).then(() => {
                    setSuccess(true)
                    setTimeout(() => setSuccess(false), 2000);
                }).catch(err => console.log(err.code, err.message))
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setPassword("");
            });

    }

    return (
        <div className={classes.signupRoot}>
            <input className={classes.loginField} type="email" placeholder="Enter your email" value={login} onChange={onChangeLogin}/>
            <input className={classes.passwordField} type="password" placeholder="Enter your password" value={password} onChange={onChangePassword}/>
            <button className={classes.signupButton} type="button" onClick={signupUser}>Signup</button>
            {success && <p className={classes.result}>Signed up successfully</p>}
        </div>
    );
};

export default Signup;