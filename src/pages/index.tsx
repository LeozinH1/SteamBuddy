import type { NextPage } from "next";
import { useRef, useState } from "react";
import { Wrapper, Start, BubbleBlue, BubbleGreen } from "../styles/pages/index";
import Router from "next/router";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const getUserId = async (string: string) => {
    const url_array = string.split("/");

    const getProfilesId = url_array.findIndex((el) => el === "profiles") + 1;
    if (getProfilesId) return url_array[getProfilesId];

    const getCustomId = url_array.findIndex((el) => el === "id") + 1;
    if (getCustomId) {
      let profilesid: any = await fetch(
        `api/resolveVanityUrl/${url_array[getCustomId]}`
      );
      profilesid = await profilesid.json();

      return profilesid.userid;
    }

    let vanityUrl: any = await fetch(`api/resolveVanityUrl/${string}`);
    vanityUrl = await vanityUrl.json();

    if (vanityUrl.userid) return vanityUrl.userid;

    throw new Error("Usuário não encontrado");
  };

  const [notFound, setNotFound] = useState(false);

  const handleClick = async () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      getUserId(inputValue)
        .then((res) => {
          setNotFound(false);
          Router.push(`/${res}`);
        })
        .catch((err) => {
          setNotFound(true);
        });
    }
  };

  return (
    <>
      <Header />

      <Wrapper>
        <Start>
          <h2>Seu SteamID</h2>

          <Input
            ref={inputRef}
            placeholder="Ex.: https://steamcommunity.com/profiles/76561198198348157"
            className={notFound ? "error" : ""}
          />

          {notFound && <label role="alert">Usuário não encontrado.</label>}

          <Button className="continue" onClick={handleClick}>
            Continuar
          </Button>

          <p className="about">
            Preencha o campo acima com o link ou id do seu perfil steam (Ex.:
            https://steamcommunity.com/profiles/76561198198348157). Após clicar
            no botão continuar, selecione os amigos que deseja, o aplicativo irá
            listar apenas os jogos em comum das pessoas selecionadas.
          </p>
        </Start>
        <BubbleBlue />
        <BubbleGreen />
      </Wrapper>
    </>
  );
};

export default Home;
