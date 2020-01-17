import styled from "styled-components";
import { motion } from "framer-motion";

/*const P = styled(motion.div)`*/
const P = styled.div`
  /*font-size: 1vw;*/
  position: relative;
  font-size: 1.1111111111vw;
  /*line-height: 24px;*/
  line-height: 1.6666666667vw;
  margin: 0;
  margin-bottom: 1.1111111111vw;
  /*max-width: 60%;*/
  max-width: ${(props) => props.maxWidth ? props.maxWidth : '33.33333333vw'};
  /*max-width: 33.3333333333vw;*/
  width: fit-content;
`;

export { P };