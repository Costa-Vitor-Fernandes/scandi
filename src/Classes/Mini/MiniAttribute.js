import { Component } from "react";
import styled from "styled-components";
import { Attributes, AttrTitle, AttrButtonsContainer, SelectAttr, SelectColorAttr } from "../AttributesPicker";
/* {JSON.stringify(this.state.attributes)} */


const MiniAttrTitle = styled(AttrTitle)`
font-weight: 400;
font-size: 14px;
/* text-transform: uppercase; */

`


const MiniSelectColorAttr = styled(SelectColorAttr)`
width:16px;
height:16px;
padding:0 7px;
margin:0 1px;
box-shadow: none;
&:hover{
    box-shadow:none
}`

const MiniSelectAttr = styled(SelectAttr)`
width:23px;
height:23px;
padding:0 7px;
margin:0 3px;
box-shadow: none;
&{font-size:12px;}
&:hover{
    box-shadow:none;
}
`
const ButtonText = styled.p`
font-weight: 100;
font-size: 12px;
`

const MiniAttrButtonsContainer = styled(AttrButtonsContainer)`
/* padding-right:10px; */
padding: 0;
margin-left:-6px;
`


export default class MiniAttribute extends Component {
  constructor(props) {
    super(props);
    this.selectedAttr = this.selectedAttr.bind(this)
    this.state = {
      selectedAttr: this.props.selected,
      attributes: this.props.attributes,
    };
  }

  selectedAttr = (firstId, secondId) =>{
    
    if(this.state.selectedAttr[firstId] === secondId){
        return true
    }   else return false
  }

  render() {
    // console.log(this.state.attributes, " state attrs");
    if (!this.state.attributes[0]) return null; 
    return this.state.attributes.map((v, index, arr) => {
      if (v.type === "swatch")
        return (
          <Attributes key={index}>
            <MiniAttrTitle>{v.id}:</MiniAttrTitle>
            <MiniAttrButtonsContainer>

            {this.state.attributes[index].items.map((v, i, array) => {
                return <MiniSelectColorAttr key={i} selected={this.selectedAttr(arr[index].id,i)} swatch={v.value}/>;
            })}
            </MiniAttrButtonsContainer>
          </Attributes>
        );
      else
        return (
          <Attributes key={index}>
            <MiniAttrTitle>{v.id}:</MiniAttrTitle>
            <MiniAttrButtonsContainer>
            {this.state.attributes[index].items.map((v, i, array) => {
                
              return <MiniSelectAttr key={i} selected={this.selectedAttr(arr[index].id, i)}><ButtonText>{v.value}</ButtonText></MiniSelectAttr>;
            })}
            </MiniAttrButtonsContainer>
          </Attributes>
        );
    });

    // return (<div> {JSON.stringify(this.state.selectedAttr)}
    //   </div>)
  }
}
