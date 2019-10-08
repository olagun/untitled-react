import React from "react";
import { Icon } from "./styled/Icon";
import { Label } from "./styled/Label";
import { IMAGE, JAY } from "../config";
import { LayerContainer } from "./styled/LayerContainer";

const LayerItem = ({
  active = false,
  person: { color } = JAY,
  type = IMAGE,
  children
}) => (
  <LayerContainer color={color} active={active}>
    <Icon src={`${type}.svg`} />
    <Label>{children}</Label>
  </LayerContainer>
);

export { LayerItem };
