import { Component } from "react";
import styled from "styled-components";

const ProductCard = styled.div`
/* background-color: red; */
width: 386px;
height: 444px;
&:hover{
  background-color:#fff;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.4);//0.4 instead of 0.19 to better contrast
}
`
const ImageHolder = styled.div`
display:flex;
padding: 1em 1em 1.5em 1em;
& #productImg{
  width:100%; 
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
`

export default class Card extends Component {

    render(){
        console.log(this.props.state.arrProductName)

        const allCards = this.props.state.arrProductName.map((v, i, arr)=>{
            return(
                <ProductCard>
                <ImageHolder>
                <img id="productImg" src={this.props.state.arrProductImg[i]} alt={this.props.state.arrProductName[i]}></img>
                </ImageHolder>
                <ProductName>{this.props.state.arrProductName[i]}</ProductName>
                <Price>{this.props.state.arrProductPrice[i]}</Price>
              </ProductCard>
            )
        })

    return allCards
    }
}