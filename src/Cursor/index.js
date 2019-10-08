import React from "react";
import { Icon } from "./styled/Icon";
import { Label } from "./styled/Label";
import { JAY } from "../config";
import { CursorContainer } from "./styled/CursorContainer";

const Cursor = ({
  active = false,
  x = 0,
  y = 0,
  person: { name, color } = JAY
}) => (
  <CursorContainer style={{ x, y }} color={color} active={active}>
    <Icon src={name} />
    <Label>{name}</Label>
  </CursorContainer>
);

export { Cursor };
