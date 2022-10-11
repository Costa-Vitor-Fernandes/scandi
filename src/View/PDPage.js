import { Component } from "react";
import styled from "styled-components";

const MainProductPage = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #fff;
  filter: ${(props) => (props.opaque ? "brightness(80%)" : "brightness(100%)")};
  /* min-height:90vh; */
`;

const SmallImages = styled.div`
  display: flex;
  border: 1px solid black;
  flex-direction: column;
  /* background-color: red; */
  max-width: 10vw;
  & img {
    height: auto;
  }
  & :hover {
    transform: scale(1.1);
  }
`;
const BigImage = styled.div`
  padding: 0 2em;
  /* display: flex; */
  /* justify-content:center; */
  border: 1px solid green;
  max-width: 50vw;
  & img {
    width: 100%;
    height: auto;
    max-width: 50vw;
  }
`;
const TextSection = styled.section`
  padding: 2em;
  border: 1px solid red;
  width: 40vw;
`;
const Attributes = styled.div`
  background-color: gray;
`;
const Price = styled.div`
  border: 1px solid blue;
`;

export default class PDPage extends Component {
  constructor(props) {
    super(props);
    this.cartAction = this.cartAction.bind(this);
    this.state = {
      photoIndex: 0,
      name: "",
      description: "",
      currencyIndex: "",
      imgs: "",
    };
  }

  componentDidMount() {
    let product = this.props.productFactory;
    this.setState({
      name: product.name,
      description: product.description,
      currencyIndex: this.props.currencyIndex,
      imgs: product.imgs,
    });
  }

  //i still need to pass the attributes to this function
  cartAction = () => {
    let product = this.props.productFactory;

    // to parse string to Obj
    // JSON.parse(window.localStorage.getItem('cart'))
    let getterObj = JSON.parse(window.localStorage.getItem("cart"));
    //logic to when the user has a Cart LocalStorage object
    if (getterObj !== null) {
      if (getterObj.length >= 2) {
        let newCart = [];
        getterObj.map((v, i, arr) => newCart.push(v));
        newCart.push(product);
        return window.localStorage.setItem("cart", JSON.stringify(newCart));
      }
      let newCart = [];
      newCart.push(getterObj);
      newCart.push(product);
      return window.localStorage.setItem("cart", JSON.stringify(newCart));
    }
    if (getterObj === null) {
      return window.localStorage.setItem("cart", JSON.stringify(product));
    }
  };

  render() {
    let product = this.props.productFactory;
    if (product.name) {
      return (
        <MainProductPage opaque={this.props.opaque}>
          <SmallImages>
            {product.imgs.map((v, i, arr) => {
              return (
                <img
                  key={i}
                  alt={v}
                  src={v}
                  onClick={() => this.setState({ photoIndex: i })}
                />
              );
            })}
          </SmallImages>
          <BigImage>
            <img
              src={product.imgs[this.state.photoIndex]}
              alt={product.imgs[this.state.photoIndex]}
            />
          </BigImage>
          <TextSection>
            <h1>{this.props.productFactory.name}</h1>
            {/* something like that */}
            <div
              onClick={() => console.log(this.props.productFactory.attributes)}
            >
              attr
            </div>
            <Attributes>
              {/* {this.props.productFactory.attributes.length>=2 ? this.props.productFactory.attributes.map((v,i,arr)=>return <ComponentName></ComponentName>)} */}
              {this.props.productFactory.attributes.length <= 1 ? (
                <div>length menor =1</div>
              ) : (
                <div>length maior</div>
              )}
            </Attributes>
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.productFactory.description,
              }}
            ></div>
            <Price>
              {this.props.currencyLabels[this.props.currencyIndex]}{" "}
              {this.props.currencySymbols[this.props.currencyIndex]}{" "}
              {
                this.props.productFactory.prices[this.props.currencyIndex]
                  .amount
              }
            </Price>
            <button onClick={() => this.cartAction(this.props.id)}>
              addToCart
            </button>
          </TextSection>
        </MainProductPage>
      );
    }
    return <div>Loading...</div>;
  }
}
