//* imports
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDatabase from "./database/db.js";
import routes from "./routes.js";

//require('dotenv').config();

const app = express();

app.use(express.json());
app.use(routes);

//? Credenciais
let dbUser = "iagoefy";//process.env.DB_USER;
let dbPassword = "120YRRREuHeYQOFr";//process.env.DB_PASSWORD;

await connectDatabase(dbUser, dbPassword)
  .then(() => {
    app.listen(3000, () => {
      console.log(
        "Banco de dados e servidor na porta 300 conectado com sucesso"
      );
    });
  })
  .catch((err) => console.log(err));

debugger;
