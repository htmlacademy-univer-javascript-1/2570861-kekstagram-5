/* eslint-disable brace-style */
/* eslint-disable prefer-template */
/* eslint-disable eol-last */

export function lenStrCheck(str, maxLen) {
  str = str.replaceAll(' ', '');
  return str.length <= maxLen;
}

lenStrCheck('asdfghj', 7);

/*
Функция, которая принимает время начала и конца раб дня,
время старта и продолжительность встречи в мин.
возвращает true, если встреча не выходит за рамки раб дня и false, если выходит.
*/
function workDayLimit(dayStart, dayEnd, meetStart, meetTime) {
  let meetEnd = '';

  function addLeadingZero(time) {
    return time.indexOf(':') === 1 ? '0' + time : time;
  }

  switch (meetStart.length) {
    case 5:
    case (4 && meetStart.indexOf(':') === 2):
      meetEnd = String(+meetStart.slice(0, 2) + Math.floor(meetTime / 60)) + ':' + String(+meetStart.slice(3) + meetTime % 60);
      break;

    case 4:
    case 3:
      meetEnd = String(+meetStart.slice(0, 1) + Math.floor(meetTime / 60)) + ':' + String(+meetStart.slice(2) + meetTime % 60);
      break;
  }

  meetEnd = addLeadingZero(meetEnd);

  dayStart = addLeadingZero(dayStart);
  meetStart = addLeadingZero(meetStart);
  dayEnd = addLeadingZero(dayEnd);

  if (dayStart.slice(0, 2) > meetStart.slice(0, 2)) {return false;}
  if (dayStart.slice(0, 2) === meetStart.slice(0, 2) && dayStart.slice(3) > meetStart.slice(3)) {return false;}

  if (dayEnd.slice(0, 2) > meetEnd.slice(0, 2)) {return true;}
  if (dayEnd.slice(0, 2) === meetEnd.slice(0, 2) && dayEnd.slice(3) >= meetEnd.slice(3)) {return true;}

  return false;
}

(workDayLimit('08:00', '17:30', '14:00', 90)); // true
(workDayLimit('8:0', '10:0', '8:0', 120)); // false
(workDayLimit('08:00', '14:30', '14:00', 90)); // false
(workDayLimit('14:00', '17:30', '08:0', 90)); // true
(workDayLimit('8:00', '17:30', '08:00', 900)); // false
