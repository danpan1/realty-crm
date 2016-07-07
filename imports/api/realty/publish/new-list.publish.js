import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model';
import {CountsDan} from '../../counts/counts.model';
import {Roles} from 'meteor/alanning:roles';
import {_} from 'meteor/underscore';
// import {Counts} from 'meteor/tmeasday:publish-counts';

if (Meteor.isServer) {
  Meteor.publish('newList', function (options, search) {
      let selector;
      if (this.userId) {
        selector = {
          $or: [
            {status: 'ocean'},
            {status: 'transaction', transactionUser: this.userId},
            {status: 'taken', 'realtor.id': this.userId}
          ]
        };
        console.log(' ==== search: =====')
        console.log(search)
        if (search) {
          console.log('search', search);

          let price = {};

          /* ЦЕНА ОТ И ДО*/
          if (search.priceFrom) {
            price.$gte = parseInt(search.priceFrom);
          }
          if (search.priceTo) {
            price.$lte = parseInt(search.priceTo);
          }
          if (!_.isEmpty(price)) {
            selector.price = price;
          }
          /* END ЦЕНА */

          /* ЭТАЖИ ОТ И ДО*/
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
          /* END ЭТАЖИ ОТ И ДО */

          /* КОЛИЧЕСТВО КОМНАТ */
          if (search.roomcount && !_.isEmpty(search.roomcount)) {
            let rooms = search.roomcount.map((item)=> {
              return item.id;
            });
            selector.roomcount = {$in: rooms};
          }
          /* END КОЛИЧЕСТВО КОМНАТ */

          /* ТИП ОПЕРАЦИИ 1-продажа квартир вторичных 2-долгосрочная аренда квартир */
          if (search.type) {
            selector.type = search.type;
          }
          if (search.status) {
            selector.status = search.status;
          }
          /*if (search.type == 1) {
           selector.type = {$in: [1,2]};
           } else {
           selector.type = {$in: [3,4]};
           }*/
          /* END ТИП ОПЕРАЦИИ */

          /* УДОБСТВА */
          if (search.conditions && !_.isEmpty(search.conditions)) {
            selector.conditions = {$all: search.conditions};
          }
          /* END УДОБСТВА */

          /* ВРЕМЯ ДО МЕТРО и Транспорт до метро */
          if (search.metroTime) {
            selector.metroTime = {$lte: search.metroTime};
            selector.metroTransport = search.metroTransport;
          }
          /* END ВРЕМЯ ДО МЕТРО */

          /* РАЙОНЫ МЕТРО */
          let query = [];
          if (search.districts && !_.isEmpty(search.districts)) {
            query.push({'address.districtId': {$in: search.districts}});
            query.push({'address.areaId': {$in: search.districts}});
          }

          if (search.subways && !_.isEmpty(search.subways)) {
            query.push({'address.subway.id': {$in: search.subways}});
          }

          if (search.street) {
            selector['address.street'] = search.street;
            if (search.house) {
              selector['address.house'] = search.house;
            }
          }
          
          /*if (search.street) {
            query.push({'address.street' : search.street});
            if (search.house) {
              query.push({'address.house' : search.house});
            }
          }*/

          if (query && !_.isEmpty(query)) {
            selector.$or[0].$or = query;
            selector.$or[1].$or = query;
            selector.$or[2].$or = query;
          }
          /* END РАЙОНЫ МЕТРО */

        }
        // Counts.publish(this, 'realtyCount', Realty.find(selector), {noReady: true});

        //TODO раскомментить только то что надо на клиенте
        options.fields = {
          'address.subwaysEmbedded': 1,
          'address.subway': 1,
          'address.metroTime': 1,
          'address.metroTransport': 1,
          'details.descr': 1,
          'details.renovation': 1,
          'details.images.url': 1,
          'details.conditions': 1,
          'realtor.isExclusive': 1,
          'owner.comission': 1,
          'owner.isComission': 1,
          'operator.comment': 1,
          'operator.oceanAdd': 1,
          'operator.meetingTime': 1,
          createdAt: 1,
          floor: 1,
          floormax: 1,
          image: 1,
          price: 1,
          roomcount: 1,
          square: 1,
          status: 1,
          type: 1
        };
        console.log("=====selector: ");
        console.log(selector);
        let realty = Realty.find(selector, options);
        let count = realty.count();
        console.log("====realty.count(): " + realty.count())
        let countId = CountsDan.upsert({_id: this.userId}, {count: count});
        CountsDan.find({_id: countId});
        return [realty, CountsDan.find({_id: this.userId})];
      }

    }
  );
}
