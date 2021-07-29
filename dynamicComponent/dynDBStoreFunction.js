(function ($) {
    var formName = 'dynDBStoreFunction';
    var riadllName = 'CableSoft.RIA.Dynamic.DBStoreFunction.Web.dll';
    var riaClassName = 'CableSoft.RIA.Dynamic.DBStoreFunction.Web.DBStoreFunction';
    var endCompId = "comp";
    var endPanelId = "panel";
    var endCondtionId = "cond";
    var endButtonId = "btn";
    var endLinkProgramId = "likp";
    var buttonHeight = 25;
    var dbStoreFunctionTableName = "DBStoreFunction";
    var compTableName = "CanChooseComp";

    //動態後端 執行完成後 呼叫 "動態報表"
    // 因為有勾選多張工單列印，可能一張報表列印或2張報表列印
    //1.動態條件 CheckBox 需要設定 SO1101B.ChooseQuery (objectType = 31)
    //  Select 'TEST01' ProgramId , 1 ProType From Dual
    //  ProgramId=>動態報表功能名稱   ProType:1 =>呼叫動態報表
    //原理: 動態條件功能設定需要列印的報表名稱，動態後端執行完畢後，
    //      呼叫動態按鈕執行列印dynLinkProgram("executeByProgramId")。(簡單說明:左手接右手丟)

    $.fn.dynDBStoreFunction = function (options, param, params2) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, params2);
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
                        options: $.extend({}, new defaults(), new dynDBStoreFunction(), options)
                    });
                    init(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynDBStoreFunction', err);
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
        canView: function (jq, params, param2) {
            if ($.isFunction(param2)) { param2([true, null]); };
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
        this.showPreviousType = 0;
        this.HeightCompCode = 0;
    });
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };

    //canView,canAppend,canEdit,canDelete,canPrint 參考比照dynamicUpdate.js的寫法。methods也依樣。
    function canView(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };function canAppend(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };function canEdit(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };function canDelete(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    }; function canPrint(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };


    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var divId = $(div).prop('id');
            getControlObject(div, endCompId).css({ height: HeightCompCode + 2 });
            getControlObject(div, endPanelId).jqxPanel({ height: $(div).height() - buttonHeight - HeightCompCode - 8 });
            getControlObject(div, endCondtionId).css({ height: getControlObject(div, endPanelId).height() });
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
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            if (options == null || options.length == 0) { return; }
            var controls = options.controls;
            destroyControls(controls);
            deleteJSONObject(options);
            //options.length = 0;
            //options = null;
            $.data(div, formName, null);
            //$(div).remove();
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
                getDBSFSetting(div, function (flag) {
                    if (flag == true) {
                        refresh(div, loaded);
                    }
                });
            }
            frmAddHandler(div);
        }
        catch (err) {
            errorHandle(formName, 'refresh', err);
        }
    };

    function frmAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).on('winClosing', function (e) {
                    close(div)
                });
            }
            $(options.container).on('keydown', function (e) {
                try {
                    if (e.ctrlKey && e.which == 119) {
                        messageBox(JSON.stringify(options, null, '\t'), messageType.information, null, null, { width: 800, height: 500 });
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
    function getDBSFSetting(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var parameters = $.extend({}, paraLoginInfo, {
                SystemProgramId: { type: 'string', value: options.sysProgramId }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetDBSFSetting',
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
            errorHandle(formName, 'getDBSFSetting', err);
        }
    };
    //更新 Condition Grid
    function refresh(div, action) {
        try {
            var options = $.data(div, formName).options;
            options.programId = options.settingData[dbStoreFunctionTableName].rows[0]['PROGRAMID'];
            options.sysProgramId = options.settingData[dbStoreFunctionTableName].rows[0]['SYSPROGRAMID'];
            options.condProgId = options.settingData[dbStoreFunctionTableName].rows[0]['CONDPROGID'];
            options.showPreviousType = options.settingData[dbStoreFunctionTableName].rows[0]['ShowPreviousType'.toUpperCase()];

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

            $('<div id="' + compId + '"></div>').appendTo($(div));
            $('<div id="' + condPanelId + '" style="margin-top:2px;"></div>').appendTo($(div));
            $('<div id="' + condId + '" style="padding:2px;"></div>').appendTo($('#' + condPanelId));
            $('<div id="' + buttonId + '" style="padding-top:1px;"></div>').appendTo($(div));
            //建立Panel
            $('#' + condPanelId).jqxPanel({
                theme: options.theme,
                height: $(div).height() - buttonHeight * 2 - 8,
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
            }
            getControlObject(div, compId).css({ width: '99%', height: buttonHeight + 2 });
            getControlObject(div, condId).css({ width: '99%', height: getControlObject(div, condPanelId).height() });
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
            var headData = settingData[dbStoreFunctionTableName];
            var canChooseComp = headData.rows[0]['CanChooseComp'.toUpperCase()];
            HeightCompCode=buttonHeight;
            if (canChooseComp == 0) {
                HeightCompCode = 0;
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
                    width: 200,
                    height: buttonHeight,
                    onlyDropDown:true,
                    theme: options.theme
                });
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
            getDBSFSetting(div, function (flag) {
                if (flag == true) {
                    //清除動態條件/Button
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
                            else if (control.parent == 'button') {
                                $('#' + control.name)[control.type]('destroy');
                                controls[i] = null;
                            }
                        }
                    }
                    options.controls = controls.filter(function (e) { return e });
                    //重建動態條件/Button
                    createCoditions(div);
                    createButtons(div);
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
            delete settingData[dbStoreFunctionTableName];

            var realConditionId = $(div).prop('id') + endCondtionId;
            var childId = realConditionId + "_0";
            $('<div id = "' + childId + '"></div>').appendTo($('#' + realConditionId));
            $('#' + childId).css('width', '100%');
            $('#' + childId).css('height', '100%');
            var keys = Object.keys(settingData);
            var table = settingData[keys[0]];
            $('#' + childId).dynamicCondition($.extend({}, {
                loginInfo: options.loginInfo,
                programId: table.rows[0]['CondProgId'.toUpperCase()],
                parameters: options.parameters,
                //sysProgramId: table.rows[0]['sysProgramId'.toUpperCase()],
                settingData: settingData,
                localization: options.localization,
                theme: options.theme,
                //disableMessage: true,
                container: div
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
    }
    //建立按鈕
    function createButtons(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var language = options.language;
            var buttonsId = $(div).prop('id') + endButtonId;

            var width = Math.floor($('#' + buttonsId).width() / 3);
            if (width > 120) { width = 120; }
            var okId = buttonsId + 'ok';
            var exitId = buttonsId + 'exit';
            var clearId = buttonsId + 'clear';

            var buttonOptions = {
                width: width,
                height: buttonHeight,
                theme: options.theme
            };
            var buttons = [okId, exitId];
            var images = [imageScr.ok, imageScr.exit];
            var langs = [language.btnOk, language.btnExit]
            buttonOptions = $.extend({}, imagePosition, buttonOptions);

            var linkId = $(div).prop('id') + endLinkProgramId;
            removeControl(div, linkId);
            for (var i = 0 ; i < buttons.length; i++) {
                removeControl(div, buttons[i]);
            }
            $('#' + buttonsId).children().remove();
            
            for (var i = 0 ; i < buttons.length; i++) {
                $('<input type="button" value="' + langs[i] + '" id="' + buttons[i] + '"/>').appendTo($('#' + buttonsId));
                $("#" + buttons[i]).jqxButton($.extend({}, images[i], buttonOptions));
                if (buttons[i] == exitId) {
                    $("#" + buttons[i]).css('float', 'right');
                }
                else {
                    $("#" + buttons[i]).css('float', 'left');
                }
                $("#" + buttons[i]).css('margin-right', 1);
                options.controls.push({ name: buttons[i], type: 'jqxButton', level: 2 });
                $("#" + buttons[i]).find('img').css({ top: 1 });
            }
            $('<div id="' + $(div).prop('id') + endLinkProgramId + '"></div>').appendTo($('#' + buttonsId));
            $('#' + $(div).prop('id') + endLinkProgramId).dynLinkProgram($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: options.container,
                parentProgramId: options.sysProgramId,
                showPreviousType: options.showPreviousType,
                localization: options.localization,
                buttonHeight: buttonHeight,
                conditionId: $(div).prop('id') + endCondtionId + "_0", //2017.09.12
                theme: options.theme
            }));
            options.controls.push({ name: $(div).prop('id') + endLinkProgramId, type: 'dynLinkProgram', level: 2 });
            //2017.09.12 通知修改 
            //  將原本把動態條件的id 傳給dynLinkProgram , beforeButtonClick 委派拿掉。
            //  上面呼叫 dynLinkProgram 增加傳送 conditionId
            //$('#' + $(div).prop('id') + endLinkProgramId).on('beforeButtonClick', function () {
            //    getControlObject(div, endCondtionId + "_0").dynamicCondition('getQueryData', function (args) {
            //        args.cancel = (args[0] == false);
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
            //當按下確定按鈕
            $('#' + okId).on('click', function () {
                try {
                    getControlObject(div, endCondtionId + "_0").dynamicCondition('getQueryData', function (args) {
                        if (args[0] == false) {
                            //messageBox(args[1]);
                            return;
                        }
                        else {
                            var conditionData = args[2];
                            execute(div, conditionData, function (isOk, msg) {
                                if (isOk == true) {
                                    messageBox(msg, messageType.information , null, function (r) {
                                        callLinkProgram(div, conditionData, function (r) {
                                            delete conditionData;
                                        });
                                    });
                                    //messageBox(options.language.executeOk);
                                    options.isSaved = true;
                                }
                                else {
                                    messageBox(options.language.executeError.replace('{0}', msg), messageType.critical);
                                    return;
                                }
                            });
                        }
                    });

                }
                catch (err) {
                    errorHandle(formName, "btnOk_Click", err);
                }
            });
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
    function callLinkProgram(div, conditionData, action) {
        try {
            var options = $.data(div, formName).options;
            var condition = conditionData["condition"];
            var linkPs = [];
            for (var i = 0 ; i < condition.rows.length; i++) {
                if (condition.rows[i]["OBJECTTYPE"] == 31 && condition.rows[i]["FIELDVALUE"] == "1") {
                    linkPs.push(condition.rows[i])
                }
            }
            for (var i = 0 ; i < linkPs.length; i++) {
                var valueArray = linkPs[i]["FIELDVALUE2"].split(",");
                var programId = "";
                var proType = 0;
                for (var j = 0 ; j < valueArray.length; j++) {
                    var sValue = valueArray[j].split("=");
                    if (sValue[0] == "PROGRAMID") {
                        programId = convertToNull(sValue[1]);
                    }
                    if (sValue[0] == "PROTYPE") {
                        proType = Number(sValue[1]);
                    }
                }
                $.fn.dynLinkProgram("executeByProgramId", options, proType, programId, conditionData,
                    function (r) {
                        action(r);
                    }
                );
            }
        }
        catch (err) {
            errorHandle(formName, "callLinkProgram", err);
        }
    }
    function execute(div, conditionData, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var oTableName = Object.keys(conditionData)[0];
            var timeout = options['settingData'][dbStoreFunctionTableName].rows[0]['RIATIMEOUT'];
            if (timeout == null || timeout == 0) timeout = 600;
            //增加execConditionData傳入執行， 為了讓conditionData保留原始直
            var execConditionData = cloneJSON(conditionData);
            execConditionData['conditionData'.toUpperCase()] = execConditionData[oTableName];
            delete execConditionData[oTableName];
            var parameters = $.extend({}, paraLoginInfo, {
                sysProgramId: { type: 'string', value: options.sysProgramId },
                condProgId: { type: 'string', value: options.condProgId },
                conditionData: { type: 'string', value: JSON.stringify(execConditionData) }
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
                        action(true, data.ErrorMessage);
                    }
                    else {
                        action(false, data.ErrorMessage);
                    }
                }
            }, timeout, null, options.container);
        }
        catch (err) {
            errorHandle(formName, 'execute', err);
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