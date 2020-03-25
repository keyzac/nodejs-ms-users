'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    birthDate: DataTypes.DATEONLY
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};