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
        <div ref={node => this.results = node} className="res-container">
            <section className="results">
                <div className="gallery clearfix">
                    <div className="emblem-container">
                        <img className="emblem" src="../assets/icon2.svg" alt="icon of person reading"/>
                    </div>
                    <h2>Lit List</h2>
                    {this.props.books.map((book) => {
                        return (
                            <div className="title-gallery clearfix" key={book[this.props.index].best_book.id.$t} onClick={() => this.props.onBookSelect(book[this.props.index])}>
                            <div className="cover-container">
                                <img src={book[this.props.index].best_book.image_url} alt="Book Cover"/>
                            </div>
                                <h3>{book[this.props.index].best_book.title}</h3>
                            </div>
                        )
                    })}  
                </div>
                <div className="back-forth">
                    {this.props.index > 0 && <button className="previous-page" onClick={() => this.props.pageBack()}> <img src="../assets/arrow.svg" alt="arrow"/> </button>}
                    {this.props.index < 9 && this.props.books.length > 0 ? <button className="next-page" onClick={() => this.props.pageForward()}><img src="../assets/arrow.svg" alt="arrow"/></button> : null}
                </div>
            </section>  
        </div>
        )
    }   
}

export default GenreRes;