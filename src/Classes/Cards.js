import { Component } from "react";
import styled from "styled-components";

const ProductCard = styled.div`
/* background-color: red; */
min-width: 27vw;
&:hover{
  background-color:#fff;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.4);//0.4 instead of 0.19 to better contrast
}
`
const ImageHolder = styled.div`
display:flex;
padding: 1vw 1vw 1.5vw 1vw;
& #productImg{
  min-width:23vw;
}
`
const ProductName = styled.h3`
margin: 0 0.75em;
margin-bottom:0;
`
const Price = styled.p`
/* background-color: red; */
margin: 0.5em 0.8em;
font-size:1em;
padding-bottom:2em;
`

export default class Cards extends Component {

    render(){
      let currencyIndex = this.props.state.defaultCurrencyIndex;
        const allCards = this.props.state.productNames.map((v, i, arr)=>{
            return(
                <ProductCard>
                <ImageHolder>
                <img id="productImg" src={this.props.state.productImgs[i][0]} alt={this.props.state.productNames[i]}></img>
                </ImageHolder>
                <ProductName>{this.props.state.productNames[i]}</ProductName>
                <Price>{this.props.state.currencyLabels[currencyIndex]} {this.props.state.currencySymbols[currencyIndex]} {this.props.state.productPrices[i][currencyIndex].amount}</Price>
              </ProductCard>
            )
        })

    return allCards
    }
}