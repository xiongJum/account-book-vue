
var newDate = new Date ()


function getDate(datestr) { // 将字符串转换为当前时间
    var temp = datestr.split("-");
    var date = new Date(temp[0], temp[1]-1, temp[2]);
    // console.log(date);
    return date
  }

function getNowFormatDate (step_size='month') { // 获取当月
    
    if (step_size === 'month') {
      var month = newDate.getMonth() + 1
      var month_tmp = month > 9 ? month : "0" + month;
      var dayDict = {
        31: ["1", "3", "5", "7", "8", "10", "12"],
        30: ["4", "6", "9", "11"]
      }
      var year = newDate.getFullYear()
      var yearMonth = year + '-' + month_tmp + '-'
      var interval_date = {start_day: yearMonth + '01'}
     
      if (month in dayDict[31]) {
        interval_date['end_day'] = yearMonth + '31'
        return interval_date
      } else if (month in dayDict[30]) {
        interval_date['end_day'] = yearMonth + '30'
        return interval_date
      } else if (month === '2') {
        
        if (year % 4 ===0 && year % 100 === 0) {
          interval_date['end_day'] = yearMonth + '29'
        } else {
          interval_date['end_day'] = yearMonth + '28'
        }
      }
    } else {
      return {start_day: date.getFullYear() + '-01-01', end_day: date.getFullYear() + '12-31'}
    }
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
            console.log(3333333333)
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