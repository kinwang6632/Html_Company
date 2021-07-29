(function ($) {
    var formName = 'dynamicGrid';
    var riadllName = 'cablesoft.ria.dynamic.grid.web.dll';
    var riaClassName = 'cablesoft.ria.dynamic.grid.web.dynamicgrid';
    var buttonHeight = 30;
    var toolbarHeight = 28;
    var centerButtonSize = 42;
    var leftImgSize = 20;
    var contextImgSize = 18;
    var dButtonWidth = 120;
    var defaultPageCounts = 500;
    var rowDetailsHeight = 200;
    var gridColumnHeight = 30;
    var pagerHeight = 26;
    var endButtonListId = 'btnL';
    var endTextListId = 'txtL';
    var endMenuId = "ctmenu";
    var endExpId = "exp";
    var endDetailId = "det";
    var endRowNoId = 'rowNo';
    var endToolbarId = 'tb';
    var endStatusbarId = 'sb';
    var chooseFieldName = "CHOOSEFIELD";
    $.fn.dynamicGridExport = function (options, param, param2, param3) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return $(this)['dynamicGrid'](options, param, param2, param3);
                }
                return;
            }
            $(this).on('loaded', function () {
                var grid = $(this)['dynamicGrid']("getControl");
                var options = $.data($(this)[0], formName).options;
                exportGridToExcel(grid, options.programId);
                //$(this)['dynamicGrid']("destroy");
            });
            //$(this).css("display", "none");
            $(this)['dynamicGrid'](options, param, param2, param3);
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynamicGridExport', err);
        }
    };
    ////$.fn.dynamicGrid = function (options, param) {
    $.fn.dynamicGrid = function (options, param, param2, param3) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, param2, param3);
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
                        options: $.extend({}, new defaults(), new dynamicGrid(), options)
                    });
                    init(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynamicGrid', err);
        }
    };
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        theme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        setTheme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        //close: function (jq) {
        //    return jq.each(function () {
        //        formClosed(this);
        //    });
        //},
        clear: function (jq) {
            return jq.each(function () {
                clear(this);
            });
        },
        setParentRefresh: function (jq, params, params2, params3) {
            return jq.each(function () {
                setParentRefresh(this, params, params2, params3);
            });
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
        getFocusRow: function (jq, addSchema) {
            return getSelectedRow(jq[0], addSchema);
        },
        getSelectedRow: function (jq, addSchema) {
            return getSelectedRow(jq[0], addSchema);
        },
        getCheckedRows: function (jq, addSchema) {
            return getCheckedRows(jq[0], addSchema);
        },
        getRows: function (jq, addSchema) {
            return getRows(jq[0], addSchema);
        },
        getControl: function (jq, params) {
            return getControl(jq[0], params);
        },
        refreshGrid: function (jq, params, params2) {
            return refreshGrid(jq[0], params, params2);
        },
        disableAll: function (jq, flag, revertStatus) {
            return jq.each(function () {
                disableAll(this, flag, revertStatus);
            });
        },
        disableButton: function (jq, flag, revertStatus) {
            return jq.each(function () {
                disableButton(this, flag, revertStatus);
            });
        },
        disabled: function (jq, flag) {
            return jq.each(function () {
                disableAll(this, flag);
            });
        },
        closeMenu: function (jq) {
            return jq.each(function () {
                closeMenu(this);
            });
        },
        changePageNo: function (jq, page) {
            return jq.each(function () {
                changePageNo(this, page);
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
        this.styles = [];
        this.isSaved = false;
        this.theme = $.jqx.theme;
        this.settingData = {};
        this.parentData = {};
        this.localization = null;
        this.container = null;
        this.childContainer = null;
        this.showRowNumber = true;
        this.showReportCaption = false;
        this.gridOptions = {};
        this.sysProgramId = null;
        this.programId = null;
        this.oldRowIndex = -1;
        this.listFields = [];
        this.showCollapseButton = false;
        this.saveRefresfhData = true;
        this.gridFieldControls = [];    //grid 上的元件
        this.selectedRowIndex = -1;
        this.realPageNo = 1;
        this.autoChangePage = true;
        this.canChoose = false;
    });
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
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
            var divHeight = $(div).height();
            var divWidth = $(div).width();
            if (params != null) {
                divHeight = params.height;
                divWidth = params.width;
                $(div).css(params);
            }
            for (var i = 0; i < controls.length; i++) {
                if (controls[i].type.toUpperCase().indexOf('GRID') >= 0) {
                    var o = $('#' + controls[i].name);
                    var gridHeight = getGridHeight(div);
                    $(o).css({ 'height': gridHeight });
                    $(o)[controls[i].type]({ 'height': gridHeight });
                    //$(o)[controls[i].type]("render");
                }
                if (controls[i].type == 'buttons') {
                    var buttonsId = controls[i].name;
                    var buttons = $('#' + buttonsId + " .jqx-button");
                    var bLength = buttons.length;
                    var addListButton = 0;
                    if (options.listFields.length > 0) { addListButton = 3; }
                    var buttonWidth = Math.floor(($('#' + buttonsId).width() - 5) / (bLength + addListButton)) - 2;
                    if (buttonWidth > dButtonWidth) { buttonWidth = dButtonWidth; }
                    $('#' + buttonsId + " .jqx-button").each(function () {
                        $(this).jqxButton({ width: buttonWidth });
                    });
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
            $(document).off('click.' + $(div).prop('id') + " contextmenu." + $(div).prop('id'));
            offElementEvents(div);
            var options = $.data(div, formName).options
            var styles = options.styles;
            for (var i = 0; i < styles.length; i++) {
                $("#" + styles[i].name).remove();
            }
            $(options.container).off('resize.' + $(div).prop("id"));
            deleteJSONObject(options);
            options = null;
            delete options;
            $.data(div, formName, null);
            $(div).children().remove();
            return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    function disableAll(div, flag, revertStatus) {
        try {
            var options = $.data(div, formName).options;
            disableAllControls(options.controls, flag, revertStatus);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'disableAll', err);
        }
    };
    function disableButton(div, flag, revertStatus) {
        try {
            var options = $.data(div, formName).options;
            for (var i = 0; i < options.controls.length; i++) {
                var control = options.controls[i];
                if (control.type == 'jqxButton') {
                    disableControl(control, flag);
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'disableAll', err);
        }
    };
    function clear(div) {
        try {
            var grid = getGridObject(div);
            clearOData(grid, true);
            if (grid.type == 'jqxGrid') {
                grid.source.localdata = [];
                $('#' + grid.name)[grid.type]('updatebounddata');
            }
            else {
                grid.source.localdata = [];
                $('#' + grid.name)[grid.type]('updateBoundData');
            }
            if (getHaveButtons(div)) {
                createButtons(div, getGridObject(div).name);
            }
            formResize(div);
        }
        catch (err) {
            errorHandle(formName, 'clear', err);
        }
    };
    function clearOData(grid, clearAll) {
        try {
            var source = $("#" + grid.name)[grid.type]("source");
            if (clearAll == true) {
                deleteJSONObject(grid.source, "localdata");
                deleteJSONObject(source, "loadedData");
            }
            deleteJSONObject(source, "originaldata");
            deleteJSONObject(source, "recordids");
            deleteJSONObject(source, "records");
        }
        catch (err) {
            errorHandle(formName, 'clearOData', err);
        }
    }
    function closeMenu(div) {
        try {
            var menuId = $(div).prop('id') + endMenuId;
            if ($("#" + menuId).length > 0) {
                $("#" + menuId).jqxMenu('close');
            }
        }
        catch (err) {
            errorHandle(formName, 'closeMenu', err);
        }
    }
    function getControl(div, typeName) {
        try {
            if (typeName == null) { typeName = 'grid'; }
            if (typeName == 'grid') {
                return getGridObject(div);
            }
            else if (1 == 1) {

            }
        }
        catch (err) {
            errorHandle(formName, 'getControl', err);
        }
    };
    function getGridObject(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            for (var i = 0; i < controls.length; i++) {
                if (controls[i].type.toUpperCase().indexOf('GRID') >= 0) {
                    return controls[i];
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'getGridObject', err);
        }
    };
    function getRealRowsForEditMode(div, rowIndex) {
        try {
            var options = $.data(div, formName).options;
            var keys = Object.keys(options.settingData);
            if (options.editable == true) {
                var o = getGridObject(div);
                var columns = options.gridColumns[0];
                if (rowIndex != null && rowIndex >= 0) {
                    if (options.settingData[keys[0]].rows.length > 0) {
                        var gridRow = $('#' + o.name).jqxGrid('getrowdata', rowIndex);
                        var row = options.settingData[keys[0]].rows[rowIndex];
                        for (var i = 0; i < columns.length; i++) {
                            if (columns[i]["editable"] == true) {
                                row[columns[i]["datafield"]] = gridRow[columns[i]["datafield"]];
                            }
                        }
                        return cloneJSON(row);
                    }
                    else {
                        return [];
                    }
                }
                else {
                    if (options.isTree == true) {
                        return cloneJSON(options.settingData[keys[0]].rows);
                    }
                    else {
                        var gridRows = $('#' + o.name).jqxGrid('getrows');
                        var rows = options.settingData[keys[0]].rows
                        for (var r = 0; r < rows.length; r++) {
                            var row = rows[r];
                            var gridRow = rows[r];
                            for (var i = 0; i < columns.length; i++) {
                                if (columns[i]["editable"] == true) {
                                    row[columns[i]["datafield"]] = gridRow[columns[i]["datafield"]];
                                }
                            }
                        }
                        return cloneJSON(rows);
                    }
                }
            }
            else {
                if (rowIndex != null && rowIndex >= 0) {
                    return cloneJSON(options.settingData[keys[0]].rows[rowIndex]);
                }
                else {
                    return cloneJSON(options.settingData[keys[0]].rows);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'getRealRowsForEditMode', err);
        }
    }
    //取得選取的該筆Row
    function getSelectedRow(div, addSchema) {
        try {
            if (div == null) return;
            var options = $.data(div, formName).options;
            var o = getGridObject(div);
            var row;
            var keys = Object.keys(options.settingData);
            if (options.isTree == true) {
                var gridRow = $('#' + o.name).jqxTreeGrid('getSelection')[0];
                row = cloneJSON(getRowByKeyValue(options.settingData[keys[0]].rows, options.settingData['DYFIELD'].rows[0]["TreeKeyField".toUpperCase()], gridRow['uid']));
            }
            else {
                var rowindex = options.selectedRowIndex;
                if (rowindex == null) {
                    rowindex = $('#' + o.name).jqxGrid('getselectedrowindex');
                }
                //row = $('#' + o.name).jqxGrid('getrowdata', rowindex);
                if (rowindex >= 0) {
                    //row = cloneJSON(options.settingData[keys[0]].rows[rowindex]);
                    row = getRealRowsForEditMode(div, rowindex);
                }
            }
            if (addSchema == true) {
                var table = {};
                table[keys[0]] = { columns: cloneJSON(options.settingData[keys[0]].columns), rows: [] };
                if (row != null) {
                    table[keys[0]].rows.push(row);
                }
                return table;
            }
            else {
                return row;
            }
        }
        catch (err) {
            errorHandle(formName, 'getSelectedRow', err);
        }
    };
    //取得所有Rows
    function getRows(div, addSchema, fromjqxGrid) {
        try {
            var options = $.data(div, formName).options;
            var o = getGridObject(div);
            var keys = Object.keys(options.settingData);
            var rows;
            if (fromjqxGrid == true) {
                if (options.isTree == true) {
                    rows = $('#' + o.name).jqxTreeGrid('getRows');
                }
                else {
                    rows = $('#' + o.name).jqxGrid('getrows');
                }
            }
            else {
                //rows = cloneJSON(options.settingData[keys[0]].rows);
                rows = getRealRowsForEditMode(div);
            }
            if (addSchema == true) {
                var table = {};
                table[keys[0]] = { columns: cloneJSON(options.settingData[keys[0]].columns), rows: rows };
                return table;
            }
            else {
                return rows;
            }
        }
        catch (err) {
            errorHandle(formName, 'getRows', err);
        }
    };
    //取得有選取的Rows
    function getCheckedRows(div, addSchema) {
        try {
            var options = $.data(div, formName).options;
            var o = getGridObject(div);
            var row = [];
            var keys = Object.keys(options.settingData);
            //if (options.isTree == true) {
            //}
            //else {
            var rows = getRows(div, false, true);
            for (var i = 0; i < rows.length; i++) {
                if (rows[i][chooseFieldName] == true) {
                    if (options.isTree == true) {
                        var tempRow = getRowByKeyValue(options.settingData[keys[0]].rows, options.settingData['DYFIELD'].rows[0]["TreeKeyField".toUpperCase()], rows[i]['uid']);
                        row.push(cloneJSON(tempRow));
                    }
                    else {
                        if (options.editable == true) {
                            var tt = cloneJSON(options.settingData[keys[0]].rows[rows[i]["uid"]]);
                            var kk = Object.keys(rows[i])
                            for (var ki in kk) {
                                if (checkColumnExist(options.settingData[keys[0]], kk[ki]) == true) {
                                    tt[kk[ki]] = rows[i][kk[ki]];
                                }
                            }
                            row.push(tt);

                        }
                        else {
                            row.push(cloneJSON(options.settingData[keys[0]].rows[rows[i]["uid"]]));
                        }
                    }
                }
            }
            //}
            if (addSchema == true) {
                var table = {};
                table[keys[0]] = { columns: cloneJSON(options.settingData[keys[0]].columns), rows: row };
                return table;
            }
            else {
                return row;
            }
        }
        catch (err) {
            errorHandle(formName, 'getCheckedRows', err);
        }
    };
    function init(div) {
        try {
            var options = $.data(div, formName).options;
            var sysProgramId = options.sysProgramId;
            var programId = options.programId;
            var settingData = options.settingData;
            if (options.parentData == null) {
                options.parentData = {};
            }
            addHandlerGetParameters(div, options);
            if (settingData != null && Object.keys(settingData).length > 0) {
                refresh(div);
            }
            else {
                if (sysProgramId == null && programId == null) {
                    messageBox("no programId!!", messageType.critical);
                    return;
                }
                getSettingData(div, function (r) {
                    if (r == true) refresh(div);
                });
            }

        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    //取得動態條件內容
    function getSettingData(div, action) {
        try {
            //ByVal loginInfo As loginInfo,
            //ByVal ProgramId As String,
            //ByVal SystemProgramId As String,
            //ByVal dtSource As String
            var options = $.data(div, formName).options;
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var dtSource;
            if (Object.keys(options.parentData).length > 0) {
                dtSource = JSON.stringify(options.parentData);
            }
            var parameters = $.extend({}, paraLoginInfo, {
                ProgramId: { type: 'string', value: options.programId },
                SystemProgramId: { type: 'string', value: options.sysProgramId },
                dtSource: { type: 'string', value: convertToNull(dtSource) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetProgramAllInOne',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ResultBoolean == true) {
                        delete options.settingData;
                        options.settingData = JSON.parse(data.ResultXML);
                        action(true);
                    }
                    else {
                        messageBox(data.ErrorMessage, messageType.critical);
                        action(false);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getSettingData', err);
        }
    };

    function addParameterData(div, pageNo) {
        var options = $.data(div, formName).options;
        var tt = {};
        if (options.parentData != null && Object.keys(options.parentData).length > 0) {
            $.extend(tt, {}, options.parentData);
        }
        if (options.parameters != null && Object.keys(options.parameters).length > 0) {
            $.extend(tt, {}, options.parameters);
        }
        if (options.pagesize > 0) {
            var pageInfo = {
                pageInfo: {
                    columns: [{ name: "pageNo".toUpperCase(), type: "integer" }],
                    rows: []
                }
            };
            var row = {};
            row["pageNo".toUpperCase()] = pageNo;
            pageInfo.pageInfo.rows.push(row);
            $.extend(tt, {}, pageInfo);
        }
        if (tt != null && Object.keys(tt).length > 0) {
            return JSON.stringify(tt);
        }
    }
    function getPageData(div, pageNo, action) {
        try {
            //ByVal loginInfo As loginInfo,
            //ByVal ProgramId As String,
            //ByVal SystemProgramId As String,
            //ByVal dtSource As String
            var options = $.data(div, formName).options;
            if (options.autoChangePage == false) {
                action([true]);
                return;
            }
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var dtSource = addParameterData(div, pageNo);
            //if (Object.keys(options.parentData).length > 0) {
            //    dtSource = JSON.stringify(options.parentData);
            //}
            var parameters = $.extend({}, paraLoginInfo, {
                ProgramId: { type: 'string', value: options.programId },
                dtSource: { type: 'string', value: convertToNull(dtSource) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetDynamicSQL',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ResultBoolean == true) {
                        var r = JSON.parse(data.ResultXML);
                        action([true, r]);
                    }
                    else {
                        messageBox(data.ErrorMessage, messageType.critical);
                        action([false]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getPageData', err);
        }
    };
    function refreshBarControl(div) {
        try {
            var options = $.data(div, formName).options;
            if ($("#" + $(div).prop('id') + endToolbarId).length > 0) {
                var btnCount = createBarControl(div, options.gridId, options.gridSource, $("#" + $(div).prop('id') + endToolbarId), 1);
                $("#" + options.gridId).jqxGrid({ showtoolbar: btnCount > 0 });
            }
            if ($("#" + $(div).prop('id') + endStatusbarId).length > 0) {
                var btnCount = createBarControl(div, options.gridId, options.gridSource, $("#" + $(div).prop('id') + endStatusbarId), 2);
                $("#" + options.gridId).jqxGrid({ showstatusbar: btnCount > 0 || checkHaveAggregates(div)[0] });
            }
        }
        catch (err) {
            errorHandle(formName, 'refreshBarControl', err);
        }
    }
    function selectAddMoveRow(div, data, saveRefresh, noSelect) {
        try {
            var options = $.data(div, formName).options;
            var grid = getGridObject(div);
            if (options.PKFields == null || options.PKFields.length == 0 || options.selectedRowIndex < 0 || saveRefresh != true) {
                $('#' + grid.name)[grid.type]('updatebounddata');
                if (noSelect != true) {
                    if (data.rows.length > 0) {
                        $('#' + grid.name)[grid.type]('selectrow', 0);
                    }
                    $('#' + grid.name)[grid.type]('scrolloffset', 0, 0);
                }
                refreshBarControl(div);
            }
            else {
                var row = $('#' + grid.name)[grid.type]('getrowdata', options.selectedRowIndex);
                var idx;
                if (row != null) {
                    var keys = [];
                    var values = [];
                    for (var i = 0 ; i < options.PKFields.length; i++) {
                        keys.push(options.PKFields[i]["FIELDNAME"].toUpperCase());
                        values.push(row[options.PKFields[i]["FIELDNAME"].toUpperCase()]);
                    }
                    idx = getRowIndexByKeyValue(data, keys, values);
                }
                if (idx == null) { idx = 0; }
                $('#' + grid.name)[grid.type]('updatebounddata');
                if (noSelect != true) {
                    $('#' + grid.name)[grid.type]('selectrow', idx);
                    var rowsHeight = $('#' + grid.name)[grid.type]('rowsheight');
                    $('#' + grid.name)[grid.type]('scrolloffset', idx * (rowsHeight) - 2, 0);
                }
                refreshBarControl(div);
            }
            changeFilterPanelPosition(div, grid.name);
        }
        catch (err) {
            errorHandle(formName, 'selectAddMoveRow', err);
        }
    }
    function setTotalRowCount(div) {
        try {
            var options = $.data(div, formName).options;
            var grid = getGridObject(div);
            if (options.isTree) {
                var rowCount = $('#' + grid.name)[grid.type]("getRows").length;
                var gridCols = $('#' + grid.name).find("div[role='columnheader']");
                $(gridCols[0]).attr('title', rowCount);
            }
            else {
                //var rowCount = $('#' + grid.name)[grid.type]("getrows").length;
                //var myVar = setInterval(myTimer, 50);
                //function myTimer() {
                //    var gridCols = $('#' + grid.name).find("div[role='columnheader']");
                //    if (gridCols.length > 0) {
                //        $(gridCols[0]).attr('title', rowCount);
                //        $(gridCols[0]).find("span").text(rowCount);
                //        clearInterval(myVar);
                //    }
                //}
            }

            //var width = rowCount.toString().length * 10;
            //if (width < 30) { width = 30; }
            //$('#' + grid.name)[grid.type]('setcolumnproperty', endRowNoId, 'text', rowCount);
            //$('#' + grid.name)[grid.type]('setcolumnproperty', endRowNoId, 'width', width);
            //$('#' + $(div).prop('id') + endRowNoId).attr('title', rowCount);
        }
        catch (err) {
            errorHandle(formName, 'setTotalRowCount', err);
        }
    }
    function refreshData(div, data, saveRefresh, noSelect) {
        try {
            var options = $.data(div, formName).options;
            var grid = getGridObject(div);
            options.oldRowIndex = -1;
            clearOData(grid);
            if (grid.type == 'jqxGrid') {
                grid.source.localdata = data.rows;
                if (grid.source.datafields.length == 0) {
                    grid.source.datafields = data.columns;
                }
                //$('#' + grid.name)[grid.type]('updatebounddata');
                //if (data.rows.length > 0) {
                //    $('#' + grid.name)[grid.type]('selectrow', 0);
                //}
                //$('#' + grid.name)[grid.type]('scrolloffset', 0, 0);
                selectAddMoveRow(div, data, saveRefresh, noSelect);
            }
            else {
                grid.source.localdata = data.rows;
                if (grid.source.dataFields.length == 0) {
                    grid.source.dataFields = data.columns;
                }
                $('#' + grid.name)[grid.type]('updateBoundData');
                $('#' + grid.name)[grid.type]('expandAll');
                if (data.rows.length > 0) {
                    var mid = options.settingData.DYFIELD.rows[0].TREEKEYFIELD;
                    var link = options.settingData.DYFIELD.rows[0]['TreeParentKeyField'.toUpperCase()];
                    $('#' + grid.name)[grid.type]('selectRow', getTreeGridFirstKey(data.rows, mid, link));
                }
                $('#' + grid.name)[grid.type]('scrollOffset', 0, 0);
            }
            createHeaderContextMenu(div, grid.name);
            if (getHaveButtons(div)) {
                createButtons(div, grid.name);
            }
            _changePageInfo(grid.name, options);
            setTotalRowCount(div);
            formResize(div);
        }
        catch (err) {
            errorHandle(formName, 'refreshData', err);
        }
    };
    function setParentRefresh(div, parentData, saveRefresh) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var sKeys = Object.keys(settingData);
            var pKeys = Object.keys(parentData);
            settingData[sKeys[0]] = parentData[pKeys[0]];
            //2019/01/17 加取得總筆數
            if (settingData[sKeys[0] + "_Count"] != null) {
                settingData[sKeys[0] + "_Count"] = parentData[pKeys[0] + "_Count"];
                options.realPageNo = 1;
            }
            //messageBox(JSON.stringify(options.settingData));
            //options.settingData = null;
            refreshData(div, settingData[Object.keys(settingData)[0]], saveRefresh);
            if (getHaveButtons(div)) {
                createButtons(div, getGridObject(div).name);
            }
        }
        catch (err) {
            errorHandle(formName, 'setParentRefresh', err);
        }
    }
    function refreshGrid(div, action, saveRefresh) {
        getSettingData(div, function (r) {
            try {
                if (r == true) {
                    var options = $.data(div, formName).options;
                    var settingData = options.settingData;
                    refreshData(div, settingData[Object.keys(settingData)[0]], saveRefresh);
                    if (getHaveButtons(div)) {
                        createButtons(div, getGridObject(div).name);
                    }
                }
                if (typeof action === "function") action(r);
            }
            catch (err) {
                errorHandle(formName, 'refreshGrid', err);
            }
        })
    }
    //更新 Grid
    function refresh(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            //i秘書需要取此欄位
            //2016/12/01 Jacky 取ProgramId refresh 要用
            if (settingData['DYFIELD'] == null || settingData['DYFIELD'].rows.length == 0) return;
            options.programId = settingData['DYFIELD'].rows[0]['PROGRAMID'];
            //options.sysProgramId = settingData['DYFIELD'].rows[0]['SYSPROGRAMID'];

            var isTree = (settingData.DYFIELD.rows[0].ISTREEVIEW == 1);
            options.buttonType = settingData.DYFIELD.rows[0]['ButtonType'.toUpperCase()];
            options.isTree = isTree;
            var loadedOk = function () {
                if (options['loaded']) {
                    options['loaded']();
                }
                var e = $.Event("loaded");
                $(div).triggerHandler(e);
            }
            if (isTree == true) {
                createTreeGrid(div, function () {
                    loadedOk();
                });
            }
            else {
                createDataGrid(div, function () {
                    loadedOk();
                });
            }
            //$(options.container).on('resize.' + $(div).prop("id"), function () {
            //    formResize(div);
            //});
            $(document).on('click.' + $(div).prop('id') + " contextmenu." + $(div).prop('id'), function (e) {
                var menuId = $(div).prop('id') + endMenuId;
                if ($("#" + menuId).length > 0) {
                    if (e.type == "click" || checkIsChild($(div), $(document.activeElement)) != true) {
                        $("#" + menuId).jqxMenu('close');
                    }
                }
            });

        }
        catch (err) {
            errorHandle(formName, "refresh", err);
        }
    }
    function getGridProperties(div, name) {
        var options = $.data(div, formName).options;
        if (options.isTree != true) {
            return name.toLowerCase();
        }
        else {
            switch (name.toLowerCase()) {
                case "localdata":
                    return "localdata";
                case "datatype":
                    return "dataType";
                case "datafields":
                    return "dataFields";
            }
        }
    }
    function getButtonType(div) {
        try {
            var settingData = $.data(div, formName).options.settingData;
            if (settingData.DYFIELD.rows.length > 0) {
                return settingData.DYFIELD.rows[0]['ButtonType'.toUpperCase()];
            }
            else {
                return null;
            }
        }
        catch (err) {
            errorHandle(formName, "getButtonType", err);
        }
    }
    function getHaveButtons(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            return settingData.DYMENU.rows.length > 0 && (getButtonType(div) == null || getButtonType(div) == 0 || options.listFields.length > 0);
        }
        catch (err) {
            errorHandle(formName, "getHaveButtons", err);
        }
    }
    function getCanChoose(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            options.canChoose = (settingData.DYFIELD.rows[0].CANCHOOSE == 1)
            return options.canChoose;
        }
        catch (err) {
            errorHandle(formName, "getCanChoose", err);
        }
    }
    function getSelectionMode(div) {
        try {
            var settingData = $.data(div, formName).options.settingData;
            var selectionmode = "singlerow";
            if (getCanChoose(div)) {
                //selectionmode = "checkbox";
            }
            return selectionmode;
        }
        catch (err) {
            errorHandle(formName, "getSelectionMode", err);
        }
    }
    function getGridHeight(div) {
        try {
            var options = $.data(div, formName).options;
            var gridOptions = options.gridOptions;
            var gridHeight = $(div).height() - 5;
            var grid = getGridObject(div);
            if (gridOptions != null && (gridOptions.autoheight == true || gridOptions.autorowheight == true ||
                gridOptions.autoHeight == true || gridOptions.autoRowHeight == true)) {
                if (grid != null) {
                    var divHeight = $(div).height();
                    if (divHeight < $('#' + grid.name).height()) {
                        divHeight = $('#' + grid.name).height() + 5;
                        if (getHaveButtons(div)) { divHeight += buttonHeight; }
                        $(div).css('height', divHeight);
                    }
                }
            }

            if (gridHeight > 80) {
                if (getHaveButtons(div)) {
                    gridHeight -= buttonHeight;
                }

                //if (getRowByKeyValue(options.settingData.DYFIELD.rows, "LISTFIELD", 1) != null) {
                //    gridHeight -= 5;
                //}
            }
            else {
                gridHeight = 80;
            }

            return gridHeight;
        }
        catch (err) {
            errorHandle(formName, "getGridHeight", err);
        }
    }
    //建立一般的 Grid
    function createDataGrid(div, action) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var data = getGridData(div, settingData, 1);
            var gridId = $(div).prop('id') + getUniqueId();
            var divID = $(div).prop('id');
            options.gridId = gridId;
            var gridHeight = getGridHeight(div);
            $('<div id = ' + gridId + '></div>').appendTo($(div));
            //var keys = Object.keys(settingData);
            var columns = getGridColumns(div);
            options.gridColumns = columns;
            var source = {
                datatype: "json",
                datafields: columns[1],
                localdata: data
            };
            options.gridSource = source;
            var cols = columns[0];
            if (cols == null) {
                return;
            }
            //建立 Header ContextMenu
            for (var i = 0; i < cols.length; i++) {
                var dataField = cols[i]['datafield'];
                if (dataField == endRowNoId) {
                    cols[i]['rendered'] = function (header) {
                        //setTotalRowCount(div);
                        var count = $('#' + gridId).jqxGrid("getrows").length;
                        var html = $(header);
                        html.find("span").text(count);
                        return html.outerHTML;
                    };
                }
                else if (dataField != null && dataField != chooseFieldName) {
                    //var func = "(function (e) {" +
                    //    "var eles = $('#" + gridId + "').find('.jqx-grid-column-header');\r\n" +
                    //    "$(eles[" + i + "]).on('contextmenu'," +
                    //    "function (event) {\r\n" +
                    //    "var dataField = '" + dataField + "';\r\n" +
                    //    //"if (haveContextMenu(div, dataField) == true) {" +
                    //    "event.preventDefault();\r\n" +
                    //    //"}" +
                    //    "createContextMenu($('#" + $(div).prop("id") + "')[0], '" + gridId + "', event, dataField, null, -1, options.gridColumns[0]);\r\n" +
                    //    "}" +
                    //    ");" +
                    //    "})";
                    //cols[i]['rendered'] = eval(func);
                    //func = null;
                }
            }
            var dataAdapter = new $.jqx.dataAdapter(source);
            var agg = checkHaveAggregates(div);
            var gridOptions = {
                source: dataAdapter,
                pageable: false,
                //pagermode: "simple",
                selectionMode: getSelectionMode(div),
                showaggregates: checkHaveAggregates(div)[0],
                width: '100%',
                editable: true,
                altrows: true,
                sortable: true,
                filterable: true,
                columnsresize: true,
                columnsautoresize: true,
                columns: cols,
                theme: options.theme,
                enablekeyboarddelete: false,
                enablebrowserselection: true,
                //enabletooltips: true,
                clipboard: false,
                localization: options.localization,
                //rendered: function (type) {
                //    if (type == "full") {
                //        action(true);
                //    }
                //},
                ready: function () {
                    try {
                        if (data.length > 0) {
                            options.selectedRowIndex = 0;
                            options.oldRowIndex = 0;
                            $('#' + gridId).jqxGrid('scrolloffset', 0, 0);
                            $('#' + gridId).jqxGrid('selectrow', 0);
                            var event = { args: { rowindex: 0, row: $('#' + gridId).jqxGrid('getrowdata', 0) } };
                            var e = $.Event("rowselect", event);
                            $('#' + divID).triggerHandler(e);
                            var e1 = $.Event("rowSelected", event);
                            $('#' + divID).triggerHandler(e1);
                        }
                        setTotalRowCount($('#' + divID)[0]);
                        //將過濾的位置做調整
                        changeFilterPanelPosition($('#' + divID)[0], gridId);
                        action(true);
                    }
                    catch (err) {
                        errorHandle(formName, 'createDataGrid_ready', err);
                    }
                },
                //rendered: function () {
                //    $('#' + gridId).jqxGrid('scrolloffset', 0, 0);
                //}
            };
            gridOptions = $.extend(gridOptions, options.gridOptions);
            var fieldRow = settingData['DYFIELD'].rows[0];
            options.toolbarHeight = toolbarHeight;
            if (options.buttonType == 4 || options.buttonType == 5) {
                options.toolbarHeight = centerButtonSize + 4;
            }
            var toolbarFunc = function () {
                if (options.buttonType == 1 || options.buttonType == 4) {
                    options.hasToolbar = true;
                    //gridOptions['showtoolbar'] = true;
                    gridOptions['toolbarheight'] = options.toolbarHeight;
                    gridOptions['rendertoolbar'] = function (toolbar) {
                        var btnCount = createBarControl(div, gridId, source, toolbar);
                        $("#" + options.gridId).jqxGrid({
                            showtoolbar: btnCount > 0
                        });
                    };
                }
            }
            var statusbarFunc = function () {
                if (options.buttonType == 2 || options.buttonType == 5) {
                    options.hasStatusbar = true;
                    //gridOptions['showstatusbar'] = true;
                    gridOptions['statusbarheight'] = options.toolbarHeight;
                    gridOptions['renderstatusbar'] = function (statusbar) {
                        var btnCount = createBarControl(div, gridId, source, statusbar, 2);
                        $("#" + options.gridId).jqxGrid({
                            showstatusbar: btnCount > 0 || checkHaveAggregates(div)[0]
                        });
                    };
                }
                else {
                    var aggs = checkHaveAggregates(div);
                    gridOptions['showstatusbar'] = aggs[0];
                    if (aggs[0] == true) {
                        gridOptions['statusbarheight'] = options.toolbarHeight + ((aggs[1] - 1) * 12);
                    }
                }

            }
            if (options.showReportCaption != false) {
                if (fieldRow['CaptionA2'.toUpperCase()] != null) {
                    //gridOptions['showtoolbar'] = options.showReportCaption;
                    gridOptions['toolbarheight'] = options.toolbarHeight;
                    gridOptions['rendertoolbar'] = function (toolbar) {
                        try {
                            var pHeight = $(toolbar).height() - 1;
                            var container = $('<div style="margin:3px;line-height:' + pHeight + 'px;">' + fieldRow['CaptionA2'.toUpperCase()] + '</div>');
                            container.appendTo(toolbar);
                            var toolbarCon = $('<div style="margin:1px;line-height:' + pHeight + 'px;"></div>');
                            toolbarCon.appendTo(toolbar);
                            var btnCount = createBarControl(div, gridId, source, toolbarCon);
                            $("#" + options.gridId).jqxGrid({
                                showtoolbar: btnCount > 0
                            });

                        }
                        catch (err) {
                            errorHandle(formName, 'createDataGrid_rendertoolbar', err);
                        }
                    };
                }
                else {
                    toolbarFunc();
                }
            }
            else {
                toolbarFunc();
            }
            statusbarFunc();
            //2017/01/18 增加可秀Detail 資料
            if (fieldRow['TYPE'] == 5) {
                gridOptions.rowdetails = true;
                gridOptions.rowdetailstemplate = { rowdetails: "<div style='margin-top: 5px;margin-bottom: 5px;padding: 2px;'><div></div></div>", rowdetailsheight: rowDetailsHeight };
                gridOptions.initrowdetails = function (index, parentElement, gridElement, datarecord) {
                    try {
                        var panel = $($(parentElement).children()[0]);
                        var pId = $(div).prop('id') + 'pan' + index;
                        $(panel).prop('id', pId);
                        var conditionObj = panel.children()[0];
                        var cId = $(div).prop('id') + 'con' + index;
                        $(conditionObj).prop('id', cId);
                        $(conditionObj).dynamicCondition($.extend({}, {
                            loginInfo: options.loginInfo,
                            container: $(conditionObj).parent(),
                            programId: options.programId,
                            parameters: getSelectedRow(div, true),
                            localization: options.localization,
                            theme: options.theme
                        }));
                        options.controls.push({ name: cId, type: 'dynamicCondition', level: 2 });
                        panel.jqxPanel({ width: '94%', height: rowDetailsHeight - 15 });
                        $('#panelContent' + pId).addClass('jqx-grid-cell-alt-' + options.theme);
                        options.controls.push({ name: pId, type: "jqxPanel", level: 1 });
                    }
                    catch (err) {
                        errorHandle(formName, 'createDataGrid_initrowdetails', err);
                    }
                };
            }
            if (gridHeight != null) {
                gridOptions.height = gridHeight;
            }
            if (options.localization != null) {
                gridOptions.localization = options.localization;
            }
            $('#' + gridId).on('rowselect', function (event) {
                try {
                    if (event.args.rowindex != options.oldRowIndex && options.noRowSelect != true) {
                        if (options.editable == true) {

                        }
                        options.selectedRowIndex = event.args.rowindex;
                        var ev = { args: { rowindex: event.args.rowindex, row: event.args.row } };
                        var e = $.Event("rowselect", ev);
                        $(div).triggerHandler(e);
                        var e1 = $.Event("rowSelected", ev);
                        $(div).triggerHandler(e1);
                        options.oldRowIndex = event.args.rowindex;
                    }
                    else {
                        options.oldRowIndex = event.args.rowindex;
                        options.selectedRowIndex = event.args.rowindex;
                        return false;
                    }
                }
                catch (err) {
                    errorHandle(formName, 'createDataGrid_rowSelect', err);
                }
            });
            //2017/04/17 有過濾時也要指到第1筆
            $('#' + gridId).on("filter", function (event) {
                try {
                    var rows = $('#' + gridId).jqxGrid('getrows');
                    if (rows.length == 0) return;
                    var rowIndex = rows[0].dataindex;
                    if (rowIndex == null) rowIndex = 0;
                    $('#' + gridId).jqxGrid('selectrow', rowIndex);
                    $("#gridmenu" + gridId).css("display", "none");
                    //$('#' + gridId).jqxGrid('ensurerowvisible', rowIndex);
                }
                catch (err) {
                    errorHandle(formName, 'createDataGrid_filter', err);
                }
            });
            $('#' + gridId).on('beginrowselectall', function () {
                options.rowSelectAll = true;
            });
            $('#' + gridId).on('endrowselectall', function (e) {
                var args = {
                    rowindex: options.selectedRowIndex,
                    datafield: chooseFieldName,
                    newvalue: e.args.newvalue
                };
                var e = $.Event("cellValueChanged", { args: args });
                $(div).triggerHandler(e);
                $('#' + gridId).jqxGrid('selectrow', options.selectedRowIndex);
                options.rowSelectAll = false;
            });
            $('#' + gridId).on('cellvaluechanged', function (event) {
                try {
                    if (options.rowSelectAll != true) {
                        // event arguments.
                        var args = event.args;
                        // column data field.
                        var datafield = event.args.datafield;
                        // row's bound index.
                        var rowIndex = args.rowindex;
                        // new cell value.
                        var value = args.newvalue;
                        // old cell value.
                        var oldvalue = args.oldvalue;
                        $('#' + gridId).jqxGrid('selectrow', rowIndex);
                        var e = $.Event("cellValueChanged", { args: event.args });
                        $(div).triggerHandler(e);
                    }
                }
                catch (err) {
                    errorHandle(formName, 'createDataGrid_cellvaluechanged', err);
                }
            });

            //$('#' + gridId).on('bindingcomplete', function (event) {
            //    setTotalRowCount(div);
            //});
            //2019/01/16 Jacky pageable
            var keys = Object.keys(options.settingData);
            if (options.settingData[keys[0] + '_Count'] != null && fieldRow["PageRowCount".toUpperCase()] > 0) {
                options.pagesize = fieldRow["PageRowCount".toUpperCase()];
                gridOptions["pageable"] = true;
                gridOptions["pagesize"] = fieldRow["PageRowCount".toUpperCase()];
                gridOptions["pagermode"] = 'simple';
                gridOptions["pagerheight"] = pagerHeight;
                gridOptions["pagerrenderer"] = function () {
                    return pagerRenderer(div, gridId);
                };
            }
            keys = null;
            $('#' + gridId).on('pageChanged', function (event) {
                //alert("pageChanged");
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: 0, source: source });
            options.gridOptions = $.extend(gridOptions, handleKeyboardNavigation(gridId, gridOptions.columns, true));
            $('#' + gridId).jqxGrid(options.gridOptions);
            gridOptions = null;
            dataAdapter = null;
            //cols = null;
            $('#' + gridId).appendTo($(div));

            $('#' + gridId).on('contextmenu', function (event) {
                //if (options.haveCM == true) {
                event.preventDefault();
                return false;
                //}
            });
            //建立ContextMenu
            $('#' + gridId).on("cellclick", function (event) {
                try {
                    options.haveCM = false;
                    var args = event.args;
                    var rowindex = args.rowindex;
                    var dataField = args.datafield;
                    var row = $('#' + gridId).jqxGrid('getrowdata', rowindex);
                    if (event.args.rightclick) {
                        event.preventDefault();
                        var haveCM = haveContextMenu(div, dataField);
                        options.haveCM = haveCM;

                        //if (haveCM == true) {
                        event.preventDefault();
                        $('#' + gridId).jqxGrid('selectrow', rowindex);
                        createContextMenu(div, gridId, event, dataField, row, rowindex, cols);
                        //}
                    }
                    else {
                        $('#' + gridId).jqxGrid('selectrow', rowindex);
                        createLeftClick(div, gridId, event, dataField, row, rowindex, cols);
                    }
                    //當可編輯時, 如為最後一筆 且 為rowNo欄位 則再新增一筆row
                    if (options.editable == true && dataField == "rowNo") {
                        var rows = $('#' + gridId).jqxGrid("getrows");
                        if (rowindex == rows.length - 1) {
                            var row = $('#' + gridId).jqxGrid("getrowdata", rowindex);
                            var doIt = false;
                            for (var r = 0; r < cols.length; r++) {
                                if (isEmpty(row[cols[r]["datafield"]]) != true) {
                                    doIt = true;
                                    break;
                                }
                            }
                            if (doIt == true) {
                                $('#' + gridId).css('display', "none");
                                $('#' + gridId).jqxGrid('addrow', null, {});
                                gridMoveByRowIndex(gridId, rowindex + 1);
                                $('#' + gridId).prop("style").removeProperty('display');
                                options.addRowMode = true;
                            }
                        }
                    }
                }
                catch (err) {
                    errorHandle(formName, 'createDataGrid_cellclick', err);
                }
            });
            if (options.editable == true) {
                //刪除row
                $('#' + gridId).on('keydown', function (e) {
                    try {
                        if (e.keyCode == 46) {
                            messageBox(options.language.sureDelete, messageType.yesno, null, function (r) {
                                if (r == "yes") {
                                    var rowIndex = $('#' + gridId).jqxGrid('getselectedrowindex');
                                    if (rowIndex >= 0) {
                                        var id = $('#' + gridId).jqxGrid('getrowid', rowIndex);
                                        var keys = Object.keys(options.settingData);
                                        delete options.settingData[keys[0]].rows[id];
                                        options.settingData[keys[0]].rows = options.settingData[keys[0]].rows.filter(function (e) { return e });
                                        refreshData(div, options.settingData[keys[0]], null, true);
                                        if (rowIndex > options.settingData[keys[0]].rows.length - 1) { rowIndex = options.settingData[keys[0]].rows.length - 1; }
                                        if (options.settingData[keys[0]].rows.length > 0) {
                                            gridMoveByRowIndex(gridId, rowIndex);
                                        }
                                    }
                                }
                            })
                        }
                    }
                    catch (err) {
                        errorHandle(formName, 'createDataGrid_keydown', err);
                    }
                });
                //檢核PK是否可存檔
                $('#' + gridId).on('cellendedit', function (e) {
                    try {
                        var args = e.args;
                        var column = args.datafield;
                        // cell value
                        var value = args.value;
                        // cell old value.
                        var oldvalue = args.oldvalue;
                        if (value === oldvalue) { return; }
                        var rowBoundIndex = args.rowindex;
                        if (options.PKFields.indexOf(column) >= 0) {
                            var keys = Object.keys(options.settingData);
                            var rows = cloneJSON(options.settingData[keys[0]].rows);
                        }
                    }
                    catch (err) {
                        errorHandle(formName, 'createDataGrid_cellendedit', err);
                    }
                });
            }
            createHeaderContextMenu(div, gridId);
            if (getHaveButtons(div)) {
                createButtons(div, gridId);
            }
        }
        catch (err) {
            errorHandle(formName, 'createDataGrid', err);
        }
        finally {
            settingData = null;
        }
    };
    function changePageNo(div, page) {
        var options = $.data(div, formName).options;
        options.realPageNo = page;
        _changePageInfo(getGridObject(div).name, options);
    }
    function _changePageInfo(gridId, options) {
        try {
            if (options.pagesize > 0) {
                var keys = Object.keys(options.settingData);
                var totalCount = options.settingData[keys[0] + '_Count'].rows[0]["INTCOUNT"];
                var maxPages = Math.ceil(totalCount / options.pagesize);
                if ($("#" + gridId + "_pRows").length > 0) {
                    $("#" + gridId + "_pRows").text(1 + (options.realPageNo - 1) * options.pagesize + "-" + Math.min(totalCount, (options.realPageNo) * options.pagesize) + options.localization.pagerrangestring + totalCount);
                }
                if ($("#" + gridId + "_pNo").length > 0) {
                    $("#" + gridId + "_pNo").text(options.realPageNo + " / " + maxPages);
                }
            }
        }
        catch (err) {
        }
    }
    function pagerRenderer(div, gridId) {
        try {
            var options = $.data(div, formName).options;
            var marginTop = (pagerHeight - 16) / 2;
            var divID = $(div).prop("id");
            var element = $("<div style='margin-left: 10px; margin-top: " + marginTop + "px; width: 99%; height: 100%; padding-right: 10px;'></div>");
            var leftButton = $("<div style='padding: 0px; float: right;'><div style='margin-left: 9px; width: 16px; height: 16px;'></div></div>");
            leftButton.find('div').addClass('jqx-icon-arrow-left');
            leftButton.width(36);
            var lPage = $("<div id='" + gridId + "_pNo'  style='font-size: 11px; margin: 2px 3px; margin-top:-3px; font-weight: bold; float: right;'></div>");

            // leftButton.jqxButton({ theme: theme });
            var rightButton = $("<div style='padding: 0px; margin: 0px 3px; float: right;'><div style='margin-left: 9px; width: 16px; height: 16px;'></div></div>");
            rightButton.find('div').addClass('jqx-icon-arrow-right');
            rightButton.width(36);
            // rightButton.jqxButton({ theme: theme });
            leftButton.appendTo(element);
            lPage.insertBefore(leftButton);
            rightButton.insertBefore(lPage);
            var label = $("<div id='" + gridId + "_pRows'  style='font-size: 11px; margin: 2px 3px; margin-top:-3px; font-weight: bold; float: right;'></div>");
            label.width(150);
            var keys = Object.keys(options.settingData);
            var totalPageCount = options.settingData[keys[0]].rows.length;
            var totalCount = options.settingData[keys[0] + '_Count'].rows[0]["INTCOUNT"];
            var maxPages = Math.ceil(totalCount / options.pagesize);
            lPage.text("1" + " / " + maxPages);
            label.text("1-" + totalPageCount + options.localization.pagerrangestring + options.settingData[keys[0] + '_Count'].rows[0]["INTCOUNT"]);
            label.insertBefore(rightButton);
            // update buttons states.
            var handleStates = function (event, button, className, add) {
                button.on(event, function () {
                    if (add == true) {
                        button.find('div').addClass(className);
                    }
                    else button.find('div').removeClass(className);
                });
            }
            if (options.theme != '') {
                handleStates('mousedown', rightButton, 'jqx-icon-arrow-right-selected-' + options.theme, true);
                handleStates('mouseup', rightButton, 'jqx-icon-arrow-right-selected-' + options.theme, false);
                handleStates('mousedown', leftButton, 'jqx-icon-arrow-left-selected-' + options.theme, true);
                handleStates('mouseup', leftButton, 'jqx-icon-arrow-left-selected-' + options.theme, false);
                handleStates('mouseenter', rightButton, 'jqx-icon-arrow-right-hover-' + options.theme, true);
                handleStates('mouseleave', rightButton, 'jqx-icon-arrow-right-hover-' + options.theme, false);
                handleStates('mouseenter', leftButton, 'jqx-icon-arrow-left-hover-' + options.theme, true);
                handleStates('mouseleave', leftButton, 'jqx-icon-arrow-left-hover-' + options.theme, false);
            }
            var movePage = function (count) {
                var totalCount = options.settingData[keys[0] + '_Count'].rows[0]["INTCOUNT"];
                var maxPages = Math.ceil(totalCount / options.pagesize);
                var page = options.realPageNo + count;
                if (page >= 1 && page <= maxPages) {
                    var event = {
                        args: {
                            pageInfo: {
                                pageNo: page,
                                oldPageNo: options.realPageNo,
                                addPage: count
                            }
                        }
                    };
                    var e = $.Event("beforePageChange", event);
                    $("#" + divID).triggerHandler(e);
                    getPageData(div, page, function (r) {
                        if (r[0]) {
                            if (r[1] != null) {
                                var keys = Object.keys(r[1]);
                                refreshData(div, r[1][keys[0]]);
                            }
                            if (options.autoChangePage) {
                                options.realPageNo = page;
                                _changePageInfo(gridId, options);
                            }
                            var e = $.Event("pageChanged", event);
                            $("#" + divID).triggerHandler(e);
                        }
                    });
                }
            }
            rightButton.off();
            rightButton.on("click", function () {
                movePage(1);
            });
            leftButton.off();
            leftButton.on("click", function () {
                movePage(-1);
            });
            return element;
        }
        catch (err) {
            errorHandle(formName, 'pagerRenderer', err);
        }
    }
    function createHeaderContextMenu(div, gridId) {
        try {
            var options = $.data(div, formName).options;
            var ele = $("#" + gridId).find(".jqx-grid-column-header")[0];
            $(ele).parent().on("contextmenu", function (event) {
                try {
                    event.preventDefault();
                    var parents = $(event.target).parents();
                    var cols = options.gridColumns[0];
                    var eles = $(this).find(".jqx-grid-column-header");
                    for (var i = 0; i < parents.length; i++) {
                        if ($(parents[i]).hasClass("jqx-grid-column-header")) {
                            for (var j = 0; j < eles.length; j++) {
                                var dataField = cols[j]['datafield'];
                                if (dataField == endRowNoId) {
                                    continue;
                                }
                                if (parents[i].innerHTML == eles[j].innerHTML) {
                                    createContextMenu(div, gridId, event, dataField, null, -1, options.gridColumns[0]);
                                }
                            }
                        }
                    }
                }
                catch (err) {
                    errorHandle(formName, 'createHeaderContextMenu', err);
                }
            });
            //var cols = options.gridColumns[0];
            //var eles = $("#" + gridId).find(".jqx-grid-column-header");
            //for (var i = 0; i < cols.length; i++) {
            //    var dataField = cols[i]['datafield'];
            //    if (dataField == endRowNoId) {
            //        continue;
            //    }
            //    else if (dataField != null && dataField != chooseFieldName) {
            //        $(eles[i]).on("contextmenu", function (event) {
            //            event.preventDefault();
            //            createContextMenu(div, gridId, event, dataField, null, -1, options.gridColumns[0]);
            //        });
            //    }
            //}
        }
        catch (err) {
            errorHandle(formName, 'createHeaderContextMenu', err);
        }
    };
    //function createHeaderContextMenu(div, gridId) {
    //    try {
    //        var options = $.data(div, formName).options;
    //        var cols = options.gridColumns[0];
    //        var eles = $("#" + gridId).find(".jqx-grid-column-header");
    //        for (var i = 0; i < cols.length; i++) {
    //            var dataField = cols[i]['datafield'];
    //            if (dataField == endRowNoId) {
    //                continue;
    //            }
    //            else if (dataField != null && dataField != chooseFieldName) {
    //                $(eles[i]).on("contextmenu", function (event) {
    //                    event.preventDefault();
    //                    createContextMenu(div, gridId, event, dataField, null, -1, options.gridColumns[0]);
    //                });
    //            }
    //        }
    //    }
    //    catch (err) {
    //        errorHandle(formName, 'changeFilterPanelPosition', err);
    //    }
    //};
    function changeFilterPanelPosition(div, gridId) {
        try {
            var options = $.data(div, formName).options;
            var myVer;
            //var pageY;
            var myTimer = function (e) {
                if ($("#gridmenu" + gridId).length > 0) {
                    try {
                        //var totalTop = $(options.container).position().top;
                        //var maxHeight = $(document).innerHeight() - 60;
                        //if (options.tabContainer != null) {
                        //    totalTop += $(options.tabContainer).position().top;
                        //    maxHeight = $(options.tabContainer).height();
                        //}
                        //var menuHeight = $("#gridmenu" + gridId).height();
                        //var columnTop = $(div).position().top + (options.hasToolbar == true ? toolbarHeight : 0);
                        //if ((totalTop + menuHeight + columnTop) > maxHeight) {
                        //    $("#gridmenu" + gridId).css({ top: totalTop + columnTop - menuHeight });
                        //}
                        var maxHeight = $(document).innerHeight() - 60;
                        if (options.tabContainer != null) {
                            maxHeight = $(options.tabContainer).position().top +
                                $(options.tabContainer).height();
                        }
                        var menuHeight = $("#gridmenu" + gridId).height();
                        var menuTop = $("#gridmenu" + gridId).position().top;
                        if (menuTop + menuHeight > maxHeight) {
                            $("#gridmenu" + gridId).css({ top: menuTop - menuHeight - gridColumnHeight });
                        }

                        //clearTimeout(myVer);
                        $("#gridmenu" + gridId).css({ display: "" });
                    }
                    catch (err) {
                    }
                }
            };
            //.jqx-grid-column-filterbutton
            $('#' + gridId).find(".jqx-grid-column-menubutton, .jqx-grid-column-filterbutton").off('click.' + $(div).prop("id"));
            $('#' + gridId).find(".jqx-grid-column-menubutton, .jqx-grid-column-filterbutton").on('click.' + $(div).prop("id"), function (e) {
                if ($("#gridmenu" + gridId).css("display") == "none" || $(this).data("show") != true) {
                    //pageY = e.pageY;
                    $("#gridmenu" + gridId).css({ display: "none" });
                    var x = setInterval(function () {
                        if ($("#gridmenu" + gridId).css("display") != "none") {
                            //myVer = setTimeout(myTimer, 100);
                            myTimer(e);
                            $(this).data("show", true);
                            clearInterval(x);
                        }
                    }, 10);
                }
                else {
                    $(this).data("show", false);
                }
            });

        }
        catch (err) {
            errorHandle(formName, 'changeFilterPanelPosition', err);
        }
    }
    function checkHaveAggregates(div) {
        try {
            var settingData = $.data(div, formName).options.settingData;
            var count = 0;
            for (var i = 0; i < settingData.DYFIELD.rows.length; i++) {
                if (settingData.DYFIELD.rows[i].AGGREGATES != null) {
                    var c = settingData.DYFIELD.rows[i].AGGREGATES.split("::")[0].split('\r\n');
                    if (c.length > count) {
                        count = c.length;
                    }
                }
            }
            if (count > 0) {
                return [true, c.length];
            }
            else {
                return [false, 0];
            }
        }
        catch (err) {
            errorHandle(formName, 'checkHaveAggregates', err);
        }
    };
    //建立Tree Grid
    function createTreeGrid(div, action) {
        try {
            var options = $.data(div, formName).options;
            var data = getGridData(div, options.settingData, 1);
            var gridId = $(div).prop('id') + getUniqueId();
            var divID = $(div).prop('id');
            options.gridId = gridId;
            var gridHeight = getGridHeight(div);
            $('<div id = ' + gridId + '></div>').appendTo($(div));

            var keys = Object.keys(options.settingData);
            var columns = getGridColumns(div);
            options.gridColumns = columns;
            var source = {
                dataType: "json",
                localdata: data,
                dataFields: columns[1],
                hierarchy: {
                    keyDataField: { name: options.settingData.DYFIELD.rows[0].TREEKEYFIELD },
                    parentDataField: { name: options.settingData.DYFIELD.rows[0]['TreeParentKeyField'.toUpperCase()] }
                },
                id: options.settingData.DYFIELD.rows[0].TREEKEYFIELD
            };

            var cols = columns[0];
            if (cols == null) {
                return;
            }
            //建立 Header ContextMenu
            for (var i = 0; i < cols.length; i++) {
                var dataField = cols[i]['dataField'];
                if (dataField != null) {
                    //var func = "(function (e) {" +
                    //    "var eles = $('#" + gridId + "').find('.jqx-grid-column-header');" +
                    //    "$(eles[" + i + "]).on('contextmenu'," +
                    //    "function (event) {" +
                    //    "var dataField = '" + dataField + "';" +
                    //    "if (haveContextMenu(div, dataField) == true) {" +
                    //    "event.preventDefault();" +
                    //    "}" +
                    //    "createContextMenu($('#" + $(div).prop("id") + "')[0], '" + gridId + "', event, dataField, null, -1, options.gridColumns[0]);" +
                    //    "}" +
                    //    ");" +
                    //    "})";
                    //cols[i]['rendered'] = eval(func);
                    //func = null;
                }
            }
            var dataAdapter = new $.jqx.dataAdapter(source);
            var agg = checkHaveAggregates(div);
            var gridOptions = {
                source: dataAdapter,
                columns: cols,
                selectionMode: getSelectionMode(div),
                pagerMode: "simple",
                showAggregates: agg[0],
                aggregatesHeight: agg[1] * 18 + 2,
                width: '100%',
                altRows: true,
                sortable: true,
                //filterable: true,
                //filterMode: 'advanced',
                checkboxes: options.settingData.DYFIELD.rows[0]['CanChoose'.toUpperCase()] == 1,
                //editable: true,
                columnsResize: true,
                autoRowHeight: false,
                theme: options.theme,
                localization: options.localization,
                ready: function () {
                    if (data.length > 0) {
                        $('#' + gridId).jqxTreeGrid('expandAll');
                        var mid = options.settingData.DYFIELD.rows[0].TREEKEYFIELD;
                        var link = options.settingData.DYFIELD.rows[0]['TreeParentKeyField'.toUpperCase()];
                        var fKey = getTreeGridFirstKey(data, mid, link);
                        $('#' + gridId).jqxTreeGrid('selectRow', fKey);

                        var event = { args: { key: fKey, row: $('#' + gridId).jqxTreeGrid('getRow', fKey) } };
                        var e = $.Event("rowselect", event);
                        $("#" + divID).triggerHandler(e);
                        var e1 = $.Event("rowSelected", event);
                        $("#" + divID).triggerHandler(e1);
                    }
                    action(true);
                },
                rendered: function () {
                    for (r = 0; r < data.length; r++) {
                        var gridRow = $('#' + gridId).find("tr[data-key='" + data[r][options.settingData.DYFIELD.rows[0].TREEKEYFIELD] + "']");
                        var gridCells = $(gridRow).find("td[role='gridcell']");
                        for (c = 0; c < cols.length; c++) {
                            if (isEmpty(data[r][cols[c]['dataField']]) != true) {
                                var value = data[r][cols[c]['dataField']];
                                var eles = ["div", "span", "input"];
                                for (e = 0; e < eles.length; e++) {
                                    var ee = $(gridCells[c]).find(eles[e]);
                                    for (i = 0 ; i < ee.length; i++) {
                                        if (isEmpty($(ee[i]).text()) != true) {
                                            value = $(ee[i]).text();
                                        }
                                    }
                                }
                            }
                            $(gridCells[c]).attr('title', value);
                        }
                    }
                }
            }
            gridOptions = $.extend(gridOptions, options.gridOptions);

            if (gridHeight != null) {
                gridOptions.height = gridHeight;
            }
            if (options.localization != null) {
                gridOptions.localization = options.localization;
            }

            $('#' + gridId).jqxTreeGrid(gridOptions);
            $('#' + gridId).appendTo($(div));
            options.controls.push({ name: gridId, type: 'jqxTreeGrid', level: 0, source: source });
            $('#' + gridId).on('rowSelect', function (event) {
                try {
                    if (event.args.rowindex != options.oldRowIndex && options.noRowSelect != true) {
                        var ev = { args: { rowindex: event.args.rowindex, row: event.args.row } };
                        var e = $.Event("rowselect", ev);
                        $(div).triggerHandler(e);
                        var e1 = $.Event("rowSelected", ev);
                        $(div).triggerHandler(e1);
                        options.oldRowIndex = event.args.rowindex;
                    }
                    else {
                        options.oldRowIndex = event.args.rowindex;
                        return false;
                    }
                }
                catch (err) {
                    errorHandle(formName, 'createTreeGrid_rowSelect', err);
                }
            });

            $('#' + gridId).on('rowExpand', function (event) {
                // event args.
                var args = event.args;
                // row data.
                var row = args.row;
                // row key.
                var key = args.key;
                $('#' + gridId).jqxTreeGrid('selectRow', key);
            });
            $('#' + gridId).on('contextmenu', function (event) {
                //if (options.haveCM == true) {
                event.preventDefault();
                //}
            });

            //建立ContextMenu
            $('#' + gridId).on("rowClick", function (event) {
                try {
                    event.preventDefault();
                    var args = event.args;
                    options.haveCM = false;
                    if (args.originalEvent.button == 2) {
                        var args = event.args;
                        //var rowindex = args.rowindex;
                        var ev = args.originalEvent;
                        var dataField = args.dataField;
                        var row = args.row;
                        var haveCM = haveContextMenu(div, dataField);
                        options.haveCM = haveCM;
                        //if (haveCM == true) {
                        createContextMenu(div, gridId, event, dataField, row, 1, cols);
                        //}
                    }
                }
                catch (err) {
                    errorHandle(formName, 'createTreeGrid_rowClick', err);
                }
            });
            //$('#' + gridId).on('bindingComplete', function (event) {
            //    setTotalRowCount(div);
            //});
            createHeaderContextMenu(div, gridId);
            if (getHaveButtons(div)) {
                createButtons(div, gridId);
            }
        }
        catch (err) {
            errorHandle(formName, 'createTreeGrid', err);
        }
    };
    //檢核是否有contextMenu
    function haveContextMenu(div, field) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var dProId;
            $.each(settingData.DYFIELD.rows, function (idx, val) {
                if (val.FIELDNAME.toUpperCase() == field.toUpperCase()) {
                    dProId = val.DPROGRAMID;
                }
            });
            return (dProId != null && dProId != "");
        }
        catch (err) {
            errorHandle(formName, 'haveContextMenu', err);
        }
    };
    //建立元件
    function createFieldControl(div, gridId, event, field, row, rowindex, cols) {
        try {
            var options = $.data(div, formName).options;
            if (options.gridFieldControls == null || options.gridFieldControls.length == 0) return;
            var gfLength = options.gridFieldControls.length;
            var realField;
            for (var i = 0; i < gfLength; i++) {
                var gridField = options.gridFieldControls[i];
                if (field == gridField["dataField"]) {
                    realField = gridField;
                    break;
                }
            }
            if (realField == null) return;

            var value = event.args.value;
            var rowindex = event.args.rowindex;
            var workCodeId = $(div).prop('id') + "workCode";
            if ($("#" + workCodeId).length == 0) {
                $('<div class="SO1132B1_t" id="' + workCodeId + '" style="position:absolute;"></div>').appendTo(getControlObject(div, 'gbxGrid'));
                $("#" + workCodeId).csList({
                    theme: options.theme,
                    height: gridHeight - 1,
                    codeNoWidth: 51,
                    source: testSource(),
                    width: 260
                });
                $("#" + workCodeId).off();
                $("#" + workCodeId).on("selectedIndexChanged", function () {
                    var rowindex = $(this).data().rowindex;
                    $("#" + gridId).jqxGrid('setcellvalue', rowindex, "WORKCODE", $(this).csList('codeNo'));
                    $("#" + gridId).jqxGrid('setcellvalue', rowindex, "WORKNAME", $(this).csList('description'));
                });
                options.controls.push({ name: workCodeId, type: 'csList', level: options.level });
            }
            $("#" + workCodeId).data({ rowindex: rowindex });
            $("#" + workCodeId).css({
                top: $('#' + gridId).position().top + (rowindex + 1) * gridHeight + 2,
                left: $('#' + gridId).position().left + 30 + 150 + 120,
                'z-index': 99999
            });
            var row = $('#' + gridId).jqxGrid('getrowdata', rowindex);
            $("#" + workCodeId).csList("setDisplayValue", {
                CODENO: row['WORKCODE'],
                DESCRIPTION: row['WORKNAME'],
            });
        }
        catch (err) {
            errorHandle(formName, 'renderGrid_cellclick', err);
        }
    }
    //建立左鍵
    function createLeftClick(div, gridId, event, field, row, rowindex, cols) {
        try {
            if (isEmpty(field) || isEmpty(row[field])) { return; }
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var dProId = null;
            $.each(settingData.DYFIELD.rows, function (idx, val) {
                if (val.FIELDNAME.toUpperCase() == field.toUpperCase()) {
                    dProId = val.LPROGRAMID;
                }
            });
            if (dProId == null) return;
            var keys = Object.keys(settingData);
            var kLength = keys.length;
            var menuItems = null;
            var menuKey = -1;
            for (var i = 0 ; i < kLength; i++) {
                //if (keys[i].indexOf('MENU_') >= 0 || keys[i] == 'DYMENU') {
                if (keys[i] == 'LPROGRAMDATA') {
                    var rows = settingData[keys[i]].rows;
                    var rLength = rows.length;
                    for (var j = 0; j < rLength; j++) {
                        if (rows[j]['programId'.toUpperCase()] == dProId) {
                            menuItems = rows;
                            menuKey = j;
                            break;
                        }
                    }
                }
                if (menuItems != null) break;
            }
            if (menuItems == null) return;
            callDetailForm(div, null, menuItems, menuKey);
        }
        catch (err) {
            errorHandle(formName, 'createLeftClick', err);
        }
    }
    //建立 Context Menu
    function createContextMenu(div, gridId, event, field, row, rowindex, cols) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var isTree = (settingData.DYFIELD.rows[0].ISTREEVIEW == 1);
            var canPrint = ((settingData.DYFIELD.rows[0].CANPRINT == 1) && rowindex == -1);
            var dProId = null;
            $.each(settingData.DYFIELD.rows, function (idx, val) {
                if (val.FIELDNAME.toUpperCase() == field.toUpperCase()) {
                    dProId = val.DPROGRAMID;
                }
            });
            var contextmenuid = $(div).prop('id') + endMenuId;
            if ($('#' + contextmenuid).length > 0) {
                destroySingleControl({ name: contextmenuid, type: "jqxMenu" });
                //$('#' + contextmenuid).jqxMenu('destroy');
                var controls = deleteRowByKeyValue(options.controls, 'name', contextmenuid);
                options.controls = controls.filter(function (e) { return e });
            }
            //建立右鍵功能表
            if (isEmpty(dProId) == false || canPrint || rowindex >= 0) {
                if (isEmpty(dProId) == false && settingData["MENU_" + dProId] == null) {
                    messageBox(options.language.noMenuHead.replace("{0}", dProId));
                }
                else {
                    var menu = settingData["MENU_" + dProId];
                    var menuItems
                    if (menu != null) {
                        menuItems = menu.rows;
                    }
                    if (menuItems != null || canPrint || rowindex >= 0) {
                        $('<div id="' + contextmenuid + '"></div>').appendTo('body');
                        var ul = $('<ul></ul>').appendTo($('#' + contextmenuid));
                        //2017/07/10 Jacky 增加匯出excel
                        if (canPrint == true) {
                            $('<li id="' + $(div).prop('id') + endExpId + '">' +
                            '<img style="float: left; margin-right: 5px;width: ' + contextImgSize + 'px; height: ' + contextImgSize + 'px" src="' + imageScr.excel.imgSrc + '"/><span>' + options.language.lExport + '</span></li>').appendTo(ul);
                            if (menuItems != null) {
                                $("<li type='separator'></li>").appendTo(ul);
                            }
                        }
                        //2017/07/10 增加瀏覽明細資料
                        if (rowindex >= 0) {
                            $('<li id="' + $(div).prop('id') + endDetailId + '">' +
                            '<img style="float: left; margin-right: 5px;width: ' + contextImgSize + 'px; height: ' + contextImgSize + 'px" src="' + imageScr.view.imgSrc + '"/><span>' + options.language.lDetail + '</span></li>').appendTo(ul);
                            if (menuItems != null) {
                                $("<li type='separator'></li>").appendTo(ul);
                            }
                        }
                        for (var key in menuItems) {
                            var editMode = menuItems[key].EDITMODE;
                            var title = menuItems[key].CAPTION;
                            var type = menuItems[key].TYPE;
                            if (((editMode == 2 || editMode == 9) && (type == 2 || type == 0) && rowindex == -1) || rowindex >= 0) {
                                //var icon = null;
                                //if (type == 2) {
                                //    //0=顯示,1=修改,2=新增,3=刪除,5=列印,9=其他
                                //    switch (editMode) {
                                //        case 0:
                                //        case 9:
                                //            icon = imageScr.view.imgSrc;
                                //            break;
                                //        case 1:
                                //            icon = imageScr.edit.imgSrc;
                                //            break;
                                //        case 2:
                                //            icon = imageScr.append.imgSrc;
                                //            break;
                                //        case 3:
                                //            icon = imageScr.delete.imgSrc;
                                //            break;
                                //        case 5:
                                //            icon = imageScr.print.imgSrc;
                                //            break;
                                //        default:
                                //            break;
                                //    }
                                //}
                                //else {
                                //    icon = imageScr.view.imgSrc;
                                //}
                                var img = getEditModeImage(editMode, menuItems[key]["ImageUrl".toUpperCase()]);
                                if (type !== 2 && img == null) {
                                    img = imageScr.view;
                                }
                                var litag = title;
                                if (img != null) {
                                    var icon = img.imgSrc;
                                    litag = "<img style='float: left; margin-right: 5px; width: " + contextImgSize + "px; height: " + contextImgSize + "px' src='" + icon + "' /><span>" + title + "</span>";
                                }
                                //<img style='float: left; margin-right: 5px;' src='../images/mailIcon.png' /><span>Mail</span>
                                $('<li data-pid="' + key + '" id="' + contextmenuid + key + '">' + litag + '</li>').appendTo(ul);
                            }
                        }
                        if (ul.children().length == 0) {
                            $('#' + contextmenuid).remove();
                            return;
                        }
                        //create contextmenu
                        $('#' + contextmenuid).jqxMenu({ width: '200px', height: 'auto', animationHideDelay: 10, animationHideDuration: 10, autoOpenPopup: false, mode: 'popup' });
                        for (var key in menuItems) {
                            setButtonStyle(div, contextmenuid + key, menuItems[key]);
                            setButtonTooltip(div, contextmenuid + key, menuItems[key]);
                        }
                        options.controls.push({ name: contextmenuid, type: 'jqxMenu', level: 1 });
                        //item Click
                        $('#' + contextmenuid).on('itemclick', function (event) {
                            try {
                                $(this).jqxMenu('close');
                                var args = event.args;
                                if ($(args).prop("id") == $(div).prop("id") + endExpId) {
                                    exportGridToExcel(getControl(div, 'grid'), options.programId);
                                }
                                else if ($(args).prop("id") == $(div).prop("id") + endDetailId) {
                                    showDetail(div);
                                }
                                else {
                                    callDetailForm(div, args, menuItems);
                                }
                            }
                            catch (err) {
                                errorHandle(formName, 'itemclick', err);
                            }
                        });
                        var totalfieldWidth = 0;
                        $.each(cols, function (idx, val) {
                            var tfield;
                            if (isTree) {
                                tfield = val.dataField;
                                totalfieldWidth += $('#' + gridId).jqxTreeGrid('getColumnProperty', tfield, 'width');
                            }
                            else {
                                tfield = val.datafield;
                                totalfieldWidth += $('#' + gridId).jqxGrid('getcolumnproperty', tfield, 'width');
                            }
                            if (field == tfield) {
                                return;
                            }
                        });

                        //var scrollTop = $($('#' + gridId).parent()).scrollTop();
                        //var scrollLeft = $($('#' + gridId).parent()).scrollLeft();
                        var scrollTop = 0;
                        var scrollLeft = 0;

                        var x = scrollLeft + 5;
                        var y = scrollTop + 5;
                        if (event.pageX != null && event.pageY != null) {
                            x = event.pageX;
                            y = event.pageY;
                        }
                        else if (event.args != null && event.args.originalEvent != null) {
                            var ev = event.args.originalEvent;
                            x += parseInt(ev.clientX);
                            y += parseInt(ev.clientY);
                        }
                        function getMenuXY(x, y) {
                            if (x + 200 > $(window).width()) {
                                x -= 200;
                            }
                            if (y + $('#' + contextmenuid).height() > $(window).height()) {
                                y -= $('#' + contextmenuid).height();
                                if (y < 0) {
                                    y = 0;
                                }
                            }
                            return [x, y];
                        }
                        var xy = getMenuXY(x, y);
                        var e = $.Event("beforeMenuOpen");
                        $(div).triggerHandler(e);
                        $('#' + contextmenuid).jqxMenu('open', xy[0], xy[1]);
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'createContextMenu', err);
        }
    };
    function showDetail(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var row = getSelectedRow(div);
            var x = 2;
            var y = 30;
            var width = $(options.container).width() - 6;
            var height = $(options.container).height() - 36;
            if (width > 1000) { width = 1000; }
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: false,
                draggable: false,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language.lDetail, winOptions);
            options.controls.push({ name: win.windowId, type: 'csWindow', level: 1 });
            var gridId = win.contentId + 'det';
            $('#' + win.windowId).on('close', function () {
                try {
                    destroySingleControl({ name: gridId, type: "jqxGrid" });
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, "name", win.windowId);
                    options.controls = deleteRowByKeyValue(options.controls, "name", gridId);
                }
                catch (err) {
                    errorHandle(formName, 'showDetail_close', err);
                }
            });
            var data = [];
            var fields = options.gridColumns[0];
            if (options.isTree) {
                var selection = $('#' + options.gridId).jqxTreeGrid('getSelection');
                var rowData = selection[0];
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]["hidden"] != true && isEmpty(fields[i]["text"]) == false &&
                        fields[i]["text"] != "#") {
                        var realField = getRowByKeyValue(options.settingData["DYFIELD"], "FIELDNAME", fields[i]["datafield"]);
                        var gridRow = [];
                        gridRow["HEADNAME"] = fields[i]["text"];
                        var value = rowData[fields[i]["datafield"]];
                        //0=字串 1=數字 2=日期(yyyy/MM/dd) 3=日期時間(yyyy/MM/dd HH:mm:ss) 4=comboBox 5=多欄單選(List) 6=CheckBox 12=imageURL 13=URL 
                        if (realField != null && isEmpty(value) == false) {
                            switch (realField["DATATYPE"]) {
                                case 2:
                                    value = formatDateTime(value, "date");
                                    break;
                                case 3:
                                    value = formatDateTime(value, "datetime2");
                                    break;
                            }
                        }
                        gridRow["FIELDVALUE"] = value;
                        data.push(gridRow);
                    }
                }
            }
            else {
                var rowindex = $('#' + options.gridId).jqxGrid('getselectedrowindex');
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]["hidden"] != true && isEmpty(fields[i]["text"]) == false &&
                        fields[i]["text"] != "#") {
                        var gridRow = [];
                        gridRow["HEADNAME"] = fields[i]["text"];
                        var value = $('#' + options.gridId).jqxGrid('getcelltext', rowindex, fields[i]["datafield"]);
                        gridRow["FIELDVALUE"] = value;
                        data.push(gridRow);
                    }
                }
            }
            $('<div id="' + gridId + '"></div>').appendTo($("#" + win.contentId));
            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'HEADNAME', type: 'string' },
                    { name: 'FIELDVALUE', type: 'string' },
                ],
                localdata: data
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#" + gridId).jqxGrid(
            {
                width: "100%",
                height: "99.3%",
                source: dataAdapter,
                enabletooltips: true,
                selectionmode: 'singlecell',
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: options.language.fieldName, datafield: 'HEADNAME', width: 100 },
                  { text: options.language.fieldValue, datafield: 'FIELDVALUE', width: width - 100 - 80 }
                ]
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: 2 });
        }
        catch (err) {
            errorHandle(formName, 'showDetail', err);
        }
    }
    function createBarControl(div, gridId, gridSource, barControl, type) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var buttons = options.settingData.DYMENU.rows;;
            if (buttons == null) { buttons = []; }
            if (buttons.length == 0) {
                return false;
            }

            var bLength = buttons.length;
            var barId = $(div).prop('id');
            if (options.buttonType == 2 || options.buttonType == 5) {
                barId += endStatusbarId;
            }
            else {
                barId += endToolbarId;
            }
            $(barControl).prop('id', barId);
            var buttonsId = barId + "_b";
            if ($('#' + buttonsId).length > 0) {
                for (var i = 0 ; i < bLength; i++) {
                    var btnRow = buttons[i];
                    var childId = buttonsId + '_' + i;
                    if (btnRow["TYPE"] != 1 && $('#' + childId).length > 0) {
                        destroySingleControl({ name: childId, type: "jqxButton" });
                        //$('#' + childId).jqxButton("destroy");
                        options.controls = deleteRowByKeyValue(options.controls, 'name', childId);
                    }
                }
                $('#' + buttonsId).remove();
            }

            $("<div id='" + buttonsId + "'></div>").appendTo($(barControl));
            $("#" + buttonsId).css({
                width: "100%",
                height: options.toolbarHeight,
                background: "white",
                margin: 1
            });
            var buttonWidth = 80;
            var btnCount = 0;
            //if (buttonWidth > dButtonWidth) { buttonWidth = dButtonWidth; }
            for (var i = 0 ; i < bLength; i++) {
                var btnRow = buttons[i];
                var btnId = buttonsId + '_' + i;
                var btn;
                if (btnRow["TYPE"] == 1) {
                    $('<a target="_blank" href="' + btnRow.SQLQUERY + '" id="' + btnId + '" data-pid = "' + i.toString() + '">' + btnRow["CAPTION"] + '</a>').appendTo('#' + buttonsId);
                    $('#' + btnId).css('margin', 1);
                    btnCount += 1;
                }
                else {
                    if (btnRow['EditMode'.toUpperCase()] != 2 && btnRow['EditMode'.toUpperCase()] != 9 &&
                        gridSource[getGridProperties(div, "localdata")].length == 0) {
                        continue;
                    }
                    var img = getEditModeImage(btnRow['EditMode'.toUpperCase()], btnRow['ImageUrl'.toUpperCase()], true);
                    buttonWidth = 10;
                    btn = $('<button style="float:left;" id="' + btnId + '"></button>').appendTo('#' + buttonsId);
                    if (btnRow["CAPTION"] != null) {
                        btn.text(btnRow["CAPTION"]);
                        buttonWidth += btnRow["CAPTION"].lengthB() * 7;
                    }
                    var buttonOption = {
                        theme: options.theme,
                        width: buttonWidth,
                        height: buttonHeight - 6
                    };
                    var bigImg = false;
                    var imgHeight = centerButtonSize - 16;
                    var imgWidth = centerButtonSize - 6;
                    if (options.buttonType == 4 || options.buttonType == 5) {
                        buttonOption.width = centerButtonSize;
                        buttonOption.height = centerButtonSize;
                    }
                    if (img != null) {
                        if (options.buttonType == 4 || options.buttonType == 5) {
                            $.extend(buttonOption, {
                                imgPosition: "center",
                                textPosition: "center",
                                textImageRelation: "imageAboveText"
                            }, img);
                            buttonOption.imgWidth = imgWidth;
                            buttonOption.imgHeight = imgHeight;
                            bigImg = true;
                        }
                        else {
                            //if (btnRow['ImageUrl'.toUpperCase()] != null) {
                            buttonOption.imgWidth = leftImgSize;
                            buttonOption.imgHeight = leftImgSize;
                            //}
                            buttonOption.width = buttonWidth + 20;
                            $.extend(buttonOption, imagePosition, img);
                        }
                    }
                    $('#' + btnId).jqxButton(buttonOption);
                    $('#' + btnId).attr('data-pid', i.toString());
                    if (bigImg == true) {
                        $('#' + btnId).find('span').css('top', imgHeight);
                        $('#' + btnId).find('img').css({
                            'left': (centerButtonSize - imgWidth) / 2 - 1,
                            'top': 1
                        });
                    }
                    if (buttonOption.imgHeight != null) {
                        $('#' + btnId).find("img").css('top', (buttonOption.height - $('#' + btnId).find("img").height()) / 2 - 1);
                    }

                    //2018/07/18 Jacky 增加可改變button style
                    setButtonStyle(div, btnId, btnRow);
                    setButtonTooltip(div, btnId, btnRow);
                    options.controls.push({ name: btnId, type: 'jqxButton', level: 2, isToolbar: true });
                    $('#' + btnId).on('click', btnRow, function (e) {
                        try {
                            if ($(this).jqxButton('disabled') == true) { return; }
                            var data = e.data;
                            var doFlag = true;
                            if (data['EditMode'.toUpperCase()] != 2 && data['EditMode'.toUpperCase()] != 9 &&
                                gridSource[getGridProperties(div, "localdata")].length == 0) {
                                doFlag = false;
                            }
                            if (doFlag == true) {
                                callDetailForm(div, this, buttons);
                            }
                        }
                        catch (err) {
                            errorHandle(formName, 'createToolbar_click', err);
                        }
                    });
                    $('#' + btnId).css('margin', 1);
                    btnCount += 1;
                }
            }
            var e = $.Event("barControlCreated");
            $(div).triggerHandler(e);
            return btnCount;
        }
        catch (err) {
            errorHandle(formName, 'createBarControl', err);
        }
    };
    function getEditModeImage(editMode, imageUrl, otherNoImage) {
        try {
            if (imageUrl != null) {
                return { imgSrc: imageUrl };
            }
            else {
                switch (editMode) {
                    case 0:
                        return imageScr.view;
                        break;
                    case 1:
                        return imageScr.edit;
                        break;
                    case 2:
                        return imageScr.append;
                        break;
                    case 3:
                        return imageScr.delete;
                        break;
                    case 5:
                        return imageScr.print;
                        break;
                    case 9:
                        if (otherNoImage != true) {
                            return imageScr.view;
                        }
                        break;
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'getEditModeImage', err);
        }
    }
    function createButtons(div, gridId) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var buttons;
            if (options.settingData.DYFIELD.rows[0]["ButtonType".toUpperCase()] != 0) {
                buttons = [];
            }
            else {
                buttons = options.settingData.DYMENU.rows;
            }
            var addListButton = 0;
            if (options.listFields.length > 0) { addListButton = 3; }

            if (buttons.length == 0 && addListButton == 0) {
                return false;
            }

            //先將Buttons 清除
            var buttonsId = null;
            for (var i = 0; i < controls.length; i++) {
                if (controls[i].type == 'jqxLinkButton' || controls[i].type == 'jqxButton') {
                    if (controls[i].isButton == true) {
                        destroySingleControl({ name: controls[i].name, type: controls[i].type });
                        //$('#' + controls[i].name)[controls[i].type]('destroy');
                        delete controls[i];
                    }
                }
                else if (controls[i].type == 'buttons') {
                    buttonsId = controls[i].name;
                }
            }
            options.controls = controls.filter(function (e) { return e });
            //再建立Buttons
            if (buttonsId == null) {
                buttonsId = $(div).prop('id') + getUniqueId();
                var buttonDiv = $('<div id="' + buttonsId + '"></div>').appendTo($(div));
                options.controls.push({ name: buttonsId, type: 'buttons' });
                buttonDiv.css('height', buttonHeight);
            }
            else {
                $('#' + buttonsId).children().remove();
            }
            var grid = getGridObject(div);
            var bLength = buttons.length;

            var buttonsWidth = $('#' + buttonsId).width();
            var buttonWidth = Math.floor(buttonsWidth / (bLength + addListButton)) - 2;
            if (buttonWidth > dButtonWidth) { buttonWidth = dButtonWidth; }
            for (var i = 0 ; i < bLength; i++) {
                var btnRow = buttons[i];
                if (grid.source[getGridProperties(div, "localdata")].length > 0 || btnRow['EditMode'.toUpperCase()] == 2 || btnRow['EditMode'.toUpperCase()] == 9) {
                    var btnId = buttonsId + '_' + i;
                    var btn;
                    if (btnRow["TYPE"] == 1) {
                        $('<a target="_blank" href="' + btnRow.SQLQUERY + '" id="' + btnId + '" data-pid = "' + i.toString() + '">' + btnRow["CAPTION"] + '</a>').appendTo('#' + buttonsId);
                        //$('#' + btnId).jqxLinkButton({ width: buttonWidth, height: buttonHeight - 5 });
                        //options.controls.push({ name: btnId, type: 'jqxLinkButton', level: 2 });
                    }
                    else {
                        var img = getEditModeImage(btnRow['EditMode'.toUpperCase()], btnRow['ImageUrl'.toUpperCase()], true);
                        btn = $('<input type="button" style="float:left;" value="' + btnRow["CAPTION"] + '" id="' + btnId + '"/>').appendTo('#' + buttonsId);
                        var buttonOption = {
                            theme: options.theme,
                            width: buttonWidth,
                            height: buttonHeight - 5
                        };
                        //if (btnRow['ImageUrl'.toUpperCase()] != null) {
                        buttonOption.imgWidth = leftImgSize;
                        buttonOption.imgHeight = leftImgSize;
                        //}
                        $('#' + btnId).jqxButton($.extend(buttonOption, imagePosition, img));
                        options.controls.push({ name: btnId, type: 'jqxButton', level: 2, isButton: true });
                        if (buttonOption.imgHeight != null) {
                            $('#' + btnId).find("img").css('top', (buttonOption.height - $('#' + btnId).find("img").height()) / 2 - 1);
                        }
                        $('#' + btnId).attr('data-pid', i.toString());
                        $('#' + btnId).on('click', function () {
                            if ($(this).jqxButton('disabled') == true) { return; }
                            callDetailForm(div, this, buttons);
                        });
                    }
                    $('#' + btnId).css('margin', 1);
                    //2018/07/18 Jacky 增加可改變button style
                    setButtonStyle(div, btnId, btnRow);
                    setButtonTooltip(div, btnId, btnRow);
                    //$('#' + btnId).appendTo('#' + buttonsId);
                }
            }
            //2017/01/09 建立關注清單
            if (options.listFields.length > 0) {
                var btnId = $(div).prop('id') + endButtonListId;
                btn = $('<input type="button"  style="float:left;" value="' + options.language.listFields + '" id="' + btnId + '"/>').appendTo('#' + buttonsId);
                $('#' + btnId).jqxButton({ width: buttonWidth, height: buttonHeight - 5 });
                $('#' + btnId).css('margin', 1);
                options.controls.push({ name: btnId, type: 'jqxButton', level: 2, isButton: true });
                var createList = function () {
                    var tListId = $(div).prop('id') + endTextListId;
                    if ($('#' + tListId).length == 0) {
                        var tableWidth = buttonsWidth - ((buttonWidth + 4) * (bLength + 1)) - 4;
                        $('<table id="' + tListId + '"><tr><td style="background-color:#888888;width:60px;color:#ffffff;text-align:center;" >' + options.language.listName + '</td>' +
                        '<td><textarea id="' + tListId + 'td"></textarea></td>' +
                        '</tr></table>').appendTo('#' + buttonsId);
                    }
                    $('#' + tListId).css({
                        'margin': 1,
                        height: '100%',
                        width: tableWidth
                    });
                    $('#' + tListId + "td").css({
                        width: '99%',
                        height: buttonHeight
                    });
                    var checkRows = getCheckedRows(div);
                    var tValue = [];
                    if (isEmpty($("#" + tListId + "td").text()) != true) {
                        tValue = ($("#" + tListId + "td").text()).split(",");
                    }
                    for (var i = 0 ; i < checkRows.length; i++) {
                        var rValue = checkRows[i][options.listFields[0]];
                        if (tValue.indexOf(rValue.toString()) < 0) {
                            tValue.push(rValue);
                        }
                    }
                    if (tValue.length > 0) {
                        var sortValue = tValue.sort();
                        $("#" + tListId + "td").text(sortValue.join(","));
                    }
                }
                $('#' + btnId).on('click', function () {
                    try {
                        if ($(this).jqxButton('disabled') == true) { return; }
                        var rowData = getCheckedRows(div);
                        if (rowData.length == 0) return;
                        var listValue = sessionStorage.getItem(options.programId + '_addList');
                        //options.listFields
                        createList();
                    }
                    catch (err) {
                        errorHandle(formName, 'createButtons_listField_Click', err);
                    }
                });
            }
            var e = $.Event("buttonCreated");
            $(div).triggerHandler(e);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'createButtons', err);
        }
    };
    function setButtonStyle(div, btnId, btnRow) {
        try {
            if (isEmpty(btnRow["BUTTONSTYLE"]) != true) {
                if (btnRow["BUTTONSTYLE"].indexOf("function") >= 0) {
                    var func = scriptFunction("(" + btnRow["BUTTONSTYLE"] + ")", formName);
                    var value = func(div, btnId, btnRow);
                    if (value != null) {
                        $('#' + btnId).css(JSON.parse(value));
                    }
                }
                else {
                    $('#' + btnId).css(JSON.parse(btnRow["BUTTONSTYLE"]));
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'setButtonStyle', err);
        }
    }
    function setButtonTooltip(div, btnId, btnRow) {
        try {
            if (isEmpty(btnRow["BUTTONTOOLTIP"]) != true) {
                if (btnRow["BUTTONTOOLTIP"].indexOf("function") >= 0) {
                    var func = scriptFunction("(" + btnRow["BUTTONTOOLTIP"] + ")", formName);
                    var value = func(div, btnId, btnRow);
                    if (value != null) {
                        $('#' + btnId).css(JSON.parse(value));
                    }
                }
                else {
                    $('#' + btnId).attr("title", btnRow["BUTTONTOOLTIP"]);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'setButtonTooltip', err);
        }
    }
    //呼叫新的Form
    function callDetailForm(div, item, menuItems, key) {
        try {
            var options = $.data(div, formName).options;
            if (key == null) {
                key = $(item).attr('data-pid');
            }
            var menuItem = menuItems[key];
            var type = menuItem.TYPE;
            var parentId = $(div).prop("id");
            var container = options.childContainer;
            if (container == null) { container = container; }
            if (container == null) { container = div; }
            var args = { item: item, args: menuItem };
            var e1 = $.Event("beforeButtonClick", args);
            $(div).triggerHandler(e1);
            switch (type) {
                case 0: //呼叫i秘書
                    var rowData = getSelectedRow(div);
                    openNewDynamicGrid(div, menuItem, rowData);
                    break;
                case 1:
                    var rowData = getSelectedRow(div);
                    var url = menuItem.SQLQUERY;
                    var caption = menuItem.CAPTION2;
                    if (rowData != null) {
                        for (var i in rowData) {
                            var spliturl = url.split(i);
                            url = spliturl.join(rowData[i]);
                        }
                    }
                    window.open(url, caption, config = 'height=' + height + ',width=' + width);
                    break;
                case 2: //呼叫元件
                    openNewComponent(div, menuItem);
                    break;
                case 3:
                    break;
                case 4:
                    break;
            }
            if (options != undefined && options['onButtonClick'] != undefined) {
                options['onButtonClick'](item, menuItem);
            }
            var args2 = { item: item, args: menuItem };
            var e2 = $.Event("buttonClick", args2);
            $(div).triggerHandler(e2);
        }
        catch (err) {
            errorHandle(formName, 'callDetailForm', err);
        }
    };
    function getChildFormLayout(div, menuItem) {
        try {
            var options = $.data(div, formName).options;
            var width = menuItem.FORMWIDTH;
            var height = menuItem.FORMHEIGHT;
            var container = $(options.container);
            if (container == null) { container = $(div); }
            var dTop = 23;
            var left = 0;
            var top = 0;
            if (width == null || width == 0 || width > $(container).width()) { width = $(container).width(); }
            if (height == null || height == 0 || height > $(container).height()) { height = $(container).height(); }
            left = ($(container).width() - width) / 2;
            top = ($(container).height() - height) / 2;
            //if (position.left > left) left = position.left;
            //var position = $(container).position();
            var winContainer;
            var tabItemContainer;
            if (container.hasClass("jqx-window")) {
                winContainer = $(container);
            }
            else {
                $.each(container.parents(), function (idx, val) {
                    if ($(val).hasClass("jqx-window")) {
                        winContainer = $(val);
                    }
                    else if ($(val).hasClass("jqx-tabs-content-element")) {
                        tabItemContainer = $(val);
                    }
                });
            }
            if (winContainer != null) {
                if ($(winContainer).find('.jqx-window-header').css('display') != "none") {
                    top = dTop;
                }
            }
            else if (tabItemContainer != null) {
                top = tabItemContainer.position().top;
                if (height == $(container).height()) height -= 6;
            }
            return { left: left, top: top, width: width, height: height };
        }
        catch (err) {
            errorHandle(formName, 'getChildFormLayout', err);
            return null;
        }
    };

    function openNewDynamicGrid(div, menuItem, row) {
        try {
            $(div).attr('disabled', true);
            var options = $.data(div, formName).options;
            var parentId = $(div).prop('id') + getUniqueId();
            var windowId = parentId + '_body';
            var dprogramid = menuItem.PROGRAMID;
            var dsysprogramid = menuItem.SYSPROGRAMID;
            var title = menuItem.CAPTION2 + ' [' + menuItem.PROGRAMID + ']';
            var layout = getChildFormLayout(div, menuItem);
            var container = options.container;
            if (!container) { container = div; }
            var img = getEditModeImage(menuItem['EditMode'.toUpperCase()], menuItem['ImageUrl'.toUpperCase()], true);
            showChildWindow(parentId, windowId, container, img, {
                title: title,
                position: {
                    x: layout.left,
                    y: layout.top
                },
                width: layout.width,
                height: layout.height,
                theme: options.theme,
                minContainer: options.minContainer,
                showCollapseButton: options.showCollapseButton,
                initContent: function () {
                    try {
                        var childOptions = cloneJSON({
                            loginInfo: options.loginInfo,
                            container: $('#' + parentId),
                            containerParent: container,
                            tabContainer: options.tabContainer,
                            programId: dprogramid,
                            sysProgramId: dsysprogramid,
                            parameters: options.parameters,
                            parentDataTableName: getDataTableName(menuItem),
                            parentData: getParentData(div, menuItem, row),
                            theme: options.theme,
                            localization: options.localization
                        });
                        $('#' + windowId).dynamicGrid(childOptions);
                        $('#' + windowId).on('loaded', function () {
                            $(div).removeAttr('disabled');
                        });
                        $('#' + parentId).on("resize", function () {
                            $('#' + windowId).dynamicGrid("resize");
                        });
                        options.controls.push({ name: windowId, type: 'dynamicGrid', level: 4 });
                    }
                    catch (err) {
                        errorHandle(formName, 'openNewDynamicGrid_initContent', err);
                    }
                }
            }, {
                'close': function (event) {
                    try {
                        var childOptions = $('#' + windowId).dynamicGrid('options');
                        if (options.isSaved != true) {
                            options.isSaved = childOptions.isSaved;
                        }
                        if (childOptions.isSaved == true) {
                            var e = $.Event("childSaved");
                            $(div).triggerHandler(e);
                            if (options.saveRefresfhData == true) {
                                refreshGrid(div, function () {
                                }, true);
                            }
                        }
                        $('#' + windowId).dynamicGrid('destroy');
                        $('#' + parentId).csWindow('destroy');
                        options.controls = deleteRowByKeyValue(options.controls, 'name', windowId);
                        options.controls = deleteRowByKeyValue(options.controls, 'name', parentId);
                    }
                    catch (err) {
                        errorHandle(formName, 'openNewDynamicGrid_close', err);
                    }
                }
            });
            options.controls.push({ name: parentId, type: 'csWindow', level: 3 });
        }
        catch (err) {
            errorHandle(formName, 'openNewDynamicGrid', err);
        }
    };
    function openNewComponent(div, menuItem, row) {
        try {
            $(div).attr('disabled', true);
            var options = $.data(div, formName).options;
            var parentId = $(div).prop('id') + getUniqueId();
            var windowId = parentId + '_body';
            var dprogramid = menuItem.PROGRAMID;
            var dsysprogramid = menuItem.SYSPROGRAMID;
            var deditMode = menuItem.EDITMODE;
            var drefNo = menuItem.REFNO;
            var htmlName = menuItem.HTMLNAME;
            if (htmlName == null) {
                messageBox(options.language.fileNull);
                return;
            }
            var spHN = htmlName.replace('\\', '/').split('/');
            var objectName = spHN[spHN.length - 1].replace('.js', '');
            var layout = getChildFormLayout(div, menuItem);
            var container = options.container;
            var title = menuItem.CAPTION2 + ' [' + objectName + '] [' + menuItem.PROGRAMID + ']';
            if (!container) { container = div; }
            if (!$.fn[objectName]) {
                messageBox(options.language.fileNotExist.replace("{0}", htmlName));
                return;
            }
            var childParentData;
            var img = getEditModeImage(menuItem['EditMode'.toUpperCase()], menuItem['ImageUrl'.toUpperCase()], true);
            var getChildOptions = function () {
                return cloneJSON({
                    loginInfo: options.loginInfo,
                    container: $('#' + parentId),
                    containerParent: container,
                    tabContainer: options.tabContainer,
                    parentDataTableName: getDataTableName(menuItem),
                    editMode: deditMode,
                    refNo: drefNo,
                    sysProgramId: dsysprogramid,
                    parameters: $.extend({}, options.parameters, options.parentData, childParentData),
                    theme: options.theme,
                    localization: options.localization
                });
            }
            var showForm = (function () {
                showChildWindow(parentId, windowId, container, img, {
                    title: title,
                    position: {
                        x: layout.left,
                        y: layout.top
                    },
                    width: layout.width,
                    height: layout.height,
                    theme: options.theme,
                    minContainer: options.minContainer,
                    hasClosing: (deditMode == 1 || deditMode == 2),
                    showCollapseButton: options.showCollapseButton,
                    initContent: function () {
                        try {
                            //var childOptions = cloneJSON({
                            //    loginInfo: options.loginInfo,
                            //    container: $('#' + parentId),
                            //    containerParent: container,
                            //    tabContainer: options.tabContainer,
                            //    parentDataTableName: getDataTableName(menuItem),
                            //    editMode: deditMode,
                            //    refNo: drefNo,
                            //    sysProgramId: dsysprogramid,
                            //    parameters: $.extend({}, options.parameters, options.parentData, childParentData),
                            //    theme: options.theme,
                            //    localization: options.localization
                            //});
                            var childOptions = getChildOptions();
                            $('#' + windowId)[objectName](childOptions);
                            $('#' + windowId).on('loaded', function () {
                                $(div).removeAttr('disabled');
                            });
                            options.controls.push({ name: windowId, type: objectName, level: 4 });
                        }
                        catch (err) {
                            errorHandle(formName, 'openNewComponent_initContent', err);
                        }
                    }
                }, {
                    'close': function (event) {
                        try {
                            var childOptions = $('#' + windowId)[objectName]('options');
                            if (options.isSaved != true) {
                                options.isSaved = childOptions.isSaved;
                            }
                            if (childOptions.isSaved == true) {
                                var e = $.Event("childSaved");
                                $(div).triggerHandler(e);
                                if (objectName == "dynamicConditionSave") {
                                    insertChildData(div, deditMode, childOptions);
                                }
                                else {
                                    if (options.saveRefresfhData == true) {
                                        refreshGrid(div, function () {
                                        }, true);
                                    }
                                }
                            }

                            $('#' + windowId)[objectName]('destroy');
                            $('#' + parentId).csWindow('destroy');
                            options.controls = deleteRowByKeyValue(options.controls, 'name', windowId);
                            options.controls = deleteRowByKeyValue(options.controls, 'name', parentId);
                        }
                        catch (err) {
                            errorHandle(formName, 'openNewComponent_close', err);
                        }
                    }
                });

                options.controls.push({ name: parentId, type: 'csWindow', level: 3 });
            });
            var methodName;
            var rowData;
            //0=顯示,1=修改,2=新增,3=刪除,5=列印
            switch (deditMode) {
                case 0:
                    methodName = 'canView';
                    rowData = getSelectedRow(div);
                    break;
                case 1:
                    methodName = 'canEdit';
                    rowData = getSelectedRow(div);
                    if (options.editMode == editMode.view && objectName == "dynamicConditionSave") {
                        return;
                    }
                    break;
                case 2:
                    methodName = 'canAppend';
                    if (options.editMode == editMode.view && objectName == "dynamicConditionSave") {
                        return;
                    }
                    break;
                case 3:
                    methodName = 'canDelete';
                    rowData = getSelectedRow(div);
                    if (objectName == "dynamicConditionSave") {
                        if (options.editMode != editMode.view) {
                            deleteChildData(div);
                        }
                        return;
                    }
                    break;
                case 5:
                    methodName = 'canPrint';
                    printGo(div, dsysprogramid, function (r) {
                    });
                    return;
                    break;
                default:
            }
            childParentData = getParentData(div, menuItem, rowData);
            if (methodName != null) {
                var childInData = cloneJSON($.extend({}, options.loginInfo, childParentData));
                $.fn[objectName](methodName, childInData, function (r) {
                    delete childInData;
                    if (r[0] == true) {
                        if (objectName == "dynamicCustViewTab") {
                            var childOptions = getChildOptions();
                            $.fn[objectName](childOptions);
                        }
                        else {
                            showForm();
                        }
                    }
                    else if (r[1] != null) {
                        messageBox(r[1]);
                    }
                }, options);
            }
            else {
                if (objectName == "dynamicCustViewTab") {
                    var childOptions = getChildOptions();
                    $.fn[objectName](childOptions);
                }
                else {
                    showForm();
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'openNewComponent', err);
        }
    };
    function deleteChildData(div) {
        try {
            var options = $.data(div, formName).options;
            var keys = Object.keys(options.settingData);
            options.settingData[keys[0]].rows.splice(options.selectedRowIndex, 1);
            refreshData(div, options.settingData[keys[0]]);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'deleteChildData', err);
        }
    }
    function insertChildData(div, em, childOptions) {
        try {
            if (em == editMode.view) { return; }
            var options = $.data(div, formName).options;
            var saveData = childOptions['saveData'];
            var rows = saveData[Object.keys(saveData)[0]].rows;
            var rLength = rows.length;
            var keys = Object.keys(options.settingData);
            var dataCol = options.settingData[keys[0]].columns;
            var dcLength = dataCol.length;
            var dataRow = {};
            if (em == editMode.edit) {
                dataRow = options.settingData[keys[0]].rows[options.selectedRowIndex];
            }
            else {
                options.settingData[keys[0]].rows.push(dataRow);
            }
            var fields = options.settingData["DYFIELD"].rows;
            for (var i = 0; i < dcLength; i++) {
                for (var j = 0; j < rLength; j++) {
                    //檢核資料重複
                    if (checkDataDup(fields, rows[j]) != true) {
                        if (dataCol[i]['name'] == rows[j]['FIELDNAME'].toUpperCase().substr(0, rows[j]['FIELDNAME'].length - 2)) {
                            dataRow[dataCol[i]['name']] = changeValueToNumber(rows[j]['FIELDVALUE'], dataCol[i]['type']);
                        }
                    }
                    if (dataCol[i]['name'] == rows[j]['FIELDNAME'].toUpperCase().substr(0, rows[j]['FIELDNAME'].length - 2) + "_DESC") {
                        dataRow[dataCol[i]['name']] = changeValueToNumber(rows[j]['FIELDDESC'], dataCol[i]['type']);
                    }
                }
            }
            refreshData(div, options.settingData[keys[0]], true);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'insertChildData', err);
        }
    }
    function checkDataDup(fields, dataRow) {
        try {
            return false;
        }
        catch (err) {
            errorHandle(formName, 'checkDataDup', err);
        }
    }
    function changeValueToNumber(value, type) {
        try {
            if (isEmpty(value)) { return value; }
            if (type.substr(0, 3) == 'int') {
                return Number(value);
            }
            else {
                return value;
            }
        }
        catch (err) {
            errorHandle(formName, 'changeValueToNumber', err);
        }
    }
    function printGo(div, sysProgramId, action) {
        try {
            var options = $.data(div, formName).options;
            disableAll(div, true);
            $(div).dynLinkProgram("executeByProgramId", options, 1, sysProgramId, options.conditionData, function (r) {
                disableAll(div, false);
                action(r);
            });
        }
        catch (err) {
            alert(err);
        }
    }
    function getDataTableName(menuItem) {
        var datatablename = menuItem.DATATABLENAME;
        if (datatablename == null) { datatablename = 'dataTable1'; }
        return datatablename;
    }
    function getParentData(div, menuItem, row) {
        try {
            var options = $.data(div, formName).options;
            var keys = Object.keys(options.settingData);
            var datatablename = getDataTableName(menuItem);
            var table = {};
            table[datatablename] = { columns: cloneJSON(options.settingData[keys[0]].columns), rows: [] };
            if (row != null) {
                table[datatablename].rows.push(cloneJSON(row));
            }
            else {
                if (options.parentData != null && Object.keys(options.parentData).length > 0) {
                    var keys2 = Object.keys(options.parentData);
                    if (keys2.length > 0) {
                        var pTable = options.parentData[keys2[keys2.length - 1]];
                        table[datatablename].rows.push(cloneJSON(pTable.rows[0]));
                    }
                }
                else {
                    var keys2 = Object.keys(options.parameters);
                    if (keys2.length > 0) {
                        var pTable = options.parameters[keys2[keys2.length - 1]];
                        table[datatablename].rows.push(cloneJSON(pTable.rows[0]));
                    }
                }
            }
            if (getCanChoose(div) == true) {
                table[datatablename + '_checkedRows'.toUpperCase()] = { columns: cloneJSON(options.settingData[keys[0]].columns), rows: getCheckedRows(div) };
            }
            table[datatablename + "_ALL"] = { columns: cloneJSON(options.settingData[keys[0]].columns), rows: getRows(div) };
            for (var i = 0 ; i < options.settingData["DYFIELD"].rows.length; i++) {
                for (var j = 0; j < table[datatablename + "_ALL"].columns.length; j++) {
                    if (options.settingData["DYFIELD"].rows[i]["FIELDNAME"].toUpperCase() == table[datatablename + "_ALL"].columns[j]["name"]) {
                        table[datatablename + "_ALL"].columns[j]["isPK"] = (options.settingData["DYFIELD"].rows[i]["ISPK"] == 1);
                    }
                }
            }
            //如果有清單
            if ($("#" + $(div).prop('id') + endTextListId + "td").length > 0) {
                var lValue = $("#" + $(div).prop('id') + endTextListId + "td").text();
                if (isEmpty(lValue) != true) {
                    var listRows = [];
                    table[datatablename + '_LIST'] = { columns: [{ name: options.listFields[0], type: "string" }], rows: listRows };
                    var lRow = {};
                    lRow[options.listFields[0]] = lValue;
                    listRows.push(lRow);
                    //var arrValue = lValue.split(",");
                    //var listRows = [];
                    //table[datatablename + '_LISTROWS'] = { columns: cloneJSON(options.settingData[keys[0]].columns), rows: listRows };
                    //for (var i = 0; i < arrValue.length; i++) {
                    //    var lRow = {};
                    //    lRow[options.listFields[0]] = arrValue[i];
                    //    listRows.push(lRow);
                    //}
                }

            }
            return table;
        }
        catch (err) {
            errorHandle(formName, 'getParentData', err);
        }
    };
    function showChildWindow(parentId, windowId, container, img, opts, events) {
        try {
            $('<div id="' + parentId + '"><div></div><div id="' + windowId + '"></div></div>').appendTo(container);
            if (img != null) {
                var header = $($("#" + parentId).children()[0]);
                var imgSize = 18;
                $("<img width='" + imgSize + "' heigth='" + imgSize + "' src='" + img.imgSrc + "' alt='' style='margin-right: 5px;float:left;'/><span style='float:left;margin-top:2px;'>" + opts.title + "</span>").appendTo(header);
                delete opts.title;
            }
            var winOptions = $.extend({}, {
                minHeight: 100,
                minWidth: 200,
                maxWidth: $(container).innerWidth(),
                maxHeight: $(container).innerHeight(),
            }, opts);
            $('#' + parentId).csWindow(winOptions);
            //$('#' + parentId).csWindow({ width: 200, height: 100, title: '123' });
            if (events) {
                var keys = Object.keys(events);
                for (var i = 0; i < keys.length; i++) {
                    $('#' + parentId).on(keys[i], events[keys[i]]);
                }
            }
            $('#' + parentId).appendTo($(container));
            if (img != null) {
                $('#' + parentId).find(".jqx-window-header").css({
                    "padding-top": 3,
                    "padding-bottom": 3
                });
            }
            return true;
        }
        catch (err) {
            return false;
            errorHandle(formName, 'showChildWindow', err);
        }
    };
    //取得Grid Data
    function getGridData(div, data, pageNumber, pageCounts) {
        try {
            var options = $.data(div, formName).options;
            var tablename;
            //var data = jQuery.extend({}, parentData);
            var keys = Object.keys(data);
            tablename = keys[0];

            if (pageCounts == null) {
                pageCounts = data[tablename].rows.length;
            }
            var realdata = [];
            for (var i = 0; i < pageCounts; i++) {
                var j = (pageNumber - 1) * pageCounts + i;
                if (j >= data[tablename].length) { break; }
                realdata[i] = data[tablename].rows[j];
                //if (options.isTree == true) {
                //    realdata[i]['rowNumberItem'] = i + 1;
                //}
                //if (isTree == true) {
                //    var treePKeyValue = data[tablename][j][data.DYFIELD[0].TREEPARENTKEYFIELD];
                //    var treeKeyValue = data[tablename][j][data.DYFIELD[0].TREEKEYFIELD];
                //    if ((treePKeyValue != treeKeyValue) && (treePKeyValue != null)) {
                //        for (var x = 0; x < realdata.length; x++) {
                //            if (realdata[x][data.DYFIELD[0].TREEKEYFIELD] == treePKeyValue) {
                //                realdata[i]["_parentId"] = treePKeyValue;
                //            }
                //        }
                //    }
                //}
            }
            return realdata;
        }
        catch (err) {
            errorHandle(formName, "getGridData", err);
        }
    };
    //取得Grid Columns
    function getGridColumns(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var j = [];
            var deffields = settingData.DYFIELD;
            var tablenames = Object.keys(settingData);
            var dataFields = cloneJSON(settingData[tablenames[0]].columns);
            options.PKFields = [];

            //新增一個rownumber column
            var AlternateRowBackground = null;
            var nocellsrenderer = function (row, column, value, defaulthtml, columnproperties) {
                return '<div style= "margin:4px;" class="jqx-grid-cell-' + columnproperties.cellsalign + '-align">' + (value + 1) + '</div>';;
            };
            if (deffields.length > 0) {
                AlternateRowBackground = deffields[0].ALTERNATEROWBACKGROUND;
                if (AlternateRowBackground != null) {
                    var varback = getColorValue(AlternateRowBackground, true);
                    nocellsrenderer = function (row, column, value, defaulthtml, columnproperties) {
                        if (row % 2 == 1) {
                            return '<div style="' + varback + 'width: 100%; height: 100%"><span class="jqx-grid-cell-' + columnproperties.cellsalign + '-align" style="margin-top: 4px; float: ' + columnproperties.cellsalign + ';">' + (value + 1) + '</span></div>';
                        }
                        else {
                            return '<div style= "margin:6px;" class="jqx-grid-cell-' + columnproperties.cellsalign + '-align">' + (value + 1) + '</div>';;
                        }
                    };
                }
            }
            var datafieldName;
            var cellsalignName;
            var cellsformatName;
            var cellclassnameName;
            var cellcolumntype;
            var cellsrenderer;
            var filterTypeName;
            var filterCondition;
            if (options.isTree == false) {
                if (options.showRowNumber != false) {
                    j.push(getGridRowNumberColumn(null, 30, null, endRowNoId));
                }
                if (getCanChoose(div)) {
                    dataFields.push({ name: chooseFieldName, type: 'boolean' });
                    j.push(getGridCheckBoxColumn(options.gridId, chooseFieldName, null, options.theme));
                }
                datafieldName = "datafield";
                cellsalignName = "cellsalign";
                cellsformatName = "cellsformat";
                cellclassnameName = "cellclassname";
                cellcolumntype = "columntype";
                cellsrenderer = "cellsrenderer";
                filterTypeName = "filtertype";
                filterCondition = "filtercondition";
            }
            else {
                if (options.showRowNumber != false) {
                    //j.push(getGridRowNumberColumn(null, 30));
                }
                datafieldName = "dataField";
                cellsalignName = "cellsAlign";
                cellsformatName = "cellsFormat";
                cellclassnameName = "cellClassName";
                cellcolumntype = "columnType";
                cellsrenderer = "cellsRenderer";
                filterTypeName = "filterType";
                filterCondition = "filterCondition";
            }

            var cellclassnamesStr = [];
            var rows = deffields.rows;
            var pivotGrid = rows[0]['pivotGrid'.toUpperCase()];
            var comparisonFields = rows[0]['ComparisonField'.toUpperCase()];
            //messageBox(JSON.stringify(rows));
            if (rows[0]["FIELDNAME"].toUpperCase() == "ALL") {
                var canEdit = getRowByKeyValue(dataFields, "name", "ROWID") != null;
                for (var i = 0; i < dataFields.length; i++) {
                    var n = {};
                    n[datafieldName] = dataFields[i]["name"];
                    n["text"] = dataFields[i]["name"];
                    n["width"] = dataFields[i]["name"].length * 13;
                    var columntype = "textbox";
                    switch (dataFields[i]["type"]) {
                        case "number":
                        case "integer": case "int32": case "int64":
                        case "decimal":
                            columntype = "number";
                            n["align"] = "right";
                            n[cellsalignName] = "right";
                            break;
                        case "date": case "datetime":
                            columntype = "datetime2";
                            n["align"] = "center";
                            n[filterTypeName] = 'date';
                            n[filterCondition] = "equal";
                            n[cellsalignName] = "center";
                            n[cellsformatName] = "yyyy/MM/dd HH:mm:ss";
                            break;
                    }
                    n["editable"] = canEdit;
                    if (canEdit) {
                        $.extend(n, createEditCell(div, formName, options.gridId, n[datafieldName], columntype));
                    }
                    options.editable = true;
                    j.push(n);
                }
                return [j, dataFields];
            }
            else {
                for (var key in rows) {
                    var fieldname = rows[key].FIELDNAME;
                    var headname = rows[key].HEADNAME;
                    var datatype = rows[key].DATATYPE;
                    var formatstring = rows[key].FORMATSTRING;
                    var alignment = rows[key].ALIGNMENT;
                    var fontcolor = rows[key].FONTCOLOR;
                    var changevalue = rows[key].CHANGEVALUE;
                    var fieldwidth = rows[key].FIELDWIDTH;
                    var aggregates = rows[key].AGGREGATES;
                    var frozen = rows[key].FROZEN;
                    var privMask = rows[key].PRIVMASK;
                    var editable = rows[key].EDITABLE;
                    var toolTip = rows[key]['ToolTip'.toUpperCase()];
                    var lProgramId = rows[key]['lProgramId'.toUpperCase()];
                    var dataLength = rows[key]['dataLength'.toUpperCase()];
                    //                    alert(JSON.stringify(fieldname);
                    if (editable == 1) {
                        options.editable = true;
                    }
                    var n = {};
                    if (rows[key].LISTFIELD == 1) {
                        options.listFields.push(fieldname.toString().toUpperCase());
                    }
                    if (rows[key]["ISPK"] == 1) {
                        options.PKFields.push(rows[key]);
                    }
                    if (pivotGrid == 1 && comparisonFields != null) {
                        if (comparisonFields.toUpperCase().indexOf(fieldname.toString().toUpperCase()) < 0) {
                            continue;
                        }
                        var splitValue = comparisonFields.split(',');
                        for (var i = 0 ; i < splitValue.length; i++) {
                            var splitValueField = splitValue[i].split('=');
                            if (splitValueField[0].trim().toUpperCase() == fieldname.toUpperCase()) {
                                n[datafieldName] = fieldname.toString().toUpperCase();
                                n["text"] = splitValueField[1].trim();
                            }
                        }
                    }
                    else {
                        n[datafieldName] = fieldname.toString().toUpperCase();
                        n["text"] = headname;
                    }
                    n["sortable"] = true;
                    n['editable'] = false;
                    if (frozen == 1) { n['pinned'] = true; }
                    if (alignment != null) {
                        switch (alignment) {
                            case 1:
                                n["align"] = "right";
                                n[cellsalignName] = "right";
                                break;
                            case 2:
                                n["align"] = "center";
                                n[cellsalignName] = "center";
                                break;
                            default:
                                n["align"] = "left";
                                n[cellsalignName] = "left";
                        }
                    }
                    var fieldType = "string";
                    var imageURL = null;
                    var url = null;
                    //0=字串 1=數字 2=日期(yyyy/MM/dd) 3=日期時間(yyyy/MM/dd HH:mm:ss)
                    switch (datatype) {
                        case 2:
                            if (formatstring != null) {
                                n[cellsformatName] = formatstring;
                            }
                            else {
                                n[cellsformatName] = "yyyy/MM/dd";
                            }
                            fieldType = "date";
                            n[filterTypeName] = 'date';

                            //2017/09/22 Jacky add 可編輯
                            if (editable == 1) {
                                $.extend(n, createEditCell(div, formName, options.gridId, n[datafieldName], "date"));
                            }
                            break;
                        case 3:
                            if (formatstring != null) {
                                n[cellsformatName] = formatstring;
                            }
                            else {
                                n[cellsformatName] = "yyyy/MM/dd HH:mm:ss";
                            }
                            fieldType = "date";
                            n[filterTypeName] = 'date';

                            //2017/09/22 Jacky add 可編輯
                            if (editable == 1) {
                                $.extend(n, createEditCell(div, formName, options.gridId, n[datafieldName], "datetime2"));
                            }
                            break;
                        case 1:
                            //"d" - decimal numbers. 
                            //"f" - floating-point numbers. 
                            //"n" - integer numbers. 
                            //"c" - currency numbers. 
                            //"p" - percentage numbers. 
                            if (formatstring != null) {
                                switch (formatstring.substring(0, 1)) {
                                    case 'd':
                                    case 'f':
                                    case 'n':
                                    case 'c':
                                    case 'p':
                                        n[cellsformatName] = formatstring;
                                        break;
                                }
                            }
                            fieldType = "number";
                            if (editable == 1) {
                                $.extend(n, createEditCell(div, formName, options.gridId, n[datafieldName], "number", dataLength));
                            }
                            break;
                        case 12:         //imageURL
                            imageURL = "1";
                            break;
                        case 13:         //url
                            url = "1";
                            n[cellsrenderer] = function (row, columnfield, value, defaulthtml, columnproperties) {
                                try {
                                    if (isEmpty(value) != true) {
                                        var tValue = $('<a href="' + value + '" target="_blank" download>' + options.language.btnDownloadFile + "</a>");
                                        var d = $(defaulthtml).text("");
                                        d.append(tValue);
                                        return $(d)[0].outerHTML;
                                    }
                                    else {
                                        return "";
                                    }
                                }
                                catch (err) {
                                    errorHandle(formName, 'cellsrenderer', err);
                                }
                            }
                            break;
                        case 4:             //combobox
                            if (editable == 1) {
                                $.extend(n, createEditCell(div, formName, options.gridId, n[datafieldName], "combobox", null, options["SOURCE_" + datafieldName]));
                            }
                            break;
                        case 5:             //csList
                            if (editable == 1) {
                                var codeRow = getRowByKeyValue(dataFields, "name", n[datafieldName] + "_CODE");
                                var codeField = rows[key - 1].FIELDNAME;
                                if (codeRow != null) {
                                    codeField = n[datafieldName] + "_CODE";
                                }
                                $.extend(n, createEditCell(div, formName, options.gridId, n[datafieldName], "csList", null, options["SOURCE_" + datafieldName], codeField));
                            }
                            break;
                        case 6:
                        case 7:
                            if (options.isTree == true) {
                                fieldType = "number";
                                n[cellsrenderer] = function (rowKey, field, value, data) {
                                    return treeGridCheckColumnRender(rowKey, field, value, data, options.theme);
                                };
                            }
                            else {
                                n[cellcolumntype] = "checkbox";
                                if (editable == 1) {
                                    $.extend(n, createEditCell(div, formName, options.gridId, n[datafieldName], "checkbox"));
                                }
                            }
                            break;
                        default:
                            if (editable == 1) {
                                $.extend(n, createEditCell(div, formName, options.gridId, n[datafieldName], "text", dataLength));
                            }
                    }
                    for (var i = 0; i < dataFields.length; i++) {
                        if (dataFields[i]['name'] == n[datafieldName]) {
                            dataFields[i]['type'] = fieldType;
                        }
                    }
                    if (fieldwidth != null && fieldwidth > 0) {
                        var val = Number(fieldwidth);
                        val = Math.round(val / 10) * 10;
                        n["width"] = val;
                    }
                    else if (fieldwidth < 0) {
                        n["width"] = 60;
                        n["hidden"] = true;
                    }
                    else {
                        n["width"] = 60;
                    }
                    if (isEmpty(url) == true && n[cellcolumntype] != "checkbox") {
                        //get styler
                        var funcchangevalue = createColumnRender(div, n[datafieldName], changevalue, privMask, n["align"], toolTip, (lProgramId != null), url, imageURL);
                        if (funcchangevalue != null) {
                            //alert(funccolor);
                            n[cellsrenderer] = funcchangevalue;
                        }

                        var retStyler = createColumnStyler(div, fontcolor, AlternateRowBackground, key);
                        if (retStyler != null) {
                            n[cellclassnameName] = retStyler[0];
                            for (var i = 0; i < retStyler[1].length; i++) {
                                if (cellclassnamesStr.indexOf(retStyler[1][i]) < 0) {
                                    cellclassnamesStr.push(retStyler[1][i]);
                                }
                            }
                        }
                        if (aggregates != null) {
                            var aggAB = aggregates.split("::");
                            var aggArray = aggAB[0].split('\r\n');
                            var jObj = [];
                            $.each(aggArray, function (idx, val) {
                                var jObjArray = val.split(':');
                                var temp = {};
                                if (jObjArray[1] == null) {
                                    temp[jObjArray[0]] = null;
                                }
                                else {
                                    temp[jObjArray[0]] = scriptFunction('(' + jObjArray[1] + ')', formName);
                                }
                                jObj.push(temp);
                            });
                            n["aggregates"] = jObj;
                            if (aggAB.length > 1) {
                                if (aggAB[1] != null) {
                                    n["aggregatesRenderer"] = scriptFunction("(" + aggAB[1] + ")", formName);
                                }
                            }
                        }
                    }
                    j.push(n);
                }
                var styles = $(div).prop('id') + getUniqueId();
                $('<style id = "' + styles + '">' + cellclassnamesStr.join("") + '</style>').appendTo('head');
                options.styles.push({ name: styles });
                return [j, dataFields];
            }
        }
        catch (err) {
            errorHandle(formName, "getGridColumns", err);
        };
        //改變欄位的內容
        function createColumnRender(div, field, changevalue, privMask, align, toolTip, isLeftButton, url, imageURL) {
            try {
                var options = $.data(div, formName).options;
                //background-color:pink;
                var funcStr = [];
                if (changevalue != null || privMask != null || isEmpty(toolTip) == false || isLeftButton || url != null || imageURL != null) {
                    if (options.isTree == true) {
                        funcStr.push('(function (row, column, value, rowData) {');
                        funcStr.push("var options = $.data($('#" + $(div).prop("id") + "')[0], formName).options;");
                        funcStr.push("var dHTML = $('<div>' + value + '</div>');");
                    }
                    else {
                        funcStr.push('(function (row, column, value, defaulthtml, columnproperties) {');
                        funcStr.push("var options = $.data($('#" + $(div).prop("id") + "')[0], formName).options;");
                        funcStr.push("var dHTML = $(defaulthtml);");
                    }
                    funcStr.push("var tvalue = $(dHTML).html();");
                    funcStr.push("if (isEmpty(tvalue)) return;");
                    funcStr.push("if (!tvalue) {tvalue = value;}");
                    funcStr.push("var changevalue = false;");
                    //'<img style="margin-left: 5px;" height="60" width="50" src="../../images/' + value + '"/>'
                    if (changevalue != null) {
                        var vchangevalue = getCellChangeValue(div, changevalue, false)[0].join(String.fromCharCode(13) + String.fromCharCode(10));
                        funcStr.push(vchangevalue);
                        funcStr.push("changevalue = true;");
                    }
                    if (privMask != null) {
                        funcStr.push('var privMask = "' + privMask + '";');
                        funcStr.push('if (' + privMask.replace(/#|%/g, "").length + ' >= tvalue.length) {privMask = "' + privMask.replace(/#|%/g, "") + '";}');
                        funcStr.push('var maskValue = "";');
                        funcStr.push('var j = 0;');
                        funcStr.push('for (var i = 0 ; i < privMask.length; i++) {');
                        funcStr.push('    if (i >= tvalue.length) {break;};');
                        funcStr.push('    if (privMask.substr(i, 1) == "0") {');
                        funcStr.push('        maskValue = maskValue + tvalue.substr(j, 1);');
                        funcStr.push('    }');
                        //全開
                        funcStr.push('    else if (privMask.substr(i, 1) == "%") {');
                        funcStr.push('      var ll = tvalue.length - privMask.length + 1;');
                        funcStr.push('      if (ll>0) {');
                        funcStr.push('          maskValue = maskValue + tvalue.substr(j,ll);');
                        funcStr.push('          j+=(ll-1);');
                        funcStr.push('      }');
                        //funcStr.push('      if (i == privMask.length - 1) {');
                        //funcStr.push('          maskValue = maskValue + tvalue.substr(i);');
                        //funcStr.push('          break;');
                        //funcStr.push('      }');
                        //funcStr.push('      else {');
                        //funcStr.push('          var ll = tvalue.length - privMask.length + 1;');
                        //funcStr.push('          maskValue = maskValue + tvalue.substr(i,ll);');
                        //funcStr.push('      }');
                        funcStr.push('    }');
                        //全遮
                        funcStr.push('    else if (privMask.substr(i, 1) == "#") {');
                        funcStr.push('      var ll = tvalue.length - privMask.length + 1;');
                        funcStr.push('      if (ll>0) {');
                        funcStr.push('          maskValue = maskValue + "*".repeat(ll);');
                        funcStr.push('          j+=(ll-1);');
                        funcStr.push('      }');
                        funcStr.push('    }');
                        funcStr.push('    else {');
                        funcStr.push('        maskValue = maskValue + privMask.substr(i, 1);');
                        funcStr.push('    }');
                        funcStr.push('    j+=1;');
                        funcStr.push('}');
                        funcStr.push('if (tvalue.length > maskValue.length) {');
                        funcStr.push('    maskValue = maskValue + tvalue.substr(privMask.length);');
                        funcStr.push('}');
                        funcStr.push('else {');
                        funcStr.push('    maskValue = maskValue.substr(0,tvalue.length);');
                        funcStr.push('}');
                        funcStr.push('tvalue = maskValue;');
                        funcStr.push('changevalue = true;');
                    }
                    if (toolTip != null || isLeftButton || imageURL != null || url) {
                        funcStr.push('changevalue = true;');
                    }
                    funcStr.push('if (changevalue==true) {');
                    var style = "";
                    funcStr.push('var htmlValue = $(dHTML);');
                    //2017/04/05 Jacky 
                    if (isEmpty(toolTip) != true) {
                        if (options.isTree == true) {
                            //funcStr.push("var rowData = $('#' + options.gridId).jqxTreeGrid('getRowData',row);");
                        }
                        else {
                            funcStr.push("var rowData = $('#' + options.gridId).jqxGrid('getrowdata',row);");
                        }
                        options[field + '_toolTip'] = toolTip;
                        funcStr.push("htmlValue.attr('title', getReplaceRowValue(rowData,options." + field + "_toolTip)); ");
                    }
                    if (isLeftButton == true) {
                        funcStr.push("htmlValue=$('<u style=\"cursor:pointer;\"></u>');");
                        funcStr.push("var leftHTML=$(dHTML);");
                        funcStr.push("leftHTML.text(tvalue);");
                        funcStr.push("htmlValue.append(leftHTML); ");
                        //funcStr.push("htmlValue=aa; ");
                    }
                    else {
                        if (isEmpty(toolTip) == true) {
                            funcStr.push('htmlValue.attr("title",tvalue);');
                        }
                        funcStr.push('htmlValue.text(tvalue);');
                    }
                    funcStr.push('return $(htmlValue)[0].outerHTML;');
                    funcStr.push('}');

                    funcStr.push('})');
                    //messageBox(funcStr.join(String.fromCharCode(13) + String.fromCharCode(10)));
                    var func = scriptFunction(funcStr.join(String.fromCharCode(13) + String.fromCharCode(10)), formName);
                    deleteJSONObject(funcStr);
                    return func;
                }
                    //else if (options.isTree == true) {
                    //    //2018/04/10 Jacky 
                    //    return function (row, column, value, rowData, f1, f2, f3) {
                    //        var dHTML = $('<div title="' + value + '">' + value + '</div>');
                    //        return $(dHTML)[0].outerHTML;
                    //    }
                    //}
                else {
                    funcStr.push('(function (row, column, value, defaulthtml, columnproperties) {');
                    funcStr.push("var dHTML = $(defaulthtml);");
                    var func = function (row, column, value, defaulthtml, columnproperties) {
                        var htmlValue = $(defaulthtml);
                        htmlValue.attr("title", htmlValue.text());
                        return $(htmlValue)[0].outerHTML;
                    }
                    deleteJSONObject(funcStr);
                    return func;
                }
            }
            catch (err) {
                errorHandle(formName, "createColumnRender", err);
            }
        }
        //設定欄位Styler
        function createColumnStyler(div, fontcolor, AlternateRowBackground, idxcol) {
            try {
                //background-color:pink;
                var options = $.data(div, formName).options;
                var funcStr = [];
                var classnames = [];
                var idxclass = 0;
                if (fontcolor != null || AlternateRowBackground != null) {
                    funcStr = ['(function (row, column, value, data) {'];
                    funcStr.push('var tvalue = value;');
                    funcStr.push('var rvalue = "";');
                    if (AlternateRowBackground != null) {
                        funcStr.push(' if (row % 2 == 1) {');
                        var varback = getColorValue(AlternateRowBackground, true);
                        //.yellowCell{background-color: yellow;}
                        var classname = $(div).prop('id') + getUniqueId();
                        classnames.push("." + classname + "{" + varback + "}");
                        funcStr.push(' rvalue += " ' + classname + '";');
                        funcStr.push('}');
                    }
                    if (fontcolor != null) {
                        var retValue = getCellChangeValue(div, fontcolor, true, idxcol);
                        classnames = retValue[1];
                        var vfontcolor = retValue[0].join(String.fromCharCode(13) + String.fromCharCode(10));
                        funcStr.push(vfontcolor);
                    }
                    funcStr.push('if (rvalue != null) {');
                    funcStr.push('return rvalue.trim(); ');
                    funcStr.push('}');
                    funcStr.push('})');
                }

                if (funcStr.length > 0) {
                    var func = scriptFunction(funcStr.join(String.fromCharCode(13) + String.fromCharCode(10)), formName);
                    deleteJSONObject(funcStr);
                    return [func, classnames];
                }
                else { return null; }
            }
            catch (err) {
                errorHandle(formName, "createColumnStyler", err);
            }
        }

        function getCellChangeValue(div, iValue, isColor) {
            try {
                var Value = iValue.toString();
                var ValueSplit = Value.split(",");
                var funcValueStr = [];
                var field = "rvalue";
                var classnames = [];
                if (isColor == false) {
                    field = "tvalue";
                }
                var mustdo = true;

                if (ValueSplit.length == 1) {
                    var ValueParaSplit = Value.split("=");
                    mustdo = false;
                    if (ValueParaSplit.length == 1) {
                        var val = getCellClassName(div, ValueParaSplit[0], isColor);
                        classnames.push(val[1]);
                        funcValueStr.push(field + ' = "' + val[0] + '";');
                    }
                    else if (ValueParaSplit[0] == "") {
                        var val = getCellClassName(div, ValueParaSplit[1], isColor);
                        classnames.push(val[1]);
                        funcValueStr.push(field + ' = "' + val[0] + '";');
                    }
                    else { mustdo = true; }
                }
                if (mustdo) {
                    for (var i = 0; i < ValueSplit.length; i++) {
                        var ValueParaSplit = ValueSplit[i].split("=");
                        if (ValueParaSplit.length > 1) {
                            // =#FF0000 or =256
                            if (ValueParaSplit[0] == null || ValueParaSplit[0] == undefined || ValueParaSplit[0] == "") {
                                var val = getCellClassName(div, ValueParaSplit[1], isColor);
                                classnames.push(val[1]);
                                if (funcValueStr.length == 0) {
                                    funcValueStr.push(field + ' = "' + val[0] + '";');
                                }
                                else {
                                    funcValueStr.push('else {');
                                    funcValueStr.push(field + ' = "' + val[0] + '";');
                                    funcValueStr.push('}');
                                }
                            }
                                //1=#FF0000 or 1=256
                            else {
                                //alert(ValueParaSplit[0] + ',' + ValueParaSplit[1]);
                                if (funcValueStr.length == 0) {
                                    funcValueStr.push('if (tvalue !=null && tvalue.toString() == "' + ValueParaSplit[0] + '") {');
                                }
                                else {
                                    funcValueStr.push('else if (tvalue !=null && tvalue.toString() == "' + ValueParaSplit[0] + '") {');
                                }
                                var val = getCellClassName(div, ValueParaSplit[1], isColor);
                                classnames.push(val[1]);
                                funcValueStr.push(field + ' = "' + val[0] + '";');
                                funcValueStr.push('}');
                            }
                        }
                        else {
                            funcValueStr.push('else {');
                            var val = getCellClassName(div, ValueParaSplit[0], isColor);
                            classnames.push(val[1]);
                            funcValueStr.push(field + ' = "' + val[0] + '";');
                            funcValueStr.push('}');
                        }
                    }
                }

                return [funcValueStr, classnames];
            }
            catch (err) {
                errorHandle(formName, "getCellChangeValue", err);
            }

        }
        function getCellClassName(div, value, isColor) {
            try {
                if (isColor) {
                    var options = $.data(div, formName).options;
                    var classname = $(div).prop('id') + getUniqueId();
                    var classnames = "." + classname + "{" + getColorValue(value, false) + "}";
                    return [classname, classnames];
                }
                else {
                    return [value, null];
                }
            }
            catch (err) {
                errorHandle(formName, "getCellClassName", err);
            }
        }
        //'background-color:#ffee00;color:red;'
        //{class:'c1',style:'color:red'}
        function getColorValue(value, isbackColor) {
            try {
                if (value.indexOf("#") < 0) {
                    value = Number(value).toString(16);
                }
                else { value = value.substring(1); }
                if (value.length > 6) {
                    value = value.substring(value.length - 6);
                }
                value = '#' + value.toLowerCase();
                if (isbackColor == true) {
                    value = 'background-color:' + value + ';';
                }
                else {
                    value = 'color:' + value + ';';
                }
                return value;
            }
            catch (err) {
                errorHandle(formName, "getColorValue", err);
            }
        }
    };
})(jQuery);