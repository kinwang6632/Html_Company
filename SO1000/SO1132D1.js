(function ($) {
    var formName = 'SO1132D1';
    var riadllName = 'CableSoft.SO.RIA.Billing.ProduceMediaBillNo.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.ProduceMediaBillNo.Web.dsProduceMediaBillNo';
    var buttonsHeight = 28;
    var mediaBillNoTableName = 'BillCombine'; //ProduceMediaBillNo
    var contactTableName = "Contact";
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
                        options: $.extend({}, new defaults(), new SO1132D1(), options)
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
        getControlObject(div, 'btnOk').find('span').css('top', '6px');

        return;
    };
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            destroyControls(controls);
            var options = $.data(div, formName).options
            options.length = 0;
            options = null;
            $.data(div, formName, null);
            $(div).off();
            //$(div).remove();
            return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    function checkParameters(data) {
        try {
            //檢核table 存不存在
            var table = mediaBillNoTableName;
            if (data[table] == null) return ([false, 'table ' + table + ' not exist!!']);
            //檢核客戶編號
            if (data[table].rows[0]['CustId'.toUpperCase()] == null) {
                return ([false, 'column custid not exist!!']);
            }
            return ([true]);
        }
        catch (err) {
            errorHandle(formName, 'checkParameters', err);
        }
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            $.ajax({
                url: 'SO1000\\' + formName + '.html',
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            frmAddHandler(div);
                            buttonAddHandler(div);
                            $(div).triggerHandler('loaded');
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    var param = options;
                    if (param['loadError']) {
                        param['loadError'](xhr, ajaxOptions, thrownError);
                    }
                    else {
                        messageBox('error status:' + xhr.status + ', thrownError:' + thrownError, messageType.critical);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
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
            var oo = checkParameters(options.parameters);
            if (oo[0] == false) {
                getControlObject(div, 'btnOk').jqxButton('disabled');
                messageBox(oo[1]);
                action(false);   
            } else {
                action(true);   
            }
        }
        catch (err) {
            errorHandle(formName, 'init', err);
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
            $(div).css('padding', 2);
            $(div).css('overflow', 'hidden');
            //建立按鈕
            oArray = ['btnOk'];
            oLength = oArray.length;
            for (var i = 0; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var text = lang[oArray[i]];
                switch (oArray[i]) {
                    case "btnOk":
                        img = imageScr.ok;
                        break;
                    case "btnCancel":
                        img = imageScr.exit;
                        break;
                }
                o.text(text);
                o.jqxButton($.extend({}, img, imagePosition, {
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                }));
                controls.push({ name: bId, type: 'jqxButton', level: level });
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function frmAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.container != null && $(options.container).attr('class') != undefined) {
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    $(options.container).on('winClosing', function (e) {
                        close(div);
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
    function buttonAddHandler(div) {
        var options = $.data(div, formName).options;
        //存檔
        getControlObject(div, 'btnOk').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            execute(div, function (isOk, msg) {
                if (isOk == true) {
                    messageBox(options.language.executeOk + '\n' + msg, null, null, function () {
                    });
                    options.isSaved = true;
                }
                else {
                    messageBox(options.language.executeError.replace('{0}', msg), messageType.critical);
                    return;
                }
                close(div);
            });
        });
    };
    function execute(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                DS: { type: 'string', value: JSON.stringify(options.parameters) },
                ReAtmNo: { type: 'boolean', value: true }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'Execute',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    if (data != undefined && data.ErrorCode == 0) {
                        if (data.ResultBoolean == true) {
                            action(true, data.ResultXML);
                        }
                        else {
                            action(false, data.ErrorMessage);
                        }
                    } else {
                        if (typeof data === 'string') {
                            messageBox(data, messageType.critical);
                        } else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    }
                }
            }, 600);
        }
        catch (err) {
            errorHandle(formName, 'execute', err);
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