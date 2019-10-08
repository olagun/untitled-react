import styled from "styled-components";

const ArtboardContainer = styled.div`
  height: ${({ aspectRatio }) => 100 / aspectRatio}%;
  width: 100%;
  border: 4px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  align-self: center;
`;

export { ArtboardContainer };
