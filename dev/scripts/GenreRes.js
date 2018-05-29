import React from 'react';

//we want to push
    //image url
    //title 
    //author


const GenreRes = (props) => {
        return (
            <section className="results">
                <div className="back-forth">
                    {props.index > 0 && <button className="previous-page" onClick={() => props.pageBack()}><img src="../assets/arrow.svg"/></button>}
                    {props.index < 9 && props.books.length > 0 ? <button className="next-page" onClick={() => props.pageForward()}><img src="../assets/arrow.svg"/></button> : null}
                </div>
                <div className="gallery clearfix">
                    {props.books.map((book) => {
                        return (
                            <div className="title-gallery" key={book[props.index].best_book.id.$t} onClick={() => props.onBookSelect(book[props.index])}>
                                <div className="cover-container">
                                    <img src={book[props.index].best_book.image_url} alt="Book Cover"/>
                                </div>
                                <h2>{book[props.index].best_book.title}</h2>
                            </div>
                        )
                    })}  
                </div>
            </section>  
        )
    }   

export default GenreRes;