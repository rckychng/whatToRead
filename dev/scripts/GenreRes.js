import React from 'react';

const GenreRes = ({title,cover}) => {
    return (
        <div>
            <img src={cover} alt="Book Cover"/>
            <h2>{title}</h2>
        </div>
    )
}

export default GenreRes;