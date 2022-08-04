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

const matchFinishService = async (id: number) => {
  const finish = await Match.update({ inProgress: false }, { where: { id } });

  return finish;
};

const matchPostService = async (match: IMatch) => {
  const home = await Team.findByPk(match.homeTeam);
  const away = await Team.findByPk(match.awayTeam);

  if (!home || !away) throw new Error('Not found');
  const postMatch = await Match.create({ ...match, inProgress: true });
  return postMatch;
};

const matchPutIdService = async (match: IMatch, id: number) => {
  const { homeTeamGoals, awayTeamGoals } = match;
  const putMatch = await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return putMatch;
};

export default {
  matchService, matchInProgressService, matchPostService, matchFinishService, matchPutIdService,
};
