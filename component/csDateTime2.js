(function ($) {
    var formName = "csDateTime";
    var endCalId = "_cal";
    var endCalButtonId = "_calB";
    var endRealControl = "_c";
    var calButtonWidth = 22;
    $.fn['csDateTime'] = function (options, param, param2, param3) {
        try {
            if (typeof options == 'string') {
                var id = $(this).prop('id');
                var rControl = $("#" + id + endRealControl);
                if (methods[options]) {
                    return methods[options](rControl, param);
                }
                else {
                    return invokeMethod(rControl, options, param, param2, param3);
                }
            }
            options = options || {};
            return this.each(function () {
                var state = $.data(this, formName);
                if (state) {
                    var id = $(this).prop('id');
                    var rControl = $("#" + id + endRealControl);
                    $.extend(state.options, options);
                    changeParameters(this, options);
                    $(rControl).jqxMaskedInput(options);
                }
                else {
                    $.data(this, formName, {
                        options: $.extend({}, new defaults(),
                            new csDateTime(), { realOptions: cloneJSON(options) },
                            options)
                    });
                    init(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.csDateTime', err);
        }
    };
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        theme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        destroy: function (jq) {
            return jq.each(function () {
                destroy(this);
            });
        },
        clear: function (jq) {
            return jq.each(function () {
                clear(this);
            });
        },
        clearValue: clear
        ,
        val: function (jq) {
            return val(jq[0]);
        },
        getDate: function (jq) {
            return getDate(jq[0]);
        },
        setDate: function (jq, param) {
            return jq.each(function () {
                setDate(this, param);
            });
        },
        getText: function (jq) {
            return getText(jq[0]);
        },
        setText: function (jq, param) {
            return jq.each(function () {
                setText(this, param);
            });
        },
        focus: function (jq) {
            return jq.each(function () {
                focus(this);
            });
        }
    };
    var defaults = (function () {
        this.realOptions = {};
        this.language = {};
        this.theme = $.jqx.theme;
        this.controls = [];
        this.localization = null;
        this.formatString = "yyyy/MM/dd";
        this.showCalendarButton = true;
        this.showTimeButton = false;
        this.culture = $.jqx.culture;
    });
    function invokeMethod(div, options, param, param2, param3) {
        try {
            var val;
            var type = 'jqxMaskedInput';
            if (param3 != null) val = $(div)[type](options, param, param2, param3);
            else if (param2 != null) val = $(div)[type](options, param, param2);
            else if (param != null) {
                switch (options) {
                    case "theme":
                        $(div)[type]({ theme: param });
                        break;
                    case "disabled":
                        $(div)[type]({ disabled: param });
                        var id = $(div).prop("id");
                        var realId = id.substr(0, id.length - 2);
                        disableButton($("#" + realId)[0], param);
                        break;
                    default:
                        val = $(div)[type](options, param);
                        break;
                }
            }
            else {
                val = $(div)[type](options);
            }
            return val;
        }
        catch (err) {
            errorHandle(formName, 'invokeMethod', err);
        }
    };
    function parameter(div, paraName, params) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            if (paraName == null) {
                for (var i = 0; i < controls.length; i++) {
                    var o = $('#' + controls[i].name);
                    $(o)[controls[i].type](paraName, params);
                }
                options[paraName] = params;
            }
            else {
                return options[paraName];
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    function destroy(div) {
        try {
            var options = $.data(div, formName).options;
            //var controls = options.controls;
            //destroyControls(controls);
            options.length = 0;
            options = null;
            $.data(div, formName, null);
            var id = $(div).prop('id');
            var realId = id.substr(0, id.length - 2);
            if ($("#" + realId + endCalId).length > 0) {
                $("#" + realId + endCalId).off();
                $("#" + realId + endCalId).jqxCalendar('destroy');
            }
            if ($("#" + realId + endCalButtonId).length > 0) {
                $("#" + realId + endCalButtonId).off();
                $("#" + realId + endCalButtonId).remove();
            }
            $(div).jqxMaskedInput('destroy');
            $(document).off("click." + realId);
            $("#" + realId).off();
            $("#" + realId).remove();
            return true;
        }
        catch (err) {
            errorHandle(formName, 'destroy', err);
        }
    };
    function disableButton(div, param) {
        try {
            var options = $.data($(div)[0], formName).options;
            var realId = $(div).prop('id');
            $("#" + realId + endCalButtonId).prop("disabled", param);
            if (param == true) {
                $("#" + realId + endCalButtonId).css({ cursor: "" });
                options.stopHover = true;
            }
            else {
                $("#" + realId + endCalButtonId).css({ cursor: "pointer" });
                options.stopHover = false;
            }
        }
        catch (err) {
            errorHandle(formName, 'disableButton', err);
        }
    }
    function changeParameters(div, opts) {
        try {
            var options = $.data(div, formName).options;
            var keys = Object.keys(opts);
            for (var i = 0; i < keys.length; i++) {
                switch (keys[i]) {
                    case "width":
                        $(div).css({ width: opts['width'] });
                        if (options.showCalendarButton == true) {
                            opts['width'] -= calButtonWidth;
                        }
                        break;
                    case "height":
                        $(div).css({ height: opts['height'] });
                        break;
                    case "disabled":
                        if (options.showCalendarButton == true) {
                            disableButton(div, opts['disabled']);
                        }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'changeParameters', err);
        }
    }
    function clear(div) {
        return clearValue(div);
    };
    function clearValue(div) {
        $(div).jqxMaskedInput('clearValue');
    };
    function focus(div) {
        $(div).jqxMaskedInput('focus');
        $(div).select();
    };
    function val(div) {
        return getText(div);
    };
    function getText(div) {
        try {
            if (getDate(div) != null) {
                return $(div).jqxMaskedInput('val');
            }
            else {
                return null;
            }
        }
        catch (err) {
            errorHandle(formName, 'getText', err);
        }
    };
    function setText(div, param) {
        try {
            if (isEmpty(param)) {
                $(div).jqxMaskedInput('clear');
            }
            else {
                $(div).jqxMaskedInput('val', param);
            }
            checkIsDate(div, true, function (d) {
                dateChangedX(div, d, true);
            });
        }
        catch (err) {
            errorHandle(formName, 'setText', err);
        }
    };
    function getDate(div) {
        try {
            if (div == null || $.data(div, formName) == null || $.data(div, formName).options == null) return;
            var options = $.data(div, formName).options;
            var value = $(div).jqxMaskedInput('val');
            if (value.indexOf('_') >= 0) return null;
            var timestamp = new Date(getFakeDate(div, value));
            if (isNaN(timestamp) == false) {
                return timestamp;
            }
            else {
                return null;
            }
        }
        catch (err) {
            errorHandle(formName, 'getDate', err);
        }
    };
    function setDate(div, param) {
        try {
            var options = $.data(div, formName).options;
            if (isEmpty(param) != true) {
                var formatString = options.formatString.replace(/\/|:| /g, '');
                var value = formatDateTime(param, formatString);
                $(div).jqxMaskedInput('val', value);
                checkIsDate(div, true, function (d) {
                    dateChangedX(div, d, true);
                });
            }
            else {
                $(div).jqxMaskedInput("clear");
            }
        }
        catch (err) {
            errorHandle(formName, 'setDate', err);
        }
    };
    function init(div) {
        try {
            renderControls(div);
            $(div).triggerHandler('loaded');
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function getFakeDate(div, value) {
        try {
            var options = $.data(div, formName).options;
            var d = value;
            //只有時間
            if (options.formatString.indexOf('yyyy') < 0) {
                d = '0001/01/01 ' + value;
            }
            switch (options.formatString) {
                case "yyyy":        //只有年
                    d = value + "/01/01";
                    break;
                case "yyyy/MM":     //只有年月
                    d = value + "/01";
                    break;
            }
            return d;
        }
        catch (err) {
            errorHandle(formName, 'getFakeDate', err);
        }
    }
    //檢核是否為日期
    function checkIsDate(div, showMsg, action) {
        try {
            var options = $.data(div, formName).options;
            var value = $(div).jqxMaskedInput('val');
            var formatString = options.formatString;
            if (showMsg == null) showMsg = ture;
            if (value.indexOf('_') < 0 && value.length == formatString.length) {
                var timestamp = Date.parse(getFakeDate(div, value));
                if (isNaN(timestamp) == false) {
                    action([true]);
                }
                else {
                    var msg;
                    if (options.formatString.indexOf('yyyy') >= 0) {
                        msg = options.language.dateError;
                    }
                    else {
                        msg = options.language.timeError;
                    }
                    if (showMsg == true) {
                        messageBox(msg, messageType.critical, null, function () {
                            action([false]);
                        });
                    }
                    else {
                        action([false, msg]);
                    }
                }
            }
            else {
                if (isEmpty(value.replace(/\/|:| |_/g, ''))) {
                    action([false, 0]);
                }
                else {
                    action([false, -1]);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'checkIsDate', err);
        }
    };
    function dateChangedX(div, d, noFocus) {
        try {
            var options = $.data(div, formName).options;
            if (d[0] == true) {
                if (options.oValue != $(options.maskControl).jqxMaskedInput('val')) {
                    $(options.realControl).triggerHandler('dateChanged');
                }
                options.oValue = $(options.maskControl).jqxMaskedInput('val');
            }
            else {
                if (d[1] == 0) {
                    $(options.maskControl).jqxMaskedInput('clear');
                    if (noFocus != true) {
                        $(options.maskControl).select();
                        $(options.maskControl).jqxMaskedInput('focus');
                    }
                    if (options.oValue != $(options.maskControl).jqxMaskedInput('val')) {
                        $(options.realControl).triggerHandler('dateChanged');
                        options.oValue = $(options.maskControl).jqxMaskedInput('val');
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'dateChangedX', err);
        }
    };
    function renderControls(div) {
        try {
            var options = $.data(div, formName).options;
            var formatString = options.formatString;
            var spFString = formatString.split(' ');
            var mask = '';
            if (formatString.toUpperCase().indexOf('Y') >= 0) {
                var dateStr = spFString[0];
                var spDateString = dateStr.split('/');
                for (var i = 0 ; i < spDateString.length; i++) {
                    switch (spDateString[i]) {
                        case 'yyyy':
                        case 'YYYY':
                            mask += '[1-2][0-9][0-9][0-9]';
                            break;
                        case "MM":
                            mask += '[0-1][0-9]';
                            break;
                        case "dd":
                        case "DD":
                            mask += '[0-3][0-9]';
                            break;
                    }
                    if (i < spDateString.length - 1) mask += '/';
                }
            }
            if (formatString.toUpperCase().indexOf('H') >= 0) {
                if (mask.length > 0) mask += " ";
                var timeStr = spFString[spFString.length - 1];
                var spTimeString = timeStr.split(':');
                for (var i = 0 ; i < spTimeString.length; i++) {
                    switch (spTimeString[i]) {
                        case 'HH':
                        case 'hh':
                            mask += '[0-2][0-9]';
                            break;
                        case "mm":
                            mask += '[0-5][0-9]';
                            break;
                        case "ss":
                        case "SS":
                            mask += '[0-5][0-9]';
                            break;
                    }
                    if (i < spTimeString.length - 1) mask += ':';
                }
            }
            var id = $(div).prop("id");
            $(div).attr('maxlength', formatString.length);
            $(div).attr("ime-mode", "disabled");
            delete options.realOptions.formatString;
            delete options.realOptions.showCalendarButton;
            delete options.realOptions.showTimeButton;
            delete options.realOptions.culture;
            $(div).on('focus', function () {
                $(div).select();
            });
            changeDateTime(div);
            $(div).jqxMaskedInput($.extend({}, { mask: mask }, options.realOptions));
            addCalendar(div);
            //options.controls.push({ name: $(div).prop('id'), type: 'jqxMaskedInput', level: 0 });
            //$(div).off('valueChanged');
            $(div).on('keydown', function (event) {
                try {
                    //if (event.shiftKey) return false;
                    if (event.ctrlKey) return false;
                    if (event.altKey) return false;
                    //document.designMode = "off";
                    if (event.which >= 48 && event.which <= 57 || event.which >= 96 && event.which <= 105) {
                        checkIsDate(div, true, function (d) { dateChangedX($("#" + id), d); });
                    }
                    if (isEmpty($(this).jqxMaskedInput('val').replace(/\/|:| |_/g, ''))) {
                        $("#" + id).triggerHandler('dateChanged');
                        options.oValue = null;
                    }
                    //document.designMode = "off";
                }
                catch (err) {
                    errorHandle(formName, 'renderControls_keydown', err);
                }
            });

            $(div).on('blur', true, function (event) {
                checkIsDate(div, false, function (d) {
                    if (d[0] == true) {
                    }
                    else {
                        $(div).jqxMaskedInput('clear');
                    }
                });
            });
        }
        catch (err) {
            errorHandle(formName, 'renderControls', err);
        }
    };
    function changeDateTime(div) {
        try {
            var options = $.data(div, formName).options;
            var oOptions = cloneJSON(options);
            var p = $(div).parent();
            var id = $(div).prop('id');
            var pDIV = $("<div></div>").insertBefore($(div));
            $(pDIV).attr("style", $(div).attr("style"));
            $(div).attr("style", "");
            $(pDIV).attr("class", $(div).attr("class"));
            $(div).attr("class", "");
            $(div).appendTo(pDIV);

            if (isEmpty(options.width) != true) {
                $(pDIV).css({ width: options.width });
                if (options.width.toString().indexOf("%") >= 0) {
                    options.realOptions.width = $(pDIV).width() - 2;
                }
            }
            else {
                $(div).css({ "width": $(pDIV).width() });
            }
            if (options.height != null) {
                $(pDIV).css({ height: options.height });
            }
            $(div).css('float', "left");
            $(div).prop('id', id + endRealControl);
            $(pDIV).prop('id', id);
            oOptions.realControl = $(pDIV);
            oOptions.maskControl = $(div);
            $.data($(pDIV)[0], formName, {
                options: oOptions
            });
        }
        catch (err) {
            errorHandle(formName, 'changeDateTime', err);
        }
    }
    function addCalendar(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.showCalendarButton && options.formatString.toUpperCase().indexOf("YYYY/MM/DD") >= 0) {
                var id = $(div).prop("id");
                id = id.substr(0, id.length - 2);
                var height = $(div).height();
                var width = $(div).width();
                var theme = options.theme;
                $(div).width(width - calButtonWidth);
                var calButton = $("<div id='" + id + endCalButtonId + "'></div>").insertAfter(div);
                calButton.addClass("jqx-input");
                calButton.addClass("jqx-input-content");
                calButton.addClass("jqx-widget-content-" + theme);
                calButton.addClass("jqx-fill-state-normal");
                calButton.addClass("jqx-fill-state-normal-" + theme);
                var calImg = $("<div></div>").appendTo(calButton);
                calImg.addClass("jqx-icon");
                calImg.addClass("jqx-icon-" + theme);
                calImg.addClass("jqx-icon-calendar");
                calImg.addClass("jqx-icon-calendar-" + theme);
                calButton.css({
                    'float': 'left',
                    height: height,
                    "border-left-width": 0,
                    cursor: "pointer"
                });
                calButton.on("mouseenter", function () {
                    if (options.stopHover == true) { return; }
                    $(this).addClass("jqx-fill-state-hover");
                    $(this).addClass("jqx-fill-state-hover-" + theme);
                });
                calButton.on("mouseleave", function () {
                    if (options.stopHover == true) { return; }
                    $(this).removeClass("jqx-fill-state-hover");
                    $(this).removeClass("jqx-fill-state-hover-" + theme);
                });
                calButton.on('click', function (e) {
                    try {
                        if ($(this).prop('disabled') == true) { return; }
                        var calenderId = id + endCalId;
                        var width = $("#" + id).width();
                        $(document).off("click." + id);
                        $(document).on("click." + id, function (e) {
                            if (checkIsChild($("#" + calenderId), $(e.target)) != true &&
                                checkIsChild($("#" + id), $(e.target)) != true) {
                                $("#" + calenderId).css("display", "none");
                            }
                        });
                        var value = $("#" + id).csDateTime("getDate");
                        var calHeight = 220;
                        var calWidth = 220;
                        if ($("#" + calenderId).length > 0) {
                            if ($("#" + calenderId).css("display") == "none") {
                                $("#" + calenderId).css("display", "");
                                options.calChange = true;
                                if (value != null) {
                                    $("#" + calenderId).jqxCalendar("val", value);
                                }
                                else {
                                    $("#" + calenderId).jqxCalendar("val", new Date());
                                }
                                options.calChange = false;
                            }
                            else {
                                $("#" + calenderId).css("display", "none");
                            }
                        }
                        else {
                            var cal = $("<div id='" + calenderId + "'></div>").appendTo("body");
                            var calOpts = {
                                width: calWidth, height: calHeight, theme: options.theme,
                                culture: options.culture
                            };
                            $("#" + calenderId).jqxCalendar(calOpts);
                            if (value != null) {
                                $("#" + calenderId).jqxCalendar("val", value);
                            }
                            $("#" + calenderId).on('change', function (event) {
                                try {
                                    var rowLength = $("#cellTableView" + calenderId).find("[role='row']").length;
                                    if (rowLength == 6 && options.calChange != true) {
                                        var jsDate = event.args.date;
                                        var oValue = $("#" + id).csDateTime("getText");
                                        if (options.formatString.indexOf("HH") >= 0 && isEmpty(oValue) != true) {
                                            var hhmmss = null;
                                            hhmmss = formatDateTime(oValue, options.formatString.replace("yyyy/MM/dd", "").replace(/\/|:| /g, "").trim());
                                            jsDate = new Date(formatDateTime(jsDate, 'yyyyMMdd') + " " + hhmmss);
                                        }
                                        $("#" + id).csDateTime("setDate", jsDate);
                                        $("#" + calenderId).css("display", "none");
                                        $("#" + id + endRealControl).focus();
                                        if (options.formatString.indexOf("HH") >= 0) {
                                            //$("#" + id + endRealControl)[0].setSelectionRange(12, options.formatString.length - 11);
                                            //$("#" + id + endRealControl)[0].selectionStart = 13;
                                            //$("#" + id + endRealControl)[0].selectionEnd = options.formatString.length - 11;
                                        }
                                    }
                                }
                                catch (err) {
                                    errorHandle(formName, 'addCalendar_click_change', err);
                                }
                            });
                        }
                        //var pos = getAbsoluteOffsetFromBody($("#" + id)[0]);
                        //var top = pos.top;
                        //var left = pos.left;
                        var top = e.clientY - e.offsetY + height;
                        var left = e.clientX - e.offsetX + calButtonWidth - width - 4;
                        if (top > 500) {
                            top -= calHeight + height + 10;
                        }
                        if (left > 800) {
                            left -= calWidth - calButtonWidth - width;
                        }
                        $("#" + calenderId).css({
                            position: "absolute",
                            'z-index': 99999,
                            top: top,
                            left: left,
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'addCalendar_click', err);
                    }

                });
            }
        }
        catch (err) {
            errorHandle(formName, 'addCalendar', err);
        }
    }
    getAbsoluteOffsetFromBody = function (el) {   // finds the offset of el from the body or html element
        var _x = 0;
        var _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            //_x += el.offsetLeft - el.scrollLeft + el.clientLeft;
            //_y += el.offsetTop - el.scrollTop + el.clientTop;
            _x += el.offsetLeft + el.clientLeft;
            _y += el.offsetTop + el.clientTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }
})(jQuery);