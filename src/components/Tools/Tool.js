import React from "react";
import { ToolButtonIcon } from "./styled/ToolButtonIcon";
import { ToolButtonText } from "./styled/ToolButtonText";
import { ToolButton } from "./styled/ToolButton";
import { capitalize } from "../../util";

const Tool = ({ type, innerRef, control, transition }) => (
  <ToolButton
    ref={innerRef}
    animate={control}
    transition={transition ? transition : { ease: "linear", duration: 0.2 }}
    whileHover={{
      backgroundColor: "rgba(0, 0, 0, 0.07)",
      cursor: "pointer"
    }}
  >
    <ToolButtonIcon src={`${type}.svg`} />
    <ToolButtonText>{capitalize(type)}</ToolButtonText>
  </ToolButton>
);

export { Tool };
