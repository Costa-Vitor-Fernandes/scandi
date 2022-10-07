import { Component } from "react";


export default class PDPage extends Component {

    
    render() {
        let ProductIdFilter = window.location.pathname
           .slice(10)
           .toLowerCase();
        //    console.log(props)
        return (<div>PDPage {ProductIdFilter} ou </div>)
    }


}
