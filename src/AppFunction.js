import React, { useState } from 'react'
import Home from "./Home";
import Navbar from "./Navbar";
import News from "./News";
import Feed from "./Feed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./CreatePost";
import SignUp from "./SignUp";
import Login from "./Login";
import NewsFunction from "./NewsFunction";
import SinglePost from './SinglePost';

const AppFunction = () => {
    const [user, setUser] = useState({});

    const logMeIn = (user) => {
        setUser(user)
    }


    return (
        <BrowserRouter>
            <div className="App">
                <Navbar user={user} x='hi' />
                <Routes>
                    <Route path="/" element={<Home user={user} />} />
                    <Route path='/posts' element={<Feed user={user} />} />
                    <Route path='/posts/:postId' element={<SinglePost user={user}/>} />
                    <Route path='/news' element={<News />} />
                    <Route path='/news2' element={<NewsFunction />} />
                    <Route path='/posts/create' element={<CreatePost user={user} />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login logMeIn={logMeIn} />} />
                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default AppFunction