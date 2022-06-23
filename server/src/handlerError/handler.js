module.exports = (err, req, res, next) => {
  console.log(err);

  if (err instanceof TokenExpiredError) {
  return res.status(419).send('Token expired'); //?
  }
  if (err instanceof JsonWebTokenError) {
  return res.status(401).send('Invalid token')
  }

  if (!err.message || !err.status) {
    res.status(500).send('Server Error');
  } else {
    res.status(err.status).send(err.message);
  }
};
