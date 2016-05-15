import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty';
import {Clients} from '../clients';
Meteor.startup(function () {
  process.env.MAIL_URL = "smtp://postmaster@sandboxda8eb18d7e5543bd8bc37f1d7ca4558c.mailgun.org:8ecd0bf9bb24dd901e201018050cc801@smtp.mailgun.org:587";
  
  try {
    Realty.insert({_id: 'autoincrement', value: 0});
  } catch (err) {
    // Will always get here once the doc's in place, so just ignore
  }
  // console.log('Clients');
  try {
    Clients.insert({_id: 'autoincrement', value: 0});
  } catch (err) {
    // Will always get here once the doc's in place, so just ignore
  }
});
