(function ($) {
    var formName = 'dynLinkProgram';
    var riadllName = 'CableSoft.RIA.Dynamic.LinkProgram.Web.dll';
    var riaClassName = 'CableSoft.RIA.Dynamic.LinkProgram.Web.DynLinkProgram';
    var buttonHeight = 24;
    var centerButtonSize = 42;
    var preParameterTableName = "PreParameter";
    $.fn.dynLinkProgram = function (options, param, params2, params3, params4, params5, params6) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, params2, params3, params4, params5, params6);
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
                        options: $.extend({}, new defaults(), new dynLinkProgram(), options)
                    });
                    init(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynLinkProgram', err);
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
        disableAll: function (jq, flag, revertStatus) {
            return jq.each(function () {
                disableAll(this, flag, revertStatus);
            });
        },
        executeProcess: function (jq, options, row, conditionData, action, isPrevious) {
            return buttonClick(jq[0], options, row, conditionData, false, action, isPrevious);
        },
        executeByProgramId: function (jq, options, proType, programId, conditionData, action, isPrevious) {
            return executeByProgramId(jq[0], options, proType, programId, conditionData, action, isPrevious);
        }
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
        this.settingData = [];
        this.parentData = {};
        this.localization = null;
        this.container = null;
        this.showPreviousType = 0;
        this.conditionId = null;
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
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function formDestroy(div) {
        try {
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            if (options == null || options.length == 0) { return; }
            var controls = options.controls;
            destroyControls(controls);
            options.length = 0;
            options = null;
            $.data(div, formName, null);
            //$(div).remove();
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
    function init(div) {
        try {
            var options = $.data(div, formName).options;
            var parentProgramId = options.parentProgramId;
            var settingData = options.settingData;
            addHandlerGetParameters(options.container, options);
            var loaded = (function () {
                if (options['loaded']) {
                    options['loaded']();
                }
                var e = $.Event("loaded");
                $(div).triggerHandler(e);
            });
            if (settingData != null && settingData.length > 0) {
                refresh(div, loaded);
            }
            else {
                if (parentProgramId == null) {
                    messageBox("no parentProgramId!!", messageType.critical);
                    return;
                }
                getLinkProgramId(div, function (flag) {
                    if (flag == true) {
                        refresh(div, loaded);
                    }
                });
            }

        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function getInData(div) {
        try {
            var options = $.data(div, formName).options;
            var data = null;
            if (options.parameters != null && Object.keys(options.parameters).length > 0) {
                data = JSON.stringify(options.parameters);
            }
            else if (options.conditionData != null) {
                var rows = options.conditionData["condition"].rows;
                var table = { columns: [], rows: [{}] };
                for (var i = 0; i < rows.length; i++) {
                    var name = rows[i]["fieldName".toUpperCase()].toUpperCase();
                    table.columns.push({ name: name, type: "string" });
                    table.rows[0][name] = rows[i]["fieldValue".toUpperCase()];
                }
                data = JSON.stringify({ inData: table });
            }
            return data;
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    }
    //取得設定檔內容
    function getLinkProgramId(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var inData = getInData(div);
            var parameters = $.extend({}, paraLoginInfo, {
                parentProgramId: { type: 'string', value: options.parentProgramId },
                showPreviousType: { type: 'integer', value: options.showPreviousType },
                inData: { type: 'string', value: convertToNull(inData) },
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetLinkProgramId',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        if (data.ResultBoolean == true) {
                            options.settingData = JSON.parse(data.ResultXML);
                            action(true);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            action(false);
                        }
                    }
                    catch (err) {
                        errorHandle(formName, 'getSettingData_success', err);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getLinkProgramId', err);
        }
    };
    //更新 Condition Grid
    function refresh(div, action) {
        try {
            var options = $.data(div, formName).options;
            var tables = Object.keys(options.settingData);
            if (tables.length > 0 && options.settingData[tables[0]].rows.length > 0) {
                options.programId = options.settingData[tables[0]].rows[0]['PROGRAMID'];
                //建立按鈕
                createButtons(div);
            }
            action(true);
        }
        catch (err) {
            errorHandle(formName, "refresh", err);
        }
    };
    //建立按鈕
    function createButtons(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;

            var language = options.language;
            var divId = $(div).prop('id');

            var width = Math.floor($('#' + divId).width() / 3);
            if (width > 120) { width = 120; }
            var table = settingData[Object.keys(settingData)[0]];
            for (var i = 0; i < table.rows.length; i++) {
                var btnId = divId + "_" + i.toString();
                var btnRow = table.rows[i];
                if (i == 0) {
                    options.buttonType = btnRow["buttonType".toUpperCase()];
                }
                $('<button id="' + btnId + '">' + btnRow['CAPTION'] + '</button>').appendTo($('#' + divId));
                var height = buttonHeight;
                if (options.buttonHeight != null) height = options.buttonHeight;
                if (options.buttonWidth != null) width = options.buttonWidth;
                var buttonOptions = {
                    width: width,
                    height: height,
                    theme: options.theme
                };
                var img = getEditModeImage(btnRow["editMode".toUpperCase()], btnRow['ImageUrl'.toUpperCase()], true);
                var imgHeight = centerButtonSize - 16;
                var imgWidth = centerButtonSize - 6;
                var bigImg = false;
                if (options.buttonType == 4 || options.buttonType == 5) {
                    $.extend(buttonOptions, {
                        imgPosition: "center",
                        textPosition: "center",
                        textImageRelation: "imageAboveText"
                    }, img);
                    buttonOptions.imgWidth = imgWidth;
                    buttonOptions.imgHeight = imgHeight;
                    buttonOptions.width = centerButtonSize;
                    buttonOptions.height = centerButtonSize;
                    bigImg = true;
                }
                else {
                    $.extend(buttonOptions, imagePosition, img);
                }
                $("#" + btnId).jqxButton(buttonOptions);
                $("#" + btnId).css({
                    'float': 'left',
                    'margin-right': 1
                });
                $('#' + btnId).find('img').css('top', (height - $('#' + btnId).find("img").height()) / 2 - 1);
                $('#' + btnId).find('span').css({ top: 4 });
                if (bigImg == true) {
                    $('#' + btnId).find('span').css('top', imgHeight);
                    $('#' + btnId).find('img').css({
                        'left': (centerButtonSize - imgWidth) / 2 - 1,
                        'top': 1
                    });
                }
                //2018/07/18 Jacky 增加可改變button style
                setButtonStyle(div, btnId, btnRow);
                setButtonTooltip(div, btnId, btnRow);
                if (btnRow["PROTYPE"] == 10) {
                    $("#" + btnId).off();
                }
                //$("#" + btnId).css('margin-right', 1);
                $("#" + btnId).on('click', function () {
                    try {
                        if ($(this).jqxButton('disabled')) { return; }
                        var idx = $(this).prop('id').replace(divId + "_", "");
                        //table.rows[i]['PROTYPE'] + '_' + table.rows[i]['PROGRAMID']
                        var eArgs = {
                            args: {
                                row: table.rows[idx],
                                noCondition: (table.rows[idx]['PROTYPE'] == 99)
                            }
                        };
                        var e1 = $.Event("beforeButtonClick", eArgs);
                        $(div).triggerHandler(e1);
                        if (isEmpty(options.conditionId) == true) {
                            buttonClick(div, options, table.rows[idx], null, false, function (r) {
                                var e2 = $.Event("afterButtonClick", {
                                    args: {
                                        row: table.rows[idx]
                                    }
                                });
                                $(div).triggerHandler(e2);
                            });
                        }
                        else {
                            $("#" + options.conditionId).dynamicCondition('getQueryData', function (args) {
                                var cancel = (args[0] == false);
                                if (table.rows[idx]["ChkConditionOk".toUpperCase()] == 0) {
                                    cancel = false;
                                }
                                if (args[0] == true || cancel == false) {
                                    if (args[0] == true) {
                                        options.conditionData = args[2];
                                    }
                                    else {
                                        var condiOpts = $.data($("#" + options.conditionId)[0], "dynamicCondition").options;
                                        if (condiOpts != null) {
                                            options.conditionData = condiOpts.condition;
                                        }
                                    }
                                    buttonClick(div, options, table.rows[idx], options.conditionData, cancel, function (r) {
                                        var e2 = $.Event("afterButtonClick", {
                                            args: {
                                                row: table.rows[idx]
                                            }
                                        });
                                        $(div).triggerHandler(e2);
                                    });
                                }
                            }, table.rows[idx]["ChkConditionOk".toUpperCase()] == 0);
                        }
                    }
                    catch (err) {
                        errorHandle(formName, btnId + "_click", err);
                    }
                });
                options.controls.push({ name: btnId, type: 'jqxButton', level: 0 });
            }

            return true;
        }
        catch (err) {
            errorHandle(formName, "createButtons", err);
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
    function getReportSettingData(div, options, programId, action) {
        try {
            var riadllName = 'CableSoft.RIA.Dynamic.Report.Web.dll';
            var riaClassName = 'CableSoft.RIA.Dynamic.Report.Web.Report';
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var parameters = $.extend({}, paraLoginInfo, {
                programId: { type: 'string', value: programId }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'QueryReportParameters',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        if (data.ResultBoolean == true) {
                            action([true, JSON.parse(data.ResultXML)]);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            action([false]);
                        }
                    }
                    catch (err) {
                        errorHandle(formName, 'getReportSettingData_success', err);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getReportSettingData', err);
        }
    };
    function executeByProgramId(div, options, proType, programId, conditionData, action, isPrevious) {
        try {
            switch (proType) {
                case 1:
                    getReportSettingData(div, options, programId, function (r) {
                        if (r[0] == true) {
                            var row = {}
                            if (r[1][Object.keys(r[1])[0]].rows.length == 0) {
                                var lang = new dynLinkProgram().language.noReportProgramId;
                                messageBox(lang.replace('{0}', programId));
                            }
                            else {
                                row = r[1][Object.keys(r[1])[0]].rows[0];
                                row["PROTYPE"] = proType;
                                $(div).dynLinkProgram("executeProcess", options, row, conditionData, function (r) {
                                    action(true);
                                }, isPrevious);
                            }
                        }
                        else {
                            action(false);
                        }
                    });
                    break;
                case 11:
                    getReportSettingData(div, options, programId, function (r) {
                        if (r[0] == true) {
                            var row = {}
                            if (r[1][Object.keys(r[1])[0]].rows.length == 0) {
                                var lang = new dynLinkProgram().language.noReportProgramId;
                                messageBox(lang.replace('{0}', programId));
                            }
                            else {
                                row = r[1][Object.keys(r[1])[0]].rows[0];
                                row["PROTYPE"] = proType;
                                $(div).dynLinkProgram("executeProcess", options, row, conditionData, function (r) {
                                    action(true);
                                }, isPrevious);
                            }
                        }
                        else {
                            action(false);
                        }
                    });
                    break;
                default:
                    action(true);
                    break;
            }
        }
        catch (err) {
            errorHandle(formName, "createButtons", err);
        }
    }
    function buttonClick(div, options, row, conditionData, cancel, action, isPrevious) {
        try {
            var retAction = (function (r) {
                if (r[1] != null) {
                    messageBox(r[1]);
                }
                action(true);
            });
            switch (row['PROTYPE']) {
                case 0:         //i秘書
                    if (cancel != true) {
                        getDynGridQueryData(div, row, function (r) {
                            if (r[0] == true) {
                                openNewDynamicGrid(div, row, r[1], retAction);
                            }
                        });
                    }
                    break;
                case 1:         //報表
                    showDynamicReport(div, options, row, conditionData, retAction, isPrevious);
                    break;
                case 2:         //查詢瀏覽
                    action(true);
                    break;
                case 3:         //後端
                    if (cancel != true) {
                        executeBLLProcess(div, options, row, conditionData, retAction);
                    }
                    break;
                case 4:         //電子檔出
                    if (cancel != true) {
                        executeBLLProcess(div, options, row, conditionData, retAction);
                    }
                    break;
                case 5:         //更新
                    action(true);
                    break;
                case 6:         //更新瀏覽
                    action(true);
                    break;
                case 7:         //電子檔入
                    if (cancel != true) {
                        executeBLLProcess(div, options, row, conditionData, retAction);
                    }
                    break;
                case 8:         //批次
                    if (cancel != true) {
                        executeBLLProcess(div, options, row, conditionData, retAction);
                    }
                    break;
                case 9:         //呼叫元件的i秘書
                    if (cancel != true) {
                        openNewComponent(div, options, row, retAction);
                    }
                    break;
                case 10:         //無動作之按鈕
                    if (cancel != true) {
                        retAction([true]);
                    }
                    break;
                case 11:         //匯出報表
                    exportToExcel(div, options, row, conditionData, retAction, isPrevious);
                    break;
                case 99:        //上次執行參數
                    openPreParameter(div, retAction);
                    break;
            }
        }
        catch (err) {
            errorHandle(formName, "buttonClick", err);
        }
    }
    function exportToExcel(div, options, row, conditionData, action, isPrevious) {
        try {
            var rptSvc = options.loginInfo.loginInfo.rows[0].ReportServicePath;
            var title = "{0} [{1}]".format(row.TITLE, row.REPORTNAME);
            var timeout = 1200 || row.RIATIMEOUT;
            var parameters = $.extend({}, getReportParameters(div, row), conditionData);
            var reportFile = row["reportName".toUpperCase()];
            rptSvc += "?timeout={0}&title={1}".format(timeout, title);
            $.fn.dynamicReport("exportToExcel", options.loginInfo, rptSvc, reportFile, parameters, function (r) {
                action([true]);
                //showIndicator(false, indicatorContainer);
            });
        }
        catch (err) {
            errorHandle(formName, "exportToExcel", err);
        }
    }
    function showDynamicReport(div, options, row, conditionData, action, isPrevious) {
        try {
            var width = 0;
            var height = 0;
            var objectType = "csPrinting";
            var container;
            if (options.tabContainer != null) container = options.tabContainer;
            if (container == null) container = options.container;
            var x = 0;
            var y = 26;
            width = $(container).width() - x - 4;
            height = $(container).height() - y - 4;
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(container).width(),
                maxHeight: $(container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };
            var rptFile = row['REPORTNAME'].split(';')[0].replace('.repx', '');
            var title = row['TITLE'] + ' [' + rptFile + ']';
            var parameters = $.extend({}, getReportParameters(div, row, isPrevious), cloneJSON(conditionData));
            // 2019.07.02 By Hammer
            var id = $(div).prop('id') + 'prev';
            var realContainer = $('<div id="' + id + '" style="height:100%;width:100%;overflow: hidden"></div>').appendTo(container);
            var win = createcsWindow(realContainer, title, winOptions);
            $('#' + win.windowId).css("overflow", "hidden");
            $('#' + win.contentId).css("overflow", "hidden");
            let tmrID;
            $(window).on('message.' + win.contentId, function (e) {
                if (e.originalEvent.data == win.contentId) {
                    $(window).off('message.' + win.contentId);
                    tmrID = setTimeout(function () {
                        clearTimeout(tmrID);
                        $('#' + win.windowId).csWindow('destroy');
                        $(realContainer).remove();
                    }, 100);
                }
            });
            let clzBtn = $('#' + win.windowId).find('.jqx-window-close-button');
            if (clzBtn) {
                clzBtn.off('click');
                clzBtn.on('click', function (event, args) {
                    try {
                        $('#' + win.contentId)[objectType]('Release', function (flag) {
                            $('#' + win.contentId)[objectType]('destroy');
                            $('#' + win.windowId).csWindow('close');
                        });
                        action([true]);
                    } catch (err) {
                        errorHandle(formName, 'showDynamicReport_closing', err);
                    }
                });
            }
            //$('#' + win.windowId).on('close', function () {
            //    try {
            //        $('#' + win.contentId)[objectType]('destroy');
            //        $('#' + win.windowId).csWindow('destroy');
            //        $(realContainer).remove();
            //        action([true]);
            //    }
            //    catch (err) {
            //        errorHandle(formName, "showDynamicReport_close", err);
            //    }
            //});
            $('#' + win.contentId)[objectType]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: parameters,
                theme: options.theme,
                actionType: 1,
                localization: options.localization
            });
        }
        catch (err) {
            errorHandle(formName, "showDynamicReport", err);
            action([false]);
        }
    }
    function getReportParameters(div, reportRow, isPrevious) {
        try {
            var table = {
                "Parameters": {
                    columns: [],
                    rows: []
                }
            }
            var fields = ["ProgramID", "MID", "ReportFile", "ReportTitle", "CompanyName",
                "DllName", "ClassName", "SaveResult", "CondProgID", "QueryProgID",
                "ReportProgID", "ReportCondition", "IndexKey", "PreviousReport"
            ];
            var type = ["string", "string", "string", "string", "string",
                "string", "string", "boolean", "string", "string",
                "string", "string", "string", "boolean"
            ];
            for (var i = 0; i < fields.length; i++) {
                table.Parameters.columns.push({ name: fields[i].toUpperCase(), type: type[i] });
            }
            var row = {};
            if (isPrevious != true) {
                row["CompanyName".toUpperCase()] = "";
                row["SaveResult".toUpperCase()] = true;
                row["PreviousReport".toUpperCase()] = false;
            }
            else {
                row["PreviousReport".toUpperCase()] = true;
            }
            row["DllName".toUpperCase()] = "CableSoft.BLL.Dynamic.Report";
            row["ClassName".toUpperCase()] = "Report";
            row["CondProgID".toUpperCase()] = reportRow['CONDPROGID'];
            row["QueryProgID".toUpperCase()] = convertToNull(reportRow['QueryProgId'.toUpperCase()]);
            row["ReportProgID".toUpperCase()] = reportRow['PROGRAMID'];
            row["ProgramID".toUpperCase()] = convertToNull(reportRow['SYSPROGRAMID']);
            row["MID".toUpperCase()] = null;
            row["ReportFile".toUpperCase()] = reportRow['REPORTNAME'];
            row["ReportTitle".toUpperCase()] = reportRow['TITLE'];
            row["IndexKey".toUpperCase()] = reportRow['AUTOSERIALNO'];
            table.Parameters.rows.push(row);
            return table;
        }
        catch (err) {
            errorHandle(formName, "getReportParameters", err);
        }
    }
    //取得設定檔內容
    function getDynGridQueryData(div, row, action) {
        try {
            var options = $.data(div, formName).options;
            if (options.conditionData == null) {
                action([true]);
                return;
            }
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var parameters = $.extend({}, paraLoginInfo, {
                condtionPrgId: { type: 'string', value: options.parentProgramId },
                dynamicGridPrgId: { type: 'string', value: row['sysProgramId'.toUpperCase()], },
                conditionData: { type: 'string', value: JSON.stringify(options.conditionData) },
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetDynGridQueryData',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        if (data.ResultBoolean == true) {
                            var rData = JSON.parse(data.ResultXML);
                            action([true, rData]);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            action([false, data.ErrorMessage]);
                        }
                    }
                    catch (err) {
                        errorHandle(formName, 'getSettingData_success', err);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getDynGridQueryData', err);
        }
    };
    //呼叫上次執行參數
    function openPreParameter(div, action) {
        try {
            var options = $.data(div, formName).options;
            var layout = {
                left: 0, top: buttonHeight,
                width: $(options.container).width(),
                height: $(options.container).height() - buttonHeight
            };
            var preParameter = options.settingData['PreParameter'];
            var parentId = $(div).prop('id') + 'parent';
            var windowId = $(div).prop('id') + 'child';
            var objectName = "showPreviousPara";
            showChildWindow(parentId, windowId, options.container, null, {
                title: options.language.title,
                position: {
                    x: layout.left,
                    y: layout.top
                },
                width: layout.width,
                height: layout.height,
                theme: options.theme,
                initContent: function () {
                    try {
                        var childOptions = cloneJSON({
                            loginInfo: options.loginInfo,
                            container: $('#' + parentId),
                            parameters: { PreParameter: preParameter },
                            theme: options.theme,
                            localization: options.localization
                        });
                        $('#' + windowId)[objectName](childOptions);
                        $('#' + windowId).on('loaded', function () {
                            $(div).removeAttr('disabled');
                        });
                        options.controls.push({ name: windowId, type: objectName, level: 2 });
                        action([true]);
                    }
                    catch (err) {
                        errorHandle(formName, 'openPreParameter_initContent', err);
                    }
                }
            }, {
                'close': function (event) {
                    try {
                        $('#' + windowId)[objectName]('destroy');
                        $('#' + parentId).csWindow('destroy');
                        options.controls = deleteRowByKeyValue(options.controls, 'name', windowId);
                        options.controls = deleteRowByKeyValue(options.controls, 'name', parentId)
                        var e = $.Event("childFormClose");
                        $(div).triggerHandler(e);
                    }
                    catch (err) {
                        errorHandle(formName, 'openPreParameter_close', err);
                    }
                }
            });
            options.controls.push({ name: parentId, type: 'csWindow', level: 1 });
        }
        catch (err) {
            errorHandle(formName, 'openPreParameter', err);
        }
    }
    //呼叫i秘書
    function openNewDynamicGrid(div, menuItem, settingData, action) {
        try {
            $(div).attr('disabled', true);
            var options = $.data(div, formName).options;
            var parentId = $(div).prop('id') + getUniqueId();
            var windowId = parentId + '_body';
            var dprogramid = menuItem.PROGRAMID;
            var dsysprogramid = menuItem.SYSPROGRAMID;
            var title = menuItem.CAPTION + '[' + menuItem.PROGRAMID + ']';
            var layout = getChildFormLayout(div, menuItem);
            var container = options.container;
            if (!container) { container = div; }
            var parentData = getParentData(div, menuItem);
            //var parentData = options.conditionData;
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
                            programId: dprogramid,
                            parentProgramId: dsysprogramid,
                            parentData: parentData,
                            parameters: options.parameters,
                            settingData: settingData,
                            theme: options.theme,
                            localization: options.localization
                        });
                        $('#' + windowId).dynamicGrid(childOptions);
                        $('#' + windowId).on('loaded', function () {
                            $(div).removeAttr('disabled');
                        });
                        options.controls.push({ name: windowId, type: 'dynamicGrid', level: 2 });
                        action([true]);
                    }
                    catch (err) {
                        errorHandle(formName, 'openNewComponent_initContent', err);
                    }
                }
            }, {
                'close': function (event) {
                    try {
                        $('#' + windowId).dynamicGrid('destroy');
                        $('#' + parentId).csWindow('destroy');
                        options.controls = deleteRowByKeyValue(options.controls, 'name', windowId);
                        options.controls = deleteRowByKeyValue(options.controls, 'name', parentId);
                        var e = $.Event("childFormClose");
                        $(div).triggerHandler(e);
                    }
                    catch (err) {
                        errorHandle(formName, 'openNewDynamicGrid_close', err);
                    }
                }
            });
            options.controls.push({ name: parentId, type: 'csWindow', level: 1 });
        }
        catch (err) {
            errorHandle(formName, 'openNewDynamicGrid', err);
        }
    };
    //呼叫新的元件
    function openNewComponent(div, options, menuItem, action) {
        try {
            $(div).attr('disabled', true);
            var parentId = $(div).prop('id') + getUniqueId();
            var windowId = parentId + '_body';
            var dprogramid = menuItem.PROGRAMID;
            var dsysprogramid = menuItem.SYSPROGRAMID;
            var deditMode = menuItem.EDITMODE;
            var drefNo = menuItem.REFNO;
            var title = menuItem.CAPTION + '[' + menuItem.PROGRAMID + ']';
            var htmlName = menuItem.HTMLNAME;
            if (htmlName == null) {
                messageBox('HTML Name is not exist!!');
                return;
            }
            var spHN = htmlName.replace('\\', '/').split('/');
            var objectName = spHN[spHN.length - 1].replace('.js', '');
            var layout = getChildFormLayout(div, menuItem);
            var container = options.container;
            if (!container) { container = div; }
            if (!$.fn[objectName]) {
                messageBox('file:' + htmlName + ' not exist!!');
                return;
            }
            var childParentData = getParentData(div, menuItem);
            var showForm = (function () {
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
                    hasClosing: (deditMode == 1 || deditMode == 2),
                    showCollapseButton: options.showCollapseButton,
                    initContent: function () {
                        try {
                            var childOptions = cloneJSON({
                                loginInfo: options.loginInfo,
                                container: $('#' + parentId),
                                editMode: deditMode,
                                refNo: drefNo,
                                sysProgramId: dsysprogramid,
                                parameters: $.extend({}, options.parameters, options.parentData, childParentData),
                                theme: options.theme,
                                localization: options.localization
                            });
                            $('#' + windowId)[objectName](childOptions);
                            $('#' + windowId).on('loaded', function () {
                                $(div).removeAttr('disabled');
                            });
                            options.controls.push({ name: windowId, type: objectName, level: 2 });
                            action([true]);
                        }
                        catch (err) {
                            errorHandle(formName, 'openNewComponent_initContent', err);
                        }
                    }
                }, {
                    'close': function (event) {
                        try {
                            $('#' + windowId)[objectName]('destroy');
                            $('#' + parentId).csWindow('destroy');
                            options.controls = deleteRowByKeyValue(options.controls, 'name', windowId);
                            options.controls = deleteRowByKeyValue(options.controls, 'name', parentId);
                            var e = $.Event("childFormClose");
                            $(div).triggerHandler(e);
                        }
                        catch (err) {
                            errorHandle(formName, 'openNewComponent_close', err);
                        }
                    }
                });

                options.controls.push({ name: parentId, type: 'csWindow', level: 1 });
            });
            var methodName;
            //0=顯示,1=修改,2=新增,3=刪除,5=列印
            switch (deditMode) {
                case 0:
                    methodName = 'canView';
                    break;
                case 1:
                    methodName = 'canEdit';
                    break;
                case 2:
                    methodName = 'canAppend';
                    break;
                case 3:
                    methodName = 'canDelete';
                    break;
                case 5:
                    methodName = 'canPrint';
                    break;
                default:
            }
            if (methodName != null) {
                var childInData = cloneJSON($.extend({}, options.loginInfo, childParentData));
                $.fn[objectName](methodName, childInData, function (r) {
                    delete childInData;
                    if (r[0] == true) {
                        showForm();
                    }
                    else if (r[1] != null) {
                        messageBox(r[1]);
                    }
                });
            }
            else {
                showForm();
            }
        }
        catch (err) {
            errorHandle(formName, 'openNewComponent', err);
        }
    };
    function getParentData(div, menuItem) {
        try {
            var options = $.data(div, formName).options;
            var table = {};
            if (options.conditionData != null && Object.keys(options.conditionData).length > 0) {
                var condition = options.conditionData['condition'];
                var datatablename = 'condition';
                table[datatablename] = { columns: [], rows: [{}] };
                for (i = 0; i < condition.rows.length; i++) {
                    var fieldName = condition.rows[i]['FieldName'.toUpperCase()].toUpperCase();
                    table[datatablename].columns.push({ name: fieldName, type: "string" });
                    table[datatablename].rows[0][fieldName] = convertToNull(condition.rows[i]['FieldValue'.toUpperCase()]);
                    if (fieldName.substr(fieldName.length - 2) == '_1') {
                        var tField = fieldName.substr(0, fieldName.length - 2);
                        table[datatablename].columns.push({ name: tField, type: "string" });
                        table[datatablename].rows[0][tField] = convertToNull(condition.rows[i]['FieldValue'.toUpperCase()]);
                    }
                }
                if (isEmpty(menuItem["datatablename".toUpperCase()]) != true) {
                    table[menuItem["datatablename".toUpperCase()]] = cloneJSON(table[datatablename]);
                }
            }
            else {
                if (isEmpty(menuItem["datatablename".toUpperCase()]) != true) {
                    var keys = Object.keys(options.parameters);
                    if (keys.length > 0) {
                        table[menuItem["datatablename".toUpperCase()]] = cloneJSON(options.parameters[keys[keys.length - 1]]);
                    }
                }
            }
            return table;
        }
        catch (err) {
            errorHandle(formName, 'getParentData', err);
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
            $.each($(div).parents(), function (idx, val) {
                if ($(val).hasClass("jqx-window")) {
                    winContainer = $(val);
                }
                else if ($(val).hasClass("jqx-tabs-content-element")) {
                    tabItemContainer = $(val);
                }
            });
            if (winContainer != null) {
                if ($(winContainer).find('.jqx-window-header').css('display') != "none") {
                    top = dTop;
                }
                if (height >= $(winContainer).height() - top - 2) { height = $(winContainer).height() - top - 2 };
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
    function executeBLLProcess(div, options, row, conditionData, action) {
        try {
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var timeout = options['settingData'][Object.keys(options['settingData'])[0]].rows[0]['RIATIMEOUT'];
            if (timeout == null || timeout == 0) timeout = 600;
            var conditionStr = null;
            if (conditionData != null) {
                var tData = cloneJSON(conditionData);
                var oTableName = Object.keys(conditionData)[0];
                tData['conditionData'.toUpperCase()] = tData[oTableName];
                conditionStr = JSON.stringify(tData);
                delete tData[oTableName];
                delete tData;
            }
            var parameters = $.extend({}, paraLoginInfo, {
                proType: { type: 'integer', value: row['proType'.toUpperCase()] },
                programId: { type: 'string', value: row['programId'.toUpperCase()] },
                condProgId: { type: 'string', value: row['condProgId'.toUpperCase()] },
                conditionData: { type: 'string', value: convertToNull(conditionStr) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'ExecuteBLLProcess',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(tData);
                    if (data.ResultBoolean == true) {
                        action([true, data.ErrorMessage]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            }, timeout);
        }
        catch (err) {
            errorHandle(formName, 'executeBLLProcess', err);
        }
    };
    function conditionToData(data) {
        try {
            var condition = { condition: { columns: [], rows: [{}] } };
            var rows = data[Object.keys(data)[0]].rows;
            for (var i = 0; i < rows.length; i++) {
                var name = rows[i]['fieldName'.toUpperCase()];
                var value = rows[i]['fieldValue'.toUpperCase()];
                condition.condition.columns.push({ name: name, type: 'string' });
                var row = condition.condition.rows[0];
                row[name] = value;
            }
            return condition;
        }
        catch (err) {
            errorHandle(formName, 'conditionToData', err);
        }
    };
})(jQuery);
