
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contests', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contestType: {
        allowNull: false,
        type: Sequelize.ENUM(...Object.values(CONTEST_TYPES)),
      },
      fileName: {

        type: Sequelize.STRING,
      },
      originalFileName: {

        type: Sequelize.STRING,
      },
      title: {

        type: Sequelize.STRING,
      },
      typeOfName: {

        type: Sequelize.STRING,
      },
      industry: {

        type: Sequelize.STRING,
      },
      focusOfWork: {

        type: Sequelize.TEXT,
      },
      targetCustomer: {

        type: Sequelize.TEXT,
      },
      styleName: {

        type: Sequelize.STRING,
      },
      nameVenture: {

        type: Sequelize.STRING,
      },
      typeOfTagline: {

        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(...Object.values(CONTEST_STATUSES)),
      },
      brandStyle: {

        type: Sequelize.STRING,
      },
      prize: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      createdAt: {

        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      priority: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    }).then(() => queryInterface.addConstraint('contests',  {
      type: 'check',
      fields: ['prize'],
      where: {
      mark: {
        [Sequelize.Op.gte]: 0
      }
      },
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('contests');
  },
};
