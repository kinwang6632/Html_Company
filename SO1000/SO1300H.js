(function ($) {
    var formName = 'SO1300H';
    var riadllName = 'CableSoft.SO.RIA.Building.Web.dll';
    var riaClassName = ' CableSoft.SO.RIA.Building.Web.dsBuilding';
    var copyLoginInfo = {};
    var defaults = (function () {
        this.language = {};
        this.initData = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.parameters = {};
        this.controls = [];
        this.theme = '';        
        this.isSaved = false;
        this.container = null;
        this.localization = {};
    });
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        setTheme: function (jq, params) {
            return jq.each(function () {
                setTheme(this, params);
            });
        },
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        close: function (jq) {

            return jq.each(function () {
                formClosed(this);
            });
        },
        resize: function (jq, params) {
            return jq.each(function () {
                formResize(this, params);
            });
        },
        destroy: function (jq) {
            return jq.each(function () {
                formDestroy(this);
            });
        },
        canView: function (jq, params, param2) {
            return param2([true, null]);
        },
        canAppend: function (jq, params, param2) {
            return param2([true, null]);
        },
        canEdit: function (jq, params, param2) {
            return param2([true, null]);
        },
        canDelete: function (jq, params, param2) {
            return param2([true, null]);
        },
        canPrint: function (jq, params, param2) {
            return param2([true, null]);
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
                try {
                    var state = $.data(this, formName);
                    if (state) {
                        $.extend(state.options, options);
                    }
                    else {
                        $.data(this, formName, {
                            options: $.extend({}, new defaults(), new SO1300H(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1300H_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1300H', err);
        }
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        
        var headerId = '#' + $(div).prop('id');
        try {
            //-----------------------------------------------------------------------------
            $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 70,
                height: 25,
                imgSrc: imageScr.ok.imgSrc
            }));
            controls.push({ name: 'btnOK', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                width: 70,
                height: 25,
                imgSrc: imageScr.cancel.imgSrc
            }));
            controls.push({ name: 'btnCancel', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------     
            //-----------------------------------------------------------------------------
            $(headerId + 'txtNote').jqxTextArea({
                // placeHolder: $.data(div).SO1112A.options.language.lblMemo,
                height: '100%',
                width: '100%',
                minLength: 1
            });
            controls.push({ name: 'txtNote', type: 'jqxTextArea', level: 2 });
            //-----------------------------------------------------------------------------       
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        }; 
    };
    function formDestroy(div) {
        try {

            var options = $.data(div, formName).options;
            var controls = $.data(div, formName).options.controls;
            var headerId = '#' + $(div).prop('id');          
            unHandler(div);
            for (j = 3; j >= 0; j--) {
                for (i = 0; i < controls.length; i++) {
                    if (controls[i].level == j) {
                        var o = $('#' + $(div).prop('id') + controls[i].name);
                        if (o.length > 0) {
                            $(o[0]).off();
                            $(o[0])[controls[i].type]('destroy');
                        }
                    };
                };
            };
            deleteJSONObject(options);
            $(div).children().remove();
            /*
            $.data(div, formName).options.language = null;
            delete $.data(div, formName).options.language;
            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults;           
            $(div).children().remove(); */


        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        };
    };
    function unHandler(div, action) {
        var headerId = '#' + $(div).attr('id');
        
        $(headerId + 'btnOK').unbind('click', btnOKClick);
        $(headerId + 'btnCancel').unbind('click');
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            
            $(headerId + 'btnOK').unbind('click');
            $(headerId + 'btnOK').bind('click', div, btnOKClick);
            $(headerId + 'btnCancel').unbind('click');
            $(headerId + 'btnCancel').bind('click', function () {
                if ($(this).jqxButton('disabled')) { return; };
                if (options.containerIsWindow) {
                    $($.data(div, formName).options.container).csWindow('close');
                };
            }); 
            
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        }
    };
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if ($(this).jqxButton('disabled')) { return; };
        if ($(headerId + 'txtNote').val() == null || $(headerId + 'txtNote').val() == '') {
            messageBox(options.language.ContentMustbe, messageType.critical, null, function (flag) {
                $(headerId + 'txtNote').jqxTextArea('focus');
            });
            return;
        };
        if (options.initData.SO038 == undefined) {
            messageBox(options.language.LoadSO038Fail, messageType.critical);
            return;
        };
        if (options.editMode == editMode.edit) {
            options.initData.SO038.rows[0]['CONTENT'] = $(headerId + 'txtNote').val();
        } else {
            var o = {};
            $.each(options.initData.SO038.columns, function (index, col) {
                o[col.name] = null;
            });
            o['CONTENT'] = $(headerId + 'txtNote').val();
            options.initData.SO038.rows.push(o);
        };
        try {

            var parameters = $.extend({}, copyLoginInfo,
               { editMode: { type: 'integer', value: options.editMode} },
               { SaveData: { type: 'string', value: options.initData } });
            var params = getParameters(riadllName,
                   riaClassName,
                   'Go_Write_SO1300H',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            options.editMode = editMode.edit;
                            messageBox(options.language.SaveSuccess, messageType.critical, null, function (flag) {
                                if (options.containerIsWindow) {
                                    $($.data(event.data, formName).options.container).csWindow('close');
                                };
                            });
                            
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };

                    } catch (err) {
                        errorHandle(formName, 'Go_Write_SO1300H-Server', err);
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
            errorHandle(formName, 'Go_Write_SO1300H', err);

        } finally {            
        };
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            copyLoginInfo = getParaLoginInfo(div, formName);
            $.ajax({
                url: 'SO1000\\' + formName + '.html',
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        initData(div, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class').indexOf('jqx-window') != undefined) {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    options.containerIsWindow = true;
                                    var csw = $.data(div, formName).options.container;
                                    csw.on("winClosing", function () {                                       
                                        csw.csWindow('close');
                                    });
                                };
                            };
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
            });
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            changeLanguage(div);
            renderControl(div);
            Load_Data(div, function () {
                addHandler(div);
            });
            /*
            shouldRegPriv = false;
            options.isSaved = false;
            changeLanguage(div);
            renderControl(div);
            if (options.orderNo == '') {
                messageBox(options.language.NoDataQuery, messageType.critical);
                return;
            };
            chkReturnCode(div, function () {
                renderSO1118A5(div, function () {
                    addHandler(div, function () {
                    });
                });
            }); */
        } catch (err) {
            errorHandle(formName, 'initData', err);

        } finally {
            if ($.isFunction(action)) { action(); };
        }
    };
    function Load_Data(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {

            var parameters = $.extend({}, copyLoginInfo);
            var params = getParameters(riadllName,
                   riaClassName,
                   'Query_SO038_Content',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            options.editMode = editMode.append;
                            var d = JSON.parse(data.ResultXML);
                            delete options.initData;
                            options.initData = null;
                            options.initData = { SO038: {} };
                            options.initData.SO038 = $.extend(true, {}, d.Table);
                            if (d.Table == undefined) {                                
                                messageBox(options.language.NoDataByContent, messageType.critical, null, function (flag) {                                    
                                    $(headerId + 'txtNote').jqxTextArea('focus');
                                    if ($.isFunction(action)) { action(); };
                                   
                                });
                                return;
                            };
                            if (d.Table.rows.length == 0) {
                                messageBox(options.language.NoDataByContent, messageType.critical, null, function (flag) {
                                    $(headerId + 'txtNote').jqxTextArea('focus');
                                    if ($.isFunction(action)) { action(); };
                                    
                                });
                                return;
                            } else {
                                options.editMode = editMode.edit;
                                $(headerId + 'txtNote').jqxTextArea('val', d.Table.rows[0]['CONTENT']);
                                $(headerId + 'txtNote').jqxTextArea('focus');
                                if ($.isFunction(action)) { action(); };                                
                            };
                            return;
                            
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };

                    } catch (err) {
                        errorHandle(formName, 'Query_SO038_Content-Server', err);
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
            errorHandle(formName, 'Query_SO038_Content', err);

        } finally {
            //if ($.isFunction(action)) { action(); };
        };
    };
    function formClosed(div) {

        var options = $.data(div, formName).options;
        if (options['closed']) {
            //options['closed'](options.returnValue);
        };
        $(options['container']).csWindow('close');
    };
    function setTheme(div, params) {
        var controls = $.data(div, formName).options.controls;
        for (i = 0; i < controls.length; i++) {
            var o = $('#' + $(div).prop('id') + controls[i].name);
            if (o.length > 0) {
                $(o[0])[controls[i].type]({ theme: params });
            }
        }
    };

    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var idArray = $('*[id^=' + $(div).prop('id') + ']')
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
    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var msg = "";
            for (var i = 0; i < controls.length; i++) {
                var o = $('#' + controls[i].name);
                o.each(function () {
                    $(this)[controls[i].type]('resize');
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
})(jQuery);