import styled from "styled-components";
import { motion } from "framer-motion";

const ArtboardInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 64px;
  opacity: ${props => (props.show ? 1 : 0)};
`;

export { ArtboardInner };
