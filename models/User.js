"use strict";

const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        field: "name",
      },
      email: {
        type: DataTypes.STRING,
        field: "email",
      },
      password: {
        type: DataTypes.STRING,
        field: "password",
      },
      salt: {
        type: DataTypes.STRING,
        field: "salt",
      },
    },
    {
      tableName: "User",
      createdAt: false,
      updatedAt: false,
    }
  );

  User.associate = function (models) {
    models.User.hasMany(models.Post, {
      foreignKey: "user_id",
      as: "postagens",
    });
    models.User.hasMany(models.Comment, {
      foreignKey: "user_id",
      as: "comentarios",
    });
  };

  sequelizePaginate.paginate(User);

  return User;
};
