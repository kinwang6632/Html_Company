(function ($) {
    var formName = 'dynUpdateGrid';
    var riadllName = 'CableSoft.RIA.Dynamic.DynUpdateGrid.Web.dll';
    var riaClassName = 'CableSoft.RIA.Dynamic.DynUpdateGrid.Web.DynUpdateGrid';
    var emptyValue = true;
    var endLinkProgramId = 'likp';
    var endCondtionId = "cond";
    var endPanelId = "panel";
    
    var defaults = (function () {
        this.language = {};
        this.master = {};
        this.detail = {}
        this.loginInfo = {};
        this.sysProgramId = '';        
        this.isSaved = false;
        this.isAutoClosed = false;
        this.editMode = 0;
        this.deleteShowQuestion = true
        this.isShowSuccess = false;       
        this.parameters = {};
        this.controls = [];
        this.allCompany = {};
        this.containerIsWindow = false;
        this.theme = '';
        this.copyLoginInfo = {};
        this.localization = null;
        this.partAHeigh = '50%';
        this.partBHeigh = '50%';
        this.dynGridSelector = '';
        this.dynUpdSelector = '';
        this.defaultCodeNo = null;
        this.showPreviousType = 0
        this.dynGridId = '';
        this.refNo = null;
    });
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
          //  options['closed'](options.returnValue);
        };
        if (options.containerIsWindow) {
            $(options['container']).csWindow('close');
        };
        
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
            removeHandler(div);
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var controls = $.data(div, formName).options.controls;
            if (options == undefined) { return; };
            //$(headerId + 'DynCondition').dynamicCondition('destroy');
            //unHandler(div);
            if (options.dynGridSelector != undefined) {
                if (options.dynGridSelector != '') {
                    $(options.dynGridSelector).dynamicGrid('destroy');
                };
            };
            if (options.dynUpdSelector != undefined) {
                if (options.dynUpdSelector != '') {
                    $(options.dynUpdSelector).dynamicUpdate('destroy');
                };
            };
            
            destroyControls(controls);
            deleteJSONObject(options);
            $(div).children().remove();
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
            }; 
            
            
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
        }
    };
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        /*
        execute: function (jq, params) {
            return jq.each(function () {
                execute(this, params);
            });
        }, */
        /*
        cancelData: function (jq, params) {
            return jq.each(function () {
                cancelData(this, params);
            })
        }, */
        setTheme: function (jq, params) {
            return jq.each(function () {
                return parameter(jq[0], 'theme', params);
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
        /*
        changeMode: function (jq, params, param2) {
            return jq.each(function () {
                changeMode(this, params, param2);
            });
        }, */
        resize: function (jq, params) {
            return jq.each(function () {
                formResize(this, params);
            });
        },
        canView: function (jq, params, param2) {
            return canView(params, param2);
        },
        canAppend: function (jq, params, param2) {
            return canAppend(params, param2);
        },
        canEdit: function (jq, params, param2) {
            return canEdit(params, param2);
        },
        canDelete: function (jq, params, param2) {
            return canDelete(params, param2);
        },
        canPrint: function (jq, params, param2) {
            return canPrint(params, param2);
        }
    };
    $.fn.dynUpdateGrid = function (options, param, param2) {
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
                    if (state) {
                        $.extend(state.options, options);
                    }
                    else {
                        $.data(this, formName, {
                            options: $.extend({}, new defaults(), new dynUpdateGrid(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.dynUpdateGrid_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynUpdateGrid', err);
        }
    };
    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            if (options.dynGridSelector != '') {
                $(options.dynGridSelector).dynamicGrid('resize', { height: $(options.dynGridSelector).height });
            };
            if ($(options.dynUpdSelector) != '') {
                $(options.dynUpdSelector).dynamicUpdate('resize');
            };
            
            /*
            var msg = "";
            for (var i = 0; i < controls.length; i++) {
                var o = $('#' + controls[i].name);
                o.each(function () {
                    $(this)[controls[i].type]('resize');
                });
            } */
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function winClosing(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        try {
            if (options.editMode != editMode.view) {
                messageBox(options.language.QuitAsk, messageType.yesno, null, function (flag) {
                    if (flag == 'yes') {
                        $($.data(event.data, formName).options.container).csWindow('close');
                    } else {
                        // changeMode(div, options.editMode);
                    };
                });
            } else {
                $($.data(event.data, formName).options.container).csWindow('close');
            };            
        } catch (err) {

        };
    };
    function chkCompSelected(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { SysProgramId: { type: 'string', value: options.sysProgramId } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkAuthority',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            
                            if ($.isFunction(act)) { act(true) };
                        }
                        else {                           
                            messageBox(data.ErrorMessage, messageType.critical, null, function (flag) {                               
                                if ($.isFunction(act)) { act(false) };
                            });
                            
                        };
                    } catch (err) {
                        errorHandle(formName, 'ChkAuthority-Server', err);
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
            errorHandle(formName, 'chkCompSelected', err);
        } finally {

        };
    };
    function chkAuthority(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { SysProgramId: { type: 'string', value: options.sysProgramId } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkAuthority',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            
                            if ($.isFunction(action)) { action() };
                        }
                        else {
                           
                            renderHtml(div);
                            disableAllControl(div);
                            if (options.dynGridSelector != '') {
                                $(options.dynGridSelector).dynamicGrid('destroy');
                                options.dynGridSelector = '';
                            };
                            if (options.dynUpdSelector != '') {
                                $(options.dynUpdSelector).dynamicUpdate('destroy');
                                options.dynUpdSelector = '';
                            };
                            $(headerId + "gilCompCode").csList('disabled', false);
                            options.editMode = editMode.view;
                            addHandler(div); 
                            messageBox(data.ErrorMessage, messageType.critical);                            
                            
                            
                        };
                    } catch (err) {
                        errorHandle(formName, 'ChkAuthority-Server', err);
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
            errorHandle(formName, 'ChkAuthority', err);
        } finally {

        };
    };
    function refreshUI(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        
        try {            
            removeHandler(div);
            getAllCompany(div,
                function () {
                    chkAuthority(div, function () {
                        queryDynUpdateGrid(div,
                        function () {
                            renderHtml(div,action);
                        });
                    })                    
                });
        } catch (err) {
            addHandler(div);
            errorHandle(formName, 'refreshUI', err);
        } finally {
            
        };
    };
    function disableAllControl(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');        
        $(headerId + 'btnSave').jqxButton({ disabled: true });
        $(headerId + 'btnAppend').jqxButton({ disabled: true });
        $(headerId + 'btnEdit').jqxButton({ disabled: true });
        $(headerId + 'btnDelete').jqxButton({ disabled: true });
        $(headerId + 'btnCopy').jqxButton({ disabled: true });
        $(headerId + 'btnCancel').jqxButton({ disabled: true });
        if (options.dynGridSelector != '') {
            
            $(options.dynGridSelector).dynamicGrid('disableAll', true);
        };
        if (options.dynUpdSelector != '') {
            
            $(options.dynUpdSelector).dynamicUpdate('disableAll', true);
        };
        
        
        $(headerId + "gilCompCode").csList('disabled', true);

    };
    function removeHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (options == undefined) { return; };
        $(headerId + 'btnCancel').off('click');
        if (options.dynGridSelector != undefined) {
            $(options.dynGridSelector).off('rowSelected');
        };
        
        $(headerId + 'btnSave').off('click');
        $(headerId + 'btnAppend').off('click');
        $(headerId + 'btnEdit').off('click');
        $(headerId + 'btnDelete').off('click');
        $(headerId + "gilCompCode").off('selectedIndexChanged');
        $(headerId + 'btnCopy').off('click');
        if (options.container != undefined) {
            options.container.unbind('keydown');
            options.container.off('keydown');
        };
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
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (options.container != undefined) {
            options.container.unbind('keydown');
            options.container.off('keydown');
        };
        $(headerId + 'btnCancel').off('click');
        $(headerId + 'btnCancel').bind('click', div, btnCancelClick);          
        $(options.dynGridSelector).off('rowSelected');
        $(options.dynGridSelector).bind('rowSelected', div, dynGridSelected);
        $(headerId + 'btnSave').off('click');
        $(headerId + 'btnSave').bind('click', div, btnSaveClick);
        $(headerId + 'btnAppend').off('click');
        $(headerId + 'btnAppend').on('click', div, btnAppendClick);
        $(headerId + 'btnEdit').off('click');
        $(headerId + 'btnEdit').on('click', div, btnEditClick);
        $(headerId + 'btnDelete').off('click');
        $(headerId + 'btnDelete').on('click', div, btnDeleteClick);
        $(headerId + "gilCompCode").off('selectedIndexChanged');
        $(headerId + "gilCompCode").on('selectedIndexChanged', div, gilCompSelected);
        $(headerId + 'btnCopy').off('click');
        $(headerId + 'btnCopy').bind('click', div, btnCopyClick);
        if (options.container != undefined) {
            $(options.container).bind('keydown', options, frmKeydown);
        };
        
    };
    function btnCancelClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return; };
        if (options.editMode == editMode.view) {
            if (options.containerIsWindow) {
                $($.data(event.data, formName).options.container).csWindow('close');
            };

        } else {
            //$(options.container).triggerHandler('winClosing');
            
            var ds = $(options.dynGridSelector).dynamicGrid('getFocusRow', true);
            $(options.dynUpdSelector).dynamicUpdate('changeMode', editMode.view);
            $(options.dynUpdSelector).dynamicUpdate('refreshDyncondition', ds, function (isSuccess, errMsg) {
                if (!isSuccess) {
                    if (errMsg != '') {
                        messageBox(errMsg, messageType.critical);
                    };
                };
                disableAllControl(event.data);
                options.editMode = editMode.view;
                changeMode(event.data);
            }); 
          
        };
    };
    function btnCopyClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return; };
        disableAllControl(event.data);
        $(options.dynUpdSelector).dynamicUpdate('copyToOtherDB', function (isSuccess, msg, dsQuery) {
            if (isSuccess) {
                var ds = {};
                $.extend(true, ds, dsQuery);
                showCopyForm(event.data,ds);
            } else {
                messageBox(msg, messageType.critical);
                changeMode(event.data);
            };
        })
        

    };
    function showCopyForm(div,ds,action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var options = $.data(div, formName).options;
        var maxWidth = 1024;
        var maxHeight = 768;
        if (options.containerIsWindow) {
            maxWidth = $(options.container).csWindow('width');
            maxHeight = $(options.container).csWindow('height');
        }
        var winOptions = $.extend({}, {
            width: 450, height: 200,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            keyboardCloseKey: 'none',
            resizable: true,
            haveClosing: false,
        });
        var result = createcsWindow(div, options.language.ShowCopyForm, winOptions);
        var xp = 'center';
        var yp = 0;
        if (options.containerIsWindow) {
            xp = ($(options.container).csWindow('width') - $('#' + result['windowId']).csWindow('width')) / 2;
            yp = ($(options.container).csWindow('height') - $('#' + result['windowId']).csWindow('height')) / 2;
        };

        $('#' + result['windowId']).csWindow({ position: { x: xp, y: 0 } });
        $('#' + result['contentId']).dynCopyToOther($.extend({}, {
            loginInfo: cloneJSON(options.loginInfo),
            container: '#' + result['windowId'],
            parameters:cloneJSON( ds),
            isExecute: true,
            sysProgramId : options.sysProgramId,
            editMode: options.editMode,
            localization:cloneJSON( options.localization)
        }));

        $('#' + result['windowId']).on('close',
            function () {
                $('#' + result['windowId']).off('close');
                try {
                    $('#' + result['windowId']).off('close');
                    $('#' + result['contentId']).dynCopyToOther('destroy');
                    $('#' + result['windowId']).csWindow('destroy');
                    /*
                    $(options.dynUpdSelector).dynamicUpdate('changeMode', options.editMode);
                    $(headerId + "gilCompCode").csList('disabled', false);
                    $(options.dynUpdSelector).dynamicUpdate('disableAll', true);
                    $(options.dynGridSelector).dynamicGrid('disableAll', false);
                    $(headerId + 'btnAppend').jqxButton({ disabled: false });
                    $(headerId + 'btnEdit').jqxButton({ disabled: false });
                    $(headerId + 'btnDelete').jqxButton({ disabled: false });
                    $(headerId + 'btnCopy').jqxButton({ disabled: false });
                    $(headerId + 'btnCancel').jqxButton({ disabled: false }); */
                   
                } catch (err) {
                    errorHandle(formName, 'dynCopyToOther_windowClose', err);
                } finally {
                    changeMode(div);                  
                };
            });
    }
    function gilCompSelected(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var currentComp = options.copyLoginInfo.loginInfo.rows[0].compcode;
        disableAllControl(event.data);        
        options.copyLoginInfo.loginInfo.rows[0].compcode = $(this).csList('codeNo');
        options.loginInfo.loginInfo.rows[0].compcode = $(this).csList('codeNo');
        chkCompSelected(event.data, function (r) {
            if (r) {
                refreshUI(event.data)
                $(headerId + "gilCompCode").csList('disabled', false);
                //$(this).csList('disabled', false);
            } else {
                options.copyLoginInfo.loginInfo.rows[0].compcode = currentComp;
                options.loginInfo.loginInfo.rows[0].compcode = currentComp;
                removeHandler(event.data);
                $(headerId + "gilCompCode").csList('codeNo', currentComp);
                //$(this).csList('codeNo', currentComp);
                changeMode(event.data);
                addHandler(event.data);
            };
        })

        
    };
    function btnDeleteClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return };
        if (options.deleteShowQuestion) {
            messageBox(options.language.DelAsk, messageType.yesno, null, function (flag) {
                if (flag == 'yes') {
                    options.editMode = editMode.delete;
                    $(options.dynUpdSelector).dynamicUpdate('changeMode', editMode.delete);
                    btnSaveClick(event);
                } else {
                   // changeMode(div, options.editMode);
                };
            });
        };
      
    };
    function btnEditClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return };
        options.editMode = editMode.edit;
        disableAllControl(event.data);
        changeMode(event.data);
    };
    function btnAppendClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return };
        options.editMode = editMode.append;
        disableAllControl(event.data);
        changeMode(event.data);
    };
    function btnSaveClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return };
        var grdRowIndex = 0;
        var left = 0;
        var top = 0;
        if (options.editMode == editMode.edit || options.editMode == editMode.delete) {
            
            var position = $(options.dynGridId).jqxGrid('scrollposition');
            left = position.left;
            top = position.top;
            grdRowIndex = $(options.dynGridId).jqxGrid('getselectedrowindex');
            if (options.editMode == editMode.delete) {
                grdRowIndex = grdRowIndex - 1;
                top = top - 5;
                if (top < 0) { top = 0; };
                if (grdRowIndex <= 0) { grdRowIndex = 0; left = 0; top = 0; }                
            };
            //var rowindex = $('#jqxGrid').jqxGrid('getselectedrowindex');
        };
        
        disableAllControl(event.data);
        $(options.dynGridSelector).off('rowSelected');        
        try {
            $(options.dynUpdSelector).dynamicUpdate('execute', function (isSuccess, errMsg, ds) {
                if (!isSuccess) {
                    messageBox(errMsg, messageType.critical);
                    emptyValue = false;
                    changeMode(event.data);
                    $(options.dynGridSelector).bind('rowSelected', event.data, dynGridSelected);
                    return;
                } else {
                    $(options.dynGridSelector).dynamicGrid('refreshGrid', function (r) {
                        if (r) {
                            if (grdRowIndex > 0) {
                               
                                $(options.dynGridId).jqxGrid({ selectedrowindex: grdRowIndex });
                                $(options.dynGridId).jqxGrid('scrolloffset', top, left);
                                $(options.dynGridId).jqxGrid('ensurerowvisible', grdRowIndex);
                            };
                            
                            
                            if (options.editMode == editMode.delete) {
                                messageBox(options.language.DelOK, messageType.information);
                                //$(options.dynGridSelector).bind('rowSelected', event.data, dynGridSelected);
                                //$(options.dynGridId).jqxGrid({ selectedrowindex: -1 });
                                //$(options.dynGridId).jqxGrid({ selectedrowindex: 0 });
                                //$(options.dynGridId).jqxGrid('scrolloffset', 0, 0);
                                //$(options.dynGridSelector).off('rowSelected');
                                
                            } else {
                                messageBox(options.language.SaveOK, messageType.information);
                                //go to the firs record if the editmode is append by Kin
                                if (options.editMode == editMode.append) {
                                    //$(options.dynGridSelector).bind('rowSelected', event.data, dynGridSelected);
                                    //$(options.dynGridId).jqxGrid({ selectedrowindex: -1 });
                                    //$(options.dynGridId).jqxGrid({ selectedrowindex: 0 });
                                    //$(options.dynGridId).jqxGrid('scrolloffset', 0, 0);
                                    //$(options.dynGridSelector).off('rowSelected');
                                };
                            };
                            if (options.editMode == editMode.append || options.editMode == editMode.delete) {
                                $(options.dynGridSelector).bind('rowSelected', event.data, dynGridSelected);
                                $(options.dynGridId).jqxGrid({ selectedrowindex: -1 });
                                $(options.dynGridId).jqxGrid({ selectedrowindex: 0 });
                                $(options.dynGridId).jqxGrid('scrolloffset', 0, 0);
                                $(options.dynGridSelector).off('rowSelected');
                            };
                            options.editMode = editMode.view;
                            changeMode(event.data);
                            //$(options['container']).csWindow('close');
                           
                        } else {
                            changeMode(event.data);
                            messageBox(options.language.refreshDynGridFail, messageType.critical);
                        };
                        $(options.dynGridSelector).bind('rowSelected', event.data, dynGridSelected);
                    });
                }
            });
        } catch (err) {
            changeMode(event.data);
            errorHandle(formName, 'btnSaveClick', err);
        } finally {

        };
    };
    function dynGridSelected(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var ds = $(options.dynGridSelector).dynamicGrid('getSelectedRow', true);
        try {
            $.each(ds, function (key, element) {                                
                ds[key].rows[0] = $.extend({},event.args.row);
            });
            $(options.dynUpdSelector).dynamicUpdate('refreshDyncondition',ds,function(isSuccess,errMsg) {
                if (!isSuccess) {
                    if (errMsg != '') {
                        messageBox(errMsg, messageType.critical);
                    };
                };
                disableAllControl(event.data);
                options.editMode = editMode.view;
                
                changeMode(event.data);
            })
           
        } catch (err) {
            errorHandle(formName, 'dynGridSelected', err);
        } finally {
            delete ds;
            ds = null;
        };
    };
    function changeMode(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
                
        try {            
            switch (options.editMode) {
                case (editMode.edit):
                    $(headerId + 'btnCancel').jqxButton({

                        value: options.language.Cancel
                    });
                    $(headerId + 'btnCancel').jqxButton({
                        imgSrc: imageScr.cancel.imgSrc,
                        //value: options.language.Cancel
                    });
                    
                    $(headerId + 'btnSave').jqxButton({ disabled: false });
                    $(headerId + 'btnCancel').jqxButton({ disabled: false });
                    if (emptyValue) {
                        $(options.dynUpdSelector).dynamicUpdate('changeMode', options.editMode);
                    };                    
                    $(options.dynUpdSelector).dynamicUpdate('reFieldStatus', options.editMode);
                    
                  
                   
                    
                    $(headerId + 'txtStatusMode').text(options.language.Edit);
                    break;
                
                case (editMode.append):
                    //$(headerId + 'btnCancel').jqxButton({
                    //    imgSrc: imageScr.cancel.imgSrc,
                    //    value: options.language.Cancel
                    //});
                    $(headerId + 'btnCancel').jqxButton({

                        value: options.language.Cancel
                    });
                    $(headerId + 'btnCancel').jqxButton({
                        imgSrc: imageScr.cancel.imgSrc,
                        //value: options.language.Cancel
                    });
                    $(headerId + 'btnSave').jqxButton({ disabled: false });
                    $(headerId + 'btnCancel').jqxButton({ disabled: false });
                    if (emptyValue) {
                        $(options.dynUpdSelector).dynamicUpdate('changeMode', options.editMode);
                    };
                    
                    $(options.dynUpdSelector).dynamicUpdate('reFieldStatus', options.editMode);
                    
                    
                  
                    //                    $(headerId + 'txtStatusMode').jqxInput('val', options.language.AddNew);
                    $(headerId + 'txtStatusMode').text(options.language.AddNew);
                    break;
                
                case (editMode.view):
                    $(headerId + 'btnCancel').jqxButton({ value: options.language.Quite });
                    $(headerId + 'btnCancel').jqxButton({
                        imgSrc: imageScr.exit.imgSrc,
                        value: options.language.Quite
                    });
                    $(options.dynUpdSelector).dynamicUpdate('changeMode', options.editMode);
                    $(headerId + "gilCompCode").csList('disabled', false);
                    $(options.dynUpdSelector).dynamicUpdate('disableAll', true);
                    $(options.dynGridSelector).dynamicGrid('disableAll', false);
                    
                    $(headerId + 'btnEdit').jqxButton({ disabled: false });
                    $(headerId + 'btnDelete').jqxButton({ disabled: false });
                    $(headerId + 'btnCopy').jqxButton({ disabled: false });                    
                  
                    $(headerId + 'btnCancel').jqxButton({ disabled: false });
                   
                    $(headerId + 'btnAppend').jqxButton({ disabled: false });
                    
                    //$(headerId + 'txtStatusMode').jqxInput('val', options.language.View);
                    $(headerId + 'txtStatusMode').text( options.language.View);
                    break;
                
            };
            // to avoid grid is empty by kin 
            if ($(options.dynGridId).jqxGrid('getrows').length == 0) {
                $(headerId + 'btnCancel').jqxButton({
                    imgSrc: imageScr.exit.imgSrc,
                    value: options.language.Quite
                });
                if (options.editMode != editMode.append) {
                    options.editMode = editMode.view;
                    $(options.dynUpdSelector).dynamicUpdate('changeMode', options.editMode);
                    $(headerId + "gilCompCode").csList('disabled', false);
                    $(options.dynUpdSelector).dynamicUpdate('disableAll', true);
                    $(options.dynGridSelector).dynamicGrid('disableAll', false);
                    $(headerId + 'btnAppend').jqxButton({ disabled: false });
                    $(headerId + 'btnSave').jqxButton({ disabled: true });
                    $(headerId + 'btnEdit').jqxButton({ disabled: true });
                    $(headerId + 'btnDelete').jqxButton({ disabled: true });
                    $(headerId + 'btnCopy').jqxButton({ disabled: true });
                    $(headerId + 'btnCancel').jqxButton({ disabled: false });
                 
                 
                    //$(headerId + 'txtStatusMode').jqxInput('val', options.language.View);
                    $(headerId + 'txtStatusMode').text( options.language.View);
                };                                
            };
            if (options.master.rows[0].CANCHOOSECOMP == 0) {
                $(headerId + "gilCompCode").csList('disabled', true);
                $(headerId + "gilCompCode").css("display", "none");
                $(headerId + 'lblCompCode').css("display", "none");
                $(headerId + "CompCodeArea").css("display", "none");
                $(options.dynGridSelector).dynamicGrid('resize', { height: $(options.dynGridSelector).height });
                $(options.dynUpdSelector).dynamicUpdate('resize');
            };
            
            //$(headerId + "CompCodeArea").css("visibility", "hidden");
            //$(headerId + "CompCodeArea").hide();
            //$(headerId + "CompCodeArea").css('height', '1px');
            if (options.master.rows[0].CANCOPYOTHERDB == 0) {
                //$(headerId + 'btnCopy').hide()
                $(headerId + 'btnCopy').jqxButton({ disabled: true });
                $(headerId + 'btnCopy').hide();
            };
            if (options.master.rows[0].DELETEFLAG == 0) {
                $(headerId + 'btnDelete').jqxButton({ disabled: true });
                $(headerId + 'btnDelete').hide();

            } else {
                if (!options.master.rows[0].CANDELETE) {
                    $(headerId + 'btnDelete').jqxButton({ disabled: true });
                };
            };
            if (!options.master.rows[0].CANAPPEND) {
                $(headerId + 'btnAppend').jqxButton({ disabled: true });
            };
           
            if (!options.master.rows[0].CANEDIT) {
                $(headerId + 'btnEdit').jqxButton({ disabled: true });
            };
        } catch (err) {
            errorHandle(formName, 'changeMode', err);
        } finally {
            emptyValue = true;
        };
    }
    function getAllCompany(div,action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (!$.isEmptyObject(options.allCompany)) {
            if ($.isFunction(action)) { action() };
            return;
        }
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName));

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetCompCode',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            if (tmp.Table.rows.length == 0) {
                                messageBox(options.language.NoneComp, messageType.critical);
                                return;
                            };
                            options.allCompany = $.extend({}, tmp.Table);
                            
                            /*
                            $(headerId + 'gilCompCode').csList('codeNo',
                                    option); */
                            delete tmp;
                            tmp = null;
                            if ($.isFunction(action)) { action() };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            //changeMode(div, options.editMode);
                        };
                    } catch (err) {
                        errorHandle(formName, 'getAllCompany-Server', err);
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
            errorHandle(formName, 'getAllCompany', err);
        } finally {

        };
    };
    function queryDynUpdateGrid(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (options.dynGridSelector != '') {
            $(options.dynGridSelector).dynamicGrid('destroy');
        };
        if (options.dynUpdSelector != '') {
            $(options.dynUpdSelector).dynamicUpdate('destroy');
            //$(options.dynUpdSelector).children().remove();
        };
        options.dynGridSelector = '';
        options.dynUpdSelector = '';
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { SysProgramId: { type: 'string', value: options.sysProgramId } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryDynUpdateGrid',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            if (tmp.Master == undefined) {
                                messageBox(options.language.NoneFoundSO1111A, messageType.critical);
                                addHandler(div);
                                return;
                            };
                            if (tmp.Master.rows.length == 0) {
                                messageBox(options.language.NoneFoundSO1111A, messageType.critical);
                                addHandler(div);
                                return;
                            };
                            if (tmp.Detail == undefined) {
                                messageBox(options.language.NoneFoundSO1111B, messageType.critical);
                                addHandler(div);
                                return;
                            };
                            if (tmp.Detail.rows.length == 0) {
                                messageBox(options.language.NoneFoundSO1111B, messageType.critical);
                                addHandler(div);
                                return;
                            };
                            options.master = $.extend({}, tmp.Master);
                            options.detail = $.extend({}, tmp.Detail);
                            $.each(options.detail.rows, function (index, row) {
                                var oheigh = row['Height'.toUpperCase()];
                                if (row['Height'.toUpperCase()] > 0) {
                                    switch (row['RowPos'.toUpperCase()]) {
                                        case (0): 
                                            if (row['HeightType'.toUpperCase()] == 0) {
                                                if (oheigh <= 10) {
                                                    oheigh = oheigh * 10;
                                                };
                                                options.partAHeigh = oheigh.toString() + '%';                                                
                                                options.partBHeigh = (100 - oheigh).toString() + '0%';
                                            } else {
                                                options.partAHeigh = row['Height'.toUpperCase()];
                                            };
                                            if (row['ObjSysType'.toUpperCase()] == 1) {
                                                options.dynGridSelector = headerId + 'partA';
                                                options.dynUpdSelector = headerId + 'partB';
                                            } else {
                                                options.dynGridSelector = headerId + 'partB';
                                                options.dynUpdSelector = headerId + 'partA';
                                            };
                                            break;
                                        
                                        case (1): 
                                            break;
                                        
                                    };
                                } else {
                                    if (row['ObjSysType'.toUpperCase()] == 1) {
                                        options.dynGridSelector = headerId + 'partA';
                                        options.dynUpdSelector = headerId + 'partB';
                                    } else {
                                        options.dynGridSelector = headerId + 'partB';
                                        options.dynUpdSelector = headerId + 'partA';
                                    };
                                };
                            });
                            delete tmp;
                            tmp = null;
                            if ($.isFunction(action)) { action() };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            addHandler(div);
                            //changeMode(div, options.editMode);
                        };
                    } catch (err) {
                        errorHandle(formName, 'queryDynUpdateGrid-Server', err);
                        addHandler(div);
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
            errorHandle(formName, 'queryDynUpdateGrid', err);
        } finally {

        };
    };
    function renderHtml(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        options.dynGridId = '';
        try {
            $('<style>.DyUpdGrdTable { width: 100%;height:100%; table-layout: fixed; margin: 0; padding: 0; text-align: left; }</style>').appendTo(div);
            $('<style>.DyUpdGrdTr { margin: 0; padding: 0; text-align: left; }</style>').appendTo(div);
            $('<style>.DyUpdGrdTd { margin: 0; padding: 0; vertical-align: central; }</style>').appendTo(div);
            $('<style>.DyUpdGrdMode { text-align: center; background-color: cyan; }</style>').appendTo(div);

            var content = '<table class="DyUpdGrdTable" data-id="Maincontainer"> ' +
                                    '<tr class="DyUpdGrdTr" style="height:30px" data-id="CompCodeArea">' +
                                        '<td class="DyUpdGrdTd" style="width:60px;color:red" data-id="lblCompCode"></td>' +
                                        '<td class="DyUpdGrdTd"><div data-id="gilCompCode" ></div></td>' +
                                        '</tr>' +
                                        '<tr class="DyUpdGrdTr" data-id="splitterName">' +
                                            '<td class="DyUpdGrdTd" data-id="splTest" colspan="2">' +
                                                '<div data-id="mainSplitter" > ' +
                                                    '<div data-id="partA" ></div> ' +
                                                    '<div data-id="partB"></div> ' +
                                                '</div>' +
                                            '</td>' +
                                        '</tr>' +
                                        '<tr class="DyUpdGrdTr" style="height:30px" >' +
                                            '<td class="DyUpdGrdTd" colspan="2">' +
                                                '<table class="DyUpdGrdTable">' +
                                                    '<tr class="DyUpdGrdTr">' +
                                                        '<td class="DyUpdGrdTd" style="width:80px">' +
                                                            '<button data-id="btnSave"></button>' +
                                                        '</td>' +
                                                        '<td class="DyUpdGrdTd" style="width:80px">' +
                                                            '<button data-id="btnAppend"></button>' +
                                                        '</td>' +
                                                        '<td class="DyUpdGrdTd" style="width:80px">' +
                                                            '<button data-id="btnEdit" ></button>' +
                                                        '</td>' +
                                                        '<td class="DyUpdGrdTd" style="width:80px">' +
                                                            '<button data-id="btnDelete" ></button>' +
                                                        '</td>' +                                                        
                                                        '<td class="DyUpdGrdTd" style="width:110px">' +
                                                            '<button data-id="btnCopy"></button>' +
                                                        '</td>' +
                                                         '<td class="DyUpdGrdTd" style="width:130px">' +                                                            
                                                           '<div data-id="btnSid"></div>' +
                                                        '</td>' +
                                                         '<td class="DyUpdGrdTd" style="width:60px">' +
                                                           
                                                        '</td>' +
                                                        '<td class="DyUpdGrdTd" style="width:80px">' +

                                                        '</td>' +
                                                        '<td class="DyUpdGrdTd" style="width:80px">' +

                                                        '</td>' +
                                                        '<td class="DyUpdGrdTd">' +
                                                            '<button data-id="btnCancel"  style="float:right;margin-right:4px"></button>' +
                                                        '</td>' +                                                                                                                
                                                        '<td  class="csslEditMode"><label class="csslEditMode" type="text" data-id="txtStatusMode" /></td>' +
                                                     '</tr>' +
                                                '</table>' +
                                            '</td>' +
                                        '</tr>' +
                                '</table>';
            if (options.controls == 0) {
                $(div).append(content);
                changeElementId(div);
                changeLanguage(div);
            };
              
               
            if (!renderControl(div)) { return false; };
            
            var dsData = {
                customer: {
                    columns: [{ name: 'x', type: 'integer' },                          
                    ],
                    rows: [{
                        x: -1,                         
                    }]
                }
            };
            if (options.parameters != undefined) {
                dsData = $.extend(true, {}, options.parameters);
            };
            
            $(options.dynGridSelector).off('loaded');
            $(options.dynGridSelector).on('loaded',
                        function () {
                            function getDefaultRecord() {
                                var selectRowIndex = 0;
                                var rows = $(options.dynGridSelector).dynamicGrid('getRows');
                                var allSame = false;
                                if (options.defaultCodeNo != null && rows.length > 0) {
                                    for (var i = 0; i < rows.length; i++) {
                                        $.each(rows[i], function (key, value) {
                                            $.each(options.defaultCodeNo, function (defKey, defValue) {
                                                if (key.toUpperCase() == defKey.toUpperCase()) {
                                                    if (value.toString() == defValue.toString()) {
                                                        //selectRowIndex = i;                                                        
                                                        allSame = true;
                                                    } else {
                                                        allSame = false;
                                                    };
                                                };                                               
                                            });
                                        });
                                        if (allSame) {
                                            selectRowIndex = i;
                                            return selectRowIndex;
                                        };
                                    };
                                }
                                return selectRowIndex;
                                /*
                                $.each([52, 97], function (index, value) {
                                    alert(index + ": " + value);
                                });*/

                                /*
                                var obj = {
                                    "flammable": "inflammable",
                                    "duh": "no duh"
                                };
                                $.each(obj, function (key, value) {
                                    alert(key + ": " + value);
                                }); */
                            };
                            try {
                                var gridRowIndex = getDefaultRecord();
                                options.dynGridId =  '#' + $(options.dynGridSelector).dynamicGrid('getControl', 'grid').name;
                                $(options.dynGridId).jqxGrid({ selectedrowindex: gridRowIndex });
                                $(options.dynGridId).jqxGrid('ensurerowvisible', gridRowIndex);
                                $(options.dynGridSelector).dynamicGrid('disableAll',true);
                                var ds = $(options.dynGridSelector).dynamicGrid('getFocusRow', true);
                                var mainTableName = null;
                                $.each(ds, function (keys, elements) {
                                    mainTableName = keys;
                                    return;
                                });
                                if (ds == undefined) {
                                    ds = {
                                        customer: {
                                            columns: [{ name: 'x', type: 'integer' },
                                            ],
                                            rows: [{
                                                x: -1,
                                            }]
                                        }
                                    };
                                };
                                if (ds == null) {
                                    ds = {
                                        customer: {
                                            columns: [{ name: 'x', type: 'integer' },
                                            ],
                                            rows: [{
                                                x: -1,
                                            }]
                                        }
                                    };
                                };
                                var dsCopy = $.extend({}, ds, dsData);
                                $(options.dynGridSelector).dynamicGrid('disableAll', true);
                                $(options.dynUpdSelector).on('loaded', function () {
                                    $(options.dynUpdSelector).dynamicUpdate('disableAll', true);
                                    //------------------------------------------------------------------------
                                    
                                        $('<div id="' + $(div).prop('id') + endLinkProgramId + '"></div>').appendTo($('#' + $(div).prop('id') + 'btnSid'));
                                        $('#' + $(div).prop('id') + endLinkProgramId).dynLinkProgram($.extend({}, {
                                            loginInfo: cloneJSON(options.loginInfo),
                                            container: options.container,
                                            parentProgramId: options.sysProgramId,
                                            showPreviousType: options.showPreviousType,
                                            localization:cloneJSON( options.localization),
                                            buttonHeight: 25,
                                            buttonWidth:130,
                                            conditionId: $(this).dynamicUpdate('options').DynConditionId,
                                            theme: options.theme
                                        }));
                                        options.controls.push({ name: endLinkProgramId, type: 'dynLinkProgram', level: 2 });
                                    

                                    //------------------------------------------------------------------------
                                    disableAllControl(div);
                                    addHandler(div);
                                    changeMode(div);
                                   



                                    if ($.isFunction(action)) { action() };
                                });
                               
                                $(options.dynUpdSelector).dynamicUpdate($.extend({}, {
                                    //loginInfo: options.loginInfo,
                                    loginInfo: cloneJSON( options.copyLoginInfo),
                                    //container: $(options.dynUpdSelector),
                                    container: $(headerId + 'Maincontainer'),
                                    
                                    //parameters: ds,
                                    parameters:cloneJSON( dsCopy),
                                    sysProgramId: options.sysProgramId,
                                    isAutoClosed: false,
                                    showAllButton: false,
                                    editMode: options.editMode,
                                    mainTableName: mainTableName,
                                    refNo:options.refNo,
                                    localization:cloneJSON( options.localization)
                                }));
                               
                              
                            } catch (err) {
                                errorHandle(formName, 'dynGridLoaded', err);
                            } finally {

                            }
                            
                        }
                );
            var aSysProgramId = '';            
            $.each(options.detail.rows, function (index, value) {
                if (value['ObjSysType'.toUpperCase()] == 1) {
                    aSysProgramId = value.OBJSYSPROID
                };
                return;
            });
            $(options.dynGridSelector).dynamicGrid({
                //loginInfo: options.loginInfo,
                loginInfo: cloneJSON( options.copyLoginInfo),
                container: $(headerId + 'partB'),
                //programId: options.sysProgramId,
                //sysProgramId: options.sysProgramId,
                //programId: options.detail.rows[0].OBJSYSPROID,
                sysProgramId: aSysProgramId,

                parentData: dsData,                
                //parentData: dsData,
                localization:cloneJSON( options.localization),
            });
            return true;
        } catch (err) {
            errorHandle(formName, 'renderHtml', err);
            return false;
        } finally {

        };
    };
    function setDynScreen(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            $.each(options.detail, function (index, row) {
                if (row['ObjSysType'.toUpperCase()] == 1) {

                } else {
                    //$(headerId + 'partA')
                }
            });
        } catch (err) {
            errorHandle(formName, 'setDynScreen', err);
        } finally {

        };
    };
    function formLoaded(div) {
        var options = $.data(div, formName).options;
        try {
            if (options.container != undefined) {
                $(options.container).bind('keydown', options, frmKeydown);
            };
            if (options.editMode == 9) { options.editMode = editMode.view };
            //options.copyLoginInfo = getParaLoginInfo(div, formName);
            options.copyLoginInfo = $.extend(true,{}, options.loginInfo);
            if ($(options.container).attr('class') != undefined) {
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    options.containerIsWindow = true;
                    var csw = $.data(div, formName).options.container;
                    csw.on("winClosing", div, winClosing);
                };
            };
            if (options.sysProgramId == '') {
                messageBox(options.language.NoneProgramId, messageType.critical);
                return;
            };
            refreshUI(div, function () { $(div).triggerHandler('loaded', [this, options]); });
            /*
            getAllCompany(div,
                function () {
                    queryDynUpdateGrid(div,
                        function () {renderHtml(div) });
                }); */
            /*
            $('<style>.DyUpdtable { width: 100%;height:100%; table-layout: fixed; margin: 0; padding: 0; text-align: left; }</style>').appendTo(div);
            $('<style>.DyUpdtr { margin: 0; padding: 0; text-align: left; }</style>').appendTo(div);
            $('<style>.DyUpdtd { margin: 0; padding: 0; vertical-align: central; }</style>').appendTo(div);
            $('<style>.DyUpdMode { text-align: center; background-color: cyan; }</style>').appendTo(div);

            var content = '<table class="DyUpdtable"> ' +
                                        '<tr class="DyUpdtr">   ' +
                                            '<td class="DyUpdtd" colspan="2"><div data-id="DynCondition"></div></td>' +
                                        '</tr> ' +
                                        '<tr class="DyUpdtr" data-id="btnFunction" style="height:35px"   > ' +
                                        ' <td class="DyUpdtd"><button data-id="btnOK" ></button></td>' +
                                            '<td class="DyUpdtd">' +
                                                '<input class="DyUpdMode" type="text" style="float:right" data-id="txtStatusMode"  /> ' +
                                                '<button style="float:right;margin-right:4px" data-id="btnCancel" ></button> ' +
                                            '</td>' +
                                        '</tr> ' +
                                        '</table>'
            $(div).append(content);
            changeElementId(div);
            initData(div, function () {
                if ($(options.container).attr('class') != undefined) {
                    if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                        options.containerIsWindow = true;
                        var csw = $.data(div, formName).options.container;
                        csw.on("winClosing", div, winClosing);
                    };
                };

            }); */
           
        } 
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = '#' + $(div).prop('id');
        var ctrLength = options.controls.length;
       // var condId = $(div).prop('id') + endCondtionId;
        //var condPanelId = $(div).prop('id') + endPanelId;
        try {
            //------------------------------------------------------------------------       
            if (ctrLength == 0) {
                $(headerId + 'mainSplitter').jqxSplitter({
                    //width: '100%',
                    //height: '100%',                  
                    //height : options.partAHeigh
                    width: $(headerId + 'partA').width(),
                    height: $(headerId + 'Maincontainer').height() - 75,                                  
                    //height: $(headerId + 'splTest').height() ,
                    orientation: 'horizontal',
                    splitBarSize: 3,
                    panels: [{ size: options.partAHeigh }]                    
                });
                controls.push({ name:$(div).prop('id') + 'mainSplitter', type: 'jqxSplitter', level: 1 });
            };
            $(headerId + 'mainSplitter').jqxSplitter({ panels: [{ size: options.partAHeigh }] });

            //trigger the events of dynamic controls for autocally resize
            $(headerId + 'mainSplitter').off('resize');
            $(headerId + 'mainSplitter').on('resize',
                    function (event) {
                        $(options.dynGridSelector).dynamicGrid('resize', { height: $(options.dynGridSelector).height });
                        $(options.dynUpdSelector).dynamicUpdate('resize');                        
                    });
            if (options.containerIsWindow) {
                $(options.container).off('resized');
                $(options.container).on('resized', function (event) {
                    $(options.dynGridSelector).dynamicGrid('resize', { height: $(options.dynGridSelector).height });
                    $(options.dynUpdSelector).dynamicUpdate('resize');
                });
            };
            //------------------------------------------------------------------------
            
            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                $(headerId + 'btnSave').jqxButton($.extend({}, imagePosition, {
                    width: 80,
                    height: 25,
                    imgSrc: imageScr.save.imgSrc
                }));
                controls.push({ name:$(div).prop('id') + 'btnSave', type: 'jqxButton', level: 2 });
                $(headerId + 'btnSave > img').css('top', '2px');
            };
            $(headerId + 'btnSave').jqxButton({ disabled: true });
            //------------------------------------------------------------------------
            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                $(headerId + 'btnAppend').jqxButton($.extend({}, imagePosition, {
                    width: 80,
                    height: 25,
                    imgSrc: imageScr.append.imgSrc
                }));
                controls.push({ name:$(div).prop('id')+ 'btnAppend', type: 'jqxButton', level: 2 });
                $(headerId + 'btnAppend > img').css('top', '2px');
            };
            $(headerId + 'btnAppend').jqxButton({ disabled: true });
            //------------------------------------------------------------------------
            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                $(headerId + 'btnEdit').jqxButton($.extend({}, imagePosition, {
                    width: 80,
                    height: 25,
                    imgSrc: imageScr.edit.imgSrc
                }));
                controls.push({ name:$(div).prop('id')+ 'btnEdit', type: 'jqxButton', level: 2 });
                $(headerId + 'btnEdit > img').css('top', '2px');
            };
            $(headerId + 'btnEdit').jqxButton({ disabled: true });
            //------------------------------------------------------------------------
            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                $(headerId + 'btnDelete').jqxButton($.extend({}, imagePosition, {
                    width: 80,
                    height: 25,
                    imgSrc: imageScr.delete.imgSrc
                }));
                controls.push({ name:$(div).prop('id') + 'btnDelete', type: 'jqxButton', level: 2 });
                $(headerId + 'btnDelete > img').css('top', '2px');
            };
            $(headerId + 'btnDelete').jqxButton({ disabled: true });
            //------------------------------------------------------------------------
            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                $(headerId + 'btnCopy').jqxButton($.extend({}, imagePosition, {
                    width: 110,
                    height: 25,
                    imgSrc: imageScr.sync.imgSrc
                    //imgSrc: 'Images/sync1.png'
                    // imageScr.sync
                }));
                controls.push({ name:$(div).prop('id')+ 'btnCopy', type: 'jqxButton', level: 2 });
                $(headerId + 'btnCopy > img').css('top', '2px');
            };
            $(headerId + 'btnCopy').jqxButton({ disabled: true });
            //------------------------------------------------------------------------
            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                    width: 80,
                    height: 25,                    
                    imgSrc: imageScr.exit.imgSrc,
                    value: options.language.Quite
                }));
                controls.push({ name:$(div).prop('id')+ 'btnCancel', type: 'jqxButton', level: 2 });
                $(headerId + 'btnCancel > img').css('top', '2px');
            };
            $(headerId + 'btnCancel').jqxButton({ disabled: true });
            //------------------------------------------------------------------------

            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                /*
                $(headerId + "txtStatusMode").jqxInput({
                    width: 50,
                    height: 23,
                    disabled: true,
                });
                controls.push({ name: 'txtStatusMode', type: 'jqxInput', level: 2 }); */
            };
            //------------------------------------------------------------------------
            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                $(headerId + "gilCompCode").csList({
                    source: options.allCompany.rows,
                    codeNoWidth: 60,
                    width: '300px',
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
                controls.push({ name:$(div).prop('id')+ 'gilCompCode', type: 'csList', level: 2 });
                $(headerId + 'gilCompCode').csList('codeNo',
                                       options.loginInfo.loginInfo.rows[0].compcode);
            };
            $(headerId + "gilCompCode").csList('disabled', true);
            $(headerId + "gilCompCode").csList('onlyDropDown', true);

            //------------------------------------------------------------------------
            return true;
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
            return false;
        } finally {

        };
        
    };
    function changeLanguage(div) {
        var options = $.data(div, formName).options;
        if (options.controls > 0) { return; };
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