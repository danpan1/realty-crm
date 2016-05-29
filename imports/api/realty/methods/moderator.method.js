import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {Roles} from 'meteor/alanning:roles';
Meteor.methods({
  moderatorGet,
  moderatorSave
});
function moderatorGet() {

  //TODO findAnModify
  if (Meteor.isServer && this.userId && Roles.userIsInRole(this.userId, 'staff') ) {

    let realty, call;

    realty = Realty.findOne({
      'moderator.status': 'inprogress'
      // , 'moderator.id': Meteor.userId()
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
        $set: {'moderator.status': 'inprogress', 'moderator.id': Meteor.userId()}
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

  if (Meteor.isServer && this.userId && Roles.userIsInRole(this.userId, 'staff')) {
    realty.moderator.id = Meteor.userId();
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
