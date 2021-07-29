(function ($) {
    var formName = 'INV1110A';
    var riadllName = 'CableSoft.INV.RIA.CreateInvoice.Web.dll';
    var riaClassName = 'CableSoft.INV.RIA.CreateInvoice.Web.Invoice';
    var findClick = false;
    //var copyLoginInfo = {};     
    
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
        this.refNo = null;        
        this.containerIsWindow = true;
        this.grdChoiceInv = null;
        this.grdUsefulInv = null;
        this.scrQuery = {};
        this.copyLoginInfo = {}
    });
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        setTheme: function (jq, params, param2, params3) {
            return jq.each(function () {
                setTheme(this, params);
            });
        },
        localization: function (jq, params, param2, params3) {
            return parameter(jq[0], 'localization', params);
        },
        close: function (jq) {

            return jq.each(function () {
                formClosed(this);
            });
        },
        caculatePrice: function (jq, params, param2, params3) {
           return caculateSingelPrice(params);
            
        },

        destroy: function (jq) {
            return jq.each(function () {
                formDestroy(this);
            });
        },
        canView: function (jq, params, param2, params3) {
            return param2([true, null]);
        },
        canAppend: function (jq, params, param2, params3) {
            return param2([true, null]);
        },
        canEdit: function (jq, params, param2, params3) {
            return param2([true, null]);
            
            
            
        },
        canDelete: function (jq, params, param2, params3) {
            return param2([true, null]);
        },
        canPrint: function (jq, params, param2, params3) {
            return param2([true, null]);
        },

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
                            options: $.extend({}, new defaults(), new INV1110A(), options)
                        });
                        
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.INV1110A_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.INV1110A', err);
        }
    };
    
    function generateRow(o) {
        var ret = {};
        $.each(o.columns, function (i, v) {           
            ret[v.name] = null;
            ret[v.name] = v.name.toUpperCase() == 'IDENTIFYID1' ? '1':ret[v.name];
            ret[v.name] = v.name.toUpperCase() == 'IDENTIFYID2' ? 0:ret[v.name];
           
        })
        return ret;
    };
    function getConditionData(div,LogTime) {
        try {
            var options = $.data(div, formName).options;
            var table = getConditionStru();
            var lang = options.language;
            
            var row = {};

            //LogTime
            row["fieldName".toUpperCase()] = "LogTime_1";
            row["fieldValue".toUpperCase()] = LogTime;
            row["fieldDesc".toUpperCase()] = LogTime;
            row["headName".toUpperCase()] = row["fieldName".toUpperCase()] + "," + lang.ReportCondition1;
            table.condition.rows.push($.extend(true,{}, row));
           //CompCode
            row["fieldName".toUpperCase()] = "CompCode_1";
            row["fieldValue".toUpperCase()] = options.loginInfo.loginInfo.rows[0].compcode;
            row["fieldDesc".toUpperCase()] = options.loginInfo.loginInfo.rows[0].compcode;
            row["headName".toUpperCase()] = row["fieldName".toUpperCase()] + "," + lang.ReportCondition2;
            table.condition.rows.push($.extend(true,{}, row));
         
            return table;
        }
        catch (err) {
            errorHandle(formName, 'getConditionData', err);
        }
    }
    function printErrorData(div, LogTime, action) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).attr('id');

          
            options["conditionData"] = getConditionData(div,LogTime);
            var syspId = 'INV1110A3';
            printBydynamicReport(div, options, syspId, function () {
                if ($.isFunction(action)) {
                    action();
                };
            }, true);
           

        }
        catch (err) {
            errorHandle(formName, 'printErrorData', err);
        }
    }
    function chkCompSelected(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');

        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { Mid: { type: 'string', value: 'INV1110' } });

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
    function csCompCodeSelectChanged(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).csList('codeNo') == '') return;
        unHandler(event.data);
        var currentComp = options.copyLoginInfo.loginInfo.value.rows[0].compcode;
        options.copyLoginInfo.loginInfo.value.rows[0].compcode = $(this).csList('codeNo');
        options.loginInfo.loginInfo.rows[0].compcode = $(this).csList('codeNo');
        chkCompSelected(event.data, function (r) {
            if (r) {
                
                QueryAllData(event.data, function () {
                    $(headerId + 'txtStartInvDate,' + headerId + 'txtEndInvDate,' + headerId + 'txtInvDate').csDateTime('clear');
                    $(headerId + 'txtStartInvDate,' + headerId + 'txtEndInvDate,' + headerId + 'txtInvDate').csDateTime({ disabled: false });
                    $(headerId + 'grdChoiceInv,' + headerId + 'grdUsefulInv').jqxGrid('clear');
                    $(headerId + 'chkSameInvDate').jqxCheckBox({ checked: false });
                    $(headerId + 'csHowtoCreate').csList('codeNo', 2);
                    $(headerId + 'csCreateKind').csList('codeNo', 1);
                    $(headerId + 'invtab').jqxTabs('select', 0);
                    addHandler(event.data);
                });

                //$(this).csList('disabled', false);
            } else {
                options.copyLoginInfo.loginInfo.value.rows[0].compcode = currentComp;
                options.loginInfo.loginInfo.rows[0].compcode = currentComp;
                unHandler(event.data);
                                
                $(headerId + "csCompCode").csList('codeNo', currentComp);
                $(headerId + "csCompCode").csList('disabled', false);
                addHandler(event.data);
            };
        })


    };
    
    
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = $(div).prop('id');
        var d = $.Deferred();
        try {
            //-----------------------------------------------------------------------------            
            $('#' +headerId + "csCompCode").csList({
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
            $('#' + headerId + "csCompCode").csList('onlyDropDown', true);
            controls.push({ name: headerId + 'csCompCode', type: 'csList', level: 0 });
            //-----------------------------------------------------------------------------
           
            $('#' + headerId + 'invtab').csTabs({
                width: '99.7%',
                height: '99%',
                keyboardNavigation: false,
            });
            controls.push({ name: headerId + 'invtab', type: 'csTabs', level: 1 });

            $('#' + headerId + 'csCreateKind').csList({
                source: null,
                codeNoWidth: 40,
                width: '200px',
                height: '25px',
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false
            });
            controls.push({ name: headerId + 'csCreateKind', type: 'csList', level: 0 });

            $('#' + headerId + 'txtStartInvDate').csDateTime({
                height: 25,
                width: 150,
            });
            controls.push({ name: headerId + 'txtStartInvDate', type: 'csDateTime', level: 0 });

            $('#' + headerId + 'txtEndInvDate').csDateTime({
                height: 25,
                width: 150,
            });
            controls.push({ name: headerId + 'txtEndInvDate', type: 'csDateTime', level: 0 });


            $('#' + headerId+'csHowtoCreate').csList({
                source: null,
                codeNoWidth: 40,
                width: '200px',
                height: '25px',
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false
            });
            controls.push({ name: headerId + 'csHowtoCreate', type: 'csList', level: 0 });

            $('#' + headerId + 'txtInvDate').csDateTime({
                height: 25,
                width: 200,
            });
            controls.push({ name: headerId + 'txtInvDate', type: 'csDateTime', level: 0 });

            $('#' + headerId + 'chkSameInvDate').jqxCheckBox({                
                width: 200,
            });
            controls.push({ name: headerId + 'chkSameInvDate', type: 'jqxCheckBox', level: 0 });
           
          
            $('#' + headerId + 'btnQuery').jqxButton($.extend({}, imagePosition, {
                width: 80,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.query.imgSrc,
                disabled:false,
                height: 25
            }));
            controls.push({ name: headerId + 'btnQuery', type: 'jqxButton', level: 0 });


            $('#' + headerId + 'btnReset').jqxButton($.extend({}, imagePosition, {
                width: 80,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.sync.imgSrc,
                height: 25
            }));
            controls.push({ name: headerId + 'btnReset', type: 'jqxButton', level: 0 });

            $('#' + headerId+'btnExit').jqxButton($.extend({}, imagePosition, {
                width: 80,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.exit.imgSrc,
                height: 25
            }));
            controls.push({ name: headerId + 'btnExit', type: 'jqxButton', level: 0 });



            $('#' + headerId+'btnExcept').jqxButton({
                width: 40,
                height: 25
            });
            $('#' + headerId + 'btnExcept').hide();
            controls.push({ name: headerId + 'btnExcept', type: 'jqxButton', level: 0 });

            $('#' + headerId + 'btnNoExcept').jqxButton({
                width: 40,
                height: 25
            });
            $('#' + headerId + 'btnNoExcept').hide();
            controls.push({ name: headerId + 'btnNoExcept', type: 'jqxButton', level: 0 });


            $('#' + headerId+'btnCreate').jqxButton({
                width: 80,
                height: 25,
                disabled:true
            });
            controls.push({ name: headerId + 'btnCreate', type: 'jqxButton', level: 0 });
            $('#' + headerId+'btnReQuery').jqxButton({
                width: 80,
                height: 25
            });
            controls.push({ name: headerId + 'btnReQuery', type: 'jqxButton', level: 0 });

            //$('#' + headerId + 'btnOver').jqxButton($.extend({}, imagePosition, {
            //    width: 100,
            //    imgWidth: 20,
            //    imgHeight: 20,
            //    imgSrc: imageScr.exit.imgSrc,
            //    height: 25
            //}));
            $('#' + headerId + 'btnOver').jqxButton({
                width: 80,
                height: 25
            });
            controls.push({ name: headerId + 'btnOver', type: 'jqxButton', level: 0 });


            $('#' + headerId + 'csOrder').csList({
                source: null,
                codeNoWidth: 40,
                width: '300px',
                height: '25px',
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false
            });
            controls.push({ name: headerId + 'csOrder', type: 'csList', level: 0 });

            options.grdUsefulInv = {
                datatype: "json",
                datafields: [
                  { name: 'IDENTIFYID1', type: 'string' },
                  { name: 'IDENTIFYID2'.toUpperCase(), type: 'integer' },
                  { name: 'COMPID'.toUpperCase(), type: 'string' },
                  { name: 'MEMO'.toUpperCase(), type: 'string' },
                  { name: 'STARTNUM'.toUpperCase(), type: 'string' },
                  { name: 'PREFIX', type: 'string' },
                  { name: 'LASTINVDATE', type: 'string' },
                  { name: 'YEARMONTH', type: 'string' },
                  { name: 'CURNUM', type: 'string' },
                  { name: 'MEMO', type: 'string' },
                  { name: 'UPLOADFLAG', type: 'string' },
                  { name: 'ENDNUM',type:'string' },
                  ],
            };
            options.grdChoiceInv = {
                datatype: "json",
                datafields: [
                 { name: 'IDENTIFYID1', type: 'string' },
                 { name: 'IDENTIFYID2'.toUpperCase(), type: 'integer' },
                 { name: 'COMPID'.toUpperCase(), type: 'string' },
                 { name: 'MEMO'.toUpperCase(), type: 'string' },
                 { name: 'STARTNUM'.toUpperCase(), type: 'string' },
                 { name: 'PREFIX', type: 'string' },
                 { name: 'LASTINVDATE', type: 'string' },
                 { name: 'YEARMONTH', type: 'string' },
                 { name: 'CURNUM', type: 'string' },
                 { name: 'MEMO', type: 'string' },
                 { name: 'UPLOADFLAG', type: 'string' },
                 { name: 'ENDNUM', type: 'string' },
                ],
            };
            var dataAdapter1 = new $.jqx.dataAdapter(options.grdUsefulInv);
            var dataAdapter2 = new $.jqx.dataAdapter(options.grdChoiceInv);
            $("#" + headerId+ "grdUsefulInv").jqxGrid({
                width: '100%',
                height: '94%',
                //height: $("#" + headId + "partBUI").height() -35,
                source: dataAdapter1,
                sortable: true,
                altrows: true,
                columnsresize: true,
                //selectionmode: 'checkbox',
                columns: [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 30,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                        }
                    },
                    { text: lang.colPREFIX, datafield: 'PREFIX', width: 50 },
                    { text: lang.colLASTINVDATE, datafield: 'LASTINVDATE', width: 100, },
                    { text: lang.colCURNUM, datafield: 'CURNUM', width: 100 },
                    { text: lang.colMEMO, datafield: 'MEMO', width: 150 },
                    { text: lang.colUPLOADFLAG, datafield: 'UPLOADFLAG', width: 80 },
                    { text: lang.colYEARMONTH, datafield: 'YEARMONTH', width: 100, hidden: true },
                    { text: lang.colINVFORMATDESC, datafield: 'INVFORMATDESC', width: 80, hidden: true },
                                      
                    { text: lang.colSTARTNUM, datafield: 'STARTNUM', width: 80, hidden: true },
                    { text: lang.colENDNUM, datafield: 'ENDNUM', width: 80, hidden: true },
                    
                                       
                    

                    
                ],
                localization: options.localization
            });
            controls.push({ name: headerId + 'grdUsefulInv', type: 'jqxGrid', level: 0 });
            
            $("#" + headerId + "grdChoiceInv").jqxGrid({
                width: '100%',
                height: '94%',
                source: dataAdapter2,
                sortable: true,
                altrows: true,
                columnsresize: true,
                //selectionmode: 'checkbox',
                columns: [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: 'ORDER', columntype: 'number', width: 30,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                        }
                    },
                    { text: lang.colPREFIX, datafield: 'PREFIX', width: 50 },
                    { text: lang.colLASTINVDATE, datafield: 'LASTINVDATE', width: 100 },
                    { text: lang.colCURNUM, datafield: 'CURNUM', width: 100 },
                    { text: lang.colMEMO, datafield: 'MEMO', width: 150 },
                    { text: lang.colUPLOADFLAG, datafield: 'UPLOADFLAG', width: 80, hidden: true },
                    { text: lang.colYEARMONTH, datafield: 'YEARMONTH', width: 100, hidden: true },
                    { text: lang.colINVFORMATDESC, datafield: 'INVFORMATDESC', width: 80, hidden: true },

                    { text: lang.colSTARTNUM, datafield: 'STARTNUM', width: 80, hidden: true },
                    { text: lang.colENDNUM, datafield: 'ENDNUM', width: 80, hidden: true },

                ],
                localization: options.localization
            });
            controls.push({ name: headerId + 'grdChoiceInv', type: 'jqxGrid', level: 0 });
            return d.resolve(div);
        } catch (err) {
            
            errorHandle(formName, 'renderControl', err);
            return d.reject('renderControl')
        }
        
        
    };
    function formDestroy(div) {
        

            var options = $.data(div, formName).options;
            var headId = $(div).attr('id');
            try {
           
                var controls = $.data(div, formName).options.controls;
                unHandler(div);
                $(div).find('*').off();
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
    
    
    function chkInvNo(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        
        try {
            var aMonth, aYear,aDate;
            aMonth = $(headerId + 'txtInvDate').csDateTime('getDate').getMonth() + 1;
            aYear = $(headerId + 'txtInvDate').csDateTime('getDate').getFullYear();
            aDate = $(headerId + 'txtInvDate').csDateTime('getText');
            if (aMonth % 2 == 0) {
                aMonth = aMonth - 1
            };
            var yyyymm = null;
            if (aMonth < 10) {
                yyyymm = (aYear + '') + '0' + ( aMonth +'')
            } else {
                yyyymm = (aYear + '') + (aMonth + '');
            }
            if (options.editMode == editMode.append) {
                if (options.choiceyearmonth) {
                    if (options.choiceyearmonth != yyyymm) {
                        $(headerId + 'txtInvNo').val('');
                        $(headerId + 'txtInvFormat').val('');
                        $(headerId + 'txtMainInvNo').val('');
                        options.choiceyearmonth = null;
                        options.lastinvdate = null;
                        return false;
                    } else {
                        if (Date.parse(aDate) < Date.parse(options.lastinvdate)) {
                            messageBox(lang.inv099LastDateErr, messageType.critical, null,
                               function () {
                                   //$('#' + headerId + 'txtInvDate').csDateTime('focus')
                               });
                        }
                    }
                };
            } else {

            }
            
            return true;
        } catch (err) {
            errorHandle(formName, 'chkInvNo', err);
        } finally {
            aDate = null;
        }
    }
    
    
    
    
    
    
    function unHandler(div, action) {
        var headerId =  $(div).attr('id');
        $('#' + headerId + 'txtStartInvDate,#' + headerId + 'txtEndInvDate,#' + headerId + 'txtInvDate').off('blur');
        $('#' + headerId + 'csHowtoCreate').off('selectedIndexChanged');
        $('#' + headerId + 'chkSameInvDate').off('change');
        $("#" + headerId + "grdUsefulInv").off('rowdoubleclick');
        $('#' + headerId + 'csCreateKind').off('selectedIndexChanged');
        $('#' + headerId + 'btnReset').off('click');
        $('#' + headerId + 'btnQuery').off('click');
        $('#' + headerId + 'btnExcept').off('click');
        $('#' + headerId + 'btnNoExcept').off('click');
        $('#' + headerId + 'btnReQuery').off('click');
        $('#' + headerId + 'btnExit,#' + headerId + 'btnOver').off('click');
        $('#' +headerId + 'csCompCode').off('selectedIndexChanged');
    };
    
    function getCorrectYearMonth(aDate) {
        if (isDate(aDate)) {
            var o =(aDate.getMonth() + 1).toString().length == 1 ? '0' + (aDate.getMonth() + 1).toString() : (aDate.getMonth() + 1).toString();
            aDate = aDate.getFullYear() + '' + o;
        };
        var result = aDate.replaceAll('/', '');
        var month = null;
        result = result.substr(0, 6);
        if (parseInt(result.substr(4, 2)) % 2 == 0) {
            month = (parseInt(result.substr(4, 2)) - 1).toString().length == 1 ? '0' + (parseInt(result.substr(4, 2)) - 1).toString() : (parseInt(result.substr(4, 2)) - 1).toString();
            result = result.substr(0, 4) + month;
        };
        return result;
    };
    function txtDateBlur(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var lang = options.language;
        var month = null;
        if ($(headerId + 'txtStartInvDate').csDateTime('getDate') && $(headerId + 'txtEndInvDate').csDateTime('getDate')) {
            //var yearmonth1 = $(headerId + 'txtStartInvDate').csDateTime('getText').replaceAll('/', '');
            //var yearmonth2 = $(headerId + 'txtEndInvDate').csDateTime('getText').replaceAll('/', '');
            //yearmonth1 = yearmonth1.substr(0,6);
            //yearmonth2 = yearmonth2.substr(0,6);
            var yearmonth1 = getCorrectYearMonth($(headerId + 'txtStartInvDate').csDateTime('getText'));
            var yearmonth2 = getCorrectYearMonth($(headerId + 'txtEndInvDate').csDateTime('getText'));
            //if (parseInt(yearmonth1.substr(4, 2)) % 2 == 0) {
            //    month = (parseInt(yearmonth1.substr(4, 2)) - 1).toString().length == 1 ? '0' + (parseInt(yearmonth1.substr(4, 2)) - 1).toString() : (parseInt(yearmonth1.substr(4, 2)) - 1).toString();
            //    yearmonth1 = yearmonth1.substr(0, 4) + month ;
            //};
            //if (parseInt(yearmonth2.substr(4, 2)) % 2 == 0) {
            //    month = (parseInt(yearmonth2.substr(4, 2)) - 1).toString().length == 1 ? '0' + (parseInt(yearmonth2.substr(4, 2)) - 1).toString() : (parseInt(yearmonth2.substr(4, 2)) - 1).toString();
            //    yearmonth2 = yearmonth2.substr(0, 4) + month ;
            //};
            if (yearmonth1 != yearmonth2) {
                $(headerId + 'txtEndInvDate').csDateTime('clear');
                messageBox(lang.plsDateCorrect, messageType.critical, null,
                    function () {
                        $(headerId + 'txtEndInvDate').csDateTime('focus')
                    });
            };
            //var invDate = $(headerId + 'txtInvDate').csDateTime('getText');
            if ($(headerId + 'txtStartInvDate').csDateTime('getDate') && $(headerId + 'txtEndInvDate').csDateTime('getDate')) {
                if ($(headerId + 'txtInvDate').csDateTime('getDate') || $(headerId + 'chkSameInvDate').jqxCheckBox('checked')) {
                    getInv099Value(div);
                };
            };
        };
    };
    function getInv099Value(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var lang = options.language;
        var InvoiceKind = 2;
        var yearmonth;
        var month;
        var rows = [];
        //$(headerId + 'invtab').csTabs({ disabled: true });
        //$("#test *").attr("disabled", "disabled").off('click');
        //$(headerId + "Create1").attr('disabled', true);
        try {
            $(headerId + 'grdUsefulInv').jqxGrid('clear');
            $(headerId + 'grdChoiceInv').jqxGrid('clear');
            $(headerId + 'btnCreate').jqxButton({ disabled: true });
            if (!(canQuery(div))) { return; };
            //if (!$(headerId + 'txtStartInvDate').csDateTime('getDate')) {
            //    messageBox(lang.plsChargeDate, messageType.critical, null,
            //                       function () {
            //                           $(headerId + 'txtStartInvDate').csDateTime('focus')
            //                       });
            //    return;
            //};
            //if (!$(headerId + 'txtEndInvDate').csDateTime('getDate')) {
            //    messageBox(lang.plsChargeDate, messageType.critical, null,
            //                       function () {
            //                           $(headerId + 'txtEndInvDate').csDateTime('focus')
            //                       });
            //    return;
            //};
            //if (!$(headerId + 'chkSameInvDate').jqxCheckBox('checked')) {
            //    if (!$(headerId + 'txtInvDate').csDateTime('getDate')) {
            //        messageBox(lang.plsInvDate, messageType.critical, null,
            //                      function () {
            //                          $(headerId + 'txtInvDate').csDateTime('focus')
            //                      });
            //        return;
            //    };
            //};
            switch ($(headerId + 'csCreateKind').csList('codeNo')) {
                case '1': InvoiceKind = 2; break;
                case '2': InvoiceKind = 0; break;
                case '3': InvoiceKind = 1; break;
            };
            if (InvoiceKind == 2) {
                if (options.initData.INV001.rows[0]['StartAllUpload'.toUpperCase()] == 1) {
                    InvoiceKind = 1;
                };
            };
            var data = $.extend(true, {}, options.initData.INV099);
            if (InvoiceKind != 2) {

                rows = data.rows.filter(function (v) {
                    // return  v.UPLOADFLAG == InvoiceKind == 1 ? '是' : '否';
                    if (InvoiceKind == 0) {
                        return v.UPLOADFLAG == lang.UPLOADFLAGNo;
                    } else {
                        return v.UPLOADFLAG == lang.UPLOADFLAGYes;
                    };

                });
                data.rows.length = 0;
                data.rows = rows;
            };
            if ($(headerId + 'chkSameInvDate').jqxCheckBox('checked')) {
                yearmonth = $(headerId + 'txtStartInvDate').csDateTime('getText').replaceAll('/', '');
            } else {
                yearmonth = $(headerId + 'txtInvDate').csDateTime('getText').replaceAll('/', '');
            };
            yearmonth = yearmonth.substr(0, 6);
            if (parseInt(yearmonth.substr(4, 2)) % 2 == 0) {
                month = (parseInt(yearmonth.substr(4, 2)) - 1).toString().length == 1 ? '0' + (parseInt(yearmonth.substr(4, 2)) - 1).toString() : (parseInt(yearmonth.substr(4, 2)) - 1).toString();
                yearmonth = yearmonth.substr(0, 4) + month;
            };
            rows = data.rows.filter(function (v) {

                return v['YearMonth'.toUpperCase()] == yearmonth;

            });
            data.rows.length = 0;
            data.rows = rows;
            refreshGrdUsefulInv(div, data);
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        };

      
        
    };
    function canQuery(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var lang = options.language;
        try {
            if (!$(headerId + 'txtStartInvDate').csDateTime('getDate')) {
                messageBox(lang.plsChargeDate, messageType.critical, null,
                                   function () {
                                       $(headerId + 'txtStartInvDate').csDateTime('focus')
                                   });
                return;
            };
            if (!$(headerId + 'txtEndInvDate').csDateTime('getDate')) {
                messageBox(lang.plsChargeDate, messageType.critical, null,
                                   function () {
                                       $(headerId + 'txtEndInvDate').csDateTime('focus')
                                   });
                return;
            };
            if (!$(headerId + 'chkSameInvDate').jqxCheckBox('checked')) {
                if (!$(headerId + 'txtInvDate').csDateTime('getDate')) {
                    messageBox(lang.plsInvDate, messageType.critical, null,
                                  function () {
                                      $(headerId + 'txtInvDate').csDateTime('focus')
                                  });
                    return;
                };
            };

            if (!$(headerId + 'csCreateKind').csList('codeNo')) {
                messageBox(lang.MustinvCreateKind, messageType.critical, null,
                                   function () {
                                       $(headerId + 'csCreateKind').csList('focus')
                                   });
                return;
            };
            if (!$(headerId + 'csHowtoCreate').csList('codeNo')) {
                messageBox(lang.MustHowtoCreate, messageType.critical, null,
                                   function () {
                                       $(headerId + 'csHowtoCreate').csList('focus')
                                   });
                return;
            };
            return true;
        } catch (err) {
            errorHandle(formName, 'canQuery', err);
        } finally {

        };
    };
    function showInfo(div,dataType, action) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var width = 940;
            var height = 500;
            width = $(div).width();
            height = $(div).height()
            if (width > $(div).width()) width = $(div).width();
            if (height > $(div).height()) height = $(div).height();
            var x = ($(options.container).width() - width) / 2;
            var y = ($(options.container).height() - height) / 2;
            var x = $(div)[0].offsetLeft;
            var y = $(div)[0].offsetTop;
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),

                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };
            var caption = dataType === 1 ? options.language.showInfo1 : options.language.showInfo2;

            var win = createcsWindow(options.container, caption, winOptions);
            $('#' + win.windowId).one('close', function () {
                var r = $.extend(true, {}, $.data($('#' + win.contentId)[0]).INV1110A2.options);
                $('#' + win.contentId)['INV1110A2']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                if (typeof action == 'function') {
                    action(r);
                }

                // if ($.isFunction(action)) { action(); };
            });
            var cloneDs = $.extend(true, {}, options.scrQuery);
            //options.scrQuery.CONDITION.rows[0].ORDERNUM = $(headerId + 'csOrder').csList('codeNo');
            $('#' + win.contentId)['INV1110A2']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                scrQuery: cloneDs,
                dataType:dataType || 1,
                theme: options.theme,
                localization: options.localization
            });
          
        }
        catch (err) {
            errorHandle(formName, 'ShowINV099', err);
        }
    };
    function showCurrency(num) {
        if (num == null) { return null; };
       return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    function QueryCanCreateInv(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var aHowToCreate = $(headerId + 'csHowtoCreate').csList('codeNo') + '';
        var aInvDate = $(headerId + 'txtStartInvDate').csDateTime('getDate');
        var aInvYearMonth = null;
        var aInvoiceKind = 2;
        var aEndDate = $(headerId + 'txtEndInvDate').csDateTime('getDate');
        var aStartDate = $(headerId + 'txtStartInvDate').csDateTime('getDate');
        var aMaxInvDate = null;
        var loginInfo = getParaLoginInfo(div, formName);
        try {
            if (!$(headerId + 'chkSameInvDate').jqxCheckBox('checked')) {
                aInvDate = $(headerId + 'txtInvDate').csDateTime('getDate');
            };
            aInvYearMonth = getCorrectYearMonth(aInvDate);
            aMaxInvDate = new Date(Math.max(...$(headerId + 'grdChoiceInv').jqxGrid('getrows').map(v=>Date.parse(v['LastInvDate'.toUpperCase()]|| '1911/01/01'))));
            switch ($(headerId + 'csCreateKind').csList('codeNo')) {
                case '1':aInvoiceKind = 2;break;
                case '2': aInvoiceKind = 0; break;
                case '3': aInvoiceKind = 1; break;
            };
            
            var ds = {
                CONDITION: {
                    columns: [{ name: 'INVOICEKIND', type: 'integer' },
                        { name: 'INVSTARTDATE', type: 'date' },
                        { name: 'INVENDDATE'.toUpperCase(), type: 'date' },
                        { name: 'INVDATE'.toUpperCase(), type: 'date' },
                        { name: 'HOWTOCREATE'.toUpperCase(), type: 'string' },
                        { name: 'ORDERNUM'.toUpperCase(), type: 'integer' },
                        { name: 'SAMEINVDATE'.toUpperCase(), type: 'integer' },
                        { name: 'YEARMONTH', type: 'string' },

                        
                    ],
                    rows: [{
                        INVOICEKIND:aInvoiceKind,
                        INVSTARTDATE: aStartDate,
                        INVENDDATE: aEndDate,
                        INVDATE:$(headerId + 'txtInvDate').csDateTime('getDate') || null,
                        HOWTOCREATE:aHowToCreate,
                        ORDERNUM: 3,
                        SAMEINVDATE: $(headerId + 'chkSameInvDate').jqxCheckBox('checked') ? 1 : 2,
                        YEARMONTH:aInvYearMonth,
                    }],
                },
                INVSELECTED: $.extend(true, {},options.initData.INV099)
                    
            };
            ds.INVSELECTED.rows.length = 0;
            var grdrows = $(headerId + 'grdChoiceInv').jqxGrid('getrows');
            var len = grdrows.length;
            for (var i = 0; i < len ; i++) {
                var row = generateRow(options.initData.INV099);
                for (prop in row) {
                    row[prop] = grdrows[i][prop] || null;
                };
                ds.INVSELECTED.rows.push(row);
            };
            options.scrQuery = ds;
            var parameters = $.extend({}, loginInfo,
                    { ds: { type: 'string', value: ds } } );


            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryCanCreateInv',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            // replace(/\d(?=(\d{3})+\.)/g, "$&,");
                            $(headerId + 'txtInvCount').text(showCurrency( tmp.RESULT.rows[0].EXCEPTCOUNT || 0));
                            $(headerId + 'txtNoInvCount').text(showCurrency( tmp.RESULT.rows[0].NOCOUNT || null));
                            $(headerId + 'txtSaleAmount').text(showCurrency( tmp.RESULT.rows[0].SALEAMOUNT1 || 0));
                            $(headerId + 'txtNoSaleAmount').text(showCurrency( tmp.RESULT.rows[0].SALEAMOUNT2 || null));
                            
                            $(headerId + 'txtTaxAmount').text(showCurrency( tmp.RESULT.rows[0].TAXAMOUNT1 || 0));
                            $(headerId + 'txtNoTaxAmount').text(showCurrency( tmp.RESULT.rows[0].TAXAMOUNT2 || null));

                            $(headerId + 'txtInvAmount').text((showCurrency( tmp.RESULT.rows[0].INVAMOUNT1 || 0)));
                            $(headerId + 'txtNoInvAmount').text(showCurrency( tmp.RESULT.rows[0].INVAMOUNT2 || null));

                            $(headerId + 'txtValidCounts').text(showCurrency(tmp.RESULT.rows[0].AVAILABLECOUNT || 0));

                            $(headerId + 'txtExecuteEn').text(options.loginInfo.loginInfo.rows[0].entryname);
                            //QueryResult1: '公司簡稱: {0}  ({1})'
                            var txtQuery1 = options.language.QueryResult1.replace('{0}', options.initData.INV001.rows[0].COMPID);
                            txtQuery1 = txtQuery1.replace('{1}', options.initData.INV001.rows[0]['CompSName'.toUpperCase()]);
                            var txtQuery3 = options.language.QueryResult3.replace('{0}', $(headerId + 'txtStartInvDate').csDateTime('getText'));
                            txtQuery3 = txtQuery3.replace('{1}', $(headerId + 'txtEndInvDate').csDateTime('getText'));
                            var txtQuery2 = null;
                            if ($(headerId + 'txtInvDate').csDateTime('getText')) {
                                txtQuery2 = options.language.QueryResult2.replace('{0}', $(headerId + 'txtInvDate').csDateTime('getText'))
                            };
                            $(headerId + 'txtQuery1').text(txtQuery1);
                            $(headerId + 'txtQuery2').text(txtQuery2);
                            $(headerId + 'txtQuery3').text(txtQuery3);
                            if ((tmp.RESULT.rows[0].EXCEPTCOUNT || 0) === 0) {
                                $(headerId + 'btnExcept').hide();
                            } else { $(headerId + 'btnExcept').show(); }
                            if ((tmp.RESULT.rows[0].NOCOUNT || 0) === 0) {
                                $(headerId + 'btnNoExcept').hide();
                            } else { $(headerId + 'btnNoExcept').show(); }
                            if (tmp.RESULT.rows[0].ERRMSG) {
                                messageBox(tmp.RESULT.rows[0].ERRMSG, messageType.critical);
                            } else {
                                $(headerId + 'invtab').jqxTabs('select', 1);
                                $(headerId + 'btnCreate').jqxButton({ disabled: false });
                            };

                            
                            //$('#div21txtInvCount').text(11);
                            
                            //setCsInvUseId(div);



                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            // return d.reject('QueryCanCreateInv')
                            //changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryCanCreateInv-Server', err);
                        // return d.reject('QueryCanCreateInv')
                        //changeMode(div, options.editMode);
                    } finally {
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };

                }
            });

            
        } catch (err) {
            errorHandle(formName, 'QueryCanCreateInv', err);
        } finally {

        }
    };
    function btnQueryClick(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        
        if ($(headerId + 'btnQuery').jqxButton('disabled')) { return; };
        if (!canQuery(div)) { return; };
        if ($(headerId + 'grdChoiceInv').jqxGrid('getrows').length == 0) {
            messageBox(options.language.mustInvPrefix, messageType.critical, null,
                                   function () {
                                       //$(headerId + 'txtStartInvDate').csDateTime('focus')
                                   });
            return;
        };
        QueryCanCreateInv(div);
    };
    function getPreFixString(headerId) {
        var rows = $(headerId + 'grdChoiceInv').jqxGrid('getrows');
        var len = rows.length;
        var result = null;
        for (var i = 0; i <= len - 1; i++) {
            result = result == null ? rows[i]['Prefix'.toUpperCase()] + rows[i]['StartNum'.toUpperCase()] : result + ',' + rows[i]['Prefix'.toUpperCase()] + rows[i]['StartNum'.toUpperCase()];
        };
        return result;
    };
    function execute(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var lang = options.language;
        var cloneDs = $.extend(true, {}, options.scrQuery);
        var loginInfo = getParaLoginInfo(div, formName);
        $( headerId + 'invtab').jqxTabs('select', 2);
        cloneDs.CONDITION.rows[0].ORDERNUM = parseInt($(headerId + 'csOrder').csList('codeNo')) - 1;
        var parameters = $.extend({}, loginInfo,
                  { ds: { type: 'string', value: cloneDs } });


        var params = getParameters(riadllName,
               riaClassName,
               'Execute',
               JSON.stringify(parameters));
        getServerData(params, {
            success: function (data) {
                try {
                    if (data.ErrorCode == 0) {
                        if (data.ResultXML) {
                            var tmp = JSON.parse(data.ResultXML);
                            $(headerId + 'txtSaleAmount3').text(showCurrency(tmp.ALLDATA.rows[0]['SALEAMOUNT'] || 0));
                            $(headerId + 'txtTaxAmount3').text(showCurrency(tmp.ALLDATA.rows[0]['TAXAMOUNT'] || 0));
                            $(headerId + 'txtInvAmount3').text(showCurrency(tmp.ALLDATA.rows[0]['INVAMOUNT'] || 0));
                            $(headerId + 'txtAssignInvCount').text(showCurrency(tmp.ALLDATA.rows[0]['TOTAL'] || 0));
                            $(headerId + 'txtStartInvID').text(tmp.USEINV.rows[0].MININV || '');
                            $(headerId + 'txtStopInvID').text(tmp.USEINV.rows[0].MAXINV || '');
                            $(headerId + 'lblCreateResult').text(data.Message || '');
                            if (tmp.NONEELECTRIC) {
                                $(headerId + 'txtKind1SaleAmount').text(showCurrency(tmp.NONEELECTRIC.rows[0]['SALEAMOUNT'] || 0));
                                $(headerId + 'txtKind1TaxAmount').text(showCurrency(tmp.NONEELECTRIC.rows[0]['TAXAMOUNT'] || 0));
                                $(headerId + 'txtKind1InvAmount').text(showCurrency(tmp.NONEELECTRIC.rows[0]['INVAMOUNT'] || 0));
                                $(headerId + 'txtKind1CreateCount').text(showCurrency(tmp.NONEELECTRIC.rows[0]['TOTAL'] || 0));
                            };
                            if (tmp.ELECTRIC) {
                                $(headerId + 'txtKind2SaleAmount').text(showCurrency(tmp.ELECTRIC.rows[0]['SALEAMOUNT'] || 0));
                                $(headerId + 'txtKind2TaxAmount').text(showCurrency(tmp.ELECTRIC.rows[0]['TAXAMOUNT'] || 0));
                                $(headerId + 'txtKind2InvAmount').text(showCurrency(tmp.ELECTRIC.rows[0]['INVAMOUNT'] || 0));
                                $(headerId + 'txtKind2CreateCount').text(showCurrency(tmp.ELECTRIC.rows[0]['TOTAL'] || 0));
                            };
                            if (tmp.UNUSUAL) {
                                if (tmp.UNUSUAL.rows[0].LOGTIME) {
                                    printErrorData(div, formatDateTime(tmp.UNUSUAL.rows[0].LOGTIME,'yyyymmddhhmmss'), function () {
                                        $(headerId + 'invtab').jqxTabs('select', 2);
                                    });
                                };
                            };
                            
                            
                        };
                        

                    }
                    else {
                        messageBox(data.ErrorMessage, messageType.critical);
                        
                    }
                } catch (err) {
                    errorHandle(formName, 'Execute-Server', err);
                    
                } finally {
                    params = null;
                    parameters = null;
                    data = null;
                    delete data;
                    delete parameters;
                    delete param;
                };

            }
        },7200);
    };
    function BatchCreate(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var lang = options.language;
        //var cloneDs = $.extend(true, {}, options.scrQuery);
        //cloneDs.CONDITION.rows[0].ORDERNUM = parseInt($(headerId + 'csOrder').csList('codeNo')) - 1;
        try {
            messageBox(lang.readyCreateInv + getPreFixString(headerId), messageType.yesno, null, function (flag) {
                if (flag == 'yes') {
                    execute(div);
                    //detailDelClick.apply($(options.dynGridId), [headerId]);
                } else {

                };
            });
           
        } catch (err) {
            errorHandle(formName, 'BatchCreate', err);
        } finally {

        };
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = $(div).attr('id');
        var lang = options.language;
        var d = $.Deferred();
        
        try {
            $('#' + headerId + 'btnExit,#' + headerId + 'btnOver').off('click');
            $('#' + headerId + 'btnExit,#' + headerId + 'btnOver').on('click', () =>$(options.container).csWindow('close'));
            $('#' +headerId + 'csCompCode').off('selectedIndexChanged');
            $('#' + headerId + 'csCompCode').on('selectedIndexChanged', div, csCompCodeSelectChanged);
            $('#' + headerId + 'btnCreate').off('click');
            $('#' + headerId + 'btnCreate').on('click', function (e) {
                if ($(this).jqxButton('disabled')) { return; };
                BatchCreate(div);
            });
            $('#' + headerId + 'btnReQuery').off('click');
            $('#' + headerId + 'btnReQuery').on('click',function (e) {
                if ($(this).jqxButton('disabled')) { return; };
                $('#' +headerId + 'invtab').jqxTabs('select', 0);
            });
            $('#' + headerId + 'btnNoExcept').off('click');
            $('#' + headerId + 'btnNoExcept').on('click', () => {
                if ($(this).jqxButton('disabled')) { return; };
                showInfo(div, 2);
            });
            
            $('#' + headerId + 'btnExcept').off('click');
            $('#' + headerId + 'btnExcept').on('click', () => {
                if ($(this).jqxButton('disabled')) { return; };
                showInfo(div,1);
            });
            $('#' + headerId + 'btnQuery').off('click');
            
            $('#' + headerId + 'btnQuery').on('click', () => btnQueryClick.apply(this, [div]));
            $('#' + headerId + 'btnReset').off('click');
            $('#' + headerId + 'btnReset').on('click', function () {
                unHandler(div);
                $('#' + headerId + 'txtStartInvDate,#' + headerId + 'txtEndInvDate,#' + headerId + 'txtInvDate').csDateTime('clear');
                $('#' + headerId + 'txtStartInvDate,#' + headerId + 'txtEndInvDate,#' + headerId + 'txtInvDate').csDateTime({ disabled: false });
                $('#' + headerId + 'grdChoiceInv,#' + headerId + 'grdUsefulInv').jqxGrid('clear');
                $('#' + headerId + 'chkSameInvDate').jqxCheckBox({ checked: false });
                $('#' + headerId + 'csHowtoCreate').csList('codeNo', 2);
                $('#' + headerId + 'csCreateKind').csList('codeNo', 1);

                 
                addHandler(div);
            });
            $('#' + headerId + 'txtStartInvDate,#' + headerId + 'txtEndInvDate,#' + headerId + 'txtInvDate').off('blur');
            
            $('#' + headerId + 'txtStartInvDate,#' + headerId + 'txtEndInvDate,#' + headerId + 'txtInvDate').on('blur', function (e) {
                if ($(this).csDateTime('getText') == null) { return; };
                if (!Date.parse($(this).csDateTime('getDate'))) {
                    $(this).csDateTime('clear');
                    $(this).csDateTime('focus');
                    return;
                };
                txtDateBlur.apply(this, [div]);
            });
            $('#' + headerId + 'csCreateKind').off('selectedIndexChanged');
            $('#' + headerId + 'csCreateKind').on('selectedIndexChanged',()=> txtDateBlur.apply(this, [div]));
            $('#' + headerId + 'csHowtoCreate').off('selectedIndexChanged');
            $('#' + headerId + 'csHowtoCreate').on('selectedIndexChanged', function (e) {
                unHandler(div);
                if ($(this).csList('codeNo') == 1) {
                    $('#' + headerId + 'chkSameInvDate').jqxCheckBox({ checked: false });
                    $('#' + headerId + 'chkSameInvDate').jqxCheckBox({ disabled: true });
                } else {
                    $('#' + headerId + 'chkSameInvDate').jqxCheckBox({ disabled: false });
                };
                $('#' + headerId + 'txtInvDate').csDateTime({ disabled: false });
               // if ($('#' + headerId + 'chkSameInvDate').jqxCheckBox('disabled')) {

                //};
                txtDateBlur.apply(this, [div]);
                addHandler(div);
            });
            $('#' + headerId + 'chkSameInvDate').off('change');
            $('#' + headerId + 'chkSameInvDate').on('change', function () {
                if ($(this).jqxCheckBox('checked')) {
                    $('#' + headerId + 'txtInvDate').csDateTime({ disabled: true });
                    $('#' + headerId + 'txtInvDate').csDateTime('clear');
                    if (!$('#' + headerId + 'txtStartInvDate').csDateTime('getDate')) {
                        messageBox(lang.plsChargeDate, messageType.critical, null,
                                function () {
                                    $('#' +headerId + 'txtStartInvDate').csDateTime('focus')
                            });
                        return;
                    };
                    if (!$('#' + headerId + 'txtEndInvDate').csDateTime('getDate')) {
                        messageBox(lang.plsChargeDate, messageType.critical, null,
                                function () {
                                    $('#' + headerId + 'txtEndInvDate').csDateTime('focus')
                                });
                        return;
                    };
                    getInv099Value(div);
                } else {
                    $('#' + headerId + 'txtInvDate').csDateTime({ disabled: false });
                    getInv099Value(div);
                };
            });
            $("#" + headerId + "grdUsefulInv").off('rowdoubleclick');
            $("#" + headerId + "grdUsefulInv").on('rowdoubleclick', function (e) {              
                refreshGrdChoiceInv(div, e.args.row.bounddata);                              
            });
          
          
            
            
            return d.resolve(div)
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
            return d.reject('addHandler');
        } finally {

        }
    };
    
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            //copyLoginInfo = getParaLoginInfo(div, formName);
            options.copyLoginInfo = getParaLoginInfo(div, formName);
            try {
                var options = $.data(div, formName).options;
                loadForm(options,
                    'INV1000\\' + formName + '.html',
                    function (msg) {
                        try {
                            $(div).html(msg);
                            changeElementId(div);
                            
                            initData(div,  function () {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    options.containerIsWindow = true;
                                    var csw = $.data(div, formName).options.container;
                                    
                                        csw.on("winClosing", function () {
                                            if (options.editMode == editMode.view) {
                                                options.closingOK = true;
                                                csw.csWindow('close');
                                                return;
                                            };
                                            csw.csWindow('close');
                                            //messageBox(options.language.QuitAsk, messageType.yesno, null, function (flag) {
                                            //    if (flag == 'yes') {
                                            //        options.closingOK = true;
                                            //        options.isSaved = false;
                                            //        csw.csWindow('close');

                                            //    } else {
                                                    
                                            //    };
                                            //});
                                        });
                                    
                                };
                                $(div).triggerHandler('loaded', [this, options]);
                            });
                        }
                        catch (err) {
                            errorHandle(formName, 'formLoaded_success', err);
                        }
                    });
                
            }
            catch (err) {
                errorHandle(formName, 'formLoaded', err);
            }


           
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function chkSOCustId(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var loginInfo = getParaLoginInfo(div, formName);
        var d = $.Deferred();
        if ($(headerId + 'txtCustId').val() == false) { return d.resolve(div); };

        try {
           

            var parameters = $.extend({}, loginInfo,
                    { custid: { type: 'string', value: $(headerId + 'txtCustId').val() } });


            var params = getParameters(riadllName,
                   riaClassName,
                   'QuerySOCustId',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            // options.initData = null;
                            //options.initData = {};
                            //$.extend(options.initData, tmp)
                            if (tmp.SO001) {
                                if (tmp.SO001.rows.length > 0) {
                                    $(headerId + 'txtCustName').val(tmp.SO001.rows[0].CUSTNAME)
                                    d.resolve(div);
                                } else {
                                    messageBox(options.language.noCustIdQuery, messageType.critical, null,
                                      function () {
                                          $(headerId + 'txtCustName').val('');

                                      });
                                    return d.reject('NO CustId')
                                }

                            } else {
                                return d.reject('NO CustId')
                            }


                            if (typeof act === 'function') { act() }
                            //setCsInvUseId(div);



                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            return d.reject('chkSOCustId')
                            //changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'chkSOCustId-Server', err);
                        return d.reject('chkSOCustId')
                        //changeMode(div, options.editMode);
                    } finally {
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };

                }
            });
            return d.promise();

        } catch (err) {
            errorHandle(formName, 'chkSOCustId', err);
            return d.reject('chkSOCustId');
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    
    function QueryAllData(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);
        var d = $.Deferred();
        
        try {           
            var options = $.data(div, formName).options;           
            var headerId = '#' + $(div).prop('id');

            var parameters = $.extend({}, loginInfo);
                   

            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryBatchAllData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            options.initData = null;
                            options.initData = {};
                            $.extend(options.initData, tmp)
                            
                            $(headerId + 'csCreateKind').csList('source', options.initData['INVOICEKIND'].rows);
                            $(headerId + 'csHowtoCreate').csList('source', options.initData['HOWTOCREATE'].rows);
                            $(headerId + 'csOrder').csList('source', options.initData['GRIDORDER'].rows);
                            $(headerId + 'csCompCode').csList('source', options.initData['COMPCODE'].rows);
                            $(headerId + 'csCompCode').csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                            $(headerId + 'csCreateKind').csList('codeNo', 1);
                            $(headerId + 'csHowtoCreate').csList('codeNo', 2);
                            $(headerId + 'csOrder').csList('codeNo', 3);
                            if (!options.initData['INV001'].rows[0]['StartAllUpload'.toUpperCase()]) {
                                $(headerId + 'csCreateKind').csList('disabled', true);
                            };
                            var cloneInv099 = $.extend(true, {}, options.initData.INV099);
                            cloneInv099.rows.length = 0;
                            options.grdChoiceInv.localdata = $.extend(true, {}, cloneInv099);
                            $(headerId + 'grdChoiceInv').one('bindingcomplete', function () {
                                if (typeof act === 'function') { act() };
                                return d.resolve(div);
                            });
                            $(headerId + 'grdChoiceInv').jqxGrid('updatebounddata');
                            
                            //setCsInvUseId(div);

                            
                                                    
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            return d.reject('QueryBatchAllData')
                            //changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryBatchAllData-Server', err);
                        return d.reject('QueryBatchAllData')
                        //changeMode(div, options.editMode);
                    } finally {                        
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };
                    
                }
            });
            return d.promise();
            
        } catch (err) {
            errorHandle(formName, 'QueryBatchAllData', err);
            return d.reject('QueryBatchAllData');
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    
    function lockMasterControl(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
    }
    
    
    function refreshGrdChoiceInv(div, data, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var d = $.Deferred();
        try {
            var d1 = Date.parse(data['LASTINVDATE']);
            if (isNaN(d1)) { d1 = 0 };
            var d2 = Date.parse($(headerId + 'txtInvDate').csDateTime('getDate'));
            
            if ($(headerId + 'chkSameInvDate').jqxCheckBox('checked')) {
                d2 = Date.parse($(headerId + 'txtStartInvDate').csDateTime('getDate'));
                if (d1 > d2) {
                    messageBox(options.language.invStartMustBigger, messageType.critical, null,
                             function () {
                                 $(headerId + 'txtStartInvDate').csDateTime('focus');
                             });
                    return;

                };
            } else {
                if (d1 > d2) {
                    messageBox(options.language.InvDateMustBigger, messageType.critical, null,
                            function () {
                                $(headerId + 'txtInvDate').csDateTime('focus');                                
                            });
                    return;
                };
            };

            choiceRows = $(headerId + 'grdChoiceInv').jqxGrid('getrows');
            var row = generateRow($.extend(true, {}, options.initData.INV099));
            var len = choiceRows.length;
            var double = false;
            for (var i = 0; i < len; i++) {
                var choiceRowStr = '';
                var dataStr = '';
                for (var prop in row) {
                    choiceRowStr = choiceRowStr + choiceRows[i][prop];
                    dataStr = dataStr + data[prop];                    
                };
                if (choiceRowStr == dataStr) {
                    double = true;
                    break;
                };
            };
            if (double) {
                messageBox(options.language.haveInvNo, messageType.critical, null,
                              function () {
                                  //$('#' + headerId + 'txtInvDate').csDateTime('focus')
                              });
                return;
            };
            var row = generateRow($.extend(true, {}, options.initData.INV099));
            for (var prop in row) {                
                row[prop] = data[prop];
            };
            
            $(headerId + 'grdChoiceInv').jqxGrid('addrow', null, row);
            $(headerId + 'grdChoiceInv').jqxGrid('refreshdata');
            $(headerId + 'grdChoiceInv').jqxGrid({ selectedrowindex: 0 });
            return d.resolve(div);
            return d.promise();
        } catch (err) {
            errorHandle(formName, 'refreshGrdUsefulInv', err);
            return d.reject('refreshGrdUsefulInv');
        } finally {

        };
    };
    function refreshGrdUsefulInv(div, filterData,act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var d = $.Deferred();
        try {
            var data = $.extend(true, {}, filterData);
            $(headerId + 'grdUsefulInv').one('bindingcomplete', function (event) {
                $(this).jqxGrid({ selectedrowindex: 0 })
                return d.resolve(div);
            });
            options.grdUsefulInv.localdata = data;
            $(headerId + 'grdUsefulInv').jqxGrid('updatebounddata');
            return d.promise();
        } catch (err) {
            errorHandle(formName, 'refreshGrdUsefulInv', err);
            return d.reject('refreshGrdUsefulInv');
        } finally {

        };
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');       
            try {            
                changeLanguage(div);
                $.when(renderControl(div))
                .then(QueryAllData)
                .then(addHandler)
               //.then(refreshGrdUsefulInv)
                .done(action)
                .fail(function (fnName) { console.log(fnName) })

               
            } catch (err) {
                errorHandle(formName, 'initData', err);

            } finally {
                
            }
        };
    function formClosed(div) {

        var options = $.data(div, formName).options;
        if (options['closed']) {
            //options['closed'](options.returnValue);
        };
        $(options['container']).jqxWindow('close');
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
    
    
    function getGridCurrentRow(div) {
        var options = $.data(div, formName).options;
        var rowIndex = $(options.dynGridId).jqxGrid('selectedrowindex') || 0;
        var data = $(options.dynGridId).jqxGrid('getrowdata', rowIndex);
        return data;
    };

    
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var d = $.Deferred();
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
            return d.resolve(div);
        }
        catch (err) {

            errorHandle(formName, 'changeLanguage', err);
            return d.reject('changeLanguage')
        }
    };
})(jQuery);
