function errorHandler(err, req, res) {
  console.error(`error: ${err.name}, ${err.message}`);
  res.status(500).send({ message: err.message });
}

module.exports = errorHandler;
