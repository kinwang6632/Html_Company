//var language = {
//    prompt: '提示!!',
//    yes: "是(Y)",
//    no: "否(N)",
//    cancel: "取消"
//};
var language = new utility().language;
var utilityName = "utility.js";

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
function commaSeparateNumber(val) {
    val += '';
    x = val.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
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
    return this.substring(this.lengthB() - len, this.lengthB());
};
// 右取幾碼
String.prototype.rightB = function (len) {
    return this.substring(this.lengthB() - len, this.lengthB());
};
// 右取幾碼
String.prototype.substrB = function (start, len) {
    var value = this;
    var tLen = 0;
    for (rLen = start; rLen < this.length; rLen++) {
        var chr = this.substr(rLen, 1);
        var lenB = chr.lengthB();
        if (tLen + lenB > len) {
            break;
        }
        tLen += lenB;
    }
    return this.substr(0, rLen);
};
//檢核是否為空值
String.prototype.isEmpty = function () {
    return this == null || this.length == 0;
};
function isDate(x) {
    return (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate);
}
Date.prototype.toJSON = function () {
    //var n = this.getTimezoneOffset() / 60;
    return formatDateTime(this, "datetime3", null, 3).replace(/\//g, '-').replace(' ', 'T') + '+08:00';
};
Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}
String.format = function () {
    var s = arguments[0];
    if (s == null) return "";
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = getStringFormatPlaceHolderRegEx(i);
        s = s.replace(reg, arguments[i + 1] == null ? "" : arguments[i + 1]);
    }
    return cleanStringFormatResult(s);
};
//可在Javascript中使用如同C#中的string.format (對jQuery String的擴充方法)
//使用方式 : var fullName = 'Hello. My name is {0} {1}.'.format('FirstName', 'LastName');
String.prototype.format = function () {
    var txt = this.toString();
    for (var i = 0; i < arguments.length; i++) {
        var exp = getStringFormatPlaceHolderRegEx(i);
        txt = txt.replace(exp, arguments[i] == null ? "" : arguments[i]);
    }
    return cleanStringFormatResult(txt);
};
//讓輸入的字串可以包含{}
function getStringFormatPlaceHolderRegEx(placeHolderIndex) {
    return new RegExp('({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm');
}
//當format格式有多餘的position時，就不會將多餘的position輸出
//ex:
// var fullName = 'Hello. My name is {0} {1} {2}.'.format('firstName', 'lastName');
// 輸出的 fullName 為 'firstName lastName', 而不會是 'firstName lastName {2}'
function cleanStringFormatResult(txt) {
    if (txt == null) return "";
    return txt.replace(getStringFormatPlaceHolderRegEx("\\d+"), "");
}
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
}
//Object.prototype.renameProperty = function (oldName, newName) {
//    // Do nothing if the names are the same
//    if (oldName == newName) {
//        return this;
//    }
//    // Check for the old property name to avoid a ReferenceError in strict mode.
//    if (this.hasOwnProperty(oldName)) {
//        this[newName] = this[oldName];
//        delete this[oldName];
//    }
//    return this;
//};

function isEmpty(val) {
    return IsNullOrEmpty(val);
};

function IsNullOrEmpty(val) {
    return val == null || val.length == 0;
}
function formatDate(date) {
    return formatDateTime(date, 'date');
};

//function getUniqueId() {
//    return new Date().getTime() + Math.random();
//}

