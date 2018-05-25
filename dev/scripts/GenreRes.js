import React from 'react';

const GenreRes = (props) => {
    return (
        <section className="results">
        {props.books.map((book) => {
            return (
                <div key={book[0].best_book.id.$t}>
                    <img src={book[0].best_book.image_url} alt="Book Cover"/>
                    <h2>{book[0].best_book.title}</h2>
                </div>
            )
        })}  
        </section>  
    )
}

export default GenreRes;