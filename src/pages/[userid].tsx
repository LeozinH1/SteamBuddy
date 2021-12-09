import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { Container } from "../styles/layout";
import PlayerSelected from "../components/PlayerSelectedItem";
import ListItem from "../components/ListItem";
import Header from "../components/Header";
import Input from "../components/Input";

import { useRouter } from "next/router";

import { Wellcome } from "../styles/pages/dashboard";

import {
  Content,
  Wrapper,
  FriendsList,
  FriendsSelected,
  CommonGames,
  ContentRight,
  List,
} from "../styles/pages/dashboard";

interface FriendsSelectedProps {
  steamid: string;
  name: string;
  avatar: string;
}

const Dashboard: NextPage = () => {
  const router = useRouter();

  const [userData, setUserData] = useState();

  const [userFriends, setUserFriends] = useState([]);
  const [friendsSelected, setFriendsSelected] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      let req = await fetch(`api/getUserData/${router.query.userid}`);
      req = await req.json();
      setUserData(req);
    };

    const getUserFriends = async () => {
      let req = await fetch(`api/getFriendList/${router.query.userid}`);
      req = await req.json();

      setUserFriends(req);
    };

    getUserData();
    getUserFriends();
  }, [router]);

  const addFriend = (steamid) => {
    setFriendsSelected([...friendsSelected, steamid]);
    setUserFriends(userFriends.filter((item) => item.steamid !== steamid));
  };

  const removeFriend = (steamid) => {
    setUserFriends([...userFriends, steamid]);
    setFriendsSelected(
      friendsSelected.filter((item) => item.steamid !== steamid)
    );
  };

  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <Wellcome>
            Olá <span className="userName">{userData?.personaname}</span>
          </Wellcome>
          <Content>
            <FriendsList>
              <h3 className="title">
                {userFriends && userFriends.length} Amigo(s)
              </h3>
              <Input placeholder="Player Name" />
              <List>
                {userFriends &&
                  userFriends.map((friend) => (
                    <>
                      <ListItem steamid={friend.steamid} key={friend.steamid} />
                      <button onClick={() => addFriend(friend.steamid)}>
                        ADD
                      </button>
                    </>
                  ))}
              </List>
            </FriendsList>
            <ContentRight>
              <FriendsSelected>
                <h3 className="title">
                  {friendsSelected?.length || 0} Amigo(s) Selecionado(s)
                </h3>
                <div className="custom-list">
                  {friendsSelected &&
                    friendsSelected.map((friend) => (
                      <PlayerSelected
                        name={friend.name}
                        avatar={"nulkl"}
                        steamid={friend.steamid}
                        key={friend.steamid}
                        removeFriend={removeFriend}
                      />
                    ))}
                </div>
              </FriendsSelected>
              <CommonGames>
                <h3 className="title">
                  <span>24</span> Jogo(s) em Comum
                </h3>
                <List>
                  <ListItem name="Counter Strike:Global Offensive" />
                  <ListItem name="Counter Strike:Global Offensive" />
                  <ListItem name="Counter Strike:Global Offensive" />
                  <ListItem name="Counter Strike:Global Offensive" />
                  <ListItem name="Counter Strike:Global Offensive" />
                  <ListItem name="Counter Strike:Global Offensive" />
                  <ListItem name="Counter Strike:Global Offensive" />
                  <ListItem name="Counter Strike:Global Offensive" />
                  <ListItem name="Counter Strike:Global Offensive" />
                </List>
              </CommonGames>
            </ContentRight>
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

export default Dashboard;
