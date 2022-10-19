import { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductCard = styled.div`
  /* background-color: red; */
  min-width: 27vw;
  &:hover {
    background-color: #fff;
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.4); //0.4 instead of 0.19 to better contrast
    #cartAction{
      /* display:block; */
      display:${(props)=> (props.inStock ?  'block': 'none')};
    }
  }
`;

const Absolute = styled.div`
position:absolute;
    /* background-color: white; */
    z-index: 0;
    width:25%;
    height:1px;
    transform: translateY(-13px);
`


const ImageHolder = styled.div`
  display: flex;
  padding: 1vw 1vw 1.5vw 1vw;
  /* this is for the inStock=false props  */
  /* filter: opacity(0.9) blur(5px); */
  filter: ${(props) => (props.inStock ?  "brightness(100%)" : 'opacity(0.9) blur(5px)')};
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
const OutOfStock = styled.div`
display:${(props)=> (props.inStock ? 'none' : 'block')};

& h1{
  font-family:"Raleway";
font-weight: 400;
font-size: 24px;
  color:gray;
  position:relative;
  padding:0;
  margin:0;
  top:-15vw;
  text-align:center;
  padding-left:15px

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

    let product = this.props.productFactory
    // console.log(this.props, 'props cards')
    
    if(!product){
      return <div>loading</div>
    }

      return (
        <ProductCard inStock={product.inStock} onClick={()=>window.scrollTo(0,0)}>
          <Link to={{ pathname: `/products/${this.props.id}`}}>
            <ImageHolder inStock={product.inStock}>
              <img
                id="productImg"
                src={product.imgs[0]}
                alt={product.name}
                ></img>
            </ImageHolder>
                
          </Link>
          <Absolute id='absolute'>
            
            <MiniCartAction id='cartAction' onClick={()=>
              {
                this.props.cartAction(product, this.state.attributes)
                this.props.refreshLS()
              }}>
                <img id='whiteCart' src={'/Empty Cart.svg'} alt={'Cart Icon'}></img>
            </MiniCartAction>
            <OutOfStock id='outOfStock' inStock={product.inStock}><h1>OUT OF STOCK</h1></OutOfStock>
            </Absolute>
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
