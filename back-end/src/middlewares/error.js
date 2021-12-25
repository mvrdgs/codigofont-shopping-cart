module.exports = (err, _req, res, _next) => {
  const { status, message } = err;

  console.log(err);
  
  return res.status(status || 500).json({ message });
};
