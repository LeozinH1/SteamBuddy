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

const Dashboard: NextPage = () => {
  const router = useRouter();

  const [userData, setUserData] = useState();
  const [userFriends, setUserFriends] = useState();

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
                    <ListItem steamid={friend.steamid} key={friend.steamid} />
                  ))}
              </List>
            </FriendsList>
            <ContentRight>
              <FriendsSelected>
                <h3 className="title">13 Amigo(s) Selecionado(s)</h3>
                <div className="custom-list">
                  <PlayerSelected name="LeozinH1" />
                  <PlayerSelected name="LeozinH1" />
                  <PlayerSelected name="LeozinH1" />
                  <PlayerSelected name="LeozinH1" />
                  <PlayerSelected name="LeozinH1" />
                  <PlayerSelected name="LeozinH1" />
                  <PlayerSelected name="LeozinH1" />
                  <PlayerSelected name="LeozinH1" />
                  <PlayerSelected name="LeozinH1" />
                  <PlayerSelected name="LeozinH1" />
                  <PlayerSelected name="LeozinH1" />
                  <PlayerSelected name="LeozinH1" />
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
