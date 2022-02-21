"use strict";

const express = require("express");
const { checkJwt } = require("../../middlewares/checkJwt");
const router = express.Router();

const controller = require("./controller");

router.post("/login", controller.login);

router.post("/create", controller.cadastrar);

router.get("/:id", [checkJwt], controller.consultar);

router.put("/:id", [checkJwt], controller.atualizar);

module.exports = router;
