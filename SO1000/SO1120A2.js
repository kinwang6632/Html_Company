(function ($) {
    var formName = 'SO1120A2';
    var riadllName = 'CableSoft.SO.RIA.Facility.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Facility.Web.Facility';
    var buttonsHeight = 26;
    
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
        this.isOK = false;
        this.theme = $.jqx.theme;
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
        changeEditMode: function (jq, params) {
            return jq.each(function () {
                changeMode(this, params);
            });
        },
        subTabSave: function (jq, params) {
            return jq.each(function () {
                scrToRcd(this, params);
            });
        }
    };

    $.fn.SO1120A2 = function (method, param) {
        try {
            if (typeof method == 'string') {
                if (methods[method]) {
                    return methods[method](this, param);
                }
                return;
            }
            method = method || {};
            return this.each(function () {
                try {
                    var state = $.data(this, formName);
                    if (state) {
                        $.extend(state.options, method);
                    }
                    else {
                        $.data(this, formName, {
                            options: $.extend({}, new defaults(), new SO1120A2(), method)
                        });
                        formLoaded(this);
                    }
                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1120A2_each', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1120A2', err);
        }
    };

    function setTheme(div, params) {
        var controls = $.data(div, formName).options.controls;
        for (i = 0; i < controls.length; i++) {
            var o = $('#' + $(div).prop('id') + controls[i].name);
            if (o.length > 0) {
                $(o[0])[controls[i].type]({ theme: params });
            }
            //$($(div).find('[data-id=codeno]')[0])
        }
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
            }
            var options = $.data(div, formName).options;
            options.length = 0;
            options = null;
            delete options;
            $.data(div, formName, null);
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };

    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed'](options.returnValue);
        }
        $(options['container']).jqxWindow('close');
    };

    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            //options.loginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            $.ajax({
                url: 'SO1000\\' + formName + '.html',
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            $(div).trigger('loaded');
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'getData', err);
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

    function getControlObject(div, name) {
        return $('#' + $(div).prop('id') + name);
    };

    function changeMode(div, em) {
        try {
            var options = $.data(div, formName).options;
            var editText = '';
            var flag = true;
            var newFlag = false;
            options.editMode = em;
            switch (em) {
                case editMode.view:
                    editText = options.language.view;
                    break;
                case editMode.edit:
                    editText = options.language.edit;
                    flag = false;
                    break;
                case editMode.append:
                    editText = options.language.append;
                    newFlag = true;
                    flag = false;
                    break;
            }

            disableChildControls(div, getControlObject(div, 'TabCont'), options.controls, flag);
            disableChildControls(div, getControlObject(div, 'TabAgent'), options.controls, flag);
        }
        catch (err) {
            errorHandle(formName, 'changeMode', err);
        }
    };

    function disableChildControls(div, element, controls, flag) {
        try {
            disabledCon($(element).prop('id'), controls, flag);
            var children = $(element).find('[data-id]');
            var cLength = children.length;
            var ctLength = controls.length;
            for (var i = 0 ; i < cLength; i++) {
                disabledCon($(div).prop('id') + $(children[i]).attr('data-id'), controls, flag);
            }
        }
        catch (err) {
            errorHandle(formName, 'disableChildControls', err);
        }
        function disabledCon(name, controls, flag) {
            try {
                for (var j = 0; j < ctLength; j++) {
                    if (name == controls[j].name) {
                        controls[j]['disabled'] = flag;
                        if (controls[j].type == 'jqxPanel' || controls[j].type == 'jqxExpander') {
                            $('#' + controls[j].name)[controls[j].type]({ disabled: flag });
                            disableChildControls($('#' + controls[j].name), controls, flag);
                        }
                        else if (controls[j].type.indexOf('jqx') >= 0) {
                            $('#' + controls[j].name)[controls[j].type]({ disabled: flag });
                        }
                        else {
                            $('#' + controls[j].name)[controls[j].type]('disabled', flag);
                        }
                        break;
                    }
                }
            }
            catch (err) {
                errorHandle(formName, 'disabledCon', err);
            }
        }
    };

    function init(div, action) {
        changeLanguage(div);
        renderControl(div);
        initcsListData(div);
        rcdToScr(div);
        changeMode(div, $.data(div, formName).options.editMode);
        action(true);
    };

    function initcsListData(div) {
        try {
            var options = $.data(div, formName).options;
            //csDEReasonCode, csInstEn1, csPREn1, csInstEn2, csPREn2, csMediaCode, csIntroId
            getControlObject(div, 'csIDKindCode2').csList('source', options.initData['IDKind3'].rows);
            getControlObject(div, 'csIDKindCode3').csList('source', options.initData['IDKind2'].rows);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initcsListData', err);
        }
    };

    function getShowControlData(div, controlType, controlName, tableName, dataName) {
        var row = $.data(div, formName).options.initData[tableName].rows[0];
        if (row != null) {
            if (row[dataName.toUpperCase()] != null) {
                switch (controlType.toUpperCase()) {
                    case "TEXT".toUpperCase():
                        getControlObject(div, controlName).text(convertNullToString(row[dataName.toUpperCase()]));
                        break;
                    case "jqxInput".toUpperCase():
                        getControlObject(div, controlName).jqxInput('val', row[dataName.toUpperCase()]);
                        break;
                    case "csList".toUpperCase():
                        getControlObject(div, controlName).csList('codeNo', row[dataName.toUpperCase()]);
                        break;
                    case "csDateTime".toUpperCase():
                        getControlObject(div, controlName).csDateTime('setDate', row[dataName.toUpperCase()]);
                        break;
                    case "jqxCheckBox".toUpperCase():
                        getControlObject(div, controlName).jqxCheckBox('val', row[dataName.toUpperCase()] == 1);
                        break;
                    case "jqxDropDownList".toUpperCase():
                        getControlObject(div, controlName).jqxDropDownList('val', row[dataName.toUpperCase()] );
                        break;
                    case "".toUpperCase():

                        break;
                }
            }
        }
    };

    function rcdToScr(div) {
        try {
            var options = $.data(div, formName).options;
            var row = $.data(div, formName).options.initData['Facility'].rows[0];
            //txtContName2,txtContTel2,txtID3,txtDOMICILEADDRESS3,txtAgentName,txtAgentTel,txtAgentID,txtDomicileAddress2
            getShowControlData(div, 'jqxInput', 'txtContName2', 'Facility', 'ContName2')
            getShowControlData(div, 'jqxInput', 'txtContTel2', 'Facility', 'ContTel2')
            getShowControlData(div, 'jqxInput', 'txtID3', 'Facility', 'ID3')
            getShowControlData(div, 'jqxInput', 'txtDOMICILEADDRESS3', 'Facility', 'DOMICILEADDRESS3')
            getShowControlData(div, 'jqxInput', 'txtAgentName', 'Facility', 'AgentName')
            getShowControlData(div, 'jqxInput', 'txtAgentTel', 'Facility', 'AgentTel')
            getShowControlData(div, 'jqxInput', 'txtAgentID', 'Facility', 'AgentID')
            getShowControlData(div, 'jqxInput', 'txtDomicileAddress2', 'Facility', 'DomicileAddress2')
            
            //csIDKindCode2,csIDKindCode3
            getShowControlData(div, 'csList', 'csIDKindCode2', 'Facility', 'IDKindCode2')
            getShowControlData(div, 'csList', 'csIDKindCode3', 'Facility', 'IDKindCode3')
            
            //dteAgentBirthDay,dteContTelBirthDay,dteContTime1,dteContTime2
            getShowControlData(div, 'csDateTime', 'dteAgentBirthDay', 'Facility', 'AgentBirthDay')
            getShowControlData(div, 'csDateTime', 'dteContTelBirthDay', 'Facility', 'ContTelBirthDay')
            getShowControlData(div, 'csDateTime', 'dteContTime1', 'Facility', 'ContTime1')
            getShowControlData(div, 'csDateTime', 'dteContTime2', 'Facility', 'ContTime2')
            
            //chkCPList

            //cboSextual2
            getShowControlData(div, 'jqxDropDownList', 'cboSextual2', 'Facility', 'Sextual2')
        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    };

    function scrToRcd(div) {
        try {
            var options = $.data(div, formName).options;
            var row = options.initData['Facility'].rows[0];
            
            row["ContName2".toUpperCase()] = convertToNull(getControlObject(div, 'txtContName2').val());
            row["ContTel2".toUpperCase()] = convertToNull(getControlObject(div, 'txtContTel2').val());
            row["ID3".toUpperCase()] = convertToNull(getControlObject(div, 'txtID3').val());
            row["DOMICILEADDRESS3".toUpperCase()] = convertToNull(getControlObject(div, 'txtDOMICILEADDRESS3').val());
            row["AgentName".toUpperCase()] = convertToNull(getControlObject(div, 'txtAgentName').val());
            row["AgentTel".toUpperCase()] = convertToNull(getControlObject(div, 'txtAgentTel').val());
            row["AgentID".toUpperCase()] = convertToNull(getControlObject(div, 'txtAgentID').val());
            row["DomicileAddress2".toUpperCase()] = convertToNull(getControlObject(div, 'txtDomicileAddress2').val());

            row["csIDKindCode2".toUpperCase()] = convertToNull(getControlObject(div, 'csIDKindCode2').csList('codeNo'));
            row["csIDKindName2".toUpperCase()] = convertToNull(getControlObject(div, 'csIDKindCode2').csList('description'));
            row["csIDKindCode3".toUpperCase()] = convertToNull(getControlObject(div, 'csIDKindCode3').csList('codeNo'));
            row["csIDKindName3".toUpperCase()] = convertToNull(getControlObject(div, 'csIDKindCode3').csList('description'));

            row["AgentBirthDay".toUpperCase()] = convertToNull(getControlObject(div, 'dteAgentBirthDay').csDateTime('getDate'));
            row["ContTelBirthDay".toUpperCase()] = convertToNull(getControlObject(div, 'dteContTelBirthDay').csDateTime('getDate'));
            row["ContTime1".toUpperCase()] = convertToNull(getControlObject(div, 'dteContTime1').csDateTime('getDate'));
            row["ContTime2".toUpperCase()] = convertToNull(getControlObject(div, 'dteContTime2').csDateTime('getDate'));
            //chkCPList

            //cboSextual2
            row["Sextual2".toUpperCase()] = convertToNull(getControlObject(div, 'cboSextual2').jqxDropDownList('val'));
        }
        catch (err) {
            errorHandle(formName, 'scrToRcd', err);
        }
    };

    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        var arrays = ['txtbkInstSNO', 'txtbkDEReasonCode', 'txtbkPRSNO', 'txtbkInstDate', 'txtbkGetDate',
                      'txtbkPRDate', 'txtbkInstEn1', 'txtbkOpenDate', 'txtbkPREn1', 'txtbkInstEn2', 'txtbkCloseDate',
                      'txtbkPREn2', 'txtbkMediaCode', 'txtbkIntroId', 'txtbkSEQNO'];
        $.each(arrays, function (idx, val) {
            $('#' + $(div).prop('id') + val).text(lang[val]);
        });
        //alert(JSON.stringify($.data(div, formName).options.language));
    };

    function readerPushTabs(div, nameArray, oHightArray, oWidthArray, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        for (var i = 0 ; i < nameArray.length; i++) {
            if (nameArray[i] != "") {
                var iId = $(div).prop('id') + nameArray[i];
                getControlObject(div, nameArray[i]).jqxTabs({
                    theme: options.theme,
                    position: 'top',
                    height: oHightArray[i],
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'jqxTabs', level: levelno });
            }
        }
    };

    function readerPushPanel(div, nameArray, oHightArray, oWidthArray, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        for (var i = 0 ; i < nameArray.length; i++) {
            var iId = $(div).prop('id') + nameArray[i];
            getControlObject(div, nameArray[i]).jqxPanel({
                theme: options.theme,
                height: oHightArray[i],
                width: oWidthArray[i],
                autoUpdate: true
            });
            controls.push({ name: iId, type: 'jqxPanel', level: 0 });
            //2016.11.04 Jakcy跟我說這個隱藏卷軸的功能有BUG不要用
            //var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
            //for (var j = 0; j < scrollBars.length; j++) {
            //    if ($('#' + iId + scrollBars[j]).length > 0) {
            //        $('#' + iId + scrollBars[j]).remove();
            //    }
            //}
        }
    }

    function readerPushInput(div, nameArray, oHightArray, oWidthArray, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        for (var i = 0 ; i < nameArray.length; i++) {
            if (nameArray[i] != "") {
                var iId = $(div).prop('id') + nameArray[i];
                getControlObject(div, nameArray[i]).jqxInput({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'jqxInput', level: levelno });
            }
        }
    };

    function readerPushCheckBox(div, nameArray, oHightArray, oWidthArray, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        for (var i = 0 ; i < nameArray.length; i++) {
            if (nameArray[i] != "") {
                var iId = $(div).prop('id') + nameArray[i];
                getControlObject(div, nameArray[i]).jqxCheckBox({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'jqxCheckBox', level: levelno });
            }
        }
    };

    function readerPushDropDownList(div, nameArray, oHightArray, oWidthArray, countries, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var iId = $(div).prop('id') + nameArray;
        getControlObject(div, nameArray).jqxDropDownList({
            //theme: options.theme,
            selectedIndex: 0,
            source: countries,
            height: oHightArray,
            width: oWidthArray
        });
        controls.push({ name: iId, type: 'jqxDropDownList', level: levelno });
    };

    function readerPushcsList(div, nameArray, oHightArray, oWidthArray, oCodeNoWidth, oMaxLength, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        for (var i = 0 ; i < nameArray.length; i++) {
            if (nameArray[i] != "") {
                var iId = $(div).prop('id') + nameArray[i];
                getControlObject(div, nameArray[i]).csList({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    codeNoWidth: oCodeNoWidth[i],
                    maxLength: oMaxLength[i],
                    autoUpdate: true
                });
                controls.push({ name: iId, type: 'csList', level: levelno });
            }
        }
    };

    function readerPushDateTime(div, nameArray, oHightArray, oWidthArray, oFormatStreem, oDisabled, oShowButton, levelno) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        for (var i = 0 ; i < nameArray.length; i++) {
            if (nameArray[i] != "") {
                var iId = $(div).prop('id') + nameArray[i];
                var oDisable = false;
                var oShowCalendarButton = false;
                var setFS = "yyyy/MM/dd HH:mm";
                switch (oFormatStreem[i]) {
                    case "HM":
                        setFS = "HH:mm";
                        break;
                    case "YMD":
                        setFS = "yyyy/MM/dd";
                        break;
                }
                if (oDisabled[i] == 'T') {
                    oDisable = true;
                };
                if (oShowButton[i] == 'T') {
                    oShowCalendarButton = true;
                };
                getControlObject(div, nameArray[i]).csDateTime({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    formatString: setFS,
                    disabled: oDisable,
                    showCalendarButton: oShowCalendarButton,
                    value: null
                });
                controls.push({ name: iId, type: 'csDateTime', level: levelno });
            }
        }
    };

    function renderControl(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var lang = options.language;
            var height = $(div).innerHeight();

            //建立Panel
            var nameArray = [];
            var oHightArray = [];
            var oWidthArray = [];
            //readerPushPanel(div, nameArray, oHightArray, oWidthArray, 0)

            //建立csList
            nameArray = ["csIDKindCode2", "csIDKindCode3"];
            oHightArray = [20, 20];
            oWidthArray = [140, 140];
            var oCodeNoWidth = [40, 40];
            var oMaxLength = [5, 5];
            readerPushcsList(div, nameArray, oHightArray, oWidthArray, oCodeNoWidth, oMaxLength, 1);

            //建立Input
            nameArray = ["txtContName2", "txtContTel2", "txtID3", "txtDOMICILEADDRESS3", "txtAgentName", "txtAgentTel", "txtAgentID", "txtDomicileAddress2"];
            oHightArray = [20, 20, 20, 20, 20, 20, 20, 20];
            oWidthArray = [140, 140, 140, 450, 140, 140, 140, 450];
            readerPushInput(div, nameArray, oHightArray, oWidthArray, 1)

            //建立csDateTime
            nameArray = ["dteAgentBirthDay", "dteContTelBirthDay", "dteContTime1", "dteContTime2"];
            oHightArray = [20, 20, 20, 20];
            oWidthArray = [140, 140, 50, 50];
            var oFormatStreem = ["", "", "HM", "HM"];
            var oDisabled = ["", "", "", ""];
            var oShowButton = ["", "", "", ""];
            readerPushDateTime(div, nameArray, oHightArray, oWidthArray, oFormatStreem, oDisabled, oShowButton, 1)

            //建立CheckBox
            nameArray = ["chkCPList"];
            oHightArray = [20];
            oWidthArray = [150];
            //readerPushCheckBox(div, nameArray, oHightArray, oWidthArray, 1)

            //建立DropDownList  ,這個比特殊只能一次一個，不能多個設定，因為要餵資料的問題。
            var oConent = [{ value: "0", label: "女" },
                           { value: "1", label: "男" },
                           { value: "2", label: "不提供" }];
            readerPushDropDownList(div, "cboSextual2", 23, 150, oConent, 1)

            nameArray = "TabDeclarantDetail"
            oHightArray = "150"
            oWidthArray = "99%"
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var iId = $(div).prop('id') + nameArray;
            getControlObject(div, nameArray).jqxTabs({
                height: oHightArray,
                width: oWidthArray
            });
            controls.push({ name: iId, type: 'jqxTabs', level: 0 });

            //var btnarrays = ['QueryButton', 'OKButton', 'CancelButton'];
            //$.each(btnarrays, function (idx, val) {
            //    var o = $('#' + $(div).prop('id') + val);
            //    var img = {};
            //    switch (val) {
            //        case "OKButton":
            //            img = imageScr.save;
            //            break;
            //        case "QueryButton":
            //            img = imageScr.query;
            //            break;
            //        case "CancelButton":
            //            img = imageScr.exit;
            //            break;
            //    }
            //    o.text(lang[val]);
            //    o.jqxButton($.extend({}, img, imagePosition, {
            //        theme: options.theme,
            //        width: 100,
            //        height: 25
            //    }));
            //    controls.push({ name: val, type: 'jqxButton', level: 1 });



            //增加事件
            //addControlHandler(div);
            //處理GRID 畫面資料
            //renderGrid(div);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
})(jQuery);