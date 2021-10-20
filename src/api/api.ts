import { APIServiceRequest } from "../types/types/api";

const API_DOMAIN_DEV = process.env.REACT_APP_API_DOMAIN;

// Big chunk of endpoints
const API = {
  weather: {
    getNineDayWeather: (params: any = {}) => {
      const request = {
        method: '/weather/nineDay',
        body: params,
        query: '',
      }
      return get(request);
    },
    getRegionalWeather: (params: any = {}) => {
      const request = {
        method: '/weather/regionalTemps',
        body: params,
        query: '',
      }
      return get(request);
    },
  }


}

console.log(API_DOMAIN_DEV)

// Generic GET
const get = (request: APIServiceRequest) => fetch((request.host ?? API_DOMAIN_DEV) + request.method + request.query, {
  method: 'GET',
  headers: {
    Accpet: 'application/json',
    'Content-Type': 'application/json',
  },
}).then(res => res.json()).catch(e => ({'success': false, 'error': e}));

// Generic POST
const post = (request: APIServiceRequest) => fetch((request.host ?? API_DOMAIN_DEV) + request.method + request.query, {
  method: 'POST',
  headers: {
    Accpet: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(request.body),
}).then(res => res.json()).catch(e => ({'success': false, 'error': e}));

// Generic PUT
const put = (request: APIServiceRequest) => fetch((request.host ?? API_DOMAIN_DEV) + request.method + request.query, {
  method: 'PUT',
  headers: {
    Accpet: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(request.body),
}).then(res => res.json()).catch(e => ({'success': false, 'error': e}));

// Generic DEL
const del = (request: APIServiceRequest) => fetch((request.host ?? API_DOMAIN_DEV) + request.method + request.query, {
  method: 'DELETE',
  headers: {
    Accpet: 'application/json',
    'Content-Type': 'application/json',
  },
}).then(res => res.json()).catch(e => ({'success': false, 'error': e}));


export default API;