import { Component } from "react";
import styled from "styled-components";
import AttributesPicker from "./AttributesPicker";
// import MiniAttribute from "./MiniAttribute";

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 65px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  #brand {
    font-family: "Raleway";
    font-style: "regular";
    font-weight: 600;
    font-size: 30px;
  }
  #name {
    padding: 0;
    margin: 0;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
  }
  #price {
    padding: 0;
    margin: 0;
    margin-top: 8px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
  }
`;
const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const ImageHolder = styled.div`
  margin: 10px 0;
  margin-left: 16px;
  width: 230px;
  height: 270px;
  /* background-color: red; */
  /* max-width: 200px;
max-height:300px; */
  #img {
    /* border:1px solid black; */
    object-fit: cover;
    object-position: 50% 10%;
    width: 100%;
    height: 100%;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 15px 0;
`;
const PhotoButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width:3em;
  position: relative;
  top: -50px;
  left: 160px;
  justify-content:space-between;
  & div{
    padding: 0 5px;
    background-color:black;
    color:white;
    /* border:1px solid red; */
  }
`;

export default class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.addAmount = this.addAmount.bind(this);
    this.minusAmount = this.minusAmount.bind(this);
    this.prevPhoto = this.prevPhoto.bind(this);
    this.nextPhoto = this.nextPhoto.bind(this);
    this.state = {
      photoIndex: 0,
      amount: this.props.product.amount,
      index: this.props.idOnLocalStorage,
    };
  }
  addAmount = () => {
    this.setState({ amount: this.state.amount + 1 });
    let getFromLocalStorage = JSON.parse(window.localStorage.getItem("cart"));
    getFromLocalStorage[this.state.index].amount = this.state.amount + 1;
    window.localStorage.setItem("cart", JSON.stringify(getFromLocalStorage));
    setTimeout(() => {
      this.props.amountChanged();
    }, 100);
  };

  minusAmount = () => {
    this.props.amountChanged();
    if (this.state.amount >= 1) {
      this.setState({ amount: this.state.amount - 1 });
      let getFromLocalStorage = JSON.parse(window.localStorage.getItem("cart"));
      getFromLocalStorage[this.state.index].amount = this.state.amount - 1;
      window.localStorage.setItem("cart", JSON.stringify(getFromLocalStorage));
    }
    setTimeout(() => {
      this.props.amountChanged();
    }, 100);
  };
  nextPhoto = () => {
    let max = this.props.product.imgs.length
    let newPhotoIndex = this.state.photoIndex +1
    if (newPhotoIndex === max){
      return  this.setState({ photoIndex: 0 });
    }else{
      this.setState({ photoIndex: newPhotoIndex });
    }
  };
  prevPhoto = () => {
    let max = this.props.product.imgs.length-1
    if(this.state.photoIndex === 0){
     return this.setState({ photoIndex: max });
    }else{
      let newPhotoIndex = this.state.photoIndex -1
      this.setState({ photoIndex: newPhotoIndex });
    }
  };

  render() {
    let product = this.props.product;
    // console.log(product)
    return (
      <CartItemContainer>
        <FlexDiv>
          <h1 id="brand">{product.brand}</h1>
          <h3 id="name">{product.name}</h3>
          <h3 id="price">
            {this.props.currencySymbols[this.props.currencyIndex]}{" "}
            {product.prices[this.props.currencyIndex].amount}
          </h3>
          <AttributesPicker
            attributes={product.attributes}
            selected={product.attributesSelected}
            selectedAtLS={true}
          />
          {/* {JSON.stringify(product.attributesSelected)} */}
        </FlexDiv>
        <FlexRowDiv>
          <ButtonContainer>
            <button onClick={() => this.addAmount()}>+</button>
            <h5>{this.state.amount}</h5>
            <button onClick={() => this.minusAmount()}>-</button>
          </ButtonContainer>
          {/* amount buttons */}
          <ImageHolder>
            <img
              id="img"
              src={product.imgs[this.state.photoIndex]}
              alt={product.imgs[this.state.photoIndex]}
            ></img>
            {product.imgs.length >1? <PhotoButtonContainer>
              <div onClick={() => this.prevPhoto()}>-</div>
              <div onClick={() => this.nextPhoto()}>+</div>
            </PhotoButtonContainer> :null}
            
          </ImageHolder>
        </FlexRowDiv>
      </CartItemContainer>
    );
  }
}
