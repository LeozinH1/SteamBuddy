import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.gray2};
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.gray3};
  }
`;

export const PlayerPhoto = styled.div`
  width: 70px;
  height: 70px;
  background: ${(props) => props.theme.colors.gray3};
  border-radius: 50%;
  position: relative;
  overflow: hidden;
`;
