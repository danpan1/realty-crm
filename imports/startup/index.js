import {Meteor} from 'meteor/meteor';
// import {Realty} from '../realty';
// import {Clients} from '../clients';
Meteor.startup(function () {
  process.env.MAIL_URL = "smtp://postmaster@e.getrent.pro:d97a939b0dd55b626aec13e78cd559a3@smtp.mailgun.org:587";
  
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
