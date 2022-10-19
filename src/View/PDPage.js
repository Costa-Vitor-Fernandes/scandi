import { Component } from "react";
import styled from "styled-components";
import AttributesPicker from "../Classes/AttributesPicker";

const MainProductPage = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #fff;
  filter: ${(props) => (props.opaque ? "brightness(80%)" : "brightness(100%)")};

  #brand {
    font-family: "Raleway";
    font-style: "regular";
    font-weight: 600;
    font-size: 30px;
  }
  #name {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
  }
`;

const SmallImages = styled.div`
  display: flex;
  margin-left: 70px;
  flex-direction: column;
  overflow-x: hidden;
  min-width: 80px;
  & img {
    box-sizing: border-box;
    margin: 2px 6px;
    max-width: 100px;

    border: 1px solid white;
  }
  & :hover {
    border: 1px solid black;
  }
`;
const BigImage = styled.div`
  padding: 0 2em;

  max-width: 35vw;
  min-width: 35vw;
  & img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    height: auto;
  }
`;
const TextSection = styled.section`
  padding: 2em;

  width: 30vw;
`;
const Price = styled.div`
  padding: 10px 0;
  #price {
    font-family: "Raleway";
  }
`;

const AddToCart = styled.button`
  display: flex;
  cursor: ${(props) => (props.inStock ? null : "not-allowed")};
  background-color: ${(props) => (props.inStock ? "#5ECE7B" : "black")};
  width: 100%;
  border: none;
  color: #fff;
  justify-content: center;
  padding: 16px 32px;
  margin-bottom: 10px;

  :hover {
    background-color: ${(props) => (props.inStock ? "#3dcc61" : "black")};
  }
`;

const Loading = styled.div`
  padding: 50px;
`;

export default class PDPage extends Component {
  constructor(props) {
    super(props);
    this.attrGetter = this.attrGetter.bind(this);
    this.setDefaultAttr = this.setDefaultAttr.bind(this);
    this.state = {
      photoIndex: 0,
      name: "",
      description: "",
      currencyIndex: "",
      imgs: "",
      attributesSelected: [],
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

  attrGetter = (props) => {
    this.setState({ attributesSelected: props });
    return this.state.attributesSelected;
  };
  setDefaultAttr = () => {
    let product = this.props.productFactory;
    const defaultAttrStatePrep = {};

    product.attributes.map((v, i, arr) => {
      return Object.defineProperty(defaultAttrStatePrep, v.id, {
        value: 0,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    });
    return defaultAttrStatePrep;
  };

  render() {
    let product = this.props.productFactory;
    //if there is a valid name in product, we load stuff
    if (product.name) {
      return (
        <MainProductPage
          opaque={this.props.opaque}
          onClick={this.props.turnOffModals}
        >
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
            <h1 id="brand">{product.brand}</h1>
            <h3 id="name">{product.name}</h3>

            <AttributesPicker
              attributes={product.attributes}
              attrGetter={this.attrGetter}
              selectedAtLS={false}
            ></AttributesPicker>
            <Price>
              <h5 id="price-label">PRICE:</h5>
              <h3 id="price">
                {this.props.currencySymbols[this.props.currencyIndex]}
                {product.prices[this.props.currencyIndex].amount}
              </h3>
            </Price>
            <AddToCart
              inStock={product.inStock}
              onClick={() => {
                if (product.inStock) {
                  this.props.cartAction(
                    product,
                    this.attrGetter() || this.setDefaultAttr()
                  );
                  this.props.refreshLS();
                }
              }}
            >
              {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
            </AddToCart>
            {/* description */}
            <div
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            ></div>
            {/* description */}
          </TextSection>
        </MainProductPage>
      );
    }
    return <Loading>Loading...</Loading>;
  }
}
