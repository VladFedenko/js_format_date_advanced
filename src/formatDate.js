'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const dateObject = {};
  const resultArray = [];

  for (let i = 0; i < dateArray.length; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  function normalizeYear(beforeYear) {
    let yearFormatYY = 0;
    let yearFormatYYYY = 0;

    if (dateObject.YYYY) {
      yearFormatYYYY = dateObject.YYYY;
      yearFormatYY = dateObject.YYYY.slice(2);
    }

    if (dateObject.YY) {
      if (+dateObject.YY < 30) {
        yearFormatYYYY = '20' + `${dateObject.YY}`;
      } else {
        yearFormatYYYY = '19' + `${dateObject.YY}`;
      }
      yearFormatYY = dateObject.YY;
    }

    if (beforeYear === 'YYYY') {
      return yearFormatYYYY;
    }

    return yearFormatYY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      resultArray[i] = normalizeYear(toFormat[i]);
    }

    if (toFormat[i] === 'MM') {
      resultArray[i] = dateObject.MM;
    }

    if (toFormat[i] === 'DD') {
      resultArray[i] = dateObject.DD;
    }
  }

  return resultArray.join(toFormat[3]);
}

module.exports = formatDate;
