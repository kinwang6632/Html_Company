(function ($) {
    function destroycontrols(control) {
        switch (control.attr('data-controltype')) {
            case "cslist":
                break;
            case "csmulti":
                break;
            case "address1":
                break;
            case "address2":
                break;
            case "address3":
                break;
            case "uploadfile":
                control.jqxFileUpload('destroy');
                break;
            case "downloadfile":
            case "linkbutton":
                control.jqxLinkButton('destroy');
                break;
            case "tabs":
                control.jqxTabs('destroy');
                break;
            case "groupbox":
                control.jqxExpander('destroy');
                break;
            case "number":
                control.jqxNumberInput('destroy');
                break;
            case "radio":
                control.jqxRadioButton('destroy');
                break;
            case "check":
                control.jqxCheckBox('destroy');
                break;
            case "memo":
                control.jqxTextArea('destroy');
                break;
            case "yyyy":
            case "yyyymm":
            case "date":
            case "datetime":
            case "datetime2":
            case "time":
                control.jqxDateTimeInput('destroy');
                break;
            case "password":
                control.jqxPasswordInput('destroy');
                break;
            default:
                control.jqxInput('destroy');
        }
    }
    function destroycontrolall(content) {
        var controls = content.find('[data-iscontrol="true"]');
        for (i = 0; i < controls.length; i++) {
            var control = $(controls[i]);
            destroycontrols(control);
        }
    }
    var dynamicConditionObj = (function (host, options) {
        this.host = $(host).prop('id');
        this.controls = this.host + '_ct';
        this.radios = this.host + '_r';
        this.options = options;
        this._paramHead = "dynamiccondition";
        this._htmlName = "dynamicCondition.js";
        this._riaclassname = "cablesoft.ria.dynamic.condition.web";
        this._serverDataUrl = "data.aspx";
        this._serverParamHead = "Parameters_";
    });
    dynamicConditionObj.prototype = {
        _host: function () {
            return $('#' + this.host);
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
                var loop = 100;
                var radios = $('#' + this.radios);
                if (radios.length > 0) {
                    for (var i = 0; i < loop; i++) {
                        var rid = this.radios + '_' + i;
                        if ($('#' + rid).length > 0) {
                            $('#' + rid).jqxRadioButton('destroy');
                        }
                        else {
                            break;
                        }
                    }
                    radios.remove();
                }
                destroycontrolall(this._host());
                $('#' + this.host).remove();
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
                var paramHead = this._paramHead;
                var htmlName = this._htmlName;
                var serverDataUrl = this._serverDataUrl;
                var serverParamHead = this._serverParamHead;
                var riaclassname = this._riaclassname;
                var intIndex;
                var myControls = [];

                var sysprogramid = sessionStorage.getItem(paramHead + "_sysprogramid");
                var programid = sessionStorage.getItem(paramHead + "_programid");
                var loginInfo = sessionStorage.getItem(paramHead + "_logininfo");
                var indata = sessionStorage.getItem(paramHead + "_indata");
                var gsettingdata = sessionStorage.getItem(paramHead + "_setttindata");
                var mycontrolid = this.controls;
                var myradioid = this.radios;
                ClearStorgeParameters(paramHead);

                var divName = this.host;
                var divObj = $('#' + divName);
                //document.getElementById("dynamiccondition").id = divName;
                try {
                    if (sysprogramid == null || sysprogramid == "") {
                        alert("no programid!!");
                        return;
                    }
                    if (gsettingdata != null && gsettingdata != undefined) {
                        Refresh(gsettingdata);
                    }
                    else {
                        GetSettingData(GetParems());
                    }
                }
                catch (err) {
                    ErrorHandle(htmlName, 'init', err);
                }

                function GetSettingData(params) {
                    try {
                        var sucessfunc = function (responsedata) {
                            if (responsedata == null || ShowRIAError(responsedata) == false) {
                                return;
                            }
                            var settingData = $.parseJSON(responsedata.ResultXML);
                            Refresh(settingData);
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
                        ErrorHandle(htmlName, "GetSettingData", err);
                    }
                }

                function GetParems() {
                    var params = {};
                    params[serverParamHead + "classname"] = riaclassname;
                    params[serverParamHead + "methodname"] = "getconditionfield";
                    params[serverParamHead + "loginInfo"] = loginInfo;
                    params[serverParamHead + "sysprogramid"] = sysprogramid;
                    params[serverParamHead + "programid"] = programid;
                    return params
                }
                function Refresh(settingData) {
                    var fieldtableName = Object.keys(settingData)[0];
                    var datafieldTable = settingData[fieldtableName];
                    //var UITable = $('<table class="datagrid-btable"></table>').appendTo($("#" + divName));
                    var UITable = $('<table style="width:100%;"></table>').appendTo($("#" + divName));
                    if (datafieldTable["CONDITIONTYPE"] == 0) {
                        CreateMultiConditionObj(UITable, settingData);
                    }
                    else {
                        CreateSingleConditionObj(UITable, settingData);
                    }
                }
                function GetSameRowData(fieldRow, fieldTable) {
                    try {
                        var values = {};
                        var totalwidth = null;
                        var totalheight = null;
                        var MaxRowPos = 0;
                        var MaxColumnPos = 0;
                        for (var i = 0; i < fieldTable.length; i++) {
                            if (fieldTable[i]["GroupBoxName".toUpperCase()] == fieldRow["GroupBoxName".toUpperCase()]) {
                                if (fieldTable[i]["RowPos".toUpperCase()] == fieldRow["RowPos".toUpperCase()]) {
                                    if (fieldRow["WidthType".toUpperCase()] = 1) {
                                        values["width"] = fieldRow["Width".toUpperCase()] + "px";
                                    }
                                    else {
                                        if (fieldTable[i]["WidthType".toUpperCase()] = 0) {
                                            //如果值為0則改成1
                                            var twidth = fieldTable[i]["Width".toUpperCase()];
                                            if (twidth == 0) { twidth = 1; }
                                            totalwidth += twidth;
                                        }
                                    }
                                    if (MaxColumnPos < fieldTable[i]["ColumnPos".toUpperCase()]) {
                                        MaxColumnPos = fieldTable[i]["ColumnPos".toUpperCase()];
                                    }
                                }
                                if (fieldTable[i]["ColumnPos".toUpperCase()] == fieldRow["ColumnPos".toUpperCase()]) {
                                    if (fieldRow["HeightType".toUpperCase()] = 1) {
                                        values["height"] = fieldRow["Height".toUpperCase()] + "px";
                                    }
                                    else {
                                        if (fieldTable[i]["HeightType".toUpperCase()] = 0) {
                                            //如果值為0則改成1
                                            var theight = fieldTable[i]["Height".toUpperCase()];
                                            if (theight == 0) { theight = 1; }
                                            totalheight += theight;
                                        }
                                    }
                                }
                                if (MaxRowPos < fieldTable[i]["RowPos".toUpperCase()]) {
                                    MaxRowPos = fieldTable[i]["RowPos".toUpperCase()];
                                }
                            }
                        }
                        values["maxrow"] = MaxRowPos;
                        values["maxcolumn"] = MaxColumnPos;
                        if (totalwidth != null) {
                            var twidth = fieldRow["Width".toUpperCase()];
                            if (twidth == 0) { twidth = 1; }
                            values["width"] = Math.round(theight / totalwidth * 100).toString() + "%";
                        }
                        if (totalheight != null) {
                            var theight = fieldRow["Height".toUpperCase()];
                            if (theight == 0) { theight = 1; }
                            values["height"] = Math.round(theight / totalwidth * 100).toString() + "%";
                        }
                        return values;
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "GetSameRowData", err);
                    }
                }

                //建立單選條件
                function CreateSingleConditionObj(UITable, settingData) {
                    try {
                        var fieldtableName = Object.keys(settingData)[0];
                        var datafieldTable = settingData[fieldtableName];
                        //var max = arr.get("quantity").max();
                        var ControlTable = $('<table style="width:100%;"></table>').appendTo(divObj);
                        var UIRows = {};
                        for (var i = 0; i < datafieldTable.length; i++) {
                            var fieldRow = datafieldTable[i];
                            if (fieldRow["OptionGroup".toUpperCase()] == null || fieldRow["OptionGroup".toUpperCase()] == undefined) {
                                var UIRow = UIRows[fieldRow["RowPos".toUpperCase()]];
                                var SameRowData = GetSameRowData(fieldRow, datafieldTable);
                                if (UIRow == undefined) {
                                    UIRow = $('<tr></tr>').appendTo(UITable);
                                    UIRows[fieldRow["RowPos".toUpperCase()]] = UIRow;
                                }
                                var columnPos = fieldRow["ColumnPos".toUpperCase()];
                                for (var j = UIRow.children('td').length; j <= columnPos; j++) {
                                    var td = $('<td></td>').appendTo(UIRow);
                                    td.css('width', Math.floor(100 / (SameRowData.maxcolumn + 1)) + '%');
                                }
                                var UICol = UIRow.children('td')[columnPos];
                                var radioName = myradioid + '_' + i.toString()
                                //<div style='margin-top: 10px;' id='jqxRadioButton'>12 Months Contract</div>
                                var radioObj = $('<div id="' + radioName + '">' + fieldRow["HEADNAME"] + '</div>').appendTo(UICol)
                                radioObj.jqxRadioButton();
                                $('#' + radioName).attr('data-controltype', 'radio');
                                
                                $("#" + radioName).on('checked', function (event) {
                                    destroycontrolall(ControlTable);
                                    ControlTable.children().remove();
                                    var fieldRow;
                                    var idsplit = $(this).attr('id').split('_');
                                    var idx = idsplit[idsplit.length - 1];
                                    fieldRow = datafieldTable[idx];
                                    setRadioColor(myradioid + '_' + idx.toString());
                                    //for (var i = 0; i < datafieldTable.length; i++) {
                                    //    var idsplit = $(this).attr('id').split('_');
                                    //    if (datafieldTable[i]["FIELDNAME"] == idsplit[idsplit.length - 1]) {
                                    //        fieldRow = datafieldTable[i];
                                    //        break;
                                    //    }
                                    //}
                                    
                                    switch (fieldRow["OBJECTTYPE"]) {
                                        case 0: //0=字串  
                                        case 26:    //26 = 加密TextEdit
                                        case 27:    //27 = 加密PasswordEdit
                                            _CreateInputObject(fieldRow, ControlTable, true);
                                            break;
                                        case 1: //1=數字
                                            _CreateNumberObject(fieldRow, ControlTable, true);
                                            break;
                                        case 2: //2=日期(yyyy/MM/dd) 
                                        case 3: //3=日期時間(yyyy/MM/dd HH:mm)
                                        case 17:    //17=日期時間(yyyy/MM/dd HH:mm:ss)
                                        case 23:    //23=日期(yyyy/MM)
                                        case 24:    //24=日期(yyyy)
                                            _CreateDateTimeObject(fieldRow, ControlTable, true);
                                            break;
                                        case 5: //5=多欄單選(List)  
                                            //CreateListObject(fieldRow, settingData, ControlTable, true);
                                            break;
                                        case 6: //6=多選(MultiSelect) 22=多選(有順序)
                                            //CreateMultiObject(fieldRow, settingData, ControlTable, true);
                                            break;
                                        case 7: //7=是否(CheckBox)
                                            _CreateCheckObject(fieldRow, ControlTable, true);
                                            break;
                                        case 8: //8=地址元件1
                                        case 9: //9=地址元件2
                                        case 10:    //10=地址元件3
                                            break;
                                        case 11:    //11=備註 16=說明
                                        case 16:
                                            _CreateMemoObject(fieldRow, ControlTable, true);
                                            break;
                                        case 12:    //12=GroupBox
                                        case 13:    //13=TabControl
                                        case 14:    //14=TabItem
                                            break;
                                        case 15:    //15=RadioButton
                                            _CreateRadioObject(fieldRow, ControlTable, true);
                                            break;
                                        case 18:    //18=上傳檔案(File)
                                        case 19:    //19=上傳檔案(DataTable)
                                        case 20:    //20=下載檔案
                                        case 21:    //21= HyperLink
                                            break;
                                        case 25:    //25=PasswordEdit
                                            _CreatePasswordObject(fieldRow, ControlTable, true);
                                        default:
                                            break;
                                    }
                                });
                                var DefFocus = fieldRow["DefFocus".toUpperCase()];
                                if (DefFocus != null && DefFocus != undefined) {
                                    if (DefFocus == 1) {
                                        $("#" + radioName).jqxRadioButton('check');
                                    }
                                }
                                function setRadioColor(radioName) {
                                    UITable.find('[data-controltype|="radio"]').css('color', '');
                                    var radio = $('#' + radioName);
                                    radio.css('color', 'red');
                                }
                            }
                            //myControls[fieldRow["FIELDNAME"]].addEventListener("select", radiofunc());
                        }
                        if (options != null && options['onLoadCompleted'] != null) {
                            var rValue = { myControls: myControls };
                            options['onLoadCompleted'](rValue);

                        }
                        divObj.attr('data-conditiontype', 'single');
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "CreateSingleConditionObj", err);
                    }
                }

                function CreateMultiConditionObj(UITable, settingData) {
                    try {
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "CreateMultiConditionObj", err);
                    }
                }
                function CreateHeadLabel(UICol, fieldRow, width) {
                    var objHead = $('<label class="jqx-widget-content">' + fieldRow["HEADNAME"] + '</label>').appendTo(UICol);

                    var MustBe = fieldRow["MustBe".toUpperCase()];
                    if (MustBe != null && MustBe != undefined) {
                        objHead.html(fieldRow["HEADNAME"] + "*");
                        objHead.css("color", "red");
                    }

                    var HeadForeground = fieldRow["HeadForeground".toUpperCase()];
                    if (HeadForeground != null && HeadForeground != undefined) {
                        objHead.css("color", GetColorValue(HeadForeground));
                    }
                    objHead.css("width", "100%");
                    UICol.css('width', width);
                }
                function GetFieldWidth(fieldRow, tableWidth, isSingle) {
                    var values = {};
                    //取得中文說明的寬度
                    var HEADNAME = fieldRow["HEADNAME"];
                    var tmptableWidth = tableWidth;
                    if (isSingle == true) { tmptableWidth = tableWidth / 2; }
                    values["headwidth"] = 80;
                    values["tildewidth"] = 20;
                    if (HEADNAME == null || HEADNAME == undefined) { values["headwidth"] = 0; }
                    else {
                        var Field1Width = fieldRow["Field1Width".toUpperCase()];
                        if (Field1Width != null && Field1Width != undefined) {
                            if (Field1Width > 0) { values["headwidth"] = Number(Field1Width); }
                        }
                    }
                    values["textwidth"] = textwidth(fieldRow, tmptableWidth, values, isSingle);
                    var Text1Width = fieldRow["Text1Width".toUpperCase()];
                    if (Text1Width != null && Text1Width != undefined) {
                        if (Text1Width > 0) { values["textwidth"] = Number(Text1Width); }
                    }
                    var Text2Width = fieldRow["Text2Width".toUpperCase()];
                    if (Text2Width != null && Text2Width != undefined) {
                        if (Text2Width > 0) { values["textwidth"] = values["textwidth"] + Number(Text1Width); }
                    }
                    return values;

                    function textwidth(fieldRow, tableWidth, values, isSingle) {
                        var RangeFlag = fieldRow["RangeFlag".toUpperCase()];
                        if (RangeFlag == 1) {
                            return (tableWidth - values["headwidth"] - values["tildewidth"]) / 2;
                        }
                        else { return (tableWidth - values["headwidth"] - values["tildewidth"]); }
                    }
                }
                function addTableColumns(fieldRow, ControlTable, onlyone) {
                    var UIRow = $('<tr></tr>').appendTo(ControlTable);
                    var UICols = [];
                    var colCounts = 2;
                    var width = 50;
                    if (fieldRow["RangeFlag".toUpperCase()] == 1) { width = 80; }
                    if (onlyone == true) { colCounts = 1; }
                    for (var i = 0; i < colCounts; i++) {
                        UICols.push($('<td></td>').appendTo(UIRow));
                    }
                    return UICols;
                }
                function putAttribute(control, options, controltype) {
                    control.attr('data-options', JSON.stringify(options));
                    control.attr('data-controltype', controltype);
                    control.attr('data-iscontrol', true);
                }
                function _CreateInputObject(fieldRow, ControlTable, isSingle) {
                    try {
                        //建立Table Columns
                        var UICols = addTableColumns(fieldRow, ControlTable);
                        var controlWidths = GetFieldWidth(fieldRow, ControlTable.width(), isSingle);
                        //建立欄位說明中文名稱
                        CreateHeadLabel(UICols[0], fieldRow, controlWidths["headwidth"]);
                        var lCounts = 1;
                        if (fieldRow["RangeFlag".toUpperCase()] == 1) { lCounts = 2; }
                        var firstControl;
                        for (var i = 1; i <= lCounts; i++) {
                            if (i == 2) {
                                $('<label style="width:' + controlWidths["tildewidth"] + 'px;">&nbsp~&nbsp</label>').appendTo(UICols[1]);
                            }
                            //建立元件
                            firstControl = makeControl(UICols[1], fieldRow, controlWidths, i, firstControl);
                        }
                        function makeControl(UICol, fieldRow, controlWidths, idx, firstControl) {
                            try {
                                var placeholder = null;
                                var objHeadName = mycontrolid + '_' + fieldRow["FIELDNAME"];
                                $('<input type="text" id="' + objHeadName + '"></input>').appendTo(UICol);
                                var inputOptions = { width: (controlWidths["textwidth"] - 10), height: 22 };
                                var DataLength = fieldRow["DataLength".toUpperCase()];
                                if (DataLength != null && DataLength != undefined) {
                                    inputOptions["maxLength"] = DataLength.split(',')[0];
                                }
                                $('#' + objHeadName).jqxInput(inputOptions);
                                var objControl = $('#' + objHeadName);

                                var options = { field: fieldRow["FIELDNAME"], title: fieldRow["HEADNAME"], objecttype: fieldRow["OBJECTTYPE"] };
                                if (idx == 2) {
                                    firstControl.change(function () {
                                        objControl.val(firstControl.val());
                                    });
                                }
                                if (fieldRow["RangeFlag".toUpperCase()] == 1) {
                                    objControl.attr('id', objHeadName + '_' + idx.toString());
                                    UICol.css('width', (controlWidths["textwidth"] * 2 + controlWidths["tildewidth"]));
                                }
                                else {
                                    objControl.attr('id', objHeadName + '_0');
                                    UICol.css('width', (controlWidths["textwidth"] + controlWidths["tildewidth"]));
                                }

                                var TextForeground = fieldRow["TextForeground".toUpperCase()];
                                if (TextForeground != null && TextForeground != undefined) {
                                    objControl.css("color", GetColorValue(TextForeground));
                                }

                                var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                                if (ReadOnly != null && ReadOnly != undefined && ReadOnly == 1) {
                                    objControl.attr("readonly", true);
                                }
                                putAttribute(objControl, options, 'input');
                                return objControl;
                            }
                            catch (err) {
                                ErrorHandle(htmlName, "makeControl", err);
                            }
                        }
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_CreateInputObject", err);
                    }
                }
                function _CreateNumberObject(fieldRow, ControlTable, isSingle) {
                    try {

                        //建立Table Columns
                        var UICols = addTableColumns(fieldRow, ControlTable);
                        var controlWidths = GetFieldWidth(fieldRow, ControlTable.width(), isSingle);
                        //建立欄位說明中文名稱
                        CreateHeadLabel(UICols[0], fieldRow, controlWidths["headwidth"]);

                        var lCounts = 1;
                        if (fieldRow["RangeFlag".toUpperCase()] == 1) { lCounts = 2; }
                        var firstControl;
                        for (var i = 1; i <= lCounts; i++) {
                            if (i == 2) {
                                $('<div style="width:' + controlWidths["tildewidth"] + 'px;float:left;">&nbsp~&nbsp</div>').appendTo(UICols[1]);
                            }
                            //建立元件
                            firstControl = makeControl(UICols[1], fieldRow, controlWidths, i, firstControl);
                        }
                        function makeControl(UICol, fieldRow, controlWidths, idx, firstControl) {
                            try {

                                var placeholder = null;
                                var objHeadName = mycontrolid + '_' + fieldRow["FIELDNAME"];
                                $('<div id="' + objHeadName + '"></div>').appendTo(UICol);
                                var inputOptions = {
                                    width: (controlWidths["textwidth"] - 10),
                                    height: 22,
                                    promptChar: " ",
                                    digits: 20,
                                    decimalDigits: 0,
                                    inputMode: 'simple'
                                };
                                var DataLength = fieldRow["DataLength".toUpperCase()];
                                if (DataLength != null && DataLength != undefined) {
                                    inputOptions["digits"] = DataLength.split(',')[0];
                                    if (DataLength.length > 1) {
                                        inputOptions["decimalDigits"] = DataLength.split(',')[0];
                                    }
                                    else {
                                        inputOptions["decimalDigits"] = 0;
                                    }
                                }
                                $('#' + objHeadName).jqxNumberInput(inputOptions);
                                var objControl = $('#' + objHeadName);
                                objControl.css('float', 'left');
                                var options = { field: fieldRow["FIELDNAME"], title: fieldRow["HEADNAME"], objecttype: fieldRow["OBJECTTYPE"] };
                                if (idx == 2) {
                                    firstControl.change(function () {
                                        objControl.val(firstControl.val());
                                    });
                                }
                                if (fieldRow["RangeFlag".toUpperCase()] == 1) {
                                    objControl.attr('id', objHeadName + '_' + idx.toString());
                                    UICol.css('width', (controlWidths["textwidth"] * 2 + controlWidths["tildewidth"]));
                                }
                                else {
                                    objControl.attr('id', objHeadName + '_0');
                                    UICol.css('width', (controlWidths["textwidth"] + controlWidths["tildewidth"]));
                                }
                                var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                                if (ReadOnly != null && ReadOnly != undefined && ReadOnly == 1) {
                                    objControl.attr("readonly", true);
                                }

                                var TextForeground = fieldRow["TextForeground".toUpperCase()];
                                if (TextForeground != null && TextForeground != undefined) {
                                    objControl.css("color", GetColorValue(TextForeground));
                                }
                                putAttribute(objControl, options, 'number');
                                return objControl;
                            }
                            catch (err) {
                                ErrorHandle(htmlName, "makeControl", err);
                            }
                        }
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_CreateNumberObject", err);
                    }
                }
                function _CreateRadioObject(fieldRow, ControlTable, isSingle) {
                    try {
                        //建立Table Columns
                        var UICols = addTableColumns(fieldRow, ControlTable, true);
                        var controlWidths = GetFieldWidth(fieldRow, ControlTable.width(), isSingle);
                        //建立欄位說明中文名稱
                        //15=RadioButton
                        makeControl(UICols[0], fieldRow, controlWidths);
                        function makeControl(UICol, fieldRow, controlWidths) {
                            try {
                                var objHeadName = mycontrolid + '_' + fieldRow["FIELDNAME"] + '_0';
                                $('<div id="' + objHeadName + '">' + fieldRow["HEADNAME"] + '</div>').appendTo(UICol);
                                var inputOptions = { height: 22 };
                                var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                                if (ReadOnly != null && ReadOnly != undefined && ReadOnly == 1) {
                                    inputOptions['disabled'] = true;
                                }
                                $('#' + objHeadName).jqxRadioButton(inputOptions);
                                var objControl = $('#' + objHeadName);
                                var options = { field: fieldRow["FIELDNAME"], title: fieldRow["HEADNAME"], objecttype: fieldRow["OBJECTTYPE"] };

                                var MustBe = fieldRow["MustBe".toUpperCase()];
                                if (MustBe != null && MustBe != undefined && MustBe == 1) {
                                    objControl.css("color", 'red');
                                }

                                var TextForeground = fieldRow["TextForeground".toUpperCase()];
                                if (TextForeground != null && TextForeground != undefined) {
                                    objControl.css("color", GetColorValue(TextForeground));
                                }

                                putAttribute(objControl, options, 'radio');
                                return objControl;
                            }
                            catch (err) {
                                ErrorHandle(htmlName, "makeControl", err);
                            }
                        }
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_CreateRadioObject", err);
                    }
                }
                function _CreateCheckObject(fieldRow, ControlTable, isSingle) {
                    try {
                        //建立Table Columns
                        var UICols = addTableColumns(fieldRow, ControlTable, true);
                        var controlWidths = GetFieldWidth(fieldRow, ControlTable.width(), isSingle);
                        //建立欄位說明中文名稱
                        //15=RadioButton
                        makeControl(UICols[0], fieldRow, controlWidths);
                        function makeControl(UICol, fieldRow, controlWidths) {
                            try {
                                var objHeadName = mycontrolid + '_' + fieldRow["FIELDNAME"] + '_0';
                                $('<div id="' + objHeadName + '">' + fieldRow["HEADNAME"] + '</div>').appendTo(UICol);
                                var inputOptions = { height: 22 };
                                var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                                if (ReadOnly != null && ReadOnly != undefined && ReadOnly == 1) {
                                    inputOptions['disabled'] = true;
                                }
                                $('#' + objHeadName).jqxCheckBox(inputOptions);
                                var objControl = $('#' + objHeadName);
                                var options = { field: fieldRow["FIELDNAME"], title: fieldRow["HEADNAME"], objecttype: fieldRow["OBJECTTYPE"] };

                                var MustBe = fieldRow["MustBe".toUpperCase()];
                                if (MustBe != null && MustBe != undefined && MustBe == 1) {
                                    objControl.css("color", 'red');
                                }

                                var TextForeground = fieldRow["TextForeground".toUpperCase()];
                                if (TextForeground != null && TextForeground != undefined) {
                                    objControl.css("color", GetColorValue(TextForeground));
                                }
                                putAttribute(objControl, options, 'check');
                                return objControl;
                            }
                            catch (err) {
                                ErrorHandle(htmlName, "makeControl", err);
                            }
                        }
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_CreateCheckObject", err);
                    }
                }
                function _CreateDateTimeObject(fieldRow, ControlTable, isSingle) {
                    try {
                        //建立Table Columns
                        var UICols = addTableColumns(fieldRow, ControlTable);
                        var controlWidths = GetFieldWidth(fieldRow, ControlTable.width(), isSingle);
                        //建立欄位說明中文名稱
                        CreateHeadLabel(UICols[0], fieldRow, controlWidths["headwidth"]);
                        var lCounts = 1;
                        if (fieldRow["RangeFlag".toUpperCase()] == 1) { lCounts = 2; }
                        var firstControl;
                        for (var i = 1; i <= lCounts; i++) {
                            if (i == 2) {
                                $('<div style="width:' + controlWidths["tildewidth"] + 'px;float:left;">&nbsp~&nbsp</div>').appendTo(UICols[1]);
                            }
                            //建立元件
                            firstControl = makeControl(UICols[1], fieldRow, controlWidths, i, firstControl);
                        }
                        function makeControl(UICol, fieldRow, controlWidths, idx, firstControl) {
                            try {
                                var placeholder = null;
                                var objHeadName = mycontrolid + '_' + fieldRow["FIELDNAME"];
                                $('<div id="' + objHeadName + '"></div>').appendTo(UICol);
                                var inputOptions = {
                                    width: (controlWidths["textwidth"] - 10) + 'px',
                                    showCalendarButton: false,
                                    height: '22px'
                                };
                                var options = { field: fieldRow["FIELDNAME"], title: fieldRow["HEADNAME"], objecttype: fieldRow["OBJECTTYPE"], mask: fieldRow["DateMask".toUpperCase()] };
                                var controltype;
                                switch (fieldRow["OBJECTTYPE"]) {
                                    case 3: //3=日期時間(yyyy/MM/dd HH:mm)
                                        controltype = 'datetime';
                                        inputOptions['formatString'] = "yyyy/MM/dd HH:mm";
                                        break;
                                    case 17:    //17=日期時間(yyyy/MM/dd HH:mm:ss)
                                        controltype = 'datetime2';
                                        inputOptions['formatString'] = "yyyy/MM/dd HH:mm:ss";
                                        break;
                                    case 23:    //23=日期(yyyy/MM)
                                        controltype = 'yyyymm';
                                        inputOptions['formatString'] = "yyyy/MM";
                                        break;
                                    case 24:    //24=日期(yyyy)
                                        controltype = 'yyyy';
                                        inputOptions['formatString'] = "yyyy";
                                        break;
                                    case 2: //2=日期(yyyy/MM/dd) 
                                    default:
                                        controltype = 'date';
                                        inputOptions['formatString'] = "yyyy/MM/dd";
                                        break;
                                }
                                $('#' + objHeadName).jqxDateTimeInput(inputOptions);
                                var objControl = $('#' + objHeadName);
                                objControl.css('float', 'left');
                                if (idx == 2) {
                                    firstControl.change(function () {
                                        objControl.val(firstControl.val());
                                    });
                                }
                                if (fieldRow["RangeFlag".toUpperCase()] == 1) {
                                    objControl.attr('id', objHeadName + '_' + idx.toString());
                                    UICol.css('width', (controlWidths["textwidth"] * 2 + controlWidths["tildewidth"]));
                                }
                                else {
                                    objControl.attr('id', objHeadName + '_0');
                                    UICol.css('width', (controlWidths["textwidth"] + controlWidths["tildewidth"]));
                                }
                                var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                                if (ReadOnly != null && ReadOnly != undefined && ReadOnly == 1) {
                                    objControl.attr("readonly", true);
                                }

                                var TextForeground = fieldRow["TextForeground".toUpperCase()];
                                if (TextForeground != null && TextForeground != undefined) {
                                    objControl.css("color", GetColorValue(TextForeground));
                                }
                                putAttribute(objControl, options, controltype);
                                return objControl;
                            }
                            catch (err) {
                                ErrorHandle(htmlName, "makeControl", err);
                            }
                        }
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_CreateDateTimeObject", err);
                    }
                }
                function _CreateMemoObject(fieldRow, ControlTable, isSingle) {
                    try {
                        //建立Table Columns
                        var UICols = addTableColumns(fieldRow, ControlTable, (fieldRow["OBJECTTYPE"] == 16));
                        var controlWidths = GetFieldWidth(fieldRow, ControlTable.width(), isSingle);
                        //建立欄位說明中文名稱
                        //11=備註 16=說明
                        if (fieldRow["OBJECTTYPE"] == 11) {
                            CreateHeadLabel(UICols[0], fieldRow, controlWidths["headwidth"]);
                            makeControl(UICols[1], fieldRow, controlWidths);
                        }
                        else {
                            makeControl(UICols[0], fieldRow, controlWidths);
                        }
                        function makeControl(UICol, fieldRow, controlWidths) {
                            try {
                                var placeholder = null;
                                var objHeadName = mycontrolid + '_' + fieldRow["FIELDNAME"] + '_0';
                                $('<textarea id="' + objHeadName + '"></textarea>').appendTo(UICol);
                                var inputOptions = { height: 50 };
                                var DataLength = fieldRow["DataLength".toUpperCase()];
                                if (DataLength != null && DataLength != undefined) {
                                    inputOptions["maxLength"] = DataLength.split(',')[0];
                                }
                                $('#' + objHeadName).jqxTextArea(inputOptions);
                                var objControl = $('#' + objHeadName);
                                var options = { field: fieldRow["FIELDNAME"], title: fieldRow["HEADNAME"], objecttype: fieldRow["OBJECTTYPE"] };

                                var TextForeground = fieldRow["TextForeground".toUpperCase()];
                                if (TextForeground != null && TextForeground != undefined) {
                                    objControl.css("color", GetColorValue(TextForeground));
                                }
                                var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                                if ((ReadOnly != null && ReadOnly != undefined && ReadOnly == 1) || (fieldRow["OBJECTTYPE"] == 16)) {
                                    objControl.attr("readonly", true);
                                }
                                putAttribute(objControl, options, 'memo');
                                return objControl;
                            }
                            catch (err) {
                                ErrorHandle(htmlName, "makeControl", err);
                            }
                        }
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_CreateMemoObject", err);
                    }
                }
                function _CreatePasswordObject(fieldRow, ControlTable, isSingle) {
                    try {
                        //建立Table Columns
                        var UICols = addTableColumns(fieldRow, ControlTable);
                        var controlWidths = GetFieldWidth(fieldRow, ControlTable.width(), isSingle);
                        //建立欄位說明中文名稱
                        CreateHeadLabel(UICols[0], fieldRow, controlWidths["headwidth"]);
                        var lCounts = 1;
                        if (fieldRow["RangeFlag".toUpperCase()] == 1) { lCounts = 2; }
                        var firstControl;
                        for (var i = 1; i <= lCounts; i++) {
                            if (i == 2) {
                                $('<label style="width:' + controlWidths["tildewidth"] + 'px">&nbsp~&nbsp</label>').appendTo(UICols[1]);
                            }
                            //建立元件
                            firstControl = makeControl(UICols[1], fieldRow, controlWidths, i, firstControl);
                        }
                        function makeControl(UICol, fieldRow, controlWidths, idx, firstControl) {
                            try {
                                var placeholder = null;
                                var objHeadName = mycontrolid + '_' + fieldRow["FIELDNAME"];
                                $('<input type="password" id="' + objHeadName + '"/>').appendTo(UICol);
                                var inputOptions = {
                                    width: (controlWidths["textwidth"] - 10),
                                    height: 22
                                };
                                var options = { field: fieldRow["FIELDNAME"], title: fieldRow["HEADNAME"], objecttype: fieldRow["OBJECTTYPE"] };
                                var controltype;
                                
                                $('#' + objHeadName).jqxPasswordInput(inputOptions);
                                var objControl = $('#' + objHeadName);
                                if (idx == 2) {
                                    firstControl.change(function () {
                                        objControl.val(firstControl.val());
                                    });
                                }
                                if (fieldRow["RangeFlag".toUpperCase()] == 1) {
                                    objControl.attr('id', objHeadName + '_' + idx.toString());
                                    UICol.css('width', (controlWidths["textwidth"] * 2 + controlWidths["tildewidth"]));
                                }
                                else {
                                    objControl.attr('id', objHeadName + '_0');
                                    UICol.css('width', (controlWidths["textwidth"] + controlWidths["tildewidth"]));
                                }
                                var ReadOnly = fieldRow["ReadOnly".toUpperCase()];
                                if (ReadOnly != null && ReadOnly != undefined && ReadOnly == 1) {
                                    objControl.attr("readonly", true);
                                }

                                var TextForeground = fieldRow["TextForeground".toUpperCase()];
                                if (TextForeground != null && TextForeground != undefined) {
                                    objControl.css("color", GetColorValue(TextForeground));
                                }
                                putAttribute(objControl, options, 'password');
                                return objControl;
                            }
                            catch (err) {
                                ErrorHandle(htmlName, "makeControl", err);
                            }
                        }
                    }
                    catch (err) {
                        ErrorHandle(htmlName, "_CreatePasswordObject", err);
                    }
                }
                function getSchemaTable(tablename, settingData) {
                    return settingData['SCHEMATABLE_' + tablename.toUpperCase()];
                }
                function CreateListObject(fieldRow, settingData, ControlTable, isSingle) {
                    //建立Table Columns
                    var UICols = addTableColumns(fieldRow, ControlTable);
                    var controlWidths = GetFieldWidth(fieldRow, ControlTable.width(), isSingle);
                    //建立欄位說明中文名稱
                    CreateHeadLabel(UICols[0], fieldRow, controlWidths["headwidth"]);
                    var lCounts = 1;
                    if (fieldRow["RangeFlag".toUpperCase()] == 1) { lCounts = 2; }
                    var firstControl;
                    for (var i = 1; i <= lCounts; i++) {
                        if (i == 2) {
                            $('<label style="width:' + controlWidths["tildewidth"] + 'px;">&nbsp~&nbsp</label>').appendTo(UICols[1]);
                        }
                        //建立元件
                        firstControl = makeControl(UICols[1], fieldRow, settingData[fieldRow["FIELDNAME"].toUpperCase()], controlWidths, i, firstControl);
                    }
                    function makeControl(UICol, fieldRow, data, controlWidths, idx, firstControl) {
                        try {
                            var placeholder = null;
                            var objHeadName = divName + '_obj_' + fieldRow["FIELDNAME"];
                            var id;
                            if (fieldRow["RangeFlag".toUpperCase()] == 1) {
                                id = objHeadName + '_' + idx.toString();
                            }
                            else {
                                id = objHeadName + '_0';
                            }
                            var objCode = $('<input id="' + id + '" style="width:' + (controlWidths["textwidth"] - 10) + 'px;height:20px;"></input>').appendTo(UICol);
                            var schemaTable = getSchemaTable(fieldRow['FIELDNAME'], settingData);
                            var options = { data: data, codefield: schemaTable[0]['C'], descfield: schemaTable[1]['C'] };
                            var objControl = objCode.csList('init', options);

                            if (idx == 2) {
                                firstControl.change(function () {
                                    objControl.val(firstControl.val());
                                });
                            }
                            if (fieldRow["RangeFlag".toUpperCase()] == 1) {
                                UICol.attr('style', 'width:' + (controlWidths["textwidth"] * 2 + controlWidths["tildewidth"]) + 'px');
                            }
                            else {
                                UICol.attr('style', 'width:' + (controlWidths["textwidth"] + controlWidths["tildewidth"]) + 'px');
                            }
                            objControl.attr('title', fieldRow["HEADNAME"]);
                            objControl.attr('objecttype', fieldRow["OBJECTTYPE"]);
                            if (placeholder != null) {
                                objControl.attr("placeholder", placeholder);
                            }
                            var DataLength = fieldRow["DataLength".toUpperCase()];
                            if (DataLength != null && DataLength != undefined) {
                                objControl.attr("maxlength", DataLength.split(',')[0]);
                            }
                            var TextForeground = fieldRow["TextForeground".toUpperCase()];
                            if (TextForeground != null && TextForeground != undefined) {
                                objControl.attr("style", "color:" + GetColorValue(TextForeground) & ";");
                            }
                            myControls[objControl.attr('id')] = objControl;
                            return objControl;
                        }
                        catch (err) {
                            ErrorHandle(htmlName, "makeControl", err);
                        }
                    }
                }
                function CreateMultiObject(fieldRow, settingData, ControlTable, isSingle) {
                    //建立Table Columns
                    var UICols = addTableColumns(fieldRow, ControlTable, true);
                    var controlWidths = GetFieldWidth(fieldRow, ControlTable.width(), isSingle);
                    //建立欄位說明中文名稱
                    //CreateHeadLabel(UICols[0], fieldRow, controlWidths["headwidth"]);
                    //建立元件
                    var objHeadName = divName + '_obj_' + fieldRow["FIELDNAME"];
                    var objDesc = $('<input id="' + objHeadName + '_0" style="width:' + UICols[0].width() + 'px;height:20px;"></input>').appendTo(UICols[0]);
                    var schemaTable = getSchemaTable(fieldRow['FIELDNAME'], settingData);
                    var data = settingData[fieldRow["FIELDNAME"].toUpperCase()];
                    var options = {
                        data: data, buttoncaption: fieldRow["HEADNAME"],
                        buttonwidth: controlWidths["headwidth"],
                        codefield: schemaTable[0]['C'], descfield: schemaTable[1]['C']
                    };
                    var objControl = objDesc.csMultiSelect('init', options);

                    objControl.attr('title', fieldRow["HEADNAME"]);
                    objControl.attr('objecttype', fieldRow["OBJECTTYPE"]);

                    myControls[objControl.attr('id')] = objControl;
                }
                function GetColorValue(value) {
                    var valuesplit = value.split('#');
                    var x = "";
                    return '#' + valuesplit[1].substring(2);
                }
            }
            catch (err) {
                ErrorHandle(htmlName, '_refresh', err);
            }
        },
        getControls: function () {
            var allControls = [];
            var controls = this._host().find('[data-iscontrol="true"]');
            for (i = 0; i < controls.length; i++) {
                var control = $(controls[i]);
                allControls.push(control);
            }
            return allControls;
        },
        getQueryData: function () {
            var queryDatas = { CONDITION: [] };
            var controls = this.getControls();
            for (i = 0; i < controls.length; i++) {
                var control = $(controls[i]);
                var data = JSON.parse(control.attr('data-options'));
                var id = control.prop('id');
                var row = { "FIELDNAME": data.field + id.substr(id.length - 2), "HEADNAME": data.title, "OBJECTTYPE": data.objecttype };
                var controlType = control.attr('data-controltype');
                switch (controlType) {
                    case "cslist":
                        break;
                    case "csmulti":
                        break;
                    case "address1":
                        break;
                    case "address2":
                        break;
                    case "address3":
                        break;
                    case "uploadfile":
                        break;
                    case "downloadfile":
                        break;
                    case "linkbutton":
                        break;
                    case "tabs":
                        break;
                    case "groupbox":
                        break;
                    case "yyyy":
                    case "yyyymm":
                    case "date":
                    case "datetime":
                    case "datetime2":
                    case "time":
                    case "time2":
                        var mask = (data["mask"] == 1);
                        row["FieldValue".toUpperCase()] = formatDateTime(control.val(), controlType, mask);
                        row["FieldDesc".toUpperCase()] = row["FieldValue".toUpperCase()];
                        queryDatas.CONDITION.push(row);
                        break;
                    case "radio":
                    case "check":
                        if (control.val() == true) {
                            row["FieldValue".toUpperCase()] = 1;
                        }
                        else { 
                            row["FieldValue".toUpperCase()] = 0;
                        }
                        row["FieldDesc".toUpperCase()] = row["FieldValue".toUpperCase()];
                        queryDatas.CONDITION.push(row);
                        break;
                    case "password":
                    case "number":
                    case "memo":
                    default:
                        row["FieldValue".toUpperCase()] = control.val();
                        row["FieldDesc".toUpperCase()] = row["FieldValue".toUpperCase()];
                        queryDatas["CONDITION"].push(row);
                        break;
                }
            }
            return queryDatas;
        }
    };

    $.fn.DynamicCondition = function (method, options) {
        try {
            var instance = $.data(this, "DynamicGrid");
            if (instance == null) {
                instance = new dynamicConditionObj(this, options);
                $.data(this, "DynamicGrid", instance);
            }
            var mothods = dynamicConditionObj.prototype;
            if (mothods[method]) {
                var domethod = mothods[method];
                var ret = domethod.apply(instance, Array.prototype.slice.call(arguments, 1));
                return ret

            } else {
                alert('Method ' + method + ' does not exist on jQuery.dynamicConditionObj');
            }
        }
        catch (err) {
            ErrorHandle(htmlName, 'document_Ready', err);
        }
    }

})(jQuery);