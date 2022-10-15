import "./App.css";
import styled from "styled-components";
import { Component } from "react";
import Cards from "./Classes/Cards";
import axios from "axios";
import PDPage from "./View/PDPage";
import MiniCart from "./Classes/MiniCart";
import { Link } from "react-router-dom";




const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 80px;
  /* border-bottom: 1px solid black; */
`;

const Nav = styled.nav`
  padding: 0px 1em;
  font-size: 1em;
  line-height: 1.25em;
  height:50px;
  &:hover {
    border-bottom: 1px solid green;
  }
  /* media query here to size */
`;
const HeaderContainer = styled.div`
  display: flex;
  /* background-color: blue; */
  flex-direction: row;
  align-self: center;
  height: 2em;
  width: 14em;
  margin: 0 100px;
`;
const Logo = styled(HeaderContainer)`
  background-color: green;
  width: 2em;
  /* height:2em; */
`;
const ActionsMenu = styled(HeaderContainer)`
  /* background-color:green; */
  display: flex;
  justify-content: space-around;
  /* ???? query to size ???? */
`;

const PLP = styled.main`
  display: flex;
  /* padding-left:1vw; */
  flex-direction: column;
  background-color: #fff;
  /* background-color:  ${(props) =>
    props.primary ? "white" : "palevioletred"}; */
  filter: ${(props) => (props.opaque ? "brightness(80%)" : "brightness(100%)")};
`;
const CategoryName = styled.h1`
  font-size: 3em;
  padding-left: 100px;
`;

const ProductGrid = styled.div`
  display: grid;
  align-self: center;
  grid-template-columns: 23vw 23vw 23vw;
  gap: 7vw;
  width: 88vw;
  /* media query here to display flex column */
`;
const ActionButton = styled.div`
  display: flex;
  align-self: center;
  flex-direction: row;
  padding: 0.75em;
  /* background-color: red; */
  height: 1.25em;
  &:hover {
    background-color: rgb(249, 249, 249);
    transform: scale(1.15);
  }
`;
const Modal = styled.div`
  position: absolute;
  align-self: flex-end;
  margin: 0 4vw;
  width: 20em;
  top: 50px;
  /* border:1px solid black; */
  background-color: #fff;
  z-index: 3;
`;

const CurrencyModal = styled(Modal)`
  margin: 0 12vw;
  padding: 0.5em 0;
  width: 8em;
`;

const CurrencyActionButton = styled(ActionButton)`
  width: 4em;
  height: 1em;
  margin-left: 0.5em;
  padding-right: 2em;
