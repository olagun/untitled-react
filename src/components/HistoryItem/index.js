import React, { useState } from "react";
import { Icon } from "./styled/Icon";
import { Label } from "./styled/Label";
import { JAY, CREATED_ARTBOARD, actionMap } from "../../config";
import { HistoryItemContainer } from "./styled/HistoryItemContainer";
import { Timestamp } from "./styled/Timestamp";
import { HistoryItemInner } from "./styled/HistoryItemInner";
import { B } from "./styled/B";
import { useEffectOnce } from "react-use";

const HistoryItem = ({
  person: { name, img } = JAY,
  time = 0,
  action = CREATED_ARTBOARD
}) => {
  const [relativeTime, setTime] = useState(0);

  // change time here
  useEffectOnce(() => {
    const interval = setInterval(() => {
      setTime(Date.now() - time);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
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
};

export { HistoryItem };
