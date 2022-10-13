import { Component } from "react";

export default class MiniAttribute extends Component{
    
    render(){
        return (<div>{JSON.stringify(this.props.selected)}
        </div>)
    }

}