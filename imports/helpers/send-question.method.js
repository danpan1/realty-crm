import {Meteor} from 'meteor/meteor';
import {Email} from 'meteor/email';
Meteor.methods({
  sendQuestion
});

function sendQuestion (info) {
  let phone = info.phone.toString();
  phone = phone.slice(0,1) + ' (' + phone.slice(1,4) + ') ' + phone.slice(4,7) + '-' + phone.slice(7,9) + '-' + phone.slice(9,11);
  
  var list = `
    <table style="width:550px; margin:0 auto; padding: 0 15px;">
        <tbody>
            <table style="width:520px; margin:0 auto; font-family:arial; font-size: 14px;">
                <tbody>
                    <tr>
                        <td style="width:55%">
                            <img src="http://world-invest.pro/img/logo.jpg">
                        </td>
                        <td style="width:25%; line-height: 18px;">
                            <span>
                            ${info.username}<br>
                            ${phone}<br>
                            ${info.useremail}
                            </span>
                        </td>
                    </tr>
                <tbody>
            </table>
            <center>
                <img src="http://world-invest.pro/img/shadow_1.jpg">
            </center>
            <table style="width:520px; margin:0 auto; font-family:arial; font-size: 14px; line-height: 22px; text-align:justify;">
                <tbody>
                    <tr>
                        <td>
                            <p style="font-size:20px;">${info.topic}</p>
                            <p>${info.addedinfo}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </tbody>
    </table>
    `
  
  if (Meteor.isServer) {
    console.log('server email question');
    Email.send({
      to: 'superdenceo@gmail.com, danpan@yandex.ru',
      from: info.useremail ? info.username+' <'+ info.useremail+'>' : 'postmaster@e.getrent.pro',
      subject: info.topic,
      html: list
    });
  }
  
}
