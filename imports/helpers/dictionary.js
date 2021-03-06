/* Danpan
 Пришлось сделать с 0 чтобы словари грузились
 раньше схем в которых они используются*/
export const dictionary = {
  advertPlans: [
    {id: 0, name: 'Минимальная', firstWeek : 362, nextWeek : 192, month : 1000},
    {id: 1, name: 'Эффективная', firstWeek : 1407, nextWeek : 1007, month : 4500},
    {id: 2, name: 'Максимальная', firstWeek : 4000, nextWeek : 1607, month : 8800}
  ],
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
  bulletTypes: [
    {id: 0, name: '1-к 30000 - 50000'},
    {id: 1, name: '2-к 35000 - 60000'},
    {id: 2, name: '3-к 45000 - 90000'}
  ],
  bulletPrice: [
    {id: 0, name: '1-к 30000 - 50000'},
    {id: 1, name: '2-к 35000 - 60000'},
    {id: 2, name: '3-к 45000 - 90000'}
  ],
  clientStatuses: ['archive', 'realtor', 'hot'],
  communal: [
    {id: 0, name: 'включены в стоимость'},
    {id: 1, name: 'плюс коммунальные'},
    {id: 2, name: 'сверх только вода и свет'}
  ],
  composition: [
    {id: 0, name: 'Для всех', cianId : 1},
    {id: 1, name: 'Семейная пара', cianId : 2},
    {id: 2, name: 'Одна женщина', cianId : 3},
    {id: 3, name: 'Две женщины', cianId : 3},
    {id: 4, name: 'Один мужчина', cianId : 4},
    {id: 5, name: 'Двое мужчин', cianId : 4},
    {id: 6, name: 'Более двух человек', cianId : 1}
  ],
  conditions: [
    // {id: 'phone', name: 'Телефон', cian : 'телефон'},
    {id: 'animal', name: 'Можно с животными', cian: 'можно с животными', avito : 'Можно с питомцами', cianId : 'pets'},
    //{id: 'balcony', name: 'Балкон', cian: 'балкон', avito : 'Балкон / лоджия', cianId : 'balcon'},
    //{id: 'bathroom', name: 'Ванна', cian: '', avito : '', cianId : 'bath'},
    {id: 'children', name: 'Можно с детьми', cian: 'можно с детьми', avito : 'Можно с детьми', cianId : 'kids'},
    {id: 'conditioner', name: 'Кондиционер', cian: 'кондиционер', avito : 'Кондиционер', cianId : 'conditioner'},
    {id: 'dishWasher', name: 'Посуд. машина', cian: 'посудомоечная машина', avito : '', cianId : 'dishwasher'},
    //{id: 'elevator', name: 'Лифт', cian: '', avito : '', cianId : ''},
    {id: 'furniture', name: 'Мебель в комнатах', cian: 'жилая мебель', avito : '', cianId : 'mebel'},
    {id: 'kitchen_furniture', name: 'Мебель на кухне', cian: 'кухонная мебель', avito : '', cianId : 'mebel_kitchen'},
    {id: 'refrigerator', name: 'Холодильник', cian: 'холодильник', avito : 'Холодильник', cianId : 'rfgr'},
    //{id: 'shower', name: 'Душевая кабина', cian: '', avito : '', cianId : 'shower'},
    {id: 'tv', name: 'Телевизор', cian: 'телевизор', avito : 'Телевизор', cianId : 'tv	'},
    {id: 'washer', name: 'Стир. машина', cian: 'стиральная машина', avito : 'Стиральная машина', cianId : 'wm'},
    {id: 'wifi', name: 'Интернет', cian: 'интернет', avito :'Wi-Fi', cianId : 'internet'}
  ],
  customerQualification: [
    {id: 0, name: 'Турист'},
    {id: 1, name: 'Ищет'},
    {id: 2, name: 'Горячий'}
  ],
  deposit: [
    {id: 0, name: 'Есть'},
    {id: 1, name: 'Нет'},
    {id: 2, name: 'Готов разбить'},
    {id: 3, name: '50% месячной ставки'}
  ],
  depositSum: [
    {id: 0, name: 'Без залога'},
    {id: 1, name: '0,5 месяца'},
    {id: 2, name: '1 месяцу'},
    {id: 3, name: '1,5 месяца'},
    {id: 4, name: '2 месяцам'}
  ],
  depositTime: [
    {id: 0, name: '1 мес.'},
    {id: 1, name: '2 мес.'},
    {id: 2, name: '3 мес.'}
  ],
  elevator: [
    {id: 0, name: '0'},
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'}
  ],
  filterType: [
    {id: 0, name: 'Аренда "Эконом"', codename: 'econom', max: 25},
    {id: 1, name: 'Аренда "Бизнес"', codename: 'business', max: 25},
    {id: 2, name: 'Аренда "Премиум"', codename: 'premium', max: 25},
    {id: 3, name: 'Аренда "Я все могу"', codename: 'all', max: 75}
    /*{id: 1, name: 'Продажа'},
    {id: 2, name: 'Аренда и Продажа'},*/
  ],
  isNewBuilding: [
    {id: 0, name: 'Вторичка'},
    {id: 1, name: 'Новостройка'}
  ],
  rentDuration: [
    {id: 0, name: 'Длительный'},
    {id: 1, name: 'Посуточно'}
  ],
  materials: [
    {id: 0, name: 'Панельный', cian: 'панельный', avito : 2, cianFeed : 1, avitoFeed : 'Панельный'},
    {id: 1, name: 'Монолитно-кирпичный', cian: 'кирпично-монолитный', avito : 'отсутсвует', cianFeed : 4, avitoFeed : 'Монолитный'},
    {id: 2, name: 'Монолитный', cian: 'монолитный', avito : 4, cianFeed : 3, avitoFeed : 'Монолитный'},
    {id: 3, name: 'Блочный', cian: 'блочный', avito : 3, cianFeed : 5, avitoFeed : 'Блочный'},
    {id: 4, name: 'Кирпичный', cian: 'кирпичный', avito : 1, cianFeed : 2, avitoFeed : 'Кирпичный'},
    {id: 5, name: 'Деревянный', cian: '', avito : 5, cianFeed : 6, avitoFeed : 'Деревянный'},
    {id: 6, name: 'Сталинский', cian: 'сталинский', avito : 'отсутсвует', cianFeed : 7, avitoFeed : 'Кирпичный'}
  ],
  //квалификация собственника от колл-центра
  operation: [
    {id: 0, name: 'Аренда'},
    {id: 1, name: 'Продажа'}
  ],
  ownerQty: [
    {id: 0, name: '1'},
    {id: 1, name: '2'},
    {id: 2, name: '3+'}
  ],
  //квалификация собственника от колл-центра
  qualification: [
    {id: 0, name: 'Плохой'},
    {id: 1, name: 'Нормальный'},
    {id: 2, name: 'Лояльный'}
  ],
  priceList: [
    {id: 0, price: 60,   descr: 'common'},  // Обычные объекты
    {id: 1, price: 500,  descr: 'meetingOrComission50'},  // Встреча ИЛИ платит комиссию < 50%
    {id: 2, price: 750,  descr: 'meetingAndComission50'},  // Встреча + платит комиссию < 50%
    {id: 3, price: 1000, descr: 'comission100'},  // Комиссия > 50%
    {id: 4, price: 1250, descr: 'meetingAndComission100'},  // Встреча + платит комиссию > 50%
    {id: 5, price: 2000, descr: 'exclusive'},  // Эксклюзив
    {id: 6, price: 2400, descr: 'excMeetOrExcCom50'},  // Эксклюзив + Встреча ИЛИ Эксклюзив + Платит комиссию < 50%
    {id: 7, price: 2500, descr: 'excMeetCom50'},  // Эксклюзив + Встреча + Платит комиссию < 50%
    {id: 8, price: 2750, descr: 'excCom100'},  // Эксклюзив + Платит комиссию > 50%
    {id: 9, price: 3000, descr: 'excMeetCom100'},  // Эксклюзив + Встреча + Платит комиссию > 50%
  ],
  renovation: [
    {id: 0, name: 'Косметический', cianId : 1},
    {id: 1, name: 'Евроремонт', cianId : 2},
    {id: 2, name: 'Дизайнерский', cianId : 3},
    {id: 3, name: 'Чистовая отделка', cianId : 1},
    {id: 4, name: 'Бабушкин ремонт', cianId : 1},
    {id: 5, name: 'Вторичка', cianId : 1},
    {id: 6, name: 'Новостройка', cianId : 2}
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
  showTime: [
    {id: 0, name: 'По договоренности'},
    {id: 1, name: 'В любое время'},
    {id: 2, name: 'Только вечером'}
  ],
  transport: [
    {id: 0, name: 'пешком'},
    {id: 1, name: 'трансп.'}
  ],
  type: [
    {id: 1, name: 'вторичка'},
    {id: 2, name: 'новостройка'},
    {id: 3, name: 'посуточно'},
    {id: 4, name: 'длительный срок'}
    //{id: 2, name: ''},
    //{id: 3, name: 'посуточно'},
    //{id: 4, name: 'длительный срок'}
  ],
  windowView: [
    {id: 0, name: 'Панорамный вид', cianId : 3},
    {id: 1, name: 'Вид на двор', cianId : 1},
    {id: 2, name: 'Вид на проезжую часть', cianId : 2}
  ]
};
