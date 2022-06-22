
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ratings', {
      offerId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'offers',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      mark: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
    }).then(() => queryInterface.addConstraint('ratings',  {
      type: 'check',
      fields: ['mark'],
      where: {
      mark: {
        [Sequelize.Op.and]: [{ [Sequelize.Op.gte]: 0, }, { [Sequelize.Op.lte]: 5,}],  
      }
      },
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ratings');
  },
};
