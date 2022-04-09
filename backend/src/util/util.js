const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ekaly.lalaina@gmail.com',
      pass: 'M1P9mean?'
    },
    tsl: {
        rejectUnauthorized: false,
    }
  });

function getMailOptionsDelivery(email){
    return {
        from: "ekaly.lalaina@gmail.com",
        to: email,
        subject: "Confirmation de livraison",
        text: "Bonjour, \nVotre commande a bien été livrée aujourd'hui. \nCordialement.",
    }
}

function sendMail(email){
    transporter.sendMail(getMailOptionsDelivery(email), (err, info)=>{
        if(err){
            throw err;
        }else{
            console.log(info.response);
        }
    })
}

module.exports = {
    sendMail,
}