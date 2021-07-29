(function ($) {
    var formName = 'SO3272A3';
    var riadllName = 'CableSoft.SO.RIA.Billing.CreditCardOut.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.CreditCardOut.Web.Fubon';    
    var copyLoginInfo = {};
    var firstTime = true;
    
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
                            options: $.extend({}, new defaults(), new SO3272A3(), options)                            
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3272A3_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3272A3', err);
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
                width: '210px',
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
            $(headerId + "gilCompCode").csList('onlyDropDown', true);
            controls.push({ name: $(div).prop('id') + 'gilCompCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "gilBillHeadFmt").csList({
                source: null,
                codeNoWidth: 40,
                width: '255px',
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
            controls.push({ name: $(div).prop('id') + 'gilBillHeadFmt', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dtShouldDate1").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: true,
                width: 130,
                height: 25
            });
            controls.push({ name: $(div).prop('id') + 'dtShouldDate1', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dtShouldDate2").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: true,
                width: 130,
                height: 25
            });
            controls.push({ name: $(div).prop('id') + 'dtShouldDate2', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dtCreateTime1").csDateTime({
                formatString: 'yyyy/MM/dd HH:mm:ss',
                value: null,
                showCalendarButton: true,
                width: 185,
                height: 25
            });
            controls.push({ name: $(div).prop('id') + 'dtCreateTime1', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dtCreateTime2").csDateTime({
                formatString: 'yyyy/MM/dd HH:mm:ss',
                value: null,
                showCalendarButton: true,
                width: 185,
                height: 25
            });
            controls.push({ name: $(div).prop('id') + 'dtCreateTime2', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "dtSendDate").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: true,
                width: 130,
                height: 25
            });
            controls.push({ name: $(div).prop('id') + 'dtSendDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            var data = [lang.cboKind];
            $(headerId + "cbFormat").jqxDropDownList({
                width: '350px',
                height: '25px',
                selectedIndex: 0,
                source: data
            });
            controls.push({ name: $(div).prop('id') + 'cbFormat', type: 'jqxDropDownList', level: 2 });
            data.length = 0;
            data = null;

            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'jqxTabs').csTabs({
                width: '99.8%',

                //height: '99.5%',
                height: $(headerId + 'tbs').height() - 10,
                collapsible: false
            });

            controls.push({ name: $(div).prop('id') + 'jqxTabs', type: 'csTabs', level: 1 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "chkNormal").jqxCheckBox({
                width: '90px',
                height: 25,
                checked: true,
            });
            controls.push({ name: $(div).prop('id') + 'chkNormal', type: 'jqxCheckBox', level: 2 });
            
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "chkFubonIntegrate").jqxCheckBox({
                width: '150px',
                height: 25,
                checked: true,
            });
            controls.push({ name: $(div).prop('id') + 'chkFubonIntegrate', type: 'jqxCheckBox', level: 2 });

            //-----------------------------------------------------------------------------         
            //-----------------------------------------------------------------------------
            $(headerId + "chkIgnorCredit").jqxCheckBox({
                width: '200px',
                height: 25,
                checked: false,
            });
            controls.push({ name: $(div).prop('id') + 'chkIgnorCredit', type: 'jqxCheckBox', level: 2 });
            
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "chkZero").jqxCheckBox({
                width: '250px',
                height: 25,
                checked: false,
            });
            controls.push({ name: $(div).prop('id') + 'chkZero', type: 'jqxCheckBox', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "chkExcI").jqxCheckBox({
                width: '250px',
                height: 25,
                checked: false,
            });
            controls.push({ name: $(div).prop('id') + 'chkExcI', type: 'jqxCheckBox', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "txtCustId").jqxInput({
                height: 25,
                width: '98%',
            });
            controls.push({ name: $(div).prop('id') + 'txtCustId', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "txtStoreNum").jqxInput({
                height: 25,
                width: '98%',
            });
            controls.push({ name: $(div).prop('id') + 'txtStoreNum', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "txtBillMemo").jqxInput({
                height: 25,
                width: '98%',
            });
            controls.push({ name: $(div).prop('id') + 'txtBillMemo', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "txtAuthBatch").jqxMaskedInput({
                height: 25,
                mask: '9999',
                promptChar: '',
                width: '95%',
            });
            controls.push({ name: $(div).prop('id') + 'txtAuthBatch', type: 'jqxMaskedInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "txtClientId").jqxInput({
                height: 25,
                width: '95%',
            });
            controls.push({ name: $(div).prop('id') + 'txtClientId', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmBankCode').csMulti({
                buttonText: lang.TxtcsmBankCode,
                width: '100%',
                buttonWidth: 80,                
                isReadOnly: false,
                
            });
            $(headerId + 'csmBankCode').csMulti('buttonTextColor', 'red');
            controls.push({ name: $(div).prop('id') + 'csmBankCode', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmCMCode').csMulti({
                buttonText: lang.TxtcsmCMCode,
                width: '100%',
                height: 25,
                buttonWidth: 80,                
            });
            controls.push({ name: $(div).prop('id') + 'csmCMCode', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmAreaCode').csMulti({
                buttonText: lang.TxtcsmAreaCode,
                width: '100%',
                height: 25,
                buttonWidth: 80,                
                isReadOnly: false,                
            });
            controls.push({ name: $(div).prop('id') + 'csmAreaCode', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmServCode').csMulti({
                buttonText: lang.TxtcsmServCode,
                width: '100%',
                height: 25,
                buttonWidth: 80,                
                isReadOnly: false,                
            });
            controls.push({ name: $(div).prop('id') + 'csmServCode', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmCustStatus').csMulti({
                buttonText: lang.TxtcsmCustStatus,
                width: '100%',
                height: 25,
                buttonWidth: 80,               
                isReadOnly: false,                
            });
            controls.push({ name: $(div).prop('id') + 'csmCustStatus', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            
            //-----------------------------------------------------------------------------
            $(headerId + 'csmCustClass').csMulti({
                buttonText: lang.TxtcsmCustClass,
                width: '100%',
                height: 25,
                buttonWidth: 80,                
                isReadOnly: false,                
            });
            controls.push({ name: $(div).prop('id') + 'csmCustClass', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            $(headerId + 'csmClctEn').csMulti({
                buttonText: lang.TxtcsmClctEn,
                width: '100%',
                buttonWidth: 80,                
                isReadOnly: false,                
            });
            controls.push({ name: $(div).prop('id') + 'csmClctEn', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmOldClctEn').csMulti({
                buttonText: lang.TxtcsmOldClctEn,
                width: '100%',
                height: 25,
                buttonWidth: 80,                
                isReadOnly: false,                
            });
            controls.push({ name: $(div).prop('id') + 'csmOldClctEn', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmCreateEn').csMulti({
                buttonText: lang.TxtcsmCreateEn,
                width: '100%',
                height: 25,
                buttonWidth: 80,              
                isReadOnly: false,                
            });
            controls.push({ name: $(div).prop('id') + 'csmCreateEn', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmUCCode').csMulti({
                buttonText: lang.TxtcsmUCCode,
                width: '100%',
                height: 25,
                buttonWidth: 80,                
                isReadOnly: false,              
            });
            controls.push({ name: $(div).prop('id') + 'csmUCCode', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmCitemCode').csMulti({
                buttonText: lang.TxtcsmCitemCode,
                width: '100%',
                height: 25,
                buttonWidth: 80,                
                isReadOnly: true,                
            });
            $(headerId + 'csmCitemCode').csMulti('buttonTextColor', 'red');
            controls.push({ name: $(div).prop('id') + 'csmCitemCode', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmBillType').csMulti({
                buttonText: lang.TxtcsmBillType,
                width: '100%',
                height: 25,
                buttonWidth: 80,                
                isReadOnly: false,                
            });
            controls.push({ name: $(div).prop('id') + 'csmBillType', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmPayType').csMulti({
                buttonText: lang.TxtcsmPayType,
                width: '100%',
                height: 25,
                buttonWidth: 80,                
                isReadOnly: false,                
            });
            controls.push({ name: $(div).prop('id') + 'csmPayType', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            //$(headerId + 'csmAMduId').csMulti({
            //    buttonText: lang.TxtcsmAMduId,
            //    width: '100%',
            //    height: 25,
            //    buttonWidth: 80,                
            //    isReadOnly: false,                
            //});
            //controls.push({ name: $(div).prop('id') + 'csmAMduId', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmEMduid').csMulti({
                buttonText: lang.TxtcsmEMduid,
                width: '100%',
                height: 25,
                buttonWidth: 120,                
                isReadOnly: false,                
            });
            controls.push({ name: $(div).prop('id') + 'csmEMduid', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmNMduid').csMulti({
                buttonText: lang.TxtcsmNMduid,
                width: '100%',
                height: 25,
                buttonWidth: 120,                
                isReadOnly: false,                
            });
            controls.push({ name: $(div).prop('id') + 'csmNMduid', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'btnExit').jqxButton($.extend({}, imagePosition, {
                width: 140,
                height: 25,
                imgSrc: imageScr.exit.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnExit', type: 'jqxButton', level: 2 });
            $(headerId + 'btnExit > img').css('top', '2px');
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 140,
                height: 25,
                imgSrc: imageScr.ok.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnOK', type: 'jqxButton', level: 2 });
            $(headerId + 'btnOK > img').css('top', '2px');
            //-----------------------------------------------------------------------------
            $(headerId + 'downloadLink').append($(headerId + 'btnDownload'));
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        };
          
        
    };
    function formDestroy(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = $.data(div, formName).options.controls;
            var headerId = '#' + $(div).prop('id');          
            UnHandle(div);            
            destroyControls(controls);
            deleteJSONObject(options);
            $(div).children().remove();
            copyLoginInfo = {};
            firstTime = true;
            $.data(div, formName).options.language = null;
            delete $.data(div, formName).options.language;
            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults;                       
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        };
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
                      initData(div, options.editMode, function () {
                          $(div).triggerHandler('loaded', [this, options]);
                          if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                              options.containerIsWindow = true;
                              var csw = $.data(div, formName).options.container;
                              csw.on("winClosing", div, winClosing);


                          };
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
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');        
        try {            
            changeLanguage(div);
            renderControl(div);
            QueryAllData(div, function () {
                AddHandle(div, function () {

                });
            });
        } catch (err) {
            errorHandle(formName, 'initData', err);

        } finally {
            if ($.isFunction(action)) { action(); };
        }
    };
    function UnHandle(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'gilCompCode').unbind('selectedIndexChanged');
        $(headerId + 'gilBillHeadFmt').unbind('selectedIndexChanged');
        $(headerId + 'btnOK').unbind('click', btnOKClick);
        $(headerId + 'dtShouldDate1').unbind('focusin');
        $(headerId + 'dtShouldDate2').unbind('focusin');
        $(headerId + 'dtCreateTime1').unbind('focusin');
        $(headerId + 'dtCreateTime2').unbind('focusin');
        $(headerId + 'dtSendDate').unbind('focusin');
        $(headerId + 'dtShouldDate1').off();
        $(headerId + 'dtShouldDate2').off();
        $(headerId + 'dtCreateTime1').off();
        $(headerId + 'dtCreateTime2').off();
        $(headerId + 'btnExit').off();        
        $(headerId + 'chkFubonIntegrate').off('change');
        $(headerId + 'dtSendDate').off();
        $(options['container']).off('resized');

    };
    function gilCompSelected(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var currentComp = copyLoginInfo.loginInfo.value.rows[0].compcode;
        copyLoginInfo.loginInfo.value.rows[0].compcode = $(this).csList('codeNo');
        options.loginInfo.loginInfo.rows[0].compcode = $(this).csList('codeNo');
        UnHandle(event.data);
        chkCompSelected(event.data, function (r) {
            if (r) {                
                $(headerId + "gilCompCode").csList('disabled', false);
                $(headerId + 'dtShouldDate1').csDateTime('setText', null);
                $(headerId + 'dtShouldDate2').csDateTime('setText', null);
                $(headerId + 'dtCreateTime1').csDateTime('setText', null);
                $(headerId + 'dtCreateTime2').csDateTime('setText', null);
                $(headerId + 'chkNormal').jqxCheckBox({ checked: true });
                $(headerId + 'chkFubonIntegrate').jqxCheckBox({ checked: true });
                $(headerId + "chkIgnorCredit").jqxCheckBox({checked: false,});                
                $(headerId + "chkZero").jqxCheckBox({ checked: false});
                $(headerId + "chkExcI").jqxCheckBox({ checked: false});
                $(headerId + "txtCustId").val('');                
                $(headerId + "txtStoreNum").val('');
                $(headerId + "txtBillMemo").val('');
                $(headerId + "txtAuthBatch").jqxMaskedInput({ value: "" });
                $(headerId + "txtClientId").val('');
                $(headerId + 'jqxTabs').jqxTabs({ selectedItem: 0 });
                QueryAllData(event.data, function () {                    
                    AddHandle(event.data);
                });
                
            } else {
                copyLoginInfo.loginInfo.value.rows[0].compcode = currentComp;
                options.loginInfo.loginInfo.rows[0].compcode = currentComp;
                UnHandle(event.data);
                $(headerId + "gilCompCode").csList('codeNo', currentComp);                
                AddHandle(event.data);
            };
        })


    };
    function chkCompSelected(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { Mid: { type: 'string', value: 'SO3272A3' } });

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

    function AddHandle(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            $(headerId + 'gilCompCode').unbind('selectedIndexChanged');
            $(headerId + 'gilCompCode').on('selectedIndexChanged', div, gilCompSelected);
            $(headerId + 'gilBillHeadFmt').unbind('selectedIndexChanged', gilBillHeadFmtSelectChanged);
            $(headerId + 'gilBillHeadFmt').bind('selectedIndexChanged', div, gilBillHeadFmtSelectChanged);
            $(headerId + 'btnOK').unbind('click', btnOKClick);
            $(headerId + 'btnOK').bind('click', div, btnOKClick);
            $(headerId + 'dtSendDate').unbind('focusin');
            $(headerId + 'dtSendDate').focusin(function () {
                if ($(this).csDateTime('getText') == null) {
                    $(this).csDateTime('setDate', new Date());
                }
            });
            $(headerId + 'dtShouldDate1').unbind('focusin');
            $(headerId + 'dtShouldDate1').focusin(function () {
                if ($(this).csDateTime('getText') == null) {
                    $(this).csDateTime('setDate', new Date());
                    if ($(headerId + 'dtShouldDate2').csDateTime('getText') == null) {
                        var d = $(this).csDateTime('getDate');
                        $(headerId + 'dtShouldDate2').csDateTime('setDate', new Date(d.getFullYear(), (d.getMonth() + 1)) - 1);
                    };
                }
            });
            $(headerId + 'dtShouldDate2').unbind('focusin');
            $(headerId + 'dtShouldDate2').focusin(function () {
              
                    var d = new Date();
                    if ($(headerId + 'dtShouldDate1').csDateTime('getText') != null) {
                        d = $(headerId + 'dtShouldDate1').csDateTime('getDate');
                    };
                    if ($(this).csDateTime('getText') == null) {
                        $(this).csDateTime('setDate', new Date(d.getFullYear(), (d.getMonth() + 1)) - 1);
                    }
                    
            });
            $(headerId + 'dtCreateTime1').unbind('focusin');
            $(headerId + 'dtCreateTime1').focusin(function () {
                if ($(this).csDateTime('getText') == null) {
                    $(this).csDateTime('setDate', new Date());
                    var d = $(this).csDateTime('getDate');
                    if ($(headerId + 'dtCreateTime2').csDateTime('getText') == null) {
                        var d = $(this).csDateTime('getDate');
                        $(headerId + 'dtCreateTime2').csDateTime('setDate', new Date(d.getFullYear(), (d.getMonth() + 1)) - 1);
                    };
                }
            });
            $(headerId + 'dtCreateTime2').unbind('focusin');
            $(headerId + 'dtCreateTime2').focusin(function () {
                if ($(this).csDateTime('getText') == null) {
                    if ($(headerId + 'dtCreateTime1').csDateTime('getText') != null) {
                        d = $(headerId + 'dtCreateTime1').csDateTime('getDate');
                    };
                    if ($(this).csDateTime('getText') == null) {
                        $(this).csDateTime('setDate', new Date(d.getFullYear(), (d.getMonth() + 1)) - 1);
                    };
                    
                }
            });
            $(headerId + 'btnExit').off();
            $(headerId + 'btnExit').on('click', function () {
                $(options['container']).csWindow('close');
            });
            $(options['container']).off('resized');
            $(options['container']).on('resized', function () {
                for (var i = 0; i < options.controls.length - 1; i++) {
                    if (options.controls[i].type == 'csMulti') {
                        $('#' + options.controls[i].name).csMulti('resize');
                    };
                }
            });
            
            $(headerId + 'chkFubonIntegrate').off('change');
            $(headerId + 'chkFubonIntegrate').on('change', function (event) {
                //#8537 By Kin 2019/12/17'
                if ($(this).jqxCheckBox('checked')) {
                    $(headerId + 'csmCMCode').csMulti('source', options.initData.CD031REFNO5.rows);
                    $(headerId + 'csmCMCode').csMulti('buttonTextColor', 'red');
                    $(headerId + 'csmCMCode').csMulti("selectAll", true);
                } else {
                    $(headerId + 'csmCMCode').csMulti('source', options.initData.CD031.rows);
                    $(headerId + 'csmCMCode').csMulti('buttonTextColor', 'black');
                };
                if (options.initData.CD018 != undefined) {
                    if (options.initData.CD018.rows.length > 0) {
                        if (options.initData.CD018.rows[0].SPCNO != undefined) {
                            $(headerId + 'txtStoreNum').val(options.initData.CD018.rows[0].SPCNO);
                        };                        
                        if ($(this).jqxCheckBox('checked')) {
                            if (options.initData.CD018.rows[0].SPCNO2 != undefined) {
                                $(headerId + 'txtStoreNum').val(options.initData.CD018.rows[0].SPCNO2);
                            };
                        };
                    }; 
                    
                }; 
                
            }); 
        } catch (err) {
            errorHandle(formName, 'AddHandle', err);
        }
    };
    function buildCondition(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var dsCondition = {
            Condition: {
                columns: [{ name: 'FIELDNAME'.toUpperCase(), type: 'string' },
                    { name: 'FIELDVALUE'.toUpperCase(), type: 'string' },
                    { name: 'FIELDDESC'.toUpperCase(), type: 'string' },
                    { name: 'HEADNAME'.toUpperCase(), type: 'string' },
                    { name: 'OBJECTTYPE'.toUpperCase(), type: 'string' },                  
                ],
                rows: []
            }
        };
        if ($(headerId + 'dtShouldDate1').csDateTime('getText') != null) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'ShouldDate_1',
                FIELDVALUE: $(headerId + 'dtShouldDate1').csDateTime('getText'),
                FIELDDESC: $(headerId + 'dtShouldDate1').csDateTime('getText'),
                HEADNAME: 'ShouldDate_1' + ',' + options.language.lblShouldDate,
                OBJECTTYPE: '5'
            });
            
        };
        if ($(headerId + 'dtShouldDate2').csDateTime('getText') != null) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'ShouldDate_2',
                FIELDVALUE: $(headerId + 'dtShouldDate2').csDateTime('getText'),
                FIELDDESC: $(headerId + 'dtShouldDate2').csDateTime('getText'),
                HEADNAME: 'ShouldDate_2' + ',' + options.language.lblShouldDate,
                OBJECTTYPE: '5'
            })
        };
        if ($(headerId + 'dtCreateTime1').csDateTime('getText') != null) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'CREATETIME_1',
                FIELDVALUE: $(headerId + 'dtCreateTime1').csDateTime('getText'),
                FIELDDESC: $(headerId + 'dtCreateTime1').csDateTime('getText'),
                HEADNAME: 'CREATETIME_1' + ',' + options.language.lblCreateTime,
                OBJECTTYPE: '5'
            })
            
        };
        if ($(headerId + 'dtCreateTime2').csDateTime('getText') != null) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'CREATETIME_2',
                FIELDVALUE: $(headerId + 'dtCreateTime2').csDateTime('getText'),
                FIELDDESC: $(headerId + 'dtCreateTime2').csDateTime('getText'),
                HEADNAME: 'CREATETIME_2' + ',' + options.language.lblCreateTime,
                OBJECTTYPE: '5'
            })
        };
        if ($(headerId + 'csmCMCode').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'CMCode_1',
                FIELDVALUE: $(headerId + 'csmCMCode').csMulti('getChooseList'),                
                FIELDDESC: $(headerId + 'csmCMCode').csMulti('getChooseListName'),
                HEADNAME: 'CMCode_1' + ',' + options.language.TxtcsmCMCode,
                OBJECTTYPE: '6'
            })            
        };
        if ($(headerId + 'csmAreaCode').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'AreaCode_1',
                FIELDVALUE: $(headerId + 'csmAreaCode').csMulti('getChooseQuoteList'),
                FIELDDESC: $(headerId + 'csmAreaCode').csMulti('getChooseListName'),
                HEADNAME: 'AreaCode_1' + ',' + options.language.TxtcsmAreaCode,
                OBJECTTYPE: '6'
            })            
        };
        if ($(headerId + 'csmServCode').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'ServCode_1',
                FIELDVALUE:$(headerId + 'csmServCode').csMulti('getChooseQuoteList'),
                FIELDDESC: $(headerId + 'csmServCode').csMulti('getChooseListName'),
                HEADNAME: 'ServCode_1' + ',' + options.language.TxtcsmServCode,
                OBJECTTYPE: '6'
            })            
        };
        if ($(headerId + 'csmClctEn').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'ClctEn_1',
                FIELDVALUE: $(headerId + 'csmClctEn').csMulti('getChooseQuoteList'),
                FIELDDESC: $(headerId + 'csmClctEn').csMulti('getChooseListName'),
                HEADNAME: 'ClctEn_1' + ',' + options.language.TxtcsmClctEn,
                OBJECTTYPE: '6'
            })
        };
        if ($(headerId + 'csmOldClctEn').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'OldClctEn_1',
                FIELDVALUE: $(headerId + 'csmOldClctEn').csMulti('getChooseQuoteList'),
                FIELDDESC: $(headerId + 'csmOldClctEn').csMulti('getChooseListName'),
                HEADNAME: 'OldClctEn_1' + ',' + options.language.TxtcsmOldClctEn,
                OBJECTTYPE: '6'
            })            
        };
        if ($(headerId + 'csmPayType').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'PayType_1',
                FIELDVALUE: $(headerId + 'csmPayType').csMulti('getChooseList'),
                FIELDDESC: $(headerId + 'csmPayType').csMulti('getChooseListName'),
                HEADNAME: 'PayType_1' + ',' + options.language.TxtcsmPayType,
                OBJECTTYPE: '6'
            })            
        };
        if ($(headerId + 'csmBillType').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'BillType_1',
                FIELDVALUE: $(headerId + 'csmBillType').csMulti('getChooseQuoteList'),
                FIELDDESC: $(headerId + 'csmBillType').csMulti('getChooseListName'),
                HEADNAME: 'BillType_1' + ',' + options.language.TxtcsmBillType,
                OBJECTTYPE: '6'
            })            
        };

        if ($(headerId + 'txtCustId').val() != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'CustId_1',
                FIELDVALUE: $(headerId + 'txtCustId').val(),
                FIELDDESC: $(headerId + 'txtCustId').val(),
                HEADNAME: 'CustId_1' + ',' + options.language.lblCustId,
                OBJECTTYPE: '0'
            })            
        };
        if ($(headerId + 'csmCreateEn').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'CreateEn_1',
                FIELDVALUE: $(headerId + 'csmCreateEn').csMulti('getChooseQuoteList'),
                FIELDDESC: $(headerId + 'csmCreateEn').csMulti('getChooseListName'),
                HEADNAME: 'CreateEn_1' + ',' + options.language.TxtcsmCreateEn,
                OBJECTTYPE: '6'
            })            
        };
        if ($(headerId + 'csmEMduid').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'EMduid_1',
                FIELDVALUE: $(headerId + 'csmEMduid').csMulti('getChooseQuoteList'),
                FIELDDESC: $(headerId + 'csmEMduid').csMulti('getChooseListName'),
                HEADNAME: 'EMduid_1' + ',' + options.language.TxtcsmEMduid,
                OBJECTTYPE: '6'
            })            
        };
        if ($(headerId + 'csmNMduid').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'NMduid_1',
                FIELDVALUE: $(headerId + 'csmNMduid').csMulti('getChooseQuoteList'),
                FIELDDESC: $(headerId + 'csmNMduid').csMulti('getChooseListName'),
                HEADNAME: 'NMduid_1' + ',' + options.language.TxtcsmNMduid,
                OBJECTTYPE: '6'
            })            
        };
        if ($(headerId + 'csmUCCode').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'UCCode_1',
                FIELDVALUE: $(headerId + 'csmUCCode').csMulti('getChooseList'),
                FIELDDESC: $(headerId + 'csmUCCode').csMulti('getChooseListName'),
                HEADNAME: 'UCCode_1' + ',' + options.language.TxtcsmUCCode,
                OBJECTTYPE: '6'
            })           
        };
        if ($(headerId + 'gilBillHeadFmt').csList('description') != null) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'BillHeadFmt_1',
                FIELDVALUE: $(headerId + 'gilBillHeadFmt').csList('codeNo'),
                FIELDDESC: $(headerId + 'gilBillHeadFmt').csList('description'),
                HEADNAME: 'BillHeadFmt_1' + ',' + options.language.lblBillHeadFmt,
                OBJECTTYPE: '1'
            })
            
        };
        if ($(headerId + 'csmCustStatus').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'CustStatus_1',
                FIELDVALUE: $(headerId + 'csmCustStatus').csMulti('getChooseList'),
                FIELDDESC: $(headerId + 'csmCustStatus').csMulti('getChooseListName'),
                HEADNAME: 'CustStatus_1' + ',' + options.language.TxtcsmCustStatus,
                OBJECTTYPE: '6'
            })            
        };
        if ($(headerId + 'csmCustClass').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'CustClass_1',
                FIELDVALUE: $(headerId + 'csmCustClass').csMulti('getChooseList'),
                FIELDDESC: $(headerId + 'csmCustClass').csMulti('getChooseListName'),
                HEADNAME: 'CustClass_1' + ',' + options.language.TxtcsmCustClass,
                OBJECTTYPE: '6'
            })            
        };
        if ($(headerId + 'chkZero').jqxCheckBox('checked')) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'IsZero_1',
                FIELDVALUE: 1,
                FIELDDESC: 1,
                HEADNAME: 'IsZero_1' + ',' + options.language.chkZero,
                OBJECTTYPE: '7'
            })            
        } else {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'IsZero_1',
                FIELDVALUE: 0,
                FIELDDESC: 0,
                HEADNAME: 'IsZero_1' + ',' + options.language.chkZero,
                OBJECTTYPE: '7'
            })
        }
        if ($(headerId + 'chkNormal').jqxCheckBox('checked')) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'Normal_1',
                FIELDVALUE: 1,
                FIELDDESC: 1,
                HEADNAME: 'Normal_1' + ',' + options.language.chkNormal,
                OBJECTTYPE: '7'
            })
        } else {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'Normal_1',
                FIELDVALUE: 0,
                FIELDDESC: 0,
                HEADNAME: 'Normal_1' + ',' + options.language.chkNormal,
                OBJECTTYPE: '7'
            })
        };
        if ($(headerId + 'chkFubonIntegrate').jqxCheckBox('checked')) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'FubonIntegrate_1',
                FIELDVALUE: 1,
                FIELDDESC: 1,
                HEADNAME: 'FubonIntegrate_1' + ',' + options.language.chkFubonIntegrate,
                OBJECTTYPE: '7'
            })
        } else {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'FubonIntegrate_1',
                FIELDVALUE: 0,
                FIELDDESC: 0,
                HEADNAME: 'FubonIntegrate_1' + ',' + options.language.chkFubonIntegrate,
                OBJECTTYPE: '7'
            })
        }
        if ($(headerId + 'chkExcI').jqxCheckBox('checked')) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'ExcI_1',
                FIELDVALUE: 1,
                FIELDDESC: 1,
                HEADNAME: 'ExcI_1' + ',' + options.language.chkExcI,
                OBJECTTYPE: '7'
            })            
        } else {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'ExcI_1',
                FIELDVALUE: 0,
                FIELDDESC: 0,
                HEADNAME: 'ExcI_1' + ',' + options.language.chkExcI,
                OBJECTTYPE: '7'
            })
        }
        if ($(headerId + 'chkIgnorCredit').jqxCheckBox('checked')) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'IgnorCredit_1',
                FIELDVALUE: 1,
                FIELDDESC: 1,
                HEADNAME: 'IgnorCredit_1' + ',' + options.language.chkIgnorCredit,
                OBJECTTYPE: '7'
            })          
        } else {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'IgnorCredit_1',
                FIELDVALUE: 0,
                FIELDDESC: 0,
                HEADNAME: 'IgnorCredit_1' + ',' + options.language.chkIgnorCredit,
                OBJECTTYPE: '7'
            })
        }
        if ($(headerId + 'csmBankCode').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'BankCode_1',
                FIELDVALUE: $(headerId + 'csmBankCode').csMulti('getChooseList'),
                FIELDDESC: $(headerId + 'csmBankCode').csMulti('getChooseListName'),
                HEADNAME: 'BankCode_1' + ',' + options.language.TxtcsmBankCode,
                OBJECTTYPE: '6'
            })            
        };
        //if ($(headerId + 'csmAMduId').csMulti('getChooseList') != '') {
        //    dsCondition.Condition.rows.push({
        //        FIELDNAME: 'AMduId_1',
        //        FIELDVALUE: $(headerId + 'csmAMduId').csMulti('getChooseQuoteList'),
        //        FIELDDESC: $(headerId + 'csmAMduId').csMulti('getChooseListName'),
        //        HEADNAME: 'AMduId_1' + ',' + options.language.TxtcsmAMduId,
        //        OBJECTTYPE: '6'
        //    })
        //};
        if ($(headerId + 'dtSendDate').csDateTime('getText') != null) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'SendDate_1',
                FIELDVALUE: $(headerId + 'dtSendDate').csDateTime('getText'),
                FIELDDESC: $(headerId + 'dtSendDate').csDateTime('getText'),
                HEADNAME: 'SendDate_1' + ',' + options.language.lblSendDate,
                OBJECTTYPE: '5'
            })            
        };
        if ($(headerId + 'txtAuthBatch').val() != null) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'AuthBatch_1',
                FIELDVALUE: $(headerId + 'txtAuthBatch').val(),
                FIELDDESC: $(headerId + 'txtAuthBatch').val(),
                HEADNAME: 'AuthBatch_1' + ',' + options.language.lblAuthBatch,
                OBJECTTYPE: '0'
            })            
        };
        if ($(headerId + 'txtClientId').val() != null) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'ClientId_1',
                FIELDVALUE: $(headerId + 'txtClientId').val(),
                FIELDDESC: $(headerId + 'txtClientId').val(),
                HEADNAME: 'ClientId_1' + ',' + options.language.lblClientId,
                OBJECTTYPE: '0'
            })            
        };

        if ($(headerId + 'txtBillMemo').val() != null) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'BillMemo_1',
                FIELDVALUE: $(headerId + 'txtBillMemo').val(),
                FIELDDESC: $(headerId + 'txtBillMemo').val(),
                HEADNAME: 'BillMemo_1' + ',' + options.language.lblBillMemo,
                OBJECTTYPE: '0'
            })            
        };
        if ($(headerId + 'txtStoreNum').val() != null) {
            dsCondition.Condition.rows.push({
                FIELDNAME: 'StoreNum_1',
                FIELDVALUE: $(headerId + 'txtStoreNum').val(),
                FIELDDESC: $(headerId + 'txtStoreNum').val(),
                HEADNAME: 'StoreNum_1' + ',' + options.language.lblStoreNum,
                OBJECTTYPE: '0'
            })            
        };
        return dsCondition;
    }
    function buildCondition2(div) {
        var headerId = '#' + $(div).prop('id');
        var dsCondition = {            
            Condition: {
                columns: [{ name: 'ShouldDate1'.toUpperCase(), type: 'string' },
                    { name: 'ShouldDate2'.toUpperCase(), type: 'string' },
                    { name: 'CreateTime1'.toUpperCase(), type: 'string' },
                    { name: 'CreateTime2'.toUpperCase(), type: 'string' },
                    { name: 'CMCode'.toUpperCase(), type: 'string' },
                    { name: 'AreaCode'.toUpperCase(), type: 'string' },
                    { name: 'ServCode'.toUpperCase(), type: 'string' },
                    { name: 'ClctEn'.toUpperCase(), type: 'string' },
                    { name: 'OldClctEn'.toUpperCase(), type: 'string' },
                    { name: 'PayKind'.toUpperCase(), type: 'string' },
                    { name: 'BillNoType'.toUpperCase(), type: 'string' },
                    { name: 'CustId'.toUpperCase(), type: 'string' },
                    { name: 'CreateEn'.toUpperCase(), type: 'string' },
                    { name: 'MduIdE'.toUpperCase(), type: 'string' },
                    { name: 'MduIdN'.toUpperCase(), type: 'string' },
                    { name: 'UCCODE'.toUpperCase(), type: 'string' },
                    { name: 'BillHeadFmt'.toUpperCase(), type: 'string' },
                    { name: 'CustStatusCode'.toUpperCase(), type: 'string' },
                    { name: 'ClassCode1'.toUpperCase(), type: 'string' },
                    { name: 'AMduId'.toUpperCase(), type: 'string' },
                    { name: 'IsZero'.toUpperCase(), type: 'integer' },
                    { name: 'IsOther'.toUpperCase(), type: 'integer' },
                    { name: 'ExcI'.toUpperCase(), type: 'Integer' },
                    { name: 'BANKCODE'.toUpperCase(), type: 'string' },
                    { name: 'AcceptDate'.toUpperCase(), type: 'string' },
                    { name: 'IGNORCREDITCARD'.toUpperCase(), type: 'integer' },
                    { name: 'AuthBatch'.toUpperCase(), type: 'string' },
                    { name: 'ClientId'.toUpperCase(), type: 'string' },
                    { name: 'BillMemo'.toUpperCase(), type: 'string' },
                    { name: 'StoreNum'.toUpperCase(),type:'string'},
                ],
                rows: [{
                    SHOULDDATE1: null,
                    SHOULDDATE2: null,
                    CREATETIME1:null,
                    CRETATEIME2: null,
                    CMCODE: null,
                    AREACODE: null,
                    SERVCODE: null,
                    CLCTEN: null,
                    OLDCLCTEN: null,
                    PAYKIND: null,
                    BILLNOTYPE: null,
                    CUSTID: null,
                    CREATEEN: null,
                    MDUIDE: null,
                    MDUIDN: null,
                    UCCODE: null,
                    BILLHEADFMT: null,
                    CUSTSTATUSCODE: null,
                    CLASSCODE1: null,
                    ISZERO: 0,
                    ISOTHER: 0,
                    EXCI: 0,
                    BANKCODE: null,
                    ACCEPTDATE: null,
                    IGNORCREDITCARD: 0,
                    AUTHBATCH: null,
                    CLIENTID: null,
                    BILLMEMO: null,
                    STORENUM:null
                }]
            }
        };
        if ($(headerId + 'dtShouldDate1').csDateTime('getText') != null) {
            dsCondition.Condition.rows[0]['ShouldDate1'.toUpperCase()] = $(headerId + 'dtShouldDate1').csDateTime('getText');
        };
        if ($(headerId + 'dtShouldDate2').csDateTime('getText') != null) {
            dsCondition.Condition.rows[0]['ShouldDate2'.toUpperCase()] = $(headerId + 'dtShouldDate2').csDateTime('getText');
        };
        if ($(headerId + 'dtCreateTime1').csDateTime('getText') != null) {
            dsCondition.Condition.rows[0]['CREATETIME1'.toUpperCase()] = $(headerId + 'dtCreateTime1').csDateTime('getText');
        };
        if ($(headerId + 'dtCreateTime2').csDateTime('getText') != null) {
            dsCondition.Condition.rows[0]['CREATETIME2'.toUpperCase()] = $(headerId + 'dtCreateTime2').csDateTime('getText');
        };
        if ($(headerId + 'csmCMCode').csMulti('getChooseList') != '') {            
            dsCondition.Condition.rows[0]['CMCode'.toUpperCase()] = $(headerId + 'csmCMCode').csMulti('getChooseList');
        };
        if ($(headerId + 'csmAreaCode').csMulti('getChooseList') != '') {            
            dsCondition.Condition.rows[0]['AREACODE'.toUpperCase()] = $(headerId + 'csmAreaCode').csMulti('getChooseQuoteList');
        };
        if ($(headerId + 'csmServCode').csMulti('getChooseList') != '') {            
            dsCondition.Condition.rows[0]['SERVCODE'.toUpperCase()] = $(headerId + 'csmServCode').csMulti('getChooseQuoteList');
        };
        if ($(headerId + 'csmClctEn').csMulti('getChooseList') != '') {            
            dsCondition.Condition.rows[0]['CLCTEN'.toUpperCase()] = $(headerId + 'csmClctEn').csMulti('getChooseQuoteList');
        };
        if ($(headerId + 'csmOldClctEn').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows[0]['OLDCLCTEN'.toUpperCase()] = $(headerId + 'csmOldClctEn').csMulti('getChooseQuoteList');
        };
        if ($(headerId + 'csmPayType').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows[0]['PAYKIND'.toUpperCase()] = $(headerId + 'csmPayType').csMulti('getChooseList');
        };
        if ($(headerId + 'csmBillType').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows[0]['BILLNOTYPE'.toUpperCase()] = $(headerId + 'csmBillType').csMulti('getChooseQuoteList');
        };
        
        if ($(headerId + 'txtCustId').val() != '') {
            dsCondition.Condition.rows[0]['CUSTID'.toUpperCase()] = $(headerId + 'txtCustId').val();
        };
        if ($(headerId + 'csmCreateEn').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows[0]['CREATEEN'.toUpperCase()] = $(headerId + 'csmCreateEn').csMulti('getChooseQuoteList');
        };
        if ($(headerId + 'csmEMduid').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows[0]['MDUIDE'.toUpperCase()] = $(headerId + 'csmEMduid').csMulti('getChooseQuoteList');
        };
        if ($(headerId + 'csmNMduid').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows[0]['MDUIDN'.toUpperCase()] = $(headerId + 'csmNMduid').csMulti('getChooseQuoteList');
        };
        if ($(headerId + 'csmUCCode').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows[0]['UCCODE'.toUpperCase()] = $(headerId + 'csmUCCode').csMulti('getChooseList');
        };
        if ($(headerId + 'gilBillHeadFmt').csList('description') != null) {
            dsCondition.Condition.rows[0]['BILLHEADFMT'.toUpperCase()] = $(headerId + 'gilBillHeadFmt').csList('description');
        };
        if ($(headerId + 'csmCustStatus').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows[0]['CUSTSTATUSCODE'.toUpperCase()] = $(headerId + 'csmCustStatus').csMulti('getChooseList');
        };
        if ($(headerId + 'csmCustClass').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows[0]['CLASSCODE1'.toUpperCase()] = $(headerId + 'csmCustClass').csMulti('getChooseList');
        };
        if ($(headerId + 'chkZero').jqxCheckBox('checked')) {
            dsCondition.Condition.rows[0]['ISZERO'.toUpperCase()] = 1;
        };
        if ($(headerId + 'chkNormal').jqxCheckBox('checked')) {
            dsCondition.Condition.rows[0]['ISOTHER'.toUpperCase()] = 1;
        };
        if ($(headerId + 'chkExcI').jqxCheckBox('checked')) {
            dsCondition.Condition.rows[0]['EXCI'.toUpperCase()] = 1;
        };
        if ($(headerId + 'chkIgnorCredit').jqxCheckBox('checked')) {
            dsCondition.Condition.rows[0]['IGNORCREDITCARD'.toUpperCase()] = 1;
        } else {
            dsCondition.Condition.rows[0]['IGNORCREDITCARD'.toUpperCase()] = 0;
        }
        if ($(headerId + 'csmBankCode').csMulti('getChooseList') != '') {
            dsCondition.Condition.rows[0]['BANKCODE'.toUpperCase()] = $(headerId + 'csmBankCode').csMulti('getChooseList');
        };
        if ($(headerId + 'dtSendDate').csDateTime('getText') != null) {
            dsCondition.Condition.rows[0]['ACCEPTDATE'.toUpperCase()] = $(headerId + 'dtSendDate').csDateTime('getText');
        };
        if ($(headerId + 'txtAuthBatch').val() != null) {
            dsCondition.Condition.rows[0]['AUTHBATCH'.toUpperCase()] = $(headerId + 'txtAuthBatch').val();
        };
        if ($(headerId + 'txtClientId').val() != null) {
            dsCondition.Condition.rows[0]['CLIENTID'.toUpperCase()] = $(headerId + 'txtClientId').val();
        };
        
        if ($(headerId + 'txtBillMemo').val() != null) {
            dsCondition.Condition.rows[0]['BILLMEMO'.toUpperCase()] = $(headerId + 'txtBillMemo').val();
        };
        if ($(headerId + 'txtStoreNum').val() != null) {
            dsCondition.Condition.rows[0]['STORENUM'.toUpperCase()] = $(headerId + 'txtStoreNum').val();
        };
        return dsCondition;
    };
    function isDataOK(div) {
        var options = $.data(div, formName).options;
        var lang = options.language;
        var headerId = '#' + $(div).prop('id');
        var result = false;
        if ($(headerId + "gilCompCode").csList('codeNo') == '') {
            $(headerId + 'jqxTabs').jqxTabs({ selectedItem: 0 }); 
            messageBox(lang.mustComp, messageType.information, null, function (flag) {
                $(headerId + 'gilCompCode').csList('focus');
            });
            return result;
        };
        if ($(headerId + "gilBillHeadFmt").csList('codeNo') == '') {
            $(headerId + 'jqxTabs').jqxTabs({ selectedItem: 0 }); 
            messageBox(lang.mustBillFmt, messageType.information, null, function (flag) {
                $(headerId + 'gilBillHeadFmt').csList('focus');
            });
            return result;
        };
        if ($(headerId + 'dtShouldDate1').csDateTime('getText') == null) {
            $(headerId + 'jqxTabs').jqxTabs({ selectedItem: 0 }); 
            messageBox(lang.mustShouldDate1, messageType.information, null, function (flag) {
                $(headerId + 'dtShouldDate1').csDateTime('focus');
            });
            return result;
            
        };
        if ($(headerId + 'dtShouldDate2').csDateTime('getText') == null) {
            $(headerId + 'jqxTabs').jqxTabs({ selectedItem: 0 }); 
            messageBox(lang.mustShouldDate2, messageType.information, null, function (flag) {
                $(headerId + 'dtShouldDate2').csDateTime('focus');
            });
            return result;

        };
        if ($(headerId + 'csmBankCode').csMulti('getChooseList') == '') {
            $(headerId + 'jqxTabs').jqxTabs({ selectedItem: 0 }); 
            messageBox(lang.mustBank, messageType.information, null, function (flag) {
                $(headerId + 'csmBankCode').csMulti('focus');
            });
            return result;
        };
        if ($(headerId + 'txtStoreNum').val() == '') {
            $(headerId + 'jqxTabs').jqxTabs({ selectedItem: 1 }); 
            messageBox(lang.storeNum, messageType.information, null, function (flag) {
                $(headerId + 'txtStoreNum').jqxInput('focus');
            });
            return result
        };
        if ($(headerId + 'dtSendDate').csDateTime('getText') == null) {
            $(headerId + 'jqxTabs').jqxTabs({ selectedItem: 1 });
            messageBox(lang.mustSendDate, messageType.information, null, function (flag) {
                $(headerId + 'dtSendDate').csDateTime('focus');
            });
            return result;

        };
        if ($(headerId + 'txtAuthBatch').jqxMaskedInput('val') == '') {
            $(headerId + 'jqxTabs').jqxTabs({ selectedItem: 1 });
            messageBox(lang.mustBatch, messageType.information, null, function (flag) {
                $(headerId + 'txtAuthBatch').jqxMaskedInput('focus');
            });
            return result;

        };
        if ($(headerId + 'txtClientId').val() == '') {
            $(headerId + 'jqxTabs').jqxTabs({ selectedItem: 1 });
            messageBox(lang.mustClientId, messageType.information, null, function (flag) {
                $(headerId + 'txtClientId').jqxInput('focus');
            });
            return result
        };
        if ($(headerId + 'csmCMCode').csMulti('getChooseList') == '') {
            if ($(headerId + "chkFubonIntegrate").jqxCheckBox('checked')) {
                $(headerId + 'jqxTabs').jqxTabs({ selectedItem: 0 });
                messageBox(lang.mustCMCode, messageType.information, null, function (flag) {
                    $(headerId + 'csmCMCode').csMulti('focus');
                });
                return result;

            };
        };

       
        
        return true;
    };
    function btnOKClick(event) {
        var headerId = '#' + $(event.data).prop('id');
        var dsCondition = buildCondition(event.data);
        if (!isDataOK(event.data)) { return; };
        try {
            var parameters = $.extend({}, copyLoginInfo,
               { dsCondition: { type: 'string', value: dsCondition } },
               { SEQNO: {type:'integer',value:0}});
            var params = getParameters(riadllName,
                  riaClassName,
                  'Execute',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            messageBox(data.ResultXML, messageType.information, null, function (flag) {
                                if (data.DownloadFileName != null) {
                                    $(headerId + 'downloadLink').removeProp('href');
                                    $(headerId + 'downloadLink').removeProp('download');
                                    $(headerId + 'downloadLink').prop('href', data.DownloadFileName);

                                    $(headerId + 'downloadLink').prop('download', '');

                                    $(headerId + 'btnDownload').click();
                                };


                            });
                        }
                        else {
                            if (data.ErrorCode == -1) {
                                messageBox(data.ErrorMessage, messageType.information);
                            } else {
                                messageBox(data.ErrorMessage, messageType.critical);
                            };
                            

                        }
                    } catch (err) {
                        errorHandle(formName, 'GenerateTxt-Server', err);
                    } finally {
                        parameters = null;
                        params = null;                                                
                        delete parameters;
                        delete params;
                    };
                }
            });

        } catch (err) {
            errorHandle(formName, 'gilBillHeadFmtSelectChanged', err);

        } finally {
            delete dsCondition;
            dsCondition = null;
        };
    }
    function gilBillHeadFmtSelectChanged(event) {
        var headerId = '#' + $(event.data).prop('id');        
        //$(this).csList('description')        
        try {
            var parameters = $.extend({}, copyLoginInfo,
               { BillHeadFmt: { type: 'string', value: $(this).csList('description') } });
            var params = getParameters(riadllName,
                  riaClassName,
                  'QueryCD019',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            $(headerId + 'csmCitemCode').csMulti('source', tmp.Table.rows);
                            $(headerId + 'csmCitemCode').csMulti('selectAll', true);
                            delete tmp;
                            tmp = null;                            
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);

                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryCD019-Server', err);
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
            errorHandle(formName, 'gilBillHeadFmtSelectChanged', err);
            
        } finally {

        };
    };
    function QueryAllData(div, action) {
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
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            options.initData = null;
                            delete options.initData;
                            options.initData = {};                          
                            $.extend(true, options.initData, tmp);
                            if (firstTime) {
                                $(headerId + 'gilCompCode').csList('source', options.initData.COMPCODE.rows);
                                $(headerId + 'gilCompCode').csList('codeNo', copyLoginInfo.loginInfo.value.rows[0].compcode);
                                firstTime = false;
                            };
                            
                            $(headerId + 'gilBillHeadFmt').csList('source', options.initData.CD068.rows);
                            $(headerId + 'csmBankCode').csMulti('source', options.initData.CD018.rows);
                            //#8537 By Kin 2019/12/17
                            if ( $(headerId + "chkFubonIntegrate").jqxCheckBox('checked') ) {
                                $(headerId + 'csmCMCode').csMulti('source', options.initData.CD031REFNO5.rows);
                                $(headerId + 'csmCMCode').csMulti('buttonTextColor', 'red');
                                $(headerId + 'csmCMCode').csMulti("selectAll",true);
                            } else {
                                $(headerId + 'csmCMCode').csMulti('source', options.initData.CD031.rows);
                                $(headerId + 'csmCMCode').csMulti('buttonTextColor', 'black');
                            }
                            
                            $(headerId + 'csmAreaCode').csMulti('source', options.initData.CD001.rows);
                            $(headerId + 'csmServCode').csMulti('source', options.initData.CD002.rows);
                            $(headerId + 'csmCustStatus').csMulti('source', options.initData.CD035.rows);
                            $(headerId + 'csmCustStatus').csMulti('setDisplayValue', '1');
                            $(headerId + 'csmCustClass').csMulti('source', options.initData.CD004.rows);
                            $(headerId + 'csmClctEn').csMulti('source', options.initData.CM003.rows);
                            $(headerId + 'csmOldClctEn').csMulti('source', options.initData.CM003.rows);
                            $(headerId + 'csmCreateEn').csMulti('source', options.initData.CM003.rows);
                            $(headerId + 'csmUCCode').csMulti('source', options.initData.CD013.rows);
                            $(headerId + 'csmBillType').csMulti('source', options.initData.BILLTYPE.rows);
                            $(headerId + 'csmBillType').csMulti('setDisplayValue', 'B,T');
                            $(headerId + 'csmPayType').csMulti('source', options.initData.CD112.rows);
                            switch(options.initData.SO041.rows[0]['PayKindDefault'.toUpperCase()]) {
                                case 1:
                                    $(headerId + 'csmPayType').csMulti('setDisplayValue', '0');
                                    break;
                                case 2:
                                    $(headerId + 'csmPayType').csMulti('setDisplayValue', '1');
                                    break;
                                default:
                                    $(headerId + 'csmPayType').csMulti('selectAll', true);
                            }
                            //$(headerId + 'csmAMduId').csMulti('source', options.initData.SO202.rows);
                            $(headerId + 'csmEMduid').csMulti('source', options.initData.SO017.rows);
                            $(headerId + 'csmNMduid').csMulti('source', options.initData.SO017.rows);
                            $(headerId + 'dtSendDate').csDateTime('setDate', new Date());
                            if (options.initData.OTHER.rows.length > 0) {
                                if (options.initData.OTHER.rows[0].STORENUM != undefined) {
                                    $(headerId + 'txtStoreNum').val(options.initData.OTHER.rows[0].STORENUM);
                                };
                                if (options.initData.OTHER.rows[0].CLIENTID != undefined) {
                                    $(headerId + 'txtClientId').val(options.initData.OTHER.rows[0].CLIENTID);
                                };
                                if (options.initData.OTHER.rows[0].AUTHBATCH != undefined) {
                                    $(headerId + 'txtAuthBatch').jqxMaskedInput({ value: options.initData.OTHER.rows[0].AUTHBATCH });
                                };

                            };
                            if ($(headerId + 'chkFubonIntegrate').jqxCheckBox('checked')) {
                                if (options.initData.CD018.rows[0].SPCNO2 != undefined) {
                                    $(headerId + 'txtStoreNum').val(options.initData.CD018.rows[0].SPCNO2);
                                };                                
                            } else {
                                if (options.initData.CD018.rows[0].SPCNO != undefined) {
                                    $(headerId + 'txtStoreNum').val(options.initData.CD018.rows[0].SPCNO);
                                };
                            };
                            delete tmp;
                            tmp = null;
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            
                        }
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
            //changeMode(div);
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