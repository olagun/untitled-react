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
  time = Date.now(),
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

  function toTime(time) {
    if (time < 1000) {
      return "Just now";
    }

    if (time < 60 * 1000) {
      return `${Math.floor((relativeTime / 1000) | 0)}s`;
    }

    if (time < 60 * 60 * 1000) {
      return `${Math.floor((relativeTime / 60 / 1000) | 0)}m`;
    }

    return `${Math.floor((relativeTime / 60 / 60 / 1000) | 0)}h`;
  }

  return (
    <HistoryItemContainer
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      positionTransition
    >
      <Icon src={img} />
      <HistoryItemInner>
        <Label>
          <B>{name}</B> {actionMap[action]}
        </Label>
        <Timestamp>{toTime(relativeTime)}</Timestamp>
      </HistoryItemInner>
    </HistoryItemContainer>
  );
};

export { HistoryItem };
