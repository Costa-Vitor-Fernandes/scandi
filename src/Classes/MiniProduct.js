import { Component } from "react";
import MiniAttribute from "./MiniAttribute";
import styled from "styled-components";

const MiniProductCart = styled.div`
/* background-color: red; */
display:flex;
flex-direction: row;
/* max-width: 100%; */
/* max-height:200px; */
margin-bottom: 1px;
`
const LeftContainer = styled.div`
padding: 0 10px;
margin: 0px 0;
max-width:50%;

background-color: blue;
flex-direction:column;
& h2,h3,h4,h5{
    padding:1px;
    margin:0
}
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
margin-bottom:1px;
display:flex;
/* display:block; */
background-color:gray;
padding:1px;
min-width:120px;
max-width:120px;
height:190px;
align-items:center; 
img{
    object-fit:cover;
    object-position:center;
    /* min-width:119px; */
    max-width:120px;
    max-height:190px;
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
