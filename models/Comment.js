"use strict";

const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      post_id: {
        type: DataTypes.INTEGER,
        field: "post_id",
      },
      content: {
        type: DataTypes.STRING,
        field: "content",
      },
      excluido_pelo_dono: {
        type: DataTypes.BOOLEAN,
        field: "excluido_pelo_dono",
      },
    },
    {
      tableName: "Comment",
      createdAt: false,
      updatedAt: false,
    }
  );

  Comment.associate = function (models) {
    models.Comment.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "usuario",
    });
    models.Comment.belongsTo(models.Post, {
      foreignKey: "post_id",
      as: "postagem",
    });
  };

  sequelizePaginate.paginate(Comment);

  return Comment;
};
