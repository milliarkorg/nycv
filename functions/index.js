const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer')
admin.initializeApp()
require('dotenv').config()

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env

exports.sendEmailNotification = functions.firestore.document('submissions/{docId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    let authData = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD
      }
    });
    authData.sendMail({
      from: 'any@any.com',
      to: 'c.frinkaneto@gmail.com',
      subject: 'subject here',
      text: `Novo contato recebido de ${data.name}, cujo endereço de e-mail é ${data.email}, com a mensagem ${data.message} `
    }).then(res => console.log('notificação enviada com sucesso')).catch(err => console.log(err))
  })