`;

const Footer = styled.div`
  margin-top: 1.5em;
  background-color: #fefece;
  height: 50px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.currencyModal = this.currencyModal.bind(this);
    this.cartModal = this.cartModal.bind(this);
    this.productFactory = this.productFactory.bind(this);
    this.cartAction = this.cartAction.bind(this);

    this.state = {
      productInStock: [],
      productDescription: [],
      productAttributes: [],
      productBrands: [],
      productCategories: [],
      productImgs: [],
      productNames: [],
      productPrices: [],
      currencySymbols: [],
      currencyLabels: [],
      allCategoryNames: [],
      //save this in localStorage instead of state
      currencyIndex: 0,
      //save this in localStorage instead of state
      currencyModal: false,
      cartModal: false,
      // opaque is a trigger to styled-components, it darkens the PLP stuff when modal opens
      opaque: "",
      // categorySelected defaults to all
      categorySelected: "all",
    };
  }


  componentDidMount() {
    //fetching the symbols and labels of the currencies
   axios
      .get("http://localhost:4000/graphql?query={currencies{symbol,label}}")
      .then((res) => {
        let allCurrencies = res.data.data.currencies;
        let arrAllSymbols = allCurrencies.map((v, i, arr) => {
          return arr[i].symbol;
        });
        let arrAllLabels = allCurrencies.map((v, i, arr) => {
          return arr[i].label;
        });
        this.setState({
          currencySymbols: arrAllSymbols,
          currencyLabels: arrAllLabels,
        });
      });
    //fetching product stuff
   axios
      .get(
        `http://localhost:4000/graphql?query={category{products{attributes{id,name,type,items{id,value,displayValue}},category,brand,inStock,gallery,name,description,prices{amount,currency{symbol}}}}}`
      )
      .then((res) => {
        let allProducts = res.data.data.category.products;
        let arrAllProductNames = allProducts.map((v, i, arr) => arr[i].name);
        let arrAllProductCategories = allProducts.map(
          (v, i, arr) => arr[i].category
        );
        let arrAllProductPrices = allProducts.map((v, i, arr) => arr[i].prices);
        // returning a obj for each product with {amount : x, currency: {symbol : y} }

        let arrAllProductImgs = allProducts.map((v, i, arr) => arr[i].gallery);
        // returning a arr with links to the product images
        let arrAllCategories = allProducts.map((v, i, arr) =>
          arr[i].category.toUpperCase()
        );
        //this could be a req to the graphql server
        let allCategories = [...new Set(arrAllCategories)];
        //this could be a req to the graphql server
        
        let arrAllDescriptions = allProducts.map(
          (v, i, arr) => arr[i].description
        );
        let arrAllBrands = allProducts.map((v, i, arr) => arr[i].brand);
        let arrInStock = allProducts.map((v, i, arr) => arr[i].inStock);
        let arrAllProductAttributes = allProducts.map(
          (v, i, arr) => arr[i].attributes
        );
     
        this.setState({
          productInStock: arrInStock,
          productDescription: arrAllDescriptions,
          productAttributes: arrAllProductAttributes,
          productBrands: arrAllBrands,
          productCategories: arrAllProductCategories,
          productNames: arrAllProductNames,
          productImgs: arrAllProductImgs,
          productPrices: arrAllProductPrices,
          allCategoryNames: allCategories,
        });
      });
  }
  currencyModal = () => {
    this.setState({
      currencyModal: !this.state.currencyModal,
      cartModal: false,
      opaque: "opaque",
    });
  };
  cartModal = () => {
    this.setState({
      cartModal: !this.state.cartModal,
      currencyModal: false,
      opaque: "opaque",
    });
  };
  turnOffModals = () => {
    this.setState({ cartModal: false, currencyModal: false, opaque: "" });
  };
  productFactory = (id) => {
    let product = {
    name: this.state.productNames[id],
    brand:this.state.productBrands[id],
    category: this.state.productCategories[id],
    imgs: this.state.productImgs[id],
    prices: this.state.productPrices[id],
    attributes: this.state.productAttributes[id],
    description: this.state.productDescription[id],
  };
  return product;

  };
  cartAction = (product, attr) => {
//opens cart modal just to fast check
    // setTimeout(()=>{
// this.cartModal()
// },100)
    // let product = this.props.productFactory;
    product.attributesSelected = attr 
    console.log(product, 'full product action')
    
    // to parse string to Obj
    // JSON.parse(window.localStorage.getItem('cart'))
    let getFromLocalStorage = JSON.parse(window.localStorage.getItem("cart"));
    //logic to when the user has a Cart LocalStorage object
    if (getFromLocalStorage !== null) {
      if (getFromLocalStorage.length >= 2) {
        let newCart = [];
        
        getFromLocalStorage.map((v, i, arr) => newCart.push(v));
        newCart.push(product);
        return window.localStorage.setItem("cart", JSON.stringify(newCart));
      }
      let newCart = [];
      
      newCart.push(getFromLocalStorage[0]);
      newCart.push(product);
      return window.localStorage.setItem("cart", JSON.stringify(newCart));
    }
    if (getFromLocalStorage === null) {
      
      // console.log(product)
      return window.localStorage.setItem("cart", JSON.stringify([product]));
    }
  };




  render() {
    // console.log(this.state)
    // console.log(window.location.pathname, " window href"); // /kids
    let productId = window.location.pathname.slice(10);
    return (
      <div id="page">
        <Header>
          <HeaderContainer onClick={() => this.turnOffModals()}>
            <Nav onClick={() => this.setState({ categorySelected: "all" })}>
              <Link to={"/"}>
                {/* decided to fetch 'all' and hard code 'all' by default by now, i imagine every store having a 'all' category */}
                <div onClick={() => this.setState({ categorySelected: "all" })}>
                  ALL
                </div>
              </Link>
            </Nav>
            {/* mapping the category names */}
            {this.state.allCategoryNames.map((v, i, arr) => {
              return (
                <Nav key={i} onClick={() => {
                  this.setState({
                    categorySelected: this.state.allCategoryNames[i],
                  });
                }}>
                  <Link to={"/"}>
                    <div>
                      {this.state.allCategoryNames[i]}
                    </div>
                  </Link>
                </Nav>
              );
            })}
          </HeaderContainer>
          <Logo></Logo>
          <ActionsMenu>
            <ActionButton onClick={() => this.currencyModal()}>
              <img src="/dollar-sign.svg" alt="dollar-sign" />
              <img src="/caret-down.svg" alt="sign" />
            </ActionButton>
            <ActionButton onClick={() => this.cartModal()}>
              <img src="/cart-shopping.svg" alt="cart" />
            </ActionButton>
          </ActionsMenu>
        </Header>

        {/* opens the currency modal */}
        {this.state.currencyModal ? (
          <CurrencyModal>
            {this.state.currencySymbols.map((v, i, arr) => {
              return (
                <CurrencyActionButton
                  key={i}
                  onClick={() => {
                    this.setState({ currencyIndex: i });
                    this.setState({ currencyModal: false });
                  }}
                >
                  {this.state.currencySymbols[i]} {this.state.currencyLabels[i]}
                </CurrencyActionButton>
              );
            })}
            {/* currency action button styled component to override */}
          </CurrencyModal>
        ) : null}
        {/* opens the currency modal */}

        {/* opens the mini cart Modal */}
        {this.state.cartModal ? (
          <Modal>
            <MiniCart currencyIndex={this.state.currencyIndex} currencySymbols={this.state.currencySymbols}></MiniCart>
          </Modal>
        ) : null}
        {/* opens the mini cart Modal */}

        {/* opens the PLP/PDP when url changes */}
        {this.props.pdpage ? (
          <PDPage 
          cartAction={this.cartAction}
          turnOffModals={()=>this.turnOffModals()} 
          currencyLabels={this.state.currencyLabels}  
          currencySymbols={this.state.currencySymbols}
          opaque={this.state.cartModal || this.state.currencyModal}
          currencyIndex={this.state.currencyIndex}
          id={productId}
          productFactory={this.productFactory(productId)}
          />
        ) : (
          <PLP
            opaque={this.state.cartModal || this.state.currencyModal}
            onClick={() => this.turnOffModals()}
          >
            <CategoryName id="categoryName">
              {this.state.categorySelected.toUpperCase()}
            </CategoryName>
            <ProductGrid>
            {this.state.productNames.map((v,i,arr)=>{
              // console.log(i,' index do map maluco')
              if (this.state.categorySelected !== "all") {
                if (
                  this.state.categorySelected.toLowerCase() !==
                  this.state.productCategories[i]
                ) {
                  return void i++;
                }
              }
              return <Cards
              cartModal={this.cartModal} key={i} cartAction={this.cartAction}
              turnOffModals={()=>this.turnOffModals()} 
              currencyLabels={this.state.currencyLabels}  
              currencySymbols={this.state.currencySymbols}
              opaque={this.state.cartModal || this.state.currencyModal}
              currencyIndex={this.state.currencyIndex}
              id={i}
              productFactory={this.productFactory(i)}></Cards>
            })}
              {/* <Cards categorySelected={this.state.categorySelected} productCategories={this.state.productCategories} state={this.state} productFactory={this.productFactory}></Cards> */}
            </ProductGrid>
          </PLP>
        )}
        {/* opens the PLP/PDP when url changes */}

        <Footer>JustAFooterSpacer</Footer>
      </div>
    );
  }
}

export default App;
