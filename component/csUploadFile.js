(function ($) {
    var formName = "csUploadFile";
    var uploadUrl = "uploadFiles.ashx";
    var endFiles = "files";
    var endFileName = "fName";
    var endChooseFile = "cFile";
    var endClearFile = "clear";
    var imgSize = 20;
    $.fn['csUploadFile'] = function (options, param) {
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
                        options: $.extend({}, new defaults(), new csUploadFile(), options)
                    });
                    init(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.csUploadFile', err);
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
        uploadFiles: function (jq) {
            return jq.each(function () {
                uploadFiles(this);
            });
        },
        getFiles: function (jq) {
            return getFiles($(jq)[0]);

        },
        focus: function (jq, param) {
            return jq.each(function () {
                focus(this, param);
            });
        },
        disabled: function (jq, param) {
            return disabled($(jq)[0], param);
        },
        clear: function (jq) {
            return jq.each(function () {
                clear(this);
            });
        }
    };
    var defaults = (function () {
        this.language = {};
        this.theme = $.jqx.theme;
        this.controls = [];
        this.localization = null;
        this.disabled = false;
        this.changeFileName = true;
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
            if (param == null) return;
            var width = param.width;
            $('#' + $(div).prop('id') + endFileName).jqxInput({ width: width - 85 - 45 });
        }
        catch (err) {
            errorHandle(formName, 'resize', err);
        }
    }
    function disabled(div, flag) {
        try {
            var options = $.data(div, formName).options;
            if (flag == null) {
                return options.disabled;
            }
            else {
                var chooseFile = $(div).prop('id') + endChooseFile;
                $('#' + chooseFile).jqxButton({ disabled: flag });
                options.disabled = flag;
            }
        }
        catch (err) {
            errorHandle(formName, 'disabled', err);
        }
    }
    function clear(div) {
        try {
            var options = $.data(div, formName).options;
            var filesName = $(div).prop('id') + endFileName;
            $('#' + filesName).jqxInput("val", null);
            var files = $(div).prop('id') + endFiles;
            $('#' + files).val(null);
        }
        catch (err) {
            errorHandle(formName, 'clear', err);
        }
    }
    function focus(div, isOpen) {
        try {
            var chooseFile = $(div).prop('id') + endChooseFile;
            //var filesName = $(div).prop('id') + endFileName;
            $('#' + chooseFile).jqxButton('focus');
            if (isOpen == true) $('#' + chooseFile).click();
        }
        catch (err) {
            errorHandle(formName, 'focus', err);
        }
    }
    function destroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            destroyControls(controls);
            $('#' + $(div).prop('id') + endFiles).off();
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
    function uploadFiles(div) {
        try {
            var options = $.data(div, formName).options;
            var files = $(div).prop('id') + endFiles;
            if ($('#' + files)[0].files.length == 0) {
                $(div).triggerHandler($.Event("load"));
            }
            else {
                var form = new FormData();
                form.append("name", "uploadFile");
                form.append("changeFileName", options.changeFileName);
                form.append("files", $('#' + files)[0].files[0]);
                if (options.path != null) {
                    form.append("path", options.path);
                }
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    var result = JSON.parse(this.responseText);
                    if (result.ResultBoolean == true) {
                        $(div).triggerHandler($.Event("load"), [result.ResultXML]);
                    }
                    else {
                        $(div).triggerHandler($.Event("error"), [result.ErrorMessage]);
                    }
                };
                xhr.open("post", uploadUrl, true);
                xhr.send(form);
            }
        }
        catch (err) {
            errorHandle(formName, 'uploadFiles', err);
        }
    };
    function getFiles(div) {
        try {
            return $('#' + $(div).prop('id') + endFileName).val();
        }
        catch (err) {
            errorHandle(formName, 'getFiles', err);
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
            var language = options.language;
            var files = $(div).prop('id') + endFiles;
            var filesName = $(div).prop('id') + endFileName;
            var chooseFile = $(div).prop('id') + endChooseFile;
            var clearFile = $(div).prop('id') + endClearFile;
            $('<input id="' + files + '" type="file" name="realFile" style="display:none;"/>').appendTo($(div));
            if (isEmpty(options.accept) == false) {
                $('#' + files).attr('accept', options.accept);
            }
            //var container = $('<div style="width:99%;"></div>').appendTo($(div));
            var container = $(div);
            $('<input type="text" id="' + filesName + '" disabled style="float:left;display:inline-block;" />').appendTo(container);
            $('#' + filesName).jqxInput({
                height: options.height,
                width: $(container).width() - 85 - 45,
                theme: options.theme,
                disabled: true
            });
            options.controls.push({ name: filesName, type: 'jqxInput', level: 0 });
            //選取
            $('<input type="button" value="' + language.chooseFile + '" id="' + chooseFile + '" style="float:left;display:inline-block;" />').appendTo(container);
            $('#' + chooseFile).jqxButton({
                height: options.height + 2,
                width: 80,
                theme: options.theme
            });
            options.controls.push({ name: chooseFile, type: 'jqxButton', level: 0 });

            $('#' + chooseFile).on('click', function () {
                $('#' + files).click();
            });
            //清除
            $('<input type="button" id="' + clearFile + '" style="float:left;display:inline-block;" />').appendTo(container);
            $('#' + clearFile).jqxButton($.extend({
                height: options.height + 2,
                width: 40,
                theme: options.theme,
                imgWidth: imgSize,
                imgHeight: imgSize
            }, imageScr.clear));
            $('#' + clearFile).find('img').css('top', (options.height + 2 - $('#' + clearFile).find("img").height()) / 2 - 1);

            options.controls.push({ name: clearFile, type: 'jqxButton', level: 0 });

            $('#' + clearFile).on('click', function () {
                clear(div);
            });
            $('#' + files).on('change', function () {
                try {
                    if ($('#' + files).length == 0) return;
                    if ($('#' + files)[0].files.length == 0) return;
                    var file = $('#' + files)[0].files[0].name;
                    $('#' + filesName).val(file);
                    var event = { args: { file: file } };
                    var e = $.Event("choosed", event);
                    $(div).triggerHandler(e);
                }
                catch (err) {
                    errorHandle(formName, "change", err, true, true);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'renderControls', err);
        }
    }
})(jQuery);