const response = (res, result, status, error) => {
  const resultPrint = {};
  resultPrint.status = 'success';
  resultPrint.statusCode = status;
  resultPrint.data = result;
  resultPrint.error = error || null;
  res.status(status).json(resultPrint);
};

module.exports = {
  response,
};