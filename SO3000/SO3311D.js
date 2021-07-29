(function ($) {
    var formName = "SO3311D";
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
        this.enterType = 0;
        this.isSaved = false;
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
            $('#' +$(div).attr('id') + 'btnQuit').unbind('click');
            $('#' + $(div).attr('id') + 'btnReturn').unbind('click');
            /*
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
    $.fn.SO3311D = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new SO3311D(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3311D_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3311D', err);
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

                        initData(div, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class') != undefined) {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    options.containerIsWindow = true;
                                };
                            }

                        });
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

                        initData(div, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class') != undefined) {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    options.containerIsWindow = true;
                                };
                            }

                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded', err);
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
            }); */
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            //unBindHandler(div);
            changeLanguage(div);
            renderControl(div);
            $(headerId + 'btnQuit').on('click', function () {
                execute(div);
            });
            $(headerId + 'btnReturn').on('click', function () {
                cancelAllBillData(div);
            });
            /*
            queryCancelReason(div, function () {
                addHandler(div);
            }); */



        } catch (err) {
            errorHandle(formName, 'initData', err);
            if ($.isFunction(action)) { action(); };
        } finally {
            if ($.isFunction(action)) { action() };
        };
    };
    function cancelAllBillData(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var parameters = $.extend({}, copyLoginInfo,
                   { EnterType: { type: 'integer', value: options.enterType } });
        var params = getParameters(riadllName,
                  riaClassName,
                  'CancelAllBillData',
                  JSON.stringify(parameters));
        getServerData(params, {
            success: function (data) {
                try {
                    if (!data.ResultBoolean) {
                        messageBox(data.ErrorMessage, messageType.critical);
                    } else {
                        options.isSaved = true;
                        $(options.container).csWindow('close');
                    };
                } catch (err) {

                    errorHandle(formName, 'CancelAllBillData-Server', err);
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
    };
    function execute(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var Parameters = { CitemPara: {} };
        $.extend(true, Parameters.CitemPara, options.parameters);
        try {
            var parameters = $.extend({}, copyLoginInfo,
                    { EnterType: { type: 'integer', value: options.enterType } },
                    { dsCitemPara: { type: 'string', value: Parameters } }
                    );

            var params = getParameters(riadllName,
                  riaClassName,
                  'Execute',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                        } else {
                            options.isSaved = true;
                            $(options.container).csWindow('close');
                        };
                    } catch (err) {

                        errorHandle(formName, 'execute-Server', err);
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
            errorHandle(formName, 'Execute-Server', err);
        } finally {
            delete Parameters;
            Parameters = null;
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
            $(headerId + 'btnQuit').jqxButton($.extend({}, imagePosition, {
                width: 120,
                height: 25,
                imgSrc: imageScr.save.imgSrc
            }));
            controls.push({ name: $(div).prop('id') +'btnOK', type: 'jqxButton', level: 2 });
            $(headerId + 'btnQuit > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnReturn').jqxButton($.extend({}, imagePosition, {
                width: 120,
                height: 25,
                imgSrc: imageScr.cancel.imgSrc
            }));
            controls.push({ name:$(div).prop('id')+ 'btnCancel', type: 'jqxButton', level: 2 });
            $(headerId + 'btnReturn > img').css('top', '2px');
            //-----------------------------------------------------------------------------


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