const express = require("express");
const cors = require("cors");

require("dotenv").config();

const fileUpload = require("express-fileupload");
const { sequelize } = require("./models/index");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(express.static(__dirname + "/public"));

//routes

app.use("/api/public", express.static(__dirname + "/public"));

app.use("/api/auth", require("./domains/auth/routes"));
app.use("/api/posts", require("./domains/posts/routes"));
app.use("/api/comments", require("./domains/comments/routes"));

//funcao main
function main() {
  const lis = app.listen({
    port: 8001,
  });
  lis.on("listening", async () => {
    console.log("connected, 8001");

    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database: ", error);
    }
  });
}

process.on("unhandledRejection", (err) => {
  if (err) {
    console.error(err);
  }
  process.exit(1);
});

main();
