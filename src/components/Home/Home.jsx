import React from 'react';
import {Link} from "react-router-dom";
import classes from './Home.module.css';

const Home = () => {
    return (
        <div className={classes.homeRoot}>
            <Link to="/login" className={classes.link}>Login</Link>
            <Link to="/signup" className={classes.link}>Signup</Link>
        </div>
    );
};

export default Home;