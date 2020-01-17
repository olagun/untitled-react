import styled from "styled-components";
import { motion } from "framer-motion";

const HistoryItemContainer = styled(motion.div)`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 8px;
  padding: 0 28px;
  margin-top: 10px;

  & + & {
    margin-top: 20px;
  }
`;

export { HistoryItemContainer };
