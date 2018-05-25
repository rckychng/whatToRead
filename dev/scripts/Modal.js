import React from 'react';

//

class Modal extends React.Component {
    constructor() {
        super();
        this.setState = {
            value: 
            singleTitle:
        }
    }
    getDetails () {
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

            })
    }
    render () {
        return (
            <div>
                
            </div>
        )
    }
}

export default Modal;