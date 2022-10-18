import { Component } from "react";
import styled from "styled-components";

export const Attributes = styled.div`
  /* background-color: gray; */
  padding:3px 0;
`;
export const AttrTitle = styled.div`
  display: flex;
  padding:  5px 0;
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
`;
export const AttrButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const SelectAttr = styled.div`
font-family: 'Roboto Condensed';
font-style: normal;
font-weight: 700;
font-size: 18px;
  display:flex;
  width:40px;
  height:40px;
  justify-content: center;
  align-items: center;
  padding:5px 15px;
  color: ${(props)=> (props.selected ? 'white' : 'black')};
  background-color: ${(props)=> (props.selected ? 'black' : 'white')};
  border: ${(props)=> (props.selected ? '1px solid white' : '1px solid white')};
  outline: ${(props)=> (props.selected ? '2px solid black' : '2px solid white')};
  margin: 0 3px;
  border:1px solid #eee;
  box-shadow: 0px -2px 10px rgba(168, 172, 176, 0.4);
  :hover{
    box-shadow: 0px -2px 50px rgba(168, 172, 176, 0.4) // random shadow
  };
  
`;
export const SelectColorAttr = styled.div`
  width:20px;
  height:20px;
  padding:2px;
  margin: 0 3px;
  border:1px solid #eee;
  box-shadow: 0px -2px 10px rgba(168, 172, 176, 0.4);
  :hover{
    box-shadow: 0px -2px 50px rgba(168, 172, 176, 0.4) // random shadow
  };
  background-color: ${(props) => (props.swatch ? props.swatch : "white")};
  outline: ${(props)=> (props.selected ? '1px solid  green' : '1px solid white' )};
`

export default class AttributesPicker extends Component {

    constructor(props) {
        super(props);
        this.attrAction = this.attrAction.bind(this);
        this.selectedProps = this.selectedProps.bind(this);
        this.state = {
            attributes: {
            },    
           
        }
    }
    componentDidMount(){
      const attrStatePrep= {};
      // console.log(this.props.attributes,' componentDidMount');
      this.props.attributes.map((v, i, arr)=>{
       return Object.defineProperty(attrStatePrep,v.id, {
        value:0,
        writable: true,
  configurable: true,
  enumerable: true
       })
      })
      this.setState({attributes:attrStatePrep});
      this.props.attrGetter(attrStatePrep)

    }

    attrAction = (firstId, secondId) => {
      let attrs = this.state.attributes
      attrs[firstId] = secondId
      this.setState({attributes:attrs});
      this.props.attrGetter(this.state.attributes)
    }
    selectedProps = (firstId,secondId) =>{
      
      if(this.state.attributes[firstId] === secondId){
        return true
      }else
      return false
    }

  render() {

    let attributes = this.props.attributes;
      return attributes.map((e, index, arr) => {
        return (
          <Attributes key={index}>
            <AttrTitle key={index}>{e.id.toUpperCase()}:</AttrTitle>
            <AttrButtonsContainer>
              {e.items.map((v, i, arr) => {

                // conditional for colored options 
                if(e.type ==='swatch'){
                  return  <SelectColorAttr selected={this.selectedProps(e.id,i)} key={i} swatch={v.value} onClick={()=>{
                    // console.log(index, 'index',i, e.id, v.displayValue)
                    this.attrAction(e.id, i)
                  }}></SelectColorAttr>}
                // conditional for colored options
                return <SelectAttr selected={this.selectedProps(e.id,i)} key={i} onClick={()=>{
                  this.attrAction(e.id, i)
                }
                }>{v.value}</SelectAttr>;
              })}
            </AttrButtonsContainer>
          </Attributes>
        );
      });

  }
}
