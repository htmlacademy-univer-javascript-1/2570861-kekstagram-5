// Начало
function lenStrCheck(str,maxLen){
  str = str.replaceAll(' ','');
  return str.length <= maxLen;
}
lenStrCheck('asdfghj',7);
