import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model';
import {CountsDan} from '../../counts/counts.model';
import {Roles} from 'meteor/alanning:roles';
import {_} from 'meteor/underscore';
// import {Counts} from 'meteor/tmeasday:publish-counts';

if (Meteor.isServer) {
  Meteor.publish('newList', function (options, search, segmentsClient) {

      console.log('==== segmentsClient ====');
      console.log(segmentsClient);

      let selector;
      if (this.userId) {
        let segments = [];

        let econom = [{
          price: {$gte: 25000, $lt: 50000},
          roomcount: 1
        }, {
          price: {$gte: 30000, $lt: 60000},
          roomcount: 2
        }, {
          price: {$gte: 35000, $lt: 75000},
          roomcount: 3
        }];

        let business = [{
          price: {$gte: 50000, $lt: 75000},
          roomcount: 1
        }, {
          price: {$gte: 60000, $lt: 120000},
          roomcount: 2
        }, {
          price: {$gte: 70000, $lt: 150000},
          roomcount: 3
        }];

        let premium = [{
          price: {$gte: 75000},
          roomcount: 1
        }, {
          price: {$gte: 120000},
          roomcount: 2
        }, {
          price: {$gte: 150000},
          roomcount: 3
        }];
        
        if (!segmentsClient || segmentsClient[0] == undefined || segmentsClient.indexOf(3) > -1 ) {
          segments = segments.concat(econom);
          segments = segments.concat(business);
          segments = segments.concat(premium);
          console.log('segments none or 3');
          console.log(segments);
        } else {
          for (var i in segmentsClient) {
            if(parseInt(segmentsClient[i]) == 0) {
              segments = segments.concat(econom);
            }
            if(parseInt(segmentsClient[i]) == 1) {
              segments = segments.concat(business);
            }
            if(parseInt(segmentsClient[i]) == 2) {
              segments = segments.concat(premium);
            }
          }
          console.log('segments 0,1,2');
          console.log(segments);
        }

        selector = {
          // $and: [
          //   {
          //     $or: [
                // {status: 'ocean'},
                // {status: 'transaction', transactionUser: this.userId},
                // {status: 'taken', 'realtor.id': this.userId}
              // ]
            // }
          //   {
          //     $or: segments
          //   }
          // ]
        }
        ;
        if (search) {

          selector.type = {$in: [3, 4]};

          /*if (search.type !== undefined) {
            selector.type = search.type;
            if (search.type === 0) {
              selector.type = {$in: [3, 4]};
            }
            else if (search.type === 1) {
              selector.type = {$in: [1, 2]};
            }
            else if (search.type === 2) {
              selector.type = {$in: [1, 2, 3, 4]};
            }
          }*/

          /* КОЛИЧЕСТВО КОМНАТ */
          if (search.roomcount && !_.isEmpty(search.roomcount)) {
            let rooms = search.roomcount.map((item)=> {
              return item.id;
            });
            selector.roomcount = {$in: rooms};
          }
          /* END КОЛИЧЕСТВО КОМНАТ */

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

          /* ПЛОЩАДЬ ОТ И ДО*/
          let square = {};
          if (search.squareFrom) {
            square.$gte = parseInt(search.squareFrom);
          }
          if (search.squareTo) {
            square.$lte = parseInt(search.squareTo);
          }
          if (!_.isEmpty(square)) {
            selector.square = square;
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
          
          if (search.status) {
            selector.status = search.status;
          }
          
          /* ВРЕМЯ ДО МЕТРО и Транспорт до метро */
          // console.log(search.metroTime);
          if (search.metroTime) {
            selector['address.metroTime'] = {$lte: +search.metroTime};
            selector['address.metroTransport'] = search.metroTransport;
          }
          /* END ВРЕМЯ ДО МЕТРО */

          /* УДОБСТВА */
          if (search.conditions && !_.isEmpty(search.conditions)) {
            selector['details.conditions'] = {$all: search.conditions};
          }
          /* END УДОБСТВА */

          /* ТИП ДОМА */
          if (search.materials && !_.isEmpty(search.materials)) {
            selector['details.materials'] = {$in: search.materials};
          }
          /* END ТИП ДОМА */

          /* РЕМОНТ */
          if (search.renovation && !_.isEmpty(search.renovation)) {
            selector['details.renovation'] = {$in: search.renovation};
          }
          /* END РЕМОНТ */


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
            query.push({'address.street': search.street});
            if (search.house) {
              query.push({'address.house': search.house});
            }
          }

          if (query && !_.isEmpty(query)) {
            selector.$and.push({$or : query});
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
          'details.materials': 1,
          'details.images.url': 1,
          'details.conditions': 1,
          'realtor.isExclusive': 1,
          'realtor.comment': 1,
          'owner.comission': 1,
          'owner.isComission': 1,
          'operator.comment': 1,
          'operator.oceanAdd': 1,
          'operator.meetingTime': 1,
          'operator.oceanPrice': 1,
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
        console.log('SELECTOR:');
        console.log(selector);
        let realty = Realty.find(selector, options);
        let count = realty.count();
        let countId = CountsDan.upsert({_id: this.userId}, {count: count});
        CountsDan.find({_id: countId});
        return [realty, CountsDan.find({_id: this.userId})];
      }

    }
  )
  ;
}
