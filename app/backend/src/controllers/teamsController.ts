import { Request, Response } from 'express';
import service from '../services/teamsService';

const getTeamsCont = async (req: Request, res: Response) => {
  const teams = await service.teamService();
  return res.status(200).json(teams);
};

const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const team = await service.teamServiceById(parseInt(id, 10));
  return res.status(200).json(team);
};

export default { getTeamsCont, getTeamById };
