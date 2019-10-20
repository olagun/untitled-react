import React from "react";
import { ToolButtonContainer } from "./styled/ToolButtonContainer";
import { IMAGE, SHAPE, VECTOR, TEXT, PENCIL } from "../config";
import { Tool } from "./Tool";

const Tools = () => (
  <ToolButtonContainer>
    <Tool type={TEXT} />
    <Tool type={SHAPE} />
    <Tool type={IMAGE} />
    <Tool type={VECTOR} />
    <Tool type={PENCIL} />
  </ToolButtonContainer>
);

export { Tools };
