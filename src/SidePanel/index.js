import React from "react";
import { Label } from "./styled/Label";
import { SidePanelContainer } from "./styled/SidePanelContainer";

const SidePanel = ({ title = "", children }) => (
  <SidePanelContainer>
    <Label>{title}</Label>
    {children}
  </SidePanelContainer>
);

export { SidePanel };
