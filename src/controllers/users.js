const userModel = require('../models/users');
const { v4: uuidv4 } = require('uuid');
const helpers = require('../helpers/helpers');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const common = require('../helpers/common');
const path = require('path');
const confirmForgot = require('../helpers/confirmForgot');

const getAllUser = (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const column = req.query.column;
  const search = req.query.search;
  const sort = req.query.sort;
  // const sortBy = sort.toUpperCase()
  const userRole = req.role;
  const keyword = req.query.keyword;
  userModel
    .getAllUser(page, limit, column, search, sort, keyword)
    .then((result) => {
      const friends = result.filter((item) => {
        if (item.id != req.id) {
          return item;
        }
      });
      helpers.response(res, friends, 200);
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = new createError.InternalServerError();
      next(errorMessage);
    });
};
const getUserById = (req, res, next) => {
  const id = req.params.idsaya;
  userModel
    .getUserById(id)
    .then((result) => {
      const users = result;
      helpers.response(res, users, 200);
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = new createError.InternalServerError();
      next(errorMessage);
    });
};
const updateUser = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const id = req.params.id;
  const userRole = req.role;
  const userId = req.id;
  const { name, phone, bio, username } = req.body;
  if (userRole === 'user') {
    if (id === userId) {
      const data = {
        name: name,
        phone: phone,
        bio: bio,
        username: username,
        img: `${process.env.BASE_URL}/file/${req.file.filename}` || null,
        updatedAt: new Date(),
      };
      userModel
        .updateUser(id, data)
        .then(() => {
          res.json({
            message: 'data successfuly updated',
            data: data,
          });
        })
        .catch((error) => {
          console.log(error);
          const errorMessage = new createError.InternalServerError();
          next(errorMessage);
        });
    } else {
      const errorMessage = new createError.Forbidden();
      next(errorMessage);
    }
  } else {
    const errorMessage = new createError.Forbidden();
    next(errorMessage);
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const userRole = req.role;
  const email = req.email;
  const idUser = req.id;
  const user = await userModel.findUser(email);
  if (userRole === 'admin') {
    userModel
      .deleteUser(id)
      .then(() => {
        res.status(200);
        res.json({
          message: 'data successfuly deleted',
        });
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = new createError.InternalServerError();
        next(errorMessage);
      });
  } else if (user.length > 0 && userRole !== 'admin') {
    userModel
      .deleteUser(idUser)
      .then(() => {
        res.status(200);
        res.json({
          message: 'data successfuly deleted',
        });
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = new createError.InternalServerError();
        next(errorMessage);
      });
  } else {
    const errorMessage = new createError.Forbidden();
    next(errorMessage);
  }
};
const verificationUser = (req, res, next) => {
  const id = req.params.id;
  const userId = req.id;
  console.log(id);
  userModel
    .verification(id)
    .then((result) => {
      // console.log(result.changedRows)
      const validate = result.changedRows;
      if (validate) {
        res.status(200);
        res.json({
          message: 'User success to verified',
        });
      } else {
        const errorMessage = new createError.Unauthorized("Email isn't in database");
        next(errorMessage);
      }
    })
    .catch((err) => {
      console.log(err);
      const errorMessage = new createError.InternalServerError();
      next(errorMessage);
    });
};
const sendEmailForgot = (req, res, next) => {
  const { email } = req.body;
  const user = userModel.findUser(email);
  if (user.length !== 0) {
    confirmForgot.main(email);
    helpers.response(res, { message: 'Check your mail to change your password' }, 200);
  } else {
    helpers.response(res, null, 500, { message: 'internal server error' });
  }
};
const forgotPassword = async (req, res, next) => {
  const email = req.params.email;
  const { password } = req.body;
  const user = await userModel.findUser(email);
  if (user.length !== 0) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          password: hash,
        };
        userModel
          .updateUserByEmail(email, data)
          .then((result) => {
            // common.main(data.name, data.email, data.id)
            delete data.password;
            helpers.response(res, { message: 'Success updating password' }, 200);
          })
          .catch((err) => {
            console.log(err);
            helpers.response(res, null, 500, { message: 'internal server error' });
          });
      });
    });
  } else {
    helpers.response(res, null, 500, { message: 'internal server error' });
  }
};
const register = async (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const { name, email, password, phone, bio, role, username } = req.body;
  const user = await userModel.findUser(email);
  if (user.length > 0) {
    return helpers.response(res, null, 401, { message: 'email already registered' });
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      const data = {
        id: uuidv4(),
        name: name,
        email: email,
        password: hash,
        phone: phone,
        role: role,
        bio: bio,
        username: username,
        // profilePicture: `${process.env.BASE_URL}/file/${req.file.filename}`,
        createdAt: new Date(),
      };
      // if (path.extname(req.file.filename) === '.jpg'){
      userModel
        .insertUser(data)
        .then((result) => {
          common.main(data.name, data.email, data.id);
          delete data.password;
          helpers.response(res, data, 200);
        })
        .catch((error) => {
          console.log(error);
          helpers.response(res, null, 500, { message: 'internal server error' });
        });
      // }
    });
  });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await userModel.findUser(email);
  try {
    const user = result[0];
    if (user.status === 1) {
      bcrypt.compare(password, user.password, function (err, resCompare) {
        // console.log(resCompare)
        if (!resCompare) {
          return helpers.response(res, null, 401, { message: 'password wrong' });
        }
        // generate token
        jwt.sign(
          { email: user.email, role: user.role, id: user.id },
          process.env.SECRET_KEY,
          { expiresIn: '24h' },
          function (err, token) {
            delete user.password;
            user.token = token;
            helpers.response(res, user, 200);
          }
        );
      });
    } else {
      console.log("Your email hasn't been activate");
      return helpers.response(res, null, 401, { message: "Your email hasn't been activate" });
    }
  } catch {
    console.log('wrong email or password');
    return helpers.response(res, null, 401, { message: 'wrong email or password' });
  }
};
module.exports = {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  register,
  login,
  verificationUser,
  sendEmailForgot,
  forgotPassword,
};