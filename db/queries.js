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
  const { rows } = await pool.query("SELECT post.post_id, post.title, post.message, users.username FROM post INNER JOIN users ON users.user_id = post.user_id");

  return rows;
}

async function toggleMembership(user_id) {
  await pool.query("UPDATE users SET ismember = true WHERE user_id = $1", [user_id]);
}

async function deletePost(post_id) {
  await pool.query("DELETE FROM post WHERE post_id = $1", [post_id]);
};

async function getAllUsers() {
  const { rows } = await pool.query("SELECT user_id, username, ismember, isadmin FROM users");

  return rows;
}

async function deleteUser(user_id) {
  await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
}

async function toggleisAdmin(user_id) {
  await pool.query("UPDATE users SET isadmin = true WHERE user_id = $1", [user_id]);
}

module.exports = {
  signUpUser,
  addPost,
  getMyPost,
  getAllPost,
  toggleMembership,
  deletePost,
  getAllUsers,
  deleteUser,
  toggleisAdmin
}