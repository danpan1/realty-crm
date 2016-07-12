/**
 * Created by Danpan on 30.06.16.
 */
import {Meteor} from "meteor/meteor";
import redis from "redis";

// const client = redis.createClient({db : 0}); //это локально
const client = redis.createClient({db: 1, host: 'redis.int.invest5.ru'}); // это на серваках


client.setSync = Meteor.wrapAsync(client.set);
client.getSync = Meteor.wrapAsync(client.get);

client.on("error", function (err) {
  console.log("REDIS ERROR", err);
});

client.on("connect", function () {
  console.log("connected rediska");
});

export default client;

