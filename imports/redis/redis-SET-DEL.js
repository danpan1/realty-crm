/**
 * Created by Danpan on 30.06.16.
 */
import {Meteor} from 'meteor/meteor';
import redis from 'redis';
const client = redis.createClient({db : 2, host : 'redis.int.invest5.ru'});
let setnxKeyToBlock = function (key, callback) {
  client.set(key, 'world', 'NX', 'EX', 300, callback);
};

export function setRedisKey(key) {
  return !!(Meteor.wrapAsync(setnxKeyToBlock)(key));
}

let deleteKey = function (key, callback) {
  client.DEL(key, callback);
};

export function delRedisKey(key) {
  return Meteor.wrapAsync(deleteKey)(key);
}
