(function ($) {
    var formName = 'checkManagerPWD';
    var riadllName = 'CableSoft.SO.RIA.Wip.Install.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.Install.Web.Install';
    var buttonsHeight = 24;
    var textHeight = 23;

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
                    //cccc(this,options);
                }
                else {
                    $.data(this, formName, {
                        options: $.extend({}, new defaults(), new checkManagerPWD(), options)
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
        this.localization = null;
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
            getControlObject(div, 'gbxAll').css({ 'height': $(div).height() - buttonsHeight - 4 });
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
            //options.loginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function (r) {
                            try {
                                buttonAddHandler(div);
                                frmAddHandler(div);
                                $(div).triggerHandler('loaded');
                            }
                            catch (err) {
                                errorHandle(formName, 'formLoaded_success_init', err);
                            }
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
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
            if ($(options.container).hasClass('jqx-window') > 0) {
                $(options.container).on('winClosing', function (e) {
                    close(div)
                });
            }
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
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div, formName);
            renderControl(div);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            formResize(div);
            clearValue(div);
            action(true);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function clearValue(div) {
        try {
            setTimeout(function () {
                getControlObject(div, "tUserId").jqxInput("val", "");
                getControlObject(div, "tPWD").jqxPasswordInput("val", "");
            }, 250);
            getControlObject(div, "tUserId").jqxInput('focus');
        }
        catch (err) {
            errorHandle(formName, 'init', err);
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
            $(div).css('overflow', 'hidden');
            //$(div).css('padding', 2);
            //建立input
            oArray = ["tUserId"];
            oWidthArray = ["70%", "70%"];
            oDisabled = [false, false];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxInput({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: oDisabled[i]
                });
                controls.push({ name: iId, type: 'jqxInput', level: level });
            }
            //建立input
            oArray = ["tPWD"];
            oWidthArray = ["69%", "70%"];
            oDisabled = [false, false];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxPasswordInput({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: oDisabled[i]
                });
                controls.push({ name: iId, type: 'jqxPasswordInput', level: level });
            }
            //建立按鈕
            oArray = ['btnOk', 'btnExit'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var height = buttonsHeight;
                var text = lang[oArray[i]];
                var disabled = false;
                switch (oArray[i]) {
                    case "btnOk":
                        img = imageScr.execute;
                        break;
                    case "btnExit":
                        img = imageScr.exit;
                        break;
                    default:
                }
                o.text(text);
                var bOptions = $.extend({}, {
                    theme: options.theme,
                    width: width,
                    height: height,
                    disabled: disabled
                }, img);
                if (isEmpty(text) != true) {
                    bOptions = $.extend({}, bOptions, imagePosition);
                }
                o.jqxButton(bOptions);
                controls.push({ name: bId, type: 'jqxButton', level: level });
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //確定
            getControlObject(div, 'btnOk').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (isDataOk(div) != true) { return; }
                execute(div, function (isOk, msg) {
                    if (!isOk) {
                        if (isEmpty(msg) != true) {
                            messageBox(msg, messageType.critical);
                        }
                        return;
                    }
                    options.isSaved = true;
                    getControlObject(div, 'btnExit').triggerHandler('click');
                })
            });
            getControlObject(div, 'btnExit').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                close(div);
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    //必要欄位判斷
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var names = ["tUserId", "tPWD"];
            var types = ["jqxInput", "jqxPasswordInput"];
            var langs = [lang.lUserId, lang.lPWD];
            //檢核使用者代號,使用者密碼
            for (var i = 0; i < names.length; i++) {
                if (checkControlMustBe({ name: $(div).prop("id") + names[i], type: types[i] }, langs[i]) != true) {
                    return false;
                };
            }
            //檢核長度
            var r = checkTextMaxLength(options.controls);
            if (r[0] != true) return false;
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
            return false;
        }
    };
    function getExecuteData(div) {
        try {
            var options = $.data(div, formName).options;
            var rows = [];
            var data = {
                data: {
                    columns: [
                        { name: "USERID", type: "string" },
                        { name: "PWD", type: "string" }], rows: rows
                }
            };
            var userId = getControlObject(div, "tUserId").jqxInput('val');
            var pwd = getControlObject(div, "tPWD").jqxPasswordInput('val');
            rows.push({ USERID: userId, PWD: pwd });
            return data;
        }
        catch (err) {
            errorHandle(formName, 'getExecuteData', err);
            return false;
        }
    }
    //執行
    function execute(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var data = getExecuteData(div);
            var parameters = $.extend({}, paraLoginInfo, {
                data: { type: 'string', value: data }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'CheckManagerPWD',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ResultBoolean == true) {
                        action(true);
                    }
                    else {
                        action(false, data.ErrorMessage);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'execute', err);
        }
    };
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if ($(options.container).hasClass('jqx-window')) {
                $(options.container).csWindow('close');
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    }
})(jQuery);