(function ($) {
    var formName = 'SO3279A';
    var riadllName = 'CableSoft.SO.RIA.Billing.PostACHAuth.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.PostACHAuth.Web.PostACHAuth';
    var copyLoginInfo = {};
    var billFmtName = [];
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
            return canEdit(params, param2);
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
                            options: $.extend({}, new defaults(), new SO3279A(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3279A_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3279A', err);
        }
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        
        var headerId = '#' + $(div).prop('id');
        try {
            //-----------------------------------------------------------------------------
            $(headerId + "gilCompCode").csList({
                source: null,
                codeNoWidth: 60,
                width: '250px',
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
            $(headerId + "gilCompCode").csList('onlyDropDown', true);
            controls.push({ name: $(div).prop('id') + 'gilCompCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "gilBank").csList({
                source: null,
                codeNoWidth: 60,
                width: '250px',
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
            controls.push({ name:  $(div).prop('id') + 'gilBank', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------         
            //-----------------------------------------------------------------------------
            $(headerId + 'CmbApplyType').jqxDropDownList({
                width: '250px',
                height: 22,
                placeHolder: ""
            });
            controls.push({ name: $(div).prop('id') + 'CmbApplyType', type: 'jqxDropDownList', level: 2 });
            $(headerId + "CmbApplyType").jqxDropDownList('addItem', lang.applyType);
            $(headerId + "CmbApplyType").jqxDropDownList('addItem', lang.stopType);
            $(headerId + "CmbApplyType").jqxDropDownList('selectIndex', 0);
            //-----------------------------------------------------------------------------     
            //-----------------------------------------------------------------------------
            $(headerId + "gdaSendDate").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                //showCalendarButton: false,
                width: 120,
                height: 25
            });
            controls.push({ name: $(div).prop('id') + 'gdaSendDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------   
            //-----------------------------------------------------------------------------
            $(headerId + "gdaPropDate1").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                //showCalendarButton: false,
                width: 110,
                height: 25
            });
            controls.push({ name: $(div).prop('id') + 'gdaPropDate1', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------   
            //-----------------------------------------------------------------------------
            $(headerId + "gdaPropDate2").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                //showCalendarButton: false,
                width: 110,
                height: 25
            });
            controls.push({ name: $(div).prop('id') + 'gdaPropDate2', type: 'csDateTime', level: 2 });
            //----------------------------------------------------------------------------- 
            //-----------------------------------------------------------------------------
            $(headerId + "gdaStopDate1").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                //showCalendarButton: false,
                width: 110,
                height: 25
            });
            controls.push({ name: $(div).prop('id') + 'gdaStopDate1', type: 'csDateTime', level: 2 });
            //----------------------------------------------------------------------------- 
            //-----------------------------------------------------------------------------
            $(headerId + "gdaStopDate2").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                //showCalendarButton: false,
                width: 110,
                height: 25
            });
            controls.push({ name: $(div).prop('id') + 'gdaStopDate2', type: 'csDateTime', level: 2 });
            //----------------------------------------------------------------------------- 
            //-----------------------------------------------------------------------------
            $(headerId + 'gimBillHeadFmt').csMulti({
                buttonText: lang.gimBillHeadFmt,
                width: '680px',
                buttonWidth: 100,
                //widthDesc: 150,
                //winWidth: 800,
                //winHeight: 500,
                isReadOnly: false,
                columns: [
                    { text: lang.csMultiCode, datafield: 'CODENO', width: 80 },
                    { text: lang.csMultiDescription, datafield: 'DESCRIPTION', width: 150 }

                ]
            });
            controls.push({ name: $(div).prop('id') + 'gimBillHeadFmt', type: 'csMulti', level: 2 });
            //----------------------------------------------------------------------------- 
            //-----------------------------------------------------------------------------
            $(headerId + 'gimCitemCode').csMulti({
                buttonText: lang.gimCitemCode,
                width: '680px',
                buttonWidth: 100,
                isReadOnly : true,
                //widthDesc: 250,
                //winWidth: 800,
                //winHeight: 500,                
                columns: [
                    { text: lang.csMultiCode, datafield: 'CODENO', width: 70 },
                    { text: lang.csMultiDescription, datafield: 'DESCRIPTION', width: 250 }

                ]
            });
            
            controls.push({ name: $(div).prop('id') + 'gimCitemCode', type: 'csMulti', level: 2 });
            //----------------------------------------------------------------------------- 
            //-----------------------------------------------------------------------------
            $(headerId + 'txtUploadField').csUploadFile($.extend({}, {
                loginInfo: $.extend(true, {}, options.loginInfo),
                container: $(headerId + 'txtUploadField'),
                editMode: options.editMode,
                height: 25
            }));
            controls.push({ name: $(div).prop('id') + 'txtUploadField', type: 'csUploadFile', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'btnFetch').jqxButton({
                width: 100,
                height: 25,
            });
            controls.push({ name: $(div).prop('id') + 'btnFetch', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'btnTaken').jqxButton({
                width: 100,
                height: 25,
            });
            controls.push({ name: $(div).prop('id') + 'btnTaken', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                width: 100,
                height: 25,
                imgSrc: imageScr.exit.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnCancel', type: 'jqxButton', level: 2 });
            $(headerId + 'btnCancel > img').css('top', '2px');
            //-----------------------------------------------------------------------------
            $(headerId + 'downloadLink').append($(headerId + 'btnDownload'));
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        }; 
    };
    function formDestroy(div) {
        try {

            var options = $.data(div, formName).options;
            var controls = $.data(div, formName).options.controls;
            var headerId = '#' + $(div).prop('id');          
            unHandler(div);
            for (j = 3; j >= 0; j--) {
                for (i = 0; i < controls.length; i++) {
                    if (controls[i].level == j) {
                        var o = $('#' +  controls[i].name);
                        if (o.length > 0) {
                            $(o[0]).off();
                            $(o[0])[controls[i].type]('destroy');
                        }
                    };
                };
            };
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
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'gimBillHeadFmt').unbind('chooseChanged');
        $(headerId + 'btnFetch').unbind('click');
        $(headerId + 'btnTaken').unbind('click');
        //$(options.container).unbind('resize');
        $(headerId + 'gilCompCode').unbind('selectedIndexChanged');
        $(headerId + 'btnCancel').off('click');
        /*
        $(headerId + 'btnOK').unbind('click', btnOKClick);
        $(headerId + 'btnExit').unbind('click'); */
    };
    function getAllCompany(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (!$.isEmptyObject(options.initData.CompCode)) {
            if ($.isFunction(action)) { action() };
            return;
        };
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName));

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetCompCode',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            if (tmp.Table.rows.length == 0) {
                                messageBox(options.language.NoneComp, messageType.critical);
                                return;
                            };                            
                            $(headerId + 'gilCompCode').csList('source', tmp.Table.rows);
                            delete tmp;
                            tmp = null;
                            if ($.isFunction(action)) { action() };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            
                        };
                    } catch (err) {
                        errorHandle(formName, 'getAllCompany-Server', err);
                     
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
            errorHandle(formName, 'getAllCompany', err);
        } finally {

        };
    };
    function chkAuthority(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if ($.isFunction(action)) {
            action();
            return;
        };
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { Mid: { type: 'string', value: options.sysProgramId } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkAuthority',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            if ($.isFunction(action)) { action() };
                        }
                        else {                            
                            addHandler(div);
                            messageBox(data.ErrorMessage, messageType.critical);
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
            errorHandle(formName, 'ChkAuthority', err);
        } finally {

        };
    };
    function refreshUI(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            unHandler(div);
            getAllCompany(div,
                function () {
                    chkAuthority(div, function () {

                    })
                });
        } catch (err) {
            addHandler(div);
            errorHandle(formName, 'refreshUI', err);
        } finally {

        };
    }
    function chkCompSelected(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        //if ($.isFunction(act)) { act(true) };        
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { Mid: { type: 'string', value: 'SO3279' } });

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
    function chkPriv(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {            
                        
            var parameters = $.extend({}, copyLoginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'CanEdit',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if (d.ResultBoolean) {
                        if ($.isFunction(act)) {
                            //action([d.ResultBoolean, d.ErrorMessage]);
                            act();
                        };
                    } else {
                        messageBox(d.ErrorMessage, messageType.critical);
                        $(options.container).csWindow('close');
                    };                   
                }
            });

        }
        catch (err) {
            errorHandle('SO3279A', 'canEdit', err)
        } finally {
        };
    };
    function canEdit(data, action) {
        try {
            var loginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });            

            var parameters = $.extend(true, {}, loginInfo);
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
            errorHandle('SO3279A', 'canEdit', err)
        } finally {         
        };

    };
    function gilCompSelected(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var currentComp = copyLoginInfo.loginInfo.value.rows[0].compcode;        
        copyLoginInfo.loginInfo.value.rows[0].compcode = $(this).csList('codeNo');
        options.loginInfo.loginInfo.rows[0].compcode = $(this).csList('codeNo');
        unHandler(event.data);
        chkCompSelected(event.data, function (r) {
            if (r) {
                refreshUI(event.data);
                $(headerId + "gilCompCode").csList('disabled', false);
                addHandler(event.data);
                //$(this).csList('disabled', false);
            } else {
                copyLoginInfo.loginInfo.value.rows[0].compcode = currentComp;
                options.loginInfo.loginInfo.rows[0].compcode = currentComp;
                unHandler(event.data);
                $(headerId + "gilCompCode").csList('codeNo', currentComp);
                //$(this).csList('codeNo', currentComp);                
                addHandler(event.data);
            };
        })


    };
    function isDataOK(div, cmdType) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var applyType = -1;
        applyType = $(headerId + 'CmbApplyType').jqxDropDownList('selectedIndex');
        if ($(headerId + 'gilCompCode').csList('codeNo') == '') {
            messageBox(options.language.mustChooseComp, messageType.critical, null, function (flag) {
                $(headerId + 'gilCompCode').csList('focus');
            });            
            return false;
        };
        if (cmdType == 1) {
            switch (applyType) {
                case 0:
                    if ($(headerId + 'gilBank').csList('codeNo') == '') {
                        messageBox(options.language.mustBankId, messageType.critical, null, function (flag) {
                            $(headerId + 'gilBank').csList('focus');
                        });
                        return false;
                    };
                    if ($(headerId + "gdaSendDate").csDateTime('getText') == null) {
                        messageBox(options.language.mustSendDate, messageType.critical, null, function (flag) {
                            $(headerId + 'gdaSendDate').csDateTime('focus');
                        });
                        return false;
                    };
                    if ($(headerId + 'gdaPropDate1').csDateTime('getText') == null) {
                        messageBox(options.language.mustPropDate1, messageType.critical, null, function (flag) {
                            $(headerId + 'gdaPropDate1').csDateTime('focus');
                        });
                        return false;
                    };
                    if ($(headerId + 'gdaPropDate2').csDateTime('getText') == null) {
                        messageBox(options.language.mustPropDate2, messageType.critical, null, function (flag) {
                            $(headerId + 'gdaPropDate2').csDateTime('focus');
                        });
                        return false;
                    };
                    break;
                case 1:
                    if ($(headerId + 'gdaStopDate1').csDateTime('getText') == null) {
                        messageBox(options.language.mustStopDate1, messageType.critical, null, function (flag) {
                            $(headerId + 'gdaStopDate1').csDateTime('focus');
                        });
                        return false;
                    };
                    if ($(headerId + 'gdaStopDate2').csDateTime('getText') == null) {
                        messageBox(options.language.mustStopDate2, messageType.critical, null, function (flag) {
                            $(headerId + 'gdaStopDate2').csDateTime('focus');
                        });
                        return false;
                    };
                    if ($(headerId + "gdaSendDate").csDateTime('getText') == null) {
                        messageBox(options.language.mustSendDate, messageType.critical, null, function (flag) {
                            $(headerId + 'gdaSendDate').csDateTime('focus');
                        });
                        return false;
                    };
                    break;
                };
        };
        
        if (cmdType == 2) {
            if ($(headerId + 'txtUploadField').csUploadFile('getFiles') == '') {
                messageBox(options.language.mustSelectFile, messageType.critical);
                return false;
            };
        };
        return true;
    };

    function prepareWhere() {        
        var dsCondition = {            
            Table: {
                columns: [{ name: 'BANKCODE', type: 'integer' },
                    { name: 'PROPDATE1', type: 'string' },
                    { name: 'PROPDATE2', type: 'string' },
                    { name: 'STOPDATE1', type: 'string' },
                    { name: 'STOPDATE2', type: 'string' },
                    { name:'SENDDATE',type:'string'},
                    { name: 'APPLYTYPE', type: 'integer' },
                    { name: 'ACHTNO', type: 'string' },
                    { name: 'INACHTNO', type: 'string' },
                    { name: 'INACHDESC', type:'string'},
                    { name: 'BILLHEADFMT', type: 'string' },
                ],
                rows: [{
                    BANKCODE: null,
                    PROPDATE1: null,
                    PROPDATE2: null,
                    STOPDATE1: null,
                    STOPDATE2: null,
                    SENDDATE:null,
                    APPLYTYPE: null,
                    ACHTNO: null,
                    INACHTNO: null,
                    INACHDESC:null,
                    BILLHEADFMT:null
                }]
            }
        };
        return dsCondition;
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'gimBillHeadFmt').unbind('chooseChanged');
            $(headerId + 'gimBillHeadFmt').bind('chooseChanged', div, gimBillHeadFmtChanged);
            $(headerId + 'btnFetch').unbind('click');
            $(headerId + 'btnFetch').bind('click', div, btnFetchClick);
            $(options.container).unbind('resize');
            $(options.container).on('resize', function () {
                $(headerId + 'txtUploadField').csUploadFile('resize', { width: $(headerId + 'uploadContainer').width() });
            });
            $(headerId + 'btnTaken').unbind('click');
            $(headerId + 'btnTaken').bind('click', div, btnTakenClick);
            $(headerId + 'gilCompCode').unbind('selectedIndexChanged');
            $(headerId + 'gilCompCode').on('selectedIndexChanged', div, gilCompSelected);
            $(headerId + 'btnCancel').off('click');
            $(headerId + 'btnCancel').on('click', function () {
                $(options['container']).csWindow('close');
            });
            /*
            $(headerId + 'btnOK').unbind('click');
            $(headerId + 'btnOK').bind('click', div, btnOKClick);
            $(headerId + 'btnExit').unbind('click');
            $(headerId + 'btnExit').bind('click', function () {
                if ($(this).jqxButton('disabled')) { return; };
                if (options.containerIsWindow) {
                    $($.data(div, formName).options.container).csWindow('close');
                };
            }); */
            
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        }
    };
    function btnTakenClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if (!isDataOK(event.data, 2)) { return; };
        if ($(headerId + 'txtUploadField').csUploadFile('getFiles') == '') {
            messageBox(options.language.mustSelectFile, messageType.critical);
            return;
        };        
        $(headerId + 'txtUploadField').one('load', function (e, filename) {
            ImportTaken(event.data, filename, function () {
            });
        });
        $(headerId + 'txtUploadField').one('error', function (event, errmsg) {
            messageBox(errmsg, messageType.critical);            
        });
        $(headerId + 'txtUploadField').csUploadFile('uploadFiles');
    };
    function ImportTaken(div, fileName) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var ds = prepareData(div);
        try {
            var parameters = $.extend({}, copyLoginInfo,
               { TakenFileName: { type: 'string', value: fileName } },
               { dsCondition: { type: 'string', value: ds } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'FileReturn',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            messageBox(data.ResultXML, messageType.information, null, function (flag) {
                                if (data.DownloadFileName != null ) {
                                    $(headerId + 'downloadLink').removeProp('href');
                                    $(headerId + 'downloadLink').removeProp('download');
                                    $(headerId + 'downloadLink').prop('href', data.DownloadFileName);

                                    $(headerId + 'downloadLink').prop('download', '');

                                    $(headerId + 'btnDownload').click();
                                };
                                

                            });
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    } catch (err) {
                        errorHandle(formName, 'FetchData-Server', err);

                    } finally {
                        parameters = null;
                        params = null;
                        delete parameters;
                        delete params;
                    };
                }
            });

        } catch (err) {
            errorHandle(formName, 'FetchData', err);

        } finally {

        };
    };
    function prepareData(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');        
        var ds = prepareWhere();
        var strACHTNO = '';
        var strInACHTNO = '';
        var strInACHDesc = '';
        var strInBillHeadFmt = ''
        var aryInACHTNO = [];
        var aryInACHDesc = [];
        var aryInBillHeadFmt = [];
        if ($(headerId + 'gimBillHeadFmt').csMulti('getChooseList') == '') {
            $.each(options.initData.CD068.rows, function (i, row) {
                aryInACHTNO = "'" + row['ACHTNO'] + "'";
                aryInACHDesc = "'" + row['ACHTDESC'] + "'";
                aryInBillHeadFmt = "'" + row['BILLHEADFMT'] + "'";
            });
            strInACHTNO = aryInACHTNO.toString();
            strInACHDesc = aryInACHDesc.toString();
            strInBillHeadFmt = aryInBillHeadFmt.toString();
            strACHTNO = strInACHTNO.replace(/'/g, '');
            aryInACHDesc.length = 0;
            aryInACHTNO.length = 0;
            aryInBillHeadFmt.length = 0;
        } else {
            strInACHTNO = $(headerId + 'gimBillHeadFmt').csMulti('getChooseQuoteList');
            strInACHDesc = $(headerId + 'gimBillHeadFmt').csMulti('getChooseQuoteListName');
            aryInBillHeadFmt = $(headerId + 'gimBillHeadFmt').csMulti('getChooseItems');
            strACHTNO = $(headerId + 'gimBillHeadFmt').csMulti('getChooseList');
            $.each(aryInBillHeadFmt, function (index, value) {
                if (strInBillHeadFmt == '') {
                    strInBillHeadFmt = "'" + value['BILLHEADFMT'] + "'";
                } else { strInBillHeadFmt = strInBillHeadFmt + ",'" + value['BILLHEADFMT'] + "'"; }
            });
        };
        ds.Table.rows[0]['ACHTNO'] = strACHTNO;
        ds.Table.rows[0]['INACHTNO'] = strInACHTNO;
        ds.Table.rows[0]['INACHDESC'] = strInACHDesc;
        ds.Table.rows[0]['BILLHEADFMT'] = strInBillHeadFmt;
        ds.Table.rows[0]['APPLYTYPE'] = $(headerId + 'CmbApplyType').jqxDropDownList('selectedIndex');
        ds.Table.rows[0]['BANKCODE'] = $(headerId + 'gilBank').csList('codeNo');
        if ($(headerId + 'gdaPropDate1').csDateTime('getText') != null) {
            ds.Table.rows[0]['PROPDATE1'] = $(headerId + 'gdaPropDate1').csDateTime('getText').replace(/\D*/g, '');
        };
        if ($(headerId + 'gdaPropDate2').csDateTime('getText') != null) {
            ds.Table.rows[0]['PROPDATE2'] = $(headerId + 'gdaPropDate2').csDateTime('getText').replace(/\D*/g, '');
        };
        if ($(headerId + 'gdaStopDate1').csDateTime('getText') != null) {
            ds.Table.rows[0]['STOPDATE1'] = $(headerId + 'gdaStopDate1').csDateTime('getText').replace(/\D*/g, '');
        };
        if ($(headerId + 'gdaStopDate2').csDateTime('getText') != null) {
            ds.Table.rows[0]['STOPDATE2'] = $(headerId + 'gdaStopDate2').csDateTime('getText').replace(/\D*/g, '');
        };
        if ($(headerId + 'gdaSendDate').csDateTime('getText') != null) {
            ds.Table.rows[0]['SENDDATE'] = $(headerId + 'gdaSendDate').csDateTime('getText').replace(/\D*/g, '');
        };
        return ds;
        /*
        BANKCODE: null,
        PROPDATE1: null,
        PROPDATE2: null,
        STOPDATE1: null,
        STOPDATE2: null,
        APPLYTYPE: null,
        ACHTNO: null,
        INACHTNO: null,
        INACHDESC:null,
        BILLHEADFMT:null */
    };
    function btnFetchClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        var ds = prepareData(event.data);
        if (!isDataOK(event.data, 1)) { return;}
        try {
            var parameters = $.extend({}, copyLoginInfo,               
               { dsCondition: { type: 'string', value: ds } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'FetchData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            messageBox(data.ResultXML, messageType.information, null, function (flag) {
                                $(headerId + 'downloadLink').removeProp('href');
                                $(headerId + 'downloadLink').removeProp('download');
                                $(headerId + 'downloadLink').prop('href', data.DownloadFileName);

                                $(headerId + 'downloadLink').prop('download', '');

                                $(headerId + 'btnDownload').click();

                            });                          
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);                           
                        }
                    } catch (err) {
                        errorHandle(formName, 'FetchData-Server', err);
                       
                    } finally {
                        parameters = null;
                        params = null;
                        delete parameters;
                        delete params;
                    };
                }
            });

        } catch (err) {
            errorHandle(formName, 'FetchData', err);
            
        } finally {

        };
    };
    function gimBillHeadFmtChanged(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        var strCitem = [];
        var length = 0;
        
        var selectCode = [];
        var selectName = [];
        var pkName = [];
        billFmtName.length = 0;
        billFmtName = [];
        selectCode = $(headerId + 'gimBillHeadFmt').csMulti('getChooseList').split(',');
        selectName = $(headerId + 'gimBillHeadFmt').csMulti('getChooseListName').split(',')
        length = selectCode.length;
        for (var i = 0; i < length; i++) {
            pkName.push(selectCode[i] + selectName[i]);
        };

        length = options.initData.BillHeadFmt.rows.length;
        
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < pkName.length; j++) {
                if (options.initData.BillHeadFmt.rows[i]['CODENO'] + options.initData.BillHeadFmt.rows[i]['DESCRIPTION'] == pkName[j]) {
                    billFmtName.push(options.initData.BillHeadFmt.rows[i]['BILLHEADFMT']);
                };
            };
        };
        
        length = options.initData.CD068A.rows.length;
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < billFmtName.length; j++) {
                if (options.initData.CD068A.rows[i]['BillHeadFmt'.toUpperCase()] == billFmtName[j]) {
                    strCitem.push(options.initData.CD068A.rows[i]['CitemCode'.toUpperCase()])
                }
            };
        };
        $(headerId + 'gimCitemCode').csMulti('setDisplayValue', strCitem.toString());        
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
                            if ($(options.container).attr('class').indexOf('jqx-window') != undefined) {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    options.containerIsWindow = true;
                                    var csw = $.data(div, formName).options.container;
                                    csw.on("winClosing", function () {
                                        csw.csWindow('close');
                                    });
                                };
                            };
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
                            if ($(options.container).attr('class').indexOf('jqx-window') != undefined) {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    options.containerIsWindow = true;
                                    var csw = $.data(div, formName).options.container;
                                    csw.on("winClosing", function () {                                       
                                        csw.csWindow('close');
                                    });
                                };
                            };
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
            
            
            options.isSaved = false;
            changeLanguage(div);
            renderControl(div);
            chkPriv(div, function () {
                queryAllData(div, function () {
                    addHandler(div);
                    $(div).triggerHandler('loaded', [this, options]);
                });
            });
          
            /*
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
                                $(headerId + 'gilCompCode').csList('source', options.initData.CompCode.rows);
                                $(headerId + 'gilCompCode').csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                                $(headerId + 'gilBank').csList('source', options.initData.BankId.rows);
                                $(headerId + 'gimBillHeadFmt').csMulti('source', options.initData.BillHeadFmt.rows);
                                $(headerId + 'gimCitemCode').csMulti('source',options.initData.CitemCode.rows);
                                //$(headerId + 'csDefCMCode').csList('codeNo', 0);
                                
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
    function formClosed(div) {

        var options = $.data(div, formName).options;
        if (options['closed']) {
            //options['closed'](options.returnValue);
        };
        $(options['container']).csWindow('close');
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

    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var idArray = $('*[id^=' + $(div).prop('id') + ']')
        try {
            idArray.each(function (index, value) {
                var idStr = $(value).attr('id');
                if (idStr.indexOf('gimCitemCode') >= 0) { return };
                if (idStr.indexOf('gimBillHeadFmt') >= 0) { return };                
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