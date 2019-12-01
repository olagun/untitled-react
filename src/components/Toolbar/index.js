import React from "react";
import { TrafficLights } from "../TrafficLights";
import { Title } from "../Title";
import { ToolbarContainer } from "./styled/ToolbarContainer";

const Toolbar = ({ show }) => (
  <ToolbarContainer
    animate={{ opacity: show ? 1 : 0 }}
    initial={{ opacity: 0 }}
  >
    <TrafficLights />
    <Title />
  </ToolbarContainer>
);

export { Toolbar };
