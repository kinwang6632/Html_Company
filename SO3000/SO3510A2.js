(function ($) {
    var formName = 'SO3510A2';
    var riadllName = 'CableSoft.SO.RIA.Billing.ManualNo.Web.dll';
    var riaClassName = ' CableSoft.SO.RIA.Billing.ManualNo.Web.ManualNo';
    var copyLoginInfo = {};
    var grdData = null;
    var dataWhere = {};
    var QueryData = {};
    //options.parentDataTableName
    //options.parameters
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
                            options: $.extend({}, new defaults(), new SO3510A2(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3510A2_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3510A2', err);
        }
    };
    function renderGrid(div) {
        var options = $.data(div, formName).options;
        var headId = '#' + $(div).attr('id');
        delete grdData;
        grdData = null;

        grdData = {
            datatype: 'json',
            datafields: [
                   { name: 'EMPNAME', type: 'string' },
                   { name: 'GETPAPERDATE', type: 'date' },
                   { name: 'PREFIX', type: 'string' },
                   { name: 'BEGINNUM', type: 'string' },
                   { name: 'ENDNUM', type: 'string' },
                   { name: 'TOTALPAPERCOUNT', type: 'integer' },
                   { name: 'OPERATOR', type: 'string' },
                   { name: 'RETURNDATE', type: 'date' },
                   { name: 'CLEARDATE', type: 'date' },
                   { name: 'NOTE', type: 'string' },
                   { name: 'UPDTIME', type: 'string' },
                   { name: 'PRTSNO', type: 'string' },                  
            ]
        };
        //grdData.localdata = options.viewData.Temp.rows;
        var dataAdapter1 = new $.jqx.dataAdapter(grdData);
        $(headId + 'csGrid').jqxGrid({ source: dataAdapter1 });
      
        //$(headId + 'grdCharge').jqxGrid('updatebounddata');
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = '#' + $(div).prop('id');
    
        //-----------------------------------------------------------------------------    
        $(headerId + "txtInfo").jqxTextArea({           
            height: '100%',
            width: '100%'
        });
        controls.push({ name: $(div).prop('id') + 'txtInfo', type: 'jqxTextArea', level: 2 });
        //-----------------------------------------------------------------------------    
        /*
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
            width: 80,
            //imgSrc: imageScr.cancel.imgSrc,
            value:lang.btnCancel,
            height: 30
        }));
        controls.push({ name: $(div).prop('id') + 'btnCancel', type: 'jqxButton', level: 2 });
        //----------------------------------------------------------------------------- 
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
            width: 80,
            //imgSrc: imageScr.cancel.imgSrc,
            height: 30,
            value:lang.btnOK
        }));
        controls.push({ name: $(div).prop('id') + 'btnOK', type: 'jqxButton', level: 2 });
        //-----------------------------------------------------------------------------  */
      
        
    };
    function formDestroy(div) {
        try {

            var options = $.data(div, formName).options;
            var controls = $.data(div, formName).options.controls;
            var headerId = '#' + $(div).prop('id');          
            unHandler(div);
            /*
            for (j = 3; j >= 0; j--) {
                for (i = 0; i < controls.length; i++) {
                    if (controls[i].level == j) {
                        var o = $('#' +controls[i].name);
                        if (o.length > 0) {
                            $(o[0]).off();
                            $(o[0])[controls[i].type]('destroy');
                        }
                    };
                };
            }; */
            destroyControls(controls);
            deleteJSONObject(options);
            $.data(div, formName).options.language = null;
            delete $.data(div, formName).options.language;
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
        };
    };
    function unHandler(div, action) {
        var headerId = '#' + $(div).attr('id');
        var options = $.data(div, formName).options;
     
        $(headerId + 'btnCancel').unbind('click');
        $(headerId + 'btnOK').unbind('click');
    };
    function winClosing(event) {
        var options = $.data(event.data, formName).options;
        $($.data(event.data, formName).options.container).csWindow('close');
        return;
        if (options.editMode == editMode.view) {
            $($.data(event.data, formName).options.container).csWindow('close');
            return;
        };        
        messageBox(options.language.QuitAskStr, messageType.yesno, null, function (flag) {
            if (flag == 'yes') {
                $($.data(event.data, formName).options.container).csWindow('close');
            } else {
                //changeMode(event.data);
            };
        });
    };
    
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
          
            $(headerId + 'btnCancel').unbind('click');
          
            $(headerId + 'btnCancel').bind('click', function () {
                $(options.container).triggerHandler('winClosing');
            });
            $(headerId + 'btnOK').unbind('click');
            $(headerId + 'btnOK').bind('click', div, btnOKClick);
            if ($.isFunction(action)) { action() };
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        }
    };
   
    
   
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var ds = prepareData(event.data);
        try {
            var parameters = $.extend({}, getParaLoginInfo(event.data, formName),
                  { ds: { type: 'string', value: ds } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'DeleteData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            options.isSaved = true;
                            messageBox(options.language.SaveOK, messageType.information, null, function (flag) {
                                $($.data(event.data, formName).options.container).csWindow('close');
                               
                            });
                        }
                        else {                            
                            messageBox(data.ErrorMessage, messageType.critical)                            
                        };
                    } catch (err) {
                        errorHandle(formName, 'DeleteData-Server', err);
                        //addHandler(div);

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
            errorHandle(formName, 'DeleteData', err);
        } finally {
            delete ds;
            ds = null;
        };
    };
    
    function CanDelete(div, r) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var ds = prepareData(div);
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
                  { ds: { type: 'string', value: ds } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'CanDelete',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {                           
                            if ($.isFunction(r)) { r('') };
                        }
                        else {
                            if ($.isFunction(r)) { r(data.ErrorMessage) };
                            //messageBox(data.ErrorMessage, messageType.critical);
                        };
                    } catch (err) {
                        errorHandle(formName, 'CanDelete-Server', err);
                        addHandler(div);

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
            errorHandle(formName, 'CanDelete', err);
        } finally {

        };
    };
    
    function prepareData(div) {
        var options = $.data(div, formName).options;
        options.parameters[options.parentDataTableName]
        var ds = {
            SO126: {
                columns: [{ name: 'BEGINNUM', type: 'string' },
                    { name: 'ENDNUM', type: 'string' },
                    { name: 'PREFIX', type: 'string' },
                    { name: 'SEQ', type: 'long' },
                ],
                rows: [{
                    BEGINNUM: options.parameters[options.parentDataTableName].rows[0]['BEGINNUM'],
                    ENDNUM: options.parameters[options.parentDataTableName].rows[0]['ENDNUM'],
                    PREFIX: options.parameters[options.parentDataTableName].rows[0]['PREFIX'],
                    SEQ: options.parameters[options.parentDataTableName].rows[0]['SEQ'],
                }]
            }
        };
        return ds
    };
    
    function formLoaded(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            
            copyLoginInfo = getParaLoginInfo(div, formName);
            loadForm(options,
               'SO3000\\' + formName + '.html',
               function (msg) {
                   try {
                       $(div).triggerHandler('loaded', [this, options]);
                       if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                           options.containerIsWindow = true;
                           var csw = $.data(div, formName).options.container;
                           csw.on("winClosing", div, winClosing);

                       };
                       if (options.parameters[options.parentDataTableName] == undefined) {
                           messageBox(options.language.noData, messageType.critical, null, function (flag) {
                               $(options.container).triggerHandler('winClosing');
                               return;
                           });
                           return;
                       };
                       if (options.parameters[options.parentDataTableName].rows.length == 0) {
                           messageBox(options.language.noData, messageType.critical, null, function (flag) {
                               $(options.container).triggerHandler('winClosing');
                               return;
                           });
                           return;
                       };
                       $(div).html(msg);
                       changeElementId(div);
                       renderControl(div);                       
                       CanDelete(div, function (r) {                          

                           if (r == '') {
                               //-----------------------------------------------------------------------------    
                               $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                                   width: 80,                                   
                                   value: options.language.btnCancel,
                                   height: 30
                               }));
                               options.controls.push({ name: $(div).prop('id') + 'btnCancel', type: 'jqxButton', level: 2 });
                               //----------------------------------------------------------------------------- 
                               //-----------------------------------------------------------------------------    
                               $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                                   width: 80,                                   
                                   height: 30,
                                   value: options.language.btnOK
                               }));
                               options.controls.push({ name: $(div).prop('id') + 'btnOK', type: 'jqxButton', level: 2 });
                               //----------------------------------------------------------------------------- 

                              // $(headerId + 'btnCancel').jqxButton({ value: options.language.btnCancel });
                              // $(headerId + 'btnOK').jqxButton({ value: options.language.btnOK });
                               $(headerId + 'txtInfo').jqxTextArea('val', options.language.QuitAskStr);                               
                               $(headerId + 'imgInfo').attr('src', "Images/question1.png");
                               addHandler(div);
                           } else {
                               //-----------------------------------------------------------------------------    
                               $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                                   width: 80,
                                   value: options.language.btnOK,
                                   height: 30
                               }));
                               options.controls.push({ name: $(div).prop('id') + 'btnCancel', type: 'jqxButton', level: 2 });
                               //----------------------------------------------------------------------------- 
                               //-----------------------------------------------------------------------------    
                               $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                                   width: 80,
                                   height: 30,
                                   value: options.language.btnOK
                               }));
                               options.controls.push({ name: $(div).prop('id') + 'btnOK', type: 'jqxButton', level: 2 });
                               //----------------------------------------------------------------------------- 
                              // $(headerId + 'btnCancel').jqxButton({ value: '' });
                               //$(headerId + 'btnCancel').jqxButton('val', options.language.btnOK );
                               $(headerId + 'btnOK').hide();                              
                               $(headerId + 'txtInfo').jqxTextArea('val', r);
                               $(headerId + 'imgInfo').attr('src', "Images/Critical1.png");
                               addHandler(div);
                           };
                       })
                       
              
                      
                   }
                   catch (err) {
                       errorHandle(formName, 'formLoaded_success', err);
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
                if (idStr.indexOf('takePerson') >= 0) { return };
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