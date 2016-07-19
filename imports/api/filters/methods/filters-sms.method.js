'use strict';
import {Meteor} from 'meteor/meteor';
import {Filters} from '../filters.model.js';
import {Clients} from '/imports/api/clients/clients.model.js';
import {dictionary} from '/imports/helpers/dictionary';
import {HTTP} from 'meteor/http';

Meteor.methods({
  sendFilterSms,
  changeUserGetSmsPremium
});

export function changeUserGetSmsPremium (isActive) {
    
  if (Meteor.isServer && Meteor.userId()) {
      Meteor.users.update({'_id':this.userId},{
        $set: {'profile.getSmsPremiumObjects':isActive}
      })
  } else{
      console.log('No Access');
  }
}

export function sendFilterSms(filter) {


  if (Meteor.isServer && Meteor.userId()) {
    // Если это премиум-объект
    if((filter.owner && filter.owner.isComission) || (filter.operator && filter.operator.meetingTime) || (filter.realtor && filter.realtor.isExclusive)) {
        
        let options = {};
        options.fields = {
           'profile.phone': 1
        };
        let users = Meteor.users.find({'profile.getSmsPremiumObjects':true},options).fetch();
        console.log(users);
        if (users) {
            let text = setText(filter);
            for(var i in users) {
                sendSms(text, users[i].profile.phone);
            }
        }

    // Если же это обычный объект
    } else {
    
        let filterParams = {isActive:true};
        let clientParams = {};

        if(filter.address.subway){
            console.log('subway: '+filter.address.subway);
            filterParams['filter.subways'] = {$in : [filter.address.subway.id, null]};
            clientParams['need.subways'] = {$in : [filter.address.subway.id, null]};
        }
        if(filter.address.metroTime){
            console.log(filter.address.metroTime+' min by ' + filter.address.metroTransport);
            //filterParams['filter.metroTime'] = {$in: [{$lte: filter.address.metroTime}, null]};
            filterParams['filter.metroTransport'] = {$in : [filter.address.metroTransport, null]};
            clientParams['need.metroTransport'] = {$in : [filter.address.metroTransport, null]};
        }
        if(filter.district){
            console.log('districts: '+filter.address.districts);
            filterParams['filter.districts'] = {$in : [filter.districts, null]};
            clientParams['need.districts'] = {$in : [filter.districts, null]};
        }
        if(filter.address.street){
            console.log('street: '+filter.address.street);
            filterParams['filter.street'] = {$in : [filter.address.street, null]};
        }
        if(filter.address.house){
            console.log('house: '+filter.address.house);
            filterParams['filter.house'] = {$in : [filter.address.house, null]};
        }
        if(filter.roomcount){
            console.log(filter.roomcount);
            let roomSearch =  {
                id: parseInt(filter.roomcount),
                name: ''+filter.roomcount
            }
            console.log('roomcount: '+roomSearch);
            filterParams['filter.roomcount'] = {$in : [roomSearch, null]};
            clientParams['need.roomcount'] = {$in : [filter.roomcount, null]};
        }
        if(filter.materials){
            console.log('materials: '+filter.materials);
            filterParams['filter.materials'] = {$in : [filter.materials, null]};
        }
        if(filter.details.renovation){
            console.log('renovation: '+filter.renovation);
            filterParams['filter.renovation'] = {$in : [filter.details.renovation, null]};
            clientParams['need.renovation'] = {$in : [filter.details.renovation, null]};
        }
        filterParams.$and = [];
        if (filter.floor) {
            filterParams.$and.push(
                { $or: [{ 'filter.floorFrom': { $lte: parseInt(filter.floor) }}, {'filter.floorFrom' : null}] },
                { $or: [{ 'filter.floorTo': { $gte: parseInt(filter.floor) }}, {'filter.floorTo' : null}] }
            )
        }
        if (filter.square) {
            filterParams.$and.push(
                { $or: [{ 'filter.squareFrom': { $lte: parseInt(filter.square) }}, {'filter.squareFrom' : null}] },
                { $or: [{ 'filter.squareTo': { $gte: parseInt(filter.square) }}, {'filter.squareTo' : null}] }
            )
        }
        clientParams.$and = [];
        if (filter.price) {
            filterParams.$and.push(
                { $or: [{ 'filter.priceFrom': { $lte: parseInt(filter.price) }}, {'filter.priceFrom' : null}] },
                { $or: [{ 'filter.priceTo': { $gte: parseInt(filter.price) }}, {'filter.priceTo' : null}] }
            )
            let clientPrice = parseInt(filter.price) + (parseInt(filter.price) / 10);
            clientParams.$and.push(
                { $or: [{ 'need.price': { $lte: parseInt(clientPrice) }}, {'need.price' : null}] }
            )
        }

        //console.log('============= filterParams: ');
        //console.log(filterParams);
        console.log('============= clientParams: ');
        console.log(clientParams);

        
        let options = {};
        options.fields = {
           'user.phone': 1
        };

        let foundFilters = Filters.find(filterParams,options).fetch();
        let foundClients = Clients.find(clientParams).fetch();

        console.log('============= foundClients: ');
        console.log(foundClients);

        Clients.update(clientParams,{
            $inc: {newObjects:1}
        })

        if (foundFilters) {
            let text = setText(filter);
            for(var i in foundFilters) {
                sendSms(text, foundFilters[i].user.phone);
            }
        }
    }
  }
}

