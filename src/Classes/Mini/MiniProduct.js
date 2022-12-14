import { Component } from "react";
import MiniAttribute from "./MiniAttribute";
import styled from "styled-components";

const MiniProductCart = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;

  margin-bottom: 2px;
  border: 1px solid #eee;
`;
const LeftContainer = styled.div`
  padding: 10px 0px 10px 16px;

  margin: 0px 0;
  width: 130px;

  display: flex;

  flex-direction: column;
  & h2,
  h3,
  h4,
  h5 {
    padding: 1px;
    margin: 0;
  }
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-around;
  max-width: 50%;
  min-width: 50%;
  margin-left: 6px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0;
  button {
    background-color: white;
    border: 1px solid black;
  }
`;
const ImageHolder = styled.div`
  display: flex;
  align-items: center;

  padding: 0 3px;
  width: 120px;
  #img {
    object-fit: cover;
    object-position: center;

    max-width: 120px;
  }
`;
const Brand = styled.p`
  padding: 0;
  margin: 10px 0 5px 0;
  font-weight: 300;
  font-size: 16px;
`;
const Name = styled(Brand)`
  font-size: 16px;
`;
const Price = styled.h5`
  font-size: 16px;
  font-weight: 500;
`;

const PhotoButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  min-width: 2.5em;
  left: -50px;
  top: 70px;
  justify-content: space-between;
`;

const DivLeft = styled.div`
  opacity: 0.7;
  padding: 4px 6px 4px 4px;
  background-color: black;
  color: white;
`;
const DivRight = styled.div`
  opacity: 0.7;
  padding: 4px 4px 4px 6px;
  background-color: black;
  color: white;
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
const MiniTrash = styled.div`
  position: relative;
  top: 5px;
  left: 115px;
  opacity: 0.7;
  height: 22px;
  background-color: black;
  color: white;

  padding: 2px;
  :hover {
    opacity: 1;
  }
`;

export default class MiniProduct extends Component {
  constructor(props) {
    super(props);
    this.addAmount = this.addAmount.bind(this);
    this.state = {
      photoIndex: 0,
      product: this.props.product,
      amount: this.props.product.amount,
      index: this.props.idOnLocalStorage,
    };
  }

  addAmount = () => {
    this.setState({ amount: this.state.amount + 1 });
    let getFromLocalStorage = JSON.parse(window.localStorage.getItem("cart"));
    getFromLocalStorage[this.state.index].amount = this.state.amount + 1;
    window.localStorage.setItem("cart", JSON.stringify(getFromLocalStorage));
  };

  minusAmount = () => {
    if (this.state.amount >= 1) {
      this.setState({ amount: this.state.amount - 1 });
      let getFromLocalStorage = JSON.parse(window.localStorage.getItem("cart"));
      getFromLocalStorage[this.state.index].amount = this.state.amount - 1;
      window.localStorage.setItem("cart", JSON.stringify(getFromLocalStorage));
    }
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
    if (this.state.product !== null && this.state.product !== []) {
      return (
        <MiniProductCart>
          <LeftContainer>
            <Brand>{this.state.product.brand}</Brand>
            <Name>{this.state.product.name}</Name>
            <Price>
              {this.props.currencySymbols[this.props.currencyIndex]}{" "}
              {this.state.product.prices[this.props.currencyIndex].amount}
            </Price>
            <MiniAttribute
              attributes={this.props.product.attributes}
              selected={this.state.product.attributesSelected}
            ></MiniAttribute>
          </LeftContainer>
          <RightContainer>
            <ButtonContainer>
              <button
                onClick={() => {
                  this.addAmount();
                  this.props.refreshLS();
                }}
              >
                +
              </button>
              <h5>{this.state.amount}</h5>
              <button
                onClick={() => {
                  this.minusAmount();
                  this.props.refreshLS();
                }}
              >
                -
              </button>
            </ButtonContainer>
            <MiniTrash
              onClick={() => {
                this.props.trashAction(this.props.idOnLocalStorage);
                this.props.turnOffModals();
                this.props.refreshLS();
              }}
            >
              x
            </MiniTrash>
            <ImageHolder>
              <img
                id="img"
                src={this.state.product.imgs[this.state.photoIndex]}
                alt={this.state.product.imgs[this.state.photoIndex]}
              ></img>
              {this.state.product.imgs.length > 1 ? (
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
          </RightContainer>
        </MiniProductCart>
      );
    }
    return <div>Nothing here </div>;
  }
}