///取得唯一ID
var getUniqueId = (function () {
    var id = 0;
    return function () {
        return id++;
    };
})();
///取得地區特性
var getLocalization = function (culture) {
    var localization = null;
    switch (culture) {
        case "de":
            localization =
             {
                 // separator of parts of a date (e.g. '/' in 11/05/1955)
                 '/': "/",
                 // separator of parts of a time (e.g. ':' in 05:44 PM)
                 ':': ":",
                 // the first day of the week (0 = Sunday, 1 = Monday, etc)
                 firstDay: 1,
                 days: {
                     // full day names
                     names: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                     // abbreviated day names
                     namesAbbr: ["Sonn", "Mon", "Dien", "Mitt", "Donn", "Fre", "Sams"],
                     // shortest day names
                     namesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
                 },

                 months: {
                     // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                     names: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],
                     // abbreviated month names
                     namesAbbr: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez", ""]
                 },
                 // AM and PM designators in one of these forms:
                 // The usual view, and the upper and lower case versions
                 //      [standard,lowercase,uppercase]
                 // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                 //      null
                 AM: ["AM", "am", "AM"],
                 PM: ["PM", "pm", "PM"],
                 eras: [
                 // eras in reverse chronological order.
                 // name: the name of the era in this culture (e.g. A.D., C.E.)
                 // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                 // offset: offset in years from gregorian calendar
                 { "name": "A.D.", "start": null, "offset": 0 }
                 ],
                 twoDigitYearMax: 2029,
                 patterns:
                  {
                      d: "dd.MM.yyyy",
                      D: "dddd, d. MMMM yyyy",
                      t: "HH:mm",
                      T: "HH:mm:ss",
                      f: "dddd, d. MMMM yyyy HH:mm",
                      F: "dddd, d. MMMM yyyy HH:mm:ss",
                      M: "dd MMMM",
                      Y: "MMMM yyyy"

                  },
                 percentsymbol: "%",
                 currencysymbol: "€",
                 currencysymbolposition: "after",
                 decimalseparator: '.',
                 thousandsseparator: ',',
                 pagergotopagestring: "Gehe zu",
                 pagershowrowsstring: "Zeige Zeile:",
                 pagerrangestring: " von ",
                 pagerpreviousbuttonstring: "nächster",
                 pagernextbuttonstring: "voriger",
                 pagerfirstbuttonstring: "first",
                 pagerlastbuttonstring: "last",
                 groupsheaderstring: "Ziehen Sie eine Kolumne und legen Sie es hier zu Gruppe nach dieser Kolumne",
                 sortascendingstring: "Sortiere aufsteigend",
                 sortdescendingstring: "Sortiere absteigend",
                 sortremovestring: "Entferne Sortierung",
                 groupbystring: "Group By this column",
                 groupremovestring: "Remove from groups",
                 filterclearstring: "Löschen",
                 filterstring: "Filter",
                 filtershowrowstring: "Zeige Zeilen, in denen:",
                 filterorconditionstring: "Oder",
                 filterandconditionstring: "Und",
                 filterselectallstring: "(Alle auswählen)",
                 filterchoosestring: "Bitte wählen Sie:",
                 filterstringcomparisonoperators: ['leer', 'nicht leer', 'enthält', 'enthält(gu)',
                    'nicht enthalten', 'nicht enthalten(gu)', 'beginnt mit', 'beginnt mit(gu)',
                    'endet mit', 'endet mit(gu)', 'equal', 'gleich(gu)', 'null', 'nicht null'],
                 filternumericcomparisonoperators: ['gleich', 'nicht gleich', 'weniger als', 'kleiner oder gleich', 'größer als', 'größer oder gleich', 'null', 'nicht null'],
                 filterdatecomparisonoperators: ['gleich', 'nicht gleich', 'weniger als', 'kleiner oder gleich', 'größer als', 'größer oder gleich', 'null', 'nicht null'],
                 filterbooleancomparisonoperators: ['gleich', 'nicht gleich'],
                 validationstring: "Der eingegebene Wert ist ungültig",
                 emptydatastring: "Nokeine Daten angezeigt",
                 filterselectstring: "Wählen Sie Filter",
                 loadtext: "Loading...",
                 clearstring: "Löschen",
                 todaystring: "Heute"
             };
            break;
        case "en":
            localization =
            {
                // separator of parts of a date (e.g. '/' in 11/05/1955)
                '/': "/",
                // separator of parts of a time (e.g. ':' in 05:44 PM)
                ':': ":",
                // the first day of the week (0 = Sunday, 1 = Monday, etc)
                firstDay: 0,
                days: {
                    // full day names
                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    // abbreviated day names
                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    // shortest day names
                    namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                },
                months: {
                    // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                    // abbreviated month names
                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
                },
                // AM and PM designators in one of these forms:
                // The usual view, and the upper and lower case versions
                //      [standard,lowercase,uppercase]
                // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                //      null
                AM: ["AM", "am", "AM"],
                PM: ["PM", "pm", "PM"],
                eras: [
                // eras in reverse chronological order.
                // name: the name of the era in this culture (e.g. A.D., C.E.)
                // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                // offset: offset in years from gregorian calendar
                { "name": "A.D.", "start": null, "offset": 0 }
                ],
                twoDigitYearMax: 2029,
                patterns: {
                    // short date pattern
                    d: "M/d/yyyy",
                    // long date pattern
                    D: "dddd, MMMM dd, yyyy",
                    // short time pattern
                    t: "h:mm tt",
                    // long time pattern
                    T: "h:mm:ss tt",
                    // long date, short time pattern
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    // long date, long time pattern
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    // month/day pattern
                    M: "MMMM dd",
                    // month/year pattern
                    Y: "yyyy MMMM",
                    // S is a sortable format that does not vary by culture
                    S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                    // formatting of dates in MySQL DataBases
                    ISO: "yyyy-MM-dd hh:mm:ss",
                    ISO2: "yyyy-MM-dd HH:mm:ss",
                    d1: "dd.MM.yyyy",
                    d2: "dd-MM-yyyy",
                    d3: "dd-MMMM-yyyy",
                    d4: "dd-MM-yy",
                    d5: "H:mm",
                    d6: "HH:mm",
                    d7: "HH:mm tt",
                    d8: "dd/MMMM/yyyy",
                    d9: "MMMM-dd",
                    d10: "MM-dd",
                    d11: "MM-dd-yyyy"
                },
                percentsymbol: "%",
                currencysymbol: "$",
                currencysymbolposition: "before",
                decimalseparator: '.',
                thousandsseparator: ',',
                pagergotopagestring: "Go to page:",
                pagershowrowsstring: "Show rows:",
                pagerrangestring: " of ",
                pagerpreviousbuttonstring: "previous",
                pagernextbuttonstring: "next",
                pagerfirstbuttonstring: "first",
                pagerlastbuttonstring: "last",
                groupsheaderstring: "Drag a column and drop it here to group by that column",
                sortascendingstring: "Sort Ascending",
                sortdescendingstring: "Sort Descending",
                sortremovestring: "Remove Sort",
                groupbystring: "Group By this column",
                groupremovestring: "Remove from groups",
                filterclearstring: "Clear",
                filterstring: "Filter",
                filtershowrowstring: "Show rows where:",
                filterorconditionstring: "Or",
                filterandconditionstring: "And",
                filterselectallstring: "(Select All)",
                filterchoosestring: "Please Choose:",
                filterstringcomparisonoperators: ['empty', 'not empty', 'enthalten', 'enthalten(match case)',
                   'does not contain', 'does not contain(match case)', 'starts with', 'starts with(match case)',
                   'ends with', 'ends with(match case)', 'equal', 'equal(match case)', 'null', 'not null'],
                filternumericcomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
                filterdatecomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
                filterbooleancomparisonoperators: ['equal', 'not equal'],
                validationstring: "Entered value is not valid",
                emptydatastring: "No data to display",
                filterselectstring: "Select Filter",
                loadtext: "Loading...",
                clearstring: "Clear",
                todaystring: "Today"
            };
            break;
        default:
            localization =
            {
                // separator of parts of a date (e.g. '/' in 11/05/1955)
                '/': "/",
                // separator of parts of a time (e.g. ':' in 05:44 PM)
                ':': ":",
                // the first day of the week (0 = Sunday, 1 = Monday, etc)
                firstDay: 0,
                days: {
                    // full day names
                    names: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                    // abbreviated day names
                    namesAbbr: ["日", "一", "二", "三", "四", "五", "六"],
                    // shortest day names
                    namesShort: ["日", "一", "二", "三", "四", "五", "六"]
                },
                months: {
                    // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                    names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "11月", "12月", ""],
                    // abbreviated month names
                    namesAbbr: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", ""]
                },
                // AM and PM designators in one of these forms:
                // The usual view, and the upper and lower case versions
                //      [standard,lowercase,uppercase]
                // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                //      null
                AM: ["AM", "am", "AM"],
                PM: ["PM", "pm", "PM"],
                eras: [
                // eras in reverse chronological order.
                // name: the name of the era in this culture (e.g. A.D., C.E.)
                // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                // offset: offset in years from gregorian calendar
                { "name": "A.D.", "start": null, "offset": 0 }
                ],
                twoDigitYearMax: 2029,
                patterns: {
                    // short date pattern
                    d: "yyyy/MM/dd",
                    // long date pattern
                    D: "dddd, MMMM dd, yyyy",
                    // short time pattern
                    t: "hh:mm tt",
                    // long time pattern
                    T: "hh:mm:ss tt",
                    // long date, short time pattern
                    f: "dddd, MMMM dd, yyyy hh:mm tt",
                    // long date, long time pattern
                    F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
                    // month/day pattern
                    M: "MMMM dd",
                    // month/year pattern
                    Y: "yyyy MMMM",
                    // S is a sortable format that does not vary by culture
                    S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                    // formatting of dates in MySQL DataBases
                    ISO: "yyyy/MM/dd hh:mm:ss",
                    ISO2: "yyyy/MM/dd HH:mm:ss",
                    d1: "yyyy.MM.dd",
                    d2: "yyyy-MM-dd",
                    d3: "yyyy-MMMM-dd",
                    d4: "yy-MM-dd",
                    d5: "HH:mm",
                    d6: "HH:mm",
                    d7: "HH:mm tt",
                    d8: "yyyy/MMMM/dd",
                    d9: "MMMM-dd",
                    d10: "MM-dd",
                    d11: "yyyy-MM-dd"
                },
                percentsymbol: "%",
                currencysymbol: "$",
                currencysymbolposition: "before",
                decimalseparator: '.',
                thousandsseparator: ',',
                pagergotopagestring: "移至:",
                pagershowrowsstring: "顯示筆數:",
                pagerrangestring: " 共 ",
                pagerpreviousbuttonstring: "上一筆",
                pagernextbuttonstring: "下一筆",
                pagerfirstbuttonstring: "第一筆",
                pagerlastbuttonstring: "最後一筆",
                groupsheaderstring: "拖動列並將其放在此處以按該列分組",
                sortascendingstring: "昇冪排序",
                sortdescendingstring: "降冪排序",
                sortremovestring: "移除排序",
                groupbystring: "群組欄位",
                groupremovestring: "移除群組",
                filterclearstring: "清除",
                filterstring: "過濾",
                filtershowrowstring: "過濾條件:",
                filterorconditionstring: "或",
                filterandconditionstring: "且",
                filterselectallstring: "(全選)",
                filterchoosestring: "請選擇:",
                filterstringcomparisonoperators: ['空白', '不為空白', '包含', '包含(相符)',
                   '不等於', '不等於(相符)', '開頭為', '開頭為(相符)',
                   '結尾為', '結尾為(相符)', '等於', '等於(相符)', '無值', '有值'],
                filternumericcomparisonoperators: ['等於', '不等於', '小於', '小於等於', '大於', '大於等於', '無值', '有值'],
                filterdatecomparisonoperators: ['等於', '不等於', '小於', '小於等於', '大於', '大於等於', '無值', '有值'],
                filterbooleancomparisonoperators: ['等於', '不等於'],
                validationstring: "輸入的值不合法",
                emptydatastring: "無資料",
                filterselectstring: "選擇過濾",
                loadtext: "載入中...",
                clearstring: "清除",
                todaystring: "今天"
            };
            break;
    }
    return localization;
};
///為元件命名
function changeElementId(div, formName) {
    var ctls = $('#' + $(div).prop('id')).find('[data-id]');
    for (i = 0 ; i < ctls.length; i++) {
        $(ctls[i]).prop('id', $(div).prop('id') + $(ctls[i]).attr('data-id'));
        //if (formName != null) {
        //    $(ctls[i]).attr("ownerform", formName);
        //}
    }
    if (formName != null) {
        $(div).attr("role", formName);
        var options = $.data(div, formName).options;
        options.tabControls = writeALLTabIndex(div);
    }
};
function getToday() {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}
//將沒有mask 的字串改成日期
function strToDateTime(date, datetype) {
    try {
        if (date == null) { return; }
        var realDate = date.replace(/\/|:| /g, '');
        var year,
            month = "01",
            day = "01",
            hours = "00",
            minutes = "00",
            seconds = "00",
            milliseconds = "00";
        if (realDate.length >= 4) {
            year = realDate.substr(0, 4)
        }
        if (realDate.length >= 6) {
            month = realDate.substr(4, 2)
        }
        if (realDate.length >= 8) {
            day = realDate.substr(6, 2)
        }
        if (realDate.length >= 10) {
            hours = realDate.substr(8, 2)
        }
        if (realDate.length >= 12) {
            minutes = realDate.substr(10, 2)
        }
        if (realDate.length >= 14) {
            seconds = realDate.substr(12, 2)
        }
        if (realDate.length >= 16) {
            milliseconds = realDate.substr(14, 2)
        }
        var maskString1 = '/';
        var maskString2 = ':';
        var maskString3 = '.';
        var maskSpace = ' ';
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
        errorHandle(utilityName, 'strToDateTime', err);
    }
}
function formatDateTime(date, datetype, mask, millisecondsLength) {
    ///將日期轉成字串
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
        errorHandle(utilityName, 'formatDateTime', err);
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
        errorHandle(utilityName, 'GetParamsHtml', err);
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
        errorHandle(utilityName, 'showRIAError', err);
    }
}
///錯誤處理
function errorHandle(htmlname, methodname, err, full, useAlert) {
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
            if (useAlert == true) {
                alert(errorMsg);
            }
            else {
                messageBox(errorMsg);
            }
        }
        catch (err) {
            try {
                if (errorMsg != null) {
                    alert(errorMsg);
                }
                else {
                    alert(err.message);
                }
            }
            catch (err) { }
        }
    }
    catch (err) {
        alert('errorHandle' + err.Message);
    }
}
///新增table 的 columns
function addTableColumns(table, names, types, showError) {
    try {
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
    }
    catch (err) {
        errorHandle(utilityName, 'addTableColumns', err);
    }
};
///檢核欄位是否存在
function checkColumnExist(table, columnName) {
    try {
        var tLength = table.columns.length;
        for (var i = 0; i < tLength; i++) {
            if (table.columns[i]['name'] == columnName) {
                return true;
            }
        }
        return false;
    }
    catch (err) {
        errorHandle(utilityName, 'checkColumnExist', err);
    }
};
///將rows 面特定欄位串成字串
function getRowFieldString(table, field, stringMark, toArray) {
    try {
        var t;
        if (!Array.isArray(table)) {
            t = table.rows;
        }
        else {
            t = table;
        }
        var tLength = t.length;
        if (tLength == 0) return;
        if (stringMark == null) stringMark = '';
        var r = [];
        for (var i = 0 ; i < tLength; i++) {
            if (t[i][field] != null) {
                r.push(stringMark + t[i][field] + stringMark);
            }
        }
        if (toArray != true) {
            return r.join(',');
        }
        else {
            return r;
        }
    }
    catch (err) {
        errorHandle(utilityName, 'getRowFieldString', err);
    }
}
///取得呼叫 RIA 參數
function getParameters(dllname, classname, methodname, parameters) {
    try {
        return JSON.stringify({
            dllname: dllname,
            classname: classname,
            methodname: methodname,
            parameters: parameters,
            encryptkey: sessionStorage.getItem('encryptkey')
        });
    }
    catch (err) {
        errorHandle(utilityName, 'getParameters', err);
    }
}
/////秀處理中圖示 2017/03/02 Jacky 改成jqxLoader
//function showIndicator(flag, container, size, color) {
//    try {
//        var indId = "indicator";
//        if (container == null) {
//            container = $('body');
//        }
//        else {
//            indId = $(container).prop('id') + indId;
//        }
//        if (flag == true) {
//            if ($('#' + indId).length == 0) {
//                $('<div id="' + indId + '"></div>').appendTo(container);
//                $('#' + indId).jqxLoader({
//                    //theme: $.jqx.theme,
//                    isModal: true,
//                    width: 64,
//                    height: 64,
//                    text: ''
//                });
//            }
//            else {
//                $('#' + indId).prop('style').removeProperty('display');
//            }
//            $('#' + indId).css('z-index', 99999998);
//            $('#' + indId + 'Modal').css({
//                'z-index': 99999997,
//                'background-color': 'white',
//                'opacity': 0.3,
//            });
//            $('#' + indId).jqxLoader('open');
//            //$('#' + indId).appendTo(container);
//        }
//        else {
//            if ($('#' + indId).length > 0) {
//                //$('#' + indId).css('display', 'none');
//                //$('#' + indId).remove();
//                $('#' + indId).jqxLoader('close');
//            }
//        }
//    }
//    catch (err) {
//        errorHandle(utilityName, 'showIndicator', err);
//    }
//}
///秀處理中圖示
function showIndicator(flag, container, size, color) {
    try {
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
            case "medium":
                sizeValue = "128";
                break;
            default:
                sizeValue = "64";
                break;
        }
        if (color == null) { color = "blue"; }
        //var imageUrl = "images/loader_" + color + "_" + sizeValue + ".gif";
        var imageUrl = "images/loader_" + color + "_256.gif";
        var indId = "indicator";
        var hasContainer;
        if (container == null) {
            container = $('body');
            hasContainer = false;
        }
        else {
            indId = $(container).prop('id') + indId;
            hasContainer = true;
        }
        if (flag == true) {
            if ($('#' + indId).length == 0) {
                //loader_blue_128.gif
                //$('<div id="indicator""><img alt="" src="jqwidgets/styles/images/loader.gif"/></div>').appendTo('body');
                $('<div id="' + indId + '"><img alt="" src="' + imageUrl + '"/></div>').appendTo($(container));
                $('#' + indId).css('height', '100%');
                $('#' + indId).css('width', '100%');
                $('#' + indId).css('z-index', 99999998);
                $('#' + indId).css('position', 'absolute');
                $('#' + indId).css('top', 0);
                $('#' + indId).css('left', 0);
                $('#' + indId).css('background-color', 'white');
                $('#' + indId).css('filter', 'alpha(opacity=60)');
                $('#' + indId).css('opacity', 0.6);
                $('#' + indId).css('-moz-opacity', 0.8);
                var child = $('#' + indId).children()[0];
                if (size == "none") {
                    $(child).css("display", "none");
                }
                else {
                    $(child).prop('style').removeProperty('display');
                    //$(child).css('background-color', 'White');
                    $(child).css('height', sizeValue);
                    $(child).css('width', sizeValue);
                    $(child).css('top', ($('#' + indId).height() - $(child).height()) / 2);
                    $(child).css('left', ($('#' + indId).width() - $(child).width()) / 2);
                    $(child).css('position', 'relative');
                    $(child).css('filter', 'alpha(opacity=100)');
                    $(child).css('opacity', 1);
                    $(child).css('-moz-opacity', 1);
                }
                $('#' + indId).off();
                $('#' + indId).on('contextmenu', function () {
                    return false;
                });
            }
            else {
                $('#' + indId).prop('style').removeProperty('display');
            }
        }
        else {
            if ($('#' + indId).length > 0) {
                if (indId == "indicator") {
                    $('#' + indId).css('display', 'none');
                }
                else {
                    $('#' + indId).off();
                    $('#' + indId).remove();
                }
            }
        }
    }
    catch (err) {
        errorHandle(utilityName, 'showIndicator', err);
    }
}
//取得Server 時間
function getDateFromServer(callback, datetype) {
    var rd;
    $.ajax({
        url: 'data.ashx',
        type: "post",
        data: { parameters: 'getDate' },
        async: false,
        success: function (d) {
            try {
                //callback(new Date(JSON.parse(d)));
                rd = new Date(JSON.parse(d));
                //getDateFromServer = dd;
                //return dd;
            }
            catch (err) {
                errorHandle(utilityName, 'getServerData_success', err);
                //callback();
                return;
            }
        },
        complete: function (xhr, ts) {
            xhr = null;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('error status:' + xhr.status + ', thrownError:' + thrownError);
            //callback();
            return;
        }
    });
    return rd;
}
function getIndicatorContainer(indicatorContainer) {
    try {
        if (indicatorContainer == null) {
            var parents = $(document.activeElement).parents();
            for (var i = 0 ; i < parents.length; i++) {
                if ($(parents[i]).hasClass("jqx-tabs-content-element") && isEmpty($(parents[i]).attr("createFrom"))) {
                    return $(parents[i]);
                }
                else if ($(parents[i]).hasClass("jqx-window")) {
                    return $(parents[i]);
                }
            }
        }
        else {
            return indicatorContainer;
        }
    }
    catch (err) {
        errorHandle(utilityName, 'getIndicatorContainer', err);
    }
}
///回server 端取得資料
function getServerData(params, callback, timeout, showLoaderImg, indicatorContainer) {
    try {
        if (timeout == null || timeout < 120) { timeout = 120; }
        if (showLoaderImg == null) { showLoaderImg = true; }
        if (showLoaderImg == true) {
            indicatorContainer = getIndicatorContainer(indicatorContainer);
            showIndicator(showLoaderImg, indicatorContainer);
        }
        var inTime = new Date();
        var wordArray = CryptoJS.enc.Utf8.parse(params);
        var realPara = CryptoJS.enc.Base64.stringify(wordArray);
        $.ajax({
            url: 'data.ashx',
            timeout: timeout * 1000,
            type: "post",
            contentType: "application/json; charset=utf-8",
            datatype: 'json',
            //method: "POST",
            data: { parameters: realPara, timeout: timeout },
            success: function (d) {
                if (showLoaderImg == true) showIndicator(false, indicatorContainer);
                try {
                    deleteJSONObject(wordArray);
                    deleteJSONObject(realPara);
                    try {
                        var data = null;
                        if (typeof d == "string") {
                            data = JSON.parse(d);
                        }
                        else {
                            data = cloneJSON(d);
                        }
                        var totalTime = new Date() - inTime;
                        if (data.encryptkey != null) {
                            sessionStorage.setItem('encryptkey', data.encryptkey);
                        }
                        else {
                            if (data.parameters == null) {
                                if (data != null && data.ErrorMessage != null) {
                                    messageBox(data.ErrorMessage);
                                    deleteJSONObject(d);
                                    return;
                                }
                                else {
                                    //導回login form
                                    messageBox(language.noEncryptKey);
                                    deleteJSONObject(d);
                                    return;
                                }
                            }
                            else {
                                if (data.parameters.ResultBoolean == false) {
                                    messageBox(data.parameters.ErrorMessage, null, null, function (r) {
                                        if (data.parameters.ErrorCode == -998) {
                                            window.location.replace("login.html");
                                        }
                                    });
                                }
                                else {
                                    //導回login form
                                    messageBox(language.noEncryptKey);
                                }
                                deleteJSONObject(d);
                                return;
                            }
                        }
                        //if (typeof callback['success'] === 'function') {
                        if (data.parameters) {
                            if (data.ResultBoolean == false) {
                                messageBox(new Error().stack + data.ErrorMessage);
                                callback['success'](data.parameters);
                                deleteJSONObject(d);
                                return;
                            }
                            else {
                                callback['success'](data.parameters);
                            }
                        }
                        else {
                            callback['success'](data);
                        }
                        deleteJSONObject(d);
                        //}
                    }
                    catch (err) {
                        if (typeof callback['error'] === "function") {
                            callback['error'](d);
                        }
                        else {
                            errorHandle(utilityName, 'getServerData_success_error', err);
                        }
                    }
                }
                catch (err) {
                    if (typeof callback['error'] === "function") {
                        callback['error'](d);
                    }
                    errorHandle(utilityName, 'getServerData_success', err);
                }
            },
            complete: function (xhr, ts) {
                xhr = null;
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
        errorHandle(utilityName, 'getServerData', err);
    }
};
///取空字串轉成null
function convertToNull(value, zero) {
    try {
        if (value == null || value.length == 0) {
            if (zero == true) {
                return 0;
            }
            else {
                return null;
            }
        }
        else {
            if (typeof (value) === "boolean") {
                if (value == true) {
                    value = 1;
                }
                else {
                    value = 0;
                }
            }
            return value;
        }
    }
    catch (err) {
        errorHandle(utilityName, 'convertToNull', err);
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
    return dd;
}
///將null的值改成空字串
function convertNullToString(value, isString) {
    if (value == null) {
        return '';
    }
    else {
        if (isString) {
            return value.toString();
        }
        else {
            return value;
        }
    }
};
var convertValueToString = function (value) {
    if (value != null) {
        if (typeof (value) === "boolean") {
            if (value == true) {
                value = "1";
            }
            else {
                value = "0";
            }
        }
        else if (typeof (value) === "number") {
            value = value.toString();
        }
        else if (typeof (value) === "string") {
            return value;
        }
        else {

            var timestamp = Date.parse(value);
            if (isNaN(timestamp) == false) {
                value = formatDateTime(value, 'datetime2', true);
            }
            else {
                value = value.toString();
            }
        }
    }
    return value;
}
var editMode = { view: 0, edit: 1, append: 2, 'delete': 3 };

var applicationTheme = { theme: "energyblue" };
///圖檔種類
var imageScr = {
    append: { imgSrc: 'Images/s_add.png' },
    edit: { imgSrc: 'Images/s_edit.png' },
    'delete': { imgSrc: 'Images/s_del.png' },
    view: { imgSrc: 'Images/s_view.png' },
    print: { imgSrc: 'Images/s_print.png' },
    phone: { imgSrc: 'Images/s_phone.png' },
    ok: { imgSrc: 'Images/s_OK2.png' },
    exit: { imgSrc: 'Images/s_Exit.png' },
    cancel: { imgSrc: 'Images/s_Cancel.png' },
    save: { imgSrc: 'Images/s_save.png' },
    query: { imgSrc: 'Images/s_search.png' },
    clear: { imgSrc: 'Images/s_clear.png' },
    excel: { imgSrc: 'Images/s_excel.png' },
    question: { imgSrc: 'Images/question1.png' },
    information: { imgSrc: 'Images/s_information2.png' },
    critical: { imgSrc: 'Images/Critical1.png' },
    sync: { imgSrc: 'Images/s_sync.png' },
};

var imagePosition = {
    imgPosition: "center", textPosition: "left", textImageRelation: "imageBeforeText",
    imgWidth: 20, imgHeight: 20
};

function getEditModeImage(editMode, imageUrl, otherNoImage) {
    try {
        if (imageUrl != null) {
            return { imgSrc: imageUrl };
        }
        else {
            switch (editMode) {
                case 0:
                    return imageScr.view;
                    break;
                case 1:
                    return imageScr.edit;
                    break;
                case 2:
                    return imageScr.append;
                    break;
                case 3:
                    return imageScr.delete;
                    break;
                case 5:
                    return imageScr.print;
                    break;
                case 9:
                    if (otherNoImage != true) {
                        return imageScr.view;
                    }
                    break;
            }
        }
    }
    catch (err) {
        errorHandle(utilityName, 'getEditModeImage', err);
    }
}

JSON.prototype = {
    clone: function (obj) {
        return JSON.parse(JSON.stringify(obj));
    }
};
///複製物件
function cloneJSON(obj) {
    //if (Array.isArray(obj) == true) {
    //    if (browser().isIE) {
    //        return $.extend(true, [], obj);
    //    }
    //    else {
    //        return Object.assign([], obj);
    //    }
    //}
    //else {
    //    if (browser().isIE) {
    //        return $.extend(true, {}, obj);
    //    }
    //    else {
    //        return Object.assign({}, obj);
    //    }
    //}
    if (obj != null && (obj.constructor === {}.constructor || obj.constructor === [].constructor)) {
        if (Array.isArray(obj) == true) {
            return $.extend(true, [], obj);
        }
        else {
            return $.extend(true, {}, obj);
        }
    }
    else {
        return obj;
    }
};
function copyTableData(table, tableName, addData) {
    try {
        var r = {};
        if (addData == null) addData = true;
        if (addData) {
            r[tableName] = cloneJSON(table[tableName]);
        }
        else {
            r[tableName] = { columns: cloneJSON(table[tableName].columns), rows: [] };
        }
        return r;
    }
    catch (err) {
        errorHandle(utilityName, 'copyTableData', err);
    }
}
function copyRowToRow(targeRow, sourceRow, columns) {
    try {
        if (targeRow == null || columns == null) {
            targeRow = sourceRow;
        }
        else {
            var cLength = columns.length;
            for (var i = 0 ; i < cLength; i++) {
                targeRow[columns[i].name] = sourceRow[columns[i].name];
            }
        }
        return targeRow;
    }
    catch (err) {
        errorHandle(utilityName, 'copyTableData', err);
    }
}
///取得捲軸高度
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
        errorHandle(utilityName, 'getScrollBarHeight', err);
    }
};
///取得捲軸寬度
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
        errorHandle(utilityName, 'getScrollBarWidth', err);
    }
};
///檢核是否有捲軸
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
        errorHandle(utilityName, 'checkHaveScroll', err);
    }
};
///訊息種類
var messageType = {
    information: 0,
    critical: 1,
    yesno: 2,
    yesnocancel: 3
};
///秀訊息
function messageBox(msg, msgType, prompt, action, options) {
    try {
        if (prompt == null) prompt = language.prompt;
        if (msgType == null) msgType = 0;
        if (options == null) options = {};
        var msgId = "messageBox" + getUniqueId();
        var msgBody = msgId + '_body';
        var msgChild = msgId + '_child';
        var msgCaption = msgId + '_caption';
        var msgImage = msgId + '_img';
        var msgButtons = msgId + '_btns';
        var btnControls = [];
        var buttonWidth = 100;
        var buttonHeight = 32;
        var fontSize = 14;
        //2018/08/01 Jacky 改成64
        var imageWidth = 64;
        var retValue;
        $('<div id="' + msgId + '"><div>' + prompt + '</div><div id="' + msgChild + '"></div></div>').appendTo('body');
        $('#' + msgId).csWindow($.extend({
            minWidth: 500,
            minHeight: 200,
            maxWidth: $(document).width() - 20,
            maxHeight: $(document).height() - 20,
            resizable: true,
            closeButtonAction: 'close',
            isModal: true,
            //theme: "office"
        }, options));
        var x = ($('body').width() - $('#' + msgId).csWindow('width')) / 2;
        $('#' + msgId).csWindow({ position: { x: x, y: 0 } });
        //$('#' + msgId + ' .jqx-window-header').css('display', 'none');
        $('#' + msgChild).css('overflow', 'hidden');
        $('<div id ="' + msgBody + '"></div>').appendTo('#' + msgChild);
        $('#' + msgBody).css('height', '99.6%');
        $('<div id="' + msgImage + '" style="float:left;width:' + imageWidth + 'px;height:' + imageWidth + 'px;"><img style="width:100%;height:100%;"></img></div>').appendTo('#' + msgBody);
        $('<textarea id="' + msgCaption + '" style="float:left;padding-top:6px;padding-left:6px;"></textarea>').appendTo('#' + msgBody);
        $('#' + msgCaption).jqxTextArea({
            width: '99.5%',
            height: $('#' + msgBody).height() - 5,
            //disabled: true
        });
        $('#' + msgCaption).jqxTextArea('val', msg);
        $('#' + msgCaption).css({ "border": 0 });
        $($('#' + msgCaption).parent().parent()).css('border', 0);
        //$($('#' + msgCaption).parent().parent()).css('border-bottom', 1);
        //$('#messageBox_child').text(msgId);
        $('#' + msgId).on('close', function () {
            try {
                $('#' + msgId).off("resizing", resize);
                $('#' + msgId).off();
                $('#' + msgCaption).off();
                destroySingleControl({ name: msgCaption, type: "jqxTextArea" });
                //$('#' + msgCaption).jqxTextArea('destroy');
                for (var i = 0; i < btnControls.length; i++) {
                    destroySingleControl({ name: btnControls[i].name, type: "jqxButton" });
                }
                $('#' + msgId).csWindow('destroy');
                if (typeof action === 'function') {
                    action(retValue);
                }
            }
            catch (err) {
                errorHandle(utilityName, 'messageBox_close', err, true, true);
            }
        });
        //$('#' + msgId).on('resized', function () {
        //    resize();
        //});
        $('#' + msgId).off('resizing');
        $('#' + msgId).on('resizing', resize);
        var yesId = msgButtons + '_0';
        var noId = msgButtons + '_1';
        var cancelId = msgButtons + '_2';
        var okId = msgButtons + '_3';
        var img;
        if (msgType == messageType.yesno) {
            btnControls.push({ name: yesId, text: language.yes });
            btnControls.push({ name: noId, text: language.no });
            img = imageScr.question.imgSrc;
        }
        else if (msgType == messageType.yesnocancel) {
            btnControls.push({ name: yesId, text: language.yes });
            btnControls.push({ name: noId, text: language.no });
            btnControls.push({ name: cancelId, text: language.cancel });
            img = imageScr.question.imgSrc;
        }
        else if (msgType == messageType.critical) {
            btnControls.push({ name: okId, text: language.ok });
            img = imageScr.critical.imgSrc;
        }
        else {
            btnControls.push({ name: okId, text: language.ok });
            img = imageScr.information.imgSrc;
        }
        if (btnControls.length > 0) {
            //if (btnControls.length > 1) {
            //    imageWidth = 36;
            //    $($('#' + msgBody).children()[0]).css('float', 'left');
            //    $('<div style="float:left;height:' + imageWidth + 'px;width:' + imageWidth + 'px;"><img style="height:' + imageWidth + 'px;width:' + imageWidth + 'px;" src="Images/question.png"/></div>').insertBefore($('#' + msgBody).children()[0]);
            //}
            $('<div id = "' + msgButtons + '" style="border-top:1px;"></div>').appendTo('#' + msgChild);
        }
        $($("#" + msgImage).children()[0]).attr("src", img);
        var bLength = btnControls.length;
        for (var i = bLength - 1; i >= 0; i--) {
            $('<input type="button" id="' + btnControls[i].name + '" style="float:right;margin:2px;width:99%;" />').appendTo($('#' + msgButtons));
            $('#' + btnControls[i].name).jqxButton({
                height: buttonHeight, width: buttonWidth, value: btnControls[i].text,
                //theme: "office"
            });
            var btnChild = $('#' + btnControls[i].name + ' span');
            btnChild.css({ "font-size": fontSize });
            btnChild.css('top', (buttonHeight - 3 - btnChild.height()) / 2 + 0.5);
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
                $('#' + msgId).csWindow('close');
            });
        }
        $('#' + msgId + " div").css({ "font-size": fontSize });
        $('#' + msgId + " input").css({ "font-size": fontSize });
        $('#' + msgId + " textarea").css({ "font-size": fontSize });
        $('#' + msgId + " span").css({ "font-size": fontSize });
        resize();
        function resize() {
            try {
                if ($('#' + msgId + ' .jqx-window-header').css('display') == "none") {
                    $('#' + msgId).css("height", $('#' + msgChild).height() - buttonHeight - 8);
                }
                else {
                    $('#' + msgBody).css("height", $('#' + msgChild).height() - buttonHeight - 8);
                    $('#' + msgId + ' .jqx-window-header').css({ width: $('#' + msgId).width() - 12 });
                }
                //$('#' + msgCaption).jqxTextArea({ width: $('#' + msgBody).width() - imageWidth - 2 });
                //$('#' + msgCaption).jqxTextArea({ height: $('#' + msgBody).height() - 8 });
                $('#' + msgCaption).jqxTextArea({
                    height: $('#' + msgChild).height() - buttonHeight - 12,
                    width: $('#' + msgChild).width() - imageWidth - 10
                });
            }
            catch (err) {
                errorHandle(utilityName, 'messageBox_resize', err, true, true);
            }
        }
    }
    catch (err) {
        //alert(msg);
        errorHandle(utilityName, 'messageBox', err, true, true);
    }
};
///排序物件
function sortObject(o, sortValue) {
    try {
        return o.sort(function (x, y) {
            var arrKeys;
            if (Array.isArray(sortValue)) {
                arrKeys = sortValue;
            }
            else {
                arrKeys = sortValue.split(',');
            }
            var akLength = arrKeys.length;
            var result = 0;
            for (var i = 0; i < akLength; i++) {
                var sortType = 'asc';
                var arr2 = arrKeys[i].split(' ');
                if (arr2[1] != null && arr2[1] == 'desc') sortType = 'desc';
                if (sortType == 'desc') {
                    if (x[arr2[0]] < y[arr2[0]]) result = 1;
                    if (x[arr2[0]] > y[arr2[0]]) result = -1;
                }
                else {
                    if (x[arr2[0]] > y[arr2[0]]) result = 1;
                    if (x[arr2[0]] < y[arr2[0]]) result = -1;
                }
                if (result !== 0) break;
            }
            return result;
        });
    }
    catch (err) {
        errorHandle(utilityName, 'sortObject', err, true);
    }
}
///取得grid "項次" column 設定
function getGridRowNumberColumn(text, width, marginValue, dataField) {
    try {
        if (width == null) width = 40;
        if (text == null) text = "#";
        if (marginValue == null) { marginValue = 6; }
        if (dataField == null) { dataField = ""; }
        var retData = {
            text: text, sortable: false, filterable: false, editable: false,
            groupable: false, draggable: false,
            datafield: dataField, columntype: 'number', pinned: true, width: width,
            menu: false,
            cellsrenderer: function (row, column, value) {
                return "<div style='margin-left:4px;margin-top:" + marginValue + "px;'>" + (value + 1) + "</div>";
            }
        }
        return retData;
    }
    catch (err) {
        errorHandle(utilityName, 'getGridRowNumberColumn', err, true);
    }
};
//設定CheckBox
function getGridCheckBoxColumn(gridId, field, caption, theme, isTree, id) {
    try {
        if (field == null) {
            field = "CHOOSE";
        }
        if (caption == null) {
            caption = "#";
        }
        if (theme == null) {
            theme = $.jqx.theme;
        }
        var gridType = "jqxGrid";
        var beginupdate = "beginupdate";
        var selectallrows = "selectallrows";
        var selectRow = null;
        var clearselection = "clearselection";
        var getrows = "getrows";
        var setcellvalue = "setcellvalue";
        var endupdate = "endupdate";
        if (isTree == true) {
            gridType = "jqxTreeGrid";
            beginupdate = "beginUpdate";
            selectallrows = null;
            selectRow = "selectRow";
            clearselection = "clearSelection";
            getrows = "getRows";
            setcellvalue = "setCellValue";
            endupdate = "endUpdate";
        }
        var checkedFunc = function (event) {
            try {
                var checked = event.args.checked;
                if (checked == null) return;
                $("#" + gridId)[gridType](beginupdate);
                if (checked) {
                    if (selectallrows != null) {
                        $("#" + gridId)[gridType](selectallrows);
                    }
                }
                else if (checked == false) {
                    $("#" + gridId)[gridType](clearselection);
                }
                var rows = $("#" + gridId)[gridType](getrows);
                var rLength = rows.length;
                var e = $.Event("beginrowselectall", { args: { newvalue: checked } });
                $("#" + gridId).triggerHandler(e);
                for (var i = 0; i < rLength; i++) {
                    if (isTree == true) {
                        $("#" + gridId)[gridType](setcellvalue, rows[i][id], field, event.args.checked);
                    }
                    else {
                        var boundindex = $("#" + gridId)[gridType]('getrowboundindex', i);
                        $("#" + gridId)[gridType](setcellvalue, boundindex, field, event.args.checked);
                    }
                }
                var e = $.Event("endrowselectall", { args: { newvalue: checked } });
                $("#" + gridId).triggerHandler(e);
                $("#" + gridId)[gridType](endupdate);
            }
            catch (err) {
                errorHandle(utilityName, 'getGridCheckBoxColumn_checkedFunc', err, true);
            }
        }
        var renderHead = function (e) {
            try {
                $(e).parent().find('.iconscontainer').css('width', '0');
                $(e).jqxCheckBox({ theme: theme, width: 18, height: 16, animationShowDelay: 0, animationHideDelay: 0 });
                $(e).on('change', checkedFunc);
            }
            catch (err) {
                errorHandle(utilityName, 'getGridCheckBoxColumn_renderHead', err, true);
            }
        }
        var r = {
            text: caption, datafield: field,
            cellsalign: "center", menu: false, sortable: false, editable: true,
            align: "center", pinned: true, filterable: false,
            groupable: false, draggable: false, resizable: false,
            columntype: 'checkbox',
            width: 32,
            renderer: function () {
                var e = '<div style="margin-top:6px;margin-left:6px;"></div>';
                return e;
            },
            rendered: renderHead
        };
        return r;
    }
    catch (err) {
        errorHandle(utilityName, 'getGridCheckBoxColumn', err, true);
    }
};
///匯出成excel
function exportGridToExcel(grids, fileName) {
    try {
        var gs;
        if (Array.isArray(grids) == true) {
            gs = grids;
        }
        else {
            //補3party 的 bug 日期為undefined 時會出錯
            var source = $('#' + grids.name)[grids.type]("source");
            var rLength = source.records.length;
            for (var i = 0; i < rLength; i++) {
                var keys = Object.keys(source.records[i]);
                var kLength = keys.length;
                for (var j = 0; j < kLength; j++) {
                    if (source.records[i][keys[j]] === undefined) {
                        source.records[i][keys[j]] = null;
                    }
                }
            }
            if (grids.type == "jqxGrid") {
                return $('#' + grids.name)[grids.type]('exportdata', 'xls', fileName, null, null, null, "exportFile.ashx");
            }
            else {
                return $('#' + grids.name)[grids.type]('exportData', 'xls', fileName, null, null, null, "exportFile.ashx");
            }
        }
        var xml = $('#' + gs[0].name)[gs[0].type]('exportdata', 'xls');
        var xml2 = [];
        for (var i = 1; i < gs.length; i++) {
            var dom = $.parseXML($('#' + gs[i].name)[gs[i].type]('exportdata', 'xls'));
            var worksheet = $(dom).find('Worksheet');
            $(worksheet).attr('ss:Name', 'Sheet' + (i + 1).toString());
            xml2.push($(worksheet)[0].outerHTML);
        }
        if (xml2.length > 0) {
            xml = xml.replace('</Worksheet>', '</Worksheet>' + xml2.join('\r\n'));
        }
        if (fileName == null) {
            fileName = 'export.xls';
        }
        else {
            if (fileName.toUpperCase().indexOf('.xls') < 0) {
                fileName += '.xls';
            }
        }
        if (browser().isIE == true) {
            var blobObject = new Blob([xml]);
            window.navigator.msSaveBlob(blobObject, fileName);
        } else {
            var link = document.createElement("a");
            link.setAttribute("target", "_blank");
            link.setAttribute("href", "data:application/octet-stream;charset=utf-8," + encodeURIComponent(xml));
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    catch (err) {
        errorHandle(utilityName, 'exportGridToExcel', err, true);
    }
}
///下載檔案
function downloadFile(fileName, text) {
    try {
        if (isEmpty(fileName)) return;
        if (fileName.substr(0, 1) == "/") fileName = fileName.substr(1);
        var a = $('<a href="' + fileName + '" target="_blank" download></a>').appendTo("body");
        var b = $('<input type="button" />').appendTo($(a));
        b.click();
        a.remove();
        //if (browser().isIE == true) {
        //    var blobObject = new Blob([text]);
        //    window.navigator.msSaveBlob(blobObject, fileName);
        //} else {
        //    var link = document.createElement("a");
        //    link.setAttribute("target", "_blank");
        //    link.setAttribute("href", "data:application/octet-stream;charset=utf-8," + encodeURIComponent(text));
        //    link.setAttribute("download", fileName);
        //    document.body.appendChild(link);
        //    link.click();
        //    document.body.removeChild(link);
        //}
    }
    catch (err) {
        errorHandle(utilityName, 'exportGridToExcel', err, true);
    }
}
///檢核browser
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
        errorHandle(utilityName, 'browser', err, true);
    }
};
///載入js File
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
        errorHandle(utilityName, 'loadFile', err, true);
    }
};
///檢核UI 必要欄位
function checkUIMustBe(value, caption, action) {
    if (value == null || value.length == 0) {
        showMustBe(caption, action);
        return false;
    }
    else return true;
};
///檢核元件必要欄位
function checkControlMustBe(control, caption, action) {
    try {
        var valueName = "val";
        switch (control.type) {
            case "csDateTime":
                valueName = "getText";
                break;
            case "csList":
                valueName = "codeNo";
                break;
            case "csMulti":
                valueName = "getChooseList";
                break;
            case "csAddress1":
                valueName = "addrNo";
                break;
            case "csAddress2":
                valueName = "getQryString";
                break;
            case "csUploadFile":
                valueName = "getFiles";
                break;
            default:
        }
        var value = $("#" + control.name)[control.type](valueName);
        if (isEmpty(value)) {
            showMustBe(caption, function (r) {
                if (control.type == "jqxPasswordInput") {
                    $("#" + control.name).focus();
                }
                else {
                    $("#" + control.name)[control.type]("focus");
                }
                if (typeof action == "function") { action(r); }
            });
            return false;
        }
        else {
            return true;
        }
    }
    catch (err) {
        errorHandle(utilityName, 'checkControlMustBe', err, true);
    }
};
///顯示必要欄位
function showMustBe(caption, action, options) {
    messageBox(language.mustBe.replace("{0}", caption), null, null, action, options);
};
///載入多個js 檔案
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
                errorHandle(utilityName, 'loadScriptBySettingFile', err);
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
///取得加密值
var aesEncrypt = function (data, keyStr, ivStr) {
    try {
        var sendData = CryptoJS.enc.Utf8.parse(data);
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var iv = CryptoJS.enc.Utf8.parse(ivStr);
        //ECB,Zeros
        var encrypted = CryptoJS.AES.encrypt(sendData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
        //return CryptoJS.enc.Base64.stringify(encrypted.toString(CryptoJS.enc.Utf8));
        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    }
    catch (err) {
        errorHandle(utilityName, 'aesEncrypt', err, true);
    }
};
///取得解密值
var aesDecrypt = function (data, keyStr, ivStr) {
    try {
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var iv = CryptoJS.enc.Utf8.parse(ivStr);
        //解密的是基于BASE64的数据，此处data是BASE64数据
        var decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    catch (err) {
        errorHandle(utilityName, 'aesEncrypt', err, true);
    }
};
///destroy 元件
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
            for (var i = controls.length - 1; i >= 0; i--) {
                if (controls[i] != null && controls[i].level == j) {
                    var o = $('#' + controls[i].name);
                    if (o.length == 0) { continue; }
                    //2016/11/01 jqx Bug 沒有把scroll 事件清除
                    destroySingleControl(controls[i]);

                    controls[i] = null;
                }
                //$($(div).find('[data-id=codeno]')[0])
            }
        }
        controls.length = 0;
        controls = [];
    }
    catch (err) {
        errorHandle(utilityName, 'destroyControls', err);
    }
};
function destroySingleControl(control) {
    try {
        var o = $('#' + control.name);
        //2016/11/01 jqx Bug 沒有把scroll 事件清除
        if (control['type'] == 'jqxDropDownButton') {
            offElementEvents($("#dropDownButtonPopup" + control['name']));
            $("#" + control['name']).parents().off('scroll.dropdownbutton' + control['name']);
        }
            //else if (control['type'] == 'jqxSplitter') {
            //    var x;
            //    x = 1;
            //}
            //else if (control['type'] == 'jqxRadioButton') {
            //    var data = $.data($("#" + control['name'])[0]);
            //    if (data.propertyChangeMap) {
            //        data.propertyChangeMap['width'] = null;
            //        data.propertyChangeMap['height'] = null;
            //        data.propertyChangeMap = null;
            //        delete data.propertyChangeMap['width'];
            //        delete data.propertyChangeMap['height'];
            //        delete data.propertyChangeMap;
            //    }
            //}
        else if (control['type'] == 'jqxPanel') {
            offElementEvents($("#" + control['name'] + ' .jqx-scrollbar'));
        }
            //2016/11/09 Jacky 增加清除grid 建的 filter events
        else if (control['type'] == 'jqxGrid') {
            var events = ['mousemove', 'mouseout', 'mouseleave', 'mouseover', 'mouseenter'];
            for (var x = 0; x < events.length; x++) {
                $(document).off(events[x] + '.verticalScrollBarfilter1' + control['name'] + 'ex');
                $(document).off(events[x] + '.horizontalScrollBarfilter1' + control['name'] + 'ex');
            }
            //var docE = $._data($(document)[0], 'events');
            //if (docE != null && docE['mouseup'] != null) {
            //    var docEvents = docE['mouseup'];
            //    for (var x = docEvents.length - 1; x >= 0 ; x--) {
            //        if (docEvents[x] != null) {
            //            var namespace = docEvents[x]['namespace'];
            //            if (namespace.indexOf('filter') >= 0 && namespace.indexOf(control['name']) >= 0) {
            //                $(document).off('mouseup.' + namespace);
            //            }
            //        }
            //    }
            //}
            //2018/12/21 再補
            //offElementEvents("#listBoxfilter1" + control["name"]);
            //offElementEvents("#listBoxfilter2" + control["name"]);
            //offElementEvents("#listBoxfilter3" + control["name"]);
            //offElementEvents("#menuWrappergridmenu" + control["name"]);
            //var gridCols = $(o).find(".jqx-grid-column-header");
            //for (var gc = 0; gc < gridCols.length; gc++) {
            //    offElementEvents($(gridCols[gc]));
            //}
            var cols = $(o).jqxGrid("columns");
            if (cols != null && cols.records != null) {
                for (var r = 0; r < cols.records.length; r++) {
                    //補dropdownlist 沒有destroy 問題
                    var headId = null;
                    var controltype = null;
                    switch (cols.records[r].columntype) {
                        case "dropdownlist":
                            headId = "dropdownlisteditor";
                            controltype = "jqxDropDownList";
                            break;
                            //case "checkbox":
                            //    headId = "checkbox";
                            //    controltype = "jqxCheckbox";
                            //    break;
                    }
                    if (headId != null) {
                        var ddlId = headId + control['name'] + cols.records[r]["datafield"];
                        if ($("#" + ddlId).length > 0) {
                            destroySingleControl({ name: ddlId, type: controltype });
                        }
                    }
                }
            }
            //deleteJSONObject(cols);
            //var source = $(o).jqxGrid("source");
            //deleteJSONObject(source);
        }
        else if (control['type'] == 'jqxButton') {
            offElementEvents($("#" + control['name'] + '_jqxButton'));
            $("#" + control['name'] + '_jqxButton').remove();
        }
        else if (control['type'] == 'csWindow' || control['type'] == 'jqxWindow') {
            var elements = $("#" + control['name'] + ' .jqx-window');
            for (var ee = elements.length - 1; ee >= 0; ee--) {
                $(elements[ee])["csWindow"]("destroy");
            }
        }
        else if (control['type'] == 'csList') {
            var child = $("#" + control["name"]).find("[data-cslist='cslMain']");
            if (child.length > 0) {
                var childId = $(child[0]).prop("id");
                offElementEvents($("#dropDownButtonPopup" + childId));
            }
        }
        else if (control['type'] == 'jqxDateTimeInput') {
            $('body').off('scroll.' + 'datetimeinput' + control['name']);
        }
        else if (control['type'] == "jqxNumberInput") {
            var btns = $("#" + control['name']).find('[role="button"]')
            for (var nb = 0; nb < btns.length; nb++) {
                var btnId = $(btns[nb]).prop("id");
                $(document).off("mouseup.button" + btnId);
                $(document).off("mouseup." + btnId);
                $(document).off("mouseup." + btnId);
            }
            $(document).off("mouseup." + control['name']);
        }
        else if (control['type'] == 'jqxPasswordInput') {
            $(document).off('mousedown.' + 'passwordinput' + control['name']);
            $(document).off('mouseup.' + 'passwordinput' + control['name']);
        }
        //$("#" + control['name']).off();
        var eCount = offElementEvents($("#" + control['name']));
        //alert(control.name);
        //if (control.type.indexOf('csMulti') >= 0) { continue; }
        if (isEmpty(control.type) == false && control.type != 'TabsItem' &&
            control.type != 'label') {
            if ($("#" + control['name']).length > 0) {
                //if (control['type'] == 'jqxGrid') {
                //}
                var textAreaIDs = [];
                if (control['type'] == 'jqxTextArea') {
                    var tElement = $("#" + control['name']).find("[id]");
                    tElement.each(function () {
                        textAreaIDs.push($(this).prop("id"));
                    });
                }
                //deletejqxData(control);
                $("#" + control['name'])[control.type]('destroy');

                clearwatchedElementData(control["name"]);
                if (control['type'] == 'jqxTextArea') {
                    for (var tt = 0; tt < textAreaIDs.length; tt++) {
                        clearwatchedElementData(textAreaIDs[tt]);
                    }
                }
            }
        }
    }
    catch (err) {
        errorHandle(utilityName, 'destroySingleControl', err);
    }
}
function deletejqxData(control) {
    try {
        var vars = $.data($("#" + control.name)[0], control.type);
        if (vars) {
            var keys = Object.keys(vars);
            for (var i = 0; i < keys.length; i++) {
                vars[keys[i]] = null;
                delete vars[keys[i]];
            }
        }
        //vars = null;
        //delete vars;
        //$.data($("#" + control.name)[0], control.type, null);
        //delete $.data($("#" + control.name)[0], control.type);
    }
    catch (err) {
        errorHandle(utilityName, 'deletejqxData', err);
    }
}
function clearwatchedElementData(name) {
    try {
        var propertys = ["watchedElementData"];
        for (var i = 0 ; i < propertys.length; i++) {
            if ($.jqx.utilities && $.jqx.utilities[propertys[i]]) {
                var doWa = false;
                for (var wa = 0; wa < $.jqx.utilities[propertys[i]].length; wa++) {
                    if ($.jqx.utilities[propertys[i]][wa] &&
                        $.jqx.utilities[propertys[i]][wa].element &&
                        $($.jqx.utilities[propertys[i]][wa].element).prop("id") == name) {
                        $.jqx.utilities[propertys[i]][wa].element = null;
                        delete $.jqx.utilities[propertys[i]][wa].element;
                        delete $.jqx.utilities[propertys[i]][wa];
                        doWa = true;
                    }
                }
                if (doWa == true) { $.jqx.utilities[propertys[i]] = $.jqx.utilities[propertys[i]].filter(function (e) { return e }); }
                //TextArea 還要清
            }
        }
        var propertys = ["resizeHandlers"];
        for (var i = 0 ; i < propertys.length; i++) {
            if ($.jqx.utilities && $.jqx.utilities[propertys[i]]) {
                var doWa = false;
                for (var wa = 0; wa < $.jqx.utilities[propertys[i]].length; wa++) {
                    if ($.jqx.utilities[propertys[i]][wa] &&
                        $.jqx.utilities[propertys[i]][wa].id == name) {
                        $.jqx.utilities[propertys[i]][wa].callback = null;
                        $.jqx.utilities[propertys[i]][wa].data = null;
                        $.jqx.utilities[propertys[i]][wa].widget = null;
                        delete $.jqx.utilities[propertys[i]][wa].callback;
                        delete $.jqx.utilities[propertys[i]][wa].data;
                        delete $.jqx.utilities[propertys[i]][wa].widget;
                        delete $.jqx.utilities[propertys[i]][wa]
                        doWa = true;
                    }
                }
                if (doWa == true) { $.jqx.utilities[propertys[i]] = $.jqx.utilities[propertys[i]].filter(function (e) { return e }); }
                //TextArea 還要清
            }
        }
    }
    catch (err) {
        errorHandle(utilityName, 'destroySingleControl', err);
    }
}
function removeElements(div, includeMe) {
    try {
        if ($(div).length == 0) { return; }
        var children = $(div).children();
        var eCount = 1;
        for (var i = 0 ; i < children.length; i++) {
            eCount += removeElements($(children[i]));
            $(children[i]).remove();
            $(children[i])[0].innerHTML = "";
        }
        children = null;
        if (includeMe) {
            $(div).remove();
            $(div)[0].innerHTML = "";
        }
        return eCount;
    }
    catch (err) {
        errorHandle(utilityName, 'offElementEvents', err);
    }
}
function offElementEvents(div) {
    try {
        if ($(div).length == 0) { return; }
        var children = $(div).children();
        var eCount = 1;
        for (var i = 0 ; i < children.length; i++) {
            eCount += offElementEvents($(children[i]));
        }
        children = null;
        $.event.remove(div);
        //$(div).removeClass();
        $(div).off();
        $(div).unbind();
        return eCount;
    }
    catch (err) {
        errorHandle(utilityName, 'offElementEvents', err);
    }
}
///用key value 取得 rows
function getRowByKeyValue(o, keys, values, multi) {
    try {
        var rows = [];
        var arrKeys = [];
        var arrValues = [];
        if (multi == null) multi = false;
        if (Array.isArray(o)) rows = o;
        else rows = o.rows;

        if (Array.isArray(keys)) arrKeys = keys;
        else arrKeys = keys.split(',');

        if (Array.isArray(values)) { arrValues = values; }
        else if (typeof (values) === 'string') { arrValues = values.toString().split(','); }
        else { arrValues = [values]; }

        var rLength = rows.length;
        var kLength = arrKeys.length;
        var rRows = [];
        for (var i = 0; i < rLength; i++) {
            var ok = true;
            for (var j = 0; j < kLength; j++) {
                var rValue = rows[i][arrKeys[j]];
                var chkValue = arrValues[j];
                if (typeof (values) === 'object' && isDate(rValue)) {
                    rValue = new Date(rValue).toUTCString();
                }
                if (typeof (chkValue) === 'object' && isDate(chkValue)) {
                    chkValue = new Date(chkValue).toUTCString();
                }
                if (rValue != chkValue) {
                    ok = false;
                    break;
                }
            }
            if (ok == true) {
                if (multi == true) {
                    rRows.push(rows[i]);
                }
                else {
                    return rows[i];
                }
            }
        }
        if (rRows.length == 0) {
            return null;
        }
        else {
            return rRows;
        }

    }
    catch (err) {
        errorHandle(utilityName, 'getRowByKeyValue', err);
    }
};
///用key value 取得 rowIndexes
function getRowIndexByKeyValue(o, keys, values, multi) {
    try {
        var rows = [];
        var arrKeys = [];
        var arrValues = [];
        if (multi == null) multi = false;
        if (Array.isArray(o)) rows = o;
        else rows = o.rows;

        if (Array.isArray(keys)) arrKeys = keys;
        else arrKeys = keys.split(',');

        if (Array.isArray(values)) arrValues = values;
        else if (typeof (values) === 'string') arrValues = values.toString().split(',');
        else arrValues = [values];

        var rLength = rows.length;
        var kLength = arrKeys.length;
        var rIdxes = [];
        for (var i = 0; i < rLength; i++) {
            var ok = true;
            for (var j = 0; j < kLength; j++) {
                if (rows[i][arrKeys[j]] != arrValues[j]) {
                    ok = false;
                    break;
                }
            }
            if (ok == true) {
                if (multi == true) {
                    rIdxes.push(i);
                }
                else {
                    return i;
                }
            }
        }
        if (rIdxes.length == 0) {
            return null;
        }
        else {
            return rIdxes;
        }

    }
    catch (err) {
        errorHandle(utilityName, 'getRowIndexByKeyValue', err);
    }
};
function deleteJSONObject(inObj, keyName, noChild) {
    try {
        if (inObj == null) return;
        var o;
        if (keyName != null) {
            o = inObj[keyName];
        }
        else {
            o = inObj;
        }
        if (o == null) return;
        if (typeof o == "string") return;
        var keys = Object.keys(o);
        var kLength = keys.length;
        for (var i = 0; i < keys.length; i++) {
            if (o[keys[i]] != null && (o[keys[i]].constructor === {}.constructor ||
                o[keys[i]].constructor === [].constructor)) {
                if (noChild != true) {
                    //deleteJSONObject(o[keys[i]]);
                }
            }
            if (typeof o[keys[i]] == "function") {
                o[keys[i]] = null;
            }
            delete o[keys[i]];
        }
        keys = null;
        delete keys;
        if (Array.isArray(o)) o.length = 0;
        if (keyName != null) {
            inObj[keyName] = null;
            delete inObj[keyName];
        }
        else {
            inObj = null;
            delete inObj;
        }
        o = null;
    }
    catch (err) {
        errorHandle(utilityName, 'deleteJSONObject', err);
    }
}
///用key value刪除rows
function deleteRowByKeyValue(o, keys, values, multi) {
    try {
        var rows = [];
        var arrKeys = [];
        var arrValues = [];
        if (multi == null) multi = false;
        if (Array.isArray(o)) rows = o;
        else rows = o.rows;

        if (Array.isArray(keys)) arrKeys = keys;
        else arrKeys = keys.split(',');

        if (Array.isArray(values)) arrValues = values;
        else if (typeof (values) === 'string') arrValues = values.toString().split(',');
        else arrValues = [values];

        var rLength = rows.length;
        var kLength = arrKeys.length;
        var rRows = [];
        for (var i = 0; i < rLength; i++) {
            var ok = true;
            for (var j = 0; j < kLength; j++) {
                var rValue = rows[i][arrKeys[j]];
                var chkValue = arrValues[j];
                if (typeof (values) === 'object' && isDate(rValue)) {
                    rValue = new Date(rValue).toUTCString();
                }
                if (typeof (chkValue) === 'object' && isDate(chkValue)) {
                    chkValue = new Date(chkValue).toUTCString();
                }
                if (rValue != chkValue) {
                    ok = false;
                    break;
                }
            }
            if (ok == true) {
                if (multi == true) {
                    delete rows[i];
                }
                else {
                    delete rows[i];
                    break;
                }
            }
        }
        rows = rows.filter(function (e) { return e });
        return rows;
    }
    catch (err) {
        errorHandle(utilityName, 'deleteRowByKeyValue', err);
    }
};
/////用key value刪除rows
//function deleteRowByKeyValue(o, key, value) {
//    try {
//        var rows;
//        if (Array.isArray(o)) rows = o;
//        else rows = o.rows;
//        var rLength = rows.length;
//        for (var i = 0; i < rLength; i++) {
//            if (rows[i] != null && rows[i][key] == value) {
//                delete rows[i];
//            }
//        }
//        rows = rows.filter(function (e) { return e });
//        return rows;
//    }
//    catch (err) {
//        errorHandle(utilityName, 'deleteRowByKeyValue', err);
//    }
//};
///取得選取(checkbox 勾選)的Rows
function getChooseRows(o, field) {
    try {
        var rows;
        if (Array.isArray(o)) rows = o;
        else rows = o.rows;
        if (field == null) field = 'CHOOSE';
        var rLength = rows.length;
        var rRows = [];
        for (var i = 0; i < rLength; i++) {
            if (rows[i] != null && rows[i][field] == true) {
                rRows.push(rows[i]);
            }
        }
        return rRows;
    }
    catch (err) {
        errorHandle(utilityName, 'getChooseRows', err);
    }
};
///取得form 參數
function addHandlerGetParameters(div, options) {
    if (div != null && $(div).length > 0) {
        $(div).on('keydown', function (e) {
            try {
                if (e.ctrlKey && e.which == 119) {
                    var opts = cloneJSON(options);
                    var keys = Object.keys(opts);
                    $.each(keys, function (i, v) {
                        if (opts[v] && (opts[v] instanceof HTMLElement || opts[v].constructor == $(document).constructor)) {
                            opts[v] = $(opts[v])[0].id;
                        }
                    });
                    keys = null;
                    messageBox($(div).prop('id') + ':\r\n' + JSON.stringify(opts, null, '\t'), null, null, null, { width: 800, height: 500 });
                    opts = null;
                }
            }
            catch (err) {
                errorHandle(utilityName, 'addHandlerGetParameters_keydown', err, true);
            }
        });
    }
};
///設定元件參數
function controlParameter(div, name, paraName, params) {
    try {
        var options = $.data(div, name).options;
        var controls = options.controls;
        if (params != null) {
            for (var i = 0; i < controls.length; i++) {
                var o = $('#' + controls[i].name);
                if (controls[i].type.indexOf('jqx') >= 0) {
                    var val = {};
                    val[paraName] = params;
                    $(o)[controls[i].type](val);
                }
                else if (controls[i].type.indexOf('dyn') >= 0) {
                    $(o)[controls[i].type](paraName, params);
                }
                else if (controls[i].type.indexOf('cs') >= 0) {
                    $(o)[controls[i].type](paraName, params);
                }
            }
            options[paraName] = params;
        }
        else {
            return options[paraName];
        }
    }
    catch (err) {
        errorHandle(utilityName, 'controlParameter', err);
    }
};

