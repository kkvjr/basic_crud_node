"use strict";

const jwt = require("jsonwebtoken");

const checkJwt = (req, res, next) => {
  const token_raw = req.headers.authorization;

  if (!token_raw || !token_raw.startsWith("Bearer")) {
    res.status(401).json({
      message: "Invalid token!",
    });
    return;
  }

  const token = token_raw.split("Bearer ")[1];

  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, process.env.SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  next();
};

module.exports = {
  checkJwt,
};
