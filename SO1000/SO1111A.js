(function ($) {
    var formName = 'SO1111A';
    var riadllName = 'CableSoft.SO.RIA.Wip.Install.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.Install.Web.Install';
    var buttonsHeight = 24;
    var textHeight = 23;
    var facilityTableName = "Facility";
    var prFacilityTableName = "PrFacility";
    var chargeTableName = "Charge";
    var wipTableName = "Wip";
    var chooseFaciTableName = "ChooseFacility";
    var changeFaciTableName = "ChangeFacility";
    var productTableName = "Product";
    var changeProductTableName = "ChangeProduct";
    var closeProductTableName = "CloseProduct";
    var closeChargeTableName = "CloseCharge";
    var closePeriodCycleTableName = "ClosePeriodCycle";
    var chooseChannelTableName = "ChooseChannel";
    var otherChargeTableName = "OtherServCharge";
    var contactTableName = 'Contact';
    var customerTableName = 'Customer';
    var proposerTableName = 'Proposer';
    var userPrivTableName = 'UserPriv';
    var fieldPrivTableName = 'FieldPriv';
    var wipSystemTableName = "WipSystem";
    var introTableName = "Intro";

    $.fn[formName] = function (options, param, param2, param3) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, param2, param3);
                }
                return;
            }
            options = options || {};
            return this.each(function () {
                var state = $.data(this, formName);
                if (state) {
                    $.extend(state.options, options);
                    //cccc(this,options);
                }
                else {
                    $.data(this, formName, {
                        options: $.extend({}, new defaults(), new SO1111A(), options)
                    });
                    formLoaded(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1111A', err);
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
        canView: function (jq, params, param2, param3) {
            return canView(params, param2, param3);
        },
        canAppend: function (jq, params, param2, param3) {
            return canAppend(params, param2, param3);
        },
        canEdit: function (jq, params, param2, param3) {
            return canEdit(params, param2, param3);
        },
        canDelete: function (jq, params, param2, param3) {
            return canDelete(params, param2, param3);
        },
        canPrint: function (jq, params, param2, param3) {
            return canPrint(params, param2, param3);
        },
    };
    var defaults = (function () {
        this.language = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.refNo = 0;
        this.parameters = {};
        this.controls = [];
        this.isSaved = false;
        this.theme = $.jqx.theme;
        this.initData = {};
        this.localization = null;
        this.container = null;
        this.closeData = null;
        this.moveReInstData = null;
        this.custId = 0;
        this.serviceType = null;
        this.sno = null;
        this.servCode = null;
        this.orderNo = null;
        this.instCodeRow = {};
        this.wipData = {};
        this.wipRefNoStr = null;
        this.wipCodeValueStr = null;
        this.IVRData = {};
        this.isChild = false;
    });
    function cccc(div, options) {
        var keys = Object.keys(options);
        for (var i = 0; i < keys.length; i++) {
            switch (keys[i]) {
                case "disabeld":
                    funcDisabld(div);
                    break;
                case "theme":

                    break;
            }
        }
    }
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
            var topHeight = textHeight * 2;
            getControlObject(div, 'gbxT').css({ height: topHeight });
            getControlObject(div, 'gbxAll').jqxSplitter({ 'height': $(div).height() - buttonsHeight - 4 });
            var gridHeight = getControlObject(div, 'gbxSpBottom').height() - buttonsHeight - 6;
            var gridWidth = getControlObject(div, 'gbxSpBottom').width() - 4;
            getControlObject(div, 'gbxFacility').css({ width: gridWidth * 2 / 5 });
            getControlObject(div, 'gbxCharge').css({ width: gridWidth * 3 / 5 });

            getControlObject(div, 'gFacility').jqxGrid({ height: gridHeight });
            getControlObject(div, 'gCharge').jqxGrid({ height: gridHeight });
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
            //2019/04/16 Jacky 可避免直接關tab 沒刪除問題
            if (options.closingOk != true) {
                delResvPoint(div);
            }
            deleteJSONObject(options);
            //options.length = 0;
            //options = null;
            offElementEvents(div);
            $.data(div, formName, null);
            //$(div).remove();
            return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    function canAppend(params, action) {
        try {
            var checkPara = checkParameters(editMode.append, params);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanAppend(params, function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canAppend', err);
        }
    };
    function checkCanAppend(data, action) {
        try {
            var install = getParametersTable(data, 'install');
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                CustId: { type: 'integer', value: data[install].rows[0]['CustId'.toUpperCase()] },
                ServiceType: { type: 'string', value: convertToNull(data[install].rows[0]['ServiceType'.toUpperCase()]) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'CanAppend',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    action(d);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'checkCanAppend', err);
        }
    }
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
    function canEdit(params, action, opts) {
        try {
            var checkPara = checkParameters(editMode.edit, params);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX('CanEdit', params, function (d) {
                    if (d.ResultBoolean && d.ErrorCode == 1) {
                        showCheckManagerPWD(opts, editMode.edit, function (r) {
                            action([r.isSaved, r.errorMessage]);
                        });
                    }
                    else {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canEdit', err);
        }
    };
    function canDelete(params, action, opts) {
        try {
            var checkPara = checkParameters(editMode.delete, params);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX('CanDelete', params, function (d) {
                    if (d.ResultBoolean && d.ErrorCode == 1) {
                        showCheckManagerPWD(opts, editMode.delete, function (r) {
                            action([r.isSaved, r.errorMessage]);
                        });
                    }
                    else {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canDelete', err);
        }
    };
    function checkCanXX(method, data, action) {
        try {
            var install = getParametersTable(data, 'install');
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                SNo: { type: 'string', value: data[install].rows[0]['SNo'.toUpperCase()] }
            });
            var params = getParameters(riadllName,
                riaClassName,
                method,
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    action(d);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'checkCanXX', err);
        }
    }
    function canPrint(params, action) {
        var checkPara = checkParameters(editMode.view, params);
        action(checkPara);
    };
    //檢核參數是否正確
    function checkParameters(em, data) {
        try {
            //檢核table 存不存在
            var table = getParametersTable(data, 'install');
            if (table == null) return ([false, 'table install not exist!!']);
            //檢核欄位存不存在
            var checkCols = ['', '', ''];
            //新增檢核客戶編號
            if (em == editMode.append) {
                if (data[table].rows[0]['CustId'.toUpperCase()] == null) {
                    return ([false, 'column custid not exist!!']);
                }
            }
            else {
                if (data[table].rows[0]['SNo'.toUpperCase()] == null) {
                    return ([false, 'column sno not exist!!']);
                }
            }
            return ([true]);
        }
        catch (err) {
            errorHandle(formName, 'checkParameters', err);
        }
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            //options.loginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div, formName);
                        init(div, function (r) {
                            try {
                                listAddHandler(div);
                                textAddHandler(div);
                                buttonAddHandler(div);
                                frmAddHandler(div);
                                $(div).triggerHandler('loaded');
                            }
                            catch (err) {
                                errorHandle(formName, 'formLoaded_success_init', err);
                            }
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
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
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).on('winClosing', function (e) {
                    close(div)
                });
            }
            addHandlerGetParameters(div, options);
            //$(options.container).on('keydown', function (e) {
            //    try {
            //        if (e.ctrlKey && e.which == 119) {
            //            messageBox(JSON.stringify(options, null, '\t'), null, null, null, { width: 800, height: 500 });
            //        }
            //    }
            //    catch (err) {
            //        errorHandle(formName, 'frmAddHandler_keydown', err, true);
            //    }
            //});
        }
        catch (err) {
            errorHandle(formName, 'frmAddHandler', err);
        }
    };
    function setBasicPara(div) {
        try {
            var options = $.data(div, formName).options;
            var customer = getParametersTable(options.parameters, 'customer');
            var install = getParametersTable(options.parameters, 'install');
            if (customer != null) {
                options.servCode = options.parameters[customer].rows[0]['SERVCODE'];
            }
            if (install != null) {
                options.custId = options.parameters[install].rows[0]['CUSTID'];
                options.serviceType = options.parameters[install].rows[0]['SERVICETYPE'];
            }
            if (options.editMode == editMode.append) {
                options.sno = getFalseSNo();
            }
            else {
                options.sno = options.parameters[install].rows[0]['SNO'];
            }
        }
        catch (err) {
            errorHandle(formName, 'setBasicPara', err);
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
            setBasicPara(div);
            initFocus(div);
            //取服務別
            getServiceType(div, function (r) {
                try {
                    if (r.ResultBoolean == true) {
                        var rT = JSON.parse(r.ResultXML);
                        options.initData['ServiceType'] = rT[Object.keys(rT)[0]];
                        initServiceType(div);
                        //取得單選元件可選項目/參數,工單資料
                        formResize(div);
                        getSubInitData(div, function (r) {
                            mustBeColor(div);
                            action(true);
                        });
                    }
                    else {
                        messageBox(r.ErrorMessage);
                        action(false);
                    }
                    deleteJSONObject(r);
                }
                catch (err) {
                    errorHandle(formName, 'init_getServiceType', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function initFocus(div) {
        try {
            var options = $.data(div, formName).options;
            switch (options.editMode) {
                case editMode.edit:
                    getControlObject(div, "tNote").jqxTextArea('focus');
                    break;
                case editMode.append:
                    getControlObject(div, "csServiceType").csList('focus');
                    break;
            }
        }
        catch (err) {
            errorHandle(formName, 'initFocus', err);
        }
    }
    function clearInitData(div) {
        try {
            var options = $.data(div, formName).options;
            var initData = options.initData;
            var keys = Object.keys(initData);
            var iLength = keys.length;
            for (var i = 0; i < iLength; i++) {
                if (keys[i] != 'ServiceType') {
                    delete initData[keys[i]]
                }
            }
            if (initData.length > 0) {
                options.initData = initData.filter(function (e) { return e });
            }
        }
        catch (err) {
            errorHandle(formName, 'clearInitData', err);
        }
    };
    function clearWipData(div) {
        try {
            var options = $.data(div, formName).options;
            delete options.wipData;
        }
        catch (err) {
            errorHandle(formName, 'clearWipData', err);
        }
    };
    function getSubInitData(div, action) {
        //取得單選元件可選項目/參數,工單資料
        getInitData(div, function (r) {
            try {
                var options = $.data(div, formName).options;
                if (r[0].ResultBoolean == true) {
                    clearInitData(div);
                    options.initData = $.extend({}, options.initData, JSON.parse(r[0].ResultXML));
                    initList(div);
                    if (r[1].ResultBoolean == true) {
                        clearWipData(div);
                        options.introIdData = options.initData[introTableName];
                        options.wipData = JSON.parse(r[1].ResultXML);
                        changeMode(div, options.editMode);
                        refreshGrid(div);
                        setSubButton(div);
                        action(true);
                    }
                    else {
                        messageBox(r[1].ErrorMessage);
                        action(false);
                    }
                }
                else {
                    messageBox(r[0].ErrorMessage);
                    action(false);
                }
                delete r;
            }
            catch (err) {
                errorHandle(formName, 'getSubInitData_getInitData', err);
            }
        });
    };
    function getParaLoginInfo(div) {
        var options = $.data(div, formName).options;
        var li = cloneJSON(options.loginInfo);
        return $.extend({}, { loginInfo: { type: 'logininfo', value: li.loginInfo } });
    }
    function getServiceType(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'GetServiceType',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    action(data);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getServiceType', err);
        }
    };
    //取得工單資料
    //function getInstallData(div, action) {
    //    try {
    //        var options = $.data(div, formName).options;
    //        var sno = options.parameters['install'].rows[0]['SNO'];
    //        var paraLoginInfo = getParaLoginInfo(div);
    //        var parameters = $.extend({}, paraLoginInfo, {
    //            SNO: { type: 'string', value: sno }
    //        });
    //        var params = getParameters(riadllName,
    //            riaClassName,
    //            'GetInstallData',
    //            JSON.stringify(parameters));
    //        getServerData(params, {
    //            success: function (data) {
    //                delete parameters;
    //                delete params;
    //                action(data);
    //            }
    //        });
    //    }
    //    catch (err) {
    //        errorHandle(formName, 'getInstallData', err);
    //    }
    //};
    //取得單選下拉資料
    function getInitData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var customer = getParametersTable(options.parameters, 'customer');
            //var install = getParametersTable(options.parameters, 'install');
            //var contact = getParametersTable(options.parameters, 'contact');
            var close = options.closeData;
            var wipRefNoStr = convertToNull(options.wipRefNoStr);
            var wipCodeValueStr = convertToNull(options.wipCodeValueStr);
            var id;
            var servCode;
            if (customer != null) {
                id = options.parameters[customer].rows[0]['ID'];
                servCode = options.parameters[customer].rows[0]['SERVCODE'];
            }
            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {
                CustId: { type: 'integer', value: options.custId },
                orderNo: { type: 'string', value: convertToNull(options.orderNo) },
                ID: { type: 'string', value: convertToNull(id) },
                SNo: { type: 'string', value: options.sno },
                ServiceType: { type: 'string', value: options.serviceType },
                ServCode: { type: 'string', value: convertToNull(servCode) },
                InstRefNoStr: { type: 'string', value: wipRefNoStr },
                InstCodeValueStr: { type: 'string', value: wipCodeValueStr },
                ContactRefNo: { type: 'string', value: options.refNo },
                CloseData: { type: 'string', value: cloneJSON(close) },
                editMode: { type: 'integer', value: options.editMode }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetInitData2',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    action(data);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getInitData', err);
        }
    };
    //檢核該派工類別可選
    function getCheckCanInstall(div, action) {
        try {
            var options = $.data(div, formName).options;
            var custId = options.custId;
            var serviceType = options.serviceType;;
            var instCode = getControlObject(div, 'csInstCode').csList('codeNo');

            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {
                CustId: { type: 'integer', value: custId },
                ServiceType: { type: 'string', value: serviceType },
                InstCode: { type: 'integer', value: instCode },
            });
            var params = getParameters(riadllName,
                riaClassName,
                'CheckCanInstall',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    action(data);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getCheckCanInstall', err);
        }
    };
    //檢核該時段可預約
    function getChkCanResv(div, action) {
        try {
            var options = $.data(div, formName).options;
            var instCodeRow = options.instCodeRow;
            var resvTime = convertToNull(getControlObject(div, 'dtResvTime').csDateTime('getDate'));
            var acceptTime = convertToNull(getRealDate(getControlObject(div, 'tAcceptTime').text()));
            var workUnit = convertToNull(getControlObject(div, 'tWorkUnit').jqxNumberInput('val'), true);
            var wipData = cloneJSON(options.wipData);
            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {
                WipCode: { type: 'integer', value: instCodeRow['CODENO'] },
                ServCode: { type: 'string', value: options.workServCode },
                MCode: { type: 'integer', value: instCodeRow['GROUPNO'] },
                ServiceType: { type: 'string', value: options.serviceType },
                ResvTime: { type: 'datetime', value: resvTime },
                AcceptTime: { type: 'datetime', value: acceptTime },
                OldResvTime: { type: 'datetime', value: convertToNull(options.resvTime) },
                Resvdatebefore: { type: 'integer', value: instCodeRow['Resvdatebefore'.toUpperCase()] },
                WorkUnit: { type: 'decimal', value: workUnit },
                IsBooking: { type: 'boolean', value: true },
                dsWipData: { type: 'string', value: JSON.stringify(wipData) },
            });
            var params = getParameters(riadllName,
                riaClassName,
                'ChkCanResv',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    action(data);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getChkCanResv', err);
        }
    };
    function initServiceType(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'csServiceType').csList('source', options.initData['ServiceType'].rows);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initServiceType', err);
        }
    }
    function disableAll(div, flag) {
        var gId = $(div).prop('id') + 'gbxAll';
        $('#' + gId).jqxSplitter({ disabled: flag });
    }
    //委派csList 事件
    function listAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //服務別
            csServiceType_selectedIndexChanged(div);
            //裝機類別
            csInstCode_selectedIndexChanged(div);
            //介紹媒介
            csMediaCode_selectedIndexChanged(div);
            //退單原因
            csReturnCode_selectedIndexChanged(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    }
    //服務別selectedIndexChanged
    function csServiceType_selectedIndexChanged(div) {
        getControlObject(div, 'csServiceType').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                if (options.serviceTypeChanging == true) return;
                options.serviceTypeChanging = true;
                options.serviceType = getControlObject(div, 'csServiceType').csList('codeNo');
                disableAll(div, true);
                getSubInitData(div, function (r) {
                    if (r == true) {
                        mustBeColor(div);
                    }
                    else {
                        getControlObject(div, 'csServiceType').csList('clearDisplayValue');
                    }
                    disableAll(div, false);
                    options.serviceTypeChanging = false;
                });
            }
            catch (err) {
                errorHandle(formName, 'csServiceType_selectedIndexChanged', err);
            }
        });
    };
    //裝機類別改變
    function csInstCode_selectedIndexChanged(div) {
        getControlObject(div, 'csInstCode').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var instValue = $(this).csList('codeNo');
                if (instValue == null || instValue.length == 0) {
                    options.instCodeRow = null;
                    return false;
                }
                disableAll(div, true);
                getCheckCanInstall(div, function (r) {
                    try {
                        if (r.ResultBoolean == true) {
                            setCloseDefaultData(div);
                            options.instCodeRow = getRowByKeyValue(options.initData['InstCode'].rows, 'CODENO', instValue);
                            var resvTime = getControlObject(div, 'dtResvTime').csDateTime('getText');
                            if (resvTime != null && resvTime.length > 0) {
                                //取工單資料
                                getWipDetailData(div, function (d) {
                                    if (d[0] == false && d[1] != null) {
                                        messageBox(d[1]);
                                    }
                                    disableAll(div, false);
                                    setSubButton(div);
                                });
                            }
                            else {
                                disableAll(div, false);
                            }
                            instRefnoEnable(div);
                            instCodeChangeDefault(div);
                        }
                        else {
                            messageBox(r.ErrorMessage);
                            getControlObject(div, 'csInstCode').csList('clearDisplayValue');
                            disableAll(div, false);
                        }
                    }
                    catch (err) {
                        errorHandle(formName, 'csInstCode_selectedIndexChanged_getCheckCanInstall', err);
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'csInstCode_selectedIndexChanged', err);
            }
        });
    };
    function instCodeChangeDefault(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.instCodeRow != null) {
                getControlObject(div, 'csGroupCode').csList('codeNo', options.instCodeRow["DefGroupCode".toUpperCase()]);
                getControlObject(div, 'tWorkUnit').jqxNumberInput('val', options.instCodeRow["WorkUnit".toUpperCase()]);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'instCodeChangeDefault', err);
        }
    }
    function setCloseDefaultData(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.closeData != null && options.closeData["Para"] != null && options.closeData["Para"].rows[0]["CloseDate".toUpperCase()]) {
                var resvTime = new Date(options.closeData["Para"].rows[0]["CloseDate".toUpperCase()]);
                getControlObject(div, 'dtResvTime').csDateTime('setText', formatDateTime(resvTime, "datetime"));
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'setCloseDefaultData', err);
        }
    }
    //介紹媒介改變
    function csMediaCode_selectedIndexChanged(div) {
        getControlObject(div, 'csMediaCode').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var value = $(this).csList('codeNo');
                if (value == null || value.length == 0) {
                    options.mediaCodeRow = null;
                    disableIntro(div, true);
                    return false;
                }
                else {
                    var oRow = options.mediaCodeRow;
                    options.mediaCodeRow = getRowByKeyValue(options.initData['MediaCode'].rows, 'CODENO', value);
                    disableIntro(div, !(options.mediaCodeRow['REFNO'] != null && options.mediaCodeRow['REFNO'] > 0));
                    if ((oRow == null || oRow['REFNO'] != options.mediaCodeRow['REFNO']) && options.mediaCodeRow['REFNO'] > 1) {
                        getControlObject(div, 'tIntroId').val(null);
                        getControlObject(div, 'tIntroName').val(null);
                        disableAll(div, true);
                        getQueryIntro(div, function (d) {
                            if (d[0] == false) {
                                messageBox(d[1]);
                            }
                            disableAll(div, false);
                        });
                    }
                }
            }
            catch (err) {
                errorHandle(formName, 'csMediaCode_selectedIndexChanged', err);
            }
        });
    };
    function disableIntro(div, flag) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'tIntroName').jqxInput({ disabled: !flag || options.editMode == editMode.view });
            getControlObject(div, 'btnFindIntro').jqxButton({ disabled: flag || options.editMode == editMode.view });
        }
        catch (err) {
            errorHandle(formName, 'csMediaCode_selectedIndexChanged', err);
        }
    }
    //退單原因改變
    function csReturnCode_selectedIndexChanged(div) {
        getControlObject(div, 'csReturnCode').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var value = $(this).csList('codeNo');
                if (value == null || value.length == 0) {
                    var finTimeDisabled = (options.finTimeDisabled == true);
                    getControlObject(div, 'dtFinTime').csDateTime({ disabled: finTimeDisabled });
                    getControlObject(div, 'tFinUnit').jqxNumberInput({ disabled: finTimeDisabled });
                    getControlObject(div, 'csReturnDescCode').csList('disabled', true);
                    getControlObject(div, 'csReturnDescCode').csList('clearDisplayValue');
                }
                else {
                    getControlObject(div, 'dtFinTime').csDateTime({ disabled: true });
                    getControlObject(div, 'tFinUnit').jqxNumberInput({ disabled: true });
                    getControlObject(div, 'csReturnDescCode').csList('disabled', false);
                    //如簽收日期無值則需給預設日期(今天)
                    if (getControlObject(div, 'dtSignDate').csDateTime('getText') == null) {
                        getControlObject(div, 'dtSignDate').csDateTime('setText', formatDateTime(new Date(), 'date'));
                    }
                    var loginInfoRow = options.loginInfo.loginInfo.rows[0];
                    //如簽收人員無值則需給登入人員
                    getControlObject(div, 'csSignEn').csList('codeNo', loginInfoRow['entryid']);
                    getControlObject(div, 'csSignEn').csList('description', loginInfoRow['entryname']);
                    getControlObject(div, 'tFinUnit').jqxNumberInput('val', 0);
                    //若本欄有值,回報時間無值,則填入簽收日期+現在時間(HH:mm)
                    if (getControlObject(div, 'dtCallOkTime').csDateTime('getText') == null) {
                        getControlObject(div, 'dtCallOkTime').csDateTime('setText', formatDateTime(getControlObject(div, 'dtSignDate').csDateTime('getText'), 'date') + ' ' + formatDateTime(new Date(), 'time'));
                    }
                }
            }
            catch (err) {
                errorHandle(formName, 'csReturnCode_selectedIndexChanged', err);
            }
        });
    };
    function getQueryIntro(div, action) {
        var options = $.data(div, formName).options;

        var paraLoginInfo = getParaLoginInfo(div);
        var parameters = $.extend({}, paraLoginInfo, {
            mediaCode: { type: 'integer', value: options.mediaCodeRow['CODENO'] }
        });
        var params = getParameters(riadllName,
            riaClassName,
            'QueryIntro',
            JSON.stringify(parameters));
        getServerData(params, {
            success: function (data) {
                try {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ResultBoolean == true && isEmpty(data.ResultXML) == false) {
                        var r = JSON.parse(data.ResultXML);
                        options.introIdData = r[Object.keys(r)[0]];
                    }
                    var flag = data.ResultBoolean;
                    var msg = data.ErrorMessage;
                    deleteJSONObject(data);
                    action([flag, msg]);
                }
                catch (err) {
                    errorHandle(formName, 'getQueryIntro_success', err);
                    action([false]);
                }
            }
        });
    };
    //委派其他元件事件
    function textAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //預約時間
            dtResvTime_dateChanged(div);
            //完工時間
            dtFinTime_dateChanged(div);
            dtFinTime_focusin(div);
            //介紹人
            tIntroId_Input(div);
            //tIntroId_Change(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'textAddHandler', err);
        }
    };
    //預約時間改變時
    function dtResvTime_dateChanged(div) {
        getControlObject(div, 'dtResvTime').on('dateChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var resvTime = getControlObject(div, 'dtResvTime').csDateTime('getDate');
                if (resvTime == options.resvTime) return;
                var instCode = getControlObject(div, "csInstCode").csList('codeNo');
                if (isEmpty(instCode)) return;
                disableAll(div, true);
                getChkCanResv(div, function (r) {
                    try {
                        if (r.ResultBoolean == true) {
                            //取得Detail 相關資料
                            //日期需改變 且 檢核收費是否已收或開發票 且 不為訂單 且 簽收日期不能有值
                            var chargeOk = $.fn.WipUtility('chkCitemStatusOk', options.wipData[chargeTableName]);
                            var signOk = (options.editMode == editMode.append || options.wipData[wipTableName].rows.length == 0 || options.wipData[wipTableName].rows[0]['SIGNDATE'] == null);
                            var orderOk = (isEmpty(options.orderNo));
                            if (formatDateTime(options.resvTime, 'date') !== formatDateTime(resvTime, 'date')
                                && chargeOk[0] && signOk && orderOk) {
                                options.resvTime = resvTime;
                                getWipDetailData(div, function (d) {
                                    if (d[0] == false && d[1] != null) {
                                        messageBox(d[1]);
                                    }
                                    disableAll(div, false);
                                    setSubButton(div);
                                });
                            }
                            else {
                                options.resvTime = resvTime;
                                disableAll(div, false);
                            }
                        }
                        else {
                            messageBox(r.ErrorMessage);
                            getControlObject(div, 'dtResvTime').csDateTime('setDate', options.resvTime);
                            disableAll(div, false);
                        }
                    }
                    catch (err) {
                        errorHandle(formName, 'resvTime_dateChanged_getChkCanResv', err);
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'resvTime_dateChanged', err);
            }
        });
    };
    //介紹人input
    function tIntroId_Input(div) {
        var options = $.data(div, formName).options;
        getControlObject(div, 'tIntroId').on('input change', function (e) {
            try {
                var value = $(this).jqxInput('val');
                if (value == null || value.length == 0) {
                    return;
                }
                else {
                    if (options.mediaCodeRow == null) return;
                    if (e.type == 'input') {
                        getControlObject(div, 'tIntroName').jqxInput('val', null);
                        switch (options.mediaCodeRow['REFNO']) {
                            case 2:
                            case 3:
                                var row = getRowByKeyValue(options.introIdData.rows, 'CODENO', value);
                                if (row != null) {
                                    getControlObject(div, 'tIntroName').jqxInput('val', row[Object.keys(row)[1]]);
                                }
                                break;
                        }
                    }
                    else {
                        switch (options.mediaCodeRow['REFNO']) {
                            case 1:
                                disableAll(div, true);
                                getCustomer(div, value, function (r) {
                                    if (r[0] == false) {
                                        messageBox(r[1]);
                                    }
                                    else {
                                        var rows = r[2][Object.keys(r[2])[0]].rows;
                                        if (rows.length == 0) {
                                            introNameError(div);
                                        }
                                        else {
                                            getControlObject(div, 'tIntroName').jqxInput('val', rows[0]['CUSTNAME']);
                                        }
                                    }
                                    disableAll(div, false);
                                });
                                break;
                            case 2:
                                var nameValue = getControlObject(div, 'tIntroName').val();
                                if (nameValue == null || nameValue.length == 0) {
                                    introNameError(div);
                                }
                                break;
                            case 3:
                                var nameValue = getControlObject(div, 'tIntroName').val();
                                if (nameValue == null || nameValue.length == 0) {
                                    introNameError(div);
                                }
                                break;
                        }
                    }
                }
            }
            catch (err) {
                errorHandle(formName, 'tIntroId_Input', err);
            }
        });
    };
    function introNameError(div) {
        var options = $.data(div, formName).options;
        messageBox(options.language.introIdErrorNoCustomer, null, null, function () {
            getControlObject(div, 'tIntroId').jqxInput('focus');
        });
    }
    ////介紹人改變
    //function tIntroId_Change(div) {
    //    var options = $.data(div, formName).options;
    //    getControlObject(div, 'tIntroId').on('change', function () {
    //        try {
    //            var value = $(this).jqxInput('val');
    //            if (value == null || value.length == 0) {
    //                return;
    //            }
    //            else {
    //                if (options.mediaCodeRow == null) return;
    //                switch (options.mediaCodeRow['REFNO']) {
    //                    case 1:
    //                        disableAll(div, true);
    //                        getCustomer(div, value, function (r) {
    //                            if (r[0] == false) {
    //                                messageBox(r[1]);
    //                            }
    //                            else {
    //                                var rows = r[2][Object.keys(r[2])[0]].rows;
    //                                if (rows.length == 0) {
    //                                    introNameError();
    //                                }
    //                                else {
    //                                    getControlObject(div, 'tIntroName').jqxInput('val', rows[0]['CUSTNAME']);
    //                                }
    //                            }
    //                            disableAll(div, false);
    //                        });
    //                        break;
    //                    case 2:
    //                        var nameValue = getControlObject(div, 'tIntroName').val();
    //                        if (nameValue == null || nameValue.length == 0) {
    //                            introNameError();
    //                        }
    //                        break;
    //                    case 3:
    //                        var nameValue = getControlObject(div, 'tIntroName').val();
    //                        if (nameValue == null || nameValue.length == 0) {
    //                            introNameError();
    //                        }
    //                        break;
    //                }
    //            }
    //        }
    //        catch (err) {
    //            errorHandle(formName, 'tIntroId_Change', err);
    //        }
    //    });
    //    function introNameError() {
    //        messageBox(options.language.introIdErrorNoCustomer, null, null, function () {
    //            getControlObject(div, 'tIntroId').jqxInput('focus');
    //        });
    //    }
    //};
    function dtFinTime_focusin(div) {
        getControlObject(div, 'dtFinTime').on('focusin', function () {
            $(this).csDateTime('setDate', new Date());
        });
    };
    //完工時間改變時
    function dtFinTime_dateChanged(div) {
        getControlObject(div, 'dtFinTime').on('dateChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var lang = options.language;
                var value = $(this).csDateTime('getDate');
                var loginInfoRow = options.loginInfo.loginInfo.rows[0];
                if (value == null || value.length == 0) {
                    var returnDisabled = (options.returnCodeDisabled == true);
                    getControlObject(div, 'csReturnCode').csList('disabled', returnDisabled);
                    getControlObject(div, 'tFinUnit').jqxNumberInput({ disabled: true });
                }
                else {
                    //若本欄有值, 則不可為未來日期
                    if (formatDateTime(value, 'date') > formatDateTime(new Date(), 'date')) {
                        messageBox(lang.finDateCannotBeFuture, null, null, function () {
                            getControlObject(div, 'dtFinTime').csDateTime('focus');
                        });
                        return;
                    }
                    //disable 退單原因
                    getControlObject(div, 'csReturnCode').csList('disabled', true);
                    //enable 完工點數
                    getControlObject(div, 'tFinUnit').jqxNumberInput({ disabled: false });
                    //簽收人員給預設值
                    getControlObject(div, 'csSignEn').csList('codeNo', loginInfoRow['entryid']);
                    getControlObject(div, 'csSignEn').csList('description', loginInfoRow['entryname']);
                    //簽收日期無值時加SO042.ModifyDateChange 需+上派工參數(SO042.MoreDay1)
                    if (getControlObject(div, 'dtSignDate').csDateTime('getText') == null || options.initData[wipSystemTableName].rows[0]['ModifyDateChange'.toUpperCase()] == 1) {
                        var d = formatDateTime($(this).csDateTime('getDate') + Number(options.initData[wipSystemTableName].rows[0]["MOREDAY1"]), "date");
                        var nd = formatDateTime(new Date(), 'date');
                        if (d > nd) {
                            getControlObject(div, 'dtSignDate').csDateTime('setText', nd);
                        }
                        else {
                            getControlObject(div, 'dtSignDate').csDateTime('setText', d);
                        }
                    }
                    //若本欄有值且派工點數有值且完工點數無值
                    if (getControlObject(div, 'tWorkUnit').jqxNumberInput('val') != null && (getControlObject(div, 'tFinUnit').jqxNumberInput('val') == null || getControlObject(div, 'tFinUnit').jqxInput('val') == 0)) {
                        getControlObject(div, 'tFinUnit').jqxNumberInput('val', getControlObject(div, 'tWorkUnit').jqxNumberInput('val'));
                    }
                    //若本欄有值,回報完工時間無值,則填入完工時間
                    if (getControlObject(div, 'dtCallOkTime').csDateTime('getDate') == null) {
                        getControlObject(div, 'dtCallOkTime').csDateTime('setDate', $(this).csDateTime('getDate'));
                    }
                }
            }
            catch (err) {
                errorHandle(formName, 'dtFinTime_dateChanged', err);
            }
        });
    };
    //取得客戶資料
    function getCustomer(div, custId, action) {
        try {
            var options = $.data(div, formName).options;

            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {
                CustId: { type: 'integer', value: custId },
                ServiceType: { type: 'string', value: options.serviceType },
                ID: { type: 'integer', value: null }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetCustomer',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        var r;
                        if (data.ResultBoolean == true) {
                            r = JSON.parse(data.ResultXML);
                        }
                        var flag = data.ResultBoolean;
                        var msg = data.ErrorMessage;
                        delete data;
                        refreshGrid(div);
                        action([flag, msg, r]);
                    }
                    catch (err) {
                        errorHandle(formName, 'getCustomer_success', err);
                        action([false]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getCustomer', err);
        }
    }
    //取得工單子檔資料
    function getWipDetailData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var getChangeData = (function () {
                var changeData = null;
                var closeName = closeProductTableName;
                if (options.closeData != null && options.closeData[closeName] != null) {
                    var tData = cloneJSON(options.closeData[closeName]);
                    addTableColumns(tData, ['DELETE003CITEM', 'CHOOSESERVICEID'], ['string', 'string'], false);
                    tData.rows[0]['DELETE003CITEM'] = getRowFieldString(tData, 'CITEMCODE');
                    tData.rows[0]['CHOOSESERVICEID'] = getRowFieldString(tData, 'SERVICEID');
                    changeData = cloneJSON(options.closeData);
                    changeData['ChangeData'] = tData;
                }
                return changeData;
            });
            var tCharge = getChangeData();
            var dsChangeData = null;
            if (tCharge != null) dsChangeData = JSON.stringify(tCharge);
            var dsMoveReInstData = null;
            if (options.moveReInstData != null) dsMoveReInstData = JSON.stringify(options.moveReInstData);
            var dsContact = null;
            if (options.parameters[contactTableName] != null) dsContact = JSON.stringify({ Contact: options.parameters[contactTableName] });
            var dsWipData = null;
            if (options.wipData != null) dsWipData = JSON.stringify(options.wipData);

            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {
                CustId: { type: 'integer', value: options.custId },
                ServiceType: { type: 'string', value: options.serviceType },
                WorkCodeValue: { type: 'integer', value: options.instCodeRow['CODENO'] },
                ResvTime: { type: 'datetime', value: options.resvTime },
                SNo: { type: 'string', value: options.sno },
                dsChangeData: { type: 'string', value: dsChangeData },
                dsMoveReInstData: { type: 'string', value: dsMoveReInstData },
                dsContact: { type: 'string', value: dsContact },
                dsWipData: { type: 'string', value: dsWipData }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetNormalCalculateData',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        if (data.ResultBoolean == true) {
                            var r = JSON.parse(data.ResultXML);
                            var tables = [wipTableName, chargeTableName, facilityTableName, productTableName, changeFaciTableName, changeProductTableName, otherChargeTableName];
                            var tLength = tables.length;
                            for (var i = 0; i < tLength; i++) {
                                if (r[tables[i]] != null) {
                                    delete options.wipData[tables[i]];
                                    options.wipData[tables[i]] = cloneJSON(r[tables[i]]);
                                }
                            }
                        }
                        var flag = data.ResultBoolean;
                        var msg = data.ErrorMessage;
                        delete r;
                        delete data;
                        refreshGrid(div);
                        action([flag, msg]);
                    }
                    catch (err) {
                        errorHandle(formName, 'getWipDetailData_success', err);
                        action([false]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getWipDetailData', err);
        }
    };
    function initList(div) {
        try {
            var options = $.data(div, formName).options;
            var csArrays = ["csInstCode",
                    "csMediaCode",
                    "csPromCode",
                    "csBulletinCode",
                    "csGroupCode", "csWorkerEn1", "csWorkerEn2",
                    "csReturnCode", "csReturnDescCode", "csSatiCode", "csSignEn"];
            var tableArrays = ["InstCode",
                    "MediaCode",
                    "PromCode",
                    "BulletinCode",
                    "GroupCode", "WorkerEn1", "WorkerEn2",
                    "ReturnCode", "ReturnDescCode", "SatiCode", "SignEn"];
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
            $(div).css('overflow', 'hidden');
            //$(div).css('padding', 2);
            //建立Splitter
            oArray = ["gbxAll"];
            oLength = oArray.length;
            //options.tabControls = writeALLTabIndex(div);
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxSplitter({
                    theme: options.theme,
                    height: $(div).height() - buttonsHeight - 4,
                    width: '100%',
                    orientation: 'horizontal',
                    splitBarSize: 2,
                    panels: [{ size: 340, collapsible: true }, { size: $(div).height() - buttonsHeight - 342 }]
                });
                controls.push({ name: iId, type: 'jqxSplitter', level: level });
                //$($('#' + iId).children()[0]).css('overflow', 'auto');
            }
            level += 1;
            //建立Panel
            oArray = ["gbxT", "gbxML", "gbxMM", "gbxMR"];
            var oHightArray = ["36", "296", "296", "296"];
            var oWidthArray = ["99.5%", "33%", "33%", "33%"];
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
                if (oArray[i] != "gbxT") {
                    var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                    for (var j = 0; j < scrollBars.length; j++) {
                        if ($('#' + iId + scrollBars[j]).length > 0) {
                            $('#' + iId + scrollBars[j]).css('display', 'none');
                        }
                    }
                }
            }
            level += 1;
            //建立內層Expander
            oArray = ["gbxInto", "gbxClose"];
            //oHightArray = ["170", "300"];
            oWidthArray = ["99%", "99%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxExpander({
                    theme: options.theme,
                    showArrow: false,
                    expanded: true,
                    toggleMode: 'none',
                    width: oWidthArray[i],
                    //height: oHightArray[i]
                });
                $('#' + iId).jqxExpander('setHeaderContent', lang[oArray[i]]);
                controls.push({ name: iId, type: 'jqxExpander', level: level });
            }
            level += 1;
            //建立內層panel
            oArray = ["gbxWork", "gbxPrint"];
            oHightArray = ["120", "68"];
            //oWidthArray = ["99.5%", "33.2%", "33%", "33%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxPanel({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: '98.5%'
                });
                controls.push({ name: iId, type: 'jqxPanel', level: level });
            }
            level += 1;
            //disableALLTabIndex(div);
            //建立input
            oArray = ["tInstCount", "tPinCode",
                    "tIntroId", "tIntroName"];
            oWidthArray = ["60%", "60%",
                    "30%", "30%"];
            oDisabled = [false, false,
                    false, true];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxInput({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: oDisabled[i]
                });
                controls.push({ name: iId, type: 'jqxInput', level: level });
            }
            //建立input
            oArray = ["tWorkUnit", "tFinUnit"];
            oWidthArray = ["25%", "25%"];
            oDisabled = [true, true];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxNumberInput({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: oDisabled[i],
                    digits: 3
                });
                controls.push({ name: iId, type: 'jqxNumberInput', level: level, disabled: oDisabled[i] });
            }
            //建立日期元件
            oArray = ["dtResvTime", "dtResvFlagTime",
                    "dtCallOkTime", "dtFinTime",
                    "dtSignDate"];
            oWidthArray = ["50%", "50",
                    "70%", "75%",
                    "75%"];
            var oShowCalendarButton = [false, false,
                    false, true,
                    true];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var fs = "yyyy/MM/dd HH:mm";
                var disabled = false;
                switch (oArray[i]) {
                    case "dtResvFlagTime":
                        fs = "HH:mm";
                        break;
                    case "dtSignDate":
                        fs = "yyyy/MM/dd";
                        break;
                    case 'dtCallOkTime':
                        disabled = true;
                        break;
                }
                $('#' + iId).csDateTime({
                    theme: options.theme,
                    formatString: fs,
                    showCalendarButton: oShowCalendarButton[i],
                    value: null,
                    height: textHeight,
                    disabled: disabled,
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csDateTime', level: level });
            }
            //建立單選元件
            oArray = ["csServiceType", "csInstCode",
                    "csMediaCode",
                    "csPromCode", "csBPCode",
                    "csBulletinCode",
                    "csGroupCode", "csWorkerEn1", "csWorkerEn2",
                    "csReturnCode", "csReturnDescCode", "csSatiCode", "csSignEn"];
            oWidthArray = ["75%", "75%",
                    "75%",
                    "75%", "75%",
                    "75%",
                    "75%", "75%", "75%",
                    "75%", "70%", "70%", "75%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var columns = {};
                if (oArray[i] == "csGroupCode") {
                    var columns = {
                        columns: [
                         { text: '', datafield: 'CODENO', width: 80 },
                         { text: '', datafield: 'DESCRIPTION', width: 70 }
                        ]
                    };
                }
                $('#' + iId).csList($.extend({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 80,
                    width: oWidthArray[i]
                }, columns));
                $('#' + iId).css({ "margin-left": 0 });
                controls.push({ name: iId, type: 'csList', level: level });
            }
            //建立CheckBox
            oArray = ["chkResvFlag", "chkPrintBillFlag"];
            oWidthArray = ["100", "80"];
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
            //建立備註
            oArray = ["tNote"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxTextArea({
                    theme: options.theme,
                    width: "75%",
                    height: textHeight * 4
                });
                //$('#' + iId).children().css('margin-left', 5);
                controls.push({ name: iId, type: 'jqxTextArea', level: level });
            }
            //建立按鈕
            oArray = ['btnSave', 'btnReserve2', 'btnViewPR', 'btnExit',
                'btnFindIntro', 'btnReserve',
                'btnSubAdd1', 'btnSubEdit1', 'btnSubDelete1',
                'btnSubAdd2', 'btnSubEdit2', 'btnSubDelete2'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var o = $('#' + iId);
                var img = {};
                var width = 100;
                var height = buttonsHeight;
                var text = lang[oArray[i]];
                var disabled = false;
                switch (oArray[i]) {
                    case "btnSave":
                        img = imageScr.save;
                        break;
                    case "btnExit":
                        img = imageScr.exit;
                        break;
                    case "btnFindIntro":
                        img = imageScr.query;
                        width = '15%';
                        text = '';
                        disabled = true;
                        break;
                    case "btnReserve":
                        img = imageScr.query;
                        width = '20%';
                        height = textHeight + 4;
                        break;
                    case "btnSubAdd1":
                    case "btnSubAdd2":
                        img = imageScr.append;
                        width = 30;
                        text = '';
                        break;
                    case "btnSubEdit1":
                    case "btnSubEdit2":
                        img = imageScr.edit;
                        width = 30;
                        text = '';
                        break;
                    case "btnSubDelete1":
                    case "btnSubDelete2":
                        img = imageScr.delete;
                        width = 30;
                        text = '';
                        break;
                    default:
                }
                o.text(text);
                var bOptions = $.extend({}, {
                    theme: options.theme,
                    width: width,
                    height: height,
                    disabled: disabled,
                    imgWidth: 20, imgHeight: 20
                }, img);
                if (isEmpty(text) != true) {
                    bOptions = $.extend({}, bOptions, imagePosition);
                }
                o.jqxButton(bOptions);
                $('#' + iId).find('img').css('top', (buttonsHeight - $('#' + iId).find("img").height()) / 2 - 1);
                $('#' + iId).find('span').css({ top: 4 });
                controls.push({ name: iId, type: 'jqxButton', level: level });
            }
            renderChargeGrid(div, level);
            renderFaciGrid(div, level);
            options.level = level;
            //disableALLTabIndex(div);
            //setALLTabIndex(tabControls, controls);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    //勤務派工
    function showReserve(div, action) {
        try {
            var options = $.data(div, formName).options;
            var width = $(div).width();
            var height = $(div).height();
            var objectName = 'SO1115A';
            var x = ($(options.container).width() - width) / 2;
            var y = 30;
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
            var win = createcsWindow(options.container, options.language['resvPoint'] + " [SO1115A]", winOptions);
            $('#' + win.windowId).on('close', function () {
                try {
                    var r = $.data($('#' + win.contentId)[0], 'SO1115A').options;
                    var resvTime = r.returnResvtime;
                    var groupNo = r.returnWorkCode;
                    var servCode = r.servCode;
                    var isSaved = r.isSaved;
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                    action({ isSaved: isSaved, resvTime: resvTime, groupNo: groupNo, servCode: servCode });
                }
                catch (err) {
                    errorHandle(formName, 'showReserve_close', err);
                }
            });
            var servCode = options.workServCode;
            var instRows = getRowByKeyValue(options.initData['InstCode'].rows, 'CODENO', getControlObject(div, 'csInstCode').csList('codeNo'));
            var groupNo = instRows['GROUPNO'];
            var resvTime = getControlObject(div, 'dtResvTime').csDateTime('getText');

            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                workCode: groupNo,
                resvTime: resvTime,
                servCode: servCode,
                theme: options.theme,
                localization: cloneJSON(options.localization)
            });
            options.controls.push({ name: win.contentId, type: objectName, level: options.level });

        }
        catch (err) {
            errorHandle(formName, 'showReserve', err);
        }
    };
    //
    function showReserve2(div, action) {
        try {
            var options = $.data(div, formName).options;
            var width = 940;
            var height = 500;
            var objectName = 'SO1114A';
            if (width > $(div).width()) width = $(div).width();
            if (height > $(div).height()) height = $(div).height();
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
            var win = createcsWindow(options.container, options.language['btnReserve2'] + " [SO1114A]", winOptions);
            $('#' + win.windowId).on('close', function () {
                try {
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                }
                catch (err) {
                    errorHandle(formName, 'showReserve2_close', err);
                }
            });
            var servCode = options.workServCode;
            var instRows = getRowByKeyValue(options.initData['InstCode'].rows, 'CODENO', getControlObject(div, 'csInstCode').csList('codeNo'));
            var groupNo = instRows['GROUPNO'];
            var resvTime = getControlObject(div, 'dtResvTime').csDateTime('getText');
            var workerType = "1";
            if (resvTime == null) resvTime = new Date();
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                servCode: servCode,
                resvTime: resvTime,
                workerType: workerType,
                theme: options.theme,
                localization: cloneJSON(options.localization)
            });
            options.controls.push({ name: win.contentId, type: objectName, level: options.level });
        }
        catch (err) {
            errorHandle(formName, 'showReserve2', err);
        }
    };
    //介紹人
    function showIntroData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var width = 500;
            var height = 600;
            var objectName = 'SO111FA';
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
                hasClosing: false,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language['chooseIntro'] + " [SO111FA]", winOptions);
            $('#' + win.windowId).on('close', function () {
                var r = $.data($('#' + win.contentId)[0], 'SO111FA').options;
                $('#' + win.contentId)[objectName]('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                action({ isSaved: r.introData.rows.length > 0, introData: r.introData });
            });
            var refNo = 0;
            var row = getRowByKeyValue(options.initData['MediaCode'].rows, 'CODENO', getControlObject(div, 'csMediaCode').csList('codeNo'));
            if (row != null) refNo = row['REFNO'];
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                mediaRefNo: refNo,
                editMode: options.editMode,
                theme: options.theme,
                localization: cloneJSON(options.localization)
            });
            options.controls.push({ name: win.contentId, type: objectName, level: options.level });

        }
        catch (err) {
            errorHandle(formName, 'showIntroData', err);
        }
    };
    //選取變更設備
    function showChangeFaci(div, action) {
        try {
            var options = $.data(div, formName).options;
            var width = $(div).width();
            var height = $(div).height();
            var objectName = 'SO111XD';
            var x = ($(options.container).width() - width) / 2;
            var y = 30;
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
            var win = createcsWindow(options.container, options.language['chooseFacilityKind'] + " [SO111XD]", winOptions);
            $('#' + win.windowId).on('close', function () {
                try {
                    var r = $.data($('#' + win.contentId)[0], 'SO111XD').options;
                    var wipData = cloneJSON(r.wipDataCopy);
                    var isSaved = true;
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                    action({ isSaved: isSaved, wipData: wipData });
                }
                catch (err) {
                    errorHandle(formName, 'showChangeFaci_close', err);
                }
            });
            var canDo = $.fn.WipUtility('getUserPriv', {
                groupId: options.loginInfo.loginInfo.rows[0].groupid,
                privName: "SO11118",
                privData: options.initData[userPrivTableName]
            });
            var canCancel = canDo;

            if (isEmpty(getControlObject(div, "dtCallOkTime").csDateTime('getText')) == false) {
                canDo = false;
                canCancel = false;
            }
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                custId: options.custId,
                serviceType: options.serviceType,
                sno: options.SNo,
                wipData: cloneJSON(options.wipData),
                wipType: 1,
                wipRefNo: options.instCodeRow['refNo'.toUpperCase()],
                reInstAcrossFlag: (options.instCodeRow['ReInstAcrossFlag'.toUpperCase()] == 1),
                isWip: true,
                canDo: canDo,
                canCancel: canCancel,
                editMode: options.editMode,
                theme: options.theme,
                localization: cloneJSON(options.localization)
            });
            options.controls.push({ name: win.contentId, type: objectName, level: options.level });

        }
        catch (err) {
            errorHandle(formName, 'showChangeFaci', err);
        }
    };
    //設備資料
    function showFacilityData(div, em, rowIndex, action) {
        try {
            var options = $.data(div, formName).options;
            var method;
            var objectName = "SO1120A";
            if (em == editMode.append) { method = "canAppend"; }
            else { method = "canEdit"; }
            var data = {};
            if (em == editMode.append) {
                data = {
                    Facility: {
                        columns: [
                            { name: "CUSTID", type: "integer" },
                            { name: "SERVICETYPE", type: "string" },
                            { name: "SEQNO", type: "string" }
                        ], rows: [{
                            CUSTID: options.custId,
                            SERVICETYPE: options.serviceType
                        }]
                    }
                };
            }
            else {
                //data = cloneDataTable(options.wipData, facilityTableName, rowIndex);
                data = cloneDataTable(options.wipData, facilityTableName, null, true);
            }
            data[chooseFaciTableName] = cloneJSON(options.wipData[facilityTableName]);

            $.fn[objectName](method, $.extend({ wipType: 1 }, options.loginInfo, data), function (r) {
                if (r[0] != true) {
                    if (r[1] != null) {
                        messageBox(r[1]);
                    }
                    deleteJSONObject(data);
                    action({ isSaved: false });
                    return;
                }
                var width = options.container.width();
                var height = $(div).height();
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
                var win = createcsWindow(options.container, options.language['facilityDetail'] + " [SO1120A]", winOptions);

                $('#' + win.windowId).on('close', function () {
                    try {
                        var r = $.data($('#' + win.contentId)[0], objectName).options;
                        var wipData = cloneJSON(r.wipData);
                        var isSaved = r.isSaved;
                        $('#' + win.contentId)[objectName]('destroy');
                        $('#' + win.windowId).csWindow('destroy');
                        options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                        options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                        deleteJSONObject(data);
                        action({ isSaved: isSaved, wipData: wipData });
                    }
                    catch (err) {
                        errorHandle(formName, 'showFacilityData_close', err);
                    }
                });
                $('#' + win.contentId)[objectName]({
                    loginInfo: cloneJSON(options.loginInfo),
                    container: $('#' + win.windowId),
                    parameters: cloneJSON(options.parameters),
                    wipData: data,
                    selectedRowindex: rowIndex,
                    wipType: 1,
                    editMode: em,
                    theme: options.theme,
                    localization: cloneJSON(options.localization)
                });
                options.controls.push({ name: win.contentId, type: objectName, level: options.level });
            });
        }
        catch (err) {
            errorHandle(formName, 'showFacilityData', err);
        }
    };
    function getMaxItem(div) {
        try {
            var options = $.data(div, formName).options;
            var item = 0;
            if (options.wipData[chargeTableName].rows.length > 0) {
                var rows = cloneJSON(options.wipData[chargeTableName].rows);
                rows = sortObject(rows, "ITEM desc");
                item = rows[0]["ITEM"];
                deleteJSONObject(rows);
            }
            return item;
        }
        catch (err) {
            errorHandle(formName, 'getMaxItem', err);
        }
    };
    //收費資料
    function showChargeData(div, em, rowIndex, action) {
        try {
            var options = $.data(div, formName).options;
            var method;
            var objectName = "SO1132A";
            if (em == editMode.append) { method = "canAppend"; }
            else { method = "canEdit"; }
            var data = {};
            if (em == editMode.append) {
                data = {
                    Simple: {
                        columns: cloneJSON(options.wipData[chargeTableName].columns), rows: [{
                            CUSTID: options.custId,
                            SERVICETYPE: options.serviceType,
                            BILLNO: options.sno,
                            ITEM: getMaxItem(div) + 1
                        }]
                    }
                };
            }
            else {
                data = cloneDataTable(options.wipData, chargeTableName, rowIndex, null, "Simple");
            }
            data[chooseFaciTableName] = cloneJSON(options.wipData[facilityTableName]);

            $.fn[objectName](method, $.extend({ wipType: 1 }, options.loginInfo, data), function (r) {
                if (r[0] != true) {
                    if (r[1] != null) {
                        messageBox(r[1]);
                    }
                    deleteJSONObject(data);
                    action({ isSaved: false });
                    return;
                }
                var width = options.container.width();
                var height = $(div).height();
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
                var win = createcsWindow(options.container, options.language['chargeDetail'] + " [SO1132A]", winOptions);

                $('#' + win.windowId).on('close', function () {
                    try {
                        var r = $.data($('#' + win.contentId)[0], objectName).options;
                        var wipData = cloneJSON(r.wipData);
                        var isSaved = r.isSaved;
                        $('#' + win.contentId)[objectName]('destroy');
                        $('#' + win.windowId).csWindow('destroy');
                        options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                        options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);

                        deleteJSONObject(data);
                        action({ isSaved: isSaved, wipData: wipData });
                    }
                    catch (err) {
                        errorHandle(formName, 'showChargeData_close', err);
                    }
                });
                var resvTime = getControlObject(div, "dtResvTime").csDateTime('getDate');
                var clctEn = getControlObject(div, 'csWorkerEn1').csList('codeNo');
                var clctName = getControlObject(div, 'csWorkerEn1').csList('description');
                $('#' + win.contentId)[objectName]({
                    loginInfo: cloneJSON(options.loginInfo),
                    container: $('#' + win.windowId),
                    parameters: cloneJSON(options.parameters),
                    wipData: data,
                    wipType: 1,
                    editMode: em,
                    wipResvTime: resvTime,
                    wipClctEn: clctEn,
                    wipClctName: clctName,
                    theme: options.theme,
                    localization: cloneJSON(options.localization)
                });
                options.controls.push({ name: win.contentId, type: objectName, level: options.level });
            });
        }
        catch (err) {
            errorHandle(formName, 'showChargeData', err);
        }
    };
    //收費資料
    function deleteCharge(div, rowIndex, action) {
        try {
            var options = $.data(div, formName).options;
            if (options.wipData[chargeTableName].rows[rowIndex]["ROWID"] == null) {
                messageBox(options.language.sureDelete, messageType.yesno, null, function (flag) {
                    if (flag == 'yes') {
                        var row = getControlObject(div, "gCharge").jqxGrid('getrows')[rowIndex];
                        options.wipData[chargeTableName].rows = deleteRowByKeyValue(options.wipData[chargeTableName].rows, ["BILLNO", "ITEM"], [row["BILLNO"], row['ITEM']]);
                        action({ isSaved: true });
                    }
                    else {
                        action({ isSaved: false });
                    }
                });
                return;
            }
            var width = 400;
            var height = 200;
            var objectName = "SO1132A1";
            var data = cloneDataTable(options.wipData, chargeTableName, rowIndex, null, "Simple");
            //$.fn[objectName]('canDelete', $.extend({ wipType: 1 }, options.loginInfo, data), function (r) {
            //if (r[0] != true) {
            //    if (r[1] != null) {
            //        messageBox(r[1]);
            //    }
            //    deleteJSONObject(data);
            //    action({ isSaved: false });
            //    return;
            //}
            var x = ($(options.container).width() - width) / 2;
            var y = ($(options.container).height() - height) / 2;
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: false,
                hasClosing: false,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language['delChargeDetail'] + " [SO1132A1]", winOptions);
            $('#' + win.windowId).on('close', function () {
                try {
                    var r = $.data($('#' + win.contentId)[0], objectName).options;
                    var wipData = cloneJSON(r.wipData);
                    var isSaved = r.isSaved;
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    deleteJSONObject(data);
                    action({ isSaved: isSaved, wipData: wipData });
                }
                catch (err) {
                    errorHandle(formName, 'showChargeData_close', err);
                }
            });
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                wipData: data,
                editMode: editMode.delete,
                wipType: 1,
                theme: options.theme,
                localization: options.localization
            });
            //});
        }
        catch (err) {
            errorHandle(formName, 'deleteCharge', err);
        }
    };
    function deleteFacility(div, rowIndex, action) {
        try {
            var options = $.data(div, formName).options;
            var row = getControlObject(div, "gFacility").jqxGrid('getrows')[rowIndex];
            var data = cloneDataTable(options.wipData, facilityTableName, rowIndex, null, facilityTableName);
            ////同區移機
            //if (row["PRFLAG"] == 1) {
            //    messageBox(options.language.moveInCannotDelete);
            //    action({ isSaved: false });
            //    return;
            //}
            ////換裝不能刪
            //if (row["RESEQNO"] != null) {
            //    messageBox(options.language.reInstFaciCannotDelete);
            //    action({ isSaved: false });
            //    return;
            //}
            $.fn["SO1120A"]('canDelete', $.extend({ wipType: 1 }, options.loginInfo, data), function (r) {
                if (r[0] != true) {
                    if (r[1] != null) {
                        messageBox(r[1]);
                    }
                    deleteJSONObject(data);
                    action({ isSaved: false });
                    return;
                }
                messageBox(options.language.sureDelete, messageType.yesno, null, function (flag) {
                    if (flag == 'yes') {
                        options.wipData[facilityTableName].rows = deleteRowByKeyValue(options.wipData[facilityTableName].rows, "SEQNO", row["SEQNO"]);
                        options.wipData[changeFaciTableName].rows = deleteRowByKeyValue(options.wipData[changeFaciTableName].rows, "SEQNO", row["SEQNO"]);
                        action({ isSaved: true });
                    }
                    else {
                        action({ isSaved: false });
                    }
                });
            });
        }
        catch (err) {
            errorHandle(formName, 'deleteFacility', err);
        }
    }
    //更新ICC資料
    function changeICCData(div, faciRow) {
        try {
            var options = $.data(div, formName).options;
            //ICC設備

            //options.CMBaudNo = faciRow["CMBaudNo".toUpperCase()];
            //options.CMBaudRate = faciRow["CMBaudRate".toUpperCase()];
            //更新Facility
            //更新ChangeFacility
        }
        catch (err) {
            errorHandle(formName, 'changeICCData', err);
        }
    }
    //更新CM資料
    function changeCMData(div, faciRow) {
        try {
            var options = $.data(div, formName).options;
            //更新Wip
            options.CMBaudNo = faciRow["CMBaudNo".toUpperCase()];
            options.CMBaudRate = faciRow["CMBaudRate".toUpperCase()];
            //更新Facility
            //更新ChangeFacility
        }
        catch (err) {
            errorHandle(formName, 'changeCMData', err);
        }
    }
    function checkInstCode(div) {
        try {
            var options = $.data(div, formName).options;
            if (isEmpty(getControlObject(div, 'csInstCode').csList('codeNo'))) {
                messageBox(options.language.chooseInstCode, null, null, function () {
                    getControlObject(div, 'csInstCode').csList('focus');
                });
                return false;
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'checkInstCode', err);
        }
    }
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //存檔
            getControlObject(div, 'btnSave').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                save(div, function (isOk, msg) {
                    if (!isOk) {
                        if (isEmpty(msg) != true) {
                            messageBox(msg, messageType.critical);
                        }
                        return;
                    }
                    options.isSaved = true;
                    $('#' + $(div).prop('id') + 'btnExit').triggerHandler('click');
                })
            });
            //勤務派工
            getControlObject(div, 'btnReserve').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (checkInstCode(div) == false) {
                    return;
                }
                disableAllControls(options.controls, true, true);
                showReserve(div, function (r) {
                    if (r['isSaved'] == true) {
                        options.groupNo = r['groupNo'];
                        options.workServCode = r['servCode'];
                        getControlObject(div, 'dtResvTime').csDateTime('setText', formatDateTime(new Date(r['resvTime']), 'datetime'));
                    }
                    disableAllControls(options.controls, false, true);
                });
            });
            //預約明細
            getControlObject(div, 'btnReserve2').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (checkInstCode(div) == false) {
                    return;
                }
                showReserve2(div, function (r) { });
            });
            //介紹人
            getControlObject(div, 'btnFindIntro').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                showIntroData(div, function (r) {
                    try {
                        if (r.isSaved == true) {
                            getControlObject(div, 'tIntroId').jqxInput('val', r.introData.rows[0]['CODENO']);
                            getControlObject(div, 'tIntroName').jqxInput('val', r.introData.rows[0]['DESCRIPTION']);
                        }
                        delete r;
                    }
                    catch (err) {
                        errorHandle(formName, 'btnFindIntro_click', err);
                    }
                });
            });
            //指定變更設備
            getControlObject(div, 'btnViewPR').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (checkInstCode(div) == false) {
                    return;
                }
                showChangeFaci(div, function (r) {
                    try {
                        if (r.isSaved == true && r.wipData != null) {
                            //將facility,prFacility,changeFacility 取代
                            options.wipData[facilityTableName] = r.wipData[facilityTableName];
                            options.wipData[prFacilityTableName] = r.wipData[prFacilityTableName];
                            options.wipData[changeFaciTableName] = r.wipData[changeFaciTableName];
                            refreshGrid(div);
                        }
                    }
                    catch (err) {
                        errorHandle(formName, 'btnViewPR_click', err);
                    }

                });
            });
            //指定變更產品
            //getControlObject(div, 'btnChangeProd').on('click', function () {
            //    if ($(this).jqxButton('disabled')) { return; }
            //    if (checkInstCode() == false) {
            //        return;
            //    }
            //    //changeMode(div, editMode.append);
            //});
            //取消
            getControlObject(div, 'btnExit').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                close(div);
            });
            facilityHandler(div);
            chargeHandler(div);
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    function checkChildPriv(div, em, type) {
        try {
            var options = $.data(div, formName).options;
            var ops = {
                editMode: em,
                wipType: 1,
                groupId: options.loginInfo.loginInfo.rows[0]["groupid"],
                isOrder: isEmpty(getControlObject(div, 'tOrderNo').text()) != true,
                privData: options.initData[userPrivTableName].rows
            }
            if (type == 0) {
                return $.fn.WipUtility("getFaciPriv", ops);
            }
            else {
                return $.fn.WipUtility("getChargePriv", ops);
            }
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    }
    function facilityHandler(div) {
        var options = $.data(div, formName).options;
        //設備-新增
        getControlObject(div, 'btnSubAdd1').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            if (checkInstCode(div) == false || checkChildPriv(div, editMode.append, 0) == false) {
                return;
            }
            disableAllControls(options.controls, true, true);
            showFacilityData(div, editMode.append, -1, function (r) {
                try {
                    if (r.isSaved == true) {
                        var newRow = r.wipData[facilityTableName].rows[0];
                        options.wipData[facilityTableName].rows.push(copyRowToRow(null, newRow, options.wipData[facilityTableName].columns));
                        changeCMData(div, newRow);
                        refreshGrid(div);
                    }
                }
                catch (err) {
                    errorHandle(formName, 'facilityHandler_showFacilityData', err);
                }
                disableAllControls(options.controls, false, true);
                setSubButton(div);
                instRefnoEnable(div);
            });
        });
        //設備-修改
        getControlObject(div, 'btnSubEdit1').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            var rows = getControlObject(div, "gFacility").jqxGrid('getrows');
            if (rows.length == 0) return;
            if (checkInstCode(div) == false || checkChildPriv(div, editMode.edit, 0) == false) {
                return;
            }
            var rowIndex = getControlObject(div, "gFacility").jqxGrid('getselectedrowindex');
            disableAllControls(options.controls, true, true);

            showFacilityData(div, editMode.edit, rowIndex, function (r) {
                try {
                    if (r.isSaved == true) {
                        deleteJSONObject(options.wipData, facilityTableName);
                        options.wipData[facilityTableName] = cloneJSON(r.wipData[facilityTableName]);
                        var newRow = options.wipData[facilityTableName].rows[rowIndex];
                        changeCMData(div, newRow);
                        changeICCData(div, newRow);
                        refreshGrid(div);
                    }
                }
                catch (err) {
                    errorHandle(formName, 'facilityHandler_showFacilityData', err);
                }
                disableAllControls(options.controls, false, true);
                setSubButton(div);
                instRefnoEnable(div);
            });
        });
        //設備-刪除
        getControlObject(div, 'btnSubDelete1').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            var rows = getControlObject(div, "gFacility").jqxGrid('getrows');
            if (rows.length == 0) return;
            if (checkInstCode(div) == false || checkChildPriv(div, editMode.delete, 0) == false) {
                return;
            }
            var rowIndex = getControlObject(div, "gFacility").jqxGrid('getselectedrowindex');
            disableAllControls(options.controls, true, true);
            deleteFacility(div, rowIndex, function (r) {
                if (r.isSaved == true) {
                    refreshGrid(div);
                }
                disableAllControls(options.controls, false, true);
                setSubButton(div);
                instRefnoEnable(div);
            });
        });
    }
    function chargeHandler(div) {
        var options = $.data(div, formName).options;
        //收費-新增
        getControlObject(div, 'btnSubAdd2').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            if (checkInstCode(div) == false || checkChildPriv(div, editMode.append, 1) == false) {
                return;
            }
            disableAllControls(options.controls, true, true);
            showChargeData(div, editMode.append, -1, function (r) {
                try {
                    if (r.isSaved == true) {
                        var newRow = r.wipData['Simple'].rows[0];
                        //2019/02/26 Jacky 8147
                        newRow["ADDFLAG"] = 1;
                        options.wipData[chargeTableName].rows.push(copyRowToRow(null, newRow, options.wipData[chargeTableName].columns));
                        refreshGrid(div);
                    }
                }
                catch (err) {
                    errorHandle(formName, 'facilityHandler_showChargeData', err);
                }
                disableAllControls(options.controls, false, true);
                setSubButton(div);
                instRefnoEnable(div);
            });
            //changeMode(div, editMode.append);
        });
        //收費-修改
        getControlObject(div, 'btnSubEdit2').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            var rows = getControlObject(div, "gCharge").jqxGrid('getrows');
            if (rows.length == 0) return;
            if (checkInstCode(div) == false || checkChildPriv(div, editMode.edit, 1) == false) {
                return;
            }
            var rowIndex = getControlObject(div, "gCharge").jqxGrid('getselectedrowindex');
            disableAllControls(options.controls, true, true);
            showChargeData(div, editMode.edit, rowIndex, function (r) {
                try {
                    if (r.isSaved == true) {
                        var newRow = r.wipData["Simple"].rows[0];
                        var row = options.wipData[chargeTableName].rows[rowIndex];
                        options.wipData[chargeTableName].rows[rowIndex] = copyRowToRow(row, newRow, options.wipData[chargeTableName].columns);
                        refreshGrid(div);
                    }
                }
                catch (err) {
                    errorHandle(formName, 'facilityHandler_showChargeData', err);
                }
                disableAllControls(options.controls, false, true);
                setSubButton(div);
                instRefnoEnable(div);
            });
            //changeMode(div, editMode.append);
        });
        //收費-作廢
        getControlObject(div, 'btnSubDelete2').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            var rows = getControlObject(div, "gCharge").jqxGrid('getrows');
            if (rows.length == 0) return;
            if (checkInstCode(div) == false || checkChildPriv(div, editMode.delete, 1) == false) {
                return;
            }
            var rowIndex = getControlObject(div, "gCharge").jqxGrid('getselectedrowindex');
            disableAllControls(options.controls, true, true);
            deleteCharge(div, rowIndex, function (r) {
                try {
                    if (r.isSaved == true) {
                        if (r.wipData != null) {
                            var newRow = r.wipData["Simple"].rows[0];
                            var row = options.wipData[chargeTableName].rows[rowIndex];
                            options.wipData[chargeTableName].rows[rowIndex] = copyRowToRow(row, newRow, options.wipData[chargeTableName].columns);
                        }
                        refreshGrid(div);
                    }
                }
                catch (err) {
                    errorHandle(formName, 'facilityHandler_deleteCharge', err);
                }
                disableAllControls(options.controls, false, true);
                setSubButton(div);
            });
        });
    }
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                var closeWin = function () {
                    options.closingOk = true;
                    if (options.editMode == editMode.view) {
                        $(options.container).csWindow('close');
                    }
                    else {
                        delResvPoint(div, function () {
                            $(options.container).csWindow('close');
                        });
                    }
                }
                if (options.editMode != editMode.view && options.isSaved != true) {
                    messageBox(lang.sureNoSaveExit, messageType.yesno, null, function (flag) {
                        if (flag == 'yes') {
                            //$(options.container).csWindow('close');
                            closeWin();
                        }
                    });
                }
                else {
                    //$(options.container).csWindow('close');
                    closeWin();
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    }
    function delResvPoint(div, action) {
        try {
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, cloneJSON(paraLoginInfo));
            var params = getParameters(riadllName,
                riaClassName,
                'DelResvPoint',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    //忽略錯誤
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        action(d);
                    }
                    catch (err) {
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'delResvPoint', err);
        }
    }
    function renderChargeGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var height = 116;
            var gridId = $(div).prop('id') + 'gCharge';
            options.chargeGridSource = {
                datatype: "json",
                //localdata: data
                datafields: [
                    { name: 'CITEMCODE', type: 'int' },
                    { name: 'CITEMNAME', type: 'string' },
                    { name: 'OLDAMT', type: 'float' },
                    { name: 'SHOULDAMT', type: 'float' },
                    { name: 'REALSTARTDATE', type: 'date' },
                    { name: 'REALSTOPDATE', type: 'date' },
                    { name: 'REALPERIOD', type: 'int' },
                    { name: 'REALAMT', type: 'float' },
                    { name: 'CANCELFLAG', type: 'boolean' },
                    { name: 'CLCTNAME', type: 'string' },
                    { name: 'TYPE', type: 'int' },
                    { name: 'CHEVEN', type: 'int' },
                    { name: 'ADDFLAG', type: 'int' },
                    { name: 'BILLNO', type: 'string' },
                    { name: 'ITEM', type: 'int' },
                ]
            };
            var colorRed = (function (row, field, value, defaulthtml, columnproperties) {
                var val = $(defaulthtml);
                val.css('color', 'red');
                return val[0].outerHTML;
            });
            var dataAdapter = new $.jqx.dataAdapter(options.chargeGridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: height,
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.gCharge_CITEMCODE, datafield: 'CITEMCODE', width: 60 },
                  { text: lang.gCharge_CITEMNAME, datafield: 'CITEMNAME', width: 150 },
                  {
                      text: lang.gCharge_OLDAMT, datafield: 'OLDAMT', width: 60, cellsalign: 'right', align: 'right',
                      cellsrenderer: colorRed
                  },
                  {
                      text: lang.gCharge_SHOULDAMT, datafield: 'SHOULDAMT', width: 60, cellsalign: 'right', align: 'right',
                      cellsrenderer: colorRed
                  },
                  { text: lang.gCharge_REALSTARTDATE, datafield: 'REALSTARTDATE', width: 100, cellsformat: 'yyyy/MM/dd' },
                  { text: lang.gCharge_REALSTOPDATE, datafield: 'REALSTOPDATE', width: 100, cellsformat: 'yyyy/MM/dd' },
                  { text: lang.gCharge_REALPERIOD, datafield: 'REALPERIOD', width: 40, cellsalign: 'right', align: 'right' },
                  {
                      text: lang.gCharge_REALAMT, datafield: 'REALAMT', width: 60, cellsalign: 'right', align: 'right',
                      cellsrenderer: colorRed
                  },
                  {
                      text: lang.gCharge_CANCELFLAG, columntype: 'checkbox', datafield: 'CANCELFLAG', width: 50, cellsalign: 'center', align: 'center',
                      //cellsrenderer: function (row, field, value, defaulthtml, columnproperties) {
                      //    var val = $(defaulthtml);
                      //    if (value == '1') {
                      //        val.text(lang.isYes);
                      //        val.css('color', 'red');
                      //    }
                      //    else {
                      //        val.text(lang.isNo);
                      //    }
                      //    return val[0].outerHTML;
                      //}
                  },
                  { text: lang.gCharge_CLCTNAME, datafield: 'CLCTNAME', width: 100 },
                  {
                      text: lang.gCharge_TYPE, datafield: 'TYPE', width: 50, cellsalign: 'center', align: 'center',
                      cellsrenderer: function (row, field, value, defaulthtml, columnproperties) {
                          try {
                              var val = $(defaulthtml);
                              if (value == null || Number(value) == 0) {
                                  val.text(lang.isNotClose);
                              }
                              else {
                                  val.text(lang.isClose);
                                  val.css('color', 'red');
                              }
                              return val[0].outerHTML;
                          }
                          catch (err) {
                              errorHandle(formName, 'renderChargeGrid_TYPE', err);
                          }
                      }
                  },
                  {
                      text: lang.gCharge_ADDFLAG, datafield: 'ADDFLAG', width: 50, cellsalign: 'center', align: 'center',
                      cellsrenderer: function (row, field, value, defaulthtml, columnproperties) {
                          try {
                              var val = $(defaulthtml);
                              var text;
                              switch (value + "") {
                                  case "2":
                                      text = lang.isAddClose;
                                      break;
                                  case "3":
                                      text = lang.isAddChange;
                                      break;
                                  case "1":
                                      text = lang.isAddNormal;
                                      break;
                                  default:
                                      text = ""
                              }
                              val.text(text);
                              return val[0].outerHTML;
                          }
                          catch (err) {
                              errorHandle(formName, 'renderChargeGrid_ADDFLAG', err);
                          }
                      }
                  },
                  { text: lang.gCharge_BILLNO, datafield: 'BILLNO', width: 120 },
                  { text: lang.gCharge_ITEM, datafield: 'ITEM', width: 50 },
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
            $('#' + gridId).on('rowdoubleclick', function (e) {
                var args = e.args;
                var rowIndex = args.rowindex;
                disableAllControls(options.controls, true, true);
                showChargeData(div, editMode.view, rowIndex, function (r) {
                    disableAllControls(options.controls, false, true);
                });
            });
            //refreshGrid(div);
        }
        catch (err) {
            errorHandle(formName, 'renderChargeGrid', err);
        }
    };

    function renderFaciGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var height = 116;
            var gridId = $(div).prop('id') + 'gFacility';
            options.faciGridSource = {
                datatype: "json",
                //localdata: data
            };
            var dataAdapter = new $.jqx.dataAdapter(options.faciGridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99%',
                height: height,
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.gFacility_FACINAME, datafield: 'FACINAME', width: 90 },
                  { text: lang.gFacility_FACISNO, datafield: 'FACISNO', width: 150 },
                  { text: lang.gFacility_MODELNAME, datafield: 'MODELNAME', width: 60 },
                  { text: lang.gFacility_DVRAUTHSIZECODE, datafield: 'DVRAUTHSIZECODE', width: 60 },
                  { text: lang.gFacility_CMBAUDRATE, datafield: 'CMBAUDRATE', width: 60 },
                  { text: lang.gFacility_FIXIPCOUNT, datafield: 'FIXIPCOUNT', width: 60 },
                  { text: lang.gFacility_DYNIPCOUNT, datafield: 'DYNIPCOUNT', width: 60 }
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
            $('#' + gridId).on('rowdoubleclick', function (e) {
                var args = e.args;
                var rowIndex = args.rowindex;
                disableAllControls(options.controls, true, true);
                showFacilityData(div, editMode.view, rowIndex, function (r) {
                    disableAllControls(options.controls, false, true);
                });
            });
            //refreshGrid(div);
        }
        catch (err) {
            errorHandle(formName, 'renderFaciGrid', err);
        }
    };
    function getFalseSNo() {
        var d = new Date();
        return formatDateTime(d, 'date', false).substr(0, 6) + 'I' + formatDateTime(d, 'time3', false);
    };
    function newRcd(div) {
        try {
            var options = $.data(div, formName).options;
            //SO1100101完整顯示身份證字號、SO1100102完整顯示個資權限
            var priv2 = getUserPriv(options.initData[userPrivTableName], "SO1100102");
            var priv1 = getUserPriv(options.initData[userPrivTableName], "SO1100101") && priv2;
            options.sno = getFalseSNo();
            getControlObject(div, 'tSno').text(options.sno);
            getControlObject(div, 'tAcceptEn').text(options.loginInfo.loginInfo.rows[0].entryid + "/ " + options.loginInfo.loginInfo.rows[0].entryname);
            var acceptTime = formatDateTime(new Date(), 'datetime2');
            getControlObject(div, 'tAcceptTime').text(acceptTime);
            getControlObject(div, 'tServName').text(options.initData[customerTableName].rows[0]['SERVNAME']);

            if (options.initData[proposerTableName] != null && options.initData[proposerTableName].rows.length > 0) {
                getControlObject(div, 'tContName').text(convertNullToString(maskData(options.initData[proposerTableName].rows[0]['DeclarantName'.toUpperCase()], "name", priv2)));
                getControlObject(div, 'tContTel').text(convertNullToString(maskData(options.initData[proposerTableName].rows[0]['ContTel'.toUpperCase()], "tel", priv2)));
                getControlObject(div, 'tContmobile').text(convertNullToString(maskData(options.initData[proposerTableName].rows[0]['Contmobile'.toUpperCase()], "tel", priv2)));

                getControlObject(div, 'tID').text(convertNullToString(maskData(options.initData[proposerTableName].rows[0]['ID'], "id", priv1)));

                options.contName = options.initData[proposerTableName].rows[0]['DeclarantName'.toUpperCase()];
                options.contTel = options.initData[proposerTableName].rows[0]['ContTel'.toUpperCase()];
                options.contmobile = options.initData[proposerTableName].rows[0]['Contmobile'.toUpperCase()];
                options.ID = options.initData[proposerTableName].rows[0]['ID'];
            }
            else {
                getControlObject(div, 'tContName').text(convertNullToString(maskData(options.initData[customerTableName].rows[0]['CUSTNAME'.toUpperCase()], "name", priv2)));
                getControlObject(div, 'tContTel').text(convertNullToString(maskData(options.initData[customerTableName].rows[0]['TEL1'.toUpperCase()], "tel", priv2)));
                getControlObject(div, 'tContmobile').text(convertNullToString(maskData(options.initData[customerTableName].rows[0]['TEL3'.toUpperCase()], "tel", priv2)));

                getControlObject(div, 'tID').text(convertNullToString(maskData(options.initData[customerTableName].rows[0]['ID'], "id", priv1)));

                options.contName = options.initData[customerTableName].rows[0]['CUSTNAME'.toUpperCase()];
                options.contTel = options.initData[customerTableName].rows[0]['TEL1'.toUpperCase()];
                options.contmobile = options.initData[customerTableName].rows[0]['TEL3'.toUpperCase()];
                options.ID = options.initData[customerTableName].rows[0]['ID'];
            }

            options.servCode = options.initData[customerTableName].rows[0]['SERVCODE'];
            options.workServCode = options.servCode;
            getControlObject(div, 'tPrintUserName').text('');
            getControlObject(div, 'tPrintTime').text('');
            getControlObject(div, 'tPrtCount').text('');
            getControlObject(div, 'tClsTime').text('');
            getControlObject(div, "csServiceType").csList('codeNo', options.serviceType);

            //預設互動資料
            defContact(div);
        }
        catch (err) {
            errorHandle(formName, 'newRcd', err);
        }
    };

    function defContact(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.parameters[contactTableName] != null) {
                var row = options.parameters[contactTableName].rows[0];
                getControlObject(div, 'csMediaCode').csList('codeNo', row['MEDIACODE']);
                getControlObject(div, 'csBulletinCode').csList('codeNo', row['BulletinCode'.toUpperCase()]);
                getControlObject(div, 'csPromCode').csList('codeNo', row['PromCode'.toUpperCase()]);
            }
        }
        catch (err) {
            errorHandle(formName, 'defContact', err);
        }
    };

    function rcdToScr(div) {
        try {
            var options = $.data(div, formName).options;
            var row = options.wipData[wipTableName].rows[0];
            var loginInfoRow = options.loginInfo.loginInfo.rows[0];
            //SO1100101完整顯示身份證字號、SO1100102完整顯示個資權限
            var priv2 = getUserPriv(options.initData[userPrivTableName], "SO1100102");
            var priv1 = getUserPriv(options.initData[userPrivTableName], "SO1100101") && priv2;

            getControlObject(div, 'tOrderNo').text(convertNullToString(row['OrderNo'.toUpperCase()]));
            options.orderNo = row['OrderNo'.toUpperCase()];
            getControlObject(div, 'tSno').text(convertNullToString(row['Sno'.toUpperCase()]));

            getControlObject(div, 'tServName').text(options.initData[customerTableName].rows[0]['SERVNAME']);
            options.workServCode = row['WorkServCode'.toUpperCase()];
            options.servCode = row['ServCode'.toUpperCase()];
            getControlObject(div, 'tAcceptEn').text(row['AcceptEn'.toUpperCase()] + " / " + row['AcceptName'.toUpperCase()]);
            var acceptTime = formatDateTime(row['AcceptTime'.toUpperCase()], 'datetime2').toString();

            getControlObject(div, 'tAcceptTime').text(convertNullToString(acceptTime));

            getControlObject(div, 'tContName').text(convertNullToString(maskData(row['ContName'.toUpperCase()], "name", priv2)));
            getControlObject(div, 'tContTel').text(convertNullToString(maskData(row['ContTel'.toUpperCase()], "tel", priv2)));
            getControlObject(div, 'tContmobile').text(convertNullToString(maskData(row['Contmobile'.toUpperCase()], "tel", priv2)));
            getControlObject(div, 'tID').text(convertNullToString(maskData(row['ID'.toUpperCase()], "id", priv1)));

            options.contName = row['ContName'.toUpperCase()];
            options.contTel = row['ContTel'.toUpperCase()];
            options.contmobile = row['Contmobile'.toUpperCase()];
            options.ID = row['ID'.toUpperCase()];

            getControlObject(div, 'csServiceType').csList('codeNo', row['ServiceType'.toUpperCase()]);

            //getControlObject(div, 'csInstCode').csList('codeNo', row['InstCode'.toUpperCase()]);
            //getControlObject(div, 'csInstCode').csList('description', row['InstName'.toUpperCase()]);
            getControlObject(div, 'csInstCode').csList('setDisplayValue', {
                CODENO: row['InstCode'.toUpperCase()],
                DESCRIPTION: row['InstName'.toUpperCase()]
            });
            options.instCodeRow = getRowByKeyValue(options.initData['InstCode'].rows, 'CODENO', row['InstCode'.toUpperCase()]);

            getControlObject(div, 'dtResvTime').csDateTime('setDate', row['ResvTime'.toUpperCase()]);
            options.resvTime = row['ResvTime'.toUpperCase()];
            getControlObject(div, 'chkResvFlag').jqxCheckBox('val', row['ResvFlag'.toUpperCase()] == 1);
            var resvFlagTime = row['ResvFlagTime'.toUpperCase()];
            if (resvFlagTime != null) {
                getControlObject(div, 'dtResvFlagTime').csDateTime('setText', resvFlagTime.substr(0, 2) + ":" + resvFlagTime.substr(2, 2));
            }
            getControlObject(div, 'chkPrintBillFlag').jqxCheckBox('val', row['PrintBillFlag'.toUpperCase()] == 1);

            getControlObject(div, 'tInstCount').jqxInput('val', convertNullToString(row['InstCount'.toUpperCase()]));
            getControlObject(div, 'tPinCode').jqxInput('val', convertNullToString(row['PinCode'.toUpperCase()]));
            getControlObject(div, 'tNote').jqxTextArea('val', convertNullToString(row['Note'.toUpperCase()]));
            getControlObject(div, 'csMediaCode').csList('codeNo', row['MediaCode'.toUpperCase()]);
            getControlObject(div, 'csMediaCode').csList('description', row['MediaName'.toUpperCase()]);

            getControlObject(div, 'tIntroId').jqxInput('val', convertNullToString(row['IntroId'.toUpperCase()]));
            getControlObject(div, 'tIntroName').jqxInput('val', convertNullToString(row['IntroName'.toUpperCase()]));
            getControlObject(div, 'csPromCode').csList('codeNo', row['PromCode'.toUpperCase()]);
            getControlObject(div, 'csPromCode').csList('description', row['PromName'.toUpperCase()]);
            getControlObject(div, 'csBPCode').csList('source', [{ CODENO: row['BPCode'.toUpperCase()], DESCRIPTION: row['BPName'.toUpperCase()] }]);
            getControlObject(div, 'csBPCode').csList('codeNo', row['BPCode'.toUpperCase()]);
            getControlObject(div, 'csBPCode').csList('description', row['BPName'.toUpperCase()]);

            getControlObject(div, 'csBulletinCode').csList('codeNo', row['BulletinCode'.toUpperCase()]);
            getControlObject(div, 'csBulletinCode').csList('description', row['BulletinName'.toUpperCase()]);
            getControlObject(div, 'csGroupCode').csList('codeNo', row['GroupCode'.toUpperCase()]);
            getControlObject(div, 'csGroupCode').csList('description', row['GroupName'.toUpperCase()]);
            getControlObject(div, 'csWorkerEn1').csList('codeNo', row['WorkerEn1'.toUpperCase()]);
            getControlObject(div, 'csWorkerEn1').csList('description', row['WorkerName1'.toUpperCase()]);
            getControlObject(div, 'csWorkerEn2').csList('codeNo', row['WorkerEn2'.toUpperCase()]);
            getControlObject(div, 'csWorkerEn2').csList('description', row['WorkerName2'.toUpperCase()]);

            getControlObject(div, 'dtFinTime').csDateTime('setDate', convertNullToString(row['FinTime'.toUpperCase()]));
            getControlObject(div, 'dtCallOkTime').csDateTime('setDate', row['CallOkTime'.toUpperCase()]);
            getControlObject(div, 'csReturnCode').csList('codeNo', row['ReturnCode'.toUpperCase()]);
            getControlObject(div, 'csReturnCode').csList('description', row['ReturnName'.toUpperCase()]);
            getControlObject(div, 'csReturnDescCode').csList('codeNo', row['ReturnDescCode'.toUpperCase()]);
            getControlObject(div, 'csReturnDescCode').csList('description', row['ReturnDescName'.toUpperCase()]);
            getControlObject(div, 'csSatiCode').csList('codeNo', row['SatiCode'.toUpperCase()]);
            getControlObject(div, 'csSatiCode').csList('description', row['SatiName'.toUpperCase()]);
            getControlObject(div, 'csSignEn').csList('codeNo', row['SignEn'.toUpperCase()]);
            getControlObject(div, 'csSignEn').csList('description', row['SignName'.toUpperCase()]);
            getControlObject(div, 'dtSignDate').csDateTime('setDate', row['SignDate'.toUpperCase()]);

            getControlObject(div, 'tWorkUnit').jqxNumberInput('val', row['WorkUnit'.toUpperCase()]);
            getControlObject(div, 'tFinUnit').jqxNumberInput('val', row['FinUnit'.toUpperCase()]);

            getControlObject(div, 'tPrintUserName').text(convertNullToString(row['PrintUserName'.toUpperCase()]));
            getControlObject(div, 'tPrtCount').text(convertNullToString(row['PrtCount'.toUpperCase()]));
            getControlObject(div, 'tPrintTime').text(formatDateTime(row['PrintTime'.toUpperCase()], 'datetime2'));
            getControlObject(div, 'tClsTime').text(formatDateTime(row['ClsTime'.toUpperCase()], 'datetime2'));
            options.IVRData['IVRDataMatch'.toUpperCase()] = row['IVRDataMatch'.toUpperCase()];
            options.IVRData['IVRModifyCode'.toUpperCase()] = row['IVRModifyCode'.toUpperCase()];
            options.IVRData['IVRModifyName'.toUpperCase()] = row['IVRModifyName'.toUpperCase()];
            options.IVRData['CheckEn'.toUpperCase()] = row['CheckEn'.toUpperCase()];
            options.IVRData['CheckName'.toUpperCase()] = row['CheckName'.toUpperCase()];

            options.serviceType = row['ServiceType'.toUpperCase()];
            options.custId = row['custId'.toUpperCase()];

            orderDisabled(div);
            instRefnoEnable(div);
            if (row['MediaCode'.toUpperCase()] != null) {
                var MediaRow = getRowByKeyValue(options.initData['MediaCode'], 'CODENO', row['MediaCode'.toUpperCase()]);
                if (MediaRow != null) {
                    disableIntro(div, !(MediaRow['REFNO'] == 1 || MediaRow['REFNO'] == 2 || MediaRow['REFNO'] == 3));
                }
                options.mediaCodeRow = MediaRow;
            }
            else disableIntro(div, true);
        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    };
    function orderDisabled(div) {
        if (getControlObject(div, 'tOrderNo').text().isEmpty() == false) {
            getControlObject(div, 'csInstCode').csList('disabled', false);
            getControlObject(div, 'dtResvTime').csDateTime({ disabled: false });
            getControlObject(div, 'btnReserve').jqxButton({ disabled: false });
        }
    }
    function instRefnoEnable(div) {
        try {
            var options = $.data(div, formName).options;
            var instRefNo = 0;
            if (options.instCodeRow != null) {
                instRefNo = options.instCodeRow['refNo'.toUpperCase()];
            }
            //檢核pinCode 可Key
            if ('(1),(5),(6),(7)'.indexOf('(' + instRefNo + ')') >= 0) {
                getControlObject(div, 'tPinCode').jqxInput({ disabled: false });
            }
            else {
                getControlObject(div, 'tPinCode').jqxInput({ disabled: true });
            }
            //檢核可選設備/產品
            if ('(0),(1),(2),(3),(5),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(21),(22),(23),(24),(25),(26),(28)'.indexOf('(' + instRefNo + ')') >= 0) {
                getControlObject(div, 'btnViewPR').jqxButton({ disabled: false });
                //getControlObject(div, 'btnChangeProd').jqxButton({ disabled: false });
            }
            else {
                getControlObject(div, 'btnViewPR').jqxButton({ disabled: true });
                //getControlObject(div, 'btnChangeProd').jqxButton({ disabled: true });
            }
        }
        catch (err) {
            errorHandle(formName, 'instRefnoEnable', err);
        }
    }

    function refreshGrid(div) {
        try {
            var options = $.data(div, formName).options;

            options.faciGridSource.localdata = options.wipData[facilityTableName].rows;
            $('#' + $(div).prop('id') + 'gFacility').jqxGrid('updatebounddata');
            if (options.faciGridSource.localdata.length > 0) {
                $('#' + $(div).prop('id') + 'gFacility').jqxGrid('selectrow', 0);
            }

            options.chargeGridSource.localdata = options.wipData[chargeTableName].rows;
            $('#' + $(div).prop('id') + 'gCharge').jqxGrid('updatebounddata');
            if (options.chargeGridSource.localdata.length > 0) {
                $('#' + $(div).prop('id') + 'gCharge').jqxGrid('selectrow', 0);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };
    function changeMode(div, em) {
        try {
            var options = $.data(div, formName).options;
            var editText = '';
            var flag = true;
            var newFlag = false;
            options.editMode = em;
            switch (em) {
                case editMode.view:
                    editText = options.language.view;
                    rcdToScr(div);
                    break;
                case editMode.edit:
                    editText = options.language.edit;
                    rcdToScr(div);
                    flag = false;
                    break;
                case editMode.append:
                    editText = options.language.append;
                    newFlag = true;
                    flag = false;
                    newRcd(div);
                    break;
            }
            //getControlObject(div, 'lEditMode').jqxInput('val', editText);
            getControlObject(div, 'lEditMode').text(editText);
            getControlObject(div, 'btnSave').jqxButton({ disabled: flag });
            getControlObject(div, 'btnReserve').jqxButton({ disabled: flag });
            getControlObject(div, 'btnSave').jqxButton({ disabled: flag });

            disableChildControls(div, getControlObject(div, 'gbxML'), options.controls, flag);
            disableChildControls(div, getControlObject(div, 'gbxMM'), options.controls, flag);
            disableChildControls(div, getControlObject(div, 'gbxMR'), options.controls, flag);
            //getControlObject(div, 'gbxML').jqxPanel({ disabled: flag });
            //getControlObject(div, 'gbxMM').jqxPanel({ disabled: flag });
            //getControlObject(div, 'gbxMR').jqxPanel({ disabled: flag });
            var closeFlag = ((flag == false && newFlag == false && isEmpty(options.orderNo) && $.fn.WipUtility('getUserPriv', {
                groupId: options.loginInfo.loginInfo.rows[0].groupid,
                privName: 'SO11116',
                privData: options.initData[userPrivTableName]
            })) == false);
            disableChildControls(div, getControlObject(div, 'gbxClose'), options.controls, closeFlag);
            disableChildControls(div, getControlObject(div, 'gbxInto'), options.controls, getIntroPriv(div) == false || flag);
            getControlObject(div, 'csPromCode').csList('disabled', flag || (getPromPriv(div) == false));
            getControlObject(div, 'csBPCode').csList('disabled', true);
            getRowByKeyValue(options.controls, 'name', getControlObject(div, 'csPromCode').prop('id')).disabled = (getPromPriv(div) == false);

            getControlObject(div, 'csServiceType').csList('disabled', !newFlag);
            getRowByKeyValue(options.controls, 'name', getControlObject(div, 'csServiceType').prop('id')).disabled = newFlag;
            getControlObject(div, 'csInstCode').csList('disabled', !newFlag);
            getRowByKeyValue(options.controls, 'name', getControlObject(div, 'csServiceType').prop('id')).disabled = newFlag;
            if (em == editMode.edit) {
                var noCallOk = false;
                if (options.instCodeRow != null) {
                    //必需線上回報
                    if (options.instCodeRow["MUSTCALLOK"] == 1 &&
                        isEmpty(getControlObject(div, 'dtCallOkTime').csDateTime('getText'))) {
                        noCallOk = true;
                    }
                    var closePriv = $.fn.WipUtility('getClosePriv', {
                        wipType: 1,
                        wipRefNo: options.instCodeRow['refNo'.toUpperCase()],
                        groupId: options.loginInfo.loginInfo.rows[0].groupid,
                        privData: options.initData[userPrivTableName]
                    });
                    //完工時間disabled
                    options.finTimeDisabled = !closePriv[1] || closeFlag || noCallOk;
                    //退單原因disabled
                    options.returnCodeDisabled = !closePriv[2] || closeFlag;
                    getControlObject(div, 'dtFinTime').csDateTime({ disabled: options.finTimeDisabled });
                    getControlObject(div, 'csReturnCode').csList('disabled', options.returnCodeDisabled);
                    getControlObject(div, 'dtSignDate').csDateTime({ disabled: options.finTimeDisabled && options.returnCodeDisabled });
                    getControlObject(div, 'csSignEn').csList('disabled', options.finTimeDisabled && options.returnCodeDisabled);
                    options.shouldRegPriv = closePriv[3] && !closeFlag;
                }
            }
            getControlObject(div, 'dtCallOkTime').csDateTime('disabled', true);
            var resvDisabled = (isEmpty(options.orderNo) == false) || (options.closeData != null && options.closeData[closeProductTableName] != null);
            //2019/04/30 Jacky 8331
            if (!(options.instCodeRow != null && (options.instCodeRow["REFNO"] == 3 || options.instCodeRow["REFNO"] == 12 || options.instCodeRow["REFNO"] == 19))) {
                getControlObject(div, 'dtResvTime').csDateTime({ disabled: resvDisabled || flag });
                getControlObject(div, 'btnReserve').jqxButton({ disabled: isEmpty(options.orderNo) == false || flag });
            }
            getControlObject(div, "tWorkUnit").jqxNumberInput({ disabled: true });
            disableIntro(div, true);
            disableAllFieldPriv(options.controls, options.initData[fieldPrivTableName], options.initData[userPrivTableName]);
        }
        catch (err) {
            errorHandle(formName, 'changeMode', err);
        }
    };
    function setSubButton(div) {
        try {
            var options = $.data(div, formName).options;
            var faciRowFlag = options.faciGridSource == null || options.faciGridSource.localdata == null || options.faciGridSource.localdata.length == 0;
            var chargeRowFlag = options.chargeGridSource == null || options.chargeGridSource.localdata == null || options.chargeGridSource.localdata.length == 0;
            var flag = options.editMode == editMode.view;
            getControlObject(div, 'btnSubAdd1').jqxButton({ disabled: (flag || checkChildPriv(div, editMode.append, 0) == false) });
            getControlObject(div, 'btnSubEdit1').jqxButton({ disabled: (flag || faciRowFlag || checkChildPriv(div, editMode.edit, 0) == false) });
            getControlObject(div, 'btnSubDelete1').jqxButton({ disabled: (flag || faciRowFlag || checkChildPriv(div, editMode.delete, 0) == false) });
            getControlObject(div, 'btnSubAdd2').jqxButton({ disabled: (flag || checkChildPriv(div, editMode.append, 1) == false) });
            getControlObject(div, 'btnSubEdit2').jqxButton({ disabled: (flag || chargeRowFlag || checkChildPriv(div, editMode.edit, 1) == false) });
            getControlObject(div, 'btnSubDelete2').jqxButton({ disabled: (flag || chargeRowFlag || checkChildPriv(div, editMode.delete, 1) == false) });
            if (options.wipData != null && options.wipData[chargeTableName] != null) {
                var rows = options.wipData[chargeTableName].rows;
                var rLength = rows.length;
                var amount = 0
                for (var i = 0 ; i < rLength; i++) {
                    if (rows[i]["cancelFlag".toUpperCase()] == 0) {
                        amount += Number(rows[i]["shouldAmt".toUpperCase()]);
                    }
                }
                getControlObject(div, 'tSumAmount').text(commaSeparateNumber(amount));
            }
        }
        catch (err) {
            errorHandle(formName, 'setSubButton', err);
        }
    }
    function getIntroPriv(div) {
        try {
            var options = $.data(div, formName).options;
            var orderPriv = (options.orderNo == null);
            if (options.editMode == editMode.append) {
                return orderPriv;
            }
            else {
                var privName = '';
                if (getControlObject(div, 'tPrtCount').text().length == 0 || getControlObject(div, 'tPrtCount').text() == 0) {
                    //介紹人權限
                    privName = 'SO111121';
                }
                else {
                    //已列印介紹人權限
                    privName = 'SO1111211';
                }
                var introPriv = $.fn.WipUtility('getUserPriv', {
                    groupId: options.loginInfo.loginInfo.rows[0].groupid,
                    privName: 'SO1111211',
                    privData: options.initData[userPrivTableName]
                });
                return (introPriv && orderPriv);
            }
        }
        catch (err) {
            errorHandle(formName, 'getIntroPriv', err);
        }
    }
    function getPromPriv(div) {
        try {
            var options = $.data(div, formName).options;
            //可修改促銷方案的權限
            var promPriv = $.fn.WipUtility('getUserPriv', {
                groupId: options.loginInfo.loginInfo.rows[0].groupid,
                privName: 'SO111125',
                privData: options.initData[userPrivTableName]
            });
            return promPriv;
        }
        catch (err) {
            errorHandle(formName, 'getPromPriv', err);
        }
    }
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
            errorHandle(formName, 'disableChildControls', err);
        }
        function disabledCon(name, controls, flag) {
            try {
                for (var j = 0; j < ctLength; j++) {
                    if (name == controls[j].name) {
                        controls[j]['disabled'] = flag;
                        if (controls[j].type == 'jqxPanel' || controls[j].type == 'jqxExpander') {
                            //$('#' + controls[j].name)[controls[j].type]({ disabled: flag });
                            disableChildControls($('#' + controls[j].name), controls, flag);
                        }
                        else if (controls[j].type.indexOf('jqx') >= 0 || controls[j].type == "csDateTime") {
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
                errorHandle(formName, 'disabledCon', err);
            }
        }
    };
    function getMustBeControl(div, type) {
        try {
            var options = $.data(div, formName).options;
            var wipParaRow = options.initData[wipSystemTableName].rows[0];
            switch (type) {
                //CheckMedia,CheckProm,CheckBulletin
                case "prom":
                    var mb = wipParaRow["CheckProm".toUpperCase()] == 1;
                    return mb;
                    break;
                case "bulletin":
                    var mb = wipParaRow["CheckBulletin".toUpperCase()] == 1;
                    return mb;
                    break;
                case "media":
                    var mb = wipParaRow["CheckMedia".toUpperCase()] == 1;
                    return mb;
                    break;
            }
            return false;
        }
        catch (err) {
            errorHandle(formName, "getMustBeControl", err);
        }
    };
    function mustBeColor(div) {
        try {
            var options = $.data(div, formName).options;
            var array = ["prom", "bulletin", "media"];
            for (var i = 0; i < array.length; i++) {
                var flag = getMustBeControl(div, array[i]);
                var lControl;
                switch (array[i]) {
                    case "prom":
                        lControl = "lPromCode";
                        break;
                    case "bulletin":
                        lControl = "lBulletinCode";
                        break;
                    case "media":
                        lControl = "lMediaCode";
                        break;
                }
                if (flag) {
                    getControlObject(div, lControl).addClass("SO1111A_red");
                }
                else {
                    getControlObject(div, lControl).removeClass("SO1111A_red");
                }
            }
        }
        catch (err) {
            errorHandle(formName, "mustBeColor", err);
        }
    };
    //必要欄位判斷
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var names = ["csInstCode", "dtResvTime"];
            var types = ["csList", "csDateTime"];
            var langs = [lang.lInstCode, lang.lResvTime];
            //檢核裝機類別,預約時間
            for (var i = 0; i < names.length; i++) {
                if (checkControlMustBe({ name: $(div).prop("id") + names[i], type: types[i] }, langs[i]) != true) {
                    return false;
                };
            }
            //檢核介紹媒介/促案/消息來源為必選
            names = ["csMediaCode", "csPromCode", "csBulletinCode"];
            types = ["csList", "csList", "csList"];
            langs = [lang.lMediaCode, lang.lPromCode, lang.lBulletinCode];
            mustType = ["media", "prom", "bulletin"];
            for (var i = 0; i < names.length; i++) {
                var flag = getMustBeControl(div, mustType[i]);
                //alert(getControlObject(div, names[i]).csList('description'));
                if (flag == true && checkControlMustBe({ name: $(div).prop("id") + names[i], type: types[i] }, langs[i]) != true) {
                    return false;
                };
            }
            //檢核長度
            var r = checkTextMaxLength(options.controls);
            if (r[0] != true) return false;
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
            return false;
        }
    };
    function scrToRcd(div) {
        try {
            var options = $.data(div, formName).options;
            var loginInfoRow = options.loginInfo.loginInfo.rows[0];
            var row = {};
            if (options.editMode == editMode.edit) {
                row = options.wipData[wipTableName].rows[0];
            }
            else {
                if (options.wipData[wipTableName].rows.length > 0) {
                    row = options.wipData[wipTableName].rows[0];
                }
                else {
                    options.wipData[wipTableName].rows.push(row);
                }
                row["SNo".toUpperCase()] = convertToNull(getControlObject(div, 'tSno').text());
                row["OrderNo".toUpperCase()] = convertToNull(getControlObject(div, 'tOrderNo').text());
                row["AcceptEn".toUpperCase()] = convertToNull(loginInfoRow['entryid']);
                row["AcceptName".toUpperCase()] = convertToNull(loginInfoRow['entryname']);
                row["AcceptTime".toUpperCase()] = convertToNull(new Date(getControlObject(div, 'tAcceptTime').text()));
                row["CompCode".toUpperCase()] = convertToNull(loginInfoRow['compcode']);

                row["Address".toUpperCase()] = options.initData[customerTableName].rows[0]["Address".toUpperCase()];
                row["AddrNo".toUpperCase()] = options.initData[customerTableName].rows[0]["AddrNo".toUpperCase()];
                row["ServCode".toUpperCase()] = options.initData[customerTableName].rows[0]["ServCode".toUpperCase()];
                row["StrtCode".toUpperCase()] = options.initData[customerTableName].rows[0]["StrtCode".toUpperCase()];
                row["NodeNo".toUpperCase()] = options.initData[customerTableName].rows[0]["NodeNo".toUpperCase()];
                row["SalesCode".toUpperCase()] = options.initData[customerTableName].rows[0]["SalesCode".toUpperCase()];
                row["SalesName".toUpperCase()] = options.initData[customerTableName].rows[0]["SalesName".toUpperCase()];
                var cLength = options.wipData[changeFaciTableName].rows.length;
                for (var i = 0 ; i < cLength; i++) {
                    if (options.wipData[changeFaciTableName].rows[i]['OCMBaudRateNo'.toUpperCase()] != null) {
                        row["SCMCode".toUpperCase()] = options.wipData[changeFaciTableName].rows[i]["OCMBaudRateNo".toUpperCase()];
                        row["SCMNAME".toUpperCase()] = options.wipData[changeFaciTableName].rows[i]["OCMBaudRate".toUpperCase()];
                    }
                }
                row["CustID".toUpperCase()] = options.custId
                row["ServiceType".toUpperCase()] = options.serviceType
                row["ReturnOldSNo".toUpperCase()] = options.returnOldSNo
                row["ReturnPreOldSNo".toUpperCase()] = options.returnSNo
                row["CloseType".toUpperCase()] = options.closedType
                row["ModifyFlag".toUpperCase()] = 1
                row["FinUnit".toUpperCase()] = 0
                row["CustName".toUpperCase()] = convertToNull(options.contName);
                row["Tel1".toUpperCase()] = convertToNull(options.contTel);
            }
            if (options.workServCode != null) {
                row["WorkServCode".toUpperCase()] = options.workServCode;
            }
            else {
                row["WorkServCode".toUpperCase()] = row["ServCode".toUpperCase()];
            }
            row["CallOkTime".toUpperCase()] = convertToNull(getControlObject(div, 'dtCallOkTime').csDateTime('getDate'));

            row["ContName".toUpperCase()] = convertToNull(options.contName);
            row["ContTel".toUpperCase()] = convertToNull(options.contTel);
            row["Contmobile".toUpperCase()] = convertToNull(options.contmobile);
            row["ID".toUpperCase()] = convertToNull(options.ID);

            row["InstCode".toUpperCase()] = convertToNull(getControlObject(div, 'csInstCode').csList('codeNo'));
            row["InstName".toUpperCase()] = convertToNull(getControlObject(div, 'csInstCode').csList('description'));
            row["ResvTime".toUpperCase()] = convertToNull(getControlObject(div, 'dtResvTime').csDateTime('getDate'));
            if (getControlObject(div, 'chkResvFlag').jqxCheckBox('val')) {
                row["ResvFlag".toUpperCase()] = 1
            }
            else {
                row["ResvFlag".toUpperCase()] = 0
            }
            if (getControlObject(div, 'chkPrintBillFlag').jqxCheckBox('val')) {
                row["PrintBillFlag".toUpperCase()] = 1
            }
            else {
                row["PrintBillFlag".toUpperCase()] = 0
            }
            row["InstCount".toUpperCase()] = convertToNull(getControlObject(div, 'tInstCount').jqxInput('val'));
            row["PinCode".toUpperCase()] = convertToNull(getControlObject(div, 'tPinCode').jqxInput('val'));
            row["WorkUnit".toUpperCase()] = convertToNull(getControlObject(div, 'tWorkUnit').jqxNumberInput('val'));
            row["Note".toUpperCase()] = convertToNull(getControlObject(div, 'tNote').jqxTextArea('val'));
            row["MediaCode".toUpperCase()] = convertToNull(getControlObject(div, 'csMediaCode').csList('codeNo'));
            row["MediaName".toUpperCase()] = convertToNull(getControlObject(div, 'csMediaCode').csList('description'));
            row["IntroId".toUpperCase()] = convertToNull(getControlObject(div, 'tIntroId').jqxInput('val'));
            row["IntroName".toUpperCase()] = convertToNull(getControlObject(div, 'tIntroName').jqxInput('val'));
            row["PromCode".toUpperCase()] = convertToNull(getControlObject(div, 'csPromCode').csList('codeNo'));
            row["PromName".toUpperCase()] = convertToNull(getControlObject(div, 'csPromCode').csList('description'));
            row["BPCode".toUpperCase()] = convertToNull(getControlObject(div, 'csBPCode').csList('codeNo'));
            row["BPName".toUpperCase()] = convertToNull(getControlObject(div, 'csBPCode').csList('description'));
            row["BulletinCode".toUpperCase()] = convertToNull(getControlObject(div, 'csBulletinCode').csList('codeNo'));
            row["BulletinName".toUpperCase()] = convertToNull(getControlObject(div, 'csBulletinCode').csList('description'));

            row["GroupCode".toUpperCase()] = convertToNull(getControlObject(div, 'csGroupCode').csList('codeNo'));
            row["GroupName".toUpperCase()] = convertToNull(getControlObject(div, 'csGroupCode').csList('description'));
            row["WorkerEn1".toUpperCase()] = convertToNull(getControlObject(div, 'csWorkerEn1').csList('codeNo'));
            row["WorkerName1".toUpperCase()] = convertToNull(getControlObject(div, 'csWorkerEn1').csList('description'));
            row["WorkerEn2".toUpperCase()] = convertToNull(getControlObject(div, 'csWorkerEn2').csList('codeNo'));
            row["WorkerName2".toUpperCase()] = convertToNull(getControlObject(div, 'csWorkerEn2').csList('description'));
            row["FinTime".toUpperCase()] = convertToNull(getControlObject(div, 'dtFinTime').csDateTime('getDate'));
            row["FinUnit".toUpperCase()] = convertToNull(getControlObject(div, 'tFinUnit').jqxNumberInput('val'));
            row["ReturnCode".toUpperCase()] = convertToNull(getControlObject(div, 'csReturnCode').csList('codeNo'));
            row["ReturnName".toUpperCase()] = convertToNull(getControlObject(div, 'csReturnCode').csList('description'));
            row["ReturnDescCode".toUpperCase()] = convertToNull(getControlObject(div, 'csReturnDescCode').csList('codeNo'));
            row["ReturnDescName".toUpperCase()] = convertToNull(getControlObject(div, 'csReturnDescCode').csList('description'));
            row["SatiCode".toUpperCase()] = convertToNull(getControlObject(div, 'csSatiCode').csList('codeNo'));
            row["SatiName".toUpperCase()] = convertToNull(getControlObject(div, 'csSatiCode').csList('description'));

            row["SignEn".toUpperCase()] = convertToNull(getControlObject(div, 'csSignEn').csList('codeNo'));
            row["SignName".toUpperCase()] = convertToNull(getControlObject(div, 'csSignEn').csList('description'));
            row["SignDate".toUpperCase()] = convertToNull(getControlObject(div, 'dtSignDate').csDateTime('getDate'));
            row["UpdEn".toUpperCase()] = convertToNull(loginInfoRow['entryname']);

            var cLength = options.wipData[changeFaciTableName].rows.length;
            for (var i = 0 ; i < cLength; i++) {
                if (options.wipData[changeFaciTableName].rows[i]['NCMBaudRateNo'.toUpperCase()] != null) {
                    var cmRow = options.wipData[changeFaciTableName].rows[i];
                    row["CMCode".toUpperCase()] = cmRow["NCMBaudRateNo".toUpperCase()];
                    row["CMNAME".toUpperCase()] = cmRow["NCMBaudRate".toUpperCase()];
                    row["FixIPCount".toUpperCase()] = cmRow["NFixIPCount".toUpperCase()];
                    row["DynIPCount".toUpperCase()] = cmRow["NDynIPCount".toUpperCase()];
                    break;
                }
            }
            cLength = options.wipData[facilityTableName].rows.length;
            for (var i = 0 ; i < cLength; i++) {
                if (options.wipData[facilityTableName].rows[i]['CMBaudNo'.toUpperCase()] != null) {
                    var cmRow = options.wipData[facilityTableName].rows[i];
                    row["CMCode".toUpperCase()] = cmRow["CMBaudNo".toUpperCase()];
                    row["CMNAME".toUpperCase()] = cmRow["CMBaudRate".toUpperCase()];
                    row["FixIPCount".toUpperCase()] = cmRow["FixIPCount".toUpperCase()];
                    row["DynIPCount".toUpperCase()] = cmRow["DynIPCount".toUpperCase()];
                    break;
                }
            }
            var resvFlagTime = getControlObject(div, 'dtResvFlagTime').csDateTime('getText');
            if (resvFlagTime != null) resvFlagTime = resvFlagTime.replace(':', '');
            row["ResvFlagTime".toUpperCase()] = convertToNull(resvFlagTime);
            if (options.IVRData != null && options.IVRData.length > 0) {
                row["IVRDataMatch".toUpperCase()] = convertToNull(options.IVRData["IVRDataMatch".ToUpper]);
                row["IVRModifyCode".toUpperCase()] = convertToNull(options.IVRData["IVRModifyCode".ToUpper]);
                row["IVRModifyName".toUpperCase()] = convertToNull(options.IVRData["IVRModifyName".ToUpper]);
                row["CheckEn".toUpperCase()] = convertToNull(options.IVRData["CheckEn".ToUpper]);
                row["CheckName".toUpperCase()] = convertToNull(options.IVRData["CheckName".ToUpper]);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'scrToRcd', err);
            return false;
        }
    };
    function getShouldRegMode(div) {
        try {
            var options = $.data(div, formName).options;
            return options.editMode == editMode.edit && options.shouldRegPriv &&
                options.wipData[wipTableName].rows[0]['SignDate'.toUpperCase()] == null &&
                getControlObject(div, 'dtSignDate').csDateTime('getText') != null &&
                options.wipData[chargeTableName].rows.length > 0;
        }
        catch (err) {
            errorHandle(formName, 'getShouldRegMode', err);
        }
    }
    function save(div, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if (isDataOk(div) == false) {
                action(false);
                return false;
            }
            //是否要出現訊問入帳訊息
            var shouldRegMode = getShouldRegMode(div);

            var data = scrToRcd(div);
            if (data == false) {
                action(false);
                return false;
            }
            if (options.isChild) {
                action(true);
                return true;
            }
            var shouldReg = false;
            var realWipData = (function () {
                var tData = cloneJSON(options.wipData);
                if (options.parameters[contactTableName] != null) {
                    tData[contactTableName] = cloneJSON(options.parameters[contactTableName]);
                }
                if (options.closeData != null && options.closeData[closeProductTableName] != null) {
                    tData[closeProductTableName] = cloneJSON(options.closeData[closeProductTableName]);
                }
                return tData;
            });
            var saveProcess = (function (ac) {
                var tData = realWipData();
                var paraLoginInfo = getParaLoginInfo(div);
                var parameters = $.extend({}, paraLoginInfo, {
                    editMode: { type: 'integer', value: options.editMode },
                    shouldReg: { type: 'boolean', value: shouldReg },
                    dsWipData: { type: 'string', value: JSON.stringify(tData) }
                });
                var params = getParameters(riadllName,
                    riaClassName,
                    'Save2',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        deleteJSONObject(tData);
                        if (data.ResultBoolean == true) {
                            ac(true);
                        }
                        else {
                            ac(false, data.ErrorMessage);
                        }
                    }
                }, 300);
            });
            if (shouldRegMode == true) {
                var returnValue = getControlObject(div, 'csReturnCode').csList('codeNo');
                if (returnValue == null || returnValue.length == 0) {
                    messageBox(lang.sureSaveCharge, messageType.yesno, null, function (r) {
                        shouldReg = (r == 'yes');
                        saveProcess(action);
                    })
                }
                else {
                    shouldReg = true;
                    saveProcess(action);
                }
            }
            else saveProcess(action);
        }
        catch (err) {
            errorHandle(formName, 'save', err);
        }
    };

})(jQuery);