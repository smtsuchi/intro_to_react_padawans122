import React from 'react'

const Post = ({article}) => {
    const a = article
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img src={a.urlToImage ?? 'https://placeholder.com/150'} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{a.title}</h5>
                <p className="card-text">{a.description}</p>
                <a href={a.url} target='_blank' className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}

export default Post