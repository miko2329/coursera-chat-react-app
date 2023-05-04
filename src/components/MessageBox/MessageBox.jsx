import React, {useEffect, useState} from 'react';
import {database} from "../../Firebase"
import {collection, query, getDocs, where} from 'firebase/firestore'
import classes from "./MessageBox.module.css"


const MessageBox = ({user}) => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchMessages = async () => {
            const collectionRef = collection(database, "messages");
            const messageQuery = query(
                collectionRef,
                where("receiver", "==", user.email)
            );
            const querySnapshot = await getDocs(messageQuery);
            const fetchedMessages = [];
            querySnapshot.forEach((doc) =>
                fetchedMessages.push({...doc.data() })
            );
            setMessages(fetchedMessages);
        };
        fetchMessages();
    }, [user.email]);

    return (
        <div className={classes.messageBoxRoot}>
            {
                messages.map((it, idx) => (
                    <div key={idx} className={classes.messageContainer}>
                        <div className={classes.messageSender}>From: {it.sender}</div>
                        <div className={classes.messageText}>Message: {it.message}</div>
                    </div>
                ))
            }
        </div>
    );
};

export default MessageBox;