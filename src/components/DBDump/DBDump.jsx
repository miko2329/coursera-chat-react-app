import React, {useEffect, useState} from 'react';
import {collection, getDocs} from "firebase/firestore";
import {database} from "../../Firebase.js";
import classes from "./DBDump.module.css";
import sha256 from 'crypto-js/sha256';

const DBDump = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const collectionRef = collection(database, "users");
            const querySnapshot = await getDocs(collectionRef);
            const fetchedMessages = [];
            querySnapshot.forEach((doc) =>
                fetchedMessages.push({...doc.data() })
            );
            setUsers(fetchedMessages);
        };
        fetchUsers();
    });


    return (
        <div className={classes.dbDumpRoot}>
            {
                users.map((it, idx) => (
                    <div key={idx} className={classes.dbDumpContainer}>
                        <div className={classes.email}>Email: {it.email}</div>
                        <div className={classes.password}>Password: {sha256(it.email).toString()}</div>
                    </div>
                ))
            }
        </div>
    );
};

export default DBDump;