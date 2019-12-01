import React from "react";

import { Extension } from "./styled/Extension";
import { Icon } from "./styled/Icon";
import { TitleContainer } from "./styled/TitleContainer";

const Title = () => (
  <TitleContainer>
    <Icon />
    <span>
      untitled<Extension>.people</Extension>
    </span>
  </TitleContainer>
);

export { Title };
