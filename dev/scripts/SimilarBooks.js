import React from 'react';

const SimilarBooks = (props) => {
    return (
        <div className="similar-books clearfix">
            <h2 className="similar-books__subtitle">Similar Books</h2>
                {props.similarBooks.map((book) => {
                    return (
                        <div className="similar-books__book">
                            <div className="similar-books__image-container" key={book.isbn}>
                                <img className="similar-books__image" src={book.image_url} alt="Book cover"/>
                            </div>
                            <h3 className="similar-books__title">{book.title}</h3>
                        </div>
                    )
                })}
        </div>
    )
}

export default SimilarBooks;