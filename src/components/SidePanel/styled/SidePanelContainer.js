import styled from 'styled-components';
import { motion } from 'framer-motion';

const SidePanelContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  /*margin-top: 40px;*/
  margin-top: 36px;
  /*padding: 0 28px;*/
  padding: 0;
  overflow: hidden;

  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto 1fr;

  /*background: rgba(255, 0, 0, 0.1);*/

  ::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 10%;
    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  }
`;

export { SidePanelContainer };
