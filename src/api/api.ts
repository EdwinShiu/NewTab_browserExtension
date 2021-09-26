
type APIServiceRequest = {
  host?: string,
  method: string,
  body: any,
  query: string,
}

export type APIServiceResponse = {
  success: boolean,
  data: any,
}

const API_DOMAIN_DEV = process.env.REACT_APP_API_DOMAIN;

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

const get = (request: APIServiceRequest) => fetch((request.host ?? API_DOMAIN_DEV) + request.method + request.query, {
  method: 'GET',
  headers: {
    Accpet: 'application/json',
    'Content-Type': 'application/json',
  },
}).then(res => res.json());

const post = (request: APIServiceRequest) => fetch((request.host ?? API_DOMAIN_DEV) + request.method + request.query, {
  method: 'POST',
  headers: {
    Accpet: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(request.body),
}).then(res => res.json());

const put = (request: APIServiceRequest) => fetch((request.host ?? API_DOMAIN_DEV) + request.method + request.query, {
  method: 'PUT',
  headers: {
    Accpet: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(request.body),
}).then(res => res.json());

const del = (request: APIServiceRequest) => fetch((request.host ?? API_DOMAIN_DEV) + request.method + request.query, {
  method: 'DELETE',
  headers: {
    Accpet: 'application/json',
    'Content-Type': 'application/json',
  },
}).then(res => res.json());


export default API;