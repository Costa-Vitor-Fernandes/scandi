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
  /* min-height:90vh; */
  #brand{
font-family: 'Raleway';
font-style: 'regular';
font-weight: 600;
font-size: 30px;
  }
  #name{
    font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 30px;
  }
`;

const SmallImages = styled.div`
  display: flex;
  
  /* border: 1px solid black; */
  margin-left:2vw;
  flex-direction: column;
  /* height:90vh; */
  /* overflow-y: scroll; */
  overflow-x: hidden;
  /* background-color: red; */
  max-width: 10vw;
  & img {
    box-sizing:border-box;
    margin: 2px 6px;
    max-height:10vw;
    border: 1px solid white;
    /* height: auto; */
  }
  & :hover {
    border:1px solid black;
    
  }
`;
const BigImage = styled.div`
  padding: 0 2em;
  /* display: flex; */
  /* justify-content:center; */
  /* border: 1px solid green; */
  max-width: 50vw;
  min-width:40vw;
  & img {
    /* width: 100%; */
    object-fit:cover;
    object-position:center;
    max-width: 40vw;
    max-height:90vh;

    height: auto;
    /* max-width: 43vw; */
  }
`;
const TextSection = styled.section`
  padding: 2em;
  /* border: 1px solid red; */
  width: 30vw;
`;
const Price = styled.div`
  /* border: 1px solid blue; */
  padding: 10px 0;
`;

const AddToCart = styled.button`
display: flex;
background-color:#5ECE7B;
width:100%;
border:none;
color:#fff;
justify-content: center;
padding:16px 32px;
margin-bottom:10px;
:hover{
  background-color:#3dcc61;
}
:focus{
  background-color:#93cfa2;
}
`

export default class PDPage extends Component {
  constructor(props) {
    super(props);
    // this.cartAction = this.cartAction.bind(this);
    this.attrGetter = this.attrGetter.bind(this);
    this.state = {
      photoIndex: 0,
      name: "",
      description: "",
      currencyIndex: "",
      imgs: "",
      attributesSelected:[],
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

  attrGetter = (props) =>{
    this.setState({attributesSelected: props})
    return this.state.attributesSelected
  }

  //i still need to passs attributes and quantity of products to this function
  // cartAction = () => {
  //   let product = this.props.productFactory;
  //   product.attributesSelected = [this.state.attributesSelected]
  //   console.log(product, 'full product action')
    
  //   // to parse string to Obj
  //   // JSON.parse(window.localStorage.getItem('cart'))
  //   let getFromLocalStorage = JSON.parse(window.localStorage.getItem("cart"));
  //   //logic to when the user has a Cart LocalStorage object
  //   if (getFromLocalStorage !== null) {
  //     if (getFromLocalStorage.length >= 2) {
  //       let newCart = [];
        
  //       getFromLocalStorage.map((v, i, arr) => newCart.push(v));
  //       newCart.push(product);
  //       return window.localStorage.setItem("cart", JSON.stringify(newCart));
  //     }
  //     let newCart = [];
      
  //     newCart.push(getFromLocalStorage[0]);
  //     newCart.push(product);
  //     return window.localStorage.setItem("cart", JSON.stringify(newCart));
  //   }
  //   if (getFromLocalStorage === null) {
      
  //     // console.log(product)
  //     return window.localStorage.setItem("cart", JSON.stringify([product]));
  //   }
  // };



  render() {
    let product = this.props.productFactory;
    //if there is a valid name in product, we load stuff
    console.log(this.props)
    if (product.name) {
      // console.log(product)
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
            <h3 id='name'>{product.name}</h3>

            {/* just to log attrs*/}
            {/* <button onClick={() => console.log(product.attributes)}>
              attrs log
            </button> */}
            {/* calls the attributes */}
            <AttributesPicker
              attributes={product.attributes}
              attrGetter={this.attrGetter}
            ></AttributesPicker>
            {/* i should have a getter function that gets the attributes picked and passes them to the cartAction function */}
            <Price>
              <h5>PRICE:</h5>
              <h3>
              {this.props.currencySymbols[this.props.currencyIndex]}
              {product.prices[this.props.currencyIndex].amount}</h3>
            </Price>
            <AddToCart onClick={()=>{
              this.props.cartAction(product,this.attrGetter() )
              this.props.refreshLS()
            }}>ADD TO CART</AddToCart>
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
    return <div>Loading...</div>;
  }
}
