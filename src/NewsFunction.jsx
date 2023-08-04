import React, { useEffect, useState } from 'react'
import Article from './Article';

const NewsFunction = () => {
    // SYNTAX: useState
    // const [state, setState] = useState(initialState)
    const [articles, setArticles] = useState([]);

    // SYNTAX: useEffect
    // useEffect(callbackFunction, [arrayOfDependecies])
    // useEffect(()=>{}, [])
    useEffect(()=>{
        //THIS MIMICKS AN componentDidMount, when the array is empty
        getArticles()
    }, [])
    

    const getArticles = async () => {
        const res = await fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=4ba2cb57066b49e2b7a8f20f5e0f65c6');
        const data = await res.json();
        if (data.status === 'ok'){
            setArticles(data.articles)
        }
    };

    const showArticles = () => {
        return articles.map((a, index) => <Article key={index} article={a}/>)
    }



  return (
    <div>
        <h1>News Page</h1>
   
        <main className='row'>
            { showArticles() }
        </main>
    </div>
)
}

export default NewsFunction