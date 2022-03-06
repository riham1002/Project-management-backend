const express = require("express");
const router = express.Router();

// const authnticate = require("./middleware/authnticate");

const home = require("./controllers/home");
const {
  checkUsers,
  signUp,
  projectsInfo,
  checkProject,
  deleteProject,
} = require("./handlers");
router.get("/", home);
router.post("/login", checkUsers);
router.post("/signup", signUp);
router.get("/projectsInfo", projectsInfo);
router.post("/addProject", checkProject);
router.delete("/delete/:project_name", deleteProject);

module.exports = router;
