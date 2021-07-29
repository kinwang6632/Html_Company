(function ($) {
    var formName = "csColorPicker";
    var endDrop = "drop";
    var endColor = "color";
    $.fn[formName] = function (options, param) {
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
                    setProperty(this, options);
                }
                else {
                    $.data(this, formName, {
                        options: $.extend({}, new defaults(), options)
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
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        destroy: function (jq) {
            return jq.each(function () {
                destroy(this);
            });
        },
        setValue: function (jq, param) {
            return jq.each(function () {
                setValue(this, param);
            });
        },
        getValue: function (jq) {
            return getValue($(jq)[0]);

        },
        focus: function (jq, param) {
            return jq.each(function () {
                focus(this, param);
            });
        },
        disabled: function (jq, param) {
            return disabled($(jq)[0], param);
        }
    };
    var defaults = (function () {
        this.language = {};
        this.theme = $.jqx.theme;
        this.controls = [];
        this.localization = null;
        this.disabled = false;
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
    function setProperty(div, params) {
        try {
            var options = $.data(div, formName).options;
            $.extend(options, params);
            $("#" + $(div).prop("id") + endDrop).jqxDropDownButton(params);
            if (params.width && params.width > 200) {
                $("#" + $(div).prop("id") + endColor).jqxColorPicker({ width: params.width });
            }
        }
        catch (err) {
            errorHandle(formName, 'setProperty', err);
        }
    };
    function disabled(div, flag) {
        try {
            var options = $.data(div, formName).options;
            if (flag == null) {
                return options.disabled;
            }
            else {
                $("#" + $(div).prop("id") + endDrop).jqxDropDownButton({ disabled: flag });
                options.disabled = flag;
            }
        }
        catch (err) {
            errorHandle(formName, 'disabled', err);
        }
    }
    function focus(div, isOpen) {
        try {
            $("#" + $(div).prop("id") + endDrop).jqxDropDownButton('focus');
        }
        catch (err) {
            errorHandle(formName, 'focus', err);
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
    function getTextElementByColor(div, color) {
        try {
            var options = $.data(div, formName).options;
            if (color == 'transparent' || color == "") {
                return $("<div style='text-shadow: none; position: relative; padding-bottom: 3px; margin-top: 1px;'></div>");
            }
            var rgb = new $.jqx.color({ hex: color });
            var element = $("<div style='text-shadow: none; position: relative; padding-bottom: 3px; margin-top: 1px;'>" + color + "</div>");
            var nThreshold = 105;
            var bgDelta = (rgb.r * 0.299) + (rgb.g * 0.587) + (rgb.b * 0.114);
            var foreColor = (255 - bgDelta < nThreshold) ? 'Black' : 'White';
            element.css('color', foreColor);
            element.css('background', color);
            if (options.height) {
                element.css('height', options.height - 2);
            }
            element.addClass('jqx-rc-all');
            var e = $.Event("change", { args: { value: color } });
            $(div).triggerHandler(e);
            return element;
        }
        catch (err) {
            errorHandle(formName, 'getTextElementByColor', err);
        }
    }
    function setValue(div, color) {
        try {
            var options = $.data(div, formName).options;
            options.value = color;
            if (isEmpty(color)) { color = "";}
            $("#" + div.id + endColor).jqxColorPicker("setColor", color);
            $("#" + div.id + endDrop).jqxDropDownButton("setContent", getTextElementByColor($("#" + div.id)[0], color));
        }
        catch (err) {
            errorHandle(formName, 'setValue', err);
        }
    };
    function getValue(div) {
        try {
            var color = $("#" + div.id + endColor).jqxColorPicker("getColor");
            return "#" + color.hex;
        }
        catch (err) {
            errorHandle(formName, 'getValue', err);
        }
    }
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
            var divId = $(div).prop('id');
            var colorId = $(div).prop('id') + endColor;
            var dropId = $(div).prop('id') + endDrop;

            $('<div id="' + dropId + '"><div style="padding: 1px;"><div id="' + colorId + '"></div></div></div>').appendTo($(div));
            var width = $(div).width();
            if (options.width) { width = options.width; }
            var height = $(div).height();
            if (options.height) { height = options.height; }
            var colorWidth = width;
            if (colorWidth < 200) { colorWidth = 200; }
            $("#" + colorId).on('colorchange', function (event) {
                $("#" + dropId).jqxDropDownButton('setContent', getTextElementByColor($("#" + divId)[0], "#" + event.args.color.hex));
            });
            $("#" + colorId).jqxColorPicker({ colorMode: 'hue', width: colorWidth, height: 220 });
            options.controls.push({ name: colorId, type: 'jqxColorPicker', level: 1 });

            $("#" + dropId).jqxDropDownButton({ width: width, height: height, theme: options.theme });
            options.controls.push({ name: dropId, type: 'jqxDropDownButton', level: 0 });
            $("#" + dropId).jqxDropDownButton('setContent', getTextElementByColor($("#" + divId)[0], ""));
        }
        catch (err) {
            errorHandle(formName, 'renderControls', err);
        }
    }
})(jQuery);