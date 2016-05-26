/**
 * Created by Danpan on 26.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const RelationsSchema = new SimpleSchema({
  new: {
    type: [String],
    optional: true
  },
  offers: {
    type: [String],
    optional: true
  },
  paid:{
    type: [String],
    optional: true
  },
  my: {
    type: [String],
    optional: true
  },
  saved: { // Спрятать
    type: [String],
    optional: true
  },
  hide: { // Предложение или выбрал сам
    type: [String],
    optional: true
  }
});
