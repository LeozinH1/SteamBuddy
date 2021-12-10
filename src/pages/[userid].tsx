import type { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";

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

interface FriendProps {
  steamid: string;
  personaname: string;
  avatarmedium: string;
}

import { Remove, CloseIcon } from "../components/PlayerSelectedItem/style";

const Dashboard: NextPage = () => {
  const router = useRouter();

  const [userData, setUserData] = useState();

  const [friendsList, setFriendsList] = useState([]);
  const [friendsSelected, setFriendsSelected] = useState([]);

  const getUserData = async (steamid: any) => {
    let req = await fetch(`api/getUserData/${steamid}`);
    req = await req.json();
    return req;
  };

  const getUserFriends = async (steamid: any) => {
    let req = await fetch(`api/getFriendList/${steamid}`);
    req = await req.json();
    return req;
  };

  useEffect(() => {
    getUserData(router.query.userid).then((res) => {
      setUserData(res);
    });

    getUserFriends(router.query.userid).then((res) => {
      setFriendsList(res);
    });
  }, [router]);

  const addFriend = (friend) => {
    const exists = friendsSelected.find(
      (element) => element.steamid == friend.steamid
    );

    if (!exists) {
      setFriendsSelected([...friendsSelected, friend]);
      setFriendsList(
        friendsList.filter((friend2) => friend2.steamid !== friend.steamid)
      );
    }
  };

  const removeFriend = (friend) => {
    setFriendsSelected(
      friendsSelected.filter((player) => player.steamid !== friend.steamid)
    );
    setFriendsList([...friendsList, friend]);
  };

  const [search, setSearch] = useState("");

  const myfriends = useMemo(() => {
    if (!search) return friendsList;

    return friendsList.filter((el) => {
      return el.personaname.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, friendsList]);

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
                {friendsList && friendsList.length} Amigo(s)
              </h3>
              <Input
                placeholder="Player Name"
                onChange={(e) => setSearch(e.target.value)}
              />
              <List>
                {myfriends.length > 0 ? (
                  myfriends.map((friend) => (
                    <>
                      <button
                        onClick={() => addFriend(friend)}
                        style={{
                          border: "none",
                          background: "none",
                          color: "#fff",
                        }}
                      >
                        <ListItem
                          name={friend.personaname}
                          photo={friend.avatarmedium}
                          key={friend.steamid}
                        />
                      </button>
                    </>
                  ))
                ) : (
                  <span>Nenhum amigo encontrado.</span>
                )}
              </List>
            </FriendsList>
            <ContentRight>
              <FriendsSelected>
                <h3 className="title">
                  {friendsSelected?.length} Amigo(s) Selecionado(s)
                </h3>
                <div className="custom-list">
                  {friendsSelected &&
                    friendsSelected.map((friend) => (
                      <PlayerSelected
                        name={friend.personaname}
                        avatar={friend.avatarmedium}
                        key={friendsSelected.steamid}
                      >
                        <Remove onClick={() => removeFriend(friend)}>
                          <CloseIcon />
                        </Remove>
                      </PlayerSelected>
                    ))}
                </div>
              </FriendsSelected>
              <CommonGames>
                <h3 className="title">
                  <span>24</span> Jogo(s) em Comum
                </h3>
                <List></List>
              </CommonGames>
            </ContentRight>
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

export default Dashboard;
