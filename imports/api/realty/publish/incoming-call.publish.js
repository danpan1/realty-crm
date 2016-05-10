import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model';
import {_} from 'meteor/underscore';
import {Counts} from 'meteor/tmeasday:publish-counts';

if (Meteor.isServer) {
  Meteor.publish('incomingCall', function (options, street) {
      let selector = {};
      // console.log('incomingCall, street - ', street);
      // if(Roles.userIsInRole(this.userId, ['realtor'])) {

      // selector = {status: 'sale'};
      // console.log(street);
      // console.log('street.data', street.street.data);
      if (street && street.data && street.data.street) {
        console.log('incomingCall, street - ', street.data.street);
        selector['address.meta.street'] = street.data.street;
      }
      Counts.publish(this, 'realtyCount', Realty.find(selector), {noReady: true});

      // }

      //Отдаем объекты недвижимости если у юзера есть роль бизнес
      // if(Roles.userIsInRole(this.userId, ['business'])) {
      options.fields = {
        image: 1,
        price: 1,
        title: 1,
        'parseDetails.UID': 1,
        'parseDetails.images': 1,
        'address.metroName': 1,
        'address.street': 1,
        'address.meta.house': 1,
        'address.areaName': 1,
        'address.districtName': 1,
        'operator.qualification': 1,
        'details.renovation': 1,
        'details.descr': 1,
        contacts: 1,
        'realtor.id': 1,
        roomcount: 1,
        square: 1,
        floor: 1,
        floormax: 1,
        status: 1
      };
      console.log(selector);
      return Realty.find(selector, options);
      // }

    }
  );
}
