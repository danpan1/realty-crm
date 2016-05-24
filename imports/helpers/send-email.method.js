import {Meteor} from 'meteor/meteor';
import {Email} from 'meteor/email';
import {dictionary} from './dictionary';
Meteor.methods({
  sendTest
});

function sendTest (info, realty) {
  console.log(realty);
  let phone = realty.contacts[0].phones[0].phone.toString();
  phone = phone.slice(0,1) + ' (' + phone.slice(1,4) + ') ' + phone.slice(4,7) + '-' + phone.slice(7,9) + '-' + phone.slice(9,11);
  let transport = realty.address.metroTransport == 0 ? 'пешком' : 'транспортом';
  let price = realty.price.toString();
  price = price.split('').reverse().join('');
  price = price.length > 3 ? price.length > 6 ? price.length > 6 ? price.slice(0, 3) + ' ' + price.slice(3,6) +  ' ' + price.slice(6,9) + ' ' + price.slice(9) : price.slice(0, 3) + ' ' + price.slice(3,6) + ' ' + price.slice(6) :  price.slice(0, 3) + ' ' + price.slice(3) : price;
  price = price.split('').reverse().join('');
  let mainImage = `<img src="` + realty.image + `" style="margin: 6px 0;"><br/>`
  let images = ``;
  for(var i in realty.details.thumbnails){
      if(realty.details.thumbnails[i].url != realty.image) images += `<img src="` + realty.details.thumbnails[i].url + `" style="margin: 5px 0;"><br/>`
  }
  let materials = dictionary.materials[realty.details.materials].name;
  let renovation = dictionary.renovation[realty.details.renovation].name;
  let windows = dictionary.windowView[realty.details.windowView].name;
  let subways = realty.address.subwaysEmbedded != undefined ? realty.address.subwaysEmbedded[0].name : false;
  let subwayStation = subways ? `м.`+subways+', '+realty.address.metroTime+` мин. `+transport +`, `: '';
  let email = realty.contacts[0].email ? `<a href="mailto:`+realty.contacts[0].email+`" target="_blank">`+realty.contacts[0].email+`</a>` : '';
  let metro = ``;
  if(subways && realty.address.metroTime && transport) metro = `<b>Метро:</b> ${subways} ${realty.address.metroTime} мин. ${transport}<br>`
  // Площадь комнат: 100, 20, 40, 50, 60, 22
  //Апартаменты, Пентхаус<br>
  
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
                            ${realty.contacts[0].name}<br>
                            ${phone}<br>
                            ${email}
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
                            <p style="font-size:20px;">${realty.roomcount}-комнатная, ${subwayStation} ${price} руб.</p>
                            <p>${info.addedinfo}</p>
                            ${mainImage}
                            ${images}
                            <br>
                            <p>${realty.details.descr}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table style="width:520px; margin:0 auto; font-family:arial; font-size: 14px; line-height: 22px;">
                <tbody>
                    <tr>
                        <td valign="top" style="padding-right:15px;">
                            <b>Район:</b> ${realty.address.areaName}<br>
                            <b>Улица:</b> ${realty.address.street} ${realty.address.house} к.${realty.address.flat}<br>
                            ${metro}
                            <b>Тип здания:</b> ${materials}<br>
                            <b>Комнат:</b> ${realty.roomcount}-комнатная<br>
                            <b>Ремонта:</b> ${renovation}<br>
                            <b>Этаж:</b> ${realty.details.livingSquare} из ${realty.details.livingSquare}<br>
                            <b>Окна:</b> ${windows}<br>
                            <b>Цена:</b> ${price}<br>
                            <b>Комиссия:</b> ${realty.realtor.clientpercent}%
                        </td>
                        <td valign="top" style="padding-left:60px;">
                            <b>Общая площадь:</b> ${realty.square} м²<br>
                            <b>Жилая площадь:</b> ${realty.details.livingSquare} м²<br>
                            <b>Площадь кухни:</b> ${realty.details.kitchenSquare} м²<br>
                            <b>Лоджия:</b> ${realty.details.loggia}<br>
                            <b>Балкон:</b> ${realty.details.balcony}<br>
                            <b>Пассажирских лифтов:</b> ${realty.details.elevator}<br>
                            <b>Грузовых лифтов:</b> ${realty.details.elevatorBig}
                        </td>
                    </tr>
                </tbody>
            </table>
            <br><br>
            <center>
                <img src="http://world-invest.pro/img/shadow_2.jpg">
            </center>
            <br>
            <table style="width:520px; margin:0 auto; font-family:arial; font-size: 14px;">
                <tbody>
                    <tr>
                        <td style="width:55%">
                            <img src="http://world-invest.pro/img/logo.jpg">
                        </td>
                        <td style="width:25%; line-height: 18px;">
                            <span>
                                ${realty.contacts[0].name}<br>
                                ${phone}<br>
                                ${email}
                            </span>
                        </td>
                    </tr>
                </tbody>
                </table>
            </td>
            </tr>
        </tbody>
    </table>
    `
  
  if (Meteor.isServer) {
    console.log('server email');
    Email.send({
      to: info.emails,
      from: info.useremail ? info.username+' <'+ info.useremail+'>' : 'postmaster@e.getrent.pro',
      subject: info.topic,
      html: list
    });
  }
  
}
