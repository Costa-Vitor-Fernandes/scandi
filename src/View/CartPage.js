import { Component } from "react";
import styled from "styled-components";
import CartProduct from "../Classes/CartProduct"

const Cart = styled.div`
font-size: 3em;
padding-top: 0.7em;
padding-left: 70px;
margin-bottom: 20px;
`

const Order = styled.button`
display: flex;
background-color:#5ECE7B;
width:100%;
border:none;
color:#fff;
justify-content: center;
padding:16px 32px;
margin-bottom:10px;
:hover{
  background-color:#3dcc61;
}
:focus{
  background-color:#93cfa2;
}
`

const OrderInfosDiv = styled.div`
padding-left: 65px;
width:30%;
`
const CartPageDiv = styled.div`
font-family:"Raleway";
background-color:#fff;
filter: ${(props) => (props.opaque ? "brightness(80%)" : "brightness(100%)")};

`

export default class CartPage extends Component{

    constructor(props) {
        super(props);
        // this.totalPlusTaxes = this.totalPlusTaxes.bind(this);
        // this.subTotal = this.subTotal.bind(this);
        this.processData = this.processData.bind(this);
        this.amountChanged = this.amountChanged.bind(this);
        this.state={
            cart:JSON.parse(window.localStorage.getItem('cart')),
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

    amountChanged = () =>{
        
        this.setState({cart:JSON.parse(window.localStorage.getItem('cart'))})
        setTimeout(()=>{
            this.processData()
        },100)
    }

    render(){
        // let quantity = 0
        // let sum = 0
        // this.state.cart.map((v,i,arr)=>{
        //     quantity = quantity+v.amount
        //    return sum = sum + v.prices[this.props.currencyIndex].amount*v.amount
        // })
        // this.setState({
        //     subTotal: sum,
        //     taxes: parseFloat(sum*0.21),
        //     totalPlusTaxes: parseFloat(sum*1.21),
        //     quantity: quantity,

        // })
        return(<CartPageDiv opaque={this.props.opaque} id="page">
            <Cart>CART</Cart>
            {this.state.cart.map((v,i,arr)=>{
                return <CartProduct amountChanged={this.amountChanged} key={i} idOnLocalStorage={i} currencyIndex={this.props.currencyIndex} currencySymbols={this.props.currencySymbols} product={v} />
            })}
            <OrderInfosDiv>
            <h3>TAX 21% : {this.props.currencySymbols[this.props.currencyIndex]} {parseFloat(this.state.taxes).toFixed(2)}</h3>
            <h3>Quantity: {this.state.quantity}</h3>
            <h3>Total : {this.props.currencySymbols[this.props.currencyIndex]} {' '} {parseFloat(this.state.totalPlusTaxes).toFixed(2)}</h3>
            <Order onClick={()=>console.warn('you ordered this',this.state.cart, this.state.total,)}>ORDER</Order>
            </OrderInfosDiv>
        </CartPageDiv>)
    }
}