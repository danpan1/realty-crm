/**
 * Created by Danpan on 26.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const RelationsSchema = new SimpleSchema({
  _id: { // Уникальный ID связи
    type: String,
    optional: true
  },
  clientId: { // Какой объект привязан
    type: String,
    optional: true
  },
  createdAt:{
    type: Date,
    optional: true
  },
  answer: { // Ответ , если предложение
    type: Boolean,
    optional: true
  },
  hide: { // Спрятать
    type: Boolean,
    optional: true
  },
  isOffer: { // Предложение или выбрал сам
    type: Boolean,
    optional: true
  },
  read: { // Прочитано или не прочитано
    type: Boolean,
    optional: true
  },
  realtyId: { // Какой объект привязан
    type: String,
    optional: true
  }
});
