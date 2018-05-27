import React from 'react';

//we want to push
    //image url
    //title 
    //author


const GenreRes = (props) => {
        return (
            <section className="results">
            {props.index > 0 && <button onClick={() => props.pageBack()}>Previous Page</button>}
            {props.index < 9 && <button onClick={() => props.pageForward()}>Next Page</button>}
            {props.books.map((book) => {
                return (
                    <div key={book[props.index].best_book.id.$t} onClick={() => props.onBookSelect(book[props.index])}>
                        <img src={book[props.index].best_book.image_url} alt="Book Cover"/>
                        <h2>{book[props.index].best_book.title}</h2>
                    </div>
                )
            })}  
            </section>  
        )
    }   

export default GenreRes;