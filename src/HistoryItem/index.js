import React from "react";
import { Icon } from "./styled/Icon";
import { Label } from "./styled/Label";
import { JAY } from "../config";
import { HistoryItemContainer } from "./styled/HistoryItemContainer";
import { Timestamp } from "./styled/Timestamp";

const HistoryItem = ({ person: { name } = JAY, time = 0, children }) => (
  <HistoryItemContainer>
    <Icon src={`${name}.png`} />
    <div>
      <Label>
        {name}
        {children}
      </Label>
      <Timestamp>
        {time <= 0
          ? "Just now"
          : time < 1
          ? `${Math.floor(time * 100)}ms`
          : `${Math.floor(time)}s`}
      </Timestamp>
    </div>
  </HistoryItemContainer>
);

export { HistoryItem };
