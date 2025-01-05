const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const EndPoints = {
  FETCH_DATA: '/data',
  SUBMIT_DATA: '/'
};

const HttpMethods = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorMessages = {
  FETCH_ERROR: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SUBMIT_ERROR: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const fetchData = async (endpoint, errorMessage, method = HttpMethods.GET, payload = null) => {
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

const getData = () => fetchData(EndPoints.FETCH_DATA, ErrorMessages.FETCH_ERROR);

const sendData = (data) => fetchData(EndPoints.SUBMIT_DATA, ErrorMessages.SUBMIT_ERROR, HttpMethods.POST, data);

export { getData, sendData };
