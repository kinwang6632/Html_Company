(function ($) {
    var formName = 'SO1120A1';
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
        this.dtTemp = {};
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

    //委派csList 事件
    function listAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //介紹媒介
            csMediaCode_selectedIndexChanged(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    }
    function disableAll(div, flag) {
        var gId = $(div).prop('id') + 'gbxAll';
        $('#' + gId).jqxSplitter({ disabled: flag });
    }
    function getQueryIntro(div, action) {
        var options = $.data(div, formName).options;

        var paraLoginInfo = getParaLoginInfo(div);
        var parameters = $.extend({}, paraLoginInfo, {
            mediaCode: { type: 'integer', value: options.mediaCodeRow['CODENO'] }
        });
        var params = getParameters(riadllName,
            riaClassName,
            'QueryIntro',
            JSON.stringify(parameters));
        getServerData(params, {
            success: function (data) {
                try {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        var r = JSON.parse(data.ResultXML);
                        options.introIdData = r[Object.keys[0]];
                    }
                    var flag = data.ResultBoolean;
                    var msg = data.ErrorMessage;
                    delete data;
                    action([flag, msg]);
                }
                catch (err) {
                    errorHandle(formName, 'getQueryIntro_success', err);
                    action([false]);
                }
            }
        });
    };
    //介紹媒介改變
    function csMediaCode_selectedIndexChanged(div) {
        getControlObject(div, 'csMediaCode').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var value = $(this).csList('codeNo');
                if (value == null || value.length == 0) {
                    options.mediaCodeRow = null;
                    disableIntro(false);
                    return false;
                }
                else {
                    var oRow = options.mediaCodeRow;
                    options.mediaCodeRow = getRowByKeyValue(options.initData['MediaCode'].rows, 'CODENO', value);
                    disableIntro(options.mediaCodeRow['REFNO'] != null && options.mediaCodeRow['REFNO'] > 0);
                    if ((oRow == null || oRow['REFNO'] != options.mediaCodeRow['REFNO']) && options.mediaCodeRow['REFNO'] > 1) {
                        //getControlObject(div, 'tIntroId').val(null);
                        //getControlObject(div, 'tIntroName').val(null);
                        getControlObject(div, 'csIntroId').csList('clearDisplayValue');
                        disableAll(div, true);
                        getQueryIntro(div, function (d) {
                            if (d[0] == false) {
                                messageBox(d[1]);
                            }
                            disableAll(div, false);
                        });
                    }
                }
            }
            catch (err) {
                errorHandle(formName, 'csMediaCode_selectedIndexChanged', err);
            }
        });
        function disableIntro(flag) {
            getControlObject(div, 'tIntroName').jqxInput({ disabled: flag });
            getControlObject(div, 'btnFindIntro').jqxButton({ disabled: !flag });
        }
    };

    $.fn.SO1120A1 = function (method, param) {
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
                            options: $.extend({}, new defaults(), new SO1120A1(), method)
                        });
                        formLoaded(this);
                    }
                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1120A1_each', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1120A1', err);
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
                            HandlerAdd_Date(div);
                            HandlerAdd_List(div);
                            HandlerAdd_Text(div);
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

    function HandlerAdd_List(div) {
        try {
            //介紹媒體
            //getControlObject(div, 'csMediaCode').on('selectedIndexChanged', function () {
            //    var selItem = getControlObject(div, 'csMediaCode').csList('selectedItem');
            //});
            return true;
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    }
    
    function HandlerAdd_Text(div) {
        try {
            //介紹人
            getControlObject(div, 'txtIntroId').on('blur', function () {
                var selItem = getControlObject(div, 'csMediaCode').csList('selectedItem');
                getIntroId(div, selItem.REFNO, convertToNull(getControlObject(div, 'txtIntroId').val()))
            });
            return true;
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    }
    //委派日期元件事件
    function HandlerAdd_Date(div) {
        try {
            var options = $.data(div, formName).options;
            var GetNowDate = function (controlName) {
                var getDateTime = getControlObject(div, controlName).csDateTime('getDate');
                if (getDateTime == null) {
                    getControlObject(div, controlName).csDateTime('setDate', formatDateTime(new Date(), 'datetime2'));
                };
            }

            //dteInstDate, dteGetDate, dtePRDate, dteOpenDate, dteCloseDate
            getControlObject(div, 'dteInstDate').on('focus', function () {
                GetNowDate("dteInstDate")
            });
            getControlObject(div, 'dtePRDate').on('focus', function () {
                GetNowDate("dtePRDate")
            });
            getControlObject(div, 'dteGetDate').on('focus', function () {
                GetNowDate("dteGetDate")
            });
            getControlObject(div, 'dteOpenDate').on('focus', function () {
                GetNowDate("dteOpenDate")
            });
            getControlObject(div, 'dteCloseDate').on('focus', function () {
                GetNowDate("dteCloseDate")
            });

            return true;
        }
        catch (err) {
            errorHandle(formName, 'HandlerAdd_Date', err);
        }
    };

    function getIntroId(div, MediaRefNo, IntroId) {
        try {
            if (MediaRefNo == 0) {
                if (!isEmpty(getControlObject(div, 'csMediaCode').csList('codeNo'))) {
                    var selItem = getControlObject(div, 'csMediaCode').csList('selectedItem');
                    MediaRefNo=selItem.REFNO
                }                
                if (MediaRefNo == 0) { return true; }
            }
            if (isEmpty(IntroId)) {
                return true;
            }

            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo,{
                MediaRefNo: { type: 'Integer', value: MediaRefNo },
                IntroId: { type: 'string', value: IntroId }
                });
            var params = getParameters(riadllName,
                riaClassName,
                'GetIntroId',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ErrorCode == 0) {
                        var rT = JSON.parse(data.ResultXML);
                        var rtLength = rT.Table.rows.length;
                        if (rtLength > 0) {
                            var row = rT.Table.rows[0];
                            getControlObject(div, "txtIntroId1").jqxInput('val',convertNullToString(row["Description".toUpperCase()]));
                        } else {
                            getControlObject(div, "txtIntroId").jqxInput('val',"");
                        };
                    }
                    return true;
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getIntroId', err);
        }
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
            disableChildControls(div, getControlObject(div, 'frmSO1120A1'), options.controls, flag);
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
            getControlObject(div, 'csDEReasonCode').csList('source', options.initData['DeReasonCode'].rows);
            getControlObject(div, 'csInstEn1').csList('source', options.initData['InstEn1'].rows);
            getControlObject(div, 'csPREn1').csList('source', options.initData['PREn1'].rows);
            getControlObject(div, 'csInstEn2').csList('source', options.initData['InstEn2'].rows);
            getControlObject(div, 'csPREn2').csList('source', options.initData['PREn2'].rows);
            getControlObject(div, 'csMediaCode').csList('source', options.initData['MediaCode'].rows);
            //*getControlObject(div, 'csIntroId').csList('source', options.initData['IntroId'].rows);
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
            //txtInstSNO, txtPRSNO, txtSEQNO
            getShowControlData(div, 'jqxInput', 'txtInstSNO', 'Facility', 'SNO')
            getShowControlData(div, 'jqxInput', 'txtPRSNO', 'Facility', 'PRSNO')
            getShowControlData(div, 'jqxInput', 'txtSEQNO', 'Facility', 'SEQNO')
            
            //csDEReasonCode, csInstEn1, csPREn1, csInstEn2, csPREn2, csMediaCode, csIntroId
            getShowControlData(div, 'csList', 'csDEReasonCode', 'Facility', 'DEReasonCode')
            getShowControlData(div, 'csList', 'csInstEn1', 'Facility', 'InstEn1')
            getShowControlData(div, 'csList', 'csPREn1', 'Facility', 'PREn1')
            getShowControlData(div, 'csList', 'csInstEn2', 'Facility', 'InstEn2')
            getShowControlData(div, 'csList', 'csPREn2', 'Facility', 'PREn2')
            getShowControlData(div, 'csList', 'csMediaCode', 'Facility', 'MediaCode')
            //getShowControlData(div, 'csList', 'csIntroId', 'Facility', 'IntroId')

            //dteInstDate, dteGetDate, dtePRDate, dteOpenDate, dteCloseDate
            getShowControlData(div, 'csDateTime', 'dteInstDate', 'Facility', 'InstDate')
            getShowControlData(div, 'csDateTime', 'dteGetDate', 'Facility', 'GetDate')
            getShowControlData(div, 'csDateTime', 'dtePRDate', 'Facility', 'PRDate')
            getShowControlData(div, 'csDateTime', 'dteOpenDate', 'Facility', 'CMOpenDate')
            getShowControlData(div, 'csDateTime', 'dteCloseDate', 'Facility', 'CMCloseDate')
        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    };

    function scrToRcd(div) {
        try {
            var options = $.data(div, formName).options;
            var row = options.initData['Facility'].rows[0];

            row["InstSNO".toUpperCase()] = convertToNull(getControlObject(div, 'txtInstSNO').val());
            row["PRSNO".toUpperCase()] = convertToNull(getControlObject(div, 'txtPRSNO').val());
            //row["SEQNO".toUpperCase()] = convertToNull(getControlObject(div, 'txtSEQNO').val());

            row["DEReasonCode".toUpperCase()] = convertToNull(getControlObject(div, 'csDEReasonCode').csList('codeNo'));
            row["DEReasonName".toUpperCase()] = convertToNull(getControlObject(div, 'csDEReasonCode').csList('description'));
            row["InstEn1".toUpperCase()] = convertToNull(getControlObject(div, 'csInstEn1').csList('codeNo'));
            row["InstName1".toUpperCase()] = convertToNull(getControlObject(div, 'csInstEn1').csList('description'));
            row["InstEn2".toUpperCase()] = convertToNull(getControlObject(div, 'csInstEn2').csList('codeNo'));
            row["InstName2".toUpperCase()] = convertToNull(getControlObject(div, 'csInstEn2').csList('description'));
            row["PREn1".toUpperCase()] = convertToNull(getControlObject(div, 'csPREn1').csList('codeNo'));
            row["PRName1".toUpperCase()] = convertToNull(getControlObject(div, 'csPREn1').csList('description'));
            row["PREn2".toUpperCase()] = convertToNull(getControlObject(div, 'csPREn2').csList('codeNo'));
            row["PRName2".toUpperCase()] = convertToNull(getControlObject(div, 'csPREn2').csList('description'));
            row["MediaCode".toUpperCase()] = convertToNull(getControlObject(div, 'csMediaCode').csList('codeNo'));
            row["MediaName".toUpperCase()] = convertToNull(getControlObject(div, 'csMediaCode').csList('description'));
            
            row["InstDate".toUpperCase()] = convertToNull(getControlObject(div, 'dteInstDate').csDateTime('getDate'));
            row["GetDate".toUpperCase()] = convertToNull(getControlObject(div, 'dteGetDate').csDateTime('getDate'));
            row["PRDate".toUpperCase()] = convertToNull(getControlObject(div, 'dtePRDate').csDateTime('getDate'));
            row["CMOpenDate".toUpperCase()] = convertToNull(getControlObject(div, 'dteOpenDate').csDateTime('getDate'));
            row["CMCloseDate".toUpperCase()] = convertToNull(getControlObject(div, 'dteCloseDate').csDateTime('getDate'));

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

    function readerPushPanel(div, nameArray, oHightArray, oWidthArray, levelno) {
        try{
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
        } catch (err) {
            errorHandle(formName, 'readerPushPanel', err);
        }        
    }

    function readerPushInput(div, nameArray, oHightArray, oWidthArray, levelno) {
        try {
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
        } catch (err) {
            errorHandle(formName, 'readerPushInput', err);
        }        
    };

    function readerPushCheckBox(div, nameArray, oHightArray, oWidthArray, levelno) {
        try{
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
        } catch (err) {
            errorHandle(formName, 'readerPushCheckBox', err);
        }        
    };

    function readerPushcsList(div, nameArray, oHightArray, oWidthArray, oCodeNoWidth, oMaxLength, levelno) {
        try{
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
                        maxLength: oMaxLength[i]
                        //autoUpdate: true
                    });
                    controls.push({ name: iId, type: 'csList', level: levelno });
                }
            }
        } catch (err) {
            errorHandle(formName, 'readerPushcsList', err);
        }
    };

    function readerPushDateTime(div, nameArray, oHightArray, oWidthArray, oFormatStreem, oDisabled, oShowButton, levelno) {
        try{
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
        } catch (err) {
            errorHandle(formName, 'readerPushDateTime', err);
        }        
    };

    function renderControl(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var lang = options.language;
            var height = $(div).innerHeight();

            //建立Panel
            var nameArray = ["frmSO1120A1"];
            var oHightArray = [""];
            var oWidthArray = [""];
            //readerPushPanel(div, nameArray, oHightArray, oWidthArray, 0)

            //建立csList
            nameArray = ["csDEReasonCode", "csInstEn1", "csPREn1", "csInstEn2", "csPREn2", "csMediaCode"];
            oHightArray = [20, 20, 20, 20, 20, 20, 20];
            oWidthArray = [160, 160, 160, 160, 160, 160, 160];
            var oCodeNoWidth = [40, 40, 40, 40, 40, 40, 40];
            var oMaxLength = [5, 5, 5, 5, 5, 5, 5];
            readerPushcsList(div, nameArray, oHightArray, oWidthArray, oCodeNoWidth, oMaxLength, 1);
            //readerPushcsList(div, 'cboServiceType', 1, 160, 100, 23, 5)

            //建立Input
            nameArray = ["txtInstSNO", "txtPRSNO", "txtSEQNO", "txtIntroId", "txtIntroId1"];
            oHightArray = [20, 20, 20, 20, 20];
            oWidthArray = [160, 160, 160, 80, 80];
            readerPushInput(div, nameArray, oHightArray, oWidthArray, 1)

            //建立csDateTime
            nameArray = ["dteInstDate", "dteGetDate", "dtePRDate", "dteOpenDate", "dteCloseDate"];
            oHightArray = [20, 20, 20, 20, 20];
            oWidthArray = [160, 160, 160, 160, 160];
            var oFormatStreem = [];
            var oDisabled = [];
            var oShowButton = [];
            readerPushDateTime(div, nameArray, oHightArray, oWidthArray, oFormatStreem, oDisabled, oShowButton, 1)

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