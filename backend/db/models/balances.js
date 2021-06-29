"use strict";
module.exports = (sequelize, DataTypes) => {
  const Balances = sequelize.define(
    "Balances",
    {
      zaboId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      blockchain: DataTypes.STRING,
      amount: DataTypes.FLOAT,
    },
    {}
  );
  Balances.associate = function (models) {
    // associations can be defined here
    Balances.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Balances;
};
