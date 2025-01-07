const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const EndPoints = {
  FETCH_DATA: '/data',
  SUBMIT_DATA: '/'
};

const HttpMethods = {
  GET: 'GET',
  POST: 'POST'
};

const fetchData = async (endpoint, errorMessage, method = HttpMethods.GET, payload = null) => {
  try {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method,
      body: payload,
    }).catch(() =>
      null
    );

    if (!response || !response.ok) {
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch {
    throw new Error(errorMessage);
  }
};


const getData = async () => {
  try {
    return await fetchData(EndPoints.FETCH_DATA);
  } catch {
    return null;
  }
};

const sendData = async (data) => {
  try {
    const response = await fetch(`${SERVER_URL}${EndPoints.SUBMIT_DATA}`, {
      method: HttpMethods.POST,
      body: data,
    });

    return response;
  } catch {
    return null;
  }
};


export { getData, sendData };
