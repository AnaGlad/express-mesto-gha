const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  console.log(authorization);
  const token = authorization.replace('Bearer ', '');
  console.log(token);
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) { return res.status(401).send({ message: 'Необходима авторизация' }); }
  req.user = payload;
  return next();
};
