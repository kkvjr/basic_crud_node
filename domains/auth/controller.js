"use strict";

const { User, sequelize } = require("../../models");
const Bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const login = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!login) {
      res.status(401).json({ erro: "Usuário inexistente." });
      return;
    }

    let validPassword = false;
    try {
      validPassword = await Bcrypt.compare(password, login.password);
    } catch (erro) {
      validPassword = false;
    }

    if (!validPassword) {
      res.status(401).json({ erro: "Senha inválida." });
      return;
    }

    const access_token = JWT.sign(
      {
        ...login.dataValues,
      },
      process.env.SECRET,
      {
        expiresIn: "8h",
      }
    );

    res.status(200).send({
      token: access_token,
      duration: "8h",
    });
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
    return;
  }
};

const cadastrar = async (req, res) => {
  try {
    await sequelize.sync();

    const body = req.body;

    const salt = await Bcrypt.genSalt();
    const saltedPassword = await Bcrypt.hash(body.password, salt);
    body.password = saltedPassword;
    body.salt = salt;

    const user = await User.create(body);

    const access_token = JWT.sign(
      {
        ...user.dataValues,
      },
      process.env.SECRET,
      {
        expiresIn: "8h",
      }
    );

    res.status(200).send({
      token: access_token,
      duration: "8h",
    });
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
    return;
  }
};

const consultar = async (req, res) => {
  try {
    await sequelize.sync();

    const { id } = req.params;

    const user = await User.findOne({ where: { id: id } });

    res.status(200).send(user.dataValues);
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

    const user = await User.update(
      { name: body.name, email: body.email },
      { where: { id: id } }
    );

    res.status(200).send(user.dataValues);
    return;
  } catch (error) {
    res.status(400).send({ message: error.message });
    return;
  }
};
module.exports = {
  login,
  cadastrar,
  consultar,
  atualizar,
};
