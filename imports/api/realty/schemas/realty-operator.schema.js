/**
 * Created by Danpan on 27.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {dictionary} from '../../../helpers/dictionary';
export const RealtyOperatorSchema = new SimpleSchema({
  id: {
    type: String,
    max: 20,
    optional: true
  },
  callDate: {
    type: Date,
    optional: true
  },
  laterCall: {
    type: Date,
    optional: true
  },
  laterCount: {
    type: Number,
    max: 9,
    optional: true
  },
  qualification: {
    type: Number,
    label: 'Qualification operator',
    allowedValues: dictionary.qualification.map(function (item) {  // TODO не видит отсюда qualification
      return item.id;
    }),
    optional: true
  },
  comment: {
    type: String,
    max: 500,
    optional: true
  },
  oceanAdd: {
    type: Number,
    optional: true
  }
});