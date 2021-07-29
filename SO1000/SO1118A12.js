(function ($) {
    var formName = 'SO1118A12';
    var riadllName = 'CableSoft.SO.RIA.Wip.CallOk.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.CallOk.Web.CallOk';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 28;
    var canChooseWipTableName = "CanChooseWip";
    var oldCanChooseWipTableName = "OldCanChooseWip";
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
                        options: $.extend({}, new defaults(), new SO1118A12(), options)
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
        refreshGrid: function (jq, params) {
            return jq.each(function () {
                refreshGrid(this, params);
            });
        },
        getSelectedRows: function (jq) {
            return getSelectedRows(jq[0]);
        },
        setSelectedRows: function (jq, params) {
            return setSelectedRows(jq[0], params);
        },
        getRowsCount: function (jq) {
            return getRowsCount(jq[0]);
        },
        isDataOk: function (jq) {
            return isDataOk(jq[0]);
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
    function getSelectedRows(div) {
        try {
            var options = $.data(div, formName).options;
            var tableName = Object.keys(options.initData)[0];
            var table = copyTableData(options.initData, tableName, false);
            table[tableName].rows = [];
            var rowIndexs = getControlObject(div, 'gDetail').jqxGrid('getselectedrowindexes');
            var gridRows = getControlObject(div, 'gDetail').jqxGrid('getrows');
            var rLength = rowIndexs.length;
            for (var i = 0 ; i < rLength; i++) {
                var gridRow = gridRows[rowIndexs[i]];
                var row = options.initData[tableName].rows[rowIndexs[i]];
                row["FINUNIT"] = gridRow["FINUNIT"];
                table[tableName].rows.push(cloneJSON(row));
            }
            return table;
        }
        catch (err) {
            errorHandle(formName, 'getSelectedRows', err);
        }
    }
    function setSelectedRows(div, params) {
        try {
            //var options = $.data(div, formName).options;
            var gridRows = getControlObject(div, 'gDetail').jqxGrid('getrows');
            var rowCnt = gridRows.length;
            //var selRowIdx = [];
            params = ',' + params + ',';
            for (var i = 0 ; i < rowCnt; i++) {
                if (params.indexOf(',' + gridRows[i].SNO + ',') >= 0) {
                    //selRowIdx.push(i);
                    getControlObject(div, 'gDetail').jqxGrid('selectrow', i);
                }
            }
            //getControlObject(div, 'gDetail').jqxGrid({ selectedrowindexes: selRowIdx });
            return;
        }
        catch (err) {
            errorHandle(formName, 'setSelectedRows', err);
        }
    }
    function getRowsCount(div) {
        try {
            //var options = $.data(div, formName).options;
            return getControlObject(div, 'gDetail').jqxGrid('getdatainformation').rowscount;
        }
        catch (err) {
            errorHandle(formName, 'getRowsCount', err);
        }
    }
    function refreshGrid(div, data) {
        try {
            var options = $.data(div, formName).options;
            var rows;
            if (data == null) {
                rows = [];
                if (options.initData != null) {
                    delete options.initData[canChooseWipTableName].rows;
                    options.initData[canChooseWipTableName].rows = [];
                }
            }
            else {
                options.initData = data;
                rows = data[canChooseWipTableName].rows;
            }
            if (options.initData != null) {
                var table = ChkExistTableName(options.initData, oldCanChooseWipTableName);
                if (table != null) {
                    delete options.initData[oldCanChooseWipTableName];
                };
                options.initData[oldCanChooseWipTableName] = cloneJSON(options.initData[canChooseWipTableName]);
            };
            //selectAllDefacult(div);
            //defaultValue(div);
            options.gridSource.localdata = rows;
            getControlObject(div, 'gDetail').jqxGrid('updatebounddata');
            //2017.10.23 原本預設GRID帶入資料，都清除不勾選，因為PM測試時希望預設勾選比較方便。
            //2017.10.23 已經改好預設全選，之後找PM_LYNN確認規格時，說不用改了，所以又調整回預設全不選。
            getControlObject(div, 'gDetail').jqxGrid('clearselection');

            if (options.refNo === 4) {
                var isCanChooseSNO = false;//判斷訂單有可以選的工單號碼
                if (options.initData[canChooseWipTableName].rows.length > 0) {
                    for (i = 0; i < options.initData[canChooseWipTableName].rows.length; i++) {
                        var row = options.initData[canChooseWipTableName].rows[i];
                        if (!IsNullOrEmpty(row["SNO"])) {
                            isCanChooseSNO = true;
                        }
                    }
                    if (!isCanChooseSNO) { getControlObject(div, 'gDetail').jqxGrid('selectallrows'); }
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };
    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            var oldRows = options.initData[oldCanChooseWipTableName].rows;
            for (var i = 0; i < oldRows.length; i++) {
                switch (options.refNo) {
                    case 1: case 2://線上回報/取消線上回報
                        options.initData[canChooseWipTableName].rows[i]['callOkTime'.toUpperCase()] = oldRows[i]['callOkTime'.toUpperCase()];
                        getControlObject(div, 'gDetail').jqxGrid("setcellvalue", i, "callOkTime".toUpperCase(), oldRows[i]['callOkTime'.toUpperCase()]);
                        break;
                    case 3: case 4://完工/退單
                }
                var finUnit = Math.round(oldRows[i]['FinUnit'.toUpperCase()] * 100) / 100;
                options.initData[canChooseWipTableName].rows[i]['FinUnit'.toUpperCase()] = finUnit;
                getControlObject(div, 'gDetail').jqxGrid("setcellvalue", i, "FinUnit".toUpperCase(), finUnit);
            }
            var idxs = getControlObject(div, 'gDetail').jqxGrid('getselectedrowindexes');
            for (var i = 0; i < idxs.length; i++) {
                var row = options.initData[canChooseWipTableName].rows[idxs[i]];
                switch (options.refNo) {
                    case 1: //線上回報
                        var UIRow = $('#' + options.detailId)[options.detailName]("getUIData");
                        row["callOkTime".toUpperCase()] = UIRow['callOkTime'.toUpperCase()];
                        getControlObject(div, 'gDetail').jqxGrid("setcellvalue", idxs[i], "callOkTime".toUpperCase(), row['callOkTime'.toUpperCase()]);
                        if (row["FINUNIT"] == null || row["FINUNIT"] == 0) {
                            row["FINUNIT"] = Math.round(row["WORKUNIT"] * 100) / 100;
                        }
                        getControlObject(div, 'gDetail').jqxGrid("setcellvalue", idxs[i], "FINUNIT", row["FINUNIT"]);
                        break;
                    case 2: //取消線上回報
                        row["callOkTime".toUpperCase()] = null;
                        getControlObject(div, 'gDetail').jqxGrid("setcellvalue", idxs[i], "callOkTime".toUpperCase(), null);
                        row["FINUNIT"] = 0;
                        getControlObject(div, 'gDetail').jqxGrid("setcellvalue", idxs[i], "FINUNIT", row["FINUNIT"]);
                        break;
                    case 3: //完工
                        if (row["FINUNIT"] == null || row["FINUNIT"] == 0) {
                            row["FINUNIT"] = Math.round(row["WORKUNIT"] * 100) / 100;
                        }
                        getControlObject(div, 'gDetail').jqxGrid("setcellvalue", idxs[i], "FINUNIT", row["FINUNIT"]);
                        break;
                    case 4: //退單
                        row["FINUNIT"] = 0;
                        getControlObject(div, 'gDetail').jqxGrid("setcellvalue", idxs[i], "FINUNIT", row["FINUNIT"]);
                        break;
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, "defaultValue", err);
        }
    };
    function selectAllDefacult(div, rows) {
        try {
            var options = $.data(div, formName).options;
            var rows = options.initData[canChooseWipTableName].rows;
            for (var i = 0; i < rows.length; i++) {
                rows[i]["finUnit".toUpperCase()] = rows[i]["workUnit".toUpperCase()];
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, "selectAllDefacult", err);
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
            renderDetailGrid(div, level);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function renderDetailGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'gDetail';
            options.gridSource = {
                datatype: "json",
                localdata: [],
                datafields: [{ name: 'CHOOSE', type: 'boolean' },
                            { name: 'TYPE', type: 'string' },
                            { name: 'SERVICETYPE', type: 'string' },
                            { name: 'SNO', type: 'string' },
                            { name: 'RESVTIME', type: 'date' },
                            { name: 'CALLOKTIME', type: 'date' },
                            { name: 'WORKCODE', type: 'int' },
                            { name: 'WORKNAME', type: 'string' },
                            { name: 'FINUNIT', type: 'float' },
                            { name: 'REFNO', type: 'integer' },
                ]
            };
            var columns = [
                    getGridRowNumberColumn(null, 30),
                    {
                        text: lang.gDetail_Type, editable: false, datafield: 'TYPE', width: 50,
                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                            try {
                                var rValue;
                                switch (value) {
                                    case "0":
                                        rValue = lang.gDetail_Type_0;
                                        break;
                                    case "1":
                                        rValue = lang.gDetail_Type_1;
                                        break;
                                    case "2":
                                        rValue = lang.gDetail_Type_2;
                                        break;
                                }
                                var div = $(defaulthtml);
                                div.text(rValue);
                                return div[0].outerHTML;
                            }
                            catch (err) {
                                errorHandle(formName, 'cellsrenderer', err);
                            }
                        }
                    },
                    { text: lang.gDetail_ServiceType, editable: false, datafield: 'SERVICETYPE', width: 60 },
                    { text: lang.gDetail_SNo, editable: false, datafield: 'SNO', width: 140 },
                    { text: lang.gDetail_ResvTime, editable: false, datafield: 'RESVTIME', width: 120, cellsformat: 'yyyy/MM/dd HH:mm:ss' },
                    { text: lang.gDetail_CallOkTime, editable: false, datafield: 'CALLOKTIME', width: 120, cellsformat: 'yyyy/MM/dd HH:mm' },
                    { text: lang.gDetail_WorkCode, editable: false, datafield: 'WORKCODE', width: 60 },
                    { text: lang.gDetail_WorkName, editable: false, datafield: 'WORKNAME', width: 120 },
                    {
                        text: lang.gDetail_FINUNIT, editable: true, datafield: 'FINUNIT', columntype: 'numberinput', width: 60,
                        createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                            editor.jqxNumberInput({ decimalDigits: 2, digits: 3, spinButtonsStep: 10, width: 58 });
                            editor.children().css({ color: "red" });
                        }
                    },
            ];
            var dataAdapter = new $.jqx.dataAdapter(options.gridSource);
            $('#' + gridId).jqxGrid($.extend({
                width: '100%',
                height: '99%',
                source: dataAdapter,
                //sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                editable: true,
                selectionmode: 'checkbox',
                columns: columns,
                theme: options.theme,
                localization: options.localization
            }, handleKeyboardNavigation(gridId, columns, true)));

            getControlObject(div, 'gDetail').on('rowselect', function (event) {
                chooseEvent(div, gridId, event, true);
            });
            getControlObject(div, 'gDetail').on('rowunselect', function (event) {
                chooseEvent(div, gridId, event, false);
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderDetailGrid', err);
        }
    };
    function isDataOk(div) { 
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var rows = getControlObject(div, 'gDetail').jqxGrid('getselectedrowindexes');
            if (rows.length == 0) {
                messageBox(lang.PleaseChooseSno);
                return false
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    }
    function chooseEvent(div, gridId, event, isSelected) {
        try {
            var options = $.data(div, formName).options;
            if (options.initData == null) return;
            if (options.choosing == true) return;
            options.choosing = true;
            checkSync(div, gridId, event, isSelected);
            var args = event.args;
            //var rowIndexs = event.args.rowindex;
            var rowIndexs = $("#" + gridId).jqxGrid('getselectedrowindexes');
            var tableName = Object.keys(options.initData)[0];
            var table = copyTableData(options.initData, tableName, false);
            var rows = options.initData[tableName].rows;
            var rLength = rowIndexs.length;
            var chooseRows = [];
            for (var i = 0; i < rLength; i++) {
                var row = rows[rowIndexs[i]];
                chooseRows.push(cloneJSON(row));
            }
            table[tableName].rows = chooseRows;
            var e = $.Event("chooseOk", {
                args: {
                    chooseTable: table
                }
            });
            $(div).triggerHandler(e);
            defaultValue(div);
            options.choosing = false;
        }
        catch (err) {
            options.choosing = false;
            errorHandle(formName, 'chooseEvent', err);
        }
    }
    function checkSync(div, gridId, event, isSelected) {
        try {
            var options = $.data(div, formName).options;
            var row = event.args.row;
            var idx = event.args.rowindex;
            if (Array.isArray(idx)) return;
            if (isSelected) {
                switch (options.refNo) {
                    case 1: case 2: //線上回報,完工
                        var rows = options.initData[canChooseWipTableName].rows;
                        for (var i = 0; i < rows.length; i++) {
                            //同服務別，同步勾選
                            if (i != idx && row["SERVICETYPE"] == rows[i]["SERVICETYPE"]) {
                                $('#' + gridId).jqxGrid('selectrow', i);
                            }
                        }
                        break;
                    case 4:
                        //#8352 2019.05.27 by Corey 訂單退單，並且勾選沒有工單號碼的工單時，順便將其他沒有工單號碼的訂單一併勾選。
                        var chooseRow = options.initData[canChooseWipTableName].rows[idx];
                        if (IsNullOrEmpty(chooseRow["SNO"]) && !IsNullOrEmpty(chooseRow["ORDERNO"])) {
                            var rows = options.initData[canChooseWipTableName].rows;
                            for (var i = 0; i < rows.length; i++) {
                                if (i != idx && IsNullOrEmpty(rows["SNO"])) {
                                    $('#' + gridId).jqxGrid('selectrow', i);
                                }
                            }
                        }
                        break;
                }
            }
            else {
                var rows = options.initData[oldCanChooseWipTableName].rows;
                if (row["TYPE"] == 0 && (row["REFNO"] == 1 || row["REFNO"] == 2 || row["REFNO"] == 5)) {
                    for (var i = 0; i < rows.length; i++) {
                        if (i != idx && row["SERVICETYPE"] == rows[i]["SERVICETYPE"]) {
                            $('#' + gridId).jqxGrid('unselectrow', i);
                            options.initData[canChooseWipTableName].rows[i]["CALLOKTIME"] = options.initData[oldCanChooseWipTableName].rows[i]["CALLOKTIME"];
                        }
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'checkSync', err);
        }
    }
    function addHandler(div) {
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
            errorHandle(formName, 'ChkExistTableName', err);
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