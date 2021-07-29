(function ($) {
    var formName = 'SO1300K';
    var riadllName = 'CableSoft.SO.RIA.Building.Web.dll';
    var riaClassName = ' CableSoft.SO.RIA.Building.Web.dsBuilding';
    var copyLoginInfo = {};
    var SO017TableName = 'SO017';
    var buildingTableName = 'building'
    var Query_CD004TableName = 'Query_CD004';
    var iSec_1Loaded = false;
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
        resize: function (jq, params) {
            return jq.each(function () {
                formResize(this, params);
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
                            options: $.extend({}, new defaults(), new SO1300K(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1300K_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1300K', err);
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
                width: '220px',
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
            controls.push({ name: 'csServiceType', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId +"csMainCustID").csList({
                source: null,
                codeNoWidth: 50,
                width: '220px',
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
            controls.push({ name: 'csMainCustID', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "csCitemCode1").csList({
                source: null,
                codeNoWidth: 50,
                width: '240px',
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
            controls.push({ name: 'csCitemCode1', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "csCitemCode2").csList({
                source: null,
                codeNoWidth: 50,
                width: '240px',
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
            controls.push({ name: 'csCitemCode2', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "csCitemCode3").csList({
                source: null,
                codeNoWidth: 50,
                width: '240px',
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
            controls.push({ name: 'csCitemCode3', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "csCitemCode4").csList({
                source: null,
                codeNoWidth: 50,
                width: '240px',
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
            controls.push({ name: 'csCitemCode4', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'grbWhere').jqxExpander({
                width: '100%',
                height: '100%',
                toggleMode: 'none',
                showArrow: false
            });
            controls.push({ name: 'grbWhere', type: 'jqxExpander', level: 1 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'grbWhere2').jqxExpander({
                width: '100%',
                height: '100%',
                toggleMode: 'none',
                showArrow: false
            });
            controls.push({ name: 'grbWhere2', type: 'jqxExpander', level: 1 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'txtFlag').jqxInput({
                width: 50,
                height: 22,
                disabled: true
            });
            controls.push({ name: 'txtFlag', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'ccCustStatus').csMulti({
                //     source: data2,
                buttonText: lang.ccCustStatus,
                width: '99.5%',
                buttonWidth: 80,
                //widthDesc: 150,                                
                isReadOnly: false,
            });
            controls.push({ name: 'ccCustStatus', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'ccCustClass').csMulti({
                //     source: data2,
                buttonText: lang.ccCustClass,
                width: '99.5%',
                buttonWidth: 80,
                //widthDesc: 150,                                
                isReadOnly: false,
            });
            controls.push({ name: 'ccCustClass', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'txtPeriod1').jqxMaskedInput({
                width: '95%',
                height: '25px',
                promptChar: '',
                textAlign: 'right',
                mask: '[1-9][0-9][0-9]'
            });
            controls.push({ name: 'txtPeriod1', type: 'jqxMaskedInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'txtPeriod2').jqxMaskedInput({
                width: '95%',
                height: '25px',
                promptChar: '',
                textAlign: 'right',
                mask: '[1-9][0-9][0-9]'
            });
            controls.push({ name: 'txtPeriod2', type: 'jqxMaskedInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'txtPeriod3').jqxMaskedInput({
                width: '95%',
                height: '25px',
                promptChar: '',
                textAlign: 'right',
                mask: '[1-9][0-9][0-9]'
            });
            controls.push({ name: 'txtPeriod3', type: 'jqxMaskedInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'txtPeriod4').jqxMaskedInput({
                width: '95%',
                height: '25px',
                promptChar: '',
                textAlign: 'right',
                mask: '[1-9][0-9][0-9]'
            });
            controls.push({ name: 'txtPeriod4', type: 'jqxMaskedInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "txtAmount1").jqxNumberInput({
                width: '95%',
                height: 25,
                inputMode: 'simple',
                min: -99999999,
                max: 99999999,
                decimalDigits: 0,
                disabled: false,
            });
            controls.push({ name: 'txtAmount1', type: 'jqxNumberInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "txtAmount2").jqxNumberInput({
                width: '95%',
                height: 25,
                inputMode: 'simple',
                min: -99999999,
                max: 99999999,
                decimalDigits: 0,
                disabled: false,
            });
            controls.push({ name: 'txtAmount2', type: 'jqxNumberInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "txtAmount3").jqxNumberInput({
                width: '95%',
                height: 25,
                inputMode: 'simple',
                min: -99999999,
                max: 99999999,
                decimalDigits: 0,
                disabled: false,
            });
            controls.push({ name: 'txtAmount3', type: 'jqxNumberInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "txtAmount4").jqxNumberInput({
                width: '95%',
                height: 25,
                inputMode: 'simple',
                min: -99999999,
                max: 99999999,
                decimalDigits: 0,
                disabled: false,
            });
            controls.push({ name: 'txtAmount4', type: 'jqxNumberInput', level: 2 });
            //-----------------------------------------------------------------------------
            $(headerId + "txtAmount1").val(null);
            $(headerId + "txtAmount2").val(null);
            $(headerId + "txtAmount3").val(null);
            $(headerId + "txtAmount4").val(null);
            //-----------------------------------------------------------------------------
            $(headerId + "dteStartDate1").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteStartDate1', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteStartDate2").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteStartDate2', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteStartDate3").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteStartDate3', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteStartDate4").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteStartDate4', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteStopDate1").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteStopDate1', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteStopDate2").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteStopDate2', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteStopDate3").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteStopDate3', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteStopDate4").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteStopDate4', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteClctDate1").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteClctDate1', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteClctDate2").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteClctDate2', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteClctDate3").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteClctDate3', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dteClctDate4").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                width: '90%'
            });
            controls.push({ name: 'dteClctDate4', type: 'csDateTime', level: 2 });
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

        }; 
    };
    function formDestroy(div) {
        try {

            var options = $.data(div, formName).options;
            var controls = $.data(div, formName).options.controls;
            var headerId = '#' + $(div).prop('id');
         
            unHandler(div);
            if (iSec_1Loaded) {
                $(headerId + 'iSec_1').dynamicGrid('destroy');
                iSec_1Loaded = false;
            };
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
            $(options.container).unbind('resize');
        };        
        $(headerId + 'btnOK').unbind('click');
        $(headerId + 'btnCancel').off('click');
        $(headerId + 'dteStartDate1').off('focusout');
        $(headerId + 'txtPeriod1').off('change');
        $(headerId + 'dteStartDate2').off('focusout');
        $(headerId + 'txtPeriod2').off('change');
        $(headerId + 'dteStartDate3').off('focusout');
        $(headerId + 'txtPeriod3').off('change');
        $(headerId + 'dteStartDate4').off('focusout');
        $(headerId + 'txtPeriod4').off('change');
    };
    function express_DateField(div,item, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        if ($(headerId + 'dteStartDate' + item).csDateTime('val') == null) {
            $(headerId + 'dteStopDate' + item).csDateTime('val', null);
            $(headerId + 'dteClctDate' + item).csDateTime('val', null);
            
        } else {

            if ($(headerId + 'txtPeriod' + item).jqxMaskedInput('value') != null) {
                var d = $(headerId + 'dteStartDate' + item).csDateTime('getDate');
                d.setMonth(d.getMonth() + parseInt($(headerId + 'txtPeriod' + item).jqxMaskedInput('value')));
                $(headerId + 'dteClctDate' + item).csDateTime('setDate', d);
                d.setDate(d.getDate() - 1);
                $(headerId + 'dteStopDate' + item).csDateTime('setDate', d);
            };
        };
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'csServiceType').unbind('selectedIndexChanged');
            $(headerId + 'csServiceType').on('selectedIndexChanged', function () {
                serviceTypeChanged(div, function () {
                    renderDynGrid(div);
                })
            });
            if (options.containerIsWindow) {
                $(options.container).unbind('resize');

                $(options.container).on('resize', function () {
                    $(headerId + 'ccCustStatus').csMulti('resize');
                    $(headerId + 'ccCustClass').csMulti('resize');
                    $(headerId + 'iSec_1').dynamicGrid('resize', { height: $(headerId + 'iSec_1').height });
                });
            };
            $(headerId + 'dteStartDate1').off('focusout');
            $(headerId + 'dteStartDate1').bind('focusout', function () { express_DateField(div,1); });

            $(headerId + 'txtPeriod1').off('change');
            $(headerId + 'txtPeriod1').on('change', function () { express_DateField(div, 1); });

            $(headerId + 'dteStartDate2').off('focusout');
            $(headerId + 'dteStartDate2').bind('focusout', function () { express_DateField(div, 2); });

            $(headerId + 'txtPeriod2').off('change');
            $(headerId + 'txtPeriod2').on('change', function () { express_DateField(div, 2); });

            $(headerId + 'dteStartDate3').off('focusout');
            $(headerId + 'dteStartDate3').bind('focusout', function () { express_DateField(div, 3); });

            $(headerId + 'txtPeriod3').off('change');
            $(headerId + 'txtPeriod3').on('change', function () { express_DateField(div, 3); });

            $(headerId + 'dteStartDate4').off('focusout');
            $(headerId + 'dteStartDate4').bind('focusout', function () { express_DateField(div, 4); });

            $(headerId + 'txtPeriod4').off('change');
            $(headerId + 'txtPeriod4').on('change', function () { express_DateField(div, 4); });
            $(headerId + 'btnOK').unbind('click');
            $(headerId + 'btnOK').bind('click', div, btnOKClicked);
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
    
    function btnOKClicked(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        var strClass = null;
        var strStatus = null;
        if ($(this).jqxButton('disabled')) { return };
        if ($(headerId + 'csServiceType').csList('codeNo') == '') { return; };
        if (!isDataOK(event.data)) { return; }
        var InDataSet = {
            Table: {
                columns: [{ name: 'CITEMCODE', type: 'string' },
                    { name: 'DESCRIPTION', type: 'string' },
                    { name: 'PERIOD', type: 'string' },
                    { name: 'AMOUNT', type: 'string' },
                    { name: 'STARTDATE', type: 'string' },
                    { name: 'STOPDATE', type: 'string' },
                    { name: 'CLCTDATE', type: 'string' },                    
                ],
                rows: []
            }
        };
        try {
            for (i = 1; i < 5; i++) {
                if ($(headerId + 'csCitemCode' + i).csList('codeNo') != '') {
                    if (!isDetailOK(event.data, i)) { return; };
                    var o = {
                        CITEMCODE: $(headerId + 'csCitemCode' + i).csList('codeNo'),
                        DESCRIPTION: $(headerId + 'csCitemCode' + i).csList('description'),
                        PERIOD: $(headerId + 'txtPeriod' + i).jqxMaskedInput('value'),
                        AMOUNT: $(headerId + 'txtAmount' + i).jqxNumberInput('val').toString(),
                        STARTDATE: $(headerId + 'dteStartDate' + i).csDateTime('val'),
                        STOPDATE: $(headerId + 'dteStopDate' + i).csDateTime('val'),
                        CLCTDATE: $(headerId + 'dteClctDate' + i).csDateTime('val'),
                    };
                    InDataSet.Table.rows.push(o);                    

                };
            };
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
            try {
                
                var parameters = $.extend({}, copyLoginInfo,
                    { InData: { type: 'string', value: InDataSet } },
                    { MduID: { type: 'string', value: options.parameters[SO017TableName].rows[0]['MDUID'] } },
                    { CustID: { type: 'string', value: options.parameters[SO017TableName].rows[0]['MAINCUSTID'] } },
                    { ClassSQL: { type: 'string', value: strClass} },
                    { StatusSQL: { type: 'string', value: strStatus } },
                   { ServiceType: { type: 'string', value: $(headerId + 'csServiceType').csList('codeNo') } })

                var params = getParameters(riadllName,
                       riaClassName,
                       'Go_SF_MDUTOSINGLE',
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
                            errorHandle(formName, 'Go_SF_MDUTOSINGLE-Server', err);
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
                errorHandle(formName, 'Go_SF_MDUTOSINGLE', err);

            } finally {
                //if ($.isFunction(action)) { action(); };
            };
        } catch (err) {
            errorHandle(formName, 'btnOKClicked', err);
        } finally {
            delete InDataSet;
            InDataSet = null;
        }
        
    };
    function isDetailOK(div, item) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');        
        if ($(headerId + 'txtPeriod' + item).jqxMaskedInput('value') == null) {
            messageBox(options.language.DoCitemCodeMustbe, messageType.critical);
            return false;
        };
        if ($(headerId + 'txtAmount' + item).jqxNumberInput('val') == null) {
            messageBox(options.language.DoCitemCodeMustbe, messageType.critical);
            return false;
        };
        if ($(headerId + 'dteStartDate' + item).csDateTime('val') == null) {
            messageBox(options.language.DoCitemCodeMustbe, messageType.critical);
            return false;
        };
        if ($(headerId + 'dteStopDate' + item).csDateTime('val') == null) {
            messageBox(options.language.DoCitemCodeMustbe, messageType.critical);
            return false;
        };
        if ($(headerId + 'dteClctDate' + item).csDateTime('val') == null) {
            messageBox(options.language.DoCitemCodeMustbe, messageType.critical);
            return false;
        };
        return true;
    };
    function isDataOK(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var result = false;
        if (!result) {
            if ($(headerId + 'csCitemCode1').csList('codeNo') != '') {result = true;};
        };
        if (!result) {
            if ($(headerId + 'csCitemCode2').csList('codeNo') != '') {result = true;};
        };
        if (!result) {
            if ($(headerId + 'csCitemCode3').csList('codeNo') != '') {result = true;};
        };
        if (!result) {
            if ($(headerId + 'csCitemCode4').csList('codeNo') != '') {result = true;};
        };
        if (!result) {
            messageBox(options.language.CitemCodeMustbe, messageType.critical);
            return false;
        } else {
            return true;
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
    function setDefaultValue(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        if ($.isEmptyObject(options.parameters)) {
            messageBox(options.language.NoInData, messageType.critical);
            return false;
        };
        if (options.parameters[SO017TableName] == undefined) {
            messageBox(options.language.NoInData, messageType.critical);
            return false;
        };
        if (options.parameters[SO017TableName].rows.length == 0) {
            messageBox(options.language.NoInData, messageType.critical);
            return false ;
        };
        if (options.parameters[SO017TableName].rows[0]['MAINCUSTID'] == null) {
            messageBox(options.language.SO1300K_Loaded_1, messageType.critical);
            return false;
        };
        if (options.parameters[SO017TableName].rows[0]['MAINCUSTID'] == '') {
            messageBox(options.language.SO1300K_Loaded_1, messageType.critical);
            return false;
        };
        $(headerId + 'csMainCustID').csList('setDisplayValue',
               {
                   CODENO: options.parameters[SO017TableName].rows[0]['MAINCUSTID'],
                   DESCRIPTION: options.parameters[SO017TableName].rows[0]['MAINCUSTNAME']
               });
        $(headerId + 'txtFlag').val(options.parameters[SO017TableName].rows[0]['FLAG']);
        if (options.parameters[Query_CD004TableName] != undefined) {
            if (options.parameters[Query_CD004TableName].rows.length > 0) {
                $(headerId + 'ccCustClass').csMulti('source', options.parameters[Query_CD004TableName].rows);
                if (options.parameters[SO017TableName].rows[0]['CLASSCODE'] != null) {
                    var classCode = options.parameters[SO017TableName].rows[0]['CLASSCODE'];
                    classCode = classCode.toString().replace(/'/g, '');
                    $(headerId + 'ccCustClass').csMulti('setDisplayValue', classCode);
                };
            };
        };
        return true;
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            changeLanguage(div);
            renderControl(div);
            if (!setDefaultValue(div)) { return; };
            load_data(div, function () {
                Query_CD035(div, function () {
                    serviceTypeChanged(div, function () {
                        renderDynGrid(div, function () {
                            addHandler(div);
                        });
                    });
                })
            });
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
    function renderDynGrid(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {

            if ($(headerId + 'csServiceType').csList('codeNo') == '') { return; };
            if (iSec_1Loaded) {               
                $(headerId + 'iSec_1').dynamicGrid('destroy');
                iSec_1Loaded = false;
            };
            var ds = { building: {} };
            $.extend(true, ds.building, options.parameters[buildingTableName]);
            ds.building.rows[0]['ServiceType'.toUpperCase()] = $(headerId + 'csServiceType').csList('codeNo');
            ds.building.rows[0]['CustId'.toUpperCase()] = options.parameters[SO017TableName].rows[0]['MAINCUSTID'];
           
            $(headerId + 'iSec_1').dynamicGrid({
                loginInfo: $.extend(true, {}, options.loginInfo),
                container: $(headerId + 'iSec_1'),
                width: $(headerId + 'iSec_1').width() - 10,
                height: $(headerId + 'iSec_1').height() - 10,
                sysProgramId: 'SO1300K',
                parentData: ds,
                localization: options.localization,
            });
            delete ds;
            ds = null;
            iSec_1Loaded = true;
            if ($.isFunction(action)) { action(); };
        } catch (err) {
            errorHandle(formName, 'renderDynGrid', err);
        } finally {

        };
    };
    function serviceTypeChanged(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            if ($(headerId + 'csServiceType').csList('codeNo') == '') { return; };
            var parameters = $.extend({}, copyLoginInfo,
               { ServiceType: { type: 'string', value: $(headerId + 'csServiceType').csList('codeNo') } } );

            var params = getParameters(riadllName,
                   riaClassName,
                   'Query_CD019',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var d = JSON.parse(data.ResultXML);
                            $(headerId + 'csCitemCode1').csList('source', d.Table.rows);
                            $(headerId + 'csCitemCode2').csList('source', d.Table.rows);
                            $(headerId + 'csCitemCode3').csList('source', d.Table.rows);
                            $(headerId + 'csCitemCode4').csList('source', d.Table.rows);
                            
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
    function Query_CD035(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {

            var parameters = $.extend({}, copyLoginInfo);

            var params = getParameters(riadllName,
                   riaClassName,
                   'Query_CD035',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var d = JSON.parse(data.ResultXML);
                            $(headerId + 'ccCustStatus').csMulti('source', d.Table.rows);
                            var statusCode = '1';
                            switch (options.parameters[SO017TableName].rows[0]['FLAG']) {
                                case ( options.language.FaciCancel ): 
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
                            delete d;
                            d = null;
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };

                    } catch (err) {
                        errorHandle(formName, 'Query_CD035-Server', err);
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
            errorHandle(formName, 'Query_CD035', err);

        } finally {
            //if ($.isFunction(action)) { action(); };
        };
    };
    function load_data(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {

            var parameters = $.extend({}, copyLoginInfo);

            var params = getParameters(riadllName,
                   riaClassName,
                   'Query_CD046',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var d = JSON.parse(data.ResultXML);
                            $(headerId + 'csServiceType').csList('source', d.Table.rows);
                            $(headerId + 'csServiceType').csList('codeNo', 'C');                            
                            delete d;
                            d = null;
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };

                    } catch (err) {
                        errorHandle(formName, 'Query_CD046-Server', err);
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
            errorHandle(formName, 'load_data', err);

        } finally {
            //if ($.isFunction(action)) { action(); };
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