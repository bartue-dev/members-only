const pool = require("./pool");

async function signUpUser(username, password) {
  await pool.query("INSERT INTO users(username, password) VALUES ($1, $2)", [username, password])
}

async function addPost(title, message, user_id) {
  await pool.query("INSERT INTO post(title, message, user_id) VALUES($1, $2, $3)", [title, message, user_id]);
}

async function getMyPost(user_id) {
  const { rows } = await pool.query("SELECT users.username, post.title, post.message FROM post INNER JOIN users ON users.user_id = post.user_id WHERE post.user_id = $1", [user_id]);

  return rows;
}

async function getAllPost() {
  const { rows } = await pool.query("SELECT post.title, post.message, users.username FROM post INNER JOIN users ON users.user_id = post.user_id");

  return rows;
}

module.exports = {
  signUpUser,
  addPost,
  getMyPost,
  getAllPost
}