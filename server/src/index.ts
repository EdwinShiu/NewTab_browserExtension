import express, { Express } from 'express';
import Weather from './routes/weather.js';
import redisClient from './helper/redis.js';
import { callbackify } from 'util';
import cors from 'cors';

const APP: Express = express();
const PORT: number = 8080;

APP.use(cors());
APP.use('/weather', Weather)
APP.get('/', (req, res) => {

  console.log(redisClient.KEYS('*', (err, replies) => {
    if (err)  {
      return console.log(err);
    }
    return console.log(replies);
  }))

  res.send('Hello');
});


APP.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
})
