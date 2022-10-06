import "./App.css";
import styled from "styled-components";
import { Component } from "react";
import Cards from "./Classes/Cards";
import axios from 'axios'



const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid black;
`;

const Nav = styled.nav`
  padding: 0px 1.25em;
  font-size: 1em;
  line-height: 1.5em;
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
  margin: 0 4em;
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

const Main = styled.main`
display:flex;
flex-direction: column;
background-color: #fff;
/* background-color:  ${props => props.primary ? "white" : "palevioletred"}; */
filter : ${props => props.opaque ? "brightness(70%)" : "brightness(100%)"};
`
const CategoryName = styled.h1`
font-size: 3em;
padding-left:3em;
`

const ProductGrid = styled.div`
  display: grid;
  align-self: center;
  grid-template-columns: 30em 30em 30em;
  gap: 10px;
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
    background-color: rgb(249,249,249);
    transform: scale(1.15)
  }
`
const Modal = styled.div`
position:absolute;
align-self:flex-end;
margin: 0 5vw;
width:10em;
top:50px;
/* border:1px solid black; */
background-color: #fff;
z-index:3;

`

const CurrencyModal = styled(Modal)`
margin: 0 12vw;
padding: 0.5em 0;
width: 8em;
`

const CurrencyActionButton = styled(ActionButton)`
width:4em;
height: 1em;
margin-left: 0.5em;
`

const Footer = styled.div`
margin-top: 1.5em;
background-color:#fefece;
height:50px;
`


// const ProductCard = styled.div`
//   /* background-color: red; */
//   width: 386px;
//   height: 444px;
//   &:hover {
//     background-color: #fff;
//     box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
//   }
// `;
// const ImageHolder = styled.div`
//   display: flex;
//   padding: 1em 1em 1.5em 1em;
//   & #productImg {
//     width: 100%;
//   }
// `;
// const ProductName = styled.h3`
//   margin: 0 0.75em;
//   margin-bottom: 0;
// `;
// const Price = styled.p`
//   /* background-color: red; */
//   margin: 0.5em 0.8em;
//   font-size: 1em;
// `;

// The Button from the last section without the interpolations
// const Button = styled.button`
//   color: palevioletred;
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
// `;

// A new component based on Button, but with some override styles
// const TomatoButton = styled(Button)`
//   color: tomato;
//   border-color: tomato;
// `;

class App extends Component {
  constructor(props) {
    super(props);
    this.currencyModal = this.currencyModal.bind(this)
    this.cartModal = this.cartModal.bind(this);

    this.state = {
      productImgs: [],
      productNames: [],
      productPrices: [],
      currencySymbols:[],
      currencyLabels:[],
      categoryNames: [],
      defaultCurrencyIndex: 0,
      currencyModal: false,
      cartModal:false,
      opaque: '',
    };
  }

  componentDidMount() {
    //fetching the symbols and labels of the currencies
    axios.get('http://localhost:4000/graphql?query={currencies{symbol,label}}').then((res)=>{
      let allCurrencies = res.data.data.currencies
      let arrAllSymbols = allCurrencies.map((v,i,arr)=>{
        return arr[i].symbol
      })
      let arrAllLabels = allCurrencies.map((v,i,arr)=>{
        return arr[i].label
      })
      this.setState({currencySymbols: arrAllSymbols, currencyLabels: arrAllLabels})
    })
    //fetching product stuff
    axios.get(`http://localhost:4000/graphql?query={category{products{category,inStock,gallery,name,description,prices{amount,currency{symbol}}}}}`).then((res)=>{
    const allProducts = res.data.data.category.products

      let arrAllProductNames = allProducts.map((v,i,arr)=>arr[i].name)
      let arrAllProductPrices = allProducts.map((v,i,arr)=>arr[i].prices)
      // returning a obj for each product with {amount : x, currency: {symbol : y} }
      
      let arrAllProductImgs = allProducts.map((v,i,arr)=> arr[i].gallery)
    // returning a arr with links to the product images
      let arrAllCategories  = allProducts.map((v,i,arr)=>arr[i].category)
      let allCategories = [...new Set(arrAllCategories)] 
      

      this.setState({productNames: arrAllProductNames, productImgs: arrAllProductImgs, productPrices: arrAllProductPrices, categoryNames: allCategories})
    })
  }
  currencyModal = () =>{
    this.setState({currencyModal:!this.state.currencyModal, cartModal:false, opaque:'opaque'})
  }
  cartModal = () =>{
    this.setState({cartModal:!this.state.cartModal, currencyModal:false, opaque:'opaque'})
  }
  turnOffModals = () =>{
    this.setState({cartModal: false, currencyModal: false, opaque:''})
  }

  render() {
    return (
      <div id="page">
        <Header>
          <HeaderContainer>
            <Nav><a href="/">All</a></Nav>
            <Nav><a href="/men">MEN</a></Nav>
            <Nav><a href="/kids">KIDS</a></Nav>
          </HeaderContainer>
          <Logo></Logo>
          <ActionsMenu>
            <ActionButton onClick={()=>this.currencyModal()}>
              <img src="dollar-sign.svg" alt="dollar-sign" />
              <img src="caret-down.svg" alt="sign" />
            </ActionButton>
            <ActionButton onClick={()=>this.cartModal()}>
              <img src="cart-shopping.svg" alt="cart" />
            </ActionButton>
          </ActionsMenu>
        </Header>

          {/* opens the currency modal */}
          {this.state.currencyModal ?
           <CurrencyModal>
            {this.state.currencySymbols.map((v,i,arr)=>{
              return <CurrencyActionButton onClick={()=>{
                this.setState({defaultCurrencyIndex: i})
                this.setState({currencyModal:false})
                  }}>
                      {this.state.currencySymbols[i]}  {this.state.currencyLabels[i]}
                </CurrencyActionButton>
            })}
             {/* currency action button styled component to override */}
            </CurrencyModal> :
            null}
            {/* opens the currency modal */}
         
          {/* opens the cart Modal */}
          {this.state.cartModal ? <Modal>CartModal<div>cart stuff here</div></Modal> : null}
           {/* opens the cart Modal */}

        
        
        <Main opaque={this.state.cartModal || this.state.currencyModal} onClick={()=>this.turnOffModals()}>
          <CategoryName id="categoryName">all</CategoryName>
          <ProductGrid>
            <Cards state={this.state}></Cards>
          </ProductGrid>
        </Main>

    <Footer>
      FooterSpacer
    </Footer>
      </div>
    );
  }
}

export default App;
