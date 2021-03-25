/**
 * Round number with specified precision.
 *
 * It uses "Half Up" rounding mode for both negative and positive numbers, regardless of sign.
 *
 * @param value
 * @param precision non-negative integers, defaults to 0
 * @returns {number}
 * @example
 *
 * round(50.5);
 * // => 51
 *
 * round(-0.505, 2);
 * // => -0.51
 */
const round = (value, precision = 0) => {
  if (!Number.isInteger(precision) || precision < 0) {
    throw new Error('precision has to be non-negative integer');
  }

  if (Number.isNaN(+value)) {
    throw new Error(`${value} is not a number`);
  }

  const factor = 10 ** (precision || 0);
  return (value >= 0 || -1) * (Math.round(Math.abs(value) * factor) / factor);
};

function randomIntRange(min, max) {
  return Math.floor((Math.random() * max) + min);
}

module.exports = {
  round,
  randomIntRange
};
