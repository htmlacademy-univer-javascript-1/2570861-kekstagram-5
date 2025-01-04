
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getRandomInt = (a,b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.floor(Math.random() * (upper - lower + 1)) + lower;
  return result;
};

const getRandomArrElement = (array, count) => {
  const shuffled = array.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const createID = () => {
  let lastID = 0;

  return () => {
    lastID += 1;
    return lastID;
  };
};

const isRepeats = function(arr) {
  const elements = {};
  for (const element of arr) {
    if (elements[element]) {
      return true;
    }
    elements[element] = 1;
  }
  return false;
};

export { debounce, getRandomInt, getRandomArrElement, createID, isRepeats };
