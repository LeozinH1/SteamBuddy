import React from "react";
import { Wrapper, PlayerAvatar } from "./style";
import Image from "next/image";

interface CompProps {
  name: string;
  avatar: string;
}

const PlayerSelected: React.FC<CompProps> = ({ children, name, avatar }) => {
  return (
    <Wrapper>
      <PlayerAvatar>
        {avatar && (
          <Image
            src={avatar}
            layout="fill"
            objectFit="cover"
            alt="User Avatar"
          />
        )}
      </PlayerAvatar>
      {name}

      {children}
    </Wrapper>
  );
};

export default PlayerSelected;
