(function ($) {
    var formName = 'SO1118A2';
    var riadllName = 'CableSoft.SO.RIA.Wip.CallOk.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.CallOk.Web.CallOk';
    var faciId = "Faci_";
    var gridHeight = 25;
    var textHeight = 22;
    var buttonsHeight = 28;
    var canChooseWipTableName = "CanChooseWip";
    var allFacilityWipTableName = "AllFacility";
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
                        options: $.extend({}, new defaults(), new SO1118A2(), options)
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
        isDataOk: function (jq) {
            return isDataOk(jq[0]);
        },
        refreshForm: function (jq, params) {
            return refreshForm(jq[0], params);;
        },
        getData: function (jq) {
            return getData(jq[0]);
        },
        getUIData: function (jq) {
            return getUIData(jq[0]);
        },
        clear: function (jq) {
            return jq.each(function () {
                clear(this);
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
        this.theme = $.jqx.theme;
        this.localization = null;
        this.container = null;
        this.callOKMustBe = true;
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
            //var iId = $(div).prop('id') + "dtCallOkTime";
            getControlObject(div, 'dtCallOkTime').csDateTime({ width: 160 });
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
                            $(div).triggerHandler('loaded');
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
            //                $(div).triggerHandler('loaded');
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
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div, formName);
            renderControl(div);
            defaultValue(div);
            action(true);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function clear(div) {
        try {
            var options = $.data(div, formName).options;
            //將產生出來的元件刪除
            for (var i = 0; i < options.controls.length; i++) {
                var control = options.controls[i];
                if (control.name.indexOf(faciId) >= 0) {
                    $("#" + control.name).off();
                    $("#" + control.name)[control.type]("destroy");
                    delete options.controls[i];
                }
            }
            options.controls = options.controls.filter(function (e) { return e });
            getControlObject(div, "gbxFaci").children().remove();
            getControlObject(div, "gbxFaci").css("display", "none");
        }
        catch (err) {
            errorHandle(formName, 'clear', err);
        }
    };
    function textAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            for (var i = 0; i < options.controls.length; i++) {
                var control = options.controls[i];

                if (control.name.indexOf(faciId) >= 0) {
                    if (control.type == "jqxInput") {
                        $("#" + control.name).on("keydown", function (e) {
                            if (e.which == 13 || e.keyCode == 13) {
                                var arr = $(this).prop('id').split("_");
                                var i = arr[arr.length - 1];
                                var row = $(this).data().row;
                                var value = $(this).jqxInput("val");
                                faciProcess(div, value, this);
                            }
                        });
                        $("#" + control.name).on("focusin", function (e) {
                            $(this).select();
                        });
                    }
                    else if (control.type == "jqxCheckBox") {
                        $("#" + control.name).on("change", function (e) {
                            var row = $(this).data().row;
                            var inputs = getControlObject(div, "gbxFaci").find("[data-sno=" + row["SNO"] + "]");
                            $.each(inputs, function (i, input) {
                                var data = $(input).data();
                                if ($(input).prop("tagName") == "LABEL") {
                                    if (e.args.checked) {
                                        $(input).css("color", "red")
                                    } else { $(input).css("color", "black") };
                                }
                                else {
                                    if (data.type == "jqxInput") {
                                        $(input)[data.type]({ disabled: e.args.checked != true });
                                        if (!e.args.checked) { $(input)[data.type]("val",""); }
                                        if (i == 0) {
                                            $(input).jqxInput("focus");
                                        }
                                    }
                                    else if (data.type == "csList") {
                                        $(input)[data.type]("disabled", e.args.checked != true);
                                        if (!e.args.checked) {
                                            $(input)[data.type]('codeNo', '');
                                            //$("#" + $(control).prop('id') + "md").csList('codeNo', '');
                                            for (i = 0; i < options.controls.length; i++) {
                                                var control = options.controls[i];
                                                if (control.name.indexOf(faciId) >= 0) {
                                                    if (control.name.right(2)=="md") {
//                                                        $("#" + $(control).prop('id') + "md").csList('codeNo', '');
                                                        $('#' + control.name)[control.type]("codeNo","")
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'textAddHandler', err);
        }
    }
    function listAddHandler(div) {
        try {
            var options = $.data(div, formName).options;
            for (var i = 0; i < options.controls.length; i++) {
                var control = options.controls[i];
                if (control.name.indexOf(faciId) >= 0 &&
                    control.name.right(2) == "pl" &&
                    control.type == "csList") {
                    $("#" + control.name).off();
                    $("#" + control.name).on("selectedIndexChanged", function (e) {
                        try {
                            var value = $(this).csList('codeNo');
                            var row = $(this).data().row;
                            if (row["FACIREFNO"] == 3) {
                                var iccControl = getControlByFaciRefNo(div, row["SNO"], 4, "pl");
                                if (iccControl != null) {
                                    $('#' + iccControl.name).csList('codeNo', value);
                                }
                                var dvrControl = getControlByFaciRefNo(div, row["SNO"], 9, "pl", row["SEQNO"]);
                                if (dvrControl != null) {
                                    $('#' + dvrControl.name).csList('codeNo', value);
                                }
                            }
                        }
                        catch (err) {
                            errorHandle(formName, $(this).prop('id') + '_selectedIndexChanged', err);
                        }
                    });
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'listAddHandler', err);
        }
    }
    function faciProcess(div, value, control) {
        try {
            var options = $.data(div, formName).options;
            var data = $(control).data();
            var row = data.row;
            var STBNo;
            var STBRow;
            if (row["FACIREFNO"] == 4) {
                var STBControl = getControlByFaciRefNo(div, row["SNO"], 3);
                if (STBControl != null) {
                    STBNo = $("#" + STBControl.name).jqxInput('val');
                    STBRow = $("#" + STBControl.name).data().row;
                }
            }
            chkSTB_SmartCard(div, value, STBNo, row["FACIREFNO"], row, STBRow, function (r) {
                if (r) {
                    if (r[3] != null) {
                        var d = r[3];
                        var returnRow = d[Object.keys(d)[0]].rows[0];
                        if (returnRow != null) {
                            var inputs = getControlObject(div, "gbxFaci").find("[data-sno=" + row["SNO"] + "]");
                            var focusNextInput = function (input, idx) {
                                var nextInputId = $(input).prop('id').replace("_" + idx, "") + "_" + (idx + 1);
                                if ($("#" + nextInputId).length > 0) {
                                    $("#" + nextInputId).jqxInput('focus');
                                    $("#" + nextInputId).select();
                                }
                            }
                            switch (row["FACIREFNO"]) {
                                case 2: case 3: case 4: case 5: case 6: case 9:
                                    if (returnRow["SMARTCARDNO"] != null) {
                                        $.each(inputs, function (i, input) {
                                            var dd = $(input).data();
                                            if (dd.row != null && dd.row["FACIREFNO"] == 4) {
                                                $(input).jqxInput("val", returnRow["SMARTCARDNO"]);
                                                if (returnRow["MODELCODE"] != null) {
                                                    $("#" + $(input).prop('id') + "md").csList('codeNo', returnRow["MODELCODE"]);
                                                }
                                                //focus 到下一個元件
                                                focusNextInput(input, dd.idx);
                                            }
                                        });
                                    }
                                    else {
                                        //focus 到下一個元件
                                        focusNextInput(control, data.idx);
                                    }
                                    if (returnRow["MODELCODE"] != null) {
                                        $("#" + $(control).prop('id') + "md").csList('codeNo', '');
                                        $("#" + $(control).prop('id') + "md").csList('codeNo', returnRow["MODELCODE"]);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
                if (isEmpty(r[2]) != true) {
                    messageBox(r[2], null, null, function (r) {
                        $("#" + $(control).prop('id')).jqxInput('focus');
                        $("#" + $(control).prop('id')).select();
                    });
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'faciProcess', err);
        }
    }
    function refreshForm(div, chooseData) {
        try {
            var options = $.data(div, formName).options;
            clear(div);
            var chooseRows = chooseData[canChooseWipTableName].rows;
            var faciRows = options.canChooseWipData[allFacilityWipTableName].rows;
            var faciCount = 0;
            var heightCount = 0;
            var defDIVHeight = 28;
            if (chooseRows.length > 0 && faciRows.length > 0) {
                getControlObject(div, "gbxFaci").prop("style").removeProperty("display");
                var SNo;
                var parentO = getControlObject(div, "gbxFaci");
                var d;
                var sameSNoCount = 0;
                var idx = 0;
                for (var i = 0 ; i < faciRows.length; i++) {
                    var row = faciRows[i];
                    var fRow = getRowByKeyValue(chooseRows, "SNO", row["SNO"]);
                    if (fRow == null) continue;
                    faciCount += 1;
                    var SNoCWidth = 30;
                    var SNoVWidth = 140;
                    var checkWidth = 0;
                    if (SNo != row["SNO"] || sameSNoCount >= 1) {
                        //先新增div
                        d = $('<div class="SO1118A2_DIV" style="width:99%;"></div>').appendTo(parentO);
                        //再新增Label
                        var SNoCaption = "";
                        var SNoValue = "";
                        if (SNo != row["SNO"]) {
                            SNoCaption = options.language.SNo;
                            SNoValue = row["SNO"];
                        }
                        $('<label class="SO1118A2_lbl" style="color:blue;width:' + SNoCWidth + 'px;">' + SNoCaption + '</label>').appendTo(d);
                        $('<label class="SO1118A2_lbl" style="color:blue;margin-left:2px;width:' + SNoVWidth + 'px;">' + SNoValue + '</label>').appendTo(d);
                        if (row["TYPE"] == 1) {
                            checkWidth = 90;
                            if (SNo != row["SNO"]) {
                                var chId = $(div).prop("id") + faciId + "Ch" + idx
                                $('<div id="' + chId + '" class="SO1118A2_dt" style="color:blue;margin-left:2px;margin-top:1px;">' + options.language.maintainChange + '</div>').appendTo(d);
                                $('#' + chId).jqxCheckBox({
                                    theme: options.theme,
                                    height: textHeight,
                                    width: checkWidth
                                });
                                $("#" + chId).data({ SNO: row["SNO"], row: row });
                                options.controls.push({ name: chId, type: 'jqxCheckBox', level: options.level, SNO: row["SNO"] });
                            }
                            else {
                                $('<div class="SO1118A2_dt" style="width:' + checkWidth + 'px;margin-left:2px;margin-top:1px;"></div>').appendTo(d);
                            }
                        }
                        sameSNoCount = 1;
                        heightCount += 1;
                    }
                    else {
                        sameSNoCount += 1;
                    }
                    var FaciSNoWidth = addFaciSNo(div, faciId, row, d, idx);
                    var lastWidth = $(div).width() - SNoCWidth - SNoVWidth - checkWidth - FaciSNoWidth - 16;
                    addModelCode(div, faciId, row, d, idx, lastWidth);
                    addInitPlaceCode(div, faciId, row, d, idx, lastWidth);
                    idx += 1;
                    SNo = row["SNO"];
                }
                if (faciCount > 0) {
                    parentO.children().css({ height: defDIVHeight - 2 });
                    parentO.css({ height: defDIVHeight * heightCount });
                    textAddHandler(div);
                    listAddHandler(div);
                    getControlObject(div, faciId + "0").jqxInput('focus');
                }
            }
            return defDIVHeight * heightCount;
        }
        catch (err) {
            errorHandle(formName, 'refreshForm', err);
        }
    }
    function addFaciSNo(div, faciId, row, d, i) {
        try {
            var options = $.data(div, formName).options;
            var lWidth = 90;
            var tWidth = 120;
            var l = $('<label class="SO1118A2_lbl" style="text-align:right;">' + row["FACINAME"] + ':</label>').appendTo(d);
            l.css({ width: lWidth });
            switch (row["FACIREFNO"]) {
                case 1: case 2: case 3: case 4: case 5: case 6: case 9:
                    if (row["TYPE"] == 0) { l.addClass("SO1118A2_red"); }
                    l.attr("data-sno", row["SNO"]);
                    break;
            }
            var childId = $(div).prop("id") + faciId + i;
            $('<input id="' + childId + '" class="SO1118A2_dt"></input>').appendTo(d);
            var maxLength = 20;
            if (row["SNOLENGTH"] != null && row["SNOLENGTH"] != 0) {
                maxLength = row["SNOLENGTH"];
            }
            $("#" + childId).jqxInput({
                theme: options.theme,
                height: textHeight,
                width: tWidth,
                disabled: row["TYPE"] == 1
            });
            $("#" + childId).attr("data-sno", row["SNO"]);
            $("#" + childId).data({ row: row, idx: i, type: 'jqxInput' });
            $('#' + childId).prop("maxLength", maxLength);
            options.controls.push({
                name: childId, type: 'jqxInput', level: options.level,
                caption: row["FACINAME"],
                maxLength: maxLength,
                isFaci: true
            });
            $("#" + childId).jqxInput("val", convertNullToString(row["FACISNO"]));
            return lWidth + tWidth;
        }
        catch (err) {
            errorHandle(formName, 'addFaciSNo', err);
        }
    }
    function addModelCode(div, faciId, row, d, i, lastWidth) {
        try {
            var options = $.data(div, formName).options;
            var codeData = options.canChooseWipData;
            var lWidth = 32;
            $('<label class="SO1118A2_lbl" style="color:blue;width:' + lWidth + 'px;text-align:right;">' + options.language.lModelCode + '</label>').appendTo(d);
            var childId = $(div).prop("id") + faciId + i + "md";
            $('<div id="' + childId + '" class="SO1118A2_dt"></div>').appendTo(d);
            $("#" + childId).csList({
                theme: options.theme,
                height: textHeight,
                source: codeData["ModelCode"].rows,
                disabled: true,
                codeNoWidth: 30,
                width: lastWidth / 2 - lWidth - 6
            });
            options.controls.push({
                name: childId, type: 'csList', level: options.level
            });
            $("#" + childId).data({ row: row, idx: i });
            $("#" + childId).csList('codeNo', row["MODELCODE"]);
        }
        catch (err) {
            errorHandle(formName, 'addModelCode', err);
        }
    }
    function addInitPlaceCode(div, faciId, row, d, i, lastWidth) {
        try {
            var options = $.data(div, formName).options;
            var codeData = options.canChooseWipData;
            var lWidth = 50;
            $('<label class="SO1118A2_lbl" style="color:blue;width:' + lWidth + 'px;text-align:right;">' + options.language.lInitPlaceNo + '</label>').appendTo(d);
            var childId = $(div).prop("id") + faciId + i + "pl";
            $('<div id="' + childId + '" class="SO1118A2_dt"></div>').appendTo(d);
            $("#" + childId).csList({
                theme: options.theme,
                height: textHeight,
                source: codeData["FaciPlaceCode"].rows,
                codeNoWidth: 30,
                disabled: row["TYPE"] == 1 || row["FACIREFNO"] == 4,
                width: lastWidth / 2 - lWidth - 17
            });
            options.controls.push({
                name: childId, type: 'csList', level: options.level
            });
            $("#" + childId).attr("data-sno", row["SNO"]);
            $("#" + childId).data({ row: row, idx: i, type: 'csList' });
            $("#" + childId).csList('codeNo', row["INITPLACENO"]);

        }
        catch (err) {
            errorHandle(formName, 'addInitPlaceCode', err);
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
                var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                for (var j = 0; j < scrollBars.length; j++) {
                    if ($('#' + iId + scrollBars[j]).length > 0) {
                        $('#' + iId + scrollBars[j]).css('display', 'none');
                    }
                }
                controls.push({ name: iId, type: 'jqxPanel', level: level });
            }
            level += 1;
            ////建立CheckBox
            //oArray = ["chkAll"];
            //oWidthArray = ["100"];
            //oLength = oArray.length;
            //for (var i = 0 ; i < oLength; i++) {
            //    var iId = $(div).prop('id') + oArray[i];
            //    $('#' + iId).text(lang[oArray[i]]);
            //    $('#' + iId).jqxCheckBox({
            //        theme: options.theme,
            //        height: textHeight,
            //        width: oWidthArray[i]
            //    });

            //    controls.push({ name: iId, type: 'jqxCheckBox', level: level });
            //}            
            //建立日期元件
            if (options.callOKMustBe == true) {
                oArray = ["dtCallOkTime"];
                oWidthArray = [160];
                oLength = oArray.length;
                for (var i = 0 ; i < oLength; i++) {
                    var iId = $(div).prop('id') + oArray[i];
                    var fs = "yyyy/MM/dd HH:mm";
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
            }
            else {
                getControlObject(div, "lCallOkTime").css('display', 'none');
                getControlObject(div, "dtCallOkTime").css('display', 'none');
            }
            options.level = level + 1;
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function defaultValue(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.callOKMustBe == true) {
                var n = new Date();
                getControlObject(div, 'dtCallOkTime').csDateTime('setText', formatDateTime(n, 'datetime'));
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'defaultValue', err);
        }
    }
    function getControlByFaciRefNo(div, sno, faciRefNo, lastId, STBSNo) {
        try {
            var options = $.data(div, formName).options;
            for (i = 0; i < options.controls.length; i++) {
                var control = options.controls[i];
                var flag = true;
                if (lastId != null) {
                    flag = control.name.right(lastId.length) == lastId;
                }
                if (control.name.indexOf(faciId) >= 0 && flag) {
                    var row = $("#" + control.name).data().row;
                    if ((row["SNO"] == sno || faciRefNo == 9 && row["STBSNO"] == STBSNo) && row["FACIREFNO"] == faciRefNo) {
                        return control;
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'getControlByFaciRefNo', err);
        }
    }
    function getUIData(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.callOKMustBe == true) {
                var lang = options.language;
                var row = {};
                row['callOkTime'.toUpperCase()] = getControlObject(div, 'dtCallOkTime').csDateTime('getDate');
                return row;
            }
        }
        catch (err) {
            errorHandle(formName, 'getUIData', err);
        }
    }
    function getData(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if (isDataOk(div) == false) return;
            var chooseFacility = copyTableData(options.canChooseWipData, allFacilityWipTableName, false);
            var data = {};
            var ChkCanAddFacility = false;
            if (options.callOKMustBe == true) {
                data["parameters".toUpperCase()] = {
                    columns: [{ name: "callOkTime".toUpperCase(), type: "date" },
                            { name: "finUnit".toUpperCase(), type: "date" }],
                    rows: [{}]
                };
                data["parameters".toUpperCase()].rows[0]['callOkTime'.toUpperCase()] = getControlObject(div, 'dtCallOkTime').csDateTime('getDate');
            }
            //設備
            var rows = options.canChooseWipData[allFacilityWipTableName].rows;
            for (var i = 0 ; i < rows.length; i++) {
                ChkCanAddFacility = false;
                for (j = 0; j < options.controls.length; j++) {
                    var control = options.controls[j];
                    if (control.name.indexOf(faciId) >= 0) {
                        var row = $('#' + control.name).data().row;
                        if (row["SEQNO"] == rows[i]["SEQNO"] &&
                            row["SNO"] == rows[i]["SNO"]) {
                            //2019.01.31 by Corey 增加判斷 一般工單(TYPE=0)，直接回填畫面資料。
                            //           維修工單需要判斷是否有勾選"維修轉更換"，有勾選才需要有設備資料。
                            if (row["TYPE"] == 0) {
                                ChkCanAddFacility = true;
                            }
                            else {
                                //維修轉更換時
                                var checkControl = getRowByKeyValue(options.controls, "SNO", row["SNO"]);
                                var checked = $('#' + checkControl.name)[checkControl.type]('val');
                                if (checked == true) { ChkCanAddFacility = true }
                            }
                            
                            if (ChkCanAddFacility) {
                                //回填序號
                                switch (control.name.right(2)) {
                                    case "md":
                                        rows[i]["MODELCODE"] = convertToNull($('#' + control.name)[control.type]("codeNo"));
                                        rows[i]["MODELNAME"] = convertToNull($('#' + control.name)[control.type]("description"));
                                        break;
                                    case "pl":
                                        rows[i]["INITPLACENO"] = convertToNull($('#' + control.name)[control.type]("codeNo"));
                                        break;
                                    default:
                                        if (control.type == "jqxInput") {
                                            rows[i]["FACISNO"] = convertToNull($('#' + control.name)[control.type]("val"));
                                            //STB 再加回填SmartCardNo
                                            if (row["FACIREFNO"] == 3) {
                                                var iccControl = getControlByFaciRefNo(div, row["SNO"], 4);
                                                if (iccControl != null) {
                                                    rows[i]["SmartCardNo".toUpperCase()] = convertToNull($("#" + iccControl.name)[iccControl.type]("val"));
                                                }
                                            }
                                        }
                                }
                            }
                        }
                    }
                }
                if (ChkCanAddFacility) {
                    var newRow = rows[i];
                    chooseFacility[allFacilityWipTableName].rows.push(copyRowToRow(null, newRow, null));
                }                
            }
            //data['facility'.toUpperCase()] = cloneJSON(options.canChooseWipData[allFacilityWipTableName]);
            data['facility'.toUpperCase()] = cloneJSON(chooseFacility[allFacilityWipTableName]);
            return data;
        }
        catch (err) {
            errorHandle(formName, 'getData', err);
        }
    }
    function isDataOk(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if (options.callOKMustBe == true) {
                var lArrays = ['lCallOkTime'];
                var dArrays = ['dtCallOkTime'];
                var oLength = options.lArrays;
                for (var i = 0 ; i < oLength; i++) {
                    if (checkUIMustBe(getControlObject(div, dArrays[i]).csDateTime('getText'), lang.lArrays[i], function () {
                        getControlObject(div, dArrays[i]).csDateTime('focus');
                    }) == false) {
                        return false;
                    }
                }
            }
            oLength = options.controls.length;
            for (var i = 0; i < oLength; i++) {
                var control = options.controls[i];
                if (control.isFaci == true) {
                    var data = $("#" + control.name).data();
                    var row = data.row;
                    //#8107 2019.02.25 by Corey 需求改用判斷 CD022.CALLOKMUSTSNO >0 設備序號必填
                    if (row["CALLOKMUSTSNO"] > 0) {
                        //新增設備時
                        if (row["TYPE"] == 0) {
                            if (checkControlMustBe(control, row["FACINAME"]) != true) {
                                return false;
                            };
                        }
                        else {
                            //維修轉更換時
                            var checkControl = getRowByKeyValue(options.controls, "SNO", row["SNO"]);
                            if (checkControl != null) {
                                var checked = $('#' + checkControl.name)[checkControl.type]('val');
                                if (checked == true) {
                                    if (checkControlMustBe(control, row["FACINAME"]) != true) {
                                        return false;
                                    };
                                }
                            }
                        }
                    }
                }
            }
            //檢核長度
            var r = checkTextMaxLength(options.controls);
            if (r[0] != true) return false;
            return true;
        }
        catch (err) {
            errorHandle(formName, 'isDataOk', err);
        }
    };
    function chkSTB_SmartCard(div, faciSNo, STBNo, faciRefNo, row, STBRow, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = getParaLoginInfo(div, formName);
            var inData = {
                facility: {
                    columns: cloneJSON(options.canChooseWipData[allFacilityWipTableName].columns),
                    rows: []
                }
            };
            if (STBRow != null) {
                inData.facility.rows.push(cloneJSON(STBRow));
            }
            else {
                inData.facility.rows.push(cloneJSON(row));
            }
            var parameters = $.extend({
            }, paraLoginInfo, {
                ds: {
                    type: 'string', value: JSON.stringify(inData)
                },
                faciSNo: {
                    type: 'string', value: faciSNo
                },
                STBNo: {
                    type: 'string', value: convertToNull(STBNo)
                },
                faciRefNo: {
                    type: 'string', value: faciRefNo
                }
            });
            deleteJSONObject(inData);

            var params = getParameters(riadllName,
                riaClassName,
                'ChkSTB_SmartCard',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        var flag = data.ResultBoolean;
                        var code = data.ErrorCode;
                        var msg = data.ErrorMessage
                        var d;
                        if (flag) {
                            d = JSON.parse(data.ResultXML);
                        }
                        deleteJSONObject(data);
                        action([flag, code, msg, d]);
                    }
                    catch (err) {
                        errorHandle(formName, 'chkSTB_SmartCard_success', err);
                        action([false]);
                    }
                }
            });
            return true;
        }
        catch (err) {
            errorHandle(formName, 'chkSTB_SmartCard', err);
        }
    }
})(jQuery);