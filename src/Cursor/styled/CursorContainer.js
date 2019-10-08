import styled from "styled-components";
import { motion } from "framer-motion";
import styledMap from "styled-map";

const CursorContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.33);
  border-radius: ${styledMap`
    active: 16px 6px 6px 16px;
    default: 6px 6px 6px 6px;
  `}
  background: ${({ color = "transparent" }) => color};
`;

export { CursorContainer };