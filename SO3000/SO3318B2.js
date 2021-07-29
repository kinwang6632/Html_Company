(function ($) {
    var formName = 'SO3318B2';
    var riadllName = 'CableSoft.SO.RIA.Billing.CounterPay.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.CounterPay.Web.CounterPay';
    var buttonsHeight = 25;
    var textHeight = 25;

    $.fn.SO3318B2 = function (options, param, param2) {
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
                        options: $.extend({}, new defaults(), new SO3318B2(), options)
                    });
                }
                formLoaded(this);
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3318B2', err);
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
        this.doCardLastNoFocus = false;

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

            if (data['BillNo'.toUpperCase()] != null) {
                options.billNo = data['BillNo'.toUpperCase()];
            };
            if (data['MediaBillNo'.toUpperCase()] != null) {
                options.mediaBillNo = data['MediaBillNo'.toUpperCase()];
            };
            if (data['CarrierTypeCode'.toUpperCase()] != null) {
                options.carrierTypeCode = data['CarrierTypeCode'.toUpperCase()];
            };
            if (data['CarrierId1'.toUpperCase()] != null) {
                options.carrierId1 = data['CarrierId1'.toUpperCase()];
            };
            if (data['LoveNum'.toUpperCase()] != null) {
                options.loveNum = data['LoveNum'.toUpperCase()];
            };
            if (data['CardLastNo'.toUpperCase()] != null) {
                options.cardLastNo = data['CardLastNo'.toUpperCase()];
            };
            
            //2018.03.20 調整加傳版本loadForm
            loadForm(options,
                'SO3000\\' + 'SO3318B2' + '.html',
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
                                getControlObject(div, 'tCarrierId1').jqxInput('disabled', true);
                                getControlObject(div, 'csCarrierTypeCode').csList('source', options.parameters.CarrierType.rows);
                                if (isEmpty(options.carrierTypeCode) == false) {
                                    getControlObject(div, 'csCarrierTypeCode').csList('codeNo', options.carrierTypeCode);
                                    getControlObject(div, 'tCarrierId1').jqxInput('disabled', false);
                                };                                
                                //getControlObject(div, 'csCarrierTypeCode').csList('setDisplayValue', { CODENO: options.carrierTypeCode });
                                //getControlObject(div, 'csCarrierTypeCode').csList('selectedIndex', 0);
                                if (isEmpty(options.carrierId1) == false) { getControlObject(div, 'tCarrierId1').jqxInput('val', options.carrierId1); };
                                if (isEmpty(options.loveNum) == false) { getControlObject(div, 'tLoveNum').jqxInput('val', options.loveNum); };
                                if (isEmpty(options.cardLastNo) == false) { getControlObject(div, 'tCardLastNo').jqxInput('val', options.cardLastNo); };

                                listAddHandler(div);
                                //if (options.doCardLastNoFocus == true) { document.getElementById('lCardLastNo').style.color = "Red"; } //getControlObject(div, 'tCardLastNo').css('color', '#FF0000'); };
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
    //listAddHandler
    function listAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //客戶載具類別代碼
            getControlObject(div, 'csCarrierTypeCode').on('selectedIndexChanged', function (r) {
                try {
                    var value = $(this).csList('codeNo');
                    if (IsNullOrEmpty(value)) {
                        getControlObject(div, 'tCarrierId1').jqxInput('disabled', true);
                        getControlObject(div, 'tCarrierId1').jqxInput('val', null);
                    }
                    else {
                        getControlObject(div, 'tCarrierId1').jqxInput('disabled', false);
                    };
                }
                catch (err) {
                    errorHandle(formName, 'selectedIndexChanged', err);
                }
            });

            //return true;
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
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
            oArray = ["csCarrierTypeCode"];
            oWidthArray = ["80%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 60,
                    width: 260,
                });
                controls.push({ name: iId, type: 'csList', level: level });
            };
            level += 1;

            //建立input
            oArray = ['tCarrierId1', 'tLoveNum', 'tCardLastNo'];
            oWidthArray = [64,10,4];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxInput({
                    theme: options.theme,
                    height: textHeight,
                    width: 160,
                    maxLength: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'jqxInput', level: level });
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

            if (options.doCardLastNoFocus == true) {
                if (convertToNull(getControlObject(div, 'tCardLastNo').val()) == null) {
                    messageBox(lang.cardLastNotNull,messageType.critical);
                    return;
                };
            };
            if (convertToNull(getControlObject(div, 'csCarrierTypeCode').csList('codeNo')) != null && convertToNull(getControlObject(div, 'tCarrierId1').val()) == null) {
                messageBox(lang.carrierId1NotNull,messageType.critical);
                return;
            };

            //執行存檔
            save(div, function (isOk, msg) {
                if (isOk == true) {
                    options.isSaved = true;
                    close(div);
                }
                else {
                    messageBox(msg,messageType.critical);
                    options.isSaved = false;
                    //close(div);
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
            var codeNo = convertToNull(getControlObject(div, 'csCarrierTypeCode').csList('codeNo'));
            var description = convertToNull(getControlObject(div, 'csCarrierTypeCode').csList('description'));
            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {
                CarrierTypeCode: { type: 'string', value: convertToNull(codeNo) },
                CarrierTypeName: { type: 'string', value: convertToNull(description) },
                CarrierId1: { type: 'string', value: convertToNull(getControlObject(div, 'tCarrierId1').val()) },
                LoveNum: { type: 'string', value: convertToNull(getControlObject(div, 'tLoveNum').val()) },
                CardLastNo: { type: 'string', value: convertToNull(getControlObject(div, 'tCardLastNo').val()) },
                BillNo: { type: 'string', value: convertToNull(options.billNo) },
                MediaBillNo: { type: 'string', value: convertToNull(options.mediaBillNo) },
                Para: { type: 'string', value: JSON.stringify(options.paraData) },
                InitData: { type: 'string', value: JSON.stringify(options.parameters) }
            });

            var params = getParameters(riadllName, riaClassName, 'SaveCustData', JSON.stringify(parameters));
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