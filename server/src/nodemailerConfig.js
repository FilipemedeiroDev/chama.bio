const nodemailer = require('nodemailer');
const aws = require('aws-sdk')

const client = nodemailer.createTransport({
  SES: new aws.SES({
      apiVersion: '2010-12-01',
  })
});


module.exports = client;