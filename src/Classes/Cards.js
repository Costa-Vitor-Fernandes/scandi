import { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductCard = styled.div`
  /* background-color: red; */
  min-width: 27vw;
  &:hover {
    background-color: #fff;
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.4); //0.4 instead of 0.19 to better contrast
  }
`;
const ImageHolder = styled.div`
  display: flex;
  padding: 1vw 1vw 1.5vw 1vw;
  /* this is for the inStock=false props  */
  /* filter: opacity(0.9) blur(5px); */
  /* this is for the inStock=false props  */
  & #productImg {
    max-width: 25vw;
  }
`;
const ProductName = styled.h3`
  margin: 0 0.75em;
  margin-bottom: 0;
`;
const Price = styled.p`
  /* background-color: red; */
  margin: 0.5em 0.8em;
  font-size: 1em;
  padding-bottom: 2em;
`;

export default class Cards extends Component {
  render() {
    let currencyIndex = this.props.state.currencyIndex;
    const allCards = this.props.state.productNames.map((v, i, arr) => {
      // if(window.location.pathname !== "/"){
      //   let categoryNameFilter = window.location.pathname
      //      .slice(1)
      //      .toLowerCase();

      //   if(this.props.state.productCategories[i] !== categoryNameFilter){
      //     i++
      //     return <></>
      //   }
      // }
      if (this.props.state.categorySelected !== "all") {
        if (
          this.props.state.categorySelected.toLowerCase() !==
          this.props.state.productCategories[i]
        ) {
          return void i++;
        }
      }
      // const newTo = {
      //   pathname: "/products/1",
      //   param1: "Par1",
      //   state:'state newto',
      // };
      // // link to the "location"
      // // see (https://reacttraining.com/react-router/web/api/location)
      // <Link to={newTo}>
      //  </Link>

      // // In your Category Component, you can access the data like this
      // this.props.match.params.catId // this is 595212758daa6810cbba4104
      // this.props.location.param1 // this is Par1

      return (
        <ProductCard onClick={() => console.log(i, "index do produto")} key={i}>
          {/* onClick pra passar props lá na raiz */}
          <Link to={{ pathname: `/products/${i}`, state: "statefrom link" }}>
            <ImageHolder>
              <img
                id="productImg"
                src={this.props.state.productImgs[i][0]}
                alt={this.props.state.productNames[i]}
              ></img>
            </ImageHolder>
            <ProductName>{this.props.state.productNames[i]}</ProductName>
            <Price>
              {this.props.state.currencyLabels[currencyIndex]}{" "}
              {this.props.state.currencySymbols[currencyIndex]}{" "}
              {this.props.state.productPrices[i][currencyIndex].amount}
            </Price>
          </Link>
        </ProductCard>
      );
    });

    return allCards;
  }
}
