(function ($) {
    var formName = 'INV1120A13';
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
        this.inv008 = {};
        
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
    $.fn.INV1120A13 = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new INV1120A13(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.INV1120A13_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.INV1120A11', err);
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
    function formDestroy(div) {
        var options = $.data(div, formName).options;
        var headId = $(div).attr('id');
        try {
            unHandler(div);
            $(div).find('*').off();            
            var controls = $.data(div, formName).options.controls;            
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
    
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        //if (options.editMode != editMode.append) {
        //    if (options.parameters.INV007 != undefined) {
        //        if (options.parameters.INV007.rows.length > 0) {
        //            options.InvId = options.parameters.INV007.rows[0].INVID
        //        }

        //    };
        //}


        try {

            changeLanguage(div);
            $.when(renderControl(div))
            .then(QueryEditData)
            .then(rcdToscr)
            .then(changeMode)
            //.then(function () { alert('ok') })
            .done(addHandler)
            //$.when(renderControl(div), QueryData(div))
            
            //.then(renderDynmicGrid)
            //.then(rcdToscr)
            //.then(setCsInvUseId)
            //.then(changeMode)
            //.then(addHandler)

            //.fail(function (fnName) { console.log(fnName) })

            


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
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = $(div).prop('id');
        var d = $.Deferred();
        try {

            $('#' + headerId + 'txtBillID').jqxInput({ width: '98%', height: 25 })
            controls.push({ name: headerId + 'txtBillID', type: 'jqxInput', level: 1 });

            $('#' + headerId + 'txtBillIDItemNo').jqxMaskedInput({
                mask: '99999999',
                promptChar: '',
                width: '98%'
            })
            controls.push({ name: headerId + 'txtBillIDItemNo', type: 'jqxMaskedInput', level: 1 });

            $('#' + headerId + 'txtStartDate').csDateTime({ width: '100%', height: 25 })
            controls.push({ name: headerId + 'txtStartDate', type: 'csDateTime', level: 1 });

            $('#' + headerId + 'txtEndDate').csDateTime({ width: '100%', height: 25 })
            controls.push({ name: headerId + 'txtEndDate', type: 'csDateTime', level: 1 });

            $("#" + headerId + "csServiceType").csList({
                source: null,
                codeNoWidth: 50,
                width: '100%',
                height: 25,
                showColumnHeaders: false,

                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false
            });
            controls.push({ name: headerId + 'csServiceType', type: 'csList', level: 1 });

            $("#" + headerId + "csItemID").csList({
                source: null,
                codeNoWidth: 50,
                width: '100%',
                height: 25,
                showColumnHeaders: false,

                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false
            });
            controls.push({ name: headerId + 'csItemID', type: 'csList', level: 1 });

            $("#" + headerId + "txtQuantity").jqxNumberInput({
                width: '100%',
                height: 25,
                inputMode: 'simple',
                spinButtons: true,
                digits: 6,
                decimalDigits: 0,
                min: 1
            })
            controls.push({ name: headerId + 'txtQuantity', type: 'jqxNumberInput', level: 1 });

            $("#" + headerId + "txtUnitPrice").jqxNumberInput({
                width: '100%',
                height: 25,
                inputMode: 'simple',
                //spinButtons: true,
                digits: 10,
                decimalDigits: 0,
               // min: 0
            })
            controls.push({ name: headerId + 'txtUnitPrice', type: 'jqxNumberInput', level: 1 });

            $("#" + headerId + "txtTaxAmount").jqxNumberInput({
                width: '100%',
                height: 25,
                inputMode: 'simple',
                //spinButtons: true,
                disabled:false,
                digits: 10,
                decimalDigits: 0,
                //min: 0
            })
            controls.push({ name: headerId + 'txtTaxAmount', type: 'jqxNumberInput', level: 1 });

            $("#" + headerId + "txtTotalAmount").jqxNumberInput({
                width: '100%',
                height: 25,
                inputMode: 'simple',
                //spinButtons: true,
                disabled:false,
                digits: 10,
                decimalDigits: 0,
               // min: 0
            })
            controls.push({ name: headerId + 'txtTotalAmount', type: 'jqxNumberInput', level: 1 });

            $("#" + headerId + "txtSaleAmount").jqxNumberInput({
                width: '100%',
                height: 25,
                inputMode: 'simple',
                disabled:false,
                //spinButtons: true,
                digits: 10,
                decimalDigits: 0,
                //min: 0
            })
            controls.push({ name: headerId + 'txtSaleAmount', type: 'jqxNumberInput', level: 1 });

            $('#' + headerId + 'txtFacisNo').jqxInput({ width: '98%', height: 25 });
            controls.push({ name: headerId + 'txtFacisNo', type: 'jqxInput', level: 1 });

            $('#' + headerId + 'txtAccountNo').jqxInput({ width: '98%', height: 25 })
            controls.push({ name: headerId + 'txtAccountNo', type: 'jqxInput', level: 1 });

            $('#' + headerId + 'txtSmartCardNo').jqxInput({ width: '98%', height: 25 })
            controls.push({ name: headerId + 'txtSmartCardNo', type: 'jqxInput', level: 1 });

            $('#' + headerId +'txtCMMac').jqxInput({ width: '98%', height: 25 })
            controls.push({ name: headerId + 'txtCMMac', type: 'jqxInput', level: 1 });
            $('#' + headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 80,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.save.imgSrc,
                height: 25
            }));
            $('#' + headerId + 'btnOK > img').css('top', '2px');
            controls.push({ name: headerId + 'btnOK', type: 'jqxButton', level: 1 });
            $('#' + headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                width: 80,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.cancel.imgSrc,

                height: 25
            }));
            $('#' + headerId + 'btnCancel > img').css('top', '2px');
            controls.push({ name: headerId + 'btnCancel', type: 'jqxButton', level: 1 });
          
            return d.resolve(div);
        } catch (err) {

            errorHandle(formName, 'renderControl', err);
            return d.reject('renderControl')
        }


    };

    function QueryEditData(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);
        var d = $.Deferred();
        
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');

            var parameters = $.extend({}, loginInfo)
                     


            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryEditData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            $(headerId + 'csServiceType').csList("source", tmp.SERVICETYPE.rows)
                            var inv005 = tmp.INV005.rows.filter(function (v) {
                                if (v.TAXCODE == options.parameters.taxcode) {
                                    return true
                                } else {
                                    return false;
                                };
                            });

                            $(headerId + 'csItemID').csList("source", inv005);
                           // options.initData = null;
                           // options.initData = {};
                           // $.extend(options.initData, tmp)

                           // $(headerId + 'csGiveUnitId').csList('source', options.initData['INV041'].rows)

                            if (typeof act === 'function') { act() }
                            //setCsInvUseId(div);

                            return d.resolve(div);

                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            return d.reject('QueryData')
                            //changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryData-Server', err);
                        return d.reject('QueryData')
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
            errorHandle(formName, 'QueryData', err);
            return d.reject('QueryData');
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function caculatePrice(headerId,event,rate,sign,div) {
        try {
            if (headerId.indexOf('#') == -1) {headerId = '#' + headerId}
            var ds = {
                TAXAMOUNT: $(headerId + 'txtTaxAmount').jqxNumberInput('getDecimal'),
                TOTALAMOUNT: $(headerId + 'txtTotalAmount').jqxNumberInput('getDecimal'),
                QUANTITY: $(headerId + 'txtQuantity').jqxNumberInput('getDecimal'),
                UNITPRICE: $(headerId + 'txtUnitPrice').jqxNumberInput('getDecimal'),
                SALEAMOUNT: $(headerId + 'txtSaleAmount').jqxNumberInput('getDecimal'),
                RATE: rate,
                KIND: null,
                SIGN:sign,
            };
            switch ('#' + this.id.toUpperCase()) {
                case (headerId + 'txtQuantity').toUpperCase():
                    ds.KIND = 'QUANTITY';
                    ds.QUANTITY = event.args.value;
                    break;
                case (headerId + 'txtTaxAmount').toUpperCase():
                    ds.KIND = 'TAXAMOUNT';
                    ds.TAXAMOUNT = event.args.value;
                    break;
                case (headerId + 'txtTotalAmount').toUpperCase():
                    ds.KIND = 'TOTALAMOUNT';
                    ds.TOTALAMOUNT = event.args.value;
                    break;
                case (headerId + 'txtUnitPrice').toUpperCase():
                    ds.KIND = 'UNITPRICE';
                    ds.UNITPRICE = event.args.value;
                    break;
                case (headerId + 'txtSaleAmount').toUpperCase():
                    ds.KIND = 'SALEAMOUNT';
                    ds.SALEAMOUNT = event.args.value;
                    break;
            };
            var data = $.fn.INV1120A1('caculatePrice', ds);
            unHandler(div);
            $(headerId + 'txtTaxAmount').val(data.TAXAMOUNT);
            $(headerId + 'txtTotalAmount').val(data.TOTALAMOUNT);
            $(headerId + 'txtQuantity').val(data.QUANTITY);
            $(headerId + 'txtUnitPrice').val(data.UNITPRICE);
            $(headerId + 'txtSaleAmount').val(data.SALEAMOUNT);
            addHandler(div);
            
        } catch (err) {

        }
    }
    function unHandler(div) {
        var headerId = $(div).attr('id');
        
        $("#" + headerId + "txtQuantity," + "#" + headerId + "txtTaxAmount," + "#" + headerId + "txtTotalAmount,"
            + "#" + headerId + "txtUnitPrice," + "#" + headerId + "txtSaleAmount").off('valueChanged');
        $('#' + headerId + 'csItemID').off('selectedIndexChanged');
        $('#' + headerId + 'btnOK').off('click');
        $('#' + headerId + 'btnCancel').off('click');
    };
    function addHandler(div) {
        var headerId = $(div).attr('id');
        var options = $.data(div, formName).options;
        $("#" + headerId + "txtQuantity," + "#" + headerId + "txtTaxAmount," + "#" + headerId + "txtTotalAmount,"
            + "#" + headerId + "txtUnitPrice," + "#" + headerId + "txtSaleAmount").on('valueChanged', function (event) {
                caculatePrice.apply(this, ['#' + headerId, event,
                                options.parameters.rate,
                                options.parameters.inv008.SIGN || '+', div]);
            });
        
        $('#' + headerId + 'csItemID').on('selectedIndexChanged', function () {
            unHandler(div);
            if ($(this).csList('codeNo')) {
                options.parameters.inv008.SIGN = $(this).csList('selectedItem').SIGN || '+';
            } else { options.parameters.inv008.SIGN = '+' };
            
            var TaxAmount = options.parameters.inv008.SIGN == '+' ? Math.abs($("#" + headerId + "txtTaxAmount").jqxNumberInput('getDecimal')) : Math.abs($("#" + headerId + "txtTaxAmount").jqxNumberInput('getDecimal')) * -1;
            var TotalAmount = options.parameters.inv008.SIGN == '+' ? Math.abs($("#" + headerId + "txtTotalAmount").jqxNumberInput('getDecimal')) : Math.abs($("#" + headerId + "txtTotalAmount").jqxNumberInput('getDecimal')) * -1;
            var UnitPrice = options.parameters.inv008.SIGN == '+' ? Math.abs($("#" + headerId + "txtUnitPrice").jqxNumberInput('getDecimal')) : Math.abs($("#" + headerId + "txtUnitPrice").jqxNumberInput('getDecimal')) * -1;
            var SaleAmount = options.parameters.inv008.SIGN == '+' ? Math.abs($("#" + headerId + "txtSaleAmount").jqxNumberInput('getDecimal')) : Math.abs($("#" + headerId + "txtSaleAmount").jqxNumberInput('getDecimal')) * -1;
            $("#" + headerId + "txtTaxAmount").jqxNumberInput('setDecimal', TaxAmount);
            $("#" + headerId + "txtTotalAmount").jqxNumberInput('setDecimal', TotalAmount);
            $("#" + headerId + "txtUnitPrice").jqxNumberInput('setDecimal', UnitPrice);
            $("#" + headerId + "txtSaleAmount").jqxNumberInput('setDecimal', SaleAmount);
            
            addHandler(div);
        });

        $('#' + headerId + 'btnOK').on('click', function (e) {
            if ($(this).jqxButton('disabled')) { return; }
            if (!vaildSave(div)) { return };
            options.inv008 = {};
            options.inv008 = $.extend(true, options.inv008, options.parameters.inv008);
            options.inv008.QUANTITY =$('#'+headerId + 'txtQuantity').jqxNumberInput('getDecimal');
            options.inv008.TAXAMOUNT = $('#'+headerId + 'txtTaxAmount').jqxNumberInput('getDecimal');
            options.inv008.TOTALAMOUNT = $('#'+headerId + 'txtTotalAmount').jqxNumberInput('getDecimal');
            options.inv008.UNITPRICE = $('#'+headerId + 'txtUnitPrice').jqxNumberInput('getDecimal');
            options.inv008.SALEAMOUNT = $('#'+headerId + 'txtSaleAmount').jqxNumberInput('getDecimal');
            options.inv008.BILLID = $('#' + headerId + 'txtBillID').val() ? $('#' + headerId + 'txtBillID').val() : null;
            options.inv008.BILLIDITEMNO = $('#' + headerId + 'txtBillIDItemNo').val() ? $('#' + headerId + 'txtBillIDItemNo').val() : null;
            options.inv008.STARTDATE = $('#' + headerId + 'txtStartDate').csDateTime('getDate') || null;
            options.inv008.ENDDATE = $('#' + headerId + 'txtEndDate').csDateTime('getDate') || null;
            options.inv008.SERVICETYPE = $("#" + headerId + "csServiceType").csList('description') ? $("#" + headerId + "csServiceType").csList('description') : null;
            options.inv008.ITEMID = $("#" + headerId + "csItemID").csList('codeNo') || null;
            options.inv008.DESCRIPTION = $("#" + headerId + "csItemID").csList('description') || null;
            options.inv008.FACISNO = $('#' + headerId + 'txtFacisNo').val() ? $('#' + headerId + 'txtFacisNo').val() : null;
            options.inv008.SMARTCARDNO = $('#' + headerId + 'txtSmartCardNo').val() ? $('#' + headerId + 'txtSmartCardNo').val() : null;
            options.inv008.ACCOUNTNO = $('#' + headerId + 'txtAccountNo').val() ? $('#' + headerId + 'txtAccountNo').val() : null;
            options.inv008.CMMAC = $('#' + headerId + 'txtCMMac').val() ? $('#' + headerId + 'txtCMMac').val() : null;
            options.inv008['LinkToMIS'.toUpperCase()] = options.inv008['LinkToMIS'.toUpperCase()] || 'N';
            if (options.inv008['newAdd'.toUpperCase()] != undefined && options.inv008['newAdd'.toUpperCase()] != null) {
                options.inv008['newAdd'.toUpperCase()] = options.inv008['newAdd'.toUpperCase()];
            } else { options.inv008['newAdd'.toUpperCase()] = 1 };
            
           
            options.inv008['TAXCODE'.toUpperCase()] = $("#" + headerId + "csItemID").csList('selectedItem').TAXCODE || 0;
            options.inv008['TAXNAME'.toUpperCase()] = $("#" + headerId + "csItemID").csList('selectedItem').TAXNAME || 0;
            options.inv008['SIGN'.toUpperCase()] = $("#" + headerId + "csItemID").csList('selectedItem').SIGN || '+';
            options.inv008['SOURCE'.toUpperCase()] = null;
            options.inv008['COMBCITEMCODE'.toUpperCase()] = $("#" + headerId + "csItemID").csList('selectedItem').ITEMIDREF;
            options.inv008['COMBCITEMNAME'.toUpperCase()] = $("#" + headerId + "csItemID").csList('selectedItem').ITEMIDREFDESC;
            
            
           

            options.isSaved = true;
            $(options.container).csWindow('close');
        });
        $('#' + headerId + 'btnCancel').on('click', function (e) {
            options.isSaved = false;
            $(options.container).csWindow('close');
        });
    };
    function vaildSave(div) {
        var lang = $.data(div, formName).options.language;
        var headerId = $(div).attr('id');
        if ($('#'+headerId + 'txtUnitPrice').jqxNumberInput('getDecimal') == 0) {
            messageBox(lang.mustPrice, messageType.critical, null, function () {
                $('#' + headerId + 'txtUnitPrice').jqxNumberInput('focus');
            });
            return false;
        };
        if (!$("#" + headerId + "csItemID").csList('codeNo')) {
            messageBox(lang.mustItemId, messageType.critical, null, function () {
                $('#' + headerId + 'csItemID').csList('focus');
            });
            return false;
        }
        return true;
    };
    function changeMode(div) {
        var options = $.data(div, formName).options;

        //var lang = options.language;
        var headerId = $(div).prop('id');
        //var ds = options.parameters.inv008;
        var d = $.Deferred();

        try {
            //if (options.getParameters.inv008['LinkToMIS'])


            return d.resolve(div);
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
            return d.reject('changeMode');
        };
    };
    function rcdToscr(div) {
        var options = $.data(div, formName).options;
        
        //var lang = options.language;
        var headerId = $(div).prop('id');
        var ds = options.parameters.inv008;
        var d = $.Deferred();
        try {
            
            $('#' + headerId + 'txtBillID').val(ds['BillID'.toUpperCase()]);
            $('#' + headerId + 'txtBillIDItemNo').val(ds['BillIDItemNo'.toUpperCase()]);
            $('#' + headerId + 'txtStartDate').csDateTime('setDate', ds['StartDate'.toUpperCase()] || null);
            $('#' + headerId + 'txtEndDate').csDateTime('setDate', ds['EndDate'.toUpperCase()] || null);
            $('#' + headerId + 'csServiceType').csList("description", ds['ServiceType'.toUpperCase()] || null);
            $('#' + headerId + 'csItemID').csList("setDisplayValue",  {CODENO:ds['ItemID'.toUpperCase() || ''],DESCRIPTION:ds['DESCRIPTION'] || ''})
            $('#' + headerId + 'txtQuantity').val(parseInt(ds['Quantity'.toUpperCase()]) || 0);
            $('#' + headerId + 'txtUnitPrice').val(parseInt(ds['UnitPrice'.toUpperCase()]) || 0);
            $('#' + headerId + 'txtTaxAmount').val(parseInt(ds['TaxAmount'.toUpperCase()]) || 0);
            $('#' + headerId + 'txtTotalAmount').val(parseInt(ds['TotalAmount'.toUpperCase()]) || 0);
            $('#' + headerId + 'txtSaleAmount').val(parseInt(ds['SaleAmount'.toUpperCase()]) || 0);
            $('#' + headerId + 'txtFacisNo').val(ds['FacisNo'.toUpperCase()]);
            $('#' + headerId + 'txtAccountNo').val(ds['AccountNo'.toUpperCase()] || '');
            $('#' + headerId + 'txtSmartCardNo').val(ds['SmartCardNo'.toUpperCase()] || '');
            $('#' + headerId + 'txtCMMac').val(ds['CMMac'.toUpperCase()] || '');
            
         
            return  d.resolve(div);
        } catch (err) {
      
            errorHandle(formName, 'renderControl', err);
            return d.reject('rcdToscr')
        };
    };
    
    function formLoaded(div) {
        try {
            try {
                var options = $.data(div, formName).options;
                copyLoginInfo = getParaLoginInfo(div, formName);
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
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    }
    
    
}(jQuery))
