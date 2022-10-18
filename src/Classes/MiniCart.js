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

`

const Button = styled.button`
display:flex;
    background-color: #5ECE7B;
    padding: 16px 24px;
    margin: 20px 0;
    /* border:1px solid black; */
    border:none;
    color:white;
    /* padding:16px 24px; */
`

const DivFlexAround = styled(DivFlex)`
display:flex;
justify-content:space-around;
margin:0;
padding:0;
`

const ViewBag = styled(Button)`
color:black;
background-color:white;
border:1px solid black;
`



export default class MiniCart extends Component {

    constructor(props) {
        super(props);
        this.processData = this.processData.bind(this);
        this.state={
            cart:JSON.parse(window.localStorage.getItem('cart')),
            cartCount:this.props.cartCount,
            subTotal:0,
            taxes:0,
            totalPlusTaxes:0,
            quantity:0,

        }
        
    }
    componentDidMount() {
        this.processData()
    }

    processData = () =>{
        //this is the info in the end
        let quantity = 0
        let sum = 0
        this.state.cart.map((v,i,arr)=>{
            quantity = quantity+v.amount
           return sum = sum + v.prices[this.props.currencyIndex].amount*v.amount
        })
        this.setState({
            subTotal: sum,
            taxes: parseFloat(sum*0.21),
            totalPlusTaxes: parseFloat(sum*1.21),
            quantity: quantity,

        })
}

    

    render(){
        // console.log(this.state.cart, JSON.parse(window.localStorage.getItem('cart')))
        console.log(this.state.cart, 'cartstate')
        if(this.state.cart === null){

            return (<DivFlex>
                <h1>My bag,</h1><p>{this.state.quantity} items</p>
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
            <DivFlexAround>
            <p>Total:</p>
            <p>$50</p>
            </DivFlexAround>
            <ButtonContainer>
                {/* same components here, primary secondary */}
                <Link to={'/cart'}>
                <ViewBag onClick={this.props.turnOffModals}>VIEW BAG</ViewBag>
                </Link>
                <Link to={'/cart'}>
                <Button onClick={this.props.turnOffModals}>CHECKOUT</Button>
                </Link>
                {/* <button>a</button>
                <button>a</button> */}
            </ButtonContainer>
        </Scrollable>)
    }
}
