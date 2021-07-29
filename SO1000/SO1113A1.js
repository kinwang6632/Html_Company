(function ($) {
    var formName = 'SO1113A1';
    var riadllName = 'CableSoft.SO.RIA.Wip.PR.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.PR.Web.PR';
    var buttonsHeight = 24; 
    var textHeight = 23;
    var wipTypeName = "PR"; 
    var facilityTableName = "Facility";
    var prFacilityTableName = "PRFacility";
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
                    //cccc(this,options);
                }
                else {
                    $.data(this, formName, {
                        options: $.extend({}, new defaults(), new SO1113A1(), options)
                    });
                    formLoaded(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1113A1', err);
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
        },
        canDelete: function (jq, params, param2) {
            return canDelete(params, param2);
        },
        canPrint: function (jq, params, param2) {
            return canPrint(params, param2);
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
        this.canUseServiceType = "";
        this.canUseRefNoC = "";
        this.canUseRefNoD = "";
        this.canUseRefNoI = "";
        this.canUseRefNoP = "";
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
            var tabHeight = height - buttonsHeight;
            getControlObject(div, "gbxAll").css({ height: buttonsHeight - 4 });
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
            deleteJSONObject(options, formName);
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
    function canDelete(params, action) {
        try {
            var checkPara = checkParameters(editMode.view, params);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX('CanDelete', params, function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
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
            //                    buttonAddHandler(div);
            //                    frmAddHandler(div);
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
            
            options.sno = options.parameters[PR].rows[0]['SNO'];
            
        }
        catch (err) {
            errorHandle(formName, 'setBasicPara', err);
        }
    }
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            var setServiceType = "X";
            changeLanguage(div);
            renderControl(div);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            formResize(div);
            setBasicPara(div);
            if (!isEmpty(options.serviceType)) {
                setServiceType = options.serviceType;
            }

            //取服務別
            getServiceType(div, function (r) {
                try {
                    if (r.ResultBoolean == true) {
                        var rT = JSON.parse(r.ResultXML);
                        options.initData['ServiceType'] = rT[Object.keys(rT)[0]];
                        formResize(div);
                        getSubInitData(div, function (r) {
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
                if (r.ResultBoolean == true) {
                    clearInitData(div);
                    options.initData = $.extend({}, options.initData, JSON.parse(r.ResultXML));
                    clearWipData(div);
                    options.wipData = JSON.parse(r.ResultXML);
                    action(true);
                }
                else {
                    messageBox(r.ErrorMessage);
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
            var parameters = $.extend({}, paraLoginInfo, {
                ServiceType: { type: 'string', value: options.canUseServiceType }
            });
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
                InstCodeValueStr: { type: 'string', value: wipCodeValueStr }
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
            var parameters = $.extend({}, paraLoginInfo, {
                PRCode: { type: 'integer', value: PRCodeRow['CODENO'] },
                ServCode: { type: 'string', value: options.servCode },
                PRMCode: { type: 'integer', value: PRCodeRow['GROUPNO'] },
                ServiceType: { type: 'string', value: options.serviceType },
                ResvTime: { type: 'datetime', value: resvTime },
                AcceptTime: { type: 'datetime', value: acceptTime },
                OldResvTime: { type: 'datetime', value: convertToNull(options.resvTime) },
                Resvdatebefore: { type: 'integer', value: PRCodeRow['Resvdatebefore'.toUpperCase()] },
                WorkUnit: { type: 'decimal', value: workUnit },
                IsBooking: { type: 'boolean', value: true }
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
            
            $(div).css('overflow', 'hidden');
            
            //建立按鈕
            oArray = ['btnSave','btnExit'];
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
            }

            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
             
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //確定
            getControlObject(div, 'btnSave').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                save(div, function (isOk, msg) {
                    var retMessage = "";
                    if (!isOk) {
                        retMessage = lang["DeleteSuccess"];
                    } else {
                        retMessage = msg;
                    }
                    messageBox(retMessage, messageType.critical);
                    options.isSaved = true;
                    $('#' + $(div).prop('id') + 'btnExit').triggerHandler('click');
                })
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

    function close(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                if (options.editMode != editMode.view && options.isSaved != true) {
                    messageBox(lang.sureNoSaveExit, messageType.yesno, null, function (flag) {
                        if (flag == 'yes') {
                            $(options.container).csWindow('close');
                        }
                    });
                }
                else {
                    $(options.container).csWindow('close');
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    }

    function getControlObject(div, name) {
        return $('#' + $(div).prop('id') + name);
    };
    
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

    function save(div, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //fSNo, fCustid, fServiceType
            var saveProcess = (function (ac) {
                var paraLoginInfo = getParaLoginInfo(div);
                var parameters = $.extend({}, paraLoginInfo, {
                    fSNo: { type: 'string', value: options.sno },
                    fCustid: { type: 'integer', value: options.custId },
                    fServiceType: { type: 'string', value: options.serviceType }
                });
                var params = getParameters(riadllName,
                    riaClassName,
                    'VoidData',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        if (data.ResultBoolean == true) {
                            ac(true);
                        }
                        else {
                            ac(false, data.ErrorMessage);
                        }
                    }
                });
            });
            saveProcess(action);
        }
        catch (err) {
            errorHandle(formName, 'save', err);
        }
    };

})(jQuery);