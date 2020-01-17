import styled from "styled-components";

const LayerContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 4px;
  justify-content: left;

  position: relative;
  margin: 0;
  padding: 10px 28px;

  /*& + & {
    margin-top: 16px;
  }*/
  transition: background-color 0.2s ease;

  :hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  /*::before {
    content: "";
    position: absolute;
    top: -8px;
    left: -24px;
    bottom: -8px;
    right: -24px;
    transition: background-color 0.2s ease;
    background-color: rgba(0, 0, 0, 0);
  }

  :hover::before {
    background-color: rgba(0, 0, 0, 0.05);
  }

  ::after {
    content: "";
    position: absolute;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    left: -24px;
    background-color: ${({ active, color = "transparent" }) =>
      active ? color : "transparent"};
    width: 4px;
    height: 16px;
  }*/
`;

export { LayerContainer };
