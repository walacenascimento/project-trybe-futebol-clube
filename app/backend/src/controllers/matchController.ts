import { Request, Response } from 'express';
import service from '../services/matchService';

const getMatch = async (req: Request, res: Response) => {
  const { inProgress } = req.body;
  if (inProgress) {
    const matches = await service.matchInProgressService(String(inProgress));
    return res.status(200).json(matches);
  }
  const matches = await service.matchService();
  return res.status(200).json(matches);
};

const patchMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await service.matchFinishService(parseInt(id, 10));
  return res.status(200).json({ message: 'Finished' });
};

const postMatch = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  const match = await service.matchPostService(
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals },
  );
  if (typeof match === 'string') {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  return res.status(201).json(match);
};

export default { getMatch, postMatch, patchMatch };
