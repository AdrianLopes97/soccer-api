module.exports = (sequelize, Sequelize) => {
  const Match = sequelize.define("match", {
    firstTeamId: {
      type: Sequelize.INTEGER
    },
    secondTeamId: {
      type: Sequelize.INTEGER
    },
    firstTeamGoals: {
      type: Sequelize.INTEGER
    },
    secondTeamGoals: {
      type: Sequelize.INTEGER
    },
  });

  return Match;
};