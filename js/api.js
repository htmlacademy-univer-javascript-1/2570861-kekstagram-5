const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const ENDPOINTS = {
  FETCH_DATA: '/data',
  SUBMIT_DATA: '/'
};

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST'
};

const ERROR_MESSAGES = {
  FETCH_ERROR: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SUBMIT_ERROR: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const fetchData = async (endpoint, errorMessage, method = HTTP_METHODS.GET, payload = null) => {
  try {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method,
      body: payload
    });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch {
    throw new Error(errorMessage);
  }
};

const getData = () => fetchData(ENDPOINTS.FETCH_DATA, ERROR_MESSAGES.FETCH_ERROR);

const sendData = (data) => fetchData(ENDPOINTS.SUBMIT_DATA, ERROR_MESSAGES.SUBMIT_ERROR, HTTP_METHODS.POST, data);

export { getData, sendData };
