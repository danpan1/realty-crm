/**
 * Created by Danpan on 26.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
/*Тут адрес который показывается на карточках в списках*/
export const AddressSchema = new SimpleSchema({
  areaId: {
    type: String,
    optional: true
  },
  areaName: {
    type: String,
    optional: true
  },
  city: {
    type: String,
    optional: true
  },
  country: {
    type: String,
    optional: true
  },
  districtId: {
    type: String,
    optional: true
  },
  districtName: {
    type: String,
    optional: true
  },
  flat: {
    type: String,
    max: 20,
    optional: true
  },
  house: {
    type: String,
    optional: true
  },
  meta: { // что не нужно в карточке и вообще возможно нен нужно
    type: Object,
    blackbox: true,
    optional: true
  },
  //TODO хранить метро по id или так прямо. И с пешком тоже не понятно
  metroId: {
    type:String,
    optional: true
  },
  metroName: {
    type:String,
    optional: true
  },
  metroPeshkom: {
    type: String,
    optional: true
  },
  street: {
    type: String,
    optional: true
  },
  subways: {
    type:Array,
    optional: true
  },
  'subways.$': {
    type:'String',
    optional: true
  },
  value: {
    type: String,
    optional: true
  }
});
