import jwt from "jsonwebtoken";
import "dotenv/config";

function genToken(info, time) {
  const newInfo = { ...info, date: new Date() };
  const token = jwt.sign(
    newInfo,
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: time,
    }
  );
  return token;
}

export { genToken };
