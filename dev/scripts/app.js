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
import firebase from 'firebase';


  //Saved books page/user authentication
    //Use react router to generate alternate page view
    //display saved books
    // each saved book has checkable 'reading' and 'read' options and delete book button


const config = {
  apiKey: "AIzaSyBkxhr4FMicWjtQin03JrWbbGVhe8mJgzM",
  authDomain: "whattoreadapp.firebaseapp.com",
  databaseURL: "https://whattoreadapp.firebaseio.com",
  projectId: "whattoreadapp",
  storageBucket: "whattoreadapp.appspot.com",
  messagingSenderId: "493854943854"
};

// const config = {
//   apiKey: "AIzaSyAQuGlgtPVMYsf0cL_F-Vtr40cy9eCALLw",
//   authDomain: "whattoread-test.firebaseapp.com",
//   databaseURL: "https://whattoread-test.firebaseio.com",
//   projectId: "whattoread-test",
//   storageBucket: "whattoread-test.appspot.com",
//   messagingSenderId: "473210225413"
// };

firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userID: ''
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.dbRef = firebase.database().ref();

    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.dbRef.on("value", snapshot => {
          console.log(snapshot.val());
        });
        this.setState({ 
          loggedIn: true,
          userID: user.uid 
        });
      } else {
        console.log("user logged out");
        this.setState({ 
          loggedIn: false,
          userID: ''
        });
      }
    });
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        if(user) {
          const token = user.credential.accessToken;
          const user = user.user;
          const userID = user.user.uid;
          // this.setState({
          //   userID: userID
          // });
          console.log(this.state.userID);
        }
        else {

        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  logout() {
    firebase.auth().signOut();
    this.dbRef.off("value");
  }
  render() {
    return (
      <Router>
        <div>
          <div className="nav">
            {this.state.loggedIn === false && (
              <button onClick={this.loginWithGoogle}>Login</button>
            )}
            {this.state.loggedIn === true ? (
              <button onClick={this.logout}>Logout</button>
            ) : null}
            <Link to="/">Recommendations</Link>
            <Link to="/SavedBooks">My Books</Link>
          </div>
          <Route path="/" exact component={RecPage} />
          <Route path="/SavedBooks" exact component={SavedBooks} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));