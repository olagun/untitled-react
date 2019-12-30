import styled from "styled-components";
import { motion } from "framer-motion";
import styledMap from "styled-map";

const CursorContainer = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  z-index: 999;
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.33);
  background: ${({ color = "transparent" }) => color};
  transition: border-radius 250ms ease-in-out;
  border-radius: 6px;
`;

export { CursorContainer };
