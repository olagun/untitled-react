import styled from 'styled-components';
import styledMap from 'styled-map';

const WindowContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto 1fr;
  background: #ffffff;
  transform: ${props => (props.scale === 1 ? 'none' : `scale(${props.scale})`)};
  transform-origin: center center;
  transition: 1s ease box-shadow, 1s ease transform;
  box-shadow: ${styledMap`
    showShadow: 0 22px 70px -22px rgba(0, 0, 0, 0.33);
    default: 0 22px 70px -22px rgba(0, 0, 0, 0);
  `};
  border-radius: 8px;

  /*top: 32px;
  left: 32px;
  bottom: 32px;
  right: 32px;*/
  /*width: calc(100vw - 144px);*/
  /*height: calc(100vh - 144px);*/
  /*top: 72px;*/
  /*right: 72px;*/
  /*bottom: 72px;*/
  /*left: 72px;*/

  /*border: 4px solid blue;*/

  /* DESKTOP ONLY FOR NOW */
  position: absolute;
  top: calc((100vh - (100vw - 144px) * 0.5138888889) / 2);
  left: 72px;

  width: calc(100vw - 144px);
  height: calc((100vw - 144px) * 0.5138888889);

  @media (min-width: 1440px) {
    width: calc(100vw - 10vw);
    height: calc((100vw - 10vw) * 0.5138888889);
    top: calc((100vh - (100vw - 10vw) * 0.5138888889) / 2);
    left: 5vw;
  }

  @media (max-width: 1024px) and (orientation: portrait) {
    /*width: calc(100vw - 10vw);*/
    width: calc((100vh - 10vh) * 0.5625);
    height: calc(100vh - 10vh);
    /*height: calc((100vh - 10vh) * 0.5138888889);*/
    top: 5vh;
    left: calc((100vw - (100vh - 10vh) * 0.5625) / 2);
    border: 4px solid red !important;
  }

  /*position: absolute;
  top: calc((100vmax - (100vmin - 144px) * 0.5138888889) / 2);
  left: 72px;

  width: calc(100vmin - 144px);
  height: calc((100vmin - 144px) * 0.5138888889);

  @media (min-width: 1440px) {
    width: calc(100vmin - 10vmin);
    height: calc((100vmin - 10vmin) * 0.5138888889);
    top: calc((100vmax - (100vmin - 10vmin) * 0.5138888889) / 2);
    left: 5vmin;
  }*/
`;

export { WindowContainer };
