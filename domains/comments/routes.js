"use strict";

const express = require("express");
const { checkJwt } = require("../../middlewares/checkJwt");
const router = express.Router();

const controller = require("./controller");

router.post("/", [checkJwt], controller.postar);

router.put("/:id", [checkJwt], controller.atualizar);

router.delete("/:id", [checkJwt], controller.excluir);

module.exports = router;
