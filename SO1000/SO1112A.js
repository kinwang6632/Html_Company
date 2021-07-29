(function ($) {
    var formName = "SO1112A";
    var riadllName = "CableSoft.SO.RIA.Wip.Maintain.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Wip.Maintain.Web.Maintain";
    var chargeTableName = "Charge";
    var facilityTableName = "Facility";
    var chooseFaciTableName = "ChooseFacility";
    var fieldPrivTableName = "FieldPriv";
    var userPrivTableName = "Priv";
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
        this.childForm = [];
        this.containerIsWindow = false;
        this.serviceType = 'X';
        this.theme = '';
        this.localization = null;
        this.OrderNo = null;
        this.workServcode = null;
        this.firstAutoSetFaci = true;
        this.SO111XDFirstTime = false;
        this.closingOK = false;
        this.isRefeshAll = false;
        this.isFromCall = false;
        this.oldWorkServCode = null;
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
        canView: function (jq, params, param2, param3) {
            return canView(params, param2, param3);
        },
        canAppend: function (jq, params, param2, param3) {
            return canAppend(params, param2, param3);
        },
        canEdit: function (jq, params, param2,param3) {
            return canEdit(params, param2,param3);
        },
        canDelete: function (jq, params, param2, param3) {
            return canDelete(params, param2, param3);
        },
        canPrint: function (jq, params, param2, param3) {
            return canPrint(params, param2, param3);
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
    $.fn.SO1112A = function (options, param, param2, param3) {
        try {            
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, param2, param3);
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
                        formLoaded(this);
                    }
                    
                    //$($.data(this, formName).options.container).csWindow('disable');                  
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
        $(options['container']).csWindow('close');
    };
    function formDestroy(div) {
        try {
            
            var controls = $.data(div, formName).options.controls;
            var options = $.data(div, formName).options;
            if (!options.closingOK) {
                DelResvPoint(div, function () {                    
                })
            };

            unBindHandler(div);
            

            options.childForm.forEach(function (element) {
                $(element[0]).off();
                $(element[0])[element[1]]('destroy');
            });
            options.childForm.length = 0;
            options.childForm = null;
            //$('#' + $(div).prop('id') + 'SO111XD').off();
           // $('#' + $(div).prop('id') + 'SO111XD')['SO111XD']('destroy');
            
            destroyControls(controls);
            deleteJSONObject(options);
            $(div).children().remove();
            
          
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
    function frmKeydown(e) {
        try {

            if (e.ctrlKey && e.which == 119) {
                messageBox(formName + JSON.stringify(e.data, null, '\t'), null, null, null, { width: 800, height: 500 });
            }
        }
        catch (err) {
            //errorHandle(formName, 'frmAddHandler_keydown', err, true);
        }
    };
    function formLoaded(div) {
        try {                        
            var options = $.data(div, formName).options;
            //$(options.container).bind('keydown',options, frmKeydown);
            options.maintainName = ignoreCase(options.parameters, 'Maintain', false)
            options.contactName = ignoreCase(options.parameters, 'Contact', false)
           // options.loginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            options.CUSTID = -1;
            options.serviceType = 'X';
            options.SNO = '';
            if (options.BatchFin == undefined) { options.BatchFin = false; };
            if (options.editMode == editMode.append) {
                options.SNO = '';
            } else {                                               
                if (options.parameters[options.maintainName] != undefined) {
                    options.SNO = ignoreCase(options.parameters[options.maintainName].rows[0], 'SNO', true);                   
                };
            };
            if ( options.parameters[options.contactName] != undefined ) {
                options.isFromCall = true;
                options.serviceType = ignoreCase(options.parameters[options.contactName].rows[0], 'serviceType', true);
            };
            if (options.parameters[options.maintainName] != undefined) {                
                options.CUSTID = ignoreCase(options.parameters[options.maintainName].rows[0], 'CUSTID', true);
                
            };
            if (options.parameters[options.maintainName] != undefined) {
                if (options.parameters[options.maintainName].rows.length > 0) {
                    if (options.parameters[options.maintainName].rows[0]['ORDERNO'] != undefined) {
                        if (options.parameters[options.maintainName].rows[0]['ORDERNO'] != null) {
                            if (options.OrderNo == null) {
                                options.OrderNo = options.parameters[options.maintainName].rows[0]['ORDERNO'];
                            };
                        };
                        
                    };
                };
            };
            loadForm(options,
                 'SO1000\\' + formName + '.html',
                 function (msg) {
                     try {
                         $(div).html(msg);
                         // $(div).append("<div data-id='msgbox'><div>詢問訊視窗</div><div>Content</div></div>");
                         if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                             options.containerIsWindow = true;
                             var csw = $.data(div, formName).options.container;
                             csw.on("winClosing", function () {
                                 if (options.editMode == editMode.view) {
                                     options.closingOK = true;
                                     csw.csWindow('close');
                                     return;
                                 };
                                 disableAllcontrol(div);
                                 messageBox(options.language.QuitAsk, messageType.yesno, null, function (flag) {
                                     if (flag == 'yes') {
                                         options.closingOK = true;
                                         DelResvPoint(div, function () {
                                             csw.csWindow('close');
                                         })
                                     } else {
                                         changeMode(div, options.editMode);
                                     };
                                 });
                             });
                         };
                         changeElementId(div);
                         loadingData(div, options.editMode, function () {
                             $(div).triggerHandler('loaded', [this, options]);


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
                        // $(div).append("<div data-id='msgbox'><div>詢問訊視窗</div><div>Content</div></div>");
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
                        };
                        changeElementId(div);                        
                        loadingData(div,options.editMode,  function () {                                      
                            $(div).triggerHandler('loaded', [this, options]);
                            
                           
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
    function DelResvPoint(div, action) {
        var options = $.data(div, formName).options;
        try {
            var loginInfo = getParaLoginInfo(div,formName)
            //var parameters = $.extend(true, {}, options.loginInfo);
            var parameters = $.extend(true, {}, loginInfo);
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
        var loginInfo = getParaLoginInfo(div, formName);
        try {

            /*
            var parameters = $.extend({}, options.loginInfo,
               { SNo: { type: 'string', value: options.SNO } },
               { CustId: { type: 'integer', value: options.CUSTID } }); */
            var parameters = $.extend({}, loginInfo,
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
                        if (options.initData.FalseSNo != undefined) {
                            if (options.initData.FalseSNo.rows.length === 1) {
                                options.SNO = options.initData.FalseSNo.rows[0].SNO;
                            };
                        };
                        if (options.initData.SO001 != undefined) {
                            if (options.initData.SO001.rows[0].SERVCODE != undefined) {
                                options.workServcode = options.initData.SO001.rows[0].SERVCODE;
                            };
                        };
                        
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    }
    function AutoAddMatain(div,faciSeqNo, action) {
        var loginInfo = getParaLoginInfo(div, formName);
        var options = $.data(div, formName).options;
        var autoAddMatain = false;
        var autoFaciSeqno = '';
        if (!options.firstAutoSetFaci) {
            action();            
            return;
        };
        if (options.parameters[options.contactName] != undefined) {
            if (options.parameters[options.contactName].rows.length > 0) {
                if (options.parameters[options.contactName].rows[0].SERVICETYPE != '' && options.parameters[options.contactName].rows[0].SERVICETYPE != 'C') {
                    autoFaciSeqno = options.parameters[options.contactName].rows[0].FACISEQNO
                    if (autoFaciSeqno != null && autoFaciSeqno != '') { autoAddMatain = true };
                };

            };
        };
        if (!autoAddMatain) {
            action();
            return;
        };
        try {
            var options = $.data(div, formName).options;
           
            var parameters = $.extend({}, loginInfo,
                { SNo: { type: 'string', value: options.SNO } },
                { FaciSeqNo: { type: 'string', value: autoFaciSeqno } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'AutoSetMaintain',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {                           
                            var tmp = JSON.parse(data.ResultXML);
                            var rowLength = tmp.ChangeFacility.rows.length;
                            for (var i = 0; i < rowLength; i++) {
                                options.initData.ChangeFacility.rows.push(tmp.ChangeFacility.rows[i]);
                            };
                            action();
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    } catch (err) {
                        errorHandle(formName, 'AutoAddMatain-Server', err);
                    } finally {
                        delete data;
                        data = null;
                        options.firstAutoSetFaci = false;
                    };

                }
            });
        }
        catch (err) {
            errorHandle(formName, 'AutoAddMatain', err);
        } finally {
            loginInfo = null;
            delete loginInfo;
        };

    }
    function GetServiceTypeChangeData(div, e, action) {
        var loginInfo = getParaLoginInfo(div, formName);
        try {
            var options = $.data(div, formName).options;
            var ServiceCode = $('#' + $(div).prop('id') + 'gilServiceCode').csList('codeNo');
            var serviceType = $('#' + $(div).prop('id') + 'gilServiceType').csList('codeNo');
            var MFCode1 = $('#' + $(div).prop('id') + 'gilMFCode1').csList('codeNo');
            if (ServiceCode === 'null') { ServiceCode = '' };
            if (serviceType === 'null') { serviceType = '' };
            if (MFCode1 === 'null') { MFCode1 = '' };

            if (serviceType == '') {
                if (options.serviceType != undefined) {
                    if (options.serviceType != null) {
                        if (options.serviceType != '') {
                            serviceType = options.serviceType;
                        }
                    }
                };
            }
            /*
            var parameters = $.extend({}, options.loginInfo,
                { SNo: { type: 'string', value: options.SNO } },
                { CustId: { type: 'integer', value: options.CUSTID } },
                { serviceType: {type: 'string',value : serviceType}},
                { ServiceCode: {type: 'string', value : ServiceCode}},
                { MFCode: {type: 'string', value: MFCode1}},
                { IsGetFalseSNo: {type : 'boolean', value : (e === editMode.append) }}); */
            var parameters = $.extend({}, loginInfo,
                { SNo: { type: 'string', value: options.SNO } },
                { CustId: { type: 'integer', value: options.CUSTID } },
                { serviceType: { type: 'string', value: serviceType } },
                { ServiceCode: { type: 'string', value: ServiceCode } },
                { MFCode: { type: 'string', value: MFCode1 } },
                { IsGetFalseSNo: { type: 'boolean', value: (e === editMode.append) } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetServiceTypeChangeData',
                   JSON.stringify(parameters));


            getServerData(params, {
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
                            };
                            if (options.initData.SO001 != undefined) {
                                if (options.initData.SO001.rows[0].SERVCODE != undefined) {
                                    options.workServcode = options.initData.SO001.rows[0].SERVCODE;
                                };
                            };
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        };
      
    };
    function showReserve2(div, action) {
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
            var win = createcsWindow(options.container, options.language.ShowForm7 + " [SO1114A]", winOptions);
            $('#' + win.windowId).one('close', function () {
                $('#' + win.contentId)['SO1114A']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.childForm.length = 0;
                if ($.isFunction(action)) { action(); };
            });
           
            var serviceType = $(headerId + 'gilServiceType').csList('codeNo');
            var resvTime = $(headerId + 'edtResvTime').csDateTime('getText');
            if (resvTime == null || resvTime == undefined) { resvTime = new Date() };
            //resvTime = formatStringDate(resvTime, 'yyyyMMdd', false);
            var servCode = options.initData.SO001.rows[0].SERVCODE;
            if (servCode == null) { servCode = 0 };
            var workerType = "M";
            $('#' + win.contentId)['SO1114A']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                servCode: servCode,
                resvTime: resvTime,
                workerType: '2',
                theme: options.theme,
                localization: options.localization
            });
            options.childForm.length = 0;
            options.childForm.push(['#' + win.contentId, 'SO1114A']);
            options.childForm.push(['#' + win.windowId, 'csWindow']);
        }
        catch (err) {
            errorHandle(formName, 'showReserve2', err);
        }
    };
    function showReserve(div, action) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var width = 940;
            var height = 500;
            width = $(div).width();
            height = $(div).height();
            if (width > $(div).width()) width = $(div).width();
            if (height > $(div).height()) height = $(div).height();
            
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
            var win = createcsWindow(options.container, options.language.LoadSO1115AName + " [SO1115A]", winOptions);
            $('#' + win.windowId).one('close', function () {
                var r =cloneJSON( $.data($('#' + win.contentId)[0], 'SO1115A').options);

                var resvTime = r.returnResvtime;
                var groupNo = r.returnWorkCode;
                var servCode = r.servCode;
                var isSaved = r.isSaved;
                $('#' + win.contentId)['SO1115A']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.childForm.length = 0;
               
                options.workServcode = servCode;
                action({ isSaved: isSaved, resvTime: resvTime, groupNo: groupNo,servCode:servCode });
                delete r;
                r = null;
            });
            options.childForm.length = 0;
            options.childForm.push(['#' + win.contentId,'SO1115A']);
            options.childForm.push(['#' + win.windowId,'csWindow']);
            /*
            var servCode = options.workServCode;
            var instRows = getRowByKeyValue(options.initData['Wip'].rows, 'CODENO', getControlObject(div, 'csInstCode').csList('codeNo'));
            var groupNo = instRows['GROUPNO'];
            var resvTime = getControlObject(div, 'edtResvTime').csDateTime('getText');
            var dsData = {
                inparas: {
                    columns: [{ name: 'RESVTIME', type: 'date' },
                        { name: 'SERVICETYPE', type: 'string' },
                        { name: 'WORKERTYPE', type: 'string' },
                        { name: 'WORKCODE', type: 'integer' },
                        { name: 'SERVCODE', type: 'string' },
                    ],
                    rows: [{
                        //                        RESVTIME: $(headerId + 'edtResvTime').jqxDateTimeInput('getDate'),
                        RESVTIME: $(headerId + 'edtResvTime').csDateTime('getDate'),
                        SERVICETYPE: $(headerId + 'gilServiceType').csList('codeNo'),
                        WORKERTYPE: 'M',
                        WORKCODE: Number($(headerId + 'gilServiceCode').csList('codeNo')),
                        SERVCODE: options.initData.SO001.rows[0].SERVCODE
                    }]
                }
            }; */
           
            var groupNo = $(headerId + 'gilServiceCode').csList('selectedItem').GROUPNO;            
            options.oldWorkServCode = options.workServcode;
            $('#' + win.contentId)['SO1115A']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                workCode: groupNo,
                resvTime: $(headerId + 'edtResvTime').csDateTime('getDate'),
                //servCode: options.initData.SO001.rows[0].SERVCODE,
                servCode: options.workServcode,
                theme: options.theme,
                localization: cloneJSON(options.localization)
            });
        }
        catch (err) {
            errorHandle(formName, 'showReserve', err);
        }
    };
    function showDelChargeData(div, em, rowIndex, action) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            //var width = options.container.width();;
            //var height = $(div).height();;
            var width = options.container.width()/2+60;
            var height = $(div).height()/2 - 60;
            var objectName = "SO1132A1";
            var x = ($(options.container).width() - width) / 2 ;
            var y = 26;
            
            var data = cloneDataTable(options.initData, chargeTableName, rowIndex, null, "Simple");
            
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                hasClosing: false,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language.ShowForm6 + " [SO1132A1]", winOptions);
            //var data = {};
            $('#' + win.windowId).one('close', function () {
                var r = $.extend(true, {}, $.data($('#' + win.contentId)[0], objectName).options);
                deleteJSONObject(data);
                $('#' + win.contentId)[objectName]('destroy');
                $('#' + win.windowId).csWindow('destroy');
                action({ isSaved: r.isSaved, wipData: r.wipData });
                options.childForm.length = 0;
                delete r;
                r = null;
            });

            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                //parameters: cloneJSON(data),
                wipData: cloneJSON(data),
                editMode: editMode.delete,
                wipType: 2,
                theme: options.theme,
                localization: cloneJSON(options.localization)
            });
            options.childForm.length = 0;
            options.childForm.push(['#' + win.contentId, objectName]);
            options.childForm.push(['#' + win.windowId, 'csWindow']);

            //$(this).SO1132A1('canDelete', $.extend({ wipType: 2 }, options.loginInfo, data), function (r) {
            //    if (!r[0]) {
            //        messageBox(r[1], messageType.critical);
            //        deleteJSONObject(data);
            //        changeMode(div);
            //        return;
            //    } else {
                  
            //    }
            //})
            
            

        }
        catch (err) {
            errorHandle(formName, 'showDelChargeData', err);
        }
    };
    function showSO111XDData(div, em, action) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var width = options.container.width();;
            var height = $(div).height();
            var objectName = "SO111XD";
            var method;
            if (em == editMode.append) { method = "canAppend"; }
            else { method = "canEdit"; }
            var x = ($(options.container).width() - width) / 2;
            var y = 26;
            var data = {};
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                hasClosing: false,
                theme: options.theme
            };
            var options = $.data(div, formName).options;
            var autoAddMatain = false;
            var autoFaciSeqno = '';
            if (options.parameters[options.contactName] != undefined) {
                if (options.parameters[options.contactName].rows.length > 0) {
                    if (options.parameters[options.contactName].rows[0].SERVICETYPE != '' && options.parameters[options.contactName].rows[0].SERVICETYPE != 'C') {
                        autoFaciSeqno = options.parameters[options.contactName].rows[0].FACISEQNO
                        if (autoFaciSeqno != null && autoFaciSeqno != '') { autoAddMatain = true };
                    };

                };
            };
            function getWipRefNo() {
                if ($('#' + $(div).prop('id') + 'gilServiceCode').csList('codeNo') == '') {
                    return null;
                } else {
                    if ($('#' + $(div).prop('id') + 'gilServiceCode').csList('selectedItem').REFNO == null) {
                        return null;
                    } else {
                        return $('#' + $(div).prop('id') + 'gilServiceCode').csList('selectedItem').REFNO
                    };
                };
            };
            function getServiceType() {
                if ($('#' + $(div).prop('id') + 'gilServiceCode').csList('codeNo') == '') {
                    autoAddMatain = false;
                    autoFaciSeqno = '';
                    return 'X';
                };
                if ($('#' + $(div).prop('id') + 'gilServiceType').csList('codeNo') == '') {
                    return 'X'
                } else {
                    return $('#' + $(div).prop('id') + 'gilServiceType').csList('codeNo')
                };

            };
            var win = createcsWindow(options.container, options.language.liSO111XD + " [SO111XD]", winOptions);
            autoAddMatain = false;
            autoFaciSeqno = '';
            $('#' + win.windowId).one('close', function () {
                var r = $.extend(true, {}, $.data($('#' + win.contentId)[0], objectName).options);
                deleteJSONObject(data);
                $('#' + win.contentId)[objectName]('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.childForm.length = 0;
                action({ isSaved: r.isSaved, wipDataCopy: r.wipDataCopy });
                delete r;
                r = null;
            });
            var isCanDo = getUsePriv(options.initData.Priv.rows, 'SO11128');
            var isCanCancel = getUsePriv(options.initData.Priv.rows, 'SO11128');
            if ($('#' + $(div).prop('id') + 'dtFinTime').csDateTime('getText') != null) {
                if (isCanDo) {
                    isCanDo = getUsePriv(options.initData.Priv.rows, 'SO111281');
                };
                if (isCanCancel) {
                    isCanCancel = getUsePriv(options.initData.Priv.rows, 'SO111282');
                };
            };

            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: this,
                isWip: true,
                wipData: cloneJSON(options.initData),
                wipType: 2,
                autoFaciSeqNo: autoFaciSeqno,
                isAutoAddMatain: autoAddMatain,
                wipRefNo: getWipRefNo(),
                serviceType: getServiceType(),
                custId: Number($('#' + $(div).prop('id') + 'txtCustId').jqxInput('val')),
                sno: $('#' + $(div).prop('id') + 'txtSNo').jqxInput('val'),
                canDo: isCanDo,
                canCancel: isCanCancel,
                editMode: options.editMode,                
                localization: options.localization
            });
            options.childForm.length = 0;
            options.childForm.push(['#' + win.contentId, objectName]);
            options.childForm.push(['#' + win.windowId, 'csWindow']);
            if (options.SO111XDFirstTime) {
                options.SO111XDFirstTime = false;
                $('#' + win.windowId).csWindow('hide');

            }


        }
        catch (err) {
            errorHandle(formName, 'showSO111XDData', err);
        }
    }
    function showChargeData(div, em, rowIndex, action) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var width = options.container.width();;
            var height = $(div).height();
            var objectName = "SO1132A";
            var method;            
            if (em == editMode.append) { method = "canAppend"; }
            else { method = "canEdit"; }
            var x = ($(options.container).width() - width) / 2;
            var y = 26;
            var data = {};
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                hasClosing: false,
                theme: options.theme
            };
            if (em == editMode.append) {
                data = {                 
                    Simple: {
                        columns: cloneJSON(options.initData[chargeTableName].columns), rows: [{
                            CUSTID: options.CUSTID,
                            SERVICETYPE: options.serviceType,
                            BILLNO: options.SNO,
                            ITEM: getMaxItem(div) + 1
                        }]
                    }
                };
            }
            else {
                data = cloneDataTable(options.initData, chargeTableName, rowIndex, null, "Simple");
            };
            data[chooseFaciTableName] = cloneJSON(options.initData[facilityTableName]);
            
            $.fn[objectName](method, $.extend({ wipType: 2 }, options.loginInfo, data), function (r) {
                if (r[0] != true) {
                    if (r[1] != null) {
                        messageBox(r[1]);
                    };
                    action({ isSaved: false, wipData: r.wipData });
                    delete r;
                    r = null;
                    deleteJSONObject(data);
                    return;
                };
                var win = createcsWindow(options.container, options.language.ShowForm5 + " [SO1132A]", winOptions);

                $('#' + win.windowId).one('close', function () {
                    var r = $.extend(true, {}, $.data($('#' + win.contentId)[0], objectName).options);
                    deleteJSONObject(data);
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.childForm.length = 0;
                    action({ isSaved: r.isSaved, wipData: r.wipData });
                    delete r;
                    r = null;
                });


                var resvTime = null;
                var clctEn = null;
                var clctName = null;
                var autoFaciSeqno = null;
                if (options.contactName != undefined) {
                    autoFaciSeqno = options.parameters[options.contactName].rows[0].FACISEQNO;
                };
                if ($(headerId + 'edtResvTime').csDateTime('getText') != null) {
                    resvTime = $(headerId + 'edtResvTime').csDateTime('getText');
                };
                if ($(headerId + 'gilWorkerEn1').csList('codeNo') != '') {
                    clctEn = $(headerId + 'gilWorkerEn1').csList('codeNo');
                    clctName = $(headerId + 'gilWorkerEn1').csList('description');
                };

                $('#' + win.contentId)[objectName]({
                    loginInfo: cloneJSON(options.loginInfo),
                    container: $('#' + win.windowId),
                    parameters: cloneJSON(options.parameters),
                    wipData: data,
                    wipType: 2,
                    editMode: em,
                    wipResvTime: resvTime,
                    wipClctEn: clctEn,
                    wipClctName: clctName,
                    faciSeqNo: autoFaciSeqno,
                    theme: options.theme,
                    localization: options.localization
                });
                options.childForm.length = 0;
                options.childForm.push(['#' + win.contentId, objectName]);
                options.childForm.push(['#' + win.windowId, 'csWindow']);
            });

           

        }
        catch (err) {
            errorHandle(formName, 'showChargeData', err);
        }
    };
    function getMaxItem(div) {
        try {
            var options = $.data(div, formName).options;
            var item = 0;
            
            if (options.initData[chargeTableName].rows.length > 0) {
                var rows = sortObject(options.initData[chargeTableName].rows, "ITEM desc");
                item = rows[0]["ITEM"];
            }
            return item;
        }
        catch (err) {
            errorHandle(formName, 'getMaxItem', err);
        }
    };
    function adjustImgPosition(div) {
        var headerId = '#' + $(div).prop('id');
        try {
            $(headerId + 'btnSubAdd1 > img').css('left', '15px');
            $(headerId + 'btnSubAdd1 > img').css('top', '2px');
            $(headerId + 'btnSubAdd2 > img').css('left', '15px');
            $(headerId + 'btnSubAdd2 > img').css('top', '2px');
            $(headerId + 'btnSubEdit1 > img').css('left', '15px');
            $(headerId + 'btnSubEdit1 > img').css('top', '2px');
            $(headerId + 'btnSubEdit2 > img').css('left', '15px');
            $(headerId + 'btnSubEdit2 > img').css('top', '2px');
            $(headerId + 'btnSubDelete1 > img').css('left', '15px');
            $(headerId + 'btnSubDelete1 > img').css('top', '2px');
            $(headerId + 'btnSubDelete2 > img').css('left', '15px');
            $(headerId + 'btnSubDelete2 > img').css('top', '2px');
            
        } catch (err) {

        };
    };
    function ShowSO111XD(div,e,action) {
        var options = $.data(div, formName).options;
        /*
        var autoAddMatain = false;
        var autoFaciSeqno = '';
        if (options.parameters[options.contactName] != undefined) {
            if (options.parameters[options.contactName].rows.length > 0) {
                if (options.parameters[options.contactName].rows[0].SERVICETYPE != '' && options.parameters[options.contactName].rows[0].SERVICETYPE != 'C') {
                    autoFaciSeqno = options.parameters[options.contactName].rows[0].FACISEQNO
                    if (autoFaciSeqno != null && autoFaciSeqno != '') { autoAddMatain = true };
                };
                
            };
        }; */
        refreshGrid(div);
        changeMode(div, e);
        AddHandler(div);
        action();                
        return;
        $('#' + $(div).prop('id') + 'SO111XD').load('SO1000\\' + 'SO111XD' + '.html', function (response, status, xhr) {
            try {
                if (status == 'error') {
                    messageBox(options.language.LoadSO111XDErr, null, null, function () { return false });
                    return;
                };
                function getWipRefNo() {
                    if ($('#' + $(div).prop('id') + 'gilServiceCode').csList('codeNo') == '') {
                        return null;
                    } else {
                        if ($('#' + $(div).prop('id') + 'gilServiceCode').csList('selectedItem').REFNO == null) {
                            return null;
                        } else {
                            return $('#' + $(div).prop('id') + 'gilServiceCode').csList('selectedItem').REFNO
                        };
                    };
                };
                function getServiceType() {
                    if ($('#' + $(div).prop('id') + 'gilServiceCode').csList('codeNo') == '') {
                        autoAddMatain = false;
                        autoFaciSeqno = '';
                        return 'X';
                    };
                    if ($('#' + $(div).prop('id') + 'gilServiceType').csList('codeNo') == '') {
                        return 'X'
                    } else {
                        return $('#' + $(div).prop('id') + 'gilServiceType').csList('codeNo')
                    };
                   
                };
                
                $(this)['SO111XD']($.extend(true, {}, {
                    loginInfo:cloneJSON( options.loginInfo),
                    container: this,
                    isWip: true,
                    wipData:cloneJSON(options.initData),
                    wipType: 2,
                    autoFaciSeqNo: autoFaciSeqno,
                    isAutoAddMatain : autoAddMatain,
                    wipRefNo: getWipRefNo(),
                    serviceType: getServiceType(),
                    custId: Number($('#' + $(div).prop('id') + 'txtCustId').jqxInput('val')),
                    sno: $('#' + $(div).prop('id') + 'txtSNo').jqxInput('val'),
                    canDo: (getUsePriv(options.initData.Priv.rows, 'SO11128') && getUsePriv(options.initData.Priv.rows, 'SO111281')),
                    canCancel: (getUsePriv(options.initData.Priv.rows, 'SO11128') && getUsePriv(options.initData.Priv.rows, 'SO111282')),
                    editMode: options.editMode,
                    localization: options.localization
                }));
                $('#' + $(div).prop('id') + 'SO111XD').unbind('changed');
                $('#' + $(div).prop('id') + 'SO111XD').on('changed', function () {
                    //$('#' + $(div).prop('id') + 'SO111XD').unbind('changed');
                    var change = $('#' + $(div).prop('id') + 'SO111XD')['SO111XD']('options');
                    //OffHandler(div);
                    unBindHandler(div);
                    try {
                        disableAllcontrol(div);
                        $.each(options.initData, function (key, obj) {
                            $.each(change.wipDataCopy, function (key2, obj) {
                                if (key == key2) {
                                    $.extend(options.initData[key], change.wipDataCopy[key2]);
                                };
                            });
                        });
                        refreshGrid(div);
                    } catch (err) {
                        errorHandle(formName, 'SO111XD-changed', err);
                    } finally {
                        //OffHandler(div);
                        unBindHandler(div);
                        AddHandler(div);
                        changeMode(div, e);
                    };
                })

            } catch (err) {
                errorHandle(formName, 'LoadSO111XD', err);
            } finally {

                changeMode(div, e);
                //OffHandler(div);
                AddHandler(div);
                action();
            }


        });
    };
    function loadingData(div, e, action) {
        var options = $.data(div, formName).options;
        
        changeLanguage(div);
        renderControl(div);
        adjustImgPosition(div);
        disableAllcontrol(div);        
        

        if (e == editMode.append && ( options.serviceType == null || options.serviceType =='' || options.serviceType == 'X')) {
            GetNullServiceType(div, e, function () {
                refreshGrid(div);
                rcdToScr(div, e);
                ShowSO111XD(div, e, function () {
                    var chkData = $.extend(true,  options.loginInfo,options.parameters);
                    //chkData = $.extend(true, {}, options.parameters);
                    isFixingArea(chkData, function (r) {
                        if (!r[0]) {
                            messageBox(r[1], messageType.yesno, null,
                               function (r) {
                                   if (r == 'yes') {
                                       if ($.isFunction(action)) { action(); };
                                   } else {
                                       options.editMode = editMode.view;
                                       $(options.container).triggerHandler('winClosing');
                                   };
                               });
                            delete chkData;
                            chkData = null;
                        };
                    });
                    //if ($.isFunction(action)) { action(); };
                });
               
            
            });
        } else {
            GetServiceTypeChangeData(div, e, function () {
                refreshGrid(div);
                rcdToScr(div, e);
                ShowSO111XD(div,e,action);
                /*
                $('#' + $(div).prop('id') + 'SO111XD').load('SO1000\\' + 'SO111XD' + '.html', function (response, status, xhr) {
                    try {
                        if (status == 'error') {
                            messageBox(options.language.LoadSO111XDErr, null, null, function () { return false });
                            return;
                        };
                        function getWipRefNo() {
                            if ($('#' + $(div).prop('id') + 'gilServiceCode').csList('codeNo') == '') {
                                return 0;
                            } else {
                                if ($('#' + $(div).prop('id') + 'gilServiceCode').csList('selectedItem').REFNO == null) {
                                    return 0;
                                } else {
                                    return $('#' + $(div).prop('id') + 'gilServiceCode').csList('selectedItem').REFNO
                                };
                            };
                        };
                        function getServiceType() {
                           
                                if ($('#' + $(div).prop('id') + 'gilServiceType').csList('codeNo') == '') {
                                    return 'X'
                                } else {
                                    return $('#' + $(div).prop('id') + 'gilServiceType').csList('codeNo')
                                };
                            
                        };
                        $(this)['SO111XD']($.extend(true,{}, {
                            loginInfo: options.loginInfo,
                            container: this,
                            isWip: true,
                            wipData:  options.initData,
                            wipType: 2,
                            wipRefNo: getWipRefNo(),
                            serviceType: getServiceType(),
                            custId: Number( $('#' + $(div).prop('id') + 'txtCustId').jqxInput('val')),
                            sno: $('#' + $(div).prop('id') + 'txtSNo').jqxInput('val'),
                            canDo: (getUsePriv(options.initData.Priv.rows, 'SO11128') && getUsePriv(options.initData.Priv.rows, 'SO111281')),
                            canCancel: (getUsePriv(options.initData.Priv.rows, 'SO11128') && getUsePriv(options.initData.Priv.rows, 'SO111282')),
                            editMode: options.editMode,
                            localization : options.localization
                        }));
                        $('#' + $(div).prop('id') + 'SO111XD').unbind('changed');
                        $('#' + $(div).prop('id') + 'SO111XD').on('changed', function () {
                            //$('#' + $(div).prop('id') + 'SO111XD').unbind('changed');
                            var change = $('#' + $(div).prop('id') + 'SO111XD')['SO111XD']('options');
                            //OffHandler(div);
                            unBindHandler(div);
                            try {
                                disableAllcontrol(div);                                
                                $.each(options.initData, function (key, obj) {
                                    $.each(change.wipDataCopy, function (key2, obj) {
                                        if (key == key2) {
                                            $.extend( options.initData[key], change.wipDataCopy[key2]);
                                        };
                                    });
                                });
                                refreshGrid(div);
                            } catch (err) {
                                errorHandle(formName, 'SO111XD-changed', err);
                            } finally {
                                //OffHandler(div);
                                unBindHandler(div);
                                AddHandler(div);
                                changeMode(div, e);
                            };
                        })

                    } catch (err) {
                        errorHandle(formName, 'LoadSO111XD', err);
                    } finally {

                        changeMode(div, e);
                        //OffHandler(div);
                        AddHandler(div);
                        action();
                    }
                   
                    
                });            */
               
            })
         

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
            var loginInfo = $.extend(true,{}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend(true, {}, loginInfo);
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
        } finally {

        };
    };
    function isFixingArea(data, action) {
        var loginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
        var ContactName = ignoreCase(data, 'Contact', false);
        var Maintain = ignoreCase(data, 'Maintain', false);
        var ContactTable = {};
        if (data[ContactName] == undefined) {
            if ($.isFunction(action)) { action([true, null]) };
            return;
        };
        if (data[ContactName].rows.length == 0) {
            if ($.isFunction(action)) { action([true, null]) };
            return;
        };
        var parameters = $.extend(true, {}, loginInfo, {
            CustId: { type: 'integer', value: data[Maintain].rows[0]['CustId'.toUpperCase()] }           
        });
        var params = getParameters(riadllName,
               riaClassName,
               'IsFixingArea',
               JSON.stringify(parameters));
        getServerData(params, {
            success: function (d) {
                if (d.ResultBoolean) {
                    if ($.isFunction(action)) { action([true, null]) };
                } else {
                    if ($.isFunction(action)) {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    };
                };

            }
        });
    };
    function canAppend(data, action,opts) {
        try {
            
            var loginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var Maintain = ignoreCase(data, 'Maintain', false);
            var IsContact = false;
            /*
            var  ContactName = ignoreCase(data, 'Contact', false);
            if (data[ContactName] == undefined) {
                IsContact = false;
            } else {
                if (data[ContactName].rows.length == 0) {
                    IsContact = false;
                };
            }; */
            
            var parameters = $.extend(true, {}, loginInfo, {
                CustId: { type: 'integer', value: data[Maintain].rows[0]['CustId'.toUpperCase()] },
                serviceType: { type: 'string', value: data[Maintain].rows[0]['SERVICETYPE'.toUpperCase()] },
                IsContact:{type:'boolean',value:IsContact}
            });
            var params = getParameters(riadllName,
                riaClassName,
                'CanAppend',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if (d.ResultBoolean) {
                        if ($.isFunction(action)) {
                            action([d.ResultBoolean, d.ErrorMessage]);
                        };
                    } else {
                        if (d.ErrorCode == -99) {
                            messageBox(d.ErrorMessage, messageType.yesno, null,
                           function (r) {
                               if (r == 'yes') {
                                   if ($.isFunction(action)) { action([true]) };
                               } else {
                                   if ($.isFunction(action)) { action([false]) };
                               };
                           });
                        } else {
                            if ($.isFunction(action)) {
                                action([d.ResultBoolean, d.ErrorMessage]);
                            };
                        };
                        
                    };
                    
                }
            });
          
        }
        catch (err) {
            errorHandle(formName, 'canAppend', err);
        };

    };
    function canEdit(data, action,opts) {
        try {
            var loginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var Maintain = ignoreCase(data, 'Maintain', false);
            var lng = new SO1112A();
            if (Maintain == '' || Maintain == null) {

                if ($.isFunction(action)) {
                    action([false, lng.language.NoWipTable]);
                    return;
                };
            };
            if (data[Maintain].rows.length === 0) {
                if ($.isFunction(action)) {
                    action([false, lng.language.NoWipData]);
                    return;
                };
            };
            if (data[Maintain].rows[0].SNO != undefined) {
                if (data[Maintain].rows[0].SNO == null) {
                    if ($.isFunction(action)) {
                        action([false, lng.language.SNoErr]);
                        return;
                    };
                };
            } else {
                if ($.isFunction(action)) {
                    action([false, lng.language.SNoErr]);
                    return;
                };
            };


            var parameters = $.extend(true, {}, loginInfo, {
                SNO: { type: 'string', value: data[Maintain].rows[0]['SNO'.toUpperCase()] }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'CanEdit',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if (d.ResultBoolean && d.ErrorCode == 1) {
                        showCheckManagerPWD(opts, editMode.edit, function (r) {
                            action([r.isSaved, r.errorMessage]);
                        });
                    }
                    else {
                        //action([d.ResultBoolean, d.ErrorMessage]);
                        if ($.isFunction(action)) {
                            action([d.ResultBoolean, d.ErrorMessage]);
                        }
                    }


                   
                }
            });

        }
        catch (err) {
            errorHandle('SO1112A', 'canEdit', err)
        } finally {
            delete lng;
            lng = null;
        };
       
    }
    function canDelete(data, action, opts) {
        try {
            var loginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
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

            var parameters = $.extend(true, {}, loginInfo, {
                SNO: { type: 'string', value: data[Maintain].rows[0]['SNO'.toUpperCase()] }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'CanDelete',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if (d.ResultBoolean && d.ErrorCode == 1) {
                        showCheckManagerPWD(opts, editMode.delete, function (r) {
                            action([r.isSaved, r.errorMessage]);
                        });
                    }
                    else {
                        if ($.isFunction(action)) {
                            action([d.ResultBoolean, d.ErrorMessage]);
                        }
                    }


                    
                }
            });
        } catch (err) {
            errorHandle(formName, 'canDelete', err);
        };
    };
    function canPrint(data, action) {
        try {
            var loginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend(true, {}, loginInfo);
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
            setButtonStatus(div);
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
                            totalAmt +=parseInt( rows[i].SHOULDAMT);
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
            $('#' + $(div).prop('id') + 'btnSubAdd1').jqxButton({ disabled: true });
            $('#' + $(div).prop('id') + 'btnSubEdit1').jqxButton({ disabled: true });
            $('#' + $(div).prop('id') + 'btnSubDelete1').jqxButton({ disabled: true });
            $('#' + $(div).prop('id') + 'btnSubAdd2').jqxButton({ disabled: true });
            $('#' + $(div).prop('id') + 'btnSubEdit2').jqxButton({ disabled: true });
            $('#' + $(div).prop('id') + 'btnSubDelete2').jqxButton({ disabled: true });
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
    function changeMode(div, e,act) {
        try {
            var codeDiabled = true;
            var options = $.data(div, formName).options;

            var editStatus = '';
            var aCanUse = false;
            var editText = '';
            if (e == undefined) { e = options.editMode };
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
            };
            //$('#' + $(div).prop('id') + 'txtStatus').jqxInput('val', editText);
            $('#' + $(div).prop('id') + 'txtStatus').text(editText);
            $('#' + $(div).prop('id') + 'btnSave').jqxButton({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'btnResv').jqxButton({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'btnPrintBillFlag').jqxButton({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'btnReserve2').jqxButton({ disabled: false });
            $('#' + $(div).prop('id') + 'btnViewPR').jqxButton({ disabled: false });
            $('#' + $(div).prop('id') + 'btnCancel').jqxButton({ disabled: false });
            $('#' + $(div).prop('id') + 'gilServiceCode').csList('disabled', !aCanUse);
            //$('#' + $(div).prop('id') + 'edtResvTime').jqxDateTimeInput({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'edtResvTime').csDateTime({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'edtResvFlagTime').csDateTime({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'chkFlag').jqxCheckBox({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'gilGroupCode').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilWorkerEn1').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilWorkerEn2').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'txtMemo').jqxTextArea({ disabled: !aCanUse });
            //$('#' + $(div).prop('id') + 'dtFinTime').jqxDateTimeInput({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'dtFinTime').csDateTime({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'gilMFCode1').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilMFCode2').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilReturnCode').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilReturnDescCode').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilSatiCode').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'gilSignEn').csList('disabled', !aCanUse);
            $('#' + $(div).prop('id') + 'chkPrintBillFlag').jqxCheckBox({ disabled: !aCanUse });
            //$('#' + $(div).prop('id') + 'edtSignDate').jqxDateTimeInput({ disabled: !aCanUse });
            $('#' + $(div).prop('id') + 'edtSignDate').csDateTime({ disabled: !aCanUse });
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
                    //$('#' + $(div).prop('id') + 'chkPrintBillFlag').jqxCheckBox({ disabled: false });
                }
            };
            
                
            $('#' + $(div).prop('id') + 'dtFinTime').csDateTime({ disabled: true });
            $('#' + $(div).prop('id') + 'gilMFCode1').csList('disabled', true);
            $('#' + $(div).prop('id') + 'gilMFCode2').csList('disabled', true);
            $('#' + $(div).prop('id') + 'gilReturnCode').csList('disabled', true);
            $('#' + $(div).prop('id') + 'gilReturnDescCode').csList('disabled', true);
            $('#' + $(div).prop('id') + 'gilSatiCode').csList('disabled', true);
            $('#' + $(div).prop('id') + 'gilSignEn').csList('disabled', true);                
            $('#' + $(div).prop('id') + 'edtSignDate').csDateTime({ disabled: true });
            


            if (e == editMode.edit ) {
                GetClosePriv(div, options.initData.Priv.rows);
                if (e != editMode.append && options.finMode) {
                    if (getUsePriv(options.initData.Priv.rows, 'SO11126')) {
                        var cmFinTimeFlag = !(options.blnCMFinTimeFlag
                                        && $('#' + $(div).prop('id') + 'edtCallOkTime').csDateTime('getText') == null)

                        $('#' + $(div).prop('id') + 'dtFinTime').csDateTime({ disabled: !(options.blnFinishPriv && options.blnSTBFinTimeFlag && cmFinTimeFlag) });
                        $('#' + $(div).prop('id') + 'gilReturnCode').csList('disabled', !options.blnReturnPriv);

                        var FinTimeDisabled = $('#' + $(div).prop('id') + 'dtFinTime').csDateTime('disabled');
                        var ReturnCodeDisabled = $('#' + $(div).prop('id') + 'gilReturnCode').csList('disabled');

                        $('#' + $(div).prop('id') + 'edtSignDate').csDateTime(
                           { disabled: !((!FinTimeDisabled) || (!ReturnCodeDisabled)) });
                        if (!$('#' + $(div).prop('id') + 'dtFinTime').csDateTime('disabled') || !$('#' + $(div).prop('id') + 'gilReturnCode').csList('disabled')) {
                            if ($('#' + $(div).prop('id') + 'gilReturnCode').csList('codeNo') != '') {
                                $('#' + $(div).prop('id') + 'dtFinTime').csDateTime({ disabled: true });
                                //$('#' + $(div).prop('id') + 'gilReturnDescCode').csList('disabled', false);
                            };
                            if ($('#' + $(div).prop('id') + 'dtFinTime').csDateTime('getText') != null) {
                                $('#' + $(div).prop('id') + 'gilReturnCode').csList('disabled', true);
                                //$('#' + $(div).prop('id') + 'gilReturnDescCode').csList('disabled', true);
                            };

                            $('#' + $(div).prop('id') + 'gilSignEn').csList('disabled', false);
                            $('#' + $(div).prop('id') + 'gilSatiCode').csList('disabled', false);
                            $('#' + $(div).prop('id') + 'gilMFCode1').csList('disabled', false);
                            $('#' + $(div).prop('id') + 'gilMFCode2').csList('disabled', false);
                            if ($('#' + $(div).prop('id') + 'dtFinTime').csDateTime('getText') == null && $('#' + $(div).prop('id') + 'gilReturnCode').csList('codeNo') == '') {
                                $('#' + $(div).prop('id') + 'dtFinTime').csDateTime({ disabled: false });
                                $('#' + $(div).prop('id') + 'gilMFCode1').csList('disabled', false);
                                $('#' + $(div).prop('id') + 'gilMFCode2').csList('disabled', false);
                                $('#' + $(div).prop('id') + 'gilReturnCode').csList('disabled', false);
                                //$('#' + $(div).prop('id') + 'gilReturnDescCode').csList('disabled', false);
                                $('#' + $(div).prop('id') + 'gilSatiCode').csList('disabled', false);
                                $('#' + $(div).prop('id') + 'gilSignEn').csList('disabled', false);
                                $('#' + $(div).prop('id') + 'edtSignDate').csDateTime({ disabled: false });
                            };
                        };
                       
                    } else {
                        $('#' + $(div).prop('id') + 'dtFinTime').csDateTime({ disabled: true });
                        $('#' + $(div).prop('id') + 'gilMFCode1').csList('disabled', true);
                        $('#' + $(div).prop('id') + 'gilMFCode2').csList('disabled', true);
                        $('#' + $(div).prop('id') + 'gilReturnCode').csList('disabled', true);
                        $('#' + $(div).prop('id') + 'gilReturnDescCode').csList('disabled', true);
                        $('#' + $(div).prop('id') + 'gilSatiCode').csList('disabled', true);
                        $('#' + $(div).prop('id') + 'gilSignEn').csList('disabled', true);                        
                        $('#' + $(div).prop('id') + 'edtSignDate').csDateTime({ disabled: true });
                    };
                };

            };
            setButtonStatus(div, e);

        }
        catch (err) {
            errorHandle(formName, 'changeMode', err);
        } finally {
            if ($.isFunction(act)) { act(); };
        };
    };
    function getUsePriv(rows, mid) {
        try {            
            var result = false;
            $.each(rows, function (index) {
                if (rows[index].MID == mid) {
                    result = rows[index].GROUPX == 1;
                    if (result) { return false; };
                    //return result;
                    
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
    function checkChildPriv(div, em, type) {
        try {
            var options = $.data(div, formName).options;
            var ops = {
                editMode: em,
                wipType: 2,
                groupId: options.loginInfo.loginInfo.rows[0]["groupid"],
                isOrder: isEmpty(getControlObject(div, 'tOrderNo').text()) != true,
                privData: options.initData[userPrivTableName].rows
            }
            if (type == 0) {
                return $.fn.WipUtility("getFaciPriv", ops);
            }
            else {
                return $.fn.WipUtility("getChargePriv", ops);
            }
        }
        catch (err) {
            errorHandle(formName, 'checkChildPriv', err);
        }
    }
    function refreshSO111XD(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var servCodeRefNo = 0;
        try {
            if ($(headerId + 'txtSNo').jqxInput('val') == '') {
                if ($.isFunction(act)) { act(); return };
            };
            if ($(headerId + 'gilServiceType').csList('codeNo') == '') {
                //$(headerId + 'SO111XD')['SO111XD']('refreshData', 'clearGrid');
                if ($.isFunction(act)) { act(); return };
            };
            if ($(headerId + 'gilServiceCode').csList('codeNo') == '') {
                //$(headerId + 'SO111XD')['SO111XD']('refreshData', 'clearGrid');
                if ($.isFunction(act)) { act(); return };
            }; 
            if ($(headerId + 'txtSNo').jqxInput('val') == '') {
                if ($.isFunction(act)) { act(); return };
            };
            /*
            $(headerId + 'SO111XD').on('refreshCompleted', function () {
                $(headerId + 'SO111XD').unbind('refreshCompleted');
                if ($.isFunction(act)) { act(); };
            }); */
            if ($('#' + $(div).prop('id') + 'gilServiceCode').csList('codeNo') != '') {
                servCodeRefNo: $('#' + $(div).prop('id') + 'gilServiceCode').csList('selectedItem').REFNO;
            };
            //#7803 Auto add facility to the status of mataintain by kin 2018/06/05
            //-------------------------------------------------------------------------------------------------------
            var autoAddMatain = false;
            var autoFaciSeqno = '';
            if (options.parameters[options.contactName] != undefined) {
                if (options.parameters[options.contactName].rows.length > 0) {
                    //except ServiceType C By Kin  2018/06/06
                    if (options.parameters[options.contactName].rows[0].SERVICETYPE != '' && options.parameters[options.contactName].rows[0].SERVICETYPE != 'C') {
                        autoFaciSeqno = options.parameters[options.contactName].rows[0].FACISEQNO;
                        if (autoFaciSeqno != undefined) {
                            if (autoFaciSeqno != null && autoFaciSeqno != '') { autoAddMatain = true };
                            //options.parameters[options.contactName].rows[0].FACISEQNO = null;
                        };
                        
                    };
                };
            };
            //-------------------------------------------------------------------------------------------------------            
            if ($.isFunction(act)) { act(); return };
            
            $.fn['SO111XD']('refreshData', $.extend(true,{},options.initData,
                     {
                         serviceType: $(headerId + 'gilServiceType').csList('codeNo')
                     },
                     {
                         sno :$(headerId + 'txtSNo').jqxInput('val')
                     },
                     {
                         wipRefNo: servCodeRefNo
                     },
                     {
                         triggerChange: true
                     },
                     {
                         isAutoAddMatain: autoAddMatain
                     },
                     {
                         autoFaciSeqNo: autoFaciSeqno
                     }
                     
                     
                   )
               );
            
            /*
            $(headerId + 'SO111XD')['SO111XD']('refreshData', cloneJSON(options.initData),
                   {
                       serviceType: $(headerId + 'gilServiceType').csList('codeNo')
                   },
                   {
                       sno: $(headerId + 'txtSNo').jqxInput('val')
                   },
                   {
                       wipRefNo: servCodeRefNo
                   },
                   {
                       triggerChange: true
                   },
                   {
                       isAutoAddMatain: autoAddMatain
                   },
                   {
                       autoFaciSeqNo: autoFaciSeqno
                   }

             ); */
            
        } catch (err) {
            errorHandle(formName, 'refreshSO111XD', err);
        };
    }
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
            //OffHandler(event.data);
            unBindHandler(event.data);
            $.extend(true, chkData.loginInfo, options.loginInfo);
            $.extend(true, chkData, dsData);
            canAppend(chkData, function (result) {
                
                //$(headerId + 'edtResvTime').val(null);
                $(headerId + 'edtResvTime').csDateTime('clear');
                $(headerId + 'gilServiceCode').csList('clearDisplayValue');
                if (result[0] === true) {
                    GetServiceTypeChangeData(event.data, options.editMode, function () {
                        $(headerId + 'gilServiceType').csList('codeNo', serviceType);
                        options.serviceType = serviceType;
              
                        refreshSO111XD(event.data, function () {
                            changeMode(event.data, options.editMode);
                            //OffHandler(event.data);
                            unBindHandler(event.data);
                            AddHandler(event.data);
                            
                        });
                        return;
                        
                    })
                } else {
                    options.serviceType = '';
                    $(headerId + 'gilServiceType').csList('clearDisplayValue');
                    var source = $.extend(true, {}, options.initData.MaintainCode);
                    source.rows.length = 0;
                    source.rows = [];
                    $(headerId + 'gilServiceCode').csList('source', source);
                    //OffHandler(event.data);
                    unBindHandler(event.data);
                    AddHandler(event.data);
                    if (result[1] != undefined) {
                        messageBox(result[1], messageType.critical);
                    };                    
                    return;
                };
            });
        }
        catch (err) {
            //OffHandler(event.data);
            //AddHandler(event.data);
            errorHandle(formName, 'gilServiceTypeSelectedIndexChanged', err);
        } finally {
            chkData = null;
            delete chkData;
            dsData = null;
            delete dsData;            
        };

    };
    function GetGroupCode(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);
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
            /*
            var parameters = $.extend({}, options.loginInfo,                
                 { ServCode: { type: 'string', value: aServiceCode } }); */
            var parameters = $.extend({}, loginInfo,
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
                            changeMode(div, options.editMode,act );
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function GetMaintainChangeFaci(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);
        try {
            var options = $.data(div, formName).options;
            var contactName = ignoreCase(options.parameters, 'Contact', false);
            var headerId = '#' + $(div).prop('id');
            if (contactName == null) {
                GetGroupCode(div,act);
                return;
            }; 
            if (options.parameters[contactName].rows.length === 0) {
                GetGroupCode(div,act);
                return;
            };
            //var ResvTime = $(headerId + 'edtResvTime').jqxDateTimeInput('getText');
            var ResvTime = $(headerId + 'edtResvTime').csDateTime('getText');
            var WorkCodeValue = -1;
            if ($(headerId + 'gilServiceCode').csList('codeNo') != '' ) {
                WorkCodeValue = parseInt($(headerId + 'gilServiceCode').csList('codeNo'));
            };
            var dsContact = ''
            
            if (contactName != null && contactName != undefined) {
                var dtContact = cloneJSON(options.parameters[contactName]);
                dsContact = { "Contact": dtContact };
            }; 
            /*
            var parameters = $.extend({}, options.loginInfo,
                  { CustId: { type: 'integer', value: options.CUSTID } },
                  { ServiceType: { type: 'string', value: options.serviceType } },
                  { ResvTime: { type: 'date', value: ResvTime } },
                  { WorkCodeValue: { type: 'integer', value: WorkCodeValue } },
                  { dsContact: { type: 'string', value: '' } }); */
            
            GetGroupCode(div, act);
            return;
            var parameters = $.extend({}, loginInfo,
                  { CustId: { type: 'integer', value: options.CUSTID } },
                  { ServiceType: { type: 'string', value: options.serviceType } },
                  { ResvTime: { type: 'date', value: ResvTime } },
                  { WorkCodeValue: { type: 'integer', value: WorkCodeValue } },
                  { dsContact: { type: 'string', value: dsContact } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetMaintainChangeFaci',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ResultBoolean) {
                            var tmp = JSON.parse(data.ResultXML);
                            var rowLength = tmp.ChangeFacility.rows.length;
                            for (var i = 0; i < rowLength; i++) {
                                options.initData.ChangeFacility.rows.push(tmp.ChangeFacility.rows[i]);
                            };                            
                            
                            tmp = null;
                            delete tmp;
                            GetGroupCode(div,act);
                        
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };

    function GetNormalWip(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);
        try {
            var Contact = '';
            var options = $.data(div, formName).options;
            var contactName = ignoreCase(options.parameters, 'Contact', false);
            var headerId = '#' + $(div).prop('id');
            
            
            if (contactName != null) {                
                Contact = options.parameters[contactName];
                Contact = { "Contact": Contact };
            };
            var InstCode = parseInt($(headerId + 'gilServiceCode').csList('codeNo'));
            //var ResvTime = $(headerId + 'edtResvTime').jqxDateTimeInput('getText');
            var ResvTime = $(headerId + 'edtResvTime').csDateTime('getText');
            /*
            var parameters = $.extend({}, options.loginInfo,
                    {CustId:{type:'integer',value:options.CUSTID}},
                    { ServiceType: { type: 'string', value: options.serviceType } },
                    { ResvTime: { type: 'date', value: ResvTime } },
                    { InstCode: { type: 'integer', value: InstCode } },
                    { dsContact: { type: 'string', value: Contact } }); */
            var parameters = $.extend({}, loginInfo,
                    { CustId: { type: 'integer', value: options.CUSTID } },
                    { ServiceType: { type: 'string', value: options.serviceType } },
                    { ResvTime: { type: 'date', value: ResvTime } },
                    { InstCode: { type: 'integer', value: InstCode } },
                    { dsContact: { type: 'string', value: Contact } },
                    { dsOldWipData: {type:'sttring',value:options.initData}},
                    { isRefeshAll: { type: 'boolean', value: options.isRefeshAll }});

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetNormalWip',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            if (options.isRefeshAll) {
                                $.extend(options.initData.ChangeFacility, tmp.ChangeFacility);
                                $.extend(options.initData.Facility, tmp.Facility);
                            };
                            
                            $.extend(options.initData.Charge, tmp.Charge);
                            options.isRefeshAll = false;
                                  
                            
                            tmp = null;
                            delete tmp;                            
                            GetMaintainChangeFaci(div,act);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetNormalWip-Server', err);
                        changeMode(div, options.editMode);
                    } finally {
                        options.isRefeshAll = false;
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function GetDefaultResvTime(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);
        
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            /*
            if ($(headerId + 'edtResvTime').jqxDateTimeInput('getText') != '') {
                GetNormalWip(div,act);
                return;
            };*/
            if ($(headerId + 'edtResvTime').csDateTime('getText') != null) {
                GetNormalWip(div, act);
                return;
            };
            var serviceCode = -1;
            var serviceType = '';
            var AcceptTime = '';
            if ($(headerId + 'gilServiceCode').csList('codeNo') != '' ) {
                serviceCode = parseInt( $(headerId + 'gilServiceCode').csList('codeNo'));
            };            
            AcceptTime = $(headerId + 'lblAcceptTime').text();
            /*
            var parameters = $.extend({}, options.loginInfo,
                    { ServiceType: { type: 'string', value: options.serviceType } },
                    { MaintainCode: { type: 'integer', value: serviceCode } },
                    { AcceptTime: { type: 'string', value: AcceptTime } }); */
            var parameters = $.extend({}, loginInfo,
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
                            options.isRefeshAll = false;
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div, options.editMode);
                        } else {
                            if (data.ResultXML != '') {
                                var d = jsonDate(data.ResultXML);
                                //$(headerId + 'edtResvTime').jqxDateTimeInput('setDate', d);
                                $(headerId + 'edtResvTime').csDateTime('setDate', d);
                                GetNormalWip(div,act);
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    }

    function gilServiceCodeSelectedIndexChanged(event) {
        try {
            var options = $.data(event.data, formName).options;
            var headerId = '#' + $(event.data).prop('id');
            var WorkUnit = 0;
            
            if ($(this).csList('codeNo') == '' ) {
                return;
            };            
            //OffHandler(event.data);
            unBindHandler(event.data);
            disableAllcontrol(event.data);
            var rowLength = options.initData.MaintainCode.rows.length;
            for (var i = 0; i < rowLength; i++) {
                if (options.initData.MaintainCode.rows[i].CODENO == $(this).csList('codeNo')) {
                    //$(headerId + 'txtWorkUnit').val(options.initData.MaintainCode.rows[i].WORKUNIT);
                    $(headerId + 'txtWorkUnit').jqxNumberInput('val', options.initData.MaintainCode.rows[i].WORKUNIT);
                    //#7695 auto fill the field by kin 2018/02/27
                    if (options.initData.MaintainCode.rows[i].DEFGROUPCODE != undefined) {
                        if (options.initData.MaintainCode.rows[i].DEFGROUPCODE != null) {
                            if ($(headerId + 'gilGroupCode').csList('codeNo') == '') {
                                $(headerId + 'gilGroupCode').csList('setDisplayValue',
                                 {
                                     CODENO: options.initData.MaintainCode.rows[i].DEFGROUPCODE,
                                     DESCRIPTION: options.initData.MaintainCode.rows[i].DEFGROUPNAME
                                 });
                                //$(headerId + 'gilGroupCode').csList('codeNo', options.initData.MaintainCode.rows[i].DEFGROUPCODE);
                            };
                        };
                    };

                     
                    break;
                };
            };
            AutoAddMatain(event.data, '', function () {
                options.isRefeshAll = true;
                var autoFaciSeqNo = null;
                if (options.isFromCall) {
                    if (options.parameters[options.contactName].rows[0].FACISEQNO != undefined) {
                        if (options.parameters[options.contactName].rows[0].FACISEQNO != null) {
                            autoFaciSeqNo = options.parameters[options.contactName].rows[0].FACISEQNO;
                        };
                    };                    
                };                
                if ((options.isFromCall) && (autoFaciSeqNo != null)) { options.isRefeshAll = false };
                //#8484 reserve all data except that 'C' By Kin 2019/08/22  
                if ($(headerId + 'gilServiceType').csList('codeNo') != 'C') { options.isRefeshAll = false };
                if ($(headerId + 'gilServiceType').csList('codeNo') == null) { options.isRefeshAll = true; };
                //if (options.editMode == editMode.edit) { options.isRefeshAll = false; };
                //options.isRefeshAll = false;
                GetDefaultResvTime(event.data, function () {
                    options.isFromCall = false;
                    refreshSO111XD(event.data, function () { AddHandler(event.data) });
                });
            })
            
            
            
        }
        catch (err) {
            errorHandle(formName, 'gilServiceCodeSelectedIndexChanged', err);
        };
    };
    function auotSetFacility(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        options.firstAutoSetFaci = false;
        if (!options.firstAutoSetFaci) {
            options.firstAutoSetFaci = false;
            if ($.isFunction(act)) { act(); };
        } else {
            //-------------------------------------------------------------------------------------------------------
            var autoAddMatain = false;
            var autoFaciSeqno = '';
            if (options.parameters[options.contactName] != undefined) {
                if (options.parameters[options.contactName].rows.length > 0) {
                    //except ServiceType C By Kin  2018/06/06
                    if (options.parameters[options.contactName].rows[0].SERVICETYPE != '' && options.parameters[options.contactName].rows[0].SERVICETYPE != 'C') {
                        autoFaciSeqno = options.parameters[options.contactName].rows[0].FACISEQNO;
                        if (autoFaciSeqno != undefined) {
                            if (autoFaciSeqno != null && autoFaciSeqno != '') { autoAddMatain = true };
                            //options.parameters[options.contactName].rows[0].FACISEQNO = null;
                        };

                    };
                };
            };
            //-------------------------------------------------------------------------------------------------------
            if (autoAddMatain) {


            } else {
                if ($.isFunction(act)) { act(); };
            }
        };
        

    }
    function ChkCanResv(div,act) {
        var loginInfo = getParaLoginInfo(div, formName);
        try {

            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var ServCode = -1;
            var AcceptTime = formatStringDate(new Date, 'yyyyMMddHHmm', false);
            var contactName = ignoreCase(options.parameters, 'Contact', false);
            var Resvdatebefore = 0;
            var MCode = '-1';
            var WipCode = -1;
            var WorkUnit = 0;
            if (options.serviceType == 'X') { changeMode(div, options.editMode); return; };
            /*
            if ($(headerId + 'edtResvTime').jqxDateTimeInput('getText') === '') {
                messageBox(options.language.MustResvTime, messageType.critical);
                changeMode(div, options.editMode);
                return;
            } */
            if ($(headerId + 'edtResvTime').csDateTime('getText') ==null) {
                messageBox(options.language.MustResvTime, messageType.critical);
                changeMode(div, options.editMode);
                return;
            }
            if ($(headerId + 'gilServiceCode').csList('codeNo') == '') {
                messageBox(options.language.MustServiceContext, messageType.critical);
                changeMode(div, options.editMode);
                return;
            }
            //if (options.initData.SO001.rows.length > 0) {
            //    ServCode = options.initData.SO001.rows[0].SERVCODE;
            //};
            if (options.workServcode !=null) {
                ServCode = options.workServcode;
            };
            if ($(headerId + 'lblAcceptTime').text() != '') {
                AcceptTime = new Date($(headerId + 'lblAcceptTime').text());
            };
            var MaintainLength = options.initData.MaintainCode.rows.length;
            for (i = 0; i < MaintainLength; i++) {
                if (options.initData.MaintainCode.rows[i].CODENO == $(headerId + 'gilServiceCode').csList('codeNo')) {
                    Resvdatebefore = options.initData.MaintainCode.rows[i]['Resvdatebefore'.toUpperCase()];
                    MCode =Number( options.initData.MaintainCode.rows[i].GROUPNO + '');
                    WorkUnit = parseFloat(options.initData.MaintainCode.rows[i].WORKUNIT);
                    WipCode = options.initData.MaintainCode.rows[i].CODENO;                    
                    break;
                }
            };
            if (options.oldWorkServCode == null) {
                options.oldWorkServCode = options.workServcode;
            }
            var parameters = $.extend({}, loginInfo,
                   { ServCode: { type: 'string', value: ServCode } },
                  { WipCode: { type: 'integer', value: WipCode } },
                  { MCode: { type: 'string', value: MCode } },
                  { ServiceType: { type: 'string', value: options.serviceType } },
                  //{ ResvTime: { type: 'date', value: $(headerId + 'edtResvTime').jqxDateTimeInput('getDate') } },
                   { ResvTime: { type: 'date', value: $(headerId + 'edtResvTime').csDateTime('getDate') } },
                  { AcceptTime: { type: 'date', value: AcceptTime } },
                  { OldResvTime: { type: 'date', value: new Date(options.oldResvTime) } },
                  { Resvdatebefore: { type: 'integer', value: Resvdatebefore } },
                  { WorkUnit: { type: 'decimal', value: WorkUnit } },
                  { IsBooking: { type: 'boolean', value: true } },
                  { oldServCode: {type:'string',value:options.oldWorkServCode}});
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
                            if ($.isFunction(act)) { act(); };
                        } else {
                            if (contactName != null) {
                                if (options.parameters[contactName] != null) {
                                    if (ignoreCase(options.parameters[contactName].rows[0], 'FaciSeqNo', true) != null) {
                                        //options.initData.ChangeFacility.rows = [];
                                    }
                                };
                                changeMode(div, options.editMode);
                                if ($.isFunction(act)) { act(); };
                                return;
                            } else {
                                changeMode(div, options.editMode);
                                if ($.isFunction(act)) { act(); };
                                return;
                            }
                        };
                    } catch (err) {
                        changeMode(div, option.editMode);
                        errorHandle(formName, 'ChkCanResv-Server', err);
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
        } finally {
            loginInfo = null;
            delete loginInfo;
            options.oldWorkServCode = options.workServcode
        }
    };
    function edtResvTimeChange(event) {
        try {            
            var options = $.data(event.data, formName).options;
            
            disableAllcontrol(event.data);
            ChkCanResv(event.data, function () {
                
                GetNormalWip(event.data, function () {
                    refreshSO111XD(event.data, function () {
                        
                        AddHandler(event.data)
                    })
                });
            });            
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
        var loginInfo = getParaLoginInfo(event.data, formName);
        disableAllcontrol(event.data);
        try {
            var options = $.data(event.data, formName).options;
            var headerId = '#' + $(event.data).prop('id');
            var MFCode = -1;
            if ($(this).csList('codeNo') != '') {
                MFCode = parseInt($(this).csList('codeNo'));
            };
            /*
            var parameters = $.extend({}, options.loginInfo,
                    { MFCode: { type: 'integer', value: MFCode } },
                    { ServiceType: { type: 'string', value: options.serviceType } }); */
            var parameters = $.extend({}, loginInfo,
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function showFacilityData(div, em, rowIndex, action) {
        try {
            var options = $.data(div, formName).options;
            var width = options.container.width();;
            var height = $(div).height();;
            var objectName = "SO1120A";
            var method;                        
            var x = ($(options.container).width() - width) / 2;
            var y = 26;
            var data = {};
            if (em == editMode.append) { method = "canAppend"; }
            else { method = "canEdit"; };
            if (em == editMode.append) {
                data = {
                    Facility: {
                        columns: [
                            { name: "CUSTID", type: "integer" },
                            { name: "SERVICETYPE", type: "string" },
                            { name: "SEQNO", type: "string" }
                        ], rows: [{
                            CUSTID: options.CUSTID,
                            SERVICETYPE: options.serviceType
                        }]
                    }
                };
            }
            else {
                //data = cloneDataTable(options.initData, facilityTableName, rowIndex);
                data = { Facility: cloneJSON(options.initData[facilityTableName]) }
            }
            data[chooseFaciTableName] = cloneJSON(options.initData[facilityTableName]);
            $.fn[objectName](method, $.extend({ wipType: 2 }, options.loginInfo, data), function (r) {
                if (r[0] != true) {
                    if (r[1] != null) {
                        messageBox(r[1]);
                    }
                    deleteJSONObject(data);
                    action({ isSaved: false });
                    return;
                };
                var winOptions = {
                    width: width,
                    height: height,
                    maxWidth: $(options.container).width(),
                    maxHeight: $(options.container).height(),
                    position: { x: x, y: y },
                    closeButtonAction: 'close',
                    resizable: true,
                    hasClosing: false,
                    theme:cloneJSON( options.theme)
                };
                var win = createcsWindow(options.container, options.language.ShowForm4 + " [SO1120A]", winOptions);

                $('#' + win.windowId).one('close', function () {

                    var r = $.extend(true, {}, $.data($('#' + win.contentId)[0], objectName).options);
                    //insSmartCardNo(div, $('#' + $(div).prop('id') + 'grdData1').jqxGrid('getcellvalue', 0, "SEQNO"))
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.childForm.length = 0;
                    deleteJSONObject(data);
                    action({ isSaved: r.isSaved, wipData: r.wipData });
                    delete r;
                    r = null;                    
                });

                $('#' + win.contentId)[objectName]({
                    loginInfo: cloneJSON(options.loginInfo),
                    container: $('#' + win.windowId),
                    parameters: cloneJSON(options.parameters),
                    selectedRowindex: rowIndex,
                    wipData: data,
                    wipType: 2,
                    editMode: em,
                    theme: options.theme,
                    localization:cloneJSON( options.localization)
                });
                options.childForm.length = 0;
                options.childForm.push(['#' + win.contentId, objectName]);
                options.childForm.push(['#' + win.windowId, 'csWindow']);
            });





           

        }
        catch (err) {
            errorHandle(formName, 'showFacilityData', err);
        }
    };
    function AutoByFin(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var loginInfo = getParaLoginInfo(event.data, formName);
        try {
            /*
            if ($(headerId + 'edtSignDate').jqxDateTimeInput('getText') === '') {
                $(headerId + 'edtSignDate').val(formatStringDate(new Date(), 'yyyyMMdd', false));
            }; */
            if ($(headerId + 'edtSignDate').csDateTime('getText') == null) {
                $(headerId + 'edtSignDate').val(formatStringDate(new Date(), 'yyyyMMdd', false));
            };
            
            if ($(headerId + 'gilSignEn').csList('codeNo') == '') {
                $(headerId + 'gilSignEn').csList('setDisplayValue',
                    {
                        /*
                        CODENO: options.loginInfo.loginInfo.value.rows[0].entryid,
                        DESCRIPTION: options.loginInfo.loginInfo.value.rows[0].entryname */
                        EMPNO: loginInfo.loginInfo.value.rows[0].entryid,
                        EMPNAME: loginInfo.loginInfo.value.rows[0].entryname
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
                    /*
                    if ($(headerId + 'dtFinTime').jqxDateTimeInput('getText') != '') {
                        $(headerId + 'edtSignDate').jqxDateTimeInput('setDate',
                            $(headerId + 'dtFinTime').jqxDateTimeInput('getDate')
                            );
                    }; */

                    if ($(headerId + 'dtFinTime').csDateTime('getText') != null) {
                        $(headerId + 'edtSignDate').csDateTime('setDate',
                            $(headerId + 'dtFinTime').csDateTime('getDate')
                            );
                        var d = $(headerId + 'edtSignDate').csDateTime('getDate');
                        var addDate = 0;
                        if (row.MoreDay2 != '' && row.MoreDay2 != null) {
                            addDate = parseInt(row.MoreDay2);
                        };
                        d.setDate(d.getDate() + addDate);
                        $(headerId + 'edtSignDate').csDateTime('setDate', d);
                    };
                };
                if ($(headerId + 'gilReturnCode').csList('codeNo') != '') {
                    /*
                    var d = $(headerId + 'edtSignDate').csDateTime('getDate');
                    var addDate = 0;
                    if (row.MoreDay2 != '' && row.MoreDay2 != null) {
                        addDate = parseInt(row.MoreDay2);
                    };
                    d.setDate(d.getDate() + addDate);
                    $(headerId + 'edtSignDate').csDateTime('setDate', d); */
                    $(headerId + 'edtSignDate').csDateTime('setDate', new Date());
                };
            } else {
                // $(headerId + 'edtSignDate').val(formatStringDate(new Date(), 'yyyyMMdd', false));;
                $(headerId + 'edtSignDate').csDateTime('setDate',new Date());
            };
            row = null;
            delete row;
        } catch (err) {
            errorHandle(formName, 'AutoByFin', err);
            changeMode(event.data, options.editMode);
        }
    };
    function showSO1114A(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
       
        try {            
            disableAllcontrol(div);
   
            var divName = 'div' + getUniqueId();
            var div2Name = 'div2' + getUniqueId();
            //$('<div id="' + divName + '"><div>' + options.language.ShowForm7 + '</div><div id="' + div2Name + '"></div></div>').appendTo('body');
            $('<div id="' + divName + '"><div>' + options.language.ShowForm7 + '</div><div id="' + div2Name + '"></div></div>').appendTo('body');
            var divSO1114A = $('#' + divName);
            var cswWidth = 800;
            var cswHeight = 600;
            if (options.containerIsWindow) {
                var csw = options.container;
                cswWidth = csw.width();
                cswHeight = csw.height();
            };
            //$('#' + divName).appendTo(div);
            cswWidth = 600
            cswHeight =500
            $(divSO1114A).csWindow($.extend({}, {
                width: cswWidth, height: cswHeight,
                maxWidth: 1028,
                maxHeight: 768,
                keyboardCloseKey: 'none',
                haveClosing: false,
                
            }));
            //$('#' + divName).appendTo($(options.container[0]));
            //$('#' + divName).appendTo($(div));

            var div2SO1114A = $('#' + div2Name);
            var serviceType = $(headerId + 'gilServiceType').csList('codeNo');
            var resvTime = $(headerId + 'edtResvTime').csDateTime('getDate');
            if (resvTime == null || resvTime == undefined) { resvTime = new Date() };
            resvTime = formatStringDate(resvTime, 'yyyyMMdd', false);
            var servCode = options.initData.SO001.rows[0].SERVCODE;
            if (servCode == null) { servCode = 0 };
            if (serviceType == '') { serviceType = 'X' };
            
            $(div2SO1114A).SO1114A($.extend({}, {                
                loginInfo : options.loginInfo,
                container: divSO1114A,
                refNo: 1,
                parameters: {},
                serviceType: serviceType,
                servCode: servCode,
                resvTime: resvTime,
                localization: options.localization
            }));

            $(divSO1114A).on('close', function (event) {
                try {
                 
                    $(div2SO1114A).SO1114A('destroy');
                    $(divSO1114A).csWindow('destroy');
                } catch (err) {
                    errorHandle(formName, 'showSO1114A_close', err);
                } finally {
                    changeMode(div, options.editMode);
                    
                }

            });  
        } catch (err) {
            errorHandle(formName, 'showSO1114A', err);
        } finally {
            //delete CPEMAC;
        };
    };
    function gilReturnCodeSelectItemChange(event) {
        disableAllcontrol(event.data);
      
        //$(headerId + 'dtFinTime').unbind('change');
      
       
        try {
            var options = $.data(event.data, formName).options;
            var headerId = '#' + $(event.data).prop('id');
            $(headerId + 'dtFinTime').unbind('dateChanged');
            if ($(this).csList('codeNo') != '') {
                AutoByFin(event);
                $(headerId + 'edtCallOkTime').csDateTime('setDate', Date.now());
            };  
            changeMode(event.data, options.editMode);
            if ($(this).csList('codeNo') != '') {
                $(headerId + 'gilReturnDescCode').csList('disabled', false);
            } else {
                $(headerId + 'gilReturnDescCode').csList('disabled', true);
            };
            if ($(this).csList('codeNo') != '') {
                $(headerId + 'dtFinTime').csDateTime({ disabled: true });
                $(headerId + 'dtFinTime').csDateTime('setText', null);
            } else {
                $(headerId + 'dtFinTime').csDateTime({ disabled: false });
                $(headerId + 'gilReturnDescCode').csList('codeNo', '');
                
            };
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
                $(options.container).triggerHandler('winClosing');
                return;                
            };
            if (options.editMode == editMode.view) {
                options.closingOK = true;
                if (options.containerIsWindow == true) {
                    $(options.container).csWindow('close');
                    return;
                }
            };
            options.editMode = editMode.view;
            GetMaintainData(event.data);
           
        } catch (err) {
            errorHandle(formName, 'btnCancelClick', err);
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
                        messageBox(options.language.MoveNewAdrAsk, messageType.yesno, null,
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
        var loginInfo = getParaLoginInfo(div, formName);
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
            /*
            var parameters = $.extend({}, options.loginInfo,
                    { CustId: { type: 'integer', value: options.CUSTID } },
                    { ServiceType: { type: 'string', value: options.serviceType } }); */
            var parameters = $.extend({}, loginInfo,
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function GetSO014(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var loginInfo = getParaLoginInfo(div, formName);
        try {
            var AddrNo = options.initData.SO001.rows[0].INSTADDRNO;
            if (options.editMode == editMode.edit ) {
                AddrNo = options.initData.Wip.rows[0].ADDRNO;
            }
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
            /*
            var parameters = $.extend({}, options.loginInfo,
                   { AddrNo: { type: 'integer', value: AddrNo } }); */
            var parameters = $.extend({}, loginInfo,
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function ScrToRcd(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var d = new Date;
        var SaveWip = $.extend(true, {}, options.initData.Wip);
        var OldWip = $.extend(true, {}, options.initData.Wip);
        var loginInfo = getParaLoginInfo(div, formName);
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
            $.extend(true, options.SaveMaintain[options.contactName], options.parameters[options.contactName]);
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
            //SaveWip.rows[0].UPDEN = options.loginInfo.loginInfo.value.rows[0].entryname;
            
            SaveWip.rows[0].UPDEN = loginInfo.loginInfo.value.rows[0].entryname;
            if (options.editMode == editMode.append) {
                /*
                SaveWip.rows[0].ACCEPTEN = options.loginInfo.loginInfo.value.rows[0].entryid;
                SaveWip.rows[0].ACCEPTNAME = options.loginInfo.loginInfo.value.rows[0].entryname; */
                SaveWip.rows[0].ACCEPTEN = loginInfo.loginInfo.value.rows[0].entryid;
                SaveWip.rows[0].ACCEPTNAME = loginInfo.loginInfo.value.rows[0].entryname;
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
            //SaveWip.rows[0].WORKSERVCODE = options.initData.SO001.rows[0].SERVCODE;
            SaveWip.rows[0].WORKSERVCODE = options.workServcode;
            //            SaveWip.rows[0].COMPCODE = options.loginInfo.loginInfo.value.rows[0].compcode;
            SaveWip.rows[0].COMPCODE = loginInfo.loginInfo.value.rows[0].compcode;
            if ( options.editMode == editMode.append ) {
                SaveWip.rows[0].SNO = $(headerId + 'txtSNo').jqxInput('value');
            };
            SaveWip.rows[0].CUSTID = $(headerId + 'txtCustId').jqxInput('value');
            SaveWip.rows[0].CUSTNAME = $(headerId + 'txtCustName').jqxInput('value');
            if (options.initData.SO001 != undefined) {
                if (options.initData.SO001.rows.length > 0) {
                    if (options.initData.SO001.rows[0].CUSTNAME != undefined) {
                        SaveWip.rows[0].CUSTNAME = options.initData.SO001.rows[0].CUSTNAME;
                    };
                };
            };
            
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
            /*
            if ( $(headerId + 'txtWorkUnit').jqxInput('value') != '' ) {
                SaveWip.rows[0].WORKUNIT = $(headerId + 'txtWorkUnit').jqxInput('value');
            }; */
            if ($(headerId + 'txtWorkUnit').jqxNumberInput('val') != '') {
                SaveWip.rows[0].WORKUNIT = $(headerId + 'txtWorkUnit').jqxNumberInput('val');
            };

            if ( $(headerId + 'gilReturnCode').csList('codeNo') != '' ) {
                if ( $(headerId + 'edtCallOkTime' ).csDateTime('getText') != null )  {
                    //SaveWip.rows[0].CALLOKTIME = jsonDate($(headerId + 'edtCallOkTime').jqxDateTimeInput('getText'));
                    SaveWip.rows[0].CALLOKTIME = DateToJson($(headerId + 'edtCallOkTime').csDateTime('getDate'));
                };
            };
            /*
            if (  $(headerId + 'dtFinTime' ).jqxDateTimeInput('getText') != '' ) {
                if ( $(headerId + 'edtCallOkTime' ).jqxDateTimeInput('getText') == '' )  {
                    SaveWip.rows[0].CALLOKTIME = DateToJson($(headerId + 'dtFinTime').jqxDateTimeInput('getDate'));
                };
            }; */
            
            if ($(headerId + 'dtFinTime').csDateTime('getText') != null) {
                if ($(headerId + 'edtCallOkTime').csDateTime('getText') != null) {
                    //SaveWip.rows[0].CALLOKTIME = DateToJson($(headerId + 'dtFinTime').jqxDateTimeInput('getDate'));
                    SaveWip.rows[0].CALLOKTIME = DateToJson($(headerId + 'dtFinTime').csDateTime('getDate'));
                };
            };
            SaveWip.rows[0].FINUNIT = 0;
            /*
            if ( $(headerId + 'txtFinUnit').jqxInput('value') != '' ) {
                SaveWip.rows[0].FINUNIT = $(headerId + 'txtFinUnit').jqxInput('value');
            }; */
            if ($(headerId + 'txtFinUnit').jqxNumberInput('val') != '') {
                SaveWip.rows[0].FINUNIT = $(headerId + 'txtFinUnit').jqxNumberInput('val');
            };
            SaveWip.rows[0].PRIORITY = 0;
            if ( $(headerId + 'chkFlag').jqxCheckBox('val') ) {
                SaveWip.rows[0].PRIORITY = 1;
            };
            SaveWip.rows[0].PRINTBILLFLAG = 0;
            if ($(headerId + 'chkPrintBillFlag').jqxCheckBox('val')) {
                SaveWip.rows[0].PRINTBILLFLAG = 1;
            };
            /*
            if ( $(headerId + 'dtFinTime' ).jqxDateTimeInput('getText') !='' ) {
                SaveWip.rows[0].FINTIME = DateToJson($(headerId + 'dtFinTime').jqxDateTimeInput('getDate'));
            }; */
            
            if ($(headerId + 'dtFinTime').csDateTime('getText') != null) {
                SaveWip.rows[0].FINTIME = DateToJson($(headerId + 'dtFinTime').csDateTime('getDate'));
            } else { SaveWip.rows[0].FINTIME = null;}
            /*
            if ( $(headerId + 'edtResvTime' ).jqxDateTimeInput('getText') !='' ) {                
                SaveWip.rows[0].RESVTIME = DateToJson($(headerId + 'edtResvTime').jqxDateTimeInput('getDate'));                
            }; */
            if ($(headerId + 'edtResvTime').csDateTime('getText') != null) {
                //SaveWip.rows[0].RESVTIME = DateToJson($(headerId + 'edtResvTime').jqxDateTimeInput('getDate'));
                SaveWip.rows[0].RESVTIME = DateToJson($(headerId + 'edtResvTime').csDateTime('getDate'));
            };
            if ($(headerId + 'edtSignDate').csDateTime('getText') != null) {
                var d = $(headerId + 'edtSignDate').csDateTime('getDate');
                d.setHours(0);
                d.setMinutes(0);
                d.setSeconds(0);
                d.setMilliseconds(0);
                SaveWip.rows[0].SIGNDATE = d;
            } else { SaveWip.rows[0].SIGNDATE = null; };
            if ($(headerId + 'edtResvFlagTime').csDateTime('getText') != null) {
                SaveWip.rows[0].RESVFLAGTIME = formatStringDate(
                        $(headerId + 'edtResvFlagTime').csDateTime('getDate'), 'HHmm', true);
            } else { SaveWip.rows[0].RESVFLAGTIME = null; };
            $.extend(options.SaveMaintain.Wip, SaveWip);
            if (options.SaveMaintain.OldWip.rows.length === 0) {
                $.extend(true, options.SaveMaintain.OldWip, SaveWip);
            };
            ChkChargeData(div);
           
        } catch (err) {
            errorHandle(formName, 'ScrToRcd', err);
            changeMode(div, options.editMode);
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function ChkChargeData(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        options.blnShouldReg = false;
        try {
            if (options.editMode == editMode.edit ) {
                if (options.initData.Wip.rows[0].SIGNDATE == null &&
                        $(headerId + 'edtSignDate').csDateTime('getText') != null &&
                       options.initData.Charge.rows.length > 0) {
                    if ($(headerId + 'dtFinTime').csDateTime('getText') != null && !options.BatchFin) {
                        if (getUsePriv(options.initData.Priv.rows, 'SO111261')) {
                            messageBox(options.language.ChangeBillData, messageType.yesno, null,
                                            function (r) {
                                                if (r == 'yes') { options.blnShouldReg = true; }
                                                ChkDataOk(div);
                                                return;
                                            });

                        } else {
                            ChkDataOk(div);
                        };
                        
                        return;
                    } else {
                        if ($(headerId + 'edtSignDate').csDateTime('getText') != null && !options.BatchFin ) {
                            if ($(headerId + 'gilReturnCode').csList('codeNo') != '' && 1 == 0) {
                                messageBox(options.language.UpdBillData, messageType.yesno, null,
                                       function (r) {
                                           if (r == 'yes') { options.blnShouldReg = true; }
                                           ChkDataOk(div);
                                           return;
                                       });
                            } else {
                                ChkDataOk(div);
                            }
                        } else {
                            ChkDataOk(div);
                        }
                        
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
        var loginInfo = getParaLoginInfo(div, formName);
        try {
            /*
            var parameters = $.extend({}, options.loginInfo,
                   { EditMode: { type: 'integer', value: options.editMode } },
                   { dsWipData: { type: 'string', value: options.SaveMaintain } },
                   { ShouldReg: { type: 'boolean', value: options.blnShouldReg } }); */
            var parameters = $.extend({}, loginInfo,
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function ChkCloseDate(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var loginInfo = getParaLoginInfo(div, formName);
        if (!options.blnShouldReg) {
            Save(div);
            return;
        };
        try {
            /*
            var parameters = $.extend({}, options.loginInfo,
                 { CloseDate: { type: 'integer', value: $(headerId + 'edtSignDate').jqxDateTimeInput('getText') } },
                 { SERVICETYPE: { type: 'string', value: options.serviceType } }); */
            var parameters = $.extend({}, loginInfo,
                 { CloseDate: { type: 'integer', value: $(headerId + 'edtSignDate').csDateTime('getText') } },
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        };
    };
    function Save(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var loginInfo = getParaLoginInfo(div, formName);
        try {
            /*
            var parameters = $.extend({}, options.loginInfo,
                  { EditMode: { type: 'integer', value: options.editMode } },
                   { ShouldReg: { type: 'boolean', value: options.blnShouldReg } },
                  { dsWipData: { type: 'string', value: options.SaveMaintain } },
                  { ReturnFlag: { type: 'boolean', value: false } }); */
            var parameters = $.extend({}, loginInfo,
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
                            options.IsAutoClosed = true;
                            if (options.IsAutoClosed && options.containerIsWindow) {
                                messageBox(options.language.SaveOK, messageType.information, null, function () {
                                    $(options.container).triggerHandler('winClosing');
                                    $(div).triggerHandler('close');
                                    
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    
    function GetMaintainData(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var loginInfo = getParaLoginInfo(div, formName);
        try {
            /*
            var parameters = $.extend({}, options.loginInfo,                 
                 { SNo: { type: 'string', value: options.SNO } });  */
            var parameters = $.extend({}, loginInfo,
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
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
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
    function btnResvClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) return;
        //disableAllcontrol(event.data);
        if ($(headerId + 'gilServiceCode').csList('codeNo') == '') {
            messageBox(options.language.MustServiceCode, messageType.information, null, function () {
                $(headerId + 'gilServiceCode').csList('focus');
                return false;
            });
            return false;
        } else {
            showReserve(event.data, function (r) {
                $(headerId + 'edtResvTime').unbind('dateChanged');
                if (r['isSaved'] == true) {
                    $(headerId + 'edtResvTime').csDateTime('setText', formatDateTime(new Date(r['resvTime']), 'datetime'));
                    options.workServcode = r.servCode;
                    $(headerId + 'edtResvTime').bind('dateChanged', event.data, edtResvTimeChange);
                    $(headerId + 'edtResvTime').trigger('dateChanged');
                } else {
                    $(headerId + 'edtResvTime').bind('dateChanged', event.data, edtResvTimeChange);
                };
                changeMode(event.data);
            });
        };

      
        return;
        
        try {
            //OffHandler(event.data);
            if ($(headerId + 'gilServiceType').csList('codeNo') == '') {
                messageBox(options.language.MustServiceType, null, null, function () { return false });            
                return;
            };
            if ($(headerId + 'gilServiceCode').csList('codeNo') == '') {
                messageBox(options.language.MustServiceCode, null, null, function () { return false });
                return;
            };
            disableAllcontrol(event.data);
            var dsData = {
                inparas: {
                    columns: [{ name: 'RESVTIME', type: 'date' },
                        { name: 'SERVICETYPE', type: 'string' },
                        { name: 'WORKERTYPE', type: 'string' },
                        { name: 'WORKCODE', type: 'integer' },
                        { name: 'SERVCODE', type: 'string' },
                    ],
                    rows: [{
                        //                        RESVTIME: $(headerId + 'edtResvTime').jqxDateTimeInput('getDate'),
                        RESVTIME: $(headerId + 'edtResvTime').csDateTime('getDate'),
                        SERVICETYPE: $(headerId + 'gilServiceType').csList('codeNo'),
                        WORKERTYPE: 'M',
                        WORKCODE: Number($(headerId + 'gilServiceCode').csList('codeNo')),
                        SERVCODE: options.initData.SO001.rows[0].SERVCODE
                    }]
                }
            };
            
            var divName = 'div' + getUniqueId();
            var div2Name = 'div2' + getUniqueId();
            $('<div id="' + divName + '"><div>' + options.language.LoadSO1115AName + '</div><div id="' + div2Name + '"></div></div>').appendTo('body');
            var div = $('#' + divName);
            var cswWidth = 800;
            var cswHeight = 600;
            if (options.containerIsWindow) {
                var csw = options.container;
                cswWidth = csw.width();
                cswHeight = csw.height();
            };
            
            $(div).csWindow($.extend({}, {
                width: cswWidth, height: cswHeight,
                maxWidth: 1028,
                maxHeight: 900,
                keyboardCloseKey: 'none',
                resizable: true,
                haveClosing: false,
                
            }));
            var div2 = $('#' + div2Name);

            $(div2)['SO1115A']($.extend({}, {
                //loginInfo: $.extend({}, { loginInfo:options.loginInfo.loginInfo.value} ),
                loginInfo: options.loginInfo,
                container: div,
                parameters: dsData,                
                editMode: options.editMode,
                localization: options.localization
            }));
            $(div).on('close', function (event) {
                $(div).unbind('close');
                //$(headerId + 'edtResvTime').jqxDateTimeInput('setDate', $(div2).SO1115A('options').returnResvtime);
                $(headerId + 'edtResvTime').csDateTime('setDate', $(div2).SO1115A('options').returnResvtime);
                $(div2).SO1115A('destroy');
                $(div).csWindow('destroy');
            });
            dsData = null;
            delete dsData;
        } catch (err) {
            errorHandle(formName, 'btnResvClick', err);
        } finally {
            changeMode(event.data, options.editMode);
            //AddHandler(event.data);
        };
    };
    function OffHandler(div) {
        try {
            var headerId = '#' + $(div).prop('id');            
            $(headerId + 'gilServiceCode').unbind('selectedIndexChanged');
            $(headerId + 'gilWorkerEn1').unbind('selectedIndexChanged');
            $(headerId + 'gilMFCode1').unbind('selectedIndexChanged');
            $(headerId + 'gilReturnCode').unbind('selectedIndexChanged');
            //$(headerId + 'edtResvTime').unbind('change');
            $(headerId + 'edtResvTime').unbind('dateChanged');
            $(headerId + 'btnSave').unbind('click');
            $(headerId + 'gilServiceType').unbind('selectedIndexChanged');
            $(headerId + 'dtFinTime').off('focusin');
            $(headerId + 'dtFinTime').unbind('dateChanged');
            $(headerId + 'btnResv').unbind('click');
            $(headerId + 'dtFinTime').off('focusout');
            $(headerId + 'btnReserve2').unbind('click');
            $(headerId + 'jqxTabsDetails').unbind('selected');
        } catch (err) {
            errorHandle(formName, 'OffHandler', err);
        };
    };
    function dtFinTimeFocus(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).csDateTime('disabled')) { return };
        if ($(this).csDateTime('getText') != null) { return; };
        unBindHandler(event.data);
        try {
            if ($(this).csDateTime('getText') == null) {
                $(this).csDateTime('setDate', Date.now());
            };
            if ($(headerId + 'edtCallOkTime').csDateTime('getText') == null) {
                $(headerId + 'edtCallOkTime').csDateTime('setDate', $(this).csDateTime('getDate'));
            };
            changeFinTime(event.data);
            AutoByFin(event);
        } catch (err) {
            errorHandle(formName, 'dtFinTimeFocus', err);
        } finally {
            AddHandler(event.data);
        }
    }
    function dtFinTimeChanged(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        //OffHandler(event.data)
        unBindHandler(event.data);
        try {
            changeFinTime(event.data);            
            if ($(this).csDateTime('getText') == null) { return; };
            if ($(headerId + 'edtCallOkTime').csDateTime('getText') == null) {
                $(headerId + 'edtCallOkTime').csDateTime('setDate', $(this).csDateTime('getDate'));
            };
            if ($(this).csDateTime('getDate') > Date.now()) {
                messageBox(options.language.FinTimeErr, messageType.critical);
                $(this).csDateTime('clear');
                $(this).csDateTime('setDate', Date.now());
                if ($(headerId + 'edtCallOkTime').csDateTime('getText') == null) {
                    $(headerId + 'edtCallOkTime').csDateTime('setDate',
                        $(this).csDateTime('getDate')
                        )
                };
                return;
            } else {
                AutoByFin(event);
            };
            
        } catch (err) {
            errorHandle(formName, 'dtFinTimeChanged', err);
        } finally {
            AddHandler(event.data);
        };

    }
    function changeFinTime(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        //OffHandler(event.data);
        unBindHandler(div);
        try {
            if ($(headerId + 'dtFinTime').csDateTime('disabled')) { return; };

            if ($(headerId + 'dtFinTime').csDateTime('getText') == null) {
                $(headerId + 'gilReturnCode').csList('disabled', false);
                $(headerId + 'gilReturnDescCode').csList('disabled', false);
                //$(headerId + 'txtFinUnit').jqxInput({ disabled: true });
                $(headerId + 'txtFinUnit').jqxNumberInput({ disabled: true });
            } else {
                $(headerId + 'gilReturnCode').csList('disabled', true);
                $(headerId + 'gilReturnDescCode').csList('disabled', true);
                //$(headerId + 'txtFinUnit').jqxInput({ disabled: false });
                $(headerId + 'txtFinUnit').jqxNumberInput({ disabled: false });
                if (Number($(headerId + 'txtFinUnit').jqxNumberInput('val') + '') == 0) {
                    //$(headerId + 'txtFinUnit').val = $(headerId + 'txtWorkUnit').jqxInput('val');
                    // $(headerId + 'txtFinUnit').jqxInput('val', $(headerId + 'txtWorkUnit').jqxInput('val'))
                    $(headerId + 'txtFinUnit').jqxNumberInput('val', $(headerId + 'txtWorkUnit').jqxNumberInput('val'))
                };
            };
            if (options.editMode == editMode.view) {
                //$(headerId + 'txtFinUnit').jqxInput({ disabled: true });
                $(headerId + 'txtFinUnit').jqxNumberInput({ disabled: true });
            };
        } catch (err) {
            errorHandle(formName, 'changeFinTime', err);
        } finally {
            AddHandler(div);
        };
    }
    function dtFinTimeLostFocus(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        //OffHandler(event.data);
        try {
            changeFinTime(event.data);
            /*
            if ($(this).csDateTime('disabled')) { return; };
            if ($(this).csDateTime('getText') == null) {
                $(headerId + 'gilReturnCode').csList('disabled', false);
                $(headerId + 'gilReturnDescCode').csList('disabled', false);
                $(headerId + 'txtFinUnit').jqxInput({ disabled: true });
            } else {
                $(headerId + 'gilReturnCode').csList('disabled', true);
                $(headerId + 'gilReturnDescCode').csList('disabled', true);
                $(headerId + 'txtFinUnit').jqxInput({ disabled: false });

            };
            if (options.editMode == editMode.view) {
                $(headerId + 'txtFinUnit').jqxInput({ disabled: true});
            }; */
        } catch (err) {
            errorHandle(formName, 'dtFinTimeLostFocus', err);
        } finally {
           // AddHandler(event.data);
        }

    }
    function unBindHandler(div) {
        var headerId = '#' + $(div).prop('id');
        var options = $.data(div, formName).options;
        $(headerId + 'gilServiceCode').unbind('selectedIndexChanged');
        $(headerId + 'gilWorkerEn1').unbind('selectedIndexChanged');
        $(headerId + 'gilMFCode1').unbind('selectedIndexChanged');
        $(headerId + 'gilReturnCode').unbind('selectedIndexChanged');
        //$(headerId + 'edtResvTime').unbind('change');
        $(headerId + 'edtResvTime').unbind('dateChanged');
        $(headerId + 'btnSave').unbind('click');
        $(headerId + 'gilServiceType').unbind('selectedIndexChanged');
        $(headerId + 'btnViewPR').unbind('click');
        $(headerId + 'btnViewPR').off();
        $(headerId + 'dtFinTime').off('focusin');
        $(headerId + 'dtFinTime').unbind('dateChanged');
        $(headerId + 'btnResv').unbind('click');
        $(headerId + 'dtFinTime').off('focusout');
        $(headerId + 'btnReserve2').unbind('click');
        $(headerId + 'gilServiceCode').unbind('selectedIndexChanged');
        $(headerId + 'gilWorkerEn1').unbind('selectedIndexChanged');
        $(headerId + 'gilMFCode1').unbind('selectedIndexChanged');
        $(headerId + 'gilReturnCode').unbind('selectedIndexChanged');
        //$(headerId + 'edtResvTime').unbind('change');
        $(headerId + 'edtResvTime').unbind('dateChanged');
        $(headerId + 'btnSave').unbind('click');
        $(headerId + 'jqxTabsDetails').unbind('selected');
        $(headerId + 'btnSubAdd2').unbind('click');
        $(headerId + 'btnSubEdit2').unbind('click');
        $(headerId + 'btnSubDelete2').unbind('click');
        $(headerId + 'btnSubDelete1').unbind('click');
        $(headerId + 'btnSubAdd1').unbind('click');
        $(headerId + 'btnSubEdit1').unbind('click');
        $(options.container).unbind('keydown');
        $(options.container).off('keydown');
    };
    function AddHandler(div) {
        try {
            var headerId = '#' + $(div).prop('id');
            var options = $.data(div, formName).options;
            $(headerId + 'gilServiceCode').unbind('selectedIndexChanged');
            $(headerId + 'gilWorkerEn1').unbind('selectedIndexChanged');
            $(headerId + 'gilMFCode1').unbind('selectedIndexChanged');
            $(headerId + 'gilReturnCode').unbind('selectedIndexChanged');
            $(headerId + 'btnViewPR').unbind('btnViewPRClick');
            $(headerId + 'btnViewPR').off();
            //$(headerId + 'edtResvTime').unbind('change');
            $(headerId + 'edtResvTime').unbind('dateChanged');
            $(headerId + 'btnSave').unbind('click');
            $(headerId + 'gilServiceType').unbind('selectedIndexChanged');
            $(headerId + 'dtFinTime').off('focusin');
            $(headerId + 'dtFinTime').unbind('dateChanged');
            $(headerId + 'btnResv').unbind('click');
            $(headerId + 'dtFinTime').off('focusout');
            $(headerId + 'btnReserve2').unbind('click');
            $(headerId + 'jqxTabsDetails').unbind('selected');
            $(headerId + 'btnSubAdd2').unbind('click');
            $(headerId + 'gilServiceCode').unbind('selectedIndexChanged');
            $(headerId + 'gilWorkerEn1').unbind('selectedIndexChanged');
            $(headerId + 'gilMFCode1').unbind('selectedIndexChanged');
            $(headerId + 'gilReturnCode').unbind('selectedIndexChanged');
            //$(headerId + 'edtResvTime').unbind('change');
            $(headerId + 'edtResvTime').unbind('dateChanged');
            $(headerId + 'btnSave').unbind('click');
            $(headerId + 'gilServiceType').unbind('selectedIndexChanged');
            $(headerId + 'btnResv').unbind('click');
            $(headerId + 'dtFinTime').off('focusin');
            $(headerId + 'dtFinTime').off('focusout');
            $(headerId + 'btnSubEdit2').unbind('click');
            $(headerId + 'btnSubDelete2').unbind('click');
            $(headerId + 'btnSubDelete1').unbind('click');
            $(headerId + 'btnSubAdd1').unbind('click');
            $(headerId + 'btnSubEdit1').unbind('click');
            $(options.container).unbind('keydown');
            $(options.container).off('keydown');

            $(options.container).bind('keydown', options, frmKeydown);
            $(headerId + 'dtFinTime').bind('dateChanged');
            $(headerId + 'gilServiceCode').bind('selectedIndexChanged', div, gilServiceCodeSelectedIndexChanged);
            $(headerId + 'gilWorkerEn1').bind('selectedIndexChanged', div, gilWorkerEn1SelectItemChange);
            $(headerId + 'gilMFCode1').bind('selectedIndexChanged', div, gilMFCode1SelectItemChange);
            $(headerId + 'gilReturnCode').bind('selectedIndexChanged', div, gilReturnCodeSelectItemChange);
            //$(headerId + 'edtResvTime').bind('change', div, edtResvTimeChange);
            $(headerId + 'edtResvTime').bind('dateChanged', div, edtResvTimeChange);
            $(headerId + 'btnSave').bind('click', div, btnSaveClick);
            $(headerId + 'gilServiceType').bind('selectedIndexChanged', div, gilServiceTypeSelectedIndexChanged);
            $(headerId + 'btnCancel').bind('click', div, btnCancelClick);
            $(headerId + 'btnResv').bind('click', div, btnResvClick);
            $(headerId + 'btnViewPR').bind('click', div, btnViewPRClick);
            //$(headerId + 'dtFinTime').bind('blur',div,dtFinTimeFocus);
            //$(headerId + 'dtFinTime').focusin(dtFinTimeFocus );
            $(headerId + 'dtFinTime').bind('focusin', div, dtFinTimeFocus);
            $(headerId + 'dtFinTime').bind('dateChanged', div, dtFinTimeChanged);
            $(headerId + 'dtFinTime').bind('focusout', div, dtFinTimeLostFocus);
            $(headerId + 'btnReserve2').bind('click', div, btnReserve2Click);
            
            $(headerId + 'jqxTabsDetails').on('tabclick', function (event) {
                var selectedTab = event.args.item;
               
                if (selectedTab == 1) {
                    //$( headerId + 'btnSubAdd1').jqxButton('destroy');
                    /*
                    $( headerId + 'btnSubAdd1').jqxButton($.extend({}, imagePosition, {
                        width: 50,
                        imgSrc: 'Images/Add1.png',
                        height: 22
                    })); 
                    $(headerId + 'btnSubAdd1').jqxButton({ imgSrc:  'Images/Add1.png' });
                    alert('The selected tab is ' + selectedTab); */
                };
                
            });
            $(headerId + 'btnSubAdd2').bind('click', div, btnSubAdd2Click);
            $(headerId + 'btnSubEdit2').bind('click', div, btnSubEdit2Click);
            $(headerId + 'btnSubDelete2').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; };
                var rowindex = $(headerId + 'grdData2').jqxGrid('getselectedrowindex');
                var rows = $(headerId + 'grdData2').jqxGrid('getrows');
                if (rows.length == 0) { return;}
                if ( checkChildPriv(div, options.editMode, 1) == false) {
                    return;
                }
                var billno = $(headerId + 'grdData2').jqxGrid('getcellvalue', rowindex, "BILLNO");
                var item = $(headerId + 'grdData2').jqxGrid('getcellvalue', rowindex, "ITEM");
                disableAllcontrol(div);
                if ($(headerId + 'grdData2').jqxGrid('getcellvalue', rowindex, "ROWID") == null) {
                    messageBox(options.language.DelBillAsk, messageType.yesno, null, function (flag) {
                        if (flag.toUpperCase() == 'YES') {
                            options.initData[chargeTableName].rows = $.grep(options.initData[chargeTableName].rows, function (rw, index) {
                                if (rw['BILLNO'] == billno && rw['ITEM'] == item) {
                                    return false;
                                } else {
                                    return true;
                                };
                            });
                            refreshGrid(div);
                            changeMode(div);
                        } else { changeMode(div); };
                    });
                    
                } else {
                    showDelChargeData(div, editMode.delete, rowindex,
                        function (r) {
                            if (r.isSaved) {
                                for (var key in r.wipData['Simple'].rows[0]) {
                                    options.initData[chargeTableName].rows[rowindex][key] =
                                            r.wipData['Simple'].rows[0][key];
                                };
                                refreshGrid(div);
                              
                            };
                            changeMode(div);
                        }
                    );
                };
                
            });
            $(headerId + 'btnSubAdd1').bind('click', div, btnSubAdd1Click);
            $(headerId + 'btnSubEdit1').bind('click', div, btnSubEdit1Click);
            $(headerId + 'btnSubDelete1').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; };
                var rowindex = $(headerId + 'grdData1').jqxGrid('getselectedrowindex');
                var data = cloneDataTable(options.initData, facilityTableName, rowindex, null, facilityTableName);
                var seqno = data[facilityTableName].rows[0].SEQNO;
                $.fn["SO1120A"]('canDelete', $.extend({ wipType: 2 }, options.loginInfo, data), function (r) {
                    if (r[0] != true) {
                        if (r[1] != null) {
                            messageBox(r[1]);
                        }
                        deleteJSONObject(data);
                        //refreshGrid(div);
                        changeMode(div);
                        //action({ isSaved: false });
                        return;
                    }
                    messageBox(options.language.sureDelete, messageType.yesno, null, function (flag) {
                        if (flag == 'yes') {
                            options.initData[facilityTableName].rows = $.grep(options.initData[facilityTableName].rows, function (rw, index) {
                                if (rw['SEQNO'] == seqno) {
                                    return false;
                                } else {
                                    return true;
                                };
                            });
                            refreshGrid(div);
                            changeMode(div);
                            /*
                            options.wipData[facilityTableName].rows = deleteRowByKeyValue(options.wipData[facilityTableName].rows, "SEQNO", row["SEQNO"]);
                            options.wipData[changeFaciTableName].rows = deleteRowByKeyValue(options.wipData[changeFaciTableName].rows, "SEQNO", row["SEQNO"]);
                            action({ isSaved: true }); */
                        }
                        else {
                            //action({ isSaved: false });
                        }
                    });
                });
            });
        }
        catch (err) {
            errorHandle(formName, 'AddHandler', err);
        };
    };
    //gilServiceCode
    function checkServiceCode(div) {
        try {
            var options = $.data(div, formName).options;
            if (isEmpty(getControlObject(div, 'gilServiceCode').csList('codeNo'))) {
                messageBox(options.language.MustServiceCode, null, null, function () {
                    getControlObject(div, 'gilServiceCode').csList('focus');
                });
                return false;
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'checkServiceCode', err);
        }
    };
    function checkServiceTypeCode(div) {
        try {
            var options = $.data(div, formName).options;
            if (isEmpty(getControlObject(div, 'gilServiceType').csList('codeNo'))) {
                messageBox(options.language.MustServiceType, null, null, function () {
                    getControlObject(div, 'gilServiceType').csList('focus');
                });
                return false;
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'checkServiceTypeCode', err);
        }
    };
    function btnViewPRClick(event) {
        var headerId = '#' + $(event.data).prop('id');
        var options = $.data(event.data, formName).options;
        if ($(this).jqxButton('disabled')) { return; };
        if (!checkServiceTypeCode(event.data)) { return; };
        if (!checkServiceCode(event.data)) { return; };
        disableAllcontrol(event.data);
        showSO111XDData(event.data, editMode.edit,  function (r) {
            if (r.isSaved) {
                
                
                unBindHandler(event.data);
                try {
                    disableAllcontrol(event.data);
                    $.each(options.initData, function (key, obj) {
                        $.each(r.wipDataCopy, function (key2, obj) {
                            if (key == key2) {
                                $.extend(options.initData[key], r.wipDataCopy[key2]);
                            };
                        });
                    });
                    refreshGrid(event.data);
                } catch (err) {
                    errorHandle(formName, 'SO111XD-changed', err);
                } finally {
                
                    unBindHandler(event.data);
                    AddHandler(event.data);
                    changeMode(event.data);
                };
                
            } else {
                changeMode(event.data);
            };

        });
    };
    function cloneEmptyRow(div, tableName) {
        var headerId = '#' + $(div).prop('id');
        var options = $.data(div, formName).options;
        var o = {}
        if (options.initData[tableName].rows.length > 0) {
            o = $.extend(true, {}, options.initData[tableName].rows[0]);
            for (var key in o) {
                o[key] = null;
            };
        } else {
            for (var i = 0; i < options.initData[tableName].columns.length-1; i++) {
                o[options.initData[tableName].columns[i].name] = null;
            };
        };
        return o;
    };
    function btnSubEdit1Click(event) {
        var headerId = '#' + $(event.data).prop('id');
        var options = $.data(event.data, formName).options;
        if ($(this).jqxButton('disabled')) { return; };
        if (!isSubEditOrAdd(event.data, editMode.edit, 'grdData1')) { return };
        var rowindex = $(headerId + 'grdData1').jqxGrid('getselectedrowindex');
        var seqno = $(headerId + 'grdData1').jqxGrid('getcellvalue', rowindex, "SEQNO");
        disableAllcontrol(event.data);
        showFacilityData(event.data, editMode.edit, rowindex, function (r) {                        
            if (r.isSaved) {
                /*
                for (var key in r.wipData[facilityTableName].rows[0]) {
                    options.initData[facilityTableName].rows[rowindex][key] =
                            r.wipData[facilityTableName].rows[0][key];
                }; */
                options.initData[facilityTableName] = cloneJSON(r.wipData[facilityTableName])
                insSmartCardNo(event.data,seqno, function () {
                    refreshGrid(event.data);
                    changeMode(event.data);
                });

            } else { changeMode(event.data); };
            
        });
    };
    function insSmartCardNo(div, seqno, act) {
        if ($.isFunction(act)) { act(); };
        return;
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var data = cloneDataTable(options.initData, facilityTableName, -1, true, facilityTableName);
       // var data = $.extend(true, {}, options.initData[facilityTableName]);
        try {
            var loginInfo = getParaLoginInfo(div, formName)
            //var parameters = $.extend(true, {}, options.loginInfo);
            var parameters = $.extend({}, loginInfo,
              { dsFacility: { type: 'string', value: data } },
              { SeqNo: { type: 'string', value: seqno } });
            var params = getParameters(riadllName,
                   riaClassName,
                   'InsSmartCardNo',
                   JSON.stringify(parameters));

            getServerData(params, {
                success: function (data) {
                    if (data.ResultBoolean == true) {
                        var d = JSON.parse(data.ResultXML);
                        options.initData[facilityTableName].rows.length = 0;
                        for (var i = 0 ; i<= d[facilityTableName].rows.length - 1; i++) {
                            var o = $.extend(true, {}, d[facilityTableName].rows[i]);
                            options.initData[facilityTableName].rows.push(o);
                        };
                        delete d;
                        d = null;
                    }
                    else {
                        messageBox(data.ErrorMessage, messageType.critical);
                    };
                    if ($.isFunction(act)) { act(); };
                }
            });
        } catch (err) {
            errorHandle(formName, 'insSmartCardNo', err);
        } finally {
            delete data;
            data = null;
        };
    };
    function ChargeDataCanEdit(div,rowindex) {
        var headerId = '#' + $(div).prop('id');
        var options = $.data(div, formName).options;
        try {
            if (options.initData[chargeTableName].rows[rowindex]['CancelFlag'.toUpperCase()] != undefined) {
                if (options.initData[chargeTableName].rows[rowindex]['CancelFlag'.toUpperCase()] == 1) {
                    messageBox(options.language.WasCancelNotEdit, messageType.critical);
                    return false;
                };
            };
            
            if (options.editMode != editMode.append) {
                if (options.initData.Wip.rows[0]['ClsTime'.toUpperCase()] != undefined) {
                    if (options.initData.Wip.rows[0]['ClsTime'.toUpperCase()] != null) {
                        messageBox(options.language.WasCloseNotEdit, messageType.critical);
                        return false;
                    };
                };
                
            };
            if (options.initData[chargeTableName].rows[rowindex]['RealDate'.toUpperCase()] != undefined) {
                if (options.initData[chargeTableName].rows[rowindex]['RealDate'.toUpperCase()] != null) {
                    if (!getUsePriv(options.initData.Priv.rows, 'SO11127')) {
                        messageBox(options.language.WasChargeNotEdit, messageType.critical);
                        return false;
                    };
                };
            };
            if (options.initData[chargeTableName].rows[rowindex]['Type'.toUpperCase()] == undefined) {
                messageBox(options.language.WasCloseNotEdit, messageType.critical);
                return false;
            };
            if (options.initData[chargeTableName].rows[rowindex]['Type'.toUpperCase()] != 0) {
                messageBox(options.language.WasCloseNotEdit, messageType.critical);
                return false;
            };
            if (options.initData[chargeTableName].rows[rowindex]['SBillNo'.toUpperCase()] != undefined) {
                if (options.initData[chargeTableName].rows[rowindex]['SBillNo'.toUpperCase()] != null) {
                    if (!getUsePriv(options.initData.Priv.rows, 'SO1132C')) {
                        messageBox(options.language.CloseDataNotEdit, messageType.critical);
                        return false;
                    };
                };
            };
            
         

            return true;
        } catch (err) {
            errorHandle(formName, 'ChargeDataCanEdit', err);
        };
    };
    function btnSubEdit2Click(event) {
        var headerId = '#' + $(event.data).prop('id');
        var options = $.data(event.data, formName).options;
        if ($(this).jqxButton('disabled')) { return; };
        if (!isSubEditOrAdd(event.data, editMode.edit, 'grdData2')) { return };
        var rowindex = $(headerId + 'grdData2').jqxGrid('getselectedrowindex');
        if (!ChargeDataCanEdit(event.data, rowindex)) { return; };
        disableAllcontrol(event.data);
        showChargeData(event.data, editMode.edit, rowindex, function (r) {                            
            if (r.isSaved) {
                for (var key in r.wipData['Simple'].rows[0]) {
                    options.initData[chargeTableName].rows[rowindex][key] =
                            r.wipData['Simple'].rows[0][key];
                };
                refreshGrid(event.data);
                changeMode(event.data);
            } else {
                changeMode(event.data);
            };
            
        });
    };
    function btnSubAdd1Click(event) {
        var headerId = '#' + $(event.data).prop('id');
        var options = $.data(event.data, formName).options;
        if ($(this).jqxButton('disabled')) { return; };
        /*
        if (checkChildPriv(div, editMode.append, 1) == false) {
            return;
        }; */

        if (!isSubEditOrAdd(event.data, editMode.append, 'grdData1')) { return };
        disableAllcontrol(event.data);
        showFacilityData(event.data, editMode.append, -1, function (r) {                        
            if (r.isSaved) {
                var rw = cloneEmptyRow(event.data, facilityTableName);
                for (var key in r.wipData[facilityTableName].rows[0]) {
                    rw[key] = r.wipData[facilityTableName].rows[0][key];
                };
                options.initData[facilityTableName].rows.push(rw);
                refreshGrid(event.data);
                changeMode(event.data);
                
            } else {
                changeMode(event.data);
            }
            
        });
    };
    function checkChildPriv(div, em, type) {
        try {
            var options = $.data(div, formName).options;
            var ops = {
                editMode: em,
                wipType: 2,
                groupId: options.loginInfo.loginInfo.rows[0]["groupid"],
                isOrder: false,
                privData: options.initData['Priv'].rows
            };
            if (type == 0) {
                return $.fn.WipUtility("getFaciPriv", ops);
            }
            else {
                return $.fn.WipUtility("getChargePriv", ops);
            }
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    }
    function btnSubAdd2Click(event) {
        var headerId = '#' + $(event.data).prop('id');
        var options = $.data(event.data, formName).options;
        if ($(this).jqxButton('disabled')) { return; };
        /*
       if (checkChildPriv(event.data, editMode.append, 1) == false) {
           return;
       }; */
        if (!isSubEditOrAdd(event.data, editMode.append, 'grdData2')) { return };
        disableAllcontrol(event.data);
        showChargeData(event.data, editMode.append, -1, function (r) {                        
            if (r.isSaved) {
                var rw = cloneEmptyRow(event.data, chargeTableName);
                for (var key in r.wipData['Simple'].rows[0]) {
                    rw[key] = r.wipData['Simple'].rows[0][key];
                };
                rw['ADDFLAG'] = 1;
                options.initData[chargeTableName].rows.push(rw);
                refreshGrid(event.data);
            };
            changeMode(event.data);
        });
    };
    function isSubEditOrAdd(div, e, grd) {
        var headerId = '#' + $(div).prop('id');
        var options = $.data(div, formName).options;
        switch (e) {
            case editMode.append:
                if (grd.toUpperCase() == 'GRDDATA2') {
                    if ($(headerId + 'gilServiceType').csList('codeNo') == '') {
                        messageBox(options.language.MustServiceType, messageType.critical, null, function (flag) {
                            $(headerId + 'gilServiceType').csList('focus');
                        });
                        return false;                        
                    };
                };
                break;
            case editMode.edit:
                if ($(headerId + grd).jqxGrid('getrows').length <= 0) {
                    messageBox(options.language.NoEditData, messageType.critical);
                    return false;
                };
                break;
            case editMode.delete:
                if ($(headerId + grd).jqxGrid('getrows').length <= 0) {
                    messageBox(options.language.NoDelData, messageType.critical);
                    return false;
                };
                break;
        };
        return true;
    };
    function btnReserve2Click(event) {
        //var options = $.data(event.data, formName).options;
        //showSO1114A(event.data);
        //disableAllcontrol(event.data);
        showReserve2(event.data, function (r) {
            changeMode(event.data);
        });
        
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
            if (initData.ReturnCode != undefined) {
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
            $(headerId + 'edtCallOkTime').csDateTime({ disabled: true });
            //$(headerId + 'dtFinTime').jqxDateTimeInput({ disabled: true });
            //            $(headerId + 'edtResvTime').jqxDateTimeInput({ disabled: true });
            $(headerId + 'dtFinTime').csDateTime({ disabled: true });
            $(headerId + 'edtResvTime').csDateTime({ disabled: true });
            $(headerId + 'edtSignDate').csDateTime({ disabled: true });
            $(headerId + 'edtResvFlagTime').csDateTime({ disabled: true });

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
                if (initData.SO001.rows[0].SERVAREA != undefined) {
                    $(headerId + 'txtServName').val(initData.SO001.rows[0].SERVAREA);
                };

                if (initData.SO001.rows[0].CLASSNAME1 != undefined) {
                    $(headerId + 'txtClassName').val(initData.SO001.rows[0].CLASSNAME1);
                };

                if (initData.SO001.rows[0].INSTADDRESS != undefined) {
                    $(headerId + 'txtInstAddress').val(initData.SO001.rows[0].INSTADDRESS);
                };
                if (initData.Wip.rows.length > 0) {
                    if (initData.Wip.rows[0].ADDRESS != undefined) {
                        $(headerId + 'txtInstAddress').val(initData.Wip.rows[0].ADDRESS);                        
                    };
                };
                if (initData.SO001.rows[0].TEL1 != undefined) {
                    $(headerId + 'txtTel1').val(initData.SO001.rows[0].TEL1);
                };

                $(headerId + 'txtCustId').val(initData.SO001.rows[0].CUSTID);
                if (initData.SO001.rows[0].CUSTNAME != undefined) {
                    $(headerId + 'txtCustName').val(initData.SO001.rows[0].CUSTNAME);
                };
                //#7385 2.5	若SO1100102=1,SO1100101=0，上述相關功能只有證號要遮。
                if (getUsePriv(options.initData.Priv.rows, 'SO1100102') && !getUsePriv(options.initData.Priv.rows, 'SO1100101')) {
                    //return;
                };
                // #7385 2.6	若SO1100102=1,SO1100101=1, 完全不用遮
                if (getUsePriv(options.initData.Priv.rows, 'SO1100102') && getUsePriv(options.initData.Priv.rows, 'SO1100101')) {
                    //return;

                };
                // #73852.7	SO1100102=0,SO1100101=1
                if (!getUsePriv(options.initData.Priv.rows, 'SO1100102')) {
                    //CustName
                    if (initData.SO001.rows[0].CUSTNAME != undefined) {
                        if (initData.SO001.rows[0].CUSTNAME.length > 1) {
                            $(headerId + 'txtCustName').val(initData.SO001.rows[0].CUSTNAME.substr(0, initData.SO001.rows[0].CUSTNAME.length - 1) + '*');
                        } else {
                            $(headerId + 'txtCustName').val('*');
                        };
                    };
                    //Tel1
                    if (initData.SO001.rows[0].TEL1 != undefined) {
                        if (initData.SO001.rows[0].TEL1.length > 3) {
                            $(headerId + 'txtTel1').val(initData.SO001.rows[0].TEL1.substr(0, initData.SO001.rows[0].TEL1.length - 3) + '***');
                        } else {
                            var p = '';
                            for (i = 0; i < initData.SO001.rows[0].TEL1.length - 1; i++) {
                                p = p + '*';
                            };
                            $(headerId + 'txtTel1').val(p);
                        };
                    };
                    //INSTADDRESS
                    if (initData.SO001.rows[0].INSTADDRESS != undefined) {
                        if (initData.SO001.rows[0].INSTADDRESS.length > 3) {
                            $(headerId + 'txtInstAddress').val(initData.SO001.rows[0].INSTADDRESS.substr(0, initData.SO001.rows[0].INSTADDRESS.length - 3) + '***');
                        } else {
                            var p = '';
                            for (i = 0; i < initData.SO001.rows[0].INSTADDRESS.length - 1; i++) {
                                p = p + '*';
                            };
                            $(headerId + 'txtInstAddress').val(p);
                        };
                    };
                    if (initData.Wip.rows.length > 0) {
                        if (initData.Wip.rows[0].ADDRESS != undefined) {
                            if (initData.Wip.rows[0].ADDRESS.length > 3) {
                                $(headerId + 'txtInstAddress').val(initData.Wip.rows[0].ADDRESS.substr(0, initData.Wip.rows[0].ADDRESS.length - 3) + '***');
                            } else {
                                var p = '';
                                for (i = 0; i < initData.Wip.rows[0].ADDRESS.length - 1; i++) {
                                    p = p + '*';
                                };
                                $(headerId + 'txtInstAddress').val(p);
                            };
                        };
                    };
                    
                };
            };
            if (initData.Wip.rows.length > 0) {

                options.serviceType = initData.Wip.rows[0].SERVICETYPE;
                if (initData.Wip.rows[0].WORKSERVCODE != undefined) {
                    if (initData.Wip.rows[0].WORKSERVCODE != null) {
                        options.workServcode = initData.Wip.rows[0].WORKSERVCODE;
                    };
                };
                if (initData.CD002.rows.length >= 1) {
                    if (initData.CD002.rows[0].DESCRIPTION != undefined) {
                        $(headerId + 'txtServName').val(initData.CD002.rows[0].DESCRIPTION);
                    };
                };

                $(headerId + 'txtSNo').val(initData.Wip.rows[0].SNO);
                $(headerId + 'gilServiceType').csList('codeNo', options.serviceType);
                if (e !== editMode.append) {
                    $(headerId + 'gilServiceType').csList('disabled', true);
                } else { $(headerId + 'gilServiceType').csList('disabled', false); }

                $(headerId + 'txtCustId').val(initData.Wip.rows[0].CUSTID);
                //$(headerId + 'txtCustName').val(initData.Wip.rows[0].CUSTNAME);
                if (initData.Wip.rows[0].NOTE != undefined) {
                    $(headerId + 'txtMemo').jqxTextArea('val', initData.Wip.rows[0].NOTE);
                };
                if (initData.Wip.rows[0].SERVICECODE != undefined) {
                    $(headerId + 'gilServiceCode').csList('codeNo', initData.Wip.rows[0].SERVICECODE);
                    if ($(headerId + 'gilServiceCode').csList('codeNo') == '') {
                        $(headerId + 'gilServiceCode').csList('setDisplayValue',
                         {
                             CODENO: initData.Wip.rows[0].SERVICECODE,
                             DESCRIPTION: initData.Wip.rows[0]['ServiceName'.toUpperCase()]
                         });
                    };
                };
                if (initData.Wip.rows[0].GROUPCODE != undefined) {
                    $(headerId + 'gilGroupCode').csList('codeNo', initData.Wip.rows[0].GROUPCODE);
                };
                if (initData.Wip.rows[0].WORKEREN1 != undefined) {
                    $(headerId + 'gilWorkerEn1').csList('codeNo', initData.Wip.rows[0].WORKEREN1);
                };
                if (initData.Wip.rows[0].WORKEREN2 != undefined) {
                    $(headerId + 'gilWorkerEn2').csList('codeNo', initData.Wip.rows[0].WORKEREN2);
                };
                if (initData.Wip.rows[0].MFCODE1 != undefined) {
                    $(headerId + 'gilMFCode1').csList('codeNo', initData.Wip.rows[0].MFCODE1);
                };
                if (initData.Wip.rows[0].MFCODE2 != undefined) {
                    $(headerId + 'gilMFCode2').csList('codeNo', initData.Wip.rows[0].MFCODE2);
                };
                if (initData.Wip.rows[0].RETURNCODE != undefined) {
                    $(headerId + 'gilReturnCode').csList('codeNo', initData.Wip.rows[0].RETURNCODE);
                };
                if (initData.Wip.rows[0].SATICODE != undefined) {
                    $(headerId + 'gilSatiCode').csList('codeNo', initData.Wip.rows[0].SATICODE);
                };
                if (initData.Wip.rows[0].SIGNEN != undefined) {
                    //$(headerId + 'gilSignEn').csList('codeNo', initData.Wip.rows[0].SIGNEN);
                    $(headerId + 'gilSignEn').csList('setDisplayValue',
                     {
                         EMPNO: initData.Wip.rows[0].SIGNEN,
                         EMPNAME: initData.Wip.rows[0].SIGNNAME
                     });
                };



                if (initData.Wip.rows[0].ACCEPTNAME != undefined) {
                    $(headerId + 'lblAcceptName').text(initData.Wip.rows[0].ACCEPTNAME);
                };

                if (initData.Wip.rows[0].PRINTUSERNAME != null) {
                    $(headerId + 'lblPrintUserName').text(initData.Wip.rows[0].PRINTUSERNAME);
                };
                if (initData.Wip.rows[0].PRTCOUNT != undefined) {
                    $(headerId + 'lblPrtCount').text(initData.Wip.rows[0].PRTCOUNT);
                } else { $(headerId + 'lblPrtCount').text('') }

                if (initData.Wip.rows[0].ACCEPTTIME != undefined) {
                    if (initData.Wip.rows[0].ACCEPTTIME != null && initData.Wip.rows[0].ACCEPTTIME !== 'null') {
                        var d = jsonDate(initData.Wip.rows[0].ACCEPTTIME);

                        $(headerId + 'lblAcceptTime').text(formatStringDate(d, 'yyyyMMddHHmmss', false));
                    };
                };
                if (initData.Wip.rows[0].CLSTIME != undefined) {
                    if (initData.Wip.rows[0].CLSTIME != null && initData.Wip.rows[0].CLSTIME !== 'null') {

                        var d = new Date(initData.Wip.rows[0].CLSTIME);
                        $(headerId + 'lblClsTime').text(formatStringDate(d, 'yyyyMMddHHmmss', false));
                    };
                };
                if (initData.Wip.rows[0].PRINTTIME != undefined) {
                    if (initData.Wip.rows[0].PRINTTIME != null && initData.Wip.rows[0].PRINTTIME !== 'null') {
                        var d = jsonDate(initData.Wip.rows[0].PRINTTIME);

                        $(headerId + 'lblPrintTime').text(formatStringDate(d, 'yyyyMMddHHmmss', false));
                    };
                };

                if (initData.Wip.rows[0].WORKUNIT != null && initData.Wip.rows[0].WORKUNIT !== 'null') {

                    //$(headerId + 'txtWorkUnit').val(initData.Wip.rows[0].WORKUNIT);
                    $(headerId + 'txtWorkUnit').jqxNumberInput('val', initData.Wip.rows[0].WORKUNIT);
                } else { $(headerId + 'txtWorkUnit').jqxNumberInput('val', '0') }// $(headerId + 'txtWorkUnit').val('0') };
                if (initData.Wip.rows[0].FINUNIT != null && initData.Wip.rows[0].FINUNIT !== 'null') {
                    //$(headerId + 'txtFinUnit').val(initData.Wip.rows[0].FINUNIT);
                    $(headerId + 'txtFinUnit').jqxNumberInput('val', initData.Wip.rows[0].FINUNIT);
                } else { $(headerId + 'txtFinUnit').jqxNumberInput('val', '0') };

                (initData.Wip.rows[0].PRIORITY === 1) ? $(headerId + 'chkFlag').jqxCheckBox('check') : $(headerId + 'chkFlag').jqxCheckBox('uncheck');

                (initData.Wip.rows[0].PRINTBILLFLAG === 1) ? $(headerId + 'chkPrintBillFlag').jqxCheckBox('check') : $(headerId + 'chkPrintBillFlag').jqxCheckBox('uncheck');
                /*
                if (initData.Wip.rows[0].FINTIME != null && initData.Wip.rows[0].FINTIME != undefined) {
                    var d = jsonDate(initData.Wip.rows[0].FINTIME);
                    $(headerId + 'dtFinTime').jqxDateTimeInput('setDate', d);
                }; */
                /*
                if (initData.Wip.rows[0].RESVTIME != null && initData.Wip.rows[0].RESVTIME != undefined) {
                    var d = jsonDate(initData.Wip.rows[0].RESVTIME);
                    $(headerId + 'edtResvTime').jqxDateTimeInput('setDate', d);
                    options.oldResvTime = $(headerId + 'edtResvTime').jqxDateTimeInput('getText');
                } else { $(headerId + 'edtResvTime').jqxDateTimeInput('clearString'); }; */

                if (initData.Wip.rows[0].FINTIME != null && initData.Wip.rows[0].FINTIME != undefined) {
                    var d = jsonDate(initData.Wip.rows[0].FINTIME);
                    $(headerId + 'dtFinTime').csDateTime('setDate', d);
                };
                if (initData.Wip.rows[0].RESVTIME != null && initData.Wip.rows[0].RESVTIME != undefined) {
                    var d = jsonDate(initData.Wip.rows[0].RESVTIME);
                    $(headerId + 'edtResvTime').csDateTime('setDate', d);
                    options.oldResvTime = $(headerId + 'edtResvTime').csDateTime('getText');
                } else { $(headerId + 'edtResvTime').csDateTime('clear'); };

                if (initData.Wip.rows[0].CALLOKTIME != null && initData.Wip.rows[0].CALLOKTIME != undefined) {
                    var d = jsonDate(initData.Wip.rows[0].CALLOKTIME);
                    $(headerId + 'edtCallOkTime').csDateTime('setDate', d);
                } else { $(headerId + 'edtCallOkTime').csDateTime('clear'); };

                if (initData.Wip.rows[0].SIGNDATE != null && initData.Wip.rows[0].SIGNDATE != undefined) {
                    var d = jsonDate(initData.Wip.rows[0].SIGNDATE);
                    $(headerId + 'edtSignDate').csDateTime('setDate', d);
                } else { $(headerId + 'edtSignDate').csDateTime('clear'); };

                if (initData.Wip.rows[0].RESVFLAGTIME != null && initData.Wip.rows[0].RESVFLAGTIME != undefined) {
                    var str = initData.Wip.rows[0].RESVFLAGTIME;
                    var d = new Date(1911, 1, 1, str.substr(0, 2), str.substr(2, 2));
                    $(headerId + 'edtResvFlagTime').csDateTime('setDate', d);
                } else { $(headerId + 'edtResvFlagTime').csDateTime('clear'); };

            } else {
                if (options.parameters[options.contactName] != undefined) {
                    if (options.parameters[options.contactName].rows.length > 0) {
                        $(headerId + 'gilServiceType').csList('codeNo', options.parameters[options.contactName].rows[0].SERVICETYPE);
                    };
                };

            };

        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        } finally {
            disableAllFieldPriv(options.controls, options.initData[fieldPrivTableName], options.initData[userPrivTableName]);
        };
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
                                if (lang[idStr.replace($(div).prop('id'), "")] != null) {
                                    $('#' + idStr).val(lang[idStr.replace($(div).prop('id'), "")]);
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
            $("#" + headerId + "msgbox").csWindow({
                height: 100,
                width: 300,                
                isModal: false,
                modalOpacity: 0,
                autoOpen: true
            });
            $.data(div, formName).options.container.csWindow({ disabled: true });
            $("#" + headerId + "msgbox").on('close', function () {
                $.data(div, formName).options.container.csWindow({ disabled: false });
            });            
            var p = $(div).offset();            
            $("#" + headerId + "msgbox").csWindow(
                {
                    dragArea:
                      { left: p.left, top: p.top, width: $(div).width(), height: $(div).height() }
                });            
            controls.push({ name: 'msgbox', type: 'csWindow', level: 0 }); */

            $("#" + headerId + "mainSplitter").jqxSplitter({
                width: '100%',
                height: $(options.container).height() - 85,
                orientation: 'horizontal',
                splitBarSize: 3,                
                panels: [{ size: '60%' }, { size: '40%' }]
            });
            controls.push({ name: headerId + 'mainSplitter', type: 'jqxSplitter', level: 0 });
            $("#" + headerId+"partA-Head").jqxPanel({
                height: '15%',
                width: '100%' ,
                autoUpdate: true,
                sizeMode: 'fixed'
            });
            controls.push({ name: headerId + 'partA-Head', type: 'jqxPanel', level: 1 });
            $("#" + headerId +"partBUI").jqxPanel({
                height: '98%',
                //height: $(headerId + 'tbGrid').height(),
                width: '100%',
                autoUpdate: true,
                sizeMode: 'fixed'
            });
            controls.push({ name: headerId + 'partBUI', type: 'jqxPanel', level: 1 });
            $("#" + headerId + "partA-Detail").jqxPanel({
                height: '85%',
                width: '100%',
                autoUpdate: true,
                sizeMode: 'fixed'
            });
            controls.push({ name: headerId + 'partA-Detail', type: 'jqxPanel', level: 1 });
            $("#" + headerId +"txtSNo").jqxInput({
                width: '90%',
                height: '80%',
                disabled: true,
                
            });
            controls.push({ name: headerId + 'txtSNo', type: 'jqxInput', level: 2 });
            $("#" + headerId +"txtServName").jqxInput({
                width: '90%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: headerId + 'txtServName', type: 'jqxInput', level: 2 });
            /*
            $("#" + headerId + "txtStatus").jqxInput({               
                width: '70%',
                height:25,
                disabled: true
            });
            controls.push({ name: 'txtStatus', type: 'jqxInput', level: 2 }); */
            $("#" + headerId + "txtClassName").jqxInput({
                width: '90%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: headerId + 'txtClassName', type: 'jqxInput', level: 2 });
            $("#" + headerId + "txtCustId").jqxInput({
                width: '90%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: headerId + 'txtCustId', type: 'jqxInput', level: 2 });
            $("#"+ headerId + "txtCustName").jqxInput({
                width: '90%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: headerId + 'txtCustName', type: 'jqxInput', level: 2 });
            $("#"+headerId+"txtTel1").jqxInput({
                width: '90%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: headerId + 'txtTel1', type: 'jqxInput', level: 2 });
            $("#" + headerId +"txtInstAddress").jqxInput({
                width: '96%',
                height: '80%',
                disabled: true
            });
            controls.push({ name: headerId + 'txtInstAddress', type: 'jqxInput', level: 2 });

            $('#' + headerId+'txtMemo').jqxTextArea({
                //placeHolder: $.data(div).SO1112A.options.language.lblMemo,
                height: '100%',
                width: '100%',
                minLength: 1
            });
            controls.push({ name: headerId + 'txtMemo', type: 'jqxTextArea', level: 2 });
            /*
            $("#"+ headerId +"txtWorkUnit").jqxInput({
                width: '60%',
                height: '90%',
                disabled : true
            });
            controls.push({ name: 'txtWorkUnit', type: 'jqxInput', level: 2 }); */
            $("#" + headerId + "txtWorkUnit").jqxNumberInput({
                width: '95%',
                height: '100%',
                inputMode: 'simple',
                min: 0,
                max: 999,
                decimalDigits: 2,
                disabled: true
            });
            controls.push({ name: headerId + 'txtWorkUnit', type: 'jqxNumberInput', level: 2 });
            /*
            $("#"+ headerId +"txtFinUnit").jqxInput({
                width: '60%',
                height: '100%',
                disabled: true
            });
            controls.push({ name: 'txtFinUnit', type: 'jqxInput', level: 2 }); */
            $("#" + headerId + "txtFinUnit").jqxNumberInput({
                width: '95%',
                height: '100%',
                inputMode: 'simple',
                min: 0,
                max: 999,
                decimalDigits: 2,
                disabled: true
            });
            controls.push({ name: headerId + 'txtFinUnit', type: 'jqxNumberInput', level: 2 });

            /*
            $("#" + headerId + "txtFinUnit").jqxNumberInput({
                width: '60%',
                height: '100%',
                digits: 0,
                decimalDigits: 0,
                min:0,
                max:999,
                disabled: true
            });
            controls.push({ name: 'txtFinUnit', type: 'jqxNumberInput', level: 2 }); */
            /*
            $('#' + headerId +'jqxTabs').jqxTabs({
                width: '98%',
                height: '98%'                
            }); */
            $('#' + headerId + 'jqxTabs').jqxExpander({
                width: '100%',
                height: '98%',
                toggleMode:'none',
                showArrow: false
            });
            controls.push({ name: headerId + 'jqxTabs', type: 'jqxExpander', level: 1 });
            
            //$('#' + headerId + 'jqxTabsDetails').csTabs({
            //    width: '99%',
            //    height: '85%'
            //});
            //controls.push({ name: headerId + 'jqxTabsDetails', type: 'csTabs', level: 1 });
            /*
            $("#" + headerId +"dtFinTime").jqxDateTimeInput({
                formatString: 'yyyy/MM/dd HH:mm',
                value: null,
                width: 180
            });
            controls.push({ name: 'dtFinTime', type: 'jqxDateTimeInput', level: 2 }); */
            
            $("#" + headerId + "dtFinTime").csDateTime({
                formatString: 'yyyy/MM/dd HH:mm',
                value: null,
                height: 23,
                showCalendarButton: true,
                width: 150
            });
            controls.push({ name: headerId + 'dtFinTime', type: 'csDateTime', level: 2 }); 
            /*
            $("#" + headerId +"edtSignDate").jqxDateTimeInput({
                formatString: 'yyyy/MM/dd',              
                value: null,
                width: 150
            });
            controls.push({ name: 'edtSignDate', type: 'jqxDateTimeInput', level: 2 }); */

            $("#" + headerId + "edtSignDate").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                height:23,
                width: 150
            });
            controls.push({ name: headerId + 'edtSignDate', type: 'csDateTime', level: 2 });

            /*
            $("#" + headerId +"edtResvTime").jqxDateTimeInput({
                formatString: 'yyyy/MM/dd HH:mm',
                value: null,
                showCalendarButton: false,
                width: 150
            });
            controls.push({ name: 'edtResvTime', type: 'jqxDateTimeInput', level: 2 }); */
            $("#" + headerId + "edtResvTime").csDateTime({
                formatString: 'yyyy/MM/dd HH:mm',
                value: null,
                height: 25,
                showCalendarButton:false,
                width: '100%'
            });
            controls.push({ name: headerId + 'edtResvTime', type: 'csDateTime', level: 2 });
            /*
            $("#" + headerId +"edtCallOkTime").jqxDateTimeInput({
                formatString: 'yyyy/MM/dd HH:mm',
                showCalendarButton: false,
                value : null,
                width: '99%'
            });
            controls.push({ name: 'edtCallOkTime', type: 'jqxDateTimeInput', level: 2 });*/

            $("#" + headerId + "edtCallOkTime").csDateTime({
                formatString: 'yyyy/MM/dd HH:mm',                
                value: null,
                height: 25,
                showCalendarButton: false,
                width: '96%'
            });
            controls.push({ name: headerId + 'edtCallOkTime', type: 'csDateTime', level: 2 });
            /*
            $("#" + headerId +"edtResvFlagTime").jqxDateTimeInput(
            {
                width: 42,
                formatString: 'HH:mm',
                value: null,
                showTimeButton: false,
                showCalendarButton: false
            });
            controls.push({ name: 'edtResvFlagTime', type: 'jqxDateTimeInput', level: 2 }); */
            $("#" + headerId + "edtResvFlagTime").csDateTime(
            {
                width: 50,
                formatString: 'HH:mm',
                showCalendarButton: false,
                value: null,
                height:25
            });
            controls.push({ name: headerId + 'edtResvFlagTime', type: 'csDateTime', level: 2 });

            $("#" + headerId +"gilMFCode1").csList({
                source: null,
                codeNoWidth: 50,
                width: '100%',
                height: '23px',
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
            controls.push({ name: headerId + 'gilMFCode1', type: 'csList', level: 2 });

            $("#" + headerId +"gilMFCode2").csList({
                source: null,
                codeNoWidth: 50,
                width: '100%',
                height: '23px',
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
            controls.push({ name: headerId + 'gilMFCode2', type: 'csList', level: 2 });

            $("#" + headerId + "gilReturnCode").csList({
                source: null,
                codeNoWidth: 50,
                width: '100%',
                height: '23px',
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
            controls.push({ name: headerId + 'gilReturnCode', type: 'csList', level: 2 });
            $("#" + headerId +"gilReturnDescCode").csList({
                source: null,
                codeNoWidth: 50,
                width: '100%',
                height: '23px',
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
            controls.push({ name: headerId + 'gilReturnDescCode', type: 'csList', level: 2 });
            $("#" + headerId +"gilSatiCode").csList({
                source: null,
                codeNoWidth: 50,
                width: '100%',
                height: '23px',
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
            controls.push({ name: headerId + 'gilSatiCode', type: 'csList', level: 2 });

            $("#" + headerId +"gilSignEn").csList({
                //source: [{ EMPNO: '', EMPNAME: '' }],
                source: null,
                codeNoWidth: 60,
                width: '100%',
                height: '23px',
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
                       { text: 'CODENO', datafield: 'EMPNO' },
                       { text: 'DESCRIPTION', datafield: 'EMPNAME' }
                ]
            });
            controls.push({ name: headerId + 'gilSignEn', type: 'csList', level: 2 });
            
            $("#" + headerId +"gilServiceType").csList({
                //source: [{ CodeNo: '', Description: '' }],
                source: null,
                codeNoWidth: 50,
                //width:'250px',
                width:'100%',
                height: 25,
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
            controls.push({ name: headerId + 'gilServiceType', type: 'csList', level: 2 });
            $("#" + headerId +"gilServiceCode").csList({
                //source: [{ CODENO: '', DESCRIPTION: '' }],
                source: null,
                codeNoWidth: 50,
                width: '100%',
                height:25,
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
            controls.push({ name: headerId + 'gilServiceCode', type: 'csList', level: 2 });
            
            $("#" + headerId +"gilGroupCode").csList({
                //source: [{ CODENO: '', DESCRIPTION: '' }],
                source: null,
                codeNoWidth: 70,
                width: '100%',
                height:25,
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
            controls.push({ name: headerId + 'gilGroupCode', type: 'csList', level: 2 });
            $("#" + headerId +"gilWorkerEn1").csList({
                source: null,
                codeNoWidth: 70,
                width: '100%',
                height:25,
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
            controls.push({ name: headerId + 'gilWorkerEn1', type: 'csList', level: 2 });
            $("#" + headerId +"gilWorkerEn2").csList({
                source: null,
                codeNoWidth: 70,
                width: '100%',
                height:25,
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
            controls.push({ name: headerId + 'gilWorkerEn2', type: 'csList', level: 2 });
            $('#' + headerId +'btnResv').jqxButton({
                width: 40,               
                height: 25,
                imgSrc: imageScr.query.imgSrc,
                imgWidth: 20,
                imgHeight: 20,
                //imgSrc: 'Images/Query3.png'
            });
            controls.push({ name: headerId + 'btnResv', type: 'jqxButton', level: 2 });
            $('#' + headerId + 'btnResv > img').css('top', '2px');
      
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
            controls.push({ name: headerId + 'btnSave', type: 'jqxButton', level: 2 });
            $('#' + headerId + 'btnSave > img').css('top', '2px');
            $('#' + headerId +'btnCancel').jqxButton($.extend({},imagePosition,{
                width: 85,
                imgSrc: imageScr.cancel.imgSrc,
                height: 25
            }));
            controls.push({ name: headerId + 'btnCancel', type: 'jqxButton', level: 2 });
            $('#' + headerId + 'btnCancel > img').css('top', '2px');
            $('#' + headerId +'btnReserve2').jqxButton({
                width: 100,
                height: 25               
            });
            controls.push({ name: headerId + 'btnReserve2', type: 'jqxButton', level: 2 });
            
            $('#' + headerId +'btnViewPR').jqxButton({
                width: 100,
                height: 25                
            });
            controls.push({ name: 'btnViewPR', type: 'jqxButton', level: 2 }); 
            $('#' + headerId +'btnSubAdd1').jqxButton($.extend({},imagePosition,{
                width: 50,
                //imgSrc: 'Images/Add1.png',
                imgSrc: imageScr.append.imgSrc,
                //imgWidth: 20,
                //imgHeight: 20,
                height: 25                
            }));
            controls.push({ name: headerId + 'btnSubAdd1', type: 'jqxButton', level: 2 });
            $('#' + headerId +'btnSubEdit1').jqxButton($.extend({},imagePosition,{
                width: 50,
                imgSrc: imageScr.edit.imgSrc,
                //imgSrc: 'Images/Edit1.png',
                //imgWidth: 20,
                //imgHeight: 20,
                height: 25                
            }));
            controls.push({ name: headerId + 'btnSubEdit1', type: 'jqxButton', level: 2 });
            $('#' + headerId +'btnSubDelete1').jqxButton({
                width: 50,
                imgSrc: imageScr.delete.imgSrc,
                //imgSrc: 'Images/Del1.png',
                imgWidth: 20,
                imgHeight: 20,
                height: 25                
            });
            controls.push({ name: headerId + 'btnSubDelete1', type: 'jqxButton', level: 2 });
            $('#' + headerId +'btnSubAdd2').jqxButton($.extend({},imagePosition,{
                width: 50,
                imgSrc: imageScr.append.imgSrc,
                //imgSrc: 'Images/Add1.png',
               // imgWidth: 20,
               // imgHeight: 20,
                height: 25                
            }));
            controls.push({ name: headerId + 'btnSubAdd2', type: 'jqxButton', level: 2 });
            $('#' +headerId +'btnSubEdit2').jqxButton($.extend({},imagePosition,{
                width: 50,
                imgSrc: imageScr.edit.imgSrc,
                //imgSrc: 'Images/Edit1.png',
                //imgWidth: 20,
                //imgHeight: 20,
                height: 25                
            }));
            controls.push({ name: headerId + 'btnSubEdit2', type: 'jqxButton', level: 2 });
            $('#' + headerId +'btnSubDelete2').jqxButton($.extend({},imagePosition,{
                width: 50,
                imgSrc: imageScr.delete.imgSrc,
                //imgSrc: 'Images/Del1.png',
                //imgWidth: 20,
                //imgHeight: 20,
                height: 25                
            }));
            controls.push({ name: headerId + 'btnSubDelete2', type: 'jqxButton', level: 2 });
            $('#' + headerId + 'btnPrintBillFlag').jqxButton({
                width: 70,
                height: 25               
            });
            controls.push({ name: headerId + 'btnPrintBillFlag', type: 'jqxButton', level: 2 });
            $("#" + headerId + "chkFlag").jqxCheckBox({ width: 75 });
            controls.push({ name: headerId + 'chkFlag', type: 'jqxCheckBox', level: 2 });
            $("#" + headerId + "chkPrintBillFlag").jqxCheckBox({ width: 20 });
            controls.push({ name: headerId + 'chkPrintBillFlag', type: 'jqxCheckBox', level: 2 });
            renderGrid(div);
           
            controls.push({ name: headerId + 'grdData1', type: 'jqxGrid', level: 2 });
            controls.push({ name: headerId + 'grdData2', type: 'jqxGrid', level: 2 });

          
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
                width: '100%',
                height:'100%',
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
                    { text: lang.colFaciName, datafield: 'FACINAME', width: 150 },
                    { text: lang.colFaciSNO, datafield: 'FACISNO' }
                ],
                localization: options.localization
            })
            $("#" + headId +"grdData2").jqxGrid({
                width: '100%',
                height: '100%',
                //height: $("#" + headId + "partBUI").height() - 35,
                
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
                            if (value != null && value !='') {
                             
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
                            if (value != null && value != '') {

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
                    {
                        text: lang.colType, datafield: 'TYPE', width: 50,
                        cellsrenderer: function (row, field, value, defaulthtml, columnproperties) {
                            try {
                                var val = $(defaulthtml);
                                if (value == null || Number(value) == 0) {
                                    val.text(lang.isNotClose);
                                }
                                else {
                                    val.text(lang.isClose);
                                    val.css('color', 'red');
                                }
                                return val[0].outerHTML;
                            }
                            catch (err) {
                                errorHandle(formName, 'renderChargeGrid_TYPE', err);
                            }
                        }
                    },
                    {
                        text: lang.colAddFlag, datafield: 'ADDFLAG', width: 80,
                        cellsrenderer: function (row, field, value, defaulthtml, columnproperties) {
                            try {
                                var val = $(defaulthtml);
                                var text;
                                switch (value + "") {
                                    case "2":
                                        text = lang.isAddClose;
                                        break;
                                    case "3":
                                        text = lang.isAddChange;
                                        break;
                                    case "1":
                                        text = lang.isAddNormal;
                                        break;
                                    default:
                                        text = ""
                                }
                                val.text(text);
                                return val[0].outerHTML;
                            }
                            catch (err) {
                                errorHandle(formName, 'renderChargeGrid_ADDFLAG', err);
                            }
                        }
                    },
                    { text: lang.colBillNo, datafield: 'BILLNO', width: 80, hidden: true },
                    { text: lang.colItem, datafield: 'ITEM', width: 80, hidden: true },
                    { text: lang.colROWID, datafield: 'ROWID', width: 80, hidden: true },
                ],
                localization: options.localization
            })
            
        }
        catch (err) {
            errorHandle(formName, 'renderGrid', err);
        }
    }
})(jQuery);