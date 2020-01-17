import styled from 'styled-components';
import { motion } from 'framer-motion';

const ArtboardContainer = styled(motion.div)`
  width: 100%;
  /*padding-top: ${({ aspectRatio }) => 100 / aspectRatio}%;*/
  /*padding-top: calc(100vh - 40px);*/
  /*padding-top: calc(100vh - 200px);*/
  padding-top: ${({ height }) => height - 168}px;
  // border: 2px solid rgba(0, 0, 0, 0.15);
  /*border-radius: 6px;*/
  border-radius: 0.5555555556vw;
  margin-top: ${({ offset = 0 }) => `${offset}px`};
`;

export { ArtboardContainer };
