import { Component } from "react";
import styled from "styled-components";

const CartItemContainer = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
margin: 0 65px;
border-top: 1px solid #ccc;
border-bottom: 1px solid #eee;
height:288px;
#brand{
font-family: 'Raleway';
font-style: 'regular';
font-weight: 600;
font-size: 30px;
  }
  #name{
    padding:0;
    margin:0;
    font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 30px;
  }
  #price{
    padding:0;margin:0;
    margin-top:4px;
  }
`
const FlexDiv = styled.div`
display:flex;
flex-direction:column;
`
const FlexRowDiv = styled.div`
display:flex;
flex-direction:row;
`
const ImageHolder = styled.div`
margin: 10px 75px;
width: 230px;
height:270px;
background-color: red;
/* max-width: 200px;
max-height:300px; */
#img{
    /* border:1px solid black; */
    object-fit:cover;
    object-position: 50% 10%;
    width:100%;
    height:100%;
}
`
const ButtonContainer = styled.div`
display: flex;
flex-direction:column;
justify-content:space-between;
margin: 15px 0;
`




export default class CartProduct extends Component {
  
    constructor(props) {
        super(props);
        this.addAmount = this.addAmount.bind(this);
        this.minusAmount = this.minusAmount.bind(this);
        this.state={
            photoIndex: 0,
            amount: this.props.product.amount,
            index:this.props.idOnLocalStorage,
        }
    }
    addAmount = ()=>{
      this.setState({amount:this.state.amount+1})
      let getFromLocalStorage = JSON.parse(window.localStorage.getItem("cart"));
      getFromLocalStorage[this.state.index].amount = this.state.amount+1;
      window.localStorage.setItem("cart", JSON.stringify(getFromLocalStorage));
      setTimeout(()=>{
        this.props.amountChanged()
      },100)
      
  }

  minusAmount = ()=>{
    this.props.amountChanged()
      if(this.state.amount>=1){
          this.setState({amount:this.state.amount-1})
          let getFromLocalStorage = JSON.parse(window.localStorage.getItem("cart"));
          getFromLocalStorage[this.state.index].amount = this.state.amount-1;
          window.localStorage.setItem("cart", JSON.stringify(getFromLocalStorage));
      }
      setTimeout(()=>{
        this.props.amountChanged()
      },100)
  }
  
    render(){
        let product = this.props.product
        // console.log(product)
        return<CartItemContainer>
            <FlexDiv>
            <h1 id='brand'>{product.brand}</h1>
            <h3 id='name'>{product.name}</h3>
            <h5 id="price">PRICE:</h5>
              <h3>
              {this.props.currencySymbols[this.props.currencyIndex]}
              {product.prices[this.props.currencyIndex].amount}</h3>
            {/* attributes shower */}
            {JSON.stringify(product.attributesSelected)}
            </FlexDiv>
            <FlexRowDiv>

            <ButtonContainer>
                    <button onClick={()=>this.addAmount()}>+</button>
                    <h5>{this.state.amount}</h5>
                    <button onClick={()=>this.minusAmount()}>-</button>
            </ButtonContainer>
            {/* amount buttons */}
            <ImageHolder>
            <img id="img" src={product.imgs[this.state.photoIndex]} alt={product.imgs[this.state.photoIndex]} ></img>
            </ImageHolder>
            </FlexRowDiv>
            </CartItemContainer>
    }
}