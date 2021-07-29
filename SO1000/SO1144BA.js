//訂單明細
(function ($) {
    var formName = 'SO1144BA';
    var riadllName = 'CableSoft.SO.RIA.Order.Edit.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Order.Edit.Web.NewOrderEdit';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 25;
    var orderItemTableName = "OrderItem";
    var wipTableName = "Wip";
    var productTableName = "Product";
    var chargeTableName = "Charge";
    var facilityTableName = "Facility";
    var presentTableName = "Present";
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
                        options: $.extend({}, new defaults(), new SO1144BA(), options)
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
        refresh: function (jq) {
            return jq.each(function () {
                refresh(this);
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
                    var percent = 0.99;
                    var height = $(div).height() * percent;
                    var height1 = Math.floor(height * 2 / 5);
                    var height2 = Math.floor(height * 3 / 5);
                    //$('#' + controls[i].name).jqxSplitter({ height: (percent * 100) + '%', panels: [{ size: height1 }, { size: height2 }] });
                    $('#' + controls[i].name).jqxSplitter({ panels: [{ size: height1 }, { size: height2 }] });
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
                            addHandler(div);
                            buttonAddHandler(div);
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
    function refresh(div) {
        try {
            var options = $.data(div, formName).options;
            var grids = ['dgWip', 'dgProduct', 'dgCharge', 'dgFacility', 'dgClose', 'dgPresent', 'dgOrderItem', ];
            var sources = ['wipSource', 'productSource', 'chargeSource', 'facilitySource', 'closeSource', 'presentSource', 'orderItemSource', ];
            var tables = [wipTableName, productTableName, chargeTableName, facilityTableName, closeTableName, presentTableName, orderItemTableName, ];
            for (var i = 0; i < grids.length; i++) {
                options[sources[i]].localdata = options.orderData[tables[i]].rows;
                getControlObject(div, grids[i]).jqxGrid('updatebounddata');
                if (options[sources[i]].localdata.length > 0) {
                    getControlObject(div, grids[i]).jqxGrid('selectrow', 0);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'refresh', err);
        }
    };
    function clear(div) {
        try {
            return true;
        }
        catch (err) {
            errorHandle(formName, 'clear', err);
        }
    };
    function disabled(div, flag) {
        try {
            var options = $.data(div, formName).options;
            disableAllControls(options.controls, flag);
            getControlObject(div, 'gbxTabs').csTabs({ disabled: false });
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
            //oArray = ["gbxAll"];
            //oLength = oArray.length;
            //for (var i = 0 ; i < oLength; i++) {
            //    var iId = $(div).prop('id') + oArray[i];
            //    $('#' + iId).jqxSplitter({
            //        theme: options.theme,
            //        height: $(div).height() - 2,
            //        width: '100%',
            //        resizable: false,
            //        showSplitBar: false,
            //        orientation: 'horizontal',
            //        panels: [{ size: $(div).height() * 2 / 5 }, { size: $(div).height() * 3 / 5 }]
            //    });
            //    controls.push({ name: iId, type: 'jqxSplitter', level: level });
            //}
            //level += 1;
            getControlObject(div, 'gbxTop').css('height', $(div).height() * 2 / 5);
            getControlObject(div, 'gbxBottom').css('height', $(div).height() * 3 / 5);
            //建立內層Expander
            oArray = ["gbxOrderItem", "gbxWip"];
            oWidthArray = ["40%", "59.2%"];
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
                $('#' + iId + ' .jqx-expander-header-expanded').css({ 'height': 16, 'padding-bottom': 1 });
                controls.push({ name: iId, type: 'jqxExpander', level: level });
            }
            level += 1;
            //建立內層csTabs
            oArray = ["gbxTabs"];
            oWidthArray = ["99.5%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csTabs({
                    theme: options.theme,
                    width: oWidthArray[i],
                    height: '99%',
                });
                var tabTitles = ['lProduct', 'lCharge', 'lFacility', 'lPresent'];
                for (var j = 0; j < tabTitles.length; j++) {
                    $('#' + iId).csTabs('setTitleAt', j, lang[tabTitles[j]]);
                }
                controls.push({ name: iId, type: 'csTabs', level: level });
            }
            level += 1;
            //建立CheckBox
            oArray = ["chkFilterItem"];
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
            //建立按鈕
            oArray = [//'btnAddCharge', 'btnEditCharge', "btnDelCharge",
                    //'btnAddFaci', 'btnEditFaci', "btnDelFaci",
                    //'btnAddPresent', 'btnEditPresent', "btnDelPresent",
                    'btnEditOrderItem', "btnDelOrderItem"
            ];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var width = 30;
                //var text = lang[oArray[i]];
                //o.text(text);
                var img = {};
                if (oArray[i].indexOf('Add') >= 0) {
                    img = imageScr.append;
                }
                else if (oArray[i].indexOf('Edit') >= 0) {
                    img = imageScr.edit;
                }
                else if (oArray[i].indexOf('Del') >= 0) {
                    img = imageScr.delete;
                }
                $('#' + bId).jqxButton($.extend({
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                }, img));
                controls.push({ name: bId, type: 'jqxButton', level: level });
                $('#' + bId).css("margin", 2);
                $('#' + bId).css("float", 'left');
                $('#' + bId).css("max-width", 100);
            }
            renderOrderItemGrid(div, level);
            level += 1;
            renderWipGrid(div, level);
            level += 1;
            renderProductGrid(div, level);
            renderChargeGrid(div, level);
            renderFacilityGrid(div, level);
            renderPresentGrid(div, level);
            renderCloseGrid(div, level);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function renderOrderItemGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgOrderItem';
            options.orderItemSource = {
                datatype: "json",
                localdata: options.orderData[orderItemTableName].rows,
                datafields: [
                    { name: 'ORDERITEM', type: 'int' },
                    { name: 'PROMCODE', type: 'int' },
                    { name: 'PROMNAME', type: 'str' },
                    { name: 'BPCODE', type: 'str' },
                    { name: 'BPNAME', type: 'str' },
                    { name: 'ISNOPROM', type: 'bool' },
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.orderItemSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '89%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                editable: false,
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.dgOrderItem_ORDERITEM, datafield: 'ORDERITEM', width: 50 },
                  { text: lang.dgOrderItem_PROMNAME, datafield: 'PROMNAME', width: 100 },
                  { text: lang.dgOrderItem_BPNAME, datafield: 'BPNAME', width: 120 },
                  //{ text: lang.dgOrderItem_ISNOPROM, datafield: 'ISNOPROM', width: 50 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderOrderItemGrid', err);
        }
    };
    function renderWipGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgWip';
            options.wipSource = {
                datatype: "json",
                localdata: options.orderData[wipTableName].rows,
                datafields: [
                    { name: 'ORDERITEM', type: 'int' },
                    { name: 'WORKERTYPE', type: 'string' },
                    { name: 'WORKCODE', type: 'int' },
                    { name: 'WORKNAME', type: 'string' },
                    { name: 'SNO', type: 'string' },
                    { name: 'RESVTIME', type: 'date' },
                    { name: 'WORKUNIT', type: 'float' },
                    { name: 'FINTIME', type: 'date' },
                    { name: 'RETURNNAME', type: 'string' },
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.wipSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '99%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.dgWip_ORDERITEM, datafield: 'ORDERITEM', width: 40 },
                  { text: lang.dgWip_WORKERTYPE, datafield: 'WORKERTYPE', width: 40 },
                  { text: lang.dgWip_WORKCODE, datafield: 'WORKCODE', width: 60 },
                  { text: lang.dgWip_WORKNAME, datafield: 'WORKNAME', width: 90 },
                  { text: lang.dgWip_SNO, datafield: 'SNO', width: 90 },
                  { text: lang.dgWip_RESVTIME, datafield: 'RESVTIME', width: 100, cellsformat: 'yyyy/MM/dd HH:mm' },
                  { text: lang.dgWip_WORKUNIT, datafield: 'WORKUNIT', width: 50, cellsformat: 'f2', cellsalign: 'right', align: 'right' },
                  { text: lang.dgWip_FINTIME, datafield: 'FINTIME', width: 100, cellsformat: 'yyyy/MM/dd HH:mm' },
                  { text: lang.dgWip_RETURNNAME, datafield: 'RETURNNAME', width: 80 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });

        }
        catch (err) {
            errorHandle(formName, 'renderWipGrid', err);
        }
    };
    function renderProductGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgProduct';
            options.productSource = {
                datatype: "json",
                localdata: options.orderData[productTableName].rows,
                datafields: [
                    { name: 'ORDERITEM', type: 'int' },
                    { name: 'BPCODE', type: 'string' },
                    { name: 'BPNAME', type: 'string' },
                    { name: 'PRODUCTCODE', type: 'int' },
                    { name: 'PRODUCTNAME', type: 'string' },
                    { name: 'FACISEQNO', type: 'string' },
                    { name: 'WORKNAME', type: 'string' },
                ]
            };

            var dataAdapter = new $.jqx.dataAdapter(options.productSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '99%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                ready: function () {
                    options.dgProductOk = true;
                    filterDetailGrid(div);
                },
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.dgProduct_ORDERITEM, datafield: 'ORDERITEM', width: 40 },
                  { text: lang.dgProduct_BPCODE, datafield: 'BPCODE', width: 100 },
                  { text: lang.dgProduct_BPNAME, datafield: 'BPNAME', width: 150 },
                  { text: lang.dgProduct_PRODUCTCODE, datafield: 'PRODUCTCODE', width: 80 },
                  { text: lang.dgProduct_PRODUCTNAME, datafield: 'PRODUCTNAME', width: 120 },
                  { text: lang.dgProduct_FACISEQNO, datafield: 'FACISEQNO', width: 120 },
                  { text: lang.dgProduct_WORKNAME, datafield: 'WORKNAME', width: 120 },
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderProductGrid', err);
        }
    };
    function renderChargeGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgCharge';
            options.chargeSource = {
                datatype: "json",
                localdata: options.orderData[chargeTableName].rows,
                datafields: [
                    { name: 'ORDERITEM', type: 'int' },
                    { name: 'ASSIGNPROD', type: 'int' },
                    { name: 'CITEMCODE', type: 'int' },
                    { name: 'CITEMNAME', type: 'string' },
                    { name: 'BPCODE', type: 'string' },
                    { name: 'BPNAME', type: 'string' },
                    { name: 'PERIOD', type: 'int' },
                    { name: 'AMOUNT', type: 'float' },
                    { name: 'FACISEQNO', type: 'string' },
                    { name: 'FACISNO', type: 'string' },
                    { name: 'NEXTPERIOD', type: 'int' },
                    { name: 'STARTDATE', type: 'date' },
                    { name: 'STOPDATE', type: 'date' },
                    { name: 'WORKNAME', type: 'string' },
                ]
            };
            var cellsRenderer = function (row, field, value, defaulthtml, columnproperties) {
                var dh = $(defaulthtml);
                var text = "";
                switch (value) {
                    case 3:
                        dh.css('color', 'red');
                        text = options.language.isClose;
                        break;
                    default:
                        text = options.language.isNormal;
                        break;
                }
                dh.text(text);
                return $(dh)[0].outerHTML;
            }
            var dataAdapter = new $.jqx.dataAdapter(options.chargeSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '99%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                ready: function () {
                    options.dgChargeOk = true;
                    filterDetailGrid(div);
                },
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.dgCharge_ORDERITEM, datafield: 'ORDERITEM', width: 40 },
                  { text: lang.dgCharge_ASSIGNPROD, datafield: 'ASSIGNPROD', width: 40, cellsrenderer: cellsRenderer },
                  { text: lang.dgCharge_CITEMCODE, datafield: 'CITEMCODE', width: 80 },
                  { text: lang.dgCharge_CITEMNAME, datafield: 'CITEMNAME', width: 100 },
                  { text: lang.dgCharge_BPCODE, datafield: 'BPCODE', width: 90 },
                  { text: lang.dgCharge_BPNAME, datafield: 'BPNAME', width: 120 },
                  { text: lang.dgCharge_PERIOD, datafield: 'PERIOD', width: 40, cellsalign: 'right', align: 'right' },
                  { text: lang.dgCharge_AMOUNT, datafield: 'AMOUNT', width: 60, cellsalign: 'right', align: 'right' },
                  { text: lang.dgCharge_FACISEQNO, datafield: 'FACISEQNO', width: 100 },
                  { text: lang.dgCharge_FACISNO, datafield: 'FACISNO', width: 100 },
                  { text: lang.dgCharge_NEXTPERIOD, datafield: 'NEXTPERIOD', width: 60, cellsalign: 'right', align: 'right' },
                  { text: lang.dgCharge_STARTDATE, datafield: 'STARTDATE', width: 80, cellsformat: 'yyyy/MM/dd' },
                  { text: lang.dgCharge_STOPDATE, datafield: 'STOPDATE', width: 80, cellsformat: 'yyyy/MM/dd' },
                  { text: lang.dgCharge_WORKNAME, datafield: 'WORKNAME', width: 120 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });

        }
        catch (err) {
            errorHandle(formName, 'renderChargeGrid', err);
        }
    };
    function renderFacilityGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgFacility';
            options.facilitySource = {
                datatype: "json",
                localdata: options.orderData[facilityTableName].rows,
                datafields: [
                    { name: 'ORDERITEM', type: 'int' },
                    { name: 'BPCODE', type: 'string' },
                    { name: 'BPNAME', type: 'string' },
                    { name: 'FACICODE', type: 'int' },
                    { name: 'FACINAME', type: 'string' },
                    { name: 'CMBAUDRATE', type: 'string' },
                    { name: 'FACISEQNO', type: 'string' },
                    { name: 'WORKNAME', type: 'string' },
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.facilitySource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '99%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                ready: function () {
                    options.dgFacilityOk = true;
                    filterDetailGrid(div);
                },
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.dgFacility_ORDERITEM, datafield: 'ORDERITEM', width: 40 },
                  { text: lang.dgFacility_BPCODE, datafield: 'BPCODE', width: 80 },
                  { text: lang.dgFacility_BPNAME, datafield: 'BPNAME', width: 150 },
                  { text: lang.dgFacility_FACICODE, datafield: 'FACICODE', width: 80 },
                  { text: lang.dgFacility_FACINAME, datafield: 'FACINAME', width: 100 },
                  { text: lang.dgFacility_CMBAUDRATE, datafield: 'CMBAUDRATE', width: 80 },
                  { text: lang.dgFacility_FACISEQNO, datafield: 'FACISEQNO', width: 100 },
                  { text: lang.dgFacility_WORKNAME, datafield: 'WORKNAME', width: 120 },
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
    function renderPresentGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgPresent';
            options.presentSource = {
                datatype: "json",
                localdata: options.orderData[presentTableName].rows,
                datafields: [
                    { name: 'ORDERITEM', type: 'int' },
                    { name: 'GIFTKIND', type: 'int' },
                    { name: 'DEPENDCODE', type: 'string' },
                    { name: 'DEPENDNAME', type: 'string' },
                    { name: 'ARTICLENO', type: 'int' },
                    { name: 'ARTICLENAME', type: 'string' },
                    { name: 'AMOUNT', type: 'float' },
                    { name: 'PRICE', type: 'float' },
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.presentSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '99%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                ready: function () {
                    options.dgPresentOk = true;
                    filterDetailGrid(div);
                },
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.dgPresent_ORDERITEM, datafield: 'ORDERITEM', width: 40 },
                  { text: lang.dgPresent_GIFTKIND, datafield: 'GIFTKIND', width: 60 },
                  { text: lang.dgPresent_DEPENDCODE, datafield: 'DEPENDCODE', width: 80 },
                  { text: lang.dgPresent_DEPENDNAME, datafield: 'DEPENDNAME', width: 150 },
                  { text: lang.dgPresent_ARTICLENO, datafield: 'ARTICLENO', width: 80 },
                  { text: lang.dgPresent_ARTICLENAME, datafield: 'ARTICLENAME', width: 100 },
                  { text: lang.dgPresent_AMOUNT, datafield: 'AMOUNT', width: 80, cellsalign: 'right', align: 'right' },
                  { text: lang.dgPresent_PRICE, datafield: 'PRICE', width: 70, cellsalign: 'right', align: 'right' },
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderPresentGrid', err);
        }
    };
    function renderCloseGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgClose';
            options.closeSource = {
                datatype: "json",
                localdata: options.orderData[closeTableName].rows,
                datafields: [
                    { name: 'SBILLNO', type: 'string' },
                    { name: 'SITEM', type: 'int' },
                    { name: 'PRODUCTCODE', type: 'int' },
                    //{ name: 'PRODUCTNAME', type: 'string' },
                    { name: 'CITEMCODE', type: 'int' },
                    { name: 'CITEMNAME', type: 'string' },
                    { name: 'AMOUNT', type: 'float' },
                    { name: 'SERVICEID', type: 'int' },
                    { name: 'WORKNAME', type: 'string' },
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.closeSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '99%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                rowsheight: gridHeight,
                ready: function () {
                    options.dgCloseOk = true;
                    filterDetailGrid(div);
                },
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.dgClose_PRODUCTCODE, datafield: 'PRODUCTCODE', width: 80 },
                  //{ text: lang.dgClose_PRODUCTNAME, datafield: 'PRODUCTNAME', width: 100 },
                  { text: lang.dgClose_CITEMCODE, datafield: 'CITEMCODE', width: 80 },
                  { text: lang.dgClose_CITEMNAME, datafield: 'CITEMNAME', width: 100 },
                  { text: lang.dgClose_AMOUNT, datafield: 'AMOUNT', width: 60, cellsalign: 'right', align: 'right' },
                  { text: lang.dgClose_SERVICEID, datafield: 'SERVICEID', width: 80 },
                  { text: lang.dgClose_SBILLNO, datafield: 'SBILLNO', width: 100 },
                  { text: lang.dgClose_SITEM, datafield: 'SITEM', width: 54 },
                  { text: lang.dgCharge_WORKNAME, datafield: 'WORKNAME', width: 120 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderCloseGrid', err);
        }
    };
    function filterDetailGrid(div, orderItem) {
        try {
            var options = $.data(div, formName).options;
            var isChecked = getControlObject(div, 'chkFilterItem').jqxCheckBox('val');
            if (orderItem == null) orderItem = getOrderItem(div);
            var idx = getControlObject(div, 'gbxTabs').csTabs('val');
            var grid;
            switch (idx) {
                case 0:
                    grid = "dgProduct";
                    break;
                case 1:
                    grid = "dgCharge";
                    break;
                case 2:
                    grid = "dgFacility";
                    break;
                case 3:
                    grid = "dgPresent";
                    break;
            }
            if (options[grid + 'Ok'] == true) {
                filterGrid(div, grid, isChecked, orderItem);
            }
        }
        catch (err) {
            errorHandle(formName, 'filterGrid', err);
        }
    }
    function filterAllGrid(div, orderItem) {
        try {
            var isChecked = getControlObject(div, 'chkFilterItem').jqxCheckBox('val');
            if (orderItem == null) orderItem = getOrderItem(div);
            var grids = ['dgWip'];
            for (var i = 0; i < grids.length; i++) {
                filterGrid(div, grids[i], isChecked, orderItem);
            }
            filterDetailGrid(div, orderItem);
        }
        catch (err) {
            errorHandle(formName, 'filterGrid', err);
        }
    }
    function filterGrid(div, grid, checked, orderItem) {
        try {
            getControlObject(div, grid).jqxGrid('refresh');
            getControlObject(div, grid).jqxGrid('clearfilters');
            if (checked == true) {
                var filtergroup = new $.jqx.filter();
                var filter_or_operator = 1;
                var filtertype = 'numericfilter';
                var datafield = 'ORDERITEM';
                var filtervalue = orderItem;
                var filtercondition = 'equal';
                var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
                filtergroup.addfilter(filter_or_operator, filter);
                getControlObject(div, grid).jqxGrid('addfilter', datafield, filtergroup);
                getControlObject(div, grid).jqxGrid('applyfilters');

            }
            var rows = getControlObject(div, grid).jqxGrid('getdisplayrows');
            if (rows.length > 0) {
                var rows = getControlObject(div, grid).jqxGrid('selectrow', 0);
            }
        }
        catch (err) {
            errorHandle(formName, 'filterGrid', err);
        }
    };
    function getOrderItem(div) {
        var rowId = getControlObject(div, 'dgOrderItem').jqxGrid('getselectedrowindex');
        var row = getControlObject(div, 'dgOrderItem').jqxGrid('getrowdatabyid', rowId);
        if (row == null) return;
        return row['ORDERITEM'];
    };
    function deleteItem(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.orderData[orderItemTableName].rows.length == 0) return;
            messageBox(options.language.sureDelete, messageType.yesno, null, function (r) {
                try {
                    if (r == 'yes') {
                        var orderItem = getOrderItem(div);
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
                        refresh(div);
                        var e = $.Event("chooseOk", { args: { type: 3, orderData: options.orderData } });
                        $(div).triggerHandler(e);
                    }
                }
                catch (err) {
                    errorHandle(formName, 'deleteItem_messageBox', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, 'deleteItem', err);
        }
    };
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'btnEditOrderItem').on('click', function () {
                try {
                    if (options.orderData[orderItemTableName].rows.length == 0) return;
                    var idx = getControlObject(div, 'dgOrderItem').jqxGrid('getselectedrowindex');
                    var row = getControlObject(div, 'dgOrderItem').jqxGrid('getrowdatabyid', idx);
                    var e = $.Event("chooseOk", { args: { type: 1, orderItem: row } });
                    $(div).triggerHandler(e);
                }
                catch (err) {
                    errorHandle(formName, 'buttonAddHandler_btnEditOrderItem_click', err);
                }
            });
            getControlObject(div, 'btnDelOrderItem').on('click', function () {
                deleteItem(div);
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    function addHandler(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'dgOrderItem').on('rowselect', function (e) {
                // event arguments.
                var args = e.args;
                // row's bound index.
                var rowBoundIndex = args.rowindex;
                // row's data. The row's data object or null(when all rows are being selected or unselected with a single action). If you have a datafield called "firstName", to access the row's firstName, use var firstName = rowData.firstName;
                var rowData = args.row;
                filterAllGrid(div, rowData['ORDERITEM']);
            });
            getControlObject(div, 'gbxTabs').on('selected', function () {
                filterDetailGrid(div);
            });
            getControlObject(div, "chkFilterItem").on('change', function () {
                filterAllGrid(div);
            });
        }
        catch (err) {
            errorHandle(formName, 'addHandler', err);
        }
    };
})(jQuery);