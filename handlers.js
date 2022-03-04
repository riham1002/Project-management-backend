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

function checkProject(req, res) {
  const project_name = req.body.project_name;
  const start_at = req.body.start_at;
  const end_at = req.body.end_at;
  const task_name = req.body.tasks;

  db.query("SELECT project_name FROM projects WHERE project_name = $1", [
    project_name,
  ])
    .then((result) => {
      const project = result.rows;

      if (project[0]) {
        res.send({ adding: "exist" });
      } else {
        db.query(
          "INSERT INTO projects (project_name, start_at, end_at) VALUES ($1,$2,$3) RETURNING id",
          [project_name, start_at, end_at]
        ).then((result) => {
          const id = result.rows[0].id;
          console.log(id);
          task_name.forEach((element) => {
            db.query(
              "INSERT INTO tasks (task_name, project_id) VALUES ($1,$2)",
              [element, id]
            );
          });
        });
        res.status(200).send({ adding: true });
      }
    })
    .catch((err) => res.send({ error: err.message }));
}

function deleteProject(req, res) {
  const project_name = req.body.project_name;
  const start_at = req.body.start_at;
  const end_at = req.body.end_at;
  const task_name = req.body.tasks;

  db.query(
    "DELETE FROM projects (project_name, start_at, end_at) VALUES ($1,$2,$3) RETURNING id",
    [project_name, start_at, end_at]
  )
    .then((result) => {
      const id = result.rows[0].id;
      console.log(id);
      task_name.forEach((element) => {
        db.query("DELETE FROM tasks (task_name, project_id) VALUES ($1,$2)", [
          element,
          id,
        ]);
      });
      res.status(200).send({ deleted: true });
    })
    .catch((err) => res.send({ error: err.message }));
}

//   function logout(req, res) {
//     res.clearCookie("user");
//     res.redirect("/");
//   }

function projectsInfo(req, res) {
  db.query(
    "SELECT  projects.id, projects.project_name, projects.start_at, projects.end_at, tasks.task_name FROM projects LEFT OUTER JOIN tasks ON projects.id=tasks.project_id "
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
  checkProject,
  deleteProject,
};
