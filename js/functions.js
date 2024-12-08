/* eslint-disable brace-style */
/* eslint-disable prefer-template */
/* eslint-disable eol-last */

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
    case (3):
      meetEnd = String(+meetStart.slice(0,1) + Math.floor(meetTime / 60)) +
      ':' + String(+meetStart.slice(2) + meetTime % 60) ;

      if (meetEnd.indexOf(':') === 1){ (meetEnd = '0' + meetEnd);
      }

      if (+meetEnd.slice(3) >= 60){ meetEnd = String(+meetEnd.slice(0,2) + 1) + ':' + String (+meetEnd.slice(3) % 60);
      }
      break;
  }

  if (dayStart.indexOf(':') === 1){ dayStart = '0' + dayStart;
  }

  if (meetStart.indexOf(':') === 1){ meetStart = '0' + meetStart;
  }

  if (dayStart.slice(0,2) > meetStart.slice(0,2)){ return false;
  }
  else if ((dayStart.slice(0,2) === meetStart.slice(0,2)) && dayStart.slice(3) > meetStart.slice(3)){ return false;
  }

  if (dayEnd.indexOf(':') === 1){ dayEnd = '0' + dayEnd;
  }

  if (dayEnd.slice(0,2) > meetEnd.slice(0,2)){ return true;
  }
  else if ((dayEnd.slice(0,2) === meetEnd.slice(0,2)) && dayEnd.slice(3) >= meetEnd.slice(3)){ return true;
  } else { return false;
  }

}
workDayLimit('08:00', '17:30', '14:00', 90);
workDayLimit('8:0', '10:0', '8:0', 120);
workDayLimit('08:00', '14:30', '14:00', 90);
workDayLimit('14:00', '17:30', '08:0', 90);
workDayLimit('8:00', '17:30', '08:00', 900);


