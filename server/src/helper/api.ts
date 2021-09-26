import fetch, { Response } from 'node-fetch';
import csv from 'csvtojson';
import { Readable } from 'stream';


const API = {
  get: async (url: string) => {
    return await fetch(url, {
      method: 'GET',
    }).then(async (res) => await res.json());
  },
  getCSV: async (url: string) => {
    const response: Response = await fetch(url);
    const row: any[] = [];
    await csv()
            .fromStream(new Readable().wrap(response.body))
            .subscribe((json) => {
              row.push(json);
            });
    return row;
  },
}


export default API;