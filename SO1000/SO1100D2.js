(function ($) {
    var formName = "SO1100D2";
    var riadllName = "CableSoft.SO.RIA.Customer.Account.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Customer.Account.Web.Account";
    var defaults = (function () {
        this.language = {};        
        this.loginInfo = {};
        this.accountNo = '',
        this.defaultCharge = '',
        this.editMode = 0;
        this.parameters = {};                
        this.controls = [];
        this.isSaved = false;        
        this.containerIsWindow = false;
        this.selectCharge = '';
        this.unSelectCharge = '';
        this.theme = '';
        this.localization = null;
    });
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        theme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        setTheme: function (jq, params) {
            return jq.each(function () {
                setTheme(this, params);
            });
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
            return [true,''];
        },
        canAppend: function (jq, params, param2) {
            return [true, ''];
        },
        canEdit: function (jq, params, param2) {
            return [true,'']
        },
        canDelete: function (jq, params, param2) {
            return [true,'']
        },
        canPrint: function (jq, params, param2) {
            return [true,'']
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
    function setTheme(div, params) {
        var controls = $.data(div, formName).options.controls;
        for (i = 0; i < controls.length; i++) {
            var o = $('#' + $(div).prop('id') + controls[i].name);
            if (o.length > 0) {
                $(o[0])[controls[i].type]({ theme: params });
            }
        }
    };
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close');
    };
    function formDestroy(div) {
        try {
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
    $.fn.SO1100D2 = function (options, param, param2) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param);
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
                            options: $.extend({}, new defaults(), new SO1100D2(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1100D2_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1100D2', err);
        }
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        initData(div, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                options.containerIsWindow = true;
                                /*
                                var csw = $.data(div, formName).options.container;
                                csw.on("winClosing", function () {
                                    csw.csWindow('close');
                                }); */
                            };
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        };
    };

 
    function unBindHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnOK').off('click', btnOKClick);
    };
    function bindHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnOK').off('click', btnOKClick);
        $(headerId + 'btnOK').bind('click', div, btnOKClick);
    };
    function btnOKClick(event, action) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var unChoices = [];
        var choices = []
        if ($(this).jqxButton('disabled')) { return; };
        unBindHandler(event.data);        
        try {
            var rows = $(headerId + 'grdCsGrid').jqxGrid('getrows');
            rows.forEach(function (row, index) {
                if (row['CHOOSE']) {
                    choices.push(row['PKBILLNO']);
                } else { unChoices.push(row['PKBILLNO']); };
            });
            
            options.selectCharge = choices.toString();
            options.unSelectCharge = unChoices.toString();
            options.isSaved = true;
                        
        } catch (err) {
            errorHandle(formName, 'btnOKClick', err);
        } finally {
            $(options.container).triggerHandler('close');
        }
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var controls = options.controls;
        var lang = options.language;
        try {
            //-----------------------------------------------------------------------------
            $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 70,
                height: 30,
                imgSrc: imageScr.ok.imgSrc
            }));
            
            controls.push({ name: 'btnOK', type: 'jqxButton', level: 2 });
            $(headerId + 'btnOK > img').css('top', '3px');
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            options.grdCsGrid = {
                datatype: "json",
            };
            options.grdCsGrid = {
                datatype: "json",
                datafields: [
                   { name: 'CHOOSE', type: 'boolean' },
                   { name: 'CUSTID', type: 'integer' },
                   { name: 'BILLNO', type: 'string' },
                   { name: 'ITEM', type: 'integer' },
                   { name: 'CITEMCODE', type: 'integer' },
                   { name: 'CITEMNAME', type: 'string' },
                   { name: 'REALPERIOD', type: 'integer' },
                   { name: 'SHOULDAMT', type: 'integer' },
                   { name: 'CMNAME', type: 'string' },
                   { name: 'REALSTARTDATE', type: 'date' },
                   { name: 'REALSTOPDATE', type: 'date' },
                   { name: 'PKBILLNO', type: 'string' },
                   { name: 'ACCOUNTNO', type: 'string' }
                ]
            };
            var dataAdapter1 = new $.jqx.dataAdapter(options.grdCsGrid);
            $(headerId + "grdCsGrid").jqxGrid({
                width: '99.7%',
                height: '99%',
                sortable: true,
                altrows: true,
                editable: true,
                source: dataAdapter1,
                columnsresize: true,
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
                        align: 'center'
                    },
                    { text: lang.colCustId, datafield: 'CUSTID', width: 80, editable: false, cellsalign: 'center', align: 'center' },
                    { text: lang.colBillNo, datafield: 'BILLNO', width: 140, editable: false },
                    { text: lang.colItem, datafield: 'ITEM', width: 50, editable: false, cellsalign: 'center', align: 'center' },                    
                    { text: lang.colCitemCode, datafield: 'CITEMCODE', width: 100, editable: false, cellsalign: 'right', align: 'center' },
                    { text: lang.colCitemName, datafield: 'CITEMNAME', width: 200, editable: false },
                    { text: lang.colRealPeriod, datafield: 'REALPERIOD', width: 60, cellsalign: 'center', align: 'center', editable: false },
                    { text: lang.colShouldAmt, datafield: 'SHOULDAMT', width: 70, editable: false, cellsalign: 'right', align: 'center' },
                    { text: lang.colCMName, datafield: 'CMNAME', width: 90, editable: false, cellsalign: 'center', align: 'center' },
                    { text: lang.colRealStartDate, datafield: 'REALSTARTDATE', width: 90, editable: false, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colRealStopDate, datafield: 'REALSTOPDATE', width: 90, editable: false, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: 'PKBILLNO', datafield: 'PKBILLNO', width: 90, editable: false, cellsalign: 'center', align: 'center', hidden: true },
                    { text: 'ACCOUNTNO', datafield: 'ACCOUNTNO', width: 100, editable: false, cellsalign: 'center', align: 'center', hidden: true }
                ],
                localization: options.localization
            });
            controls.push({ name: 'grdCsGrid', type: 'jqxGrid', level: 2 });
            //-----------------------------------------------------------------------------
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        };
    };
    function refreshGrid(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var chargeAry = [];

        try {
            if (options.defaultCharge != '') {
                chargeAry = options.defaultCharge.toString().split(',');
            };
           


            var data1 = $.extend({}, options.parameters['Data']['CanChooseCharge']);
            data1.columns.push({ name: 'CHOOSE', type: 'boolean' });
            $.each(data1.rows, function (index, row) {
                row['CHOOSE'] = false;
                chargeAry.forEach(function (value, key) {
                    if (value == row['PKBILLNO']) {
                        row['CHOOSE'] = true;
                        return false;
                    };
                });                            
            });

            //if the billno isn't choice then not to show data on the screen by kin 2019/4/23 for karen
            $(headerId + 'grdCsGrid').one("bindingcomplete", function (event) {
                var delRows = $(headerId + 'grdCsGrid').jqxGrid('getboundrows');                
                var rowIDs = new Array();
                $.each(delRows, function (index, row) {
                    if (row['CHOOSE'] == false) {
                        //rowIDs.push(row.uid);
                    };
                    //#8499 Delete the rows aren't equall to accountno by kin 2019/09/06
                    if (row['ACCOUNTNO'] == undefined) {
                        rowIDs.push(row.uid);
                    } else {
                        if (row['ACCOUNTNO'] != options.accountNo) {
                            rowIDs.push(row.uid);
                        };
                    };
                })                
                
                $(headerId + 'grdCsGrid').jqxGrid('deleterow', rowIDs);
            })
            options.grdCsGrid.localdata = data1;
            $(headerId + 'grdCsGrid').jqxGrid('updatebounddata');
            return true;
        } catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        } finally {

        };
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;

        try {
            unBindHandler(div);
            changeLanguage(div);
            options.copyLoginInfo = getParaLoginInfo(div, formName);
            renderControl(div);
            refreshGrid(div);           
        } catch (err) {
            errorHandle(formName, 'initData', err);
            if ($.isFunction(action)) { action(); };
        } finally {
            bindHandler(div);
        }
    };
    function changeLanguage(div) {
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