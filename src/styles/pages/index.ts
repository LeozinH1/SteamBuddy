import styled from "styled-components";

export const Wrapper = styled.div`
  height: calc(100vh - 100px);
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Start = styled.div`
  background: rgba(23, 23, 23, 0.85); // Gray 1
  width: 700px;
  border-radius: 5px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  backdrop-filter: blur(10px);

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    padding: 30px 5px;

    .continue {
      align-self: stretch !important;
    }
  }

  @keyframes startAnim {
    from {
      margin-top: -100px;
      opacity: 0;
    }
    to {
      margin-top: 0px;
      opacity: 1;
    }
  }

  animation: startAnim 0.2s linear both;

  .continue {
    align-self: flex-end;
  }

  .about {
    color: ${(props) => props.theme.colors.text1};
    border-top: 1px solid ${(props) => props.theme.colors.gray3};
    padding-top: 20px;
    margin-top: 20px;
  }
`;

export const Bubble = styled.div`
  width: 350px;
  height: 700px;
  border-radius: 50%;
  position: absolute;
  z-index: -1;
`;

export const BubbleBlue = styled(Bubble)`
  background: ${(props) => props.theme.colors.blue};
  transform: rotate(-20deg);
  bottom: -100px;
  left: -200px;
`;

export const BubbleGreen = styled(Bubble)`
  background: ${(props) => props.theme.colors.green1};
  transform: rotate(80deg);
  bottom: -450px;
  right: 0;
`;
