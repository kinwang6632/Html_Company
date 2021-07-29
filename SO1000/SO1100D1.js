(function ($) {
    var formName = "SO1100D1";
    var riadllName = "CableSoft.SO.RIA.Customer.Account.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Customer.Account.Web.Account";
    var defaults = (function () {
        this.language = {};
        this.loginInfo = {};                
        this.editMode = 0;
        this.parameters = {};
        this.controls = [];        
        this.containerIsWindow = false;        
        this.theme = '';
        this.localization = null;
    });
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        theme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        setTheme: function (jq, params) {
            return jq.each(function () {
                setTheme(this, params);
            });
        },
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
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
            return [true, ''];
        },
        canAppend: function (jq, params, param2) {
            return [true, ''];
        },
        canEdit: function (jq, params, param2) {
            return [true, '']
        },
        canDelete: function (jq, params, param2) {
            return [true, '']
        },
        canPrint: function (jq, params, param2) {
            return [true, '']
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
    function setTheme(div, params) {
        var controls = $.data(div, formName).options.controls;
        for (i = 0; i < controls.length; i++) {
            var o = $('#' + $(div).prop('id') + controls[i].name);
            if (o.length > 0) {
                $(o[0])[controls[i].type]({ theme: params });
            }
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
            var headerId = '#' + $(div).prop('id');
            $(headerId + 'grdData').off('rowselect');
            var controls = $.data(div, formName).options.controls;
            for (j = 3; j >= 0; j--) {
                for (i = 0; i < controls.length; i++) {
                    if (controls[i].level == j) {
                        var o = $('#' + $(div).prop('id') + controls[i].name);
                        if (o.length > 0) {
                            $(o[0]).off();
                            $(o[0])[controls[i].type]('destroy');
                        }
                    }
                }
            };
            
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
        }
    };
    $.fn.SO1100D1 = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new SO1100D1(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1100D1_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1100D1', err);
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
                        initData(div, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                options.containerIsWindow = true;
                                /*
                                var csw = $.data(div, formName).options.container;
                                csw.on("winClosing", function () {
                                    csw.csWindow('close');
                                }); */
                            };
                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });
          
            
        }   catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }



    };

    
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var controls = options.controls;
        var lang = options.language;
        try {
            //-----------------------------------------------------------------------------
            $(headerId + 'txtMemo').jqxTextArea({
               // placeHolder: $.data(div).SO1112A.options.language.lblMemo,
                height: '99%',
                width: '99%',
                minLength: 1,
                disabled:true
            });
            controls.push({ name: 'txtMemo', type: 'jqxTextArea', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            options.grdData = {
                datatype: "json",
            };
            var dataAdapter1 = new $.jqx.dataAdapter(options.grdData);
            $(headerId + 'grdData').jqxGrid({
                width: '99.7%',
                height: '99%',
                sortable: true,
                altrows: true,
                editable: false,
                source: dataAdapter1,
                columnsresize: true,
                columns: [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 30,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:6px;'>" + (value + 1) + "</div>";
                            
                        }
                    },
                    {
                        text: lang.colRecordType,
                        datafield: 'RECORDTYPE',
                        width: 90,
                        editable: false,
                        cellsalign: 'center',
                        align: 'center',
                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                            return cellsrenderer(row,columnfield,value,defaulthtml,columnproperties,lang)
                        }
                    },
                    { text: lang.colAchtNo, datafield: 'ACHTNO', width: 80, editable: false, cellsalign: 'center', align: 'center' },
                    { text: lang.colAchDesc, datafield: 'ACHDESC', width: 150, editable: false, cellsalign: 'center', align: 'center' },
                    {
                        text: lang.colAchDesc, datafield: 'AUTHORIZESTATUS', width: 100, editable: false, cellsalign: 'center', align: 'center',
                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                            return cellsrenderer(row, columnfield, value, defaulthtml, columnproperties, lang)
                        }
                    },
                    { text: lang.colCitemNameStr, datafield: 'CITEMNAMESTR', width: 300, editable: false },
                    {
                        text: lang.colStopFlag, datafield: 'STOPFLAG', width: 50, cellsalign: 'center', align: 'center', editable: false,
                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                            return cellsrenderer(row, columnfield, value, defaulthtml, columnproperties, lang)
                        }
                    },
                    { text: lang.colStopDate, datafield: 'STOPDATE', width: 100, editable: false, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colUpdEn, datafield: 'UPDEN', width: 100, editable: false, cellsalign: 'center', align: 'center' },
                    { text: lang.colUpdTime, datafield: 'UPDTIME', width: 150, editable: false, cellsalign: 'center', align: 'center' },
                    { text: lang.colNote, datafield: 'NOTES', width: 10, editable: false, hidden: true }
                ],
                localization: options.localization
            });
            controls.push({ name: 'grdData', type: 'jqxGrid', level: 2 });
            //-----------------------------------------------------------------------------
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        };
    };
    //row, columnfield, value, defaulthtml, columnproperties
    function cellsrenderer(row, columnfield, value, defaulthtml, columnproperties,lang) {
        //var lang = new SO1100D1();
        try {
            switch (columnfield.toUpperCase()) {
                case ('RECORDTYPE'): {
                    if (value == 1) {
                        return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + lang.CancelACH + '</div>'
                    } else {
                        return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + lang.ApplyACH + '</div>'
                        //return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + options.language.ApplyACH + '</div>'
                    };
                    break;
                };
                case ('AUTHORIZESTATUS'): {
                    switch (value) {
                        case 1: {
                            return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + lang.ApplyOK + '</div>'
                            break;
                        };
                        case 2: {
                            return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + lang.ACHCancelOK + '</div>'
                            break;
                        };
                        case 3: {
                            return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + lang.ACHFail + '</div>'
                            break;
                        };
                        case 4: {
                            return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + lang.ACHWait + '</div>'
                            break; 
                        }
                        default: {
                            return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + lang.ApplyACHing + '</div>'
                            break;
                        }
                    };
                    break;
                };
                case ('StopFlag'.toUpperCase()): {
                    if (value == 0) {
                        return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + lang.chkNo + '</div>'
                    } else {
                        return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';color:red;">' + lang.chkOK + '</div>'
                    };
                    break;
                };
                default: { return value };
            };
        } finally {
           
        };
      
    }
    function chkMustField(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            if (options.parameters['Data'] == undefined) {
                messageBox(options.language.NoParaData, messageType.critical);
                return false;
            };
            if (options.parameters['Data']['Account'] == undefined) {
                messageBox(options.language.NoMasterData, messageType.critical);
                return false;
            };
            if (options.parameters['Data']['Account'].rows[0]['MasterId'.toUpperCase()] == null) {
                messageBox(options.language.NoAccMasterData, messageType.critical);
                return false;
            };
            if ($.isFunction(action)) { action() };
            return true;
        } catch (err) {
            errorHandle(formName, 'chkMustField', err);
        } finally {

        };
    };
    function queryData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var masterId = options.parameters['Data']['Account'].rows[0]['MasterId'.toUpperCase()];
        try {
            var parameters = $.extend({}, options.copyLoginInfo,
               { MasterId: { type: 'integer', value: masterId } });
            var params = getParameters(riadllName,
                  riaClassName,
                  'QueryAccountDetail',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            options.grdData.localdata = $.extend({}, tmp.Table);
                            $(headerId + 'grdData').one('bindingcomplete', function (event) {
                                if ($(this).jqxGrid('getrows').length > 0) {
                                    $(this).jqxGrid({ selectedrowindex: 0 });
                                    /*
                                    if ($(this).jqxGrid('getcelltext', 0, "NOTES") != undefined) {
                                        $(headerId + 'txtMemo').jqxTextArea('val',
                                            $(this).jqxGrid('getcelltext', 0, "NOTES")
                                        );
                                    };*/                                    
                                } else { return;}                                                                
                            });
                            $(headerId + 'grdData').on('rowselect', function (event) {
                                $(headerId + 'txtMemo').jqxTextArea('val', '');
                                if (event.args.row.NOTES != undefined) {
                                    $(headerId + 'txtMemo').jqxTextArea('val',
                                           event.args.row.NOTES
                                       );
                                };
                                
                            });
                            $(headerId + 'grdData').jqxGrid('updatebounddata');
                            delete tmp;
                            tmp = null;
                            if ($.isFunction(action)) { action(); };
                        
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            //changeMode(div);
                        }
                    } catch (err) {
                        errorHandle(formName, 'queryData-Server', err);
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
            errorHandle(formName, 'queryData', err);
        } finally {

        };
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;

        try {
            //unBindHandler(div);
            changeLanguage(div);
            options.copyLoginInfo = getParaLoginInfo(div, formName);
            renderControl(div);
            if (!chkMustField(div)) { return; };
            queryData(div);
            //refreshGrid(div);
        } catch (err) {
            errorHandle(formName, 'initData', err);
            if ($.isFunction(action)) { action(); };
        } finally {
            //bindHandler(div);
        }
    };
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var idArray = $('*[id^=' + $(div).prop('id') + ']');
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