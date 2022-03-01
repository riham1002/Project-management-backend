const express = require("express");
const router = express.Router();

// const authnticate = require("./middleware/authnticate");

const home = require("./controllers/home");
const { checkUsers, signUp, projectsInfo } = require("./handlers");
router.get("/", home);
router.post("/login", checkUsers);
router.post("/signup", signUp);
router.get("/projectsInfo",projectsInfo)







module.exports = router;
