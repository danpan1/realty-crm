/**
 * Created by Danpan on 26.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
/*Тут адрес который показывается на карточках в списках*/
export const clientNeedSchema = new SimpleSchema({
  districts: {// районы
    type: [String],
    optional: true
  },
  conditions: {// районы
    type: [String],
    optional: true
  },
  renovation: {// ремонт
    type: [Number],
    optional: true
  },
  embedded:{
    type: Object,
    blackbox: true,
    optional: true
  },
  price: {  // Цена
    type: Number,
    optional: true
  },
  roomcount: { //комнат
    type: [Number],
    optional: true
  },
  subways: { // Метро
    type: [String],
    optional: true
  },
  metroTime: {
    type: Number,
    optional: true
  },
  metroTransport: {
    type: String,
    optional: true
  },
});
