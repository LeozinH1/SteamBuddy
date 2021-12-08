import type { NextPage } from "next";

import { Wrapper, Start, BubbleBlue, BubbleGreen } from "../styles/pages/index";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

import Router from "next/router";

import { useRef } from "react";

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>();
  const handleClick = () => {
    if (inputRef.current) Router.push(inputRef.current.value);
  };

  return (
    <>
      <Header />

      <Wrapper>
        <Start>
          <h2>Seu SteamID</h2>

          <Input ref={inputRef} />

          <Button className="continue" onClick={handleClick}>
            Continuar
          </Button>

          <p className="about">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum
            mi at lorem rutrum tempor. Vivamus eget porttitor leo, ut malesuada
            turpis. Duis at ullamcorper tortor. Pellentesque bibendum urna eu
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
