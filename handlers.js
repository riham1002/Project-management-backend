const path = require("path");
const db = require("./database/connections");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
require("dotenv").config();

function checkUsers(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  db.query("SELECT username, password FROM users WHERE username = $1", [
    username,
  ]).then((result) => {
    const user = result.rows;

    if (user[0] && user[0].password === password) {
      const token = jwt.sign({ username }, SECRET);
      res.cookie("user", token, { maxAge: 1200000 });

      res.status(200).send({ success: true });
    } else {
      res.status(404).send({ success: false });
    }
  });
}

//   function logout(req, res) {
//     res.clearCookie("user");
//     res.redirect("/");
//   }

function projectsInfo(req, res) {
  db.query(
    "SELECT  projects.id, projects.project_name, projects.start_at, projects.end_at, tasks.task_name FROM projects LEFT OUTER JOIN tasks ON projects.id=tasks.project_id ",
   
  ).then((result) => {
    const projectsInfo = result.rows;
   
    res.send(projectsInfo);
  });
}

function signUp(req, res) {
  console.log(req.body);
  db.query("SELECT username FROM users WHERE username = $1", [
    req.body.username,
  ]).then((result) => {
    if (result.rows[0]) {
      res.send({ errorMessage: "username already exists" });
    } else {
      db.query("INSERT INTO users(username, password) VALUES ($1,$2) ", [
        req.body.username,
        req.body.password,
      ]).then((result) => {
        if (result.rowCount > 0) {
          res.send({ adding: true });
        } else {
          res.send({ adding: false });
        }
      });
    }
  });
}

module.exports = {
  checkUsers,
  // logout,
  signUp,
  projectsInfo,
};
