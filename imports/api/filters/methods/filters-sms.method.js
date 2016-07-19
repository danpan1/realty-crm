'use strict';
import {Meteor} from 'meteor/meteor';
import {Filters} from '../filters.model.js';
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
    
        let params = {isActive:true}

        if(filter.address.subway){
            console.log('subway: '+filter.address.subway);
            params['filter.subways'] = {$in : [filter.address.subway.id, null]};
        }
        if(filter.address.metroTime){
            console.log(filter.address.metroTime+' min by ' + filter.address.metroTransport);
            //params['filter.metroTime'] = {$in: [{$lte: filter.address.metroTime}, null]};
            params['filter.metroTransport'] = {$in : [filter.address.metroTransport, null]};
        }
        if(filter.district){
            console.log('districts: '+filter.address.districts);
            params['filter.districts'] = {$in : [filter.districts, null]};
        }
        if(filter.address.street){
            console.log('street: '+filter.address.street);
            params['filter.street'] = {$in : [filter.address.street, null]};
        }
        if(filter.address.house){
            console.log('house: '+filter.address.house);
            params['filter.house'] = {$in : [filter.address.house, null]};
        }
        if(filter.roomcount){
            console.log(filter.roomcount);
            let roomSearch =  {
                id: parseInt(filter.roomcount),
                name: ''+filter.roomcount
            }
            console.log('roomcount: '+roomSearch);
            params['filter.roomcount'] = {$in : [roomSearch, null]};
        }
        if(filter.materials){
            console.log('materials: '+filter.materials);
            params['filter.materials'] = {$in : [filter.materials, null]};
        }
        if(filter.details.renovation){
            console.log('renovation: '+filter.renovation);
            params['filter.renovation'] = {$in : [filter.details.renovation, null]};
        }
        /*if(filter.conditions){
            console.log('conditions: '+filter.conditions);
            params['filter.conditions'] = filter.conditions;
        }*/
        params.$and = [];
        if (filter.floor) {
            params.$and.push(
                { $or: [{ 'filter.floorFrom': { $lte: parseInt(filter.floor) }}, {'filter.floorFrom' : null}] },
                { $or: [{ 'filter.floorTo': { $gte: parseInt(filter.floor) }}, {'filter.floorTo' : null}] }
            )

            //params['filter.floorFrom'] = { $lte: parseInt(filter.floor)};
            //params['filter.floorTo'] = {$gte : parseInt(filter.floor)};
        }
        if (filter.square) {
            params.$and.push(
                { $or: [{ 'filter.squareFrom': { $lte: parseInt(filter.square) }}, {'filter.squareFrom' : null}] },
                { $or: [{ 'filter.squareTo': { $gte: parseInt(filter.square) }}, {'filter.squareTo' : null}] }
            )

            //params['filter.squareFrom'] = {$lte : parseInt(filter.square)};
            //params['filter.squareTo'] = {$gte : parseInt(filter.square)};
        }
        if (filter.price) {
            params.$and.push(
                { $or: [{ 'filter.priceFrom': { $lte: parseInt(filter.price) }}, {'filter.priceFrom' : null}] },
                { $or: [{ 'filter.priceTo': { $gte: parseInt(filter.price) }}, {'filter.priceTo' : null}] }
            )
            //params['filter.priceFrom'] = {$lte : parseInt(filter.price)};
            //params['filter.priceTo'] = {$gte : parseInt(filter.price)};
        }

        console.log('============= params: ');
        console.log(params);

        
        let options = {};
        options.fields = {
           'user.phone': 1
        };

        let foundFilters = Filters.find(params,options).fetch();

        console.log(foundFilters);

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

    HTTP.post(url, false, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });

}