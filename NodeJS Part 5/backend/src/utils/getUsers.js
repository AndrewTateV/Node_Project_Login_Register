import axios from "axios";
import { usersDBPath, bcryptDBPath } from "./dataPath.js";

async function getUsers() {
  const users = await axios
    .get(usersDBPath)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return users;
}

export { getUsers };
