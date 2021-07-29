///申請人 姓名.稱謂,電話,行動電話,證件1,證件2,通訊地址 2017/03/02 Jacky 與 Karen 討論後決定
(function ($) {
    var formName = 'SO1144B6';
    var riadllName = 'CableSoft.SO.RIA.Order.Edit.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Order.Edit.Web.Proposer';
    var buttonsHeight = 25;
    var textHeight = 23;
    var proposerTableName = 'Proposer';
    var orderProposerTableName = 'OrderProposer';
    var customerTableName = 'Customer';
    var parameterTableName = "Parameter";
    var faciProposerTableName = "FaciProposer";
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
                        options: $.extend({}, new defaults(), new SO1144B6(), options)
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
        getData: function (jq) {
            return scrToRcd(jq[0]);
        },
        setData: function (jq, params) {
            return jq.each(function () {
                rcdToScr(this, params);
            });
        },
        disabled: function (jq, params) {
            return jq.each(function () {
                disabled(this, params);
            });
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
        this.custId = 0;
        this.orderNo = null;
        this.localization = null;
        this.container = null;
        this.proposerData = [];
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
            errorHandle(formName, 'setParameter', err);
        }
    };
    function formResize(div, params) {
        try {
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            var controls = options.controls;
            for (var i = 0; i < controls.length; i++) {
                if (controls[i].type.indexOf('jqxSplitter') >= 0) {
                    var height = $(div).height();
                    var height1 = Math.floor(height * 3 / 5);
                    var height2 = Math.floor(height * 2 / 5);
                    $('#' + controls[i].name).jqxSplitter({ height: '99.5%', panels: [{ size: height1 }, { size: height2 }] });
                }
            }
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
            $(document).off(options.documentEventName);
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
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            $.ajax({
                url: 'SO1000\\' + formName + '.html',
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            frmAddHandler(div);
                            //listAddHandler(div);
                            //checkAddHandler(div);
                            //textAddHandler(div);
                            buttonAddHandler(div);
                            $(div).triggerHandler('loaded');
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
    function frmAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.container != null) {
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    $(options.container).on('winClosing', function (e) {
                        close(div)
                    });
                }
                addHandlerGetParameters(options.container, options);
            }
            else {
                addHandlerGetParameters(div, options);
            }

        }
        catch (err) {
            errorHandle(formName, 'frmAddHandler', err);
        }
    };
    function disabled(div, flag) {
        try {
            var options = $.data(div, formName).options;
            disableAllControls(options.controls, flag);
        }
        catch (err) {
            errorHandle(formName, 'disabled', err);
        }
    };
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div);
            renderControl(div);
            //$(options.container).on('resize', function () {
            //    formResize(div);
            //});
            formResize(div);
            //getAllInitData(div, function (r) {
            //    if (r[0] == false) {
            //        messageBox(r[1], null, null, action);
            //    }
            //    else {
            //        initList(div);
            //        initMultiSelect(div);
            //        rcdToScr(div, options.initData);
            //        action(true);
            //    }
            //});
            initList(div);
            //initMultiSelect(div);
            rcdToScr(div, options.initData);
            action(true);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function initList(div) {
        try {
            var options = $.data(div, formName).options;
            var csArrays = ["csIDKindCode1"];
            var tableArrays = ["IDKindCode"];
            var cLengths = csArrays.length;

            for (var i = 0; i < cLengths; i++) {
                getControlObject(div, csArrays[i]).csList('source', options.initData[tableArrays[i]].rows);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initList', err);
        }
    };
    function initMultiSelect(div) {
        try {
            var options = $.data(div, formName).options;
            var csArrays = ["cmCustAttribute"];
            var tableArrays = ["ClassCode"];
            var cLengths = csArrays.length;

            for (var i = 0; i < cLengths; i++) {
                getControlObject(div, csArrays[i]).csMulti('source', options.initData[tableArrays[i]].rows);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initMultiSelect', err);
        }
    };
    //取得單選下拉資料
    function getAllInitData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var custId = options.custId;
            var orderNo = options.orderNo;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                custId: { type: 'integer', value: custId },
                orderNo: { type: 'string', value: convertToNull(orderNo) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetAllInitData',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        delete options.initData;
                        options.initData = JSON.parse(data.ResultXML);
                        action(true);
                    }
                    else {
                        action(false, data.ErrorMessage);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getInitData', err);
        }
    };
    function listAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //第一證件種類
            csIDKindCode1_selectedIndexChanged(div);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    };
    function csIDKindCode1_selectedIndexChanged(div) {
        getControlObject(div, 'csIDKindCode1').on('selectedIndexChanged', function () {
            try {
                var options = $.data(div, formName).options;
                var kindCode = getControlObject(div, 'csIDKindCode1').csList('codeNo');
                if (kindCode == null) {
                    getControlObject(div, 'tID1').removeAttr('maxlength');
                }
                else {
                    var row = getRowByKeyValue(options.initData['IDKindCode'].rows, 'CODENO', kindCode);
                    var idLength = row['IDLength'.toUpperCase()];
                    getControlObject(div, 'tID1').attr('maxlength', idLength);
                }
                //參考號3,5需取假ID
                if (',3,5,'.indexOf(',' + row['REFNO'] + ',') >= 0) {
                    getCustomerVirtualId(div, kindCode, function (r) {
                        if (r[0] == true) {
                            getControlObject(div, 'tID1').jqxInput('val', r[1]);
                        }
                    });
                }
            }
            catch (err) {
                errorHandle(formName, 'csIDKindCode1_selectedIndexChanged', err);
            }
        });
    };
    function checkAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //公司
            chkCompany_change(div);
        }
        catch (err) {
            errorHandle(formName, 'checkAddHandler', err);
        }

    };
    function chkCompany_change(div) {
        getControlObject(div, 'chkCompany').on('change', function (event) {
            try {
                var val = getControlObject(div, 'chkCompany').jqxCheckBox('val');
                if (val == true) {
                    getControlObject(div, 'tBoss').jqxInput({ disabled: false });
                    getControlObject(div, 'tBossID').jqxInput({ disabled: false });
                }
                else {
                    getControlObject(div, 'tBoss').jqxInput({ disabled: true });
                    getControlObject(div, 'tBossID').jqxInput({ disabled: true });
                    getControlObject(div, 'tBoss').jqxInput('val', null);
                    getControlObject(div, 'tBossID').jqxInput('val', null);
                }
            }
            catch (err) {
                errorHandle(formName, 'chkCompany_change', err);
            }
        });
    };
    function textAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //第1證號
            tID1_change(div);
        }
        catch (err) {
            errorHandle(formName, 'checkAddHandler', err);
        }

    };
    function tID1_change(div) {
        var func = (function (event) {
            try {
                var id = getControlObject(div, 'tID1').jqxInput('val');
                if (IsNullOrEmpty(id)) return;
                var kindCode = getControlObject(div, 'csIDKindCode1').csList('codeNo');
                proposerID1Change(div, kindCode, id, function (r) {
                    if (r[0] == true && r[1] != null) {
                        getControlObject(div, 'tID1').off('change', func);
                        setProposer(div, r[1][proposerTableName].rows[0]);
                        getControlObject(div, 'tID1').on('change', func);
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'chkCompany_change', err);
            }
        });
        getControlObject(div, 'tID1').on('change', func);
    };
    //取得假的ID
    function getCustomerVirtualId(div, kindCode, action) {
        try {
            var options = $.data(div, formName).options;
            var custId = options.custId;
            var orderNo = options.orderNo;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                kindCode: { type: 'string', value: kindCode },
                custId: { type: 'integer', value: custId }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetCustomerVirtualId',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        action([true, data.ResultXML]);
                    }
                    else {
                        action(false, data.ErrorMessage);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getInitData', err);
        }
    };
    function proposerID1Change(div, kindCode, id, action) {
        try {
            var options = $.data(div, formName).options;
            var custId = options.custId;
            var orderNo = options.orderNo;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var parameters = $.extend({}, paraLoginInfo, {
                kindCode: { type: 'string', value: kindCode },
                id: { type: 'string', value: id }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'ProposerID1Change',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    delete parameters;
                    delete params;
                    if (data.ResultBoolean == true) {
                        action([true, JSON.parse(data.ResultXML)]);
                    }
                    else {
                        action(false, data.ErrorMessage);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getInitData', err);
        }
    };

    function rcdToScr(div, inData) {
        try {
            var options = $.data(div, formName).options;
            var row = [];
            if (inData != null && inData[proposerTableName] != null && inData[proposerTableName].rows.length > 0) {
                setOrderProposer(div, inData[proposerTableName].rows[0]);
            }
                //取訂單申請人
            else if (options.initData[orderProposerTableName] != null && options.initData[orderProposerTableName].rows.length > 0) {
                setOrderProposer(div, options.initData[orderProposerTableName].rows[0]);
            }
                //取客戶申請人
            else if (options.initData[proposerTableName] != null && options.initData[proposerTableName].rows.length > 0) {
                setProposer(div, options.initData[proposerTableName].rows[0]);
            }
                //取客戶資料
            else if (options.parameters[customerTableName] != null && options.parameters[customerTableName].rows.length > 0) {
                setCustomer(div, options.parameters[customerTableName].rows[0]);
            }
        }
        catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        }
    };
    //訂單申請人
    function setOrderProposer(div, row) {
        try {
            var options = $.data(div, formName).options;
            delete options.proposerData;
            options.proposerData = {};
            getControlObject(div, 'tDeclarantName').jqxInput('val', convertNullToString(row['DeclarantName'.toUpperCase()]));
            getControlObject(div, 'tContTel').jqxInput('val', convertNullToString(row['ContTel'.toUpperCase()]));
            getControlObject(div, 'tContmobile').jqxInput('val', convertNullToString(row['Contmobile'.toUpperCase()]));
            getControlObject(div, 'tID1').jqxInput('val', convertNullToString(row['ID'.toUpperCase()]));

            getControlObject(div, 'tDateline').jqxInput('val', convertNullToString(row['Dateline'.toUpperCase()]));
            getControlObject(div, 'cbPreFix').jqxComboBox('selectIndex', convertToNull(row['PreFix'.toUpperCase()], true));
            getControlObject(div, 'csIDKindCode1').csList('codeNo', row['IDKindCode1'.toUpperCase()]);
            getControlObject(div, 'csIDKindCode1').csList('description', row['IDKindName1'.toUpperCase()]);

            options.proposerData['ID2'.toUpperCase()] = row['ID2'.toUpperCase()];

            options.proposerData['IDKindCode'.toUpperCase()] = row['IDKindCode'.toUpperCase()];
            options.proposerData['IDKindName'.toUpperCase()] = row['IDKindName'.toUpperCase()];

            options.proposerData['DomicileAddress'.toUpperCase()] = row['DomicileAddress'.toUpperCase()];

            options.proposerData['Email'.toUpperCase()] = row['Email'.toUpperCase()];
            options.proposerData['Email2'.toUpperCase()] = row['Email2'.toUpperCase()];

            options.proposerData['Boss'.toUpperCase()] = row['Boss'.toUpperCase()];
            options.proposerData['BossID'.toUpperCase()] = row['BossID'.toUpperCase()];

            options.proposerData['Sextual'.toUpperCase()] = row['Sextual'.toUpperCase()];

            options.proposerData['Birthday'.toUpperCase()] = row['Birthday'.toUpperCase()];

            options.proposerData['ContTime1'.toUpperCase()] = row['ContTime1'.toUpperCase()];
            options.proposerData['ContTime2'.toUpperCase()] = row['ContTime2'.toUpperCase()];

            options.proposerData['Company'.toUpperCase()] = row['Company'.toUpperCase()];
            options.proposerData['Married'.toUpperCase()] = row['Married'.toUpperCase()];

            options.proposerData['ClassCode1'.toUpperCase()] = row['ClassCode1'.toUpperCase()];
            options.proposerData['ClassName1'.toUpperCase()] = row['ClassName1'.toUpperCase()];

            options.proposerData['ClassCode2'.toUpperCase()] = row['ClassCode2'.toUpperCase()];
            options.proposerData['ClassName2'.toUpperCase()] = row['ClassName2'.toUpperCase()];

            options.proposerData['ClassCode3'.toUpperCase()] = row['ClassCode3'.toUpperCase()];
            options.proposerData['ClassName3'.toUpperCase()] = row['ClassName3'.toUpperCase()];

            options.proposerData['CustAttribute'.toUpperCase()] = row['CustAttribute'.toUpperCase()];
        }
        catch (err) {
            errorHandle(formName, 'setOrderProposer', err);
        }
    };
    function setProposer(div, row) {
        try {
            var options = $.data(div, formName).options;
            delete options.proposerData;
            options.proposerData = {};
            getControlObject(div, 'tDeclarantName').jqxInput('val', convertNullToString(row['DeclarantName'.toUpperCase()]));
            getControlObject(div, 'tContTel').jqxInput('val', convertNullToString(row['ContTel'.toUpperCase()]));
            getControlObject(div, 'tContmobile').jqxInput('val', convertNullToString(row['Contmobile'.toUpperCase()]));
            getControlObject(div, 'tID1').jqxInput('val', convertNullToString(row['ID'.toUpperCase()]));

            getControlObject(div, 'tDateline').jqxInput('val', convertNullToString(row['Dateline'.toUpperCase()]));
            getControlObject(div, 'cbPreFix').jqxComboBox('selectIndex', convertToNull(row['PreFix'.toUpperCase()], true));
            getControlObject(div, 'csIDKindCode1').csList('codeNo', row['IDKindCode1'.toUpperCase()]);
            getControlObject(div, 'csIDKindCode1').csList('description', row['IDKindName1'.toUpperCase()]);

            options.proposerData['ID2'.toUpperCase()] = row['ID2'.toUpperCase()];

            options.proposerData['IDKindCode'.toUpperCase()] = row['IDKindCode'.toUpperCase()];
            options.proposerData['IDKindName'.toUpperCase()] = row['IDKindName'.toUpperCase()];

            options.proposerData['DomicileAddress'.toUpperCase()] = row['DomicileAddress'.toUpperCase()];

            options.proposerData['Email'.toUpperCase()] = row['Email'.toUpperCase()];
            options.proposerData['Email2'.toUpperCase()] = row['Email2'.toUpperCase()];

            options.proposerData['Boss'.toUpperCase()] = row['Boss'.toUpperCase()];
            options.proposerData['BossID'.toUpperCase()] = row['BossID'.toUpperCase()];

            options.proposerData['Sextual'.toUpperCase()] = row['Sextual'.toUpperCase()];

            options.proposerData['Birthday'.toUpperCase()] = row['Birthday'.toUpperCase()];

            options.proposerData['ContTime1'.toUpperCase()] = row['ContTime1'.toUpperCase()];
            options.proposerData['ContTime2'.toUpperCase()] = row['ContTime2'.toUpperCase()];

            options.proposerData['Company'.toUpperCase()] = row['Company'.toUpperCase()];
            options.proposerData['Married'.toUpperCase()] = row['Married'.toUpperCase()];

            options.proposerData['CustAttribute'.toUpperCase()] = row['CustAttribute'.toUpperCase()];
        }
        catch (err) {
            errorHandle(formName, 'setProposer', err);
        }
    };
    function setCustomer(div, row) {
        try {
            var options = $.data(div, formName).options;
            delete options.proposerData;
            options.proposerData = {};
            getControlObject(div, 'tDeclarantName').jqxInput('val', convertNullToString(row['CustName'.toUpperCase()]));
            getControlObject(div, 'tContTel').jqxInput('val', convertNullToString(row['TEL1'.toUpperCase()]));
            getControlObject(div, 'tContmobile').jqxInput('val', convertNullToString(row['TEL3'.toUpperCase()]));
            getControlObject(div, 'tID1').jqxInput('val', convertNullToString(row['ID'.toUpperCase()]));

            getControlObject(div, 'tDateline').jqxInput('val', convertNullToString(row['InstAddress'.toUpperCase()]));

            options.proposerData['Email'.toUpperCase()] = convertNullToString(row['Email'.toUpperCase()]);
            options.proposerData['DomicileAddress'.toUpperCase()] = row['InstAddress'.toUpperCase()];
            var sextual;
            if (row['ID'.toUpperCase()] != null) {
                if (row['ID'.toUpperCase()].substr(1, 1) == 2) sextual = 0;
                else sextual = 1;
            }

            options.proposerData['sextual'.toUpperCase()] = sextual;

            options.proposerData['Birthday'.toUpperCase()] = row['Brithday'.toUpperCase()];

            options.proposerData['ContTime1'.toUpperCase()] = row['ContTime1'.toUpperCase()];

            options.proposerData['ContTime2'.toUpperCase()] = row['ContTime2'.toUpperCase()];

            options.proposerData['ClassCode1'.toUpperCase()] = row['ClassCode1'.toUpperCase()];
            options.proposerData['ClassName1'.toUpperCase()] = row['ClassName1'.toUpperCase()];

            options.proposerData['ClassCode2'.toUpperCase()] = row['ClassCode2'.toUpperCase()];
            options.proposerData['ClassName2'.toUpperCase()] = row['ClassName2'.toUpperCase()];

            options.proposerData['ClassCode3'.toUpperCase()] = row['ClassCode3'.toUpperCase()];
            options.proposerData['ClassName3'.toUpperCase()] = row['ClassName3'.toUpperCase()];

            options.proposerData['CustAttribute'.toUpperCase()] = row['Dignity'.toUpperCase()];

        }
        catch (err) {
            errorHandle(formName, 'setCustomer', err);
        }
    };
    function scrToRcd(div) {
        try {
            var options = $.data(div, formName).options;
            var proposer = {};
            proposer[proposerTableName] = cloneJSON(options.orderData[proposerTableName]);
            proposer[proposerTableName].rows = [];
            var row = {};
            var keys = Object.keys(options.proposerData);
            var kLength = keys.length;
            for (var i = 0; i < kLength; i++) {
                row[keys[i]] = options.proposerData[keys[i]];
            }
            row['DeclarantName'.toUpperCase()] = convertToNull(getControlObject(div, 'tDeclarantName').jqxInput('val'));
            row['ContTel'.toUpperCase()] = convertToNull(getControlObject(div, 'tContTel').jqxInput('val'));
            row['Contmobile'.toUpperCase()] = convertToNull(getControlObject(div, 'tContmobile').jqxInput('val'));
            row['ID'.toUpperCase()] = convertToNull(getControlObject(div, 'tID1').jqxInput('val'));
            row['Dateline'.toUpperCase()] = convertToNull(getControlObject(div, 'tDateline').jqxInput('val'));

            row['PreFix'.toUpperCase()] = convertToNull(getControlObject(div, 'cbPreFix').jqxComboBox('selectIndex'), true);

            row["IDKindCode1".toUpperCase()] = convertToNull(getControlObject(div, 'csIDKindCode1').csList('codeNo'));
            row["IDKindName1".toUpperCase()] = convertToNull(getControlObject(div, 'csIDKindCode1').csList('description'));

            proposer[proposerTableName].rows.push(row);
            return proposer;
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
            $(div).css('padding', 2);
            //建立內層panel
            oArray = ["gbxAll"];
            oHightArray = ["99%"];
            //oWidthArray = ["99.5%", "33.2%", "33%", "33%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxPanel({
                    theme: options.theme,
                    height: oHightArray[i],
                    width: '100%'
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
            //建立input
            oArray = ["tDeclarantName", "tContTel", "tContmobile",
                    "tID1",
                    "tDateline"];
            oWidthArray = ["43%", "63%", "68%",
                    "68%",
                    "82%"];
            oDisabled = [false, false, false,
                    false, false,
                    false];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).jqxInput({
                    theme: options.theme,
                    height: textHeight,
                    width: oWidthArray[i],
                    disabled: oDisabled[i]
                });
                controls.push({ name: iId, type: 'jqxInput', level: level });
            }
            //建立單選元件
            oArray = ["csIDKindCode1"];
            oWidthArray = ["61%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                $('#' + iId).csList({
                    theme: options.theme,
                    height: textHeight,
                    codeNoWidth: 40,
                    width: oWidthArray[i]
                });
                controls.push({ name: iId, type: 'csList', level: level });
            }
            //建立ComboBox
            oArray = ["cbPreFix"];
            oWidthArray = ["69%"];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var iId = $(div).prop('id') + oArray[i];
                var source = [];
                switch (oArray[i]) {
                    case "cbPreFix":
                        source = [lang.lMiss, lang.lSir];
                        break;
                }
                $('#' + iId).jqxComboBox({
                    theme: options.theme,
                    height: textHeight,
                    source: source,
                    width: oWidthArray[i]
                });

                controls.push({ name: iId, type: 'jqxComboBox', level: level });
            }
            //建立按鈕
            oArray = ['btnProposer'];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var width = '50%';
                var text = lang[oArray[i]];
                o.text(text);
                o.jqxButton({
                    theme: options.theme,
                    width: width,
                    height: buttonsHeight
                });
                controls.push({ name: bId, type: 'jqxButton', level: level });
                $('#' + bId).css("padding-left", 0);
                $('#' + bId).css("padding-right", 0);
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function buttonAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //申請人
            btnProposer_Handler(div);
        }
        catch (err) {
            errorHandle(formName, 'buttonAddHandler', err);
        }
    };
    //申請人按鈕委派
    function btnProposer_Handler(div) {
        var options = $.data(div, formName).options;
        var modifyByCont = options.parameters[parameterTableName].rows[0]['ModifyByCont'.toUpperCase()];
        var controlId = getControlObject(div, 'btnProposer').prop('id');
        var control = getRowByKeyValue(options.controls, 'name', controlId);
        var level = control.level + 1;
        var divId = $(div).prop('id') + 'tt';
        if (modifyByCont == 0) {
            $('#' + controlId).jqxTooltip({
                content: '<div style="width:100%;height:240px;" id="' + divId + '"></div>',
                position: 'bottom-right',
                autoHide: false,
                trigger: "none",
                closeOnClick: false,
                opacity: 1
            });
            $('#' + divId).css({ width: $(div).width() - $('#' + controlId).width() });
            options.controls.push({ name: controlId, type: 'jqxTooltip', level: level });
            [].indexOf()
            $(document).on('click.' + divId, function (e) {
                if (getControlObject(div, 'dgdFaci').length > 0) {
                    var parents = $(e.target).parents();
                    var closeFlag = true;
                    for (var i = 0 ; i < parents.length; i++) {
                        if ($(parents[i]).prop('id') == $(div).prop('id') + 'dgdFaci') {
                            closeFlag = false;
                            break;
                        }
                    }
                    if (closeFlag) {
                        $('#' + controlId).jqxTooltip("close");
                    }
                }
            });
            options.documentEventName = 'click.' + divId;
        }
        //秀申請人資訊
        $('#' + controlId).on('click', function () {
            try {
                if ($(this).jqxButton('disabled')) { return; }
                if (modifyByCont == 1) {
                    showProposer(div, function (r) {
                        if (r.isSaved == true) {
                            setProposer(div, r.selectedRow);
                        }
                    });
                }
                else {
                    if (getControlObject(div, 'dgdFaci').length == 0) {
                        showFaci(div, level + 1, $('#' + divId));
                    }
                    $(this).jqxTooltip("open");
                }
            }
            catch (err) {
                errorHandle(formName, 'buttonAddHandler', err);
            }
        });
    };
    function showFaci(div, level, container) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'dgdFaci';
            $('<div id="' + gridId + '"></div>').appendTo(container);
            options.faciSource = {
                datatype: "json",
                datafields: [
                    { name: 'FACISNO', type: 'string' },
                    { name: 'FACINAME', type: 'string' },
                    { name: 'INITPLACENAME', type: 'string' },
                    { name: 'DECLARANTNAME', type: 'string' },
                    { name: 'IDKINDNAME1', type: 'string' },
                    { name: 'ID', type: 'string' },
                ],
                localdata: options.initData[faciProposerTableName].rows
            };
            var dataAdapter = new $.jqx.dataAdapter(options.faciSource);
            $('#' + gridId).jqxGrid(
            {
                width: '99.5%',
                height: '98%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    getGridRowNumberColumn(null, 30),
                    { text: lang.gFaci_FACISNO, datafield: 'FACISNO', width: 150 },
                    { text: lang.gFaci_FACINAME, datafield: 'FACINAME', width: 80 },
                    { text: lang.gFaci_INITPLACENAME, datafield: 'INITPLACENAME', width: 100 },
                    { text: lang.gFaci_DECLARANTNAME, datafield: 'DECLARANTNAME', width: 100 },
                    { text: lang.gFaci_IDKINDNAME1, datafield: 'IDKINDNAME1', width: 80 },
                    { text: lang.gFaci_ID, datafield: 'ID', width: 120 }
                ],
                showtoolbar: true,
                rendertoolbar: function (toolbar) {
                    toolbar.append('<div style="color:yellow;margin-top:6px;">' + lang.gFaci_Title + '</div>');
                },
                toolbarheight: 28,
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
            $('#' + gridId).on('rowselect', function (e) {
                try {
                    var args = e.args;
                    var rowIndex = args.rowindex;
                    var row = options.faciSource.localdata[rowIndex];
                    setOrderProposer(div, row);
                    getControlObject(div, 'btnProposer').jqxTooltip('close');
                }
                catch (err) {
                    errorHandle(formName, 'showFaci_rowselect', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'showFaci', err);
        }
    };
    function showProposer(div, action) {
        try {
            var options = $.data(div, formName).options;
            var width = 900;
            var height = 600;
            if (width > options.container.width()) width = options.container.width();
            if (height > options.container.height()) height = options.container.height();
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
            }
            var win = createcsWindow(options.container, options.language.lProposerProcess, winOptions);
            $('#' + win.windowId).on("close", function () {
                try {
                    var r = $.data($('#' + win.contentId)[0], 'SO114EA').options;
                    $('#' + win.contentId)['SO114EA']('destroy');
                    $('#' + win.windowId).csWindow('destroy');
                    action({ isSaved: options.closeMode == "OK", selectedRow: r.selectedRow });
                }
                catch (err) {
                    errorHandle(formName, 'showProposer_close', err);
                }
            });
            //CustId,CustName,ID,INSTADDRESS
            var fields = ['CustId', 'CustName', 'ID', 'InstAddress'];
            var types = ['decimal', 'string', 'string', 'string'];
            var proposerD = { columns: [], rows: [] };
            var inData = { Proposer: proposerD };
            for (var i = 0 ; i < fields.length; i++) {
                proposerD['columns'].push({ name: fields[i].toUpperCase(), type: types[i] });
            }
            var row = {};
            row["CustId".toUpperCase()] = options.custId;
            row["CustName".toUpperCase()] = getControlObject(div, 'tDeclarantName').jqxInput('val');
            row["ID".toUpperCase()] = getControlObject(div, 'tID1').jqxInput('val');
            row["InstAddress".toUpperCase()] = options.parameters[customerTableName].rows[0]['InstAddress'];
            proposerD.rows.push(row);
            $('#' + win.contentId)['SO114EA']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                parameters: inData,
                localization: options.localization,
                editMode: editMode.view,
                refNo: 1
            });
        }
        catch (err) {
            errorHandle(formName, 'showProposer', err);
        }
    }

    function close(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.container != null) {
                var lang = options.language;
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    if (options.editMode != editMode.view && options.isSaved != true) {
                        messageBox(lang.SureNoSaveExit, messageType.yesno, null, function (flag) {
                            if (flag == 'yes') {
                                $(options.container).jqxWindow('close');
                            }
                        });
                    }
                    else {
                        $(options.container).jqxWindow('close');
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };
})(jQuery);