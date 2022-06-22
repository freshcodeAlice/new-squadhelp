const { Model } = require('sequelize');
const { CONTEST_TYPES } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {

    static associate ({User, Offer}) {
      Contest.belongsTo(User,
      { foreignKey: 'userId', sourceKey: 'id' });
      Contest.hasMany(Offer,
      { foreignKey: 'contestId', targetKey: 'id' });
    }
  }
  Contest.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      contestType: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(CONTEST_TYPES)),
      },
      fileName: {

        type: DataTypes.STRING,
      },
      originalFileName: {

        type: DataTypes.STRING,
      },
      title: {

        type: DataTypes.STRING,
      },
      typeOfName: {

        type: DataTypes.STRING,
      },
      industry: {

        type: DataTypes.STRING,
      },
      focusOfWork: {

        type: DataTypes.TEXT,
      },
      targetCustomer: {

        type: DataTypes.TEXT,
      },
      styleName: {

        type: DataTypes.STRING,
      },
      nameVenture: {

        type: DataTypes.STRING,
      },
      typeOfTagline: {

        type: DataTypes.STRING,
      },
      brandStyle: {

        type: DataTypes.STRING,
      },
      createdAt: {

        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(CONTEST_STATUSES)),
        allowNull: false,
      },
      prize: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        validate: {
          min: 0
        }
      },
      priority: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min: 0
        }
      },
    },
    
    {
      sequelize,
      modelName: 'Contest',
      tableName: 'contests',
      underscored: true,
      timestamps: false,
    }
  );
  return Contest
};

