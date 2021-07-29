(function ($) {
    var formName = 'SO1132C';
    var riadllName = 'CableSoft.SO.RIA.Billing.BillCombine.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.BillCombine.Web.dsBillCombine';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 28;
    var billCombineTableName = "BillCombine";
    var contactTableName = "Contact";
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
                        options: $.extend({}, new defaults(), new SO1132C(), options)
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
            var height = $(div).height();
            var bHeight = buttonsHeight + 2;
            getControlObject(div, 'gbxSource').jqxExpander({ height: height * 0.4 });
            getControlObject(div, 'gbxTarget').jqxExpander({ height: height - (height * 0.4) - bHeight - 80 });
            getControlObject(div, 'gbxButton').css({ height: bHeight });
            var tContentHeight = getControlObject(div, 'gbxSourceContent').height();
            getControlObject(div, 'gbxSourceTop').css({ height: tContentHeight - bHeight - 10 });
            getControlObject(div, 'gbxSourceBottom').css({ height: bHeight });
            var bContentHeight = getControlObject(div, 'gbxTargetContent').height();
            getControlObject(div, 'dgTarget').jqxGrid({ height: bContentHeight - bHeight - 4 });
            getControlObject(div, 'gbxTargetTop').css({ height: bHeight });
            //gbxSourceTop
            //拆單功能
            getControlObject(div, 'gbxSourcePR').jqxExpander({ height: height });
            //tContentHeight = getControlObject(div, 'gbxSourcePRContent').height();
            //getControlObject(div, 'gbxSourcePRTop').css({ height: tContentHeight - bHeight - 10 });
            getControlObject(div, 'btnOkPR').find('span').css('top', '6px');
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
    function checkParameters(data) {
        try {
            //檢核table 存不存在
            var table = billCombineTableName;
            if (data[table] == null) return ([false, 'table ' + billCombineTableName + ' not exist!!']);
            //檢核客戶編號
            if (data[table].rows[0]['CustId'.toUpperCase()] == null) {
                return ([false, 'column custid not exist!!']);
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
                        changeElementId(div);
                        init(div, function () {
                            frmAddHandler(div);
                            buttonAddHandler(div);
                            checkParameters(options.parameters);
                            $(div).triggerHandler('loaded');
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
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div, formName);
            renderControl(div);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            formResize(div);
            getCombine(div, function (r) {
                if (r[0]) {
                    addHandler(div);
                    refreshGrid(div);
                    //拆單功能
                    refreshPRGrid(div);
                    combineAmt(div);
                    action(true);
                }
                else if (r[1] != null) {
                    messageBox(r[1]);
                    action(false);
                }
            });
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
            //建立csTabs
            oArray = ['tabControl'];
            var tabId = $(div).prop('id') + oArray[0];
            $('#' + tabId).csTabs({
                theme: options.theme,
                width: 'auto',
                height: '93.5%',
                selectionTracker: true,
                animationType: 'fade',
                scrollable: true
            });
            controls.push({ name: tabId, type: 'csTabs', level: level });
            level += 1;
            //建立內層Expander
            //var tabHeight = $('#' + tabId).height();
            oArray = ['gbxSource', 'gbxTarget','gbxSourcePR'];
            //oHightArray = [tabHeight * 0.4, tabHeight * 0.2];
            oWidthArray = ['100%', '100%', '100%'];
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
            //建立CheckBox
            oArray = ['chkBillNo', 'chkAccountNo', 'chkFaciSeqNo','chkDeclarantName'];
            oWidthArray = ['100', '100', '100', '100'];
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
            //建立按鈕
            oArray = ['btnOk', 'btnQuit', 'btnSO1132D1', 'btnOkPR'];
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
                    case "btnQuit":
                        img = imageScr.exit;
                        break;
                    case "btnSO1132D1":
                        img = imageScr.edit;
                        width = 120;
                        break;
                    case "btnOkPR":
                        img = imageScr.edit;
                        width = 120;
                        break;
                }
                o.text(text);
                o.jqxButton($.extend({}, img, imagePosition, {
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                }));
                controls.push({ name: bId, type: 'jqxButton', level: level });
            }
            renderLeftGrid(div, level);
            renderRightGrid(div, level);
            renderTargetGrid(div, level);

            //合併的UI模組 產生媒體單號
            oArray = ['SO1132D'];
            var eleId = $(div).prop('id') + oArray[0];
            $('#' + eleId).SO1132D({
                loginInfo: options.loginInfo,
                theme: $.jqx.theme,
                container: getControlObject(div, 'tabControl'),
                parameters: options.parameters,
                editMode: editMode.edit,
                localization: $.jqx.localization
            });
            controls.push({ name: eleId, type: 'SO1132D', level: level });


            //拆單功能
            renderPRLeftGrid(div, level);
            renderPRRightGrid(div, level);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function getCombine(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var custId = options.parameters[billCombineTableName].rows[0]["CUSTID"];
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId }
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'GetCombine',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    if (data != undefined && data.ErrorCode == 0) {
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
                    } else {
                        if (typeof data === 'string') {
                            messageBox(data, messageType.critical);
                        } else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getCombine', err);
        }
    };
    function combineAmt(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.initData['GetCombine'].rows.length > 0) {
                var idx = getControlObject(div, 'dgLeft').jqxGrid('getselectedrowindex');
                var amount = getControlObject(div, 'dgLeft').jqxGrid('getrowdata', idx)['SHOULDAMT'];
                var targetRows = getControlObject(div, 'dgTarget').jqxGrid('getrows');
                for (var i = 0; i < targetRows.length; i++) {
                    if (targetRows[i]['CHOOSE'] == true) {
                        amount += targetRows[i]['SHOULDAMT'];
                    }
                }
                getControlObject(div, "lCombineAmt").text(options.language.lCombineAmt);
                getControlObject(div, "lCombineAmt2").text(commaSeparateNumber(amount));
            }
        }
        catch (err) {
            errorHandle(formName, 'combineAmt', err);
        }
    };
    function refreshGrid(div) {
        try {
            var options = $.data(div, formName).options;

            options.leftGridSource.localdata = options.initData[Object.keys(options.initData)[0]].rows;
            getControlObject(div, 'dgLeft').jqxGrid('updatebounddata');
            if (options.leftGridSource.localdata.length > 0) {
                getControlObject(div, 'dgLeft').jqxGrid('selectrow', 0);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };
    function refreshRightGrid(div) {
        try {
            var options = $.data(div, formName).options;

            options.rightGridSource.localdata = options.rightData[Object.keys(options.rightData)[0]].rows;
            getControlObject(div, 'dgRight').jqxGrid('updatebounddata');
            if (options.rightGridSource.localdata.length > 0) {
                getControlObject(div, 'dgRight').jqxGrid('selectrow', 0);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshRightGrid', err);
        }
    };
    function refreshTargetGrid(div) {
        try {
            var options = $.data(div, formName).options;

            options.targetGridSource.localdata = options.targetData[Object.keys(options.targetData)[0]].rows;
            getControlObject(div, 'dgTarget').jqxGrid('updatebounddata');
            if (options.targetGridSource.localdata.length > 0) {
                getControlObject(div, 'dgTarget').jqxGrid('selectrow', 0);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshTargetGrid', err);
        }
    };
    function renderLeftGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgLeft';
            options.leftGridSource = {
                datatype: "json",
                datafields: [
                    { name: 'MEDIABILLNO', type: 'string' },
                    { name: 'SHOULDAMT', type: 'float' }
                ]
            };

            var dataAdapter = new $.jqx.dataAdapter(options.leftGridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '23%',
                height: '100%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                editable: false,
                columns: [
                    getGridRowNumberColumn(null, 30),
                    { text: lang.dgLeft_MEDIABILLNO, editable: false, align: 'center', datafield: 'MEDIABILLNO', width: 100 },
                    { text: lang.dgLeft_SHOULDAMT, editable: false, cellsalign: 'right', align: 'right', cellsformat: 'c', datafield: 'SHOULDAMT', width: 70 }
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderLeftGrid', err);
        }
    };
    function renderRightGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgRight';
            options.rightGridSource = {
                datatype: "json",
                datafields: [
                    { name: 'BILLNO', type: 'string' },
                    { name: 'MEDIABILLNO', type: 'string' },
                    { name: 'BANKCODE', type: 'int' },
                    { name: 'ACCOUNTNO', type: 'string' },
                    { name: 'DECLARANTNAME', type: 'string' },
                    { name: 'FACISNO', type: 'string' },
                    { name: 'CITEMNAME', type: 'string' },
                    //{ name: 'OLDAMT', type: 'float' },
                    { name: 'SHOULDAMT', type: 'float' },
                    { name: 'REALPERIOD', type: 'int' },
                    { name: 'REALSTARTDATE', type: 'date' },
                    { name: 'REALSTOPDATE', type: 'date' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.rightGridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '76%',
                height: '100%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                editable: false,
                columns: [
                    getGridRowNumberColumn(null, 30),
                    { text: lang.dgRight_BILLNO, editable: false, align: 'center', datafield: 'BILLNO', width: 130 },
                    { text: lang.dgRight_ACCOUNTNO, editable: false, align: 'center', datafield: 'ACCOUNTNO', width: 140 },
                    { text: lang.dgRight_DECLARANTNAME, editable: false, align: 'center', datafield: 'DECLARANTNAME', width: 90 },
                    { text: lang.dgRight_FACISNO, editable: false, align: 'center', datafield: 'FACISNO', width: 100 },
                    { text: lang.dgRight_CITEMNAME, editable: false, align: 'center', datafield: 'CITEMNAME', width: 160 },
                  //{ text: lang.dgRight_OLDAMT, editable: false,align: 'right', datafield: 'OLDAMT', width: 60, cellsformat: 'c', cellsrenderer: minusColorRed },
                    { text: lang.dgRight_SHOULDAMT, editable: false, cellsalign: 'right', align: 'right', datafield: 'SHOULDAMT', width: 60, cellsformat: 'c', cellsrenderer: minusColorRed },
                    { text: lang.dgRight_REALPERIOD, editable: false, cellsalign: 'right', align: 'right', datafield: 'REALPERIOD', width: 40 },
                    { text: lang.dgRight_REALSTARTDATE, editable: false, align: 'center', datafield: 'REALSTARTDATE', width: 90, cellsformat: 'yyyy/MM/dd' },
                    { text: lang.dgRight_REALSTOPDATE, editable: false, align: 'center', datafield: 'REALSTOPDATE', width: 90, cellsformat: 'yyyy/MM/dd' }
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderRightGrid', err);
        }
    };
    function minusColorRed(row, field, value, defaulthtml, columnproperties) {
        var val = $(defaulthtml);
        if (value < 0) {
            val.css('color', 'red');
        }
        return val[0].outerHTML;
    };
    function renderTargetGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgTarget';
            options.targetGridSource = {
                datatype: "json",
                datafields: [
                    { name: 'CHOOSE', type: 'bool' },
                    { name: 'MEDIABILLNO', type: 'string' },
                    { name: 'CITIBANKATM', type: 'string' },
                    { name: 'BILLNO', type: 'string' },
                    { name: 'ACCOUNTNO', type: 'string' },
                    { name: 'DECLARANTNAME', type: 'string' },
                    { name: 'FACISEQNO', type: 'string' },
                    { name: 'FACISNO', type: 'string' },
                    { name: 'PRODUCTCODE', type: 'int' },
                    { name: 'PRODUCTNAME', type: 'string' },
                    { name: 'CITEMNAME', type: 'string' },
                    //{ name: 'OLDAMT', type: 'float' },
                    { name: 'SHOULDAMT', type: 'float' },
                    { name: 'REALPERIOD', type: 'int' },
                    { name: 'REALSTARTDATE', type: 'date' },
                    { name: 'REALSTOPDATE', type: 'date' }
                ]
            };

            var dataAdapter = new $.jqx.dataAdapter(options.targetGridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                height: '79%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                editable: true,
                columns: [
                    getGridRowNumberColumn(null, 30),
                    { text: lang.dgTarget_CHOOSE, datafield: 'CHOOSE', sortable: false, align: 'center', columntype: 'checkbox', width: 40, pinned: true },
                    { text: lang.dgTarget_MEDIABILLNO, editable: false, align: 'center', datafield: 'MEDIABILLNO', width: 100 },
                    { text: lang.dgTarget_CITIBANKATM, editable: false, align: 'center', datafield: 'CITIBANKATM', width: 140 },
                    { text: lang.dgTarget_BILLNO, editable: false, align: 'center', datafield: 'BILLNO', width: 130 },
                    { text: lang.dgTarget_ACCOUNTNO, editable: false, align: 'center', datafield: 'ACCOUNTNO', width: 140 },
                    { text: lang.dgTarget_DECLARANTNAME, editable: false, align: 'center', datafield: 'DECLARANTNAME', width: 90 },
                    { text: lang.dgTarget_FACISNO, editable: false, align: 'center', datafield: 'FACISNO', width: 100 },
                    { text: lang.dgTarget_CITEMNAME, editable: false, align: 'center', datafield: 'CITEMNAME', width: 160 },
                  //{ text: lang.dgTarget_OLDAMT, editable: false,align: 'right', datafield: 'OLDAMT', width: 60, cellsformat: 'c', cellsalign: 'right', align: 'right', cellsrenderer: minusColorRed },
                    { text: lang.dgTarget_SHOULDAMT, editable: false, cellsalign: 'right', align: 'right', datafield: 'SHOULDAMT', width: 60, cellsformat: 'c', cellsrenderer: minusColorRed },
                    { text: lang.dgTarget_REALPERIOD, editable: false, cellsalign: 'right', align: 'right', datafield: 'REALPERIOD', width: 40 },
                    { text: lang.dgTarget_REALSTARTDATE, editable: false, align: 'center', datafield: 'REALSTARTDATE', width: 90, cellsformat: 'yyyy/MM/dd' },
                    { text: lang.dgTarget_REALSTOPDATE, editable: false, align: 'center', datafield: 'REALSTOPDATE', width: 90, cellsformat: 'yyyy/MM/dd' }
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderTargetGrid', err);
        }
    };
    //當副商品打勾時主商品也要打勾
    function checkSync(div, rowindex, noRefresh) {
        try {
            var options = $.data(div, formName).options;
            var row = getControlObject(div, 'dgTarget').jqxGrid('getrowdata', rowindex);
            var allRows = getControlObject(div, 'dgTarget').jqxGrid('getrows');
            var aLength = allRows.length;
            for (var i = 0 ; i < aLength; i++) {
                if (i != rowindex && row['PRODUCTCODE'] != null && row['PRODUCTCODE'] == allRows[i]['PRODUCTCODE'] && row['FACISEQNO'] == allRows[i]['FACISEQNO']) {
                    if (allRows[i]['CHOOSE'] != true) {
                        allRows[i]['CHOOSE'] = true;
                        checkSync(div, i, true);
                    }
                }
                options.targetData[Object.keys(options.targetData)[0]].rows[i]['CHOOSE'] = allRows[i]['CHOOSE'];
            }
            var checks = ['chkBillNo', 'chkAccountNo', 'chkFaciSeqNo','chkDeclarantName'];
            var fields = ['BillNo', 'AccountNo', 'FaciSeqNo', 'chkDeclarantName'];
            for (var j = 0; j < checks.length; j++) {
                //單據編號/帳號/設備流水號/申請人 有打勾
                if (getControlObject(div, checks[j]).jqxCheckBox('val') == true) {
                    for (var i = 0 ; i < aLength; i++) {
                        if (i != rowindex && (j == 1 || row[fields[j].toUpperCase()] != null) && row[fields[j].toUpperCase()] == allRows[i][fields[j].toUpperCase()]) {
                            if (allRows[i]['CHOOSE'] != true) {
                                allRows[i]['CHOOSE'] = true;
                                checkSync(div, i, true);
                            }
                        }
                        options.targetData[Object.keys(options.targetData)[0]].rows[i]['CHOOSE'] = allRows[i]['CHOOSE'];
                    }
                }
            }
            if (noRefresh != true) refreshTargetGrid(div);
        }
        catch (err) {
            errorHandle(formName, 'checkSync', err);
        }
    };
    //當主商品取消打勾時副商品也要取消
    function uncheckSync(div, rowindex, noRefresh) {
        try {
            var options = $.data(div, formName).options;
            var row = getControlObject(div, 'dgTarget').jqxGrid('getrowdata', rowindex);
            var allRows = getControlObject(div, 'dgTarget').jqxGrid('getrows');
            var aLength = allRows.length;
            for (var i = 0 ; i < aLength; i++) {
                if (i != rowindex && row['PRODUCTCODE'] != null && row['PRODUCTCODE'] == allRows[i]['PRODUCTCODE'] && row['FACISEQNO'] == allRows[i]['FACISEQNO']) {
                    if (allRows[i]['CHOOSE'] != false) {
                        allRows[i]['CHOOSE'] = false;
                        uncheckSync(div, i, true);
                    }
                }
                options.targetData[Object.keys(options.targetData)[0]].rows[i]['CHOOSE'] = allRows[i]['CHOOSE'];
            }
            var checks = ['chkBillNo', 'chkAccountNo', 'chkFaciSeqNo','chkDeclarantName'];
            var fields = ['BillNo', 'AccountNo', 'FaciSeqNo'];
            for (var j = 0; j < checks.length; j++) {
                //單據編號/帳號/設備流水號/申請人 有打勾
                if (getControlObject(div, checks[j]).jqxCheckBox('val') == true) {
                    for (var i = 0 ; i < aLength; i++) {
                        if (i != rowindex && (j == 1 || row[fields[j].toUpperCase()] != null) && row[fields[j].toUpperCase()] == allRows[i][fields[j].toUpperCase()]) {
                            if (allRows[i]['CHOOSE'] != false) {
                                allRows[i]['CHOOSE'] = false;
                                uncheckSync(div, i, true);
                            }
                        }
                        options.targetData[Object.keys(options.targetData)[0]].rows[i]['CHOOSE'] = allRows[i]['CHOOSE'];
                    }
                }
            }
            if (noRefresh != true) refreshTargetGrid(div);
        }
        catch (err) {
            errorHandle(formName, 'uncheckSync', err);
        }
    }

    function addHandler(div) {
        var options = $.data(div, formName).options;
        getControlObject(div, 'dgRight').on('rowselect', function (event) {
            try {
                var args = event.args;
                var rowData = args.row;
                getCombineTarget(div, rowData['mediaBillNo'.toUpperCase()], rowData['bankCode'.toUpperCase()], rowData['AccountNo'.toUpperCase()], function (r) {
                    if (r[0]) {
                        refreshTargetGrid(div);
                    }
                    else if (r[1] != null) {
                        messageBox(r[1]);
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'dgRight_rowselect', err);
            }
        });
        getControlObject(div, 'dgLeft').on('rowselect', function (event) {
            try {
                var args = event.args;
                var rowData = args.row;
                options.mediaBillNo = rowData['mediaBillNo'.toUpperCase()];
                getCombineSource(div, options.mediaBillNo, function (r) {
                    if (r[0]) {
                        refreshRightGrid(div);
                    }
                    else if (r[1] != null) {
                        messageBox(r[1]);
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'dgLeft_rowselect', err);
            }
        });
        getControlObject(div, 'dgTarget').on('cellvaluechanged', function (event) {
            try {
                var args = event.args;
                var datafield = event.args.datafield;
                if (datafield == 'CHOOSE') {
                    var rowindex = args.rowindex;
                    var value = args.newvalue;
                    //當副商品打勾時主商品也要打勾
                    if (value == true) {
                        checkSync(div, rowindex);
                    }
                    else {
                        //當主商品取消打勾時副商品也要取消
                        uncheckSync(div, rowindex);
                    }
                    combineAmt(div);
                }
            }
            catch (err) {
                errorHandle(formName, 'dgTarget_cellvaluechanged', err);
            }
        });
        var unChecked = (function (e) {
            var rows = options.targetData[Object.keys(options.targetData)[0]].rows;
            for (var i = 0 ; i < rows.length; i++) {
                rows[i]['CHOOSE'] = false;
            }
            refreshTargetGrid(div);
            combineAmt(div);
        });
        getControlObject(div, 'chkBillNo').on('unchecked', function (e) {
            unChecked(this);
        });
        getControlObject(div, 'chkAccountNo').on('unchecked', function (e) {
            unChecked(this);
        });
        getControlObject(div, 'chkFaciSeqNo').on('unchecked', function (e) {
            unChecked(this);
        });
        getControlObject(div, 'chkDeclarantName').on('unchecked', function (e) {
            unChecked(this);
        });

        //拆單功能
        getControlObject(div, 'dgPRLeft').on('rowselect', function (event) {
            try {
                var args = event.args;
                var rowData = args.row;
                options.mediaBillNoPR = rowData['mediaBillNo'.toUpperCase()];
                getPRSource(div, options.mediaBillNoPR, function (r) {
                    if (r[0]) {
                        refreshPRRightGrid(div);
                    }
                    else if (r[1] != null) {
                        messageBox(r[1]);
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'dgPRLeft_rowselect', err);
            }
        });
        getControlObject(div, 'dgPRRight').on('cellvaluechanged', function (event) {
            try {
                var args = event.args;
                if (args.datafield == 'CHOOSE') {
                    //當副商品打勾時主商品也要打勾
                    return checkSyncPR(div, args);
                }
            }
            catch (err) {
                errorHandle(formName, 'dgSO1132D_cellvaluechanged', err);
            }
        });
    };
    function getCombineSource(div, mediaBillNo, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var custId = options.parameters[billCombineTableName].rows[0]["CUSTID"];
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                mediaBillNo: { type: 'string', value: mediaBillNo }
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'GetCombineSource',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    if (data != undefined && data.ErrorCode == 0) {
                        delete parameters;
                        delete params;
                        //messageBox(JSON.stringify(data));
                        if (data.ResultBoolean == true) {
                            delete options.rightData;
                            options.rightData = JSON.parse(data.ResultXML);
                            action([true]);
                        }
                        else {
                            action([false, data.ErrorMessage]);
                        }
                    } else {
                        if (typeof data === 'string') {
                            messageBox(data, messageType.critical);
                        } else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getCombineSource', err);
        }
    };
    function getCombineTarget(div, mediaBillNo, bankCode, accountNo, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var custId = options.parameters[billCombineTableName].rows[0]["CUSTID"];
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                mediaBillNo: { type: 'string', value: mediaBillNo },
                bankCode: { type: 'string', value: convertToNull(bankCode) },
                accountNo: { type: 'string', value: convertToNull(accountNo) }
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'GetCombineTarget',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    if (data != undefined && data.ErrorCode == 0) {
                        delete parameters;
                        delete params;
                        //messageBox(JSON.stringify(data));
                        if (data.ResultBoolean == true) {
                            delete options.targetData;
                            options.targetData = JSON.parse(data.ResultXML);
                            action([true]);
                        }
                        else {
                            action([false, data.ErrorMessage]);
                        }
                    } else {
                        if (typeof data === 'string') {
                            messageBox(data, messageType.critical);
                        } else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getCombineTarget', err);
        }
    };
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //檢核是否有勾選軟開產品
            var rows = getControlObject(div, 'dgTarget').jqxGrid('getrows');
            var rLength = rows.length;
            var checkCount = 0;
            for (var i = 0 ; i < rLength; i++) {
                if (rows[i]['CHOOSE'] == true) {
                    checkCount += 1;
                }
            }
            if (checkCount == 0) {
                messageBox(lang.pleaseChooseData);
                return false;
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    };

    function buttonAddHandler(div) {
        var options = $.data(div, formName).options;
        //存檔
        getControlObject(div, 'btnOk').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            if (isDataOk(div) == false) return;
            execute(div, function (isOk, msg) {
                if (isOk == true) {
                    messageBox(options.language.executeOk, null, null, function () {
                        $('#' + $(div).prop('id') + 'btnQuit').triggerHandler('click');
                    });
                    options.isSaved = true;
                }
                else {
                    messageBox(options.language.executeError.replace('{0}', msg), messageType.critical);
                    return;
                }
            });
        });
        //取消
        getControlObject(div, 'btnQuit').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            close(div);
        });
        //重產虛擬帳號
        getControlObject(div, 'btnSO1132D1').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            var grid = getControlObject(div, 'dgLeft');
            var idx = grid.jqxGrid('getselectedrowindex');
            if (idx> -1) {
                showSO1132D1(div, grid.jqxGrid('source')._source.localdata[grid.jqxGrid('getrowboundindex', idx)]);
            } else {
                var options = $.data(div, formName).options;
                messageBox(options.language.NoFocusRow);
            }
        });
        //拆單功能
        getControlObject(div, 'btnOkPR').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            executePR(div);              
        });
        
    };
    function getExecuteData(div) {
        try {
            var options = $.data(div, formName).options;
            var data = {};
            var table = options.targetData[Object.keys(options.targetData)[0]];
            var chooseData = { columns: cloneJSON(table.columns), rows: [] };
            var gridRows = getControlObject(div, 'dgTarget').jqxGrid('getrows');
            var grLength = gridRows.length;
            for (var i = 0 ; i < grLength; i++) {
                if (gridRows[i]['CHOOSE'] == true) {
                    chooseData.rows.push(cloneJSON(table.rows[i]));
                }
            }
            data['GetCombineTarget'.toUpperCase()] = chooseData;
            data['GetCombineSource'.toUpperCase()] = cloneJSON(options.rightData[Object.keys(options.rightData)[0]]);
            if (options.parameters[contactTableName] != null) {
                data[contactTableName] = cloneJSON(options.parameters[contactTableName]);
            }
            return data;
        }
        catch (err) {
            errorHandle(formName, 'getExecuteData', err);
        }
    };
    function execute(div, action) {
        try {
            var options = $.data(div, formName).options;
            var tData = getExecuteData(div);
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                mediaBillNo: { type: 'string', value: options.mediaBillNo },
                InDataSet: { type: 'string', value: JSON.stringify(tData) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'Execute',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    if (data != undefined && data.ErrorCode == 0) {
                        parameters.length = 0;
                        parameters = null;
                        delete parameters;
                        delete tData;
                        if (data.ResultBoolean == true) {
                            action(true);
                        }
                        else {
                            action(false, data.ErrorMessage);
                        }
                    } else {
                        if (typeof data === 'string') {
                            messageBox(data, messageType.critical);
                        } else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    }
                }
            }, 600);
        }
        catch (err) {
            errorHandle(formName, 'execute', err);
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
    function showSO1132D1(div,rowData) {
        var width = 250;
        var height = 120;
        var x = ($('body').width() - width) / 2;
        var y = ($('body').height() - height) / 2;
        var winOptions = {
            width: width,
            height: height,
            //minHeight: 80,
            //minWidth: 80,
            maxWidth: $('body').width(),
            maxHeight: $('body').height(),
            position: { x: x, y: y },
            closeButtonAction: 'close',
            hasClosing: true,
            resizable: true,
            theme: $.jqx.theme
        };
        var win = createcsWindow(getControlObject(div, 'cswSO1132D1'), '重產虛擬帳號', winOptions);
        $('#' + win.contentId).SO1132D1({
            loginInfo: loginInfo,
            theme: $.jqx.theme,
            container: $('#' + win.windowId),
            parameters: toDataSet(billCombineTableName, rowData),
            editMode: editMode.edit,
            localization: $.jqx.localization,
        });
        $('#' + win.windowId).on('close', function (e) {
            $('#' + win.contentId).SO1132D1('destroy');
            $(this).csWindow('destroy');
        });
    }

    //拆單功能
    function refreshPRGrid(div) {
        try {
            var options = $.data(div, formName).options;
            options.leftPRGridSource.localdata = options.initData[Object.keys(options.initData)[1]].rows;
            getControlObject(div, 'dgPRLeft').jqxGrid('updatebounddata');
            if (options.leftPRGridSource.localdata.length > 0) {
                getControlObject(div, 'dgPRLeft').jqxGrid('selectrow', 0);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshPRGrid', err);
        }
    };
    function refreshPRRightGrid(div) {
        try {
            var options = $.data(div, formName).options;

            options.rightPRGridSource.localdata = options.rightPRData[Object.keys(options.rightPRData)[0]].rows;
            getControlObject(div, 'dgPRRight').jqxGrid('updatebounddata');
            if (options.rightPRGridSource.localdata.length > 0) {
                getControlObject(div, 'dgPRRight').jqxGrid('selectrow', 0);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshPRRightGrid', err);
        }
    };
    function renderPRLeftGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgPRLeft';
            options.leftPRGridSource = {
                datatype: "json",
                datafields: [
                    { name: 'MEDIABILLNO', type: 'string' },
                    { name: 'SHOULDAMT', type: 'float' }
                ]
            };

            var dataAdapter = new $.jqx.dataAdapter(options.leftPRGridSource);
            $('#' + gridId).jqxGrid(
                {
                    width: '23%',
                    height: '100%',
                    source: dataAdapter,
                    sortable: true,
                    altrows: true,
                    columnsresize: true,
                    columnsheight: gridHeight,
                    rowsheight: gridHeight,
                    editable: false,
                    columns: [
                        getGridRowNumberColumn(null, 30),
                        { text: lang.dgPRLeft_MEDIABILLNO, editable: false, align: 'center', datafield: 'MEDIABILLNO', width: 100 },
                        { text: lang.dgPRLeft_SHOULDAMT, editable: false, cellsalign: 'right', align: 'right', cellsformat: 'c', datafield: 'SHOULDAMT', width: 70 }
                    ],
                    theme: options.theme,
                    localization: options.localization
                });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderPRLeftGrid', err);
        }
    };
    function renderPRRightGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgPRRight';
            options.rightPRGridSource = {
                datatype: "json",
                datafields: [
                    { name: 'CHOOSE', type: 'bool' },
                    { name: 'BILLNO', type: 'string' },
                    { name: 'MEDIABILLNO', type: 'string' },
                    { name: 'BANKCODE', type: 'int' },
                    { name: 'ACCOUNTNO', type: 'string' },
                    { name: 'DECLARANTNAME', type: 'string' },
                    { name: 'FACISNO', type: 'string' },
                    { name: 'CITEMNAME', type: 'string' },
                    //{ name: 'OLDAMT', type: 'float' },
                    { name: 'SHOULDAMT', type: 'float' },
                    { name: 'REALPERIOD', type: 'int' },
                    { name: 'REALSTARTDATE', type: 'date' },
                    { name: 'REALSTOPDATE', type: 'date' },
                    { name: 'ITEM', type: 'int' },
                    { name: 'STEPNO', type: 'int' },
                    { name: 'LINKKEY', type: 'int' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.rightPRGridSource);
            $('#' + gridId).jqxGrid(
                {
                    width: '76%',
                    height: '100%',
                    source: dataAdapter,
                    sortable: true,
                    altrows: true,
                    columnsresize: true,
                    columnsheight: gridHeight,
                    rowsheight: gridHeight,
                    editable: true,
                    columns: [
                        getGridRowNumberColumn(null, 30),
                        { text: lang.CHOOSEPR, datafield: 'CHOOSE', sortable: false, columntype: 'checkbox', align: 'center', width: 40, pinned: true },
                        { text: lang.dgPRRight_BILLNO, editable: false, align: 'center', datafield: 'BILLNO', width: 130 },
                        { text: lang.dgPRRight_ACCOUNTNO, editable: false, align: 'center', datafield: 'ACCOUNTNO', width: 140 },
                        { text: lang.dgPRRight_DECLARANTNAME, editable: false, align: 'center', datafield: 'DECLARANTNAME', width: 90 },
                        { text: lang.dgPRRight_FACISNO, editable: false, align: 'center', datafield: 'FACISNO', width: 100 },
                        { text: lang.dgPRRight_CITEMNAME, editable: false, align: 'center', datafield: 'CITEMNAME', width: 160 },
                        //{ text: lang.dgPRRight_OLDAMT, editable: false,align: 'right', datafield: 'OLDAMT', width: 60, cellsformat: 'c', cellsrenderer: minusColorRed },
                        { text: lang.dgPRRight_SHOULDAMT, editable: false, cellsalign: 'right', align: 'right', datafield: 'SHOULDAMT', width: 60, cellsformat: 'c', cellsrenderer: minusColorRed },
                        { text: lang.dgPRRight_REALPERIOD, editable: false, cellsalign: 'right', align: 'right', datafield: 'REALPERIOD', width: 40 },
                        { text: lang.dgPRRight_REALSTARTDATE, editable: false, align: 'center', datafield: 'REALSTARTDATE', width: 90, cellsformat: 'yyyy/MM/dd' },
                        { text: lang.dgPRRight_REALSTOPDATE, editable: false, align: 'center', datafield: 'REALSTOPDATE', width: 90, cellsformat: 'yyyy/MM/dd' }
                    ],
                    theme: options.theme,
                    localization: options.localization
                });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderPRRightGrid', err);
        }
    };
    function getPRSource(div, mediaBillNo, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var custId = options.parameters[billCombineTableName].rows[0]["CUSTID"];
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                mediaBillNo: { type: 'string', value: mediaBillNo }
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'GetPRSource',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    if (data != undefined && data.ErrorCode == 0) {
                        delete parameters;
                        delete params;
                        //messageBox(JSON.stringify(data));
                        if (data.ResultBoolean == true) {
                            delete options.rightPRData;
                            options.rightPRData = JSON.parse(data.ResultXML);
                            action([true]);
                        }
                        else {
                            action([false, data.ErrorMessage]);
                        }
                    } else {
                        if (typeof data === 'string') {
                            messageBox(data, messageType.critical);
                        } else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getPRSource', err);
        }
    };
    function executePR(div) {
        var grid = getControlObject(div, 'dgPRRight');
        //var chooseRows = getChooseRows(grid.jqxGrid('source').records);
        var chooseRows = grid.jqxGrid('source').records;
        if (chooseRows.length > 0) {
            try {
                var options = $.data(div, formName).options;
                var tData = toDataSets(billCombineTableName, chooseRows);
                var paraLoginInfo = getParaLoginInfo(div, formName);
                var parameters = $.extend({}, paraLoginInfo, {
                    mediaBillNo: { type: 'string', value: options.mediaBillNoPR },
                    InDataSet: { type: 'string', value: JSON.stringify(tData) }
                });
                var params = getParameters(riadllName,
                    riaClassName,
                    'ExecutePR',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        if (data != undefined && data.ErrorCode == 0) {
                            parameters.length = 0;
                            parameters = null;
                            delete parameters;
                            delete tData;
                            if (data.ResultBoolean == true) {
                                action(true);
                            }
                            else {
                                action(false, data.ErrorMessage);
                            }
                        } else {
                            if (typeof data === 'string') {
                                messageBox(data, messageType.critical);
                            } else {
                                messageBox(data.ErrorMessage, messageType.critical);
                            }
                        }
                    }
                }, 600);
            }
            catch (err) {
                errorHandle(formName, 'execute', err);
            }
        } else {
            messageBox(lang.NoChoose);
        }
    }
    function toDataSets(tbName, rowData) {
        try {
            var ds = {},
                columns = [],
                rows = [],
                sType = '',
                keys = Object.keys(rowData[0]);

            for (var i = 0, cnt = keys.length; i <= cnt - 1; i++) {
                if (keys[i] == 'CHOOSE'){
                    sType = 'boolean';
                } else {
                    if ($.type(rowData[0][keys[i]]) == 'undefined') {
                        sType = 'string';
                    } else if ($.type(rowData[0][keys[i]]) == 'number') {
                        sType = 'integer';
                    }
                    else {
                        sType = $.type(rowData[0][keys[i]]);
                    }
                }
                columns.push({ 'name': keys[i], 'type': sType });
            }

            for (var i = 0, iCnt = rowData.length; i <= iCnt - 1; i++) {
                rows.push(rowData[i]);
            }
            ds[tbName] = { 'columns': columns, 'rows': rows };

            keys = null;
            columns = null;
            rows = null;

            return ds;
        } catch (err) {
            errorHandle(formName, 'toDataSet', err);
        }
    }
    //檢查連動項目是否有勾選? 若有就予以連動勾選指定的項目
    function checkSyncPR(div, args) {
        try {
            var grid = getControlObject(div, 'dgPRRight');
            var row = grid.jqxGrid('getrowdata', args.rowindex);
            var allRows = grid.jqxGrid('getrows');
            var aLength = allRows.length;
            //連動正負項勾選 或 取消
            for (var i = 0; i < aLength; i++) {
                if (row['SHOULDAMT'] >= 0) {
                    //正項時, LinkKey(正)=StepNo(負)
                    if (row['STEPNO'] == allRows[i]['LINKKEY']) {
                        allRows[i]['CHOOSE'] = row['CHOOSE'];
                        grid.jqxGrid('setcellvalue', grid.jqxGrid('getrowboundindex', i), "CHOOSE", row['CHOOSE']);
                    }
                } else {
                    //負項時, StepNo(正)=LinkKey(負)
                    if (row['LINKKEY'] == allRows[i]['STEPNO']) {
                        allRows[i]['CHOOSE'] = row['CHOOSE'];
                        grid.jqxGrid('setcellvalue', grid.jqxGrid('getrowboundindex', i), "CHOOSE", row['CHOOSE']);
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'checkSync', err);
        }
    };



})(jQuery);