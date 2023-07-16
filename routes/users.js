const { getUserList, getUser, createUser } = require("../controllers/users");
const router = require("express").Router();

router.get("/", getUserList);

router.get("/:userId", getUser);

router.post("/", createUser);

module.exports = router;
