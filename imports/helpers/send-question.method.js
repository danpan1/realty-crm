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
      to: 'ilya.karev1000@gmail.com',
      from: info.useremail ? info.username+' <'+ info.useremail+'>' : 'postmaster@e.getrent.pro',
      subject: info.topic,
      html: info.addedinfo
    });
  }
  
}
