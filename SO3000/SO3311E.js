(function ($) {
    var formName = "SO3311E";
    var riadllName = "CableSoft.SO.RIA.Billing.Batch.EnterPay.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Billing.Batch.EnterPay.Web.EnterPay";
    var copyLoginInfo = {};    
    var grdData = null;
    var defaults = (function () {
        this.language = {};
        this.initData = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.parameters = {};
        this.controls = [];
        this.containerIsWindow = false;
        this.theme = '';
        this.enterType = 0;
        this.viewData = null;
        this.localization = null;
        this.delBillNo = [];
        this.delAmount = 0;
    });
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed']();
        }
        $(options['container']).csWindow('close');

    };
    function formDestroy(div) {
        var options = $.data(div, formName).options;
        var controls = $.data(div, formName).options.controls;
        try {

            //unBindHandler(div);
            unHandler(div);
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
            }; */
            destroyControls(controls);
            deleteJSONObject(options);
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
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        setTheme: function (jq, params) {
            return jq.each(function () {
                setTheme(this, params);
            });
        },
        theme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        close: function (jq) {
            return jq.each(function () {
                formClosed(this);
            });
        },
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        destroy: function (jq) {
            return jq.each(function () {
                formDestroy(this);
            });
        },
        canView: function (jq, params, param2) {
            return [true, ''];
        },
        canAppend: function (jq, params, param2) {
            return [true, ''];
        },
        canEdit: function (jq, params, param2) {
            return [true, ''];
        },
        canDelete: function (jq, params, param2) {
            return [true, ''];
        },
        canPrint: function (jq, params, param2) {
            return [true, ''];
        }
    };
    $.fn.SO3311E = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new SO3311E(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3311E_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3311E', err);
        }
    };
    function unHandler(div) {
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'btnDelTemp').unbind('click');
    };
    function addHandler(div) {
        var headerId = '#' + $(div).attr('id');
        var options = $.data(div, formName).options;
        $(headerId + 'btnCancel').one('click', function () {
            $(options.container).csWindow('close');
        });
        $(headerId + 'btnDelTemp').unbind('click');
        $(headerId + 'btnDelTemp').bind('click', div, btnDelTempClicked);
    };
    function btnDelTempClicked(event) {
        if ($(this).jqxButton('disabled')) { return; };
        cancelBillData(event.data);
    };
    function cancelBillData(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        if ($(headerId + 'csgrdDetail').jqxGrid('getrows').length <=0) {return;};
        var selectedrowindex = $(headerId + 'csgrdDetail').jqxGrid('selectedrowindex');
        if (selectedrowindex < 0) { selectedrowindex = 0; };
        var billno = $(headerId + 'csgrdDetail').jqxGrid('getcellvalue', selectedrowindex, "BILLNO");
        var item = $(headerId + 'csgrdDetail').jqxGrid('getcellvalue', selectedrowindex, "ITEM");
        var realAmt = $(headerId + 'csgrdDetail').jqxGrid('getcellvalue', selectedrowindex, "REALAMT");
        /*
        grdData.localdata = options.viewData.Temp.rows;
        var dataAdapter1 = new $.jqx.dataAdapter(grdData);
        $(headId + 'csgrdDetail').jqxGrid({ source: dataAdapter1 });
        $(headId + 'csgrdDetail').on('bindingcomplete', function (event) {
            $(this).jqxGrid({ selectedrowindex: 0 });
        });
        $(headId + 'csgrdDetail').jqxGrid('updatebounddata'); */


        var parameters = $.extend({}, copyLoginInfo,
                   { EnterType: { type: 'integer', value: options.enterType } },
                   { BillNo: { type: 'string', value: billno } },
                   { Item: { type: 'integer', value: item } }
                   );
        var params = getParameters(riadllName,
                  riaClassName,
                  'CancelBillData',
                  JSON.stringify(parameters));
        getServerData(params, {
            success: function (data) {
                try {
                    if (!data.ResultBoolean) {
                        messageBox(data.ErrorMessage, messageType.critical);
                    } else {
                        var d = JSON.parse(data.ResultXML);
                        $(headerId + 'csgrdDetail').jqxGrid('clear');
                        grdData.localdata = d.Temp.rows;
                        $(headerId + 'csgrdDetail').jqxGrid('updatebounddata');
                        options.delBillNo.push({ billno: billno, item: item });
                        options.delAmount +=  parseInt(realAmt);
                        if (d.Temp.rows.length == 0) {
                            $(headerId + 'btnDelTemp').jqxButton({ disabled: true });
                        };
                    };
                } catch (err) {

                    errorHandle(formName, 'CancelBillData-Server', err);
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

    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            copyLoginInfo = getParaLoginInfo(div, formName);
            loadForm(options,
                'SO3000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div,formName);

                        initData(div, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class') != undefined) {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    options.containerIsWindow = true;
                                };
                            }

                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });
            /*$.ajax({
                url: 'SO3000\\' + formName + '.html?v=' + formatDateTime(new Date(), "datetime3"),
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);

                        initData(div, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class') != undefined) {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    options.containerIsWindow = true;
                                };
                            }

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
            //unBindHandler(div);
            changeLanguage(div);
            renderControl(div);
            /*
            $(headerId + 'csClctEn').csList('source', options.parameters.ClctEn.rows);
            $(headerId + 'csCMCode').csList('source', options.parameters.CMCode.rows);
            $(headerId + 'csPTCode').csList('source', options.parameters.PTCode.rows);
            $(headerId + 'csSTCode').csList('source', options.parameters.STCode.rows);
            QueryTempInfo(div, function () {
                setDefaultValue(div);
                bindHandler(div);
            }); */
            addHandler(div);
            action();



        } catch (err) {
            errorHandle(formName, 'initData', err);
            
        } finally {
            if ($.isFunction(action)) { action(); };
        };
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
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var height = $(div).innerHeight();
        var headerId = '#' + $(div).prop('id');
        try {

            //-----------------------------------------------------------------------------
            $(headerId + 'btnDelTemp').jqxButton($.extend({}, imagePosition, {
                width: 110,
                height: 25,
                imgSrc: imageScr.delete.imgSrc
            }));
            controls.push({ name:$(div).prop('id') + 'btnDelTemp', type: 'jqxButton', level: 2 });
            $(headerId + 'btnDelTemp > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            /*
            $(headerId + 'btnPrint').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.print.imgSrc
            }));
            controls.push({ name: 'btnPrint', type: 'jqxButton', level: 2 }); */
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,                
                imgSrc: imageScr.cancel.imgSrc
            }));            
            controls.push({ name:$(div).prop('id')+ 'btnCancel', type: 'jqxButton', level: 2 });
            $(headerId + 'btnCancel > img').css('top', '2px');
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            $(headerId + "csgrdDetail").jqxGrid({
                width: '99.7%',
                height: '99%',
                sortable: true,
                altrows: true,
                columnsresize: true,
                localization: options.localization,
                columns: [
                    /*
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 30,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                        }
                    }, */
                    { text:lang.colEntryNo, datafield: 'ENTRYNO', width: 70, hidden: false },
                    { text:lang.colBillNo , datafield: 'BILLNO', width: 130, hidden: false },
                    { text:lang.colItem, datafield: 'ITEM', width: 40, hidden: false, cellsalign: 'center', align: 'center' },
                    { text:lang.colPrtSNo , datafield: 'PRTSNO', width: 130, cellsalign: 'left', align: 'left', hidden: false },
                    { text:lang.colMediaBillNo , datafield: 'MEDIABILLNO', width: 130, cellsalign: 'left', align: 'left' },
                    { text:lang.colCustId , datafield: 'CUSTID', width: 70, cellsalign: 'center', align: 'center', hidden: false },
                    { text: lang.colCustName , datafield: 'CUSTNAME', width: 120, cellsalign: 'left', align: 'left', hidden: false },
                    { text: lang.colCitemName , datafield: 'CITEMNAME', width: 180, cellsalign: 'left', align: 'left', hidden: false },
                    { text: lang.colShouldAmt , datafield: 'SHOULDAMT', width: 80, cellsalign: 'right', align: 'right' },
                    { text: lang.colShouldDate, datafield: 'SHOULDDATE', width: 100, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colRealAmt, datafield: 'REALAMT', width: 80, cellsalign: 'right', align: 'right' },
                    { text: lang.colRealDate, datafield: 'REALDATE', width: 100, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colRealPeriod, datafield: 'REALPERIOD', width: 40, hidden: false, cellsalign: 'center', align: 'center' },
                    { text: lang.colRealStartDate, datafield: 'REALSTARTDATE', width: 100, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colRealStopDate, datafield: 'REALSTOPDATE', width: 100, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                ]
            });
            controls.push({ name:$(div).prop('id')+ 'csgrdDetail', type: 'jqxGrid', level: 2 });
            renderGrid(div);
            //-----------------------------------------------------------------------------

        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

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
                   { name: 'ENTRYNO', type: 'integer' },
                   { name: 'BILLNO', type: 'string' },
                   { name: 'ITEM', type: 'integer' },
                   { name: 'PRTSNO', type: 'string' },
                   { name: 'MEDIABILLNO', type: 'string' },
                   { name: 'CUSTID', type: 'integer' },
                   { name: 'CUSTNAME', type: 'string' },
                   { name: 'CITEMNAME', type: 'string' },
                   { name: 'SHOULDAMT', type: 'integer' },
                   { name: 'SHOULDDATE', type: 'date' },                
                   { name: 'REALAMT', type: 'integer' },       
                   { name: 'REALDATE', type: 'date' },       
                   { name: 'REALPERIOD', type: 'integer' },       
                   { name: 'REALSTARTDATE', type: 'date' },
                   { name: 'REALSTOPDATE', type: 'date' },
            ]
        };
      
        grdData.localdata = options.viewData.Temp.rows;
        var dataAdapter1 = new $.jqx.dataAdapter(grdData);
        $(headId + 'csgrdDetail').jqxGrid({ source: dataAdapter1 });
        $(headId + 'csgrdDetail').on('bindingcomplete', function (event) {
            $(this).jqxGrid({ selectedrowindex: 0 });
        });
        $(headId + 'csgrdDetail').jqxGrid('updatebounddata');
    };
})(jQuery);