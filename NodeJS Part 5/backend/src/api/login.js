import axios from "axios";
import bcrypt from "bcrypt";
import "dotenv/config";
import { getUsers } from "../utils/getUsers.js";
import { findUserByName } from "../utils/findUserByName.js";
import {
  usersDBPath,
  bcryptDBPath,
} from "../utils/dataPath.js";
import jwt from "jsonwebtoken";
import { genToken } from "../utils/genToken.js";

async function login(req, res) {
  const { username, password } = req.body;

  console.log(username, password);

  const users = await getUsers();

  console.log(users);
  if (
    !(users && Array.isArray(users) && users.length > 0)
  ) {
    res
      .status(500)
      .json({ message: "No user found", code: 2 });
    return;
  } else {
    const user = findUserByName(username, users);
    if (!user) {
      res.status(401).json({
        message: "Invalid credentials 1",
        code: 1,
      });
      return;
    } else {
      const match = await bcrypt.compare(
        password,
        user.password
      );
      if (!match) {
        res.status(401).json({
          message: "Invalid credentials 2",
          code: 1,
        });
        return;
      }

      const userTokenInfo = {
        username,
        password: user.password,
      };

      const token = genToken(userTokenInfo, "1h");

      res.status(200).json({
        message: "Login success",
        code: 0,
        token,
      });
    }
  }
}

export { login };
