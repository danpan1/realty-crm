/**
 * Created by Danpan on 26.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
/*Тут адрес который показывается на карточках в списках*/
export const AdvertSchema = new SimpleSchema({
  avito:{
    type: Object,
    optional : true
  },
  'avito.premium':{
    type: Boolean,
    optional : true
  },
  'avito.vip':{
    type: Boolean,
    optional : true
  },
  'avito.select':{
    type: Boolean,
    optional : true
  },
  'avito.up':{
    type: Boolean,
    optional : true
  },
  'avito.noSetOff':{
    type: Boolean,
    optional : true
  },
  'avito.longTime':{
    type: Boolean,
    optional : true
  },
  cian:{
    type: Object,
    optional : true
  },
  irr:{
    type: Object,
    optional : true
  },
  yandex:{
    type: Object,
    optional : true
  }
});
