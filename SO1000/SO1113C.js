(function ($) {
    //同區移機功能，選其他服務別的拆機類別和拆機原因。
    var formName = 'SO1113C';
    var riadllName = 'CableSoft.SO.RIA.Wip.PR.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.PR.Web.PR';
    var buttonsHeight = 24;
    var textHeight = 23;  
    var gridHeight = 25; 
    var wipTableName = "Wip";
    var PRCodeTableName = "PrCode";
    var reasonCodeTableName = "ReasonCode";
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
                        options: $.extend({}, new defaults(), new SO1113C(), options)
                    });
                    formLoaded(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1113C', err);
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
        this.serviceType = null;
        this.custId = 0;
        this.returnData = null;
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
            getControlObject(div, "gData").jqxGrid({ height: height });
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
                                addHandler(div);
                                buttonAddHandler(div);
                                frmAddHandler(div);
                                if (options.initData[wipTableName].rows.length == 0) {
                                    getControlObject(div, 'btnOk').triggerHandler('click');
                                }
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
            //                    addHandler(div);
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
            renderControl(div);
            $(options.container).on('resize', function () {
                formResize(div);
            });
            formResize(div);
            //取服務別
            getCanMoveServiceType(div, function (r) {
                try {
                    if (r[0] == true) {
                        defaultValue(div);
                        refreshGrid(div);
                        action(true);
                    }
                    else if (r[1] != null) {
                        messageBox(r[1]);
                        action(false);
                    }
                    deleteJSONObject(r);
                }
                catch (err) {
                    errorHandle(formName, 'getCanMoveServiceType', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            var rLength = options.initData[wipTableName].rows.length;
            //if (rLength == 0) {
            //    getControlObject(div, "chkNoCust").jqxCheckBox('val', true);
            //}
            //將0的清成空白,BLL為什麼要用0???
            for (var i = 0; i < rLength; i++) {
                options.initData[wipTableName].rows[i]["PRCODE"] = null;
                options.initData[wipTableName].rows[i]["REASONCODE"] = null;
            }
        }
        catch (err) {
            errorHandle(formName, 'defaultValue', err);
        }
    }
    function getCanMoveServiceType(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: options.custId },
                serviceType: { type: 'string', value: options.serviceType }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetCanMoveServiceType',
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
                        errorHandle(formName, 'getCanMoveServiceType_success', err);
                        action([false]);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getCanMoveServiceType', err);
        }
    };
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
            $(div).css('overflow', 'hidden');
            ////建立Panel
            //oArray = ["gbxData"];
            //var oHightArray = ["80%"];
            //var oWidthArray = ["99.5%"];
            //oLength = oArray.length;
            //for (var i = 0 ; i < oLength; i++) {
            //    var iId = $(div).prop('id') + oArray[i];
            //    $('#' + iId).jqxPanel({
            //        theme: options.theme,
            //        height: oHightArray[i],
            //        width: oWidthArray[i],
            //        //sizeMode: "wrap"
            //        autoUpdate: true
            //    });
            //    controls.push({ name: iId, type: 'jqxPanel', level: level });
            //    var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
            //    for (var j = 0; j < scrollBars.length; j++) {
            //        if ($('#' + iId + scrollBars[j]).length > 0) {
            //            $('#' + iId + scrollBars[j]).css('display', 'none');
            //        }
            //    }
            //}
            //level += 1;            
            //建立按鈕
            oArray = ['btnOk', 'btnExit'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var text = lang[oArray[i]];
                var disabled = false;
                switch (oArray[i]) {
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
                getControlObject(div, oArray[i]).find('img').css({ top: 1 });
            }
            renderiGrid(div, level);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function getReturnData(div) {
        try {
            var options = $.data(div, formName).options;
            var data = cloneJSON(options.initData);
            var rows = getControlObject(div, 'gData').jqxGrid('getrows');
            var wipRows = data[wipTableName].rows;
            for (var i = 0; i < rows.length; i++) {
                wipRows[rows[i]["uid"]]["PRCODE"] = rows[i]["PRCODE"];
                wipRows[rows[i]["uid"]]["PRNAME"] = rows[i]["PRNAME"];
                wipRows[rows[i]["uid"]]["REASONCODE"] = rows[i]["REASONCODE"];
                wipRows[rows[i]["uid"]]["REASONNAME"] = rows[i]["REASONNAME"];
            }
            return data;
        }
        catch (err) {
            errorHandle(formName, 'getReturnData', err);
        }
    }
    function addHandler(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'gData').on("cellclick", function (e) {
                try {
                    var rowindex = e.args.rowindex;
                    var row = $(this).jqxGrid('getrowdata', rowindex);
                    switch (e.args.datafield) {
                        case "PRCODE": case "PRNAME":
                            getCanEditList(div, formName, $(div).prop('id') + "gData", options.gridColumns, rowindex, "PRCODE", "PRNAME",
                                options.initData[row["SERVICETYPE"] + PRCodeTableName].rows, true);
                            break;
                        case "REASONCODE": case "REASONNAME":
                            getCanEditList(div, formName, $(div).prop('id') + "gData", options.gridColumns, rowindex, "REASONCODE", "REASONNAME",
                                options.initData[row["SERVICETYPE"] + reasonCodeTableName].rows, true);
                            break;
                    }
                }
                catch (err) {
                    errorHandle(formName, 'addHandler_cellclick', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'addHandler', err);
        }
    }
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //確定
            getControlObject(div, 'btnOk').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                if (isDataOk(div) != true) return;
                options.returnData = getReturnData(div);
                options.isSaved = true;
                getControlObject(div, 'btnExit').triggerHandler('click');
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
    function renderiGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var height = 200;
            var gridId = $(div).prop('id') + 'gData';
            options.gridSource = {
                datatype: "json",
                //localdata: data,
                datafields: [
                    { name: 'SERVICETYPE', type: 'string' },
                    { name: 'PRCODE', type: 'integer' },
                    { name: 'PRNAME', type: 'string' },
                    { name: 'REASONCODE', type: 'integer' },
                    { name: 'REASONNAME', type: 'string' }
                ]
            };
            options.gridColumns = [
                    getGridRowNumberColumn(null, 30),
                  //{ text: lang.gData_SERVICETYPE, datafield: 'SERVICETYPE', align: "right", cellsalign: "right", width: 70 },
                  { text: lang.gData_SERVICETYPE, datafield: 'SERVICETYPE', width: 70 },
                  { text: lang.gData_PRCODE, datafield: 'PRCODE', width: 70 },
                  { text: lang.gData_PRNAME, datafield: 'PRNAME', width: 140 },
                  { text: lang.gData_REASONCODE, datafield: 'REASONCODE', width: 70 },
                  { text: lang.gData_REASONNAME, datafield: 'REASONNAME', width: 140 }
            ];
            var dataAdapter = new $.jqx.dataAdapter(options.gridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                height: height,
                source: dataAdapter,
                sortable: false,
                altrows: true,
                columnsresize: false,
                columnsautoresize: false,
                filterable: false,
                columns: options.gridColumns,
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderiGrid', err);
        }
    };
    function refreshGrid(div) {
        try {
            var options = $.data(div, formName).options;
            options.gridSource.localdata = options.initData[wipTableName].rows;
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
            var rows = getControlObject(div, 'gData').jqxGrid('getrows');
            for (var i = 0; i < rows.length; i++) {
                if (isEmpty(rows[i]["PRCODE"]) || rows[i]["PRCODE"] == 0) {
                    messageBox(options.language.noPRCode.replace("{0}", rows[i]["SERVICETYPE"]));
                    return false;
                }
                if (isEmpty(rows[i]["ReasonCode".toUpperCase()]) || rows[i]["ReasonCode".toUpperCase()] == 0) {
                    messageBox(options.language.noPRReason.replace("{0}", rows[i]["SERVICETYPE"]));
                    return false;
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
            return false;
        }
    };
})(jQuery);