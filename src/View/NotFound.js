import { Component } from "react";
import styled from "styled-components";
const DivFLex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #home {
    color: blue;
    text-decoration: underline;
    :hover {
      color: #002991;
      text-decoration: underline;
    }
  }
`;
export default class NotFound extends Component {
  render() {
    return (
      <DivFLex>
        <h1>404</h1>
        <p>Something went wrong!</p>
        <p>
          Go back to{" "}
          <a id="home" href="/">
            Main Page
          </a>
        </p>
      </DivFLex>
    );
  }
}
