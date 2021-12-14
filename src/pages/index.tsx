import type { NextPage } from "next";

import { Wrapper, Start, BubbleBlue, BubbleGreen } from "../styles/pages/index";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

import Router from "next/router";

import { useRef } from "react";

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

    return string;
  };

  const handleClick = async () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      getUserId(inputValue).then((res) => {
        Router.push(`/${res}`);
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
            placeholder="https://steamcommunity.com/id/your_id"
          />

          <Button className="continue" onClick={handleClick}>
            Continuar
          </Button>

          <p className="about">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum
            mi at lorem rutrum tempor. Vivamus eget porttitor leo, ut malesuada
            turpis. Duis at ullamcorper tortor. PSellentesque bibendum urna eu
            rhoncus dictum.
          </p>
        </Start>
        <BubbleBlue />
        <BubbleGreen />
      </Wrapper>
    </>
  );
};

export default Home;
