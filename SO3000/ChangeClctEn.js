(function ($) {
    var formName = 'ChangeClctEn';
    var riadllName = 'CableSoft.SO.RIA.Billing.ChangeClctEn.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Billing.ChangeClctEn.Web.ChangeClctEn';
    var copyLoginInfo = {};
    var scVbar = null;
    var scHbar = null;
    
    
    var defaults = (function () {
        this.language = {};
        this.initData = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.parameters = {};
        this.refNo = 0;
        this.controls = [];
        this.theme = '';        
        this.isSaved = false;
        this.container = null;
        this.localization = {};
        this.level = 3;
        this.grdFindData = {};
        this.gridColumns;
        this.ModifyData = {};
        this.dsPara = {};
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
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        resize: function (jq) {
            return jq.each(function () {
                formResize(this);
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
        },
        canView: function (jq, params, param2) {
            return param2([true, null]);
        },
        canAppend: function (jq, params, param2) {
            return param2([true, null]);
        },
        canEdit: function (jq, params, param2) {
            return param2([true, null]);
        },
        canDelete: function (jq, params, param2) {
            return param2([true, null]);
        },
        canPrint: function (jq, params, param2) {
            return param2([true, null]);
        }
    };
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
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
                try {
                    var state = $.data(this, formName);
                    if (state) {
                        $.extend(state.options, options);
                    }
                    else {
                        $.data(this, formName, {
                            options: $.extend({}, new defaults(), new ChangeClctEn(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.ChangeClctEn_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.ChangeClctEn', err);
        }
    };
    function clearControl(div) {
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'csGrid').jqxGrid('clear');
        $(headerId + 'txtClctDate1').csDateTime('setText', null);
        $(headerId + 'txtClctDate2').csDateTime('setText', null);
        $(headerId + 'txtCreateTime1').csDateTime('setText', null);
        $(headerId + 'txtCreateTime2').csDateTime('setText', null);
        $(headerId + 'txtBillNo1').jqxInput('val', null);
        $(headerId + 'txtBillNo2').jqxInput('val', null);
        $(headerId + 'txtCustid').jqxInput('val', null);
        $(headerId + 'cbGroupKind').jqxDropDownList({ selectedIndex: 0 });
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = '#' + $(div).attr('id');
        try {
            //-----------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + 'gilCompCode').csList({
                source: null,
                codeNoWidth: 60,
                width: '250px',
                height: '22px',
                showColumnHeaders: false,
                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false,
                columns: [
                       { text: 'CODENO', datafield: 'CODENO' },
                       { text: 'DESCRIPTION', datafield: 'DESCRIPTION' }
                ]
            });
            controls.push({ name: $(div).prop('id') + 'gilCompCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------------------------
            //-----------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + 'cbGroupKind').jqxDropDownList({
                width: '250px',
                height: 22,
                placeHolder: ""
            });
            controls.push({ name: $(div).prop('id') + 'cbGroupKind', type: 'jqxDropDownList', level: 2 });
            //-----------------------------------------------------------------------------------------------
            //-----------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + 'txtClctDate1').csDateTime({
                formatString: 'yyyy/MM',
                value: null,
                showCalendarButton: false,
                width: '95%'
            });
            controls.push({ name: $(div).prop('id') + 'txtClctDate1', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------------------------
            //-----------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + 'txtClctDate2').csDateTime({
                formatString: 'yyyy/MM',
                value: null,
                showCalendarButton: false,
                width: '95%'
            });
            controls.push({ name: $(div).prop('id') + 'txtClctDate2', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------------------------
            //-----------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') +'txtCreateTime1').csDateTime({
                formatString: 'yyyy/MM/dd HH:mm',
                value: null,
                showCalendarButton: false,
                width: '97%'
            });
            controls.push({ name: $(div).prop('id') + 'txtCreateTime1', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------------------------
            //-----------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id')+ 'txtCreateTime2').csDateTime({
                formatString: 'yyyy/MM/dd HH:mm',
                value: null,
                showCalendarButton: false,
                width: '97%'
            });
            controls.push({ name: $(div).prop('id') + 'txtCreateTime2', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------------------------
            //-----------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + 'txtBillNo1').jqxInput({
                height: 22,
                width: '100%',
            });
            controls.push({ name: $(div).prop('id') + 'txtBillNo1', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------------------------
            //-----------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + "txtBillNo2").jqxInput({
                height: 22,
                width: '100%',
            });
            controls.push({ name: $(div).prop('id') + 'txtBillNo2', type: 'jqxInput', level: 2 });
            //--------------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + 'txtCustid').jqxInput({
                height: 22,
                width: '100%'
            });
            controls.push({ name: $(div).prop('id') + 'txtCustid', type: 'jqxInput', level: 2 });
            //--------------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------------
           
            $('#' + $(div).prop('id') + 'btnFind').jqxButton($.extend({}, imagePosition, {
                width: 100,
                height: 25,
                imgSrc: imageScr.query.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnFind', type: 'jqxButton', level: 2 });
            $(headerId + 'btnFind > img').css('top', '2px');
            //--------------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 100,
                height: 25,
                imgSrc: imageScr.ok.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnOK', type: 'jqxButton', level: 2 });
            $(headerId + 'btnOK > img').css('top', '2px');
            //--------------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') +'csmStrtCode').csMulti({
                buttonText: lang.csmStrtCode,
                width: 400,
                buttonWidth: 80,
                //widthDesc: 150, 
               // winWidth: 800,
               // winHeight: 500,
                isReadOnly: false,
                columns: [
                    { text: lang.CommonCodeNo, datafield: 'CODENO' ,width:100},
                    { text: lang.CommonDescription, datafield: 'DESCRIPTION',width:180 }
                ]
            });
            controls.push({ name: $(div).prop('id') + 'csmStrtCode', type: 'csMulti', level: 2 });
            //--------------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + 'csmClctEn').csMulti({

                buttonText: lang.csmClctEn,
                width: 400,
                buttonWidth: 80,
                //widthDesc: 150, 
                //winWidth: 800,
                //winHeight: 500,
                isReadOnly: false,
                
                columns: [
                   { text: lang.CommonCodeNo, datafield: 'CODENO' },
                   { text: lang.CommonDescription, datafield: 'DESCRIPTION' ,width:200}
                ] 
            });
            controls.push({ name: $(div).prop('id') + 'csmClctEn', type: 'csMulti', level: 2 });
            //--------------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + 'csmServiceType').csMulti({

                buttonText: lang.ServiceType,
                width: 400,
                buttonWidth: 80,
                //widthDesc: 150, 
                //winWidth: 800,
                //winHeight: 500,
                isReadOnly: false,
                columns: [
                   { text: lang.CommonCodeNo, datafield: 'CODENO', width: 50 },
                   { text: lang.CommonDescription, datafield: 'DESCRIPTION', width: 100 }
                ]
            });
            controls.push({ name: $(div).prop('id') + 'csmServiceType', type: 'csMulti', level: 2 });
            //--------------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + 'csmMduId').csMulti({

                buttonText: lang.MduIdButton,
                width: 400,
                buttonWidth: 80,
                //widthDesc: 150, 
                //winWidth: 800,
                //winHeight: 500,
                isReadOnly: false,
                columns: [
                   { text: lang.CommonCodeNo, datafield: 'CODENO', width: 80 },
                   { text: lang.CommonDescription, datafield: 'DESCRIPTION', width: 210 }
                ]
            });
            controls.push({ name: $(div).prop('id') + 'csmMduId', type: 'csMulti', level: 2 });
            //--------------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------------
            options.gridColumns = [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 50,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                        }
                    },
                    { text: lang.CLCTEN, datafield: 'CLCTEN', width: 110, editable: false, groupable: false },
                    { text: lang.CLCTNAME, datafield: 'CLCTNAME', width: 110, editable: false, groupable: false },
                    { text: lang.GROUPCODE, datafield: 'GROUPCODE', width: 80, editable: false, groupable: false },
                    { text: lang.GROUPNAME, datafield: 'GROUPNAME', width: 200, editable: false, groupable: false },
                    { text: lang.COUNT, datafield: 'COUNT', width: 50, editable: false, groupable: false, cellsalign: 'center', align: 'center' },
                    { text: lang.NEWCLCTEN, datafield: 'NEWCLCTEN', width: 110, editable: false, groupable: false },
                    { text: lang.NEWCLCTNAME, datafield: 'NEWCLCTNAME', width: 130, editable: false, groupable: false },
                
            ]
            
            $('#' + $(div).prop('id') + 'csGrid').jqxGrid({
                width: '99.7%',
                height: '98%',
                //source: dataAdapter1,
                editable:false,
                sortable: false,
                altrows: true,
                columnsresize: true,
                columns: options.gridColumns,
                localization: options.localization,
                
            });
            controls.push({ name: $(div).prop('id') + 'csGrid', type: 'jqxGrid', level: 2 });
            //--------------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + 'chkOldClctEn').jqxCheckBox({
                width: '100%',
                height: 25,
                checked: true,
            });
            controls.push({ name: $(div).prop('id') + 'chkOldClctEn', type: 'jqxCheckBox', level: 2 });
            //--------------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------------
            $('#' + $(div).prop('id') + 'chkClctEn').jqxCheckBox({
                width: '100%',
                height: 25,
                checked: true,
            });
            controls.push({ name: $(div).prop('id') + 'chkClctEn', type: 'jqxCheckBox', level: 2 });
            //--------------------------------------------------------------------------------------------
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        };
       

    };
    function formDestroy(div) {
        try {

            var options = $.data(div, formName).options;
            var controls = $.data(div, formName).options.controls;
            var headerId = '#' + $(div).prop('id');          
            unHandler(div);
            /*
            for (j = 3; j >= 0; j--) {
                for (i = 0; i < controls.length; i++) {
                    if (controls[i].level == j) {
                        var o = $('#' + $(div).prop('id') + controls[i].name);
                        if (o.length > 0) {
                            $(o[0]).off();
                            $(o[0])[controls[i].type]('destroy');
                        }
                    };
                };
            };*/
            destroyControls(options.controls);
            deleteJSONObject(options);
            /*
            $.data(div, formName).options.language = null;
            delete $.data(div, formName).options.language;
            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults;           */
            $(div).children().remove();


        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        };
    };
    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var msg = "";
            for (var i = 0; i < controls.length; i++) {
                var o = $('#' + controls[i].name);
                o.each(function () {
                    //$(this)[controls[i].type]('resize');
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function getGroupData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            options.dsPara = createParaDataset(div);
            copyLoginInfo = getParaLoginInfo(div, formName);
            try {
                var parameters = $.extend({}, copyLoginInfo,
               { RefNo: { type: 'integer', value: options.refNo } },
               { dsWheret: { type: 'string', value: options.dsPara } });

                var params = getParameters(riadllName,
                       riaClassName,
                       'GetGroupData',
                       JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        try {
                            if (data.ErrorCode == 0) {
                                var tmp = JSON.parse(data.ResultXML);
                                $.extend(true, options.grdFindData, tmp);
                                $.extend(true, options.ModifyData, tmp);
                                options.ModifyData.Table.rows.length = 0;
                                refreshGrid(div, action);
                                delete tmp;
                                tmp = null;
                                
                            }
                            else {
                                messageBox(data.ErrorMessage, messageType.critical);
                                //changeMode(div);
                            }
                        } catch (err) {
                            errorHandle(formName, 'GetGroupData-Server', err);
                            //changeMode(div);
                        } finally {
                            parameters = null;
                            params = null;
                            data = null;
                            delete data;
                            delete parameters;
                            delete params;
                        };
                    }
                });
            } catch (err) {
                errorHandle(formName, 'GetGroupData', err);
                //changeMode(div);
            } finally {

            };
        } catch (err) {
            errorHandle(formName, 'GetGroupData', err);
        } finally {

        }
    };
    function refreshGrid(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');       
        if ($('#' + $(div).prop('id') + 'csGridNEWCLCTEN').is(':visible')) {
            $('#' + $(div).prop('id') + 'csGridNEWCLCTEN').css('display', 'none');
        };
        options.csGridData = {
            datatype: "json",
            datafields: [
               { name: 'CLCTEN', type: 'string' },
               { name: 'CLCTNAME', type: 'string' },
               { name: 'GROUPCODE', type: 'string' },
               { name: 'GROUPNAME', type: 'string' },
               { name: 'COUNT', type: 'integer' },
               { name: 'NEWCLCTEN', type: 'string' },
               { name: 'NEWCLCTNAME', type: 'string' }              
            ]
        };
        var dataAdapter1 = new $.jqx.dataAdapter(options.csGridData);
        options.csGridData.localdata = options.grdFindData.Table.rows;
        $(headerId + 'csGrid').jqxGrid({ source: dataAdapter1 });
        $(headerId + 'csGrid').one("bindingcomplete", function (event) {
            if (scHbar != null) { scHbar.off(); };
            if (scVbar != null) { scVbar.off(); };
            if ($(this).jqxGrid('getrows').length <= 0) {
                messageBox(options.language.NoneQuery, messageType.critical);
                return;
            };            
            scVbar = $(headerId + 'csGrid').jqxGrid("vScrollBar"); // Horizontal scrollbar. Verical one is vScrollBar
            scHbar = $(headerId + 'csGrid').jqxGrid("hScrollBar");
            if (scVbar.is(':visible')) {
                scVbar.jqxScrollBar("_triggervaluechanged", true);
                scVbar.jqxScrollBar('setPosition', 0);
                scVbar.on("valueChanged", function () {
                    if ($('#' + $(div).prop('id') + 'csGridNEWCLCTEN').is(':visible')) {
                        $('#' + $(div).prop('id') + 'csGridNEWCLCTEN').css('display', 'none');
                    };
                });
            };
            if (scHbar.is(':visible')) {
                scHbar.jqxScrollBar("_triggervaluechanged", true);
                scHbar.on("valueChanged", function () {
                    if ($('#' + $(div).prop('id') + 'csGridNEWCLCTEN').is(':visible')) {
                        $('#' + $(div).prop('id') + 'csGridNEWCLCTEN').css('display', 'none');
                    };
                });
            };
            
           
          
            if ($.isFunction(action)) { action(); };
        });
        if (scVbar != null) {
            scVbar.off();
        };
        if (scHbar != null) {
            scHbar.off();
        };
        $(headerId+ 'csGrid').jqxGrid('updatebounddata');
    }
    function unHandler(div, action) {
        var headerId = '#' + $(div).attr('id');
       
        $(headerId + 'btnFind').unbind('click');
        $(headerId + 'csGrid').unbind('cellclick')
        $(headerId + 'btnOK').unbind('click');
        $(headerId + 'csGrid').unbind('focusout');
        $(".ChangeClctEnTr").not(headerId + 'dontFocus.ChangeClctEnTr').unbind('focusin');
        $(headerId + 'gilCompCode').unbind('selectedIndexChanged');
        if (scVbar != null) {
            scVbar.off();
        };
        if (scHbar != null) {
            scHbar.off();
        };
    };
    function btnFindClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if ($(headerId + 'csGridNEWCLCTEN').is(':visible')) {
            $(headerId+ 'csGridNEWCLCTEN').css('display', 'none');
        };
        if ($(this).jqxButton('disabled')) { return; };
        $(headerId + 'csGrid').jqxGrid('clear');
        delete options.ModifyData;
        options.ModifyData = {};
        delete options.grdFindData;
        options.grdFindData = {};
        delete dsPara;
        dsPara = {};
        getGroupData(event.data, function () {

        });
    };
    function csGridCellClick(event) {
        var options = $.data(event.data, formName).options;
        try {
            var rowindex = event.args.row.visibleindex;
            //var row = $(this).jqxGrid('getrowdata', rowindex);
            
            switch (event.args.datafield) {
                case "NEWCLCTEN": case "NEWCLCTNAME":
                    getCanEditList(event.data, formName, $(event.data).prop('id') + "csGrid", options.gridColumns, rowindex, "NEWCLCTEN", "NEWCLCTNAME",
                        options.initData.CLCTEN.rows, false);
                    var gridPosition = $('#' + $(event.data).prop('id') + 'dontFocus').position();
                    var csListPosition = $('#' + $(event.data).prop('id') + 'csGridNEWCLCTEN').position();
                    $('#' + $(event.data).prop('id') + 'csGridNEWCLCTEN').css({
                        top: gridPosition.top + csListPosition.top + 32,
                        left:csListPosition.left +10
                    });
                    break;
                default:
                    if ($('#' + $(event.data).prop('id') + 'csGridNEWCLCTEN').is(':visible')) {
                        $('#' + $(event.data).prop('id') + 'csGridNEWCLCTEN').css('display', 'none');
                    };
                    break;
            };
        }
        catch (err) {
            errorHandle(formName, 'csGridCellClick', err);
        }
    };
    
    function execute(div,action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var modifyType = 0;
        var groupByStr = 0;
                
        if ($(headerId + 'chkClctEn').jqxCheckBox('checked') && $(headerId + 'chkOldClctEn').jqxCheckBox('checked')) {

        } else {
            if ($(headerId + 'chkOldClctEn').jqxCheckBox('checked')) {
                modifyType = 1
            } else { modifyType = 2 };
        };
        groupByStr = parseInt(options.dsPara.Para.rows[0]['GroupKind'.toUpperCase()]);
        copyLoginInfo = getParaLoginInfo(div, formName);
        try {            
            try {
                var parameters = $.extend({}, copyLoginInfo,
               { RefNo: { type: 'integer', value: options.refNo } },
               { GroupByStr: { type: 'integer', value: groupByStr } },
               { ModyfyType: { type: 'integer', value: modifyType } },
               { dsPara: { type: 'string', value: options.dsPara } },
               { ModifyData: { type: 'string', value: options.ModifyData } });

                var params = getParameters(riadllName,
                       riaClassName,
                       'Execute',
                       JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        try {
                            if (data.ErrorCode == 0) {
                                options.isSaved = true;
                                messageBox(options.language.EditOK, messageType.information);
                                /*
                                var tmp = JSON.parse(data.ResultXML);
                                $.extend(true, options.grdFindData, tmp);
                                $.extend(true, options.ModifyData, tmp);
                                options.ModifyData.Table.rows.length = 0;
                                refreshGrid(div, action);
                                delete tmp;
                                tmp = null; */

                            }
                            else {
                                messageBox(data.ErrorMessage, messageType.critical);
                                //changeMode(div);
                            }
                        } catch (err) {
                            errorHandle(formName, 'Execute-Server', err);
                            //changeMode(div);
                        } finally {
                            parameters = null;
                            params = null;
                            data = null;
                            delete data;
                            delete parameters;
                            delete params;
                        };
                    }
                });
            } catch (err) {
                errorHandle(formName, 'Execute', err);
                //changeMode(div);
            } finally {

            };
        } catch (err) {
            errorHandle(formName, 'Execute', err);
        } finally {

        }
    };
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        var length = 0;
        if ($(headerId + 'csGridNEWCLCTEN').is(':visible')) {
            $(headerId + 'csGridNEWCLCTEN').css('display', 'none');
        };
        if ($(this).jqxButton('disabled')) { return; };
        var rws = $(headerId + 'csGrid').jqxGrid('getboundrows');
        
        length = rws.length;
        if (length <= 0) { messageBox(options.language.NoDataUpd, messageType.critical); return; };
        options.ModifyData.Table.rows.length = 0;        
        for (var i = 0; i < length; i++) {
            if (rws[i]['NewClctEn'.toUpperCase()] != undefined) {
                if (rws[i]['NewClctEn'.toUpperCase()] != '' && rws[i]['NewClctEn'.toUpperCase()] != null) {
                    options.ModifyData.Table.rows.push(
                       {
                           CLCTEN: rws[i]['CLCTEN'],
                           CLCTNAME: rws[i]['CLCTNAME'],
                           GROUPCODE: rws[i]['GROUPCODE'],
                           GROUPNAME: rws[i]['GROUPNAME'],
                           COUNT: rws[i]['COUNT'],
                           NEWCLCTEN: rws[i]['NEWCLCTEN'],
                           NEWCLCTNAME: rws[i]['NEWCLCTNAME'],
                       }
                   );
                };
               
            };
        };
        if (options.ModifyData.Table.rows.length == 0) {
            messageBox(options.language.NoDataUpd, messageType.critical);
            return;
        };
        execute(event.data, function () { });
    };
    function ChkAuthority(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        copyLoginInfo = getParaLoginInfo(div, formName);
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { refNo: { type: 'integer', value: options.refNo } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkAuthority',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {                            
                            if ($.isFunction(action)) { action(true); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            if ($.isFunction(action)) { action(false); };
                            //changeMode(div);
                        }
                    } catch (err) {
                        errorHandle(formName, 'ChkAuthority-Server', err);
                        //changeMode(div);
                    } finally {
                        parameters = null;
                        params = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete params;
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'ChkAuthority', err);
            //changeMode(div);
        } finally {

        };
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'btnFind').unbind('click')
            $(headerId + 'btnFind').on('click', div, btnFindClick);
            $(headerId + 'csGrid').unbind('cellclick');
            $(headerId + 'csGrid').on('cellclick', div, csGridCellClick);
            $(headerId + 'btnOK').unbind('click');
            $(headerId + 'btnOK').on('click', div, btnOKClick);
            $(".ChangeClctEnTr").not(headerId + 'dontFocus.ChangeClctEnTr').unbind('focusin');            
            $(".ChangeClctEnTr").not(headerId + 'dontFocus.ChangeClctEnTr').on('focusin', function () {
                if ($('#' + $(div).prop('id') + 'csGridNEWCLCTEN').is(':visible')) {
                    $('#' + $(div).prop('id') + 'csGridNEWCLCTEN').css('display', 'none');
                };
            });
            $(headerId + 'gilCompCode').unbind('selectedIndexChanged');
            $(headerId + 'gilCompCode').on('selectedIndexChanged', function () {
                var currentComp = options.loginInfo.loginInfo.rows[0].compcode;
                //$(headerId + 'gilCompCode').off('selectedIndexChanged');
                unHandler(div);
                options.loginInfo.loginInfo.rows[0].compcode = $(headerId + 'gilCompCode').csList('codeNo');
                ChkAuthority(div, function (r) {
                    if (r) {
                        clearControl(div);
                        unHandler(div);
                        options.loginInfo.loginInfo.rows[0].compcode = $(headerId + 'gilCompCode').csList('codeNo');
                        QueryAllData(div, function () {
                            addHandler(div)
                        });
                    } else {
                        $(headerId + 'gilCompCode').csList('codeNo', currentComp);
                        options.loginInfo.loginInfo.rows[0].compcode = currentComp;
                        addHandler(div);
                    };
                })
                
            })
           
            
            /*
            $(headerId).on('focusout', function () {
                if ($('#' + $(div).prop('id') + 'csGridNEWCLCTEN').css('display') != undefined) {
                    $('#' + $(div).prop('id') + 'csGridNEWCLCTEN').css('display', 'none');
                };
            }); */
            /*
            $(headerId + 'csGrid').unbind('focusout');
            $(headerId + 'csGrid').on('focusout', function () {
                
                if ($('#' + $(div).prop('id') + 'csGridNEWCLCTEN').css('display') != undefined) {
                    $('#' + $(div).prop('id') + 'csGridNEWCLCTEN').css('display', 'none');
                }; 
            }); */
            
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        }
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            
            if ($(options.container).attr('class').indexOf('jqx-window') != undefined) {
                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                    options.containerIsWindow = true;
                    var csw = $.data(div, formName).options.container;
                    csw.on("winClosing", function () {
                        csw.csWindow('close');
                    });
                };
            };
            loadForm(options,
              'SO3000\\' + formName + '.html',
              function (msg) {
                  try {
                      $(div).html(msg);                                            
                      changeElementId(div);
                                  initData(div, function () {
                                      $(div).triggerHandler('loaded', [this, options]);
                                  });                      
                  }
                  catch (err) {
                      errorHandle(formName, 'formLoaded_success', err);
                  }
              });
            //$.ajax({
            //    url: 'SO3000\\' + formName + '.html?v=' + formatDateTime(new Date(), "datetime3"),
            //    type: "get",
            //    datatype: 'html',
            //    success: function (msg) {
            //        try {
            //            $(div).html(msg);
            //            changeElementId(div);
            //            initData(div, function () {
            //                $(div).triggerHandler('loaded', [this, options]);
                            
            //            });
            //        }
            //        catch (err) {
            //            errorHandle(formName, 'formLoaded', err);
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
    function QueryAllData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        copyLoginInfo = getParaLoginInfo(div, formName);
        try {
            var parameters = $.extend({}, copyLoginInfo);

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetAllData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            options.initData = null;
                            delete options.initData;
                            options.initData = {};
                            /*
                            if (tmp.CLCTEN.rows.length > 0) {
                                tmp.CLCTEN.rows.splice(0, 1);
                            }; */
                            $.extend(true, options.initData, tmp);                            
                            if (options.initData.CLCTEN.rows.length > 0) {                                
                               /* var rwNew = $.extend(true,{}, options.initData.CLCTEN.rows[0]);                                                               
                                $.each(rwNew, function (key, value) {
                                    rwNew[key] = null;
                                }); 
                                options.initData.CLCTEN.rows.unshift(rwNew); */
                            };
                            $(headerId + 'gilCompCode').csList('source', options.initData.COMPCODE.rows);
                            $(headerId + 'gilCompCode').csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                            $(headerId + 'csmClctEn').csMulti('source', tmp.CLCTEN.rows);
                            $(headerId + 'csmStrtCode').csMulti('source', options.initData.STRCODE.rows);
                            $(headerId + 'csmServiceType').csMulti('source', options.initData.SERVICETYPE.rows);
                            $(headerId + 'csmMduId').csMulti('source', options.initData.MDUID.rows);
                            
                            delete tmp;
                            tmp = null;
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            //changeMode(div);
                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryAllData-Server', err);
                        //changeMode(div);
                    } finally {
                        parameters = null;
                        params = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete params;
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'QueryAllData', err);
            //changeMode(div);
        } finally {

        };
    };
    function dismantleCustId(str) {
        var ary = str.split(",");
        var result = [];
        $.each(ary, function (index, value) {
            if (value.indexOf("-") > 0) {
                var ary2 = value.split('-');
                for (i =parseInt( ary2[0] ); i <=parseInt( ary2[1] ); i++) {
                    result.push(i.toString());
                };
            } else {
                result.push(value)
            };
        });
        return result.toString();
    };
    function createParaDataset(div) {
        var headerId = '#' + $(div).prop('id');
        var ds = {            
            Para: {
                columns: [{ name: 'CLCTYM1', type: 'string' },
                    { name: 'CLCTYM2', type: 'string' },
                    { name: 'CREATETIME1', type: 'string' },
                    { name: 'CREATETIME2', type: 'string' },
                    { name: 'BILLNO1', type: 'string' },
                    { name: 'BILLNO2', type: 'string' },
                    { name: 'SERVICETYPE', type: 'string' },
                    { name: 'MDUID', type: 'string' },
                    { name: 'CUSTID',type:'string'},
                    { name: 'STRTCODE', type: 'string' },
                    { name: 'CLCTEN', type: 'string' },
                    { name: 'GROUPKIND', type: 'string' }                    
                ],
                rows: [{
                    CLCTYM1: null,
                    CLCTYM2: null,
                    CREATETIME1: null,
                    CREATETIME2: null,
                    BILLNO1: null,
                    BILLNO2: null,
                    SERVICETYPE: null,
                    MDUID: null,
                    CUSTID: null,
                    STRTCODE: null,
                    CLCTEN: null,
                    GROUPKIND: null
                }]
            }
        };
        if ($(headerId + 'txtClctDate1').csDateTime('getText') != null) {
            ds.Para.rows[0]['ClctYM1'.toUpperCase()] = $(headerId + 'txtClctDate1').csDateTime('getText').replace(/\D*/g, '');
        };
        if ($(headerId + 'txtClctDate2').csDateTime('getText') != null) {
            ds.Para.rows[0]['ClctYM2'.toUpperCase()] = $(headerId + 'txtClctDate2').csDateTime('getText').replace(/\D*/g, '');
        };
        if ($(headerId + 'CreateTime1').csDateTime('getText') != null) {
            ds.Para.rows[0]['CreateTime1'.toUpperCase()] = $(headerId + 'CreateTime1').csDateTime('getText');
        };
        if ($(headerId + 'CreateTime2').csDateTime('getText') != null) {
            ds.Para.rows[0]['CreateTime2'.toUpperCase()] = $(headerId + 'CreateTime2').csDateTime('getText');
        };
        if ($(headerId + 'txtBillNo1').jqxInput('val') != '') {
            ds.Para.rows[0]['BILLNO1'.toUpperCase()] = $(headerId + 'txtBillNo1').jqxInput('val');
        };
        if ($(headerId + 'txtBillNo2').jqxInput('val') != '') {
            ds.Para.rows[0]['BILLNO2'.toUpperCase()] = $(headerId + 'txtBillNo2').jqxInput('val');
        };
        if ($(headerId + 'csmServiceType').csMulti('getChooseQuoteList') != '') {
            ds.Para.rows[0]['SERVICETYPE'.toUpperCase()] = $(headerId + 'csmServiceType').csMulti('getChooseQuoteList');
        };
        if ($(headerId + 'csmMduId').csMulti('getChooseQuoteList') != '') {
            ds.Para.rows[0]['MDUID'.toUpperCase()] = $(headerId + 'csmMduId').csMulti('getChooseQuoteList');
        };
        if ($(headerId + 'txtCustid').jqxInput('val') != '') {
            ds.Para.rows[0]['CUSTID'.toUpperCase()] = dismantleCustId($(headerId + 'txtCustid').jqxInput('val'));
        };
        if ($(headerId + 'csmStrtCode').csMulti('getChooseList') != '') {
            ds.Para.rows[0]['STRTCODE'.toUpperCase()] = $(headerId + 'csmStrtCode').csMulti('getChooseList');
        };
        if ($(headerId + 'csmClctEn').csMulti('getChooseQuoteList') != '') {
            ds.Para.rows[0]['CLCTEN'.toUpperCase()] = $(headerId + 'csmClctEn').csMulti('getChooseQuoteList');
        };
        ds.Para.rows[0]['GroupKind'.toUpperCase()] = $(headerId + 'cbGroupKind').jqxDropDownList('selectedIndex');
        return ds;
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            changeLanguage(div);
            renderControl(div);
            $(headerId + "cbGroupKind").jqxDropDownList('addItem', options.language.Street);
            $(headerId + "cbGroupKind").jqxDropDownList('addItem', options.language.MduId);
            $(headerId + "cbGroupKind").jqxDropDownList('addItem', options.language.BillNo);
            $(headerId + "cbGroupKind").jqxDropDownList('addItem', options.language.CustId);
            $(headerId + "cbGroupKind").jqxDropDownList({ selectedIndex: 0 });
            
            QueryAllData(div, function () { addHandler(div)});
            /*
            shouldRegPriv = false;
            options.isSaved = false;
            changeLanguage(div);
            renderControl(div);
            if (options.orderNo == '') {
                messageBox(options.language.NoDataQuery, messageType.critical);
                return;
            };
            chkReturnCode(div, function () {
                renderSO1118A5(div, function () {
                    addHandler(div, function () {
                    });
                });
            }); */
        } catch (err) {
            errorHandle(formName, 'initData', err);

        } finally {
            if ($.isFunction(action)) { action(); };
        }
    };
    function formClosed(div) {

        var options = $.data(div, formName).options;
        if (options['closed']) {
            //options['closed'](options.returnValue);
        };
        $(options['container']).csWindow('close');
    };
    function setTheme(div, params) {
        var controls = $.data(div, formName).options.controls;
        for (i = 0; i < controls.length; i++) {
            var o = $('#' + $(div).prop('id') + controls[i].name);
            if (o.length > 0) {
                $(o[0])[controls[i].type]({ theme: params });
            }
        }
    };

    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var idArray = $('*[id^=' + $(div).prop('id') + ']')
        try {
            idArray.each(function (index, value) {
                var idStr = $(value).attr('id');
                if (idStr.indexOf('csmStrtCode') >= 0) { return };
                if (idStr.indexOf('csmClctEn') >= 0) { return };
                if (idStr.indexOf('csmServiceType') >= 0) { return };
                if (idStr.indexOf('csmMduId') >= 0) { return };
                if (idStr.replace($(div).prop('id'), "") != "") {
                    if (lang[idStr.replace($(div).prop('id'), "")] != null) {
                        $('#' + idStr).val(lang[idStr.replace($(div).prop('id'), "")]);
                        $('#' + idStr).text(lang[idStr.replace($(div).prop('id'), "")]);
                    }
                }
            });
            idArray.length = 0;
            idArray = [];
            idArray = null;
        }
        catch (err) {
            errorHandle(formName, 'changeLanguage', err);
        }
    };
})(jQuery);