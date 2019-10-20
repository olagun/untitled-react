import React from "react";
import { ArtboardContainer } from "./styled/ArtboardContainer";
import { useWindowSize } from "react-use";

const Artboard = ({ children }) => {
  const { width, height } = useWindowSize();

  return (
    <ArtboardContainer aspectRatio={width / height} offset={-48}>
      {children}
    </ArtboardContainer>
  );
};
export { Artboard };
