import styled from "styled-components";

const HistoryItemContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 4px;

  & + & {
    margin-top: 16px;
  }
`;

export { HistoryItemContainer };
