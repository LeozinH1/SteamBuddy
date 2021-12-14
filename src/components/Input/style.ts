import styled from "styled-components";

export const InputStyle = styled.input`
  width: 100%;
  border-radius: 5px;
  border: none;
  background: ${(props) => props.theme.colors.gray2};
  color: ${(props) => props.theme.colors.text};
  padding: 20px;

  &.error {
    border: 1px solid #f74141 !important;
  }
`;
