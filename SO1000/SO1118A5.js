(function ($) {
    var formName = 'SO1118A5';
    var riadllName = 'CableSoft.SO.RIA.Wip.CallOk.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.CallOk.Web.CallOk';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 28;
    var returnCodeTableName = "ALL";
    var canChooseWipTableName = "CanChooseWip";
    var callOkTableName = "CallOK";
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
                        options: $.extend({}, new defaults(), new SO1118A5(), options)
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
        getData: function (jq) {
            return getData(jq[0]);
        },
        enableReturnCode: function (jq, params) {
            return enableReturnCode(jq[0], params);
        },
        isDataOk: function (jq) {
            return isDataOk(jq[0]);
        },
        getExecuteTable: function (jq) {
            return getExecuteTable(jq[0]);
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
        this.mustBeControls = [];
        this.defRefNo = null;//#7837 2018.07.10 前端呼叫傳入預設參考號
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
                //$($(div).find('[data-id=codeno]')[0])
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
            deleteJSONObject(options);
            //options.length = 0;
            //options = null;
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
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            $(div).triggerHandler('loaded');
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });
            //$.ajax({
            //    url: 'SO1000\\' + formName + '.html',
            //    type: "get",
            //    datatype: 'html',
            //    success: function (msg) {
            //        try {
            //            $(div).html(msg);
            //            changeElementId(div);
            //            init(div, function () {
            //                $(div).triggerHandler('loaded');
            //            });
            //        }
            //        catch (err) {
            //            errorHandle(formName, 'formLoaded_success', err);
            //        }
            //    },
            //    error: function (xhr, ajaxOptions, thrownError) {
            //        var param = options;
            //        if (param['loadError']) {
            //            param['loadError'](xhr, ajaxOptions, thrownError);
            //        }
            //        else {
            //            messageBox('error status:' + xhr.status + ', thrownError:' + thrownError, messageType.critical);
            //        }
            //    }
            //});
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function enableReturnCode(div, data) {
        try {
            var options = $.data(div, formName).options;
            options.initData = data;
            enableList(div);
        }
        catch (err) {
            errorHandle(formName, 'enableReturnCode', err);
        }
    }
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div, formName);
            renderControl(div);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            formResize(div);
            var initProcess = function () {
                initList(div);
                enableList(div);
                listAddHandler(div);
                defaultValue(div);
                action(true);
            }
            if (options.initData == null) {
                var parameters = options.parameters;
                if (parameters != null && Object.keys(parameters).length > 0) {
                    if (options.custId == null) {
                        options.custId = parameters[callOkTableName].rows[0]['custId'.toUpperCase()];
                    }
                    if (options.orderNo == null) {
                        options.orderNo = parameters[callOkTableName].rows[0]['orderNo'.toUpperCase()];
                    }
                }
                getReturnCode(div, function (r) {
                    initProcess();
                });
            }
            else {
                initProcess();
            }
        }
        catch (err) {
            errorHandle(formName, 'init', err);
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
            $(div).css('padding', 2);
            $(div).css('overflow', 'hidden');
            //建立jqxPanel
            oArray = ["gbxData"];
            var oHightArray = ["100%"];
            var oWidthArray = ["100%"];
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
            }
            level += 1;
            //建立日期元件
            oArray = ["dtSignDate"];
            oWidthArray = ["15%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var fs = "yyyy/MM/dd";
                $('#' + iId).csDateTime({
                    theme: options.theme,
                    formatString: fs,
                    showCalendarButton: true,//2018.07.20 增加可以選日歷
                    value: null,
                    height: textHeight - 2,
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csDateTime', level: level });
            }
            //建立單選元件
            oArray = ["csReturnCode", "csReturnDescCode",
                    "csReturnCodeC", "csReturnDescCodeC",
                    "csReturnCodeD", "csReturnDescCodeD",
                    "csReturnCodeI", "csReturnDescCodeI",
                    "csReturnCodeP", "csReturnDescCodeP"];
            oWidthArray = ["240", "240",
                    "240", "240",
                    "240", "240",
                    "240", "240",
                    "240", "240"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var disabled = false;
                if (!(oArray[i] == 'csReturnCode' || oArray[i] == 'csReturnDescCode')) {
                    disabled = true;
                }
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 80,
                    disabled: disabled,
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csList', level: level });
            }
            level += 1;
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function enableList(div) {
        try {
            var options = $.data(div, formName).options;
            var csArrays = ["C", "D", "I", "P"];
            for (var i = 0 ; i < csArrays.length; i++) {
                var o1 = getControlObject(div, 'csReturnCode' + csArrays[i]);
                var o2 = getControlObject(div, 'csReturnDescCode' + csArrays[i]);
                o1.csList('clearDisplayValue');
                o1.csList('disabled', true);
                o2.csList('clearDisplayValue');
                o2.csList('disabled', true);
                getControlObject(div, 'lReturnCode' + csArrays[i]).prop('style').removeProperty('color');
            }
            deleteJSONObject(options.mustBeControls);
            options.mustBeControls = [];

            if (options.initData[canChooseWipTableName] == null) return;
            
            //#8156 2019.03.04 by Corey 增加該功能，如果切換退單原因代碼，需要連動下面還沒選的"其他服務別"的退單原因代碼檔
            var value1 = getControlObject(div, 'csReturnCode').csList('codeNo');
            var value2 = getControlObject(div, 'csReturnDescCode').csList('codeNo');
            
            var rows = options.initData[canChooseWipTableName].rows;
            var rLength = rows.length;
            //判斷工單服務別功能，並且將該服務別選項變成紅色。讓必選元件顯著。
            for (var i = 0 ; i < rLength; i++) {
                var wipServiceType = rows[i]['serviceType'.toUpperCase()];
                var o1 = getControlObject(div, 'csReturnCode' + wipServiceType);
                var o2 = getControlObject(div, 'csReturnDescCode' + wipServiceType);
                o1.csList('disabled', false);
                o2.csList('disabled', false);
                getControlObject(div, 'lReturnCode' + wipServiceType).css('color', 'red');
                options.mustBeControls.push(wipServiceType);
                if (value1 != null) {
                    //#8156 2019.03.04 by Corey 增加判斷填寫預設的代碼。
                    o1.csList('codeNo', value1);
                }
                if (value2 != null) {
                    //#8156 2019.03.04 by Corey 增加判斷填寫預設的代碼。
                    o2.csList('codeNo', value2);
                }

                //#7837 2018.07.10 增加判斷 defRefNo 如果有傳資料進來，需要預設第一個選項。
                if (options.defRefNo != null) {
                    //#7837 2017.07.13 增加填寫主要退單原因
                    if (options.initData["ALL"].rows.length > 0) {
                        getControlObject(div, 'csReturnCode').csList('selectedIndex', 0);
                    }
                    //#7837 2018.07.13 增加判斷退單原因對應的Table，沒有值就不要DEFAULT第一筆資料
                    var retTableName = "";
                    if (wipServiceType == "C") { retTableName = "CATV"; }
                    if (wipServiceType == "D") { retTableName = "DTV"; }
                    if (wipServiceType == "I") { retTableName = "CM"; }
                    if (wipServiceType == "P") { retTableName = "CP"; }
                    if (options.initData[retTableName].rows.length > 0) { o1.csList('selectedIndex', 0); }
                    //o2.csList('selectedIndex', 0);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'enableList', err);
        }
    }
    function initList(div) {
        try {
            var options = $.data(div, formName).options;
            var csArrays = ["csReturnCode", "csReturnDescCode",
                    "csReturnCodeC", "csReturnDescCodeC",
                    "csReturnCodeD", "csReturnDescCodeD",
                    "csReturnCodeI", "csReturnDescCodeI",
                    "csReturnCodeP", "csReturnDescCodeP"];
            var tableArrays = ["ALL", "ALL_DESC",
                    "CATV", "CATV_DESC",
                    "DTV", "DTV_DESC",
                    "CM", "CM_DESC",
                    "CP", "CP_DESC"];
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
        try{
            getControlObject(div, 'csReturnCode').on('selectedIndexChanged', function () {
            //#8156 2019.03.04 by Corey 增加該功能，如果切換退單原因代碼，需要連動下面還沒選的"其他服務別"的退單原因代碼檔
                try {
                    var options = $.data(div, formName).options;
                    if (options.initData[canChooseWipTableName] == null) return;
                    var value = $(this).csList('codeNo');

                    var rows = options.initData[canChooseWipTableName].rows;
                    var rLength = rows.length;
                    for (var i = 0 ; i < rLength; i++) {
                        var wipServiceType = rows[i]['serviceType'.toUpperCase()];
                        var o1 = getControlObject(div, 'csReturnCode' + wipServiceType);
                        o1.csList('disabled', false);
                        var o1v = o1.csList('codeNo');
                        if (o1v != null) { o1.csList('codeNo', value); };
                    }
                }
                catch (err) {
                    errorHandle(formName, 'csReturnCode_selectedIndexChanged', err);
                }
            })
            getControlObject(div, 'csReturnDescCode').on('selectedIndexChanged', function () {
            //#8156 2019.03.04 by Corey 增加該功能，如果切換退單原因代碼，需要連動下面還沒選的"其他服務別"的退單原因代碼檔
                try {
                    var options = $.data(div, formName).options;
                    if (options.initData[canChooseWipTableName] == null) return;
                    var value = $(this).csList('codeNo');

                    var rows = options.initData[canChooseWipTableName].rows;
                    var rLength = rows.length;
                    for (var i = 0 ; i < rLength; i++) {
                        var wipServiceType = rows[i]['serviceType'.toUpperCase()];
                        var o1 = getControlObject(div, 'csReturnDescCode' + wipServiceType);
                        o1.csList('disabled', false);
                        var o1v = o1.csList('codeNo');
                        if (o1v != null) { o1.csList('codeNo', value); };
                    }
                }
                catch (err) {
                    errorHandle(formName, 'csReturnCode_selectedIndexChanged', err);
                }
            })
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    }


    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            var n = new Date();
            getControlObject(div, 'dtSignDate').csDateTime('setText', formatDateTime(n, 'datetime'));
            return true;
        }
        catch (err) {
            errorHandle(formName, 'defaultValue', err);
        }
    }
    function getReturnCode(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: options.custId },
                orderNo: { type: 'string', value: convertToNull(options.orderNo) },
                defRefNo: { type: 'string', value: convertToNull(options.defRefNo) } //#7837 2018.07.10 增加傳入
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetReturnCode2',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    //messageBox(JSON.stringify(data));
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
            errorHandle(formName, 'getChannelReOpenData', err);
        }
    };
    function getExecuteTable(div) {
        try {
            if (isDataOk(div) == false) return;
            var options = $.data(div, formName).options;

            var colArray = ["COLNAME", "FINTIME", "RETURNCODE", "RETURNNAME",
                            "RETURNDESCCODE", "RETURNDESCNAME"];
            var oLength = colArray.length;
            var columns = [];
            for (var i = 0 ; i < oLength; i++) {
                columns.push({ name: colArray[i], type: 'string' });
            }
            var data = getData(div);
            var rows = [{
                COLNAME: 'FinTime', FINTIME: data['signDate'.toUpperCase()], RETURNCODE: data['returnCode'.toUpperCase()], RETURNNAME: data['returnName'.toUpperCase()],
                RETURNDESCCODE: data['returnDescCode'.toUpperCase()], RETURNDESCNAME: data['returnDescName'.toUpperCase()]
            }];
            if (options.refNo == 4) {
                var serviceTypes = ['C', 'D', 'I', 'P'];
                var serviceTypeNames = ['CATV', 'DVS', 'CM', 'CP'];
                for (var i = 0; i < serviceTypes.length; i++) {
                    rows.push({
                        COLNAME: serviceTypeNames[i], RETURNCODE: data["returnCode".toUpperCase() + serviceTypes[i]], RETURNNAME: data["returnName".toUpperCase() + serviceTypes[i]],
                        FINTIME: data['signDate'.toUpperCase()],
                        RETURNDESCCODE: data["returnDescCode".toUpperCase() + serviceTypes[i]], RETURNDESCNAME: data["returnDescName".toUpperCase() + serviceTypes[i]]
                    });
                }
            }
            return { ExtraTable: { columns: columns, rows: rows } };
        }
        catch (err) {
            errorHandle(formName, 'getExecuteTable', err);
        }
    }
    function getData(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if (isDataOk(div) == false) return;
            var data = {};
            data['signDate'.toUpperCase()] = getControlObject(div, 'dtSignDate').csDateTime('getDate');
            data['shouldReg'.toUpperCase()] = true;

            data['returnCode'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnCode').csList('codeNo'));
            data['returnName'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnCode').csList('description'));

            data['returnCodeC'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnCodeC').csList('codeNo'));
            data['returnNameC'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnCodeC').csList('description'));

            data['returnCodeD'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnCodeD').csList('codeNo'));
            data['returnNameD'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnCodeD').csList('description'));

            data['returnCodeI'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnCodeI').csList('codeNo'));
            data['returnNameI'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnCodeI').csList('description'));

            data['returnCodeP'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnCodeP').csList('codeNo'));
            data['returnNameP'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnCodeP').csList('description'));

            data['ReturnDescCode'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnDescCode').csList('codeNo'));
            data['ReturnDescName'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnDescCode').csList('description'));

            data['ReturnDescCodeC'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnDescCodeC').csList('codeNo'));
            data['ReturnDescNameC'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnDescCodeC').csList('description'));

            data['ReturnDescCodeD'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnDescCodeD').csList('codeNo'));
            data['ReturnDescNameD'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnDescCodeD').csList('description'));

            data['ReturnDescCodeI'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnDescCodeI').csList('codeNo'));
            data['ReturnDescNameI'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnDescCodeI').csList('description'));

            data['ReturnDescCodeP'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnDescCodeP').csList('codeNo'));
            data['ReturnDescNameP'.toUpperCase()] = convertToNull(getControlObject(div, 'csReturnDescCodeP').csList('description'));
            return data;
        }
        catch (err) {
            errorHandle(formName, 'getData', err);
        }
    }
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if (checkUIMustBe(getControlObject(div, 'csReturnCode').csList('codeNo'), lang['lReturnCode'], function () {
                    getControlObject(div, 'csReturnCode').csList('focus');
            }) == false) {
                return false;
            }
            var oLength = options.mustBeControls.length;
            for (var i = 0 ; i < oLength; i++) {
                var serviceType = options.mustBeControls[i];
                if (checkUIMustBe(getControlObject(div, 'csReturnCode' + serviceType).csList('codeNo'), lang['lReturnCode' + serviceType], function () {
                    getControlObject(div, 'csReturnCode' + serviceType).csList('focus');
                }) == false) {
                    return false;
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    };
})(jQuery);