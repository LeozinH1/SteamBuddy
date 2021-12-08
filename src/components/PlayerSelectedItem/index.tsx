import React from "react";
import { Wrapper, PlayerAvatar, Remove, CloseIcon } from "./style";

interface CompProps {
  name: string;
}

const PlayerSelected: React.FC<CompProps> = ({ name }) => {
  return (
    <Wrapper>
      <PlayerAvatar />
      {name}
      <Remove>
        <CloseIcon />
      </Remove>
    </Wrapper>
  );
};

export default PlayerSelected;
