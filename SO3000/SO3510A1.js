(function ($) {
    var formName = 'SO3510A1';
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
                            options: $.extend({}, new defaults(), new SO3510A1(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3510A1_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3510A', err);
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
        if (options.editMode == editMode.append) {
            $(headerId + 'txtStatusMode').text(lang.AddMode);
        } else {
            $(headerId + 'txtStatusMode').text(lang.EditMode);
        }
        //-----------------------------------------------------------------------------    
        $(headerId + "txtGetPaperDate").csDateTime({
            formatString: 'yyyy/MM/dd',
            value: null,
            height: 25,
            width: 110
        });
        controls.push({ name: $(div).prop('id') + 'txtGetPaperDate', type: 'csDateTime', level: 2 });
        //-----------------------------------------------------------------------------    

        //-----------------------------------------------------------------------------    
        $(headerId + "csEmpName").csList({
            source: null,
            codeNoWidth: 90,
            width: 220,
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
        controls.push({ name: $(div).prop('id') + 'csEmpName', type: 'csList', level: 2 });
        //-----------------------------------------------------------------------------    

        //-----------------------------------------------------------------------------    
        $(headerId + 'txtPrefix').jqxInput({
            width: 110,
            height: '25px',
        });
        controls.push({ name: $(div).prop('id') + 'txtPrefix', type: 'jqxInput', level: 2 });
        //-----------------------------------------------------------------------------    
        //-----------------------------------------------------------------------------    
        $(headerId + "txtBeginNum").jqxMaskedInput({
            width: '110px',
            height: '25px',
            promptChar: '',
            mask: '9999999999'
        });
        controls.push({ name: $(div).prop('id') + 'txtBeginNum', type: 'jqxMaskedInput', level: 2 });
        //-----------------------------------------------------------------------------    
        //-----------------------------------------------------------------------------    
        $(headerId + "txtEndNum").jqxInput({
            width: '110px',
            height: '25px',
            disabled: true,
            //promptChar: '',
            //mask: '9999999999'
        });
        controls.push({ name: $(div).prop('id') + 'txtEndNum', type: 'jqxInput', level: 2 });
        //-----------------------------------------------------------------------------   
        //-----------------------------------------------------------------------------    
        $(headerId + "txtCount").jqxMaskedInput({
            width: '50px',
            height: '25px',
            promptChar: '',
            textAlign: 'right',
            mask: '[1-9]9999'
        });
        controls.push({ name: $(div).prop('id') + 'txtCount', type: 'jqxMaskedInput', level: 2 });
        //-----------------------------------------------------------------------------  
        //-----------------------------------------------------------------------------    
        $(headerId + "txtRETURNDATE").csDateTime({
            formatString: 'yyyy/MM/dd',
            value: null,
            width: '110px'
        });
        if (options.editMode == editMode.append) {
            $(headerId + 'txtRETURNDATE').csDateTime({ disabled: true });
        };
        controls.push({ name: $(div).prop('id') + 'txtRETURNDATE', type: 'csDateTime', level: 2 });
        //-----------------------------------------------------------------------------  
        //-----------------------------------------------------------------------------    
        $(headerId + "txtCLEARDATE").csDateTime({
            formatString: 'yyyy/MM/dd',
            value: null,
            width: '110px'
        });
        if (options.editMode == editMode.append) {
            $(headerId + 'txtCLEARDATE').csDateTime({ disabled: true });
        };
        controls.push({ name: $(div).prop('id') + 'txtCLEARDATE', type: 'csDateTime', level: 2 });
        //----------------------------------------------------------------------------- 
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnSave').jqxButton($.extend({}, imagePosition, {
            width: 80,
            imgSrc: imageScr.save.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnSave', type: 'jqxButton', level: 2 });
        $(headerId + 'btnSave > img').css('top', '2px');
        //----------------------------------------------------------------------------- 
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
            width: 80,
            imgSrc: imageScr.cancel.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnCancel', type: 'jqxButton', level: 2 });
        $(headerId + 'btnCancel > img').css('top', '2px');
        //----------------------------------------------------------------------------- 
        //-----------------------------------------------------------------------------    
        $(headerId + 'txtMemo').jqxTextArea({            
            height: '100%',
            width: '100%',
                        
        });
        controls.push({ name: $(div).prop('id') + 'btnCancel', type: 'jqxTextArea', level: 2 });
        //----------------------------------------------------------------------------- 
        if (options.editMode == editMode.append) {
            $(headerId + 'lblCount').css('color', 'red');
            $(headerId + 'lblGetPaperDate').css('color', 'red');
            $(headerId + 'lblEmpName').css('color', 'red');
            $(headerId + 'lblSeqNo').css('color', 'red');
            $(headerId + 'lblPrefix').css('color', 'red');
            
        } else {
            $(headerId + 'csEmpName').csList('disabled', true);
            $(headerId + 'txtPrefix').jqxInput({ disabled: true });
            $(headerId + 'txtBeginNum').jqxMaskedInput({ disabled: true });
            $(headerId + 'txtCount').jqxMaskedInput({ disabled: true });
            //$(headerId + 'txtMemo').jqxTextArea({ disabled: true });
            $(headerId + 'txtGetPaperDate').csDateTime({ disabled: true });
        };
        
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
        $(headerId + 'btnSave').unbind('click');
        $(headerId + 'btnCancel').unbind('click');
        $(headerId + 'txtBeginNum').off('blur');
        $(headerId + 'txtCount').off('blur');
    };
    function winClosing(event) {
        var options = $.data(event.data, formName).options;
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
    function calculateCount(div, beingNum,total) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var len = beingNum.length;
        var num = parseInt(beingNum) +parseInt(total) - 1;
        function padLeft(str, lenght) {
            if (str.length >= lenght)
                return str;
            else
                return padLeft("0" + str, lenght);
        };       
        return padLeft(num.toString(), len);
        
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'btnSave').unbind('click');
            $(headerId + 'btnSave').bind('click', div, btnSaveClick);
            $(headerId + 'btnCancel').unbind('click');
            /*
            $(headerId + 'txtBeginNum').off('blur');
            $(headerId + 'txtBeginNum').on('blur', function () {
                if ($(headerId + 'txtCount').jqxMaskedInput('val') != null && $(headerId + 'txtCount').jqxMaskedInput('val') != '') {
                    if ($(this).jqxMaskedInput('val') != null && $(this).jqxMaskedInput('val') != '') {
                        $(headerId + 'txtEndNum').jqxMaskedInput('val', null);
                        $(headerId + 'txtEndNum').jqxMaskedInput('val',
                            calculateCount(div, $(this).jqxMaskedInput('val'), $(headerId + 'txtCount').jqxMaskedInput('val')));
                    };
                };
            }); */
            /*
            $(headerId + 'txtCount').off('focusout');
            $(headerId + 'txtCount').on('focusout', function () {
                if ($(this).jqxMaskedInput('val') != null && $(this).jqxMaskedInput('val') != '') {
                    if ($(headerId + 'txtBeginNum').jqxMaskedInput('val') != null && $(headerId + 'txtBeginNum').jqxMaskedInput('val') != '') {
                        $(headerId + 'txtEndNum').jqxMaskedInput('val', null);
                        $(headerId + 'txtEndNum').jqxMaskedInput('val',
                          calculateCount(div, $(headerId + 'txtBeginNum').jqxMaskedInput('val'), $(this).jqxMaskedInput('val')));
                    };
                };
            }); */
            $(headerId + 'btnCancel').bind('click', function () {
                $(options.container).triggerHandler('winClosing');
            });
            if ($.isFunction(action)) { action() };
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        }
    };
    function btnFindClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return; };
        dsWhere.Table.rows[0]['GETPAPERDATE1'] = null;
        dsWhere.Table.rows[0]['GETPAPERDATE2'] = null;
        dsWhere.Table.rows[0]['EMPNO'] = null;
        dsWhere.Table.rows[0]['PREFIX'] = null;
        dsWhere.Table.rows[0]['SEQNO'] = null;
        if ($(headerId + 'takeDate1').csDateTime('getText') != '') {
            dsWhere.Table.rows[0]['GETPAPERDATE1'] = $(headerId + 'takeDate1').csDateTime('getText');
        };
        if ($(headerId + 'takeDate2').csDateTime('getText') != '') {
            dsWhere.Table.rows[0]['GETPAPERDATE2'] = $(headerId + 'takeDate2').csDateTime('getText');
        };
        if ($(headerId + 'takePerson').csMulti('getChooseQuoteList') != '' && $(headerId + 'takePerson').csMulti('getChooseQuoteList') != null) {
            dsWhere.Table.rows[0]['EMPNO'] = $(headerId + 'takePerson').csMulti('getChooseQuoteList');
        };
        if ($(headerId + 'txtFirstletter').jqxInput('val') != null) {
            dsWhere.Table.rows[0]['PREFIX'] = $(headerId + 'txtFirstletter').jqxInput('val');
        };
        if ($(headerId + 'txtSeqNo').jqxMaskedInput('val') != null) {
            dsWhere.Table.rows[0]['SEQNO'] = $(headerId + 'txtSeqNo').jqxMaskedInput('val');
        };
        delete QueryData;
        QueryData = {};
        $(headerId + 'csGrid').jqxGrid('clear');
        try {
            var parameters = $.extend({}, getParaLoginInfo(event.data, formName),
              { dsWhere: { type: 'string', value: dsWhere } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            $.extend(true, QueryData, tmp);
                            
                            grdData.localdata = QueryData.Table;
                            $(headerId + 'csGrid').jqxGrid('updatebounddata');
                            if (QueryData.Table.rows.length == 0) {
                                messageBox(options.language.noneData, messageType.information, null, function (flag) {
                                    
                                });
                            };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical, null, function (flag) {
                                //if ($.isFunction(act)) { act(false) };
                            });

                        };
                    } catch (err) {
                        errorHandle(formName, 'QueryData-Server', err);
                        //addHandler(event.data);

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
            errorHandle(formName, 'QueryData', err);
        } finally {

        };
        
    };
    function csCompSelected(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var currentComp = options.loginInfo.loginInfo.rows[0].compcode;
        //copyLoginInfo.loginInfo.value.rows[0].compcode = $(this).csList('codeNo');
        options.loginInfo.loginInfo.rows[0].compcode = $(this).csList('codeNo');
        unHandler(event.data);
        chkCompSelected(event.data, function (r) {
            if (r) {
          //      refreshUI(event.data);
                $(headerId + "csCompCode").csList('disabled', false);
                addHandler(event.data);
                //$(this).csList('disabled', false);
            } else {
                //copyLoginInfo.loginInfo.value.rows[0].compcode = currentComp;
                options.loginInfo.loginInfo.rows[0].compcode = currentComp;
                unHandler(event.data);
                $(headerId + "csCompCode").csList('codeNo', currentComp);
                //$(this).csList('codeNo', currentComp);                
                addHandler(event.data);
            };
        })
    };
    function chkCompSelected(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        //if ($.isFunction(act)) { act(true) };        
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { Mid: { type: 'string', value: 'SO3510' } });

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
    function isDataOK(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (options.editMode == editMode.append) {
            if ($(headerId + 'txtGetPaperDate').csDateTime('getText') == null || $(headerId + 'txtGetPaperDate').csDateTime('getText') == '') {
                messageBox(options.language.mustGetPaperDate, messageType.critical, null, function (flag) {
                    $(headerId + 'txtGetPaperDate').focus();
                    return false;
                });
                return false;
            };
            if ($(headerId + 'csEmpName').csList('codeNo') == null || $(headerId + 'csEmpName').csList('codeNo') == '') {
                messageBox(options.language.mustEmpName, messageType.critical, null, function (flag) {
                    $(headerId + 'csEmpName').csList('focus');
                    return false;
                });
                return false;
            };
            if ($(headerId + 'txtPrefix').jqxInput('val') == null || $(headerId + 'txtPrefix').jqxInput('val') == '') {
                messageBox(options.language.mustPrefix, messageType.critical, null, function (flag) {
                    $(headerId + 'txtPrefix').focus();
                    return false;
                });
                return false;
            };
            if ($(headerId + 'txtBeginNum').jqxMaskedInput('val') == null || $(headerId + 'txtBeginNum').jqxMaskedInput('val') == '') {
                messageBox(options.language.mustBeginNum, messageType.critical, null, function (flag) {
                    $(headerId + 'txtBeginNum').focus()
                    return false;
                });
                return false;
            };
            if ($(headerId + 'txtCount').jqxMaskedInput('val') == null || $(headerId + 'txtCount').jqxMaskedInput('val') == '') {
                messageBox(options.language.mustCount, messageType.critical, null, function (flag) {
                    $(headerId + 'txtCount').focus();
                    return false;
                });
                return false;
            };
            $(headerId + 'txtEndNum').jqxInput('val',
                calculateCount(div, $(headerId + 'txtBeginNum').jqxMaskedInput('val'),$(headerId + 'txtCount').jqxMaskedInput('val')))
            return true;
            
        } else {
            return true;
        };
    };
    function btnSaveClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var ds = prepareData(event.data);
        if (!isDataOK(event.data)) {
            return;
        };
        /*
        var ds = {
            SO126: {
                columns: [{ name: 'BEGINNUM', type: 'string' },
                    { name: 'COMPCODE', type: 'integer' },
                    { name: 'EMPNAME', type: 'string' },
                    { name: 'EMPNO', type: 'string' },
                    { name: 'ENDNUM', type: 'string' },
                    { name: 'GETPAPERDATE', type: 'date' },
                    { name: 'PREFIX', type: 'string' },
                    { name: 'SEQ', type: 'long' },
                    { name: 'TOTALPAPERCOUNT', type: 'integer' },
                    { name: 'RETURNDATE', type: 'date' },
                    { name: 'CLEARDATE', type: 'date' },
                    { name: 'NOTE', type: 'string' }

                ],
                rows: [{
                    BEGINNUM: null,
                    COMPCODE: null,
                    EMPNAME: null,
                    EMPNO: null,
                    ENDNUM: null,
                    GETPAPERDATE: null,
                    PREFIX: null,
                    SEQ: null,
                    TOTALPAPERCOUNT: null,
                    RETURNDATE: null,
                    CLEARDATE: null,
                    NOTE: null

                }]
            }
        }; */
        if ($(headerId + 'txtGetPaperDate').csDateTime('getText') != null && $(headerId + 'txtGetPaperDate').csDateTime('getText') != '') {
            ds['SO126'].rows[0]['GETPAPERDATE'] = $(headerId + 'txtGetPaperDate').csDateTime('getDate');
        };
        if ($(headerId + 'csEmpName').csList('codeNo') != null && $(headerId + 'csEmpName').csList('codeNo') != '') {
            ds['SO126'].rows[0]['EMPNO'] = $(headerId + 'csEmpName').csList('codeNo');
            ds['SO126'].rows[0]['EMPNAME'] = $(headerId + 'csEmpName').csList('description');
        };
        if ($(headerId + 'txtPrefix').jqxInput('val') != null && $(headerId + 'txtPrefix').jqxInput('val') != '') {
            ds['SO126'].rows[0]['PREFIX'] = $(headerId + 'txtPrefix').jqxInput('val');
        };
        if ($(headerId + 'txtBeginNum').jqxMaskedInput('val') != null && $(headerId + 'txtBeginNum').jqxMaskedInput('val') != '') {
            ds['SO126'].rows[0]['BEGINNUM'] = $(headerId + 'txtBeginNum').jqxMaskedInput('val');
        };
        if (options.editMode == editMode.append) {
            ds['SO126'].rows[0]['ENDNUM'] = calculateCount(event.data, $(headerId + 'txtBeginNum').jqxMaskedInput('val'), $(headerId + 'txtCount').jqxMaskedInput('val'));
        } else {
            ds['SO126'].rows[0]['ENDNUM'] = $(headerId + 'txtEndNum').jqxInput('val');
        };
        
        if ($(headerId + 'txtCount').jqxMaskedInput('val') != null && $(headerId + 'txtCount').jqxMaskedInput('val') != '') {
            ds['SO126'].rows[0]['TOTALPAPERCOUNT'] = $(headerId + 'txtCount').jqxMaskedInput('val');
        };
        if ($(headerId + 'txtRETURNDATE').csDateTime('getText') != null && $(headerId + 'txtRETURNDATE').csDateTime('getText') != '') {
            ds['SO126'].rows[0]['RETURNDATE'] = $(headerId + 'txtRETURNDATE').csDateTime('getDate');
        };
        if ($(headerId + 'txtCLEARDATE').csDateTime('getText') != null && $(headerId + 'txtCLEARDATE').csDateTime('getText') != '') {
            ds['SO126'].rows[0]['CLEARDATE'] = $(headerId + 'txtCLEARDATE').csDateTime('getDate');
        };
        ds['SO126'].rows[0]['COMPCODE'] = options.loginInfo.loginInfo.rows[0].compcode
        if (options.editMode == editMode.edit) {
            ds['SO126'].rows[0]['SEQ'] = options.parameters[options.parentDataTableName].rows[0]['SEQ'];
        };
        if ($(headerId + 'txtMemo').jqxTextArea('val') != null && $(headerId + 'txtMemo').jqxTextArea('val') != '') {
            ds['SO126'].rows[0]['NOTE'] = $(headerId + 'txtMemo').jqxTextArea('val');
        };
        try {
            var parameters = $.extend({}, getParaLoginInfo(event.data, formName),
                {editMode:{type:'integer',value:options.editMode}},
                 { ds: { type: 'string', value: ds } });
                  

            var params = getParameters(riadllName,
                   riaClassName,
                   'SaveData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ResultBoolean) {
                           // var d = JSON.parse(data.ResultXML);
                          //  $(headerId + 'csEmpName').csList('source', d.Table.rows);
                            //    if ($.isFunction(action)) { action() };
                            messageBox(options.language.SaveOK, messageType.information, null, function (flag) {
                                options.isSaved = true;
                                options.editMode = editMode.view;
                                $(options.container).triggerHandler('winClosing');
                            });
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };
                    } catch (err) {
                        errorHandle(formName, 'SaveData-Server', err);
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
            errorHandle(formName, 'QueryEmployee', err);
        } finally {

        };
    };
    function QueryEmployee(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (options.editMode == editMode.edit) {                        
            if ($.isFunction(action)) { action() };
            return true;
        };
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName) );

            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryEmployee',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var d = JSON.parse(data.ResultXML);                           
                            $(headerId + 'csEmpName').csList('source', d.Table.rows);                           
                            if ($.isFunction(action)) { action() };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };
                    } catch (err) {
                        errorHandle(formName, 'QueryEmployee-Server', err);
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
            errorHandle(formName, 'QueryEmployee', err);
        } finally {

        };
    };
    function prepareData(div) {
        var options = $.data(div, formName).options;
        var ds = {
            SO126: {
                columns: [{ name: 'BEGINNUM', type: 'string' },
                    { name: 'COMPCODE', type: 'integer' },
                    { name: 'EMPNAME', type: 'string' },
                    { name: 'EMPNO', type: 'string' },
                    { name: 'ENDNUM', type: 'string' },
                    { name: 'GETPAPERDATE', type: 'date' },                    
                    { name: 'PREFIX', type: 'string' },
                    { name: 'SEQ', type: 'long' },
                    { name: 'TOTALPAPERCOUNT', type: 'integer' },                    
                    { name: 'RETURNDATE', type: 'date' },
                    { name: 'CLEARDATE', type: 'date' },
                    { name: 'NOTE', type: 'string' }

                ],
                rows: [{
                    BEGINNUM: null,
                    COMPCODE: null,
                    EMPNAME: null,
                    EMPNO: null,
                    ENDNUM: null,
                    GETPAPERDATE: null,                    
                    PREFIX: null,
                    SEQ: null,
                    TOTALPAPERCOUNT: null,
                    RETURNDATE: null,
                    CLEARDATE: null,
                    NOTE:null
                    
                }]
            }
        };
        return ds
    }
    function prepareWhere(div) {
        dsWhere = {
            Table: {
                columns: [{ name: 'GETPAPERDATE1', type: 'string' },
                    { name: 'GETPAPERDATE2', type: 'string' },
                    { name: 'EMPNO', type: 'string' },
                    { name: 'PREFIX', type: 'string' },
                    { name: 'SEQNO', type: 'string' },                    
                ],
                rows: [{
                    GETPAPERDATE1: null,
                    GETPAPERDATE2: null,
                    EMPNO: null,
                    PREFIX: null,
                    SEQNO: null,                    
                }]
            }
        };
    };
    function RcdToScr(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        if (options.editMode == editMode.append) {
            if ($.isFunction(act)) { act() };
            return;
        };
        try {
            $(headerId + 'txtGetPaperDate').csDateTime('setDate',
            options.parameters[options.parentDataTableName].rows[0]['GETPAPERDATE']);

            $(headerId + 'csEmpName').csList('setDisplayValue',
                                    {
                                        CODENO: options.parameters[options.parentDataTableName].rows[0].EMPNO,
                                        DESCRIPTION: options.parameters[options.parentDataTableName].rows[0].EMPNAME
                                    });
            if (options.parameters[options.parentDataTableName].rows[0].PREFIX != undefined) {
                $(headerId + 'txtPrefix').jqxInput('val', options.parameters[options.parentDataTableName].rows[0].PREFIX);
            };
            if (options.parameters[options.parentDataTableName].rows[0].BEGINNUM != undefined) {
                $(headerId + 'txtBeginNum').jqxMaskedInput('val', options.parameters[options.parentDataTableName].rows[0].BEGINNUM);
            };
            if (options.parameters[options.parentDataTableName].rows[0].ENDNUM != undefined) {
                $(headerId + 'txtEndNum').jqxInput('val', options.parameters[options.parentDataTableName].rows[0].ENDNUM);
            };
            if (options.parameters[options.parentDataTableName].rows[0].TOTALPAPERCOUNT != undefined) {
                $(headerId + 'txtCount').jqxMaskedInput('val', options.parameters[options.parentDataTableName].rows[0].TOTALPAPERCOUNT);
            };



            if (options.parameters[options.parentDataTableName].rows[0].RETURNDATE != undefined) {
                $(headerId + 'txtRETURNDATE').csDateTime('setDate', options.parameters[options.parentDataTableName].rows[0].RETURNDATE);
            };
            if (options.parameters[options.parentDataTableName].rows[0].CLEARDATE != undefined) {
                $(headerId + 'txtCLEARDATE').csDateTime('setDate', options.parameters[options.parentDataTableName].rows[0].CLEARDATE);
            };
            if (options.parameters[options.parentDataTableName].rows[0].NOTE != undefined) {
                $(headerId + 'txtMemo').jqxTextArea('val', options.parameters[options.parentDataTableName].rows[0].NOTE);
            };
            if ($.isFunction(act)) { act() };
        } catch (err) {
            errorHandle(formName, 'RcdToScr', err);
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
                       $(div).triggerHandler('loaded', [this, options]);
                       if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                           options.containerIsWindow = true;
                           var csw = $.data(div, formName).options.container;
                           csw.on("winClosing", div, winClosing);

                       };
                       $(div).html(msg);
                       changeElementId(div);
                       changeLanguage(div);
                       renderControl(div);
                       RcdToScr(div, function () {
                           QueryEmployee(div, function () {
                               addHandler(div);
                           });
                       });
                       //prepareWhere(div);
                       /*
                       QueryAllData(div, function () {
                           addHandler(div, function () {
                           })
                       }); */
                      
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