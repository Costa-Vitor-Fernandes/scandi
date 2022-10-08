import { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const MainProductPage = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #fff;
  filter: ${(props) => (props.opaque ? "brightness(80%)" : "brightness(100%)")};
  height: 90vh;
`;

const Images = styled.div`
  display: flex;
  border: 1px solid black;
  flex-direction: column;
  background-color: red;
  max-width: 10vw;
  margin: 5px 0px;
  & img {
    /* max-width: 40vw; */
    height: 100px;
  }
  & :hover {
    transform: scale(1.1);
  }
`;
const BigImage = styled.div`
  display: flex;
  width: 40%;
  background-color: green;
`;

export default class PDPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      name: '',
      description:'', 
      currencyIndex: '',
      imgs: '',
    };
  }

  componentDidMount() {
    let product = this.props.productFactory
    this.setState({
      name: product.name,
      description: product.description,
      currencyIndex: this.props.currencyIndex,
      imgs:product.imgs,
    })
  }

  render() {
    let product = this.props.productFactory
    if(product.name){
        console.log(product.name,'name is valid')
    return (
      <MainProductPage opaque={this.props.opaque}>
                <Images>
                    {product.imgs.map((v, i, arr)=>{
                        return <img key={i} src={v} onClick={()=>this.setState({photoIndex: i})}/>
                    })}
                </Images>
                <BigImage>
                    <img src={product.imgs[this.state.photoIndex]} />
                </BigImage>
        <div>
          <h1>{this.props.productFactory.name}</h1>
          <div dangerouslySetInnerHTML={{__html:this.props.productFactory.description}}></div>
        </div>
      </MainProductPage>
    );
    }
    return <div>Loading...</div>
  
}
}
