import { Component } from "react";
import styled from "styled-components";
import MiniProduct from "./MiniProduct";

const DivFlex =styled.div`
display:flex;
flex-direction:row;
justify-content:space-around;
`


export default class MiniCart extends Component {

    constructor(props) {
        super(props);
        this.state={
            cart:[JSON.parse(window.localStorage.getItem('cart'))],
        }
        
    }

    

    render(){
        console.log(this.state.cart, JSON.parse(window.localStorage.getItem('cart')))
        if(this.state.cart === null){

            return (<div>nothing here
        </div>)
        }
        // this first div must be scrollable and custom scroll
        return(<div>
            <DivFlex>
            <h1>My bag,</h1><p>{this.state.cart.length}{' '}items</p>
            </DivFlex>

            {this.state.cart.map((v,i,arr)=>{
                // console.log(v)
                  return  <MiniProduct product={v} currencyIndex={this.props.currencyIndex} currencySymbols={this.props.currencySymbols}></MiniProduct>
            })}
            {/* BUTTONS */}
            <DivFlex>
                {/* same components here, primary secondary */}
                <button>view bag</button>
                <button>checkout</button>
            </DivFlex>
        </div>)
    }
}
