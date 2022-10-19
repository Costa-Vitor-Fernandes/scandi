import { Component } from "react";
import styled from "styled-components";
import MiniProduct from "./MiniProduct";
import { Link } from "react-router-dom";

const Scrollable = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 80vh;
  max-width: 325px;
  display: flex;
  flex-direction: column;
  box-shadow: none;
`;

const DivFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Button = styled.button`
  display: flex;
  background-color: #5ece7b;
  padding: 16px 24px;
  margin: 20px 0;

  border: none;
  color: white;
  :hover {
    background-color: #3dcc61;
  }
`;

const DivFlexAround = styled(DivFlex)`
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
`;

const ViewBag = styled(Button)`
  color: black;
  background-color: white;
  border: 1px solid black;
  :hover {
    background-color: white;
    box-shadow: 0px -2px 50px rgba(168, 172, 176, 0.4);
  }
`;
const MiniCartHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h1 {
    margin-left: 15px;
    font-size: 16px;
  }
`;

export default class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.processData = this.processData.bind(this);
    this.state = {
      cart: JSON.parse(window.localStorage.getItem("cart")),
      cartCount: this.props.cartCount,
      subTotal: 0,
      taxes: 0,
      totalPlusTaxes: 0,
      quantity: 0,
    };
  }
  componentDidMount() {
    this.processData();
  }

  processData = () => {
    let quantity = 0;
    let sum = 0;
    if (this.state.cart !== null) {
      this.state.cart.map((v, i, arr) => {
        quantity = quantity + v.amount;
        return (sum =
          sum + v.prices[this.props.currencyIndex].amount * v.amount);
      });
      this.setState({
        subTotal: sum,
        taxes: parseFloat(sum * 0.21),
        totalPlusTaxes: parseFloat(sum * 1.21),
        quantity: quantity,
      });
    }
  };

  render() {
    if (this.state.cart === null) {
      return (
        <MiniCartHeader>
          <h1>My bag,</h1>
          <p>{this.state.cartCount} items</p>
        </MiniCartHeader>
      );
    }

    return (
      <Scrollable>
        <MiniCartHeader>
          <h1>My bag,</h1>
          <p>{this.state.cartCount} items</p>
        </MiniCartHeader>

        {this.state.cart.map((v, i, arr) => {
          return (
            <MiniProduct
              turnOffModals={this.props.turnOffModals}
              trashAction={this.props.trashAction}
              refreshLS={this.props.refreshLS}
              key={i}
              idOnLocalStorage={i}
              product={arr[i]}
              currencyIndex={this.props.currencyIndex}
              currencySymbols={this.props.currencySymbols}
            ></MiniProduct>
          );
        })}
        <DivFlexAround>
          <p>Total:</p>
          <p>
            {this.props.currencySymbols[this.props.currencyIndex]}
            {this.state.totalPlusTaxes.toFixed(2)}
          </p>
        </DivFlexAround>
        <ButtonContainer>
          <Link to={"/cart"}>
            <ViewBag onClick={this.props.turnOffModals}>VIEW BAG</ViewBag>
          </Link>
          <Link to={"/cart"}>
            <Button onClick={this.props.turnOffModals}>CHECKOUT</Button>
          </Link>
        </ButtonContainer>
      </Scrollable>
    );
  }
}
