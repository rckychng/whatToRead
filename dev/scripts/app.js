import React from 'react';
import ReactDOM from 'react-dom';
import RecPage from './RecPage';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import SavedBooks from './SavedBooks';
//PAGES TO LINK TO
  //SIMILAR BOOKS: https://www.goodreads.com/book/similar/[id]
  //BOOK PAGE: https://www.goodreads.com/book/show/[bestbook id]
    //THIS IS A SEPARATE API CALL THAT WILL NEED TO BE MADE ONCE THE MODAL POPS UP.


//Genre picker 
  //scroll through results 10 at a time
  //make button to scroll through results


    

//More Info Modal
  //On click of more info button, modal opens up with additional info about chosen book
    //if nothing selected, do not render. If book selected, render based on selected book
    //conditional rendering that passes information of selected through props?
  // Display title, author, rating, pages, image & link to GoodReads page
  //Display similar books (determine how we will return similar books), once again map an array of images

  //Saved books page/user authentication
    //Use react router to generate alternate page view
    //display saved books
    // each saved book has checkable 'reading' and 'read' options and delete book button




class App extends React.Component {
  
  // sortBookResults(genreResults) {

  // }

  render() {
    return (
      <Router>
        <div>
          <Link to="/">Recommendations</Link>
          <Link to="/SavedBooks">My Books</Link>
          <Route path="/" exact component={RecPage} />
          <Route path="/SavedBooks" exact component={SavedBooks}/>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));