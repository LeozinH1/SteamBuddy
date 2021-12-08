import React from "react";
import { Wrapper } from "./style";
import { Container } from "../../styles/layout";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <div className="logo">
          <Link href="/">
            <a>STEAMBUDDY</a>
          </Link>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Header;
