
(function ($) {
    var formName = 'SO1114A';
    var riadllName = 'CableSoft.SO.RIA.Wip.ResvDetail.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.ResvDetail.Web.ResvDetail';
    var buttonsHeight = 26;
    //$.fn.SO1114A = function (options, param) {

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
        this.workerType = '',
        this.serviceType = '',
        this.servCode = '',
        this.theme = $.jqx.theme,
        this.localization = null;;
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
        }
    };

    $.fn.SO1114A = function (method, param) {
        try {
            if (typeof method == 'string') {
                //if ($.fn.SO1114A.methods[options]) {
                //    return $.fn.SO1114A.methods[options](this, param);
                //}
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
                            options: $.extend({}, new defaults(),    new SO1114A(), method)
                        });
                        formLoaded(this);
                    }
                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1114A_each', err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1114A', err);
        }
    };

    //$.fn.SO1114A.defaults = {
    //    language: {},
    //    returnValue: {},
    //    initData: {},
    //    detailData:{},
    //    loginInfo: {},
    //    editMode: 0,
    //    refNo: 0,
    //    parameters: {},
    //    controls: [],
    //    isSaved: false,
    //    theme: ''
    //};
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
        $(options['container']).csWindow('close');
    };
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        var arrays = ['lServCode', 'rDateType1', 'rDateType0', 'lWipType',
                      'ChkbInst', 'ChkbMaintain', 'ChkbPR', 'ChkbReInt',
                      'QueryButton', 'lPointCount', 'OKButton', 'CancelButton'];
        $.each(arrays, function (idx, val) {
            $('#' + $(div).prop('id') + val).text(lang[val]);
        });
        //alert(JSON.stringify($.data(div, formName).options.language));
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            options.loginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            $.ajax({
                url: 'SO1000\\' + formName + '.html',
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        init(div, function () {
                            //if (options['loaded']) {
                            //    options['loaded']();
                            //}
                            //alert(JSON.stringify($(div).SO1114A('options')));
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

    function init(div, action) {
        changeLanguage(div);
        renderControl(div);
        //$(options.container).on('resize', function () {
        //    formResize(div);
        //});
        var options = $.data(div, formName).options;
        
        if (options.resvTime != null) {
            getControlObject(div, 'dtResvTime').csDateTime('setDate', Date.parse(options.resvTime));
        }
        if (options.workerType != null) {
            var CheckArray = options.workerType.split(",");
            for (var i = 0 ; i < CheckArray.length; i++) {
                if (CheckArray[i] == '1') {
                    getControlObject(div, 'ChkbInst').jqxCheckBox('val', 1);
                }
                if (CheckArray[i] == '2') {
                    getControlObject(div, 'ChkbMaintain').jqxCheckBox('val', 1);
                }
                if (CheckArray[i] == '3') {
                    getControlObject(div, 'ChkbPR').jqxCheckBox('val', 1);
                }
                if (CheckArray[i] == '4') {
                    getControlObject(div, 'ChkbReInt').jqxCheckBox('val', 1);
                }
            }
        }

        getServCode(div, function (r) {
            initServCode(div);
            if (options.servCode != null) {
                getControlObject(div, 'csServCode').csList('codeNo', options.servCode);
            }
            action();
        });
    };

    function getServCode(div, action) {
        try {
            var options = $.data(div, formName).options;
            var params = getParameters(riadllName,
                riaClassName,
                'QueryServCode',
                JSON.stringify(options.loginInfo));
            getServerData(params, {
                success: function (data) {
                    if (data.ErrorCode == 0) {
                        options.initData = 0;
                        options.initData = null;
                        delete options.initData;
                        options.initData = JSON.parse(data.ResultXML);
                        action();
                    }
                    else {
                        messageBox(data.ErrorMessage, messageType.critical);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getData', err);
        }
    }

    function getQueryData(div, action) {
        try {
            var ServiceType = $.data(div, formName).options.serviceType;
            var blnInst = getControlObject(div, 'ChkbInst').jqxCheckBox('val');
            var blnMaintain = getControlObject(div, 'ChkbMaintain').jqxCheckBox('val');
            var blnPR = getControlObject(div, 'ChkbPR').jqxCheckBox('val');
            var blnReInt = getControlObject(div, 'ChkbReInt').jqxCheckBox('val');
            var intDateType = 0
            if (getControlObject(div, 'rDateType1').val(1)){intDateType=1}
            var ResvTime = getControlObject(div, 'dtResvTime').csDateTime('getDate');
            var strServCode = getControlObject(div, 'csServCode').csList('codeNo')
            var strResvtime = getControlObject(div, 'dtResvTime').csDateTime('getDate');
            var options = $.data(div, formName).options;
            var parameters = $.extend({}, options.loginInfo, {
                ServiceType: { type: 'string', value: ServiceType },
                ServCode: { type: 'string', value: strServCode },
                blnbInst: { type: 'boolean', value: blnInst },
                blnbMaintain: { type: 'boolean', value: blnMaintain },
                blnbPR: { type: 'boolean', value: blnPR },
                blnbReInt: { type: 'boolean', value: blnReInt },
                intDateType: { type: 'integer', value: intDateType },
                qdate: { type: 'Date', value: ResvTime }
            });
            //QueryResvDetail(XLoginInfo, strServiceType, strServCode, blnbInst, blnbMaintain, blnbPR, blnbReInt, intDateType, qdate)
            var params = getParameters(riadllName,
                                        riaClassName,
                                        'QueryResvDetail',
                                        JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    if (data.ErrorCode == 0) {
                        options.initData = 0;
                        options.initData = null;
                        delete options.initData;
                        options.initData = JSON.parse(data.ResultXML);
                        action();
                    }
                    else {
                        messageBox(data.ErrorMessage, messageType.critical);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getData', err);
        }
    }

    function initServCode(div) {
        try {
            var options = $.data(div, formName).options;
            getControlObject(div, 'csServCode').csList('source', options.initData['ServCode'].rows);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'initServCode', err);
        }
    }
    
    function renderControl(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var lang = options.language;
            var height = $(div).innerHeight();
            $('#' + $(div).prop('id') + 'detaildata').jqxPanel({
                width: '100%',
                //height: (height - buttonsHeight) / 100 * 50 - 10,
                height: 120,
                theme: options.theme
            });
            controls.push({ name: 'detaildata', type: 'jqxPanel', level: 0 });

            $('#' + $(div).prop('id') + 'ChooseSet1').jqxPanel({
                width: '30%', height: 110,
                theme: options.theme
            });
            controls.push({ name: 'ChooseSet1', type: 'jqxPanel', level: 0 });

            $('#' + $(div).prop('id') + 'ChooseSet2').jqxPanel({
                width: '20%', height: 110,
                theme: options.theme
            });
            controls.push({ name: 'ChooseSet2', type: 'jqxPanel', level: 0 });

            $('#' + $(div).prop('id') + 'ChooseSet3').jqxPanel({
                width: '28%', height: 110,
                theme: options.theme
            });
            controls.push({ name: 'ChooseSet3', type: 'jqxPanel', level: 0 });

            $('#' + $(div).prop('id') + 'ChooseSet4').jqxPanel({
                width: '12%', height: 110,
                theme: options.theme
            });
            controls.push({ name: 'ChooseSet4', type: 'jqxPanel', level: 0 });

            //建立Panel
            oArray = ["detaildata","ChooseSet1", "ChooseSet2", "ChooseSet3", "ChooseSet4"];
            var oHightArray = ["120", "110", "110", "110", "110"];
            var oWidthArray = ["99.5%", "30%", "20%", "27%", "12%"];
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
                controls.push({ name: iId, type: 'jqxPanel', level: 0 });
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        $('#' + iId + scrollBars[j]).remove();
                    }
                }
            }


            $('#' + $(div).prop('id') + 'csServCode').csList({
                height: 23, codeNoWidth: 40, width: 160,
                maxLength: 5,
                theme: options.theme
            });
            controls.push({ name: 'csServCode', type: 'csList', level: 1 });

            $('#' + $(div).prop('id') + 'dtResvTime').csDateTime({
                height: 23,  width: 90,
                disabled: false, value: null,
                showCalendarButton: false,
                formatString: "yyyy/MM/dd",
                theme: options.theme
            });
            controls.push({ name: 'dtResvTime', type: 'csDateTime', level: 1 });

            $('#' + $(div).prop('id') + 'txtWorkUnitSum').jqxInput({
                height: 22, width: 100,
                disabled:false,
                theme: options.theme
            });
            controls.push({ name: 'txtWorkUnitSum', type: 'jqxInput', level: 1 });

            //$('#' + $(div).prop('id') + 'rDateType1').jquery({
            //    height: 25, width: 200,
            //    maxLength: 20,
            //    theme: options.theme
            //});
            //controls.push({ name: 'rDateType1', type: 'radio', level: 1 });

            //$('#' + $(div).prop('id') + 'rDateType0').jqxInput({
            //    height: 25, width: 200,
            //    maxLength: 20,
            //    theme: options.theme
            //});
            //controls.push({ name: 'rDateType0', type: 'radio', level: 1 });

            $('#' + $(div).prop('id') + 'ChkbInst').jqxCheckBox({
                width: 60,
                height: 25,
                theme: options.theme
            });
            controls.push({ name: 'ChkbInst', type: 'jqxCheckBox', level: 1 });

            $('#' + $(div).prop('id') + 'ChkbMaintain').jqxCheckBox({
                width: 60,
                height: 25,
                theme: options.theme
            });
            controls.push({ name: 'ChkbMaintain', type: 'jqxCheckBox', level: 1 });

            $('#' + $(div).prop('id') + 'ChkbPR').jqxCheckBox({
                width: 60,
                height: 25,
                theme: options.theme
            });
            controls.push({ name: 'ChkbPR', type: 'jqxCheckBox', level: 1 });

            $('#' + $(div).prop('id') + 'ChkbReInt').jqxCheckBox({
                width: 60,
                height: 25,
                theme: options.theme
            });
            controls.push({ name: 'ChkbReInt', type: 'jqxCheckBox', level: 1 });

            var btnarrays = ['QueryButton', 'OKButton', 'CancelButton'];
            $.each(btnarrays, function (idx, val) {
                var o = $('#' + $(div).prop('id') + val);
                var img = {};
                switch (val) {
                    case "OKButton":
                        img = imageScr.save;
                        break;
                    case "QueryButton":
                        img = imageScr.query;
                        break;
                    case "CancelButton":
                        img = imageScr.exit;
                        break;
                }
                o.text(lang[val]);
                o.jqxButton($.extend({}, img, imagePosition, {
                    theme: options.theme,
                    width: 100,
                    height: 25
                }));
                controls.push({ name: val, type: 'jqxButton', level: 1 });
            });
            addControlHandler(div);
            renderGrid(div);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };

    function addControlHandler(div) {
        try {
            var options = $.data(div, formName).options;
            //'QueryButton', 'OKButton', 'CancelButton'
            $('#' + $(div).prop('id') + 'QueryButton').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                QueryData(div);
                return;
            });
            $('#' + $(div).prop('id') + 'OKButton').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                isOK = true;
                $(div).SO1114A('close');
                return;
            });
            $('#' + $(div).prop('id') + 'CancelButton').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; }
                isOK = false;
                $(div).SO1114A('close');
                return;
            });
        }
        catch (err) {
            errorHandle(formName, 'addControlHandler', err);
        }
    };
    //function changeMode(div, e) {
    //    try {
    //        var canUse = false;
    //        var codeDiabled = true;
    //        var options = $.data(div, formName).options;
    //        var editText = '';
    //        options.editMode = e;
    //        switch (e) {
    //            case editMode.view:
    //                canUse = false;
    //                editText = options.language.view;
    //                //rcdToScr(div);
    //                break;
    //            case editMode.edit:
    //                editText = options.language.btnEdit;
    //                canUse = true;
    //                //rcdToScr(div);
    //                break;
    //            case editMode.append:
    //                editText = options.language.btnAppend;
    //                codeDiabled = false;
    //                canUse = true;
    //                break;
    //        }
    //        $('#' + $(div).prop('id') + 'lEditMode').jqxInput('val', editText);
    //        //'btnSave', 'btnAppend', 'btnEdit', 'btnCopyToOtherDB', 'btnExit'
    //        $('#' + $(div).prop('id') + 'codeno').jqxInput({ disabled: codeDiabled });
    //        //getControl(div, $(div).prop('id') + 'codeno').disabled = codeDiabled;
    //        $('#' + $(div).prop('id') + 'btnSave').jqxButton({ disabled: (canUse == false) });
    //        $('#' + $(div).prop('id') + 'btnAppend').jqxButton({ disabled: (canUse == true) });
    //        $('#' + $(div).prop('id') + 'btnEdit').jqxButton({ disabled: (canUse == true) });
    //        $('#' + $(div).prop('id') + 'btnCopyToOtherDB').jqxButton({ disabled: (canUse == true) });
    //    }
    //    catch (err) {
    //        errorHandle(formName, 'changeMode', err);
    //    }
    //};

    function QueryData(div) {
        try {
            if (isDataOk(div) == false) {
                return false;
            }
            getQueryData(div, function (r) {
                refreshGrid(div);
                var data = $.data(div, formName).options.initData.Detail;
                var dbSum = 0;
                for (var i = 0; i<data.rows.length; i++) {
                    dbSum += data.rows[i]['WORKUNIT'];
                }
                getControlObject(div, 'txtWorkUnitSum').jqxInput('val', dbSum.toFixed(1))
                //action();
            });
        } catch (err) {
            errorHandle(formName, 'QueryData', err);
        }
    }

    function getControl(div, controlId) {
        var controls = $.data(div, formName).options.controls;
        for (var i = 0; i < controls.length; i++) {
            if (controls[i].name == controlId) {
                return controls[i];
            }
        }
    }

    function refreshGrid(div) {
        try {
            var rowindex = $('#' + $(div).prop('id') + 'grdResvDetail').jqxGrid('getselectedrowindex');
            var options = $.data(div, formName).options;
            var data = options.initData.Detail;
            options.gridsource.localdata = data;
            $('#' + $(div).prop('id') + 'grdResvDetail').jqxGrid('updatebounddata');
            if (data.rows.length > 0) {
                if (rowindex >= 0) {
                    $('#' + $(div).prop('id') + 'grdResvDetail').jqxGrid('selectrow', rowindex);
                }
                else {
                    $('#' + $(div).prop('id') + 'grdResvDetail').jqxGrid('selectrow', 0);
                }
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };

    function renderGrid(div) {
        try {
            var options = $.data(div, formName).options;
            //var data = options.initData.DYNGRID_CD022;
            var lang = options.language;
            var height = ($(div).innerHeight() - buttonsHeight) / 100 * 70 - 10;
            options.gridsource = {
                datatype: "json",
                datafields: [
                   { name: 'TIMEPERIOD', type: 'string' },
                   { name: 'RESVTIME', type: 'date' },
                   { name: 'SNO', type: 'string' },
                   { name: 'WORKNAME', type: 'string' },
                   { name: 'MNAME', type: 'string' },
                   { name: 'WORKUNIT', type: 'float' },
                   { name: 'CUSTID', type: 'string' },
                   { name: 'CUSTNAME', type: 'string' },
                   { name: 'TEL1', type: 'string' },
                   { name: 'ADDRESS', type: 'string' },
                ]
            };
            var colorRed = (function (row, field, value, defaulthtml, columnproperties) {
                var val = $(defaulthtml);
                val.css('color', 'red');
                return val[0].outerHTML;
            });
            var TimeSplit = (function (row, columnfield, value, defaulthtml, columnproperties) {
                var retVal = ('000' + value).slice(-4);
                return retVal.substr(0,2)+':'+retVal.slice(-2);
                //return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #FF0000;">' + retVal.substr(0, 2) + ':' + retVal.slice(-2) + '</span>';
            });
            
            var dataAdapter = new $.jqx.dataAdapter(options.gridsource);
            $('#' + $(div).prop('id') + 'grdResvDetail').jqxGrid(
            {
                width: '100%',
                height: height,
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columns: [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 50,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                        }
                    },
                  { text: lang.TIMEPERIOD, datafield: 'TIMEPERIOD', width: 60, cellsrenderer: TimeSplit },
                  { text: lang.RESVTIME, datafield: 'RESVTIME', width: 90, cellsformat :"yyyy/MM/dd"},
                  { text: lang.SNO, datafield: 'SNO', width: 130 },
                  { text: lang.WORKNAME, datafield: 'WORKNAME', width: 120 },
                  { text: lang.MNAME, datafield: 'MNAME', width: 60 },
                  { text: lang.WORKUNIT, datafield: 'WORKUNIT', width: 60, cellsformat:"d2"},
                  { text: lang.CUSTID, datafield: 'CUSTID', width: 60 },
                  { text: lang.CUSTNAME, datafield: 'CUSTNAME', width: 100 },
                  { text: lang.TEL1, datafield: 'TEL1', width: 100 },
                  { text: lang.ADDRESS, datafield: 'ADDRESS', width: 250 }
                ],
                theme: options.theme,
                localization: options.localization
            });

            options.controls.push({ name: 'grdResvDetail', type: 'jqxGrid', level: 1 });
            //refreshGrid(div);
        }
        catch (err) {
            errorHandle(formName, 'renderGrid', err);
        }
    }


    //必要欄位判斷
    function isDataOk(div) {
        try {
            
            var lang = $.data(div, formName).options.language;
            //派工類別檢核
            var blnInst = getControlObject(div, 'ChkbInst').jqxCheckBox('val');
            var blnMaintain = getControlObject(div, 'ChkbMaintain').jqxCheckBox('val');
            var blnPR = getControlObject(div, 'ChkbPR').jqxCheckBox('val');
            var blnReInt = getControlObject(div, 'ChkbReInt').jqxCheckBox('val');
            if (blnInst == false & blnMaintain == false & blnPR == false & blnReInt == false) {
                messageBox(lang.MustWipType);
                return false;
            }

            //檢核服務區
            if (checkUIMustBe(getControlObject(div, 'csServCode').csList('codeNo'), lang.ServCode, function () {
                getControlObject(div, 'csServCode').csList('focus');
            }) == false) {
                return false;
            }
            //檢核 預約時間/受理時間
            var strResvTime = "預約日期";
            if (checkUIMustBe(getControlObject(div, 'dtResvTime').csDateTime('val'), strResvTime, function () {
                getControlObject(div, 'dtResvTime').csDateTime('focus');
            }) == false) {
                return false;
            }

            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
            return false;
        }
    };

    function setValue(div, controlId, row, field, valueType) {
        var control = getControl(div, controlId);
        if (control.disabled == null || control.disabled == false) {
            row[field] = $('#' + controlId)[valueType]();
        }
    }

    function formResize(div, params) {
        try {
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            var controls = options.controls;
            for (var i = 0; i < controls.length; i++) {
                if (controls[i].type.indexOf('jqxSplitter') >= 0) {
                    var o = $('#' + controls[i].name);
                    $(o)[controls[i].type]({ 'height': $(div).height() - 2 });
                    //alert(JSON.stringify($(o)[controls[i].type]("panels")));
                    //$(o)[controls[i].type]('expand');
                    var panels = getPanelsHeight(div);
                    resetGridsHeight(div, panels);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
})(jQuery);