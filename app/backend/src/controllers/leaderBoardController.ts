import { Request, Response } from 'express';
import leaderboard from '../services/leaderBoardService';

const leaderboardHomeCont = async (req: Request, res: Response) => {
  try {
    const leaderboardHome = await leaderboard.leaderboardHomeService();
    return res.status(200).json(leaderboardHome);
  } catch (error) {
    res.status(500).json({ message: 'Internal error' });
  }
};

const leaderboardAwayCont = async (req: Request, res: Response) => {
  try {
    const leaderboardAway = await leaderboard.leaderboardAwayService();
    return res.status(200).json(leaderboardAway);
  } catch (error) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

export default {
  leaderboardHomeCont, leaderboardAwayCont,
};
