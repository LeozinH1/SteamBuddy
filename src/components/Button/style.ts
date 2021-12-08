import styled from "styled-components";

export const ButtonStyle = styled.button`
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1.2rem;
  background: linear-gradient(
    to right,
    ${(props) => props.theme.colors.blue},
    ${(props) => props.theme.colors.green1},
    ${(props) => props.theme.colors.green2}
  );
  color: ${(props) => props.theme.colors.text};
`;
