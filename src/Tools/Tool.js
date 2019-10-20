import React from "react";
import { ToolButtonIcon } from "./styled/ToolButtonIcon";
import { ToolButtonText } from "./styled/ToolButtonText";
import { ToolButton } from "./styled/ToolButton";
import { capitalize } from "../util";

const Tool = ({ type }) => (
  <ToolButton>
    <ToolButtonIcon src={`${type}.svg`} />
    <ToolButtonText>{capitalize(type)}</ToolButtonText>
  </ToolButton>
);

export { Tool };
