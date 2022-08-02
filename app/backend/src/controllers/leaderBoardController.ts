import { Request, Response } from 'express';
import leaderboard from '../services/leaderBoardService';

const leaderboardHomeCont = async (req: Request, res: Response) => {
  const leaderboardHome = await leaderboard.leaderboardHomeService();
  return res.status(200).json(leaderboardHome);
  // res.status(500).json({ message: 'Internal error' });
};

export default {
  leaderboardHomeCont,
};
