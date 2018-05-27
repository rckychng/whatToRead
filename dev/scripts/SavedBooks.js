import React from "react";
import axios from "axios";
import qs from "qs";
import firebase from "firebase";
import SavedData from "./SavedData.js"

class SavedBooks extends React.Component {
    constructor() {
        super();
        this.state = {
            savedBooks: []
        }
    }
    componentDidMount() {
        firebase.database().ref().on("value", (res) => {
            // console.log(res.val())
            const userData = res.val();
            const dataArray = [];
            for (let bookKey in userData) {
                userData[bookKey].key = bookKey;
                dataArray.push(userData[bookKey])
            }
            console.log(dataArray);
            this.setState({
                savedBooks: dataArray
            })
        });
    }
    render() {
        return (
            <div>
                {this.state.savedBooks.map((savedBook,savedKey) => {
                    return (
                        <SavedData 
                            savedBook={savedBook} 
                            key={`savedBook-${savedKey}`}
                        />
                    )
                })}
            </div>
        );
    }
}

export default SavedBooks;