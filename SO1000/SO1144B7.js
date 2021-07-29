///改繳款日
(function ($) {
    var formName = 'SO1144B7';
    var riadllName = 'CableSoft.SO.RIA.Order.Edit.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Order.Edit.Web.NewOrderEdit';
    var textHeight = 23;
    var canChoosePayDateTableName = "CanChoosePayDate";
    var parameterTableName = "Parameter";
    $.fn[formName] = function (options, param, param2) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, param2);
                }
                return;
            }
            options = options || {};
            return this.each(function () {
                var state = $.data(this, formName);
                if (state) {
                    $.extend(state.options, options);
                }
                else {
                    $.data(this, formName, {
                        options: $.extend({}, new defaults(), new SO1144B7(), options)
                    });
                    formLoaded(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.' + formName, err);
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
                formDestroy(this);
            });
        },
        resize: function (jq, params) {
            return jq.each(function () {
                formResize(this, params);
            });
        },
        setPayDate: function (jq, params, params2) {
            return jq.each(function () {
                setPayDate(this, params, params2);
            });
        },
        getPayDate: function (jq) {
            return getPayDate(jq[0]);
        },
        disabled: function (jq, params) {
            return jq.each(function () {
                disabled(this, params);
            });
        },
    };
    var defaults = (function () {
        this.language = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.refNo = 0;
        this.parameters = {};
        this.controls = [];
        this.theme = $.jqx.theme;
        this.localization = null;
        this.container = null;

        this.orderData = null;
        this.payDate = null;
    });
    function parameter(div, paraName, params) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            options.theme = params;
            for (var i = 0; i < controls.length; i++) {
                var o = $('#' + controls[i].name);
                if (controls[i].type.indexOf('jqx') >= 0) {
                    $(o)[controls[i].type](paraName, params);
                }
                else if (controls[i].type.indexOf('cs') >= 0) {
                    $(o)[controls[i].type](paraName, params);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    function formResize(div, params) {
        try {
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            var controls = options.controls;
            for (var i = 0; i < controls.length; i++) {
                if (controls[i].type.indexOf('jqxSplitter') >= 0) {
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            destroyControls(controls);
            var options = $.data(div, formName).options
            options.length = 0;
            options = null;
            $.data(div, formName, null);
            $(div).off();
            //$(div).remove();
            return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            $.ajax({
                url: 'SO1000\\' + formName + '.html',
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            frmAddHandler(div);
                            $(div).triggerHandler('loaded');
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
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
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function frmAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.container != null) {
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    $(options.container).on('winClosing', function (e) {
                        close(div)
                    });
                }
                addHandlerGetParameters(options.container, options);
            }
            else {
                addHandlerGetParameters(div, options);
            }
        }
        catch (err) {
            errorHandle(formName, 'frmAddHandler', err);
        }
    };
    function getPayDate(div) {
        try {
            var d = $.data(div, formName).options.payDate;
            if (new Date(d) != null) {
                return $.data(div, formName).options.payDate;
            }
            else {
                return null;
            }
        }
        catch (err) {
            errorHandle(formName, 'getPayDate', err);
        }
    }
    function setPayDate(div, resvTime, period) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'tPayDate').off();
            rows = options.parameters[canChoosePayDateTableName].rows;
            var source = [];
            for (var i = 0; i < rows.length; i++) {
                source.push(formatDateTime(rows[i]['PAYDATE'], 'date'));
            }
            if (rows.length == 0) {
                var cycleDate = options.parameters[parameterTableName].rows[0]['ProBillCycleDate'.toUpperCase()];
                if (cycleDate != null && period != null && period > 0) {
                    var cycles = cycleDate.split(',');
                    if (resvTime == null)
                        resvTime = new Date(formatDateTime(new Date(), 'date'));
                    else {
                        resvTime = new Date(formatDateTime(new Date(resvTime), 'date'));
                    }

                    for (var i = 0; i < cycles.length; i++) {
                        var t1 = new Date(resvTime);
                        t1 = addMonths(t1, Number(period));
                        var t2 = new Date(formatDateTime(t1, 'yyyyMM') + '/' + cycles[i].padLeft(2, '0'));
                        if (t1 > t2) t2 = addMonths(t2, 1);
                        source.push(formatDateTime(t2, 'date'));
                    }
                    source.sort();
                }
            }
            getControlObject(div, 'tPayDate').jqxDropDownList('source', source);
            if (source.length > 0) {
                //options.payDate = new Date(source[0]);
                //getControlObject(div, 'tPayDate').jqxDropDownList('selectItem', source[0]);
            }
            textAddHandler(div);
            return;
        }
        catch (err) {
            errorHandle(formName, 'setPayDate', err);
        }
    };
    function disabled(div, flag) {
        try {
            var options = $.data(div, formName).options;
            disableAllControls(options.controls, flag);
        }
        catch (err) {
            errorHandle(formName, 'disabled', err);
        }
    };
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div);
            renderControl(div);
            //$(options.container).on('resize', function () {
            //    formResize(div);
            //});
            formResize(div);
            setPayDate(div);
            action(true);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };

    function changeLanguage(div) {
        try {
            var lang = $.data(div, formName).options.language;
            var keys = Object.keys(lang);
            var kLength = keys.length;
            //改label
            for (var i = 0 ; i < kLength; i++) {
                var o = $('#' + $(div).prop('id') + keys[i]);
                if (o.length > 0 && keys[i].substr(0, 1) == 'l') {
                    o.text(lang[keys[i]]);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'changeLanguage', err);
        }
    };
    function renderControl(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var lang = options.language;
            var height = $(div).innerHeight();
            var level = 0;
            var oLength = 0;
            var oArray = [];
            var oHightArray = [];
            var oWidthArray = [];
            var oDisabled = [];
            var oColors = [];
            //建立Panel
            oArray = ["gbxHead"];
            var oHightArray = [$(div).height() - 3];
            var oWidthArray = ["99.3%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxPanel({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    //sizeMode: "wrap"
                    autoUpdate: true
                });
                controls.push({ name: iId, type: 'jqxPanel', level: level });
                //var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                //for (var j = 0; j < scrollBars.length; j++) {
                //    if ($('#' + iId + scrollBars[j]).length > 0) {
                //        $('#' + iId + scrollBars[j]).remove();
                //    }
                //}
            }
            level += 1;
            //建立下拉元件
            oArray = ["tPayDate"];
            oWidthArray = ["30%"];
            oLength = oArray.length;
            var source = [];
            //for (var i = 1 ; i <= periods; i++) {
            //    source.push(i);
            //}
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxDropDownList({
                    theme: options.theme,
                    placeHolder: options.localization.filterchoosestring,
                    height: textHeight,
                    width: oWidthArray[i],
                    source: source
                });
                controls.push({ name: iId, type: 'jqxDropDownList', level: level });
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function textAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'tPayDate').off('change');
            //確定
            getControlObject(div, 'tPayDate').on('change', function (event) {
                try {
                    var item = $(this).jqxDropDownList('getSelectedItem');
                    options.payDate = item.label;
                    var e = $.Event("chooseOk", {
                        args: {
                            payDate: options.payDate
                        }
                    });
                    $(div).triggerHandler(e);
                }
                catch (err) {
                    errorHandle(formName, 'tPayDate_change', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'textAddHandler', err);
        }
    };

})(jQuery);