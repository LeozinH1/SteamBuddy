// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  response: {
    players: [
      {
        steamid: string;
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
        primaryclanid: number;
        timecreated: number;
        personastateflags: number;
      }
    ];
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userid } = req.query;

  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4150CFD1419A127314083A7AE6571226&steamids=${userid}`;
  let data: any = await fetch(url);
  data = await data.json();

  res.status(200).json(data.response.players[0]);
}
