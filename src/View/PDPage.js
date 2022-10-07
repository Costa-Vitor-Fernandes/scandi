import { Component } from "react";



export default class PDPage extends Component {

    
    render() {
        let ProductIdFilter = window.location.pathname
           .slice(10)
           .toLowerCase();
        //    console.log(this.props)
        return (
            <div>
            PDPage {ProductIdFilter}
            </div>
            )
    }


}
