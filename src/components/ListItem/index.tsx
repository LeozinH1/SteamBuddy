import React from "react";
import { Wrapper, PlayerPhoto } from "./style";
import Image from "next/image";

interface CompProps {
  photo: string;
  name: string;
}
const ListItem: React.FC<CompProps> = ({ photo, name }) => {
  return (
    <Wrapper>
      <PlayerPhoto>
        <Image src={photo} layout="fill" objectFit="cover" alt="User Avatar" />
      </PlayerPhoto>
      {name}
    </Wrapper>
  );
};

export default ListItem;
