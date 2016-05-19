/*
* Все данные от Дадата
* Возможно пригодятся
* Для решения спорных вопросов по поселениям например
* За основу взял fiasStreetId + текстовое поле дома для поиска https://habrahabr.ru/company/hflabs/blog/301014/
* */
import {Mongo} from 'meteor/mongo';
export const Dadata = new Mongo.Collection('dadata');

