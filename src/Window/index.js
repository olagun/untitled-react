import React from "react";
import { WindowContainer } from "./styled/WindowContainer";
import { MainContainer } from "./styled/MainContainer";
import { Toolbar } from "../Toolbar";
import { SidePanel } from "../SidePanel";
import { Artboard } from "../Artboard";
import { LayerItem } from "../LayerItem";
import { HistoryItem } from "../HistoryItem";
import { Cursor } from "../Cursor";

const Window = () => (
  <WindowContainer>
    <Cursor x={100} />
    <Toolbar />
    <MainContainer>
      <SidePanel title="Layers">
        <LayerItem>Untitled</LayerItem>
        <LayerItem>Is how everything</LayerItem>
      </SidePanel>
      <Artboard />
      <SidePanel title="History">
        <HistoryItem time={0}>Test</HistoryItem>
      </SidePanel>
    </MainContainer>
  </WindowContainer>
);

export { Window };
