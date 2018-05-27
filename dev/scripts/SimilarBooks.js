import React from 'react';

const SimilarBooks = (props) => {
    return (
        <div className="similar-books">
            <h2>Similar Books</h2>
                {props.similarBooks.map((book) => {
                    return (
                        <div key={book.isbn}>
                            <h3>{book.title}</h3>
                            <img src={book.image_url} alt="Book cover"/>
                        </div>
                    )
                })}
        </div>
    )
}

export default SimilarBooks;