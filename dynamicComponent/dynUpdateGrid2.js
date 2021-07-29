(function ($) {
    var formName = 'DynUpdateGrid2';
    var riadllName = 'CableSoft.RIA.Dynamic.DynUpdateGrid2.Web.dll';
    var riaClassName = 'CableSoft.RIA.Dynamic.DynUpdateGrid2.Web.DynUpdateGrid2';
    var emptyValue = true;
    var endLinkProgramId = 'likp';
    var endCondtionId = "cond";
    var endPanelId = "panel";
    var frmCaption = null;
    var defaults = (function () {
        this.language = {};
        this.master = {};
        this.detail = {};
        this.so1109b = {};
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
        this.lockField = [];
        this.dynGridId = '';
        this.parentEditMode = 0;
        
    });
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
          
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
        var headerId = '#' + $(div).prop('id');
        var options = $.data(div, formName).options;
        
        var controls = $.data(div, formName).options.controls;
        unHandle(div);
        destroyControls(controls);
        deleteJSONObject(options);
        $(div).children().remove();
        /*
        try {

            removeHandler(div);
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var controls = $.data(div, formName).options.controls;
            if (options == undefined) { return; };
            
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
            
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        } */
    };
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },       
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
        getRows: function (jq, addSchema) {
            return getRows(jq[0], addSchema);
        },
        destroy: function (jq) {
            return jq.each(function () {
                formDestroy(this);
            });
        },
        disabled: function (jq, params) {
            return jq.each(function () {
                disabled(jq[0], params);
            });
        },
        changeMode: function (jq, params, param2) {
            return jq.each(function () {
                $.data(jq[0], formName).options.editMode = params
                changeMode(this, params, param2);
            });
        },
        resize: function (jq, params) {
            return jq.each(function () {
                formResize(this, params);
            });
        },
        canView: function (jq, params, param2, param3) {
            return canView(params, param2, param3);
        },
        canAppend: function (jq, params, param2, param3) {
            return canAppend(params, param2, param3);
        },
        canEdit: function (jq, params, param2, param3) {
            return canEdit(params, param2, param3);
        },
        canDelete: function (jq, params, param2, param3) {
            return canDelete(params, param2, param3);
        },
        canPrint: function (jq, params, param2, param3) {
            return canPrint(params, param2, param3);
        }
    };
    $.fn.dynUpdateGrid2 = function (options, param, param2, param3) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, param2, param3);
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
                            options: $.extend({}, new defaults(), new dynUpdateGrid2(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.dynUpdateGrid2_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynUpdateGrid2', err);
        }
    };
    function getRows(div, addSchema) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        return $(headerId + 'iGrid').dynamicGrid('getRows', addSchema);
    };
    function disabled(div, params) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnAppend').jqxButton({ disabled: params });
        $(headerId + 'btnSave').jqxButton({ disabled: params });
        $(headerId + 'btnEdit').jqxButton({ disabled: params });
        $(headerId + 'btnDelete').jqxButton({ disabled: params });
        $(headerId + 'btnCancel').jqxButton({ disabled: params });
        $(headerId + 'btnSave').jqxButton({ disabled: true });
        $(headerId + 'btnCancel').jqxButton({ disabled: true });
        if (!params) {
            var rows = $(headerId + 'iGrid').dynamicGrid('getRows');
            if (rows.length == 0) {
                $(headerId + 'btnEdit').jqxButton({ disabled: true });
                $(headerId + 'btnDelete').jqxButton({ disabled: true });
            };
        };                
    };

    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            $($(headerId + 'conditionAndButton').parent()[0]).prop('style', 'height:100%;width:100%;float:left');
            var parentHeight = $(headerId + 'conditionAndButton').height() - 30;
            $(headerId + 'condition').prop('style', 'height:' + parentHeight + 'px;width:100%;float:left');
            //var parentHeight = $($(headerId + 'funDiv').parent()[0]).height() - 30;
            //var parentWidth = $($(headerId + 'funDiv').parent()[0]).width();
            //$($(headerId + 'condition').parent()[0]).prop('style', 'height:' + parentHeight + 'px;width:' + parentWidth + 'px;float:left');
            ////$($(headerId + 'condition').parent()[0]).prop('style', 'width:' + parentWidth + 'px;width:' + parentWidth + 'px');
            //$($($($(headerId + 'condition').parent()[0])).parent()[0]).prop('style', 'height:' + parentHeight + 'px;width:' + parentWidth + 'px;float:left' );
            ////$($($($(headerId + 'condition').parent()[0])).parent()[0]).prop('style', 'width:' + parentWidth + 'px');
            //$(headerId + 'condition').dynamicCondition('resize');
            //$(headerId + 'iGrid').dynamicGrid('resize');
            $(headerId + 'condition').dynamicCondition('resize');
            $(headerId + 'iGrid').dynamicGrid('resize');
            
          
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
                /*
                messageBox(options.language.QuitAsk, messageType.yesno, null, function (flag) {
                    if (flag == 'yes') {
                        $($.data(event.data, formName).options.container).csWindow('close');
                    } else {                        
                    };
                }); */
                $($.data(event.data, formName).options.container).csWindow('close');
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
                            action(true);
                            if ($.isFunction(action)) { action() };
                        }
                        else {
                           
                            //renderHtml(div);
                            disableAllControl(div);
                            if (options.dynGridSelector != '') {
                                $(options.dynGridSelector).dynamicGrid('destroy');
                                options.dynGridSelector = '';
                            };
                            if (options.dynUpdSelector != '') {
                                $(options.dynUpdSelector).dynamicUpdate('destroy');
                                options.dynUpdSelector = '';
                            };
                            //$(headerId + "gilCompCode").csList('disabled', false);
                            options.editMode = editMode.view;
                            addHandler(div); 
                            messageBox(data.ErrorMessage, messageType.critical);                            
                            action(false);
                            
                        };
                    } catch (err) {
                        
                        errorHandle(formName, 'ChkAuthority-Server', err);
                        addHandler(div);
                        action(false);
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
            //removeHandler(div);
            
            
            chkAuthority(div, function (r) {
                if (r) {
                    queryDynUpdateGrid2(div, function (r) {
                        if (r) {
                            //$(headerId + 'btnAppend').jqxButton({ disabled: false });                           
                            renderControl(div);
                            AddDynControl(div, function (r) {

                            });
                        }
                    })
                };
            })
            //getAllCompany
            //removeHandler(div);
            //getAllCompany(div,
            //    function () {
            //        chkAuthority(div, function () {
            //            queryDynUpdateGrid(div
            //            function () {
            //                //renderHtml(div,action);
            //            });
            //        })                    
            //    });
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
    function unHandle(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (options.container != undefined) {
            options.container.unbind('keydown');
            options.container.off('keydown');
        };
        $(headerId + 'iGrid').off('rowSelected');
        $(headerId + 'btnEdit').off('click');
        $(headerId + 'btnSave').off('click');
        $(headerId + 'btnDelete').off('click');
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (options.container != undefined) {
            options.container.unbind('keydown');
            options.container.off('keydown');
        };
        $(headerId + 'btnDelete').off('click');
        $(headerId + 'btnDelete').on('click', function () {
            if ($(this).jqxButton('disabled')) { return };
            if ($('#' + options.dynGridId).jqxGrid('getrows').length == 0) { return; };
            var grdRowIndex = $('#' + options.dynGridId).jqxGrid('getselectedrowindex');
            var uid = $('#' + options.dynGridId).jqxGrid('getcellvalue', grdRowIndex, 'uid');
            messageBox(options.language.DelAsk, messageType.yesno, null, function (flag) {
                if (flag == 'yes') {
                    $(div).triggerHandler('beforeButtonClick',[$(this),'delete']);
                    var iGridkeys = Object.keys($(headerId + 'iGrid').dynamicGrid('options').settingData)[0];
                    var iGridSettingData = $.extend(true, {}, $(headerId + 'iGrid').dynamicGrid('options').settingData);                    
                    var grdIndex = $('#' + options.dynGridId).jqxGrid('getselectedrowindex');
                    grdIndex = grdIndex < 0 ? 0 : grdIndex;
                    var id = $('#' + options.dynGridId).jqxGrid('getrowid', grdIndex);
                    iGridSettingData[iGridkeys].rows.splice(id, 1);
                    
                    $(headerId + 'iGrid').dynamicGrid('setParentRefresh', iGridSettingData, true, 0);
                    if ($(headerId + 'iGrid').dynamicGrid('getRows') == 0) {
                        $(headerId + 'btnDelete').jqxButton({ disabled: true });
                        $(headerId + 'btnEdit').jqxButton({ disabled: true });
                        $(headerId + 'btnSave').jqxButton({ disabled: true });
                    }
                } else {
                    
                };
            });
        });
        $(headerId + 'btnAppend').off('click');
        $(headerId + 'btnAppend').on('click', function () {
            if ($(this).jqxButton('disabled')) { return };
            $(div).triggerHandler('beforeButtonClick', [$(this), 'append']);
            var ds = $(headerId + 'iGrid').dynamicGrid('getFocusRow', true);
            var mainTableName = null;
            $.each(ds, function (keys, elements) {
                mainTableName = keys;
                return;
            });
            $.each(ds[mainTableName].rows[0], function (index, value) {
                ds[mainTableName].rows[0][index] = null;
            });
            options.editMode = editMode.append;
            
            $(headerId + 'condition').dynamicCondition('options').editMode = editMode.append;            
            $(headerId + 'condition').dynamicCondition('refreshDefault', ds, function () { })
            
            changeMode(div, editMode.append);
        })
        $(headerId + 'btnEdit').off('click');
        $(headerId + 'btnEdit').on('click', div, btnEditClick);
        $(headerId + 'btnSave').off('click');
        $(headerId + 'btnSave').on('click', div, btnSaveClick)
            
        $(headerId + 'btnResize').on('click', function () {
            var parentWidth = $($(headerId + 'conditionAndButton').parent()[0]).width();
            $($(headerId + 'conditionAndButton').parent()[0]).prop('style', 'height:100%;float:left;width:' + '70%');
            var parentHeight = $(headerId + 'conditionAndButton').height() - 30;
            $(headerId + 'condition').prop('style', 'height:' + parentHeight + 'px;float:left');
            //var parentHeight = $($(headerId + 'funDiv').parent()[0]).height() - 30;
            //var parentWidth = $($(headerId + 'funDiv').parent()[0]).width();
            //$($(headerId + 'condition').parent()[0]).prop('style', 'height:' + parentHeight + 'px;width:' + parentWidth + 'px;float:left');
            ////$($(headerId + 'condition').parent()[0]).prop('style', 'width:' + parentWidth + 'px;width:' + parentWidth + 'px');
            //$($($($(headerId + 'condition').parent()[0])).parent()[0]).prop('style', 'height:' + parentHeight + 'px;width:' + parentWidth + 'px;float:left' );
            ////$($($($(headerId + 'condition').parent()[0])).parent()[0]).prop('style', 'width:' + parentWidth + 'px');
            //$(headerId + 'condition').dynamicCondition('resize');
            //$(headerId + 'iGrid').dynamicGrid('resize');
            $(headerId + 'condition').dynamicCondition('resize');
            $(headerId + 'iGrid').dynamicGrid('resize');
            
        })
        
        $(headerId + 'btnCancel').off('click');
        $(headerId + 'btnCancel').on('click', function () {
            if ($(this).jqxButton('disabled')) { return };
            $(div).triggerHandler('beforeButtonClick', [$(this), 'cancel']);
            options.editMode = editMode.view;
            changeMode(div, editMode.view);
            var ds = $(headerId + 'iGrid').dynamicGrid('getSelectedRow', true);
            $(headerId + 'condition').dynamicCondition('refreshDefault', ds,
            function () {
                try {
                  
                } catch (err) {

                };
            });
        });

        $(headerId + 'iGrid').off('rowSelected');
        $(headerId + 'iGrid').on('rowSelected', function () {
            
            var ds = $(headerId + 'iGrid').dynamicGrid('getSelectedRow', true);
            $(headerId + 'condition').dynamicCondition('refreshDefault', ds,
              function () {
                  try {
                      //var query = $(headerId + 'condition').dynamicCondition('getQueryData', function (query) {
                      //    alert('yes');
                      //})
                  } catch (err) {
            
                  };
              });
        });
                   
    };
    
    
    
    function btnDeleteClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return };
        if (options.deleteShowQuestion) {
            messageBox(options.language.DelAsk, messageType.yesno, null, function (flag) {
                if (flag == 'yes') {
                    /*
                    options.editMode = editMode.delete;
                    $(options.dynUpdSelector).dynamicUpdate('changeMode', editMode.delete);
                    btnSaveClick(event); */
                } else {
                   
                };
            });
        };
      
    };
    
    function btnEditClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');        
        if ($(this).jqxButton('disabled')) { return };
        $(headerId ).triggerHandler('beforeButtonClick', [$(headerId + 'btnEdit'), 'edit']);
        $(headerId + 'condition').dynamicCondition('options').editMode = editMode.edit;
        
        options.editMode = editMode.edit;
        
        changeMode(event.data,editMode.edit);
    };
    function updGrid(div,Table) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var  grdRowIndex = $('#' + options.dynGridId).jqxGrid('getselectedrowindex');
        if (Table != undefined && options.editMode != editMode.append ) {
            if (Table.rows.length > 0) {
                $.each(Table.columns, function (index, col) {
                    if (Table.rows[0][col.name] != undefined) {
                        $('#' + options.dynGridId).jqxGrid('setcellvalue', grdRowIndex, col.name, Table.rows[0][col.name]);
                    };
                });
            };
        };
       
        //var ds = { Table: {} };

        var ds = $(headerId + 'iGrid').dynamicGrid('getRows', true);
        var dstablename = null;
        for (prop in ds) {
            dstablename = prop;            
        };

        if (Table != undefined) {
            //$.extend(true, ds.Table, Table);
        } else {
            ds[prop].rows = [];
        };
        
        ds[prop].rows.length = 0;
        ds[prop].rows = $('#' + options.dynGridId).jqxGrid('getrows');
        //ds.Table.rows = $(headerId + 'iGrid').dynamicGrid('getRows');
        if (options.editMode == editMode.append) {
            ds[prop].rows.push(Table.rows[0]);
        };      
        $(headerId + 'iGrid').dynamicGrid('setParentRefresh', cloneJSON(ds), true);
        
        
        changeMode(div, editMode.view);
    };
    function isPKDual(div,screenValue,rowid) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var dyField = $(headerId + 'iGrid').dynamicGrid('options').settingData['DYFIELD'];
        var iGridkeys = Object.keys($(headerId + 'iGrid').dynamicGrid('options').settingData)[0];
        var iGridSettingData = $.extend(true, {}, $(headerId + 'iGrid').dynamicGrid('options').settingData);
        var pkField = [];
        var pkShowMsg = [];
        var pkValue = null;
        var len = screenValue.rows.length;
        var pklen = 0;
        var oSearchData = null;
        var result = true;
        for (var i = 0; i < dyField.rows.length;i++) {
            if (dyField.rows[i]['ISPK'] === 1) {
                pkField.push(dyField.rows[i]['FIELDNAME'].toUpperCase());
                pkShowMsg.push(dyField.rows[i]['HEADNAME']);
            };
        };
        for (var i = 0; i < len; i++) {
            fieldName = screenValue.rows[i].FIELDNAME.toString().replace('_1', '');
            fieldName = fieldName.toString().replace('_2', '');
            fieldName = fieldName.toUpperCase();
            if ($.inArray(fieldName, pkField) > -1) {
                pkValue = pkValue == null ? screenValue.rows[i].FIELDVALUE : pkValue + screenValue.rows[i].FIELDVALUE;
            };
        };
        if (pkField) {
            pklen = pkField.length;
            len = iGridSettingData[iGridkeys].rows.length
            for (i = 0; i < len; i++) {
                oSearchData = null;
                for (j = 0; j < pklen; j++) {
                    oSearchData = oSearchData == null ? iGridSettingData[iGridkeys].rows[i][pkField[j]] : oSearchData + iGridSettingData[iGridkeys].rows[i][pkField[j]];
                }

                if (oSearchData == pkValue) {
                    if (options.editMode == editMode.edit) {
                        if (i != rowid) {
                            messageBox(options.language.dupData.replace("{0}", pkShowMsg.join(",")));
                            result = false;
                            break;
                        }
                    } else {

                        messageBox(options.language.dupData.replace("{0}", pkShowMsg.join(",")));
                        result = false;
                        break;
                    }
                }
                
            }
        }
       
        return result;
    };
    function btnSaveClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(headerId + 'btnSave').jqxButton('disabled')) { return };
        $(headerId).triggerHandler('beforeButtonClick', [$(headerId + 'btnSave'), 'save']);
        var grdData = $(headerId + 'iGrid').dynamicGrid('getRows', true);
        var keyName = Object.keys(grdData)[0];
        var columns = grdData[keyName].columns;
        var iGridkeys = Object.keys($(headerId + 'iGrid').dynamicGrid('options').settingData)[0];
        var iGridSettingData = $.extend(true, {}, $(headerId + 'iGrid').dynamicGrid('options').settingData);
        var iGridData = iGridSettingData[iGridkeys];
        var grdIndex = $('#' + options.dynGridId).jqxGrid('getselectedrowindex');
        grdIndex = grdIndex < 0 ? 0 : grdIndex;
        var query = $(headerId + 'condition').dynamicCondition('getQueryData', function (query) {
            if (!query[0]) { return; };
            if (query[2]["condition"]) {
                if (query[2]["condition"].rows.length > 0) {
                    var len = query[2]["condition"].rows.length;
                    
                    var id = $('#' + options.dynGridId).jqxGrid('getrowid', grdIndex);
                    var fieldName = null;
                    var fieldvalue = null;
                    var addrow = [];
                    var row = {};
                    if (!isPKDual(event.data, query[2]["condition"], id)) {
                        return;
                    };
                    for (var i = 0; i < len; i++) {                        
                        fieldName = query[2]["condition"].rows[i].FIELDNAME.toString().replace('_1', '');
                        fieldName = fieldName.toString().replace('_2', '');
                        fieldvalue = query[2]["condition"].rows[i].FIELDVALUE;
                        if (!fieldvalue) {
                            fieldvalue = null;
                        } else {
                            for (var j = 0; j < columns.length; j++) {
                                if (columns[j].name.toUpperCase() == fieldName.toUpperCase()) {

                                    fieldvalue = columns[j].type.substr(0, 3).toUpperCase() == "INT" ? Number(fieldvalue) : fieldvalue;
                                }
                            }
                        }
                        
                        row[fieldName.toUpperCase()] = fieldvalue;
                        if (options.editMode == editMode.edit) {
                            iGridSettingData[iGridkeys].rows[id][fieldName.toUpperCase()] = fieldvalue;                            
                        };                        
                    };
                    
                    if (options.editMode != editMode.edit) {
                        iGridSettingData[iGridkeys].rows.push(row);
                    }
                    $(headerId + 'iGrid').dynamicGrid('setParentRefresh', iGridSettingData, true, 0);
                    
                    
                    if (options.editMode != editMode.edit) {
                        $('#' + options.dynGridId).jqxGrid({ selectedrowindex: $('#' + options.dynGridId).jqxGrid('getrows').length -1 });
                    } else {
                        $('#' + options.dynGridId).jqxGrid({ selectedrowindex: grdIndex });
                    }
                    $(headerId + 'condition').dynamicCondition('options').editMode = editMode.view;
                    options.editMode = editMode.view;
                    changeMode(event.data, editMode.view);
                    
                    /*
                    keys = Object.keys($(headerId + 'iGrid').dynamicGrid('options').settingData)[0];
                    var oo =$.extend(true,{}, $(headerId + 'iGrid').dynamicGrid('options').settingData);

                    oo[keys].rows.push(row);
                    $(headerId + 'iGrid').dynamicGrid('setParentRefresh', oo, true, 0);
                    var ooo = $(headerId + 'iGrid').dynamicGrid('getRows',true); */
                };
            };
            return;
            //var e = $.Event('ExecuteCompleted', { isSuccess: isSuccess, errMsg: errMsg, ds: ds });
            
            try {
                var parameters = $.extend({}, getParaLoginInfo(event.data, formName),
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
                                
                                var tmp = JSON.parse(data.ResultXML);
                                if (!isDataOK(event.data, options.editMode,cloneJSON( query[2]))) {
                                    //options.editMode = editMode.view;
                                    //changeMode(event.data, editMode.view);
                                    return;
                                } else {
                                    updGrid(event.data, tmp.Table);
                                };
                                
                                
                                /*
                                grdRowIndex = $('#' + options.dynGridId).jqxGrid('getselectedrowindex');
                                if (tmp.Table.rows.length > 0) {
                                    $.each(tmp.Table.columns, function (index, col) {
                                        if (tmp.Table.rows[0][col.name] != undefined) {
                                            $('#' + options.dynGridId).jqxGrid('setcellvalue', grdRowIndex, col.name, tmp.Table.rows[0][col.name]);
                                        };
                                        
                                    
                                    });
                                };  */
                              
                                delete tmp;
                                tmp = null;
                                options.editMode = editMode.view;
                                //changMode(div);
                                //if ($.isFunction(action)) { action() };
                            }
                            else {
                                //messageBox(data.ErrorMessage, messageType.critical);
                                //changeMode(div, options.editMode);
                                options.editMode = editMode.view;
                                changeMode(editMode.view);
                                isSuccess = false;
                                errMsg = data.ErrorMessage;
                            };
                            //if ($.isFunction(action)) { action(isSuccess, errMsg, ds); };


                        } catch (err) {
                            // if ($.isFunction(action)) { action(false, err, null) };
                            errorHandle(formName, 'btnSaveClick', err);
                           
                        } finally {
                            parameters = null;
                            params = null;
                            data = null;
                            delete data;
                            delete parameters;
                            delete params;
                            //$(div).triggerHandler(e);
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
        });
        
        return;
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
    
    
    function getMaxRow(div) {
        var options = $.data(div, formName).options;
        var max = 0;
        $.each(options.detail.rows, function (index, row) {
            if (parseInt( row['ROWPOS'].toString())> max) {
                max = parseInt(row['ROWPOS'].toString());
            }
        })
        return max;
    };
    function getMaxCol(div,rownum) {
        var options = $.data(div, formName).options;
        var max = 0;
        $.each(options.detail.rows, function (index, row) {
            if (row['RowPos'.toUpperCase()] == rownum) {
                if (parseInt(row['ColumnPos'.toUpperCase()].toString()) > max) {
                    max = parseInt(row['ColumnPos'.toUpperCase()].toString());
                };
            };
            
        })
        return max;
    };
    function AddFunBtn(div) {
      
        $(div).append('<button style="float:left;margin-top:2px" data-id="btnAppend"></button>');
        $(div).append('<button style="float:left;margin-left:2px;margin-top:2px" data-id="btnEdit"></button>');
        $(div).append('<button style="float:left;margin-left:2px;margin-top:2px" data-id="btnDelete"></button>');
        $(div).append('<button style="float:left;margin-left:2px;margin-top:2px" data-id="btnSave"></button>');
        $(div).append('<button style="float:left;margin-left:2px;margin-top:2px" data-id="btnCancel"></button>');
        //<div style="height:25px;width:40px;text-align:center;float:left;margin-left:2px;margin-top:2px">
        $(div).append('<div style="height:30px;width:50px;text-align:center;float:left"> ' +
                '<table style="height:25px;width:100%" > ' +
                '<tr style="height:25px">' +
                '<td  data-id="editMode" class="csslEditMode">' +
                '</td>' +
               '</tr>' +
                '</table>' +
            '</div>');
        //$(div).append('<button style="float:left;margin-left:2px;margin-top:2px" data-id="btnResize">調整</button>');
        //$(div).append('<input style="float:left;margin-left:2px;margin-top:2px" type="text" data-id="edtMode" />');
        
        
        
    };
    function AddCondition(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        function getDefaultRecord() {
            var selectRowIndex = 0;
            var rows = $(headerId + 'iGrid').dynamicGrid('getRows');
            var allSame = false;
            if (options.defaultCodeNo != null && rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    $.each(rows[i], function (key, value) {
                        $.each(options.defaultCodeNo, function (defKey, defValue) {
                            if (key.toUpperCase() == defKey.toUpperCase()) {
                                if (value.toString() == defValue.toString()) {
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
            };
            return selectRowIndex;
          
        };
        try {
            var gridRowIndex = getDefaultRecord();
             options.dynGridId = $(headerId + 'iGrid').dynamicGrid('getControl', 'grid').name;
            $('#'+ options.dynGridId).jqxGrid({ selectedrowindex: gridRowIndex });
            $('#' +options.dynGridId).jqxGrid('ensurerowvisible', gridRowIndex);
            $(headerId + 'iGrid').dynamicGrid('disableAll', true);
            var ds = $(headerId + 'iGrid').dynamicGrid('getFocusRow', true);
            var mainTableName = null;
            $.each(ds, function (keys, elements) {
                mainTableName = keys;
                return;
            });
            if (ds == undefined || ds == null) {
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
            $(headerId + 'condition').one('loaded', function () {
                $(headerId + 'condition').dynamicCondition('disableAll', true);
                action(true);                
            });

            var conditionParent = $(headerId + 'condition').parent()[0];
            
            $(headerId + 'condition').dynamicCondition($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                
                container: conditionParent,
                sysProgramId: options.master.rows[0]['PROGRAMID'],
                parameters: cloneJSON(ds),
                localization: cloneJSON(options.localization),
                editMode: options.editMode
                
                //disableMessage: options.disableMessage
                
            }));
            $(headerId + 'iGrid').dynamicGrid('disableAll', false);            
            
        } catch (err) {
            errorHandle(formName, 'AddCondition', err);
        } finally {

        }

        
    };
    function lockField(div, e, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            options.lockField.length = 0;
            $.each(options.so1109b.rows, function (index, row) {
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
    };
    function getConFieldName(row) {
        var result = null;
        result = row['FIELDNAME'].toUpperCase();
        result = result.replace(/\_0/g,'');
        result = result.replace(/\_1/g,'');
        result = result.replace(/\_2/g,'');
        return result;
        
    };
    function isDataOK(div, e,ConditionData) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var pkField = null;
        var grdRowIndex = $('#' + options.dynGridId).jqxGrid('getselectedrowindex');        
        var rwPkValue = null;
        var rwUKValue = null;
        var ukField = [];
        var uid = -1;
        var result = true;
        var rwPkFieldName = null;
        var errMsg = null;
        if (grdRowIndex < 0) {
            if (e == editMode.append) {
                return true;
            }; 
        };
        //searching for pk and uk by kin
        
            $.each(options.so1109b.rows, function (index, row) {
                if (row['FieldType'.toUpperCase()] == 1) {
                    pkField = row['SOURCEFIELD'].toUpperCase();
                };
                if (row['FieldType'.toUpperCase()] == 2) {
                    ukField.push(row['SOURCEFIELD'].toUpperCase());
                };
            });
            var grdRows = $('#' + options.dynGridId).jqxGrid('getrows');
            if (e == editMode.edit) {
                uid = $('#' + options.dynGridId).jqxGrid('getcellvalue', grdRowIndex, 'uid');
            };
            if (pkField != null) {               
                $.each(ConditionData[Object.keys(ConditionData)[0]].rows, function (index, row) {
                    if (getConFieldName(row) == pkField) {
                        rwPkValue = row['FIELDVALUE'];
                        rwPkFieldName = row['HEADNAME'].toString().split(",")[1];
                        
                        return;
                    };
                });
                $.each(grdRows, function (index, row) {
                    if (uid != row['uid']) {
                        if (row[pkField] != undefined) {
                            if (row[pkField] != null) {
                                if (row[pkField].toString().toUpperCase() == rwPkValue.toString().toUpperCase()) {
                                    errMsg = '[' + frmCaption + ':'+ rwPkValue + ']'  +  options.language.dataDouble;
                                    messageBox(errMsg, messageType.information, null, function (flag) {
                                        
                                    });
                                    result = false;
                                    return;
                                };
                            };
                        };
                    };
                });
            };
            if (result == true && ukField.length > 0) {
                var grdUKValue = null;
                $.each(ukField, function (index, value) {
                    $.each(ConditionData[Object.keys(ConditionData)[0]].rows, function (index, row) {
                        if (getConFieldName(row) == value) {
                            if (rwUKValue == null) {
                                rwUKValue = rwPkValue = row['FIELDVALUE'];
                            } else {
                                rwUKValue = rwUKValue + row['FIELDVALUE'];
                            }                            
                            return;
                        };
                    });
                });
                $.each(grdRows, function (index, row) {
                    if (uid != row['uid']) {
                        grdUKValue = null;
                        $.each(ukField, function (index, value) {
                            if (grdUKValue == null) {
                                grdUKValue = row[value];
                            } else {
                                grdUKValue = grdUKValue + row[value];
                            };
                        });
                        if (grdUKValue == rwUKValue.toString().toUpperCase()) {
                            result = false;
                            errMsg = null;
                            $.each(ukField, function (index, value) {
                                if (index == 0) {
                                    errMsg = '[' + frmCaption + ':' + row[value];
                                } else {
                                    errMsg = errMsg + '+' + row[value];
                                };
                                 
                            })
                           errMsg = errMsg + ']'  + options.language.dataDouble;
                            messageBox(errMsg, messageType.information, null, function (flag) {

                            });
                            result = false;
                            return;
                        };
                    };
                });
            };
        
      
        return result;
    };
    function changeMode(div,e)  {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var canEndable = options.parentEditMode != editMode.view;
        $(headerId + 'btnAppend').jqxButton({ disabled: true });
        $(headerId + 'btnSave').jqxButton({ disabled: true });
        $(headerId + 'btnEdit').jqxButton({ disabled: true });
        $(headerId + 'btnDelete').jqxButton({ disabled: true });
        $(headerId + 'btnCancel').jqxButton({ disabled: true });
        $(headerId + 'iGrid').dynamicGrid('disableAll', true);
        $(headerId + 'condition').dynamicCondition('disableAll', true);
        //lockField(div, e);
        $(headerId + 'editMode').text(options.language.View);
        try {
            switch (e) {
                case (editMode.edit):                    
                    $(headerId + 'btnCancel').jqxButton({ disabled: false });
                    $(headerId + 'btnSave').jqxButton({ disabled: false });
                    $(headerId + 'condition').dynamicCondition('disableFields', false, options.lockField);
                    $(headerId + 'editMode').text(options.language.Edit);
                    //$(options.dynUpdSelector).dynamicUpdate('reFieldStatus', options.editMode);
                    break;

                case (editMode.append):
                    $(headerId + 'editMode').text(options.language.AddNew);
                    $(headerId + 'btnSave').jqxButton({ disabled: false });
                    $(headerId + 'btnCancel').jqxButton({ disabled: false });
                    $(headerId + 'condition').dynamicCondition('disableFields', false, options.lockField);
                    break;

                case (editMode.view):
                    $(headerId + 'iGrid').dynamicGrid('disableAll', false);
                    
                    $(headerId + 'btnEdit').jqxButton({ disabled: false });
                    $(headerId + 'btnDelete').jqxButton({ disabled: false });                    
                    $(headerId + 'btnAppend').jqxButton({ disabled: false });
                    break;

            };
            // to avoid grid is empty by kin 
            if ($('#' + options.dynGridId).jqxGrid('getrows').length == 0) {                
                if (options.editMode != editMode.append) {
                    options.editMode = editMode.view;
                    
                    //$(options.dynUpdSelector).dynamicUpdate('disableAll', true);
                    $(headerId + 'iGrid').dynamicGrid('disableAll', false);
                    $(headerId + 'btnAppend').jqxButton({ disabled: false });
                    $(headerId + 'btnSave').jqxButton({ disabled: true });
                    $(headerId + 'btnEdit').jqxButton({ disabled: true });
                    $(headerId + 'btnDelete').jqxButton({ disabled: true });
                    
                    $(headerId + 'btnCancel').jqxButton({ disabled: true });
                    
                };
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
            if (options.parentEditMode == editMode.view) {
                $(headerId + 'btnAppend').jqxButton({ disabled: true });
                $(headerId + 'btnSave').jqxButton({ disabled: true });
                $(headerId + 'btnEdit').jqxButton({ disabled: true });
                $(headerId + 'btnDelete').jqxButton({ disabled: true });
                $(headerId + 'btnCancel').jqxButton({ disabled: true });
                //$(headerId + 'iGrid').dynamicGrid('disableAll', true);
                $(headerId + 'condition').dynamicCondition('disableAll', true);
                $(headerId + 'editMode').text(options.language.View);
                options.parentEditMode = 2;
            } 
        } catch (err) {
            errorHandle(formName, 'changeMode', err);
        } finally {
            //emptyValue = true;
        };
    };
    function AddDynControl(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var iGridParent = $(headerId + 'iGrid').parent();
                
        $(headerId + 'iGrid').one('loaded', function () {
            options.controls.push({ name: $(div).prop('id') + 'iGrid', type: 'dynamicGrid', level: 2 });
            AddCondition(div, function (r) {                
                if (r) {
                    options.controls.push({ name: $(div).prop('id') + 'condition', type: 'dynamicCondition', level: 2 });
                    //changeMode(div, editMode.view);
                    changeMode(div, options.editMode);
                    addHandler(div);
                    $(div).triggerHandler('loaded', [this, options]);                    
                } else {
                    
                }
            });

        })
        $(headerId + 'iGrid').dynamicGrid({
            loginInfo: cloneJSON(options.loginInfo),
            container: iGridParent,
            sysProgramId: options.master.rows[0]['PROGRAMID'],
            localization: cloneJSON(options.localization),
            editMode: options.editMode

        });

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
            //if (ctrLength == 0) {
            //    $(headerId + "edtMode").jqxInput({
            //        width: 40,
            //        height: 23,
            //        disabled: true,
            //    });
            //    controls.push({ name: 'edtMode', type: 'jqxInput', level: 2 });
            //    $(headerId + 'edtMode').val('修改');
            //    controls.push({ name: $(div).prop('id') + 'edtMode', type: 'jqxInput', level: 2 });                
            //};
            
            //------------------------------------------------------------------------
            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                $(headerId + 'btnSave').jqxButton($.extend({}, imagePosition, {
                    width: 30,
                    height: 25,
                    imgSrc: imageScr.save.imgSrc
                }));
                controls.push({ name: $(div).prop('id') + 'btnSave', type: 'jqxButton', level: 2 });
                $(headerId + 'btnSave > img').css('top', '2px');
            };
            $(headerId + 'btnSave').jqxButton({ disabled: true });
            //------------------------------------------------------------------------
            //------------------------------------------------------------------------
            //if (ctrLength == 0) {
            //    $(headerId + 'btnTest').jqxButton($.extend({}, imagePosition, {
            //        width: 30,
            //        height: 25,
            //        imgSrc: imageScr.save.imgSrc
            //    }));
            //    controls.push({ name: $(div).prop('id') + 'btnTest', type: 'jqxButton', level: 2 });
            //    $(headerId + 'btnTest > img').css('top', '2px');
            //};
            //$(headerId + 'btnTest').jqxButton({ disabled: false });
            //------------------------------------------------------------------------


            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                $(headerId + 'btnAppend').jqxButton($.extend({}, imagePosition, {
                    width: 30,
                    height: 25,
                    //value:'新增',
                    imgSrc: imageScr.append.imgSrc
                }));
                controls.push({ name: $(div).prop('id') + 'btnAppend', type: 'jqxButton', level: 2 });
                $(headerId + 'btnAppend > img').css('top', '2px');
            };
            $(headerId + 'btnAppend').jqxButton({ disabled: true });
            //------------------------------------------------------------------------
            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                $(headerId + 'btnEdit').jqxButton($.extend({}, imagePosition, {
                    width: 30,
                    height: 25,
                    imgSrc: imageScr.edit.imgSrc
                }));
                controls.push({ name: $(div).prop('id') + 'btnEdit', type: 'jqxButton', level: 2 });
                $(headerId + 'btnEdit > img').css('top', '2px');
            };
            $(headerId + 'btnEdit').jqxButton({ disabled: true });
            //------------------------------------------------------------------------
            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                $(headerId + 'btnDelete').jqxButton($.extend({}, imagePosition, {
                    width: 30,
                    height: 25,
                    imgSrc: imageScr.delete.imgSrc
                }));
                controls.push({ name: $(div).prop('id') + 'btnDelete', type: 'jqxButton', level: 2 });
                $(headerId + 'btnDelete > img').css('top', '2px');
            };
            $(headerId + 'btnDelete').jqxButton({ disabled: true });
            //------------------------------------------------------------------------
           
            //------------------------------------------------------------------------
            if (ctrLength == 0) {
                $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                    width: 30,
                    height: 25,
                    imgSrc: imageScr.cancel.imgSrc,
                    //value: options.language.Quite
                }));
                controls.push({ name: $(div).prop('id') + 'btnCancel', type: 'jqxButton', level: 2 });
                $(headerId + 'btnCancel > img').css('top', '2px');
            };
            $(headerId + 'btnCancel').jqxButton({ disabled: true });
            //------------------------------------------------------------------------

            
            return true;
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
            return false;
        } finally {

        };

    };
    function queryDynUpdateGrid2(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (options.dynGridSelector != '') {
            $(options.dynGridSelector).dynamicGrid('destroy');
        };
        if (options.dynUpdSelector != '') {
            $(options.dynUpdSelector).dynamicUpdate('destroy');
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
                                messageBox(options.language.NoneFoundSO1120A, messageType.critical);
                                addHandler(div);
                                action(false);
                                return;
                            };
                            if (tmp.Master.rows.length == 0) {
                                messageBox(options.language.NoneFoundSO1120A, messageType.critical);
                                addHandler(div);
                                action(false);
                                return;
                            };
                            if (tmp.Detail == undefined) {
                                messageBox(options.language.NoneFoundSO1120B, messageType.critical);
                                addHandler(div);
                                action(false);
                                return;
                            };
                            if (tmp.Detail.rows.length == 0) {
                                messageBox(options.language.NoneFoundSO1120B, messageType.critical);
                                addHandler(div);
                                action(false);
                                return;
                            };
                            if (tmp.SO1109B == undefined) {
                                messageBox(options.language.NoneFoundSO1109B, messageType.critical);
                                addHandler(div);
                                action(false);
                                return;
                            };
                            if (tmp.SO1109B.rows.length == 0) {
                                messageBox(options.language.NoneFoundSO1109B, messageType.critical);
                                addHandler(div);
                                action(false);
                                return;
                            };
                            options.master = $.extend({}, tmp.Master);
                            options.detail = $.extend({}, tmp.Detail);
                            options.so1109b = $.extend({}, tmp.SO1109B);
                            frmCaption = options.master.rows[0]['CAPTION'];
                            var maxRow = getMaxRow(div);
                            var maxCol = 0;
                            var nowRownum = 0;
                            var isbutton = false
                            $.each(options.detail.rows, function (index, row) {
                                isbutton = false;
                                nowRownum = parseInt(row['RowPos'.toUpperCase()].toString());
                                if ($(headerId + 'divRow' + nowRownum.toString())[0] == undefined) {
                                    $(div).append("<div  data-id='mainRow" + nowRownum + "'></div>")
                                    changeElementId(div);
                                    $(headerId + 'mainRow' + nowRownum).append("<div  data-id='divRow" + nowRownum + "'></div>");
                                    changeElementId(div);
                                    maxCol = getMaxCol(div, index);
                                };
                               
                                if (row['HeightType'.toUpperCase()] != 1) {
                                    if (row['Height'.toUpperCase()] != null) {
                                        $(headerId + 'mainRow' + nowRownum.toString()).prop('style', 'height:' + row['Height'.toUpperCase()] + '%');
                                    } else {
                                        var avePer = 100;
                                        if (maxRow > 0) { avePer = 100 / maxRow };
                                        $(headerId + 'mainRow' + nowRownum.toString()).prop('style', 'height:' + avePer + '%');
                                    }
                                } else {
                                    if (row['Height'.toUpperCase()] != null) {
                                        $(headerId + 'mainRow' + nowRownum.toString()).prop('style', 'height:' + row['Height'.toUpperCase()] + 'px');
                                    } else {
                                        $(headerId + 'mainRow' + nowRownum.toString()).prop('style', 'height:100px');
                                    }
                                };
                                if (isbutton) {
                                   // var setHeight = 0;
                                   // setHeight = $(headerId + 'mainRow' + nowRownum).height() - 30;
                                   // $(headerId + 'divRow' + nowRownum).prop('style', 'height:' + setHeight + 'px');
                                } else {
                                    setHeight = $(headerId + 'mainRow' + nowRownum).height();
                                    $(headerId + 'divRow' + nowRownum).prop('style', 'height:100%');
                                };
                                for (var i = 0; i <= maxCol; i++) {
                                    $(headerId + 'divRow' + nowRownum.toString()).append("<div style='float:left' data-id='divRow" + nowRownum + 'col' + i.toString() + "'></div>")
                                    changeElementId(div);
                                };

                                if (row['WidthType'.toUpperCase()] != 1) {
                                    var colWidth = '100'
                                    if (row['Width'.toUpperCase()] > 0) {
                                        colWidth = row['Width'.toUpperCase()].toString();
                                    }
                                    $(headerId + 'divRow' + nowRownum + 'col' + row['ColumnPos'.toUpperCase()]).prop('style', 'height:100%;width:' + colWidth + '%;float:left');

                                } else {
                                    var colWidth = '100'
                                    if (row['Width'.toUpperCase()] > 0) {
                                        colWidth = row['Width'.toUpperCase()].toString();
                                    }
                                    $(headerId + 'divRow' + nowRownum + 'col' + row['ColumnPos'.toUpperCase()]).prop('style', 'height:100%;width:' + colWidth + 'px;float:left');
                                };
                                if (row['ObjSysType'.toUpperCase()] != 1) {
                                    if (row['ObjSysType'.toUpperCase()] != 1) {
                                        //isbutton = true;
                                        //$(headerId + 'mainRow' + nowRownum).append("<div data-id='funDiv'></div>");
                                        //changeElementId(div);
                                        //$(headerId + 'funDiv').prop('style', 'height:30px');
                                        //AddFunBtn($(headerId + 'funDiv'));
                                        //changeElementId(div);

                                    };
                                    $(headerId + 'divRow' + nowRownum + 'col' + row['ColumnPos'.toUpperCase()]).append('<div data-id="conditionAndButton" style="height:100%;width:100%;float:left"></div>')
                                    changeElementId(div);
                                    $(headerId + 'conditionAndButton').append('<div data-id="condition" style="height:100%;width:100%;float:left"></div>');
                                    changeElementId(div);
                                    setHeight = $(headerId + 'conditionAndButton').height() - 30;
                                    $(headerId + 'condition').prop('style', 'height:' + setHeight + 'px');
                                    isbutton = true;
                                    $(headerId + 'conditionAndButton').append("<div data-id='funDiv'></div>");
                                    changeElementId(div);
                                    $(headerId + 'funDiv').prop('style', 'height:30px');
                                    AddFunBtn($(headerId + 'funDiv'));
                                    changeElementId(div);
                                    //$(headerId + 'divRow' + nowRownum + 'col' + row['ColumnPos'.toUpperCase()]).append('<div data-id="condition" style="height:100%;width:100%;float:left"></div>')
                                } else {
                                    $(headerId + 'divRow' + nowRownum + 'col' + row['ColumnPos'.toUpperCase()]).append('<div data-id="iGrid" style="height:100%;width:100%;float:left"></div>')
                                };
                                changeElementId(div);
                            });
                            action(true);
                            return;


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

    function queryDynUpdateGrid(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (options.dynGridSelector != '') {
            $(options.dynGridSelector).dynamicGrid('destroy');
        };
        if (options.dynUpdSelector != '') {
            $(options.dynUpdSelector).dynamicUpdate('destroy');            
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
                                messageBox(options.language.NoneFoundSO1120A, messageType.critical);
                                addHandler(div);
                                action(false);
                                return;
                            };
                            if (tmp.Master.rows.length == 0) {
                                messageBox(options.language.NoneFoundSO1120A, messageType.critical);
                                addHandler(div);
                                action(false);
                                return;
                            };
                            if (tmp.Detail == undefined) {
                                messageBox(options.language.NoneFoundSO1120B, messageType.critical);
                                addHandler(div);
                                action(false);
                                return;
                            };
                            if (tmp.Detail.rows.length == 0) {
                                messageBox(options.language.NoneFoundSO1120B, messageType.critical);
                                addHandler(div);
                                action(false);
                                return;
                            };
                            if (tmp.SO1109B == undefined) {
                                messageBox(options.language.NoneFoundSO1109B, messageType.critical);
                                addHandler(div);
                                action(false);
                                return;
                            };
                            if (tmp.SO1109B.rows.length == 0) {
                                messageBox(options.language.NoneFoundSO1109B, messageType.critical);
                                addHandler(div);
                                action(false);
                                return;
                            };
                            options.master = $.extend({}, tmp.Master);
                            options.detail = $.extend({}, tmp.Detail);
                            options.so1109b = $.extend({}, tmp.SO1109B);
                            frmCaption = options.master.rows[0]['CAPTION'];
                            var maxRow = getMaxRow(div);
                            var maxCol = 0;
                            var nowRownum = 0;
                            var isbutton = false
                            $.each(options.detail.rows, function (index, row) {
                                isbutton = false;
                                nowRownum = parseInt(row['RowPos'.toUpperCase()].toString());                                
                                if ($(headerId + 'divRow' + nowRownum.toString())[0] == undefined) {
                                    $(div).append("<div  data-id='mainRow" + nowRownum + "'></div>")
                                    changeElementId(div);
                                    $(headerId + 'mainRow' + nowRownum).append("<div  data-id='divRow" + nowRownum + "'></div>");                                    
                                    changeElementId(div);
                                    maxCol = getMaxCol(div, index);                                                                        
                                };
                                if (row['ObjSysType'.toUpperCase()] != 1) {
                                    isbutton = true;
                                    $(headerId + 'mainRow' + nowRownum).append("<div data-id='funDiv'></div>");
                                    changeElementId(div);
                                    $(headerId + 'funDiv').prop('style', 'height:30px');
                                    AddFunBtn($(headerId + 'funDiv'));
                                    changeElementId(div);
                                    
                                }
                                if (row['HeightType'.toUpperCase()] != 1) {
                                    if (row['Height'.toUpperCase()] != null) {
                                        $(headerId + 'mainRow' + nowRownum.toString()).prop('style', 'height:' + row['Height'.toUpperCase()] + '%');
                                    } else {
                                        var avePer = 100;
                                        if (maxRow > 0) { avePer = 100 / maxRow };
                                        $(headerId + 'mainRow' + nowRownum.toString()).prop('style', 'height:' + avePer + '%');
                                    }
                                } else {
                                    if (row['Height'.toUpperCase()] != null) {
                                        $(headerId + 'mainRow' + nowRownum.toString()).prop('style', 'height:' + row['Height'.toUpperCase()] + 'px');
                                    } else {
                                        $(headerId + 'mainRow' + nowRownum.toString()).prop('style', 'height:100px');
                                    }
                                };
                                if (isbutton) {
                                    var setHeight = 0;                                        
                                    setHeight = $(headerId + 'mainRow' + nowRownum).height() - 30;
                                    $(headerId + 'divRow' + nowRownum).prop('style', 'height:' + setHeight + 'px');
                                } else {
                                    setHeight = $(headerId + 'mainRow' + nowRownum).height();                                    
                                    $(headerId + 'divRow' + nowRownum).prop('style', 'height:100%' );
                                };
                                for (var i = 0; i <= maxCol; i++) {
                                    $(headerId + 'divRow' + nowRownum.toString()).append("<div style='float:left' data-id='divRow" + nowRownum + 'col' + i.toString() + "'></div>")
                                    changeElementId(div);                                                                        
                                };
                                
                                if (row['WidthType'.toUpperCase()] != 1) {
                                    var colWidth = '100'
                                    if (row['Width'.toUpperCase()] > 0) {
                                        colWidth = row['Width'.toUpperCase()].toString();
                                    }
                                    $(headerId + 'divRow' + nowRownum + 'col' + row['ColumnPos'.toUpperCase()]).prop('style', 'height:100%;width:' + colWidth + '%;float:left');

                                } else {
                                    var colWidth = '100'
                                    if (row['Width'.toUpperCase()] > 0) {
                                        colWidth = row['Width'.toUpperCase()].toString();
                                    }
                                    $(headerId + 'divRow' + nowRownum + 'col' + row['ColumnPos'.toUpperCase()]).prop('style', 'height:100%;width:' + colWidth + 'px;float:left');
                                };
                                if (row['ObjSysType'.toUpperCase()] != 1) {
                                    $(headerId + 'divRow' + nowRownum + 'col' + row['ColumnPos'.toUpperCase()]).append('<div data-id="condition" style="height:100%;width:100%;float:left"></div>')
                                } else {
                                    $(headerId + 'divRow' + nowRownum + 'col' + row['ColumnPos'.toUpperCase()]).append('<div data-id="iGrid" style="height:100%;width:100%;float:left"></div>')
                                };
                                changeElementId(div);                                                                        
                            });
                            action(true);
                            return;

                        
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
            //options.editMode = options.parentEditMode;
            if (options.editMode == 9) { options.editMode = editMode.view };
            /*
            if (options.parentEditMode != editMode.view) {
                options.editMode = options.parentEditMode;
            } */           
            //options.copyLoginInfo = getParaLoginInfo(div, formName);
            options.copyLoginInfo = $.extend(true,{}, options.loginInfo);
            if ($(options.container).attr('class') != undefined) {
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    options.containerIsWindow = true;
                    var csw = $.data(div, formName).options.container;
                   // csw.on("winClosing", div, winClosing);
                };
            };
            if (options.sysProgramId == '') {
                messageBox(options.language.NoneProgramId, messageType.critical);
                return;
            };
            refreshUI(div, function () { $(div).triggerHandler('loaded', [this, options]); });
            
           
        } 
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
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