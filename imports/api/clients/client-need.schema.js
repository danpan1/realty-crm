/**
 * Created by Danpan on 26.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
/*Тут адрес который показывается на карточках в списках*/
export const clientNeedSchema = new SimpleSchema({
  embedded:{
    type: Object,
    blackbox: true
  },
  districts: {// районы
    type: [String],
    optional: true
  },
  priceFrom: {  // Цена от
    type: Number,
    optional: true
  },
  priceTo: {  // Цена до
    type: Number,
    optional: true
  },
  roomcount: { //комнат
    type: [String],
    optional: true
  },
  'roomcount.$': { //комнат
    type: String,
    optional: true
  },
  subways: { // Метро
    type: Array,
    optional: true
  },
  'subways.$': { // Метро
    type: String,
    optional: true
  }
});
