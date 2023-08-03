import React, { Component } from 'react';
import Moment from 'react-moment';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class Post extends Component {
    constructor(){
        super();
        this.state = {
            liked: true
        }
    }

    componentDidMount(){
        if (this.props.post){
            this.setState({liked: this.props.post.liked})
        }
    }

    handleClick = async (type) => {
        const currentState = this.state.liked;
        this.setState({
            liked: !currentState
        })

        let url;
        if (type === 'like') {
            url = BACKEND_URL + '/api/posts/like/' + this.props.post.id
        }
        else {
            url = BACKEND_URL + '/api/posts/unlike/' + this.props.post.id
        }

        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.props.user.token}`
            },
        });

        const data = await res.json();
        console.log(data)
        if (data.status === 'ok'){
            // dont do anything
        } else{
            this.setState({liked: currentState})
        }
    };

    render() {
        const p = this.props.post
        return (
            <div className="card mx-auto mb-3" style={{ width: '18rem' }}>
                <img src={p.img_url ?? 'https://placeholder.com/150'} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{p.author}</h6>
                    <p className="card-text">{p.caption}</p>
                    {
                        this.props.user.token?
                            this.state.liked?
                            <AiFillHeart onClick={()=>this.handleClick('unlike')}/>
                            :
                            <AiOutlineHeart onClick={()=>this.handleClick('like')}/>
                            :
                            <></>
                    }
                </div>
                <div className="card-footer text-body-secondary">
                    <Moment fromNow>
                        { p.date_created }
                    </Moment>
                </div>
            </div>
        )
    }
}
