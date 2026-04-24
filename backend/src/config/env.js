const dotenv = require('dotenv');

dotenv.config();

const requiredVariables = ['USER_ID', 'EMAIL_ID', 'ROLL_NUMBER', 'PORT'];
for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}

const USER_ID = process.env.USER_ID;
const EMAIL_ID = process.env.EMAIL_ID;
const ROLL_NUMBER = process.env.ROLL_NUMBER;
const PORT = Number(process.env.PORT);

module.exports = {
  USER_ID,
  EMAIL_ID,
  ROLL_NUMBER,
  PORT
};
