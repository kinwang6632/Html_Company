(function ($) {
    var formName = "SO3311G";
    var riadllName = "CableSoft.SO.RIA.Billing.Batch.EnterPay.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Billing.Batch.EnterPay.Web.EnterPay";
    var copyLoginInfo = {};
    var defaults = (function () {
        this.language = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.parameters = {}; 
        this.controls = [];
        this.containerIsWindow = false;
        this.theme = '';
        this.messageString = '';
        this.localization = null;
    });
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            //options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close');
    };
    function formDestroy(div) {
        var options = $.data(div, formName).options;
        var controls = $.data(div, formName).options.controls;
        try {
            
            //unHandler(div);
            unBindHandler(div);
            /*
            var controls = $.data(div, formName).options.controls;
            for (j = 3; j >= 0; j--) {
                for (i = 0; i < controls.length; i++) {
                    if (controls[i].level == j) {
                        var o = $('#' + $(div).prop('id') + controls[i].name);
                        if (o.length > 0) {
                            $(o[0]).off();
                            $(o[0])[controls[i].type]('destroy');
                        }
                    }
                }
            }; */
            destroyControls(controls);
            deleteJSONObject(options);
            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults;
            $(div).children().remove();
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        setTheme: function (jq, params) {
            return jq.each(function () {
                setTheme(this, params);
            });
        },
        theme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        close: function (jq) {
            return jq.each(function () {
                formClosed(this);
            });
        },
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        destroy: function (jq) {
            return jq.each(function () {
                formDestroy(this);
            });
        },
        canView: function (jq, params, param2) {
            return [true, ''];
        },
        canAppend: function (jq, params, param2) {
            return [true, ''];
        },
        canEdit: function (jq, params, param2) {
            return [true, ''];
        },
        canDelete: function (jq, params, param2) {
            return [true, ''];
        },
        canPrint: function (jq, params, param2) {
            return [true, ''];
        }
    };
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    $.fn.SO3311G = function (options, param, param2) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, param2);
                }
                return;
            }
            options = options || {};
            return this.each(function () {
                try {
                    var state = $.data(this, formName);
                    if (state) {
                        $.extend(state.options, options);
                    }
                    else {
                        $.data(this, formName, {
                            options: $.extend({}, new defaults(), new SO3311G(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3311G_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3311G', err);
        }
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            copyLoginInfo = getParaLoginInfo(div, formName);
            loadForm(options,
                'SO3000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div,formName);
                        changeLanguage(div);
                        renderControl(div);
                        addHandler(div);
                        $('#' + $(div).attr('id') + 'txtMsg').val(options.messageString);
                        if ($(options.container).attr('class') != undefined) {
                            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                options.containerIsWindow = true;
                            };
                        };
                        $(div).triggerHandler('loaded', [this, options]);
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });
            /*$.ajax({
                url: 'SO3000\\' + formName + '.html?v=' + formatDateTime(new Date(), "datetime3"),
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        changeLanguage(div);
                        renderControl(div);
                        addHandler(div);
                        $('#' + $(div).attr('id') + 'txtMsg').val(options.messageString);
                        if ($(options.container).attr('class') != undefined) {
                            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                options.containerIsWindow = true;
                            };
                        };
                        $(div).triggerHandler('loaded', [this, options]);
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded', err);
                    };
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
            }); */
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function unBindHandler(div) {        
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnSave').unbind('click');
        $(headerId + 'btnExit').unbind('click');
    };
    function addHandler(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnSave').unbind('click');
        $(headerId + 'btnSave').bind('click', div, btnSaveClicked);
        $(headerId + 'btnExit').unbind('click');
        $(headerId + 'btnExit').bind('click', function () {
            $(options.container).csWindow('close');
        });
    };
    
    function btnSaveClicked(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return; };
        writeMsgForDownload(event.data);
    };
    function writeMsgForDownload(div,action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            
            var parameters = $.extend({}, copyLoginInfo,
                  { Msg: { type: 'string', value: options.messageString } });

            var params = getParameters(riadllName,
                  riaClassName,
                  'WriteMsgForDownload',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                            if ($.isFunction(action)) { action() };
                        } else {
                            $(headerId + 'downloadLink').removeProp('href');
                            $(headerId + 'downloadLink').removeProp('download');
                            $(headerId + 'downloadLink').prop('href', data.ResultXML);
                            //$(headerId + 'downloadLink').prop('download', data.ResultXML);
                            $(headerId + 'downloadLink').prop('download', 'SO3311ErrLog.zip');
                            /*
                            var fileName = data.ResultXML;
                            var dlId = $(div).prop('id') + 'SO3311G';
                            $('<a id="' + dlId + '" href="' + fileName + '" download>here</a>').appendTo($( headerId + 'downloadField'));
                            $(headerId + 'btnDownload').appendTo($('#' + dlId));
                            var buttonOptions = {
                         
                            }; */
                            
                            $(headerId + 'btnDownload').click();
                            
                        };
                    } catch (err) {
                        errorHandle(formName, 'WriteMsgForDownload-Server', err);
                        if ($.isFunction(action)) { action() };
                    } finally {
                        parameters = null;
                        params = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete params;

                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'WriteMsgForDownload', err);
        } finally {

        };
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var height = $(div).innerHeight();
        var headerId = '#' + $(div).prop('id');
        try {
            //-----------------------------------------------------------------------------            
            $(headerId + 'txtMsg').jqxTextArea({
                height: '100%',
                width: '100%',
                disabled : true,
            });
            controls.push({ name: $(div).prop('id')  +'txtMsg', type: 'jqxTextArea', level: 2 });
            //-----------------------------------------------------------------------------

           

            //-----------------------------------------------------------------------------
            $(headerId + 'btnSave').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.save.imgSrc
            }));
            controls.push({ name:$(div).prop('id') + 'btnSave', type: 'jqxButton', level: 2 });
            $(headerId + 'btnSave > img').css('top', '2px');
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            /*
            $(headerId + 'btnDownload').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.save.imgSrc
            }));
            controls.push({ name: 'btnDownload', type: 'jqxButton', level: 2 }); */
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnExit').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.exit.imgSrc
            }));
            controls.push({ name:$(div).prop('id') + 'btnExit', type: 'jqxButton', level: 2 });
            $(headerId + 'btnExit > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //downloadLink
            $(headerId + 'downloadLink').append($(headerId + 'btnDownload'));
            //$(headerId + 'btnDownload').append($(headerId + 'downloadLink'));
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        };
    };
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var idArray = $('*[id^=' + $(div).prop('id') + ']');

        try {
            idArray.each(function (index, value) {
                var idStr = $(value).attr('id');
                if (idStr.replace($(div).prop('id'), "") != "") {
                    if (lang[idStr.replace($(div).prop('id'), "")] != null) {
                        $('#' + idStr).val(lang[idStr.replace($(div).prop('id'), "")]);
                        $('#' + idStr).text(lang[idStr.replace($(div).prop('id'), "")]);
                    }
                }
            });
            idArray.length = 0;
            idArray = [];
            idArray = null;
        }
        catch (err) {
            errorHandle(formName, 'changeLanguage', err);
        }
    };
})(jQuery);