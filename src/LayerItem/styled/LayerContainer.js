import styled from "styled-components";

const LayerContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 4px;
  justify-content: left;
  position: relative;

  & + & {
    margin-top: 16px;
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
  }
`;

export { LayerContainer };
