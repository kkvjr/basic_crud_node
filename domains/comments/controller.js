"use strict";

const { Post, Comment, User, sequelize } = require("../../models");

const postar = async (req, res) => {
  try {
    await sequelize.sync();

    const body = req.body;

    const resp = await Comment.create(body);

    res.status(200).send(resp.dataValues);
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
    return;
  }
};

const atualizar = async (req, res) => {
  try {
    await sequelize.sync();

    const body = req.body;

    const { id } = req.params;

    const token_raw = req.headers.authorization;

    let token_data = JSON.parse(atob(token_raw.split(".")[1]));

    const comentario = await Comment.findOne({ where: { id: id } });
    const postagem = await Post.findOne({ where: { id: comentario.post_id } });

    if (
      comentario.user_id !== token_data.id &&
      token_data.id !== postagem.user_id
    ) {
      return res.status(401).json({ erro: "Not Allowed." });
    }

    const user = await Comment.update(
      { content: body.content },
      { where: { id: id, user_id: token_data.id } }
    );

    res.status(200).send(user.dataValues);
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
    return;
  }
};

const excluir = async (req, res) => {
  try {
    await sequelize.sync();

    const body = req.body;

    const { id } = req.params;

    const token_raw = req.headers.authorization;

    let token_data = JSON.parse(atob(token_raw.split(".")[1]));

    const comentario = await Comment.findOne({ where: { id: id } });
    const postagem = await Post.findOne({ where: { id: comentario.post_id } });

    if (
      token_data.id !== postagem.user_id &&
      comentario.user_id !== token_data.user_id
    ) {
      return res.status(401).json({ erro: "Not Allowed." });
    }

    await Comment.destroy({ where: { id: id } });

    res.status(200).send("ok");
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
    return;
  }
};
module.exports = {
  postar,

  atualizar,
  excluir,
};
