///無促案
(function ($) {
    var formName = 'SO1144B4';
    var riadllName = 'CableSoft.SO.RIA.Order.Edit.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Order.Edit.Web.NewOrderEdit';
    var textHeight = 23;
    var buttonsHeight = 25;
    var serviceTypeTableName = "ServiceTypeCode";
    var instCodeTableName = "CanInstCode";
    var wipTableName = 'Wip';
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
                        options: $.extend({}, new defaults(), new SO1144B4(), options)
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
        clear: function (jq) {
            return jq.each(function () {
                clear(this);
            });
        },
        refresh: function (jq, params, params2) {
            return jq.each(function () {
                refresh(this, params, params2);
            });
        },
        disabled: function (jq, params) {
            return jq.each(function () {
                disabled(this, params);
            });
        }
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
        this.orderItem = 0;
        this.resvTime = null;
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
                            buttonAddHandler(div);
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
    function defaultValue(div, data) {
        try {
            var options = $.data(div, formName).options;
            var rows = options.orderData[wipTableName].rows;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['ORDERITEM'] == data.row['ORDERITEM']) {
                    getControlObject(div, 'csServiceType').csList('codeNo', rows[i]['SERVICETYPE']);
                    options.defaultWorkCode = rows[i]['WORKCODE'];
                    options.orderItem = data.row['ORDERITEM'];
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'frmAddHandler', err);
        }
    }
    function refresh(div, data, action) {
        try {
            var options = $.data(div, formName).options;
            options.editMode = data.editMode;
            if (data.editMode == editMode.edit) {
                options.orderItem = data.row['ORDERITEM'];
                defaultValue(div, data);
                action(true);
            }
            else {
                action(true);
            }
        }
        catch (err) {
            errorHandle(formName, 'refresh', err);
        }
    };
    function clear(div) {
        try {
            getControlObject(div, 'csInstCode').csList('clearDisplayValue');
            getControlObject(div, 'csServiceType').csList('clearDisplayValue');
        }
        catch (err) {
            errorHandle(formName, 'frmAddHandler', err);
        }
    }
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
            initServiceType(div);
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
            oArray = ["csServiceType", "csInstCode"];
            oWidthArray = ["84%", "84%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 80,
                    width: oWidthArray[i],
                    popupHeight: 100,
                    //source: options.parameters[oTableArrays[i]].rows
                });
                controls.push({ name: iId, type: 'csList', level: level });
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
                $('#' + bId).css("float", 'left');
                $('#' + bId).css("max-width", 120);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var serviceType = getControlObject(div, 'csServiceType').csList('codeNo');
            if (isEmpty(serviceType)) {
                showMustBe(options.language.lServiceType, function () {
                    getControlObject(div, 'csServiceType').csList('focus');
                });
                return false;
            }
            var instCode = getControlObject(div, 'csInstCode').csList('codeNo');
            if (isEmpty(instCode)) {
                showMustBe(options.language.lInstCode, function () {
                    getControlObject(div, 'csInstCode').csList('focus');
                });
                return false;
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    }
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //確定
            getControlObject(div, 'btnOk').on('click', function () {
                if ($(this).jqxButton('disabled') == true) { return; }
                if (isDataOk(div) != true) return;
                chooseWip(div, function (r) {
                    if (r[0] == true) {
                        clear(div);
                        var e = $.Event("chooseOk", {
                            args: {
                                orderData: options.rOrderData,
                                calculateData: options.calculateData
                            }
                        });
                        $(div).triggerHandler(e);
                    }
                    else if (r[1] != null) {
                        messageBox(r[1]);
                    }
                });
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    function splitData(div, data) {
        try {
            var options = $.data(div, formName).options;
            var keys = Object.keys(data);
            var kLength = keys.length;
            if (options.calculateData != null) {
                delete options.calculateData;
            }
            options.calculateData = {};
            for (var i = 0; i < kLength; i++) {
                if (keys[i].indexOf('CALCULATE_') >= 0) {
                    options.calculateData[keys[i].replace('CALCULATE_', '')] = data[keys[i]];
                    delete data[keys[i]];
                }
            }
            delete options.rOrderData;
            options.rOrderData = data;
        }
        catch (err) {
            errorHandle(formName, 'splitData', err);
        }
    }
    function chooseWip(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var instCode = getControlObject(div, 'csInstCode').csList('codeNo');
            var orderData = JSON.stringify(options.orderData);
            var resvTime = options.resvTime;
            var orderItem = options.orderItem;
            var parameters = $.extend({}, paraLoginInfo, {
                instCode: { type: 'integer', value: instCode },
                orderData: { type: 'string', value: convertToNull(orderData) },
                resvTime: { type: 'date', value: convertToNull(resvTime) },
                orderItem: { type: 'integer', value: convertToNull(orderItem) },
            });
            var params = getParameters(riadllName,
                riaClassName,
                'ChooseWip',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        splitData(div, JSON.parse(data.ResultXML));
                        action([true]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'chooseWip', err);
        }
    };
    function initServiceType(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'csServiceType').csList('source', options.parameters[serviceTypeTableName].rows);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initServiceType', err);
        }
    }
    function listAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //服務別
            csServiceType_selectedIndexChanged(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    };
    function initInstCode(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'csInstCode').csList('source', options.initData[instCodeTableName].rows);
            if (options.editMode == editMode.edit) {
                getControlObject(div, 'csInstCode').csList('codeNo', options.defaultWorkCode);
            }
        }
        catch (err) {
            errorHandle(formName, 'initInstCode', err);
        }
    }
    //付款種類selectedIndexChanged
    function csServiceType_selectedIndexChanged(div) {
        getControlObject(div, 'csServiceType').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var value = getControlObject(div, 'csServiceType').csList('codeNo');
                if (isEmpty(value)) {
                    return;
                }
                getCanWipCode(div, value, function (r) {
                    if (r[0] == true) {
                        initInstCode(div);
                    }
                    else if (r[1] != null) {
                        messageBox(r[1]);
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'csServiceType_selectedIndexChanged', err);
            }
        });
    };
    function getCanWipCode(div, serviceType, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var custId = options.custId;
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                serviceType: { type: 'string', value: convertToNull(serviceType) },
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetCanWipCode',
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
            errorHandle(formName, 'getCanWipCode', err);
        }
    };
})(jQuery);