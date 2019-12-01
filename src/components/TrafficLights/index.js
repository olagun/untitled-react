import React from "react";
import { TrafficLight } from "./styled/TrafficLight";
import { TrafficLightContainer } from "./styled/TrafficLightContainer";

const TrafficLights = () => (
  <TrafficLightContainer>
    <TrafficLight red />
    <TrafficLight yellow />
    <TrafficLight green />
  </TrafficLightContainer>
);

export { TrafficLights };
