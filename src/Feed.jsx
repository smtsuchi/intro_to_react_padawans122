import React, { Component } from 'react'
import Post from './Post';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class Feed extends Component {
    constructor(){
        super();
        this.state = {
            posts: []
        }
    };

    componentDidMount = () => {
        this.getPosts();
    }

    getPosts = async () => {
        let res
        if (this.props.user.token){ // logged in
            res = await fetch(BACKEND_URL + '/api/posts', {
                headers:{
                    Authorization: `Bearer ${this.props.user.token}`
                }
            });
        }
        else {
            res = await fetch(BACKEND_URL + '/api/posts');
        }
        const data = await res.json();
        console.log(data)
        if (data.status ==='ok'){
            this.setState({
                posts: data.posts
            })
        }
    };

    showPosts = () => {
        return this.state.posts.map(p=><Post key={p.id} post={p} user={this.props.user} />)
    };

    render() {
        return (
            <div>
                <h1>My Feed</h1>
                <main className='container justify-content-center'>
                    { this.showPosts() }
                </main>
            </div>
        )
    };
}
