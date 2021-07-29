(function ($) {
    var formName = 'SO1300J';
    var riadllName = 'CableSoft.SO.RIA.Building.Web.dll';
    var riaClassName = ' CableSoft.SO.RIA.Building.Web.dsBuilding';
    var copyLoginInfo = {};
    var SO017TableName = 'SO017';
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
        resize: function (jq, params) {
            return jq.each(function () {
                formResize(this, params);
            });
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
                            options: $.extend({}, new defaults(), new SO1300J(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1300J_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1300J', err);
        }
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        
        var headerId = '#' + $(div).prop('id');
        try {
            //-----------------------------------------------------------------------------
            $(headerId + "csServiceType").csList({
                source: null,
                codeNoWidth: 50,
                width: 220,
                height: 25,
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
            controls.push({ name: 'csServiceType', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId +"csMainCustID").csList({
                source: null,
                codeNoWidth: 50,
                width: 160,
                height: 22,
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
            controls.push({ name: 'csMainCustID', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "csCitemCode").csList({
                source: null,
                codeNoWidth: 50,
                width: 270,
                height: 22,
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
            controls.push({ name: 'csCitemCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "csSignEn").csList({
                source: null,
                codeNoWidth: 80,
                width: 270,
                height: 22,
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
            controls.push({ name: 'csSignEn', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "csGroupCode").csList({
                source: null,
                codeNoWidth: 60,
                width: '200px',
                height: 22,
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
            controls.push({ name: 'csGroupCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "csWorkEn1").csList({
                source: null,
                codeNoWidth: 60,
                width: '200px',
                height: 22,
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
            controls.push({ name: 'csWorkEn1', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "csWorkEn2").csList({
                source: null,
                codeNoWidth: 60,
                width: '200px',
                height: 22,
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
            controls.push({ name: 'csWorkEn2', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'txtFlag').jqxInput({
                width: 50,
                height: 22,
                disabled : true
            });
            controls.push({ name: 'txtFlag', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'grp1').jqxExpander({
                width: '100%',
                height: '100%',
                toggleMode: 'none',
                showArrow: false
            });
            controls.push({ name: 'grp1', type: 'jqxExpander', level: 1 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'grp2').jqxExpander({
                width: '100%',
                height: '100%',
                toggleMode: 'none',
                showArrow: false
            });
            controls.push({ name: 'grp2', type: 'jqxExpander', level: 1 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'grp3').jqxExpander({
                width: '100%',
                height: '100%',
                toggleMode: 'none',
                showArrow: false
            });
            controls.push({ name: 'grp3', type: 'jqxExpander', level: 1 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'txtPeriod').jqxMaskedInput({
                width: '87%',
                height: '22px',
                promptChar: '',
                textAlign: 'right',
                mask: '[1-9][0-9][0-9]'
            });
            controls.push({ name: 'txtPeriod', type: 'jqxMaskedInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "txtAmount").jqxNumberInput({
                width: '95%',
                height: 22,
                inputMode: 'simple',
                min: -99999999,
                max: 99999999,
                decimalDigits: 0,
                disabled: false,
            });
            controls.push({ name: 'txtAmount', type: 'jqxNumberInput', level: 2 });
            $(headerId + "txtAmount").val(null);
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteStartDate").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                height: 22,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteStartDate', type: 'csDateTime', level: 2 });            
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteStopDate").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                height: 22,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteStopDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteClctDate").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                height: 22,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteClctDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "txtFinTime").csDateTime({
                formatString: 'yyyy/MM/dd HH:mm',
                value: null,
                height: 22,
                showCalendarButton: false,
                width: '190px'
            });
            controls.push({ name: 'txtFinTime', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'ccCustStatus').csMulti({
                buttonText: lang.ccCustStatus,
                //width: 500,
                width :$(headerId + 'ccCustStatusContainer').width(),
                buttonWidth: 80,
                isReadOnly: false                
            });
            controls.push({ name: 'ccCustStatus', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'ccCustClass').csMulti({
                buttonText: lang.ccCustClass,
                //width: '104%',
                width:$(headerId + 'ccCustClassContainer').width(),
                buttonWidth: 80,
                isReadOnly: false,
            });
            controls.push({ name: 'ccCustClass', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'ccCitemCode').csMulti({
                buttonText: lang.ccCitemCode,
                //width: 500,
                width:$(headerId + 'csCitemCodeContainer').width(),
                buttonWidth: 80,
                isReadOnly: false,
            });
            controls.push({ name: 'ccCitemCode', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "chkOption1").jqxCheckBox({
                width: '100%',
                height: 22,
                checked: true
            });
            controls.push({ name: 'chkOption1', type: 'jqxCheckBox', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "chkOption2").jqxCheckBox({
                width: '100%',
                height: 22,
                checked: true,
            });
            controls.push({ name: 'chkOption2', type: 'jqxCheckBox', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'pnl').jqxPanel({
                width: 600,
                height: 70,
                autoUpdate: true
            });
            controls.push({ name: 'pnl', type: 'jqxPanel', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 70,
                height: 25,
                imgSrc: imageScr.ok.imgSrc
            }));
            controls.push({ name: 'btnOK', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                width: 70,
                height: 25,
                imgSrc: imageScr.cancel.imgSrc
            }));
            controls.push({ name: 'btnCancel', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------         
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {
           
            if (options.containerIsWindow) {
                $(options.container[0]).resize();
            };
            $(this).resize();
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
                        var o = $('#' + $(div).prop('id') + controls[i].name);
                        if (o.length > 0) {
                            $(o[0]).off();
                            $(o[0])[controls[i].type]('destroy');
                        }
                    };
                };
            };
            deleteJSONObject(options);
            $(div).children().remove();
            /*
            $.data(div, formName).options.language = null;
            delete $.data(div, formName).options.language;
            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults;           
            $(div).children().remove(); */


        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        };
    };
    function unHandler(div, action) {
        var headerId = '#' + $(div).attr('id');
        var options = $.data(div, formName).options;
        
        $(headerId + 'csServiceType').unbind('selectedIndexChanged');
        if (options.containerIsWindow) {
            $(options.container).unbind('resized');
        };
        $(headerId + 'dteStartDate').off('focusout');
        $(headerId + 'txtPeriod').off('change');
        $(headerId + 'btnOK').off('click');
        $(headerId + 'btnCancel').off('click');
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'csServiceType').unbind('selectedIndexChanged');
            $(headerId + 'csServiceType').on('selectedIndexChanged', function () {
                serviceTypeChanged(div, function () {                   
                })
            });
            $(headerId + 'dteStartDate').off('focusout');
            $(headerId + 'dteStartDate').bind('focusout', function () { express_DateField(div); });
            $(headerId + 'txtPeriod').off('change');
            $(headerId + 'txtPeriod').on('change', function () { express_DateField(div); });
            $(headerId + 'btnOK').off('click');
            $(headerId + 'btnOK').bind('click', div, btnOKClicked);
           
            if (options.containerIsWindow) {
                $(options.container).unbind('resized');

                $(options.container).on('resized', function () {
                    $(headerId + 'ccCustStatus').csMulti('resize');
                    $(headerId + 'ccCustClass').csMulti('resize');
                    $(headerId + 'ccCitemCode').csMulti('resize');
                });
            };
            $(headerId + 'btnCancel').off('click');
            $(headerId + 'btnCancel').on('click', function () {
                if (options.containerIsWindow) {
                    $(options['container']).csWindow('close');
                };
            });
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        }
    };
    function isDataOK(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        if ($(headerId + 'chkOption1').jqxCheckBox('checked')) {
            if ($(headerId + 'txtFinTime').csDateTime('val') == null) {
                messageBox(options.language.FinTimeMustbe, messageType.critical, null, function (flag) {
                    $(headerId + 'txtFinTime').focus();
                    return false;
                });
                return false;
            };
            if ($(headerId + 'csWorkEn1').csList('codeNo') == '') {
                messageBox(options.language.WorkEn1Mustbe, messageType.critical, null, function (flag) {
                    $(headerId + 'csWorkEn1').csList('focus');
                    return false;
                });
                return false;
            };
            if ($(headerId + 'csSignEn').csList('codeNo') == '') {
                messageBox(options.language.SignEnAMustbe, messageType.critical, null, function (flag) {
                    $(headerId + 'csSignEn').csList('focus');
                    return false;
                });
                return false;
            };
        };
        if ($(headerId + 'chkOption2').jqxCheckBox('checked') ) {
            if ($(headerId + 'csSignEn').csList('codeNo') == '') {
                messageBox(options.language.SignEnBMustbe, messageType.critical, null, function (flag) {
                    $(headerId + 'csSignEn').csList('focus');
                    return false;
                });
                return false;
            };
        }
        return true;
    };
    function btnOKClicked(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if ($(this).jqxButton('disabled')) { return; };
        try {
            var strClass = '';
            var strStatus = '';
            var FinTime = '';
            var chkOpt1 = 0;
            var chkOpt2 = 0;
            var startDate = '';
            var stopDate = '';
            var clctDate = '';
            if (!isDataOK(event.data)) { return; };
            if ($(headerId + 'ccCustClass').csMulti('getChooseList') != '') {
                if ($(headerId + 'ccCustClass').csMulti('getChooseList').indexOf(',') > 0) {
                    strClass = 'IN (' + $(headerId + 'ccCustClass').csMulti('getChooseList') + ')';
                } else {
                    strClass = '= ' + $(headerId + 'ccCustClass').csMulti('getChooseList');
                };
            };
            if ($(headerId + 'ccCustStatus').csMulti('getChooseList') != '') {
                if ($(headerId + 'ccCustStatus').csMulti('getChooseList').indexOf(',') > 0) {
                    strStatus = 'IN (' + $(headerId + 'ccCustStatus').csMulti('getChooseList') + ')';
                } else {
                    strStatus = '= ' + $(headerId + 'ccCustStatus').csMulti('getChooseList');
                };
            };
            if ($(headerId + 'txtFinTime').csDateTime('val') != null) {                
                FinTime = $(headerId + 'txtFinTime').csDateTime('val').replace(/\/| |:/g, '');                
            };
            if ($(headerId + 'chkOption1').jqxCheckBox('checked')) { chkOpt1 = 1 };
            if ($(headerId + 'chkOption2').jqxCheckBox('checked')) { chkOpt2 = 1 };
            var citemCode = -1;
            var citemDescription = '';
            if ($(headerId + 'csCitemCode').csList('codeNo') != '') {
                citemCode = parseInt($(headerId + 'csCitemCode').csList('codeNo'));
                citemDescription = $(headerId + 'csCitemCode').csList('description');
            };
            if ($(headerId + 'dteStartDate').csDateTime('getText') != null) { startDate = $(headerId + 'dteStartDate').csDateTime('val').replace(/\/| |:/g, '') }
            if ($(headerId + 'dteStopDate').csDateTime('getText') != null) { stopDate = $(headerId + 'dteStopDate').csDateTime('val').replace(/\/| |:/g, '') }
            if ($(headerId + 'dteClctDate').csDateTime('getText') != null) { clctDate = $(headerId + 'dteClctDate').csDateTime('val').replace(/\/| |:/g, '') }
            try {

                var parameters = $.extend({}, copyLoginInfo,
                   { MduID: { type: 'string', value: options.parameters[SO017TableName].rows[0]['MDUID'] }},
                   { ClassSQL: { type: 'string', strClass } },
                   { StatusSQL: { type: 'string', strStatus} },
                   { CitemCode: { type: 'integer', value: citemCode } },
                   { CitemName: { type: 'string', value: citemDescription } },
                   { Period: { type: 'integer', value:parseInt( $(headerId + 'txtPeriod').jqxMaskedInput('value') )} },
                   { Amount: { type: 'integer', value: parseInt( $(headerId + 'txtAmount').val()) } },
                   { StartDate: { type: 'string', value: startDate } },
                   { StopDate: { type: 'string', value: stopDate } },
                   { ClctDate: { type: 'string', value: clctDate } },
                   { MainCustId: { type: 'integer', value: parseInt(options.parameters[SO017TableName].rows[0]['MAINCUSTID']) } },
                   { Option1: { type: 'integer', value: chkOpt1 } },
                   { FinTime: { type: 'string', value: FinTime } },
                   { GroupCode: { type: 'string', value: $(headerId + 'csGroupCode').csList('codeNo') } },
                   { GroupName: { type: 'string', value: $(headerId + 'csGroupCode').csList('description') } },
                   { WorkerEn1: { type: 'string', value: $(headerId + 'csWorkEn1').csList('codeNo') } },
                   { WorkerName1: { type: 'string', value: $(headerId + 'csWorkEn1').csList('description') } },
                   { WorkerEn2: { type: 'string', value: $(headerId + 'csWorkEn2').csList('codeNo') } },
                   { WorkerName2: { type: 'string', value: $(headerId + 'csWorkEn2').csList('description') } },
                   { SignEn: { type: 'string', value: $(headerId + 'csSignEn').csList('codeNo') } },
                   { SignName: { type: 'string', value: $(headerId + 'csSignEn').csList('description') } },
                   { Option2: { type: 'integer', value: chkOpt2 } },
                   { UserId: { type: 'string', value: options.loginInfo.loginInfo.rows[0].entryid } },
                   { UserName: { type: 'string', value: options.loginInfo.loginInfo.rows[0].entryname } },
                   { ServiceType: { type: 'string', value: $(headerId + 'csServiceType').csList('codeNo') } },
                   { CompCode: { type: 'integer', value: options.loginInfo.loginInfo.rows[0].compcode } }
                   );

                var params = getParameters(riadllName,
                       riaClassName,
                       'Go_SF_MDUTOMAIN',
                       JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        try {
                            if (data.ErrorCode == 0) {                               
                                if (data.ResultXML != '' && data.ResultXML != null) {
                                    messageBox(data.ResultXML, messageType.critical);
                                } else {
                                    messageBox(options.language.AdjectSuccess, messageType.critical);
                                };
                            }
                            else {
                                messageBox(data.ErrorMessage, messageType.critical);
                            };

                        } catch (err) {
                            errorHandle(formName, 'serviceTypeChanged-Server', err);
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
                errorHandle(formName, 'serviceTypeChanged', err);

            } finally {
                //if ($.isFunction(action)) { action(); };
            };
        } catch (err) {
            errorHandle(formName, 'btnOKClicked', err);
        }
    };
    function express_DateField(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        if ($(headerId + 'dteStartDate').csDateTime('val') == null) {
            $(headerId + 'dteStopDate').csDateTime('val', null);
            $(headerId + 'dteClctDate').csDateTime('val', null);
        } else {
            
                if ($(headerId + 'txtPeriod').jqxMaskedInput('value') != null) {
                    var d = $(headerId + 'dteStartDate').csDateTime('getDate');
                    d.setMonth(d.getMonth() + parseInt($(headerId + 'txtPeriod').jqxMaskedInput('value')));
                    $(headerId + 'dteClctDate').csDateTime('setDate', d);
                    d.setDate(d.getDate() - 1);
                    $(headerId + 'dteStopDate').csDateTime('setDate', d);                                          
                };                            
        };
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            copyLoginInfo = getParaLoginInfo(div, formName);
            $.ajax({
                url: 'SO1000\\' + formName + '.html',
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
            });
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            changeLanguage(div);
            renderControl(div);
            if ($.isEmptyObject(options.parameters)) {
                messageBox(options.language.NoInData, messageType.critical);
                return;
            };
            if (options.parameters[SO017TableName] == undefined) {
                messageBox(options.language.NoInData, messageType.critical);
                return;
            };
            if (options.parameters[SO017TableName].rows.length == 0) {
                messageBox(options.language.NoDataByConditionGrid, messageType.critical);
                return;
            };
            Load_Codes_J(div, function () {
                load_data(div, function () {
                    serviceTypeChanged(div, function () {
                        addHandler(div);
                    });
                });
            });
        } catch (err) {
            errorHandle(formName, 'initData', err);

        } finally {
            if ($.isFunction(action)) { action(); };
        }
    };
    function serviceTypeChanged(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if ($(headerId + 'csServiceType').csList('codeNo') == '') { return; };
        try {
           
            var parameters = $.extend({}, copyLoginInfo,
               { ServiceType: { type: 'string', value: $(headerId + 'csServiceType').csList('codeNo') } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'Query_CD019_MDUMain',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var d = JSON.parse(data.ResultXML);
                            $(headerId + 'ccCitemCode').csMulti('source', d.Table.rows);
                            $(headerId + 'csCitemCode').csList('source', d.Table.rows);

                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };

                    } catch (err) {
                        errorHandle(formName, 'serviceTypeChanged-Server', err);
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
            errorHandle(formName, 'serviceTypeChanged', err);

        } finally {
            //if ($.isFunction(action)) { action(); };
        };
    };
    function Load_Codes_J(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {

            var parameters = $.extend({}, copyLoginInfo);

            var params = getParameters(riadllName,
                   riaClassName,
                   'Load_Codes_J',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var d = JSON.parse(data.ResultXML);
                            delete options.initData;
                            options.initData = null;
                            options.initData = {};
                            $.extend(true, options.initData, d);

                            $(headerId + 'csServiceType').csList('source', d.Query_CD046.rows);
                            $(headerId + 'ccCustStatus').csMulti('source', d.Query_CD035.rows);
                            $(headerId + 'ccCustClass').csMulti('source', d.Query_CD004.rows);
                            $(headerId + 'csGroupCode').csList('source', d.Query_CD003.rows);
                            $(headerId + 'csWorkEn1').csList('source', d.Query_CSignEn.rows);
                            $(headerId + 'csWorkEn2').csList('source', d.Query_CSignEn.rows);
                            $(headerId + 'csSignEn').csList('source', d.Query_CSignEn.rows);
                            
                            delete d;
                            d = null;
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };

                    } catch (err) {
                        errorHandle(formName, 'Load_Codes_J-Server', err);
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
            errorHandle(formName, 'Load_Codes_J', err);

        } finally {

        }
    };
    function load_data(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            $(headerId + 'csServiceType').csList('codeNo', 'C');
            $(headerId + 'csMainCustID').csList('setDisplayValue',
                  {
                      CODENO: options.parameters[SO017TableName].rows[0]['MAINCUSTID'],
                      DESCRIPTION: options.parameters[SO017TableName].rows[0]['MAINCUSTNAME']
                  });
            $(headerId + 'txtFlag').val(options.parameters[SO017TableName].rows[0]['FLAG']);
            $(headerId + 'txtPeriod').jqxMaskedInput('value', options.parameters[SO017TableName].rows[0]['BCPERIOD']);
            $(headerId + 'txtAmount').val(options.parameters[SO017TableName].rows[0]['BCAMOUNT']);
            $(headerId + 'ccCustStatus').csMulti('source', options.initData['Query_CD035'].rows);
            var statusCode = '1';
            switch (options.parameters[SO017TableName].rows[0]['FLAG']) {
                case (options.language.FaciCancel): 
                    statusCode = '2';
                    break;
                
                case (options.language.FaciPR): 
                    statusCode = '3';
                    break;
                
                case (options.language.FaciStop): 
                    statusCode = '4';
                    break;
                
                case (options.language.FaciProm): 
                    statusCode = '5';
                    break;
                
                case (options.language.FaciPR2):
                    statusCode = '6';
                    break;
                
            };
            $(headerId + 'ccCustStatus').csMulti('setDisplayValue', statusCode);
            $(headerId + 'ccCustClass').csMulti('source', options.initData['Query_CD004'].rows);
            if (options.parameters[SO017TableName].rows[0]['CLASSCODE'] != undefined) {
                if (options.parameters[SO017TableName].rows[0]['CLASSCODE'] != null) {
                    $(headerId + 'ccCustClass').csMulti('setDisplayValue', options.parameters[SO017TableName].rows[0]['CLASSCODE'].toString());
                };
            };
            
            if ($.isFunction(action)) { action(); };
        } catch (err) {
            errorHandle(formName, 'load_data', err);
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
    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var msg = "";
            for (var i = 0; i < controls.length; i++) {
                var o = $('#' + controls[i].name);
                o.each(function () {
                    $(this)[controls[i].type]('resize');
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var idArray = $('*[id^=' + $(div).prop('id') + ']')
        try {
            idArray.each(function (index, value) {
                var idStr = $(value).attr('id');

                if (idStr.indexOf('ccCustStatus') >= 0) { return };
                if (idStr.indexOf('ccCustClass') >= 0) { return };
                if (idStr.indexOf('ccCitemCode') >= 0) { return };
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
        };
    };
})(jQuery);