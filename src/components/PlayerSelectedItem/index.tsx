import React from "react";
import { Wrapper, PlayerAvatar, Remove, CloseIcon } from "./style";

interface CompProps {
  name: string;
  steamid: string;
  avatar: string;
  removeFriend: (steamid: string) => void;
}

const PlayerSelected: React.FC<CompProps> = ({
  name,
  steamid,
  avatar,
  removeFriend,
}) => {
  return (
    <Wrapper>
      <PlayerAvatar />
      {name}
      <Remove onClick={() => removeFriend(steamid)}>
        <CloseIcon />
      </Remove>
    </Wrapper>
  );
};

export default PlayerSelected;
