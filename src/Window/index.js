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
import { lerp } from "../util";

async function moveTo(state, name, targetX, targetY) {
  return new Promise(resolve => {
    let progress = 0;
    const [startX, startY] = [state[name].x.get(), state[name].y.get()];

    const tick = () => {
      progress = lerp(progress, 1, 0.1);

      state[name].x.set(lerp(startX, targetX, progress));
      state[name].y.set(lerp(startY, targetY, progress));

      if (1 - progress <= 0.01) resolve();

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

const Window = () => {
  const [layerState, setLayerState] = useState({});
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

  useEffect(() => {
    (async () => {
      await moveTo(cursorState, "JAY", 200, 200);
      await moveTo(cursorState, "JAY", 100, 200);
    })();
  }, []);

  return (
    <div>
      {Object.values(cursorState).map(
        (
          {
            person = null,
            x = 0,
            y = 0,
            active = false,
            tool = null,
            control = null
          },
          i
        ) => (
          <Cursor
            key={i}
            x={x}
            y={y}
            tool={tool}
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
