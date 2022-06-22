const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {

    static associate ({User}) {
        RefreshToken.belongsTo(User,
            { foreignKey: 'userId' });
    }
  }
  RefreshToken.init(
    {
      userId: {        
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
      value: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      ua: {
        type: DataTypes.STRING,
      },
      fingerprint:{
        type: DataTypes.STRING,
      }
    },
    
    {
      sequelize,
      modelName: 'RefreshToken',
      tableName: 'refresh_tokens',
      underscored: true,
      timestamps: false,
    }
  );
  return RefreshToken
};
