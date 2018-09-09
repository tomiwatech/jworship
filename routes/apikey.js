const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const config = require('../config');


/* GET users listing. */
router.get('/', function (req, res, next) {

  return res.status(200).json({
    message: 'Welcome to apikey',
  });

});


router.post('/', function (req, res, next) {

  const { fullname, email, message, gender, phone, category } = req.body;

  const formatedMessage = `${fullname} \n ${email} \n ${message} \n ${gender} \n ${phone} \n ${category}`;

  console.log(formatedMessage);

  if (config.sendGridKey == "") {
    return res.status(400).json({
      message: 'Please Supply Send Grid Key',
    });
  } else {
    sgMail.setApiKey(config.sendGridKey);

    const mail = {
      to: 'sannimichaelse@gmail.com',
      from: 'justworship77@gmail.com',
      subject: 'Just Worship - Home of Praise and Worship',
      html: `<br> Hello, we just got a new user attending our event hurray!!!!!<br>
            <br> Fullname : ${fullname}<br>
            <br> Email : ${email}<br>
            <br> Gender : ${gender}<br>
            <br> Message : ${message}<br>
            <br> phone : ${phone}<br>
            <br> Category : ${category}<br>
            `
    };

    sgMail.send(mail);

    return res.status(200).json({
      message: 'Email Sent',
    });
  }

});

module.exports = router;
