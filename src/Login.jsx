import React, { Component } from 'react'


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class Login extends Component {

    handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.username.value
        const password = e.target.password.value

        

        const url = BACKEND_URL + '/api/login'
        const options = {
            method: "POST",
            headers: {
                Authorization: `Basic ${btoa(username+':'+password)}`
            }
        }

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok'){
            this.props.logMeIn(data.user)
        }
    };

    render() {
        return (
            <div >
                <h1 className='text-center'>Login</h1>
                <form className='col-3 mx-auto flex justify-content-center' onSubmit={this.handleSubmit}>
                    <input type='text' className='form-control' name='username' placeholder='Username' />
                    <input type='password' className='form-control' name='password' placeholder='Password' />
                    <button className='btn btn-primary mx-auto'>Submit</button>
                </form>
            </div>
        )
    }
}
