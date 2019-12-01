import React from "react";
import { Label } from "./styled/Label";
import { SidePanelContainer } from "./styled/SidePanelContainer";

const SidePanel = ({ title = "", children, show = false }) => (
  <SidePanelContainer
    animate={{ opacity: show ? 1 : 0 }}
    initial={{ opacity: 0 }}
  >
    <Label>{title}</Label>
    {children}
  </SidePanelContainer>
);

export { SidePanel };
