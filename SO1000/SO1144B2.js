///銷售產品
(function ($) {
    var formName = 'SO1144B2';
    var riadllName = 'CableSoft.SO.RIA.Order.Edit.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Order.Edit.Web.NewOrderEdit';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 25;
    var orderItemTableName = 'OrderItem';
    var productCodeTableName = "BPProductCode";
    var hasProductTableName = "ExistProduct";
    var saleFacilityTableName = "CanAddFacility";
    var needFacilityTableName = "NeedFacility";
    var facilityTableName = "Facility";
    var realFacilityTableName = "RealFacility";
    var periodTableName = "ChangePeriod";
    var canChooseCMBaudTableName = "CanChooseCMBaud";

    var chargeTableName = 'Charge';
    var productTableName = 'Product';
    var facilityTableName = 'Facility';
    var closeTableName = 'Close';

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
                        options: $.extend({}, new defaults(), new SO1144B2(), options)
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
        refresh: function (jq, params, params2) {
            return jq.each(function () {
                refresh(this, params, params2);
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
        this.period = 0;
        this.orderData = {};
        this.orderItem = 0;
        this.resvTime = null;
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
                    panels: [{ size: $(div).height() * 3 / 7 }, { size: $(div).height() * 4 / 7 }]
                });
                controls.push({ name: iId, type: 'jqxSplitter', level: level });
            }
            level += 1;
            //建立內層Expander
            oArray = ["gbxProduct", "gbxFacility", "gbxSaleFacility", "gbxHasProduct"];
            oHightArray = ["99%", "99%", "90%", "90%"];
            oWidthArray = ["45%", "54%", "45%", "54%"];
            oColors = ['', '', '', 'red'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxExpander({
                    theme: options.theme,
                    showArrow: false,
                    expanded: true,
                    toggleMode: 'none',
                    width: oWidthArray[i],
                    height: oHightArray[i],
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
            oWidthArray = ["84%"];
            oTableArrays = ["CMBaudRate"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 80,
                    width: oWidthArray[i],
                    //source: options.parameters[oTableArrays[i]].rows
                });
                controls.push({ name: iId, type: 'csList', level: level });
            }
            //建立下拉元件
            oArray = ["tPeriod"];
            oWidthArray = ["80"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxDropDownButton({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                });
                controls.push({ name: iId, type: 'jqxDropDownButton', level: level });
            }
            //建立按鈕
            oArray = ['btnAdd', 'btnAddOther'];
            oLength = oArray.length;
            for (var i = oLength - 1 ; i >= 0; i--) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var width = '15%';
                var text = lang[oArray[i]];
                o.text(text);
                o.jqxButton({
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                });
                controls.push({ name: bId, type: 'jqxButton', level: level });
                $('#' + bId).css("margin", 2);
                $('#' + bId).css("float", 'left');
                $('#' + bId).css("max-width", 100);
            }
            level += 1;
            renderProductCodeGrid(div, level);
            renderHasProductGrid(div, level);
            renderFacilityGrid(div, level);
            renderSaleFacilityGrid(div, level);

            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function renderPeriodGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            if (options.periodRender == true) return;
            options.periodRender = true;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgPeriod';
            options.periodSource = {
                datatype: "json",
                //localdata: options.initData[periodTableName].rows,
                datafields: [
                    { name: 'PRODUCTNAME', type: 'string' },
                    { name: 'MASTERSALE', type: 'int' },
                    { name: 'PERIOD', type: 'int' },
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.periodSource);
            $('#' + gridId).jqxGrid(
            {
                width: 250,
                height: 250,
                source: dataAdapter,
                //sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                editable: false,
                columns: [
                  { text: lang.dgPeriod_PRODUCTNAME, datafield: 'PRODUCTNAME', width: 100 },
                  { text: lang.dgPeriod_MASTERSALE, datafield: 'MASTERSALE', width: 60 },
                  { text: lang.dgPeriod_PERIOD, datafield: 'PERIOD', width: 60 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            //$('#' + gridId).css('position', 'absolute');
            //$('#' + gridId).css('zIndex', 99999);
            //$('#' + gridId).css('top', getControlObject(div, 'tPeriod').jqxDropDownButton('height'));
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderPeriodGrid', err);
        }
    };
    function renderProductCodeGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgProduct';
            options.productSource = {
                datatype: "json",
                localdata: [],
                datafields: [
                    { name: 'CHOOSE', type: 'bool' },
                    { name: 'PRODUCTCODE', type: 'int' },
                    { name: 'PRODUCTNAME', type: 'string' },
                    { name: 'MONTHAMT', type: 'float' },
                    { name: 'DISCOUNTAMT', type: 'float' },
                    { name: 'AMOUNT', type: 'float' },
                    { name: 'PERIOD', type: 'int' },
                    { name: 'BUNDLEMON', type: 'int' },
                    { name: 'MUSTCHOOSE', type: 'int' },
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.productSource);
            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                height: '82%',
                source: dataAdapter,
                //sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                rendered: function () {
                    //$('#' + gridId).jqxGrid('scrolloffset', 0, 0);
                },
                editable: true,
                columns: [
                  { text: lang.dgProduct_CHOOSE, datafield: 'CHOOSE', sortable: false, columntype: 'checkbox', width: 40, pinned: true },
                  { text: lang.dgProduct_PRODUCTCODE, editable: false, datafield: 'PRODUCTCODE', width: 50 },
                  { text: lang.dgProduct_PRODUCTNAME, editable: false, datafield: 'PRODUCTNAME', width: 100 },
                  { text: lang.dgProduct_MONTHAMT, editable: false, datafield: 'MONTHAMT', width: 50 },
                  { text: lang.dgProduct_DISCOUNTAMT, editable: false, datafield: 'DISCOUNTAMT', width: 50 },
                  { text: lang.dgProduct_AMOUNT, editable: false, datafield: 'AMOUNT', width: 50 },
                  { text: lang.dgProduct_PERIOD, editable: false, datafield: 'PERIOD', width: 40 },
                  { text: lang.dgProduct_BUNDLEMON, editable: false, datafield: 'BUNDLEMON', width: 70 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderProductCodeGrid', err);
        }
    };
    function renderHasProductGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgHasProduct';
            options.hasProductSource = {
                datatype: "json",
                //localdata: options.parameters[hasProductTableName].rows,
                datafields: [
                    { name: 'CHOOSE', type: 'bool' },
                    { name: 'PRODUCTCODE', type: 'int' },
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
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                editable: true,
                columns: [
                  { text: lang.dgHasProduct_CHOOSE, datafield: 'CHOOSE', sortable: false, columntype: 'checkbox', width: 40, pinned: true },
                  { text: lang.dgHasProduct_PRODUCTNAME, editable: false, datafield: 'PRODUCTNAME', width: 150 },
                  { text: lang.dgHasProduct_MONTHAMT, editable: false, datafield: 'MONTHAMT', width: 60, cellsalign: 'right', align: 'right' },
                  { text: lang.dgHasProduct_CONTSTATUS, editable: false, datafield: 'CONTSTATUS', width: 100 },
                  { text: lang.dgHasProduct_PRODSTATUSNAME, editable: false, datafield: 'PRODSTATUSNAME', width: 80 },
                  { text: lang.dgHasProduct_CONTSTOPDATE, editable: false, datafield: 'CONTSTOPDATE', width: 100, cellsformat: 'yyyy/MM/dd' },
                  { text: lang.dgHasProduct_FACISNOS, editable: false, datafield: 'FACISNOS', width: 90 },
                  { text: lang.dgHasProduct_SERVICEID, editable: false, datafield: 'SERVICEID', width: 100 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderHasProductGrid', err);
        }
    };
    function renderFacilityGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgFacility';
            options.facilitySource = {
                datatype: "json",
                localdata: [],
                datafields: [
                    { name: 'TYPE', type: 'int' },
                    { name: 'CHOOSE', type: 'bool' },
                    { name: 'FACINAME', type: 'string' },
                    { name: 'SEQNO', type: 'string' },
                    { name: 'FACISNO', type: 'string' },
                    { name: 'initPlaceName'.toUpperCase(), type: 'string' },
                    { name: 'AMOUNT', type: 'float' },
                    { name: 'CMBAUDRATE', type: 'string' },
                    { name: 'BUYNAME', type: 'string' },
                    { name: 'PTNAME', type: 'string' },
                    { name: 'CITEMNAME', type: 'string' },
                    { name: 'MUSTCHOOSE', type: 'int' },
                    { name: 'FACIREFNO', type: 'int' },
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.facilitySource);
            function typeRender(row, field, value, defaulthtml, columnproperties) {
                var value2 = '';
                var html = $(defaulthtml);
                switch (value.toString()) {
                    case '0':
                        value2 = lang.dgFacility_TYPE0;
                        break;
                    case '1':
                        html.css('color', 'red');
                        value2 = lang.dgFacility_TYPE1;
                        break;
                    default:
                        value2 = lang.dgFacility_TYPENO;
                }
                html.text(value2);
                return html[0].outerHTML;
            }
            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                height: '99%',
                source: dataAdapter,
                //sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                editable: true,
                columns: [
                  { text: lang.dgFacility_TYPE, editable: false, datafield: 'TYPE', width: 40, pinned: true, cellsrenderer: typeRender },
                  { text: lang.dgFacility_CHOOSE, datafield: 'CHOOSE', sortable: false, columntype: 'checkbox', width: 40, pinned: true },
                  { text: lang.dgFacility_FACINAME, editable: false, datafield: 'FACINAME', width: 100 },
                  { text: lang.dgFacility_FACISNO, editable: false, datafield: 'FACISNO', width: 100 },
                  { text: lang.dgFacility_INITPLACENAME, editable: false, datafield: 'INITPLACENAME', width: 60 },
                  { text: lang.dgFacility_CMBAUDRATE, editable: false, datafield: 'CMBAUDRATE', width: 46 },
                  { text: lang.dgFacility_PTNAME, editable: false, datafield: 'PTNAME', width: 60 },
                  { text: lang.dgFacility_CITEMNAME, editable: false, datafield: 'CITEMNAME', width: 80 },
                  { text: lang.dgFacility_BUYNAME, editable: false, datafield: 'BUYNAME', width: 60 },
                  { text: lang.dgFacility_AMOUNT, editable: false, datafield: 'AMOUNT', width: 46 },
                  { text: lang.dgFacility_SEQNO, editable: false, datafield: 'SEQNO', width: 100 },
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderFacilityGrid', err);
        }
    };
    function renderSaleFacilityGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgSaleFacility';
            options.saleFacilitySource = {
                datatype: "json",
                datafields: [
                    { name: 'CHOOSE', type: 'bool' },
                    { name: 'FACINAME', type: 'string' },
                    { name: 'AMOUNT', type: 'float' },
                    { name: 'CMBAUDRATE', type: 'string' },
                    { name: 'BUYNAME', type: 'string' },
                    { name: 'CITEMNAME', type: 'string' },
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.saleFacilitySource);
            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                height: '99%',
                source: dataAdapter,
                //sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                editable: true,
                columns: [
                  { text: lang.dgSaleFacility_CHOOSE, datafield: 'CHOOSE', sortable: false, columntype: 'checkbox', width: 40, pinned: true },
                  { text: lang.dgSaleFacility_FACINAME, editable: false, datafield: 'FACINAME', width: 100 },
                  { text: lang.dgSaleFacility_AMOUNT, editable: false, datafield: 'AMOUNT', width: 80 },
                  { text: lang.dgSaleFacility_CMBAUDRATE, editable: false, datafield: 'CMBAUDRATE', width: 80 },
                  { text: lang.dgSaleFacility_BUYNAME, editable: false, datafield: 'BUYNAME', width: 80 },
                  { text: lang.dgSaleFacility_CITEMNAME, editable: false, datafield: 'CITEMNAME', width: 100 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderSaleFacilityGrid', err);
        }
    };
    function isDataOk(div, action) {
        try {
            var options = $.data(div, formName).options;
            //檢核如果為促案是否有選產品
            var chkProduct = (function () {
                try {
                    var rows = getControlObject(div, 'dgProduct').jqxGrid('getrows');
                    var rLength = rows.length;
                    var errorMsg;
                    for (var i = 0; i < rLength; i++) {
                        if (rows[i]['CHOOSE'] == true) {
                            return null;
                        }
                    }
                    return options.language.PleaseChooseProduct;
                }
                catch (err) {
                    errorHandle(formName, 'isDataOk_chkProduct', err);
                }
            });
            //檢核設備是否有選取
            var chkFacility = (function () {
                try {
                    var rows = getControlObject(div, 'dgFacility').jqxGrid('getrows');
                    var rLength = rows.length;
                    var errorMsg;
                    for (var i = 0; i < rLength; i++) {
                        if (rows[i]['CHOOSE'] != true && rows[i]['MustChoose'.toUpperCase()] == 1) {
                            var isOk = false;
                            for (var j = 0; j < rLength; j++) {
                                if (i != j && rows[i]['FACIREFNO'] == rows[j]['FACIREFNO'] && rows[j]['CHOOSE'] == true) {
                                    isOk = true;
                                    break;
                                }
                            }
                            if (isOk == false) {
                                errorMsg = options.language.PleaseChooseFacility.replace('{0}', rows[i]['FACINAME']);
                                break;
                            }
                        }
                    }
                    return errorMsg;
                }
                catch (err) {
                    errorHandle(formName, 'isDataOk_chkFacility', err);
                }
            });
            //檢核如果為促案是否有選產品
            var chkPromProduct = (function () {
                try {
                    return null;
                }
                catch (err) {
                    errorHandle(formName, 'isDataOk_chkPromProduct', err);
                }
            });
            var errorMsg = chkProduct();
            if (errorMsg != null) {
                messageBox(errorMsg, null, null, action(false));
            }
            else {
                errorMsg = chkFacility();
                if (errorMsg != null) {
                    messageBox(errorMsg, null, null, action(false));
                }
                else {
                    errorMsg = chkPromProduct();
                    if (errorMsg != null) {
                        messageBox(errorMsg, null, null, action(false));
                    }
                    else {
                        action(true);
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    }
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //加入訂購
            getControlObject(div, 'btnAdd').on('click', function () {
                if ($(this).jqxButton('disabled') == true) { return; }
                isDataOk(div, function (r) {
                    if (r == true) {
                        chooseProduct(div, function (r) {
                            if (r[0] == true) {
                                var period = getControlObject(div, 'tPeriod').jqxDropDownButton('getContent').text();
                                var CMBaudRate = getControlObject(div, 'csCMBaudRate').csList('codeNo');
                                var e = $.Event("chooseOk", {
                                    args: {
                                        type: 0, hasPresent: (r[1] == -60001),
                                        period: period, CMBaudRate: CMBaudRate,
                                        orderItem: options.orderItem,
                                        orderData: options.rOrderData,
                                        calculateData: options.calculateData
                                    }
                                });
                                $(div).triggerHandler(e);
                            }
                            else if (r[2] != null) {
                                messageBox(r[2]);
                            }
                        });
                    }
                });
            });
            //加入&繼續訂購
            getControlObject(div, 'btnAddOther').on('click', function () {
                if ($(this).jqxButton('disabled') == true) { return; }
                isDataOk(div, function (r) {
                    if (r == true) {
                        chooseProduct(div, function (r) {
                            if (r[0] == true) {
                                var period = getControlObject(div, 'tPeriod').jqxDropDownButton('getContent').text();
                                var CMBaudRate = getControlObject(div, 'csCMBaudRate').csList('codeNo');
                                var e = $.Event("chooseOk", {
                                    args: {
                                        type: 1, hasPresent: (r[1] == -60001),
                                        period: period, CMBaudRate: CMBaudRate,
                                        orderItem: options.orderItem,
                                        orderData: options.rOrderData,
                                        calculateData: options.calculateData
                                    }
                                });
                                $(div).triggerHandler(e);
                            }
                            else if (r[2] != null) {
                                messageBox(r[2]);
                            }
                        });
                    }
                });
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    function getResvTime(div) {
        var options = $.data(div, formName).options;
        var resvTime;
        if (options.orderData != null && options.orderData['Order'].rows.length > 0 && options.orderData['Order'].rows[0]['resvTime'.toUpperCase()] != null) {
            resvTime = options.orderData['Order'].rows[0]['resvTime'.toUpperCase()];
        }
        else if (options.resvTime != null) {
            resvTime = options.resvTime;
        }
        else {
            resvTime = new Date(formatDateTime(new Date(), 'date'));
        }
        return resvTime;
    };
    function splitData(div, data) {
        try {
            var options = $.data(div, formName).options;
            var keys = Object.keys(data);
            var kLength = keys.length;
            if (options.calculateData != null) {
                delete options.calculateData;
            }
            options.calculateData = {};
            for (var i = 0; i < kLength; i++) {
                if (keys[i].indexOf('CALCULATE_') >= 0) {
                    options.calculateData[keys[i].replace('CALCULATE_', '')] = data[keys[i]];
                    delete data[keys[i]];
                }
            }
            delete options.rOrderData;
            options.rOrderData = data;
        }
        catch (err) {
            errorHandle(formName, 'splitData', err);
        }
    }
    function chooseProduct(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var editMode = options.editMode;
            var resvTime = getResvTime(div);
            var chooseString = getChooseData(div);
            var orderData = JSON.stringify(options.orderData);
            var parameters = $.extend({}, paraLoginInfo, {
                editMode: { type: 'integer', value: editMode },
                resvTime: { type: 'date', value: resvTime },
                chooseString: { type: 'string', value: convertToNull(chooseString) },
                orderData: { type: 'string', value: convertToNull(orderData) },
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'ChooseProduct',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        splitData(div, JSON.parse(data.ResultXML));
                        action([true, data.ErrorCode]);
                    }
                    else {
                        action([false, data.ErrorCode, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'chooseProduct', err);
        }
    };
    function getChooseData(div) {
        try {
            var options = $.data(div, formName).options;
            var tables = [productCodeTableName, hasProductTableName, saleFacilityTableName];
            var dgs = ['dgProduct', 'dgHasProduct', 'dgSaleFacility'];
            var tLength = tables.length;
            var data = {};
            for (var i = 0; i < tLength; i++) {
                var table = cloneJSON(options.initData[tables[i]]);
                var rows = getControlObject(div, dgs[i]).jqxGrid('getrows');
                table.columns.push({ name: 'ORDERITEM', type: 'integer' });
                var rLength = rows.length;
                for (var j = rLength - 1; j >= 0 ; j--) {
                    if (rows[j]['CHOOSE'] != true) {
                        delete table.rows[j];
                    }
                    else {
                        table.rows[j]['ORDERITEM'] = options.orderItem;
                    }
                }
                table.rows = table.rows.filter(function (e) { return e });
                data[tables[i]] = table;
            }
            {
                var table = cloneJSON(options.initData[realFacilityTableName]);
                table.columns.push({ name: 'ORDERITEM', type: 'integer' });
                var rows = getControlObject(div, 'dgFacility').jqxGrid('getrows');
                var rLength = rows.length;
                for (var j = rLength - 1; j >= 0 ; j--) {
                    if (rows[j]['CHOOSE'] != true || rows[j]['TYPE'] == 1) {
                        delete table.rows[j];
                    }
                    else {
                        table.rows[j]['ORDERITEM'] = options.orderItem;
                    }
                }
                table.rows = table.rows.filter(function (e) { return e });
                data[needFacilityTableName] = table;
            }

            data[orderItemTableName] = {
                columns: cloneJSON(options.orderData[orderItemTableName].columns),
                rows: []
            };
            var oiRow = getRowByKeyValue(options.orderData[orderItemTableName].rows, 'ORDERITEM', options.orderItem);
            if (oiRow != null) {
                data[orderItemTableName].rows.push(cloneJSON(oiRow));
            }
            else {
                data[orderItemTableName].rows.push({ ORDERITEM: options.orderItem });
            }
            var str = JSON.stringify(data);
            delete data;
            return str;
        }
        catch (err) {
            errorHandle(formName, 'getChooseData', err);
        }
    };
    function clear(div) {
        try {
            var options = $.data(div, formName).options;
            delete options.initData;
            options.productSource.localdata = [];
            //$('#' + $(div).prop('id') + 'dgProduct').jqxGrid('updatebounddata');
            //options.hasProductSource.localdata = [];
            //$('#' + $(div).prop('id') + 'dgHasProduct').jqxGrid('updatebounddata');
            //options.facilitySource.localdata = [];
            //$('#' + $(div).prop('id') + 'dgFacility').jqxGrid('updatebounddata');
            //options.saleFacilitySource.localdata = [];
            //$('#' + $(div).prop('id') + 'dgSaleFacility').jqxGrid('updatebounddata');
            var girds = ['dgProduct', 'dgHasProduct', 'dgFacility', 'dgSaleFacility', 'dgPeriod'];
            var gLength = girds.length;
            for (var i = 0 ; i < gLength; i++) {
                $('#' + $(div).prop('id') + girds[i]).jqxGrid('clear');
            }
            getControlObject(div, 'csCMBaudRate').csList('codeNo', null);
            getControlObject(div, 'tPeriod').jqxDropDownButton('setContent', '');
            for (var i = 0; i < options.controls.length; i++) {
                $('#' + options.controls[i].name).off();
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'clear', err);
        }
    };
    function getEditParameters(div, data) {
        try {
            var options = $.data(div, formName).options;
            options.parameters = cloneJSON(data);
            var getPeriod = function () {
                var tRows = options.orderData[chargeTableName].rows;
                for (var i = 0; i < tRows.length; i++) {
                    if (tRows[i]['ORDERITEM'] == data.row['ORDERITEM'] && tRows[i]['PERIOD'] > 0 && tRows[i]['AMOUNT'] >= 0) {
                        options.period = tRows[i]['PERIOD'];
                        break;
                    }
                }
            }
            var getBaudRate = function () {
                var tRows = options.orderData[facilityTableName].rows;
                for (var i = 0; i < tRows.length; i++) {
                    if (tRows[i]['ORDERITEM'] == data.row['ORDERITEM'] && tRows[i]['CMBaudNo'.toUpperCase()] != null) {
                        options.parameters.CMBaudRateStr = tRows[i]['CMBaudNo'.toUpperCase()];
                        break;
                    }
                }
            }
            getPeriod();
            getBaudRate();
            options.parameters.productStr = getRowFieldString(getRowByKeyValue(options.orderData[productTableName].rows, 'ORDERITEM', data.row['ORDERITEM'], true), 'PRODUCTCODE');
            options.orderItem = data.row['ORDERITEM'];
            return;
        }
        catch (err) {
            errorHandle(formName, 'getEditParameters', err);
        }
    }
    function refresh(div, data, action) {
        try {
            var options = $.data(div, formName).options;
            delete options.parameters;
            options.editMode = data.editMode;
            if (data.editMode == editMode.append) {
                options.parameters = cloneJSON(data);
            }
            else {
                getEditParameters(div, data);
            }
            clear(div);
            getAllListData2(div, function (r) {
                if (r[0] == true) {
                    combineFacility(div);
                    refreshList(div);
                    defaultValue(div);
                    //updateExpender(div);
                    refreshGrid(div);
                    addHandler(div);
                    buttonAddHandler(div);
                    listAddHandler(div);
                    action(true);
                }
                else {
                    if (r[1] != null && r[1].length > 0) {
                        messageBox(r[1]);
                    }
                    action(false);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'refresh', err);
        }
    };
    function updateExpender(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var cLength = controls.length;
            for (var i = 0 ; i < cLength; i++) {
                if (controls[i]['type'] == 'jqxExpander') {
                    $('#' + controls[i]['name']).jqxExpander('refresh');
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'refresh', err);
        }
    }
    function refreshList(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'csCMBaudRate').csList('source', options.initData[canChooseCMBaudTableName].rows);
        }
        catch (err) {
            errorHandle(formName, 'refreshList', err);
        }
    }
    function refreshFacility(div) {
        try {
            var options = $.data(div, formName).options;
            var grids = ["dgFacility"];
            var sources = ["facilitySource"];
            var tables = [realFacilityTableName];
            for (var i = 0; i < grids.length; i++) {
                options[sources[i]].localdata = options.initData[tables[i]].rows;
                getControlObject(div, grids[i]).jqxGrid('updatebounddata');
                if (options[sources[i]].localdata.length > 0) {
                    getControlObject(div, grids[i]).jqxGrid('selectrow', 0);
                }
            }
            //getControlObject(div, 'dgFacility').jqxGrid('scrolloffset', 0, 0);
        }
        catch (err) {
            errorHandle(formName, 'refreshFacility', err);
        }
    }
    //將現有設備與所需設備合成一個grid
    function combineFacility(div) {
        try {
            var options = $.data(div, formName).options;
            delete options.initData[realFacilityTableName];
            var table = options.initData[needFacilityTableName];
            options.initData[realFacilityTableName] = { columns: cloneJSON(table.columns), rows: [] };
            var tmpRows = options.initData[facilityTableName].rows;
            var rows = options.initData[realFacilityTableName].rows;
            var chargeRows = options.orderData[chargeTableName].rows;
            for (var i = 0; i < tmpRows.length; i++) {
                var flag = true;
                for (var j = 0; j < chargeRows.length; j++) {
                    if (tmpRows[i]['SEQNO'] === chargeRows[j]['FACISEQNO']) {
                        flag = false;
                        break;
                    }
                }
                if (flag == true) {
                    var row = {};
                    row['TYPE'] = 1;
                    row['FACICODE'] = tmpRows[i]['FACICODE'];
                    row['FACINAME'] = tmpRows[i]['FACINAME'];
                    row['initPlaceName'.toUpperCase()] = tmpRows[i]['initPlaceName'.toUpperCase()];
                    row['CMBAUDRATE'] = tmpRows[i]['CMBAUDRATE'];
                    row['FACISNO'] = tmpRows[i]['FACISNO'];
                    row['FACIREFNO'] = tmpRows[i]['FACIREFNO'];
                    row['SEQNO'] = tmpRows[i]['SEQNO'];
                    rows.push(row);
                }
            }
            var tmpRows2 = table.rows;
            for (var i = 0; i < tmpRows2.length; i++) {
                var row = cloneJSON(tmpRows2[i]);
                row['TYPE'] = 0;
                rows.push(row);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'combineFacility', err);
        }
    };
    function setPeriodValue(div, value) {
        var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + value + '</div>';
        getControlObject(div, 'tPeriod').jqxDropDownButton('setContent', dropDownContent);
    }
    //設預設值
    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //設定選取的產品
            var rows = options.initData[productCodeTableName].rows;
            var rLength = rows.length;
            if (rLength > 0) {
                var products = options.parameters.productStr.split(',');
                for (var i = 0; i < products.length; i++) {
                    var row = getRowByKeyValue(options.initData[productCodeTableName].rows, 'PRODUCTCODE', products[i]);
                    row['CHOOSE'] = true;
                    if (i == 0) {
                        setPeriodValue(div, row['PERIOD']);
                    }
                }
                getControlObject(div, 'gbxProduct').jqxExpander('setHeaderContent', '<div style="float:left;">' + lang.gbxProduct + '</div><div style="color:green;float:left;margin-left:3px;">' + options.parameters.row['BPNAME'] + '(' + options.parameters.row['BPCODE'] + ') - ' + options.parameters.row['PROMNAME'] + '(' + options.parameters.row['PROMCODE'] + ')</div>');
                //檢核是否有速率再決定要不要秀速率
                var hasCM = false;
                var CMBaudNo = null;
                for (var i = 0 ; i < rLength; i++) {
                    if (CMBaudNo == null && rows[i]['CMBAUDNO'] != null) {
                        hasCM = true;
                        CMBaudNo = rows[i]['CMBAUDNO'];
                    }
                    //如果為整帶則要預設
                    if (rows[i]['MUSTCHOOSE'] == 1) {
                        rows[i]['CHOOSE'] = true;
                    }
                }
                if (hasCM == false) {
                    getControlObject(div, 'csCMBaudRate').csList('disabled', true);
                    //getControlObject(div, 'csCMBaudRate').parent().css('display', 'none');
                    //getControlObject(div, 'dgProduct').jqxGrid({ 'height': '99%' });
                }
                else {
                    //getControlObject(div, 'csCMBaudRate').parent().prop('style').removeProperty('display');
                    //getControlObject(div, 'dgProduct').jqxGrid({ 'height': '82%' });
                    getControlObject(div, 'csCMBaudRate').csList('disabled', false);
                    if (CMBaudNo != null) {
                        getControlObject(div, 'csCMBaudRate').csList('codeNo', CMBaudNo);
                    }
                    else if (options.parameters.CMBaudRateStr != null && options.parameters.CMBaudRateStr.toString().length > 0) {
                        getControlObject(div, 'csCMBaudRate').csList('codeNo', options.parameters.CMBaudRateStr);
                    }
                }
            }
            defaultFacility(div);
            defaultCanSaleFacility(div);
            defaultHasProduct(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'defaultValue', err);
        }
    };
    //設定預設設備
    function defaultFacility(div, noCheck) {
        try {
            var options = $.data(div, formName).options;
            var rows = options.initData[realFacilityTableName].rows;
            var rLength = rows.length;
            for (var i = 0; i < rLength; i++) {
                if (rows[i]['TYPE'] == 0) {
                    var sameCode = getRowByKeyValue(rows, 'FACIREFNO', rows[i]['FACIREFNO'], true);
                    if (sameCode.length == 1) {
                        rows[i]['CHOOSE'] = true;
                    }
                }
                if (options.editMode == editMode.edit && noCheck != true) {
                    //預設設備
                    var fRows = options.orderData[facilityTableName].rows;
                    for (var j = 0; j < fRows.length; j++) {
                        if (fRows[j]['FACISEQNO'] == rows[i]['SEQNO']) {
                            rows[i]['CHOOSE'] = true;
                            break;
                        }
                        else if (fRows[j]['FACISEQNO'].length < 15 && rows[i]['TYPE'] == 0
                                && fRows[j]['FACICODE'] == rows[i]['FACICODE']
                                && fRows[j]['PTCODE'] == rows[i]['PTCODE']) {
                            rows[i]['CHOOSE'] = true;
                            break;
                        }
                    }
                    var cRows = options.orderData[chargeTableName].rows;
                    for (var j = 0; j < cRows.length; j++) {
                        if (cRows[j]['FACISEQNO'] != null && cRows[j]['FACISEQNO'] == rows[i]['SEQNO']) {
                            rows[i]['CHOOSE'] = true;
                            break;
                        }
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'defaultFacility', err);
        }
    };
    //預設可售設備
    function defaultCanSaleFacility(div) {
        try {
            var options = $.data(div, formName).options;
            var rows = options.initData[saleFacilityTableName].rows;
            var rLength = rows.length;
            for (var i = 0; i < rLength; i++) {
                if (options.editMode == editMode.edit) {
                    var fRows = options.orderData[facilityTableName].rows;
                    for (var j = 0; j < fRows.length; j++) {
                        if (fRows[j]['FACICODE'] == rows[i]['FACICODE'] && fRows[j]['BPCODE'] == null) {
                            rows[i]['CHOOSE'] = true;
                            break;
                        }
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'defaultCanSaleFacility', err);
        }
    };
    //預設現有產品
    function defaultHasProduct(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.editMode != editMode.edit) return;

            var rows = options.initData[hasProductTableName].rows;
            var rLength = rows.length;
            for (var i = 0; i < rLength; i++) {
                var cRows = options.orderData[closeTableName].rows;
                for (var j = 0; j < cRows.length; j++) {
                    if (cRows[j]['SERVICEID'] == rows[i]['SERVICEID']) {
                        rows[i]['CHOOSE'] = true;
                        break;
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'defaultHasProduct', err);
        }
    }
    function getAllListData2(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var custId = options.custId;
            var orderNo = options.orderNo;
            var promCode = options.parameters.row['promCode'.toUpperCase()];
            var BPCodeStr = options.parameters.row['BPCode'.toUpperCase()];
            var productStr = options.parameters.productStr;
            var CMBaudRateStr = options.parameters.CMBaudRateStr;
            var period = options.period;
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                orderNo: { type: 'string', value: convertToNull(orderNo) },
                promCode: { type: 'string', value: convertToNull(promCode) },
                BPCodeStr: { type: 'string', value: convertToNull(BPCodeStr) },
                strProductStr: { type: 'string', value: convertToNull(productStr) },
                strCMBaudRateStr: { type: 'string', value: convertToNull(CMBaudRateStr) },
                v: { type: 'integer', value: period },
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'GetAllListData2',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
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
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getAllListData2', err);
        }
    };
    function refreshHasProduct(div) {
        try {
            var options = $.data(div, formName).options;
            var grids = ["dgHasProduct"];
            var sources = ["hasProductSource"];
            var tables = [hasProductTableName];
            for (var i = 0; i < grids.length; i++) {
                options[sources[i]].localdata = options.initData[tables[i]].rows;
                getControlObject(div, grids[i]).jqxGrid('updatebounddata');
                if (options[sources[i]].localdata.length > 0) {
                    getControlObject(div, grids[i]).jqxGrid('selectrow', 0);
                }
            }
            //getControlObject(div, 'dgHasProduct').jqxGrid('scrolloffset', 0, 0);
        }
        catch (err) {
            errorHandle(formName, 'refreshHasProduct', err);
        }
    }
    function refreshGrid(div) {
        try {
            refreshSaleFacility(div);
            refreshProduct(div);
            refreshFacility(div);
            refreshHasProduct(div);
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };
    function refreshSaleFacility(div) {
        try {
            var options = $.data(div, formName).options;
            options['saleFacilitySource'].localdata = options.initData[saleFacilityTableName].rows;
            getControlObject(div, "dgSaleFacility").jqxGrid('updatebounddata');
            var lLength = options['saleFacilitySource'].localdata.length;
            if (lLength > 0) {
                getControlObject(div, 'dgSaleFacility').jqxGrid('selectrow', 0);
            }
        }
        catch (err) {
            errorHandle(formName, 'refreshProduct', err);
        }
    };
    function refreshProduct(div) {
        try {
            var options = $.data(div, formName).options;
            options['productSource'].localdata = options.initData[productCodeTableName].rows;
            getControlObject(div, "dgProduct").jqxGrid('updatebounddata');
            var lLength = options['productSource'].localdata.length;
            if (lLength > 0) {
                getControlObject(div, 'dgProduct').jqxGrid('selectrow', 0);
            }
        }
        catch (err) {
            errorHandle(formName, 'refreshProduct', err);
        }
    };
    function refreshPeriod(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.periodRender != true) return;
            options['periodSource'].localdata = options.initData[periodTableName].rows;
            getControlObject(div, "dgPeriod").jqxGrid('updatebounddata');
            var lLength = options['periodSource'].localdata.length;
            if (lLength > 0) {
                for (var i = 0; i < lLength; i++) {
                    if (options['periodSource'].localdata['MASTERSALE'] == 1) {
                        getControlObject(div, 'dgPeriod').jqxGrid('selectrow', i);
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'refreshHasProduct', err);
        }
    };
    function getNeedFacility(div, action) {
        try {
            var options = $.data(div, formName).options;
            var productStr = getRowFieldString(getChooseRows(getControlObject(div, 'dgProduct').jqxGrid('getrows')), 'PRODUCTCODE');
            if (isEmpty(productStr)) {
                delete options.initData[needFacilityTableName].rows;
                options.initData[needFacilityTableName].rows = [];
                action([true]);
                return;
            }
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var custId = options.custId;
            var orderNo = options.OrderNo;
            var CMBaudRateStr = getControlObject(div, 'csCMBaudRate').csList('codeNo');
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                orderNo: { type: 'string', value: orderNo },
                strProductStr: { type: 'string', value: convertToNull(productStr) },
                strCMBaudRateStr: { type: 'string', value: convertToNull(CMBaudRateStr) },
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'GetNeedFacility',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    //messageBox(JSON.stringify(data));
                    if (data.ResultBoolean == true) {
                        delete options.initData[needFacilityTableName];
                        options.initData[needFacilityTableName] = JSON.parse(data.ResultXML)[needFacilityTableName];
                        action([true]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getNeedFacility', err);
        }
    };
    function getExistProduct2(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var custId = options.custId;
            var faciSeqNoStr = getRowFieldString(getChooseRows(getControlObject(div, 'dgFacility').jqxGrid('getrows')), 'SEQNO', "'");
            if (isEmpty(faciSeqNoStr)) faciSeqNoStr = "-1";
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                faciSeqNoStr: { type: 'string', value: convertToNull(faciSeqNoStr) },
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'GetExistProduct2',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        delete options.initData[hasProductTableName];
                        options.initData[hasProductTableName] = JSON.parse(data.ResultXML)[hasProductTableName];
                        action([true]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getExistProduct2', err);
        }
    };
    function getProductCodeByBPCode(div, period, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var promCode = options.parameters.row['promCode'.toUpperCase()];
            var BPCodeStr = options.parameters.row['BPCode'.toUpperCase()];
            var CMBaudRate = getControlObject(div, 'csCMBaudRate').csList('codeNo');
            //var ProductCodeStr = options.parameters.productStr;
            var ProductCodeStr;
            var parameters = $.extend({}, paraLoginInfo, {
                promCode: { type: 'string', value: promCode },
                bpCode: { type: 'string', value: BPCodeStr },
                CMBaudRate: { type: 'string', value: convertToNull(CMBaudRate) },
                ProductCodeStr: { type: 'string', value: convertToNull(ProductCodeStr) },
                period: { type: 'integer', value: period }
            });
            //messageBox(JSON.stringify(parameters));
            var params = getParameters(riadllName,
                riaClassName,
                'GetProductCodeByBPCode',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        delete options.initData[productCodeTableName];
                        options.initData[productCodeTableName] = JSON.parse(data.ResultXML)[productCodeTableName];
                        action([true]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getProductCodeByBPCode', err);
        }
    };
    function defaultMinusProduct(div) {
        try {
            var options = $.data(div, formName).options;
            var hasRows = options.initData[hasProductTableName].rows;
            var orderRows = getChooseRows(getControlObject(div, 'dgProduct').jqxGrid('getrows'));
            for (var i = 0; i < hasRows.length; i++) {
                for (var j = 0; j < orderRows.length; j++) {
                    if (hasRows[i]['PRODUCTCODE'] == orderRows[j]['PRODUCTCODE']) {
                        hasRows[i]['CHOOSE'] = true;
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'defaultMinusProduct', err);
        }
    };
    function setOldCheckedFaciRows(div) {
        try {
            var options = $.data(div, formName).options;
            var oFaciRows = options.oldCheckedFaciRow;
            var faciRows = options.initData[realFacilityTableName].rows;
            for (var i = 0; i < faciRows.length; i++) {
                for (var j = 0; j < oFaciRows.length; j++) {
                    if (faciRows[i]['SEQNO'] == oFaciRows[j]['SEQNO'] &&
                        faciRows[i]['FACICODE'] == oFaciRows[j]['FACICODE'] &&
                        faciRows[i]['PTCODE'] == oFaciRows[j]['PTCODE']) {
                        faciRows[i]['CHOOSE'] = true;
                    }
                }
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'setOldFacility', err);
        }
    }
    function addHandler(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'dgProduct').on('cellvaluechanged', function (event) {
                try {
                    var args = event.args;
                    if (options.productChanging == true) return;
                    if (args == null) {
                        options.productChanging = false;
                        return;
                    }
                    options.productChanging = true;
                    var datafield = args.datafield;
                    var rowindex = args.rowindex;
                    var row = $(this).jqxGrid('getrowdatabyid', rowindex);
                    if (datafield != 'CHOOSE') {
                        options.productChanging = false;
                        return;
                    }
                    if (row['MUSTCHOOSE'] == 1) {
                        $(this).jqxGrid('setcellvalue', rowindex, datafield, true);
                        row['CHOOSE'] = true;
                        options.productChanging = false;
                        return;
                    }
                    options.oldCheckedFaciRow = getChooseRows(getControlObject(div, 'dgFacility').jqxGrid('getrows'));

                    getNeedFacility(div, function (r) {
                        try {
                            if (r[0] == true) {
                                combineFacility(div);
                                defaultFacility(div, true);
                                setOldCheckedFaciRows(div);
                                refreshFacility(div);
                            }
                            else {
                                messageBox(r[1]);
                            }
                            options.productChanging = false;
                        }
                        catch (err) {
                            options.productChanging = false;
                            errorHandle(formName, 'addHandler_dgProduct_cellvaluechanged_getNeedFacility', err);
                        }
                    });
                }
                catch (err) {
                    options.productChanging = false;
                    errorHandle(formName, 'addHandler_dgProduct_cellvaluechanged', err);
                }
            });
            getControlObject(div, 'dgFacility').on('cellvaluechanged', function () {
                try {
                    //var chooseFaci = getRowByKeyValue(getChooseRows($(this).jqxGrid('getrows')), 'TYPE', "1", true);
                    //if (chooseFaci == null || chooseFaci.length == 0) {
                    //    delete options.initData[hasProductTableName].rows;
                    //    options.initData[hasProductTableName].rows = [];
                    //    options.hasProductSource.localdata = [];
                    //    getControlObject(div, 'dgHasProduct').jqxGrid('updatebounddata');
                    //}
                    //else {
                    //    getExistProduct2(div, function (r) {
                    //        if (r[0] == true) {
                    //            defaultMinusProduct(div);
                    //            refreshHasProduct(div);
                    //        }
                    //        else {
                    //            messageBox(r[1]);
                    //        }
                    //    });
                    //}
                    getExistProduct2(div, function (r) {
                        if (r[0] == true) {
                            defaultMinusProduct(div);
                            refreshHasProduct(div);
                        }
                        else {
                            messageBox(r[1]);
                        }
                    });
                }
                catch (err) {
                    errorHandle(formName, 'addHandler_dgFacility_cellvaluechanged', err);
                }
            });
            //改保證金暫不做,從訂購清單做
            //getControlObject(div, 'dgFacility').on('celldoubleclick', function (event) {
            //    try {
            //        var args = event.args;
            //        var rowIndex = args.rowindex;
            //        var field = args.datafield;
            //        //var row = getControlObject(div, 'dgFacility').jqxGrid('getrowdata',rowIndex);
            //        var row = options.initData[realFacilityTableName].rows[rowIndex];
            //        var chargeRow = options.initData[realFacilityTableName].rows[0];
            //        if (row['TYPE'] == 0 && field == 'PTNAME') {
            //            var e = $.Event("clickChangePT", { args: { row: row }});
            //            $(div).triggerHandler(e);
            //        }
            //    }
            //    catch (err) {
            //        errorHandle(formName, 'addHandler_dgFacility_celldoubleclick', err);
            //    }
            //});
            getControlObject(div, 'dgPeriod').on('rowselect', function (event) {
                try {
                    var args = event.args;
                    var row = $(this).jqxGrid('getrowdata', args.rowindex);
                    setPeriodValue(div, row['PERIOD']);
                    refreshProductData(div, row['PERIOD'], function (r) {

                    });
                    //var oProduct = getChooseRows(getControlObject(div, 'dgProduct').jqxGrid('getrows'));
                    //getProductCodeByBPCode(div, row['PERIOD'], function (r) {
                    //    try {
                    //        if (r[0] == true) {
                    //            for (var i = 0; i < oProduct.length; i++) {
                    //                var row = getRowByKeyValue(options.initData[productCodeTableName].rows, 'PRODUCTCODE', oProduct[i]['PRODUCTCODE']);
                    //                row['CHOOSE'] = true;
                    //            }
                    //            delete oProduct;
                    //            refreshProduct(div);
                    //        }
                    //        else if (r[1] != null) {
                    //            messageBox(r[1]);
                    //        }
                    //    }
                    //    catch (err) {
                    //        errorHandle(formName, 'dgPeriod_rowselect_getProductCodeByBPCode', err);
                    //    }
                    //});
                }
                catch (err) {
                    errorHandle(formName, 'dgPeriod_rowselect', err);
                }
            });
            getControlObject(div, 'tPeriod').on('open', function () {
                try {
                    var o = getRowByKeyValue(options.controls, 'name', $(this).prop('id'));
                    renderPeriodGrid(div, o.level + 1);
                    refreshPeriod(div);
                    getControlObject(div, 'dgPeriod').prop('style').removeProperty('display');;
                    $(document).on('click', this, closeDropDownMenu);
                }
                catch (err) {
                    errorHandle(formName, 'addHandler_tPeriod_open', err);
                }
            });
            getControlObject(div, 'tPeriod').on('close', function () {
                try {
                    getControlObject(div, 'dgPeriod').css('display', 'none');
                    $(document).off('click', closeDropDownMenu);
                }
                catch (err) {
                    errorHandle(formName, 'addHandler_tPeriod_close', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'addHandler', err);
        }
    };
    function refreshProductData(div, period, action) {
        try {
            var options = $.data(div, formName).options;
            if (period == null) {
                period = $(getControlObject(div, 'tPeriod').jqxDropDownButton('getContent')).text();
            }
            var oProduct = getChooseRows(getControlObject(div, 'dgProduct').jqxGrid('getrows'));
            getProductCodeByBPCode(div, period, function (r) {
                try {
                    if (r[0] == true) {
                        for (var i = 0; i < oProduct.length; i++) {
                            var row = getRowByKeyValue(options.initData[productCodeTableName].rows, 'PRODUCTCODE', oProduct[i]['PRODUCTCODE']);
                            if (row != null) row['CHOOSE'] = true;
                        }
                        delete oProduct;
                        refreshProduct(div);
                    }
                    else if (r[1] != null) {
                        messageBox(r[1]);
                    }
                    action(true);
                }
                catch (err) {
                    errorHandle(formName, 'refreshProductData_getProductCodeByBPCode', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'refreshProductData', err);
        }
    };
    function listAddHandler(div) {
        try {
            getControlObject(div, 'csCMBaudRate').off();
            getControlObject(div, 'csCMBaudRate').on('selectedIndexChanged', function () {
                var value = getControlObject(div, 'csCMBaudRate').csList('codeNo');
                if (value == null) return;
                refreshProductData(div, null, function (r) {

                });
            });
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    }
    function closeDropDownMenu(args) {
        try {
            var oo = $(document.activeElement).children(0);
            if (oo.length > 0) {
                if (oo[0]['id'].length > 0 && oo[0]['id'].indexOf('dropDownButton') !== 0) {
                    $(args.data).jqxDropDownButton('close');
                } else {
                    if (oo[0]['id'].indexOf(args.data.id) < 0) {
                        $(args.data).jqxDropDownButton('close');
                    }
                }
            } else {
                $(args.data).jqxDropDownButton('close');
            }
        }
        catch (err) {
            errorHandle(formName, 'closeDropDownMenu', err);
        }
    };

})(jQuery);