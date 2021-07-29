(function ($) {
    var formName = "SO1100D3";
    var riadllName = "CableSoft.SO.RIA.Customer.Account.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Customer.Account.Web.Account";
    var copyLoginInfo = {};
    var defaults = (function () {
        this.language = {};
        this.initData = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.parameters = {};
        this.controls = [];
        this.theme = '';        
        this.isSaved = false;
        this.container = null;
        this.localization = {};
        this.citemStr = [];
        this.citemStr2 = [];
        this.serviceId = [];
        this.ACHTNO = '';
        this.ACHTDESC = '';
        this.seqNo = -1;

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
                            options: $.extend({}, new defaults(), new SO1100D3(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1100D3_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1144J', err);
        }
    };
    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function QueryCanChooseProduct(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
                { SEQNO: { type: 'integer', value: options.seqNo } },
               { ACHTNO: { type: 'string', value: options.ACHTNO } },
               { ACHTDESC: { type: 'string', value: options.ACHTDESC } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetNewCanChooseProdutWithACH',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            delete options.parameters.CanChooseProduct;
                            delete options.parameters.CanChooseNonePeriod;
                            delete options.parameters.GetCanChooseBillNo;
                            options.parameters.CanChooseProduct = {};
                            options.parameters.CanChooseNonePeriod = {};
                            options.parameters.GetCanChooseBillNo = {};
                            $.extend(true, options.parameters.CanChooseProduct, tmp.CHOOSEPRODUCT);
                            $.extend(true, options.parameters.CanChooseNonePeriod, tmp.NONEPERIOD);
                            $.extend(true, options.parameters.GetCanChooseBillNo, tmp.CHOOSEBILLNO);
                            delete tmp;
                            tmp = null;
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetNewCanChooseProdutWithACH-Server', err);
                        
                    } finally {
                        parameters = null;
                        params = null;
                        delete parameters;
                        delete params;
                    };
                }
            });

        } catch (err) {
            errorHandle(formName, 'saveData', err);
            changeMode(event.data);
            bindHandler(event.data);
        } finally {

        };
    };
    function renderNonePeriodstatusbar(statusBar, div, lang) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var html = '<table class="SO1100D3table">' +
                        '<tr class="SO1100D3tr">' +
                        '<td class="SO1100D3td" style="width:90px"><button data-id="btnALL"></button></td>' +
                        '<td class="SO1100D3td"style="width:90px"><button data-id="btnCancel"></button></td>' +
                        '<td class="SO1100D3td"></td>' +
                        '</tr>' +
                        '</table>';
        $(statusBar).append(html);
        changeElementId(statusBar);
        $('#' + $(statusBar).prop('id') + 'btnALL').text(lang.btnAll);
        $('#' + $(statusBar).prop('id') + 'btnCancel').text(lang.btnCancelAll);
        //-----------------------------------------------------------------------------------------------------
        $('#' + $(statusBar).prop('id') + 'btnALL').jqxButton($.extend({}, imagePosition, {
            width: 80,
            height: 25,
            imgSrc: imageScr.ok.imgSrc
        }));
        $('#' + $(statusBar).prop('id') + 'btnALL > img').css('top', '2px');
        controls.push({ name: $(statusBar).prop('id') + 'btnALL', type: 'jqxButton', level: 3 });
        
        //-----------------------------------------------------------------------------------------------------
        //-----------------------------------------------------------------------------------------------------
        $('#' + $(statusBar).prop('id') + 'btnCancel').jqxButton($.extend({}, imagePosition, {
            width: 80,
            height: 25,
            imgSrc: imageScr.cancel.imgSrc
        }));
        $('#' + $(statusBar).prop('id') + 'btnCancel > img').css('top', '2px');
        controls.push({ name: $(statusBar).prop('id') + 'btnCancel', type: 'jqxButton', level: 3 });
        //-----------------------------------------------------------------------------------------------------
        $('#' + $(statusBar).prop('id') + 'btnALL').on('click', function () {
            var index = $('#' + $(div).prop('id') + 'grdNonePeriod').jqxGrid('getrows').length;

            for (var i = 0; i < index; i++) {
                $('#' + $(div).prop('id') + 'grdNonePeriod').jqxGrid('setcellvalue', i, 'CHOOSE', true);
            };
        });
        $('#' + $(statusBar).prop('id') + 'btnCancel').on('click', function () {
            var index = $('#' + $(div).prop('id') + 'grdNonePeriod').jqxGrid('getrows').length;

            for (var i = 0; i < index; i++) {
                $('#' + $(div).prop('id') + 'grdNonePeriod').jqxGrid('setcellvalue', i, 'CHOOSE', false);
            };
        });
    };
    function renderBillNostatusbar(statusBar, div, lang) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var html = '<table class="SO1100D3table">' +
                        '<tr class="SO1100D3tr">' +
                        '<td class="SO1100D3td" style="width:90px"><button data-id="btnALL"></button></td>' +
                        '<td class="SO1100D3td"style="width:90px"><button data-id="btnCancel"></button></td>' +
                        '<td class="SO1100D3td"></td>' +
                        '</tr>' +
                        '</table>';
        $(statusBar).append(html);
        changeElementId(statusBar);
        $('#' + $(statusBar).prop('id') + 'btnALL').text(lang.btnAll);
        $('#' + $(statusBar).prop('id') + 'btnCancel').text(lang.btnCancelAll);
        //-----------------------------------------------------------------------------------------------------
        $('#' + $(statusBar).prop('id') + 'btnALL').jqxButton($.extend({}, imagePosition, {
            width: 80,
            height: 25,
            imgSrc: imageScr.ok.imgSrc
        }));
        $('#' + $(statusBar).prop('id') + 'btnALL > img').css('top', '2px');
        controls.push({ name: $(statusBar).prop('id') + 'btnALL', type: 'jqxButton', level: 3 });
        //-----------------------------------------------------------------------------------------------------
        //-----------------------------------------------------------------------------------------------------
        $('#' + $(statusBar).prop('id') + 'btnCancel').jqxButton($.extend({}, imagePosition, {
            width: 80,
            height: 25,
            imgSrc: imageScr.cancel.imgSrc
        }));
        $('#' + $(statusBar).prop('id') + 'btnCancel > img').css('top', '2px');
        controls.push({ name: $(statusBar).prop('id') + 'btnCancel', type: 'jqxButton', level: 3 });
        //-----------------------------------------------------------------------------------------------------
        $('#' + $(statusBar).prop('id') + 'btnALL').on('click', function () {
            var index = $('#' + $(div).prop('id') + 'grdBillNo').jqxGrid('getrows').length;

            for (var i = 0; i < index; i++) {
                $('#' + $(div).prop('id') + 'grdBillNo').jqxGrid('setcellvalue', i, 'CHOOSE', true);
            };
        });
        $('#' + $(statusBar).prop('id') + 'btnCancel').on('click', function () {
            var index = $('#' + $(div).prop('id') + 'grdBillNo').jqxGrid('getrows').length;

            for (var i = 0; i < index; i++) {
                $('#' + $(div).prop('id') + 'grdBillNo').jqxGrid('setcellvalue', i, 'CHOOSE', false);
            };
        });
    };
    function renderProductstatusbar(statusBar,div,lang) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var html = '<table class="SO1100D3table">' +
                        '<tr class="SO1100D3tr">'  +
                        '<td class="SO1100D3td" style="width:90px"><button data-id="btnALL"></button></td>' +
                        '<td class="SO1100D3td"style="width:90px"><button data-id="btnCancel"></button></td>' +
                        '<td class="SO1100D3td"></td>' +
                        '</tr>' +
                        '</table>';
        $(statusBar).append(html);
        changeElementId(statusBar);
        $('#' + $(statusBar).prop('id') + 'btnALL').text(lang.btnAll);
        $('#' + $(statusBar).prop('id') + 'btnCancel').text(lang.btnCancelAll);
        //-----------------------------------------------------------------------------------------------------
        $('#' + $(statusBar).prop('id') + 'btnALL').jqxButton($.extend({}, imagePosition, {
            width: 80,
            height: 25,
            imgSrc: imageScr.ok.imgSrc
        }));
        $('#' + $(statusBar).prop('id') + 'btnALL > img').css('top', '2px');
        controls.push({ name: $(statusBar).prop('id') + 'btnALL', type: 'jqxButton', level: 3 });
        //-----------------------------------------------------------------------------------------------------
        //-----------------------------------------------------------------------------------------------------
        $('#' + $(statusBar).prop('id') + 'btnCancel').jqxButton($.extend({}, imagePosition, {
            width: 80,
            height: 25,
            imgSrc: imageScr.cancel.imgSrc
        }));
        $('#' + $(statusBar).prop('id') + 'btnCancel > img').css('top', '2px');
        controls.push({ name: $(statusBar).prop('id') + 'btnCancel', type: 'jqxButton', level: 3 });
        //-----------------------------------------------------------------------------------------------------
        
        $('#' + $(statusBar).prop('id') + 'btnALL').on('click', function () {
            var index = $('#' + $(div).prop('id') + 'grdProduct').jqxGrid('getrows').length;
            
            for (var i = 0; i < index; i++) {
                $('#' + $(div).prop('id') + 'grdProduct').jqxGrid('setcellvalue', i, 'CHOOSE', true);
            };
        });
        $('#' + $(statusBar).prop('id') + 'btnCancel').on('click', function () {
            var index = $('#' + $(div).prop('id') + 'grdProduct').jqxGrid('getrows').length;

            for (var i = 0; i < index; i++) {
                $('#' + $(div).prop('id') + 'grdProduct').jqxGrid('setcellvalue', i, 'CHOOSE', false);
            };
        });
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var headerId = '#' + $(div).prop('id');
        var lang = options.language;
        //$(headerId + 'split1').height($(headerId + 'Maincontainer').height() / 2)
        //$(headerId + 'split2').height($(headerId + 'Maincontainer').height() / 2)
        $(headerId + 'split1').offset({ top: $(headerId + 'Maincontainer').top, left: $(headerId + 'Maincontainer').left });
        //-----------------------------------------------------------------------------
        $(headerId + "grdProduct").jqxGrid({
            width: '99.7%',
            //height: '99%',
            height: ($(headerId + 'Maincontainer').height() /2) -22,
            sortable: true,
            altrows: true,
            editable: true,
            columnsresize: true,
            columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: 30,
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
              
                {
                    text: lang.colCHOOSE, datafield: 'CHOOSE', width: 40, cellsalign: 'center',
                    sortable: false, filterable: false,
                    align: 'center', threestatecheckbox: false, columntype: 'checkbox'
                },
                { text: lang.colCUSTID, datafield: 'CUSTID', width: 80, cellsalign: 'right', align: 'center', editable: false },
                { text: lang.colPRODUCTNAME, datafield: 'PRODUCTNAME', width: 70, cellsalign: 'left', align: 'center', editable: false },
                { text: lang.colDECLARANTNAME, datafield: 'DECLARANTNAME', width: 60, cellsalign: 'left', align: 'center', editable: false },
                { text: lang.colFACISNO, datafield: 'FACISNO', width: 110, cellsalign: 'left', align: 'center', editable: false },
                { text: lang.colINSTADDRESS, datafield: 'INSTADDRESS', width: 250, cellsalign: 'left', align: 'center', editable: false },                
                { text: lang.colSERVICEID, datafield: 'SERVICEID', width: 70, cellsalign: 'left', align: 'left', editable: false },                                                                
                { text: lang.colHOMEID, datafield: 'HOMEID', width: 80, cellsalign: 'left', align: 'center', editable: false },

            ],
            renderstatusbar: function (statusbar) {
                return renderProductstatusbar(statusbar,div, lang);               
            },
            rendertoolbar: function (element) {
                $(element).html("<div>" + lang.productBar + "</div>");
            },
            showtoolbar: true,
            toolbarheight: 25,
            showstatusbar: true,
            statusbarheight: 25,
            localization: options.localization
        });
        controls.push({ name:$(div).prop('id') + 'grdProduct', type: 'jqxGrid', level: 2 });
        //-----------------------------------------------------------------------------

        //-----------------------------------------------------------------------------
        $(headerId + "grdNonePeriod").jqxGrid({
            width: '99.7%',
            //height: '99%',
            height: ($(headerId + 'Maincontainer').height() / 2) - 22,
            sortable: true,
            altrows: true,
            editable: true,
            columnsresize: true,
            columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: 30,
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                { text: lang.colCHOOSE, datafield: 'CHOOSE', width: 40, cellsalign: 'center', align: 'center', threestatecheckbox: false, columntype: 'checkbox' },
                { text: lang.colCUSTID, datafield: 'CUSTID', width: 80, cellsalign: 'right', align: 'center', editable: false },
                { text: lang.colDECLARANTNAME, datafield: 'DECLARANTNAME', width: 60, cellsalign: 'left', align: 'center', editable: false },
                { text: lang.colFACISNO, datafield: 'FACISNO', width: 110, cellsalign: 'left', align: 'center', editable: false },
                { text: lang.colCITEMCODE, datafield: 'CITEMCODE', width: 70, cellsalign: 'right', align: 'center', editable: false },
                { text: lang.colCITEMNAME, datafield: 'CITEMNAME', width: 180, cellsalign: 'left', align: 'center', editable: false },
                { text: lang.colSTOPFLAG, datafield: 'STOPFLAG', width: 40, cellsalign: 'center', align: 'center', editable: false, threestatecheckbox: false, columntype: 'checkbox' },                
                { text: lang.colPERIOD, datafield: 'PERIOD', width: 50, cellsalign: 'center', align: 'center', editable: false },
                { text: lang.colAMOUNT, datafield: 'AMOUNT', width: 80, cellsalign: 'right', align: 'center', editable: false },
                { text: lang.colACCOUNTNO, datafield: 'ACCOUNTNO', width: 150, cellsalign: 'center', align: 'center', editable: false },
                { text: lang.colCMNAME, datafield: 'CMNAME', width: 70, cellsalign: 'center', align: 'center', editable: false },
                { text: lang.colSTARTDATE, datafield: 'STARTDATE', width: 110, cellsalign: 'center', align: 'center', editable: false, cellsformat: 'yyyy/MM/dd' },
                { text: lang.colSTOPDATE, datafield: 'STOPDATE', width: 110, cellsalign: 'center', align: 'center', editable: false, cellsformat: 'yyyy/MM/dd' },                
                { text: 'SEQNO', datafield: 'SEQNO', width: 90, cellsalign: 'left', align: 'center', editable: false,hidden:true },

            ],
            rendertoolbar: function (element) {
                $(element).html("<div>" + lang.nonePeriodBar + "</div>");
            },
            showtoolbar: true,
            toolbarheight: 25,
            showstatusbar: true,
            statusbarheight: 25,
            renderstatusbar: function (statusbar) {
                return renderNonePeriodstatusbar(statusbar, div, lang);
            },
            localization: options.localization

        });
        controls.push({ name:$(div).prop('id') + 'grdNonePeriod', type: 'jqxGrid', level: 2 });
        //-----------------------------------------------------------------------------

        //-----------------------------------------------------------------------------
        $(headerId + "grdBillNo").jqxGrid({
            width: '99.7%',
            //height: '99%',
            height: $(headerId + 'Maincontainer').height() -42,
            sortable: true,
            altrows: true,
            editable: true,
            columnsresize: true,
            columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: 30,
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                { text: lang.colCHOOSE, datafield: 'CHOOSE', width: 40, cellsalign: 'center', align: 'center', threestatecheckbox: false, columntype: 'checkbox' },
                { text: lang.colCUSTID, datafield: 'CUSTID', width: 80, cellsalign: 'right', align: 'center', editable: false },
                { text: lang.colDECLARANTNAME, datafield: 'DECLARANTNAME', width: 60, cellsalign: 'left', align: 'center', editable: false },
                { text: lang.colFACISNO, datafield: 'FACISNO', width: 110, cellsalign: 'left', align: 'center', editable: false },
                { text: lang.colBILLNO, datafield: 'BILLNO', width: 150, cellsalign: 'center', align: 'center', editable: false },
                { text: lang.colCITEMCODE, datafield: 'CITEMCODE', width: 70, cellsalign: 'right', align: 'center', editable: false },
                { text: lang.colCITEMNAME, datafield: 'CITEMNAME', width: 180, cellsalign: 'left', align: 'center', editable: false },
                { text: lang.colREALPERIOD, datafield: 'REALPERIOD', width: 50, cellsalign: 'center', align: 'center', editable: false },
                { text: lang.colSHOULDAMT, datafield: 'SHOULDAMT', width: 80, cellsalign: 'right', align: 'center', editable: false },
                { text: lang.colACCOUNTNO, datafield: 'ACCOUNTNO', width: 150, cellsalign: 'center', align: 'center', editable: false },
                { text: lang.colCMNAME, datafield: 'CMNAME', width: 70, cellsalign: 'center', align: 'center', editable: false },
                { text: lang.colSTARTDATE, datafield: 'REALSTARTDATE', width: 110, cellsalign: 'center', align: 'center', editable: false, cellsformat: 'yyyy/MM/dd' },
                { text: lang.colSTOPDATE, datafield: 'REALSTOPDATE', width: 110, cellsalign: 'center', align: 'center', editable: false, cellsformat: 'yyyy/MM/dd' },                
                { text: 'BILLPK', datafield: 'BILLPK', width: 90, cellsalign: 'left', align: 'center', editable: false, hidden: true },

            ],
            rendertoolbar: function (element) {
                $(element).html("<div>" + lang.BillNoBar + "</div>");
            },
            showtoolbar: true,
            toolbarheight: 25,
            showstatusbar: true,
            statusbarheight: 25,
            renderstatusbar: function (statusbar) {
                return renderBillNostatusbar(statusbar, div, lang);
            },
            localization: options.localization
        });
        controls.push({ name:$(div).prop('id') + 'grdBillNo', type: 'jqxGrid', level: 2 });
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------
        $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
            width: 80,
            height: 25,
            imgSrc: imageScr.ok.imgSrc
        }));
        controls.push({ name: $(div).prop('id') + 'btnOK', type: 'jqxButton', level: 2 });
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------
        $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
            width: 80,
            height: 25,
            imgSrc: imageScr.cancel.imgSrc
        }));
        controls.push({ name: $(div).prop('id') + 'btnCancel', type: 'jqxButton', level: 2 });
        //-----------------------------------------------------------------------------
        

    };
    function formDestroy(div) {
        try {

            var options = $.data(div, formName).options;
            var controls = $.data(div, formName).options.controls;
            var headerId = '#' + $(div).prop('id');          
            unHandler(div);
            destroyControls(options.controls);
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
            }; */

            $.data(div, formName).options.language = null;
            delete $.data(div, formName).options.language;
            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults;           
            $(div).children().remove();


        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        };
    };
    function unHandler(div, action) {
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'btnOK').unbind('click');
        $(headerId + 'btnCancel').unbind('click');
      
    };
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if ($(this).jqxButton('disabled')) { return; };

        //citemstr 
        options.citemStr.length = 0;
        var rows = $(headerId + 'grdNonePeriod').jqxGrid('getrows');
        $.each(rows, function (index, value) {
            if (value['CHOOSE']) {
                options.citemStr.push("'" + value['SEQNO'] + "'");
            };
        });

        //ServiceId
        options.serviceId.length = 0;
        var rows = $(headerId + 'grdProduct').jqxGrid('getrows');
        $.each(rows, function (index, value) {
            if (value['CHOOSE']) {
                options.serviceId.push(value);
            };
        });

        //billNoPK
        options.citemStr2.length = 0;
        var rows = $(headerId + 'grdBillNo').jqxGrid('getrows');
        $.each(rows, function (index, value) {
            if (value['CHOOSE']) {
                options.citemStr2.push("'" + value['BILLPK'] + "'");
            };
        });
        options.isSaved = true;
        $(options.container).csWindow('close');
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'btnOK').unbind('click');
            $(headerId + 'btnOK').bind('click', div, btnOKClick);
            $(headerId + 'btnCancel').unbind('click');
            $(headerId + 'btnCancel').bind('click', function () {
                options.isSaved = false;
                $(options.container).csWindow('close');
            });
          
            
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        }
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            copyLoginInfo = getParaLoginInfo(div, formName);
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        initData(div, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class').indexOf('jqx-window') != undefined) {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    options.containerIsWindow = true;
                                    var csw = $.data(div, formName).options.container;
                                    csw.on("winClosing", function () {
                                        csw.csWindow('close');
                                    });
                                };
                            };
                            $('#' + $(div).prop('id') + 'grdProduct').jqxGrid('scrolloffset', 0, 0);
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });
            /*$.ajax({
                url: 'SO1000\\' + formName + '.html?v=' + formatDateTime(new Date(), "datetime3"),
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        initData(div, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class').indexOf('jqx-window') != undefined) {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    options.containerIsWindow = true;
                                    var csw =  $.data(div, formName).options.container;
                                    csw.on("winClosing", function () {                                       
                                        csw.csWindow('close');
                                    });
                                };
                            };
                            $('#' + $(div).prop('id') + 'grdProduct').jqxGrid('scrolloffset', 0, 0);
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded', err);
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
            }); */
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function refreshGrid(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var headId = $(div).attr('id');
            /*
            $('#' + $(div).prop('id') + 'grdProduct').one('bindingcomplete', function (event) {
                $('#' + $(div).prop('id') + 'grdProduct').jqxGrid('scrolloffset', 0, 0);
            });
            $('#' + $(div).prop('id') + 'grdNonePeriod').one('bindingcomplete', function (event) {
                $('#' + $(div).prop('id') + 'grdNonePeriod').jqxGrid('scrolloffset', 0, 0);
            });
            $('#' + $(div).prop('id') + 'grdBillNo').one('bindingcomplete', function (event) {
                $('#' + $(div).prop('id') + 'grdBillNo').jqxGrid('scrolloffset', 0, 0);
                $('#' + $(div).prop('id') + 'grdProduct').jqxGrid('scrolloffset', 0, 0);
            }); */
            options.product = {
                datatype: "json",
                datafields: [
                   { name: 'CHOOSE', type: 'boolean' },
                   { name: 'SERVICEID', type: 'string' },
                   { name: 'PRODUCTNAME', type: 'string' },
                   { name: 'CUSTID', type: 'integer' },
                   { name:'DECLARANTNAME',type:'string'},
                   { name: 'INSTADDRESS', type: 'string' },
                   { name: 'FACISNO', type: 'string' },
                   { name: 'HOMEID', type: 'string' },                   
                ]
            };           
            var dataAdapter1 = new $.jqx.dataAdapter(options.product);            
            var data1 = $.extend(true, {}, options.parameters['CanChooseProduct']);
            data1.rows = $.each(data1.rows, function (index, item) {
                item = $.extend(item, { CHOOSE: false });
                $.each(options.parameters['ChooseProduct'].rows, function (i, row) {
                    if (item['ServiceID'.toUpperCase()] == row['ServiceID'.toUpperCase()]) {
                        item['CHOOSE'] = true;
                    };
                });               
            });
            options.product.localdata = data1.rows;
            $('#' + $(div).prop('id') + 'grdProduct').jqxGrid({ source: dataAdapter1 });
           
            $('#' + $(div).prop('id') + 'grdProduct').jqxGrid('updatebounddata');


            options.nonePeriod = {
                datatype: "json",
                datafields: [
                   { name: 'CHOOSE', type: 'boolean' },
                   { name: 'CUSTID', type: 'integer' },
                   { name: 'DECLARANTNAME', type: 'string' },
                   { name: 'CITEMCODE', type: 'integer' },
                   { name: 'CITEMNAME', type: 'string' },
                   { name: 'STOPFLAG', type: 'boolean' },
                   { name: 'STOPFLAG2', type: 'boolean' },
                   { name: 'PERIOD', type: 'integer' },
                   { name: 'AMOUNT', type: 'integer' },
                   { name: 'ACCOUNTNO', type: 'string' },
                   { name: 'CMNAME', type: 'string' },
                   { name: 'STARTDATE', type: 'date' },
                   { name: 'STOPDATE', type: 'date' },
                   { name: 'FACISNO', type: 'string' },
                   { name: 'SEQNO', type: 'string' },
                ]
            };
            var dataAdapter2 = new $.jqx.dataAdapter(options.nonePeriod);
            var data2 = $.extend(true, {}, options.parameters['CanChooseNonePeriod']);
            data2.rows = $.each(data2.rows, function (index, item) {
                item = $.extend(item, { CHOOSE: false });
                if (item['STOPFLAG'] == 1) {
                    item['STOPFLAG'] = true
                } else { item['STOPFLAG'] = false; };
                var arySEQNO = [];
                if (options.parameters['Account'].rows.length > 0) {
                    if (options.parameters['Account'].rows[0]['CitemStr'.toUpperCase()] != undefined) {
                        if (options.parameters['Account'].rows[0]['CitemStr'.toUpperCase()] != null) {
                            arySEQNO = options.parameters['Account'].rows[0]['CitemStr'.toUpperCase()].replace(/\'/g, '').split(',');
                        };
                    };
                };
                data2.rows = $.each(data2.rows, function (index, item) {                    
                    $.each(arySEQNO, function (i, o) {
                        if (item['SEQNO'.toUpperCase()] == o) {
                            item['CHOOSE'] = true;
                        };
                    })
                });


            });
            options.nonePeriod.localdata = data2.rows;
            $('#' + $(div).prop('id') + 'grdNonePeriod').jqxGrid({ source: dataAdapter2 });
            $('#' + $(div).prop('id') + 'grdNonePeriod').jqxGrid('updatebounddata');



            options.billNo = {
                datatype: "json",
                datafields: [
                   { name: 'CHOOSE', type: 'boolean' },
                   { name: 'CUSTID', type: 'integer' },
                   { name: 'DECLARANTNAME', type: 'string' },
                   { name:'BILLNO',type:'string'},
                   { name: 'CITEMCODE', type: 'integer' },
                   { name: 'CITEMNAME', type: 'string' },
                   { name: 'REALPERIOD', type: 'integer' },
                   { name: 'SHOULDAMT', type: 'integer' },
                   { name: 'ACCOUNTNO', type: 'string' },
                   { name: 'CMNAME', type: 'string' },
                   { name: 'ACCOUNTNO', type: 'string' },
                   { name: 'CMNAME', type: 'string' },
                   { name: 'REALSTARTDATE', type: 'date' },
                   { name: 'STOPDATE', type: 'date' },
                   { name: 'REALSTOPDATE', type: 'date' },
                   { name: 'FACISNO', type: 'string' },
                   { name: 'BILLPK',type:'string' },
                ]
            };
            var dataAdapter3 = new $.jqx.dataAdapter(options.billNo);
            var data3 = $.extend(true, {}, options.parameters['GetCanChooseBillNo']);
            var aryBill = [];
            if (options.parameters['Account'].rows.length > 0) {
                if (options.parameters['Account'].rows[0]['CitemStr2'.toUpperCase()] != undefined) {
                    if (options.parameters['Account'].rows[0]['CitemStr2'.toUpperCase()] != null) {
                        aryBill = options.parameters['Account'].rows[0]['CitemStr2'.toUpperCase()].replace(/\'/g, '').split(',');
                    };                    
                };                
            };
            data3.rows = $.each(data3.rows, function (index, item) {
                item = $.extend(item, { CHOOSE: false });
                $.each(aryBill, function (i,o) {
                    if (item['billPK'.toUpperCase()] == o) {
                        item['CHOOSE'] = true;
                    };
                })
            });
            options.billNo.localdata = data3.rows;
            $('#' + $(div).prop('id') + 'grdBillNo').jqxGrid({ source: dataAdapter3 });
            $('#' + $(div).prop('id') + 'grdBillNo').jqxGrid('updatebounddata');


        }
        catch (err) {
            errorHandle(formName, 'refreshGrid', err);
        }
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            
            if (options.ACHTDESC != '' & options.ACHTNO != '') {
                QueryCanChooseProduct(div, function () {
                    changeLanguage(div);
                    renderControl(div);
                    refreshGrid(div);
                    addHandler(div);
                })
            } else {
                changeLanguage(div);
                renderControl(div);
                refreshGrid(div);
                addHandler(div);
            }
            
           
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