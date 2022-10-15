import { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductCard = styled.div`
  /* background-color: red; */
  min-width: 27vw;
  #absolute{
    position:absolute;
    background-color: white;
    z-index: 0;
    width:25%;
    height:1px;
    transform: translateY(-13px);
  }
  &:hover {
    background-color: #fff;
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.4); //0.4 instead of 0.19 to better contrast
    #cartAction{
      z-index: 0;
      display:block;
    }
  }
`;
const ImageHolder = styled.div`
  display: flex;
  padding: 1vw 1vw 1.5vw 1vw;
  /* this is for the inStock=false props  */
  /* filter: opacity(0.9) blur(5px); */
  /* this is for the inStock=false props  */
    max-width: 25vw;
    max-height:25vw;
    min-width: 25vw;
    min-height: 25vw;
  & #productImg {
    object-fit:cover;
    object-position:center;
    max-width:25vw;

    /* object-fit:contain; */
  
  }
`;
const ProductName = styled.h3`
  margin: 1em 0.75em;
  margin-bottom: 0;
`;
const Price = styled.p`
  /* background-color: red; */
  margin: 0.5em 0.8em;
  font-size: 1em;
  padding-bottom: 2em;
`;

const MiniCartAction = styled.div`
display:none;
height:52px;
width:52px;
filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
background-color: #5ECE7B;
  border-radius: 100%;
  position:relative;
  top:-3vw;
  left:20vw;
  #whiteCart{
    position:relative;
    top:14px;
    left:12px;
  }
&:hover{
  transform:scale(1.1)
}
`

export default class Cards extends Component {

  constructor(props) {
    super(props);
    this.state = {
        attributes:[] 
        ,    
       
    }
}
componentDidMount(){
  const attrStatePrep= {};
  let product = this.props.productFactory

  product.attributes.map((v, i, arr)=>{

   return Object.defineProperty(attrStatePrep,v.id, {
    value:0,
    writable: true,
configurable: true,
enumerable: true
   })
  })
  this.setState({attributes:attrStatePrep});
  // this.props.attrGetter(attrStatePrep)
}




  render() {
    // let currencyIndex = this.props.state.currencyIndex;
      // const allCards = this.props.state.productNames.map((v, i, arr) => {
      //   //this conditional is for loading the categories
      //   if (this.props.categorySelected !== "all") {
      //     if (
      //       this.props.categorySelected.toLowerCase() !==
      //       this.props.productCategories[i]
      //     ) {
      //       return void i++;
      //     }
      //   }
      //this conditional is for loading the categories


    let product = this.props.productFactory
    console.log(this.props, 'props cards')
    
    if(!product){
      return <div>loading</div>
    }

      return (
        <ProductCard>
          <Link to={{ pathname: `/products/${this.props.id}`}}>
            <ImageHolder>
              <img
                id="productImg"
                src={product.imgs[0]}
                alt={product.name}
              ></img>
            </ImageHolder>
          </Link>
          <div id='absolute'>

            <MiniCartAction id='cartAction' onClick={()=>
              {
                this.props.cartAction(product, this.state.attributes)
              }}>
                <img id='whiteCart' src={'/Empty Cart.svg'} alt={'emptyCart'}></img>
            </MiniCartAction>
            </div>
            <Link to={{ pathname: `/products/${this.props.id}`}}>

            <ProductName>{product.brand}{' '}{product.name}</ProductName>
            <Price>
              {this.props.currencySymbols[this.props.currencyIndex]}{" "}
              {product.prices[this.props.currencyIndex].amount}
            </Price>
              </Link>
        </ProductCard>
      );
    };

}
