/**
 * Created by Danpan on 27.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {dictionary} from '../../dictionary';
export const RealtyRealtorSchema = new SimpleSchema({
  id: {
    type: String,
    max: 20,
    optional: true
  },

  takeDate: {
    type: Date,
    optional: true
  },  //Время когда риэлтор нажал кнопку Взять
  reviewDate: {
    type: Date,
    optional: true
  },//Нажимает кнопку назначить дату просмотра
  // мнение о собственнике. после просмотра. комиссия эксклюзив
  qualification: {
    type: Number,
    label: 'Qualification realtor',
    allowedValues: dictionary.qualification.map(function (item) {
      return item.id;
    }),
    optional: true
  },
  comment: {
    type: String,
    optional: true,
    max: 500
  },
  isExclusive: {
    type: Number,
    allowedValues: [0, 1],
    optional: true
  },
  isCommission: {
    type: Number,
    allowedValues: [0, 1],
    optional: true
  },
  commission: {
    type: Number,
    optional: true
  },
  isKeys: {
    type: Number,
    allowedValues: [0, 1],
    optional: true
  },
  competitors: {
    type: Number,
    optional: true
  }
});