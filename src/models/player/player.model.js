module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("player", {
        name: {
            type: Sequelize.STRING
        },
        teamId: {
            type: Sequelize.INTEGER
        }
    });

    return Player;
};