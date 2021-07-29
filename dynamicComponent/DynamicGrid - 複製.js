(function ($) {
    var dynamicGridObj = (function (host, options) {
        this.host = $(host).prop('id');
        this.grid = this.host + '_dynamicgrid';
        this.buttons = this.host + '_buttons';
        this.styles = this.host + '_styles';
        this.contextmenu = this.host + '_contextmenu';
        this.childwindow = this.host + '_win';
        this.options = options;
        this._paramHead = "dynamicgrid";
        this._htmlName = "dynamicGrid.js";
        this._riaclassname = "cablesoft.ria.dynamic.grid.web";
        this._serverDataUrl = "data.aspx";
        this._serverParamHead = "Parameters_";
        this.buttonHeight = 35;
        this.buttonWidth = 100;
        this._noItemChar = "項次";
    });
    dynamicGridObj.prototype = {
        _host: function () {
            return $('#' + this.host);
        },
        _istree: function () {
            return this._host().attr('gridtype') == "treegrid";
        },
        height: function (value) {
            $('#' + this.host).height(value);
            var grid = $('#' + this.grid);
            var height = value;
            if (grid.length > 0) {
                if ($('#' + this.buttons).length > 0) {
                    height -= this.buttonHeight;
                }
                if (this._istree()) {
                    grid.jqxTreeGrid('height', height);
                }
                else {
                    grid.jqxGrid('height', height);
                }
            }
        },
        destroy: function () {
            try {

                var _styles = $('#' + this.styles);
                if (_styles.length > 0) {
                    _styles.remove();
                    _styles = null;
                }
                var _contextmenu = $('#' + this.contextmenu);
                if (_contextmenu.length > 0) {
                    _contextmenu.jqxMenu('destroy');
                    _contextmenu = null;
                }
                var buttons = $('#' + this.buttons);
                if (buttons.length > 0) {
                    for (var i = 0; i < 100; i++) {
                        var btnid = this.buttons + '_' + i;
                        if ($('#' + btnid).length > 0) {
                            switch ($('#' + btnid).attr('data-type')) {
                                case 'linkbutton':
                                    $('#' + btnid).jqxLinkButton('destroy');
                                    break;
                                default:
                                    $('#' + btnid).jqxButton('destroy');
                            }
                        }
                        else {
                            break;
                        }
                    }
                    buttons.remove();
                }
                var windows = this._host().attr('data-windows');
                if (windows != null) {
                    var wins = windows.split(',');
                    for (var key in wins) {
                        var winId = wins[key].toString();
                        winId = winId.substr(0, winId.length - 5);
                        if ($('#' + winId).length > 0) {
                            $('#' + winId).csWindow('close');
                        }
                    }
                    this._host().removeAttr('data-windows');
                }
                var grid = $('#' + this.grid);
                if (grid.length > 0) {
                    if (this._istree()) {
                        $('#' + this.grid).jqxTreeGrid("destroy");
                    }
                    else {
                        $('#' + this.grid).jqxGrid("destroy");
                    }
                    this._host().removeAttr('gridtype');
                }
                this.host.remove();
            }
            catch (err) {
                alert(err.message);
            }
        },
        refresh: function (options) {
            this._refresh(options);
        },
        _refresh: function (options) {
            try {
                var defaultPageCounts = 500;
                var noItem = this._noItemChar;
                var serverDataUrl = this._serverDataUrl;
                var serverParamHead = this._serverParamHead;
                var paramHead = this._paramHead;
                var htmlName = this._htmlName;
                var riaclassname = this._riaclassname;
                var sysprogramid = sessionStorage.getItem(paramHead + "_sysprogramid");
                var programid = sessionStorage.getItem(paramHead + "_programid");
                var logininfo = sessionStorage.getItem(paramHead + "_logininfo");
                var indata = sessionStorage.getItem(paramHead + "_indata");
                var intIndex = sessionStorage.getItem("formindex");
                var settingdata = sessionStorage.getItem(paramHead + "_setttindata");
                var isTree;
                var styleid = this.styles;
                var buttonsid = this.buttons;
                var contextmenuid = this.contextmenu;
                var myhost = this._host();
                var gridName = this.grid;
                var childwindow = this.childwindow;
                var haveButtons;
                var gridHeight;
                var buttonHeight = this.buttonHeight;
                var buttonWidth = this.buttonWidth;
                //var options = this.options;
                if (options != null) {
                    sysprogramid = options["sysprogramid"];
                    programid = options["programid"];
                    logininfo = options["logininfo"];
                    indata = options["indata"];
                    settingdata = options["settingdata"];
                }
                else { options = {}; }
                ClearStorgeParameters(paramHead);
                var windowIndex = 0;
                //jqxGrid
                var dgdivObj = $('<div id = "' + gridName + '"></div>').appendTo(myhost);
                //var contextmenu;
                if (sysprogramid == null || sysprogramid == "") {
                    alert("no programid!!");
                    return;
                }
                if (settingdata != null && settingdata != undefined) {
                    _refresh(settingdata);
                }
                else {
                    _getSettingData(_getParems());
                }
                function _fromJSON(data, compress) {
                    return CableSoftJSON.FromJSON(data, compress);
                    try {
                        function GetColumnIndex(ColumnName) {
                            var ColumnIndex = 0;
                            var intX = 0;
                            for (var i = ColumnName.length - 1; i >= 0; i--) {
                                if (intX > 0) {
                                    ColumnIndex += (ColumnName.substr(i, 1).charCodeAt(0) - 64) * 26 * intX;
                                }
                                else {
                                    ColumnIndex += (ColumnName.substr(i, 1).charCodeAt(0) - 64);
                                }
                                intX += 1;
                            }
                            return (ColumnIndex - 1);
                        }
                        if (compress == undefined) { compress = true; }
                        for (var tablename in data) {
                            if (tablename.indexOf("SCHEMATABLE_") < 0) {
                                for (var row = 0; row < data[tablename].length; row++) {
                                    var keys = Object.keys(data[tablename][row]);
                                    var schematable = "SCHEMATABLE_" + tablename;
                                    var keynames = data[schematable];
                                    for (var i = 0; i < keynames.length; i++) {
                                        var haveField = false;
                                        for (var j = 0; j < keys.length; j++) {
                                            if (i == GetColumnIndex(keys[j])) {
                                                haveField = true;
                                                //壓縮時需將正確的欄位名稱還原
                                                if (compress == true) {
                                                    var value = data[tablename][row][keys[j]];
                                                    delete data[tablename][row][keys[j]];
                                                    data[tablename][row][keynames[GetColumnIndex(keys[j])]["C"]] = value;
                                                }
                                            }
                                        }
                                        if (haveField == false) {
                                            data[tablename][row][keynames[i]["C"]] = null;
                                        }
                                        if (keynames[i]["D"].toUpperCase().indexOf("DATE") >= 0) {
                                            if (data[tablename][row][keynames[i]["C"]] != null) {
                                                data[tablename][row][keynames[i]["C"]] = new Date(data[tablename][row][keynames[i]["C"]])
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        return data;
                    }
                    catch (err) {
                        alert('CableSoftJSON_FromJSON' + err.Message);
                    }
                }
                //取得動態條件內容
                function _getSettingData(params) {
                    try {
                        var sucessfunc = function (responsedata) {
                            if (ShowRIAError(responsedata) == false) {
                                return;
                            }
                            var dataJSON = _fromJSON($.parseJSON(responsedata.ResultXML));
                            _refresh(dataJSON);
                        };
                        $.ajax({
                            type: "post",
                            url: serverDataUrl,
                            dataType: 'json',
                            data: params,
                            success: sucessfunc,
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert('ajax: Error Code:' + xhr.status + ',ErrorMsg:' + thrownError);
                            }
                        });
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_getSettingData", err);
                    }
                }
                //取得呼叫Server 的參數
                function _getParems() {
                    var params = {};
                    params[serverParamHead + "classname"] = riaclassname;
                    params[serverParamHead + "methodname"] = "getdynamicallinone";
                    params[serverParamHead + "logininfo"] = logininfo;
                    params[serverParamHead + "sysprogramid"] = sysprogramid;
                    params[serverParamHead + "programid"] = programid;
                    params[serverParamHead + "indata"] = indata;
                    return params
                }
                //取得Grid Columns
                function _getGridColumns(data) {
                    try {
                        var j = [];
                        var deffields = data.DYFIELD;
                        //新增一個rownumber column
                        var AlternateRowBackground = null;
                        var nocellsrenderer = function (row, column, value, defaulthtml, columnproperties) {
                            return '<div style= "margin:4px;" class="jqx-grid-cell-' + columnproperties.cellsalign + '-align">' + (value + 1) + '</div>';;
                        };
                        if (deffields.length > 0) {
                            AlternateRowBackground = deffields[0].ALTERNATEROWBACKGROUND;
                            if (AlternateRowBackground != null) {
                                var varback = _getColorValue(AlternateRowBackground, true);
                                nocellsrenderer = function (row, column, value, defaulthtml, columnproperties) {
                                    if (row % 2 == 1) {
                                        return '<div style="' + varback + 'width: 100%; height: 100%"><span class="jqx-grid-cell-' + columnproperties.cellsalign + '-align" style="margin-top: 4px; float: ' + columnproperties.cellsalign + ';">' + (value + 1) + '</span></div>';
                                    }
                                    else {
                                        return '<div style= "margin:4px;" class="jqx-grid-cell-' + columnproperties.cellsalign + '-align">' + (value + 1) + '</div>';;
                                    }
                                };
                            }
                        }
                        var datafieldName;
                        var cellsalignName;
                        var cellsformatName;
                        var cellclassnameName;
                        if (isTree == false) {
                            j.push({
                                text: noItem, sortable: false, filterable: false, editable: false,
                                groupable: false, draggable: false, resizable: false,
                                datafield: '', columntype: 'number', width: 40,
                                cellsrenderer: nocellsrenderer, cellsalign: "right", align: "right"
                            });
                            datafieldName = "datafield";
                            cellsalignName = "cellsalign";
                            cellsformatName = "cellsformat";
                            cellclassnameName = "cellclassname";
                        }
                        else {
                            datafieldName = "dataField";
                            cellsalignName = "cellsAlign";
                            cellsformatName = "cellsFormat";
                            cellclassnameName = "cellClassName";
                        }
                        var cellclassnamesStr = [];
                        for (var key in deffields) {
                            var fieldname = deffields[key].FIELDNAME;
                            var headname = deffields[key].HEADNAME;
                            var datatype = deffields[key].DATATYPE;
                            var formatstring = deffields[key].FORMATSTRING;
                            var alignment = deffields[key].ALIGNMENT;
                            var fontcolor = deffields[key].FONTCOLOR;
                            var changevalue = deffields[key].CHANGEVALUE;
                            var fieldwidth = deffields[key].FIELDWIDTH;

                            //                    alert(JSON.stringify(fieldname);
                            var n = {};
                            n[datafieldName] = fieldname.toString().toUpperCase();
                            n["text"] = headname;
                            n["sortable"] = true;
                            if (alignment != null) {
                                switch (alignment) {
                                    case 1:
                                        n["align"] = "right";
                                        n[cellsalignName] = "right";
                                        break;
                                    case 2:
                                        n["align"] = "center";
                                        n[cellsalignName] = "center";
                                        break;
                                    default:
                                        n["align"] = "left";
                                        n[cellsalignName] = "left";
                                }
                            }
                            if ((datatype == 2 || datatype == 3)) {
                                //0=字串 1=數字 2=日期(yyyy/MM/dd) 3=日期時間(yyyy/MM/dd HH:mm:ss)
                                switch (datatype) {
                                    case 2:
                                        n[cellsformatName] = "yyyy/MM/dd";
                                        break;
                                    case 3:
                                        n[cellsformatName] = "yyyy/MM/dd HH:mm:ss";
                                        break;
                                    case 1:
                                }
                            }
                            if (fieldwidth != null && fieldwidth != 0) {
                                var val = Number(fieldwidth);
                                val = Math.round(val / 10) * 10;
                                n["width"] = val;
                            }
                            else {
                                n["width"] = 100;
                            }
                            //get styler
                            var funcchangevalue = _createColumnrender(changevalue);
                            if (funcchangevalue != null) {
                                //alert(funccolor);
                                n["cellsrenderer"] = funcchangevalue;
                            }
                            var retStyler = _createColumnstyler(fontcolor, AlternateRowBackground, key);
                            ////var funccolor = _createColumnstyler(fontcolor, null);

                            //var cellclassname = function (row, column, value, data) {
                            //    if (row % 2 == 1) {
                            //        return "yellowCell";
                            //    }
                            //    else {
                            //        return "yellowCell2";
                            //    }
                            //};
                            if (retStyler != null) {
                                n[cellclassnameName] = retStyler[0];
                                for (var i = 0; i < retStyler[1].length; i++) {
                                    if (cellclassnamesStr.indexOf(retStyler[1][i]) < 0) {
                                        cellclassnamesStr.push(retStyler[1][i]);
                                    }
                                }
                            }
                            j.push(n);
                        }
                        $('<style id = "' + styleid + '">' + cellclassnamesStr.join("") + '</style>').appendTo('head');
                        //x.remove();
                        return j;
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_getGridColumns", err);
                    }
                }

                //改變欄位的內容
                function _createColumnrender(changevalue) {
                    try {
                        //background-color:pink;
                        var funcStr = [];
                        if (changevalue != null) {
                            funcStr = ['(function (row, column, value, defaulthtml) {'];
                            funcStr.push("var tvalue = $(defaulthtml).html();");
                            funcStr.push("if (!tvalue) {tvalue = value;}");
                            funcStr.push("var changvalue = false;");
                            var vchangevalue = _getSplitReplaceValue(changevalue, false)[0].join(String.fromCharCode(13) + String.fromCharCode(10));
                            funcStr.push(vchangevalue);
                            funcStr.push("changvalue = true;");
                            funcStr.push('if (changevalue) {');
                            funcStr.push('return \'<div style="margin:4px;">\' + tvalue + \'</div>\';');
                            funcStr.push('}');
                            funcStr.push('})');
                        }
                        if (funcStr.length > 0) {
                            var func = eval(funcStr.join(String.fromCharCode(13) + String.fromCharCode(10)));
                            return func;
                        }
                        else { return null; }
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_createColumnrender", err);
                    }
                }
                //設定欄位Styler
                function _createColumnstyler(fontcolor, AlternateRowBackground, idxcol) {
                    try {
                        //background-color:pink;
                        var funcStr = [];
                        var classnames = [];
                        var idxclass = 0;
                        if (fontcolor != null || AlternateRowBackground != null) {
                            funcStr = ['(function (row, column, value, data) {'];
                            funcStr.push('var tvalue = value;');
                            funcStr.push('var rvalue = "";');
                            if (AlternateRowBackground != null) {
                                funcStr.push(' if (row % 2 == 1) {');
                                var varback = _getColorValue(AlternateRowBackground, true);
                                //.yellowCell{background-color: yellow;}
                                var classname = dgdivObj.prop('id') + "_cellclass_" + idxclass.toString();
                                classnames.push("." + classname + "{" + varback + "}");
                                funcStr.push(' rvalue += " ' + classname + '";');
                                funcStr.push('}');
                            }
                            if (fontcolor != null) {
                                var retValue = _getSplitReplaceValue(fontcolor, true, idxcol);
                                classnames = retValue[1];
                                var vfontcolor = retValue[0].join(String.fromCharCode(13) + String.fromCharCode(10));
                                funcStr.push(vfontcolor);
                            }
                            funcStr.push('if (rvalue != null) {');
                            funcStr.push('return rvalue.trim(); ');
                            funcStr.push('}');
                            funcStr.push('})');
                        }

                        if (funcStr.length > 0) {
                            var func = eval(funcStr.join(String.fromCharCode(13) + String.fromCharCode(10)));
                            return [func, classnames];
                        }
                        else { return null; }
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_createColumnstyler", err);
                    }
                }

                function _getSplitReplaceValue(iValue, isColor, idxcol) {
                    try {
                        var Value = iValue.toString();
                        var ValueSplit = Value.split(",");
                        var funcValueStr = [];
                        var field = "rvalue";
                        var classnames = [];
                        if (isColor == false) {
                            field = "tvalue";
                        }
                        var mustdo = true;

                        if (ValueSplit.length == 1) {
                            var ValueParaSplit = Value.split("=");
                            mustdo = false;
                            if (ValueParaSplit.length == 1) {
                                var val = _getReturnValString(ValueParaSplit[0], isColor, idxcol, 1);
                                classnames.push(val[1]);
                                funcValueStr.push(field + ' = "' + val[0] + '";');
                            }
                            else if (ValueParaSplit[0] == "") {
                                var val = _getReturnValString(ValueParaSplit[1], isColor, idxcol, 1);
                                classnames.push(val[1]);
                                funcValueStr.push(field + ' = "' + val[0] + '";');
                            }
                            else { mustdo = true; }
                        }
                        if (mustdo) {
                            for (var i = 0; i < ValueSplit.length; i++) {
                                var ValueParaSplit = ValueSplit[i].split("=");
                                if (ValueParaSplit.length > 1) {
                                    // =#FF0000 or =256
                                    if (ValueParaSplit[0] == null || ValueParaSplit[0] == undefined || ValueParaSplit[0] == "") {
                                        var val = _getReturnValString(ValueParaSplit[1], isColor, idxcol, i);
                                        classnames.push(val[1]);
                                        if (funcValueStr.length == 0) {
                                            funcValueStr.push(field + ' = "' + val[0] + '";');
                                        }
                                        else {
                                            funcValueStr.push('else {');
                                            funcValueStr.push(field + ' = "' + val[0] + '";');
                                            funcValueStr.push('}');
                                        }
                                    }
                                    //1=#FF0000 or 1=256
                                    else {
                                        //alert(ValueParaSplit[0] + ',' + ValueParaSplit[1]);
                                        if (funcValueStr.length == 0) {
                                            funcValueStr.push('if (tvalue.toString() == "' + ValueParaSplit[0] + '") {');
                                        }
                                        else {
                                            funcValueStr.push('else if (tvalue.toString() == "' + ValueParaSplit[0] + '") {');
                                        }
                                        var val = _getReturnValString(ValueParaSplit[1], isColor, idxcol, i);
                                        classnames.push(val[1]);
                                        funcValueStr.push(field + ' = "' + val[0] + '";');
                                        funcValueStr.push('}');
                                    }
                                }
                                else {
                                    funcValueStr.push('else {');
                                    var val = _getReturnValString(ValueParaSplit[0], isColor, idxcol, i);
                                    classnames.push(val[1]);
                                    funcValueStr.push(field + ' = "' + val[0] + '";');
                                    funcValueStr.push('}');
                                }
                            }
                        }

                        return [funcValueStr, classnames];
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_getSplitReplaceValue", err);
                    }

                    function _getReturnValString(value, isColor, idxcol, idx) {
                        if (isColor) {
                            if (idxcol == null) { idxcol = 0; }
                            if (idx == null) { idx = 0; }
                            var classname = "cellclass_" + idxcol.toString() + "_" + (idx + 1).toString() + "_" + dgdivObj.prop('id');
                            var classnames = "." + classname + "{" + _getColorValue(value, false) + "}";
                            return [classname, classnames];
                        }
                        else {
                            return [_getChangeValue(value), null];
                        }

                    }
                    function _getChangeValue(value) {
                        return value;
                    }

                }
                //'background-color:#ffee00;color:red;'
                //{class:'c1',style:'color:red'}
                function _getColorValue(value, isbackColor) {
                    if (value.indexOf("#") < 0) {
                        value = Number(value).toString(16);
                    }
                    else { value = value.substring(1); }
                    if (value.length > 6) {
                        value = value.substring(value.length - 6);
                    }
                    value = '#' + value.toLowerCase();
                    if (isbackColor == true) {
                        value = 'background-color:' + value + ';';
                    }
                    else {
                        value = 'color:' + value + ';';
                    }
                    return value;
                }


                //取得Grid Data
                function GetGridData(data, pageNumber, PageCounts) {
                    try {
                        var tablename;
                        //var data = jQuery.extend({}, indata);
                        for (var key in data) {
                            tablename = key;
                            break;
                        }
                        var realdata = [];
                        for (var i = 0; i < PageCounts; i++) {
                            var j = (pageNumber - 1) * PageCounts + i;
                            if (j >= data[tablename].length) { break; }
                            realdata[i] = data[tablename][j];
                            //if (isTree == true) {
                            //    var treePKeyValue = data[tablename][j][data.DYFIELD[0].TREEPARENTKEYFIELD];
                            //    var treeKeyValue = data[tablename][j][data.DYFIELD[0].TREEKEYFIELD];
                            //    if ((treePKeyValue != treeKeyValue) && (treePKeyValue != null)) {
                            //        for (var x = 0; x < realdata.length; x++) {
                            //            if (realdata[x][data.DYFIELD[0].TREEKEYFIELD] == treePKeyValue) {
                            //                realdata[i]["_parentId"] = treePKeyValue;
                            //            }
                            //        }
                            //    }
                            //}
                        }
                        return realdata;
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "GetGridData", err);
                    }
                }
                //更新 Grid
                function _refresh(dataJSON) {
                    try {
                        //i秘書需要取此欄位
                        var PageRowCounts = dataJSON.DYFIELD[0].PAGEROWCOUNT;
                        var PageSize = defaultPageCounts;
                        var pageable = false;
                        var selectionmode = "singlerow";
                        if (dataJSON.DYFIELD[0].CANCHOOSE == 1) {
                            selectionmode = "checkbox";
                        }
                        programId = dataJSON.DYFIELD[0].PROGRAMID;
                        isTree = (dataJSON.DYFIELD[0].ISTREEVIEW == 1);
                        haveButtons = dataJSON.DYMENU.length > 0;
                        gridHeight = dgdivObj.parent().height();
                        if (gridHeight > 100) {
                            if (haveButtons) { gridHeight -= buttonHeight; }
                        }
                        else { gridHeight = null; }
                        if (PageRowCounts != null && PageRowCounts != 0) {
                            PageSize = PageRowCounts;
                        }
                        if (PageSize > 0) {
                            pageable = true;
                        }
                        var cols = _getGridColumns(dataJSON, isTree);
                        if (cols == null) {
                            return;
                        }
                        var data = GetGridData(dataJSON, 1, PageSize);
                        if (isTree == true) {
                            _CreateTreeGrid(dataJSON, pageable, PageSize, selectionmode, cols, data);
                            myhost.attr('gridtype', 'treegrid');
                        }
                        else {
                            _CreateDataGrid(dataJSON, pageable, PageSize, selectionmode, cols, data);
                            myhost.attr('gridtype', 'datagrid');
                        }
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_refresh", err);
                    }
                }
                //建立Tree Grid
                function _CreateTreeGrid(dataJSON, pageable, PageSize, selectionmode, cols, data) {
                    try {
                        try {
                            var currentfield;
                            var tabWidth = dgdivObj.width() - 20;
                            //var tabHeight = dgdivObj.height();
                            //var getParentHeight = function (elem) {
                            //    if (elem == $(document)) {
                            //        return $(document).height();
                            //    }
                            //    if (elem == $(window)) {
                            //        return $(window).height();
                            //    }
                            //    if (elem.parent().length > 0) {
                            //        getParentHeight(elem.parent());
                            //    }
                            //    else { return elem.height(); }
                            //}
                            //if (dgdivObj.parent().height() > 0) { tabHeight = dgdivObj.parent().height() - 20; }
                            //alert(dgdivObj.parent().height);

                            var source = {
                                datatype: "json",
                                localdata: data,
                                hierarchy: {
                                    keyDataField: { name: dataJSON.DYFIELD[0].TREEKEYFIELD },
                                    parentDataField: { name: dataJSON.DYFIELD[0].TreeParentKeyField }
                                },
                                id: dataJSON.DYFIELD[0].TREEKEYFIELD,
                                pagesize: PageSize
                            };

                            //建立 Header ContextMenu
                            for (i = 0; i < cols.length; i++) {
                                var dataField = cols[i]['dataField'];
                                cols[i]['rendered'] = function (e) {
                                    e.parent().on('contextmenu', function (event) {
                                        event.preventDefault();
                                        _createContextMenu(dataJSON, event, dataField, null, -1, cols);
                                    });
                                }
                            }
                            var dataAdapter = new $.jqx.dataAdapter(source);
                            if (data.length <= PageSize) { pageable = false; }
                            var options = {
                                source: dataAdapter,
                                columns: cols,
                                selectionMode: selectionmode,
                                pageable: pageable,
                                pagerMode: "simple",
                                width: '100%',
                                altRows: true,
                                sortable: true,
                                columnsResize: true
                            }
                            if (gridHeight != null) {
                                options.height = gridHeight;
                            }
                            dgdivObj.jqxTreeGrid(options);
                        }
                        catch (err) {
                            ErrorHandle('defaultGrid.htm', 'treegrid', err);
                            return;
                        }
                        dgdivObj.on('contextmenu', function (event) {
                            event.preventDefault();
                        });
                        //建立ContextMenu
                        dgdivObj.on("rowClick", function (event) {
                            event.preventDefault();
                            var args = event.args;
                            if (args.originalEvent.button == 2) {
                                var args = event.args;
                                //var rowindex = args.rowindex;
                                var ev = args.originalEvent;
                                var dataField = args.dataField;
                                //var row = dgdivObj.jqxTreeGrid('getrowdata', rowindex);
                                var row = args.row;
                                _createContextMenu(dataJSON, event, dataField, row, 1, cols);
                            }
                            else {
                                if ($('#' + contextmenuid).length > 0) {
                                    $('#' + contextmenuid).jqxMenu('close');
                                }
                            }
                        });
                        _createButton(dataJSON);
                    }
                    catch (err) {
                        ErrorHandle(htmlName, '_CreateDataGrid', err);
                    }
                }
                //建立一般的 Grid
                function _CreateDataGrid(dataJSON, pageable, PageSize, selectionmode, cols, data) {
                    try {
                        try {
                            var currentfield;
                            var tabWidth = dgdivObj.width() - 20;
                            //var tabHeight = dgdivObj.height();
                            //var getParentHeight = function (elem) {
                            //    if (elem == $(document)) {
                            //        return $(document).height();
                            //    }
                            //    if (elem == $(window)) {
                            //        return $(window).height();
                            //    }
                            //    if (elem.parent().length > 0) {
                            //        getParentHeight(elem.parent());
                            //    }
                            //    else { return elem.height(); }
                            //}
                            //if (dgdivObj.parent().height() > 0) { tabHeight = dgdivObj.parent().height() - 20; }
                            var source = {
                                datatype: "json",
                                localdata: data,
                                pagesize: PageSize
                            };
                            //建立 Header ContextMenu

                            for (i = 0; i < cols.length; i++) {
                                var dataField = cols[i]['datafield'];
                                var haveClass = (cols[i]['cellclassname'] != null);
                                //cellclassnameName = "cellClassName";
                                cols[i]['rendered'] = function (e) {
                                    e.parent().on('contextmenu', function (event) {
                                        event.preventDefault();
                                        _createContextMenu(dataJSON, event, dataField, null, -1, cols);
                                    });
                                    //當有特別指定變色時
                                    //if (haveClass) {
                                    //}
                                }
                                
                            }
                            if (data.length <= PageSize) { pageable = false; }
                            var dataAdapter = new $.jqx.dataAdapter(source);
                            var options = {
                                source: dataAdapter,
                                selectionmode: selectionmode,
                                pageable: pageable,
                                pagermode: "simple",
                                width: '100%',
                                //height: height,
                                altrows: true,
                                sortable: true,
                                columnsresize: true,
                                columns: cols,
                                ready: function () {
                                    if (data.length > 0) {
                                        dgdivObj.jqxGrid('selectrow', 0);
                                    }
                                },
                            };
                            //alert(dgdivObj.parent().height());
                            if (gridHeight != null) {
                                options.height = gridHeight;
                            }
                            dgdivObj.jqxGrid(options);
                        }
                        catch (err) {
                            ErrorHandle('defaultGrid.htm', 'datagrid', err);
                        }
                        dgdivObj.on('contextmenu', function (event) {
                            event.preventDefault();
                        });
                        //建立ContextMenu
                        dgdivObj.on("cellclick", function (event) {
                            event.preventDefault();
                            if (event.args.rightclick) {
                                var args = event.args;
                                var rowindex = args.rowindex;
                                //var ev = args.originalEvent;
                                var dataField = args.datafield;
                                var row = dgdivObj.jqxGrid('getrowdata', rowindex);

                                dgdivObj.jqxGrid('selectrow', rowindex);
                                _createContextMenu(dataJSON, event, dataField, row, rowindex, cols);
                            }
                        });
                        var haveButton = _createButton(dataJSON);

                    }
                    catch (err) {
                        ErrorHandle(htmlName, '_CreateDataGrid', err);
                    }
                }
                function _createButton(dataJSON) {
                    var buttons = dataJSON.DYMENU;
                    if (buttons.length == 0) {
                        return false;
                    }
                    var buttonDiv = $('<div id = "' + buttonsid + '"></div>').appendTo(myhost);
                    buttonDiv.css('height', buttonHeight);
                    var rowData = null;
                    if (isTree == true) {
                        var selection = dgdivObj.jqxTreeGrid('getSelection');
                        for (var i = 0; i < selection.length; i++) {
                            var rowData = selection[i];
                        }
                    }
                    else {
                        var rowindex = dgdivObj.jqxGrid('getselectedrowindex');
                        if (rowindex >= 0) {
                            var rowData = dgdivObj.jqxGrid('getrowdata', rowindex);
                        }
                    }
                    for (var i in buttons) {
                        var btnRow = buttons[i];
                        var btnid = buttonsid + '_' + i;
                        var btn = $('<input type="button" value="' + btnRow["CAPTION"] + '" id="' + btnid + '" data-pid = "' + i.toString() + '"/>').appendTo(buttonDiv);
                        if (btnRow["TYPE"] == 1) {
                            $('#' + btnid).jqxLinkButton({ width: buttonWidth, height: buttonHeight - 5 });
                            $('#' + btnid).attr('data-type', 'linkbutton');
                        }
                        else {
                            $('#' + btnid).jqxButton({ width: buttonWidth, height: buttonHeight - 5 });
                            $('#' + btnid).attr('data-type', 'button');
                        }
                        $('#' + btnid).css('margin', 1);
                        //btn.css('width', 100);
                        //btn.css('height', 30);
                        //btn.css('margin', 3);
                        //var func = eval('(function () {' +
                        //                'CreateSubWindows($(#' + btnid + '), buttons, rowData);' +
                        //                '})');

                        var rowDataJson;
                        if (rowData != null) {
                            rowDataJson = ',JSON.parse(\'' + JSON.stringify(rowData) + '\')';
                        }
                        var buttonsJson = JSON.stringify(buttons);
                        var func = '(function () {' +
                                    'CreateSubWindows($(\'#' + btnid + '\'),JSON.parse(\'' + buttonsJson + '\')' + rowDataJson + ');' +
                                    '})';
                        $('#' + btnid).on('click', eval(func));

                    }
                    return true;
                }
                //建立 Context Menu
                function _createContextMenu(dataJSON, event, field, row, rowindex, cols) {
                    try {
                        var dProId;
                        for (var key in dataJSON.DYFIELD) {
                            if (dataJSON.DYFIELD[key].FIELDNAME.toUpperCase() == field.toUpperCase()) {
                                dProId = dataJSON.DYFIELD[key].DPROGRAMID;
                                break;
                            }
                        }
                        if ($('#' + contextmenuid).length > 0) {
                            $('#' + contextmenuid).jqxMenu('destroy');
                        }
                        //建立右鍵功能表
                        if (dProId != null || dProId != "") {
                            var menuItems = dataJSON["MENU_" + dProId];
                            if (menuItems != null) {
                                //disable contextmenu
                                dgdivObj.on('contextmenu', function () {
                                    return false;
                                });
                                var contextmenu = $('<div id="' + contextmenuid + '"></div>').appendTo('body');
                                //var contextmenu = $('<div></div>').appendTo('body');
                                var ul = $('<ul></ul>').appendTo(contextmenu);
                                for (var key in menuItems) {
                                    var editmode = menuItems[key].EDITMODE;
                                    var title = menuItems[key].CAPTION2;
                                    var type = menuItems[key].TYPE;
                                    if (((((editmode == 2 || editmode == 9) && type == 2) || type == 0) && rowindex == -1) || rowindex >= 0) {
                                        var icon;
                                        if (type == 2) {
                                            //0=顯示,1=修改,2=新增,3=刪除,5=列印,9=其他
                                            switch (editmode) {
                                                case 0:
                                                    icon = "view1.png";
                                                    break;
                                                case 1:
                                                    icon = "edit1.png";
                                                    break;
                                                case 2:
                                                    icon = "add1.png";
                                                    break;
                                                case 3:
                                                    icon = "del1.png";
                                                    break;
                                                //                                                    case 9:                                                                                                                                                                                              
                                                //                                                        iconCls = "icon-edit";                                                                                                                                                                                             
                                                //                                                        break;                                                                                                                                                                                             
                                                default:
                                                    break;
                                            }
                                        }
                                        var litag = title;
                                        if (icon != null) {
                                            litag = "<img style='float: left; margin-right: 5px;' src='../images/" + icon + "' /><span>" + title + "</span>";
                                        }
                                        //<img style='float: left; margin-right: 5px;' src='../images/mailIcon.png' /><span>Mail</span>
                                        $('<li data-pid="' + key + '">' + litag + '</li>').appendTo(ul);
                                    }
                                }
                                //create contextmenu
                                contextmenu.jqxMenu({ width: '200px', height: 'auto', autoOpenPopup: false, mode: 'popup' });
                                //item Click
                                contextmenu.on('itemclick', function (event) {
                                    var args = event.args;
                                    //var rowindex = dgdivObj.jqxGrid('getselectedrowindex');
                                    //var row = $('#jqxGrid').jqxGrid('getrowdata', rowindex);
                                    CreateSubWindows(args, menuItems, row);
                                });
                                //show contextmenu
                                //var scrollTop = $(window).scrollTop();
                                //var scrollLeft = $(window).scrollLeft();
                                //alert(JSON.stringify(cols));
                                var totalfieldWidth = 0;
                                for (var i in cols) {
                                    var fieldwidth = 0;
                                    var tfield;
                                    if (isTree) {
                                        tfield = cols[i].dataField;
                                        fieldwidth = dgdivObj.jqxTreeGrid('getColumnProperty', tfield, 'width');
                                    }
                                    else {
                                        tfield = cols[i].datafield;
                                        fieldwidth = dgdivObj.jqxGrid('getcolumnproperty', tfield, 'width');
                                    }
                                    totalfieldWidth += fieldwidth;
                                    if (field == tfield) {
                                        totalfieldWidth -= (fieldwidth) / 2;
                                        break;
                                    }

                                }
                                //alert(event.args.originalEvent.offsetX);
                                //var x = event.args.originalEvent.offsetX + totalfieldWidth;
                                //var y = (event.args.originalEvent.pageY - event.args.originalEvent.offsetY) / 2;
                                var scrollTop = $(dgdivObj.parent()).scrollTop();
                                var scrollLeft = $(dgdivObj.parent()).scrollLeft();
                                var scrollTop = 0;
                                var scrollLeft = 0;

                                var x = scrollLeft + 5;
                                var y = scrollTop + 5;
                                //var keys = [];
                                //var i = 0;
                                //for (key in event) {
                                //    keys[i] = key;
                                //    i += 1;
                                //}
                                //alert(keys.join(','));
                                if (event.pageX != null && event.pageY != null) {
                                    x = event.pageX;
                                    y = event.pageY;
                                }
                                else if (event.args != null && event.args.originalEvent != null) {
                                    var ev = event.args.originalEvent;
                                    x += parseInt(ev.clientX);
                                    y += parseInt(ev.clientY);
                                }
                                function getMenuXY(x, y) {
                                    if (x + 200 > $(window).width()) {
                                        x -= 200;
                                    }
                                    if (y + contextmenu.height() > $(window).height()) {
                                        y -= contextmenu.height();
                                    }
                                    return [x, y];
                                }
                                var xy = getMenuXY(x, y);
                                contextmenu.jqxMenu('open', xy[0], xy[1]);

                                //$(contextmenu.parent()).appendTo(dgdivObj);
                            }
                        }

                    }
                    catch (err) {
                        ErrorHandle(htmlName, '_createContextMenu', err);
                    }
                }
                //呼叫新的Form
                function CreateSubWindows(item, menuItems, row) {
                    try {
                        var key = $(item).attr('data-pid');
                        var menuItem = menuItems[key];
                        var width = menuItem.FORMWIDTH;
                        var height = menuItem.FORMHEIGHT;
                        var left = 0;
                        var top = 0;
                        var type = menuItem.TYPE;
                        var container = $(myhost);
                        if (width == null) { width = 0; }
                        if (height == null) { height = 0; }
                        if (width > container.width() || width == 0) { width = container.width(); }
                        if (height > container.height() || height == 0) { height = container.height(); }
                        //CreatWindow(container, "win_" + key, item.text, height, width, true, true);
                        //	                        var size;
                        //left = container.position.left + (container.width() - width) / 2;
                        //top = container.position.top + (container.height() - height) / 2;
                        left = (container.width() - width) / 2;
                        top = (container.height() - height) / 2;
                        //alert(left + ',' + top);
                        var datatablename = menuItem.DATATABLENAME;
                        var dprogramid = menuItem.PROGRAMID;
                        var dsysprogramid = menuItem.SYSPROGRAMID;
                        var deditmode = menuItem.EDITMODE;
                        var title = menuItem.CAPTION + '[' + menuItem.PROGRAMID + ']';
                        var parentId = dgdivObj.prop("id");
                        var windowattr = "data-windows";
                        switch (type) {
                            case 0: //呼叫i秘書
                                var childoptions = setsessionStorageparams(paramHead, false);
                                OpenDetailByWin(container, parentId, title,
                                    { x: left, y: top },
                                    { width: width, height: height },
                                    {
                                        completed: function (win) {
                                            //var data_wins = [];
                                            //if (myhost.attr(windowattr) != null) {
                                            //    data_wins = myhost.attr(windowattr).split(',');
                                            //}
                                            //data_wins.push(win.prop('id'));
                                            //myhost.attr(windowattr, data_wins.join(','));
                                            _addchildWindowAttr(win);
                                            win.DynamicGrid('refresh', childoptions);
                                        },
                                        destroy: function (win) {
                                            try {
                                                win.DynamicGrid('destroy');
                                                //var data_wins = myhost.attr(windowattr).split(',');
                                                //var idx = data_wins.indexOf(win.prop('id'));
                                                //delete data_wins[idx];
                                                //data_wins.splice(idx, 1);
                                                //if (data_wins.length == 0) {
                                                //    myhost.removeAttr(windowattr);
                                                //}
                                                //else {
                                                //    myhost.attr(windowattr, data_wins.join(','));
                                                //}
                                                _removechildWindowAttr(win);
                                            }
                                            catch (err) {
                                                ErrorHandle(htmlName, 'CreateSubWindows_0_destroy', err)
                                            }
                                        }
                                    });

                                break;
                            case 1:
                                var url = menuItem.SQLQUERY;
                                var caption = menuItem.CAPTION2;
                                if (row != null) {
                                    for (var i in row) {
                                        var spliturl = url.split(i);
                                        url = spliturl.join(row[i]);
                                    }
                                }
                                window.open(url, caption, config = 'height=' + height + ',width=' + width);
                                break;
                            case 2: //呼叫元件
                                var detailhtmlName = menuItem.CLASSNAME;
                                var thName = detailhtmlName.split("/");
                                var tParamHead = thName[thName.length - 1].split('.')[0];
                                setsessionStorageparams(tParamHead, true);
                                OpenDetailByWin(container, parentId, title,
                                    { x: left, y: top },
                                    { width: width, height: height },
                                    {
                                        completed: function (win) {
                                            _addchildWindowAttr(win);
                                            $.ajax({
                                                type: "get",
                                                url: detailhtmlName,
                                                cache: false,
                                                datatype: "html",
                                                success: function (data) {
                                                    function noscript(strCode) {
                                                        var html = $(strCode.bold());
                                                        var scripts = html.find('script');
                                                        //.remove();
                                                        for (key in scripts) {
                                                            if ($(scripts[key]).attr('src') != null) {
                                                                alert($(scripts[key]).attr('src'));
                                                            }
                                                        }
                                                        //alert(scripts.length);
                                                        return html.html();
                                                    }
                                                    //alert(scripts.length);
                                                    //win.html(noscript(data));
                                                    win.html(data);
                                                },
                                                error: function (xhr, ajaxOptions, thrownError) {
                                                    alert('status:' + xhr.status + 'error:' + thrownError);
                                                }
                                            });
                                        },
                                        destroy: function (win) {
                                            _removechildWindowAttr(win);
                                        }
                                    });

                                break;
                            case 3:
                                break;
                            case 4:
                                if (options != undefined && options['onButtonClick'] != undefined) {
                                    setsessionStorageparams(htmlName, true);
                                    options['onButtonClick'](rValue);
                                }
                                break;
                        }
                        function _addchildWindowAttr(win) {
                            var data_wins = [];
                            if (myhost.attr(windowattr) != null) {
                                data_wins = myhost.attr(windowattr).split(',');
                            }
                            data_wins.push(win.prop('id'));
                            myhost.attr(windowattr, data_wins.join(','));
                        }
                        function _removechildWindowAttr(win) {
                            var data_wins = myhost.attr(windowattr).split(',');
                            var idx = data_wins.indexOf(win.prop('id'));
                            delete data_wins[idx];
                            data_wins.splice(idx, 1);
                            if (data_wins.length == 0) {
                                myhost.removeAttr(windowattr);
                            }
                            else {
                                myhost.attr(windowattr, data_wins.join(','));
                            }
                        }
                        function setsessionStorageparams(paramHead, addTable) {
                            var childoption = {
                                sysprogramid: dsysprogramid,
                                programid: dprogramid,
                                logininfo: logininfo,
                                indata: GetInData(indata, datatablename, row, addTable),
                                editmode: deditmode
                            }
                            var tparamHead = "";
                            if (paramHead != null) {
                                tparamHead = paramHead.toLowerCase() + "_";
                            }
                            sessionStorage.setItem(tparamHead + "sysprogramid", childoption.sysprogramid);
                            sessionStorage.setItem(tparamHead + "programid", childoption.programid);
                            sessionStorage.setItem(tparamHead + "logininfo", childoption.logininfo);
                            sessionStorage.setItem(tparamHead + "indata", childoption.indata);
                            sessionStorage.setItem(tparamHead + "editmode", childoption.editmode);
                            return childoption

                        }
                        function GetInData(indata, datatablename, row, addTable) {
                            if (row != null) {
                                var jsonObj;
                                if (addTable == true) {
                                    jsonObj = $.parseJSON(indata);
                                }
                                else {
                                    jsonObj = {};
                                }
                                var rows = [];
                                rows[0] = row;
                                jsonObj[datatablename] = rows;
                                return JSON.stringify(jsonObj);
                            }
                            else {
                                return indata;
                            }
                        }
                        function OpenDetailByWin(container, parentId, tilte, position, size, methods) {
                            try {
                                var windowParentId = childwindow + getUniqueId();
                                var windowId = windowParentId + '_body';
                                $('<div id="' + windowParentId + '"><div></div><div id="' + windowId + '"></div></div>').appendTo('body');
                                $('#' + windowParentId).csWindow({
                                    height: size.height,
                                    width: size.width,
                                    minHeight: 100,
                                    minWidth: 200,
                                    maxWidth: window.outerWidth,
                                    maxHeight: window.outerHeight,
                                    //position: '[' + position.x + ',' + position.y + ']',
                                    position: position,
                                    //draggable: true,
                                    showCollapseButton: true,
                                    title: tilte,
                                    initContent: function () {
                                        try {
                                            if (methods["completed"]) {
                                                methods["completed"]($('#' + windowId));
                                                //$('#' + windowId).DynamicGrid('refresh', childoptions);
                                            }
                                        }
                                        catch (err) { }
                                        $('#' + windowParentId).appendTo(container);
                                        //parent.csWindow('focus');
                                    }
                                });
                                //parent.on('open', function (event) {
                                //    //alert(JSON.stringify(event));
                                //    //parent.csWindow('focus');
                                //    //completed(win);
                                //    alert('in1');
                                //    if (completed) {
                                //        alert('in2');
                                //        completed(win);
                                //        //$('#' + windowId).DynamicGrid('refresh', childoptions);
                                //    }
                                //});
                                $('#' + windowParentId).on('close', function (event) {
                                    try {
                                        if (methods["destroy"]) {
                                            methods["destroy"]($('#' + windowId));
                                        }
                                    }
                                    catch (err) { }
                                    $('#' + windowParentId).csWindow('destroy');
                                });
                            }
                            catch (err) {
                                ErrorHandle(htmlName, 'OpenDetailByWin', err);
                            }
                        }
                    }
                    catch (err) {
                        ErrorHandle(htmlName, 'CreateSubWindows', err);
                    }
                }
            }
            catch (err) {
                ErrorHandle(htmlName, '_refresh', err);
            }
        },
        getFocusRow: function () {
            if (this._istree()) {
                //$('#' + this.grid).jqxTreeGrid("");
            }
            else { }
        },
        getGrid: function () {
            return $('#' + this.grid);
        }

    };

    $.fn.DynamicGrid = function (method, options) {
        try {
            var instance = $.data(this, "dynamicgrid");
            if (instance == null) {
                instance = new dynamicGridObj(this, options);
                $.data(this, "dynamicgrid", instance);
            }
            var mothods = dynamicGridObj.prototype;
            if (mothods[method]) {
                //instance[method](arguments, 1);
                var domethod = mothods[method];
                var ret = domethod.apply(instance, Array.prototype.slice.call(arguments, 1));
                //var ret = domethod.apply(instance, options);
                return ret

                //} else if (typeof method === 'object' || !method) {
                //    return mothods.init.apply(instance, arguments);
            } else {
                alert('Method ' + method + ' does not exist on jQuery.dynamicGridObj');
            }
            //if (name.toUpperCase() == 'refresh'.toUpperCase()) {
            //    var dg = new DynamicGrid(this, options);
            //    dg.refresh();
            //}
            //else if (name.toUpperCase() == 'destroy'.toUpperCase()) {
            //    alert('destroy');
            //    this.jqxGrid("destroy");
            //}
        }
        catch (err) {
            ErrorHandle(htmlName, 'document_Ready', err);
        }
    }

})(jQuery);