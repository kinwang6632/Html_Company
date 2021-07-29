//介紹媒介
(function ($) {
    var formName = 'SO1144B9';
    var riadllName = 'CableSoft.SO.RIA.Order.Edit.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Order.Edit.Web.NewOrderEdit';
    var textHeight = 23;
    var buttonsHeight = 25;
    var wipTableName = "Wip";
    var queryMediaCodeTableName = "QueryMediaCode";
    var queryBulletinCodeTableName = "QueryBulletinCode";
    var introTableName = 'QueryIntro';
    var parameterTableName = "Parameter";
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
                        options: $.extend({}, new defaults(), new SO1144B9(), options)
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
        },
        getMediaData: function (jq) {
            return getMediaData(jq[0]);
        },
        isDataOk: function (jq) {
            return isDataOk(jq[0]);
        },
        disabled: function (jq, params) {
            return jq.each(function () {
                disabled(this, params);
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
        this.theme = $.jqx.theme;
        this.localization = null;
        this.container = null;

        this.orderData = null;
        this.initData = {};
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
            var controls = options.controls;
            for (var i = 0; i < controls.length; i++) {
                if (controls[i].type.indexOf('jqxSplitter') >= 0) {
                }
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
                            listAddHandler(div);
                            textAddHandler(div);
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
    function frmAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.container != null) {
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    $(options.container).on('winClosing', function (e) {
                        close(div)
                    });
                }
                addHandlerGetParameters(options.container, options);
            }
            else {
                addHandlerGetParameters(div, options);
            }
        }
        catch (err) {
            errorHandle(formName, 'frmAddHandler', err);
        }
    };
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var paraRows = options.parameters[parameterTableName].rows;
            var mediaData = getMediaData(div);
            for (var i = 0; i < paraRows.length; i++) {
                var wipRows = options.orderData[wipTableName].rows;
                for (var j = 0; j < wipRows.length; j++) {
                    if (paraRows[i]['SERVICETYPE'] == wipRows[j]['SERVICETYPE']) {
                        if (paraRows[i]['CHECKMEDIA'] > 0 && mediaData['mediaCode'] == null) {
                            showMustBe(options.language.lMediaCode, function () {
                                getControlObject(div, 'csMediaCode').csList('focus');
                            });
                            return false;
                        }
                        if (paraRows[i]['CHECKBULLETIN'] > 0 && mediaData['bulletinCode'] == null) {
                            showMustBe(options.language.lBulletinCode, function () {
                                getControlObject(div, 'csBulletinCode').csList('focus');
                            });
                            return false;
                        }
                    }
                }
            }
            if (isEmpty(mediaData['mediaCode']) == false && isEmpty(mediaData['introId'])) {
                var row = getRowByKeyValue(options.parameters[queryMediaCodeTableName].rows, 'CODENO', mediaData['mediaCode']);
                if (row['REFNO'] != null && row['REFNO'] > 0) {
                    showMustBe(options.language.lIntroId, function () {
                        getControlObject(div, 'tIntroId').jqxInput('focus');
                    });
                    return false;
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    };
    function getMediaData(div) {
        try {
            var mediaData = {};
            mediaData['mediaCode'] = getControlObject(div, 'csMediaCode').csList('codeNo');
            mediaData['mediaName'] = getControlObject(div, 'csMediaCode').csList('description');
            mediaData['introId'] = getControlObject(div, 'tIntroId').jqxInput('val');
            mediaData['introName'] = getControlObject(div, 'tIntroName').jqxInput('val');
            mediaData['bulletinCode'] = getControlObject(div, 'csBulletinCode').csList('codeNo');
            mediaData['bulletinName'] = getControlObject(div, 'csBulletinCode').csList('description');
            mediaData['note'] = getControlObject(div, 'tNote').jqxTextArea('val');
            return mediaData;
        }
        catch (err) {
            errorHandle(formName, 'getMediaData', err);
        }
    };
    function setMediaData(div) {
        try {
            var options = $.data(div, formName).options;
            var orderRows = options.orderData['Order'].rows;
            if (orderRows.length > 0) {
                getControlObject(div, 'csMediaCode').csList('codeNo', orderRows[0]['MediaCode'.toUpperCase()]);
                getControlObject(div, 'tIntroId').jqxInput('val', convertNullToString(orderRows[0]['IntroId'.toUpperCase()]));
                getControlObject(div, 'tIntroName').jqxInput('val', convertNullToString(orderRows[0]['IntroName'.toUpperCase()]));
                getControlObject(div, 'csBulletinCode').csList('codeNo', orderRows[0]['BulletinCode'.toUpperCase()]);
                getControlObject(div, 'tNote').jqxTextArea('val', convertNullToString(orderRows[0]['Note'.toUpperCase()]));
            }
        }
        catch (err) {
            errorHandle(formName, 'setMediaData', err);
        }
    };
    function disabled(div, flag) {
        try {
            var options = $.data(div, formName).options;
            disableAllControls(options.controls, flag);
        }
        catch (err) {
            errorHandle(formName, 'disabled', err);
        }
    };
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div);
            renderControl(div);
            //$(options.container).on('resize', function () {
            //    formResize(div);
            //});
            formResize(div);
            setMediaData(div);
            action(true);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };

    function changeLanguage(div) {
        try {
            var lang = $.data(div, formName).options.language;
            var keys = Object.keys(lang);
            var kLength = keys.length;
            //改label
            for (var i = 0 ; i < kLength; i++) {
                var o = $('#' + $(div).prop('id') + keys[i]);
                if (o.length > 0 && keys[i].substr(0, 1) == 'l') {
                    o.text(lang[keys[i]]);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'changeLanguage', err);
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
            var oHightArray = [];
            var oWidthArray = [];
            var oDisabled = [];
            var oColors = [];
            var sources = [];
            //建立Panel
            oArray = ["gbxHead"];
            var oHightArray = [$(div).height() - 3];
            var oWidthArray = ["99.3%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxPanel({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    //sizeMode: "wrap"
                    autoUpdate: true
                });
                controls.push({ name: iId, type: 'jqxPanel', level: level });
                //var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                //for (var j = 0; j < scrollBars.length; j++) {
                //    if ($('#' + iId + scrollBars[j]).length > 0) {
                //        $('#' + iId + scrollBars[j]).remove();
                //    }
                //}
            }
            level += 1;
            //建立input
            oArray = ["tIntroId", "tIntroName"];
            oWidthArray = ["56%", "67%"];
            oDisabled = [false, true];
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
            //建立單選元件
            oArray = ["csMediaCode", "csBulletinCode"];
            oWidthArray = ["66%", "85%"];
            sources = [queryMediaCodeTableName, queryBulletinCodeTableName];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 40,
                    width: oWidthArray[i],
                    source: options.parameters[sources[i]].rows
                });
                controls.push({ name: iId, type: 'csList', level: level });
            }
            //建立備註
            oArray = ["tNote"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxTextArea({
                    theme: options.theme,
                    height: $(div).height() / 100 * 49 - 8,
                    width: '85%',
                });
                controls.push({ name: iId, type: 'jqxTextArea', level: level });
            }
            //建立按鈕
            oArray = ['btnFindIntro'];
            oLength = oArray.length;
            for (var i = oLength - 1 ; i >= 0; i--) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var width = '30%';
                //var text = lang[oArray[i]];
                //o.text(text);
                o.jqxButton($.extend({
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight,
                    disabled: true,
                }, imageScr.query));
                controls.push({ name: bId, type: 'jqxButton', level: level });
                //$('#' + bId).css("margin", 2);
                $('#' + bId).css("float", 'left');
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function queryIntro(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var mediaCode = getControlObject(div, 'csMediaCode').csList('codeNo');
            var parameters = $.extend({}, paraLoginInfo, {
                mediaCode: { type: 'integer', value: mediaCode },
            });
            var params = getParameters(riadllName,
                riaClassName,
                'QueryIntro',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    delete options.initData[introTableName];
                    if (data.ResultBoolean == true) {
                        var intro = JSON.parse(data.ResultXML);
                        if (intro != null && Object.keys(intro).length > 0) {
                            options.initData[introTableName] = intro[Object.keys(intro)[0]];
                        }
                        action([true]);
                    }
                    else {
                        action([false]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'queryIntro', err);
        }
    };
    function textAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'tIntroId').on('change input', function (event) {
                try {
                    var value = getControlObject(div, 'tIntroId').jqxInput('val');
                    if (isEmpty(value)) return;
                    if (options.initData[introTableName] != null) {
                        var row = getRowByKeyValue(options.initData[introTableName].rows, options.initData[introTableName].columns[0]['name'], value);
                        if (row != null) {
                            getControlObject(div, 'tIntroName').jqxInput('val', row[Object.keys(row)[0]]);
                        }
                        else {
                            getControlObject(div, 'tIntroName').jqxInput('val', '');
                        }
                    }

                }
                catch (err) {
                    errorHandle(formName, 'tIntroId_change input', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'textAddHandler', err);
        }
    };
    function listAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'csMediaCode').on('selectedIndexChanged', function (event) {
                try {
                    getControlObject(div, 'tIntroId').jqxInput('val', '');
                    getControlObject(div, 'tIntroName').jqxInput('val', '');
                    queryIntro(div, function (r) {
                        if (r[0] == true) {
                            getControlObject(div, 'tIntroName').jqxInput('disabled', true);
                            getControlObject(div, 'btnFindIntro').jqxButton('disabled', false);
                        }
                        else {
                            getControlObject(div, 'tIntroName').jqxInput('disabled', false);
                            getControlObject(div, 'btnFindIntro').jqxButton('disabled', true);
                        }
                    });
                }
                catch (err) {
                    errorHandle(formName, 'csMediaCode_selectedIndexChanged', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    };
    function showIntroData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var width = 500;
            var height = 600;
            if (width > options.container.width()) width = options.container.width();
            if (height > options.container.height()) height = options.container.height();
            var x = ($(options.container).width() - width) / 2;
            var y = ($(options.container).height() - height) / 2;
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                hasClosing: false,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language['chooseIntro'] & " [SO111FA]", winOptions);
            $('#' + win.windowId).on('close', function () {
                var r = $.data($('#' + win.contentId)[0], 'SO111FA').options;
                $('#' + win.contentId)['SO111FA']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                action({ isSaved: r.introData.rows.length > 0, introData: r.introData });
            });
            var refNo = 0;
            var row = getRowByKeyValue(options.parameters[queryMediaCodeTableName].rows, 'CODENO', getControlObject(div, 'csMediaCode').csList('codeNo'));
            if (row != null) refNo = row['REFNO'];
            $('#' + win.contentId)['SO111FA']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                mediaRefNo: refNo,
                editMode: options.editMode,
                theme: options.theme,
                localization: options.localization
            });
        }
        catch (err) {
            errorHandle(formName, 'showIntroData', err);
        }
    }
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'btnFindIntro').on('click', function (event) {
                if ($(this).jqxButton('disabled')) { return; }
                try {
                    showIntroData(div, function (r) {
                        if (r.isSaved == true) {
                            getControlObject(div, 'tIntroId').jqxInput('val', r.introData.rows[0]['CODENO']);
                            getControlObject(div, 'tIntroName').jqxInput('val', r.introData.rows[0]['DESCRIPTION']);
                        }
                        delete r;
                    })
                }
                catch (err) {
                    errorHandle(formName, 'btnFindIntro_click', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
})(jQuery);