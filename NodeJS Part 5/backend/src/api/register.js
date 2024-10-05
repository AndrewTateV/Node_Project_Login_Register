import axios from "axios";
import "dotenv/config";
import bcrypt from "bcrypt";
import {
  usersDBPath,
  bcryptDBPath,
} from "../utils/dataPath.js";

import { getUsers } from "../utils/getUsers.js";
import { getSalt } from "../utils/getSalt.js";
import { findUserByName } from "../utils/findUserByName.js";

async function register(req, res) {
  console.log("register");
  const { username, password } = req.body;
  try {
    const users = await getUsers();
    const user = findUserByName(username, users);

    if (user) {
      res.status(409).json({
        message: "Already have same username",
        code: "1",
        username: username,
      });
      return;
    } else if (!password) {
      res.status(409).json({
        message: "Password is empty",
        code: "2",
        username: req.body.username,
      });
      return;
    } else {
      const salt = await getSalt(); // 获取加密的盐
      console.log(salt);
      const hash = await bcrypt.hash(password, salt); // 生成加密的密码

      await axios.post(usersDBPath, {
        username: username,
        password: hash,
      });

      res.status(200).json({
        message: "Register success",
        code: "0",
        username: username,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export { register };
