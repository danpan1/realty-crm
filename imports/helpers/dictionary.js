/* Danpan
 Пришлось сделать с 0 чтобы словари грузились
 раньше схем в которых они используются*/
export const dictionary = {
  balcony: [
    {id: 0, name: '0'},
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'}
  ],
  bathroom: [
    {id: 0, name: 'Совместный'},
    {id: 1, name: 'Раздельный'},
    {id: 2, name: '2 санузла'},
    {id: 3, name: '3 санузла'}
  ],
  clientStatuses: ['archive', 'realtor', 'hot'],
  composition: [
    {id: 0, name: 'Для всех'},
    {id: 1, name: 'Семейная пара'},
    {id: 2, name: 'Одна женщина'},
    {id: 3, name: 'Две женщины'},
    {id: 4, name: 'Один мужчина'},
    {id: 5, name: 'Двое мужчин'},
    {id: 6, name: 'Более двух человек'}
  ],
  conditions: [
    // {id: 'phone', name: 'Телефон', cian : 'телефон'},
    {id: 'animal', name: 'С животными', cian: 'можно с животными'},
    {id: 'balcony', name: 'Балкон', cian: 'балкон'},
    {id: 'bathroom', name: 'Ванна', cian: ''},
    {id: 'children', name: 'С детьми', cian: 'можно с детьми'},
    {id: 'conditioner', name: 'Кондиционер', cian: 'кондиционер'},
    {id: 'dishWasher', name: 'Посудомойка', cian: 'посудомоечная машина'},
    {id: 'elevator', name: 'Лифт', cian: ''},
    {id: 'furniture', name: 'Мебель', cian: 'жилая мебель'},
    {id: 'kitchen_furniture', name: 'Кух. мебель', cian: 'кухонная мебель'},
    {id: 'refrigerator', name: 'Холодильник', cian: 'холодильник'},
    {id: 'shower', name: 'Душевая кабина', cian: ''},
    {id: 'tv', name: 'Телевизор', cian: 'телевизор'},
    {id: 'washer', name: 'Стир. машина', cian: 'стиральная машина'},
    {id: 'wifi', name: 'Интернет', cian: 'интернет'}
  ],
  customerQualification: [
    {id: 0, name: 'Турист'},
    {id: 1, name: 'Ищет'},
    {id: 2, name: 'Горячий'}
  ],
  deposit: [
    {id: 0, name: 'с залогом'},
    {id: 1, name: 'без залога'}
  ],
  elevator: [
    {id: 0, name: '0'},
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'}
  ],
  isNewBuilding: [
    {id: 0, name: 'Вторичка'},
    {id: 1, name: 'Новостройка'}
  ],
  materials: [
    {id: 0, name: 'Панельный', cian: 'панельный'},
    {id: 1, name: 'Монолитно-кирпичный', cian: 'кирпично-монолитный'},
    {id: 2, name: 'Монолитный', cian: 'монолитный'},
    {id: 3, name: 'Блочный', cian: 'блочный'},
    {id: 4, name: 'Кирпичный', cian: 'кирпичный'},
    {id: 5, name: 'Деревянный', cian: ''},
    {id: 6, name: 'Сталинский', cian: 'сталинский'}
  ],
  //квалификация собственника от колл-центра
  operation: [
    {id: 0, name: 'Аренда'},
    {id: 1, name: 'Продажа'}
  ],
  //квалификация собственника от колл-центра
  qualification: [
    {id: 0, name: 'Плохой'},
    {id: 1, name: 'Нормальный'},
    {id: 2, name: 'Лояльный'}
  ],
  renovation: [
    {id: 0, name: 'Косметический'},
    {id: 1, name: 'Чистовая отделка'},
    {id: 2, name: 'Отделка дорогими материалами'},
    {id: 3, name: 'Качественный'},
    {id: 4, name: 'Капитальный'}
  ],
  roomcount: [
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 99, name: '4+'}
  ],
  roomcountBig: [
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'},
    {id: 5, name: '5'},
    {id: 6, name: '6'},
    {id: 7, name: '7'},
    {id: 8, name: '8'},
    {id: 9, name: '9'},
    {id: 98, name: '10+'}
  ],
  transport: [
    {id: 0, name: 'пешком'},
    {id: 1, name: 'транспортом'}
  ],
  type: [
    {id: 3, name: 'посуточно'},
    {id: 4, name: 'длительный срок'}
    //{id: 2, name: ''},
    //{id: 3, name: 'посуточно'},
    //{id: 4, name: 'длительный срок'}
  ],
  windowView: [
    {id: 0, name: 'Панорамный вид'},
    {id: 1, name: 'Вид на двор'},
    {id: 2, name: 'Вид на проезжую часть'}
  ]
};
