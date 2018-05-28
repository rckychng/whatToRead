import React from 'react';

//we want to push
    //image url
    //title 
    //author


const GenreRes = (props) => {
        return (
            <section className="results">
                <div className="wrapper">
                    <div className="gallery clearfix">
                        <div className="back-forth">
                        {props.index > 0 && <button onClick={() => props.pageBack()}>Previous Page</button>}
                        {props.index < 9 && <button onClick={() => props.pageForward()}>Next Page</button>}
                    </div>
                        {props.books.map((book) => {
                            return (
                                <div className="title-gallery" key={book[props.index].best_book.id.$t} onClick={() => props.onBookSelect(book[props.index])}>
                                    <img src={book[props.index].best_book.image_url} alt="Book Cover"/>
                                    <h2>{book[props.index].best_book.title}</h2>
                                </div>
                            )
                        })}  
                    </div>
                </div>
            </section>  
        )
    }   

export default GenreRes;