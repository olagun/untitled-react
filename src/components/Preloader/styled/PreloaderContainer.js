import styled from "styled-components";

import { motion } from "framer-motion";

const PreloaderContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  justify-content: center;
  align-items: center;
`;

export { PreloaderContainer };
