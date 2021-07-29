(function ($) {
    var formName = 'SO1144B1';
    var riadllName = 'CableSoft.SO.RIA.Order.Edit.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Order.Edit.Web.NewOrderEdit';
    var gridHeight = 25;
    var textHeight = 23;
    var productCodeTableName = "ProductCode";
    var existProductTableName = "ExistProduct";
    var canChoosePromTableName = "CanChooseProm";

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
                        options: $.extend({}, new defaults(), new SO1144B1(), options)
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
        clear: function (jq) {
            return jq.each(function () {
                clear(this);
            });
        },
        disabled: function (jq, params) {
            return jq.each(function () {
                disabled(this, params);
            });
        },
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
            for (var i = 0; i < controls.length; i++) {
                if (controls[i].type.indexOf('jqxSplitter') >= 0) {
                    //var percent = 0.99;
                    //var height = $(div).height() * percent;
                    //var height1 = Math.floor(height * 2 / 5);
                    //var height2 = Math.floor(height * 3 / 5);
                    ////$('#' + controls[i].name).jqxSplitter({ height: (percent * 100) + '%', panels: [{ size: height1 }, { size: height2 }] });
                    //$('#' + controls[i].name).jqxSplitter({ panels: [{ size: height1 }, { size: height2 }] });
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
                            listAddHandler(div);
                            addHandler(div);
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
    function disabled(div, flag) {
        try {
            var options = $.data(div, formName).options;
            disableAllControls(options.controls, flag);
        }
        catch (err) {
            errorHandle(formName, 'disabled', err);
        }
    };
    function clear(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.promCodeData != null) {
                delete options.promCodeData['CanChooseProm'];
            }
            var rows = options.productSource.localdata;
            for (var i = 0; i < rows.length; i++) {
                rows[i]['CHOOSE'] = false;
            }
            getControlObject(div, 'dgProduct').jqxGrid('updatebounddata');
            options.promCodeSource.localdata = [];
            getControlObject(div, 'dgPromCode').jqxGrid('updatebounddata');
            getControlObject(div, 'csCMBaudRate').csList('codeNo', null);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'clear', err);
        }
    };
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div);
            renderControl(div);
            //$(options.container).on('resize', function () {
            //    formResize(div);
            //});
            formResize(div);
            action(true);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
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
            var oLength = 0;
            var oArray = [];
            var oHightArray = [];
            var oWidthArray = [];
            var oDisabled = [];
            var oColors = [];
            $(div).css('padding', 2);
            //建立Splitter
            oArray = ["gbxAll"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxSplitter({
                    theme: options.theme,
                    height: $(div).height() - 2,
                    width: '100%',
                    resizable: false,
                    showSplitBar: false,
                    orientation: 'horizontal',
                    panels: [{ size: $(div).height() * 0.5 }, { size: $(div).height() * 0.5 }]
                });
                controls.push({ name: iId, type: 'jqxSplitter', level: level });
            }
            level += 1;
            //建立內層Expander
            oArray = ["gbxProduct", "gbxHasProduct", "gbxPromCode"];
            //oHightArray = ["170", "300"];
            oWidthArray = ["40%", "59%", "100%"];
            oColors = ['', 'red', 'green'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxExpander({
                    theme: options.theme,
                    showArrow: false,
                    expanded: true,
                    toggleMode: 'none',
                    width: oWidthArray[i],
                    height: '99%'
                });
                $('#' + iId).jqxExpander('setHeaderContent', lang[oArray[i]]);
                $('#' + iId).children().css('overflow', 'hidden');
                if (isEmpty(oColors[i]) == false) {
                    $($('#' + iId).children()[0]).css('color', oColors[i]);
                }
                $('#' + iId + ' .jqx-expander-header-expanded').css({ 'height': 16, 'padding-bottom': 1 });
                controls.push({ name: iId, type: 'jqxExpander', level: level });
            }
            level += 1;
            //建立單選元件
            oArray = ["csCMBaudRate"];
            oWidthArray = ["89%"];
            oTableArrays = ["CMBaudRate"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 80,
                    width: oWidthArray[i],
                    source: options.parameters[oTableArrays[i]].rows
                });
                controls.push({ name: iId, type: 'csList', level: level });
            }
            renderProductCodeGrid(div, level);
            renderHasProductGrid(div, level);
            level += 1;
            renderPromCodeGrid(div, level);

            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function listAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //服務別
            csCMBaudRate_selectedIndexChanged(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    }
    //服務別selectedIndexChanged
    function csCMBaudRate_selectedIndexChanged(div) {
        getControlObject(div, 'csCMBaudRate').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var value = $(this).csList('codeNo');
                if (value != null && value.toString().length > 0) {
                    var productRows = options.productSource.localdata;
                    for (var i = 0; i < productRows.length; i++) {
                        if (productRows[i]['ISCM'] == 1) {
                            productRows[i]['CHOOSE'] = true;
                            getControlObject(div, 'dgProduct').jqxGrid('updatebounddata');
                            break;
                        }
                    }
                }
                getCanChooseProm(div, function (r) {
                    if (r[0] == true) {
                        refreshPromCode(div);
                        $(div).triggerHandler('filter');
                    }
                    else if (r[1] != null) {
                        messageBox(r[1]);
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'csServiceType_selectedIndexChanged', err);
            }
        });
    };
    function updateChooseField(rows) {
        var rLength = rows.length;
        for (var i = 0; i < rLength; i++) {
            rows[i]['CHOOSE'] = false;
        }
    }
    function renderProductCodeGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgProduct';
            updateChooseField(options.parameters[productCodeTableName].rows);
            options.productSource = {
                datatype: "json",
                localdata: options.parameters[productCodeTableName].rows,
                datafields: [
                    { name: 'CHOOSE', type: 'bool' },
                    { name: 'PRODUCTCODE', type: 'int' },
                    { name: 'PRODUCTNAME', type: 'string' },
                    { name: 'ISCM', type: 'int' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.productSource);
            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                height: '85%',
                source: dataAdapter,
                //sortable: true,
                altrows: true,
                filterable: true,
                showfilterrow: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                editable: true,
                columns: [
                  { text: lang.dgProduct_CHOOSE, datafield: 'CHOOSE', filtertype: 'boolean', sortable: false, columntype: 'checkbox', width: 40 },
                  { text: lang.dgProduct_PRODUCTCODE, editable: false, datafield: 'PRODUCTCODE', width: 60 },
                  { text: lang.dgProduct_PRODUCTNAME, editable: false, datafield: 'PRODUCTNAME', width: 220 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            $('#' + gridId).on('cellvaluechanged', function (event) {
                try {
                    var args = event.args;
                    var datafield = args.datafield;
                    var rowBoundIndex = args.rowindex;
                    var value = args.newvalue;
                    if (datafield == 'CHOOSE' && value == false) {
                        getControlObject(div, 'csCMBaudRate').csList('clearDisplayValue');
                    }
                }
                catch (err) {
                    errorHandle(formName, 'renderProductCodeGrid_cellvaluechanged', err);
                }
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderProductCodeGrid', err);
        }
    };
    function refreshPromCode(div) {
        try {
            var options = $.data(div, formName).options;
            options.promCodeSource.localdata = options.promCodeData['CanChooseProm'].rows;
            $('#' + $(div).prop('id') + 'dgPromCode').jqxGrid('updatebounddata');
            if (options.promCodeSource.localdata.length > 0) {
                $('#' + $(div).prop('id') + 'dgPromCode').jqxGrid('selectrow', 0);
            }
        }
        catch (err) {
            errorHandle(formName, 'getProductStr', err);
        }
    };
    function getProductStr(div) {
        try {
            var options = $.data(div, formName).options;
            var rows = getControlObject(div, 'dgProduct').jqxGrid('getrows');
            var chooseRows = getChooseRows(rows);
            return getRowFieldString(chooseRows, 'ProductCode'.toUpperCase());
            var rLength = rows.length;
            var productCode = [];
            for (var i = 0; i < rLength; i++) {
                if (rows[i]['ChooseX'.toUpperCase()] == true) {
                    productCode.push(rows[i]['ProductCode'.toUpperCase()]);
                }
            }
            return productCode.join(',');
        }
        catch (err) {
            errorHandle(formName, 'getProductStr', err);
        }
    }
    function getCanChooseProm(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var custId = options.custId;
            var productStr = getProductStr(div);
            var CMBaudRateStr = getControlObject(div, 'csCMBaudRate').csList('codeNo');
            if (productStr == null || productStr.length == 0) {
                action([false]);
                return;
            }
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                strProductStr: { type: 'string', value: convertToNull(productStr) },
                strCMBaudRateStr: { type: 'string', value: convertToNull(CMBaudRateStr) },
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'GetCanChooseProm',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    //messageBox(JSON.stringify(data));
                    if (data.ResultBoolean == true) {
                        delete options.promCodeData;
                        options.promCodeData = JSON.parse(data.ResultXML);
                        action([true]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getCanChooseProm', err);
        }
    }
    function renderHasProductGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgHasProduct';
            options.hasProductSource = {
                datatype: "json",
                localdata: options.parameters[existProductTableName].rows,
                datafields: [
                    { name: 'PRODUCTNAME', type: 'string' },
                    { name: 'MONTHAMT', type: 'float' },
                    { name: 'CONTSTATUS', type: 'string' },
                    { name: 'PRODSTATUSNAME', type: 'string' },
                    { name: 'CONTSTOPDATE', type: 'date' },
                    { name: 'FACISNOS', type: 'string' },
                    { name: 'SERVICEID', type: 'float' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.hasProductSource);
            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                height: '99%',
                source: dataAdapter,
                //sortable: true,
                altrows: true,
                columnsresize: true,
                filterable: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                columns: [
                  { text: lang.dgHasProduct_PRODUCTNAME, datafield: 'PRODUCTNAME', width: 100 },
                  { text: lang.dgHasProduct_MONTHAMT, datafield: 'MONTHAMT', width: 50, cellsalign: 'right', align: 'right' },
                  { text: lang.dgHasProduct_CONTSTATUS, datafield: 'CONTSTATUS', width: 80 },
                  { text: lang.dgHasProduct_PRODSTATUSNAME, datafield: 'PRODSTATUSNAME', width: 70 },
                  { text: lang.dgHasProduct_CONTSTOPDATE, datafield: 'CONTSTOPDATE', width: 80, cellsformat: 'yyyy/MM/dd' },
                  { text: lang.dgHasProduct_FACISNOS, datafield: 'FACISNOS', width: 90 },
                  { text: lang.dgHasProduct_SERVICEID, datafield: 'SERVICEID', width: 70 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });

            //refreshGrid(div);
        }
        catch (err) {
            errorHandle(formName, 'renderHasProductGrid', err);
        }
    };
    function renderPromCodeGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgPromCode';
            options.promCodeSource = {
                datatype: "json",
                //datafields: [
                //    { name: 'BPCODE', type: 'string' },
                //    { name: 'BPNAME', type: 'string' },
                //    { name: 'BUNDLEMON', type: 'float' },
                //    //{ name: 'BUNDLEPRODNOTE', type: 'string' },
                //    { name: 'PROMNAME', type: 'string' }
                //]
            };
            var cellsRenderer = function (row, field, value, defaulthtml, columnproperties) {
                var dh = $(defaulthtml);
                dh.css({
                    'overflow': 'auto',
                    'margin-top': 2,
                    'margin-bottom': 2,
                    height: '99%'
                });
                dh.text('');
                dh.append('<div>' + value.replace(/\n|\r\n|\r/g, '<br>') + '</div>');
                return $(dh)[0].outerHTML;
            }

            var dataAdapter = new $.jqx.dataAdapter(options.promCodeSource);
            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                height: '99%',
                source: dataAdapter,
                //sortable: true,
                altrows: true,
                filterable: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: 50,
                columns: [
                    getGridRowNumberColumn(null, 30, 18),
                  { text: lang.dgPromCode_CODENO, datafield: 'BPCODE', width: 80 },
                  { text: lang.dgPromCode_DESCRIPTION, datafield: 'BPNAME', width: 150 },
                  { text: lang.dgPromCode_BUNDLEPRODNOTE, datafield: 'BUNDLEPRODNOTE', width: 430, cellsrenderer: cellsRenderer },
                  { text: lang.dgPromCode_PROMNAME, datafield: 'PROMNAME', width: 150 },
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderPromCodeGrid', err);
        }
    };
    function addHandler(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'dgProduct').on('cellvaluechanged', function () {
                var rowid = args.rowindex;
                options.productSource.localdata[rowid]['CHOOSE'] = getControlObject(div, 'dgProduct').jqxGrid('getrowdata', rowid)['CHOOSE'];
                getCanChooseProm(div, function (r) {
                    if (r[0] == true) {
                        refreshPromCode(div);
                        $(div).triggerHandler('filter');
                    }
                    else {
                        options.promCodeSource.localdata = [];
                        getControlObject(div, 'dgPromCode').jqxGrid('updatebounddata');
                        if (r[1] != null) {
                            messageBox(r[1]);
                        }
                    }
                });
            });
            getControlObject(div, 'dgPromCode').on('rowdoubleclick', function (event) {
                try {
                    var rowindex = event.args.rowindex;
                    var data = getControlObject(div, 'dgPromCode').jqxGrid('getrowdata', rowindex);
                    var args = {
                        row: options.promCodeSource.localdata[rowindex],
                        productStr: getProductStr(div),
                        CMBaudRateStr: getControlObject(div, 'csCMBaudRate').csList('codeNo')
                    };
                    var e = $.Event("rowDoubleClick", args);
                    $(div).triggerHandler(e);
                }
                catch (err) {
                    errorHandle(formName, 'addHandler_dgPromCode_rowdoubleclick', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'addHandler', err);
        }
    }
})(jQuery);