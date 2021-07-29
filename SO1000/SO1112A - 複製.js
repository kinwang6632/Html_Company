(function ($) {
    var formName = "SO1112A";
    var riadllName = "CableSoft.SO.RIA.Wip.Maintain.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Wip.Maintain.Web.Maintain";
    var defaults = (function () {
        this.language = {};
        this.returnValue = {};
        this.initData = {};
        this.detailData = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.refNo = 0;
        this.parameters = {};
        this.controls = [];
        this.isSaved = false;
        this.finMode = true;
        this.IsAutoClosed = true;
        this.containerIsWindow = false;
        this.theme = '';
    })
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
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
            return canView(params, param2);            
        },
        canAppend: function (jq, params, param2) {
            return canAppend(params, param2);
        },
        canEdit: function (jq, params, param2) {
            return canEdit(params, param2);
        },
        canDelete: function (jq, params, param2) {
            return canDelete(params, param2);
        },
        canPrint: function (jq, params, param2) {
            return canPrint(params, param2);
        }
    };

    $.fn.SO1112A = function (options, param,param2) {        
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
                            options: $.extend({}, new defaults(), new SO1112A(), options)                            
                        });
                    }
                    
                    //$($.data(this, formName).options.container).jqxWindow('disable');
                    formLoaded(this);
                }
                catch (err) {                                      
                    errorHandle(formName, '$.fn.SO1112A_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1112A', err);
        }
    };
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed'](options.returnValue);
        }
        $(options['container']).jqxWindow('close');
    };
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            for (j = 3; j >= 0; j--) {
                for (i = 0; i < controls.length; i++) {
                    if (controls[i].level == j) {
                        var o = $('#' + $(div).prop('id') + controls[i].name);
                        if (o.length > 0) {
                            //if (controls[i].type == 'jqxButton') {
                            $(o[0]).off();
                            //}
                            $(o[0])[controls[i].type]('destroy');
                        }
                    }
                    //$($(div).find('[data-id=codeno]')[0])
                }
            };
            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults;
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
    function setTheme(div, params) {        
        var controls = $.data(div, formName).options.controls;
        for (i = 0; i < controls.length; i++) {
            var o = $('#' + $(div).prop('id') + controls[i].name);
            if (o.length > 0) {
                $(o[0])[controls[i].type]({ theme: params });
            }            
        }
    };
    function changeLanguage1(div) {        
        var lang = $.data(div, formName).options.language;
        var arrays = ['lblCitemCode', 'lblFaciSno', 'lblRealDate', 'lblClctDate', 'lblMemo'];
        $.each(arrays, function (idx, val) {
            $('#' + $(div).prop('id') + val).text(lang[val]);
        });
        //alert(JSON.stringify($.data(div, formName).options.language));
    };
    function ignoreCase(SoruceObject, seekName, isRetObjValue) {
        try {
            for (obj in SoruceObject) {
                if (obj.toLowerCase() === seekName.toLowerCase()) {
                    if (isRetObjValue) {
                        return SoruceObject[obj];
                    } else {
                        return obj;
                    };

                };
            };
            return null;
        }
        catch (err) {
            errorHandle(formName, 'ignoreCase', err);
        };
        
    };
    function formLoaded(div) {
        try {                        
            var options = $.data(div, formName).options;
            options.maintainName = ignoreCase(options.parameters, 'Maintain', false)
            options.contactName = ignoreCase(options.parameters, 'Contact', false)
            options.loginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            options.CUSTID = -1;
            options.serviceType = 'X';
            options.SNO = '';
            if (options.BatchFin == undefined) { options.BatchFin = false; };
            if (options.editMode == editMode.append) {
                options.SNO = '';
            } else {                                               
                if (options.parameters[options.maintainName] != null) {
                    options.SNO = ignoreCase(options.parameters[options.maintainName].rows[0], 'SNO', true);                   
                };
            };
            if (options.parameters[options.contactName] != null && options.parameters[options.contactName] != undefined ) {
                //options.serviceType = options.parameters[contactName].rows[0].serviceType;
                options.serviceType = ignoreCase(options.parameters[options.contactName].rows[0], 'serviceType', true);
            };
            if (options.parameters[options.maintainName] != null) {                
                options.CUSTID = ignoreCase(options.parameters[options.maintainName].rows[0], 'CUSTID', true);
            };
          
           
            $.ajax({
                url: 'SO1000\\' + formName + '.html',
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                       // $(div).append("<div data-id='msgbox'><div>詢問訊視窗</div><div>Content</div></div>");
                        changeElementId(div);                        
                        init(div,options.editMode,  function () {                                      
                            $(div).trigger('loaded', [this, options]);
                            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                options.containerIsWindow = true;
                                var csw = $.data(div, formName).options.container;
                                csw.on("winClosing", function () {
                                    if (options.editMode == editMode.view) {
                                        csw.csWindow('close');
                                        return;
                                    };
                                    disableAllcontrol(div);
                                    messageBox(options.language.QuitAsk, messageType.yesno, null, function (flag) {
                                        if (flag == 'yes') {
                                            DelResvPoint(div, function () {
                                                csw.csWindow('close');
                                            })
                                        } else {
                                            changeMode(div, options.editMode);
                                        };
                                    });
                                });
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
            });
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function DelResvPoint(div, action) {
        var options = $.data(div, formName).options;
        try {
            var parameters = $.extend(true,{}, options.loginInfo);
            var params = getParameters(riadllName,
                   riaClassName,
                   'DelResvPoint',
                   JSON.stringify(parameters));

            getServerData(params, {
                success: function (data) {
                    if (data.ResultBoolean == true) {
                        if ($.isFunction(action)) {
                            
                            action();
                        };
                    }
                    else {
                        messageBox(data.ErrorMessage, messageType.critical);
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'DelResvPoint', err);
        };
    };
    function GetNullServiceType(div, e, action) {
        var options = $.data(div, formName).options;
        try {
            var parameters = $.extend({}, options.loginInfo,
               { SNo: { type: 'string', value: options.SNO } },
               { CustId: { type: 'integer', value: options.CUSTID } });
            var params = getParameters(riadllName,
                   riaClassName,
                   'GetNullServiceType',
                   JSON.stringify(parameters));
        
            getServerData(params, {
                success: function (data) {
                    if (data.ErrorCode == 0) {
                        options.initData = 0;
                        options.initData = null;
                        delete options.initData;
                        options.initData = JSON.parse(data.ResultXML);                      
                        assignCsListData(div);
                        action();
                    }
                    else {
                        messageBox(data.ErrorMessage, messageType.critical);
                    }
                }
            });
        } catch (err) {
            errorHandle(formName, 'GetNullServiceType', err);
        };
    }
    function GetServiceTypeChangeData(div, e, action) {
        try {
            var options = $.data(div, formName).options;
            var ServiceCode = $('#' + $(div).prop('id') + 'gilServiceCode').csList('codeNo');
            var serviceType = $('#' + $(div).prop('id') + 'gilServiceType').csList('codeNo');
            var MFCode1 = $('#' + $(div).prop('id') + 'gilMFCode1').csList('codeNo');
            if (ServiceCode === 'null') { ServiceCode = '' };
            if (serviceType === 'null') { serviceType = '' };
            if (MFCode1 === 'null') { MFCode1 = '' };
            
            var parameters = $.extend({}, options.loginInfo,
                { SNo: { type: 'string', value: options.SNO } },
                { CustId: { type: 'integer', value: options.CUSTID } },
                { serviceType: {type: 'string',value : serviceType}},
                { ServiceCode: {type: 'string', value : ServiceCode}},
                { MFCode: {type: 'string', value: MFCode1}},
                { IsGetFalseSNo: {type : 'boolean', value : (e === editMode.append) }});
            var params = getParameters(riadllName,
                   riaClassName,
                   'GetServiceTypeChangeData',
                   JSON.stringify(parameters));
          
                        
            getServerData(params,  {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            options.initData = 0;
                            options.initData = null;
                            delete options.initData;
                            options.initData = JSON.parse(data.ResultXML);
                            options.blnCMFinTimeFlag = false;
                            options.blnSTBFinTimeFlag = false;
                            options.blnSTBFinTimeFlag = options.initData.FaciFinishPrivFlag.rows[0].FaciFinishPrivFlag;
                            if (options.initData.FalseSNo != undefined) {
                                if (options.initData.FalseSNo.rows.length === 1) {
                                    options.SNO = options.initData.FalseSNo.rows[0].SNO;
                                };
                            }
                            if (options.initData.HaveCM.rows[0].ResultXML === '1') {
                                options.blnCMFinTimeFlag = true;
                            }
                            assignCsListData(div);

                            action();
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetServiceTypeChangeData-Server', err);
                    } finally {
                        delete data;
                        data = null;
                    };
                  
                }
            }); 
        }
        catch (err) {
            errorHandle(formName, 'GetServiceTypeChangeData', err);
        };
      
    };
    function init(div, e, action) {
        var options = $.data(div, formName).options;
        
        changeLanguage(div);
        renderControl(div);
        
        disableAllcontrol(div);        
        /* If (String.IsNullOrEmpty(gilServiceType.CodeNo)) AndAlso (EditMode = IParams.EditModes.AddNew) AndAlso
           (String.IsNullOrEmpty(fServiceType)) Then */
        if (e == editMode.append && ( options.serviceType == null || options.serviceType =='')) {
            GetNullServiceType(div, e, function () {
                refreshGrid(div);
                rcdToScr(div, e);
                changeMode(div, e);
                AddHandler(div);
                action();
            });
        } else {
            GetServiceTypeChangeData(div, e, function () {
                refreshGrid(div);
                rcdToScr(div, e);
                changeMode(div, e);
                AddHandler(div);
                action();
            })
            /*
            getData(div, function () {
                refreshGrid(div);
                changeMode(div, editMode);
                action();
            });*/

        };
        
        /*
        renderControl(div);
        getData(div, function () {
            refreshGrid(div);
            changeMode(div, editMode.view);
            action();
        });*/
    };
    function canView(data, action) {
        try {
            var parameters = $.extend(true, {}, data.loginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'CanView',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if ($.isFunction(action)) {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }
                }
            });
        } catch (err) {
            errorHandle(formName, 'canView', err);
        };
    };
    function canAppend(data, action) {
        try {            
            var Maintain = ignoreCase ( data,'Maintain',false)            
            var parameters = $.extend(true, {}, data.loginInfo, {
                CustId: { type: 'integer', value: data[Maintain].rows[0]['CustId'.toUpperCase()] },
                serviceType: { type: 'string', value: data[Maintain].rows[0]['SERVICETYPE'.toUpperCase()] }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'CanAppend',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {                    
                    if ($.isFunction(action)) {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }                    
                }
            });
          
        }
        catch (err) {
            errorHandle(formName, 'canAppend', err);
        };

    };
    function canEdit(data, action) {
        try {
            var Maintain = ignoreCase(data, 'Maintain', false);
            var lng = new SO1112A();
            if (Maintain == '' || Maintain == null) {
              
                if ($.isFunction(action)){
                    action([false, lng.NoWipTable]);
                    return;
                };
            };
            if (data[Maintain].rows.length === 0) {
                if ($.isFunction(action)) {
                    action([false, lng.NoWipData]);
                    return;
                };
            };
            if (data[Maintain].rows.SNO != undefined) {
                if (data[Maintain].rows.SNO == null) {
                    if ($.isFunction(action)) {
                        action([false, lng.SNoErr]);
                        return;
                    };
                };
            } else {
                if ($.isFunction(action)) {
                    action([false, lng.SNoErr]);
                    return;
                };
            };

            
            var parameters = $.extend(true, {}, data.loginInfo, {
                SNO: { type: 'string', value: data[Maintain].rows[0]['SNO'.toUpperCase()] }});
            var params = getParameters(riadllName,
                riaClassName,
                'CanEdit',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if ($.isFunction(action)) {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }                    
                }
            });
          
        }
        catch (err) {
            errorHandle(formName, 'canEdit', err);
        };
       
    }
    function canDelete(data, action) {
        try {
            var Maintain = ignoreCase(data, 'Maintain', false);
            var lng = new SO1112A();
            if (Maintain == '' || Maintain == null) {

                if ($.isFunction(action)) {
                    action([false, lng.NoWipTable]);
                    return;
                };
            };
            if (data[Maintain].rows.length === 0) {
                if ($.isFunction(action)) {
                    action([false, lng.NoWipData]);
                    return;
                };
            };
            if (data[Maintain].rows.SNO != undefined) {
                if (data[Maintain].rows.SNO == null) {
                    if ($.isFunction(action)) {
                        action([false, lng.SNoErr]);
                        return;
                    };
                };
            } else {
                if ($.isFunction(action)) {
                    action([false, lng.SNoErr]);
                    return;
                };
            };

            var parameters = $.extend(true, {}, data.loginInfo, {
                SNO: { type: 'string', value: data[Maintain].rows[0]['SNO'.toUpperCase()] }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'CanDelete',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if ($.isFunction(action)) {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }
                }
            });
        } catch (err) {
            errorHandle(formName, 'canDelete', err);
        };
    };
    function canPrint(data, action) {
        try {
            var parameters = $.extend(true, {}, data.loginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'CanPrint',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if ($.isFunction(action)) {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }
                }
            });
        } catch (err) {
            errorHandle(formName, 'canPrint', err);
        };
    };
   
    function refreshGrid(div) {
        try {
            var rowindex = $('#' + $(div).prop('id') + 'grdData1').jqxGrid('getselectedrowindex');
            var options = $.data(div, formName).options;
            var data1 = options.initData.Facility;
            options.grdData1.localdata = data1;
            $('#' + $(div).prop('id') + 'grdData1').jqxGrid('updatebounddata');
            if (data1.rows.length > 0) {
                if (rowindex >= 0) {
                    $('#' + $(div).prop('id') + 'grdData1').jqxGrid('selectrow', rowindex);
                }
                else {
                    $('#' + $(div).prop('id') + 'grdData1').jqxGrid('selectrow', 0);
                }
            };
            //$.extend({},options.controls, { name: 'grdData1', type: 'jqxGrid', level: 2 });                       
            rowindex = $('#' + $(div).prop('id') + 'grdData2').jqxGrid('getselectedrowindex');
            var data2 = options.initData.Charge;
            options.grdData2.localdata = data2;
            $('#' + $(div).prop('id') + 'grdData2').jqxGrid('updatebounddata');
            if (data2.rows.length > 0) {
                if (rowindex >= 0) {
                    $('#' + $(div).prop('id') + 'grdData2').jqxGrid('selectrow', rowindex);
                }
                else {
                    $('#' + $(div).prop('id') + 'grdData2').jqxGrid('selectrow', 0);
                }
            };
            //$.extend({},options.controls, { name: 'grdData2', type: 'jqxGrid', level: 2 });
            SumShouldAmt(div);
            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };
    function SumShouldAmt(div) {
        try {            
            var rows = $('#' + $(div).prop('id') + 'grdData2').jqxGrid('getrows');
            var totalAmt = 0;
            var rowLength = rows.length;
            if (rowLength > 0) {
                for (var i = 0; i < rowLength; i++) {
                    if (rows[i].CANCELFLAG === 0) {
                        if ($.isNumeric( rows[i].SHOULDAMT )) {
                            totalAmt += rows[i].SHOULDAMT;
                        };
                    };                    
                };
                $('#' + $(div).prop('id') + 'lblSum').text(totalAmt.toString());
            } else
            {
                $('#' + $(div).prop('id') + 'lblSum').text('0');
                return 0;

            };

        }
        catch (err) {
            errorHandle(formName, 'SumShouldAmt', err);
        };
    };
    function setButtonStatus(div,e) {
        try {
            if ($.data(div, formName).options.OrderNo != null) {
                if ($.data(div, formName).options.OrderNo.toString().length > 0) { return;}
            };
            if (e == editMode.view) { return; }
            $('#' + $(div).prop('id') + 'btnSubAdd1').jqxButton({
                disabled: !getUsePriv($.data(div, formName).options.initData.Priv.rows, 'SO1112H1')
            });
            $('#' + $(div).prop('id') + 'btnSubAdd2').jqxButton({
                disabled: !getUsePriv($.data(div, formName).options.initData.Priv.rows, 'SO1112B1')
            });
            if ($('#' + $(div).prop('id') +'grdData1').jqxGrid('getrows').length > 0) {
                $('#' + $(div).prop('id') + 'btnSubEdit1').jqxButton({
                    disabled: !getUsePriv($.data(div, formName).options.initData.Priv.rows, 'SO1112H2')
                });
                $('#' + $(div).prop('id') + 'btnSubDelete1').jqxButton({
                    disabled: !getUsePriv($.data(div, formName).options.initData.Priv.rows, 'SO1112H3')
                });
            };
            if ($('#' + $(div).prop('id') + 'grdData2').jqxGrid('getrows').length > 0) {
                $('#' + $(div).prop('id') + 'btnSubEdit2').jqxButton({
                    disabled: !getUsePriv($.data(div, formName).options.initData.Priv.rows, 'SO1112B2')
                });
                $('#' + $(div).prop('id') + 'btnSubDelete2').jqxButton({
                    disabled: !getUsePriv($.data(div, formName).options.initData.Priv.rows, 'SO1112B3')
                });
            };
        }
        catch (err) {
            errorHandle(formName, 'setButtonStatus', err);
        };
    };
    function changeMode(div, e) {
        try {          
            var codeDiabled = true;
            var options = $.data(div, formName).options;
            
            var editStatus = '';
            var aCanUse = false;
            var editText = '';
            options.editMode = e;
            switch (e) {
                case editMode.view:
                    aCanUse = false;
                    editText = options.language.stateView;
                    $('#' + $(div).prop('id') + 'btnCancel').jqxButton({
                        imgSrc: imageScr.exit.imgSrc,
                        value: options.language.btnCancel
                    });
                    //$('#' + $(div).prop('id') + 'btnCancel').jqxButton('render');
                    //$('#' + $(div).prop('id') + 'btnSave').prop('disabled', true);
                    //rcdToScr(div,e);
                    break;
                case editMode.edit:
                    editText = options.language.stateEdit;
                    $('#' + $(div).prop('id') + 'btnCancel').jqxButton({
                        imgSrc: imageScr.cancel.imgSrc,
                        value: options.language.btnCancel2
                    });
                    aCanUse = true;
                    //rcdToScr(div,e);
                    break;
                case editMode.append:
                    editText = options.language.stateAdd;
                    $('#' + $(div).prop('id') + 'btnCancel').jqxButton({
                        imgSrc: imageScr.cancel.imgSrc,
                        value: options.language.btnCancel2
                    });
                    $('#' + $(div).prop('id') + 'gilServiceType').csList('disabled', false);
                    codeDiabled = false;
                    aCanUse = true;
                    break;
            }
            $('#' + $(div).prop('id') + 'txtStatus').jqxInput('val', editText);
            $('#' + $(div).prop('id') + 'btnSave').jqxButton({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'btnResv').jqxButton({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'btnPrintBillFlag').jqxButton({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'btnReserve2').jqxButton({ disabled: false });
            $('#' + $(div).prop('id') + 'btnViewPR').jqxButton({ disabled: false });
            $('#' + $(div).prop('id') + 'btnCancel').jqxButton({ disabled: false });
            $('#' + $(div).prop('id') + 'gilServiceCode').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'edtResvTime').jqxDateTimeInput({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'edtResvFlagTime').jqxDateTimeInput({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'chkFlag').jqxCheckBox({ disabled: !aCanUse });            
            $('#' + $(div).prop('id') + 'gilGroupCode').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilWorkerEn1').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilWorkerEn2').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'txtMemo').jqxTextArea({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'dtFinTime').jqxDateTimeInput({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'gilMFCode1').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilMFCode2').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilReturnCode').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilReturnDescCode').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilSatiCode').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilSignEn').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'edtSignDate').jqxDateTimeInput({ disabled: !aCanUse });
            if (options.OrderNo != null) {
                if (options.OrderNo.length > 0) {
                    $('#' + $(div).prop('id') + 'btnSubAdd1').css('visibility', 'hidden');
                    $('#' + $(div).prop('id') + 'btnSubAdd2').css('visibility', 'hidden');
                    $('#' + $(div).prop('id') + 'btnSubEdit1').css('visibility', 'hidden');
                    $('#' + $(div).prop('id') + 'btnSubEdit2').css('visibility', 'hidden');
                    $('#' + $(div).prop('id') + 'btnSubDelete1').css('visibility', 'hidden');
                    $('#' + $(div).prop('id') + 'btnSubDelete2').css('visibility', 'hidden');
                };
            };
            if (options.initData.SO002.rows.length > 0) {
                if (options.initData.SO002.rows[0].BALANCE < 0) {
                    $('#' + $(div).prop('id') + 'chkPrintBillFlag').jqxCheckBox({disabled: false});
                }
            };
            if (e == editMode.append) {
                $('#' + $(div).prop('id') + 'dtFinTime').jqxDateTimeInput({ disabled: true });
                $('#' + $(div).prop('id') + 'gilMFCode1').csList('disabled', true);
                $('#' + $(div).prop('id') + 'gilMFCode2').csList('disabled', true);
                $('#' + $(div).prop('id') + 'gilReturnCode').csList('disabled', true);
                $('#' + $(div).prop('id') + 'gilReturnDescCode').csList('disabled', true);
                $('#' + $(div).prop('id') + 'gilSatiCode').csList('disabled', true);
                $('#' + $(div).prop('id') + 'gilSignEn').csList('disabled', true);
                $('#' + $(div).prop('id') + 'edtSignDate').jqxDateTimeInput({ disabled: true });
            };
            

            if (e != editMode.view) {
                GetClosePriv(div, options.initData.Priv.rows);
                if (e != editMode.append && options.finMode) {
                    if (getUsePriv(options.initData.Priv.rows, 'SO11126')) {
                        options.blnCMFinTimeFlag = !(options.blnCMFinTimeFlag
                                        && $('#' + $(div).prop('id') + 'edtCallOkTime').jqxDateTimeInput('getText').toString().length == 0)
                        $('#' + $(div).prop('id') + 'dtFinTime').jqxDateTimeInput({ disabled: !(options.blnFinishPriv && options.blnSTBFinTimeFlag && options.blnCMFinTimeFlag) });
                        $('#' + $(div).prop('id') + 'gilReturnCode').csList('disabled', !options.blnReturnPriv);
                        var FinTimeDisabled = $('#' + $(div).prop('id') + 'dtFinTime').jqxDateTimeInput('disabled');
                        var ReturnCodeDisabled = $('#' + $(div).prop('id') + 'gilReturnCode').csList('disabled');
                        $('#' + $(div).prop('id') + 'edtSignDate').jqxDateTimeInput(
                            { disabled: !((!FinTimeDisabled) || (!ReturnCodeDisabled))});
                        if ($('#' + $(div).prop('id') + 'gilReturnCode').csList('codeNo') != '' ) {
                            $('#' + $(div).prop('id') + 'dtFinTime').jqxDateTimeInput(
                            { disabled: true });
                        };                      
                    };
                };
            };
            setButtonStatus(div, e);
        }
        catch (err) {
            errorHandle(formName, 'changeMode', err);
        }
    };
    function getUsePriv(rows, mid) {
        try {            
            var result = false;
            $.each(rows, function (index) {
                if (rows[index].MID == mid) {
                    result = rows[index].GROUPX == 1;
                    return result;
                };
            } );  
            return result;
        }
        catch (err) {
            errorHandle(formName, 'getUsePriv', err);
        };
    };

    function GetClosePriv(div,rows) {
        try {
            $.data(div, formName).options.blnFinishPriv =
                $.data(div, formName).options.finMode &&
                    (getUsePriv(rows, 'SO111261') || getUsePriv(rows, 'SO111262'));
            $.data(div, formName).options.blnReturnPriv =
                $.data(div, formName).options.finMode &&
                                            getUsePriv(rows, 'SO111263');
            $.data(div, formName).options.blnShouldRegPriv = getUsePriv(rows, 'SO111261');
            return;
        }
        
        catch (err) {
            errorHandle(formName, 'GetClosePriv', err);
        };
    };
    function gilServiceTypeSelectedIndexChanged(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var serviceType = $(this).csList('codeNo');
        try {

            var chkData = {};
            var dsData = {
                type: 'string',
                Maintain: {
                    columns: [{ name: 'serviceType', type: 'string' },
                        { name: 'CUSTID', type: 'integer' }
                    ],
                    rows: [{
                        SERVICETYPE: $(headerId + 'gilServiceType').csList('codeNo'),
                        CUSTID: options.CUSTID
                    }]
                }
            };
            var chkData = {};
            chkData['loginInfo'] = { loginInfo: {} };

            $.extend(true, chkData.loginInfo, options.loginInfo);
            $.extend(true, chkData, dsData);
            canAppend(chkData, function (result) {
                OffHandler(event.data);
                $(headerId + 'edtResvTime').val(null);
                $(headerId + 'gilServiceCode').csList('clearDisplayValue');
                if (result[0] === true) {
                    GetServiceTypeChangeData(event.data, options.editMode, function () {
                        $(headerId + 'gilServiceType').csList('codeNo', serviceType);
                        options.serviceType = serviceType;
                        refreshGrid(event.data);
                        rcdToScr(event.data, options.editMode);
                        changeMode(event.data, options.editMode);
                        AddHandler(event.data);
                    })
                } else {
                    options.serviceType = '';
                    $(headerId + 'gilServiceType').csList('clearDisplayValue');
                    var source = $.extend(true, {}, options.initData.MaintainCode);
                    source.rows.length = 0;
                    source.rows = [];
                    $(headerId + 'gilServiceCode').csList('source', source);
                    AddHandler(event.data);
                    messageBox(result[1], messageType.critical);
                };
            });
        }
        catch (err) {
            OffHandler(event.data);
            AddHandler(event.data);
            errorHandle(formName, 'gilServiceTypeSelectedIndexChanged', err);
        } finally {
            chkData = null;
            delete chkData;
            dsData = null;
            delete dsData;            
        };

    };
    function GetGroupCode(div) {
        try {
            var options = $.data(div, formName).options;
            var aServiceCode = '-1';
            var headerId = '#' + $(div).prop('id');
            var groupCodeNo = '';
            if ($(headerId + 'gilGroupCode').csList('codeNo') != '') {
                groupCodeNo = $(headerId + 'gilGroupCode').csList('codeNo');                    
            }
            //$(headerId + 'gilGroupCode').csList('codeNo', initData.GroupCode.rows[0].CODENO);
            if ($(headerId + 'gilServiceCode').csList('codeNo') != '' ) {
                aServiceCode = $(headerId + 'gilServiceCode').csList('codeNo');
            };
            var parameters = $.extend({}, options.loginInfo,                
                 { ServCode: { type: 'string', value: aServiceCode } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetGroupCode',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ResultBoolean) {

                            var tmp = JSON.parse(data.ResultXML);
                            $.extend(options.initData.GroupCode, tmp.Table);                            
                            tmp = null;
                            delete tmp;
                            $(headerId + 'gilGroupCode').csList('source', options.initData.GroupCode.rows);
                            if (groupCodeNo != '') {
                                $(headerId + 'gilGroupCode').csList('codeNo', groupCodeNo);
                            };
                            refreshGrid(div);
                            changeMode(div, options.editMode);
                            setButtonStatus(div, options.editMode);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetGroupCode-Server', err);
                        changeMode(div, options.editMode);
                    } finally {
                        data = null;
                        delete data;
                        
                    };
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'GetGroupCode', err);
        };
    };
    function GetMaintainChangeFaci(div) {
        try {
            var options = $.data(div, formName).options;
            var contactName = ignoreCase(options.parameters, 'Contact', false);
            var headerId = '#' + $(div).prop('id');
            if (contactName == null) {
                GetGroupCode(div);
                return;
            }; 
            if (options.parameters[contactName].rows.length === 0) {
                GetGroupCode(div);
                return;
            };
            var ResvTime = $(headerId + 'edtResvTime').jqxDateTimeInput('getText');
            var WorkCodeValue = -1;
            if ($(headerId + 'gilServiceCode').csList('codeNo') != '' ) {
                WorkCodeValue = parseInt($(headerId + 'gilServiceCode').csList('codeNo'));
            };
            
            var parameters = $.extend({}, options.loginInfo,
                  { CustId: { type: 'integer', value: options.CUSTID } },
                  { ServiceType: { type: 'string', value: options.serviceType } },
                  { ResvTime: { type: 'date', value: ResvTime } },
                  { WorkCodeValue: { type: 'integer', value: WorkCodeValue } },
                  { dsContact: { type: 'string', value: '' } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetMaintainChangeFaci',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ResultBoolean) {
                            var tmp = JSON.parse(data.ResultXML);
                            var rowLength = tmp.rows.length;
                            for (var i = 0; i < rowLength; i++) {
                                options.initData.ChangeFacility.rows.push(tmp.row[i]);
                            };                            
                            
                            tmp = null;
                            delete tmp;
                            GetGroupCode(div);
                        
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetMaintainChangeFaci-Server', err);
                        changeMode(div, options.editMode);
                    } finally {                       
                        data = null;
                        delete data;
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'GetMaintainChangeFaci', err);
        };
    };

    function GetNormalWip(div){
        try {
            var Contact = '';
            var options = $.data(div, formName).options;
            var contactName = ignoreCase(options.parameters, 'Contact', false);
            var headerId = '#' + $(div).prop('id');
            
            
            if (contactName != null) {
                contact = options.parameters[contactName];
            };
            var InstCode = parseInt($(headerId + 'gilServiceCode').csList('codeNo'));
            var ResvTime = $(headerId + 'edtResvTime').jqxDateTimeInput('getText');
         
            var parameters = $.extend({}, options.loginInfo,
                    {CustId:{type:'integer',value:options.CUSTID}},
                    { ServiceType: { type: 'string', value: options.serviceType } },
                    { ResvTime: { type: 'date', value: ResvTime } },
                    { InstCode: { type: 'integer', value: InstCode } },
                    { dsContact: { type: 'string', value: Contact } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetNormalWip',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            $.extend(options.initData.ChangeFacility, tmp.ChangeFacility);
                            $.extend(options.initData.Charge, tmp.Charge);
                            $.extend(options.initData.Facility, tmp.Facility);                            
                            tmp = null;
                            delete tmp;
                            GetMaintainChangeFaci(div);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetNormalWip-Server', err);
                        changeMode(div, options.editMode);
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
            errorHandle(formName, 'GetNormalWip', err);
            changeMode(div, options.editMode);
        };
    };
    function GetDefaultResvTime(div) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            if ($(headerId + 'edtResvTime').jqxDateTimeInput('getText') != '') {
                GetNormalWip(div);
                return;
            };
            var serviceCode = -1;
            var serviceType = '';
            var AcceptTime = '';
            if ($(headerId + 'gilServiceCode').csList('codeNo') != '' ) {
                serviceCode = parseInt( $(headerId + 'gilServiceCode').csList('codeNo'));
            };            
            AcceptTime = $(headerId + 'lblAcceptTime').text();
            var parameters = $.extend({}, options.loginInfo,
                    { ServiceType: { type: 'string', value: options.serviceType } },
                    { MaintainCode: { type: 'integer', value: serviceCode } },
                    { AcceptTime: { type: 'string', value: AcceptTime } });
            var params = getParameters(riadllName,
                   riaClassName,
                   'GetDefaultResvTime',
                   JSON.stringify(parameters));          
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div, options.editMode);
                        } else {
                            if (data.ResultXML != '') {
                                var d = jsonDate(data.ResultXML);
                                $(headerId + 'edtResvTime').jqxDateTimeInput('setDate', d);
                                GetNormalWip(div);
                            };
                        };
                    } catch (err) {
                        changeMode(div, option.editMode);
                        errorHandle(formName, 'GetDefaultResvTime-Server', err);
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
          
        }
        catch (err) {
            errorHandle(formName, 'GetDefaultResvTime', err);           
            changeMode(div,options.editMode);
        };
    }

    function gilServiceCodeSelectedIndexChanged(event) {
        try {
            var options = $.data(event.data, formName).options;
            var headerId = '#' + $(event.data).prop('id');
            var WorkUnit = 0;
            
            if ($(this).csList('codeNo') == '' ) {
                return;
            };
            disableAllcontrol(event.data);
            var rowLength = options.initData.MaintainCode.rows.length;
            for (var i = 0; i < rowLength; i++) {
                if (options.initData.MaintainCode.rows[i].CODENO == $(this).csList('codeNo')) {
                    $(headerId + 'txtWorkUnit').val(options.initData.MaintainCode.rows[i].WORKUNIT);
                    break;
                };
            };             
            GetDefaultResvTime(event.data);
            
        }
        catch (err) {
            errorHandle(formName, 'gilServiceCodeSelectedIndexChanged', err);
        };
    };
    function ChkCanResv(div) {
        try {

            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var ServCode = -1;
            var AcceptTime = formatStringDate(new Date, 'yyyyMMddHHmm', false);
            var contactName = ignoreCase(options.parameters, 'Contact', false);
            var ReserveDay = 0;
            var MCode = '-1';
            var WipCode = -1;
            var WorkUnit = 0;
            if ($(headerId + 'edtResvTime').jqxDateTimeInput('getText') === '') {
                messageBox(options.language.MustResvTime, messageType.critical);
                changeMode(div, options.editMode);
                return;
            }
            if ($(headerId + 'gilServiceCode').csList('codeNo') == '') {
                messageBox(options.language.MustServiceContext, messageType.critical);
                changeMode(div, options.editMode);
                return;
            }
            if (options.initData.SO001.rows.length > 0) {
                ServCode = options.initData.SO001.rows[0].SERVCODE;
            };
            if ($(headerId + 'lblAcceptTime').text() != '') {
                AcceptTime = new Date($(headerId + 'lblAcceptTime').text());
            };
            var MaintainLength = options.initData.MaintainCode.rows.length;
            for (i = 0; i < MaintainLength; i++) {
                if (options.initData.MaintainCode.rows[i].CODENO == $(headerId + 'gilServiceCode').csList('codeNo')) {
                    ReserveDay = options.initData.MaintainCode.rows[i].RESERVEDAY;
                    MCode = options.initData.MaintainCode.rows[i].GROUPNO + '';
                    WorkUnit = parseFloat(options.initData.MaintainCode.rows[i].WORKUNIT);
                    WipCode = options.initData.MaintainCode.rows[i].CODENO;                    
                    break;
                }
            };
            var parameters = $.extend({}, options.loginInfo,
                    {ServCode : {type:'string',value:ServCode}},                                       
                   { WipCode: { type: 'integer', value: WipCode } },
                   { MCode: { type: 'string', value: MCode } },
                   { ServiceType: { type: 'string', value: options.serviceType } },
                   { ResvTime: { type: 'date', value: $(headerId + 'edtResvTime').jqxDateTimeInput('getDate') } },
                   { AcceptTime: { type: 'date', value: AcceptTime } },
                   { OldResvTime: { type: 'date', value: new Date( options.oldResvTime )} },
                   { Resvdatebefore: { type: 'integer', value: ReserveDay } },
                   { WorkUnit: { type: 'decimal', value: WorkUnit } },
                   { IsBooking: { type: 'boolean', value: true } });
            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkCanResv',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div, options.editMode);
                        } else {
                            if (contactName != null) {
                                if (options.parameters[contactName] != null) {
                                    if (ignoreCase(options.parameters[contactName].rows[0], 'FaciSeqNo', true) != null) {
                                        options.initData.ChangeFacility.rows = [];
                                    }
                                };
                                changeMode(div, options.editMode);
                                return;
                            } else {
                                changeMode(div, options.editMode);
                                return;
                            }
                        };
                    } catch (err) {
                        changeMode(div, option.editMode);
                        errorHandle(formName, 'GetDefaultResvTime-Server', err);
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
        }
        catch (err) {
            errorHandle(formName, 'ChkCanResv', err);
        };
    };
    function edtResvTimeChange(event) {
        try {            
            var options = $.data(event.data, formName).options;
            
            disableAllcontrol(event.data);
            ChkCanResv(event.data);
        }
        catch (err) {
            errorHandle(formName, 'edtResvTimeChange', err);
        }
    };
    function gilWorkerEn1SelectItemChange(event) {
        disableAllcontrol(event.data);
        try {
            var options = $.data(event.data, formName).options;
            var headerId = '#' + $(event.data).prop('id');            
            if ($(this).csList('codeNo') == '' ) {
                changeMode(event.data, options.editMode);
                return;
            };            
            if (options.initData.Charge.rows.length > 0) {
                if (confirm(options.language.changeWorkEn)) {
                    var rowLength = options.initData.Charge.rows.length;
                    for (var i = 0; i < rowLength; i++) {
                        options.initData.Charge.rows[i].CLCTEN = $(this).csList('codeNo');
                        options.initData.Charge.rows[i].CLCTNAME = $(this).csList('description');
                    };
                    refreshGrid(event.data);
                }                    
            }
            changeMode(event.data, options.editMode);
          
        } catch (err) {
            errorHandle(formName, 'gilWorkerEn1SelectItemChange', err);
            changeMode(event.data, options.editMode);
        };
    };
    function gilMFCode1SelectItemChange(event) {
        disableAllcontrol(event.data);
        try {
            var options = $.data(event.data, formName).options;
            var headerId = '#' + $(event.data).prop('id');
            var MFCode = -1;
            if ($(this).csList('codeNo') != '' ) {
                MFCode = parseInt($(this).csList('codeNo'));
            };
            var parameters = $.extend({}, options.loginInfo,
                    { MFCode: { type: 'integer', value: MFCode } },
                    { ServiceType: { type: 'string', value: options.serviceType } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetMFCode2',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            options.initData.MFCode2.rows.length = 0;
                            options.initData.MFCode2.rows = tmp.Table.rows;                            
                            tmp = null;
                            delete tmp;
                            $(headerId + 'gilMFCode2').csList('source', options.initData.MFCode2.rows);
                            $(headerId + 'gilMFCode2').csList('clearDisplayValue');
                            changeMode(event.data, options.editMode);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(event.data, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetMFCode2-Server', err);
                        changeMode(event.data, options.editMode);
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
            errorHandle(formName, 'gilMFCode1SelectItemChange', err);
            changeMode(event.data, options.editMode);
        };
    }
    function AutoByFin(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        try {
            
            if ($(headerId + 'edtSignDate').jqxDateTimeInput('getText') === '') {
                $(headerId + 'edtSignDate').val(formatStringDate(new Date(), 'yyyyMMdd', false));
            };
            if ($(headerId + 'gilSignEn').csList('codeNo') == '') {
                $(headerId + 'gilSignEn').csList('setDisplayValue',
                    {
                        CODENO: options.loginInfo.loginInfo.value.rows[0].entryid,
                        DESCRIPTION: options.loginInfo.loginInfo.value.rows[0].entryname
                    })
            };
            var row = {};
            var rowLength = options.initData.ServiceType.rows.length;
            var serviceTypeCode = $(headerId + 'gilServiceType').csList('codeNo');
            if (serviceTypeCode != '') {
                for (var i = 0; i < rowLength; i++) {
                    if (options.initData.ServiceType.rows[i].CodeNo === serviceTypeCode) {
                        row = options.initData.ServiceType.rows[i];
                        break;
                    }
                };
            }
           
            if (!$.isEmptyObject(row)) {
                if (parseInt(row.ModifyDateChange) === 1) {
                    if ($(headerId + 'dtFinTime').jqxDateTimeInput('getText') != '') {
                        $(headerId + 'edtSignDate').jqxDateTimeInput('setDate',
                            $(headerId + 'dtFinTime').jqxDateTimeInput('getDate')
                            );
                    };
                };
                if ($(headerId + 'gilReturnCode').csList('codeNo') != '') {
                    var d = $(headerId + 'edtSignDate').jqxDateTimeInput('getDate');
                    var addDate = 0;
                    if (row.MoreDay2 != '' && row.MoreDay2 != null) {
                        addDate = parseInt(row.MoreDay2);
                    };
                    d.setDate(d.getDate() + addDate);
                    $(headerId + 'edtSignDate').jqxDateTimeInput('setDate', d);
                };
            } else {
                $(headerId + 'edtSignDate').val(formatStringDate(new Date(), 'yyyyMMdd', false));;
            };            
            row = null;
            delete row;
        } catch (err) {
            errorHandle(formName, 'AutoByFin', err);
            changeMode(event.data, options.editMode);
        }
    }
    function gilReturnCodeSelectItemChange(event) {
        disableAllcontrol(event.data);
        $(headerId + 'dtFinTime').unbind('change');
        try {
            var options = $.data(event.data, formName).options;
            var headerId = '#' + $(event.data).prop('id');
            if ($(this).csList('codeNo') != '') {
                AutoByFin(event);
            };
           
            changeMode(event.data, options.editMode);            
        } catch (err) {
            errorHandle(formName, 'gilReturnCodeSelectItemChange', err);
            changeMode(event.data, options.editMode);
        }
    }
    function IsDataOK(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        options.blnChangeAddr = false;
        try {
            if ($(headerId + 'gilServiceType').csList('codeNo') == '') {
                messageBox(options.language.MustServiceType, null, null, function () { return false });
                return false;
            };
            if ($(headerId + 'gilServiceCode').csList('codeNo') == '') {
                messageBox(options.language.MustServiceCode, null, null, function () { return false });
                return false;
            };
            return true;
          
        } catch (err) {
            throw 'IsDataOK:' + err.message;

        };
    };
    function btnCancelClick(event) {
        var options = $.data(event.data, formName).options;
        //var headerId = '#' + $(event.data).prop('id');
        try {
            if ($(this).jqxButton('disabled')) return;
            if (options.IsAutoClosed == true && options.containerIsWindow) {
                $(options.container).trigger('winClosing');
                return;                
            };
            if (options.editMode == editMode.view) {
                if (options.containerIsWindow == true) {
                    $(options.container).jqxWindow('close');
                    return;
                }
            };
            options.editMode = editMode.view;
            GetMaintainData(event.data);
           
        } catch (err) {
            errorHandle(formName, 'btnSaveClick', err);
            changeMode(event.data, options.editMode);
        };
    };
    function btnSaveClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        
        try {
            if ($(this).jqxButton('disabled')) return;
            disableAllcontrol(event.data);
            if (IsDataOK(event.data)) {
                if (options.editMode == editMode.append) {
                    if (options.initData.SO002.rows[0].WIPCODE3 === 11) {
                        messageBox(options.language.MustServiceType, messageType.yesno, null,
                            function (r) {
                                if (r == 'yes') { options.blnChangeAddr = true; }
                                GetReInstAddrNo(event.data);
                            });
                    } else {
                        GetReInstAddrNo(event.data);
                    };
                } else {
                    GetReInstAddrNo(event.data);
                }
            } else  {
                changeMode(event.data, options.editMode);
            }
        
        } catch (err) {
            errorHandle(formName, 'btnSaveClick', err);
            changeMode(event.data, options.editMode);
        } finally {
           
        };        
    };
    function GetReInstAddrNo(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            
            if (!options.blnChangeAddr) {
                GetSO014(div);
                return
            };
            if (options.initData.ReInstAddrNo != undefined) {
                if (options.initData.ReInstAddrNo.rows.length > 0) {
                    GetSO014(div);
                    return
                };
            }; 
            
            var parameters = $.extend({}, options.loginInfo,
                    { CustId: { type: 'integer', value: options.CUSTID } },
                    { ServiceType: { type: 'string', value: options.serviceType } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetReInstAddrNo',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            $.extend(options.initData, { ReInstAddrNo: {} });
                            $.extend(options.initData.ReInstAddrNo, tmp.Table1);
                            tmp = {};
                            tmp = null;
                            delete tmp;
                            GetSO014(div);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetReInstAddrNo-Server', err);
                        changeMode(div, options.editMode);
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
            errorHandle(formName, 'GetReInstAddrNo', err);
            changeMode(div, options.editMode);
        };
    };
    function GetSO014(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var AddrNo = options.initData.SO001.rows[0].INSTADDRNO;
            if (options.initData.SO014 != undefined) {
                if (options.initData.SO014.rows.length > 0) {
                    ScrToRcd(div);
                    return;
                };
            };
            if (options.blnChangeAddr) {
                if (options.initData.ReInstAddrNo != undefined) {
                    if (options.initData.ReInstAddrNo.rows[0].blnLogChangeAddr === 1) {
                        AddrNo = options.initData.ReInstAddrNo.rows[0].ReInstAddrNo;
                    };
                };
            };
            var parameters = $.extend({}, options.loginInfo,
                   { AddrNo: { type: 'integer', value: AddrNo } });
            var params = getParameters(riadllName,
                   riaClassName,
                   'GetSO014',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            $.extend(options.initData, { SO014: {} });
                            $.extend(options.initData.SO014, tmp.Table);
                            tmp = 0;
                            tmp = {};
                            tmp = null;
                            delete tmp;
                            ScrToRcd(div);
                            //GetSO014(div);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetSO014-Server', err);
                        changeMode(div, options.editMode);
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
            errorHandle(formName, 'GetSO014', err);
            changeMode(event.data, options.editMode);
        };
    };
    function ScrToRcd(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var d = new Date;
        var SaveWip = $.extend(true, {}, options.initData.Wip);
        var OldWip = $.extend(true, {}, options.initData.Wip);
        delete options.SaveMaintain;
        /*
        options.SaveMaintain = {};
        options.SaveMaintain['OldWip'] = {};
        $.extend(true, options.SaveMaintain, options.initData);
        $.extend(true, options.SaveMaintain.OldWip, options.initData.Wip); */
        
        options.SaveMaintain = {
            Wip: {},
            OldWip: {},
            Facility: {},
            Charge: {},
            PrFacility: {},
            ChangeFacility: {},
            Extend: {},
            ChangeProduct: {},
            Product: {}
        };
        
        if (options.contactName != null && options.contactName != undefined) {
            options.SaveMaintain[options.contactName] = {};
            $.Extend(true, options.SaveMaintain[options.contactName], options.parameters[options.contactName]);
        }; 
        
        $.extend(true, options.SaveMaintain.OldWip, options.initData.Wip);
        $.extend(true, options.SaveMaintain.Facility, options.initData.Facility);
        $.extend(true, options.SaveMaintain.Charge, options.initData.Charge);
        $.extend(true, options.SaveMaintain.PrFacility, options.initData.PrFacility);
        $.extend(true, options.SaveMaintain.ChangeFacility, options.initData.ChangeFacility);
        $.extend(true, options.SaveMaintain.Extend, options.initData.Extend);
        $.extend(true, options.SaveMaintain.Product, options.initData.Product); 
        $.extend(true, options.SaveMaintain.ChangeProduct, options.initData.ChangeProduct);
        try {
            if (options.editMode == editMode.append) {
                SaveWip.rows.push(newWipRow());
            };
            SaveWip.rows[0].NEWUPDTIME = DateToJson(d);
            SaveWip.rows[0].UPDEN = options.loginInfo.loginInfo.value.rows[0].entryname;
            if ( options.editMode == editMode.append ) {
                SaveWip.rows[0].ACCEPTEN = options.loginInfo.loginInfo.value.rows[0].entryid;
                SaveWip.rows[0].ACCEPTNAME = options.loginInfo.loginInfo.value.rows[0].entryname;
                SaveWip.rows[0].ACCEPTTIME = DateToJson(d);
            };
            SaveWip.rows[0].TEL1 = options.initData.SO001.rows[0].TEL1;


            if (options.OrderNo != null && options.OrderNo != undefined ) {
                if ( options.OrderNo.toString().length > 0 ) {
                    SaveWip.rows[0].ORDERNO = options.OrderNo;
                };
            };
            SaveWip.rows[0].SALESCODE = options.initData.SO014.rows[0].SALESCODE;
            SaveWip.rows[0].SALESNAME = options.initData.SO014.rows[0].SALESNAME;
            SaveWip.rows[0].NODENO = options.initData.SO014.rows[0].NODENO;
            SaveWip.rows[0].ADDRNO = options.initData.SO014.rows[0].ADDRNO;
            SaveWip.rows[0].ADDRESS = options.initData.SO014.rows[0].ADDRESS;
            SaveWip.rows[0].SERVCODE = options.initData.SO014.rows[0].SERVCODE;
            SaveWip.rows[0].STRTCODE = options.initData.SO014.rows[0].STRTCODE;
            SaveWip.rows[0].SERVICETYPE = $(headerId + 'gilServiceType').csList('codeNo');
            SaveWip.rows[0].WORKSERVCODE = options.initData.SO001.rows[0].SERVCODE;
            SaveWip.rows[0].COMPCODE = options.loginInfo.loginInfo.value.rows[0].compcode;
            if ( options.editMode == editMode.append ) {
                SaveWip.rows[0].SNO = $(headerId + 'txtSNo').jqxInput('value');
            };
            SaveWip.rows[0].CUSTID = $(headerId + 'txtCustId').jqxInput('value');
            SaveWip.rows[0].CUSTNAME = $(headerId + 'txtCustName').jqxInput('value');
            SaveWip.rows[0].NOTE = $(headerId + 'txtMemo').val();
            SaveWip.rows[0].SERVICECODE = $(headerId + 'gilServiceCode').csList('codeNo');
            SaveWip.rows[0].SERVICENAME = $(headerId + 'gilServiceCode').csList('description');
            
            if ( $(headerId + 'gilGroupCode').csList('codeNo') != '' ) {
                SaveWip.rows[0].GROUPCODE = $(headerId + 'gilGroupCode').csList('codeNo');
                SaveWip.rows[0].GROUPNAME = $(headerId + 'gilGroupCode').csList('description');
            } else {
                SaveWip.rows[0].GROUPCODE = null;
                SaveWip.rows[0].GROUPNAME = null;
            };
            if ( $(headerId + 'gilWorkerEn1').csList('codeNo') != '' ) {
                SaveWip.rows[0].WORKEREN1 = $(headerId + 'gilWorkerEn1').csList('codeNo');
                SaveWip.rows[0].WORKERNAME1 = $(headerId + 'gilWorkerEn1').csList('description');
            } else {
                SaveWip.rows[0].WORKEREN1 = null;
                SaveWip.rows[0].WORKERNAME1 = null;
            };
            if ( $(headerId + 'gilWorkerEn2').csList('codeNo') != '' ) {
                SaveWip.rows[0].WORKEREN2 = $(headerId + 'gilWorkerEn2').csList('codeNo');
                SaveWip.rows[0].WORKERNAME2 = $(headerId + 'gilWorkerEn2').csList('description');
            } else {
                SaveWip.rows[0].WORKEREN2 = null;
                SaveWip.rows[0].WORKERNAME2 = null;
            };
            if ( $(headerId + 'gilMFCode1').csList('codeNo') != '' ) {
                SaveWip.rows[0].MFCode1 = $(headerId + 'gilMFCode1').csList('codeNo');
                SaveWip.rows[0].MFNAME1 = $(headerId + 'gilMFCode1').csList('description');
            } else {
                SaveWip.rows[0].MFCode1 = null;
                SaveWip.rows[0].MFNAME1 = null;
            };
            if ( $(headerId + 'gilMFCode2').csList('codeNo') != '' ) {
                SaveWip.rows[0].MFCode2 = $(headerId + 'gilMFCode2').csList('codeNo');
                SaveWip.rows[0].MFNAME2 = $(headerId + 'gilMFCode2').csList('description');
            } else {
                SaveWip.rows[0].MFCode2 = null;
                SaveWip.rows[0].MFNAME2 = null;
            };
            if ( $(headerId + 'gilReturnCode').csList('codeNo') != '' ) {
                SaveWip.rows[0].RETURNCODE = $(headerId + 'gilReturnCode').csList('codeNo');
                SaveWip.rows[0].RETURNNAME = $(headerId + 'gilReturnCode').csList('description');
            } else {
                SaveWip.rows[0].RETURNCODE = null;
                SaveWip.rows[0].RETURNNAME = null;
            };
            if ( $(headerId + 'gilReturnDescCode').csList('codeNo') != '' ) {
                SaveWip.rows[0].RETURNDESCCODE = $(headerId + 'gilReturnDescCode').csList('codeNo');
                SaveWip.rows[0].RETURNDESCNAME = $(headerId + 'gilReturnDescCode').csList('description');
            } else {
                SaveWip.rows[0].RETURNDESCCODE = null;
                SaveWip.rows[0].RETURNDESCNAME = null;
            };
            if ( $(headerId + 'gilSatiCode').csList('codeNo') != '' ) {
                SaveWip.rows[0].SATICODE = $(headerId + 'gilSatiCode').csList('codeNo');
                SaveWip.rows[0].SATINAME = $(headerId + 'gilSatiCode').csList('description');
            } else {
                SaveWip.rows[0].SATICODE = null;
                SaveWip.rows[0].SATINAME = null;
            };
            if ( $(headerId + 'gilSignEn').csList('codeNo') != '' ) {
                SaveWip.rows[0].SIGNEN = $(headerId + 'gilSignEn').csList('codeNo');
                SaveWip.rows[0].SIGNNAME = $(headerId + 'gilSignEn').csList('description');
            } else {
                SaveWip.rows[0].SIGNEN = null;
                SaveWip.rows[0].SIGNNAME = null;
            };

            SaveWip.rows[0].WORKUNIT = 0;
            if ( $(headerId + 'txtWorkUnit').jqxInput('value') != '' ) {
                SaveWip.rows[0].WORKUNIT = $(headerId + 'txtWorkUnit').jqxInput('value');
            };

            if ( $(headerId + 'gilReturnCode').csList('codeNo') != '' ) {
                if ( $(headerId + 'edtCallOkTime' ).jqxDateTimeInput('getText') != '' )  {
                    //SaveWip.rows[0].CALLOKTIME = jsonDate($(headerId + 'edtCallOkTime').jqxDateTimeInput('getText'));
                    SaveWip.rows[0].CALLOKTIME = DateToJson($(headerId + 'edtCallOkTime').jqxDateTimeInput('getDate'));
                };
            };
            if (  $(headerId + 'dtFinTime' ).jqxDateTimeInput('getText') != '' ) {
                if ( $(headerId + 'edtCallOkTime' ).jqxDateTimeInput('getText') == '' )  {
                    SaveWip.rows[0].CALLOKTIME = DateToJson($(headerId + 'dtFinTime').jqxDateTimeInput('getDate'));
                };
            };
            SaveWip.rows[0].FINUNIT = 0;
            if ( $(headerId + 'txtFinUnit').jqxInput('value') != '' ) {
                SaveWip.rows[0].FINUNIT = $(headerId + 'txtFinUnit').jqxInput('value');
            };
            SaveWip.rows[0].PRIORITY = 0;
            if ( $(headerId + 'chkFlag').jqxCheckBox('val') ) {
                SaveWip.rows[0].PRIORITY = 1;
            };
            SaveWip.rows[0].PRINTBILLFLAG = 0;
            if ($(headerId + 'chkPrintBillFlag').jqxCheckBox('val')) {
                SaveWip.rows[0].PRINTBILLFLAG = 1;
            };
            
            if ( $(headerId + 'dtFinTime' ).jqxDateTimeInput('getText') !='' ) {
                SaveWip.rows[0].FINTIME = DateToJson($(headerId + 'dtFinTime').jqxDateTimeInput('getDate'));
            };
            if ( $(headerId + 'edtResvTime' ).jqxDateTimeInput('getText') !='' ) {
                //SaveWip.rows[0].RESVTIME = jsonDate($(headerId + 'edtResvTime').jqxDateTimeInput('getText'));
                //SaveWip.rows[0].RESVTIME = $(headerId + 'edtResvTime').jqxDateTimeInput('getDate')
                SaveWip.rows[0].RESVTIME = DateToJson($(headerId + 'edtResvTime').jqxDateTimeInput('getDate'));
                
            };
            if ( $(headerId + 'edtSignDate' ).jqxDateTimeInput('getText') !='' ) {
                SaveWip.rows[0].SIGNDATE = DateToJson($(headerId + 'edtSignDate').jqxDateTimeInput('getDate'));
            };
            if ( $(headerId + 'edtResvFlagTime' ).jqxDateTimeInput('getText') !='' ) {
                SaveWip.rows[0].RESVFLAGTIME = formatStringDate(
                        $(headerId + 'edtResvFlagTime').jqxDateTimeInput('getDate'), 'HHmm', true);
            };
            $.extend(options.SaveMaintain.Wip, SaveWip);
            if (options.SaveMaintain.OldWip.rows.length === 0) {
                $.extend(true, options.SaveMaintain.OldWip, SaveWip);
            };
            ChkChargeData(div);
           
        } catch (err) {
            errorHandle(formName, 'ScrToRcd', err);
            changeMode(div, options.editMode);
        };
    };
    function ChkChargeData(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        options.blnShouldReg = false;
        try {
            if (options.editMode == editMode.edit) {
                if (options.initData.Wip.rows[0].SIGNDATE == null &&
                        $(headerId + 'edtSignDate').jqxDateTimeInput('getText') != '' &&
                       options.initData.Charge.rows.length > 0) {
                    if ($(headerId + 'dtFinTime').jqxDateTimeInput('getText') != '' && !options.BatchFin) {
                        if (getUsePriv(options.initData.Priv.rows, 'SO111261')) {
                            messageBox(options.language.ChangeBillData, messageType.yesno, null,
                                            function (r) {
                                                if (r == 'yes') { options.blnShouldReg = true; }
                                                ChkDataOk(div);
                                                return;
                                            });

                        };
                        ChkDataOk(div);
                        return;
                    } else {
                        if ($(headerId + 'edtSignDate').jqxDateTimeInput('getText') != '' && !options.BatchFin) {
                            if ($(headerId + 'gilReturnCode').csList('codeNo') != '') {
                                messageBox(options.language.UpdBillData, messageType.yesno, null,
                                       function (r) {
                                           if (r == 'yes') { options.blnShouldReg = true; }
                                           ChkDataOk(div);
                                           return;
                                       });
                            };
                        };
                        ChkDataOk(div);
                        return;
                    };

                } else {
                    ChkDataOk(div);
                    return;
                };
            } else {
                ChkDataOk(div);
            };
        } catch (err) {
            errorHandle(formName, 'ChkChargeData', err);
            changeMode(event.data, options.editMode);
        }
    };
    function ChkDataOk(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {

            var parameters = $.extend({}, options.loginInfo,
                   { EditMode: { type: 'integer', value: options.editMode } },
                   { dsWipData: { type: 'string', value: options.SaveMaintain } },
                   { ShouldReg: { type: 'boolean', value: options.blnShouldReg } });
            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkDataOk',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            Save(div);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);

                            changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'ChkDataOk-Server', err);
                        changeMode(div, options.editMode);
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
            errorHandle(formName, 'ChkDataOk', err);
            changeMode(event.data, options.editMode);
        };
    };
    function ChkCloseDate(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (!options.blnShouldReg) {
            Save(div);
            return;
        };
        try {
            var parameters = $.extend({}, options.loginInfo,
                 { CloseDate: { type: 'integer', value: $(headerId +'edtSignDate').jqxDateTimeInput('getText') } },
                 { SERVICETYPE: { type: 'string', value: options.serviceType } });
                 
            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkCloseDate',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            //ChkCloseDate(div);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);

                            changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'ChkDataOk-Server', err);
                        changeMode(div, options.editMode);
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
            errorHandle(formName, 'ChkCloseDate', err);
            changeMode(event.data, options.editMode);
        };
    };
    function Save(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, options.loginInfo,
                  { EditMode: { type: 'integer', value: options.editMode } },
                   { ShouldReg: { type: 'boolean', value: options.blnShouldReg } },
                  { dsWipData: { type: 'string', value: options.SaveMaintain } },
                  { ReturnFlag: { type: 'boolean', value: false } });
            var params = getParameters(riadllName,
                   riaClassName,
                   'Save',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            options.isSaved = true;
                            options.SNO = data.ResultXML;
                            options.serviceType = $(headerId + 'gilServiceType').csList('codeNo');
                            options.editMode = editMode.view;
                            if (options.IsAutoClosed && options.containerIsWindow) {
                                messageBox(options.language.SaveOK, messageType.critical, null, function () {
                                    $(options.container).trigger('winClosing');
                                    return;
                                });
                            } else {
                                GetMaintainData(div);
                            }

                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'ChkDataOk-Server', err);
                        changeMode(div, options.editMode);
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
            errorHandle(formName, 'Save', err);
            changeMode(event.data, options.editMode);
        };
    };
    
    function GetMaintainData(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, options.loginInfo,                 
                 { SNo: { type: 'string', value: options.SNO } });                 
            var params = getParameters(riadllName,
                   riaClassName,
                   'GetMaintainData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            $.extend(true, options.initData.Wip, tmp.Wip);
                            $.extend(true, options.initData.Facility, tmp.Facility);
                            $.extend(true, options.initData.Charge, tmp.Charge);
                            $.extend(true, options.initData.PrFacility, tmp.PrFacility);
                            $.extend(true, options.initData.ChangeFacility, tmp.ChangeFacility);
                            $.extend(true, options.initData.Extend, tmp.Extend);
                            $.extend(true, options.initData.Product, tmp.Product);
                            $.extend(true, options.initData.ChangeProduct, tmp.ChangeProduct);
                            tmp = {};
                            tmp = null;
                            delete tmp;
                            options.CUSTID = options.initData.Wip.rows[0].CUSTID;
                            options.serviceType = options.initData.Wip.rows[0].SERVICETYPE;
                            options.SNO = options.initData.Wip.rows[0].SNO;
                            rcdToScr(div);
                            changeMode(div, options.editMode);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetMaintainData-Server', err);
                        changeMode(div, options.editMode);
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
            errorHandle(formName, 'GetMaintainData', err);
            changeMode(event.data, options.editMode);
        };
    };
    function newWipRow() {
        var row = {
            ACCEPTEN: null,
            ACCEPTNAME: null,
            ACCEPTNAME: null,
            ADDRESS: null,
            ADDRNO: null,
            CALLOKTIME: null,
            CHECKEN: null,
            CHECKNAME: null,
            CHG_ID: null,
            CLSEN: null,
            CLSTIME: null,
            COMPCODE: null,
            CONTRACT_SERIAL_NUM: null,
            CUSTID: null,
            CUSTNAME: null,
            DRIVESTARTTIME: null,
            DRIVESTOPTIME: null,
            FINTIME: null,
            FINUNIT: null,
            GROUPCODE: null,
            GROUPNAME: null,
            IVRDATAMATCH: null,
            IVRFLAG: null,
            IVRMODIFYCODE: null,
            IVRMODIFYNAME: null,
            IVRSHORTSNO: null,
            MAINSNO: null,
            MFCODE1: null,
            MFCODE2: null,
            MFNAME1: null,
            MFNAME2: null,
            MODIFYFLAG: null,
            NEWUPDTIME: null,
            NODENO: null,
            NOKEEPUNIT: null,
            NOTE: null,
            OLDIVRDATAMATCH: null,
            OLDSNO: null,
            ORDERNO: null,
            PRINTBILLFLAG: null,
            PRINTTIME: null,
            PRINTUSERNAME: null,
            PRIORITY: null,
            PRTCLSTIME: null,
            PRTCOUNT: null,
            REALGROUPNO:null,
            RESVFLAGTIME: null,
            RESVTIME: null,
            RETURNCODE: null,
            RETURNDESCCODE: null,
            RETURNDESCNAME: null,
            RETURNNAME: null,
            RETURNOLDSNO: null,
            RETURNPREOLDSNO: null,
            SALESCODE: null,
            SALESNAME: null,
            SATICODE: null,
            SATINAME: null,
            SERVCODE: null,
            SERVICECODE: null,
            SERVICENAME: null,
            SERVICETYPE: null,
            SIGNDATE: null,
            SIGNEN: null,
            SIGNNAME: null,
            SNO: null,
            STRTCODE: null,
            TAPMODEL: null,
            TEL1: null,
            UPDEN: null,
            UPDTIME: null,
            WORKCARNO: null,
            WORKEREN1: null,
            WORKEREN2: null,
            WORKEREN3: null,
            WORKERNAME1: null,
            WORKERNAME2: null,
            WORKERNAME3: null,
            WORKRESVTIME: null,
            WORKSERVCODE: null,
            WORKSIGNEN: null,
            WORKSIGNNAME: null,
            WORKSTARTTIME: null,
            WORKSTOPTIME: null,
            WORKUNIT:null
        };
        return row;
    }
    function OffHandler(div) {
        try {
            var headerId = '#' + $(div).prop('id');
            
            $(headerId + 'gilServiceCode').unbind('selectedIndexChanged');
            $(headerId + 'gilWorkerEn1').unbind('selectedIndexChanged');
            $(headerId + 'gilMFCode1').unbind('selectedIndexChanged');
            $(headerId + 'gilReturnCode').unbind('selectedIndexChanged');
            $(headerId + 'edtResvTime').unbind('change');
            $(headerId + 'btnSave').unbind('click');
            $(headerId + 'gilServiceType').unbind('selectedIndexChanged');
        } catch (err) {
            errorHandle(formName, 'OffHandler', err);
        };
    };
    function AddHandler(div) {
        try {
            var headerId = '#' + $(div).prop('id');
            $(headerId + 'gilServiceCode').bind('selectedIndexChanged', div, gilServiceCodeSelectedIndexChanged);
            $(headerId + 'gilWorkerEn1').bind('selectedIndexChanged', div, gilWorkerEn1SelectItemChange);
            $(headerId + 'gilMFCode1').bind('selectedIndexChanged', div, gilMFCode1SelectItemChange);
            $(headerId + 'gilReturnCode').bind('selectedIndexChanged', div, gilReturnCodeSelectItemChange);
            $(headerId + 'edtResvTime').bind('change', div, edtResvTimeChange);
            $(headerId + 'btnSave').bind('click', div, btnSaveClick);
            $(headerId + 'gilServiceType').bind('selectedIndexChanged', div, gilServiceTypeSelectedIndexChanged);
            $(headerId + 'btnCancel').bind('click', div, btnCancelClick);
        }
        catch (err) {
            errorHandle(formName, 'AddHandler', err);
        };
    };
   
    function assignCsListData(div) {
        try {
            var initData = $.data(div, formName).options.initData;
            var headerId = '#' + $(div).prop('id');
            if (initData.ServiceType != undefined) {
                $(headerId + 'gilServiceType').csList('source', initData.ServiceType.rows);
            };
            
            if (initData.MaintainCode != undefined) {
                $(headerId + 'gilServiceCode').csList('source', initData.MaintainCode.rows);
            }
            if (initData.MFCode != undefined) {
                $(headerId + 'gilMFCode1').csList('source', initData.MFCode.rows);
            };
            if (initData.MFCode2 != undefined) {
                $(headerId + 'gilMFCode2').csList('source', initData.MFCode2.rows);
            };
            if (initData.RETURNCODE != undefined) {
                $(headerId + 'gilReturnCode').csList('source', initData.ReturnCode.rows);
            };
            if (initData.ReturnDescCode != undefined) {
                $(headerId + 'gilReturnDescCode').csList('source', initData.ReturnDescCode.rows);
            };
            if (initData.SatiCode != undefined) {
                $(headerId + 'gilSatiCode').csList('source', initData.SatiCode.rows);
            };
            if (initData.SignEn != undefined) {
                $(headerId + 'gilSignEn').csList('source', initData.SignEn.rows);
            };
            if (initData.GroupCode != undefined) {
                $(headerId + 'gilGroupCode').csList('source', initData.GroupCode.rows);
            };
            if (initData.WorkerEn1 != undefined) {
                $(headerId + 'gilWorkerEn1').csList('source', initData.WorkerEn1.rows);
            };
            if (initData.WorkerEn2 != undefined) {
                $(headerId + 'gilWorkerEn2').csList('source', initData.WorkerEn2.rows);
            };
            
        }
        catch (err) {
            errorHandle(formName, 'assignCsListData', err);
        };
    };
    
    function disableAllcontrol(div) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            $(headerId + 'gilServiceType').csList('disabled', true);
            $(headerId + 'gilServiceCode').csList('disabled', true);
            $(headerId + 'gilMFCode1').csList('disabled', true);
            $(headerId + 'gilMFCode2').csList('disabled', true);
            $(headerId + 'gilReturnCode').csList('disabled', true);
            $(headerId + 'gilReturnDescCode').csList('disabled', true);
            $(headerId + 'gilSatiCode').csList('disabled', true);
            $(headerId + 'gilSignEn').csList('disabled', true);
            $(headerId + 'gilGroupCode').csList('disabled', true);
            $(headerId + 'gilWorkerEn1').csList('disabled', true);
            $(headerId + 'gilWorkerEn2').csList('disabled', true);

            $(headerId + 'txtMemo').jqxTextArea({ disabled: true });
            $(headerId + 'chkFlag').jqxCheckBox({ disabled: true });
            $(headerId + 'chkPrintBillFlag').jqxCheckBox({ disabled: true });
            $(headerId + 'edtCallOkTime').jqxDateTimeInput({ disabled: true });
            $(headerId + 'dtFinTime').jqxDateTimeInput({ disabled: true });
            $(headerId + 'edtResvTime').jqxDateTimeInput({ disabled: true });
            $(headerId + 'edtSignDate').jqxDateTimeInput({ disabled: true });
            $(headerId + 'edtResvFlagTime').jqxDateTimeInput({ disabled: true });

            $(headerId + 'btnResv').jqxButton({ disabled: true });
            $(headerId + 'btnPrintBillFlag').jqxButton({ disabled: true });
            $(headerId + 'btnSubAdd1').jqxButton({ disabled: true });
            $(headerId + 'btnSubEdit1').jqxButton({ disabled: true });
            $(headerId + 'btnSubDelete1').jqxButton({ disabled: true });
            $(headerId + 'btnSubAdd2').jqxButton({ disabled: true });
            $(headerId + 'btnSubEdit2').jqxButton({ disabled: true });
            $(headerId + 'btnSubDelete2').jqxButton({ disabled: true });
            $(headerId + 'btnSave').jqxButton({ disabled: true });
            $(headerId + 'btnReserve2').jqxButton({ disabled: true });
            $(headerId + 'btnViewPR').jqxButton({ disabled: true });
            $(headerId + 'btnCancel').jqxButton({ disabled: true });


        }
        catch (err) {
            errorHandle(formName, 'clearAllcontent', err);
        };
    };
    function formatStringDate(d, f,emptyPrompt) {
        try {
            Date.prototype.yyyyMM = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based                         
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM);
            };
            Date.prototype.yyyyMMdd = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
                var dd = this.getDate().toString();
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                   ((dd.length == 1) ? '0' + dd : dd);
            };
            Date.prototype.yyyyMMddHH = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
                var dd = this.getDate().toString();
                var hh = this.getHours().toString();
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                   ((dd.length == 1) ? '0' + dd : dd) + ' ' + ((hh.length == 1) ? '0' + hh : hh);
            };
            Date.prototype.yyyyMMddHHmm = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
                var dd = this.getDate().toString();
                var hh = this.getHours().toString();
                var m = this.getMinutes().toString();
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                   ((dd.length == 1) ? '0' + dd : dd) + ' ' + ((hh.length == 1) ? '0' + hh : hh) + ':' +
                   ((m.length == 1) ? '0' + m : m);
            };
           Date.prototype.yyyyMMddHHmmss = function () {
               var yyyy = this.getFullYear().toString();               
               var MM =  (this.getMonth() + 1).toString(); // getMonth() is zero-based         
               var dd =  this.getDate().toString();
               var hh =  this.getHours().toString();
               var m = this.getMinutes().toString();                
               var ss = this.getSeconds().toString();
               return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                   ((dd.length == 1) ? '0' + dd : dd) + ' ' + ((hh.length == 1) ? '0' + hh : hh) + ':' +
                   ((m.length == 1) ? '0' + m : m) + ':' + ((ss.length == 1) ? '0' + ss : ss);              
           }; 
           Date.prototype.HHmm = function (){
               var hh =  this.getHours().toString();
               var m = this.getMinutes().toString();   
               return  ((hh.length == 1) ? '0' + hh : hh) + ':' +
                   ((m.length == 1) ? '0' + m : m)
           };
           Date.prototype.HHmmss= function () {
               var hh =  this.getHours().toString();
               var m = this.getMinutes().toString();                
               var ss = this.getSeconds().toString();
               return ((hh.length == 1) ? '0' + hh : hh) + ':' +
                   ((m.length == 1) ? '0' + m : m) + ':' + ((ss.length == 1) ? '0' + ss : ss);
           };
           var ret = '';
            switch (f) {
                case 'yyyyMMdd':
                    ret = d.yyyyMMdd();                 
                    break;
                case 'yyyyMMddHHmmss':                    
                   ret = d.yyyyMMddHHmmss();
                    break;
                case 'yyyyMM':
                    ret = d.yyyyMM();
                    break;
                case 'yyyyMMddHH':
                    ret = d.yyyyMMddHH();
                    break;
                case 'yyyyMMddHHmm':
                    ret = d.yyyyMMddHHmm();
                    break;
                case 'HHmm' :
                    ret = d.HHmm();
                    break;
                case 'HHmmss':
                    ret = d.HHmmss();
                    break;
           };
            if (ret.length > 0 && emptyPrompt) {
                ret = ret.replace(/\D*/g, '');
            };
            return ret;
        }
        catch (err)
        {
            errorHandle(formName, 'formtStringDate', err);
        }
    };
    function DateToJson(d) {
        try {
          
            Date.prototype.toJSON = function () {                
                return this.getFullYear() + '-' +
                    ((this.getMonth() + 1) < 10 ? '0' + (this.getMonth() +1 )  : (this.getMonth() + 1)) + '-' +
                    (this.getDate() < 10 ? '0' + this.getDate() : this.getDate()) + 'T' +
                    (this.getHours() < 10 ? '0' + this.getHours() : this.getHours()) + ':' +
                    (this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes()) + ':' +
                    (this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds()) + '.' +
                    (this.getMilliseconds() < 10 ? '0' + this.getMilliseconds() : this.getMilliseconds()) + 'Z';
            };            
            return d.toJSON();
        } catch (err) {
            throw err.message;
        };
    };
    function jsonDate(jdate) {
        try {
            var ary = jdate.split(/[^0-9]/);
            //2011-06-21T14:27:28.00
            ary = $.grep(ary, function (value) { return $.isNumeric(value) });
            var len = 7 - ary.length;
            if ( len > 0 ) {
                for (i = 0; i < len; i++) {
                    ary.push(0);
                };
            };
            if (jdate.indexOf('下午') > 0 || jdate.toLowerCase().indexOf('pm') > 0) {
                ary[3] = parseInt(ary[3]) + 12;
            };
            return new Date(ary[0], parseInt(ary[1])-1, ary[2], ary[3], ary[4], ary[5], ary[6]);
        }
        catch (err) {
            errorHandle(formName, 'jsonDate', err);
        };
    };
    function rcdToScr(div,e) {
        try {
        
            var options = $.data(div, formName).options;
            var initData = $.data(div, formName).options.initData;            
            var headerId = '#' + $(div).prop('id');
            options.oldResvTime = '1900/01/01';
            if (options.SNO != undefined) {
                $(headerId + 'txtSNo').val(options.SNO);
            };

            if (options.initData.GroupCode != undefined) {
                if (options.serviceType != '' && options.serviceType != null) {
                    if ($(headerId + 'gilGroupCode').csList('codeNo') == '') {
                        if (e == editMode.append && options.initData.GroupCode.rows.length >= 1) {
                            if (options.initData.GroupCode.rows[0].FLAG === 1) {
                                $(headerId + 'gilGroupCode').csList('codeNo', initData.GroupCode.rows[0].CODENO);
                            };
                        };
                    };
                };
            };
           
            if (initData.SO001.rows.length >= 1) {
                $(headerId + 'txtServName').val(initData.SO001.rows[0].SERVAREA);
                $(headerId + 'txtClassName').val(initData.SO001.rows[0].CLASSNAME1);
                $(headerId + 'txtInstAddress').val(initData.SO001.rows[0].INSTADDRESS);
                $(headerId + 'txtTel1').val(initData.SO001.rows[0].TEL1);
                $(headerId + 'txtCustId').val(initData.SO001.rows[0].CUSTID);
                $(headerId + 'txtCustName').val(initData.SO001.rows[0].CUSTNAME);
            };
            if (initData.Wip.rows.length > 0) {
                options.serviceType = initData.Wip.rows[0].SERVICETYPE;
                $(headerId + 'txtSNo').val(initData.Wip.rows[0].SNO);
                $(headerId + 'gilServiceType').csList('codeNo', options.serviceType);
                if (e !== editMode.append) {
                    $(headerId + 'gilServiceType').csList('disabled', true);
                } else { $(headerId + 'gilServiceType').csList('disabled', false); }

                $(headerId + 'txtCustId').val(initData.Wip.rows[0].CUSTID);
                $(headerId + 'txtCustName').val(initData.Wip.rows[0].CUSTNAME);
                $(headerId + 'txtMemo').jqxTextArea('val', initData.Wip.rows[0].NOTE);
                $(headerId + 'gilServiceCode').csList('codeNo', initData.Wip.rows[0].SERVICECODE);
                $(headerId + 'gilGroupCode').csList('codeNo', initData.Wip.rows[0].GROUPCODE);
                $(headerId + 'gilWorkerEn1').csList('codeNo', initData.Wip.rows[0].WORKEREN1);
                $(headerId + 'gilWorkerEn2').csList('codeNo', initData.Wip.rows[0].WORKEREN2);
                $(headerId + 'gilMFCode1').csList('codeNo', initData.Wip.rows[0].MFCODE1);
                $(headerId + 'gilMFCode2').csList('codeNo', initData.Wip.rows[0].MFCODE2);
                $(headerId + 'gilReturnCode').csList('codeNo', initData.Wip.rows[0].RETURNCODE);
                $(headerId + 'gilSatiCode').csList('codeNo', initData.Wip.rows[0].SATICODE);
                $(headerId + 'gilSignEn').csList('codeNo', initData.Wip.rows[0].SIGNEN);
                $(headerId + 'lblAcceptName').text(initData.Wip.rows[0].ACCEPTNAME);
                if (initData.Wip.rows[0].PRINTUSERNAME != null) {
                    $(headerId + 'lblPrintUserName').text(initData.Wip.rows[0].PRINTUSERNAME);
                };
                
                $(headerId + 'lblPrtCount').text(initData.Wip.rows[0].PRTCOUNT);
                if (initData.Wip.rows[0].ACCEPTTIME != null && initData.Wip.rows[0].ACCEPTTIME !== 'null') {
                    var d = jsonDate(initData.Wip.rows[0].ACCEPTTIME);

                    $(headerId + 'lblAcceptTime').text(formatStringDate(d, 'yyyyMMddHHmmss', false));
                };
                if (initData.Wip.rows[0].CLSTIME != null && initData.Wip.rows[0].CLSTIME !== 'null') {

                    var d = new Date(initData.Wip.rows[0].CLSTIME);
                    $(headerId + 'lblClsTime').text(formatStringDate(d, 'yyyyMMddHHmmss', false));
                };
                if (initData.Wip.rows[0].PRINTTIME != null && initData.Wip.rows[0].PRINTTIME !== 'null') {
                    var d = jsonDate(initData.Wip.rows[0].PRINTTIME);

                    $(headerId + 'lblPrintTime').text(formatStringDate(d, 'yyyyMMddHHmmss', false));
                };
                if (initData.Wip.rows[0].WORKUNIT != null && initData.Wip.rows[0].WORKUNIT !== 'null') {

                    $(headerId + 'txtWorkUnit').val(initData.Wip.rows[0].WORKUNIT);
                } else { $(headerId + 'txtWorkUnit').val('0') };
                if (initData.Wip.rows[0].FINUNIT != null && initData.Wip.rows[0].FINUNIT !== 'null') {
                    $(headerId + 'txtFinUnit').val(initData.Wip.rows[0].FINUNIT);
                } else { $(headerId + 'txtFinUnit').val('0') };

                (initData.Wip.rows[0].PRIORITY === 1) ? $(headerId + 'chkFlag').jqxCheckBox('check') : $(headerId + 'chkFlag').jqxCheckBox('uncheck');

                (initData.Wip.rows[0].PRINTBILLFLAG === 1) ? $(headerId + 'chkPrintBillFlag').jqxCheckBox('check') : $(headerId + 'chkPrintBillFlag').jqxCheckBox('uncheck');

                if (initData.Wip.rows[0].FINTIME != null && initData.Wip.rows[0].FINTIME != undefined) {
                    var d = jsonDate(initData.Wip.rows[0].FINTIME);
                    $(headerId + 'dtFinTime').jqxDateTimeInput('setDate', d);
                };

                if (initData.Wip.rows[0].RESVTIME != null && initData.Wip.rows[0].RESVTIME != undefined) {
                    var d = jsonDate(initData.Wip.rows[0].RESVTIME);
                    $(headerId + 'edtResvTime').jqxDateTimeInput('setDate', d);
                    options.oldResvTime = $(headerId + 'edtResvTime').jqxDateTimeInput('getText');
                } else { $(headerId + 'edtResvTime').jqxDateTimeInput('clearString'); };

                if (initData.Wip.rows[0].CALLOKTIME != null && initData.Wip.rows[0].CALLOKTIME != undefined) {
                    var d = jsonDate(initData.Wip.rows[0].CALLOKTIME);
                    $(headerId + 'edtCallOkTime').jqxDateTimeInput('setDate', d);
                } else { $(headerId + 'edtCallOkTime').jqxDateTimeInput('clearString'); };

                if (initData.Wip.rows[0].SIGNDATE != null && initData.Wip.rows[0].SIGNDATE != undefined) {
                    var d = jsonDate(initData.Wip.rows[0].SIGNDATE);
                    $(headerId + 'edtSignDate').jqxDateTimeInput('setDate', d);
                } else { $(headerId + 'edtSignDate').jqxDateTimeInput('clearString'); };

                if (initData.Wip.rows[0].RESVFLAGTIME != null && initData.Wip.rows[0].RESVFLAGTIME != undefined) {
                    var str = initData.Wip.rows[0].RESVFLAGTIME;
                    var d = new Date(1911, 1, 1, str.substr(0, 2), str.substr(2, 2));
                    $(headerId + 'edtResvFlagTime').jqxDateTimeInput('setDate', d);
                } else { $(headerId + 'edtResvFlagTime').jqxDateTimeInput('clearString'); };
            } else {
              
            };
           
        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    };
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var idArray= $('*[id^=' + $(div).prop('id') +']')
        try{
                idArray.each(function (index, value) {
                            var idStr = $(value).attr('id');
                            if ( idStr.replace($(div).prop('id'), "") != "")
                            {
                                if (lang[idStr.replace($(div).prop('id'),"")] != null ) {
                                    $('#' + idStr).text(lang[idStr.replace($(div).prop('id'), "")]);
                                }
                            }
                     });
                idArray = [];
                idArray = null;
        }
        catch (err) {
            errorHandle(formName, 'changeLanguage', err);
        }       
    };
    function renderControl(div) {
        try {
            var options = $.data(div, formName).options;            
            var controls = options.controls;
            var lang = options.language;
            var height = $(div).innerHeight();
            var headerId = $(div).prop('id');
            /*
            $("#" + headerId + "msgbox").jqxWindow({
                height: 100,
                width: 300,                
                isModal: false,
                modalOpacity: 0,
                autoOpen: true
            });
            $.data(div, formName).options.container.jqxWindow({ disabled: true });
            $("#" + headerId + "msgbox").on('close', function () {
                $.data(div, formName).options.container.jqxWindow({ disabled: false });
            });            
            var p = $(div).offset();            
            $("#" + headerId + "msgbox").jqxWindow(
                {
                    dragArea:
                      { left: p.left, top: p.top, width: $(div).width(), height: $(div).height() }
                });            
            controls.push({ name: 'msgbox', type: 'jqxWindow', level: 0 }); */

            $("#" + headerId + "mainSplitter").jqxSplitter({
                width: '100%',
                height: '100%',
                orientation: 'horizontal',
                splitBarSize: 3,                
                panels: [{ size: '60%' }, { size: '40%' }]
            });
            controls.push({ name: 'mainSplitter', type: 'jqxSplitter', level: 0 });
            $("#" + headerId+"partA-Head").jqxPanel({
                height: '15%',
                width: '100%',                
                autoUpdate: true                
            });
            controls.push({ name: 'partA-Head', type: 'jqxPanel', level: 1 });
            $("#" + headerId +"partBUI").jqxPanel({
                height: '98%',
                width: '100%',                
                autoUpdate: true
            });
            controls.push({ name: 'partBUI', type: 'jqxPanel', level: 1 });
            $("#" + headerId + "partA-Detail").jqxPanel({
                height: '85%',
                width: '100%',
                autoUpdate: true
            });
            controls.push({ name: 'partA-Detail', type: 'jqxPanel', level: 1 });
            $("#" + headerId +"txtSNo").jqxInput({
                width: '90%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: 'txtSNo', type: 'jqxInput', level: 2 });
            $("#" + headerId +"txtServName").jqxInput({
                width: '90%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: 'txtServName', type: 'jqxInput', level: 2 });
            $("#" + headerId + "txtStatus").jqxInput({
                //width: 40,
                //height: 20,
                width: '70%',
                height:25,
                disabled: true
            });
            controls.push({ name: 'txtStatus', type: 'jqxInput', level: 2 });
            $("#" + headerId + "txtClassName").jqxInput({
                width: '90%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: 'txtClassName', type: 'jqxInput', level: 2 });
            $("#" + headerId + "txtCustId").jqxInput({
                width: '90%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: 'txtCustId', type: 'jqxInput', level: 2 });
            $("#"+ headerId + "txtCustName").jqxInput({
                width: '90%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: 'txtCustName', type: 'jqxInput', level: 2 });
            $("#"+headerId+"txtTel1").jqxInput({
                width: '90%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: 'txtTel1', type: 'jqxInput', level: 2 });
            $("#" + headerId +"txtInstAddress").jqxInput({
                width: '96%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: 'txtInstAddress', type: 'jqxInput', level: 2 });

            $('#' + headerId+'txtMemo').jqxTextArea({
                placeHolder: $.data(div).SO1112A.options.language.lblMemo,
                height: '100%',
                width: '98%',
                minLength: 1
            });
            controls.push({ name: 'txtMemo', type: 'jqxTextArea', level: 2 });

            $("#"+ headerId +"txtWorkUnit").jqxInput({
                width: '60%',
                height: '90%',
                disabled : true
            });
            controls.push({ name: 'txtWorkUnit', type: 'jqxInput', level: 2 });

            $("#"+ headerId +"txtFinUnit").jqxInput({
                width: '60%',
                height: '100%',
                disabled: true
            });
            controls.push({ name: 'txtFinUnit', type: 'jqxInput', level: 2 });
            /*
            $('#' + headerId +'jqxTabs').jqxTabs({
                width: '98%',
                height: '98%'                
            }); */
            $('#' + headerId + 'jqxTabs').jqxExpander({
                width: '98%',
                height: '98%',
                toggleMode:'none',
                showArrow: false
            });
            controls.push({ name: 'jqxTabs', type: 'jqxExpander', level: 1 });
            
            $('#' + headerId + 'jqxTabsDetails').jqxTabs({
                width: '99%',
                height: '85%'
            });
            controls.push({ name: 'jqxTabsDetails', type: 'jqxTabs', level: 1 }); 

            $("#" + headerId +"dtFinTime").jqxDateTimeInput({
                formatString: 'yyyy/MM/dd HH:mm',
                value: null,
                width: 180
            });
            controls.push({ name: 'dtFinTime', type: 'jqxDateTimeInput', level: 2 });

            $("#" + headerId +"edtSignDate").jqxDateTimeInput({
                formatString: 'yyyy/MM/dd',
                value: null,
                width: 150
            });
            controls.push({ name: 'edtSignDate', type: 'jqxDateTimeInput', level: 2 });

            $("#" + headerId +"edtResvTime").jqxDateTimeInput({
                formatString: 'yyyy/MM/dd HH:mm',
                value: null,
                showCalendarButton: false,
                width: 150
            });
            controls.push({ name: 'edtResvTime', type: 'jqxDateTimeInput', level: 2 });

            $("#" + headerId +"edtCallOkTime").jqxDateTimeInput({
                formatString: 'yyyy/MM/dd HH:mm',
                showCalendarButton: false,
                value : null,
                width: '99%'
            });
            controls.push({ name: 'edtCallOkTime', type: 'jqxDateTimeInput', level: 2 });

            $("#" + headerId +"edtResvFlagTime").jqxDateTimeInput(
            {
                width: 42,
                formatString: 'HH:mm',
                value: null,
                showTimeButton: false,
                showCalendarButton: false
            });
            controls.push({ name: 'edtResvFlagTime', type: 'jqxDateTimeInput', level: 2 });
            $("#" + headerId +"gilMFCode1").csList({
                source: null,
                codeNoWidth: 60,
                width: 250,
                height: '20px',
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
            controls.push({ name: 'gilMFCode1', type: 'csList', level: 2 });

            $("#" + headerId +"gilMFCode2").csList({
                source: null,
                codeNoWidth: 60,
                width: 250,
                height: '20px',
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
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
            controls.push({ name: 'gilMFCode2', type: 'csList', level: 2 });

            $("#" + headerId + "gilReturnCode").csList({
                source: null,
                codeNoWidth: 60,
                width: 250,
                height: '20px',
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
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
            controls.push({ name: 'gilReturnCode', type: 'csList', level: 2 });
            $("#" + headerId +"gilReturnDescCode").csList({
                source: null,
                codeNoWidth: 60,
                width: 250,
                height: '20px',
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
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
            controls.push({ name: 'gilReturnDescCode', type: 'csList', level: 2 });
            $("#" + headerId +"gilSatiCode").csList({
                source: null,
                codeNoWidth: 60,
                width: 250,
                height: '20px',
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
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
            controls.push({ name: 'gilSatiCode', type: 'csList', level: 2 });

            $("#" + headerId +"gilSignEn").csList({
                //source: [{ EMPNO: '', EMPNAME: '' }],
                source: null,
                codeNoWidth: 80,
                width: 250,
                height: '20px',
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false,
                columns: [
                       { text: 'EMPNO', datafield: 'EMPNO' },
                       { text: 'EMPNAME', datafield: 'EMPNAME' }
                ]
            });
            controls.push({ name: 'gilSignEn', type: 'csList', level: 2 });
            
            $("#" + headerId +"gilServiceType").csList({
                //source: [{ CodeNo: '', Description: '' }],
                source: null,
                codeNoWidth: 50,
                //width:'250px',
                width:225,
                height: 22,
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,                
                descriptionReadOnly: false,
                columns: [
                        { text: 'CodeNo', datafield: 'CodeNo' },
                        { text: 'Description', datafield: 'Description'}
                        ]    
            });
            controls.push({ name: 'gilServiceType', type: 'csList', level: 2 });
            $("#" + headerId +"gilServiceCode").csList({
                //source: [{ CODENO: '', DESCRIPTION: '' }],
                source: null,
                codeNoWidth: 50,
                width: 225,
                height:22,
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
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
            controls.push({ name: 'gilServiceCode', type: 'csList', level: 2 });
            
            $("#" + headerId +"gilGroupCode").csList({
                //source: [{ CODENO: '', DESCRIPTION: '' }],
                source: null,
                codeNoWidth: 70,
                width: 225,
                height:22,
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
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
            controls.push({ name: 'gilGroupCode', type: 'csList', level: 2 });
            $("#" + headerId +"gilWorkerEn1").csList({
                source: null,
                codeNoWidth: 70,
                width: 225,
                height:22,
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false,
                columns: [
                       { text: 'EMPNO', datafield: 'EMPNO' },
                       { text: 'EMPNAME', datafield: 'EMPNAME' }
                ]
            });
            controls.push({ name: 'gilWorkerEn1', type: 'csList', level: 2 });
            $("#" + headerId +"gilWorkerEn2").csList({
                source: null,
                codeNoWidth: 70,
                width: 225,
                height:22,
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false,
                columns: [
                       { text: 'EMPNO', datafield: 'EMPNO' },
                       { text: 'EMPNAME', datafield: 'EMPNAME' }
                ]
            });
            controls.push({ name: 'gilWorkerEn2', type: 'csList', level: 2 });
            $('#' + headerId +'btnResv').jqxButton({
                width: 65,               
                height: 25,
                imgSrc: '../Images/Query3.png'
            });
            controls.push({ name: 'btnResv', type: 'jqxButton', level: 2 });
            
            $('#' + headerId +'btnSave').jqxButton($.extend({},imagePosition, {
                width: 85,
                height: 25,
                imgSrc: imageScr.save.imgSrc
            /*
            imgSrc: imageScr.save.imgSrc,
            imgPosition: imagePosition.imgPosition,
            textImageRelation: "imageBeforeText"
            */
            }));
            controls.push({ name: 'btnSave', type: 'jqxButton', level: 2 });
            $('#' + headerId +'btnCancel').jqxButton($.extend({},imagePosition,{
                width: 85,
                imgSrc: imageScr.cancel.imgSrc,
                height: 25
            }));
            controls.push({ name: 'btnCancel', type: 'jqxButton', level: 2 });
            $('#' + headerId +'btnReserve2').jqxButton({
                width: 100,
                height: 25               
            });
            controls.push({ name: 'btnReserve2', type: 'jqxButton', level: 2 });
            $('#' + headerId +'btnViewPR').jqxButton({
                width: 100,
                height: 25                
            });
            controls.push({ name: 'btnViewPR', type: 'jqxButton', level: 2 });
            $('#' + headerId +'btnSubAdd1').jqxButton($.extend({},imagePosition,{
                width: 50,
                imgSrc:'../Images/Add1.png',
                height: 22                
            }));
            controls.push({ name: 'btnSubAdd1', type: 'jqxButton', level: 2 });
            $('#' + headerId +'btnSubEdit1').jqxButton($.extend({},imagePosition,{
                width: 50,
                imgSrc: '../Images/Edit1.png',
                height: 22                
            }));
            controls.push({ name: 'btnSubEdit1', type: 'jqxButton', level: 2 });
            $('#' + headerId +'btnSubDelete1').jqxButton({
                width: 50,
                imgSrc: '../Images/Del1.png',
                height: 22                
            });
            controls.push({ name: 'btnSubDelete1', type: 'jqxButton', level: 2 });
            $('#' + headerId +'btnSubAdd2').jqxButton($.extend({},imagePosition,{
                width: 50,
                imgSrc: '../Images/Add1.png',
                height: 22                
            }));
            controls.push({ name: 'btnSubAdd2', type: 'jqxButton', level: 2 });
            $('#' +headerId +'btnSubEdit2').jqxButton($.extend({},imagePosition,{
                width: 50,
                imgSrc: '../Images/Edit1.png',
                height: 22                
            }));
            controls.push({ name: 'btnSubEdit2', type: 'jqxButton', level: 2 });
            $('#' + headerId +'btnSubDelete2').jqxButton($.extend({},imagePosition,{
                width: 50,
                imgSrc: '../Images/Del1.png',
                height: 22                
            }));
            controls.push({ name: 'btnSubDelete2', type: 'jqxButton', level: 2 });
            $('#' + headerId + 'btnPrintBillFlag').jqxButton({
                width: 70,
                height: 25               
            });
            controls.push({ name: 'btnPrintBillFlag', type: 'jqxButton', level: 2 });
            $("#" + headerId + "chkFlag").jqxCheckBox({ width: 75 });
            controls.push({ name: 'chkFlag', type: 'jqxCheckBox', level: 2 });
            $("#" + headerId + "chkPrintBillFlag").jqxCheckBox({ width: 20 });
            controls.push({ name: 'chkPrintBillFlag', type: 'jqxCheckBox', level: 2 });
            renderGrid(div);
           
            controls.push({ name: 'grdData1', type: 'jqxGrid', level: 2 });
            controls.push({ name: 'grdData2', type: 'jqxGrid', level: 2 });

          
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function renderGrid(div) {
        try {
            var options = $.data(div, formName).options;
            //var data = options.initData.DYNGRID_CD022;
            var lang = options.language;
            var headId = $(div).attr('id');
            //var height = ($(div).innerHeight() - buttonsHeight) / 100 * 50 - 10;
            options.grdData1 = {
                datatype: "json",              
            };
            options.grdData2 = {
                datatype: "json",
            };
            var dataAdapter1 = new $.jqx.dataAdapter(options.grdData1);
            var dataAdapter2 = new $.jqx.dataAdapter(options.grdData2);
            $("#" + headId +"grdData1").jqxGrid({
                width: '99%',
                height: '98%',
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
                    { text: lang.colFaciName, datafield: 'FACINAME', width: 150 },
                    { text: lang.colFaciSNO, datafield: 'FACISNO' }
                ]
            })
            $("#" + headId +"grdData2").jqxGrid({
                width: '100%',
                height: '98%',
                source: dataAdapter2,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 30,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;margin-top: 6px;'>" + (value + 1) + "</div>";
                        }
                    },
                    { text: lang.colCitemCode, datafield: 'CITEMCODE' ,width:100 },
                    { text: lang.colCitemName, datafield: 'CITEMNAME' ,width:160},
                    { text: lang.colOldAmt, datafield: 'OLDAMT',width:80 },
                    { text: lang.colSHOULDAMT, datafield: 'SHOULDAMT',width:80 },
                    {
                        text: lang.colREALSTARTDATE,
                        datafield: 'REALSTARTDATE',
                        cellsalign: 'center',
                        align: 'center',
                        cellsrenderer: function (row, column, value, defaulthtml, columnproperties) {
                            if (value != null) {
                             
                                return '<div style="text-align: center; margin-top: 6px;">' +
                                    formatStringDate(jsonDate(value), 'yyyyMMdd', false) + '</div>';
                            };
                        },
                        width: 120
                    },
                    {
                        text: lang.colRealStopDate,
                        datafield: 'REALSTOPDATE',
                        cellsalign: 'center',
                        align: 'center',
                        cellsrenderer: function (row, column, value, defaulthtml, columnproperties) {
                            if (value != null) {

                                return '<div style="text-align: center; margin-top: 6px;">' +
                                    formatStringDate(jsonDate(value), 'yyyyMMdd', false) + '</div>';
                            };
                        },
                        width: 120
                    },
                    { text: lang.colRealPeriod, datafield: 'REALPERIOD', width: 50, cellsalign: 'right', align: 'center' },
                    { text: lang.colRealAmt, datafield: 'REALAMT', width: 80 },
                    {
                        text: lang.colCancelFlag,
                        datafield: 'CANCELFLAG',
                        columntype: 'checkbox',
                        cellsrenderer: function (row, column, value, defaulthtml, columnproperties) {
                            value = true;
                        },
                        width: 50
                    },
                    { text: lang.colClctName, datafield: 'CLCTNAME', width:100 },
                    { text: lang.colType, datafield: 'TYPE', width: 50 },
                    { text: lang.colAddFlag, datafield: 'ADDFLAG', width: 80 },
                    { text: lang.colBillNo, datafield: 'BILLNO', width: 80, hidden: true },
                    { text: lang.colItem, datafield: 'ITEM', width: 80, hidden: true },
                    { text: lang.colROWID, datafield: 'ROWID', width: 80, hidden: true },
                ]
            })
           
        }
        catch (err) {
            errorHandle(formName, 'renderGrid', err);
        }
    }
})(jQuery);