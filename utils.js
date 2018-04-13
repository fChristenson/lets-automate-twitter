const todayISOString = () => {
  const date = new Date();
  const fullISOString = date.toISOString();
  const strArray = fullISOString.split("T");
  return strArray[0];
};

module.exports.todayISOString = todayISOString;

const makeIsoToTimeFunc = index => str => {
  const split = str.split("-");
  return split[index];
};

const isoStringToYear = makeIsoToTimeFunc(0);
module.exports.isoStringToYear = isoStringToYear;

const isoStringToMonth = makeIsoToTimeFunc(1);
module.exports.isoStringToMonth = isoStringToMonth;

const isoStringToDay = makeIsoToTimeFunc(2);
module.exports.isoStringToDay = isoStringToDay;

const wait = time => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
};

module.exports.wait = wait;
