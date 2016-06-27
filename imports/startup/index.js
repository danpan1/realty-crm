import {Meteor} from 'meteor/meteor';
// import {Realty} from '../realty';
// import {Clients} from '../clients';
Meteor.startup(function () {
  process.env.MAIL_URL = "smtp://object@e.getrent.pro:4KtnYEN7CJyj@smtp.mailgun.org:587";
  
  // try {
  //   Realty.insert({_id: 'autoincrement', value: 0});
  // } catch (err) {
  //   // Will always get here once the doc's in place, so just ignore
  // }
  // // console.log('Clients');
  // try {
  //   Clients.insert({_id: 'autoincrement', value: 0});
  // } catch (err) {
  //   // Will always get here once the doc's in place, so just ignore
  // }
  // db.realty.insert({_id: 'autoincrement', value: 0});

});
