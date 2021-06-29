"use strict";

const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
  const FamilyInviteCode = sequelize.define(
    "FamilyInviteCode",
    {
      familyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code: { type: DataTypes.INTEGER(30), allowNull: false },
      active: { type: DataTypes.BOOLEAN }, // will not set active by default
      twilioMsgSent: { type: DataTypes.BOOLEAN, allowNull: false },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {}
  );
  FamilyInviteCode.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.Family, { foreignKey: "familyId" });
  };
  return FamilyInviteCode;
};
