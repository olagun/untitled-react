import styled from "styled-components";

const ArtboardContainer = styled.div`
  padding-top: ${({ aspectRatio }) => 100 / aspectRatio}%;
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  margin-top: ${({ offset = 0 }) => `${offset}px`};
`;

export { ArtboardContainer };
