import React from 'react';

//we want to push
    //image url
    //title 
    //author


class GenreRes extends React.Component {
    constructor(props) {
        super(props);
    
    }

    componentDidMount() {
        this.results.scrollIntoView({behavior: "smooth"});
    }

    render () {
    return (
        <section ref ={node => this.results = node} className="results">
            <div className="back-forth">
                {this.props.index > 0 && <button className="previous-page" onClick={() => this.props.pageBack()}>Previous Page</button>}
                {this.props.index < 9 && this.props.books.length > 0 ? <button className="next-page" onClick={() => this.props.pageForward()}>Next Page</button> : null}
            </div>
            <div className="gallery clearfix">
                {this.props.books.map((book) => {
                    return (
                        <div className="title-gallery" key={book[this.props.index].best_book.id.$t} onClick={() => this.props.onBookSelect(book[this.props.index])}>
                            <img src={book[this.props.index].best_book.image_url} alt="Book Cover"/>
                            <h2>{book[this.props.index].best_book.title}</h2>
                        </div>
                    )
                })}  
            </div>
        </section>  
        )
    }   
}

export default GenreRes;