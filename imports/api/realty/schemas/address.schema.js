/**
 * Created by Danpan on 26.03.16.
 */

/*Тут адрес который показывается на карточках в списках*/
AddressSchema = new SimpleSchema({
  value: {
    type: String,
    optional: true
  },
  flat: {
    type: String,
    max: 20,
    optional: true
  },
  street: {
    type: String,
    optional: true
  },
  areaId: {
    type: String,
    optional: true
  },
  areaName: {
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
  //TODO хранить метро по id или так прямо. И с пешком тоже не понятно
  metroId: {
    type:String,
    optional: true
  },
  metroName: {
    type:String,
    optional: true
  },
  subways: {
    type:Array,
    optional: true
  },
  "subways.$": {
    type:"String",
    optional: true
  },
  metroPeshkom: {
    type: String,
    optional: true
  },
  meta: { // что не нужно в карточке и вообще возможно нен нужно
    type: Object,
    blackbox: true,
    optional: true
  }
  /*meta: { // что не нужно в карточке и вообще возможно нен нужно
    type: AddressFullSchema,
    blackbox: true,
    optional: true
  }*/
});
