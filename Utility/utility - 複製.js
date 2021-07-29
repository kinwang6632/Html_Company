//var language = {
//    prompt: '提示!!',
//    yes: "是(Y)",
//    no: "否(N)",
//    cancel: "取消"
//};
var language = utility.language;
var formName = "utility.js";

//.EntryId = LoginData.Tables(0).Rows(0).Item("EntryId"), .EntryName = LoginData.Tables(0).Rows(0).Item("EntryName"), .CompCode = LoginData.Tables(0).Rows(0).Item("CompCode"), .GroupId = LoginData.Tables(0).Rows(0).Item("GroupId")
function formatNumber(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/B(?=(?:d{3})+(?!d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

//Math.gcd = function (a, b) {
//    var minNum = Math.min(a, b), maxNum = Math.max(a, b), i = minNum, vper = 0;
//    if (a === 0 || b === 0) {
//        return maxNum;
//    }

//    for (; i <= maxNum; i++) {
//        vper = minNum * i;
//        if (vper % maxNum === 0) {
//            return vper;
//            break;
//        }
//    }
//}
//計算中文長度
String.prototype.lengthB = function (encoding) {
    var chr = 'rr';
    if (encoding != null) {
        switch (encoding.toLowerCase()) {
            case "utf-8":
                chr = 'rrr';
        }
    }
    return this.replace(/[^\x00-\xff]/g, chr).length;
};
//判斷字串開頭是否為指定的字
//回傳: bool
String.prototype.startsWith = function (prefix) {
    return (this.substr(0, prefix.lengthB()) === prefix);
};
//判斷字串結尾是否為指定的字
//回傳: bool
String.prototype.endsWith = function (suffix) {
    return (this.substr(this.lengthB() - suffix.lengthB()) === suffix);
};
// Pad Right
String.prototype.padRight = function (length, char) {
    return this + Array(length - this.lengthB() + 1).join(char || " ");
};
// Pad Left
String.prototype.padLeft = function (length, char) {
    return Array(length - this.lengthB() + 1).join(char || " ") + this;
};
// 右取幾碼
String.prototype.right = function (len) {
    return this.substring(this.length - len, this.length);
};
//檢核是否為空值
String.prototype.isEmpty = function () {
    return this == null || this.length == 0;
};

Date.prototype.toJSON = function () {
    //var n = this.getTimezoneOffset() / 60;
    return formatDateTime(this, "datetime3", null, 3).replace(/\//g, '-').replace(' ', 'T') + '+08:00';
};

function formatDate(date) {
    var nd;
    if (typeof (date) == 'string') {
        nd = Date.parse(date);
    }
    else {
        nd = date;
    }
    var d = new Date(nd);
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
}

//function getUniqueId() {
//    return new Date().getTime() + Math.random();
//}
var getUniqueId = (function () {
    var id = 0;
    return function () {
        return id++;
    };
})();
//var getLocalization = function (culture) {
//    var localization = null;
//    switch (culture) {
//        case "de":
//            localization =
//             {
//                 // separator of parts of a date (e.g. '/' in 11/05/1955)
//                 '/': "/",
//                 // separator of parts of a time (e.g. ':' in 05:44 PM)
//                 ':': ":",
//                 // the first day of the week (0 = Sunday, 1 = Monday, etc)
//                 firstDay: 1,
//                 days: {
//                     // full day names
//                     names: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
//                     // abbreviated day names
//                     namesAbbr: ["Sonn", "Mon", "Dien", "Mitt", "Donn", "Fre", "Sams"],
//                     // shortest day names
//                     namesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
//                 },

//                 months: {
//                     // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
//                     names: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],
//                     // abbreviated month names
//                     namesAbbr: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez", ""]
//                 },
//                 // AM and PM designators in one of these forms:
//                 // The usual view, and the upper and lower case versions
//                 //      [standard,lowercase,uppercase]
//                 // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
//                 //      null
//                 AM: ["AM", "am", "AM"],
//                 PM: ["PM", "pm", "PM"],
//                 eras: [
//                 // eras in reverse chronological order.
//                 // name: the name of the era in this culture (e.g. A.D., C.E.)
//                 // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
//                 // offset: offset in years from gregorian calendar
//                 { "name": "A.D.", "start": null, "offset": 0 }
//                 ],
//                 twoDigitYearMax: 2029,
//                 patterns:
//                  {
//                      d: "dd.MM.yyyy",
//                      D: "dddd, d. MMMM yyyy",
//                      t: "HH:mm",
//                      T: "HH:mm:ss",
//                      f: "dddd, d. MMMM yyyy HH:mm",
//                      F: "dddd, d. MMMM yyyy HH:mm:ss",
//                      M: "dd MMMM",
//                      Y: "MMMM yyyy"

//                  },
//                 percentsymbol: "%",
//                 currencysymbol: "€",
//                 currencysymbolposition: "after",
//                 decimalseparator: '.',
//                 thousandsseparator: ',',
//                 pagergotopagestring: "Gehe zu",
//                 pagershowrowsstring: "Zeige Zeile:",
//                 pagerrangestring: " von ",
//                 pagerpreviousbuttonstring: "nächster",
//                 pagernextbuttonstring: "voriger",
//                 pagerfirstbuttonstring: "first",
//                 pagerlastbuttonstring: "last",
//                 groupsheaderstring: "Ziehen Sie eine Kolumne und legen Sie es hier zu Gruppe nach dieser Kolumne",
//                 sortascendingstring: "Sortiere aufsteigend",
//                 sortdescendingstring: "Sortiere absteigend",
//                 sortremovestring: "Entferne Sortierung",
//                 groupbystring: "Group By this column",
//                 groupremovestring: "Remove from groups",
//                 filterclearstring: "Löschen",
//                 filterstring: "Filter",
//                 filtershowrowstring: "Zeige Zeilen, in denen:",
//                 filterorconditionstring: "Oder",
//                 filterandconditionstring: "Und",
//                 filterselectallstring: "(Alle auswählen)",
//                 filterchoosestring: "Bitte wählen Sie:",
//                 filterstringcomparisonoperators: ['leer', 'nicht leer', 'enthält', 'enthält(gu)',
//                    'nicht enthalten', 'nicht enthalten(gu)', 'beginnt mit', 'beginnt mit(gu)',
//                    'endet mit', 'endet mit(gu)', 'equal', 'gleich(gu)', 'null', 'nicht null'],
//                 filternumericcomparisonoperators: ['gleich', 'nicht gleich', 'weniger als', 'kleiner oder gleich', 'größer als', 'größer oder gleich', 'null', 'nicht null'],
//                 filterdatecomparisonoperators: ['gleich', 'nicht gleich', 'weniger als', 'kleiner oder gleich', 'größer als', 'größer oder gleich', 'null', 'nicht null'],
//                 filterbooleancomparisonoperators: ['gleich', 'nicht gleich'],
//                 validationstring: "Der eingegebene Wert ist ungültig",
//                 emptydatastring: "Nokeine Daten angezeigt",
//                 filterselectstring: "Wählen Sie Filter",
//                 loadtext: "Loading...",
//                 clearstring: "Löschen",
//                 todaystring: "Heute"
//             };
//            break;
//        case "en":
//            localization =
//            {
//                // separator of parts of a date (e.g. '/' in 11/05/1955)
//                '/': "/",
//                // separator of parts of a time (e.g. ':' in 05:44 PM)
//                ':': ":",
//                // the first day of the week (0 = Sunday, 1 = Monday, etc)
//                firstDay: 0,
//                days: {
//                    // full day names
//                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//                    // abbreviated day names
//                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//                    // shortest day names
//                    namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
//                },
//                months: {
//                    // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
//                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
//                    // abbreviated month names
//                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
//                },
//                // AM and PM designators in one of these forms:
//                // The usual view, and the upper and lower case versions
//                //      [standard,lowercase,uppercase]
//                // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
//                //      null
//                AM: ["AM", "am", "AM"],
//                PM: ["PM", "pm", "PM"],
//                eras: [
//                // eras in reverse chronological order.
//                // name: the name of the era in this culture (e.g. A.D., C.E.)
//                // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
//                // offset: offset in years from gregorian calendar
//                { "name": "A.D.", "start": null, "offset": 0 }
//                ],
//                twoDigitYearMax: 2029,
//                patterns: {
//                    // short date pattern
//                    d: "M/d/yyyy",
//                    // long date pattern
//                    D: "dddd, MMMM dd, yyyy",
//                    // short time pattern
//                    t: "h:mm tt",
//                    // long time pattern
//                    T: "h:mm:ss tt",
//                    // long date, short time pattern
//                    f: "dddd, MMMM dd, yyyy h:mm tt",
//                    // long date, long time pattern
//                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
//                    // month/day pattern
//                    M: "MMMM dd",
//                    // month/year pattern
//                    Y: "yyyy MMMM",
//                    // S is a sortable format that does not vary by culture
//                    S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
//                    // formatting of dates in MySQL DataBases
//                    ISO: "yyyy-MM-dd hh:mm:ss",
//                    ISO2: "yyyy-MM-dd HH:mm:ss",
//                    d1: "dd.MM.yyyy",
//                    d2: "dd-MM-yyyy",
//                    d3: "dd-MMMM-yyyy",
//                    d4: "dd-MM-yy",
//                    d5: "H:mm",
//                    d6: "HH:mm",
//                    d7: "HH:mm tt",
//                    d8: "dd/MMMM/yyyy",
//                    d9: "MMMM-dd",
//                    d10: "MM-dd",
//                    d11: "MM-dd-yyyy"
//                },
//                percentsymbol: "%",
//                currencysymbol: "$",
//                currencysymbolposition: "before",
//                decimalseparator: '.',
//                thousandsseparator: ',',
//                pagergotopagestring: "Go to page:",
//                pagershowrowsstring: "Show rows:",
//                pagerrangestring: " of ",
//                pagerpreviousbuttonstring: "previous",
//                pagernextbuttonstring: "next",
//                pagerfirstbuttonstring: "first",
//                pagerlastbuttonstring: "last",
//                groupsheaderstring: "Drag a column and drop it here to group by that column",
//                sortascendingstring: "Sort Ascending",
//                sortdescendingstring: "Sort Descending",
//                sortremovestring: "Remove Sort",
//                groupbystring: "Group By this column",
//                groupremovestring: "Remove from groups",
//                filterclearstring: "Clear",
//                filterstring: "Filter",
//                filtershowrowstring: "Show rows where:",
//                filterorconditionstring: "Or",
//                filterandconditionstring: "And",
//                filterselectallstring: "(Select All)",
//                filterchoosestring: "Please Choose:",
//                filterstringcomparisonoperators: ['empty', 'not empty', 'enthalten', 'enthalten(match case)',
//                   'does not contain', 'does not contain(match case)', 'starts with', 'starts with(match case)',
//                   'ends with', 'ends with(match case)', 'equal', 'equal(match case)', 'null', 'not null'],
//                filternumericcomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
//                filterdatecomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
//                filterbooleancomparisonoperators: ['equal', 'not equal'],
//                validationstring: "Entered value is not valid",
//                emptydatastring: "No data to display",
//                filterselectstring: "Select Filter",
//                loadtext: "Loading...",
//                clearstring: "Clear",
//                todaystring: "Today"
//            };
//            break;
//        default:
//            localization =
//            {
//                // separator of parts of a date (e.g. '/' in 11/05/1955)
//                '/': "/",
//                // separator of parts of a time (e.g. ':' in 05:44 PM)
//                ':': ":",
//                // the first day of the week (0 = Sunday, 1 = Monday, etc)
//                firstDay: 0,
//                days: {
//                    // full day names
//                    names: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
//                    // abbreviated day names
//                    namesAbbr: ["日", "一", "二", "三", "四", "五", "六"],
//                    // shortest day names
//                    namesShort: ["日", "一", "二", "三", "四", "五", "六"]
//                },
//                months: {
//                    // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
//                    names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "11月", "12月", ""],
//                    // abbreviated month names
//                    namesAbbr: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", ""]
//                },
//                // AM and PM designators in one of these forms:
//                // The usual view, and the upper and lower case versions
//                //      [standard,lowercase,uppercase]
//                // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
//                //      null
//                AM: ["AM", "am", "AM"],
//                PM: ["PM", "pm", "PM"],
//                eras: [
//                // eras in reverse chronological order.
//                // name: the name of the era in this culture (e.g. A.D., C.E.)
//                // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
//                // offset: offset in years from gregorian calendar
//                { "name": "A.D.", "start": null, "offset": 0 }
//                ],
//                twoDigitYearMax: 2029,
//                patterns: {
//                    // short date pattern
//                    d: "M/d/yyyy",
//                    // long date pattern
//                    D: "dddd, MMMM dd, yyyy",
//                    // short time pattern
//                    t: "h:mm tt",
//                    // long time pattern
//                    T: "h:mm:ss tt",
//                    // long date, short time pattern
//                    f: "dddd, MMMM dd, yyyy h:mm tt",
//                    // long date, long time pattern
//                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
//                    // month/day pattern
//                    M: "MMMM dd",
//                    // month/year pattern
//                    Y: "yyyy MMMM",
//                    // S is a sortable format that does not vary by culture
//                    S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
//                    // formatting of dates in MySQL DataBases
//                    ISO: "yyyy-MM-dd hh:mm:ss",
//                    ISO2: "yyyy-MM-dd HH:mm:ss",
//                    d1: "dd.MM.yyyy",
//                    d2: "dd-MM-yyyy",
//                    d3: "dd-MMMM-yyyy",
//                    d4: "dd-MM-yy",
//                    d5: "H:mm",
//                    d6: "HH:mm",
//                    d7: "HH:mm tt",
//                    d8: "dd/MMMM/yyyy",
//                    d9: "MMMM-dd",
//                    d10: "MM-dd",
//                    d11: "MM-dd-yyyy"
//                },
//                percentsymbol: "%",
//                currencysymbol: "$",
//                currencysymbolposition: "before",
//                decimalseparator: '.',
//                thousandsseparator: ',',
//                pagergotopagestring: "Go to page:",
//                pagershowrowsstring: "Show rows:",
//                pagerrangestring: " of ",
//                pagerpreviousbuttonstring: "previous",
//                pagernextbuttonstring: "next",
//                pagerfirstbuttonstring: "first",
//                pagerlastbuttonstring: "last",
//                groupsheaderstring: "Drag a column and drop it here to group by that column",
//                sortascendingstring: "Sort Ascending",
//                sortdescendingstring: "Sort Descending",
//                sortremovestring: "Remove Sort",
//                groupbystring: "Group By this column",
//                groupremovestring: "Remove from groups",
//                filterclearstring: "Clear",
//                filterstring: "Filter",
//                filtershowrowstring: "Show rows where:",
//                filterorconditionstring: "Or",
//                filterandconditionstring: "And",
//                filterselectallstring: "(Select All)",
//                filterchoosestring: "Please Choose:",
//                filterstringcomparisonoperators: ['empty', 'not empty', 'enthalten', 'enthalten(match case)',
//                   'does not contain', 'does not contain(match case)', 'starts with', 'starts with(match case)',
//                   'ends with', 'ends with(match case)', 'equal', 'equal(match case)', 'null', 'not null'],
//                filternumericcomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
//                filterdatecomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
//                filterbooleancomparisonoperators: ['equal', 'not equal'],
//                validationstring: "Entered value is not valid",
//                emptydatastring: "No data to display",
//                filterselectstring: "Select Filter",
//                loadtext: "Loading...",
//                clearstring: "Clear",
//                todaystring: "Today"
//            };
//            break;
//    }
//    return localization;
//};
function changeElementId(div) {
    var ctls = $('#' + $(div).prop('id')).find('[data-id]');
    for (i = 0 ; i < ctls.length; i++) {
        $(ctls[i]).prop('id', $(div).prop('id') + $(ctls[i]).attr('data-id'));
    }
};
function getToday() {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDay());
}
function formatDateTime(date, datetype, mask, millisecondsLength) {
    try {
        var nd;
        if (date == null) { return; }
        if (typeof (date) == 'string') {
            if (date == null) {
                return;
            }
            nd = new Date(date);
        }
        else {
            nd = date;
        }
        if (mask == null) { mask = true; }
        if (millisecondsLength == null) { millisecondsLength = 2; }
        var d = new Date(nd);
        var month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hours = '' + d.getHours(),
            minutes = '' + d.getMinutes(),
            seconds = '' + d.getSeconds(),
            milliseconds = '' + d.getMilliseconds();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hours.length < 2) hours = '0' + hours;
        if (minutes.length < 2) minutes = '0' + minutes;
        if (seconds.length < 2) seconds = '0' + seconds;
        //if (milliseconds.length < 2) milliseconds = '0' + milliseconds;
        //if (milliseconds.length > 2) milliseconds = milliseconds.substr(0, 2);
        milliseconds = (milliseconds + '').padRight(millisecondsLength, '0').substr(0, millisecondsLength);

        var maskString1 = '/';
        var maskString2 = ':';
        var maskString3 = '.';
        var maskSpace = ' ';
        if (mask == false) {
            maskString1 = '';
            maskString2 = '';
            maskString3 = '';
            maskSpace = '';
        }
        var value;

        switch (datetype) {
            case 'year':
            case 'yyyy':
                value = year;
                break;
            case 'ym':
            case 'yyyymm':
            case 'yyyyMM':
                value = [year, month].join(maskString1);
                break;
            case 'date':
            case 'yyyyMMdd':
            case 'yyyymmdd':
                value = [year, month, day].join(maskString1);
                break;
            case 'datetime':
            case 'yyyyMMddHHmm':
            case 'yyyymmddhhmm':
                value = [year, month, day].join(maskString1) + maskSpace + [hours, minutes].join(maskString2);
                break;
            case 'datetime2':
            case 'yyyyMMddHHmmss':
            case 'yyyymmddhhmmss':
                value = [year, month, day].join(maskString1) + maskSpace + [hours, minutes, seconds].join(maskString2);
                break;
            case 'datetime3':
            case 'yyyyMMddHHmmssff':
            case 'yyyymmddhhmmssff':
                value = [year, month, day].join(maskString1) + maskSpace + [hours, minutes, seconds].join(maskString2) + maskString3 + milliseconds;
                break;
            case "time":
            case "HHmm":
            case "hhmm":
                value = [hours, minutes].join(maskString2);
                break;
            case "time2":
            case "HHmmss":
            case "hhmmss":
                value = [hours, minutes, seconds].join(maskString2);
                break;
            case "time3":
            case "HHmmssff":
            case "hhmmssff":
                value = [hours, minutes, seconds].join(maskString2) + maskString3 + milliseconds;
                break;
        }
        return value;
    }
    catch (err) {
        errorHandle('jquery.utility.js', 'formatDateTime', err);
    }
}

function getParamsHtml(tablename, params) {
    try {
        var jsons = {};
        for (var key in params) {
            jsons[key] = '"' + key + '":"' + params[key] + '"';
        }
        var json = jsons.join(",");

        var json = '{"LoginInfo":[' +
                                    '{"EntryId":"' + params['entryid'] + '","EntryName":"' + params['entryname'] + '","CompCode":' + params["compcode"] +
                                    ',"GroupId":"' + params['groupid'] + '"}' +
                                    ']}';
        return json;
    }
    catch (err) {
        errorHandle('jquery.utility.js', 'GetParamsHtml', err);
    }
}
function showRIAError(riaresult) {
    //                    alert(JSON.stringify(resposedata));
    //                    alert(resposedata.ResultXML);
    //                    alert(resposedata.ResultBoolean);
    //                    alert(resposedata.ErrorCode);
    //                    alert(resposedata.ErrorMessage);
    try {
        if (riaresult.ResultBoolean == false) {
            alert("RIA Error !!" + String.fromCharCode(13) + String.fromCharCode(10) +
                   "ErrorCode:" + riaresult.ErrorCode + String.fromCharCode(13) + String.fromCharCode(10) +
                   "ErrorCode:" + riaresult.ErrorMessage);
        }
        return riaresult.ResultBoolean;
    }
    catch (err) {
        errorHandle(formName, 'showRIAError', err);
    }
}
function errorHandle(htmlname, methodname, err, full) {
    try {
        var message;
        if (full == undefined || full == true || err.message == null) {
            message = err.stack;
        }
        else {
            message = err.message;
        }
        if (message == null) message = err;
        var errorMsg = 'HTMLName: ' + htmlname + String.fromCharCode(13) + String.fromCharCode(10) +
                'Method: ' + methodname + String.fromCharCode(13) + String.fromCharCode(10) +
                'ErrorCode: ' + err.number + String.fromCharCode(13) + String.fromCharCode(10) +
                'ErrorMsg: ' + message;
        try {
            messageBox(errorMsg);
        }
        catch (err) {
            alert(errorMsg);
        }
    }
    catch (err) {
        alert('errorHandle' + err.Message);
    }
}
//function ClearStorgeParameters(ParameterHead) {
//    try {
//        for (var i = sessionStorage.length - 1; i >= 0; i--) {
//            var paranamesplit = sessionStorage.key(i).split('_');
//            if (ParameterHead == paranamesplit[0]) {
//                sessionStorage.removeItem(sessionStorage.key(i));
//            }
//        }
//    }
//    catch (err) {
//        alert('ClearStorgeParameters' + err.Message);
//    }
//}
function addTableColumns(table, names, types, showError) {
    var aColumns;
    var aTypes;
    if (typeof names == 'string') {
        aColumns = names.split(',');
        aTypes = types.split(',');
    }
    else {
        aColumns = names;
        aTypes = types;
    }
    if (showError == null) showError = true;
    var aLength = aColumns.length;
    for (var i = 0; i < aLength; i++) {
        if (checkColumnExist(table, aColumns[i]) == true) {
            if (showError == true) {
                messageBox('column: ' + aColumns[i] + ' is exist!!');
            }
        }
        else {
            table.columns.push({ name: aColumns[i], type: aTypes[i] })
        }
    }
    return true;
};
function checkColumnExist(table, columnName) {
    var tLength = table.columns.length;
    for (var i = 0; i < tLength; i++) {
        if (table.columns['name'] == columnName) {
            return true;
        }
    }
    return false;
};
function getRowFieldString(table, field, stringMark) {
    var t;
    if (!Array.isArray(table)) {
        t = table.rows;
    }
    else {
        t = table;
    }
    var tLength = t.length;
    if (tLength == 0) return;
    var r = [];
    for (var i = 0 ; i < tLength; i++) {
        if (t[field] != null) {
            r.push(stringMark + t[field] + stringMark);
        }
    }
    return r.join(',');
}

function getParameters(dllname, classname, methodname, parameters) {
    return JSON.stringify({
        dllname: dllname,
        classname: classname,
        methodname: methodname,
        parameters: parameters,
        encryptkey: sessionStorage.getItem('encryptkey')
    });
}

function showIndicator(flag, container, size, color) {
    var sizeValue;
    switch (size) {
        case "large":
            sizeValue = "256";
            break;
        case "small":
            sizeValue = "64";
            break;
        case "x-small":
            sizeValue = "48";
            break;
        case "xx-small":
            sizeValue = "32";
            break;
        default:
            sizeValue = "128";
    }
    if (color == null) { color = "blue"; }
    var imageUrl = "images/loader_" + color + "_" + sizeValue + ".gif";
    var indId = "indicator";
    if (container == null) {
        container = $('body');
    }
    else {
        indId = $(container).prop('id') + indId;
    }
    if (flag == true) {
        if ($('#' + indId).length == 0) {
            //loader_blue_128.gif
            //$('<div id="indicator""><img alt="" src="jqwidgets/styles/images/loader.gif"/></div>').appendTo('body');
            $('<div id="' + indId + '"><img alt="" src="' + imageUrl + '"/></div>').appendTo($(container));
            $('#' + indId).css('height', '100%');
            $('#' + indId).css('width', '100%');
            $('#' + indId).css('z-index', 99999998);
            $('#' + indId).css('position', 'fixed');
            $('#' + indId).css('top', 0);
            $('#' + indId).css('left', 0);
            $('#' + indId).css('background-color', 'silver');
            $('#' + indId).css('filter', 'alpha(opacity=60)');
            $('#' + indId).css('opacity', 0.6);
            $('#' + indId).css('-moz-opacity', 0.8);
            var child = $('#' + indId).children()[0];
            //$(child).css('background-color', 'White');
            $(child).css('height', sizeValue);
            $(child).css('width', sizeValue);
            $(child).css('top', ($('#' + indId).height() - $(child).height()) / 2);
            $(child).css('left', ($('#' + indId).width() - $(child).width()) / 2);
            $(child).css('position', 'fixed');
            $(child).css('filter', 'alpha(opacity=100)');
            $(child).css('opacity', 1);
            $(child).css('-moz-opacity', 1);
        }
    }
    else {
        if ($('#' + indId).length > 0) {
            $('#' + indId).remove();
        }
    }
}

function getServerData(params, callback, timeout, showLoaderImg, indicatorContainer) {
    try {
        if (timeout == null || timeout < 120) { timeout = 120; }
        if (showLoaderImg == null) { showLoaderImg = true; }
        if (showLoaderImg == true) showIndicator(showLoaderImg, indicatorContainer);
        $.ajax({
            url: 'data.ashx',
            timeout: timeout * 1000,
            type: "post",
            datatype: 'json',
            //method: "POST",
            data: { parameters: params, timeout: timeout },
            success: function (d) {
                if (showLoaderImg == true) showIndicator(false);
                try {
                    try {
                        var data = JSON.parse(d);
                        if (data.encryptkey != null) {
                            sessionStorage.setItem('encryptkey', data.encryptkey);
                        }
                        //if (typeof callback['success'] === 'function') {
                        if (data.parameters) {
                            callback['success'](data.parameters);
                        }
                        else {
                            callback['success'](data);
                        }
                        //}
                    }
                    catch (err) {
                        if (typeof callback['error'] === "function") {
                            callback['error'](d);
                        }
                        else {
                            errorHandle(formName, 'getServerData_success_error', err);
                        }
                    }
                }
                catch (err) {
                    errorHandle(formName, 'getServerData_success', err);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (showLoaderImg == true) showIndicator(false);
                if (typeof callback['error'] === "function") {
                    callback['error'](xhr, ajaxOptions, thrownError);
                }
                else {
                    alert('error status:' + xhr.status + ', thrownError:' + thrownError);
                }
            }
        });
    }
    catch (err) {
        errorHandle(formName, 'getServerData', err);
    }
};

function convertToNull(value, zero) {
    if (value == null || value.length == 0) {
        if (zero == true) {
            return 0;
        }
        else {
            return null;
        }
    }
    else {
        return value;
    }
};

function getRealDate(d) {
    var dd;
    if (typeof d == 'string') {
        dd = new Date(d);
    }
    else {
        dd = d;
    }
    //var n = dd.getTimezoneOffset()*60000;
    //dd.setHours(dd.getHours() + n);
    return dd;
}

function convertNullToString(value) {
    if (value == null) {
        return '';
    }
    else {
        return value;
    }
};
var editMode = { view: 0, edit: 1, append: 2, 'delete': 3 };

var applicationTheme = { theme: "energyblue" };

var imageScr = {
    append: { imgSrc: '../Images/Add1.png' },
    edit: { imgSrc: '../Images/Edit1.png' },
    'delete': { imgSrc: '../Images/Del1.png' },
    view: { imgSrc: '../Images/View1.png' },
    print: { imgSrc: '../Images/Printer1.png' },
    ok: { imgSrc: '../Images/OK1.png' },
    exit: { imgSrc: '../Images/Exit1.png' },
    cancel: { imgSrc: '../Images/Cancel1.png' },
    save: { imgSrc: '../Images/Save1.png' },
    query: { imgSrc: '../Images/Query3.png' },
    clear: { imgSrc: '../Images/Clean5.png' },
    excel: { imgSrc: '../Images/Excel1.png' }
};

var imagePosition = {
    imgPosition: "center", textPosition: "left", textImageRelation: "imageBeforeText"
};

JSON.prototype = {
    clone: function (obj) {
        return JSON.parse(JSON.stringify(obj));
    }
};

function cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
};

function getScrollBarHeight() {
    try {
        var jTest = $('<div style="display:none;width:50px;overflow: scroll"><div style="width:100px;"><br /><br /></div></div>');
        $('body').append(jTest);
        var h = jTest.innerHeight();
        jTest.css({
            overflow: 'auto',
            width: '200px'
        });
        var h2 = jTest.innerHeight();
        jTest.remove();
        return h - h2;
    }
    catch (err) {
        errorHandle(formName, 'getScrollBarHeight', err);
    }
};

function getScrollBarWidth() {
    try {
        var jTest = $('<div style="display:none;height:50px;overflow: scroll"><div style="height:100px;"></div></div>');
        $('body').append(jTest);
        var w = jTest.innerWidth();
        jTest.css({
            overflow: 'auto',
            height: '200px'
        });
        var w2 = jTest.innerWidth();
        jTest.remove();
        return w - w2;
    }
    catch (err) {
        errorHandle(formName, 'getScrollBarWidth', err);
    }
};
function haveScrollbar(element, direction) {
    try {
        if (direction.indexOf('v') >= 0) {
            return element.scrollHeight > element.clientHeight;
        }
        else {
            return element.scrollWidth > element.clientWidth;
        }
    }
    catch (err) {
        errorHandle(formName, 'checkHaveScroll', err);
    }
};

var messageType = {
    information: 0,
    critical: 1,
    yesno: 2,
    yesnocancel: 3
};
function messageBox(msg, msgType, prompt, action, options) {
    try {
        if (prompt == null) prompt = language.prompt;
        if (msgType == null) msgType = 0;
        var msgId = "messageBox" + getUniqueId();
        var msgBody = msgId + '_body';
        var msgChild = msgId + '_child';
        var msgCaption = msgId + '_caption';
        var msgButtons = msgId + '_btns';
        var btnControls = [];
        var buttonWidth = 80;
        var buttonHeight = 0;
        var imageWidth = 0;
        var retValue;
        $('<div id="' + msgId + '"><div>' + prompt + '</div><div id="' + msgChild + '"></div></div>').appendTo('body');
        $('#' + msgId).jqxWindow($.extend({
            minWidth: 300,
            minHeight: 200,
            maxWidth: $(document).width() - 20,
            maxHeight: $(document).height() - 20,
            resizable: true,
            closeButtonAction: 'close',
            isModal: true
        }, options));
        var x = ($('body').width() - $('#' + msgId).jqxWindow('width')) / 2;
        $('#' + msgId).jqxWindow({ position: { x: x, y: 0 } });
        $('<div id ="' + msgBody + '"></div>').appendTo('#' + msgChild);
        $('#' + msgBody).css('height', '99.6%');
        $('<textarea id="' + msgCaption + '" style="float:left;"></textarea>').appendTo('#' + msgBody);
        $('#' + msgCaption).jqxTextArea({
            width: '99%',
            height: $('#' + msgBody).height() - 5,
            disabled: true
        });
        $('#' + msgCaption).jqxTextArea('val', msg);
        $($('#' + msgCaption).parent().parent()).css('border', 0);
        //$('#messageBox_child').text(msgId);
        $('#' + msgId).on('close', function () {
            $('#' + msgId).off();
            $('#' + msgCaption).jqxTextArea('destroy');
            for (var i = 0; i < btnControls.length; i++) {
                $('#' + btnControls[i].name).jqxButton('destroy');
            }
            $('#' + msgId).jqxWindow('destroy');
            if (typeof action === 'function') {
                action(retValue);
            }
        });
        $('#' + msgId).on('resized', function () {
            //resize();
        });
        $('#' + msgId).on('resizing', function () {
            resize();
        });
        var yesId = msgButtons + '_0';
        var noId = msgButtons + '_1';
        var cancelId = msgButtons + '_2';
        var okId = msgButtons + '_3';
        if (msgType == messageType.yesno) {
            btnControls.push({ name: yesId, text: language.yes });
            btnControls.push({ name: noId, text: language.no });
        }
        else if (msgType == messageType.yesnocancel) {
            btnControls.push({ name: yesId, text: language.yes });
            btnControls.push({ name: noId, text: language.no });
            btnControls.push({ name: cancelId, text: language.cancel });
        }
        else {
            btnControls.push({ name: okId, text: language.ok });
        }
        if (btnControls.length > 0) {
            if (btnControls.length > 1) {
                imageWidth = 36;
                $($('#' + msgBody).children()[0]).css('float', 'left');
                $('<div style="float:left;height:' + imageWidth + 'px;width:' + imageWidth + 'px;"><img style="height:' + imageWidth + 'px;width:' + imageWidth + 'px;" src="Images/question.png"/></div>').insertBefore($('#' + msgBody).children()[0]);
            }
            $('<div id = "' + msgButtons + '" style="border-top:1px;"></div>').appendTo('#' + msgChild);
            buttonHeight = 26;
        }
        var bLength = btnControls.length;
        for (var i = bLength - 1; i >= 0; i--) {
            $('<input type="button" id="' + btnControls[i].name + '" style="float:right;margin:2px;width:99%;" />').appendTo($('#' + msgButtons));
            $('#' + btnControls[i].name).jqxButton({ height: buttonHeight, width: buttonWidth, value: btnControls[i].text });
            $('#' + btnControls[i].name).on('click', function () {
                retValue = $(this).prop('id').split('_')[$(this).prop('id').split('_').length - 1];
                switch (retValue) {
                    case '0':
                        retValue = "yes";
                        break;
                    case '1':
                        retValue = "no";
                        break;
                    case '2':
                        retValue = "cancel";
                        break;
                }
                $('#' + msgId).jqxWindow('close');
            });
        }
        resize();
        function resize() {
            $('#' + msgBody).css("height", $('#' + msgChild).height() - buttonHeight - 8);
            $('#' + msgCaption).jqxTextArea({
                width: $('#' + msgBody).width() - imageWidth - 2,
                height: $('#' + msgBody).height() - 8
            });
            //$('#' + msgCaption).jqxTextArea({ height: $('#' + msgChild).height() - buttonHeight - 8 });
        }
    }
    catch (err) {
        //alert(msg);
        errorHandle(formName, 'messageBox', err, true);
    }
};

function getGridRowNumberColumn(text, width) {
    try {
        if (width == null) width = 50;
        if (text == null) text = "#";
        return {
            text: text, sortable: false, filterable: false, editable: false,
            groupable: false, draggable: false, resizable: false,
            datafield: '', columntype: 'number', width: width,
            cellsrenderer: function (row, column, value) {
                return "<div style='margin:6px;'>" + (value + 1) + "</div>";
            }
        };
    }
    catch (err) {
        errorHandle(formName, 'getGridRowNumberColumn', err, true);
    }
};

function exportGridToExcel(grids, fileName) {
    try {
        var xml = $('#' + grids[0].name)[grids[0].type]('exportdata', 'xls');
        var xml2 = [];
        for (var i = 1; i < grids.length; i++) {
            var dom = $.parseXML($('#' + grids[i].name)[grids[i].type]('exportdata', 'xls'));
            var worksheet = $(dom).find('Worksheet');
            $(worksheet).attr('ss:Name', 'Sheet' + (i + 1).toString());
            xml2.push($(worksheet)[0].outerHTML);
        }
        if (xml2.length > 0) {
            xml = xml.replace('</Worksheet>', '</Worksheet>' + xml2.join('\r\n'));
        }
        if (fileName.toUpperCase().indexOf('.xls') < 0) {
            fileName += '.xls';
        }
        downloadFile(fileName, xml);
    }
    catch (err) {
        errorHandle(formName, 'exportGridToExcel', err, true);
    }
}
function downloadFile(fileName, text) {
    try {
        if (browser().isIE == true) {
            var blobObject = new Blob([text]);
            window.navigator.msSaveBlob(blobObject, fileName);
        } else {
            var link = document.createElement("a");
            link.setAttribute("target", "_blank");
            link.setAttribute("href", "data:application/octet-stream;charset=utf-8," + encodeURIComponent(text));
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    catch (err) {
        errorHandle(formName, 'exportGridToExcel', err, true);
    }
}
var browser = function () {
    try {
        var value = {};
        if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
            value['isOpera'] = true;
        }
        else if (navigator.userAgent.indexOf("Chrome") != -1) {
            value['isChrome'] = true;
        }
        else if (navigator.userAgent.indexOf("Safari") != -1) {
            value['isSafari'] = true;
        }
        else if (navigator.userAgent.indexOf("Firefox") != -1) {
            value['isFirefox'] = true;
        }
        else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
        {
            value['isIE'] = true;
        }
        else {
            //alert('unknown');
        }
        return value;
    }
    catch (err) {
        errorHandle(formName, 'browser', err, true);
    }
};
//載入js File
function loadFile(url, callback, fileType, key) {
    try {
        var id = fileType + url.split('/')[url.split('/').length - 1].replace(".js", "");
        if (document.getElementById(id) != null || url.length == 0) {
            callback(key);
            return;
        }

        if (fileType == 'js') {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            //script.id = id;
            //script.onreadystatechange = callback(key);
            //script.onload = callback(key);
            if (typeof callback !== "undefined") {
                if (script.readyState) {
                    /* For old versions of IE */
                    script.onreadystatechange = function () {
                        if (this.readyState === 'complete' || this.readyState === 'loaded') {
                            callback(key);
                        }
                    };
                } else {
                    script.onload = callback(key);
                }
            }
            //head.appendChild(script);
            head.insertBefore(script, head.childNodes[head.childNodes.length - 2]);
        }
        else if (fileType == 'css') {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement("link");
            link.href = url;
            link.type = "text/css";
            link.rel = "stylesheet";
            link.id = id;
            //link.media = "screen,print";

            id.onreadystatechange = callback(key);

            head.appendChild(link);
        }
        //alert('out');
    }
    catch (err) {
        errorHandle(formName, 'loadFile', err, true);
    }
};
function checkUIMustBe(value, caption, action) {
    if (value == null || value.length == 0) {
        messageBox(language.mustBe(caption), null, null, function () {
            action();
        });
        return false;
    }
    else return true;
}
//載入多個js 檔案
function loadScriptBySettingFile(callback, fileType) {
    var url;
    if (fileType == null) { fileType = 'js'; }
    if (fileType == 'js') {
        url = 'jsFileList.txt';
    }
    else if (fileType == 'css') {
        url = 'cssFileList.txt';
    }
    else {
        return;
    }
    $.ajax({
        url: url,
        type: "get",
        success: function (d) {
            try {
                var files = d.split('\r\n');
                var ok = [];
                for (var i = 0; i < files.length; i++) {
                    loadFile(files[i], function (event) {
                        ok[event] = true;
                        var loadOk = false;
                        for (var j = 0; j < files.length; j++) {
                            if (ok[j] == true) {
                                loadOk = true;
                            }
                            else {
                                loadOk = false;
                                break;
                            }
                        }
                        if (loadOk == true) {
                            callback();
                        }
                    }, 'js', i);
                }

            }
            catch (err) {
                errorHandle(formName, 'loadScriptBySettingFile', err);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('error status:' + xhr.status + ', thrownError:' + thrownError);
        }
    });
};

var hasClass = function (element, className) {
    return (" " + $(element).attr('class') + " ").indexOf(" " + className + " ") > -1;
};

var aesEncrypt = function (data, keyStr, ivStr) {
    try {
        var sendData = CryptoJS.enc.Utf8.parse(data);
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var iv = CryptoJS.enc.Utf8.parse(ivStr);
        //ECB,Zeros
        var encrypted = CryptoJS.AES.encrypt(sendData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Iso10126 });
        //return CryptoJS.enc.Base64.stringify(encrypted.toString(CryptoJS.enc.Utf8));
        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    }
    catch (err) {
        errorHandle(formName, 'aesEncrypt', err, true);
    }
};
var aesDecrypt = function (data, keyStr, ivStr) {
    try {
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var iv = CryptoJS.enc.Utf8.parse(ivStr);
        //解密的是基于BASE64的数据，此处data是BASE64数据
        var decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Iso10126 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    catch (err) {
        errorHandle(formName, 'aesEncrypt', err, true);
    }
};

function destroyControls(controls) {
    try {
        if (controls == null || controls.length == 0) {
            return;
        }
        var maxLevel = 0;
        for (var i = 0 ; i < controls.length; i++) {
            if (controls[i].level > maxLevel) maxLevel = controls[i].level;
        }
        for (var j = maxLevel; j >= 0; j--) {
            for (var i = 0; i < controls.length; i++) {
                if (controls[i] != null) {
                    var o = $('#' + controls[i].name);
                    $(o).off();
                    if (controls[i].level == j) {
                        //alert(controls[i].name);
                        //if (controls[i].type.indexOf('csMulti') >= 0) { continue; }
                        $(o)[controls[i].type]('destroy');
                        if ($(o).length > 0) {
                            $(o).remove();
                        }
                        controls[i] = null;
                    }
                }
                //$($(div).find('[data-id=codeno]')[0])
            }
        }
        controls.length = 0;
        controls = [];
    }
    catch (err) {
        errorHandle(formName, 'destroyControls', err);
    }
};
function getRowByKeyValue(rows, key, value) {
    try {
        var rLength = rows.length;
        for (var i = 0; i < rLength; i++) {
            if (rows[i][key] == value) {
                return rows[i];
            }
        }
        return null;
    }
    catch (err) {
        errorHandle(formName, 'getRowByKeyValue', err);
    }
};