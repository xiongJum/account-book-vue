
var newDate = new Date ()


export function getNowFormatDate(first_or_last='first', now_format_date=false) {

  /**
   * 获取当前月份的开始时间和结束时间
   */
  
  var year, month, day
  if (now_format_date === false) {
    year = newDate.getFullYear();
    month = newDate.getMonth() + 1;
  } else {
    now_format_date = getDate(now_format_date);
    year = now_format_date.getFullYear()
    month = now_format_date.getMonth() + 1
  }
  
  switch (first_or_last) {
    case 'first':
      day = new Date (year, month - 1, 1);// 这个月份的第一天
      day = DateToFormat(day);
      break;

    case 'last' :
      day = new Date (year, month, 1) // 这个月份的最后一天
      day = DateToFormat(day)
      break;
    
    default:
      throw 'first_or_last 请传入 first 或 last。'
  }

  return day
}

function DateToFormat (date) { //将时间转换为字符串, 本地时间

  date = date.toLocaleDateString()
  date = date.split('/')
  var month = date[1] > 9 ? date[1] : "0" + date[1];
  var day = date[2] > 9 ? date[2] : "0" + date[2];
  return `${date[0]}-${month}-${day}`
}


function getDate(datestr) { // 将字符串转换为当前时间
    var temp = datestr.split("-");
    var date = new Date(temp[0], temp[1]-1, temp[2]);
    // console.log(date);
    return date
  }

export function getNowFormatDateList (start_day, end_day, time_span='day') {

    /**
     * 按照查询月份生成当前列表
     */
    let i = 0;
    let now_format_date_list = []
    var startTime = getDate(start_day)
    var endTime = getDate(end_day)
    switch (time_span) {
        /**
         * 查询日期的全部天数
         */
        case 'day' :
            while((endTime.getTime()-startTime.getTime())>=0){
                  let year = startTime.getFullYear();
                  let month = (startTime.getMonth()+1).toString().length==1?"0"+(startTime.getMonth()+1).toString():(startTime.getMonth()+1).toString();
                  let day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();
                  now_format_date_list[i] = `${year}-${month}-${day}`;
                  startTime.setDate(startTime.getDate()+1);
                  i+=1;
            }
            break;
        case 'month' :
            /**
             *  显示单年份的全部月份 
             */ 
            let year = startTime.getFullYear();
            for (let i=1; i<13; i++) {
                let month = i > 9 ? i : "0" + i;
                now_format_date_list[i-1] = `${year}-${month}`
            }
            break;
        case 'year':
            /**
             * 显示全部年份列表
             */
            while ((endTime.getFullYear() - startTime.getFullYear()) >= 0) {
                now_format_date_list[i] = startTime.getFullYear();
                startTime.setDate(startTime.getFullYear()+1);
                i += 1;
            }
            break;
        default:
            throw 'time_span 请传入 day、month 或 year。'
    }
    // console.log(now_format_date_list)
    return now_format_date_list;
}