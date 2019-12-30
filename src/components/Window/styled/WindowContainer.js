import styled from "styled-components";
import styledMap from "styled-map";

const WindowContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto 1fr;
  background: #ffffff;
  transform: ${props => (props.scale === 1 ? "none" : `scale(${props.scale})`)};
  transform-origin: center center;
  transition: 1s ease box-shadow, 1s ease transform;
  box-shadow: ${styledMap`
    showShadow: 0 22px 70px -22px rgba(0, 0, 0, 0.33);
    default: 0 22px 70px -22px rgba(0, 0, 0, 0);
  `};
  border-radius: 8px;
  position: absolute;
  top: 32px;
  left: 32px;
  bottom: 32px;
  right: 32px;
`;

export { WindowContainer };
