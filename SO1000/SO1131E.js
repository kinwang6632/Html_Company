(function ($) {
    var formName = 'SO1131E';
    var riadllName = 'CableSoft.SO.RIA.Facility.ChooseFaci.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Facility.ChooseFaci.Web.ChooseFaci';
    var grdData = null;
    var custId = -1;
    var faciSeqNO = null;
    var faciSNO = null;
    var serviceType = 'X';
    var chooseFaci = null;
    var inFaciCode = '';
    var defaults = (function () {
        this.language = {};        
        this.initData = {};        
        this.loginInfo = {};
        this.editMode = 0;
        this.refNo = 0;
        this.parameters = {};
        this.controls = [];        
        this.theme = '';
        this.localization = {};
        this.faciSeqNO = '';
        this.faciSNO = '';
        this.MVodID = '';
        this.includePR = false;
        this.noRefNo = null;
        this.addRefNo = null;
        this.includeDVR = false;
        this.includeFilter = true;
        this.faciData = {};
        this.canMutilChoose = false;
        this.isQueryMVodID = false;
        this.wipData = {};
        this.hideOKButton = false;
        this.customerTable = {};
        
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
    $.fn.SO1131E = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new SO1131E(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1131E_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1131E', err);
        }
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var height = $(div).innerHeight();
        var headerId = '#' + $(div).prop('id');
        try {            
            //-----------------------------------------------------------------------------
            $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.ok.imgSrc
            }));
            $(headerId + 'btnOK > img').css('top', '2px');
            controls.push({ name:$(div).prop('id')  + 'btnOK', type: 'jqxButton', level: 2 });
            if (options.hideOKButton) {
                $(headerId + 'btnOK').hide();
            }
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.cancel.imgSrc
            }));
            $(headerId + 'btnCancel > img').css('top', '2px');
            controls.push({ name:$(div).prop('id')  + 'btnCancel', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "grdData").jqxGrid({
                width: '99.7%',
                height: '99%',
                sortable: true,
                altrows: true,
                columnsresize: true,
                editable : true,
                localization: options.localization,
                columns: [
                   {
                       text: '#', sortable: false, filterable: false, editable: false,
                       groupable: false, draggable: false, resizable: false,
                       datafield: '', columntype: 'number', width: 30,
                       cellsrenderer: function (row, column, value) {
                           return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                       }
                   },
                     {
                         text: lang.colChoose,
                         datafield: 'CHOOSE',
                         width: 50,
                         editable: true,
                         threestatecheckbox: false,
                         columntype: 'checkbox',
                         cellsalign: 'center',
                         align: 'center',
                         hidden:!options.canMutilChoose
                     },                    
                    { text: lang.colFaciStatus, datafield: 'FACISTATUS',editable: false, hidden: false, width: 70, cellsalign: 'center', align: 'center' },
                    { text: lang.colFaciSNo, datafield: 'FACISNO',editable: false, hidden: false,width:130 },
                    { text: lang.colDeclarantName, datafield: 'DECLNAME', editable: false, width: 100, cellsalign: 'left', align: 'left', hidden: false },
                    { text: lang.colFaciName, datafield: 'FACINAME',editable: false, width: 150, cellsalign: 'left', align: 'left' },
                    { text: lang.colCMBaudRate, datafield: 'CMBAUDRATE', editable: false,width: 70, cellsalign: 'center', align: 'center', hidden: false },
                    { text: lang.colFixIPCount, datafield: 'FIXIPCOUNT', editable: false,width: 70, cellsalign: 'center', align: 'center', hidden: false },
                    { text: lang.colDynIPCount, datafield: 'DYNIPCOUNT', editable: false,width: 70, cellsalign: 'center', align: 'center', hidden: false },
                    { text: lang.colInstDate, datafield: 'INSTDATE', editable: false,width: 100, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colPRDate, datafield: 'PRDATE', editable: false,width: 100, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colInitPlace, datafield: 'INITPLACENAME',editable: false, width: 70, cellsalign: 'left', align: 'left' },
                    { text: lang.colModelName, datafield: 'MODELNAME', editable: false,width: 100, cellsalign: 'left', align: 'left' },
                    { text: lang.colBuyName, datafield: 'BUYNAME',editable: false, width: 60, cellsalign: 'left', align: 'left' },
                    { text: lang.colSmartCardNo, datafield: 'SMARTCARDNO',editable: false, width: 130, cellsalign: 'left', align: 'left' },
                    { text: lang.colDueDate, datafield: 'DUEDATE', editable: false,width: 100, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    {
                        text: lang.colContractCust,
                        datafield: 'CONTRACTCUST',editable: false, width: 50, cellsalign: 'center', align: 'center',
                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                            return isContract(row, columnfield, value, defaulthtml, columnproperties, lang)
                        }
                    },
                    { text: lang.colContractDate, datafield: 'CONTRACTDATE',editable: false, width: 100, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colSeqNo, datafield: 'SEQNO',editable: false, width: 130, cellsalign: 'left', align: 'left' },
                    { text: lang.colVodAccountId, datafield: 'VODACCOUNTID', editable: false,width: 130, cellsalign: 'left', align: 'left', hidden: true },
                ]                
            });
            controls.push({ name:$(div).prop('id')  + 'grdData', type: 'jqxGrid', level: 2 });
            renderGrid(div);
            
            //-----------------------------------------------------------------------------

        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        };
    };
    function isContract(row, columnfield, value, defaulthtml, columnproperties, lang) {
        if (columnfield.toUpperCase() == 'CONTRACTCUST') {
            if (value == 1) {
                return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + lang.grdChecked + '</div>'
            } else {
                return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + lang.grdNoChecked + '</div>'                
            };
        };
    };
    function renderGrid(div) {
        var options = $.data(div, formName).options;
        var headId = '#' + $(div).attr('id');
        delete grdData;
        grdData = null;

        grdData = {
            datatype: 'json',
            datafields: [
                   { name:'CHOOSE',type:'boolean'},
                   { name: 'FACISTATUS', type: 'string' },
                   { name: 'FACISNO', type: 'string' },
                   { name: 'DECLNAME', type: 'string' },
                   { name: 'FACINAME', type: 'string' },
                   { name: 'CMBAUDRATE', type: 'string' },
                   { name: 'FIXIPCOUNT', type: 'integer' },
                   { name: 'DYNIPCOUNT', type: 'integer' },
                   { name: 'INSTDATE', type: 'date' },
                   { name: 'PRDATE', type: 'date' },
                   { name: 'INITPLACENAME', type: 'string' },
                   { name: 'MODELNAME', type: 'string' },
                   { name: 'BUYNAME', type: 'string' },
                   { name: 'SMARTCARDNO', type: 'string' },
                   { name: 'DUEDATE', type: 'date' },
                   { name: 'CONTRACTCUST', type: 'string' },
                   { name: 'CONTRACTDATE', type: 'date' },
                   { name: 'SEQNO', type: 'string' },
                   { name: 'VODACCOUNTID',type:'integer' }
            ]
        };
        var dataAdapter1 = new $.jqx.dataAdapter(grdData);
        $(headId + 'grdData').jqxGrid({ source: dataAdapter1 });
        
    };
    function formDestroy(div) {
        var options = $.data(div, formName).options;
        try {
            unHandler(div);
            grdData = null;
            custId = -1;
            faciSeqNO = null;
            faciSNO = null;
            serviceType = 'X';
            chooseFaci = null;
            inFaciCode = '';            
            var controls = $.data(div, formName).options.controls;
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
            /*
            var options = $.data(div, formName).options;
            options.length = 0;
            options = null;
            delete options;
            $.data(div, formName, null); */
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            /*
            if (options.loginInfo.loginInfo.value == undefined) {
                options.loginInfo = $.extend(true, {}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            }; */
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
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
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });
            /*$.ajax({
                url: 'SO1000\\' + formName + '.html?v=' + formatDateTime(new Date(), "datetime3"),
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        initData(div,  function () {
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
    function chkMustData(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            if ($.isEmptyObject(options.parameters)) {
                messageBox(options.language.NoParaData, messageType.critical);
                return;
            };
            if (options.parameters['chooseFaci'] == undefined) {
                messageBox(options.language.NoFaciData, messageType.critical);
                return;
            };
            if (options.parameters['chooseFaci'].rows.length > 0) {
                custId = options.parameters['chooseFaci'].rows[0].CUSTID;
                serviceType = options.parameters['chooseFaci'].rows[0].SERVICETYPE;
                if (options.parameters['chooseFaci'].rows[0].INFACICODE != undefined) {
                    inFaciCode = options.parameters['chooseFaci'].rows[0].INFACICODE;
                };
                
                if (options.parameters['chooseFaci'].rows[0].FACISEQNO != undefined) {
                    if (options.parameters['chooseFaci'].rows[0].FACISEQNO != null) {
                        faciSeqNO = options.parameters['chooseFaci'].rows[0].FACISEQNO;
                    };
                };
                if (options.parameters['chooseFaci'].rows[0].FACISNO != undefined) {
                    if (options.parameters['chooseFaci'].rows[0].FACISNO != null) {
                        faciSNO = options.parameters['chooseFaci'].rows[0].FACISNO;
                    };
                };
            };
            return true;
        } catch (err) {
            errorHandle(formName, 'chkMustData', err);
            return false;
        };
    };
    
    function unHandler(div, action) {
        var headerId = '#' + $(div).attr('id');        
        $(headerId + 'grdData').unbind('rowdoubleclick');
        $(headerId + 'btnOK').unbind('click', btnOKClick);
        $(headerId + 'btnCancel').unbind('click');
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId +'grdData').unbind('rowdoubleclick');
            $(headerId + 'grdData').bind('rowdoubleclick', div, grdRowDobuleClick);
            $(headerId + 'btnOK').unbind('click', btnOKClick);
            $(headerId + 'btnOK').bind('click', div, btnOKClick);
            $(headerId + 'btnCancel').unbind('click');
            $(headerId + 'btnCancel').on('click', function () {
                $(options.container).csWindow('close');
            });
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        }
    };
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if ($(headerId + 'grdData').jqxGrid('getrows').length <= 0) {
            $(options.container).csWindow('close');
            return;
        };
        if (!options.canMutilChoose) {            
            var selectedrowindex = $(headerId + 'grdData').jqxGrid('selectedrowindex');
            if (selectedrowindex <= 0) { selectedrowindex = 0; };
            options.faciSeqNO = $(headerId + 'grdData').jqxGrid('getcellvalue', selectedrowindex, 'SEQNO');
            options.faciSNO = $(headerId + 'grdData').jqxGrid('getcellvalue', selectedrowindex, 'FACISNO');
            var row = chooseFaci.rows[selectedrowindex];
            options.faciData.rows.push(row);
            $(options.container).csWindow('close');
        } else {
            if (options.isQueryMVodID) {
                queryChooseMVodId(event.data, function () {
                    $(options.container).csWindow('close');
                });
            } else {
                var grdRows = $(headerId + 'grdData').jqxGrid('getrows');
                $.each(grdRows, function (index, value) {
                    if (value.CHOOSE) {
                        options.faciData.rows.push(chooseFaci.rows[index]);                        
                    };
                });
                $(options.container).csWindow('close');
            };
        };
    };
    function queryChooseMVodId(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var aryVodAccountId = [];
      
        var grdRows = $(headerId + 'grdData').jqxGrid('getrows');
        $.each(grdRows, function (index, value) {
            if (value.CHOOSE) {
                options.faciData.rows.push(chooseFaci.rows[index]);
                if (value['VodAccountId'.toUpperCase()] != null) {
                    aryVodAccountId.push(value['VodAccountId'.toUpperCase()]);
                };
            };
        });
       
        var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
            VodsAccountId: { type: 'string', value: aryVodAccountId.toString() }           
        });
        var params = getParameters(riadllName,
                  riaClassName,
                  'QueryMvodId',
                  JSON.stringify(parameters));
        getServerData(params, {
            success: function (data) {
                try {
                    if (!data.ResultBoolean) {
                        messageBox(data.ErrorMessage, messageType.critical);
                    } else {
                        options.MVodID = null;
                        if (data.ResultXML != '') {
                            options.MVodID = data.ResultXML;
                        } 
                    };
                    if ($.isFunction(action)) { action(); };
                } catch (err) {

                    errorHandle(formName, 'QueryMvodId-Server', err);
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
    function grdRowDobuleClick(event) {
       
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if (options.canMutilChoose) { return; };
        if ($(this).jqxGrid('disabled')) { return; };        
        options.faciSeqNO = $(this).jqxGrid('getcellvalue', event.args.rowindex, 'SEQNO');
        options.faciSNO = $(this).jqxGrid('getcellvalue', event.args.rowindex, 'FACISNO');
        var row = chooseFaci.rows[event.args.rowindex];
        options.faciData.rows.push(row);
        
        if (!options.canMutilChoose) {
            //clearfilters
            //this.removeEventListener('mousedown', grdRowDobuleClick);
            $(options.container).csWindow('close');
            //event.stopPropagation();
            //return;
        };
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            //unBindHandler(div);
            changeLanguage(div);
            renderControl(div);
            delete options.faciData;
            options.faciData = {};
            if (!chkMustData(div)) { return; };
            queryCanChooseFaci(div, function () {
                queryChooseFaci(div, function () {
                    gotoassignRow(div);
                    addHandler(div);
                });
            });         
        } catch (err) {
            errorHandle(formName, 'initData', err);
            
        } finally {
            if ($.isFunction(action)) { action(); };
        }
    };
    function NewRow(dataTable) {
        
    };
    function queryCanChooseFaci(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                aCustId: { type: 'integer', value: custId },
                aServiceType: { type: 'string', value: serviceType },
                IncludePR: { type: 'boolean', value: options.includePR },
                IncludeDVR: { type: 'boolean', value: options.includeDVR },
                IncludeFilter: { type: 'boolean', value: options.includeFilter },
                noRefNo: { type: 'string', value: options.noRefNo },
                AddRefNo: { type: 'string', value: options.addRefNo },
                InFaciCode: { type: 'string', value: inFaciCode }
            });
            var params = getParameters(riadllName,
                  riaClassName,
                  'QueryCanChooseFaci',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                        } else {
                            if (data.ResultXML != '') {
                                var d = JSON.parse(data.ResultXML);
                                delete chooseFaci;
                                chooseFaci = {};
                                
                                if (!$.isEmptyObject(options.customerTable)) {
                                    $.each(options.customerTable.rows, function (index, value) {                                        
                                        var newRow = {};
                                        $.each(d.Table.columns, function (i, col) {
                                            newRow[col.name] = null;
                                            if (value[col.name] != undefined) {
                                                if (value[col.name] != null) {
                                                    newRow[col.name] = value[col.name];
                                                };
                                            };                                            
                                        });                                        
                                        d.Table.rows.push(newRow);
                                        
                                    });
                                };
                                $.extend(true, chooseFaci, d.Table);
                                $.extend(true, options.faciData, d.Table);
                                
                                options.faciData.rows = [];
                                delete d;
                                d = null;
                                if ($.isFunction(action)) { action(); };
                            };
                        };
                    } catch (err) {

                        errorHandle(formName, 'QueryCanChooseFaci-Server', err);
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
            errorHandle(formName, 'queryCanChooseFaci', err);
        };
    };
    function gotoassignRow(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'grdData').jqxGrid('clear');
            if (chooseFaci.rows.length == 0) { return; };
            var copyChooseFaci = {};
            $.extend(true, copyChooseFaci, chooseFaci);
            if (options.canMutilChoose) {
                copyChooseFaci.columns.push({ name: 'CHOOSE', type: 'boolean' });                
                $.each(copyChooseFaci.rows, function (index, row) {
                    $.extend(true, copyChooseFaci.rows[index], { CHOOSE: false })
                })
                ///$.extend(true, copyChooseFaci.rows[0], { CHOOSE: false })
            };
            grdData.localdata = copyChooseFaci.rows;
            $(headerId + 'grdData').one('bindingcomplete', function (event) {
                $(this).jqxGrid({ selectedrowindex: 0 });
                if (!options.canMutilChoose) {
                    if (faciSeqNO != null) {
                        var grdRcdCount = $(this).jqxGrid('getrows').length;
                        for (i = 0; i < grdRcdCount; i++) {
                            if ($(this).jqxGrid('getcellvalue', i, "SEQNO") == faciSeqNO) {
                                $(this).jqxGrid({ selectedrowindex: i });
                                return;
                            };
                        };
                        return;
                    } else {
                        var grdRcdCount = $(this).jqxGrid('getrows').length;
                        for (i = 0; i <= grdRcdCount; i++) {
                            if ($(this).jqxGrid('getcellvalue', i, "FACISNO") == faciSNO) {
                                $(this).jqxGrid({ selectedrowindex: i });
                                return;
                            };
                        };
                        return;
                    };
                } else {
                    if (faciSeqNO != null) {
                        var faciAry = [];
                        faciAry = faciSeqNO.split(",");
                        $.each(faciAry, function (index, value) {
                            var grdRcdCount = $(headerId + 'grdData').jqxGrid('getrows').length;
                            for (i = 0; i < grdRcdCount; i++) {
                                if ($(headerId + 'grdData').jqxGrid('getcellvalue', i, "SEQNO") == value) {
                                    //$("#jqxGrid").jqxGrid('setcellvalue', 0, "firstname", "New Value");
                                    $(headerId + 'grdData').jqxGrid('setcellvalue', i, 'CHOOSE',true);                                    
                                };
                            };
                        })
                    };

                };
                
            });
            $(headerId + 'grdData').jqxGrid('updatebounddata');
        } catch (err) {
            errorHandle(formName, 'gotoassignRow', err);
        }
    };
    function queryChooseFaci(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            var ds = { ChooseFacility: {} };
            if ($.isEmptyObject(options.wipData)) { action(); return; };
            if (options.wipData['ChooseFacility'] == undefined) { action(); return; };
            if (options.wipData['ChooseFacility'].rows.length > 0) {
                $.extend(true, ds.ChooseFacility, wipData['ChooseFacility']);           
            };
            var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {               
                ServiceType: { type: 'string', value: serviceType },
                dsWipData : {type:'string',value:ds},
                IncludePR: { type: 'boolean', value: options.includePR },
                IncludeDVR: { type: 'boolean', value: options.includeDVR },
                IncludeFilter: { type: 'boolean', value: options.includeFilter }               
            });
            var params = getParameters(riadllName,
                riaClassName,
                'QueryChooseFaci',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                        } else {
                            if (data.ResultXML != '') {
                                var d = JSON.parse(data.ResultXML);
                                $.each(d.Table.rows, function (index, row) {
                                    chooseFaci.rows = $.grep(chooseFaci.rows, function (row2, idx) {
                                        return row2.SEQNO != row.SEQNO;
                                    });
                                    chooseFaci.rows.push(row);
                                });

                                delete d;
                                d = null;
                                if ($.isFunction(action)) { action(); };
                            };
                        };
                    } catch (err) {

                        errorHandle(formName, 'QueryChooseFaci-Server', err);
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
            errorHandle(formName, 'queryChooseFaci', err);
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
})(jQuery);