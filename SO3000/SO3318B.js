(function ($) {
    var formName = 'SO3318B';
    var riadllName = 'CableSoft.SO.RIA.Billing.CounterPay.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.CounterPay.Web.CounterPay';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 25;
    var CMCodeTableName = "CMCode";
    var PTCodeTableName = "PTCode";
    var clctEnTableName = "ClctEn";
    var privsTableName = "Privs";
    var paraTableName = "Para";
    var systemTableName = "System";
    var invConSettingTableName = "InvConSetting";
    var chargeTmpTableName = "ChargeTmp";
    var compCodeTableName = "CompCode";

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
                        options: $.extend({}, new defaults(), new SO3318B(), options)
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
        chkTranDateOk: function (jq, params) {
            return chkTranDateOk(jq[0], params);
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
        this.isOrder = false;
        this.orderNo = null;
        this.childLoaded = [];
        this.billCount = 0;
        this.chkData = [];
        this.level = 0;
        this.usePG = 0;
        this.creditCard4 = 0;
        this.doCredit = 0;
        this.startLast4 = 0;
        this.editPriv = false; 
        this.deletePriv = false;
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
            var sHeight = $(div).height() - buttonsHeight;
            var gbxHeight = 120;
            getControlObject(div, 'gbxData').jqxPanel({ height: gbxHeight });
            getControlObject(div, 'gData').jqxGrid({ height: sHeight - gbxHeight - 5 });
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            destroyControls(controls);
            var options = $.data(div, formName).options;
            deleteJSONObject(options);
            $.data(div, formName, null);

            //var controls = $.data(div, formName).options.controls;
            //destroyControls(controls);
            //var options = $.data(div, formName).options
            //options.length = 0;
            //options = null;
            //$.data(div, formName, null);
            //$(div).off();
            ////$(div).remove();
            return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            //2018.03.20 調整加傳版本loadForm
            loadForm(options,
                'SO3000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            frmAddHandler(div);
                            textAddHandler(div);
                            buttonAddHandler(div);
                            if (options.usePG == 1 && options.creditCard4 == 1) {
                                getControlObject(div, 'chkPayGateway').jqxCheckBox('val', true);
                                options.doCredit = 1;
                            };
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });

            //$.ajax({
            //    url: 'SO3000\\' + formName + '.html',
            //    type: "get",
            //    datatype: 'html',
            //    success: function (msg) {
            //        try {
            //            $(div).html(msg);
            //            changeElementId(div);
            //            init(div, function () {
            //                frmAddHandler(div);
            //                textAddHandler(div);
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
            };

            $(options.container).on('keydown', function (e) {
                try {
                    if (e.ctrlKey && e.which == 119) {
                        messageBox(JSON.stringify(options, null, '\t'), null, null, null, { width: 800, height: 500 });
                    }
                }
                catch (err) {
                    errorHandle(formName, 'frmAddHandler_keydown', err, true);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'frmAddHandler', err);
        }
    };
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div, formName);
            renderControl(div);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            formResize(div);
            getChargeTmp(div, function (r) {
                if (r[0]) {
                    initList(div);
                    defaultValue(div);

                    if (options.usePG == 1) {

                    };

                    refresh(div);
                    action(true);
                }
                else if (r[1] != null) {
                    messageBox(r[1] ,messageType.critical);
                    action(false);
                }
            });

        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function getChargeTmp(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var para = { Para: options.parameters['Para'] };
            var parameters = $.extend({}, paraLoginInfo, {
                strPara: { type: 'string', value: JSON.stringify(para) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetChargeTmp',
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
            errorHandle(formName, 'getChargeTmp', err);
        }
    };
    function initList(div) {
        try {
            var options = $.data(div, formName).options;
            var csArrays = ["csCMCode", "csClctEn", "csPTCode"];
            var tableArrays = [CMCodeTableName,
                    clctEnTableName, PTCodeTableName];
            var cLengths = csArrays.length;
            for (var i = 0; i < cLengths; i++) {
                getControlObject(div, csArrays[i]).csList('source', options.parameters[tableArrays[i]].rows);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initList', err);
        }
    };
    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            var row = options.parameters[paraTableName].rows[0];
            //實收日期
            getControlObject(div, 'dtRealDate').csDateTime('setText', row['realDate'.toUpperCase()]);
            //收費方式
            getControlObject(div, 'csCMCode').csList('codeNo', row['CMCode'.toUpperCase()]);
            //付款種類
            getControlObject(div, 'csPTCode').csList('codeNo', row['PTCode'.toUpperCase()]);
            //收費人員
            getControlObject(div, 'csClctEn').csList('codeNo', row['ClctEn'.toUpperCase()]);
            getControlObject(div, 'csClctEn').csList('disabled', true);
            var privRow = [];
            for (var i = 1 ; i <= 5; i++) {
                var pR = getRowByKeyValue(options.parameters[privsTableName].rows, 'MID', 'SO3318' + i);
                privRow[i] = pR != null && pR['GROUPX'] == 1;
            }
            //判斷收費人員/結轉權限
            if (!privRow[1]) {
                getControlObject(div, 'csClctEn').csList('disabled', true);
                getControlObject(div, 'btnSaveCharge').css('display', 'none');
            }
            //判斷修改權限
            if (!privRow[2]) {
                getControlObject(div, 'btnEdit').css('display', 'none');
            }
            var sysRow = options.parameters[systemTableName].rows[0];
            //判斷發票開立權限
            if (!privRow[3] || sysRow['StartCreateInv'.toUpperCase()] != 1 || sysRow['AutoCreateInv'.toUpperCase()] == 1) {
                getControlObject(div, 'btnInvAdd').css('display', 'none');
            }
            //判斷發票開立權限
            if (!privRow[4] || sysRow['StartCreateInv'.toUpperCase()] != 1) {
                getControlObject(div, 'btnInvPrint').css('display', 'none');
            }
            //判斷取消登錄權限 #7702 2018.02.06
            if (!privRow[5]) {
                getControlObject(div, 'btnCancel').css('display', 'none');
            }
            //startLast4
            options.startLast4 = sysRow['StartLast4'.toUpperCase()];

            var pR = getRowByKeyValue(options.parameters[privsTableName].rows, 'MID', 'SO331821');
            options.editPriv = pR != null && pR['GROUPX'] == 1;
            var pR = getRowByKeyValue(options.parameters[privsTableName].rows, 'MID', 'SO331851');
            options.deletePriv = pR != null && pR['GROUPX'] == 1;

            if (row['ClctEn'.toUpperCase()] == null) {
                options.clctEnDisable = true;
                getControlObject(div, 'tBillNo').jqxInput({ disabled: true });
                getControlObject(div, 'btnEdit').css('display', 'none');
                getControlObject(div, 'btnCancel').css('display', 'none');
                getControlObject(div, 'btnInvAdd').css('display', 'none');
                getControlObject(div, 'btnInvPrint').css('display', 'none');
            }
            else {
                getControlObject(div, 'tBillNo').jqxInput('focus');
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'defaultValue', err);
        }
    };
    function refreshGrid(div) {
        try {
            var options = $.data(div, formName).options;
            var rows = options.initData[chargeTmpTableName].rows;
            options.gridSource.localdata = rows;
            getControlObject(div, 'gData').jqxGrid('updatebounddata');
            if (rows.length > 0) {
                getControlObject(div, 'gData').jqxGrid('selectrow', 0);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
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
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        $('#' + iId + scrollBars[j]).css('display', 'none');
                    }
                }
            }
            level += 1;
            //建立日期元件
            oArray = ["dtRealDate", "dtCutDay"];
            oDisabled = [true, false];
            oWidthArray = ["80", "80"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var fs = "yyyy/MM/dd";
                $('#' + iId).csDateTime({
                    theme: options.theme,
                    formatString: fs,
                    showCalendarButton: false,
                    value: null,
                    height: textHeight - 2,
                    disabled: oDisabled[i],
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csDateTime', level: level });
            }
            level += 1;
            //建立單選元件
            oArray = ["csCMCode",
                    "csClctEn", "csPTCode"];
            oWidthArray = ["160",
                    "160", "160"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var disabled = false;
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 50,
                    disabled: disabled,
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csList', level: level });
            }
            level += 1;
            //建立input
            oArray = ["tBillNo"];
            oWidthArray = ["160"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxInput({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    maxLength:16
                });
                controls.push({ name: iId, type: 'jqxInput', level: level });
            }
            level += 1;
            //建立按鈕
            oArray = ['btnEdit', 'btnCancel', 'btnInvAdd', 'btnInvPrint',
                'btnSaveCharge', 'btnPrint', 'btnEditPT', 'btnCarrierId1',
                'btnExit', 'btnExport'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var text = lang[oArray[i]];
                switch (oArray[i]) {
                    case "btnEdit":
                        img = imageScr.edit;
                        break;
                    case "btnCancel":
                        img = imageScr.delete;
                        break;
                    case "btnPrint":
                        img = imageScr.print;
                        break;
                    case "btnSaveCharge":
                        img = imageScr.save;
                        break;
                    case "btnExit":
                        img = imageScr.exit;
                        break;
                    case "btnEditPT":
                        //img = imageScr.edit;
                        break;
                    case "btnCarrierId1":
                        img = imageScr.view;
                        break;
                    case "btnInvAdd":
                        img = imageScr.append;
                        break;
                    case "btnInvPrint":
                        img = imageScr.print;
                        break;
                    case "btnExport":
                        img = imageScr.excel;
                        break;
                }
                o.text(text);
                var bOptions = $.extend({}, {
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                }, img, imagePosition);
                o.jqxButton(bOptions);
                $('#' + bId).find('img').css('top', (buttonsHeight - $('#' + bId).find("img").height()) / 2 - 1);
                controls.push({ name: bId, type: 'jqxButton', level: level });
            }
            level += 1;
            //建立CheckBox
            oArray = ["chkPayGateway"];
            oWidthArray = ["98%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).text(lang[oArray[i]]);
                $('#' + iId).jqxCheckBox({
                    theme: options.theme,
                    width: oWidthArray[i],
                    disabled: options.creditCard4 == 0 || options.usePG == 0
                });
                controls.push({ name: iId, type: 'jqxCheckBox', level: level });
            };
            level += 1;

            options.level = level;
            renderDetailGrid(div, level);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function renderDetailGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'gData';
            options.gridSource = {
                datatype: "json",
                localdata: [],
                datafields: [{ name: 'ENTRYNO', type: 'integer' },
                            { name: 'BILLNO', type: 'string' },
                            { name: 'CUSTID', type: 'integer' },
                            { name: 'CUSTSTATUSNAME', type: 'string' },
                            //{ name: 'WIPSTATUSNAME', type: 'string' },
                            { name: 'CUSTNAME', type: 'string' },
                            { name: 'CITEMNAME', type: 'string' },
                            { name: 'REALPERIOD', type: 'integer' },
                            { name: 'REALAMT', type: 'integer' },
                            { name: 'REALSTARTDATE', type: 'date' },
                            { name: 'REALSTOPDATE', type: 'date' },
                            { name: 'CMNAME', type: 'string' },
                            { name: 'PTNAME', type: 'string' },
                            { name: 'PRTSNO', type: 'string' },
                            { name: 'MEDIABILLNO', type: 'string' },
                            { name: 'NOTE', type: 'string' },
                            { name: 'UPDEN', type: 'string' },
                            { name: 'UPDTIME', type: 'string' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.gridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                height: '99%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                editable: false,
                columns: [
                    { text: lang.gData_ENTRYNO, editable: false, align: "right", cellsalign: "right", datafield: 'ENTRYNO', width: 40 },
                    { text: lang.gData_BILLNO, editable: false, datafield: 'BILLNO', width: 120 },
                    { text: lang.gData_CUSTID, editable: false, align: "right", cellsalign: "right", datafield: 'CUSTID', width: 60 },
                    { text: lang.gData_CUSTSTATUSNAME, editable: false, datafield: 'CUSTSTATUSNAME', width: 70 },
                    //{ text: lang.gData_WIPSTATUSNAME, editable: false, datafield: 'WIPSTATUSNAME', width: 80 },
                    { text: lang.gData_CUSTNAME, editable: false, datafield: 'CUSTNAME', width: 100 },

                    { text: lang.gData_CITEMNAME, editable: false, datafield: 'CITEMNAME', width: 130 },
                    { text: lang.gData_REALPERIOD, editable: false, align: "right", cellsalign: "right", datafield: 'REALPERIOD', width: 50 },
                    { text: lang.gData_REALAMT, editable: false, align: "right", cellsalign: "right", datafield: 'REALAMT', width: 70 },
                    { text: lang.gData_REALSTARTDATE, editable: false, datafield: 'REALSTARTDATE', cellsformat: 'yyyy/MM/dd', width: 80 },
                    { text: lang.gData_REALSTOPDATE, editable: false, datafield: 'REALSTOPDATE', cellsformat: 'yyyy/MM/dd', width: 80 },

                    { text: lang.gData_CMNAME, editable: false, datafield: 'CMNAME', width: 60 },
                    { text: lang.gData_PTNAME, editable: false, datafield: 'PTNAME', width: 60 },
                    { text: lang.gData_PRTSNO, editable: false, datafield: 'PRTSNO', width: 100 },
                    { text: lang.gData_MEDIABILLNO, editable: false, datafield: 'MEDIABILLNO', width: 100 },
                    { text: lang.gData_NOTE, editable: false, datafield: 'NOTE', width: 120 },

                    { text: lang.gData_UPDEN, editable: false, datafield: 'UPDEN', width: 100 },
                    { text: lang.gData_UPDTIME, editable: false, datafield: 'UPDTIME', width: 100 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
            level += 1;

            options.level = level;
        }
        catch (err) {
            errorHandle(formName, 'renderDetailGrid', err);
        }
    };
    function enableControls(div) {
        try {
            var options = $.data(div, formName).options;
            var rows = options.initData[chargeTmpTableName].rows;
            var flag = (rows.length == 0);
            var buttons = ['btnEdit', 'btnCancel', 'btnInvAdd', 'btnInvPrint',
                            'btnSaveCharge', 'btnPrint', 'btnEditPT', 'btnCarrierId1', 'btnExport'];
            for (var i = 0 ; i < buttons.length; i++) {
                if (getControlObject(div, buttons[i]).css('display') != 'none') {
                    var realFlag = flag;
                    switch (buttons[i]) {
                        case "btnEdit": case "btnCancel": case "btnInvAdd": case "btnInvPrint": case "btnEditPT": case "btnCarrierId1":
                            realFlag = flag || (options.clctEnDisable == true);
                            break;
                    }
                    getControlObject(div, buttons[i]).jqxButton({ disabled: realFlag });
                }
                else {
                    getControlObject(div, buttons[i]).jqxButton({ disabled: true });
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'enableControls', err);
        }
    }
    //refresh 更新畫面上單據數及金額
    function refresh(div) {
        try {
            var options = $.data(div, formName).options;
            refreshGrid(div);
            var rows = options.initData[chargeTmpTableName].rows;
            if (rows.length > 0) {
                getControlObject(div, 'tBillCnt').text(rows[0]["CountNo".toUpperCase()]);
                getControlObject(div, 'tTotalAmt').text(commaSeparateNumber(rows[0]["TotalAmt".toUpperCase()]));
            }
            else {
                getControlObject(div, 'tBillCnt').text(0);
                getControlObject(div, 'tTotalAmt').text(0);
            };
            enableControls(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'refreshData', err);
        }
    }
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var oArrays = ['csCMCode', 'csClctEn', 'csPTCode'];
            var lArrays = ['lCMCode', 'lClctEn', 'lPTCode'];
            for (var i = 0; i < oArrays.length; i++) {
                var r = checkUIMustBe(getControlObject(div, oArrays[i]).csList('codeNo'), lang[lArrays[i]], function (r) {
                    getControlObject(div, oArrays[i]).csList('focus');
                });
                if (r != true) return r;
            }
            var r = checkUIMustBe(getControlObject(div, 'dtRealDate').csDateTime('getText'), lang.lRealDate, function (r) {
                getControlObject(div, 'dtRealDate').csDateTime('focus');
            });
            if (r != true) return r;
            var realDate = getControlObject(div, 'dtRealDate').csDateTime('getText');
            var r = $.fn['SO3318A']('chkTranDateOk', div, options.parameters, realDate);
            if (r != true) return r;
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    }
    //textAddHandler
    function textAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //單據登錄
            getControlObject(div, 'tBillNo').on('input', function () {
                if ($(this).jqxButton('disabled')) { return; }
                var billNo = getControlObject(div, 'tBillNo').jqxInput('val').trim();
                if (isEmpty(billNo)) return;
                switch (billNo.length) {
                    case 11: case 12: case 15: case 16:
                        if (isDataOk(div) != true) return;

                        chkDataOk(div, billNo, function (x) {
                            if (x[0] == true) {
                                chkShowMsg(div, function (y) {
                                    if (y[0] == true) {
                                        chkShowMsg2(div, function (z) {
                                            if (z[0] == true) {
                                                chkShowMsg3(div, function (o) {
                                                    if (o[0] == true) {
                                                        addNewCharge(div, billNo, function (r) {
                                                            if (r[0] == true) {
                                                                refresh(div);
                                                                getControlObject(div, 'tBillNo').jqxInput('val', '');
                                                                //#7671 options.creditCard4 = 1  intStartLast4=1
                                                                if (options.creditCard4 == 1 && options.startLast4==1){
                                                                    showCustData(div, function (r) {
                                                                        if (r.isSaved) {
                                                                            refresh(div);
                                                                            //信用卡
                                                                            if (options.doCredit == 1) {
                                                                                showCreditCard(div, function (r) {
                                                                                    if (r.isSaved) {
                                                                                        refresh(div);
                                                                                    };
                                                                                });
                                                                            };                                                                
                                                                        };
                                                                    });
                                                                }
                                                                else {
                                                                    //信用卡
                                                                    if (options.doCredit == 1) {
                                                                        showCreditCard(div, function (r) {
                                                                            if (r.isSaved) {
                                                                                refresh(div);
                                                                            };
                                                                        });
                                                                    };                                                                
                                                                };
                                                            }
                                                            else {
                                                                messageBox(r[1], messageBox.critical, null, function () {
                                                                    getControlObject(div, 'tBillNo').jqxInput('focus');
                                                                });
                                                            };
                                                        });
                                                    }
                                                    else {
                                                        getControlObject(div, 'tBillNo').jqxInput('focus');
                                                    };
                                                });
                                            }
                                            else {
                                                getControlObject(div, 'tBillNo').jqxInput('focus');
                                            };
                                        });
                                    }
                                    else {
                                        //messageBox(y[1], null, null, function () {
                                            getControlObject(div, 'tBillNo').jqxInput('focus');
                                        //});
                                    };
                                })
                            }
                            else  {
                                //messageBox(x[1], null, null, function () {
                                    getControlObject(div, 'tBillNo').jqxInput('focus');
                                //});
                            };
                        })
                        break;
                }
            });
            //線上刷卡
            getControlObject(div, 'chkPayGateway').on('checked', function (event) {
                options.doCredit = 1;
            });
            getControlObject(div, 'chkPayGateway').on('unchecked', function (event) {
                options.doCredit = 0;
            });
            //收費方式
            getControlObject(div, 'csCMCode').on('selectedIndexChanged', function (event) {
                if (options.loading == true) return;
                var bankValue = $(this).csList('codeNo');
                if (bankValue == null || bankValue.length == 0) {
                    return false;
                }
                var selItem = getControlObject(div, 'csCMCode').csList('selectedItem');
                if (selItem != null) {
                    if (isEmpty(selItem.REFNO) == false) {
                        if (selItem.REFNO == 4) {
                            getControlObject(div, 'csPTCode').csList('codeNo', 4);
                            options.creditCard4 = 1;
                            if (options.usePG == 1) {
                                getControlObject(div, 'chkPayGateway').jqxCheckBox('disabled', false);
                            };                            
                        }
                        else {
                            options.creditCard4 = 0;
                            options.doCredit = 0;
                            getControlObject(div, 'csPTCode').csList('codeNo', 1);
                            getControlObject(div, 'chkPayGateway').jqxCheckBox('disabled', true);
                            getControlObject(div, 'chkPayGateway').jqxCheckBox('val', false);
                        };
                    };
                };
            });
        }
        catch (err) {
            errorHandle(formName, 'textAddHandler', err);
        }
    };
    //getParaData 畫面上的資料
    function getParaData(div, isCut) {
        try {
            var options = $.data(div, formName).options;
            var table = { Para: { columns: [], rows: [] } };
            var cols = ['CutDay', 'RealDate', 'CMCode', 'CMName', 'PTCode', 'PTName', 'ClctEn', 'ClctName'];
            var types = ['string', 'string', 'integer', 'string', 'integer', 'string', 'string', 'string'];
            for (var i = 0; i < cols.length; i++) {
                table.Para.columns.push({ name: cols[i].toUpperCase(), type: types[i].toUpperCase() });
            }
            var row = {};
            if (isCut == true) {
                row['CutDay'.toUpperCase()] = getControlObject(div, 'dtCutDay').csDateTime('getText');
                row['RealDate'.toUpperCase()] = getControlObject(div, 'dtRealDate').csDateTime('getText');
            }
            else {
                row['RealDate'.toUpperCase()] = getControlObject(div, 'dtRealDate').csDateTime('getText');
                row['CMCode'.toUpperCase()] = getControlObject(div, 'csCMCode').csList('codeNo');
                row['CMName'.toUpperCase()] = getControlObject(div, 'csCMCode').csList('description');
                row['PTCode'.toUpperCase()] = getControlObject(div, 'csPTCode').csList('codeNo');
                row['PTName'.toUpperCase()] = getControlObject(div, 'csPTCode').csList('description');
                row['ClctEn'.toUpperCase()] = getControlObject(div, 'csClctEn').csList('codeNo');
                row['ClctName'.toUpperCase()] = getControlObject(div, 'csClctEn').csList('description');
            }
            table.Para.rows.push(row);
            return table;
        }
        catch (err) {
            errorHandle(formName, 'getParaData', err);
        }
    }
    //檢核資料
    function chkDataOk(div, billNo, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                strBillNo: { type: 'string', value: billNo }
            });
            delete para;
            var params = getParameters(riadllName,
                riaClassName,
                'ChkDataOK',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        delete options.chkData;
                        options.chkData = JSON.parse(data.ResultXML);
                        action([true]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'chkDataOk', err);
        }
    };
    function chkShowMsg(div, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var blnDo = true;

            for (var i = 0; i < options.chkData.RealCharge.rows.length; i++) {
                //判斷週期
                for (var j = 0; j < options.chkData.PeriodCycle.rows.length; j++) {
                    if (blnDo==true && options.chkData.RealCharge.rows[i]['CUSTID'] == options.chkData.PeriodCycle.rows[j]['CUSTID'] && options.chkData.RealCharge.rows[i]['CITEMCODE'] == options.chkData.PeriodCycle.rows[j]['CITEMCODE'] && options.chkData.RealCharge.rows[i]['FACISEQNO'] == options.chkData.PeriodCycle.rows[j]['FACISEQNO']) {
                        if (options.chkData.RealCharge.rows[i]['REALSTARTDATE'] < options.chkData.PeriodCycle.rows[j]['STOPDATE'] && options.chkData.RealCharge.rows[i]['REALSTOPDATE'] > options.chkData.PeriodCycle.rows[j]['STARTDATE']) {
                            //action([false, lang.chargeDouble])
                            blnDo = false;
                            messageBox(lang.chargeDouble, messageType.yesno, null, function (flag) {
                                if (flag == 'no') {
                                    action([false]);
                                    return;
                                }
                                else {
                                    action([true]);
                                    return;
                                };
                            });
                        };
                    };
                };
            };
            if (blnDo == true) { action([true]); };
        }
        catch (err) {
            errorHandle(formName, 'chkShowMsg', err);
        }
    };
    function chkShowMsg2(div, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var blnDo = true;

            for (var i = 0; i < options.chkData.RealCharge.rows.length; i++) {
                //判斷是否已收
                var ucCode = options.chkData.RealCharge.rows[i]['UCCODE'];
                var refNo = options.chkData.RealCharge.rows[i]['REFNO'];
                var payOK = options.chkData.RealCharge.rows[i]['PAYOK'];
                if (blnDo == true) {
                    if (isEmpty(ucCode)) {
                        blnDo = false;
                        messageBox(lang.ucCodeErr, messageType.yesno, null, function (flag) {
                            if (flag == 'no') {
                                action([false]);
                                return;
                            }
                            else {
                                action([true]);
                                return;
                            };
                        });
                    }
                    else {
                        if (payOK == 1 || refNo == 7 || refNo == 8) {
                            blnDo = false;
                            messageBox(lang.ucCodeErr, messageType.yesno, null, function (flag) {
                                if (flag == 'no') {
                                    action([false]);
                                    return;
                                }
                                else {
                                    action([true]);
                                    return;
                                };
                            });
                        }
                        else if (refNo == 3) {
                            blnDo = false;
                            messageBox(lang.ucCodeErr2, messageType.yesno, null, function (flag) {
                                if (flag == 'no') {
                                    action([false]);
                                    return;
                                }
                                else {
                                    action([true]);
                                    return;
                                };
                            });
                        };
                    };
                };
            };

            if (blnDo == true) { action([true]); };
        }
        catch (err) {
            errorHandle(formName, 'chkShowMsg', err);
        }
    };
    function chkShowMsg3(div, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var blnDo = true;
            var barCodeAdd = 0;

            for (var i = 0; i < options.chkData.RealCharge.rows.length; i++) {
                //取得barCodeAdd
                for (var j = 0; j < options.chkData.ChargeSystem.rows.length; j++) {
                    if (options.chkData.RealCharge.rows[i]['SERVICETYPE'] == options.chkData.ChargeSystem.rows[j]['SERVICETYPE']) {
                        if (isEmpty(options.chkData.ChargeSystem.rows[j]['PARA41']) == false) {
                            barCodeAdd = options.chkData.ChargeSystem.rows[j]['PARA41'];
                        };
                    };
                };
                //#4449 2009.04.02
                var barCodeCloseDate = options.chkData.RealCharge.rows[i]['BARCODECLOSEDATE'];
                if (blnDo == true && isEmpty(barCodeCloseDate) == false && barCodeAdd > 0) {
                    if (addDays(barCodeCloseDate, barCodeAdd) < addDays(Date.now(), 0)) {
                        var msg = lang.barcodeDate;
                        msg = msg.replace('{0}', formatDateTime(barCodeCloseDate, 'yyyyMMdd', true));
                        msg = msg.replace('{1}', barCodeAdd);
                        msg = msg.replace('{2}', formatDateTime(addDays(barCodeCloseDate, barCodeAdd), 'yyyyMMdd', true));
                        blnDo = false;

                        messageBox(msg, messageType.critical, null, function () {
                            action([false]);
                            return;
                        });
                    };
                };
            };

            if (blnDo == true) { action([true]); };
        }
        catch (err) {
            errorHandle(formName, 'chkShowMsg', err);
        }
    };
    //新增收費
    function addNewCharge(div, billNo, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var para = getParaData(div);
            var parameters = $.extend({}, paraLoginInfo, {
                strBillNo: { type: 'string', value: billNo },
                strPara: { type: 'string', value: JSON.stringify(para) }
            });
            delete para;
            var params = getParameters(riadllName,
                riaClassName,
                'AddNewCharge',
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
            errorHandle(formName, 'addNewCharge', err);
        }
    };
    //刪除登錄
    function deleteChargeTmp(div, row, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var realDate = getControlObject(div, 'dtRealDate').csDateTime('getText');
            var para = getParaData(div);
            var parameters = $.extend({}, paraLoginInfo, {
                strPara: { type: 'string', value: JSON.stringify(para) },
                entryNo: { type: 'integer', value: row['entryNo'.toUpperCase()] },
                realDate: { type: 'string', value: realDate },
                entryEn: { type: 'string', value: row['entryEn'.toUpperCase()] },
                clctEn: { type: 'string', value: row['clctEn'.toUpperCase()] }
            });
            delete para;
            var params = getParameters(riadllName,
                riaClassName,
                'DeleteChargeTmp',
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
            errorHandle(formName, 'DeleteChargeTmp', err);
        }
    };
    function saveCharge(div, action) {
        try {
            var options = $.data(div, formName).options;
            if (getControlObject(div, 'dtCutDay').css("display") == "none") {
                getControlObject(div, 'dtCutDay').prop('style').removeProperty('display');
                getControlObject(div, 'lCutDay').prop('style').removeProperty('display');
                for (var i = 0; i < options.controls.length; i++) {
                    var control = options.controls[i];
                    if (control.name.indexOf('dtCutDay') < 0 && control.name.indexOf('btnSaveCharge') < 0) {
                        disableControl(control, true);
                    }
                }
                messageBox(options.language.finalCheckCutDate, messageBox.critical, null, function () {
                    getControlObject(div, 'dtCutDay').csDateTime('setDate', new Date());
                    getControlObject(div, 'dtCutDay').csDateTime('focus');
                });
            }
            else {
                var realDate = getControlObject(div, 'dtCutDay').csDateTime('getText');
                var r = $.fn['SO3318A']('chkTranDateOk', div, options.parameters, realDate);
                if (r != true) return;
                chargeCutDate(div, function (r) {
                    showErrorData(div, function () {
                        action(r);
                    });
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'saveCharge', err);
        }
    };
    function showErrorData(div, action) {
        try {
            var options = $.data(div, formName).options;
            if (options.retData != null && options.retData["ErrData"] != null && options.retData["ErrData"].rows.length > 0) {
                var options = $.data(div, formName).options;
                var width = $(div).width();
                var height = $(div).height();
                var container = options.container;
                var objectName = "SO3318C"
                var x = 0;
                var y = 26;
                var winOptions = {
                    width: width,
                    height: height,
                    minWidth: width/2,
                    minHeight: height/2,
                    maxWidth: $(container).width(),
                    maxHeight: $(container).height(),
                    position: { x: x, y: y },
                    //position: 'center,center',
                    closeButtonAction: 'close',
                    resizable: true,
                    theme: options.theme
                };

                var win = createcsWindow(container, options.language['errFormName'] + ' [SO3318C]', winOptions);
                $('#' + win.windowId).on('close', function () {
                    try {
                        $('#' + win.contentId)['SO3318C']('destroy');
                        $('#' + win.windowId).csWindow('destroy');
                        options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                        options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                        action(true);
                    }
                    catch (err) {
                        errorHandle(formName, 'showErrorData_close', err);
                    }
                });
                $('#' + win.contentId)['SO3318C']({
                    loginInfo: cloneJSON(options.loginInfo),
                    container: $('#' + win.windowId),
                    parameters: cloneJSON(options.retData),
                    theme: options.theme,
                    localization:cloneJSON(options.localization)
                });
                options.controls.push({ name: win.contentId, type: 'SO3318C', level: options.level });
                options.level += 1;
            }
            else {
                action(true);
            }
        }
        catch (err) {
            errorHandle(formName, 'showErrorData', err);
        }
    }
    //收費結轉
    function chargeCutDate(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var para = getParaData(div, true);
            var parameters = $.extend({}, paraLoginInfo, {
                strPara: { type: 'string', value: JSON.stringify(para) }
            });
            delete para;
            var params = getParameters(riadllName,
                riaClassName,
                'ChargeCutDate',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    //messageBox(JSON.stringify(data));
                    if (data.ResultXML != null) {
                        delete options.retData;
                        options.retData = JSON.parse(data.ResultXML);
                    }
                    if (data.ResultBoolean == true) {
                        action([true, data.ErrorMessage]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            }, 300);
        }
        catch (err) {
            errorHandle(formName, 'chargeCutDate', err);
        }
    };
    //顯示收費資料
    function showChargeForm(div, action) {
        try {
            var options = $.data(div, formName).options;
            var objectName = "SO1132A";
            var width = 1000;
            var height = 600;
            var container;
            if (options.tabContainer != null) { container = options.tabContainer; };
            if (container == null) { container = options.container; };
            if (width > container.width()) { width = container.width(); };
            if (height > container.height()) { height = container.height(); };
            var x = ($(container).width() - width) / 2;
            var y = ($(container).height() - height) / 2;
            var winOptions = {
                width: width,
                height: height,
                minWidth: width/2,
                minHeight: height/2,
                maxWidth: $(container).width(),
                maxHeight: $(container).height(),
                position: { x: x, y: y },
                //position: 'center,center',
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };
            var win = createcsWindow(container, options.language['simpleFormEdit'] + ' [' + objectName + ']', winOptions);
            $('#' + win.windowId).on('close', function () {
                try {
                    var childOptions = $('#' + win.contentId)[objectName]('options');
                    var cSaved = childOptions.isSaved;
                    options.isSaved = cSaved;
                    if (options.isSaved == true) {                        
                        delete options.simpleData;
                        options.simpleData = childOptions.wipData;
                    }
                    //$('#' + win.contentId)[objectName]('destroy');
                }
                catch (err) {
                    errorHandle(formName, 'showChargeForm_close', err);
                }
                $('#' + win.contentId)[objectName]('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                action(cSaved);
            });
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: cloneJSON(options.simpleData),
                theme: options.theme,
                localization: cloneJSON(options.localization),
                wipData: cloneJSON(options.simpleData),
                wipType: 4,
                editMode:editMode.edit
            });
            options.controls.push({ name: win.contentId, type: objectName, level: options.level });
            options.level += 1;
        }
        catch (err) {
            errorHandle(formName, 'showChargeForm', err);
        }
    }
    function getSimple(div, billNo, item, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var para = getParaData(div, true);
            var parameters = $.extend({}, paraLoginInfo, {
                billNo: { type: 'string', value: billNo },
                item: { type: 'integer', value: item }
            });
            delete para;
            var params = getParameters(riadllName,
                riaClassName,
                'GetSimple',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    //messageBox(JSON.stringify(data));
                    if (data.ResultBoolean == true) {
                        delete options.simpleData;
                        options.simpleData = JSON.parse(data.ResultXML);
                        action([true, data.ErrorMessage]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getSimple', err);
        }
    };
    //修改收費資料
    function editChargeTmp(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var charge = $.extend({}, cloneJSON(options.simpleData), getParaData(div, false));
            var parameters = $.extend({}, paraLoginInfo, {
                strCharge: { type: 'string', value: JSON.stringify(charge) }
            });
            delete charge;
            var params = getParameters(riadllName,
                riaClassName,
                'EditChargeTmp',
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
            errorHandle(formName, 'editChargeTmp', err);
        }
    };
    function editChargeProcess(div) {
        try {
            var options = $.data(div, formName).options;
            var rowIndex = getControlObject(div, 'gData').jqxGrid('getselectedrowindex');
            var row = options.initData[chargeTmpTableName].rows[rowIndex];
            //取得正式收費資料
            getSimple(div, row['billNo'.toUpperCase()], row['item'.toUpperCase()], function (r) {
                if (r[0]) {
                    //秀收費項目資料
                    showChargeForm(div, function (r1) {
                        if (r1) {
                            //回填暫存收費資料
                            editChargeTmp(div, function (r2) {
                                if (r2[0]) {
                                    refresh(div);
                                }
                                else if (r2[1] != null) {
                                    messageBox(r2[1] , messageBox.critical);
                                }
                            });
                        }
                    });
                }
                else if (r[1] != null) {
                    messageBox(r[1], messageBox.critical);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'editChargeProcess', err);
        }
    }
    function getConditionData(div) {
        try {
            var options = $.data(div, formName).options;
            var table = getConditionStru();
            var lang = options.language;
            //var col = ["fieldName", "fieldValue", "fieldDesc", "headName"];
            var row = {};
            //收費人員
            row["fieldName".toUpperCase()] = "ClctEn_1";
            row["fieldValue".toUpperCase()] = convertToNull(getControlObject(div, 'csClctEn').csList('codeNo'));
            row["fieldDesc".toUpperCase()] = convertToNull(getControlObject(div, 'csClctEn').csList('description'));
            row["headName".toUpperCase()] = row["fieldName".toUpperCase()] + "," + lang.lClctEn;
            table.condition.rows.push(row)
            row = {};
            row["fieldName".toUpperCase()] = "RealDate_1";
            row["fieldValue".toUpperCase()] = convertToNull(getControlObject(div, 'dtRealDate').csDateTime('getText'));
            row["fieldDesc".toUpperCase()] = row["fieldValue".toUpperCase()];
            row["headName".toUpperCase()] = row["fieldName".toUpperCase()] + "," + lang.lRealDate;
            table.condition.rows.push(row)
            return table;
        }
        catch (err) {
            errorHandle(formName, 'getConditionData', err);
        }
    }
    //列印明細表
    function printDetail(div) {
        try {
            var options = $.data(div, formName).options;
            options["conditionData"] = getConditionData(div);
            printBydynamicReport(div, options, "SO3318B1", function () {
            }, true);
        }
        catch (err) {
            errorHandle(formName, 'printDetail', err);
        }
    }
    //匯出明細表
    function exportDetail(div) {
        try {
            var options = $.data(div, formName).options;
            options["conditionData"] = getConditionData(div);
            exportBydynamicReport(div, options, "SO3318B2", function () {
            }, true);
        }
        catch (err) {
            errorHandle(formName, 'exportDetail', err);
        }
    };
    //buttonAddHandler
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //修改
            getControlObject(div, 'btnEdit').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                //var container = options.container;
                //options.container = $("body");
                if (options.editPriv == false) {
                    showCheckManagerPWD( options, editMode.edit, function (r) {
                        if (r.isSaved == true) {
                            editChargeProcess(div);
                        }
                        else {
                            messageBox(r.errorMessage, messageBox.critical);
                        };
                    });
                }
                else {
                    editChargeProcess(div);
                };
                //options.container = container;
            });
            //取消登錄
            getControlObject(div, 'btnCancel').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
            //    //主管權限
                if (options.deletePriv == false) {
                    showCheckManagerPWD(options, editMode.delete, function (r) {
                        if (r.isSaved == true) {
                            var rowIndex = getControlObject(div, 'gData').jqxGrid('getselectedrowindex');
                            var row = options.initData[chargeTmpTableName].rows[rowIndex];
                            //檢核收費是否可以刪除登錄
                            chkChargeDel(div, row, function (x) {
                                if (x[0]) {
                                    //再次確認是否要刪除登錄
                                    messageBox(options.language.sureDelete, messageType.yesno, null, function (flag) {
                                        if (flag == 'yes') {
                                            //退刷
                                            if (row['CARDBILLNO'] != null && row['CARDBILLNO'] != '') {
                                                delCreditCard(div, function (s) {
                                                    if (s[0]) {
                                                        //進行刪除
                                                        deleteChargeTmp(div, row, function (m) {
                                                            if (m[0]) {
                                                                messageBox(options.language.deleteOk);
                                                                refresh(div);
                                                            }
                                                            else {
                                                                messageBox(m[1], messageBox.critical);
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        messageBox(s[1], messageBox.critical);
                                                    }
                                                });
                                            } else {
                                                //進行刪除
                                                deleteChargeTmp(div, row, function (r) {
                                                    if (r[0]) {
                                                        messageBox(options.language.deleteOk);
                                                        refresh(div);
                                                    }
                                                    else {
                                                        messageBox(r[1], messageBox.critical);
                                                    }
                                                });
                                            };
                                        }
                                    });
                                }
                                else {
                                    messageBox(x[1], messageBox.critical);
                                }
                            });
                        }
                        else {
                            messageBox(r.errorMessage, messageBox.critical);
                        };
                    });
                }
                else {
                    var rowIndex = getControlObject(div, 'gData').jqxGrid('getselectedrowindex');
                    var row = options.initData[chargeTmpTableName].rows[rowIndex];
                    //檢核收費是否可以刪除登錄
                    chkChargeDel(div, row, function (x) {
                        if (x[0]) {
                            //再次確認是否要刪除登錄
                            messageBox(options.language.sureDelete, messageType.yesno, null, function (flag) {
                                if (flag == 'yes') {
                                    //退刷
                                    if (row['CARDBILLNO'] != null && row['CARDBILLNO'] != '') {
                                        delCreditCard(div, function (s) {
                                            if (s[0]) {
                                                //進行刪除
                                                deleteChargeTmp(div, row, function (m) {
                                                    if (m[0]) {
                                                        messageBox(options.language.deleteOk);
                                                        refresh(div);
                                                    }
                                                    else {
                                                        messageBox(m[1], messageBox.critical);
                                                    }
                                                });
                                            }
                                            else {
                                                messageBox(s[1], messageBox.critical);
                                            }
                                        });
                                    } else {
                                        //進行刪除
                                        deleteChargeTmp(div, row, function (r) {
                                            if (r[0]) {
                                                messageBox(options.language.deleteOk);
                                                refresh(div);
                                            }
                                            else {
                                                messageBox(r[1], messageBox.critical);
                                            }
                                        });
                                    };
                                }
                            });
                        }
                        else {
                            messageBox(x[1], messageBox.critical);
                        }
                    });
                };
            });
            //發票開立
            getControlObject(div, 'btnInvAdd').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }

            });
            //發票列印
            getControlObject(div, 'btnInvPrint').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }

            });
            //修改付款種類 
            getControlObject(div, 'btnEditPT').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                showPTCode(div, function (r) {
                    if (r.isSaved) {                       
                        refresh(div);
                    };
                });
            });
            //客戶資訊 
            getControlObject(div, 'btnCarrierId1').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                showCustData(div, function (r) {
                    if (r.isSaved) {
                        refresh(div);
                    };
                });
            });
            //列印日報表
            getControlObject(div, 'btnPrint').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                printDetail(div);
            });
            //匯出日報表
            getControlObject(div, 'btnExport').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                exportDetail(div);
            });
            //收費結轉
            getControlObject(div, 'btnSaveCharge').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                saveCharge(div, function (r) {
                    if (r[0]) {
                        messageBox(r[1], null, null, function () {
                            close(div);
                        })
                    }
                    else if (r[1] != null) {
                        messageBox(r[1], messageType.critical, null, function () {
                            close(div);
                        });
                    }
                    else {
                        close(div);
                    }
                });
            });
            //離開
            getControlObject(div, 'btnExit').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                close(div);
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    //修改付款種類
    function showPTCode(div, action) {
        try {
            var options = $.data(div, formName).options;
            var rowIndex = getControlObject(div, 'gData').jqxGrid('getselectedrowindex');
            var row = options.initData[chargeTmpTableName].rows[rowIndex];
            var width = 500;// $(div).width();
            var height = 150;//$(div).height();
            var container;
            if (options.tabContainer != null) {
                container = $('<div id="' + $(div).prop('id') + 'child"style="width:99%;height:99%;"></div>').appendTo(options.tabContainer);
            }
            if (container == null) container = options.container;
            if (width > container.width()) width = container.width();
            if (height > container.height()) height = container.height();
            var x = ($(container).width() - width) / 2;
            //var y = ($(container).height() - height) / 2;            
            var y = 30;
            var ptData = options.parameters[PTCodeTableName];
            var paraData =  getParaData(div, false);

            var winOptions = {
                width: width,
                height: height,
                minWidth: width / 2,
                minHeight: height / 2,
                maxWidth: $(container).width(),
                maxHeight: $(container).height(),
                position: { x: x, y: y },
                //position: 'center,center',
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme,
            };

            var objectName = 'SO3318B1';
            var win = createcsWindow(container, options.language['btnEditPT'] + ' [' + objectName + ']', winOptions);

            $('#' + win.windowId).on('close', function () {
                try {
                    //var childOptions = $.data($('#' + win.contentId)[0], objectName).options;
                    var childOptions = $('#' + win.contentId)[objectName]('options');
                    var isSaved = childOptions.isSaved;
                    options.isSaved = isSaved;
                    if (isSaved == true) {
                        if (options.chargeData != null) {
                            delete options.chargeData;                                
                        };
                        options.chargeData = childOptions.chargeData;
                        if (options.initData[chargeTmpTableName] != null) {
                            delete options.initData[chargeTmpTableName];                                
                        };
                        options.initData[chargeTmpTableName] = options.chargeData[chargeTmpTableName];
                    };
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                    //action({ isSaved: isSaved, chargeData: chargeData });
                    action({ isSaved: isSaved });
                }
                catch (err) {
                    errorHandle(formName, 'showPTCode_close', err);
                };
                
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                action(isSaved);
            });

            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                //parameters: cloneJSON(options.simpleData),
                theme: options.theme,
                localization: cloneJSON(options.localization),
                chargeRow: cloneJSON(row),
                listPTCode: cloneJSON(ptData),
                paraData: cloneJSON(paraData)
            });
            options.controls.push({ name: win.contentId, type: objectName, level: options.level });
            options.level += 1;
        }
        catch (err) {
            errorHandle(formName, 'showPTCode', err);
        }
    };
    //修改客戶資訊
    function showCustData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var rowIndex = getControlObject(div, 'gData').jqxGrid('getselectedrowindex');
            var row = options.initData[chargeTmpTableName].rows[rowIndex];
            var width = 500;// $(div).width();
            var height = 200;// $(div).height();
            var container;
            if (options.tabContainer != null) {
                container = $('<div id="' + $(div).prop('id') + 'child"style="width:99%;height:99%;"></div>').appendTo(options.tabContainer);
            }
            if (container == null) container = options.container;
            if (width > container.width()) width = container.width();
            if (height > container.height()) height = container.height();
            var x = ($(container).width() - width) / 2;
            //var y = ($(container).height() - height) / 2;            
            var y = 30;
            var paraData = getParaData(div, false);
            //.uDoFocus = (intStartLast4 = 1 And gilCMCode.GetRefNo = "4")
            var cmRefNo = '';
            var cmValue = convertToNull(getControlObject(div, 'csCMCode').csList('selectedItem'));
            if (isEmpty(cmValue) == false) { cmRefNo = cmValue.REFNO; };
            var intStartLast4 = 0;
            if (isEmpty(options.parameters.System.rows[0]['STARTLAST4']) == false) {
                intStartLast4 = options.parameters.System.rows[0]['STARTLAST4'];
            };

            var winOptions = {
                width: width,
                height: height,
                minWidth: width / 2,
                minHeight: height / 2,
                maxWidth: $(container).width(),
                maxHeight: $(container).height(),
                position: { x: x, y: y },
                //position: 'center,center',
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme,
            };

            var objectName = 'SO3318B2';
            var win = createcsWindow(container, options.language['btnCarrierId1'] + ' [' + objectName + ']', winOptions);

            $('#' + win.windowId).on('close', function () {
                try {
                    //var childOptions = $.data($('#' + win.contentId)[0], objectName).options;
                    var childOptions = $('#' + win.contentId)[objectName]('options');
                    var isSaved = childOptions.isSaved;
                    options.isSaved = isSaved;
                    if (isSaved == true) {
                        if (options.chargeData != null) {
                            delete options.chargeData;
                        };
                        options.chargeData = childOptions.chargeData;
                        if (options.initData[chargeTmpTableName] != null) {
                            delete options.initData[chargeTmpTableName];
                        };
                        options.initData[chargeTmpTableName] = options.chargeData[chargeTmpTableName];
                    };
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);

                    //action({ isSaved: isSaved, chargeData: chargeData });
                    action({ isSaved: isSaved });
                }
                catch (err) {
                    errorHandle(formName, 'showCustData_close', err);
                };

                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                action(isSaved);
            });

            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: cloneJSON(options.parameters),
                theme: options.theme,
                localization: cloneJSON(options.localization),
                chargeRow: cloneJSON(row),
                paraData: cloneJSON(paraData),
                doCardLastNoFocus: intStartLast4 == 1 && cmRefNo == 4
            });
            options.controls.push({ name: win.contentId, type: objectName, level: options.level });
            options.level += 1;
        }
        catch (err) {
            errorHandle(formName, 'showCustData', err);
        }
    };
    //信用卡刷卡
    function showCreditCard(div, action) {
        try {
            var options = $.data(div, formName).options;
            var rowIndex = getControlObject(div, 'gData').jqxGrid('getselectedrowindex');
            var row = options.initData[chargeTmpTableName].rows[rowIndex];
            var width = 500;// $(div).width();
            var height = 400;// $(div).height();
            var container;
            if (options.tabContainer != null) {
                container = $('<div id="' + $(div).prop('id') + 'child"style="width:99%;height:99%;"></div>').appendTo(options.tabContainer);
            }
            if (container == null) container = options.container;
            if (width > container.width()) width = container.width();
            if (height > container.height()) height = container.height();
            var x = ($(container).width() - width) / 2;
            //var y = ($(container).height() - height) / 2;            
            var y = 30;
            var cmRefNo = '';
            var cmValue = convertToNull(getControlObject(div, 'csCMCode').csList('selectedItem'));
            if (isEmpty(cmValue) == false) { cmRefNo = cmValue.REFNO; };
            var totalAmt = 0;
            var entryNo = row['ENTRYNO'];
            //var ccChargeData = copyTableData(options.initData[chargeTmpTableName], chargeTmpTableName, false);
            var ccChargeData = {};
                    ccChargeData["Simple"] = {
                    columns: options.initData[chargeTmpTableName].columns,
                    rows: []
                };
            
            for (var i = 0; i < options.initData[chargeTmpTableName].rows.length; i++) {
                if (options.initData[chargeTmpTableName].rows[i]['ENTRYNO'] == entryNo) {
                    totalAmt += options.initData[chargeTmpTableName].rows[i]['SHOULDAMT'];
                    var newRow = options.initData[chargeTmpTableName].rows[i];
                    ccChargeData["Simple"].rows.push(copyRowToRow(null, newRow, null));
                };
            };
            if (IsNullOrEmpty(options.parameters['Simple'])==false) {
                delete options.parameters["Simple"];
            };
            options.parameters["Simple"] = ccChargeData["Simple"];

            var winOptions = {
                width: width,
                height: height,
                minWidth: width / 2,
                minHeight: height / 2,
                maxWidth: $(container).width(),
                maxHeight: $(container).height(),
                position: { x: x, y: y },
                //position: 'center,center',
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };

            var objectName = 'SO1132E';
            var win = createcsWindow(container, options.language['chkPayGateway'] + ' [' + objectName + ']', winOptions);

            $('#' + win.windowId).on('close', function () {
                try {
                    //var childOptions = $.data($('#' + win.contentId)[0], objectName).options;
                    var childOptions = $('#' + win.contentId)[objectName]('options');
                    var isSaved = childOptions.isSaved;
                    options.isSaved = isSaved;
                    if (isSaved == true) {
                        if (options.chargeData != null) {
                            delete options.chargeData;
                        };
                        options.chargeData = childOptions.chargeData;
                        if (options.initData[chargeTmpTableName] != null) {
                            delete options.initData[chargeTmpTableName];
                        };
                        options.initData[chargeTmpTableName] = options.chargeData[chargeTmpTableName];
                    }
                    else {
                        //取消登錄
                        var rowIndex = getControlObject(div, 'gData').jqxGrid('getselectedrowindex');
                        var row = options.initData[chargeTmpTableName].rows[rowIndex];
                        deleteChargeTmp(div, row, function (r) {
                            if (r[0]) {
                                messageBox(options.language.deleteOk);
                                refresh(div);
                            }
                            else if (r[1]) {
                                messageBox(r[1], messageBox.critical);
                            }
                        });
                    };
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);

                    //action({ isSaved: isSaved, chargeData: chargeData });
                    action({ isSaved: isSaved });
                    //action(isSaved);
                }
                catch (err) {
                    errorHandle(formName, 'showCreditCard_close', err);
                };

                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                action({ isSaved: isSaved });
                //action(isSaved);
            });

            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: cloneJSON(options.parameters),
                theme: options.theme,
                localization: cloneJSON(options.localization),
                //chargeRow: row,
                realDate: convertToNull(getControlObject(div, 'dtRealDate').csDateTime('getText')),
                cmCode: convertToNull(getControlObject(div, 'csCMCode').csList('codeNo')),
                ptCode: convertToNull(getControlObject(div, 'csPTCode').csList('codeNo')),
                clctEn: convertToNull(getControlObject(div, 'csClctEn').csList('codeNo')),
                totalAmount: totalAmt
                //ccChargeData: ccChargeData
            });
            options.controls.push({ name: win.contentId, type: objectName, level: options.level });
            options.level += 1;
        }
        catch (err) {
            errorHandle(formName, 'showCreditCard', err);
        }
    };
    //檢核收費是否可以刪除登錄
    function chkChargeDel(div,row, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var entryNo = row['ENTRYNO'];
            var chkChargeData = {};
            chkChargeData["Simple"] = {
                columns: options.initData[chargeTmpTableName].columns,
                rows: []
            };
            for (var i = 0; i < options.initData[chargeTmpTableName].rows.length; i++) {
                if (options.initData[chargeTmpTableName].rows[i]['ENTRYNO'] == entryNo) {
                    var newRow = options.initData[chargeTmpTableName].rows[i];
                    chkChargeData["Simple"].rows.push(copyRowToRow(null, newRow, null));
                };
            };
            //if (IsNullOrEmpty(options.parameters['Simple'])==false) {
            //    delete options.parameters["Simple"];
            //};

            var parameters = $.extend({}, paraLoginInfo, {
                chkCharge: { type: 'string', value: cloneJSON(chkChargeData) }
            });
            delete para;
            var params = getParameters(riadllName,
                riaClassName,
                'ChkChargeDel',
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

        }
        catch (err) {
            errorHandle(formName, 'chkChargeDel', err);
        }
    };
    //信用卡退刷
    function delCreditCard(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var rowIndex = getControlObject(div, 'gData').jqxGrid('getselectedrowindex');
            var row = options.initData[chargeTmpTableName].rows[rowIndex];
            var totalAmt = 0;
            var entryNo = row['ENTRYNO'];
            var ccChargeData = {};
                ccChargeData["Simple"] = {
                columns: options.initData[chargeTmpTableName].columns,
                rows: []
            };

            for (var i = 0; i < options.initData[chargeTmpTableName].rows.length; i++) {
                if (options.initData[chargeTmpTableName].rows[i]['ENTRYNO'] == entryNo) {
                    totalAmt += options.initData[chargeTmpTableName].rows[i]['SHOULDAMT'];
                    var newRow = options.initData[chargeTmpTableName].rows[i];
                    ccChargeData["Simple"].rows.push(copyRowToRow(null, newRow, null));
                };
            };
            if (IsNullOrEmpty(options.parameters["Simple"])==false) {
                delete options.parameters["Simple"];
            };
            options.parameters["Simple"] = ccChargeData["Simple"];

            var parameters = $.extend({}, paraLoginInfo, {
                InitData: { type: 'string', value: JSON.stringify(options.parameters) },
                Credit: { type: 'boolean', value: false }
            });
            delete para;
            var params = getParameters(riadllName,
                riaClassName,
                'PaymentChargeDel',
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


        }
        catch (err) {
            errorHandle(formName, 'delCreditCard', err);
        }
    };

    function close(div) {
        try {
            var options = $.data(div, formName).options;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).csWindow('close');
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };


})(jQuery);
