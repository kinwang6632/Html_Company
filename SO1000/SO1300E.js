(function ($) {
    var formName = 'SO1300E';
    var riadllName = 'CableSoft.SO.RIA.Building.Web.dll';
    var riaClassName = ' CableSoft.SO.RIA.Building.Web.dsBuilding';
    var copyLoginInfo = {};
    var paraTableName = 'building';
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
                            options: $.extend({}, new defaults(), new SO1300E(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1300E_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1144J', err);
        }
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = '#' + $(div).prop('id');
        try {
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
            $(headerId + "csCustClass").csList({
                source: null,
                codeNoWidth: 50,
                width: '200px',
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
            controls.push({ name: 'csCustClass', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "csChargeType").csList({
                source: null,
                codeNoWidth: 50,
                width: '200px',
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
            controls.push({ name: 'csChargeType', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'grbWhere').jqxExpander({
                width: '100%',
                height: '99%',
                toggleMode: 'none',
                showArrow: false
            });
            controls.push({ name: 'grbWhere', type: 'jqxExpander', level: 1 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'radCustClass').jqxRadioButton({
                width: 120,
                height: 25,
                checked: true
            });
            controls.push({ name: 'radCustClass', type: 'jqxRadioButton', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'radClcAttribute').jqxRadioButton({
                width: 120,
                height: 25,
                checked: false
            });
            controls.push({ name: 'radClcAttribute', type: 'jqxRadioButton', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'ccMduName').csMulti({
                //     source: data2,
                buttonText: lang.ccMduName,
                width: 500,
                buttonWidth: 80,
                //widthDesc: 150,                                
                isReadOnly: false,
            });
            controls.push({ name: 'ccMduName', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'ccCustStatus').csMulti({
                //     source: data2,
                buttonText: lang.ccCustStatus,
                width: 500,
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
                width: 500,
                buttonWidth: 80,
                //widthDesc: 150,                                
                isReadOnly: false,
            });
            controls.push({ name: 'ccCustClass', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
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
        $(headerId + 'radCustClass').unbind('change');
        $(headerId + 'radClcAttribute').unbind('change');
        $(headerId + 'btnCancel').unbind('click');
        $(headerId + 'btnOK').unbind('click');
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'radCustClass').unbind('change');
            $(headerId + 'radCustClass').on('change', function () {
                Check_Adject_Type(div);
            });
            $(headerId + 'radClcAttribute').unbind('change');
            $(headerId + 'radClcAttribute').on('change', function () {
                Check_Adject_Type(div);
            });          
            $(headerId + 'btnCancel').unbind('click');
            $(headerId + 'btnCancel').on('click', function () {
                if (options.containerIsWindow) {
                    $(options['container']).csWindow('close');
                };
            });
            $(headerId + 'btnOK').unbind('click');
            $(headerId + 'btnOK').bind('click', div, btnOKClicked);

        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        }
    };
    function btnOKClicked(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var iType = 0;
        if ($(this).jqxButton('disabled')) { return; };
        if (!isDataOK(event.data)) { return; };
        var ds = {            
            Table: {
                columns: [{ name: 'SERVICETYPE', type: 'string' },
                    { name: 'MDUID', type: 'string' },
                    { name: 'MDUNAME', type: 'string' },
                    { name: 'CUSTSTATUSCODE', type: 'string' },
                    { name: 'CUSTSTATUSNAME', type: 'string' },
                    { name: 'OLDCLASSCODE', type: 'string' },
                    { name: 'OLDCLASSNAME', type: 'string' },
                    { name: 'NEWCLASSCODE', type: 'string' },
                    { name: 'NEWCLASSNAME', type: 'string' },
                    { name: 'CHARGETYPE', type: 'string' }
                ],
                rows: [{
                    SERVICETYPE: $(headerId + 'csServiceType').csList('codeNo'),
                    MDUID: $(headerId + 'ccMduName').csMulti('getChooseQuoteList'),
                    MDUNAME: $(headerId + 'ccMduName').csMulti('getChooseListName'),
                    CUSTSTATUSCODE: $(headerId + 'ccCustStatus').csMulti('getChooseList'),
                    CUSTSTATUSNAME: $(headerId + 'ccCustStatus').csMulti('getChooseListName'),
                    OLDCLASSCODE: $(headerId + 'ccCustStatus').csMulti('getChooseList'),
                    OLDCLASSNAME: $(headerId + 'ccCustStatus').csMulti('getChooseList'),
                    NEWCLASSCODE: $(headerId + 'csCustClass').csList('codeNo'),
                    NEWCLASSNAME: $(headerId + 'csCustClass').csList('description'),
                    CHARGETYPE:$(headerId + 'csChargeType').csList('codeNo')
                }]
            }
        };
        if ($(headerId + 'radCustClass').jqxRadioButton('checked')) {
            iType = 1;
        } else { iType = 2 };
        try {

            var parameters = $.extend({}, copyLoginInfo,
              { iType: { type: 'integer', value: iType } },
              { SaveData: {type:'string',value:ds} });

            var params = getParameters(riadllName,
                   riaClassName,
                   'Go_Write_SO1300E',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var msg = options.language.AdjectSuccess;
                            msg = msg.replace('{0}', data.ResultXML);
                            messageBox(msg, messageType.critical);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };

                    } catch (err) {
                        errorHandle(formName, 'Go_Write_SO1300E-Server', err);
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
            errorHandle(formName, 'Go_Write_SO1300E', err);

        } finally {
            delete ds;
            ds = null;
        }
    };
    function isDataOK(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if ($(headerId + 'csServiceType').csList('codeNo') == '') {
            messageBox(options.language.ServiceTypeMustbe, messageType.critical);
            return false;
        };
        if ($(headerId + 'ccMduName').csMulti('getChooseQuoteList') == '') {
            messageBox(options.language.MduNameMustbe, messageType.critical);
            return false;
        };
        if ($(headerId + 'ccCustClass').csMulti('getChooseQuoteList') == '' && $(headerId + 'ccCustStatus').csMulti('getChooseQuoteList') == '') {
            messageBox(options.language.ClassCodeORCustClassMustbe, messageType.critical);
            return false;
        };
        if ($(headerId + 'radCustClass').jqxRadioButton('checked')) {
            if ($(headerId + 'csCustClass').csList('codeNo') == '') {
                messageBox(options.language.CustClassMustbe, messageType.critical);
                return false;
            };
        } else {
            if ($(headerId + 'csChargeType').csList('codeNo') == '') {
                messageBox(options.language.ClctAttribMustbe, messageType.critical);
                return false;
            };
        };
        return true;
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
            if (options.parameters[paraTableName] == undefined) {
                messageBox(options.language.NoInData, messageType.critical);
                return;
            };
            if (options.parameters[paraTableName].rows.length == 0) {
                messageBox(options.language.NoDataByBuilding, messageType.critical);
                return;
            };
            load_data(div, function () {
                Check_Adject_Type(div);
                addHandler(div);
            });
         
        } catch (err) {
            errorHandle(formName, 'initData', err);

        } finally {
            if ($.isFunction(action)) { action(); };
        }
    };
    function Check_Adject_Type(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'csCustClass').csList('clearDisplayValue');
        $(headerId + 'csChargeType').csList('clearDisplayValue');
        if ($(headerId + 'radCustClass').jqxRadioButton('checked')) {
            $(headerId + 'csCustClass').csList('disabled', false);
            $(headerId + 'csChargeType').csList('disabled', true);
        } else {
            $(headerId + 'csCustClass').csList('disabled', true);
            $(headerId + 'csChargeType').csList('disabled', false);
        };
        if ($.isFunction(action)) { action() };
    };
    function load_data(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            
            var parameters = $.extend({}, copyLoginInfo );

            var params = getParameters(riadllName,
                   riaClassName,
                   'Load_Codes_E',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var d = JSON.parse(data.ResultXML);
                            $(headerId + 'csServiceType').csList('source', d.Query_CD046.rows);
                            $(headerId + 'csServiceType').csList('codeNo', 'C');
                            $(headerId + 'ccMduName').csMulti('source', d.Query_MduIDs.rows);
                            $(headerId + 'ccCustStatus').csMulti('source', d.Query_CD035.rows);
                            $(headerId + 'ccCustClass').csMulti('source', d.Query_CD004.rows);
                            $(headerId + 'csCustClass').csList('source', d.Query_CD004.rows);
                            $(headerId + 'csChargeType').csList('source', d.Query_ClctAttribute.rows);
                            delete d;
                            d = null;
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);                           
                        };
                        
                    } catch (err) {
                        errorHandle(formName, 'Load_Codes_E-Server', err);                        
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
            
        }
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
                if (idStr.indexOf('ccMduName') >= 0) { return };
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