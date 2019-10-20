import styled from "styled-components";

const ToolButtonContainer = styled.div`
  appearance: none;
  position: absolute;
  width: 100%;
  bottom: -66px;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  grid-column-gap: 24px;

  justify-content: center;
`;

export { ToolButtonContainer };
