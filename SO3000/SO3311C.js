(function ($) {
    var formName = "SO3311C";
    var riadllName = "CableSoft.SO.RIA.Billing.Batch.EnterPay.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Billing.Batch.EnterPay.Web.EnterPay";
    var grdData = null;
    var copyLoginInfo = {};
    var dsCitemPara = null;
    var defaults = (function () {
        this.language = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.parameters = {};
        this.controls = [];
        this.containerIsWindow = false;
        this.theme = '';
        this.enterType = 1;        
        this.localization = null;
    });
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            //options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close');
    };
    function formDestroy(div) {
        var options = $.data(div, formName).options;
        var controls = $.data(div, formName).options.controls;
        try {
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
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    $.fn.SO3311C = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new SO3311C(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO3311C_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO3311C', err);
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
                                    options.containerIsWindow = true;
                                    var csw = $.data(div, formName).options.container;
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
                                    options.containerIsWindow = true;
                                    var csw = $.data(div, formName).options.container;                                    
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
    function unBindHandler(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'tedBillNo').unbind('keydown');
        $(headerId + 'btnDelete').unbind('click');
        $(headerId + 'btnExit').unbind('click');
        $(headerId + 'btnImport').unbind('click');
        $(options.container).unbind('resize');
    };
    function bindHandler(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'tedBillNo').unbind('keydown');
        $(headerId + 'tedBillNo').on('keydown', div, tedBillNoChanged);
        $(headerId + 'btnDelete').unbind('click');
        $(headerId + 'btnDelete').bind('click', div, btnDeleteClicked);
        $(headerId + 'btnExit').unbind('click');
        $(headerId + 'btnExit').bind('click', div, btnExitClicked);
        $(headerId + 'btnImport').unbind('click');
        $(headerId + 'btnImport').bind('click', div, btnImportClicked);
        $(options.container).unbind('resize');
        $(options.container).on('resize', function () {
            $(headerId + 'txtUploadField').csUploadFile('resize',  { width: $(headerId + 'uploadContainer').width() });
        });
        
    };
    function btnImportClicked(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if ($(this).jqxButton('disabled')) { return; };
        if ($(headerId + 'txtUploadField').csUploadFile('getFiles') == '') {
            messageBox(options.language.mustSelectFile, messageType.critical);
            return;
        };
        reverseControlState(event.data, true);
        $(headerId + 'txtUploadField').one('load', function (e, filename) {
            importExcel(event.data,filename, function () {
                reverseControlState(event.data, false);
            });
        });
        $(headerId + 'txtUploadField').one('error', function (event, errmsg) {
            messageBox(errmsg, messageType.critical);
            reverseControlState(event.data, true);
        });
        $(headerId + 'txtUploadField').csUploadFile('uploadFiles');
    };
    function importExcel(div, xlsFileName, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            prepareData(div);
            var parameters = $.extend({}, copyLoginInfo,
                  { FileName: { type: 'string', value: xlsFileName } },
                  { dsCitemPara: { type: 'string', value: dsCitemPara } },
                  { UCRefNo: { type: 'integer', value: 3 } });

            var params = getParameters(riadllName,
                  riaClassName,
                  'ImportExcel',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                            if ($.isFunction(action)) { action() };
                        } else {
                            if (data.ResultXML != '') {
                                var d = JSON.parse(data.ResultXML);
                                $(headerId + 'grdCharge').jqxGrid('clear');
                                grdData.localdata = d.Temp.rows;
                                $(headerId + 'grdCharge').jqxGrid('updatebounddata');
                                $(headerId + 'txtBillCnt').text(d.Info.rows[0].BILLCOUNT);
                                $(headerId + 'txtTotalAmt').text(d.Info.rows[0].AMTCOUNT);
                                var msg = options.language.ImportComplete;
                                msg = msg.replace('{0}', d.OK.rows.length.toString());
                                msg = msg.replace('{1}', '\n');
                                msg = msg.replace('{2}', d.Error.rows.length.toString());
                                messageBox(msg, null, null, function () {
                                    try {
                                        if (d.Error.rows.length > 0) {
                                            
                                            showSO3311G(div, d.ImportError.rows[0].ERRORNAME,action);
                                        } else {
                                            if ($.isFunction(action)) { action() };
                                        };
                                    } finally {
                                        delete d;
                                        d = null;
                                    };                                    
                                });
                                //d.ImportError.rows[0].ErrorName
                                
                                
                            } else {
                              
                            };
                        };
                    } catch (err) {
                        errorHandle(formName, 'importExcel-Server', err);
                        if ($.isFunction(action)) { action() };
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
            errorHandle(formName, 'importExcel', err);
        } finally {

        };
    };
    function btnExitClicked(event) {
        var options = $.data(event.data, formName).options;
        if ($(this).jqxButton('disabled')) { return };
        exitApp(event.data);
    };
    function exitApp(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            var parameters = $.extend({}, copyLoginInfo,
                  { EnterType: { type: 'integer', value: 1 } });

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
    function showSO3311G(div,errMsg,action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var winOptions = $.extend({}, {
            width: 600, height: 500,
            maxWidth: $(options.container).csWindow('width'),
            maxHeight: $(options.container).csWindow('height'),
            keyboardCloseKey: 'none',
            resizable: true,
            haveClosing: false,
        });
        var result = createcsWindow(div, options.language.ShowForm4, winOptions);
        var xp = 'center';
        var yp = 0;
        if (options.containerIsWindow) {
            xp = ($(options.container).csWindow('width') - $('#' + result['windowId']).csWindow('width')) / 2;
            yp = ($(options.container).csWindow('height') - $('#' + result['windowId']).csWindow('height')) / 2;
        };
        $('#' + result['windowId']).csWindow({ position: { x: xp, y: 0 } });

        $('#' + result['contentId']).SO3311G($.extend({}, {
            loginInfo: cloneJSON(options.loginInfo),
            container: '#' + result['windowId'],            
            parameters: {},
            messageString: errMsg,
            editMode: options.editMode,
            localization:cloneJSON( options.localization)
        }));
        $('#' + result['contentId']).on('loaded', function () {
            $('#' + result['contentId']).off('loaded');
            reverseControlState(div, true);
        });
        $('#' + result['windowId']).on('close',
               function () {
                   $('#' + result['windowId']).off('close');
                   try {
                       //var ret = $('#' + result['contentId']).SO3311D('options');

                       $('#' + result['windowId']).off('close');
                       $('#' + result['contentId']).SO3311G('destroy');
                       $('#' + result['windowId']).csWindow('destroy');
                       if ($.isFunction(action)) { action(); };
                       
                   } catch (err) {
                       errorHandle(formName, 'SO3311G_windowClose', err);
                   } finally {
                       // 
                   };
               });
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
            enterType: 1,
            parameters: cloneJSON( options.parameters.Parameters),
            editMode: options.editMode,
            localization:cloneJSON( options.localization)
        }));
        $('#' + result['contentId']).on('loaded', function () {
            $('#' + result['contentId']).off('loaded');
            reverseControlState(div, true);
        });
        $('#' + result['windowId']).on('close',
               function () {
                   $('#' + result['windowId']).off('close');
                   try {
                       var ret = $('#' + result['contentId']).SO3311D('options');
                       if (ret.isSaved) {
                           // $(options.container).csWindow('close');
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
    function reverseControlState(div, isDisabled) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');        
        $(headerId + 'btnExit').jqxButton({ disabled: isDisabled });
        $(headerId + 'btnDelete').jqxButton({ disabled: isDisabled });       
        $(headerId + 'tedBillNo').jqxInput({ disabled: isDisabled });
        $(headerId + 'grdCharge').jqxGrid({ disabled: isDisabled });
        $(headerId + 'btnImport').jqxButton({ disabled: isDisabled });
        //$(headerId + 'txtUploadField').csUploadFile({ disabled: isDisabled });
        if (!$(headerId + 'btnDelete').jqxButton('disabled')) {
            enableDelete(div);
        };
        
    };
    function btnDeleteClicked(event) {
        var options = $.data(event.data, formName).options;        
        if ($(this).jqxButton('disabled')) { return };
        cancelBillData(event.data, function () { enableDelete(event.data);});
    };
    function cancelBillData(div,action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        if ($(headerId + 'grdCharge').jqxGrid('getrows').length <= 0) { return; };
        var selectedrowindex = $(headerId + 'grdCharge').jqxGrid('selectedrowindex');
        if (selectedrowindex < 0) { selectedrowindex = 0; };
        var billno = $(headerId + 'grdCharge').jqxGrid('getcellvalue', selectedrowindex, "BILLNO");
        var item = $(headerId + 'grdCharge').jqxGrid('getcellvalue', selectedrowindex, "ITEM");
        var realAmt = $(headerId + 'grdCharge').jqxGrid('getcellvalue', selectedrowindex, "REALAMT");
       

        var parameters = $.extend({}, copyLoginInfo,
                   { EnterType: { type: 'integer', value: options.enterType } },
                   { BillNo: { type: 'string', value: billno } },
                   { Item: { type: 'integer', value: item } }
                   );
        var params = getParameters(riadllName,
                  riaClassName,
                  'CancelBillData',
                  JSON.stringify(parameters));
        getServerData(params, {
            success: function (data) {
                try {
                    if (!data.ResultBoolean) {
                        messageBox(data.ErrorMessage, messageType.critical);
                    } else {
                        var d = JSON.parse(data.ResultXML);
                        $(headerId + 'grdCharge').jqxGrid('clear');
                        grdData.localdata = d.Temp.rows;
                        $(headerId + 'grdCharge').jqxGrid('updatebounddata');
                        $(headerId + 'txtBillCnt').text(d.Info.rows[0].BILLCOUNT);
                        $(headerId + 'txtTotalAmt').text(d.Info.rows[0].AMTCOUNT);
                        delete d;
                        d = null;
                       
                    };
                } catch (err) {

                    errorHandle(formName, 'CancelBillData-Server', err);
                } finally {

                    parameters = null;
                    params = null;
                    data = null;
                    delete data;
                    delete parameters;
                    delete params;
                    if ($.isFunction(action)) { action(); };
                };
            }
        });
    };
    function tedBillNoChanged(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if ($(this).jqxInput('disabled')) { return; };
        if (event.which == 13) {
            event.preventDefault();
            if ($(this).jqxInput('val') == null || $(this).jqxInput('val') == '') {
                return;
            };
           
            prepareData(event.data);
            $(headerId + 'grdCharge').jqxGrid('clear');
           // $(headerId + 'btnDelete').jqxButton({ disabled: true });
            entryBillData(event.data, function () { enableDelete(event.data);});

        };
    };
    function prepareData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        delete dsCitemPara;
        dsCitemPara = {};
        dsCitemPara = { Parameters: {} };
        //copy schema
        $.extend(true, dsCitemPara.Parameters, options.parameters.Parameters);
       

    };
    function entryBillData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            var parameters = $.extend({}, copyLoginInfo,
                    { EnterType: { type: 'integer', value: 1 } },
                    { BillNo: { type: 'string', value: $(headerId + 'tedBillNo').val() } },
                    { dsCitemPara: { type: 'string', value: dsCitemPara } },
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
                                    $(headerId + 'tedBillNo').jqxInput('val', null);
                                    $(headerId + 'tedBillNo').jqxInput('focus');
                                };
                                grdData.localdata = d.Temp.rows;
                                $(headerId + 'grdCharge').on('bindingcomplete', function (event) {
                                    $(this).jqxGrid({ selectedrowindex: $(this).jqxGrid('getrows').length-1 });
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
                     
                        if ($.isFunction(action)) { action(); };
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'entryBillData-Server', err);
        }
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            //unBindHandler(div);
            changeLanguage(div);
            renderControl(div);
            QueryTempInfo(div, function () {
                enableDelete(div);
                bindHandler(div);
            });
          
        } catch (err) {
            errorHandle(formName, 'initData', err);
            if ($.isFunction(action)) { action(); };
        } finally {
            if ($.isFunction(action)) { action() };
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
            $(headerId + 'tedBillNo').jqxInput({
                width: '93%',
                height: 23,
            });
            controls.push({ name:$(div).prop('id') + 'tedBillNo', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'btnDelete').jqxButton($.extend({}, imagePosition, {
                width: 110,
                height: 25,
                imgSrc: imageScr.delete.imgSrc
            }));
            controls.push({ name: 'btnDelete', type: 'jqxButton', level: 2 });
            $(headerId + 'btnDelete > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnExit').jqxButton($.extend({}, imagePosition, {
                width: 80,
                height: 25,
                imgSrc: imageScr.exit.imgSrc
            }));
            controls.push({ name:$(div).prop('id') + 'btnExit', type: 'jqxButton', level: 2 });
            $(headerId + 'btnExit > img').css('top', '2px');
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'btnImport').jqxButton($.extend({}, imagePosition, {
                width: 70,
                height: 25,
                imgSrc: imageScr.sync.imgSrc
                //imgSrc: 'Images/Sync1.png'
            }));
            controls.push({ name:$(div).prop('id')+ 'btnImport', type: 'jqxButton', level: 2 });
            $(headerId + 'btnImport > img').css('top', '2px');
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
                    /*
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 30,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                        }
                    }, */
                    { text: lang.ENTRYNO, datafield: 'ENTRYNO', width: 70, hidden: false,cellsalign:'right',align:'center' },
                    { text: lang.BILLNO, datafield: 'BILLNO', width: 130, hidden: false },
                    { text: lang.ITEM, datafield: 'ITEM', width: 40, hidden: true, cellsalign: 'center', align: 'center' },
                    { text: lang.CITEMNAME, datafield: 'CITEMNAME', width: 200, cellsalign: 'left', align: 'left' },
                    { text: lang.CUSTID, datafield: 'CUSTID', width: 70, cellsalign: 'center', align: 'center', hidden: false },
                    { text: lang.CUSTSTATUSNAME, datafield: 'CUSTSTATUSNAME', width: 80, cellsalign: 'center', align: 'center', hidden: false },
                    { text: lang.CUSTNAME, datafield: 'CUSTNAME', width: 120, cellsalign: 'left', align: 'left', hidden: false },
                    { text: lang.REALPERIOD, datafield: 'REALPERIOD', width: 50, cellsalign: 'right', align: 'right', hidden: false },
                    { text: lang.REALAMT, datafield: 'REALAMT', width: 80, cellsalign: 'right', align: 'right' },
                    { text: lang.REALSTARTDATE, datafield: 'REALSTARTDATE', width: 100, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.REALSTOPDATE, datafield: 'REALSTOPDATE', width: 100, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.PRTSNO, datafield: 'PRTSNO', width: 130, cellsalign: 'left', align: 'left', hidden: false },
                    { text: lang.MEDIABILLNO, datafield: 'MEDIABILLNO', width: 130, cellsalign: 'left', align: 'left' },
                    { text: lang.NOTE, datafield: 'NOTE', width: 400, cellsalign: 'left', align: 'left' }
                ]
            });
            controls.push({ name: $(div).prop('id') +'grdCharge', type: 'jqxGrid', level: 2 });
            renderGrid(div);
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'txtUploadField').csUploadFile($.extend({}, {
                loginInfo: $.extend(true,{},options.loginInfo),
                container: $(headerId + 'txtUploadField'),
                editMode: options.editMode,
                height:25
            }));
            controls.push({ name:$(div).prop('id')+ 'txtUploadField', type: 'csUploadFile', level: 2 });
            //-----------------------------------------------------------------------------
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        };
    };
    function QueryTempInfo(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            var parameters = $.extend({}, copyLoginInfo,
                    { EnterType: { type: 'integer', value: 1 } });
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
                                if (d.Table.rows[0]['BillCount'.toUpperCase()].toString() != '0') {
                                    $(headerId + 'btnDelete').jqxButton({disabled:false});
                                } else {
                                    $(headerId + 'btnDelete').jqxButton({disabled:true});
                                };
                               
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
    function enableDelete(div) {
        var headerId = '#' + $(div).attr('id');
        var isDisabled = $(headerId + 'grdCharge').jqxGrid('getdatainformation').rowscount == 0;
        $(headerId + 'btnDelete').jqxButton({ disabled: isDisabled });
    };
    function renderGrid(div) {
        var options = $.data(div, formName).options;
        var headId = '#' + $(div).attr('id');
        delete grdData;
        grdData = null;

        grdData = {
            datatype: 'json',
            datafields: [
                   { name: 'ENTRYNO', type: 'integer' },
                   { name: 'BILLNO', type: 'string' },
                   { name: 'ITEM', type: 'integer' },
                   {name:  'CITEMNAME',type:'string'},                   
                   { name: 'CUSTID', type: 'integer' },
                   { name: 'CUSTSTATUSNAME', type: 'string' },
                   { name: 'CUSTNAME', type: 'string' },
                   { name: 'REALPERIOD', type: 'integer' },
                   { name: 'REALAMT', type: 'integer' },
                   { name: 'REALSTARTDATE', type: 'date' },
                   { name: 'REALSTOPDATE', type: 'date' },
                   { name: 'PRTSNO', type: 'string' },
                   { name: 'MEDIABILLNO', type: 'string' },
                   { name: 'NOTE', type: 'string' }                   
            ]
        };
        //grdData.localdata = options.viewData.Temp.rows;
        var dataAdapter1 = new $.jqx.dataAdapter(grdData);
        $(headId + 'grdCharge').jqxGrid({ source: dataAdapter1 });
        $(headId + 'grdCharge').on('bindingcomplete', function (event) {
            $(this).jqxGrid({ selectedrowindex: 0 });
        });
        //$(headId + 'grdCharge').jqxGrid('updatebounddata');
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