const connection = require('../config/db');
const getMessageById = (idSender, idReceiver) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM messages where (receiverId = '${idReceiver}' AND senderId = '${idSender}') OR (receiverId = '${idSender}' AND senderId = '${idReceiver}') ORDER BY createdAt ASC`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};
const insertMessage = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO messages SET ?', data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
module.exports = {
  getMessageById,
  insertMessage,
};
