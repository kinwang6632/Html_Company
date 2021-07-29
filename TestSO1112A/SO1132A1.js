(function ($) {
    var formName = 'SO1132A1';
    var riadllName = 'CableSoft.SO.RIA.Billing.Simple.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.Simple.Web.Simple';
    var buttonsHeight = 25;
    var textHeight = 25;

    $.fn.SO1132A1 = function (options, param, param2) {
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
                        options: $.extend({}, new defaults(), new SO1132A1(), options)
                    });
                }
                formLoaded(this);
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1132A1', err);
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
        canDelete: function (jq, params, param2) {
            return canDelete(params, param2);
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
        this.parentData = {};
        this.localization = null;
        this.container = null;
        this.close = {};

        this.isAutoClosed = 0;      //程式執行完畢是否自動關閉
        this.doProcessMark = 0;     //是否沖帳1.是0.否
        this.deleteType = 0;        //作廢模式:0-BillNo+Item,1-MediaBillNo,2-MediaBillNo+ServiceType 
        this.isWip = 0;             //是否從工單傳入
        this.wipType = 0;           //是否從工單進入,0-否,1-裝機,2-維修,3-停拆移
        this.wipData = {};          //取工單傳入的DataSet(Simple,ChooseFacility),只能回傳Simple
        this.billNo = null;
        this.item = null;
        this.isReCharge = 0;        //是否由作廢重產進入,部分條件不做檢核;0-否,1-是
        this.type = 0;              //0=BillNo+Item 1=MediaBillNo 2=MediaBillNo+ServiceType

        //this.reProduce= false;       //'True 作廢重產
        //this.produceCharge = {};     //作廢重產回傳的DataSet  DataSet(ProduceCharge)
        //this.cancelData = {};        //作廢重產回傳的DataSet  DataSet(CANCELDATA)
    });
    //formResize
    function formResize(div, params) {
        try {
            //var options = $.data(div, formName).options;
            //var controls = options.controls;
            //var msg = "";
            //for (var i = 0; i < controls.length; i++) {
            //    var o = $('#' + controls[i].name);
            //    o.each(function () {
            //        $(this)[controls[i].type]('resize');
            //    });
            //};
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    //formClosed
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed'](options.returnValue);
        };
        $(options['container']).csWindow('close');
    };
    //formDestroy
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            for (j = 3; j >= 0; j--) {
                for (i = 0; i < controls.length; i++) {
                    if (controls[i].level == j) {
                        var o = $('#' + $(div).prop('id') + controls[i].name);
                        if (o.length > 0) {
                            $(o[0]).off();
                            $(o[0])[controls[i].type]('destroy');
                        }
                    }
                }
            }
            deleteJSONObject(controls);
            var options = $.data(div, formName).options;
            deleteJSONObject(options);
            //options.length = 0;
            //options = null;
            //delete options;
            $.data(div, formName, null);

            //var controls = $.data(div, formName).options.controls;
            //destroyControls(controls);
            //var options = $.data(div, formName).options
            //options.length = 0;
            //options = null;
            //$.data(div, formName, null);
            ////$(div).remove();
            //return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    //檢核table 存不存在
    function getTableName(data) {
        var keys = Object.keys(data);
        var kLengths = keys.length
        var table;
        for (var i = 0 ; i < kLengths; i++) {
            if (keys[i].toUpperCase() == 'Simple'.toUpperCase()) {
                table = keys[i];
                break;
            };
        };
        if (table == null) return;
        return table
    };
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
                };
                //$($(div).find('[data-id=codeno]')[0])
            };
        }
        catch (err) {
            errorHandle(formName, 'setParameter', err);
        }
    };
    //canDelete
    function canDelete(params, action) {
        try {
            var checkPara = checkParameters(editMode.delete, params.inData);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX('CanDelete', params, function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canDelete', err);
        };
    };
    //checkCanXX
    function checkCanXX(method, data, action) {
        try {
            //var simple = getTableName(data);
            if (isEmpty(data.inData['isReCharge']) == true) {
                data['isReCharge'] = 0;
            };

            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                Type:{type: 'integer', value:0},
                dsCharge: { type: 'string', value: JSON.stringify(data.inData) },
                IsWip: { type: 'integer', value: data.isWip },
                IsReCharge: { type: 'integer', value: data.isReCharge },
                aEditMode: { type: 'integer', value: data.editMode },
                DoProcessMark: { type: 'integer', value: 0 },
                DeleteType: { type: 'integer', value: 0 },
            });

            var params = getParameters(riadllName, riaClassName, method, JSON.stringify(parameters));
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
    //檢核參數是否正確 checkParameters
    function checkParameters(em, data) {
        //檢核table 存不存在
        var table = getTableName(data);
        if (table == null) return ([false, 'table simple not exist!!']);
        if (em != editMode.delete) { return ([false, 'editmode not delete !!']); };

        //檢核欄位存不存在
        //0=BillNo+Item 1=MediaBillNo 2=MediaBillNo+ServiceType
        if (data[table].rows[0]['BillNo'.toUpperCase()] == null) {
            return ([false, 'column billno not exist!!']);
        };
        if (data[table].rows[0]['Item'.toUpperCase()] == null) {
            return ([false, 'column item not exist!!']);
        };

        return ([true]);
    };
    //formLoaded
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            //options.loginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            var data;
            if (options.wipType > 0) {
                data = options.wipData;
            }
            else {
                data = options.parameters;
            };
            var checkPara = checkParameters(options.editMode, data);
            var table = 'Simple'.toUpperCase()
            if (checkPara[0] == false) {
                //action(checkPara);
                messageBox(checkPara[1], null, null, function (flag) {
                    close(div);
                });
                return;
            };
            if (data.Simple.rows[0]['BillNo'.toUpperCase()] != null) {
                options.billNo = data.Simple.rows[0]['BillNo'.toUpperCase()];
            };
            if (data.Simple.rows[0]['Item'.toUpperCase()] != null) {
                options.item = data.Simple.rows[0]['Item'.toUpperCase()];
            };

            $.ajax({
                url: 'SO1000\\' + formName + '.html',
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function (d) {
                            if (d == true) {
                                formResize(div);
                                //載入detial控制項事件
                                detialAddHandler(div);
                                //載入button事件
                                buttonAddHandler(div);
                                //$(div).trigger('loaded');
                                $(div).trigger('loaded', [this, options]);
                            }
                            else {
                                return;
                            };
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
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
    //getParaLoginInfo
    function getParaLoginInfo(div) {
        var options = $.data(div, formName).options;
        var li = cloneJSON(options.loginInfo);
        return $.extend({}, { loginInfo: { type: 'logininfo', value: li.loginInfo } });
    };
    //語系檔
    function changeLanguage(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //var lang = $.data(div, formName).options.language;
            var keys = Object.keys(lang);
            var kLength = keys.length;
            //改label
            for (var i = 0 ; i < kLength; i++) {
                var o = $('#' + $(div).prop('id') + keys[i]);
                if (o.length > 0 && keys[i].substr(0, 1) == 'l') {
                    o.text(lang[keys[i]]);
                };
            };
        }
        catch (err) {
            errorHandle(formName, 'changeLanguage', err);
        }
        //alert(JSON.stringify($.data(div, formName).options.language));
    };
    //getControlObject
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
            $(div).css('padding', 1);

            //建立Panel
            oArray = ["gbxTop", "gbxBottom"];
            var oHightArray = ["120", "30"];
            var oWidthArray = ["99%", "99%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxPanel({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    //sizeMode: "wrap"
                });
                //$('#' + iId).jqxExpander('setHeaderContent', lang[oArray[i]]);
                controls.push({ name: iId, type: 'jqxPanel', level: level });
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        $('#' + iId + scrollBars[j]).remove();
                    };
                };
            };
            level += 1;

            //建立日期元件
            oArray = ["dtCancelDate"];
            oWidthArray = ["30%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var fs = "yyyy/MM/dd";
                $('#' + iId).csDateTime({
                    theme: options.theme,
                    formatString: fs,
                    showCalendarButton: false,
                    value: null,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: true
                });
                controls.push({ name: iId, type: 'jqxDateTimeInput', level: level });
            };
            level += 1;

            //建立單選元件
            oArray = ["csCancelCode"];
            oWidthArray = ["80%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 60,
                    width: oWidthArray[i],
                });
                controls.push({ name: iId, type: 'csList', level: level });
            };
            level += 1;

            //建立按鈕
            oArray = ["btnSave", "btnExit"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 80;
                var text = lang[oArray[i]];
                switch (oArray[i]) {
                    case "btnSave":
                        img = imageScr.save; break;
                    case "btnExit":
                        img = imageScr.exit; break;
                    default:
                };
                o.text(text);
                o.jqxButton($.extend({}, img, imagePosition, {
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                }));
                controls.push({ name: bId, type: 'jqxButton', level: level });
            };
            level += 1;


            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    //init
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            options.loading = true;
            //語系檔
            changeLanguage(div);
            //render畫面元件
            renderControl(div);
            //作廢日期
            getControlObject(div, 'dtCancelDate').csDateTime('setDate', formatDateTime(new Date(), 'yyyyMMdd', true));

            queryData(div, function (isOk, msg) {
                if (isOk) {
                    options.loading = false;
                    action(true);
                }
                else {
                    messageBox(msg);
                    action(false);
                };
            });

            return;
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    //載入所有資料
    function queryData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var data;
            //if (options.wipType > 0) {
            //    data = options.wipData;
            //}
            //else {
            //    data = options.parameters;
            //};
            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {});
            var params = getParameters(riadllName, riaClassName, 'GetCancelCode', JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        //delete parameters;
                        //delete params;
                        if (data.ResultBoolean == true) {
                            //var r = JSON.parse(data.ResultXML);
                            var r = data.ResultCode;
                            //作廢原因
                            if (r.length > 0) {
                                getControlObject(div, 'csCancelCode').csList('source', r);
                                getControlObject(div, 'csCancelCode').csList('selectedIndex', 0);
                            };
                        };
                        delete r;

                        if (data.ResultBoolean == true) {
                            action(true);
                        }
                        else {
                            action(false, data.ErrorMessage);
                        };
                    }
                    catch (err) {
                        errorHandle(formName, 'queryData', err);
                        action(false, err);
                    };
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'queryData', err);
        }
    };
    //clearInitData
    function clearInitData(div) {
        var options = $.data(div, formName).options;
        var initData = options.initData;
        var keys = Object.keys(initData);
        var iLength = keys.length;
        for (var i = 0; i < iLength; i++) {
            if (keys[i] != 'ServiceType') {
                delete initData[keys[i]]
            };
        };
        if (initData.length > 0) {
            options.initData = initData.filter(function (e) { return e });
        };
    };
    //載入detial控制項事件
    function detialAddHandler(div) {
        var options = $.data(div, formName).options;
        var lang = options.language;
        //當csWindow按[X]時
        if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
            $(options.container).on('winClosing', function (e) {
                close(div)
            });
        };
    };
    //載入button事件
    function buttonAddHandler(div) {
        var options = $.data(div, formName).options;
        var lang = options.language;

        //存檔
        getControlObject(div, 'btnSave').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; };
            ////參數檢核
            //if (isDataOk(div) != true) return;
            if (isEmpty(getControlObject(div, 'dtCancelDate').csDateTime('getDate'))) { return; };

            var ccValue = convertToNull(getControlObject(div, 'csCancelCode').csList('selectedItem'));
            if (isEmpty(ccValue) == true) {
                messageBox(lang.needCancelCode, messageType.critical, null, function () {
                    return;
                });
                return;
            };

            //執行存檔
            save(div, function (isOk, msg) {
                if (isOk == true) {
                    messageBox(lang.deleteOK, messageType.critical, null, function () {
                        options.isSaved = true;
                        //關閉CSWindow
                        close(div);
                    });
                }
                else {
                    messageBox(msg, messageType.critical);
                    return;
                }
            });
        });
        //取消
        getControlObject(div, 'btnExit').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }

            if (options.editMode == editMode.append || options.editMode == editMode.edit) {
                //messageBox(options.language.quiteNote, messageType.yesno, null, function (flag) {
                //    if (flag == 'yes') {
                        options.isSaved = false;
                        //關閉CSWindow
                        close(div);
                //    };
                //});
            } else {
                options.isSaved = false;
                //關閉CSWindow
                close(div);
            };
        });
    };
    //將控制項細資存入物件
    function getSaveData(div) {
        try {
            var options = $.data(div, formName).options;

            var row = options.wipData.Simple.rows[0];
            //var row = options.parameters.Simple.rows[0];

            //未收原因
            row['UCCODE'] = null;
            row['UCNAME'] = null;
            //作廢日期
            row['REALDATE'] = dateToJson(getControlObject(div, 'dtCancelDate').csDateTime('getDate'));
            //作廢原因
            row['CANCELCODE'] = convertToNull(getControlObject(div, 'csCancelCode').csList('codeNo'));
            row['CANCELNAME'] = convertToNull(getControlObject(div, 'csCancelCode').csList('description'));
            row['CANCELFLAG'] = 1;

            //data['Simple'].rows.push(row);
            //options.wipData.Simple = data['Simple'];
            //return data;
        }
        catch (err) {
            errorHandle(formName, 'getSaveData', err);
        }
    };
    //執行存檔
    function save(div, action) {
        try {
            var options = $.data(div, formName).options;

            if (options.wipType > 0) {
                //將控制項細資存入物件
                getSaveData(div);
                if (options.wipData['ChooseFacility'] != null) {
                    deleteJSONObject(options.wipData.ChooseFacility);
                    //delete options.wipData[tables['ChooseFacility']];
                };
                options.isSaved = true;
                action(true);
            }
            else {
                var dateValue = getControlObject(div, 'dtCancelDate').csDateTime('getDate');
                var codeNo = convertToNull(getControlObject(div, 'csCancelCode').csList('codeNo'));
                var description = convertToNull(getControlObject(div, 'csCancelCode').csList('description'));

                var options = $.data(div, formName).options;
                var paraLoginInfo = getParaLoginInfo(div);
                var simpleData = { Simple: cloneJSON(options.parameters.Simple) };
                var parameters = $.extend({}, paraLoginInfo, {
                    Type: { type: 'integer', value: options.deleteType },
                    dsCharge: { type: 'string', value: JSON.stringify(simpleData) },
                    CancelDate: { type: 'date', value: convertToNull(dateValue) },
                    CancelCode: { type: 'integer', value: convertToNull(codeNo) },
                    CancelName: { type: 'string', value: convertToNull(description) }
                });
                var params = getParameters(riadllName, riaClassName, 'VoidData', JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        deleteJSONObject(parameters)
                        deleteJSONObject(simpleData)
                        //parameters.length = 0;
                        //parameters = null;
                        //delete parameters;
                        if (data.ResultBoolean == true) {
                            options.isSaved = true;
                            action(true);
                        }
                        else {
                            action(false, data.ErrorMessage);
                        }
                    }
                });

            };
        }
        catch (err) {
            errorHandle(formName, 'save', err);
        };
    };

    //將日期格式資料轉為json日期字串(2016-12-27T00:00:00.00Z)
    function dateToJson(d) {
        try {

            Date.prototype.toJSON = function () {
                return this.getFullYear() + '-' +
                    ((this.getMonth() + 1) < 10 ? '0' + (this.getMonth() + 1) : (this.getMonth() + 1)) + '-' +
                    (this.getDate() < 10 ? '0' + this.getDate() : this.getDate()) + 'T' +
                    (this.getHours() < 10 ? '0' + this.getHours() : this.getHours()) + ':' +
                    (this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes()) + ':' +
                    (this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds()) + '.' +
                    (this.getMilliseconds() < 10 ? '0' + this.getMilliseconds() : this.getMilliseconds()) + 'Z';
            };
            return d.toJSON();
        } catch (err) {
            throw err.message;
        };
    };
    //關閉CSWindow
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                if (options.isSaved != true) {
                    //messageBox("OK", messageType.yesno, null, function (flag) {
                    //    if (flag == 'yes') {
                            $(options.container).csWindow('close');
                    //    };
                    //});
                }
                else {
                    $(options.container).csWindow('close');
                };
            };
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };

})(jQuery);