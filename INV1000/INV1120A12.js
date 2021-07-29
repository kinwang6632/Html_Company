(function ($) {
    var formName = 'INV1120A12';
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
        this.grdCust = {};
        this.grdBill = {};
        this.bill = [];
        this.so138 = {};
        this.lock = false;
        this.newflow = 0;
        this.taxrate = 0;
        this.newload = true;
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
    $.fn.INV1120A12 = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new INV1120A12(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.INV1120A12_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.INV1120A12', err);
        }
    };
    function QueryBillIInfo(div, invseqno,custid,  act) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = $(div).prop('id');
        var loginInfo = getParaLoginInfo(div, formName);
        var d = $.Deferred();
        try {
            //if ($('#' + headerId + 'grdCust').jqxGrid('getrows').length > 0) {
            if (invseqno || options.newflow != 1) {
                //var rowindex = $('#' + headerId + 'grdCust').jqxGrid('getselectedrowindex');
                //rowindex < 0 ? rowindex = 0 : $('#' + headerId + 'grdCust').jqxGrid('getselectedrowindex')
                //var invseqno = $('#' + headerId + 'grdCust').jqxGrid('getcellvalue', rowindex, "INVSEQNO");
                
                var parameters = $.extend({}, loginInfo,
                   { existsBillNo: { type: 'string', value: options.parameters.existsbill } },
                   { custid: { type: 'string', value: custid } },
                   { invseqno: { type: 'string', value: invseqno } },
                   { guino: {type:'string',value:options.parameters.guino}});
                var params = getParameters(riadllName,
                   riaClassName,
                   'QuerySOBill',
                   JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        try {
                            if (data.ErrorCode == 0) {
                                var tmp = JSON.parse(data.ResultXML);
                                options.initData.BILL = {};
                                options.initData.BILL = null;
                                if (options.parameters.inv008.length > 0) {
                                    inv008TaxCode = options.parameters.inv008[0].TAXCODE;
                                    if (inv008TaxCode != 1) { options.taxrate = 0 };
                                    
                                    var filtered = tmp.BILL.rows.filter(function (value, index, arr) {
                                        return value['TAXCODE'] == inv008TaxCode && value['RATE1'] == options.taxrate ;
                                    });
                                    tmp.BILL.rows = filtered;
                                };

                                $.extend(true, options.initData, tmp)
                                
                                if (typeof act === 'function') { act() }
                                return d.resolve(div);


                            }
                            else {
                                messageBox(data.ErrorMessage, messageType.critical);
                                //changeMode(div, options.editMode);
                            }
                        } catch (err) {
                            errorHandle(formName, 'QuerySOInfo-Server', err);
                            //changeMode(div, options.editMode);
                        } finally {
                            params = null;
                            parameters = null;
                            data = null;
                            delete data;
                            delete parameters;
                            delete param;
                            options.newload = false;
                        };

                    }
                });
                return d.promise();

            } else {
                d.resolve(div);
            }
            
        } catch(err) {
            errorHandle(formName, 'renderControl', err);
            return d.reject('renderControl');
        }
    }

    function refreshBILLGrid(div) {
        var options = $.data(div, formName).options;
        var lang = options.language;
        var headerId = $(div).prop('id');
        var d = $.Deferred();
        var data2 = $.extend(true, {}, options.initData.BILL);
        try {

            //var data2 = $.extend(true, {}, options.initData.SO033);
            options.grdBill.localdata = data2;
            //options.grdBill.localdata = data2;
            $('#' + $(div).prop('id') + 'grdBill').one('bindingcomplete', function (event) {
                $(this).jqxGrid({ selectedrowindex: 0 })
                return d.resolve(div);
            });
            $('#' + $(div).prop('id') + 'grdBill').jqxGrid('updatebounddata');
            return d.promise();
        } catch (err) {
            errorHandle(formName, 'refreshBILLGrid', err);
            return d.reject('refreshBILLGrid');
        } finally {
            data2 = {};
            data = null;
        };
    };
    
    function QueryCust(div,event) {
        var options = $.data(div, formName).options;
        var headerId = '#'+ $(div).attr('id');

        var loginInfo = getParaLoginInfo(div, formName);
        var d = $.Deferred();
        if ($(this).jqxButton('disabled')) { return;}
        if (!$(headerId + 'txtQuery').val()) {           
            messageBox(options.language.plsQueryWhere, messageType.critical, null, function () {
                    $(headerId + 'txtQuery').jqxInput('focus');
                });
                return;
        };
        if (!$(headerId + 'csQuery').csList('codeNo')) {
            messageBox(options.plsQueryMethod, messageType.critical, null, function () {
                $(headerId + 'csQuery').csList('focus');
            });
            return;
        };
        if (options.refNo != 4 && $(headerId + 'csQuery').csList('codeNo') == 1) {
            if ($.isNumeric($(headerId + 'txtQuery').val()) == false) {
                messageBox(options.language.onlyNum, messageType.critical, null, function () {
                    $(headerId + 'txtQuery').jqxInput('focus');
                });
                return;
            };
        };
            
        
        try {
            

            var parameters = $.extend({}, loginInfo,
                    { QueryIndex: { type: 'integer', value: $(headerId+'csQuery').csList('codeNo') } },
                    { QueryText: { type: 'string', value: $(headerId + 'txtQuery').val()} },
                    { RefNo: { type: 'integer', value: options.refNo } });


            var params = getParameters(riadllName,
                   riaClassName,
                   'QuerySOCustByQuery',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            var data1 = $.extend(true, {}, tmp.SO138);                            
                            if (tmp.SO138.rows.length == 0) {
                                messageBox(options.language.noData, messageType.critical, null, function () {
                                    $(headerId + 'grdCust').jqxGrid('clear');
                                    $(headerId + 'txtQuery').jqxInput('focus');
                                });
                                return d.resolve(div);
                            };
                            options.grdCust.localdata = data1;
                            $(headerId + 'grdCust').one('bindingcomplete', function (event) {

                                $(this).jqxGrid({ selectedrowindex: 0 })
                                return d.resolve(div);
                            });
                            $(headerId + 'grdCust').jqxGrid('updatebounddata');

                            
                            tmp = null;
                            data1 = null;
                            return d.resolve(div);

                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            return d.reject('QuerySOCustByQuery')
                            //changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'QuerySOCustByQuery-Server', err);
                        return d.reject('QuerySOCustByQuery')
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
            errorHandle(formName, 'QuerySOCustByQuery', err);
            return d.reject('QuerySOCustByQuery');
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function unHandler(div, action) {
        //var options = $.data(div, formName).options;
        var headerId = $(div).attr('id');
        $('#' + headerId + 'btnOK').off('click');
        $('#' + headerId + 'btnCancel').off('click');
        $('#' + headerId + 'grdCust').off('rowselect');
        $('#' + headerId + 'btnQuery').off('click');
        $('#' + headerId + 'grdCust').off('rowdoubleclick');
        
    }
    
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = $(div).attr('id');
        var d = $.Deferred();
        $('#' + headerId + 'grdCust').off('rowdoubleclick');
        $('#' + headerId + 'grdCust').on('rowdoubleclick', function () {
            if (options.refNo === 4) { $('#' + headerId + 'btnOK').triggerHandler('click') };
        });
        $('#' + headerId + 'btnQuery').off('click');
        $('#' + headerId + 'btnQuery').on('click', function (event) {
            options.newload = true;
            QueryCust.apply(this, [div, event]);
        });
        $('#' + headerId + 'btnOK').off('click')
        $('#' + headerId + 'btnOK').on('click', function (e) {
            var rowindex = $('#' + headerId + 'grdCust').jqxGrid('selectedrowindex') || 0;
            var rows = $('#' + $(div).prop('id') + 'grdBill').jqxGrid('getrows');
            var amsg = [];
            var srows = [];
            $.each(rows, function (i, v) {
                if (v['choose'.toUpperCase()]) {
                    srows.push(v);
                }
            })
            if (srows.length == 0 && options.refNo !=4) {
                messageBox(options.language.noChoice, messageType.critical, null,
                           function () {                               
                           });
                return false;
            } else {
                var aTaxCode = 0;
                var blnOK = true;
                if (options.refNo != 4) {
                    var inv008TaxCode = null;
                    aTaxCode = srows[0].TAXCODE;
                    if (options.parameters.inv008.length > 0) {
                        inv008TaxCode = options.parameters.inv008[0].TAXCODE;
                    };
                    srows.some(function (v) {
                        if (v.TAXCODE != aTaxCode) {
                            messageBox(options.language.noSameTax, messageType.critical, null,
                              function () {
                              });
                            blnOK = false;

                            return true;
                        } else {
                            aTaxCode = v.TAXCODE;
                        };
                        if (inv008TaxCode) {
                            if (v.TAXCODE != inv008TaxCode) {
                                messageBox(options.language.noSameDetail, messageType.critical, null,
                                  function () {
                                  });
                                blnOK = false;

                                return true;
                            };
                        };
                    });
                    //old flow
                    if (options.newflow != 1 && blnOK) {
                        var accountno = $('#' + headerId + 'grdCust').jqxGrid('getcellvalue', rowindex, 'ACCOUNTNO') || 'X';
                        var invseqno = $('#' + headerId + 'grdCust').jqxGrid('getcellvalue', rowindex, 'INVSEQNO') || 0;
                        var soAccountNo = null;
                        var soInvseqno = null;
                        
                        srows.every(function (v) {
                            soAccountNo = v['ACCOUNTNO'] || 'X';

                            if (soAccountNo != accountno) {
                                if (v['SOURCE2'] == '33') {
                                    amsg.push(options.language.notsameSO033Acc);
                                } else {
                                    amsg.push(options.language.notsameSO034Acc);
                                }
                                blnOK = false
                            };
                            return true;
                        });
                        if (amsg.length === 0 ) {
                            srows.every(function (v) {
                                soInvseqno = v['INVSEQNO'] || 0;
                                if (soInvseqno != invseqno) {
                                    if (v['SOURCE2'] == '33') {
                                        amsg.push(options.language.notsameSO033Seq);
                                    } else {
                                        amsg.push(options.language.notsameSO034Seq);
                                    }
                                    blnOK = false
                                };
                                return true;
                            });

                        };
                    };
                };
                if (amsg.length > 0) {
                    amsg = amsg.filter((x, i, a) => a.indexOf(x) == i)
                    messageBox(amsg.join('\n'), messageType.critical, null,
                        function () {
                        }, { width: 600 });
                };

                if (blnOK == false) {
                    $('button').jqxButton({ disabled: false });
                    return;
                }                
                
                options.so138 = {};
                if (rowindex >= 0) {
                    var data = $('#' + headerId + 'grdCust').jqxGrid('getrowdata', rowindex);
                    options.so138 = data;
                };
                
                options.bill = srows;
                options.isSaved = true;
                $(options.container).csWindow('close');
            }
        }

        );
        $('#' + headerId + 'btnCancel').off('click');
        $('#' + headerId + 'btnCancel').on('click', function () {
            options.isSaved = false;
            $(options.container).csWindow('close');
        })
        $('#' + headerId + 'grdCust').off('rowselect');
        $('#' + headerId + 'grdCust').on('rowselect', function (event) {            
            $('#' + headerId + 'txtCustId').val(event.args.row.CUSTID);
            $('#' + headerId + 'txtCustName').val(event.args.row.CUSTNAME);
            if (options.refNo != 4) {
                if (options.newflow == 1 || options.newload) {
                    QueryBillIInfo(div, $(this).jqxGrid('getcellvalue', event.args.rowindex, 'INVSEQNO'),
                    event.args.row.CUSTID,
                    function () { refreshBILLGrid(div) })
                }
               
            };
            
            
        })
       return d.resolve(div);
    }
    function refreshSO138Grid(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = $(div).prop('id');
        var d = $.Deferred();
        if (options.initData.SO138.rows.length == 0) { return d.resolve(div) };
        var data1 = $.extend(true, {}, options.initData.SO138);
        try {
            
            //var data2 = $.extend(true, {}, options.initData.SO033);
            options.grdCust.localdata = data1;
            //options.grdBill.localdata = data2;
            $('#' + $(div).prop('id') + 'grdCust').one('bindingcomplete', function (event) {
                $(this).jqxGrid({ selectedrowindex: 0 })
                return d.resolve(div);
            });
            $('#' + $(div).prop('id') + 'grdCust').jqxGrid('updatebounddata');
            return d.promise();
        } catch (err) {
            errorHandle(formName, 'refreshSO138Grid', err);
            return d.reject('refreshSO138Grid');
        } finally {
            data1 = {};
            data = null;
        }
    }
    
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = $(div).prop('id');
        var d = $.Deferred();
        var aryCustField = [];
        try {
            $('#' + headerId + 'btnOK').jqxButton({ width: '100%', height: 25 })
            controls.push({ name: headerId + 'btnOK', type: 'jqxButton', level: 0 });
            $('#' + headerId + 'btnCancel').jqxButton({ width: '100%', height: 25 });
            controls.push({ name: headerId + 'btnCancel', type: 'jqxButton', level: 0 });
            controls.push({ name: headerId + 'btnQuery', type: 'jqxButton', level: 0 });
            $('#' + headerId + 'btnQuery').jqxButton($.extend({}, imagePosition, {
                width: 80,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.query.imgSrc,                
                height: 25
            }));
            controls.push({ name: headerId + 'btnQuery', type: 'jqxButton', level: 0 });

            
            $('#' + headerId + 'txtCustId').jqxInput({ width: '100%', height: 25,disabled:true });
            controls.push({ name: headerId + 'txtCustId', type: 'jqxInput', level: 0 });
            $('#' + headerId + 'txtCustName').jqxInput({ width: '100%', height: 25,disabled:true });
            controls.push({ name: headerId + 'txtCustName', type: 'jqxInput', level: 0 });

            $('#' + headerId + 'txtQuery').jqxInput({
                width: 400,
                height: 25
            });
            controls.push({ name: headerId + 'txtQuery', type: 'jqxInput', level: 0 });
            $("#" + headerId + "csQuery").csList({
                source: null,
                codeNoWidth: 30,
                width: '250px',
                height: '25px',
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
                disabled: false,

                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false
            });
            controls.push({ name: headerId + 'csQuery', type: 'csList', level: 0 });
            if (options.refNo != 4) {
                if (options.newflow === 1) {
                    aryCustField = [
                      { name: 'MAILADDRESS', type: 'string' },                      
                      { name: 'InvTitle'.toUpperCase(), type: 'string' },
                      { name: 'InvNo'.toUpperCase(), type: 'string' },
                      { name: 'InvAddress'.toUpperCase(), type: 'string' },                      
                      { name: 'ZIPCODE', type: 'string' },                      
                      { name: 'INVSEQNO', type: 'integer' },
                      { name: 'INVOICEKIND', type: 'integer' },
                      { name: 'INVOICEKIND2', type: 'string' },
                      { name: 'DENRECCODE', type: 'integer' },
                      { name: 'DENRECNAME', type: 'string' },
                      { name: 'InvPurposeCode'.toUpperCase(), type: 'integer' },
                      { name: 'InvPurposeName'.toUpperCase(), type: 'string' },
                      { name: 'EMAIL'.toUpperCase(), type: 'string' },
                      { name: 'CarrierTypeCode'.toUpperCase(), type: 'string' },
                      { name: 'CarrierId1'.toUpperCase(), type: 'string' },
                      { name: 'CarrierId2'.toUpperCase(), type: 'string' },
                      { name: 'LoveNum'.toUpperCase(), type: 'string' },
                      { name: 'A_CarrierId1'.toUpperCase(), type: 'string' },
                      { name: 'A_CarrierId2'.toUpperCase(), type: 'string' },
                      { name: 'CUSTNAME', type: 'string' },
                      { name: 'CUSTID', type: 'integer' },                      
                    ]                   
                } else {
                    aryCustField = [
                      { name: 'MAILADDRESS', type: 'string' },
                      { name: 'SERVICETYPE'.toUpperCase(), type: 'string' },
                      { name: 'InvTitle'.toUpperCase(), type: 'string' },
                      { name: 'BUSINESSID'.toUpperCase(), type: 'string' },
                      { name: 'InvAddress'.toUpperCase(), type: 'string' },
                      { name: 'INSTADDRESS', type: 'string' },
                      { name: 'ZIPCODE', type: 'string' },
                      { name: 'ACCOUNTNO', type: 'string' },
                      { name: 'INVSEQNO', type: 'integer' },
                      { name: 'INVOICEKIND', type: 'integer' },
                      { name: 'INVOICEKIND2', type: 'string' },
                      { name: 'DENRECCODE', type: 'integer' },
                      { name: 'DENRECNAME', type: 'string' },
                      { name: 'CarrierTypeCode'.toUpperCase(), type: 'string' },
                      { name: 'CarrierId1'.toUpperCase(), type: 'string' },
                      { name: 'CarrierId2'.toUpperCase(), type: 'string' },
                      { name: 'LoveNum'.toUpperCase(), type: 'string' },
                      { name: 'A_CarrierId1'.toUpperCase(), type: 'string' },
                      { name: 'A_CarrierId2'.toUpperCase(), type: 'string' },
                      { name: 'CUSTNAME', type: 'string' },
                      { name: 'CUSTID', type: 'integer' },
                      
                    ]
                }
            } else {
                aryCustField = [
                  { name: 'CUSTID', type: 'string' },
                  { name: 'CUSTSNAME'.toUpperCase(), type: 'string' },
                  { name: 'TITLESNAME'.toUpperCase(), type: 'string' },
                  { name: 'TITLENAME'.toUpperCase(), type: 'string' },
                  { name: 'CUSTNAME', type: 'string' },
                  { name: 'BUSINESSID', type: 'string' },
                  { name: 'TEL1', type: 'string' },
                  { name: 'TEL2', type: 'string' },
                  { name: 'TEL3', type: 'string' },
                  { name: 'INVADDR', type: 'string' },
                  { name: 'MAILADDR', type: 'string' }, ]
            }

           
           
            options.grdCust = {
                datatype: "json",
                datafields:aryCustField
            };
            options.grdBill = {
                datatype: "json",
                datafields: [
                   { name: 'CHOOSE', type: 'boolean' },
                   { name: 'source'.toUpperCase(), type: 'string' },
                   { name: 'source2'.toUpperCase(), type: 'string' },
                   { name: 'BILLNO'.toUpperCase(), type: 'string' },
                   { name: 'ITEM', type: 'integer' },
                   { name: 'CITEMNAME', type: 'string' },
                   { name: 'SHOULDDATE', type: 'date' },
                   { name: 'SHOULDAMT', type: 'integer' },
                   { name: 'REALDATE', type: 'date' },
                   { name: 'REALPERIOD', type: 'integer' },
                   { name: 'REALSTARTDATE', type: 'date' },
                   { name: 'REALSTOPDATE', type: 'date' },
                   { name: 'CLCTNAME', type: 'string' },
                   { name: 'STNAME', type: 'string' },
                   { name: 'TAXNAME', type: 'string' },
                   { name: 'RATE1', type: 'integer' },
                   { name: 'ACCOUNTNO', type: 'string' },
                   { name: 'SERVICETYPE', type: 'string' },
                   { name: 'CITEMCODE', type: 'integer' },
                   { name: 'UCCode'.toUpperCase(), type: 'integer' },
                   { name: 'REALAMT'.toUpperCase(), type: 'integer' },
                   { name: 'TAXCODE'.toUpperCase(), type: 'integer' },
                   { name: 'TAXNAME'.toUpperCase(), type: 'string' },
                   { name: 'SIGN'.toUpperCase(), type: 'string' },
                   { name: 'COMBCITEMCODE'.toUpperCase(), type: 'integer' },
                   { name: 'COMBCITEMNAME'.toUpperCase(), type: 'string' },
                   { name: 'ShowFaci'.toUpperCase(), type: 'integer' },
                   { name: 'SMARTCARDNO'.toUpperCase(), type: 'string' },
                   { name: 'CMREFNO'.toUpperCase(), type: 'integer' },
                   { name: 'FACISNO'.toUpperCase(), type: 'string' },
                   { name: 'LinkToMIS'.toUpperCase(), type: 'string' },
                   { name: 'INVSEQNO',type:'integer'},

                ]
            };
            var dataAdapter1 = new $.jqx.dataAdapter(options.grdCust);
            var dataAdapter2 = new $.jqx.dataAdapter(options.grdBill);
            var custColumn = [];
            if (options.refNo != 4) {
                if (options.newflow === 1) {
                    custColumn = [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 30,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                        }
                    },
                    { text: lang.colMailAddress, datafield: 'MailAddress'.toUpperCase(), width: 230 },
                    { text: lang.colInvTitle, datafield: 'InvTitle'.toUpperCase(), width: 120 },
                    { text: lang.colBUSINESSID, datafield: 'InvNo'.toUpperCase(), width: 100 },
                    { text: lang.colINVADDR, datafield: 'InvAddress'.toUpperCase(), width: 230 },
                    { text: lang.colZIPCODE, datafield: 'ZIPCODE'.toUpperCase(), width: 80 },
                    { text: lang.colInvSeqNo, datafield: 'InvSeqNo'.toUpperCase(), width: 120 },
                    { text: 'InvoiceKind', datafield: 'InvoiceKind'.toUpperCase(), width: 100, hidden: true },
                    { text: lang.colInvoiceKind2, datafield: 'InvoiceKind2'.toUpperCase(), width: 100 },
                    { text: lang.colDENRECCODE, datafield: 'DENRECCODE'.toUpperCase(), width: 80 },
                    { text: lang.colDENRECNAME, datafield: 'DENRECNAME'.toUpperCase(), width: 150 },
                    { text: 'InvPurposeCode', datafield: 'InvPurposeCode'.toUpperCase(), width: 150, hidden: true },
                    { text: 'InvPurposeName', datafield: 'InvPurposeName'.toUpperCase(), width: 150, hidden: true },
                    { text: 'EMAIL', datafield: 'EMAIL'.toUpperCase(), width: 150, hidden: true },
                    { text: 'CarrierTypeCode', datafield: 'CarrierTypeCode'.toUpperCase(), width: 150, hidden: true },
                    { text: 'CarrierId1', datafield: 'CarrierId1'.toUpperCase(), width: 150, hidden: true },
                    { text: 'CarrierId2', datafield: 'CarrierId2'.toUpperCase(), width: 150, hidden: true },
                    { text: 'LoveNum', datafield: 'LoveNum'.toUpperCase(), width: 150, hidden: true },
                    { text: 'A_CarrierId1', datafield: 'A_CarrierId1'.toUpperCase(), width: 150, hidden: true },
                    { text: 'A_CarrierId2', datafield: 'A_CarrierId2'.toUpperCase(), width: 150, hidden: true },
                    { text: 'CustId', datafield: 'CUSTID'.toUpperCase(), width: 150, hidden: true },
                    { text: 'CustName', datafield: 'CUSTNAME'.toUpperCase(), width: 150, hidden: true },
                    ]
                } else {
                    custColumn = [
                   {
                       text: '#', sortable: false, filterable: false, editable: false,
                       groupable: false, draggable: false, resizable: false,
                       datafield: '', columntype: 'number', width: 30,
                       cellsrenderer: function (row, column, value) {
                           return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                       }
                   },
                    { text: lang.colMailAddress, datafield: 'MAILADDRESS'.toUpperCase(), width: 230 },
                    { text: lang.colSERVICETYPE, datafield: 'SERVICETYPE'.toUpperCase(), width: 80 },
                    { text: lang.colInvTitle, datafield: 'InvTitle'.toUpperCase(), width: 120 },
                    { text: lang.colBUSINESSID, datafield: 'BUSINESSID'.toUpperCase(), width: 120 },
                    { text: lang.colINVADDR, datafield: 'InvAddress'.toUpperCase(), width: 230 },
                    { text: lang.colINSTADDRESS, datafield: 'INSTADDRESS'.toUpperCase(), width: 230 },
                    { text: lang.colZIPCODE, datafield: 'ZIPCODE'.toUpperCase(), width: 80 },
                    { text: lang.colACCOUNTNO, datafield: 'ACCOUNTNO'.toUpperCase(), width: 150 },
                    { text: lang.colInvSeqNo, datafield: 'INVSEQNO'.toUpperCase(), width: 100 },
                    { text: 'InvoiceKind', datafield: 'InvoiceKind'.toUpperCase(), width: 100, hidden: true },
                    { text: lang.colINVOICEKIND, datafield: 'INVOICEKIND2'.toUpperCase(), width: 120 },
                    { text: lang.colDENRECCODE, datafield: 'DENRECCODE'.toUpperCase(), width: 80 },
                    { text: lang.colDENRECNAME, datafield: 'DENRECNAME'.toUpperCase(), width: 150 },
                    { text: 'CarrierTypeCode', datafield: 'CarrierTypeCode'.toUpperCase(), width: 150, hidden: true },
                    { text: 'CarrierId1', datafield: 'CarrierId1'.toUpperCase(), width: 150, hidden: true },
                    { text: 'CarrierId2', datafield: 'CarrierId2'.toUpperCase(), width: 150, hidden: true },
                    { text: 'LoveNum', datafield: 'LoveNum'.toUpperCase(), width: 150, hidden: true },
                    { text: 'A_CarrierId1', datafield: 'A_CarrierId1'.toUpperCase(), width: 150, hidden: true },
                    { text: 'A_CarrierId2', datafield: 'A_CarrierId2'.toUpperCase(), width: 150, hidden: true },
                    { text: 'CustId', datafield: 'CUSTID'.toUpperCase(), width: 150, hidden: true },
                    { text: 'CustName', datafield: 'CUSTNAME'.toUpperCase(), width: 150, hidden: true },
                   ]
                }
                
            } else {              
                 custColumn = [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 30,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                        }
                    },
                    { text: lang.colCustId, datafield: 'CUSTID'.toUpperCase(), width: 100 },
                    { text: lang.colCUSTSNAME, datafield: 'CUSTSNAME'.toUpperCase(), width: 180 },
                    { text: lang.colTITLESNAME, datafield: 'TITLESNAME'.toUpperCase(), width: 180 },
                    { text: lang.colTITLENAME, datafield: 'TITLENAME'.toUpperCase(), width: 250 },
                    { text: lang.colCUSTNAME, datafield: 'CUSTNAME'.toUpperCase(), width: 250 },
                    { text: lang.colBUSINESSID, datafield: 'BUSINESSID'.toUpperCase(), width: 120 },
                    { text: lang.colTEL1, datafield: 'TEL1'.toUpperCase(), width: 120, hidden: false },
                    { text: lang.colTEL2, datafield: 'TEL2'.toUpperCase(), width: 120 },
                    { text: lang.colTEL3, datafield: 'TEL3'.toUpperCase(), width: 120 },
                    { text: lang.colINVADDR, datafield: 'INVADDR'.toUpperCase(), width: 280 },
                    { text: lang.colMAILADDR, datafield: 'MAILADDR'.toUpperCase(), width: 280, hidden: false },
                    

                    ]                
            }
            $("#" + headerId + "grdCust").jqxGrid({
                width: '100%',
                height: '100%',
                //height: $("#" + headId + "partBUI").height() -35,
                source: dataAdapter1,
                sortable: true,
                altrows: true,
                columnsresize: true,
                //selectionmode: 'checkbox',
                columns:custColumn,
                localization: options.localization
            })
            $("#" + headerId + "grdBill").jqxGrid({
                width: '100%',
                height: $(options.container).height() - $("#" + headerId + "grdCust").height() - 95,
                //height: $("#" + headId + "partBUI").height() -35,
                source: dataAdapter2,
                sortable: true,
                altrows: true,
                columnsresize: true,
                editable: true,
                //selectionmode: 'checkbox',
                columns: [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 30,editable: false,
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
                        hidden:false,
                        align: 'center',
                        renderer: function (columnHeaderElement) {
                           //return  '<input type="checkbox" id=Checkbox" />'
                            
                        }
                    },
                    { text: lang.colsource, datafield: 'source'.toUpperCase(), width: 70, editable: false },
                    { text: lang.colBILLNO, datafield: 'BILLNO'.toUpperCase(), width: 140, editable: false },
                    { text: lang.colITEM, datafield: 'ITEM'.toUpperCase(), width: 50, editable: false },
                    { text: lang.colCITEMNAME, datafield: 'CITEMNAME'.toUpperCase(), width: 200, editable: false },
                    { text: lang.colSHOULDDATE, datafield: 'SHOULDDATE'.toUpperCase(), width: 100, editable: false, cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colSHOULDAMT, datafield: 'SHOULDAMT'.toUpperCase(), width: 100, editable: false },
                    { text: lang.colREALDATE, datafield: 'REALDATE'.toUpperCase(), width: 100, editable: false, cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colREALPERIOD, datafield: 'REALPERIOD'.toUpperCase(), width: 80, editable: false },
                    { text: lang.colREALSTARTDATE, datafield: 'REALSTARTDATE'.toUpperCase(), width: 110, editable: false, cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colREALSTOPDATE, datafield: 'REALSTOPDATE'.toUpperCase(), width: 110, editable: false, cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colCLCTNAME, datafield: 'CLCTNAME'.toUpperCase(), width: 120, editable: false },
                    { text: lang.colSTNAME, datafield: 'STNAME'.toUpperCase(), width: 150, editable: false },
                    { text: lang.colTAXNAME, datafield: 'TAXNAME'.toUpperCase(), width: 80, editable: false },
                    { text: lang.colRATE1, datafield: 'RATE1'.toUpperCase(), width: 100, editable: false },
                    { text: lang.colACCOUNTNO, datafield: 'ACCOUNTNO'.toUpperCase(), width: 150, editable: false },
                    { text: lang.colSERVICETYPE, datafield: 'SERVICETYPE'.toUpperCase(), width: 50, editable: false },
                    { text: 'CITEMCODE', datafield: 'CITEMCODE'.toUpperCase(), width: 100, hidden: true },
                    { text: 'source2', datafield: 'source2'.toUpperCase(), width: 100, hidden: true },
                    { text: 'UCCode', datafield: 'UCCode'.toUpperCase(), width: 100, hidden: true },
                    { text: 'REALAMT', datafield: 'REALAMT'.toUpperCase(), width: 100, hidden: true },
                    { text: 'TAXCODE', datafield: 'TAXCODE'.toUpperCase(), width: 100, hidden: true },
                    { text: 'SIGN', datafield: 'SIGN'.toUpperCase(), width: 100, hidden: true },
                    { text: 'COMBCITEMCODE', datafield: 'COMBCITEMCODE'.toUpperCase(), width: 100, hidden: true },
                    { text: 'COMBCITEMNAME', datafield: 'COMBCITEMNAME'.toUpperCase(), width: 100, hidden: true },
                    { text: 'SHOWFACI', datafield: 'ShowFaci'.toUpperCase(), width: 100, hidden: true },
                    { text: 'SMARTCARDNO', datafield: 'SMARTCARDNO'.toUpperCase(), width: 100, hidden: true },
                    { text: 'CMREFNO', datafield: 'CMREFNO'.toUpperCase(), width: 100, hidden: true },
                    { text: 'FACISNO', datafield: 'FACISNO'.toUpperCase(), width: 100, hidden: true },                    
                    { text: 'LinkToMIS', datafield: 'LinkToMIS'.toUpperCase(), width: 100, hidden: true },
                    { text: lang.colInvSeqNo, datafield: 'INVSEQNO'.toUpperCase(), width: 120, hidden: false, editable: false },


                ],
                localization: options.localization
            })
            //var height1 = $('#' + headerId + 'trCustId')
            if (options.refNo == 4) {
                $('#' + headerId + 'trCustId').css('height', '100%');
                $('#' + headerId + 'grdBill').hide();
            };
            
            return d.resolve(div);
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
            d.reject('renderControl');
        }
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
    function grdRowDobuleClick(event) {

        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if (options.canMutilChoose) { return; };
        if ($(this).jqxGrid('disabled')) { return; };
        //options.faciSeqNO = $(this).jqxGrid('getcellvalue', event.args.rowindex, 'SEQNO');
        //options.faciSNO = $(this).jqxGrid('getcellvalue', event.args.rowindex, 'FACISNO');
        var row = $(this).jqxGrid('getrowdata', event.args.rowindex);

        options.inv099 = row
        options.isSaved = true;
        $(options.container).csWindow('close');

    };
    function formDestroy(div) {
        var options = $.data(div, formName).options;
        var headId = $(div).attr('id');
        try {

            var controls = $.data(div, formName).options.controls;
            unHandler(div);
            $(div).find('*').off();
            
           // $("#" + headId + "Inv099grid").unbind('rowdoubleclick');
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

           

            changeElementId(div);
            try {
                var options = $.data(div, formName).options;
                loadForm(options,
                    'INV1000\\' + formName + '.html',
                    function (msg) {
                        try {
                            $(div).html(msg);
                            changeElementId(div);
                            $(options.container).on('keydown', function (e) {
                                try {
                                    if (e.ctrlKey && e.which == 119) {
                                        messageBox(formName + JSON.stringify(options, null, '\t'), null, null, null, { width: 800, height: 500 });
                                    }
                                }
                                catch (err) {
                                    //errorHandle(formName, 'frmAddHandler_keydown', err, true);
                                }
                            });
                            initData(div, options.editMode, function () {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    options.containerIsWindow = true;
                                    var csw = $.data(div, formName).options.container;
                                    csw.on("winClosing", function () {
                                        csw.csWindow('close');
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
    }
    function QuerySOInfo(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);
        var options = $.data(div, formName).options;
        var d = $.Deferred();
        var methodName = 'QuerySOCustInfo';
        try {
            if (options.refNo == 4) {
                methodName = 'QuerySOCustByQuery';
            };
           
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');

            var parameters = $.extend({}, loginInfo,
                    { CustId: { type: 'string', value: options.parameters.custid } },
                    { existsBillNo: { type: 'string', value: options.parameters.existsbill } });

            if (options.refNo == 4) {
                 parameters = $.extend({}, loginInfo,
                    { QueryIndex: { type: 'integer', value:1 } },
                    { QueryText: { type: 'string', value: options.parameters.custid } },
                    { RefNo: { type: 'integer', value: options.refNo } });
            };

            var params = getParameters(riadllName,
                   riaClassName,
                  methodName,
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            options.initData = null;
                            options.initData = {};
                            $.extend(true, options.initData, tmp)
                            if (options.refNo != 4 && options.newflow != 1) {                                
                                options.initData.QUERY.rows = options.initData.QUERY.rows.slice(0, 1);
                            };
                            $(headerId + 'csQuery').csList('source', options.initData.QUERY.rows);
                            $(headerId + 'csQuery').csList('codeNo', 1);
                            //options.so001 =
                            if (typeof act === 'function') { act() }
                            return d.resolve(div);


                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            //changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'QuerySOInfo-Server', err);
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
            errorHandle(formName, 'QuerySOInfo', err);
            d.reject('QuerySOInfo')
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function changeMode(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var d = $.Deferred();
        if (options.parameters.custid && options.parameters.inv008.length > 0) {
            $(headerId + 'csQuery').csList('disabled', true);
            $(headerId + 'txtQuery').jqxInput({ disabled: true });
            $(headerId + 'btnQuery').jqxButton({ disabled: true });
        } else {
            if (options.parameters.custid && options.parameters.custid != '-11') {
                $(headerId + 'txtQuery').val(options.parameters.custid);
            };
        };
        if (options.lock) {
            $(headerId + 'csQuery').csList('disabled', true);
            $(headerId + 'txtQuery').jqxInput({ disabled: true });
            $(headerId + 'btnQuery').jqxButton({ disabled: true });
        };
        return d.resolve(div);
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        changeLanguage(div);
       
        //.then()
        //.then(QueryBillIInfo)
        //.then(refreshBILLGrid)
        
        
        

        try {
            $.when(renderControl(div))
            .then(QuerySOInfo)
            .then(addHandler)
            .then(refreshSO138Grid)
            .then(changeMode)
            .always(function () { options.bill = [] })
    //        console.log('load')
        } catch (err) {
            errorHandle(formName, 'initData', err);

        } finally {
            if ($.isFunction(action)) { action(); };
        }
    };
    

}(jQuery))