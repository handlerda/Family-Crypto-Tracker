"use strict";
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      zaboId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      provider: DataTypes.STRING,
    },
    {}
  );
  Account.associate = function (models) {
    // associations can be defined here
    Account.belongsTo(models.User, { foreignKey: "userId" });
    // add mixins to add function on join table getAuthorizedUsers -- etc
    // https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances
    Account.belongsToMany(models.User, {
      through: "AuthorizedAccountUsers",
      foreignKey: "accountId",
      otherKey: "userId",
      as: "AuthorizedUsers",
    });
  };
  return Account;
};
