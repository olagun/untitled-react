import styled from "styled-components";
import { motion } from "framer-motion";

const HistoryItemContainer = styled(motion.div)`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 4px;

  & + & {
    margin-top: 16px;
  }
`;

export { HistoryItemContainer };
