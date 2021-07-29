(function ($) {
    var formName = 'INV1120A11';
    var riadllName = 'CableSoft.INV.RIA.CreateInvoice.Web.dll';
    var riaClassName = 'CableSoft.INV.RIA.CreateInvoice.Web.Invoice';
    var copyLoginInfo = {};
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
        this.inv099 = [];
        
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
    $.fn.INV1120A11 = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new INV1120A11(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.INV1120A11_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.INV1120A11', err);
        }
    };
    function renderGrid(div) {
        
        try {
            var options = $.data(div, formName).options;
            //var data = options.initData.DYNGRID_CD022;
            var lang = options.language;
            var headId = $(div).attr('id');
            var controls = options.controls;
            //var height = ($(div).innerHeight() - buttonsHeight) / 100 * 50 - 10;
            options.grdData1 = {
                datatype: "json",
            };
            options.grdData1.localdata = options.initData.Table;
            var dataAdapter1 = new $.jqx.dataAdapter(options.grdData1);
            $("#" + headId + "Inv099grid").one('bindingcomplete', function (event) {
                
                
                $("#" + headId + "Inv099grid").one('rowdoubleclick', function (e) {
                    var row = $(this).jqxGrid('getrowdata', e.args.rowindex);

                    options.inv099 = row
                    options.isSaved = true;
                    $(options.container).csWindow('close');

                })
            })
            $("#" + headId + "Inv099grid").jqxGrid({
                width: '100%',
                height: '95%',
                //height: $("#" + headId + "partBUI").height() -35,
                source: dataAdapter1,
                sortable: true,
                altrows: true,
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
                    { text: lang.colYEARMONTH, datafield: 'YEARMONTH', width: 100 },
                    { text: lang.colINVFORMATDESC, datafield: 'INVFORMATDESC', width: 80 },
                    { text: lang.colUPLOADFLAG, datafield: 'UPLOADFLAG', width: 120 },
                    { text: lang.colPREFIX, datafield: 'PREFIX', width: 50 },
                    { text: lang.colSTARTNUM, datafield: 'STARTNUM', width: 80 },
                    { text: lang.colENDNUM, datafield: 'ENDNUM', width: 80 },
                    { text: lang.colCURNUM, datafield: 'CURNUM', width: 100 },
                    { text: lang.colLASTINVDATE, datafield: 'LASTINVDATE', width: 100 },
                    { text: lang.colMEMO, datafield: 'MEMO', width: 220 },

                    
                ],
                localization: options.localization
            })
            controls.push({ name: $(div).prop('id') + 'Inv099grid', type: 'jqxGrid', level: 2 });
           
            //$("#" + headId + "Inv099grid").unbind('rowdoubleclick');
            //$("#" + headId + "Inv099grid").bind('rowdoubleclick', grdRowDobuleClick)
            

        }
        catch (err) {
            errorHandle(formName, 'renderGrid', err);
        }
    }
    function grdRowDobuleClick(event) {

        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if (options.canMutilChoose) { return; };
        if ($(this).jqxGrid('disabled')) { return; };
        //options.faciSeqNO = $(this).jqxGrid('getcellvalue', event.args.rowindex, 'SEQNO');
        //options.faciSNO = $(this).jqxGrid('getcellvalue', event.args.rowindex, 'FACISNO');
        var row = $(this).jqxGrid('getrowdata',event.args.rowindex);
        
        options.inv099 = row
        options.isSaved = true;
        $(options.container).csWindow('close');
        
    };
    function formDestroy(div) {
        var options = $.data(div, formName).options;
        var headId = $(div).attr('id');
        try {
           
            var controls = $.data(div, formName).options.controls;
            $("#" + headId + "Inv099grid").unbind('rowdoubleclick');
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
        }
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            $(div).append('<div data-id="desc" style="height:25px;color:red">滑鼠點擊二下選擇發票並離開</div>');
            $(div).append('<div data-id="Inv099grid"></div>');
            
            changeElementId(div);
            QueryINV099(div, function () {
                renderGrid(div);
            });
            
            //loadForm(options,
            //    'SO1000\\' + formName + '.html',
            //    function (msg) {
            //        try {
            //            $(div).html(msg);
            //            changeElementId(div);
            //            initData(div, function () {
            //                $(div).triggerHandler('loaded', [this, options]);
            //                if ($(options.container).attr('class').indexOf('jqx-window') != undefined) {
            //                    if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
            //                        options.containerIsWindow = true;
            //                        var csw = $.data(div, formName).options.container;
            //                        csw.on("winClosing", function () {
            //                            csw.csWindow('close');
            //                        });
            //                    };
            //                };
            //            });
            //        }
            //        catch (err) {
            //            errorHandle(formName, 'formLoaded_success', err);
            //        }
            //    });

        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    }
    function QueryINV099(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);

        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');

            var parameters = $.extend({}, loginInfo,
                    { InvDate: { type: 'date', value: options.invdate } });


            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryINV099',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            options.initData = null;
                            options.initData = {};
                            $.extend(options.initData, tmp)
                            if (typeof act === 'function') { act() }



                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            //changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryINV099-Server', err);
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
            errorHandle(formName, 'QueryINV099', err);
            changeMode(div, options.editMode);
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    
}(jQuery))