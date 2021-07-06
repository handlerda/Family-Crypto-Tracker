"use strict";
module.exports = (sequelize, DataTypes) => {
  const AuthorizedAccountUser = sequelize.define(
    "AuthorizedAccountUser",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Accounts",
          key: "id",
        },
      },
    },
    {}
  );
  AuthorizedAccountUser.associate = function (models) {
    // associations can be defined here
  };
  return AuthorizedAccountUser;
};
