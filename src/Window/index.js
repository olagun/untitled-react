import React from "react";
import { WindowContainer } from "./styled/WindowContainer";
import { MainContainer } from "./styled/MainContainer";
import { Toolbar } from "../Toolbar";
import { SidePanel } from "../SidePanel";
import { Artboard } from "../Artboard";
import { LayerItem } from "../LayerItem";
import { HistoryItem } from "../HistoryItem";
import { Cursor } from "../Cursor";
import { Tools } from "../Tools";
import { MainInner } from "./styled/MainInner";
import { CREATED_ARTBOARD, VECTOR } from "../config";

const Window = () => (
  <div>
    <Cursor x={0} tool={VECTOR} active />
    <WindowContainer>
      <Toolbar />
      <MainContainer>
        <SidePanel title="Layers">
          <LayerItem>Untitled</LayerItem>
          <LayerItem>Is how everything</LayerItem>
        </SidePanel>
        <MainInner>
          <Artboard />
          <Tools />
        </MainInner>
        <SidePanel title="History">
          <HistoryItem time={0} action={CREATED_ARTBOARD}>
            created a new artboard
          </HistoryItem>
        </SidePanel>
      </MainContainer>
    </WindowContainer>
  </div>
);

export { Window };
