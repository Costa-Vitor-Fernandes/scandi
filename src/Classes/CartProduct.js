import { Component } from "react";
import styled from "styled-components";
import AttributesPicker from "./AttributesPicker";

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

  #img {
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
  width: 3em;
  position: relative;
  top: -50px;
  left: 160px;
  justify-content: space-between;
`;
const DivLeft = styled.div`
  opacity: 0.7;
  padding: 4px 6px 4px 4px;
  background-color: black;
  color: white;
  :hover {
    opacity: 1;
  }
`;
const DivRight = styled.div`
  opacity: 0.7;
  padding: 4px 4px 4px 6px;
  background-color: black;
  color: white;
  :hover {
    opacity: 1;
  }
`;

const ArrowLeft = styled.div`
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-right: 7px solid white;
`;
const ArrowRight = styled.div`
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 7px solid white;
`;
const TrashCan = styled.div`
  opacity: 0.7;
  position: relative;
  left: 240px;
  top: 16px;
  width: 1.25em;
  border-radius: 40px;
  img {
    padding: 5px;
    background-color: black;
    color: white;
  }
  :hover {
    opacity: 1;
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
    let max = this.props.product.imgs.length;
    let newPhotoIndex = this.state.photoIndex + 1;
    if (newPhotoIndex === max) {
      return this.setState({ photoIndex: 0 });
    } else {
      this.setState({ photoIndex: newPhotoIndex });
    }
  };
  prevPhoto = () => {
    let max = this.props.product.imgs.length - 1;
    if (this.state.photoIndex === 0) {
      return this.setState({ photoIndex: max });
    } else {
      let newPhotoIndex = this.state.photoIndex - 1;
      this.setState({ photoIndex: newPhotoIndex });
    }
  };

  render() {
    let product = this.props.product;
    // console.log(product)
    console.log(this.props);
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
        </FlexDiv>
        <FlexRowDiv>
          <ButtonContainer>
            <button onClick={() => this.addAmount()}>+</button>
            <h5>{this.state.amount}</h5>
            <button onClick={() => this.minusAmount()}>-</button>
          </ButtonContainer>
          <TrashCan
            onClick={() => {
              this.props.trashAction(this.props.idOnLocalStorage);
              this.props.refreshLS();
              this.props.refreshCart();
            }}
          >
            <img src="/trash-can.svg" alt="trash icon to delete"></img>
          </TrashCan>
          <ImageHolder>
            <img
              id="img"
              src={product.imgs[this.state.photoIndex]}
              alt={product.imgs[this.state.photoIndex]}
            ></img>
            {product.imgs.length > 1 ? (
              <PhotoButtonContainer>
                <DivLeft onClick={() => this.prevPhoto()}>
                  <ArrowLeft />
                </DivLeft>
                <DivRight onClick={() => this.nextPhoto()}>
                  <ArrowRight />
                </DivRight>
              </PhotoButtonContainer>
            ) : null}
          </ImageHolder>
        </FlexRowDiv>
      </CartItemContainer>
    );
  }
}
