import React from "react";
import { Label } from "./styled/Label";
import { SidePanelContainer } from "./styled/SidePanelContainer";
import { SidePanelInner } from "./styled/SidePanelnner";

const SidePanel = ({ title = "", children, show = false }) => (
  <SidePanelContainer
    animate={{ opacity: show ? 1 : 0 }}
    initial={{ opacity: 0 }}
  >
    <Label>{title}</Label>
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}
    >
      <SidePanelInner>{children}</SidePanelInner>
    </div>
  </SidePanelContainer>
);

export { SidePanel };
