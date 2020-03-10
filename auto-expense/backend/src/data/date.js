const monarr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

function getToYmd(str) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1
    let day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year + str + month + str + day;
}

function getCurrMonthLastDay(sta, cur) {
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm;
    if (cur !== undefined) {
        cur = Number(cur);
        mm = formatNN(today.getMonth() + cur);
    } else {
        mm = formatNN(today.getMonth());
    }
    let date;
    if (sta)
        date = yyyy + "-" + mm + "-" + getMonthDay(yyyy, mm);
    else
        date = yyyy + "-" + mm + "-01";
    return date;
}

function getMonthDay(year, month) {
    if ((((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) && month == 2) {
        return 29;
    } else {
        return monarr[month - 1];
    }
}

function formatNN(num) {
    num = Number(num);
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}

function getMM(cur) {
    let today = new Date();
    let mm;
    if (cur !== undefined) {
        cur = Number(cur);
        mm = formatNN(today.getMonth() + cur);
    } else {
        mm = formatNN(today.getMonth());
    }
    return mm;
}

module.exports = {
    past_sta_ymd: getCurrMonthLastDay(false),
    past_end_ymd: getCurrMonthLastDay(true),
    past_period: getCurrMonthLastDay(false) + " ~ " + getCurrMonthLastDay(true),
    cur_sta_ymd: getCurrMonthLastDay(false, 1),
    cur_end_ymd: getCurrMonthLastDay(true, 1),
    cur_period: getCurrMonthLastDay(false, 1) + " ~ " + getCurrMonthLastDay(true, 1),
    to_ymd: getToYmd(".")
}