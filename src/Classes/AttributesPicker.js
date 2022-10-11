import { Component } from "react";
import styled from "styled-components";

const Attributes = styled.div`
  background-color: gray;
`;
const AttrTitle = styled.div`
  display: flex;
`;
const AttrButtons = styled.div`
  display: flex;
  flex-direction: row;
`;
const SelectAttr = styled.div`
  border: 1px solid orange;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.4) // random shadow
;
`;

export default class AttributesPicker extends Component {
  render() {
    let attributes = this.props.attributes;

      return attributes.map((v, i, arr) => {
        return (
          <Attributes key={i}>
            <AttrTitle key={i}>{v.id}</AttrTitle>
            <AttrButtons>
              {v.items.map((v, i, arr) => {
                return <SelectAttr key={i}>{v.displayValue}</SelectAttr>;
              })}
            </AttrButtons>
          </Attributes>
        );
      });

  }
}
