import styled from "styled-components";

const ToolButton = styled.button`
  height: 48px;
  padding: 0 16px;
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  display: block;

  display: flex;

  :focus {
    outline: none;
  }
`;

export { ToolButton };
