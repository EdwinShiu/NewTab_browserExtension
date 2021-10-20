export type APIServiceRequest = {
  host?: string,
  method: string,
  body: any,
  query: string,
}

export type APIServiceResponse = {
  success: boolean,
  data: any,
}
