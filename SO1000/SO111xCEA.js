(function ($) {
    var formName = "SO111xCEA";
    var riadllName = "CableSoft.SO.RIA.Facility.CPEMAC.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Facility.CPEMAC.Web.CPEMAC";
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
        this.custId = null;
        this.fixIPCount = 0;       
        this.faciSeqno = '';
        this.CPEMAC = {};
        this.isEdit = true;
        this.isDelete = true;
        this.isAdd = true;
        this.containerIsWindow = false;
    })
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
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
        },
   
        canView: function (jq, params, param2) {
            //return canView(params, param2);
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
    $.fn.SO111xCEA = function (options, param, param2) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param);
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
                            options: $.extend({}, new defaults(), new SO111xCEA(), options)
                        });
                        formLoaded(this);
                    }
                  
                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO111xCEA_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO111xCEA', err);
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
            };

            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults;
            /*
            var options = $.data(div, formName).options;
            options.length = 0;
            options = null;
            delete options;
            $.data(div, formName, null); */
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
                        initData(div, options.editMode, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                options.containerIsWindow = true;
                                var csw = $.data(div, formName).options.container;
                                csw.on("winClosing", function () {
                                    csw.csWindow('close');
                                });
                            };
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });
            /*
            if (options.loginInfo.loginInfo.value == undefined) {
                options.loginInfo = $.extend(true, {}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            }; */
            /*$.ajax({
                url: 'SO1000\\' + formName + '.html?v=' + formatDateTime(new Date(), "datetime3"),
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        initData(div, options.editMode, function () {
                            $(div).triggerHandler('loaded', [this, options]);                            
                            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                options.containerIsWindow = true;
                                var csw = $.data(div, formName).options.container;
                                csw.on("winClosing", function () {
                                    csw.csWindow('close');
                                });
                            }; 
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
    
    function initData(div, e, action) {
        var options = $.data(div, formName).options;
        try {
            
            unBindHandler(div);
            changeLanguage(div);            
            renderControl(div);
            
            if ($.isEmptyObject(options.CPEMAC)) {
                if ($.isEmptyObject(options.parameters)) {
                    messageBox(options.language.NoParaData, messageType.critical);
                    if ($.isFunction(action)) { action() };
                    return;
                } else {
                    delete options.CPEMAC;
                    if (options.parameters.CPEMAC == undefined) {
                        messageBox(options.language.NoParaData, messageType.critical);
                        if ($.isFunction(action)) { action() };
                        return;
                    };
                    options.CPEMAC = $.extend(true, {}, options.parameters.CPEMAC);
                }                
            } else
            {
                if (options.CPEMAC.CPEMAC != undefined) {
                    options.CPEMAC = $.extend(true, {}, options.CPEMAC.CPEMAC);
                };
            }
            disableAllControls(div);
            refreshGrid(div, function () {
                changeMode(div, function () {
                    bindHandler(div);
                    if ($.isFunction(action)) { action() };
                });
            });
            /*
            disableAllcontrol(div);
            chkMustField(div, function () {
                getAllChangeData(div);
            }); */



        } catch (err) {
            errorHandle(formName, 'initData', err);
        };
    };
    function unBindHandler(div) {
        var headerId = '#' + $(div).prop('id');
        try {
            $(headerId + 'btnEdit').unbind('click');
            $(headerId + 'btnAdd').unbind('click');
            $(headerId + 'grdNormal').unbind('rowselect');
            $(headerId + 'btnCancel').unbind('click');
            $(headerId + 'btnDelete').unbind('click');
            $(headerId + 'btnSave').unbind('click');
        } catch (err) {
            errorHandle(formName, 'unBindHandler', err);
        } finally {

        };
    };
    function bindHandler(div) {
        var headerId = '#' + $(div).prop('id');
        try {
            $(headerId + 'btnEdit').unbind('click');
            $(headerId + 'btnEdit').bind('click', div, btnEditClick);
            $(headerId + 'btnAdd').unbind('click');
            $(headerId + 'btnAdd').bind('click', div, btnAddClick);
            $(headerId + 'grdNormal').unbind('rowselect');
            $(headerId + 'grdNormal').bind('rowselect', div, grdNormalRowselect);
            /*
            $(headerId + 'grdNormal').on('rowselect',div, function (event) {
                alert(event.args.rowindex);
            }); */
            $(headerId + 'btnCancel').unbind('click');
            $(headerId + 'btnCancel').bind('click', div, btnCancelClick);
            $(headerId + 'btnDelete').unbind('click');
            $(headerId + 'btnDelete').bind('click', div, btnDeleteClick)
            $(headerId + 'btnSave').unbind('click');
            $(headerId + 'btnSave').bind('click',div,btnSaveClick);
            
            //$(headerId + 'btnCancel').on('click', function () { alert('yes') });
        } catch (err) {
            errorHandle(formName, 'bindHandler', err);
        } finally {

        }
    };
    function chkDataOK(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            //var ds = { CPEMAC: { Table: {} }};
            var ds = { CPEMAC: {} };
            $.extend(true, ds.CPEMAC, options.CPEMAC);
            /*
            var parameters = $.extend({}, options.loginInfo,
                 { EditMode: { type: 'integer', value: options.editMode } },
                  { dsCPEMAC: { type: 'string', value: ds } },
                 { CPEMAC: { type: 'string', value: $(headerId +'txtCPEMAC').val() } },
                 { IPADDRESS: { type: 'string', value: $(headerId + 'txtIPAddress').val() } },
                 { FaciSeqno: { type: 'string', value: options.faciSeqNo } },
                 { FixIPCount: {type:'integer', value:options.fixIPCount}}); */
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
                { EditMode: { type: 'integer', value: options.editMode } },
                 { dsCPEMAC: { type: 'string', value: ds } },
                { CPEMAC: { type: 'string', value: $(headerId + 'txtCPEMAC').val() } },
                { IPADDRESS: { type: 'string', value: $(headerId + 'txtIPAddress').val() } },
                { FaciSeqno: { type: 'string', value: options.faciSeqNo } },
                { FixIPCount: { type: 'integer', value: options.fixIPCount } });
            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkDataOK',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            if (data.ResultXML != null) {
                                messageBox(data.ResultXML, messageType.yesno, null, function (flag) {
                                    if (flag == 'yes') {
                                        if ($.isFunction(act)) { act() };
                                    } else {
                                        options.editMode = editMode.view;
                                        changeMode(div);
                                        return;
                                    };
                                });
                            };
                            if ($.isFunction(act)) { act() };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            $(headerId + 'txtIPAddress').prop("disabled", false);
                            $(headerId + 'txtCPEMAC').prop('disabled', false);
                            $(headerId + 'btnSave').jqxButton('disabled', false);
                            $(headerId + 'btnCancel').jqxButton('disabled', false);                           
                            $(headerId + 'txtCPEMAC').focus();
                            //changeMode(div);
                            return;
                        }
                    } catch (err) {
                        errorHandle(formName, 'ChkDataOK-Server', err);
                        changeMode(div, options.editMode);
                    } finally {
                        parameters = null;
                        params = null;
                        data = null;
                        ds = null;
                        delete data;
                        delete parameters;
                        delete params;
                        delete ds;
                    };

                }
            });
        } catch (err) {
            options.editMode = editMode.view;
            changeMode(div);
            errorHandle(formName, 'chkDataOK', err);
        } finally {

        };
    };
    function scrTorcd(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var rowIndex = $(headerId + 'grdNormal').jqxGrid('selectedrowindex');
            var Mac = $(headerId + 'txtCPEMAC').val();
            if (Mac != null) {
                if (Mac != '') {
                    Mac = Mac.replace(/[:-]/g, '');
                };
            };
            //var dataIndex = $(headerId + 'grdNormal').jqxGrid('getrowboundindex', rowIndex);           
            switch (options.editMode) {
                case (editMode.append):
                    {
                        var row = {
                            CUSTID: null,
                            FACISNO: null,
                            SEQNO: null,
                            CPEMAC: null,
                            IPADDRESS: null,
                            STOPDATE: null,
                            UPDATETIIME: null
                        };
                        row.STOPDATE = $(headerId + 'txtStopDate').csDateTime('getDate');
                        row.CPEMAC = Mac;
                        row.IPADDRESS = $(headerId + 'txtIPAddress').val();
                        row.CUSTID = options.custId;
                        row.SEQNO = options.faciSeqNo;
                        options.CPEMAC.rows.push(row);
                        break;
                    }
                case (editMode.edit):
                    {                       
                        options.CPEMAC.rows[rowIndex].STOPDATE = $(headerId + 'txtStopDate').csDateTime('getDate');
                        options.CPEMAC.rows[rowIndex].CPEMAC = Mac;
                        options.CPEMAC.rows[rowIndex].IPADDRESS = $(headerId + 'txtIPAddress').val();
                        options.CPEMAC.rows[rowIndex].CUSTID = options.custId;
                        options.CPEMAC.rows[rowIndex].SEQNO = options.faciSeqNo;
                        break;
                    }
            };
            options.editMode = editMode.view;
            if ($.isFunction(act)) { act() };
        } catch (err) {
            options.editMode = editMode.view;
            changeMode(div);
            errorHandle(formName, 'btnSaveClick', err);
        } finally {

        };
    };
    function btnSaveClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return };
        try {
            unBindHandler(event.data);
            disableAllControls(event.data);
            chkDataOK(event.data, function ()
            {
                scrTorcd(event.data,
                  function () {
                      refreshGrid(event.data,
                          function () { changeMode(event.data) })
                  })
            }
            );
        } catch (err) {
            options.editMode = editMode.view;
            errorHandle(formName, 'btnSaveClick', err);
        } finally {
            bindHandler(event.data);
        };
    };
    function btnDeleteClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return };
        unBindHandler(event.data);
        disableAllControls(event.data);
        var fillStopDate = new Date();
        try {
            var rowIndex = $(headerId + 'grdNormal').jqxGrid('selectedrowindex');
            var stopDate = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowIndex, 'STOPDATE');
            if (stopDate != null && stopDate != '') {
                messageBox(options.language.NotStop, messageType.critical);
                changeMode(event.data, function () { bindHandler(event.data) });
                return;
            } else {
                var ipAddress = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowIndex, 'IPADDRESS');
                var CPEMAC = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowIndex, 'CPEMAC');
                options.CPEMAC.rows = $.each(options.CPEMAC.rows, function (index, row) {
                    if (row.IPADDRESS == ipAddress && row.CPEMAC == CPEMAC) {
                        row.STOPDATE = fillStopDate;
                    }
                });               
                refreshGrid(event.data, function () { changeMode(event.data) });
                messageBox(options.language.WasStop, messageType.critical);
            }
        } catch (err) {
            options.editMode = editMode.view;            
            errorHandle(formName, 'btnDeleteClick', err);
        } finally {
            options.editMode = editMode.view;
            changeMode(event.data);
            bindHandler(event.data);
        }
    };
    function btnCancelClick(event) {
        var options = $.data(event.data, formName).options;
        if ($(this).jqxButton('disabled')) { return };
        unBindHandler(event.data);
        disableAllControls(event.data);
        try {            
            if (options.editMode == editMode.view) {
                if (options.containerIsWindow == true) {
                    $(options.container).csWindow('close');
                    return;
                }
            } else {
                options.editMode = editMode.view;
                refreshGrid(event.data,
                        function () {
                            changeMode(event.data,
                                function () { bindHandler(event.data) })
                        }
                    );

            };
        } catch (err) {
            options.editMode = editMode.view;
            changeMode(event.data, function () { bindHandler(event.data) });
            errorHandle(formName, 'btnCancelClick', err);
        } finally {

        };
    };
    function grdNormalRowselect(event) {
        disableAllControls(event.data);
        unBindHandler(event.data);
        try {
            rcdToScr(event.data, event.args.rowindex);
        } catch (err) {
            errorHandle(formName, 'grdNormalRowselect', err);
        } finally {
            changeMode(event.data,
                           function () { bindHandler(event.data) })
        };
    };
    function btnAddClick(event) {
        var options = $.data(event.data, formName).options;
        if ($(this).jqxButton('disabled')) { return };
        try {
            unBindHandler(event.data);
            options.editMode = editMode.append;
            changeMode(event.data);
            bindHandler(event.data);
        } catch (err) {
            errorHandle(formName, 'btnAddClick', err);
        } finally {

        };
    }
    function btnEditClick(event) {
        var options = $.data(event.data, formName).options;
        if ($(this).jqxButton('disabled')) { return };
        try {            
            unBindHandler(event.data);
            options.editMode = editMode.edit;
            changeMode(event.data);
            bindHandler(event.data);
        } catch (err) {
            errorHandle(formName, 'btnEditClick', err);
        } finally {

        };
    }
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
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var height = $(div).innerHeight();
        var  headerId = '#' + $(div).prop('id');
        try {
            //-----------------------------------------------------------------------------
            $(headerId + 'txtCPEMAC').mask('FF:FF:FF:FF:FF:FF', {
                translation:
                    {
                        "F": {
                            pattern: "[0-9a-zA-Z]", optional: true
                        }
                    }
            });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'txtIPAddress').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
                translation: {
                    'Z': {
                        pattern: /[0-9]/, optional: true
                    }
                }
            });
            //-----------------------------------------------------------------------------
            $(headerId + "txtStopDate").csDateTime({
                formatString: 'yyyy/MM/dd HH:mm:ss',
                value: null,
                height: 20,
                width: 150
            });
            controls.push({ name: 'txtStopDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            
           
            $(headerId + 'btnSave').jqxButton( $.extend({}, imagePosition, {
                width: 80,
                height:30,
                imgSrc: imageScr.save.imgSrc,                    
                }) );
            controls.push({ name: 'btnSave', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnAdd').jqxButton($.extend({}, imagePosition, {
                width: 80,
                height: 30,
                imgSrc: imageScr.append.imgSrc,
            }));
            controls.push({ name: 'btnAdd', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnDelete').jqxButton($.extend({}, imagePosition, {
                width: 80,
                height: 30,
                imgSrc: imageScr.delete.imgSrc,
            }));
            controls.push({ name: 'btnDelete', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnEdit').jqxButton($.extend({}, imagePosition, {
                width: 80,
                height: 30,
                imgSrc: imageScr.edit.imgSrc,
            }));
            controls.push({ name: 'btnEdit', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                width: 80,
                height: 30,
                imgSrc: imageScr.cancel.imgSrc,
            }));
            controls.push({ name: 'btnCancel', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            renderGrid(div);
            controls.push({ name: 'grdNormal', type: 'jqxGrid', level: 2 });
            //-----------------------------------------------------------------------------
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        };
    };
    function renderGrid(div) {
        var options = $.data(div, formName).options;
        var lang = options.language;
        var headId = '#' + $(div).attr('id');
        try {
            options.grdNormal = {
                datatype: "json",                
                datafields: [
                   { name: 'CPEMAC', type: 'string' },
                   { name: 'IPADDRESS', type: 'string' },
                   { name: 'STOPDATE', type: 'date' }                  
                ] 
            };
            var dataAdapter1 = new $.jqx.dataAdapter(options.grdNormal);
            var macenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                //value = 'XX';
                var mac = '';
                if (value != null && value != '') {
                    if (value.length == 12) {
                        mac = value.substr(0, 2) + ':' +
                                value.substr(2, 2) + ':' +
                                value.substr(4, 2) + ':' +
                                value.substr(6, 2) + ':' +
                                value.substr(8, 2) + ':' +
                                value.substr(10, 2);
                               
                    };
                };
                return '<div style="text-align:' + columnproperties.cellsalign + ';margin:7px;">' + mac + '</div>';
                /*
                if (value < 20) {
                    return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #0000ff;">' + value + '</span>';
                }
                else {
                    return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
                } */
            }
            $(headId + "grdNormal").jqxGrid({
                width: '100%',
                height: '100%',
                source: dataAdapter1,
                sortable: true,
                altrows: true,
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
                    { text: lang.colCPEMAC, datafield: 'CPEMAC', width: 180, cellsalign: 'center', align: 'center', cellsrenderer: macenderer },
                    { text: lang.colIPAddress, datafield: 'IPADDRESS', width: 180, cellsalign: 'center', align: 'center' },
                    { text: lang.colStopDate, datafield: 'STOPDATE', width: 160, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd HH:mm:ss' },

                ],
                localization: options.localization
            });
        } catch (err) {
            errorHandle(formName, 'renderGrid', err);
        } finally {
           
        };
    };
    function refreshGrid(div, act) {
        var options = $.data(div, formName).options;        
        var headId = '#' + $(div).attr('id');        
        try {
            var rowindex = $(headId + 'grdNormal').jqxGrid('getselectedrowindex');
            if (rowindex == -1) { rowindex = 0 };
            var data1 = $.extend(true, {}, options.CPEMAC);
            options.grdNormal.localdata = data1.rows;            
            $(headId + 'grdNormal').on("bindingcomplete", function (event) {
                $(headId + 'grdNormal').unbind('bindingcomplete');
                $(headId + 'grdNormal').jqxGrid({ selectedrowindex: rowindex });
                rcdToScr(div, rowindex, act);
            });
            $(headId + 'grdNormal').jqxGrid('updatebounddata');
        } catch (err) {
            options.editMode = editMode.view;
            changeMode(div);
            errorHandle(formName, 'refreshGrid', err);
        } finally {
           // $(headId + 'grdNormal').jqxGrid('selectrow', rowindex);
            
        };
    }
    function rcdToScr(div, grdRowIndex, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'txtIPAddress').val(
                    $(headerId + 'grdNormal').jqxGrid('getcellvalue', grdRowIndex, "IPADDRESS")
                );
           
            $(headerId + 'txtCPEMAC').val(function () {
                var mac = $(headerId + 'grdNormal').jqxGrid('getcellvalue', grdRowIndex, "CPEMAC");
                var retValue = '';
                if (mac != null && mac != '') {
                    if (mac.length == 12) {
                        retValue = mac.substr(0, 2) + ':' +
                                mac.substr(2, 2) + ':' +
                                mac.substr(4, 2) + ':' +
                                mac.substr(6, 2) + ':' +
                                mac.substr(8, 2) + ':' +
                                mac.substr(10, 2);
                    };
                };
                return retValue;
                }
             );
           /* 
            $(headerId + 'txtCPEMAC').val(
                    $(headerId + 'grdNormal').jqxGrid('getcellvalue', grdRowIndex, "CPEMAC")
                ); */
            if ($(headerId + 'grdNormal').jqxGrid('getcellvalue', grdRowIndex, "STOPDATE") != null) {
                $(headerId + "txtStopDate").csDateTime('setDate',
                    $(headerId + 'grdNormal').jqxGrid('getcellvalue', grdRowIndex, "STOPDATE"));
            } else {
                $(headerId + "txtStopDate").csDateTime('clear');
            }
            
            if ($.isFunction(act)) { act(); };
            //$(headerId + 'txtCPEMAC').focus();
        } catch (err) {
            errorHandle(formName, 'rcdToScr', err);
        } finally {

        }
    };
    function changeMode(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            disableAllControls(div);
            switch (options.editMode) {
                case (editMode.view):
                    {
                       // $(headerId + 'btnSave').jqxButton('disabled', true);
                        $(headerId + 'btnAdd').jqxButton('disabled', false);
                        $(headerId + 'btnDelete').jqxButton('disabled', false);
                        $(headerId + 'btnEdit').jqxButton('disabled', false);
                        $(headerId + 'btnCancel').jqxButton('disabled', false);
                        $(headerId + 'grdNormal').jqxGrid('disabled', false);                      
                        
                        $(headerId + 'btnCancel').jqxButton({
                            imgSrc: imageScr.exit.imgSrc,
                            value: options.language.btnCancel
                        });  
                        break;
                    };
                case (editMode.edit):
                    {
                        $(headerId + 'txtIPAddress').prop("disabled", false);
                        $(headerId + 'txtCPEMAC').prop('disabled', false);
                        $(headerId + 'btnSave').jqxButton('disabled', false);
                        $(headerId + 'btnCancel').jqxButton('disabled', false);                                              
                        $(headerId+ 'btnCancel').jqxButton({
                            imgSrc: imageScr.cancel.imgSrc,
                            value: options.language.Cancel
                        });   
                        $(headerId + 'txtCPEMAC').focus();
                        break;
                    };
                case (editMode.append):
                    {
                        $(headerId + 'txtIPAddress').val('');
                        $(headerId + 'txtCPEMAC').val('');
                        $(headerId + "txtStopDate").csDateTime('clear');
                        $(headerId + 'txtIPAddress').prop("disabled", false);
                        $(headerId + 'txtCPEMAC').prop('disabled', false);
                        $(headerId + 'btnSave').jqxButton('disabled', false);
                        $(headerId + 'btnCancel').jqxButton('disabled', false);
                        //$(headerId + 'btnCancel').val(options.language.Cancel);
                        //$(headerId + 'btnCancel').text(options.language.Cancel);
                        $(headerId + 'btnCancel').jqxButton({
                            imgSrc: imageScr.cancel.imgSrc,
                            value: options.language.Cancel
                        });
                        $(headerId + 'txtCPEMAC').focus();
                        break;
                    };
            };
            if ($(headerId + 'grdNormal').jqxGrid('getrows').length <= 0 && options.editMode != editMode.append ) {
                options.editMode = editMode.view;
                $(headerId + 'btnAdd').jqxButton('disabled', false);
                $(headerId + 'btnCancel').jqxButton('disabled', false);
                $(headerId + 'grdNormal').jqxGrid('disabled', false);
            };
        } catch (err) {
            errorHandle(formName, 'changeMode', err);
        } finally {
            if (!options.isAdd) { $(headerId + 'btnAdd').jqxButton('disabled', true); };
            if (!options.isDelete) { $(headerId + 'btnDelete').jqxButton('disabled', true); };
            if (!options.isEdit) { $(headerId + 'btnEdit').jqxButton('disabled', true); };
            if ($.isFunction(act)) { act() };
        };
    };
    function disableAllControls(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'txtIPAddress').prop("disabled", true);
            $(headerId + 'txtCPEMAC').prop('disabled', true);
            $(headerId + "txtStopDate").csDateTime('disabled', true);
            $(headerId + 'grdNormal').jqxGrid('disabled', true);
            $(headerId + 'btnSave').jqxButton('disabled', true);
            $(headerId + 'btnAdd').jqxButton('disabled', true);
            $(headerId + 'btnDelete').jqxButton('disabled', true);
            $(headerId + 'btnEdit').jqxButton('disabled', true);
            $(headerId + 'btnCancel').jqxButton('disabled', true);            
        } catch (err) {
            errorHandle(formName, 'disableAllControls', err);
        } finally {

        };
    }
})(jQuery);