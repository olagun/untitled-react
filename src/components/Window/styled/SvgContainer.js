import styled from "styled-components";
import { motion } from "framer-motion";

const SvgContainer = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  pointer-events: none;
  transform: ${props => (props.scale === 1 ? "none" : `scale(${props.scale})`)};
  transform-origin: center center;
  transition: 1s ease box-shadow, 1s ease transform;
`;

export { SvgContainer };
