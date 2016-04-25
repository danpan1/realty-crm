/**
 * Created by Danpan on 26.03.16.
 */


AdSchema = new SimpleSchema({
  admanId: { //id
    type: String,
    optional: true
  },
  sale_title: { // Продающий заголовок
    type: String,
    optional: true
  },
// Продающее описание объекта
  sale_descr: {
    type: String,
    optional: true
  }
});


