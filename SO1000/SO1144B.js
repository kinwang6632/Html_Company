(function ($) {
    var formName = 'SO1144B';
    var riadllName = 'CableSoft.SO.RIA.Order.Edit.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Order.Edit.Web.NewOrderEdit';
    var buttonsHeight = 25;
    var textHeight = 23;
    var parameterTableName = "Parameter";
    var proposerTableName = 'Proposer';
    var orderProposerTableName = 'OrderProposer';
    var customerTableName = 'Customer';
    var contactTableName = 'Contact';
    var orderItemTableName = 'OrderItem';
    var orderTableName = 'Order';
    var wipTableName = 'Wip';
    var productTableName = 'Product';
    var chargeTableName = 'Charge';
    var facilityTableName = 'Facility';
    var presentTableName = 'Present';
    var closeTableName = 'Close';
    var changeTableName = 'Change';
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
                        options: $.extend({}, new defaults(), new SO1144B(), options)
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
        },
        refresh: function (jq) {
            return refresh(jq);
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
        this.custId = -1;
        this.orderNo = null;
        this.sourceOrderNo = null;
        this.localization = null;
        this.container = null;
        this.orderData = {};

        this.mediaCode = null;
        this.mediaName = null;
        this.bulletinCode = null;
        this.introId = null;
        this.introName = null;
        this.note = null;
        this.resvTime = null;
        this.salesAutoSNo = null;
        this.orderItem = 0;
        this.childLoaded = [];
        this.child2Loaded = [];
    });
    var moveType = {
        mProposer: 0,
        mNoProm: 1,
        mProm: 2,
        mChooseProd: 3,
        mChoosePresent: 4,
        mNextPeriod: 5,
        mPayDate: 5,
        mResvTime: 6,
        mMedia: 6,
        mOrderList: 7,
        mCalculte: 8
    };
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
                //if (controls[i].type.indexOf('jqxSplitter') >= 0) {
                //    var height = $(div).height();
                //    var height1 = 30;
                //    var height2 = Math.floor(height * 2 / 5) - 30;
                //    $('#' + controls[i].name).jqxSplitter({ height: '99.5%', panels: [{ size: height1 }, { size: height2 }] });
                //}
                getControlObject(div, 'gbxBottom').jqxPanel({ height: $(div).height() - 3 });
            }
            if (getRowByKeyValue(controls, "name", $(div).prop('id') + "dvPresent") != null) {
                getControlObject(div, 'dvPresent')['SO1144K']('resize');
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
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, cloneJSON(paraLoginInfo));
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
    function canView(params, action) {
        try {
            var checkPara = checkParameters(editMode.view, params);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                action([true]);
                //checkCanXX('CanView', params, function (d) {
                //    action([d.ResultBoolean, d.ErrorMessage]);
                //});
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
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                orderNo: { type: 'string', value: data[orderTableName].rows[0]['orderNo'.toUpperCase()] }
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
            var table = data[orderTableName];
            if (table == null) return ([false, 'table order not exist!!']);
            //檢核欄位存不存在
            var checkCols = ['', '', ''];
            //新增檢核客戶編號
            if (em == editMode.append) {
                if (table.rows[0]['CustId'.toUpperCase()] == null) {
                    return ([false, 'column custId not exist!!']);
                }
            }
            else {
                if (table.rows[0]['OrderNo'.toUpperCase()] == null) {
                    return ([false, 'column orderNo not exist!!']);
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
            $.ajax({
                url: 'SO1000\\' + formName + '.html',
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        formDisplay(div, false);
                        changeElementId(div,formName);
                        options.loading = true;
                        init(div, function () {
                            frmAddHandler(div);
                            blockAddHandler(div);
                            buttonAddHandler(div);
                            triggerLoaded(div);
                            options.loading = false;
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
    function triggerLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            var oLength = options.childLoaded.length;
            for (var i = 0; i < oLength; i++) {
                if (options.childLoaded[i] == false) {
                    return;
                }
            }
            oLength = options.child2Loaded.length;
            for (var i = 0; i < oLength; i++) {
                if (options.child2Loaded[i] == false) {
                    return;
                }
            }
            var moveToResvTime = function () {
                if (options.editMode != editMode.append) {
                    moveTo(div, moveType.mResvTime);
                    getControlObject(div, 'dvResvTime')['SO1144B8']("focus");
                }
            }
            if (options.editMode == editMode.view) {
                var cLength = options.controls.length;
                for (var i = 0; i < cLength; i++) {
                    var control = options.controls[i];
                    if (control['type'].indexOf('SO1144') >= 0) {
                        $('#' + control['name'])[control['type']]('disabled', true);
                    }
                }
                moveToResvTime();
            }
            else {
                ////申請人縮起來
                //getControlObject(div, 'gbxProposer').jqxExpander('collapse');
                //getControlObject(div, 'gbxProposer').on('collapsed', function () {
                //    moveToResvTime();
                //});
                moveToResvTime();
            }
            options.childLoaded.length = 0;
            options.child2Loaded.length = 0;
            formDisplay(div, true);
            $(div).triggerHandler('loaded');
        }
        catch (err) {
            errorHandle(formName, 'triggerLoaded', err);
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
    function refresh(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            for (var i = 0; i < controls.length; i++) {
                if (controls[i].type == "jqxExpander") {
                    $('#' + controls[i].name).jqxExpander('refresh');
                    $('#' + controls[i].name).jqxExpander('invalidate');
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'refresh', err);
        }
    };
    function initParas(div) {
        try {
            var options = $.data(div, formName).options;
            options.custId = options.parameters[orderTableName].rows[0]['CUSTID'];
            if (options.editMode != editMode.append) {
                options.orderNo = options.parameters[orderTableName].rows[0]['ORDERNO'];
            }
        }
        catch (err) {
            errorHandle(formName, 'initParas', err);
        }
    }
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            initParas(div);
            if (isEmpty(options.custId)) { options.custId = -1; }
            formResize(div);
            getAllInitData(div, function (r) {
                if (r[0] == false) {
                    messageBox(r[1], null, null, action);
                }
                else {
                    renderControl(div);
                    getResvTime(div);
                    changeMode(div, options.editMode, action);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function newRcd(div) {
        try {
            var options = $.data(div, formName).options;
            getMasterData(div);
            options.orderItem = 0;
        }
        catch (err) {
            errorHandle(formName, 'newRcd', err);
        }
    }
    function changeMode(div, em, action) {
        try {
            var options = $.data(div, formName).options;
            var editText = '';
            var flag = true;
            var newFlag = false;
            options.editMode = em;
            switch (em) {
                case editMode.view:
                    editText = options.language.view;
                    break;
                case editMode.edit:
                    editText = options.language.edit;
                    flag = false;
                    break;
                case editMode.append:
                    editText = options.language.append;
                    newFlag = true;
                    flag = false;
                    break;
            }
            getControlObject(div, 'lEditMode').jqxInput('val', editText);
            //getControlObject(div, 'btnSave').jqxButton({ disabled: flag });
            //getControlObject(div, 'btnReserve').jqxButton({ disabled: flag });
            //getControlObject(div, 'btnSave').jqxButton({ disabled: flag });
            if (em == editMode.append) {
                newRcd(div);
                action(true);
            }
            else {
                rcdToScr(div, action);
            }
        }
        catch (err) {
            errorHandle(formName, 'changeMode', err);
        }
    };
    function getResvTime(div) {
        var options = $.data(div, formName).options;
        var resvTime;
        if (options.orderData != null && options.orderData['Order'].rows.length > 0 && options.orderData['Order'].rows[0]['resvTime'.toUpperCase()] != null) {
            resvTime = options.orderData['Order'].rows[0]['resvTime'.toUpperCase()];
            options.resvTime = resvTime;
        }
        else if (options.resvTime != null) {
            resvTime = options.resvTime;
        }
        else {
            resvTime = new Date(formatDateTime(new Date(), 'date'));
        }
        return resvTime;
    };
    function rcdToScrMaster(div) {
        try {
            var options = $.data(div, formName).options;
            var rows = options.orderData[orderTableName].rows;
            if (rows.length > 0) {
                var row = rows[0];
                options.mediaCode = row["MediaCode".toUpperCase()];
                options.mediaName = row["MediaName".toUpperCase()];
                options.bulletinCode = row["BulletinCode".toUpperCase()];
                options.introId = row["IntroId".toUpperCase()];
                options.introName = row["IntroName".toUpperCase()];
                options.note = row["Note".toUpperCase()];
                options.resvTime = row["ResvTime".toUpperCase()];
                if (isEmpty(options.resvTime)) {
                    if (options.orderData[wipTableName].rows.length > 0) {
                        options.resvTime = options.orderData[wipTableName].rows[0]["ResvTime".toUpperCase()];
                    }
                }
                options.salesAutoSNo = row["SalesAutoSNo".toUpperCase()];
                options.resvType = row["resvType".toUpperCase()];
                options.groupNo = row["groupNo".toUpperCase()];
                options.resvSNo = row["resvSNo".toUpperCase()];
                //2017/03/08 Jacky 秀客編及訂單單號在window Title
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    var title = $(options.container).csWindow('title');
                    $(options.container).csWindow({
                        title: title + ' ' + options.language.custId + row['custId'.toUpperCase()] + ',' +
                                            options.language.orderNo + row['orderNo'.toUpperCase()]
                    });
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'rcdToScrMaster', err);
        }
    };
    function getMasterData(div) {
        try {
            var options = $.data(div, formName).options;
            var rows = options.orderData[orderTableName].rows;
            var row;
            if (rows.length == 0) {
                row = {};
                var loginRow = options.loginInfo.loginInfo.rows[0];
                row["OrderNo".toUpperCase()] = formatDateTime(new Date(), 'datetime3', false).substr(2);
                row["CustId".toUpperCase()] = options.custId;
                if (options.initData[customerTableName] != null && options.initData[customerTableName].rows.length > 0) {
                    row["CustName".toUpperCase()] = options.initData[customerTableName].rows[0]["CustName".toUpperCase()];
                }
                row["AcceptEn".toUpperCase()] = loginRow['entryid'];
                row["AcceptName".toUpperCase()] = loginRow['entryname'];
                row["AcceptTime".toUpperCase()] = new Date();
                row["CompCode".toUpperCase()] = loginRow['compcode'];
                if (options.parameters[contactTableName] != null && options.parameters[contactTableName].rows.length > 0) {
                    var contactRow = options.parameters[contactTableName].rows[0];
                    row["ServiceCode".toUpperCase()] = contactRow['ServiceCode'.toUpperCase()];
                    row["ServDescCode".toUpperCase()] = contactRow['ServDescCode'.toUpperCase()];
                    row["BulletinCode".toUpperCase()] = contactRow['BulletinCode'.toUpperCase()];
                    row["SEQNo".toUpperCase()] = contactRow['SEQNo'.toUpperCase()];
                    row["CallSeqNo".toUpperCase()] = contactRow['SEQNo'.toUpperCase()];
                }
                row["OrderType".toUpperCase()] = 1;
                row["SourceOrderNo".toUpperCase()] = options.sourceOrderNo;
                rows.push(row);
            }
            else {
                row = rows[0];
            }
            row["MediaCode".toUpperCase()] = convertToNull(options.mediaCode);
            row["MediaName".toUpperCase()] = convertToNull(options.mediaName);
            row["BulletinCode".toUpperCase()] = convertToNull(options.bulletinCode);
            row["IntroId".toUpperCase()] = convertToNull(options.introId);
            row["IntroName".toUpperCase()] = convertToNull(options.introName);
            row["Note".toUpperCase()] = convertToNull(options.note);
            row["ResvTime".toUpperCase()] = convertToNull(options.resvTime);
            row["SalesAutoSNo".toUpperCase()] = convertToNull(options.salesAutoSNo);
        }
        catch (err) {
            errorHandle(formName, 'getMasterData', err);
        }
    };
    //取得單選下拉資料
    function getAllInitData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var custId = options.custId;
            var orderNo = options.orderNo;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                orderNo: { type: 'string', value: orderNo }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetAllListData',
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
            errorHandle(formName, 'getInitData', err);
        }
    };
    function getOrderItemData(div) {
        try {
            var options = $.data(div, formName).options;
            var orderData = options.orderData;
            var columns = [{ name: 'ORDERITEM', type: 'integer' },
                { name: 'PROMCODE', type: 'integer' },
                { name: 'PROMNAME', type: 'string' },
                { name: 'BPCODE', type: 'string' },
                { name: 'BPNAME', type: 'string' },
                { name: 'ISNOPROM', type: 'boolean' }];
            var orderItemRows = [];
            delete orderData[orderItemTableName];
            orderData[orderItemTableName] = { columns: columns, rows: orderItemRows };
            var tables = [wipTableName, productTableName, chargeTableName, facilityTableName];
            var tLength = tables.length;
            for (var i = 0; i < tLength; i++) {
                var table = orderData[tables[i]];
                var rows = table.rows;
                for (j = 0; j < rows.length; j++) {
                    var orderItem = 0;
                    if (rows[j]['ORDERITEM'] != null) orderItem = rows[j]['ORDERITEM'];
                    var exist = getRowByKeyValue(orderItemRows, 'ORDERITEM', orderItem);
                    if (exist == null) {
                        var row = {
                            "ORDERITEM": orderItem,
                            "BPCODE": rows[j]['BPCODE'],
                            "BPNAME": rows[j]['BPNAME']
                        }
                        row['ISNOPROM'] = (rows[j]['BPCODE'] == null);
                        if (tables[i] == productTableName) {
                            row['PROMCODE'] = rows[j]['PROMCODE'];
                            row['PROMNAME'] = rows[j]['PROMNAME'];
                        }
                        orderItemRows.push(row);
                    }
                    else if (tables[i] == productTableName) {
                        exist['PROMCODE'] = rows[j]['PROMCODE'];
                        exist['PROMNAME'] = rows[j]['PROMNAME'];
                        exist['BPCODE'] = rows[j]['BPCODE'];
                        exist['BPNAME'] = rows[j]['BPNAME'];
                    }
                }
            }
            if (options.editMode != editMode.append) {
                //補沒有Product 資料時的PromCode
                var oRows = options.orderData[orderItemTableName].rows;
                for (var j = 0; j < oRows.length; j++) {
                    if (oRows[j]['BPCODE'] != null && oRows[j]['PROMCODE'] == null) {
                        oRows[j]['PROMCODE'] = options.orderData[orderTableName].rows[0]['PROMCODE'];
                        oRows[j]['PROMNAME'] = options.orderData[orderTableName].rows[0]['PROMNAME'];
                    }
                }
            }

            orderData[orderItemTableName].rows = sortObject(orderData[orderItemTableName].rows, 'ORDERITEM');
            var maxRow = getMaxValueByKey(orderItemRows, 'ORDERITEM');
            if (maxRow != null) {
                options.orderItem = maxRow['ORDERITEM'] + 1;
            }
            else {
                options.orderItem = 1;
            }
        }
        catch (err) {
            errorHandle(formName, 'getOrderItemData', err);
        }
    };
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
    function checkAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //公司
            chkCompany_change(div);
        }
        catch (err) {
            errorHandle(formName, 'checkAddHandler', err);
        }

    };
    function rcdToScrProposer(div, inData) {
        try {
            var options = $.data(div, formName).options;
            if (inData != null && inData[proposerTableName] != null && inData[proposerTableName].rows.length > 0) {
                setOrderProposer(div, inData[proposerTableName].rows[0]);
            }
                //取訂單申請人
            else if (options.initData[orderProposerTableName] != null && options.initData[orderProposerTableName].rows.length > 0) {
                setOrderProposer(div, options.initData[orderProposerTableName].rows[0]);
            }
                //取客戶申請人
            else if (options.initData[proposerTableName] != null && options.initData[proposerTableName].rows.length > 0) {
                setProposer(div, options.initData[proposerTableName].rows[0]);
            }
                //取客戶資料
            else if (options.initData[customerTableName] != null && options.initData[customerTableName].rows.length > 0) {
                setCustomer(div, options.initData[customerTableName].rows[0]);
            }
        }
        catch (err) {
            errorHandle(formName, 'rcdToScrProposer', err);
        }
    }
    function rcdToScr(div, action) {
        try {
            var options = $.data(div, formName).options;
            //rcdToScrProposer(div);
            rcdToScrMaster(div);
            var rows = options.orderData[chargeTableName].rows;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['PERIOD'] != null && rows[i]['PERIOD'] > 0 && rows[i]['AMOUNT'] >= 0) {
                    options.period = rows[i]['PERIOD'];
                    break;
                }
            }
            renderControl2(div, function () {
                setChildParameters(div, 0, options.orderData, function (r) {
                    action(r);
                });
            });
            //記錄舊的工單資料, 做改約時之用
            if (options.editMode == editMode.edit) {
                options.oldWipData = cloneJSON(options.orderData[wipTableName]);
            }
        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
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
            //建立Splitter
            //oArray = ["gbxAll"];
            //oLength = oArray.length;
            //for (var i = 0 ; i < oLength; i++) {
            //    var iId = $(div).prop('id') + oArray[i];
            //    $('#' + iId).jqxSplitter({
            //        theme: options.theme,
            //        height: $(div).height() - 2,
            //        width: '100%',
            //        orientation: 'horizontal',
            //        showSplitBar: false,
            //        splitBarSize: 0,
            //        panels: [{ size: 28 }, { size: $(div).height() * 3 / 5 }]
            //    });
            //    controls.push({ name: iId, type: 'jqxSplitter', level: level });
            //    $($('#' + iId).children()[1]).css('overflow', 'auto');
            //}
            //level += 1;
            //建立Panel
            options.divOriginalHeight = $(div).height() - 26;
            oArray = ["gbxBottom"];
            var oHightArray = [$(div).height()];
            var oWidthArray = ["89.5%"];
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
                //var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                //for (var j = 0; j < scrollBars.length; j++) {
                //    if ($('#' + iId + scrollBars[j]).length > 0) {
                //        $('#' + iId + scrollBars[j]).remove();
                //    }
                //}
            }
            //options.divOriginalHeight = getControlObject(div, "gbxBottom").jqxPanel('height') - 20;
            level += 1;
            $(div).css('overflow', 'hidden');
            //getControlObject(div, 'gbxBottom').css('overflow', 'auto');
            //getControlObject(div, 'gbxBottom').css('height', $(div).css('height'));
            //建立內層Expander
            oArray = ["gbxProposer", "gbxProdProm", "gbxSaleProd", "gbxPresent", "gbxNoProm",
                        "gbxChangeNextPeriod", "gbxPayDate", "gbxResvTime", "gbxMedia", "gbxOrderList",
                        "gbxCalculate", "gbxBuy"];
            oWidthArray = ["99.3%", "99.3%", "99.3%", "99.3%", "99.3%",
                        "50%", "49.3%", "50%", "49.3%", "99.3%",
                        "99.3%", "99%"];
            var oShowArrow = [true, false, false, false, true,
                        false, false, false, false, true,
                        false, false];
            //var oExpanded = [false, true, true, true, true,
            //            true, true, true, true, true,
            //            true, true];
            //oHightArray = ["170", "300"];
            //oShowArrow = [false];
            //oArray = ["gbxBuy"];
            //oWidthArray = ["99%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxExpander({
                    theme: options.theme,
                    showArrow: oShowArrow[i],
                    expanded: true,
                    toggleMode: (oShowArrow[i] ? 'click' : 'none'),
                    width: oWidthArray[i],
                    //height: oHightArray[i]
                });
                $('#' + iId).jqxExpander('setHeaderContent', lang[oArray[i]]);
                //$($($('#' + iId).children()[0]).children()[0]).css('font-size', '105%');
                controls.push({ name: iId, type: 'jqxExpander', level: level });
                $('#' + iId).find('.jqx-expander-header-expanded').css({ 'height': 16, 'padding-bottom': 1 });
            }
            oArray = ["dvProposer", "dvProdProm", "dvSaleProd", "dvPresent", "dvNoProm",
                        "dvOrderList", "dvCalculate"];
            oWidthArray = ["99%", "99%", "99%", "99%", "99%",
                    "99%", "99%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).css('width', oWidthArray[i]);
            }
            oArray = ["dvProposer", "dvProdProm", "dvSaleProd", "dvNoProm"
                //, "dvPresent"
            ];
            //   "dvPayDate", "dvResvTime", "dvMedia", "dvOrderList", "dvCalculate"];
            oLength = oArray.length;
            for (var i = 0; i < oLength; i++) {
                options.childLoaded[i] = false;
                getControlObject(div, oArray[i]).on('loaded', { idx: i }, function (e) {
                    var args = e.data;
                    options.childLoaded[args.idx] = true;
                    triggerLoaded(div);
                });
            }
            getControlObject(div, 'dvProdProm').css({ height: options.divOriginalHeight });
            getControlObject(div, 'dvSaleProd').css({ height: options.divOriginalHeight });

            level += 1;
            //申請人
            getControlObject(div, 'dvProposer')['SO1144B6']($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: $(div),
                custId: options.custId,
                orderNo: options.orderNo,
                parameters: options.initData,
                initData: options.proposerData,
                orderData: options.orderData,
                theme: options.theme,
                localization: options.localization
            }));
            controls.push({ name: $(div).prop('id') + "dvProposer", type: 'SO1144B6', level: level });
            //產品推薦
            getControlObject(div, 'dvProdProm')['SO1144B1']($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                //container: $(div),
                custId: options.custId,
                orderNo: options.orderNo,
                parameters: options.initData,
                theme: options.theme,
                localization: options.localization
            }));
            controls.push({ name: $(div).prop('id') + "dvProdProm", type: 'SO1144B1', level: level });
            //銷售產品
            getControlObject(div, 'dvSaleProd')['SO1144B2']($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                //container: $(div),
                custId: options.custId,
                orderNo: options.orderNo,
                parameters: options.initData,
                orderData: options.orderData,
                orderItem: options.orderItem,
                resvTime: options.resvTime,
                theme: options.theme,
                localization: options.localization
            }));
            controls.push({ name: $(div).prop('id') + "dvSaleProd", type: 'SO1144B2', level: level });
            //無促案
            getControlObject(div, 'dvNoProm')['SO1144B4']($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                //container: $(div),
                custId: options.custId,
                orderNo: options.orderNo,
                parameters: options.initData,
                orderData: options.orderData,
                orderItem: options.orderItem,
                resvTime: options.resvTime,
                theme: options.theme,
                localization: options.localization
            }));
            controls.push({ name: $(div).prop('id') + "dvNoProm", type: 'SO1144B4', level: level });
            ////改下期繳別
            //getControlObject(div, 'dvChangeNextPeriod')['SO1144B5']($.extend({}, {
            //    loginInfo: cloneJSON(options.loginInfo),
            //    //container: $(div),
            //    parameters: options.initData,
            //    custId: options.custId,
            //    orderNo: options.orderNo,
            //    orderData: options.orderData,
            //    theme: options.theme,
            //    localization: options.localization
            //}));
            //controls.push({ name: $(div).prop('id') + "dvChangeNextPeriod", type: 'SO1144B5', level: level });
            ////改繳款日
            //getControlObject(div, 'dvPayDate')['SO1144B7']($.extend({}, {
            //    loginInfo: cloneJSON(options.loginInfo),
            //    //container: $(div),
            //    parameters: options.initData,
            //    custId: options.custId,
            //    orderNo: options.orderNo,
            //    orderData: options.orderData,
            //    theme: options.theme,
            //    localization: options.localization
            //}));
            //controls.push({ name: $(div).prop('id') + "dvPayDate", type: 'SO1144B7', level: level });
            ////預約時間
            //getControlObject(div, 'dvResvTime')['SO1144B8']($.extend({}, {
            //    loginInfo: cloneJSON(options.loginInfo),
            //    container: $(div),
            //    parameters: options.initData,
            //    custId: options.custId,
            //    orderNo: options.orderNo,
            //    orderData: options.orderData,
            //    theme: options.theme,
            //    localization: options.localization
            //}));
            //controls.push({ name: $(div).prop('id') + "dvResvTime", type: 'SO1144B8', level: level });
            ////介紹人
            //getControlObject(div, 'dvMedia')['SO1144B9']($.extend({}, {
            //    loginInfo: cloneJSON(options.loginInfo),
            //    //container: $(div),
            //    parameters: options.initData,
            //    custId: options.custId,
            //    orderNo: options.orderNo,
            //    orderData: options.orderData,
            //    theme: options.theme,
            //    localization: options.localization
            //}));
            //controls.push({ name: $(div).prop('id') + "dvMedia", type: 'SO1144B9', level: level });
            ////訂單明細
            //getControlObject(div, 'dvOrderList')['SO1144BA']($.extend({}, {
            //    loginInfo: cloneJSON(options.loginInfo),
            //    //container: $(div),
            //    parameters: options.initData,
            //    custId: options.custId,
            //    orderNo: options.orderNo,
            //    orderData: options.orderData,
            //    theme: options.theme,
            //    localization: options.localization
            //}));
            //controls.push({ name: $(div).prop('id') + "dvOrderList", type: 'SO1144BA', level: level });
            ////試算
            //getControlObject(div, 'dvCalculate')['SO1144L']($.extend({}, {
            //    loginInfo: cloneJSON(options.loginInfo),
            //    //container: $(div),
            //    custId: options.custId,
            //    orderNo: options.orderNo,
            //    parameters: options.orderData,
            //    resvTime: options.resvTime,
            //    theme: options.theme,
            //    localization: options.localization
            //}));
            //controls.push({ name: $(div).prop('id') + "dvCalculate", type: 'SO1144L', level: level });
            //建立按鈕
            oArray = ['btnProposer', 'btnProdProm', 'btnSaleProd', 'btnPresent', 'btnNoProm',
                        'btnChangeNextPeriod', 'btnPayDate', 'btnResvTime', 'btnMedia', "btnOrderList", 'btnCalculate',
                        'btnSave'];
            oWidthArray = ["99%", "99%", "99%", "99%", "99%",
                        "99%", "99%", "99%", "99%", "99%", "99%",
                        "99%"];
            oLength = oArray.length;
            for (var i = oLength - 1 ; i >= 0; i--) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var width = oWidthArray[i];
                var text = lang[oArray[i]];
                o.text(text);
                var textPosition = { textPosition: 'left' };
                var img = {};
                if (oArray[i] == 'btnSave') {
                    if (options.editMode == editMode.view) {
                        $('#' + bId).remove();
                        continue;
                    }
                    img = imageScr.save;
                    textPosition = cloneJSON(imagePosition);
                }
                else {
                    img = { imgPosition: "right", imgSrc: "images/icon-arrows-right.png" };
                }
                $('#' + bId).jqxButton($.extend({
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                }, textPosition, img));
                controls.push({ name: bId, type: 'jqxButton', level: level });
                $('#' + bId).css("padding-left", 0);
                $('#' + bId).css("padding-right", 0);
                if (oArray[i] !== 'btnSave') {
                    $('#' + bId).css("background-color", 'whitesmoke');
                }
                if (oArray[i] == 'btnPresent') {
                    $('#' + bId).css("display", "none");
                }
                //$('#' + bId).css("float", 'right');
                //$('#' + bId).css("max-width", 80);
                //'images/icon-right.png'
            }
            //getControlObject(div, 'gbxMove').css('zIndex', Number($(options.container).css('zIndex')) + 1);
            //getControlObject(div, 'gbxMove').css('position', 'absolute');
            getControlObject(div, 'gbxBuyBody').css('zIndex', Number($(options.container).css('zIndex')));
            getControlObject(div, 'gbxBuyBody').css('position', 'absolute');

            //建立顯示模式
            getControlObject(div, 'lEditMode').jqxInput({
                theme: options.theme, width: '97%', height: buttonsHeight - 2, disabled: true
            });
            controls.push({ name: $(div).prop('id') + 'lEditMode', type: 'jqxInput', level: level });

            //getControlObject(div, 'lEditMode').css({ 'padding-left': 0, 'padding-right': 0 });
            var btWidth = getControlObject(div, "btnProposer").width();
            var sTop = '90%';
            if (options.editMode == editMode.view) {
                sTop = (($(div).height() - buttonsHeight - 5) / $(div).height()) * 100 + '%'
            }
            else {
                sTop = (($(div).height() - buttonsHeight * 2 - 5) / $(div).height()) * 100 + '%'
            }
            //var sTop = $(div).position().top + $(div).height() - (buttonsHeight * 2 + 5);
            getControlObject(div, 'gbxStatus').css({ 'position': 'absolute', 'top': sTop, width: btWidth });
            //moveTo(div, moveType.mProposer);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function renderControl2Ok(div, action) {
        try {
            var options = $.data(div, formName).options;
            var oArray = ["dvChangeNextPeriod", "dvPayDate", "dvResvTime", "dvMedia", "dvOrderList", "dvCalculate"];
            var oLength = oArray.length;
            for (var i = 0; i < oLength; i++) {
                options.child2Loaded[i] = false;
                getControlObject(div, oArray[i]).on('loaded', { idx: i }, function (e) {
                    var args = e.data;
                    options.child2Loaded[args.idx] = true;
                    for (var j = 0; j < oLength; j++) {
                        if (options.child2Loaded[j] == false) {
                            return;
                        }
                    }
                    options.child2Loaded.length = 0;
                    action(true);
                });
            }
            getControlObject(div, 'dvOrderList').css({ height: options.divOriginalHeight });
            getControlObject(div, 'dvCalculate').css({ height: options.divOriginalHeight });

        }
        catch (err) {
            errorHandle(formName, 'renderControl2Ok', err);
        }
    }
    function renderControl2(div, action) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var level = 2;
            //改下期繳別
            if (getRowByKeyValue(controls, "name", $(div).prop('id') + "dvChangeNextPeriod") == null) {
                renderControl2Ok(div, action);
                getControlObject(div, 'dvChangeNextPeriod')['SO1144B5']($.extend({}, {
                    loginInfo: cloneJSON(options.loginInfo),
                    //container: $(div),
                    parameters: options.initData,
                    custId: options.custId,
                    orderNo: options.orderNo,
                    orderData: options.orderData,
                    theme: options.theme,
                    localization: options.localization
                }));
                controls.push({ name: $(div).prop('id') + "dvChangeNextPeriod", type: 'SO1144B5', level: level });
            }
            else {
                action(true);
                return;
            }
            if (getRowByKeyValue(controls, "name", $(div).prop('id') + "dvPayDate") == null) {
                //改繳款日
                getControlObject(div, 'dvPayDate')['SO1144B7']($.extend({}, {
                    loginInfo: cloneJSON(options.loginInfo),
                    //container: $(div),
                    parameters: options.initData,
                    custId: options.custId,
                    orderNo: options.orderNo,
                    orderData: options.orderData,
                    theme: options.theme,
                    localization: options.localization
                }));
                controls.push({ name: $(div).prop('id') + "dvPayDate", type: 'SO1144B7', level: level });
            }
            //預約時間
            if (getRowByKeyValue(controls, "name", $(div).prop('id') + "dvResvTime") == null) {
                getControlObject(div, 'dvResvTime')['SO1144B8']($.extend({}, {
                    loginInfo: cloneJSON(options.loginInfo),
                    container: $(div),
                    parameters: options.initData,
                    editMode: options.editMode,
                    custId: options.custId,
                    orderNo: options.orderNo,
                    orderData: options.orderData,
                    theme: options.theme,
                    localization: options.localization
                }));
                controls.push({ name: $(div).prop('id') + "dvResvTime", type: 'SO1144B8', level: level });
            }
            //介紹人
            if (getRowByKeyValue(controls, "name", $(div).prop('id') + "dvMedia") == null) {
                getControlObject(div, 'dvMedia')['SO1144B9']($.extend({}, {
                    loginInfo: cloneJSON(options.loginInfo),
                    container: $(div),
                    parameters: options.initData,
                    custId: options.custId,
                    orderNo: options.orderNo,
                    orderData: options.orderData,
                    theme: options.theme,
                    localization: options.localization
                }));
                controls.push({ name: $(div).prop('id') + "dvMedia", type: 'SO1144B9', level: level });
            }
            //訂單明細
            if (getRowByKeyValue(controls, "name", $(div).prop('id') + "dvOrderList") == null) {
                getControlObject(div, 'dvOrderList')['SO1144BA']($.extend({}, {
                    loginInfo: cloneJSON(options.loginInfo),
                    //container: $(div),
                    parameters: options.initData,
                    custId: options.custId,
                    orderNo: options.orderNo,
                    orderData: options.orderData,
                    theme: options.theme,
                    localization: options.localization
                }));
                controls.push({ name: $(div).prop('id') + "dvOrderList", type: 'SO1144BA', level: level });
                //getControlObject(div, 'gbxOrderList').jqxExpander('expanded', false);
            }
            //試算
            if (getRowByKeyValue(controls, "name", $(div).prop('id') + "dvCalculate") == null) {
                getControlObject(div, 'dvCalculate')['SO1144L']($.extend({}, {
                    loginInfo: cloneJSON(options.loginInfo),
                    //container: $(div),
                    custId: options.custId,
                    orderNo: options.orderNo,
                    parameters: options.orderData,
                    resvTime: options.resvTime,
                    theme: options.theme,
                    localization: options.localization
                }));
                controls.push({ name: $(div).prop('id') + "dvCalculate", type: 'SO1144L', level: level });
            }
        }
        catch (err) {
            errorHandle(formName, 'renderControl2', err);
        }
    };
    function mergeOrderData(div, orderData) {
        try {
            var options = $.data(div, formName).options;
            var tables = [wipTableName, productTableName, chargeTableName, facilityTableName, presentTableName, closeTableName, orderItemTableName, ];
            for (var i = 0 ; i < tables.length; i++) {
                var rows = orderData[tables[i]].rows;
                for (var j = 0; j < rows.length; j++) {
                    options.orderData[tables[i]].rows.push(cloneJSON(rows[j]));
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'mergeOrderData', err);
        }
    };
    function deleteOrderItem(div, orderItem) {
        try {
            var options = $.data(div, formName).options;
            var tables = [wipTableName, productTableName, chargeTableName, facilityTableName, presentTableName, closeTableName, orderItemTableName, ];
            for (var i = 0 ; i < tables.length; i++) {
                var rows = options.orderData[tables[i]].rows;
                for (var j = 0; j < rows.length; j++) {
                    if (rows[j]['ORDERITEM'] == orderItem) {
                        delete rows[j];
                    }
                }
                options.orderData[tables[i]].rows = rows.filter(function (e) { return e });
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'deleteOrderItem', err);
        }
    };
    function getOrderDataByItem(div, orderItem) {
        try {
            var options = $.data(div, formName).options;
            var orderData = {}
            var keys = Object.keys(options.orderData);
            var kLength = keys.length;
            for (var i = 0 ; i < kLength; i++) {
                orderData[keys[i]] = {};
                orderData[keys[i]].columns = cloneJSON(options.orderData[keys[i]].columns);
                orderData[keys[i]].rows = [];
                if (getRowByKeyValue(orderData[keys[i]].columns, 'name', 'ORDERITEM') != null) {
                    var rLength = options.orderData[keys[i]].rows.length;
                    for (var r = 0; r < rLength; r++) {
                        if (options.orderData[keys[i]].rows[r]['ORDERITEM'] == orderItem) {
                            orderData[keys[i]].rows.push(cloneJSON(options.orderData[keys[i]].rows[r]));
                        }
                    }
                }
                else {
                    orderData[keys[i]].rows = cloneJSON(options.orderData[keys[i]].rows);
                }
            }
            return orderData;
        }
        catch (err) {
            errorHandle(formName, 'getOrderDataByItem', err);
        }
    };
    function renderPresent(div, orderItem) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var level = 2;
            var orderData = getOrderDataByItem(div, orderItem);
            //贈品
            if (getRowByKeyValue(controls, "name", $(div).prop('id') + "dvPresent") == null) {
                getControlObject(div, 'dvPresent')['SO1144K']($.extend({}, {
                    loginInfo: cloneJSON(options.loginInfo),
                    //container: $(div),
                    parameters: orderData,
                    //orderItem: options.orderItem,
                    theme: options.theme,
                    editMode: options.editMode,
                    localization: options.localization
                }));
                controls.push({ name: $(div).prop('id') + "dvPresent", type: 'SO1144K', level: level });
            }
        }
        catch (err) {
            errorHandle(formName, 'renderPresent', err);
        }
    }
    function changeNextPeriod(div) {
        try {
            var options = $.data(div, formName).options;
            var rows = options.orderData[chargeTableName].rows;
            options.nextPeriod = getControlObject(div, 'dvChangeNextPeriod')['SO1144B5']('getNextPeriod');
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['PERIOD'] > 0 && rows['SBILLNO'] == null && options.nextPeriod != null && options.nextPeriod > 0) {
                    rows[i]['NEXTPERIOD'] = options.nextPeriod;
                    rows[i]['NEXTAMT'] = rows[i]['AMOUNT'] / rows[i]['PERIOD'] * rows[i]['NEXTPERIOD'];
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'changeNextPeriod', err);
        }
    };
    function changePayDate(div) {
        try {
            var options = $.data(div, formName).options;
            var rows = options.orderData[chargeTableName].rows;
            options.payDate = getControlObject(div, 'dvPayDate')['SO1144B7']('getPayDate');
            for (var i = 0; i < rows.length; i++) {
                if (options.payDate != null && rows[i]['PERIOD'] > 0 && rows[i]['SBILLNO'] == null && isNaN(new Date(options.payDate)) == false) {
                    rows[i]['STOPDATE'] = addDays(options.payDate, -1);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'changePayDate', err);
        }
    };
    function moveTo(div, idx) {
        try {
            var top = Number(getScrollTop(div, idx));
            //getControlObject(div, 'gbxBottom').animate({
            //    scrollTop: top
            //}, 20);
            getControlObject(div, 'gbxBottom').jqxPanel('scrollTo', 0, top);
        }
        catch (err) {
            errorHandle(formName, 'moveTo', err);
        }
    }
    function blockAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            getControlObject(div, 'gbxBottom' + ' .jqx-scrollbar').on("valueChanged", function (r) {
                renderControl2(div, function () {
                });
            });
            //getControlObject(div, "gbxProposer").on('expanded', function () {
            //    getControlObject(div, 'dvProposer')['SO1144B6']('resize');
            //});
            getControlObject(div, 'dvProdProm').on('rowDoubleClick', function (args) {
                args['editMode'] = editMode.append;
                getControlObject(div, 'dvSaleProd')['SO1144B2']('refresh', args, function (r) {
                    moveTo(div, moveType.mChooseProd);
                });
            });
            //產品推薦 SO1144B1
            getControlObject(div, 'dvProdProm').on('filter', function () {
                moveTo(div, moveType.mProm);
            });
            //修改保證金
            //getControlObject(div, 'dvSaleProd').on('clickChangePT', function (e) {
            //    try {
            //        var args = e.args;
            //        disableAll(div, true);
            //        var width = 420;
            //        var height = 240;
            //        var win = createcsWindow(div, lang.changeDeposit, {
            //            width: width,
            //            position: { x: ($(div).width() - width) / 2, y: ($(div).height() - height) / 2 },
            //            height: height,
            //            resizable: false
            //        });
            //        $('#' + win.contentId)['SO1144B3']($.extend({}, {
            //            loginInfo: cloneJSON(options.loginInfo),
            //            custId: options.custId,
            //            orderNo: options.orderNo,
            //            parameters: args,
            //            theme: options.theme,
            //            localization: options.localization
            //        }));
            //        $('#' + win.windowId).on('closed', function () {
            //            $('#' + win.contentId)['SO1144B3']('destroy');
            //            $('#' + win.windowId).csWindow('destroy');
            //            disableAll(div, false);
            //        });
            //    }
            //    catch (err) {
            //        errorHandle(formName, 'blockAddHandler_dvSaleProd_clickChangePT', err);
            //    }
            //});
            //銷售產品 SO1144B2
            getControlObject(div, 'dvSaleProd').on('chooseOk', function (e) {
                try {
                    var args = e.args;
                    options.period = args.period;
                    var orderItem = args.orderItem;
                    disableAll(div, true);
                    delete options.calculateData;
                    options.calculateData = args.calculateData;
                    setChildParameters(div, 2, args.orderData, function (r) {
                        try {
                            if (args.hasPresent == true) {
                                getControlObject(div, 'gbxPresent').prop('style').removeProperty('display');
                                getControlObject(div, 'btnPresent').prop('style').removeProperty('display');
                                renderPresent(div, orderItem);
                                options.presentOrderItem = orderItem;
                                if (args.type == 0) {
                                    //如為加入訂購則跳到無促案
                                    options.presentNextStep = moveType.mResvTime;
                                }
                                else {
                                    //如繼續訂購則跳到訂購
                                    options.presentNextStep = moveType.mProm;
                                }
                                moveTo(div, moveType.mChoosePresent);
                            }
                            else {
                                getControlObject(div, 'gbxPresent').css('display', 'none');
                                getControlObject(div, 'btnPresent').css('display', 'none');
                                //如為加入訂購則跳到無促案
                                if (args.type == 0) {
                                    moveTo(div, moveType.mResvTime);
                                    getControlObject(div, 'dvResvTime')['SO1144B8']("focus");
                                }
                                else {
                                    //如繼續訂購則跳到訂購
                                    moveTo(div, moveType.mProm);
                                }
                            }
                            disableAll(div, false);
                        }
                        catch (err) {
                            errorHandle(formName, 'blockAddHandler_dvSaleProd_chooseOk_setChildParameters', err);
                        }
                    });
                }
                catch (err) {
                    errorHandle(formName, 'blockAddHandler_dvSaleProd_chooseOk', err);
                }
            });
            //贈品選取 SO1144K
            getControlObject(div, 'dvPresent').on('chooseOk', function (e) {
                try {
                    disableAll(div, true);
                    var args = e.args;
                    deleteOrderItem(div, options.presentOrderItem);
                    mergeOrderData(div, args.orderData);
                    delete args;
                    setChildParameters(div, 3, options.orderData, function (r) {
                        getControlObject(div, 'gbxPresent').css('display', 'none');
                        getControlObject(div, 'btnPresent').css('display', 'none');
                        moveTo(div, options.presentNextStep);
                        if (options.presentNextStep = moveType.mResvTime) {
                            getControlObject(div, 'dvResvTime')['SO1144B8']("focus");
                        }
                        disableAll(div, false);
                    });
                }
                catch (err) {
                    errorHandle(formName, 'blockAddHandler_dvNoProm_chooseOk', err);
                }
            });
            //無促案 SO1144B4
            getControlObject(div, 'dvNoProm').on('chooseOk', function (e) {
                try {
                    disableAll(div, true);
                    var args = e.args;
                    delete options.calculateData;
                    options.calculateData = args.calculateData;
                    renderControl2(div, function () {
                        setChildParameters(div, 4, args.orderData, function (r) {
                            disableAll(div, false);
                        });
                    });
                }
                catch (err) {
                    errorHandle(formName, 'blockAddHandler_dvNoProm_chooseOk', err);
                }
            });
            //改下期繳別 SO1144B5
            getControlObject(div, 'dvChangeNextPeriod').on('chooseOk', function (e) {
                disableAll(div, true);
                var args = e.args;
                options.nextPeriod = args.nextPeriod;
                setChildParameters(div, 5, options.orderData, function (r) {
                    disableAll(div, false);
                }, false);
            });
            //改繳款日 SO1144B7
            getControlObject(div, 'dvPayDate').on('chooseOk', function (e) {
                disableAll(div, true);
                var args = e.args;
                options.payDate = args.payDate;
                setChildParameters(div, 7, options.orderData, function (r) {
                    disableAll(div, false);
                });
            });
            //預約時間 SO1144B8
            getControlObject(div, 'dvResvTime').on('chooseOk', function (e) {
                try {
                    var args = e.args;
                    if (args.isOk == false) {
                        moveTo(div, moveType.mProm);
                        return;
                    }
                    disableAll(div, true);
                    var reCalculate;
                    if (options.resvTime != null && formatDateTime(options.resvTime, 'date') == formatDateTime(args.resvTime, 'date')) {
                        reCalculate = false;
                    }
                    options.resvTime = args.resvTime;
                    options.groupNo = args.groupNo;
                    options.resvType = args.resvType;
                    options.resvSNo = args.resvSNo;
                    options.workServCode = args.workServCode;
                    options.groupCode = args.groupCode;
                    delete options.calculateData;
                    options.calculateData = args.calculateData;
                    options.orderData[orderTableName].rows[0]['RESVTIME'] = new Date(options.resvTime);
                    options.orderData[orderTableName].rows[0]['groupNo'.toUpperCase()] = convertToNull(options.groupNo);
                    options.orderData[orderTableName].rows[0]['resvType'.toUpperCase()] = convertToNull(options.resvType);
                    options.orderData[orderTableName].rows[0]['resvSNo'.toUpperCase()] = convertToNull(options.resvSNo);
                    var rows = options.orderData[wipTableName].rows;
                    for (var i = 0; i < rows.length; i++) {
                        rows[i]['RESVTIME'] = new Date(options.resvTime);
                        rows[i]['groupNo'.toUpperCase()] = convertToNull(options.groupNo);
                        rows[i]['resvType'.toUpperCase()] = convertToNull(options.resvType);
                        rows[i]['resvSNo'.toUpperCase()] = convertToNull(options.resvSNo);
                        if (isEmpty(options.workServCode) == false) {
                            rows[i]['servCode'.toUpperCase()] = convertToNull(options.workServCode);
                        }
                        rows[i]['groupCode'.toUpperCase()] = convertToNull(options.groupCode);
                    }
                    delete e.args;
                    setChildParameters(div, 8, options.orderData, function (r) {
                        if (options.editMode == editMode.append) {
                            moveTo(div, moveType.mCalculte);
                        }
                        disableAll(div, false);
                    }, reCalculate);
                }
                catch (err) {
                    errorHandle(formName, 'blockAddHandler_dvResvTime_chooseOk', err);
                }
            });
            //預約時間 SO1144B8
            getControlObject(div, 'dvResvTime').on('clickChild', function (e) {
                try {
                    refresh(div);
                }
                catch (err) {
                    errorHandle(formName, 'dvResvTime_clickChild', err);
                }
            });

            //訂購明細 SO1144BA
            getControlObject(div, 'dvOrderList').on('chooseOk', function (e) {
                try {
                    disableAll(div, true);
                    var args = e.args;
                    //刪除
                    if (args.type == 3) {
                        setChildParameters(div, "A", args.orderData, function (r) {
                            disableAll(div, false);
                        });
                    }
                        //修改
                    else {
                        if (args.orderItem['BPCODE'] != null) {
                            var args = {
                                row: args.orderItem,
                                editMode: editMode.edit
                            };
                            getControlObject(div, 'dvSaleProd')['SO1144B2']('refresh', args, function (r) {
                                moveTo(div, moveType.mChooseProd);
                            });
                        }
                        else {
                            var args = {
                                row: args.orderItem,
                                editMode: editMode.edit
                            };
                            getControlObject(div, 'dvNoProm')['SO1144B4']('refresh', args, function (r) {
                                moveTo(div, moveType.mNoProm);
                            });
                        }
                        disableAll(div, false);

                    }
                }
                catch (err) {
                    errorHandle(formName, 'blockAddHandler_dvOrderList_chooseOk', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'blockAddHandler', err);
        }
    };
    function setChildParameters(div, idx, inData, action, reCalculate) {
        try {
            var options = $.data(div, formName).options;
            if (options.refreshParameters == true) {
                action(true);
                return;
            }
            options.refreshParameters = true;
            if (options.orderData != inData) {
                delete options.orderData;
                options.orderData = inData;
            }
            getOrderItemData(div);
            if (options.orderData[orderItemTableName].rows.length == 0) {
                options.period = 0;
                options.nextPeriod = 0;
                options.payDate = null;
                options.resvTime = null;
            }
            if (options.loading != true) {
                getControlObject(div, 'dvProdProm')['SO1144B1']('clear');
                getControlObject(div, 'dvSaleProd')['SO1144B2']('clear');
                getControlObject(div, 'dvNoProm')['SO1144B4']('clear');
            }
            //getControlObject(div, 'dvProdProm')['SO1144B1']({ orderData: options.orderData });
            getControlObject(div, 'dvSaleProd')['SO1144B2']({ orderItem: options.orderItem, orderData: options.orderData });
            getControlObject(div, 'dvNoProm')['SO1144B4']({ orderItem: options.orderItem, orderData: options.orderData });

            getControlObject(div, 'dvChangeNextPeriod')['SO1144B5']({ orderData: options.orderData });
            getControlObject(div, 'dvPayDate')['SO1144B7']({ orderData: options.orderData });
            getControlObject(div, 'dvResvTime')['SO1144B8']({ orderData: options.orderData });
            getControlObject(div, 'dvResvTime')['SO1144B8']('displayCopyTime');
            getControlObject(div, 'dvMedia')['SO1144B9']({ orderData: options.orderData });
            getControlObject(div, 'dvOrderList')['SO1144BA']({ orderData: options.orderData });
            if (idx.toString() != '5') {
                var rows = options.orderData[chargeTableName].rows;
                var nextPeriod = 0;
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i]['NEXTPERIOD'] != null) {
                        nextPeriod = rows[i]['NEXTPERIOD'];
                        break;
                    }
                }
                if (nextPeriod == 0) {
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i]['PERIOD'] != null && rows[i]['PERIOD'] > 0 && rows[i]['AMOUNT'] >= 0) {
                            nextPeriod = rows[i]['PERIOD'];
                            break;
                        }
                    }
                }
                if (nextPeriod > 0) {
                    getControlObject(div, 'dvChangeNextPeriod')['SO1144B5']('setNextPeriod', nextPeriod);
                }
            }
            if (idx.toString() != '7') {
                getControlObject(div, 'dvPayDate')['SO1144B7']('setPayDate', options.resvTime, options.period);
            }
            changeNextPeriod(div);
            changePayDate(div);
            if (idx.toString() != 'A') {
                getControlObject(div, 'dvOrderList')['SO1144BA']('refresh');
            }
            if (reCalculate != false) {
                showBuyStatus(div);
                refreshCalculate(div, function (r) {
                    options.calculateData = null;
                    options.refreshParameters = false;
                    action(r);
                });
            }
            else {
                options.refreshParameters = false;
                action(true);
            }
        }
        catch (err) {
            errorHandle(formName, 'setChildParameters', err);
        }
    }
    //更新試算
    function refreshCalculate(div, action) {
        try {
            var options = $.data(div, formName).options;
            var data = null;
            if (options.calculateData != null && Object.keys(options.calculateData).length > 0) {
                data = options.calculateData;
            }
            getControlObject(div, 'dvCalculate')['SO1144L']({ parameters: options.orderData, resvTime: options.resvTime, calculateData: data });
            getControlObject(div, 'dvCalculate')['SO1144L']('refresh', function (r) {
                action(r);
            });
            return true;
        }
        catch (err) {
            errorHandle(formName, 'refreshCalculate', err);
        }
    };
    //顯示訂購清單
    function showBuyStatus(div) {
        try {
            var options = $.data(div, formName).options;
            //var tables = [wipTableName, productTableName, facilityTableName, chargeTableName];
            //var orderItems = [];
            //for (var i = 0 ; i < tables.length; i++) {
            //    var rows = options.orderData[tables[i]].rows;
            //    for (j = 0; j < rows.length; j++) {
            //        var orderItem = 0;
            //        if (rows[j]['orderItem'.toUpperCase()] != null) orderItem = rows[j]['orderItem'.toUpperCase()];
            //        var filterRow = getRowByKeyValue(orderItems, 'orderItem', orderItem);
            //        if (filterRow == null) {
            //            orderItems.push({ orderItem: orderItem, BPCODE: rows[j]['BPCODE'] });
            //        }
            //        else {
            //            if (filterRow['BPCODE'] == null) {
            //                filterRow['BPCODE'] = rows[j]['BPCODE'];
            //            }
            //        }
            //    }
            //}
            //var productCount = 0;
            //var productRows = options.orderData[productTableName].rows;
            //for (j = 0; j < productRows.length; j++) {
            //    if (productRows[j]['BPCODE'] != null) {
            //        productCount += 1;
            //    }
            //}
            //var promCount = 0;
            //var noPromCount = 0;
            //for (var i = 0; i < orderItems.length; i++) {
            //    if (orderItems[i]['BPCODE'] == null) {
            //        noPromCount += 1;
            //    }
            //    else {
            //        promCount += 1;
            //    }
            //}
            var productCount = 0;
            var productRows = options.orderData[productTableName].rows;
            for (j = 0; j < productRows.length; j++) {
                if (productRows[j]['BPCODE'] != null) {
                    productCount += 1;
                }
            }
            var promCount = 0;
            var noPromCount = 0;
            var rows = options.orderData[orderItemTableName].rows;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['BPCODE'] == null) {
                    noPromCount += 1;
                }
                else {
                    promCount += 1;
                }
            }
            var lang = options.language;
            getControlObject(div, 'gbxPromList').text(lang.buyPromCount.replace('{0}', promCount) + ', ' + lang.buyProductCount.replace('{0}', productCount));
            getControlObject(div, 'gbxPresentList').text(lang.presentCount.replace('{0}', options.orderData[presentTableName].rows.length));
            getControlObject(div, 'gbxNoPromList').text(lang.buyNoPromCount.replace('{0}', noPromCount));

        }
        catch (err) {
            errorHandle(formName, 'showBuyStatus', err);
        }
    }
    function disableAll(div, flag) {
        if (flag == true) {
            //getControlObject(div, 'gbxAll').attr('disabled', true);
            showIndicator(true, div);
        }
        else {
            showIndicator(false, div);
            //getControlObject(div, 'gbxAll').removeAttr('disabled');
        }
    }
    function getScrollTop(div, idx) {
        try {
            var bottomId = getControlObject(div, 'gbxBottom').prop('id');
            var gbxB;
            if ($('#panelContent' + bottomId).length > 0) {
                gbxB = $('#panelContent' + bottomId);
            }
            else {
                gbxB = getControlObject(div, 'gbxBottom');
            }
            var tLength = gbxB.children().length;
            var height = 0;
            for (var i = 0; i < tLength; i++) {
                if (i >= idx) break;
                if ($(gbxB.children()[i]).css('display') != 'none') {
                    //if ($(gbxB.children()[i]).hasClass('jqx-expander') == true) {
                    //    height += $(gbxB.children()[i]).height();
                    //}
                    //else {
                    //    if ($(gbxB.children()[i]).find('.jqx-expander').length > 0) {
                    //        height += $($(gbxB.children()[i]).find('.jqx-expander')[0]).height();
                    //    }
                    //    else {
                    //        height += $(gbxB.children()[i]).height();
                    //    }
                    //}
                    height += $(gbxB.children()[i]).height();
                    height += 2;
                }
            }
            return height;
        }
        catch (err) {
            errorHandle(formName, 'getScrollTop', err);
        }
    };
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //移動捲軸
            //var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            var btns = ["btnProposer", "btnNoProm", "btnProdProm", "btnSaleProd", "btnPresent",
                        "btnChangeNextPeriod,btnPayDate", "btnResvTime,btnMedia", "btnOrderList", "btnCalculate"];
            var time = 100;
            for (var i = 0; i < btns.length; i++) {
                var btnSP = btns[i].split(',');
                for (var j = 0; j < btnSP.length; j++) {
                    getControlObject(div, btnSP[j]).on('click', { idx: i }, function (e) {
                        var args = e.data;
                        moveTo(div, args.idx);
                    });
                }
            }
            //存檔
            getControlObject(div, 'btnSave').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (isDataOk(div) != true) return;
                if (scrToRcd(div) != true) return;
                if (appendUIParameter(div) != true) return;
                //$(options.container).css('display', 'none');
                save(div, function (r) {
                    if (r[0] == true) {
                        options.isSaved = true;
                        close(div);
                    }
                    else if (r[1] != null) {
                        //$(options.container).prop('style').removeProperty('display');
                        messageBox(r[1]);
                    }
                });
            });
            getControlObject(div, 'btnBuy').on('click', function () {
                moveTo(div, moveType.mOrderList);
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if (options.custId == -1) {
                messageBox(lang.noCustomer);
                moveTo(div, moveType.mProposer);
                return false;
            }
            //檢核申請人

            //檢核產品
            if (options.orderData[productTableName].rows.length == 0 &&
                options.orderData[chargeTableName].rows.length == 0) {
                messageBox(lang.pleaseChooseProduct);
                moveTo(div, moveType.mProm);
                return false;
            }
            //檢核設備
            //檢核收費
            //檢核贈品
            //檢核預約時間
            var resvOk = getControlObject(div, 'dvResvTime')['SO1144B8']('isDataOk');
            if (resvOk != true) {
                moveTo(div, moveType.mResvTime);
                getControlObject(div, 'dvResvTime')['SO1144B8']("focus");
                return false;
            }
            //檢核介紹媒介
            var mediaOk = getControlObject(div, 'dvMedia')['SO1144B9']('isDataOk');
            if (mediaOk != true) {
                moveTo(div, moveType.mMedia);
                return false;
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    }
    function scrToRcdMedia(div) {
        try {
            var options = $.data(div, formName).options;
            //回填申請人
            var mediaData = getControlObject(div, 'dvMedia')['SO1144B9']("getMediaData");
            var row = options.orderData[orderTableName].rows[0];
            row['mediaCode'.toUpperCase()] = convertToNull(mediaData['mediaCode']);
            row['mediaName'.toUpperCase()] = convertToNull(mediaData['mediaName']);
            row['introId'.toUpperCase()] = convertToNull(mediaData['introId']);
            row['introName'.toUpperCase()] = convertToNull(mediaData['introName']);
            row['bulletinCode'.toUpperCase()] = convertToNull(mediaData['bulletinCode']);
            row['bulletinName'.toUpperCase()] = convertToNull(mediaData['bulletinName']);
            row['note'.toUpperCase()] = convertToNull(mediaData['note']);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'scrToRcdMedia', err);
        }
    }
    function scrToRcdChange(div) {
        try {
            var options = $.data(div, formName).options;
            //回填申請人
            var resvData = getControlObject(div, 'dvResvTime')['SO1144B8']("getResvData");
            options.orderData[changeTableName].rows = [];
            var rLength = options.orderData[wipTableName].rows.length;
            for (var i = 0 ; i < rLength; i++) {
                var row = {};
                row['ServiceType'.toUpperCase()] = options.orderData[wipTableName].rows[i]['ServiceType'.toUpperCase()];
                row['ReturnCode'.toUpperCase()] = convertToNull(resvData['returnCode']);
                row['ReturnName'.toUpperCase()] = convertToNull(resvData['returnName']);
                row['SNO'] = options.orderData[wipTableName].rows[i]['SNO'];
                var oRow = getRowByKeyValue(options.oldWipData.rows, 'SNO', row['SNO']);
                if (oRow != null) {
                    row['resvTime'.toUpperCase()] = convertToNull(oRow['resvTime'.toUpperCase()]);
                }
                row['NresvTime'.toUpperCase()] = options.orderData[wipTableName].rows[i]['resvTime'.toUpperCase()];
                options.orderData[changeTableName].rows.push(row);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'scrToRcdChange', err);
        }
    }
    function scrToRcd(div) {
        try {
            var options = $.data(div, formName).options;
            //回填申請人
            var proposer = getControlObject(div, 'dvProposer')['SO1144B6']('getData');
            delete options.orderData[proposerTableName];
            options.orderData[proposerTableName] = proposer[proposerTableName];
            //介紹人
            if (scrToRcdMedia(div) != true) return;
            //促案名稱
            var rLength = options.orderData[productTableName].rows.length;
            if (rLength > 0) {
                options.orderData[orderTableName].rows[0]['PROMCODE'] = options.orderData[productTableName].rows[0]['PROMCODE'];
                options.orderData[orderTableName].rows[0]['PROMNAME'] = options.orderData[productTableName].rows[0]['PROMNAME'];
            }
            //互動單號
            if (options.parameters[contactTableName] != null && options.parameters[contactTableName].rows.length > 0) {
                options.orderData[orderTableName].rows[0]['CallSeqNo'.toUpperCase()] = options.orderData[productTableName].rows[0]['SEQNO'];
                options.orderData[orderTableName].rows[0]['SEQNO'] = options.orderData[productTableName].rows[0]['SEQNO'];
            }
            //修改時需有修改原因
            if (options.editMode == editMode.edit) {
                scrToRcdChange(div);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'scrToRcd', err);
        }
    }
    function appendUIParameter(div) {
        try {
            var options = $.data(div, formName).options;
            var table = {
                columns: [
                    { name: "CATVTIME", type: 'integer' },
                    { name: "DTVTIME", type: 'integer' }],
                rows: []
            };
            var row = {};
            var resvRow = getControlObject(div, 'dvResvTime').SO1144B8('getResvData');
            row['CATVTIME'] = convertToNull(resvRow['CATVTime'], true);
            row['DTVTIME'] = convertToNull(resvRow['DTVTime'], true);
            table.rows.push(row);
            options.orderData["UIParameters"] = table;
            return true;
        }
        catch (err) {
            errorHandle(formName, 'appendUIParameter', err);
        }
    }
    function save(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                editMode: { type: 'integer', value: options.editMode },
                orderData: { type: 'string', value: JSON.stringify(options.orderData) },
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'Save',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    //messageBox(JSON.stringify(data));
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

    function close(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.container != null) {
                var lang = options.language;
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    if (options.editMode != editMode.view && options.isSaved != true && options.isTest != true) {
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
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };
})(jQuery);