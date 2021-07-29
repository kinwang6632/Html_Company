(function ($) {
    var formName = "SO3316A";
    var riadllName = "CableSoft.SO.RIA.Billing.ACHAuthIn.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Billing.ACHAuthIn.Web.ACHAuthIn";
    var copyLoginInfo = {};
    var dsInputData = null;
    var defaults = (function () {
        this.language = {};
        this.loginInfo = {};
        this.initData = {};
        this.editMode = 0;
        this.parameters = {};
        this.controls = [];
        this.containerIsWindow = false;
        this.theme = '';        
        this.localization = null;
    });
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            //options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close');
    };
    function formDestroy(div) {
        var options = $.data(div, formName).options;
        var controls = $.data(div, formName).options.controls;
        try {
            unBindHandler(div);
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
            destroyControls(controls);
            deleteJSONObject(options);
            $(div).children().remove();
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
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
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    $.fn.SO3316A = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new SO3316A(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3316A_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3316A', err);
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
    function chkCompSelected(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');        
        
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { Mid: { type: 'string', value: 'SO3316' } });

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
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            copyLoginInfo = getParaLoginInfo(div, formName);
            if ($(options.container).attr('class') != undefined) {
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    options.containerIsWindow = true;
                };
            };
            loadForm(options,
                'SO3000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        changeLanguage(div);
                        renderControl(div);
                        prepareData(div);
                        queryAllData(div, function () {
                            addHandler(div);
                            $(div).triggerHandler('loaded', [this, options]);
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
                        changeLanguage(div);
                        renderControl(div);
                        prepareData(div);
                        queryAllData(div, function () {
                            addHandler(div);
                            $(div).triggerHandler('loaded', [this, options]);
                        });
                        //$(div).triggerHandler('loaded', [this, options]);
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded', err);
                    };
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
    
    function queryAllData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, copyLoginInfo);
            var params = getParameters(riadllName,
                  riaClassName,
                  'QueryAllData',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                        } else {
                            if (data.ResultXML != '') {
                                var d = JSON.parse(data.ResultXML);
                                delete options.initData;
                                options.initData = {};
                                $.extend(true, options.initData, d);
                                $(headerId + 'csCompCode').csList('source', options.initData.CompCode.rows);
                                $(headerId + 'csCompCode').csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                                //$(headerId + 'csDefCMCode').csList('codeNo', 0);
                                if (d.FormatType.rows.length > 0) {
                                    $(headerId + 'csFormatType').csList('codeNo', d.FormatType.rows[0]['ACHCUSTID'] + 1);
                                };
                                //$(headerId + 'edtResvTime').jqxDateTimeInput('setDate', d);                               
                                delete d;
                                d = null;
                            };
                        };
                        if ($.isFunction(action)) { action(); };
                    } catch (err) {

                        errorHandle(formName, 'QueryAllData-Server', err);
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
        } finally {

        };
    };
    function prepareData(div) {
        //var options = $.data(div, formName).options;
        //var headerId = '#' + $(div).prop('id');
        delete dsInputData;
        dsInputData = null;
         dsInputData = {            
            BankId: {
                columns: [{ name: 'CODENO', type: 'string' }                    
                ],
                rows: []
            },
            CitemCode: {
                columns: [{ name: 'CODENO', type: 'string' }
                ],
                rows: []
            },
            FormatType: {
                columns: [{ name: 'CODENO', type: 'string' }
                ],
                rows: [{
                    CODENO: null,
                }]
            },
            BillHeadFmt: {
                columns: [{ name: 'BILLHEADFMT', type: 'string' },
                    { name: 'ACHTNO', type: 'string' },
                    { name: 'ACHTDESC', type: 'string' },
                    { name: 'CITEMCODESTR', type: 'string' },
                ],
                rows: []
            },
            InputACTHNO: {
                columns: [{ name: 'ACHTNO', type: 'string' },
                    { name: 'ACHTDESC', type: 'string' }                  
                ],
                rows: []
            },
            StopAll: {
                columns: [{ name: 'STOPALL', type: 'boolean' },                    
                ],
                rows: [{
                    STOPALL: false                    
                }]
            }
        };

    };
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
                codeNoWidth: 50,
                width: '97%',
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
            $(headerId + "csCompCode").csList('onlyDropDown', true);
            controls.push({ name: $(div).prop('id') +'csCompCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------



            //-----------------------------------------------------------------------------

            $(headerId + "csFormatType").csList({
                source: null,
                codeNoWidth: 50,
                width: '97%',
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
            var dsFormat = {
                type: 'string',
                fmt: {
                    columns: [{ name: 'CODENO', type: 'integer' },
                        { name: 'DESCRIPTION', type: 'string' }                       
                    ],
                    rows: [{
                        CODENO: 1,
                        DESCRIPTION: lang.OldKind,                  
                    }, {
                        CODENO: 2,
                        DESCRIPTION: lang.NewKind,
                    }]
                }
            };
            $(headerId + 'csFormatType').csList('source',  dsFormat.fmt.rows);
            delete dsFormat;
            dsFormat = null;
            controls.push({ name: $(div).prop('id') +'csFormatType', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'grbWhere').jqxExpander({
                width: '99%',
                height: '98%',
                toggleMode: 'none',
                showArrow: false
            });
            controls.push({ name:$(div).prop('id')+ 'grbWhere', type: 'jqxExpander', level: 1 });

            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "chkAuthStop").jqxCheckBox({ width: 110, checked: true });
            controls.push({ name: $(div).prop('id') +'chkAuthStop', type: 'jqxCheckBox', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId +"edtStopDate1").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                width: '97%'
            });
            controls.push({ name:$(div).prop('id')+ 'edtStopDate1', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "edtStopDate2").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                width: '97%'
            });
            controls.push({ name:$(div).prop('id')+ 'edtStopDate2', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 60,
                height: 25,
                imgSrc: imageScr.ok.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnOK', type: 'jqxButton', level: 2 });
            $(headerId + 'btnOK > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                width: 60,
                height: 25,
                imgSrc: imageScr.exit.imgSrc
            }));
            controls.push({ name: $(div).prop('id')+'btnCancel', type: 'jqxButton', level: 2 });
            $(headerId + 'btnCancel > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'txtUploadField').csUploadFile($.extend({}, {
                loginInfo: $.extend(true, {}, options.loginInfo),
                container: $(headerId + 'txtUploadField'),
                height :25,
                editMode: options.editMode
            }));
            controls.push({ name: $(div).prop('id') + 'txtUploadField', type: 'csUploadFile', level: 2 });
            $(headerId + 'txtUploadField').csUploadFile('resize', { width: $(headerId + 'uploadContainer').width() });
            
            //-----------------------------------------------------------------------------

            //downloadLink
            $(headerId + 'downloadLink').append($(headerId + 'btnDownload'));
            //$(headerId + 'downloadLink').append($(headerId + 'btnDownload'));
            if (options.containerIsWindow) {
                $(options.container).resize();
            }
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        };
    };
    function unBindHandler(div) {
        var headerId = '#' + $(div).prop('id');
        var options = $.data(div, formName).options;
        $(headerId + 'btnOK').unbind('click');
        $(headerId + 'btnCancel').unbind('click');
        $(headerId + "csCompCode").unbind('selectedIndexChanged');
        $(options.container).unbind('resize');
    };
    function addHandler(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnOK').unbind('click');
        $(headerId + 'btnOK').bind('click', div, btnOKClicked);
        $(headerId + 'btnCancel').unbind('click');
        $(headerId + "csCompCode").unbind('selectedIndexChanged');
        $(headerId + "csCompCode").bind('selectedIndexChanged', div, csCompCodeSelected);
        $(options.container).unbind('resize');
        $(options.container).on('resize', function () {
            $(headerId + 'txtUploadField').csUploadFile('resize',
                { width: $(headerId + 'uploadContainer').width() });
        });
        $(headerId + 'btnCancel').on('click', function () {
            if (options.containerIsWindow) {
                $(options.container).csWindow('close');
            };
            
        });
        $(options.container).on('resize', function () {
            $(headerId + 'txtUploadField').csUploadFile('resize', { width: $(headerId + 'uploadContainer').width() });
        });
    };
    function csCompCodeSelected(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).csList('codeNo') == '') return;
        var currentComp = copyLoginInfo.loginInfo.value.rows[0].compcode;
        copyLoginInfo.loginInfo.value.rows[0].compcode = $(this).csList('codeNo');
        options.loginInfo.loginInfo.rows[0].compcode = $(this).csList('codeNo');
        unBindHandler(event.data);
        $(headerId + "edtStopDate1").csDateTime('setText', '');
        $(headerId + "edtStopDate2").csDateTime('setText', '');
        disableAllControl(event.data);
       // options.loginInfo.loginInfo.rows[0].compcode = $(this).csList('codeNo');
        
        chkCompSelected(event.data, function (r) {
            if (r) {
                queryAllData(event.data, function () {
                    addHandler(event.data);
                    enableAllControl(event.data);
                    $(headerId + "csCompCode").csList('disabled', false);
                    addHandler(event.data);
                });
                
                //$(this).csList('disabled', false);
            } else {
                copyLoginInfo.loginInfo.value.rows[0].compcode = currentComp;
                options.loginInfo.loginInfo.rows[0].compcode = currentComp;
                unBindHandler(event.data);
                $(headerId + "csCompCode").csList('codeNo', currentComp);
                $(headerId + "csCompCode").csList('disabled', false);
                enableAllControl(event.data);
                addHandler(event.data);
            };
        })


       
        
    };
    function isDataOK(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if ($(headerId + 'csCompCode').csList('codeNo') == '') {
            messageBox(options.language.mustCompany, messageType.critical);
            return;
        };
        
        if ($(headerId + 'csFormatType').csList('codeNo') == '') {
            messageBox(options.language.mustFmt, messageType.critical);
            return;
        };
        if ($(headerId + 'txtUploadField').csUploadFile('getFiles') == '') {
            messageBox(options.language.mustSelectFile, messageType.critical);
            return;
        };
        return true;
    };
    function prepareInputData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        dsInputData.FormatType.rows[0]['CODENO'] = $(headerId + 'csFormatType').csList('codeNo');
        if ($(headerId + 'chkAuthStop').jqxCheckBox('checked')) {
            dsInputData.StopAll.rows[0]['StopAll'.toUpperCase()] = true;
        };
        $.each(options.initData.BankId.rows, function (index, row) {
            dsInputData.BankId.rows.push({ CODENO: row.CODENO });
        });
        $.each(options.initData.CD068.rows, function (index, row) {
            dsInputData.BillHeadFmt.rows.push({
                BILLHEADFMT: row.BILLHEADFMT,
                ACHTNO: row.ACHTNO,
                ACHTDESC: row.ACHTDESC,
                CITEMCODESTR: row.CITEMCODESTR
            });
        });
        var aryCitemstr = [];
        $.each(options.initData.CD068.rows, function (index, row) {
            aryCitemstr.push(row.CITEMCODESTR);
        });
        dsInputData.CitemCode.rows.push({ CODENO: aryCitemstr.toString() });
        $.each(options.initData.CD068.rows, function (index, row) {
            dsInputData.InputACTHNO.rows.push({
                ACHTNO: row.ACHTNO,
                ACHTDESC: row.ACHTDESC
            });
        });
       
    };
    function disableAllControl(div, action) {
        var headerId = '#' + $(div).prop('id');
        $(headerId + "csCompCode").csList('disabled', true);
        $(headerId + "csFormatType").csList('disabled', true);
        $(headerId + "chkAuthStop").jqxCheckBox({ disabled: true });
        $(headerId + "edtStopDate1").csDateTime({ disabled: true });
        $(headerId + "edtStopDate2").csDateTime({ disabled: true });
        $(headerId + 'btnOK').jqxButton({ disabled: true });
        $(headerId + 'btnCancel').jqxButton({ disabled: true });
    };
    function enableAllControl(div, action) {
        var headerId = '#' + $(div).prop('id');
        $(headerId + "csCompCode").csList('disabled', false);
        $(headerId + "csFormatType").csList('disabled', false);
        $(headerId + "chkAuthStop").jqxCheckBox({ disabled: false });
        $(headerId + "edtStopDate1").csDateTime({ disabled: false });
        $(headerId + "edtStopDate2").csDateTime({ disabled: false });
        $(headerId + 'btnOK').jqxButton({ disabled: false });
        $(headerId + 'btnCancel').jqxButton({ disabled: false });
    };
    function btnOKClicked(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return; };
        if (!isDataOK(event.data)) return;
        prepareData(event.data);
        prepareInputData(event.data);
        var stopDate1 = $(headerId + 'edtStopDate1').csDateTime('getText');
        var stopDate2 = $(headerId + 'edtStopDate2').csDateTime('getText');
        if (stopDate1 != null) {
            stopDate1 = stopDate1.replace(/[^0-9]/g, '');
        };
        if (stopDate2 != null) {
            stopDate2 = stopDate2.replace(/[^0-9]/g, '');
        };
        disableAllControl(event.data);
        $(headerId + 'txtUploadField').one('load', function (e, filename) {
            var parameters = $.extend({}, copyLoginInfo,
                  {dsInputData:{type:'string',value:dsInputData}},
                  { fileName: { type: 'string', value: filename } },
                  { StopDate1: { type: 'string', value: stopDate1 } },
                  { StopDate2: { type: 'string', value: stopDate2 } });

            var params = getParameters(riadllName,
                  riaClassName,
                  'Launch',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                            enableAllControl(event.data);
                        } else {
                            if (data.ResultXML != '') {
                                var downloadFileName = data.DownloadFileName;
                                messageBox(data.ResultXML, messageType.information, null, function (flag) {
                                    if (downloadFileName != '' && downloadFileName != null) {
                                        $(headerId + 'downloadLink').removeProp('href');
                                        $(headerId + 'downloadLink').removeProp('download');
                                        $(headerId + 'downloadLink').prop('href', downloadFileName);
                                        $(headerId + 'downloadLink').prop('download', 'ACHLog.zip');
                                        $(headerId + 'btnDownload').click();                                        
                                    };
                                    enableAllControl(event.data);
                                });
              
                            };
                        };
                    } catch (err) {
                        errorHandle(formName, 'Launch-Server', err);
                        enableAllControl(event.data);
                        if ($.isFunction(action)) { action() };
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
        });
        $(headerId + 'txtUploadField').one('error', function (event, errmsg) {
            messageBox(errmsg, messageType.critical);
            //reverseControlState(event.data, true);
        });
        $(headerId + 'txtUploadField').csUploadFile('uploadFiles');
    };
})(jQuery);