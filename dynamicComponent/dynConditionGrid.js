//2017/06/29
(function ($) {
    var formName = 'dynConditionGrid';
    var riadllName = 'CableSoft.RIA.Dynamic.ConditionGrid.Web.dll';
    var riaClassName = 'CableSoft.RIA.Dynamic.ConditionGrid.Web.ConditionGrid';
    var endSplitterId = "split";
    var endHeadId = "head";
    var endCompanyId = "com";
    var endCondtionId = "cond";
    var endButtonId = "btn";
    var endGridId = "gd";
    var buttonsHeight = 24;
    var defButtonWidth = 120;

    $.fn.dynConditionGrid = function (options, param, params2, params3) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, params2, params3);
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
                        options: $.extend({}, new defaults(), new dynConditionGrid(), options)
                    });
                    init(this);
                }
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynConditionGrid', err);
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
        //close: function (jq) {
        //    return jq.each(function () {
        //        formClosed(this);
        //    });
        //},
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
        getControl: function (jq, params, params2) {
            return getControl(jq[0], params, params2);
        },
        findData: function (jq, params) {
            return jq.each(function () {
                findData(this, false, params, true);
            });
        },
        selectTabItem: function (jq, params) {
            return jq.each(function () {
                selectTabItem(this, params);
            });
        },
        disableAll: function (jq, flag, revertStatus) {
            return jq.each(function () {
                disableAll(this, flag, revertStatus);
            });
        },
        canView: function (jq, params, param2) {
            param2([true]);
            return true;
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
        this.settingData = [];
        this.parentData = {};
        this.localization = null;
        this.container = null;
        this.childContainer = null;
        this.buttonImage = true;
        this.gridOptions = {};
        this.loadQuery = false;
    });
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var msg = "";
            for (var i = 0; i < controls.length; i++) {
                var o = $('#' + controls[i].name);
                if (controls[i].type == "dynamicGrid" ||
                    options.condition.prop('id') == controls[i].name) {
                    o.each(function () {
                        $(this)[controls[i].type]('resize');
                    });
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function formDestroy(div) {
        try {
            if ($.data(div, formName) == null) { return; }
            var options = $.data(div, formName).options;
            if (options == null || options.length == 0) { return; }
            var controls = options.controls;
            destroyControls(controls);
            $(window).off('resize.' + $(div).prop('id'));
            offElementEvents(div);
            deleteJSONObject(options);
            delete options;
            options = null;
            $.data(div, formName, null);
            $(div).children().remove();
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };
    function formDisabled(div, param) {
        try {
            var options = $.data(div, formName).options;
            if ($(options.container).length > 0) {
                var className = $(options.container).attr('class');
                if (className != null) {
                    if (className.indexOf('jqx-window') >= 0) {
                        $(options.container).jqxWindow({ disabled: param });
                    }
                    else if (className.indexOf('jqx-panel') >= 0) {
                        $(options.container).jqxPanel({ disabled: param });
                    }
                    else if (className.indexOf('jqx-expander') >= 0) {
                        $(options.container).jqxExpander({ disabled: param });
                    }
                }
            }
            $('#' + $(div).prop('id') + endSplitterId).jqxSplitter({ disabled: param });
        }
        catch (err) {
            errorHandle(formName, 'formDisabled', err);
        }
    };
    function disableAll(div, flag, revertStatus) {
        try {
            var options = $.data(div, formName).options;
            disableAllControls(options.controls, flag, revertStatus);
            return true;
        }
        catch (err) {
            errorHandle(formName, 'disableAll', err);
        }
    };
    //取得物件
    function getControl(div, controlType, isFocus) {
        try {
            var options = $.data(div, formName).options
            var controls = options.controls;
            var val = [];
            if (controlType == null) { controlType = 'grid'; }
            if (isFocus == null) isFocus = false;
            for (var i = 0; i < controls.length; i++) {
                if (controlType == 'grid' && controls[i].type == 'dynamicGrid') {
                    val.push(controls[i]);
                }
            }
            if (controlType == 'condition') {
                var control;
                if (isFocus == true) {
                    for (var i = 0; i < controls.length; i++) {
                        if (controls[i].type == 'csTabs') {
                            var idx = $('#' + controls[i].name).csTabs('val')
                            //var obj = $('#' + controls[i].name ).csTabs('getContentAt', idx);
                            control = getRowByKeyValue(controls, 'name', controls[i].name + '_' + idx);
                            val.push(control);
                        }
                    }
                }
                if (control == null) {
                    for (var i = 0; i < controls.length; i++) {
                        if (controlType == 'condition' && controls[i].type == 'dynamicCondition') {
                            val.push(controls[i]);
                        }
                    }
                }
            }


            return val;
        }
        catch (err) {
            errorHandle(formName, 'getControl', err);
        }
    };
    function selectTabItem(div, i) {
        try {
            var options = $.data(div, formName).options;
            var realConditionId = $(div).prop('id') + endCondtionId + 'tabs';
            var tabs = getRowByKeyValue(options.controls, 'name', realConditionId);
            if (tabs != null) {
                $('#' + realConditionId).csTabs('select', i);
            }
            return true;
        }
        catch (err) {
            errorHandle(formName, 'selectTabItem', err);
        }
    }
    function init(div) {
        try {
            var options = $.data(div, formName).options;
            var sysProgramId = options.sysProgramId;
            var settingData = options.settingData;
            if (sysProgramId == null) {
                messageBox("no programId!!", messageType.critical);
                return;
            }
            addHandlerGetParameters(options.container, options);
            var loaded = (function () {
                formResize(div);
                $(options.container).on('resize', function () {
                    formResize(div);
                });
                //$(window).on('resize.' + $(div).prop('id'), function () {
                //    formResize(div);
                //});
                //onWindowResizeEvent(div, formName, function () {
                //    formResize(div);
                //});
                if (options['loaded']) {
                    options['loaded']();
                }
                var e = $.Event("loaded");
                $(div).triggerHandler(e);
            });
            if (settingData != null && settingData.length > 0) {
                refresh(div, loaded);
            }
            else {
                getSettingData(div, function (flag) {
                    if (flag == true) {
                        refresh(div, loaded);
                    }
                });
            }

        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    //取得設定檔內容
    function getSettingData(div, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var parameters = $.extend({}, paraLoginInfo, {
                SystemProgramId: { type: 'string', value: options.sysProgramId }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetSettingData',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        var isOk = false;
                        if ($.isArray(data)) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].ResultBoolean == true) isOk = true;
                                else {
                                    isOk = false;
                                    break;
                                }
                            }
                            if (isOk == true) {
                                options.settingData.length = 0;
                                for (var i = 0; i < data.length; i++) {
                                    options.settingData.push(JSON.parse(data[i].ResultXML));
                                }
                            }
                            else messageBox(data[i].ErrorMessage, messageType.critical);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            //if (isOk == false && isShow == false) {
                            //    messageBox('getSettingData_getServerData,' + JSON.stringify(data), messageType.critical);
                            //}
                        }
                        action(isOk);
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
    //更新 Condition Grid
    function refresh(div, action) {
        try {
            var options = $.data(div, formName).options;

            createBody(div);
            //建立可選公司別
            createCompany(div);
            //建立動態條件
            createCoditions(div);
            //建立按鈕
            createButtons(div);
            //建立i 秘書
            createGrids(div);
            if (options.loadQuery == true) {
                options.mustFind = true;
                findData(div, true, action, true);
            }
            else {
                action(true);
            }
        }
        catch (err) {
            errorHandle(formName, "refresh", err);
        }
    };
    //建立動態查詢瀏覽Body
    function createBody(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var keys = Object.keys(settingData[0]);
            var headData = settingData[0][keys[0]];
            if (options.loadQuery == false) {
                options.loadQuery = headData.rows[0]['loadQuery'.toUpperCase()] == 1;
            }
            var headId = $(div).prop('id') + endHeadId;
            var gridsId = $(div).prop('id') + endGridId;
            var splitterId = $(div).prop('id') + endSplitterId;

            $('<div id="' + splitterId + '"></div>').appendTo($(div));
            $('<div id="' + headId + '"></div>').appendTo($('#' + splitterId));
            $('<div id="' + gridsId + '"></div>').appendTo($('#' + splitterId));
            $('#' + headId).css('margin-left', 1);
            $('#' + headId).css('margin-right', 1);
            $('#' + gridsId).css('margin-left', 1);
            $('#' + gridsId).css('margin-right', 1);
            var splitOptions = {
                width: '99.8%',
                height: '99%',
                theme: options.theme
            };

            var size = getSplitterSize(div, headData);
            var horizontal = headData.rows[0]['Horizontal'.toUpperCase()];
            if (horizontal == 1) {
                splitOptions.panels = [{ size: size[0]['width'] },
                                        { size: size[1]['width'] }];
            }
            else {
                splitOptions['orientation'] = 'horizontal';
                splitOptions.panels = [{ size: size[0]['height'] },
                                        { size: size[1]['height'] }];
            }
            $('#' + splitterId).jqxSplitter(splitOptions);
            options.controls.push({
                name: splitterId, type: 'jqxSplitter', level: 0
            });
            $('#' + splitterId).on('resize', function (event) {
                try {
                    var controls = options.controls;
                    if (event.args == null) { return; }
                    //元件直放
                    if (horizontal == 0) {
                        var condition = getFocusCondition(div);
                        if (condition != null) {
                            $('#' + $(div).prop('id') + endCondtionId).css('height', getConditionHeight(div, condition.conditionHead));
                            $('#' + condition.name)[condition.type]('resize');
                            for (var i = 0; i < controls.length; i++) {
                                if (controls[i].type == 'dynamicGrid') {
                                    $('#' + controls[i].name)[controls[i].type]('resize');
                                }
                            }
                        }
                        //formResize(div);
                    }
                        //元件橫放
                    else {
                        for (var i = 0 ; i < controls.length; i++) {
                            //getObjectSize
                        }
                    }
                }
                catch (err) {
                    errorHandle(formName, "createBody_resize", err);
                }
            });
        }
        catch (err) {
            errorHandle(formName, "createBody", err);
        }
    };
    function getDataHeadTable(div) {
        var options = $.data(div, formName).options;
        var settingData = options.settingData;
        var keys = Object.keys(settingData[0]);
        var headData = settingData[0][keys[0]];
        return headData;
    }
    function checkIsX(headData) {
        try {
            var x = (headData.rows[0]['Horizontal'.toUpperCase()] == 1);
            return x;
        }
        catch (err) {
            errorHandle(formName, "checkIsX", err);
        }
    }
    //取得Body 的Size
    function getSplitterSize(div, headData) {
        try {
            var contentPosition = [];
            var totalPercent = 0;
            var totalValue = 0;
            var minusValue = 0;
            var x = checkIsX(headData);

            var totalSize = getSplitterPanelSize(headData, 0, x);
            totalSize.push(getSplitterPanelSize(headData, 1, x)[0]);
            for (var i = 0; i < totalSize.length; i++) {
                if (x == true) {
                    if (totalSize[i]['width'].toString().indexOf('px') < 0) {
                        totalPercent += totalSize[i]['width'];
                    }
                    else { totalValue += Number(totalSize[i]['width'].toString().replace('px', '')); }
                }
                else {
                    if (totalSize[i]['height'].toString().indexOf('px') < 0) {
                        totalPercent += totalSize[i]['height'];
                    }
                    else { totalValue += Number(totalSize[i]['height'].toString().replace('px', '')); }
                }
            }
            for (var i = 0; i < totalSize.length; i++) {
                if (x == true) {
                    var tWidth = 0;
                    if (totalSize[i]['width'].toString().indexOf('px') < 0) {
                        if (totalValue == 0) {
                            tWidth = ((totalSize[i]['width'] / totalPercent) * 100) + '%';
                        }
                        else {
                            tWidth = ((totalSize[i]['width'] / totalPercent) * $(div).width() - totalValue - minusValue) + 'px';
                        }
                    }
                    else {
                        tWidth = totalSize[i]['width'];
                    }
                    contentPosition.push({ width: tWidth });
                }
                else {
                    var tHeight = 0;
                    if (totalSize[i]['height'].toString().indexOf('px') < 0) {
                        if (totalValue == 0) {
                            tHeight = ((totalSize[i]['height'] / totalPercent) * 99.5) + '%';
                        }
                        else {
                            tHeight = ((totalSize[i]['height'] / totalPercent) * $(div).height() - totalValue - minusValue) + 'px';
                        }
                    }
                    else {
                        tHeight = totalSize[i]['height'];
                    }
                    contentPosition.push({ height: tHeight });
                }
            }
            return contentPosition;
        }
        catch (err) {
            errorHandle(formName, "getSplitterSize", err);
        }
    };
    function getSplitterPanelSize(headData, type, x) {
        try {
            var size = [];
            for (var i = 0; i < headData.rows.length; i++) {
                if (headData.rows[i]['ObjSysType'.toUpperCase()] == type) {
                    //如果是水平的話
                    if (x == true) {
                        if (headData.rows[i]["WidthType".toUpperCase()] == 1) {
                            size.push({ width: headData.rows[i]["Width".toUpperCase()] + "px" });
                        }
                        else {
                            var tWidth = headData.rows[i]["Width".toUpperCase()];
                            if (tWidth == 0) { tWidth = 1; }
                            size.push({ width: tWidth });
                        }
                    }
                        //如果是垂直的話
                    else {
                        if (headData.rows[i]["HeightType".toUpperCase()] == 1) {
                            size.push({ height: headData.rows[i]["Height".toUpperCase()] + "px" });
                        }
                        else {
                            var tHeight = headData.rows[i]["Height".toUpperCase()];
                            if (tHeight == 0) { tHeight = 1; }
                            size.push({ height: tHeight });
                        }
                    }
                    break;
                }
            }
            return size;
        }
        catch (err) {
            errorHandle(formName, "getSplitterPanelSize", err);
        }
    };
    //取得物件的Size
    function getObjectSize(div, objSysPrgId, parentContainer) {
        try {
            var headData = getDataHeadTable(div);
            var totalPerHeight = 0;
            var totalHeight = 0;
            var thisRow;
            var height = 0;
            for (var i = 0; i < headData.rows.length; i++) {
                if (headData.rows[i]['ObjSysProId'.toUpperCase()] == objSysPrgId) {
                    thisRow = headData.rows[i];
                    if (headData.rows[i]['HeightType'.toUpperCase()] == 1) {
                        return headData.rows[i]['Height'.toUpperCase()];
                    }
                    height = headData.rows[i]['Height'.toUpperCase()];
                    if (height == 0) { height = 1; }
                    break;
                }
            }
            var objSysType = thisRow['ObjSysType'.toUpperCase()];
            for (var i = 0; i < headData.rows.length; i++) {
                if (headData.rows[i]['ObjSysType'.toUpperCase()] == objSysType) {
                    if (headData.rows[i]['HeightType'.toUpperCase()] == 0) {
                        var tHeight = headData.rows[i]['Height'.toUpperCase()];
                        if (tHeight == 0) { tHeight = 1; }
                        totalPerHeight += tHeight;
                    }
                    else {
                        totalHeight += headData.rows[i]['Height'.toUpperCase()];
                    }
                }
            }
            if (totalHeight == 0) {
                return Math.floor((height / totalPerHeight) * 100) + '%';
            }
            else {
                return Math.floor((height / totalPerHeight) * $(parentContainer).width()) - totalHeight - 2;
            }
        }
        catch (err) {
            errorHandle(formName, "getObjectSize", err);
        }
    }
    function getConditionHeight(div, conditionHead) {
        try {
            var options = $.data(div, formName).options;
            var headData = getDataHeadTable(div);
            var minusHeight = buttonsHeight + 4;
            if ($('#' + $(div).prop('id') + endCompanyId).length > 0) {
                minusHeight += buttonsHeight + 4;
            }
            if (options.conditionCount == 1) minusHeight += 2;
            var height = $('#' + $(div).prop('id') + endHeadId).height() - minusHeight;
            if (checkIsX(headData) == true) {
                if (conditionHead['heightType'.toUpperCase()] == 1) {
                    height = conditionHead['height'.toUpperCase()];
                }
            }
            return height;
        }
        catch (err) {
            errorHandle(formName, "getConditionHeight", err);
        }
    }
    //建立公司別
    function createCompany(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var keys = Object.keys(settingData[0]);
            var headData = settingData[0][keys[0]];
            var canChooseComp = headData.rows[0]['CanChooseComp'.toUpperCase()];
            if (canChooseComp == 0) {
                return;
            }
            var companyData;
            for (var i = 0; i < headData.rows.length > 0; i++) {
                if (headData.rows[i]['ObjSysType'.toUpperCase()] == 0) {
                    companyData = settingData[i + 1]['CompCode'];
                    break;
                }
            }
            var compContainerId = $(div).prop('id') + endCompanyId;
            $('<div id="' + compContainerId + '"></div>').appendTo($('#' + $(div).prop('id') + endHeadId));
            $('#' + compContainerId).css('height', buttonsHeight + 2);
            //當等於1時為 csList 
            if (canChooseComp == 1) {
                var compCodeId = compContainerId + '_1';
                $('<div style="float:left;margin:6px;color:red;">' + options.language.company + '</div>').appendTo($('#' + compContainerId));
                $('<div id = "' + compCodeId + '" style="float:left;margin-top:1px;margin-bottom:1px;"></div>').appendTo($('#' + compContainerId));
                $("#" + compCodeId).csList({
                    source: companyData.rows,
                    codeNoWidth: 70,
                    width: 260,
                    height: buttonsHeight,
                    theme: options.theme,
                    isOnlyDropDown: true
                });
                options.controls.push({
                    name: compCodeId, type: 'csList', level: 1
                })
                $('#' + compCodeId).csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                $('#' + compCodeId).on('selectedIndexChanged', function () {
                    if ($('#' + compCodeId).attr('data-disableChange') != null) return;
                    companyChange(div, $('#' + compCodeId).csList('codeNo'),
                        function (flag) {
                            if (flag == false) {
                                $('#' + compCodeId).attr('data-disableChange', true);
                                $('#' + compCodeId).csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                                $('#' + compCodeId).removeAttr('data-disableChange');
                            }
                        }
                    );
                });
            }
                //否則為按鈕
            else {
                var clickColor = '#FFB5B5';
                //var unClickColor;
                var rowLength = companyData.rows.length;
                var heightPercent = Math.floor(1 / rowLength * 1000) / 10;
                var setButtonColor = function (btn) {
                    for (var i = 0 ; i < options.controls.length; i++) {
                        if (options.controls[i] != null && options.controls[i].parentId == compContainerId
                            && options.controls[i].name != $(btn).prop('id')) {
                            $('#' + options.controls[i].name).css({ 'background': '', color: '' });
                        }
                    }
                    $(btn).css({ 'background': clickColor, color: 'black' });
                }
                for (var i = 0 ; i < rowLength; i++) {
                    var buttonId = compContainerId + '_' + companyData.rows[i]['CODENO'];
                    $('<input style="margin-left:1px;margin-top:1px;max-width:120px;min-width:60px;" type="button" value="' + companyData.rows[i]['DESCRIPTION'] + '" id="' + buttonId + '"/>').appendTo($('#' + compContainerId));
                    $('#' + buttonId).jqxButton({
                        height: buttonsHeight,
                        width: heightPercent + '%',
                        theme: options.theme
                    });
                    //unClickColor = $('#' + buttonId).css('background-color');
                    options.controls.push({
                        name: buttonId, type: 'jqxButton', level: 1, parentId: compContainerId
                    })
                    $('#' + buttonId).off("mouseenter mouseleave mouseover mousedown click");
                    $('#' + buttonId).off();
                    $('#' + buttonId).on('click', function () {
                        try {
                            var compId = $(this).prop('id').split('_')[$(this).prop('id').split('_').length - 1];
                            //for (var i = 0 ; i < options.controls.length; i++) {
                            //    if (options.controls[i].parentId == compContainerId) {
                            //        $('#' + options.controls[i].name).css('background-color', unClickColor);
                            //    }
                            //}
                            //$(this).css('background-color', clickColor);
                            if (options.loginInfo.loginInfo.rows[0].compcode == compId) {
                                return;
                            }
                            var bId = $(this).prop('id');
                            companyChange(div, compId,
                                function (flag) {
                                    if (flag == false) {
                                        setButtonColor('#' + compContainerId + '_' + options.loginInfo.loginInfo.rows[0].compcode)
                                    }
                                    else {
                                        setButtonColor('#' + bId);
                                    }
                                }
                            );
                        }
                        catch (err) {
                            errorHandle(formName, "createCompany_click", err);
                        }
                    });

                }
                for (var i = 0 ; i < rowLength; i++) {
                    var buttonId = compContainerId + '_' + companyData.rows[i]['CODENO'];
                    if (options.loginInfo.loginInfo.rows[0].compcode == companyData.rows[i]['CODENO']) {
                        setButtonColor('#' + buttonId);
                        break;
                    }
                }
            }

        }
        catch (err) {
            errorHandle(formName, "createCompany", err);
        }
    }
    function companyChange(div, compCode, action) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var oCompCode = options.loginInfo.loginInfo.rows[0]['compcode'];
            options.loginInfo.loginInfo.rows[0]['compcode'] = compCode;
            getSettingData(div, function (flag) {
                if (flag == true) {
                    //清除動態條件及i秘書
                    for (var j = 5; j >= 0; j--) {
                        for (var i = 0; i < controls.length; i++) {
                            var control = controls[i];
                            if (control == null || j != control.level) { continue; }
                            //清除動態條件
                            if (control.type == 'dynamicCondition') {
                                $('#' + control.name)[control.type]('destroy');
                                $('#' + control.name).remove();
                                controls[i] = null;
                            }
                                //清除i秘書
                            else if (control.type == 'dynamicGrid') {
                                $('#' + control.name)[control.type]('destroy');
                                $('#' + control.name).remove();
                                controls[i] = null;
                            }
                                //清除動態條件Tabs
                            else if (control.name == $(div).prop('id') + endCondtionId + 'tabs') {
                                $('#' + control.name)[control.type]('destroy');
                                controls[i] = null;
                            }
                        }
                    }
                    options.controls = controls.filter(function (e) { return e });
                    //重建動態條件及i秘書
                    createCoditions(div);
                    createGrids(div);
                    var e = $.Event("companyChange");
                    $(div).triggerHandler(e);
                    action(true);
                }
                else {
                    options.loginInfo.loginInfo.rows[0]['compcode'] = oCompCode;
                    action(false);
                }
            });
        }
        catch (err) {
            errorHandle(formName, "companyChange", err);
        }
    }
    //建立動態條件
    function createCoditions(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var keys = Object.keys(settingData[0]);
            var headData = settingData[0][keys[0]];
            var conditionHeads = [];
            var conditions = [];
            for (var i = 1; i < settingData.length; i++) {
                if (headData.rows[i - 1]['ObjSysType'.toUpperCase()] == 0) {
                    conditions.push(settingData[i]);
                    conditionHeads.push(headData.rows[i - 1]);
                }
            }
            var realConditionId = $(div).prop('id') + endCondtionId;
            if ($('#' + realConditionId).length == 0) {
                $('<div id="' + realConditionId + '"></div>').appendTo($('#' + $(div).prop('id') + endHeadId));
                $('#' + realConditionId).css('height', getConditionHeight(div, conditionHeads[0]));
            }
            options.conditionCount = conditions.length;
            //messageBox(JSON.stringify(conditions));
            //當有多組條件時
            if (conditions.length > 1) {
                var tabsId = realConditionId + 'tabs';
                $('<div id = "' + tabsId + '"></div>').appendTo($('#' + realConditionId));
                var ul = $('<ul></ul>').appendTo($('#' + tabsId));
                //alert(ul);
                for (var i = 0; i < conditions.length; i++) {
                    var keys = Object.keys(conditions[i]);
                    var table = conditions[i][keys[0]];
                    var tabId = tabsId + '_' + i;
                    $('<li>X</li>').appendTo(ul);
                    $('<div id = "' + tabId + '"></div>').appendTo($('#' + tabsId));
                }

                $('#' + tabsId).csTabs({
                    width: '99.5%',
                    height: '100%',
                    position: 'top',
                    headerHeight: 20,
                    theme: options.theme,
                    keyboardNavigation: false
                });
                options.controls.push({
                    name: tabsId, type: 'csTabs', level: 2
                });
                var createTabItem = (function (i, action) {
                    try {
                        var childId = tabsId + '_' + i;
                        if (getRowByKeyValue(options.controls, 'name', childId) != null) {
                            if (action != null) action([childId, true]);
                            return;
                        }
                        var keys = Object.keys(conditions[i]);
                        var table = conditions[i][keys[0]];
                        //var child = $('#' + tabsId).csTabs('getContentAt', i);
                        $('#' + tabsId).csTabs('setTitleAt', i, table.rows[0]['CAPTIONA']);
                        $('#' + tabsId).csTabs('select', i);
                        //$(child).prop('id', childId);
                        //return;
                        $('#' + childId).on("loaded", function () {
                            if (action != null) action([childId]);
                        });
                        if (conditions[i][Object.keys(conditions[i])[0]].rows[0]['ConditionTypeA'.toUpperCase()] == 1) {
                            $('#' + childId).css('overflow', 'hidden');
                        }
                        $('#' + childId).dynamicCondition($.extend({}, {
                            loginInfo: options.loginInfo,
                            //programId: table.rows[0]['programId'.toUpperCase()],
                            //sysProgramId: table.rows[0]['sysProgramId'.toUpperCase()],
                            settingData: conditions[i],
                            localization: options.localization,
                            parameters: options.parameters,
                            theme: options.theme,
                            disableMessage: true,
                            container: div
                        }));
                        options.controls.push({
                            name: childId, type: 'dynamicCondition', level: 3,
                            sysProgramId: conditionHeads[i]['ObjSysProId'.toUpperCase()],
                            conditionHead: conditionHeads[i]
                        });
                    }
                    catch (err) {
                        errorHandle(formName, "createCoditions_createTabItem", err);
                    }
                });

                $('#' + tabsId).on('selected', function (event) {
                    var selectedTab = event.args.item;
                    createTabItem(selectedTab, function (args) {
                        //var child = $('#' + tabsId).csTabs('getContentAt', selectedTab);
                        if (args[1] != true) {
                            $('#' + args[0]).dynamicCondition('resize');
                        }
                        options.condition = $('#' + args[0]);
                        $('#' + args[0]).dynamicCondition('focus');
                    });
                });
                createTabItem(0);
                for (var i = 0; i < conditions.length; i++) {
                    var keys = Object.keys(conditions[i]);
                    var table = conditions[i][keys[0]];
                    $('#' + tabsId).csTabs('setTitleAt', i, table.rows[0]['CAPTIONA']);
                }
                $('#' + tabsId).csTabs('select', 0);
                options.condition = $('#' + tabsId + '_0');
            }
            else {
                var cWidth;
                if (conditionHeads[0]['WidthType'.toUpperCase()] == 0) {
                    cWidth = conditionHeads[0]['Width'.toUpperCase()];
                    if (cWidth == 0) {
                        cWidth = "99%";
                    }
                    else {
                        if (cWidth < 10) cWidth = 10;
                        if (cWidth > 100) cWidth = 99;
                        cWidth += "%";
                        if (cWidth < 100) {
                            options.buttonRight = true;
                            options.conditionWidth = cWidth;
                        }
                    }
                }
                else {
                    cWidth = conditionHeads[0]['Width'.toUpperCase()];
                    options.buttonRight = true;
                    options.conditionWidth = cWidth;
                }
                var keys = Object.keys(conditions[0]);
                var table = conditions[0][keys[0]];
                var childId = realConditionId + '_0';
                if (table.rows[0]['ConditionTypeA'.toUpperCase()] == 1) {
                    $('#' + realConditionId).jqxPanel({
                        width: '99%',
                        height: getConditionHeight(div, conditionHeads[0]),
                        theme: options.theme
                    });
                    var scrollBars = ["horizontalScrollBar", "verticalScrollBar"];
                    for (var j = 0; j < scrollBars.length; j++) {
                        if ($('#' + realConditionId + scrollBars[j]).length > 0) {
                            $('#' + realConditionId + scrollBars[j]).css('display', 'none');
                        }
                    }
                    options.controls.push({ name: realConditionId, type: 'jqxPanel', level: 2 });
                    $('<div id = "' + childId + '"></div>').appendTo($('#panelContent' + realConditionId));
                }
                else {
                    $('#' + realConditionId).css({
                        float: 'left',
                        width: cWidth,
                    });
                    if (conditionHeads[0]['heightType'.toUpperCase()] == 1) {
                        if (conditionHeads[0]['widthType'.toUpperCase()] == 1) {
                            $('#' + realConditionId).css({ height: conditionHeads[0]['height'.toUpperCase()] });
                        }
                        else {
                            $('#' + realConditionId).css({
                                height: getConditionHeight(div, conditionHeads[0]),
                                "overflow-x": "auto"
                            });
                        }
                    }
                    $('<div id = "' + childId + '"></div>').appendTo($('#' + realConditionId));
                }
                $('#' + childId).css({ 'width': '100%', 'height': '100%' });
                $('#' + childId).dynamicCondition($.extend({}, {
                    loginInfo: options.loginInfo,
                    programId: table.rows[0]['programId'.toUpperCase()],
                    sysProgramId: table.rows[0]['sysProgramId'.toUpperCase()],
                    settingData: conditions[0],
                    localization: options.localization,
                    parameters: options.parameters,
                    theme: options.theme,
                    disableMessage: true,
                    container: div
                }));
                options.controls.push({
                    name: childId, type: 'dynamicCondition', level: 3,
                    sysProgramId: conditionHeads[0]['ObjSysProId'.toUpperCase()],
                    conditionHead: conditionHeads[0]
                });
                options.condition = $('#' + childId);
            }
        }
        catch (err) {
            errorHandle(formName, "createCoditions", err);
        }
    };
    //建立按鈕
    function createButtons(div) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var keys = Object.keys(settingData[0]);
            var headData = settingData[0][keys[0]];

            var language = options.language;
            var containerId = $(div).prop('id') + endHeadId;
            var buttonsId = containerId + endButtonId;

            $('<div id="' + buttonsId + '"></div>').appendTo($('#' + containerId));
            var buttonsWidth = '100%';
            if (options.buttonRight == true) {
                if (options.conditionWidth.toString().indexOf('%') >= 0) {
                    buttonsWidth = (100 - Number(options.conditionWidth.toString().replace('%', ''))) + '%';
                }
                else {
                    buttonsWidth = (1 + Number(headData.rows[0]['ShowClearBtn'.toUpperCase()]) +
                        Number(headData.rows[0]['ExportExcel'.toUpperCase()])) * (defButtonWidth + 5);
                }
                $('#' + buttonsId).css({ "float": "left" });
            }
            $('#' + buttonsId).css({
                "width": buttonsWidth,
                "height": buttonsHeight,
                "margin-top": 3,
                "margin-bottom": 1
            });
            //$('#' + buttonsId).css("minHeight", "25px");
            //$('#' + buttonsId).css("maxHeight", "28px");

            var width = Math.floor($('#' + buttonsId).width() / (1 + Number(headData.rows[0]['ShowClearBtn'.toUpperCase()]) + Number(headData.rows[0]['ExportExcel'.toUpperCase()]))) - 2;
            if (width > defButtonWidth) { width = defButtonWidth; }
            var findId = buttonsId + 'find';
            var clearId = buttonsId + 'clear';
            var exportId = buttonsId + 'export';
            options.findId = findId;
            options.clearId = clearId;
            options.exportId = exportId;
            $('<input type="button" value="' + language.btnFind + '" id="' + findId + '"/>').appendTo($('#' + buttonsId));
            var buttonOptions = {
                width: width,
                height: buttonsHeight,
                theme: options.theme
            };
            var queryImage = {};
            var clearImage = {};
            var exportImage = {};

            if (options.buttonImage == true) {
                buttonOptions = $.extend({}, buttonOptions, imagePosition);
                queryImage = imageScr.query;
                clearImage = imageScr.clear;
                exportImage = imageScr.excel;
            }
            $("#" + findId).jqxButton($.extend({}, buttonOptions, queryImage));
            options.controls.push({ name: findId, type: 'jqxButton', level: 2 });
            $('#' + findId).find('img').css('top', (buttonsHeight - $('#' + findId).find("img").height()) / 2 - 1);
            $('#' + findId).css('float', 'left');
            $('#' + findId).css('margin-right', 1);
            var divId = $(div).prop('id');
            //當按下尋找按鈕
            $('#' + findId).on('click', function () {
                try {
                    formDisabled(div, true);
                    findData(div, false, function (r) {
                        options.mustFind = true;
                        formDisabled(div, false);
                        var e = $.Event("afterFindClick", [r[0], r[1]]);
                        $(div).triggerHandler(e);
                    }, true);
                }
                catch (err) {
                    errorHandle(formName, "createButtons_findClick", err);
                }
            });
            if (headData.rows[0]['ShowClearBtn'.toUpperCase()] == 1) {
                $('<input type="button" value="' + language.btnClear + '" id="' + clearId + '"/>').appendTo($('#' + buttonsId));
                $("#" + clearId).jqxButton($.extend({}, buttonOptions, clearImage));
                $('#' + clearId).find('img').css('top', (buttonsHeight - $('#' + clearId).find("img").height()) / 2 - 1);
                options.controls.push({ name: clearId, type: 'jqxButton', level: 2 });
                $('#' + clearId).css('float', 'left');
                $('#' + clearId).css('margin-right', 1);
                //當按下清除按鈕
                $('#' + clearId).on('click', function () {
                    clearCondition(div);
                    options.mustFind = false;
                    var e = $.Event("afterClearClick");
                    $(div).triggerHandler(e);
                });
            }
            if (headData.rows[0]['ExportExcel'.toUpperCase()] == 1) {
                $('<input type="button" value="' + language.btnExport + '" id="' + exportId + '"/>').appendTo($('#' + buttonsId));
                $("#" + exportId).jqxButton($.extend({}, buttonOptions, exportImage));
                $('#' + exportId).find('img').css('top', (buttonsHeight - $('#' + exportId).find("img").height()) / 2 - 1);
                $('#' + exportId).css('float', 'left');
                $('#' + exportId).css('margin-right', 1);
                options.controls.push({ name: exportId, type: 'jqxButton', level: 2 });
                //當按下匯出按鈕
                $('#' + exportId).on('click', function () {
                    exportData(div);
                });
            }
            //設定 Enter 觸發尋找
            $(div).on('keydown', function (e)           /* or keyup  */ {
                if (e.keyCode == 13 && checkIsChild('#' + $(div).prop('id') + endCondtionId, e.target)) {
                    $("#" + findId).click();
                }
            });
        }
        catch (err) {
            errorHandle(formName, "createButtons", err);
        }
    };
    function findData(div, noShowMsg, action, resetPageNo) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        if (resetPageNo == true) {
            options.pageInfo = 1;
        }
        findDataSub(div, noShowMsg, function (r) {
            var totalHeight = 0;
            var grids = [];
            for (var i = 0; i < controls.length; i++) {
                if (controls[i].type == 'dynamicGrid') {
                    totalHeight += $('#' + controls[i].name).height();
                    grids.push(controls[i]);
                }
            }
            if (totalHeight > $('#' + $(div).prop('id') + endGridId).height()) {
                $('#' + $(div).prop('id') + endGridId).css('overflow', 'auto');
                for (var i = 0 ; i < grids.length; i++) {
                    $('#' + grids[i].name).width($('#' + grids[i].name)[0].innerWidth - getScrollBarWidth());
                }
            }
            action(r);
        })
    }
    //尋找按下後做的動作
    function findDataSub(div, noShowMsg, action) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            $(options.condition).dynamicCondition('getQueryData', function (args) {
                if (args[0] == false) {
                    if (noShowMsg != true) {
                        messageBox(args[1]);
                    }
                    action(args);
                    return;
                }
                else {
                    var conditionData = args[2];
                    var gridControls = [];
                    for (var i = 0; i < controls.length; i++) {
                        if (controls[i].type == 'dynamicGrid') {
                            gridControls.push($.extend({}, controls[i], { isOk: null }));
                        }
                    }
                    for (var i = 0; i < gridControls.length; i++) {
                        var conSysPrgId = getFocusCondition(div).sysProgramId;
                        var gridSysPrgId = gridControls[i].sysProgramId;
                        var gridId = gridControls[i].name;
                        var getDataOk = (function (subArgs) {
                            try {
                                var idx = subArgs[2];
                                if (subArgs[0] == true) {
                                    var gridId = gridControls[idx].name;
                                    var data = subArgs[3];
                                    if (options.rbGridColumns == true) {
                                        var gridC = getControl(div, 'grid')[0];
                                        $('#' + gridC.name)[gridC.type]('destroy');
                                        createGrids(div, data);
                                    }
                                    $('#' + gridId).dynamicGrid({ conditionData: conditionData });
                                    $('#' + gridId).dynamicGrid('setParentRefresh', data, options.saveRefresh);
                                    options.saveRefresh = false;
                                    if (data[Object.keys(data)[0]].rows.length == 0) {
                                        if (noShowMsg != true) {
                                            messageBox(options.language.noFindData);
                                        }
                                    }
                                    gridControls[idx].isOk = true;
                                }
                                else {
                                    gridControls[idx].isOk = false;
                                    if (noShowMsg != true) {
                                        messageBox(subArgs[0] + ' ' + subArgs[1]);
                                    }
                                }
                                //檢核是否全部都做完, 如做完則callback
                                var allOk = true;
                                for (var i = 0 ; i < gridControls.length; i++) {
                                    if (gridControls[i].isOk == null) {
                                        allOk = false;
                                        break;
                                    }
                                    allOk = true;
                                }
                                if (allOk == true) { action([true]); }
                            }
                            catch (err) {
                                errorHandle(formName, "findDataSub_getDataOk", err);
                            }
                        });
                        getQueryData(div, i, conSysPrgId, gridSysPrgId, conditionData, getDataOk);
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, "findDataSub", err);
        }
    };
    //按下清除按鈕
    function clearCondition(div) {
        try {
            var options = $.data(div, formName).options;
            var condition = getFocusCondition(div);
            $('#' + condition.name)[condition.type]('reset');
            var controls = options.controls;
            for (var i = 0 ; i < controls.length; i++) {
                if (controls[i].type == "dynamicGrid") {
                    $('#' + controls[i].name)[controls[i].type]('clear');
                }
            }
        }
        catch (err) {
            errorHandle(formName, "clearCondition", err);
        }
    };
    //按下匯出Excel
    function exportData(div) {
        try {
            var options = $.data(div, formName).options;
            var table = options.settingData[0][Object.keys(options.settingData[0])[0]];
            var grids = getControl(div, 'grid');
            var arrays = [];
            for (var i = 0; i < grids.length; i++) {
                var realGrid = $('#' + grids[0].name)[grids[0].type]('getControl', 'grid');
                arrays.push(realGrid);
            }
            //if (arrays.length == 1) {
            //    alert(1);
            //    //$('#' + arrays[0].name)[arrays[0].type]('exportdata', 'xls', options.sysProgramId, true, null, true, 'data.aspx');
            //    //$("#jqxGrid").jqxGrid('exportdata', 'json', 'jqxGrid', true, null, true, http://www.myserver.com/save-file.php);

            //    var xml = $('#' + arrays[0].name)[arrays[0].type]('exportdata', 'xls');
            //    messageBox(xml);
            //}
            //else {
            //alert(1);
            exportGridToExcel(arrays, options.sysProgramId);
            //alert(2);
            //}
        }
        catch (err) {
            errorHandle(formName, "exportData", err);
        }
    };
    function getFocusCondition(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            for (var i = 0 ; i < controls.length; i++) {
                if (controls[i].name == $(options.condition).prop('id')) {
                    return controls[i];
                }
            }
        }
        catch (err) {
            errorHandle(formName, "getFocusCondition", err);
        }
    };
    function addParameterData(div) {
        var options = $.data(div, formName).options;
        var tt = {};
        if (options.parameters != null && Object.keys(options.parameters).length > 0) {
            $.extend(tt, {}, options.parameters);
        }
        if (options.pageInfo != null) {
            $.extend(tt, {}, options.pageInfo);
        }
        if (tt != null && Object.keys(tt).length > 0) {
            return JSON.stringify(tt);
        }
    }
    //取得查詢的資料
    function getQueryData(div, gridId, conSysPrgId, gridSysPrgId, condition, action) {
        try {
            var options = $.data(div, formName).options;
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: cloneJSON(options.loginInfo.loginInfo) } });
            var conditionStr;
            if (condition != null && Object.keys(condition).length > 0) {
                conditionStr = JSON.stringify(condition);
            }
            var data = addParameterData(div);
            //if (options.parameters != null && Object.keys(options.parameters).length > 0) {
            //    data = JSON.stringify(options.parameters);
            //}
            var settingData = options.settingData;
            var keys = Object.keys(settingData[0]);
            var table = settingData[0][keys[0]];
            var timeout = table.rows[0]["RIATIMEOUT"];
            var parameters = $.extend({}, paraLoginInfo, {
                CompCode: { type: 'integer', value: options.loginInfo.loginInfo.rows[0].compcode },
                CondtionPrgId: { type: 'string', value: conSysPrgId },
                DynamicGridPrgId: { type: 'string', value: gridSysPrgId },
                dsCondition: { type: 'string', value: convertToNull(conditionStr) },
                dsData: { type: 'string', value: convertToNull(data) }
            });
            //alert(JSON.stringify(parameters));

            var params = getParameters(riadllName,
                riaClassName,
                'GetQueryData2',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    if (data.ResultBoolean == true) {
                        action([true, null, gridId, JSON.parse(data.ResultXML)]);
                    }
                    else {
                        action([false, JSON.stringify(data), gridId]);
                        //messageBox(data, messageType.critical);
                    }
                }
            }, timeout);
        }
        catch (err) {
            errorHandle(formName, 'getQueryData', err);
        }

    }
    function conditionToData(data) {
        var condition = { condition: { columns: [], rows: [{}] } };
        var rows = data[Object.keys(data)[0]].rows;
        for (var i = 0; i < rows.length; i++) {
            var name = rows[i]['fieldName'.toUpperCase()];
            var value = rows[i]['fieldValue'.toUpperCase()];
            condition.condition.columns.push({ name: name, type: 'string' });
            var row = condition.condition.rows[0];
            row[name] = value;
        }
        return condition;
    }
    //建立i 秘書
    function createGrids(div, data) {
        try {
            var options = $.data(div, formName).options;
            var settingData = options.settingData;
            var keys = Object.keys(settingData[0]);
            var headData = settingData[0][keys[0]];
            var gridHeads = [];
            var grids = [];
            options.rbGridColumns = headData.rows[0]["rbGridColumns".toUpperCase()] == 1;
            for (var i = 1; i < settingData.length; i++) {
                if (headData.rows[i - 1]['ObjSysType'.toUpperCase()] == 1) {
                    gridHeads.push(headData.rows[i - 1]);
                    if (data != null) {
                        var tableName = Object.keys(settingData[i])[0];
                        settingData[i][tableName] = data[Object.keys(data)[0]];
                    }
                    grids.push(settingData[i]);

                }
            }
            var getMinContainer = function () {
                var minFlag = true;
                var parents = $(div).parents();
                for (var i = 0 ; i < parents.length; i++) {
                    if ($(parents[i]).hasClass("jqx-window")) {
                        var opts = $.data($(parents[i])[0], "csWindow").options;
                        if (opts.minContainer != null) { minFlag = false; }
                        break;
                    }
                }
                if (minFlag) { return $(div); }
            }
            var totalHeight = 0;
            if (grids.length > 1) {
                var tableId = $(div).prop('id') + endGridId + 'tab';
                $('<table id = "' + tableId + '" border="0" cellpadding="0" style="border:0;margin:0;padding:0;"></table>').appendTo($('#' + $(div).prop('id') + endGridId));
                $('#' + tableId).css('width', '100%');
                //$('#' + tableId).css('height', '100%');
                for (var i = 0; i < grids.length; i++) {
                    var tr = $('<tr></tr>').appendTo($('#' + tableId));
                    var td = $('<td></td>').appendTo($(tr));
                    var childId = tableId + gridHeads[i]['OBJSYSPROID'];
                    var gridHeight = getGridHeight($('#' + tableId), gridHeads, gridHeads[i]);
                    $('<div id="' + childId + '"></div>').appendTo($(td));
                    $('#' + childId).css('width', '100%');
                    $('#' + childId).css('height', gridHeight);
                    var gridOptions = $.extend({}, {
                        loginInfo: options.loginInfo,
                        //programId: gridHeads[i]['programId'.toUpperCase()],
                        sysProgramId: gridHeads[i]['OBJSYSPROID'.toUpperCase()],
                        settingData: grids[i],
                        localization: options.localization,
                        parentData: options.parentData,
                        parameters: options.parameters,
                        theme: options.theme,
                        container: div,
                        minContainer: getMinContainer(),
                        childContainer: options.childContainer,
                        tabContainer: options.tabContainer,
                        saveRefresfhData: false,
                        showCollapseButton: true,
                        autoChangePage: false
                    }, options.gridOptions);
                    $('#' + childId).dynamicGrid(gridOptions);
                    grid_childSaved(div, childId);
                    grid_PageChanged(div, childId);
                    if (getRowByKeyValue(options.controls, "name", childId) == null) {
                        options.controls.push({
                            name: childId, type: 'dynamicGrid', level: 2,
                            sysProgramId: gridHeads[i]['ObjSysProId'.toUpperCase()]
                        });
                    }
                    totalHeight += gridHeight;
                }

            }
            else {
                var childId = $(div).prop('id') + endGridId + gridHeads[0]['OBJSYSPROID'];
                $('<div id="' + childId + '" ></div>').appendTo($('#' + $(div).prop('id') + endGridId));
                $('#' + childId).css('width', '99.8%');
                $('#' + childId).css('height', '100%');

                $('#' + childId).dynamicGrid($.extend({}, {
                    loginInfo: options.loginInfo,
                    //programId: gridHeads[0]['programId'.toUpperCase()],
                    sysProgramId: gridHeads[0]['OBJSYSPROID'.toUpperCase()],
                    settingData: grids[0],
                    localization: options.localization,
                    parentData: options.parentData,
                    parameters: options.parameters,
                    theme: options.theme,
                    container: div,
                    childContainer: options.childContainer,
                    tabContainer: options.tabContainer,
                    minContainer: getMinContainer(),
                    saveRefresfhData: false,
                    showCollapseButton: true,
                    autoChangePage: false
                }, options.gridOptions));
                if (getRowByKeyValue(options.controls, "name", childId) == null) {
                    options.controls.push({ name: childId, type: 'dynamicGrid', level: 1, sysProgramId: gridHeads[0]['ObjSysProId'.toUpperCase()] });
                }

                grid_childSaved(div, childId);
                grid_PageChanged(div, childId);
                if (options.gridOptions != null && options.gridOptions.gridOptions != null &&
                    options.gridOptions.gridOptions.autoHeight == true) {
                    totalHeight = $('#' + childId).height();
                }
            }
            if (totalHeight > $('#' + $(div).prop('id') + endGridId).height()) {
                $('#' + $(div).prop('id') + endGridId).css('overflow', 'auto');
            }

        }
        catch (err) {
            errorHandle(formName, "createGrids", err);
        }
    };
    function grid_childSaved(div, gridId) {
        $("#" + gridId).off("childSaved");
        $("#" + gridId).on("childSaved", function (r) {
            try {
                var options = $.data(div, formName).options;
                options.isSaved = true;
                if (options.mustFind == true) {
                    options.saveRefresh = true;
                    $('#' + options.findId).click();
                }
            }
            catch (err) {
                errorHandle(formName, "grid_childSaved", err);
            }
        });
    }
    function grid_PageChanged(div, gridId) {
        $("#" + gridId).off("beforePageChange");
        $("#" + gridId).on("beforePageChange", function (e) {
            try {
                var options = $.data(div, formName).options;
                var args = e.args;
                deleteJSONObject(options.pageInfo);
                var pageInfo = {
                    pageInfo: {
                        columns: [{ name: "pageNo".toUpperCase(), type: "integer" }],
                        rows: []
                    }
                };
                var row = {};
                row["pageNo".toUpperCase()] = args.pageInfo.pageNo;
                pageInfo.pageInfo.rows.push(row);
                options.pageInfo = pageInfo;
                findData(div, false, function (r) {
                    if (r[0]) {
                        $("#" + gridId).dynamicGrid("changePageNo", args.pageInfo.pageNo);
                    }
                });
            }
            catch (err) {
                errorHandle(formName, "grid_PageChanged", err);
            }
        });
    }
    function getGridHeight(gridContainer, gridHeads, headRow) {
        try {
            if (headRow['HeightType'.toUpperCase()] == 1) { return headRow['Height'.toUpperCase()]; }
            var thisHeight = headRow['Height'.toUpperCase()];
            if (thisHeight == 0) { thisHeight = 1; }
            var totalPerHeight = 0;
            var totalHeight = 0;
            for (var i = 0 ; i < gridHeads.length; i++) {
                if (gridHeads[i]['HeightType'.toUpperCase()] == 0) {
                    var tHeight = gridHeads[i]['Height'.toUpperCase()];
                    if (tHeight == 0) { tHeight = 1; }
                    totalPerHeight += tHeight;
                }
                else {
                    totalHeight += gridHeads[i]['Height'.toUpperCase()];
                }
            }
            if (totalHeight == 0) {
                return Math.floor((thisHeight / totalPerHeight) * 100) + '%';
            }
            else {
                return Math.floor(thisHeight / totalPerHeight * $(gridContainer).height());
            }
        }
        catch (err) {
            errorHandle(formName, "getGridHeight", err);
        }
    }
})(jQuery);