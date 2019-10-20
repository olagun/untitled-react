import React from "react";
import { Icon } from "./styled/Icon";
import { Label } from "./styled/Label";
import { JAY } from "../config";
import { HistoryItemContainer } from "./styled/HistoryItemContainer";
import { Timestamp } from "./styled/Timestamp";
import { HistoryItemInner } from "./styled/HistoryItemInner";
import { B } from "./styled/B";

const HistoryItem = ({ person: { name, img } = JAY, time = 0, children }) => (
  <HistoryItemContainer>
    <Icon src={img} />
    <HistoryItemInner>
      <Label>
        <B>{name}</B> {children}
      </Label>
      <Timestamp>
        {time <= 0
          ? "Just now"
          : time < 1
          ? `${Math.floor(time * 100)}ms`
          : `${Math.floor(time)}s`}
      </Timestamp>
    </HistoryItemInner>
  </HistoryItemContainer>
);


export { HistoryItem };
