const express = require("express");
const db = require("./models");
const app = express();

const User = db.users;

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("데이터베이스 drop 및 sync를 다시 맞춤");
// });

app.use(express.json());

const port = 3000;

app.post("/users", async (req, res) => {
  const { firstName, lastName, hasCar } = req.body;
  // req.body를 객체

  // req.body에서 작성한 것들을 user에 담음
  const user = {
    firstName,
    lastName,
    hasCar,
  };

  // User model db에 생성
  await User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "유저 생성 실패",
      });
    });
});

app.get("/users", (req, res) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "유저 정보 조회 실패",
      });
    });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  User.findByPk(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({
          message: `id가 ${id}인 유저가 없습니다.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `${id}인 유저가 없습니다.`,
      });
    });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;

  User.update(req.body, {
    where: { id },
  })
    .then((result) => {
      if (result[0] === 0) {
        res.send(` ${id}가 없습니다.`);
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err || `id가 ${id}인 유저가 없습니다.`,
      });
    });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  User.destroy({
    where: { id },
  }).then((num) => {
    console.log(num);
    if (num !== 0) {
      res.send({
        message: "유저 삭제",
      });
    } else {
      res.send({
        message: "유저를 찾지 못했습니다.",
      });
    }
  });
});

app.listen(port, () => {
  console.log(`server open ${port}`);
});
