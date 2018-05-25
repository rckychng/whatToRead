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
    constructor() {
        super();
        this.state = {
            singleTitle: []
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
                id: "29579",
                key: "GwIYI1RLhhFBh2UPUeLNw"
                },
                xmlToJSON: true
            }
            }).then((res) =>{
                console.log(res.data.GoodreadsResponse.book);
            })
    }


    render () {
        return (
            <div>
                cool
            </div>
        )
    }
}

export default Modal;