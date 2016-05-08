/**
 * Created by Danpan on 26.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const AdSchema = new SimpleSchema({
  admanId: { //id
    type: String,
    optional: true
  },
  saleTitle: { // Продающий заголовок
    type: String,
    optional: true
  },
  // Продающее описание объекта
  saleDescr: {
    type: String,
    optional: true
  }
});
