(function ($) {
    var formName = 'dynExecBatch';
    var riadllName = 'CableSoft.RIA.Dynamic.DynExecBatch.Web.dll';
    var riaClassName = 'CableSoft.RIA.Dynamic.DynExecBatch.Web.DynExecBatch';
    var endCompId = "comp";
    var endPanelId = "panel";
    var endCondtionId = "cond";
    var endButtonId = "btn";
    var endLinkProgramId = "likp";
    var buttonHeight = 25;
    var dynExecTableName = "DynExecBatch";
    var compTableName = "CanChooseComp";

    $.fn.dynExecBatch = function (options, param, params2, params3) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, params2, params3);
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
                        options: $.extend({}, new defaults(), new dynExecBatch(), options)
                    });
                    init(this);
                    frmAddHandler(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynExecBatch', err);
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
        executeButton: function (jq, params, params2, params3) {
            return jq.each(function () {
                executeButton(this, params, params2, params3);
            });
        },
        canView: function (jq, params, param2) {
            if ($.isFunction(param2)) { param2([true, null]); };
            //return canView(params, param2);
        },
        canAppend: function (jq, params, param2) {
            if ($.isFunction(param2)) { param2([true, null]); };

        },
        canEdit: function (jq, params, param2) {
            if ($.isFunction(param2)) { param2([true, null]); };
        },
        canDelete: function (jq, params, param2) {
            if ($.isFunction(param2)) { param2([true, null]); };
        },
        canPrint: function (jq, params, param2) {
            if ($.isFunction(param2)) { param2([true, null]); };
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
        this.linkButtonShowMsg = true;
        this.hideButton = false;
    });
    function canAppend(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };
    function canView(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };
    function canEdit(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };
    function canDelete(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };
    function canPrint(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };

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
            var options = $.data(div, formName).options;
            var divId = $(div).prop('id');
            var settingData = options.settingData;
            var headData = settingData[dynExecTableName];
            var canChooseComp = headData.rows[0]['CanChooseComp'.toUpperCase()];
            var heightLen;
            if (canChooseComp != 0) {
                //heightLen = $(div).height() - buttonHeight * 2 - 8;
                getControlObject(div, endCompId).css({ height: buttonHeight + 2 });
                getControlObject(div, endPanelId).jqxPanel({ height: $(div).height() - buttonHeight * 2 - 8 });
                getControlObject(div, endCondtionId).css({ height: getControlObject(div, endPanelId).height() });
            }
            else {
                heightLen = $(div).height() - buttonHeight - 6;
                getControlObject(div, endPanelId).jqxPanel({ height: heightLen });
                getControlObject(div, endCondtionId).css({ height: heightLen });
            };

            getControlObject(div, endButtonId).css({ height: buttonHeight + 2 });
            var controls = options.controls;
            for (var i = 0; i < controls.length; i++) {
                var o = $('#' + controls[i].name);
                o.each(function () {
                    $(this)[controls[i].type]('resize');
                });
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
            deleteJSONObject(options);
            $.data(div, formName, null);

            //if ($.data(div, formName) == null) { return; }
            //var options = $.data(div, formName).options;
            //if (options == null || options.length == 0) { return; }
            //var controls = options.controls;
            //destroyControls(controls);
            //options.length = 0;
            //options = null;
            //$.data(div, formName, null);
            ////$(div).remove();
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    function init(div) {
        try {
            var options = $.data(div, formName).options;
            var sysProgramId = options.sysProgramId;
            var settingData = options.settingData;
            if (sysProgramId == null) {
                messageBox("no programId!!", messageType.critical);
                return;
            }
            addHandlerGetParameters(options.container, options);
            var loaded = (function () {
                $(options.container).on('resize', function () {
                    formResize(div);
                });
                formResize(div);
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
                getSettingData(div, function (flag) {
                    if (flag == true) {
                        refresh(div, loaded);
                    }
                });
            }

        }
        catch (err) {
            errorHandle(formName, 'refresh', err);
        }
    };
    function frmAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            $(options.container).on('keydown', function (e) {
                try {
                    if (e.ctrlKey && e.which == 119) {
                        messageBox(JSON.stringify(options, null, '\t'), null, null, null, { width: 800, height: 500 });
                    }
                }
                catch (err) {
                    errorHandle(formName, 'frmAddHandler_keydown', err, true);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'frmAddHandler', err);
        }
    };
    //取得設定檔內容
    function getSettingData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var parameters = $.extend({}, paraLoginInfo, {
                ProgramId: { type: 'string', value: null },
                SystemProgramId: { type: 'string', value: options.sysProgramId }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetSettingData',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
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
            errorHandle(formName, 'getSettingData', err);
        }
    };
    //更新 Condition Grid
    function refresh(div, action) {
        try {
            var options = $.data(div, formName).options;
            options.programId = options.settingData[dynExecTableName].rows[0]['PROGRAMID'];
            options.sysProgramId = options.settingData[dynExecTableName].rows[0]['SYSPROGRAMID'];
            options.condProgId = options.settingData[dynExecTableName].rows[0]['CONDPROGID'];
            options.showPreviousType = options.settingData[dynExecTableName].rows[0]['ShowPreviousType'.toUpperCase()];

            createBody(div);
            //建立可選公司別
            createCompany(div);
            //建立動態條件
            createCoditions(div);
            //建立按鈕
            createButtons(div);
            action(true);
        }
        catch (err) {
            errorHandle(formName, "refresh", err);
        }
    };
    //建立動態查詢瀏覽Body
    function createBody(div) {
        try {
            var options = $.data(div, formName).options;

            var compId = $(div).prop('id') + endCompId;
            var condPanelId = $(div).prop('id') + endPanelId;
            var condId = $(div).prop('id') + endCondtionId;
            var buttonId = $(div).prop('id') + endButtonId;

            var settingData = options.settingData;
            var headData = settingData[dynExecTableName];
            var canChooseComp = headData.rows[0]['CanChooseComp'.toUpperCase()];
            var heightLen;
            if (canChooseComp != 0) {
                heightLen = $(div).height() - buttonHeight * 2 - 8;
                $('<div id="' + compId + '"></div>').appendTo($(div));
            }
            else {
                heightLen = $(div).height() - buttonHeight - 6;
            };
            $('<div id="' + condPanelId + '" style="margin-top:2px;"></div>').appendTo($(div));
            $('<div id="' + condId + '" style="padding:2px;"></div>').appendTo($('#' + condPanelId));
            $('<div id="' + buttonId + '" style="padding-top:1px;"></div>').appendTo($(div));
            //建立Panel
            $('#' + condPanelId).jqxPanel({
                theme: options.theme,
                height: heightLen,
                width: "100%",
                //sizeMode: "wrap"
                autoUpdate: true
            });
            options.controls.push({ name: condPanelId, type: 'jqxPanel', level: 0 });
            var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
            for (var j = 0; j < scrollBars.length; j++) {
                if ($('#' + condPanelId + scrollBars[j]).length > 0) {
                    $('#' + condPanelId + scrollBars[j]).css('display', 'none');
                }
            };
            if (canChooseComp != 0) {
                getControlObject(div, compId).css({ width: '99%', height: buttonHeight + 2 });
                getControlObject(div, condId).css({ width: '99%', height: getControlObject(div, condPanelId).height() });
            }
            else {
                getControlObject(div, condId).css({ width: '99%', height: heightLen });
            };
            
            getControlObject(div, buttonId).css({ width: '99%', height: buttonHeight + 2 });
            return true;
        }
        catch (err) {
            errorHandle(formName, "createBody", err);
        }
    };
    //建立公司別
    function createCompany(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var headData = settingData[dynExecTableName];
            var canChooseComp = headData.rows[0]['CanChooseComp'.toUpperCase()];
            if (canChooseComp == 0) {
                return;
            }
            var companyData = settingData[compTableName];;

            var compContainerId = $(div).prop('id') + endCompId;
            //當等於1時為 csList 
            if (canChooseComp == 1) {
                var compCodeId = compContainerId + '_1';
                $('<div style="float:left;margin-top:5px;">' + options.language.company + '</div>').appendTo($('#' + compContainerId));
                $('<div id = "' + compCodeId + '" style="float:left;margin-top:1px;margin-left:5px;"></div>').appendTo($('#' + compContainerId));
                $("#" + compCodeId).csList({
                    source: companyData.rows,
                    codeNoWidth: 70,
                    width: 260,
                    height: buttonHeight,
                    theme: options.theme                   
                });
                $("#" + compCodeId).csList('onlyDropDown', true);
                options.controls.push({
                    name: compCodeId, type: 'csList', level: 1
                })
                $('#' + compCodeId).csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                $('#' + compCodeId).on('selectedIndexChanged', function () {
                    if ($('#' + compCodeId).attr('data-disableChange') != null) return;
                    companyChange(div, $('#' + compCodeId).csList('codeNo'),
                        function (flag) {
                            if (flag == false) {
                                $('#' + compCodeId).attr('data-disableChange', true);
                                $('#' + compCodeId).csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                                $('#' + compCodeId).removeAttr('data-disableChange');
                            }
                            else {
                                var e = $.Event("companyChange");
                                $(div).triggerHandler(e);
                            };
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
                for (var i = 0 ; i < rowLength; i++) {
                    var buttonId = compContainerId + '_' + companyData.rows[i]['CODENO'];
                    $('<input style="margin:1px;max-width:120px;min-width:60px;" type="button" value="' + companyData.rows[i]['DESCRIPTION'] + '" id="' + buttonId + '"/>').appendTo($('#' + compContainerId));
                    $('#' + buttonId).jqxButton({
                        height: buttonHeight,
                        width: heightPercent + '%',
                        theme: options.theme
                    });
                    $("#" + compCodeId).csList('onlyDropDown', true);
                    if (options.loginInfo.loginInfo.rows[0].compcode == companyData.rows[i]['CODENO']) {
                        $('#' + buttonId).css('background-color', clickColor);
                    }
                    else {
                        unClickColor = $('#' + buttonId).css('background-color');
                    }
                    options.controls.push({
                        name: buttonId, type: 'jqxButton', level: 1, parentId: compContainerId
                    })
                    var setButtonColor = function (btn) {
                        for (var i = 0 ; i < options.controls.length; i++) {
                            if (options.controls[i] != null && options.controls[i].parentId == compContainerId) {
                                $('#' + options.controls[i].name).css('background-color', unClickColor);
                            }
                        }
                        $(btn).css('background-color', clickColor);
                    }
                    $('#' + buttonId).on('click', function () {
                        try {
                            var compId = $(this).prop('id').split('_')[$(this).prop('id').split('_').length - 1];
                            setButtonColor(this);
                            companyChange(div, compId,
                                function (flag) {
                                    if (flag == false) {
                                        setButtonColor('#' + compContainerId + '_' + options.loginInfo.loginInfo.rows[0].compcode)
                                    }
                                    else {
                                        var e = $.Event("companyChange");
                                        $(div).triggerHandler(e);
                                    };
                                }
                            );
                        }
                        catch (err) {
                            errorHandle(formName, "createCompany_click", err);
                        }
                    });

                }
            }

        }
        catch (err) {
            errorHandle(formName, "createCompany", err);
        }
    }
    function companyChange(div, compCode, action) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var oCompCode = options.loginInfo.loginInfo.rows[0]['compcode'];
            options.loginInfo.loginInfo.rows[0]['compcode'] = compCode;
            getSettingData(div, function (flag) {
                if (flag == true) {
                    formDisplay(div, false);
                    //清除動態條件及i秘書
                    for (var j = 5; j >= 0; j--) {
                        for (var i = 0; i < controls.length; i++) {
                            var control = controls[i];
                            if (control == null || j != control.level) { continue; }
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
                    options.controls = controls.filter(function (e) { return e });
                    //重建動態條件及i秘書
                    createCoditions(div);
                    createButtons(div);
                    formDisplay(div, true);
                    action(true);
                }
                else {
                    options.loginInfo.loginInfo.rows[0]['compcode'] = oCompCode;
                    action(false);
                }
            });
        }
        catch (err) {
            errorHandle(formName, "companyChange", err);
        }
    }
    //建立動態條件
    function createCoditions(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = cloneJSON(options.settingData);
            delete settingData[compTableName];
            delete settingData[dynExecTableName];

            var realConditionId = $(div).prop('id') + endCondtionId;
            var childId = realConditionId + "_0";
            $('<div id = "' + childId + '"></div>').appendTo($('#' + realConditionId));
            $('#' + childId).css('width', '100%');
            $('#' + childId).css('height', '100%');
            $('#' + childId).css('overflow', 'auto');
            var keys = Object.keys(settingData);
            var table = settingData[keys[0]];
            $('#' + childId).dynamicCondition($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                programId: table.rows[0]['CondProgId'.toUpperCase()],
                //sysProgramId: table.rows[0]['sysProgramId'.toUpperCase()],
                parameters: cloneJSON(options.parameters),
                settingData: cloneJSON(settingData),
                localization: cloneJSON(options.localization),
                theme: options.theme,
                //disableMessage: true,
                container: div,
                editMode: options.editMode,
                refNo: options.refNo
            }));
            $('#' + childId).dynamicCondition('resize');
            options.controls.push({
                name: childId, type: 'dynamicCondition', level: 2
            });

            return true;
        }
        catch (err) {
            errorHandle(formName, "createCoditions", err);
        }
    };

    function removeControl(div, controlId) {
        try {
            var options = $.data(div, formName).options;
            if ($("#" + controlId).length > 0) {
                var control = getRowByKeyValue(options.controls, "name", controlId);
                $('#' + controlId)[control.type]("destroy");
                options.controls = deleteRowByKeyValue(options.controls, "name", controlId);
            }
        }
        catch (err) {
            errorHandle(formName, "removeControl", err);
        }
    };
    //建立按鈕
    function createButtons(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;

            var language = options.language;
            var buttonsId = $(div).prop('id') + endButtonId;
            var linkId = $(div).prop('id') + endLinkProgramId;
            var okId = buttonsId + 'ok';
            var exitId = buttonsId + 'exit';

            var buttons = [okId, exitId];
            var images = [imageScr.ok, imageScr.exit];
            var langs = [language.btnOk, language.btnExit]

            removeControl(div, linkId);
            for (var i = 0 ; i < buttons.length; i++) {
                removeControl(div, buttons[i]);
            }
            $('#' + buttonsId).children().remove();

            var width = Math.floor($('#' + buttonsId).width() / 3);
            if (width > 120) { width = 120; }

            var buttonOptions = {
                width: width,
                height: buttonHeight,
                theme: options.theme
            };
            buttonOptions = $.extend({}, imagePosition, buttonOptions);

            for (var i = 0 ; i < buttons.length; i++) {
                $('<button id="' + buttons[i] + '">' + langs[i] + '</button>').appendTo($('#' + buttonsId));
                $("#" + buttons[i]).jqxButton($.extend({}, images[i], buttonOptions));
                if (buttons[i] == exitId) {
                    $("#" + buttons[i]).css('float', 'right');
                }
                else {
                    $("#" + buttons[i]).css('float', 'left');
                }
                $("#" + buttons[i]).css('margin-right', 1);
                //2018.08.06
                $('#' + buttons[i]).find('img').css('top', (buttonHeight - $('#' + buttons[i]).find("img").height()) / 2 - 1);
                $('#' + buttons[i]).find('span').css({ top: 4 });

                options.controls.push({ name: buttons[i], type: 'jqxButton', level: 2 });
            }
            $('<div id="' + linkId + '"></div>').appendTo($('#' + buttonsId));
            $('#' + linkId).dynLinkProgram($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: options.container,
                parentProgramId: options.sysProgramId,
                showPreviousType: options.showPreviousType,
                localization: cloneJSON(options.localization),
                buttonHeight: buttonHeight,
                conditionId: $(div).prop('id') + endCondtionId + "_0",
                theme: options.theme
            }));
            options.controls.push({ name: linkId, type: 'dynLinkProgram', level: 2 });
            //$('#' + linkId).on('beforeButtonClick', function (e) {
            //    getControlObject(div, endCondtionId + "_0").dynamicCondition('getQueryData', function (args) {
            //        e.args.cancel = (args[0] == false);
            //        if (args[0] == false) {
            //            //messageBox(args[1]);
            //            return;
            //        }
            //        else {
            //            var conditionData = args[2];
            //            $('#' + $(div).prop('id') + endLinkProgramId).dynLinkProgram({ conditionData: conditionData });
            //        }
            //    });
            //});
            if (options.hideButton == true) {
                $('#' + okId).css("display", "none");
            }
            else {
                //當按下確定按鈕
                $('#' + okId).on('click', function () {
                    try {
                        if ($(this).jqxButton('disabled')) { return; }
                        executeButton(div, true, function (isOK, msg) {
                        });
                    }
                    catch (err) {
                        errorHandle(formName, "btnOk_Click", err);
                    }
                });
            }
            //當按下離開按鈕
            $('#' + exitId).on('click', function () {
                close(div);
            });
            return true;
        }
        catch (err) {
            errorHandle(formName, "createButtons", err);
        }
    };
    //新增加function跟2系列共用
    function executeButton(div, showMsg, action,inData) {
        try {
            var options = $.data(div, formName).options;

            getControlObject(div, endCondtionId + "_0").dynamicCondition('getQueryData', function (args) {
                if (args[0] == false) {
                    action([false, -1, args[1]]);
                    return;
                }
                else {
                    var conditionData = args[2];
                    //inData合併放進conditionData
                    if (inData != null) {
                        $.extend(conditionData, inData);
                    };
                    execute(div, conditionData, function (isOk, msg, logName, code) {
                        delete conditionData;
                        if (isOk == true) {
                            if (showMsg == true) {
                                createLogButton(div, logName);
                                messageBox(msg);
                                options.isSaved = true;
                            };
                            action([true, code, msg, logName]);
                        }
                        else {
                            if (showMsg == true) {
                                messageBox(options.language.executeError.replace('{0}', msg), messageType.critical);
                            };
                            //return;
                            action([false, code, msg, logName]);
                        }
                    });
                }
            });
        }
        catch (err) {
            errorHandle(formName, "executeButton", err);
        }
    };
    function execute(div, conditionData, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var oTableName = Object.keys(conditionData)[0];
            var timeout = options['settingData'][dynExecTableName].rows[0]['RIATIMEOUT'];
            if (timeout == null || timeout == 0) timeout = 600;
            conditionData['conditionData'.toUpperCase()] = conditionData[oTableName];
            delete conditionData[oTableName];
            var parameters = $.extend({}, paraLoginInfo, {
                programId: { type: 'string', value: options.programId },
                conditionData: { type: 'string', value: JSON.stringify(conditionData) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'Execute',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    parameters.length = 0;
                    parameters = null;
                    delete parameters;
                    delete tData;
                    if (data.ResultBoolean == true) {
                        //action(true);
                        action(true, data.ErrorMessage, data.DownloadFileName, data.ErrorCode);
                    }
                    else {
                        //action(false, data.ErrorMessage);
                        action(false, data.ErrorMessage, data.DownloadFileName, data.ErrorCode);
                    }
                }
            }, timeout);
        }
        catch (err) {
            errorHandle(formName, 'execute', err);
        }
    };
    function createLogButton(div, fileName) {
        try {
            var options = $.data(div, formName).options;
            var dlId = $(div).prop('id') + 'adl';
            var logFileId = $(div).prop('id') + 'btnLogFile';
            var buttonsId = $(div).prop('id') + endButtonId;
            var logFileObj = getRowByKeyValue(options.controls, 'name', logFileId);
            if (logFileObj != null) {
                $('#' + logFileId).jqxButton('destroy');
                $('#' + dlId).remove();
                options.controls = deleteRowByKeyValue(options.controls, 'name', logFileId);
            }
            if (isEmpty(fileName)) return;
            var width = Math.floor($('#' + buttonsId).width() / 3);
            if (width > 120) { width = 120; }
            //$('<a id="' + dlId + '" href="' + fileName + '" download></a>').appendTo($('#' + buttonsId));
            $('<a id="' + dlId + '" target="_blank" href="' + fileName + '" download></a>').appendTo($('#' + buttonsId));
            $('<input type="button" value="' + options.language.btnLogFile + '" id="' + logFileId + '"/>').appendTo($('#' + dlId));
            var buttonOptions = {
                width: width,
                height: buttonHeight,
                theme: options.theme
            };
            $("#" + logFileId).jqxButton($.extend({}, buttonOptions));
            $("#" + logFileId).css('float', 'left');
            $("#" + logFileId).css('margin-right', 1);
            options.controls.push({ name: logFileId, type: 'jqxButton', level: 2 });
        }
        catch (err) {
            errorHandle(formName, "getUploadFile", err);
        }
    };

    //離開
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).csWindow('close');
            }            
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };
    function conditionToData(data) {
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
    };
})(jQuery);