import { Component } from "react";
import MiniAttribute from "./MiniAttribute";
import styled from "styled-components";

const MiniProductCart = styled.div`
background-color: red;
display:flex;
flex-direction: row;
max-height:250px;
`
const LeftContainer = styled.div`
background-color: blue;
flex-direction:column;
`
const RightContainer = styled.div`
background-color:green;
display:flex;
flex-direction:row;
align-items: space-around;
`
const ButtonContainer = styled.div`
display: flex;
flex-direction:column;
justify-content:space-between;
`
const ImageHolder = styled.div`
background-color:gray;
padding:1px;

img{
    max-width:125px;
height:auto;
}
`


export default class MiniProduct extends Component {

    constructor(props) {
        super(props)
        this.addAmount = this.addAmount.bind(this)
        this.state = {
            photoIndex:0,
            product:this.props.product,
            amount:this.props.product.amount,
            index:this.props.idOnLocalStorage
        }
    }

    addAmount = ()=>{
        this.setState({amount:this.state.amount+1})
        let getFromLocalStorage = JSON.parse(window.localStorage.getItem("cart"));
        getFromLocalStorage[this.state.index].amount = this.state.amount+1;
        window.localStorage.setItem("cart", JSON.stringify(getFromLocalStorage));
    }

    minusAmount = ()=>{
        if(this.state.amount>=1){
            this.setState({amount:this.state.amount-1})
            let getFromLocalStorage = JSON.parse(window.localStorage.getItem("cart"));
            getFromLocalStorage[this.state.index].amount = this.state.amount-1;
            window.localStorage.setItem("cart", JSON.stringify(getFromLocalStorage));
        }
    }



    render(){
        // let currencyIndex = this.props.currencyIndex
        // let currencySymbol = this.props.currencySymbols[currencyIndex]
        // console.log(product, 'this is mini product on mini cart')
        console.log(this.state.product, 'this is inside the miniproduct when it renders')
        if(this.state.product !== null && this.state.product !== []){
        
        return(
            <MiniProductCart>
                <LeftContainer>
                <h2>{this.state.product.brand}</h2>
                <h3>{this.state.product.name}</h3>
                <h4>
              {this.props.currencySymbols[this.props.currencyIndex]}{" "}
              {this.state.product.prices[this.props.currencyIndex].amount}</h4>
              <MiniAttribute selected={this.state.product.attributesSelected}></MiniAttribute>
                </LeftContainer>
                <RightContainer>
                    <ButtonContainer>
                    <button onClick={()=>this.addAmount()}>+</button>
                    <h5>{this.state.amount}</h5>
                    <button onClick={()=>this.minusAmount()}>-</button>
                    </ButtonContainer>
                    <ImageHolder>
                        <img src={this.state.product.imgs[this.state.photoIndex]} alt={this.state.product.imgs[this.state.photoIndex]}></img>
                    </ImageHolder>
                </RightContainer>
            </MiniProductCart>
        )
    }
return <div>Nothing here </div>    
}
    
}
