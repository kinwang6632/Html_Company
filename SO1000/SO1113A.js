(function ($) {
    var formName = 'SO1113A';
    var riadllName = 'CableSoft.SO.RIA.Wip.PR.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.PR.Web.PR';
    var buttonsHeight = 24;
    var textHeight = 23;
    var wipTypeName = "PR";
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
    var customerTableName = 'SO001';//Customer
    var proposerTableName = 'Proposer';
    var userPrivTableName = 'UserPriv';
    var wipSystemTableName = "SO042";
    var fieldPrivTableName = 'FieldPriv';
    var DeclarantTableName = "SO137";
    
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
                        options: $.extend({}, new defaults(), new SO1113A(), options)
                    });
                    formLoaded(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1113A', err);
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
        canView: function (jq, params, param2,  param3) {
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
        this.close = null;
        this.moveReInstData = null;
        this.custId = 0;
        this.serviceType = null;
        this.sno = null;
        this.servCode = null;
        this.orderNo = null;
        this.PRCodeRow = {};
        this.wipData = {};
        this.wipRefNoStr = null;
        this.wipCodeValueStr = null;
        this.IVRData = {};
        this.reInstAcrossFlag = 0;
        this.finTimeDisabled = false;
        this.returnCodeDisabled = false;
        this.level = 0;
        this.closingOk = false;
        this.oldWorkServCode = null;
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
            var height = $(div).height() - buttonsHeight - 4;
            var gridHeight = buttonsHeight * 5;
            var tabHeight = height - buttonsHeight * 2 - gridHeight - 4;
            getControlObject(div, "gbxTop").jqxPanel({ height: buttonsHeight - 4 });
            getControlObject(div, "gbxData").jqxPanel({ height: height });
            //getControlObject(div, "tabM").css({ height: tabHeight });

            getControlObject(div, "gbxWip").jqxPanel({ height: tabHeight });
            getControlObject(div, "gbxOther").css({ height: gridHeight });

            getControlObject(div, 'gCharge').jqxGrid({ height: gridHeight - 8 });
            getControlObject(div, 'gFacility').jqxGrid({ height: gridHeight - 8 });
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
            //2019/04/16 Corey 抄襲Jacky 可避免直接關tab 沒刪除問題
            if (options.closingOk != true) {
                delResvPoint(div);
            }
            deleteJSONObject(options);
            //options.length = 0;
            //options = null;
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
                checkCanAppend(params, "X", function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canAppend', err);
        }
    };
    function checkCanAppend(data, ServiceType, action) {
        try {
            var PR = getParametersTable(data, 'PR');
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                CustId: { type: 'integer', value: data[PR].rows[0]['CustId'.toUpperCase()] },
                ServiceType: { type: 'string', value: ServiceType }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'CanAppend',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    action(d);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'checkCanAppend', err);
        }
    }
    function canView(params, action, opts) {
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
    function canEdit(params, action,opts) {
        try {
            var checkPara = checkParameters(editMode.view, params);
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
                    };
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canEdit', err);
        }
    };
    function canDelete(params, action, opts) {
        try {
            var checkPara = checkParameters(editMode.view, params);
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
                    };
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canDelete', err);
        }
    };
    function checkCanXX(method, data, action) {
        try {
            var PR = getParametersTable(data, 'PR');
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                SNo: { type: 'string', value: data[PR].rows[0]['SNo'.toUpperCase()] }
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
    function canPrint(params, action) {
        var checkPara = checkParameters(editMode.view, params);
        action(checkPara);
    };
    //檢核參數是否正確
    function checkParameters(em, data) {
        try {
            //檢核table 存不存在
            var table = getParametersTable(data, 'PR');
            if (table == null) return ([false, 'table PR not exist!!']);
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
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function (r) {
                            try {
                                listAddHandler(div);
                                textAddHandler(div);
                                buttonAddHandler(div);
                                addressAddHandler(div);
                                frmAddHandler(div);
                                if (options.initData['ServiceType'].rows.length == 1) {
                                    //如果服務別只有一筆資料，就直接指定該服務別
                                    getControlObject(div, 'csServiceType').csList('selectedIndex', 0);
                                    options.serviceType = options.initData['ServiceType'].rows[0]["CODENO"];
                                }
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
            //$.ajax({
            //    url: 'SO1000\\' + formName + '.html',
            //    type: "get",
            //    datatype: 'html',
            //    success: function (msg) {
            //        try {
            //            $(div).html(msg);
            //            changeElementId(div);
            //            init(div, function (r) {
            //                try {
            //                    listAddHandler(div);
            //                    textAddHandler(div);
            //                    buttonAddHandler(div);
            //                    addressAddHandler(div);
            //                    frmAddHandler(div);
            //                    if (options.initData['ServiceType'].rows.length == 1) {
            //                        //如果服務別只有一筆資料，就直接指定該服務別
            //                        getControlObject(div, 'csServiceType').csList('selectedIndex', 0);
            //                        options.serviceType = options.initData['ServiceType'].rows[0]["CODENO"];
            //                    }
            //                    $(div).triggerHandler('loaded');
            //                }
            //                catch (err) {
            //                    errorHandle(formName, 'formLoaded_success_init', err);
            //                }
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
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).on('winClosing', function (e) {
                    close(div)
                });
            }
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
    function setBasicPara(div) {
        try {
            var options = $.data(div, formName).options;
            var customer = getParametersTable(options.parameters, 'customer');
            var PR = getParametersTable(options.parameters, 'PR');
            if (customer != null) {
                options.servCode = options.parameters[customer].rows[0]['SERVCODE'];
            }
            if (PR != null) {
                options.custId = options.parameters[PR].rows[0]['CUSTID'];
                options.serviceType = options.parameters[PR].rows[0]['SERVICETYPE'];
            }
            if (options.editMode == editMode.append) {
                options.sno = getFalseSNo();
            }
            else {
                options.sno = options.parameters[PR].rows[0]['SNO'];
            }
        }
        catch (err) {
            errorHandle(formName, 'setBasicPara', err);
        }
    }
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div);
            renderControl(div);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            formResize(div);
            setBasicPara(div);

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
                            UpdateAllControlStatus(div);
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
                    //options.initData = $.extend({}, options.initData, JSON.parse(r.ErrorMessage));
                    options.initData = JSON.parse(r[0].ResultXML);
                    initList(div);
                    initAddress1(div);
                    if (convertToNull(r[0].ErrorMessage) != null && options.editMode == editMode.append) {
                        messageBox(r[0].ErrorMessage, messageType.yesno, null, function (flag) {
                            if (flag == 'no') {
                                close(div);
                            }
                        });
                    }
                    if (r[1].ResultBoolean == true) {
                        clearWipData(div);
                        options.wipData = JSON.parse(r[1].ResultXML);
                        changeMode(div, options.editMode);
                        if (options.editMode == editMode.edit) {
                            if (options.initData.ReasonDescCode.rows.length == 0) {
                                getControlObject(div, "csReasonDescCode").csList('disabled', true);
                            };
                        };
                        refreshGrid(div);
                        setSubButton(div);
                        instRefnoEnable(div);
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
            var lngCUSTID = 0;//如果由互動進入，會有 Contact，判斷是否有FACISEQNO資料，有的話就取該設備的服務別。
            var setFaciSeqno = "";
            setFaciSeqno = getParametersTable(options.parameters, "Contact")
            if (setFaciSeqno != null) {
                if (options.parameters["Contact"].rows.length > 0) {
                    setFaciSeqno = getParametersTable(options.parameters["Contact"].rows[0], "FACISEQNO")
                    if (setFaciSeqno != null) {
                        setFaciSeqno = options.parameters["Contact"].rows[0]["FACISEQNO"]
                    }
                }
            }
            var parameters = $.extend({}, paraLoginInfo, {
                ServiceType: { type: 'string', value: options.canUseServiceType },
                CUSTID: { type: 'integer', value: options.custId },
                FaciSEQNO: { type: 'string', value: convertToNull(setFaciSeqno) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetServiceType2',
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

    //取得單選下拉資料
    function getInitData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var customer = getParametersTable(options.parameters, 'customer');
            var close = options.close;
            var wipRefNo = convertToNull(options.refNo);
            var wipCodeValueStr = convertToNull(options.wipCodeValueStr);

            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {
                CustId: { type: 'integer', value: options.custId },
                SNo: { type: 'string', value: options.sno },
                ServiceType: { type: 'string', value: options.serviceType },
                ServCode: { type: 'string', value: convertToNull(options.servCode) },
                RefNo: { type: 'integer', value: wipRefNo },
                InstCodeValueStr: { type: 'string', value: wipCodeValueStr },
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
    function getCheckCanPR(div, action) {
        try {
            var options = $.data(div, formName).options;
            var custId = options.custId;
            var serviceType = options.serviceType;
            var PRCode = getControlObject(div, 'csPRCode').csList('codeNo');

            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {
                PRCode: { type: 'integer', value: PRCode },
                CustId: { type: 'integer', value: custId },
                ServiceType: { type: 'string', value: serviceType }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'CheckCanPR2',
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
            errorHandle(formName, 'getCheckCanPR', err);
        }
    };
    //檢核該時段可預約
    function getChkCanResv(div, action) {
        try {
            var options = $.data(div, formName).options;
            var PRCodeRow = options.PRCodeRow;
            var resvTime = convertToNull(getControlObject(div, 'dtResvTime').csDateTime('getDate'));
            var acceptTime = convertToNull(getRealDate(getControlObject(div, 'tAcceptTime').text()));
            var workUnit = convertToNull(getControlObject(div, 'tWorkUnit').jqxNumberInput('val'), true);
            var wipData = cloneJSON(options.wipData);          
            var paraLoginInfo = getParaLoginInfo(div);
            if (options.oldWorkServCode == null) {
                options.oldWorkServCode = options.workServCode;
            }
            var parameters = $.extend({}, paraLoginInfo, {
                PRCode: { type: 'integer', value: PRCodeRow['CODENO'] },
                ServCode: { type: 'string', value: options.workServCode },
                PRMCode: { type: 'integer', value: PRCodeRow['GROUPNO'] },
                ServiceType: { type: 'string', value: options.serviceType },
                ResvTime: { type: 'datetime', value: resvTime },
                AcceptTime: { type: 'datetime', value: acceptTime },
                OldResvTime: { type: 'datetime', value: convertToNull(options.resvTime) },
                Resvdatebefore: { type: 'integer', value: PRCodeRow['Resvdatebefore'.toUpperCase()] },
                WorkUnit: { type: 'decimal', value: workUnit },
                IsBooking: { type: 'boolean', value: true },
                oldServCode: { type: 'string', value: options.oldWorkServCode }
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
        } finally {
            options.oldWorkServCode = options.workServCode;
        }
    };
    function initServiceType(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'csServiceType').csList('source', options.initData['ServiceType'].rows);
            if (options.initData['ServiceType'].rows.length == 1) {
                getControlObject(div, 'csServiceType').csList('selectedIndex', 0);
                options.serviceType = options.initData['ServiceType'].rows[0]["CODENO"];
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initServiceType', err);
        }
    }
    //委派csList 事件
    function listAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //服務別
            csServiceType_selectedIndexChanged(div);
            //拆機類別
            csPRCode_selectedIndexChanged(div);
            //停拆機原因
            csReasonCode_selectedIndexChanged(div);
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

                var selectServiceType = getControlObject(div, 'csServiceType').csList('codeNo');
                var params = cloneJSON(options.parameters);
                params["loginInfo"] = cloneJSON(options.loginInfo);
                disableAllControls(options.controls, true, true);
                checkCanAppend(params, selectServiceType, function (d) {
                    if (d.ResultBoolean == true) {
                        options.serviceType = selectServiceType
                        getSubInitData(div, function (r) {
                            if (r == true) {
                                disableAllControls(options.controls, false, true);
                                getControlObject(div, 'csPRCode').csList('disabled', false);
                                getControlObject(div, 'csReasonCode').csList('disabled', false);
                                UpdateAllControlStatus(div);
                                if (options.initData["PRCode"].rows.length == 1) {
                                    //#7536 要求如果只有一筆派工類別，直接帶出預設
                                    getControlObject(div, 'csPRCode').csList('selectedIndex', 0)
                                }
                            }
                            options.serviceTypeChanging = false;
                        });
                    }
                    else {
                        //action([d.ResultBoolean, d.ErrorMessage]);
                        messageBox(d.ErrorMessage);
                        disableAllControls(options.controls, false, true);
                        options.serviceTypeChanging = false;
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'csServiceType_selectedIndexChanged', err);
            }
        });
    };
    //拆機類別改變
    function csPRCode_selectedIndexChanged(div) {
        getControlObject(div, 'csPRCode').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var instValue = $(this).csList('codeNo');
                if (instValue == null || instValue.length == 0) {
                    options.PRCodeRow = null;
                    return false;
                }
                disableAllControls(options.controls, true, true);

                var changPRCodeDef = (function () {
                    // WorkUnit txtInstCount
                    getControlObject(div, 'tWorkUnit').jqxNumberInput('val', options.PRCodeRow.WORKUNIT);
                    if (options.editMode == editMode.append) {
                        //SO002.PinCode
                        getControlObject(div, 'tPinCode').jqxInput('val', convertNullToString(options.initData["SO002"].rows[0]["PinCode".toUpperCase()]));
                    }

                    var intPRCount = 0;
                    var flgInstCount = false;
                    getControlObject(div, 'dtReInstDate').csDateTime('disabled', !(options.PRCodeRow.REFNO == 1 || options.PRCodeRow.REFNO == 3));
                    if (options.PRCodeRow.REFNO == 3) {
                        getControlObject(div, 'lReInstDate').text(options.language.lblReInstDate2);
                        if (options.editMode == editMode.append) {
                            intInstCount = 1
                        }
                    }
                    else {
                        getControlObject(div, 'lReInstDate').text(options.language.lblReInstDate);
                        if (options.PRCodeRow.REFNO == 8) {
                            intPRCount = 1
                        }
                        else {
                            flgInstCount = true;
                        }
                    }
                    getControlObject(div, 'tInstCount').jqxInput('disabled', flgInstCount);
                    getControlObject(div, 'tInstCount').jqxInput('val', convertNullToString(intPRCount));
                    instRefnoEnable(div);
                    setDefaultGroupCode(div);
                    return;
                });

                getCheckCanPR(div, function (r) {
                    try {
                        if (r.ResultBoolean == true) {
                            setCloseDefaultData(div);
                            options.PRCodeRow = getRowByKeyValue(options.initData['ALLPRCode'].rows, 'CODENO', instValue);
                            var resvTime = getControlObject(div, 'dtResvTime').csDateTime('getText');
                            if (resvTime != null && resvTime.length > 0) {
                                //取工單資料
                                getWipDetailData(div, function (d) {
                                    if (d[0] == false && d[1] != null) {
                                        messageBox(d[1]);
                                    }
                                    disableAllControls(options.controls, false, true);
                                    setSubButton(div);
                                    changPRCodeDef();
                                    UpdateAllControlStatus(div);
                                });
                            }
                            else {
                                disableAllControls(options.controls, false, true);
                                changPRCodeDef();
                                UpdateAllControlStatus(div);
                            }
                        }
                        else {
                            messageBox(r.ErrorMessage);
                            getControlObject(div, 'csPRCode').csList('clearDisplayValue');
                            disableAllControls(options.controls, false, true);
                            UpdateAllControlStatus(div);
                        }
                    }
                    catch (err) {
                        errorHandle(formName, 'csPRCode_selectedIndexChanged_getCheckCanPR', err);
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'csPRCode_selectedIndexChanged', err);
            }
        });
    };

    function setDefaultGroupCode(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.instCodeRow != null) {
                getControlObject(div, 'csGroupCode').csList('codeNo', options.instCodeRow["DefGroupCode".toUpperCase()]);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'setDefaultGroupCode', err);
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
    //停拆機原因
    function csReasonCode_selectedIndexChanged(div) {
        getControlObject(div, 'csReasonCode').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var value = $(this).csList('codeNo');
                if (value == null || value.length == 0) {
                    //options.reasonCode= null;
                    return false;
                }
                else {
                    //disableAllControls(options.controls, true, true);
                    getReasonDescCode(div, value, function (d) {
                        if (d[0] == false) {
                            messageBox(d[1]);
                        }
                        //disableAllControls(options.controls, false, true);
                        //instRefnoEnable(div);
                    });
                }
            } catch (err) {
                errorHandle(formName, 'csReasonCode_selectedIndexChanged', err);
            }
        })
    }
    //介紹媒介改變
    function csMediaCode_selectedIndexChanged(div) {
        getControlObject(div, 'csMediaCode').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var value = $(this).csList('codeNo');
                if (value == null || value.length == 0) {
                    options.mediaCodeRow = null;
                    return false;
                }
                else {
                    var oRow = options.mediaCodeRow;
                    options.mediaCodeRow = getRowByKeyValue(options.initData['MediaCode'].rows, 'CODENO', value);
                    if ((oRow == null || oRow['REFNO'] != options.mediaCodeRow['REFNO']) && options.mediaCodeRow['REFNO'] > 1) {
                        getControlObject(div, 'tIntroId').val(null);
                        getControlObject(div, 'tIntroName').val(null);
                        disableAllControls(options.controls, true, true);
                        getQueryIntro(div, function (d) {
                            if (d[0] == false) {
                                messageBox(d[1]);
                            }
                            disableAllControls(options.controls, false, true);
                            instRefnoEnable(div);
                            UpdateAllControlStatus(div);
                        });
                    }
                }
            }
            catch (err) {
                errorHandle(formName, 'csMediaCode_selectedIndexChanged', err);
            }
        });
    };

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
                UpdateAllControlStatus(div);
            }
            catch (err) {
                errorHandle(formName, 'csReturnCode_selectedIndexChanged', err);
            }
        });
    };
    //停拆機原因細項
    function getReasonDescCode(div, reasonCode, action) {
        var options = $.data(div, formName).options;

        var paraLoginInfo = getParaLoginInfo(div);
        var parameters = $.extend({}, paraLoginInfo, {
            serviceType: { type: 'string', value: options.serviceType },
            reasonCode: { type: 'integer', value: reasonCode }
        });
        var params = getParameters(riadllName,
            riaClassName,
            'GetPRReasonDescCode',
            JSON.stringify(parameters));
        getServerData(params, {
            success: function (data) {
                try {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ResultBoolean == true) {
                        var r = JSON.parse(data.ResultXML);
                        getControlObject(div, 'csReasonDescCode').csList('clearDisplayValue');
                        if (r.ReasonDescCode.rows.length > 0) {
                            getControlObject(div, "csReasonDescCode").csList('source', r.ReasonDescCode.rows);
                            getControlObject(div, "csReasonDescCode").csList('disabled', false);
                        }
                        else {
                            getControlObject(div, "csReasonDescCode").csList('disabled', true);
                        }
                        UpdateAllControlStatus(div);
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
                    if (data.ResultBoolean == true) {
                        var r = JSON.parse(data.ResultXML);
                        options.introIdData = r[Object.keys[0]];
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
            dtResvTime_focusin(div);
            //完工時間
            dtFinTime_dateChanged(div);
            //介紹人
            tIntroId_Input(div);
            tIntroId_Change(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'textAddHandler', err);
        }
    };
    //預約時間選定時
    function dtResvTime_focusin(div) {
        getControlObject(div, 'dtResvTime').on('focusin', function () {
            if (canChangeResvTime(div) == true && $(this).csDateTime('getDate') == null) {
                $(this).csDateTime('setDate', new Date());
            }
        });
    };
    function canChangeResvTime(div, showMsg) {
        try {
            var options = $.data(div, formName).options;
            var items = getControlObject(div, "csPRCode").csList('selectedItem');
            if (isEmpty(items)) return;
            //2019/04/03 Jacky 移機要判斷有選移機新址才能預約
            if (items['refNo'.toUpperCase()] == 3) {
                var addrInfo1 = getControlObject(div, 'g1ReInstAddress').csAddress1('getAddrInfo');
                var addrValue = 0;
                if (addrInfo1 != null) { addrValue = addrInfo1.ADDRNO }
                if (addrValue <= 0) {
                    messageBox(options.language.chooseReInstAddress);
                    return false;
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'canChangeResvTime', err);
        }
    }
    //預約時間改變時
    function dtResvTime_dateChanged(div) {
        getControlObject(div, 'dtResvTime').on('dateChanged', function () {
            try {
                var options = $.data(div, formName).options;
                if (options.resvTimeChangeing == true) { return; }
                var resvTime = getControlObject(div, 'dtResvTime').csDateTime('getDate');
                if (resvTime == options.resvTime) return;
                //var items = getControlObject(div, "csPRCode").csList('selectedItem');
                //if (isEmpty(items)) return;
                ////2019/04/03 Jacky 移機要判斷有選移機新址才能預約
                //if (items['refNo'.toUpperCase()] == 3) {
                //    var addrInfo1 = getControlObject(div, 'g1ReInstAddress').csAddress1('getAddrInfo');
                //    var addrValue = 0;
                //    if (addrInfo1 != null) { addrValue = addrInfo1.ADDRNO }
                //    if (addrValue <= 0) {
                //        options.resvTimeChangeing = true;
                //        getControlObject(div, 'dtResvTime').csDateTime('setText', null);
                //        options.resvTimeChangeing = false;
                //    }
                //}
                if (canChangeResvTime(div, true) != true) {
                    options.resvTimeChangeing = true;
                    getControlObject(div, 'dtResvTime').csDateTime('setText', null);
                    options.resvTimeChangeing = false;
                }

                disableAllControls(options.controls, true, true);
                getChkCanResv(div, function (r) {
                    try {
                        if (r.ResultBoolean == true) {
                            //取得Detail 相關資料
                            //日期需改變 且 檢核收費是否已收或開發票 且 不為訂單 且 簽收日期不能有值
                            var chargeOk = $.fn.WipUtility('chkCitemStatusOk', options.wipData['Charge']);
                            var signOk = (options.editMode == editMode.append || options.wipData['Wip'].rows[0]['SIGNDATE'] == null);
                            var orderOk = (isEmpty(options.orderNo));
                            if (formatDateTime(options.resvTime, 'date') !== formatDateTime(resvTime, 'date')
                                && chargeOk[0] && signOk) {
                                options.resvTime = resvTime;
                                getWipDetailData(div, function (d) {
                                    if (d[0] == false && d[1] != null) {
                                        messageBox(d[1]);
                                    }
                                    disableAllControls(options.controls, false, true);
                                    setSubButton(div);
                                    instRefnoEnable(div);
                                    //UpdateAllControlStatus(div);
                                });
                            }
                            else {
                                options.resvTime = resvTime;
                                disableAllControls(options.controls, false, true);
                                instRefnoEnable(div);
                                //UpdateAllControlStatus(div);
                            }
                        }
                        else {
                            messageBox(r.ErrorMessage);
                            getControlObject(div, 'dtResvTime').csDateTime('setDate', options.resvTime);
                            disableAllControls(options.controls, false, true);
                            instRefnoEnable(div);
                            //UpdateAllControlStatus(div);
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
        getControlObject(div, 'tIntroId').on('input', function () {
            try {
                var value = $(this).jqxInput('val');
                if (value == null || value.length == 0) {
                    return;
                }
                else {
                    if (options.mediaCodeRow == null) return;
                    switch (options.mediaCodeRow['refNo']) {
                        case 2:
                        case 3:
                            var row = getRowByKeyValue(options.introIdData, 'CODENO', value);
                            if (row != null) {
                                getControlObject(div, 'tIntroName').jqxInput('val', row[Object.keys(row)[1]]);
                            }
                            break;
                    }
                }
            }
            catch (err) {
                errorHandle(formName, 'tIntroId_Input', err);
            }
        });
    };
    //介紹人改變
    function tIntroId_Change(div) {
        var options = $.data(div, formName).options;
        getControlObject(div, 'tIntroId').on('change', function () {
            try {
                var value = $(this).jqxInput('val');
                if (value == null || value.length == 0) {
                    return;
                }
                else {
                    if (options.mediaCodeRow == null) return;
                    switch (options.mediaCodeRow['REFNO']) {
                        case 1:
                            disableAllControls(options.controls, true, true);
                            instRefnoEnable(div);
                            getCustomer(div, value, function (r) {
                                if (r[0] == false) {
                                    messageBox(r[1]);
                                }
                                else {
                                    var rows = r[2][Object.keys(r[2])[0]].rows;
                                    if (rows.length == 0) {
                                        introNameError();
                                    }
                                    else {
                                        getControlObject(div, 'tIntroName').jqxInput('val', rows[0]['CUSTNAME']);
                                    }
                                }
                                disableAllControls(options.controls, false, true);
                                instRefnoEnable(div);
                            });
                            break;
                        case 2:
                            var nameValue = getControlObject(div, 'tIntroName').val();
                            if (nameValue == null || nameValue.length == 0) {
                                introNameError();
                            }
                            break;
                        case 3:
                            var nameValue = getControlObject(div, 'tIntroName').val();
                            if (nameValue == null || nameValue.length == 0) {
                                introNameError();
                            }
                            break;
                    }
                    UpdateAllControlStatus(div);
                }
            }
            catch (err) {
                errorHandle(formName, 'tIntroId_Change', err);
            }
        });
        function introNameError() {
            messageBox(options.language.introIdErrorNoCustomer, null, null, function () {
                getControlObject(div, 'tIntroId').jqxInput('focus');
            });
        }
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
                    //if (getControlObject(div, 'dtSignDate').csDateTime('getText') == null || options.initData['WipSystem'].rows[0]['ModifyDateChange'.toUpperCase()] == 1) {
                    //    getControlObject(div, 'dtSignDate').csDateTime('setText', formatDateTime($(this).csDateTime('getDate'), 'date'));
                    //}
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
                UpdateAllControlStatus(div);
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
                if (options.close != null && options.close.length > 0 && options.close[closeName] != null) {
                    var tData = cloneJSON(options.close[closeName]); getWipDetailData
                    addTableColumns(tData, ['DELETE003CITEM', 'CHOOSESERVICEID'], ['string', 'string'], false);
                    tData.rows[0]['DELETE003CITEM'] = getRowFieldString(tData, 'CITEMCODE');
                    tData.rows[0]['CHOOSESERVICEID'] = getRowFieldString(tData, 'SERVICEID');
                    changeData = cloneJSON(options.close);
                    changeData['ChangeData'] = tData;
                }
                //2018.08.09 重新計算功能，增加傳入contact(互動)的資料
                if (options.parameters[contactTableName] != null) {
                    if (changeData == null) {
                        changeData = cloneJSON(options.parameters);
                    };
                    changeData[contactTableName] = cloneJSON(options.parameters[contactTableName]);
                };
                return changeData;
            });
            var tCharge = getChangeData();
            var dsOtherData = null;
            if (tCharge != null) dsOtherData = JSON.stringify(tCharge);
            //#8147 2019.02.27 增加傳送工單資料，便於系統可以判斷自行新增的收費資料或設備資料。
            var dsWipData = null;
            if (options.wipData != null) dsWipData = JSON.stringify(options.wipData);

            var dsMoveReInstData = null;
            if (options.moveReInstData != null) dsMoveReInstData = JSON.stringify(options.moveReInstData);

            //dsChangeData = "{\"Customer\":{\"columns\":[{\"name\":\"HOMEID\",\"type\":\"double\"},{\"name\":\"MEMBERID\",\"type\":\"string\"},{\"name\":\"ID\",\"type\":\"string\"},{\"name\":\"CUSTSTATUSCODE\",\"type\":\"int32\"},{\"name\":\"CUSTNAME\",\"type\":\"string\"},{\"name\":\"COMPCODE\",\"type\":\"int32\"},{\"name\":\"CUSTID\",\"type\":\"int32\"},{\"name\":\"RELATION\",\"type\":\"string\"},{\"name\":\"MDUID\",\"type\":\"string\"},{\"name\":\"NODENO\",\"type\":\"string\"},{\"name\":\"CIRCUITNO\",\"type\":\"string\"},{\"name\":\"STRTCODE\",\"type\":\"int32\"},{\"name\":\"CLASSNAME\",\"type\":\"string\"},{\"name\":\"CVKEY\",\"type\":\"string\"},{\"name\":\"TEL\",\"type\":\"string\"},{\"name\":\"INSTADDRNO\",\"type\":\"int32\"},{\"name\":\"INSTADDRESS\",\"type\":\"string\"},{\"name\":\"CONTTEL\",\"type\":\"string\"},{\"name\":\"PRODUCT_CNT\",\"type\":\"decimal\"},{\"name\":\"BALANCE\",\"type\":\"decimal\"},{\"name\":\"ISBALANCE\",\"type\":\"decimal\"},{\"name\":\"ERROR\",\"type\":\"decimal\"},{\"name\":\"MAINTAIN\",\"type\":\"decimal\"},{\"name\":\"CONTACT\",\"type\":\"decimal\"},{\"name\":\"DECLARANTNAME\",\"type\":\"string\"},{\"name\":\"CLCTNAME\",\"type\":\"string\"},{\"name\":\"COMBINE\",\"type\":\"string\"},{\"name\":\"REINSTOWNER\",\"type\":\"string\"},{\"name\":\"ADUSERID\",\"type\":\"string\"},{\"name\":\"EMPNO\",\"type\":\"string\"},{\"name\":\"FACISEQNOSTR\",\"type\":\"string\"},{\"name\":\"CUSTIDSTR\",\"type\":\"string\"}],\"rows\":[{\"HOMEID\":899,\"MEMBERID\":\"22517\",\"ID\":\"缺ID0600074\",\"CUSTSTATUSCODE\":1,\"CUSTNAME\":\"珊愛服飾\",\"COMPCODE\":3,\"CUSTID\":600074,\"RELATION\":null,\"MDUID\":null,\"NODENO\":\"ZN10\",\"CIRCUITNO\":null,\"STRTCODE\":40005,\"CLASSNAME\":\"一般客戶\",\"CVKEY\":\"201810090089687\",\"TEL\":\"\",\"INSTADDRNO\":1000371,\"INSTADDRESS\":\"竹南鎮博愛街82號\",\"CONTTEL\":\"476278\",\"PRODUCT_CNT\":4,\"BALANCE\":4060,\"ISBALANCE\":-4060,\"ERROR\":1,\"MAINTAIN\":0,\"CONTACT\":2,\"DECLARANTNAME\":\"珊愛服飾\",\"CLCTNAME\":\"胡瑞月(三灣譽隆)\",\"COMBINE\":\"C正常,D正常,I促銷,P促銷\",\"REINSTOWNER\":\"TBCSH.\",\"ADUSERID\":\"maintain\",\"EMPNO\":\"TEST\",\"FACISEQNOSTR\":\"'A'\",\"CUSTIDSTR\":600074,\"uid\":0,\"boundindex\":0,\"uniqueid\":\"2622-31-24-30-311619\",\"visibleindex\":0}]},\"Contact\":{\"columns\":[{\"name\":\"SEQNO\",\"type\":\"string\"},{\"name\":\"AUTOSERIALNO\",\"type\":\"double\"},{\"name\":\"CUSTID\",\"type\":\"int32\"},{\"name\":\"NODENO\",\"type\":\"string\"},{\"name\":\"CONTRACT_SERIAL_NUM\",\"type\":\"string\"},{\"name\":\"MEDIACODE\",\"type\":\"int32\"},{\"name\":\"MEDIANAME\",\"type\":\"string\"},{\"name\":\"BULLETINCODE\",\"type\":\"int32\"},{\"name\":\"BULLETINNAME\",\"type\":\"string\"},{\"name\":\"PROMCODE\",\"type\":\"double\"},{\"name\":\"PROMNAME\",\"type\":\"string\"},{\"name\":\"ORDERNO\",\"type\":\"string\"},{\"name\":\"RESVTIME\",\"type\":\"date\"},{\"name\":\"SNO\",\"type\":\"string\"},{\"name\":\"RCDSTARTTIME\",\"type\":\"date\"},{\"name\":\"MEDIABILLNO\",\"type\":\"string\"},{\"name\":\"GUINOSTR\",\"type\":\"string\"},{\"name\":\"SERVICETYPE\",\"type\":\"string\"},{\"name\":\"SERVICECODE\",\"type\":\"int32\"},{\"name\":\"SERVICENAME\",\"type\":\"string\"},{\"name\":\"SERVDESCCODE\",\"type\":\"int32\"},{\"name\":\"SERVDESCNAME\",\"type\":\"string\"},{\"name\":\"CONTENTCODE\",\"type\":\"int32\"},{\"name\":\"CONTENTNAME\",\"type\":\"string\"},{\"name\":\"NOTE\",\"type\":\"string\"},{\"name\":\"PROCRESULTNO\",\"type\":\"int32\"},{\"name\":\"PROCRESULTNAME\",\"type\":\"string\"},{\"name\":\"RESULTCODE\",\"type\":\"int32\"},{\"name\":\"RESULTNAME\",\"type\":\"string\"},{\"name\":\"REASONCODE\",\"type\":\"int32\"},{\"name\":\"REASONNAME\",\"type\":\"string\"},{\"name\":\"HANDLEEN\",\"type\":\"string\"},{\"name\":\"HANDLENAME\",\"type\":\"string\"},{\"name\":\"HANDLETIME\",\"type\":\"date\"},{\"name\":\"HANDLENOTE\",\"type\":\"string\"},{\"name\":\"UPDEN\",\"type\":\"string\"},{\"name\":\"UPDTIME\",\"type\":\"string\"},{\"name\":\"PREAUTOSERIALNO\",\"type\":\"double\"},{\"name\":\"SERVICEID\",\"type\":\"string\"},{\"name\":\"FACISEQNO\",\"type\":\"string\"},{\"name\":\"WORKCLASSCODE\",\"type\":\"string\"},{\"name\":\"WORKCLASSNAME\",\"type\":\"string\"},{\"name\":\"SERVDESCCODE2\",\"type\":\"int32\"},{\"name\":\"SERVDESCNAME2\",\"type\":\"string\"},{\"name\":\"SERVDESCCODE3\",\"type\":\"int32\"},{\"name\":\"SERVDESCNAME3\",\"type\":\"string\"},{\"name\":\"ACCEPTTIME\",\"type\":\"date\"},{\"name\":\"NEWUPDTIME\",\"type\":\"date\"},{\"name\":\"PRODUCTCODE\",\"type\":\"int32\"},{\"name\":\"FACISNO\",\"type\":\"string\"},{\"name\":\"PRESEQNO\",\"type\":\"string\"},{\"name\":\"TEL1\",\"type\":\"string\"},{\"name\":\"ACCEPTEN\",\"type\":\"string\"},{\"name\":\"ACCEPTNAME\",\"type\":\"string\"},{\"name\":\"COMPCODE\",\"type\":\"int32\"},{\"name\":\"INOUTFLAG\",\"type\":\"int32\"},{\"name\":\"CVKEY\",\"type\":\"string\"}],\"rows\":[{\"SEQNO\":\"201810090095101\",\"AUTOSERIALNO\":1520436,\"CUSTID\":600074,\"NODENO\":\"ZN10\",\"SERVICECODE\":\"1809\",\"SERVICENAME\":\"客服(外)-室外移機\",\"SERVDESCCODE\":\"1378\",\"SERVDESCNAME\":\"室外移機\",\"UPDEN\":\"TEST50\",\"UPDTIME\":\"107/10/09 18:16:21\",\"ACCEPTTIME\":\"2018-10-09T16:33:13+08:00\",\"NEWUPDTIME\":\"2018-10-09T18:16:21.620363+08:00\",\"PRODUCTCODE\":null,\"CONTENTCODE\":null,\"CONTENTNAME\":null,\"SERVDESCCODE2\":null,\"SERVDESCNAME2\":null,\"SERVDESCCODE3\":null,\"SERVDESCNAME3\":null,\"MEDIACODE\":null,\"MEDIANAME\":null,\"PROMCODE\":null,\"PROMNAME\":null,\"BULLETINCODE\":null,\"BULLETINNAME\":null,\"WORKCLASSCODE\":null,\"WORKCLASSNAME\":null,\"PROCRESULTNO\":null,\"PROCRESULTNAME\":null,\"RESULTCODE\":null,\"RESULTNAME\":null,\"REASONCODE\":null,\"REASONNAME\":null,\"HANDLEEN\":null,\"HANDLENAME\":null,\"PREAUTOSERIALNO\":null,\"FACISEQNO\":null,\"RESVTIME\":null,\"HANDLETIME\":null,\"NOTE\":null,\"HANDLENOTE\":null,\"SERVICETYPE\":null,\"ACCEPTEN\":\"DEBBY50\",\"ACCEPTNAME\":\"YANG50\",\"COMPCODE\":3,\"INOUTFLAG\":1,\"CVKEY\":\"201810090089678\"}],\"oldrows\":[{\"SEQNO\":\"201810090095101\",\"AUTOSERIALNO\":1520436,\"CUSTID\":600074,\"NODENO\":\"ZN10\",\"SERVICECODE\":1809,\"SERVICENAME\":\"客服(外)-室外移機\",\"SERVDESCCODE\":1378,\"SERVDESCNAME\":\"室外移機\",\"UPDEN\":\"TEST50\",\"UPDTIME\":\"107/10/09 18:05:41\",\"ACCEPTTIME\":\"2018-10-09T16:33:13+08:00\",\"NEWUPDTIME\":\"2018-10-09T18:05:41+08:00\",\"ROWINDEX\":0}]},\"Contact_ALL\":{\"columns\":[{\"name\":\"CUSTID\",\"type\":\"int32\",\"isPK\":false},{\"name\":\"SERVICETYPE\",\"type\":\"string\",\"isPK\":false},{\"name\":\"SERVICECODE\",\"type\":\"int32\"},{\"name\":\"SERVICENAME\",\"type\":\"string\",\"isPK\":false},{\"name\":\"SERVDESCCODE\",\"type\":\"int32\"},{\"name\":\"SERVDESCNAME\",\"type\":\"string\",\"isPK\":false},{\"name\":\"CONTENTCODE\",\"type\":\"int32\"},{\"name\":\"CONTENTNAME\",\"type\":\"string\",\"isPK\":false},{\"name\":\"CUSTNAME\",\"type\":\"string\",\"isPK\":false},{\"name\":\"TEL1\",\"type\":\"string\",\"isPK\":false},{\"name\":\"NODENO\",\"type\":\"string\",\"isPK\":false},{\"name\":\"RESVTIME\",\"type\":\"date\",\"isPK\":false},{\"name\":\"RESULTNAME\",\"type\":\"string\",\"isPK\":false},{\"name\":\"REASONNAME\",\"type\":\"string\",\"isPK\":false},{\"name\":\"NOTE\",\"type\":\"string\",\"isPK\":false},{\"name\":\"ACCEPTTIME\",\"type\":\"date\",\"isPK\":false},{\"name\":\"ACCEPTNAME\",\"type\":\"string\",\"isPK\":false},{\"name\":\"HANDLENAME\",\"type\":\"string\",\"isPK\":false},{\"name\":\"HANDLETIME\",\"type\":\"date\",\"isPK\":false},{\"name\":\"PROCRESULTNAME\",\"type\":\"string\",\"isPK\":false},{\"name\":\"FACISNO\",\"type\":\"string\",\"isPK\":false},{\"name\":\"HANDLENOTE\",\"type\":\"string\",\"isPK\":false},{\"name\":\"UPDEN\",\"type\":\"string\",\"isPK\":false},{\"name\":\"UPDTIME\",\"type\":\"string\",\"isPK\":false},{\"name\":\"CVKEY\",\"type\":\"string\"},{\"name\":\"SEQNO\",\"type\":\"string\"},{\"name\":\"AUTOSERIALNO\",\"type\":\"double\"},{\"name\":\"MID\",\"type\":\"double\",\"isPK\":false},{\"name\":\"LINK\",\"type\":\"double\",\"isPK\":false},{\"name\":\"INOUTFLAG\",\"type\":\"int32\",\"isPK\":false},{\"name\":\"STATUS\",\"type\":\"decimal\",\"isPK\":false},{\"name\":\"RANK\",\"type\":\"decimal\"}],\"rows\":[{\"CUSTID\":600074,\"SERVICECODE\":1809,\"SERVICENAME\":\"客服(外)-室外移機\",\"SERVDESCCODE\":1378,\"SERVDESCNAME\":\"室外移機\",\"CUSTNAME\":\"珊愛服飾\",\"NODENO\":\"ZN10\",\"ACCEPTTIME\":\"2018-10-09T16:33:13+08:00\",\"ACCEPTNAME\":\"YANG50\",\"UPDEN\":\"TEST50\",\"UPDTIME\":\"107/10/09 18:05:41\",\"CVKEY\":\"201810090089678\",\"SEQNO\":\"201810090095101\",\"AUTOSERIALNO\":1520436,\"MID\":1520436,\"INOUTFLAG\":1,\"RANK\":1},{\"CUSTID\":600074,\"SERVICETYPE\":\"D\",\"SERVICECODE\":1809,\"SERVICENAME\":\"客服(外)-室外移機\",\"SERVDESCCODE\":1378,\"SERVDESCNAME\":\"室外移機\",\"CUSTNAME\":\"珊愛服飾\",\"NODENO\":\"ZN10\",\"ACCEPTTIME\":\"2018-10-09T16:24:43+08:00\",\"ACCEPTNAME\":\"YANG50\",\"FACISNO\":\"1685166718\",\"UPDEN\":\"YANG50\",\"UPDTIME\":\"107/10/09 16:24:43\",\"CVKEY\":\"201810090089677\",\"SEQNO\":\"201810090095100\",\"AUTOSERIALNO\":1520435,\"MID\":1520435,\"INOUTFLAG\":1,\"RANK\":2},{\"CUSTID\":600074,\"SERVICECODE\":1855,\"SERVICENAME\":\"客服(外)-裝機派工\",\"SERVDESCCODE\":1377,\"SERVDESCNAME\":\"裝機派工\",\"CUSTNAME\":\"珊愛服飾\",\"NODENO\":\"ZN10\",\"ACCEPTTIME\":\"2013-05-16T15:24:52+08:00\",\"ACCEPTNAME\":\"SQ測試2\",\"HANDLENAME\":\"IVR\",\"HANDLETIME\":\"2014-08-06T18:00:00+08:00\",\"PROCRESULTNAME\":\"完工\",\"UPDEN\":\"SQ測試2\",\"UPDTIME\":\"102/05/16 15:24:45\",\"CVKEY\":\"201305160010693\",\"SEQNO\":\"201305160094559\",\"AUTOSERIALNO\":207683,\"MID\":207683,\"INOUTFLAG\":1,\"STATUS\":1,\"RANK\":3},{\"CUSTID\":600074,\"SERVICECODE\":1855,\"SERVICENAME\":\"客服(外)-裝機派工\",\"SERVDESCCODE\":1377,\"SERVDESCNAME\":\"裝機派工\",\"CUSTNAME\":\"珊愛服飾\",\"NODENO\":\"ZN10\",\"ACCEPTTIME\":\"2012-10-16T11:33:49+08:00\",\"ACCEPTNAME\":\"TEST50\",\"HANDLENAME\":\"SQ測試1\",\"HANDLETIME\":\"2013-01-30T14:20:29+08:00\",\"PROCRESULTNAME\":\"退單\",\"UPDEN\":\"TEST50\",\"UPDTIME\":\"101/10/16 12:10:02\",\"CVKEY\":\"201210160004655\",\"SEQNO\":\"201210160093543\",\"AUTOSERIALNO\":206883,\"MID\":206883,\"INOUTFLAG\":1,\"STATUS\":1,\"RANK\":4},{\"CUSTID\":600074,\"SERVICETYPE\":\"C\",\"SERVICECODE\":3433,\"SERVICENAME\":\"收費-二次帳單郵寄\\r\\n\",\"SERVDESCCODE\":2167,\"SERVDESCNAME\":\"CATV二次帳單\\r\\n\",\"CUSTNAME\":\"珊愛服飾\",\"TEL1\":\"476278\",\"NODENO\":\"ZN10\",\"NOTE\":\"(201109二次帳單,繳費截止日9/18,帳單郵寄日:9/8)\",\"ACCEPTTIME\":\"2011-09-06T16:36:30+08:00\",\"ACCEPTNAME\":\"曾旭昇\",\"UPDEN\":\"曾旭昇\",\"UPDTIME\":\"100/09/06 16:36:30\",\"CVKEY\":\"201109061434256\",\"SEQNO\":\"201109061434256\",\"AUTOSERIALNO\":87631,\"MID\":87631,\"INOUTFLAG\":1,\"STATUS\":-1,\"RANK\":5},{\"CUSTID\":600074,\"SERVICETYPE\":\"I\",\"SERVICECODE\":4403,\"SERVICENAME\":\"TM-去電記錄\",\"SERVDESCCODE\":4008,\"SERVDESCNAME\":\"拒絕銷售\",\"CONTENTCODE\":789,\"CONTENTNAME\":\"沒時間上網\",\"CUSTNAME\":\"珊愛服飾\",\"TEL1\":\"476278\",\"NODENO\":\"ZN10\",\"ACCEPTTIME\":\"2011-06-17T15:54:43+08:00\",\"ACCEPTNAME\":\"陳秀茵\",\"UPDEN\":\"陳秀茵\",\"UPDTIME\":\"100/06/17 15:54:43\",\"CVKEY\":\"201106171367410\",\"SEQNO\":\"201106171367410\",\"AUTOSERIALNO\":34674,\"MID\":34674,\"INOUTFLAG\":1,\"STATUS\":-1,\"RANK\":6},{\"CUSTID\":600074,\"SERVICETYPE\":\"I\",\"SERVICECODE\":4411,\"SERVICENAME\":\"TM-寬頻上網促銷活動\",\"SERVDESCCODE\":4003,\"SERVDESCNAME\":\"上網情況(ISP/合約)\",\"CONTENTCODE\":713,\"CONTENTNAME\":\"Hinet\",\"CUSTNAME\":\"珊愛服飾\",\"TEL1\":\"476278\",\"NODENO\":\"ZN10\",\"ACCEPTTIME\":\"2011-06-17T15:54:32+08:00\",\"ACCEPTNAME\":\"陳秀茵\",\"UPDEN\":\"陳秀茵\",\"UPDTIME\":\"100/06/17 15:54:32\",\"CVKEY\":\"201106171367409\",\"SEQNO\":\"201106171367409\",\"AUTOSERIALNO\":205809,\"MID\":205809,\"INOUTFLAG\":1,\"STATUS\":-1,\"RANK\":7}]},\"PR\":{\"columns\":[{\"name\":\"SEQNO\",\"type\":\"string\"},{\"name\":\"AUTOSERIALNO\",\"type\":\"double\"},{\"name\":\"CUSTID\",\"type\":\"int32\"},{\"name\":\"NODENO\",\"type\":\"string\"},{\"name\":\"CONTRACT_SERIAL_NUM\",\"type\":\"string\"},{\"name\":\"MEDIACODE\",\"type\":\"int32\"},{\"name\":\"MEDIANAME\",\"type\":\"string\"},{\"name\":\"BULLETINCODE\",\"type\":\"int32\"},{\"name\":\"BULLETINNAME\",\"type\":\"string\"},{\"name\":\"PROMCODE\",\"type\":\"double\"},{\"name\":\"PROMNAME\",\"type\":\"string\"},{\"name\":\"ORDERNO\",\"type\":\"string\"},{\"name\":\"RESVTIME\",\"type\":\"date\"},{\"name\":\"SNO\",\"type\":\"string\"},{\"name\":\"RCDSTARTTIME\",\"type\":\"date\"},{\"name\":\"MEDIABILLNO\",\"type\":\"string\"},{\"name\":\"GUINOSTR\",\"type\":\"string\"},{\"name\":\"SERVICETYPE\",\"type\":\"string\"},{\"name\":\"SERVICECODE\",\"type\":\"int32\"},{\"name\":\"SERVICENAME\",\"type\":\"string\"},{\"name\":\"SERVDESCCODE\",\"type\":\"int32\"},{\"name\":\"SERVDESCNAME\",\"type\":\"string\"},{\"name\":\"CONTENTCODE\",\"type\":\"int32\"},{\"name\":\"CONTENTNAME\",\"type\":\"string\"},{\"name\":\"NOTE\",\"type\":\"string\"},{\"name\":\"PROCRESULTNO\",\"type\":\"int32\"},{\"name\":\"PROCRESULTNAME\",\"type\":\"string\"},{\"name\":\"RESULTCODE\",\"type\":\"int32\"},{\"name\":\"RESULTNAME\",\"type\":\"string\"},{\"name\":\"REASONCODE\",\"type\":\"int32\"},{\"name\":\"REASONNAME\",\"type\":\"string\"},{\"name\":\"HANDLEEN\",\"type\":\"string\"},{\"name\":\"HANDLENAME\",\"type\":\"string\"},{\"name\":\"HANDLETIME\",\"type\":\"date\"},{\"name\":\"HANDLENOTE\",\"type\":\"string\"},{\"name\":\"UPDEN\",\"type\":\"string\"},{\"name\":\"UPDTIME\",\"type\":\"string\"},{\"name\":\"PREAUTOSERIALNO\",\"type\":\"double\"},{\"name\":\"SERVICEID\",\"type\":\"string\"},{\"name\":\"FACISEQNO\",\"type\":\"string\"},{\"name\":\"WORKCLASSCODE\",\"type\":\"string\"},{\"name\":\"WORKCLASSNAME\",\"type\":\"string\"},{\"name\":\"SERVDESCCODE2\",\"type\":\"int32\"},{\"name\":\"SERVDESCNAME2\",\"type\":\"string\"},{\"name\":\"SERVDESCCODE3\",\"type\":\"int32\"},{\"name\":\"SERVDESCNAME3\",\"type\":\"string\"},{\"name\":\"ACCEPTTIME\",\"type\":\"date\"},{\"name\":\"NEWUPDTIME\",\"type\":\"date\"},{\"name\":\"PRODUCTCODE\",\"type\":\"int32\"},{\"name\":\"FACISNO\",\"type\":\"string\"},{\"name\":\"PRESEQNO\",\"type\":\"string\"},{\"name\":\"TEL1\",\"type\":\"string\"},{\"name\":\"ACCEPTEN\",\"type\":\"string\"},{\"name\":\"ACCEPTNAME\",\"type\":\"string\"},{\"name\":\"COMPCODE\",\"type\":\"int32\"},{\"name\":\"INOUTFLAG\",\"type\":\"int32\"},{\"name\":\"CVKEY\",\"type\":\"string\"}],\"rows\":[{\"SEQNO\":\"201810090095101\",\"AUTOSERIALNO\":1520436,\"CUSTID\":600074,\"NODENO\":\"ZN10\",\"SERVICECODE\":\"1809\",\"SERVICENAME\":\"客服(外)-室外移機\",\"SERVDESCCODE\":\"1378\",\"SERVDESCNAME\":\"室外移機\",\"UPDEN\":\"TEST50\",\"UPDTIME\":\"107/10/09 18:16:21\",\"ACCEPTTIME\":\"2018-10-09T16:33:13+08:00\",\"NEWUPDTIME\":\"2018-10-09T18:16:21.620363+08:00\",\"PRODUCTCODE\":null,\"CONTENTCODE\":null,\"CONTENTNAME\":null,\"SERVDESCCODE2\":null,\"SERVDESCNAME2\":null,\"SERVDESCCODE3\":null,\"SERVDESCNAME3\":null,\"MEDIACODE\":null,\"MEDIANAME\":null,\"PROMCODE\":null,\"PROMNAME\":null,\"BULLETINCODE\":null,\"BULLETINNAME\":null,\"WORKCLASSCODE\":null,\"WORKCLASSNAME\":null,\"PROCRESULTNO\":null,\"PROCRESULTNAME\":null,\"RESULTCODE\":null,\"RESULTNAME\":null,\"REASONCODE\":null,\"REASONNAME\":null,\"HANDLEEN\":null,\"HANDLENAME\":null,\"PREAUTOSERIALNO\":null,\"FACISEQNO\":null,\"RESVTIME\":null,\"HANDLETIME\":null,\"NOTE\":null,\"HANDLENOTE\":null,\"SERVICETYPE\":null,\"ACCEPTEN\":\"DEBBY50\",\"ACCEPTNAME\":\"YANG50\",\"COMPCODE\":3,\"INOUTFLAG\":1,\"CVKEY\":\"201810090089678\"}],\"oldrows\":[{\"SEQNO\":\"201810090095101\",\"AUTOSERIALNO\":1520436,\"CUSTID\":600074,\"NODENO\":\"ZN10\",\"SERVICECODE\":1809,\"SERVICENAME\":\"客服(外)-室外移機\",\"SERVDESCCODE\":1378,\"SERVDESCNAME\":\"室外移機\",\"UPDEN\":\"TEST50\",\"UPDTIME\":\"107/10/09 18:05:41\",\"ACCEPTTIME\":\"2018-10-09T16:33:13+08:00\",\"NEWUPDTIME\":\"2018-10-09T18:05:41+08:00\",\"ROWINDEX\":0}]},\"loginInfo\":{\"loginInfo\":{\"columns\":[{\"name\":\"compcode\",\"type\":\"integer\"},{\"name\":\"entryid\",\"type\":\"string\"},{\"name\":\"entryname\",\"type\":\"string\"},{\"name\":\"groupid\",\"type\":\"string\"},{\"name\":\"compstr\",\"type\":\"string\"},{\"name\":\"ReportServicePath\",\"type\":\"string\"},{\"name\":\"LoginEncryptkey\",\"type\":\"string\"},{\"name\":\"LoginCompCode\",\"type\":\"integer\"},{\"name\":\"ClientComputerName\",\"type\":\"string\"},{\"name\":\"ClientIP\",\"type\":\"string\"},{\"name\":\"UserAgent\",\"type\":\"string\"},{\"name\":\"Browser\",\"type\":\"string\"}],\"rows\":[{\"compcode\":3,\"entryid\":\"TEST\",\"entryname\":\"TEST50\",\"groupid\":\"\",\"compstr\":\"1,3\",\"ReportServicePath\":\"http://192.168.10.80:1688/CSReport.aspx\",\"LoginEncryptkey\":\"h1UjtzEmZ94E3Sf+ue1Ty/VIvBLlmiCQKHek1/u+U/I=\",\"LoginCompCode\":3,\"ClientComputerName\":\"NT AUTHORITY\\\\IUSR\",\"ClientIP\":\"192.168.10.137\",\"UserAgent\":\"UserAgent=Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36/UserHostName=192.168.10.137\",\"Browser\":\"Chrome69\"}]}}}";

            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {
                CustId: { type: 'integer', value: options.custId },
                ServiceType: { type: 'string', value: options.serviceType },
                WorkCodeValue: { type: 'integer', value: options.PRCodeRow['CODENO'] },
                ResvTime: { type: 'datetime', value: options.resvTime },
                SNo: { type: 'string', value: options.sno },
                dsOtherData: { type: 'string', value: convertToNull(dsOtherData) },
                dsWipData: { type: 'string', value: convertToNull(dsWipData) }
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
                            var tables = [wipTableName, chargeTableName, facilityTableName, productTableName, changeFaciTableName, changeProductTableName, otherChargeTableName, prFacilityTableName];
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
            var csArrays = ["csPRCode",
                    "csReasonCode",
                    "csCustRunCode",
                    "csGroupCode", "csWorkerEn1", "csWorkerEn2",
                    "csReturnCode", "csReturnDescCode", "csSatiCode", "csSignEn", "csReasonDescCode"];
            var tableArrays = ["PRCode",
                    "PRReasonCode",
                    "CustRtnCode",
                    "GroupCode", "WorkerEn0", "WorkerEn1",
                    "ReturnCode", "ReturnDescCode", "SatiCode", "SignEn", "ReasonDescCode"];
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
    function initAddress1(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = $.data(div, formName).options.language;
            var controls = options.controls;
            var csArrays = ["g1ReInstAddress",
                    "g1NewChargeAddrNo",
                    "g1NewMailAddrNo"
            ];
            var cLengths = csArrays.length;

            for (var i = 0; i < cLengths; i++) {
                var iId = $(div).prop('id') + csArrays[i];
                var filterAreaCode = false;
                switch (csArrays[i]) {
                    case "g1ReInstAddress":
                        filterAreaCode = true;
                        break;
                    default:
                }
                getControlObject(div, csArrays[i]).csAddress1({
                    width: getControlObject(div, csArrays[i]).parent().width() - 10,
                    editMode: editMode.edit,
                    buttonWidth: 100,
                    buttonHeight: buttonsHeight,
                    buttonText: lang[csArrays[i]],
                    loginInfo: cloneJSON(options.loginInfo),
                    filterAreaCode: filterAreaCode,
                    edableFilterAreaCode :false ,
                    theme: options.theme
                });
                controls.push({ name: iId, type: 'csAddress1', level: 4 });
            }
            getControlObject(div, "g1NewChargeAddrNo").css("display", "none");
            getControlObject(div, "g1NewMailAddrNo").css("display", "none");
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initAddress1', err);
        }
    }

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
        //alert(JSON.stringify($.data(div, formName).options.language));
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

            $(div).css('overflow', 'hidden');

            //建立Splitter
            //oArray = ["gbxAll"];
            //oLength = oArray.length;
            //for (var i = 0 ; i < oLength; i++) {
            //    var iId = $(div).prop('id') + oArray[i];
            //    $('#' + iId).jqxSplitter({
            //        theme: options.theme,
            //        height: $(div).height() - buttonsHeight - 4,
            //        width: '100%',
            //        orientation: 'horizontal',
            //        splitBarSize: 2,
            //        panels: [{ size: 340, collapsible: true }, { size: $(div).height() - buttonsHeight - 342 }]
            //    });
            //    controls.push({ name: iId, type: 'jqxSplitter', level: level });
            //}
            //level += 1;

            //建立Panel
            oArray = ["gbxData"];
            var oHightArray = ["80%"];
            var oWidthArray = ["99.5%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxPanel({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    //sizeMode: "wrap"
                    //autoUpdate: true
                });
                controls.push({ name: iId, type: 'jqxPanel', level: level });//level=0
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        $('#' + iId + scrollBars[j]).css('display', 'none');
                    }
                }
            }
            level += 1;

            //建立內層csTabs
            //oArray = ["tabM"];
            //oWidthArray = ["99.5%"];
            //oLength = oArray.length;
            //for (var i = 0 ; i < oLength; i++) {
            //    var iId = $(div).prop('id') + oArray[i];
            //    $('#' + iId).csTabs({
            //        theme: options.theme,
            //        width: oWidthArray[i],
            //        height: '99%',
            //    });
            //    var tabTitles = ['lProduct', 'lCharge', 'lFacility', 'lPresent'];
            //    for (var j = 0; j < tabTitles.length; j++) {
            //        $('#' + iId).csTabs('setTitleAt', j, lang[tabTitles[j]]);
            //    }
            //    controls.push({ name: iId, type: 'csTabs', level: level });
            //    $('#' + iId).on("selected", function () {
            //        formResize(div);
            //    });
            //}
            //level += 1;

            //建立Panel
            oArray = ["gbxTop", "gbxWip"];
            var oHightArray = [buttonsHeight, "60%"];
            var oWidthArray = ["99.8%", "99.8%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxPanel({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    //sizeMode: "wrap"
                    //autoUpdate: true
                });
                controls.push({ name: iId, type: 'jqxPanel', level: level });//level=2
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        $('#' + iId + scrollBars[j]).css('display', 'none');
                    }
                }
            }
            level += 1;

            //建立內層Expander
            oArray = ["gbxAddress", "gbxClose"];
            //oHightArray = ["170", "300"];
            oWidthArray = ["99.8%", "99.8%"];
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
                controls.push({ name: iId, type: 'jqxExpander', level: level });//level=3
            }
            level += 1;

            //建立input
            oArray = ["tInstCount", "tPinCode",
                    "tNewTel1", "tNewTel2"];
            oWidthArray = ["25%", "50%",
                    "25%", "25%", "25%"];
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
            level += 1;

            //建立input
            oArray = ["tWorkUnit", "tFinUnit"];
            oWidthArray = [50, 50];
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
                controls.push({ name: iId, type: 'jqxNumberInput', level: level });
            }
            level += 1;

            //建立日期元件
            oArray = ["dtResvTime", "dtResvFlagTime",
                    "dtCallOkTime", "dtFinTime",
                    "dtSignDate", "dtReInstDate"];
            oWidthArray = ["120", "50",
                    "135", "135",
                    "100", "135"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var fs = "yyyy/MM/dd HH:mm";
                var disabled = false;
                var showCalendarButton = true;//2018.07.20 增加可以選日歷，Jacky說明預約時間不需要。
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
                    case 'dtResvTime':
                        showCalendarButton = false;
                        break;
                }
                $('#' + iId).csDateTime({
                    theme: options.theme,
                    formatString: fs,
                    showCalendarButton: showCalendarButton,
                    value: null,
                    height: textHeight,
                    disabled: disabled,
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csDateTime', level: level });
            }
            level += 1;


            //建立單選元件
            oArray = ["csServiceType", "csPRCode", "csReasonCode", "csReasonDescCode",
                    "csCustRunCode", "csGroupCode", "csWorkerEn1", "csWorkerEn2",
                    "csReturnCode", "csReturnDescCode", "csSatiCode", "csSignEn"];
            oWidthArray = ["50%", "50%", "50%", "50%",
                    "50%", "50%", "180", "180",
                    "50%", "50%", "50%", "50%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 80,
                    width: oWidthArray[i]
                });
                $('#' + iId).css({ "margin-left": 0 });
                controls.push({ name: iId, type: 'csList', level: level });
            }
            level += 1;

            //建立CheckBox
            oArray = ["chkPrintBillFlag"];
            oWidthArray = ["80"];
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

            //建立備註
            oArray = ["tNote"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxTextArea({
                    theme: options.theme,
                    width: "75%",
                    height: textHeight * 2
                });
                //$('#' + iId).children().css('margin-left', 5);
                controls.push({ name: iId, type: 'jqxTextArea', level: level });
            }
            level += 1;

            //建立按鈕
            //oArray = ['btnSave', 'btnReserve2', 'btnViewPR', "btnChangeProd", 'btnExit',
            //    'btnReserve',
            //    'btnSubAdd1', 'btnSubEdit1', 'btnSubDelete1',
            //    'btnSubAdd2', 'btnSubEdit2', 'btnSubDelete2'];
            oArray = ['btnSave', 'btnReserve2', 'btnViewPR', 'btnExit', 'btnReserve',
                      'btnSubAdd1', 'btnSubEdit1', 'btnSubDelete1',
                      'btnSubAdd2', 'btnSubEdit2', 'btnSubDelete2'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var text = lang[oArray[i]];
                var disabled = false;
                switch (oArray[i]) {
                    case "btnSave":
                        img = imageScr.save;
                        break;
                    case "btnExit":
                        img = imageScr.exit;
                        break;
                    case "btnReserve":
                        img = imageScr.query;
                        width = '20%';
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
                    height: buttonsHeight,
                    disabled: disabled
                }, img);
                if (isEmpty(text) != true) {
                    bOptions = $.extend({}, bOptions, imagePosition);
                }
                o.jqxButton(bOptions);
                controls.push({ name: bId, type: 'jqxButton', level: level });
                getControlObject(div, oArray[i]).find('img').css({ top: 1 });
            }
            level += 1;

            renderChargeGrid(div, level);
            level += 1;
            renderFaciGrid(div, level);
            level += 1;
            options.level = level;
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
                    disableAllControls(options.controls, false, true);
                    instRefnoEnable(div); //kin
                    var r = $.data($('#' + win.contentId)[0], 'SO1115A').options;
                    var resvTime = r.returnResvtime;
                    var groupNo = r.returnWorkCode;
                    var servCode = r.servCode;//#8065
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
            disableAllControls(options.controls, true, true);
            var servCode = options.workServCode;
            options.oldWorkServCode = servCode;
            var instRows = getRowByKeyValue(options.initData['PRCode'].rows, 'CODENO', getControlObject(div, 'csPRCode').csList('codeNo'));
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
            options.level += 1;
        }
        catch (err) {
            errorHandle(formName, 'showReserve', err);
        }
    };
    //預約明細
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
                    disableAllControls(options.controls, false, true);
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                }
                catch (err) {
                    errorHandle(formName, 'showReserve2_close', err);
                }
            });
            disableAllControls(options.controls, true, true);
            var servCode = options.workServCode;
            var instRows = getRowByKeyValue(options.initData['PRCode'].rows, 'CODENO', getControlObject(div, 'csPRCode').csList('codeNo'));
            var groupNo = instRows['GROUPNO'];
            var resvTime = getControlObject(div, 'dtResvTime').csDateTime('getText');
            var workerType = "3";
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
            options.level += 1;
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
            var win = createcsWindow(options.container, options.language['chooseIntro'] + " [" + objectName + "]", winOptions);
            $('#' + win.windowId).on('close', function () {
                disableAllControls(options.controls, false, true);
                var r = $.data($('#' + win.contentId)[0], objectName).options;
                $('#' + win.contentId)[objectName]('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                action({ isSaved: r.introData.rows.length > 0, introData: r.introData });
            });
            disableAllControls(options.controls, true, true);
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
            options.level += 1;
        }
        catch (err) {
            errorHandle(formName, 'showIntroData', err);
        }
    };
    //選取變更設備
    function showChangeFaci(div, action) {
        try {
            var options = $.data(div, formName).options;
            var objectName = 'SO111XD';
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
                hasClosing: false,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language['chooseFacilityKind'] + " [" + objectName + "]", winOptions);

            $('#' + win.windowId).on('close', function () {
                try {
                    disableAllControls(options.controls, false, true);
                    instRefnoEnable(div); //kin
                    var r = $.data($('#' + win.contentId)[0], objectName).options;
                    var wipData = cloneJSON(r.wipDataCopy);
                    var isSaved = true;
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                    action({ isSaved: isSaved, wipData: wipData });
                } catch (err) {
                    errorHandle(formName, 'showChangeFaci_close', err);
                }
            });

            var canDo = $.fn.WipUtility('getUserPriv', {
                groupId: options.loginInfo.loginInfo.rows[0].groupid,
                privName: "SO11138",
                privData: options.initData[userPrivTableName]
            });
            var canCancel = canDo;

            if (isEmpty(getControlObject(div, "dtCallOkTime").csDateTime('getText')) == false) {
                canDo = false;
                canCancel = false;
            }
            disableAllControls(options.controls, true, true);
            //#8062 2019.01.24 Kin有提供傳入設備流會號後會自動指定設備。最後沒使用，原因是如果沒有點選指定設備則會沒有效果。
            //var autoFaciSeqno = '';
            //if (options.serviceType != '' && options.serviceType != null && options.serviceType != undefined) {
            //    if (options.parameters[options.contactName] != undefined) {
            //        if (options.parameters[options.contactName].rows.length > 0) {
            //            if (options.parameters[options.contactName].rows[0].SERVICETYPE != '' && options.parameters[options.contactName].rows[0].SERVICETYPE != 'C') {
            //                autoFaciSeqno = options.parameters[options.contactName].rows[0].FACISEQNO
            //                if (autoFaciSeqno != null && autoFaciSeqno != '') { autoAddMatain = true };
            //            };
            //        };
            //    };
            //};

            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                custId: options.custId,
                serviceType: options.serviceType,
                sno: options.SNo,
                wipData: cloneJSON(options.wipData),
                wipType: 3,
                wipRefNo: options.PRCodeRow['refNo'.toUpperCase()],
                reInstAcrossFlag: (options.PRCodeRow['ReInstAcrossFlag'.toUpperCase()] == 2),
                //autoFaciSeqno: autoFaciSeqno,//#8062 2019.01.24 Kin有提供傳入設備流會號後會自動指定設備。最後沒使用，原因是如果沒有點選指定設備則會沒有效果。
                isWip: true,
                canDo: canDo,
                canCancel: canCancel,
                editMode: options.editMode,
                theme: options.theme,
                localization: cloneJSON(options.localization)
            });
            options.controls.push({ name: win.contentId, type: objectName, level: options.level });
            options.level += 1;
        }
        catch (err) {
            errorHandle(formName, 'showChangeFaci', err);
        }
    };
    //設備資料
    function showFacilityData(div, em, rowIndex, action) {
        try {
            var options = $.data(div, formName).options;
            var width = options.container.width();
            var height = $(div).height();
            var objectName = "SO1120A";
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
            var data = {};
            $('#' + win.windowId).on('close', function () {
                try {
                    disableAllControls(options.controls, false, true);
                    instRefnoEnable(div); //kin
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
            disableAllControls(options.controls, true, true);
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
                data = cloneDataTable(options.wipData, facilityTableName);
            }
            data[chooseFaciTableName] = cloneJSON(options.wipData[facilityTableName]);
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: cloneJSON(options.parameters),
                wipData: cloneJSON(data),
                selectedRowindex: rowIndex,//#8137 增加傳入rowIndex給 設備功能內的selectedRowindex
                wipType: 3,
                editMode: em,
                theme: options.theme,
                localization: cloneJSON(options.localization)
            });
            options.controls.push({ name: win.contentId, type: objectName, level: options.level });
            options.level += 1;
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
                var rows = sortObject(options.wipData[chargeTableName].rows, "ITEM desc");
                item = rows[0]["ITEM"];
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
                        columns: cloneJSON(options.wipData[chargeTableName].columns),
                        rows: [{
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

            $.fn[objectName](method, $.extend({ wipType: 3 }, options.loginInfo, data), function (r) {
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
                        disableAllControls(options.controls, false, true);
                        instRefnoEnable(div); //kin
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
                disableAllControls(options.controls, true, true);
                var resvTime = getControlObject(div, "dtResvTime").csDateTime('getDate');
                var clctEn = getControlObject(div, 'csWorkerEn1').csList('codeNo');
                var clctName = getControlObject(div, 'csWorkerEn1').csList('description');
                $('#' + win.contentId)[objectName]({
                    loginInfo: cloneJSON(options.loginInfo),
                    container: $('#' + win.windowId),
                    parameters: cloneJSON(options.parameters),
                    wipData: cloneJSON(data),
                    wipType: 3,
                    editMode: em,
                    wipResvTime: resvTime,
                    wipClctEn: clctEn,
                    wipClctName: clctName,
                    theme: options.theme,
                    localization: cloneJSON(options.localization)
                });
                options.controls.push({ name: win.contentId, type: objectName, level: 20 });
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
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
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
                //parameters: data,
                wipData: cloneJSON(data),
                editMode: editMode.delete,
                wipType: 3,
                theme: options.theme,
                localization: cloneJSON(options.localization)
            });
            //$.fn[objectName]('canDelete', $.extend({ wipType: 3 }, options.loginInfo, data), function (r) {
            //    if (r[0] != true) {
            //        if (r[1] != null) {
            //            messageBox(r[1]);
            //        }
            //        deleteJSONObject(data);
            //        action({ isSaved: false });
            //        return;
            //    }
              
            //});
        }
        catch (err) {
            errorHandle(formName, 'deleteCharge', err);
        }
    };
    function deleteFacility(div, rowIndex, action) {
        try {
            //var options = $.data(div, formName).options;
            //var row = getControlObject(div, "gFacility").jqxGrid('getrows')[rowIndex];
            ////同區移機,換裝不能刪
            //if (row["PRFLAG"] != 1 && row["RESEQNO"] == null) {
            //    messageBox(options.language.sureDelete, messageType.yesno, null, function (flag) {
            //        if (flag == 'yes') {
            //            options.wipData[facilityTableName].rows = deleteRowByKeyValue(options.wipData[facilityTableName].rows, "SEQNO", row["SEQNO"]);
            //            options.wipData[changeFaciTableName].rows = deleteRowByKeyValue(options.wipData[changeFaciTableName].rows, "SEQNO", row["SEQNO"]);
            //            action({ isSaved: true });
            //        }
            //        else {
            //            action({ isSaved: false });
            //        }
            //    });
            //}
            //else {
            //    action({ isSaved: false });
            //}
            var options = $.data(div, formName).options;
            var row = getControlObject(div, "gFacility").jqxGrid('getrows')[rowIndex];
            var data = cloneDataTable(options.wipData, facilityTableName, rowIndex, null, facilityTableName);

            $.fn["SO1120A"]('canDelete', $.extend({ wipType: 3 }, options.loginInfo, data), function (r) {
                if (r[0] != true) {
                    if (r[1] != null) {
                        messageBox(r[1]);
                    }
                    deleteJSONObject(data);
                    action({ isSaved: false });
                    return;
                }
                if (row["PRFLAG"] == 1) {
                    //移機轉入設備不能刪除!!"
                    messageBox(options.language.moveInCannotDelete);
                    action({ isSaved: false });
                    return;
                }
                //var wipCannotDelFaci = options.initData["SO041"].rows[0]["WipCannotDelFaci".toUpperCase()];
                //if (wipCannotDelFaci != null) {
                //    if (wipCannotDelFaci.indexOf(instRefNo + ')') >= 0) {
                //    }
                //}
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
    function checkPRCode(div) {
        try {
            var options = $.data(div, formName).options;
            if (isEmpty(getControlObject(div, 'csPRCode').csList('codeNo'))) {
                messageBox(options.language.choosePRCode, null, null, function () {
                    getControlObject(div, 'csPRCode').csList('focus');
                });
                return false;
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'checkPRCode', err);
        }
    }

    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            var checkPRCode = function () {
                if (isEmpty(getControlObject(div, 'csPRCode').csList('codeNo'))) {
                    messageBox(options.language.choosePRCode, null, null, function () {
                        getControlObject(div, 'csPRCode').csList('focus');
                    });
                    return false;
                }
                return true;
            }
            var checkResvTime = function () {
                var ViewPRFlag = (convertToNull(getControlObject(div, 'dtResvTime').csDateTime('getDate')) == null);
                if (ViewPRFlag) {
                    messageBox(options.language.choosePRCode, null, null, function () {
                        getControlObject(div, 'dtResvTime').csDateTime('focus');
                    });
                    return false;
                }
                return true;
            }
            //存檔
            getControlObject(div, 'btnSave').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                save(div, function (isOk, msg) {
                    if (!isOk) {
                        if (msg != null) {
                            messageBox(msg, messageType.critical);
                        }
                        return;
                    }
                    options.isSaved = true;
                    $('#' + $(div).prop('id') + 'btnExit').triggerHandler('click');
                })
            });
            //預約時間
            getControlObject(div, 'btnReserve').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (checkPRCode() == false) {
                    return;
                }
                if (canChangeResvTime(div, true) != true) { return; }
                disableAllControls(options.controls, true, true);
                showReserve(div, function (r) {
                    getControlObject(div, 'dtResvTime').off('dateChanged');
                    if (r['isSaved'] == true) {
                        options.groupNo = r['groupNo'];
                        options.workServCode = r['servCode'];//#8065
                        getControlObject(div, 'dtResvTime').csDateTime('setText', formatDateTime(new Date(r['resvTime']), 'datetime'));
                        dtResvTime_dateChanged(div);
                        getControlObject(div, 'dtResvTime').trigger('dateChanged');
                        
                    } else {
                        dtResvTime_dateChanged(div);
                    };
                    disableAllControls(options.controls, false, true);
                });
            });
            //預約明細
            getControlObject(div, 'btnReserve2').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (checkPRCode() == false) {
                    return;
                }
                showReserve2(div, function (r) { });
            });
            //介紹人
            getControlObject(div, 'btnFindIntro').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                try {
                    showIntroData(div, function (r) {
                        if (r.isSaved == true) {
                            getControlObject(div, 'tIntroId').jqxInput('val', r.introData.rows[0]['CODENO']);
                            getControlObject(div, 'tIntroName').jqxInput('val', r.introData.rows[0]['DESCRIPTION']);
                        }
                        delete r;
                    })
                }
                catch (err) {
                    errorHandle(formName, 'btnFindIntro_click', err);
                }
            });
            //指定變更設備
            getControlObject(div, 'btnViewPR').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (checkPRCode() == false) {
                    return;
                }
                if (checkResvTime() == false) {
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
            //指定變更產品     2017.06.29 因為尚未開始使用該功能。先將 btnChangeProd 關鍵字註解
            //getControlObject(div, 'btnChangeProd').on('click', function () {
            //    if ($(this).jqxButton('disabled')) { return; }
            //    if (checkPRCode() == false) {
            //        return;
            //    }
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
    function addressAddHandler(div) {
        try {
            //"g1ReInstAddress", "g1NewChargeAddrNo", "g1NewMailAddrNo"
            g1ReInstAddress_ChooseCompleted(div);

        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    }
    //
    function g1ReInstAddress_ChooseCompleted(div) {
        getControlObject(div, 'g1ReInstAddress').on('ChooseCompleted', function (e, e2) {
            try {
                var options = $.data(div, formName).options;
                var addrValue = 0;
                var addrInfo1 = getControlObject(div, 'g1ReInstAddress').csAddress1('getAddrInfo');
                if (addrInfo1 != null) { addrValue = addrInfo1.ADDRNO }
                if (addrValue > 0) {
                    var addrValue2 = 0;
                    var addrInfo2 = getControlObject(div, 'g1NewChargeAddrNo').csAddress1('getAddrInfo');
                    if (addrInfo2 != null) { addrValue2 = addrInfo2.ADDRNO }
                    if (addrValue2 == 0 && addrValue > 0) {
                        getControlObject(div, 'g1NewChargeAddrNo').csAddress1('addrNo', addrValue);
                    }
                    var addrValue3 = 0;
                    var addrInfo3 = getControlObject(div, 'g1NewMailAddrNo').csAddress1('getAddrInfo');
                    if (addrInfo3 != null) { addrValue3 = addrInfo3.ADDRNO }
                    if (addrValue3 == 0 && addrValue > 0) {
                        getControlObject(div, 'g1NewMailAddrNo').csAddress1('addrNo', addrValue);
                    }
                    var initData = $.data(div, formName).options.initData;
                    //#8173 2019.03.08 by Corey 電話號碼是對應SO001，改對應SO137，並且只需要conttel,contmobile 分別對應 TEL1,TEL3 位置
                    //if (initData[customerTableName].rows.length > 0) {
                    //    var row = initData[customerTableName].rows[0];
                    //    getControlObject(div, 'tNewTel1').jqxInput('val', convertNullToString(row['Tel1'.toUpperCase()]));
                    //    getControlObject(div, 'tNewTel2').jqxInput('val', convertNullToString(row['Tel2'.toUpperCase()]));
                    //    getControlObject(div, 'tNewTel3').jqxInput('val', convertNullToString(row['Tel3'.toUpperCase()]));
                    //}
                    if (initData[DeclarantTableName].rows.length > 0) {
                        var row = initData[DeclarantTableName].rows[0];
                        var newTel1 = getControlObject(div, 'tNewTel1').jqxInput('val');
                        if (isEmpty(newTel1)) {
                            getControlObject(div, 'tNewTel1').jqxInput('val', convertNullToString(row['Conttel'.toUpperCase()]));
                        }
                        //var newTel3 = getControlObject(div, 'tNewTel3').jqxInput('val');
                        //if (newTel3 == null) {
                        //    getControlObject(div, 'tNewTel3').jqxInput('val', convertNullToString(row['ContMobile'.toUpperCase()]));
                        //}
                    }
                    //#8176 2019.03.08 by Corey 因為PM_Jacy額外也希望移機輸入地址之後也可以有相同的效果
                    //      所以這部分是抄寫STAN功能 SO1100BA  'gilAddress').on('ChooseCompleted'
                    //查詢重複裝機地址的客戶清單
                    options.workServCode = addrInfo1.SERVCODE;
                    queryInstAddrNoList(div, addrValue, function (isOk, msg) {
                        //有查到才額外處理
                        if (isOk && options.initData.SAMEADDRESS.rows.length > 0) {
                            //開啟選擇相同裝機地址的客戶資料畫面
                            enterSameAddressForm(div, function (isSubOk) {
                                if (isSubOk) {
                                    //目前功能不需要做任何動作，所以視窗關閉就可。
                                };
                            });
                        };
                    });
                }
            }
            catch (err) {
                errorHandle(formName, 'buttonAddHandler', err);
            }
        });
    }
    //開啟選擇相同裝機地址的客戶資料畫面 #8176 抄襲 STAN SO1100BA內的
    function enterSameAddressForm(div, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //設定呼叫參數
            var dsData = {
                type: 'string',
                SAMEADDRESS: cloneJSON(options.initData['SAMEADDRESS'])
            };
            //Create SubForm
            //var width = $(options.container).width();
            //var height = ($(options.container).height() - 30)*0.6;
            var width = 800;
            var height = 300;
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
                theme: options.theme,
                haveClosing: true,
                draggable: false
            };
            var win = createcsWindow(options.container, lang.subFormTitle2, winOptions);
            $('#' + win.contentId)['SO1100BA4']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                theme: options.theme,
                localization: cloneJSON(options.localization),
                parameters: dsData,
                isReadOnly: true //因為當初需求是新增客戶資料時的，而移機的部分只需要瀏覽，所以只需要留取消按鈕就可。
            });
            options.controls.push({ name: win.contentId, type: 'SO1100BA4', level: options.level + 1 });
            options.controls.push({ name: win.windowId, type: 'csWindow', level: options.level });
            getControlObject(div, 'btnSave').jqxButton({ disabled: true });
            //當子功能關閉時
            $('#' + win.windowId).on('close', function () {
                getControlObject(div, 'btnSave').jqxButton({ disabled: false });
                //回傳子功能的選擇
                var suboptions = $('#' + win.contentId).SO1100BA4('options');
                var isSave = suboptions.isSaved;
                $('#' + win.contentId)['SO1100BA4']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                action(isSave);
            });
        } catch (err) {
            errorHandle(formName, 'enterSameAddressForm', err);
        };
    };

    //查詢重複裝機地址的客戶清單 #8176 抄襲 STAN SO1100BA內的
    function queryInstAddrNoList(div, addrNo, action) {
        try {
            var riadllName = "CableSoft.SO.RIA.Customer.Edit.Web.dll"
            var riaClassName = "CableSoft.SO.RIA.Customer.Edit.Web.Edit";
            var options = $.data(div, formName).options;
            var parameters = $.extend({}, getParaLoginInfo(div), {
                InstAddrNo: { type: 'string', value: addrNo }
            });
            var params = getParameters(riadllName, riaClassName, 'QueryInstAddrNo', JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ResultBoolean == true) {
                        var tempData = JSON.parse(data.ResultXML);

                        if (options.initData.SAMEADDRESS != null) {
                            deleteJSONObject(options.initData, 'SAMEADDRESS');
                        };
                        options.initData.SAMEADDRESS = cloneJSON(tempData.Table1);

                        deleteJSONObject(tempData);
                        deleteJSONObject(data);
                        action(true);
                    }
                    else {
                        action(false, data.ErrorMessage);
                        deleteJSONObject(data);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'queryInstAddrNoList', err);
        }
    };


    function checkChildPriv(div, em, type) {
        try {
            var options = $.data(div, formName).options;
            var ops = {
                editMode: em,
                wipType: 3,
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
            errorHandle(formName, 'checkChildPriv', err);
        }
    }

    function facilityHandler(div) {
        var options = $.data(div, formName).options;
        //設備-新增
        getControlObject(div, 'btnSubAdd1').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            if (checkPRCode(div) == false) {
                return;
            }
            disableAllControls(options.controls, true, true);
            showFacilityData(div, editMode.append, -1, function (r) {
                try {
                    if (r.isSaved == true) {
                        var newRow = r.wipData[facilityTableName].rows[0];
                        options.wipData[facilityTableName].rows.push(copyRowToRow(null, newRow, options.wipData[facilityTableName].columns));
                        //changeCMData(div, newRow);
                        refreshGrid(div);
                    }
                }
                catch (err) {
                    errorHandle(formName, 'facilityHandler_showFacilityData', err);
                }
                disableAllControls(options.controls, false, true);
                setSubButton(div);
            });
        });
        //設備-修改
        getControlObject(div, 'btnSubEdit1').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            var rows = getControlObject(div, "gFacility").jqxGrid('getrows');
            if (rows.length == 0) return;
            if (checkPRCode(div) == false) {
                return;
            }
            var rowIndex = getControlObject(div, "gFacility").jqxGrid('getselectedrowindex');
            disableAllControls(options.controls, true, true);
            showFacilityData(div, editMode.edit, rowIndex, function (r) {
                try {
                    if (r.isSaved == true) {
                        //#8137 因為STB和ICC有連動修改設備序號的問題，所以 設備畫面回來的資料需要整個都置換掉。這樣才會有效果。
                        //var newRow = r.wipData[facilityTableName].rows[0];
                        //var row = options.wipData[facilityTableName].rows[rowIndex];
                        //options.wipData[facilityTableName].rows[rowIndex] = copyRowToRow(row, newRow, options.wipData[facilityTableName].columns);
                        options.wipData[facilityTableName] = 0;
                        options.wipData[facilityTableName] = null;
                        delete options.wipData[facilityTableName];
                        options.wipData[facilityTableName] = cloneJSON(r.wipData[facilityTableName])

                        //changeCMData(div, newRow);
                        refreshGrid(div);
                    }
                }
                catch (err) {
                    errorHandle(formName, 'facilityHandler_showFacilityData', err);
                }
                disableAllControls(options.controls, false, true);
                setSubButton(div);
            });
        });
        //設備-刪除
        getControlObject(div, 'btnSubDelete1').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            var rows = getControlObject(div, "gFacility").jqxGrid('getrows');
            if (rows.length == 0) return;
            if (checkPRCode(div) == false) {
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
            });
        });
    }
    function chargeHandler(div) {
        var options = $.data(div, formName).options;
        //收費-新增
        getControlObject(div, 'btnSubAdd2').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            if (checkPRCode(div) == false || checkChildPriv(div, editMode.append, 1) == false) {
                return;
            }
            disableAllControls(options.controls, true, true);
            showChargeData(div, editMode.append, -1, function (r) {
                try {
                    if (r.isSaved == true) {
                        var newRow = r.wipData["Simple"].rows[0];
                        //#8147 2019.02.27 增加"自訂新增"的收費資料，這樣才能切換預約時間後，才知道該筆資料是自行新增的，不能刪除。
                        newRow["ADDFLAG"] = 1;
                        options.wipData[chargeTableName].rows.push(copyRowToRow(null, newRow, options.wipData[chargeTableName].columns));
                        refreshGrid(div);
                    }
                }
                catch (err) {
                    errorHandle(formName, 'chargeHandler_showChargeData', err);
                }
                disableAllControls(options.controls, false, true);
                setSubButton(div);
            });
        });
        //收費-修改
        getControlObject(div, 'btnSubEdit2').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            var rows = getControlObject(div, "gCharge").jqxGrid('getrows');
            if (rows.length == 0) return;
            if (checkPRCode(div) == false || checkChildPriv(div, editMode.edit, 1) == false) {
                return;
            }
            var rowIndex = getControlObject(div, "gCharge").jqxGrid('getselectedrowindex');
            if (!ChargeDataCanEdit(div, rowIndex)) { return false; };
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
                    errorHandle(formName, 'chargeHandler_showChargeData', err);
                }
                disableAllControls(options.controls, false, true);
                setSubButton(div);
            });
        });
        //收費-作廢
        getControlObject(div, 'btnSubDelete2').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            var rows = getControlObject(div, "gCharge").jqxGrid('getrows');
            if (rows.length == 0) return;
            if (checkPRCode(div) == false || checkChildPriv(div, editMode.delete, 1) == false) {
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
                    errorHandle(formName, 'chargeHandler_deleteCharge', err);
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
    function ChargeDataCanEdit(div, rowindex) {
        var options = $.data(div, formName).options;
        try {
            //WasCancelNotEdit : "該筆收費資料已作廢,不可修改!",
            //WasCloseNotEdit : "該筆收費資料已日結,不可修改!",
            //WasChargeNotEdit: "該筆收費資料已收費,不可修改!",
            //CloseDataNotEdit: "結清資料不能修改!",
            if (options.wipData[chargeTableName].rows[rowindex]['CancelFlag'.toUpperCase()] != undefined) {
                if (options.wipData[chargeTableName].rows[rowindex]['CancelFlag'.toUpperCase()] == 1) {
                    messageBox(options.language.WasCancelNotEdit, messageType.critical);
                    return false;
                };
            };

            if (options.editMode != editMode.append) {
                if (options.wipData.Wip.rows[0]['ClsTime'.toUpperCase()] != undefined) {
                    if (options.wipData.Wip.rows[0]['ClsTime'.toUpperCase()] != null) {
                        messageBox(options.language.WasCloseNotEdit, messageType.critical);
                        return false;
                    };
                };

            };
            if (options.wipData[chargeTableName].rows[rowindex]['RealDate'.toUpperCase()] != undefined) {
                if (options.wipData[chargeTableName].rows[rowindex]['RealDate'.toUpperCase()] != null) {
                    if (!getPrivMID(div, 'SO11137')) {
                        messageBox(options.language.WasChargeNotEdit, messageType.critical);
                        return false;
                    };
                };
            };
            if (options.wipData[chargeTableName].rows[rowindex]['Type'.toUpperCase()] == undefined) {
                messageBox(options.language.WasCloseNotEdit, messageType.critical);
                return false;
            };
            if (options.wipData[chargeTableName].rows[rowindex]['Type'.toUpperCase()] != 0) {
                messageBox(options.language.WasCloseNotEdit, messageType.critical);
                return false;
            };
            if (options.wipData[chargeTableName].rows[rowindex]['SBillNo'.toUpperCase()] != undefined) {
                if (options.wipData[chargeTableName].rows[rowindex]['SBillNo'.toUpperCase()] != null) {
                    if (!getPrivMID(div, 'SO1132C')) {
                        messageBox(options.language.CloseDataNotEdit, messageType.critical);
                        return false;
                    };
                };
            };

            return true;
        } catch (err) {
            errorHandle(formName, 'ChargeDataCanEdit', err);
        };
    }
    function renderChargeGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var height = 200;
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
                                      text = "";
                                      break;
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
            })
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
            var height = 200;
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

            //refreshGrid(div);
        }
        catch (err) {
            errorHandle(formName, 'renderFaciGrid', err);
        }
    };
    function getFalseSNo() {
        var d = new Date();
        return formatDateTime(d, 'date', false).substr(0, 6) + 'P' + formatDateTime(d, 'time3', false);
    };
    function newRcd(div) {
        try {
            var options = $.data(div, formName).options;
            options.sno = getFalseSNo();
            getControlObject(div, 'tSno').text(options.sno);
            getControlObject(div, 'tAcceptEn').text(options.loginInfo.loginInfo.rows[0].entryid + "/ " + options.loginInfo.loginInfo.rows[0].entryname);
            var acceptTime = formatDateTime(new Date(), 'datetime2');
            getControlObject(div, 'tAcceptTime').text(acceptTime);
            getControlObject(div, 'tServName').text(options.initData[customerTableName].rows[0]["SERVAREA"]);
            //getControlObject(div, 'tContName').text(convertNullToString(options.initData[proposerTableName].rows[0]['DeclarantName'.toUpperCase()]));
            //getControlObject(div, 'tContTel').text(convertNullToString(options.initData[proposerTableName].rows[0]['ContTel'.toUpperCase()]));
            //getControlObject(div, 'tContmobile').text(convertNullToString(options.initData[proposerTableName].rows[0]['Contmobile'.toUpperCase()]));
            //getControlObject(div, 'tID').text(convertNullToString(options.initData[proposerTableName].rows[0]['ID']));
            options.servCode = options.initData[customerTableName].rows[0]["SERVCODE"];
            options.workServCode = options.servCode;
            getControlObject(div, 'tPrintUserName').text('');
            getControlObject(div, 'tPrintTime').text('');
            getControlObject(div, 'tPrtCount').text('');
            getControlObject(div, 'tClsTime').text('');
            getControlObject(div, "csServiceType").csList('codeNo', options.serviceType);
                
            //預設互動資料
            //defContact(div);
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
                getControlObject(div, 'csMediaCode')('codeNo', row['MEDIACODE']);
                getControlObject(div, 'csBulletinCode')('codeNo', row['BulletinCode'.toUpperCase()]);
                getControlObject(div, 'csPromCode')('codeNo', row['PromCode'.toUpperCase()]);
            }
        }
        catch (err) {
            errorHandle(formName, 'defContact', err);
        }
    };

    function getShowControlData(div, controlType, controlName, tableName, dataName, dataName2) {
        //controlType:控制項種類。
        //controlName:控制項名稱。
        //tableName  :主要資料來源。
        //dataName   :資料來源欄位名稱。
        //dataName2  :資料來源欄位名稱2。 csList用的 Description名稱。
        var row = $.data(div, formName).options.wipData[tableName].rows[0];
        if (row != null) {
            if (row[dataName.toUpperCase()] != null) {
                switch (controlType.toUpperCase()) {
                    case 'TEXT'.toUpperCase():
                        getControlObject(div, controlName).text(convertNullToString(row[dataName.toUpperCase()]));
                        break;
                    case 'jqxInput'.toUpperCase():
                        getControlObject(div, controlName).jqxInput('val', row[dataName.toUpperCase()]);
                        break;
                    case "csList".toUpperCase():
                        getControlObject(div, controlName).csList('codeNo', row[dataName.toUpperCase()]);
                        if (convertToNull(getControlObject(div, controlName).csList('codeNo')) == null &&
                            convertToNull(row[dataName.toUpperCase()]) != null) {
                            var csCodeNo = row[dataName.toUpperCase()];
                            var csDescription = "";
                            if (convertToNull(dataName2) != null) { csDescription = row[dataName2.toUpperCase()]; };
                            getControlObject(div, controlName).csList('setDisplayValue', { CODENO: csCodeNo, DESCRIPTION: csDescription });
                        }
                        break;
                    case 'csDateTime'.toUpperCase():
                        getControlObject(div, controlName).csDateTime('setDate', row[dataName.toUpperCase()]);
                        break;
                    case 'jqxCheckBox'.toUpperCase():
                        getControlObject(div, controlName).jqxCheckBox('val', row[dataName.toUpperCase()] == 1);
                        break;
                    case "".toUpperCase():

                        break;
                }
            }
        }
    };

    function rcdToScr(div) {
        try {
            var options = $.data(div, formName).options;
            var row = options.wipData[wipTableName].rows[0];
            var loginInfoRow = options.loginInfo.loginInfo.rows[0];
            //getControlObject(div, 'tOrderNo').text(convertNullToString(row['OrderNo'.toUpperCase()]));
            getControlObject(div, 'tSno').text(convertNullToString(row['Sno'.toUpperCase()]));

            getControlObject(div, 'tServName').text(options.initData[customerTableName].rows[0]["SERVAREA"]);
            //#8475 By Kin 2019/08/19
            if (options.initData['CD002'].rows.length > 0) {
                getControlObject(div, 'tServName').text(options.initData['CD002'].rows[0]["DESCRIPTION"]);
            };
            options.workServCode = row['WorkServCode'.toUpperCase()];
            options.servCode = row['ServCode'.toUpperCase()];
            getControlObject(div, 'tAcceptEn').text(row['AcceptEn'.toUpperCase()] + " / " + row['AcceptName'.toUpperCase()]);
            var acceptTime = formatDateTime(row['AcceptTime'.toUpperCase()], 'datetime2').toString();
            getControlObject(div, 'tAcceptTime').text(convertNullToString(acceptTime));

            //getControlObject(div, 'tContName').text(convertNullToString(row['ContName'.toUpperCase()]));
            //getControlObject(div, 'tContTel').text(convertNullToString(row['ContTel'.toUpperCase()]));
            //getControlObject(div, 'tContmobile').text(convertNullToString(row['Contmobile'.toUpperCase()]));
            //getControlObject(div, 'tID').text(convertNullToString(row['ID'.toUpperCase()]));

            getControlObject(div, 'csServiceType').csList('codeNo', row['ServiceType'.toUpperCase()]);
            //getControlObject(div, 'csPRCode').csList('codeNo', row['PRCode'.toUpperCase()]);
            //getControlObject(div, 'csPRCode').csList('Description', row['PRName'.toUpperCase()]);
            getShowControlData(div, "csList", "csPRCode", wipTableName, "PRCode", "PRName");
            options.PRCodeRow = getRowByKeyValue(options.initData['ALLPRCode'].rows, 'CODENO', row['PRCode'.toUpperCase()]);

            getControlObject(div, 'csReasonCode').csList('codeNo', row['ReasonCode'.toUpperCase()]);
            getControlObject(div, 'csReasonDescCode').csList('codeNo', row['ReasonDescCode'.toUpperCase()]);
            getControlObject(div, 'dtResvTime').csDateTime('setDate', row['ResvTime'.toUpperCase()]);
            options.resvTime = row['ResvTime'.toUpperCase()];
            getControlObject(div, 'csCustRunCode').csList('codeNo', row['CustRunCode'.toUpperCase()]);
            getControlObject(div, 'dtResvFlagTime').csDateTime('setDate', row['ResvFlagTime'.toUpperCase()]);
            getControlObject(div, 'chkPrintBillFlag').jqxCheckBox('val', row['PrintBillFlag'.toUpperCase()] == 1);
            getControlObject(div, 'dtReInstDate').csDateTime('setDate', row['ReInstDate'.toUpperCase()]);
            getControlObject(div, 'dtCallOkTime').csDateTime('setDate', row['CallOkTime'.toUpperCase()]);
            getControlObject(div, 'csGroupCode').csList('codeNo', row['GroupCode'.toUpperCase()]);
            getControlObject(div, 'csGroupCode').csList('description', row['GroupName'.toUpperCase()]);
            getControlObject(div, 'csWorkerEn1').csList('codeNo', row['WorkerEn1'.toUpperCase()]);
            getControlObject(div, 'csWorkerEn1').csList('description', row['WorkerName1'.toUpperCase()]);
            getControlObject(div, 'csWorkerEn2').csList('codeNo', row['WorkerEn2'.toUpperCase()]);
            getControlObject(div, 'csWorkerEn2').csList('description', row['WorkerName2'.toUpperCase()]);
            getControlObject(div, 'tWorkUnit').jqxNumberInput('val', row['WorkUnit'.toUpperCase()]);
            getControlObject(div, 'tInstCount').jqxInput('val', convertNullToString(row['InstCount'.toUpperCase()]));
            getControlObject(div, 'tPinCode').jqxInput('val', convertNullToString(row['PinCode'.toUpperCase()]));
            getControlObject(div, 'tNote').jqxTextArea('val', convertNullToString(row['Note'.toUpperCase()]));

            //getControlObject(div, 'tIntroId').jqxInput('val', convertNullToString(row['IntroId'.toUpperCase()]));
            //getControlObject(div, 'tIntroName').jqxInput('val', convertNullToString(row['IntroName'.toUpperCase()]));
            //getControlObject(div, 'csPromCode').csList('codeNo', row['PromCode'.toUpperCase()]);
            //getControlObject(div, 'csPromCode').csList('description', row['PromName'.toUpperCase()]);
            //getControlObject(div, 'csBPCode').csList('source', [{ CODENO: row['BPCode'.toUpperCase()], DESCRIPTION: row['BPName'.toUpperCase()] }]);
            //getControlObject(div, 'csBPCode').csList('codeNo', row['BPCode'.toUpperCase()]);
            //getControlObject(div, 'csBPCode').csList('description', row['BPName'.toUpperCase()]);
            //getControlObject(div, 'csBulletinCode').csList('codeNo', row['BulletinCode'.toUpperCase()]);
            //getControlObject(div, 'csBulletinCode').csList('description', row['BulletinName'.toUpperCase()]);

            getControlObject(div, 'g1ReInstAddress').csAddress1('addrNo', convertNullToString(row['ReInstAddrNo'.toUpperCase()]));
            getControlObject(div, 'g1NewChargeAddrNo').csAddress1('addrNo', convertNullToString(row['NewChargeAddrNo'.toUpperCase()]));
            getControlObject(div, 'g1NewMailAddrNo').csAddress1('addrNo', convertNullToString(row['NewMailAddrNo'.toUpperCase()]));
            getControlObject(div, 'tNewTel1').jqxInput('val', convertNullToString(row['NewTel1'.toUpperCase()]));
            getControlObject(div, 'tNewTel2').jqxInput('val', convertNullToString(row['NewTel2'.toUpperCase()]));
            //getControlObject(div, 'tNewTel3').jqxInput('val', convertNullToString(row['NewTel3'.toUpperCase()]));

            getControlObject(div, 'dtFinTime').csDateTime('setDate', row['FinTime'.toUpperCase()]);
            getControlObject(div, 'csReturnCode').csList('codeNo', row['ReturnCode'.toUpperCase()]);
            getControlObject(div, 'csReturnCode').csList('description', row['ReturnName'.toUpperCase()]);
            getControlObject(div, 'csReturnDescCode').csList('codeNo', row['ReturnDescCode'.toUpperCase()]);
            getControlObject(div, 'csReturnDescCode').csList('description', row['ReturnDescName'.toUpperCase()]);
            getControlObject(div, 'csSatiCode').csList('codeNo', row['SatiCode'.toUpperCase()]);
            getControlObject(div, 'csSatiCode').csList('description', row['SatiName'.toUpperCase()]);
            getControlObject(div, 'csSignEn').csList('codeNo', row['SignEn'.toUpperCase()]);
            getControlObject(div, 'csSignEn').csList('description', row['SignName'.toUpperCase()]);
            getControlObject(div, 'dtSignDate').csDateTime('setDate', row['SignDate'.toUpperCase()]);
            if (options.editMode == editMode.append) {
                getControlObject(div, 'tFinUnit').jqxNumberInput('val', 0);
            } else {
                getControlObject(div, 'tFinUnit').jqxNumberInput('val', row['FinUnit'.toUpperCase()]);
            }

            getControlObject(div, 'tPrintUserName').text(convertNullToString(row['PrintUserName'.toUpperCase()]));
            getControlObject(div, 'tPrtCount').text(convertNullToString(row['PrtCount'.toUpperCase()]));
            getControlObject(div, 'tPrintTime').text(formatDateTime(row['PrintTime'.toUpperCase()], 'datetime2'));
            getControlObject(div, 'tClsTime').text(formatDateTime(row['ClsTime'.toUpperCase()], 'datetime2'));
            getControlObject(div, 'lReInstDate').text(options.language.lblReInstDate);
            //#8442 it shows lblReInstDate2 when the refno is equal to 3 by kin 2019/07/12
            if (options.PRCodeRow.REFNO == 3) {
                getControlObject(div, 'lReInstDate').text(options.language.lblReInstDate2);

            };
            //options.IVRData['IVRDataMatch'.toUpperCase()] = row['IVRDataMatch'.toUpperCase()];
            //options.IVRData['IVRModifyCode'.toUpperCase()] = row['IVRModifyCode'.toUpperCase()];
            //options.IVRData['IVRModifyName'.toUpperCase()] = row['IVRModifyName'.toUpperCase()];
            //options.IVRData['CheckEn'.toUpperCase()] = row['CheckEn'.toUpperCase()];
            //options.IVRData['CheckName'.toUpperCase()] = row['CheckName'.toUpperCase()];

            options.serviceType = row['ServiceType'.toUpperCase()];
            options.custId = row['custId'.toUpperCase()];
            instRefnoEnable(div);
            UpdateAllControlStatus(div);
        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    };

    function instRefnoEnable(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.PRCodeRow == null) {
                return;
            }
            var instRefNo = options.PRCodeRow['refNo'.toUpperCase()];
            //檢核pinCode 可Key 
            //2018.08.02 by Corey 在查#7812 問題時看到舊版 是判斷 2,3,4,5 才可以選，所以順便調整錯誤的判斷。
            //if ('(1),(5),(6),(7)'.indexOf('(' + instRefNo + ')') >= 0) {
            var canDoPinCode = true;
            if ('(2),(3),(4),(5)'.indexOf('(' + instRefNo + ')') >= 0) {
                canDoPinCode = false;
            }
            getControlObject(div, 'tPinCode').jqxInput({ disabled: canDoPinCode });
            //檢核可選設備/產品
            //#7812 2018.08.02 by Corey 查到舊版的註解說明 '93/07/08 增加移機也可派拆設備 1608 改成不卡參考號 94/07/28
            //      所以將判斷是否可以 點選指定設備 功能拿掉
            //if ('(7),(10),(15)'.indexOf('(' + instRefNo + ')') >= 0) {
            //    getControlObject(div, 'btnViewPR').jqxButton({ disabled: true });
            //}
            //else {
            //    getControlObject(div, 'btnViewPR').jqxButton({ disabled: false });
            //}
            
            //#8314 2019.04.22 by Corey 增加判斷 完工時間和退單原因 兩個欄位都是空的才可以輸入"結案"功能
            var canDoMoveAddr = true;//判斷移機工單(REFNO=3)
            var closeWip = (IsNullOrEmpty(convertToNull(getControlObject(div, 'dtFinTime').csDateTime('getDate')))  && IsNullOrEmpty(convertToNull(getControlObject(div, 'csReturnCode').csList('codeNo'))));//工單是否已經結案
            if ('(3)'.indexOf('(' + instRefNo + ')') >= 0 && closeWip) {
                canDoMoveAddr = false;
            }
            getControlObject(div, 'g1ReInstAddress').csAddress1('disabled', canDoMoveAddr);
            getControlObject(div, 'g1NewChargeAddrNo').csAddress1('disabled', canDoMoveAddr);
            getControlObject(div, 'g1NewMailAddrNo').csAddress1('disabled', canDoMoveAddr);
            getControlObject(div, 'tNewTel1').jqxInput('disabled', canDoMoveAddr)
            getControlObject(div, 'tNewTel2').jqxInput('disabled', canDoMoveAddr)
            //getControlObject(div, 'tNewTel3').jqxInput('disabled', canDoMoveAddr)

            if (options.wipData[wipTableName].rows.length > 0) {
                var row = options.wipData[wipTableName].rows[0];
                getControlObject(div, 'dtReInstDate').csDateTime('setDate', row['ReInstDate'.toUpperCase()]);
            }

            var canDoWip = false;
            canDoWip = isEmpty(options.orderNo);//該工單是否訂單。 false=一般工單 true=訂單
            getControlObject(div, 'csPRCode').csList('disabled', !canDoWip);

            var canDo = $.fn.WipUtility('getUserPriv', {
                groupId: options.loginInfo.loginInfo.rows[0].groupid,
                privName: "SO111322",
                privData: options.initData[userPrivTableName]
            });

            canDoWip = canDoWip && !(options.closeData != null && options.closeData[closeProductTableName] != null);
            getControlObject(div, 'dtResvTime').csDateTime({ disabled: !canDoWip });
            getControlObject(div, 'btnReserve').jqxButton({ disabled: !canDoWip });

            if (options.PRCodeRow != null) {
                if (options.PRCodeRow.CODENO > 0 && options.initData[wipSystemTableName].rows[0]['PointSystem'.toUpperCase()] == 0) {
                    var lngReserveDay = options.PRCodeRow['ReserveDay'.toUpperCase()];
                    if (lngReserveDay == null) { lngReserveDay = 0 }
                    var d = new Date(formatDateTime(new Date(), 'date') + " 09:00");
                    d = new Date(d.getTime() + lngReserveDay * 24 * 60 * 60 * 1000);//往後增加N天
                    getControlObject(div, 'dtResvTime').csDateTime('setDate', d);
                }
            }
            if (options.PRCodeRow.REFNO == 3 && convertToNull(getControlObject(div, 'dtReInstDate').csDateTime('getDate')) == null && convertToNull(getControlObject(div, 'dtResvTime').csDateTime('getDate')) != null) {
                row["ReInstDate".toUpperCase()] = convertToNull(getControlObject(div, 'dtResvTime').csDateTime('getDate'));
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

            setSubButton(div);
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
            var prCodeFlag = false;
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
            getControlObject(div, 'btnReserve').jqxButton({ disabled: flag });
            getControlObject(div, 'btnSave').jqxButton({ disabled: flag });
            if (em == editMode.append) {
                getControlObject(div, 'btnViewPR').jqxButton({ disabled: true });
            };
            
            disableChildControls(div, getControlObject(div, 'gbxML'), options.controls, flag);
            disableChildControls(div, getControlObject(div, 'gbxMM'), options.controls, flag);
            disableChildControls(div, getControlObject(div, 'gbxMR'), options.controls, flag);
            
            getControlObject(div, 'tWorkUnit').jqxNumberInput({ disabled: true });
            //#8314 2019.04.22 by Corey 增加判斷 完工時間和退單原因 兩個欄位都是空的才可以輸入"結案"功能
            var closeWip = (IsNullOrEmpty(convertToNull(getControlObject(div, 'dtFinTime').csDateTime('getDate')))  && IsNullOrEmpty(convertToNull(getControlObject(div, 'csReturnCode').csList('codeNo'))));//工單是否已經結案
            var closeFlag = ((flag == false && newFlag == false && isEmpty(options.orderNo) && closeWip && $.fn.WipUtility('getUserPriv', {
                groupId: options.loginInfo.loginInfo.rows[0].groupid,
                privName: 'SO11136',
                privData: options.initData[userPrivTableName]
            })) == false);
            disableChildControls(div, getControlObject(div, 'gbxClose'), options.controls, closeFlag);


            getControlObject(div, 'btnSubAdd1').jqxButton({ disabled: flag });
            getControlObject(div, 'btnSubEdit1').jqxButton({ disabled: flag });
            getControlObject(div, 'btnSubDelete1').jqxButton({ disabled: flag });
            getControlObject(div, 'btnSubAdd2').jqxButton({ disabled: flag });
            getControlObject(div, 'btnSubEdit2').jqxButton({ disabled: flag });
            getControlObject(div, 'btnSubDelete2').jqxButton({ disabled: flag });

            getControlObject(div, 'csServiceType').csList('disabled', !newFlag);
            getRowByKeyValue(options.controls, 'name', getControlObject(div, 'csServiceType').prop('id')).disabled = newFlag;
            if (options.serviceType != null) { prCodeFlag = true }
            prCodeFlag = prCodeFlag && newFlag
            getControlObject(div, 'csPRCode').csList('disabled', !prCodeFlag);
            getRowByKeyValue(options.controls, 'name', getControlObject(div, 'csServiceType').prop('id')).disabled = newFlag;

            if (em == editMode.edit) {
                if (options.PRCodeRow != null) {
                    var noCallOk = false;
                    //必需線上回報
                    if (options.PRCodeRow["MUSTCALLOK"] == 1 &&
                        isEmpty(getControlObject(div, 'dtCallOkTime').csDateTime('getText'))) {
                        noCallOk = true;
                    }
                    var closePriv = $.fn.WipUtility('getClosePriv', {
                        wipType: 3,
                        wipRefNo: options.PRCodeRow['refNo'.toUpperCase()],
                        groupId: options.loginInfo.loginInfo.rows[0].groupid,
                        privData: options.initData[userPrivTableName]
                    });
                    //完工時間disabled
                    options.finTimeDisabled = !closePriv[1] || closeFlag || noCallOk;
                    //退單原因disabled
                    options.returnCodeDisabled = !closePriv[2] || closeFlag;
                    getControlObject(div, 'dtFinTime').csDateTime({ disabled: options.finTimeDisabled });
                    getControlObject(div, 'dtSignDate').csDateTime({ disabled: options.finTimeDisabled && options.returnCodeDisabled });
                    getControlObject(div, 'csSignEn').csList('disabled', options.finTimeDisabled && options.returnCodeDisabled);
                    options.shouldRegPriv = closePriv[3] && !closeFlag;
                }
            }


            getControlObject(div, 'dtCallOkTime').csDateTime('disabled', true);
            disableAllFieldPriv(options.controls, options.initData[fieldPrivTableName], options.initData[userPrivTableName]);
        }
        catch (err) {
            errorHandle(formName, 'changeMode', err);
        }
    };
    function UpdateAllControlStatus(div) {
        try {
            var getDisableStatus = (function (control) {
                var dFlag = false;
                if (control.type.substr(0, 3) == 'jqx' || control.type.substr(0, 2) == 'cs') {
                    dFlag = $('#' + control.name)[control.type]('disabled');
                }
                else {
                    dFlag = $('#' + control.name).css('disabled');
                }
                if (dFlag == null) dFlag = false;
                return dFlag;
            });
            var options = $.data(div, formName).options;
            var aControls = options.controls
            for (i = 0; i < aControls.length; i++) {
                if (aControls[i].oldDisabled != null) {
                    aControls[i].oldDisabled = getDisableStatus(aControls[i]);
                }
            }
        }
        catch (err) {
            errorHandle(utilityName, 'disableAllControls', err);
        }
    };

    function getControlObject(div, name) {
        return $('#' + $(div).prop('id') + name);
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
            var ViewPRFlag = (convertToNull(getControlObject(div, 'dtResvTime').csDateTime('getDate')) == null);
            getControlObject(div, 'btnViewPR').jqxButton({ disabled: ViewPRFlag });
            if (options.wipData != null && options.wipData[chargeTableName] != null) {
                var rows = options.wipData[chargeTableName].rows;
                var rLength = rows.length;
                var amount = 0
                for (var i = 0 ; i < rLength; i++) {
                    if (rows[i]["CancelFlag".toUpperCase()] == 0) {
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

    function getPrivMID(div, MID) {
        var options = $.data(div, formName).options;
        var canDo = $.fn.WipUtility('getUserPriv', {
            groupId: options.loginInfo.loginInfo.rows[0].groupid,
            privName: MID,
            privData: options.initData[userPrivTableName]
        });
        return canDo;
    }

    function getIntroPriv(div) {
        //拆機工單不使用(COPY裝機單過來的)
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
                            $('#' + controls[j].name)[controls[j].type]({ disabled: flag });
                            disableChildControls($('#' + controls[j].name), controls, flag);
                        }
                        else if (controls[j].type.indexOf('jqx') >= 0) {
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
    //必要欄位判斷
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //檢核拆機類別
            if (checkUIMustBe(getControlObject(div, 'csPRCode').csList('codeNo'), lang.lPRCode, function () {
                getControlObject(div, 'csPRCode').csList('focus');
            }) == false) {
                return false;
            }
            //檢核預約時間
            if (checkUIMustBe(getControlObject(div, 'dtResvTime').csDateTime('val'), lang.lResvTime, function () {
                getControlObject(div, 'dtResvTime').csDateTime('focus');
            }) == false) {
                return false;
            }
            //#7536 2017.08.24 測試不OK調整。
            // SO042.Check4=1 需要判斷 GroupCode 工程組為派工單必要欄位
            if (options.initData["SO042"].rows[0]["Check4".toLocaleUpperCase] == 1) {
                if (checkUIMustBe(getControlObject(div, 'csGroupCode').csList('codeNo'), lang.lGroupCode, function () {
                getControlObject(div, 'csGroupCode').csList('focus');
                }) == false) {
                    return false;
                }
            }

            if (options.PRCodeRow != null) {
                var PRCodeRow = options.PRCodeRow;
                if (PRCodeRow.REFNO == 3) {
                    var addrValue1 = "";
                    var addrInfo1 = getControlObject(div, 'g1ReInstAddress').csAddress1('getAddrInfo');
                    if (addrInfo1 != null) { addrValue1 = addrInfo1.ADDRNO }
                    if (checkUIMustBe(addrValue1, lang.g1ReInstAddress, function () {
                    }) == false) {
                        return false;
                    };
                    //var addrValue2 = "";
                    //var addrInfo2 = getControlObject(div, 'g1NewChargeAddrNo').csAddress1('getAddrInfo');
                    //if (addrInfo2 != null) { addrValue2 = addrInfo2.ADDRNO }
                    //if (checkUIMustBe(addrValue2, lang.g1NewChargeAddrNo, function () {
                    //}) == false) {
                    //    return false;
                    //};
                    //var addrValue3 = "";
                    //var addrInfo3 = getControlObject(div, 'g1NewMailAddrNo').csAddress1('getAddrInfo');
                    //if (addrInfo3 != null) { addrValue3 = addrInfo3.ADDRNO }
                    //if (checkUIMustBe(addrValue3, lang.g1NewMailAddrNo, function () {
                    //}) == false) {
                    //    return false;
                    //};
                }
            }
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

                row["AcceptEn".toUpperCase()] = convertToNull(loginInfoRow['entryid']);
                row["AcceptName".toUpperCase()] = convertToNull(loginInfoRow['entryname']);
                row["AcceptTime".toUpperCase()] = convertToNull(new Date(getControlObject(div, 'tAcceptTime').text()));
                row["OldAddrNo".toUpperCase()] = options.initData[customerTableName].rows[0]["InstAddrNo".toUpperCase()];
                row["OldAddress".toUpperCase()] = options.initData[customerTableName].rows[0]["InstAddress".toUpperCase()];

                row["ServCode".toUpperCase()] = options.initData[customerTableName].rows[0]["ServCode".toUpperCase()];
                row["StrtCode".toUpperCase()] = options.initData[customerTableName].rows[0]["StrtCode".toUpperCase()];
                //row["SalesCode".toUpperCase()] = options.initData[customerTableName].rows[0]["SalesCode".toUpperCase()];
                //row["SalesName".toUpperCase()] = options.initData[customerTableName].rows[0]["SalesName".toUpperCase()];
                row["Tel1".toUpperCase()] = options.initData[customerTableName].rows[0]["Tel1".toUpperCase()];
                row["NodeNo".toUpperCase()] = options.initData[customerTableName].rows[0]["NodeNo".toUpperCase()];

                row["CustID".toUpperCase()] = options.custId
                row["CustName".toUpperCase()] = options.initData[customerTableName].rows[0]["CustName".toUpperCase()];
                row["SNo".toUpperCase()] = convertToNull(getControlObject(div, 'tSno').text());
                row["CompCode".toUpperCase()] = convertToNull(loginInfoRow['compcode']);
                row["ServiceType".toUpperCase()] = options.serviceType
                //row["ReturnOldSNo".toUpperCase()] = options.returnOldSNo
                //row["ReturnPreOldSNo".toUpperCase()] = options.returnSNo
                //row["CloseType".toUpperCase()] = options.closedType
                //row["ModifyFlag".toUpperCase()] = 1
                //row["FinUnit".toUpperCase()] = 0
                
            }
            if (options.workServCode != null) {
                row["WorkServCode".toUpperCase()] = options.workServCode;
            }
            else {
                row["WorkServCode".toUpperCase()] = row["ServCode".toUpperCase()];
            }
            row["PRCode".toUpperCase()] = convertToNull(getControlObject(div, 'csPRCode').csList('codeNo'));
            row["PRName".toUpperCase()] = convertToNull(getControlObject(div, 'csPRCode').csList('description'));
            row["ReasonCode".toUpperCase()] = convertToNull(getControlObject(div, 'csReasonCode').csList('codeNo'));
            row["ReasonName".toUpperCase()] = convertToNull(getControlObject(div, 'csReasonCode').csList('description'));
            row["ReasonDescCode".toUpperCase()] = convertToNull(getControlObject(div, 'csReasonDescCode').csList('codeNo'));
            row["ReasonDescName".toUpperCase()] = convertToNull(getControlObject(div, 'csReasonDescCode').csList('description'));
            row["CustRunCode".toUpperCase()] = convertToNull(getControlObject(div, 'csCustRunCode').csList('codeNo'));
            row["CustRunName".toUpperCase()] = convertToNull(getControlObject(div, 'csCustRunCode').csList('description'));
           // row["CustRunCode".toUpperCase()] = convertToNull(getControlObject(div, 'csCustRunCode').csList('description'));
            row["ResvTime".toUpperCase()] = convertToNull(getControlObject(div, 'dtResvTime').csDateTime('getDate'));
            var resvFlagTime = getControlObject(div, 'dtResvFlagTime').csDateTime('getText');
            if (resvFlagTime != null) resvFlagTime = resvFlagTime.replace(':', '');
            row["ResvFlagTime".toUpperCase()] = convertToNull(resvFlagTime);
            if (getControlObject(div, 'chkPrintBillFlag').jqxCheckBox('val')) {
                row["PrintBillFlag".toUpperCase()] = 1
            }
            else {
                row["PrintBillFlag".toUpperCase()] = 0
            }

            if (options.PRCodeRow.REFNO == 3 && convertToNull(getControlObject(div, 'dtReInstDate').csDateTime('getDate')) == null) {
                row["ReInstDate".toUpperCase()] = convertToNull(getControlObject(div, 'dtResvTime').csDateTime('getDate'));
            } else {
                row["ReInstDate".toUpperCase()] = convertToNull(getControlObject(div, 'dtReInstDate').csDateTime('getDate'));
            }
            row["CallOkTime".toUpperCase()] = convertToNull(getControlObject(div, 'dtCallOkTime').csDateTime('getDate'));
            row["GroupCode".toUpperCase()] = convertToNull(getControlObject(div, 'csGroupCode').csList('codeNo'));
            row["GroupName".toUpperCase()] = convertToNull(getControlObject(div, 'csGroupCode').csList('description'));
            row["WorkerEn1".toUpperCase()] = convertToNull(getControlObject(div, 'csWorkerEn1').csList('codeNo'));
            row["WorkerName1".toUpperCase()] = convertToNull(getControlObject(div, 'csWorkerEn1').csList('description'));
            row["WorkerEn2".toUpperCase()] = convertToNull(getControlObject(div, 'csWorkerEn2').csList('codeNo'));
            row["WorkerName2".toUpperCase()] = convertToNull(getControlObject(div, 'csWorkerEn2').csList('description'));
            row["WorkUnit".toUpperCase()] = convertToNull(getControlObject(div, 'tWorkUnit').jqxNumberInput('val'));
            row["FinUnit".toUpperCase()] = convertToNull(getControlObject(div, 'tFinUnit').jqxNumberInput('val'));
            row["PinCode".toUpperCase()] = convertToNull(getControlObject(div, 'tPinCode').jqxInput('val'));
            row["InstCount".toUpperCase()] = convertToNull(getControlObject(div, 'tInstCount').jqxInput('val'));
            row["Note".toUpperCase()] = convertToNull(getControlObject(div, 'tNote').jqxTextArea('val'));

            var addressItem1 = getControlObject(div, 'g1ReInstAddress').csAddress1('getAddrInfo');
            if (addressItem1 != null) {
                if (addressItem1.ADDRNO != null) {
                    row['ReInstAddrNo'.toUpperCase()] = addressItem1.ADDRNO;
                    row['ReInstAddress'.toUpperCase()] = addressItem1.ADDRESS;
                } else {
                    row['ReInstAddrNo'.toUpperCase()] = null;
                    row['ReInstAddress'.toUpperCase()] = null;
                };
            };
            var addressItem2 = getControlObject(div, 'g1NewChargeAddrNo').csAddress1('getAddrInfo');
            if (addressItem2 != null) {
                if (addressItem2.ADDRNO != null) {
                    row['NewChargeAddrNo'.toUpperCase()] = addressItem2.ADDRNO;
                    row['NewChargeAddress'.toUpperCase()] = addressItem2.ADDRESS;
                } else {
                    row['NewChargeAddrNo'.toUpperCase()] = null;
                    row['NewChargeAddress'.toUpperCase()] = null;
                };
            };
            var addressItem3 = getControlObject(div, 'g1NewMailAddrNo').csAddress1('getAddrInfo');
            if (addressItem3 != null) {
                if (addressItem3.ADDRNO != null) {
                    row['NewMailAddrNo'.toUpperCase()] = addressItem3.ADDRNO;
                    row['NewMailAddress'.toUpperCase()] = addressItem3.ADDRESS;
                } else {
                    row['NewMailAddrNo'.toUpperCase()] = null;
                    row['NewMailAddress'.toUpperCase()] = null;
                };
            };
              
            row["NewTel1".toUpperCase()] = convertToNull(getControlObject(div, 'tNewTel1').jqxInput('val'));
            row["NewTel2".toUpperCase()] = convertToNull(getControlObject(div, 'tNewTel2').jqxInput('val'));
            //row["NewTel3".toUpperCase()] = convertToNull(getControlObject(div, 'tNewTel3').jqxInput('val'));

            row["FinTime".toUpperCase()] = convertToNull(getControlObject(div, 'dtFinTime').csDateTime('getDate'));
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

    function splitData(div, data) {
        try {
            var options = $.data(div, formName).options;
            options.initData = {};
            options.orderData = {};
            options.proposerData = {};
            options.calculateData = {};
            var keys = Object.keys(data);
            var kLength = keys.length;
            for (var i = 0; i < kLength; i++) {
                if (keys[i].indexOf('ORDER_') >= 0) {
                    options.orderData[keys[i].replace('ORDER_', '')] = data[keys[i]];
                    delete data[keys[i]];
                }
                if (keys[i].indexOf('PROPOSER_') >= 0) {
                    options.proposerData[keys[i].replace('PROPOSER_', '')] = data[keys[i]];
                    delete data[keys[i]];
                }
                if (keys[i].indexOf('CALCULATE_') >= 0) {
                    options.calculateData[keys[i].replace('CALCULATE_', '')] = data[keys[i]];
                    delete data[keys[i]];
                }
            }
            options.initData = data;
            getOrderItemData(div);
        }
        catch (err) {
            errorHandle(formName, 'splitData', err);
        }
    }

    //新增客戶資料
    function CustomerDataAdd(div, action) {
        try {
            var options = $.data(div, formName).options;
            var width = 700;
            var height = 400;
            var objectName = "SO1100BA";
            var idData = "";
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
            var win = createcsWindow(options.container, options.language["customerAddNew"] + " [" + objectName + "]", winOptions);

            $('#' + win.windowId).on('close', function () {
                try {
                    var roptions = $.data($('#' + win.contentId)[0], objectName).options;
                    var isSaved = roptions.isSaved;
                    var retCustomer = "";
                    if (isSaved) {
                        //retCustomer = roptions.CustValue[0].rows[0]["CUSTID"];
                        retCustomer = roptions.newCustId;
                    }
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                    action({ isSaved: isSaved, returnRow: retCustomer });
                }
                catch (err) {
                    errorHandle(formName, 'CustomerDataAdd_close', err);
                }
            });

            var getPRFaci = options.wipData[prFacilityTableName];
            if (getPRFaci.rows.length > 0) {
                idData = options.wipData[prFacilityTableName].rows[0]['id'.toUpperCase()];
            }
            var dsData = {
                type: 'string',
                Customer: {
                    columns: [{ name: 'CUSTID', type: 'integer' },
                        { name: 'CUSTSTATUSCODE', type: 'integer' },
                        { name: 'ID', type: 'string' }
                    ],
                    rows: [{
                        CUSTID: null,
                        CUSTSTATUSCODE: null,
                        ID: convertToNull(idData)
                    }]
                }
            };
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                tabContainer: options.container,
                theme: options.theme,
                parameters: cloneJSON(dsData),
                localization: cloneJSON(options.localization),
                editMode: editMode.append
            });
        } catch (err) {
            errorHandle(formName, 'CustomerDataAdd', err);
        }
    }

    function getCanInstCode(div, action) {
        var options = $.data(div, formName).options;
        var paraLoginInfo = getParaLoginInfo(div);
        var parameters = $.extend({}, paraLoginInfo, {
            serviceType: { type: 'string', value: options.serviceType }
        });
        var params = getParameters(riadllName,
            riaClassName,
            'GetCD005',
            JSON.stringify(parameters));
        getServerData(params, {
            success: function (data) {
                deleteJSONObject(parameters);
                deleteJSONObject(params);
                if (data.ResultBoolean == true) {
                    action(data.ResultXML);
                }
                deleteJSONObject(data);
            }
        });
    }

    //新增裝機工單(同區移機功能使用)
    function WipInstallAdd(div, newCustid, action) {
        try {
            var options = $.data(div, formName).options;
            var width = options.container.width();
            var height = $(div).height();
            var objectName = "SO1111A";
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
            var win = createcsWindow(options.container, options.language["title"] + " [" + objectName + "]", winOptions);

            $('#' + win.windowId).on('close', function () {
                try {
                    var roptions = $.data($('#' + win.contentId)[0], objectName).options;
                    var isSaved = roptions.isSaved;
                    var instWipData = JSON.stringify(roptions.wipData);

                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                    deleteJSONObject(inData);
                    action({ isSaved: isSaved, InstWipData: instWipData });
                }
                catch (err) {
                    errorHandle(formName, 'WipInstallAdd_close', err);
                }
            });

            var getInData = (function () {
                var custId = options.custId;
                if (newCustid != null) { custId = newCustid }
                var dsData = {
                    customer: {
                        columns: [{ name: 'CUSTID', type: 'integer' },
                            { name: 'CUSTNAME', type: 'string' },
                            { name: 'SERVCODE', type: 'string' },
                        ],
                        rows: [{
                            CUSTID: custId,
                            CUSTNAME: "無",
                            SERVCODE: options.servCode,
                        }]
                    },
                    install: {
                        columns: [{ name: 'CUSTID', type: 'integer' },
                            { name: 'SNO', type: 'string' },
                            { name: 'SERVICETYPE', type: 'string' }
                        ],
                        rows: [{
                            CUSTID: custId,
                            SNO: "",
                            SERVICETYPE: options.serviceType,
                        }]
                    }
                };
                return dsData;
            });

            //var getCanInstCode = (function (ac) {
            //    //var WipData = realWipData();

            //});

            var inData = getInData();
            getCanInstCode(div, function (r) {
                var WipInstCode = r;
                $('#' + win.contentId)[objectName]({
                    loginInfo: cloneJSON(options.loginInfo),
                    container: $('#' + win.windowId),
                    parameters: cloneJSON(inData),
                    localization: cloneJSON(options.localization),
                    editMode: editMode.append,
                    moveReInstData: cloneJSON(options.wipData),
                    wipCodeValueStr: WipInstCode,
                    isChild: true
                });
            })
        } catch (err) {
            errorHandle(formName, 'WipInstallAdd', err);
        }
    }

    //呼叫同區移機-指定客編功能
    function showReNewInstAddress(div, em, action) {
        try {
            var options = $.data(div, formName).options;
            var width = options.container.width();
            var height = $(div).height();
            var objectName = "SO1113B";
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
            var win = createcsWindow(options.container, options.language["FormChooseAddress"], winOptions);
            var inData = {};
            var ID = options.initData[customerTableName].rows[0]["ID"];
            var addrNo = options.initData[customerTableName].rows[0]["InstAddrNo".toUpperCase()];

            $('#' + win.windowId).on('close', function () {
                try {
                    disableAllControls(options.controls, false, true);
                    var roptions = $.data($('#' + win.contentId)[0], objectName).options;
                    var isSaved = roptions.isSaved;
                    var noCust = roptions.noCust;
                    var returnRow = "";
                    if (isSaved && !noCust) {
                        returnRow = roptions.returnRow.CUSTID;
                    }
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                    deleteJSONObject(inData);
                    //action({ isSaved: isSaved, noCust: noCust, returnRow: returnCustId });
                    action({ isSaved: isSaved, noCust: noCust, returnRow: returnRow });
                }
                catch (err) {
                    errorHandle(formName, 'showReNewInstAddress_close', err);
                }
            });
            disableAllControls(options.controls, true, true);
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: cloneJSON(inData),  //不知道傳甚麼  先傳入空的。
                localization: cloneJSON(options.localization),
                editMode: em,
                serviceType: options.serviceType,
                ID: ID,
                addrNo: addrNo
            });
        }
        catch (err) {
            errorHandle(formName, 'showReNewInstAddress', err);
        }
    };

    function showMoveFaciData(div, em, action) {
        try {
            var options = $.data(div, formName).options;
            var width = 550;
            var height = 200;
            var objectName = "SO1113C";
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
            var getInData = (function () {
                var dsData = {
                    customer: {
                        columns: [{ name: 'CUSTID', type: 'integer' },
                            { name: 'CUSTNAME', type: 'string' },
                            { name: 'SERVCODE', type: 'string' },
                        ],
                        rows: [{
                            CUSTID: options.custId,
                            CUSTNAME: '無',
                            SERVCODE: options.servCode,
                        }]
                    },
                    pr: {
                        columns: [{ name: 'CUSTID', type: 'integer' },
                            { name: 'SNO', type: 'string' },
                            { name: 'SERVICETYPE', type: 'string' }
                        ],
                        rows: [{
                            CUSTID: options.custId,
                            SNO: options.sno,
                            SERVICETYPE: options.serviceType,
                        }]
                    }
                };
            });


            var win = createcsWindow(options.container, options.language["FormPRReasonData"], winOptions);
            var inData = getInData;

            $('#' + win.windowId).on('close', function () {
                try {
                    disableAllControls(options.controls, false, true);
                    var roptions = $.data($('#' + win.contentId)[0], objectName).options;
                    var isSaved = roptions.isSaved;
                    var returnDT = "";
                    if (isSaved) {
                        returnDT = JSON.stringify(roptions.returnData);
                    }
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                    deleteJSONObject(inData);
                    action({ isSaved: isSaved, returnDT: returnDT });
                }
                catch (err) {
                    errorHandle(formName, 'showMoveFaciData_close', err);
                }
            });
            disableAllControls(options.controls, true, true);
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: cloneJSON(inData),
                localization: cloneJSON(options.localization),
                editMode: em,
                serviceType: options.serviceType,
                custId: options.custId
            });
        } catch (err) {
            errorHandle(formName, 'showMoveFaciData', err);
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

            var shouldReg = false;
            var WipInstData = "";
            var MoveFaciData = "";

            var CheckIsDataOK = (function (ac) {
                //呼叫SAVE 
                var WipData = realWipData();
                var paraLoginInfo = getParaLoginInfo(div);
                var parameters = $.extend({}, paraLoginInfo, {
                    editMode: { type: 'integer', value: options.editMode },
                    dsWipData: { type: 'string', value: WipData },
                    shouldReg: { type: 'boolean', value: shouldReg }
                });
                var params = getParameters(riadllName,
                    riaClassName,
                    'ChkDataOk',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        //deleteJSONObject(tData);
                        if (data.ResultBoolean == true) {
                            ac({ RetFlag: true });
                        }
                        else {
                            ac({ RetFlag: false, RetCode: data.ErrorCode, RetMsg: data.ErrorMessage });
                        }
                    }
                });
            });

            var realWipData = (function () {
                //取得工單相關資料
                var tData = cloneJSON(options.wipData);
                if (options.parameters[contactTableName] != null) {
                    tData[contactTableName] = cloneJSON(options.parameters[contactTableName]);
                }
                if (options.close != null && options.close[closeProductTableName] != null) {
                    tData[closeProductTableName] = cloneJSON(options.close[closeProductTableName]);
                }
                return JSON.stringify(tData);
            });
            var saveProcess = (function (ac) {
                //呼叫SAVE 
                var WipData = realWipData();
                var paraLoginInfo = getParaLoginInfo(div);
                var parameters = $.extend({}, paraLoginInfo, {
                    editMode: { type: 'integer', value: options.editMode },
                    shouldReg: { type: 'boolean', value: shouldReg },
                    dsWipData: { type: 'string', value: WipData },
                    WipInstData: { type: 'string', value: convertToNull(WipInstData) },
                    MoveFaciData: { type: 'string', value: convertToNull(MoveFaciData) }
                });
                var params = getParameters(riadllName,
                    riaClassName,
                    'Save2',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        //deleteJSONObject(tData);
                        if (data.ResultBoolean == true) {
                            ac(true);
                        }
                        else {
                            ac(false, data.ErrorMessage);
                        }
                    }
                });
            });

            var CheckDataOK = (function (ac) {
                //判斷參考號功能
                if (options.editMode == editMode.append) {
                    if (options.serviceType == "C" && options.PRCodeRow.REFNO == 3) {
                        //參考號 3 ,服務別=C 需要輸入連動拆機服務別
                        showMoveFaciData(div, editMode.append, function (r) {
                            if (r.isSaved) {
                                MoveFaciData = r.returnDT;
                                ac(true);
                            } else {
                                ac(false, lang.CancelOtherWipData);
                            }
                        });
                    } else if (options.PRCodeRow.REINSTACROSSFLAG == 2 && (options.PRCodeRow.REFNO == 2 || options.PRCodeRow.REFNO == 5 || options.PRCodeRow.REFNO == 6)) {
                        //參考號 2,5,6 CD007.ReInstAcrossFlag=2 同區移機，需要輸入移入新地址
                        disableAllControls(options.controls, true, true);
                        showReNewInstAddress(div, options.editMode, function (r) {
                            try {
                                if (r.isSaved == true) {
                                    if (r.noCust) {
                                        //沒有選客編，需要呼叫新增客編，再呼叫新增工單(需要傳入新的客編號碼)
                                        CustomerDataAdd(div, function (r) {
                                            if (r.isSaved) {
                                                WipInstallAdd(div, r.returnRow, function (r) {
                                                    if (r.isSaved) {
                                                        WipInstData = r.InstWipData;
                                                        ac(true);
                                                    } else {
                                                        ac(false, lang.UpdInstWipErr);
                                                    }
                                                })
                                            } else {
                                                ac(false, lang.UpdCustErr);
                                            }
                                        })
                                    } else {
                                        //有選客編，直接呼叫新增工單(需傳入指定客編)
                                        WipInstallAdd(div, r.returnRow, function (r) {
                                            if (r.isSaved) {
                                                WipInstData = r.InstWipData;
                                                ac(true);
                                            } else {
                                                ac(false, lang.UpdInstWipErr);
                                            }
                                        })
                                    }
                                } else {
                                    ac(false, lang.ChooseCustDataErr);
                                }
                            }
                            catch (err) {
                                errorHandle(formName, 'showReNewInstAddress', err);
                            }
                            disableAllControls(options.controls, false, true);
                        });
                    } else {
                        ac(true);//最後都沒對應到資料，需要回應 true
                    }
                } else ac(true);
            });
            
            CheckIsDataOK(function (retChk) {
                if (retChk.RetFlag == true) {
                    CheckDataOK(function (isOk, msg) {
                        if (isOk == true) {
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
                        } else {
                            action(false, msg)
                        };
                    });
                }
                else {
                    RetCheckShowData(div, retChk.RetCode);
                    action(false, retChk.RetMsg);
                };
            });


        }
        catch (err) {
            errorHandle(formName, 'save', err);
        }
    };

    function RetCheckShowData(div, retCode, action) {
        //設備檢核錯誤碼    : -10001 ~ -19999
        //拆設備檢核錯誤碼  : -20001 ~ -30000
        //收費檢核錯誤碼    : -30001 ~ -40000
        //指定設備檢核錯誤碼: -40001 ~ -50000
        if (retCode <= -10001 && retCode >= -20000) {
            $('#' + $(div).prop('id') + 'btnSubEdit1').triggerHandler('click');
        } else if (retCode <= -20001 && retCode >= -30000) {

        } else if (retCode <= -30001 && retCode >= -40000) {
            $('#' + $(div).prop('id') + 'btnSubEdit2').triggerHandler('click');
        } else if (retCode <= -40001 && retCode >= -50000) {
            $('#' + $(div).prop('id') + 'btnViewPR').triggerHandler('click');
        };
    };

})(jQuery);