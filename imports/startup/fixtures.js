/**
 * Created by Danpan on 16.04.16.
 */
import { Meteor } from 'meteor/meteor';
import { Parties } from '/imports/api/parties/';

Meteor.startup(() => {
  if (Parties.find().count() === 0) {
  const parties = [{
    'name': 'Dubstep-Free Zone',
    'description': 'Fast just got faster with Nexus S.'
  }, {
    'name': 'All ewrtwert all the time',
    'description': 'Get i  t on!'
  }, {
    'name': 'Savage lounging',
    'description': 'Leisure suit required. And only fiercest manners.'
  }];

  parties.forEach((party) => {
    Parties.insert(party)
});
}
});