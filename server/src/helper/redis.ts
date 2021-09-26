import * as redis from 'redis';
import 'dotenv/config';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: parseInt(process.env.REDIS_PORT, 10),
  password: process.env.REDIS_PASSWORD
});

redisClient.on("connect", () => {
  console.log("Connected to our redis instance!");
  redisClient.SET('test', '123',() => {console.log('ok')});
});

export default redisClient;