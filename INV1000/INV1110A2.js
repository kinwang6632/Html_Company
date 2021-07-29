(function ($) {
    var formName = 'INV1110A2';
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
        this.grdMaster = {};
        this.grdDetail = {};
        this.scrQuery = {};
        this.dataType = 1;
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
                            options: $.extend({}, new defaults(), new INV1110A2(), options)
                        });
                        findClick = false;
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.INV1110A2_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.INV1110A2', err);
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
    
    
    
    
    
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = $(div).prop('id');
        var d = $.Deferred();
        try {
            options.grdMaster = {
                datatype: "json",
                datafields: [
                 { name: 'SEQ', type: 'string' },
                 { name: 'CUSTID'.toUpperCase(), type: 'string' },
                 { name: 'TITLE'.toUpperCase(), type: 'string' },
                 { name: 'TEL'.toUpperCase(), type: 'string' },
                 { name: 'BUSINESSID'.toUpperCase(), type: 'string' },
                 { name: 'ZIPCODE'.toUpperCase(), type: 'string' },
                 { name: 'INVADDR'.toUpperCase(), type: 'string' },
                 { name: 'MAILADDR'.toUpperCase(), type: 'string' },
                 { name: 'CHARGEDATE'.toUpperCase(), type: 'date' },
                 { name: 'MAILADDR'.toUpperCase(), type: 'string' },                 
                 { name: 'DESCRIPTION'.toUpperCase(), type: 'string' },
                 { name: 'TAXRATE'.toUpperCase(), type: 'integer' },
                 { name: 'SALEAMOUNT'.toUpperCase(), type: 'integer' },
                 { name: 'TAXAMOUNT'.toUpperCase(), type: 'integer' },
                 { name: 'INVAMOUNT'.toUpperCase(), type: 'integer' },
                 { name: 'HOWTOCREATE'.toUpperCase(), type: 'string' },
                 { name: 'CHARGETITLE'.toUpperCase(), type: 'string' },
                 { name: 'UPTTIME'.toUpperCase(), type: 'date' },
                 { name: 'UPTEN'.toUpperCase(), type: 'string' },
                 
                ],
            };
            options.grdDetail = {
                datatype: "json",
                datafields: [
                 { name: 'SEQ', type: 'string' },
                 { name: 'BILLID'.toUpperCase(), type: 'string' },
                 { name: 'BILLIDITEMNO'.toUpperCase(), type: 'integer' },
                 { name: 'TAXDESCRIPTION'.toUpperCase(), type: 'string' },
                 { name: 'CHARGEDATE'.toUpperCase(), type: 'date' },
                 { name: 'ITEMDESCRIPTION'.toUpperCase(), type: 'string' },
                 { name: 'QUANTITY'.toUpperCase(), type: 'integer' },
                 { name: 'UNITPRICE'.toUpperCase(), type: 'integer' },
                 { name: 'TAXRATE'.toUpperCase(), type: 'integer' },
                 { name: 'TAXAMOUNT'.toUpperCase(), type: 'integer' },
                 { name: 'TOTALAMOUNT'.toUpperCase(), type: 'integer' },
                 { name: 'STARTDATE'.toUpperCase(), type: 'date' },
                 { name: 'ENDDATE'.toUpperCase(), type: 'date' },
                 { name: 'CHARGEEN'.toUpperCase(), type: 'string' },
                 { name: 'SERVICETYPE'.toUpperCase(), type: 'string' },
                 

                ],
            };
            var dataAdapter1 = new $.jqx.dataAdapter(options.grdMaster);
            var dataAdapter2 = new $.jqx.dataAdapter(options.grdDetail);
            $('#' + headerId + "grdMaster").jqxGrid({
                width: '100%',
                height: '100%',
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
                    { text: lang.colSEQ, datafield: 'SEQ'.toUpperCase(), width: 130 },
                    { text: lang.colCustId, datafield: 'CUSTID'.toUpperCase(), width: 80 },
                    { text: lang.colTitle, datafield: 'TITLE'.toUpperCase(), width: 200 },
                    { text: lang.colTEL, datafield: 'TEL'.toUpperCase(), width: 100 },
                    { text: lang.colBUSINESSID, datafield: 'BUSINESSID'.toUpperCase(), width: 100 },
                    { text: lang.colZIPCODE, datafield: 'ZIPCODE'.toUpperCase(), width: 80 },
                    { text: lang.colINVADDR, datafield: 'INVADDR'.toUpperCase(), width: 250 },
                    { text: lang.colMAILADDR, datafield: 'MAILADDR'.toUpperCase(), width: 250 },
                    { text: lang.colCHARGEDATE, datafield: 'CHARGEDATE'.toUpperCase(), width: 110, cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colDESCRIPTION, datafield: 'DESCRIPTION'.toUpperCase(), width: 60 },
                    { text: lang.colTAXRATE, datafield: 'TAXRATE'.toUpperCase(), width: 60 },
                    { text: lang.colSALEAMOUNT, datafield: 'SALEAMOUNT'.toUpperCase(), width: 80 },
                    { text: lang.colTAXAMOUNT, datafield: 'TAXAMOUNT'.toUpperCase(), width: 80 },
                    { text: lang.colINVAMOUNT, datafield: 'INVAMOUNT'.toUpperCase(), width: 80 },
                    { text: lang.colHOWTOCREATE, datafield: 'HOWTOCREATE'.toUpperCase(), width: 80 },
                    { text: lang.colCHARGETITLE, datafield: 'CHARGETITLE'.toUpperCase(), width: 70 },
                    { text: lang.colUPTTIME, datafield: 'UPTTIME'.toUpperCase(), width: 160, cellsformat: 'yyyy/MM/dd HH:mm:ss' },
                    { text: lang.colUPTEN, datafield: 'UPTEN'.toUpperCase(), width: 80 },
                    
                    
                ],
                localization: options.localization
            });
            controls.push({ name: headerId + 'grdMaster', type: 'jqxGrid', level: 1 });
            $('#' + headerId + "grdDetail").jqxGrid({
                width: '100%',
                height: '100%',
                //height: $("#" + headId + "partBUI").height() -35,
                 source: dataAdapter2,
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
                    { text: lang.colBILLID, datafield: 'BILLID'.toUpperCase(), width: 150 },
                    { text: lang.colBILLIDITEMNO, datafield: 'BILLIDITEMNO'.toUpperCase(), width: 50 },
                    { text: lang.colITEMDESCRIPTION, datafield: 'ITEMDESCRIPTION'.toUpperCase(), width: 130 },
                    { text: lang.colCHARGEDATE, datafield: 'CHARGEDATE'.toUpperCase(), width: 100, cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colTAXDESCRIPTION, datafield: 'TAXDESCRIPTION'.toUpperCase(), width: 60 },
                    { text: lang.colTAXRATE, datafield: 'TAXRATE'.toUpperCase(), width: 60 },
                    { text: lang.colQUANTITY, datafield: 'QUANTITY'.toUpperCase(), width: 60 },
                    { text: lang.colUNITPRICE, datafield: 'UNITPRICE'.toUpperCase(), width: 80 },
                    { text: lang.colTAXAMOUNT, datafield: 'TAXAMOUNT'.toUpperCase(), width: 80 },
                    { text: lang.colTOTALAMOUNT, datafield: 'TOTALAMOUNT'.toUpperCase(), width: 80 },
                    { text: lang.colSTARTDATE, datafield: 'STARTDATE'.toUpperCase(), width: 100, cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colENDDATE, datafield: 'ENDDATE'.toUpperCase(), width: 100, cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colCHARGEEN, datafield: 'CHARGEEN'.toUpperCase(), width: 100 },
                    { text: lang.colSERVICETYPE, datafield: 'SERVICETYPE'.toUpperCase(), width: 70 },                              
                ],
                localization: options.localization
            });
            controls.push({ name: headerId + 'grdDetail', type: 'jqxGrid', level: 1 });

            $('#' + headerId + 'btnExit').jqxButton($.extend({}, imagePosition, {
                width: 80,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.exit.imgSrc,
                height: 25
            }));
            controls.push({ name: headerId + 'btnExit', type: 'jqxButton', level: 1 });

         
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
    
    
    
    
    
    
    
    
    
    function unHandler(div, action) {
        var headerId =  $(div).attr('id');
        $('#' + headerId + 'txtStartInvDate,#' + headerId + 'txtEndInvDate,#' + headerId + 'txtInvDate').off('blur');
        $('#' + headerId + 'csHowtoCreate').off('selectedIndexChanged');
        $('#' + headerId + 'chkSameInvDate').off('change');
        $("#" + headerId + "grdUsefulInv").off('rowdoubleclick');
        $('#' + headerId + 'csCreateKind').off('selectedIndexChanged');
        $('#' + headerId + 'btnReset').off('click');
        $('#' + headerId + 'btnQuery').off('click');
        $('#' + headerId + 'grdMaster').off('rowselect');
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
    
    
    
    
    
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = $(div).attr('id');
        var lang = options.language;
        var d = $.Deferred();        
        try {
            $('#' + headerId + 'grdMaster').off('rowselect');
            $('#' + headerId + 'grdMaster').on('rowselect', function (e) {
                QueryDetail(div, e.args.row.SEQ);
            });
            $('#' + headerId + 'btnExit').one('click',()=>  $(options.container).csWindow('close'));
               
            
           
          
            
            
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
                                            messageBox(options.language.QuitAsk, messageType.yesno, null, function (flag) {
                                                if (flag == 'yes') {
                                                    options.closingOK = true;
                                                    options.isSaved = false;
                                                    csw.csWindow('close');

                                                } else {
                                                    // changeMode(div, options.editMode);
                                                };
                                            });
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
    function QueryDetail(div,SEQ, act) {
        var loginInfo = getParaLoginInfo(div, formName);
        var d = $.Deferred();

        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');

            var parameters = $.extend({}, loginInfo,
                { SEQ: { type: 'string', value: SEQ } },
                { dataType: { type: 'integer', value: options.dataType } });


            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryExceptInvDetail',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            
                            options.grdDetail.localdata = tmp.DETAIL;
                            
                            $(headerId + 'grdDetail').jqxGrid('updatebounddata');
                           
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            return d.reject('QueryExceptInvDetail')
                            //changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryExceptInvDetail-Server', err);
                        return d.reject('QueryExceptInvDetail')
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
            errorHandle(formName, 'QueryExceptInvDetail', err);
            return d.reject('QueryExceptInvDetail');
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function QueryData(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);
        var d = $.Deferred();

        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');

            var parameters = $.extend({}, loginInfo,
                { ds: { type: 'string', value: options.scrQuery } },
                { dataType: {type:'integer',value:options.dataType}});


            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryExceptInvInfo',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            $(headerId + 'grdMaster').one('bindingcomplete', function (event) {
                                $(this).jqxGrid({ selectedrowindex: 0 })
                                return d.resolve(div);
                            });
                            $(headerId + 'grdDetail').one('bindingcomplete', function (event) {
                                $(this).jqxGrid({ selectedrowindex: 0 })
                                
                            });
                            options.grdMaster.localdata = tmp.MASTER;
                            options.grdDetail.localdata = tmp.DETAIL;
                            $(headerId + 'grdMaster').jqxGrid('updatebounddata');
                            $(headerId + 'grdDetail').jqxGrid('updatebounddata');
                            //console.log('y');

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
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');       
            try {            
                changeLanguage(div);
                $.when(renderControl(div))
                .then(QueryData)
                .done(addHandler)
               // .then(QueryAllData)
               // .then(addHandler)
               ////.then(refreshGrdUsefulInv)
               // .done(action)
               // .fail(function (fnName) { console.log(fnName) })

               
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
