import { Component } from "react";
import styled from "styled-components";
import MiniProduct from "./MiniProduct";
import {Link} from 'react-router-dom'

const Scrollable = styled.div`
overflow-y:scroll;
height:80vh;
`

const DivFlex = styled.div`
display:flex;
flex-direction:row;
justify-content:space-around;
`


export default class MiniCart extends Component {

    constructor(props) {
        super(props);
        this.state={
            cart:JSON.parse(window.localStorage.getItem('cart')),
        }
        
    }

    

    render(){
        // console.log(this.state.cart, JSON.parse(window.localStorage.getItem('cart')))
        console.log(this.state.cart, 'cartstate')
        if(this.state.cart === null){

            return (<div>nothing here
        </div>)
        }
        // this first div must be scrollable and custom scroll
        return(<Scrollable>
            <DivFlex>
            <h1>My bag,</h1><p>{this.state.cart.length}{' '}items</p>
            </DivFlex>

            {this.state.cart.map((v,i,arr)=>{
                // console.log(v)
                  return  <MiniProduct key={i} product={arr[i]} currencyIndex={this.props.currencyIndex} currencySymbols={this.props.currencySymbols}>                
                  </MiniProduct>
            })}
            {/* BUTTONS */}
            <DivFlex>
                {/* same components here, primary secondary */}
                <Link to={'/cart'}><button>view bag</button></Link>
                <button>checkout</button>
            </DivFlex>
        </Scrollable>)
    }
}
