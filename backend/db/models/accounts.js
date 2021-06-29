"use strict";
module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define(
    "Accounts",
    {
      zaboId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      provider: DataTypes.STRING,
    },
    {}
  );
  Accounts.associate = function (models) {
    // associations can be defined here
    Accounts.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Accounts;
};
