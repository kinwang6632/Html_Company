(function ($) {
    var formName = 'SO1118A3';
    var riadllName = 'CableSoft.SO.RIA.Wip.CallOk.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.CallOk.Web.CallOk';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 28;
    var returnCodeTableName = "ALL";
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
                        options: $.extend({}, new defaults(), new SO1118A3(), options)
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
        canView: function (jq, params, param2) {
            return canView(params, param2);
        },
        isDataOk: function (jq) {
            return true;
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
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            $(div).triggerHandler('loaded');
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });
            //$.ajax({
            //    url: 'SO1000\\' + formName + '.html',
            //    type: "get",
            //    datatype: 'html',
            //    success: function (msg) {
            //        try {
            //            $(div).html(msg);
            //            changeElementId(div);
            //            init(div, function () {
            //                $(div).triggerHandler('loaded');
            //            });
            //        }
            //        catch (err) {
            //            errorHandle(formName, 'formLoaded_success', err);
            //        }
            //    },
            //    error: function (xhr, ajaxOptions, thrownError) {
            //        var param = options;
            //        if (param['loadError']) {
            //            param['loadError'](xhr, ajaxOptions, thrownError);
            //        }
            //        else {
            //            messageBox('error status:' + xhr.status + ', thrownError:' + thrownError, messageType.critical);
            //        }
            //    }
            //});
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
            var oHightArray = ["100%"];
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
            ////建立CheckBox
            //oArray = ["chkAll"];
            //oWidthArray = ["100"];
            //oLength = oArray.length;
            //for (var i = 0 ; i < oLength; i++) {
            //    var iId = $(div).prop('id') + oArray[i];
            //    $('#' + iId).text(lang[oArray[i]]);
            //    $('#' + iId).jqxCheckBox({
            //        theme: options.theme,
            //        height: textHeight,
            //        width: oWidthArray[i]
            //    });

            //    controls.push({ name: iId, type: 'jqxCheckBox', level: level });
            //}            
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };    
})(jQuery);