(function ($) {
    var formName = 'dynamicUpdate';
    var riadllName = 'CableSoft.RIA.Dynamic.DynamicUpdate.Web.dll';
    var riaClassName = 'CableSoft.RIA.Dynamic.DynamicUpdate.Web.DynamicUpdate';
    var defaults = (function () {
        this.language = {};        
        this.master = {};
        this.detail = {};
        this.loginInfo = {};
        this.sysProgramId = '';
        this.isSaved = false;
        this.isAutoClosed = true;
        this.editMode = 0;
        this.isShowSuccess = false;
        this.enabledSaveButton = true;
        this.enabledCancelButton = true;
        this.showAllButton = true;
        this.disableMessage = true;        
        this.parameters = {};        
        this.controls = [];
        this.lockField = [];
        this.containerIsWindow = false;
        this.container = null;
        this.theme = '';
        this.localization = null;
        this.mainTableName = null;
        this.DynConditionId = null;
        this.refNo = null;
    });
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            //options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close');
    };
    function formResize(div) {
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'DynCondition').dynamicCondition('resize');
    };
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    function formDestroy(div) {
        try {
            
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            $(headerId + 'DynCondition').dynamicCondition('destroy');
            unHandler(div);
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
            };
            $(div).children().remove();
            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults;

        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        execute: function(jq,params) {
            return jq.each(function () {
                execute(this, params);
            });
        },
        
        copyToOtherDB: function(jq,params) {
            return jq.each(function () {
                copyToOtherDB(this, params);
            });
        },
        cancelData:function(jq,ds, params) {
            return jq.each(function() {
                cancelData(this,ds, params);
            })
        },
        deleteData: function (jq,params)  {
            return jq.each(function () {
                execute(this, params);
            });
        },
        disableAll:function(jq,params) {
            return jq.each(function () {                
                var headerId = '#' + $(jq[0]).prop('id');
                $(headerId + 'DynCondition').dynamicCondition('disableAll', params);
            });
        },
        refreshDyncondition:function(jq,params,params2) {
            return jq.each(function () {
                refreshDyncondition(this, params,params2);
            });
        },
        reFieldStatus: function(jq,params) {
            
            return jq.each(function () {
                var options = $.data(jq[0], formName).options;
                var headerId = '#' + $(jq[0]).prop('id');
                lockField(jq[0], params);
                $(headerId + 'DynCondition').dynamicCondition('disableFields', false, options.lockField);
            });
        },
        setTheme: function (jq, params) {
            return jq.each(function () {
                return parameter(jq[0], 'theme', params);
            });
        },
        resize: function (jq) {
            return jq.each(function () {
                formResize(this);
            });
        },
        theme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
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
        changeMode:function(jq,params,param2) {
            return jq.each(function () {
                changeMode(this,params,param2);
            });
        },
        canView: function (jq, params, param2) {
            if ($.isFunction(param2)) { param2([true, null]); };
            //return canView(params, param2);
        },
        canAppend: function (jq, params, param2) {
            if ($.isFunction(param2)) { param2([true, null]); };
            
        },
        canEdit: function (jq, params, param2) {
            if ($.isFunction(param2)) { param2([true, null]); };
        },
        canDelete: function (jq, params, param2) {
            if ($.isFunction(param2)) { param2([true, null]); };
        },
        canPrint: function (jq, params, param2) {
            if ($.isFunction(param2)) { param2([true, null]); };
        }
    };
    $.fn.dynamicUpdate = function (options, param, param2) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param,param2);
                }
                return;
            }
            options = options || {};
            return this.each(function () {
                try {
                    var state = $.data(this, formName);
                    if ($.isEmptyObject(state)) { state = undefined; };
                    if (state) {
                        $.extend(state.options, options);
                    }
                    else {
                        $.data(this, formName, {
                            options: $.extend({}, new defaults(), new dynamicUpdate(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.dynamicUpdate_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynamicUpdate', err);
        }
    };
    function refreshDyncondition(div, inData,action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            $(headerId + 'DynCondition').dynamicCondition({ editMode: options.editMode });
            $(headerId + 'DynCondition').dynamicCondition('refreshDefault', inData,
                   function () {
                       try {
                           //options.editMode = editMode.view;
                           //changeMode(div);
                           if ($.isFunction(action)) { action(true, '') };
                       } catch (err) {
                           if ($.isFunction(action)) { action(false, err.message) };
                       };
                   });
        } catch (err) {

        } finally {

        };
    };
    function canAppend(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };
    function canView(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };
    function canEdit(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };
    function canDelete(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    }; function canPrint(data, action) {
        if ($.isFunction(action)) { action([true, null]); };
    };
    function winClosing(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        /*
        try {
            $($.data(event.data, formName).options.container).csWindow('close');
        } catch (err) {

        }; */
        if (options.editMode != editMode.view) {
            if (options.editMode == editMode.delete) {
                $($.data(event.data, formName).options.container).csWindow('close');
                return;
            };
            messageBox(options.language.AskStr, messageType.yesno, null, function (flag) {
                if (flag == 'yes') {
                    $($.data(event.data, formName).options.container).csWindow('close');
                } else {
                    // changeMode(div, options.editMode);
                };
            });
        } else {            
            $($.data(event.data, formName).options.container).csWindow('close');
        };
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            $('<style>.DyUpdtable { width: 100%;height:100%; table-layout: fixed; margin: 0; padding: 0; text-align: left; }</style>').appendTo(div);
            $('<style>.DyUpdtr { margin: 0; padding: 0; text-align: left; }</style>').appendTo(div);
            $('<style>.DyUpdtd { margin: 0; padding: 0; vertical-align: central; }</style>').appendTo(div);
            $('<style>.DyUpdMode { text-align: center; background-color: cyan; }</style>').appendTo(div);

            var content = '<table class="DyUpdtable"> ' +
                                        '<tr class="DyUpdtr">   ' +
                                            '<td class="DyUpdtd" colspan="2"  style="height:100%;width:100%"><div style="width:100%;height:100%" data-id="DynCondition"></div></td>' +                                            
                                           // '<td class="DyUpdtd" colspan="2"><div  data-id="DynCondition"></div></td>' +
                                        '</tr> ' +
                                        '<tr class="DyUpdtr" data-id="btnFunction" style="height:30px"   > '  +
                                          ' <td class="DyUpdtd"><button data-id="btnOK" ></button></td>'  +
                                              '<td class="DyUpdtd">' +                                                
                                                   '<table class="DyUpdtable" > ' +
                                                      '<tr class="DyUpdtr" style="float:right">   ' +
                                                         '<td class="DyUpdtd"><button style="float:right;margin-right:4px" data-id="btnCancel" ></button> </td>' +
                                                         '<td class="DyUpdtd" ><label class="csslEditMode" type="text"  data-id="txtStatusMode"  /></td>' +
                                                     '</tr> ' +
                                                   '</table>' +                                                                                                                                                  
                                            '</td>' +
                                         '</tr> ' +
                                        '</table>'
            $(div).append(content);
            changeElementId(div);
            initData(div, function () {
                if ($(options.container).attr('class') != undefined) {
                    if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                        $(options.container).bind('keydown', options, frmKeydown);
                        options.containerIsWindow = true;
                        var csw = $.data(div, formName).options.container;
                        csw.on("winClosing", div, winClosing);                        
                        csw.on('resized', function (event) {
                            
                            $('#' + $(div).prop('id') + 'DynCondition').dynamicCondition('resize');                            
                           });
                        
                    };
                };
                
            });
            /*
            $.ajax({
                url: 'dynamicComponent\\' + formName + '.html',
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        initData(div, function () {
                            
                            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                options.containerIsWindow = true;
                                var csw = $.data(div, formName).options.container;
                                csw.on("winClosing", div, winClosing);                             
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
            }); */
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function frmKeydown(e) {
        try {

            if (e.ctrlKey && e.which == 119) {
                messageBox(formName + JSON.stringify(e.data, null, '\t'), null, null, null, { width: 800, height: 500 });
            }
        }
        catch (err) {
            //errorHandle(formName, 'frmAddHandler_keydown', err, true);
        }
    };
    function QueryEnvironment(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, options.copyLoginInfo,
              { EditMode: { type: 'integer', value: options.editMode } },
              { SysProgramId: { type: 'string', value: options.sysProgramId } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryEnvironment',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            options.master = $.extend({}, tmp.Master);
                            options.detail = $.extend({}, tmp.Detail);
                            delete tmp;
                            tmp = null;
                            if ($.isFunction(action)) { action() };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            //changeMode(div, options.editMode);
                        };                        
                    } catch (err) {
                        errorHandle(formName, 'QueryEnvironment-Server', err);
                        //          changeMode(div);
                        //          unBindHandler(div)
                        //          bindHandler(div);
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
            errorHandle(formName, 'QueryEnvironment', err);
            //changeMode(div);
            //unBindHandler(div)
            //bindHandler(div);
        } finally {

        };
    };
    function unHandler(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (options.showAllButton) {
            $(headerId + 'btnOK').unbind('click', btnOKClick);
            $(headerId + 'btnOK').off('click');
            $(headerId + 'btnCancel').unbind('click', btnCancel);
            $(headerId + 'btnCancel').off('click');
        }
    }
    function addHandler(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (options.showAllButton) {
            $(headerId + 'btnOK').unbind('click', btnOKClick);
            $(headerId + 'btnOK').bind('click', div, btnOKClick);
            $(headerId + 'btnCancel').unbind('click', btnCancel);
            $(headerId + 'btnCancel').bind('click', div, btnCancel);
        };
        
    };
    function cancelData(div, ds,action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            $(options.container).triggerHandler('winClosing', event.data);
            /*
            if (options.editMode == editMode.view  || options.editMode == editMode.delete) {
                if (options.containerIsWindow) {
                    $(options.container).triggerHandler('winClosing', event.data);
                };
                if ($.isFunction(action)) { action(true,'') };
            } else {
                $(headerId + 'DynCondition').dynamicCondition({ editMode: editMode.view });
                $(headerId + 'DynCondition').dynamicCondition('refreshDefault', ds,
                    function () {
                        try {
                            options.editMode = editMode.view;
                            changeMode(div);
                            if ($.isFunction(action)) { action(true, '') };
                        } catch (err) {
                            if ($.isFunction(action)) { action(false, err.message) };
                        };
                        
                    });
            }; */
        } finally {

        };
       
    };
    function btnCancel(event) {
        var options = $.data(event.data, formName).options;
        cancelData(event.data, options.parameters, function (isSuccess, msg) {
            if (!isSuccess) {
                if (msg != '') { messageBox(msg, messageType.critical); };
            };
           });
        /*
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if (options.editMode == editMode.view) {
            if (options.containerIsWindow) {
                $(options.container).triggerHandler('winClosing', event.data);
            };
        } else {
            $(headerId + 'DynCondition').dynamicCondition('refreshDefault', options.parameters,
                function () {
                    options.editMode = editMode.view;
                    changeMode(event.data);
                });                                            
        }; */
    };
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return; };
        unHandler(event.data);
        execute(event.data, function (isSuccess, errMsg, ds) {
            try {
                if (!isSuccess) {
                    if (errMsg != '') {
                        messageBox(errMsg, messageType.critical);
                    };
                } else {
                    options.isSaved = true;
                    if (options.editMode == editMode.delete ) {
                        if (options.isAutoClosed) {
                            if (options.containerIsWindow) {
                                $(options.container).triggerHandler('winClosing', event.data);
                            };
                            return;
                        };
                        return;
                    };
                    options.editMode = editMode.view;
                    messageBox(options.language.SaveOK, messageType.information, null, function (flag) {
                        if (options.isAutoClosed) {
                            if (options.containerIsWindow) {
                                $(options.container).triggerHandler('winClosing', event.data);
                            };
                            return;
                        };
                        changeMode(event.data);
                        
                    });
                };
            } finally {
                if (options.showAllButton) {
                    addHandler(event.data);
                };
            };
           
        });
    };
    function copyToOtherDB(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var query = $(headerId + 'DynCondition').dynamicCondition('getQueryData', function (query) { 
                if (query[0] == true) { 
                    if ($.isFunction(action)) { action(true, null, query[2]) };
                } else {
                    if ($.isFunction(action)) { action(false, query[1], null) };
                };
            } )
        } catch (err) {
            if ($.isFunction(action) ) {
                action(false, err, null);
            } else {
                errorHandle(formName, 'execute', err);
            };
        } finally {

        };
    };
    function execute(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');        
        
        //$(div).triggerHandler('loaded');
        try {
            var query = $(headerId + 'DynCondition').dynamicCondition('getQueryData', function (query) {
                var isSuccess = true;
                var errMsg = '';
                var ds = null;
                var e = $.Event('ExecuteCompleted', { isSuccess: isSuccess, errMsg: errMsg, ds: ds });
                if (query[0] == true) {
                    try {
                        var parameters = $.extend({}, options.copyLoginInfo,
                          { EditMode: { type: 'integer', value: options.editMode } },
                          { SysProgramId: { type: 'string', value: options.sysProgramId } },
                          { dsSource: { type: 'string', value: JSON.stringify(query[2]) } });

                        var params = getParameters(riadllName,
                               riaClassName,
                               'Execute',
                               JSON.stringify(parameters));
                        getServerData(params, {
                            success: function (data) {                               
                                try {
                                    if (data.ErrorCode == 0) {
                                        ds = query[2];
                                        e.ds = ds;
                                        var tmp = JSON.parse(data.ResultXML);
                                        
                                       // options.master = $.extend({}, tmp.Master);
                                       // options.detail = $.extend({}, tmp.Detail);
                                        delete tmp;
                                        tmp = null;
                                        options.editMode = editMode.view;
                                        //changMode(div);
                                        //if ($.isFunction(action)) { action() };
                                    }
                                    else {
                                        //messageBox(data.ErrorMessage, messageType.critical);
                                        //changeMode(div, options.editMode);
                                        isSuccess = false;
                                        errMsg = data.ErrorMessage;
                                    };
                                    if ($.isFunction(action)) { action(isSuccess, errMsg, ds); };
                                  
                                    
                                } catch (err) {
                                    if ($.isFunction(action)) { action(false, err, null) };
                                    e.isSuccess = false;
                                    e.errMsg = err.message;
                                    e.ds = null;
                                    //errorHandle(formName, 'QueryEnvironment-Server', err);
                                    //          changeMode(div);
                                    //          unBindHandler(div)
                                    //          bindHandler(div);
                                } finally {
                                    parameters = null;
                                    params = null;
                                    data = null;
                                    delete data;
                                    delete parameters;
                                    delete params;                                   
                                    $(div).triggerHandler(e);
                                };
                            }
                        });
                    } catch (err) {
                        if ($.isFunction(action)) { action(false, err, null) };
                        e.isSuccess = false;
                        e.errMsg = err.message;
                        e.ds = null;
                        $(div).triggerHandler(e);
                        //errorHandle(formName, 'QueryEnvironment', err);
                        //changeMode(div);
                        //unBindHandler(div)
                        //bindHandler(div);
                    } finally {
                        
                    };
                } else {
                    if ($.isFunction(action)) { action(false, query[1], null) };
                    e.isSuccess = false;
                    e.errMsg = query[1];
                    e.ds = null;
                    $(div).triggerHandler(e);
                };
            });
        } catch (err) {
            errorHandle(formName, 'execute', err);
        }
    }
    function setDynamicCtl(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            $(headerId + 'DynCondition').dynamicCondition($.extend({}, {
                loginInfo: cloneJSON( options.loginInfo),
                //container: $(headerId + 'DynCondition'),
                container: options.container,
                sysProgramId: options.sysProgramId,
                parameters:cloneJSON( options.parameters),
                localization:cloneJSON( options.localization),
                editMode: options.editMode,
                refNo : options.refNo,
                //readOnlyFields: options.lockField,
                disableMessage : options.disableMessage
                //localization: localization
            }));
            if ($.isFunction(action)) { action() };
            return true;
            /*
            var query = $(headerId + 'DynCondition').dynamicCondition('getQueryData', function (query) {
                if (query[0] == true) {
                    alert(JSON.stringify(query[2]));
                }
            }); */
        } catch (err) {
            errorHandle(formName, 'setDynamicCtl', err);
            return false;
        } finally {

        };
    };
    function lockField(div,e, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            options.lockField.length = 0;
            $.each(options.detail.rows, function (index, row) {
                if (row['FieldType'.toUpperCase()] == 1) {
                    switch (e) {
                        case (editMode.append): 
                            if (row['PKCanKey'.toUpperCase()] == 0) { options.lockField.push(row['SourceField'.toUpperCase()]); };
                            break;
                        
                        case (editMode.edit): 
                            options.lockField.push(row['SourceField'.toUpperCase()]);
                            break;
                        
                        default: 
                            if (row['SourceTable'.toUpperCase()] != null) {
                                switch (row['SourceTable'.toUpperCase()]) {
                                    case ('LogInInfo'.toUpperCase()): 
                                        break;
                                    
                                    case ('SeqNo'.toUpperCase()): 
                                        break;
                                    
                                    default: 
                                        options.lockField.push(row['SourceField'.toUpperCase()]);
                                    
                                };
                            };                           
                            break;
                        
                    };           
                };
            })
            if ($.isFunction(action)) { action(); };
            return true;
        } catch (err) {
            errorHandle(formName, 'lockField', err);
        } finally {

        }
    }
    function changeMode(div, e, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (e == undefined) { e = options.editMode } else { options.editMode = e };
        if (options.editMode == 9) { options.editMode = editMode.view };
        try {
           
            if (!options.enabledCancelButton) { $(headerId + 'btnCancel').jqxButton({ disabled: false }); };
            if (!options.enabledSaveButton) { $(headerId + 'btnOK').jqxButton({ disabled: false }); };
            $(headerId + 'btnCancel').jqxButton({
                imgSrc: imageScr.exit.imgSrc,
                value: options.language.Quite
            });
            $(headerId + 'DynCondition').dynamicCondition({ editMode: e });
            switch (e) {
                case (editMode.view) :
                    //                    $(headerId + 'txtStatusMode').jqxInput('val', options.language.View);
                    $(headerId + 'txtStatusMode').text(options.language.View);
                    $(headerId + 'btnOK').jqxButton({ disabled: true });
                    $(headerId + 'DynCondition').dynamicCondition('disableAll', true);
                    break;
                
                case (editMode.append):
                    //                    $(headerId + 'txtStatusMode').jqxInput('val', options.language.AddNew);
                    $(headerId + 'txtStatusMode').text( options.language.AddNew);
                    $(headerId + 'btnCancel').jqxButton({
                        imgSrc: imageScr.cancel.imgSrc,
                        //value: options.language.Cancel
                        value: options.language.Quite
                    });
                   ds = $.extend(true,{}, options.parameters);
                    var tableName = '';
                    $.each(ds, function (keys, elements) {
                        tableName = keys;
                        return;                        
                    });
                    if (options.mainTableName != null) { tableName = options.mainTableName; };
                    if (ds[tableName].rows.length > 0) {
                        $.each(ds[tableName].rows[0], function (index, value) {
                            ds[tableName].rows[0][index] = null;
                        });

                    };
                    
                    $(headerId + 'DynCondition').dynamicCondition('refreshDefault',ds ,function(){})
                    //$(headerId + 'DynCondition').dynamicCondition('reset');
                    //$(headerId + 'DynCondition').dynamicCondition('disableAll', false);
                    break;
                
                case (editMode.edit): 
                    //                    $(headerId + 'txtStatusMode').jqxInput('val', options.language.Edit);
                    $(headerId + 'txtStatusMode').text( options.language.Edit);
                    $(headerId + 'btnCancel').jqxButton({
                        imgSrc: imageScr.cancel.imgSrc,
                        //value: options.language.Cancel
                        value: options.language.Quite
                    });
                    //$(headerId + 'DynCondition').dynamicCondition('disableAll', false);
                    break;
                
                default: 
                    //                    $(headerId + 'txtStatusMode').jqxInput('val', options.language.Delete);
                    $(headerId + 'txtStatusMode').text( options.language.Delete);
                    break;
                
            };
            if ($.isFunction(action)) { action() };
        } catch (err) {
            errorHandle(formName, 'changeMode', err);
        } finally {

        };
    };

    function initData(div,  action) {
        var options = $.data(div, formName).options;         
        var headerId = '#' + $(div).prop('id');
        try {
            //unBindHandler(div);
            changeLanguage(div);
            options.copyLoginInfo = getParaLoginInfo(div, formName);
            if (!options.showAllButton) { $(headerId + 'btnFunction').hide(); };
            if (options.editMode == 9) { options.editMode = editMode.view };
            //$(".target").hide()
            renderControl(div);
            if (options.sysProgramId == '') {
                messageBox(options.language.noSysProgramId, messageType.critical);
                return;
            }
            QueryEnvironment(div,
                function () {
                    lockField(div,options.editMode);
                    
                    $(headerId + 'DynCondition').on('loaded', function () {
                        $(headerId + 'DynCondition').dynamicCondition('resize');
                        switch (options.editMode) {
                            case (editMode.append):
                                $(headerId + 'DynCondition').dynamicCondition('disableFields',false, options.lockField);
                                break;
                            
                            case (editMode.edit): 
                                $(headerId + 'DynCondition').dynamicCondition('disableFields',false, options.lockField);
                                break;
                            
                            case (editMode.view): 
                                $(headerId + 'DynCondition').dynamicCondition('disableAll', true);
                                break;
                            
                        };
                        changeMode(div);
                        $(headerId + 'DynCondition').unbind('loaded');
                        $(headerId + 'DynCondition').off();
                        options.DynConditionId = $(div).prop('id') + 'DynCondition';
                        $(div).triggerHandler('loaded');
                        
                        
                    });
                    if (!setDynamicCtl(div)) { return false };
                    addHandler(div);

                });

        } catch (err) {
            errorHandle(formName, 'initData', err);
        } finally {
            if ($.isFunction(action)) { action(); };
        };
    };
    
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;        
        var headerId = '#' + $(div).prop('id');
        //------------------------------------------------------------------------
        $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
            width: 70,
            height: 25,
            imgSrc: imageScr.ok.imgSrc
        }));
        controls.push({ name: 'btnOK', type: 'jqxButton', level: 2 });
        $(headerId + 'btnOK > img').css('top', '2px');
        //------------------------------------------------------------------------
        //------------------------------------------------------------------------
        $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
            width: 70,
            height: 25,
            imgSrc: imageScr.cancel.imgSrc
        }));
        controls.push({ name: 'btnCancel', type: 'jqxButton', level: 2 });
        $(headerId + 'btnCancel > img').css('top', '2px');
        //------------------------------------------------------------------------
        //------------------------------------------------------------------------
        /*
        $(headerId + "txtStatusMode").jqxInput({
            width: 50,
            height: 23,
            disabled: true,
        });
        controls.push({ name: 'txtStatusMode', type: 'jqxInput', level: 2 }); */
        //------------------------------------------------------------------------
      
    };
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var idArray = $('*[id^=' + $(div).prop('id') + ']');

        try {
            idArray.each(function (index, value) {
                var idStr = $(value).attr('id');
                if (idStr.indexOf('csmProduct') >= 0) { return };
                if (idStr.indexOf('csmCharge') >= 0) { return };
                if (idStr.indexOf('csmACH') >= 0) { return };
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