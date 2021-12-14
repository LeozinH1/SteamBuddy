// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userid } = req.query;

  // Pega a lista de amigos
  const url = `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=4150CFD1419A127314083A7AE6571226&steamid=${userid}`;
  let data: any = await fetch(url);
  data = await data.json();

  // Cria um array somente com o steamid dos amigos
  let steamids: string[] = [];
  data.friendslist.friends.map((player: any) => {
    steamids.push(player.steamid);
  });

  // Separa o array com os steamids em grupos de 100
  const separar = (itens: any, maximo: number) => {
    return itens.reduce((acumulador: any, item: any, indice: number) => {
      const grupo = Math.floor(indice / maximo);
      acumulador[grupo] = [...(acumulador[grupo] || []), item];
      return acumulador;
    }, []);
  };

  let separado = separar(steamids, 100);

  // Pega as informações completa dos amigos
  let fullinfo = [];
  for (let i = 0; i < separado.length; i++) {
    const url2 = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4150CFD1419A127314083A7AE6571226&steamids=${separado[i]}`;
    let data2: any = await fetch(url2);
    data2 = await data2.json();
    fullinfo.push(data2.response.players);
  }

  const flattened = fullinfo.flat();

  res.status(200).json(flattened);
}
