import Team from '../database/models/team';

const teamService = async () => {
  const teams = await Team.findAll();
  return teams;
};

const teamServiceById = async (id: number) => {
  const team = await Team.findByPk(id);
  return team;
};

export default { teamService, teamServiceById };
