"use strict";
module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define(
    "Family",
    {
      name: DataTypes.STRING(50),
      allowNull: false,
    },
    {}
  );
  Family.associate = function (models) {
    // associations can be defined here
  };
  return Family;
};
