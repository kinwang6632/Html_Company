//2017/06/29
(function ($) {
    var formName = 'dynamicCondition';
    var htmlName = "dynamicCondition.js";
    var riadllName = 'cablesoft.ria.dynamic.condition.web.dll';
    var riaClassName = 'cablesoft.ria.dynamic.condition.web.dynamiccondition';
    var defaultHeight = 23;
    var minWidth = 20;
    var lblMarginTop = 6;
    var expanderHeight = 25;
    var headGroupName = 'headerGroup';
    var radioContendId = 'rCon';
    var eeKKy = "CS";
    var buttonsHeight = 24;
    $.fn.dynamicCondition = function (options, param, param2, param3) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    var state = $.data($(this)[0], formName);
                    if (state) {
                        return methods[options](this, param, param2, param3);
                    }
                }
                return;
            }
            options = options || {};
            return this.each(function () {
                var state = $.data(this, formName);
                if (state) {
                    $.extend(state.options, options);
                    changeParameters(this);
                }
                else {
                    $.data(this, formName, {
                        options: $.extend({}, new defaults(), new dynamicCondition(), options)
                    });
                    init(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynamicCondition', err);
        }
    };
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        theme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        setTheme: function (jq, params) {
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
        resize: function (jq) {
            return jq.each(function () {
                formResize(this);
            });
        },
        getQueryData: function (jq, params, params2) {
            return jq.each(function () {
                getQueryData(this, params, params2);
            });
        },
        disableAll: function (jq, flag, revertStatus, includeTab) {
            return jq.each(function () {
                disableAll(this, flag, revertStatus, includeTab);
            });
        },
        disableFields: function (jq, flag, fields) {
            return jq.each(function () {
                disableFields(this, flag, fields);
            });
        },
        reset: function (jq, setDefault) {
            return jq.each(function () {
                reset(this, setDefault);
            });
        },
        valueChange: function (jq, param, param2, param3) {
            valueChange($(jq)[0], param, param2, param3);
        },
        refreshDefault: function (jq, param, param2) {
            refreshDefault($(jq)[0], param, param2, null, null, true);
        },
        focus: function (jq) {
            return jq.each(function () {
                focus(this);
            });
        },
        setConditionData: function (jq, param) {
            setConditionData($(jq)[0], param);
        },
    };
    var defaults = (function () {
        this.language = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.refNo = 0;
        this.parameters = {};
        this.controls = [];
        this.theme = $.jqx.theme;
        this.settingData = {};
        this.parentData = {};
        this.localization = null;
        this.radioControls = [];
        this.disableMessage = false;
        this.groupControls = {};
        this.readOnlyFields = [];
        this.isCheckMustBe = true;
        this.controlLoaded = {};
        this.showBackground = false;
        this.noShowMessage = false;
        this.isReport = false;
    });
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    function changeParameters(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            //Change EditMode
            for (var i = 0; i < controls.length; i++) {
                if (controls[i]['type'] == 'dynamicGrid') {
                    $("#" + controls[i].name)[controls[i].type]({ editMode: options.editMode });
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    }
    //function formResize(div, params) {
    //    try {
    //        if ($.data(div, formName) == null) { return; }
    //        var options = $.data(div, formName).options;
    //        var controls = options.controls;
    //        var msg = 'havVScrollbar:' + haveScrollbar($(div)[0], 'v') + 'width:' + $(div).width() + ',innerWidth:' + $(div).innerWidth() + ',clientWidth' + $(div)[0].clientWidth + ',scrollWidth:' + $(div)[0].scrollWidth;
    //        var hsb = haveScrollbar($(div)[0], 'v');
    //        for (var i = 0; i < controls.length; i++) {
    //            var o = $('#' + controls[i].name);
    //            if (o.length > 0) {
    //                var fieldRow = controls[i].fieldRow;
    //                var oP = $($(o).parent());
    //                if (fieldRow['widthType'.toUpperCase()] == 0 && isInputControl(fieldRow) == true) {
    //                    if (oP.prop('tagName') === 'TD' && getConditionType(div) == 0) {
    //                        var tableDiv = $(getControlParentTable(o)).parent();
    //                        var tableOWidth = $(tableDiv)[0].style.width;
    //                        if (tableOWidth.indexOf('px') >= 0) {
    //                            var tabDivWidth = getColumnWidth(div, fieldRow, getFieldRows(div), getConditionType(div));
    //                            tableDiv.css('width', tabDivWidth["width"]);
    //                        }
    //                    }

    //                    var noHead = false;
    //                    if (controls[i].noHead == true) { noHead = true; }
    //                    var pOldWidth = oP[0].style.width;
    //                    var oOldWidth = o[0].style.width;
    //                    if (fieldRow['FIELDNAME'] == 'Address') {
    //                        //messageBox(oOldWidth);
    //                    }
    //                    oP.width(0);
    //                    if (controls[i].type.indexOf('jqx') >= 0) {
    //                        $(o)[controls[i]['type']]({ width: 0 });
    //                    }
    //                    var trWidth = $(oP.parent()).width();
    //                    //var trWidth = $(oP.parent())[0].scrollWidth;
    //                    if (hsb == true) {
    //                        trWidth -= Math.ceil((trWidth / $(div).width()) * getScrollBarWidth());
    //                        //var xx = 'width:' + $($(oP.parent())[0]).width() + ',innerWidth:' + $($(oP.parent())[0]).innerWidth() + ',clientWidth' + $(oP.parent())[0].clientWidth + ',scrollWidth:' + $(oP.parent())[0].scrollWidth;
    //                        //messageBox(xx);
    //                    }
    //                    var fieldWidths = getFieldWidth(fieldRow, trWidth - 2, noHead);
    //                    var pWidth = trWidth - fieldWidths.headwidth - 2;
    //                    if (pOldWidth == null || pOldWidth.toString().indexOf('%') < 0) {
    //                        oP.width(pWidth);
    //                    }
    //                    else {
    //                        oP.css('width', pOldWidth);
    //                    }
    //                    var width = fieldWidths.textwidth - getMinusWidth($('#' + controls[i].name)) - 1;

    //                    if (oOldWidth.toString().indexOf('%') >= 0) {
    //                        width = oOldWidth;
    //                    }
    //                    if (controls[i].type.indexOf('jqx') >= 0) {
    //                        $(o)[controls[i]['type']]({ width: width });
    //                    }
    //                    else {
    //                        switch (controls[i].type) {
    //                            case 'csAddress1':
    //                            case 'csAddress2':
    //                            case 'csAddress3':
    //                            case 'csList':
    //                            case 'csMulti':
    //                                $(o)[controls[i].type]('resize', { width: width });
    //                                break;
    //                            case 'csTabs':
    //                            case 'csDateTime':
    //                            case "csUploadFile":
    //                                $(o)[controls[i]['type']]({ width: width });
    //                                break;
    //                            default:
    //                                $(o).css('width', width);
    //                        }
    //                    }
    //                }
    //                if (fieldRow['heightType'.toUpperCase()] == 0) {
    //                    if (controls[i].type == 'jqxPanel') {
    //                        var getH = function (oo) {
    //                            if (oo.parent().height() < 10) {
    //                                return getH(oo.parent());
    //                            }
    //                            else {
    //                                return oo.parent().height();
    //                            }
    //                        }
    //                        if (o.height() < 10) {
    //                            o[controls[i].type]({ height: getH(o) });
    //                        }
    //                    }
    //                }
    //                if (controls[i].type == 'jqxExpander') {
    //                    $('#' + controls[i].name)[controls[i].type]('refresh');
    //                }
    //            }
    //        }
    //    }
    //    catch (err) {
    //        errorHandle(formName, 'formResize', err);
    //    }
    //};
    function focus(div) {
        try {
            var options = $.data(div, formName).options;
            var cLength = options.controls.length;
            for (var i = 0; i < cLength; i++) {
                var control = options.controls[i];
                if (control.fieldRow["CONDITIONTYPEA"] == 1) {
                    $('#' + control.name)[control.type]('focus');
                    break;
                }
                else {
                    if (control.fieldRow['DefFocus'.toUpperCase()] == 1) {
                        $('#' + control.name)[control.type]('focus');
                        break;
                    }
                }
            }
            return;
        }
        catch (err) {
            errorHandle(formName, 'focus', err);
        }
    };
    function _setControlWidth(control, width) {
        try {
            width = Math.floor(width);
            var o = $('#' + control.name);
            if (control.type == "jqxPanel" || control.type == 'csTabs') {
                $(o)[control.type]({ width: width });
            }
            else if (control.type == "jqxExpander") {
                $(o)[control.type]({ width: "99%" });
                refreshExpanderContentHeight(control);
            }
            else if (control.type.indexOf('jqx') >= 0) {
                $(o)[control.type]({ width: width - 3 });
            }
            else if (control.type == 'csDateTime') {
                var fieldRow = control.fieldRow
                var minusWidth = 0;
                if (fieldRow["RangeFlag".toUpperCase()] != 1) {
                    minusWidth = 2;
                }
                $(o)[control.type]({ width: width - minusWidth });
            }
            else if (control.type == 'csList' || control.type == 'csMulti' ||
                control.type == 'csUploadFile' || control.type == 'csDownloadFile' ||
                control.type == 'dynamicGrid' || control.type == 'dynamicCondition') {
                $(o)[control.type]('resize', { width: width - 5 });
            }
            else if (control.type.indexOf('csAddress') >= 0) {
                $(o)[control.type]('resize', width - 2);
            }
            else {
                $(o).css({ width: width - 3 });
            }
        }
        catch (err) {
            errorHandle(formName, '_setControlWidth', err);
        }
    };
    function refreshExpanderContentHeight(control) {
        try {
            if (control.fieldRow["heightType".toUpperCase()] == 1) {
                var o = $('#' + control.name);
                var height = control.fieldRow['height'.toUpperCase()];
                $('#' + control.name)[control.type]({ height: height });
                $(o).find('.jqx-expander-header').css({ 'height': 16, 'padding-bottom': 2 });
                var eContainer = $(o).find('.jqx-expander-content')[0];
                //setTimeout(function () {
                $(eContainer).css({ height: height - expanderHeight - 2 });
                //$(eContainer).css({ height: "auto" });
                //}, 500);
            }
        }
        catch (err) {
            errorHandle(formName, 'refreshExpanderContentHeight', err);
        }
    }
    function formResize(div, groupBoxName) {
        try {
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            var controls = options.controls;
            //return;
            var fieldRows = options.fieldRows;
            var isSingle = fieldRows[0]["CONDITIONTYPEA"] == 1;
            var cLength = controls.length;
            var tabItems = [];
            var overflow = $(div).css('overflow-x');
            $(div).css("overflow-x", "hidden");
            for (var i = 0; i < cLength; i++) {
                //if (isSingle == false) {
                var control = controls[i];
                if (!(groupBoxName == null && control.fieldRow['groupBoxName'.toUpperCase()] == null || control.fieldRow['groupBoxName'.toUpperCase()] == groupBoxName)) continue;
                var fieldRow = control.fieldRow;
                if (fieldRow['widthType'.toUpperCase()] == 0) {
                    if (control.type != "jqxExpander") {
                        _setControlWidth(control, minWidth);
                    }
                }
                //}
            }
            for (var i = 0; i < cLength; i++) {
                var control = controls[i];
                if (!(groupBoxName == null && control.fieldRow['groupBoxName'.toUpperCase()] == null || control.fieldRow['groupBoxName'.toUpperCase()] == groupBoxName)) continue;
                var o = $('#' + control.name);
                if (o.length > 0) {
                    var fieldRow = control.fieldRow;
                    var pControl = null;
                    var noHead = false;
                    if (control.noHead == true) { noHead = true; }
                    if (isSingle == true) {
                        var tableWidth;
                        if (fieldRow['OptionGroup'.toUpperCase()] == null) {
                            tableWidth = $('#' + $(div).prop('id') + radioContendId).width() - 17;
                        }
                        else {
                            tableWidth = $('#' + $(div).prop('id') + 'ro' + fieldRow['OptionGroup'.toUpperCase()]).width() - 17;
                        }
                        var tWidth = getFieldWidth(fieldRow, tableWidth, noHead, control.twoColumns, control.noTextWidth);
                        var realWidth = tWidth["textwidth"] - getMinusWidth(o) - 5;
                        _setControlWidth(control, realWidth);
                    }
                    else {
                        var height;
                        var width;
                        if (fieldRow['groupBoxName'.toUpperCase()] == null) {
                            height = $(div)[0].scrollHeight - getMinusHeight(div);
                            width = $(div)[0].scrollWidth - getMinusWidth(div) - 3;
                        }
                        else {
                            pControl = control.parentControl;
                            if (pControl != null) {
                                if (pControl.type == 'jqxExpander') {
                                    var expander = $('#' + pControl.name).find('.jqx-expander-content')[0];
                                    height = $(expander).height() - getMinusHeight(expander) - 2;
                                    width = $(expander).width() - getMinusWidth(expander) - 3;
                                }
                                else if (pControl.type.indexOf('jqx') >= 0) {
                                    height = $('#' + pControl.name)[pControl.type]('height') - 2;
                                    width = $('#' + pControl.name)[pControl.type]('width') - getMinusWidth($('#' + pControl.name)) - 3;
                                }
                                else {
                                    height = $('#' + pControl.name).height() - getMinusHeight($('#' + pControl.name)) - 2;
                                    width = $('#' + pControl.name).width() - getMinusWidth($('#' + pControl.name)) - 3;
                                }
                            }
                            else {
                                var type = control.type;
                            }
                        }
                        if (fieldRow['widthType'.toUpperCase()] == 0) {
                            var tdWidth = getColumnWidth(div, fieldRow, fieldRows, isSingle);
                            if (tdWidth['width'].indexOf('%') >= 0) {
                                var percentX = 101;
                                switch (control.type) {
                                    case "csTabs": case "jqxExpander": case "jqxPanel": case "dynamicGrid": case "dynamicCondition":
                                    case "dynUpdateGrid": case "dynUpdateGrid2":
                                        percentX = 100;
                                        break;
                                }
                                tdWidth['width'] = Math.floor(width * Number(tdWidth['width'].replace('%', '')) / percentX);
                            }
                            var tWidth = getFieldWidth(fieldRow, tdWidth['width'], noHead, control.twoColumns, control.noTextWidth);
                            var realWidth = tWidth["textwidth"] - getMinusWidth(o);

                            _setControlWidth(control, realWidth);
                        }
                        if (fieldRow['heightType'.toUpperCase()] == 0) {
                            switch (control.type) {
                                case "jqxPanel":
                                case "csTabs":
                                case "dynamicGrid":
                                case "jqxTextArea":
                                case "dynUpdateGrid": case "dynUpdateGrid2":
                                    var tHeight = getRowHeight(div, fieldRow, fieldRows, isSingle);
                                    if (isEmpty(tHeight['height']) == false) {
                                        tHeight['height'] = tHeight['height'].replace('px', '');
                                        if (tHeight['height'].indexOf('%') >= 0) {
                                            tHeight['height'] = height * Number(tHeight['height'].replace('%', '')) / 100;
                                        }
                                        var realHeight = tHeight["height"] - getMinusHeight(o) - 3;
                                        switch (control.type) {
                                            case "dynamicGrid":
                                            case "dynUpdateGrid":
                                            case "dynUpdateGrid2":
                                                $(o).css({ height: realHeight });
                                                $(o)[control.type]('resize');
                                                break;
                                            default:
                                                $(o)[control.type]({ height: realHeight });
                                        }
                                    }
                                    break;
                            }
                        }
                        else {
                            switch (control.type) {
                                case "dynUpdateGrid":
                                case "dynUpdateGrid2":
                                    $(o).css({ height: fieldRow['height'.toUpperCase()] });
                                    $(o)[control.type]('resize');
                                    break;
                            }
                        }
                        switch (control.type) {
                            case "jqxPanel":
                            case "jqxExpander":
                            case "csTabs":
                            case "dynamicGrid":
                                if (control.type != "dynamicGrid") {
                                    displayScrollbar(control, false);
                                }
                                //Tab 要取TabItem 裡的東西
                                if (control.type == 'csTabs') {
                                    var idx = $('#' + control.name)[control.type]("val");
                                    formResize(div, control.tabsId[idx].fieldName);
                                }
                                else {
                                    formResize(div, fieldRow['fieldName'.toUpperCase()]);
                                }
                                if (control.type == 'jqxExpander') {
                                    refreshExpanderContentHeight(control);
                                }
                                break;
                        }
                    }
                }
            }
            if (overflow != null) $(div).css("overflow-x", overflow);
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function displayScrollbar(control, flag) {
        var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
        for (var j = 0; j < scrollBars.length; j++) {
            if ($('#' + control.name + scrollBars[j]).length > 0) {
                if (flag) {
                    $('#' + control.name + scrollBars[j]).prop("style").removeProperty('display');
                }
                else {
                    $('#' + control.name + scrollBars[j]).css('display', 'none');
                }
            }
        }
        if (flag == false) {
            $("#" + control.name).css('overflow', 'hidden');
        }
    }
    function isInputControl(fieldRow) {
        switch (fieldRow['objectType'.toUpperCase()]) {
            case 11:
            case 16:
                //case 12:
                //case 13:
                //case 14:
                return false;
                break;
            default:
                return true;
        }
    }
    function getParentHeight(control) {
        if ($(control).length == 0) { return 0; }
        if ($(control).height() == 0) {
            return getParentHeight($(control).parent());
        }
        else {
            return $(control).height();
        }
    }
    function getControlParentTable(control) {
        if ($(control).prop('tagName') !== "TABLE") {
            return getControlParentTable($(control).parent());
        }
        else {
            return $(control);
        }
    }
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            destroyControls(controls);

            var radioControls = $.data(div, formName).options.radioControls;
            destroyControls(radioControls);
            offElementEvents(div);
            var options = $.data(div, formName).options
            deleteJSONObject(options);
            delete options;
            options = null;
            $.data(div, formName, null);
            delete $.data(div, formName);
            $(div).children().remove();
            return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    function disableAll(div, flag, revertStatus, includeTab) {
        try {
            var options = $.data(div, formName).options;
            if (includeTab == null) includeTab = false;
            disableAllControls(options.controls, flag, revertStatus, includeTab, includeTab);
            if (flag == false) {
                var cLength = options.controls.length;
                for (var i = 0 ; i < cLength; i++) {
                    var control = controls[i];
                    var tFlag = flag;
                    if (control.oldDisabled != null) {
                        tFlag = control.oldDisabled;
                    }
                    else if (control.disabled == true) {
                        tFlag = true;
                    }
                    disableControl(control, tFlag);
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'disableAll', err);
        }
    };
    function disableFields(div, flag, fields) {
        try {
            var controls = $.data(div, formName).options.controls;
            var cLength = controls.length;
            var tmpFields = fields.map(function (x) {
                if (isEmpty(x)) {
                    return "";
                }
                else {
                    return x.toUpperCase()
                }
            });
            for (var i = 0 ; i < cLength; i++) {
                var control = controls[i];
                if (tmpFields.indexOf(control.fieldRow['FIELDNAME'].toUpperCase()) >= 0) {
                    disableControl(control, true);
                }
                else {
                    var tFlag = flag;
                    if (control.oldDisabled != null) {
                        tFlag = control.oldDisabled;
                    }
                    else if (control.disabled == true) {
                        tFlag = true;
                    }
                    disableControl(control, tFlag);
                }
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'disableFields', err);
        }
    }
    function reset(div, setDefault) {
        try {
            var controls = $.data(div, formName).options.controls;
            var settingData = $.data(div, formName).options.settingData;
            var fieldtableName = Object.keys(settingData)[0];
            var datafieldTable = settingData[fieldtableName];
            var isSingle = (datafieldTable.rows[0]["CONDITIONTYPEA"] == 1);
            if (setDefault == null) setDefault = true;
            for (var i = 0; i < controls.length; i++) {
                var control = controls[i];
                if (control.setValueName != null && control.name.toString().endsWith('1') == true) {
                    var controlHeadId = control.name.substr(0, control.name.length - 2);
                    for (var j = 1 ; j <= 2; j++) {
                        var obj = $('#' + controlHeadId + '_' + j.toString());
                        if (control.type == 'label') continue;
                        if (obj.length > 0) {
                            switch (control.type) {
                                case 'jqxMaskedInput':
                                    $(obj)[control.type]('clear');
                                    break;
                                case 'csList': case 'csAddress1': case 'csAddress2': case 'csAddress3':
                                    $(obj)[control.type]('clearDisplayValue');
                                    break;
                                case "csMulti":
                                    $(obj)[control.type]('setDisplayValue', '');
                                    break;
                                case "jqxCheckBox": case "jqxRadioButton":
                                    $(obj)[control.type]('val', false);
                                    break;
                                default:
                                    $(obj)[control.type]('val', null);
                                    break;
                            }
                            if (j == 1 && (control.fieldRow['DefFocus'.toUpperCase()] == 1 || isSingle == true)) {
                                if (control.type.indexOf('jqx') >= 0) {
                                    $(obj)[control.type]('focus');
                                }
                                else {
                                    $(obj).focus();
                                }
                            }
                        }
                    }
                    if (setDefault == true && control.type != 'label') {
                        setDefaultAndAddHandler(div, controlHeadId, control.fieldRow, control.eventName, control.type, control.setValueName, true, control.getValueName);
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'reset', err);
        }
    }
    //取得條件的結構
    function getQueryStru() {
        try {
            var table = { condition: { columns: [], rows: [] } };
            var cols = ["fieldName", "fieldValue", "fieldDesc", "headName"];
            $.each(cols, function (idx, val) {
                table.condition.columns.push({ name: val.toUpperCase(), type: "string" });
            });
            table.condition.columns.push({ name: "objectType".toUpperCase(), type: "decimal" });
            return table;
            //ObjectType
        }
        catch (err) {
            errorHandle(formName, 'getQueryStru', err);
        }
    }
    function mustBeFocus(div, control) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var cLength = controls.length;
            var tabFunc = (function (c) {
                var parentControl = c.parentControl;
                if (parentControl != null && parentControl.type == 'csTabs') {
                    var tabsId = parentControl.tabsId;
                    for (j = 0; j < tabsId.length; j++) {
                        if (tabsId[j].fieldName.toUpperCase() == c.fieldRow['GROUPBOXNAME'].toUpperCase()) {
                            $('#' + parentControl.name).csTabs('select', j);
                            break;
                        }
                    }
                    tabFunc(parentControl);
                }
            });
            tabFunc(control);
            if (control.type != 'label') {
                $('#' + control.name)[control.type]('focus');
            }
        }
        catch (err) {
            errorHandle(formName, 'mustBeFocus', err);
        }
    }
    //檢核且取得所有條件內容
    function getQueryData(div, action, donnotCheckOk) {
        try {
            var options = $.data(div, formName).options;
            //取得畫面上資料
            var value = getObjectData(div, donnotCheckOk != true);
            if (value[0] == false) {
                var control = value[2];
                if (options.disableMessage != true && donnotCheckOk != true) {
                    messageBox(value[1], null, null, function () {
                        mustBeFocus(div, control);
                    });
                }
                mustBeFocus(div, control);
                if (typeof action === "function") {
                    action(value);
                }
                return;
            }
            options.condition = value[2];
            if (options.isCheckMustBe == false) {
                action(value);
                return;
            }
            //上傳檔案
            //2018/04/17 Jacky 調整先上傳檔案
            getUploadFiles(div, function (ok) {
                if (ok[0] == true) {
                    //addEndZeroName(options.condition);
                    //檢核語法正不正確
                    checkSQLDataOk(div, function (rValue) {
                        try {
                            //0:boolean,1:訊息,2:欄位名稱
                            var actionGo = function () {
                                if (rValue[2] != null) {
                                    //如果取出來資料有誤則Focus 到該欄位
                                    var control = getControlById(div, $(div).prop('id') + "_" + rValue[2] + '_1');
                                    if (control != null && control.type != 'label') {
                                        $('#' + control.name)[control.type]('focus');
                                    }
                                    if (typeof action === "function") {
                                        action([rValue[0], rValue[1], control]);
                                    }
                                }
                                else {
                                    if (typeof action === "function") {
                                        action([rValue[0], rValue[1], options.controls[0]]);
                                    }
                                }
                            }
                            if (rValue[0] == false) {
                                if (options.disableMessage != true && donnotCheckOk != true) {
                                    messageBox(rValue[1], null, null, function () {
                                        actionGo();
                                    });
                                }
                                else {
                                    actionGo();
                                }
                                return;
                            }
                            else {
                                //上傳檔案
                                getUploadFiles(div, function (ok) {
                                    if (ok[0] == true) {
                                        //addEndZeroName(options.condition);
                                        action([true, null, options.condition]);
                                    }
                                    else {
                                        if (options.disableMessage != true && donnotCheckOk != true) {
                                            messageBox(ok[1], null, null, function () {
                                                action([false, ok[1]]);
                                            });
                                        }
                                        else {
                                            action([false, ok[1]]);
                                        }
                                    }
                                }, options.isReport);
                            }
                        }
                        catch (err) {
                            errorHandle(formName, 'getQueryData_checkSQLDataOk', err);
                        }
                    });
                }
                else {
                    if (options.disableMessage != true && donnotCheckOk != true) {
                        messageBox(ok[1], null, null, function () {
                            action([false, ok[1]]);
                        });
                    }
                    else {
                        action([false, ok[1]]);
                    }
                }
            }, false);

            return;
        }
        catch (err) {
            errorHandle(formName, 'getQueryData', err);
        }
    };
    function addEndZeroName(conditionData) {
        try {
            var rLength = conditionData.condition.rows.length;
            for (var i = 0; i < rLength; i++) {
                if (conditionData.condition.rows[i]['FIELDNAME'].right(2) == ['_1']) {
                    var row = cloneJSON(conditionData.condition.rows[i]);
                    row['FIELDNAME'] = row['FIELDNAME'].substr(0, row['FIELDNAME'].length - 1) + '0';
                    conditionData.condition.rows.push(row);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'addEndZeroName', err);
        }
    }
    function getUploadFiles(div, action, isReport) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var cLength = controls.length;
            var uFiles = cloneJSON(getRowByKeyValue(controls, "type", "csUploadFile", true));
            if (uFiles == null || uFiles.length == 0 || Object.keys(uFiles).length == 0) {
                action([true]);
                return;
            }
            var uLength = uFiles.length;
            var pushCondition = (function (flag, control, msg) {
                try {
                    control.isDo = flag;
                    if (flag == true && options.condition != null) {
                        var row = getRowByKeyValue(options.condition.condition.rows, 'fieldName'.toUpperCase(), control.fieldName);
                        if (row == null) {
                            row = {};
                            options.condition.condition.rows.push(row);
                        };
                        row['fieldName'.toUpperCase()] = control.fieldName;
                        row['fieldValue'.toUpperCase()] = msg;
                        row['fieldDesc'.toUpperCase()] = msg;
                        row['headName'.toUpperCase()] = control.fieldName + ',' + control.headName + ',' + $("#" + control.name).csUploadFile("getFiles");
                        row['objectType'.toUpperCase()] = control.objectType;
                    }
                    var finishOk = true;
                    var errorMsg;
                    for (var i = 0; i < uLength; i++) {
                        if (uFiles[i]["isDo"] == false) {
                            finishOk = false;
                            errorMsg += msg;
                        }
                        else if (uFiles[i]["isDo"] != true) {
                            return;
                        }
                    }
                    action([finishOk, errorMsg]);
                }
                catch (err) {
                    errorHandle(formName, 'pushCondition', err);
                }
            });
            for (var i = 0 ; i < uLength; i++) {
                var control = uFiles[i];
                var value = $('#' + control.name)[control.type]("getFiles");
                if (isReport == true) {
                    $('#' + control.name)[control.type]({ uploadPath: getUploadPath(div) });
                }
                else {
                    $('#' + control.name)[control.type]({ uploadPath: null });
                }
                if (control.fieldRow["MUSTBE"] == 1 && isEmpty(value)) {
                    msg = options.language.mustBe.replace('{0}', control.headName);
                    action([false, msg]);
                    return;
                }
                $('#' + control.name).on('load', { control: control }, function (e, args) {
                    $(this).off('load');
                    $(this).off('error');
                    var data = e.data;
                    pushCondition(true, data.control, args);
                });
                $('#' + control.name).on('error', { control: control }, function (e, args) {
                    $(this).off('load');
                    $(this).off('error');
                    var data = e.data;
                    pushCondition(false, data.control, args);
                });
            }
            for (var i = 0 ; i < uLength; i++) {
                var control = uFiles[i];
                $('#' + control.name)[control.type]('uploadFiles');
            }
        }
        catch (err) {
            errorHandle(formName, 'getUploadFiles', err);
        }
    };
    function getUploadPath(div) {
        try {
            var options = $.data(div, formName).options;
            var uploadPath = null;
            if (options.isReport == true) {
                var url = options.loginInfo.loginInfo.rows[0].ReportServicePath;
                var pathname = url.split("/")[url.split("/").length - 1];
                var uploadPath = url.split(pathname)[0];
            }
            return uploadPath;
        }
        catch (err) {
            errorHandle(formName, 'getUploadPath', err);
        }
    }
    //function getUploadFiles(div, action) {
    //    try {
    //        var options = $.data(div, formName).options;
    //        var controls = options.controls;
    //        var cLengths = controls.length;
    //        var doArray = [];
    //        var pushCondition = (function (doItem) {
    //            var row = {};
    //            row['fieldName'.toUpperCase()] = doItem.fieldName;
    //            row['fieldValue'.toUpperCase()] = doItem.fileName;
    //            row['fieldDesc'.toUpperCase()] = doItem.fileName;
    //            row['headName'.toUpperCase()] = doItem.fieldName + ',' + doItem.headName;
    //            row['objectType'.toUpperCase()] = doItem.objectType;
    //            options.condition.condition.rows.push(row);
    //        });
    //        var actionGo = (function () {
    //            var isOk = true;
    //            var errorMsg = [];
    //            var doLength = doArray.length;
    //            for (var j = 0; j < doLength; j++) {
    //                if (doArray[j]['isOk'] == null) return;
    //                if (doArray[j]['isOk'] == false) {
    //                    isOk = false;
    //                    errorMsg.push(doArray[j].headName);
    //                }
    //            }
    //            if (isOk == true) {
    //                for (var j = 0; j < doLength; j++) {
    //                    pushCondition(doArray[j]);
    //                }
    //                action([true]);
    //            }
    //            else {
    //                action([false, errorMsg.join(",")]);
    //            }
    //        });
    //        for (var i = 0 ; i < cLengths; i++) {
    //            if (controls[i].type == "csUploadFile") {
    //                var files = $('#' + controls[i].name)[controls[i].type]('getFiles');
    //                var doItem = {
    //                    name: controls[i].name,
    //                    type: controls[i].type,
    //                    fieldName: controls[i].fieldName,
    //                    headName: controls[i].headName,
    //                    objectType: controls[i].objectType,
    //                    isOk: null, fileName: null, errorMsg: null
    //                };
    //                if (isEmpty(files) == true) {
    //                    doArray.push(doItem);
    //                }
    //                else {
    //                    pushCondition(doItem);
    //                }
    //            }
    //        }
    //        if (doArray.length == 0) {
    //            action([true]);
    //        }
    //        else {
    //            for (var i = 0 ; i < doArray.length; i++) {
    //                if (doArray['isOk'] == null) {
    //                    $('#' + doArray[i].name).on('load', function (e, args) {
    //                        $(this).off('load');
    //                        var ok = getRowByKeyValue(doArray, 'name', $(this).prop('id'));
    //                        ok['isOk'] = true;
    //                        ok['fileName'] = args;
    //                        actionGo(ok);
    //                    });
    //                    $('#' + doArray[i].name).on('error', function (e, args) {
    //                        $(this).off('error');
    //                        var ok = getRowByKeyValue(doArray, 'name', $(this).prop('id'));
    //                        ok['isOk'] = true;
    //                        ok['errorMsg'] = args;
    //                        actionGo(ok);
    //                    });
    //                    $('#' + doArray[i].name)[doArray[i].type]('uploadFiles');
    //                }
    //            }
    //        }
    //    }

    //    catch (err) {
    //        errorHandle(formName, 'getUploadFiles', err);
    //    }
    //};
    //取得畫面上的條件
    function getObjectData(div, checkData) {
        //{"fieldName", "fieldValue", "fieldDesc", "headName", "objectType"}
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var table = getQueryStru();
            if (checkData == null) checkData = true;
            //messageBox(JSON.stringify(controls));
            for (var i = 0; i < controls.length; i++) {
                var control = controls[i];
                var o = '#' + control.name;
                var value = '';
                var desc = '';
                var fieldName = control.fieldName;
                var headName = convertNullToString(control.headName);
                var fieldValue2 = null;
                var isDateMask = (control.fieldRow["DateMask".toUpperCase()] == 1)
                var doIt = true;
                var noTrim = false;
                switch (control.objectType) {
                    case 1: //1=數字
                    case 33: //33=數字(可KEY負數)
                    case 11:    //11=備註
                        value = $(o)[control.type]('val');
                        desc = value;
                        break;
                    case 4: //4=comboBox
                        value = $(o)[control.type]('val');
                        if (isEmpty(value) != true && $(o)[control.type]('getSelectedItem') != null) {
                            desc = $(o)[control.type]('getSelectedItem').label;
                        }
                        else {
                            desc = value;
                        }
                        break;
                    case 25:    //25=Pa99sswo99rdEdit
                        value = $(o)[control.type]('val');
                        break;
                    case 26:    //26 = 加密TextEdit
                        value = $(o)[control.type]('val');
                        noTrim = true;
                        if (isEmpty(value) == false) { value = encryptData(value, eeKKy); }
                        break;
                    case 27:    //27 = 加密 PD Edit
                        value = $(o)[control.type]('val');
                        noTrim = true;
                        if (isEmpty(value) == false) { value = encryptData(value, eeKKy); }
                        break;
                    case 2:     //2=日期(yyyy/MM/dd) 
                        value = formatDateTime($(o)[control.type]('getText'), 'yyyyMMdd', isDateMask);
                        desc = value;
                        break;
                    case 3:     //3=日期時間(yyyy/MM/dd HH:mm)
                        value = formatDateTime($(o)[control.type]('getText'), 'yyyyMMddHHmm', isDateMask);
                        desc = value;
                        break;
                    case 17:    //17=日期時間(yyyy/MM/dd HH:mm:ss)
                        value = formatDateTime($(o)[control.type]('getText'), 'yyyyMMddHHmmss', isDateMask);
                        desc = value;
                        break;
                    case 23:    //23=日期(yyyy/MM)
                        value = formatDateTime($(o)[control.type]('getText'), 'yyyyMM', isDateMask);
                        desc = value;
                        break;
                    case 24:    //24=日期(yyyy)
                        value = $(o)[control.type]('getText');
                        desc = value;
                        break;
                    case 36:    //36=時間(HH:mm)
                        value = formatDateTime($(o)[control.type]('getText'), 'HHmm', isDateMask);
                        desc = value;
                        break;
                    case 5:     //5=多欄單選(List)  
                        value = $(o)[control.type]('codeNo');
                        desc = $(o)[control.type]('description');
                        break;
                    case 6:     //6=多選(MultiSelect)
                    case 22:    //22=多選(有順序)
                    case 28:    //28=多選(MultiSelect ReadOnly)
                        if (control.data != null) {
                            var ordValue;
                            if (control.data.columns[0]['type'] == 'string') {
                                value = $(o)[control.type]('getChooseQuoteList');
                                ordValue = $(o)[control.type]('getChooseOrdQuoteList');
                            }
                            else {
                                value = $(o)[control.type]('getChooseList');
                                ordValue = $(o)[control.type]('getChooseOrdList');
                            }
                            desc = $(o)[control.type]('getChooseListName');
                            //2017/08/29 Jacky Add
                            if (control.objectType == 22) {
                                row = {};
                                row['fieldName'.toUpperCase()] = fieldName + "_ORDLIST";
                                row['fieldValue'.toUpperCase()] = ordValue;
                                row['fieldDesc'.toUpperCase()] = null;
                                row['headName'.toUpperCase()] = fieldName + ',' + headName;
                                row['objectType'.toUpperCase()] = control.objectType;
                                table.condition.rows.push(row);
                                row = {};
                                row['fieldName'.toUpperCase()] = fieldName + "_ORDSTR";
                                row['fieldValue'.toUpperCase()] = $(o)[control.type]('getChooseOrd');;
                                row['fieldDesc'.toUpperCase()] = null;
                                row['headName'.toUpperCase()] = fieldName + ',' + headName;
                                row['objectType'.toUpperCase()] = control.objectType;
                                table.condition.rows.push(row);
                            }
                        }
                        break;
                    case 7:     //7=是否(CheckBox)
                    case 31:    //31=是否執行動態程式(CheckBox)
                        value = $(o)[control.type]('val');
                        //增加欄位
                        if (value == true && control.objectType == 31) {
                            var checkTable = options.settingData[control.fieldRow["FIELDNAME"].toUpperCase()];
                            if (checkTable != null && checkTable.rows.length > 0) {
                                var valueArray = [];
                                for (var j = 0; j < checkTable.columns.length; j++) {
                                    valueArray.push(checkTable.columns[j].name + "=" + convertToNull(checkTable.rows[0][checkTable.columns[j].name]));
                                }
                                fieldValue2 = valueArray.join(",");
                            }
                        }
                        if (value == true) { value = "1"; } else { value = "0"; }
                        desc = value;
                        break;
                    case 15:    //15=RadioButton
                        value = $(o)[control.type]('val');
                        if (value == true) { value = "1"; } else { continue; }
                        desc = value;
                        break;
                    case 8:     //8=地址元件1
                    case 38:     //38=地址元件1(裝機)
                        var addrInfo = $(o).csAddress1('getAddrInfo');
                        if (addrInfo == null) continue;
                        var keys = Object.keys(addrInfo);
                        var kLength = keys.length;
                        for (var j = 0; j < kLength; j++) {
                            var row = {};
                            row['fieldName'.toUpperCase()] = fieldName.substring(0, fieldName.length - 1) + keys[j];
                            row['fieldValue'.toUpperCase()] = addrInfo[keys[j]];
                            row['fieldDesc'.toUpperCase()] = keys[j];
                            row['headName'.toUpperCase()] = fieldName + ',' + headName;
                            row['objectType'.toUpperCase()] = control.objectType;
                            table.condition.rows.push(row);
                        }
                        doIt = false;
                        break;
                    case 9:     //9=地址元件2
                    case 39:     //9=地址元件2(裝機)
                        if (checkData == true) {
                            var isOK = $(o)[control.type]('isDataOK');
                            if (isOK[0] != true) {
                                return [false, isOK[1], control];
                            }
                        }
                        var aVal = $(o)[control.type]('getAddressString');
                        var chkValue = checkValueOk(div, control, aVal);
                        if (chkValue[0] == false) {
                            return [chkValue[0], chkValue[1], control];
                        }
                        //if (isEmpty(aVal) == false) {
                        var row = {};
                        row['fieldName'.toUpperCase()] = fieldName;
                        row['fieldValue'.toUpperCase()] = convertToNull($(o)[control.type]('getOrderString1'));
                        row['fieldDesc'.toUpperCase()] = convertToNull($(o)[control.type]('getAddressString'));
                        row['headName'.toUpperCase()] = fieldName + ',' + headName;
                        row['objectType'.toUpperCase()] = control.objectType;
                        table.condition.rows.push(row);
                        row = {};
                        row['fieldName'.toUpperCase()] = fieldName.substr(0, fieldName.length - 1) + "2";
                        row['fieldValue'.toUpperCase()] = convertToNull($(o)[control.type]('getOrderString2'));
                        row['fieldDesc'.toUpperCase()] = null;
                        row['headName'.toUpperCase()] = fieldName + ',' + headName;
                        row['objectType'.toUpperCase()] = control.objectType;
                        table.condition.rows.push(row);
                        var addrInfo = $(o)[control.type]('getAddrInfo');
                        if (addrInfo != null) {
                            var keys = Object.keys(addrInfo);
                            var kLength = keys.length;
                            for (var j = 0; j < kLength; j++) {
                                var row = {};
                                row['fieldName'.toUpperCase()] = fieldName.substring(0, fieldName.length - 1) + keys[j];
                                if (typeof addrInfo[keys[j]] === "boolean") {
                                    row['fieldValue'.toUpperCase()] = addrInfo[keys[j]] == true ? 1 : 0;
                                }
                                else {
                                    row['fieldValue'.toUpperCase()] = addrInfo[keys[j]];
                                }
                                row['fieldDesc'.toUpperCase()] = keys[j];
                                row['headName'.toUpperCase()] = fieldName + ',' + headName;
                                row['objectType'.toUpperCase()] = control.objectType;
                                table.condition.rows.push(row);
                            }
                        }
                        //}
                        doIt = false;
                        break;
                    case 10:    //10=地址元件3
                    case 40:     //40=地址元件3(裝機)
                        if (checkData == true) {
                            var isOK = $(o)[control.type]('isDataOK');
                            if (isOK[0] != true) {
                                return [false, isOK[1], control];
                            }
                        }
                        row = {};
                        row['fieldName'.toUpperCase()] = fieldName;
                        row['fieldValue'.toUpperCase()] = $(o)[control.type]('addrSortA');
                        row['fieldDesc'.toUpperCase()] = desc;
                        row['headName'.toUpperCase()] = fieldName + ',' + headName;
                        row['objectType'.toUpperCase()] = control.objectType;
                        table.condition.rows.push(row);
                        var addrInfo = $(o)[control.type]('addressInfo');
                        if (addrInfo != null) {
                            var keys = Object.keys(addrInfo);
                            var kLength = keys.length;
                            for (var j = 0; j < kLength; j++) {
                                var keyName = keys[j] + "_0";
                                if (keys[j].toUpperCase().indexOf("FLOOR") >= 0) {
                                    keyName = "FLOUR" + keys[j] + "_0";
                                }
                                var nRow = {};
                                nRow['fieldName'.toUpperCase()] = fieldName.substr(0, fieldName.length - 1) + keyName;
                                nRow['fieldValue'.toUpperCase()] = convertToNull(addrInfo[keys[j]]);
                                nRow['fieldDesc'.toUpperCase()] = keys[j];
                                nRow['headName'.toUpperCase()] = fieldName + ',' + headName;
                                nRow['objectType'.toUpperCase()] = control.objectType;
                                table.condition.rows.push(nRow);
                            }
                        }
                        doIt = false;
                        break;
                    case 12:    //12=GroupBox
                        //case 13:    //13=TabControl
                    case 14:    //14=TabItem
                        doIt = false;
                        break;
                    case 18:    //18=上傳檔案(File)
                        doIt = false;
                        break;
                    case 19:    //19=上傳檔案(DataTable)
                        doIt = false;
                        break;
                    case 20:    //20=下載檔案
                        doIt = false;
                        break;
                    case 21:    //21= HyperLink
                        doIt = false;
                        break;
                    case 16:    //16=說明
                        doIt = false;
                        break;
                    case 30:    //30=i秘書(子檔)
                    case 43:    //43=i秘書(瀏覽)
                    case 44:    //44=i秘書(DataTable)
                    case 45:    //45=動態查詢瀏覽
                        //if (control.hasCondition == true) {
                        var gridControl = null;
                        if (control.type == "dynamicGrid") {
                            gridControl = control;
                        }
                        else {
                            var childOptions = $(o)[control.type]("options");
                            gridControl = getRowByKeyValue(childOptions.controls, "type", "dynamicGrid");
                        }
                        var r = getGridCondition(div, gridControl, table);
                        if (r[0]) {
                            if (checkData == true && options.isCheckMustBe == true && r[2][r[1]].rows.length == 0 &&
                                checkValueOk(div, control, null)[0] == false) {
                                value = null;
                            }
                            else {
                                value = r[1];
                                if (control.objectType == 44 && r[2] != null) {
                                    desc = JSON.stringify(r[2]);
                                }
                                var fr = getGridFocusCondition(div, gridControl, control);
                                if (fr != null) {
                                    table.condition.rows.push(...fr);
                                }
                            }
                        }
                        //}
                        //else {
                        //    doIt = false;
                        //}
                        break;
                    case 35:    //取顏色
                        value = $(o)[control.type]('getValue');
                        break;
                    case 41:
                    case 42:
                        var r = getGridCondition(div, control, table);
                        if (r[0]) {
                            if (checkData == true && options.isCheckMustBe == true && r[2][r[1]].rows.length == 0 &&
                                checkValueOk(div, control, null)[0] == false) {
                                value = null;
                            }
                            else {
                                value = r[1];
                                var fr = getGridFocusCondition(div, control, control);
                                if (fr != null) {
                                    table.condition.rows.push(...fr);
                                }
                            }
                        }
                        break;
                    case 46:
                        doIt = false;
                        break;
                    default:
                        if (isEmpty(control.type) || control.type == "label") {
                            value = $(o).text();
                        }
                        else {
                            value = $(o)[control.type]('val');
                        }
                        desc = value;
                        doIt = true;
                        break;
                }
                if (doIt == true) {
                    //"fieldName", "fieldValue", "fieldDesc", "headName", "objectType"
                    if (value != null && noTrim == false) {
                        value = value.toString().trim();
                    }
                    if (checkData == true && options.isCheckMustBe == true) {
                        var chkValue = checkValueOk(div, control, value);
                        if (chkValue[0] == false) {
                            return [chkValue[0], chkValue[1], control];
                        }
                    }
                    if (value == null || value.length == 0) { value = null; }
                    if (desc == null || desc.length == 0) { desc = null; }
                    var row = {};
                    row['fieldName'.toUpperCase()] = fieldName;
                    row['fieldValue'.toUpperCase()] = value;
                    row['fieldDesc'.toUpperCase()] = desc;
                    row['headName'.toUpperCase()] = fieldName + ',' + headName;
                    row['objectType'.toUpperCase()] = control.objectType;
                    if (fieldValue2 != null) {
                        row['fieldValue2'.toUpperCase()] = fieldValue2;
                    }
                    table.condition.rows.push(row);
                }
            }
            return [true, null, table];
        }
        catch (err) {
            errorHandle(formName, 'getObjectData', err);
        }
    };
    function getGridFocusCondition(div, gridControl, control) {
        try {
            var gridTable = $("#" + gridControl.name)[gridControl.type]('getFocusRow', true);
            var rows = [];
            if (gridTable != null) {
                var keys = Object.keys(gridTable);
                var columns = gridTable[keys[0]].columns;
                if (gridTable[keys[0]].rows.length > 0) {
                    for (var i = 0; i < columns.length; i++) {
                        var row = {};
                        var fieldName = control.fieldName.substr(0, control.fieldName.length - 1) + columns[i].name;
                        var value = gridTable[keys[0]].rows[0][columns[i].name];
                        row['fieldName'.toUpperCase()] = fieldName;
                        row['fieldValue'.toUpperCase()] = value;
                        row['fieldDesc'.toUpperCase()] = value;
                        row['headName'.toUpperCase()] = fieldName + ',' + fieldName;
                        row['objectType'.toUpperCase()] = 0;
                        rows.push(row);
                    }
                }
            }
            return rows;
        }
        catch (err) {
            errorHandle(formName, 'getGridCondition', err);
        }
    }
    function getGridCondition(div, control, table) {
        try {
            var options = $("#" + control.name)[control.type]("options");
            var gridTable = null;
            if (options != null && options.canChoose == true) {
                gridTable = $("#" + control.name)[control.type]('getCheckedRows', true);
            }
            else {
                gridTable = $("#" + control.name)[control.type]('getRows', true);
            }
            var keys = Object.keys(gridTable);
            table[keys[0]] = gridTable[keys[0]];
            var rt = {}
            rt[keys[0]] = cloneJSON(table[keys[0]]);
            return [true, keys[0], rt];
        }
        catch (err) {
            errorHandle(formName, 'getGridCondition', err);
        }
    }
    //檢核資料是否正確
    function checkValueOk(div, control, value) {
        try {
            var options = $.data(div, formName).options;
            var language = options.language;
            var msg = null;
            //檢核必要欄位
            var checkOptionGroup = function (control) {
                var flag = false;
                if (control.fieldRow['OptionGroup'.toUpperCase()] != null) {
                    var optionGroup = getRowByKeyValue(options.controls, 'fieldName', control.fieldRow['OptionGroup'.toUpperCase()] + '_1');
                    if (optionGroup != null) {
                        flag = $('#' + optionGroup.name)[optionGroup.type]('val');
                        if (flag == true && optionGroup.fieldRow['OptionGroup'.toUpperCase()] != null) {
                            flag = checkOptionGroup(optionGroup);
                        }
                    }
                    else {
                        //2020/11/20 Jacky 增加尋找tabIndx
                        for (var i = 0 ; i < options.controls.length; i++) {
                            var tControl = options.controls[i];
                            if (tControl.type == 'csTabs') {
                                var tabIdxControl = getRowByKeyValue(tControl.tabsId, 'fieldName', control.fieldRow['OptionGroup'.toUpperCase()]);
                                if (tabIdxControl != null) {
                                    flag = $('#' + tControl.name)[tControl.type]('val') == tabIdxControl.idx;
                                    if (flag == true && tControl.fieldRow['OptionGroup'.toUpperCase()] != null) {
                                        flag = checkOptionGroup(tControl);
                                    }
                                }
                            }
                        }
                    }
                }
                return flag;
            }
            if (isEmpty(value) && (control.fieldRow['MustBe'.toUpperCase()] == 1 &&
                    (control.fieldRow['OptionGroup'.toUpperCase()] == null || checkOptionGroup(control)))) {
                msg = language.mustBe.replace('{0}', control.headName);
                return [false, msg];
            }
            //檢核字串長度
            var dataLength = control.fieldRow['DataLength'.toUpperCase()];
            var valueLength = 0;
            if (value != null) { valueLength = value.length; }
            if (valueLength > 0 && dataLength != null) {
                var lens = dataLength.split(',');
                var vLenthB = 0;
                if (lens.length > 1) {
                    vLenthB = value.replace('.', '').lengthB();
                }
                else {
                    vLenthB = value.toString().lengthB();
                }
                if (vLenthB > lens[0]) {
                    msg = language.lengthToLong.replace('{0}', control.headName).replace('{1}', vLenthB.toString()).replace('{2}', lens[0].toString());
                    return [false, msg];
                }
            }
            return [true];
        }
        catch (err) {
            errorHandle(formName, 'checkValueOk', err);
        }
    };
    //檢核設定的檢核語法是否正確
    function checkSQLDataOk(div, action) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var mustCheck = false;
            for (var i = 0 ; i < controls.length; i++) {
                if (controls[i].fieldRow['ChkSQLQueryX'.toUpperCase()] == 1) {
                    mustCheck = true;
                    break;
                }
            }
            if (mustCheck == true) {
                getCheckSQLDataOk(div, function (data) {
                    action([data.ResultBoolean, data.ErrorMessage, data.ResultXML]);
                });
                //action([true, null]);
            }
            else {
                action([true, null]);
            }
        }
        catch (err) {
            errorHandle(formName, 'checkSQLDataOk', err);
        }
    };
    function getCheckSQLDataOk(div, action) {
        try {
            var options = $.data(div, formName).options;
            var data = $.extend({}, getParameterTable(div), options.condition);

            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                ProgramId: { type: 'string', value: options.programId },
                InDataStr: { type: 'string', value: cloneJSON(data) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'ChkSQLDataOk',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    action(data);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getCheckSQLDataOk', err);
        }
    }
    function getControlById(div, id) {
        var controls = $.data(div, formName).options.controls;
        for (var i = 0; i < controls.length; i++) {
            if (controls[i].name == id) {
                return controls[i];
            }
        }
    }
    function addHandlerGetConditionData(div) {
        $(div).on('keydown', function (e) {
            try {
                if (e.ctrlKey && e.which == 123) {
                    getQueryData(div, function (r) {
                        if (r[0] == true) {
                            messageBox(JSON.stringify(r[2], null, '\t'), null, null, null, { width: 800, height: 500 });
                        }
                    });
                }
            }
            catch (err) {
                errorHandle(utilityName, 'addHandlerGetParameters_keydown', err, true);
            }
        });
    }
    function init(div) {
        try {
            var options = $.data(div, formName).options;
            var sysProgramId = options.sysProgramId;
            var programId = options.programId;
            var settingData = options.settingData;
            addHandlerGetParameters(div, options);
            //取得條件
            addHandlerGetConditionData(div);
            if (settingData != null && Object.keys(settingData).length > 0) {
                refresh(div);
            }
            else {
                if (sysProgramId == null && programId == null) {
                    messageBox("no programId!!", messageType.critical);
                    return;
                }
                getSettingData(div, function () {
                    refresh(div);
                });
            }
            options.width = $(div).width();
            options.height = $(div).height();
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    //取得設定檔資料
    function getSettingData(div, action) {
        try {
            //ByVal loginInfo As loginInfo,
            //ByVal ProgramId As String,
            //ByVal SystemProgramId As String,
            var options = $.data(div, formName).options;
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var data = $.extend({}, options.parameters, getParameterTable(div));
            var parameters = $.extend({}, paraLoginInfo, {
                ProgramId: { type: 'string', value: options.programId },
                SystemProgramId: { type: 'string', value: options.sysProgramId },
                InData: { type: 'string', value: cloneJSON(data) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetConditionField2',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        deleteJSONObject(parameters);
                        deleteJSONObject(params);
                        if (data.ResultBoolean == true) {
                            //messageBox(JSON.stringify(data));
                            options.settingData = JSON.parse(data.ResultXML);
                            action();
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    }
                    catch (err) {
                        errorHandle(formName, 'getSettingData_success', err);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getSettingData', err);
        }
    };
    function getConditionType(div) {
        var options = $.data(div, formName).options;
        var settingData = options.settingData;

        var fieldtableName = Object.keys(settingData)[0];
        var datafieldTable = settingData[fieldtableName];
        return datafieldTable.rows[0]["CONDITIONTYPEA"];
    };
    function refresh(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            options.loading = true;
            options.programId = settingData[Object.keys(settingData)[0]].rows[0]['PROGRAMID'];

            var fieldtableName = Object.keys(settingData)[0];
            var datafieldTable = settingData[fieldtableName];

            if (datafieldTable.rows.length > 0) {
                options.fieldRows = datafieldTable.rows;
                if (datafieldTable.rows[0]["CONDITIONTYPEA"] == 1) {
                    createSingleCondition(div);
                    loadedProcess(div);
                }
                else {
                    options.isMultiCondition = true;
                    options.showBackground = datafieldTable.rows[0]["CONDITIONTYPEA"] == 2;
                    createMultiCondition(div);
                }
            }
            else {
                loadedProcess(div);
            }
        }
        catch (err) {
            errorHandle(htmlName, 'refresh', err);
        }
    };
    function loadedProcess(div) {
        try {
            //var myTime = setInterval(function () {
            //    formResize(div);
            //    clearInterval(myTime);
            //}, 1000);
            //formResize(div);
            var options = $.data(div, formName).options;
            if (options['loaded']) {
                options['loaded']();
            }
            options.loading = false;
            var e = $.Event("loaded");
            $(div).triggerHandler(e);
        }
        catch (err) {
            errorHandle(htmlName, 'loadedProcess', err);
        }
    };
    function refreshDefault(div, inData, action, noChange, noStep2, replaceParameters) {
        try {
            var options = $.data(div, formName).options;
            if (replaceParameters == true) {
                $.extend(options.parameters, inData);
            }
            options.stopEvent = true;
            var defaultStep2 = function () {
                var tData;
                if (options.parameters != null) {
                    tData = $.extend({}, options.parameters, inData);
                }
                else {
                    tData = inData;
                }
                for (var i = 0; i < options.controls.length; i++) {
                    var control = options.controls[i];
                    if (control.setValueName != null) {
                        var idx = Number(control.fieldName.substr(control.fieldName.length - 1)) - 1;
                        var value;
                        switch (control.type) {
                            case "csAddress3":
                                value = getAddress3FieldValue(div, control, tData);
                                break;
                            case "csMulti":
                                value = getMultiFieldValue(div, control, tData);
                                break;
                            default:
                                value = getFieldDefValue(div, control.fieldRow, idx, tData);
                                break;
                        }
                        if (value !== undefined) {
                            if (value === null && (control.type == 'jqxCheckBox' || control.type == 'jqxRadioButton')) {
                                value = false;
                            }
                            if (value === null) value = convertNullToString(value);
                            if (control.type == 'label') {
                                changeEnterToBr($('#' + control.name), null, control.fieldRow, value);
                            }
                            else {
                                $('#' + control.name)[control.type](control.setValueName, value);
                            }
                        }
                    }
                }
                options.stopEvent = false;
                action([true]);
            }

            var getDefaultData = function (doFields) {
                var data = {
                    Table: {
                        columns: [{ name: 'FIELDNAME', type: 'string' },
                            { name: 'FIELDVALUE', type: 'string' },
                        ],
                        rows: []
                    }
                };
                if (noChange == true) {
                    var table = inData[Object.keys(inData)[0]];
                    var cLength = table.columns.length;
                    for (var i = 0 ; i < cLength; i++) {
                        if (doFields.indexOf(table.columns[i]['name']) < 0) {
                            continue;
                        }
                        var value = table.rows[0][table.columns[i]['name']];
                        value = convertValueToString(value);
                        data.Table.rows.push({
                            FIELDNAME: table.columns[i]['name'],
                            FIELDVALUE: value
                        });
                    }
                }
                else {
                    for (var i = 0; i < options.controls.length; i++) {
                        var control = options.controls[i];
                        if (control.setValueName != null) {
                            if (doFields.indexOf(control.fieldRow["FIELDNAME"]) < 0) {
                                continue;
                            }
                            var idx = Number(control.fieldName.substr(control.fieldName.length - 1)) - 1;
                            switch (control.type) {
                                case "csAddress3":
                                    var values = getAddress3FieldValue(div, control, inData);
                                    var keys = Object.keys(values);
                                    for (var j = 0 ; j < keys.length; j++) {
                                        value = convertValueToString(values[keys[j]]);
                                        data.Table.rows.push({
                                            FIELDNAME: keys[j],
                                            FIELDVALUE: value
                                        });
                                    }
                                    break;
                                case "csMulti":
                                    var values = getMultiFieldValue(div, control, inData);
                                    if (values != null) {
                                        var keys = Object.keys(values);
                                        for (var j = 0 ; j < keys.length; j++) {
                                            value = convertValueToString(values[keys[j]]);
                                            data.Table.rows.push({
                                                FIELDNAME: keys[j],
                                                FIELDVALUE: value
                                            });
                                        }
                                    }
                                    break;
                                default:
                                    var value = getFieldDefValue(div, control.fieldRow, idx, inData);
                                    value = convertValueToString(value);
                                    data.Table.rows.push({
                                        FIELDNAME: control.fieldRow["FIELDNAME"],
                                        FIELDVALUE: value
                                    });
                                    break;
                            }
                        }
                    }
                }
                return data;
            }
            var settingData = options.settingData;
            var fieldtableName = Object.keys(settingData)[0];
            var fieldRows = settingData[fieldtableName].rows;
            var doArrays = chkHasValueChange(div, getRowFieldString(fieldRows, 'FIELDNAME', '', true), fieldRows);
            var doIt = doArrays[0];
            if (doIt == false) {
                if (noStep2 != true) {
                    //設定值
                    defaultStep2();
                }
                else {
                    options.stopEvent = false;
                    action([true]);
                }
                return;
            }
            var dData = getDefaultData(doArrays[1]);
            //2017/03/02 Jacky 改成一次取得過濾的資料
            getFilterChooseQuery2(div, dData, function (d) {
                delete dData;
                if (d != null) {
                    var doPro = [];
                    doPro.push(getValueReturnData("ChooseQuery", d));
                    doPro.push(getValueReturnData("DefaultValue", d));
                    doPro.push(getValueReturnData("ReadOnly", d));
                    var tmpData = $.extend({}, options.parameters, inData);
                    for (i = 0 ; i < doPro.length; i++) {
                        var keys = Object.keys(doPro[i]);
                        var kLength = keys.length;
                        for (var j = 0 ; j < kLength; j++) {
                            var fields = keys[j].split("_");
                            var table = {};
                            table[fields[0]] = doPro[i][keys[j]];
                            switch (i) {
                                case 0:
                                    filterQuery(div, fields[1], table, tmpData);
                                    break;
                                case 1:
                                    filterDefaultValue(div, fields[1], table, tmpData);
                                    break;
                                case 2:
                                    filterReadOnly(div, fields[1], table);
                                    break;
                            }
                        }
                    }
                    delete d;
                }
                if (noStep2 != true) {
                    //設定值
                    defaultStep2();
                }
                else {
                    options.stopEvent = false;
                    action([true]);
                }
            });
        }
        catch (err) {
            options.stopEvent = false;
            errorHandle(htmlName, 'refreshDefault', err);
        }
    };
    //function refreshDefault(div, inData, action, noChange, noStep2, replaceParameters) {
    //    try {
    //        var options = $.data(div, formName).options;
    //        if (replaceParameters == true) {
    //            $.extend(options.parameters, inData);
    //        }
    //        options.stopEvent = true;
    //        var defaultStep2 = function (action) {
    //            var tData;
    //            if (options.parameters != null) {
    //                tData = $.extend({}, options.parameters, inData);
    //            }
    //            else {
    //                tData = inData;
    //            }
    //            for (var i = 0; i < options.controls.length; i++) {
    //                var control = options.controls[i];
    //                if (control.setValueName != null) {
    //                    var idx = Number(control.fieldName.substr(control.fieldName.length - 1)) - 1;
    //                    var value;
    //                    switch (control.type) {
    //                        case "csAddress3":
    //                            value = getAddress3FieldValue(div, control, tData);
    //                            break;
    //                        case "csMulti":
    //                            value = getMultiFieldValue(div, control, tData);
    //                            break;
    //                        default:
    //                            value = getFieldDefValue(div, control.fieldRow, idx, tData);
    //                            break;
    //                    }
    //                    if (value !== undefined) {
    //                        if (value === null && (control.type == 'jqxCheckBox' || control.type == 'jqxRadioButton')) {
    //                            value = false;
    //                        }
    //                        if (value === null) value = convertNullToString(value);
    //                        if (control.type == 'label') {
    //                            changeEnterToBr($('#' + control.name), null, control.fieldRow, value);
    //                        }
    //                        else {
    //                            $('#' + control.name)[control.type](control.setValueName, value);
    //                        }
    //                    }
    //                }
    //            }
    //            options.stopEvent = false;
    //            action([true]);
    //        }

    //        var getDefaultData = function (doFields) {
    //            var data = {
    //                Table: {
    //                    columns: [{ name: 'FIELDNAME', type: 'string' },
    //                        { name: 'FIELDVALUE', type: 'string' },
    //                    ],
    //                    rows: []
    //                }
    //            };
    //            if (noChange == true) {
    //                var table = inData[Object.keys(inData)[0]];
    //                var cLength = table.columns.length;
    //                for (var i = 0 ; i < cLength; i++) {
    //                    if (doFields.indexOf(table.columns[i]['name']) < 0) {
    //                        continue;
    //                    }
    //                    var value = table.rows[0][table.columns[i]['name']];
    //                    value = convertValueToString(value);
    //                    data.Table.rows.push({
    //                        FIELDNAME: table.columns[i]['name'],
    //                        FIELDVALUE: value
    //                    });
    //                }
    //            }
    //            else {
    //                for (var i = 0; i < options.controls.length; i++) {
    //                    var control = options.controls[i];
    //                    if (control.setValueName != null) {
    //                        if (doFields.indexOf(control.fieldRow["FIELDNAME"]) < 0) {
    //                            continue;
    //                        }
    //                        var idx = Number(control.fieldName.substr(control.fieldName.length - 1)) - 1;
    //                        switch (control.type) {
    //                            case "csAddress3":
    //                                var values = getAddress3FieldValue(div, control, inData);
    //                                var keys = Object.keys(values);
    //                                for (var j = 0 ; j < keys.length; j++) {
    //                                    value = convertValueToString(values[keys[j]]);
    //                                    data.Table.rows.push({
    //                                        FIELDNAME: keys[j],
    //                                        FIELDVALUE: value
    //                                    });
    //                                }
    //                                break;
    //                            case "csMulti":
    //                                var values = getMultiFieldValue(div, control, inData);
    //                                if (values != null) {
    //                                    var keys = Object.keys(values);
    //                                    for (var j = 0 ; j < keys.length; j++) {
    //                                        value = convertValueToString(values[keys[j]]);
    //                                        data.Table.rows.push({
    //                                            FIELDNAME: keys[j],
    //                                            FIELDVALUE: value
    //                                        });
    //                                    }
    //                                }
    //                                break;
    //                            default:
    //                                var value = getFieldDefValue(div, control.fieldRow, idx, inData);
    //                                value = convertValueToString(value);
    //                                data.Table.rows.push({
    //                                    FIELDNAME: control.fieldRow["FIELDNAME"],
    //                                    FIELDVALUE: value
    //                                });
    //                                break;
    //                        }
    //                    }
    //                }
    //            }
    //            return data;
    //        }
    //        var settingData = options.settingData;
    //        var fieldtableName = Object.keys(settingData)[0];
    //        var fieldRows = settingData[fieldtableName].rows;
    //        var doArrays = chkHasValueChange(div, getRowFieldString(fieldRows, 'FIELDNAME', '', true), fieldRows);
    //        var doIt = doArrays[0];
    //        if (doIt == false) {
    //            if (noStep2 != true) {
    //                //設定值
    //                defaultStep2(function (r) {
    //                    action(r[0]);
    //                });
    //            }
    //            else {
    //                options.stopEvent = false;
    //                action([true]);
    //            }
    //            return;
    //        }
    //        var dData = getDefaultData(doArrays[1]);
    //        //2017/03/02 Jacky 改成一次取得過濾的資料
    //        var filterPro = function (div, dData, action) {
    //            getFilterChooseQuery2(div, dData, function (d) {
    //                if (d != null) {
    //                    var doPro = [];
    //                    doPro.push(getValueReturnData("ChooseQuery", d));
    //                    doPro.push(getValueReturnData("DefaultValue", d));
    //                    doPro.push(getValueReturnData("ReadOnly", d));
    //                    var tmpData = $.extend({}, options.parameters, inData);
    //                    for (i = 0 ; i < doPro.length; i++) {
    //                        var keys = Object.keys(doPro[i]);
    //                        var kLength = keys.length;
    //                        for (var j = 0 ; j < kLength; j++) {
    //                            var fields = keys[j].split("_");
    //                            var table = {};
    //                            table[fields[0]] = doPro[i][keys[j]];
    //                            switch (i) {
    //                                case 0:
    //                                    filterQuery(div, fields[1], table, tmpData);
    //                                    break;
    //                                case 1:
    //                                    filterDefaultValue(div, fields[1], table, tmpData);
    //                                    break;
    //                                case 2:
    //                                    filterReadOnly(div, fields[1], table);
    //                                    break;
    //                            }
    //                        }
    //                    }
    //                    delete d;
    //                }
    //                action(true);
    //            });
    //        }
    //        var address3Ok = function (action) {
    //            var addr3 = [];
    //            for (var i = 0; i < options.controls.length; i++) {
    //                var control = options.controls[i];
    //                if (control.type == "csAddress3") {
    //                    addr3.push(control);
    //                }
    //            }
    //            if (addr3.length == 0) {
    //                action(true);
    //            }
    //            else {
    //                var ttt = setInterval(function () {
    //                    var count = 0;
    //                    for (var i = 0; i < addr3.length; i++) {
    //                        var addrOpts = $("#" + addr3[i].name).csAddress3("options");
    //                        if (addrOpts.addrSortData != null) {
    //                            count += 1;
    //                        }
    //                    }
    //                    if (count == addr3.length) {
    //                        clearInterval(ttt);
    //                        action(true);
    //                    }
    //                }, 50);

    //            }
    //        }
    //        if (noStep2 != true) {
    //            filterPro(div, dData, function (r) {
    //                delete dData;
    //                //設定值
    //                defaultStep2(function (r) {
    //                    if (r[0] == true) {
    //                        //2019/04/17 Jacky 檢核地址元件是否OK
    //                        address3Ok(function (r) {
    //                            var doArrays = chkHasValueChange(div, getRowFieldString(fieldRows, 'FIELDNAME', '', true), fieldRows);
    //                            var dData = getDefaultData(doArrays[1]);
    //                            filterPro(div, dData, function (r) {
    //                                delete dData;
    //                                action([true]);
    //                            });
    //                        });
    //                    }
    //                });
    //            });
    //        }
    //        else {
    //            filterPro(div, dData, function (r) {
    //                delete dData;
    //                options.stopEvent = false;
    //                action([true]);
    //            });
    //        }
    //    }
    //    catch (err) {
    //        options.stopEvent = false;
    //        errorHandle(htmlName, 'refreshDefault', err);
    //    }
    //};
    function getMultiFieldValue(div, control, inData, fieldRow) {
        try {
            var retValue;
            var tFieldRow = fieldRow;
            if (tFieldRow == null) {
                tFieldRow = control.fieldRow;
            }
            if (tFieldRow["DefaultValue".toUpperCase()] != null && tFieldRow["DefaultValue".toUpperCase()].toUpperCase().indexOf('SELECT ') < 0) {
                retValue = {
                    displayValue: null, displayOrd: null
                };
                var oDefaultValue = tFieldRow["DefaultValue".toUpperCase()];
                if (oDefaultValue.indexOf(";") < 0) {
                    var value = getFieldDefValue(div, tFieldRow, 0, inData);
                    retValue["displayValue"] = value;
                }
                else {
                    var defaults = oDefaultValue.split(";");
                    var keys = Object.keys(retValue);
                    for (var i = 0 ; i < defaults.length; i++) {
                        var values = defaults[i].split("=");
                        tFieldRow["DefaultValue".toUpperCase()] = values[1];
                        var value = getFieldDefValue(div, tFieldRow, 0, inData);
                        for (var j = 0; j < keys.length; j++) {
                            if (keys[j].toUpperCase() == values[0].replace(/(?:\r\n|\r|\n|" ")/g, '').toUpperCase()) {
                                retValue[keys[j]] = value;
                                break;
                            }
                        }
                    }
                    tFieldRow["DefaultValue".toUpperCase()] = oDefaultValue;
                }
            }
            return retValue;
        }
        catch (err) {
            errorHandle(htmlName, 'getMultiFieldValue', err);
        }
    }
    function getAddress3FieldValue(div, control, inData, fieldRow) {
        try {
            var retValue;
            var tFieldRow = fieldRow;
            if (tFieldRow == null) {
                tFieldRow = control.fieldRow;
            }
            if (tFieldRow["DefaultValue".toUpperCase()] != null && tFieldRow["DefaultValue".toUpperCase()].toUpperCase().indexOf('SELECT ') < 0) {
                retValue = {
                    cityCode: null, areaCode: null,
                    strtCode: null, ord: null,
                    lin: null, section: null, lane: null,
                    alley: null, alley2: null,
                    no1A: null, no2A: null, no1B: null, no2B: null,
                    flourA: null, flourB: null, noE: null
                };
                var oDefaultValue = tFieldRow["DefaultValue".toUpperCase()];
                var defaults = oDefaultValue.split(";");
                var keys = Object.keys(retValue);
                for (var i = 0 ; i < defaults.length; i++) {
                    var values = defaults[i].split("=");
                    tFieldRow["DefaultValue".toUpperCase()] = values[1];
                    var value = getFieldDefValue(div, tFieldRow, 0, inData);
                    for (var j = 0; j < keys.length; j++) {
                        if (keys[j].toUpperCase() == values[0].replace(/(?:\r\n|\r|\n|" ")/g, '').toUpperCase()) {
                            retValue[keys[j]] = value;
                            break;
                        }
                    }
                }
                tFieldRow["DefaultValue".toUpperCase()] = oDefaultValue;
            }
            return retValue;
        }
        catch (err) {
            errorHandle(htmlName, 'getAddress3FieldValue', err);
        }
    }
    function getOptionGroupCount(fieldRow, fieldRows) {
        var count = 0;
        for (var i = 0; i < fieldRows.length; i++) {
            if (fieldRow['fieldName'.toUpperCase()] == fieldRows[i]["OptionGroup".toUpperCase()]) {
                count += 1;
            }
        }
        return count;
    };
    //建立單一條件的動態條件
    function createSingleCondition(div) {
        try {
            var options = $.data(div, formName).options;
            var radioControls = options.radioControls;
            var settingData = options.settingData;

            var fieldtableName = Object.keys(settingData)[0];
            var fieldRows = settingData[fieldtableName].rows;
            //先將所有Rows 都畫出來
            var paintData = paintDIVRows(div, fieldRows, div, null, 1, '40%');
            paintData[0].css({ 'margin': 2, width: '99%', "padding-top": "5px" });
            var allRowData = paintData[1];
            //放條件的table
            var controlsTable = getControlDIV($(div));
            controlsTable.css({ 'width': '50%', 'height': '55%' });
            var contentId = $(div).prop('id') + radioContendId;
            controlsTable.prop('id', contentId);
            var optionGroupTable = [];
            for (var i = 0; i < fieldRows.length; i++) {
                var fieldRow = fieldRows[i];
                if (fieldRow["OptionGroup".toUpperCase()] == null) {
                    var sameColumnData = getColumnWidth(div, fieldRows[0], fieldRows, true);
                    var divCol = $('<div></div>').appendTo(allRowData[fieldRows[i]["RowPos".toUpperCase()]]['rowObj']);
                    divCol.css('width', sameColumnData.width);
                    divCol.css('height', '100%');
                    divCol.css('float', 'left');

                    var radioName = $(div).prop('id') + 'r_' + i.toString()
                    //<div style='margin-top: 10px;' id='jqxRadioButton'>12 Months Contract</div>
                    var radioObj = $('<div data-controltype="radio" id="' + radioName + '">' + fieldRow["HEADNAME"] + '</div>').appendTo(divCol)
                    radioObj.css({ "margin-top": 5 });
                    radioObj.jqxRadioButton({
                        theme: options.theme,
                        groupName: $(div).prop('id')
                    });
                    radioControls.push({ name: radioName, type: 'jqxRadioButton', level: 0 });

                    $("#" + radioName).on('checked', function () {
                        try {
                            destroyControls(options.controls);
                            $('#' + contentId).children().remove();
                            var fieldRow;
                            var idArray = $(this).attr('id').split('_');
                            var idx = idArray[idArray.length - 1];
                            fieldRow = fieldRows[idx];
                            var setRadioColor = (function (radio) {
                                $(div).find('[data-controltype=radio]').css('color', '');
                                $(radio).css('color', 'red');
                            });
                            setRadioColor(this);
                            switch (fieldRow["OBJECTTYPE"]) {
                                //case 5:
                                //case 6:
                                case 8:
                                case 9:
                                case 10:
                                case 38:
                                case 39:
                                case 40:
                                    controlsTable.css('width', '99.5%');
                                    break;
                                default:
                                    controlsTable.css('width', '50%');
                                    break;
                            }
                            addConditionControls(div, fieldRow, controlsTable, null, true);
                            //focus 到第1個元件
                            if (options.controls && options.controls.length > 0) {
                                $('#' + options.controls[0].name)[options.controls[0].type]('focus');
                            }
                            //將Table 清除
                            $.each(optionGroupTable, function (idx, val) {
                                val.children().remove();
                                val.remove();
                            });
                            optionGroupTable = [];
                            var optionGroupCount = getOptionGroupCount(fieldRow, fieldRows);
                            //將OptionGroup 有值的元件加入
                            if (optionGroupCount > 0) {
                                controlsTable.css('width', Math.floor(100 / (optionGroupCount + 1)) + '%');
                                controlsTable.css('float', 'left');
                                for (var i = 0 ; i < fieldRows.length; i++) {
                                    if (fieldRow['fieldName'.toUpperCase()] == fieldRows[i]["OptionGroup".toUpperCase()]) {
                                        var oId = $(div).prop('id') + 'ro' + fieldRows[i]['OptionGroup'.toUpperCase()];
                                        optionGroupTable.push($('<table id="' + oId + '" style="float:left;width:' + Math.floor(100 / (optionGroupCount + 1)) + '%;"></table>').appendTo($(div)));
                                        addConditionControls(div, fieldRows[i], optionGroupTable[optionGroupTable.length - 1], 2, true);
                                    }
                                }
                            }
                            formResize(div);
                        }
                        catch (err) {
                            errorHandle(htmlName, "createSingleConditionObj_radioChecked", err);
                        }
                    });

                    var defFocus = fieldRow["DefFocus".toUpperCase()];
                    if (defFocus != null && defFocus != undefined) {
                        if (defFocus == 1) {
                            $("#" + radioName).jqxRadioButton('check');
                        }
                    }

                }
                //myControls[fieldRow["FIELDNAME"]].addEventListener("select", radiofunc());
            }
            return true;
        }
        catch (err) {
            errorHandle(htmlName, "createSingleCondition", err);
        }
    };
    function getFieldRows(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var fieldtableName = Object.keys(settingData)[0];
            var fieldRows = settingData[fieldtableName].rows;
            return fieldRows;
        }
        catch (err) {
            errorHandle(htmlName, "getFieldRows", err);
        }
    }
    function triggerMultiLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.isMultiCondition != true || options.beginCheckLoaded != true) { return; }
            if ((new Date() - options.initBeginTime) > 5000) {
                return;
            }
            var keys = Object.keys(options.controlLoaded);
            for (var i = 0 ; i < keys.length; i++) {
                if (options.controlLoaded[keys[i]] != true) {
                    return;
                }
            }
            controlDefValueChange(div, function () {
                for (var i = 0 ; i < options.controls.length; i++) {
                    var control = options.controls[i];
                    if (control.fieldRow['DefFocus'.toUpperCase()] == 1 && control.name.indexOf('_1') >= 0) {
                        $("#" + control.name)[control.type]('focus');
                        if (control.type == 'csDateTime') { $("#" + control.name + ' input').select(0); }
                    }
                }
                setConditionData(div);
                loadedProcess(div);
            });
        }
        catch (err) {
            errorHandle(htmlName, "createMultiCondition", err);
        }
    }
    //建立複合條件的動態條件
    function createMultiCondition(div, action) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            options.initBeginTime = new Date();
            var tableId = $(div).prop('id') + getUniqueId();
            //var uiTable = $('<table cellpadding="0" cellspacing="0" style="width:100%;margin:1px;"></table>').appendTo($(div));
            options.stopEvent = true;
            var fieldtableName = Object.keys(settingData)[0];
            var fieldRows = settingData[fieldtableName].rows;
            subMultiCondition(div, fieldRows, div);
            options.stopEvent = false;
            options.beginCheckLoaded = true;
            triggerMultiLoaded(div);
            return true;
        }
        catch (err) {
            errorHandle(htmlName, "createMultiCondition", err);
        }
    }
    //function paintRows(div, fieldRows, container, groupBoxName, level, height) {
    //    try {
    //        var allRowData = getAllRowData(div, groupBoxName, fieldRows);
    //        if (!container) { container = $('body'); }
    //        var rowsTable = getControlTable(container);
    //        if (level > 0) {
    //            rowsTable.css('height', '100%');
    //            rowsTable.css('width', '100%');
    //        }
    //        if (height != null) {
    //            rowsTable.css('height', height);
    //        }
    //        for (var i = 0; i < allRowData.length; i++) {
    //            var marginTop = '';
    //            if (i != 0) {
    //                marginTop = 'margin-top:1px;';
    //            }
    //            //先切table rows
    //            var tr = $('<tr style="width:100%;' + marginTop + '" data-rowidx="' + i + '"></tr>').appendTo(rowsTable);
    //            tr.css('height', (allRowData[i]['height'] * 100).toString() + "%");
    //            //tr.css('height', defaultHeight);
    //            var td = $('<td style="width:100%;"></td>').appendTo(tr);
    //            allRowData[i]['rowObj'] = td;
    //        }
    //        return [rowsTable, allRowData];
    //    }
    //    catch (err) {
    //        errorHandle(htmlName, "paintRows", err);
    //    }
    //}
    function paintDIVRows(div, fieldRows, container, groupBoxName, level, height) {
        try {
            var options = $.data(div, formName).options;
            var allRowData = getAllRowData(container, groupBoxName, fieldRows);
            if (!container) { container = $('body'); }
            var rowsDIV = $('<div style="border:0;margin:0;padding:0;width:99.9%;height:99%;"></div>').appendTo(container);
            if (level > 0) {
                rowsDIV.css('height', '100%');
                rowsDIV.css('width', '100%');
            }
            if (height != null) {
                rowsDIV.css('height', height);
            }
            if (options.showBackground == true) {
                var v = $("<div style='display:none;'></div>").appendTo("body");
                v.addClass("jqx-widget");
                v.addClass("jqx-widget-" + options.theme);
                v.addClass("jqx-grid-cell");
                v.addClass("jqx-grid-cell-" + options.theme);
                v.addClass("jqx-item");
                v.addClass("jqx-item-" + options.theme);
                v.addClass("jqx-grid-cell-alt");
                v.addClass("jqx-grid-cell-alt-" + options.theme);
                var backGroundColor = v.css("background-color");
                var borderColor = v.css("border-top-color");
                var color = v.css("color");
                v.remove();
                rowsDIV.css({
                    'background': backGroundColor,
                    'border-color': borderColor,
                    //'color': color,
                    'border-width': 1,
                    'border-style': "solid"
                });
            }
            for (var i = 0; i < allRowData.length; i++) {
                var marginTop = '';
                //if (i != 0) {
                //    marginTop = 'margin-top:1px;';
                //}
                //先切table rows
                var child = $('<div style="width:100%;float:left;' + marginTop + '" data-rowidx="' + i + '"></div>').appendTo(rowsDIV);
                var height;
                if (allRowData[i]['heightType'] == 0) {
                    height = (allRowData[i]['height'] * 100).toString() + "%";
                }
                else {
                    height = allRowData[i]['height'];
                    if (height < 26) {
                        height = 26;
                    }
                }
                if (options.showBackground == true) {
                    //jqx-grid-column-header jqx-grid-column-header-ui-redmond jqx-widget-header jqx-widget-header-ui-redmond
                    //jqx-grid-cell jqx-grid-cell-ui-redmond jqx-item jqx-item-ui-redmond jqx-grid-cell-alt jqx-grid-cell-alt-ui-redmond
                    var v = $("<div style='display:none;'></div>").appendTo("body");
                    v.addClass("jqx-widget");
                    v.addClass("jqx-widget-" + options.theme);
                    v.addClass("jqx-grid-cell");
                    v.addClass("jqx-grid-cell-" + options.theme);
                    v.addClass("jqx-item");
                    v.addClass("jqx-item-" + options.theme);
                    //if (i % 2 == 1) {
                    v.addClass("jqx-grid-cell-alt");
                    v.addClass("jqx-grid-cell-alt-" + options.theme);
                    //}
                    var backGroundColor = v.css("background-color");
                    var borderColor = v.css("border-top-color");
                    var color = v.css("color");
                    v.remove();
                    child.css({
                        'background': backGroundColor,
                        'border-color': borderColor,
                        //'color': color,
                        'border-width': 1,
                        'border-style': "solid"
                    });
                }
                child.css('height', height);
                allRowData[i]['rowObj'] = child;
            }
            return [rowsDIV, allRowData];
        }
        catch (err) {
            errorHandle(htmlName, "paintDIVRows", err);
        }
    }
    function subMultiCondition(div, fieldRows, container, groupBoxName, level, parentControl) {
        try {
            var options = $.data(div, formName).options;
            var allRowData = paintDIVRows(div, fieldRows, container, groupBoxName, level)[1];
            var focusObj;
            for (var i = 0; i < fieldRows.length; i++) {
                if (fieldRows[i]["GroupBoxName".toUpperCase()] == groupBoxName) {
                    var sameColumnData = getColumnWidth(div, fieldRows[i], fieldRows);
                    if (allRowData[fieldRows[i]["RowPos".toUpperCase()]] != null && allRowData[fieldRows[i]["RowPos".toUpperCase()]]['rowObj'] != null) {
                        var divCol = $('<div></div>').appendTo(allRowData[fieldRows[i]["RowPos".toUpperCase()]]['rowObj']);
                        divCol.css({
                            'width': sameColumnData.width,
                            'height': '100%',
                            'float': 'left',
                            'margin-top': 1
                        });
                        //var controlsTable = getControlDIV(divCol);
                        //addConditionControls(div, fieldRows[i], controlsTable, level, false, parentControl);
                        addConditionControls(div, fieldRows[i], divCol, level, false, parentControl);
                        var tmpGroupBoxName = groupBoxName;
                        if (tmpGroupBoxName == null) tmpGroupBoxName = headGroupName;
                        if (options.groupControls[tmpGroupBoxName] == null) options.groupControls[tmpGroupBoxName] = [];
                        options.groupControls[tmpGroupBoxName].push(fieldRows[i]);
                    }
                }
                //var defFocus = fieldRows[i]["DefFocus".toUpperCase()];
                //if (defFocus != null && defFocus != undefined) {
                //    if (defFocus == 1) {
                //        var oId = $(div).prop('id') + '_' + fieldRows[i]["FIELDNAME"] + '_1';
                //        focusObj = getRowByKeyValue(options.controls, 'name', oId);
                //    }
                //}
            }
            //if (groupBoxName == null && focusObj != null) {
            //    $("#" + focusObj.name)[focusObj.type]('focus')
            //};
        }
        catch (err) {
            errorHandle(htmlName, "subMultiCondition", err);
        }
    };
    function setConditionData(div, noChange) {
        try {
            var options = $.data(div, formName).options;
            if (options.conditionData != null && Object.keys(options.conditionData).length > 0) {
                var rows = options.conditionData["condition"].rows;
                for (var i = 0; i < rows.length; i++) {
                    var control = getRowByKeyValue(options.controls, "fieldName", rows[i]["FIELDNAME"]);
                    if (control != null) {
                        var value = rows[i]["FIELDVALUE"];
                        if (value != null) {
                            control.fieldRow["PreDefaultValue".toUpperCase()] = value;
                        }
                        switch (control.type) {
                            case "jqxRadioButton":
                            case "jqxCheckBox":
                                if (value == 1) {
                                    value = true;
                                }
                                else {
                                    value = false;
                                }
                                $("#" + control.name)[control.type](control.setValueName, value);
                                break;
                            case "csAddress3":
                                //value = getAddress3FieldValue(div, control, null, tFieldRow);
                                break;
                            case "csMulti":
                                //var tFieldRow = cloneJSON(control.fieldRow);
                                if (value != null) {
                                    value = value.replace(/\'/g, "");
                                }
                                //tFieldRow["DEFAULTVALUE"] = value;
                                //value = getMultiFieldValue(div, control, null, tFieldRow);
                                //delete tFieldRow;
                                if (noChange == true) {
                                    $("#" + control.name).find('input[data-cscc="txtcsCC3"]').val(rows[i]["FIELDDESC"]);
                                }
                                else {
                                    $("#" + control.name)[control.type](control.setValueName, value);
                                }
                                break;
                            case "csDateTime":
                                $("#" + control.name)[control.type](control.setValueName, strToDateTime(value, "datetime2"));
                                break;
                            case "csList":
                                if (noChange == true) {
                                    $("#" + control.name)[control.type]('setDisplayValue', { CODENO: value, DESCRIPTION: rows[i]["FIELDDESC"] });
                                }
                                else {
                                    $("#" + control.name)[control.type](control.setValueName, value);
                                }
                                break;
                            default:
                                $("#" + control.name)[control.type](control.setValueName, value);
                        }
                    }
                }
            }
        }
        catch (err) {
            errorHandle(htmlName, "subMultiCondition", err);
        }
    }
    function controlDefValueChange(div, action) {
        try {
            var options = $.data(div, formName).options;
            var rows = [];
            var columns = [];
            for (var i = 0; i < options.controls.length; i++) {
                var control = options.controls[i];
                if (control.setValueName != null) {
                    var getValueName = control.getValueName;
                    if (getValueName == null) getValueName = control.setValueName;
                    if (control.type != 'label') {
                        var value = $('#' + control.name)[control.type](getValueName);
                    }
                    else {
                        var value = $('#' + control.name).text();
                    }
                    if (isEmpty(value) == false) {
                        if (rows.length == 0) rows.push({});
                        columns.push({ name: control.fieldRow["FIELDNAME"], type: 'string' });
                        rows[0][control.fieldRow["FIELDNAME"]] = convertToNull(value);
                    }
                }
            }
            var table = { 'Table': { columns: columns, rows: rows } };
            refreshDefault(div, table, function (r) {
                action(true);
            }, true, (Object.keys(options.parameters).length == 0));
        }
        catch (err) {
            errorHandle(htmlName, "controlDefValueChange", err);
        }
    }
    //function controlDefValueChange(div, action) {
    //    try {
    //        var options = $.data(div, formName).options;
    //        var isOk = [];
    //        var mustControls = [];
    //        var retAction = (function (idx, flag) {
    //            isOk[idx] = true;
    //            for (var i = 0; i < isOk.length; i++) {
    //                if (isOk[i] == null) return;
    //            }
    //            delete mustControls;
    //            action(true);
    //        });
    //        for (var i = 0; i < options.controls.length; i++) {
    //            var control = options.controls[i];
    //            if (control.setValueName != null) {
    //                var getValueName = control.getValueName;
    //                if (getValueName == null) getValueName = control.setValueName;
    //                if (control.type != 'label') {
    //                    var value = $('#' + control.name)[control.type](getValueName);
    //                }
    //                else {
    //                    var value = $('#' + control.name)[getValueName];
    //                }
    //                if (isEmpty(value) == false) {
    //                    isOk.push(null);
    //                    mustControls.push({ field: control.fieldRow["FIELDNAME"], value: value });
    //                }
    //            }
    //        }
    //        var valueChangeX = (function (field, value, i, vAction) {
    //            valueChange(div, field, value, function () {
    //                vAction(i, true);
    //            });
    //        });
    //        if (isOk.length == 0) action(true);
    //        else {
    //            for (var i = 0; i < mustControls.length; i++) {
    //                valueChangeX(mustControls[i].field, mustControls[i].value, i, retAction);
    //                //valueChange(div, mustControls[i].field, mustControls[i].value, retAction);
    //            }
    //        }
    //    }
    //    catch (err) {
    //        errorHandle(htmlName, "controlDefValueChange", err);
    //    }
    //}
    function getControlDIV(container) {
        var table = $('<div style="border:0;margin:0;padding:0;width:99.9%;height:99%;"></div>');
        if (container) { table.appendTo(container); }
        return table;
    }
    function getControlTable(container) {
        var table = $('<table border="0" cellpadding="0" cellspacing="0" style="border:0;margin:0;padding:0;width:99.9%;height:99%;"></table>');
        if (container) { table.appendTo(container); }
        return table;
    }
    //建立動態條件的元件
    function addConditionControls(div, fieldRow, controlsTable, level, isSingle, parentControl, justControl) {
        try {
            if (!level) { level = 0; }
            switch (fieldRow["OBJECTTYPE"]) {
                case 1: //1=數字
                case 33: //33=數字(可KEY負數)
                    addNumberInput(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 2: //2=日期(yyyy/MM/dd) 
                case 3: //3=日期時間(yyyy/MM/dd HH:mm)
                case 17:    //17=日期時間(yyyy/MM/dd HH:mm:ss)
                case 23:    //23=日期(yyyy/MM)
                case 24:    //24=日期(yyyy)
                case 36:    //36=時間(HH:mm)
                    addDateTimeInput(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 4: //4=ComboBox  
                    addCombobox(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 5: //5=多欄單選(List)  
                    addList(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 6: //6=多選(MultiSelect) 22=多選(有順序)
                case 22:
                case 28:    //28=多選(MultiSelect ReadOnly)
                    addMultiSelect(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 7:     //7=是否(CheckBox)
                case 31:    //31=是否執行動態程式(CheckBox)
                    addCheckbox(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 8:     //8=地址元件1
                case 38:    //38=地址元件1(裝機)
                    addAddress1(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 9:     //9=地址元件2
                case 39:    //39=地址元件2(裝機)
                    addAddress2(div, fieldRow, controlsTable, level, isSingle, parentControl, justControl);
                    break;
                case 10:    //10=地址元件3
                case 40:    //40=地址元件3(裝機)
                    addAddress3(div, fieldRow, controlsTable, level, isSingle, parentControl, justControl);
                    break;
                case 11:    //11=備註
                    addMemoInput(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 16:    //16=說明
                    addComment(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 12:    //12=GroupBox
                    addGroupBox(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 13:    //13=TabControl
                case 29:    //29=TabControl 事後建立
                    addTabs(div, fieldRow, controlsTable, level, parentControl, justControl);
                case 14:    //14=TabItem
                    break;
                case 15:    //15=RadioButton
                    addRadioButton(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 18:    //18=上傳檔案(File)
                case 19:    //19=上傳檔案(DataTable)
                case 32:    //32=上傳檔案(File不改檔名)
                    addUploadFile(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 20:    //20=下載檔案
                case 21:    //21= HyperLink
                    addDownloadFile(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 25:    //25=PD Edit
                    addPWInput(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 30:    //30=i秘書(子檔)
                case 43:    //43=i秘書(瀏覽)
                case 44:    //44=i秘書(DataTable)
                    addDynamicGrid(div, fieldRow, controlsTable, level, isSingle, parentControl, justControl);
                    break;
                case 26:    //26 = 加密TextEdit
                    addInput(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 27:    //27 = 加密PD Edit
                    addPWInput(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 35:
                    addColorPicker(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                case 41:    //41,42 動態更新瀏覽
                case 42:
                    addDynUpdateGrid(div, fieldRow, controlsTable, level, isSingle, parentControl, justControl);
                    break;
                case 45:    //45 動態查詢瀏覽
                    addDynConditionGrid(div, fieldRow, controlsTable, level, isSingle, parentControl, justControl);
                    break;
                case 46:    //46 按鈕
                    addButton(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
                default:
                    addInput(div, fieldRow, controlsTable, level, parentControl, justControl);
                    break;
            }
        }
        catch (err) {
            errorHandle(htmlName, "addConditionControls", err);
        }
    }
    function focusOptionGroup(div, control) {
        var realControl = $("#" + control.name);
        switch (control.type) {
            case "csList": case "csMulti":
                realControl = $("#" + control.name + " input");
                break;
        }
        realControl.on("focus", function () {
            try {
                var options = $.data(div, formName).options;
                if (options.loading == true) { return; }
                if (control.fieldRow["optionGroup".toUpperCase()] != null) {
                    var optionGroup = getRowByKeyValue(options.controls, 'fieldName', control.fieldRow['OptionGroup'.toUpperCase()] + '_1');
                    if (optionGroup != null && optionGroup.type == "jqxRadioButton") {
                        if ($("#" + optionGroup.name)[optionGroup.type]("val") != true) {
                            $("#" + optionGroup.name)[optionGroup.type]("val", true);
                        }
                    }
                }
            }
            catch (err) {
                errorHandle(htmlName, "focusOptionGroup_focus", err);
            }
        });
    }
    function getAllRowData(container, groupBoxName, fieldRows) {
        try {
            var values = [];
            var totalHeight = 0;
            var MaxRowPos = 0;
            var hasType1 = false;
            for (var i = 0; i < fieldRows.length; i++) {
                if (fieldRows[i]["GroupBoxName".toUpperCase()] == groupBoxName &&
                    fieldRows[i]["isHide".toUpperCase()] != 2) {
                    var Row = fieldRows[i]["RowPos".toUpperCase()];
                    if (values.length <= Row) {
                        if (fieldRows[i]["HeightType".toUpperCase()] == 0) {
                            //如果值為0則改成1
                            var tHeight = fieldRows[i]["Height".toUpperCase()];
                            if (tHeight == 0) { tHeight = 1; }
                            values.push({
                                height: tHeight,
                                heightType: 0
                            });
                            totalHeight += tHeight;
                        }
                        else {
                            values.push({
                                height: fieldRows[i]["Height".toUpperCase()],
                                heightType: 1
                            });
                            hasType1 = true;
                        }
                    }
                    if (MaxRowPos < Row) {
                        MaxRowPos = Row;
                    }
                }
            }
            for (var i = 0; i < values.length; i++) {
                if (values[i]['heightType'] == 0) {
                    if (hasType1 == true) {
                        values[i]['heightType'] = 1;
                        values[i]["height"] = (Math.floor(values[i]['height'] / totalHeight * 1000) / 1000) * $(container).height();
                    }
                    else {
                        var rHeight = (Math.floor(values[i]['height'] / totalHeight * 1000) / 1000);
                        //不能為100%不然會長捲軸
                        if (rHeight == values[i]["height"] / totalHeight) {
                            values[i]["height"] = (Math.floor(values[i]['height'] / totalHeight * 995) / 1000);
                        }
                        else {
                            values[i]["height"] = (Math.floor(values[i]['height'] / totalHeight * 1000) / 1000);
                        }
                    }
                    //values[i]["height"] = (Math.floor(values[i]['height'] / totalHeight * 100) / 100);
                }
            }
            return values;
        }
        catch (err) {
            errorHandle(htmlName, "getAllRowData", err);
        }
    }
    function getColumnWidth(div, fieldRow, fieldRows, filterOptionGroup) {
        try {
            var values = {};
            var totalPerWidth = 0;
            var totalWidth = 0;
            var groupBoxName = fieldRow["GroupBoxName".toUpperCase()];
            if (filterOptionGroup == null) { filterOptionGroup = false; }
            if (fieldRow["WidthType".toUpperCase()] == 1) {
                values["width"] = fieldRow["Width".toUpperCase()] + "px";
            }
            else {
                var fLength = fieldRows.length;
                for (var i = 0; i < fLength; i++) {
                    if (fieldRows[i]["GroupBoxName".toUpperCase()] == fieldRow["GroupBoxName".toUpperCase()] &&
                        !(filterOptionGroup == true && fieldRows[i]["OptionGroup".toUpperCase()] != null) &&
                        fieldRows[i]["isHide".toUpperCase()] != 2) {
                        if (fieldRows[i]["RowPos".toUpperCase()] == fieldRow["RowPos".toUpperCase()]) {
                            if (fieldRows[i]["WidthType".toUpperCase()] == 0) {
                                //如果值為0則改成1
                                var tWidth = fieldRows[i]["Width".toUpperCase()];
                                if (tWidth == 0) { tWidth = 1; }
                                totalPerWidth += tWidth;
                            }
                            else {
                                totalWidth += fieldRows[i]["Width".toUpperCase()];
                            }
                        }
                    }
                }
            }
            if (values["width"] == null && totalPerWidth > 0) {
                var tWidth = fieldRow["Width".toUpperCase()];
                if (tWidth == 0) { tWidth = 1; }
                if (totalWidth > 0) {
                    var minusWidth = 2;
                    if (groupBoxName != null) {
                        minusWidth = getMinusWidth($(getGroupBoxObj(div, groupBoxName))) + 1;
                    }
                    values["width"] = Math.floor((tWidth / totalPerWidth * $(getGroupBoxObj(div, groupBoxName)).width()) - totalWidth - minusWidth).toString() + "px";
                }
                else {
                    values["width"] = Math.floor(tWidth / totalPerWidth * 100).toString() + "%";
                }
            }
            if (values["width"] == null) { values["width"] = "0"; }
            return values;
        }
        catch (err) {
            errorHandle(htmlName, "getColumnWidth", err);
        }
    }
    function getRowHeight(div, fieldRow, fieldRows, filterOptionGroup) {
        try {
            var values = {};
            var totalPerHeight = 0;
            var totalHeight = 0;
            var groupBoxName = fieldRow["GroupBoxName".toUpperCase()];
            if (filterOptionGroup == null) { filterOptionGroup = false; }
            if (fieldRow["HeightType".toUpperCase()] == 1) {
                values["height"] = fieldRow["Height".toUpperCase()] + "px";
            }
            else {
                var fLength = fieldRows.length;
                for (var i = 0; i < fLength; i++) {
                    if (fieldRows[i]["GroupBoxName".toUpperCase()] == groupBoxName &&
                        !(filterOptionGroup == true && fieldRows[i]["OptionGroup".toUpperCase()] != null) &&
                        fieldRows[i]["isHide".toUpperCase()] != 2) {
                        if (fieldRows[i]["ColumnPos".toUpperCase()] == 0) {
                            if (fieldRows[i]["HeightType".toUpperCase()] == 0) {
                                //如果值為0則改成1
                                var tHeight = fieldRows[i]["Height".toUpperCase()];
                                if (tHeight == 0) { tHeight = 1; }
                                totalPerHeight += tHeight;
                            }
                            else {
                                totalHeight += fieldRows[i]["Height".toUpperCase()];
                            }
                        }
                    }
                }
            }
            if (values["height"] == null && totalPerHeight > 0) {
                var tHeight = fieldRow["Height".toUpperCase()];
                if (tHeight == 0) { tHeight = 1; }
                values["height"] = Math.floor((tHeight / totalPerHeight * $(getGroupBoxObj(div, groupBoxName)).height()) - totalHeight - 2).toString() + "px";
                //if (totalHeight > 0) {
                //    values["height"] = Math.floor((tHeight / totalPerHeight * $(getGroupBoxObj(div, groupBoxName)).height()) - totalHeight - 2).toString() + "px";
                //}
                //else {
                //    values["height"] = Math.floor(tHeight / totalPerHeight * 100).toString() + "%";
                //}
            }
            return values;
        }
        catch (err) {
            errorHandle(htmlName, "getRowHeight", err);
        }
    }
    function getGroupBoxObj(div, groupBoxName) {
        if (groupBoxName == null) {
            return $(div);
        }
        else {
            var o = $('#' + $(div).prop('id') + "_" + groupBoxName + "_1");
            if (o.hasClass("jqx-expander")) {
                return $(o.find('.jqx-expander-content')[0]);
            }
            else {
                return o;
            }
        }
    }
    function getSameRowColumnData(fieldRow, fieldRows) {
        try {
            var values = {};
            var totalWidth = 0;
            var totalHeight = 0;
            var minusHeight = 0;
            var minusWidth = 0;
            var MaxRowPos = 0;
            var MaxColumnPos = 0;
            for (var i = 0; i < fieldRows.length; i++) {
                if (fieldRows[i]["GroupBoxName".toUpperCase()] == fieldRow["GroupBoxName".toUpperCase()]) {
                    if (fieldRows[i]["ColumnPos".toUpperCase()] == fieldRow["ColumnPos".toUpperCase()]) {
                        if (fieldRow["WidthType".toUpperCase()] == 1) {
                            values["width"] = fieldRow["Width".toUpperCase()] + "px";
                        }
                        else {
                            if (fieldRows[i]["WidthType".toUpperCase()] == 0) {
                                //如果值為0則改成1
                                var twidth = fieldRows[i]["Width".toUpperCase()];
                                if (twidth == 0) { twidth = 1; }
                                totalWidth += twidth;
                            }
                            else {
                                var twidth = fieldRows[i]["Width".toUpperCase()];
                                minusWidth += twidth;
                            }
                        }
                        if (MaxColumnPos < fieldRows[i]["ColumnPos".toUpperCase()]) {
                            MaxColumnPos = fieldRows[i]["ColumnPos".toUpperCase()];
                        }
                    }
                    if (fieldRows[i]["RowPos".toUpperCase()] == fieldRow["RowPos".toUpperCase()]) {
                        if (fieldRow["HeightType".toUpperCase()] == 1) {
                            values["height"] = fieldRow["Height".toUpperCase()] + "px";
                        }
                        else {
                            if (fieldRows[i]["HeightType".toUpperCase()] == 0) {
                                //如果值為0則改成1
                                var theight = fieldRows[i]["Height".toUpperCase()];
                                if (theight == 0) { theight = 1; }
                                totalHeight += theight;
                            }
                            else {
                                var theight = fieldRows[i]["Height".toUpperCase()];
                                minusHeight += theight;
                            }
                        }
                    }
                    if (MaxRowPos < fieldRows[i]["RowPos".toUpperCase()]) {
                        MaxRowPos = fieldRows[i]["RowPos".toUpperCase()];
                    }
                }
            }
            values["maxrow"] = MaxRowPos;
            values["maxcolumn"] = MaxColumnPos;
            if (!values["width"] && totalWidth > 0) {
                var twidth = fieldRow["Width".toUpperCase()];
                if (twidth == 0) { twidth = 1; }
                values["width"] = Math.floor(theight / totalWidth * 100).toString() + "%";
            }
            if (!values["height"] && totalHeight > 0) {
                var theight = fieldRow["Height".toUpperCase()];
                if (theight == 0) { theight = 1; }
                values["height"] = Math.floor(theight / totalHeight * 100).toString() + "%";
            }
            return values;
        }
        catch (err) {
            errorHandle(htmlName, "getSameRowColumnData", err);
        }
    }
    //建立抬頭說明
    function addHeadLabel(uiCol, fieldRow, width) {
        try {
            //var objHead = $('<label>' + fieldRow["HEADNAME"] + '</label>').appendTo(uiCol);
            var objHead = uiCol;
            objHead.text(fieldRow["HEADNAME"]);

            var MustBe = fieldRow["MustBe".toUpperCase()];
            if (MustBe != null && MustBe == 1) {
                objHead.html(fieldRow["HEADNAME"] + "*");
                objHead.css("color", "red");
            }

            var HeadForeground = fieldRow["HeadForeground".toUpperCase()];
            if (HeadForeground != null && HeadForeground != undefined) {
                objHead.css("color", getColorValue(HeadForeground));
            }
            objHead.css("width", "100%");
            uiCol.css('width', width);
            uiCol.css("margin-top", lblMarginTop);
        }
        catch (err) {
            errorHandle(htmlName, 'addHeadLabel', err);
        }
    }
    //取得中文說明的寬度
    function getFieldWidth(fieldRow, tableWidth, noHead, twoColumns, noTextWidth) {
        try {
            var values = {};
            var HEADNAME = fieldRow["HEADNAME"];
            //if (isSingle == true) { tmptableWidth = tableWidth / 2; }
            if (tableWidth.toString().indexOf("px") >= 0) {
                tableWidth = parseInt(tableWidth.replace("px", ""));
            }
            values["headwidth"] = 80;
            values["tildewidth"] = 16;
            if (HEADNAME == null || noHead == true) {
                values["headwidth"] = 0;
                values["tildewidth"] = 0;
            }
            else {
                var Field1Width = fieldRow["Field1Width".toUpperCase()];
                if (Field1Width != null && Field1Width > 0) {
                    values["headwidth"] = Number(Field1Width);
                }
            }
            values["textwidth"] = textwidth(fieldRow, tableWidth, values);
            if (noTextWidth != true) {
                var Text1Width = fieldRow["Text1Width".toUpperCase()];
                if (Text1Width != null && Text1Width > 0) {
                    if (twoColumns != true) {
                        values["textwidth"] = Number(Text1Width);
                    }
                    values["text1width"] = Number(Text1Width);
                }
                var Text2Width = fieldRow["Text2Width".toUpperCase()];
                if (Text2Width != null && Text2Width > 0) {
                    values["textwidth"] = values["text1width"] + Number(Text2Width);
                    values["text2width"] = Number(Text2Width);
                }
            }
            return values;

            function textwidth(fieldRow, tableWidth, values) {
                var RangeFlag = fieldRow["RangeFlag".toUpperCase()];
                if (RangeFlag == 1) {
                    return Math.floor((tableWidth - values["headwidth"] - values["tildewidth"]) / 2);
                }
                else { return (tableWidth - values["headwidth"]); }
            }
        }
        catch (err) {
            errorHandle(htmlName, 'getFieldWidth', err);
        }
    }
    //新增table column
    function addTableColumns(fieldRow, controlsTable, onlyone) {
        try {
            var uiRow = $('<tr></tr>').appendTo(controlsTable);
            var uiCols = [];
            var colCounts = 2;
            if (onlyone == true) { colCounts = 1; }
            for (var i = 0; i < colCounts; i++) {
                var uiCol = $('<td style="float:left;display:inline-block;padding:1px;height:100%;"></td>').appendTo(uiRow);
                uiCols.push(uiCol);
                //if (i == 1) {
                //    uiCol.css('margin-right', 2);
                //}
            }
            return uiCols;
        }
        catch (err) {
            errorHandle(htmlName, "addTableColumns", err);
        }
    }
    //新增table column
    function addDIVColumns(fieldRow, controlsDIV, onlyone) {
        try {
            var uiCols = [];
            var colCounts = 2;
            if (onlyone == true) { colCounts = 1; }
            for (var i = 0; i < colCounts; i++) {
                var uiCol = $('<div style="float:left;display:inline-block;padding:1px;height:100%;"></div>').appendTo(controlsDIV);
                uiCols.push(uiCol);
            }
            return uiCols;
        }
        catch (err) {
            errorHandle(htmlName, "addDIVColumns", err);
        }
    }
    //加~的tag
    function addTilde(uiCol, width) {
        $('<label style="width:' + width + 'px;float:left;display.inline;margin-top:' + lblMarginTop + 'px;">&nbsp~&nbsp</label>').appendTo(uiCol);
        //$('<label style="width:' + width + 'px;">&nbsp~&nbsp</label>').appendTo(uiCol);
    }
    function chkHasValueChange(div, fields, fieldRows, control) {
        try {
            var options = $.data(div, formName).options;
            var doIt = false;
            var doField = [];
            for (var x = 0; x < fields.length; x++) {
                var field = fields[x];
                for (var i = 0; i < fieldRows.length; i++) {
                    if (field == fieldRows[i]['FIELDNAME']) {
                        //46 button 不觸發
                        if (isEmpty(fieldRows[i]["VALUECHANGED"]) != true && fieldRows[i].OBJECTTYPE != 46) {
                            var valueChanged = fieldRows[i]["VALUECHANGED"];
                            if (valueChanged.substr(0, 8) == 'function') {
                                var func = scriptFunction("(" + valueChanged + ")", formName);
                                func(div, fieldRows[i], options.parameters, control);
                            }
                            else {
                                doIt = true;
                                doField.push(field);
                            }
                        }
                        continue;
                    }
                    var checkFields = ['ChooseQuery', 'DefaultValue', 'ReadOnlySQL'];
                    for (var j = 0; j < checkFields.length; j++) {
                        var fieldValue = fieldRows[i][checkFields[j].toUpperCase()];
                        if (isEmpty(fieldValue) != true) {
                            if (fieldValue.substr(0, 8) == 'function') {
                                var func = scriptFunction("(" + fieldValue + ")", formName);
                                func(div, fieldRows[i], options.parameters, control);
                            }
                            else if ((fieldValue.toUpperCase().indexOf('<' + field.toUpperCase() + '>') >= 0 ||
                                fieldValue.toUpperCase().indexOf('[' + field.toUpperCase() + ']') >= 0)) {
                                doIt = true;
                                doField.push(field);
                            }
                        }
                    }
                    //if (doIt == true) break;
                }
                //if (doIt == true) break;
            }
            return [doIt, doField];
        }
        catch (err) {
            errorHandle(htmlName, "chkHasValueChange", err);
        }
    }
    //當改變值有影響其他欄位時要做
    function valueChange(div, field, value, action, control) {
        try {
            var options = $.data(div, formName).options;
            if (options.stopEvent == true) return;
            var settingData = options.settingData;
            var fieldtableName = Object.keys(settingData)[0];
            var fieldRows = settingData[fieldtableName].rows;
            //var doIt = false;
            //for (var i = 0; i < fieldRows.length; i++) {
            //    if (field == fieldRows[i]['FIELDNAME']) continue;
            //    var checkFields = ['ChooseQuery', 'DefaultValue', 'ReadOnlySQL'];
            //    for (var j = 0; j < checkFields.length; j++) {
            //        if (fieldRows[i][checkFields[j].toUpperCase()] != null &&
            //            (fieldRows[i][checkFields[j].toUpperCase()].toUpperCase().indexOf('<' + field.toUpperCase() + '>') >= 0 ||
            //            fieldRows[i][checkFields[j].toUpperCase()].toUpperCase().indexOf('[' + field.toUpperCase() + ']') >= 0)) {
            //            doIt = true;
            //            break;
            //        }
            //    }
            //    if (doIt == true) break;
            //}
            var doIt = chkHasValueChange(div, [field], fieldRows, control)[0];
            if (typeof (value) === 'boolean') {
                value = Number(value);
            }
            if (doIt == true) {
                getFilterChooseQuery(div, field, value, function (d) {
                    try {
                        if (d != null) {
                            //執行 ChooseQuery
                            filterQuery(div, field, getValueReturnData("ChooseQuery", d));
                            //執行 DefaultValue
                            filterDefaultValue(div, field, getValueReturnData("DefaultValue", d));
                            //執行 ReadOnlySQL
                            filterReadOnly(div, field, getValueReturnData("ReadOnly", d));
                        }
                        if (typeof action === "function") {
                            action();
                        }
                    }
                    catch (err) {
                        errorHandle(htmlName, "valueChange_getFilterChooseQuery", err);
                    }
                });
            }
            else {
                action();
            }
        }
        catch (err) {
            errorHandle(htmlName, "valueChange", err);
        }
    }
    //過濾可選內容
    function filterQuery(div, field, data, parentData) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var keys = Object.keys(data);
            for (var i = 0; i < keys.length; i++) {
                for (var j = 0; j < controls.length; j++) {
                    var control = controls[j];
                    var fieldRow = control.fieldRow;
                    if (fieldRow["FIELDNAME"].toUpperCase() == keys[i]) {
                        switch (control.type) {
                            case "csList":
                                $("#" + control.name)[control.type]('source', data[keys[i]].rows);
                                if (data[keys[i]].rows.length == 0) {
                                    $("#" + control.name)[control.type]({
                                        columns: [
                                        { text: options.language.codeNo, datafield: data[keys[i]].columns[0].name, width: control.codeNoWidth },
                                        { text: options.language.description, datafield: data[keys[i]].columns[1].name, width: $("#" + control.name).width() - control.codeNoWidth }]
                                    });
                                }
                                //給預設值
                                if (isEmpty(fieldRow["PreDefaultValue".toUpperCase()]) == false) {
                                    var value = fieldRow["PreDefaultValue".toUpperCase()];
                                    $("#" + control.name)[control.type]('codeNo', value);
                                }
                                else if (fieldRow["DefaultValue".toUpperCase()] != null) {
                                    var idx = control.fieldName.substr(control.fieldName.length - 1, 1);
                                    var value = getFieldDefValue(div, fieldRow, idx);
                                    if (value != null) {
                                        $("#" + control.name)[control.type]('codeNo', value);
                                    }
                                }
                                $("#" + control.name)[control.type]('disabled', control.disabled);
                                break;
                            case "csMulti":
                                control.data = data[keys[i]];
                                $("#" + control.name)[control.type]({
                                    columns: getGridColumns(div, control.data, control),
                                    codeNoField: control.data.columns[0]['name'],
                                    descriptionField: control.data.columns[1]['name']
                                });

                                $("#" + control.name)[control.type]('source', data[keys[i]].rows);
                                //給預設值
                                if (isEmpty(fieldRow["PreDefaultValue".toUpperCase()]) == false) {
                                    var value = fieldRow["PreDefaultValue".toUpperCase()];
                                    $("#" + control.name)[control.type]('setDisplayValue', value);
                                }
                                else if (fieldRow["SelectAll".toUpperCase()] == 1 && data[keys[i]].rows.length > 0) {
                                    $("#" + control.name)[control.type]('selectAll', true);
                                }
                                else if (fieldRow["DefaultValue".toUpperCase()] != null) {
                                    var idx = control.fieldName.substr(control.fieldName.length - 1, 1);
                                    var value = getFieldDefValue(div, fieldRow, 0);
                                    if (value == null) {
                                        $("#" + control.name)[control.type]('setDisplayValue', value);
                                    }
                                }
                                $("#" + control.name)[control.type]('disabled', control.disabled);
                                break;
                            case "dynamicGrid":
                                $("#" + control.name)[control.type]('source', data[keys[i]].rows);
                                $("#" + control.name)[control.type]({ parentData: parentData });
                                var oldStop = options.stopEvent;
                                options.stopEvent = false;
                                var realData = {};
                                realData[keys[i]] = data[keys[i]];
                                $("#" + control.name)[control.type]('setParentRefresh', realData);
                                options.stopEvent = oldStop;
                                break;
                            case "dynUpdateGrid":
                            case "dynUpdateGrid2":
                                //2020/10/23 Jacky 將資料設給動態元件
                                var o1 = $("#" + control.name)[control.type]("options");
                                $.extend(o1.parameters, parentData);
                                var o2 = $("#" + control.name + 'condition')["dynamicCondition"]("options");
                                $.extend(o2.parameters, parentData);
                                $("#" + control.name + 'iGrid')["dynamicGrid"]('source', data[keys[i]].rows);
                                $("#" + control.name + 'iGrid')["dynamicGrid"]({ parentData: parentData });
                                var oldStop = options.stopEvent;
                                options.stopEvent = false;
                                var realData = {};
                                realData[keys[i]] = data[keys[i]];
                                $("#" + control.name + 'iGrid')["dynamicGrid"]('setParentRefresh', realData);
                                options.stopEvent = oldStop;
                                break;
                        }
                    }
                }
            }
        }
        catch (err) {
            errorHandle(htmlName, "filterQuery", err);
        }
    }
    //設定預設值
    function filterDefaultValue(div, field, filterData, inData) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var keys = Object.keys(filterData);
            var mustCheck = false;
            //如不是設定檔的元件則不檢核
            for (var j = 0; j < controls.length; j++) {
                var control = controls[j];
                var fieldRow = control.fieldRow;
                if (fieldRow["FIELDNAME"] == field) {
                    mustCheck = true;
                    break;
                }
            }
            for (var i = 0; i < keys.length; i++) {
                var doIt = false;
                for (var j = 0; j < controls.length; j++) {
                    var control = controls[j];
                    var fieldRow = control.fieldRow;
                    //檢核該元件比變更的欄位還後面才改資料,否則會變成無窮迴圈
                    if (doIt == false && fieldRow["FIELDNAME"] == field) doIt = true;
                    if (doIt == false && mustCheck == true) continue;
                    if (fieldRow["FIELDNAME"].toUpperCase() == keys[i]) {
                        if (filterData[keys[i]].rows.length == 0) continue;
                        var value = convertValueToString(filterData[keys[i]].rows[0][filterData[keys[i]].columns[0].name]);
                        if (value != null) {
                            var tFieldRow = cloneJSON(fieldRow);
                            tFieldRow["DEFAULTVALUE"] = value;
                            var idx = Number(control.fieldName.substr(control.fieldName.length - 1)) - 1;
                            switch (control.type) {
                                case "csAddress3":
                                    value = getAddress3FieldValue(div, control, inData, tFieldRow);
                                    break;
                                case "csMulti":
                                    value = getMultiFieldValue(div, control, inData, tFieldRow);
                                    break;
                                default:
                                    value = getFieldDefValue(div, tFieldRow, idx, inData);
                                    break;
                            }
                        }
                        else {
                            value = null;
                        }
                        switch (control.type) {
                            case "csList":
                                $("#" + control.name)[control.type]('codeNo', value);
                                break;
                            case "csMulti":
                                $("#" + control.name)[control.type]('setDisplayValue', value);
                                break;
                            case "jqxCheckBox":
                            case "jqxRadioButton":
                                if (value == null) value = false;
                                $("#" + control.name)[control.type]('val', value);
                                break;
                            case "jqxInput":
                            case "jqxNumberInput":
                            case "jqxTextArea":
                            case "jqxPasswordInput":
                                $("#" + control.name)[control.type]('val', value);
                                break;
                            case "csDateTime":
                                if (typeof value == "string") {
                                    $("#" + control.name)[control.type]('setText', value);
                                }
                                else {
                                    $("#" + control.name)[control.type]('setDate', value);
                                }
                                break;
                            case "csAddress1":
                            case "csAddress2":
                            case "csAddress3":
                                $("#" + control.name)[control.type]('setDisplayValue', value);
                                break;
                            default:
                                if (isEmpty(control.type) || control.type == "label") {
                                    if (value != null) {
                                        changeEnterToBr($('#' + control.name), null, control.fieldRow, value);
                                        //$("#" + control.name).text(value);
                                    }
                                }
                                else {
                                    $("#" + control.name)[control.type]('val', value);
                                }
                                break;
                        }
                    }
                }
            }
        }
        catch (err) {
            errorHandle(htmlName, "filterDefaultValue", err);
        }
    }
    //設定ReadOnly
    function filterReadOnly(div, field, data) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var keys = Object.keys(data);
            for (var i = 0; i < keys.length; i++) {
                for (var j = 0; j < controls.length; j++) {
                    var control = controls[j];
                    var fieldRow = control.fieldRow;
                    if (control.fieldRow["FIELDNAME"].toUpperCase() == keys[i]) {
                        if (data[keys[i]].rows.length == 0) continue;
                        var rowKeys = Object.keys(data[keys[i]].rows[0]);
                        var value = (data[keys[i]].rows[0][rowKeys[0]] == 1);
                        if (control.type.indexOf('jqx') >= 0) {
                            $("#" + control.name)[control.type]({ disabled: value });
                        }
                        else if (control.type.substr(0, 2) == 'cs') {
                            $("#" + control.name)[control.type]('disabled', value);
                        }
                        control.oldDisabled = value;
                    }
                }
            }
        }
        catch (err) {
            errorHandle(htmlName, "filterReadOnly", err);
        }
    }
    function getValueReturnData(tableHeader, d) {
        try {

            var tables = {};
            var keys = Object.keys(d);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].toUpperCase().indexOf(tableHeader.toUpperCase() + "_") >= 0) {
                    var name = keys[i].toUpperCase().replace(tableHeader.toUpperCase() + "_", "");
                    tables[name] = d[keys[i]];
                }
            }
            return tables;
        }
        catch (err) {
            errorHandle(htmlName, "getValueReturnData", err);
        }
    }
    function getParameterTable(div) {
        try {
            var options = $.data(div, formName).options;
            var table = {
                parameters: {
                    columns: [
                        { name: "refno", type: "string" },
                        { name: "editMode", type: "string" },
                        { name: "mid", type: "string" }
                    ], rows: []
                }
            };
            table.parameters.rows.push({ refno: options.refNo, editMode: options.editMode, mid: "" });
            return table;
        }
        catch (err) {
            errorHandle(htmlName, "getParameterTable", err);
        }
    }
    function getFilterChooseQuery2(div, data, action) {
        try {
            //ByVal loginInfo As loginInfo,
            //ByVal ProgramId As String,
            //ByVal SystemProgramId As String,
            var options = $.data(div, formName).options;
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var array = getObjectData(div, false);
            var chooseData = $.extend({}, getParameterTable(div), array[2]);
            var parameters = $.extend({}, paraLoginInfo, {
                ProgramId: { type: 'string', value: options.programId },
                dsDefaultData: { type: 'string', value: JSON.stringify(data) },
                dsChooseData: { type: 'string', value: JSON.stringify(chooseData) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetFilterChooseQuery2',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ResultBoolean == true) {
                        var d = JSON.parse(data.ResultXML);
                        action(d);
                    }
                    else {
                        messageBox(data.ErrorMessage, messageType.critical);
                        action();
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getFilterChooseQuery2', err);
        }
    };
    function getFilterChooseQuery(div, field, value, action) {
        try {
            //ByVal loginInfo As loginInfo,
            //ByVal ProgramId As String,
            //ByVal SystemProgramId As String,
            var options = $.data(div, formName).options;
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var array = getObjectData(div, false);
            var oEditMode = options.editMode;
            options.editMode = 3;
            var chooseData = $.extend({}, getParameterTable(div), array[2]);
            options.editMode = oEditMode;
            var parameters = $.extend({}, paraLoginInfo, {
                ProgramId: { type: 'string', value: options.programId },
                fieldName: { type: 'string', value: field },
                fieldValue: { type: 'string', value: convertToNull(convertNullToString(value, true)) },
                dsChooseData: { type: 'string', value: JSON.stringify(chooseData) }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetFilterChooseQuery',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    deleteJSONObject(parameters);
                    deleteJSONObject(params);
                    if (data.ResultBoolean == true) {
                        var d = JSON.parse(data.ResultXML);
                        action(d);
                    }
                    else {
                        messageBox(data.ErrorMessage, messageType.critical);
                        action();
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'getFilterChooseQuery', err);
        }
    };
    function getFieldDefValue(div, fieldRow, idx, inData) {
        try {
            var options = $.data(div, formName).options;
            var defFieldName = "";
            var value;
            if (idx == null) idx = 1;
            if (idx == 1) {
                defFieldName = "DefaultValue2".toUpperCase();
            }
            else {
                defFieldName = "DefaultValue".toUpperCase();
            }
            if (inData == null) {
                inData = options.parameters;
            }
            var defValue = fieldRow[defFieldName];
            if (defValue != null && defValue.substr(0, 8) == 'function') {
                var func = scriptFunction("(" + defValue + ")", formName);
                var tmpValue = func(div, fieldRow, inData);
                if (tmpValue != null) {
                    if (typeof tmpValue == "object") {
                        return tmpValue;
                    }
                    else {
                        defValue = tmpValue.toString();
                    }
                }
                else {
                    defValue = tmpValue;
                }
            }
            if (defValue != null && defValue.toUpperCase().indexOf('SELECT ') < 0) {
                value = null;
                if (defValue.indexOf('[') >= 0 && defValue.indexOf(']') >= 0) {
                    //檢核是否有LoginInfo要回傳的資料
                    if (defValue.toUpperCase().indexOf('[LOGININFO.') >= 0) {
                        var sp = defValue.split('.')
                        var field = sp[1].toString().replace(']', '');
                        var loginRow = options.loginInfo.loginInfo.rows[0];
                        var keys = Object.keys(loginRow);
                        for (var i = 0; i < keys.length; i++) {
                            if (keys[i].toUpperCase() == field.toUpperCase()) {
                                value = loginRow[keys[i]];
                            }
                        }
                    }
                    //檢核是不有跟inData 相同的資料
                    if (inData != null && Object.keys(inData).length > 0) {
                        if (defValue.indexOf('.') >= 0) {
                            var sp = defValue.split('.')
                            var tableName = sp[0].toString().replace('[', '');
                            var field = sp[1].toString().replace(']', '').toUpperCase();
                            var keys = Object.keys(inData);
                            var table;
                            for (var i = 0; i < keys.length; i++) {
                                if (keys[i].toUpperCase() == tableName.toUpperCase()) {
                                    table = inData[keys[i]];
                                    break;
                                }
                            }
                            if (table != null && table.rows.length > 0) {
                                var rKeys = Object.keys(table.rows[0]);
                                for (var r = 0 ; r < rKeys.length; r++) {
                                    if (rKeys[r].toUpperCase() == field.toUpperCase()) {
                                        value = table.rows[0][rKeys[r]];
                                        break;
                                    }
                                }
                            }
                        }
                        else {
                            var field = defValue.toString().replace('[', '').replace(']', '').toUpperCase();
                            var keys = Object.keys(inData);
                            var table = inData[keys[keys.length - 1]];
                            if (table.rows.length > 0) {
                                var rKeys = Object.keys(table.rows[0]);
                                for (var r = 0 ; r < rKeys.length; r++) {
                                    if (rKeys[r].toUpperCase() == field.toUpperCase()) {
                                        value = table.rows[0][rKeys[r]];
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    value = defValue;
                }
                if (value == null) {
                    if (defValue == null) {
                        return undefined;
                    }
                    else {
                        return setNullValue(fieldRow);
                    }
                }
                else {
                    switch (fieldRow['objectType'.toUpperCase()]) {
                        case 7:         //是否
                        case 15:        //RadioButton
                            value = (value == 1);
                            break;
                        case 26: case 27:
                            value = decryptData(value, eeKKy);
                            break;
                    }
                }
            }
            else if (defValue == null || defValue.toUpperCase().indexOf('SELECT ') < 0) {
                return setNullValue(fieldRow);
            }
            return value;
        }
        catch (err) {
            errorHandle(formName, 'getFieldDefValue', err);
        }
    }
    function setNullValue(fieldRow) {
        switch (fieldRow['objectType'.toUpperCase()]) {
            case 7:         //是否
            case 15:        //RadioButton
                return false;
                break;
            default:
                return null;
                break;
        }
    }
    function getMinusWidth(obj) {
        var realObj;
        if ($(obj).attr("conditionType") == "date") {
            realObj = obj.parent();
        }
        else {
            realObj = obj;
        }
        var value = $(realObj).outerWidth(true) - $(realObj).width();
        return value;
    }
    function getMinusHeight(obj) {
        var value = $(obj).outerHeight(true) - $(obj).height();
        return value;
    }
    function setDefaultAndAddHandler(div, controlHeadId, fieldRow, eventName, controlType, setValueName, trimAndCheck, getValueName, noNull, noDefault) {
        try {
            var options = $.data(div, formName).options;

            //委派事件, 當元件1改時,元件2也要跟著改
            var c1 = $('#' + controlHeadId + '_1');
            var c2 = $('#' + controlHeadId + '_2');
            var value2 = null;
            if (getValueName == null) { getValueName = setValueName; }

            if (c2.length > 0) {
                if (eventName != null) {
                    $(c2).on(eventName, function (args) {
                        var value = $(this)[controlType](getValueName);
                        $(div).triggerHandler($.Event("valueChanging", { args: { object: this, value: value } }));
                        valueChange(div, fieldRow["FIELDNAME"], value, function () {
                            $(div).triggerHandler($.Event("valueChanged", { args: { object: this, value: value } }));
                        }, c2);
                        valueChangedOtherthing(div, args);
                    });
                }
                if (noDefault != true) {
                    var value2;
                    //給預設值 且 觸發input 事件
                    if (isEmpty(fieldRow["PreDefaultValue2".toUpperCase()]) != true) {
                        value2 = fieldRow["PreDefaultValue2".toUpperCase()];
                    }
                    else {
                        value2 = getFieldDefValue(div, fieldRow, 1);
                    }
                    if (!(noNull == true && isEmpty(value))) {
                        if (controlType != null) {
                            if (value2 == null) { value2 = null; }
                            $(c2)[controlType](setValueName, value2);
                        }
                        else {
                            changeEnterToBr(c2, setValueName, fieldRow, value2);
                        }
                        if (value2 != null && eventName != null) $(c2).triggerHandler(eventName);
                    }
                }
            }
            if (eventName != null) {
                $(c1).on(eventName, function (args) {
                    try {
                        var value;
                        if (controlType != null) {
                            value = $(this)[controlType](getValueName);
                        }
                        else {
                            value = $(this)[getValueName];
                        }
                        $(div).triggerHandler($.Event("valueChanging", { args: { object: this, value: value } }));
                        if (c2.length > 0) {
                            if (noDefault != true) {
                                //將第1個元件的值給第2個
                                var c2Value = $(c2)[controlType](getValueName);
                                if (fieldRow["trimAndCheck"] == true && c2Value != null) { c2Value = c2Value.trim(); }
                                if (value2 == null && (c2Value == null || c2Value.length == 0 || options.loading == false)) {
                                    $(c2)[controlType](setValueName, $(c1)[controlType](getValueName));
                                    $(c2).triggerHandler(eventName);
                                }
                            }
                        }
                        valueChange(div, fieldRow["FIELDNAME"], value, function () {
                            $(div).triggerHandler($.Event("valueChanged", { args: { object: this, value: value } }));
                        }, c1);
                        valueChangedOtherthing(div, args);
                    }
                    catch (err) {
                        errorHandle(formName, 'setDefaultAndAddHandler_' + eventName, err);
                    }
                });
            }
            if (noDefault != true) {
                var value;
                //給預設值 且 觸發input 事件
                if (isEmpty(fieldRow["PreDefaultValue".toUpperCase()]) != true) {
                    value = fieldRow["PreDefaultValue".toUpperCase()];
                }
                else {
                    value = getFieldDefValue(div, fieldRow, 0);
                }
                if (!(noNull == true && isEmpty(value))) {
                    if (controlType != null) {
                        if (value == null) { value = null; }
                        $(c1)[controlType](setValueName, value);
                    }
                    else {
                        changeEnterToBr(c1, setValueName, fieldRow, value);
                    }
                    if (value != null && eventName != null) $(c1).triggerHandler(eventName);
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'setDefaultAndAddHandler', err);
        }
    }
    function changeEnterToBr(control, setValueName, fieldRow, value) {
        //if (fieldRow["OBJECTTYPE"] == 34) {
        //    var arrEnter = (convertNullToString(value) + "").split("\r\n");
        //    for (var i = 0; i < arrEnter.length; i++) {
        //        $(control).append(arrEnter[i]);
        //        if (arrEnter.length > 1 && i < arrEnter.length - 1) {
        //            $(control).append("<br>");
        //        }
        //    }
        //}
        //else {
        if (typeof value == "object") {
        }
        else {
            if (isEmpty(setValueName) == true) {
                $(control).text(convertNullToString(value));
            }
            else {
                $(control)[setValueName](convertNullToString(value));
            }
        }
        //}
    }
    function valueChangedOtherthing(div, args) {
        if ($(args.target).hasClass("jqx-radiobutton")) {
            if ($(args.target).jqxRadioButton('val') != true) return;
            var options = $.data(div, formName).options;
            var control = getRowByKeyValue(options.controls, 'name', $(args.target).prop('id'));
            var cLength = options.controls.length;
            for (var i = 0; i < cLength; i++) {
                if (options.controls[i].fieldRow["optionGroup".toUpperCase()] != null && control.fieldRow["FIELDNAME"].toUpperCase() == options.controls[i].fieldRow["optionGroup".toUpperCase()].toUpperCase()) {
                    switch (options.controls[i].type) {
                        case "jqxPanel": case "jqxExpander": case "csTabs":
                            break;
                        default:
                            $("#" + options.controls[i].name)[options.controls[i].type]("focus");
                    }
                    break;
                }
            }
        }
    }
    //建立一般Input 元件
    function addInput(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            var uiDiv;
            var controlWidths = getFieldWidth(fieldRow, $(controlsTable).width() - 3);
            if (justControl != true) {
                //建立Table Columns
                var uiCols = addDIVColumns(fieldRow, controlsTable);
                //建立欄位說明中文名稱
                addHeadLabel(uiCols[0], fieldRow, controlWidths["headwidth"]);
                //uiCols[1].css('width', (controlsTable.width() - controlWidths["headwidth"] - 4));
                uiDiv = uiCols[1];
            }
            else {
                uiDiv = controlsTable;
            }

            var lCounts = 1;
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'jqxInput';
            var eventName = 'input';

            var makeControl = function (uiCol, fieldRow, controlWidths, idx) {
                try {
                    var placeholder = null;
                    var controlId = controlHeadId + '_' + idx.toString();
                    var width;
                    if (fieldRow["OBJECTTYPE".toUpperCase()] == 34) {
                        jqxControl = "label";
                        $('<label id="' + controlId + '"></label>').appendTo(uiCol);
                        width = (controlWidths["textwidth"] - getMinusWidth($('#' + controlId)) - 3);
                        $('#' + controlId).css({
                            width: width,
                            "margin-top": 6
                        });
                    }
                    else {
                        $('<input type="text" id="' + controlId + '"></input>').appendTo(uiCol);
                        //$('#' + controlId).css('width', controlWidths["textwidth"] - 8);
                        var inputOptions = {
                            width: minWidth,
                            height: defaultHeight,
                            theme: options.theme
                        };
                        var dataLength = fieldRow["dataLength".toUpperCase()];
                        if (dataLength != null && dataLength != undefined) {
                            inputOptions["maxLength"] = dataLength.split(',')[0];
                        }
                        //2019/04/10 Jacky 增加正規表示式
                        var regExString = fieldRow["regExString".toUpperCase()];
                        if (isEmpty(regExString) != true) {
                            jqxControl = "jqxMaskedInput";
                            eventName = "valueChanged";
                            inputOptions["mask"] = regExString;
                        }
                        $('#' + controlId)[jqxControl](inputOptions);
                        width = (controlWidths["textwidth"] - getMinusWidth($('#' + controlId)) - 3);
                        $('#' + controlId)[jqxControl]({ width: width });
                    }
                    var controlOptions = {
                        name: controlId, type: jqxControl, level: level,
                        objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                        fieldName: fieldRow["FIELDNAME"] + '_' + idx.toString(),
                        headName: fieldRow["HEADNAME"],
                        fieldRow: fieldRow,
                        setValueName: "val",
                        eventName: eventName,
                        trimAndCheck: true,
                        parentControl: parentControl
                    };
                    options.controls.push(controlOptions);
                    $('#' + controlId).css('float', 'left');
                    //改變元件字體顏色
                    var TextForeground = fieldRow["TextForeground".toUpperCase()];
                    if (TextForeground != null && TextForeground != undefined) {
                        $('#' + controlId).css("color", getColorValue(TextForeground));
                    }

                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                        $('#' + controlId).attr("readonly", true);
                    }
                    var tooltip = fieldRow["tooltip".toUpperCase()];
                    if (isEmpty(tooltip) == false) {
                        $('#' + controlId).attr("title", tooltip);
                    }
                    $('#' + controlId).css('minWidth', minWidth);
                    $('#' + controlId).css('display', 'inline-block');
                    var isHide = fieldRow["isHide".toUpperCase()];
                    if (isHide != 0) {
                        $(controlsTable).css('display', 'none');
                    }
                    focusOptionGroup(div, controlOptions);
                }
                catch (err) {
                    errorHandle(htmlName, "addInput_makeControl", err);
                }
            }

            if (fieldRow["RangeFlag".toUpperCase()] == 1) { lCounts = 2; }
            for (var i = 1; i <= lCounts; i++) {
                if (i == 2) {
                    addTilde(uiDiv, controlWidths["tildewidth"]);
                }
                //建立元件
                makeControl(uiDiv, fieldRow, controlWidths, i);
            }
            if (fieldRow["OBJECTTYPE".toUpperCase()] == 34) {
                setDefaultAndAddHandler(div, controlHeadId, fieldRow, eventName, null, 'text');
            }
            else {
                setDefaultAndAddHandler(div, controlHeadId, fieldRow, eventName, jqxControl, 'val');
            }
        }
        catch (err) {
            errorHandle(htmlName, "addInput", err);
        }
    }
    //建立數字Input 元件
    function addNumberInput(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 3);
            //uiCols[1].css('width', (controlsTable.width() - controlWidths["headwidth"] - 4));
            //建立欄位說明中文名稱
            addHeadLabel(uiCols[0], fieldRow, controlWidths["headwidth"]);
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            //var jqxControl = 'jqxMaskedInput';
            var jqxControl = 'jqxInput';
            var eventName = "input";
            var makeControl = function (uiCol, fieldRow, controlWidths, idx) {
                try {

                    var placeholder = null;
                    var controlId = controlHeadId + '_' + idx.toString();
                    var dataLength = fieldRow["dataLength".toUpperCase()];
                    var canMinus = fieldRow["OBJECTTYPE".toUpperCase()] == 33;
                    //當有小數點時則用numberInput
                    if (dataLength != null && dataLength.indexOf(",") >= 0) {
                        jqxControl = "jqxNumberInput";
                        $('<div id="' + controlId + '"></div>').appendTo(uiCol);
                        var inputOptions = {
                            width: minWidth,
                            height: defaultHeight,
                            theme: options.theme,
                            spinButtonsStep: 5,
                            inputMode: 'simple'
                        };
                        var vDL = dataLength.split(',');
                        inputOptions["digits"] = Number(vDL[0]) - Number(vDL[1]);
                        inputOptions["decimalDigits"] = vDL[1];
                        $('#' + controlId)[jqxControl](inputOptions);
                        $('#' + controlId).find('input').on('focusin', function () {
                            $(this).select();
                        });
                        eventName = "valueChanged";
                        numericOnly($('#' + controlId + " input"), canMinus, "keypress keydown");
                    }
                    else {
                        $('<input type="text" id="' + controlId + '"></input>').appendTo(uiCol);

                        var inputOptions = {
                            width: minWidth,
                            height: defaultHeight,
                            theme: options.theme
                        }
                        var dataLength = fieldRow["dataLength".toUpperCase()];
                        if (dataLength != null && dataLength != undefined) {
                            inputOptions["maxLength"] = dataLength.split(',')[0];
                        }

                        $('#' + controlId)[jqxControl](inputOptions);
                        numericOnly($("#" + controlId), canMinus, "keypress");
                        //$('#' + controlId).on('keypress', function (event) {
                        //    if (!(event.which >= 48 && event.which <= 57)) {
                        //        event.preventDefault();
                        //    }
                        //});
                        $('#' + controlId).on('focus', function () {
                            $(this).select();
                        });
                    }
                    $('#' + controlId)[jqxControl]({ width: (controlWidths["textwidth"] - getMinusWidth($('#' + controlId)) - 4) });
                    var controlOptions = {
                        name: controlId, type: jqxControl, level: level,
                        objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                        fieldName: fieldRow["FIELDNAME"] + '_' + idx.toString(),
                        headName: fieldRow["HEADNAME"],
                        fieldRow: fieldRow,
                        setValueName: "val",
                        eventName: eventName,
                        parentControl: parentControl
                        //eventName: 'valueChanged'
                    };
                    options.controls.push(controlOptions);
                    $('#' + controlId).css('float', 'left');
                    $('#' + controlId).css('display', 'inline-block');
                    $('#' + controlId).css('text-align', 'right');

                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                        if (jqxControl == "jqxNumberInput") {
                            $('#' + controlId)[jqxControl]({ "disabled": true });
                        }
                        else {
                            $('#' + controlId).attr("readonly", true);
                        }
                    }
                    var tooltip = fieldRow["tooltip".toUpperCase()];
                    if (isEmpty(tooltip) == false) {
                        $('#' + controlId).attr("title", tooltip);
                    }
                    var TextForeground = fieldRow["TextForeground".toUpperCase()];
                    if (TextForeground != null && TextForeground != undefined) {
                        $('#' + controlId).css("color", getColorValue(TextForeground));
                    }
                    $('#' + controlId).css('minWidth', minWidth);
                    focusOptionGroup(div, controlOptions);
                }
                catch (err) {
                    errorHandle(htmlName, "addNumberInput_makeControl", err);
                }
            }
            var lCounts = 1;
            if (fieldRow["RangeFlag".toUpperCase()] == 1) { lCounts = 2; }
            for (var i = 1; i <= lCounts; i++) {
                if (i == 2) {
                    addTilde(uiCols[1], controlWidths["tildewidth"]);
                }
                //建立元件
                makeControl(uiCols[1], fieldRow, controlWidths, i);
            }
            //setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'valueChanged', jqxControl, 'val', true);
            setDefaultAndAddHandler(div, controlHeadId, fieldRow, eventName, jqxControl, 'val');
        }
        catch (err) {
            errorHandle(htmlName, "addNumberInput", err);
        }
    }
    //建立radio Button 元件
    function addRadioButton(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable, true);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 2);
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'jqxRadioButton';
            //建立欄位說明中文名稱
            //15=RadioButton
            var makeControl = function (uiCol, fieldRow, controlWidths, idx) {
                try {
                    var controlId = controlHeadId + '_1';
                    var headName = "";
                    if (fieldRow["HEADNAME"] != null) {
                        headName = fieldRow["HEADNAME"];
                    }
                    $('<div id="' + controlId + '">' + headName + '</div>').appendTo(uiCol);
                    var groupName = $(div).prop('id') + 'group';
                    if (fieldRow['groupBoxName'.toUpperCase()] != null) {
                        groupName = $(div).prop('id') + "_" + fieldRow['groupBoxName'.toUpperCase()] + "_1";
                    }
                    var inputOptions = {
                        width: '99%',
                        height: defaultHeight,
                        groupName: groupName,
                        theme: options.theme
                    };
                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if (ReadOnly != null && ReadOnly != undefined && ReadOnly == 1) {
                        inputOptions['disabled'] = true;
                    }
                    $('#' + controlId).jqxRadioButton(inputOptions);
                    var controlOptions = {
                        name: controlId, type: jqxControl, level: level,
                        objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                        fieldName: fieldRow["FIELDNAME"] + '_1',
                        headName: fieldRow["HEADNAME"],
                        fieldRow: fieldRow,
                        noHead: true,
                        setValueName: "checked",
                        eventName: 'change',
                        noNull: true,
                        parentControl: parentControl
                    }
                    options.controls.push(controlOptions);

                    var MustBe = fieldRow["MustBe".toUpperCase()];
                    if (MustBe != null && MustBe != undefined && MustBe == 1) {
                        $('#' + controlId).css("color", 'red');
                    }
                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                        $('#' + controlId)[jqxControl]({ disabled: true });
                        controlOptions.disabled = true;
                    }
                    var tooltip = fieldRow["tooltip".toUpperCase()];
                    if (isEmpty(tooltip) == false) {
                        $('#' + controlId).attr("title", tooltip);
                    }
                    var TextForeground = fieldRow["TextForeground".toUpperCase()];
                    if (TextForeground != null && TextForeground != undefined) {
                        $('#' + controlId).css("color", getColorValue(TextForeground));
                    }
                    focusOptionGroup(div, controlOptions);
                    return $('#' + controlId);
                }
                catch (err) {
                    errorHandle(htmlName, "addRadioButton_makeControl", err);
                }
            }
            uiCols[0].css('width', '99%');
            makeControl(uiCols[0], fieldRow, controlWidths);
            setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'change', jqxControl, 'checked', null, null, true);
        }
        catch (err) {
            errorHandle(htmlName, "addRadioButton", err);
        }
    }
    //建立 checkBox 元件
    function addCheckbox(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable, true);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 2);
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'jqxCheckBox';
            //建立欄位說明中文名稱
            //15=RadioButton
            var makeControl = function (uiCol, fieldRow, controlWidths) {
                try {
                    var controlId = controlHeadId + '_1';
                    $('<div id="' + controlId + '">' + fieldRow["HEADNAME"] + '</div>').appendTo(uiCol);
                    var inputOptions = {
                        width: '99%',
                        height: defaultHeight,
                        theme: options.theme
                    };
                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if (ReadOnly != null && ReadOnly != undefined && ReadOnly == 1) {
                        inputOptions['disabled'] = true;
                    }
                    $('#' + controlId).jqxCheckBox(inputOptions);
                    var controlOptions = {
                        name: controlId, type: jqxControl, level: level,
                        objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                        fieldName: fieldRow["FIELDNAME"] + '_1',
                        headName: fieldRow["HEADNAME"],
                        fieldRow: fieldRow,
                        noHead: true,
                        setValueName: "val",
                        eventName: 'change',
                        noNull: true,
                        parentControl: parentControl
                    };
                    options.controls.push(controlOptions);

                    var MustBe = fieldRow["MustBe".toUpperCase()];
                    if (MustBe != null && MustBe != undefined && MustBe == 1) {
                        $('#' + controlId).css("color", 'red');
                    }
                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                        $('#' + controlId)[jqxControl]({ disabled: true });
                        controlOptions.disabled = true;
                    }
                    var tooltip = fieldRow["tooltip".toUpperCase()];
                    if (isEmpty(tooltip) == false) {
                        $('#' + controlId).attr("title", tooltip);
                    }
                    var TextForeground = fieldRow["TextForeground".toUpperCase()];
                    if (TextForeground != null && TextForeground != undefined) {
                        $('#' + controlId).css("color", getColorValue(TextForeground));
                    }
                    return $('#' + controlId);
                }
                catch (err) {
                    errorHandle(htmlName, "addCheckbox_makeControl", err);
                }
            }
            uiCols[0].css('width', '99%');
            makeControl(uiCols[0], fieldRow, controlWidths);
            setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'change', jqxControl, 'val', null, null, true);
        }
        catch (err) {
            errorHandle(htmlName, "addCheckbox", err);
        }
    }
    //建立日期元件
    function addDateTimeInput(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 2);
            //uiCols[1].css('width', (controlsTable.width() - controlWidths["headwidth"] - 3));
            //建立欄位說明中文名稱
            addHeadLabel(uiCols[0], fieldRow, controlWidths["headwidth"]);
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'csDateTime';
            var minWidth = 50;
            var makeControl = function (uiCol, fieldRow, controlWidths, idx) {
                try {
                    var placeholder = null;
                    var controlId = controlHeadId + '_' + idx.toString();
                    //$('<div id="' + controlId + '"></div>').appendTo(uiCol);
                    $('<input id="' + controlId + '"/>').appendTo(uiCol);
                    var inputOptions = {
                        width: minWidth,
                        showCalendarButton: (fieldRow["showCalendar".toUpperCase()] == 1),
                        theme: options.theme,
                        height: defaultHeight,
                        value: null
                    };
                    var setValueName = "setDate";
                    var getValueName = "getDate";
                    var rangeWidth = 0;
                    switch (fieldRow["OBJECTTYPE"]) {
                        case 3: //3=日期時間(yyyy/MM/dd HH:mm)
                            inputOptions['formatString'] = "yyyy/MM/dd HH:mm";
                            break;
                        case 17:    //17=日期時間(yyyy/MM/dd HH:mm:ss)
                            inputOptions['formatString'] = "yyyy/MM/dd HH:mm:ss";
                            break;
                        case 23:    //23=日期(yyyy/MM)
                            inputOptions['formatString'] = "yyyy/MM";
                            setValueName = "setText";
                            getValueName = "getText";
                            break;
                        case 24:    //24=日期(yyyy)
                            inputOptions['formatString'] = "yyyy";
                            setValueName = "setText";
                            getValueName = "getText";
                            break;
                        case 36:    //24=日期(yyyy)
                            inputOptions['formatString'] = "HH:mm";
                            setValueName = "setText";
                            getValueName = "getText";
                            rangeWidth = 2;
                            break;
                        case 2: //2=日期(yyyy/MM/dd) 
                        default:
                            inputOptions['formatString'] = "yyyy/MM/dd";
                            break;
                    }
                    $('#' + controlId).css({
                        'float': 'left',
                        'display': 'inline-block',
                        'minWidth': minWidth
                    });
                    $('#' + controlId).csDateTime(inputOptions);
                    $('#' + controlId).attr("conditionType", "date");
                    var minusWidth = rangeWidth;
                    if (fieldRow["RangeFlag".toUpperCase()] != 1) {
                        minusWidth = 2;
                    }
                    $('#' + controlId).csDateTime({ width: controlWidths["textwidth"] - getMinusWidth($('#' + controlId)) - minusWidth });
                    var controlOptions = {
                        name: controlId, type: jqxControl, level: level,
                        objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                        fieldName: fieldRow["FIELDNAME"] + '_' + idx.toString(),
                        headName: fieldRow["HEADNAME"],
                        fieldRow: fieldRow,
                        setValueName: setValueName,
                        getValueName: getValueName,
                        eventName: 'dateChanged',
                        parentControl: parentControl
                    };
                    options.controls.push(controlOptions);
                    $('#' + controlId + ' input').on('focus', function () {
                        $(this).select();
                    });

                    //$('#' + controlId).css({
                    //    'float': 'left',
                    //    'display': 'inline-block',
                    //    'minWidth': minWidth
                    //});

                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                        $('#' + controlId)[jqxControl]({ disabled: true });
                        controlOptions.disabled = true;
                    }
                    var tooltip = fieldRow["tooltip".toUpperCase()];
                    if (isEmpty(tooltip) == false) {
                        $('#' + controlId).attr("title", tooltip);
                    }
                    var TextForeground = fieldRow["TextForeground".toUpperCase()];
                    if (TextForeground != null && TextForeground != undefined) {
                        $('#' + controlId).css("color", getColorValue(TextForeground));
                    }
                    focusOptionGroup(div, controlOptions);

                }
                catch (err) {
                    errorHandle(htmlName, "addDateTimeInput_makeControl", err);
                }
            }
            var lCounts = 1;
            if (fieldRow["RangeFlag".toUpperCase()] == 1) { lCounts = 2; }
            for (var i = 1; i <= lCounts; i++) {
                if (i == 2) {
                    addTilde(uiCols[1], controlWidths["tildewidth"]);
                }
                //建立元件
                makeControl(uiCols[1], fieldRow, controlWidths, i);
            }
            setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'dateChanged', jqxControl, 'setText', false, 'getText');
        }
        catch (err) {
            errorHandle(htmlName, "addDateTimeInput", err);
        }
    }
    //建立memo 元件
    function addMemoInput(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable, (fieldRow["OBJECTTYPE"] == 16));
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 3);
            //$(uiCols[1]).css('width', (controlsTable.width() - controlWidths["headwidth"] - 2));
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'jqxTextArea';
            //建立欄位說明中文名稱
            var makeControl = function (uiCol, fieldRow, controlWidths) {
                try {
                    var placeholder = null;
                    var controlId = controlHeadId + '_1';
                    $('<textarea id="' + controlId + '"></textarea>').appendTo(uiCol);
                    $('#' + controlId).css('margin-bottom', 1);
                    var inputOptions = {
                        width: '99.9%',
                        height: '99%',
                        theme: options.theme
                    };
                    if (fieldRow['HeightType'.toUpperCase()] == 1) {
                        inputOptions.height = fieldRow['Height'.toUpperCase()] - 8;
                    }
                    if (fieldRow['widthType'.toUpperCase()] == 1) {
                        inputOptions.width = fieldRow['width'.toUpperCase()];
                    }
                    var dataLength = fieldRow["dataLength".toUpperCase()];
                    if (dataLength != null && dataLength != undefined) {
                        inputOptions["maxLength"] = dataLength.split(',')[0];
                    }
                    inputOptions.width = (controlWidths["textwidth"] - getMinusWidth($('#' + controlId)));
                    $('#' + controlId)[jqxControl](inputOptions);
                    //$('#' + controlId)[jqxControl]({ width: (controlWidths["textwidth"] - getMinusWidth($('#' + controlId))) });
                    var controlOptions = {
                        name: controlId, type: 'jqxTextArea', level: level,
                        objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                        fieldName: fieldRow["FIELDNAME"] + '_1',
                        headName: fieldRow["HEADNAME"],
                        fieldRow: fieldRow,
                        setValueName: "val",
                        eventName: 'change',
                        parentControl: parentControl
                    };
                    options.controls.push(controlOptions);

                    var TextForeground = fieldRow["TextForeground".toUpperCase()];
                    if (TextForeground != null && TextForeground != undefined) {
                        $('#' + controlId).css("color", getColorValue(TextForeground));
                        $('#' + controlId).find("textarea").css("color", getColorValue(TextForeground));
                    }

                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if ((ReadOnly != null && ReadOnly != undefined && ReadOnly == 1) || (fieldRow["OBJECTTYPE"] == 16) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                        $('#' + controlId).attr("readonly", true);
                        $('#' + controlId).find("textarea").attr("readonly", true);
                    }
                    var tooltip = fieldRow["tooltip".toUpperCase()];
                    if (isEmpty(tooltip) == false) {
                        $('#' + controlId).attr("title", tooltip);
                    }
                    focusOptionGroup(div, controlOptions);
                }
                catch (err) {
                    errorHandle(htmlName, "addMemoInput_makeControl", err);
                }
            }
            //11=備註 16=說明
            if (fieldRow["OBJECTTYPE"] == 11) {
                addHeadLabel(uiCols[0], fieldRow, controlWidths["headwidth"]);
                makeControl(uiCols[1], fieldRow, controlWidths);
            }
            else {
                uiCols[0].css('width', '100%');
                makeControl(uiCols[0], fieldRow, controlWidths);
            }
            setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'change', jqxControl, 'val', true);
        }
        catch (err) {
            errorHandle(htmlName, "addMemoInput", err);
        }
    }
    //說明 16
    function addComment(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            //return;
            var options = $.data(div, formName).options;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable, (fieldRow["OBJECTTYPE"] == 16));
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 3);
            //$(uiCols[1]).css('width', (controlsTable.width() - controlWidths["headwidth"] - 2));
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'label';
            //建立欄位說明中文名稱
            var makeControl = function (uiCol, fieldRow, controlWidths) {
                try {
                    var placeholder = null;
                    var controlId = controlHeadId + '_1';
                    $('<label id="' + controlId + '"></label>').appendTo(uiCol);
                    if (fieldRow['HeightType'.toUpperCase()] == 1) {
                        $('#' + controlId).css({ "height": fieldRow['Height'.toUpperCase()] });
                    }
                    if (fieldRow['widthType'.toUpperCase()] == 1) {
                        $('#' + controlId).css({ "width": fieldRow['width'.toUpperCase()] - 2 });
                    }
                    options.controls.push({
                        name: controlId, type: jqxControl, level: level,
                        objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                        fieldName: fieldRow["FIELDNAME"] + '_1',
                        headName: fieldRow["HEADNAME"],
                        fieldRow: fieldRow,
                        setValueName: "text",
                        eventName: 'change',
                        parentControl: parentControl
                    });
                    var mustBe = fieldRow["mustBe".toUpperCase()];
                    if (mustBe != null) {
                        $('#' + controlId).css("color", 'red');
                    }
                    var tooltip = fieldRow["tooltip".toUpperCase()];
                    if (isEmpty(tooltip) == false) {
                        $('#' + controlId).attr("title", tooltip);
                    }
                    var TextForeground = fieldRow["TextForeground".toUpperCase()];
                    if (TextForeground != null) {
                        $('#' + controlId).css("color", getColorValue(TextForeground));
                    }
                }
                catch (err) {
                    errorHandle(htmlName, "addComment_makeControl", err);
                }
            }
            //11=備註 16=說明
            uiCols[0].css({ 'width': '100%', "margin-top": 6 });
            makeControl(uiCols[0], fieldRow, controlWidths);
            setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'change', null, 'text', true, null, true);
        }
        catch (err) {
            errorHandle(htmlName, "addComment", err);
        }
    }
    //建立密X 元件
    function addPWInput(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 3);
            //uiCols[1].css('width', (controlsTable.width() - controlWidths["headwidth"] - 2));
            //建立欄位說明中文名稱
            addHeadLabel(uiCols[0], fieldRow, controlWidths["headwidth"]);
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'jqxPasswordInput';
            var makeControl = function (uiCol, fieldRow, controlWidths, idx) {
                try {
                    var placeholder = null;
                    var controlId = controlHeadId + '_' + idx.toString();
                    $('<input type="password" id="' + controlId + '"/>').appendTo(uiCol);
                    var inputOptions = {
                        width: minWidth,
                        height: defaultHeight,
                        theme: options.theme
                    };

                    $('#' + controlId).jqxPasswordInput(inputOptions);
                    $('#' + controlId).jqxPasswordInput({ width: (controlWidths["textwidth"] - getMinusWidth($('#' + controlId))) - 3 });
                    var controlOptions = {
                        name: controlId, type: jqxControl, level: level,
                        objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                        fieldName: fieldRow["FIELDNAME"] + '_' + idx.toString(),
                        headName: fieldRow["HEADNAME"],
                        fieldRow: fieldRow,
                        setValueName: "val",
                        eventName: 'change',
                        parentControl: parentControl
                    };
                    options.controls.push(controlOptions);
                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                        $('#' + controlId).attr("readonly", true);
                        $('#' + controlId).jqxPasswordInput({ disabled: true });
                    }
                    var tooltip = fieldRow["tooltip".toUpperCase()];
                    if (isEmpty(tooltip) == false) {
                        $('#' + controlId).attr("title", tooltip);
                    }
                    var isHide = fieldRow["isHide".toUpperCase()];
                    if (isHide != 0) {
                        $(controlsTable).css('display', 'none');
                    }
                    else {
                        $('#' + controlId).css('display', 'inline-block');
                        $('#' + controlId).css('minWidth', minWidth);
                        var TextForeground = fieldRow["TextForeground".toUpperCase()];
                        if (TextForeground != null && TextForeground != undefined) {
                            $('#' + controlId).css("color", getColorValue(TextForeground));
                        }

                        focusOptionGroup(div, controlOptions);
                    }
                }
                catch (err) {
                    errorHandle(htmlName, "addPasswordInput_makeControl", err);
                }
            }
            var lCounts = 1;
            if (fieldRow["RangeFlag".toUpperCase()] == 1) { lCounts = 2; }
            for (var i = 1; i <= lCounts; i++) {
                if (i == 2) {
                    addTilde(uiCols[1], controlWidths["tildewidth"]);
                }
                //建立元件
                makeControl(uiCols[1], fieldRow, controlWidths, i);
            }
            setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'change', jqxControl, 'val', true);
        }
        catch (err) {
            errorHandle(htmlName, "addPWInput", err);
        }
    }
    //建立顏色 元件
    function addColorPicker(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 3);
            //uiCols[1].css('width', (controlsTable.width() - controlWidths["headwidth"] - 2));
            //建立欄位說明中文名稱
            addHeadLabel(uiCols[0], fieldRow, controlWidths["headwidth"]);
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'csColorPicker';
            var makeControl = function (uiCol, fieldRow, controlWidths, idx) {
                try {
                    var placeholder = null;
                    var controlId = controlHeadId + '_' + idx.toString();
                    $('<div id="' + controlId + '"></div>').appendTo(uiCol);
                    var dropOptions = {
                        width: minWidth,
                        height: defaultHeight,
                        theme: options.theme
                    };
                    var width = (controlWidths["textwidth"] - getMinusWidth($('#' + controlId))) - 3;
                    $('#' + controlId)[jqxControl](dropOptions);
                    $('#' + controlId)[jqxControl]({ width: width });
                    var controlOptions = {
                        name: controlId, type: jqxControl, level: level,
                        objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                        fieldName: fieldRow["FIELDNAME"] + '_' + idx.toString(),
                        headName: fieldRow["HEADNAME"],
                        fieldRow: fieldRow,
                        setValueName: "setValue",
                        getValueName: "getValue",
                        eventName: 'change',
                        parentControl: parentControl
                    };
                    options.controls.push(controlOptions);
                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                        $('#' + controlId).attr("readonly", true);
                        $('#' + controlId)[controlId]({ disabled: true });
                    }
                    var tooltip = fieldRow["tooltip".toUpperCase()];
                    if (isEmpty(tooltip) == false) {
                        $('#' + controlId).attr("title", tooltip);
                    }
                    var isHide = fieldRow["isHide".toUpperCase()];
                    if (isHide != 0) {
                        $(controlsTable).css('display', 'none');
                    }
                    else {
                        $('#' + controlId).css('float', 'left');
                        $('#' + controlId).css('display', 'inline-block');
                        $('#' + controlId).css('minWidth', minWidth);
                        focusOptionGroup(div, controlOptions);
                    }
                }
                catch (err) {
                    errorHandle(htmlName, "addColorPicker_makeControl", err);
                }
            }
            var lCounts = 1;
            if (fieldRow["RangeFlag".toUpperCase()] == 1) { lCounts = 2; }
            for (var i = 1; i <= lCounts; i++) {
                if (i == 2) {
                    addTilde(uiCols[1], controlWidths["tildewidth"]);
                }
                //建立元件
                makeControl(uiCols[1], fieldRow, controlWidths, i);
            }
            setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'change', jqxControl, 'setValue', true, "getValue");
        }
        catch (err) {
            errorHandle(htmlName, "addColorPicker", err);
        }
    }
    //建立Combobox元件
    function addCombobox(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 3, false, true);
            //uiCols[1].css('width', (controlsTable.width() - controlWidths["headwidth"] - 2));
            //建立欄位說明中文名稱
            addHeadLabel(uiCols[0], fieldRow, controlWidths["headwidth"]);
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'jqxComboBox';
            var noDefault;
            var makeControl = function (uiCol, fieldRow, data, controlWidths, idx) {
                try {
                    var placeholder = null;
                    var controlId = controlHeadId + '_' + idx.toString();
                    $('<div id="' + controlId + '"></div>').appendTo(uiCol);
                    var width = (controlWidths["textwidth"] - 2);
                    var codeNoWidth = Math.floor((width - 20) * 2 / 5);

                    var cOptions = {
                        width: width,
                        height: defaultHeight,
                        theme: options.theme
                    }
                    if (data) {
                        var source = {
                            datatype: "json",
                            datafields: data.columns,
                            localdata: data.rows
                        };
                        var dataAdapter = new $.jqx.dataAdapter(source);
                        cOptions.source = dataAdapter;
                        cOptions.valueMember = data.columns[0].name;
                        if (data.columns.length == 1) {
                            cOptions.displayMember = data.columns[0].name;
                        }
                        else {
                            cOptions.displayMember = data.columns[1].name;
                        }
                    }
                    else {
                        noDefault = true;
                    }
                    $('#' + controlId)[jqxControl](cOptions);
                    $('#' + controlId)[jqxControl]({ width: (controlWidths["textwidth"] - getMinusWidth($('#' + controlId))) - 3 });
                    var controlOptions = {
                        name: controlId, type: jqxControl, level: level,
                        objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                        fieldName: fieldRow["FIELDNAME"] + '_' + idx.toString(),
                        headName: fieldRow["HEADNAME"],
                        fieldRow: fieldRow,
                        setValueName: "val",
                        eventName: 'change',
                        disabled: false,
                        parentControl: parentControl
                    };
                    options.controls.push(controlOptions);
                    $('#' + controlId).css('float', 'left');
                    $('#' + controlId).css('display', 'inline-block');
                    $('#' + controlId).css('margin-right', 2);

                    if (placeholder != null) {
                        $('#' + controlId).attr("placeholder", placeholder);
                    }
                    var dataLength = fieldRow["dataLength".toUpperCase()];
                    if (dataLength != null && dataLength != undefined) {
                        $('#' + controlId).attr("maxlength", dataLength.split(',')[0]);
                    }
                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                        $('#' + controlId)[jqxControl]("disabled", true);
                        controlOptions.disabled = true;
                    }
                    var tooltip = fieldRow["tooltip".toUpperCase()];
                    if (isEmpty(tooltip) == false) {
                        $('#' + controlId).attr("title", tooltip);
                    }
                    var TextForeground = fieldRow["TextForeground".toUpperCase()];
                    if (TextForeground != null && TextForeground != undefined) {
                        $('#' + controlId).css("color", getColorValue(TextForeground));
                    }
                    $('#' + controlId).css('minWidth', minWidth);
                    $('#' + controlId).css('display', 'inline-block');
                }
                catch (err) {
                    errorHandle(htmlName, "addCombobox_makeControl", err);
                }
            }
            var lCounts = 1;
            if (fieldRow["RangeFlag".toUpperCase()] == 1) { lCounts = 2; }
            for (var i = 1; i <= lCounts; i++) {
                if (i == 2) {
                    addTilde(uiCols[1], controlWidths["tildewidth"]);
                }
                //建立元件
                makeControl(uiCols[1], fieldRow, settingData[fieldRow["FIELDNAME"].toUpperCase()], controlWidths, i);
            }
            setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'change', jqxControl, 'val', true, null, null, noDefault);
        }
        catch (err) {
            errorHandle(htmlName, "addCombobox", err);
        }
    }
    //建立單選元件
    function addList(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 3, false, true);
            //uiCols[1].css('width', (controlsTable.width() - controlWidths["headwidth"] - 2));
            //建立欄位說明中文名稱
            addHeadLabel(uiCols[0], fieldRow, controlWidths["headwidth"]);
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'csList';
            var noDefault;
            var makeControl = function (uiCol, fieldRow, data, controlWidths, idx) {
                try {
                    var placeholder = null;
                    var controlId = controlHeadId + '_' + idx.toString();
                    $('<div id="' + controlId + '"></div>').appendTo(uiCol);
                    var width = (controlWidths["textwidth"] - 2);
                    var codeNoWidth = Math.floor((width - 20) * 2 / 5);

                    var listOptions = {
                        width: width,
                        height: defaultHeight,
                        theme: options.theme,
                        localization: options.localization,
                        codeNoWidth: codeNoWidth
                    }
                    if (data) {
                        listOptions.source = data.rows;
                    }
                    else {
                        var chooseQuery = fieldRow["ChooseQuery".toUpperCase()];
                        noDefault = true;
                        if (chooseQuery != null && chooseQuery.substr(0, 8) == 'function') {
                            var func = scriptFunction("(" + chooseQuery + ")", formName);
                            var tmpValue = func(div, fieldRow, options.parameters);
                            if (tmpValue != null) {
                                listOptions.source = tmpValue.rows;
                                //listOptions.columns = tmpValue.columns;
                                noDefault = false;
                            }
                        }
                    }
                    if (controlWidths.text1width && controlWidths.text1width > 0) {
                        listOptions.codeNoWidth = controlWidths.text1width;
                        //listOptions.columns[0].width = controlWidths.text1width;
                        //listOptions.columns[1].width = listOptions.width - controlWidths.text1width;
                    }
                    $('#' + controlId)[jqxControl](listOptions);
                    $('#' + controlId).css('width', controlWidths["textwidth"] - getMinusWidth($('#' + controlId)) - 3);
                    var controlOptions = {
                        name: controlId, type: jqxControl, level: level,
                        objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                        fieldName: fieldRow["FIELDNAME"] + '_' + idx.toString(),
                        headName: fieldRow["HEADNAME"],
                        fieldRow: fieldRow,
                        setValueName: "codeNo",
                        eventName: 'selectedIndexChanged',
                        disabled: false,
                        parentControl: parentControl,
                        twoColumns: true,
                        codeNoWidth: codeNoWidth
                    };
                    options.controls.push(controlOptions);
                    $('#' + controlId).css('float', 'left');
                    $('#' + controlId).css('display', 'inline-block');
                    $('#' + controlId).css('margin-right', 2);

                    if (placeholder != null) {
                        $('#' + controlId).attr("placeholder", placeholder);
                    }
                    var dataLength = fieldRow["dataLength".toUpperCase()];
                    if (dataLength != null && dataLength != undefined) {
                        $('#' + controlId).attr("maxlength", dataLength.split(',')[0]);
                    }
                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                        $('#' + controlId)[jqxControl]("disabled", true);
                        controlOptions.disabled = true;
                    }
                    var tooltip = fieldRow["tooltip".toUpperCase()];
                    if (isEmpty(tooltip) == false) {
                        $('#' + controlId).attr("title", tooltip);
                    }
                    var TextForeground = fieldRow["TextForeground".toUpperCase()];
                    if (TextForeground != null && TextForeground != undefined) {
                        $('#' + controlId).css("color", getColorValue(TextForeground));
                    }
                    $('#' + controlId).css('minWidth', minWidth);
                    $('#' + controlId).css('display', 'inline-block');
                    focusOptionGroup(div, controlOptions);
                }
                catch (err) {
                    errorHandle(htmlName, "addList_makeControl", err);
                }
            }
            var lCounts = 1;
            if (fieldRow["RangeFlag".toUpperCase()] == 1) { lCounts = 2; }
            for (var i = 1; i <= lCounts; i++) {
                if (i == 2) {
                    addTilde(uiCols[1], controlWidths["tildewidth"]);
                }
                //建立元件
                makeControl(uiCols[1], fieldRow, settingData[fieldRow["FIELDNAME"].toUpperCase()], controlWidths, i);
            }
            setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'selectedIndexChanged', jqxControl, 'codeNo', true, null, null, noDefault);
        }
        catch (err) {
            errorHandle(htmlName, "addList", err);
        }
    }
    function getGridColumns(div, data, control) {
        try {
            var options = $.data(div, formName).options;
            var columns = cloneJSON(data.columns);
            var width1 = control.fieldRow["Text1Width".toUpperCase()];
            var width2 = control.fieldRow["Text2Width".toUpperCase()];
            if (width1 == null || width1 == 0) { width1 = 90; }
            if (width2 == null || width2 == 0) { width2 = 200; }
            for (var i = 0; i < columns.length; i++) {
                columns[i]['datafield'] = columns[i].name;
                columns[i]["text"] = columns[i].name;
                columns[i]["width"] = 80;
            }
            columns[0]["text"] = options.language.codeNo;
            columns[1]["text"] = options.language.description;
            columns[0]["width"] = width1;
            columns[1]["width"] = width2;
            return columns;
        }
        catch (err) {
            errorHandle(htmlName, "getGridColumns", err);
        }
    }
    //建立多選元件
    function addMultiSelect(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable, true);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width(), true, false, true);
            //建立元件
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'csMulti';
            var controlId = controlHeadId + '_1';
            var noNull = false;
            uiCols[0].css('width', '100%');
            $('<div id="' + controlId + '" style="width:100%;height:100%;"></div>').appendTo(uiCols[0]);
            var isOrder = (fieldRow["OBJECTTYPE"] == 22);
            var isReadOnly = (fieldRow["OBJECTTYPE"] == 28);
            var mutilOptions = {
                width: $(uiCols[0]).width() - 2,
                height: defaultHeight,
                buttonWidth: 120,
                theme: options.theme,
                localization: options.localization,
                buttonText: fieldRow["HEADNAME"],
                orderByChoose: isOrder,
                showOrdColumn: isOrder,
                disabled: false,
                isReadOnly: isReadOnly
            }
            var data = settingData[fieldRow["FIELDNAME"].toUpperCase()];
            var controlOptions = {
                name: controlId, type: jqxControl, level: level,
                objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                fieldName: fieldRow["FIELDNAME"] + '_1',
                headName: fieldRow["HEADNAME"],
                fieldRow: fieldRow,
                noHead: true,
                data: data,
                setValueName: "setDisplayValue",
                getValueName: "getChooseQuoteList",
                eventName: 'chooseChanged',
                parentControl: parentControl,
                noTextWidth: true
            };
            var setSource = function (data) {
                mutilOptions.columns = getGridColumns(div, data, controlOptions);
                mutilOptions.source = data.rows;
                mutilOptions.codeNoField = data.columns[0]['name'];
                mutilOptions.descriptionField = data.columns[1]['name'];
                if (fieldRow["SelectAll".toUpperCase()] == 1) {
                    mutilOptions.selectAll = true;
                    noNull = true;
                }
            }
            if (data) {
                setSource(data);
                //mutilOptions.columns = getGridColumns(div, data, controlOptions);
                //mutilOptions.source = data.rows;
                //mutilOptions.codeNoField = data.columns[0]['name'];
                //mutilOptions.descriptionField = data.columns[1]['name'];
                //if (fieldRow["SelectAll".toUpperCase()] == 1) {
                //    mutilOptions.selectAll = true;
                //    noNull = true;
                //}
            }
            else {
                var chooseQuery = fieldRow["ChooseQuery".toUpperCase()];
                if (chooseQuery != null && chooseQuery.substr(0, 8) == 'function') {
                    var func = scriptFunction("(" + chooseQuery + ")", formName);
                    var tmpValue = func(div, fieldRow, inData);
                    if (tmpValue != null) {
                        setSource(tmpValue);
                    }
                }
            }
            if (fieldRow['MUSTBE'] == 1) {
                mutilOptions['buttonText'] = fieldRow["HEADNAME"] + '*';
            }
            $('#' + controlId).csMulti(mutilOptions);
            options.controls.push(controlOptions);
            if (fieldRow['MUSTBE'] == 1) {
                $('#' + controlId).find('button, input').css('color', 'red');
            }
            var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
            if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                $('#' + controlId)[jqxControl]("disabled", true);
                controlOptions.disabled = true;
            }
            var tooltip = fieldRow["tooltip".toUpperCase()];
            if (isEmpty(tooltip) == false) {
                $('#' + controlId).attr("title", tooltip);
            }
            $('#' + controlId).css('float', 'left');
            $('#' + controlId).css('display', 'inline-block');
            focusOptionGroup(div, controlOptions);
            setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'chooseChanged', jqxControl, 'setDisplayValue', true, "getChooseQuoteList", noNull, (mutilOptions.source == null));
        }
        catch (err) {
            errorHandle(htmlName, "addMultiSelect", err);
        }
    };
    //建立地址元件1
    function addAddress1(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable, true);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width(), true);
            //建立元件
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'csAddress1';
            var controlId = controlHeadId + '_1';
            uiCols[0].css('width', '100%');
            $('<div id="' + controlId + '" style="width:100%;height:100%;"></div>').appendTo(uiCols[0]);
            var addressOptions = {
                width: '100%',
                buttonWidth: 105,
                buttonHeight: defaultHeight,
                buttonText: fieldRow["HEADNAME"],
                loginInfo: cloneJSON(options.loginInfo),
                theme: options.theme
            }
            if (fieldRow["OBJECTTYPE".toUpperCase()] == 38) {
                addressOptions.filterAreaCode = true;
                addressOptions.edableFilterAreaCode = false;
            }
            options.controlLoaded[controlId] = false;
            $('#' + controlId).on("loadCompleted", function (r) {
                options.controlLoaded[controlId] = true;
                triggerMultiLoaded(div);
            });
            $('#' + controlId)[jqxControl](addressOptions);
            var controlOptions = {
                name: controlId, type: jqxControl, level: level,
                objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                fieldName: fieldRow["FIELDNAME"] + '_1',
                headName: fieldRow["HEADNAME"],
                fieldRow: fieldRow,
                noHead: true,
                parentControl: parentControl,
                setValueName: "setDisplayValue"
            };
            options.controls.push(controlOptions);

            var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
            if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                $('#' + controlId)[jqxControl]("disabled", true);
                controlOptions.disabled = true;
            }
            var tooltip = fieldRow["tooltip".toUpperCase()];
            if (isEmpty(tooltip) == false) {
                $('#' + controlId).attr("title", tooltip);
            }
            $('#' + controlId).css('float', 'left');
            $('#' + controlId).css('display', 'inline-block');

            //setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'change', jqxControl, 'setDisplayValue', true);
        }
        catch (err) {
            errorHandle(htmlName, "addAddress1", err);
        }
    };
    //建立地址元件2
    function addAddress2(div, fieldRow, controlsTable, level, isSingle, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var parent;
            if (isSingle != true) {
                parent = $(controlsTable);
                //parent = $(controlsTable).parent();
                //$(controlsTable).remove();
            }
            else {
                parent = controlsTable;
            }
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'csAddress2';
            var controlId = controlHeadId + '_1';

            $('<div id="' + controlId + '" style="width:100%;height:116px;"></div>').appendTo(parent);
            var addressOptions = {
                height: 110,
                width: '99.2%',
                loginInfo: cloneJSON(options.loginInfo),
                theme: options.theme
            }
            if (fieldRow["OBJECTTYPE".toUpperCase()] == 39) {
                addressOptions.filterAreaCode = true;
                addressOptions.edableFilterAreaCode = false;
            }
            options.controlLoaded[controlId] = false;
            $('#' + controlId).on("loadCompleted", function (r) {
                options.controlLoaded[controlId] = true;
                triggerMultiLoaded(div);
            });
            $('#' + controlId)[jqxControl](addressOptions);
            var controlOptions = {
                name: controlId, type: jqxControl, level: level,
                objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                fieldName: fieldRow["FIELDNAME"] + '_1',
                headName: fieldRow["HEADNAME"],
                fieldRow: fieldRow,
                noHead: true,
                parentControl: parentControl,
                setValueName: "setDisplayValue"
            };
            options.controls.push(controlOptions);

            var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
            if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                $('#' + controlId)[jqxControl]("disabled", true);
                controlOptions.disabled = true;
            }
            var tooltip = fieldRow["tooltip".toUpperCase()];
            if (isEmpty(tooltip) == false) {
                $('#' + controlId).attr("title", tooltip);
            }
            $('#' + controlId).css('float', 'left');
            $('#' + controlId).css('margin-left', 1);
            $('#' + controlId).css('display', 'inline-block');

            //            setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'change', jqxControl, 'setDisplayValue', true);
        }
        catch (err) {
            errorHandle(htmlName, "addAddress2", err);
        }
    };
    //建立地址元件3
    function addAddress3(div, fieldRow, controlsTable, level, isSingle, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var parent;
            if (isSingle != true) {
                parent = $(controlsTable);
                //parent = $(controlsTable).parent();
                //$(controlsTable).remove();
            }
            else {
                parent = controlsTable;
            }
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'csAddress3';
            var controlId = controlHeadId + '_1';

            $('<div id="' + controlId + '" style="width:100%;height:120px;"></div>').appendTo(parent);
            var addressOptions = {
                width: '99.2%',
                loginInfo: cloneJSON(options.loginInfo),
                theme: options.theme
            }
            if (fieldRow["OBJECTTYPE".toUpperCase()] == 40) {
                addressOptions.filterAreaCode = true;
                addressOptions.edableFilterAreaCode = false;
            }
            options.controlLoaded[controlId] = false;
            $('#' + controlId).on("loadCompleted", function (r) {
                //2017/08/25 Jacky 解決弄衖無值問題
                $('#' + controlId)[jqxControl]("resize");
                options.controlLoaded[controlId] = true;
                triggerMultiLoaded(div);
            });
            $('#' + controlId)[jqxControl](addressOptions);
            var controlOptions = {
                name: controlId, type: jqxControl, level: level,
                objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                fieldName: fieldRow["FIELDNAME"] + '_1',
                headName: fieldRow["HEADNAME"],
                fieldRow: fieldRow,
                noHead: true,
                parentControl: parentControl,
                setValueName: "setDisplayValue"
            };
            options.controls.push(controlOptions);

            var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
            if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                $('#' + controlId)[jqxControl]("disabled", true);
                controlOptions.disabled = true;
            }
            var tooltip = fieldRow["tooltip".toUpperCase()];
            if (isEmpty(tooltip) == false) {
                $('#' + controlId).attr("title", tooltip);
            }
            $('#' + controlId).css('float', 'left');
            $('#' + controlId).css('margin-left', 1);
            $('#' + controlId).css('display', 'inline-block');

            //            setDefaultAndAddHandler(div, controlHeadId, fieldRow, 'change', jqxControl, 'setDisplayValue', true);
        }
        catch (err) {
            errorHandle(htmlName, "addAddress3", err);
        }
    };
    //建立FileUpload 元件
    function addUploadFile(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 3);
            //uiCols[1].css('width', (controlsTable.width() - controlWidths["headwidth"] - 3));
            //建立欄位說明中文名稱
            addHeadLabel(uiCols[0], fieldRow, controlWidths["headwidth"]);
            //建立元件
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'csUploadFile';
            var controlId = controlHeadId + '_1';
            $('<div id="' + controlId + '" style="height:100%;"></div>').appendTo(uiCols[1]);
            //UploadFileType 0=不限, 1=Excel, 2=CSV, 3=TXT
            var accept;
            switch (fieldRow["UploadFileType".toUpperCase()]) {
                case 1:
                    accept = ".xls,.xlsx";
                    break;
                case 2:
                    accept = ".csv";
                    break;
                case 3:
                    accept = ".txt";
                    break;
            }

            $('#' + controlId).csUploadFile({
                height: defaultHeight,
                accept: accept,
                changeFileName: fieldRow["OBJECTTYPE".toUpperCase()] != 32,
                theme: options.theme
            });
            var controlOptions = {
                name: controlId,
                type: jqxControl,
                level: level,
                objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                fieldName: fieldRow["FIELDNAME"] + '_1',
                headName: fieldRow["HEADNAME"],
                fieldRow: fieldRow,
                noHead: false,
                parentControl: parentControl
            };
            options.controls.push(controlOptions);
            //改變元件字體顏色
            var TextForeground = fieldRow["TextForeground".toUpperCase()];
            if (TextForeground != null && TextForeground != undefined) {
                $('#' + controlId).css("color", getColorValue(TextForeground));
                $('#' + controlId).find("input").css("color", getColorValue(TextForeground));
            }
            var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
            if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                $('#' + controlId)[jqxControl]("disabled", true);
                controlOptions.disabled = true;
            }
            var tooltip = fieldRow["tooltip".toUpperCase()];
            if (isEmpty(tooltip) == false) {
                $('#' + controlId).attr("title", tooltip);
            }
            $('#' + controlId).css('float', 'left');
            $('#' + controlId).css('display', 'inline-block');
            //$('#jqxFileUpload').jqxFileUpload({ width: 300, uploadUrl: 'imageUpload.php', fileInputName: 'fileToUpload' });
        }
        catch (err) {
            errorHandle(htmlName, "addUploadFile", err);
        }
    };
    //建立FileUpload 元件
    function addDownloadFile(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 3);
            //uiCols[1].css('width', (controlsTable.width() - controlWidths["headwidth"] - 3));
            //建立欄位說明中文名稱
            addHeadLabel(uiCols[0], fieldRow, controlWidths["headwidth"]);
            //建立元件
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'csDownloadFile';
            var controlId = controlHeadId + '_1';
            $('<div id="' + controlId + '" style="height:100%;"></div>').appendTo(uiCols[1]);
            var dType;
            if (fieldRow["OBJECTTYPE".toUpperCase()] == 20) {
                dType = 'button';
            }
            else {
                dType = 'link';
            }
            $('#' + controlId)[jqxControl]({
                height: defaultHeight,
                showFileName: true,
                type: dType,
                theme: options.theme
            });
            var controlOptions = {
                name: controlId,
                type: jqxControl,
                level: level,
                objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                fieldName: fieldRow["FIELDNAME"] + '_1',
                headName: fieldRow["HEADNAME"],
                fieldRow: fieldRow,
                noHead: false,
                parentControl: parentControl
            };
            options.controls.push(controlOptions);
            //改變元件字體顏色
            var TextForeground = fieldRow["TextForeground".toUpperCase()];
            if (TextForeground != null && TextForeground != undefined) {
                $('#' + controlId).css("color", getColorValue(TextForeground));
                $('#' + controlId).find("a").css("color", getColorValue(TextForeground));
                $('#' + controlId).find("input").css("color", getColorValue(TextForeground));
            }
            var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
            if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                $('#' + controlId)[jqxControl]("disabled", true);
                controlOptions.disabled = true;
            }
            var tooltip = fieldRow["tooltip".toUpperCase()];
            if (isEmpty(tooltip) == false) {
                $('#' + controlId).attr("title", tooltip);
            }
            //fileName
            $('#' + controlId).css('float', 'left');
            $('#' + controlId).css('display', 'inline-block');

            setDefaultAndAddHandler(div, controlHeadId, fieldRow, null, jqxControl, 'setURL', null, null, true);
        }
        catch (err) {
            errorHandle(htmlName, "addDownloadFile", err);
        }
    };
    //建立HyperLink 元件
    function addHyperLink(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 3);
            //uiCols[1].css('width', (controlsTable.width() - controlWidths["headwidth"] - 3));
            //建立欄位說明中文名稱
            addHeadLabel(uiCols[0], fieldRow, controlWidths["headwidth"]);
            //建立元件
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'csDownloadFile';
            var controlId = controlHeadId + '_1';
            $('<div id="' + controlId + '" style="height:100%;"></div>').appendTo(uiCols[1]);
            var dType;
            if (fieldRow["OBJECTTYPE".toUpperCase()] == 20) {
                dType = 'button';
            }
            else {
                dType = 'link';
            }
            $('#' + controlId)[jqxControl]({
                height: defaultHeight,
                showFileName: true,
                type: dType,
                theme: options.theme
            });
            var controlOptions = {
                name: controlId,
                type: jqxControl,
                level: level,
                objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                fieldName: fieldRow["FIELDNAME"] + '_1',
                headName: fieldRow["HEADNAME"],
                fieldRow: fieldRow,
                noHead: false,
                parentControl: parentControl
            };
            options.controls.push(controlOptions);
            //改變元件字體顏色
            var TextForeground = fieldRow["TextForeground".toUpperCase()];
            if (TextForeground != null && TextForeground != undefined) {
                $('#' + controlId).css("color", getColorValue(TextForeground));
            }
            var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
            if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                $('#' + controlId)[jqxControl]("disabled", true);
                controlOptions.disabled = true;
            }
            var tooltip = fieldRow["tooltip".toUpperCase()];
            if (isEmpty(tooltip) == false) {
                $('#' + controlId).attr("title", tooltip);
            }
            //fileName
            $('#' + controlId).css('float', 'left');
            $('#' + controlId).css('display', 'inline-block');

            setDefaultAndAddHandler(div, controlHeadId, fieldRow, null, jqxControl, 'setURL', null, null, true);
        }
        catch (err) {
            errorHandle(htmlName, "addHyperLink", err);
        }
    };
    //建立GroupBox 元件
    function addGroupBox(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;

            var parent = $(controlsTable);
            //var parent = $(controlsTable).parent();
            //$(controlsTable).remove();
            var controlId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"] + '_1';
            $('<div id="' + controlId + '"></div>').appendTo(parent);
            var gOptions = {
                width: '99.2%',
                //height: '99%',
                theme: options.theme
            }
            if (fieldRow['HeightType'.toUpperCase()] == 1) {
                gOptions.height = fieldRow['Height'.toUpperCase()];
            }
            if (fieldRow['widthType'.toUpperCase()] == 1) {
                gOptions.width = fieldRow['width'.toUpperCase()];
            }
            var controlType;
            var content;
            //$('#' + controlId).css('margin-top', 1);
            //$('#' + controlId).css('margin-bottom', 1);
            //$('#' + controlId).css('margin-left', 1);
            //$('#' + controlId).css('margin-right', 1);

            if (!fieldRow["HEADNAME"] || fieldRow["HEADNAME"].toString().trim().length == 0) {
                controlType = "jqxPanel";
                //$('#' + controlId).jqxPanel($.extend({}, gOptions, { sizeMode: "wrap" }));
                //gOptions = $.extend({}, gOptions, {
                //    sizeMode: "wrap"
                //});
                $('#' + controlId).jqxPanel(gOptions);
                content = $('#panelContent' + controlId);
            }
            else {
                $('#' + controlId).css('margin-left', 1);
                $('#' + controlId).css('margin-bottom', 1);
                var contentId = controlId + '_cnt';
                $('<div>' + fieldRow["HEADNAME"].toString() + '</div>').appendTo($('#' + controlId));
                $('<div id = "' + contentId + '">x</div>').appendTo($('#' + controlId));
                gOptions = $.extend({}, gOptions, {
                    showArrow: false,
                    expanded: true,
                    toggleMode: 'none',
                    collapseAnimationDuration: 0,
                    expandAnimationDuration: 0
                });
                if (gOptions.height == null) {
                    gOptions.height = "auto";
                }
                controlType = "jqxExpander";
                //$('#' + controlId).on('expanded', function () {
                //    //formResize(div);
                //});
                $('#' + controlId).jqxExpander(gOptions);
                $('#' + controlId).find('.jqx-expander-header').css({ 'height': 16, 'padding-bottom': 1 });
                content = $('#' + contentId);
                if (gOptions.height == "auto") {
                    $(content).css('padding-bottom', 2);
                }
                else {
                    $(content).css('height', $(content).height() - 2);
                }
                $(content).text('');
            }
            var controlOptions = {
                name: controlId, type: controlType, level: level,
                objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                fieldName: fieldRow["FIELDNAME"] + '_1',
                headName: fieldRow["HEADNAME"],
                fieldRow: fieldRow,
                noHead: true,
                parentControl: parentControl
            };
            options.controls.push(controlOptions);
            var fieldtableName = Object.keys(settingData)[0];
            var fieldRows = settingData[fieldtableName].rows;
            var child = subMultiCondition(div, fieldRows, content, fieldRow["FIELDNAME".toUpperCase()], level + 1, controlOptions);
            //if (controlType == "jqxExpander") {
            //    $('#' + controlId).jqxExpander('render');
            //}
            var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
            if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                $('#' + controlId)[controlType]({ disabled: true });
                controlOptions.disabled = true;
            }
            var tooltip = fieldRow["tooltip".toUpperCase()];
            if (isEmpty(tooltip) == false) {
                $('#' + controlId).attr("title", tooltip);
            }
            $(content).css('overflow', 'hidden');
            $(content).children().prop('style').removeProperty('height');
            //removeClass
        }
        catch (err) {
            errorHandle(htmlName, "addGroupBox", err);
        }
    };
    //建立Tab Control 元件
    function addTabs(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var fieldtableName = Object.keys(settingData)[0];
            var fieldRows = settingData[fieldtableName].rows;

            var parent = $(controlsTable);
            //var parent = $(controlsTable).parent();
            //$(controlsTable).remove();
            var controlId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"] + '_1';
            $('<div id="' + controlId + '"></div>').appendTo(parent);
            var ul = $('<ul></ul>').appendTo($('#' + controlId));
            var tabsId = [];
            for (var i = 0; i < fieldRows.length; i++) {
                if (fieldRow["FIELDNAME"] == fieldRows[i]['GROUPBOXNAME'] && fieldRows[i]["ReadOnly".toUpperCase()] != 1) {
                    $('<li>' + fieldRows[i]['HEADNAME'] + '</li>').appendTo(ul);
                    tabsId.push({
                        name: $(div).prop('id') + '_' + fieldRows[i]["FIELDNAME"] + '_1',
                        fieldName: fieldRows[i]["FIELDNAME"],
                        fieldRow: fieldRows[i],
                        idx: tabsId.length
                    });
                    //options.controls.push({
                    //    name: $(div).prop('id') + fieldRows[i]["FIELDNAME"] + '_1',
                    //    type: 'TabsItem',
                    //    fieldRow: fieldRows[i],
                    //    fieldName: fieldRows[i]["FIELDNAME"]
                    //});
                    $('<div id="' + tabsId[tabsId.length - 1].name + '" ></div>').appendTo($('#' + controlId));
                }
            }
            var gOptions = {
                width: '99.6%',
                height: '99.8%',
                theme: options.theme,
                keyboardNavigation: false
            }
            if (fieldRow['HeightType'.toUpperCase()] == 1) {
                gOptions.height = fieldRow['Height'.toUpperCase()];
            }
            if (fieldRow['widthType'.toUpperCase()] == 1) {
                gOptions.width = fieldRow['width'.toUpperCase()];
            }
            //2017/01/12 Jacky 增加 29 於事後再建立元件
            var createOnSelect = (fieldRow["OBJECTTYPE".toUpperCase()] == 29);
            $('#' + controlId).csTabs(gOptions);
            $('#' + controlId).css({
                'margin-left': 1,
                'margin-right': 1,
                'padding-top': 1
            });
            $('#' + controlId).attr('createForm', "condition");
            var controlOptions = {
                name: controlId, type: 'csTabs', level: level,
                objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                fieldName: fieldRow["FIELDNAME"] + '_1',
                headName: fieldRow["HEADNAME"],
                fieldRow: fieldRow,
                noHead: true,
                tabsId: tabsId,
                parentControl: parentControl
            };
            options.controls.push(controlOptions);
            var createTabItemControl = function (idx) {
                try {
                    if (tabsId[idx].isCreate != true) {
                        $('#' + controlId).csTabs('select', idx);
                        var tabItem = $('#' + controlId).csTabs('getContentAt', idx);
                        if (fieldRow["groupName".toUpperCase()] == null) {
                            $(tabItem).css('overflow', 'hidden');
                        }
                        subMultiCondition(div, fieldRows, tabItem, tabsId[idx].fieldName, level + 1, controlOptions);
                        tabsId[idx].isCreate = true;
                        $('#' + tabsId[idx].name).children().prop('style').removeProperty('height');
                    }
                }
                catch (err) {
                    errorHandle(htmlName, "addTabs_createTabItemControl", err);
                }
            }
            for (var i = 0; i < tabsId.length; i++) {
                if (i == 0 || createOnSelect == false) {
                    createTabItemControl(i);
                    formResize(div, tabsId[i].fieldName);
                }
                //$('#' + controlId).csTabs('select', i);
                //var tabItem = $('#' + controlId).csTabs('getContentAt', i);
                //if (fieldRow["groupName".toUpperCase()] == null) {
                //    $(tabItem).css('overflow', 'hidden');
                //}
                //subMultiCondition(div, fieldRows, tabItem, tabsId[i].fieldName, level + 1, controlOptions);
            }
            if (tabsId.length > 0) {
                $('#' + controlId).csTabs('select', 0);
            }
            $('#' + controlId).on('selected', function (event) {
                var j = event.args.item;
                createTabItemControl(j)
                formResize(div, tabsId[j].fieldName);
                var btn = $('#' + controlId).find('.jqx-button');
                $('#' + controlId).find('.jqx-button').find('img').css({
                    'top': (buttonsHeight - btn.find("img").height()) / 2 - 1,
                    left: 3
                });
                //$('#' + controlId).find('.jqx-button').find('img').css({ left: 7, top: 4 });
                $('#' + controlId).find('.jqx-button').find('span').css({ left: 29, top: 5 });
            });
        }
        catch (err) {
            errorHandle(htmlName, "addTabs", err);
        }
    };
    function addDynamicGrid(div, fieldRow, controlsTable, level, isSingle, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var fieldtableName = Object.keys(settingData)[0];
            var fieldRows = settingData[fieldtableName].rows;

            var parent;
            if (isSingle != true) {
                parent = $(controlsTable);
                //parent = $(controlsTable).parent();
                //$(controlsTable).remove();
            }
            else {
                parent = controlsTable;
            }
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'dynamicGrid';
            var controlId = controlHeadId + '_1';

            $('<div id="' + controlId + '" style="width:100%;height:116px;"></div>').appendTo(parent);
            var keys = Object.keys(settingData);
            var kLength = keys.length;
            var gridSettingData = {};
            for (var i = 0 ; i < kLength; i++) {
                var gridHead = fieldRow["FIELDNAME"].toUpperCase() + 'GRID_';
                if (keys[i].indexOf(gridHead) >= 0) {
                    gridSettingData[keys[i].replace(gridHead, '')] = settingData[keys[i]];
                }
            }
            var container = options.container;
            if (container == null) { container = $(div); }
            var gridOptions = {
                height: '99.2%',
                width: '99.2%',
                loginInfo: cloneJSON(options.loginInfo),
                programId: fieldRow["FIELDNAME"],
                sysProgramId: fieldRow["FIELDNAME"],
                settingData: gridSettingData,
                localization: options.localization,
                theme: options.theme,
                container: container,
                editMode: options.editMode
            }
            var gridFieldControls = [];
            ////如有子設定則表示可直接修改Grid
            //for (var i = 0; i < fieldRows.length; i++) {
            //    if (fieldRow["FIELDNAME"] == fieldRows[i]['GROUPBOXNAME']) {
            //        var tmpDIV = $("<div></div>").appendTo($(div));
            //        addConditionControls(div, fieldRows[i], tmpDIV, level + 1, false, $('#' + controlId), true );
            //        var childControl = $(tmpDIV.children()[0]);
            //        childControl.appendTo($(div));
            //        childControl.css({ "z-index": 99999, position: "absolute", top: 30 });
            //        tmpDIV.remove();
            //        gridFieldControls.push({
            //            dataField: fieldRows[i]['FIELDNAME'],
            //            columnType: fieldRows[i]['OBJECTTYPE'],
            //            control: childControl,
            //            fieldRows: fieldRows[i]
            //        });
            //    }
            //}
            gridOptions.gridFieldControls = gridFieldControls;
            //$('#' + controlId).css({ 'overflow': 'auto' });
            hasCondition = false;
            if (gridSettingData['DYMENU'] != null && gridSettingData['DYMENU'].rows.length > 0) {
                hasCondition = true;
            }
            options.controlLoaded[controlId] = false;
            $('#' + controlId).on("loaded", function (r) {
                options.controlLoaded[controlId] = true;
                var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                    $('#' + controlId)[jqxControl]("disabled", true);
                    controlOptions.disabled = true;
                }
                triggerMultiLoaded(div);
            });
            $('#' + controlId).on("barControlCreated buttonCreated", function (r) {
                var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                    $('#' + controlId)[jqxControl]("disabled", true);
                    controlOptions.disabled = true;
                }
            });
            if (fieldRow["OBJECTTYPE"] == 43) {
                //2021/02/05 Jacky 取得condition
                var data = getObjectData(div, false);
                if (data != null && data[2] != null) {
                    gridOptions.parentData = conditionToData(data[2]);
                }
            }
            $('#' + controlId)[jqxControl](gridOptions);
            var controlOptions = {
                name: controlId, type: jqxControl, level: level,
                objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                fieldName: fieldRow["FIELDNAME"] + '_1',
                headName: fieldRow["HEADNAME"],
                fieldRow: fieldRow,
                noHead: true,
                hasCondition: hasCondition,
                parentControl: parentControl
            };
            options.controls.push(controlOptions);
            $('#' + controlId).off("beforeButtonClick." + controlId + "cond");
            $('#' + controlId).on("beforeButtonClick." + controlId + "cond", function () {
                try {
                    var r = getObjectData(div, false);
                    var gOptions = $.data($('#' + controlId)[0], jqxControl).options;
                    $.extend(gOptions.parameters, conditionToDataTable(r[2].condition));
                    var keys = Object.keys(r[2]);
                    for (var i = 0 ; i < keys.length; i++) {
                        if (keys[i].toLowerCase() != "condition") {
                            var table = {};
                            table[keys[i]] = r[2][keys[i]];
                            $.extend(gOptions.parameters, table);
                        }
                    }
                }
                catch (err) {
                    errorHandle(htmlName, "addDynamicGrid_beforeButtonClick", err);
                }
            });
            var doValueChanged = function (eventName, e) {
                if (isEmpty(fieldRow["VALUECHANGED"]) != true) {
                    var valueChanged = fieldRow["VALUECHANGED"];
                    if (valueChanged.substr(0, 8) == 'function') {
                        var func = scriptFunction("(" + valueChanged + ")", formName);
                        func(div, fieldRow, options.parameters, controlOptions, eventName, e);
                    }
                }
            }
            $('#' + controlId).off("cellValueChanged." + controlId + "cond");
            $('#' + controlId).on("cellValueChanged." + controlId + "cond", function (e) {
                try {
                    doValueChanged("cellValueChanged", e);
                }
                catch (err) {
                    errorHandle(htmlName, "addDynamicGrid_cellValueChanged", err);
                }
            });
            $('#' + controlId).off("rowSelected." + controlId + "cond");
            $('#' + controlId).on("rowSelected." + controlId + "cond", function (e) {
                try {
                    doValueChanged("rowSelected", e);
                    var row = $('#' + controlId)[jqxControl]('getFocusRow', false);
                    var keys = Object.keys(row);
                    if (row != null && keys.length > 0) {
                        for (var r = 0; r < keys.length; r++) {
                            valueChange(div, fieldRow["FIELDNAME"] + "." + keys[r], row[keys[r]], function () {
                            });
                        }
                    }
                }
                catch (err) {
                    errorHandle(htmlName, "addDynamicGrid_rowSelected", err);
                }
            });
            var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
            if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                $('#' + controlId)[jqxControl]("disabled", true);
                controlOptions.disabled = true;
            }

            var tooltip = fieldRow["tooltip".toUpperCase()];
            if (isEmpty(tooltip) == false) {
                $('#' + controlId).attr("title", tooltip);
            }
            $('#' + controlId).css('float', 'left');
            $('#' + controlId).css('display', 'inline-block');
        }
        catch (err) {
            errorHandle(htmlName, "addDynamicGrid", err);
        }
    }
    function addDynUpdateGrid(div, fieldRow, controlsTable, level, isSingle, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var fieldtableName = Object.keys(settingData)[0];
            var fieldRows = settingData[fieldtableName].rows;

            var parent;
            if (isSingle != true) {
                parent = $(controlsTable);
                //parent = $(controlsTable).parent();
                //$(controlsTable).remove();
            }
            else {
                parent = controlsTable;
            }
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'dynUpdateGrid';
            var updName = "UPD";
            if (fieldRow["OBJECTTYPE"] == 42) {
                jqxControl = 'dynUpdateGrid2';
                updName = "UPD2";
            }
            var controlId = controlHeadId + '_1';

            $('<div id="' + controlId + '" style="width:100%;height:100%;"></div>').appendTo(parent);
            var keys = Object.keys(settingData);
            var kLength = keys.length;
            var objSettingData = {};
            for (var i = 0 ; i < kLength; i++) {
                var updHead = fieldRow["FIELDNAME"].toUpperCase() + updName + '_';
                if (keys[i].indexOf(updHead) >= 0) {
                    objSettingData[keys[i].replace(updHead, '')] = settingData[keys[i]];
                }
            }
            var container = options.container;
            if (container == null) { container = $(div); }
            var gridOptions = {
                height: '99.2%',
                width: '99.2%',
                loginInfo: cloneJSON(options.loginInfo),
                programId: fieldRow["FIELDNAME"],
                sysProgramId: fieldRow["FIELDNAME"],
                settingData: objSettingData,
                localization: options.localization,
                theme: options.theme,
                container: container,
                editMode: (fieldRow["OBJECTTYPE"] == 42 ? editMode.view : options.editMode)
            }
            var gridFieldControls = [];

            gridOptions.gridFieldControls = gridFieldControls;
            //$('#' + controlId).css({ 'overflow': 'auto' });
            options.controlLoaded[controlId] = false;
            var controlOptions = {
                name: controlId, type: jqxControl, level: level,
                objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                fieldName: fieldRow["FIELDNAME"] + '_1',
                headName: fieldRow["HEADNAME"],
                fieldRow: fieldRow,
                noHead: true,
                parentControl: parentControl
            };
            $('#' + controlId).on("loaded", function (r) {
                options.controlLoaded[controlId] = true;
                var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                    $('#' + controlId)[jqxControl]("disabled", true);
                    controlOptions.disabled = true;
                }
                var doValueChanged = function (eventName, e) {
                    if (isEmpty(fieldRow["VALUECHANGED"]) != true) {
                        var valueChanged = fieldRow["VALUECHANGED"];
                        if (valueChanged.substr(0, 8) == 'function') {
                            var func = scriptFunction("(" + valueChanged + ")", formName);
                            func(div, fieldRow, options.parameters, controlOptions, eventName, e);
                        }
                    }
                }
                $('#' + controlId + "iGrid").off("cellValueChanged." + controlId + "iGrid" + "cond");
                $('#' + controlId + "iGrid").on("cellValueChanged." + controlId + "iGrid" + "cond", function (e) {
                    try {
                        doValueChanged("cellValueChanged", e);
                    }
                    catch (err) {
                        errorHandle(htmlName, "addDynUpdateGrid_cellValueChanged", err);
                    }
                });
                $('#' + controlId + "iGrid").off("rowSelected." + controlId + "iGrid" + "cond");
                $('#' + controlId + "iGrid").on("rowSelected." + controlId + "iGrid" + "cond", function (e) {
                    try {
                        doValueChanged("rowSelected", e);
                        var row = $('#' + controlId + "iGrid")["dynamicGrid"]('getFocusRow', false);
                        var keys = Object.keys(row);
                        if (row != null && keys.length > 0) {
                            for (var r = 0; r < keys.length; r++) {
                                valueChange(div, fieldRow["FIELDNAME"] + "." + keys[r], row[keys[r]], function () {
                                });
                            }
                        }
                    }
                    catch (err) {
                        errorHandle(htmlName, "addDynUpdateGrid_rowSelected", err);
                    }
                });
                triggerMultiLoaded(div);
            });
            $('#' + controlId)[jqxControl](gridOptions);

            options.controls.push(controlOptions);
            $('#' + controlId).off("beforeButtonClick." + controlId + "cond");
            $('#' + controlId).on("beforeButtonClick." + controlId + "cond", function () {
                try {
                    var r = getObjectData(div, false);
                    var gOptions = $.data($('#' + controlId)[0], jqxControl).options;
                    $.extend(gOptions.parameters, conditionToDataTable(r[2].condition));
                    var keys = Object.keys(r[2]);
                    for (var i = 0 ; i < keys.length; i++) {
                        if (keys[i].toLowerCase() != "condition") {
                            var table = {};
                            table[keys[i]] = r[2][keys[i]];
                            $.extend(gOptions.parameters, table);
                        }
                    }
                }
                catch (err) {
                    errorHandle(htmlName, "addDynUpdateGrid_beforeButtonClick", err);
                }
            });

            var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
            if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                $('#' + controlId)[jqxControl]("disabled", true);
                controlOptions.disabled = true;
            }
            var tooltip = fieldRow["tooltip".toUpperCase()];
            if (isEmpty(tooltip) == false) {
                $('#' + controlId).attr("title", tooltip);
            }
            $('#' + controlId).css('float', 'left');
            $('#' + controlId).css('display', 'inline-block');
        }
        catch (err) {
            errorHandle(htmlName, "addDynUpdateGrid", err);
        }
    }
    function addDynConditionGrid(div, fieldRow, controlsTable, level, isSingle, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var fieldtableName = Object.keys(settingData)[0];
            var fieldRows = settingData[fieldtableName].rows;

            var parent;
            if (isSingle != true) {
                parent = $(controlsTable);
                //parent = $(controlsTable).parent();
                //$(controlsTable).remove();
            }
            else {
                parent = controlsTable;
            }
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'dynConditionGrid';
            var updName = "CondGrid";
            var controlId = controlHeadId + '_1';

            $('<div id="' + controlId + '" style="width:100%;height:100%;"></div>').appendTo(parent);
            var keys = Object.keys(settingData);
            var kLength = keys.length;
            var objSettingData = {};
            for (var i = 0 ; i < kLength; i++) {
                var updHead = fieldRow["FIELDNAME"].toUpperCase() + updName + '_';
                if (keys[i].indexOf(updHead) >= 0) {
                    objSettingData[keys[i].replace(updHead, '')] = settingData[keys[i]];
                }
            }
            var container = options.container;
            if (container == null) { container = $(div); }
            var gridOptions = {
                height: '99.2%',
                width: '99.2%',
                loginInfo: cloneJSON(options.loginInfo),
                programId: fieldRow["FIELDNAME"],
                sysProgramId: fieldRow["FIELDNAME"],
                settingData: objSettingData,
                localization: options.localization,
                theme: options.theme,
                parameters: cloneJSON(options.parameters),
                container: container,
                editMode: options.editMode
            }
            var gridFieldControls = [];

            gridOptions.gridFieldControls = gridFieldControls;
            //$('#' + controlId).css({ 'overflow': 'auto' });
            options.controlLoaded[controlId] = false;
            var controlOptions = {
                name: controlId, type: jqxControl, level: level,
                objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                fieldName: fieldRow["FIELDNAME"] + '_1',
                headName: fieldRow["HEADNAME"],
                fieldRow: fieldRow,
                noHead: true,
                parentControl: parentControl
            };
            $('#' + controlId).on("loaded", function (r) {
                options.controlLoaded[controlId] = true;
                var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                    $('#' + controlId)[jqxControl]("disabled", true);
                    controlOptions.disabled = true;
                }
                var doValueChanged = function (eventName, e) {
                    if (isEmpty(fieldRow["VALUECHANGED"]) != true) {
                        var valueChanged = fieldRow["VALUECHANGED"];
                        if (valueChanged.substr(0, 8) == 'function') {
                            var func = scriptFunction("(" + valueChanged + ")", formName);
                            func(div, fieldRow, options.parameters, controlOptions, eventName, e);
                        }
                    }
                }
                var childOptions = $('#' + controlId)[jqxControl]("options");
                var gridControl = getRowByKeyValue(childOptions.controls, "type", "dynamicGrid");
                $('#' + controlId).off("afterFindClick." + controlId + " afterClearClick." + controlId);
                $('#' + controlId).on("afterFindClick." + controlId + " afterClearClick." + controlId, function (e) {
                    try {
                        var table = $('#' + gridControl.name)["dynamicGrid"]('getRows', true, true);
                        var tableName = Object.keys(table)[0];
                        if (table[tableName].rows.length == 0) {
                            doValueChanged(e.type, e);
                            for (var c = 0; c < keys.length; c++) {
                                var columns = table[tableName].columns;
                                valueChange(div, fieldRow["FIELDNAME"] + "." + columns[c].name, null, function () {
                                });
                            }
                        }
                    }
                    catch (err) {
                        errorHandle(htmlName, "afterFindClick afterClearClick", err);
                    }
                });
                if (gridControl != null) {
                    $('#' + gridControl.name).off("cellValueChanged." + gridControl.name + "cond");
                    $('#' + gridControl.name).on("cellValueChanged." + gridControl.name + "cond", function (e) {
                        try {
                            doValueChanged("cellValueChanged", e);
                        }
                        catch (err) {
                            errorHandle(htmlName, "addDynamicGrid_cellValueChanged", err);
                        }
                    });
                    $('#' + gridControl.name).off("rowdoubleclick." + gridControl.name + "cond");
                    $('#' + gridControl.name).on("rowdoubleclick." + gridControl.name + "cond", function (e) {
                        try {
                            doValueChanged("rowDoubleClick", e);
                        }
                        catch (err) {
                            errorHandle(htmlName, "addDynamicGrid_cellValueChanged", err);
                        }
                    });
                    $('#' + gridControl.name).off("rowSelected." + gridControl.name + "cond");
                    $('#' + gridControl.name).on("rowSelected." + gridControl.name + "cond", function (e) {
                        try {
                            doValueChanged("rowSelected", e);
                            var row = $(this)["dynamicGrid"]('getFocusRow', false);
                            var keys = Object.keys(row);
                            if (row != null && keys.length > 0) {
                                for (var r = 0; r < keys.length; r++) {
                                    valueChange(div, fieldRow["FIELDNAME"] + "." + keys[r], row[keys[r]], function () {
                                    });
                                }
                            }
                        }
                        catch (err) {
                            errorHandle(htmlName, "addDynUpdateGrid_rowSelected", err);
                        }
                    });
                }
                triggerMultiLoaded(div);
            });
            $('#' + controlId)[jqxControl](gridOptions);

            options.controls.push(controlOptions);

            var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
            if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                $('#' + controlId)[jqxControl]("disabled", true);
                controlOptions.disabled = true;
            }
            var tooltip = fieldRow["tooltip".toUpperCase()];
            if (isEmpty(tooltip) == false) {
                $('#' + controlId).attr("title", tooltip);
            }
            $('#' + controlId).css('float', 'left');
            $('#' + controlId).css('display', 'inline-block');
        }
        catch (err) {
            errorHandle(htmlName, "addDynConditionGrid", err);
        }
    }
    //建立Button 元件
    function addButton(div, fieldRow, controlsTable, level, parentControl, justControl) {
        try {
            var options = $.data(div, formName).options;
            //建立Table Columns
            var uiCols = addDIVColumns(fieldRow, controlsTable, true);
            var controlWidths = getFieldWidth(fieldRow, controlsTable.width() - 2);
            var controlHeadId = $(div).prop('id') + '_' + fieldRow["FIELDNAME"];
            var jqxControl = 'jqxButton';
            //建立欄位說明中文名稱
            //46=jqxButton
            var makeControl = function (uiCol, fieldRow, controlWidths) {
                try {
                    var controlId = controlHeadId + '_1';
                    var o = $('<button id="' + controlId + '"></button>').appendTo(uiCol);
                    var inputOptions = {
                        width: '99%',
                        height: defaultHeight,
                        theme: options.theme
                    };
                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if (ReadOnly != null && ReadOnly != undefined && ReadOnly == 1) {
                        inputOptions['disabled'] = true;
                    }
                    o.text(fieldRow["HEADNAME"]);
                    $('#' + controlId)[jqxControl](inputOptions);

                    var controlOptions = {
                        name: controlId, type: jqxControl, level: level,
                        objectType: fieldRow["OBJECTTYPE".toUpperCase()],
                        fieldName: fieldRow["FIELDNAME"] + '_1',
                        headName: fieldRow["HEADNAME"],
                        fieldRow: fieldRow,
                        noHead: true,
                        parentControl: parentControl
                    };
                    options.controls.push(controlOptions);
                    $('#' + controlId).off("click." + controlId + "cond");
                    $('#' + controlId).on("click." + controlId + "cond", function () {
                        try {
                            if (isEmpty(fieldRow["VALUECHANGED"]) != true) {
                                var valueChanged = fieldRow["VALUECHANGED"];
                                if (valueChanged.substr(0, 8) == 'function') {
                                    var func = scriptFunction("(" + valueChanged + ")", formName);
                                    func(div, fieldRow, options.parameters, controlOptions);
                                }
                            }
                        }
                        catch (err) {
                            errorHandle(htmlName, "addButton_click", err);
                        }
                    });
                    var MustBe = fieldRow["MustBe".toUpperCase()];
                    if (MustBe != null && MustBe != undefined && MustBe == 1) {
                        $('#' + controlId).css("color", 'red');
                    }
                    var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                    if ((ReadOnly != null && ReadOnly == 1) || options.readOnlyFields.map(function (x) { return x.toUpperCase() }).indexOf(fieldRow["FIELDNAME"].toUpperCase()) >= 0) {
                        $('#' + controlId)[jqxControl]({ disabled: true });
                        controlOptions.disabled = true;
                    }
                    var tooltip = fieldRow["tooltip".toUpperCase()];
                    if (isEmpty(tooltip) == false) {
                        $('#' + controlId).attr("title", tooltip);
                    }
                    var TextForeground = fieldRow["TextForeground".toUpperCase()];
                    if (TextForeground != null && TextForeground != undefined) {
                        $('#' + controlId).css("color", getColorValue(TextForeground));
                    }
                    return $('#' + controlId);
                }
                catch (err) {
                    errorHandle(htmlName, "addButton_makeControl", err);
                }
            }
            uiCols[0].css('width', '99%');
            makeControl(uiCols[0], fieldRow, controlWidths);
        }
        catch (err) {
            errorHandle(htmlName, "addButton", err);
        }
    }
    //取得顏色
    function getColorValue(value) {
        var valuesplit = value.split('#');
        var x = "";
        return '#' + valuesplit[1].substring(valuesplit[1].length - 6);
    }
})(jQuery);
