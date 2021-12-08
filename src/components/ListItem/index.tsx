import React, { useState, useEffect } from "react";
import { Wrapper, PlayerPhoto } from "./style";
import Image from "next/image";

interface CompProps {
  name?: string;
  steamid?: string;
}
const ListItem: React.FC<CompProps> = ({ name, steamid }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getUserData = async () => {
      let req = await fetch(`api/getUserData/${steamid}`);
      req = await req.json();
      setUserData(req);
    };

    getUserData();
  }, [steamid]);

  return (
    <Wrapper>
      <PlayerPhoto>
        {userData && (
          <Image
            src={userData?.avatarmedium}
            layout="fill"
            objectFit="cover"
            alt="User Avatar"
          />
        )}
      </PlayerPhoto>
      {userData?.personaname}
    </Wrapper>
  );
};

export default ListItem;
