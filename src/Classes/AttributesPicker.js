import { Component } from "react";
import styled from "styled-components";

const Attributes = styled.div`
  /* background-color: gray; */
`;
const AttrTitle = styled.div`
  display: flex;
  font-size:1.4em;
`;
const AttrButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const SelectAttr = styled.div`
  border: ${(props)=> (props.selected ? '1px solid orange' : 'none' )};
  padding:20px;
  background-color: ${(props) => (props.swatch ? props.swatch : "white")};
  :hover{
    box-shadow: 0px 4px 1px rgba(168, 172, 176, 0.4) // random shadow
  };
`;

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
       return Object.defineProperty(attrStatePrep,i, {
        value:0,
        writable:true,
       })
      })
      this.setState({attributes:attrStatePrep});
    }

    attrAction = (firstId, secondId) => {
      let attrs = this.state.attributes
      attrs[firstId] = secondId
      this.setState({attributes:attrs});
      this.props.attrGetter(this.state.attributes)
    }
    selectedProps = (firstId,secondId) =>{
      // console.log(this.state.attributes[firstId], secondId, 'wtf')
      if(this.state.attributes[firstId] === secondId){
        // console.log(this.state.attributes[firstId], secondId, 'works now')
        return true
      }else
      return false
    }



  render() {
    
    let attributes = this.props.attributes;

    
    // console.log(this.state,'state')
   
    

      return attributes.map((e, index, arr) => {
       
        // console.log(arr[index].id) // keys of the object
        
        return (
          <Attributes key={index}>
            <AttrTitle key={index}>{e.id}</AttrTitle>
            <AttrButtonsContainer>
              {e.items.map((v, i, arr) => {
                // conditional for colored options 
                if(e.type ==='swatch'){
                  return  <SelectAttr selected={this.selectedProps(index,i)} key={i} swatch={v.value} onClick={()=>{
                    console.log(index, 'index',i, e.id, v.displayValue)
                    this.attrAction(index, i)
                  }}></SelectAttr>
                }
                // conditional for colored options


                  return <SelectAttr selected={this.selectedProps(index,i)} key={i} onClick={()=>{
                    // console.log(index, 'index',i, e.id, v.displayValue)
                    this.attrAction(index, i)
                    //values of the object
                    // this.setState({attributes: {attrIndex: index, attrIndexSelected:i , description: `${e.id} ${v.displayValue}`}})
                }
                }>{v.displayValue}</SelectAttr>;
              })}
            </AttrButtonsContainer>
          </Attributes>
        );
      });

  }
}
