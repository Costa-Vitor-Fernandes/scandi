import { Component } from "react";
import styled from "styled-components";
import MiniProduct from "./MiniProduct";
import {Link} from 'react-router-dom'

const Scrollable = styled.div`
overflow-y:scroll;
overflow-x:hidden;
height:80vh;
max-width:325px;
display:flex;
flex-direction:column;

`

const DivFlex = styled.div`
display:flex;
flex-direction:row;
justify-content:space-around;

`

const ButtonContainer = styled.div`
/* background-color: gray; */
/* padding:20px 0; */
display:flex;
flex-direction:row;
justify-content:space-around;
/* align-items: center; */

& button{
    display:flex;
    background-color: #5ECE7B;
    padding: 16px 24px;
    margin: 20px 0;
    /* border:1px solid black; */
    border:none;
    color:white;
    /* padding:16px 24px; */
    
}
`



export default class MiniCart extends Component {

    constructor(props) {
        super(props);
        this.state={
            cart:JSON.parse(window.localStorage.getItem('cart')),
            cartCount:this.props.cartCount,
        }
        
    }


    

    render(){
        // console.log(this.state.cart, JSON.parse(window.localStorage.getItem('cart')))
        console.log(this.state.cart, 'cartstate')
        if(this.state.cart === null){

            return (<DivFlex>
                <h1>My bag,</h1><p>0 items</p>
                </DivFlex>)
        }
        // this first div must be scrollable and custom scroll
        return(<Scrollable>
            <DivFlex>
            <h1>My bag,</h1><p>{this.state.cartCount}{' '}items</p>
            </DivFlex>

            {this.state.cart.map((v,i,arr)=>{
                // console.log(v)
                  return  <MiniProduct refreshLS={this.props.refreshLS} key={i} idOnLocalStorage={i} product={arr[i]} currencyIndex={this.props.currencyIndex} currencySymbols={this.props.currencySymbols}>                
                  </MiniProduct>
            })}
            {/* BUTTONS */}
            <ButtonContainer>
                {/* same components here, primary secondary */}
                <Link to={'/cart'}>
                <button onClick={this.props.turnOffModals}>VIEW BAG</button>
                </Link>
                <Link to={'/cart'}>
                <button onClick={this.props.turnOffModals}>CHECKOUT</button>
                </Link>
                {/* <button>a</button>
                <button>a</button> */}
            </ButtonContainer>
        </Scrollable>)
    }
}
