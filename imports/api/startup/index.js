import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty';
import {Clients} from '../clients';
import getUniqueId from '../helpers/getUniqueId';
Meteor.startup(function () {
  /*let t = getUniqueId(Realty);
  console.log(t);
  t = getUniqueId(Realty);
  console.log(t);
  t = getUniqueId(Realty);
  console.log(t);*/
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
