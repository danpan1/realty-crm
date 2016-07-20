/**
 * Created by Danpan on 26.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
/*Тут адрес который показывается на карточках в списках*/
export const AdvertSchema = new SimpleSchema({

  avito: {
    type: Object,
    optional: true
  },
  'avito.dateBegin': {
    type: Date,
    optional: true
  },
  'avito.dateEnd': {
    type: Date,
    optional: true
  },
  'avito.pushUp': {
    type: Number,
    optional: true
  },
  currentWeek: {
    type: Object,
    optional: true
  },
  'currentWeek.paid': {
    type: Boolean,
    optional: true
  },
  'currentWeek.date': {
    type: Date,
    optional: true
  },
  'currentWeek.plan': {
    type: Number,
    max : 3,
    optional: true
  },
  nextWeek: {
    type: Object,
    optional: true
  },
  'nextWeek.paid': {
    type: Boolean,
    optional: true
  },
  'nextWeek.plan': {
    type: Number,
    optional: true
  },
});
