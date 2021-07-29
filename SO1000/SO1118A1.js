(function ($) {
    var formName = 'SO1118A1';
    var riadllName = 'CableSoft.SO.RIA.Wip.CallOk.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.CallOk.Web.CallOk';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 28;
    var returnCodeTableName = "ALL";
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
                        options: $.extend({}, new defaults(), new SO1118A1(), options)
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
        getType: function (jq) {
            return getType(jq[0]);
        },
        refreshGrid: function (jq, params, params2) {
            return jq.each(function () {
                refreshGrid(this, params, params2);
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
            getControlObject(div, 'gMaster').jqxGrid({ height: $(div).height() - buttonsHeight });
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
            deleteJSONObject(options);
            //options.length = 0;
            //options = null;
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
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            frmAddHandler(div);
                            addHandler(div);
                            $(div).triggerHandler('loaded');
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
            //            init(div, function () {
            //                frmAddHandler(div);
            //                addHandler(div);
            //                $(div).triggerHandler('loaded');
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
    function refreshGrid(div, data, loading) {
        try {
            var options = $.data(div, formName).options;
            options.initData = data;
            var rows = data[Object.keys(data)[0]].rows;
            options.gridSource.localdata = rows;
            if (options.orderNo != null && rows.length > 0) {
                rows[0]['CHOOSE'] = true;
            }
            getControlObject(div, 'gMaster').jqxGrid('updatebounddata');
            if (loading == true) {
                defaultValue(div);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    }
    function getType(div) {
        try {
            return getControlObject(div, 'tType').jqxDropDownList('val');
        }
        catch (err) {
            errorHandle(formName, 'getType', err);
        }
    }
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div, formName);
            renderControl(div);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            action(true);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            var item = getControlObject(div, "tType").jqxDropDownList('getSelectedItem');
            var tableName = getParametersTable(options.parameters, "callok");
            if (item.value == 0 && options.parameters[tableName] != null && options.parameters[tableName].rows.length > 0) {
                if (options.parameters[tableName].rows[0]["RESVTIME"] != null) {
                    var rLength = options.gridSource.localdata.length;
                    for (var i = 0; i < rLength; i++) {
                        if (formatDateTime(options.gridSource.localdata[i]["RESVTIME"], 'datetime') == formatDateTime(options.parameters[tableName].rows[0]["RESVTIME"], 'datetime')) {
                            getControlObject(div, 'gMaster').jqxGrid("setcellvalue", i, "CHOOSE", true);
                            break;
                        }
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'defaultValue', err);
        }
    }
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
            //$(div).css('padding', 2);
            $(div).css('overflow', 'hidden');
            //建立jqxPanel
            oArray = ["gbxData"];
            var oHightArray = ["100%"];
            var oWidthArray = ["100%"];
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
            }
            level += 1;
            //建立下拉元件
            oArray = ["tType"];
            oWidthArray = [80];
            oLength = oArray.length;
            var data;
            if (options.orderNo != null) {
                data = [{ dataValue: 2, dataName: lang.lType_Order }];
            }
            else {
                data = [{ dataValue: 0, dataName: lang.lType_ResvTime },
                    { dataValue: 1, dataName: lang.lType_Faci },
                    { dataValue: 2, dataName: lang.lType_Order }];
            }
            for (var i = 0 ; i < oLength; i++) {
                var source =
                {
                    localdata: data,
                    datatype: "array",
                    datafields: [
                        { name: 'dataValue' },
                        { name: 'dataName' }
                    ]
                };
                var iId = $(div).prop('id') + oArray[i];
                var dataAdapter = new $.jqx.dataAdapter(source);
                $('#' + iId).jqxDropDownList({
                    theme: options.theme,
                    height: textHeight - 2,
                    width: oWidthArray[i],
                    source: dataAdapter,
                    displayMember: "dataName",
                    valueMember: "dataValue",
                    selectedIndex: 0
                });
                controls.push({ name: iId, type: 'jqxDropDownList', level: level });
            }
            var idx = data[0]['dataValue'];
            level += 1;
            renderMasterGrid(div, level, idx);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function renderMasterGrid(div, level, type) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'gMaster';
            if ($('#' + gridId).length > 0) {
                $('#' + gridId).jqxGrid('destroy');
                $('<div id="' + gridId + '" style="float:left;">').appendTo(getControlObject(div, 'master'));
                options.controls = deleteRowByKeyValue(options.controls, 'name', gridId);
            }
            var fields;
            switch (type) {
                case 0:
                    fields = {
                        datafields: [
                            { name: 'RESVTIME', type: 'date' }
                        ],
                        columns: [
                            { text: lang.gMaster_ResvTime, editable: false, datafield: 'RESVTIME', width: 130, cellsformat: 'yyyy/MM/dd HH:mm' }
                        ]
                    };
                    break;
                case 1:
                    fields = {
                        datafields: [
                            { name: 'FACINAME', type: 'string' },
                            { name: 'FACISNO', type: 'string' },
                            { name: 'FACIID', type: 'string' },
                            { name: 'INITPLACENAME', type: 'string' },
                        ],
                        columns: [
                              { text: lang.gMaster_FaciName, editable: false, datafield: 'FACINAME', width: 80 },
                              { text: lang.gMaster_FaciSNo, editable: false, datafield: 'FACISNO', width: 120 },
                              { text: lang.gMaster_InitPlaceName, editable: false, datafield: 'INITPLACENAME', width: 80 },
                        ]
                    };
                    break;
                case 2:
                    fields = {
                        datafields: [
                            { name: 'ORDERNO', type: 'string' }
                        ],
                        columns: [
                              { text: lang.gMaster_OrderNo, editable: false, datafield: 'ORDERNO', width: 120 }
                        ]
                    };;
                    break;
            }
            //fields.datafields
            fields.datafields.splice(0, 0, { name: "CHOOSE", type: 'boolean' });
            fields.columns.splice(0, 0, { text: lang.gMaster_CHOOSE, datafield: 'CHOOSE', sortable: false, columntype: 'checkbox', width: 40 });
            options.gridSource = {
                datatype: "json",
                localdata: [],
                datafields: fields.datafields
            };
            var dataAdapter = new $.jqx.dataAdapter(options.gridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99%',
                height: $(div).height() - textHeight - 4,
                source: dataAdapter,
                //sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                editable: true,
                columns: fields.columns,
                //selectionmode: 'checkbox',
                theme: options.theme,
                localization: options.localization
            });
            getControlObject(div, 'gMaster').on('cellvaluechanged', function (event) {
                try {
                    var args = event.args;
                    var datafield = event.args.datafield;
                    if (datafield == 'CHOOSE') {
                        var rows = $(this).jqxGrid('getrows');
                        var chooseRows = getRowByKeyValue(rows, 'CHOOSE', true, true);
                        var tableName = Object.keys(options.initData)[0];
                        var table = copyTableData(options.initData, tableName, false);
                        if (chooseRows == null) chooseRows = [];
                        table[tableName].rows = chooseRows;
                        var e = $.Event("chooseOk", {
                            args: {
                                chooseTable: table
                            }
                        });
                        $(div).triggerHandler(e);
                    }
                }
                catch (err) {
                    errorHandle(formName, 'addHandler_cellvaluechanged', err);
                }
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderMasterGrid', err);
        }
    };
    function addHandler(div) {
        var options = $.data(div, formName).options;
        getControlObject(div, 'tType').on('select', function (event) {
            try {
                var args = event.args;
                if (args) {
                    var item = args.item;
                    var value = item.value;
                    getGroupChoose(div, Number(value), function (r) {
                        if (r[0]) {
                            renderMasterGrid(div, 2, Number(value));
                            refreshGrid(div, options.initData);
                            var tableName = Object.keys(options.initData)[0];
                            var table = copyTableData(options.initData, tableName, false);
                            table[tableName].rows = [];
                            var e = $.Event("chooseOk", {
                                args: {
                                    chooseTable: table
                                }
                            });
                            $(div).triggerHandler(e);
                        }
                        else if (r[1] != null) {
                            messageBox(r[1]);
                        }
                    });
                }
            }
            catch (err) {
                errorHandle(formName, 'addHandler_select', err);
            }
        });
    }
    function getGroupChoose(div, groupType, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var custId = options.custId;
            var orderNo = options.orderNo;
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                orderNo: { type: 'string', value: convertToNull(orderNo) },
                refType: { type: 'integer', value: options.refNo },
                groupType: { type: 'integer', value: groupType }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetGroupChoose',
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
            errorHandle(formName, 'getGroupChoose', err);
        }
    };
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var oLength = options.mustBeControls;
            for (var i = 0 ; i < oLength; i++) {
                var control = options.mustBeControls[i];
                if (checkUIMustBe($('#' + control.name).csList('codeNo'), lang['l' + control.name.substr(2)], function () {
                    $('#' + control.name).csList('focus');
                }) == false) {
                    return false;
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
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
})(jQuery);