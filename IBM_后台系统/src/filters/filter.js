// 小写变大写
export const UPPER_CASE = value => {
    return value.toUpperCase();
}
// 时间戳转出成YYYY-MM-dd HH:mm:ss
export const FMT_DATE = value => {
    if(!!!value){
        return '--'
    }
    var value = new Date(value);
        var year = 1900 + value.getYear();
        var month = "0" + (value.getMonth() + 1);
        var date = "0" + value.getDate();
        var hour = "0" + value.getHours();
        var minute = "0" + value.getMinutes();
        var second = "0" + value.getSeconds();
        return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
            + " " + hour.substring(hour.length-2, hour.length) + ":"
            + minute.substring(minute.length-2, minute.length) + ":"
            + second.substring(second.length-2, second.length);
}
// 格式化金额
export const FORMATTED_NUMBER = money => {
    if(money && money!=null){
        money = String(money);
        var left=money.split('.')[0],right=money.split('.')[1];
        right = right ? (right.length>=2 ? '.'+right.substr(0,2) : '.'+right+'0') : '.00';
        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
        return (Number(money)<0?"-":"") + temp.join(',').split('').reverse().join('')+right;
    }else if(money===0){   //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
        return '0.00';
    }else{
        return "";
    }
}
export default {
    UPPER_CASE,
    FMT_DATE,
    FORMATTED_NUMBER,
}