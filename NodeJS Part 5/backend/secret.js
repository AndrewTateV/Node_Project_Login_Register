import crypto from "node:crypto"
import fs from "node:fs"
import { getFullTime } from "./utils.js"

function genSecret() {
  return crypto.randomBytes(64).toString('hex')
}

fs.appendFile('secret.txt', `${getFullTime()}: \n` + genSecret() + '\n', (err) => {
  err ? console.log(err) : console.log('secret.txt updated');
})