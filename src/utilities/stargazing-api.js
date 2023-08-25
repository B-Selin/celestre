import sendRequest from './send-request';

const BASE_URL = '/api/stargazing';

export async function fetchStargazing(){
  return sendRequest(BASE_URL, 'GET')
}

export async function createStargazing(data){
  return sendRequest(BASE_URL, 'POST', data);
}


