(function ($) {
    var formName = 'SO3318B1';
    var riadllName = 'CableSoft.SO.RIA.Billing.CounterPay.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.CounterPay.Web.CounterPay';
    var buttonsHeight = 25;
    var textHeight = 25;

    $.fn.SO3318B1 = function (options, param, param2) {
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
                        options: $.extend({}, new defaults(), new SO3318B1(), options)
                    });
                }
                formLoaded(this);
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3318B1', err);
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
        this.initData = {};
        this.parentData = {};
        this.localization = null;
        this.container = null;
        this.close = {};
        this.chargeData = {};
        this.chargeRow = null;
        this.listPTCode = {};
        this.paraData = {};

    });
    //formResize
    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var height = $(div).height() - buttonsHeight - 3;
            getControlObject(div, 'gbxTop').jqxPanel({ height: height });
            getControlObject(div, 'gbxSpBottom').css({ height: buttonsHeight + 2 });
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    //formClosed
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed'](options.returnValue);
        };
        $(options['container']).csWindow('close');
    };
    //formDestroy
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            destroyControls(controls);
            var options = $.data(div, formName).options;
            $(options.container).off("resize." + $(div).prop('id'));
            $(options.container).off('winClosing.' + $(div).prop('id'));
            deleteJSONObject(options);
            $.data(div, formName, null);

            return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    //parameter
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
                };
                //$($(div).find('[data-id=codeno]')[0])
            };
        }
        catch (err) {
            errorHandle(formName, 'setParameter', err);
        }
    };
    //formLoaded
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            //options.loginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            var data = options.chargeRow;

            if (data['Custid'.toUpperCase()] != null) {
                options.custId = data['Custid'.toUpperCase()];
            };
            if (data['BillNo'.toUpperCase()] != null) {
                options.billNo = data['BillNo'.toUpperCase()];
            };
            if (data['Item'.toUpperCase()] != null) {
                options.item = data['Item'.toUpperCase()];
            };
            //2018.03.20 調整加傳版本loadForm
            loadForm(options,
                'SO3000\\' + 'SO3318B1' + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function (d) {
                            if (d == true) {
                                formResize(div);
                                //載入button事件
                                buttonAddHandler(div);
                                frmAddHandler(div);

                                getControlObject(div, 'csPTCode').csList('source', options.listPTCode.rows);
                                getControlObject(div, 'csPTCode').csList('selectedIndex', 0);

                                //$(div).trigger('loaded');
                                $(div).trigger('loaded', [this, options]);
                            }
                            else {
                                return;
                            };
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
    //getParaLoginInfo
    function getParaLoginInfo(div) {
        var options = $.data(div, formName).options;
        var li = cloneJSON(options.loginInfo);
        return $.extend({}, { loginInfo: { type: 'logininfo', value: li.loginInfo } });
    };
    //語系檔
    function changeLanguage(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //var lang = $.data(div, formName).options.language;
            var keys = Object.keys(lang);
            var kLength = keys.length;
            //改label
            for (var i = 0 ; i < kLength; i++) {
                var o = $('#' + $(div).prop('id') + keys[i]);
                if (o.length > 0 && keys[i].substr(0, 1) == 'l') {
                    o.text(lang[keys[i]]);
                };
            };
        }
        catch (err) {
            errorHandle(formName, 'changeLanguage', err);
        }
        //alert(JSON.stringify($.data(div, formName).options.language));
    };
    //getControlObject
    function getControlObject(div, name) {
        try {
            return $('#' + $(div).prop('id') + name);
        }
        catch (err) {
            errorHandle(formName, 'getControlObject', err);
        }
    };
    //render畫面元件
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
            //$(div).css('padding', 2);
            //隱藏灰色卷軸
            $(div).css('overflow', 'hidden');

            //建立Panel
            oArray = ["gbxTop", "gbxBottom"];
            //var oHightArray = ["120", "30"];
            //var oHightArray = ["80%", "20%"];
            var oHightArray = [$(div).height() - buttonsHeight - 3, buttonsHeight + 2];
            var oWidthArray = ["99.8%", "99.8%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxPanel({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    //sizeMode: "wrap",
                    autoUpdate: true
                });
                //$('#' + iId).jqxExpander('setHeaderContent', lang[oArray[i]]);
                controls.push({ name: iId, type: 'jqxPanel', level: level });
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        //$('#' + iId + scrollBars[j]).remove();
                        $('#' + iId + scrollBars[j]).css('display', 'none');
                    };
                };
            };
            level += 1;

            //建立單選元件
            oArray = ["csPTCode"];
            oWidthArray = ["80%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 60,
                    width: oWidthArray[i],
                });
                controls.push({ name: iId, type: 'csList', level: level });
            };
            level += 1;

            //建立按鈕
            oArray = ["btnSave", "btnExit"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 80;
                var text = lang[oArray[i]];
                switch (oArray[i]) {
                    case "btnSave":
                        img = imageScr.save; break;
                    case "btnExit":
                        img = imageScr.exit; break;
                    default:
                };
                o.text(text);
                o.jqxButton($.extend({}, img, imagePosition, {
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                }));
                $('#' + bId).find('img').css('top', (buttonsHeight - $('#' + bId).find("img").height()) / 2 - 1);
                controls.push({ name: bId, type: 'jqxButton', level: level });
            };
            level += 1;


            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    //init
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            $(options.container).on('resize.' + $(div).prop('id'), function () {
                formResize(div);
            });

            //語系檔
            changeLanguage(div);
            //render畫面元件
            renderControl(div);

            action(true);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    //frmAddHandler
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
    //載入button事件
    function buttonAddHandler(div) {
        var options = $.data(div, formName).options;
        var lang = options.language;
        //存檔
        getControlObject(div, 'btnSave').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; };
            var ccValue = convertToNull(getControlObject(div, 'csPTCode').csList('selectedItem'));
            if (isEmpty(ccValue) == true) {
                messageBox(lang.needPTCode, messageType.critical, null, function () {
                    return;
                });
                return;
            };

            //執行存檔
            save(div, function (isOk, msg) {
                if (isOk == true) {
                    options.isSaved = true;
                    close(div);
                }
                else {
                    //messageBox(msg, messageType.critical, null, function () {
                        options.isSaved = false;
                        close(div);
                    //});
                }
            });
        });
        //取消
        getControlObject(div, 'btnExit').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            options.isSaved = false;
            //關閉CSWindow
            close(div);
        });
    };
    //執行存檔
    function save(div, action) {
        try {
            var options = $.data(div, formName).options;
            var codeNo = convertToNull(getControlObject(div, 'csPTCode').csList('codeNo'));
            var description = convertToNull(getControlObject(div, 'csPTCode').csList('description'));
            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {
                PTCode: { type: 'integer', value: convertToNull(codeNo) },
                PTName: { type: 'string', value: convertToNull(description) },
                BillNo: { type: 'string', value: convertToNull(options.billNo) },
                Item: { type: 'integer', value: convertToNull(options.item) },
                Para: { type: 'string', value: JSON.stringify(options.paraData) }
            });

            var params = getParameters(riadllName, riaClassName, 'EditPTData', JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters)
                    deleteJSONObject(options.paraData)
                    parameters.length = 0;
                    parameters = null;
                    delete parameters;
                    if (data.ResultBoolean == true) {
                        options.chargeData = JSON.parse(data.ResultXML);
                        options.isSaved = true;
                        action(true);
                    }
                    else {
                        action(false, data.ErrorMessage);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'save', err);
        };
    };
    //關閉CSWindow
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                if (options.isSaved != true) {
                    //messageBox("OK", messageType.yesno, null, function (flag) {
                    //    if (flag == 'yes') {
                    $(options.container).csWindow('close');
                    //    };
                    //});
                }
                else {
                    $(options.container).csWindow('close');
                };
            };
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };

})(jQuery);