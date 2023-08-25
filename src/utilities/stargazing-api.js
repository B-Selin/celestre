import sendRequest from './send-request';

const BASE_URL = '/api/stargazings';

export async function fetchStargazing(){
  return sendRequest(BASE_URL, 'GET')
}

export async function createStargazing(data){
  return sendRequest(BASE_URL, 'POST', data);
}


export async function deleteStargazing(id){
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}