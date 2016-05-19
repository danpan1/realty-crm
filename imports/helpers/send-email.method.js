import {Meteor} from 'meteor/meteor';
import {Email} from 'meteor/email';
Meteor.methods({
  sendTest
});
function sendTest() {

  if (Meteor.isServer) {
    console.log('server emal');
    Email.send({
      to: 'danpan@yandex.ru',
      from: 'fdsfdsfsdf@email.com',
      subject: 'Test meteor mailgun',
      text: 'Test meteor mailgun.'
    });
  }
}