//Create Date: 2016/10/03 by Jacky
//建立csWindow
function createcsWindow(div, title, options) {
    ///<summary>建立csWindow</summary>
    ///<param name="div" type="UI Object">UI div</param>
    ///<param name="title" type="String">title</param>
    ///<param name="options" type="Object">csWindow參數</param>
    try {
        var divName = $(div).prop('id') + getUniqueId();
        var div2Name = $(div).prop('id') + getUniqueId();
        $('<div id="' + divName + '"><div>' + title + '</div><div id="' + div2Name + '"></div></div>').appendTo($(div));
        $('#' + divName).csWindow(options);
        $('#' + divName).appendTo($(div));
        return { windowId: divName, contentId: div2Name };
    }
    catch (err) {
        errorHandle(utilityName, 'createcsWindow', err);
    }
};
function getMaxValueByKey(o, keys) {
    ///<summary>取得最大值</summary>
    ///<param name="o" type="UI Object">物件</param>
    ///<param name="keys" type="String">keys</param>
    ///<param name="options" type="Object">取大值的物件</param>
    var r = sortObject(cloneJSON(o), keys.replace(',', ' desc,') + ' desc');
    if (r.length > 0) {
        return r[0];
    }
    else {
        return null;
    }
};

function getParaLoginInfo(div, fName, timeout) {
    var options = $.data(div, fName).options;
    var li = cloneJSON(options.loginInfo);
    if (timeout != null) {
        timeout = 300;
    }
    li.loginInfo.rows['riatimeout'] = timeout * 1000;
    return $.extend({}, { loginInfo: { type: 'logininfo', value: li.loginInfo } });
};

