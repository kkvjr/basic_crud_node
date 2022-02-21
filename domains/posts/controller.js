"use strict";

const { Post, Comment, User, PostHistory, sequelize } = require("../../models");
const { post } = require("./routes");

const postar = async (req, res) => {
  try {
    await sequelize.sync();

    const body = req.body;

    const resp = await Post.create(body);

    res.status(200).send(resp.dataValues);
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
    return;
  }
};

const consultar = async (req, res) => {
  try {
    await sequelize.sync();

    const user = await Post.findAll({
      order: [["publication_date", "DESC"]],
      include: [
        {
          model: Comment,
          as: "comentarios",
          include: [
            {
              attributes: ["id", "name"],
              model: User,
              as: "usuario",
            },
          ],
        },
      ],
    });

    res.status(200).send(user);
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

    const postagem = await Post.findOne({ where: { id: id } });

    if (postagem.user_id !== token_data.id) {
      return res.status(401).json({ erro: "Not Allowed." });
    }

    // if (body.fileName) {
    //   const file_name = body.user.fileName;
    //   const rootPath = path.resolve(__dirname + "/../../../");

    //   const ext = file_name.split(".")[1];

    //   await fs.writeFile(
    //     rootPath + `/public/posts/${body.user._id}.${ext}`,
    //     body.photo.split(`;base64,`)[1],
    //     "base64",
    //     (err) => {
    //       console.log(err);
    //     }
    //   );

    //   body.photo = `${process.env.PUBLIC_URL}/public/posts/${body.id}.${ext}`;

    //   await Post.update({ photo: body.photo }, { where: { id: body.id } });
    // }

    const user = await Post.update(
      { description: body.description },
      { where: { id: id, user_id: token_data.id } }
    );

    await PostHistory.create({
      photo: postagem.photo,
      description: postagem.description,
      user_id: postagem.user_id,
      post_id: postagem.id,
      like: postagem.like,
      dislike: postagem.dislike,
      update_date: new Date(),
    });

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

    const postagem = await Post.findOne({ where: { id: id } });

    if (postagem.user_id !== token_data.id) {
      return res.status(401).json({ erro: "Not Allowed." });
    }

    await Comment.destroy({ where: { post_id: id } });

    const user = await Post.destroy({
      where: { id: id, user_id: token_data.id },
    });

    res.status(200).send(user.dataValues);
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
    return;
  }
};

const like = async (req, res) => {
  try {
    await sequelize.sync();

    const { id } = req.params;

    const postagem = await Post.findOne({ where: { id: id } });

    const user = await Post.update(
      { like: postagem.like + 1 },
      { where: { id: id } }
    );

    await PostHistory.create({
      photo: postagem.photo,
      description: postagem.description,
      user_id: postagem.user_id,
      post_id: postagem.id,
      like: postagem.like,
      dislike: postagem.dislike,
      update_date: new Date(),
    });

    res.status(200).send(user.dataValues);
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
    return;
  }
};

const dislike = async (req, res) => {
  try {
    await sequelize.sync();

    const { id } = req.params;

    const postagem = await Post.findOne({ where: { id: id } });

    const user = await Post.update(
      { dislike: postagem.dislike + 1 },
      { where: { id: id } }
    );

    await PostHistory.create({
      photo: postagem.photo,
      description: postagem.description,
      user_id: postagem.user_id,
      post_id: postagem.id,
      like: postagem.like,
      dislike: postagem.dislike,
      update_date: new Date(),
    });

    res.status(200).send(user.dataValues);
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
    return;
  }
};

const report = async (req, res) => {
  try {
    await sequelize.sync();

    const { id } = req.params;

    const token_raw = req.headers.authorization;

    let token_data = JSON.parse(atob(token_raw.split(".")[1]));

    const postagems = await Post.findAll({
      attributes: ["id", "title", "likes", "dislikes", "views"],
      include: [
        {
          model: Comment,
          as: "comentários",
        },
      ],
      where: {
        user_id: token_data.id,
      },
    });

    res.status(200).send();
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
    return;
  }
};
module.exports = {
  postar,
  consultar,
  atualizar,
  excluir,
  like,
  dislike,
  report,
};
