(function ($) {
    var formName = 'SO1100BA4';
    var riadllName = 'CableSoft.SO.RIA.Customer.Edit.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Customer.Edit.Web.Edit';
    var buttonsHeight = 23;

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
        this.theme = '';
        this.isReadOnly = false;
    })
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        setTheme: function (jq, params) {
            return jq.each(function () {
                setTheme(this, params);
            });
        },
        resize: function (jq, params) {
            return jq.each(function () {
                formResize(this, params);
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

    //進入畫面後自動執行
    $.fn[formName] = function (options, param, param2, param3) {
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
                        options: $.extend({}, new defaults(), new SO1100BA4(), options)
                    });
                    formLoaded(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.' + formName, err);
        }
    };

    //調整主題以及其他
    function setTheme(div, params) {
        var controls = $.data(div, formName).options.controls;
        for (i = 0; i < controls.length; i++) {
            var o = $('#' + $(div).prop('id') + controls[i].name);
            if (o.length > 0) {
                $(o[0])[controls[i].type]({ theme: params });
            }
        }
    };
    function formResize(div, params) {
        try {

        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close');
    };
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            destroyControls(controls);
            var options = $.data(div, formName).options;
            deleteJSONObject(options);
            offElementEvents(div);
            $.data(div, formName, null);
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };

    //初始化
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            //設定預設參數
            options.paraLoginInfo = getParaLoginInfo(div, formName);

            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            formResize(div);
                            //載入detial控制項事件
                            detialAddHandler(div);
                            //載入button事件
                            buttonAddHandler(div);
                            $(div).trigger('loaded', [this, options]);
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
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            //從Language專案帶入畫面文字
            changeLanguage(div, formName);
            //載入所有jqx控制項
            renderControl(div);
            //載入所有jqxGrid控制項
            renderGridControl(div);
            //載入可選客戶清單
            refreshGrid(div);

            action(true);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        };
    };
    //載入所有jqx控制項
    function renderControl(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var lang = options.language;
            var level = 0;
            var oLength = 0;
            var oArray = [];
            var oWidthArray = [];
            //建立jqxButton
            level += 1;
            oArray = ['btnSelect', 'btnQuit'];
            oWidthArray = [80, 80];
            oLength = oArray.length;
            for (var i = 0 ; i < oLength; i++) {
                var bId = $(div).prop('id') + oArray[i];
                var o = $('#' + bId);
                var img = {};
                var text = lang[oArray[i]];
                switch (oArray[i]) {
                    case "btnSelect":
                        img = imageScr.ok;
                        break;
                    case "btnQuit":
                        img = imageScr.exit;
                        break;
                    default:
                        img = null;
                        break;
                };
                o.text(text);
                o.jqxButton($.extend({}, img, imagePosition, {
                    theme: options.theme,
                    width: oWidthArray[i],
                    height: buttonsHeight
                }));
                $('#' + bId).find('img').css('top', (24 - $('#' + bId).find("img").height()) / 2 - 1);
                $('#' + bId).find('span').css({ top: 4 });
                controls.push({ name: bId, type: 'jqxButton', level: level });
            };
            getControlObject(div, 'btnSelect').jqxButton({ disabled: options.isReadOnly });
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    //載入所有jqxGrid控制項
    function renderGridControl(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var level = 0;
            //建立jqxGrid
            level += 1;

            options.grdInstAddress = {
                datatype: "json",
                datafields: [
                    { name: 'CUSTID', type: 'number' },
                    { name: 'CUSTNAME', type: 'string' },
                    { name: 'CUSTSTATUSNAME', type: 'string' },
                    { name: 'WIPNAME1', type: 'string' },
                    { name: 'WIPNAME3', type: 'string' },
                    { name: 'INITTIME', type: 'string' },
                    { name: 'INSTADDRESS', type: 'string' },
                    { name: 'ID', type: 'string' },
                    { name: 'INSTADDRNO', type: 'number' },
                    { name: 'ADDRNO', type: 'number' }
                ]
            };
            var dataAdapterInv = new $.jqx.dataAdapter(options.grdInstAddress);
            getControlObject(div, 'grdInstAddress').jqxGrid({
                theme: options.theme,
                localization: options.localization,
                source: dataAdapterInv,
                width: '99.5%',
                height: '98%',
                sortable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    getGridRowNumberColumn(null, 30),
                    { text: lang.colCUSTID, datafield: 'CUSTID', align: 'right', cellsalign: 'right', width: 80 },
                    { text: lang.colCUSTNAME, datafield: 'CUSTNAME', align: 'left', cellsalign: 'left', width: 100 },
                    { text: lang.colCUSTSTATUSNAME, datafield: 'CUSTSTATUSNAME', align: 'left', cellsalign: 'left', width: 70 },
                    { text: lang.colWIPNAME1, datafield: 'WIPNAME1', align: 'left', cellsalign: 'left', width: 80 },
                    { text: lang.colWIPNAME3, datafield: 'WIPNAME3', align: 'left', cellsalign: 'left', width: 80 },
                    { text: lang.colINITTIME, datafield: 'INITTIME', align: 'left', cellsalign: 'left', width: 140 },
                    { text: lang.colINSTADDRESS, datafield: 'INSTADDRESS', align: 'left', cellsalign: 'left', width: 200 }
                ]
            })
            options.controls.push({ name: $(div).prop('id') + 'grdInstAddress', type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderGridControl', err);
        }
    };

    //載入可選客戶清單
    function refreshGrid(div) {
        try {
            var options = $.data(div, formName).options;
            options.grdInstAddress.localdata = options.parameters.SAMEADDRESS;
            getControlObject(div, 'grdInstAddress').jqxGrid('updatebounddata');
            getControlObject(div, 'grdInstAddress').jqxGrid('selectrow', 0);
            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };

    //載入detial控制項事件
    function detialAddHandler(div) {
        var options = $.data(div, formName).options;
        var lang = options.language;
        //DoubleClick某筆Row時
        getControlObject(div, 'grdInstAddress').on('rowdoubleclick', function (event) {
            options.selectedRow = getControlObject(div, 'grdInstAddress').jqxGrid('getrowdata', args.rowindex);
            //關閉CSWindow
            options.isSaved = true;
            close(div);
        });
        //當csWindow按[X]時
        if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
            $(options.container).on('winClosing', function (e) {
                options.isSaved = false;
                close(div)
            });
        }
    };
    //載入button事件
    function buttonAddHandler(div) {
        var options = $.data(div, formName).options;
        //選定
        getControlObject(div, 'btnSelect').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            //取得選擇的產品編號
            var rowindex = getControlObject(div, 'grdInstAddress').jqxGrid('getselectedrowindex');
            options.selectedRow = getControlObject(div, 'grdInstAddress').jqxGrid('getrowdata', rowindex);
            //關閉CSWindow
            options.isSaved = true;
            close(div);
        });
        //離開
        getControlObject(div, 'btnQuit').on('click', function () {
            if ($(this).jqxButton('disabled')) { return; }
            //關閉CSWindow
            options.isSaved = false;
            close(div);
        });
    };
    //關閉CSWindow
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).jqxWindow('close');
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };
})(jQuery);