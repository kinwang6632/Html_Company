(function ($) {
    var formName = 'SO1118A';
    var riadllName = 'CableSoft.SO.RIA.Wip.CallOk.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.CallOk.Web.CallOk';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 28; 
    var callOkHeight = 32;
    var finishHeight = 145;
    var callOkTableName = "CallOK";
    var orderTableName = "Order";
    var realTableName = "";
    var canChooseWipTableName = "CanChooseWip";
    var allFacilityWipTableName = "AllFacility";
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
                        options: $.extend({}, new defaults(), new SO1118A(), options)
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
        canEdit: function (jq, params, param2) {
            return canEdit(params, param2);
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
        this.isOrder = false;
        this.orderNo = null;
        this.childLoaded = [];
        this.isSaved = false;
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
            var sHeight = $(div).height() - buttonsHeight - 3;
            getControlObject(div, 'gbxAll').jqxSplitter({ height: sHeight });
            getControlObject(div, 'master')['SO1118A1']('resize');
            getControlObject(div, 'detail1')[options.detailName]('resize');
            getControlObject(div, 'detail2').css({ height: sHeight - getControlObject(div, 'detail1').height() - 8 });
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
                            frmAddHandler(div);
                            buttonAddHandler(div);
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
            //                frmAddHandler(div);
            //                buttonAddHandler(div);
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
            //$(div).on('focusin', function () {
            //    $(div).triggerHandler('focusin');
            //});
        }
        catch (err) {
            errorHandle(formName, 'frmAddHandler', err);
        }
    };
    function canEdit(params, action) {
        try {
            var checkPara = checkParameters(editMode.view, params);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                action([true]);
            }
        }
        catch (err) {
            errorHandle(formName, 'canEdit', err);
        }
    };
    //檢核參數是否正確
    function checkParameters(em, data) {
        try {
            //檢核table 存不存在
            var table = data[callOkTableName];
            if (table == null) return ([false, 'table ' + callOkTableName + ' not exist!!']);
            //檢核欄位存不存在
            //新增檢核客戶編號
            if (table.rows[0]['CustId'.toUpperCase()] == null) {
                return ([false, 'column custId not exist!!']);
            }
            return ([true]);
        }
        catch (err) {
            errorHandle(formName, 'checkParameters', err);
        }
    };
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div, formName);
            if (options.isOrder == true) {
                realTableName = orderTableName;
            }
            else {
                realTableName = callOkTableName;
            }
            options.custId = options.parameters[realTableName].rows[0]['custId'.toUpperCase()];
            if (options.isOrder == true) {
                options.orderNo = options.parameters[realTableName].rows[0]['orderNo'.toUpperCase()];
            }
            renderControl(div, function () {
                $(options.container).on('resize', function () {
                    formResize(div);
                });
                formResize(div);
                getInitData(div, function (r) {
                    if (r[0]) {
                        addHandler(div);
                        defaultValue(div);
                        action(true);
                    }
                    else if (r[1] != null) {
                        messageBox(r[1]);
                        action(false);
                    }
                });
            });
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'master')['SO1118A1']({
                custId: options.parameters[realTableName].rows[0]['custId'.toUpperCase()],
                orderNo: options.orderNo
            });
            getControlObject(div, 'master')['SO1118A1']('refreshGrid', options.initData, true);

            getControlObject(div, 'detail1')[options.detailName]({
                custId: options.parameters[realTableName].rows[0]['custId'.toUpperCase()],
                orderNo: options.orderNo,
                initData: options.initData,
                canChooseWipData: options.initData
            });
            if (options.refNo == 3) {
                getControlObject(div, 'detail1')[options.detailName]('setSignDate');
            }
            var d2Options = {
                custId: options.parameters[realTableName].rows[0]['custId'.toUpperCase()],
                orderNo: options.orderNo
            };
            getControlObject(div, 'detail2')['SO1118A12'](d2Options);
            if (options.orderNo != null && options.initData[canChooseWipTableName] != null) {
                var tInitData = {};
                tInitData[canChooseWipTableName] = cloneJSON(options.initData[canChooseWipTableName]);
                getControlObject(div, 'detail2')['SO1118A12']('refreshGrid', tInitData);
            }

            return true;
        }
        catch (err) {
            errorHandle(formName, 'defaultValue', err);
        }
    }
    function triggerLoaded(div, action) {
        try {
            var options = $.data(div, formName).options;
            var oLength = options.childLoaded.length;
            for (var i = 0; i < oLength; i++) {
                if (options.childLoaded[i] == false) {
                    return;
                }
            }
            options.childLoaded.length = 0;
            action(true);
        }
        catch (err) {
            errorHandle(formName, 'triggerLoaded', err);
        }
    };
    function renderControl(div, action) {
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
            //建立Splitter
            oArray = ["gbxAll"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxSplitter({
                    theme: options.theme,
                    height: $(div).height() - buttonsHeight - 2,
                    width: '100%',
                    panels: [{ size: 210 }, { size: $(div).width() - 214 }]
                });
                controls.push({ name: iId, type: 'jqxSplitter', level: level });
                $($('#' + iId).children()[0]).css('overflow', 'auto');
            }
            level += 1;
            oArray = ["master", "detail1", "detail2"];
            oLength = oArray.length;
            for (var i = 0; i < oLength; i++) {
                options.childLoaded[i] = false;
                getControlObject(div, oArray[i]).on('loaded', { idx: i }, function (e) {
                    var args = e.data;
                    options.childLoaded[args.idx] = true;
                    triggerLoaded(div, action);
                });
            }
            level += 1;

            //過濾條件
            getControlObject(div, 'master')['SO1118A1']($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: $(div),
                orderNo: options.orderNo,
                initData: options.initData,
                parameters: options.parameters,
                refNo: options.refNo,
                theme: options.theme,
                localization: options.localization
            }));
            controls.push({ name: $(div).prop('id') + "master", type: 'SO1118A1', level: level });
            level += 1;

            var detailName;
            var height1;
            switch (options.refNo) {
                case 2: //取消線上回報
                    detailName = 'SO1118A3';
                    height1 = 0;
                    break;
                case 3: //完工
                    detailName = 'SO1118A4';
                    height1 = finishHeight;
                    break;
                case 4: //退單
                    detailName = 'SO1118A5';
                    height1 = 180;
                    break;
                default: //線上回報
                    detailName = 'SO1118A2';
                    height1 = callOkHeight;
                    break;
            }
            options.detailName = detailName;
            getControlObject(div, 'detail1').css({ height: height1 });
            getControlObject(div, 'detail2').css({ height: getControlObject(div, 'gbxAll').height() - height1 - 4 });

            var detail1Id = $(div).prop('id') + "detail1";
            //子Form
            getControlObject(div, 'detail1')[detailName]($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: $(div),
                orderNo: options.orderNo,
                //parameters: options.initData,
                refNo: options.refNo,
                theme: options.theme,
                localization: options.localization
            }));
            controls.push({ name: detail1Id, type: detailName, level: level });
            level += 1;

            //Grid
            getControlObject(div, 'detail2')['SO1118A12']($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: $(div),
                orderNo: options.orderNo,
                parameters: options.initData,
                refNo: options.refNo,
                theme: options.theme,
                detailId: detail1Id,
                detailName: detailName,
                localization: options.localization
            }));
            controls.push({ name: $(div).prop('id') + "detail2", type: 'SO1118A12', level: level });
            level += 1;

            //建立按鈕
            oArray = ['btnOk', 'btnExit'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var text = lang[oArray[i]];
                switch (oArray[i]) {
                    case "btnOk":
                        img = imageScr.save;
                        break;
                    case "btnExit":
                        img = imageScr.exit;
                        break;
                }
                o.text(text);
                var bOptions = $.extend({}, {
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                }, img, imagePosition);
                o.jqxButton(bOptions);
                controls.push({ name: bId, type: 'jqxButton', level: level });
                getControlObject(div, oArray[i]).find('img').css({ top: 1 });
            }
            level += 1;

            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function getInitData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var groupType = getControlObject(div, 'master')['SO1118A1']('getType');
            var custId = options.custId;
            var orderNo = options.orderNo;
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                orderNo: { type: 'string', value: convertToNull(orderNo) },
                refType: { type: 'integer', value: options.refNo },
                groupType: { type: 'integer', value: groupType }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetInitData',
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
            errorHandle(formName, 'getInitData', err);
        }
    };
    function getCanChooseWipData(div, chooseData, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var groupType = getControlObject(div, 'master')['SO1118A1']('getType');
            var custId = options.parameters[realTableName].rows[0]['custId'.toUpperCase()];
            var orderNo = options.orderNo;
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                orderNo: { type: 'string', value: convertToNull(orderNo) },
                refType: { type: 'integer', value: options.refNo },
                groupType: { type: 'integer', value: groupType },
                chooseData: { type: 'string', value: JSON.stringify(chooseData) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetCanChooseWipData',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    //messageBox(JSON.stringify(data));
                    if (data.ResultBoolean == true) {
                        delete options.canChooseWipData;
                        options.canChooseWipData = JSON.parse(data.ResultXML);
                        action([true]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getCanChooseWipData', err);
        }
    };
    function addHandler(div) {
        var options = $.data(div, formName).options;
        getControlObject(div, 'master').on('chooseOk', function (e) {
            try {
                var args = e.args;
                var chooseTable = args.chooseTable;
                if (chooseTable == null || chooseTable[Object.keys(chooseTable)[0]].rows == null || chooseTable[Object.keys(chooseTable)[0]].rows.length == 0) {
                    getControlObject(div, 'detail2')['SO1118A12']('refreshGrid', null);
                    getControlObject(div, 'detail1')[options.detailName]('clear');
                    switch (options.refNo) {
                        case 1:
                            changeDetailHeight(div, callOkHeight);
                            break;
                    }
                }
                else {
                    getCanChooseWipData(div, chooseTable, function (r) {
                        if (r[0]) {
                            getControlObject(div, 'detail1')[options.detailName]({ canChooseWipData: options.canChooseWipData });
                            getControlObject(div, 'detail2')['SO1118A12']('refreshGrid', options.canChooseWipData);
                        }
                        else if (r[1] != null) {
                            messageBox(r[1]);
                        }
                    });
                }
            }
            catch (err) {
                errorHandle(formName, 'addHandler_master_chooseOk', err);
            }
        });
        getControlObject(div, 'detail2').on('chooseOk', function (e) {
            try {
                var args = e.args;
                var chooseTable = args.chooseTable;
                switch (options.refNo) {
                    case 3: //完工
                        getControlObject(div, 'detail1')[options.detailName]('enableSatiAndMfCode', chooseTable);
                    case 4: //退單
                        getControlObject(div, 'detail1')[options.detailName]('enableReturnCode', chooseTable);
                        break;
                    case 1: //線上回報
                        //var height = 0;
                        //for (var i = 0; i < chooseTable[canChooseWipTableName].rows.length; i++) {
                        //    var cRow = chooseTable[canChooseWipTableName].rows[i];
                        //    var row = getRowByKeyValue(options.canChooseWipData[allFacilityWipTableName].rows, "SNO", cRow["SNO"]);
                        //    if (row != null) {
                        //        height += buttonsHeight + 2;
                        //    }
                        //}
                        var height = getControlObject(div, 'detail1')[options.detailName]('refreshForm', chooseTable);
                        changeDetailHeight(div, callOkHeight + height);
                        break;
                }
            }
            catch (err) {
                errorHandle(formName, 'addHandler_detail2_chooseOk', err);
            }
        });
        getControlObject(div, 'detail1').on('chooseOk', function (e) {
            try {
                if (isDataOk(div) != true) return;
                getControlObject(div, 'detail1')[options.detailName]('setChooseOk');
            }
            catch (err) {
                errorHandle(formName, 'addHandler_detail1_chooseOk', err);
            }
        });
    };
    function changeDetailHeight(div, detail1Height) {
        getControlObject(div, 'detail1').css({ height: detail1Height });
        formResize(div);
    }
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            if (getControlObject(div, 'detail2')['SO1118A12']('isDataOk') != true) return false;
            if (options.refNo != 2) {
                if (getControlObject(div, 'detail1')[options.detailName]('isDataOk') != true) return false;
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
            var lang = options.language;
            //存檔
            getControlObject(div, 'btnOk').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (isDataOk(div) != true) return;
                var workName = "";
                var rFunc = function (r) {
                    if (r[0]) {
                        options.isSaved = true;
                        messageBox(workName+lang.runOK, messageType.constructor, null, function (flag) {
                            close(div);
                        });
                    }
                    else if (r[1] != null) {
                        messageBox(r[1]);
                    }
                }
                switch (options.refNo) {
                    case 1:     //線上回報
                        workName = lang.workName1
                        checkAndSave(div, rFunc);
                        break;
                    case 2:     //取消線上回報
                        workName = lang.workName2
                        checkAndSave(div, rFunc);
                        break;
                    case 3:     //完工
                        workName = lang.workName3
                        saveCloseWip(div, rFunc);
                        break;
                    case 4:     //退單
                        workName = lang.workName4
                        saveCloseWip(div, rFunc);
                        break;
                }
            });
            getControlObject(div, 'btnExit').on('click', function () {
                close(div);
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    function checkAndSave(div, action) {
        try {
            var options = $.data(div, formName).options;
            var inData = {};
            var wip = getControlObject(div, 'detail2')['SO1118A12']('getSelectedRows');
            inData["Wip"] = wip[Object.keys(wip)[0]];
            var para = getControlObject(div, "detail1")[options.detailName]("getData");
            $.extend(inData, para);
            var timeout = 300 * inData["Wip"].rows.length;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                inData: { type: 'string', value: JSON.stringify(inData) },
                WorkType: { type: 'integer', value: options.refNo }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'CheckAndSave',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        action([true]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            }, timeout);
        }
        catch (err) {
            errorHandle(formName, 'checkAndSave', err);
        }
    };
    function getExecuteTable(div) {
        try {
            var options = $.data(div, formName).options;
            var colArray = ["COLNAME", "FINTIME",
                            "RETURNCODE", "RETURNNAME",
                            "RETURNDESCCODE", "RETURNDESCNAME",
                            "SATICODE", "SATINAME",
                            "MFCODE1", "MFNAME1",
                            "MFCODE2", "MFNAME2"];
            var oLength = colArray.length;
            var columns = [];
            for (var i = 0 ; i < oLength; i++) {
                columns.push({ name: colArray[i], type: 'string' });
            }
            var data = getControlObject(div, 'detail1')[options.detailName]('getData');
            var rows = [];
            var row1 = {};
            var finTime = null;
            var returnCode = null;
            var returnName = null;
            var returnDescCode = null;
            var returnDescName = null;
            switch (options.refNo) {
                case 1:     //線上回報
                    finTime = formatDateTime(data['CALLOKTIME'], 'datetime');
                    break;
                case 3:     //完工
                    finTime = formatDateTime(data['FINTIME'], 'datetime');
                    break;
                case 4:
                    returnCode = data['returnCode'.toUpperCase()];
                    returnName = data['returnName'.toUpperCase()];
                    returnDescCode = data['returnDescCode'.toUpperCase()];
                    returnDescName = data['returnDescName'.toUpperCase()];
            }
            row1 = {
                COLNAME: 'FinTime',
                FINTIME: finTime,
                RETURNCODE: returnCode,
                RETURNNAME: returnName,
                RETURNDESCCODE: returnDescCode,
                RETURNDESCNAME: returnDescName
            }
            rows.push(row1);
            if (options.refNo == 3) {
                let svcTyp = ['C', 'D', 'I', 'P'];
                let svcNam = ['CATV', 'DVS', 'CM', 'CP'];
                for (let i = 0; i < svcTyp.length; i++) {
                    rows.push({
                        COLNAME: svcNam[i],
                        RETURNCODE: null, RETURNNAME: null, RETURNDESCCODE: null, RETURNDESCNAME: null,
                        SATICODE: data["satiCode".toUpperCase() + svcTyp[i]],
                        SATINAME: data["satiDesc".toUpperCase() + svcTyp[i]],
                        MFCODE1: data["mfCode1".toUpperCase() + svcTyp[i]],
                        MFNAME1: data["mfDesc1".toUpperCase() + svcTyp[i]],
                        MFCODE2: data["mfCode2".toUpperCase() + svcTyp[i]],
                        MFNAME2: data["mfDesc2".toUpperCase() + svcTyp[i]]
                    });
                }
            }
            if (options.refNo == 4) {
                var serviceTypes = ['C', 'D', 'I', 'P'];
                var serviceTypeNames = ['CATV', 'DVS', 'CM', 'CP'];
                for (var i = 0; i < serviceTypes.length; i++) {
                    rows.push({
                        COLNAME: serviceTypeNames[i],
                        RETURNCODE: data["returnCode".toUpperCase() + serviceTypes[i]],
                        RETURNNAME: data["returnName".toUpperCase() + serviceTypes[i]],
                        RETURNDESCCODE: data["returnDescCode".toUpperCase() + serviceTypes[i]],
                        RETURNDESCNAME: data["returnDescName".toUpperCase() + serviceTypes[i]],
                        SATICODE: null, SATINAME: null, MFCODE1: null, MFNAME1: null, MFCODE2: null, MFNAME2: null
                    });
                }
            }
            return { ExtraTable: { columns: columns, rows: rows } };
        }
        catch (err) {
            errorHandle(formName, 'getExecuteTable', err);
        }
    }

    //呼叫結清功能 (原問題集#7389 開發的，因為需求又修改該功能目前不使用。)
    function showClearCitem(div, allSNO, action) {
        try {
            var options = $.data(div, formName).options;
            var width = options.container.width();
            var height = $(div).height();
            var objectName = "SO1132B";
            var x = ($(options.container).width() - width) / 2;
            var y = 26
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                hasClosing: false,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language["ClearSystem"], winOptions);
            //2017.12.29 Miggie 那邊說明要增加傳 DataSet裡面要有個 DataTableName=ChargeClose，需要有個欄位 Custid，一定要有客編資料。 
            //var inData = {};
            var inData = {
                ChargeClose: {
                    columns: [{ name: 'CUSTID', type: 'integer' }
                    ],
                    rows: [{
                        CUSTID: options.custId
                    }]
                }
            };

            $('#' + win.windowId).on('close', function () {
                try {
                    var roptions = $.data($('#' + win.contentId)[0], objectName).options;
                    //2017.12.29 回接需要接 DataSet: wipData
                    var dsClearColse = {};
                    var isSaved = roptions.isSaved;
                    if (isSaved == true) { dsClearColse = cloneJSON(roptions.wipData); }
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                    deleteJSONObject(inData);
                    action({ isSaved: isSaved, returnDataSet: dsClearColse });
                }
                catch (err) {
                    errorHandle(formName, 'showClearCitem_close', err);
                }
            });
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: cloneJSON(inData), 
                localization: cloneJSON(options.localization),
                /*
                2017.12.11 SKYPE (Miggie)訊息 呼叫結清需要傳的參數 
                因為不知道結清功能參數的設定方式，有請教MIGGIE。口頭告知fDoUCFlag=1,fDoPeriod=0 才是我要用的。
                    this.fBackSNO = null;     //#7389工單單號(逗號隔開)BillNo
                    this.fDoUCFlag = 0;       //#7389是否過濾只做已收費用0=不過濾,1=是
                    this.fDoPeriod = 1;       //#7389是否過濾為週期性費用0=不過濾,1=是 (試算處理非週期性費用1=不處理,0=處理)
                */
                fBackSNO: allSNO,
                fDoUCFlag: 1,
                fDoPeriod: 0
            });
        }
        catch (err) {
            errorHandle(formName, 'showClearCitem', err);
        }
    };

    function saveCloseWip(div, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var data = getControlObject(div, 'detail1')[options.detailName]('getData');
            var snoRows = getControlObject(div, 'detail2')['SO1118A12']('getSelectedRows');
            var selCnt = snoRows.CanChooseWip.rows.length;
            var rowsCnt = getControlObject(div, 'detail2')['SO1118A12']('getRowsCount');
            var allSNo = getRowFieldString(snoRows[Object.keys(snoRows)[0]], 'SNO');
            var ClearData = "";//#7389 2017.12.29 增加傳入結清資料，因Jacky有建議可以先將TableName改名，合併同一個DataSet但是這邊沒有其他DataSet傳送，所以增加一個傳參

            var saveProcess = (function (ac) {
                var parameters = $.extend({}, paraLoginInfo, {
                    allSNO: { type: 'string', value: allSNo },
                    WorkType: { type: 'integer', value: options.refNo },
                    dtExecTab: { type: 'string', value: JSON.stringify(getExecuteTable(div)) },
                    ShouldRegPriv: { type: 'boolean', value: data['shouldReg'.toUpperCase()] },
                    SignDate: { type: 'date', value: data['signDate'.toUpperCase()] },
                    Custid: { type: 'integer', value: options.custId },
                    OrderNo: { type: 'string', value: convertToNull(options.orderNo) },
                    IsOrderTurnSend: { type: 'boolean', value: false },
                    dsClearData: { type: 'string', value: convertToNull(ClearData) }
                });
                var params = getParameters(riadllName,
                    riaClassName,
                    'SaveCloseWip',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        delete parameters;
                        delete params;
                        if (data.ResultBoolean == true) {
                            action([true]);
                        }
                        else {
                            action([false, data.ErrorMessage]);
                        }
                    }
                });
            });
            var chkReturnCitem = (function (actRs) {
                //判斷是否有退單，工單內的費用已經有入帳。True=有入帳 False=尚未入帳
                //actRs([true]);
                var parameters = $.extend({}, paraLoginInfo, {
                    CustID: { type: 'integer', value: options.custId },
                    AllSNO: { type: 'string', value: allSNo },
                    OrderNO: { type: 'string', value: convertToNull(options.orderNo) },
                    SelectAll: { type: 'boolean', value: (selCnt == rowsCnt) }
                });
                var params = getParameters(riadllName,
                    riaClassName,
                    'chkReturnCitem',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        delete parameters;
                        delete params;
                        if (data.ResultBoolean == true) {
                            var noGo = false;
                            var msg = "";
                            //Message : 檢核後中止
                            //Message2 : 詢問後進行
                            //Message3 : 所有工單號
                            if (data.ErrorCode < 0) {
                                noGo = true;
                                msg = data.ErrorMessage;
                            } else {
                                if (data.Message) {
                                    noGo = true;
                                    msg = data.Message;
                                } else {
                                    if (data.Message2) {
                                        msg = data.Message2;
                                    }
                                    if (data.Message4) {
                                        msg = data.Message3;
                                        allSNo = data.Message4;
                                    }
                                }
                            }
                            actRs([noGo, msg, data.Message4]);
                        }
                        else {
                            actRs([true, data.ErrorMessage, null]);
                        }
                    } 
                });
            });

            
            if (options.refNo == 4 && (options.orderNo != "" || options.orderNo != null)) {
                chkReturnCitem(function (rs) {
                    if (rs[0] == true) {
                        //#7389 2017.12.12 by Corey 退單功能需要增加判斷是否有入帳。
                        //該訂單費用已有暫收或入帳,不允許退單。 <-- 包括這個訊息 , 還有額外其他的 By Hammer
                        messageBox(rs[1], messageType.critical);
                    } else {
                        if (rs[1]) {
                            if (rs[2]) {
                                //選取的工單內含必買產品，需將訂單內的工單全部退單。
                                messageBox(rs[1], messageType.information, null, function (r) {
                                    getControlObject(div, 'detail2')['SO1118A12']('setSelectedRows', allSNo);
                                })
                            } else {
                                //有收費資料已開立發票，是否要退單?
                                messageBox(rs[1], messageType.yesno, null, function (r) {
                                    if (r == "no") {
                                        action([false]);
                                        return;
                                    } else {
                                        saveProcess(action);
                                    }
                                })

                            }
                        } else {
                            saveProcess(action);
                        }
                    }
                });
            } else {
                saveProcess(action);
            };
            //END
        }
        catch (err) {
            errorHandle(formName, 'SaveCloseWip', err);
        }
    };
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).jqxWindow('close');
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };
})(jQuery);