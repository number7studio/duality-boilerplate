import { createClient } from 'redis';
import { promisify } from 'util';
import { get as configGet } from 'config';

const client = createClient(configGet('databases.auth_redis.port'));

client.on('error', function(err) {
  console.error('Error ' + err);
});

export const set = promisify(client.set).bind(client);

export const get = promisify(client.get).bind(client);

// var redis = require("redis"),
//     client = redis.createClient();
