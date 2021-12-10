import type { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";

import { Container } from "../styles/layout";
import PlayerSelected from "../components/PlayerSelectedItem";
import ListItem from "../components/ListItem";
import Header from "../components/Header";
import Input from "../components/Input";

import { useRouter } from "next/router";

import { Wellcome } from "../styles/pages/dashboard";
import Link from "next/link";

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
      addFriend(res);
    });

    getUserFriends(router.query.userid).then((res) => {
      setFriendsList(res);
    });
  }, [router]);

  const getUserGames = async (steamid) => {
    let req = await fetch(`api/getUserGames/${steamid}`);
    req = await req.json();
    return req;
  };

  const [games, setGames] = useState([]);

  const addFriend = (friend) => {
    const exists = friendsSelected.find(
      (element) => element.steamid == friend.steamid
    );

    if (!exists) {
      setFriendsSelected([...friendsSelected, friend]);
      setFriendsList(
        friendsList.filter((friend2) => friend2.steamid !== friend.steamid)
      );

      getUserGames(friend.steamid).then((res) => {
        const teste = {
          steamid: friend.steamid,
          games: res,
        };
        setGames([...games, teste]);
      });
    }
  };

  const removeFriend = (friend) => {
    setFriendsSelected(
      friendsSelected.filter((player) => player.steamid !== friend.steamid)
    );
    setFriendsList([...friendsList, friend]);
    setGames(games.filter((el) => el.steamid !== friend.steamid));
  };

  const filterGames = useMemo(() => {
    //////////////////////////////////////////
    let allgames = games.reduce((acc, obj) => {
      acc.push(obj.games);
      return acc.flat();
    }, []);

    //////////////////////////////////////////
    const sameGames = allgames.reduce((games, game) => {
      if (
        allgames.filter((el) => game.appid == el.appid).length ==
        friendsSelected.length
      ) {
        games.push(game);
      }
      return games;
    }, []);

    //////////////////////////////////////////
    const uniqueGames = Array.from(new Set(sameGames.map((a) => a.appid))).map(
      (id) => {
        return sameGames.find((a) => a.appid === id);
      }
    );

    return uniqueGames;
  }, [games]);

  const [search, setSearch] = useState("");

  const myfriends = useMemo(() => {
    if (!search) return friendsList;

    return friendsList.filter((el) => {
      return el.personaname.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, friendsList]);

  const compare = (a, b) => {
    const player1 = a.personaname.toUpperCase();
    const player2 = b.personaname.toUpperCase();

    let comparison = 0;
    if (player1 > player2) {
      comparison = 1;
    } else if (player1 < player2) {
      comparison = -1;
    }
    return comparison;
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
                {friendsList && friendsList.length} Amigo(s)
              </h3>
              <Input
                placeholder="Player Name"
                onChange={(e) => setSearch(e.target.value)}
              />
              <List>
                {myfriends.length > 0 ? (
                  myfriends.sort(compare).map((friend) => (
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
                        {friend.steamid !== userData.steamid && (
                          <Remove onClick={() => removeFriend(friend)}>
                            <CloseIcon />
                          </Remove>
                        )}
                      </PlayerSelected>
                    ))}
                </div>
              </FriendsSelected>
              <CommonGames>
                <h3 className="title">
                  <span>{filterGames.length}</span> Jogo(s) em Comum
                </h3>
                <List>
                  {filterGames &&
                    filterGames.map((game) => (
                      <Link href={`steam://run/${game.appid}`} key={game.appid}>
                        <a>
                          <ListItem
                            name={game.name}
                            photo={`https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                          />
                        </a>
                      </Link>
                    ))}
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