function setText (filter) {
    let text = ''
    if(filter.realtor && filter.realtor.isExclusive) text += 'Эксклюзив. ';
    if(filter.owner && filter.owner.isComission) text += 'Комиссия '+filter.owner.comission+'%. ';
    if(filter.operator && filter.operator.meetingTime) {
        let meet = filter.operator.meetingTime;
        let meetingMonth = meet.getMonth();
        let meetingDate = meet.getDate();
        let meetingHour = meet.getHours();
        let meetingMinutes = meet.getMinutes();
        let nowDate = new Date().getDate();
        if (nowDate > meetingDate) {
            meetText = meetingDate+'.'+meetingDate+' '+meetingHour+':'+meetingMinutes;
        } else {
            var difference = meetingDate - nowDate;
            if (difference == 0) {
                meetText = 'сегодня в ' + meetingHour+':'+meetingMinutes;
            } else if (difference == 1) {
                meetText = 'завтра в ' + meetingHour+':'+meetingMinutes;
            } else {
                meetText = meetingDate+'.'+meetingDate+' '+meetingHour+':'+meetingMinutes;
            }
        }
        text += 'Встреча '+meetText+ '. ';
    }
    if(filter.roomcount) text += filter.roomcount+'к., ';
    if(filter.address.subway) {
        console.log(filter.address.subway)
        text += 'м.'+filter.address.subway.name+' '+filter.address.metroTime+' мин. '+dictionary.transport[filter.address.metroTransport].name+', ';
    }
    if(filter.details.renovation) text += dictionary.renovation[filter.details.renovation].name+', '
    if(filter.price) {
        var oldNumber = filter.price.toString().split('');
        var number = '';
        for(var i in oldNumber){
            if(oldNumber[i].match(/\d/)){
                number = number + oldNumber[i];
            }
        }
        number = number.split('').reverse().join('');
        number = number.length > 3 ? number.length > 6 ? number.length > 9 ? number.slice(0, 3) + ' ' + number.slice(3,6) +  ' ' + number.slice(6,9) + ' ' + number.slice(9) : number.slice(0, 3) + ' ' + number.slice(3,6) + ' ' + number.slice(6) :  number.slice(0, 3) + ' ' + number.slice(3) : number;
        number = number.split('').reverse().join('');
        text += number+' руб.';
    } 
    return text;
}

function sendSms (text, phone) {

    //let phoneI = 89600576854;

    let url = 'http://sms.ru/sms/send?api_id=EE7347FD-C2D0-0487-C5E0-4FFCD1886275&to=' + phone + '&text=' + text + ' миринедвижимость.рф/ocean';
    
    console.log(url);

    /*HTTP.post(url, false, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });*/

}