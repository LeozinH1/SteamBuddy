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
import Head from "next/head";

import {
  Content,
  Wrapper,
  FriendsList,
  FriendsSelected,
  CommonGames,
  ContentRight,
  List,
} from "../styles/pages/dashboard";

interface PlayerProps {
  steamid: number;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  commentpermission: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  realname: string;
  primaryclanid: number;
  timecreated: number;
  personastateflags: number;
  loccountrycode: string;
  gameextrainfo?: string;
  gameid?: number;
}

interface GamesProps {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  img_logo_url: string;
  has_community_visible_stats: boolean;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
}

interface CustomGamesProps {
  steamid: number;
  games: GamesProps[];
}

import { Remove, CloseIcon } from "../components/PlayerSelectedItem/style";

const Dashboard: NextPage = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<PlayerProps>({} as PlayerProps);

  const [search, setSearch] = useState("");

  const [friendsList, setFriendsList] = useState<PlayerProps[]>(
    [] as PlayerProps[]
  );

  const [friendsSelected, setFriendsSelected] = useState<PlayerProps[]>(
    [] as PlayerProps[]
  );

  const [games, setGames] = useState<CustomGamesProps[]>(
    [] as CustomGamesProps[]
  );

  const getUserData = async (steamid: string) => {
    let req = await fetch(`api/getUserData/${steamid}`);
    req = await req.json();
    return req;
  };

  const getUserFriends = async (steamid: string) => {
    let req = await fetch(`api/getFriendList/${steamid}`);
    req = await req.json();
    return req;
  };

  const getUserGames = async (steamid: string) => {
    let req = await fetch(`api/getUserGames/${steamid}`);
    req = await req.json();
    return req;
  };

  const addFriend = (friend: PlayerProps) => {
    const exists = friendsSelected.find(
      (element) => element.steamid == friend.steamid
    );

    if (!exists) {
      setFriendsSelected([...friendsSelected, friend]);
      setFriendsList(
        friendsList.filter((friend2: any) => friend2.steamid !== friend.steamid)
      );

      getUserGames(String(friend.steamid)).then((res: any) => {
        const teste: CustomGamesProps = {
          steamid: friend.steamid,
          games: res,
        };
        setGames([...games, teste]);
      });
    }
  };

  const removeFriend = (friend: PlayerProps) => {
    setFriendsSelected(
      friendsSelected.filter((player) => player.steamid !== friend.steamid)
    );
    setFriendsList([...friendsList, friend]);
    setGames(games.filter((el) => el.steamid !== friend.steamid));
  };

  const compare = (a: any, b: any) => {
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

  useEffect(() => {
    getUserData(String(router.query.userid)).then((res: any) => {
      setUserData(res);
      addFriend(res);
    });

    getUserFriends(String(router.query.userid)).then((res: any) => {
      setFriendsList(res);
    });
  }, [router]);

  const filterGames = useMemo(() => {
    //////////////////////////////////////////
    let allgames: GamesProps[] = games.reduce((acc: any, obj: any) => {
      acc.push(obj.games);
      return acc.flat();
    }, []);

    //////////////////////////////////////////
    const sameGames = allgames.reduce((games: any, game: any) => {
      if (
        allgames.filter((el) => game.appid == el.appid).length ==
        friendsSelected.length
      ) {
        games.push(game);
      }
      return games;
    }, []);

    //////////////////////////////////////////
    const uniqueGames = Array.from(
      new Set(sameGames.map((a: any) => a.appid))
    ).map((id) => {
      return sameGames.find((a: any) => a.appid === id);
    });

    return uniqueGames;
  }, [games]);

  const myfriends = useMemo(() => {
    if (!search) return friendsList;

    return friendsList.filter((el: any) => {
      return el.personaname.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, friendsList]);

  return (
    <>
      <Head>
        <head>Painel</head>
      </Head>
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
                        key={friend.steamid}
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
