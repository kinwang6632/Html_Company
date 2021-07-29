(function($) {
    var formName = 'dynamicReport';
    var riadllName = 'CableSoft.RIA.Dynamic.Report.Web.dll';
    var riaClassName = 'CableSoft.RIA.Dynamic.Report.Web.Report';
    var endCompId = 'comp';
    var endPanelId = 'panel';
    var endCondtionId = 'cond';
    var endUploadFileId = 'cuf';
    var endButtonId = 'btn';
    var endLinkProgramId = 'likp';
    var buttonHeight = 25;
    var dynReportTableName = 'Report';
    var compTableName = 'CanChooseComp';
    $.fn[formName] = function(options, param, params2, params3, params4, params5, params6) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, params2, params3, params4, params5, params6);
                }
                return;
            }
            options = options || {};
            return this.each(function() {
                var state = $.data(this, formName);
                if (state) {
                    $.extend(state.options, options);
                } else {
                    $.data(this, formName, {
                        options: $.extend({}, new defaults(), new dynamicReport(), options)
                    });
                    init(this);
                }
            });
        } catch (err) {
            errorHandle(formName, '$.fn.' + formName, err);
        }
    };
    var methods = {
        options: function(jq) {
            return $.data(jq[0], formName).options;
        },
        theme: function(jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        setTheme: function(jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        localization: function(jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        //close: function(jq) {
        //    return jq.each(function() {
        //        formClosed(this);
        //    });
        //},
        canView: function(jq, params, param2) {
            param2([true]);
            return true;
        },
        destroy: function(jq) {
            return jq.each(function() {
                formDestroy(this);
            });
        },
        resize: function(jq, params) {
            return jq.each(function() {
                formResize(this, params);
            });
        },
        disableAll: function(jq, flag, revertStatus) {
            return jq.each(function() {
                disableAll(this, flag, revertStatus);
            });
        },
        exportToExcel: function(jq, loginInfo, rptSvc, reportFile, parameters, action) {
            exportToExcel(loginInfo, rptSvc, reportFile, parameters, action);
        }
    };
    var defaults = (function() {
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
    });
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, which) {
                return typeof args[which] != 'undefined' ? args[which] : match;
            });
        };
    }
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        } catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    }
    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var divId = $(div).prop('id');
            getControlObject(div, endCompId).css({
                height: buttonHeight + 2
            });
            getControlObject(div, endPanelId).jqxPanel({
                height: $(div).height() - buttonHeight * 2 - 12
            });
            getControlObject(div, endCondtionId).css({
                height: getControlObject(div, endPanelId).height()
            });
            getControlObject(div, endButtonId).css({
                height: buttonHeight + 2
            });
            var controls = options.controls;
            for (var i = 0; i < controls.length; i++) {
                var o = $('#' + controls[i].name);
                o.each(function() {
                    $(this)[controls[i].type]('resize');
                });
            }

        } catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    }
    function formDestroy(div) {
        try {
            if ($.data(div, formName) == null) {
                return;
            }
            var options = $.data(div, formName).options;
            if (options == null || options.length == 0) {
                return;
            }
            var controls = options.controls;
            destroyControls(controls);
            options.length = 0;
            options = null;
            $.data(div, formName, null);
            //$(div).remove();
        } catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    }
    function disableAll(div, flag, revertStatus) {
        var options = $.data(div, formName).options;
        disableAllControls(options.controls, flag, revertStatus);
    }
    function init(div) {
        try {
            var options = $.data(div, formName).options;
            var sysProgramId = options.sysProgramId;
            var settingData = options.settingData;
            if (sysProgramId == null) {
                messageBox('no programId!!', messageType.critical);
                return;
            }
            addHandlerGetParameters(div, options);
            var loaded = (function() {
                $(options.container).on('resize', function() {
                    formResize(div);
                });
                formResize(div);
                if (options['loaded']) {
                    options['loaded']();
                }
                var e = $.Event('loaded');
                $(div).triggerHandler(e);
            });
            if (settingData != null && settingData.length > 0) {
                refresh(div, loaded);
            } else {
                getSettingData(div, function(flag) {
                    if (flag == true) {
                        refresh(div, loaded);
                    }
                });
            }

        } catch (err) {
            errorHandle(formName, 'refresh', err);
        }
    }
    //取得設定檔內容
    function getSettingData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = $.extend({}, {
                loginInfo: {
                    type: 'logininfo',
                    value: cloneJSON(options.loginInfo.loginInfo)
                }
            });
            var parameters = $.extend({}, paraLoginInfo, {
                SystemProgramId: {
                    type: 'string',
                    value: options.sysProgramId
                }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetSettingData',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function(data) {
                    try {
                        if (data.ResultBoolean == true) {
                            options.settingData = JSON.parse(data.ResultXML);
                            action(true);
                        } else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            action(false);
                        }
                    } catch (err) {
                        errorHandle(formName, 'getSettingData_success', err);
                    }
                }
            });
        } catch (err) {
            errorHandle(formName, 'getSettingData', err);
        }
    }
    //更新 Condition Grid
    function refresh(div, action) {
        try {
            var options = $.data(div, formName).options;
            if (options.programId == null) {
                options.programId = options.settingData[dynReportTableName].rows[0]['PROGRAMID'];
            }
            if (options.sysProgramId == null) {
                options.sysProgramId = options.settingData[dynReportTableName].rows[0]['SYSPROGRAMID'];
            }
            options.condProgId = options.settingData[dynReportTableName].rows[0]['CONDPROGID'];
            options.showPreviousType = options.settingData[dynReportTableName].rows[0]['ShowPreviousType'.toUpperCase()];
            options.previousFlag = options.settingData[dynReportTableName].rows[0]['PreviousFlag'.toUpperCase()];
            options.exportExcelFlag = options.settingData[dynReportTableName].rows[0]['ExportExcelFlag'.toUpperCase()];
            options.excelMID = options.settingData[dynReportTableName].rows[0]['ExcelMID'.toUpperCase()];
            options.personalDataMID = options.settingData[dynReportTableName].rows[0]['PersonalDataMID'.toUpperCase()];
            options.privilege = options.settingData[dynReportTableName].rows[0]['Privilege'.toUpperCase()];
            createBody(div);
            //建立可選公司別/報表格式
            createCompany(div);
            //建立動態條件
            createCoditions(div);
            //建立按鈕
            createButtons(div);
            action(true);
        } catch (err) {
            errorHandle(formName, 'refresh', err);
        }
    }
    //建立動態查詢瀏覽Body
    function createBody(div) {
        try {
            var options = $.data(div, formName).options;
            let parentID = $(div).prop('id');
            var compId = parentID + endCompId;
            var condPanelId = parentID + endPanelId;
            var condId = parentID + endCondtionId;
            var uploadFileId = parentID + endUploadFileId;
            var buttonId = parentID + endButtonId;
            $('<div id="{0}"></div>'.format(compId)).appendTo($(div));
            $('<div id="{0}" style="margin-top:2px;"></div>'.format(condPanelId)).appendTo($(div));
            $('<div id="{0}" style="padding:2px;"></div>'.format(condId)).appendTo($('#' + condPanelId));
            $('<div id="{0}" style="padding-top:1px;"></div>'.format(uploadFileId)).appendTo($(div));
            $('<div id="{0}" style="padding-top:1px;"></div>'.format(buttonId)).appendTo($(div));
            //建立Panel
            $('#' + condPanelId).jqxPanel({
                theme: options.theme,
                height: $(div).height() - buttonHeight * 3 - 12,
                width: '100%',
                //sizeMode: 'wrap'
                autoUpdate: true
            });
            options.controls.push({
                name: condPanelId,
                type: 'jqxPanel',
                level: 0
            });
            //var scrollBars = ['horizontalScrollBar', 'verticalScrollBar'];
            //for (var j = 0; j < scrollBars.length; j++) {
            //    if ($('#' + condPanelId + scrollBars[j]).length > 0) {
            //        $('#' + condPanelId + scrollBars[j]).css('display', 'none');
            //    }
            //}
            getControlObject(div, compId).css({
                width: '99%',
                height: buttonHeight + 2
            });
            getControlObject(div, condId).css({
                width: '99%',
                height: getControlObject(div, condPanelId).height()
            });
            getControlObject(div, uploadFileId).css({
                width: '99%',
                height: buttonHeight + 2
            });
            getControlObject(div, buttonId).css({
                width: '99%',
                height: buttonHeight + 2
            });
            return true;
        } catch (err) {
            errorHandle(formName, 'createBody', err);
        }
    }
    //建立公司別
    function createCompany(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var headData = settingData[dynReportTableName];
            var canChooseComp = headData.rows[0]['CanChooseComp'.toUpperCase()];
            if (canChooseComp == 0) {
                return;
            }
            var companyData = settingData[compTableName];
            var reportTable = settingData[dynReportTableName];
            var compContainerId = $(div).prop('id') + endCompId;
            //當等於1時為 csList
            if (canChooseComp == 1) {
                options.compCodeId = compCodeId;
                var compCodeId = compContainerId + '_1';
                $('<div style="float:left;margin-top:6px;">' + options.language.company + '</div>').appendTo($('#' + compContainerId));
                $('<div id = "' + compCodeId + '" style="float:left;margin-left:5px;"></div>').appendTo($('#' + compContainerId));
                $('#' + compCodeId).csList({
                    source: companyData.rows,
                    codeNoWidth: 70,
                    width: 200,
                    height: buttonHeight,
                    theme: options.theme
                });
                $('#' + compCodeId).csList('onlyDropDown', true);
                options.controls.push({
                    name: compCodeId,
                    type: 'csList',
                    level: 1
                });
                $('#' + compCodeId).csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                $('#' + compCodeId).on('selectedIndexChanged', function() {
                    if ($('#' + compCodeId).attr('data-disableChange') != null) return;
                    companyChange(div, $('#' + compCodeId).csList('codeNo'),
                        function(flag) {
                            if (flag == false) {
                                $('#' + compCodeId).attr('data-disableChange', true);
                                $('#' + compCodeId).csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                                $('#' + compCodeId).removeAttr('data-disableChange');
                            }
                        }
                    );
                });
            }
            //否則為按鈕
            else {
                var clickColor = '#FFB5B5';
                var unClickColor;
                var rowLength = companyData.rows.length;
                var heightPercent = Math.floor(1 / rowLength * 1000) / 10;
                for (var i = 0; i < rowLength; i++) {
                    var buttonId = compContainerId + '_' + companyData.rows[i]['CODENO'];
                    $('<input style="margin:1px;max-width:120px;min-width:60px;" type="button" value="' + companyData.rows[i]['DESCRIPTION'] + '" id="' + buttonId + '"/>').appendTo($('#' + compContainerId));
                    $('#' + buttonId).jqxButton({
                        height: buttonHeight,
                        width: heightPercent + '%',
                        theme: options.theme
                    });
                    if (options.loginInfo.loginInfo.rows[0].compcode == companyData.rows[i]['CODENO']) {
                        $('#' + buttonId).css('background-color', clickColor);
                    } else {
                        unClickColor = $('#' + buttonId).css('background-color');
                    }
                    options.controls.push({
                        name: buttonId,
                        type: 'jqxButton',
                        level: 1,
                        parentId: compContainerId
                    });
                    var setButtonColor = function(btn) {
                        for (var i = 0; i < options.controls.length; i++) {
                            if (options.controls[i] != null && options.controls[i].parentId == compContainerId) {
                                $('#' + options.controls[i].name).css('background-color', unClickColor);
                            }
                        }
                        $(btn).css('background-color', clickColor);
                    };
                    $('#' + buttonId).on('click', function() {
                        try {
                            var compId = $(this).prop('id').split('_')[$(this).prop('id').split('_').length - 1];
                            setButtonColor(this);
                            companyChange(div, compId,
                                function(flag) {
                                    if (flag == false) {
                                        setButtonColor('#' + compContainerId + '_' + options.loginInfo.loginInfo.rows[0].compcode);
                                    }
                                }
                            );
                        } catch (err) {
                            errorHandle(formName, 'createCompany_click', err);
                        }
                    });

                }
            }
            var inTypeId = compContainerId + 'type';
            var inType = $('<div id="' + inTypeId + '"></div>').appendTo($('#' + compContainerId));
            var typeListId = compContainerId + 'typel';
            options.typeListId = typeListId;
            $('<div style="float:left;margin-left:10px;margin-top:6px;">' + options.language.inType + '</div>').appendTo($('#' + inTypeId));
            $('<div id = "' + typeListId + '" style="float:left;margin-left:5px;"></div>').appendTo($('#' + inTypeId));
            for (var j = 0; j < reportTable.rows.length; j++) {
                reportTable.rows[j]['ITEM'] = j + 1;
            }
            $('#' + typeListId).csList({
                source: reportTable.rows,
                codeNoWidth: 50,
                width: 300,
                height: buttonHeight,
                columns: [{
                        text: 'ITEM',
                        datafield: 'ITEM',
                        width: 50
                    },
                    {
                        text: 'CAPTION',
                        datafield: 'CAPTION',
                        width: 150
                    }
                ],
                theme: options.theme
            });
            options.controls.push({
                name: typeListId,
                type: 'csList',
                level: 1
            });
            $('#' + typeListId).on('selectedIndexChanged', function() {
                var value = $(this).csList('codeNo');
                var field = 'FormatItem';
                options.item = value;
                $('#' + $(div).prop('id') + endCondtionId).dynamicCondition('valueChange', field, value, function(r) {

                });

                var selItm = $('#' + options.typeListId).csList('selectedItem');
                if (selItm) {
                    options.previousFlag = selItm.PREVIOUSFLAG;
                    options.exportExcelFlag = selItm.EXPORTEXCELFLAG;
                    options.excelMID = selItm.EXCELMID;
                    options.personalDataMID = selItm.PERSONALDATAMID;
                    options.privilege = selItm.PRIVILEGE;
                }
                //createCoditions(div);
                createButtons(div);
                //formResize(div);
            });
            $('#' + typeListId).csList('selectedIndex', 0);
        } catch (err) {
            errorHandle(formName, 'createCompany', err);
        }
    }
    function companyChange(div, compCode, action) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var oCompCode = options.loginInfo.loginInfo.rows[0]['compcode'];
            options.loginInfo.loginInfo.rows[0]['compcode'] = compCode;
            getSettingData(div, function(flag) {
                if (flag == true) {
                    //清除動態條件及i秘書
                    for (var j = 5; j >= 0; j--) {
                        for (var i = 0; i < controls.length; i++) {
                            var control = controls[i];
                            if (control == null || j != control.level) {
                                continue;
                            }
                            //清除動態條件
                            if (control.type == 'dynamicCondition') {
                                $('#' + control.name)[control.type]('destroy');
                                $('#' + control.name).remove();
                                controls[i] = null;
                            }
                            //清除Button
                            else if (control.type == 'jqxButton') {
                                $('#' + control.name)[control.type]('destroy');
                                controls[i] = null;
                            }
                        }
                    }
                    options.controls = controls.filter(function(e) {
                        return e;
                    });
                    //重建動態條件及i秘書
                    createCoditions(div);
                    // 2019.04.03 (8253) By Hammer
                    var settingData = options.settingData;
                    var reportTable = settingData[dynReportTableName];
                    //var selItm = $('#' + options.typeListId).csList('selectedItem');
                    var reportType = $('#' + options.typeListId).csList('codeNo');
                    $('#' + options.typeListId).csList('clearDisplayValue');
                    for (var j = 0; j < reportTable.rows.length; j++) {
                        reportTable.rows[j]['ITEM'] = j + 1;
                    }
                    $('#' + options.typeListId).csList('source', reportTable.rows);
                    if (reportType) {
                        $('#' + options.typeListId).csList('codeNo', reportType);
                    }
                    createButtons(div);
                    formResize(div);
                    action(true);
                } else {
                    options.loginInfo.loginInfo.rows[0]['compcode'] = oCompCode;
                    action(false);
                }
            });
        } catch (err) {
            errorHandle(formName, 'companyChange', err);
        }
    }
    //建立動態條件
    function createCoditions(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = cloneJSON(options.settingData);
            delete settingData[compTableName];
            delete settingData[dynReportTableName];

            var realConditionId = $(div).prop('id') + endCondtionId;
            var childId = realConditionId + '_0';
            $('<div id = "' + childId + '"></div>').appendTo($('#' + realConditionId));
            $('#' + childId).css('width', '100%');
            $('#' + childId).css('height', '100%');
            var keys = Object.keys(settingData);
            var table = settingData[keys[0]];
            options.conditionId = childId;
            $('#' + childId).dynamicCondition($.extend({}, {
                loginInfo: options.loginInfo,
                programId: table.rows[0]['CondProgId'.toUpperCase()],
                //sysProgramId: table.rows[0]['sysProgramId'.toUpperCase()],
                settingData: settingData,
                localization: options.localization,
                theme: options.theme,
                parameters: cloneJSON(options.parameters),
                //disableMessage: true,
                container: div
            }));
            options.controls.push({
                name: childId,
                type: 'dynamicCondition',
                level: 2
            });
            return true;
        } catch (err) {
            errorHandle(formName, 'createCoditions', err);
        }
    }
    //建立按鈕
    function createButtons(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var language = options.language;
            var buttonsId = $(div).prop('id') + endButtonId;
            var width = Math.floor($('#' + buttonsId).width() / 3);
            if (width > 120) {
                width = 120;
            }
            var printId = buttonsId + 'print';
            var printPId = buttonsId + 'printP';
            var exportId = buttonsId + 'export';
            var exitId = buttonsId + 'exit';
            var buttonOptions = {
                width: width,
                height: buttonHeight,
                theme: options.theme
            };
            var buttons = [printId, printPId, exportId, exitId];
            var images = [imageScr.print, {
                imgSrc: 'Images/Printer6.png'
            }, imageScr.excel, imageScr.exit];
            var langs = [language.btnPrint, language.btnPrintPrevious, language.btnExpXls, language.btnExit];
            buttonOptions = $.extend({}, buttonOptions, imagePosition);
            var bID, funcBtn;
            var bypassPrevious = false;
            var bypassExport = false;
            for (var i = 0; i < buttons.length; i++) {
                var bypass = false;
                switch (i) {
                    case 1:
                        if (options.previousFlag == 0) {
                            bypass = true;
                            bypassPrevious = true;
                        }
                        break;
                    case 2:
                        if (options.exportExcelFlag == 0 || options.privilege == 0) {
                            bypass = true;
                            bypassExport = true;
                        }
                        break;
                    default:
                        break;
                }
                bID = buttons[i];
                if ($('#' + bID).length == 0) {
                    $('<button id="' + bID + '">' + langs[i] + '</button>').appendTo($('#' + buttonsId));
                    $('#' + bID).jqxButton($.extend({}, images[i], buttonOptions, {
                        disabled: bypass
                    }));
                    funcBtn = $('#' + bID);
                    if (bID == exitId) {
                        funcBtn.css('float', 'right');
                    } else {
                        funcBtn.css('float', 'left');
                    }
                    funcBtn.css('margin-right', 1);
                    options.controls.push({
                        name: bID,
                        type: 'jqxButton',
                        level: 2
                    });
                    funcBtn.find('img').css('top', (buttonHeight - funcBtn.find('img').height()) / 2 - 1);
                    funcBtn.find('span').css({
                        top: 4
                    });
                }
                funcBtn = $('#' + bID);
                funcBtn.jqxButton({
                    disabled: bypass
                });
                if (bypass) {
                    funcBtn.hide();
                } else {
                    funcBtn.show();
                }
            }
            $('<div id="' + $(div).prop('id') + endLinkProgramId + '"></div>').appendTo($('#' + buttonsId));
            $('#' + $(div).prop('id') + endLinkProgramId).dynLinkProgram($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: options.container,
                parentProgramId: options.programId,
                showPreviousType: options.showPreviousType,
                localization: options.localization,
                conditionId: $(div).prop('id') + endCondtionId,
                buttonHeight: buttonHeight,
                theme: options.theme
            }));
            options.controls.push({
                name: $(div).prop('id') + endLinkProgramId,
                type: 'dynLinkProgram',
                level: 2
            });
            //當按下[列印]按鈕
            $('#' + printId).off();
            $('#' + printId).on('click', function() {
                try {
                    if ($(this).jqxButton('disabled')) {
                        return;
                    }
                    if (isDataOk(div) == false) return;
                    //disableAll(div, true, true);
                    getControlObject(div, endCondtionId + '_0').dynamicCondition('getQueryData', function(args) {
                        if (args[0] == false) {
                            //messageBox(args[1]);
                            //disableAll(div, false, true);
                            return;
                        } else {
                            createPrintingForm(div, args[2], true, function(r) {
                                //disableAll(div, false, true);
                            });
                        }
                    });

                } catch (err) {
                    errorHandle(formName, printId + '_Click', err);
                }
            });
            //當按下[上次結果]按鈕
            $('#' + printPId).off();
            $('#' + printPId).on('click', function() {
                try {
                    if ($(this).jqxButton('disabled')) {
                        return;
                    }
                    //disableAll(div, true, true);
                    createPrintingForm(div, null, false, function(r) {
                        //disableAll(div, false, true);
                    });
                } catch (err) {
                    errorHandle(formName, printPId + '_Click', err);
                }
            });
            //當按下[匯出Excel]按鈕
            $('#' + exportId).off();
            $('#' + exportId).on('click', function() {
                try {
                    if ($(this).jqxButton('disabled')) {
                        return;
                    }
                    if (isDataOk(div) == false) return;
                    //disableAll(div, true, true);
                    getControlObject(div, endCondtionId + '_0').dynamicCondition('getQueryData', function(args) {
                        if (args[0] == false) {
                            //messageBox(args[1]);
                            //disableAll(div, false, true);
                            return;
                        } else {
                            var indicatorContainer = getIndicatorContainer(div);
                            showIndicator(true, indicatorContainer);
                            var opt = $.data(div, formName).options;
                            var rptSvc = opt.loginInfo.loginInfo.rows[0].ReportServicePath;
                            var idx = $('#' + opt.typeListId).csList('selectedIndex');
                            var rptOpt = opt.settingData[dynReportTableName].rows[idx];
                            var title = '{0} [{1}]'.format(rptOpt.TITLE, rptOpt.REPORTNAME);
                            var timeout = rptOpt.RIATIMEOUT || 1200;
                            var parameters = $.extend({}, getReportParameters(div, true), cloneJSON(args[2]));
                            var reportFile = parameters.Parameters.rows[0].REPORTFILE;
                            rptSvc += '?timeout={0}&title={1}'.format(timeout, encodeURIComponent(title));
                            //rptSvc += '?timeout={0}'.format(timeout);
                            exportToExcel(opt.loginInfo, rptSvc, reportFile, parameters, function(r) {
                                showIndicator(false, indicatorContainer);
                                //disableAll(div, false, true);
                            });
                        }
                    });
                } catch (err) {
                    errorHandle(formName, printPId + '_Click', err);
                }
            });
            //當按下離開按鈕
            $('#' + exitId).off();
            $('#' + exitId).on('click', function() {
                if ($(this).jqxButton('disabled')) {
                    return;
                }
                close(div);
            });
            return true;
        } catch (err) {
            errorHandle(formName, 'createButtons', err);
        }
    }
    function exportToExcel(loginInfo, expUrl, rptFile, param, action) {
        rptFile = rptFile.split(';')[0];
        rptFile = rptFile.replace('repx', 'xlsx');
        if (!rptFile.endsWith('.xlsx')) {
            rptFile += '.xlsx';
        }
        var requ = new XMLHttpRequest();

        requ.onreadystatechange = function() {
            if (requ.readyState == 4) {
                if (requ.status == 200) {
                    // should be a blob
                    console.log(typeof requ.response); 
                } else if (requ.responseText != "") {
                    console.log(requ.responseText);
                }
            } else if (requ.readyState == 2) {
                if (requ.status == 200) {
                    requ.responseType = "blob";
                } else {
                    requ.responseType = "text";
                }
            }
        };

        var procResult = function(xhr) {
            // Only handle status code 200
            // this.readyState == XMLHttpRequest.DONE && this.status == 200
            if (requ.status >= 200 && requ.status < 300 || requ.status === 304) {
                var contType = requ.getResponseHeader('Content-Type');
                if (contType.startsWith('text/plain')) {
                    var retMsg = decodeURI(requ.getResponseHeader('RetMsg'));
                    messageBox(retMsg, messageType.information);
                    requ = null;
                    action();
                    return;
                }
                // Try to find out the filename from the content disposition `filename` value
                var filename;
                // The actual download
                // It is necessary to create a new blob object with mime-type explicitly set
                var blob = new Blob([requ.response], {
                    'type': 'application/xlsx'
                });
                // IE doesn't allow using a blob object directly as link href
                // instead it is necessary to use msSaveOrOpenBlob
                if (window.navigator && window.navigator.msSaveOrOpenBlob && browser().isIE == true) {
                    var disposition = requ.getResponseHeader('content-disposition');
                    var matches = /"([^"]*)"/.exec(disposition);
                    filename = (matches != null && matches[1] ? matches[1] : rptFile);
                    //window.navigator.msSaveBlob(blob, filename);
                    window.navigator.msSaveOrOpenBlob(blob, filename);
                    blob = null;
                } else {
                    // For other browsers:
                    // Create a link pointing to the ObjectURL containing the blob.
                    filename = rptFile;
                    // const bData = window.URL.createObjectURL(blob);
                    var bData = window.URL.createObjectURL(blob);
                    var lnk = document.createElement('a');
                    //link.setAttribute('target', '_blank');
                    //link.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(xml));
                    lnk.href = bData;
                    //link.setAttribute('download', filename);
                    lnk.download = filename;
                    document.body.appendChild(lnk);
                    lnk.click();
                    document.body.removeChild(lnk);
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    setTimeout(function() {
                        window.URL.revokeObjectURL(bData);
                        blob = null;
                        bData = null;
                    }, 100);
                }
                requ = null;
                action();
            } else {
                // some error handling should be done here...
                messageBox(requ.statusText, messageType.information);
                requ = null;
                action();
            }

        };
        requ.onload = function() {
            procResult(requ); //requ.onreadystatechange
        };

        requ.onerror = function (e) {
            console.error(requ.statusText);
            messageBox(requ.statusText, messageType.critical);
        };

        requ.open('POST', expUrl.replace('CSReport.aspx', 'CSExport.ashx'), true);
        //requ.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        requ.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //requ.responseType = 'blob';

        //requ.getAllResponseHeaders / getResponseHeader
        //requ.addEventListener / removeEventListener / dispatchEvent
        //requ.DONE / LOADING
        //requ.onloadend / onprogress / onreadystatechange
        //requ.response / responseBody / responseText / responseType
        //requ.statusText
        //requ.timeout

        //var opt = $.data(div, formName).options;
        //var idx = $('#' + opt.typeListId).csList('selectedIndex');
        //var rptOpt = opt.settingData[dynReportTableName].rows[idx];
        //var timeout = rptOpt.RIATIMEOUT || 1200; // 秒

        var jsonStr = JSON.stringify($.extend({}, loginInfo, param));
        //XMLHttpRequest.timeout屬性返回一個整數，表示多少毫秒后，如果請求仍然沒有得到結果，就會自動終止。如果該屬性等于0，就表示沒有時間限制。
        requ.timeout = 7200 * 1000; // time in milliseconds , 單位：milliseconds 毫秒
        //requ.timeout = timeout * 1000; // time in milliseconds , 單位：milliseconds 毫秒
        requ.send(jsonStr);
        //requ.send(new FormData(jsonStr));
        //requ.send(encodeURIComponent(jsonStr));
    }
    function createPrintingForm(div, conditionData, isPrint, action) {
        try {
            var win;
            var opt = $.data(div, formName).options;
            //0:boolean,1:訊息,2:欄位名稱
            var width = 0;
            var height = 0;
            var objectType = 'csPrinting';
            var container;
            if (opt.tabContainer != null) container = opt.tabContainer;
            if (container == null) container = opt.container;
            var x = 0;
            var y = 26;
            width = container.width() - x - 4;
            height = container.height() - 4;
            var winOpt = {
                width: width,
                height: height,
                maxWidth: $(container).width(),
                maxHeight: $(container).height(),
                position: {
                    x: x,
                    y: y
                },
                closeButtonAction: 'close',
                resizable: true,
                theme: opt.theme
            };
            //var title = $('#' + opt.typeListId).csList('description');
            var idx = $('#' + opt.typeListId).csList('selectedIndex');
            var rptOpt = opt.settingData[dynReportTableName].rows[idx];
            var rptSvc = opt.loginInfo.loginInfo.rows[0].ReportServicePath;
            var rptFile = rptOpt.REPORTNAME.split(';')[0].replace('.repx', '');
            var title = '{0} [{1}]'.format(rptOpt.TITLE, rptFile);
            let ctnr = '<div id="' + $(div).prop('id') + 'prev" style="height:100%;width:100%;overflow: hidden"></div>';
            var realContainer = $(ctnr).appendTo(container);
            win = createcsWindow(realContainer, title, winOpt);
            $('#' + win.windowId).css('overflow', 'hidden');
            $('#' + win.contentId).css('overflow', 'hidden');
            var parameters;
            if (isPrint == true) {
                parameters = $.extend({}, getReportParameters(div, isPrint), cloneJSON(conditionData));
            } else {
                parameters = getReportParameters(div, isPrint);
            }
            var timeout = opt.settingData[dynReportTableName].rows[idx]['RIATIMEOUT'] || 1200;
            var prevOpt = {
                'reportOptions': {
                    'columns': [{
                            'name': 'timeout',
                            'type': 'integer'
                        },
                        {
                            'name': 'title',
                            'type': 'string'
                        }
                    ],
                    'rows': [{
                        'timeout': timeout,
                        'title': title
                    }]
                }
            }
            parameters = $.extend({}, parameters, prevOpt);
            let tmrID;
            $(window).on('message.' + win.contentId, function (e) {
                if (e.originalEvent.data == win.contentId) {
                    $(window).off('message.' + win.contentId);
                    tmrID = setTimeout(function() {
                        clearTimeout(tmrID);
                        $('#' + win.windowId).csWindow('destroy');
                        $(realContainer).remove();
                    }, 100);
                }
            });
            let clzBtn = $('#' + win.windowId).find('.jqx-window-close-button');
            if (clzBtn) {
                clzBtn.off('click');
                clzBtn.on('click', function(event, args) {
                    try {
                        $('#' + win.contentId)[objectType]('Release', function(flag) {
                            $('#' + win.contentId)[objectType]('destroy');
                            $('#' + win.windowId).csWindow('close');
                        });
                        action();
                    } catch (err) {
                        errorHandle(formName, 'createPrintingForm_closing', err);
                    }
                });
            }
            $('#' + win.contentId)[objectType]({
                loginInfo: cloneJSON(opt.loginInfo),
                container: $('#' + win.windowId),
                parameters: parameters,
                theme: opt.theme,
                actionType: 1,
                timeout: timeout,
                localization: opt.localization,
                title: title
            });
            opt.controls.push({
                name: win.contentId,
                type: objectType,
                level: 3
            });
            action();
        } catch (err) {
            errorHandle(formName, 'createPrintingForm', err);
        }
    }
    function getReportParameters(div, isPrint) {
        try {
            var options = $.data(div, formName).options;
            var table = {
                'Parameters': {
                    columns: [],
                    rows: []
                }
            };
            var fields = ['ProgramID', 'MID', 'ReportFile', 'ReportTitle', 'CompanyName',
                'DllName', 'ClassName', 'SaveResult', 'CondProgID', 'QueryProgID',
                'ReportProgID', 'ReportCondition', 'IndexKey', 'PreviousReport'
            ];
            var type = ['string', 'string', 'string', 'string', 'string',
                'string', 'string', 'boolean', 'string', 'string',
                'string', 'string', 'string', 'boolean'
            ];
            for (var i = 0; i < fields.length; i++) {
                table.Parameters.columns.push({
                    name: fields[i].toUpperCase(),
                    type: type[i]
                });
            }
            var idx = $('#' + options.typeListId).csList('selectedIndex');
            var rptOptions = options.settingData[dynReportTableName].rows[idx];
            var row = {};
            if (isPrint) {
                row['CompanyName'.toUpperCase()] = '';
                row['SaveResult'.toUpperCase()] = true;
                row['PreviousReport'.toUpperCase()] = false;
            } else {
                row['PreviousReport'.toUpperCase()] = true;
            }
            row['DllName'.toUpperCase()] = 'CableSoft.BLL.Dynamic.Report';
            row['ClassName'.toUpperCase()] = 'Report';            row['CondProgID'.toUpperCase()] = rptOptions['CONDPROGID'];
            row['QueryProgID'.toUpperCase()] = convertToNull(rptOptions['QueryProgId'.toUpperCase()]);
            row['ReportProgID'.toUpperCase()] = rptOptions['PROGRAMID'];
            row['ProgramID'.toUpperCase()] = convertToNull(options.sysProgramId);
            row['MID'.toUpperCase()] = null;
            row['ReportFile'.toUpperCase()] = rptOptions['REPORTNAME'];
            row['ReportTitle'.toUpperCase()] = rptOptions['TITLE'];
            row['ReportProgID'.toUpperCase()] = rptOptions['PROGRAMID'];
            row['IndexKey'.toUpperCase()] = rptOptions['AUTOSERIALNO'];
            table.Parameters.rows.push(row);
            return table;
        } catch (err) {
            errorHandle(formName, 'getReportParameters', err);
        }
    }
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            //公司別為必要欄位
            if (options.compCodeId != null && $('#' + options.compCodeId).length > 0) {
                if (checkControlMustBe({
                        name: options.compCodeId,
                        type: 'csList'
                    }, options.language.company, function(r) {}) != true) {
                    return false;
                }
            }
            //報表格式為必要欄位
            if (checkControlMustBe({
                    name: options.typeListId,
                    type: 'csList'
                }, options.language.inType, function(r) {}) != true) {
                return false;
            }
            return true;
        } catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    }
    //離開
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).csWindow('close');
            }
        } catch (err) {
            errorHandle(formName, 'close', err);
        }
    }
    function conditionToData(data) {
        var condition = {
            condition: {
                columns: [],
                rows: [{}]
            }
        };
        var rows = data[Object.keys(data)[0]].rows;
        for (var i = 0; i < rows.length; i++) {
            var name = rows[i]['fieldName'.toUpperCase()];
            var value = rows[i]['fieldValue'.toUpperCase()];
            condition.condition.columns.push({
                name: name,
                type: 'string'
            });
            var row = condition.condition.rows[0];
            row[name] = value;
        }
        return condition;
    }
})(jQuery);
