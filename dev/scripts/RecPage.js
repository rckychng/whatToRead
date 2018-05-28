import React from 'react';
import axios from "axios";
import qs from "qs";
import Genrepicker from "./Genrepicker";
import GenreRes from "./GenreRes";
import Modal from "./Modal";
import firebase from "firebase";

// const config = {
//   apiKey: "AIzaSyBkxhr4FMicWjtQin03JrWbbGVhe8mJgzM",
//   authDomain: "whattoreadapp.firebaseapp.com",
//   databaseURL: "https://whattoreadapp.firebaseio.com",
//   projectId: "whattoreadapp",
//   storageBucket: "whattoreadapp.appspot.com",
//   messagingSenderId: "493854943854"
// };

const config = {
    apiKey: "AIzaSyAQuGlgtPVMYsf0cL_F-Vtr40cy9eCALLw",
    authDomain: "whattoread-test.firebaseapp.com",
    databaseURL: "https://whattoread-test.firebaseio.com",
    projectId: "whattoread-test",
    storageBucket: "whattoread-test.appspot.com",
    messagingSenderId: "473210225413"
};

firebase.initializeApp(config);
class RecPage extends React.Component {
    constructor() {
        super();

        this.state = {
            value: "fiction",
            books: [],
            selectedBook: [],
            loggedIn: false,
            index: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.pageForward = this.pageForward.bind(this);
        this.pageBack = this.pageBack.bind(this);
    }

    handleChange(e) {
        this.setState({
        value: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
        books: []
        });
        this.batchCall();
    }

    //Loops through axios call in order to generate 100 results
    batchCall() {
        for (let i = 1; i <= 5; i++) {
        this.getBooksByGenre(i);
        }
    }

    getBooksByGenre(i) {
        axios({
        url: "http://proxy.hackeryou.com",
        method: "GET",
        dataResponse: "JSON",
        paramsSerializer: function(params) {
            return qs.stringify(params, { arrayFormat: "brackets" });
        },
        params: {
            reqUrl: "https://www.goodreads.com/search/index.xml",
            params: {
            q: this.state.value,
            "search[field]": "genre",
            key: "GwIYI1RLhhFBh2UPUeLNw",
            page: i
            },
            xmlToJSON: true
        }
        }).then(res => {
            const genreResults = res.data.GoodreadsResponse.search.results.work;

            //Slices results into arrays of ten for display on the page 
            //& pushes them into an array
            const arrayA = genreResults.slice(0, 10);
            const arrayB = genreResults.slice(10, 20);

            const completeBatch = Array.from(this.state.books);
            completeBatch.push(arrayA, arrayB);
            
            //Sets results to state and resets index position
            //for displayed arrays when new data called
            this.setState({
                books: completeBatch,
                index: 0
            });
        });
    }

    //Moves array index forward when next page button clicked
    pageForward() {
        this.setState({
            index: this.state.index + 1
        })
    }

    //Moves array index back when prev button clicked
    //Error handling on render, button will not appear whe index < 1
    pageBack() {
        this.setState({
            index: this.state.index - 1
        })
    }

    render () {
        const { index, books, selectedBook } = this.state;
            return (
                <div className="app-container">
                    <header>
                    <h1>What to Read</h1>
                    <div className="genre-select">
                        <form onSubmit={this.handleSubmit}>
                        <label htmlFor="genrePicker">I feel like reading </label>
                        <select
                            name="selectGenre"
                            id="genrePicker"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <option value="fiction">Fiction</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="non-fiction">Non-Fiction</option>
                            <option value="science-fiction">Science Fiction</option>
                            <option value="romance">Romance</option>
                            <option value="thriller">Thriller</option>
                            <option value="humor">Humor</option>
                        </select>
                        <input type="submit" />
                        </form>
                    </div>
                    </header>
                    <div className="res-container">
                        <GenreRes
                        books={books}
                        onBookSelect={selectedBook => this.setState({ selectedBook })}
                        index={index}
                        pageForward={this.pageForward}
                        pageBack={this.pageBack}
                        />
                        {selectedBook.best_book !== undefined && (
                        <Modal
                            bookID={selectedBook.best_book.id.$t}
                            onClose={selectedBook => this.setState({ selectedBook })}
                        />
                        )}
                    </div>
                </div>
            );        
    }
}

export default RecPage;