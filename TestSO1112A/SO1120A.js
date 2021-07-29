(function ($) {
    var MainTableName = "Facility";
    var formName = "SO1120A";
    var riadllName = "CableSoft.SO.RIA.Facility.Web.dll";
    var riaClassName = "CableSoft.SO.RIA.Facility.Web.Facility";
    var buttonsHeight = 26;

    var defaults = (function () {
        this.language = {};
        this.returnValue = {};
        this.initData = {};
        this.dtServiceType = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.refNo = 0;
        this.parameters = {};
        this.controls = [];
        this.container = null;
        this.isSaved = false;
        this.isOK = false;
        this.theme = $.jqx.theme;
        this.custid = 0;
        this.seqno = "";
        this.serviceType = "";
        this.ProposerID = "";
        this.isDVR = false;
        this.blnStopFlag = false;
        this.wipData = {};
        this.wipType = 0;
        this.IsAutoClosed = true;
        this.tabSelected = "";
        this.maxLenFaciSNO = 0;
        this.maxLenSmartNO = 0;
    });

    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        setTheme: function (jq, params) {
            return jq.each(function () {
                setTheme(this, params);
            });
        },
        close: function (jq) {
            return jq.each(function () {
                formClosed(this);
            });
        },
        destroy: function (jq) {
            return jq.each(function () {
                formDestroy(this);
            });
        },
        canView: function (jq, params, param2) {
            return canView(params, param2);
        },
        canAppend: function (jq, params, param2) {
            return canAppend(params, param2);
        },
        canEdit: function (jq, params, param2) {
            return canEdit(params, param2);
        },
        canDelete: function (jq, params, param2) {
            return canDelete(params, param2);
        },
        canPrint: function (jq, params, param2) {
            return canPrint(params, param2);
        }
    };

    $.fn.SO1120A = function (method, param, param2) {
        try {
            if (typeof method == 'string') {
                if (methods[method]) {
                    return methods[method](this, param, param2);
                }
                return;
            }
            method = method || {};
            return this.each(function () {
                try {
                    var state = $.data(this, formName);
                    if (state) {
                        $.extend(state.options, method);
                    }
                    else {
                        $.data(this, formName, {
                            options: $.extend({}, new defaults(), new SO1120A(), method)
                        });
                        formLoaded(this);
                    }
                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1120A_each', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1120A', err);
        }
    };

    function setTheme(div, params) {
        var controls = $.data(div, formName).options.controls;
        for (i = 0; i < controls.length; i++) {
            var o = $('#' + $(div).prop('id') + controls[i].name);
            if (o.length > 0) {
                $(o[0])[controls[i].type]({ theme: params });
            }
            //$($(div).find('[data-id=codeno]')[0])
        }
    };

    function setBasicPara(div) {
        try {
            var options = $.data(div, formName).options;
            //判斷 Table 是否存在
            var keyName = "Facility";
            var dtFacility = ChkExistTableName(options.wipData, keyName);
            if (dtFacility == null) return ([false, "table " + keyName + " not exist!!"]);
            
            keyName = "rows";
            var dtFacility = ChkExistTableName(options.wipData["Facility"], keyName);
            if (dtFacility == null) return ([false, "Rows not exist!!"]);

            if (options.wipData['Facility'].rows[0]['CUSTID'] != null) {
                options.custid = options.wipData['Facility'].rows[0]['CUSTID'];
            }            
            if (options.wipData['Facility'].rows[0]['SERVICETYPE'] != null) {
                options.serviceType = options.wipData['Facility'].rows[0]['SERVICETYPE'];
            }

            if (options.editMode == editMode.append) {
                options.seqno = '-1';
            }
            else {
                options.seqno = options.wipData['Facility'].rows[0]['SEQNO'];
            }

            keyName = "Customer";
            var dtCustomer = ChkExistTableName(options.wipData, keyName);
            if (dtCustomer != null) {
                keyName = "rows";
                var dtCustomer = ChkExistTableName(options.wipData["Customer"], keyName);
                if (dtCustomer != null) {
                    if (options.wipData["Customer"].rows.length > 0) {
                        if (options.wipData['Customer'].rows[0]['ID'] != null) {
                            options.ProposerID = options.wipData['Customer'].rows[0]['ID'];
                        }
                    }
                }
            }
            
            return true;
        }
        catch (err) {
            return false;
            errorHandle(formName, 'setBasicPara', err);
        }
    };


    function canAppend(params, action) {
        try{
            var checkPara = checkParameters(editMode.append, params);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX('CanAppend', params, function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canAppend', err);
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
    function canEdit(params, action) {
        try {
            var checkPara = checkParameters(editMode.view, params);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX('CanEdit', params, function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canEdit', err);
        }
    };
    function canDelete(params, action) {
        try {
            var checkPara = checkParameters(editMode.view, params);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX2('CanDelete2', params, function (d) {
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
            var Facility = ChkExistTableName(data, MainTableName);
            var inWipType = 0;
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var WipSNO = 0;
            var WipType = "";
            if (data.wipType != null) { inWipType = data.wipType }
            if (inWipType > 0) {
                WipSNO = 1;
                switch (inWipType) {
                    case 1:
                        WipType = "I";
                        break;
                    case 2:
                        WipType = "M";
                        break;
                    case 3:
                        WipType = "P";
                        break;
                }
            };
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                isWipSNO: { type: 'Integer', value: WipSNO },
                isWipType: { type: 'string', value: WipType }
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
    function checkCanXX2(method, data, action) {
        try {
            var Facility = ChkExistTableName(data, MainTableName);
            var inWipType = 0;
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var WipSNO = 0;
            var WipType = "";
            if (Facility != null) {
                Facility = JSON.stringify({Facility:cloneJSON(data[MainTableName])})
            }
            if (data.wipType != null) { inWipType = data.wipType }
            if (inWipType > 0) {
                WipSNO = 1;
                switch (inWipType) {
                    case 1:
                        WipType = "I";
                        break;
                    case 2:
                        WipType = "M";
                        break;
                    case 3:
                        WipType = "P";
                        break;
                }
            };
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                isWipSNO: { type: 'Integer', value: WipSNO },
                isWipType: { type: 'string', value: WipType },
                Facility: { type: 'string', value: Facility }
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
            errorHandle(formName, 'checkCanXX2', err);
        }
    }
    //檢核參數是否正確
    function checkParameters(em, data) {
        try {
            //檢核table 存不存在
            var table = ChkExistTableName(data, MainTableName);
            if (table == null) return ([false, "table "+MainTableName+" not exist!!"]);
            //檢核欄位存不存在
            var checkCols = ['', '', ''];
            //檢核客戶編號
            if (data[table].rows[0]['CustId'.toUpperCase()] == null) {
                return ([false, 'column custid not exist!!']);
            }
            //非新增模式 需要檢核 ServiceType,SEQNO
            if (em != editMode.append) {  
                if (data[table].rows[0]['ServiceType'.toUpperCase()] == null) {
                    return ([false, 'column serviceType not exist!!']);
                }
                if (data[table].rows[0]['SEQNO'.toUpperCase()] == null) {
                    return ([false, 'column SEQNO not exist!!']);
                }
            }            
            return ([true]);
        }
        catch (err) {
            errorHandle(formName, 'checkParameters', err);
        }
    };
    function ChkExistTableName(data, parmName) {
        try {
            var keys = Object.keys(data);
            var kLengths = keys.length
            var table;
            //檢核table 存不存在
            for (var i = 0 ; i < kLengths; i++) {
                if (keys[i].toUpperCase() == parmName.toUpperCase()) {
                    table = keys[i];
                    break;
                }
            }
            if (table == null) return;
            return table
        }
        catch (err) {
            errorHandle(formName, 'getWipTableName', err);
        }
    }
    function formResize(div, params) {
        try {
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            var controls = options.controls;
            for (var i = 0; i < controls.length; i++) {
                if (controls[i].type.indexOf('jqxSplitter') >= 0) {
                    var o = $('#' + controls[i].name);
                    $(o)[controls[i].type]({ 'height': $(div).height() - buttonsHeight - 4 });
                    var height = getControlObject(div, 'gbxSpBottom').height() - buttonsHeight - 5;
                    getControlObject(div, 'gFacility').jqxGrid({ height: height });
                    getControlObject(div, 'gCharge').jqxGrid({ height: height });
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
            for (j = 3; j >= 0; j--) {
                for (i = 0; i < controls.length; i++) {
                    if (controls[i].level == j) {
                        var o = $('#' + $(div).prop('id') + controls[i].name);
                        if (o.length > 0) {
                            //if (controls[i].type == 'jqxButton') {
                            $(o[0]).off();
                            //}
                            $(o[0])[controls[i].type]('destroy');
                        }
                    }
                    //$($(div).find('[data-id=codeno]')[0])
                }
            }
            var options = $.data(div, formName).options;
            options.length = 0;
            options = null;
            delete options;
            $.data(div, formName, null);
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };

    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close');
    };

    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            // options.loginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            $.ajax({
                url: 'SO1000\\' + formName + '.html',
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        formDisplay(div, false);
                        changeElementId(div);
                        init(div, function () {
                            HandlerAdd_List(div);
                            HandlerAdd_button(div);
                            HandlerAdd_Tabs(div);
                            formDisplay(div, true);
                            $(div).trigger('loaded');
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'getData', err);
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

    function getControlObject(div, name) {
        return $('#' + $(div).prop('id') + name);
    };

    function getFaciMateriel(div, FaciRefNo, FaciSNO, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'GetFaciMateriel',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ErrorCode == 0) {
                        var rT = JSON.parse(data.ResultXML);
                        if (rT.table.rows.length > 0) {
                            var row = rT.table.rows[0]
                            getControlObject(div, "txtboxMac").jqxInput('val', row["BoxMac".toUpperCase()]);
                        };
                    };
                    action(true);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getFaciMateriel', err);
        }
    };

    function getServiceType(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'GetServiceType',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ErrorCode == 0) {
                        var rT = JSON.parse(data.ResultXML);
                        options.dtServiceType['ServiceType'] = rT[Object.keys(rT)[0]];
                        readerPushcsList(div, ["csServiceType"], [20], [160], [50], [5], 1);
                        getControlObject(div, 'csServiceType').csList('source', options.dtServiceType['ServiceType'].rows);
                    }
                    action(true);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getServiceType', err);
        }
    };


    function init(div, action) {
        changeLanguage(div);

        //$(options.container).on('resize', function () {
        //    formResize(div);
        //});
        //getServCode(div, function (r) {
        //    initServCode(div);
        //    action();
        //});
        var checkBasicPara = setBasicPara(div);
        if (checkBasicPara[0] == false) {
            action(checkPara);
        }

        //取服務別
        getServiceType(div, function (ret) {
            try {
                if (ret) {
                    renderControl(div);
                    initAllData(div, function (r) {
                        if (r) {
                            if (!isEmpty( $.data(div, formName).options.serviceType)) {
                                getControlObject(div, "csServiceType").csList('codeNo', $.data(div, formName).options.serviceType);
                                getControlObject(div, "csServiceType").csList('disabled', true);
                            } else {
                                getControlObject(div, "csServiceType").csList('disabled', false);
                            }
                            action(true);
                        };                        
                    });
                }
            }
            catch(err){
                errorHandle(formName, 'init_getServiceType', err);
            }
        });
        
    };

    function initAllData(div, action) {
        try{
            //取回設備資料
            getAllData(div, function (r) {
                if (r) {
                    loadPage(div,1)
                    initcsListData(div);
                    DefaultTabs(div);
                    changeMode(div, $.data(div, formName).options.editMode);
                    action(true);
                }
                else {
                    messageBox(r.ErrorMessage);
                    action(false);
                }
                delete r;
            });
        }
        catch (err) {
            errorHandle(formName, 'initAllData', err);
        }
    }

    function getAllData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            //GetAllSeting(_LoginInfo, lngCustid, ProposerID, ServiceType, blnStopFlag, (_RefNo = 9), SeqNo)
            var parameters = $.extend({}, paraLoginInfo, {
                lngCustId: { type: 'string', value: options.custid },
                ProposerID: { type: 'string', value: options.ProposerID },
                ServiceType: { type: 'string', value: options.serviceType },
                blnStopFlag: { type: 'boolean', value: options.blnStopFlag },
                blnIsDVR: { type: 'boolean', value: options.isDVR },
                SeqNo: { type: 'string', value: options.seqno }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetAllSeting',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    if (data.ErrorCode == 0) {
                        options.initData = 0;
                        options.initData = null;
                        delete options.initData;
                        options.initData = JSON.parse(data.ResultXML);
                        if (options.wipType > 0 & options.editMode != editMode.append) {
                            //清除 Facility
                            var table = ChkExistTableName(options.initData, MainTableName);
                            if (table != null) {
                                options.initData[MainTableName] = 0;
                                options.initData[MainTableName] = null;
                                delete options.initData[MainTableName];
                            }
                            //清除 Facility_Old
                            var table = ChkExistTableName(options.initData, MainTableName + "_Old");
                            if (table != null) {
                                options.initData[MainTableName + "_Old"] = 0;
                                options.initData[MainTableName + "_Old"] = null;
                                delete options.initData[MainTableName + "_Old"];
                            }
                            //建立 WinData傳入的設備資料
                            var table = ChkExistTableName(options.wipData, MainTableName);
                            if (table != null) {
                                var tmp = cloneDataTable(options.wipData, MainTableName, 0, true);
                                options.initData[MainTableName] = cloneJSON(tmp[MainTableName])
                                options.initData[MainTableName + "_Old"] = cloneJSON(tmp[MainTableName])
                            } 
                        }
                        action(true);
                    }
                    else {
                        messageBox(data.ErrorMessage, messageType.critical);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getAllData', err);
        }
    };

    function loadPage(div, tabIndex) {
        try {
            var options = $.data(div, formName).options;
            var tabTitles = options.language.tabCaptions;
            var iId = $(div).prop('id') + "TabControl1";
            var caption = $('#' + iId).csTabs('getTitleAt', tabIndex - 1);
            var i = tabTitles.indexOf(caption);
            var subLoopID = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B"];
            if (options.tabSelected.indexOf("," + subLoopID[i]) < 0) {
                options.tabSelected = options.tabSelected + "," + subLoopID[i];
            }
            var subID = $(div).prop('id') + "subTabs" + subLoopID[i];
            $('#' + subID)['SO1120A' + subLoopID[i]]({
                initData: options.initData,
                loginInfo: options.loginInfo,
                editMode: options.editMode
            });
        } catch (err) { errorHandle(formName, 'getAllData', err); }
    }

    function HandlerAdd_Tabs(div) {
        try {
            getControlObject(div, "TabControl1").on('selected', function (event) {
                var pageIndex = event.args.item + 1;
                loadPage(div,pageIndex)
            });
        } catch (err) { errorHandle(formName, 'HandlerAdd_Tabs', err); }
    };
    
    function HandlerAdd_button(div) {
        try {
            var options = $.data(div, formName).options;
            //存檔
            getControlObject(div, 'btnSave').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                save(div, function (isOk, msg) {
                    if (!isOk) {
                        messageBox(msg, messageType.critical);
                        return;
                    }
                    options.isSaved = true;
                    //自對關閉視窗
                    if (options.IsAutoClosed) {
                        $('#' + $(div).prop('id') + 'btnExit').triggerHandler('click');
                    };
                })
            });

            //修改
            getControlObject(div, 'btnEdit').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                options.editMode = 1;
                changeMode(div, options.editMode);
                //getControlObject(div, "subTabs1").SO1120A1("changeEditMode", options.editMode);
                var iId = $(div).prop('id') + "TabControl1";
                var selectedItem = $('#' + iId).csTabs('selectedItem');
                var caption = $('#' + iId).csTabs('getTitleAt', selectedItem);
                var i = options.language.tabCaptions.indexOf(caption);
                var subLoopID = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B"];
                var subID = $(div).prop('id') + "subTabs" + subLoopID[i];
                $('#' + subID)['SO1120A' + subLoopID[i]]("changeEditMode", options.editMode);
            });
            //離開
            getControlObject(div, 'btnExit').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                close(div);
            });
        }
        catch (err) {
            errorHandle(formName, 'HandlerAdd_button', err);
        }
    };

    //委派csList 事件
    function HandlerAdd_List(div) {
        try {
            //服務別
            csServiceType_selectedIndexChanged(div);
            //設備種類
            csFaciCode_selectedIndexChanged(div);
            //介紹媒介
            //csMediaCode_selectedIndexChanged(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'HandlerAdd_List', err);
        }
    }

    //服務別selectedIndexChanged
    function csServiceType_selectedIndexChanged(div) {
        getControlObject(div, 'csServiceType').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                options.serviceType = getControlObject(div, 'csServiceType').csList('codeNo');
                //disableAll(div, true);
                initAllData(div, function (r) {
                    if (r == true) {
                        //disableAll(div, false);
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'csServiceType_selectedIndexChanged', err);
            }
        });
    };
    //設備種類selectedIndexChanged
    function csFaciCode_selectedIndexChanged(div) {
        getControlObject(div, 'csFaciCode').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var selItem = getControlObject(div, 'csFaciCode').csList('selectedItem');
                if (!isEmpty(selItem.DEFBUYCODE)) {
                    getControlObject(div, "csBuyCode").csList('codeNo', selItem.DEFBUYCODE);
                };
                if (!isEmpty(selItem.SNOLENGTH)) {
                    if (selItem.SNOLENGTH > 0) {
                        options.maxLenFaciSNO = selItem.SNOLENGTH;
                    } else { options.maxLenFaciSNO = 20; };
                    if (!isEmpty(selItem.REFNO)) {
                        if (selItem.REFNO == 3) {
                            if (options.initData["FaciCode"].rows.length > 0) {
                                var FaciLength = options.initData["FaciCode"].rows.length;
                                for (i = 0; i < FaciLength; i++) {
                                    var row = options.initData["FaciCode"].rows[i];
                                    if (row["RefNo".toUpperCase()] == 4 & row["SubType".toUpperCase()] == selItem.SUBTYPE) {
                                        options.maxLenSmartNO = row["SnoLength".toUpperCase()];
                                        break;
                                    };
                                };
                            };
                        };
                    };
                };
                if (!isEmpty(selItem.REFNO)) {
                    if (selItem.REFNO == 6) {
                        getControlObject(div, "txtbkFaciSNo").text = options.language.CPNumber;
                    };
                    var FaciSno =getControlObject(div, "txtFaciSNo").val();
                    if (!isEmpty(FaciSno)) {
                        getFaciMateriel(div, selItem.REFNO, FaciSno, function (r) {
                            if (r == true) {
                                //disableAll(div, false);
                            }
                        });
                    };
                };
            }
            catch (err) {
                errorHandle(formName, 'csServiceType_selectedIndexChanged', err);
            }
        });
    };

    function selectChangeAllTabs(div) {
        try{
            var iId = $(div).prop('id') + "TabControl1";
            var tabLength = $('#' + iId).csTabs('length');
            for (j = 0; j < tabLength; j++) {
                $('#' + iId).csTabs('selectedItem',j);
            };
            $('#' + iId).csTabs('selectedItem', 0);
        }
        catch (err) {
            errorHandle(formName, 'selectChangeAllTabs', err);
        }
    };

    function initcsListData(div) {
        try {
            var options = $.data(div, formName).options;
            //csFaciCode,csModelCode,csBuyCode,csInitPlaceNo,csClassCode1,csClassCode2,csClassCode3
            getControlObject(div, 'csFaciCode').csList('source', options.initData['FaciCode'].rows);
            getControlObject(div, 'csModelCode').csList('source', options.initData['ModelCode'].rows);
            getControlObject(div, 'csBuyCode').csList('source', options.initData['BuyCode'].rows);
            getControlObject(div, 'csInitPlaceNo').csList('source', options.initData['InitPlaceNo'].rows);
            getControlObject(div, 'csClassCode1').csList('source', options.initData['ClassCode1'].rows);
            getControlObject(div, 'csClassCode2').csList('source', options.initData['ClassCode2'].rows);
            getControlObject(div, 'csClassCode3').csList('source', options.initData['ClassCode3'].rows);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initcsListData', err);
        }
    };

    function close(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                if (options.editMode != editMode.view && options.isSaved != true) {
                    messageBox(lang.SureNoSaveExit, messageType.yesno, null, function (flag) {
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


    function DefaultTabs(div, em) {
        try{
            var options = $.data(div, formName).options;
            var tabControlName = "TabControl1";
            var iId = $(div).prop('id') + tabControlName;
            var tablength = $('#' + iId).csTabs('length');
            for (var i = 0 ; i < tablength; i++) {
                $(getControlObject(div, tabControlName).find('ul').find('li')[i]).css('display', 'block');
            }


            switch (options.serviceType) {
                case "C":
                    DisableTabsName(div, tabControlName, 2, false);//CM資訊
                    DisableTabsName(div, tabControlName, 3, false);//DTV資訊
                    DisableTabsName(div, tabControlName, 4, false);//CP資訊
                    DisableTabsName(div, tabControlName, 7, false);//VOD資訊
                    break;
                case "D":
                    DisableTabsName(div, tabControlName, 2, false);//CM資訊
                    DisableTabsName(div, tabControlName, 4, false), false;//CP資訊
                    DisableTabsName(div, tabControlName, 9, false);//電腦設備
                    var initData = options.initData
                    var dtParamater = ChkExistTableName(initData, "Paramater");
                    if (dtParamater != null) {
                        var row = initData["Paramater"].rows[0];
                        if (row["StartVOD".toUpperCase()] == 0) {
                            DisableTabsName(div, tabControlName, 7, false);//VOD資訊
                        }
                    }
                    break;
                case "I":
                    DisableTabsName(div, tabControlName, 3, false);//DTV資訊
                    DisableTabsName(div, tabControlName, 4, false);//CP資訊
                    DisableTabsName(div, tabControlName, 7, false);//VOD資訊
                    break;
                case "P":
                    DisableTabsName(div, tabControlName, 2, false);//CM資訊
                    DisableTabsName(div, tabControlName, 3, false);//DTV資訊
                    DisableTabsName(div, tabControlName, 7, false);//VOD資訊
                    DisableTabsName(div, tabControlName, 9, false);//電腦設備
                    break;
            }
        }
        catch(err){
            errorHandle(formName, 'DefaultTabs', err);
        }
    }

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
                    //newRcd(div);
                    rcdToScr(div);
                    break;
            }
            getControlObject(div, 'lEditMode').jqxInput('val', editText);
            getControlObject(div, 'btnSave').jqxButton({ disabled: flag });
            getControlObject(div, 'btnEdit').jqxButton({ disabled: !flag });
            //"MainRight", "MainRightUp", "MainRight1", "MainRight2"
            disableChildControls(div, getControlObject(div, 'MainLeft'), options.controls, flag);
            disableChildControls(div, getControlObject(div, 'MainRightUp'), options.controls, flag);
            disableChildControls(div, getControlObject(div, 'MainRight1'), options.controls, flag);
            disableChildControls(div, getControlObject(div, 'MainRight2'), options.controls, flag);
        }
        catch (err) {
            errorHandle(formName, 'changeMode', err);
        }
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

    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        var arrays = ['txtbkServiceType', 'txtbkFaciCode', 'txtbkFaciSNo', 'txtbkSmartCardNo', 'txtbkDVRNo',
            'txtbkModelCode', 'txtbkPinCode', 'txtbkFaciNo', 'txtbkFaciStatus', 'txtbkWipStatus',
            'txtbkBoxMac', 'txtbkReFaciSNo', 'txtbkBuyCode', 'txtbkDueDate', 'txtFaciAccessory',
            'txtbkInitPlaceNo', 'txtbkClassCode1', 'txtbkClassCode2', 'txtbkClassCode3', 'ccCustAttribute',
            'txtbkNote'];
        $.each(arrays, function (idx, val) {
            $('#' + $(div).prop('id') + val).text(lang[val]);
        });
        //alert(JSON.stringify($.data(div, formName).options.language));
    };

    function readerPushTabs(div, nameArray, oHightArray, oWidthArray, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        for (var i = 0 ; i < nameArray.length; i++) {
            if (nameArray[i] != "") {
                var iId = $(div).prop('id') + nameArray[i];
                getControlObject(div, nameArray[i]).csTabs({
                    theme: options.theme,
                    position: 'top',
                    height: oHightArray[i],
                    width: oWidthArray[i]
                });
                var tabTitles = options.language.tabCaptions;
                for (var j = 0; j < tabTitles.length; j++) {
                    $('#' + iId).csTabs('setTitleAt', j, tabTitles[j]);
                }
                //for (var j = 1; j <= 10; j++) {
                //    var subLoopID = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B"];
                //    var subID = $(div).prop('id') + "subTabs" + subLoopID[j];
                //    $('#' + subID)['SO1120A' + subLoopID[j]]({
                //        initData: options.initData,
                //    });
                //}
                controls.push({ name: iId, type: 'jqxTabs', level: levelno });
            }
        }
    };

    function readerPushPanel(div, nameArray, oHightArray, oWidthArray, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        for (var i = 0 ; i < nameArray.length; i++) {
            var iId = $(div).prop('id') + nameArray[i];
            getControlObject(div, nameArray[i]).jqxPanel({
                theme: options.theme,
                height: oHightArray[i],
                width: oWidthArray[i],
                autoUpdate: true
            });
            controls.push({ name: iId, type: 'jqxPanel', level: 0 });
            //2016.11.04 Jakcy跟我說這個隱藏卷軸的功能有BUG不要用
            //var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
            //for (var j = 0; j < scrollBars.length; j++) {
            //    if ($('#' + iId + scrollBars[j]).length > 0) {
            //        $('#' + iId + scrollBars[j]).remove();
            //    }
            //}
        }
    }

    function readerPushInput(div, nameArray, oHightArray, oWidthArray, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        for (var i = 0 ; i < nameArray.length; i++) {
            if (nameArray[i] != "") {
                var iId = $(div).prop('id') + nameArray[i];
                getControlObject(div, nameArray[i]).jqxInput({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'jqxInput', level: levelno });
            }
        }
    };

    function readerPushCheckBox(div, nameArray, oHightArray, oWidthArray, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        for (var i = 0 ; i < nameArray.length; i++) {
            if (nameArray[i] != "") {
                var iId = $(div).prop('id') + nameArray[i];
                getControlObject(div, nameArray[i]).jqxCheckBox({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'jqxInput', level: levelno });
            }
        }
    };

    function readerPushDropDownList(div, nameArray, oHightArray, oWidthArray, countries, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var iId = $(div).prop('id') + nameArray;
        getControlObject(div, nameArray).jqxDropDownList({
            //theme: options.theme,
            selectedIndex: 0,
            source: countries,
            height: oHightArray,
            width: oWidthArray
        });
        controls.push({ name: iId, type: 'DropDownList', level: levelno });
    };

    function readerPushcsList(div, nameArray, oHightArray, oWidthArray, oCodeNoWidth, oMaxLength, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        for (var i = 0 ; i < nameArray.length; i++) {
            if (nameArray[i] != "") {
                var iId = $(div).prop('id') + nameArray[i];
                getControlObject(div, nameArray[i]).csList({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    codeNoWidth: oCodeNoWidth[i]
                    //maxLength: oMaxLength[i],
                    //autoUpdate: true
                });
                controls.push({ name: iId, type: 'csList', level: levelno });
            }
        }
    };

    function readerPushDateTime(div, nameArray, oHightArray, oWidthArray, oFormatStreem, oDisabled, oShowButton, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        for (var i = 0 ; i < nameArray.length; i++) {
            if (nameArray[i] != "") {
                var iId = $(div).prop('id') + nameArray[i];
                var oDisable = false;
                var oShowCalendarButton = false;
                var setFS = "yyyy/MM/dd HH:mm";
                switch (oFormatStreem[i]) {
                    case "HM":
                        setFS = "HH:mm";
                        break;
                    case "YMD":
                        setFS = "yyyy/MM/dd";
                        break;
                }
                if (oDisabled[i] == 'T') {
                    oDisable = true;
                };
                if (oShowButton[i] == 'T') {
                    oShowCalendarButton = true;
                };
                getControlObject(div, nameArray[i]).csDateTime({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    formatString: setFS,
                    disabled: oDisable,
                    showCalendarButton: oShowCalendarButton,
                    value: null
                });
                controls.push({ name: iId, type: 'csDateTime', level: levelno });
            }
        }
    };

    function DisableTabsName(div, ControlName, tabindex,isRemove) {
        try{
            var options = $.data(div, formName).options;
            var tabTitles = options.language.tabCaptions;
            var tabName = tabTitles[tabindex];
            var iId = $(div).prop('id') + ControlName;
            var tablength = $('#' + iId).csTabs('length');

            var tabIndex = -1;
            var caption = '';
            var j = 0;
            while (j < tablength) {
                caption = $('#' + iId).csTabs('getTitleAt', j);
                if (tabName == caption) {
                    tabIndex = j;
                    j = tablength;
                }
                j += 1;
            }
            if (tabIndex > 0) {
                if (isRemove) {
                    getControlObject(div, ControlName).jqxTabs('removeAt', tabIndex);
                } else {
                    $(getControlObject(div, ControlName).find('ul').find('li')[tabIndex]).css('display', 'none');
                };
            };
        } catch (err) {
            errorHandle(formName, 'DisableTabsName', err);
        }
    };

    function renderControl(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var lang = options.language;
            var height = $(div).innerHeight();


            //建立Panel
            var nameArray = ["MainControl", "GroupTable", "MainLeft", "MainRight", "MainRightUp", "MainRight1", "MainRight2"];
            var oHightArray = [215, 230, 205, 205, 30, 160, 160];
            var oWidthArray = ["100%", "99%", "33%", "67%", "100%", "100%", "100%"];
            //oHightArray = "310,240,300,300,100,160,160";
            //oWidthArray = "100%,100%,33%,67%,100%,100%,100%";
            readerPushPanel(div, nameArray, oHightArray, oWidthArray, 0)

            nameArray = ["TabControl1"]
            oHightArray = [200]
            oWidthArray = ["99%"]
            readerPushTabs(div, nameArray, oHightArray, oWidthArray, 0)
            DisableTabsName(div, "TabControl1", 3, true);//DTV資訊
            DisableTabsName(div, "TabControl1", 5, true);//帳號發票
            DisableTabsName(div, "TabControl1", 7, true);//VOD資訊
            DisableTabsName(div, "TabControl1", 8, true);//數位證件
            
            //建立csList
            nameArray = ["csFaciCode", "csModelCode", "csBuyCode", "csInitPlaceNo", "csClassCode1", "csClassCode2", "csClassCode3"];
            oHightArray = [20, 20, 20, 20, 20, 20, 20];
            oWidthArray = [160, 160, 160, 160, 160, 160, 160];
            var oCodeNoWidth = [50, 50, 50, 50, 50, 50, 50];
            var oMaxLength = [5, 5, 5, 5, 5, 5, 5];
            readerPushcsList(div, nameArray, oHightArray, oWidthArray, oCodeNoWidth, oMaxLength, 1);
            

            //建立Input
            nameArray = ["txtFaciSNo", "txtSmartCardNo", "txtDVRNo", "txtPinCode", "txtFaciID", "txtboxMac", "txtReFaciSNo", "metFaciAccessory", "txtNote", "txtbkFaciStatus2", "txtbkWipStatus2", "txtbkOpenStatus2"];
            oHightArray = [20, 20, 20, 20, 20, 20, 20, 20, 50, 20, 20, 20];
            oWidthArray = [160, 160, 160, 160, 80, 160, 160, 160, 160, 70, 40, 40];
            readerPushInput(div, nameArray, oHightArray, oWidthArray, 1)

            //建立csDateTime
            nameArray = ["dteDueDate"];
            oHightArray = [20];
            oWidthArray = [130];
            var oFormatStreem = [];
            var oDisabled = [];
            var oShowButton = [];
            readerPushDateTime(div, nameArray, oHightArray, oWidthArray, oFormatStreem, oDisabled, oShowButton, 1)

            //建立顯示模式
            getControlObject(div, 'lEditMode').jqxInput({
                theme: options.theme, width: 60, height: buttonsHeight - 2, disabled: true
            });
            controls.push({ name: $(div).prop('id') + 'lEditMode', type: 'jqxInput', level: 1 });

            //建立按鈕
            oArray = ['btnSave', 'btnEdit', 'btnExit'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var text = lang[oArray[i]];
                switch (oArray[i]) {
                    case "btnSave":
                        img = imageScr.save;
                        break;
                    case "btnEdit":
                        img = imageScr.edit;
                        break;
                    case "btnExit":
                        img = imageScr.exit;
                        break;
                    default:
                }
                o.text(text);
                o.jqxButton($.extend({}, img, imagePosition, {
                    theme: options.theme,
                    width: width,
                    height: 24
                }));
                controls.push({ name: bId, type: 'jqxButton', level: 1 });
            }
            //增加事件
            //addControlHandler(div);
            //處理GRID 畫面資料
            //renderGrid(div);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };

    function getShowControlData(div, controlType, controlName, tableName, dataName, rowIndex) {
        var row = $.data(div, formName).options.initData[tableName].rows[rowIndex];
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
                        break;
                    case 'csDateTime'.toUpperCase():
                        getControlObject(div, controlName).csDateTime('setDate', row[dataName.toUpperCase()]);
                        break;
                    case 'jqxCheckBox'.toUpperCase():
                        getControlObject(div, controlName).jqxCheckBox('val', row[dataName.toUpperCase()] == 1);
                        break;
                    case 'DropDownList'.toUpperCase():
                        getControlObject(div, controlName).jqxDropDownList('selectItem', row[dataName.toUpperCase()]);
                        break;
                    case "".toUpperCase():

                        break;
                }
            }
        }
    };

    function getFacilityIndex(div) {
        try {
            var options = $.data(div, formName).options;
            var rowIndex = 0;
            var rowLen = options.initData[MainTableName].rows.length;
            if (rowLen > 1) {
                for (var i = 0 ; i < rowLen; i++) {
                    if (options.initData[MainTableName].rows[i]["SEQNO"] == options.seqno) {
                        rowIndex = i;
                        break;
                    }
                }
            }
            return rowIndex
        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    }
    

    function rcdToScr(div) {
        try {
            var options = $.data(div, formName).options;
            var rowIndex = getFacilityIndex(div);
            
            //一般控制項 直接取資料就在畫面上
            //txtFaciSNo,txtSmartCardNo,txtDVRNo,txtPinCode,txtFaciID,txtboxMac,txtReFaciSNo,metFaciAccessory,txtNote,txtbkFaciStatus2,txtbkWipStatus2,txtbkOpenStatus2
            getShowControlData(div, 'jqxInput', 'txtFaciSNo', 'Facility', 'FaciSNo', rowIndex)
            getShowControlData(div, 'jqxInput', 'txtSmartCardNo', 'Facility', 'SmartCardNo', rowIndex)
            getShowControlData(div, 'jqxInput', 'txtDVRNo', 'Facility', 'DVRNo', rowIndex)
            getShowControlData(div, 'jqxInput', 'txtPinCode', 'Facility', 'PinCode', rowIndex)
            getShowControlData(div, 'jqxInput', 'txtFaciID', 'Facility', 'FaciID', rowIndex)
            getShowControlData(div, 'jqxInput', 'txtboxMac', 'Facility', 'boxMac', rowIndex)
            getShowControlData(div, 'jqxInput', 'txtReFaciSNo', 'Facility', 'ReFaciSNo', rowIndex)
            getShowControlData(div, 'jqxInput', 'metFaciAccessory', 'Facility', 'FaciAccessory', rowIndex)
            getShowControlData(div, 'jqxInput', 'txtNote', 'Facility', 'Note', rowIndex)
            getShowControlData(div, 'jqxInput', 'txtbkFaciStatus2', 'FaciStatus', 'FaciStatus', rowIndex)
            getShowControlData(div, 'jqxInput', 'txtbkWipStatus2', 'FaciStatus', 'FaciCommandStatus', rowIndex)
            getShowControlData(div, 'jqxInput', 'txtbkOpenStatus2', 'FaciStatus', 'FaciWipStatus', rowIndex)

            //csFaciCode,csModelCode,csBuyCode,csInitPlaceNo,csClassCode1,csClassCode2,csClassCode3
            getShowControlData(div, 'csList', 'csFaciCode', 'Facility', 'FaciCode', rowIndex)
            getShowControlData(div, 'csList', 'csModelCode', 'Facility', 'ModelCode', rowIndex)
            getShowControlData(div, 'csList', 'csBuyCode', 'Facility', 'BuyCode', rowIndex)
            getShowControlData(div, 'csList', 'csInitPlaceNo', 'Facility', 'InitPlaceNo', rowIndex)
            getShowControlData(div, 'csList', 'csClassCode1', 'Facility', 'ClassCode1', rowIndex)
            getShowControlData(div, 'csList', 'csClassCode2', 'Facility', 'ClassCode2', rowIndex)
            getShowControlData(div, 'csList', 'csClassCode3', 'Facility', 'ClassCode3', rowIndex)

            //options.serviceType = row['ServiceType'.toUpperCase()];
            //options.custId = row['custId'.toUpperCase()];

        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    };

    function scrToRcd(div) {
        try {
            var options = $.data(div, formName).options;
            var loginInfoRow = options.loginInfo.loginInfo.rows[0];
            var row = {};
            if (options.editMode == editMode.append ) {
                options.initData['Facility'].rows.push(row);
                row["CustId".toUpperCase()] = options.custid;
                row["ServiceType".toUpperCase()] = options.serviceType;
                row["CompCode".toUpperCase()] = loginInfoRow["compcode"];
                if (options.wipType > 0) { row["SeqNo".toUpperCase()] = options.seqno };
            }
            else {
                var rowIndex = getFacilityIndex(div);
                row = options.initData['Facility'].rows[rowIndex];
            }

            row["FaciSNO".toUpperCase()] = convertToNull(getControlObject(div, 'txtFaciSNo').val());
            row["SmartCardNo".toUpperCase()] = convertToNull(getControlObject(div, 'txtSmartCardNo').val());
            row["DVRNo".toUpperCase()] = convertToNull(getControlObject(div, 'txtDVRNo').val());
            row["PinCode".toUpperCase()] = convertToNull(getControlObject(div, 'txtPinCode').val());
            row["FaciID".toUpperCase()] = convertToNull(getControlObject(div, 'txtFaciID').val());
            row["boxMac".toUpperCase()] = convertToNull(getControlObject(div, 'txtboxMac').val());
            row["ReFaciSNo".toUpperCase()] = convertToNull(getControlObject(div, 'txtReFaciSNo').val());
            row["FaciAccessory".toUpperCase()] = convertToNull(getControlObject(div, 'metFaciAccessory').val());
            row["Note".toUpperCase()] = convertToNull(getControlObject(div, 'txtNote').val());
            row["FaciStatus".toUpperCase()] = convertToNull(getControlObject(div, 'txtbkFaciStatus2').val());
            row["FaciCommandStatus".toUpperCase()] = convertToNull(getControlObject(div, 'txtbkWipStatus2').val());
            row["FaciWipStatus".toUpperCase()] = convertToNull(getControlObject(div, 'txtbkOpenStatus2').val());

            row["ServiceType".toUpperCase()] = convertToNull(getControlObject(div, 'csServiceType').csList('codeNo'));
            row["FaciCode".toUpperCase()] = convertToNull(getControlObject(div, 'csFaciCode').csList('codeNo'));
            row["FaciName".toUpperCase()] = convertToNull(getControlObject(div, 'csFaciCode').csList('description'));
            row["ModelCode".toUpperCase()] = convertToNull(getControlObject(div, 'csModelCode').csList('codeNo'));
            row["ModelName".toUpperCase()] = convertToNull(getControlObject(div, 'csModelCode').csList('description'));
            row["BuyCode".toUpperCase()] = convertToNull(getControlObject(div, 'csBuyCode').csList('codeNo'));
            row["BuyName".toUpperCase()] = convertToNull(getControlObject(div, 'csBuyCode').csList('description'));
            row["InitPlaceNo".toUpperCase()] = convertToNull(getControlObject(div, 'csInitPlaceNo').csList('codeNo'));
            row["ClassCode1".toUpperCase()] = convertToNull(getControlObject(div, 'csClassCode1').csList('codeNo'));
            row["ClassName1".toUpperCase()] = convertToNull(getControlObject(div, 'csClassCode1').csList('description'));
            row["ClassCode2".toUpperCase()] = convertToNull(getControlObject(div, 'csClassCode2').csList('codeNo'));
            row["ClassName2".toUpperCase()] = convertToNull(getControlObject(div, 'csClassCode2').csList('description'));
            row["ClassCode3".toUpperCase()] = convertToNull(getControlObject(div, 'csClassCode3').csList('codeNo'));
            row["ClassName3".toUpperCase()] = convertToNull(getControlObject(div, 'csClassCode3').csList('description'));

            if (scrToRcd_Tabs(div, "TabControl1") == false) {
                return false;
            };

            return true;
        }
        catch (err) {
            errorHandle(formName, 'scrToRcd', err);
        }
    };

    function scrToRcd_Tabs(div,TabControlName) {
        try {
            var blnForLoop = true;
            if (blnForLoop) {
                var options = $.data(div, formName).options;
                if (options.tabSelected.substring(0, 1) == ",") { options.tabSelected = options.tabSelected.substring(1) };
                var aryTabs = options.tabSelected.split(",");
                for (j = 0; j < aryTabs.length ; j++) {
                    var subID = $(div).prop('id') + "subTabs" + aryTabs[j];
                    $('#' + subID)['SO1120A' + aryTabs[j]]("subTabSave");
                };
                //alert(txtShow)
            }
            else {
                var subID = $(div).prop('id') + "subTabs1" ;
                $('#' + subID)['SO1120A1']("subTabSave");
            }
            
            
            return true;
        }
        catch (err) {
            errorHandle(formName, 'scrToRcd', err);
        }
    };

    //必要欄位判斷
    function isDataOk(div) {
        var lang = $.data(div, formName).options.language;
        try {
            //檢核 品名項目
            if (checkUIMustBe(getControlObject(div, 'csFaciCode').csList('codeNo'), lang.FaciName, function () {
                getControlObject(div, 'csFaciCode').csList('focus');
            }) == false) {
                return false;
            }
            //檢核 買賣方式
            if (checkUIMustBe(getControlObject(div, 'csBuyCode').csList('codeNo'), lang.BuyName, function () {
                getControlObject(div, 'csBuyCode').csList('focus');
            }) == false) {
                return false;
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
            return false;
        }
    };

    function save(div, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if (isDataOk(div) == false) {
                action(false);
                return false;
            };
            var data = scrToRcd(div);
            if (data == false) {
                action(false);
                return false;
            };
            var ChkDataOK = (function (r) {
                var paraLoginInfo = getParaLoginInfo(div, formName);
                var dsData = JSON.stringify({ Facility: cloneJSON(options.initData['Facility']), Facility_Old: cloneJSON(options.initData['Facility_Old']) });
                var parameters = $.extend({}, paraLoginInfo, {
                    FacilityRow: {type: 'string', value: dsData},
                    workType: { type: 'integer', value: options.wipType }
                    });
                var params = getParameters(riadllName,
                    riaClassName,
                    'ChkDataOK',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        parameters.length = 0;
                        parameters = null;
                        delete parameters;
                        if (data.ResultBoolean == true) {
                            r(true);
                        }
                        else {
                            r(false, data.ErrorMessage);
                        }
                    }
                });
            });
            var saveProcess = (function (ac) {
                var paraLoginInfo = getParaLoginInfo(div, formName);
                var dsData = JSON.stringify({
                    Facility: cloneJSON(options.initData['Facility']),
                    Facility_Old: cloneJSON(options.initData['Facility_Old'])
                });
                var parameters = $.extend({}, paraLoginInfo, {
                    editMode: { type: 'integer', value: options.editMode },
                    dsData: {type: 'string', value: dsData},
                    FaciRefNo: { type: 'integer', value: options.refNo },
                    wipType: { type: 'integer', value: options.wipType }
                });
                var params = getParameters(riadllName,
                    riaClassName,
                    'Save',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        parameters.length = 0;
                        parameters = null;
                        delete parameters;
                        if (data.ResultBoolean == true) {
                            ac(true);
                        }
                        else {
                            ac(false, data.ErrorMessage);
                        }
                    }
                });
            });

            if (options.wipType == 0) {
                //一般存檔，需要存到資料庫內
                saveProcess(action);
            } else {
                //清除 Facility
                var table = ChkExistTableName(options.wipData, MainTableName);
                if (table != null) {
                    options.wipData[MainTableName] = 0;
                    options.wipData[MainTableName] = null;
                    delete options.wipData[MainTableName];
                }
                //建立 WinData傳入的設備資料
                var table = ChkExistTableName(options.initData, MainTableName);
                if (table != null) {
                    var tmp = cloneDataTable(options.initData, MainTableName, 0, true);
                    options.wipData[MainTableName] = cloneJSON(tmp[MainTableName])
                }
                action(true);
            }
            
            //ChkDataOK(chkOK);
            //if (chkOK == true) {
            //    if (options.wipType == 0) {
            //        //一般存檔，需要存到資料庫內
            //        saveProcess(action);
            //    }
            //    else {
            //        action(true);
            //    }
            //}
            //else {
            //    action(false);
            //}
        }
        catch (err) {
            errorHandle(formName, 'save', err);
        }
    };

    
})(jQuery);

