/* eslint-disable brace-style */
/* eslint-disable prefer-template */
/* eslint-disable eol-last */
// Начало
export function lenStrCheck(str,maxLen){
  str = str.replaceAll(' ','');
  return str.length <= maxLen;
}
lenStrCheck('asdfghj',7);
/*
Функция, которая принимает время начала и конца раб дня,
время старта и продолжительность встречи в мин.
возвращает true, если встреча не выходит за рамки раб дня и false, если выходит.
*/
function workDayLimit(dayStart, dayEnd, meetStart, meetTime){
  let meetEnd = '';
  switch (meetStart.length){
    case (5):
    case (4 && meetEnd.indexOf(':') === 2):
      meetEnd = String(+meetStart.slice(0,2) + Math.floor(meetTime / 60)) +
      ':' + String(+meetStart.slice(3) + meetTime % 60) ;

      if (meetEnd.indexOf(':') === 1){ (meetEnd = '0' + meetEnd);
      }

      if (+meetEnd.slice(3) >= 60){ meetEnd = String(+meetEnd.slice(0,2) + 1) + ':' + String (+meetEnd.slice(3) % 60);
      }
      break;
    case (4 && meetEnd.indexOf(':') === 1):
      meetEnd = String(+meetStart.slice(0,1) + Math.floor(meetTime / 60)) +
      ':' + String(+meetStart.slice(2) + meetTime % 60) ;

      if (meetEnd.indexOf(':') === 1){ (meetEnd = '0' + meetEnd);
      }

      if (+meetEnd.slice(3) >= 60){ meetEnd = String(+meetEnd.slice(0,2) + 1) + ':' + String (+meetEnd.slice(3) % 60);
      }
      break;
    case (3):
      meetEnd = String(+meetStart.slice(0,1) + Math.floor(meetTime / 60)) +
      ':' + String(+meetStart.slice(2) + meetTime % 60) ;

      if (meetEnd.indexOf(':') === 1){ (meetEnd = '0' + meetEnd);
      }

      if (+meetEnd.slice(3) >= 60){ meetEnd = String(+meetEnd.slice(0,2) + 1) + ':' + String (+meetEnd.slice(3) % 60);
      }
      break;
  }

}
workDayLimit();

