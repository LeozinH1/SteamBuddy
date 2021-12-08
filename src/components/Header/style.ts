import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.gray1};
  height: 100px;
  display: flex;
  position: relative;

  &::after {
    content: "";
    background: linear-gradient(
      to right,
      ${(props) => props.theme.colors.blue},
      ${(props) => props.theme.colors.green1},
      ${(props) => props.theme.colors.green2}
    );
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  .logo {
    font-weight: 600;
    font-size: 1.5rem;
  }
`;
