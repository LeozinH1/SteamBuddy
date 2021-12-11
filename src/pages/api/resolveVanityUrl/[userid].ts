// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userid } = req.query;
  const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=4150CFD1419A127314083A7AE6571226&vanityurl=${userid}`;

  let data: any = await fetch(url);
  data = await data.json();

  res.status(200).json({ userid: data.response.steamid });
}
