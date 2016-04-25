/* Danpan
 Пришлось сделать с 0 чтобы словари грузились
 раньше схем в которых они используются*/
Meteor.dictionary = {
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
    {id: 0, name: 'Панельный'},
    {id: 1, name: 'Монолитно-кирпичный'},
    {id: 2, name: 'Монолитный'},
    {id: 3, name: 'Блочный'},
    {id: 4, name: 'Кирпичный'},
    {id: 5, name: 'Деревянный'},
    {id: 6, name: 'Сталинский'}
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
  roomcount: ['1', '2', '3', '4+'],
  type: [
    {id: 3, name: 'посуточно'},
    {id: 4, name: 'длительный срок'}
  ],
  windowView: [
    {id: 0, name: 'Панорамный вид'},
    {id: 1, name: 'Вид на двор'},
    {id: 2, name: 'Вид на проезжую часть'}
  ],
};