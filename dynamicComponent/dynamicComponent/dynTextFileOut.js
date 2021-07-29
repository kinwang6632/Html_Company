(function ($) {
    var formName = 'dynTextFileOut';
    var riadllName = 'CableSoft.RIA.Dynamic.TextFileOut.Web.dll';
    var riaClassName = 'CableSoft.RIA.Dynamic.TextFileOut.Web.TextFileOut';
    var endCompId = "comp";
    var endPanelId = "panel";
    var endCondtionId = "cond";
    var endButtonId = "btn";
    var endLinkProgramId = "likp";
    var buttonHeight = 25;
    var msaterTableName = "OutMaster";
    var detailTableName = "OutDetail";
    var compTableName = "CanChooseComp";

    $.fn.dynTextFileOut = function (options, param, params2) {
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
                        options: $.extend({}, new defaults(), new dynTextFileOut(), options)
                    });
                    init(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynTextFileOut', err);
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
            var options = $.data(div, formName).options;
            var divId = $(div).prop('id');
            getControlObject(div, endCompId).css({ height: buttonHeight + 2 });
            getControlObject(div, endPanelId).jqxPanel({ height: $(div).height() - buttonHeight * 2 - 8 });
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
        var options = $.data(div, formName).options;
        disableAllControls(options.controls, flag, revertStatus);
    }
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
    //取得設定檔內容
    function getSettingData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var parameters = $.extend({}, paraLoginInfo, {
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
            options.programId = options.settingData[msaterTableName].rows[0]['PROGRAMID'];
            options.sysProgramId = options.settingData[msaterTableName].rows[0]['SYSPROGRAMID'];
            options.condProgId = options.settingData[msaterTableName].rows[0]['CONDPROGID'];
            options.showPreviousType = options.settingData[msaterTableName].rows[0]['ShowPreviousType'.toUpperCase()];

            createBody(div);
            //建立可選公司別/登入格式
            createCompany(div);
            //建立動態條件
            // if the item that is only one  then select it automatically.
           
            createCoditions(div);
            //建立按鈕
            createButtons(div);
            //if ($("#" + $(div).prop('id') + 'typel').jqxDropDownList('getItems').length == 1) {
            //    $("#" + $(div).prop('id') + 'typel').jqxDropDownList('selectIndex', 0);
            //};
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
    function chkCompSelected(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { SysProgramId: { type: 'string', value: options.sysProgramId } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkAuthority',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {

                            if ($.isFunction(act)) { act(true) };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical, null, function (flag) {
                                if ($.isFunction(act)) { act(false) };
                            });

                        };
                    } catch (err) {
                        errorHandle(formName, 'ChkAuthority-Server', err);
                        addHandler(div);

                    } finally {
                        parameters = null;
                        params = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete params;
                    };
                }
            });

        } catch (err) {
            errorHandle(formName, 'chkCompSelected', err);
        } finally {

        };
    };
    //建立公司別
    function createCompany(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var headData = settingData[msaterTableName];
            var canChooseComp = headData.rows[0]['CanChooseComp'.toUpperCase()];
            if (canChooseComp == 0) {
                return;
            }
            var companyData = settingData[compTableName];
            var textFileOut = settingData[detailTableName];

            var compContainerId = $(div).prop('id') + endCompId;
            //當等於1時為 csList 
            if (canChooseComp == 1) {
                var compCodeId = compContainerId + '_1';
                $('<div style="float:left;margin-top:6px;">' + options.language.company + '</div>').appendTo($('#' + compContainerId));
                $('<div id = "' + compCodeId + '" style="float:left;margin-left:5px;"></div>').appendTo($('#' + compContainerId));
                $("#" + compCodeId).csList({
                    source: companyData.rows,
                    codeNoWidth: 70,
                    width: 200,
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
                    var currentComp = options.loginInfo.loginInfo.rows[0].compcode;
                    options.loginInfo.loginInfo.rows[0].compcode = $('#' + compCodeId).csList('codeNo');
                    //$('#' + compCodeId).off('selectedIndexChanged');
                    chkCompSelected(div, function(r) {
                        if (r) {
                            companyChange(div, $('#' + compCodeId).csList('codeNo'),
                            function (flag) {
                                if (flag == false) {
                                    $('#' + compCodeId).attr('data-disableChange', true);
                                    $('#' + compCodeId).csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                                    $('#' + compCodeId).removeAttr('data-disableChange');
                                   }
                                }
                            );
                        } else {
                            $('#' + compCodeId).attr('data-disableChange', true);
                            $('#' + compCodeId).csList('codeNo', currentComp);
                            options.loginInfo.loginInfo.rows[0].compcode = currentComp;
                            $('#' + compCodeId).removeAttr('data-disableChange');
                        };
                    })
                    
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
                                }
                            );
                        }
                        catch (err) {
                            errorHandle(formName, "createCompany_click", err);
                        }
                    });

                }
            }
            var inTypeId = $(div).prop('id') + 'type';
            var inType = $('<div id="' + inTypeId + '"></div>').appendTo($('#' + compContainerId));
            var typeListId = $(div).prop('id') + 'typel';
            $('<div style="float:left;margin-left:10px;margin-top:6px;">' + options.language.inType + '</div>').appendTo($('#' + inTypeId));
            $('<div id = "' + typeListId + '" style="float:left;margin-left:5px;"></div>').appendTo($('#' + inTypeId));
            var source =
                {
                    datatype: "json",
                    datafields: [
                        { name: 'CAPTION' }
                    ],
                    localdata: textFileOut.rows,
                    async: true
                };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#" + typeListId).jqxDropDownList({
                source: dataAdapter,
                displayMember: "CAPTION",
                valueMember: "AUTOSERIALNO",
                width: 300,
                height: buttonHeight,
                theme: options.theme,
                placeHolder: options.localization.filterchoosestring
            });

            options.controls.push({
                name: typeListId, type: 'jqxDropDownList', level: 1
            });
           
           
            
            $('#' + typeListId).on('select', function (event) {
                var args = event.args;
                if (args) {
                    var idx = args.index;
                    var field = "FormatItem";
                    options.item = idx;
                     options.autoSerialNo = textFileOut.rows[idx]['AutoSerialNo'.toUpperCase()];
                    //options.autoSerialNo = textFileOut.rows[idx]['AutoSerialNo'.toUpperCase()];
                    $('#' + $(div).prop('id') + endCondtionId + "_0").dynamicCondition('valueChange', field, idx +1, function (r) {

                    });
                }
            });
           
            //$('#' + typeListId).jqxDropDownList('selectItem', 0);
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
                            } else if (control.type == 'dynLinkProgram') {
                                $('#' + control.name)[control.type]('destroy');
                                controls[i] = null;
                            };
                            /*
                            else if (control.parent == 'button') {
                                $('#' + control.name)[control.type]('destroy');
                                controls[i] = null;
                            }; */
                        }
                        
                    };
                    $('#' + $(div).prop('id') + endButtonId).children().remove();
                    //$('#' + $(div).prop('id') + condPanelId).children().remove();
                    $('#' + $(div).prop('id') + endCondtionId).children().remove();
                 
                    options.controls = controls.filter(function (e) { return e });
                    //重建動態條件及i秘書
                    createCoditions(div);
                    createButtons(div);
                    $('#' + typeListId).off('select');
                    
                    var source =
                           {
                               datatype: "json",
                               datafields: [
                                   { name: 'CAPTION' }
                               ],
                               localdata: options.settingData[detailTableName].rows,
                               async: true
                           };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    var typeListId = $(div).prop('id') + 'typel';
                    $('#' + typeListId).jqxDropDownList('clear');
                    $("#" + typeListId).jqxDropDownList({ source: dataAdapter });
                    $('#' + typeListId).on('select', function (event) {
                        var args = event.args;
                        if (args) {
                            var idx = args.index;
                            var field = "FormatItem";
                            options.item = idx;
                            options.autoSerialNo = options.settingData[detailTableName].rows[idx]['AutoSerialNo'.toUpperCase()];
                            //options.autoSerialNo = textFileOut.rows[idx]['AutoSerialNo'.toUpperCase()];
                            $('#' + $(div).prop('id') + endCondtionId + "_0").dynamicCondition('valueChange', field, idx + 1, function (r) {
                               
                            });
                        }
                    });
                    /*
                    $('#' + childId).one('loaded', function (event) {
                        if ($("#" + $(div).prop('id') + 'typel').jqxDropDownList('getItems').length == 1) {
                            $("#" + $(div).prop('id') + 'typel').jqxDropDownList('selectIndex', 0);
                        };
                    }); */
                    /*
                    if ($("#"  + typeListId).jqxDropDownList('getItems').length == 1) {
                        //$("#" + typeListId).jqxDropDownList('selectIndex', 0);
                    }; */
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
            delete settingData[msaterTableName];
            delete settingData[detailTableName];

            var realConditionId = $(div).prop('id') + endCondtionId;
            var childId = realConditionId + "_0";
            $('<div id = "' + childId + '"></div>').appendTo($('#' + realConditionId));
            $('#' + childId).css('width', '100%');
            $('#' + childId).css('height', '100%');
            var keys = Object.keys(settingData);
            var table = settingData[keys[0]];
            $('#' + childId).one('loaded', function (event) {
                if ($("#" + $(div).prop('id') + 'typel').jqxDropDownList('getItems').length == 1) {
                    $("#" + $(div).prop('id') + 'typel').jqxDropDownList('selectIndex', 0);
                };
            });
            $('#' + childId).dynamicCondition($.extend({}, {
                loginInfo:cloneJSON( options.loginInfo),
                sysProgramId: table.rows[0]['CondProgId'.toUpperCase()],
               // sysProgramId: table.rows[0]['PROGRAMID'.toUpperCase()],
                settingData: cloneJSON(settingData),
                localization:cloneJSON( options.localization),
                theme: options.theme,
                refNo: options.refNo,
                editMode:options.editMode,
                disableMessage: true,
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

            var buttonOptions = {
                width: width,
                height: buttonHeight,
                theme: options.theme
            };
            var buttons = [okId, exitId];
            var images = [imageScr.ok, imageScr.exit];
            var langs = [language.btnOk, language.btnExit]
            buttonOptions = $.extend({}, imagePosition, buttonOptions);
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
            }
            $('<div id="' + $(div).prop('id') + endLinkProgramId + '"></div>').appendTo($('#' + buttonsId));
            $('#' + $(div).prop('id') + endLinkProgramId).dynLinkProgram($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: options.container,
                parentProgramId: options.sysProgramId,
                showPreviousType: options.showPreviousType,
                localization: cloneJSON(options.localization),
                buttonHeight: buttonHeight,
                conditionId : $(div).prop('id') + endCondtionId + "_0",
                theme: options.theme
            }));
            options.controls.push({ name: $(div).prop('id') + endLinkProgramId, type: 'dynLinkProgram', level: 2 });
            /*
            $('#' + $(div).prop('id') + endLinkProgramId).on('beforeButtonClick', function (e) {
                getControlObject(div, endCondtionId + "_0").dynamicCondition('getQueryData', function (args) {
                    e.args.cancel = (args[0] == false);
                    if (args[0] == false) {
                        if (e.args.noCondition != true) {
                            messageBox(args[1]);
                        }
                        return;
                    }
                    else {
                        var conditionData = args[2];
                        $('#' + $(div).prop('id') + endLinkProgramId).dynLinkProgram({ conditionData: conditionData });
                    }
                });
            }); */

            //當按下確定按鈕
            $('#' + okId).on('click', function () {
                try {
                    if ($(this).jqxButton('disabled')) { return; }
                    if (isDataOk(div) == false) return;
                    //$('#' + okId).jqxButton({ disabled: true });
                    getControlObject(div, endCondtionId + "_0").dynamicCondition('getQueryData', function (args) {
                        if (args[0] == false) {
                            messageBox(args[1], null, null, function () {
                                $('#' + args[2].name)[args[2].type]('focus')
                            });
                            $('#' + okId).jqxButton({ disabled: false });
                            return;
                        }
                        else {
                            var conditionData = args[2];
                            deleteLogButton(div);
                            execute(div, conditionData, function (isOk, code, file, msg) {
                                delete conditionData;
                                if (isOk == true) {
                                    createLogButton(div, file);
                                    messageBox(options.language.executeOk + '\r\n' + msg);
                                    options.isSaved = true;
                                }
                                else if (code == -1) {
                                    messageBox(msg);
                                }
                                else {
                                    messageBox(options.language.executeError.replace('{0}', msg), messageType.critical);
                                }
                                $('#' + okId).jqxButton({ disabled: false });
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
                if ($(this).jqxButton('disabled')) { return; }
                close(div);
            });
            return true;
        }
        catch (err) {
            errorHandle(formName, "createButtons", err);
        }
    };
    function isDataOk(div) {
        var options = $.data(div, formName).options;
        var typeListId = $(div).prop('id') + 'typel';
        var value = $('#' + typeListId).jqxDropDownList('getSelectedIndex');
        if (value == null || value < 0) {
            showMustBe(options.language.inType, function () {
                $('#' + typeListId).jqxDropDownList('focus');
            });
            return false;
        }
        return true;
    }
    function deleteLogButton(div) {
        try {
            var options = $.data(div, formName).options;
            var logFileId = $(div).prop('id') + 'btnLogFile';
            var dlId = $(div).prop('id') + 'adl';
            var logFileObj = getRowByKeyValue(options.controls, 'name', logFileId);
            if (logFileObj != null) {
                $('#' + logFileId).jqxButton('destroy');
                $('#' + dlId).remove();
                options.controls = deleteRowByKeyValue(options.controls, 'name', logFileId);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, "createButtons", err);
        }
    }
    function createLogButton(div, fileName) {
        try {
            if (isEmpty(fileName)) return;
            //cancel to create the logbutton by kin
            //return;

            var options = $.data(div, formName).options;
            var dlId = $(div).prop('id') + 'adl';
            var logFileId = $(div).prop('id') + 'btnLogFile';
            var buttonsId = $(div).prop('id') + endButtonId;
            var width = Math.floor($('#' + buttonsId).width() / 3);
            if (width > 120) { width = 120; }
            $('<a id="' + dlId + '" href="' + fileName + '" download></a>').appendTo($('#' + buttonsId));
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
            $("#" + logFileId).hide();
            $("#" + logFileId).click();
            deleteLogButton(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, "getUploadFile", err);
        }
    }
    function execute(div, conditionData, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var timeout = options['settingData'][msaterTableName].rows[0]['RIATIMEOUT'];
            if (timeout == null || timeout == 0) timeout = 600;
            var parameters = $.extend({}, paraLoginInfo, {
                sysProgramId: { type: 'string', value: options.sysProgramId },
                autoSerialNo: { type: 'integer', value: options.autoSerialNo },
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
                        action(true, data.ErrorCode, data.DownloadFileName, data.ResultXML.split(';')[1]);
                    }
                    else {
                        action(false, data.ErrorCode, null, data.ErrorMessage);
                    }
                }
            }, timeout);
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