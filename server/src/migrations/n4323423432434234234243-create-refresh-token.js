
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('refresh_tokens', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {      
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
          value: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          ua: {
            type: Sequelize.STRING,
          },
          fingerprint:{
            type: Sequelize.STRING,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('refresh_tokens');
    },
  };
  