import styled from "styled-components";

const WindowContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto 1fr;
  background: #ffffff;
  box-shadow: 0 22px 70px -22px rgba(0, 0, 0, 0.33);
  border-radius: 8px;
  position: absolute;
  top: 32px;
  left: 32px;
  bottom: 32px;
  right: 32px;
`;

export { WindowContainer };
