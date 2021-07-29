(function ($) {
    var formName = 'SO1132A';
    var riadllName = 'CableSoft.SO.RIA.Billing.Simple.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.Simple.Web.Simple';
    var buttonsHeight = 25;
    var textHeight = 23;

    $.fn.SO1132A = function (options, param, param2, param3) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, param2, param3);
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
                        options: $.extend({}, new defaults(), new SO1132A(), options)
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
        canAppend: function (jq, params, param2) {
            return canAppend(params, param2);
        },
        canEdit: function (jq, params, param2, param3) {
            return canEdit(params, param2, param3);
        },
        canDelete: function (jq, params, param2, param3) {
            return canDelete(params, param2, param3);
        },
        canPrint: function (jq, params, param2) {
            return canPrint(params, param2);
        },
        canReverse: function (jq, params, param2) {
            return canReverse(params, param2);
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
        //this.isWip = 0;             //是否從工單傳入
        this.wipType = 0;           //是否從工單進入,0-否,1-裝機,2-維修,3-停拆移
        this.wipResvTime = null;    //工單傳入的預約時間,未傳則為當日
        this.wipClctEn = null;      //工單傳入工程人員,帶入收費人員預設
        this.wipClctName = null;
        this.wipData = {};          //取工單傳入的DataSet(Simple,ChooseFacility),只能回傳Simple
        this.billKind = 2;          //'2014.07.10 #6766 呼叫後端取得收費資料使用  判斷單據類別 P_OPTION 裝機(I)單傳0,其他工單(M,P)傳1,收費(B,T)傳2
        this.blnChangeCharge = false;  //新增沖帳時,收費資料顯示回畫面上,不能帶入原收費項目
        this.serviceTypeIndex = 0;
        this.custId = 0;
        this.serviceType = '';
        this.billNo = '';
        this.item = 0;
        this.mediaBillNo = '';
        this.faciSNo = '';
        this.faciSeqNo = '';
        this.blnLongPay = false;
        this.blnCanHandler = true;

    });
    //formResize
    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var height = $(div).height() - buttonsHeight - 3;
            getControlObject(div, 'gbxData').jqxPanel({ height: height });
            getControlObject(div, 'dgContainer').csTabs({ height: height - 30 });
            getControlObject(div, 'gbxSpBottom').css({ height: buttonsHeight + 2 });
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
            destroyControls(controls);
            var options = $.data(div, formName).options
            deleteJSONObject(options);
            $.data(div, formName, null);

            //var controls = $.data(div, formName).options.controls;
            //for (j = 3; j >= 0; j--) {
            //    for (i = 0; i < controls.length; i++) {
            //        if (controls[i].level == j) {
            //            var o = $('#' + $(div).prop('id') + controls[i].name);
            //            if (o.length > 0) {
            //                $(o[0]).off();
            //                $(o[0])[controls[i].type]('destroy');
            //            }
            //        }
            //    }
            //}
            //deleteJSONObject(controls);
            //var options = $.data(div, formName).options;
            //deleteJSONObject(options);
            ////options.length = 0;
            ////options = null;
            ////delete options;
            //$.data(div, formName, null);

            ////var controls = $.data(div, formName).options.controls;
            ////destroyControls(controls);
            ////var options = $.data(div, formName).options
            ////options.length = 0;
            ////options = null;
            ////$.data(div, formName, null);
            //////$(div).remove();
            ////return true;
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
    //canAppend
    function canAppend(params, action) {
        try {
            if (isEmpty(params['doProcessMark']) == true) {
                params['doProcessMark'] = 0;
            };
            if (isEmpty(params['deleteType']) == true) {
                params['deleteType'] = 0;
            };
            if (isEmpty(params['wipType']) == true) {
                params['wipType'] = 0;
            };

            var checkPara = checkParameters(editMode.append, params, params['doProcessMark']);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanAppend(params, function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                });
            };
        }
        catch (err) {
            errorHandle(formName, 'canAppend', err);
        }
    };
    //checkCanAppend
    function checkCanAppend(data, action) {
        try {
            //var simple = getTableName(data);
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            //var Simple = cloneJSON(data.Simple);
            var simple = { Simple: cloneJSON(data.Simple) };
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                dsCharge: { type: 'string', value: JSON.stringify(simple) },
                aEditMode: { type: 'integer', value: data.editMode },
                DoProcessMark: { type: 'integer', value: data.doProcessMark },
                DeleteType: { type: 'integer', value: data.deleteType },
                IsWip: { type: 'integer', value: data.wipType }
            });

            var params = getParameters(riadllName,
                riaClassName,
                'CanAppend',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    action(d);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'checkCanAppend', err);
        };
    };
    //canView
    function canView(params, action) {
        try {
            if (isEmpty(params['doProcessMark']) == true) {
                params['doProcessMark'] = 0;
            };
            if (isEmpty(params['deleteType']) == true) {
                params['deleteType'] = 0;
            };
            if (isEmpty(params['wipType']) == true) {
                params['wipType'] = 0;
            };

            var checkPara = checkParameters(editMode.view, params, params['doProcessMark']);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX('CanView', params, function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                });
            };
        }
        catch (err) {
            errorHandle(formName, 'canView', err);
        };
    };
    //canEdit
    function canEdit(params, action, opts) {
        try {
            if (isEmpty(params['doProcessMark']) == true) {
                params['doProcessMark'] = 0;
            };
            if (isEmpty(params['deleteType']) == true) {
                params['deleteType'] = 0;
            };
            if (isEmpty(params['wipType']) == true) {
                params['wipType'] = 0;
            };

            var checkPara = checkParameters(editMode.edit, params, params['doProcessMark']);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX('CanEdit', params, function (d) {
                    if (d.ResultBoolean && d.ErrorCode == 1) {
                        showCheckManagerPWD(opts, editMode.edit, function (r) {
                            action([r.isSaved, r.errorMessage]);
                        });
                    }
                    else {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }
                });
            };
        }
        catch (err) {
            errorHandle(formName, 'canEdit', err);
        };
    };
    //canDelete
    function canDelete(params, action, opts) {
        try {
            if (isEmpty(params['doProcessMark']) == true) {
                params['doProcessMark'] = 0;
            };
            if (isEmpty(params['deleteType']) == true) {
                params['deleteType'] = 0;
            };
            if (isEmpty(params['wipType']) == true) {
                params['wipType'] = 0;
            };

            var checkPara = checkParameters(editMode.delete, params, params['doProcessMark']);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX('CanDelete', params, function (d) {
                    if (d.ResultBoolean && d.ErrorCode == 1) {
                        showCheckManagerPWD(opts, editMode.delete, function (r) {
                            action([r.isSaved, r.errorMessage]);
                        });
                    }
                    else {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canDelete', err);
        };
    };
    //canReverse
    function canReverse(params, action) {
        try {
            params['doProcessMark'] = 1;
            if (isEmpty(params['deleteType']) == true) {
                params['deleteType'] = 0;
            };
            if (isEmpty(params['wipType']) == true) {
                params['wipType'] = 0;
            };

            var checkPara = checkParameters(editMode.edit, params, 1);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanXX('CanReverse', params, function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                });
            };
        }
        catch (err) {
            errorHandle(formName, 'canReverse', err);
        };
    };
    //checkCanXX
    function checkCanXX(method, data, action) {
        try {
            //var simple = getTableName(data);
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var simple = { Simple: cloneJSON(data.Simple) };
            //var Simple = cloneJSON(data.Simple);
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                dsCharge: { type: 'string', value: JSON.stringify(simple) },
                aEditMode: { type: 'integer', value: data.editMode },
                DoProcessMark: { type: 'integer', value: data.doProcessMark },
                DeleteType: { type: 'integer', value: data.deleteType },
                IsWip: { type: 'integer', value: data.wipType }
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
    //canPrint
    function canPrint(params, action) {
        try {
            if (isEmpty(params['doProcessMark']) == true) {
                params['doProcessMark'] = 0;
            };
            if (isEmpty(params['deleteType']) == true) {
                params['deleteType'] = 0;
            };
            if (isEmpty(params['wipType']) == true) {
                params['wipType'] = 0;
            };

            var checkPara = checkParameters(editMode.print, params);
            action(checkPara);
        }
        catch (err) {
            errorHandle(formName, 'canPrint', err);
        };
    };
    //檢核參數是否正確 checkParameters
    function checkParameters(em, data, doProcessMark) {
        //檢核table 存不存在
        var obj = new SO1132A();
        var lang = obj.language;
        var table = getTableName(data);
        //if (table == null) return ([false, 'table simple not exist!!']);
        if (table == null) return ([false, lang.chkTable]);
        //檢核欄位存不存在
        var checkCols = ['', '', ''];
        //新增檢核客戶編號
        if (data[table].rows[0]['CustId'.toUpperCase()] == null) {
            //return ([false, 'column custid not exist!!']);
            return ([false, lang.chkColumnCustid]);
        };
        if (em != editMode.append) {
            //if (data[table].rows[0]['SERVICETYPE'.toUpperCase()] == null) {
            //    return ([false, 'column servicetype not exist!!']);
            //};
            //if (data[table].rows[0]['FACISEQNO'.toUpperCase()] == null) {
            //    return ([false, 'column faciseqno not exist!!']);
            //};
        };
        if (!(em == editMode.append && doProcessMark == 0)) {
            if (data[table].rows[0]['BillNo'.toUpperCase()] == null) {
                //return ([false, 'column billno not exist!!']);
                return ([false, lang.chkColumnBillNo]);
            };
            if (data[table].rows[0]['Item'.toUpperCase()] == null) {
                //return ([false, 'column item not exist!!']);
                return ([false, lang.chkColumnItem]);
            };
        }
        else {
            if (em != editMode.append) {
                if (data[table].rows[0]['FaciSNo'.toUpperCase()] == null) {
                    //return ([false, 'column FaciSNo not exist!!']);
                    return ([false, lang.chkColumnFaciSNo]);
                };
            }
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
            var checkPara = checkParameters(options.editMode, data, options.doProcessMark);
            var table = 'Simple'.toUpperCase()
            if (checkPara[0] == false) {
                //action(checkPara);
                messageBox(checkPara[1], messageType.critical, null, function (flag) {
                    close(div);
                });
                return;
            };
            if (data.Simple.rows[0]['CustId'.toUpperCase()] != null) {
                options.custId = data.Simple.rows[0]['CustId'.toUpperCase()];
            };
            if (data.Simple.rows[0]['SERVICETYPE'.toUpperCase()] != null) {
                options.serviceType = data.Simple.rows[0]['SERVICETYPE'.toUpperCase()];
            };
            if (data.Simple.rows[0]['FACISEQNO'.toUpperCase()] != null) {
                options.faciSeqNo = data.Simple.rows[0]['FACISEQNO'.toUpperCase()];
            };
            if (data.Simple.rows[0]['FaciSNo'.toUpperCase()] != null) {
                options.faciSNo = data.Simple.rows[0]['FaciSNo'.toUpperCase()];
            };
            if (data.Simple.rows[0]['BillNo'.toUpperCase()] != null) {
                options.billNo = data.Simple.rows[0]['BillNo'.toUpperCase()];
            };
            if (data.Simple.rows[0]['Item'.toUpperCase()] != null) {
                options.item = data.Simple.rows[0]['Item'.toUpperCase()];
            };
            //2018.03.20 調整加傳版本loadForm
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
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
                                frmAddHandler(div);
                                //$(div).trigger('loaded');
                                $(div).trigger('loaded', [this, options]);
                                getControlObject(div, 'dgContainer').csTabs({ selectedItem: 0 });
                            }
                            else {
                                return;
                            };
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
            //            init(div, function (d) {
            //                if (d == true) {
            //                    formResize(div);
            //                    //載入detial控制項事件
            //                    detialAddHandler(div);
            //                    //載入button事件
            //                    buttonAddHandler(div);
            //                    frmAddHandler(div);
            //                    //$(div).trigger('loaded');
            //                    $(div).trigger('loaded', [this, options]);
            //                    getControlObject(div, 'dgContainer').csTabs({ selectedItem: 0 });
            //                }
            //                else {
            //                    return;
            //                };
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
    //getParaLoginInfo
    function getParaLoginInfo(div) {
        var options = $.data(div, formName).options;
        var li = cloneJSON(options.loginInfo);
        return $.extend({}, { loginInfo: { type: 'logininfo', value: li.loginInfo } });
    };
    //getServiceType
    function getServiceType(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'GetServiceType',
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
            errorHandle(formName, 'getServiceType', err);
        }
    };
    //設定基本參數 setBasicPara
    function setBasicPara(div) {
        var options = $.data(div, formName).options;
        var data;
        if (options.wipType > 0) {
            data = options.wipData;
        }
        else {
            data = options.parameters;
        };
        //var table = 'Simple'.toUpperCase()

        if (data['Simple'].rows[0]['CUSTID'] != null) {
            options.custId = data['Simple'].rows[0]['CUSTID'];
        };
        if (data['Simple'].rows[0]['SERVICETYPE'] != null) {
            options.serviceType = data['Simple'].rows[0]['SERVICETYPE'];
        };
        if (data['Simple'].rows[0]['BILLNO'] != null) {
            options.billNo = data['Simple'].rows[0]['BILLNO'];
        };
        if (data['Simple'].rows[0]['ITEM'] != null) {
            options.item = data['Simple'].rows[0]['ITEM'];
        };
        if (data['Simple'].rows[0]['MEDIABILLNO'] != null) {
            options.mediaBillNo = data['Simple'].rows[0]['MEDIABILLNO'];
        };
        if (data['Simple'].rows[0]['FACISNO'] != null) {
            options.faciSNo = data['Simple'].rows[0]['FACISNO'];
        };
        if (data['Simple'].rows[0]['FACISEQNO'] != null) {
            options.faciSeqNo = data['Simple'].rows[0]['FACISEQNO'];
        };
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
            //$(div).css('padding', 1);
            //隱藏灰色卷軸
            $(div).css('overflow', 'hidden');

            //建立Panel
            oArray = ["gbxData"];
            var oHightArray = ["80%"];
            var oWidthArray = ["99%"];
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
                        //$('#' + iId + scrollBars[j]).remove();
                        $('#' + iId + scrollBars[j]).css('display', 'none');
                    };
                };
            }
            level += 1;

            //oArray = ["gbxSpTop", "gbxSpBottom", "gbxML", "gbxMR"];
            //var oHightArray = [height - 40, "30px", height - 40, height - 40];
            ////var oHightArray = ["460", "30", "460", "460"];
            //var oWidthArray = ["99.5%", "99.5%", "49.5%", "49.5%"];
            //oLength = oArray.length;
            //for (var i = 0 ; i < oLength; i++) {
            //    var iId = $(div).prop('id') + oArray[i];
            //    $('#' + iId).jqxPanel({
            //        theme: options.theme,
            //        width: oWidthArray[i],
            //        height: oHightArray[i],
            //        //sizeMode: "wrap"
            //        autoUpdate: true
            //    });
            //    //$('#' + iId).jqxExpander('setHeaderContent', lang[oArray[i]]);
            //    controls.push({ name: iId, type: 'jqxPanel', level: level });
            //    var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
            //    for (var j = 0; j < scrollBars.length; j++) {
            //        if ($('#' + iId + scrollBars[j]).length > 0) {
            //            $('#' + iId + scrollBars[j]).remove();
            //            //$('#' + iId + scrollBars[j]).css('display', 'none');
            //        };
            //    };
            //};
            //level += 1;

            //Tabs
            // $('#csTabs').csTabs('setTitleAt', 0, 'test'); //430
            oArray = ["dgContainer"];
            var oHightArray = ["98%"];
            var oWidthArray = ["100%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csTabs({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    selectedItem: 1
                    //sizeMode: "wrap"
                });
                //$('#' + iId).jqxExpander('setHeaderContent', lang[oArray[i]]);
                $('#' + iId).csTabs('setTitleAt', 0, lang.ltBPCODE);
                $('#' + iId).csTabs('setTitleAt', 1, lang.ltINVOICE);
                $('#' + iId).csTabs('setTitleAt', 2, lang.ltACCOUNT);
                $('#' + iId).csTabs('setTitleAt', 3, lang.ltRATE);
                $('#' + iId).csTabs('setTitleAt', 4, lang.ltCLOSENOTE);
                controls.push({ name: iId, type: 'csTabs', level: level });
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        //$('#' + iId + scrollBars[j]).remove();
                        $('#' + iId + scrollBars[j]).css('display', 'none');
                    };
                };
            };
            level += 1;

            //建立jqxExpander
            oArray = ["gbxNoteClose", "gbxNotePopu"];
            var oWidthArray = ["98%", "98%"];
            //var oHightArray = ["150", "170"];
            var oHightArray = ["58%", "38%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxExpander({
                    theme: options.theme,
                    showArrow: false,
                    expanded: true,
                    toggleMode: 'none',
                    width: oWidthArray[i],
                    height: oHightArray[i]
                });
                controls.push({ name: iId, type: 'jqxExpander', level: level });
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        //$('#' + iId + scrollBars[j]).remove();
                        $('#' + iId + scrollBars[j]).css('display', 'none');
                    };
                };
            };
            level += 1;

            //建立input
            oArray = ["tBillNo", "tFaciSno", "tManualNo", "tCheckNo",
                      "tOrderNo", "tContNo", "tSTBSeqNo",
                      "tGUINo", "tChargeTitle", "tInvNo", "tInvTitle",
                      "tInvAddress", "tChargeAddress", "tMailAddress",
                      "tAuthorizeNo", "tSBillNo", "tCloseSNo"];
            oWidthArray = ["30%", "64%", "64%", "64%",
                           "72%", "72%", "72%",
                           "72%", "72%", "72%", "72%",
                           "72%", "72%", "72%",
                           "80%", "30%", "72%"];

            //oWidthArray = ["35%", "61.5%", "81.5%", "35%",
            //               "29%", "29%", "29%",
            //               "75%", "75%", "75%", "75%",
            //               "75%", "75%", "75%",
            //               "75%", "40%", "40%"];
            //oWidthArray = ["120", "80", "250", "340", "145",
            //               "340", "340", "340",
            //               "340", "340", "340", "340",
            //               "340", "340", "340",
            //               "340", "145", "340"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxInput({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: true
                });
                controls.push({ name: iId, type: 'jqxInput', level: level });
            };
            level += 1;

            //建立input
            oArray = ["tItem", "tRealPeriod", "tShouldAmt",
                      "tRealAmt", "tNextPeriod", "tNextAmt", "tInvSeqNo",
                      "tDiscountAmt", "tSItem"];
            oWidthArray = ["10%", "64%", "64%",
                           "64%", "64%", "64%", "72%",
                           "72%", "10%"];

            //oWidthArray = ["10%", "37.5%", "82%",
            //               "32.5%", "35%", "32.5%", "75%",
            //               "29%", "15%"];
            //oWidthArray = ["60", "60", "340",
            //               "145", "145", "145", "340",
            //               "340", "60"];
            //oDisabled = [false, false, false,
            //             false, false, false, false,
            //             false, false];
            //oDigits = ["3", "2", "8",
            //           "8", "2", "8", "8",
            //           "8", "3"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxInput({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: true,

                    //disabled: oDisabled[i]
                    //digits: oDigits[i],
                    //decimalDigits: 0,
                    //value: null,
                    //allowNull: true
                });
                controls.push({ name: iId, type: 'jqxInput', level: level });
            };
            level += 1;

            //建立ComboBox
            oArray = ["cboServiceType", "cboSTType", "cboInvoiceType", "cboInvoiceKind", "cboAccountNo", "cboPreInvoice"];
            oWidthArray = ["20%", "64%", "72%", "72%", "72%", "72%"];

            //oWidthArray = ["14.5%", "35%", "75%", "75%", "75%", "75%"];
            //oWidthArray = ["100", "110", "145", "340", "340", "340", "340"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var source = [];

                switch (oArray[i]) {
                    case "cboServiceType":
                        source = [{ text: 'C', value: 0 }, { text: 'D', value: 1 }, { text: 'I', value: 2 }, { text: 'P', value: 3 }];
                        break;
                    case "cboPeriodType":
                        source = [{ text: lang.lPeriodType0, value: 0 }, { text: lang.lPeriodType1, value: 1 }, { text: lang.lPeriodType2, value: 2 }];
                        break;
                    case "cboSTType":
                        source = [{ text: lang.lSTType1, value: 0 }, { text: lang.lSTType2, value: 1 }];
                        break;
                    case "cboInvoiceType":
                        source = [{ text: lang.lInvoiceType0, value: 0 }, { text: lang.lInvoiceType1, value: 2 }, { text: lang.lInvoiceType2, value: 3 }];
                        break;
                    case "cboInvoiceKind":
                        source = [{ text: lang.lInvoiceKind0, value: 0 }, { text: lang.lInvoiceKind1, value: 1 }];
                        break;
                    case "cboPreInvoice":
                        source = [{ text: lang.lPreInvoice0, value: 0 }, { text: lang.lPreInvoice1, value: 1 }, { text: lang.lPreInvoice2, value: 2 }, { text: lang.lPreInvoice3, value: 3 }, { text: lang.lPreInvoice4, value: 4 }];
                        break;
                    case "cboAccountNo":
                        source = [];
                        break;
                    default:
                };

                $('#' + iId).jqxComboBox({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    source: source,
                    displayMember: 'text',
                    valueMember: 'value',
                    selectedIndex: 0,
                    disabled: true
                });
                controls.push({ name: iId, type: 'jqxComboBox', level: level });
            };
            level += 1;

            //建立日期元件
            oArray = ["dtShouldDate", "dtRealStartDate", "dtRealStopDate", "dtCheckDueDate"];
            //oWidthArray = ["64%", "64%", "64%", "64%", "64%"];
            oWidthArray = ["68%", "68%", "68%", "68%"];
            //oWidthArray = ["260", "167", "167", "145", "145"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var fs = "yyyy/MM/dd";
                $('#' + iId).csDateTime({
                    theme: options.theme,
                    formatString: fs,
                    showCalendarButton: true,
                    value: null,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: true
                });
                controls.push({ name: iId, type: 'csDateTime', level: level });
            };
            level += 1;

            oArray = ["dtRealDate"];
            oWidthArray = ["68%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var fs = "yyyy/MM/dd";
                $('#' + iId).csDateTime({
                    theme: options.theme,
                    formatString: fs,
                    showCalendarButton: true,
                    //value: null,
                    height: textHeight,
                    width: oWidthArray[i]
                    //disabled: false

                });
                controls.push({ name: iId, type: 'csDateTime', level: level });
            };
            level += 1;

            oArray = ["dtDiscountDate1", "dtDiscountDate2", "dtContStartDate", "dtContStopDate", "dtEvenDate"];
            //oWidthArray = ["34%", "34%", "34%", "34%", "40%"];
            oWidthArray = ["90%", "90%", "90%", "90%", "90%"];
            //oWidthArray = ["160", "160", "160", "160", "100"];
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
                controls.push({ name: iId, type: 'csDateTime', level: level });
            };
            level += 1;

            //建立單選元件
            oArray = ["csCitemCode", "csCMCode", "csPTCode", "csUCCode", "csSTCode", "csClctEn", "csCancelCode", "csClassCode",
                      "csBPCode", "csPromCode", "csSalePointCode", "csBankCode", "csChevenCode", "csInvPurposeCode"];
            oWidthArray = ["84%", "64%", "64%", "84%", "64%", "84%", "84%", "80%",
                           "72%", "72%", "72%", "80%", "80%", "72%"];
            //oWidthArray = ["86%", "36%", "35%", "86%", "35.5%", "86%", "86%", "79.5%",
            //               "50%", "50%", "40%", "75%", "50%", "75%"];
            var oCodeWidthArray = [60, 30, 30, 60, 30, 80, 60, 60,
                                   60, 60, 60, 60, 40, 60];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: oCodeWidthArray[i],
                    width: oWidthArray[i],
                    disabled: true
                });
                controls.push({ name: iId, type: 'csList', level: level });
            };
            level += 1;

            //建立CheckBox
            oArray = ["chkPunish", "chkCheven"];
            oWidthArray = ["98%", "98%"];
            //oWidthArray = ["20%", "20%"];
            //oWidthArray = ['80px', '80px'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).text(lang[oArray[i]]);
                $('#' + iId).jqxCheckBox({
                    theme: options.theme,
                    width: oWidthArray[i],
                    disabled: true
                });
                controls.push({ name: iId, type: 'jqxCheckBox', level: level });
            };
            level += 1;

            //建立RadioButton
            oArray = ["optNotDiscount", "optDiscount"];
            oWidthArray = ["16%", "16%"];
            //oWidthArray = ["20%", "20%"];
            //oWidthArray = ["100", "100"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var blnCheck = false;
                if (i == 0) {
                    blnCheck = true;
                };
                $('#' + iId).text(lang[oArray[i]]);
                $('#' + iId).jqxRadioButton({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    groupName: $(div).prop('id'),
                    checked: blnCheck,
                    disabled: true
                });
                controls.push({ name: iId, type: 'jqxRadioButton', level: level });
            };
            level += 1;

            //建立備註
            oArray = ["taCloseNote", "taNotePopu"];
            var oWidthArray = ["98%", "98%"];
            //var oWidthArray = ["330", "400"];
            //var oHightArray = ["115px", "150px"];
            var oHightArray = ["20px", "50px"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxTextArea({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: oWidthArray[i],
                    maxLength: 750,
                    disabled: true
                });
                controls.push({ name: iId, type: 'jqxTextArea', level: level });
            };
            level += 1;

            //建立按鈕
            //oArray = ["btnProductCode", "btnFaciSno", "btnSave", "btnEdit", "btnExit"];
            oArray = ["btnFaciSno", "btnSave", "btnEdit", "btnExit"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var width = 80;
                var text = lang[oArray[i]];
                switch (oArray[i]) {
                    //case "btnProductCode":
                    //    img = imageScr.query; break;
                    case "btnFaciSno":
                        img = imageScr.query; width = '50%'; break;
                    case "btnSave":
                        img = imageScr.save; break;
                    case "btnEdit":
                        img = imageScr.edit; break;
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
                $('#' + bId).find('img').css('top', (buttonsHeight - $('#' + bId).find("img").height()) / 2 - 1);
                controls.push({ name: bId, type: 'jqxButton', level: level });
            };
            level += 1;

            ////建立顯示模式
            //getControlObject(div, 'lEditMode').jqxInput({
            //    theme: options.theme, width: "20%", height: buttonsHeight - 2, disabled: true
            //});
            //controls.push({ name: $(div).prop('id') + 'lEditMode', type: 'jqxInput', level: level });
            //level += 1;

            //異動時間,異動人員
            oArray = ["tUptTime", "tUpdEn"];
            oWidthArray = ["35%", "30%"];
            //oWidthArray = ["140", "140"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxInput({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: true,
                });
                controls.push({ name: iId, type: 'jqxInput', level: level });
            };
            level += 1;

            ////建立jqxTooltip
            var iId = $(div).prop('id') + 'lFaciSno';
            $('#' + iId).jqxTooltip({
                theme: options.theme,
                position: 'mouse',
                autoHideDelay: 5000
            });
            controls.push({ name: iId, type: 'jqxTooltip', level: level });
            level += 1;
            options.level = level;
            //getControlObject(div, 'lFaciSno').jqxTooltip({
            //    theme: options.theme, position: 'mouse', autoHideDelay: 5000
            //});
            //controls.push({ name: $(div).prop('id') + 'lFaciSno', type: 'jqxTooltip', level: level });
            //level += 1;

            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    //載入費率表相關控制項
    function renderRateControl(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var lang = options.language;
            var level = options.level;
            var oLength = 0;
            var oArray = [];
            var oWidthArray = [];
            //建立jqxExpander
            oArray = ['gbxCustRate', 'gbxMduRate'];
            //oWidthArray = ['99.8%', '99.8%'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxExpander({
                    theme: options.theme,
                    showArrow: false,
                    expanded: true,
                    toggleMode: 'none',
                    width: "99.5%",
                    height: "49%",
                });
                controls.push({ name: iId, type: 'jqxExpander', level: level });
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        //$('#' + iId + scrollBars[j]).remove();
                        $('#' + iId + scrollBars[j]).css('display', 'none');
                    };
                };
            };
            level += 1;
            //建立jqxGrid
            options.gCustRate = {
                datatype: "json",
                datafields: [
                    { name: 'CITEMNAME', type: 'string' },
                    { name: 'PERIOD', type: 'number' },
                    { name: 'AMOUNT', type: 'number' }
                ]
            };
            var dataAdapterCust = new $.jqx.dataAdapter(options.gCustRate);
            getControlObject(div, 'gCustRate').jqxGrid({
                theme: options.theme,
                localization: options.localization,
                source: dataAdapterCust,
                width: '99.5%',
                height: '98%',
                sortable: true,
                altrows: true,
                columnsresize: true,
                editable: false,
                columns: [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 30,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                        }
                    },
                    { text: lang.colCustCITEMNAME, datafield: 'CITEMNAME', align: 'left', cellsalign: 'left', width: 200 },
                    { text: lang.colCustPERIOD, datafield: 'PERIOD', align: 'right', cellsalign: 'right', width: 60 },
                    { text: lang.colCustAMOUNT, datafield: 'AMOUNT', align: 'right', cellsalign: 'right', width: 100 }
                ]
            });
            options.controls.push({ name: $(div).prop('id') + 'gCustRate', type: 'jqxGrid', level: level });

            options.gMduRate = {
                datatype: "json",
                datafields: [
                    { name: 'CITEMNAME', type: 'string' },
                    { name: 'PERIOD', type: 'number' },
                    { name: 'AMOUNT', type: 'number' }
                ]
            };
            var dataAdapterMdu = new $.jqx.dataAdapter(options.gMduRate);
            getControlObject(div, 'gMduRate').jqxGrid({
                theme: options.theme,
                localization: options.localization,
                source: dataAdapterMdu,
                width: '99.5%',
                height: '98%',
                sortable: true,
                altrows: true,
                columnsresize: true,
                editable: false,
                columns: [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 30,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                        }
                    },
                    { text: lang.colMduCITEMNAME, datafield: 'CITEMNAME', align: 'left', cellsalign: 'left', width: 200 },
                    { text: lang.colMduPERIOD, datafield: 'PERIOD', align: 'right', cellsalign: 'right', width: 60 },
                    { text: lang.colMduAMOUNT, datafield: 'AMOUNT', align: 'right', cellsalign: 'right', width: 100 }
                ]
            });
            options.controls.push({ name: $(div).prop('id') + 'gMduRate', type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderRateControl', err);
        }
    };
    //取服務別的index
    function getServiceTypeIndex(div) {
        try {
            var options = $.data(div, formName).options;

            if (options.serviceType != null) {
                switch (options.serviceType) {
                    case "C":
                        options.serviceTypeIndex = 0;
                        break;
                    case "D":
                        options.serviceTypeIndex = 1;
                        break;
                    case "I":
                        options.serviceTypeIndex = 2;
                        break;
                    case "P":
                        options.serviceTypeIndex = 3;
                        break;
                    default:
                };
                getControlObject(div, 'cboServiceType').jqxComboBox('selectedIndex', options.serviceTypeIndex);
                //getControlObject(div, 'cboServiceType').jqxComboBox('selectItem', options.serviceTypeIndex);
                //getControlObject(div, 'cboServiceType').jqxComboBox('selectItem', options.serviceType);
            };
            //else {
            //    getControlObject(div, 'cboServiceType').jqxComboBox('selectedIndex', 0);
            //}
        }
        catch (err) {
            errorHandle(formName, 'getServiceTypeIndex', err);
        }
    };
    //init
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            options.loading = true;
            $(options.container).on('resize', function () {
                formResize(div);
            });
            //語系檔
            changeLanguage(div);
            //設定基本參數
            setBasicPara(div);
            //render畫面元件
            renderControl(div);
            //render費率表
            renderRateControl(div);
            //設定服務別
            getServiceTypeIndex(div);

            if (options.faciSeqNo != null) {
                getControlObject(div, 'lFaciSno').jqxTooltip('content', lang.lFaciSeqNo + options.faciSeqNo);
            };

            //2014.07.10 #6766 呼叫後端取得收費資料使用intBillKind  判斷單據類別 P_OPTION 裝機(I)單傳0,其他工單(M,P)傳1,收費(B,T)傳2
            if (options.billNo != null) {
                switch (options.billNo.substr(6, 1)) {
                    case "I":
                        options.billKind = 0;
                        break;
                    case "M":
                        options.billKind = 1;
                        break;
                    case "P":
                        options.billKind = 1;
                        break;
                    default:
                        options.billKind = 2;
                        break;
                };
            };

            //全都用 BillNO+Item 將取到的收費資料顯示在畫面(除了新增且非沖帳模式)
            if (!(options.editMode == editMode.append && options.doProcessMark == 0)) {
                getControlObject(div, 'tBillNo').jqxInput('val', convertNullToString(options.billNo));
                getControlObject(div, 'tItem').jqxInput('val', convertNullToString(options.item));
            }
            else {   //新增且非沖帳模式
                if (options.faciSNo != null) {
                    getControlObject(div, 'tFaciSno').jqxInput('val', convertNullToString(options.faciSNo));
                };
                //var bDate = formatStringDate(new Date, 'yyyyMM', true).replace(/-/g, '');
                if (options.wipType > 0) {
                    getControlObject(div, 'tBillNo').jqxInput('val', options.billNo);
                    getControlObject(div, 'tItem').jqxInput('val', options.item);

                    //'2.若為工單新增，應收日期請同預約日
                    if (options.wipResvTime == '' || options.wipResvTime == null) {
                        getControlObject(div, 'dtShouldDate').csDateTime('setDate', formatDateTime(new Date(), 'yyyyMMdd', true));
                    }
                    else {
                        getControlObject(div, 'dtShouldDate').csDateTime('setDate', convertToNull(options.wipResvTime));
                    };
                }
                else {
                    var bDate = formatDateTime(new Date, 'yyyyMM', false).replace(/-/g, '');
                    getControlObject(div, 'tBillNo').jqxInput('val', bDate + "T" + "00000000");
                    getControlObject(div, 'tItem').jqxInput('val', 1);
                };
            };
            if (options.editMode == editMode.append) {
                getControlObject(div, 'cboSTType').jqxComboBox('selectedIndex', 0);
            };

            queryOpenAllData(div, function (isOk, msg) {
                if (isOk) {
                    var row;
                    if (options.editMode == editMode.edit || options.editMode == editMode.view || options.doProcessMark == 1) {
                        row = options.initData.Simple.rows[0];
                    }
                    else {
                        if (options.initData.ChargeDefault.rows.length > 0) {
                            if (isEmpty(options.initData.Simple) == false) {
                                delete options.initData.Simple;
                            };
                            options.initData.Simple = options.initData.ChargeDefault;
                        };
                        row = options.initData.Simple.rows[0];
                    };
                    //blnChangeCharge=true
                    if (!(row == null || row == undefined)) {
                        if (options.editMode == editMode.append && options.doProcessMark == 1) {
                            options.blnChangeCharge = true;
                        }
                    };
                    //載入csList清單
                    initList(div);
                    //判斷頁面模式
                    var dataFlag = true; //判斷是否有查到資料
                    if (options.editMode == editMode.edit || options.editMode == editMode.view || options.doProcessMark == 1) {
                        //rcdToScr 將明細資料放入控制項
                        dataFlag = rcdToScr(div, options.initData.Simple);
                        if (options.doProcessMark == 1) {
                            options.editMode = editMode.append;
                        }
                    }
                    else {
                        //此外一律當新增
                        options.editMode = editMode.append;
                        dataFlag = rcdToScr(div, options.initData.ChargeDefault);
                        //填入預設值
                        setDefaultValue(div);
                        //週期資料
                        if (options.initData.PeriodCycle.rows.length > 0) {
                            rcdPeriodCycleToScr(div, options.initData.PeriodCycle);
                        }
                        else {
                            getControlObject(div, 'csBPCode').csList('clearDisplayValue');
                            getControlObject(div, 'dtDiscountDate1').csDateTime('clearValue');
                            getControlObject(div, 'dtDiscountDate2').csDateTime('clearValue');
                            getControlObject(div, 'tOrderNo').jqxInput('val', '');
                            getControlObject(div, 'tContNo').jqxInput('val', '');
                            getControlObject(div, 'dtContStartDate').csDateTime('clearValue');
                            getControlObject(div, 'dtContStopDate').csDateTime('clearValue');
                            getControlObject(div, 'tDiscountAmt').jqxInput('val', '');
                            getControlObject(div, 'csPromCode').csList('clearDisplayValue');
                            getControlObject(div, 'chkPunish').jqxCheckBox('val', 0);
                            getControlObject(div, 'csBankCode').csList('clearDisplayValue');
                            getControlObject(div, 'tAuthorizeNo').jqxInput('val', '');
                            getControlObject(div, 'cboAccountNo').jqxComboBox('clear');
                        };
                        //CitemDefault
                        rcdCitemDefault(div, options.initData.CitemDefault);
                    };
                    ////權限
                    //setPrivControl(div, options.editMode, dataFlag);
                    //套用畫面模式
                    changeMode(div, options.editMode, dataFlag);
                    ////服務別無值,收費項目及右邊全部不可選
                    //var item = getControlObject(div, 'cboServiceType').jqxComboBox('getSelectedItem');
                    //if (isEmpty(item.label)) {
                    //    getControlObject(div, 'gbxMR').jqxPanel('disabled', true);
                    //    getControlObject(div, 'csCitemCode').csList('disabled', true);
                    //}
                    //else {
                    //    getControlObject(div, 'gbxMR').jqxPanel('disabled', false);
                    //    getControlObject(div, 'csCitemCode').csList('disabled', false);
                    //};
                    if (options.editMode == editMode.append) {
                        getControlObject(div, 'csBankCode').csList('clearDisplayValue');
                        getControlObject(div, 'cboAccountNo').jqxComboBox('clear');
                        getControlObject(div, 'tAuthorizeNo').jqxInput('val', '');
                    };
                    //2019.02.15 #8012 新增時重取預設值
                    //if (IsNullOrEmpty(options.initData.PeriodCycle) == false ||
                    //    IsNullOrEmpty(options.initData.PeriodCycle2) == false ||
                    //    IsNullOrEmpty(options.initData.PeriodCycle3) == false) {
                    reAddSetDefaultValue(div);
                    //};

                    options.loading = false;

                    if (options.doProcessMark == 0 && options.editMode == editMode.append) {
                        if (options.wipResvTime == '' || options.wipResvTime == null) {
                        }
                        else {
                            if (addDays(Date.now(), 0) != addDays(options.wipResvTime, 0)) {
                                queryCitemDefaultValue(div, function (isOK, msg) {
                                    if (isOK) {
                                        rcdCitemDefault(div, options.initData.CitemDefault);
                                    }
                                    else {
                                        messageBox(msg, messageType.critical);
                                    };
                                });
                            };
                        };
                    };

                    action(true);
                }
                else {
                    messageBox(msg, messageType.critical);
                    action(false);
                };
            });

            return;
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
    //citemChange 
    function citemChange(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div);
            var resvDay = 0; //2019.03.06 #8147
            var citemValue = convertToNull(getControlObject(div, 'csCitemCode').csList('selectedItem'));
            if (citemValue == null || citemValue == undefined) {
                options.blnCanHandler = true;
                return;
            }
            else {
                resvDay = citemValue.RESVDAY;
            };
            var bpCode = '';
            var longPayFlag = 0; //2019.02.11 #8018
            var billKind = options.billKind;
            var bpValue = convertToNull(getControlObject(div, 'csBPCode').csList('selectedItem'));
            if (isEmpty(bpValue) == false) {
                bpCode = bpValue.CODENO;
                longPayFlag = bpValue.LONGPAYFLAG;
            };
            if (billKind == 2 && longPayFlag == 1) {
                billKind = 0;
            };

            var periodValue = convertToNull(getControlObject(div, 'tRealPeriod').val());;
            if (periodValue == null || periodValue == undefined || periodValue == 0) {
                periodValue = 1;
                //options.blnCanHandler = true;
                //return;                
            };
            var dateValue = '';
            if (isEmpty(getControlObject(div, 'dtRealStartDate').csDateTime('getDate')) == false) {
                dateValue = dateToJson(getControlObject(div, 'dtRealStartDate').csDateTime('getDate'));
            };
            if (isEmpty(dateValue)) {
                if (isEmpty(options.wipResvTime) == false) {
                    var newDate = new Date(addDays(options.wipResvTime, resvDay));
                    getControlObject(div, 'dtRealStartDate').csDateTime('setDate', formatDateTime(newDate, 'yyyyMMdd', true));
                    dateValue = dateToJson(getControlObject(div, 'dtRealStartDate').csDateTime('getDate'));
                }
                else {
                    dateValue = dateToJson(getControlObject(div, 'dtShouldDate').csDateTime('getDate'));
                };
            };

            var tables = ['PeriodCycle', 'PeriodCycle2', 'PeriodCycle3', 'Invoice'];
            var tLength = tables.length;
            for (var i = 0; i < tLength; i++) {
                delete options.initData[tables[i]];
            };

            var parameters = $.extend({}, paraLoginInfo, {
                Custid: { type: 'integer', value: convertToNull(options.custId) },
                CitemCode: { type: 'integer', value: convertToNull(citemValue.CODENO) },
                Period: { type: 'integer', value: convertToNull(periodValue) },
                StartDate: { type: 'datetime', value: convertToNull(dateValue) },
                ServiceType: { type: 'string', value: convertToNull(options.serviceType) },
                BPCode: { type: 'string', value: convertToNull(bpCode) },
                FaciSeqNo: { type: 'string', value: convertToNull(options.faciSeqNo) },
                BillKind: { type: 'integer', value: convertToNull(billKind) },
            });
            var params = getParameters(riadllName, riaClassName, 'GetCitemChange', JSON.stringify(parameters));

            getServerData(params, {
                success: function (data) {
                    try {
                        delete parameters;
                        delete params;
                        if (data.ResultBoolean == true) {
                            var r = JSON.parse(data.ResultXML);
                            var tables = ['CitemDefault', 'PeriodCycle', 'PeriodCycle2', 'PeriodCycle3', 'Invoice'];
                            var tLength = tables.length;
                            for (var i = 0; i < tLength; i++) {
                                delete options.initData[tables[i]];
                                if (r[tables[i]].rows.length > 0) {
                                    options.initData[tables[i]] = cloneJSON(r[tables[i]]);
                                };
                            };
                            rcdPeriodCycleToScr(div, options.initData.PeriodCycle);
                            rcdCitemDefault(div, options.initData.CitemDefault);
                            rcdInvToScr(div, options.initData.Invoice);

                            changeMode(div, options.editMode, true);
                            if (options.editMode == editMode.append) {
                                getControlObject(div, 'csBankCode').csList('clearDisplayValue');
                                getControlObject(div, 'cboAccountNo').jqxComboBox('clear');
                                getControlObject(div, 'tAuthorizeNo').jqxInput('val', '');
                            };
                            //2019.02.15 #8012 新增時重取預設值
                            //if (IsNullOrEmpty(options.initData.PeriodCycle) == false ||
                            //    IsNullOrEmpty(options.initData.PeriodCycle2) == false ||
                            //    IsNullOrEmpty(options.initData.PeriodCycle3) == false) {
                            reAddSetDefaultValue(div);
                            //};

                            action(true);
                        }
                        else {
                            action(false, data.ErrorMessage);
                        };
                    }
                    catch (err) {
                        errorHandle(formName, 'citemChange', err);
                        action(false, err);
                    }
                    finally {
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'citemChange', err);
        }
    };
    //載入所有資料
    function queryOpenAllData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var data;
            if (options.wipType > 0) {
                data = options.wipData;
                if (isEmpty(options.wipResvTime) == false) {
                    //if (isEmpty(data['Simple'].rows[0]['SHOULDDATE']) == true) {
                    //    data['Simple'].columns.push({ name: 'SHOULDDATE', type: 'datetime' });
                    //};
                    data['Simple'].rows[0]['SHOULDDATE'] = formatDateTime(options.wipResvTime, 'yyyyMMdd', true);
                };
            }
            else {
                data = options.parameters;
            };
            var paraLoginInfo = getParaLoginInfo(div);
            var simple = { Simple: cloneJSON(data.Simple) };
            var parameters = $.extend({}, paraLoginInfo, {
                Custid: { type: 'integer', value: convertToNull(options.custId) },
                ServiceType: { type: 'string', value: convertToNull(options.serviceType) },
                FaciSeqNo: { type: 'string', value: convertToNull(options.faciSeqNo) },
                BillNo: { type: 'string', value: convertToNull(options.billNo) },
                Item: { type: 'integer', value: convertToNull(options.item) },
                dsSimple: { type: 'string', value: JSON.stringify(simple) },
                aEditMode: { type: 'integer', value: convertToNull(options.editMode) },
                DoProcessMark: { type: 'integer', value: convertToNull(options.doProcessMark) },
                IsWip: { type: 'integer', value: convertToNull(options.wipType) }
            });
            var params = getParameters(riadllName, riaClassName, 'OpenAllData', JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        delete parameters;
                        delete params;

                        if (data.ResultBoolean == true) {
                            var r = JSON.parse(data.ResultXML);
                            //if (r['Simple'] == null) {
                            //    r['Simple'] = simple.Simple;
                            //};                            
                            options.initData = r;
                        };
                        delete r;
                        delete simple;

                        if (data.ResultBoolean == true) {
                            action(true, '');
                        }
                        else {
                            action(false, data.ErrorMessage);
                        };
                    }
                    catch (err) {
                        errorHandle(formName, 'queryOpenAllData', err);
                        action(false, err);
                    };
                    //action(data);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'queryOpenAllData', err);
        }
    };
    //重取週期性收費  'XLoginInfo, Custid, txtFaciSno.Tag.ToString, Val(csCitemCode.CodeNo
    function queryOpenPeriodCycle(div, action) {
        try {
            var citemValue = convertToNull(getControlObject(div, 'csCitemCode').csList('codeNo'));
            if (citemValue == null || citemValue == undefined) { return; };
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div);
            var parameters = $.extend({}, paraLoginInfo, {
                Custid: { type: 'integer', value: convertToNull(options.custId) },
                FaciSeqNo: { type: 'string', value: convertToNull(options.faciSeqNo) },
                CitemCode: { type: 'integer', value: citemValue }
            });
            var params = getParameters(riadllName, riaClassName, 'GetPeriodCycle', JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        delete options.initData.PeriodCycle;
                        if (data.ResultBoolean == true) {
                            var r = JSON.parse(data.ResultXML);
                            if (r.PeriodCycle.rows.length > 0) {
                                options.initData.PeriodCycle = cloneJSON(r.PeriodCycle);
                            };
                            action(true);
                        }
                        else {
                            action(false, data.ErrorMessage);
                        };
                    }
                    catch (err) {
                        errorHandle(formName, 'queryOpenPeriodCycle', err);
                        action(false, err);
                    }
                    finally {
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'queryOpenPeriodCycle', err);
        }
    };
    //GetCitemDefaultValue
    function queryCitemDefaultValue(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div);
            var citemValue = convertToNull(getControlObject(div, 'csCitemCode').csList('selectedItem'));
            if (citemValue == null || citemValue == undefined) { return; };
            var bpCode = '';
            var bpValue = convertToNull(getControlObject(div, 'csBPCode').csList('selectedItem'));
            if (isEmpty(bpValue) == false) { bpCode = bpValue.CODENO; };
            var periodValue = convertToNull(getControlObject(div, 'tRealPeriod').val());
            var dateValue = '';
            if (isEmpty(getControlObject(div, 'dtRealStartDate').csDateTime('getDate')) == false) {
                dateValue = dateToJson(getControlObject(div, 'dtRealStartDate').csDateTime('getDate'));
            };
            //if (dateValue == null || dateValue == undefined) { return; };

            var parameters = $.extend({}, paraLoginInfo, {
                Custid: { type: 'integer', value: convertToNull(options.custId) },
                CitemCode: { type: 'integer', value: convertToNull(citemValue.CODENO) },
                Period: { type: 'integer', value: convertToNull(periodValue) },
                StartDate: { type: 'datetime', value: convertToNull(dateValue) },
                ServiceType: { type: 'string', value: convertToNull(options.serviceType) },
                BPCode: { type: 'string', value: convertToNull(bpCode) },
                FaciSeqNo: { type: 'string', value: convertToNull(options.faciSeqNo) },
                BillKind: { type: 'integer', value: convertToNull(options.billKind) },
            });
            var params = getParameters(riadllName, riaClassName, 'GetCitemDefaultValue', JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        delete parameters;
                        delete params;
                        if (data.ResultBoolean == true) {
                            var r = JSON.parse(data.ResultXML);
                            var tables = ['CitemDefault'];
                            var tLength = tables.length;
                            for (var i = 0; i < tLength; i++) {
                                delete options.initData[tables[i]];
                                if (r[tables[i]].rows.length > 0) {
                                    options.initData[tables[i]] = cloneJSON(r[tables[i]]);
                                };
                            };
                            action(true);
                        }
                        else {
                            action(false, data.ErrorMessage);
                        };
                    }
                    catch (err) {
                        errorHandle(formName, 'queryCitemDefaultValue', err);
                        action(false, err);
                    }
                    finally {
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'queryCitemDefaultValue', err);
        }
    };
    function queryCitemDefaultValue2(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div);
            var citemValue = convertToNull(getControlObject(div, 'csCitemCode').csList('selectedItem'));
            if (citemValue == null || citemValue == undefined) { return; };
            var bpCode = '';
            var bpValue = convertToNull(getControlObject(div, 'csBPCode').csList('selectedItem'));
            if (isEmpty(bpValue) == false) { bpCode = bpValue.CODENO; };
            var periodValue = convertToNull(getControlObject(div, 'tRealPeriod').val());
            var dateValue = '';
            if (isEmpty(getControlObject(div, 'dtRealStartDate').csDateTime('getDate')) == false) {
                dateValue = dateToJson(getControlObject(div, 'dtRealStartDate').csDateTime('getDate'));
            };
            //if (dateValue == null || dateValue == undefined) { return; };

            var parameters = $.extend({}, paraLoginInfo, {
                Custid: { type: 'integer', value: convertToNull(options.custId) },
                CitemCode: { type: 'integer', value: convertToNull(citemValue.CODENO) },
                Period: { type: 'integer', value: convertToNull(periodValue) },
                StartDate: { type: 'datetime', value: convertToNull(dateValue) },
                ServiceType: { type: 'string', value: convertToNull(options.serviceType) },
                BPCode: { type: 'string', value: convertToNull(bpCode) },
                FaciSeqNo: { type: 'string', value: convertToNull(options.faciSeqNo) },
                BillKind: { type: 'integer', value: convertToNull(options.billKind) },
            });
            var params = getParameters(riadllName, riaClassName, 'GetCitemDefaultValue2', JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        delete parameters;
                        delete params;
                        if (data.ResultBoolean == true) {
                            var r = JSON.parse(data.ResultXML);
                            var tables = ['CitemDefault'];
                            var tLength = tables.length;
                            for (var i = 0; i < tLength; i++) {
                                delete options.initData[tables[i]];
                                if (r[tables[i]].rows.length > 0) {
                                    options.initData[tables[i]] = cloneJSON(r[tables[i]]);
                                };
                            };
                            action(true);
                        }
                        else {
                            action(false, data.ErrorMessage);
                        };
                    }
                    catch (err) {
                        errorHandle(formName, 'queryCitemDefaultValue2', err);
                        action(false, err);
                    }
                    finally {
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'queryCitemDefaultValue2', err);
        }
    };

    //載入csList清單
    function initList(div) {
        try {
            var options = $.data(div, formName).options;
            var csArrays = ["csCitemCode", "csCMCode", "csPTCode", "csUCCode", "csClctEn", "csCancelCode", "csClassCode",
                            "csBPCode", "csPromCode", "csSalePointCode", "csInvPurposeCode", "csBankCode", "csChevenCode"];
            var tableArrays = ["CitemCode", "CMCode", "PTCode", "UCCode", "ClctEn", "CancelCode", "ClassCode",
                            "BPCode", "PromCode", "SalePointcode", "InvPurposeCode", "BankCode", "ChevenCode"];
            //var csArrays = ["csCitemCode", "csCMCode", "csPTCode", "csUCCode", "csClctEn", "csClassCode",
            //                 "csBPCode", "csBankCode"];
            //var tableArrays = ["CitemCode", "CMCode", "PTCode", "UCCode", "ClctEn", "ClassCode",
            //                "BPCode", "BankCode"];

            var cLengths = csArrays.length;

            for (var i = 0; i < cLengths; i++) {
                if (options.initData[tableArrays[i]].rows.length > 0) {
                    $('#' + $(div).prop('id') + csArrays[i]).csList('source', options.initData[tableArrays[i]].rows);
                };
            };
            var row;
            var intAdjustFlag = 0;
            if (isEmpty(options.initData.Simple) == true) {
                row = options.initData.ChargeDefault.rows[0];
                if (isEmpty(options.initData.ChargeDefault.rows[0]['ADJUSTFLAG']) == false) {
                    intAdjustFlag = options.initData.ChargeDefault.rows[0]['ADJUSTFLAG'];
                };
            }
            else {
                row = options.initData.Simple.rows[0];
                if (isEmpty(options.initData.Simple.rows[0]['ADJUSTFLAG']) == false) {
                    intAdjustFlag = options.initData.Simple.rows[0]['ADJUSTFLAG'];
                };
            };

            if (!(row == null || row == undefined)) {
                if (intAdjustFlag == 0) {
                    $('#' + $(div).prop('id') + 'csSTCode').csList('source', options.initData.STCode1.rows);
                }
                else {
                    $('#' + $(div).prop('id') + 'csSTCode').csList('source', options.initData.STCode2.rows);
                };
            };
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initList', err);
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
    //changeMode
    function changeMode(div, mode, dataFlag) {
        try {
            var options = $.data(div, formName).options;
            var aCanUse = true;
            var aDoEdit = true;
            var editText = '';
            options.editMode = mode;
            switch (mode) {
                case editMode.view:
                    aCanUse = false;
                    editText = options.language.lEditMode;
                    //rcdToScr(div);
                    break;
                case editMode.edit:
                    aCanUse = true;
                    editText = options.language.btnEdit;
                    //rcdToScr(div);
                    break;
                case editMode.append:
                    aCanUse = true;
                    editText = options.language.lAppend;
                    //newRcd(div);
                    break;
            };

            //權限
            setPrivControl(div, mode, dataFlag);

            //aDoEdit
            var data = options.initData.Simple;
            if (isEmpty(data)) {
                data = options.initData.ChargeDefault;
            };
            if (data != null) {
                var intType = 0;
                if (isEmpty(data.rows[0]['TYPE']) == false) {
                    intType = data.rows[0]['TYPE'];
                    if (intType == 1 && options.doProcessMark == 0) {
                        aDoEdit = false;
                    };
                };
            };
            //getControlObject(div, 'lEditMode').jqxInput('val', editText);
            getControlObject(div, 'lEditMode').text(editText);
            //$('#' + $(div).prop('id') + 'lEditMode').jqxInput('val', editText);
            //收費項目
            if (mode == editMode.append || options.editMode == editMode.edit) {
                getControlObject(div, 'csCitemCode').csList('disabled', false);
                getControlObject(div, 'tRealPeriod').jqxInput('disabled', false);
                getControlObject(div, 'dtShouldDate').csDateTime('disabled', false);
                getControlObject(div, 'tShouldAmt').jqxInput('disabled', false);
                getControlObject(div, 'dtRealStartDate').csDateTime('disabled', false);
                getControlObject(div, 'dtRealStopDate').csDateTime('disabled', false);
            }
            else {
                getControlObject(div, 'csCitemCode').csList('disabled', true);
            };
            ////查詢產品編號
            //getControlObject(div, 'btnProductCode').jqxButton('disabled',true );
            //getControlObject(div, 'cboPeriodType').jqxComboBox('disabled',true );
            //查詢設備序號
            getControlObject(div, 'btnFaciSno').jqxButton('disabled', !aCanUse);
            //Button 修改Edit 存檔Save
            if (dataFlag == true) {
                getControlObject(div, 'btnEdit').jqxButton('disabled', aCanUse);
                getControlObject(div, 'btnSave').jqxButton('disabled', !aCanUse);
            }
            else {
                getControlObject(div, 'btnEdit').jqxButton('disabled', true);
                getControlObject(div, 'btnSave').jqxButton('disabled', true);
                messageBox('no data found!!', messageType.critical);
            };

            ////新增及修改模式時，判斷是否啟動新的產品機制
            //if (options.editMode == editMode.append || (options.editMode == editMode.edit && aDoEdit==true)) {
            //    var rowValue = options.initData.SysParas.rows[0]['STARTNEWPROD'];
            //    if (rowValue != null && rowValue != undefined && rowValue == 1) {
            //        getControlObject(div, 'btnProductCode').jqxButton('disabled', false );
            //        getControlObject(div, 'cboPeriodType').jqxComboBox('disabled', false );
            //    };
            //};

            if (mode == editMode.append || (mode == editMode.edit && aDoEdit == true)) {
                if (mode == editMode.append) {
                    //異動時間
                    getControlObject(div, 'tUptTime').jqxInput('val', formatDateTime(new Date(), 'yyyyMMddHHmmss', true));
                    //異動人員
                    getControlObject(div, 'tUpdEn').jqxInput('val', convertToNull(options.loginInfo.loginInfo.rows[0].entryname));
                };
                //由顯示模式改為修改模式,欄位要開放可做修改  修改模式 未日結
                //getControlObject(div, 'dtShouldDate').csDateTime({ 'disabled': false });
                //if (getControlObject(div, 'tRealPeriod').jqxInput('val') != 0) {
                //    getControlObject(div, 'tRealPeriod').jqxInput({ 'disabled': false });
                //    getControlObject(div, 'dtRealStartDate').csDateTime({ 'disabled': false });
                //    getControlObject(div, 'dtRealStopDate').csDateTime({ 'disabled': false });
                //};
                getControlObject(div, 'tShouldAmt').jqxInput('disabled', false);
                getControlObject(div, 'csCMCode').csList('disabled', false);
                getControlObject(div, 'csPTCode').csList('disabled', false);
                //2018.02.06 #7702 SO113228 可修改未收原因
                //getControlObject(div, 'csUCCode').csList('disabled', false);
                //getControlObject(div, 'dtRealDate').csDateTime({ 'disabled': false });
                getControlObject(div, 'dtRealDate').csDateTime('disabled', false);
                getControlObject(div, 'tRealAmt').jqxInput('disabled', false);
                getControlObject(div, 'cboSTType').jqxComboBox('disabled', false);
                getControlObject(div, 'csSTCode').csList('disabled', false);
                getControlObject(div, 'csClctEn').csList('disabled', false);
                getControlObject(div, 'tManualNo').jqxInput('disabled', false);
                getControlObject(div, 'tCheckNo').jqxInput('disabled', false);
                getControlObject(div, 'dtCheckDueDate').csDateTime('disabled', false);
                getControlObject(div, 'taNotePopu').jqxTextArea('disabled', false);
            }
                //修改模式 已日結  或瀏覽模式
            else if ((mode == editMode.edit && aDoEdit == false) || mode == editMode.view) {
                getControlObject(div, 'tFaciSno').jqxInput('disabled', true);
                getControlObject(div, 'btnFaciSno').jqxButton('disabled', true);
                //getControlObject(div, 'btnProductCode').jqxButton('disabled', true );
                //getControlObject(div, 'cboPeriodType').jqxComboBox('disabled', true );
                getControlObject(div, 'dtShouldDate').csDateTime('disabled', true);
                getControlObject(div, 'tRealPeriod').jqxInput('disabled', true);
                getControlObject(div, 'dtRealStartDate').csDateTime('disabled', true);
                getControlObject(div, 'dtRealStopDate').csDateTime('disabled', true);
                getControlObject(div, 'tShouldAmt').jqxInput('disabled', true);
                getControlObject(div, 'csCMCode').csList('disabled', true);
                getControlObject(div, 'csPTCode').csList('disabled', true);
                getControlObject(div, 'csUCCode').csList('disabled', true);
                getControlObject(div, 'dtRealDate').csDateTime('disabled', true);
                getControlObject(div, 'tRealAmt').jqxInput('disabled', true);
                getControlObject(div, 'cboSTType').jqxComboBox('disabled', true);
                getControlObject(div, 'csSTCode').csList('disabled', true);
                getControlObject(div, 'csClctEn').csList('disabled', true);
                getControlObject(div, 'tManualNo').jqxInput('disabled', true);
                getControlObject(div, 'tCheckNo').jqxInput('disabled', true);
                getControlObject(div, 'dtCheckDueDate').csDateTime('disabled', true);
                getControlObject(div, 'taNotePopu').jqxTextArea('disabled', true);
                if (mode == editMode.view) {
                    getControlObject(div, 'taNotePopu').jqxTextArea('disabled', true);
                }
                else {
                    getControlObject(div, 'taNotePopu').jqxTextArea('disabled', false);
                };
            };
            //長繳別
            if (isEmpty(options.initData.PeriodCycle) == false) {
                if (options.initData.PeriodCycle.rows.length > 0) {
                    var rowValue = options.initData.PeriodCycle.rows[0]['LONGPAYFLAG'];
                    if (rowValue != null && rowValue != undefined && rowValue == 1) {
                        options.blnLongPay = true;
                    };
                };
            };
            if (isEmpty(options.billNo) == false) {
                if (options.billNo.substr(6, 1) == 'I') {
                    if (options.initData.BPCode.rows.length > 0) {
                        var rowValue = options.initData.BPCode.rows[0]['LONGPAYFLAG'];
                        if (rowValue != null && rowValue != undefined && rowValue == 1) {
                            options.blnLongPay = true;
                        };
                    };
                };
            };
            var citemValue = convertToNull(getControlObject(div, 'csCitemCode').csList('selectedItem'));
            if (citemValue == null || citemValue == undefined) { return; };

            //'2015.05.20 #6943 長繳別 不開放修改  
            if (options.blnLongPay == true || citemValue.PERIODFLAG == 0) {
                getControlObject(div, 'tRealPeriod').jqxInput('disabled', true);
                getControlObject(div, 'dtRealStartDate').csDateTime('disabled', true);
                getControlObject(div, 'dtRealStopDate').csDateTime('disabled', true);
                if (options.blnLongPay == true) {
                    getControlObject(div, 'tShouldAmt').jqxInput('disabled', true);
                }
                else {
                    getControlObject(div, 'tShouldAmt').jqxInput('disabled', false);
                };
            }
            else {
                //有優惠組合也不開放修改
                var blnBP = false;
                if (isEmpty(getControlObject(div, 'csBPCode').csList('codeNo')) == false) {
                    blnBP = true;
                };
                if (mode == editMode.edit && blnBP == true) {
                    getControlObject(div, 'csCitemCode').csList('disabled', true);
                    getControlObject(div, 'dtShouldDate').csDateTime('disabled', true);
                    getControlObject(div, 'tRealPeriod').jqxInput('disabled', true);
                    getControlObject(div, 'dtRealStartDate').csDateTime('disabled', true);
                    getControlObject(div, 'dtRealStopDate').csDateTime('disabled', true);
                    getControlObject(div, 'tShouldAmt').jqxInput('disabled', true);
                }
                else {
                    if (mode != editMode.view && aDoEdit == true) {
                        getControlObject(div, 'tRealPeriod').jqxInput('disabled', false);
                        getControlObject(div, 'dtRealStartDate').csDateTime('disabled', false);
                        getControlObject(div, 'dtRealStopDate').csDateTime('disabled', false);
                        getControlObject(div, 'tShouldAmt').jqxInput('disabled', false);
                    };
                };
            };

            //不管哪種模式都不允許做修改
            getControlObject(div, 'tBillNo').jqxInput('disabled', true);
            getControlObject(div, 'tItem').jqxInput('disabled', true);
            if (options.serviceType == '' || options.serviceType == null || (mode == editMode.append && options.wipType == 0 && options.doProcessMark == 0)) {
                getControlObject(div, 'cboServiceType').jqxComboBox('disabled', false);
            }
            else {
                getControlObject(div, 'cboServiceType').jqxComboBox('disabled', true);
            };
            getControlObject(div, 'csCancelCode').csList('disabled', true);
            getControlObject(div, 'csClassCode').csList('disabled', true);
            getControlObject(div, 'tNextPeriod').jqxInput('disabled', true);
            getControlObject(div, 'tNextAmt').jqxInput('disabled', true);
            //'頁籤內的條件都不能做異動
            //'優惠組合
            getControlObject(div, 'csBPCode').csList('disabled', true);
            getControlObject(div, 'tOrderNo').jqxInput('disabled', true);
            getControlObject(div, 'tContNo').jqxInput('disabled', true);
            getControlObject(div, 'csPromCode').csList('disabled', true);
            getControlObject(div, 'dtContStartDate').csDateTime('disabled', true);
            getControlObject(div, 'dtContStopDate').csDateTime('disabled', true);
            getControlObject(div, 'dtDiscountDate1').csDateTime('disabled', true);
            getControlObject(div, 'dtDiscountDate2').csDateTime('disabled', true);
            getControlObject(div, 'tDiscountAmt').jqxInput('disabled', true);
            getControlObject(div, 'csSalePointCode').csList('disabled', true);
            getControlObject(div, 'tSTBSeqNo').jqxInput('disabled', true);
            getControlObject(div, 'chkPunish').jqxCheckBox('disabled', true);
            //'發票資訊
            getControlObject(div, 'tGUINo').jqxInput('disabled', true);
            getControlObject(div, 'tInvSeqNo').jqxInput('disabled', true);
            getControlObject(div, 'tChargeTitle').jqxInput('disabled', true);
            getControlObject(div, 'cboInvoiceType').jqxComboBox('disabled', true);
            getControlObject(div, 'tInvNo').jqxInput('disabled', true);
            getControlObject(div, 'tInvTitle').jqxInput('disabled', true);
            getControlObject(div, 'tInvAddress').jqxInput('disabled', true);
            getControlObject(div, 'tChargeAddress').jqxInput('disabled', true);
            getControlObject(div, 'tMailAddress').jqxInput('disabled', true);
            getControlObject(div, 'cboInvoiceKind').jqxComboBox('disabled', true);
            getControlObject(div, 'cboPreInvoice').jqxComboBox('disabled', true);
            getControlObject(div, 'csInvPurposeCode').csList('disabled', true);
            //'沖帳種類 
            //'2013.12.17 #6693 沖帳種類需可選擇折讓,有發票號碼且PreInvoice in (0,1,2) 才可選折讓
            var data = options.initData.Simple;
            if (options.doProcessMark == 1) {
                getControlObject(div, 'optDiscount').jqxRadioButton('disabled', false);
                getControlObject(div, 'optNotDiscount').jqxRadioButton('disabled', false);
                if (data != null) {
                    var intPreInvoice = convertNullToString(data.rows[0]['PREINVOICE']);
                    var strGuiNo = convertNullToString(data.rows[0]['GUINO']);
                    if (isEmpty(strGuiNo) == true) {
                        getControlObject(div, 'optDiscount').jqxRadioButton('disabled', true);
                    }
                    if ((intPreInvoice == 0 || intPreInvoice == 1 || intPreInvoice == 2) && (isEmpty(strGuiNo) == false)) {
                        getControlObject(div, 'optDiscount').jqxRadioButton('checked', true);
                    };
                };
            }
            else {
                getControlObject(div, 'optDiscount').jqxRadioButton('disabled', true);
                getControlObject(div, 'optNotDiscount').jqxRadioButton('disabled', true);
                if (data != null) {
                    //2019.04.23 #8050 若有沖帳過,要預設在折讓
                    var intProcessMark = convertNullToString(data.rows[0]['PROCESSMARK']);
                    if (intProcessMark == 1) {
                        getControlObject(div, 'optDiscount').jqxRadioButton('checked', true);
                    };
                };
            };
            //'帳號資訊
            //if (mode != editMode.append) {
            getControlObject(div, 'csBankCode').csList('disabled', true);
            getControlObject(div, 'cboAccountNo').jqxComboBox('disabled', true);
            getControlObject(div, 'tAuthorizeNo').jqxInput('disabled', true);
            //}
            //else {
            //    getControlObject(div, 'csBankCode').csList('disabled', false);
            //    getControlObject(div, 'cboAccountNo').jqxComboBox('disabled', false);
            //    getControlObject(div, 'tAuthorizeNo').jqxInput('disabled', false);
            //};
            //'費率表
            //'結清&備註
            getControlObject(div, 'chkCheven').jqxCheckBox('disabled', true);
            getControlObject(div, 'dtEvenDate').csDateTime('disabled', true);
            getControlObject(div, 'tSBillNo').jqxInput('disabled', true);
            getControlObject(div, 'tSItem').jqxInput('disabled', true);
            getControlObject(div, 'tCloseSNo').jqxInput('disabled', true);
            getControlObject(div, 'csChevenCode').csList('disabled', true);
            getControlObject(div, 'taCloseNote').jqxTextArea('disabled', true);
            //'櫃檯繳款修改不可異動的欄位
            if (options.wipType == 4) {
                //getControlObject(div, 'btnProductCode').jqxButton('disabled', true );
                getControlObject(div, 'btnFaciSno').jqxButton('disabled', true);
                getControlObject(div, 'tFaciSno').jqxInput('disabled', true);
                getControlObject(div, 'dtShouldDate').csDateTime('disabled', true);
                getControlObject(div, 'dtRealDate').csDateTime('disabled', true);
                getControlObject(div, 'csUCCode').csList('disabled', true);

                getControlObject(div, 'csCitemCode').csList('disabled', true);
                getControlObject(div, 'tRealPeriod').jqxInput('disabled', true);
                getControlObject(div, 'dtRealStartDate').csDateTime('disabled', true);
                getControlObject(div, 'dtRealStopDate').csDateTime('disabled', true);
                getControlObject(div, 'tShouldAmt').jqxInput('disabled', true);

            };
            if (mode == editMode.append || (mode == editMode.edit && aDoEdit == true)) {
                getControlObject(div, 'dtRealDate').csDateTime('disabled', false);
            };
            //2019/06/19 Jacky 8370 
            if (mode != editMode.append) {
                getControlObject(div, 'gbxReverse').css('display', "none");
            }
            //2018.06.20 #7768
            disableAllFieldPriv(options.controls, options.initData.FieldPriv, options.initData.Privs);

        }
        catch (err) {
            errorHandle(formName, 'changeMode', err);
        }
    };
    //權限設定
    function setPrivControl(div, mode) {
        try {
            var options = $.data(div, formName).options;
            //aDoEdit
            var aDoEdit = true;
            var data = options.initData.Simple;
            if (isEmpty(data)) {
                data = options.initData.ChargeDefault;
            };
            if (data != null) {
                var intType = 0;
                if (isEmpty(data.rows[0]['TYPE']) == false) {
                    intType = data.rows[0]['TYPE'];
                    //2018.06.27 #7825 增加判斷doProcessMark=0
                    if (intType == 1 && options.doProcessMark == 0) {
                        aDoEdit = false;
                    };
                };
            };
            //期數 / 次收費日 / 收費金額 / 有效期限 增加權限控管
            //'2016.05.18 #7225 SO113224,可修改期數;SO113225,可修改應收日期;SO113226,可修改出單金額;SO113227,可修改有效期限
            //2018.02.06 #7702 SO113228 可修改未收原因  //2018.06.27 #7825 取消此條件options.editMode == editMode.edit &&
            if (options.editMode != editMode.view && aDoEdit == true) {
                for (var i = 0; i < options.initData.Privs.rows.length; i++) {
                    if (options.initData.Privs.rows[i]['MID'] == 'SO113224') {
                        if (options.initData.Privs.rows[i]['GROUPX'] == '1') {
                            getControlObject(div, 'tRealPeriod').jqxInput({ disabled: false });
                        } else {
                            getControlObject(div, 'tRealPeriod').jqxInput({ disabled: true });
                        };
                    }
                    else if (options.initData.Privs.rows[i]['MID'] == 'SO113225') {
                        if (options.initData.Privs.rows[i]['GROUPX'] == '1') {
                            getControlObject(div, 'dtShouldDate').csDateTime({ 'disabled': false });
                        } else {
                            getControlObject(div, 'dtShouldDate').csDateTime({ 'disabled': true });
                        };
                    }
                    else if (options.initData.Privs.rows[i]['MID'] == 'SO113226') {
                        if (options.initData.Privs.rows[i]['GROUPX'] == '1') {
                            getControlObject(div, 'tShouldAmt').jqxInput({ disabled: false });
                        } else {
                            getControlObject(div, 'tShouldAmt').jqxInput({ disabled: true });
                        };
                    }
                    else if (options.initData.Privs.rows[i]['MID'] == 'SO113227') {
                        if (options.initData.Privs.rows[i]['GROUPX'] == '1') {
                            getControlObject(div, 'dtRealStartDate').csDateTime({ 'disabled': false });
                            getControlObject(div, 'dtRealStopDate').csDateTime({ 'disabled': false });
                        } else {
                            getControlObject(div, 'dtRealStartDate').csDateTime({ 'disabled': true });
                            getControlObject(div, 'dtRealStopDate').csDateTime({ 'disabled': true });
                        };
                    }
                    else if (options.initData.Privs.rows[i]['MID'] == 'SO113228') {
                        if (options.initData.Privs.rows[i]['GROUPX'] == '1') {
                            getControlObject(div, 'csUCCode').csList('disabled', false);
                        } else {
                            getControlObject(div, 'csUCCode').csList('disabled', true);
                        };
                    };
                };
            };
        }
        catch (err) {
            errorHandle(formName, 'setPrivControl', err);
        }
    };
    //重取預設值
    function reAddSetDefaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            //新增T單時才做
            var row;
            var intType = 0;
            if (options.editMode == editMode.append) {
                if (IsNullOrEmpty(options.initData.PeriodCycle2) == false) {
                    if (options.initData.PeriodCycle2.rows.length > 0) {
                        intType = 2;
                    }
                };
                if (intType == 0) {
                    if (IsNullOrEmpty(options.initData.PeriodCycle3) == false) {
                        if (options.initData.PeriodCycle3.rows.length > 0) {
                            intType = 3;
                        }
                    };
                };
                if (intType == 0) {
                    if (IsNullOrEmpty(options.initData.PeriodCycle) == false) {
                        if (options.initData.PeriodCycle.rows.length > 0) {
                            intType = 1;
                        }
                    };
                };

                if (intType == 1) {
                    if (options.initData.PeriodCycle.rows.length > 0) {
                        row = options.initData.PeriodCycle.rows[0];
                    }
                };
                if (intType == 2) {
                    if (options.initData.PeriodCycle2.rows.length > 0) {
                        row = options.initData.PeriodCycle2.rows[0];
                    }
                };
                if (intType == 3) {
                    if (options.initData.PeriodCycle3.rows.length > 0) {
                        row = options.initData.PeriodCycle3.rows[0];
                    }
                };

                getControlObject(div, 'csCMCode').csList('clearDisplayValue');
                getControlObject(div, 'csPTCode').csList('clearDisplayValue');
                getControlObject(div, 'csUCCode').csList('clearDisplayValue');
                getControlObject(div, 'csBankCode').csList('clearDisplayValue');
                getControlObject(div, 'cboAccountNo').jqxComboBox('clear');
                getControlObject(div, 'tAuthorizeNo').jqxInput('val', '');
                if (!(row == null || row == undefined)) {
                    //cmcode,cmname,ptcode,ptname,invseqno,uccode,ucname,bankcode,bankname,accountid
                    if (row['CMCODE'] != null && row['CMCODE'] != '') {
                        getControlObject(div, 'csCMCode').csList('setDisplayValue', { CODENO: row['CMCODE'], DESCRIPTION: row['CMNAME'] });
                    }
                    else {
                        getControlObject(div, 'csCMCode').csList('codeNo', 1);
                        getControlObject(div, 'csCMCode').csList('selectedIndex', 0);
                    };
                    if (row['PTCODE'] != null && row['PTCODE'] != '') {
                        getControlObject(div, 'csPTCode').csList('setDisplayValue', { CODENO: row['PTCODE'], DESCRIPTION: row['PTNAME'] });
                    }
                    else {
                        getControlObject(div, 'csPTCode').csList('codeNo', 1);
                        getControlObject(div, 'csPTCode').csList('selectedIndex', 0);
                    };
                    if (row['UCCODE'] != null && row['UCCODE'] != '') {
                        getControlObject(div, 'csUCCode').csList('setDisplayValue', { CODENO: row['UCCODE'], DESCRIPTION: row['UCNAME'] });
                    }
                    else {
                        getControlObject(div, 'csUCCode').csList('codeNo', 1);
                        getControlObject(div, 'csUCCode').csList('selectedIndex', 0);
                    };
                    if (isEmpty(row['BANKCODE']) == false) {
                        getControlObject(div, 'csBankCode').csList('setDisplayValue', { CODENO: row['BANKCODE'], DESCRIPTION: row['BANKNAME'] });
                    };
                    getControlObject(div, 'cboAccountNo').jqxComboBox('clear');
                    if (row['ACCOUNTNO'] != null && row['ACCOUNTNO'] != '') {
                        getControlObject(div, 'cboAccountNo').jqxComboBox('insertAt', { text: row['ACCOUNTNO'], value: 0 }, 1);
                        getControlObject(div, 'cboAccountNo').jqxComboBox('selectedIndex', 0);
                    };
                }
                else {
                    getControlObject(div, 'csCMCode').csList('codeNo', 1);
                    getControlObject(div, 'csCMCode').csList('selectedIndex', 0);
                    getControlObject(div, 'csPTCode').csList('codeNo', 1);
                    getControlObject(div, 'csPTCode').csList('selectedIndex', 0);
                    getControlObject(div, 'csUCCode').csList('codeNo', 1);
                    getControlObject(div, 'csUCCode').csList('selectedIndex', 0);
                };
            };
        }
        catch (err) {
            errorHandle(formName, 'reAddSetDefaultValue', err);
        }
    };
    //填入預設值
    function setDefaultValue(div) {
        try {
            var options = $.data(div, formName).options;

            //服務別
            getControlObject(div, 'cboServiceType').jqxComboBox('selectedIndex', options.serviceTypeIndex);
            var item = getControlObject(div, 'cboServiceType').jqxComboBox('getSelectedItem');
            options.serviceType = item.label;
            //getControlObject(div, 'cboServiceType').jqxComboBox('selectItem', options.serviceType);
            //收費項目帶預設值
            getControlObject(div, 'csCitemCode').csList('selectedIndex', 0);
            //未收原因套用RA文件指定之預設值
            //getControlObject(div, 'csUCCode').csList('codeNo', 1);
            if (getControlObject(div, 'csUCCode').csList('codeNo') == '') {
                getControlObject(div, 'csUCCode').csList('codeNo', 1);
                getControlObject(div, 'csUCCode').csList('selectedIndex', 0);
            };
            //付款種類套用RA文件指定之預設值
            //getControlObject(div, 'csPTCode').csList('codeNo', 1);
            if (getControlObject(div, 'csPTCode').csList('codeNo') == '') {
                getControlObject(div, 'csPTCode').csList('codeNo', 1);
                getControlObject(div, 'csPTCode').csList('selectedIndex', 0);
            };
            //收費方式套用RA文件指定之預設值
            //getControlObject(div, 'csCMCode').csList('codeNo', 1);
            if (getControlObject(div, 'csCMCode').csList('codeNo') == '') {
                getControlObject(div, 'csCMCode').csList('codeNo', 1);
                getControlObject(div, 'csCMCode').csList('selectedIndex', 0);
            };
        }
        catch (err) {
            errorHandle(formName, 'setDefaultValue', err);
        }
    };
    //rcdToScr 將明細資料放入控制項 
    function rcdToScr(div, data) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var row = data.rows[0];
            if (row == null || row == undefined) {
                return false;
            };
            //服務別
            if (isEmpty(options.serviceType) == true) {
                options.serviceType = row['SERVICETYPE'];
            };
            //左側
            //單據編號,項次
            if (options.editMode != editMode.append) {
                getControlObject(div, 'tBillNo').jqxInput('val', convertNullToString(row['BILLNO']));
                getControlObject(div, 'tItem').jqxInput('val', row['ITEM']);
            };
            //收費項目
            if (options.blnChangeCharge == false) {
                if (row['CITEMCODE'] != null) {
                    getControlObject(div, 'csCitemCode').csList('setDisplayValue', { CODENO: row['CITEMCODE'], DESCRIPTION: row['CITEMNAME'] });
                    //getControlObject(div, 'csCitemCode').csList('codeNo', convertNullToString(row['CITEMCODE']));
                } else {
                    //getControlObject(div, 'csCitemCode').csList('clearDisplayValue');
                    if (getControlObject(div, 'csCitemCode').csList('codeNo') == '') {
                        getControlObject(div, 'csCitemCode').csList('selectedIndex', 0);
                    };
                };
            }
            else {
                getControlObject(div, 'csCitemCode').csList('selectedIndex', 0);
            };
            ////產品編號
            //getControlObject(div, 'tProServiceID').jqxInput('val', convertNullToString(row['PROSERVICEID']));
            ////週期種類
            //getControlObject(div, 'cboPeriodType').jqxComboBox('selectedIndex', convertNullToString(row['PERIODTYPE']));

            //設備序號
            getControlObject(div, 'tFaciSno').jqxInput('val', convertNullToString(row['FACISNO']));
            if (row['FACISEQNO'] != null && row['FACISEQNO'] != '') {
                //getControlObject(div, 'lFaciSno').jqxTooltip({ content: lang.lFaciSeqNo + row['FACISEQNO'] });
                getControlObject(div, 'lFaciSno').jqxTooltip('content', lang.lFaciSeqNo + row['FACISEQNO']);
                options.faciSeqNo = row['FACISEQNO'];
            };
            //應收日期
            if (row['SHOULDDATE'] != null && row['SHOULDDATE'] != '') {
                getControlObject(div, 'dtShouldDate').csDateTime('setDate', row['SHOULDDATE']);
            };
            if (options.wipType > 0 && options.editMode == editMode.append) {
                //'2.若為工單新增，應收日期請同預約日
                if (options.wipResvTime == '' || options.wipResvTime == null) {
                    //getControlObject(div, 'dtShouldDate').csDateTime('setDate', formatDateTime(new Date(), 'yyyyMMdd', true));
                }
                else {
                    getControlObject(div, 'dtShouldDate').csDateTime('setDate', convertToNull(options.wipResvTime));
                };
            };

            //收費期數
            if (row['REALPERIOD'] != null && row['REALPERIOD'] != '') {
                getControlObject(div, 'tRealPeriod').jqxInput('val', row['REALPERIOD']);
            } else {
                getControlObject(div, 'tRealPeriod').jqxInput('val', 0);
            };
            //有效期限
            if (row['REALSTARTDATE'] != null && row['REALSTARTDATE'] != '') {
                getControlObject(div, 'dtRealStartDate').csDateTime('setDate', row['REALSTARTDATE']);
            };
            if (row['REALSTOPDATE'] != null && row['REALSTOPDATE'] != '') {
                getControlObject(div, 'dtRealStopDate').csDateTime('setDate', row['REALSTOPDATE']);
            };
            //出單金額
            if (row['SHOULDAMT'] != null && row['SHOULDAMT'] != '') {
                getControlObject(div, 'tShouldAmt').jqxInput('val', row['SHOULDAMT']);
            } else {
                getControlObject(div, 'tShouldAmt').jqxInput('val', 0);
            };
            if (options.doProcessMark == 1) {
                getControlObject(div, 'tShouldAmt').jqxInput('val', (row['SHOULDAMT']) * (-1));
            };
            if (convertToNull(getControlObject(div, 'tShouldAmt').val()) != null && getControlObject(div, 'tShouldAmt').val() < 0) {
                getControlObject(div, 'tShouldAmt').css('color', '#FF0000');
            } else {
                getControlObject(div, 'tShouldAmt').css('color', '#000000');
            };
            //收費方式
            if (row['CMCODE'] != null && row['CMCODE'] != '') {
                getControlObject(div, 'csCMCode').csList('setDisplayValue', { CODENO: row['CMCODE'], DESCRIPTION: row['CMNAME'] });
                //} else {
                //    getControlObject(div, 'csCMCode').csList('codeNo', 1);
                //    if (getControlObject(div, 'csCMCode').csList('codeNo') == '') {
                //        getControlObject(div, 'csCMCode').csList('selectedIndex', 0);
                //    };
            };
            if (options.doProcessMark == 1) {
                getControlObject(div, 'csCMCode').csList('codeNo', 1);
            };
            //付款種類
            if (row['PTCODE'] != null && row['PTCODE'] != '') {
                getControlObject(div, 'csPTCode').csList('setDisplayValue', { CODENO: row['PTCODE'], DESCRIPTION: row['PTNAME'] });
                //} else {
                //    getControlObject(div, 'csPTCode').csList('codeNo', 1);
                //    if (getControlObject(div, 'csPTCode').csList('codeNo') == '') {
                //        getControlObject(div, 'csPTCode').csList('selectedIndex', 0);
                //    };
            };
            //未收原因
            if (row['UCCODE'] != null && row['UCCODE'] != '') {
                getControlObject(div, 'csUCCode').csList('setDisplayValue', { CODENO: row['UCCODE'], DESCRIPTION: row['UCNAME'] });
                //} else {
                //    getControlObject(div, 'csUCCode').csList('codeNo', 1);
                //    if (getControlObject(div, 'csUCCode').csList('codeNo') == '') {
                //        getControlObject(div, 'csUCCode').csList('selectedIndex', 0);
                //    };
            };
            //if (options.doProcessMark == 1) {  //2019.02.18 #8050
            //    getControlObject(div, 'csUCCode').csList('clearDisplayValue');
            //};
            //收費日期.實收日期
            if (row['REALDATE'] != null && row['REALDATE'] != '') {
                getControlObject(div, 'dtRealDate').csDateTime('setDate', row['REALDATE']);
            };
            //if (options.doProcessMark == 1) {  //2019.02.18 #8050
            //    getControlObject(div, 'dtRealDate').csDateTime('setDate', formatDateTime(new Date(), 'yyyyMMdd', true));
            //};
            //實收金額
            if (row['REALAMT'] != null && row['REALAMT'] != '') {
                getControlObject(div, 'tRealAmt').jqxInput('val', row['REALAMT']);
            }
            else {
                getControlObject(div, 'tRealAmt').jqxInput('val', 0);
            };
            //if (options.doProcessMark == 1) {  //2019.02.18 #8050
            //    getControlObject(div, 'tRealAmt').jqxInput('val', (row['SHOULDAMT']) * (-1));
            //};
            if (convertToNull(getControlObject(div, 'tRealAmt').val()) != null && getControlObject(div, 'tRealAmt').val() < 0) {
                getControlObject(div, 'tRealAmt').css('color', '#FF0000');
            } else {
                getControlObject(div, 'tRealAmt').css('color', '#000000');
            };
            //短收類別
            if (row['ADJUSTFLAG'] != null && row['ADJUSTFLAG'] != '') {
                getControlObject(div, 'cboSTType').jqxComboBox('selectedIndex', row['ADJUSTFLAG']);
            };
            //短收原因
            if (row['STCODE'] != null && row['STCODE'] != '') {
                getControlObject(div, 'csSTCode').csList('setDisplayValue', { CODENO: row['STCODE'], DESCRIPTION: row['STNAME'] });
            };
            //收費人員
            if (options.wipType == 0 || options.wipType == 4) {
                if (row['CLCTEN'] != null && row['CLCTEN'] != '') {
                    getControlObject(div, 'csClctEn').csList('setDisplayValue', { EMPNO: row['CLCTEN'], EMPNAME: row['CLCTNAME'] });
                };
            };
            if (options.editMode == editMode.append && options.wipType > 0) {
                if (isEmpty(options.wipClctEn) == false) {
                    getControlObject(div, 'csClctEn').csList('setDisplayValue', { EMPNO: options.wipClctEn, EMPNAME: options.wipClctName });
                };
            };
            //2019.02.18 #8050
            if (options.editMode == editMode.append && options.doProcessMark == 1) {
                var loginRow = options.loginInfo.loginInfo.rows[0];
                getControlObject(div, 'csClctEn').csList('codeNo', loginRow['entryid']);
                //getControlObject(div, 'csClctEn').csList('setDisplayValue', { EMPNO:options.loginInfo.entryname, EMPNAME: options.wipClctName });
            };

            //手開單號
            getControlObject(div, 'tManualNo').jqxInput('val', convertNullToString(row['MANUALNO']));
            //作廢原因
            if (row['CANCELCODE'] != null && row['CANCELCODE'] != '') {
                getControlObject(div, 'csCancelCode').csList('setDisplayValue', { CODENO: row['CANCELCODE'], DESCRIPTION: row['CANCELNAME'] });
            };
            //產單客戶類別
            if (row['CLASSCODE'] != null && row['CLASSCODE'] != '') {
                //getControlObject(div, 'csClassCode').csList('setDisplayValue', { CODENO: row['CLASSCODE'], DESCRIPTION:null });
                getControlObject(div, 'csClassCode').csList('codeNo', convertNullToString(row['CLASSCODE']));
            };
            if (options.editMode == editMode.append) {
                if (options.initData.ChargeDefault.rows.length > 0) {
                    getControlObject(div, 'csClassCode').csList('codeNo', options.initData.ChargeDefault.rows[0]['CLASSCODE']);
                };
            };
            //票據號碼
            getControlObject(div, 'tCheckNo').jqxInput('val', convertNullToString(row['CHECKNO']));
            //到期日
            getControlObject(div, 'dtCheckDueDate').csDateTime('setDate', convertNullToString(row['CHECKDUEDATE']));
            //下期期數
            getControlObject(div, 'tNextPeriod').jqxInput('val', convertNullToString(row['NEXTPERIOD']));
            //下期金額
            getControlObject(div, 'tNextAmt').jqxInput('val', convertNullToString(row['NEXTAMT']));
            //右側
            ////優惠組合
            //優惠組合
            if (row['BPCODE'] != null && row['BPCODE'] != '') {
                getControlObject(div, 'csBPCode').csList('setDisplayValue', { CODENO: row['BPCODE'], DESCRIPTION: row['BPNAME'] });
            };
            //訂單編號
            getControlObject(div, 'tOrderNo').jqxInput('val', convertNullToString(row['ORDERNO']));
            //促銷方案
            if (row['PROMCODE'] != null && row['PROMCODE'] != '') {
                getControlObject(div, 'csPromCode').csList('setDisplayValue', { CODENO: row['PROMCODE'], DESCRIPTION: row['PROMNAME'] });
            };
            //優惠期間
            if (row['DISCOUNTDATE1'] != null && row['DISCOUNTDATE1'] != '') {
                getControlObject(div, 'dtDiscountDate1').csDateTime('setDate', row['DISCOUNTDATE1']);
            };
            if (row['DISCOUNTDATE2'] != null && row['DISCOUNTDATE2'] != '') {
                getControlObject(div, 'dtDiscountDate2').csDateTime('setDate', row['DISCOUNTDATE2']);
            };
            //優待金額
            getControlObject(div, 'tDiscountAmt').jqxInput('val', convertNullToString(row['DISCOUNTAMT']));
            //合約編號
            getControlObject(div, 'tContNo').jqxInput('val', convertNullToString(row['CONTNO']));
            //合約期間
            if (row['CONTSTARTDATE'] != null && row['CONTSTARTDATE'] != '') {
                getControlObject(div, 'dtContStartDate').csDateTime('setDate', row['CONTSTARTDATE']);
            };
            if (row['CONTSTOPDATE'] != null && row['CONTSTOPDATE'] != '') {
                getControlObject(div, 'dtContStopDate').csDateTime('setDate', row['CONTSTOPDATE']);
            };
            //點數行銷辦法
            if (row['SALEPOINTCODE'] != null && row['SALEPOINTCODE'] != '') {
                getControlObject(div, 'csSalePointCode').csList('setDisplayValue', { CODENO: row['SALEPOINTCODE'], DESCRIPTION: row['SALEPOINTNAME'] });
            };
            //贈送設備
            getControlObject(div, 'tSTBSeqNo').jqxInput('val', convertNullToString(row['STBSEQNO']));
            //違約處分
            if (options.editMode != editMode.append) {
                if (row['PUNISH'] != null && row['PUNISH'] != '') {
                    getControlObject(div, 'chkPunish').jqxCheckBox('val', row['PUNISH']);
                } else {
                    getControlObject(div, 'chkPunish').jqxCheckBox('val', 0);
                };
            };
            ////發票資訊
            //發票號碼
            //if (options.doProcessMark == 0) {
            getControlObject(div, 'tGUINo').jqxInput('val', convertNullToString(row['GUINO']));
            //};
            //沖帳種類
            getControlObject(div, 'optNotDiscount').jqxRadioButton({ checked: true });
            //帳號資訊  //2019.02.18 #8050
            //if (options.doProcessMark == 0) {
            //銀行名稱
            if (isEmpty(row['BANKCODE']) == false) {
                getControlObject(div, 'csBankCode').csList('setDisplayValue', { CODENO: row['BANKCODE'], DESCRIPTION: row['BANKNAME'] });
            };
            //扣帳帳號
            getControlObject(div, 'cboAccountNo').jqxComboBox('clear');
            if (row['ACCOUNTNO'] != null && row['ACCOUNTNO'] != '') {
                getControlObject(div, 'cboAccountNo').jqxComboBox('insertAt', { text: row['ACCOUNTNO'], value: 0 }, 1);
                getControlObject(div, 'cboAccountNo').jqxComboBox('selectedIndex', 0);
            };
            //信用卡授權碼
            getControlObject(div, 'tAuthorizeNo').jqxInput('val', convertNullToString(row['AUTHORIZENO']));
            //};
            ////費率表
            //客戶
            options.gCustRate.localdata = options.initData.CustClassRate;
            getControlObject(div, 'gCustRate').jqxGrid('updatebounddata');
            getControlObject(div, 'gCustRate').jqxGrid('selectrow', 0);
            //大樓
            options.gMduRate.localdata = options.initData.MduClassRate;
            getControlObject(div, 'gMduRate').jqxGrid('updatebounddata');
            getControlObject(div, 'gMduRate').jqxGrid('selectrow', 0);
            ////結清備註
            //結清
            if (row['CHEVEN'] != null && row['CHEVEN'] != '') {
                getControlObject(div, 'chkCheven').jqxCheckBox('val', row['CHEVEN']);
            } else {
                getControlObject(div, 'chkCheven').jqxCheckBox('val', 0);
            };
            //結清日
            getControlObject(div, 'dtEvenDate').csDateTime('setDate', convertNullToString(row['EVENDATE']));
            //結清單號
            getControlObject(div, 'tSBillNo').jqxInput('val', convertNullToString(row['SBILLNO']));
            //項次
            getControlObject(div, 'tSItem').jqxInput('val', convertNullToString(row['SITEM']));
            //結清工單
            getControlObject(div, 'tCloseSNo').jqxInput('val', convertNullToString(row['CLOSESNO']));
            //結清原因
            if (isEmpty(row['CHEVENCODE']) == false) {
                getControlObject(div, 'csChevenCode').csList('setDisplayValue', { CODENO: row['CHEVENCODE'], DESCRIPTION: row['CHEVENNAME'] });
            };
            //結清備註
            getControlObject(div, 'taCloseNote').jqxTextArea('val', convertNullToString(row['CLOSENOTE']));
            //一般備註
            getControlObject(div, 'taNotePopu').jqxTextArea('val', convertNullToString(row['NOTE']));
            if (options.doProcessMark == 1) {
                var msg = lang.ssReProcessMark;
                if (row['GUINO'] != null) {
                    msg = lang.ssReProcessMark;
                    msg = msg.replace('{2}', row['GUINO']);
                    //2019/07/01 Jacky 8370
                    getControlObject(div, "optDiscount").jqxRadioButton("checked", true);
                }
                else {
                    msg = lang.sReProcessMark;
                    getControlObject(div, "optNotDiscount").jqxRadioButton("checked", true);
                };
                msg = msg.replace('{0}', row['BILLNO']);
                msg = msg.replace('{1}', row['ITEM']);
                getControlObject(div, 'taNotePopu').jqxTextArea('val', convertNullToString(msg));

            };
            //異動時間
            //getControlObject(div, 'lUptTime').text = convertNullToString(row['UPDTIME']);
            getControlObject(div, 'tUptTime').jqxInput('val', formatDateTime(row['UPDTIME'], 'yyyyMMddHHmmss', true));
            //異動人員
            //getControlObject(div, 'lUpdEn').text = convertNullToString(row['UPDEN']);
            getControlObject(div, 'tUpdEn').jqxInput('val', convertToNull(row['UPDEN']));

            //rcdInvToScr 將發票資料放入控制項
            rcdInvToScr(div, options.initData.Invoice);

            return true;
        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    };
    //rcdInvToScr 將發票資料放入控制項
    function rcdInvToScr(div, data) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;

            var data = options.initData.Invoice;
            if (data != null) {
                var row = data.rows[0];
                if (row == null || row == undefined) {
                    return false;
                };

                //if (options.doProcessMark == 0) {
                //發票抬頭流水號
                getControlObject(div, 'tInvSeqNo').jqxInput('val', convertNullToString(row['INVSEQNO']));
                //};
                //收件人
                getControlObject(div, 'tChargeTitle').jqxInput('val', convertNullToString(row['CHARGETITLE']));
                //發票種類
                switch (convertNullToString(row['INVOICETYPE'])) {
                    case 0:
                        getControlObject(div, 'cboInvoiceType').jqxComboBox('selectedIndex', 0);
                        break;
                    case 2:
                        getControlObject(div, 'cboInvoiceType').jqxComboBox('selectedIndex', 1);
                        break;
                    case 3:
                        getControlObject(div, 'cboInvoiceType').jqxComboBox('selectedIndex', 2);
                        break;
                    default:
                        getControlObject(div, 'cboInvoiceType').jqxComboBox('clearSelection');
                        break;
                };
                //統一編號
                getControlObject(div, 'tInvNo').jqxInput('val', convertNullToString(row['INVNO']));
                //發票抬頭
                getControlObject(div, 'tInvTitle').jqxInput('val', convertNullToString(row['INVTITLE']));
                //發票地址
                getControlObject(div, 'tInvAddress').jqxInput('val', convertNullToString(row['INVADDRESS']));
                //收費地址
                getControlObject(div, 'tChargeAddress').jqxInput('val', convertNullToString(row['CHARGEADDRESS']));
                //郵寄地址
                getControlObject(div, 'tMailAddress').jqxInput('val', convertNullToString(row['MAILADDRESS']));
                //發票開立種類
                switch (convertNullToString(row['INVOICEKIND'])) {
                    case 0:
                        getControlObject(div, 'cboInvoiceKind').jqxComboBox('selectedIndex', 0);
                        break;
                    case 1:
                        getControlObject(div, 'cboInvoiceKind').jqxComboBox('selectedIndex', 1);
                        break;
                    default:
                        getControlObject(div, 'cboInvoiceKind').jqxComboBox('clearSelection');
                        break;
                };
                if (options.doProcessMark == 0) {
                    //開立別
                    switch (convertNullToString(row['PREINVOICE'])) {
                        case 0:
                            getControlObject(div, 'cboPreInvoice').jqxComboBox('selectedIndex', 0);
                            break;
                        case 1:
                            getControlObject(div, 'cboPreInvoice').jqxComboBox('selectedIndex', 1);
                            break;
                        case 2:
                            getControlObject(div, 'cboPreInvoice').jqxComboBox('selectedIndex', 2);
                            break;
                        case 3:
                            getControlObject(div, 'cboPreInvoice').jqxComboBox('selectedIndex', 3);
                            break;
                        case 4:
                            getControlObject(div, 'cboPreInvoice').jqxComboBox('selectedIndex', 4);
                            break;
                        default:
                            getControlObject(div, 'cboPreInvoice').jqxComboBox('clearSelection');
                            break;
                    };
                }
                else {
                    getControlObject(div, 'cboPreInvoice').jqxComboBox('selectedIndex', 3);
                };
                //發票用途
                if (row['INVPURPOSECODE'] != null && row['INVPURPOSECODE'] != '') {
                    getControlObject(div, 'csInvPurposeCode').csList('setDisplayValue', { CODENO: row['INVPURPOSECODE'], DESCRIPTION: row['INVPURPOSENAME'] });
                };
            };

        }
        catch (err) {
            errorHandle(formName, 'rcdInvToScr', err);
        }
    };
    //rcdPeriodCycleToScr  將週期資料放入控制項
    function rcdPeriodCycleToScr(div, data) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;

            getControlObject(div, 'dtRealStartDate').csDateTime({ 'disabled': true });
            getControlObject(div, 'dtRealStopDate').csDateTime({ 'disabled': true });
            getControlObject(div, 'tRealPeriod').jqxInput({ 'disabled': true });
            getControlObject(div, 'tNextAmt').jqxInput({ 'disabled': true });
            getControlObject(div, 'tNextPeriod').jqxInput({ 'disabled': true });

            var intPeriodFlag = 0;
            var intResvDate = 0;
            //var strProductCode = '';
            var strSign = '';
            var amount = 0;
            var period = 0;

            var newData = $.grep(options.initData.CitemCode.rows, function (element, index) {
                return element.CODENO == getControlObject(div, 'csCitemCode').csList('codeNo');
            });
            if (newData.length > 0) {
                intPeriodFlag = convertToNull(newData[0]['PERIODFLAG'], true);
                intResvDate = convertToNull(newData[0]['RESVDAY'], true);
                //strProductCode = convertToNull(newData[0]['PRODUCTCODE']);
                strSign = convertToNull(newData[0]['SIGN']);
                amount = convertToNull(newData[0]['AMOUNT'], true);
                period = convertToNull(newData[0]['PERIOD'], true);
            };

            if (isEmpty(data) == false) {
                if (intPeriodFlag == 1) {
                    getControlObject(div, 'dtRealStartDate').csDateTime({ 'disabled': false });
                    getControlObject(div, 'dtRealStopDate').csDateTime({ 'disabled': false });
                    getControlObject(div, 'tRealPeriod').jqxInput({ 'disabled': false });
                    getControlObject(div, 'tNextAmt').jqxInput({ 'disabled': false });
                    getControlObject(div, 'tNextPeriod').jqxInput({ 'disabled': false });
                };

                var row = data.rows[0];
                if (row == null || row == undefined) {
                    //'2.若為工單新增，應收日期請同預約日
                    if (options.wipResvTime == '' || options.wipResvTime == null) {
                        getControlObject(div, 'dtShouldDate').csDateTime('setDate', formatDateTime(new Date(), 'yyyyMMdd', true));
                    }
                    else {
                        getControlObject(div, 'dtShouldDate').csDateTime('setDate', convertToNull(options.wipResvTime));
                    };

                    if (intPeriodFlag == 1) {
                        //'1.工單新增收費項目時，若取不到SO003，則收費起日依工單預約日(CD019.ResvDay(預約(完工)日加n天))，多加n天
                        if (options.wipType > 0) {
                            var newDate;
                            if (options.wipResvTime == '' || options.wipResvTime == null) {
                                newDate = new Date(addDays(Date.now(), 1));
                            }
                            else {
                                newDate = new Date(addDays(options.wipResvTime, intResvDate));
                            };
                            getControlObject(div, 'dtRealStartDate').csDateTime('setDate', formatDateTime(newDate, 'yyyyMMdd', true));
                        }
                        else {
                            getControlObject(div, 'dtRealStartDate').csDateTime('setDate', formatDateTime(new Date(), 'yyyyMMdd', true));
                        };
                    }
                    getControlObject(div, 'tRealPeriod').jqxInput('val', convertToNull(period, true));
                    getControlObject(div, 'tShouldAmt').jqxInput('val', convertToNull(amount, true));

                    var tAmt = convertToNull(getControlObject(div, 'tShouldAmt').val());
                    if ((strSign == '+' && tAmt < 0) || (strSign == '-' && tAmt > 0)) {
                        getControlObject(div, 'tShouldAmt').jqxInput('val', tAmt * (-1));
                    };
                    if (options.wipType == 4) {
                        //getControlObject(div, 'tRealAmt').jqxInput('val', getControlObject(div, 'tShouldAmt').val());
                    }
                    else {
                        getControlObject(div, 'tRealAmt').jqxInput('val', 0);
                    };

                    if (convertToNull(getControlObject(div, 'tShouldAmt').val()) != null && getControlObject(div, 'tShouldAmt').val() < 0) {
                        getControlObject(div, 'tShouldAmt').css('color', '#FF0000');
                    } else {
                        getControlObject(div, 'tShouldAmt').css('color', '#000000');
                    };
                    if (convertToNull(getControlObject(div, 'tRealAmt').val()) != null && getControlObject(div, 'tRealAmt').val() < 0) {
                        getControlObject(div, 'tRealAmt').css('color', '#FF0000');
                    } else {
                        getControlObject(div, 'tRealAmt').css('color', '#000000');
                    };

                    getControlObject(div, 'csBPCode').csList('clearDisplayValue');
                    getControlObject(div, 'dtDiscountDate1').csDateTime('clearValue');
                    getControlObject(div, 'dtDiscountDate2').csDateTime('clearValue');
                    getControlObject(div, 'tOrderNo').jqxInput('val', '');
                    getControlObject(div, 'tContNo').jqxInput('val', '');
                    getControlObject(div, 'dtContStartDate').csDateTime('clearValue');
                    getControlObject(div, 'dtContStopDate').csDateTime('clearValue');
                    getControlObject(div, 'tDiscountAmt').jqxInput('val', '');
                    getControlObject(div, 'csPromCode').csList('clearDisplayValue');
                    getControlObject(div, 'chkPunish').jqxCheckBox('val', 0);
                    getControlObject(div, 'csBankCode').csList('clearDisplayValue');
                    getControlObject(div, 'tAuthorizeNo').jqxInput('val', '');
                    getControlObject(div, 'cboAccountNo').jqxComboBox('clear');
                }
                else {
                    //設備序號
                    getControlObject(div, 'tFaciSno').jqxInput('val', convertNullToString(row['FACISNO']));
                    if (row['FACISEQNO'] != null && row['FACISEQNO'] != '') {
                        //getControlObject(div, 'lFaciSno').jqxTooltip({ content: lang.lFaciSeqNo + row['FACISEQNO'] });
                        getControlObject(div, 'lFaciSno').jqxTooltip('content', lang.lFaciSeqNo + row['FACISEQNO']);
                        options.faciSeqNo = row['FACISEQNO'];
                    };
                    //'1.工單新增收費項目時，若取不到SO003，則收費起日依工單預約日(CD019.ResvDay(預約(完工)日加n天))，多加n天
                    if (options.wipType > 0) {
                        var newDate;
                        if (options.wipResvTime == '' || options.wipResvTime == null) {
                            newDate = new Date(addDays(Date.now(), 1));
                        }
                        else {
                            newDate = new Date(addDays(options.wipResvTime, intResvDate));
                        };
                        getControlObject(div, 'dtRealStartDate').csDateTime('setDate', formatDateTime(newDate, 'yyyyMMdd', true));
                        getControlObject(div, 'dtShouldDate').csDateTime('setDate', convertToNull(options.wipResvTime));
                    }
                    else {
                        getControlObject(div, 'dtShouldDate').csDateTime('setDate', convertToNull(row['CLCTDATE']));
                        getControlObject(div, 'dtRealStartDate').csDateTime('setDate', convertToNull(row['CLCTDATE']));
                    };

                    getControlObject(div, 'tRealPeriod').jqxInput('val', convertToNull(row['PERIOD'], true));
                    getControlObject(div, 'csBPCode').csList('setDisplayValue', { CODENO: convertToNull(row['BPCODE']), DESCRIPTION: convertToNull(row['BPNAME']) });
                    if (row['DISCOUNTDATE1'] != null && row['DISCOUNTDATE1'] != '') {
                        getControlObject(div, 'dtDiscountDate1').csDateTime('setDate', row['DISCOUNTDATE1']);
                    };
                    if (row['DISCOUNTDATE2'] != null && row['DISCOUNTDATE2'] != '') {
                        getControlObject(div, 'dtDiscountDate2').csDateTime('setDate', row['DISCOUNTDATE2']);
                    };
                    getControlObject(div, 'tOrderNo').jqxInput('val', convertNullToString(row['ORDERNO']));
                    getControlObject(div, 'tContNo').jqxInput('val', convertNullToString(row['CONTNO']));
                    if (row['CONTSTARTDATE'] != null && row['CONTSTARTDATE'] != '') {
                        getControlObject(div, 'dtContStartDate').csDateTime('setDate', row['CONTSTARTDATE']);
                    };
                    if (row['CONTSTOPDATE'] != null && row['CONTSTOPDATE'] != '') {
                        getControlObject(div, 'dtContStopDate').csDateTime('setDate', row['CONTSTOPDATE']);
                    };
                    getControlObject(div, 'tDiscountAmt').jqxInput('val', convertNullToString(row['DISCOUNTAMT']));
                    if (row['PROMCODE'] != null && row['PROMCODE'] != '') {
                        getControlObject(div, 'csPromCode').csList('setDisplayValue', { CODENO: row['PROMCODE'], DESCRIPTION: row['PROMNAME'] });
                    };
                    if (options.editMode == editMode.append) {
                        getControlObject(div, 'chkPunish').jqxCheckBox('val', 1);
                    };
                    //銀行名稱
                    if (isEmpty(row['BANKCODE']) == false) {
                        getControlObject(div, 'csBankCode').csList('setDisplayValue', { CODENO: row['BANKCODE'], DESCRIPTION: row['BANKNAME'] });
                    };
                    //扣帳帳號
                    if (row['ACCOUNTNO'] != null && row['ACCOUNTNO'] != '') {
                        getControlObject(div, 'cboAccountNo').jqxComboBox('clear');
                        getControlObject(div, 'cboAccountNo').jqxComboBox('insertAt', { text: row['ACCOUNTNO'], value: 0 }, 1);
                        getControlObject(div, 'cboAccountNo').jqxComboBox('selectedIndex', 0);
                    };
                    //getControlObject(div, 'tProServiceID').jqxInput('val', convertNullToString(row['PROSERVICEID']));
                    //getControlObject(div, 'cboPeriodType').jqxComboBox('selectedIndex', convertNullToString(row['PERIODTYPE']));
                };
            }
            else {
                //'2.若為工單新增，應收日期請同預約日
                if (options.wipResvTime == '' || options.wipResvTime == null) {
                    getControlObject(div, 'dtShouldDate').csDateTime('setDate', formatDateTime(new Date(), 'yyyyMMdd', true));
                    if (intPeriodFlag == 1) {
                        getControlObject(div, 'dtRealStartDate').csDateTime('setDate', formatDateTime(new Date(), 'yyyyMMdd', true));
                    };
                }
                else {
                    getControlObject(div, 'dtShouldDate').csDateTime('setDate', convertToNull(options.wipResvTime));
                    if (intPeriodFlag == 1) {
                        var newDate = new Date(addDays(options.wipResvTime, intResvDate));
                        //getControlObject(div, 'dtRealStartDate').csDateTime('setDate', convertToNull(options.wipResvTime));
                        getControlObject(div, 'dtRealStartDate').csDateTime('setDate', formatDateTime(newDate, 'yyyyMMdd', true));
                    };
                };

                getControlObject(div, 'tRealPeriod').jqxInput('val', period);
                getControlObject(div, 'tShouldAmt').jqxInput('val', amount);

                var tAmt = convertToNull(getControlObject(div, 'tShouldAmt').val());
                if ((strSign == '+' && tAmt < 0) || (strSign == '-' && tAmt > 0)) {
                    getControlObject(div, 'tShouldAmt').jqxInput('val', tAmt * (-1));
                };
                if (options.wipType == 4) {
                    //getControlObject(div, 'tRealAmt').jqxInput('val', getControlObject(div, 'tShouldAmt').val());
                }
                else {
                    getControlObject(div, 'tRealAmt').jqxInput('val', 0);
                };

                if (convertToNull(getControlObject(div, 'tShouldAmt').val()) != null && getControlObject(div, 'tShouldAmt').val() < 0) {
                    getControlObject(div, 'tShouldAmt').css('color', '#FF0000');
                } else {
                    getControlObject(div, 'tShouldAmt').css('color', '#000000');
                };
                if (convertToNull(getControlObject(div, 'tRealAmt').val()) != null && getControlObject(div, 'tRealAmt').val() < 0) {
                    getControlObject(div, 'tRealAmt').css('color', '#FF0000');
                } else {
                    getControlObject(div, 'tRealAmt').css('color', '#000000');
                };
                if (intPeriodFlag == 0) {
                    getControlObject(div, 'dtRealStartDate').csDateTime('clear');
                    getControlObject(div, 'dtRealStopDate').csDateTime('clear');
                };

                getControlObject(div, 'csBPCode').csList('clearDisplayValue');
                getControlObject(div, 'dtDiscountDate1').csDateTime('clearValue');
                getControlObject(div, 'dtDiscountDate2').csDateTime('clearValue');
                getControlObject(div, 'tOrderNo').jqxInput('val', '');
                getControlObject(div, 'tContNo').jqxInput('val', '');
                getControlObject(div, 'dtContStartDate').csDateTime('clearValue');
                getControlObject(div, 'dtContStopDate').csDateTime('clearValue');
                getControlObject(div, 'tDiscountAmt').jqxInput('val', '');
                getControlObject(div, 'csPromCode').csList('clearDisplayValue');
                getControlObject(div, 'chkPunish').jqxCheckBox('val', 0);
                getControlObject(div, 'csBankCode').csList('clearDisplayValue');
                getControlObject(div, 'tAuthorizeNo').jqxInput('val', '');
                getControlObject(div, 'cboAccountNo').jqxComboBox('clear');
            };
        }
        catch (err) {
            errorHandle(formName, 'rcdPeriodCycleToScr', err);
        }
    };
    //rcdCitemDefault
    function rcdCitemDefault(div, data) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;

            if (options.doProcessMark == 1) { return; };

            if (data != null) {
                var row = data.rows[0];
                if (row != null || row != undefined) {
                    var intPeriod = convertToNull(row['PERIOD'], true);
                    var intAmount = convertToNull(row['AMOUNT'], true);
                    var strStopDate = convertToNull(row['STOPDATE'], false);

                    var newData = $.grep(options.initData.CitemCode.rows, function (element, index) {
                        return element.CODENO == getControlObject(div, 'csCitemCode').csList('codeNo');
                    });
                    if (newData.length > 0) {
                        var strSign = convertToNull(newData[0]['SIGN']);
                        var tPeriod = convertToNull(getControlObject(div, 'tRealPeriod').val());
                        var tAmount = convertToNull(getControlObject(div, 'tShouldAmt').val());
                        var tPeriodFlag = convertToNull(newData[0]['PERIODFLAG']);

                        if (intPeriod != tPeriod) {
                            getControlObject(div, 'tRealPeriod').jqxInput('val', intPeriod);
                        };
                        if (intAmount != tAmount) {
                            getControlObject(div, 'tShouldAmt').jqxInput('val', intAmount);
                        };
                        if ((strSign == '+' && convertToNull(getControlObject(div, 'tShouldAmt').val()) < 0) || (strSign == '-' && convertToNull(getControlObject(div, 'tShouldAmt').val()) > 0)) {
                            tAmount = getControlObject(div, 'tShouldAmt').val();
                            tAmount = tAmount * (-1);
                            getControlObject(div, 'tShouldAmt').jqxInput('val', convertToNull(tAmount, true));
                        };
                        //if (options.wipType == 4) {
                        //    getControlObject(div, 'tRealAmt').jqxInput('val', getControlObject(div, 'tShouldAmt').val());
                        //};
                        if (convertToNull(getControlObject(div, 'tShouldAmt').val()) != null && getControlObject(div, 'tShouldAmt').val() < 0) {
                            getControlObject(div, 'tShouldAmt').css('color', '#FF0000');
                        } else {
                            getControlObject(div, 'tShouldAmt').css('color', '#000000');
                        };
                        if (tPeriodFlag > 0) {
                            if (isEmpty(strStopDate) == false) {
                                if (isEmpty(getControlObject(div, 'dtRealStartDate').csDateTime('getDate')) == true) {
                                    if (isEmpty(getControlObject(div, 'dtShouldDate').csDateTime('getDate')) == false) {
                                        getControlObject(div, 'dtRealStartDate').csDateTime('setDate', formatDateTime(getControlObject(div, 'dtShouldDate').csDateTime('getDate'), 'yyyyMMdd', true));
                                    };
                                };
                                var dateValue = getControlObject(div, 'dtRealStopDate').csDateTime('getDate');
                                if (strStopDate != dateValue) {
                                    //getControlObject(div, 'dtRealStopDate').csDateTime('setDate', strStopDate);
                                    strStopDate = strStopDate.substr(0, 4) + '/' + strStopDate.substr(4, 2) + '/' + strStopDate.substr(6, 2)
                                    getControlObject(div, 'dtRealStopDate').csDateTime('setDate', formatDateTime(strStopDate, 'yyyyMMdd', true));
                                };
                            };
                        }
                        else {
                            getControlObject(div, 'dtRealStartDate').csDateTime('clear');
                            getControlObject(div, 'dtRealStopDate').csDateTime('clear');
                            getControlObject(div, 'dtRealStartDate').csDateTime({ 'disabled': true });
                            getControlObject(div, 'dtRealStopDate').csDateTime({ 'disabled': true });
                        };
                    };
                };
            };
        }
        catch (err) {
            errorHandle(formName, 'rcdCitemDefault', err);
        };
    };
    //載入detial控制項事件
    function detialAddHandler(div) {
        var options = $.data(div, formName).options;
        var lang = options.language;
        //服務別
        getControlObject(div, 'cboServiceType').on('change', function (event) {
            if (options.loading == true) return;
            if (options.doProcessMark == 1) { return; };

            var args = event.args;
            if (args) {
                options.serviceTypeIndex = args.index;
                var item = args.item;
                options.serviceType = item.label;
            };
            options.blnCanHandler = false;

            //清除所選擇的設備
            getControlObject(div, 'tFaciSno').jqxInput('val', '');
            options.faciSeqNo = '';
            getControlObject(div, 'lFaciSno').jqxTooltip('content', lang.lFaciSeqNo + '');

            getControlObject(div, 'tRealPeriod').jqxInput('val', 0);
            getControlObject(div, 'dtRealStartDate').csDateTime('clear');
            getControlObject(div, 'dtRealStopDate').csDateTime('clear');
            getControlObject(div, 'tShouldAmt').jqxInput('val', 0);
            getControlObject(div, 'tRealAmt').jqxInput('val', 0);

            //重取資料
            if (options.serviceType != null) {
                queryOpenAllData(div, function (isOk, msg) {
                    if (isOk) {
                        var row = options.initData.ChargeDefault.rows[0];

                        //blnChangeCharge=true
                        if (!(row == null || row == undefined)) {
                            if (options.editMode == editMode.append && options.doProcessMark == 1) {
                                options.blnChangeCharge = ture;
                            }
                        };
                        //載入csList清單
                        initList(div);
                        //判斷頁面模式
                        var dataFlag = true; //判斷是否有查到資料
                        if (options.editMode == editMode.edit || options.editMode == editMode.view || options.doProcessMark == 1) {
                            //rcdToScr 將明細資料放入控制項
                            dataFlag = rcdToScr(div, options.initData.ChargeDefault);
                            if (options.doProcessMark == 1) {
                                options.editMode = editMode.append;
                            }
                        }
                        else {
                            //此外一律當新增
                            options.editMode = editMode.append;
                            dataFlag = rcdToScr(div, options.initData.ChargeDefault);
                            //填入預設值
                            setDefaultValue(div);
                            //CitemDefault
                            rcdCitemDefault(div, options.initData.CitemDefault);
                        };
                        ////權限
                        //setPrivControl(div, options.editMode);
                        //套用畫面模式
                        changeMode(div, options.editMode, dataFlag);
                        //2019.02.15 #8012 新增時重取預設值
                        if (options.editMode == editMode.append) {
                            getControlObject(div, 'csBankCode').csList('clearDisplayValue');
                            getControlObject(div, 'cboAccountNo').jqxComboBox('clear');
                            getControlObject(div, 'tAuthorizeNo').jqxInput('val', '');
                        };
                        //if (IsNullOrEmpty(options.initData.PeriodCycle) == false ||
                        //    IsNullOrEmpty(options.initData.PeriodCycle2) == false ||
                        //    IsNullOrEmpty(options.initData.PeriodCycle3) == false) {
                        reAddSetDefaultValue(div);
                        //};
                        options.blnCanHandler = true;
                    }
                    else {
                        options.blnCanHandler = true;
                        messageBox(msg, messageType.critical);
                    }
                });
            }
            else { options.blnCanHandler = true; };
        });
        //收費項目
        getControlObject(div, 'csCitemCode').on('selectedIndexChanged', function (event) {
            if (options.loading == true) { return; };
            if (options.doProcessMark == 1) { return; };
            if (options.editMode != editMode.append && options.editMode != editMode.edit) { return; };
            if (options.blnCanHandler == false) { return; };

            options.blnCanHandler = false;
            //getControlObject(div, 'tRealPeriod').jqxInput('val', 0);
            //getControlObject(div, 'dtRealStartDate').csDateTime('clear');
            //getControlObject(div, 'dtRealStopDate').csDateTime('clear');
            getControlObject(div, 'tShouldAmt').jqxInput('val', 0);
            getControlObject(div, 'tRealAmt').jqxInput('val', 0);

            var selItem = getControlObject(div, 'csCitemCode').csList('selectedItem');
            if (selItem != null) {
                //調整顯示的設備序號  by戶或是沖帳,不可異動設備
                if (selItem.BYHOUSE == 1 || options.doProcessMark == 1) {
                    getControlObject(div, 'btnFaciSno').jqxButton({ 'disabled': true });
                    getControlObject(div, 'tFaciSno').jqxInput('val', '');
                    options.faciSeqNo = options.custId;
                    getControlObject(div, 'lFaciSno').jqxTooltip('content', lang.lFaciSeqNo + options.faciSeqNo);
                } else {
                    getControlObject(div, 'btnFaciSno').jqxButton({ 'disabled': false });
                    if (options.faciSeqNo == options.custId) {
                        getControlObject(div, 'tFaciSno').jqxInput('val', '');
                        options.faciSeqNo = '';
                        //getControlObject(div, 'lFaciSno').jqxTooltip({ 'content': '' });
                        getControlObject(div, 'lFaciSno').jqxTooltip('content', '');
                    };
                };
                //第三層優惠
                if (selItem.REFNO == 20) {
                    for (var i = 0; i < options.initData.Privs.rows.length; i++) {
                        if (options.initData.Privs.rows[i]['MID'] == 'SO113222') {
                            if (options.initData.Privs.rows[i]['GROUPX'] != '1') {
                                getControlObject(div, 'btnFaciSno').jqxButton({ 'disabled': true });
                                getControlObject(div, 'tRealPeriod').jqxInput({ 'disabled': true });
                                getControlObject(div, 'dtRealStartDate').jqxDateTimeInput({ 'disabled': true });
                                getControlObject(div, 'dtRealStopDate').jqxDateTimeInput({ 'disabled': true });
                                getControlObject(div, 'tShouldAmt').jqxInput({ 'disabled': true });
                            };
                        };
                    };
                };
                ////調整週期種類清單
                //getControlObject(div, 'cboPeriodType').jqxComboBox('selectedIndex', 0);
                citemChange(div, function (isOk, msg) {
                    if (isOk) {
                        options.blnCanHandler = true;
                    }
                    else {
                        options.blnCanHandler = true;
                        messageBox(msg, messageType.critical);
                    };
                });
                ////重取週期
                //queryOpenPeriodCycle(div, function (isOk, msg) {
                //    if (isOk) {
                //        rcdPeriodCycleToScr(div, options.initData.PeriodCycle);
                //        //if (selItem.PERIODFLAG > 0) {
                //        //    if (options.initData.PeriodCycle.rows.length > 0) {

                //        //    }
                //        //    else {
                //        //        messageBox(lang.noAddPeriod);
                //        //    };
                //        //};
                //        queryCitemDefaultValue(div, function (isOK2, msg2) {
                //            if (isOK2) {
                //                rcdCitemDefault(div, options.initData.CitemDefault);
                //                changeMode(div, options.editMode, true);
                //                options.blnCanHandler = true;
                //            }
                //            else {
                //                messageBox(msg2);
                //                options.blnCanHandler = true;
                //            };
                //        });
                //    }
                //    else {
                //        messageBox(msg);
                //        options.blnCanHandler = true;
                //    }
                //});

            }
            else {
                options.blnCanHandler = true;
            };
        });
        //設備序號
        getControlObject(div, 'tFaciSno').on('change', function () {
            if (options.loading == true) return;
            if (options.doProcessMark == 1) { return; };
            if (options.blnCanHandler == false) { return; };

            //處於[新增模式]時才能觸發這段
            if (options.editMode == editMode.append || options.editMode == editMode.edit) {
                options.blnCanHandler = false;
                citemChange(div, function (isOk, msg) {
                    if (isOk) {
                        options.blnCanHandler = true;
                    }
                    else {
                        options.blnCanHandler = true;
                        messageBox(msg, messageType.critical);
                    };
                });
            };
        });
        //期數
        getControlObject(div, 'tRealPeriod').on('change', function () {
            if (options.loading == true) return;
            if (options.doProcessMark == 1) { return; };
            if (options.blnCanHandler == false) { return; };

            //處於[新增模式]時才能觸發這段
            if (options.editMode == editMode.append || options.editMode == editMode.edit) {
                //有輸入收費項目及期數,收費起始日時
                if (isEmpty(getControlObject(div, 'csCitemCode').csList('codeNo'))) { return; };
                //var itemValue = event.target.value;
                //if (isEmpty(itemValue) || itemValue == 0) { return; };
                if (isEmpty(getControlObject(div, 'dtRealStartDate').csDateTime('getDate'))) { return; };
                var itemValue = getControlObject(div, 'tRealPeriod').jqxInput('val');
                if (isEmpty(itemValue) || itemValue == 0) { return; };

                var bpCode = '';
                var longPayFlag = 0; //2019.02.11 #8018
                var billKind = options.billKind;
                var bpValue = convertToNull(getControlObject(div, 'csBPCode').csList('selectedItem'));
                if (isEmpty(bpValue) == false) {
                    bpCode = bpValue.CODENO;
                    longPayFlag = bpValue.LONGPAYFLAG;
                };
                if ((billKind == 0 || longPayFlag == 1) && isEmpty(bpCode) == false) {

                    options.blnCanHandler = false;
                    queryCitemDefaultValue2(div, function (isOK, msg) {
                        if (isOK) {
                            rcdCitemDefault(div, options.initData.CitemDefault);
                            options.blnCanHandler = true;
                        }
                        else {
                            options.blnCanHandler = true;
                            messageBox(msg, messageType.critical);
                        };
                    });
                }
                else {
                    options.billKind = 1;

                    options.blnCanHandler = false;
                    queryCitemDefaultValue(div, function (isOK, msg) {
                        if (isOK) {
                            rcdCitemDefault(div, options.initData.CitemDefault);
                            options.blnCanHandler = true;
                        }
                        else {
                            options.blnCanHandler = true;
                            messageBox(msg, messageType.critical);
                        };
                    });
                };
            };
        });
        //起始日
        getControlObject(div, 'dtRealStartDate').on('dateChanged', function (event) {
            if (options.loading == true) return;
            if (options.doProcessMark == 1) { return; };
            if (options.blnCanHandler == false) { return; };

            var itemValue = event.target.value;
            itemValue = itemValue.replace(/\D*/g, '');
            //新增模式時，自動帶出截止日與下收日
            if ((options.editMode == editMode.append || options.editMode == editMode.edit) && itemValue != '') {
                //有輸入收費項目及期數,收費起始日時
                if (isEmpty(getControlObject(div, 'csCitemCode').csList('codeNo'))) { return; };
                if (isEmpty(getControlObject(div, 'tRealPeriod').val())) { return; };
                if (getControlObject(div, 'tRealPeriod').val() == 0) { return; };
                if (isEmpty(getControlObject(div, 'dtRealStartDate').csDateTime('getDate'))) { return; };

                options.blnCanHandler = false;
                queryCitemDefaultValue(div, function (isOK, msg) {
                    if (isOK) {
                        rcdCitemDefault(div, options.initData.CitemDefault);
                        options.blnCanHandler = true;
                    }
                    else {
                        options.blnCanHandler = true;
                        messageBox(msg, messageType.critical);
                    };
                });
            };
        });
        //截止日
        getControlObject(div, 'dtRealStopDate').on('dateChanged', function (event) {
            if (options.loading == true) return;
            if (options.doProcessMark == 1) { return; };
            //if (options.blnCanHandler == false) { return; };
            if (isEmpty(getControlObject(div, 'dtRealStartDate').csDateTime('getDate'))) { return; };
            if (isEmpty(getControlObject(div, 'dtRealStopDate').csDateTime('getDate'))) { return; };
            if (options.initData.ChargeParas.rows.length <= 0) { return; };

            var itemValue = event.target.value;
            itemValue = itemValue.replace(/\D*/g, '');
            //SO043.PARA7 有效期限警告日數
            if ((options.editMode == editMode.append || options.editMode == editMode.edit) && itemValue != '') {
                //endDate.getDate() - startDate.getDate()
                var para7 = options.initData.ChargeParas.rows[0]['PARA7'];
                var a = getControlObject(div, 'dtRealStartDate').csDateTime('getDate');
                var b = getControlObject(div, 'dtRealStopDate').csDateTime('getDate');
                //a = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
                //b = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
                //parseInt((b - a) / (1000 * 60 * 60 * 24))
                //b.getDate() - a.getDate()
                if ((parseInt((b - a) / (1000 * 60 * 60 * 24))) > para7) {
                    options.blnCanHandler == false;
                    messageBox(lang.para7, messageType.yesno, null, function (flag) {
                        if (flag == 'no') {
                            getControlObject(div, 'dtRealStopDate').csDateTime('clear');
                            options.blnCanHandler == true;
                        }
                        else { options.blnCanHandler == true; };
                    });
                };
            };
        });
        //實收日
        getControlObject(div, 'dtRealDate').on('blur', function (event) {
            if (options.loading == true) return;

            var itemValue = event.target.value;
            itemValue = itemValue.replace(/\D*/g, '');
            //實收日期輸入後清空未收原因
            if (itemValue != '') {
                getControlObject(div, 'csUCCode').csList('clearDisplayValue');
            };
        });
        //應收金額
        getControlObject(div, 'tShouldAmt').on('change', function () {
            //if (options.doProcessMark == 1) { return; };
            var selItem = convertToNull(getControlObject(div, 'csCitemCode').csList('codeNo'));
            var tAmount = convertToNull(getControlObject(div, 'tShouldAmt').val());
            var strSign = null;
            if (selItem != null) {
                for (var i = 0; i < options.initData.CitemCode.rows.length; i++) {
                    if (options.initData.CitemCode.rows[i]['CODENO'] == selItem) {
                        strSign = convertToNull(options.initData.CitemCode.rows[i]['SIGN']);
                    };
                };
            };
            if (strSign != null) {
                if ((strSign == '+' && tAmount < 0) || (strSign == '-' && tAmount > 0)) {
                    tAmount = tAmount * (-1);
                    getControlObject(div, 'tShouldAmt').jqxInput('val', convertToNull(tAmount, true));
                };
            };
            if (convertToNull(getControlObject(div, 'tShouldAmt').val()) != null && getControlObject(div, 'tShouldAmt').val() < 0) {
                getControlObject(div, 'tShouldAmt').css('color', '#FF0000');
            } else {
                getControlObject(div, 'tShouldAmt').css('color', '#000000');
            };
        });
        getControlObject(div, 'tShouldAmt').on('blur', function () {
            //if (options.doProcessMark == 1) { return; };
            if (convertToNull(getControlObject(div, 'tShouldAmt').val()) != null && getControlObject(div, 'tShouldAmt').val() < 0) {
                getControlObject(div, 'tShouldAmt').css('color', '#FF0000');
            } else {
                getControlObject(div, 'tShouldAmt').css('color', '#000000');
            };
        });
        //實收金額
        getControlObject(div, 'tRealAmt').on('change', function () {
            //if (options.doProcessMark == 1) { return; };
            var selItem = convertToNull(getControlObject(div, 'csCitemCode').csList('codeNo'));
            var tAmount = convertToNull(getControlObject(div, 'tRealAmt').val(), true);
            var chargeType = 0;

            if (IsNullOrEmpty(options.initData.Simple)) {
                chargeType = convertToNull(options.initData.ChargeDefault.rows[0]['TYPE'], true);
            }
            else {
                chargeType = convertToNull(options.initData.Simple.rows[0]['TYPE'], true);
            };

            var strSign = null;
            if (selItem != null) {
                for (var i = 0; i < options.initData.CitemCode.rows.length; i++) {
                    if (options.initData.CitemCode.rows[i]['CODENO'] == selItem) {
                        strSign = convertToNull(options.initData.CitemCode.rows[i]['SIGN']);
                    };
                };
            };
            if (strSign != null) {
                if ((strSign == '+' && tAmount < 0) || (strSign == '-' && tAmount > 0)) {
                    tAmount = tAmount * (-1);
                    getControlObject(div, 'tRealAmt').jqxInput('val', convertToNull(tAmount, true));
                };
            };
            if (convertToNull(getControlObject(div, 'tRealAmt').val()) != null && getControlObject(div, 'tRealAmt').val() < 0) {
                getControlObject(div, 'tRealAmt').css('color', '#FF0000');
            } else {
                getControlObject(div, 'tRealAmt').css('color', '#000000');
            };
            if (tAmount == 0 && (chargeType == 0 || options.doProcessMark == 1)) {
                getControlObject(div, 'dtRealDate').csDateTime('setDate', null);
                getControlObject(div, 'csUCCode').csList('codeNo', 1);
                if (getControlObject(div, 'csUCCode').csList('codeNo') == '') {
                    getControlObject(div, 'csUCCode').csList('selectedIndex', 0);
                };
                if (convertToNull(getControlObject(div, 'tRealAmt').val()) == null) {
                    getControlObject(div, 'tRealAmt').jqxInput('val', 0);
                };
            };
        });
        getControlObject(div, 'tRealAmt').on('blur', function () {
            //if (options.doProcessMark == 1) { return; };
            if (convertToNull(getControlObject(div, 'tRealAmt').val()) != null && getControlObject(div, 'tRealAmt').val() < 0) {
                getControlObject(div, 'tRealAmt').css('color', '#FF0000');
            } else {
                getControlObject(div, 'tRealAmt').css('color', '#000000');
            };
        });
        //右方頁籤
        getControlObject(div, 'dgContainer').on('selected', function (event) {
            switch (event.args.item) {
                case 0:
                    //優惠組合
                    getControlObject(div, 'csBPCode').csList('resize', '74%');
                    getControlObject(div, 'csPromCode').csList('resize', '74%');
                    getControlObject(div, 'csSalePointCode').csList('resize', '74%');

                    getControlObject(div, 'tOrderNo').jqxInput('width', '74%');
                    getControlObject(div, 'tDiscountAmt').jqxInput('width', '74%');
                    getControlObject(div, 'tContNo').jqxInput('width', '74%');
                    getControlObject(div, 'tSTBSeqNo').jqxInput('width', '74%');

                    getControlObject(div, 'chkPunish').jqxCheckBox('width', '20%');

                    getControlObject(div, 'dtDiscountDate1').csDateTime('width', '90%');
                    getControlObject(div, 'dtDiscountDate2').csDateTime('width', '90%');
                    getControlObject(div, 'dtContStartDate').csDateTime('width', '90%');
                    getControlObject(div, 'dtContStopDate').csDateTime('width', '90%');


                    break;
                case 1:
                    //發票抬頭
                    getControlObject(div, 'tGUINo').jqxInput('width', '74%');
                    getControlObject(div, 'tInvSeqNo').jqxInput('width', '74%');
                    getControlObject(div, 'tChargeTitle').jqxInput('width', '74%');
                    getControlObject(div, 'tInvNo').jqxInput('width', '74%');
                    getControlObject(div, 'tInvTitle').jqxInput('width', '74%');
                    getControlObject(div, 'tInvAddress').jqxInput('width', '74%');
                    getControlObject(div, 'tChargeAddress').jqxInput('width', '74%');
                    getControlObject(div, 'tMailAddress').jqxInput('width', '74%');

                    getControlObject(div, 'cboInvoiceType').jqxComboBox('width', '74%');
                    getControlObject(div, 'cboInvoiceKind').jqxComboBox('width', '74%');
                    getControlObject(div, 'cboPreInvoice').jqxComboBox('width', '74%');

                    getControlObject(div, 'csInvPurposeCode').csList('resize', '74%');

                    break;
                case 2:
                    //帳戶資訊
                    getControlObject(div, 'csBankCode').csList('resize', '74%');
                    getControlObject(div, 'cboAccountNo').jqxComboBox('width', '74%');
                    getControlObject(div, 'tAuthorizeNo').jqxInput('width', '74%');

                    break;
                case 3:
                    //費率表

                    break;
                case 4:
                    //結清
                    getControlObject(div, 'chkCheven').jqxCheckBox('width', '98%');

                    getControlObject(div, 'csChevenCode').csList('resize', '74%');

                    getControlObject(div, 'taCloseNote').jqxTextArea('height', '110px');
                    getControlObject(div, 'taNotePopu').jqxTextArea('height', '150px');

                    break;
            };
        });
        //銀行代碼
        getControlObject(div, 'csBankCode').on('selectedIndexChanged', function (event) {
            if (options.loading == true) return;
            getControlObject(div, 'cboAccountNo').jqxComboBox('clear');
            var bankValue = $(this).csList('codeNo');
            if (bankValue == null || bankValue.length == 0) {
                return false;
            }
            var selItem = getControlObject(div, 'csBankCode').csList('selectedItem');
            if (selItem != null) {
                //扣帳帳號
                var x = -1;
                var y = 0;
                for (var i = 0; i < options.initData.BankCode.rows.length; i++) {
                    if (options.initData.BankCode.rows[i]['CODENO'] == bankValue) {
                        if (isEmpty(options.initData.BankCode.rows[i]['ACCOUNTID']) == false) {
                            getControlObject(div, 'cboAccountNo').jqxComboBox('insertAt', { text: options.initData.BankCode.rows[i]['ACCOUNTID'], value: x++ }, y++);
                            getControlObject(div, 'cboAccountNo').jqxComboBox('selectedIndex', 0);
                        };
                    };
                };
            };
        });
        //短收類別
        getControlObject(div, 'cboSTType').on('change', function (event) {
            if (options.loading == true) return;
            var args = event.args;
            if (args) {
                getControlObject(div, 'csSTCode').csList('clearDisplayValue');
                var index = args.index;
                if (index == 0) {
                    getControlObject(div, 'lSTCode').text(lang.lSTCode);
                    $('#' + $(div).prop('id') + 'csSTCode').csList('source', options.initData.STCode1.rows);
                }
                else {
                    getControlObject(div, 'lSTCode').text(lang.lSTCode2);
                    $('#' + $(div).prop('id') + 'csSTCode').csList('source', options.initData.STCode2.rows);
                };
            };
        });
        //短收原因
        getControlObject(div, 'csSTCode').on('selectedIndexChanged', function (event) {
            if (options.loading == true) return;
            if (options.wipType != 4) {
                getControlObject(div, 'csUCCode').csList('clearDisplayValue');
            };

            var bankValue = $(this).csList('codeNo');
            if (bankValue == null || bankValue.length == 0) {
                return false;
            }
            if (getControlObject(div, 'dtRealDate').csDateTime('getDate') == null) {
                getControlObject(div, 'dtRealDate').csDateTime('setDate', formatDateTime(new Date(), 'yyyyMMdd', true));
            };
        });
        //沖銷-折讓 發票


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

        ////查詢產品編號
        //getControlObject(div, 'btnProductCode').on('click', function () {
        //    if ($(this).jqxButton('disabled')) { return; }
        //    //未設定週期種類時，此Button不會有動作 cboPeriodType
        //    var itemPType = getControlObject(div, 'cboPeriodType').jqxComboBox('selectedIndex');
        //    //var itemPType = getControlObject(div, 'cboPeriodType').jqxDropDownList('getSelectedItem');
        //    if (isEmpty(itemPType) == false && itemPType != 2) {
        //        //設定呼叫參數
        //        var pCode = null;
        //        var itemCCode = getControlObject(div, 'csCitemCode').csList('selectedItem');
        //        if (itemCCode != null && convertToNull(itemCCode.PRODUCTCODE) != null) {
        //            pCode = itemCCode.PRODUCTCODE;
        //        }
        //        else { return;}
        //        ;
        //        var dsData = {
        //            type: 'string',
        //            ChooseProd: {
        //                columns: [{ name: 'PERIODTYPE', type: 'integer' },
        //                    { name: 'CUSTID', type: 'integer' },
        //                    { name: 'PRODUCTCODE', type: 'integer' },
        //                ],
        //                rows: [{
        //                    PERIODTYPE: itemPType,
        //                    CUSTID: options.custId,
        //                    PRODUCTCODE: pCode
        //                }]
        //            }
        //        };
        //        //設定FormTitle
        //        var formTitle = lang.titleSO1131A2;
        //        //產生csWindow
        //        var width = 900;
        //        var height = 300;
        //        var x = ($(options.container).width() - width) / 2;
        //        var y = ($(options.container).height() - height) / 2;
        //        var winOptions = {
        //            width: width,
        //            height: height,
        //            maxWidth: $(options.container).width(),
        //            maxHeight: $(options.container).height(),
        //            position: { x: x, y: y },
        //            closeButtonAction: 'close',
        //            resizable: true,
        //            theme: options.theme
        //        };
        //        var win = createcsWindow(options.container, formTitle, winOptions);
        //        //開起子視窗
        //        getControlObject(div, 'btnSave').jqxButton({ disabled: true });
        //        $('#' + win.contentId)['SO1131A2']({
        //            loginInfo: cloneJSON(options.loginInfo),
        //            container: $('#' + win.windowId),
        //            theme: options.theme,
        //            localization: options.localization,
        //            parameters: dsData,
        //            editMode: options.editMode
        //        });
        //        //當子視窗關閉時
        //        $('#' + win.windowId).on('close', function () {
        //            if (options.editMode == editMode.append || options.editMode == editMode.edit) {
        //                //取得選取的設備
        //                var suboptions = $('#' + win.contentId).SO1131A2('options');
        //                if (convertToNull(suboptions.SERVICEID) != null) {
        //                    getControlObject(div, 'tProServiceID').jqxInput('val', suboptions.SERVICEID);
        //                };
        //            };
        //            $('#' + win.contentId)['SO1131A2']('destroy');
        //            $('#' + win.windowId).csWindow('destroy');
        //            getControlObject(div, 'btnSave').jqxButton({ disabled: false });
        //        });
        //    };
        //});

        //查詢設備明細
        getControlObject(div, 'btnFaciSno').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }

            var item = getControlObject(div, 'cboServiceType').jqxComboBox('getSelectedItem');
            //設定呼叫參數
            var dsData = {
                type: 'string',
                chooseFaci: {
                    columns: [{ name: 'CUSTID', type: 'integer' },
                        { name: 'SERVICETYPE', type: 'string' },
                        { name: 'FACISEQNO', type: 'string' },
                        { name: 'FACISNO', type: 'string' }
                    ],
                    rows: [{
                        CUSTID: options.custId,
                        SERVICETYPE: convertToNull(item.label),
                        FACISEQNO: options.faciSeqNo
                    }]
                }
            };
            //設定FormTitle
            var formTitle = lang.titleSO1131E;
            //產生csWindow
            var width = 900;
            var height = 300;
            var x = ($(options.container).width() - width) / 2;
            var y = ($(options.container).height() - height) / 2;
            var winOptions = {
                width: width,
                height: height,
                minWidth: 300,
                minHeight: 150,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };
            var win = createcsWindow(options.container, formTitle, winOptions);
            //開起子視窗
            getControlObject(div, 'btnSave').jqxButton({ disabled: true });
            $('#' + win.contentId)['SO1131E']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                theme: options.theme,
                localization: cloneJSON(options.localization),
                parameters: cloneJSON(dsData),
                editMode: options.editMode,
                includeDVR: true,
                includePR: true,
                canMutilChoose: false,
                isQueryMVodID: false
            });
            //當子視窗關閉時
            $('#' + win.windowId).on('close', function () {
                if (options.editMode == editMode.append || options.editMode == editMode.edit) {
                    //取得選取的設備
                    var suboptions = $('#' + win.contentId).SO1131E('options');
                    if (convertToNull(suboptions.faciSeqNO) != null) {
                        //getControlObject(div, 'lFaciSno').jqxTooltip({ content: lang.lFaciSeqNo + suboptions.faciSeqNO });
                        if (options.faciSeqNo != suboptions.faciSeqNO) {
                            getControlObject(div, 'lFaciSno').jqxTooltip('content', lang.lFaciSeqNo + suboptions.faciSeqNO);
                            options.faciSeqNo = suboptions.faciSeqNO;
                        };
                        if (getControlObject(div, 'tFaciSno').jqxInput('val') != suboptions.faciSNO) {
                            if (convertToNull(suboptions.faciSNO) != null) {
                                getControlObject(div, 'tFaciSno').jqxInput('val', suboptions.faciSNO);
                            } else {
                                getControlObject(div, 'tFaciSno').jqxInput('val', null);
                            };
                        };
                    };
                };
                $('#' + win.contentId)['SO1131E']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.contentId);
                options.controls = deleteRowByKeyValue(options.controls, 'name', win.windowId);
                getControlObject(div, 'btnSave').jqxButton({ disabled: false });
            });
        });
        //修改
        getControlObject(div, 'btnEdit').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }

            options.editMode = editMode.edit;
            ////權限
            //setPrivControl(div, editMode.edit, true);
            //改為修改模式
            changeMode(div, editMode.edit, true);
        });
        //存檔
        getControlObject(div, 'btnSave').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            ////參數檢核
            //if (isDataOk(div) != true) return;
            var blnDo = true;

            if (options.doProcessMark == 1 && getControlObject(div, 'dtRealDate').csDateTime('getDate') != null) {
                if (getControlObject(div, 'dtRealDate').val() < formatDateTime(options.parameters.Simple.rows[0]['REALDATE'], 'yyyyMMdd', true)) {
                    blnDo = false;
                    messageBox(lang.chkProcessMark, messageType.critical);
                    return;
                };
            };
            if (blnDo == true) {
                //執行存檔
                save(div, function (isOk, msg) {
                    if (isOk == true) {
                        //messageBox(msg, null, null, function () {
                        options.isSaved = true;
                        //關閉CSWindow
                        close(div);
                        //});
                    }
                    else {
                        messageBox(msg, messageType.critical);
                        return;
                    }
                });
            };
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
                //};
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
            var data = {};
            var cols = {};

            if (options.initData.Simple == null) {
                if (options.initData.ChargeDefault.rows.length > 0) {
                    options.initData.Simple = cloneJSON(options.initData.ChargeDefault);
                };
            };

            //if (options.editMode == editMode.append) {
            //    row = options.initData.ChargeDefault.rows[0];
            //    cols = cloneJSON(options.initData.ChargeDefault.columns);
            //} else if (options.editMode == editMode.edit) {
            //    row = options.initData.Simple.rows[0];
            //    cols = cloneJSON(options.initData.Simple.columns);
            //};

            var row = options.initData.Simple.rows[0];
            cols = cloneJSON(options.initData.Simple.columns);

            data['Simple'] = {
                columns: cols,
                rows: []
            };
            //var row = {};
            row['CUSTID'] = convertToNull(options.custId);
            var selItem = getControlObject(div, 'cboServiceType').jqxComboBox('getSelectedItem');
            row['SERVICETYPE'] = convertToNull(selItem.label);
            row['COMPCODE'] = convertToNull(options.loginInfo.loginInfo.rows[0].compcode);
            ////單據編號
            //row['BILLNO'] = convertToNull(getControlObject(div, 'tBillNo').val());
            //row['ITEM'] = convertToNull(getControlObject(div, 'tItem').val());
            //收費項目
            row['CITEMCODE'] = convertToNull(getControlObject(div, 'csCitemCode').csList('codeNo'));
            row['CITEMNAME'] = convertToNull(getControlObject(div, 'csCitemCode').csList('description'));
            ////產品編號
            //row['PROSERVICEID'] = convertToNull(getControlObject(div, 'tProServiceID').val());
            ////週期種類
            //row['PERIODTYPE'] = convertToNull(getControlObject(div, 'cboPeriodType').jqxComboBox('selectedIndex'));
            //if (itemPType <= 0) {
            //    row['PERIODTYPE'] = convertToNull(getControlObject(div, 'cboPeriodType').jqxComboBox('selectedIndex'), true);
            //} else {
            //    row['PERIODTYPE'] = null;
            //};

            //設備序號
            row['FACISNO'] = convertToNull(getControlObject(div, 'tFaciSno').val());
            row['FACISEQNO'] = convertToNull(options.faciSeqNo);
            //應收日期
            if (getControlObject(div, 'dtShouldDate').csDateTime('getDate') != null) {
                row['SHOULDDATE'] = dateToJson(getControlObject(div, 'dtShouldDate').csDateTime('getDate'));
            } else {
                row['SHOULDDATE'] = null;
            };
            //期數
            row['REALPERIOD'] = convertToNull(getControlObject(div, 'tRealPeriod').val(), true);
            //有效期限
            if (getControlObject(div, 'dtRealStartDate').csDateTime('getDate') != null) {
                row['REALSTARTDATE'] = dateToJson(getControlObject(div, 'dtRealStartDate').csDateTime('getDate'));
            } else {
                row['REALSTARTDATE'] = null;
            };
            if (getControlObject(div, 'dtRealStopDate').csDateTime('getDate') != null) {
                row['REALSTOPDATE'] = dateToJson(getControlObject(div, 'dtRealStopDate').csDateTime('getDate'));
            } else {
                row['REALSTOPDATE'] = null;
            };
            //出單金額
            row['SHOULDAMT'] = convertToNull(getControlObject(div, 'tShouldAmt').val(), true);
            //收費方式
            row['CMCODE'] = convertToNull(getControlObject(div, 'csCMCode').csList('codeNo'));
            row['CMNAME'] = convertToNull(getControlObject(div, 'csCMCode').csList('description'));
            //付款種類
            row['PTCODE'] = convertToNull(getControlObject(div, 'csPTCode').csList('codeNo'));
            row['PTNAME'] = convertToNull(getControlObject(div, 'csPTCode').csList('description'));
            //未收原因
            row['UCCODE'] = convertToNull(getControlObject(div, 'csUCCode').csList('codeNo'));
            row['UCNAME'] = convertToNull(getControlObject(div, 'csUCCode').csList('description'));
            //收費日期
            if (getControlObject(div, 'dtRealDate').csDateTime('getDate') != null) {
                row['REALDATE'] = dateToJson(getControlObject(div, 'dtRealDate').csDateTime('getDate'));
            } else {
                row['REALDATE'] = null;
            };
            //實收金額
            row['REALAMT'] = convertToNull(getControlObject(div, 'tRealAmt').val(), true);
            //短收類別
            row['ADJUSTFLAG'] = convertToNull(getControlObject(div, 'cboSTType').jqxComboBox('selectedIndex'), true);
            //短收原因
            row['STCODE'] = convertToNull(getControlObject(div, 'csSTCode').csList('codeNo'));
            row['STNAME'] = convertToNull(getControlObject(div, 'csSTCode').csList('description'));
            //收費人員
            row['CLCTEN'] = convertToNull(getControlObject(div, 'csClctEn').csList('codeNo'));
            row['CLCTNAME'] = convertToNull(getControlObject(div, 'csClctEn').csList('description'));
            //手開單號
            row['MANUALNO'] = convertToNull(getControlObject(div, 'tManualNo').val());
            //作廢原因
            row['CANCELCODE'] = convertToNull(getControlObject(div, 'csCancelCode').csList('codeNo'));
            row['CANCELNAME'] = convertToNull(getControlObject(div, 'csCancelCode').csList('description'));
            //產單客戶類別
            row['CLASSCODE'] = convertToNull(getControlObject(div, 'csClassCode').csList('codeNo'));
            //row['CLASSNAME'] = convertToNull(getControlObject(div, 'csClassCode').csList('description'));
            //票據號碼
            row['CHECKNO'] = convertToNull(getControlObject(div, 'tCheckNo').val());
            //到期日
            if (getControlObject(div, 'dtCheckDueDate').csDateTime('getDate') != null) {
                row['CHECKDUEDATE'] = dateToJson(getControlObject(div, 'dtCheckDueDate').csDateTime('getDate'));
            } else {
                row['CHECKDUEDATE'] = null;
            };
            //下期期數
            row['NEXTPERIOD'] = convertToNull(getControlObject(div, 'tNextPeriod').val(), true);
            //下期金額
            row['NEXTAMT'] = convertToNull(getControlObject(div, 'tNextAmt').val(), true);

            //優惠組合
            row['BPCODE'] = convertToNull(getControlObject(div, 'csBPCode').csList('codeNo'));
            row['BPNAME'] = convertToNull(getControlObject(div, 'csBPCode').csList('description'));
            //訂單編號
            row['ORDERNO'] = convertToNull(getControlObject(div, 'tOrderNo').val());
            //促銷方案
            row['PROMCODE'] = convertToNull(getControlObject(div, 'csPromCode').csList('codeNo'));
            row['PROMNAME'] = convertToNull(getControlObject(div, 'csPromCode').csList('description'));
            //優惠期間
            if (getControlObject(div, 'dtDiscountDate1').csDateTime('getDate') != null) {
                row['DISCOUNTDATE1'] = dateToJson(getControlObject(div, 'dtDiscountDate1').csDateTime('getDate'));
            } else {
                row['DISCOUNTDATE1'] = null;
            };
            if (getControlObject(div, 'dtDiscountDate2').csDateTime('getDate') != null) {
                row['DISCOUNTDATE2'] = dateToJson(getControlObject(div, 'dtDiscountDate2').csDateTime('getDate'));
            } else {
                row['DISCOUNTDATE2'] = null;
            };
            //優待金額
            row['DISCOUNTAMT'] = convertToNull(getControlObject(div, 'tDiscountAmt').val(), true);
            //合約編號
            row['CONTNO'] = convertToNull(getControlObject(div, 'tContNo').val());
            //合約期間
            if (getControlObject(div, 'dtContStartDate').csDateTime('getDate') != null) {
                row['CONTSTARTDATE'] = dateToJson(getControlObject(div, 'dtContStartDate').csDateTime('getDate'));
            } else {
                row['CONTSTARTDATE'] = null;
            };
            if (getControlObject(div, 'dtContStopDate').csDateTime('getDate') != null) {
                row['CONTSTOPDATE'] = dateToJson(getControlObject(div, 'dtContStopDate').csDateTime('getDate'));
            } else {
                row['CONTSTOPDATE'] = null;
            };
            //點數行銷辦法
            row['SALEPOINTCODE'] = convertToNull(getControlObject(div, 'csSalePointCode').csList('codeNo'));
            row['SALEPOINTNAME'] = convertToNull(getControlObject(div, 'csSalePointCode').csList('description'));
            //贈送設備
            row['STBSEQNO'] = convertToNull(getControlObject(div, 'tSTBSeqNo').val());
            //違約處分
            if (getControlObject(div, 'chkPunish').val()) {
                row['PUNISH'] = 1;
            } else {
                row['PUNISH'] = 0;
            };

            //發票號碼
            row['GUINO'] = convertToNull(getControlObject(div, 'tGUINo').val());
            //發票抬頭流水號
            row['INVSEQNO'] = convertToNull(getControlObject(div, 'tInvSeqNo').val());
            //一般備註
            row['NOTE'] = convertToNull(getControlObject(div, 'taNotePopu').val());

            //新增時順填欄位  
            if (options.editMode == editMode.append) {
                row['OLDPERIOD'] = convertToNull(getControlObject(div, 'tRealPeriod').val(), true);
                if (getControlObject(div, 'dtRealStartDate').csDateTime('getDate') != null) {
                    row['OLDSTARTDATE'] = dateToJson(getControlObject(div, 'dtRealStartDate').csDateTime('getDate'));
                } else {
                    row['OLDSTARTDATE'] = null;
                };
                if (getControlObject(div, 'dtRealStopDate').csDateTime('getDate') != null) {
                    row['OLDSTOPDATE'] = dateToJson(getControlObject(div, 'dtRealStopDate').csDateTime('getDate'));
                } else {
                    row['OLDSTOPDATE'] = null;
                };
                row['OLDAMT'] = convertToNull(getControlObject(div, 'tShouldAmt').val(), true);
                //'新增模式要帶入週期未顯示在畫面上的欄位資料
                if (options.initData.PeriodCycle != null) {
                    var row2 = options.initData.PeriodCycle.rows[0];
                    if (row2 == null || row2 == undefined) {
                        row['PUNISH'] = 0;
                        row['SEQNO'] = 0;
                        row['PAYKIND'] = 0;
                    }
                    else {
                        row['PUNISH'] = convertToNull(row2['PUNISH'], true);
                        row['SEQNO'] = convertToNull(row2['SEQNO'], true);
                        row['PAYKIND'] = convertToNull(row2['PAYKIND'], true);
                        if (isEmpty(row2['STEPNO']) == false) {
                            row['STEPNO'] = convertToNull(row2['STEPNO']);
                        };
                        if (isEmpty(row2['LINKKEY']) == false) {
                            row['LINKKEY'] = convertToNull(row2['LINKKEY']);
                        };
                        if (isEmpty(row2['COMMENTS']) == false) {
                            row['COMMENTS'] = convertToNull(row2['COMMENTS']);
                        };
                    };
                };
                if (options.initData.ChargeDefault != null) {
                    var row2 = options.initData.ChargeDefault.rows[0];
                    if (!(row2 == null || row2 == undefined)) {
                        row['NODENO'] = row2['NODENO'];
                    };
                };
            };
            if (isEmpty(row['CANCELFLAG']) == true) {
                row['CANCELFLAG'] = 0;
            };

            //沖帳
            if (options.doProcessMark == 1) {
                row['REVERSEBILLNO'] = convertToNull(options.billNo);
                row['REVERSEITEM'] = convertToNull(options.item);
                row['PROCESSMARK'] = 1;
                row['OLDAMT'] = convertToNull(getControlObject(div, 'tShouldAmt').val(), true);
                //row['BANKCODE'] = null;
                //row['BANKNAME'] = null;
                //row['ACCOUNTNO'] = null;
                row['AUTHORIZENO'] = null;
                //if (getControlObject(div, 'optDiscount').val() == true) {
                row['PREINVOICE'] = 3;
                //};
                //seqno,clctym,clstime,clsen,citibankatm,mediabillno
                row['SEQNO'] = 0;
                row['CLCTYM'] = null;
                row['CLSTIME'] = null;
                row['CLSEN'] = null;
                row['MEDIABILLNO'] = null;
                row['CITIBANKATM'] = null;
                //classcode,nodeno
            }
            else {
                //row['BANKCODE'] = convertToNull(getControlObject(div, 'csBankCode').csList('codeNo'));
                //row['BANKNAME'] = convertToNull(getControlObject(div, 'csBankCode').csList('description'));
                //var itemAcc = getControlObject(div, 'cboAccountNo').jqxComboBox('getSelectedItem');
                //if (isEmpty(itemAcc) == false) {
                //    row['ACCOUNTNO'] = convertToNull(itemAcc.label);
                //} else {
                //    row['ACCOUNTNO'] = null;
                //};
                row['AUTHORIZENO'] = convertToNull(getControlObject(div, 'tAuthorizeNo').val());
            };
            //2019.04.23 #8050 跟Debby討論確認,只要SO003或SO003C有帶預設,就不用清空,不分一般收費或沖帳
            row['BANKCODE'] = convertToNull(getControlObject(div, 'csBankCode').csList('codeNo'));
            row['BANKNAME'] = convertToNull(getControlObject(div, 'csBankCode').csList('description'));
            var itemAcc = getControlObject(div, 'cboAccountNo').jqxComboBox('getSelectedItem');
            if (isEmpty(itemAcc) == false) {
                row['ACCOUNTNO'] = convertToNull(itemAcc.label);
            } else {
                row['ACCOUNTNO'] = null;
            };

            data['Simple'].rows.push(row);

            delete options.initData.Simple;
            options.initData.Simple = data['Simple'];

            return data;
        }
        catch (err) {
            errorHandle(formName, 'getSaveData', err);
        }
    };
    //執行存檔
    function save(div, action) {
        try {
            var options = $.data(div, formName).options;
            //將控制項細資存入物件
            var tData = getSaveData(div);

            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div);
            //var simple = { Simple: cloneJSON(data) };
            var parameters = $.extend({}, paraLoginInfo, {
                dsCharge: { type: 'string', value: JSON.stringify(tData) },
                DoProcessMark: { type: 'integer', value: options.doProcessMark },
                WipType: { type: 'integer', value: options.wipType },
                aEditMode: { type: 'integer', value: options.editMode }
            });
            var params = getParameters(riadllName, riaClassName, 'GetChkSave', JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    parameters.length = 0;
                    parameters = null;
                    delete parameters;
                    //delete data;
                    if (data.ResultBoolean == true) {
                        //工單要額外處理
                        if (options.wipType > 0) {
                            if (options.wipData['ChooseFacility'] != null) {
                                delete options.wipData['ChooseFacility'];
                            };
                            if (options.editMode == editMode.append) {
                                delete options.wipData['Simple'];
                                options.wipData['Simple'] = tData.Simple;
                            }
                            else {
                                var keys1 = Object.keys(options.wipData['Simple'].columns);
                                var kLens1 = keys1.length;
                                var keys2 = Object.keys(tData.Simple.columns);
                                var kLens2 = keys2.length;

                                for (var i = 0 ; i < kLens1; i++) {
                                    for (var j = 0 ; j < kLens2; j++) {
                                        var colName1 = options.wipData['Simple'].columns[keys1[i]].name.toUpperCase();
                                        var colName2 = tData.Simple.columns[keys2[j]].name.toUpperCase();

                                        if (colName1 == colName2) {
                                            //if (keys1[i].toUpperCase() == keys2[j].toUpperCase()) {
                                            options.wipData['Simple'].rows[0][colName1] = convertNullToString(tData.Simple.rows[0][colName2]);
                                        };
                                    };
                                };
                            };
                        };

                        options.isSaved = true;
                        action(true);
                    }
                    else {
                        action(false, data.ErrorMessage);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'save', err);
        };
    };
    ////call BLL做存檔前的檢核
    //function chkDataOK(div,data, action) {
    //    try {
    //        var options = $.data(div, formName).options;
    //        var paraLoginInfo = getParaLoginInfo(div);
    //        //var simple = { Simple: cloneJSON(data) };
    //        var parameters = $.extend({}, paraLoginInfo, {
    //            dsCharge: { type: 'string', value: JSON.stringify(data) },
    //            _DoProcessMark: { type: 'integer', value: options.doProcessMark },
    //            _WipType: { type: 'integer', value: options.wipType },
    //            aEditMode: { type: 'integer', value: options.editMode }
    //        });
    //        var params = getParameters(riadllName, riaClassName, 'ChkDataOk', JSON.stringify(parameters));
    //        getServerData(params, {
    //            success: function (data) {
    //                parameters.length = 0;
    //                parameters = null;
    //                delete parameters;
    //                //delete data;
    //                if (data.ResultBoolean == true) {
    //                    action(true, data.ErrorMessage);
    //                }
    //                else {
    //                    action(false, data.ErrorMessage);
    //                }
    //            }
    //        });
    //    }
    //    catch (err) {
    //        errorHandle(formName, 'chkDataOK', err);
    //    };
    //};
    ////call BLL存檔
    //function doSave(div, data, action) {
    //    try {
    //        var options = $.data(div, formName).options;
    //        var paraLoginInfo = getParaLoginInfo(div);
    //        //var simple = { Simple: cloneJSON(data) };
    //        var parameters = $.extend({}, paraLoginInfo, {
    //            EditMode: { type: 'integer', value: options.editMode },
    //            dsCharge: { type: 'string', value: JSON.stringify(data) },
    //            DoProcessMark: { type: 'integer', value: options.doProcessMark }
    //        });
    //        var params = getParameters(riadllName, riaClassName, 'Save', JSON.stringify(parameters));
    //        getServerData(params, {
    //            success: function (data) {
    //                parameters.length = 0;
    //                parameters = null;
    //                delete parameters;
    //                delete tData;
    //                if (data.ResultBoolean == true) {
    //                    action(true, data.ErrorMessage);
    //                }
    //                else {
    //                    action(false, data.ErrorMessage);
    //                }
    //            }
    //        });
    //
    //    }
    //    catch (err) {
    //        errorHandle(formName, 'doSave', err);
    //    };
    //};

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
                if (options.editMode != editMode.view && options.isSaved != true) {
                    messageBox(options.language.quiteNote, messageType.yesno, null, function (flag) {
                        if (flag == 'yes') {
                            $(options.container).csWindow('close');
                        };
                    });
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