//結清
(function ($) {
    var formName = 'SO1132B';
    var riadllName = 'CableSoft.SO.RIA.Billing.ChargeClose.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.ChargeClose.Web.ChargeClose';
    //var riadllName2 = 'CableSoft.SO.RIA.Wip.CloseChargeWip.Web.dll';
    //var riaClassName2 = 'CableSoft.SO.RIA.Wip.CloseChargeWip.Web.CloseChargeWip';
    var buttonsHeight = 25;
    var textHeight = 23;
    var gridHeight = 25;
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
                        options: $.extend({}, new defaults(), new SO1132B(), options)
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
        canView: function (jq, params, param2) {
            return canView(params, param2);
        }
    };
    var defaults = (function () {
        this.language = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.refNo = 0;           //來電參考號
        this.parameters = {};
        this.controls = [];
        this.theme = $.jqx.theme;
        this.localization = null;
        this.container = null;
        this.blnFormLoad = true;  //是否為formload
        this.fContact = false;    //是否有傳入來電資料
        this.fOrder = false;      //是否從訂單傳入
        this.fWipType = 0;        //派工類別
        this.fCalcType = 0;       //計價基礎  
        this.fResvTime = null;    //訂單傳入預約時間當作結清日 '#7389上一層傳入收費截止日當作結清日
        this.fCustId = 0;         //客編
        this.fSNo = null;         //工單單號
        this.fFaciSeqNo = null;   //設備流水號
        this.dicsyncChoose = null;//同步勾選的收費
        this.wipData = {};        //回傳給裝機單,訂單的資料
        this.fBackSNO = null;     //#7389工單單號(逗號隔開)BillNo
        this.fDoUCFlag = 0;       //#7389是否過濾只做已收費用0=不過濾,1=是
        this.fDoPeriod = 1;       //#7389是否過濾為週期性費用0=不過濾,1=是 (試算處理非週期性費用1=不處理,0=處理)
        this.isSaved = false;
    });
    function formResize(div) {
        try {
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            var height = $(div).height() - 4;
            var headHeight = textHeight + 4;
            var cGridHeight = height / 2;
            var bottomHeight = height - headHeight - cGridHeight - 6;
            getControlObject(div, "gbxHead").css({ height: headHeight });
            getControlObject(div, "gbxCharge").jqxExpander({ height: cGridHeight });
            getControlObject(div, "gbxBottom").css({ height: bottomHeight });
            //getControlObject(div, "gbxPresent").jqxExpander({ height: buttonsHeight * 2 });
            //getControlObject(div, "gbxProdCharge").jqxExpander({ height: bottomHeight - buttonsHeight * 2 - 4 });
            getControlObject(div, "gbxProdCharge").jqxExpander({ height: bottomHeight - 4 });
            getControlObject(div, "gbxClosePara").jqxPanel({ height: bottomHeight - 4 });
            getControlObject(div, "gbxData").jqxPanel({ height: height });
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

            $(div).off();
            return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    function canView(params, action) {
        try {
            var checkPara = checkParameters(editMode.view, params);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX('CanView', params, function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canView', err);
        }
    };
    function checkCanXX(method, data, action) {
        try {
            var install = getParametersTable(data, 'ChargeClose');
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                inData: { type: 'string', value: JSON.stringify(data) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                method,
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    action(d);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'checkCanXX', err);
        }
    }
    //檢核參數是否正確
    function checkParameters(em, data) {
        try {
            //檢核table 存不存在
            var table = getParametersTable(data, 'ChargeClose');
            if (table == null) return ([false, 'table ChargeClose not exist!!']);
            //檢核欄位存不存在
            var checkCols = ['', '', ''];
            //新增檢核客戶編號
            if (data[table].rows[0]['CustId'.toUpperCase()] == null) {
                return ([false, 'column custid not exist!!']);
            };
            return ([true]);
        }
        catch (err) {
            errorHandle(formName, 'checkParameters', err);
        }
    };
    //formLoaded
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            //2018.03.20 調整加傳版本loadForm
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        formDisplay(div, false);
                        changeElementId(div);
                        init(div, function (r) {
                            frmAddHandler(div);
                            listAddHandler(div);
                            gridAddHandler(div);
                            buttonAddHandler(div);
                            $(div).triggerHandler('loaded');
                            formDisplay(div, true);
                            options.blnFormLoad = false;
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
            //            formDisplay(div, false);
            //            changeElementId(div);
            //            init(div, function (r) {
            //                frmAddHandler(div);
            //                listAddHandler(div);
            //                gridAddHandler(div);
            //                buttonAddHandler(div);
            //                $(div).triggerHandler('loaded');
            //                formDisplay(div, true);
            //                options.blnFormLoad = false;
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
    //frmAddHandler
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
    //檢核table 存不存在
    function getTableName(data, tbName) {
        var keys = Object.keys(data);
        var kLengths = keys.length
        var table;
        for (var i = 0 ; i < kLengths; i++) {
            if (keys[i].toUpperCase() == tbName.toUpperCase()) {
                table = keys[i];
                break;
            };
        };
        if (table == null) return;
        return table
    };
    //來電參考號轉換fWipType
    function transRefNo(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.fContact == false || options.refNo == 0) {
                options.fWipType = 1;
                options.refNo = 5;
            }
            else {
                switch (options.refNo) {
                    case 5, 11:
                        options.fWipType = 1;
                        break;
                    case 32:
                        options.fWipType = 2;
                        break;
                    case 25:
                        options.fWipType = 3;
                        break;
                    case 16:
                        options.fWipType = 4;
                        break;
                    case 33:
                        options.fWipType = 5;
                        break;
                    case 43:
                        options.fWipType = 6;
                        break;
                    case 47:
                        options.fWipType = 7;
                        break;
                    case 56:
                        options.fWipType = 8;
                        break;
                    case 57:
                        options.fWipType = 9;
                        break;
                    default:
                        options.fWipType = 1;
                        break;
                };
            };
        }
        catch (err) {
            errorHandle(formName, 'transRefNo', err);
        }
    };
    //init
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            //語系檔
            changeLanguage(div, formName);
            //傳入參數
            var data = options.parameters;
            //是否有傳入來電資料Contact
            var table = getTableName(data, 'Contact');
            if (table != null) {
                options.fContact = true;
                options.Contact = data.Contact;
            };
            //來電參考號轉換fwipType
            transRefNo(div);
            //Custid
            if (data.ChargeClose.rows[0]['CustId'.toUpperCase()] != null) {
                options.fCustId = data.ChargeClose.rows[0]['CustId'.toUpperCase()];
            };
            //SNO
            if (data.ChargeClose.rows[0]['SNo'.toUpperCase()] != null) {
                options.fSNo = data.ChargeClose.rows[0]['SNo'.toUpperCase()];
            };
            //faciSeqNo
            if (options.fContact == true) {
                if (data.Contact.rows[0]['FaciSeqNo'.toUpperCase()] != null) {
                    options.fFaciSeqNo = data.Contact.rows[0]['FaciSeqNo'.toUpperCase()];
                };
            };
            //render元件
            renderControl(div);
            //resize
            $(options.container).on('resize', function () {
                formResize(div);
            });
            formResize(div);
            //預設結清日
            if (options.fResvTime == null) {
                getControlObject(div, 'tTranDate').csDateTime('setDate', formatDateTime(new Date(), 'yyyyMMdd', true));
            }
            else {
                getControlObject(div, 'tTranDate').csDateTime('setDate', formatDateTime(options.fResvTime, 'yyyyMMdd', true));
            };
            //取回畫面所需資料
            queryAllLoadedData(div, function (r) {
                defaultValue(div);
                action(true);
            });
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function disabledFields(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, "btnOk").jqxButton({ disabled: getUserPriv(options.initData.Privs, "SO1100O1") != true });
            //disableAllFieldPriv(options.controls, options.initData.Privs, options.initData[userPrivTableName]);

        }
        catch (err) {
            errorHandle(formName, 'disabledField', err);
        }
    }
    //帶預設值
    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var closeMonth = 0;
            var startMonth = 0;
            var settlePenalAmtCancel = 0;
            var closeNoCancel = 0;
            var processPriv = false;
            var closeItem = null;
            var startPVOD = 0;
            var chPromCloseallFaci = 0;

            var data = options.initData.System;
            if (data != null) {
                if (options.initData.System.rows.length > 0) {
                    var row = data.rows[0];
                    if (row['CloseMonth'.toUpperCase()] != null && row['CloseMonth'.toUpperCase()] != '') {
                        closeMonth = row['CloseMonth'.toUpperCase()];
                    };
                    if (row['StartMonth'.toUpperCase()] != null && row['StartMonth'.toUpperCase()] != '') {
                        startMonth = row['StartMonth'.toUpperCase()];
                    };
                    if (row['SettlePenalAmtCancel'.toUpperCase()] != null && row['SettlePenalAmtCancel'.toUpperCase()] != '') {
                        settlePenalAmtCancel = row['SettlePenalAmtCancel'.toUpperCase()];
                    };
                    if (row['CloseNoCancel'.toUpperCase()] != null && row['CloseNoCancel'.toUpperCase()] != '') {
                        closeNoCancel = row['CloseNoCancel'.toUpperCase()];
                    };
                    if (row['CloseItem'.toUpperCase()] != null && row['CloseItem'.toUpperCase()] != '') {
                        closeItem = row['CloseItem'.toUpperCase()];
                    };
                    if (row['StartPVOD'.toUpperCase()] != null && row['StartPVOD'.toUpperCase()] != '') {
                        startPVOD = row['StartPVOD'.toUpperCase()];
                    };
                    if (row['ChPromCloseallFaci'.toUpperCase()] != null && row['ChPromCloseallFaci'.toUpperCase()] != '') {
                        chPromCloseallFaci = row['ChPromCloseallFaci'.toUpperCase()];
                    };
                };
            };
            options.startPVOD = startPVOD;
            options.chPromCloseallFaci = chPromCloseallFaci;

            if (settlePenalAmtCancel == 0) {
                //chkPenal
                getControlObject(div, 'chkPenal').jqxCheckBox("disabled", true);
                //csSTCode
                getControlObject(div, 'csSTCode').csList("disabled", true);
            };
            if (closeNoCancel == 0) {
                getControlObject(div, 'chkTback').jqxCheckBox("checked", true);
            };
            for (var i = 0; i < options.initData.Privs.rows.length; i++) {
                if (options.initData.Privs.rows[i]['MID'] == 'SO1100O3') {
                    if (options.initData.Privs.rows[i]['GROUPX'] == '1') {
                        processPriv = true;
                    };
                };
            };
            //預設計算基礎
            options.fCalcType = 1;
            if (options.fWipType == 1 || options.fWipType == 3 || options.fWipType == 4) {
                getControlObject(div, 'cboProcess').jqxComboBox('clear');
                var intIndex = 0;
                getControlObject(div, 'cboProcess').jqxComboBox('insertAt', lang.displayType1, intIndex);
                intIndex += 1;
                getControlObject(div, 'cboProcess').jqxComboBox('insertAt', lang.displayType2, intIndex);
                intIndex += 1;
                getControlObject(div, 'cboProcess').jqxComboBox("selectIndex", 0);
            }
            else {
                if (closeMonth == 1 && options.fOrder == false) {
                    getControlObject(div, 'cboProcess').jqxComboBox('clear');
                    //權限有開才能做以日計算
                    var intIndex = 0;
                    if (processPriv || options.fWipType == 0 || options.fContact == false) {
                        getControlObject(div, 'cboProcess').jqxComboBox('insertAt', lang.displayType1, intIndex);
                        intIndex += 1;
                        getControlObject(div, 'cboProcess').jqxComboBox('insertAt', lang.displayType2, intIndex);
                        intIndex += 1;
                    }
                    else {
                        options.fCalcType = 3;
                    };
                    if (options.fWipType > 0) {
                        getControlObject(div, 'cboProcess').jqxComboBox('insertAt', lang.displayType3, intIndex);
                    };
                    getControlObject(div, 'cboProcess').jqxComboBox("selectIndex", 0);
                }
                else {
                    var intIndex = 0;
                    getControlObject(div, 'cboProcess').jqxComboBox('insertAt', lang.displayType1, intIndex);
                    intIndex += 1;
                    getControlObject(div, 'cboProcess').jqxComboBox('insertAt', lang.displayType2, intIndex);
                    intIndex += 1;
                    getControlObject(div, 'cboProcess').jqxComboBox("selectIndex", 0);
                };
            };
            if (startMonth == 0) {
                getControlObject(div, 'cboProcess').jqxComboBox("disabled", true);
            };

            //未收補收
            if (options.fWipType == 3) {
                getControlObject(div, 'chkTback').jqxCheckBox("disabled", true);
            };
            var promCloseType = '';
            for (var i = 0; i < options.initData.SystemWip.rows.length; i++) {
                if (isEmpty(options.initData.SystemWip.rows[i]['PROMCLOSETYPE']) == false) {
                    if (options.initData.SystemWip.rows[i]['PROMCLOSETYPE'] == 1) {
                        promCloseType = promCloseType + "," + options.initData.SystemWip.rows[i]['SERVICETYPE'];
                    };
                };
            };
            options.promCloseType = promCloseType;
            if (isEmpty(options.promCloseType) == false) {
                if (options.promCloseType.substr(0, 1) == ',') {
                    options.promCloseType = options.promCloseType.substr(1);
                };
            };
            //退費轉出
            if (isEmpty(closeItem) == false) {
                var closeItems = closeItem.split(",");
                for (var i = 0 ; i < closeItems.length; i++) {
                    if (options.refNo == closeItems[i]) {
                        getControlObject(div, 'chkRollOut').jqxCheckBox("checked", true);
                    };
                };
            };
            //預設日數計算原則
            getControlObject(div, 'cboSTType').jqxComboBox("selectIndex", 0);
            if (options.initData.SystemCharge.rows.length > 0) {
                if (options.initData.SystemCharge.rows[0]['PARA16'] == 1) {
                    if (options.initData.SystemCharge.rows[0]['PARA17'] == 0) {
                        getControlObject(div, 'cboSTType').jqxComboBox("selectIndex", 1);
                    }
                    else {
                        getControlObject(div, 'cboSTType').jqxComboBox("selectIndex", 2);
                    };
                };
            };
            //options.initData.Charge  add column choose
            options.initData.Charge.columns.push({ name: "CHOOSE", type: 'integer', defaults: 0 });
            //傳入設備流水號預設勾選 參考號32,57除外
            if (options.fWipType == 2 || options.fWipType == 8 || options.fWipType == 9) { }
            else {
                if (options.initData.Charge.rows.length > 0) {
                    for (var i = 0; i < options.initData.Charge.rows.length; i++) {
                        if (isEmpty(options.fFaciSeqNo) == false) {
                            if (options.initData.Charge.rows[i]["FACISEQNO"] == options.fFaciSeqNo) {
                                options.initData.Charge.rows[i]["CHOOSE"] = 1;
                            }
                            else {
                                options.initData.Charge.rows[i]["CHOOSE"] = 0;
                            };
                        }
                        else {
                            options.initData.Charge.rows[i]["CHOOSE"] = 0;
                        };
                    };
                };
            };
            //綁定Grid資料
            refreshGrid(div);
            //預設處理項目
            if (getControlObject(div, 'cboProcessItem').jqxComboBox('disabled') == true) {
                getControlObject(div, 'cboProcessItem').jqxComboBox('clear');
                switch (options.fWipType) {
                    case 1:
                        getControlObject(div, 'cboProcessItem').jqxComboBox('insertAt', lang.processItem1, 0);
                        break;
                    case 2:
                        getControlObject(div, 'cboProcessItem').jqxComboBox('insertAt', lang.processItem2, 0);
                        break;
                    case 3:
                        getControlObject(div, 'cboProcessItem').jqxComboBox('insertAt', lang.processItem3, 0);
                        break;
                    case 4:
                        getControlObject(div, 'cboProcessItem').jqxComboBox('insertAt', lang.processItem4, 0);
                        break;
                    case 5:
                        getControlObject(div, 'cboProcessItem').jqxComboBox('insertAt', lang.processItem5, 0);
                        break;
                    case 6:
                        getControlObject(div, 'cboProcessItem').jqxComboBox('insertAt', lang.processItem6, 0);
                        break;
                    case 7:
                        getControlObject(div, 'cboProcessItem').jqxComboBox('insertAt', lang.processItem7, 0);
                        break;
                    case 8:
                        getControlObject(div, 'cboProcessItem').jqxComboBox('insertAt', lang.processItem8, 0);
                        break;
                    case 9:
                        getControlObject(div, 'cboProcessItem').jqxComboBox('insertAt', lang.processItem9, 0);
                        break;
                    default:
                        getControlObject(div, 'cboProcessItem').jqxComboBox('insertAt', lang.processItem1, 0);
                        break;
                };
                getControlObject(div, 'cboProcessItem').jqxComboBox("selectIndex", 0);
            }
            else {
                switch (options.fWipType) {
                    case 1:
                        getControlObject(div, 'cboProcessItem').jqxComboBox("selectIndex", 0);
                        break;
                    case 2:
                        getControlObject(div, 'cboProcessItem').jqxComboBox("selectIndex", 1);
                        break;
                    default:
                        getControlObject(div, 'cboProcessItem').jqxComboBox("selectIndex", 0);
                        break;
                };
            };
            //綁定csList資料
            if (options.initData.ChevenCode.rows.length > 0) {
                getControlObject(div, 'csChevenCode').csList('source', options.initData.ChevenCode.rows);
                getControlObject(div, 'csChevenCode').csList("selectedIndex", 0);
            };
            if (options.initData.STCode.rows.length > 0) {
                getControlObject(div, 'csSTCode').csList('source', options.initData.STCode.rows);
            };
        }
        catch (err) {
            errorHandle(formName, 'defaultValue', err);
        }
    };
    //取回畫面所有資料
    function queryAllLoadedData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            //var dateValue = dateToJson(formatDateTime(getControlObject(div, 'tTranDate').csDateTime('getDate'), 'yyyyMMdd'));
            var dateValue = dateToJson(getControlObject(div, 'tTranDate').csDateTime('getDate'));
            var parameters = $.extend({}, paraLoginInfo, {
                Custid: { type: 'integer', value: convertToNull(options.fCustId) },
                CloseDate: { type: 'datetime', value: convertToNull(dateValue) },
                WipType: { type: 'integer', value: convertToNull(options.fWipType) },
                BackSNO: { type: 'string', value: convertToNull(options.fBackSNO) },
                DoUCFlag: { type: 'integer', value: convertToNull(options.fDoUCFlag) },
                DoPeriod: { type: 'integer', value: convertToNull(options.fDoPeriod) }
            });

            var params = getParameters(riadllName,
                riaClassName,
                'GetQueryFormData',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ResultBoolean == true && data.ResultXML != null) {
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
            errorHandle(formName, 'queryAllLoadedData', err);
        }
    };
    //renderControl畫面元件
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
            var lCaption = [];
            $(div).css('overflow', 'hidden');
            //建立Panel
            oArray = ["gbxData"];
            var oHightArray = [$(div).height() - 8];
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

            //建立內層Expander
            //oArray = ["gbxCharge", "gbxPresent", "gbxProdCharge"];
            //oWidthArray = ["99.5%", "99.5%", "99.5%"];
            oArray = ["gbxCharge", "gbxProdCharge"];
            oWidthArray = ["99.5%", "99.5%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxExpander({
                    theme: options.theme,
                    showArrow: false,
                    expanded: true,
                    toggleMode: 'none',
                    width: oWidthArray[i]
                });
                $('#' + iId).jqxExpander('setHeaderContent', lang[oArray[i]]);
                controls.push({ name: iId, type: 'jqxExpander', level: level });
            }
            level += 1;

            oArray = ["gbxClosePara"];
            var oHightArray = ["99.5%"];
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
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        $('#' + iId + scrollBars[j]).css('display', 'none');
                    }
                }
            }
            level += 1;

            //建立ComboBox
            var blnDo = true;
            //無來電資料且非訂單進入
            if (options.fContact == false && options.fOrder == false) {
                blnDo = false;
            };
            if (IsNullOrEmpty(options.fBackSNO) == false) {
                blnDo = true;
            };

            oArray = ["cboSTType", "cboProcess", "cboProcessItem"];
            oWidthArray = ["50%", "60%", "65%"];
            var oDisable = [true, false, blnDo];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var source;
                switch (oArray[i]) {
                    case "cboSTType":
                        source = [lang.stType1, lang.stType2, lang.stType3];
                        break;
                    case "cboProcess":
                        source = [lang.displayType1, lang.displayType2];
                        break;
                    case "cboProcessItem":
                        //source = [lang.processItem1, lang.processItem2, lang.processItem3, lang.processItem4, lang.processItem5, lang.processItem6, lang.processItem7, lang.processItem8, lang.processItem9];
                        source = [lang.processItem1, lang.processItem2];
                        break;
                }
                $('#' + iId).jqxComboBox({
                    source: source,
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: oDisable[i]
                });
                controls.push({ name: iId, type: 'jqxComboBox', level: level });
            }
            level += 1;

            //建立日期元件
            oArray = ["tTranDate"];
            oWidthArray = ["50%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var fs = "yyyy/MM/dd";
                var disabled = false;
                if (options.fOrder == true) { disabled = true; };
                $('#' + iId).csDateTime({
                    theme: options.theme,
                    formatString: fs,
                    showCalendarButton: true,
                    value: null,
                    height: textHeight,
                    disabled: disabled,
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csDateTime', level: level });
            }
            level += 1;

            //建立CheckBox
            oArray = ["chkTback", "chkRollOut", "chkPenalAmt", "chkPenal"];//, "chkNatural"
            oWidthArray = ["100", "100", "100", "100", "100"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).text(lang[oArray[i]]);
                $('#' + iId).jqxCheckBox({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i]
                });

                controls.push({ name: iId, type: 'jqxCheckBox', level: level });
            }
            level += 1;

            //建立單選元件
            oArray = ["csChevenCode", "csSTCode"];
            oWidthArray = ["60%", "60%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 50,
                    width: oWidthArray[i]
                });
                $('#' + iId).css({ "margin-left": 0 });
                controls.push({ name: iId, type: 'csList', level: level });
            }
            level += 1;

            //建立按鈕
            oArray = ["btnOk", "btnExit", "btnCalculate"];  //, "btnFaci"  多階
            oDisable = [true, false, false];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var text = lang[oArray[i]];
                switch (oArray[i]) {
                    case "btnOk":
                        img = imageScr.ok;
                        break;
                        //case "btnFaci":
                        //    img = imageScr.query;
                        //    break;
                    case "btnExit":
                        img = imageScr.exit;
                        break;
                    default:
                }
                if (text != null) o.text(text);
                var bOptions = $.extend({}, {
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight,
                    disabled: oDisable[i]
                }, img);
                if (isEmpty(text) != true) {
                    $.extend(bOptions, imagePosition);
                }
                o.jqxButton(bOptions);
                $('#' + bId).find('img').css('top', (buttonsHeight - $('#' + bId).find("img").height()) / 2 - 1);
                controls.push({ name: bId, type: 'jqxButton', level: level });
            }
            level += 1;

            renderChargeGrid(div, level);
            level += 1;

            renderProdChargeGrid(div, level);
            level += 1;

            options.level = level;

            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    //render收費grid
    function renderChargeGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'gCharge';
            options.gCharge = {
                datatype: "json",
                datafields: [
                    { name: 'CHOOSE', type: 'boolean' },
                    //{ name: 'PROMNAME', type: 'string' },
                    { name: 'BPNAME', type: 'string' },
                    { name: 'FACISNO', type: 'string' },
                    { name: 'PRODUCTNAME', type: 'string' },
                    { name: 'CITEMNAME', type: 'string' },
                    { name: 'SHOULDDATE', type: 'date' },
                    { name: 'REALPERIOD', type: 'int' },
                    { name: 'SHOULDAMT', type: 'float' },
                    { name: 'REALSTARTDATE', type: 'date' },
                    { name: 'REALSTOPDATE', type: 'date' },
                    { name: 'REALDATE', type: 'date' },
                    { name: 'REALAMT', type: 'float' },
                    { name: 'PROFACISTR', type: 'string' },
                    { name: 'MID', type: 'string' },
                    { name: 'FACISEQNO', type: 'string' },
                ]
            };
            //var modeIdRender = function (row, columnfield, value, defaulthtml, columnproperties) {
            //    var r;
            //    switch (value) {
            //        case 0:
            //            r = lang.modeID1;
            //            break;
            //        case 1:
            //            r = lang.modeID2;
            //            break;
            //        default:
            //            break;
            //    }
            //    var dh = $(defaulthtml);
            //    dh.text(r);
            //    return dh[0].outerHTML;
            //}
            var dataAdapter = new $.jqx.dataAdapter(options.gCharge);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '99%',
                source: dataAdapter,
                sortable: false,
                altrows: true,
                columnsresize: true,
                columnsautoresize: true,
                filterable: false,
                editable: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                columns: [
                    getGridRowNumberColumn(null, 30),
                    getGridCheckBoxColumn(gridId),
                  //{ text: lang.gCharge_PROMNAME, datafield: 'PROMNAME', editable: false, width: 120 },
                  { text: lang.gCharge_BPNAME, datafield: 'BPNAME', editable: false, width: 120 },
                  { text: lang.gCharge_FACISNO, datafield: 'FACISNO', editable: false, width: 100 },
                  { text: lang.gCharge_PRODUCTNAME, datafield: 'PRODUCTNAME', editable: false, width: 100 },
                  { text: lang.gCharge_CITEMNAME, datafield: 'CITEMNAME', editable: false, width: 100 },
                  { text: lang.gCharge_SHOULDDATE, datafield: 'SHOULDDATE', editable: false, width: 90, cellsformat: "yyyy/MM/dd" },
                  { text: lang.gCharge_REALPERIOD, datafield: 'REALPERIOD', editable: false, width: 50, cellsalign: 'right', align: 'right' },
                  { text: lang.gCharge_SHOULDAMT, datafield: 'SHOULDAMT', editable: false, width: 90, cellsformat: "d", cellsalign: 'right', align: 'right' },
                  { text: lang.gCharge_REALSTARTDATE, datafield: 'REALSTARTDATE', editable: false, width: 90, cellsformat: "yyyy/MM/dd" },
                  { text: lang.gCharge_REALSTOPDATE, datafield: 'REALSTOPDATE', editable: false, width: 90, cellsformat: "yyyy/MM/dd" },
                  { text: lang.gCharge_REALDATE, datafield: 'REALDATE', editable: false, width: 90, cellsformat: "yyyy/MM/dd" },
                  { text: lang.gCharge_REALAMT, datafield: 'REALAMT', editable: false, width: 100 },
                  { text: lang.gCharge_PROFACISTR, datafield: 'PROFACISTR', editable: false, width: 100 },

                  { text: 'MID', datafield: 'MID', editable: false, width: 100, hidden: true },
                  { text: 'FACISEQNO', datafield: 'FACISEQNO', editable: false, width: 100, hidden: true },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });

            //$('#' + gridId).jqxGrid($.extend(options.gCharge, handleKeyboardNavigation(gridId, options.gCharge.datafields, true)));
        }
        catch (err) {
            errorHandle(formName, 'renderChargeGrid', err);
        }
    };
    //render試算結果grid
    function renderProdChargeGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'gProdCharge';
            options.gProdCharge = {
                datatype: "json",
                datafields: [
                    //{ name: 'CHOOSE', type: 'boolean' },
                    { name: 'CANCEL', type: 'int' },
                    { name: 'CITEMNAME', type: 'string' },
                    { name: 'SHOULDDATE', type: 'date' },
                    { name: 'REALPERIOD', type: 'int' },
                    { name: 'SHOULDAMT', type: 'float' },
                    { name: 'REALSTARTDATE', type: 'date' },
                    { name: 'REALSTOPDATE', type: 'date' },
                    { name: 'FACISNO', type: 'string' },
                    { name: 'CLOSENOTE', type: 'string' },
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.gProdCharge);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '99%',
                source: dataAdapter,
                sortable: false,
                altrows: true,
                columnsresize: true,
                columnsautoresize: true,
                filterable: false,
                editable: false,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.gbxProdCharge_CANCEL, datafield: 'CANCEL', columntype: 'checkbox', editable: false, width: 50 },
                  { text: lang.gbxProdCharge_CITEMNAME, datafield: 'CITEMNAME', editable: false, width: 120 },
                  { text: lang.gbxProdCharge_SHOULDDATE, datafield: 'SHOULDDATE', editable: false, width: 90, cellsformat: "yyyy/MM/dd" },
                  { text: lang.gbxProdCharge_REALPERIOD, datafield: 'REALPERIOD', editable: false, width: 50, cellsalign: 'right', align: 'right' },
                  { text: lang.gbxProdCharge_SHOULDAMT, datafield: 'SHOULDAMT', editable: false, width: 90, cellsalign: 'right', align: 'right' },
                  { text: lang.gbxProdCharge_REALSTARTDATE, datafield: 'REALSTARTDATE', editable: false, width: 90, cellsformat: "yyyy/MM/dd" },
                  { text: lang.gbxProdCharge_REALSTOPDATE, datafield: 'REALSTOPDATE', editable: false, width: 90, cellsformat: "yyyy/MM/dd" },
                  { text: lang.gbxProdCharge_FACISNO, datafield: 'FACISNO', editable: false, width: 90 },
                  { text: lang.gbxProdCharge_CLOSENOTE, datafield: 'CLOSENOTE', editable: false, width: 150 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
            //options.controls.push({ name: $(div).prop('id') + 'gCustRate', type: 'jqxGrid', level: level });
            //$('#' + gridId).jqxGrid($.extend(options.gProdCharge, handleKeyboardNavigation(gridId, options.gProdCharge.datafields, true)));

        }
        catch (err) {
            errorHandle(formName, 'renderProdChargeGrid', err);
        }
    };
    //grid資料綁定
    function refreshGrid(div) {
        try {
            var options = $.data(div, formName).options;
            var grids = ["gCharge", "gProdCharge"];
            var sources = ["gCharge", "gProdCharge"];
            var tables = ["Charge", "RtnCharge"];
            for (var i = 0; i < grids.length; i++) {
                options[grids[i]].localdata = options.initData[tables[i]].rows;
                getControlObject(div, grids[i]).jqxGrid('updatebounddata');
                if (options[grids[i]].localdata.length > 0) {
                    getControlObject(div, grids[i]).jqxGrid('selectrow', 0);
                };
            };
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };
    //取回結清收費資料
    function queryCharge(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var dateValue = dateToJson(getControlObject(div, 'tTranDate').csDateTime('getDate'));
            var parameters = $.extend({}, paraLoginInfo, {
                Custid: { type: 'integer', value: convertToNull(options.fCustId) },
                CloseDate: { type: 'datetime', value: convertToNull(dateValue) },
                WipType: { type: 'integer', value: convertToNull(options.fWipType) },
                CalcType: { type: 'integer', value: convertToNull(options.fCalcType) },
                BackSNO: { type: 'string', value: convertToNull(options.fBackSNO) },
                DoUCFlag: { type: 'integer', value: convertToNull(options.fDoUCFlag) },
                DoPeriod: { type: 'integer', value: convertToNull(options.fDoPeriod) }
            });

            var params = getParameters(riadllName,
                riaClassName,
                'QueryCharge',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        if (data.ResultBoolean == true && data.ResultXML != null) {
                            var r = JSON.parse(data.ResultXML);
                            var tables = ['Charge', 'RtnCharge', 'ChooseFacility'];
                            var tLength = tables.length;
                            for (var i = 0; i < tLength; i++) {
                                delete options.initData[tables[i]];
                                if (r[tables[i]] != null) {
                                    options.initData[tables[i]] = cloneJSON(r[tables[i]]);
                                };
                            };
                            refreshGrid(div);

                            action(true);
                        }
                        else {
                            action(false);
                        };
                    }
                    catch (err) {
                        errorHandle(formName, 'queryCharge', err);
                        action(false, err);
                    }
                    finally {
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };

                }
            });
        }
        catch (err) {
            errorHandle(formName, 'queryCharge', err);
        }
    };
    //listAddHandler
    function listAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //結清日
            getControlObject(div, 'tTranDate').on('dateChanged', function (event) {
                if (options.blnFormLoad == true) { return; };
                getControlObject(div, 'btnOk').jqxButton('disabled', true);
                if (isEmpty(getControlObject(div, 'tTranDate').csDateTime('getDate'))) { return; };
                //var itemValue = event.target.value;
                //itemValue = itemValue.replace(/\D*/g, '');
                options.dicsyncChoose = null;
                queryCharge(div, function (isOK) {
                    if (isOK) {
                        //options.initData.Charge  add column choose
                        options.initData.Charge.columns.push({ name: "CHOOSE", type: 'integer', defaults: 0 });
                        //傳入設備流水號預設勾選 參考號32,57除外
                        if (options.fWipType == 2 || options.fWipType == 8 || options.fWipType == 9) { }
                        else {
                            if (options.initData.Charge.rows.length > 0) {
                                for (var i = 0; i < options.initData.Charge.rows.length; i++) {
                                    if (isEmpty(options.fFaciSeqNo) == false) {
                                        if (options.initData.Charge.rows[i]["FACISEQNO"] == options.fFaciSeqNo) {
                                            options.initData.Charge.rows[i]["CHOOSE"] = 1;
                                        }
                                        else {
                                            options.initData.Charge.rows[i]["CHOOSE"] = 0;
                                        };
                                    }
                                    else {
                                        options.initData.Charge.rows[i]["CHOOSE"] = 0;
                                    };
                                };
                            };
                        };
                        refreshGrid(div);
                    };
                });
            });
            //計算基礎
            getControlObject(div, 'cboProcess').on('change', function (event) {
                if (options.blnFormLoad == true) { return; };
                getControlObject(div, 'btnOk').jqxButton('disabled', true);
                var args = event.args;
                var item = args.item;
                if (item.label == lang.displayType1) {
                    options.fCalcType = 1;
                }
                else if (item.label == lang.displayType2) {
                    options.fCalcType = 2;
                }
                else {
                    options.fCalcType = 3;
                };
                options.dicsyncChoose = null;
                queryCharge(div, function (isOK) {
                    if (isOK) {

                    };
                });

            });
            //處理項目
            getControlObject(div, 'cboProcessItem').on('change', function (event) {
                if (options.blnFormLoad == true) { return; };
                getControlObject(div, 'btnOk').jqxButton('disabled', true);
                var args = event.args;
                var item = args.item;

                switch (item.label) {
                    case lang.processItem1:
                        options.fWipType = 1;
                        options.refNo = 5;
                        break;
                    case lang.processItem2:
                        options.fWipType = 2;
                        options.refno = 32;
                        break;
                    case lang.processItem3:
                        options.fWipType = 3;
                        break;
                    case lang.processItem4:
                        options.fWipType = 4;
                        break;
                    case lang.processItem5:
                        options.fWipType = 5;
                        break;
                    case lang.processItem6:
                        options.fWipType = 6;
                        break;
                    case lang.processItem7:
                        options.fWipType = 7;
                        break;
                    case lang.processItem8:
                        options.fWipType = 8;
                        break;
                    case lang.processItem9:
                        options.fWipType = 9;
                        break;
                    default:
                        options.fWipType = 1;
                        break;
                };
                options.dicsyncChoose = null;
                queryCharge(div, function (isOK) {
                    if (isOK) {

                    };
                });

            });
            //結清原因
            getControlObject(div, 'csChevenCode').on('selectedIndexChanged', function (event) {
                if (options.blnFormLoad == true) { return; };
                getControlObject(div, 'btnOk').jqxButton('disabled', true);
            });
            //短收原因
            getControlObject(div, 'csSTCode').on('selectedIndexChanged', function (event) {
                if (options.blnFormLoad == true) { return; };
                getControlObject(div, 'btnOk').jqxButton('disabled', true);
            });
            //未收部分補收
            getControlObject(div, 'chkTback').on('change', function (event) {
                if (options.blnFormLoad == true) { return; };
                getControlObject(div, 'btnOk').jqxButton('disabled', true);
            });
            //退費是否轉出
            getControlObject(div, 'chkRollOut').on('change', function (event) {
                if (options.blnFormLoad == true) { return; };
                getControlObject(div, 'btnOk').jqxButton('disabled', true);
            });
            //僅顯示違約金
            getControlObject(div, 'chkPenalAmt').on('change', function (event) {
                if (options.blnFormLoad == true) { return; };
                getControlObject(div, 'btnOk').jqxButton('disabled', true);
            });
            //不產生違約金
            getControlObject(div, 'chkPenal').on('change', function (event) {
                if (options.blnFormLoad == true) { return; };
                getControlObject(div, 'btnOk').jqxButton('disabled', true);
            });

        }
        catch (err) {
            errorHandle(formName, "listAddHandler", err);
        }
    };
    //gridAddHandler
    function gridAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //勾選收費連動
            getControlObject(div, 'gCharge').on('cellvaluechanged', function (event) {
                getControlObject(div, 'btnOk').jqxButton('disabled', true);
                // event arguments.
                var args = event.args;
                // column data field.
                var dataField = event.args.datafield;
                // row's bound index.
                var rowBoundIndex = args.rowindex;
                // new cell value.
                var value = args.newvalue;
                // row's data.
                //var rowData = args.row;
                var rowData = getControlObject(div, 'gCharge').jqxGrid('getrowdata', rowBoundIndex);
                //mid PK值
                var mid = rowData.MID;
                var serviceType = '';
                var faciSeqNo = rowData.FACISEQNO;
                var faciRefNo = '';

                var blnOK = true;
                options.dicsyncChoose = ',';
                options.itemPos = ',';
                options.returnData = '';

                if (dataField != 'CHOOSE') { return; };

                for (var i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (options.initData.Charge.rows[i]['MID'] == mid) {
                        serviceType = options.initData.Charge.rows[i]['SERVICETYPE'];
                        faciRefNo = options.initData.Charge.rows[i]['FACIREFNO'];

                        //var row = options.initData.Charge.rows[i];
                        if (value == true) {
                            options.initData.Charge.rows[i][dataField] = 1;
                        }
                        else {
                            options.initData.Charge.rows[i][dataField] = 0;
                        };
                        options.returnData = ',' + i;
                        checkSyncData(div, ',' + i, options.initData.Charge.rows[i][dataField], true, true, function (isOK) {
                            if (isOK == false) {
                                if (value == true) {
                                    options.initData.Charge.rows[i][dataField] = 0;
                                }
                                else {
                                    options.initData.Charge.rows[i][dataField] = 1;
                                };
                                checkSyncData(div, ',' + i, options.initData.Charge.rows[i][dataField], true, false, function (isOK) { });
                            };
                        });
                    };
                };
                if (isEmpty(options.returnData)) {
                    refreshGrid(div);
                }
                else {
                    if (value == true) {
                        checkSyncDataOK(div, true, true, function (x) {
                            if (x[0] == true) {
                                //無錯誤繼續第二段資料檢核
                                checkSyncDataOK2(div, serviceType, faciSeqNo, faciRefNo, true, true, function (y) {
                                    if (y[0] == true) {
                                        //無錯誤
                                        refreshGrid(div);
                                    }
                                    else {
                                        //異動CHOOSE狀態
                                        var varAry = options.returnData.split(',');
                                        for (var i = 0 ; i < varAry.length; i++) {
                                            if (isEmpty(varAry[i]) == false) {
                                                options.initData.Charge.rows[varAry[i]][dataField] = 0;
                                            };
                                        };
                                        refreshGrid(div);
                                    };
                                });
                            }
                            else {
                                //異動CHOOSE狀態
                                var varAry = options.returnData.split(',');
                                for (var i = 0 ; i < varAry.length; i++) {
                                    if (isEmpty(varAry[i]) == false) {
                                        options.initData.Charge.rows[varAry[i]][dataField] = 0;
                                    };
                                };
                                refreshGrid(div);
                            };
                        });
                    }
                    else {
                        refreshGrid(div);
                    };
                };

            });
        }
        catch (err) {
            errorHandle(formName, "gridAddHandler", err);
        }
    };
    //buttonAddHandler
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;

            //試算
            //btnCalculate
            getControlObject(div, 'btnCalculate').on('click', function () {
                if (options.blnFormLoad == true) { return; };
                if (checkSaveDataOk(div) != true) return;
                var tranDate = getControlObject(div, 'tTranDate').csDateTime('getText');
                if (tranDate == null || tranDate == undefined) {
                    messageBox(lang.mustTranDate, messageType.critical);
                    return
                };

                if (options.initData.ChooseCharge != null) {
                    delete options.initData.ChooseCharge;
                };
                if (options.initData.Para != null) {
                    delete options.initData.Para;
                };
                if (options.initData.ClosePresent != null) {
                    delete options.initData.ClosePresent;
                };
                if (options.initData.ChoosePresent != null) {
                    delete options.initData.ChoosePresent;
                };

                options.initData.Para = getParaData(div);
                options.initData.ChooseCharge = getCheckedData(div);
                if (options.fContact) {
                    options.initData.Contact = options.Contact;
                };

                queryCalcCloseData(div, function (r) {
                    if (r[0] == false) {
                        messageBox(r[1], messageType.critical);
                        getControlObject(div, 'btnOk').jqxButton('disabled', true);
                    }
                    else {
                        refreshGrid(div);
                        var showAmt = 0;
                        if (options.initData.RtnCharge.rows.length > 0) {
                            var rLength = options.initData.RtnCharge.rows.length;
                            for (var i = 0; i < rLength; i++) {
                                showAmt = showAmt + options.initData.RtnCharge.rows[i]["SHOULDAMT"];
                            };
                        };
                        getControlObject(div, 'tCloseAmt').text(showAmt);
                        if (showAmt < 0) {
                            getControlObject(div, 'tCloseAmt').css('color', '#FF0000');
                        } else {
                            getControlObject(div, 'tCloseAmt').css('color', '#000000');
                        };
                        getControlObject(div, 'btnOk').jqxButton('disabled', false);
                        disabledFields(div);
                    };
                });
            });
            //確定
            getControlObject(div, 'btnOk').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (options.initData.OriginalCharge == null && options.initData.RtnCharge.rows.length == 0) return;
                //試算無收費時,判斷勾選的費用截止日是否有小於結清日,只要有一筆則不可結清
                if (options.initData.RtnCharge.rows.length == 0) {
                    var rLength = options.initData.OriginalCharge.rows.length;
                    for (var i = 0; i < rLength; i++) {
                        if (isEmpty(options.initData.OriginalCharge.rows[i]["REALSTOPDATE"]) == false) {
                            if (options.initData.OriginalCharge.rows[i]["REALSTOPDATE"] < getControlObject(div, 'tTranDate').csDateTime('getDate')) {
                                return;
                            };
                        };
                    };
                };

                //從訂單
                if (options.fOrder) {

                }
                else {
                    //非訂單
                    //從互動進入
                    if (options.fContact) {
                        if (options.fWipType == 3 || options.fWipType == 4 || options.fWipType == 5 || options.fWipType == 6 || options.fWipType == 7) {
                            //裝機單
                            showInstWip(div, function (r) {
                                if (r.isSaved) {
                                    //var wipData = r.wipData;
                                    //delete options.wipData.OriginalCharge;
                                    options.isSaved = true;
                                    close(div);
                                }
                                else {
                                    messageBox(lang.closeErr, messageType.critical);
                                    close(div);
                                };
                            });
                        }
                        else {
                            //拆機單
                            showCloseWipSetting(div, function (r) {
                                if (r.isSaved) {
                                    var wipData = r.wipData;
                                    options.wipData = options.initData;
                                    options.wipData.ParaData = wipData.ParaData;
                                    options.wipData.CloseProduct = wipData.CloseProduct;
                                    options.wipData.CloseCharge = options.initData.RtnCharge;
                                    delete options.wipData.ChevenCode;
                                    delete options.wipData.STCode;
                                    delete options.wipData.System;
                                    delete options.wipData.SystemCharge;
                                    delete options.wipData.SystemWip;
                                    delete options.wipData.Privs;
                                    delete options.wipData.Charge;
                                    delete options.wipData.ChooseCharge;
                                    delete options.wipData.ChooseFacility;
                                    delete options.wipData.RtnCharge;
                                    delete options.wipData.OriginalCharge;

                                    save(div, function (x) {
                                        if (x[0]) {
                                            messageBox(lang.closeSuc);
                                            options.isSaved = true;
                                            close(div);
                                        }
                                        else {
                                            if (x[1] == null) {
                                                messageBox(lang.closeErr, messageType.critical);
                                            }
                                            else {
                                                messageBox(x[1], messageType.critical);
                                            };
                                            close(div);
                                        };
                                    });
                                }
                                else {
                                    messageBox(lang.closeErr, messageType.critical);
                                    close(div);
                                };
                            });
                        };
                    }
                    else {
                        var wipData = {};
                        wipData.CloseProduct = options.initData.OriginalCharge;
                        if (wipData.CloseProduct['TYPE'] != null) {
                            wipData.CloseProduct.columns = deleteRowByKeyValue(wipData.CloseProduct.columns, "name", "TYPE");
                        };
                        wipData.CloseCharge = options.initData.RtnCharge;
                        if (wipData.CloseCharge['OLDPPVSTOPDATE'] != null) {
                            wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "OLDPPVSTOPDATE");
                        };
                        if (wipData.CloseCharge['OLDPPVSTARTDATE'] != null) {
                            wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "OLDPPVSTARTDATE");
                        };
                        if (wipData.CloseCharge['OLDPPVPERIOD'] != null) {
                            wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "OLDPPVPERIOD");
                        };
                        if (wipData.CloseCharge['OLDAMOUNT'] != null) {
                            wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "OLDAMOUNT");
                        };
                        if (wipData.CloseCharge['PAYOK'] != null) {
                            wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "PAYOK");
                        };
                        if (wipData.CloseCharge['TAXFLAG'] != null) {
                            wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "TAXFLAG");
                        };
                        if (wipData.CloseCharge['CLOSEKIND'] != null) {
                            wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "CLOSEKIND");
                        };
                        if (wipData.CloseCharge['CANCEL'] != null) {
                            wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "CANCEL");
                        };
                        if (wipData.CloseCharge['SECONDTYPE'] != null) {
                            wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "SECONDTYPE");
                        };
                        wipData.ClosePeriodCycle = options.initData.ClosePeriodCycle;
                        wipData.Para = options.initData.Para;
                        options.wipData = wipData;
                        //options.isSaved = true;
                        //close(div);
                        save(div, function (x) {
                            if (x[0]) {
                                messageBox(lang.closeSuc);
                                options.isSaved = true;
                                close(div);
                            }
                            else {
                                if (x[1] == null) {
                                    messageBox(lang.closeErr, messageType.critical);
                                }
                                else {
                                    messageBox(x[1], messageType.critical);
                                };
                                close(div);
                            };
                        });

                    };
                };

            });
            //離開
            getControlObject(div, 'btnExit').on('click', function () {
                close(div);
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    //產生工單
    function save(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                dsCloseData: { type: 'string', value: JSON.stringify(options.wipData) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'SaveData2',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
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
            errorHandle(formName, 'save', err);
        }
    };
    //結清工單設定畫面
    function showCloseWipSetting(div, action) {
        try {
            var options = $.data(div, formName).options;
            var width = $(div).width();
            var height = $(div).height();
            var x = ($(options.container).width() - width) / 2;
            var y = 30;
            var winOptions = {
                width: width,
                height: height,
                minWidth: width / 2,
                minHeight: height / 2,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language['closeWipSetting'] + " [SO1132B1]", winOptions);
            var wipData = {};
            var objectName = 'SO1132B1';

            $('#' + win.windowId).on('close', function () {
                var r = $.data($('#' + win.contentId)[0], objectName).options;
                var isSaved = r.isSaved;
                //delete wipData;
                //delete wipData.CloseProduct;
                wipData.CloseProduct = r.wipData.CloseProduct;
                wipData.ParaData = r.wipData.ParaData;
                //wipData = r.wipData;
                $('#' + win.contentId)[objectName]('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                action({ isSaved: isSaved, wipData: wipData });
            });
            var tranDate = getControlObject(div, 'tTranDate').csDateTime('getText');
            var serviceTypeStr = null;

            if (options.initData.OriginalCharge.rows.length > 0) {
                var rLength = options.initData.OriginalCharge.rows.length;
                for (var i = 0; i < rLength; i++) {
                    if (isEmpty(serviceTypeStr)) {
                        serviceTypeStr = options.initData.OriginalCharge.rows[i]["SERVICETYPE"];
                    }
                    else {
                        if (serviceTypeStr.indexOf(options.initData.OriginalCharge.rows[i]["SERVICETYPE"]) < 0) {
                            serviceTypeStr = serviceTypeStr + ',' + options.initData.OriginalCharge.rows[i]["SERVICETYPE"];
                        };
                    };
                };
                if (serviceTypeStr.substr(0, 1) == ",") { serviceTypeStr = serviceTypeStr.substr(1); };
            }
            else {
                if (options.initData.RtnCharge.rows.length > 0) {
                    var rLength = options.initData.RtnCharge.rows.length;
                    for (var i = 0; i < rLength; i++) {
                        if (isEmpty(serviceTypeStr)) {
                            serviceTypeStr = options.initData.RtnCharge.rows[i]["SERVICETYPE"];
                        }
                        else {
                            if (serviceTypeStr.indexOf(options.initData.RtnCharge.rows[i]["SERVICETYPE"]) < 0) {
                                serviceTypeStr = serviceTypeStr + ',' + options.initData.RtnCharge.rows[i]["SERVICETYPE"];
                            };
                        };
                    };
                    if (serviceTypeStr.substr(0, 1) == ",") { serviceTypeStr = serviceTypeStr.substr(1); };
                };
            };

            if (options.fContact) { wipData.Contact = options.initData.Contact; };
            wipData.CloseProduct = options.initData.OriginalCharge;
            if (wipData.CloseProduct['TYPE'] != null) {
                wipData.CloseProduct.columns = deleteRowByKeyValue(wipData.CloseProduct.columns, "name", "TYPE");
            };
            wipData.CloseCharge = options.initData.RtnCharge;
            if (wipData.CloseCharge['OLDPPVSTOPDATE'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "OLDPPVSTOPDATE");
            };
            if (wipData.CloseCharge['OLDPPVSTARTDATE'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "OLDPPVSTARTDATE");
            };
            if (wipData.CloseCharge['OLDPPVPERIOD'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "OLDPPVPERIOD");
            };
            if (wipData.CloseCharge['OLDAMOUNT'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "OLDAMOUNT");
            };
            if (wipData.CloseCharge['PAYOK'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "PAYOK");
            };
            if (wipData.CloseCharge['TAXFLAG'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "TAXFLAG");
            };
            if (wipData.CloseCharge['CLOSEKIND'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "CLOSEKIND");
            };
            if (wipData.CloseCharge['CANCEL'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "CANCEL");
            };
            if (wipData.CloseCharge['SECONDTYPE'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "SECONDTYPE");
            };
            wipData.ClosePeriodCycle = options.initData.ClosePeriodCycle;
            wipData.Para = options.initData.Para;

            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                serviceTypeStr: serviceTypeStr,
                closeDate: tranDate,
                parameters: cloneJSON(wipData),
                theme: options.theme,
                localization: cloneJSON(options.localization)
            });
            options.controls.push({ name: win.contentId, type: objectName, level: options.level });
            options.level += 1;
        }
        catch (err) {
            errorHandle(formName, 'showCloseWipSetting', err);
        }
    };
    //裝機工單畫面
    function showInstWip(div, action) {
        try {
            var options = $.data(div, formName).options;
            var width = $(div).width();
            var height = $(div).height();
            var x = ($(options.container).width() - width) / 2;
            var y = 30;
            var winOptions = {
                width: width,
                height: height,
                minWidth: width / 2,
                minHeight: height / 2,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language['showInstWip'] + " [SO1111A]", winOptions);
            var wipData = {};
            var objectName = 'SO1111A';

            $('#' + win.windowId).on('close', function () {
                var r = $.data($('#' + win.contentId)[0], objectName).options;
                var isSaved = r.isSaved;

                $('#' + win.contentId)[objectName]('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                action({ isSaved: isSaved });
            });


            var tranDate = getControlObject(div, 'tTranDate').csDateTime('getText');
            var serviceTypeStr = null;
            if (options.initData.OriginalCharge.rows.length > 0) {
                var rLength = options.initData.OriginalCharge.rows.length;
                for (var i = 0; i < rLength; i++) {
                    if (isEmpty(serviceTypeStr)) {
                        serviceTypeStr = options.initData.OriginalCharge.rows[i]["SERVICETYPE"];
                    }
                    else {
                        if (serviceTypeStr.indexOf(options.initData.OriginalCharge.rows[i]["SERVICETYPE"]) < 0) {
                            serviceTypeStr = serviceTypeStr + ',' + options.initData.OriginalCharge.rows[i]["SERVICETYPE"];
                        };
                    };
                };
                if (serviceTypeStr.substr(0, 1) == ",") { serviceTypeStr = serviceTypeStr.substr(1); };
            }
            else {
                if (options.initData.RtnCharge.rows.length > 0) {
                    var rLength = options.initData.RtnCharge.rows.length;
                    for (var i = 0; i < rLength; i++) {
                        if (isEmpty(serviceTypeStr)) {
                            serviceTypeStr = options.initData.RtnCharge.rows[i]["SERVICETYPE"];
                        }
                        else {
                            if (serviceTypeStr.indexOf(options.initData.RtnCharge.rows[i]["SERVICETYPE"]) < 0) {
                                serviceTypeStr = serviceTypeStr + ',' + options.initData.RtnCharge.rows[i]["SERVICETYPE"];
                            };
                        };
                    };
                    if (serviceTypeStr.substr(0, 1) == ",") { serviceTypeStr = serviceTypeStr.substr(1); };
                };
            };
            if (options.fContact) { wipData.Contact = options.initData.Contact; };
            wipData.CloseProduct = options.initData.OriginalCharge;
            if (wipData.CloseProduct['TYPE'] != null) {
                wipData.CloseProduct.columns = deleteRowByKeyValue(wipData.CloseProduct.columns, "name", "TYPE");
            };
            wipData.CloseCharge = options.initData.RtnCharge;
            if (wipData.CloseCharge['OLDPPVSTOPDATE'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "OLDPPVSTOPDATE");
            };
            if (wipData.CloseCharge['OLDPPVSTARTDATE'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "OLDPPVSTARTDATE");
            };
            if (wipData.CloseCharge['OLDPPVPERIOD'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "OLDPPVPERIOD");
            };
            if (wipData.CloseCharge['OLDAMOUNT'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "OLDAMOUNT");
            };
            if (wipData.CloseCharge['PAYOK'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "PAYOK");
            };
            if (wipData.CloseCharge['TAXFLAG'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "TAXFLAG");
            };
            if (wipData.CloseCharge['CLOSEKIND'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "CLOSEKIND");
            };
            if (wipData.CloseCharge['CANCEL'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "CANCEL");
            };
            if (wipData.CloseCharge['SECONDTYPE'] != null) {
                wipData.CloseCharge.columns = deleteRowByKeyValue(wipData.CloseCharge.columns, "name", "SECONDTYPE");
            };
            wipData.CloseProduct = options.initData.OriginalCharge;
            if (wipData.CloseProduct['TYPE'] != null) {
                wipData.CloseProduct.columns = deleteRowByKeyValue(wipData.CloseProduct.columns, "name", "TYPE");
            };
            wipData.ClosePeriodCycle = options.initData.ClosePeriodCycle;
            wipData.Para = options.initData.Para;
            wipData.Contact = options.initData.Contact;
            //更新週期性收費資料
            for (var i = 0; i < wipData.ClosePeriodCycle.rows.length; i++) {
                wipData.ClosePeriodCycle.rows[i]['CEASEDATE'] = dateToJson(getControlObject(div, 'tTranDate').csDateTime('getDate'));
                wipData.ClosePeriodCycle.rows[i]['STOPFLAG'] = 1;
                wipData.ClosePeriodCycle.rows[i]['STOPTYPE'] = 2;
            };

            var install = {
                Install: {
                    columns: [{ name: 'CUSTID', type: 'integer' },
                              { name: 'SERVICETYPE', type: 'string' }
                    ],
                    rows: [{
                        CUSTID: convertToNull(wipData.CloseProduct.rows[0]['CUSTID']),
                        SERVICETYPE: convertToNull(serviceTypeStr.substr(0, 1))
                    }]
                }
            };
            if (options.fContact) { install.Contact = options.initData.Contact; };

            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                closeData: cloneJSON(wipData),
                parameters: cloneJSON(install),
                theme: options.theme,
                localization: cloneJSON(options.localization),
                refNo: options.refNo,
                editMode: editMode.append
            });
            options.controls.push({ name: win.contentId, type: objectName, level: options.level });
            options.level += 1;
        }
        catch (err) {
            errorHandle(formName, 'showInstWip', err);
        }
    };
    //checkSyncData 連動勾選資料
    function checkSyncData(div, strItemPos, value, blnOK, blnShowMsg, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var dicChoose = options.dicsyncChoose.split(',');

            var varAry = strItemPos.split(',');
            for (var i = 0 ; i < varAry.length; i++) {
                if (isEmpty(varAry[i]) == false) {
                    if (dicChoose.indexOf(varAry[i]) < 0) {
                        var row = options.initData.Charge.rows[varAry[i]];
                        options.dicsyncChoose = options.dicsyncChoose + ',' + varAry[i]
                        var strStepNo = '';
                        var strLinkKey = '';
                        var strBPCode = '';
                        var strOrderNo = '';
                        var intPenal = 0;
                        var strContNo = '';
                        var strServiceType = '';
                        var strRefNo = '';
                        var strFaciSNo = '';
                        var strFaciSeqNo = '';
                        var strKindFunction = '';
                        var strProServiceID = '';
                        var strBillType = row['BILLNO'];
                        var realStartDate = '';
                        var realStopDate = '';
                        var casId = '';
                        var citemCode = '';
                        var productCode = '';
                        var link = '';
                        var contStartDate = '';
                        var contStopDate = '';
                        var syncClose = 0;
                        var strSTBSNO = '';
                        var strDVRSizeCode = '';
                        var custId = row['CUSTID'];

                        if (isEmpty(row['STEPNO']) == false) { strStepNo = row['STEPNO']; };
                        if (isEmpty(row['LINKKEY']) == false) { strLinkKey = row['LINKKEY']; };
                        if (isEmpty(row['BPCODE']) == false) { strBPCode = row['BPCODE']; };
                        if (isEmpty(row['ORDERNO']) == false) { strOrderNo = row['ORDERNO']; };
                        if (isEmpty(row['PENAL']) == false) { intPenal = row['PENAL']; };
                        if (isEmpty(row['CONTNO']) == false) { strContNo = row['CONTNO']; };
                        if (isEmpty(row['SERVICETYPE']) == false) { strServiceType = row['SERVICETYPE']; };
                        if (isEmpty(row['REFNO']) == false) { strRefNo = row['REFNO']; };
                        if (isEmpty(row['FACISNO']) == false) { strFaciSNo = row['FACISNO']; };
                        if (isEmpty(row['FACISEQNO']) == false) { strFaciSeqNo = row['FACISEQNO']; };
                        if (isEmpty(row['KINDFUNCTION']) == false) { strKindFunction = row['KINDFUNCTION']; };
                        if (isEmpty(row['PROSERVICEID']) == false) { strProServiceID = row['PROSERVICEID']; };
                        if (isEmpty(row['REALSTARTDATE']) == false) { realStartDate = row['REALSTARTDATE']; };
                        if (isEmpty(row['REALSTOPDATE']) == false) { realStopDate = row['REALSTOPDATE']; };
                        if (isEmpty(row['CASID']) == false) { casId = row['CASID']; };
                        if (isEmpty(row['CITEMCODE']) == false) { citemCode = row['CITEMCODE']; };
                        if (isEmpty(row['PRODUCTCODE']) == false) { productCode = row['PRODUCTCODE']; };
                        if (isEmpty(row['LINK']) == false) { link = row['LINK']; };
                        if (isEmpty(row['CONTSTARTDATE']) == false) { contStartDate = row['CONTSTARTDATE']; };
                        if (isEmpty(row['CONTSTOPDATE']) == false) { contStopDate = row['CONTSTOPDATE']; };
                        if (isEmpty(row['SYNCCLOSE']) == false) { syncClose = row['SYNCCLOSE']; };
                        if (isEmpty(row['STBSNO']) == false) { strSTBSNO = row['STBSNO']; };
                        if (isEmpty(row['DVRSIZECODE']) == false) { strDVRSizeCode = row['DVRSIZECODE']; };


                        if (options.startPVOD == 1 && strRefNo == 26 && (options.fWipType == 1 || options.fWipType == 2 || options.fWipType == 3 || options.fWipType == 8 || options.fWipType == 9) && strServiceType == 'D') {
                            pvodSingleCheck(div, value, casId, strOrderNo, realStartDate, realStopDate);
                        };
                        if (options.startPVOD == 1 && strRefNo == 26 && (options.fWipType == 2 || options.fWipType == 3 || options.fWipType == 9) && strServiceType == 'D') {
                        }
                        else {
                            //if (options.fContact && (options.fWipType == 1 || options.fWipType == 2 || options.fWipType == 8 || options.fWipType == 9) && strServiceType == 'D' && strRefNo == '2') {
                            if (blnOK == true) {
                                //''正負項勾選
                                checkSignLink(div, value, strStepNo, strLinkKey, strFaciSeqNo);

                                //''980522 #4400 調整規格,若為頻道結清,相同設備及收費項目要一併勾選
                                if (options.fWipType == 2 || options.fWipType == 8 || options.fWipType == 9) {
                                    citemCodeCheck(div, value, strFaciSeqNo, citemCode, link)
                                };
                                //同產品ProServiceID勾選 C服務看客編,其他服務看ProServiceID,皆要同設備流水號
                                //if (isEmpty(strProServiceID) == false) {
                                chkProServiceID(div, value, strProServiceID, strServiceType, strFaciSeqNo, productCode, custId);
                                //};
                                //裝機類
                                if (options.fWipType == 3 || options.fWipType == 4 || options.fWipType == 5 || options.fWipType == 6 || options.fWipType == 7) {
                                    //2015.03.09 #6989(7029) 促變增加判斷參數SO041.ChPromCloseallFaci=1時,同設備一律勾選,包含DVR設備
                                    if (options.fWipType == 3 && options.chPromCloseallFaci == 1) {
                                        //同設備流水號勾選  '2015.05.18 改同舊版設備序號
                                        faciToCharge(div, value, strFaciSNo);
                                    }
                                    else {  //options.promCloseType
                                        if (options.fWipType == 3 && isEmpty(options.strPromCloseType) == false && options.strPromCloseType.indexOf(strServiceType) > 0) {
                                            //980806 #5229 新增判斷SO042.PromCloseType 促變可分開選取,連動條件取消設備,改為 ServiceType,BPCode,ContNo
                                            chkPromCloseType(div, value, strBPCode, strContNo, strServiceType);
                                        }
                                        else {
                                            //990728 #5725 調整PromCloseType若有設定則不判斷CONTSTOPDATE
                                            if (isEmpty(contStopDate) == false) {
                                                //'971024 #4170 調整促變只判斷CONTNO連動
                                                chkContNo(div, value, strContNo);
                                            };
                                            //'980403 # 促變及升降速相同設備要一併勾選  '990601 #5663 促變可單獨勾DVR.不連動勾選DTV,但勾DTV要連動勾DVR
                                            if (options.fWipType == 3 && strRefNo == 2) {
                                                faciToCharge(div, value, strFaciSNo);
                                            };
                                            //'同產品ProductCode+同設備FaciSeqNo勾選  '裝機類
                                            faciAndProduct(div, value, strFaciSeqNo, productCode);
                                        };
                                    };
                                }
                                else {
                                    //拆機類
                                    //970701 #3732 調整當選擇頻道結清時,可單獨勾選頻道做結清,不連動勾選  '970710 增加頻道更換不連動勾選
                                    if (options.fWipType == 1) {
                                        //'970822 #4056 拆機拆設備的orderno不連動,改為contno
                                        chkContNo(div, value, strContNo);
                                        //'971215 #4142 結清拆機拆設備,判斷同一設備要勾選
                                        //'同設備流水號勾選  '2015.05.18 改同舊版設備序號
                                        faciToCharge(div, value, strFaciSNo);
                                        //2019.05.16 #8346(#7606)
                                        chkSTBSNo2(div, value, strFaciSeqNo, strSTBSNO)
                                    }
                                    else {
                                        //980515 #5101 參考號為32,57頻道結清,則判斷CD078.KindFunction 計費機制=0整帶,=1挑選
                                        if (!((options.fWipType == 2 || options.fWipType == 9) && strKindFunction == '1')) {
                                            //'If BPCode IS NOT NULL,其他有落在dtCTD範圍之週期性收費資料(相同BPCode與相同ContNo)將一併被勾選
                                            //'2012.10.04 #6334 頻道更換,不可勾選
                                            if (options.fWipType != 5 && options.fWipType != 7) {
                                                if (isEmpty(strBPCode) == false) {
                                                    chkBPCont(div, value, strBPCode, strContNo);
                                                };
                                            };
                                        };
                                        //'2018.08.16 #7606 頻道結清時，若結清DVR月費(設備STB)，DVR租金(設備DVR)也一起結清(用STBSNO關聯)。
                                        chkSTBSNo(div, value, strFaciSeqNo, strSTBSNO, strDVRSizeCode)
                                    };
                                };
                                //'#6502 勾選的收費，若該BPCODE的CD078.PENAL=1，程式就需同步勾選同一BPCODE，同一ORDERNO的收費資料
                                //'2013/07/25 13:45(Jacy TEL)不分來電參考號.一律都要做.只認CD078.Penal,如果是0就照原本的規則1就用新的規則
                                //'PENAL=1 且 BPCODE & ORDERNO 需有值;若無值則為資料異常(2013/07/25 10:25 Debby)
                                if (isEmpty(strBPCode) == false && isEmpty(strOrderNo) == false && intPenal == 1) {
                                    checkPenal(div, value, strBPCode, strOrderNo);
                                };
                                //'2018.08.14 #7783 排除頻道更換,CD078.syncClose=1 則同OrderNo,BPCode,合約期限範圍在收費起日內,連動
                                if (options.fWipType != 5 && options.fWipType != 7 && syncClose == 1) {
                                    syncCloseBPCode(div, value, strBPCode, strOrderNo, syncClose, contStartDate, contStopDate);
                                };
                                //100.02.10 #5918 2.CATV促變時，進結清勾選CATV的收費，不應該自動勾選其他服務的收費。(CATV拆機才需要做服務依存的動作)
                                if (!(options.fWipType == 3 && strServiceType == "C")) {
                                    chkServRef(div, value, strServiceType);  //服務依存
                                };
                            };
                            checkSyncData(div, options.returnData, value, true, blnShowMsg, blnOK);
                            //dicsyncChoose.Remove(CStr(varElem))
                            //};
                        };
                    };
                };
            };

            return true;
        }
        catch (err) {
            errorHandle(formName, "checkSyncData", err);
        };
    };
    //checkSyncDataOK 檢核勾選的資料,若不能做則取消勾選  檢核未完工結案
    function checkSyncDataOK(div, blnOK, blnShowMsg, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;

            var varAry = options.returnData.split(',');
            for (var i = 0 ; i < varAry.length; i++) {
                if (isEmpty(varAry[i]) == false) {
                    var row = options.initData.Charge.rows[varAry[i]];

                    var strServiceType = '';
                    var strRefNo = '';
                    var strBillType = row['BILLNO'];

                    if (isEmpty(row['SERVICETYPE']) == false) { strServiceType = row['SERVICETYPE']; };
                    if (isEmpty(row['REFNO']) == false) { strRefNo = row['REFNO']; };

                    if (options.startPVOD == 1 && strRefNo == 26 && (options.fWipType == 2 || options.fWipType == 3 || options.fWipType == 9) && strServiceType == 'D') {
                    }
                    else {
                        if (options.fContact && (options.fWipType == 1 || options.fWipType == 2 || options.fWipType == 8 || options.fWipType == 9) && strServiceType == 'D' && strRefNo == '2') {
                            if (strBillType.substr(5, 1) != 'T') {
                                if (row['CHKCHANNELPRODUCTOK'] == '2' || row['CHKCHANNELPRODUCTOK'] == '3') {
                                    if (row['CHKCHANNELPRODUCTOK'] == '2') {
                                        if (blnOK && blnShowMsg) {
                                            var msg = lang.noWipFinClose;
                                            var item = getControlObject(div, 'cboProcessItem').jqxComboBox('getSelectedItem');
                                            msg = msg.replace('{0}', item.label);
                                            messageBox(msg, messageType.critical, null, function () {
                                                action([false]);
                                                return;
                                            });
                                        };
                                    }
                                    else {
                                        if (blnOK && blnShowMsg) {
                                            var msg = lang.noCHProductLog;
                                            var item = getControlObject(div, 'cboProcessItem').jqxComboBox('getSelectedItem');
                                            msg = msg.replace('{0}', item.label);
                                            messageBox(msg, messageType.critical, null, function () {
                                                action([false]);
                                                return;
                                            });
                                        };
                                    };
                                    action([false]);
                                    return;
                                };
                            };
                        };
                    };
                };
            };

            action([true]);
            return true;
        }
        catch (err) {
            errorHandle(formName, "checkSyncDataOK", err);
        };
    };
    //checkSyncDataOK2 檢核勾選的資料,若不能做則取消勾選  同服務別不可同時結清兩台計費設備
    function checkSyncDataOK2(div, strFaciService, strChargeFaciSeqNo, strfaciRefNo, blnOK, blnShowMsg, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;

            var blnChkFaci = true;  //是否檢核設備
            //'2017.04.26 #7443 頻道結清(32/57)可勾選多個設備 CD008A.CloseMultiFaci
            var blnCloseMultiFaci = false;
            var intCloseMultiFaci = 0;

            if (options.initData.System.rows.length > 0) {
                intCloseMultiFaci = options.initData.System.rows[0]['CLOSEMULTIFACI'];
            };

            if (options.fWipType == 1) {
                if (strFaciService == 'C') {
                    blnChkFaci = false;
                }
                else {
                    for (var i = 0 ; i < options.initData.Charge.rows.length; i++) {
                        if (options.initData.Charge.rows[i]['CHOOSE'] == 1 && options.initData.Charge.rows[i]['SERVICETYPE'] == 'C') {
                            blnChkFaci = false;
                        };
                    };
                };
            };
            //有互動及為頻道結清
            if (options.fContact && (options.fWipType == 2 || options.fWipType == 9)) {
                if (options.initData.CloseMultiFaci.rows.length > 0) {
                    if (options.initData.Contact.rows.length > 0) {
                        var ServDescCode = options.initData.Contact.rows[0]['SERVDESCCODE'];
                        for (var i = 0 ; i < options.initData.CloseMultiFaci.rows.length; i++) {
                            if (options.initData.CloseMultiFaci.rows[i]['CLOSEMULTIFACI'] == ServDescCode) {
                                blnCloseMultiFaci = true;
                            };
                        };
                    };
                };
            };
            //'2012.11.16 #6372 促案時判斷設備參考號2,3,4,5,7,8;例:可以同時選DTV跟CM.但不能同時選兩個DTV
            //'2013.01.08 新版訂單測試報告會議討論,非促案也要能做檢核(拆機拆設備除外)
            //'2014.08.29 #6834(7/24進件會議討論：目前只能做頻道結清，因為有服務依存的問題，當CATV拆機時其他服務別的設備不論幾台都要一起拆機；
            //'                 但若沒有拆CATV，單獨拆DTV, CM時應該要卡一個服務別”不可以”結清兩台以上設備)
            //'調整後為:頻道結清時需檢核一次只能結清一台計費設備
            //'判斷當拆機拆設備時,若未包含拆C服務,則需檢核D&I同一服務只能拆一台計費設備
            //'2014.10.13 #6882 討論 結清全部的處理項目都需要檢核,只有拆機有服務依存的問題,拆機有勾C服務時才不檢核,其餘全部都是同一服務只能拆一台計費設備
            //'2014.12.24 設備流水號改為設備序號,因拆機復機會同設備序號不同流水號,但又需要一起結清
            var blnDo = true;
            if ('2,3,5,7,8'.indexOf(strfaciRefNo) >= 0) {
                if (blnChkFaci == true && blnCloseMultiFaci == false) {
                    //'1041109 #7133 新增CloseMultiFaci 啟用參數時,促變不須檢核台數
                    if (!(intCloseMultiFaci == 1 && options.fWipType == 3)) {
                        //'比對已勾選收費資料,同服務別,但不同設備流水號時,若也為計費設備,則不可做結清
                        for (var i = 0 ; i < options.initData.Charge.rows.length; i++) {
                            if (blnDo == true) {
                                var row = options.initData.Charge.rows[i];
                                if (row['CHOOSE'] == 1 && row['SERVICETYPE'] == strFaciService && row['FACISEQNO'] != strChargeFaciSeqNo && '2,3,5,7,8'.indexOf(row['FACIREFNO']) >= 0) {
                                    blnDo = false;
                                    messageBox(lang.no2FaciClose, messageType.critical, null, function () {
                                        action([false]);
                                        return;
                                    });
                                };
                            };
                        };
                    };
                };
            };
            if (blnDo == true) {
                action([true]);
                return true;
            };
        }
        catch (err) {
            errorHandle(formName, "checkSyncDataOK2", err);
        };
    };

    //checkSaveDataOk
    function checkSaveDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //檢核是否有勾選資料
            var rows = getChooseRows(getControlObject(div, "gCharge").jqxGrid('getrows'));
            if (rows.length == 0) {
                messageBox(lang.pleaseCheckData, messageType.critical);
                return false;
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'checkSaveDataOk', err);
            return false;
        }
    };
    //getCheckedData
    function getCheckedData(div) {
        try {
            var options = $.data(div, formName).options;
            var table = { columns: cloneJSON(options.initData.Charge.columns), rows: [] };
            //var rows = options.gridData[gridTableName].rows;
            //var rows = options.initData.Charge.rows;
            var rLength = options.initData.Charge.rows.length;
            for (var i = 0; i < rLength; i++) {
                if (options.initData.Charge.rows[i]["CHOOSE"] == '1') {
                    //var row = rows[gridRows[i]["MID"]];
                    //var row = getRowByKeyValue(rows, "MID", gridRows[i]["MID"]);
                    var row = options.initData.Charge.rows[i];
                    table.rows.push(row);
                };
            };
            //return { ChooseCharge: table };
            return table;
        }
        catch (err) {
            errorHandle(formName, 'getCheckedData', err);
        }
    };
    //getParaData
    function getParaData(div) {
        try {
            var options = $.data(div, formName).options;
            var fields = ["CLOSEDATE", "DAYSTYPE", "CALCTYPE", "CLOSETYPE", "WIPTYPE",
                          "CHEVENCODE", "CHEVENNAME", "STCODE", "STNAME",
                          "TBACK", "ROLLOUT", "PENALAMT", "PENAL", "NATURAL"];
            var types = ['datetime', 'integer', 'integer', 'integer', 'integer',
                         'integer', 'string', 'integer', 'string',
                         'integer', 'integer', 'integer', 'integer', 'integer'];
            var table = { columns: [], rows: [{}] };
            for (var i = 0; i < fields.length; i++) {
                table.columns.push({ name: fields[i], type: types[i] });
            }
            //'CloseDate(結清日期 Date),DaysType(日數計算原則Decimal 0:日平均1:月平均-美規2:月平均-歐規),CalcType(計算基礎Decimal 1.以日計算2.以月計算(月底)3.以月計算(週期)),
            //'CloseType(來電參考號),WipType(處理項目Decimal1:拆機/拆設備2:頻道結清3:促變4:CM升降速5:頻道更換6:DVR升降容量),
            //'ChevenCode(結清原因代碼 Decimal),ChevenName(結清原因 Varchar),STCode(短收原因代碼 Decimal),STName(短收原因 Varchar),
            //'Tback(未收部分補收0,1),RollOut(退費是否轉出0,1),PenalAmt(僅顯示違約金0,1),Penal(不產生違約金0,1),Natural(產生優惠還原0,1),
            table.rows[0]["CLOSEDATE"] = convertToNull(getControlObject(div, "tTranDate").csDateTime("getText"));
            table.rows[0]["DAYSTYPE"] = convertToNull(getControlObject(div, 'cboSTType').jqxComboBox('selectedIndex'));
            table.rows[0]["CALCTYPE"] = convertToNull(options.fCalcType);
            table.rows[0]["CLOSETYPE"] = convertToNull(options.refNo);
            table.rows[0]["WIPTYPE"] = convertToNull(options.fWipType);
            table.rows[0]["CHEVENCODE"] = convertToNull(getControlObject(div, "csChevenCode").csList("codeNo"));
            table.rows[0]["CHEVENNAME"] = convertToNull(getControlObject(div, "csChevenCode").csList("description"));
            table.rows[0]["STCODE"] = convertToNull(getControlObject(div, "csSTCode").csList("codeNo"));
            table.rows[0]["STNAME"] = convertToNull(getControlObject(div, "csSTCode").csList("description"));
            table.rows[0]["TBACK"] = convertToNull(getControlObject(div, 'chkTback').val());
            table.rows[0]["ROLLOUT"] = convertToNull(getControlObject(div, 'chkRollOut').val());
            table.rows[0]["PENALAMT"] = convertToNull(getControlObject(div, 'chkPenalAmt').val());
            table.rows[0]["PENAL"] = convertToNull(getControlObject(div, 'chkPenal').val());
            table.rows[0]["NATURAL"] = 1;

            //return { Para: table };
            return table;
        }
        catch (err) {
            errorHandle(formName, 'getParaData', err);
        }
    };
    //GetCalcCloseData
    function queryCalcCloseData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                dsCharge: { type: 'string', value: JSON.stringify(options.initData) }
            });

            var params = getParameters(riadllName,
                riaClassName,
                'GetCalcCloseData',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        //delete options.initData.ClosePeriodCycle;
                        //delete options.initData.OriginalCharge;
                        //delete options.initData.RtnCharge;
                        delete options.initData.ClosePresent;

                        if (data[0].ResultBoolean == true && data[0].ResultXML != null) {
                            var r = JSON.parse(data[0].ResultXML);
                            if (r.ClosePeriodCycle != null) { options.initData.ClosePeriodCycle = cloneJSON(r.ClosePeriodCycle); };
                            if (r.OriginalCharge != null) { options.initData.OriginalCharge = cloneJSON(r.OriginalCharge); };
                            if (r.RtnCharge != null) { options.initData.RtnCharge = cloneJSON(r.RtnCharge); };
                            if (r.ClosePresent != null) { options.initData.ClosePresent = cloneJSON(r.ClosePresent); };
                        };
                        var flag = data[0].ResultBoolean;
                        var msg = data[0].ErrorMessage;
                        deleteJSONObject(data);
                        action([flag, msg]);
                    }
                    catch (err) {
                        errorHandle(formName, 'queryCalcCloseData_success', err);
                        action([false]);
                    }
                }
            });
            return true;
        }
        catch (err) {
            errorHandle(formName, 'queryCalcCloseData', err);
            return false;
        }
    }

    //getSelectData '過濾重複的項目不勾 '這次勾選strData比對過濾已有勾選資料strDataTmp
    function getSelectData(div, strData, strDataTmp) {
        try {
            var options = $.data(div, formName).options;
            var varAry;

            if (isEmpty(strDataTmp) == true) {
                strDataTmp == strData;
                options.returnData = strDataTmp;
            }
            else {
                varAry = strData.split(',')
                for (i = 0 ; i < varAry.length; i++) {
                    if (isEmpty(varAry[i]) == false) {
                        if (strDataTmp.indexOf(varAry[i]) <= 0) {
                            strDataTmp = strDataTmp + ',' + varAry[i];
                        };
                    };
                };
                options.returnData = strDataTmp;
            };
            strData = '';
        }
        catch (err) {
            errorHandle(formName, "getSelectData", err);
        };
    };
    //pVODSingleCheck  'PVOD單點連動勾選 '100.09.15 #6115 新增連動,條件Casid,OrderNo,RealStartDate,RealStopDate
    function pvodSingleCheck(div, value, casid, orderNo, startDate, stopDate) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if (isEmpty(casid) || isEmpty(orderNo) || isEmpty(startDate) || isEmpty(stopDate)) {
            }
            else {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (isEmpty(options.initData.Charge.rows[i]['CASID']) == false && isEmpty(options.initData.Charge.rows[i]['ORDERNO']) == false && isEmpty(options.initData.Charge.rows[i]['REALSTARTDATE']) == false && isEmpty(options.initData.Charge.rows[i]['REALSTOPDATE']) == false) {
                        if (options.initData.Charge.rows[i]['CASID'] == casid && options.initData.Charge.rows[i]['ORDERNO'] == orderNo && options.initData.Charge.rows[i]['REALSTARTDATE'] == startDate && options.initData.Charge.rows[i]['REALSTOPDATE'] == stopDate) {
                            options.initData.Charge.rows[i]['CHOOSE'] = value;
                            strItemCheckPos = strItemCheckPos + ',' + i;
                        };
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            };
        }
        catch (err) {
            errorHandle(formName, "pVODSingleCheck", err);
        };
    };
    //checkSignLink
    function checkSignLink(div, value, strStepNo, strLinkKey, strFaciSeqNo) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if ((isEmpty(strStepNo) == true && isEmpty(strLinkKey) == true) || (strStepNo == '0' && strLinkKey == '0') ||
                (isEmpty(strStepNo) == true && strLinkKey == '0') || (strStepNo == '0' && isEmpty(strLinkKey) == true)) {
            }
            else {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if ((options.initData.Charge.rows[i]['LINKKEY'] == strStepNo || options.initData.Charge.rows[i]['STEPNO'] == strLinkKey ||
                       (options.initData.Charge.rows[i]['LINKKEY'] == strLinkKey && options.initData.Charge.rows[i]['STEPNO'] == strStepNo)) &&
                        options.initData.Charge.rows[i]['FACISEQNO'] == strFaciSeqNo) {

                        options.initData.Charge.rows[i]['CHOOSE'] = value;
                        strItemCheckPos = strItemCheckPos + ',' + i;
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            };
        }
        catch (err) {
            errorHandle(formName, "checkSignLink", err);
        };
    };
    //citemCodeCheck
    function citemCodeCheck(div, value, seqNo, citemCode, strLink) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if (isEmpty(seqNo) == true || isEmpty(citemCode) == true) {
            }
            else {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (options.initData.Charge.rows[i]['FACISEQNO'] == seqNo && options.initData.Charge.rows[i]['CITEMCODE'] == citemCode &&
                        options.initData.Charge.rows[i]['LINK'] == strLink) {
                        options.initData.Charge.rows[i]['CHOOSE'] = value;
                        strItemCheckPos = strItemCheckPos + ',' + i;
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            };
        }
        catch (err) {
            errorHandle(formName, "citemCodeCheck", err);
        };
    };
    //proServiceID
    function chkProServiceID(div, value, proServiceID, serviceType, faciSeqNo, productCode, custId) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';
            //同產品ProServiceID勾選 C服務看客編,其他服務看ProServiceID,皆要同設備流水號
            if (serviceType == "C") {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (options.initData.Charge.rows[i]['PROSERVICEID'] == proServiceID ||
                        (options.initData.Charge.rows[i]['FACISEQNO'] == faciSeqNo &&
                        options.initData.Charge.rows[i]['PRODUCTCODE'] == productCode)) {
                        options.initData.Charge.rows[i]['CHOOSE'] = value;
                        strItemCheckPos = strItemCheckPos + ',' + i;
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            }
            else {
                if (isEmpty(proServiceID) == false) {
                    for (i = 0; i < options.initData.Charge.rows.length; i++) {
                        if (options.initData.Charge.rows[i]['PROSERVICEID'] == proServiceID &&
                            options.initData.Charge.rows[i]['FACISEQNO'] == faciSeqNo &&
                            options.initData.Charge.rows[i]['PRODUCTCODE'] == productCode) {
                            options.initData.Charge.rows[i]['CHOOSE'] = value;
                            strItemCheckPos = strItemCheckPos + ',' + i;
                        };
                    };
                    if (isEmpty(strItemCheckPos) == false) {
                        getSelectData(div, strItemCheckPos, options.returnData);
                    };
                };
            };
        }
        catch (err) {
            errorHandle(formName, "chkProServiceID", err);
        };
    };
    //faciToCharge  同設備序號勾選
    function faciToCharge(div, value, seqNo) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if (isEmpty(seqNo) == true) {
            }
            else {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (options.initData.Charge.rows[i]['FACISNO'] == seqNo) {
                        options.initData.Charge.rows[i]['CHOOSE'] = value;
                        strItemCheckPos = strItemCheckPos + ',' + i;
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            };
        }
        catch (err) {
            errorHandle(formName, "faciToCharge", err);
        };
    };
    //chkPromCloseType  'ServiceType,BPCode,ContNo
    function chkPromCloseType(div, value, strBPCode, strContNo, strServiceType) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if (isEmpty(strBPCode) == true || isEmpty(strContNo) == true) {
            }
            else {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (options.initData.Charge.rows[i]['BPCODE'] == strBPCode && options.initData.Charge.rows[i]['CONTNO'] == strContNo && options.initData.Charge.rows[i]['SERVICETYPE'] == strServiceType) {
                        options.initData.Charge.rows[i]['CHOOSE'] = value;
                        strItemCheckPos = strItemCheckPos + ',' + i;
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            };
        }
        catch (err) {
            errorHandle(formName, "chkPromCloseType", err);
        };
    };
    //chkContNo
    function chkContNo(div, value, strContNo) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if (isEmpty(strContNo) == true) {
            }
            else {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (options.initData.Charge.rows[i]['CONTNO'] == strContNo) {
                        options.initData.Charge.rows[i]['CHOOSE'] = value;
                        strItemCheckPos = strItemCheckPos + ',' + i;
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            };
        }
        catch (err) {
            errorHandle(formName, "chkContNo", err);
        };
    };
    //faciAndProduct
    function faciAndProduct(div, value, seqNo, productCode) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if (isEmpty(seqNo) == true || isEmpty(productCode) == true) {
            }
            else {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (options.initData.Charge.rows[i]['FACISEQNO'] == seqNo && options.initData.Charge.rows[i]['PRODUCTCODE'] == productCode) {
                        options.initData.Charge.rows[i]['CHOOSE'] = value;
                        strItemCheckPos = strItemCheckPos + ',' + i;
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            };
        }
        catch (err) {
            errorHandle(formName, "faciAndProduct", err);
        };
    };
    //chkBPCont
    function chkBPCont(div, value, strBPCode, strContNo) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if (isEmpty(strBPCode) == true || isEmpty(strContNo) == true) {
            }
            else {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (options.initData.Charge.rows[i]['BPCODE'] == strBPCode && options.initData.Charge.rows[i]['CONTNO'] == strContNo) {
                        options.initData.Charge.rows[i]['CHOOSE'] = value;
                        strItemCheckPos = strItemCheckPos + ',' + i;
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            };
        }
        catch (err) {
            errorHandle(formName, "chkBPCont", err);
        };
    };
    //checkPenal
    function checkPenal(div, value, strBPCode, strOrderNo) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if (isEmpty(strBPCode) == true || isEmpty(strOrderNo) == true) {
            }
            else {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (options.initData.Charge.rows[i]['BPCODE'] == strBPCode && options.initData.Charge.rows[i]['ORDERNO'] == strOrderNo) {
                        options.initData.Charge.rows[i]['CHOOSE'] = value;
                        strItemCheckPos = strItemCheckPos + ',' + i;
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            };
        }
        catch (err) {
            errorHandle(formName, "checkPenal", err);
        };
    };
    //BPCode,OrderNo,SyncClose,ContStartDate,ContStopDate
    function syncCloseBPCode(div, value, strBPCode, strOrderNo, intSyncClose, contStartDate, contStopDate) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if (isEmpty(strBPCode) == true && isEmpty(strOrderNo) == true && isEmpty(contStartDate) == true && isEmpty(contStopDate) == true) {
            }
            else {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (options.initData.Charge.rows[i]['BPCODE'] == strBPCode && options.initData.Charge.rows[i]['ORDERNO'] == strOrderNo && options.initData.Charge.rows[i]['SYNCCLOSE'] == intSyncClose) {
                        if ((options.initData.Charge.rows[i]['REALSTARTDATE'] >= contStartDate &&
                            options.initData.Charge.rows[i]['REALSTARTDATE'] < contStopDate) ||
                            (options.initData.Charge.rows[i]['REALSTOPDATE'] >= contStartDate &&
                            options.initData.Charge.rows[i]['REALSTOPDATE'] < contStopDate)) {
                            options.initData.Charge.rows[i]['CHOOSE'] = value;
                            strItemCheckPos = strItemCheckPos + ',' + i;
                        };
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            };
        }
        catch (err) {
            errorHandle(formName, "chkPromCloseType", err);
        };
    };
    //DVRSizeCode,FaciSeqNo,STBSNo
    function chkSTBSNo(div, value, strSeqNo, strSTBSNO, strDVRSizeCode) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if (isEmpty(strDVRSizeCode) == true || isEmpty(strSeqNo) == true) {
            }
            else {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (options.initData.Charge.rows[i]['DVRSIZECODE'] == strDVRSizeCode && (options.initData.Charge.rows[i]['FACISEQNO'] == strSTBSNO || options.initData.Charge.rows[i]['STBSNO'] == strSeqNo)) {
                        strItemCheckPos = strItemCheckPos + ',' + i;
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            };
        }
        catch (err) {
            errorHandle(formName, "chkSTBSNo", err);
        };
    };
    //FaciSeqNo,STBSNo
    function chkSTBSNo2(div, value, strSeqNo, strSTBSNO) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if (isEmpty(strSeqNo) == true) {
            }
            else {
                for (i = 0; i < options.initData.Charge.rows.length; i++) {
                    if (options.initData.Charge.rows[i]['FACISEQNO'] == strSTBSNO || options.initData.Charge.rows[i]['STBSNO'] == strSeqNo) {
                        strItemCheckPos = strItemCheckPos + ',' + i;
                    };
                };
                if (isEmpty(strItemCheckPos) == false) {
                    getSelectData(div, strItemCheckPos, options.returnData);
                };
            };
        }
        catch (err) {
            errorHandle(formName, "chkSTBSNo2", err);
        };
    };

    //ServiceType 
    function chkServRef(div, value, strServiceType) {
        try {
            var options = $.data(div, formName).options;
            var strItemCheckPos = '';

            if (isEmpty(strServiceType) == false) {
                //取得服務別對應依存
                options.dependService = '';
                getDependService(div, strServiceType);
                if (isEmpty(options.dependService) == false) {
                    for (i = 0; i < options.initData.Charge.rows.length; i++) {
                        if (options.dependService.indexOf(options.initData.Charge.rows[i]["SERVICETYPE"]) > 0) {
                            options.initData.Charge.rows[i]['CHOOSE'] = value;
                            strItemCheckPos = strItemCheckPos + ',' + i;
                        };
                    };
                    if (isEmpty(strItemCheckPos) == false) {
                        getSelectData(div, strItemCheckPos, options.returnData);
                    };
                };
            };
        }
        catch (err) {
            errorHandle(formName, "chkServRef", err);
        };
    };
    function getDependService(div, strServiceType) {
        try {
            var options = $.data(div, formName).options;
            for (i = 0; i < options.initData.ServiceType.rows.length; i++) {
                if (options.initData.ServiceType.rows[i]['CODENO'] != strServiceType &&
                    options.initData.ServiceType.rows[i]['DEPENDSERVICE'] == strServiceType) {
                    options.dependService = options.dependService + ',' + options.initData.ServiceType.rows[i]['CODENO'];
                };
            };
        }
        catch (err) {
            errorHandle(formName, "getDependService", err);
        };
    };

    //close
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).csWindow('close');
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };
    //將日期格式資料轉為json日期字串(2016-12-27T00:00:00.00Z)
    function dateToJson(d) {
        try {

            Date.prototype.toJSON = function () {
                return this.getFullYear() + '-' +
                    ((this.getMonth() + 1) < 10 ? '0' + (this.getMonth() + 1) : (this.getMonth() + 1)) + '-' +
                    (this.getDate() < 10 ? '0' + this.getDate() : this.getDate()) + 'T' +
                    (this.getHours() < 10 ? '0' + this.getHours() : this.getHours()) + ':' +
                    (this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes()) + ':' +
                    (this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds()) + '.' +
                    (this.getMilliseconds() < 10 ? '0' + this.getMilliseconds() : this.getMilliseconds()) + 'Z';
            };
            return d.toJSON();
        } catch (err) {
            throw err.message;
        };
    };

    //function insertToGridData(div, data) {
    //    try {
    //        var options = $.data(div, formName).options;
    //        if (options.gridData == null) {
    //            options.gridData = {};
    //            options.gridData[gridTableName] = data[Object.keys(data)[0]];
    //        }
    //        else {
    //            var rLength = data[Object.keys(data)[0]].rows.length;
    //            for (var i = 0; i < rLength; i++) {
    //                //檢核是否有重複
    //                var existRow = getRowByKeyValue(options.gridData[gridTableName].rows, "ROWKEY", data[Object.keys(data)[0]].rows[i]["ROWKEY"]);
    //                if (existRow == null) {
    //                    options.gridData[gridTableName].rows.push(data[Object.keys(data)[0]].rows[i]);
    //                }
    //            }
    //        }
    //    }
    //    catch (err) {
    //        errorHandle(formName, 'insertToGridData', err);
    //    }
    //};


})(jQuery);