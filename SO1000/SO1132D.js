(function ($) {
    var formName = 'SO1132D';
    var riadllName = 'CableSoft.SO.RIA.Billing.ProduceMediaBillNo.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.ProduceMediaBillNo.Web.dsProduceMediaBillNo';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 28;
    var mediaBillNoTableName = 'BillCombine'; //ProduceMediaBillNo
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
                        options: $.extend({}, new defaults(), new SO1132D(), options)
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
            var height = options.container.height();
            var bHeight = buttonsHeight + 2;
            getControlObject(div, 'dgSO1132D').jqxGrid({ height: height - (bHeight * 2) - 76 });
            getControlObject(div, 'btnOk').find('span').css('top', '6px');
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
            var table = mediaBillNoTableName;
            if (data[table] == null) return ([false, 'table ' + table + ' not exist!!']);
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
                            var oo = checkParameters(options.parameters);
                            if (oo[0] == false) {
                                messageBox(oo[1]);
                            } else {
                                $(div).triggerHandler('loaded');
                            }
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
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div, formName);
            renderControl(div);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            formResize(div);
            //取得週期性階段優惠資料
            getMediaBillNoData(div, function (r) {
                if (r[0]) {
                    addHandler(div);
                    refreshGrid(div, options.initData['Table'].rows);
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
            //建立內層Expander
            oArray = ["gbxCondition"];
            //oHightArray = ["170", "300"];
            oWidthArray = ["100%"];
            oLength = oArray.length;
            for (var i = 0; i < oLength; i++) {
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
            oArray = ["chkDeclarantName", "chkAccountNo", "chkOrder"];
            oWidthArray = ["100", "100", "100"];
            oLength = oArray.length;
            for (var i = 0; i < oLength; i++) {
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
            oArray = ['btnOk', 'btnCancel'];
            oLength = oArray.length;
            for (var i = 0; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var text = lang[oArray[i]];
                switch (oArray[i]) {
                    case "btnOk":
                        img = imageScr.ok;
                        break;
                    case "btnCancel":
                        img = imageScr.exit;
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
            renderGrid(div, level);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function getMediaBillNoData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var custId = options.parameters[mediaBillNoTableName].rows[0]["CUSTID"];
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId }
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'GetCharge',
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
                            //補上CHOOSE欄位備用
                            var aLength = options.initData['Table'].rows.length;
                            var allRows = options.initData['Table'].rows;
                            if (aLength > 0 && allRows[0]['CHOOSE'] == undefined) {
                                for (var i = 0; i < aLength; i++) {
                                    allRows[i]['CHOOSE'] = false;
                                }
                            }
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
            errorHandle(formName, 'getMediaBillNoData', err);
        }
    };
    function frmAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.container != null && $(options.container).attr('class') != undefined) {
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
    function refreshGrid(div, data) {
        try {
            var options = $.data(div, formName).options;

            if (data != undefined) {
                options.gridSource.localdata = data; //options.initData['Table'].rows;
            }
            getControlObject(div, 'dgSO1132D').jqxGrid('updatebounddata');
            if (options.gridSource.localdata.length > 0) {
                getControlObject(div, 'dgSO1132D').jqxGrid('selectrow', 0);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };
    function minusColorRed(row, field, value, defaulthtml, columnproperties) {
        var val = $(defaulthtml);
        if (value < 0) {
            val.css('color', 'red');
        }
        return val[0].outerHTML;
    };
    function renderGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgSO1132D';
            options.gridSource = {
                datatype: "json",
                datafields: [
                    { name: 'CHOOSE', type: 'bool' },
                    { name: 'MEDIABILLNO', type: 'string' },
                    { name: 'BANKATMNO', type: 'string' },
                    { name: 'ORDERNO', type: 'string' },
                    { name: 'ACCOUNTNO', type: 'string' },
                    { name: 'DECLARANTNAME', type: 'string' },
                    { name: 'FACISNO', type: 'string' },
                    { name: 'CITEMCODE', type: 'int' },
                    { name: 'CITEMNAME', type: 'string' },
                    { name: 'REALPERIOD', type: 'int' },
                    { name: 'SHOULDDATE', type: 'date' },
                    { name: 'SHOULDAMT', type: 'float' },
                    { name: 'REALSTARTDATE', type: 'date' },
                    { name: 'REALSTOPDATE', type: 'date' },
                    { name: 'BILLCLOSEDATE', type: 'date' },
                    { name: 'BARCODECLOSEDATE', type: 'date' }
                ]
            };

            var dataAdapter = new $.jqx.dataAdapter(options.gridSource);
            $('#' + gridId).jqxGrid(
                {
                    width: '100%',
                    height: '60%',
                    source: dataAdapter,
                    sortable: true,
                    altrows: true,
                    columnsresize: true,
                    columnsheight: gridHeight,
                    rowsheight: gridHeight,
                    editable: true,
                    columns: [
                        getGridRowNumberColumn(null, 30),
                        { text: lang.CHOOSE, datafield: 'CHOOSE', sortable: false, columntype: 'checkbox', align: 'center', width: 40, pinned: true },
                        { text: lang.MEDIABILLNO, editable: false, datafield: 'MEDIABILLNO', align: 'center', width: 110 },
                        { text: lang.BANKATMNO, editable: false, datafield: 'BANKATMNO', align: 'center', width: 140 },
                        { text: lang.ORDERNO, editable: false, datafield: 'ORDERNO', align: 'center', width: 140 },
                        { text: lang.ACCOUNTNO, editable: false, datafield: 'ACCOUNTNO', align: 'center', width: 140 },
                        { text: lang.DECLARANTNAME, editable: false, datafield: 'DECLARANTNAME', align: 'center', width: 60 },
                        { text: lang.FACISNO, editable: false, datafield: 'FACISNO', align: 'center', width: 100 },
                        { text: lang.CITEMCODE, editable: false, datafield: 'CITEMCODE', align: 'center', width: 60 },
                        { text: lang.CITEMNAME, editable: false, datafield: 'CITEMNAME', align: 'center', width: 180 },
                        { text: lang.REALPERIOD, editable: false, datafield: 'REALPERIOD', align: 'center', width: 50, cellsalign: 'right', align: 'right' },
                        { text: lang.SHOULDDATE, editable: false, datafield: 'SHOULDDATE', align: 'center', width: 85, cellsformat: 'yyyy/MM/dd' },
                        { text: lang.SHOULDAMT, editable: false, datafield: 'SHOULDAMT', align: 'center', width: 70, cellsformat: 'c', cellsalign: 'right', align: 'right', cellsrenderer: minusColorRed },
                        { text: lang.REALSTARTDATE, editable: false, datafield: 'REALSTARTDATE', align: 'center', width: 85, cellsformat: 'yyyy/MM/dd' },
                        { text: lang.REALSTOPDATE, editable: false, datafield: 'REALSTOPDATE', align: 'center', width: 85, cellsformat: 'yyyy/MM/dd' },
                        { text: lang.BILLCLOSEDATE, editable: false, datafield: 'BILLCLOSEDATE', align: 'center', width: 85, cellsformat: 'yyyy/MM/dd' },
                        { text: lang.BARCODECLOSEDATE, editable: false, datafield: 'BARCODECLOSEDATE', align: 'center', width: 85, cellsformat: 'yyyy/MM/dd' }
                    ],
                    theme: options.theme,
                    localization: options.localization
                });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderGrid', err);
        }
    };
    //檢查連動項目是否有勾選? 若有就予以連動勾選指定的項目
    function checkSync(div, args) {
        try {
            var grid = getControlObject(div, 'dgSO1132D');
            var row = grid.jqxGrid('getrowdata', args.rowindex);
            var allRows = grid.jqxGrid('getrows');
            var aLength = allRows.length;
            //申請人/帳號/訂單編碼 有打勾    //args.newvalue
            for (var i = 0; i < aLength; i++) {
                if (getControlObject(div, 'chkDeclarantName').jqxCheckBox('val') == true) {
                    if (row['DECLARANTNAME'] == allRows[i]['DECLARANTNAME']) {
                        allRows[i]['CHOOSE'] = row['CHOOSE'];
                        grid.jqxGrid('setcellvalue', grid.jqxGrid('getrowboundindex', i), "CHOOSE", row['CHOOSE']);
                    }
                }
                if (getControlObject(div, 'chkAccountNo').jqxCheckBox('val') == true) {
                    if (row['ACCOUNTNO'] == allRows[i]['ACCOUNTNO']) {
                        allRows[i]['CHOOSE'] = row['CHOOSE'];
                        grid.jqxGrid('setcellvalue', grid.jqxGrid('getrowboundindex', i), "CHOOSE", row['CHOOSE']);
                    }
                }
                if (getControlObject(div, 'chkOrder').jqxCheckBox('val') == true) {
                    if (row['ORDERNO'] == allRows[i]['ORDERNO']) {
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
    function addHandler(div) {
        var options = $.data(div, formName).options;
        getControlObject(div, 'dgSO1132D').on('cellvaluechanged', function (event) {
            try {
                var args = event.args;
                if (args.datafield == 'CHOOSE') {
                    var rowindex = args.rowindex;
                    var value = args.newvalue;
                    //當副商品打勾時主商品也要打勾
                    return checkSync(div, args);
                    //if (value == true) {
                    //    checkSync(div, rowindex, value);
                    //}
                    //else {
                    //    //當主商品取消打勾時副商品也要取消
                    //    uncheckSync(div, rowindex);
                    //}
                }
            }
            catch (err) {
                errorHandle(formName, 'dgSO1132D_cellvaluechanged', err);
            }
        });
        var unChecked = (function (e) {
            var rows = getControlObject(div, 'dgSO1132D').jqxGrid('getrows'); //options.initData['Table'].rows;
            for (var i = 0; i < rows.length; i++) {
                rows[i]['CHOOSE'] = false;
            }
            refreshGrid(div, rows);
        });
        getControlObject(div, 'chkDeclarantName').on('unchecked', function (e) {
            unChecked(this);
        });
        getControlObject(div, 'chkAccountNo').on('unchecked', function (e) {
            unChecked(this);
        });
        getControlObject(div, 'chkOrder').on('unchecked', function (e) {
            unChecked(this);
        });
    };
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //檢核是否有勾選項目
            var rows = getControlObject(div, 'dgSO1132D').jqxGrid('getrows');
            var rLength = rows.length;
            var checkCount = 0;
            for (var i = 0; i < rLength; i++) {
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
                    messageBox(options.language.executeOk + '\n' + msg, null, null, function () {
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
        getControlObject(div, 'btnCancel').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            close(div);
        });
    };
    function getExecuteData(div) {
        try {
            var options = $.data(div, formName).options;
            var chooseData = { columns: cloneJSON(options.initData['Table'].columns), rows: [] };
            var sourceData = getControlObject(div, 'dgSO1132D').jqxGrid('source');
            var gridRows = sourceData.records;
            var grLength = gridRows.length;
            var oo;
            for (var i = 0; i < grLength; i++) {
                if (gridRows[i]['CHOOSE'] == true) {
                    oo = cloneJSON(sourceData._source.localdata[gridRows[i]['boundindex']]);
                    delete oo.CHOOSE;
                    chooseData.rows.push(oo);
                }
            }
            return { ProduceMediaBillNo: chooseData };
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
                DS: { type: 'string', value: JSON.stringify(tData) },
                ReAtmNo: { type: 'boolean', value: false }
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
                        if (data.ResultBoolean == true) {
                            //將新的 MediaBillNo 及  BankATMNo 更新回UI顯示
                            var oo = JSON.parse(data.ResultXML);
                            getMBNo(div, oo);
                            delete tData;
                            action(true, oo['RetData'].rows[0]['Message']);
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
    function getMBNo(div, retData) {
        try {
            var sourceData = getControlObject(div, 'dgSO1132D').jqxGrid('source');
            var grLength = sourceData._source.localdata.length;
            for (var i = 0; i < grLength; i++) {
                if (sourceData.records[i]['CHOOSE'] == true) {
                    sourceData._source.localdata[sourceData.records[i]['boundindex']]['CHOOSE'] = true;
                    sourceData._source.localdata[sourceData.records[i]['boundindex']]['MEDIABILLNO'] = retData['RetData'].rows[0]['MediaBillNo'];
                    sourceData._source.localdata[sourceData.records[i]['boundindex']]['BANKATMNO'] = retData['RetData'].rows[0]['BankATMNo'];
                }
            }
            refreshGrid(div);

            parameters = null;
            parameters = { ProduceMediaBillNo: sourceData._source.localdata };
        } catch (err) {
            errorHandle(formName, 'getMBNo', err);
        }
    }
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