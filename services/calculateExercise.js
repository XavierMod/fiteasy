const weights = {
  moderate: 1,
  vigorous: 2,
};

const expectedEfforts = 150;

export default calculateRemainingActivty = ({moderate, vigorous}, type) => {
  const done = moderate * weights.moderate + vigorous * weights.vigorous;
  const number = (expectedEfforts - done) / weights.moderate;

  if (type?.extra) {
    return `${Math.round((Math.abs(number) / expectedEfforts) * 100)}%`;
  }

  if (type?.total) {
    return moderate + vigorous;
  }

  console.log(
    'calculating exercise...',
    moderate,
    vigorous,
    (expectedEfforts - done) / weights.moderate,
  );
  return number;
};

export const calculateTotalActivity = ({moderate, vigorous}) => {
  return moderate + vigorous;
};

export const calculateExtra = ({moderate, vigorous}) => {
  const done = moderate * weights.moderate + vigorous * weights.vigorous;
  const number = (expectedEfforts - done) / weights.moderate;
  return `${Math.round((Math.abs(number) / expectedEfforts) * 100)}%`;
};

export const calculateTotalPercentage = ({moderate, vigorous}) => {
  const done = moderate * weights.moderate + vigorous * weights.vigorous;
  const number = (expectedEfforts - done) / weights.moderate;

  return `${100 - (number / expectedEfforts) * 100}%`;
};
