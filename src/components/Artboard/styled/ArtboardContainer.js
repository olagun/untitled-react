import styled from "styled-components";
import { motion } from "framer-motion";

const ArtboardContainer = styled(motion.div)`
  width: 100%;
  padding-top: ${({ aspectRatio }) => 100 / aspectRatio}%;
  // border: 2px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  margin-top: ${({ offset = 0 }) => `${offset}px`};
`;

export { ArtboardContainer };
