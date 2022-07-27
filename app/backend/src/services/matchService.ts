import Match from '../database/models/match';
import Team from '../database/models/team';
import IMatch from '../interfaces/IMatch';

const matchService = async () => {
  const matches = await Match.findAll({ include: [
    { model: Team, as: 'teamHome', attributes: ['teamName'] },
    { model: Team, as: 'teamAway', attributes: ['teamName'] },
  ],
  });
  return matches;
};

const matchInProgressService = async (inProgress: string) => {
  if (inProgress === 'true') {
    const matches = await Match.findAll({ where: { inProgress: true },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }
  const matches = await Match.findAll({ where: { inProgress: false },
    include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
  });
  return matches;
};

const postMatchService = async (match: IMatch) => {
  const home = await Team.findByPk(match.homeTeam);
  const away = await Team.findByPk(match.awayTeam);

  if (!home || !away) throw new Error('Not found');
  const postMatch = await Match.create({ ...match, inProgress: true });
  return postMatch;
};

export default { matchService, matchInProgressService, postMatchService };
