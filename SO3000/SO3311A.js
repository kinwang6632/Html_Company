(function ($) {
    var formName = "SO3311A";    
    var riadllName = "CableSoft.SO.RIA.Billing.Batch.EnterPay.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Billing.Batch.EnterPay.Web.EnterPay";
    var copyLoginInfo = {};
    var copyParameters = {};
    var isChkCloseDate = true;
    var otherForm = [];
    var defaults = (function () {
        this.language = {};
        this.initData = {};
        this.loginInfo = {};        
        this.editMode = 0;        
        this.parameters = {};        
        this.controls = [];        
        this.containerIsWindow = false;        
        this.theme = '';
        this.tabContainer = null;
        this.localization = null;
    });
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close');
       
    };
    function formDestroy(div) {
        try {
            //unBindHandler(div);
            var options = $.data(div, formName).options;
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
                    }
                }
            }; */
            otherForm.forEach(function (element) {
                $(element[0]).off();
                $(element[0])[element[1]]('destroy');
            });
            otherForm.length = 0;
            otherForm = null;
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
        };
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
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    $.fn.SO3311A = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new SO3311A(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3311A_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3311A', err);
        }
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
                                    var csw = $.data(div, formName).options.container;
                                    csw.on("winClosing", function () {
                                        //csw.csWindow('close');
                                        if (!$('#' + $(div).prop('id') + 'btnCancel').jqxButton('disabled')) {
                                            csw.csWindow('close');
                                            return;
                                        } else {
                                            return;
                                        };
                                    });
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
                                    var csw = $.data(div, formName).options.container;
                                    csw.on("winClosing", function () {
                                        //csw.csWindow('close');
                                        if (!$('#' + $(div).prop('id') + 'btnCancel').jqxButton('disabled')) {
                                            csw.csWindow('close');
                                            return;
                                        } else {
                                            return;
                                        };
                                    });
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
    function unBindHandler(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'csCompCode').unbind('selectedIndexChanged');
        $(headerId + 'btnOK').unbind('click');
        $(headerId + 'btnFastEntry').unbind('click');
        $(headerId + 'btnCancel').unbind('click');
        $(headerId + 'dteDefCMDate').unbind('blur');
        if (options.containerIsWindow) {
            $(options.container).unbind('resized');
        };
        
    };
    function bindHandler(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'csCompCode').unbind('selectedIndexChanged');
        $(headerId + 'csCompCode').bind('selectedIndexChanged', div, csCompCodeSelectChanged);
        $(headerId + 'btnOK').unbind('click');
        $(headerId + 'btnOK').bind('click', div, btnOKClick);
        $(headerId + 'btnFastEntry').unbind('click');
        $(headerId + 'btnFastEntry').bind('click', div, btnFastEntryClick);
        $(headerId + 'btnCancel').unbind('click');
        $(headerId + 'dteDefCMDate').unbind('blur');
        $(headerId + 'dteDefCMDate').on('blur', div, dteDefCMDateChange);
        $(headerId + 'btnCancel').unbind('click');
        $(headerId + 'btnCancel').bind('click', function () {
            if ($(this).jqxButton('disabled')) { return; };
            $(options.container).csWindow('close');
        });
        
        $(options.container).unbind('resized');
        if (options.containerIsWindow) {
            $(options.container).unbind('resized');
            $(options.container).on('resized', function (event) {
                if ($(headerId + "tedDefRealAmt").val() == null) {
                    $(headerId + "tedDefRealAmt").val(null);
                };
                
            })
        };
    };
    function dteDefCMDateChange(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).csDateTime('getText') == null) { return; };
        try {
            var parameters = $.extend(true, {}, copyLoginInfo, {
                CloseDate: { type: 'string', value: $(this).csDateTime('getText') },
                ServiceType: { type: 'string', value: null },
               });

            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkCloseDate',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            isChkCloseDate = true;
                        }
                        else {
                            isChkCloseDate = false;
                            messageBox(data.ErrorMessage, messageType.critical, null, function (flag) {
                                $(headerId + 'dteDefCMDate').csDateTime('focus');
                            });
                            //messageBox(data.ErrorMessage, messageType.critical);
                            
                        }
                    } catch (err) {
                        errorHandle(formName, 'ChkCloseDate-Server', err);
                        //changeMode(div);
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
        } finally {

        };
    };
    function prepareData(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var Parameters = {
            type: 'string',
            Parameters: {
                columns: [{ name: 'ClctYM'.toUpperCase(), type: 'string' },
                    { name: 'Note'.toUpperCase(), type: 'string' },
                    { name: 'STCode'.toUpperCase(), type: 'integer' },
                    { name: 'STName'.toUpperCase(), type: 'string' },
                    { name: 'RealAmt'.toUpperCase(), type: 'string' },
                    { name: 'Period'.toUpperCase(), type: 'string' },
                    { name: 'CMCode'.toUpperCase(), type: 'integer' },
                    { name: 'CMName'.toUpperCase(), type: 'string' },
                    { name: 'PTCode'.toUpperCase(), type: 'integer' },
                    { name: 'PTName'.toUpperCase(), type: 'string' },
                    { name: 'RealDate'.toUpperCase(), type: 'date' },
                    { name: 'ClctEn'.toUpperCase(), type: 'string' },
                    { name: 'ClctName'.toUpperCase(), type: 'string' },
                    { name: 'EnterType'.toUpperCase(), type: 'integer' },
                    { name: 'BillCount'.toUpperCase(), type: 'integer' },
                    { name: 'ManualNo'.toUpperCase(), type: 'string' },
                ],
                rows: [{
                    CLCTYM: null,
                    NOTE: null,
                    STCODE: null,
                    STNAME: null,
                    REALAMT: null,
                    PERIOD: null,
                    CMCODE: null,
                    CMNAME: null,
                    PTCODE: null,
                    PTNAME: null,
                    REALDATE: null,
                    CLCTEN: null,
                    CLCTNAME: null,
                    ENTERTYPE: null,
                    BILLCOUNT: null,
                    MANUALNO: null
                }]
            }
        };
        if (Date.parse($(headerId + 'dteClctYM').csDateTime('val'))) {
            if ($(headerId + 'dteClctYM').csDateTime('val') != null) {
                Parameters.Parameters.rows[0]['ClctYM'.toUpperCase()] =
                    $(headerId + 'dteClctYM').csDateTime('getText').replace('/', '');

            };
        };
       
        if ($(headerId + 'tedDefNote').jqxInput('val') != '') {
            Parameters.Parameters.rows[0]['Note'.toUpperCase()] =
                    $(headerId + 'tedDefNote').jqxInput('val');
        };
        if ($(headerId + 'csDefSTCode').csList('codeNo') != '') {
            Parameters.Parameters.rows[0]['STCode'.toUpperCase()] =
                    $(headerId + 'csDefSTCode').csList('codeNo');
            Parameters.Parameters.rows[0]['STName'.toUpperCase()] =
                $(headerId + 'csDefSTCode').csList('description');
        };
        
        if ($(headerId + 'tedDefRealAmt').jqxNumberInput('value') != null) {
            Parameters.Parameters.rows[0]['RealAmt'.toUpperCase()] =
                   $(headerId + 'tedDefRealAmt').jqxNumberInput('value');
        };
       
        /*
        if ($(headerId + 'tedDefRealPeriod').jqxNumberInput('value') != null) {
            Parameters.Parameters.rows[0]['Period'.toUpperCase()] =
                   $(headerId + 'tedDefRealPeriod').jqxNumberInput('value');
        }; */
        if ($(headerId + 'tedDefRealPeriod').val() != null) {
            Parameters.Parameters.rows[0]['Period'.toUpperCase()] =
                   $(headerId + 'tedDefRealPeriod').val();
        };
        if ($(headerId + 'csDefCMCode').csList('codeNo') != '') {
            Parameters.Parameters.rows[0]['CMCode'.toUpperCase()] =
                    $(headerId + 'csDefCMCode').csList('codeNo');
            Parameters.Parameters.rows[0]['CMName'.toUpperCase()] =
                $(headerId + 'csDefCMCode').csList('description');
        };
        if ($(headerId + 'csDefPTCode').csList('codeNo') != '') {
            Parameters.Parameters.rows[0]['PTCode'.toUpperCase()] =
                    $(headerId + 'csDefPTCode').csList('codeNo');
            Parameters.Parameters.rows[0]['PTName'.toUpperCase()] =
                $(headerId + 'csDefPTCode').csList('description');
        };
        if ($(headerId + 'dteDefCMDate').csDateTime('val') != null) {
            Parameters.Parameters.rows[0]['RealDate'.toUpperCase()] =
                    $(headerId + 'dteDefCMDate').csDateTime('getDate');
        };
        if ($(headerId + 'csDefClctEn').csList('codeNo') != '') {
            Parameters.Parameters.rows[0]['ClctEn'.toUpperCase()] =
                    $(headerId + 'csDefClctEn').csList('codeNo');
            Parameters.Parameters.rows[0]['ClctName'.toUpperCase()] =
                $(headerId + 'csDefClctEn').csList('description');
        };
        delete copyParameters;
        copyParameters = {};
        $.extend(true, copyParameters, Parameters);
        $.extend(true, copyParameters, options.initData);
    };
    function btnFastEntryClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return };
        if (!isDataOK(event.data)) { return; };
        oppositeControl(event.data, true);
        prepareData(event.data);
        copyParameters.Parameters.rows[0]['ENTERTYPE'] =1;
        //showSO1131C(event.data, copyParameters);
        showSO3311C(event.data, copyParameters);
    };
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
       
        if ($(this).jqxButton('disabled')) { return };
        if (!isDataOK(event.data)) { return; };
        oppositeControl(event.data, true);
        prepareData(event.data);
        /*
        var Parameters = {
            type: 'string',
            Parameters: {
                columns: [{ name: 'ClctYM'.toUpperCase(), type: 'string' },
                    { name: 'Note'.toUpperCase(), type: 'string' },
                    { name: 'STCode'.toUpperCase(), type: 'string' },
                    { name: 'STName'.toUpperCase(), type: 'string' },
                    { name: 'RealAmt'.toUpperCase(), type: 'string' },
                    { name: 'Period'.toUpperCase(), type: 'integer' },
                    { name: 'CMCode'.toUpperCase(), type: 'string' },
                    { name: 'CMName'.toUpperCase(), type: 'string' },
                    { name: 'PTCode'.toUpperCase(), type: 'string' },
                    { name: 'PTName'.toUpperCase(), type: 'string' },
                    { name: 'RealDate'.toUpperCase(), type: 'date' },
                    { name: 'ClctEn'.toUpperCase(), type: 'string' },
                    { name: 'ClctName'.toUpperCase(), type: 'string' },
                    { name: 'EnterType'.toUpperCase(), type: 'integer' },
                    { name: 'BillCount'.toUpperCase(), type: 'integer' },
                    { name: 'ManualNo'.toUpperCase(), type: 'string' },
                ],
                rows: [{
                    CLCTYM: null,
                    NOTE: null,
                    STCODE: null,
                    STNAME: null,
                    REALAMT: null,
                    PERIOD: null,
                    CMCODE: null,
                    CMNAME: null,
                    PTCODE: null,
                    PTNAME: null,
                    REALDATE: null,
                    CLCTEN: null,
                    CLCTNAME: null,
                    ENTERTYPE: null,
                    BILLCOUNT: null,
                    MANUALNO:null
                }]
            }
        };
        if ($(headerId + 'dteClctYM').csDateTime('val') != null) {
            Parameters.Parameters.rows[0]['ClctYM'.toUpperCase()] =
                    $(headerId + 'dteClctYM').csDateTime('getText');
        };
        if ($(headerId + 'tedDefNote').jqxInput('val') != '') {
            Parameters.Parameters.rows[0]['Note'.toUpperCase()] =
                    $(headerId + 'tedDefNote').jqxInput('val');
        };
        if ($(headerId + 'csDefSTCode').csList('codeNo') != '') {
            Parameters.Parameters.rows[0]['STCode'.toUpperCase()] =
                    $(headerId + 'csDefSTCode').csList('codeNo');
            Parameters.Parameters.rows[0]['STName'.toUpperCase()] = 
                $(headerId + 'csDefSTCode').csList('description');
        };
        if ($(headerId + 'tedDefRealAmt').jqxNumberInput('value') != null) {
            Parameters.Parameters.rows[0]['RealAmt'.toUpperCase()] =
                   $(headerId + 'tedDefRealAmt').jqxNumberInput('value');
        };
        if ($(headerId + 'tedDefRealPeriod').jqxNumberInput('value') != null) {
            Parameters.Parameters.rows[0]['Period'.toUpperCase()] =
                   $(headerId + 'tedDefRealPeriod').jqxNumberInput('value');
        };
        if ($(headerId + 'csDefCMCode').csList('codeNo') != '') {
            Parameters.Parameters.rows[0]['CMCode'.toUpperCase()] =
                    $(headerId + 'csDefCMCode').csList('codeNo');
            Parameters.Parameters.rows[0]['CMName'.toUpperCase()] =
                $(headerId + 'csDefCMCode').csList('description');
        };
        if ($(headerId + 'csDefPTCode').csList('codeNo') != '') {
            Parameters.Parameters.rows[0]['PTCode'.toUpperCase()] =
                    $(headerId + 'csDefPTCode').csList('codeNo');
            Parameters.Parameters.rows[0]['PTName'.toUpperCase()] =
                $(headerId + 'csDefPTCode').csList('description');
        };
        if ($(headerId + 'dteDefCMDate').csDateTime('val') != null) {
            Parameters.Parameters.rows[0]['RealDate'.toUpperCase()] =
                    $(headerId + 'dteDefCMDate').csDateTime('getDate');
        };
        if ($(headerId + 'csDefClctEn').csList('codeNo') != '') {
            Parameters.Parameters.rows[0]['ClctEn'.toUpperCase()] =
                    $(headerId + 'csDefClctEn').csList('codeNo');
            Parameters.Parameters.rows[0]['ClctName'.toUpperCase()] =
                $(headerId + 'csDefClctEn').csList('description');
        };
        delete copyParameters;
        copyParameters = {};
        $.extend(true, copyParameters, Parameters);
        $.extend(true, copyParameters, options.initData); */
        copyParameters.Parameters.rows[0]['ENTERTYPE'] = 0;
        //showSO1131B(event.data,copyParameters);
        showSO3311B(event.data, copyParameters);
    };
    function chkCompSelected(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');

        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { Mid: { type: 'string', value: 'SO3311' } });

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
        unBindHandler(event.data);
        var currentComp = copyLoginInfo.loginInfo.value.rows[0].compcode;
        copyLoginInfo.loginInfo.value.rows[0].compcode = $(this).csList('codeNo');
        options.loginInfo.loginInfo.rows[0].compcode = $(this).csList('codeNo');                
        chkCompSelected(event.data, function (r) {
            if (r) {
                $(headerId + "tedDefRealAmt").val(null);
                QueryAllData(event.data, function () {
                    setDefaultValue(event.data)
                    bindHandler(event.data);
                });

                //$(this).csList('disabled', false);
            } else {
                copyLoginInfo.loginInfo.value.rows[0].compcode = currentComp;
                options.loginInfo.loginInfo.rows[0].compcode = currentComp;
                unBindHandler(event.data);
                $(headerId + "csCompCode").csList('codeNo', currentComp);
                $(headerId + "csCompCode").csList('disabled', false);
                bindHandler(event.data);                
            };
        })

       
    };
    function initData(div,  action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            //unBindHandler(div);
            otherForm = [];
            changeLanguage(div);
            
            renderControl(div);

            QueryAllData(div,
                function () {                    
                    setDefaultValue(div);
                    
                    if ($.isFunction(action)) { action() };
                    bindHandler(div);
                });          


        } catch (err) {
            errorHandle(formName, 'initData', err);
            if ($.isFunction(action)) { action(); };
        };
    };
    function setDefaultValue(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        //'options.loginInfo.loginInfo.rows[0].compcode'
        $(headerId + 'csCompCode').csList('source', options.initData.CompCode.rows);
        $(headerId + 'csCompCode').csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
        $(headerId + 'csDefCMCode').csList('source', options.initData.CMCode.rows);
        $(headerId + 'csDefPTCode').csList('source', options.initData.PTCode.rows);
        $(headerId + 'csDefClctEn').csList('source', options.initData.ClctEn.rows);
        $(headerId + 'csDefSTCode').csList('source', options.initData.STCode.rows);
        //set default value
        $(headerId + 'dteDefCMDate').csDateTime('setDate', new Date());
        $(headerId + 'csDefCMCode').csList('selectedIndex', 0);
        $(headerId + 'csDefPTCode').csList('selectedIndex', 0);
        if ($.isFunction(action)) { action };
    };
    function QueryAllData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, copyLoginInfo);

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetAllData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            delete options.initData;
                            options.initData = null;
                            
                            options.initData = {};
                            $.extend(options.initData, tmp);
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            //changeMode(div);
                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryAllData-Server', err);
                        //changeMode(div);
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
            errorHandle(formName, 'QueryAllData', err);
            changeMode(div);
        } finally {

        };
    };
    function showSO3311C2(div, parameters) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var width = options.container.width();
            var height = $(div).height();
            var objectName = "SO3311C";


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
            var win = createcsWindow(options.container, options.language.ShowSO1131C + " [SO3311C]", winOptions);
            $('#' + win.windowId).one('close', function () {
                // var r = $.extend(true, {}, $.data($('#' + win.contentId)[0], objectName).options);
                //deleteJSONObject(data);
                oppositeControl(div, false);
                $('#' + win.contentId)[objectName]('destroy');
                $('#' + win.windowId).csWindow('destroy');
                //action({ isSaved: r.isSaved, wipData: r.wipData });
                //delete r;
                //r = null;
            });
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: cloneJSON(parameters),
                theme: options.theme,
                localization:cloneJSON( options.localization),                
                enterType: 1,                
            });






        }
        catch (err) {
            errorHandle(formName, 'showSO3311C', err);
        }
    };
    function showSO3311C(div, parameters) {
        try {
            var options = $.data(div, formName).options;
            var width = 1000;
            var height = 600;
            var container;
            if (options.tabContainer != null) {
                container = $('<div id="' + $(div).prop('id') + 'child"style="width:99%;height:99%;"></div>').appendTo(options.tabContainer);
            }
            if (container == null) container = options.container;
            if (width > container.width()) width = container.width();
            if (height > container.height()) height = container.height();
            var x = ($(container).width() - width) / 2;
            var y = 26;
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(container).width(),
                maxHeight: $(container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };

            var win = createcsWindow(container, options.language.ShowSO1131C + ' [SO3311C]', winOptions);
            $('#' + win.windowId).on('close', function () {
                oppositeControl(div, false);
                $('#' + win.contentId)['SO3311C']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                $('#' + $(div).prop('id') + 'child').remove();
            });
            $('#' + win.contentId)['SO3311C']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: cloneJSON(parameters),
                theme: options.theme,
                localization:cloneJSON( options.localization),
                enterType: 1,
            });
        }
        catch (err) {
            errorHandle(formName, 'showSO3311C', err);
        }

    };
    function showSO1131C(div, parameters) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var maxWidth = 1024;
        var maxHeight = 768;
        try {

            if (options.containerIsWindow) {
                maxWidth = $(options.container).csWindow('width');
                maxHeight = $(options.container).csWindow('height');
            };
            var divName = 'div' + getUniqueId();
            var div2Name = 'div2' + getUniqueId();
            $('<div id="' + divName + '"><div>' + options.language.ShowSO1131C + '</div><div id="' + div2Name + '"></div></div>').appendTo('body');
            var divSO3311C = $('#' + divName);
            var cswWidth = 900;
            var cswHeight = 600;
            $(divSO3311C).csWindow($.extend({}, {
                width: cswWidth, height: cswHeight,
                maxWidth: 1028,
                maxHeight: 768,
                keyboardCloseKey: 'none',
                haveClosing: true,

            }));
            var div2SO3311C = $('#' + div2Name);


            $(div2SO3311C).SO3311C($.extend({}, {
                loginInfo: cloneJSON( options.loginInfo),
                container: divSO3311C,
                enterType:1,
                parameters:cloneJSON( parameters),
                localization:cloneJSON( options.localization)
            }));

            $(divSO3311C).on('close', function (event) {
                try {
                    oppositeControl(div, false);
                    $(div2SO3311C).SO3311C('destroy');
                    $(divSO3311C).csWindow('destroy');
                } catch (err) {
                    errorHandle(formName, 'showSO1131C_close', err);
                } finally {
                    //changeMode(div, options.editMode);

                }

            });


        } catch (err) {
            errorHandle(formName, 'showSO1131C', err);
        } finally {

        }
    };
    function showSO3311B2(div, parameters) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var width = options.container.width();
            var height = $(div).height();
            var objectName = "SO3311B";
           
           
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
            var win = createcsWindow(options.container, options.language.ShowForm + " [SO3311B]", winOptions);
            $('#' + win.windowId).one('close', function () {
               // var r = $.extend(true, {}, $.data($('#' + win.contentId)[0], objectName).options);
                //deleteJSONObject(data);
                oppositeControl(div, false);
                $('#' + win.contentId)[objectName]('destroy');
                $('#' + win.windowId).csWindow('destroy');                
                //action({ isSaved: r.isSaved, wipData: r.wipData });
                //delete r;
                //r = null;
            });
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: parameters,
                theme: options.theme,
                localization: options.localization
            });


           



        }
        catch (err) {
            errorHandle(formName, 'showSO3311B2', err);
        }
    };
    function showSO3311B(div, parameters) {
        try {
            var options = $.data(div, formName).options;
            var width = 1000;
            var height = 600;
            var container;
            if (options.tabContainer != null) {
                container = $('<div id="' + $(div).prop('id') + 'child"style="width:99%;height:99%;"></div>').appendTo(options.tabContainer);
            }
            if (container == null) container = options.container;
            if (width > container.width()) width = container.width();
            if (height > container.height()) height = container.height();
            var x = ($(container).width() - width) / 2;
            var y = 26;
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(container).width(),
                maxHeight: $(container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };

            var win = createcsWindow(container, options.language.ShowForm + ' [SO3311B]', winOptions);
            $('#' + win.windowId).on('close', function () {
                oppositeControl(div, false);
                $('#' + win.contentId)['SO3311B']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                $('#' + $(div).prop('id') + 'child').remove();
            });
            $('#' + win.contentId)['SO3311B']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: parameters,
                theme: options.theme,
                localization: options.localization
            });
        }
        catch (err) {
            errorHandle(formName, 'showSO3311B', err);
        }

    };


    function showSO1131B(div,parameters) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var maxWidth = 1024;
        var maxHeight = 768;
        try {
            
            if (options.containerIsWindow) {
                maxWidth = $(options.container).csWindow('width');
                maxHeight = $(options.container).csWindow('height');
            };
            var divName = 'div' + getUniqueId();
            var div2Name = 'div2' + getUniqueId();
           
            if (options.tabContainer != null) {
                $('<div id="' + divName + '"><div>' + options.language.ShowForm + '</div><div id="' + div2Name + '"></div></div>').appendTo(options.tabContainer);
            } else
            {
                $('<div id="' + divName + '"><div>' + options.language.ShowForm + '</div><div id="' + div2Name + '"></div></div>').appendTo('body');
            }

            
            var divSO3311B = $('#' + divName);
            var cswWidth = 900;
            var cswHeight = 600;
            $(divSO3311B).csWindow($.extend({}, {
                width: cswWidth, height: cswHeight,
                maxWidth: 1028,
                maxHeight: 768,
                keyboardCloseKey: 'none',
                haveClosing: true,

            }));
            var div2SO3311B = $('#' + div2Name);
         

            $(div2SO3311B).SO3311B($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: divSO3311B,                
                parameters:cloneJSON( parameters),                
                localization: cloneJSON(options.localization)
            }));
            otherForm.push([div2SO3311B, 'SO3311B']);
            otherForm.push([divSO3311B, 'csWindow']);
            $(divSO3311B).on('close', function (event) {
                try {
                    oppositeControl(div, false);
                    $(div2SO3311B).SO3311B('destroy');
                    $(divSO3311B).csWindow('destroy');
                    otherForm.length = 0;
                    
                } catch (err) {
                    errorHandle(formName, 'showSO1131B_close', err);
                } finally {
                    //changeMode(div, options.editMode);

                }

            });


        } catch (err) {
            errorHandle(formName, 'showSO1131B', err);
        } finally {

        }
    };

    function isDataOK(div) {
        var headerId = '#' + $(div).prop('id');
        var options = $.data(div, formName).options;
        if ($(headerId + "csCompCode").csList('codeNo') == '') {
            messageBox(options.language.mustCompany, messageType.critical);
            return false;
        };
        if ($(headerId + "dteDefCMDate").csDateTime('val') == null) {
            messageBox(options.language.mustDefCMDate, messageType.critical);
            return false;
        };
        if ($(headerId + "csDefCMCode").csList('codeNo') == '') {
            messageBox(options.language.mustDefCMCode, messageType.critical);
            return false;
        };
        if ($(headerId + "csDefPTCode").csList('codeNo') == '') {
            messageBox(options.language.mustDefPTCode, messageType.critical);
            return false;
        };
        return true;
    };
    function oppositeControl(div,isDisabled) {
        var headerId = '#' + $(div).prop('id');
        $(headerId + "csCompCode").csList('disabled', isDisabled);
        $(headerId + "csDefCMCode").csList('disabled', isDisabled);
        $(headerId + "csDefClctEn").csList('disabled', isDisabled);
        $(headerId + "csDefPTCode").csList('disabled', isDisabled);
        $(headerId + "csDefSTCode").csList('disabled', isDisabled);
        $(headerId + "dteClctYM").csDateTime({ disabled: isDisabled });
        $(headerId + "dteDefCMDate").csDateTime({ disabled: isDisabled });
        //        $(headerId + "tedDefRealPeriod").jqxNumberInput({ disabled: isDisabled });
        $(headerId + "tedDefRealPeriod").jqxMaskedInput({ disabled: isDisabled });
        $(headerId + "tedDefRealAmt").jqxNumberInput({ disabled: isDisabled });
        //$(headerId + "tedDefRealAmt").jqxMaskedInput({ disabled: isDisabled });
        $(headerId + "tedDefNote").jqxInput({ disabled: isDisabled });
        $(headerId + 'btnOK').jqxButton({ disabled: isDisabled });
        $(headerId + 'btnFastEntry').jqxButton({ disabled: isDisabled });
        $(headerId + 'btnCancel').jqxButton({ disabled: isDisabled });
        ///dteDefCMDate
    }
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var height = $(div).innerHeight();
        var headerId = '#' + $(div).prop('id');
        try {
            //-----------------------------------------------------------------------------            
            $(headerId + "csCompCode").csList({
                source: null,
                codeNoWidth: 80,
                width: '280px',
                height: '22px',
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
            $(headerId + "csCompCode").csList('onlyDropDown', true);
            controls.push({ name: $(div).prop('id') +'csCompCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "csDefCMCode").csList({
                source: null,
                codeNoWidth: 80,
                width: '280px',
                height: '22px',
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
            controls.push({ name: $(div).prop('id')+'csDefCMCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            $(headerId + "csDefClctEn").csList({
                source: null,
                codeNoWidth: 80,
                width: '280px',
                height: '22px',
                showColumnHeaders: false,
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
            controls.push({ name:$(div).prop('id')+ 'csDefClctEn', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "csDefPTCode").csList({
                source: null,
                codeNoWidth: 80,
                width: '280px',
                height: '22px',
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

            controls.push({ name: $(div).prop('id') +'csDefPTCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "csDefSTCode").csList({
                source: null,
                codeNoWidth: 80,
                width: '280px',
                height: '22px',
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
            controls.push({ name:$(div).prop('id')+ 'csDefSTCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "dteClctYM").csDateTime({
                formatString: 'yyyy/MM',
                value: null,
                showCalendarButton: false,
                width: 280
            });
            controls.push({ name:$(div).prop('id')+ 'dteClctYM', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "dteDefCMDate").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: 280
            });
            controls.push({ name:$(div).prop('id')+ 'dteDefCMDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            /*
            $(headerId + "tedDefRealPeriod").jqxNumberInput({
                width: '95%',
                height: 25,
                inputMode: 'simple',
                min: 0,
                max: 999,
                decimalDigits: 0,
                disabled: false,
                
            });
            $(headerId + "tedDefRealPeriod").val(null);            
            controls.push({ name: 'tedDefRealPeriod', type: 'jqxNumberInput', level: 2 }); */

            $(headerId + 'tedDefRealPeriod').jqxMaskedInput({
                width: '90%',
                height: '25px',
                promptChar: '',
                textAlign: 'right',
                mask: '[1-9][0-9][0-9]'
            });
            controls.push({ name: $(div).prop('id')+'tedDefRealPeriod', type: 'jqxMaskedInput', level: 2 });

            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            
            $(headerId +"tedDefRealAmt").jqxNumberInput({
                width: '95%',
                height: 25,
                inputMode: 'simple',
                min: 0,
                max: 999999,
                decimalDigits: 0,
                disabled: false,
                
            });
            $(headerId + "tedDefRealAmt").val(null);
            controls.push({ name:$(div).prop('id')+ 'tedDefRealAmt', type: 'jqxNumberInput', level: 2 });  
            /*
            $(headerId + 'tedDefRealAmt').jqxMaskedInput({
                width: '90%',
                height: '25px',
                promptChar: '',
                textAlign: 'right',                
                mask: '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
            });
            controls.push({ name: 'tedDefRealAmt', type: 'jqxMaskedInput', level: 2 });  */

            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId +"tedDefNote").jqxInput({
                height: 22,
                width: 280,
            });
            controls.push({ name:$(div).prop('id')+ 'tedDefNote', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------

           

            //-----------------------------------------------------------------------------
            $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.ok .imgSrc
            }));
            controls.push({ name: $(div).prop('id')+'btnOK', type: 'jqxButton', level: 2 });
            $(headerId + 'btnOK > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnFastEntry').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.excel.imgSrc
            }));
            controls.push({ name:$(div).prop('id')+ 'btnFastEntry', type: 'jqxButton', level: 2 });
            $(headerId + 'btnFastEntry > img').css('top', '2px');
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

          
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

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
})(jQuery);