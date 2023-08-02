import React, { Component } from 'react'


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class CreatePost extends Component {


    handleSubmit = async (e) => {
        e.preventDefault();

        const title = e.target.title.value
        const caption = e.target.caption.value
        const imgUrl = e.target.imgUrl.value

        const body = {
            title,
            caption,
            img_url: imgUrl,
            user_id: 1
        }

        const url = BACKEND_URL + '/api/posts/create'
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
        }

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
    };

    render() {
        return (
            <div >
                <h1 className='text-center'>Create a Post</h1>
                <form className='col-3 mx-auto flex justify-content-center' onSubmit={this.handleSubmit}>
                    <input className='form-control' name='title' placeholder='Title' />
                    <input className='form-control' name='caption' placeholder='Caption' />
                    <input className='form-control' name='imgUrl' placeholder='Image URL' />
                    <button className='btn btn-primary mx-auto'>Submit</button>
                </form>
            </div>
        )
    }
}
