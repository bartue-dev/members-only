const pool = require("./pool");

class Users {
  async signUpUser(username, password) {
    await pool.query("INSERT INTO users(username, password) VALUES ($1, $2)", [username, password])
  }
  
  async toggleMembership(user_id) {
    await pool.query("UPDATE users SET ismember = true WHERE user_id = $1", [user_id]);
  }

  async  getAllUsers() {
    const { rows } = await pool.query("SELECT user_id, username, ismember, isadmin FROM users");
  
    return rows;
  }
  
  async  deleteUser(user_id) {
    await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
  }
  
  async  toggleisAdmin(user_id) {
    await pool.query("UPDATE users SET isadmin = true WHERE user_id = $1", [user_id]);
  }
}

class Post {
  async  addPost(title, message, user_id) {
    await pool.query("INSERT INTO post(title, message, user_id) VALUES($1, $2, $3)", [title, message, user_id]);
  }
  
  async  getMyPost(user_id) {
    const { rows } = await pool.query("SELECT users.username, post.title, post.message FROM post INNER JOIN users ON users.user_id = post.user_id WHERE post.user_id = $1", [user_id]);
  
    return rows;
  }
  
  async  getAllPost() {
    const { rows } = await pool.query("SELECT post.post_id, post.title, post.message, users.username FROM post INNER JOIN users ON users.user_id = post.user_id");
  
    return rows;
  }
  
  async  deletePost(post_id) {
    await pool.query("DELETE FROM post WHERE post_id = $1", [post_id]);
  };
}

const users = new Users();
const post = new Post();


module.exports = {
  users,
  post
}