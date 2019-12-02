import styled from "styled-components";
import { motion } from "framer-motion";

const SvgContainer = styled(motion.svg)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  pointer-events: none;
`;

export { SvgContainer };
