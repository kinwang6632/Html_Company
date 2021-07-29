(function ($) {
    var formName = 'SO1113B';
    var riadllName = 'CableSoft.SO.RIA.Wip.PR.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.PR.Web.PR';
    var buttonsHeight = 24;
    var textHeight = 23;  

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
                    //cccc(this,options);
                }
                else {
                    $.data(this, formName, {
                        options: $.extend({}, new defaults(), new SO1113B(), options)
                    });
                    formLoaded(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1113B', err);
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
        }
    };
    var defaults = (function () {
        this.language = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.refNo = 0;
        this.parameters = {};
        this.controls = [];
        this.isSaved = false;
        this.theme = $.jqx.theme;
        this.initData = {};
        this.localization = null;
        this.container = null;
        this.ID = null;
        this.addrNo = null;
        this.addrSort = null;
        this.serviceType = null;
        this.noCust = false;
        this.returnRow = null;
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
            var height = $(div).height() - buttonsHeight - 4;
            //getControlObject(div, "gbxData").jqxPanel({ height: height });
            getControlObject(div, "gData").jqxGrid({ height: height-120 - buttonsHeight - 4 });
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
                        init(div, function (r) {
                            try {
                                buttonAddHandler(div);
                                frmAddHandler(div);
                                $(div).triggerHandler('loaded');
                            }
                            catch (err) {
                                errorHandle(formName, 'formLoaded_success_init', err);
                            }
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
            //            init(div, function (r) {
            //                try {
            //                    buttonAddHandler(div);
            //                    frmAddHandler(div);
            //                    $(div).triggerHandler('loaded');
            //                }
            //                catch (err) {
            //                    errorHandle(formName, 'formLoaded_success_init', err);
            //                }
            //            });
            //        }
            //        catch (err) {
            //            errorHandle(formName, 'formLoaded_success', err);
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
    function frmAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).on('winClosing', function (e) {
                    close(div)
                });
            }
            $(options.container).on('keydown', function (e) {
                try {
                    if (e.ctrlKey && e.which == 119) {
                        messageBox(JSON.stringify(options, null, '\t'), null, null, null, { width: 800, height: 500 });
                    }
                }
                catch (err) {
                    errorHandle(formName, 'frmAddHandler_keydown', err, true);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'frmAddHandler', err);
        }
    };
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            var setServiceType = "X";
            changeLanguage(div, formName);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            renderControl(div, function (r) {
                formResize(div);
                //取新地址資料
                getReInstAddr(div, function (r) {
                    try {
                        if (r[0] == true) {
                            refreshGrid(div);
                            //#7808 2018.08.08 測試說明不要將 chkNoCust 預設打勾，討論後是因為當初為何方便性，撈不到資料會幫忙打勾。現在取消該功能。
                            //if (options.initData[Object.keys(options.initData)[0]].rows.length == 0) {
                            //    getControlObject(div, "chkNoCust").jqxCheckBox('val', true);
                            //}
                            action(true);
                        }
                        else if (r[1] != null) {
                            messageBox(r[1]);
                            action(false);
                        }
                        deleteJSONObject(r);
                    }
                    catch (err) {
                        errorHandle(formName, 'init_getServiceType', err);
                    }
                });
            });
            
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function getReInstAddr(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                ID: { type: 'string', value: options.ID },
                addrNo: { type: 'string', value: options.addrNo },
                addrSort: { type: 'string', value: options.addrSort }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetReInstAddr',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        if (data.ResultBoolean == true) {
                            options.initData = JSON.parse(data.ResultXML);
                        }
                        var flag = data.ResultBoolean;
                        var msg = data.ErrorMessage;
                        deleteJSONObject(data);
                        action([flag, msg]);
                    }
                    catch (err) {
                        errorHandle(formName, 'GetReInstAddr_success', err);
                        action([false]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getReInstAddr', err);
        }
    };
    function renderControl(div, action) {
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
            $(div).css('overflow', 'hidden');
            
            //建立CheckBox
            oArray = ["chkNoCust"];
            oWidthArray = ["100"];
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
            //建立按鈕
            oArray = ["btnSeach","btnOk", "btnExit"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var text = lang[oArray[i]];
                var disabled = false;
                switch (oArray[i]) {
                    case "btnSeach":
                        img = imageScr.query;
                        break;
                    case "btnOk":
                        img = imageScr.save;
                        break;
                    case "btnExit":
                        img = imageScr.exit;
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
                getControlObject(div, oArray[i]).find('img').css({ left: 5, top: 2 });
                getControlObject(div, oArray[i]).find('span').css({ left: 35, top: 3 });
            }

            var csArrays = ["g2InstAddress"];
            var cLengths = csArrays.length;

            for (var i = 0; i < cLengths; i++) {
                var iId = $(div).prop('id') + csArrays[i];
                getControlObject(div, csArrays[i]).csAddress2({
                    width: '99%',
                    loginInfo: cloneJSON(options.loginInfo),
                    filterAreaCode: true,
                    edableFilterAreaCode :false,
                    theme: options.theme
                });
                controls.push({ name: iId, type: 'csAddress2', level: level });
                //getControlObject(div, csArrays[i]).on('loadCompleted', function () {
                //    action(true);
                //});
            }
            
            renderiGrid(div, level, function (r) {
                action(true);
            });
            
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function getReturnData(div) {
        try {
            var options = $.data(div, formName).options;
            var idx = getControlObject(div, 'gData').jqxGrid('getselectedrowindex');
            var row = getControlObject(div, 'gData').jqxGrid('getrowdata', idx);
            return row;
        }
        catch (err) {
            errorHandle(formName, 'getReturnData', err);
        }
    }
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //尋找
            getControlObject(div, 'btnSeach').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                options.ID = null;
                options.addrNo = null;
                options.addrSort = getControlObject(div, 'g2InstAddress').csAddress2('getQryString');
                if (options.addrSort =="") { return; }

                getReInstAddr(div, function (r) {
                    try {
                        if (r[0] == true) {
                            refreshGrid(div);
                            //#7808 2018.08.08 測試說明不要將 chkNoCust 預設打勾，討論後是因為當初為何方便性，撈不到資料會幫忙打勾。現在取消該功能。
                            //if (options.initData[Object.keys(options.initData)[0]].rows.length == 0) {
                            //    getControlObject(div, "chkNoCust").jqxCheckBox('val', true);
                            //}
                        }
                        else if (r[1] != null) {
                            messageBox(r[1]);
                        }
                        deleteJSONObject(r);
                    }
                    catch (err) {
                        errorHandle(formName, 'btnSeach.onclick', err);
                    }
                });
            });
            //確定
            getControlObject(div, 'btnOk').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (isDataOk(div) != true) return;
                if (getControlObject(div, "chkNoCust").jqxCheckBox("val")) {
                    options.noCust = true;
                    options.isSaved = true;
                    getControlObject(div, 'btnExit').triggerHandler('click');
                }
                else {
                    var row = getReturnData(div);
                    var addrNo = row["ADDRNO"];
                    var custId = row["CUSTID"];
                    execute(div, addrNo, function (isOk, msg) {
                        if (!isOk) {
                            if (msg != null) {
                                messageBox(msg, messageType.critical);
                            }
                            return;
                        }
                        options.returnRow = row;
                        options.isSaved = true;
                        getControlObject(div, 'btnExit').triggerHandler('click');
                    });
                }
            });
            //取消
            getControlObject(div, 'btnExit').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                close(div);
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    function execute(div, addrNo, action) {
        try {
            getCD046(div, function (r) {
                if (r[0]) {
                    getSO002(div, addrNo, function (rr) {
                        if (rr[0]) {
                            action(true);
                        }
                        else {
                            action(false, rr[1]);
                        }
                    });
                }
                else {
                    action(false, r[1]);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'execute', err);
        }
    };
    function getCD046(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                serviceType: { type: 'string', value: options.serviceType }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetCD046',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        if (data.ResultBoolean == true) {
                            options.CD046 = JSON.parse(data.ResultXML);
                        }
                        var flag = data.ResultBoolean;
                        var msg = data.ErrorMessage;
                        deleteJSONObject(data);
                        action([flag, msg]);
                    }
                    catch (err) {
                        errorHandle(formName, 'getCD046_success', err);
                        action([false]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getCD046', err);
        }
    };
    function getSO002(div, addrNo, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                addrNo: { type: 'integer', value: addrNo }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetSO002',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        var flag = data.ResultBoolean;
                        var msg = data.ErrorMessage;
                        deleteJSONObject(data);
                        action([flag, msg]);
                    }
                    catch (err) {
                        errorHandle(formName, 'getCD046_success', err);
                        action([false]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getSO002', err);
        }
    };
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).csWindow('close');
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    }
    function renderiGrid(div, level, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var height = 10;
            var gridId = $(div).prop('id') + 'gData';
            options.gridSource = {
                datatype: "json",
                //localdata: data,
                datafields: [
                   { name: 'CUSTID', type: 'integer' },
                   { name: 'CUSTNAME', type: 'string' },
                   { name: 'TEL1', type: 'string' },
                   { name: 'TEL2', type: 'string' },
                   { name: 'TEL3', type: 'string' },

                   { name: 'HSIFLAG', type: 'integer' },
                   { name: 'DUALCABLE', type: 'integer' },
                   { name: 'FTTXFLAG', type: 'integer' },
                   { name: 'ADDRNO', type: 'integer' },
                   { name: 'ADDRESS', type: 'string' },

                   { name: 'AREANAME', type: 'string' },
                   { name: 'SERVNAME', type: 'string' },
                   { name: 'CLCTNAME', type: 'string' },
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.gridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                height: height,
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    getGridRowNumberColumn(null, 30),
                  { text: lang.gData_CUSTID, datafield: 'CUSTID', align: "right", cellsalign: "right", width: 70 },
                  { text: lang.gData_CUSTNAME, datafield: 'CUSTNAME', width: 100 },
                  { text: lang.gData_TEL1, datafield: 'TEL1', width: 90 },
                  { text: 'TEL2', datafield: 'TEL2', width: 20, hidden: true },
                  { text: lang.gData_TEL3, datafield: 'TEL3', width: 90 },
                  { text: lang.gData_HSIFLAG, datafield: 'HSIFLAG', align: "center", cellsalign: "center", columntype: 'checkbox', width: 60 },
                  { text: lang.gData_DUALCABLE, datafield: 'DUALCABLE', align: "center", cellsalign: "center", columntype: 'checkbox', width: 60 },
                  { text: lang.gData_FTTXFLAG, datafield: 'FTTXFLAG', align: "center", cellsalign: "center", columntype: 'checkbox', width: 70 },
                  { text: lang.gData_ADDRNO, datafield: 'ADDRNO', width: 70 },
                  { text: lang.gData_ADDRESS, datafield: 'ADDRESS', width: 120 },
                  { text: lang.gData_AREANAME, datafield: 'AREANAME', width: 70 },
                  { text: lang.gData_SERVNAME, datafield: 'SERVNAME', width: 70 },
                  { text: lang.gData_CLCTNAME, datafield: 'CLCTNAME', width: 80 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });

            action(true);
        }
        catch (err) {
            errorHandle(formName, 'renderiGrid', err);
        }
    };
    function refreshGrid(div) {
        try {
            var options = $.data(div, formName).options;
            options.gridSource.localdata = options.initData[Object.keys(options.initData)[0]].rows;
            $('#' + $(div).prop('id') + 'gData').jqxGrid('updatebounddata');
            if (options.gridSource.localdata.length > 0) {
                $('#' + $(div).prop('id') + 'gData').jqxGrid('selectrow', 0);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };
    //必要欄位判斷
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            //檢核資料是否有勾
            if (options.initData[Object.keys(options.initData)[0]].rows.length == 0) {
                getControlObject(div, "chkNoCust").jqxCheckBox('val', true);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
            return false;
        }
    };
})(jQuery);