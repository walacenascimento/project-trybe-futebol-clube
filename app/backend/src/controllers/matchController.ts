import { Request, Response } from 'express';
import service from '../services/matchService';

const getMatchCont = async (req: Request, res: Response) => {
  const { inProgress } = req.body;
  if (inProgress) {
    const matches = await service.matchInProgressService(String(inProgress));
    return res.status(200).json(matches);
  }
  const matches = await service.matchService();
  return res.status(200).json(matches);
};

export default { getMatchCont };
