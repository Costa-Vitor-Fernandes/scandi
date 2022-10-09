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
  /* min-height:90vh; */
`;

const SmallImages = styled.div`
  display: flex;
  border: 1px solid black;
  flex-direction: column;
  /* background-color: red; */
  max-width: 10vw;
  & img {
    height: auto;
  }
  & :hover {
    transform: scale(1.1);
  }
`;
const BigImage = styled.div`
padding: 0 2em;
  /* display: flex; */
  /* justify-content:center; */
  border: 1px solid green;
  max-width:50vw;
  & img{
    width:100%;
    height:auto;
    max-width: 50vw;
  };
`;
const TextSection = styled.section`
padding:2em;
border:1px solid red;
width:40vw;
`

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
    return (
      <MainProductPage opaque={this.props.opaque}>
                <SmallImages>
                    {product.imgs.map((v, i, arr)=>{
                        return <img key={i} src={v} onClick={()=>this.setState({photoIndex: i})}/>
                    })}
                </SmallImages>
                <BigImage>
                    <img src={product.imgs[this.state.photoIndex]} />
                </BigImage>
        <TextSection>
          <h1>{this.props.productFactory.name}</h1>
          <div dangerouslySetInnerHTML={{__html:this.props.productFactory.description}}></div>
        </TextSection>
      </MainProductPage>
    );
    }
    return <div>Loading...</div>  
}
}
