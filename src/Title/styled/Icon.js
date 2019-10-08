import styled from "styled-components";

const Icon = styled.div`
  background-color: black;
  position: relative;
  width: 16px;
  height: 16px;

  ::after {
    content: "";
    position: absolute;
    top: 6px;
    left: 6px;
    background-color: white;
    width: 4px;
    height: 4px;
  }
`;

export { Icon };
