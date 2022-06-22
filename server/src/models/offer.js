const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {

    static associate (models) {
     
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
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
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

