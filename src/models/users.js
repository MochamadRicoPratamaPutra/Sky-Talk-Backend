const connection = require('../config/db');
const getAllUser = (page, limit, column, search, sortBy, keyword) => {
  return new Promise((resolve, reject) => {
    if (column !== undefined && sortBy !== undefined && keyword !== undefined && search !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatingResult = {};
        connection.query(
          `SELECT * FROM user WHERE ${search} LIKE '%${keyword}%' AND (id >= ${startIndex}) ORDER BY ${column} ${sortBy} LIMIT ${limit};`,
          (error, result) => {
            if (!error) {
              if (endIndex < result.length) {
                paginatingResult.next = {
                  page: page + 1,
                  limit: limit,
                };
              }
              if (startIndex > 0) {
                paginatingResult.previous = {
                  page: page - 1,
                  limit: limit,
                };
              }
              paginatingResult.result = result;
              resolve(paginatingResult);
            } else {
              reject(error);
            }
          }
        );
      } else {
        connection.query(`SELECT * FROM user ORDER BY ${column} ${sortBy}`, (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        });
      }
    } else if (column !== undefined && sortBy !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatingResult = {};
        connection.query(
          `SELECT * FROM user WHERE id >= ${startIndex} ORDER BY ${column} ${sortBy} LIMIT ${limit}`,
          (error, result) => {
            if (!error) {
              if (endIndex < result.length) {
                paginatingResult.next = {
                  page: page + 1,
                  limit: limit,
                };
              }
              if (startIndex > 0) {
                paginatingResult.previous = {
                  page: page - 1,
                  limit: limit,
                };
              }
              paginatingResult.result = result;
              resolve(paginatingResult);
            } else {
              reject(error);
            }
          }
        );
      } else {
        connection.query(`SELECT * FROM user ORDER BY ${column} ${sortBy}`, (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        });
      }
    } else if (keyword !== undefined && search !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatingResult = {};
        connection.query(
          `SELECT * FROM user WHERE ${search} LIKE '%${keyword}%' AND (id >= ${startIndex}) LIMIT ${limit}`,
          (error, result) => {
            if (!error) {
              if (endIndex < result.length) {
                paginatingResult.next = {
                  page: page + 1,
                  limit: limit,
                };
              }
              if (startIndex > 0) {
                paginatingResult.previous = {
                  page: page - 1,
                  limit: limit,
                };
              }
              paginatingResult.result = result;
              resolve(paginatingResult);
            } else {
              reject(error);
            }
          }
        );
      } else {
        connection.query(`SELECT * FROM user WHERE ${search} LIKE '%${keyword}%'`, (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        });
      }
    } else {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatingResult = {};
        connection.query(`SELECT * FROM user WHERE id >= ${startIndex} LIMIT ${limit}`, (error, result) => {
          if (!error) {
            const jsonLength = result;
            console.log(jsonLength.length);
            if (endIndex < Object.keys(result).length) {
              paginatingResult.next = {
                page: page + 1,
                limit: limit,
              };
            }
            if (startIndex > 0) {
              paginatingResult.previous = {
                page: page - 1,
                limit: limit,
              };
            }
            paginatingResult.result = result;
            resolve(paginatingResult);
          } else {
            reject(error);
          }
        });
      } else {
        connection.query('SELECT * FROM user where status = 1', (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        });
      }
    }
  });
};
const insertUser = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO user SET ?', data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE user SET ? WHERE id = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
const updateUserByEmail = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE user SET ? WHERE email = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM user WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user where id = ?', id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const findUser = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user where email = ?', email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
const verification = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE user SET status=1 WHERE id = ?', id, (error, result) => {
      if (!error) {
        console.log(result);
        resolve(result);
      } else {
        // console.log(error)
        reject(error);
      }
    });
  });
};
module.exports = {
  getAllUser,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  findUser,
  updateUserByEmail,
  verification,
};
