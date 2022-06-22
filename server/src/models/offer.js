const { Model } = require('sequelize');
const { OFFER_STATUSES } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {

    static associate ({User, Contest, Rating}) {
     
    Offer.belongsTo(User,
    { foreignKey: 'userId', sourceKey: 'id' });
    Offer.belongsTo(Contest,
    { foreignKey: 'contestId', sourceKey: 'id' });
    Offer.hasOne(Rating,
    { foreignKey: 'offerId', targetKey: 'id' });
    }
  }
  Offer.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
  
      },
      contestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
      },
      fileName: {
        type: DataTypes.STRING,
      },
      originalFileName: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(OFFER_STATUSES)),
        defaultValue: OFFER_STATUSES.PENDING,
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
     updatedAt: {
      field: 'updated_at',
        type: DataTypes.DATE,
        defaultValue: new Date()
      }
    },
    
    {
      sequelize,
      modelName: 'Offer',
      tableName: 'offers',
      underscored: true
    }
  );
  return Offer
};

