const messageModel = require('../models/message');
const helpers = require('../helpers/helpers');
const moment = require('moment');
moment.locale('id');
const getDate = (date) => {
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();
  const fixDate = mm + '/' + dd + '/' + yyyy;
  const result = String(fixDate);
  return result
};
const getMessageById = (req, res) => {
  const idReceiver = req.params.idReceiver;
  const idSender = req.id;
  messageModel
    .getMessageById(idSender, idReceiver)
    .then((result) => {
      const dataMessage = result.map((item) => {
        const today = getDate(new Date())
        const chatDate = getDate(item.createdAt)
        if (today === chatDate) {
          item.createdAt = moment(item.createdAt).format('LT');
        } else {
          item.createdAt = moment(item.createdAt).format('l')
        }
        return item;
      });
      helpers.response(res, dataMessage, 200);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  getMessageById,
};