function getControlObject(div, name) {
    return $('#' + $(div).prop('id') + name);
};

function addMonths(dt, n) {
    var dt1 = new Date(dt);
    return new Date(dt1.setMonth(dt1.getMonth() + n));
};

function addDays(dt, n) {
    var dt1 = new Date(dt);
    return new Date(dt1.setDate(dt1.getDate() + n));
};

function changeLanguage(div, fName, headName) {
    try {
        var lang = $.data(div, fName).options.language;
        var keys = Object.keys(lang);
        var kLength = keys.length;
        if (headName === undefined) headName = 'l';
        //改label
        for (var i = 0 ; i < kLength; i++) {
            var o = $('#' + $(div).prop('id') + keys[i]);
            if (headName == null || (o.length > 0 && keys[i].substr(0, headName.length) == headName)) {
                o.text(lang[keys[i]]);
            }
        }
    }
    catch (err) {
        errorHandle(utilityName, 'changeLanguage', err);
    }
};
function getParametersTable(parameters, name) {
    try {
        var keys = Object.keys(parameters);
        var kLengths = keys.length;
        var table;
        //檢核table 存不存在
        for (var i = kLengths - 1  ; i >= 0; i--) {
            if (keys[i].toUpperCase() == name.toUpperCase()) {
                table = keys[i];
                break;
            }
        }
        if (table == null) return;
        return table;
    }
    catch (err) {
        errorHandle(utilityName, 'getParametersTable', err);
    }
};

