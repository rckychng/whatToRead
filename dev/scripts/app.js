import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import qs from 'qs';
import Genrepicker from './Genrepicker';
import GenreRes from './GenreRes';
import Modal from './Modal';
import firebase from 'firebase';
//PAGES TO LINK TO
  //SIMILAR BOOKS: https://www.goodreads.com/book/similar/[id]
  //BOOK PAGE: https://www.goodreads.com/book/show/[bestbook id]
    //THIS IS A SEPARATE API CALL THAT WILL NEED TO BE MADE ONCE THE MODAL POPS UP.


//Genre picker 
  //Allow user to select a genre (clarifying question: genre dropdown 
    //Genres [5]: [Science Fiction] [Fantasy] [Thriller] [Romance] [fiction] [non-fiction][humor]
  //Store users selection in order to pass either to API call


    

//More Info Modal
  //On click of more info button, modal opens up with additional info about chosen book
    //if nothing selected, do not render. If book selected, render based on selected book
    //conditional rendering that passes information of selected through props?
  // Display title, author, rating, pages, image & link to GoodReads page
  //Display similar books (determine how we will return similar books), once again map an array of images

  //Saved books page/user authentication
    //when book is saved, save information to Firebase. Load info on this page based on 
    //Use react router to generate alternate page view
    //display saved books, each saved book has checkable 'reading' and 'read' options and delete book button

    //FIREBASE
const config = { 
  apiKey: "AIzaSyBkxhr4FMicWjtQin03JrWbbGVhe8mJgzM", 
  authDomain: "whattoreadapp.firebaseapp.com", 
  databaseURL: "https://whattoreadapp.firebaseio.com", 
  projectId: "whattoreadapp", 
  storageBucket: "whattoreadapp.appspot.com", 
  messagingSenderId: "493854943854" 
};

firebase.initializeApp(config);


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "fiction",
      books: [],
      selectedBook: [],
      loggedIn: false,
      bookImage: '',
      bookTitle: '',
      bookAuthor: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  saveToFirebase (e) {
    e.preventDefault();

    const dbRef = firebase.database().ref();

    dbRef.on('value', (snapshot) => {
      console.log(snapshot.val());
    });

    const savedBook = {
      bookImage: '',
      bookTitle: '' ,
      bookAuthor:''
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState ({
      books: []
    });
    this.batchCall();
  }

  batchCall() {
    for(let i = 1; i <= 5; i++) {
      this.getBooksByGenre(i)
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

      this.setState({
        books: completeBatch
      });

      // console.log(this.state.books);
    });
  }

  // sortBookResults(genreResults) {

  // }

  render() {
    const { books } = this.state;
    const { selectedBook} = this.state;
    console.log(this.state.selectedBook);
    // console.log(books);
    return (
      <div>
        <header>
          <h1>What to Read</h1>
          <div className="genre-select">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="genrePicker">I feel like reading </label>
              <select name="selectGenre" id="genrePicker" value={this.state.value} onChange={this.handleChange}>
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
              // key={key}
              // title={book.best_book.title}
              // cover={book.best_book.image_url}
            />
        {selectedBook.best_book !== undefined && <Modal
            bookID={selectedBook.best_book.id.$t}
            onClose={selectedBook => this.setState({selectedBook})}
        />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));