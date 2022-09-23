import "./App.css";
import styled from "styled-components";
import { Component } from "react";
import Card from "./Classes/Card";

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
`;

const Main = styled.main`
  text-align: left;
  margin: 0 8em;
`;
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 25em 25em 25em;
  width: 70em;
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
`;

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

    this.state = {
      arrProductImg: ['Product%20B.svg','Product%20B.svg', 'Product%20B.svg'],
      arrProductName: ['p1','p2','p3'],
      arrProductPrice: ['$50','$60','$70'],
      categoryName: "WOMEN",
    };
  }

  componentDidMount() {
    // axios.get()
    // this.setState({});
  }

  render() {
    return (
      <div>
        <Header>
          <HeaderContainer>
            <Nav>WOMEN</Nav>
            <Nav>MEN</Nav>
            <Nav>KIDS</Nav>
          </HeaderContainer>
          <Logo></Logo>
          <ActionsMenu>
            <ActionButton>
              <img src="dollar-sign.svg" alt="dollar-sign" />
              <img src="caret-down.svg" alt="sign" />
            </ActionButton>
            <ActionButton>
              <img src="cart-shopping.svg" alt="cart" />
            </ActionButton>
          </ActionsMenu>
        </Header>
        <Main>
          <h1>{this.state.categoryName}</h1>
          <ProductGrid>
            {/* aqui eu faço a chamada pra classe que controla os cards */}
            {/* <ProductCard>
            <ImageHolder>
            <img id="productImg" src="Product%20B.svg" alt="product"></img>
            </ImageHolder>
            <ProductName>Product Name</ProductName>
            <Price>$50</Price>
          </ProductCard> */}
            <Card state={this.state}></Card>
          </ProductGrid>
        </Main>
        {/* <Button>Normal Button</Button>
    <TomatoButton>Tomato Button</TomatoButton> */}
      </div>
    );
  }
}

export default App;
