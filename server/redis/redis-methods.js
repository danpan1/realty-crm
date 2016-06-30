/**
 * Created by Danpan on 30.06.16.
 */
import {Meteor} from 'meteor/meteor';
import client from './db-connect';

let setnxKeyToBlock = function (key, callback) {
  client.set(key, 'world', 'NX', 'EX', 15, callback);
};

function setRedisKey(key) {
  return !!(Meteor.wrapAsync(setnxKeyToBlock)(key));
}

let deleteKey = function deleteKey(key, callback) {
  client.DEL(key, callback);
};

function delRedisKey(key) {
  return Meteor.wrapAsync(deleteKey)(key);
}

Meteor.methods({
  setRedisBlock: function (realtyId, userId) {
    if (!setRedisKey(realtyId)) {
      return 'Ктото уже взял этот объект';
    }
    if (!setRedisKey(userId)) {
      return 'Нельзя совершать 2 операции покупки одновременно. Заввершите первую операцию';
    }
    return 'Можно идти дальше';
  },
  delRedisBlock: function (realtyId, userId) {
    console.log('delRedisBlock');
    delRedisKey(realtyId);
    delRedisKey(userId);
    return 'ok udalil';
  },
  setRedisKey: function (key) {
    return setRedisKey(key);
  },
  delRedisKey: function (key) {
    return delRedisKey(key);
  }
});
