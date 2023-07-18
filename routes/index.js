const router = require("express").Router();
const NOT_FOUND_CODE = 404;

const userRouter = require("./users");
const cardRouter = require("./cards");

router.use("/users", userRouter);
router.use("/cards", cardRouter);

router.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: "Страница не найдена" });
});

module.exports = router;
