import React, { useState, useEffect } from "react";
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
import { CREATED_ARTBOARD, VECTOR, PEOPLE } from "../config";
import { useMotionValue, useAnimation } from "framer-motion";

async function moveTo(state, name, x, y) {
  return state["JAY"].control.start(person => ({
    x: 100,
    transition: { delay: 0.3 }
  }));
}

const Window = () => {
  const [cursorState, setCursorState] = useState(
    Object.entries(PEOPLE).reduce(
      (obj, [name, person]) => ({
        ...obj,
        [name]: {
          person,
          active: false,
          tool: null,
          control: useAnimation(),
          x: useMotionValue(0),
          y: useMotionValue(0)
        }
      }),
      {}
    )
  );

  useEffect(async () => {
    await moveTo(cursorState, "JAY", 200, 200);
  }, []);

  return (
    <div>
      {Object.values(cursorState).map(
        ({
          person = null,
          x = 0,
          y = 0,
          active = false,
          tool = null,
          control
        }) => (
          <Cursor
            x={x}
            y={y}
            tool={VECTOR}
            active={active}
            person={person}
            animate={control}
            custom={person}
          />
        )
      )}

      <WindowContainer>
        <Toolbar />
        <MainContainer>
          <SidePanel title="Layers">
            <LayerItem active>Untitled</LayerItem>
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
};

export { Window };
