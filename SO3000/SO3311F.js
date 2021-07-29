(function ($) {
    var formName = "SO3311F";
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
        this.isSaved = false;
        this.billno = '';
        this.item = '';
        this.enterType = 0;
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
            //unBindHandler(div);
            unHandler(div);
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
            };       */
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
    $.fn.SO3311F = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new SO3311F(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3311F_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3311F', err);
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
    function isDataOK(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        if ($(headerId + 'edtCancelDate').csDateTime('getText') == null || $(headerId + 'edtCancelDate').csDateTime('getText') == '') {
            messageBox(options.language.CancelDateMustField, messageType.critical);
            return;
        };
        if ($(headerId + 'gilCancelReason').csList('codeNo') == '') {
            messageBox(options.language.CancelReasonMustField, messageType.critical);
            return;
        };
        return true;
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            //unBindHandler(div);
            changeLanguage(div);
            renderControl(div);
            queryCancelReason(div, function () {
                addHandler(div);
            });

          

        } catch (err) {
            errorHandle(formName, 'initData', err);
            if ($.isFunction(action)) { action(); };
        } finally {
            if ($.isFunction(action)) { action() };
        };
    };
    function queryCancelReason(div,action){
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            var parameters = $.extend({}, copyLoginInfo);
                
            var params = getParameters(riadllName,
                      riaClassName,
                      'QueryCancelReason',
                      JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                        } else {
                            var d = JSON.parse(data.ResultXML);
                            $(headerId + 'gilCancelReason').csList('source', d.CancelReason.rows);
                            delete d;
                            d = null;
                        };
                        
                        if ($.isFunction(action)) { action(); };
                    } catch (err) {

                        errorHandle(formName, 'queryCancelReason-Server', err);
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
            errorHandle(formName, 'queryCancelReason', err);
        } finally {

        };
    };
    function unHandler(div) {        
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'btnOK').unbind('click');
        $(headerId + 'btnCancel').off();
    };
    function addHandler(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'btnOK').unbind('click');
        $(headerId + 'btnOK').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; };
            if (!isDataOK(div)) { return; };
            cancelTempdata(div);
        });
        $(headerId + 'btnCancel').off('click');
        $(headerId + 'btnCancel').one('click', function () {
            $(options.container).csWindow('close');
        });
    };
    function cancelTempdata(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var parameters = $.extend({}, copyLoginInfo,
                   { EnterType: { type: 'integer', value: options.enterType } },
                   { BillNo: { type: 'string', value: options.billno } },
                   { Item: { type: 'string', value: options.item } },
                   { CancelDate: { type: 'string', value: $(headerId + 'edtCancelDate').csDateTime('getText') } },
                   { CancelCode: { type: 'integer', value:parseInt( $(headerId + 'gilCancelReason').csList('codeNo')) } },
                   { CancelName: { type: 'string', value: $(headerId + 'gilCancelReason').csList('description') } });
        var params = getParameters(riadllName,
                 riaClassName,
                 'CancelTempData',
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

                    errorHandle(formName, 'GetTempInfo-Server', err);
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
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var height = $(div).innerHeight();
        var headerId = '#' + $(div).prop('id');
        
        try {
            //-----------------------------------------------------------------------------            
            $(headerId + "gilCancelReason").csList({
                source: null,
                codeNoWidth: 80,
                width: '280px',
                height: '25px',
                showColumnHeaders: false,
                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false,
                columns: [
                       { text: 'CODENO', datafield: 'CODENO' },
                       { text: 'DESCRIPTION', datafield: 'DESCRIPTION' }
                ]
            });
            controls.push({ name:$(div).prop('id') + 'gilCancelReason', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
        
            //-----------------------------------------------------------------------------
            $(headerId + "edtCancelDate").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: 150,
                height: 25
            });
            controls.push({ name:$(div).prop('id')+ 'edtCancelDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 70,
                height: 25,
                imgSrc: imageScr.ok.imgSrc
            }));
            controls.push({ name:$(div).prop('id')+ 'btnOK', type: 'jqxButton', level: 2 });
            $(headerId + 'btnOK > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                width: 70,
                height: 25,
                imgSrc: imageScr.cancel.imgSrc
            }));
            controls.push({ name:$(div).prop('id')+ 'btnCancel', type: 'jqxButton', level: 2 });
            $(headerId + 'btnCancel > img').css('top', '2px');
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