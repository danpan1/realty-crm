import {Meteor} from 'meteor/meteor';

const doAutoincrement = function(collection, callback) {
  console.log('doAutoincrement');
  collection.rawCollection().findAndModify({
    _id: 'autoincrement'
  }, [], {
    $inc: {
      value: 1
    }
  }, {
    'new': true
  }, callback);
};

export default function nextAutoincrement(collection) {
    if(Meteor.wrapAsync(doAutoincrement)(collection)) return Meteor.wrapAsync(doAutoincrement)(collection).value;
    else return 0;
}
