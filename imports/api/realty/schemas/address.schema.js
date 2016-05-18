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
    type: String
  },
  country: {
    type: String
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
    optional: true
  },
  loc: {
    type: [Number],
    optional: true
  },
  house: {
    type: String
  },
  meta: { // что не нужно в карточке и вообще возможно нен нужно
    type: Object,
    blackbox: true,
    optional: true
  },
  metroTransport: {
    type: Number
  },
  metroTime: {
    type: String
  },
  street: {
    type: String
  },
  streetFiasId: {
    type: String
  },
  // subways: { // ID метро
  //   optional: true,
  //   blackbox: true
  // },
  value: {
    type: String
  }
});
