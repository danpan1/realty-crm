import {Meteor} from 'meteor/meteor';
import {Email} from 'meteor/email';
Meteor.methods({
  sendQuestion
});

function sendQuestion (info) {
  // email = info.useremail ? info.useremail : '';
  let phone = info.phone.toString();
  // phone = phone.slice(0,1) + ' (' + phone.slice(1,4) + ') ' + phone.slice(4,7) + '-' + phone.slice(7,9) + '-' + phone.slice(9,11);

  if (Meteor.isServer) {
    console.log('server email question' + `${phone} ${info.name}`);
    Email.send({
      to: 'mirestate.reg@gmail.com',
      from: 'postmaster@e.getrent.pro',
      subject: `${phone} ${info.name}`,
      html: '<div>Зарегитрирован новый пользователь</div>'
    });
  }
  
}
