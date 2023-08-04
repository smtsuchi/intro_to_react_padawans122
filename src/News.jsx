import React, { Component } from 'react'
import Article from './Article';

export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: []
        }
    };

    componentDidMount(){
        this.getArticles()
    }

    getArticles = async () => {
        const res = await fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=4ba2cb57066b49e2b7a8f20f5e0f65c6');
        const data = await res.json();
        if (data.status === 'ok'){
            this.setState({
                articles: data.articles
            })
        }
    };

    showArticles = () => {
        return this.state.articles.map((a, index) => <Article key={index} article={a}/>)
    }

    render() {
        return (
            <div>
                <h1>News Page</h1>
                <main className='row'>
                    {this.showArticles()}
                </main>
            </div>
        )
    };
}
