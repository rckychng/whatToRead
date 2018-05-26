import React from 'react';
import axios from "axios";
import qs from "qs";
import Genrepicker from "./Genrepicker";
import GenreRes from "./GenreRes";
import Modal from "./Modal";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBkxhr4FMicWjtQin03JrWbbGVhe8mJgzM",
  authDomain: "whattoreadapp.firebaseapp.com",
  databaseURL: "https://whattoreadapp.firebaseio.com",
  projectId: "whattoreadapp",
  storageBucket: "whattoreadapp.appspot.com",
  messagingSenderId: "493854943854"
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
        bookToSave: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveToFirebase = this.saveToFirebase.bind(this);
    }

    handleChange(e) {
        this.setState({
        value: e.target.value
        });
    }

    saveToFirebase() {
        // e.preventDefault();
        if (this.state.bookToSave.best_book !== undefined) {
        const savedBook = {
            bookImage: this.state.bookToSave.best_book.image_url,
            bookTitle: this.state.bookToSave.best_book.title,
            bookAuthor: this.state.bookToSave.best_book.author.name,
            read: false,
            reading: false
        };
        const dbRef = firebase.database().ref();
        dbRef.on("value", snapshot => {
            console.log(snapshot.val());
        });

        dbRef.push(savedBook);
        console.log(savedBook);

        this.setState({
            bookToSave: []
        });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
        books: []
        });
        this.batchCall();
    }

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
        // this.sortBookResults(genreResults);
        const arrayA = genreResults.slice(0, 10);
        const arrayB = genreResults.slice(10, 20);

        const completeBatch = Array.from(this.state.books);
        completeBatch.push(arrayA, arrayB);
        // console.log(completeBatch);
        this.setState({
            books: completeBatch
        });

        // console.log(this.state.books);
        });
    }
    render () {
const { books } = this.state;
const { selectedBook } = this.state;
// console.log(this.state.selectedBook);
// console.log(books);
        return (
        <div>
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
            <GenreRes
            books={books}
            onBookSelect={selectedBook => this.setState({ selectedBook })}
            bookSave={bookToSave => this.setState({ bookToSave })}
            saveToFirebase={this.saveToFirebase()}
            // key={key}
            bookSave={bookToSave => this.setState({ bookToSave })}
            // title={book.best_book.title}
            // cover={book.best_book.image_url}
            />
            {selectedBook.best_book !== undefined && (
            <Modal
                bookID={selectedBook.best_book.id.$t}
                onClose={selectedBook => this.setState({ selectedBook })}
            />
            )}
        </div>
        );        
    }
}

export default RecPage;