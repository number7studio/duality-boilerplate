import { createClient, ClientOpts } from 'redis';
import { promisify } from 'util';
import { get as configGet } from 'config';

const redisConfig : ClientOpts = {}
redisConfig.url = configGet('databases.auth_redis.full_uri');
if(!redisConfig.url) redisConfig.port = configGet('databases.auth_redis.port');

const client = createClient(redisConfig);

client.on('error', function(err) {
  console.error('Error ' + err);
});

export const set = promisify(client.set).bind(client);

export const get = promisify(client.get).bind(client);
