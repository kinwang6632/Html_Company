(function ($) {
    var formName = 'dynamicConditionSave';
    var endCondtionId = "cond";
    var endButtonId = "btn";
    var buttonHeight = 25;

    $.fn[formName] = function (options, param, params2, params3) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, params2, params3);
                }
                else {
                    if ($("#" + $(this).prop('id') + endCondtionId + "_0").length > 0) {
                        return $("#" + $(this).prop('id') + endCondtionId + "_0").dynamicCondition(options, param, params2, params3);
                    }
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
                        options: $.extend({}, new defaults(), new dynamicCondition(), options)
                    });
                    init(this);
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
        setTheme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        canAppend: function (jq, params, param2) {
            param2([true]);
            return true;
        },
        canEdit: function (jq, params, param2) {
            param2([true]);
            return true;
        },
        canView: function (jq, params, param2) {
            param2([true]);
            return true;
        },
        canDelete: function (jq, params, param2) {
            param2([true]);
            return true;
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
            var condHeight = $(div).height() - buttonHeight - 4;
            getControlObject(div, endCondtionId).jqxPanel({ height: condHeight });
            getControlObject(div, endCondtionId + "_0").dynamicCondition("resize");
            getControlObject(div, endButtonId).css({ height: buttonHeight + 2 });
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
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    function init(div) {
        try {
            var options = $.data(div, formName).options;
            addHandlerGetParameters(div, options);
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
            refresh(div, loaded);
        }
        catch (err) {
            errorHandle(formName, 'refresh', err);
        }
    };
    //更新 Condition Grid
    function refresh(div, action) {
        try {
            createBody(div);
            //建立動態條件
            createCoditions(div, function () {
                //建立按鈕
                createButtons(div);
                action(true);
            });
        }
        catch (err) {
            errorHandle(formName, "refresh", err);
        }
    };
    //建立動態查詢瀏覽Body
    function createBody(div) {
        try {
            var options = $.data(div, formName).options;
            var condId = $(div).prop('id') + endCondtionId;
            var buttonId = $(div).prop('id') + endButtonId;
            $(div).css('overflow', 'hidden');
            $('<div id="' + condId + '" style="padding:2px;"></div>').appendTo($(div));
            $('<div id="' + buttonId + '" style="padding-top:1px;"></div>').appendTo($(div));
            //建立Panel
            $('#' + condId).jqxPanel({
                theme: options.theme,
                height: $(div).height() - buttonHeight * 3 - 12,
                width: "99.5%",
                //sizeMode: "wrap"
                autoUpdate: true
            });
            options.controls.push({ name: condId, type: 'jqxPanel', level: 0 });
            return true;
        }
        catch (err) {
            errorHandle(formName, "createBody", err);
        }
    };
    //建立動態條件
    function createCoditions(div, action) {
        try {
            var options = $.data(div, formName).options;

            var realConditionId = $(div).prop('id') + endCondtionId;
            var childId = realConditionId + "_0";
            $('#' + realConditionId).jqxPanel("append", $('<div id = "' + childId + '"></div>'));
            //$('<div id = "' + childId + '"></div>').appendTo($('#' + realConditionId));
            $('#' + childId).css('width', '100%');
            $('#' + childId).css('height', '100%');
            options.conditionId = childId;
            $('#' + childId).on('loaded', action);
            $('#' + childId).dynamicCondition($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                sysProgramId: options.sysProgramId,
                localization: options.localization,
                theme: options.theme,
                parameters: cloneJSON(options.parameters),
                parentDataTableName: options.parentDataTableName,
                conditionData: options.conditionData,
                //disableMessage: true,
                editMode: options.editMode,
                refNo: options.refNo,
                container: options.container
            }));
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
            var saveId = buttonsId + 'save';
            var exitId = buttonsId + 'exit';

            var buttonOptions = {
                width: width,
                height: buttonHeight,
                theme: options.theme
            };
            var buttons = [saveId, exitId];
            var images = [imageScr.save, imageScr.exit];
            var langs = [language.btnSave, language.btnExit]
            buttonOptions = $.extend({}, buttonOptions, imagePosition);
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
                options.controls.push({ name: buttons[i], type: 'jqxButton', level: 2 });
                $('#' + buttons[i]).find("img").css('top', (buttonOptions.height - $('#' + buttons[i]).find("img").height()) / 2 - 1);

            }
            if (options.editMode == editMode.view) {
                $('#' + saveId).css("display", "none");
                getControlObject(div, endCondtionId + "_0").dynamicCondition('disableAll', true);
            }
            else {
                //當按下存檔按鈕
                $('#' + saveId).on('click', function () {
                    try {
                        if ($(this).jqxButton('disabled')) { return; }
                        disableAllControls(div, true, true);
                        getControlObject(div, endCondtionId + "_0").dynamicCondition('getQueryData', function (args) {
                            if (args[0] == false) {
                                //messageBox(args[1]);
                                disableAllControls(div, false, true);
                                return;
                            }
                            else {
                                if (isDataOk(div, args[2]) != true) { return; }
                                options.isSaved = true;
                                options.saveData = args[2];
                                close(div);
                            }
                        });
                    }
                    catch (err) {
                        errorHandle(formName, saveId + "_Click", err);
                    }
                });
            }
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
    //檢核PK是否重複
    function isDataOk(div, conditionData) {
        try {
            var options = $.data(div, formName).options;
            var all = options.parameters[options.parentDataTableName + "_ALL"];
            var table = options.parameters[options.parentDataTableName];
            var tPKFields = [];
            var headFields = [];
            if (all != null) {
                for (var i = 0; i < all.columns.length; i++) {
                    if (all.columns[i]["isPK"] == true) {
                        tPKFields.push(all.columns[i].name);
                    }
                }
            }
            //檢核PK
            if (tPKFields.length > 0) {
                var pkValues = [];
                var PKFields = [];
                var dupMsg = function (headFields, pkValues) {
                    var msg = [];
                    for (var m = 0; m < headFields.length; m++) {
                        msg.push(headFields[m] + ":" + pkValues[m]);
                    }
                    messageBox(options.language.dupData.replace("{0}", msg.join(",")));
                }
                for (var i = 0; i < conditionData.condition.rows.length; i++) {
                    for (var j = 0; j < tPKFields.length; j++) {
                        if (tPKFields[j] == conditionData.condition.rows[i]["FIELDNAME"].toUpperCase().replace("_1", "")) {
                            PKFields.push(tPKFields[j]);
                            pkValues.push(conditionData.condition.rows[i]["FIELDVALUE"]);
                            headFields.push(conditionData.condition.rows[i]["HEADNAME"].split(",")[1]);
                        }
                    }
                }
                if (options.editMode == editMode.append) {
                    var row = getRowByKeyValue(all, PKFields, pkValues);
                    if (row != null) {
                        dupMsg(headFields, pkValues);
                        return;
                    }
                }
                else {
                    if (table != null && table.rows.length > 0) {
                        var oValues = [];
                        for (var j = 0; j < PKFields.length; j++) {
                            oValues.push(table.rows[0][PKFields[j]]);
                        }
                        var oIdx = getRowIndexByKeyValue(all, PKFields, oValues);
                        var nIdx = getRowIndexByKeyValue(all, PKFields, pkValues);
                        if (oIdx != nIdx && nIdx > 0) {
                            dupMsg(headFields, pkValues);
                            return;
                        }
                    }
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, "isDataOk", err);
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
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };
})(jQuery);