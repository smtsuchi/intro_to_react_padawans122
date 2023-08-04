import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SinglePost = ({ user }) => {

    const { postId } = useParams()
    const [post, setPost] = useState({})

    const getPost = async (postId) => {
        let res
        if (user.token){ // logged in
            res = await fetch(BACKEND_URL + `/api/posts/${postId}`, {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            });
        }
        else {
            res = await fetch(BACKEND_URL + `/api/posts/${postId}`);
        }
        const data = await res.json();
        console.log(data)
        if (data.status ==='ok'){
            setPost(data.post)
        }
    };

    useEffect(()=>{
        getPost(postId);
    }, [])

  return (
    <div>
        
        <Post post={post} user={user}/>
    </div>
  )
}

export default SinglePost