function disableControl(control, dFlag) {
    if (control.type.substr(0, 3) == 'jqx') {
        try {
            $('#' + control.name)[control.type]({ 'disabled': dFlag });
        }
        catch (err) { }
    }
    else if (control.type.substr(0, 2) == 'cs') {
        $('#' + control.name)[control.type]('disabled', dFlag);
    }
    else if (control.type.substr(0, 3) == 'dyn' || control.type.substr(0, 2) == 'SO') {
        $('#' + control.name)[control.type]('disableAll', dFlag);
    }
    else {
        $('#' + control.name).css('disable', dFlag);
    }
};

function disableAllControls(controls, flag, revertStatus, includeTab, includePanel, clearStatus) {
    try {
        var getDisableStatus = (function (control) {
            var dFlag = false;
            if (control.oldDisabled != null && clearStatus != true) {
                dFlag = control.oldDisabled;
            }
            else {
                if (control.type.substr(0, 3) == 'jqx' || control.type.substr(0, 2) == 'cs') {
                    dFlag = $('#' + control.name)[control.type]('disabled');
                }
                else {
                    dFlag = $('#' + control.name).css('disabled');
                }
            }
            if (dFlag == null) dFlag = false;
            return dFlag;
        });
        var setDisable = (function (control, dFlag, rStatus) {
            if (control.type.substr(0, 3) == 'jqx') {
                try {
                    if (control.type == "jqxPanel" || control.type == "jqxExpander" || control.type == "jqxSplitter") {
                        if (includePanel == true) {
                            $('#' + control.name)[control.type]({ disabled: dFlag });
                        }
                    }
                    else if (control.type != "jqxTabs" || includeTab == true) {
                        $('#' + control.name)[control.type]({ disabled: dFlag });
                    }
                }
                catch (err) { }
            }
            else if (control.type.substr(0, 2) == 'cs') {
                if (control.type != "csTabs" || includeTab == true) {
                    $('#' + control.name)[control.type]('disabled', dFlag);
                }
            }
            else if (control.type == 'dynamicGrid') {
                if (includeTab != true) {
                    $('#' + control.name)[control.type]('disableButton', dFlag, rStatus);
                }
                else {
                    $('#' + control.name)[control.type]('disableAll', dFlag, rStatus);
                }
            }
            else if (control.type.substr(0, 3) == 'dyn' || control.type.substr(0, 2) == 'SO') {
                $('#' + control.name)[control.type]('disableAll', dFlag, rStatus);
            }
            else {
                $('#' + control.name).css('disable', dFlag);
            }
        });
        if (includeTab == null) includeTab = true;
        for (var i = 0; i < controls.length; i++) {
            var realFlag = flag;
            if (flag == true) {
                if (revertStatus == true) {
                    controls[i].oldDisabled = getDisableStatus(controls[i]);
                }
                setDisable(controls[i], flag, revertStatus);
            }
            else {
                if (revertStatus == true) {
                    realFlag = controls[i].oldDisabled;
                    controls[i].oldDisabled = undefined;
                }
                setDisable(controls[i], realFlag, revertStatus);
            }
        }
    }
    catch (err) {
        errorHandle(utilityName, 'disableAllControls', err);
    }
};
//扣除padding/margin 後的寬度
function getMinusWidth(obj) {
    var value = $(obj).outerWidth(true) - $(obj).width();
    return value;
};
//扣除padding/margin 後的高度
function getMinusHeight(obj) {
    var value = $(obj).outerHeight(true) - $(obj).height();
    return value;
};
function onWindowResizeEvent(div, formName, action) {
    var options = $.data($(div)[0], formName).options;
    options.devicePixelRatio = window.devicePixelRatio;
    $(window).on('resize.' + $(div).prop('id'),
        {
            formName: formName,
            id: $(div).prop('id'),
            action: action
        },
        function (e) {
            try {
                var args = e.data;
                if ($('#' + args.id).length > 0) {
                    var options = $.data($('#' + args.id)[0], args.formName).options;
                    if (Math.round(options.devicePixelRatio * 100) !== Math.round(window.devicePixelRatio * 100)) {
                        options.devicePixelRatio = window.devicePixelRatio;
                        args.action();
                    }
                }
            }
            catch (err) {
                errorHandle(utilityName, 'onWindowResizeEvent', err);
            }
        });
}
function formDisplay(div, flag) {
    try {
        var shadowId = $(div).prop('id') + 'shadow';
        if (flag == false) {
            var obj = $('<div id="' + shadowId + '"></div>');
            obj.css({
                'z-index': 99999996,
                width: $(div).width() + 5,
                height: $(div).height() + 5,
                //background: 'white',
                //left: $(div).scrollLeft(),
                top: 30,
                position: 'absolute'
            });
            obj.addClass("jqx-widget-content-" + $.jqx.theme);
            obj.appendTo($(div));
        }
        else {
            $('#' + shadowId).remove();
        }
    }
    catch (err) {
        errorHandle(utilityName, 'formDisplay', err);
    }
}
function checkHeadRendered(gridId, theme, e) {
    try {
        var checkId = gridId + '_cHead';
        //$(e).text('');
        //var ch = $('<div id="' + checkId + '" style="top:50%;left:50%;"></div>').appendTo($(e));
        $(e).jqxCheckBox({ theme: theme, width: 18, height: 16, animationShowDelay: 0, animationHideDelay: 0 });
        $(e).on('change', function (event) {
            try {
                var checked = event.args.checked;
                if (checked == null) return;
                $("#" + gridId).jqxGrid('beginupdate');
                if (checked) {
                    $("#" + gridId).jqxGrid('selectallrows');
                }
                else if (checked == false) {
                    $("#" + gridId).jqxGrid('clearselection');
                }
                var rows = getRows(div);
                var rLength = rows.length;
                for (var i = 0; i < rLength; i++) {
                    var boundindex = $("#" + gridId).jqxGrid('getrowboundindex', i);
                    $("#" + gridId).jqxGrid('setcellvalue', boundindex, 'CHOOSEFIELD', event.args.checked);
                }
                $("#" + gridId).jqxGrid('endupdate');
            }
            catch (err) {
                errorHandle(utilityName, 'checkHeadRendered_change', err);
            }
        });
        return true;
    }
    catch (err) {
        errorHandle(utilityName, 'checkHeadRendered', err);
    }
};
function getReplaceRowValue(o, value) {
    try {
        var vS = value.split('[');
        if (vS.length > 1) {
            var rV = [];
            var rows;
            if (o.rows === undefined) rows = o;
            else rows = o.rows[0];
            for (var i = 0; i < vS.length; i++) {
                var vS2 = vS[i].split(']');
                if (vS2.length > 1) {
                    if (rows[vS2[0]] == null) {
                        rV.push(rows[vS2[0].toUpperCase()]);
                    }
                    else {
                        rV.push(rows[vS2[0]]);
                    }
                    rV.push(vS2[1]);
                }
                else {
                    rV.push(vS[i]);
                }
            }
            return rV.join("");
        }
        else {
            return value;
        }
    }
    catch (err) {
        errorHandle(utilityName, 'getReplaceRowValue', err);
    }
};
//是 or 否 grid column 
function yesnoColumnRender(row, field, value, defaulthtml, columnproperties) {
    try {
        var val = $(defaulthtml);
        if (value == 1) {
            value = language.columnYes;
        }
        else {
            value = language.columnNo;
        }
        val.text(value);
        return val[0].outerHTML;
    }
    catch (err) {
        errorHandle(utilityName, 'yesnoColumnRender', err);
    }
};
//disable element 內的元件
function disableChildControls(div, element, controls, flag) {
    try {
        disabledCon($(element).prop('id'), controls, flag);
        var children = $(element).find('[data-id]');
        var cLength = children.length;
        var ctLength = controls.length;
        for (var i = 0 ; i < cLength; i++) {
            disabledCon($(div).prop('id') + $(children[i]).attr('data-id'), controls, flag);
        }
    }
    catch (err) {
        errorHandle(utilityName, 'disableChildControls', err);
    }
    function disabledCon(name, controls, flag) {
        try {
            for (var j = 0; j < ctLength; j++) {
                if (name == controls[j].name) {
                    controls[j]['disabled'] = flag;
                    if (controls[j].type == 'jqxPanel' || controls[j].type == 'jqxExpander') {
                        $('#' + controls[j].name)[controls[j].type]({ disabled: flag });
                        disableChildControls($('#' + controls[j].name), controls, flag);
                    }
                    else if (controls[j].type.indexOf('jqx') >= 0) {
                        $('#' + controls[j].name)[controls[j].type]({ disabled: flag });
                    }
                    else {
                        $('#' + controls[j].name)[controls[j].type]('disabled', flag);
                    }
                    break;
                }
            }
        }
        catch (err) {
            errorHandle(utilityName, 'disabledCon', err);
        }
    }
};
//檢核元件的maxLength
function checkTextMaxLength(controls, showMsg) {
    try {
        var cLength = controls.length;
        if (showMsg == null) showMsg = true;
        for (var i = 0; i < cLength; i++) {
            var control = controls[i];
            if (control['maxLength'] == null || control['maxLength'] == 0) continue;
            var value = $('#' + control.name)[control.type]("val");
            switch (control['type']) {
                case 'jqxInput':
                case 'jqxTextArea':
                    var realLength = value.lengthB();
                    var maxLength = control['maxLength'];
                    if (realLength > maxLength) {
                        if (showMsg) {
                            var message = language.lengthToLong.replace("{0}", control.caption).replace("{1}", realLength).replace("{2}", maxLength);
                            messageBox(message, null, null, function (r) {
                                $('#' + control.name)[control.type]("focus");
                            });
                        }
                        return [false, control];
                    }
                    break;
            }
        }
        return [true];
    }
    catch (err) {
        errorHandle(utilityName, 'checkTextMaxLength', err);
    }
};
//委派只可KEY數字
function numericOnly(control, canMinus, eventName) {
    if (eventName == null) { eventName = "keydown"; }
    $(control).off(eventName + ".numericOnly");
    $(control).on(eventName + ".numericOnly", canMinus, function (event) {
        //if (event.shiftKey) return false;
        if (event.ctrlKey) return false;
        if (event.altKey) return false;
        var canMinus = event.data;
        //數字鍵,backspace,del,方向鍵,tab
        //-(109,189)
        //增加判斷值有-則不能再KEY
        if (canMinus == true) {
            var value = $(this).val();
            if (isEmpty(value) != true && value.indexOf("-") >= 0) {
                canMinus = false;
            }
        }
        if (event.which >= 48 && event.which <= 57 || event.which >= 96 && event.which <= 105 ||
            event.which == 8 || ((event.which == 109 || event.which == 189) && canMinus == true) || event.which == 46 || event.which >= 37 && event.which <= 40 ||
            event.which == 9) {
            return true;
        }
        else {
            event.preventDefault();
            return false;
        }
    });
}
//取得權限
function getUserPriv(priv, privName) {
    try {
        var rows;
        if (Array.isArray(priv)) rows = priv;
        else rows = priv.rows;
        var privRow = getRowByKeyValue(rows, 'MID', privName);
        return (privRow != null && privRow["GROUPX"] == 1);
    }
    catch (err) {
        errorHandle(utilityName, 'getUserPriv', err);
    }
}
//複製table
function cloneDataTable(source, tableName, rowIndex, all, targetTableName) {
    try {
        var rd = {};
        var realName = targetTableName;
        if (realName == null) realName = tableName;
        if (all == true) {
            rd[realName] = cloneJSON(source[tableName]);
        }
        else {
            rd[realName] = {
                columns: cloneJSON(source[tableName].columns),
                rows: []
            };
            if (rowIndex >= 0 && source[tableName].rows.length > rowIndex) {
                rd[realName].rows.push(cloneJSON(source[tableName].rows[rowIndex]));
            }
        }
        return rd;
    }
    catch (err) {
        errorHandle(utilityName, 'cloneDataTable', err);
    }
};
function encryptData(str, encKey) {
    try {
        if (isEmpty(str)) return str;
        var ra = [];
        var math;
        var encKary = [];
        for (var i = 0; i < encKey.lengthB() ; i++) {
            var keyNum = encKey.substr(i, 1);
            encKary.push(keyNum.charCodeAt(0));
            if (i == 0) { math = encKary[i]; continue; }
            if (i >= 1 && encKary[i] >= math && encKary[i] <= encKary[i - 1]) math = math - encKary[i];
            if (i >= 1 && encKary[i] <= math && encKary[i] <= encKary[i - 1]) math = math - encKary[i];
            if (i >= 1 && encKary[i] >= math && encKary[i] >= encKary[i - 1]) math = math + encKary[i];
            if (i >= 1 && encKary[i] <= math && encKary[i] >= encKary[i - 1]) math = math + encKary[i];
        }
        for (var i = 0; i < str.lengthB() ; i++) {
            var letter = str.substr(i, 1);
            ra.push(Number(letter.charCodeAt(0) + math).toString() + " ");
        }
        return ra.join("");
    }
    catch (err) {
        errorHandle(utilityName, 'encryptData', err);
    }
};
function decryptData(str, encKey) {
    try {
        if (isEmpty(str)) return str;
        var ra = [];
        var math;
        var encKary = [];
        for (var i = 0; i < encKey.lengthB() ; i++) {
            var keyNum = encKey.substr(i, 1);
            encKary.push(keyNum.charCodeAt(0));
            if (i == 0) { math = encKary[i]; continue; }
            if (i >= 1 && encKary[i] >= math && encKary[i] <= encKary[i - 1]) math = math - encKary[i];
            if (i >= 1 && encKary[i] <= math && encKary[i] <= encKary[i - 1]) math = math - encKary[i];
            if (i >= 1 && encKary[i] >= math && encKary[i] >= encKary[i - 1]) math = math + encKary[i];
            if (i >= 1 && encKary[i] <= math && encKary[i] >= encKary[i - 1]) math = math + encKary[i];
        }
        for (var i = 0; i < str.lengthB() ; i += 4) {
            var letter = str.substr(i, 4);
            ra.push(String.fromCharCode(letter - math).toString());
        }
        return ra.join("");
    }
    catch (err) {
        errorHandle(utilityName, 'encryptData', err);
    }
};
function createDownloadButton(div, formName, buttonsId, fileName, width, height, caption) {
    try {
        if (isEmpty(fileName)) return;
        var options = $.data(div, formName).options;
        var dlId = $(div).prop('id') + 'adl';
        var logFileId = $(div).prop('id') + 'btnDLFile';
        var rWidth = width;
        var rHeight = height;
        var rCaption = caption;
        if (rWidth == null) {
            rWidth = Math.floor($('#' + buttonsId).width() / 3);
            if (rWidth > 120) { rWidth = 120; }
        }
        if (rHeight == null) {
            rHeight = 24;
        }
        if (rCaption == null) {
            rCaption = language.downloadFile;
        }
        if ($("#" + dlId).length > 0) {
            $("#" + logFileId).jqxButton("destroy");
            $("#" + dlId).remove();
            options.controls = deleteRowByKeyValue(options.controls, 'name', logFileId);
        }
        if (fileName.substr(0, 1) == "/") fileName = fileName.substr(1);
        $('<a id="' + dlId + '" href="' + fileName + '" target="_blank" download></a>').appendTo($('#' + buttonsId));
        $('<input type="button" value="' + rCaption + '" id="' + logFileId + '"/>').appendTo($('#' + dlId));
        var buttonOptions = {
            width: rWidth,
            height: rHeight,
            theme: options.theme
        };
        $("#" + logFileId).jqxButton($.extend({}, buttonOptions));
        $("#" + logFileId).css('float', 'left');
        $("#" + logFileId).css('margin', 1);
        options.controls.push({ name: logFileId, type: 'jqxButton', level: 2 });
        return { urlId: dlId, buttonId: logFileId };
    }
    catch (err) {
        errorHandle(utilityName, "createDownloadButton", err);
    }
}
function handleKeyboardNavigation(gridId, columns, editable) {
    var r = {
        handlekeyboardnavigation: function (event) {
            try {
                var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
                if (key == 86 && event.ctrlKey == true) {
                    if (editable != true) {
                        event.preventDefault();
                        return false;
                    }
                    else {
                        for (var j = 0; j < columns.length; j++) {
                            if (columns[j]["editable"] != true) {
                                event.preventDefault();
                                return false;
                            }
                        }
                    }
                }
            }
            catch (err) {
                errorHandle(utilityName, "handleKeyboardNavigation", err);
            }
        }
    };
    return r;
}
function checkIsChild(parentElement, childElement, sameOk) {
    try {
        var ps = $(childElement).parents();
        if (sameOk == true && $(parentElement)[0] === $(childElement)[0]) { return true; }
        var pLength = ps.length;
        for (var i = 0 ; i < pLength; i++) {
            if ($(ps[i]).prop('id') == $(parentElement).prop('id')) {
                return true;
            }
        }
        return false;
    }
    catch (err) {
        errorHandle(utilityName, "checkIsChild", err);
    }
}
function treeGridCheckColumnRender(rowKey, field, value, data, theme) {
    try {
        var html = $("<div></div>");
        var checked = false;
        if (typeof value == "string") {
            checked = (value == "1");
        }
        else if (typeof value == "boolean") {
            checked = value;
        }
        else {
            checked = (value == 1);
        }
        $(html).jqxCheckBox({
            theme: theme,
            checked: checked
        });
        $(html).find('.jqx-checkbox-check-checked').css('opacity', 1);
        var str = $(html)[0].outerHTML;
        return str;
    }
    catch (err) {
        errorHandle(utilityName, "treeGridCheckColumnRender", err);
    }
}
function getTreeGridFirstKey(rows, midField, linkField) {
    try {
        var idx = -1;
        for (var i = 0; i < rows.length; i++) {
            idx = i;
            var isOK = true;
            for (var j = 0; j < rows.length; j++) {
                if (rows[i][linkField] == rows[j][midField]) {
                    isOK = false;
                    break;
                }
            }
            if (isOK == true) {
                break;
            }
        }
        if (idx >= 0) {
            return rows[idx][midField];
        }
        else {
            return null;
        }
    }
    catch (err) {
        errorHandle(utilityName, "getTreeGridFirstKey", err);
    }
};
function getCanEditList(div, formName, gridId, columns, rowIndex, codeField, descField, source, changeSource, gridHeight) {
    try {
        var options = $.data(div, formName).options;
        var controlId = gridId + codeField;
        if (gridHeight == null) gridHeight = 28;
        var left = 0;
        var code;
        var desc;
        var isCode = false;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i]['datafield'] == codeField) {
                code = columns[i];
                isCode = true;
            }
            else {
                if (isCode == false) {
                    left += columns[i]['width'];
                }
                if (columns[i]['datafield'] == descField) {
                    desc = columns[i];
                }
            }
        }
        if ($("#" + controlId).length == 0) {
            $('<div id="' + controlId + '" style="position:absolute;"></div>').appendTo($('#' + gridId));
            $("#" + controlId).csList({
                theme: options.theme,
                height: gridHeight - 1,
                codeNoWidth: code.width - 7,
                source: source,
                width: code.width + desc.width
            });
            $("#" + controlId).on("selectedIndexChanged", function () {
                var rowindex = $(this).data().rowindex;
                $("#" + gridId).jqxGrid('setcellvalue', rowindex, codeField, $(this).csList('codeNo'));
                $("#" + gridId).jqxGrid('setcellvalue', rowindex, descField, $(this).csList('description'));
                $(this).css('display', 'none');
            });
            options.controls.push({ name: controlId, type: 'csList', level: options.level });
        }
        $("#" + controlId).prop("style").removeProperty('display');
        if (changeSource == true) {
            $("#" + controlId).csList("source", source);
        }
        $("#" + controlId).data({ rowindex: rowIndex });
        $("#" + controlId).css({
            //top: $('#' + gridId).position().top + (rowIndex + 1) * gridHeight + 5,
            //left: $('#' + gridId).position().left + left + 2,
            top: ($('#' + gridId).position().top + (rowIndex + 1) * gridHeight + 5) - $('#' + gridId).jqxGrid('scrollposition').top,
            left: ($('#' + gridId).position().left + left + 2) - $('#' + gridId).jqxGrid('scrollposition').left,
            'z-index': 99999
        });
        var row = $('#' + gridId).jqxGrid('getrowdata', rowIndex);
        if (row[codeField] != null && row[descField] != null) {
            $("#" + controlId).csList("setDisplayValue", {
                CODENO: row[codeField],
                DESCRIPTION: row[descField],
            });
        }
        else {
            $("#" + controlId).csList("setDisplayValue", {
                CODENO: null,
                DESCRIPTION: null,
            });

        }
        return true;
    }
    catch (err) {
        errorHandle(utilityName, 'getCanEditList', err);
    }
};
function maskData(value, type, priv) {
    try {
        if (priv == true || isEmpty(value)) return value;
        var r;
        //2.8 證件遮罩一律是顯示前後三碼，中間遮，遮罩符號為＊,小於遮罩長度就全遮。
        //2.9 姓名一律遮最後一個字，遮罩符號為＊,小於遮罩長度就全遮。
        //2.10 地址一律遮最後三個字，遮罩符號為＊,小於遮罩長度就全遮。
        //2.11 電話一律遮最後三個字，遮罩符號為＊,小於遮罩長度就全遮。
        switch (type.toLowerCase()) {
            case "id":
                if (value.length > 6) {
                    r = value.substr(0, 3) + "*".padLeft(value.length - 6, "*") + value.right(3);
                }
                else {
                    r = "".padLeft(value.length, "*");
                }
                break;
            case "account":
                var maskString = "00000***00**0000";
                r = "";
                for (var i = 0; i < value.length; i++) {
                    if (maskString.substr(i, 1) == "0") {
                        r += value.substr(i, 1);
                    }
                    else {
                        r += maskString.substr(i, 1);
                    }
                }
                break;
            case "tel":
                if (value.length > 3) {
                    r = value.substr(0, value.length - 3) + "***";
                }
                else {
                    r = "".padLeft(value.length, "*");
                }
                break;
            case "address":
                r = value.substr(0, value.length - 3) + "***";
                break;
            case "name":
                if (value.length > 1) {
                    r = value.substr(0, value.length - 1) + "*";
                }
                else {
                    r = "*";
                }
                break;
            default:
                r = value;
        }
        return r;
    }
    catch (err) {
        errorHandle(utilityName, 'maskData', err);
    }
};
function printBydynamicReport(div, options, sysProgramId, action, disabled, isPrevious) {
    try {
        if (disabled == true) {
            disableAllControls(options.controls, true, true);
        }
        $(div).dynLinkProgram("executeByProgramId", options, 1, sysProgramId, options.conditionData, function (r) {
            if (disabled == true) {
                disableAllControls(options.controls, false, true);
            }
            action(r);
        }, isPrevious);
    }
    catch (err) {
        alert(err);
    }
};
function exportBydynamicReport(div, options, sysProgramId, action, disabled, isPrevious) {
    try {
        if (disabled == true) {
            disableAllControls(options.controls, true, true);
        }
        $(div).dynLinkProgram("executeByProgramId", options, 11, sysProgramId, options.conditionData, function (r) {
            if (disabled == true) {
                disableAllControls(options.controls, false, true);
            }
            action(r);
        }, isPrevious);
    }
    catch (err) {
        alert(err);
    }
};
function getConditionStru() {
    try {
        var table = { condition: { columns: [], rows: [] } };
        var cols = ["fieldName", "fieldValue", "fieldDesc", "headName"];
        $.each(cols, function (idx, val) {
            table.condition.columns.push({ name: val.toUpperCase(), type: "string" });
        });
        table.condition.columns.push({ name: "objectType".toUpperCase(), type: "decimal" });
        return table;
    }
    catch (err) {
        errorHandle(utilityName, 'getConditionStru', err);
    }
}
function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
//建立grid Edit Cell
function createEditCell(div, formName, gridId, field, columnType, dataLength, source, codeField, dropDownWidth) {
    try {
        switch (columnType.toLowerCase()) {
            case 1: //數字
            case "number":
                if (dataLength != null) {
                    var decimalDigits = dataLength.toString().split(",")[0];
                    var digits = dataLength.toString().split(",")[1];
                    return {
                        editable: true,
                        columntype: "numberinput",
                        createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                            $(editor).jqxNumberInput({ decimalDigits: decimalDigits, digits: digits });
                        }
                    };
                }
                else {
                    return { editable: true };//, columntype: "number" };
                }
                //numberinput
                break;
            case 2: //日期(yyyy/MM/dd
            case 17: //日期時間(yyyy/MM/dd HH:mm:ss)
            case 3: //日期時間(yyyy/MM/dd HH:mm)
            case 23: //日期(yyyy/MM)
            case 24: //日期(yyyy)
            case "date":
            case "datetime2":
            case "datetime":
            case "yyyymm":
            case "yyyy":
                var formatString;
                switch (columnType) {
                    case 2:
                    case "date":
                        formatString = "yyyy/MM/dd";
                        break;
                    case 17:
                    case "datetime2":
                        formatString = "yyyy/MM/dd HH:mm:ss";
                        break;
                    case 3:
                    case "datetime":
                        formatString = "yyyy/MM/dd HH:mm";
                        break;
                    case 23:
                    case "yyyymm":
                        formatString = "yyyy/MM";
                        break;
                    case 24:
                    case "yyyy":
                        formatString = "yyyy";
                        break;
                }
                return {
                    editable: true,
                    columntype: "template",
                    templateControl: "csDateTime",
                    createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                        $(editor).csDateTime({ width: cellwidth, height: cellheight, formatString: formatString });
                        setTimeout(function () { $(editor).find('input').select(); }, 80);
                    },
                    initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
                        if (isEmpty(cellvalue) == false) {
                            $(editor).csDateTime('setDate', cellvalue);
                            setTimeout(function () { $(editor).find('input').select(); }, 80);
                        }
                    },
                    geteditorvalue: function (row, cellvalue, editor) {
                        return $(editor).csDateTime('getDate');
                    },
                    destroyeditor: function (editor) {
                        $(editor).csDateTime('destroy');
                    }
                };
                break;
            case 4: //comboBox
            case "combobox":
                var sourceRows;
                if (Array.isArray(source)) { sourceRows = source; }
                else { sourceRows = source.rows; }
                return {
                    editable: true,
                    columntype: "combobox",
                    createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                        $(editor).jqxComboBox({ source: sourceRows });
                    }
                };
                break;
            case "dropdownlist":
                var sourceRows;
                if (Array.isArray(source)) { sourceRows = source; }
                else { sourceRows = source.rows; }
                if (sourceRows == null) return;
                return {
                    editable: true,
                    columntype: "dropdownlist",
                    createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                        var keys = Object.keys(sourceRows[0]);
                        var valueMember = keys[0];
                        var displayMember = keys[0];
                        if (keys.length > 1) {
                            displayMember = keys[1];
                        }
                        $(editor).jqxDropDownList({
                            source: sourceRows,
                            displayMember: displayMember,
                            valueMember: valueMember,
                            placeHolder: language.pleaseChoose,
                            dropDownWidth: dropDownWidth
                        });
                    },
                    initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
                        try {
                            $(editor).jqxDropDownList('val', cellvalue);
                        }
                        catch (err) {
                            errorHandle("utility", "createEditCell_jqxDropDownList_initeditor", err);
                        }
                    },
                    geteditorvalue: function (row, cellvalue, editor) {
                        return $(editor).jqxDropDownList('val');
                    },
                    destroyeditor: function (editor) {
                        $(editor).jqxDropDownList('destroy');
                    }
                };
                break;
            case 5: //多欄單選(List)
            case "cslist":
                var sourceRows;
                if (Array.isArray(source)) { sourceRows = source; }
                else { sourceRows = source.rows; }
                return {
                    editable: true,
                    columntype: "template",
                    templateControl: "csList",
                    createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                        try {
                            var codeWidth = $("#" + gridId).jqxGrid('getcolumnproperty', codeField, 'width');
                            $(editor).css({ 'z-index': 99999 });
                            $(editor).csList({
                                codeNoWidth: codeWidth - 7, source: sourceRows,
                                width: codeWidth + cellwidth, height: cellheight
                            });
                        }
                        catch (err) {
                            errorHandle("utility", "createEditCell_csList_createeditor", err);
                        }
                    },
                    initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
                        try {
                            var codeWidth = $("#" + gridId).jqxGrid('getcolumnproperty', codeField, 'width');
                            var descWidth = $("#" + gridId).jqxGrid('getcolumnproperty', field, 'width');
                            var left = $(editor).position().left;
                            $(editor).css({ left: left - codeWidth, 'z-index': 99999 });
                            $(editor).csList({ codeNoWidth: codeWidth });
                            $(editor).csList('resize', { width: codeWidth + descWidth });
                            var codeNo = $("#" + gridId).jqxGrid('getcellvalue', row, codeField);
                            $(editor).csList('codeNo', codeNo);
                        }
                        catch (err) {
                            errorHandle("utility", "createEditCell_csList_initeditor", err);
                        }
                    },
                    geteditorvalue: function (row, cellvalue, editor) {
                        try {
                            var codeNo = $(editor).csList('codeNo');
                            var description = $(editor).csList('description');
                            $(editor).data().codeNo = codeNo;
                            $(editor).data().description = description;
                            $("#" + gridId).jqxGrid('setcellvalue', row, codeField, codeNo);
                            return description;
                        }
                        catch (err) {
                            errorHandle("utility", "createEditCell_csList_geteditorvalue", err);
                        }
                    }
                };
                break;
            case 6: //多選(MultiSelect)
            case "csmulti":
                //if (control.data.columns[0]['type'] == 'string') {
                //    value = $(o)[control.type]('getChooseQuoteList');
                //    ordValue = $(o)[control.type]('getChooseOrdQuoteList');
                //}
                //else {
                //    value = $(o)[control.type]('getChooseList');
                //    ordValue = $(o)[control.type]('getChooseOrdList');
                //}
                //desc = $(o)[control.type]('getChooseListName');
                var sourceRows;
                if (Array.isArray(source)) { sourceRows = source; }
                else { sourceRows = source.rows; }
                return {
                    editable: true,
                    columntype: "template",
                    templateControl: "csMulti",
                    createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                        $(editor).csMulti({ source: sourceRows, width: cellwidth, height: cellheight });
                    },
                    initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
                        $(editor).csMulti('setDisplayValue', cellvalue);
                    },
                    geteditorvalue: function (row, cellvalue, editor) {
                        return $(editor).csMulti('getChooseListName');
                    }
                };
                break;
            case 7: //是否(CheckBox)
            case "checkbox":
                return { editable: true, columntype: "checkbox" };
                break;
            default: //文字
                if (dataLength != null) {
                    return {
                        editable: true,
                        columntype: "textbox",
                        createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                            $(editor).jqxInput({ maxLength: dataLength });
                        }
                    };
                }
                else {
                    return { editable: true, columntype: "textbox" };
                }
                break;
        }
    }
    catch (err) {
        errorHandle(utilityName, 'createEditCell', err);
    }
}
//將grid 捲軸移到rowIndex 位置
function gridMoveByRowIndex(gridId, rowIndex, gridHeight) {
    try {
        if (gridHeight == null) { gridHeight = 28; }
        setTimeout(function () {
            $('#' + gridId).jqxGrid('selectrow', rowIndex);
            $('#' + gridId).jqxGrid('scrolloffset', (rowIndex - 1) * gridHeight, 0);
        }, 200);
    }
    catch (err) {
        errorHandle(utilityName, 'gridMoveByRowIndex', err);
    }
}
function conditionToDataTable(condition) {
    try {
        var rows = condition.rows;
        if (rows.length == 0) { return; }
        var table = { condition: { columns: [], rows: [] } };
        for (var i = 0; i < rows.length; i++) {
            table.condition.columns.push({ name: rows[i]["FIELDNAME"], type: "string" });
            table.condition.columns.push({ name: rows[i]["FIELDNAME"].replace("_1", ""), type: "string" });
        }
        var row = {};
        for (var i = 0; i < rows.length; i++) {
            row[rows[i]["FIELDNAME"]] = rows[i]["FIELDVALUE"];
            row[rows[i]["FIELDNAME"].replace("_1", "")] = rows[i]["FIELDVALUE"];
        }
        table.condition.rows.push(row);
        return table;
    }
    catch (err) {
        errorHandle(utilityName, 'conditionToDataTable', err);
    }
}
function loadingDisableParent(div, flag, oldStatus) {
    try {
        var parents = $(div).parents()
        var pLength = parents.length;
        var rParents = [];
        for (var i = 0; i < pLength; i++) {
            var type = null;
            var realFlag = null;
            if ($(parents[i]).hasClass("jqx-window")) {
                type = 'jqxWindow';
            }
            else if ($(parents[i]).hasClass("jqx-tabs")) {
                type = 'csTabs';
            }
            if (type != null) {
                var id = $(parents[i]).prop('id');
                if (flag == true) {
                    rParents.push({ id: id, disabled: $(parents[i]).jqxWindow("disabled") });
                    realFlag = true;
                }
                else {
                    if (oldStatus != null) {
                        var status = getRowByKeyValue(oldStatus, "id", id);
                        if (status != null) {
                            realFlag = status['disabled'];
                        }
                        else {
                            realFlag = false;
                        }
                    }
                    else {
                        realFlag = false;
                    }
                }
                $(parents[i])[type]({ disabled: realFlag });
            }
        }
        return rParents;
    }
    catch (err) {
        errorHandle(utilityName, 'loadingDisableParent', err);
    }
}
function loadForm(options, url, action) {
    try {
        var search = window.location.search;
        if (isEmpty(search)) {
            search = "?ver=" + formatDateTime(new Date(), "datetime3");
        }
        var realURL = url + search;
        $.ajax({
            url: realURL,
            type: "get",
            datatype: 'html',
            success: function (msg) {
                action(msg);
            },
            complete: function (xhr, ts) {
                xhr = null;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                var param = options;
                if (param['loadError']) {
                    param['loadError'](xhr, ajaxOptions, thrownError);
                }
                else {
                    messageBox('error status:' + xhr.status + ', thrownError:' + thrownError, messageType.critical);
                }
            }
        });
    }
    catch (err) {
        errorHandle(formName, 'loadForm', err);
    }
}
function getClassStyles(parentElem, className, style) {
    try {
        elemstr = '<div class="' + className + '"></div>';
        var $elem = $(elemstr).hide().appendTo(parentElem);
        val = $elem.css(style);
        $elem.remove();
        return val;
    }
    catch (err) {
        errorHandle(formName, 'getClassStyles', err);
    }
}

