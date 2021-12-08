import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 100px;
`;

export const Wellcome = styled.div`
  padding: 20px 0;
  font-size: 2rem;

  .userName {
    color: ${(props) => props.theme.colors.green1};
    font-weight: 600;
  }
`;

export const Content = styled.div`
  display: flex;
  gap: 30px;
  align-items: stretch;

  .title {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.text1};
  }

  height: 700px;
`;

export const FriendsList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ContentRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const FriendsSelected = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .custom-list {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    flex: 1;
    overflow-y: scroll;
    align-items: flex-start;
    border: 2px dashed ${(props) => props.theme.colors.text1};
    border-radius: 5px;
    padding: 20px;
  }
`;

export const CommonGames = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;

  min-height: 0; /* Necessário para o scroll funcionar */
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: ${(props) => props.theme.colors.gray1};
  padding: 20px;
  border-radius: 5px;
  overflow-y: auto;
`;
