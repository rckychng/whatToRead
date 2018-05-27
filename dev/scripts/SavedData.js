import React from 'react';

const SavedData = (props) => {
    return (
        <div className="saved-book">
            <div className="saved-book__image">
                <img src={props.savedBook.bookImage} alt="Book Cover"/>
            </div>
            <div className="saved-book__text">
                <h2 className="saved-book__title">{props.savedBook.bookTitle}</h2>
                <h3 className="saved-book__author">{props.savedBook.bookAuthor}</h3>
            </div>
        </div>
    )
}

export default SavedData;