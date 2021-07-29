(function ($) {
    var formName = 'SO3510A';
    var riadllName = 'CableSoft.SO.RIA.Billing.ManualNo.Web.dll';
    var riaClassName = ' CableSoft.SO.RIA.Billing.ManualNo.Web.ManualNo';
    var copyLoginInfo = {};
    var grdData = null;
    var dataWhere = {};
    var QueryData = {};
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
                            options: $.extend({}, new defaults(), new SO3510A(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3510A_each', err);
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
        //-----------------------------------------------------------------------------    
        $(headerId + "csCompCode").csList({
            source: null,
            codeNoWidth: 50,
            width: 300,
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
        $(headerId + "csCompCode").csList('onlyDropDown', true);
        controls.push({ name: $(div).prop('id') + 'csCompCode', type: 'csList', level: 2 });
        //-----------------------------------------------------------------------------

        //-----------------------------------------------------------------------------    
        $(headerId + "takeDate1").csDateTime({
            formatString: 'yyyy/MM/dd',
            value: null,
            height: 25,
            width: 110
        });
        controls.push({ name: $(div).prop('id') + 'takeDate1', type: 'csDateTime', level: 2 });
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------    
        $(headerId + "takeDate2").csDateTime({
            formatString: 'yyyy/MM/dd',
            value: null,
            height: 25,
            width: 110
        });
        controls.push({ name: $(div).prop('id') + 'takeDate2', type: 'csDateTime', level: 2 });
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------    
        $(headerId + 'takePerson').csMulti({
            //     source: data2,
            buttonText: lang.takePerson,
            width: 400,
            //width: 200,
            buttonWidth: 80,
            //widthDesc: 150,                                
            isReadOnly: false,
        });
        controls.push({ name: $(div).prop('id') + 'takePerson', type: 'csMulti', level: 2 });
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------    
        $(headerId + 'txtFirstletter').jqxInput({
            width: 80,
            height: '25px',
        });
        controls.push({ name: $(div).prop('id') + 'txtFirstletter', type: 'jqxInput', level: 2 });
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------    
        $(headerId + "txtSeqNo").jqxMaskedInput({
            width: '110px',
            height: '25px',
            promptChar: '',
            mask: '9999999999'
        });
        controls.push({ name: $(div).prop('id') + 'txtSeqNo', type: 'jqxMaskedInput', level: 2 });
        //-----------------------------------------------------------------------------
       
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnFind').jqxButton($.extend({}, imagePosition, {
            width: 110,
            imgSrc: imageScr.query.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnFind', type: 'jqxButton', level: 2 });
        $(headerId + 'btnFind > img').css('top', '2px');
        //-----------------------------------------------------------------------------

        //-----------------------------------------------------------------------------    
        $(headerId + 'btnClean').jqxButton($.extend({}, imagePosition, {
            width: 110,
            imgSrc: imageScr.clear.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnClean', type: 'jqxButton', level: 2 });
        $(headerId + 'btnClean > img').css('top', '2px');
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnAdd').jqxButton($.extend({}, imagePosition, {
            width: 80,
            imgSrc: imageScr.append.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnAdd', type: 'jqxButton', level: 2 });
        $(headerId + 'btnAdd > img').css('top', '2px');
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnEdit').jqxButton($.extend({}, imagePosition, {
            width: 80,
            imgSrc: imageScr.edit.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnEdit', type: 'jqxButton', level: 2 });
        $(headerId + 'btnEdit > img').css('top', '2px');
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnDel').jqxButton($.extend({}, imagePosition, {
            width: 80,
            imgSrc: imageScr.delete.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnDel', type: 'jqxButton', level: 2 });
        $(headerId + 'btnDel > img').css('top', '2px');
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnReuse').jqxButton($.extend({}, imagePosition, {
            width: 100,
            imgSrc: imageScr.excel.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnReuse', type: 'jqxButton', level: 2 });
        $(headerId + 'btnReuse > img').css('top', '2px');
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
        $(headerId +'csGrid').jqxGrid({
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
                { text: lang.colEMPNAME, datafield: 'EMPNAME', width: 110, editable: false, groupable: false },
                { text: lang.colGETPAPERDATE, datafield: 'GETPAPERDATE', width: 110, editable: false, groupable: false, cellsformat: 'yyyy/MM/dd' },
                { text: lang.colPREFIX, datafield: 'PREFIX', width: 50, editable: false, groupable: false },
                { text: lang.colBEGINNUM, datafield: 'BEGINNUM', width: 100, editable: false, groupable: false },
                { text: lang.colENDNUM, datafield: 'ENDNUM', width: 100, editable: false, groupable: false, cellsalign: 'center', align: 'center' },
                { text: lang.colTOTALPAPERCOUNT, datafield: 'TOTALPAPERCOUNT', width: 80, editable: false, groupable: false, cellsalign: 'right', align: 'center' },
                { text: lang.colOPERATOR, datafield: 'OPERATOR', width: 110, editable: false, groupable: false },
                { text: lang.colRETURNDATE, datafield: 'RETURNDATE', width: 110, editable: false, groupable: false, cellsformat: 'yyyy/MM/dd' },
                { text: lang.colCLEARDATE, datafield: 'CLEARDATE', width: 110, editable: false, groupable: false, cellsformat: 'yyyy/MM/dd' },
                { text: lang.colNOTE, datafield: 'NOTE', width: 250, editable: false, groupable: false },
                { text: lang.colUPDTIME, datafield: 'UPDTIME', width: 110, editable: false, groupable: false },

            ],
            localization: options.localization,

        });
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
                        var o = $('#' + $(div).prop('id') + controls[i].name);
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
        $(headerId + 'csCompCode').off('selectedIndexChanged');
        $(headerId + 'btnFind').off('click');
        $(headerId + 'csGrid').off('bindingcomplete');
        $(headerId + 'btnClean').off('click');
        /*
        $(headerId + 'btnOK').unbind('click', btnOKClick);
        $(headerId + 'btnExit').unbind('click'); */
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'csCompCode').off('selectedIndexChanged');
            $(headerId + 'csCompCode').on('selectedIndexChanged', div, csCompSelected);
            $(headerId + 'btnFind').off('click');
            $(headerId + 'btnFind').bind('click', div, btnFindClick);
            $(headerId + 'csGrid').off('bindingcomplete');
            $(headerId + 'csGrid').on('bindingcomplete', function (event) {
                //alert('yes');
                $(this).jqxGrid({ selectedrowindex: 0 });
            });
            $(headerId + 'btnClean').off('click');
            $(headerId + 'btnClean').on('click', function (e) {
                $(headerId + 'csGrid').jqxGrid('clear');
            });
            /*
            $(headerId + 'btnOK').unbind('click');
            $(headerId + 'btnOK').bind('click', div, btnOKClick);
            $(headerId + 'btnExit').unbind('click');
            $(headerId + 'btnExit').bind('click', function () {
                if ($(this).jqxButton('disabled')) { return; };
                if (options.containerIsWindow) {
                    $($.data(div, formName).options.container).csWindow('close');
                };
            }); */
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
    function QueryAllData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName) );

            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryAllData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var d = JSON.parse(data.ResultXML);
                            delete options.initData;
                            options.initData = {};
                            $.extend(true, options.initData, d);
                            $(headerId + 'csCompCode').csList('source', options.initData.CompCode.rows);
                            $(headerId + 'csCompCode').csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                            $(headerId + 'takePerson').csMulti('source', options.initData.Employee.rows);
                           // $(headerId + 'csServiceType').csList('source', options.initData.ServiceType.rows);
                           // $(headerId + 'csServiceType').csList('codeNo', 'D');
                           // $(headerId + 'lblTranDate').text('');
                           // $(headerId + 'lblUpdEn').text('');
                           // $(headerId + 'lblUpdTime').text('');
                         
                            if ($.isFunction(action)) { action() };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };
                    } catch (err) {
                        errorHandle(formName, 'QueryDefaultValue-Server', err);
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
            errorHandle(formName, 'QueryDefaultValue', err);
        } finally {

        };
    };
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
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            copyLoginInfo = getParaLoginInfo(div, formName);
            loadForm(options,
               'SO3000\\' + formName + '.html',
               function (msg) {
                   try {
                       $(div).triggerHandler('loaded', [this, options]);
                       $(div).html(msg);
                       changeElementId(div);
                       changeLanguage(div);
                       renderControl(div);
                       prepareWhere(div);
                       QueryAllData(div, function () {
                           addHandler(div, function () {
                           })
                       });
                       //prepareData(div);
                       /*
                       queryAllData(div, function () {
                           addHandler(div);
                           $(div).triggerHandler('loaded', [this, options]);
                       }); */
                   }
                   catch (err) {
                       errorHandle(formName, 'formLoaded_success', err);
                   }
               });





            /*$.ajax({
                url: 'SO3000\\' + formName + '.html',
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