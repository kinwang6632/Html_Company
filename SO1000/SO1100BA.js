(function ($) {
    var formName = "SO1100BA";
    var riadllName = "CableSoft.SO.RIA.Customer.Edit.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Customer.Edit.Web.Edit";

    var defaults = (function () {
        this.language = {};
        this.returnValue = {};
        this.initData = {};
        this.detailData = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.refNo = 0;
        this.parameters = {};
        this.controls = [];
        this.isSaved = false;
        this.theme = '';
    })
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        setTheme: function (jq, params) {
            return jq.each(function () {
                setTheme(this, params);
            });
        },
        resize: function (jq, params) {
            return jq.each(function () {
                formResize(this, params);
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
            return param2([true, '']);
        },
        canAppend: function (jq, params, param2) {
            return canAppend(params, param2);
        },
        canEdit: function (jq, params, param2, param3) {
            return canEdit(params, param2, param3);
        },
        canDelete: function (jq, params, param2, param3) {
            return canDelete(params, param2, param3);
        },
        canPrint: function (jq, params, param2) {
            return canPrint(params, param2);
        }
    };

    //進入畫面後自動執行
    $.fn.SO1100BA = function (method, param, param2, param3) {
        try {
            if (typeof method == 'string') {
                if (methods[method]) {
                    return methods[method](this, param, param2, param3);
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
                            options: $.extend({}, new defaults(), new SO1100BA(), method)
                        });
                        formLoaded(this);
                    }
                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1100BA_each', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1100BA', err);
        }
    };

    //調整主題以及其他
    function setTheme(div, params) {
        var controls = $.data(div, formName).options.controls;
        for (i = 0; i < controls.length; i++) {
            var o = $('#' + $(div).prop('id') + controls[i].name);
            if (o.length > 0) {
                $(o[0])[controls[i].type]({ theme: params });
            }
        }
    };
    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var msg = "";
            for (var i = 0; i < controls.length; i++) {
                var o = $('#' + controls[i].name);
                o.each(function () {
                    $(this)[controls[i].type]('resize');
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close');
    };
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            destroyControls(controls);
            var options = $.data(div, formName).options;
            deleteJSONObject(options);
            offElementEvents(div);
            $.data(div, formName, null);
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    //新增權限檢核
    function canAppend(data, action) {
        try {
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, paraLoginInfo);
            var params = getParameters(riadllName, riaClassName, 'CanAppend', JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'canAppend', err);
        };
    };
    //修改權限檢核
    function canEdit(data, action) {
        try {
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var customer = ignoreCase(data, 'customer', true);
            var rowData = { CUSTID: null, CUSTSTATUSCODE: ignoreCase(customer.rows[0], 'CUSTSTATUSCODE', true) };
            var ds = toDataSet('Customer', rowData);

            var parameters = $.extend({}, paraLoginInfo, {
                Customer: { type: 'string', value: ds }
            });
            var params = getParameters(riadllName, riaClassName, 'CanEdit', JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'canEdit', err);
        };
    };
    //註銷權限檢核
    function canDelete(data, action) {
        try {
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var customer = ignoreCase(data, 'customer', true);
            var rowData = { CUSTID: ignoreCase(customer.rows[0], 'CUSTID', true), CUSTSTATUSCODE: null };
            var ds = toDataSet('Customer', rowData);

            var parameters = $.extend({}, paraLoginInfo, {
                Customer: { type: 'string', value: ds }
            });
            var params = getParameters(riadllName, riaClassName, 'CanDelete', JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'canDelete', err);
        };
    };
    //列印權限檢核
    function canPrint(data, action) {
        try {
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, paraLoginInfo);
            var params = getParameters(riadllName, riaClassName, 'CanPrint', JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'canPrint', err);
        };
    };

    //初始化
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //設定預設參數
            options.paraLoginInfo = getParaLoginInfo(div, formName);
            options.ID = '';
            options.INSTADDRNO = '';
            options.INSTADDRESS = '';
            options.CUSTID = 0;
            options.INVSEQNO = null;
            options.OLDADDRNO = '';
            options.isShow = false;
            //取得呼叫端參數
            if (options.editMode == editMode.append) {
                options.Customer = ignoreCase(options.parameters, 'Customer', false);
                if (options.parameters[options.Customer] != null && options.parameters[options.Customer] != undefined) {
                    if (options.refNo == 1) {
                        options.ID = '';
                    } else {
                        options.ID = ignoreCase(options.parameters[options.Customer].rows[0], 'ID', true);
                    }; 
                    options.INSTADDRNO = ignoreCase(options.parameters[options.Customer].rows[0], 'INSTADDRNO', true);
                    options.INSTADDRESS = ignoreCase(options.parameters[options.Customer].rows[0], 'INSTADDRESS', true);
                };
            } else if (options.editMode == editMode.edit || options.editMode == editMode.view) {
                options.Customer = ignoreCase(options.parameters, 'Customer', false);
                if (options.parameters[options.Customer] != null && options.parameters[options.Customer] != undefined) {
                    options.CUSTID = ignoreCase(options.parameters[options.Customer].rows[0], 'CUSTID', true);
                } else {
                    messageBox(lang.loadCheck);
                    return;
                };
            };           

            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, options.editMode, function () {
                            $(div).trigger('loaded', [this, options]);
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
    function ignoreCase(SoruceObject, seekName, isRetObjValue) {
        try {
            for (obj in SoruceObject) {
                if (obj.toLowerCase() === seekName.toLowerCase()) {
                    if (isRetObjValue) {
                        return SoruceObject[obj];
                    } else {
                        return obj;
                    };
                };
            };
            return null;
        }
        catch (err) {
            errorHandle(formName, 'ignoreCase', err);
        };
    };
    function init(div, Mode, action) {
        //從Language專案帶入畫面文字
        changeLanguage(div);
        //載入所有jqx控制項
        renderControl(div);
        //取得客戶資訊及可選客戶類別
        getAllLoadedData(div, function (isOk, msg) {
            if (isOk) {
                //載入csList清單
                assignCsListData(div);
                //載入頁面事件
                addHandler(div);
                //判斷頁面模式
                if (Mode == editMode.edit || Mode == editMode.view) {
                    //將明細資料放入控制項
                    rcdToScr(div);
                    //根據頁面模式調整各控制項狀態
                    changeMode(div, Mode);
                    action();
                } else {
                    //由Sequence產生一個新的客戶編號
                    var options = $.data(div, formName).options;
                    if (options.initData.NEWCUSTID != undefined) {
                        options.newCustId = parseInt(options.initData.NEWCUSTID.rows[0].SEQNO);
                    } else {
                        messageBox(options.language.newCustIdCheck);
                        action();
                    };
                    //判斷是否有傳入ID
                    if (options.ID == '' || options.ID == null) {
                        //未傳入ID時,額外呼叫申請人管理專案
                        showProposer(div, function (isOk) {
                            if (isOk) {
                                //根據頁面模式調整各控制項狀態
                                changeMode(div, Mode);
                                action();
                            } else {
                                //關閉視窗
                                options.isSaved = false;
                                $(div).SO1100BA('close');
                                return;
                            };
                        });
                    } else {
                        //有傳入ID時,直接查詢SO137資料
                        if (options.initData.PROPOSER != undefined && options.initData.PROPOSER.rows.length > 0) {
                            options.proposerRow = options.initData.PROPOSER.rows[0];
                            $('#' + $(div).prop('id') + 'txtCustId').val(options.newCustId);
                            $('#' + $(div).prop('id') + 'txtCustName').val(options.proposerRow.DECLARANTNAME);
                            $('#' + $(div).prop('id') + 'gilAddress').csAddress1('addrNo', options.INSTADDRNO);
                            //根據頁面模式調整各控制項狀態
                            changeMode(div, Mode);
                            action();
                        } else {
                            messageBox(options.language.idCheck.replace('{0}', options.ID));
                            //根據頁面模式調整各控制項狀態
                            changeMode(div, Mode);
                            //強制將存檔鍵隱藏
                            $('#' + $(div).prop('id') + 'btnSave').jqxButton({ disabled: true });
                            action();
                        };        
                    };  
                };              
            } else {
                messageBox(msg);
                action();
            };
        });
    };
    //從Language專案帶入畫面文字
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        var idArray = $('*[id^=' + $(div).prop('id') + ']')
        try {
            idArray.each(function (index, value) {
                var idStr = $(value).attr('id');
                if (idStr.replace($(div).prop('id'), "") != "") {
                    if (lang[idStr.replace($(div).prop('id'), "")] != null) {
                        $('#' + idStr).text(lang[idStr.replace($(div).prop('id'), "")]);
                    }
                }
            });
            idArray = [];
            idArray = null;
        }
        catch (err) {
            errorHandle(formName, 'changeLanguage', err);
        }
    };
    //載入所有jqx控制項
    function renderControl(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var lang = options.language;
            var headerId = '#' + $(div).prop('id');

            $(headerId + 'PartA').jqxPanel({ height: '99.8%', width: '99.8%', autoUpdate: true });
            controls.push({ name: $(div).prop('id') + 'PartA', type: 'jqxPanel', level: 0 });

            $(headerId + "txtCustId").jqxInput({ width: '92%', height: '23px', disabled: false });
            controls.push({ name: $(div).prop('id') + 'txtCustId', type: 'jqxInput', level: 1 });
            $(headerId + "txtCustName").jqxInput({ width: '95%', height: '23px', disabled: false });
            controls.push({ name: $(div).prop('id') + 'txtCustName', type: 'jqxInput', level: 1 });
            //$(headerId + 'clClassCode1').csList({
            //    source: null,
            //    codeNoWidth: 40,
            //    width: '97%',
            //    height: '23px',
            //    showColumnHeaders: false,
            //    readOnly: false,
            //    codeNoReadOnly: false,
            //    popupWidth: null,
            //    popupHeight: null,
            //    autoFitAllCols: false,
            //    descriptionReadOnly: false,
            //    columns: [
            //           { text: 'CODENO', datafield: 'CODENO' },
            //           { text: 'DESCRIPTION', datafield: 'DESCRIPTION' }
            //    ]
            //});
            //controls.push({ name: $(div).prop('id') + 'clClassCode', type: 'csList', level: 1 });
            //建立csList
            var oArray = ['clClassCode1', 'clClassCode2', 'clClassCode3'];
            var oWidthArray = ['97%', '97%', '97%'];
            var oCodeWidthArray = [40, 40, 40];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    codeNoWidth: oCodeWidthArray[i],
                    height: 23,
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csList', level: 1 });
            };

            $(headerId + "txtHomeID").jqxInput({ width: '90%', height: '23px', disabled: false });
            controls.push({ name: $(div).prop('id') + 'txtHomeID', type: 'jqxInput', level: 1 });
            $(headerId + 'gilAddress').csAddress1({
                //addrNo: 1035929,
                width: '100%',
                buttonWidth: 80,
                buttonHeight: 23,
                buttonText: lang.gilAddressName,
                loginInfo: cloneJSON(options.loginInfo),
                theme: options.theme,
                editMode: editMode.view,
                filterAreaCode: true,
                edableFilterAreaCode: false
            });
            controls.push({ name: $(div).prop('id') + 'gilAddress', type: 'csAddress1', level: 1 });
            $(headerId + "txtMduId").jqxInput({ width: '95%', height: '23px', disabled: false });
            controls.push({ name: $(div).prop('id') + 'txtMduId', type: 'jqxInput', level: 1 });
            var ctSource = [];
            var ctItem = { 'CODENO': 1, 'DESCRIPTION': lang.chargeTypeItem1 };
            ctSource.push(ctItem);
            ctItem = { 'CODENO': 2, 'DESCRIPTION': lang.chargeTypeItem2 };
            ctSource.push(ctItem);
            ctItem = { 'CODENO': 3, 'DESCRIPTION': lang.chargeTypeItem3 };
            ctSource.push(ctItem);
            //var ctSource = [lang.ChargeTypeItem1, lang.ChargeTypeItem2, lang.ChargeTypeItem3];
            $(headerId + "txtChargeType").jqxDropDownList({ source: ctSource, selectedIndex: 0, valueMember: 'CODENO', displayMember: 'DESCRIPTION', placeHolder: "select..", width: '97.5%', height: '23px' });
            controls.push({ name: $(div).prop('id') + 'txtChargeType', type: 'jqxDropDownList', level: 1 });
            $(headerId + 'txtChargeNote').jqxTextArea({ placeHolder: lang.txtContent, height: '99.8%', width: '99%', minLength: 1 });
            controls.push({ name: $(div).prop('id') + 'txtChargeNote', type: 'jqxTextArea', level: 1 });
            $(headerId + 'txtCustNote').jqxTextArea({ placeHolder: lang.txtContent, height: '99.8%', width: '99%', minLength: 1 });
            controls.push({ name: $(div).prop('id') + 'txtCustNote', type: 'jqxTextArea', level: 1 });
            $(headerId + "txtInitTime").jqxInput({ width: '95%', height: '23px', disabled: false });
            controls.push({ name: $(div).prop('id') + 'txtInitTime', type: 'jqxInput', level: 1 });
            $(headerId + "txtInitUser").jqxInput({ width: '92%', height: '23px', disabled: false });
            controls.push({ name: $(div).prop('id') + 'txtInitUser', type: 'jqxInput', level: 1 });
            $(headerId + "txtUpdTime").jqxInput({ width: '95%', height: '23px', disabled: false });
            controls.push({ name: $(div).prop('id') + 'txtUpdTime', type: 'jqxInput', level: 1 });
            $(headerId + "txtUpdEn").jqxInput({ width: '90%', height: '23px', disabled: false });
            controls.push({ name: $(div).prop('id') + 'txtUpdEn', type: 'jqxInput', level: 1 });
            $(headerId + 'btnSave').jqxButton($.extend({}, imagePosition, { width: 80, imgSrc: imageScr.save.imgSrc, height: 24 }));
            $(headerId + 'btnSave').find('img').css('top', (24 - $(headerId + 'btnSave').find("img").height()) / 2 - 1);
            $(headerId + 'btnSave').find('span').css({ top: 4 });
            controls.push({ name: $(div).prop('id') + 'btnSave', type: 'jqxButton', level: 0 });
            $(headerId + 'btnQuite').jqxButton($.extend({}, imagePosition, { width: 80, imgSrc: imageScr.exit.imgSrc, height: 24 }));
            $(headerId + 'btnQuite').find('img').css('top', (24 - $(headerId + 'btnQuite').find("img").height()) / 2 - 1);
            $(headerId + 'btnQuite').find('span').css({ top: 4 });
            controls.push({ name: $(div).prop('id') + 'btnQuite', type: 'jqxButton', level: 0 });
            //$(headerId + 'txtStatus').jqxInput({ width: '50%', height: 23, disabled: true });
            //controls.push({ name: 'txtStatus', type: 'jqxInput', level: 0 });
            options.level = 1 + 1;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    //載入csList清單
    function assignCsListData(div) {
        try {
            var initData = $.data(div, formName).options.initData;

            if (initData.CLASSCODE != undefined) {
                $('#' + $(div).prop('id') + "clClassCode1").csList('source', initData.CLASSCODE.rows);
                $('#' + $(div).prop('id') + "clClassCode2").csList('source', initData.CLASSCODE.rows);
                $('#' + $(div).prop('id') + "clClassCode3").csList('source', initData.CLASSCODE.rows);
                //新增時,自動代客戶類別的預設值
                var options = $.data(div, formName).options;
                if (options.editMode == editMode.append && initData.CMCODE != undefined) {
                    $('#' + $(div).prop('id') + 'clClassCode1').csList('codeNo', initData.CMCODE.rows[0].CLASSCODE);
                };
            }
        }
        catch (err) {
            errorHandle(formName, 'assignCsListData', err);
        };
    };

    //取得客戶資訊及可選客戶類別
    function getAllLoadedData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var parameters = $.extend({}, cloneJSON(options.paraLoginInfo), {
                EditMode: { type: 'integer', value: options.editMode },
                CustId: { type: 'integer', value: options.CUSTID },
                ServiceType: { type: 'string', value: '' },
                ID: { type: 'string', value: options.ID }
            });
            var params = getParameters(riadllName, riaClassName, 'QueryAllLoadedData2', JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    if (data[0].ErrorCode == 0) {
                        options.initData = 0;
                        options.initData = null;
                        delete options.initData;
                        options.initData = JSON.parse(data[0].ResultXML);

                        if (options.editMode == editMode.edit || options.editMode == editMode.view) {
                            if (options.initData.CUSTOMER.rows.length == 0) {
                                action(false, options.language.so001Check);
                            } else {
                                action(true);
                            };
                        } else {
                            action(true);
                        };         
                    }
                    else {
                        action(false, data[0].ErrorMessage);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getAllLoadedData', err);
        };
    };
    //查詢可選發票流水號清單
    function queryInvSeqNoList(div, action) {
        try {
            var options = $.data(div, formName).options;
            var parameters = $.extend({}, cloneJSON(options.paraLoginInfo), {
                ID: { type: 'string', value: options.proposerRow.ID }
            });
            var params = getParameters(riadllName, riaClassName, 'QueryInvSeqNoList', JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ResultBoolean == true) {
                        var tempData = JSON.parse(data.ResultXML);

                        if (options.initData.INVSEQNO != null) {
                            deleteJSONObject(options.initData, 'INVSEQNO');
                        };
                        options.initData.INVSEQNO = cloneJSON(tempData.Table1);

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
            errorHandle(formName, 'queryInvSeqNoList', err);
        }
    };
    //查詢重複裝機地址的客戶清單
    function queryInstAddrNoList(div, addrNo, action) {
        try {
            var options = $.data(div, formName).options;
            var parameters = $.extend({}, cloneJSON(options.paraLoginInfo), {
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
    //執行存檔
    function save(div, addressFlag) {
        try {
            var options = $.data(div, formName).options;
            var data = scrToRcd(div);
            if (data == null) { return; }

            var parameters = $.extend({}, cloneJSON(options.paraLoginInfo), {
                EditMode: { type: 'integer', value: options.editMode },
                Customer: { type: 'string', value: data },
                InvSeqNo: { type: 'integer', value: options.INVSEQNO },
                SeqNo: { type: 'string', value: (convertToNull(options.proposerRow) == null) ? '' : options.proposerRow.SEQNO },
                OldAddrNo: { type: 'string', value: options.OLDADDRNO },
                AddrFlag: { type: 'integer', value: addressFlag }
            });
            var params = getParameters(riadllName, riaClassName, 'Save_HTML5', JSON.stringify(parameters));

            getServerData(params, { 
                success: function (retData) { 
                    if (retData.ErrorCode == 0) {
                        messageBox(retData.ErrorMessage, messageType.information, null, function (flag) {
                            //紀錄回傳值
                            options.newCustID = $('#' + $(div).prop('id') + 'txtCustId').val();
                            options.isSaved = true;
                            //關閉本視窗
                            $(div).SO1100BA('close');
                            return;
                        });
                    }
                    else {
                        messageBox(retData.ErrorMessage);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'save', err);
        }
    };

    //呼叫申請人管理專案
    function showProposer(div, action) {
        try {
            var options = $.data(div, formName).options;
            //組合呼叫申請人管理專案需要的參數
            var dsData = {
                type: 'string',
                Proposer: {
                    columns: [
                        { name: 'CUSTNAME', type: 'string' },
                        { name: 'ID', type: 'string' },
                        { name: 'INSTADDRESS', type: 'string' },
                        { name: 'CUSTID', type: 'integer' }
                    ],
                    rows: [{
                        CUSTNAME: '',
                        ID: '',
                        INSTADDRESS: options.INSTADDRESS,
                        CUSTID: options.newCustId
                    }]
                }
            };
            //呼叫申請人管理專案
            var width = 1000;
            var height = 630;
            if (height > $(options.tabContainer).height() - 80) {
                height = $(options.tabContainer).height() - 80;
            };
            var x = (screen.availWidth - width) / 2;
            var y = (screen.availHeight - height) / 2;
            var winOptions = {
                width: width,
                height: height,
                maxWidth: screen.availWidth,//$(options.container).width(), 
                maxHeight: screen.availHeight,//$(options.container).height(), 
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme,
                haveClosing: true
                //isModal: true
            };
            //Create CSWindow 
            //var win = createcsWindow(options.container, options.language.SO114EATitle, winOptions); 
            var subDivName = 'div' + getUniqueId();
            var subDiv2Name = 'div2' + getUniqueId();
            $('<div id="' + subDivName + '"><div>' + options.language.SO114EATitle + '</div><div id="' + subDiv2Name + '"></div></div>').appendTo('body');
            var subDiv = $('#' + subDivName);
            $(subDiv).csWindow(winOptions);
            //$('#' + win.contentId)['SO114EA']({ 
            var subDiv2 = $('#' + subDiv2Name);
            $(subDiv2)['SO114EA']({
                loginInfo: cloneJSON(options.loginInfo),
                container: subDiv,
                theme: options.theme,
                localization: cloneJSON(options.localization),
                parameters: dsData,
                editMode: editMode.append
            });
            options.controls.push({ name: subDiv2Name, type: 'SO114EA', level: options.level + 1 });
            options.controls.push({ name: subDivName, type: 'csWindow', level: options.level });
            options.isShow = true;
            //當申請人管理專案關閉時 
            //$('#' + win.windowId).on('close', function () { 
            $(subDiv).on('close', function () {
                //var suboptions = $('#' + win.contentId).SO114EA('options'); 
                var suboptions = $(subDiv2).SO114EA('options');

                if (suboptions.closeMode == 'OK') {
                    //取得選定的申請人資料，並帶到畫面上 
                    options.proposerRow = suboptions.selectedRow;

                    var headerId = '#' + $(div).prop('id');
                    $(headerId + 'txtCustId').val(options.newCustId);
                    $(headerId + 'txtCustName').val(options.proposerRow.DECLARANTNAME);
                    $(headerId + 'gilAddress').csAddress1('addrNo', options.INSTADDRNO);

                    //$('#' + win.contentId)['SO114EA']('destroy'); 
                    //$('#' + win.windowId).csWindow('destroy'); 
                    $(subDiv2)['SO114EA']('destroy');
                    $(subDiv).csWindow('destroy');
                    action(true);
                } else {
                    //$('#' + win.contentId)['SO114EA']('destroy'); 
                    //$('#' + win.windowId).csWindow('destroy'); 
                    $(subDiv2)['SO114EA']('destroy');
                    $(subDiv).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', subDiv2Name);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', subDivName);
                    action(false);
                };
                options.isShow = false;
            });
        }
        catch (err) {
            errorHandle(formName, 'showProposer', err);
        };
    };
    //開啟選擇發票流水號畫面
    function enterInvForm(div, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //設定呼叫參數
            var dsData = {
                type: 'string',
                INVSEQNO: cloneJSON(options.initData['INVSEQNO'])
            };
            //Create SubForm
            var width = $(options.container).width();
            var height = $(options.container).height() - 30;
            var x = ($(options.container).width() - width) / 2;
            var y = ($(options.container).height() - height);
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
            var win = createcsWindow(options.container, lang.subFormTitle1, winOptions);
            $('#' + win.contentId)['SO1100BA3']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                theme: options.theme,
                localization: cloneJSON(options.localization),
                parameters: dsData
            });
            options.controls.push({ name: win.contentId, type: 'SO1100BA3', level: options.level + 1 });
            options.controls.push({ name: win.windowId, type: 'csWindow', level: options.level });
            getControlObject(div, 'btnSave').jqxButton({ disabled: true });
            //當子功能關閉時
            $('#' + win.windowId).on('close', function () {
                getControlObject(div, 'btnSave').jqxButton({ disabled: false });
                //子功能按確定時
                var suboptions = $('#' + win.contentId).SO1100BA3('options');
                if (suboptions.isSaved) {
                    //取得選取的發票流水號
                    options.INVSEQNO = suboptions.INVSEQNO;
                };
                $('#' + win.contentId)['SO1100BA3']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                action(true);  
            });
        } catch (err) {
            errorHandle(formName, 'enterInvForm', err);
        };
    };
    //開啟選擇相同裝機地址的客戶資料畫面
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
            var width = $(options.container).width();
            var height = $(options.container).height() - 30;
            var x = ($(options.container).width() - width) / 2;
            var y = ($(options.container).height() - height);
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
                parameters: dsData
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
                var data = cloneJSON(suboptions.selectedRow);
                $('#' + win.contentId)['SO1100BA4']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                action(isSave, data);
            });
        } catch (err) {
            errorHandle(formName, 'enterSameAddressForm', err);
        };
    };

    //載入頁面事件
    function addHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //關閉地址元件子視窗時
            $('#' + $(div).prop('id') + 'gilAddress').on('ChooseCompleted', function (e, r) {
                //判斷關閉視窗時使用的Button
                if (r == 'newAddress') {
                    //按子視窗存檔時
                    var addressItem = $('#' + $(div).prop('id') + 'gilAddress').csAddress1('getAddrInfo');
                    if (addressItem.MDUNAME != null) {
                        //取出該地址的大樓名稱、收費屬性
                        $('#' + $(div).prop('id') + 'txtMduId').val(addressItem.MDUNAME);
                        var addressItem2 = $('#' + $(div).prop('id') + 'gilAddress').csAddress1('getAddrInfo2');
                        $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList({ disabled: false });
                        if (addressItem2 != undefined && addressItem2.CLCTMETHOD != null) {
                            if (addressItem2.CLCTMETHOD == 1) {
                                $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList('selectIndex', 2);
                            } else if (addressItem2.CLCTMETHOD == 2 || addressItem2.CLCTMETHOD == 3) {
                                $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList('selectIndex', 1);
                            };
                        } else {
                            $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList('selectIndex', 1);
                        };
                        $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList({ disabled: true });
                    } else {
                        //清空該地址的大樓名稱、收費屬性
                        $('#' + $(div).prop('id') + 'txtMduId').val('');
                        $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList({ disabled: false });
                        $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList('selectIndex', 0);
                        $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList({ disabled: true });
                    };
                    //判斷是否有修改地址
                    if (options.OLDADDRNO != addressItem.ADDRNO) {
                        //查詢重複裝機地址的客戶清單
                        queryInstAddrNoList(div, addressItem.ADDRNO, function (isOk, msg) {
                            if (isOk) {
                                //有查到才額外處理
                                if (options.initData.SAMEADDRESS.rows.length > 0) {
                                    //開啟選擇相同裝機地址的客戶資料畫面
                                    enterSameAddressForm(div, function (isSubOk, selectedRow) {
                                        if (isSubOk) {
                                            if (options.editMode == editMode.append) {
                                                //紀錄回傳值
                                                options.newCustID = selectedRow.CUSTID;
                                                options.isSaved = true;
                                                //關閉本視窗
                                                $(div).SO1100BA('close');
                                            } else {
                                                //進入另一個CustView畫面
                                                $('div[data-mnu="SO0000B"]').SO0000B('addCVTabItem', { loginInfo: cloneJSON(options.loginInfo), data: selectedRow, tel: '' });
                                                //關閉視窗
                                                options.isSaved = false;
                                                $(div).SO1100BA('close');
                                            };
                                        };
                                    });
                                };
                            } else {
                                messageBox(msg);
                            };
                        });
                    };
                };  
            });
            //地址元件完成AddrNo的載入時
            $('#' + $(div).prop('id') + 'gilAddress').on('dataLoadCompleted', function (e) {
                var addressItem = $('#' + $(div).prop('id') + 'gilAddress').csAddress1('getAddrInfo');
                if (addressItem.MDUNAME != null) {
                    //取出該地址的大樓名稱、收費屬性
                    $('#' + $(div).prop('id') + 'txtMduId').val(addressItem.MDUNAME);
                    var addressItem2 = $('#' + $(div).prop('id') + 'gilAddress').csAddress1('getAddrInfo2');
                    $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList({ disabled: false });
                    if (addressItem2 != undefined && addressItem2.CLCTMETHOD != null) {
                        if (addressItem2.CLCTMETHOD == 1) {
                            $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList('selectIndex', 2);
                        } else if (addressItem2.CLCTMETHOD == 2 || addressItem2.CLCTMETHOD == 3) {
                            $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList('selectIndex', 1);
                        };
                    } else {
                        $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList('selectIndex', 1);
                    };
                    $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList({ disabled: true });
                } else {
                    //清空該地址的大樓名稱、收費屬性
                    $('#' + $(div).prop('id') + 'txtMduId').val('');
                    $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList({ disabled: false });
                    $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList('selectIndex', 0);
                    $('#' + $(div).prop('id') + 'txtChargeType').jqxDropDownList({ disabled: true });
                };
            });
            //存檔
            $('#' + $(div).prop('id') + 'btnSave').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (options.isShow) { return; };
                //參數檢核
                var verData = dataVerify(div);
                if (verData.flag == false) {
                    messageBox(verData.message);
                } else {
                    if (options.editMode == editMode.append) {
                        //查詢可選發票流水號清單
                        queryInvSeqNoList(div, function (isOk, msg) {
                            if (isOk) {
                                if (options.initData.INVSEQNO.rows.length == 0) {
                                    options.INVSEQNO = null;
                                    //執行存檔
                                    save(div,1);
                                } else if (options.initData.INVSEQNO.rows.length == 1) {
                                    options.INVSEQNO = options.initData.INVSEQNO.rows[0]['INVSEQNO'];
                                    //執行存檔
                                    save(div, 1);
                                } else {
                                    //開啟選擇發票流水號畫面
                                    enterInvForm(div, function (isOk) {
                                        if (isOk) {
                                            //執行存檔
                                            save(div, 1);
                                        };
                                    });
                                };
                            } else {
                                messageBox(msg);
                                action(false);
                            };
                        });
                    } else {
                        //判斷是否有修改地址
                        var addressItem = getControlObject(div, 'gilAddress').csAddress1('getAddrInfo');
                        if (options.OLDADDRNO != addressItem.ADDRNO) {
                            //選擇是否一併更新發票地址
                            messageBox(options.language.addressCheck, messageType.yesno, null, function (flag) {
                                var addressFlag = 0;
                                if (flag == 'yes') {
                                    addressFlag = 1;
                                };
                                //執行存檔
                                save(div, addressFlag);
                            });
                        } else {
                            //執行存檔
                            save(div, 1);
                        };
                    };
                };
            });
            //取消
            $('#' + $(div).prop('id') + 'btnQuite').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }

                //var options = $.data(div, formName).options;
                if (options.editMode == editMode.append || options.editMode == editMode.edit) {
                    if (options.isShow == false) {
                        messageBox(options.language.quiteNote, messageType.yesno, null, function (flag) {
                            if (flag == 'yes') {
                                options.isSaved = false;

                                $(div).SO1100BA('close');
                                return;
                            };
                        });
                    };
                } else {
                    options.isSaved = false;
                    $(div).SO1100BA('close');
                    return;
                };              
            });
            //當csWindow按[X]時
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).on('winClosing', function (e) {
                    close(div)
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'addHandler', err);
        };
    };
    //將明細資料放入控制項
    function rcdToScr(div) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var data = options.initData.CUSTOMER.rows[0];
            
            $(headerId + 'txtCustId').val(data.CUSTID);
            $(headerId + 'txtCustName').val(data.CUSTNAME);
            if (data.CLASSCODE1 != null && data.CLASSCODE1 !== 'null') {
                $(headerId + 'clClassCode1').csList('codeNo', data.CLASSCODE1);
            } else {
                $(headerId + 'clClassCode1').csList('clearDisplayValue');
            };
            if (data.CLASSCODE2 != null && data.CLASSCODE2 !== 'null') {
                $(headerId + 'clClassCode2').csList('codeNo', data.CLASSCODE2);
            } else {
                $(headerId + 'clClassCode2').csList('clearDisplayValue');
            };
            if (data.CLASSCODE3 != null && data.CLASSCODE3 !== 'null') {
                $(headerId + 'clClassCode3').csList('codeNo', data.CLASSCODE3);
            } else {
                $(headerId + 'clClassCode3').csList('clearDisplayValue');
            };
            $(headerId + 'txtHomeID').val(data.HOMEID);
            $(headerId + 'gilAddress').csAddress1('addrNo', data.INSTADDRNO);
            options.OLDADDRNO = data.INSTADDRNO;
            $(headerId + 'txtMduId').val(data.MDUNAME);
            if (data.CHARGETYPE != null) {
                $(headerId + 'txtChargeType').jqxDropDownList('selectIndex', data.CHARGETYPE - 1);
            } else {
                $(headerId + 'txtChargeType').jqxDropDownList('selectIndex', -1);
            };           
            $(headerId + 'txtChargeNote').val(data.CHARGENOTE);
            $(headerId + 'txtCustNote').val(data.CUSTNOTE);
            $(headerId + 'txtInitTime').val(data.INITTIME);
            $(headerId + 'txtInitUser').val(data.INITUSER);
            if (data.NEWUPDTIME != null && data.NEWUPDTIME !== 'null') {
                $(headerId + 'txtUpdTime').val(formatStringDate(jsonDate(data.NEWUPDTIME), 'yyyyMMddHHmmss', false));
            } else {
                $(headerId + 'txtUpdTime').val('');
            };
            $(headerId + 'txtUpdEn').val(data.UPDEN);
        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    };
    //將控制項細資存入物件
    function scrToRcd(div) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var masterData = options.initData.CUSTOMER;

            var row = {};
            if (options.editMode == editMode.append) {
                for (var i = 0, icnt = masterData.columns.length; i < icnt; i++) {
                    row[masterData.columns[i].name] = null;
                }
                //客戶編號,名稱
                row['CUSTID'] = $(headerId + 'txtCustId').val();
                row['CUSTNAME'] = $(headerId + 'txtCustName').val();
                //電話1
                row['TELH1'] = options.proposerRow.CONTTELAREA;
                row['TEL1'] = options.proposerRow.CONTTEL;
                //電話2
                row['TELH2'] = options.proposerRow.CONTOFFICEAREA;
                row['TEL2'] = options.proposerRow.CONTOFFICE;
                row['TEL2EXT'] = options.proposerRow.CONTOFFICEEXT;
                //行動電話
                row['TELH3'] = options.proposerRow.CONTMOBILEAREA;
                row['TEL3'] = options.proposerRow.CONTMOBILE;
                //客戶關係
                row['RELATION'] = null;
                //收視等級
                row['VIEWLEVEL'] = null;
                //會員E-Mail
                row['WEB_ACCOUNT'] = null;
                //ID
                row['ID'] = options.proposerRow.ID;
                //生日
                row['BRITHDAY'] = options.proposerRow.BIRTHDAY;
                //性別
                if (options.proposerRow.SEXTUAL != null) {
                    row['SEXTUAL'] = options.proposerRow.SEXTUAL;
                } else {
                    row['SEXTUAL'] = 1;
                };
                //家戶編號
                row['HOMEID'] = null;
            } else {
                row = masterData.rows[0];
            }
            //客戶類別
            if ($(headerId + 'clClassCode1').csList('codeNo') != '') {
                row['CLASSCODE1'] = $(headerId + 'clClassCode1').csList('codeNo');
                row['CLASSNAME1'] = $(headerId + 'clClassCode1').csList('description');
            } else {
                row['CLASSCODE1'] = null;
                row['CLASSNAME1'] = null;
            };
            if ($(headerId + 'clClassCode2').csList('codeNo') != '') {
                row['CLASSCODE2'] = $(headerId + 'clClassCode2').csList('codeNo');
                row['CLASSNAME2'] = $(headerId + 'clClassCode2').csList('description');
            } else {
                row['CLASSCODE2'] = null;
                row['CLASSNAME2'] = null;
            };
            if ($(headerId + 'clClassCode3').csList('codeNo') != '') {
                row['CLASSCODE3'] = $(headerId + 'clClassCode3').csList('codeNo');
                row['CLASSNAME3'] = $(headerId + 'clClassCode3').csList('description');
            } else {
                row['CLASSCODE3'] = null;
                row['CLASSNAME3'] = null;
            };
            //裝機地址,大樓編號
            var addressItem = $(headerId + 'gilAddress').csAddress1('getAddrInfo');
            if (addressItem != null && addressItem.ADDRNO != null) {
                row['INSTADDRNO'] = addressItem.ADDRNO;
                row['INSTADDRESS'] = addressItem.ADDRESS;
                row['MDUID'] = addressItem.MDUID;
            } else {
                row['INSTADDRNO'] = null;
                row['INSTADDRESS'] = null;
                row['MDUID'] = null;
            };
            //收費屬性
            var selectedItem = $(headerId + 'txtChargeType').jqxDropDownList('getSelectedItem');
            row['CHARGETYPE'] = selectedItem.value;
            //收費備註
            row['CHARGENOTE'] = $(headerId + 'txtChargeNote').val();
            //備註
            row['CUSTNOTE'] = $(headerId + 'txtCustNote').val();
           
            var retData = $.extend(true, {}, { CUSTOMER: { columns: masterData.columns, rows: [row] } });

            return retData;
        }
        catch (err) {
            errorHandle(formName, 'scrToRcd', err);
            return null;
        }
    }
    //根據頁面模式調整各控制項狀態
    function changeMode(div, mode) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var aCanUse = false;
            var editText = '';
            options.editMode = mode;

            switch (mode) {
                case editMode.view:
                    aCanUse = false;
                    editText = options.language.stateView;

                    break;
                case editMode.append:
                    aCanUse = true;
                    editText = options.language.stateAdd;

                    break;
                case editMode.edit:
                    aCanUse = true;
                    editText = options.language.stateEdit;

                    break;
            };
            //$(headerId + 'txtStatus').jqxInput('val', editText);
            getControlObject(div, 'txtStatus').text(editText);

            $(headerId + 'txtCustId').jqxInput({ disabled: true });
            $(headerId + 'txtCustName').jqxInput({ disabled: true });
            $(headerId + 'clClassCode1').csList('disabled', !aCanUse );
            $(headerId + 'clClassCode2').csList('disabled', !aCanUse);
            $(headerId + 'clClassCode3').csList('disabled', !aCanUse);
            $(headerId + 'txtHomeID').jqxInput({ disabled: true });
            $(headerId + 'gilAddress').csAddress1('readOnly', !aCanUse);
            //$(headerId + 'gilAddress').csAddress1('disabled', !aCanUse);
            $(headerId + 'txtMduId').jqxInput({ disabled: true });
            $(headerId + 'txtChargeType').jqxDropDownList({ disabled: true });
            $(headerId + 'txtChargeNote').jqxTextArea({ disabled: !aCanUse });
            $(headerId + 'txtCustNote').jqxTextArea({ disabled: !aCanUse });
            $(headerId + 'txtInitTime').jqxInput({ disabled: true });
            $(headerId + 'txtInitUser').jqxInput({ disabled: true });
            $(headerId + 'txtUpdTime').jqxInput({ disabled: true });
            $(headerId + 'txtUpdEn').jqxInput({ disabled: true });
            $(headerId + 'btnSave').jqxButton({ disabled: !aCanUse });
            disableAllFieldPriv(options.controls, options.initData['FieldPriv'], options.initData['UserPriv']);
        }
        catch (err) {
            errorHandle(formName, 'changeMode', err);
        }
    };
    //參數檢核
    function dataVerify(div) {
        var refData = { flag: false, message: '' };
        var lang = $.data(div, formName).options.language;
        //輸入[收費備註]時，限制其長度不得超過200
        if ($('#' + $(div).prop('id') + 'txtChargeNote').val().lengthB() > 200) {
            $('#' + $(div).prop('id') + 'txtChargeNote').focus();
            refData.message = lang.saveCheck1;
            return refData;
        };
        //輸入[備註]時，限制其長度不得超過2000
        if ($('#' + $(div).prop('id') + 'txtCustNote').val().lengthB() > 2000) {
            $('#' + $(div).prop('id') + 'txtCustNote').focus();
            refData.message = lang.saveCheck2;
            return refData;
        };
        //檢核無誤
        refData.flag = true;
        return refData;
    };
    //關閉CSWindow
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                //$(options.container).jqxWindow('close');
                if (options.editMode == editMode.append || options.editMode == editMode.edit) {
                    if (options.isShow == false) {
                        messageBox(options.language.quiteNote, messageType.yesno, null, function (flag) {
                            if (flag == 'yes') {
                                options.isSaved = false;
                                $(options.container).jqxWindow('close');
                                return;
                            };
                        });
                    };             
                } else {
                    options.isSaved = false;
                    $(options.container).jqxWindow('close');
                    return;
                };
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };

    //將日期格式資料轉為字串(2016/11/22 18:30:00)
    function formatStringDate(d, f, emptyPrompt) {
        try {
            Date.prototype.yyyyMM = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based                         
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM);
            };
            Date.prototype.yyyyMMdd = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
                var dd = this.getDate().toString();
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                   ((dd.length == 1) ? '0' + dd : dd);
            };
            Date.prototype.yyyyMMddHH = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
                var dd = this.getDate().toString();
                var hh = this.getHours().toString();
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                   ((dd.length == 1) ? '0' + dd : dd) + ' ' + ((hh.length == 1) ? '0' + hh : hh);
            };
            Date.prototype.yyyyMMddHHmm = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
                var dd = this.getDate().toString();
                var hh = this.getHours().toString();
                var m = this.getMinutes().toString();
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                   ((dd.length == 1) ? '0' + dd : dd) + ' ' + ((hh.length == 1) ? '0' + hh : hh) + ':' +
                   ((m.length == 1) ? '0' + m : m);
            };
            Date.prototype.yyyyMMddHHmmss = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
                var dd = this.getDate().toString();
                var hh = this.getHours().toString();
                var m = this.getMinutes().toString();
                var ss = this.getSeconds().toString();
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                    ((dd.length == 1) ? '0' + dd : dd) + ' ' + ((hh.length == 1) ? '0' + hh : hh) + ':' +
                    ((m.length == 1) ? '0' + m : m) + ':' + ((ss.length == 1) ? '0' + ss : ss);
            };
            Date.prototype.HHmm = function () {
                var hh = this.getHours().toString();
                var m = this.getMinutes().toString();
                return ((hh.length == 1) ? '0' + hh : hh) + ':' +
                    ((m.length == 1) ? '0' + m : m)
            };
            Date.prototype.HHmmss = function () {
                var hh = this.getHours().toString();
                var m = this.getMinutes().toString();
                var ss = this.getSeconds().toString();
                return ((hh.length == 1) ? '0' + hh : hh) + ':' +
                    ((m.length == 1) ? '0' + m : m) + ':' + ((ss.length == 1) ? '0' + ss : ss);
            };
            var ret = '';
            switch (f) {
                case 'yyyyMMdd':
                    ret = d.yyyyMMdd();
                    break;
                case 'yyyyMMddHHmmss':
                    ret = d.yyyyMMddHHmmss();
                    break;
                case 'yyyyMM':
                    ret = d.yyyyMM();
                    break;
                case 'yyyyMMddHH':
                    ret = d.yyyyMMddHH();
                    break;
                case 'yyyyMMddHHmm':
                    ret = d.yyyyMMddHHmm();
                    break;
                case 'HHmm':
                    ret = d.HHmm();
                    break;
                case 'HHmmss':
                    ret = d.HHmmss();
                    break;
            };
            if (ret.length > 0 && emptyPrompt) {
                ret = ret.replace(/\D*/g, '');
            };
            return ret;
        }
        catch (err) {
            errorHandle(formName, 'formtStringDate', err);
        }
    };
    //將日期字串(2011-06-21T14:27:28.00)轉為日期格式
    function jsonDate(jdate) {
        try {
            var ary = jdate.split(/[^0-9]/);
            //2011-06-21T14:27:28.00
            ary = $.grep(ary, function (value) { return $.isNumeric(value) });
            var len = 7 - ary.length;
            if (len > 0) {
                for (i = 0; i < len; i++) {
                    ary.push(0);
                };
            };
            if (jdate.indexOf('下午') > 0 || jdate.toLowerCase().indexOf('pm') > 0) {
                ary[3] = parseInt(ary[3]) + 12;
            };
            return new Date(ary[0], parseInt(ary[1]) - 1, ary[2], ary[3], ary[4], ary[5], ary[6]);
        }
        catch (err) {
            errorHandle(formName, 'jsonDate', err);
        };
    };
    //將一筆Row轉換為RIA接受的DataSet
    function toDataSet(tbName, rowData) {
        try {
            var ds = {},
                columns = [],
                rows = [],
                keys = Object.keys(rowData);

            for (var i = 0, cnt = keys.length; i <= cnt - 1; i++) {
                columns.push({ 'name': keys[i], 'type': 'string' });
            }

            rows.push(rowData);
            ds[tbName] = { 'columns': columns, 'rows': rows };

            keys = null;
            columns = null;
            rows = null;

            return ds;
        } catch (err) {
            errorHandle(formName, 'toDataSet', err);
        }
    }
})(jQuery);