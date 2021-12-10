import styled from "styled-components";
import { Close } from "styled-icons/material";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.gray1};
  padding: 10px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PlayerAvatar = styled.div`
  width: 50px;
  height: 50px;
  background: ${(props) => props.theme.colors.gray2};
  border-radius: 50%;
  position: relative;
  overflow: hidden;
`;

export const Remove = styled.button`
  background: none;
  border: none;
  transition: 0.2s;
  color: ${(props) => props.theme.colors.green1};

  &:hover {
    color: ${(props) => props.theme.colors.green2};
  }
`;

export const CloseIcon = styled(Close)`
  width: 20px;
  height: 20px;
`;
