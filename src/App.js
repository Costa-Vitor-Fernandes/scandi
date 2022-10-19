import "./App.css";
import styled from "styled-components";
import { Component } from "react";
import Cards from "./Classes/Cards";
import PDPage from "./View/PDPage";
import MiniCart from "./Classes/Mini/MiniCart";
import { Link } from "react-router-dom";
import CartPage from "./View/CartPage";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 80px;
`;

const Nav = styled.nav`
  padding: 0px 1em;
  font-size: 16px;
  line-height: 1.25em;
  height: 50px;
  text-transform: uppercase;
  border-bottom: ${(props) => (props.selected ? "1px solid #5ECE7B" : "none")};
  &:hover {
    border-bottom: 1px solid #5ece7b;
  }
`;
const HeaderContainer = styled.div`
  display: flex;

  flex-direction: row;
  align-self: center;
  height: 2em;
  width: 14em;
  margin: 0 0 0 65px;
`;
const Logo = styled(HeaderContainer)`
  width: 2em;
`;
const ActionsMenu = styled(HeaderContainer)`
  margin: 0 65px 0 15px;
  display: flex;
  justify-content: space-around;
`;

const PLP = styled.main`
  display: flex;
  flex-direction: column;
  background-color: #fff;

  filter: ${(props) => (props.opaque ? "brightness(80%)" : "brightness(100%)")};
`;
const CategoryName = styled.h1`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 42px;
  padding-left: 80px;
`;

const ProductGrid = styled.div`
  display: grid;
  align-self: center;
  grid-template-columns: 23vw 23vw 23vw;
  gap: 7vw;
  width: 88vw;
`;

const OpenCurrencyModal = styled.div`
  display: flex;
  align-self: center;
  flex-direction: row;
  /* background-color:aqua; */
  padding: 20px 20px;
  padding-right: 30px;
  #relative {
    position: relative;
  }
  &:hover {
    background-color: rgb(249, 249, 249);
    transform: scale(1.1);
  }
`;
const OpenMiniCartModal = styled.div`
  display: flex;
  align-self: center;
  flex-direction: row;
  padding: 40px 20px;
  padding-right: 23px;

  font-size: 26px;
  line-height: 0px;
  #relative {
    position: relative;
  }
  &:hover {
    background-color: rgb(249, 249, 249);
    transform: scale(1.1);
  }
`;

const Modal = styled.div`
  position: absolute;
  align-self: flex-end;
  margin: 0 4vw;
  width: 20em;
  top: 80px;
  background-color: #fff;
  z-index: 3;
  box-shadow: 0px -2px 50px rgba(168, 172, 176, 0.4);
`;

const CartModal = styled.div`
  position: absolute;
  align-self: flex-end;
  margin: 0 4vw;
  width: 20em;
  top: 80px;
  background-color: #fff;
  z-index: 3;
`;

const CurrencyModal = styled(Modal)`
  margin: 0 16.4vw;
  padding: 0.5em 0;
  width: 8.05em;
`;

const CurrencyActionButton = styled.div`
  width: 7em;
  font-size: 16px;
  margin-left: 0.35em;
  padding: 1.25em 0em;
  :hover {
    background-color: rgb(245, 245, 245);
    transform: scale(1.1);
  }
  & {
    padding-left: 5px;
  }
`;

const Footer = styled.div`
  margin-top: 1.5em;
  background-color: #fefefe;
  height: 50px;
  color: rgb(245, 245, 245);
  text-align: center;
`;

const Absolute = styled.div`
  position: absolute;
  width: 20px;
`;

const CartCounter = styled.div`
  display: ${(props) => (props.counter >= 1 ? "block" : "none")};
  background-color: black;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  position: relative;
  top: -8px;
  left: 10px;
  color: white;
  font-size: 12px;
  text-align: center;
  line-height: 18px;
