'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExampleModel = sequelize.define('ExampleModel', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  ExampleModel.associate = function(models) {
    // associations can be defined here
  };
  return ExampleModel;
};