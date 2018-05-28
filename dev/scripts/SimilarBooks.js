import React from 'react';

const SimilarBooks = (props) => {
    return (
        <div className="similar-book-container clearfix">
            <h2>Similar Books</h2>
                {props.similarBooks.map((book) => {
                    return (
                        <div className="similar-book" key={book.isbn}>
                            <img src={book.image_url} alt="Book cover"/>
                            <h3>{book.title}</h3>
                        </div>
                    )
                })}
        </div>
    )
}

export default SimilarBooks;