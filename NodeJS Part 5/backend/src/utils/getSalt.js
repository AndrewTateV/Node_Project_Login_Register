import axios from "axios";
import { usersDBPath, bcryptDBPath } from "./dataPath.js";

async function getSalt() {
  const getSaltRounds = await axios.get(bcryptDBPath).then((res) => res.data.saltRounds);
  return getSaltRounds;
}

export { getSalt };