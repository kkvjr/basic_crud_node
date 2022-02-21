"use strict";

const express = require("express");
const { checkJwt } = require("../../middlewares/checkJwt");
const router = express.Router();

const controller = require("./controller");

router.post("/", [checkJwt], controller.postar);

router.get("/", [checkJwt], controller.consultar);

router.put("/:id", [checkJwt], controller.atualizar);

router.delete("/:id", [checkJwt], controller.excluir);

router.put("/like/:id", [checkJwt], controller.like);

router.put("/dislike/:id", [checkJwt], controller.atualizar);

router.get("/report", [checkJwt], controller.report);

module.exports = router;
