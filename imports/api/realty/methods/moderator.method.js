import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
Meteor.methods({
  moderatorGet,
  moderatorSave
});
function moderatorGet() {

  //TODO findAnModify
  if (Meteor.isServer) {

    let realty, call;

    realty = Realty.findOne({
      'moderator.status': 'inprogress'
      // , 'moderator.id': this.userId
    }, {
      sort: {$natural: -1}
    });

    if (!realty) {
      console.log('todo');
      realty = Realty.findOne({'moderator.status': 'todo'}, {sort: {_id: -1}});
    }
    console.log('realty',realty);
    if (realty && realty._id) {
      Realty.update({_id: realty._id}, {
        $set: {'moderator.status': 'inprogress', 'moderator.id': this.userID}
      }, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('call recieved newObj');
        }
      });
      return realty;
    } else {
      console.log('notFound');
      return {};
    }

  }
}

function moderatorSave(realty) {

  if (Meteor.isServer) {
    realty.moderator.id = this.userId;
    realty.moderator.status = 'done';
    Realty.update({_id: realty._id}, {
      $set: realty
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('operator save success');
      }
    });
  }
}
