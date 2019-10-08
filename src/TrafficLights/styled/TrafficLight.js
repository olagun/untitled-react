import styled from "styled-components";
import styledMap from "styled-map";

const TrafficLight = styled.div`
  border-radius: 50%;
  width: 12px;
  height: 12px;
  border: 1px solid transparent;
  background-color: ${styledMap`
    red: #ff6157;
    green: #2acb42;
    yellow: #ffc12f;
    default: black;
  `};
  border-color: ${styledMap`
    red: #e24640;
    green: #1bac2c;
    yellow: #dfa023;
    default: gray;
  `};
`;

export { TrafficLight };
