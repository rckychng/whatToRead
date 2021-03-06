import React from "react";
import axios from "axios";
import qs from "qs";
import firebase from "firebase";
import SavedData from "./SavedData.js"

class SavedBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedBooks: []
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .on("value", res => {
            // console.log(res.val())
            const userData = res.val();
            const dataArray = [];
            for (let bookKey in userData) {
              userData[bookKey].key = bookKey;
              dataArray.push(userData[bookKey]);
            }
            // console.log(dataArray);
            this.setState({
              savedBooks: dataArray
            });
          });
      }
    });
  }

  currentlyReading(savedBookKey, isReading) {
    // console.log(savedBookKey,isReading)
    if (isReading === false) {
      firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}/${savedBookKey}`)
        .update({
          reading: true
        });
    } else if (isReading === true) {
      firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}/${savedBookKey}`)
        .update({
          reading: false
        });
    }
  }

  finishedReading(savedBookKey, hasRead) {
    // console.log(savedBookKey,isReading)
    if (hasRead === false) {
      firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}/${savedBookKey}`)
        .update({
          read: true
        });
    } else if (hasRead === true) {
      firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}/${savedBookKey}`)
        .update({
          read: false
        });
    }
  }

  removeSavedBook(savedBookKey) {
    const dbref = firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}/${savedBookKey}`);
    dbref.remove();
  }
  render() {
    return (
      <div className="saved">
        <div className="saved-section wrapper">
          {this.state.savedBooks.map((savedBook, savedKey) => {
            // console.log(savedBook)
            return (
              <SavedData
                savedBook={savedBook}
                key={`savedBook-${savedKey}`}
                removeSavedBook={this.removeSavedBook}
                currentlyReading={this.currentlyReading}
                finishedReading={this.finishedReading}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default SavedBooks;