`;
const CategorySelector = styled.div`
  color: ${(props) => (props.selected ? "#5ECE7B" : "black")};
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.currencyModal = this.currencyModal.bind(this);
    this.cartModal = this.cartModal.bind(this);
    this.productFactory = this.productFactory.bind(this);
    this.cartAction = this.cartAction.bind(this);
    this.refreshLS = this.refreshLS.bind(this);

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
      currencyIndex: window.localStorage.getItem("currencyIndex") || 0,
      //save this in localStorage instead of state
      currencyModal: false,
      cartModal: false,
      // opaque is a trigger to styled-components, it darkens the PLP stuff when modal opens
      opaque: "",
      // categorySelected defaults to all
      categorySelected: "all",
      cartCount: 0,
    };
  }

  componentDidMount() {
    //fetching the symbols and labels of the currencies

    fetch("http://localhost:4000/graphql?query={categories{name}}")
      .then((response) => response.json())
      .then((data) => {
        let allCategories = data.data.categories.map((v, i, arr) => v.name);
        this.setState({ allCategoryNames: allCategories });
      });
    // axios
    //   .get("http://localhost:4000/graphql?query={categories{name}}")
    //   .then((res) => {
    //     // console.log(res.data.data.categories, "resdatadata");
    // let allCategories = res.data.data.categories.map((v, i, arr) => v.name);
    // this.setState({ allCategoryNames: allCategories });
    //   });

    fetch("http://localhost:4000/graphql?query={currencies{symbol,label}}")
      .then((res) => res.json())
      .then((data) => {
        let allCurrencies = data.data.currencies;
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
    // axios
    //   .get("http://localhost:4000/graphql?query={currencies{symbol,label}}")
    //   .then((res) => {
    //     let allCurrencies = res.data.data.currencies;
    //     let arrAllSymbols = allCurrencies.map((v, i, arr) => {
    //       return arr[i].symbol;
    //     });
    //     let arrAllLabels = allCurrencies.map((v, i, arr) => {
    //       return arr[i].label;
    //     });
    //     this.setState({
    //       currencySymbols: arrAllSymbols,
    //       currencyLabels: arrAllLabels,
    //     });
    //   });
    //fetching product stuff

    fetch(
      "http://localhost:4000/graphql?query={category{products{attributes{id,name,type,items{id,value,displayValue}},category,brand,inStock,gallery,name,description,prices{amount,currency{symbol}}}}}"
    )
      .then((res) => res.json())
      .then((data) => {
        let allProducts = data.data.category.products;
        let arrAllProductNames = allProducts.map((v, i, arr) => arr[i].name);
        let arrAllProductCategories = allProducts.map(
          (v, i, arr) => arr[i].category
        );
        let arrAllProductPrices = allProducts.map((v, i, arr) => arr[i].prices);
        // returning a obj for each product with {amount : x, currency: {symbol : y} }

        let arrAllProductImgs = allProducts.map((v, i, arr) => arr[i].gallery);
        // returning a arr with links to the product images
        //this could be a req to the graphql server
        // let allCategories = [...new Set(arrAllCategories)];
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
          // allCategoryNames: allCategories,
        });
      });
    // axios
    //   .get(
    //     `http://localhost:4000/graphql?query={category{products{attributes{id,name,type,items{id,value,displayValue}},category,brand,inStock,gallery,name,description,prices{amount,currency{symbol}}}}}`
    //   )
    //   .then((res) => {
    //     let allProducts = res.data.data.category.products;
    //     let arrAllProductNames = allProducts.map((v, i, arr) => arr[i].name);
    //     let arrAllProductCategories = allProducts.map(
    //       (v, i, arr) => arr[i].category
    //     );
    //     let arrAllProductPrices = allProducts.map((v, i, arr) => arr[i].prices);
    //     // returning a obj for each product with {amount : x, currency: {symbol : y} }

    //     let arrAllProductImgs = allProducts.map((v, i, arr) => arr[i].gallery);
    //     // returning a arr with links to the product images
    //     //this could be a req to the graphql server
    //     // let allCategories = [...new Set(arrAllCategories)];
    //     //this could be a req to the graphql server

    //     let arrAllDescriptions = allProducts.map(
    //       (v, i, arr) => arr[i].description
    //     );
    //     let arrAllBrands = allProducts.map((v, i, arr) => arr[i].brand);
    //     let arrInStock = allProducts.map((v, i, arr) => arr[i].inStock);
    //     let arrAllProductAttributes = allProducts.map(
    //       (v, i, arr) => arr[i].attributes
    //     );

    //     this.setState({
    //       productInStock: arrInStock,
    //       productDescription: arrAllDescriptions,
    //       productAttributes: arrAllProductAttributes,
    //       productBrands: arrAllBrands,
    //       productCategories: arrAllProductCategories,
    //       productNames: arrAllProductNames,
    //       productImgs: arrAllProductImgs,
    //       productPrices: arrAllProductPrices,
    //       // allCategoryNames: allCategories,
    //     });
    //   });

    this.refreshLS();
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
      inStock: this.state.productInStock[id],
      brand: this.state.productBrands[id],
      category: this.state.productCategories[id],
      imgs: this.state.productImgs[id],
      prices: this.state.productPrices[id],
      attributes: this.state.productAttributes[id],
      description: this.state.productDescription[id],
    };
    return product;
  };
  cartAction = (product, attr) => {
    product.amount = 1;
    product.attributesSelected = attr;
    // console.log(product, "full product action");

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
      return window.localStorage.setItem("cart", JSON.stringify([product]));
    }
  };
  refreshLS = () => {
    let CartLocalstorage = JSON.parse(window.localStorage.getItem("cart"));
    if (CartLocalstorage === null) {
      return;
    }

    let counter = 0;
    CartLocalstorage.map((v, i, arr) => {
      return (counter = counter + v.amount);
    });
    this.setState({
      cartCount: counter,
      currencyIndex: window.localStorage.getItem("currencyIndex"),
    });
  };

  render() {
    // console.log(this.state)
    // console.log(window.location.pathname, " window href"); //
    let productId = window.location.pathname.slice(10);
    return (
      <div id="page">
        <Header>
          <HeaderContainer onClick={() => this.turnOffModals()}>
            {/* mapping the category names */}
            {this.state.allCategoryNames.map((v, i, arr) => {
              let selected = false;
              if (
                this.state.allCategoryNames[i] === this.state.categorySelected
              ) {
                selected = true;
              } else {
                selected = false;
              }
              return (
                <Link key={i} to={"/"}>
                  <Nav
                    key={i}
                    selected={selected}
                    onClick={() => {
                      this.setState({
                        categorySelected: this.state.allCategoryNames[i],
                      });
                    }}
                  >
                    <CategorySelector selected={selected}>
                      {this.state.allCategoryNames[i]}
                    </CategorySelector>
                  </Nav>
                </Link>
              );
            })}
          </HeaderContainer>
          <Logo>
            <img src={"/logo transparent.png"} alt={"logo"}></img>
          </Logo>
          <ActionsMenu>
            <OpenCurrencyModal onClick={() => this.currencyModal()}>
              <p id="relative">
                {this.state.currencySymbols[this.state.currencyIndex]}
              </p>
              <img src="/caret-down.svg" alt="sign" />
            </OpenCurrencyModal>
            <OpenMiniCartModal onClick={() => this.cartModal()}>
              <img src="/Empty Cart black.svg" alt="cart" />
              <Absolute>
                <CartCounter counter={this.state.cartCount}>
                  {this.state.cartCount}
                </CartCounter>
              </Absolute>
            </OpenMiniCartModal>
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
                    window.localStorage.setItem(
                      "currencyIndex",
                      JSON.stringify(i)
                    );
                    this.refreshLS();
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
          <CartModal>
            <MiniCart
              turnOffModals={this.turnOffModals}
              refreshLS={this.refreshLS}
              cartCount={this.state.cartCount}
              currencyIndex={this.state.currencyIndex}
              currencySymbols={this.state.currencySymbols}
            ></MiniCart>
          </CartModal>
        ) : null}
        {/* opens the mini cart Modal */}
        {/* this opens the PLP */}
        {this.props.plpage ? (
          <PLP
            opaque={this.state.cartModal}
            onClick={() => this.turnOffModals()}
          >
            <CategoryName id="categoryName">
              {this.state.categorySelected.toUpperCase()}
            </CategoryName>
            <ProductGrid>
              {this.state.productNames.map((v, i, arr) => {
                // console.log(i,' index do map maluco')
                if (this.state.categorySelected !== "all") {
                  if (
                    this.state.categorySelected.toLowerCase() !==
                    this.state.productCategories[i]
                  ) {
                    return void i++;
                  }
                }
                return (
                  <Cards
                    refreshLS={this.refreshLS}
                    cartModal={this.cartModal}
                    key={i}
                    cartAction={this.cartAction}
                    turnOffModals={() => this.turnOffModals()}
                    currencyLabels={this.state.currencyLabels}
                    currencySymbols={this.state.currencySymbols}
                    opaque={this.state.cartModal}
                    currencyIndex={this.state.currencyIndex}
                    id={i}
                    productFactory={this.productFactory(i)}
                  ></Cards>
                );
              })}
              {/* <Cards categorySelected={this.state.categorySelected} productCategories={this.state.productCategories} state={this.state} productFactory={this.productFactory}></Cards> */}
            </ProductGrid>
          </PLP>
        ) : null}
        {/* opens the PDP when url changes */}
        {this.props.pdpage ? (
          <PDPage
            cartAction={this.cartAction}
            turnOffModals={() => this.turnOffModals()}
            currencyLabels={this.state.currencyLabels}
            currencySymbols={this.state.currencySymbols}
            opaque={this.state.cartModal}
            currencyIndex={this.state.currencyIndex}
            id={productId}
            productFactory={this.productFactory(productId)}
            refreshLS={this.refreshLS}
          />
        ) : null}

        {/* opens the cartPage when url changes */}
        {this.props.cartPage ? (
          <CartPage
            opaque={this.state.cartModal}
            currencyIndex={this.state.currencyIndex}
            currencySymbols={this.state.currencySymbols}
          />
        ) : null}

        <Footer>
          <p>Just A Footer Spacer For TM and links</p>
          <a href="https://www.linkedin.com/in/costa-vitor-fernandes">
            costa.vitor.fernandes
          </a>
          <p>_</p>
        </Footer>
      </div>
    );
  }
}

export default App;
