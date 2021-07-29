//buttonText
//type: button/link
//showFileName: true/false
(function ($) {
    var formName = "csDownloadFile";
    var endButtonId = 'btn';
    var endDownloadId = 'dl';
    var endLabelId = 'lab';
    var buttonHeight = 25;

    $.fn['csDownloadFile'] = function (options, param) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param);
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
                        options: $.extend({}, new defaults(), new csDownloadFile(), options)
                    });
                    init(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.csDownloadFile', err);
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
                destroy(this);
            });
        },
        resize: function (jq, param) {
            return jq.each(function () {
                resize(this, param);
            });
        },
        setURL: function (jq, param) {
            return setURL($(jq)[0], param);
        },
        focus: function (jq, param) {
            return jq.each(function () {
                focus(this, param);
            });
        },
        disabled: function (jq, flag) {
            return jq.each(function () {
                disabled(this, flag);
            });
        }
    };
    var defaults = (function () {
        this.language = {};
        this.theme = $.jqx.theme;
        this.controls = [];
        this.localization = null;
    });
    function parameter(div, paraName, params) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            if (paraName == null) {
                for (var i = 0; i < controls.length; i++) {
                    var o = $('#' + controls[i].name);
                    $(o)[controls[i].type](paraName, params);
                }
                options[paraName] = params;
            }
            else {
                return options[paraName];
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    function resize(div, param) {
        try {
            var options = $.data(div, formName).options;
            var width;
            if (param == null) {
                width = $(div).width();
            }
            else {
                width = param.width;
                $(div).css({ width: width });
            }
            if (options.showFileName == true) {
                var bWidth = width / 2;
                if (bWidth > 80) bWidth = 80;
                if (options.type == 'link') {
                    $('#' + $(div).prop('id') + endDownloadId).css({ width: bWidth });
                }
                else {
                    $('#' + $(div).prop('id') + endButtonId).jqxButton({ width: bWidth });
                }
                $('#' + $(div).prop('id') + endLabelId).css({ width: width - bWidth - 3 });
            }
            else {
                if (options.type == 'link') {
                    $('#' + $(div).prop('id') + endDownloadId).css({ width: width - 3 });
                }
                else {
                    $('#' + $(div).prop('id') + endButtonId).jqxButton({ width: width - 3 });
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'resize', err);
        }
    }
    function focus(div, isOpen) {
        try {
            var options = $.data(div, formName).options;
            if (options.type == 'link') {
                $('#' + $(div).prop('id') + endDownloadId).focus();
            }
            else {
                $('#' + $(div).prop('id') + endButtonId).jqxButton('focus');
                if (isOpen == true) $('#' + buttonId).click();
            }
        }
        catch (err) {
            errorHandle(formName, 'focus', err);
        }
    }
    function disabled(div, flag) {
        try {
            var options = $.data(div, formName).options;
            if (options.type == 'link') {
                $('#' + $(div).prop('id') + endDownloadId).css('disable', flag);
            }
            else {
                $('#' + $(div).prop('id') + endButtonId).jqxButton({ disabled: flag });
            }
        }
        catch (err) {
            errorHandle(formName, 'disabled', err);
        }
    }
    function destroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            destroyControls(controls);
            var options = $.data(div, formName).options;
            options.length = 0;
            options = null;
            $.data(div, formName, null);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'destroy', err);
        }
    };
    function setURL(div, url) {
        try {
            var options = $.data(div, formName).options;
            var dlId = $(div).prop('id') + endDownloadId;
            var buttonId = $(div).prop('id') + endButtonId;
            $('#' + dlId).attr('href', url);
            $('#' + dlId).css('display', "");
            if ($('#' + buttonId).length > 0) {
                $('#' + buttonId).css('display', "");
            }
            if (options.showFileName == true) {
                var sURL = url.split("\/");
                $('#' + $(div).prop('id') + endLabelId).text(sURL[sURL.length - 1]);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'setURL', err);
        }
    };
    function init(div) {
        try {
            renderControls(div);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function renderControls(div) {
        try {
            var options = $.data(div, formName).options;
            var fileName = convertNullToString(options.fileName);
            var caption = options.caption;
            var buttonText = options.buttonText;
            if (buttonText == null) { buttonText = options.language.download; }
            //if (isEmpty(fileName)) { return;}
            var dlId = $(div).prop('id') + endDownloadId;
            var buttonId = $(div).prop('id') + endButtonId;
            var lId = $(div).prop('id') + endLabelId;
            $('<a id="' + dlId + '" style="float:left;" download></a>').appendTo($(div));
            if (isEmpty(fileName) != true) {
                $('#' + dlId).attr('href', fileName);
            }
            if (options.showFileName == true) {
                $('<label id="' + lId + '" style="float:left;margin-top:6px;">' + fileName + '</label>').appendTo($(div));
            }
            if (options.type == 'link') {
                $('#' + dlId).text(buttonText);
                $('#' + dlId).css('margin-top', 6);
                if (isEmpty(fileName) == true) {
                    $("#" + dlId).css("display", "none");
                }
            }
            else {
                $('<input type="button" value="' + buttonText + '" id="' + buttonId + '"/>').appendTo($('#' + dlId));
                var buttonOptions = {
                    width: $(div).width(),
                    height: buttonHeight,
                    theme: options.theme
                };
                $("#" + buttonId).jqxButton($.extend({}, buttonOptions));
                $("#" + buttonId).css('float', 'left');
                $("#" + buttonId).css('margin-right', 1);
                if (isEmpty(fileName) == true) {
                    $("#" + buttonId).css("display", "none");
                }
                options.controls.push({ name: buttonId, type: 'jqxButton', level: 2 });
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'renderControls', err);
        }
    }
})(jQuery);