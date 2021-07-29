///改保證金
(function ($) {
    var formName = 'SO1144B3';
    var riadllName = 'CableSoft.SO.RIA.Order.Edit.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Order.Edit.Web.NewOrderEdit';
    var textHeight = 23;
    var buttonsHeight = 25;
    var canChooseDepositTableName = "CanChooseDeposit";
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
                        options: $.extend({}, new defaults(), new SO1144B3(), options)
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
                            listAddHandler(div);
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
            refresh(div, function (r) {
                action(r);
            });
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
            var oHightArray = [$(div).height() - buttonsHeight - 8];
            var oWidthArray = ["99.5%"];
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
            //建立單選元件
            oArray = ["csPTCode"];
            oWidthArray = ["78%", "78%"];
            oTableArrays = ["PTCode", "PTCode"];
            oLength = oArray.length;
            var columns = [[
                { text: '', datafield: 'PTCODE', width: 70 },
                { text: '', datafield: 'PTNAME', width: 100 },
            ], undefined];
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 80,
                    width: oWidthArray[i],
                    columns: columns[i],
                    popupHeight: 200,
                    //source: options.parameters[oTableArrays[i]].rows
                });
                controls.push({ name: iId, type: 'csList', level: level });
            }
            //建立input
            oArray = ["tContName", "tCheckNo", "tAmount"];
            oWidthArray = ["77%", "77%", "30%"];
            oDisabled = [true, true];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxInput({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: oDisabled[i],
                });
                controls.push({ name: iId, type: 'jqxInput', level: level });
            }
            //建立按鈕
            oArray = ['btnOk'];
            oLength = oArray.length;
            for (var i = oLength - 1 ; i >= 0; i--) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var width = '20%';
                var text = lang[oArray[i]];
                o.text(text);
                o.jqxButton({
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                });
                controls.push({ name: bId, type: 'jqxButton', level: level });
                $('#' + bId).css("margin", 2);
                $('#' + bId).css("float", 'left');
                $('#' + bId).css("max-width", 120);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function refresh(div, action) {
        try {
            var options = $.data(div, formName).options;
            getCanChooseDeposit(div, function (r) {
                if (r[0] == true) {
                    initList(div);
                    defaultValue(div);
                    action(true);
                }
                else {
                    if (r[1] != null && r[1].length > 0) {
                        messageBox(r[1]);
                    }
                    action(false);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'refresh', err);
        }
    };
    function initList(div) {
        try {
            var options = $.data(div, formName).options;
            var csArrays = ["csPTCode"];
            var tableArrays = [canChooseDepositTableName];
            var cLengths = csArrays.length;

            for (var i = 0; i < cLengths; i++) {
                getControlObject(div, csArrays[i]).csList('source', options.initData[tableArrays[i]].rows);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initList', err);
        }
    }
    function listAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //付款種類
            csPTCode_selectedIndexChanged(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    }
    //付款種類selectedIndexChanged
    function csPTCode_selectedIndexChanged(div) {
        getControlObject(div, 'csPTCode').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var value = getControlObject(div, 'csPTCode').csList('codeNo');
                if (isEmpty(value)) {
                    return;
                }
                var row = getRowByKeyValue(options.initData[canChooseDepositTableName].rows, 'PTCode'.toUpperCase(), value);
                getControlObject(div, 'tAmount').val(row["Amount".toUpperCase()]);
                //如為本票則本票開票人及本票票號可KEY
                if (value == 6) {
                    getControlObject(div, 'tContName').jqxInput('disabled', false);
                    getControlObject(div, 'tCheckNo').jqxInput('disabled', false);
                }
                else {
                    getControlObject(div, 'tContName').jqxInput('disabled', true);
                    getControlObject(div, 'tCheckNo').jqxInput('disabled', true);
                    getControlObject(div, 'tContName').val('');
                    getControlObject(div, 'tCheckNo').val('');
                }
            }
            catch (err) {
                errorHandle(formName, 'csPTCode_selectedIndexChanged', err);
            }
        });
    };
    //設預設值
    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'csPTCode').csList('codeNo', options.parameters.row['PTCODE']);
            getControlObject(div, 'tAmount').val(options.parameters.row['AMOUNT']);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'defaultValue', err);
        }
    };
    function getCanChooseDeposit(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var custId = options.custId;
            var orderNo = options.orderNo;
            var faciCode = options.parameters.row['faciCode'.toUpperCase()];
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                orderNo: { type: 'string', value: convertToNull(orderNo) },
                faciCode: { type: 'string', value: convertToNull(faciCode) },
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'GetCanChooseDeposit',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        delete options.initData;
                        options.initData = JSON.parse(data.ResultXML);
                        action([true]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getCanChooseDeposit', err);
        }
    };
})(jQuery);