// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userid } = req.query;
  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=4150CFD1419A127314083A7AE6571226&steamid=${userid}&include_appinfo=1`;

  let data: any = await fetch(url);
  data = await data.json();

  res.status(200).json(data.response.games);
}
