import {Meteor} from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('photographers', function () {
    
    let options = {};
    options.fields = {
      'profile': 1,
      'emails': 1
    };

    return Meteor.users.find({'profile.photo':true}, options);
  });
}
