import React from "react";
import { PreloaderContainer } from "./styled/PreloaderContainer";
import { PreloaderLogo } from "./styled/PreloaderLogo";
import { PreloaderText } from "./styled/PreloaderText";

const Preloader = () => {
  return (
    <PreloaderContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PreloaderText>
        <PreloaderLogo>untitled</PreloaderLogo> is how everything starts.
      </PreloaderText>
    </PreloaderContainer>
  );
};

export { Preloader };
