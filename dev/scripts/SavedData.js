import React from 'react';

const SavedData = (props) => {
    const checkedReading = props.savedBook.reading === true ? "fa-check-square" : "fa-square";
    const checkedRead = props.savedBook.read === true ? "fa-check-square" : "fa-square";
    return (
        <div className="saved-book">
            <div className="saved-book__image">
                <img src={props.savedBook.bookImage} alt="Book Cover"/>
            </div>
            <div className="saved-book__text">
                <h2 className="saved-book__title">{props.savedBook.bookTitle}</h2>
                {/* <h3 className="saved-book__author">{props.savedBook.bookAuthor}</h3> */}
            </div>
            <div className="saved-book__buttons">
                <div className="saved-book__button" onClick={() => props.currentlyReading(props.savedBook.key,props.savedBook.reading)}>
                    <p className="saved-book__ongoing">
                        <span className="saved-book__icon"><i className={`fa ${checkedReading}`}></i></span>
                        Currently Reading
                    </p>
                </div>
                <div className="saved-book__button" onClick={() => props.finishedReading(props.savedBook.key,props.savedBook.read)}>
                    <p className="saved-book__finished">
                        <span className="saved-book__icon"><i className={`fa ${checkedRead}`}></i></span>
                        Finished Reading
                    </p>
                </div>
                <div className="saved-book__button" onClick={() => props.removeSavedBook(props.savedBook.key)}>
                    <p className="saved-book__remove">
                        <span className="saved-book__icon"><i className="fa fa-times"></i></span>
                        Remove Book
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SavedData;