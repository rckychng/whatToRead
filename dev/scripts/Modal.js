import React from 'react';
import axios from "axios";
import qs from "qs";

//id needs to be a variable
//hook in selected book
//selected book will pass id as props and our component will use that id to call axios

//similar_books
//title
//publication_year
//num_pages
//image_url
//authors > author > name
//average_rating
//description
//link

class Modal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            singleTitle: [],
            bookID: props.bookID,
            bookData: []
        }
    }
    componentDidMount () {
        axios({
        url: "http://proxy.hackeryou.com",
        method: "GET",
        dataResponse: "JSON",
        paramsSerializer: function(params) {
            return qs.stringify(params, { arrayFormat: "brackets" });
        },
        params: {
            reqUrl: "https://www.goodreads.com/book/show.xml",
            params: {
            id: this.state.bookID,
            key: "GwIYI1RLhhFBh2UPUeLNw"
            },
            xmlToJSON: true
        }
        }).then((res) =>{
            const bookData = res.data.GoodreadsResponse.book;

            this.setState ({
                bookData: bookData
            });
        })
    }


    render () {
        const {bookData} = this.state;
        console.log(bookData);
        return (
            <div className="modal">
                <h2>{bookData.title}</h2>
                <img src={bookData.img_url} alt=""/>
                <div dangerouslySetInnerHTML= {{__html: bookData.description}}/>
                <p>{bookData.average_rating}</p>
            </div>
        )
    }
}

export default Modal;