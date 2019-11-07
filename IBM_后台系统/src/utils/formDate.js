function formDate(num, type) {
    if (num == "" || num == null) {
      return "";
    }
    var date = new Date(num);
    var Y = date.getFullYear();
    var M =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var ymdh = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    if (type) {
      //输出时间类型
      if (type == 2) {
        ymdh = Y + "-" + M + "-" + D;
      }
      if (type == 3) {
        ymdh = Y + "." + M + "." + D + " " + h + ":" + m;
      }
    }
    return ymdh;
  }
  export default formDate