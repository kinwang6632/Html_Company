(function ($) {
    var formName = 'showPreviousPara';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 28;
    var PreParameterTableName = "PreParameter";
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
                        options: $.extend({}, new defaults(), new showPreviousPara(), options)
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
        try {
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var height = $(div).height();
            var bHeight = buttonsHeight + 2;
            getControlObject(div, 'gbxData').jqxPanel({ height: bHeight * 3 });
            getControlObject(div, 'dgData').jqxGrid({ height: height - bHeight * 3 - bHeight - 3 });
            getControlObject(div, 'gbxButton').css({ height: bHeight });

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
                url: 'dynamicComponent\\' + formName + '.html',
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
            //$(div).on('focusin', function () {
            //    $(div).triggerHandler('focusin');
            //});
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
            rcdToScr(div);
            formResize(div);
            action(true);
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
            var oHightArray = [];
            var oWidthArray = [];
            var oDisabled = [];
            var oColors = [];
            $(div).css('padding', 2);
            $(div).css('overflow', 'hidden');
            //建立jqxPanel
            oArray = ["gbxData"];
            var oHightArray = ["20%"];
            var oWidthArray = ["100%"];
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
            }
            level += 1;
            //建立input
            oArray = ["tEntryName", "tExecStatus"];
            oWidthArray = ["55%", "55%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxInput({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: true
                });
                controls.push({ name: iId, type: 'jqxInput', level: level });
            }
            //建立日期元件
            oArray = ["dtExecTime"];
            oWidthArray = ["55%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var fs = "yyyy/MM/dd HH:mm:ss";
                $('#' + iId).csDateTime({
                    theme: options.theme,
                    formatString: fs,
                    showCalendarButton: false,
                    value: null,
                    height: textHeight - 2,
                    width: oWidthArray[i],
                    disabled: true
                });
                controls.push({ name: iId, type: 'csDateTime', level: level });
            }
            //建立備註
            oArray = ["tExecMessage"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxTextArea({
                    theme: options.theme,
                    height: buttonsHeight * 3,
                    width: '83%'
                });
                controls.push({ name: iId, type: 'jqxTextArea', level: level });
            }
            //建立按鈕
            oArray = ['btnExit'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var text = lang[oArray[i]];
                img = imageScr.exit;
                switch (oArray[i]) {
                    case "btnExit":
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
            renderGrid(div, level);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function rcdToScr(div) {
        try {
            var options = $.data(div, formName).options;
            var data = options.parameters[PreParameterTableName];
            if (data.rows.length == 0) return true;
            getControlObject(div, 'dtExecTime').csDateTime('setText', formatDateTime(convertNullToString(data.rows[0]['EXECTIME']), 'datetime2'));
            getControlObject(div, 'tEntryName').jqxInput('val', convertNullToString(data.rows[0]['ENTRYNAME']));
            var status = "";
            if (data.rows[0]['EXECSTATUS'] == null || data.rows[0]['EXECSTATUS'] == 0) status = options.language.finish;
            else status = options.language.fail;

            getControlObject(div, 'tExecStatus').jqxInput('val', status);
            getControlObject(div, 'tExecMessage').jqxTextArea('val', convertNullToString(data.rows[0]['EXECMESSAGE']));
            return true;
        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    }
    function renderGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgData';
            options.gridSource = {
                datatype: "json",
                localdata: options.parameters[PreParameterTableName],
                datafields: [
                    { name: 'FIELDCAPTION', type: 'string' },
                    { name: 'FIELDVALUE', type: 'string' },
                    { name: 'FIELDDESC', type: 'string' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.gridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                height: '100%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                editable: false,
                columns: [
                  { text: lang.dgData_FIELDCAPTION, datafield: 'FIELDCAPTION', width: 140 },
                  { text: lang.dgData_FIELDVALUE, datafield: 'FIELDVALUE', width: 300 },
                  { text: lang.dgData_FIELDDESC, datafield: 'FIELDDESC', width: 320 }
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderGrid', err);
        }
    };
    function buttonAddHandler(div) {
        //取消
        getControlObject(div, 'btnExit').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            close(div);
        });
    };
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