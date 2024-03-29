import styled, { keyframes } from "styled-components";

const blink = keyframes`
  0% { color: rgba(0, 0, 0, 1); }
  /*50% { color: rgba(0, 0, 0, 0.5); }*/
  50% { color: rgba(0, 0, 0, 0.4); }
  100% { color: rgba(0, 0, 0, 1); }
`;

const PreloaderLogo = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  animation: ${blink} infinite 1.25s ease;
`;

export { PreloaderLogo };
