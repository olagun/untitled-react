import { Cursor } from "../Cursor";
import React from "react";

const CursorContainer = ({ cursors = [] }) => (
  <div>
    {cursors.map(
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
  </div>
);

export { CursorContainer };
