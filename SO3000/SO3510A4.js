(function ($) {
    var formName = 'SO3510A4';
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
                            options: $.extend({}, new defaults(), new SO3510A4(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3510A4_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3510A4', err);
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
                   { name: 'PAPERNUM', type: 'string' },
                   { name: 'EMPNAME', type: 'string' },
                   { name: 'GETPAPERDATE', type: 'date' },
                   { name: 'BILLNO', type: 'string' },
                   { name: 'CUSTID', type: 'integer' },
                   { name: 'OPERATOR', type: 'string' },
                   { name: 'UPDTIME', type: 'string' },
                   { name: 'ISEXIST', type: 'integer' },
                   { name: 'SEQ', type: 'integer' },
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
        $(headerId + "csCompCode").csList({
            source: null,
            codeNoWidth: 60,
            width: 250,
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
        controls.push({ name: $(div).prop('id') + 'csCompCode', type: 'csList', level: 2 });
        //-----------------------------------------------------------------------------    

        //-----------------------------------------------------------------------------    
        $(headerId + "PaperNum1").jqxInput({
            width: '120px',
            height: '25px',
        });
        controls.push({ name: $(div).prop('id') + 'PaperNum1', type: 'jqxInput', level: 2 });
        //-----------------------------------------------------------------------------    

     
        //-----------------------------------------------------------------------------    
        $(headerId + "PaperNum2").jqxInput({
            width: '120px',
            height: '25px',
        });
        controls.push({ name: $(div).prop('id') + 'PaperNum2', type: 'jqxInput', level: 2 });
        //-----------------------------------------------------------------------------    
       
        $(headerId + 'btnFind').jqxButton($.extend({}, imagePosition, {
            width: 80,
            imgSrc: imageScr.query.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnFind', type: 'jqxButton', level: 2 });
        $(headerId + 'btnFind > img').css('top', '2px');
        //----------------------------------------------------------------------------- 
        //-----------------------------------------------------------------------------    

        $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
            width: 80,
            imgSrc: imageScr.ok.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnOK', type: 'jqxButton', level: 2 });
        $(headerId + 'btnOK > img').css('top', '2px');
        //----------------------------------------------------------------------------- 
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnExit').jqxButton($.extend({}, imagePosition, {
            width: 80,
            imgSrc: imageScr.exit.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnExit', type: 'jqxButton', level: 2 });
        $(headerId + 'btnExit > img').css('top', '2px');
        //----------------------------------------------------------------------------- 
        //----------------------------------------------------------------------------- 
        $(headerId + 'csGrid').jqxGrid({
            width: '99.7%',
            height: '98%',
            //source: dataAdapter1,
            editable: false,
            sortable: false,
            altrows: true,
            columnsresize: true,
            columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: 40,
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                { text: lang.colPAPERNUM, datafield: 'PAPERNUM', width: 120, editable: false, groupable: false },
                { text: lang.colEMPNAME, datafield: 'EMPNAME', width: 120, editable: false, groupable: false },
                { text: lang.colGETPAPERDATE, datafield: 'GETPAPERDATE', width: 100, editable: false, groupable: false, cellsformat: 'yyyy/MM/dd' },
                { text: lang.colBILLNO, datafield: 'BILLNO', width: 140, editable: false, groupable: false },
                { text: lang.colCUSTID, datafield: 'CUSTID', width: 90, editable: false, groupable: false },
                { text: lang.colOPERATOR, datafield: 'OPERATOR', width: 110, editable: false, groupable: false },
                { text: lang.colUPDTIME, datafield: 'UPDTIME', width: 150, editable: false, groupable: false },
                { text: 'ISEXIST', datafield: 'ISEXIST', width: 10, editable: false, groupable: false, visible: false },
                { text: 'SEQ', datafield: 'SEQ', width: 10, editable: false, groupable: false, visible: false },

                /*
                { text: '合計張數', datafield: 'TOTALPAPERCOUNT', width: 80, editable: false, groupable: false, cellsalign: 'right', align: 'center' },                    
                { text: '退回日期', datafield: 'RETURNDATE', width: 110, editable: false, groupable: false },
                { text: '清除日期', datafield: 'CLEARDATE', width: 110, editable: false, groupable: false },
                { text: '備註', datafield: 'NOTE', width: 250, editable: false, groupable: false }, */
            ]
            ,localization: options.localization,            
        });
        $(headerId + 'csGrid').jqxGrid('hidecolumn', 'ISEXIST');
        $(headerId + 'csGrid').jqxGrid('hidecolumn', 'SEQ');
        renderGrid(div);
        controls.push({ name: $(div).prop('id') + 'csGrid', type: 'jqxGrid', level: 2 });
        //----------------------------------------------------------------------------- 
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
        $(headerId + 'btnOK').unbind('click');
        $(headerId + 'btnExit').unbind('click');
        $(headerId + 'btnFind').unbind('click');
        $(headerId + 'csCompCode').unbind('selectedIndexChanged');
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
            $(headerId + 'csCompCode').unbind('selectedIndexChanged');
            $(headerId + 'csCompCode').on('selectedIndexChanged', div, csCompSelected);
            $(headerId + 'btnFind').unbind('click');
            $(headerId + 'btnFind').bind('click', div, btnFindClick);
            $(headerId + 'btnOK').unbind('click');
            $(headerId + 'btnOK').bind('click', div, btnOKClick);
            $(headerId + 'btnExit').unbind('click');
          
            $(headerId + 'btnExit').bind('click', function () {
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
        if (!isDataOK(event.data)) { return; };
        var dsData = {
            tbData: {
                columns: [{ name: 'PAPERNUM1', type: 'string' },
                    { name: 'PAPERNUM2', type: 'string' },                
                ],
                rows: [{
                    PAPERNUM1: $(headerId + 'PaperNum1').jqxInput('val'),
                    PAPERNUM2: $(headerId + 'PaperNum2').jqxInput('val'),                  
                }]
            }
        };
        $(headerId + 'csGrid').jqxGrid('clear');
        QueryData = {};
        try {
            var parameters = $.extend({}, getParaLoginInfo(event.data, formName),
                 { dsData: { type: 'string', value: dsData } });


            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryPaperNum',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ResultBoolean) {
                            var d = JSON.parse(data.ResultXML);
                            if (d.Result.rows.length == 0) {
                                messageBox(options.language.noneQuery, messageType.information, null, function (flag) {                                   
                                });
                            } else {
                                $.extend(true, QueryData, d.Result);
                                grdData.localdata = d.Result;
                                $(headerId + 'csGrid').jqxGrid('updatebounddata');
                            }
                            delete d;
                            d = null;
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };
                    } catch (err) {
                        errorHandle(formName, 'QueryPaperNum-Server', err);
                        addHandler(div);

                    } finally {
                        delete data;
                        delete parameters;
                        delete params;
                        parameters = null;
                        params = null;
                        data = null;
                        
                    };
                }
            });

        } catch (err) {
            errorHandle(formName, 'btnFindClick', err);
        } finally {
            dsData['tbData'].rows.lenght = 0;
            delete dsData;
            dsData = null;
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
                $(headerId + 'csGrid').jqxGrid('clear');
                $(headerId + 'PaperNum1').jqxInput('val',null);
                $(headerId + 'PaperNum2').jqxInput('val', null);
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
              { Mid: { type: 'string', value: 'SO3510A4' } });

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
        if ($(headerId + 'PaperNum1').jqxInput('val') == null || $(headerId + 'PaperNum1').jqxInput('val') == '') {
            messageBox(options.language.mustPaperNum1, messageType.critical, null, function (flag) {
                $(headerId + 'PaperNum1').focus();
                return false;
            });
            return false;
        };
        if ($(headerId + 'PaperNum2').jqxInput('val') == null || $(headerId + 'PaperNum2').jqxInput('val') == '') {
            messageBox(options.language.mustPaperNum2, messageType.critical, null, function (flag) {
                $(headerId + 'PaperNum2').focus();
                return false;
            });
            return false;
        };
               
            return true;
    };
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return; };
        if ($(headerId + 'csGrid').jqxGrid('getrows').length == 0) {
            messageBox(options.language.QueryFirst, messageType.information, null, function (flag) {
                return;
            });
            return;
        };
        
        if ($(headerId + 'csGrid').jqxGrid('getcellvalue', 0, 'ISEXIST') == 1) {
            messageBox(options.language.hadBillNo, messageType.information, null, function (flag) {
                return;
            });
            return;
        };
        var ask = options.language.AskQuestion.replace('{0}', QueryData.rows.length.toString());
        messageBox(ask, messageType.yesno, null,function (flag) {
            if (flag.toString().toUpperCase() != 'YES') {
                return;
            } else {
                var dsData = {
                    tbData: {
                        columns: [{ name: 'SEQ', type: 'integer' },
                            { name: 'PAPERNUM1', type: 'string' },
                            { name: 'PAPERNUM2', type: 'string' },
                        ],
                        rows: [{
                            SEQ: QueryData.rows[0]['SEQ'],
                            PAPERNUM1: QueryData.rows[0]['PAPERNUM'],
                            PAPERNUM2: QueryData.rows[QueryData.rows.length - 1]['PAPERNUM'],
                        }]
                    }
                };

                try {
                    var parameters = $.extend({}, getParaLoginInfo(event.data, formName),
                         { dsData: { type: 'string', value: dsData } });


                    var params = getParameters(riadllName,
                           riaClassName,
                           'abandonPaper',
                           JSON.stringify(parameters));
                    getServerData(params, {
                        success: function (data) {
                            try {
                                if (data.ResultBoolean) {
                                    messageBox(options.language.SaveOK, messageType.information, null, function (flag) {
                                        options.editMode = editMode.view;
                                        //$(options.container).triggerHandler('winClosing');
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
                    errorHandle(formName, 'btnOKClick', err);
                } finally {
                    dsData['tbData'].rows.lenght = 0;
                    delete dsData;
                    dsData = null;
                };
            };
        });
       
              
       
    };
    function QueryCompCode(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');       
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName) );

            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryCompCode',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var d = JSON.parse(data.ResultXML);                           
                            $(headerId + 'csCompCode').csList('source', d.Table.rows);
                            $(headerId + 'csCompCode').csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                            if ($.isFunction(action)) { action() };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };
                    } catch (err) {
                        errorHandle(formName, 'QueryCompCode-Server', err);
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
            errorHandle(formName, 'QueryCompCode', err);
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
            var headerId = '#' + $(div).attr('id');
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
                       QueryCompCode(div, function () {
                           addHandler(div, function () {

                           })
                       });
                       /*
                       QueryEmployee(div, function () {
                           $(headerId + 'txtOBeginNum').text(options.parameters[options.parentDataTableName].rows[0]['BEGINNUM']);
                           $(headerId + 'txtOEndNum').text(options.parameters[options.parentDataTableName].rows[0]['ENDNUM']);
                           $(headerId + 'lblTotalPaperCount').text(
                               options.parameters[options.parentDataTableName].rows[0]['TOTALPAPERCOUNT']);
                           addHandler(div, function () {

                           });
                       }) */
                       /*
                       RcdToScr(div, function () {
                           QueryEmployee(div, function () {
                               addHandler(div);
                           });
                       }); */
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