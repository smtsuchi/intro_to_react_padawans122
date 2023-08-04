import React from 'react';
import { useNavigate } from 'react-router-dom';


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Login = ({ logMeIn }) => {
    const redirect = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.username.value
        const password = e.target.password.value



        const url = BACKEND_URL + '/api/login'
        const options = {
            method: "POST",
            headers: {
                Authorization: `Basic ${btoa(username + ':' + password)}`
            }
        }

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            logMeIn(data.user)
            //redirect to feed
            redirect('/posts')
        }
    };


    return (
        <div >
            <h1 className='text-center'>Login</h1>
            <form className='col-3 mx-auto flex justify-content-center' onSubmit={handleSubmit}>
                <input type='text' className='form-control' name='username' placeholder='Username' />
                <input type='password' className='form-control' name='password' placeholder='Password' />
                <button className='btn btn-primary mx-auto'>Submit</button>
            </form>
        </div>
    )

};

export default Login;
