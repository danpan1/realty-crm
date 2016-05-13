// Отчеты о показах

// Realty.update({_id:'vvKJ89c56z9JNRikQ'}, { $addToSet:
// { reports:{ create_date:new Date('2016-04-07 14:00'),
// customer_name:'Иван', customer_phone:'89162234433' } } })
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {dictionary} from '../../dictionary';
export const ReportsSchema = new SimpleSchema({
  realtorId: {
    type: String,
    optional: true
  },
  demonstrationDate: {
    type: Date,
    optional: true
  },
  createDate: {
    type: String,
    label: 'Created report date',
    max: 100
  },
  sendDate: {
    type: String,
    label: 'Sended report date',
    max: 100,
    optional: true
  },
  // TODO Возможно customer потом будет ссылкой на другой объект, пока так
  customerName: {
    type: String,
    label: 'Customer report name',
    optional: true
  },
  customerPhone: {
    type: String,
    label: 'Customer report phone',
    optional: true
  },
  comment: {
    type: String,
    min: 10,
    optional: true
  },
  qualification: {
    type: Number,
    optional: true,
    label: 'Customer qualification ID',
    allowedValues: dictionary.customerQualification.map(function (item) {
      return item.id;
    })
  }
});
