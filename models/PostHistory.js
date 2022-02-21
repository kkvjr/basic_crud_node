"use strict";

const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const PostHistory = sequelize.define(
    "PostHistory",
    {
      id: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        field: "post_id",
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
      update_date: {
        type: DataTypes.DATE,
        field: "update_date",
      },
    },
    {
      tableName: "PostHistory",
      createdAt: false,
      updatedAt: false,
    }
  );

  sequelizePaginate.paginate(PostHistory);

  return PostHistory;
};
