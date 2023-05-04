import './App.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Home from "./components/Home/Home.jsx";
import "./App.css"
import {useState} from "react";
import SendMessage from "./components/SendMessage/SendMessage.jsx";
import MessageBox from "./components/MessageBox/MessageBox.jsx";
import DBDump from "./components/DBDump/DBDump.jsx";

function App() {

    const [user, setUser] = useState(null)

    return (
        <div className="App">
            <BrowserRouter>
                <nav className="navbar">
                    <ul className="navbarList">
                        <li className="navbarItem"><Link to="/">Home</Link></li>
                        <li className="navbarItem"><Link to="/login">Login</Link></li>
                        <li className="navbarItem"><Link to="/signup">Signup</Link></li>
                        <li className="navbarItem"><Link to="/dbdump">DB dump</Link></li>
                        <li className="navbarItem">{user && <Link to="/messagebox">Message box</Link>}</li>
                        <li className="navbarItem">{user && <Link to="/sendmessage">Send message</Link>}</li>
                        <li className="navbarItem user">{user?.email}</li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login setUser={setUser}/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/dbdump" element={<DBDump/>}/>
                    <Route path="/messagebox" element={<MessageBox user={user}/>}/>
                    <Route path="/sendmessage" element={<SendMessage user={user}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
