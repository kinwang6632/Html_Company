(function ($) {
    var formName = 'SO1120AA';
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
        }
    };

    $.fn.SO1120AA = function (method, param) {
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
                            options: $.extend({}, new defaults(), new SO1120AA(), method)
                        });
                        formLoaded(this);
                    }
                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1120AA_each', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1120AA', err);
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
            options.loginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
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

            disableChildControls(div, getControlObject(div, 'frmSO1120AA'), options.controls, flag);
        }
        catch (err) {
            errorHandle(formName, 'changeMode', err);
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
    };

    function rcdToScr(div) {
        try {
            var options = $.data(div, formName).options;
            var row = $.data(div, formName).options.initData['Facility'].rows[0];
            //txtMemorySize,txtPeripheral,txtPCCount
            getShowControlData(div, 'jqxInput', 'txtMemorySize', 'Facility', 'MemorySize')
            getShowControlData(div, 'jqxInput', 'txtPeripheral', 'Facility', 'Peripheral')
            getShowControlData(div, 'jqxInput', 'txtPCCount', 'Facility', 'PCCount')

            //getShowControlData(div, 'jqxCheckBox', 'chkNetCardFlag', 'Facility', 'NetCardFlag')

            //txtOS, txtComputer , txtBrowser, cboNetCardSpeed, txtMailSystem
            getShowControlData(div, 'csList', 'txtOS', 'Facility', 'OS')
            getShowControlData(div, 'csList', 'txtComputer', 'Facility', 'Computer')
            getShowControlData(div, 'csList', 'txtBrowser', 'Facility', 'Browser')
            getShowControlData(div, 'csList', 'cboNetCardSpeed', 'Facility', 'NetCardSpeed')
            getShowControlData(div, 'csList', 'txtMailSystem', 'Facility', 'MailSystem')

        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    };

    function getShowControlData(div, controlType, controlName, tableName, dataName) {
        var row = $.data(div, formName).options.initData[tableName].rows[0];
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
                    brack;
                case "".toUpperCase():

                    brack;
            }
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
            nameArray = ["cboPortNo"];
            oHightArray = [20];
            oWidthArray = [140];
            var oCodeNoWidth = [20];
            var oMaxLength = [5];
            //readerPushcsList(div, nameArray, oHightArray, oWidthArray, oCodeNoWidth, oMaxLength, 1);
            
            //建立Input
            nameArray = ["txtMemorySize", "txtPCCount", "txtPeripheral"];
            oHightArray = [20, 20, 20];
            oWidthArray = [140, 140, 140];
            readerPushInput(div, nameArray, oHightArray, oWidthArray, 1)

            //建立csDateTime
            nameArray = ["dteContDate"];
            oHightArray = [23];
            oWidthArray = [140];
            var oFormatStreem = [];
            var oDisabled = [];
            var oShowButton = [];
            //readerPushDateTime(div, nameArray, oHightArray, oWidthArray, oFormatStreem, oDisabled, oShowButton, 1)
            
            //建立CheckBox
            nameArray = ["chkNetCardFlag"];
            oHightArray = [23];
            oWidthArray = [150];
            readerPushCheckBox(div, nameArray, oHightArray, oWidthArray, 1)

            //建立DropDownList  ,這個比特殊只能一次一個，不能多個設定，因為要餵資料的問題。
            var oConent = [{ value: "Windows 95/98", label: "Windows 95/98" },
                           { value: "Windows 2000", label: "Windows 2000" },
                           { value: "Windows XP", label: "Windows XP" },
                           { value: "Windows 2003", label: "Windows 2003" },
                           { value: "Windows 2008", label: "Windows 2008" },
                           { value: "Windows 7", label: "Windows 7" },
                           { value: "Windows 8", label: "Windows 8" },
                           { value: "Windows 10", label: "Windows 10" },
                           { value: "Windows 2012", label: "Windows 2012" },
                           { value: "Windows 2016", label: "Windows 2016" },
                           { value: "Linux", label: "Linux" },
                           { value: "Others", label: "Others" }];
            readerPushDropDownList(div, "txtOS", 23, 150, oConent, 1)
            oConent = [{ value: "PC", label: "PC" },
                           { value: "Notebook", label: "Notebook" },
                           { value: "Mac", label: "Mac" },
                           { value: "Others", label: "Others" }];
            readerPushDropDownList(div, "txtComputer", 23, 150, oConent, 1)
            oConent = [{ value: "Explorer", label: "Explorer" },
                           { value: "Netscape", label: "Netscape" },
                           { value: "Mozilla Firefox", label: "Mozilla Firefox" },
                           { value: "Google Chrome", label: "Google Chrome" },
                           { value: "Opera", label: "Opera" },
                           { value: "Safari", label: "Safari" },
                           { value: "Others", label: "Others" }];
            readerPushDropDownList(div, "txtBrowser", 23, 150, oConent, 1)
            oConent = [{ value: "10", label: "10" },
                           { value: "100", label: "100" },
                           { value: "1000", label: "1000" },
                           { value: "Others", label: "Others" }];
            readerPushDropDownList(div, "cboNetCardSpeed", 23, 150, oConent, 1)
            oConent = [{ value: "OutLook", label: "OutLook" },
                           { value: "Lotus Notes", label: "Lotus Notes" },
                           { value: "Netscape Navigator", label: "Netscape Navigator" },
                           { value: "Others", label: "Others" }];
            readerPushDropDownList(div, "txtMailSystem", 23, 150, oConent, 1)


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