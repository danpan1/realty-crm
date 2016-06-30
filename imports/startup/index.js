import {Meteor} from 'meteor/meteor';
// import {Realty} from '../realty';
// import {Clients} from '../clients';
Meteor.startup(function () {
  process.env.MAIL_URL = "smtp://object@e.getrent.pro:4KtnYEN7CJyj@smtp.mailgun.org:587";
});
/*Meteor.startup(function () {
  smtp = {
    username: 'ilya.karev1000@mail.ru',   // eg: server@gentlenode.com
    password: 'futurama1000',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.mail.ru',  // eg: mail.gandi.net
    port: 25
  }
  process.env.MAIL_URL = 'smtp://ilya.karev1000%40mail.ru:futurama1000@smtp.mail.ru:25';
});*/
//

