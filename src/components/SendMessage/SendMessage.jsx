import React, {useState} from 'react';
import classes from "./SendMessage.module.css";
import {database} from "../../Firebase"
import {collection, addDoc} from 'firebase/firestore'

const SendMessage = ({user}) => {

    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    const [success, setSuccess] = useState(false);

    const collectionRef = collection(database, 'messages');

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangeText = (event) => {
        setText(event.target.value)
    }

    const sendMessage = () => {
        addDoc(collectionRef, {
            sender: user.email,
            receiver: email,
            message: text
        }).then(() => {
            setSuccess(true)
            setTimeout(() => setSuccess(false), 2000);
        }).catch(err => console.log(err.code, err.message))
    }

    return (
        <div className={classes.sendRoot}>
            <input className={classes.emailField} type="email" placeholder="Enter recipient email" value={email} onChange={onChangeEmail}/>
            <textarea className={classes.textArea} type="text" placeholder="Enter message text" value={text} onChange={onChangeText}/>
            <button className={classes.sendButton} type="button" onClick={sendMessage}>Send message</button>
            {success && <p className={classes.result}>Sent successfully</p>}
        </div>
    );
};

export default SendMessage;