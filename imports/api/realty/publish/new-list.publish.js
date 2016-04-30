import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model';
import {_} from 'meteor/underscore';
if (Meteor.isServer) {
  Meteor.publish('newList', function (options, search) {
      let selector;
      // if(Roles.userIsInRole(this.userId, ['realtor'])) {
      selector = {
        status: 'list'

      };

      if (search) {
        console.log(search);
        if (search.UID) {
          selector.UID = +search.UID;
        }
        let price = {};
        if (search.priceFrom) {
          price.$gte = parseInt(search.priceFrom);
        }
        if (search.priceTo) {
          price.$lte = parseInt(search.priceTo);
        }
        if (!_.isEmpty(price)) {
          selector.price = price;
        }

        let floor = {};
        if (search.floorFrom) {
          floor.$gte = parseInt(search.floorFrom);
        }
        if (search.floorTo) {
          floor.$lte = parseInt(search.floorTo);
        }
        if (!_.isEmpty(floor)) {
          selector.floor = floor;
        }

        //values в виде строки
        if (search.roomcount && !_.isEmpty(search.roomcount)) {
          selector.roomcount = {$in: search.roomcount};
        }

        if (search.type) {
          selector.type = search.type;
        }

        let query = [];
        let locations = false;
        if (search.districts && !_.isEmpty(search.districts)) {
          locations = true;
          query.push({'address.districtId': {$in: search.districts}});
          query.push({'address.areaId': {$in: search.districts}});
        }

        if (search.subways && !_.isEmpty(search.subways)) {
          locations = true;
          query.push({'address.subways': {$in: search.subways}});
        }

        if (locations) {
          selector.$or = query;
        }

      }
      // Counts.publish(this, 'realtyCount', Realty.find(selector), {noReady: true});

      // }

      //Отдаем объекты недвижимости если у юзера есть роль бизнес
      // if(Roles.userIsInRole(this.userId, ['business'])) {
      options.fields = {
        image: 1,
        price: 1,
        title: 1,
        'parseDetails.UID': 1,
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
