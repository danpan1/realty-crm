/**
 * Created by Danpan on 27.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {dictionary} from '../../../helpers/dictionary';
export const RealtyRealtorSchema = new SimpleSchema({
  id: {
    type: String,
    max: 20,
    optional: true
  },
  phone: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    optional: true
  },
  realtorIdShort: {
    type: String,
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
    type: Boolean,
    optional: true
  },
  isCheckout: {
    type: Boolean,
    optional: true
  },
  // Комиссия, которую платит клиент риелтору
  clientCommission: {
    type: Number,
    optional: true
  },
  isClientCommission: {
    type: Boolean,
    optional: true
  },
  isKeys: {
    type: Boolean,
    optional: true
  },
  competitors: {
    type: Number,
    optional: true
  },
  clientpercent: {
    type: Number,
    optional: true
  },
  partnerpercent: {
    type: Number,
    optional: true
  }
});