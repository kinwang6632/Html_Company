(function ($) {
    var formName = 'SO3318C';
    var gridHeight = 25;
    $.fn[formName] = function (options, param, param2, params3) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, param2, params3);
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
                        options: $.extend({}, new defaults(), new SO3318B(), options)
                    });
                    init(this);
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
        this.isOrder = false;
        this.orderNo = null;
        this.childLoaded = [];
        this.tabContainer = null;
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
            var sHeight = $(div).height() - buttonsHeight * 2;
            getControlObject(div, 'gbxData').jqxPanel({ height: sHeight });
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            destroyControls(controls);
            var options = $.data(div, formName).options;
            deleteJSONObject(options);
            $.data(div, formName, null);

            //var controls = $.data(div, formName).options.controls;
            //destroyControls(controls);
            //var options = $.data(div, formName).options
            //options.length = 0;
            //options = null;
            //$.data(div, formName, null);
            //$(div).off();
            ////$(div).remove();
            return true;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    };    
    function init(div, action) {
        try {
            var options = $.data(div, formName).options;
            changeLanguage(div, formName);
            renderControl(div);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
    function renderControl(div) {
        try {
            renderDetailGrid(div, 0);
            return;
        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function renderDetailGrid(div, level) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var gridId = $(div).prop('id') + 'gData';
            $("<div id='" + gridId + "'></div>").appendTo($(div));
            options.gridSource = {
                datatype: "json",
                localdata: options.parameters["ErrData"],
                datafields: [{ name: 'ENTRYNO', type: 'integer' },
                            { name: 'BILLNO', type: 'string' },
                            { name: 'CUSTID', type: 'integer' },
                            { name: 'CUSTSTATUSNAME', type: 'string' },
                            //{ name: 'WIPSTATUSNAME', type: 'string' },
                            { name: 'CUSTNAME', type: 'string' },
                            { name: 'CITEMNAME', type: 'string' },
                            { name: 'REALPERIOD', type: 'integer' },
                            { name: 'REALAMT', type: 'integer' },
                            { name: 'REALSTARTDATE', type: 'date' },
                            { name: 'REALSTOPDATE', type: 'date' },
                            { name: 'CMNAME', type: 'string' },
                            { name: 'PTNAME', type: 'string' },
                            { name: 'PRTSNO', type: 'string' },
                            { name: 'MEDIABILLNO', type: 'string' },
                            { name: 'NOTE', type: 'string' },
                            { name: 'UPDEN', type: 'string' },
                            { name: 'UPDTIME', type: 'string' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(options.gridSource);
            $('#' + gridId).jqxGrid(
            {
                width: '100%',
                height: '99.3%',
                source: dataAdapter,
                sortable: true,
                altrows: true,
                columnsresize: true,
                columnsheight: gridHeight,
                editable: false,
                columns: [
                    { text: lang.gData_ERRORNOTE, editable: false, datafield: 'NOTE', width: 120 },
                    { text: lang.gData_ENTRYNO, editable: false, align: "right", cellsalign: "right", datafield: 'ENTRYNO', width: 40 },
                    { text: lang.gData_BILLNO, editable: false, datafield: 'BILLNO', width: 120 },
                    { text: lang.gData_CUSTID, editable: false, align: "right", cellsalign: "right", datafield: 'CUSTID', width: 60 },
                    { text: lang.gData_CUSTSTATUSNAME, editable: false, datafield: 'CUSTSTATUSNAME', width: 70 },
                    //{ text: lang.gData_WIPSTATUSNAME, editable: false, datafield: 'WIPSTATUSNAME', width: 80 },
                    { text: lang.gData_CUSTNAME, editable: false, datafield: 'CUSTNAME', width: 100 },

                    { text: lang.gData_CITEMNAME, editable: false, datafield: 'CITEMNAME', width: 130 },
                    { text: lang.gData_REALPERIOD, editable: false, align: "right", cellsalign: "right", datafield: 'REALPERIOD', width: 50 },
                    { text: lang.gData_REALAMT, editable: false, align: "right", cellsalign: "right", datafield: 'REALAMT', width: 70 },
                    { text: lang.gData_REALSTARTDATE, editable: false, datafield: 'REALSTARTDATE', cellsformat: 'yyyy/MM/dd', width: 80 },
                    { text: lang.gData_REALSTOPDATE, editable: false, datafield: 'REALSTOPDATE', cellsformat: 'yyyy/MM/dd', width: 80 },

                    { text: lang.gData_CMNAME, editable: false, datafield: 'CMNAME', width: 60 },
                    { text: lang.gData_PTNAME, editable: false, datafield: 'PTNAME', width: 60 },
                    { text: lang.gData_PRTSNO, editable: false, datafield: 'PRTSNO', width: 100 },
                    { text: lang.gData_MEDIABILLNO, editable: false, datafield: 'MEDIABILLNO', width: 100 },

                    { text: lang.gData_UPDEN, editable: false, datafield: 'UPDEN', width: 100 },
                    { text: lang.gData_UPDTIME, editable: false, datafield: 'UPDTIME', width: 100 },
                ],
                theme: options.theme,
                localization: options.localization
            });
            options.controls.push({ name: gridId, type: 'jqxGrid', level: level });
        }
        catch (err) {
            errorHandle(formName, 'renderDetailGrid', err);
        }
    };
    function close(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                $(options.container).csWindow('close');
            }
        }
        catch (err) {
            errorHandle(formName, 'close', err);
        }
    };
})(jQuery);