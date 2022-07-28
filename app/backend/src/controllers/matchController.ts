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
  try {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const match = await service.matchPostService(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals },
    );
    console.log(match);
    if (typeof match === 'number') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    return res.status(201).json(match);
  } catch (error) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
};

const patchMatchId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  await service.matchPutIdService({
    homeTeamGoals: parseInt(homeTeamGoals, 10),
    awayTeamGoals: parseInt(awayTeamGoals, 10),
  }, parseInt(id, 10));
  res.status(200).json({ message: 'Update ok' });
};

export default { getMatch, postMatch, patchMatch, patchMatchId };
