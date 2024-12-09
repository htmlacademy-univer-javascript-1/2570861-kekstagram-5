const getRandomInt = (a,b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.floor(Math.random() * (upper - lower + 1)) + lower;
  return result;
};

const getRandomArrElement = (items) =>
  items[getRandomInt(0, items.length - 1)];

const createID = () => {
  let lastID = 0;

  return () => {
    lastID += 1;
    return lastID;
  };
};

export {getRandomInt, getRandomArrElement, createID};
