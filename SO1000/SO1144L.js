(function ($) {
    var formName = 'SO1144L';
    var riadllName = 'CableSoft.SO.RIA.Order.Calculate.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Order.Calculate.Web.Calculate';
    var plusTableName = "plus";
    var minusTableName = "minus";
    var chargeTableName = 'Charge';
    var wipTableName = 'Wip';
    var prwipTableName = 'PRWip';
    var faciTableName = 'Facility';
    var invTableName = 'Invoice';
    var presentTableName = 'Present';
    var buttonsHeight = 23;
    $.fn['SO1144L'] = function (options, param, param2) {
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
                        options: $.extend({}, new defaults(), new SO1144L(), options)
                    });
                    formLoaded(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1144L', err);
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
        refresh: function (jq, param) {
            return jq.each(function () {
                refresh(this, param);
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
        this.isSaved = false;
        this.theme = $.jqx.theme;
        this.initData = {};
        this.custId = 0;
        this.resvTime = null;
        this.wipData = {};
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
            errorHandle(formName, 'setParameter', err);
        }
    };
    function formResize(div, params) {
        try {
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            var controls = options.controls;
            for (var i = 0; i < controls.length; i++) {
                if (controls[i].type.indexOf('jqxSplitter') >= 0) {
                    var height = $(div).height();
                    var height1 = Math.floor(height * 3 / 5);
                    var height2 = Math.floor(height * 2 / 5);
                    $('#' + controls[i].name).jqxSplitter({ height: '99.5%', panels: [{ size: height1 }, { size: height2 }] });
                }
            }
            getControlObject(div, 'gbxMinus').jqxExpander('refresh');
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
            var getOptions = (function (d) {
                $(d).on('keydown', function (e) {
                    try {
                        if (e.ctrlKey && e.which == 119) {
                            messageBox($(div).prop('id') + ':\r\n' + JSON.stringify(options, null, '\t'), null, null, null, { width: 800, height: 500 });
                        }
                    }
                    catch (err) {
                        errorHandle(formName, 'getOptionsData', err, true);
                    }
                })
            });
            if (options.container != null) {
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    $(options.container).on('winClosing', function (e) {
                        close(div)
                    });
                }
                getOptions(options.container);
            }
            else {
                getOptions(div);
            }

        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function disabled(div, flag) {
        try {
            var options = $.data(div, formName).options;
            //disableAllControls(options.controls, flag);
            //getControlObject(div, 'btnWip').jqxButton({ disabled: false });
            //getControlObject(div, 'btnFacility').jqxButton({ disabled: false });
            //getControlObject(div, 'btnInvoice').jqxButton({ disabled: false });
            //getControlObject(div, 'tPresent').css({ disabled: false });
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
    function refresh(div, action) {
        var options = $.data(div, formName).options;
        if (options.parameters[chargeTableName].rows.length == 0) {
            delete options[plusTableName];
            delete options[minusTableName];
            delete options.wipData;
            options[plusTableName] = { rows: [] };
            options[minusTableName] = { rows: [] };
            calcuteInvoice(div);
            setTotalValue(div);
            refreshGrid(div);
            action(true);
        }
        else {
            execute(div, function (r) {
                if (r == true) {
                    splitData(div);
                    setTotalValue(div);
                    calcuteInvoice(div);
                    refreshGrid(div);
                    action(true);
                }
                else {
                    action(false);
                }
            });
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
    function execute(div, action) {
        try {
            var options = $.data(div, formName).options;
            if (options.calculateData != null) {
                options.wipData = options.calculateData;
                action(true);
                return;
            }
            var custId = options.custId;
            var resvTime = getResvTime(div);
            var orderData = JSON.stringify(options.parameters);
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                CustId: { type: 'integer', value: custId },
                ResvTime: { type: 'datetime', value: new Date(resvTime) },
                dsOrder: { type: 'string', value: orderData }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'Execute',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        options.wipData = JSON.parse(data.ResultXML);
                        action(true);
                    }
                    else {
                        messageBox(data.ErrorMessage, null, null, function () {
                            action(false);
                        });
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getInitData', err);
        }
    };

    //委派其他元件事件
    function textAddHandler(div, level) {
        try {
            button_Handler(div, level, 'tPresent');
            //tPresent_MouseEnter(div);
            //tPresent_MouseLeave(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'textAddHandler', err);
        }
    };
    //滑鼠移入贈品金額
    function tPresent_MouseEnter(div) {
        var options = $.data(div, formName).options;
        getControlObject(div, 'tPresent').on('mouseenter', function () {
            try {

            }
            catch (err) {
                errorHandle(formName, 'tPresent_MouseEnter', err);
            }
        });
    };
    //滑鼠移出贈品金額
    function tPresent_MouseLeave(div) {
        var options = $.data(div, formName).options;
        getControlObject(div, 'tPresent').on('mouseleave', function () {
            try {

            }
            catch (err) {
                errorHandle(formName, 'tPresent_MouseLeave', err);
            }
        });
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
            $(div).css('padding', 2);
            //建立Splitter
            oArray = ["gbxAll"];
            oLength = oArray.length;
            var sizes = [350, 200];
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxSplitter({
                    theme: options.theme,
                    height: $(div).height() - 2,
                    width: '100%',
                    orientation: 'horizontal',
                    panels: [{ size: sizes[0] }, { size: sizes[1] }]
                });
                controls.push({ name: iId, type: 'jqxSplitter', level: level });
                $($('#' + iId).children()[0]).css('overflow', 'hidden');
            }
            level += 1;
            //建立內層Expander
            oArray = ["gbxPlus", "gbxMinus"];
            oHightArray = ["80%", "99%"];
            oWidthArray = ["99.5%", "99.5%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxExpander({
                    theme: options.theme,
                    showArrow: false,
                    expanded: true,
                    toggleMode: 'none',
                    width: oWidthArray[i],
                    height: oHightArray[i]
                });
                controls.push({ name: iId, type: 'jqxExpander', level: level });
                $('#' + iId + ' .jqx-expander-header-expanded').css({ 'height': 16, 'padding-bottom': 1 });
                $('#' + iId + ' .jqx-expander-content').css('overflow', 'hidden');
            }
            level += 1;
            //建立內層Panel
            oArray = ["gbxTop"];
            var oHightArray = ["19%"];
            var oWidthArray = ["99.5%"];
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
            getControlObject(div, 'gbxTop').css('max-height', 52);
            level += 1;
            //建立按鈕
            oArray = ['btnWip', 'btnFacility', 'btnInvoice'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var width = '99%';
                var text = lang[oArray[i]];
                o.text(text);
                o.jqxButton({
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                });
                controls.push({ name: bId, type: 'jqxButton', level: level });
                $('#' + bId).css("max-width", 100);
            }
            level += 1;
            renderPlusGrid(div, level);
            renderMinusGrid(div, level);
            level += 1;
            textAddHandler(div, level);
            buttonAddHandler(div, level);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function buttonAddHandler(div, level) {
        try {
            var options = $.data(div, formName).options;
            //工單按鈕委派
            button_Handler(div, level, 'btnWip');
            //設備按鈕委派
            button_Handler(div, level, 'btnFacility');
            //發票按鈕委派
            button_Handler(div, level, 'btnInvoice');
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    function button_Handler(div, level, name) {
        try {
            var options = $.data(div, formName).options;

            //getControlObject(div, name).on('click', function () {
            //    if ($(this).jqxButton('disabled')) { return; }
            //    doClick();
            //});
            var position = 'bottom-left';
            var width = $(div).width() - 10;
            var divId = $(div).prop('id');
            switch (name) {
                case 'btnWip':
                    divId += 'dvWip';
                    width = 520;
                    break;
                case 'btnFacility':
                    divId += 'dvFacility';
                    width = 600;
                    break;
                case 'btnInvoice':
                    divId += 'dvInvoice';
                    width = 400;
                    break;
                case 'tPresent':
                    width = 700;
                    divId += 'dvPresent';
                    position = 'bottom-right';
                    break;
            }
            getControlObject(div, name).jqxTooltip({
                position: position,
                theme: options.theme,
                width: width,
                content: '<div style="width:100%;height:240px;" id="' + divId + '"></div>',
                //autoHide: false,
                height: 250,
                opacity: 1
            });
            var doClick = function (name, autoHide) {
                try {
                    var divId = $(div).prop('id');
                    var gridId = $(div).prop('id');
                    var source;
                    var table = [];
                    switch (name) {
                        case 'btnWip':
                            divId += 'dvWip';
                            gridId += 'dgdWip';
                            source = options.wipGridSource;
                            table = options.parameters[wipTableName];
                            break;
                        case 'btnFacility':
                            divId += 'dvFacility';
                            gridId += 'dgdFacility';
                            source = options.faciGridSource;
                            if (options.wipData != null) {
                                table = options.wipData[faciTableName];
                            }
                            break;
                        case 'btnInvoice':
                            divId += 'dvInvoice';
                            gridId += 'dgdInvoice';
                            source = options.invGridSource;
                            table = options[invTableName];
                            break;
                        case 'tPresent':
                            divId += 'dvPresent';
                            gridId += 'dgdPresent';
                            source = options.presentGridSource;
                            table = options.parameters[presentTableName];
                            break;
                    }
                    if (table.rows.length >= 8) {
                        getControlObject(div, name).jqxTooltip({ autoHide: false });
                    }
                    if (getControlObject(div, gridId).length > 0) {
                        source.localdata = table.rows;
                        getControlObject(div, gridId).jqxGrid('updatebounddata');
                    }
                    else {
                        switch (name) {
                            case 'btnWip':
                                getWipGrid(div, level + 1, $('#' + divId));
                                break;
                            case 'btnFacility':
                                getFaciGrid(div, level + 1, $('#' + divId));
                                break;
                            case 'btnInvoice':
                                getInvGrid(div, level + 1, $('#' + divId));
                                break;
                            case 'tPresent':
                                getPresentGrid(div, level + 1, $('#' + divId));
                                break;
                        };
                    }
                }
                catch (err) {
                    errorHandle(formName, 'button_Handler_doClick', err);
                }
            }
            getControlObject(div, name).on('open', function () {
                var divId = $(div).prop('id');
                var name = $(this).prop('id').replace(divId, '');
                doClick(name);
            });
            options.controls.push({ name: $(div).prop('id') + name, type: 'jqxTooltip', level: level });
        }
        catch (err) {
            errorHandle(formName, 'button_Handler', err);
        }
    };
    function getWipGrid(div, level, container) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgdWip';
            $('<div id="' + gridId + '"></div>').appendTo(container);
            options.wipGridSource = {
                datatype: "json",
                localdata: options.parameters[wipTableName].rows,
                datafields: [
                    { name: 'BPCODE', type: 'string' },
                    { name: 'BPNAME', type: 'string' },
                    { name: 'WORKERTYPE', type: 'string' },
                    { name: 'CODENO', type: 'int' },
                    { name: 'DESCRIPTION', type: 'string' },
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.wipGridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '98%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.gWip_BPCODE, datafield: 'BPCODE', width: 80 },
                  { text: lang.gWip_BPNAME, datafield: 'BPNAME', width: 120 },
                  { text: lang.gWip_WORKERTYPE, datafield: 'WORKERTYPE', width: 60 },
                  { text: lang.gWip_CODENO, datafield: 'CODENO', width: 60 },
                  { text: lang.gWip_DESCRIPTION, datafield: 'DESCRIPTION', width: 120 }
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'getWipGrid', err);
        }
    };
    function getFaciGrid(div, level, container) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgdFaci';
            $('<div id="' + gridId + '"></div>').appendTo(container);
            options.faciGridSource = {
                datatype: "json",
                datafields: [
                    { name: 'BPCODE', type: 'string' },
                    { name: 'BPNAME', type: 'string' },
                    { name: 'FACICODE', type: 'int' },
                    { name: 'FACINAME', type: 'string' },
                    { name: 'CMBAUDRATE', type: 'string' },
                    { name: 'FACISEQNO', type: 'string' }
                ]
            };
            if (options.wipData != null && options.wipData[faciTableName] != null) {
                options.faciGridSource.localdata = options.wipData[faciTableName].rows;
            }
            var dataAdapter = new $.jqx.dataAdapter(options.faciGridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '98%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    getGridRowNumberColumn(null, 30),
                    { text: lang.gFaci_BPCODE, datafield: 'BPCODE', width: 80 },
                    { text: lang.gFaci_BPNAME, datafield: 'BPNAME', width: 120 },
                    { text: lang.gFaci_FACICODE, datafield: 'FACICODE', width: 60 },
                    { text: lang.gFaci_FACINAME, datafield: 'FACINAME', width: 120 },
                    { text: lang.gFaci_CMBAUDRATE, datafield: 'CMBAUDRATE', width: 60 },
                    { text: lang.gFaci_FACISEQNO, datafield: 'FACISEQNO', width: 80 }
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'getFaciGrid', err);
        }
    };
    function getInvGrid(div, level, container) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgdInv';
            $('<div id="' + gridId + '"></div>').appendTo(container);
            options.invGridSource = {
                datatype: "json",
                datafields: [
                    { name: 'INVCOMPCODE', type: 'string' },
                    { name: 'TAXDESCRIPTION', type: 'string' },
                    { name: 'TOTALAMT', type: 'int' }
                ]
            };
            if (options[invTableName] != null) {
                options.invGridSource.localdata = options[invTableName].rows;
            }
            var dataAdapter = new $.jqx.dataAdapter(options.invGridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '98%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    getGridRowNumberColumn(null, 30),
                    { text: lang.gInv_INVCOMPCODE, datafield: 'INVCOMPCODE', width: 80 },
                    { text: lang.gInv_TAXDESCRIPTION, datafield: 'TAXDESCRIPTION', width: 120 },
                    { text: lang.gInv_TOTALAMT, datafield: 'TOTALAMT', width: 80 }
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'getInvGrid', err);
        }
    };
    function getPresentGrid(div, level, container) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgdInv';
            $('<div id="' + gridId + '"></div>').appendTo(container);
            options.presentGridSource = {
                datatype: "json",
                localdata: options.parameters[presentTableName].rows,
                datafields: [
                    { name: 'GIFTKIND', type: 'string' },
                    { name: 'DEPENDCODE', type: 'string' },
                    { name: 'DEPENDNAME', type: 'string' },
                    { name: 'ARTICLENO', type: 'int' },
                    { name: 'ARTICLENAME', type: 'string' },
                    { name: 'AMOUNT', type: 'float' },
                    { name: 'PRICE', type: 'int' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.presentGridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '98%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    getGridRowNumberColumn(null, 30),
                    { text: lang.gPresent_GIFTKIND, datafield: 'GIFTKIND', width: 80 },
                    { text: lang.gPresent_DEPENDCODE, datafield: 'DEPENDCODE', width: 80 },
                    { text: lang.gPresent_DEPENDNAME, datafield: 'DEPENDNAME', width: 120 },
                    { text: lang.gPresent_ARTICLENO, datafield: 'ARTICLENO', width: 60 },
                    { text: lang.gPresent_ARTICLENAME, datafield: 'ARTICLENAME', width: 120 },
                    { text: lang.gPresent_AMOUNT, datafield: 'AMOUNT', width: 80 },
                    { text: lang.gPresent_PRICE, datafield: 'PRICE', width: 80 }
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'getInvGrid', err);
        }
    };
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            if (option.container != null) {
                var lang = options.language;
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    if (options.editMode != editMode.view && options.isSaved != true) {
                        messageBox(lang.SureNoSaveExit, messageType.yesno, null, function (flag) {
                            if (flag == 'yes') {
                                $(options.container).jqxWindow('close');
                            }
                        });
                    }
                    else {
                        $(options.container).jqxWindow('close');
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    }
    function renderPlusGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var height = 116;
            var gridId = $(div).prop('id') + 'dgdPlus';
            options.plusGridSource = {
                datatype: "json",
                //localdata: data
                datafields: [
                    { name: 'XWORKNAME', type: 'string' },
                    { name: 'BPCODE', type: 'string' },
                    { name: 'BPNAME', type: 'string' },
                    { name: 'CITEMCODE', type: 'int' },
                    { name: 'CITEMNAME', type: 'string' },
                    { name: 'REALPERIOD', type: 'int' },
                    { name: 'REALSTARTDATE', type: 'date' },
                    { name: 'REALSTOPDATE', type: 'date' },
                    { name: 'SHOULDAMT', type: 'float' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.plusGridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '99%',
                source: dataAdapter,
                sortable: true,
                filterable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.gPlus_XWORKNAME, datafield: 'XWORKNAME', width: 120 },
                  { text: lang.gPlus_BPCODE, datafield: 'BPCODE', width: 80 },
                  { text: lang.gPlus_BPNAME, datafield: 'BPNAME', width: 120 },
                  { text: lang.gPlus_CITEMCODE, datafield: 'CITEMCODE', width: 60 },
                  { text: lang.gPlus_CITEMNAME, datafield: 'CITEMNAME', width: 120 },
                  { text: lang.gPlus_REALPERIOD, datafield: 'REALPERIOD', width: 40, cellsalign: 'right', align: 'right' },
                  { text: lang.gPlus_REALSTARTDATE, datafield: 'REALSTARTDATE', width: 90, cellsformat: 'yyyy/MM/dd' },
                  { text: lang.gPlus_REALSTOPDATE, datafield: 'REALSTOPDATE', width: 90, cellsformat: 'yyyy/MM/dd' },
                  { text: lang.gPlus_SHOULDAMT, datafield: 'SHOULDAMT', width: 60, cellsalign: 'right', align: 'right' }
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });

            //refreshGrid(div);
        }
        catch (err) {
            errorHandle(formName, 'renderPlusGrid', err);
        }
    };
    function renderMinusGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var height = 116;
            var gridId = $(div).prop('id') + 'dgdMinus';
            options.minusGridSource = {
                datatype: "json",
                //localdata: data
                datafields: [
                    { name: 'XWORKNAME', type: 'string' },
                    { name: 'CITEMCODE', type: 'int' },
                    { name: 'CITEMNAME', type: 'string' },
                    { name: 'REALPERIOD', type: 'int' },
                    { name: 'REALSTARTDATE', type: 'date' },
                    { name: 'REALSTOPDATE', type: 'date' },
                    { name: 'SHOULDAMT', type: 'float' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.minusGridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '99%',
                source: dataAdapter,
                sortable: true,
                filterable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.gMins_XWORKNAME, datafield: 'XWORKNAME', width: 120 },
                  { text: lang.gMins_CITEMCODE, datafield: 'CITEMCODE', width: 60 },
                  { text: lang.gMins_CITEMNAME, datafield: 'CITEMNAME', width: 150 },
                  { text: lang.gMins_REALPERIOD, datafield: 'REALPERIOD', width: 40, cellsalign: 'right', align: 'right' },
                  { text: lang.gMins_REALSTARTDATE, datafield: 'REALSTARTDATE', width: 90, cellsformat: 'yyyy/MM/dd' },
                  { text: lang.gMins_REALSTOPDATE, datafield: 'REALSTOPDATE', width: 90, cellsformat: 'yyyy/MM/dd' },
                  { text: lang.gMins_SHOULDAMT, datafield: 'SHOULDAMT', width: 60, cellsalign: 'right', align: 'right' }
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderMinusGrid', err);
        }
    };
    //將資料分配到不同的Grid
    function splitData(div) {
        try {
            var options = $.data(div, formName).options;
            var wipData = options.wipData;
            var charge = wipData[chargeTableName];
            sortObject(charge.rows, 'BILLNO,ITEM');
            var rowLength = charge.rows.length;;
            options[plusTableName] = { rows: [] };
            options[minusTableName] = { rows: [] };
            var insertWorkName = (function (row) {
                try {
                    var wipRow = getRowByKeyValue(wipData[wipTableName].rows, 'SNO', row['BillNo'.toUpperCase()]);
                    if (wipRow == null) {
                        wipRow = getRowByKeyValue(wipData[prwipTableName], 'SNO', row['BillNo'.toUpperCase()]);
                        if (wipRow != null) {
                            row['xWorkName'.toUpperCase()] = wipRow['PRName'.toUpperCase()];
                        }
                    }
                    else {
                        row['xWorkName'.toUpperCase()] = wipRow['InstName'.toUpperCase()];
                    }
                }
                catch (err) {
                    errorHandle(formName, 'splitData_insertWorkName', err);
                }
            });
            for (var i = 0; i < rowLength; i++) {
                var row = charge.rows[i];
                if (row['SBillNo'.toUpperCase()] != null || (row['cheven'.toUpperCase()] != null && row['cheven'] == 1)) {
                    options[minusTableName].rows.push(row);
                }
                else {
                    options[plusTableName].rows.push(row);
                }
                insertWorkName(row);
            }
        }
        catch (err) {
            errorHandle(formName, 'splitData', err);
        }
    };
    //回填合計金額欄位
    function setTotalValue(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var totalAmt = 0;
            var subTotal = { C: 0, D: 0, I: 0, P: 0 };
            var checkAmt = 0;
            var giftsAmt = 0;
            var orderAmt = 0;
            var plusAmt = 0;
            var minusAmt = 0;
            var subSum = (function (row) {
                try {
                    totalAmt += row['ShouldAmt'.toUpperCase()];
                    subTotal[row['serviceType'.toUpperCase()]] += row['shouldAmt'.toUpperCase()];
                    if (row['PTCode'.toUpperCase()] == 6) {
                        checkAmt += row['shouldAmt'.toUpperCase()];
                    }
                    else if (row['CitemRefNo'.toUpperCase()] == 18) {
                        giftsAmt += row['shouldAmt'.toUpperCase()];
                    }
                    else {
                        orderAmt += row['shouldAmt'.toUpperCase()];
                    }
                }
                catch (err) {
                    errorHandle(formName, 'setTotalValue_subSum', err);
                }
            });
            var plusRows = options[plusTableName].rows;
            var pLength = plusRows.length;
            for (var i = 0 ; i < pLength; i++) {
                subSum(plusRows[i]);
                plusAmt += plusRows[i]['shouldAmt'.toUpperCase()];
            }
            var minusRows = options[minusTableName].rows;
            var mLength = minusRows.length;
            for (var i = 0 ; i < mLength; i++) {
                subSum(minusRows[i]);
                minusAmt += minusRows[i]['shouldAmt'.toUpperCase()];
            }
            getControlObject(div, 'tCTotal').text(commaSeparateNumber(subTotal['C']));
            getControlObject(div, 'tDTotal').text(commaSeparateNumber(subTotal['D']));
            getControlObject(div, 'tITotal').text(commaSeparateNumber(subTotal['I']));
            getControlObject(div, 'tPTotal').text(commaSeparateNumber(subTotal['P']));
            getControlObject(div, 'tPresent').text(commaSeparateNumber(giftsAmt));
            getControlObject(div, 'tCheckAmt').text(commaSeparateNumber(checkAmt));
            getControlObject(div, 'tOrderAmt').text(commaSeparateNumber(orderAmt));
            getControlObject(div, 'tTotalAmt').text(commaSeparateNumber(totalAmt));
            getControlObject(div, 'gbxPlus').jqxExpander('setHeaderContent', lang.lPlus + ':<div style="color:red;display:inline-block;width: 50px;text-align:right;">' + commaSeparateNumber(plusAmt) + '<div/>');
            getControlObject(div, 'gbxMinus').jqxExpander('setHeaderContent', lang.lMinus + ':<div style="color:red;display:inline-block;width: 50px;text-align:right;">' + commaSeparateNumber(minusAmt) + '<div/>');
        }
        catch (err) {
            errorHandle(formName, 'setTotalValue', err);
        }
    };
    function calcuteInvoice(div) {
        try {
            var options = $.data(div, formName).options;
            var invoice = {
                columns: [
                    { name: 'INVCOMPCODE', type: 'decimal' },
                    { name: 'TAXDESCRIPTION', type: 'string' },
                    { name: 'TOTALAMT', type: 'decimal' },
                    { name: 'TAXFLAG', type: 'decimal' },
                ], rows: []
            };
            if (options.wipData != null) {
                var charge = options.wipData[chargeTableName];
                var cLength = charge.rows.length;
                for (var i = 0; i < cLength; i++) {
                    var row = getRowByKeyValue(invoice.rows, ['INVCOMPCODE', 'TAXDESCRIPTION'], [charge.rows[i]['INVCOMPCODE'], charge.rows[i]['TAXDESCRIPTION']]);
                    if (row == null) {
                        row = {};
                        row['INVCOMPCODE'] = charge.rows[i]['INVCOMPCODE'];
                        row['TAXDESCRIPTION'] = charge.rows[i]['TAXDESCRIPTION'];
                        row['TOTALAMT'] = charge.rows[i]['ShouldAmt'.toUpperCase()];
                        row['TAXFLAG'] = charge.rows[i]['TAXFLAG'];
                        invoice.rows.push(row);
                    }
                    else {
                        row['TOTALAMT'] += charge.rows[i]['ShouldAmt'.toUpperCase()];
                    }
                }
            }
            options[invTableName] = invoice;
        }
        catch (err) {
            errorHandle(formName, 'calcuteInvoice', err);
        }
    }
    function refreshGrid(div) {
        try {
            var options = $.data(div, formName).options;
            options.plusGridSource.localdata = options[plusTableName].rows;
            getControlObject(div, 'dgdPlus').jqxGrid('updatebounddata');
            if (options.plusGridSource.localdata.length > 0) {
                getControlObject(div, 'dgdPlus').jqxGrid('selectrow', 0);
            }

            options.minusGridSource.localdata = options[minusTableName].rows;
            getControlObject(div, 'dgdMinus').jqxGrid('updatebounddata');
            if (options.minusGridSource.localdata.length > 0) {
                getControlObject(div, 'dgdMinus').jqxGrid('selectrow', 0);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };
    function getControlObject(div, name) {
        return $('#' + $(div).prop('id') + name);
    };
})(jQuery);