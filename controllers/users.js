
function getUserList (req, res) {
  res.send(users);
};

function getUser (req, res) {
  const { id } = req.params;
  const user = users.find((user) => user._id === id);
  res.send(user);
};

function createUser (req, res){
  console.log("user create");
  console.log(req.body);
  res.status(201).send(req.name, req.about, req.avatar);
};

module.exports = {
  getUserList,
  getUser,
  createUser
}