import axios from "axios";
import jwt from "jsonwebtoken";

import { getUsers } from "../utils/getUsers.js";
import { genToken } from "../utils/genToken.js";

async function loginToken(req, res) {
  const username = req.username;
  const password = req.password;

  console.log(username, password);

  const users = await getUsers();

  // console.log(users);

  if (
    !(users && Array.isArray(users) && users.length > 0)
  ) {
    return res.status(500).json({
      code: 2,
      message: "No users found",
    });
  } else {
    const user = users.find(
      (user) =>
        user.username === username &&
        user.password === password
    );
    if (!user) {
      res.status(401).json({
        code: 1,
        message: "Invalid credentials here",
      });
    } else {
      const newUserToken = {
        username,
        password,
        date: new Date(),
      };

      const token = genToken(newUserToken, "1h");

      res.status(200).json({
        message: "Login successful",
        code: 0,
        token,
        user,
      });
    }
  }
}

export { loginToken };
