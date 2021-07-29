(function ($) {
    var formName = 'SO1118A4';
    var riadllName = 'CableSoft.SO.RIA.Wip.CallOk.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.CallOk.Web.CallOk';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 23;
    var returnCodeTableName = "ALL";
    var canChooseWipTableName = "CanChooseWip";
    //var satisfyAndMalfunc = "SatiAndMfCode";
    var parameterTableName = "Parameters";
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
                var state = $.data(this, formName);
                if (state) {
                    $.extend(state.options, options);
                }
                else {
                    $.data(this, formName, {
                        options: $.extend({}, new defaults(), new SO1118A4(), options)
                    });
                    formLoaded(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.' + formName, err);
        }
    };
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        theme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        destroy: function (jq) {
            return jq.each(function () {
                formDestroy(this);
            });
        },
        resize: function (jq, params) {
            return jq.each(function () {
                formResize(this, params);
            });
        },
        canView: function (jq, params, param2) {
            return canView(params, param2);
        },
        getData: function (jq) {
            return getData(jq[0]);
        },
        enableSatiAndMfCode: function (jq, params) {
            return enableSatiAndMfCode(jq[0], params);
        },
        isDataOk: function (jq) {
            return isDataOk(jq[0]);
        },
        setSignDate: function (jq) {
            return jq.each(function () {
                setSignDate(this);
            });
        },
        setChooseOk: function (jq) {
            return setChooseOk(jq[0]);
        }
    };
    var defaults = (function () {
        this.language = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.refNo = 0;
        this.parameters = {};
        this.controls = [];
        this.theme = $.jqx.theme;
        this.localization = null;
        this.container = null;
        this.chkChooseOK = true;
        this.proposerData = {};
        this.satiAndMf = {};
    });
    function parameter(div, paraName, params) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            options.theme = params;
            for (var i = 0; i < controls.length; i++) {
                var o = $('#' + controls[i].name);
                if (controls[i].type.indexOf('jqx') >= 0) {
                    $(o)[controls[i].type](paraName, params);
                }
                else if (controls[i].type.indexOf('cs') >= 0) {
                    $(o)[controls[i].type](paraName, params);
                }
                //$($(div).find('[data-id=codeno]')[0])
            }
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    function formResize(div, params) {
        try {
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            var controls = options.controls;
            getControlObject(div, 'dtSignDate').csDateTime({ width: 135 });
            getControlObject(div, 'dtFinTime').csDateTime({ width: 135 });
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            destroyControls(controls);
            var options = $.data(div, formName).options
            deleteJSONObject(options);
            //options.length = 0;
            //options = null;
            $.data(div, formName, null);
            $(div).off();
            //$(div).remove();
            return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
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
                            textAddHandler(div);
                            buttonAddHandler(div);
                            $(div).triggerHandler('loaded');
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
    }

    function enableSatiAndMfCode(div, data) {
        try {
            let options = $.data(div, formName).options;
            //options.initData = data;
            //options.initData = cloneJSON(data);
            options.initData[canChooseWipTableName] = data.CanChooseWip;
            enableList(div);
        }
        catch (err) {
            errorHandle(formName, 'enableSatiAndMfCode', err);
        }
    }

    function init(div, action) {
        try {
            let options = $.data(div, formName).options;
            changeLanguage(div, formName);
            renderControl(div);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            formResize(div);
            let initProcess = function () {
                initList(div);
                enableList(div);
                listAddHandler(div);
                defaultValue(div);
                action(true);
            }
            getSatiAndMfCode(div, function (r) {
                initProcess();
            });
            //defaultValue(div);
            //action(true);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };

    function getSatiAndMfCode(div, action) {
        try {
            let options = $.data(div, formName).options;
            let paraLoginInfo = getParaLoginInfo(div, formName);
            let orderNo = options.orderNo;

            let params = getParameters(riadllName,
                riaClassName,
                'GetSatiAndMfCode',
                JSON.stringify(paraLoginInfo));
            getServerData(params, {
                success: function (data) {
                    delete params;
                    if (data.ResultBoolean == true) {
                        //delete options.initData[satisfyAndMalfunc];
                        //options.initData[satisfyAndMalfunc] = JSON.parse(data.ResultXML);
                        delete options.satiAndMf;
                        options.satiAndMf = JSON.parse(data.ResultXML);
                        action([true]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getSatiAndMfCode', err);
        }
    }

    function enableList(div) {
        try {
            let options = $.data(div, formName).options;
            let svcAry = ["C", "D", "I", "P"];
            let cslAry = ["csSatiCode", "csMFCode1", "csMFCode2"];
            let lblAry = ["lSatiCode", "lMFCode1", "lMFCode2"];
            for (let i = 0 ; i < svcAry.length; i++) {
                for (let j = 0; j < cslAry.length; j++) {
                    let o = getControlObject(div, cslAry[j] + svcAry[i]);
                    o.csList('clearDisplayValue');
                    o.csList('disabled', true);
                }
                for (let k = 0; k < lblAry.length; k++) {
                    getControlObject(div, lblAry[k] + svcAry[i]).prop('style').removeProperty('color');
                }
            }
            deleteJSONObject(options.mustBeControls);
            options.mustBeControls = [];
            if (!options.initData) return;
            if (options.initData[canChooseWipTableName] == null) return;
            //let value1 = getControlObject(div, 'csReturnCode').csList('codeNo');
            let rows = options.initData[canChooseWipTableName].rows;
            let rowCnt = rows.length;
            if (rowCnt <= 0) return;
            //判斷工單服務別功能，並且將該服務別選項變成紅色。讓必選元件顯著。
            for (let r = 0; r < rowCnt; r++) {
                let wipSvcTyp = rows[r]['ServiceType'.toUpperCase()];
                let typ = rows[r]['Type'.toUpperCase()]; // 'I',0,'M',1,'P',2
                options.mustBeControls.push(wipSvcTyp);
                //for (let j = 0; j < cslAry.length; j++) {
                //    getControlObject(div, cslAry[j] + wipSvcTyp).csList('disabled', false);
                //}
                getControlObject(div, cslAry[0] + wipSvcTyp).csList('disabled', false);
                //for (let k = 0; k < lblAry.length; k++) {
                //    getControlObject(div, lblAry[k] + wipSvcTyp).css('color', 'red');
                //}
                //8161服務滿意度不為必填欄位
                //getControlObject(div, lblAry[0] + wipSvcTyp).css('color', 'red');
                //CheckMFCode,ServiceType
                if (typ == 1 || typ == "1") { // 維修單
                    getControlObject(div, cslAry[1] + wipSvcTyp).csList('disabled', false);
                    //getControlObject(div, cslAry[2] + wipSvcTyp).csList('disabled', false);
                    //2.2	當SO042.CheckMFCode[故障原因必填]=1時，針對維修單完工，該服務別的故障原因一二必須填值。
                    let sysWipRows = options.satiAndMf["ChkMf"].rows;
                    if (sysWipRows && sysWipRows.length > 0) {
                        //let chkMf = sysWipRows.filter(a => a.SERVICETYPE == wipSvcTyp)[0].CHECKMFCODE;
                        let chkMf = getRowByKeyValue(sysWipRows, "SERVICETYPE", wipSvcTyp).CHECKMFCODE;
                        if (chkMf == 1) {
                            getControlObject(div, lblAry[1] + wipSvcTyp).css('color', 'red');
                            getControlObject(div, lblAry[2] + wipSvcTyp).css('color', 'red');
                        }
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'enableList', err);
        }
    }

    function initList(div) {
        try {
            let options = $.data(div, formName).options;
            let cslAry = ["csSatiCodeC", "csSatiCodeD", "csSatiCodeI", "csSatiCodeP",
                            "csMFCode1C", "csMFCode1D", "csMFCode1I", "csMFCode1P"];
                            //"csMFCode2C", "csMFCode2D", "csMFCode2I", "csMFCode2P"];
            let tblAry = ["SatiC", "SatiD", "SatiI", "SatiP",
                            "MfC", "MfD", "MfI", "MfP"];
            let cslCnt = cslAry.length;
            for (let i = 0; i < cslCnt; i++) {
                getControlObject(div, cslAry[i]).csList('source', options.satiAndMf[tblAry[i]].rows);
                //getControlObject(div, cslAry[i]).csList('disabled', false);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initList', err);
        }
    }

    function listAddHandler(div) {
        try {
            let options = $.data(div, formName).options;
            let svcAry = ["C", "D", "I", "P"];
            for (let i = 0 ; i < svcAry.length; i++) {
                let o = getControlObject(div, 'csMFCode1' + svcAry[i]);
                o.on('selectedIndexChanged', function () {
                    try {
                        let mfCode1 = $(this).csList('codeNo');
                        let parLogInf = getParaLoginInfo(div, formName);

                        var parameters = $.extend({}, parLogInf, {
                            serviceType: { type: 'string', value: convertToNull(svcAry[i]) },
                            mfCode: { type: 'integer', value: mfCode1 }
                        });

                        let params = getParameters(riadllName,
                                                    riaClassName,
                                                    'GetMfCode2',
                                                    JSON.stringify(parameters));
                        getServerData(params, {
                            success: function (data) {
                                delete parameters;
                                delete params;
                                let o2 = getControlObject(div, 'csMFCode2' + svcAry[i]);
                                if (data.ResultBoolean == true) {
                                    //delete options.satiAndMf;
                                    delete options.satiAndMf['MfCode2' + svcAry[i]];
                                    let mfc2 = JSON.parse(data.ResultXML);
                                    options.satiAndMf['MfCode2' + svcAry[i]] = mfc2.MfCode2;
                                    if (mfc2.MfCode2.rows.length == 0) {
                                        o2.csList('clearDisplayValue');
                                        o2.csList('disabled', true);
                                    } else {
                                        o2.csList('source', mfc2.MfCode2.rows);
                                        o2.csList('disabled', false);
                                    }
                                }
                                else {
                                    o2.csList('disabled', true);
                                    messageBox(data.ErrorMessage, messageType.critical);
                                }
                            }
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'csMFCode1' + svcAry[i] + '_selectedIndexChanged', err);
                    }
                })
            }
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    }

    function setSignDate(div) {
        try {
            var options = $.data(div, formName).options;
            var days = options.initData[parameterTableName].rows[0]['MoreDay1'.toUpperCase()];
            var finTime = new Date(getControlObject(div, 'dtFinTime').csDateTime('getDate')).addDays(days);
            if (finTime > new Date()) {
                finTime = new Date();
            }
            getControlObject(div, 'dtSignDate').csDateTime('setText', formatDateTime(finTime, 'date'));
        }
        catch (err) {
            errorHandle(formName, 'setSignDate', err);
        }
    }
    function renderControl(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var lang = options.language;
            var height = $(div).innerHeight();
            var level = 0;
            var oLength = 0;
            var oArray = [];
            var oHightArray = [];
            var oWidthArray = [];
            var oDisabled = [];
            var oColors = [];
            $(div).css('padding', 2);
            $(div).css('overflow', 'hidden');
            //建立jqxPanel
            oArray = ["gbxData"];
            var oHightArray = ["100%"];
            var oWidthArray = ["100%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxPanel({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    //sizeMode: "wrap"
                    autoUpdate: true
                });
                controls.push({ name: iId, type: 'jqxPanel', level: level });
            }
            level += 1;
            //建立CheckBox
            oArray = ["chkAll", "chkShouldReg"];
            oArray = ["chkShouldReg"];
            oWidthArray = ["100", "100"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).text(lang[oArray[i]]);
                $('#' + iId).jqxCheckBox({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i]
                });

                controls.push({ name: iId, type: 'jqxCheckBox', level: level });
            }
            //getControlObject(div, 'chkShouldReg').css("color", "blue");
            //建立日期元件
            oArray = ["dtSignDate", "dtFinTime"];
            oWidthArray = [160, 160];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var fs = "yyyy/MM/dd";
                if (oArray[i] == 'dtFinTime') {
                    fs = "yyyy/MM/dd HH:mm";
                }
                $('#' + iId).csDateTime({
                    theme: options.theme,
                    formatString: fs,
                    showCalendarButton: true,//2018.07.20 增加可以選日歷
                    value: null,
                    height: textHeight - 2,
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csDateTime', level: level });
            }
            //建立 按鈕
            oArray = ['btnProposer'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 60;
                var text = lang[oArray[i]];
                var disabled = false;
                switch (oArray[i]) {
                    case "btnProposer":
                        if (options.orderNo === null) { disabled = true }
                        break;
                    default:
                }
                o.text(text);
                var bOptions = $.extend({}, {
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight,
                    disabled: disabled
                }, img);
                if (isEmpty(text) != true) {
                    bOptions = $.extend({}, bOptions, imagePosition);
                }
                o.jqxButton(bOptions);
                controls.push({ name: bId, type: 'jqxButton', level: level });
                // #7717 因為需求有註明 訂單完工 的功能處理，所以一般供單完工就將該按鈕"隱藏"
                if (options.orderNo === null) { getControlObject(div, oArray[i]).hide();}
            }

            //建立單選元件
            oArray = ["csSatiCodeC", "csSatiCodeD", "csSatiCodeI", "csSatiCodeP",
                        "csMFCode1C", "csMFCode1D", "csMFCode1I", "csMFCode1P",
                        "csMFCode2C", "csMFCode2D", "csMFCode2I", "csMFCode2P"];
            oWidthArray = ["183", "183", "183", "183",
                            "183", "183", "183", "183",
                            "183", "183", "183", "183"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var disabled = true;
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 28,
                    disabled: disabled,
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csList', level: level });
            }
            level += 1;

            
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function getData(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if (isDataOk(div) == false) return;
            var data = {};
            data['signDate'.toUpperCase()] = getControlObject(div, 'dtSignDate').csDateTime('getDate');
            data['finTime'.toUpperCase()] = getControlObject(div, 'dtFinTime').csDateTime('getDate');
            data['shouldReg'.toUpperCase()] = getControlObject(div, 'chkShouldReg').jqxCheckBox('val');
            let csl = getControlObject(div, 'csSatiCodeC');
            data['satiCodeC'.toUpperCase()] = convertToNull(csl.csList('codeNo'));
            data['satiDescC'.toUpperCase()] = convertToNull(csl.csList('description'));
            csl = getControlObject(div, 'csSatiCodeD');
            data['satiCodeD'.toUpperCase()] = convertToNull(csl.csList('codeNo'));
            data['satiDescD'.toUpperCase()] = convertToNull(csl.csList('description'));
            csl = getControlObject(div, 'csSatiCodeI');
            data['satiCodeI'.toUpperCase()] = convertToNull(csl.csList('codeNo'));
            data['satiDescI'.toUpperCase()] = convertToNull(csl.csList('description'));
            csl = getControlObject(div, 'csSatiCodeP');
            data['satiCodeP'.toUpperCase()] = convertToNull(csl.csList('codeNo'));
            data['satiDescP'.toUpperCase()] = convertToNull(csl.csList('description'));
            csl = getControlObject(div, 'csMFCode1C');
            data['mfCode1C'.toUpperCase()] = convertToNull(csl.csList('codeNo'));
            data['mfDesc1C'.toUpperCase()] = convertToNull(csl.csList('description'));
            csl = getControlObject(div, 'csMFCode2C');
            data['mfCode2C'.toUpperCase()] = convertToNull(csl.csList('codeNo'));
            data['mfDesc2C'.toUpperCase()] = convertToNull(csl.csList('description'));
            csl = getControlObject(div, 'csMFCode1D');
            data['mfCode1D'.toUpperCase()] = convertToNull(csl.csList('codeNo'));
            data['mfDesc1D'.toUpperCase()] = convertToNull(csl.csList('description'));
            csl = getControlObject(div, 'csMFCode2D');
            data['mfCode2D'.toUpperCase()] = convertToNull(csl.csList('codeNo'));
            data['mfDesc2D'.toUpperCase()] = convertToNull(csl.csList('description'));
            csl = getControlObject(div, 'csMFCode1I');
            data['mfCode1I'.toUpperCase()] = convertToNull(csl.csList('codeNo'));
            data['mfDesc1I'.toUpperCase()] = convertToNull(csl.csList('description'));
            csl = getControlObject(div, 'csMFCode2I');
            data['mfCode2I'.toUpperCase()] = convertToNull(csl.csList('codeNo'));
            data['mfDesc2I'.toUpperCase()] = convertToNull(csl.csList('description'));
            csl = getControlObject(div, 'csMFCode1P');
            data['mfCode1P'.toUpperCase()] = convertToNull(csl.csList('codeNo'));
            data['mfDesc1P'.toUpperCase()] = convertToNull(csl.csList('description'));
            csl = getControlObject(div, 'csMFCode2P');
            data['mfCode2P'.toUpperCase()] = convertToNull(csl.csList('codeNo'));
            data['mfDesc2P'.toUpperCase()] = convertToNull(csl.csList('description'));
            return data;
        }
        catch (err) {
            errorHandle(formName, 'getData', err);
        }
    }
    function isDataOk(div) {
        try {
            let options = $.data(div, formName).options;
            let lang = options.language;
            let lblAry = ['lFinishTime', 'lSignDate'];
            let dtAry = ['dtFinTime', 'dtSignDate'];
            let aryLen = lblAry.length;
            for (let i = 0 ; i < aryLen; i++) {
                let dtObj = getControlObject(div, dtAry[i]);
                if (checkUIMustBe(dtObj.csDateTime('getText'), lang[lblAry[i]], function () {
                    dtObj.csDateTime('focus');
                }) == false) {
                    return false;
                }
            }
            lblAry = ['lSatiCodeC', 'lSatiCodeD', 'lSatiCodeI', 'lSatiCodeP',
            			'lMFCode1C', 'lMFCode2C',
            			'lMFCode1D', 'lMFCode2D',
            			'lMFCode1I', 'lMFCode2I',
            			'lMFCode1P', 'lMFCode2P'];
            let cslAry = ['csSatiCodeC', 'csSatiCodeD', 'csSatiCodeI', 'csSatiCodeP',
	            			'csMFCode1C', 'csMFCode2C',
	            			'csMFCode1D', 'csMFCode2D',
	            			'csMFCode1I', 'csMFCode2I',
	            			'csMFCode1P', 'csMFCode2P'];
            aryLen = lblAry.length;
            for (let i = 0; i < aryLen; i++) {
                let colour = getControlObject(div, lblAry[i]).css('color');
                if (colour == "rgb(255, 0, 0)") {
                    let cslObj = getControlObject(div, cslAry[i]);
                    if (checkUIMustBe(cslObj.csList('codeNo'), lang[lblAry[i]], function () {
                        cslObj.csList('focus');
                    }) == false) {
                        return false;
                    }
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    }
    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            var n = new Date();
            getControlObject(div, 'dtFinTime').csDateTime('setText', formatDateTime(n, 'datetime'));
            return true;
        }
        catch (err) {
            errorHandle(formName, 'defaultValue', err);
        }
    }
    function textAddHandler(div) {
        try {
            getControlObject(div, 'dtFinTime').on('dateChanged', function () {
                setSignDate(div);
            });
        }
        catch (err) {
            errorHandle(formName, 'textAddHandler', err);
        }
    }
    function buttonAddHandler(div) {
        try {
            //申請人 按鈕回SO1118A 呼叫('detail1').on('chooseOk') 檢核
            getControlObject(div, 'btnProposer').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                var options = $.data(div, formName).options;
                //2018.09.07 by Corey 因為SQ_Karen前幾天反映如果是訂單功能才能有申請人按鈕，不需要檢核按鈕的部分
                //options.chkChooseOK = false;
                //var e = $.Event("chooseOk");
                //$(div).triggerHandler(e);
                //if (options.chkChooseOK == true) {
                //    getProposerData(div, function (r) {
                //        if (r[0]) {
                //            getNewProposerData(div, function (r) {
                //                if (r.isSaved) {
                //                    //原本儲存功能已經改到SO1118A6內，所以這邊就不需要處理。
                //                }
                //            });
                //        };
                //    });
                //};
                getProposerData(div, function (r) {
                    if (r[0]) {
                        getNewProposerData(div, function (r) {
                            if (r.isSaved) {
                                //原本儲存功能已經改到SO1118A6內，所以這邊就不需要處理。
                            }
                        });
                    };
                });
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    function setChooseOk(div) {
        var options = $.data(div, formName).options;
        options.chkChooseOK = true;
    };
    function getProposerData(div, action) {
        //取得原本訂單申請人資料
            try {
                var options = $.data(div, formName).options;
                var paraLoginInfo = getParaLoginInfo(div, formName);
                var orderNo = options.orderNo;
                var parameters = $.extend({}, paraLoginInfo, {
                    custId: { type: 'integer', value: options.custId },
                    orderNo: { type: 'string', value: convertToNull(options.orderNo) }
                });
                var params = getParameters(riadllName,
                    riaClassName,
                    'GetOrderProposer',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        delete parameters;
                        delete params;
                        //messageBox(JSON.stringify(data));
                        if (data.ResultBoolean == true) {
                            delete options.proposerData;
                            options.proposerData = JSON.parse(data.ResultXML);
                            action([true]);
                        }
                        else {
                            action([false, data.ErrorMessage]);
                        }
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'getProposerData', err);
            }
    };
    function getNewProposerData(div, action) {
        //呼叫訂單功能，取得訂單申請人修改後資料
        try {
            var options = $.data(div, formName).options;
            var width = 850;
            var height = 165;
            //var objectName = "SO1144B6";
            var objectName = "SO1118A6";
            var x = ($(options.container).width() - width) / 2;
            var y = ($(options.container).height() - height) / 2;
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                hasClosing: false,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language["Proposer"] + " [" + objectName + "]", winOptions);

            $('#' + win.windowId).on('close', function () {
                try {
                    var roptions = $.data($('#' + win.contentId)[0], objectName).options;
                    var isSaved = roptions.isSaved;
                    var retProposerData = [];
                    if (isSaved) { retProposerData = roptions.getData; }
                    $('#' + win.contentId)[objectName]('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                    options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                    action({ isSaved: isSaved, returnRow: retProposerData });
                }
                catch (err) {
                    errorHandle(formName, 'getProposerData_close', err);
                }
            });
            $('#' + win.contentId)[objectName]({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),// 此 container 需要傳入windowId 否則Close視窗事件沒辦法執行觸發。
                container2:cloneJSON(options.container),//加傳 外面的，是因為SO1118A6畫面太小，如果SO1144B6內的申請人功能就會太大包含不進去SO1118A6
                theme: options.theme,
                localization: cloneJSON(options.localization),
                editMode: 1, //0=View 1=edit 2=Append 3=Delete
                custId: options.custId,
                orderNo: options.orderNo,
                initData: cloneJSON(options.proposerData)
                //orderData: options.orderData
            });
        } catch (err) {
            errorHandle(formName, 'getProposerData', err);
        }
    }

   
})(jQuery);