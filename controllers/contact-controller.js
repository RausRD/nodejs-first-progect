const Contact = require("../models/contact"); //імпортував модель тут, далі шукаю роут додавання поста
const createPath = require('../helpers/create-path')

const getContact = (req, res) => {
	const title = "Contacts";
  Contact.find()
    .then((contacts) => res.render(createPath("contacts"), { contacts, title }))
    .catch((err) => {
      console.log(err);
      res.render(createPath("error"), { title: "Error" });
    });
}

module.exports = {
	getContact
}