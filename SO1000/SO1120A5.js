(function ($) {
    var formName = 'SO1120A5';
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

    $.fn.SO1120A5 = function (method, param) {
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
                            options: $.extend({}, new defaults(), new SO1120A5(), method)
                        });
                        formLoaded(this);
                    }
                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1120A5_each', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1120A5', err);
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
            destroyControls(controls);
            var options = $.data(div, formName).options
            options.length = 0;
            options = null;
            $.data(div, formName, null);
            $(div).off();
            //$(div).remove();
            return true;
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
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            $(div).trigger('loaded');
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });
            //$.ajax({
            //    url: 'SO1000\\' + formName + '.html',
            //    type: "get",
            //    datatype: 'html',
            //    success: function (msg) {
            //        try {
            //            $(div).html(msg);
            //            changeElementId(div);
            //            init(div, function () {
            //                $(div).trigger('loaded');
            //            });
            //        }
            //        catch (err) {
            //            errorHandle(formName, 'getData', err);
            //        }
            //    },
            //    error: function (xhr, ajaxOptions, thrownError) {
            //        var param = options;
            //        if (param['loadError']) {
            //            param['loadError'](xhr, ajaxOptions, thrownError);
            //        }
            //        else {
            //            messageBox('error status:' + xhr.status + ', thrownError:' + thrownError, messageType.critical);
            //        }
            //    }
            //});
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

            disableChildControls(div, getControlObject(div, 'frmSO1120A5'), options.controls, flag);
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
        rcdToScr(div);
        changeMode(div, $.data(div, formName).options.editMode);
        //$(options.container).on('resize', function () {
        //    formResize(div);
        //});
        //getServCode(div, function (r) {
        //    initServCode(div);
        //    action();
        //});
        action(true);
    };

    function getShowControlData(div, controlType, controlName, tableName, dataName) {
        var row = $.data(div, formName).options.initData[tableName].rows[0];
        if (row != null) {
            if (row[dataName.toUpperCase()] != null) {
                switch (controlType.toUpperCase()) {
                    case 'TEXT'.toUpperCase():
                        getControlObject(div, controlName).text(convertNullToString(row[dataName.toUpperCase()]));
                        break;
                    case 'jqxInput'.toUpperCase():
                        getControlObject(div, controlName).jqxInput('val', row[dataName.toUpperCase()]);
                        break;
                    case "csList".toUpperCase():
                        getControlObject(div, controlName).csList('codeNo', row[dataName.toUpperCase()]);
                        break;
                    case 'csDateTime'.toUpperCase():
                        getControlObject(div, controlName).csDateTime('setDate', row[dataName.toUpperCase()]);
                        break;
                    case 'jqxCheckBox'.toUpperCase():
                        getControlObject(div, controlName).jqxCheckBox('val', row[dataName.toUpperCase()] == 1);
                        break;
                    case 'DropDownList'.toUpperCase():
                        getControlObject(div, controlName).jqxDropDownList('selectItem', row[dataName.toUpperCase()]);
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
            //txtGateway,txtTFNServiceID,txtRGID,cboPortNo,txtNOCINIT,txtEMNo,txtEBTContNo
            getShowControlData(div, 'jqxInput', 'txtGateway', 'Facility', 'Gateway')
            getShowControlData(div, 'jqxInput', 'txtTFNServiceID', 'Facility', 'TFNServiceID')
            getShowControlData(div, 'jqxInput', 'txtRGID', 'Facility', 'RGID')
            getShowControlData(div, 'jqxInput', 'txtNOCINIT', 'Facility', 'NOCINIT')
            getShowControlData(div, 'jqxInput', 'txtEMNo', 'Facility', 'EMNo')
            getShowControlData(div, 'jqxInput', 'txtEBTContNo', 'Facility', 'EBTContNo')
            getShowControlData(div, 'DropDownList', 'cboPortNo', 'Facility', 'PortNo')
            //getShowControlData(div, 'jqxCheckBox', 'chkCPList', 'Facility', 'CPList')
            
            //dteContDate
            getShowControlData(div, 'csDateTime', 'dteContDate', 'Facility', 'ContDate')
        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    };

    function scrToRcd(div) {
        try {
            var options = $.data(div, formName).options;
            var row = {};
            var row = options.initData['Facility'].rows[0];

            row["Gateway".toUpperCase()] = convertToNull(getControlObject(div, 'txtGateway').val());
            row["TFNServiceID".toUpperCase()] = convertToNull(getControlObject(div, 'txtTFNServiceID').val());
            row["RGID".toUpperCase()] = convertToNull(getControlObject(div, 'txtRGID').val());
            row["PortNo".toUpperCase()] = convertToNull(getControlObject(div, 'cboPortNo').val());
            row["NOCINIT".toUpperCase()] = convertToNull(getControlObject(div, 'txtNOCINIT').val());
            row["EMNo".toUpperCase()] = convertToNull(getControlObject(div, 'txtEMNo').val());
            row["EBTContNo".toUpperCase()] = convertToNull(getControlObject(div, 'txtEBTContNo').val());

            row["ContDate".toUpperCase()] = convertToNull(getControlObject(div, 'dteContDate').csDateTime('getDate'));
        }
        catch (err) {
            errorHandle(formName, 'scrToRcd', err);
        }
    };

    function changeLanguage(div) {
        try {
            var lang = $.data(div, formName).options.language;
            var keys = Object.keys(lang);
            var kLength = keys.length;
            //改label
            for (var i = 0 ; i < kLength; i++) {
                var o = $('#' + $(div).prop('id') + keys[i]);
                if (o.length > 0 && keys[i].substr(0, 1) == 'l') {
                    o.text(lang[keys[i]]);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'changeLanguage', err);
        }
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
                    source:countries,
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
            //readerPushPanel(div, nameArray.split(","), oHightArray.split(","), oWidthArray.split(","), 0)

            //建立csList
            nameArray = ["cboPortNo"];
            oHightArray = [20];
            oWidthArray = [140];
            var oCodeNoWidth = [20];
            var oMaxLength = [5];
            //readerPushcsList(div, nameArray.split(","), oHightArray.split(","), oWidthArray.split(","), oCodeNoWidth.split(","), oMaxLength.split(","), 1);
            
            //建立Input
            nameArray = ["txtGateway", "txtTFNServiceID", "txtEMNo", "txtRGID", "txtNOCINIT", "txtEBTContNo"];
            oHightArray = [20, 20, 20, 20, 20, 20];
            oWidthArray = [140, 140, 140, 140, 140, 140];
            readerPushInput(div, nameArray, oHightArray, oWidthArray, 1)

            //建立csDateTime
            nameArray = ["dteContDate"];
            oHightArray = [20];
            oWidthArray = [140];
            var oFormatStreem = [];
            var oDisabled = [];
            var oShowButton = [];
            readerPushDateTime(div, nameArray, oHightArray, oWidthArray, oFormatStreem, oDisabled, oShowButton, 1)
            
            //建立CheckBox
            nameArray = ["chkCPList"];
            oHightArray = [20];
            oWidthArray = [150];
            readerPushCheckBox(div, nameArray, oHightArray, oWidthArray, 1)

            //建立DropDownList  ,這個比特殊只能一次一個，不能多個設定，因為要餵資料的問題。
            var oConent = [{ value: "1", label: "1" },
                           { value: "2", label: "2" }];
            readerPushDropDownList(div, "cboPortNo", 23, 150, oConent, 1)

            


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