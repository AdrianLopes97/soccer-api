module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define("team", {
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Team;
  };