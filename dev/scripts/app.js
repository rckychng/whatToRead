import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import qs from 'qs';

//Genre picker 
  //Allow user to select a genre (clarifying question: genre dropdown? is there specific genre options we should show?) 
  //Store users selection in order to pass either to API call or to map through data depending on API requirements

//Top 10 display
  //Display matches from genre picker 10 books at a time
    //How many books does call return? Depending on this determine how often data needs to be called and looped. Store in arrays of 10 with an onClick method that loads in next 10
    //Do we want to sort this in a particular way? Spec says return popular books, so perhaps in order of decreasing popularity?
    //however data is returned, we wil want to map 10 results and render the images to the screen along with a more information button (Image, title, author? Do we also want an add to saved books option here?)

//More Info Modal
  //On click of more info button, modal opens up with additional info about chosen book
    //if nothing selected, do not render. If book selected, render based on selected book
    //conditional rendering that passes information of selected through props?
  // Display title, author, rating, pages, image & link to GoodReads page
  //Display similar books (determine how we will return similar books), once again map an array of images

  //Saved books page
    //when book is saved, save information to Firebase. Load info on this page based on 
    //Use react router to generate alternate page view
    //display saved books, each saved book has checkable 'reading' and 'read' options and delete book button

class App extends React.Component {
  componentDidMount() {
    axios({
      url: "http://proxy.hackeryou.com",
      method: "GET",
      dataResponse: "JSON",
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: 'https://www.goodreads.com/search/index.xml',
        params: {
          q: 'Harry Potter',
          'search[field]': 'title',       
          key: 'GwIYI1RLhhFBh2UPUeLNw',
          page: 2  
        },
        xmlToJSON: true
      },
      })
      .then((res) => {
        const genreResults = 
        console.log(res.data.GoodreadsResponse.search.results.work);


      });
    }

  render() {
    return (
      <div>
        Hello
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
