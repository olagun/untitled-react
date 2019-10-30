import React from "react";
import { ProfileIcon } from "./styled/ProfileIcon";
import { Label } from "./styled/Label";
import { JAY } from "../config";
import { CursorContainer } from "./styled/CursorContainer";
import { ToolIcon } from "./styled/ToolIcon";

const Cursor = ({
  active = false,
  x = 0,
  y = 0,
  person: { name, color, img } = JAY,
  tool = null,
  ...props
}) => (
  <CursorContainer {...props} style={{ x, y }} color={color} active={active}>
    {tool && <ToolIcon src={`${tool}.svg`} />}
    <ProfileIcon src={img} />
    <Label>{name}</Label>
  </CursorContainer>
);

export { Cursor };
