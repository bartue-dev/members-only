const pool = require("./pool");

async function signUpUser(username, password) {
  await pool.query("INSERT INTO users(username, password) VALUES ($1, $2)", [username, password])
}

module.exports = {
  signUpUser
}