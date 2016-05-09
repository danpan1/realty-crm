/**
 * Created by Danpan on 27.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
export const ParseDetailsSchema = new SimpleSchema({
  UID: { // UID приходит от Парсера
    type: Number,
    label: 'UID',
    optional: true,
    max: 999999999
  },
  credate: { // дата создания от Парсера
    type: Date,
    optional: true,
    label: 'credate'
  },
  source: {  // источник . 2 - авито
    type: Number,
    label: 'source',
    optional: true,
    max: 9
  },
  images: { // При парсинге из строки делается Array
    type: Array,
    label: 'images Parsed',
    optional: true
  },
  'images.$': { //url картинки
    type: String,
    label: 'images.[]',
    optional: true
  },
  url: {  // URL
    type: String,
    optional: true,
    label: 'url'
  },
  city: {
    type: String,
    optional: true
  },
  address: {
    type: String,
    optional: true
  },
  metro: {
    type: String,
    optional: true
  },
  area: {
    type: String,
    optional: true
  },
  geo: {  // URL
    type: Object,
    optional: true,
    blackbox: true

  }
});