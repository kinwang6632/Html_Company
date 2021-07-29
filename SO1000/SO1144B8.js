///預約時間
(function ($) {
    var formName = 'SO1144B8';
    var riadllName = 'CableSoft.SO.RIA.Order.Edit.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Order.Edit.Web.NewOrderEdit';
    var textHeight = 23;
    var buttonsHeight = 25;
    var gridHeight = 25;
    var wipTableName = "Wip";
    var productTableName = "Product";
    var canMaintainResvTableName = "CanMaintainResv";
    var canPRResvTableName = "CanPRResv";
    var canResvTableName = "CanResv";
    var customerTableName = "Customer";
    var wipTableName = 'Wip';
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
                        options: $.extend({}, new defaults(), new SO1144B8(), options)
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
        getResvData: function (jq) {
            return getResvData(jq[0]);
        },

        isDataOk: function (jq) {
            return isDataOk(jq[0]);
        },
        focus: function (jq) {
            focus(jq);
        },
        disabled: function (jq, params) {
            return jq.each(function () {
                disabled(this, params);
            });
        },
        displayCopyTime: function (jq) {
            return jq.each(function () {
                displayCopyTime(this);
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
        this.resvTime = null;
        this.groupNo = null;
        this.resvType = 0;
        this.resvSNo = null;
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
                            txtAddHandler(div);
                            buttonAddHandler(div);
                            addHandler(div);
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
    function focus(div) {
        try {
            getControlObject(div, 'dtResvTime').csDateTime('focus');
        }
        catch (err) {
            errorHandle(formName, 'focus', err);
        }
    }
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var resvData = getResvData(div);
            if (isEmpty(resvData['resvTime'])) {
                showMustBe(options.language.lResvTime, function () {
                    getControlObject(div, 'dtResvTime').csDateTime('focus');
                });
                return false;
            }
            if (options.editMode == editMode.edit && isEmpty(resvData['returnCode'])) {
                showMustBe(options.language.lChangeReason, function () {
                    getControlObject(div, 'csReturnCode').csList('focus');
                });
                return false;
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    };
    function setResvData(div) {
        try {
            var options = $.data(div, formName).options;
            var orderRows = options.orderData['Order'].rows;
            if (orderRows.length > 0) {
                var resvTime = orderRows[0]['resvTime'.toUpperCase()];
                if (isEmpty(resvTime)) {
                    if (options.orderData[wipTableName].rows.length > 0) {
                        resvTime = options.orderData[wipTableName].rows[0]["ResvTime".toUpperCase()];
                    }
                }
                getControlObject(div, 'dtResvTime').csDateTime('setText', formatDateTime(resvTime, 'datetime'));
                options.groupNo = orderRows[0]['groupNo'.toUpperCase()];
                options.resvType = orderRows[0]['resvType'.toUpperCase()];
                options.resvSNo = orderRows[0]['resvSNo'.toUpperCase()];
                options.salesAutoSNo = orderRows[0]['salesAutoSNo'.toUpperCase()];
            }
        }
        catch (err) {
            errorHandle(formName, 'setResvData', err);
        }
    };
    function getResvData(div) {
        try {
            var options = $.data(div, formName).options;
            var resvData = {};
            resvData['resvTime'] = getControlObject(div, 'dtResvTime').csDateTime('getText');
            resvData['groupNo'] = options.groupNo;
            resvData['resvType'] = options.resvType;
            resvData['resvSNo'] = options.resvSNo;
            resvData['salesAutoSNo'] = options.salesAutoSNo;
            if (options.editMode == editMode.edit) {
                resvData['returnCode'] = getControlObject(div, 'csReturnCode').csList('codeNo');
                resvData['returnName'] = getControlObject(div, 'csReturnCode').csList('description');
            }
            resvData['CATVTime'] = getCTime(div);
            resvData['DTVTime'] = getDTime(div);
            return resvData;
        }
        catch (err) {
            errorHandle(formName, 'getResvData', err);
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
            combineCanResv(div);
            enableButton(div);
            //$(options.container).on('resize', function () {
            //    formResize(div);
            //});
            defaultValue(div);
            formResize(div);
            setResvData(div);
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
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                //for (var j = 0; j < scrollBars.length; j++) {
                //    if ($('#' + iId + scrollBars[j]).length > 0) {
                //        $('#' + iId + scrollBars[j]).off();
                //        $('#' + iId + scrollBars[j]).remove();
                //    }
                //}
            }
            level += 1;
            //getControlObject(div,"dtResvTime2").jqxMaskedInput({ width: '50%', height: textHeight, mask: '####/##/##' });
            //建立日期元件
            oArray = ["dtResvTime"];
            oWidthArray = ["66%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var fs = "yyyy/MM/dd HH:mm";
                $('#' + iId).csDateTime({
                    theme: options.theme,
                    formatString: fs,
                    showCalendarButton: false,
                    value: null,
                    height: textHeight,
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csDateTime', level: level });
            }
            //建立input
            oArray = ["tCATVTime", "tDTVTime"];
            oWidthArray = ["25%", "25%"];
            var oRemoveFlag = [convertToNull(options.parameters[parameterTableName].rows[0]['CATVCopyMaxCount'.toUpperCase()], 0) <= 1,
                            convertToNull(options.parameters[parameterTableName].rows[0]['DTVCopyMaxCount'.toUpperCase()], 0) <= 1];
            var oDIV = ['dvCATVTime', 'dvDTVTime'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                if (oRemoveFlag[i] == true) {
                    getControlObject(div, oDIV[i]).remove();
                }
                else {
                    var iId = $(div).prop('id') + oArray[i];
                    $('#' + iId).jqxInput({
                        theme: options.theme,
                        height: textHeight,
                        width: oWidthArray[i]
                    });
                    controls.push({ name: iId, type: 'jqxInput', level: level });
                    getControlObject(div, oDIV[i]).css('display', 'none');
                }
            }
            if (options.editMode == editMode.edit) {
                //建立單選元件
                oArray = ["csReturnCode"];
                oWidthArray = ["65%"];
                oLength = oArray.length;
                for (var i = 0 ; i < oLength; i++) {
                    var iId = $(div).prop('id') + oArray[i];
                    $('#' + iId).csList({
                        theme: options.theme,
                        height: textHeight,
                        codeNoWidth: 80,
                        width: oWidthArray[i],
                        source: options.parameters['ReturnCode'].rows
                    });
                    controls.push({ name: iId, type: 'csList', level: level });
                }
                getControlObject(div, 'gbxReturnCode').prop('style').removeProperty('display');
            }
            else {
                getControlObject(div, 'gbxReturnCode').css('display', 'none');
            }
            //建立下拉元件
            oArray = ["tReserveMTPR"];
            oWidthArray = ["100"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxDropDownButton({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                });
                controls.push({ name: iId, type: 'jqxDropDownButton', level: level });
                $('#' + iId).jqxDropDownButton('setContent', '<div style="padding:4px;text-align:center;">' + options.language[oArray[i]] + "</div>");
                $('#' + iId).css("float", 'left');
                $('#' + iId).css("padding", 0);
                $('#' + iId).addClass("jqx-button-" + options.theme);
            }
            //建立按鈕
            oArray = ['btnReserve',
                //'btnReserveMT', 'btnReservePR',
                "btnReserve2"];
            oLength = oArray.length;
            for (var i = oLength - 1 ; i >= 0; i--) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var width = '32%';
                var text = lang[oArray[i]];
                o.text(text);
                o.jqxButton({
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                });
                controls.push({ name: bId, type: 'jqxButton', level: level });
                //$('#' + bId).css("margin-left", 1);
                $('#' + bId).css("float", 'left');
                $('#' + bId).css("max-width", 100);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function displayCopyTime(div) {
        try {
            var options = $.data(div, formName).options;
            var tables = ['Wip', 'Facility'];
            var o = ['tCATVTime', 'tDTVTime'];
            var dv = ['dvCATVTime', 'dvDTVTime'];
            var serviceType = ['C', 'D'];
            for (var x = 0; x < o.length; x++) {
                getControlObject(div, dv[x]).css("display", 'none');
                if (getControlObject(div, o[x]).length > 0) {
                    for (var i = 0; i < tables.length; i++) {
                        var rows = options.orderData[tables[i]].rows;
                        var rLength = rows.length;
                        for (var j = 0; j < rLength; j++) {
                            if (rows[j]['serviceType'.toUpperCase()] == serviceType[x]) {
                                getControlObject(div, dv[x]).prop('style').removeProperty('display');
                            }
                        }
                    }
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'displayCopyTime', err);
        }
    }
    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            if (getControlObject(div, 'tCATVTime').length > 0) {
                getControlObject(div, 'tCATVTime').jqxInput('val', 1);
            }
            if (getControlObject(div, 'tDTVTime').length > 0) {
                getControlObject(div, 'tDTVTime').jqxInput('val', 1);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'defaultValue', err);
        }
    };

    function combineCanResv(div) {
        try {
            var options = $.data(div, formName).options;
            var fields = ["WORKERTYPE", "SNO", "WORKCODE", "WORKNAME", "ACCEPTTIME", "RESVTIME",
                        "WORKEREN1", "WORKERNAME1", "WORKEREN2", "WORKERNAME2", "MCODE", "MNAME",
                        "WORKSERVCODE", "GROUPCODE"];
            options[canResvTableName] = {
                columns: options.parameters[canMaintainResvTableName].columns,
                rows: []
            };
            var tables = [canMaintainResvTableName, canPRResvTableName];
            var workerTypes = ["M", "P"];
            var fLength = fields.length;
            for (var j = 0; j < tables.length; j++) {
                var rows = options.parameters[tables[j]].rows;
                for (var i = 0; i < rows.length; i++) {
                    var row = {};
                    for (var f = 0; f < fLength; f++) {
                        row[fields[f]] = rows[i][fields[f]];
                    }
                    row['WORKERTYPE'] = workerTypes[j];
                    options[canResvTableName].rows.push(row);
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'combineCanResv', err);
        }
    }
    function enableButton(div) {
        try {
            var options = $.data(div, formName).options;
            //var mtFlag = (options.parameters[canMaintainResvTableName].rows.length == 0);
            //var prFlag = (options.parameters[canPRResvTableName].rows.length == 0);
            var flag = options[canResvTableName].rows.length == 0;
            //getControlObject(div, 'btnReserveMT').jqxButton({ disabled: mtFlag });
            //getControlObject(div, 'btnReservePR').jqxButton({ disabled: prFlag });
            getControlObject(div, 'tReserveMTPR').jqxDropDownButton({ disabled: flag });
            return true;
        }
        catch (err) {
            errorHandle(formName, 'enableButton', err);
        }
    };
    function mustHasProduct(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.orderData[wipTableName].rows.length == 0 && options.orderData[productTableName].rows.length == 0) {
                messageBox(options.language.PleaseChooseProduct, null, null, function () {
                    var e = $.Event("chooseOk", {
                        args: { isOk: false, }
                    });
                    $(div).triggerHandler(e);
                });
                return false;
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'mustHasProduct', err);
        }
    };
    function txtAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'dtResvTime').on('keydown', function () {
                options.resvType = 0;
                options.resvSNo = null;
                options.workServCode = null;
            });
            getControlObject(div, 'dtResvTime').on('dateChanged', function (event) {
                try {
                    if (options.changing == true) { return; }
                    options.changing = true;

                    var revertDate = function () {
                        options.resvTime = options.oResvTime;
                        getControlObject(div, 'dtResvTime').csDateTime('setText', options.oResvTime);
                        options.changing = false;
                    }

                    if (mustHasProduct(div) != true) {
                        revertDate();
                        return;
                    }
                    var value = $(this).csDateTime('getText');
                    if (value == null) {
                        options.changing = false;
                        return;
                    }
                    chkResvTime(div, function (r) {
                        if (r[0] == true) {
                            options.oResvTime = getControlObject(div, 'dtResvTime').csDateTime('getText');
                            options.resvTime = options.oResvTime;
                            var e = $.Event("chooseOk", {
                                args: {
                                    orderData: options.rOrderData,
                                    calculateData: options.calculateData,
                                    resvTime: options.resvTime,
                                    groupNo: options.groupNo,
                                    resvType: options.resvType,
                                    resvSNo: options.resvSNo,
                                    workServCode: options.workServCode,
                                    groupCode: options.groupCode,
                                    isOk: true,
                                }
                            });
                            $(div).triggerHandler(e);
                        }
                        else {
                            if (r[1] != null) {
                                messageBox(r[1]);
                            }
                            revertDate();
                        }
                        options.changing = false;
                    });
                }
                catch (err) {
                    options.changing = false;
                    errorHandle(formName, 'dtResvTime_dateChanged', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'txtAddHandler', err);
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
    function getCTime(div) {
        try {
            var CATVCopyTime;
            if (getControlObject(div, 'tCATVTime').length > 0 && getControlObject(div, 'dvCATVTime').css('display') != 'none') {
                CATVCopyTime = getControlObject(div, 'tCATVTime').jqxInput('val');
            }
            return CATVCopyTime;
        }
        catch (err) {
            errorHandle(formName, 'getCTime', err);
        }
    }
    function getDTime(div) {
        try {
            var DTVCopyTime;
            if (getControlObject(div, 'tDTVTime').length > 0 && getControlObject(div, 'dvDTVTime').css('display') != 'none') {
                DTVCopyTime = getControlObject(div, 'tDTVTime').jqxInput('val');
            }
            return DTVCopyTime;
        }
        catch (err) {
            errorHandle(formName, 'getDTime', err);
        }
    }
    function chkResvTime(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var orderData = JSON.stringify(options.orderData);
            var resvTime = new Date(getControlObject(div, 'dtResvTime').csDateTime('getText'));
            var CATVCopyTime = getCTime(div);
            var DTVCopyTime = getDTime(div);

            var parameters = $.extend({}, paraLoginInfo, {
                orderData: { type: 'string', value: orderData },
                resvTime: { type: 'date', value: resvTime },
                CATVCopyTime: { type: 'integer', value: convertToNull(CATVCopyTime, true) },
                DTVCopyTime: { type: 'integer', value: convertToNull(DTVCopyTime, true) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'ChkResvTime',
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
            errorHandle(formName, 'chkResvTime', err);
        }
    };
    function showReserve(div, action) {
        try {
            var options = $.data(div, formName).options;
            var width = 940;
            var height = 500;
            if (width > options.container.width()) width = options.container.width();
            if (height > options.container.height()) height = options.container.height();
            var x = ($(options.container).width() - width) / 2;
            var y = ($(options.container).height() - height) / 2;
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language['btnReserve'], winOptions);
            $('#' + win.windowId).on('close', function () {
                var r = $.data($('#' + win.contentId)[0], 'SO1115A').options;
                var resvTime = r.returnResvtime;
                var groupNo = r.returnWorkCode;
                var isSaved = r.isSaved;
                $('#' + win.contentId)['SO1115A']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                action({ isSaved: isSaved, resvTime: resvTime, groupNo: groupNo });
            });
            var servCode = options.parameters[customerTableName]['servCode'.toUpperCase()];
            var groupNo;
            var resvTime = getControlObject(div, 'dtResvTime').csDateTime('getText');
            if (options.orderData[wipTableName].rows.length > 0) {
                servCode = options.orderData[wipTableName].rows[0]['SERVCODE'];
                groupNo = options.orderData[wipTableName].rows[0]['GROUPNO'];
            }
            //var para = { inparas: { rows: [] } };
            //var row = { SERVCODE: servCode };
            //row['RESVTIME'] = getControlObject(div, 'dtResvTime').csDateTime('getText');
            //row['WORKERTYPE'] = null;
            //row['WORKCODE'] = groupNo;
            //para.inparas.rows.push(row);
            $('#' + win.contentId)['SO1115A']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                //parameters: para,
                workCode: groupNo,
                resvTime: resvTime,
                servCode: servCode,
                theme: options.theme,
                localization: options.localization
            });
        }
        catch (err) {
            errorHandle(formName, 'showReserve', err);
        }
    };
    function showReserve2(div, action) {
        try {
            var options = $.data(div, formName).options;
            var width = 940;
            var height = 500;
            if (width > options.container.width()) width = options.container.width();
            if (height > options.container.height()) height = options.container.height();
            var x = ($(options.container).width() - width) / 2;
            var y = ($(options.container).height() - height) / 2;
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language['btnReserve2'], winOptions);
            $('#' + win.windowId).on('close', function () {
                $('#' + win.contentId)['SO1114A']('destroy');
                $('#' + win.windowId).csWindow('destroy');
            });
            var servCode = options.parameters[customerTableName]['servCode'];;
            var groupNo;
            var workerType;
            if (options.orderData[wipTableName].rows.length > 0) {
                servCode = options.orderData[wipTableName].rows[0]['SERVCODE'];
                groupNo = options.orderData[wipTableName].rows[0]['GROUPNO'];
                switch (options.orderData[wipTableName].rows[0]['WORKERTYPE']) {
                    case 'I':
                        workerType = "1";
                        break;
                    case 'M':
                        workerType = "2";
                        break;
                    case 'P':
                        workerType = "3";
                        break;
                }
            }
            var resvTime = getControlObject(div, 'dtResvTime').csDateTime('getText');
            if (resvTime == null) resvTime = new Date();
            $('#' + win.contentId)['SO1114A']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                servCode: servCode,
                resvTime: resvTime,
                workerType: workerType,
                theme: options.theme,
                localization: options.localization
            });
        }
        catch (err) {
            errorHandle(formName, 'showReserve2', err);
        }
    };
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //勤務派工
            getControlObject(div, 'btnReserve').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (mustHasProduct(div) != true) { return; }
                options.resvType = 0;
                options.resvSNo = null;
                showReserve(div, function (r) {
                    if (r['isSaved'] == true) {
                        options.resvTime = formatDateTime(new Date(r['resvTime']), 'datetime');
                        options.groupNo = r['groupNo'];
                        getControlObject(div, 'dtResvTime').csDateTime('setText', options.resvTime);
                    }
                    //var e = $.Event("clickChild");
                    //$(div).triggerHandler(e);
                });
            });
            ////維修順裝
            //getControlObject(div, 'btnReserveMT').on('click', function () {
            //    if ($(this).jqxButton('disabled')) { return; }

            //});
            ////拆機順裝
            //getControlObject(div, 'btnReservePR').on('click', function () {
            //    if ($(this).jqxButton('disabled')) { return; }

            //});
            //維/拆順裝
            //getControlObject(div, 'tReserveMTPR').on('click', function () {
            //    if ($(this).jqxButton('disabled')) { return; }

            //});
            //預約明細
            getControlObject(div, 'btnReserve2').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (mustHasProduct(div) != true) { return; }
                showReserve2(div, function (r) { });
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    function addHandler(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'tReserveMTPR').on('click', function (event) {
                try {
                    if (getControlObject(div, 'dgReserveMTPR').css('display') != 'none') {
                        return false;
                    }
                }
                catch (err) {
                    errorHandle(formName, 'tReserveMTPR_click', err);
                }
            });
            getControlObject(div, 'dgReserveMTPR').on('rowdoubleclick', function (event) {
                try {
                    var args = event.args;
                    var row = $(this).jqxGrid('getrowdata', args.rowindex);
                    options.resvTime = row['resvTime'.toUpperCase()];
                    options.groupNo = row['MCode'.toUpperCase()];
                    if (row['WORKERTYPE'] == "M") {
                        options.resvType = 1;
                    }
                    else {
                        options.resvType = 2;
                    }
                    options.resvSNo = row['SNO'];
                    options.workServCode = row['WORKSERVCODE'];
                    options.groupCode = row['groupCode'.toUpperCase()];
                    getControlObject(div, 'dtResvTime').csDateTime('setText', formatDateTime(row['resvTime'.toUpperCase()], 'datetime'));
                    getControlObject(div, 'tReserveMTPR').jqxDropDownButton('close');
                }
                catch (err) {
                    errorHandle(formName, 'dgReserveMTPR_rowselect', err);
                }
            });
            getControlObject(div, 'tReserveMTPR').on('open', function () {
                try {
                    var o = getRowByKeyValue(options.controls, 'name', $(this).prop('id'));
                    renderReserveMTPRGrid(div, o.level + 1);
                    refreshReserveMTPRGrid(div);
                    getControlObject(div, 'dgReserveMTPR').prop('style').removeProperty('display');;
                    var args = {
                        dropDown: getControlObject(div, 'tReserveMTPR')[0],
                        grid: getControlObject(div, 'dgReserveMTPR')[0]
                    };
                    $(document).on('click', args, closeDropDownMenu);
                }
                catch (err) {
                    errorHandle(formName, 'addHandler_tReserveMTPR_open', err);
                }
            });
            getControlObject(div, 'tReserveMTPR').on('close', function () {
                try {
                    getControlObject(div, 'dgReserveMTPR').css('display', 'none');
                    $(document).off('click', closeDropDownMenu);
                }
                catch (err) {
                    errorHandle(formName, 'addHandler_tReserveMTPR_close', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'addHandler', err);
        }
    };
    function refreshReserveMTPRGrid(div) {
        try {
            var options = $.data(div, formName).options;
            var grids = ["dgReserveMTPR"];
            var sources = ["reserveMTPRSource"];
            var tables = [canResvTableName];
            for (var i = 0; i < grids.length; i++) {
                options[sources[i]].localdata = options[tables[i]].rows;
                getControlObject(div, grids[i]).jqxGrid('updatebounddata');
                //if (options[sources[i]].localdata.length > 0) {
                //    getControlObject(div, grids[i]).jqxGrid('selectrow', 0);
                //}
            }
        }
        catch (err) {
            errorHandle(formName, 'refreshReserveMTPRGrid', err);
        }
    }
    function renderReserveMTPRGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            if (options.reserveMTPRRender == true) return;
            options.reserveMTPRRender = true;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgReserveMTPR';
            options.reserveMTPRSource = {
                datatype: "json",
                datafields: [
                    { name: 'WORKERTYPE', type: 'string' },
                    { name: 'SNO', type: 'string' },
                    { name: 'WORKCODE', type: 'string' },
                    { name: 'WORKNAME', type: 'string' },
                    { name: 'ACCEPTTIME', type: 'date' },
                    { name: 'RESVTIME', type: 'date' },
                    { name: 'WORKEREN1', type: 'string' },
                    { name: 'WORKERNAME1', type: 'string' },
                    { name: 'WORKEREN2', type: 'string' },
                    { name: 'WORKERNAME2', type: 'string' },
                    { name: 'MCODE', type: 'integer' },
                    { name: 'MNAME', type: 'string' },
                    { name: 'WORKSERVCODE', type: 'string' },
                    { name: 'GROUPCODE', type: 'string' },
                ]
            };

            var dataAdapter = new $.jqx.dataAdapter(options.reserveMTPRSource);
            $('#' + gridId).jqxGrid(
            {
                width: 800,
                height: 250,
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                editable: false,
                columns: [
                  { text: lang.dgReserveMTPR_WORKERTYPE, datafield: 'WORKERTYPE', width: 40 },
                  { text: lang.dgReserveMTPR_SNO, datafield: 'SNO', width: 110 },
                  { text: lang.dgReserveMTPR_WORKCODE, datafield: 'WORKCODE', width: 60 },
                  { text: lang.dgReserveMTPR_WORKNAME, datafield: 'WORKNAME', width: 90 },
                  { text: lang.dgReserveMTPR_ACCEPTTIME, datafield: 'ACCEPTTIME', width: 80, cellsformat: 'yyyy/MM/dd' },
                  { text: lang.dgReserveMTPR_RESVTIME, datafield: 'RESVTIME', width: 80, cellsformat: 'yyyy/MM/dd' },
                  { text: lang.dgReserveMTPR_WORKEREN1, datafield: 'WORKEREN1', width: 80 },
                  { text: lang.dgReserveMTPR_WORKERNAME1, datafield: 'WORKERNAME1', width: 100 },
                  { text: lang.dgReserveMTPR_WORKEREN2, datafield: 'WORKEREN2', width: 80 },
                  { text: lang.dgReserveMTPR_WORKERNAME2, datafield: 'WORKERNAME2', width: 100 },
                  { text: lang.dgReserveMTPR_MNAME, datafield: 'MNAME', width: 60 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderReserveMTPRGrid', err);
        }
    };
    function closeDropDownMenu(args) {
        try {
            //args.target: click object
            //args.data: dropdownbutton open
            var hasChild = function (el) {
                //if ($(el) == $(args.target)) {
                if (el == args.target) {
                    return true;
                }
                else {
                    var child = $(el).children();
                    for (var i = 0; i < child.length; i++) {
                        var flag = hasChild(child[i]);
                        if (flag == true) {
                            return true;
                        }
                    }
                }
                return false;
            }
            if (hasChild(args.data.grid) == false) {
                $(args.data.dropDown).jqxDropDownButton('close');
            }
            //var oo = $(document.activeElement).children(0);
            //if (oo.length > 0) {
            //    if (oo[0]['id'].length > 0 && oo[0]['id'].indexOf('dropDownButton') !== 0) {
            //        $(args.data).jqxDropDownButton('close');
            //    } else {
            //        if (oo[0]['id'].indexOf(args.data.id) < 0) {
            //            $(args.data).jqxDropDownButton('close');
            //        }
            //    }
            //} else {
            //    $(args.data).jqxDropDownButton('close');
            //}
        }
        catch (err) {
            errorHandle(formName, 'closeDropDownMenu', err);
        }
    };

})(jQuery);