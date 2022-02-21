"use strict";

const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
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
      title: {
        type: DataTypes.STRING,
        field: "name",
      },
      description: {
        type: DataTypes.STRING,
        field: "email",
      },
      likes: {
        type: DataTypes.INTEGER,
        field: "likes",
      },
      dislikes: {
        type: DataTypes.INTEGER,
        field: "dislikes",
      },
      views: {
        type: DataTypes.INTEGER,
        field: "views",
      },
      publication_date: {
        type: DataTypes.DATE,
        field: "publication_date",
      },
    },
    {
      tableName: "Post",
      createdAt: false,
      updatedAt: false,
    }
  );

  Post.associate = function (models) {
    models.Post.hasMany(models.Comment, {
      foreignKey: "post_id",
      as: "comentarios",
    });
    models.Post.hasMany(models.PostHistory, {
      foreignKey: "post_id",
      as: "historico",
    });
  };

  sequelizePaginate.paginate(Post);

  return Post;
};
