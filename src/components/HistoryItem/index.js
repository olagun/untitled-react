import React from "react";
import { Icon } from "./styled/Icon";
import { Label } from "./styled/Label";
import { JAY, CREATED_ARTBOARD, actionMap } from "../../config";
import { HistoryItemContainer } from "./styled/HistoryItemContainer";
import { Timestamp } from "./styled/Timestamp";
import { HistoryItemInner } from "./styled/HistoryItemInner";
import { B } from "./styled/B";

const HistoryItem = ({
  person: { name, img } = JAY,
  relativeTime = 0,
  action = CREATED_ARTBOARD
}) => (
  <HistoryItemContainer>
    <Icon src={img} />
    <HistoryItemInner>
      <Label>
        <B>{name}</B> {actionMap[action]}
      </Label>
      <Timestamp>
        {relativeTime <= 500
          ? "Just now"
          : relativeTime < 1000
          ? `${Math.floor(relativeTime)}ms`
          : `${Math.floor((relativeTime / 1000) | 0)}s`}
      </Timestamp>
    </HistoryItemInner>
  </HistoryItemContainer>
);

export { HistoryItem };
