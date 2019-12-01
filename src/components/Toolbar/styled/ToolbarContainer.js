import styled from "styled-components";
import { motion } from "framer-motion";

const ToolbarContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 16px;
`;

export { ToolbarContainer };
