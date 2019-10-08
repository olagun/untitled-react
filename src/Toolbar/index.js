import React from "react";
import { TrafficLights } from "../TrafficLights";
import { Title } from "../Title";
import { ToolbarContainer } from "./styled/ToolbarContainer";

const Toolbar = () => (
  <ToolbarContainer>
    <TrafficLights />
    <Title />
  </ToolbarContainer>
);

export { Toolbar };
