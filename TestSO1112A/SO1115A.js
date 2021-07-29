(function ($) {
    var formName = 'SO1115A';
    var riadllName = 'CableSoft.SO.RIA.Wip.ResvTimePeriod.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.ResvTimePeriod.Web.ResvTimePeriod';
    var buttonsHeight = 24;
    var textHeight = 23;
    var parasTableName = 'inparas';

    $.fn.SO1115A = function (options, param, param2) {
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
                        //options: $.extend({}, new defaults(),  options)
                        options: $.extend({}, new defaults(), new SO1115A(), options)
                    });
                }
                formLoaded(this);
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynamicGrid', err);
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
        this.resvTime = null;     //預約時間
        this.serviceType = null;  //服務別
        this.workerType = null;   //工單類別 I,M,P
        this.workCode = null;     //管派類別
        this.servCode = null;     //服務區
        this.firstDate = null;    //初始日期
        this.resvTimePeriod = null; //點件數資料
        this.getAllData = null;     //取回所有資料
        this.displayType = 0;       //顯示方式
        this.doFirst = 1;           //預設時段紫色
        this.returnResvtime = null; //回傳預約時間
        this.returnWorkCode = null; //回傳管派類別
        this.returnServCode = null; //回傳服務區
    });

    //傳參
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
            }
        }
        catch (err) {
            errorHandle(formName, 'setParameter', err);
        }
    };
    //form重設大小
    function formResize(div, params) {
        try {
            if ($.data(div, formName) == null) { return; }
            //var options = $.data(div, formName).options;
            //var height = $(div).height();
            var height = $(div).innerHeight();
            var headHeight = 85;
            //var bottomHeight = height - headHeight - 15;
            var bottomHeight = height - 100;
            var aHeight = $(div).height();
            getControlObject(div, 'gbxSpTop').jqxPanel({ 'height': headHeight, 'width': '99.8%' });
            getControlObject(div, 'gbxSpButton').jqxPanel({ 'height': bottomHeight, 'width': '99.8%' });
            getControlObject(div, 'dgdResvData').jqxGrid({ 'height': aHeight, 'width': '99.8%' });
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

            //$(div).children().remove();
            //$.data(div, formName).options = null;
            //delete $.data(div, formName).options;
            //$.data(div, formName).methods = null;
            //delete $.data(div, formName).methods;
            //$.data(div, formName).defaults = null;
            //delete $.data(div, formName).defaults;
            //$.data(div, formName, null);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    //轉換語系
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
        //alert(JSON.stringify($.data(div, formName).options.language));
    };
    //getParaLoginInfo
    function getParaLoginInfo(div) {
        try {
            var options = $.data(div, formName).options;
            var li = cloneJSON(options.loginInfo);
            return $.extend({}, { loginInfo: { type: 'logininfo', value: li.loginInfo } });
        }
        catch (err) {
            errorHandle(formName, 'getParaLoginInfo', err);
        }
    };
    //Form Load
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            //options.loginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            //2018.03.20 調整加傳版本loadForm
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            frmAddHandler(div);
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
            //                frmAddHandler(div);
            //                $(div).trigger('loaded');
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
    //初始化
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;

            //options.resvTime = options.parameters[parasTableName].rows[0]['RESVTIME'];
            //options.serviceType = options.parameters[parasTableName].rows[0]['SERVICETYPE'];
            ////options.workertype = options.parameters[parasTableName].rows[0]['WORKERTYPE'];
            //options.workCode = options.parameters[parasTableName].rows[0]['WORKCODE'];
            //options.servCode = options.parameters[parasTableName].rows[0]['SERVCODE'];
            //options.parameters.ResvTimePeriod.rows[0]["SERVCODE"]
            if (IsNullOrEmpty(options.parameters['ResvTimePeriod']) == false) {
                if (options.parameters['ResvTimePeriod']['rows'].length > 0) {
                    if (IsNullOrEmpty(options.parameters['ResvTimePeriod'].rows[0]['SERVICETYPE'.toUpperCase()]) == false) {
                        options.serviceType = options.parameters['ResvTimePeriod'].rows[0]['SERVICETYPE'.toUpperCase()];
                    }
                    if (IsNullOrEmpty(options.parameters['ResvTimePeriod'].rows[0]['WORKCODE'.toUpperCase()]) == false) {
                        options.workCode = options.parameters['ResvTimePeriod'].rows[0]['WORKCODE'.toUpperCase()];
                    }
                    if (IsNullOrEmpty(options.parameters['ResvTimePeriod'].rows[0]['SERVCODE'.toUpperCase()]) == false) {
                        options.servCode = options.parameters['ResvTimePeriod'].rows[0]['SERVCODE'.toUpperCase()];
                    }
                };
            };

            if (options.resvTime == null) {
                options.firstDate = formatDateTime(new Date(), 'yyyymmddhhmm');
            }
            else {
                options.firstDate = formatDateTime(options.resvTime, 'yyyymmddhhmm');
            }

            changeLanguage(div);
            renderControl(div);

            $(options.container).on('resize', function () {
                formResize(div);
            });

            //取回畫面資料
            getOpenAllData(div, function (r) {
                if (r.ResultBoolean == true) {
                    //var rT = JSON.parse(r.ResultXML);
                    //options.initData['ServiceType'] = rT[Object.keys(rT)[0]];

                    options.getAllData = JSON.parse(r.ResultXML);
                    addTotals(div);
                    initList(div);

                    //if (options.getAllData['SO041Para']['rows'].length > 0) {
                    //    var para = options.getAllData['SO041Para'].rows[0]['WipPointKind'.toUpperCase()]
                    renderResvGrid(div);
                    textAddHandler(div);
                    buttonAddHandler(div);
                    gridAddHandler(div);
                    //}
                    refreshGrid(div);

                    //listAddHandler(div);
                    //buttonAddHandler(div);
                }
                else {
                    messageBox(r.ErrorMessage);
                    action(false);
                }
                delete r;
            });
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function frmAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
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
    //取回畫面資料
    function getOpenAllData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {
                CompCode: { type: 'integer', value: paraLoginInfo.loginInfo.value.rows[0].compcode },
                ServiceType: { type: 'string', value: options.serviceType },
                StartDate: { type: 'date', value: formatDateTime(Date.parse(options.firstDate), 'yyyymmddhhmm') },
                ServCode: { type: 'string', value: options.servCode },
                MCode: { type: 'integer', value: options.workCode }
            }
            );

            var params = getParameters(riadllName,
                riaClassName,
                'OpenAllData',
                JSON.stringify(parameters));

            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    action(data);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getOpenAllData', err);
        }
    };
    //csList初始化
    function initList(div) {
        try {
            var options = $.data(div, formName).options;
            var csArrays = ["csServCode", "csMCode"];
            var tableArrays = ["ServCode", "QueryGroupID"];
            var cLengths = csArrays.length;

            for (var i = 0; i < cLengths; i++) {
                $('#' + $(div).prop('id') + csArrays[i]).csList('source', options.getAllData[tableArrays[i]].rows);
            }

            if (options.servCode == null || options.servCode == '') {
                getControlObject(div, 'csServCode').csList('codeNo', options.getAllData['ServCode'].rows[0]['CODENO']);
                getControlObject(div, 'csServCode').csList('description', options.getAllData['ServCode'].rows[0]['DESCRIPTION']);
                options.servCode = options.getAllData['ServCode'].rows[0]['CODENO'];
                //getControlObject(div, 'csReturnCode').csList('codeNo', loginInfoRow['entryid']);
                //getControlObject(div, 'csReturnCode').csList('description', loginInfoRow['entryname']);
            }
            else {
                getControlObject(div, 'csServCode').csList('codeNo', options.servCode);
            }

            if (options.workCode == null || options.workCode == '') {
                //getControlObject(div, 'csMCode').csList('codeNo', options.getAllData['QueryGroupID'].rows[0]['CODENO']);
                //getControlObject(div, 'csMCode').csList('description', options.getAllData['QueryGroupID'].rows[0]['DESCRIPTION']);
                //options.workCode = convertToNull(options.getAllData['QueryGroupID'].rows[0]['CODENO']);
            }
            else {
                getControlObject(div, 'csMCode').csList('codeNo', options.workCode);
            }

            if (options.getAllData['SO041Para']['rows'].length > 0) {
                if (options.getAllData['SO041Para'].rows[0]['WipNonServiceType'.toUpperCase()] = 1) {
                    options.serviceType = '';
                }
                getControlObject(div, 'cboDisplayType').jqxComboBox('selectedIndex', options.getAllData['SO041Para'].rows[0]['WipPointKind'.toUpperCase()]);
                options.displayType = options.getAllData['SO041Para'].rows[0]['WipPointKind'.toUpperCase()]
            }

            return true;
        }
        catch (err) {
            errorHandle(formName, 'initList', err);
        }
    };
    function getControlObject(div, name) {
        try {
            return $('#' + $(div).prop('id') + name);
        }
        catch (err) {
            errorHandle(formName, 'getControlObject', err);
        }
    };
    //render畫面元件
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
            //$(div).css('padding', 1);
            $(div).css('overflow', 'hidden');
            ////建立Splitter
            //oArray = ["gbxAll"];
            //oLength = oArray.length;
            //for (var i = 0 ; i < oLength; i++) {
            //    var iId = $(div).prop('id') + oArray[i];
            //    $('#' + iId).jqxSplitter({
            //        theme: options.theme,
            //        height: $(div).height() - 2,
            //        width: '99%',
            //        orientation: 'horizontal',
            //        panels: [{ size: 80 }, { size: $(div).height() - 2 }]
            //    });
            //    controls.push({ name: iId, type: 'jqxSplitter', level: level });
            //    $($('#' + iId).children()[0]).css('overflow', 'auto');
            //}
            //level += 1;

            //建立Panel
            oArray = ["gbxSpTop", "gbxSpButton"];
            var oHightArray = ["85px", height - 100];
            var oWidthArray = ["99.8%", "99.8%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxPanel({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    //sizeMode: "wrap"
                });
                controls.push({ name: iId, type: 'jqxPanel', level: level });
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        //$('#' + iId + scrollBars[j]).remove();
                        $('#' + iId + scrollBars[j]).css('display', 'none');
                    }
                }
            }
            level += 1;

            //建立單選元件
            oArray = ["csServCode", "csMCode"];
            oWidthArray = ["25%", "25%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 60,
                    width: '99.5%'
                });
                controls.push({ name: iId, type: 'csList', level: level });
            }
            level += 1;

            //建立按鈕
            oArray = ["btnAll", "btnReset", "btnLastWeek", "btnNextWeek"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 100;
                var text = lang[oArray[i]];
                switch (oArray[i]) {
                    case "btnAll":
                        break;
                    case "btnReset":
                        break;
                    case "btnLastWeek":
                        break;
                    case "btnNextWeek":
                        break;
                    default:
                }
                o.text(text);
                o.jqxButton($.extend({}, img, imagePosition, {
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                }));
                controls.push({ name: bId, type: 'jqxButton', level: level });
            }
            //addControlHandler(div);
            level += 1;

            //建立ComboBox
            oArray = ["cboDisplayType"];
            oWidthArray = ["25%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var source = [lang.lDisplayType0, lang.lDisplayType1, lang.lDisplayType2];

                $('#' + iId).jqxComboBox({
                    theme: options.theme,
                    height: textHeight,
                    width: '99.5%',
                    source: source, selectedIndex: 0
                });
                controls.push({ name: iId, type: 'jqxComboBox', level: level });
            }
            level += 1;

            //renderGrid
            //renderResvGrid(div);
            options.level = level;

            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    //render Grid 件/點數
    function renderResvGrid(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var level = options.level;
            var gridId = $(div).prop('id') + 'dgdResvData';
            var fields = datafields(div, options.displayType);
            //options.resvGrid = {};
            options.resvGridsource = {
                datatype: "json",
                //localdata: data
                datafields: fields
            };
            var dataAdapter = new $.jqx.dataAdapter(options.resvGridsource);
            var d = new Date(Date.parse(options.firstDate));
            var v = new Date(Date.parse(options.resvTime));
            var weekday = new Array(7);
            weekday[0] = lang.aWeekday0;  //日
            weekday[1] = lang.aWeekday1;  //一
            weekday[2] = lang.aWeekday2;
            weekday[3] = lang.aWeekday3;
            weekday[4] = lang.aWeekday4;
            weekday[5] = lang.aWeekday5;
            weekday[6] = lang.aWeekday6;

            var n0 = d.getMonth() + 1 + '/' + d.getDate() + weekday[d.getDay()];
            var n1 = addDays(d, 1).getMonth() + 1 + '/' + addDays(d, 1).getDate() + weekday[addDays(d, 1).getDay()];
            var n2 = addDays(d, 2).getMonth() + 1 + '/' + addDays(d, 2).getDate() + weekday[addDays(d, 2).getDay()];
            var n3 = addDays(d, 3).getMonth() + 1 + '/' + addDays(d, 3).getDate() + weekday[addDays(d, 3).getDay()];
            var n4 = addDays(d, 4).getMonth() + 1 + '/' + addDays(d, 4).getDate() + weekday[addDays(d, 4).getDay()];
            var n5 = addDays(d, 5).getMonth() + 1 + '/' + addDays(d, 5).getDate() + weekday[addDays(d, 5).getDay()];
            var n6 = addDays(d, 6).getMonth() + 1 + '/' + addDays(d, 6).getDate() + weekday[addDays(d, 6).getDay()];

            //件數
            var cellsRenderer0 = (function (row, field, value, defaulthtml, columnproperties) {
                var k = $(defaulthtml);
                //var data = $(this).jqxGrid('getrowdatabyid', row);
                var data = $('#' + gridId).jqxGrid('getrowdatabyid', row);
                var a = data["A" + field.substr(1)];
                var f = data["F" + field.substr(1)];
                var s = data["S" + field.substr(1)];
                //var fieldIndex = (Number(field.substr(1)) - 1) * 3 + 1;
                //var x = $('#row' + row + gridId).find('[role=gridcell]')[fieldIndex];
                //var y = $('#row' + row + gridId).find('[role=gridcell]')[fieldIndex + 1];
                //var z = $('#row' + row + gridId).find('[role=gridcell]')[fieldIndex + 2];

                //時段
                //var t = data["TIMEPERIOD"];
                var t = $('#row' + row + gridId).find('[role=gridcell]')[0];
                //$(w).css('background', '#d8ffcc');
                var setPurple = 0;
                if (d.toDateString() == v.toDateString()) {
                    setPurple = 1;
                }
                else {
                    setPurple = 0;
                };

                var changePurple = 0;
                //初次預設時段紫色  //(options.doFirst == 1 && field.substr(1) == 1)
                if (setPurple == 1 && field.substr(1) == 1) {
                    //var hm = ('0000' + d.getHours() + d.getMinutes()).slice(-4);
                    //hm = hm.substr(0, 2) + ':' + hm.slice(-2);
                    var hm = ('00' + d.getHours()).slice(-2) + ':' + ('00' + d.getMinutes()).slice(-2)

                    if (t != undefined) {
                        if (t.textContent == hm) {
                            changePurple = 1;
                        }
                    };
                }
                //else if (options.doFirst == 1 && field.substr(1) == 2 && changePurple == 1) {
                //    options.doFirst = 0;
                //}

                var color;
                if (changePurple == 1) {
                    //purple Color.FromArgb(100, 100, 100, 255) #6464ff #6666ff #dfc1df
                    color = '#dfc1df';
                }
                else if (a < (f + s)) {
                    //red Color.FromArgb(150, 255, 50, 50) #ff3232  #ff3333  #FF6D61  件數已滿 紅色 可約-已約-保留<=0
                    color = '#FF6D61';
                }
                else if (a < 0) {
                    //red Color.FromArgb(150, 255, 50, 50) #ff3232  #ff3333  #FF6D61  件數已滿 紅色 可約-已約-保留<=0
                    color = '#FF6D61';
                }
                else if (a > (f + s)) {
                    //green Color.FromArgb(100, 100, 255, 100) #64ff64  #66ff66  #d8ffcc  件數未滿 綠色 可約-已約-保留>0
                    color = '#64ff64';
                }
                else if (a == 0) {
                    //gray Color.FromArgb(192, 192, 192, 192) #c0c0c0  #cccccc  可約(A,AP)為0,全設為灰色
                    color = '#c0c0c0';
                }

                //$(x).css('background', color);
                //$(y).css('background', color);
                //$(z).css('background', color);

                var marginTop = $(k).css('margin-top');
                $(k).css({
                    "background": color, "margin-top": 0,
                    "height": "100%"
                });
                $(k).text('');
                $('<div style="margin-top:' + marginTop + ';">' + value + '</div>').appendTo(k);

                return k[0].outerHTML;
            });
            //點數
            var cellsRenderer1 = (function (row, field, value, defaulthtml, columnproperties) {
                try {
                    var k = $(defaulthtml);
                    //var data = $(this).jqxGrid('getrowdatabyid', row);
                    var data = $('#' + gridId).jqxGrid('getrowdatabyid', row);
                    var a = data["AP" + field.substr(2)];
                    var f = data["FP" + field.substr(2)];
                    var s = data["SP" + field.substr(2)];
                    //var fieldIndex = (Number(field.substr(2)) - 1) * 3 + 1;
                    //var x = $('#row' + row + gridId).find('[role=gridcell]')[fieldIndex];
                    //var y = $('#row' + row + gridId).find('[role=gridcell]')[fieldIndex + 1];
                    //var z = $('#row' + row + gridId).find('[role=gridcell]')[fieldIndex + 2];

                    //時段
                    //var t = data["TIMEPERIOD"];
                    var t = $('#row' + row + gridId).find('[role=gridcell]')[0];
                    //$(t).css('background', '#d8ffcc');
                    var setPurple = 0;
                    if (d.toDateString() == v.toDateString()) {
                        setPurple = 1;
                    }
                    else {
                        setPurple = 0;
                    };

                    var changePurple = 0;
                    //初次預設時段紫色
                    if (setPurple == 1 && field.substr(2) == 1) {
                        //var hm = ('0000' + d.getHours() + d.getMinutes()).slice(-4);
                        //hm = hm.substr(0, 2) + ':' + hm.slice(-2);
                        var hm = ('00' + d.getHours()).slice(-2) + ':' + ('00' + d.getMinutes()).slice(-2)
                        if (t != undefined) {
                            if (t.textContent == hm) {
                                changePurple = 1;
                            }
                        };
                    }
                    //else if (options.doFirst == 1 && field.substr(2) == 2 && changePurple == 1) {
                    //    options.doFirst = 0;
                    //}

                    var color;
                    if (changePurple == 1) {
                        //purple Color.FromArgb(100, 100, 100, 255) #6464ff #6666ff #dfc1df
                        color = '#dfc1df';
                    }
                    else if (a < (f + s)) {
                        //red Color.FromArgb(150, 255, 50, 50) #ff3232  #ff3333  #FF6D61  件數已滿 紅色 可約-已約-保留<=0
                        color = '#FF6D61';
                    }
                    else if (a < 0) {
                        //red Color.FromArgb(150, 255, 50, 50) #ff3232  #ff3333  #FF6D61  件數已滿 紅色 可約-已約-保留<=0
                        color = '#FF6D61';
                    }
                    else if (a > (f + s)) {
                        //green Color.FromArgb(100, 100, 255, 100) #64ff64  #66ff66  #d8ffcc  件數未滿 綠色 可約-已約-保留>0
                        color = '#64ff64';
                    }
                    else if (a == 0) {
                        //gray Color.FromArgb(192, 192, 192, 192) #c0c0c0  #cccccc  可約(A,AP)為0,全設為灰色
                        color = '#c0c0c0';
                    }

                    //$(x).css('background', color);
                    //$(y).css('background', color);
                    //$(z).css('background', color);
                    //var kp = $('<div style="height:100%;"></div>').append(k);

                    var marginTop = $(k).css('margin-top');
                    $(k).css({
                        "background": color, "margin-top": 0,
                        "height": "100%"
                    });
                    $(k).text('');
                    $('<div style="margin-top:' + marginTop + ';">' + value + '</div>').appendTo(k);

                    return k[0].outerHTML;
                }
                catch (err) {
                    errorHandle(formName, 'renderResvGrid_cellsRenderer1', err);
                }
            });
            //件/點數
            var cellsRenderer2 = (function (row, field, value, defaulthtml, columnproperties) {
                var k = $(defaulthtml);
                //var data = $(this).jqxGrid('getrowdatabyid', row);
                var data = $('#' + gridId).jqxGrid('getrowdatabyid', row);
                var a = data["A" + field.substr(1)];
                var f = data["F" + field.substr(1)];
                var s = data["S" + field.substr(1)];
                var ap = data["AP" + field.substr(1)];
                var fp = data["FP" + field.substr(1)];
                var sp = data["SP" + field.substr(1)];
                //var fieldIndex = (Number(field.substr(1)) - 1) * 3 + 1;
                //var x = $('#row' + row + gridId).find('[role=gridcell]')[fieldIndex];
                //var y = $('#row' + row + gridId).find('[role=gridcell]')[fieldIndex + 1];
                //var z = $('#row' + row + gridId).find('[role=gridcell]')[fieldIndex + 2];

                //時段
                //var t = data["TIMEPERIOD"];
                var t = $('#row' + row + gridId).find('[role=gridcell]')[0];
                //$(w).css('background', '#d8ffcc');
                var setPurple = 0;
                if (d.toDateString() == v.toDateString()) {
                    setPurple = 1;
                }
                else {
                    setPurple = 0;
                };

                var changePurple = 0;
                //初次預設時段紫色
                if (setPurple == 1 && field.substr(1) == 1) {
                    //var hm = ('0000' + d.getHours() + d.getMinutes()).slice(-4);
                    //hm = hm.substr(0, 2) + ':' + hm.slice(-2);
                    var hm = ('00' + d.getHours()).slice(-2) + ':' + ('00' + d.getMinutes()).slice(-2)

                    if (t != undefined) {
                        if (t.textContent == hm) {
                            changePurple = 1;
                        }
                    };
                }
                //else if (options.doFirst == 1 && field.substr(1) == 2 && changePurple == 1) {
                //    options.doFirst = 0;
                //}

                var color;
                if (changePurple == 1) {
                    //purple Color.FromArgb(100, 100, 100, 255) #6464ff #6666ff #dfc1df
                    color = '#dfc1df';
                }
                else if (a < (f + s)) {
                    //red Color.FromArgb(150, 255, 50, 50) #ff3232  #ff3333  #FF6D61  件數已滿 紅色 可約-已約-保留<=0
                    color = '#FF6D61';
                }
                else if (a < 0 || ap < 0) {
                    //red Color.FromArgb(150, 255, 50, 50) #ff3232  #ff3333  #FF6D61  件數已滿 紅色 可約-已約-保留<=0
                    color = '#FF6D61';
                }
                else if (a > (f + s) || ap > (fp + sp)) {
                    //green Color.FromArgb(100, 100, 255, 100) #64ff64  #66ff66  #d8ffcc  件數未滿 綠色 可約-已約-保留>0
                    color = '#64ff64';
                }
                else if (a == 0 || ap == 0) {
                    //gray Color.FromArgb(192, 192, 192, 192) #c0c0c0  #cccccc  可約(A,AP)為0,全設為灰色
                    color = '#c0c0c0';
                }

                //$(x).css('background', color);
                //$(y).css('background', color);
                //$(z).css('background', color);

                //k.text(data[field] + '/' + data[field.substr(0, 1) + 'P' + field.substr(1)]);

                var marginTop = $(k).css('margin-top');
                $(k).css({
                    "background": color, "margin-top": 0,
                    "height": "100%"
                });
                $(k).text('');
                //$('<div style="margin-top:' + marginTop + ';">' + value + '</div>').appendTo(k);
                $('<div style="margin-top:' + marginTop + ';">' + data[field] + '/' + data[field.substr(0, 1) + 'P' + field.substr(1)] + '</div>').appendTo(k);

                return k[0].outerHTML;
            });
            //cellsRenderer3 時段欄位字串加:
            var cellsRenderer3 = (function (row, columnfield, value, defaulthtml, columnproperties) {
                if (value == lang.gResv_TOTAL) {
                    return defaulthtml;
                }

                var x = $(defaulthtml);
                var data = $('#' + gridId).jqxGrid('getrowdatabyid', row);
                //var data = $(this).jqxGrid('getrowdatabyid', row);

                //timeperiod add :
                var retVal = ('0000' + value).slice(-4);
                retVal = retVal.substr(0, 2) + ':' + retVal.slice(-2);
                x.text(retVal);
                $(x).css({
                    "background": "#d8ffcc", "margin-top": 3,
                    "height": "100%"
                });

                //column header change green color
                for (i = 1; i <= 21; i++) {
                    //$('div .jqx-grid-column-header:eq(0)').css('background-color', '#d8ffcc');
                    $(div).find('div .jqx-grid-column-header:eq(' + i + ')').css('background-color', '#d8ffcc');
                }

                return x[0].outerHTML;

                //var retVal = ('000' + value).slice(-4);
                //return retVal.substr(0, 2) + ':' + retVal.slice(-2);
            });

            //grid columns  // width: 40
            var datacols = [{ text: lang.gResv_TIMEPERIOD, datafield: 'TIMEPERIOD', width: '5%', align: 'center', cellsalign: 'center', cellsrenderer: cellsRenderer3 }];
            //var selectedIndex = getControlObject(div, 'cboDisplayType').jqxComboBox('selectedIndex')
            //var selectedIndex = $('#' + $(div).prop('id') + 'cboDisplayType').jqxComboBox('selectedIndex');
            //width: 45
            if (options.displayType == 0) {
                for (i = 1; i <= 7; i++) {
                    datacols.push({ text: lang.gResv_A, datafield: 'A' + i, width: '4.5%', columngroup: 'TIMEPERIOD' + i, align: 'center', cellsalign: 'center', cellsrenderer: cellsRenderer0 });
                    datacols.push({ text: lang.gResv_F, datafield: 'F' + i, width: '4.5%', columngroup: 'TIMEPERIOD' + i, align: 'center', cellsalign: 'center', cellsrenderer: cellsRenderer0 });
                    datacols.push({ text: lang.gResv_S, datafield: 'S' + i, width: '4.5%', columngroup: 'TIMEPERIOD' + i, align: 'center', cellsalign: 'center', cellsrenderer: cellsRenderer0 });
                }
            }
            else if (options.displayType == 1) {
                for (i = 1; i <= 7; i++) {
                    datacols.push({ text: lang.gResv_A, datafield: 'AP' + i, width: '4.5%', columngroup: 'TIMEPERIOD' + i, align: 'center', cellsalign: 'center', cellsrenderer: cellsRenderer1 });  //, cellsrenderer: cellsRenderer
                    datacols.push({ text: lang.gResv_F, datafield: 'FP' + i, width: '4.5%', columngroup: 'TIMEPERIOD' + i, align: 'center', cellsalign: 'center', cellsrenderer: cellsRenderer1 });
                    datacols.push({ text: lang.gResv_S, datafield: 'SP' + i, width: '4.5%', columngroup: 'TIMEPERIOD' + i, align: 'center', cellsalign: 'center', cellsrenderer: cellsRenderer1 });
                }
            }
            else {
                for (i = 1; i <= 7; i++) {
                    datacols.push({ text: lang.gResv_A, datafield: 'A' + i, width: '4.5%', columngroup: 'TIMEPERIOD' + i, align: 'center', cellsalign: 'center', cellsrenderer: cellsRenderer2 });
                    datacols.push({ text: lang.gResv_F, datafield: 'F' + i, width: '4.5%', columngroup: 'TIMEPERIOD' + i, align: 'center', cellsalign: 'center', cellsrenderer: cellsRenderer2 });
                    datacols.push({ text: lang.gResv_S, datafield: 'S' + i, width: '4.5%', columngroup: 'TIMEPERIOD' + i, align: 'center', cellsalign: 'center', cellsrenderer: cellsRenderer2 });
                }
            }

            var rows = options.getAllData['ResvTimePeriod'].rows;
            //var rLength = rows.length;
            //var aHeight = rLength * 20 + 60;
            //var aHeight = $(div).height()-100;
            var aHeight = $('#' + $(div).prop('id') + 'gbxSpButton').height();

            //groupcolumnrenderer 日期欄位 假日變粉色
            var groupcolumnrenderer = function (text, group, expanded, data) {
                var value = text[0].textContent;
                var k = $(text);
                var color;
                var holiday = value.substr(value.length - 3, 3);
                    switch (holiday) {
                        case lang.aWeekday0:
                            color = 'Pink';
                            break;
                        case lang.aWeekday6:
                            color = 'Pink';
                            break;
                        default:
                            color = 'Blue';
                            return k[0].outerHTML;
                    };
                    //return '<div style="width: 100%; height: 100%; background-color: ' + color + '; color: White;margin-top:3;">' + value + '</div>';
                    var marginTop = $(k).css('margin-top');
                    $(k).css({
                        "background": color, "margin-top": 0,
                        "height": "100%"
                    });
                    $(k).text('');
                    $('<div style="margin-top:' + marginTop + ';">' + value + '</div>').appendTo(k);

                    return k[0].outerHTML;
            };

            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                //height: aHeight,
                //width: '99.8%',
                height: "100%",
                //autowidth: true,
                autoheight: false,
                source: dataAdapter,
                sortable: false,
                columnsresize: true,
                //rowsheight: 20,
                //columnsheight: 20,
                enablehover: false,
                selectionmode: 'singlecell',
                altrows: false,
                columns: datacols,
                //groupsrenderer: groupcolumnrenderer,
                columngroups: [
                    { text: n0, align: 'center', cellsalign: 'center', name: 'TIMEPERIOD1', rendered: groupcolumnrenderer },
                    { text: n1, align: 'center', cellsalign: 'center', name: 'TIMEPERIOD2', rendered: groupcolumnrenderer },
                    { text: n2, align: 'center', cellsalign: 'center', name: 'TIMEPERIOD3', rendered: groupcolumnrenderer },
                    { text: n3, align: 'center', cellsalign: 'center', name: 'TIMEPERIOD4', rendered: groupcolumnrenderer },
                    { text: n4, align: 'center', cellsalign: 'center', name: 'TIMEPERIOD5', rendered: groupcolumnrenderer },
                    { text: n5, align: 'center', cellsalign: 'center', name: 'TIMEPERIOD6', rendered: groupcolumnrenderer },
                    { text: n6, align: 'center', cellsalign: 'center', name: 'TIMEPERIOD7', rendered: groupcolumnrenderer }
                ],
                theme: options.theme

                //groupcolumnrenderer: function (text, columngroups, expanded, data) {
                //    var color;
                //    var holiday = text.substr(text.length - 3, 3);

                //    switch (holiday) {
                //        case lang.aWeekday0:
                //            color = 'Pink';
                //            break;
                //        case lang.aWeekday6:
                //            color = 'Pink';
                //            break;
                //        default:
                //            color = 'Blue';
                //            break;
                //    }
                //    return '<div style="width: 100%; height: 100%; background-color: ' + color + '; color: White;margin-top:3;">' + text + '</div>';
                //}
            });

            //options.controls.push({ name: $(div).prop('id') + 'dgdResvData', type: 'jqxGrid', level: 99 });
            options.controls = deleteRowByKeyValue(options.controls, 'name', gridId);
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
            level += 1;
            options.level = level;
            //var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
            //for (var j = 0; j < scrollBars.length; j++) {
            //    if ($('#' + gridId + scrollBars[j]).length > 0) {
            //        $('#' + gridId + scrollBars[j]).remove();
            //    };
            //};
        }
        catch (err) {
            errorHandle(formName, 'renderResvGrid', err);
        }
    };
    //切換grid fields
    function datafields(div, types) {
        try {
            var fields = new Array();
            fields.push({ name: 'TIMEPERIOD', type: 'string' });
            if (types == 0) {
                fields.push({ name: 'A1', type: 'string' });
                fields.push({ name: 'F1', type: 'string' });
                fields.push({ name: 'S1', type: 'string' });
                fields.push({ name: 'A2', type: 'string' });
                fields.push({ name: 'F2', type: 'string' });
                fields.push({ name: 'S2', type: 'string' });
                fields.push({ name: 'A3', type: 'string' });
                fields.push({ name: 'F3', type: 'string' });
                fields.push({ name: 'S3', type: 'string' });
                fields.push({ name: 'A4', type: 'string' });
                fields.push({ name: 'F4', type: 'string' });
                fields.push({ name: 'S4', type: 'string' });
                fields.push({ name: 'A5', type: 'string' });
                fields.push({ name: 'F5', type: 'string' });
                fields.push({ name: 'S5', type: 'string' });
                fields.push({ name: 'A6', type: 'string' });
                fields.push({ name: 'F6', type: 'string' });
                fields.push({ name: 'S6', type: 'string' });
                fields.push({ name: 'A7', type: 'string' });
                fields.push({ name: 'F7', type: 'string' });
                fields.push({ name: 'S7', type: 'string' });
            }
            else if (types == 1) {
                fields.push({ name: 'AP1', type: 'string' });
                fields.push({ name: 'FP1', type: 'string' });
                fields.push({ name: 'SP1', type: 'string' });
                fields.push({ name: 'AP2', type: 'string' });
                fields.push({ name: 'FP2', type: 'string' });
                fields.push({ name: 'SP2', type: 'string' });
                fields.push({ name: 'AP3', type: 'string' });
                fields.push({ name: 'FP3', type: 'string' });
                fields.push({ name: 'SP3', type: 'string' });
                fields.push({ name: 'AP4', type: 'string' });
                fields.push({ name: 'FP4', type: 'string' });
                fields.push({ name: 'SP4', type: 'string' });
                fields.push({ name: 'AP5', type: 'string' });
                fields.push({ name: 'FP5', type: 'string' });
                fields.push({ name: 'SP5', type: 'string' });
                fields.push({ name: 'AP6', type: 'string' });
                fields.push({ name: 'FP6', type: 'string' });
                fields.push({ name: 'SP6', type: 'string' });
                fields.push({ name: 'AP7', type: 'string' });
                fields.push({ name: 'FP7', type: 'string' });
                fields.push({ name: 'SP7', type: 'string' });
            }
            else {
                fields.push({ name: 'A1', type: 'string' });
                fields.push({ name: 'F1', type: 'string' });
                fields.push({ name: 'S1', type: 'string' });
                fields.push({ name: 'AP1', type: 'string' });
                fields.push({ name: 'FP1', type: 'string' });
                fields.push({ name: 'SP1', type: 'string' });
                fields.push({ name: 'A2', type: 'string' });
                fields.push({ name: 'F2', type: 'string' });
                fields.push({ name: 'S2', type: 'string' });
                fields.push({ name: 'AP2', type: 'string' });
                fields.push({ name: 'FP2', type: 'string' });
                fields.push({ name: 'SP2', type: 'string' });
                fields.push({ name: 'A3', type: 'string' });
                fields.push({ name: 'F3', type: 'string' });
                fields.push({ name: 'S3', type: 'string' });
                fields.push({ name: 'AP3', type: 'string' });
                fields.push({ name: 'FP3', type: 'string' });
                fields.push({ name: 'SP3', type: 'string' });
                fields.push({ name: 'A4', type: 'string' });
                fields.push({ name: 'F4', type: 'string' });
                fields.push({ name: 'S4', type: 'string' });
                fields.push({ name: 'AP4', type: 'string' });
                fields.push({ name: 'FP4', type: 'string' });
                fields.push({ name: 'SP4', type: 'string' });
                fields.push({ name: 'A5', type: 'string' });
                fields.push({ name: 'F5', type: 'string' });
                fields.push({ name: 'S5', type: 'string' });
                fields.push({ name: 'AP5', type: 'string' });
                fields.push({ name: 'FP5', type: 'string' });
                fields.push({ name: 'SP5', type: 'string' });
                fields.push({ name: 'A6', type: 'string' });
                fields.push({ name: 'F6', type: 'string' });
                fields.push({ name: 'S6', type: 'string' });
                fields.push({ name: 'AP6', type: 'string' });
                fields.push({ name: 'FP6', type: 'string' });
                fields.push({ name: 'SP6', type: 'string' });
                fields.push({ name: 'A7', type: 'string' });
                fields.push({ name: 'F7', type: 'string' });
                fields.push({ name: 'S7', type: 'string' });
                fields.push({ name: 'AP7', type: 'string' });
                fields.push({ name: 'FP7', type: 'string' });
                fields.push({ name: 'SP7', type: 'string' });
            }
            return fields;
        }
        catch (err) {
            errorHandle(formName, 'datafields', err);
        }
    };
    //日期+1天
    function addDays(date, days) {
        try {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
        catch (err) {
            errorHandle(formName, 'addDays', err);
        }
    };
    //重綁grid資料
    function refreshGrid(div) {
        try {
            var options = $.data(div, formName).options;
            //addTotals(div);
            options.resvGridsource.localdata = options.getAllData['ResvTimePeriod'].rows;
            $('#' + $(div).prop('id') + 'dgdResvData').jqxGrid('updatebounddata');
            if (options.resvGridsource.localdata.length > 0) {
                $('#' + $(div).prop('id') + 'dgdResvData').jqxGrid('selectrow', 0);
            }

            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };
    //新增合計row
    function addTotals(div) {
        try {
            //alert('in');
            var options = $.data(div, formName).options;
            var lang = options.language
            var rows = options.getAllData['ResvTimePeriod'].rows;
            var rLength = rows.length;
            var row = { 'TIMEPERIOD': lang.gResv_TOTAL };

            for (var i = 1; i <= 7; i++) {
                var fields = ['A', 'F', 'S', 'AP', 'FP', 'SP'];
                for (var k in fields) {
                    row[fields[k] + i] = 0;
                    for (j = 0 ; j < rLength; j++) {
                        if (rows[j][fields[k] + i] > 0) {
                            row[fields[k] + i] += rows[j][fields[k] + i];
                        }
                    }
                }
            }
            options.getAllData['ResvTimePeriod'].rows.push(row);
            //alert(JSON.stringify(options.getAllData['ResvTimePeriod'].rows));

            return;

            //for (var i = 0; i < rLength; i++) {
            //    var keys = Object.keys(rows[i]);
            //    var kLength = keys.length;
            //    for (var j = 0; j < kLength; j++) {

            //    }
            //}
        }
        catch (err) {
        }
    };
    //button委派事件
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //var controls = $.data(div, formName).options.controls;
            //全區
            $('#' + $(div).prop('id') + 'btnAll').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                options.servCode = convertToNull(getControlObject(div, 'csServCode').csList('codeNo'));
                options.workCode = convertToNull(getControlObject(div, 'csMCode').csList('codeNo'));
                getOpenAllData(div, function (r) {
                    if (r.ResultBoolean == true) {
                        options.getAllData = JSON.parse(r.ResultXML);
                        options.doFirst = 0;
                        //$('#' + $(div).prop('id') + 'dgdResvData').unbind();
                        //$('#' + $(div).prop('id') + 'dgdResvData').off("celldoubleclick");
                        //$('#' + $(div).prop('id') + 'dgdResvData').jqxGrid('destroy');
                        addTotals(div);
                        renderResvGrid(div);
                        refreshGrid(div);
                    }
                    delete r;
                });
            });
            //重設
            $('#' + $(div).prop('id') + 'btnReset').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                options.servCode = convertToNull(getControlObject(div, 'csServCode').csList('codeNo'));
                options.workCode = convertToNull(getControlObject(div, 'csMCode').csList('codeNo'));
                getOpenAllData(div, function (r) {
                    if (r.ResultBoolean == true) {
                        options.getAllData = JSON.parse(r.ResultXML);
                        options.doFirst = 0;
                        //$('#' + $(div).prop('id') + 'dgdResvData').unbind();
                        //$('#' + $(div).prop('id') + 'dgdResvData').off("celldoubleclick");
                        //getControlObject(div, 'dgdResvData').jqxGrid('destroy');
                        addTotals(div);
                        renderResvGrid(div);
                        refreshGrid(div);
                    }
                    delete r;
                });
            });
            //上一週
            $('#' + $(div).prop('id') + 'btnLastWeek').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                options.firstDate = new Date(Date.parse(addDays(options.firstDate, -7)));
                options.servCode = convertToNull(getControlObject(div, 'csServCode').csList('codeNo'));
                options.workCode = convertToNull(getControlObject(div, 'csMCode').csList('codeNo'));
                getOpenAllData(div, function (r) {
                    if (r.ResultBoolean == true) {
                        options.getAllData = JSON.parse(r.ResultXML);
                        options.doFirst = 0;
                        //$('#' + $(div).prop('id') + 'dgdResvData').unbind();
                        //$('#' + $(div).prop('id') + 'dgdResvData').off("celldoubleclick");
                        //$('#' + $(div).prop('id') + 'dgdResvData').jqxGrid('destroy');
                        //$('#' + $(div).prop('id') + 'dgdResvData').remove();
                        //$('<td id="newgrid"></td>').appendTo($('<div data-id="dgdResvData" style="clear:both;"></div>'));
                        //$("newgrid").appendTo($('<div data-id="dgdResvData" style="clear:both;"></div>'));
                        //$('<div data-id="dgdResvData" style="clear:both;"></div>').appendTo($(div));
                        //$('#newgrid').html($('<div data-id="dgdResvData" style="clear:both;"></div>'));
                        //getControlObject(div, 'dgdResvData').jqxGrid('destroy');
                        addTotals(div);
                        renderResvGrid(div);
                        refreshGrid(div);
                        //gridAddHandler(div);
                    }
                    delete r;
                });
            });
            //下一週
            $('#' + $(div).prop('id') + 'btnNextWeek').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                options.firstDate = new Date(Date.parse(addDays(options.firstDate, +7)));
                options.servCode = convertToNull(getControlObject(div, 'csServCode').csList('codeNo'));
                options.workCode = convertToNull(getControlObject(div, 'csMCode').csList('codeNo'));
                getOpenAllData(div, function (r) {
                    if (r.ResultBoolean == true) {
                        options.getAllData = JSON.parse(r.ResultXML);
                        options.doFirst = 0;
                        //$('#' + $(div).prop('id') + 'dgdResvData').unbind();
                        //$('#' + $(div).prop('id') + 'dgdResvData').off("celldoubleclick");
                        //$('#' + $(div).prop('id') + 'dgdResvData').jqxGrid('destroy');
                        //$('#' + $(div).prop('id') + 'dgdResvData').remove();
                        //$('<div data-id="dgdResvData" style="clear:both;"></div>').appendTo($(div));
                        //$("newgrid").appendTo($('<div data-id="dgdResvData" style="clear:both;"></div>'));
                        //$('<td id="newgrid"></td>').appendTo($('<div data-id="dgdResvData" style="clear:both;"></div>'));
                        //$('#newgrid').html($('<div data-id="dgdResvData" style="clear:both;"></div>'));

                        addTotals(div);
                        renderResvGrid(div);
                        refreshGrid(div);
                        //gridAddHandler(div);
                    }
                    delete r;
                });
            });
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    //combobox委派事件
    function textAddHandler(div) {
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
                    errorHandle(formName, 'getOptionsData', err, true);
                }
            });

            $('#' + $(div).prop('id') + 'cboDisplayType').on('change', function (event) {
                var args = event.args;
                if (args) {
                    options.displayType = getControlObject(div, 'cboDisplayType').jqxComboBox('selectedIndex');
                    options.doFirst = 0;

                    //$('#' + $(div).prop('id') + 'dgdResvData').jqxGrid('destroy');
                    renderResvGrid(div)
                    refreshGrid(div);

                    ////if (resvTime == options.resvTime) return;
                }
            });

            getControlObject(div, 'csServCode').on('selectedIndexChanged', function (event) {
                var selItem = getControlObject(div, 'csServCode').csList('selectedItem');
                if (selItem != null) {
                    options.firstDate = new Date(Date.parse(options.firstDate));
                    options.servCode = convertToNull(getControlObject(div, 'csServCode').csList('codeNo'));
                    options.workCode = convertToNull(getControlObject(div, 'csMCode').csList('codeNo'));
                    getOpenAllData(div, function (r) {
                        if (r.ResultBoolean == true) {
                            options.getAllData = JSON.parse(r.ResultXML);
                            options.doFirst = 0;
                            addTotals(div);
                            renderResvGrid(div);
                            refreshGrid(div);
                        }
                        delete r;
                    });
                }
                else {
                    return;
                };
            });
            getControlObject(div, 'csMCode').on('selectedIndexChanged', function (event) {
                var selItem = getControlObject(div, 'csMCode').csList('selectedItem');
                if (selItem != null) {
                    options.firstDate = new Date(Date.parse(options.firstDate));
                    options.servCode = convertToNull(getControlObject(div, 'csServCode').csList('codeNo'));
                    options.workCode = convertToNull(getControlObject(div, 'csMCode').csList('codeNo'));
                    getOpenAllData(div, function (r) {
                        if (r.ResultBoolean == true) {
                            options.getAllData = JSON.parse(r.ResultXML);
                            options.doFirst = 0;
                            addTotals(div);
                            renderResvGrid(div);
                            refreshGrid(div);
                        }
                        delete r;
                    });
                }
                else {
                    return;
                };
            });

            return true;
        }
        catch (err) {
            errorHandle(formName, 'textAddHandler', err);
        }
    };
    //grid委派事件
    function gridAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //grid 綁定後委派事件
            $('#' + $(div).prop('id') + 'dgdResvData').on("bindingcomplete", function (event) {
                var args = event.args;
                if (args) {
                    var d = new Date(Date.parse(options.firstDate));
                    for (i = 0; i <= 6; i++) {
                        var m = addDays(d, i).getDay();
                        var color;
                        if (m == 0 || m == 6) {
                            //紅
                            color = '#ff3232'
                        }
                        else {
                            //紫
                            color = '#dfc1df'
                        }
                        $(div).find('div .jqx-grid-columngroup-header:eq(' + i + ')').css('background-color', color);
                    }
                }
            });
            ////grid row double click 委派事件
            //$('#' + $(div).prop('id') + 'dgdResvData').on('rowdoubleclick', function (event) {
            //    var args = event.args;
            //    if (args) {
            //        // row's visible index.
            //        var visibleIndex = args.visibleindex;
            //        // right click.
            //        var rightclick = args.rightclick;
            //    }
            //});
            ////grid 編輯觸發事件
            //$('#' + $(div).prop('id') + 'dgdResvData').on('cellbeginedit', function (event) {
            //    var args = event.args;
            //    $("#cellbegineditevent").text("Event Type: cellbeginedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
            //});
            //$('#' + $(div).prop('id') + 'dgdResvData').on('cellendedit', function (event) {
            //    var args = event.args;
            //    $("#cellendeditevent").text("Event Type: cellendedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
            //});

            //grid double click 委派事件 //2018.06.28 #7827 celldoubleclick改為cellclick
            $('#' + $(div).prop('id') + 'dgdResvData').on("cellclick", function (event) {
                // event arguments.
                var args = event.args;
                if (args) {
                    //時段column 不能點
                    if (args.columnindex == 0) {
                        return;
                    }
                    //合計row 不能點
                    var rows = options.getAllData['ResvTimePeriod'].rows;
                    var rLength = rows.length; //總筆數
                    if (args.visibleindex == rLength) {
                        return;
                    }
                    //取日期+時段   options.returnResvtime
                    var colDateIndex = args.datafield.substr(-1)
                    colDateIndex = colDateIndex - 1
                    var d = new Date(Date.parse(options.firstDate));
                    var getDate = d.getDate();
                    ////日期
                    //var month =  (addDays(d, colDateIndex).getMonth() + 1),
                    //    day = addDays(d, colDateIndex).getDate(),
                    //    year = addDays(d, colDateIndex).getFullYear();
                    //alert(year + '/' + month + '/' + day);
                    d.setDate(getDate + colDateIndex)
                    var newDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
                    //alert(newDate);

                    //時段
                    var timeString = rows[args.visibleindex]['TIMEPERIOD'];
                    timeString = ('0000' + timeString).slice(-4);
                    timeString = timeString.substr(0, 2) + ':' + timeString.slice(-2);
                    //alert(timeString);

                    //alert(newDate + ' ' + timeString);

                    options.returnResvtime = newDate + ' ' + timeString;
                    options.returnWorkCode = convertToNull(getControlObject(div, 'csMCode').csList('codeNo'));
                    options.returnServCode = convertToNull(getControlObject(div, 'csServCode').csList('codeNo'));
                    //alert(options.returnWorkCode);
                    options.isSaved = true;
                    close(div);


                    ////alert("OK double click");
                    //// row's bound index.
                    //var rowBoundIndex = args.rowindex;
                    //alert("row's bound index:" + rowBoundIndex)
                    //// row's visible index.
                    //var rowVisibleIndex = args.visibleindex;
                    //alert("row's visible index:" + rowVisibleIndex)
                    //// column index.
                    //var columnIndex = args.columnindex;
                    //alert("column index:" + columnIndex)
                    //// column data field.
                    //var dataField = args.datafield;
                    //alert("column data field:" + dataField)
                    //// cell value
                    //var value = args.value;
                    //alert("cell value:" + value)

                };
            });

            return true;
        }
        catch (err) {
            errorHandle(formName, 'gridAddHandler', err);
        }
    };
    //取得panels高度
    function getPanelsHeight(div) {
        var height1 = $('#' + $(div).prop('id') + 'gbxSpTop').height();
        var height2 = $('#' + $(div).prop('id') + 'gbxSpButton').height();
        return [{ size: height1 }, { size: height2 }];
    };
    //重設grid高度
    //function resetGridsHeight(div, panels) {
    //    try {
    //            $('#' + $(div).prop('id') + 'dgdResvData').jqxGrid({ height: $('#' + $(div).prop('id') + 'gbxAll').jqxSplitter('panels')[1].size - 60 });
    //    }
    //    catch (err) {
    //        errorHandle(formName, 'resetGridsHeight', err);
    //    }
    //}
    //CanView
    function canView(params, action) {
        try {
            var checkPara = checkParameters(editMode.view, params);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX('CanView', params, function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canView', err);
        }
    };
    function checkCanXX(method, data, action) {
        try {
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, cloneJSON(paraLoginInfo));
            var params = getParameters(riadllName,
                riaClassName,
                method,
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    action(d);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'checkCanXX', err);
        }
    };
    function checkParameters(em, data) {
        try {
            ////檢核table 存不存在
            //var table = getTableName(data);
            //if (table == null) return ([false, 'table inparas not exist!!']);
            ////檢核欄位存不存在
            //var checkCols = ['', '', '','',''];
            ////新增檢核客戶編號
            //if (em == editMode.append) {
            //    if (data[table].rows[0]['CustId'.toUpperCase()] == null) {
            //        return ([false, 'column custid not exist!!']);
            //    }
            //}
            //else {
            //    if (data[table].rows[0]['SNo'.toUpperCase()] == null) {
            //        return ([false, 'column sno not exist!!']);
            //    }
            //}
            return ([true]);
        }
        catch (err) {
            errorHandle(formName, 'checkParameters', err);
        }
    };
    function getTableName(data) {
        try {
            var keys = Object.keys(data);
            var kLengths = keys.length
            var table;
            //檢核table 存不存在
            for (var i = 0 ; i < kLengths; i++) {
                if (keys[i].toUpperCase() == 'inparas'.toUpperCase()) {
                    table = keys[i];
                    break;
                }
            }
            if (table == null) return;
            return table
        }
        catch (err) {
            errorHandle(formName, 'getTableName', err);
        }
    };
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                if (options.editMode != editMode.view && options.isSaved != true) {
                    messageBox("OK", messageType.yesno, null, function (flag) {
                        if (flag == 'yes') {
                            $(options.container).csWindow('close');
                        }
                    });
                }
                else {
                    $(options.container).csWindow('close');
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };


})(jQuery);