(function ($) {
    var formName = "SO3311B";
    var riadllName = "CableSoft.SO.RIA.Billing.Batch.EnterPay.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Billing.Batch.EnterPay.Web.EnterPay";
    var copyLoginInfo = {};
    var dsCitemPara = {};
    var grdData = null;
    var otherForm = [];
    var defaults = (function () {
        this.language = {};
        this.initData = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.parameters = {};
        this.controls = [];
        this.containerIsWindow = false;
        this.theme = '';
        this.localization = null;
    });
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close');

    };
    function formDestroy(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = $.data(div, formName).options.controls;
            unBindHandler(div);
            
            
            /*
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
            }; */
            otherForm.forEach(function (element) {
                $(element[0]).off();
                $(element[0])[element[1]]('destroy');
            });
            otherForm.length = 0;
            otherForm = null;
            destroyControls(controls);
            deleteJSONObject(options);
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
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        setTheme: function (jq, params) {
            return jq.each(function () {
                setTheme(this, params);
            });
        },
        theme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        close: function (jq) {
            return jq.each(function () {
                formClosed(this);
            });
        },
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
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
            return [true, ''];
        },
        canDelete: function (jq, params, param2) {
            return [true, ''];
        },
        canPrint: function (jq, params, param2) {
            return [true, ''];
        }
    };
    $.fn.SO3311B = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new SO3311B(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3311B_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3311B', err);
        }
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            copyLoginInfo = getParaLoginInfo(div, formName);
            loadForm(options,
                'SO3000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div,formName);

                        initData(div, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class') != undefined) {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    var csw = $.data(div, formName).options.container;
                                    options.containerIsWindow = true;
                                    csw.on("winClosing", function () {
                                        exitApp(div);
                                    });
                                };
                            }

                        });
                    }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });
            /*$.ajax({
                url: 'SO3000\\' + formName + '.html?v=' + formatDateTime(new Date(), "datetime3"),
                type: "get",
                datatype: 'html',
                success: function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);

                        initData(div, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class') != undefined) {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    var csw = $.data(div, formName).options.container;
                                    options.containerIsWindow = true;
                                    csw.on("winClosing", function () {
                                        exitApp(div);
                                    });
                                };
                            }

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
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            //unBindHandler(div);
            otherForm = [];
            changeLanguage(div);
            renderControl(div);
            $(headerId + 'csClctEn').csList('source', options.parameters.ClctEn.rows);
            $(headerId + 'csCMCode').csList('source', options.parameters.CMCode.rows);
            $(headerId + 'csPTCode').csList('source', options.parameters.PTCode.rows);
            $(headerId + 'csSTCode').csList('source', options.parameters.STCode.rows);
            QueryTempInfo(div, function () {
                setDefaultValue(div);               
                bindHandler(div);
            });
            if ($.isFunction(action)) { action(); };
        } catch (err) {
            errorHandle(formName, 'initData', err);
            if ($.isFunction(action)) { action(); };
        } finally {
            
        }
    };
    function QueryTempInfo(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            var parameters = $.extend({}, copyLoginInfo,
                    { EnterType: { type: 'integer', value: 0 } });
            var params = getParameters(riadllName,
                  riaClassName,
                  'GetTempInfo',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                        } else {
                            if (data.ResultXML != '') {
                                var d = JSON.parse(data.ResultXML);
                                //$(headerId + 'edtResvTime').jqxDateTimeInput('setDate', d);
                                $(headerId + 'txtBillCnt').text(d.Table.rows[0]['BillCount'.toUpperCase()].toString());
                                $(headerId + 'txtTotalAmt').text(d.Table.rows[0]['AmtCount'.toUpperCase()].toString());
                                delete d;
                                d = null;
                            };
                        };
                    } catch (err) {

                        errorHandle(formName, 'GetTempInfo-Server', err);
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

            if ($.isFunction(action)) { action(); };
        } catch (err) {
            errorHandle(formName, 'QueryTempInfo', err);
        } finally {

        };
    };
    function unBindHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'tedBillNo').unbind('keydown');
        $(headerId + 'btnExit').unbind('click');
        $(headerId + 'btnDelete').unbind('click');
        $(headerId + 'btnQuery').unbind('click');
        $(headerId + 'dteCMDate').unbind('blur');
    };
    function bindHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'tedBillNo').unbind('keydown')
        $(headerId + 'tedBillNo').on('keydown', div, tedBillNoChanged);
        $(headerId + 'btnExit').unbind('click');
        $(headerId + 'btnExit').bind('click', div, btnExitClick);
        $(headerId + 'btnDelete').unbind('click');
        $(headerId + 'btnDelete').bind('click', div, btnDeleteClicked);
        $(headerId + 'btnQuery').unbind('click');
        $(headerId + 'btnQuery').bind('click', div, btnQueryClicked);
        $(headerId + 'dteCMDate').unbind('blur');
        $(headerId + 'dteCMDate').bind('blur', div, dteCMDateChange);
    };
    function dteCMDateChange(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).csDateTime('getText') == null) { return; };
        try {
            var parameters = $.extend(true, {}, copyLoginInfo, {
                CloseDate: { type: 'string', value: $(this).csDateTime('getText') },
                ServiceType: { type: 'string', value: null },
            });

            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkCloseDate',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            isChkCloseDate = true;
                        }
                        else {
                            isChkCloseDate = false;
                            messageBox(data.ErrorMessage, messageType.critical, null, function (flag) {
                                $(headerId + 'dteCMDate').csDateTime('focus');
                            });
                            //messageBox(data.ErrorMessage, messageType.critical);

                        }
                    } catch (err) {
                        errorHandle(formName, 'ChkCloseDate-Server', err);
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
            errorHandle(formName, 'ChkCloseDate', err);
        } finally {

        };
    };
    function btnQueryClicked(event) {
        if ($(this).jqxButton('disabled')) { return; };
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        queryEnterData(event.data);
    };
    function btnDeleteClicked(event) {
        if ($(this).jqxButton('disabled')) { return; };
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        var selectedrowindex = $(headerId + 'grdCharge').jqxGrid('selectedrowindex');
        if (selectedrowindex >= 0) {
            if ($(headerId + 'grdCharge').jqxGrid('getcellvalue', selectedrowindex, "CANCELFLAG") == 1) {
                messageBox(options.language.NotCancel, messageType.critical);
                return;
            };
        };
        
        chkCanCancel(event.data);
    };
    function queryEnterData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var parameters = $.extend({}, copyLoginInfo,
                  { EnterType: { type: 'integer', value: 0 } });
        var params = getParameters(riadllName,
                 riaClassName,
                 'QueryEnterData',
                 JSON.stringify(parameters));
        getServerData(params, {
            success: function (data) {
                try {
                    if (!data.ResultBoolean) {
                        messageBox(data.ErrorMessage, messageType.critical);
                        return;
                    } else {
                        if (data.ResultXML != '') {
                            var d = JSON.parse(data.ResultXML);
                            if (d.Temp.rows.length == 0) {
                                messageBox(options.language.NoData, messageType.critical);
                            } else {
                                showSO3311E(div, $.extend(true, {},d));
                            }                           
                            delete d;
                            d = null;
                        } else {
                            messageBox(options.language.NoData, messageType.critical);
                            //$(options.container).csWindow('close');
                        };
                    };
                   
                } catch (err) {

                    errorHandle(formName, 'queryEnterData-Server', err);
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
    };
    function showSO3311E(div,qryData) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var winOptions = $.extend({}, {
            width: 800, height: 500,
            maxWidth: $(options.container).csWindow('width'),
            maxHeight: $(options.container).csWindow('height'),
            keyboardCloseKey: 'none',
            resizable: true,
            haveClosing: false,
        });
        var result = createcsWindow(div, options.language.ShowForm2, winOptions);
        var xp = 'center';
        var yp = 0;
        if (options.containerIsWindow) {
            xp = ($(options.container).csWindow('width') - $('#' + result['windowId']).csWindow('width')) / 2;
            yp = ($(options.container).csWindow('height') - $('#' + result['windowId']).csWindow('height')) / 2;
        };
        $('#' + result['windowId']).csWindow({ position: { x: xp, y: 0 } });
      
        $('#' + result['contentId']).SO3311E($.extend({}, {
            loginInfo: cloneJSON( options.loginInfo),
            container: '#' + result['windowId'],           
            enterType: 0,
            parameters: {},
            viewData: cloneJSON(qryData),
            editMode: options.editMode,
            localization:cloneJSON( options.localization)
        }));
        otherForm.push(['#' + result['contentId'], 'SO3311E']);
        otherForm.push(['#' + result['windowId'], 'csWindow']);
        $('#' + result['contentId']).on('loaded', function () {
            $('#' + result['contentId']).off('loaded');
            reverseControlState(div, true);
        });
        $('#' + result['windowId']).on('close',
               function () {
                   otherForm.length = 0;
                   otherForm = [];
                   $('#' + result['windowId']).off('close');
                   try {
                       ret = $('#' + result['contentId']).SO3311E('options');
                       // deleting has been deleted billno 
                       if (ret.delBillNo.length > 0) {
                           $.each(ret.delBillNo, function (index, value) {
                               var rows = $(headerId + 'grdCharge').jqxGrid('getrows');
                               $.each(rows, function (idx, row) {
                                   if (row != undefined) {
                                       if (row.BILLNO == value.billno && row.ITEM == value.item) {
                                           var id = $(headerId + "grdCharge").jqxGrid('getrowid', idx);
                                           $(headerId + "grdCharge").jqxGrid('deleterow', id);
                                       };
                                   };
                               });
                               
                           });


                           /*
                           var rows = $(headerId + 'grdCharge').jqxGrid('getrows');
                           $.each(rows, function (idx, row) {
                               $.each(ret.delBillNo, function (index, value) {
                                   if (row != undefined) {
                                       if (row.BILLNO == value.billno && row.ITEM == value.item) {
                                           var id = $(headerId + "grdCharge").jqxGrid('getrowid', idx);
                                           $(headerId + "grdCharge").jqxGrid('deleterow', id);
                                       };
                                   };
                                   
                               });
                           }); */
                            
                           $(headerId + 'txtBillCnt').text(function () {
                               return parseInt($(this).text()) - ret.delBillNo.length;
                           });
                           $(headerId + 'txtTotalAmt').text(function () {
                               return parseInt($(this).text()) - ret.delAmount;
                           });
                       };
                       $('#' + result['windowId']).off('close');
                       $('#' + result['contentId']).SO3311E('destroy');
                       $('#' + result['windowId']).csWindow('destroy');
                       
                   } catch (err) {
                       errorHandle(formName, 'SO3311E_windowClose', err);
                   } finally {
                       reverseControlState(div, false);
                   };
               });
    };
    function chkCanCancel(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var selectedrowindex = $(headerId + 'grdCharge').jqxGrid('selectedrowindex');
        if (selectedrowindex < 0) { selectedrowindex = 0; };
        var parameters = $.extend({}, copyLoginInfo,
                   { CitemCode: { type: 'string', value: $(headerId + 'grdCharge').jqxGrid('getcellvalue', selectedrowindex, "CITEMCODE") } });
        var params = getParameters(riadllName,
                  riaClassName,
                  'ChkCanCancel',
                  JSON.stringify(parameters));
        getServerData(params, {
            success: function (data) {
                try {
                    if (!data.ResultBoolean) {
                        messageBox(data.ErrorMessage, messageType.critical);
                        return;
                    } else {
                        showSO3311F(div);
                    };
                } catch (err) {

                    errorHandle(formName, 'CancelAllBillData-Server', err);
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
    };
    function showSO3311F(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var winOptions = $.extend({}, {
            width: 380, height: 200,
            maxWidth: $(options.container).csWindow('width'),
            maxHeight: $(options.container).csWindow('height'),
            keyboardCloseKey: 'none',
            resizable: true,
            haveClosing: false,
        });
        var result = createcsWindow(div, options.language.ShowForm3, winOptions);
        var xp = 'center';
        var yp = 0;
        if (options.containerIsWindow) {
            xp = ($(options.container).csWindow('width') - $('#' + result['windowId']).csWindow('width')) / 2;
            yp = ($(options.container).csWindow('height') - $('#' + result['windowId']).csWindow('height')) / 2;
        };
        $('#' + result['windowId']).csWindow({ position: { x: xp, y: 0 } });
        var selectedrowindex = $(headerId + 'grdCharge').jqxGrid('selectedrowindex');
        if (selectedrowindex < 0) { selectedrowindex = 0; };
        $('#' + result['contentId']).SO3311F($.extend({}, {
            loginInfo: cloneJSON( options.loginInfo),
            container: '#' + result['windowId'],
            billno : $(headerId + 'grdCharge').jqxGrid('getcellvalue', selectedrowindex, "BILLNO"),
            item: $(headerId + 'grdCharge').jqxGrid('getcellvalue', selectedrowindex, "ITEM"),
            enterType : 0,
            parameters: {},
            editMode: options.editMode,
            localization:cloneJSON( options.localization)
        }));
        otherForm.push(['#' + result['contentId'], 'SO3311F']);
        otherForm.push(['#' + result['windowId'], 'csWindow']);
        $('#' + result['contentId']).on('loaded', function () {
            $('#' + result['contentId']).off('loaded');
            reverseControlState(div,true);
        });
        $('#' + result['windowId']).on('close',
               function () {
                   otherForm.length = 0;
                   otherForm = [];
                   $('#' + result['windowId']).off('close');
                   try {
                       ret = $('#' + result['contentId']).SO3311F('options');
                      
                       if (ret.isSaved) {
                           $(headerId + "grdCharge").jqxGrid('setcellvalue', selectedrowindex, "CANCELFLAG", 1);
                       };
                       $('#' + result['windowId']).off('close');
                       $('#' + result['contentId']).SO3311F('destroy');
                       $('#' + result['windowId']).csWindow('destroy');
                   
                   } catch (err) {
                       errorHandle(formName, 'SO3311F_windowClose', err);
                   } finally {
                       reverseControlState(div,false);                     
                   };
               });
    };
    function btnExitClick(event) {
        if ($(this).jqxButton('disabled')) { return; };
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        exitApp(event.data);
      
    };
    function exitApp(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            var parameters = $.extend({}, copyLoginInfo,
                  { EnterType: { type: 'integer', value: 0 } });

            var params = getParameters(riadllName,
                  riaClassName,
                  'GetTempInfo',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                        } else {
                            if (data.ResultXML != '') {
                                var d = JSON.parse(data.ResultXML);
                                if (d.Table.rows.length == 0) {
                                    $(options.container).csWindow('close');
                                } else {
                                    if (d.Table.rows[0]['BillCount'.toUpperCase()] == 0) {
                                        $(options.container).csWindow('close');
                                    } else {
                                        showSO3311D(div);
                                    };
                                };
                                delete d;
                                d = null;
                            } else {
                                $(options.container).csWindow('close');
                            };
                        };
                    } catch (err) {

                        errorHandle(formName, 'GetTempInfo-Server', err);
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
            errorHandle(formName, 'exitApp', err);
        } finally {

        };
    };
    function showSO3311D(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');        
        var winOptions = $.extend({}, {
            width: 300, height: 150,
            maxWidth: $(options.container).csWindow('width'),
            maxHeight: $(options.container).csWindow('height'),
            keyboardCloseKey: 'none',
            resizable: true,
            haveClosing: false,
        });
        var result = createcsWindow(div, options.language.EndForm, winOptions);
        var xp = 'center';
        var yp = 0;
        if (options.containerIsWindow) {
            xp = ($(options.container).csWindow('width') - $('#' + result['windowId']).csWindow('width')) / 2;
            yp = ($(options.container).csWindow('height') - $('#' + result['windowId']).csWindow('height')) / 2;
        };
        $('#' + result['windowId']).csWindow({ position: { x: xp, y: 0 } });
        
        $('#' + result['contentId']).SO3311D($.extend({}, {
            loginInfo: cloneJSON(options.loginInfo),
            container: '#' + result['windowId'],           
            enterType: 0,
            parameters: cloneJSON(options.parameters.Parameters),
            editMode: options.editMode,
            localization: cloneJSON(options.localization)
        }));
        otherForm.push(['#' + result['contentId'], 'SO3311D']);
        otherForm.push(['#' + result['windowId'], 'csWindow']);
        $('#' + result['contentId']).on('loaded', function () {
            $('#' + result['contentId']).off('loaded');
            reverseControlState(div, true);
        });
        $('#' + result['windowId']).on('close',
               function () {
                   otherForm.length = 0;
                   otherForm = [];
                   $('#' + result['windowId']).off('close');
                   try {
                       var ret = $('#' + result['contentId']).SO3311D('options');
                       if (ret.isSaved) {
                           //$(options.container).csWindow('close');
                           $(headerId + "grdCharge").jqxGrid('clear');
                       } else {
                           
                       };
                       reverseControlState(div, false);
                       $('#' + result['windowId']).off('close');
                       $('#' + result['contentId']).SO3311D('destroy');
                       $('#' + result['windowId']).csWindow('destroy');
                      
                   } catch (err) {
                       errorHandle(formName, 'SO3311D_windowClose', err);
                   } finally {
                      // 
                   };
               });
    };
    function tedBillNoChanged(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if (event.which == 13) {
            event.preventDefault();
            if ($(this).jqxInput('val') == null || $(this).jqxInput('val') == '') {
                return;
            };
            if ($(headerId + 'dteCMDate').csDateTime('getText') == null) {
                messageBox(options.language.MustBillDate, messageType.critical);
                return;
            };
            prepareData(event.data);
            $(headerId + 'grdCharge').jqxGrid('clear');
            $(headerId + 'btnDelete').jqxButton({ disabled: true });
            entryBillData(event.data);
        };        
    };
    function renderGrid(div) {
        var options = $.data(div, formName).options;               
        var headId ='#' + $(div).attr('id');
        delete grdData;
        grdData = null;
      
        grdData = {
            datatype: 'json',
            datafields: [
                   { name: 'BILLNO', type: 'string' },
                   { name: 'ITEM', type: 'string' },
                   { name: 'CITEMCODE', type: 'integer' },
                   { name: 'CUSTID', type: 'integer' },
                   { name: 'CITEMNAME', type: 'string' },
                   { name: 'SHOULDAMT', type: 'integer' },
                   { name: 'REALPERIOD', type: 'integer' },
                   { name: 'REALAMT', type: 'integer' },
                   { name: 'REALSTARTDATE', type: 'date' },
                   { name: 'REALSTOPDATE', type: 'date' },
                   { name: 'CANCELFLAG', type: 'integer' },
                   { name: 'NOTE', type: 'string' },
                  
            ]
        };
        var dataAdapter1 = new $.jqx.dataAdapter(grdData);
        $(headId + 'grdCharge').jqxGrid({ source: dataAdapter1 });
    };

    function entryBillData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            var parameters = $.extend({}, copyLoginInfo,
                    { EnterType: { type: 'integer', value: 0 } },
                    { BillNo: {type:'string',value:$(headerId +'tedBillNo').val()}},
                    { dsCitemPara: {type:'string',value:dsCitemPara}},
                    { UCRefNo: { type: 'integer', value: 3 } });

            var params = getParameters(riadllName,
                  riaClassName,
                  'EntryBillData',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            //messageBox(data.ErrorMessage, messageType.critical);
                            messageBox(data.ErrorMessage, messageType.critical, null, function (flag) {
                                $(headerId + 'tedBillNo').jqxInput('val', null);
                                $(headerId + 'tedBillNo').jqxInput('focus');
                            });
                        } else {
                            if (data.ResultXML != '') {
                                var d = JSON.parse(data.ResultXML);
                                if (d.OK.rows.length > 0) {
                                    if (d.OK.rows[0].WaringMsg != null && d.OK.rows[0].WaringMsg != '') {
                                        messageBox(d.OK.rows[0].WaringMsg, messageType.critical, null, function (flag) {
                                            $(headerId + 'tedBillNo').jqxInput('val', null);
                                            $(headerId + 'tedBillNo').jqxInput('focus');
                                        });
                                    };
                                    $(headerId + 'btnDelete').jqxButton({ disabled: false });
                                    $(headerId + 'tedBillNo').jqxInput('val', null);
                                    $(headerId + 'tedBillNo').jqxInput('focus');
                                };
                                grdData.localdata = d.OK.rows;
                                $(headerId + 'grdCharge').on('bindingcomplete', function (event) {
                                    $(this).jqxGrid({ selectedrowindex: 0 });
                                });
                                $(headerId + 'grdCharge').jqxGrid('updatebounddata');
                                
                                $(headerId + 'txtBillCnt').text(d.Info.rows[0].BILLCOUNT);
                                $(headerId + 'txtTotalAmt').text(d.Info.rows[0].AMTCOUNT);
                                delete d;
                                d = null;
                            };
                        };
                    } catch (err) {

                        errorHandle(formName, 'GetTempInfo-Server', err);
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
            errorHandle(formName, 'entryBillData-Server', err);
        }
    };
    function prepareData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        delete dsCitemPara;
        dsCitemPara = {};
        dsCitemPara = { Parameters: {} };
        //copy schema
        $.extend(true, dsCitemPara.Parameters, options.parameters.Parameters);
        //empty rows
        $.each(dsCitemPara.Parameters.columns, function (index, value) {
            switch ( value.name.toUpperCase()) {
                case 'RealAmt'.toUpperCase():
                    break;
                case 'Period'.toUpperCase():
                    break;
                case 'ClctYM'.toUpperCase():
                    break;
                default:
                    dsCitemPara.Parameters.rows[0][value.name] = null;
            };            
            
        });

        dsCitemPara.Parameters.rows[0]['EnterType'.toUpperCase()] = 0;
        dsCitemPara.Parameters.rows[0]['BillCount'.toUpperCase()] =
                        parseInt($(headerId + 'txtBillCnt').text());
        if ($(headerId + 'csClctEn').csList('codeNo') != '') {
            dsCitemPara.Parameters.rows[0]['ClctEn'.toUpperCase()] = $(headerId + 'csClctEn').csList('codeNo');
            dsCitemPara.Parameters.rows[0]['ClctName'.toUpperCase()] = $(headerId + 'csClctEn').csList('description');
        };

        dsCitemPara.Parameters.rows[0]['RealDate'.toUpperCase()] = $(headerId + 'dteCMDate').csDateTime('getDate');

        if ($(headerId + 'csCMCode').csList('codeNo') != '') {
            dsCitemPara.Parameters.rows[0]['CMCode'.toUpperCase()] = $(headerId + 'csCMCode').csList('codeNo');
            dsCitemPara.Parameters.rows[0]['CMName'.toUpperCase()] = $(headerId + 'csCMCode').csList('description');
        };

        if ($(headerId + 'tedNote').val() != '') {
            dsCitemPara.Parameters.rows[0]['Note'.toUpperCase()] = $(headerId + 'tedNote').val();
        };

        if ($(headerId + 'tedManualNo').val() != '') {
            dsCitemPara.Parameters.rows[0]['ManualNo'.toUpperCase()] = $(headerId + 'tedManualNo').val();
        };

        if ($(headerId + 'csPTCode').csList('codeNo') != '') {
            dsCitemPara.Parameters.rows[0]['PTCode'.toUpperCase()] = $(headerId + 'csPTCode').csList('codeNo');
            dsCitemPara.Parameters.rows[0]['PTName'.toUpperCase()] = $(headerId + 'csPTCode').csList('description');
        };

        if ($(headerId + 'csSTCode').csList('codeNo') != '') {
            dsCitemPara.Parameters.rows[0]['STCode'.toUpperCase()] = $(headerId + 'csSTCode').csList('codeNo');
            dsCitemPara.Parameters.rows[0]['STName'.toUpperCase()] = $(headerId + 'csSTCode').csList('description');
        };
        
    };
    function setDefaultValue(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            if (options.parameters.Parameters.rows[0]['ClctEn'.toUpperCase()] != null) {
                $(headerId + 'csClctEn').csList('codeNo', options.parameters.Parameters.rows[0]['ClctEn'.toUpperCase()]);
            };
            if (options.parameters.Parameters.rows[0]['STCode'.toUpperCase()] != null) {
                $(headerId + 'csSTCode').csList('codeNo', options.parameters.Parameters.rows[0]['STCode'.toUpperCase()]);
            };
            if (options.parameters.Parameters.rows[0]['RealDate'.toUpperCase()] != null) {
                $(headerId + 'dteCMDate').csDateTime('setDate', options.parameters.Parameters.rows[0]['RealDate'.toUpperCase()]);
            };
            if (options.parameters.Parameters.rows[0]['PTCode'.toUpperCase()] != null) {
                $(headerId + 'csPTCode').csList('codeNo', options.parameters.Parameters.rows[0]['PTCode'.toUpperCase()]);
            };
            if (options.parameters.Parameters.rows[0]['CMCode'.toUpperCase()] != null) {
                $(headerId + 'csCMCode').csList('codeNo', options.parameters.Parameters.rows[0]['CMCode'.toUpperCase()]);
            };
            if (options.parameters.Parameters.rows[0]['Note'.toUpperCase()] != null) {
                $(headerId + 'tedNote').val(options.parameters.Parameters.rows[0]['Note'.toUpperCase()]);
            };
        } catch (err) {
            errorHandle(formName, 'setDefaultValue', err);
        } finally {

        };
    };
    function reverseControlState(div,isDisabled) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnQuery').jqxButton({ disabled: isDisabled });
        $(headerId + 'btnExit').jqxButton({ disabled: isDisabled });
        $(headerId + 'btnDelete').jqxButton({ disabled: isDisabled });
        $(headerId + "csClctEn").csList('disabled', isDisabled);
        $(headerId + "csCMCode").csList('disabled', isDisabled);
        $(headerId + "csPTCode").csList('disabled', isDisabled);
        $(headerId + "csSTCode").csList('disabled', isDisabled);
        $(headerId + 'dteCMDate').csDateTime({ disabled: isDisabled });
        $(headerId + 'tedManualNo').jqxInput({ disabled: isDisabled });
        $(headerId + 'tedNote').jqxInput({ disabled: isDisabled });
        $(headerId + 'tedBillNo').jqxInput({ disabled: isDisabled });
        $(headerId + 'grdCharge').jqxGrid({ disabled: isDisabled });
        if (!$(headerId + 'btnDelete').jqxButton('disabled')) {
            if ($(headerId + 'grdCharge').jqxGrid('getrows').length <= 0) {
                $(headerId + 'btnDelete').jqxButton({ disabled: true });
            };
        };
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var height = $(div).innerHeight();
        var headerId = '#' + $(div).prop('id');
        try {

            //-----------------------------------------------------------------------------
            $(headerId + 'btnQuery').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.query.imgSrc
            }));
            controls.push({ name:$(div).prop('id') + 'btnQuery', type: 'jqxButton', level: 2 });
            $(headerId + 'btnQuery > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnExit').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.exit.imgSrc
            }));
            controls.push({ name:$(div).prop('id') + 'btnExit', type: 'jqxButton', level: 2 });
            $(headerId + 'btnExit > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnDelete').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                disabled: true,
                imgSrc: imageScr.delete.imgSrc
            }));
            controls.push({ name: $(div).prop('id') +'btnDelete', type: 'jqxButton', level: 2 });
            $(headerId + 'btnDelete > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------            
            $(headerId + "csClctEn").csList({
                source: null,
                codeNoWidth: 50,
                width: '160px',
                height: '22px',
                showColumnHeaders: false,
                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false,
                columns: [
                       { text: 'CODENO', datafield: 'EMPNO' },
                       { text: 'DESCRIPTION', datafield: 'EMPNAME' }
                ]
            });
            controls.push({ name: $(div).prop('id') +'csClctEn', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "csCMCode").csList({
                source: null,
                codeNoWidth: 50,
                width: '160px',
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
            controls.push({ name:$(div).prop('id') + 'csCMCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "csPTCode").csList({
                source: null,
                codeNoWidth: 50,
                width: '160px',
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
            controls.push({ name:$(div).prop('id')+ 'csPTCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "csSTCode").csList({
                source: null,
                codeNoWidth: 50,
                width: '220px',
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

            controls.push({ name:$(div).prop('id')+ 'csSTCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
           
            $(headerId + "dteCMDate").csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                showCalendarButton: false,
                height: 22,
                width: 110
            });
            controls.push({ name:$(div).prop('id')+ 'dteCMDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "tedManualNo").jqxInput({
                height: 22,
                width: 150,
            });
            controls.push({ name:$(div).prop('id')+ 'tedManualNo', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "tedNote").jqxInput({
                height: 22,
                width: 340,
            });
            controls.push({ name: $(div).prop('id') +'tedNote', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "tedBillNo").jqxInput({
                height: 22,
                width: 150,
            });
            controls.push({ name:$(div).prop('id')+ 'tedBillNo', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            $(headerId + "grdCharge").jqxGrid({
                width: '99.7%',
                height: '99%',
                sortable: true,
                altrows: true,
                columnsresize: true,
                localization: options.localization,
                columns: [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 30,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                        }
                    },
                    { text: 'BILLNO', datafield: 'BILLNO', hidden: true },
                    { text: 'ITEM', datafield: 'ITEM', hidden: true },
                    { text: 'CITEMCODE', datafield: 'CITEMCODE', hidden: true },
                    { text: lang.CUSTID, datafield: 'CUSTID', width: 70, cellsalign: 'center', align: 'center', hidden: false },
                    { text: lang.CITEMNAME, datafield: 'CITEMNAME', width: 200, cellsalign: 'left', align: 'left' },
                    { text: lang.SHOULDAMT, datafield: 'SHOULDAMT', width: 70, cellsalign: 'right', align: 'right', hidden: false },
                    { text: lang.REALPERIOD, datafield: 'REALPERIOD', width: 60, cellsalign: 'right', align: 'right', hidden: false },
                    { text: lang.REALAMT, datafield: 'REALAMT', width: 70, cellsalign: 'right', align: 'right', hidden: false },
                    { text: lang.REALSTARTDATE, datafield: 'REALSTARTDATE', width: 100, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.REALSTOPDATE, datafield: 'REALSTOPDATE', width: 100, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    {
                        text: lang.CANCELFLAGNAME, datafield: 'CANCELFLAG', width: 50,
                        cellsalign: 'center', align: 'center',
                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                            return Cancelcellsrenderer(row, columnfield, value, defaulthtml, columnproperties, lang)
                        }
                    },
                    { text: lang.NOTE, datafield: 'NOTE', width: 300, cellsalign: 'left', align: 'left' },
                ]
            });
            controls.push({ name:$(div).prop('id') + 'grdCharge', type: 'jqxGrid', level: 2 });
            renderGrid(div);
            //-----------------------------------------------------------------------------

        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        };
    };
    function Cancelcellsrenderer(row, columnfield, value, defaulthtml, columnproperties, lang) {
        if (columnfield.toUpperCase() == 'CANCELFLAG') {
            if (value == 1) {
                return '<div style="margin: 6px;color:red;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + lang.chkOK + '</div>'
            } else {
                return '<div style="margin: 6px;vertical-align:middle;text-align: ' + columnproperties.cellsalign + ';">' + lang.chkNo + '</div>'
            };
        };
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