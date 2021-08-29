const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
  // try {
  //   const token = req.cookies.token;
  //   if (!token) {
  //     const error = new Error('server need token');
  //     error.code = 401;
  //     return next(error);
  //   }
  //   jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
  //     if (err) {
  //       if (err.name === 'TokenExpiredError') {
  //         const error = new Error('token expired');
  //         error.status = 401;
  //         return next(error);
  //       } else if (err.name === 'JsonWebTokenError') {
  //         const error = new Error('token invalid');
  //         error.status = 401;
  //         return next(error);
  //       } else {
  //         const error = new Error('token not active');
  //         error.status = 401;
  //         return next(error);
  //       }
  //     }
  //     req.role = decoded.role;
  //     req.id = decoded.id;
  //     req.email = decoded.email;
  //     next();
  //   });
  // } catch {
  const token = req.headers.authorization;
  console.log(token)
  const tokenCookie = req.cookies.token;
  if (!token && !tokenCookie) {
    const error = new Error('server need token');
    error.code = 401;
    return next(error);
  }
  let result
  if (token) {
    result = token.split(' ')[1];
  } else {
    result = tokenCookie
  }
  jwt.verify(result, process.env.SECRET_KEY, function (err, decoded) {
    // jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        const error = new Error('token expired');
        error.status = 401;
        return next(error);
      } else if (err.name === 'JsonWebTokenError') {
        const error = new Error('token invalid');
        error.status = 401;
        return next(error);
      } else {
        const error = new Error('token not active');
        error.status = 401;
        return next(error);
      }
    }
    req.role = decoded.role;
    req.id = decoded.id;
    req.email = decoded.email;
    next();
  });
  // }
};
module.exports = {
  verifyAccess,
};
