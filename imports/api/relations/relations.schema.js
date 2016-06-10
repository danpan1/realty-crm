/**
 * Created by Danpan on 26.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const RelationsSchema = new SimpleSchema({
  new: {
    type: [Number],
    optional: true
  },
  offers: {
    type: [Number],
    optional: true
  },
  paid:{
    type: [Number],
    optional: true
  },
  my: {
    type: [Number],
    optional: true
  },
  saved: { // Спрятать
    type: [Number],
    optional: true
  },
  hide: { // Предложение или выбрал сам
    type: [Number],
    optional: true
  }
});
