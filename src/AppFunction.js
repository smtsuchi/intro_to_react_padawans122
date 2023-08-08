import React, { useEffect, useState } from 'react'
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
import Shop from './Shop';
import Cart from './Cart';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AppFunction = () => {

    const getUserFromLS = () => {
        const foundUser = localStorage.getItem('user122')
        if (foundUser){
            return JSON.parse(foundUser)
        }
        else return {}
    };

    const [user, setUser] = useState(getUserFromLS());
    const [cart, setCart] = useState([]);

    const logMeIn = (user) => {
        setUser(user)
        localStorage.setItem('user122', JSON.stringify(user))
    }
    const logMeOut = () => {
        setUser({})
        localStorage.removeItem('user122')
    }

    const addToCart = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
    }

    const removeFromCart = (product) => {
        const copy = [...cart];
        for (let i=cart.length-1; i >= 0; i-- ){
            if (product.id === cart[i].id){
                copy.splice(i, 1)
                break
            }
        }
        setCart(copy)
    }

    const getTotal = () => {
        let total = 0;
        for (let item of cart){
            total += parseFloat(item.price)
        }
        return total.toFixed(2)
    };

    const getCartAPI = async (user) => {
        if (user.token){
            const res = await fetch(BACKEND_URL + '/api/cart', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            const data = await res.json();
            if (data.status === 'ok'){
                setCart(data.cart)
            }
        }
        else{
            setCart([])
        }
    };
    
    useEffect(()=>{
        getCartAPI(user)
    }, [user])

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar user={user} cart={cart} getTotal={getTotal} logMeOut={logMeOut}/>
                <Routes>
                    <Route path="/" element={<Home user={user} />} />
                    <Route path='/posts' element={<Feed user={user} />} />
                    <Route path='/posts/:postId' element={<SinglePost user={user}/>} />
                    <Route path='/news' element={<News />} />
                    <Route path='/news2' element={<NewsFunction />} />
                    <Route path='/posts/create' element={<CreatePost user={user} />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login logMeIn={logMeIn} />} />
                    <Route path='/shop' element={<Shop user={user} addToCart={addToCart}/>} />
                    <Route path='/cart' element={<Cart user={user} removeFromCart={removeFromCart} cart={cart} getTotal={getTotal}/>} />
                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default AppFunction