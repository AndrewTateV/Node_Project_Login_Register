import express from "express";
import cors from "cors";
import ip from "ip";
import bodyParser from "body-parser";
import "dotenv/config";

import { login } from "./src/api/login.js";
import { loginToken } from "./src/api/loginToken.js";
import { register } from "./src/api/register.js";
import { authToken } from "./src/auth/authToken.js";

const app = express();
app.use(cors({ origin: "*" }));
const jsonParser = bodyParser.json();
const port = process.env.PORT || 18909;

app.post("/api/login", jsonParser, login);
app.post(
  "/api/loginToken",
  jsonParser,
  authToken,
  loginToken
);
app.post("/api/register", jsonParser, register);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(`http://${ip.address()}:${port}`);
});
