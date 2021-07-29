(function ($) {
    var formName = 'SO3318A';
    var riadllName = 'CableSoft.SO.RIA.Billing.CounterPay.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.CounterPay.Web.CounterPay';
    var gridHeight = 25;
    var textHeight = 23;
    var buttonsHeight = 28;
    var compCodeTableName = "CompCode";
    var CMCodeTableName = "CMCode";
    var PTCodeTableName = "PTCode";
    var clctEnTableName = "ClctEn";
    var privsTableName = "Privs";
    var systemTableName = "System";
    var systemChargeTableName = "SystemCharge";
    var invConSettingTableName = "InvConSetting";
    var tranDateTableName = "TranDate";
    $.fn[formName] = function (options, param, param2, params3) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, param2, params3);
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
                        options: $.extend({}, new defaults(), new SO3318A(), options)
                        
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
        chkTranDateOk: function (jq, params, params2, params3) {
            return chkTranDateOk(params, params2, params3);
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
        this.isOrder = false;
        this.orderNo = null;
        this.childLoaded = [];
        this.tabContainer = null;
        this.compChanging = false;
        this.usePG = 0;
        this.creditCard4 = 0;
        this.startCreateInv = 0;
        this.doCreateInv = false;

    });
    //parameter
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
    //formResize
    function formResize(div, params) {
        try {
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            var sHeight = $(div).height() - buttonsHeight * 2;
            getControlObject(div, 'gbxData').jqxPanel({ height: sHeight });
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    //formDestroy
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            destroyControls(controls);
            var options = $.data(div, formName).options;
            deleteJSONObject(options);
            $.data(div, formName, null);

            //var controls = $.data(div, formName).options.controls;
            //destroyControls(controls);
            //var options = $.data(div, formName).options
            //options.length = 0;
            //options = null;
            //$.data(div, formName, null);
            //$(div).off();
            ////$(div).remove();
            return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    //formLoaded
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            //2018.03.20 調整加傳版本loadForm
            loadForm(options,
                'SO3000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            frmAddHandler(div);
                            listAddHandler(div);
                            buttonAddHandler(div);
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
    //frmAddHandler
    function frmAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.container != null) {
                if ($(options.container).attr('class') != null && $(options.container).attr('class').indexOf('jqx-window') > 0) {
                    $(options.container).on('winClosing', function (e) {
                        close(div)
                    });
                }
                addHandlerGetParameters(options.container, options);
            }
            else {
                addHandlerGetParameters(div, options);
            }
            //$(div).on('focusin', function () {
            //    $(div).triggerHandler('focusin');
            //});
        }
        catch (err) {
            errorHandle(formName, 'frmAddHandler', err);
        }
    };
    //init
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div, formName);
            renderControl(div);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            formResize(div);
            openAllData(div, function (r) {
                if (r[0]) {
                    initList(div);
                    defaultValue(div);
                    action(true);
                }
                else if (r[1] != null) {
                    messageBox(r[1], messageType.critical);
                    action(false);
                }
            });

        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    //initList
    function initList(div) {
        try {
            var options = $.data(div, formName).options;
            var csArrays = ["csCompCode", "csCMCode",
                    "csClctEn", "csPTCode"];
            var tableArrays = [compCodeTableName, CMCodeTableName,
                    clctEnTableName, PTCodeTableName];
            var cLengths = csArrays.length;
            for (var i = 0; i < cLengths; i++) {
                getControlObject(div, csArrays[i]).csList('source', options.initData[tableArrays[i]].rows);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initList', err);
        }
    }
    //defaultValue
    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            var loginRow = options.loginInfo.loginInfo.rows[0];
            getControlObject(div, 'csCompCode').csList('codeNo', loginRow['compcode']);
            //預設當天
            var d = formatDateTime(new Date(), 'date');
            getControlObject(div, 'dtRealDate').csDateTime('setText', d);
            //收費方式參考號1
            var row = getRowByKeyValue(options.initData[CMCodeTableName].rows, 'REFNO', 1);
            getControlObject(div, 'csCMCode').csList('codeNo', row['CODENO']);
            //付款種類代碼1
            getControlObject(div, 'csPTCode').csList('codeNo', 1);
            //收費人員
            getControlObject(div, 'csClctEn').csList('codeNo', loginRow['entryid']);
            var privRow = getRowByKeyValue(options.initData[privsTableName].rows, 'MID', 'SO33181');
            getControlObject(div, 'csClctEn').csList('disabled', (privRow == null || privRow['GROUPX'] != 1));
            //SO041.startCreateInv
            if (options.initData[systemTableName].rows.length > 0) {
                options.startCreateInv = options.initData[systemTableName].rows[0]['startCreateInv'.toUpperCase()];
            };
            //CD125
            if (IsNullOrEmpty(options.initData['InvConSetting']) == false) {
                if (options.initData['InvConSetting'].rows.length > 0 && options.startCreateInv == 1) {
                    options.doCreateInv = true;
                };
            };

            return true;
        }
        catch (err) {
            errorHandle(formName, 'defaultValue', err);
        }
    }
    //renderControl
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
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        $('#' + iId + scrollBars[j]).css('display', 'none');
                    }
                }
            }
            level += 1;
            //建立日期元件
            oArray = ["dtRealDate"];
            oWidthArray = ["120"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var fs = "yyyy/MM/dd";
                $('#' + iId).csDateTime({
                    theme: options.theme,
                    formatString: fs,
                    showCalendarButton: true,
                    value: null,
                    height: textHeight - 2,
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csDateTime', level: level });
            }
            level += 1;
            //建立單選元件
            oArray = ["csCompCode", "csCMCode",
                    "csClctEn", "csPTCode"];
            oWidthArray = ["240", "240",
                    "240", "240"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var disabled = false;
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 80,
                    disabled: disabled,
                    width: oWidthArray[i]
                });
                if (i == 0) {
                    $("#" + iId).csList('onlyDropDown', true);
                };                
                controls.push({ name: iId, type: 'csList', level: level });
            }
            level += 1;
            //建立按鈕
            oArray = ['btnOk', 'btnExit'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var text = lang[oArray[i]];
                switch (oArray[i]) {
                    case "btnOk":
                        img = imageScr.save;
                        break;
                    case "btnExit":
                        img = imageScr.exit;
                        break;
                }
                o.text(text);
                var bOptions = $.extend({}, {
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                }, img, imagePosition);
                o.jqxButton(bOptions);
                $('#' + bId).find('img').css('top', (buttonsHeight - $('#' + bId).find("img").height()) / 2 - 1);
                controls.push({ name: bId, type: 'jqxButton', level: level });
            }
            level += 1;
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    //openAllData
    function openAllData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'OpenAllData',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    //messageBox(JSON.stringify(data));
                    if (data.ResultBoolean == true) {
                        delete options.initData;
                        options.initData = JSON.parse(data.ResultXML);
                        action([true]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'openAllData', err);
        }
    };
    //chkTranDateOk
    function chkTranDateOk(div, initD, realDate) {
        try {
            var lang = new SO3318A().language;
            var dayCut = 0;
            var para6 = 0;
            var tranDate;
            if (initD[systemTableName].rows.length > 0) {
                dayCut = initD[systemTableName].rows[0]['dayCut'.toUpperCase()];
            }
            if (initD[systemChargeTableName].rows.length > 0) {
                para6 = initD[systemChargeTableName].rows[0]['para6'.toUpperCase()];
            }
            if (initD[tranDateTableName].rows.length > 0) {
                tranDate = new Date(initD[tranDateTableName].rows[0]['TranDate'.toUpperCase()]);
            }
            var rD = new Date(realDate);
            
            //此日期超過今天日期
            if (formatDate(rD, 'date') > formatDate(new Date(), 'date')) {
                messageBox(lang.dateOverNow, messageType.critical, null, function () {
                    getControlObject(div, 'dtRealDate').csDateTime('focus');
                });
                return;
            };
            rD = new Date(realDate);
            //此日期超過今天日期
            if (formatDate(rD, 'date') > formatDate(new Date(), 'date')) {
                messageBox(lang.dateOverNow, messageType.critical, null, function () {
                    getControlObject(div, 'dtRealDate').csDateTime('focus');
                });
                return;
            }
            rD = new Date(realDate);
            //此日期已超過系統設定的安全期限
            var n = getToday();
            if (n > rD.setDate(rD.getDate() + para6)) {
                messageBox(lang.overSafeDate, messageType.critical, null, function () {
                    getControlObject(div, 'dtRealDate').csDateTime('focus');
                });
                return;
            };
            rD = new Date(realDate);
            //之前已做過日結,不可使用之前日期入帳!
            if (tranDate != null) {
                if (rD.setDate(rD.getDate() + dayCut) < tranDate) {
                    messageBox(lang.overCloseDate, messageType.critical, null, function () {
                        getControlObject(div, 'dtRealDate').csDateTime('focus');
                    });
                    return;
                }
            };
            
            return true;
        }
        catch (err) {
        }
    }
    //isDataOk
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var oArrays = ['csCompCode', 'csCMCode', 'csPTCode'];
            var lArrays = ['lCompCode', 'lCMCode', 'lPTCode'];
            for (var i = 0; i < oArrays.length; i++) {
                var r = checkUIMustBe(getControlObject(div, oArrays[i]).csList('codeNo'), lang[lArrays[i]], function (r) {
                    getControlObject(div, oArrays[i]).csList('focus');
                });
                if (r != true) return r;
            }
            var r = checkUIMustBe(getControlObject(div, 'dtRealDate').csDateTime('getText'), lang.lRealDate, function (r) {
                getControlObject(div, 'dtRealDate').csDateTime('focus');
            });
            if (r != true) return r;
            var realDate = getControlObject(div, 'dtRealDate').csDateTime('getText');
            if (chkTranDateOk(div, options.initData, realDate) != true) return false;
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    }
    //buttonAddHandler
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //確定
            getControlObject(div, 'btnOk').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (isDataOk(div) != true) return;
                var selItem = getControlObject(div, 'csCompCode').csList('selectedItem');
                if (selItem != null) {
                    if (isEmpty(selItem.USEPG) == false) {
                        options.usePG = selItem.USEPG;
                    };
                };
                //啟用開票開立 要先選取發票公司別
                //if (options.doCreateInv == true) {


                //}
                //else {
                    showDetailForm(div);
                //};                
            });
            getControlObject(div, 'btnExit').on('click', function () {
                close(div);
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    //getParaData
    function getParaData(div) {
        try {
            var options = $.data(div, formName).options;
            var table = { Para: { columns: [], rows: [] } };
            var cols = ['RealDate', 'CMCode', 'CMName', 'PTCode', 'PTName', 'ClctEn', 'ClctName'];
            var types = ['string', 'integer', 'string', 'integer', 'string', 'string', 'string'];
            for (var i = 0; i < cols.length; i++) {
                table.Para.columns.push({ name: cols[i].toUpperCase(), type: types[i].toUpperCase() });
            }
            var row = {};
            row['RealDate'.toUpperCase()] = getControlObject(div, 'dtRealDate').csDateTime('getText');
            row['CMCode'.toUpperCase()] = getControlObject(div, 'csCMCode').csList('codeNo');
            row['CMName'.toUpperCase()] = getControlObject(div, 'csCMCode').csList('description');
            row['PTCode'.toUpperCase()] = getControlObject(div, 'csPTCode').csList('codeNo');
            row['PTName'.toUpperCase()] = getControlObject(div, 'csPTCode').csList('description');
            row['ClctEn'.toUpperCase()] = convertToNull(getControlObject(div, 'csClctEn').csList('codeNo'));
            row['ClctName'.toUpperCase()] = convertToNull(getControlObject(div, 'csClctEn').csList('description'));
            table.Para.rows.push(row);
            return table;
        }
        catch (err) {
            errorHandle(formName, 'getParaData', err);
        }
    }
    //Show SO3318B 櫃檯繳款
    function showDetailForm(div) {
        try {
            var options = $.data(div, formName).options;
            var width = 1000;
            var height = 600;
            var container;
            if (options.tabContainer != null) {
                container = $('<div id="' + $(div).prop('id') + 'child"style="width:99%;height:99%;"></div>').appendTo(options.tabContainer);
            }
            if (container == null) { container = options.container ;};
            if (width > container.width()) { width = container.width(); };
            if (height > container.height()) { height = container.height(); };
            var x = ($(container).width() - width) / 2;
            var y = 26;
            var winOptions = {
                width: width,
                height: height,
                minWidth: width / 2,
                minHeight: height / 2,
                maxWidth: $(container).width(),
                maxHeight: $(container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };
            
            var win = createcsWindow(container, options.language['titleName'] + ' [SO3318B]', winOptions);
            $('#' + win.windowId).on('close', function () {
                $('#' + win.contentId)['SO3318B']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);

                $('#' + $(div).prop('id') + 'child').remove();
            });
            $('#' + win.contentId)['SO3318B']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: $.extend({}, cloneJSON(options.initData), cloneJSON(getParaData(div))),
                theme: options.theme,
                localization: cloneJSON(options.localization),
                usePG: options.usePG,
                creditCard4: options.creditCard4

            });
        }
        catch (err) {
            errorHandle(formName, 'showReserve', err);
        }
    }
    //close
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).csWindow('close');
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };
    //listAddHandler
    function listAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //公司別
            getControlObject(div, 'csCompCode').on('selectedIndexChanged', function (r) {
                try {
                    if (options.compChanging == true) return;
                    var oCompCode = options.loginInfo.loginInfo.rows[0]['compcode'];
                    var value = $(this).csList('codeNo');
                    options.loginInfo.loginInfo.rows[0]['compcode'] = value;
                    canView(div, function (r) {
                        if (r[0] == true) {
                            openAllData(div, function (r) {
                                if (r[0]) {
                                    options.compChanging = true;
                                    initList(div);
                                    defaultValue(div);
                                    options.compChanging = false;
                                }
                                else if (r[1] != null) {
                                    messageBox(r[1], messageType.critical);
                                }
                            });
                        }
                        else {
                            var setOldValue = function () {
                                options.compChanging = true;
                                getControlObject(div, 'csCompCode').csList('codeNo', oCompCode);
                                options.compChanging = false;
                                options.loginInfo.loginInfo.rows[0]['compcode'] = oCompCode;
                            }
                            if (r[1] != null) {
                                messageBox(r[1], messageType.critical, null, function () {
                                    setOldValue();
                                });
                            }
                            else {
                                setOldValue();
                            }
                        }

                    });
                }
                catch (err) {
                    errorHandle(formName, 'selectedIndexChanged', err);
                }
            });
            //收費方式
            getControlObject(div, 'csCMCode').on('selectedIndexChanged', function (event) {
                if (options.loading == true) return;
                var bankValue = $(this).csList('codeNo');
                if (bankValue == null || bankValue.length == 0) {
                    return false;
                }
                var selItem = getControlObject(div, 'csCMCode').csList('selectedItem');
                if (selItem != null) {
                    if (isEmpty(selItem.REFNO) == false) {
                        if (selItem.REFNO == 4) {
                            getControlObject(div, 'csPTCode').csList('codeNo', 4);
                            options.creditCard4 = 1;
                        }
                        else {
                            getControlObject(div, 'csPTCode').csList('codeNo', 1);
                            options.creditCard4 = 0;
                        };
                    };
                };
            });

            //return true;
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    };
    //canView
    function canView(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            //var parameters = $.extend({}, paraLoginInfo);
            var parameters = $.extend({}, paraLoginInfo, {
                blnChangeConn: { type: 'boolean', value: true }
            });

            var params = getParameters(riadllName,
                riaClassName,
                'CanView',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        action([true]);
                    }
                    else {
                        action([false, data.ErrorMessage]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'canView', err);
        }
    };



})(jQuery);