function rgbToHex(rgb) {
    var hexDigits = new Array
            ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
}
function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}
function showCheckManagerPWD(options, em, action) {
    try {
        var objectName = "checkManagerPWD";
        var winOptions = {
            width: 400,
            height: 300,
            resizable: false,
            //isModal: true
        };
        var win = createcsWindow(options.container, language["checkManagerPDD"] + " [checkManagerPWD]", winOptions);
        $('#' + win.windowId).on('close', function () {
            try {
                var r = $.data($('#' + win.contentId)[0], objectName).options;
                var isSaved = r.isSaved;
                $('#' + win.contentId)[objectName]('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                if (em == editMode.delete) {
                    action({ isSaved: isSaved, errorMessage: language.noManagerCheckCannotDel });
                }
                else {
                    action({ isSaved: isSaved, errorMessage: language.noManagerCheckCannotEdit });
                }
            }
            catch (err) {
                errorHandle(utilityName, 'showCheckManagerPWD_close', err);
            }
        });
        $("#" + win.contentId)[objectName]($.extend({}, {
            loginInfo: cloneJSON(options.loginInfo),
            container: $('#' + win.windowId),
            localization: options.localization
        }));
        var level = 9;
        options.controls.push({ name: win.contentId, type: objectName, level: level });
    }
    catch (err) {
        errorHandle(utilityName, 'showCheckManagerPWD', err);
    }
}
//2018/05/16 Jacky 取得欄位的權限
function getFieldPriv(control, fieldPriv, privData) {
    try {
        var rows;
        if (Array.isArray(fieldPriv)) {
            rows = fieldPriv;
        }
        else {
            rows = fieldPriv.rows;
        }
        var rLength = rows.length;
        var field;
        for (var i = 0; i < rLength; i++) {
            if (control.name.toUpperCase().endsWith(rows[i]["FieldName".toUpperCase()].toUpperCase())) {
                field = rows[i];
                break;
            }
        }
        if (field == null) {
            return true;
        }
        else {
            var privRows;
            if (Array.isArray(privData)) {
                privRows = privData;
            }
            else {
                privRows = privData.rows;
            }
            var privOK = false;
            for (var i = 0; i < privRows.length; i++) {
                if (privRows[i]["MID"] == field["MID"] && privRows[i]["GROUPX"] == 1) {
                    privOK = true;
                    break;
                }
            }
            return privOK;
        }
    }
    catch (err) {
        errorHandle(utilityName, 'getFieldPriv', err);
    }
}
//2018/05/16 判斷欄位權限是否可修改
function disableAllFieldPriv(controls, fieldPriv, privData) {
    try {
        if (fieldPriv == null) { return; }
        if (privData == null) { return; }
        for (var i = 0; i < controls.length; i++) {
            switch (controls[i]["type"]) {
                case "jqxInput":
                case "jqxTextArea":
                case "jqxNumperInput":
                case "jqxCheckBox":
                case "jqxRadioButton":
                case "jqxComboBox":
                case "jqxTabs":
                case "csTabs":
                case "csList":
                case "csMulti":
                case "csDateTime":
                    var PrivOk = getFieldPriv(controls[i], fieldPriv, privData);
                    if (PrivOk != true) {
                        if (controls[i].type.indexOf("jqx") == 0) {
                            $("#" + controls[i].name)[controls[i]["type"]]({ disabled: true });
                        }
                        else if (controls[i].type.indexOf("cs") == 0) {
                            $("#" + controls[i].name)[controls[i]["type"]]("disabled", true);
                        }
                    }
                    controls[i].fieldPriv = PrivOk;
                    break;
            }
        }
    }
    catch (err) {
        errorHandle(utilityName, 'disableAllFieldPriv', err);
    }
}
function writeALLTabIndex(div) {
    try {
        var children = $(div).find("[tabindex]");
        var l = children.length;
        var controls = [];
        //if (addTabIndex == null) { addTabIndex = 0; }
        for (var i = 0; i < l; i++) {
            controls.push({
                name: $(children[i]).attr("id"),
                tabIndex: $(children[i]).attr("tabindex")
            });
        }
        disableALLTabIndex(div);
        return controls;
    }
    catch (err) {
        errorHandle(utilityName, 'writeALLTabIndex', err);
    }
}
function disableALLTabIndex(oElement) {
    try {
        var children = $(oElement).children();
        var l = children.length;
        for (var i = 0; i < l; i++) {
            disableALLTabIndex(children[i]);
            if ($(children[i]).attr('tabindex') != null) {
                if ($(children[i]).prop("tagName") == "DIV") {
                    $(children[i]).removeAttr('tabindex');
                }
                else {
                    $(children[i]).attr('tabindex', -1);
                }
            }
        }
    }
    catch (err) {
        errorHandle(utilityName, 'disableALLTabIndex', err);
    }
}
function setALLTabIndex(tabControls, controls) {
    try {
        for (var i = 0 ; i < controls.length; i++) {
            var name = controls[i]["name"];
            var temp = sortObject(tabControls, "name");
            var o = getRowByKeyValue(temp, "name", name);
            var idx = "-1";
            if (o != null) {
                //idx = o["tabIndex"];
                idx = 0;
            }
            switch (controls[i]["type"]) {
                case "jqxInput":
                case "jqxNumberInput":
                case "jqxTextArea":
                case "csDateTime":
                case "csList":
                case "csMulti":
                case "csMulti":
                case "csDownloadFile":
                case "csUploadFile":
                    $("#" + name).parent().find("input,button,textarea").attr("tabindex", idx);
                    break;
                default:
                    $("#" + name).attr("tabindex", idx);
                    break;
            }
        }
    }
    catch (err) {
        errorHandle(utilityName, 'setALLTabIndex', err);
    }
}
function offDocumentTabIndex(eId) {
    var eventName = "click focusin";
    if (isEmpty(eId) == false) {
        eventName = "click." + eId + " focusin." + eId;
    }
    $(document).off(eventName);
}
function onDocumentTabIndex(eId) {
    try {
        var activeWindow;
        var eventName = "click focusin";
        if (isEmpty(eId) == false) {
            eventName = "click." + eId + " focusin." + eId;
        }
        $(document).on(eventName, function (e) {
            try {
                //alert(e);
                var x = document.activeElement;
                var focusWin = getFocusWindow(x);
                if (focusWin != null) {
                    var oWin = activeWindow;
                    if ($(focusWin).prop("id") != oWin) {
                        //換window 要將舊的tabindex 清除
                        if (oWin != null && $("#" + oWin).length > 0) {
                            disableALLTabIndex($("#" + oWin));
                        }
                        //將新的tabindex設上去
                        var div = $($(focusWin).find('.jqx-window-content')[0]);
                        var formName = $(div).attr("role");
                        if (formName != null) {
                            var options = $.data($(div)[0], formName).options;
                            setALLTabIndex(options.tabControls, options.controls);
                        }
                        activeWindow = $(focusWin).prop("id");
                    }
                }
                function getParantWin(element) {
                    var o = $(element).parents();
                    for (var i = 0 ; i < o.length; i++) {
                        if ($(o[i]).hasClass("jqx-window") && $(o[i]).prop("id").indexOf("messageBox") < 0) {
                            return $(o[i]);
                        }
                    }
                }
                function getChildWin(element) {
                    var w = $(element).find('.jqx-window');
                    if (w.length > 0 && $(w).prop("id").indexOf("messageBox") < 0) {
                        var c = getChildWin(w[0]);
                        if (c != null) {
                            return c;
                        }
                        else {
                            return w;
                        }
                    }
                    else {
                        return undefined;
                    }
                }
                function getFocusWindow(element) {
                    var r = getChildWin(element);
                    if (r == null) {
                        r = getParantWin(element);
                    }
                    return r;
                }
            }
            catch (err) {
                //errorHandle(utilityName, 'onDocumentTabIndex', err);
            }
        });
    }
    catch (err) {
        errorHandle(utilityName, 'onDocumentTabIndex', err);
    }
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function scriptFunction(str, formName) {
    //return eval(str);
    return Function('"use strict";' +
                    'var formName = "' + formName + '";' +
                    'return (' + str + ')')();
}