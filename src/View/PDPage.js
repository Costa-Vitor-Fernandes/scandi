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
      name: this.props.productFactory.name,
      description: this.props.productFactory.description,
      currencyIndex: this.props.currencyIndex,
      imgs: this.props.productFactory.imgs,
    };
  }

  componentDidMount() {
    
  }

  render() {
    console.log(this.props.productFactory);
    
    return (
      <MainProductPage opaque={this.props.opaque}>
        {/* <h1>
                PDPage {this.props.id}
                </h1> */}
        <Images>
          {this.state.imgs?this.state.imgs.map((v, i, arr) => {
            // if (i !==0)
              return (
                <img
                  onClick={() => this.setState({ photoIndex: i })}
                  src={arr[i]}
                />
              );
          }):null}
        </Images>
        <BigImage>
          <img src={this.state.imgs[this.state.photoIndex]}></img>
        </BigImage>
        <div>
          <div>{this.state.name}</div>
          <div>{this.state.description.toString()}</div>
        </div>
      </MainProductPage>
    );
  
}
}
