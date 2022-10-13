import { Component } from "react";
import MiniAttribute from "./MiniAttribute";
import styled from "styled-components";

const ProductCart = styled.div`
background-color: red;
display:flex;
flex-direction: row;
`
const LeftContainer = styled.div`
background-color: blue;
flex-direction:column;
`
const RightContainer = styled.div`
background-color:green;
display:flex;
flex-direction:row;
`
const ButtonContainer = styled.div`

justify-content:space-between;`
const ImageHolder = styled.div`

img{
    max-width:25px;
height:auto;
}
`


export default class MiniProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            photoIndex:0
        }
    }

    render(){
        let product = this.props.product
        let currencyIndex = this.props.currencyIndex
        let currencySymbol = this.props.currencySymbols[currencyIndex]
        console.log(product, 'this is mini product on mini cart')
        
    
        return(
            <ProductCart>
                <LeftContainer>
                <h2>{product.brand}</h2>
                <h3>{product.name}</h3>
                {/* <h4>
              {currencySymbol}{" "}
              {product.prices[currencyIndex].amount}</h4> */}
              <MiniAttribute selected={product.attributesSelected}></MiniAttribute>
                </LeftContainer>
                <RightContainer>
                    <ButtonContainer>
                    <button>+</button><button>-</button>
                    </ButtonContainer>
                    <ImageHolder>
                        <img src={product.imgs[this.state.photoIndex]}></img>
                    </ImageHolder>
                </RightContainer>
            </ProductCart>
        )
    }
    
}
