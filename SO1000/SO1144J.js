(function ($) {
    var formName = 'SO1144J';
    var riadllName = 'CableSoft.SO.RIA.Order.CopyOrder.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Order.CopyOrder.Web.CopyOrder';
    var copyLoginInfo = {};
    var custId = -1;
    var returnCode = null;
    var isRenderSO1118A = false;
    var isRenderSO1144B = false
    var allSNO = [];
    var shouldRegPriv = false;
    var executeTable = null;     
    var newOrderNo = '';
    var paraTableName = 'CopyOrder';
    var defaults = (function () {
        this.language = {};
        this.initData = {};
        this.loginInfo = {};
        this.editMode = 0;        
        this.parameters = {};
        this.controls = [];
        this.theme = '';
        this.orderNo = '';
        this.isSaved = false;
        this.container = null;
        this.defRefNo = null;
        this.autoSave = false;
        this.localization = {};        
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
             return canEdit(params, param2);          
            //return param2([true, null]);          
               
            
            ///return param2([false, '測試用']);
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
    $.fn.SO1144J = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new SO1144J(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1144J_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1144J', err);
        }
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var height = $(div).innerHeight();
        var headerId = '#' + $(div).prop('id');
        try {
            //-----------------------------------------------------------------------------
            $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.ok.imgSrc
            }));
            controls.push({ name:$(div).prop('id') + 'btnOK', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnExit').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.exit.imgSrc
            }));
            controls.push({ name:$(div).prop('id') + 'btnExit', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------         
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
            if (isRenderSO1118A) {
                $(headerId + 'SO1118A5Container').SO1118A5('destroy');
            };
            if (isRenderSO1144B) {
                $(div).SO1144B('destroy');
            };
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
            }; */
            destroyControls(controls);
            deleteJSONObject(options);
            $.data(div, formName).options.language = null;
            delete $.data(div, formName).options.language;
            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults;
            isRenderSO1118A = false;
            isRenderSO1144B = false;
            custId = -1;
            returnCode = null;
            allSNO.length = 0;
            shouldRegPriv = false;
            executeTable = null;
            newOrderNo = '';
            
            $(div).children().remove();
            
            
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        };
    };
    function unHandler(div, action) {
        var headerId = '#' + $(div).attr('id');
        
        $(headerId + 'btnOK').unbind('click', btnOKClick);
        $(headerId + 'btnExit').unbind('click');
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'btnOK').unbind('click');
            $(headerId + 'btnOK').bind('click', div, btnOKClick);
            $(headerId + 'btnExit').unbind('click');
            $(headerId + 'btnExit').bind('click', function () {
                if ($(this).jqxButton('disabled')) { return; };
                if (options.containerIsWindow) {
                    $($.data(div, formName).options.container).csWindow('close');
                };
            });
            /*
            $(headerId + 'grdData').unbind('rowdoubleclick');
            $(headerId + 'grdData').bind('rowdoubleclick', div, grdRowDobuleClick);
            $(headerId + 'btnOK').unbind('click', btnOKClick);
            $(headerId + 'btnOK').bind('click', div, btnOKClick);
            $(headerId + 'btnCancel').unbind('click');
            $(headerId + 'btnCancel').on('click', function () {
                $(options.container).csWindow('close');
            }); */
            if ($.isFunction(action)) { action(); };
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        }
    };
    function renderSO1118A5(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        
        if (returnCode != null) {
            getCloseWipData(div, function () {
                chkAllSNOCitemCount(div, function () {
                    execute(div, function () {
                        showSO1144B(div);
                        //if ($.isFunction(action)) { action(); };
                    });
                });
            });
        } else {
            var dsData = {
                CallOK: {
                    columns: [{ name: 'CUSTID', type: 'integer' },
                        { name: 'ORDERNO', type: 'string' },
                    ],
                    rows: [{
                        CUSTID: custId,
                        ORDERNO: options.orderNo
                    }]
                }
            };
            $(headerId + 'SO1118A5Container').one('loaded', function () {
                if ($.isFunction(action)) { action(); };
            })
            $(headerId + 'SO1118A5Container')['SO1118A5']($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: $(this),
                parameters:cloneJSON( dsData),
                localization: options.localization,
                editMode: options.editMode,
                defRefNo : options.defRefNo,
                refNo: 4
            }));
            isRenderSO1118A = true;
           
        };
       
        
              
    };
    function chkReturnCode(div, action) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        try {
            var parameters = $.extend({}, copyLoginInfo,
              { OrderNo: { type: 'string', value: options.orderNo } });
            var params = getParameters(riadllName,
                  riaClassName,
                  'ChkReturnCode',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            if (tmp.Table.rows.length > 0) {
                                if (tmp.Table.rows[0].CUSTID != undefined) {
                                    custId = tmp.Table.rows[0].CUSTID;
                                };
                                if (tmp.Table.rows[0].RETURNCODE != undefined) {
                                    returnCode = tmp.Table.rows[0].RETURNCODE;
                                };
                            };
                            if (custId == -1) {
                                messageBox(options.language.NotFoundCustId, messageType.critical);
                                return;
                            };
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                           
                        }
                    } catch (err) {
                        errorHandle(formName, 'saveData-Server', err);
                    
                    } finally {
                        parameters = null;
                        params = null;
                        delete parameters;
                        delete params;
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'chkReturnCode', err);
        }
    };
    function executeSO1185A(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var o = $(headerId + 'SO1118A5Container')['SO1118A5']('getExecuteTable');
        delete executeTable;
        executeTable = null;
        executeTable = {};
        executeTable = $.extend(true, {}, o);
        if (o != undefined) {
            getCloseWipData(div, function () {
                chkAllSNOCitemCount(div, function () {
                    execute(div, function () {
                        showSO1144B(div);
                    });
                });
            });
        } else {
            return;
        };
    };
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if ($(this).jqxButton('disabled')) { return; };
        executeSO1185A(event.data);
        return;
        var o = $(headerId + 'SO1118A5Container')['SO1118A5']('getExecuteTable');
        delete executeTable;
        executeTable = null;
        executeTable = {};
        executeTable = $.extend(true, {}, o);
        if (o != undefined) {
            getCloseWipData(event.data, function () {
                chkAllSNOCitemCount(event.data, function () {
                    execute(event.data, function () {
                        showSO1144B(event.data);
                    });
                });
            });
        } else {
            return;
        };
    };
    function disableAllControl(div) {
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnOK').jqxButton({ disabled: true });
        $(headerId + 'btnExit').jqxButton({ disabled: true });
    };
    function showSO1144B(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var controls = $.data(div, formName).options.controls;
        disableAllControl(div);
        var ds = {
            Order: {
                columns: [{ name: 'CUSTID', type: 'integer' }, { name: 'ORDERNO',type:'string' }],
                rows: [{ CUSTID: custId, ORDERNO :newOrderNo}]
            }
        };
        unHandler(div);
        if (isRenderSO1118A) {
            $(headerId + 'SO1118A5Container').SO1118A5('destroy');
        };
        
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
        };
        options.controls.length = 0;
        $(div).children().remove();
        isRenderSO1118A = false;
        isRenderSO1144B = true;
        if (options.containerIsWindow) {
            $($.data(div, formName).options.container).csWindow({ title: options.language.ShowForm });
            //$($.data(div, formName).options.container).csWindow( $.extend({},{haveClosing:true}));            
        };
        
        $(div)['SO1144B']($.extend({}, {
            loginInfo: cloneJSON(options.loginInfo),
            container: options.container,            
            parameters: cloneJSON( ds ),
            sourceOrderNo:  options.orderNo,
            editMode: editMode.edit,
            localization: cloneJSON(options.localization)
        })); 
        /*
        if (isRenderSO1118A) {
            $(headerId + 'SO1118A5Container').SO1118A5('destroy');
        }; */
        /*
                      if (options.containerIsWindow) {
                          $($.data(div, formName).options.container).csWindow('close');
                      }; */
        /*
        try {                    
            var winOptions = $.extend({}, {
                width: $(options.container).csWindow('width'),
                height: $(options.container).csWindow('height'),
                maxWidth: $(options.container).csWindow('width'),
                maxHeight: $(options.container).csWindow('height'),
                keyboardCloseKey: 'none',
                resizable: true,
                haveClosing: true

            });
            var result = createcsWindow(div, options.language.ShowForm, winOptions);
            var xp = 'center';
            var yp = 0;
            if (options.containerIsWindow) {
                xp = ($(options.container).csWindow('width') - $('#' + result['windowId']).csWindow('width')) / 2;
                yp = ($(options.container).csWindow('height') - $('#' + result['windowId']).csWindow('height')) / 2;
            };
            
            $('#' + result['windowId']).csWindow({ position: { x: xp, y: 0 } });

            var o = $.extend(true, {}, options);
            $('#' + result['contentId']).SO1144B($.extend({}, {
                loginInfo: $.extend({}, options.loginInfo),
                container: '#' + result['windowId'],
                //container: $.extend(true,{}, o.container),
                parameters: ds,
                sourceOrderNo:options.orderNo,
                editMode: editMode.edit,
                localization: $.extend(true,{}, options.localization)
            }));
           
            $('#' + result['windowId']).on('loaded', function () {
                alert('yes');
            })
            $('#' + result['contentId']).on('loaded', function () {
                alert('yes2');
               
            })
            $('#' + result['windowId']).on('close',
                function () {
                    $('#' + result['windowId']).off('close');
                    try {
                        $('#' + result['windowId']).off('close');
                        $('#' + result['contentId']).SO1144B('destroy');
                        $('#' + result['windowId']).csWindow('destroy');
                        if (options.containerIsWindow) {
                            $($.data(div, formName).options.container).csWindow('close');
                        };
                      
                        
                    } catch (err) {
                        errorHandle(formName, 'SO1144B_windowClose', err);
                    } finally {

                  
                    };
                });
        } catch (err) {          
            errorHandle(formName, 'showSO1144B', err);
        } finally {

        };  */
    };
    function execute(div, action) {
        var options = $.data(div, formName).options;
        var controls = options.controls;        
        try {
            var parameters = $.extend({}, copyLoginInfo,
              {
                  OrderNo: { type: 'string', value: options.orderNo },                  
                  AllSNO: { type: 'string', value: allSNO.toString() },
                  WorkType: { type: 'integer', value: 4 },
                  ExecTab: { type: 'string', value: executeTable },
                  ShouldRegPriv: { type: 'boolean', value: shouldRegPriv },
                  CustId: { type: 'integer', value: custId },
                  IsOrderTurnSend: { type: 'boolean', value: true },
                  OtherTable: { type: 'string', value: null },
              });
            var params = getParameters(riadllName,
                  riaClassName,
                  'ExecuteHtml',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var d = JSON.parse(data.ResultXML);
                            newOrderNo = d.Order.rows[0].ORDERNO;
                            custId = d.Order.rows[0].CUSTID;
                            delete d;
                            d = null;
                            options.isSaved = true;
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };
                    } catch (err) {
                        errorHandle(formName, 'ExecuteHtml-Server', err);

                    } finally {
                        parameters = null;
                        params = null;
                        delete parameters;
                        delete params;
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'ExecuteHtml', err);
        }
    };
    function chkAllSNOCitemCount(div, action) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        if (returnCode != null) {
            if ($.isFunction(action)) { action(); };
            return;
        };                
        try {
            var parameters = $.extend({}, copyLoginInfo,
              {                
                  CustId: { type: 'integer', value: custId },
                  AllSNO: { type: 'string', value: allSNO.toString() }                  
              });
            var params = getParameters(riadllName,
                  riaClassName,
                  'ChkAllSNOCitemCount',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {                      
                        if (data.ResultBoolean) {
                            if (data.ResultXML != '' && data.ResultXML != null) {
                                messageBox(data.ResultXML, messageType.yesno, null, function (flag) {
                                    if (flag == 'yes') {
                                        if ($.isFunction(action)) { action(); };
                                        //shouldRegPriv = true;
                                    } else {
                                        //shouldRegPriv = false;
                                    };
                                });
                            } else {
                                if ($.isFunction(action)) { action(); };
                            };
                                
                                
                            } else {
                                messageBox(data.ErrorMessage, messageType.critical);
                               // if ($.isFunction(action)) { action(); };
                            };                                                      
                       
                    } catch (err) {
                        errorHandle(formName, 'ChkAllSNOCitemCount-Server', err);

                    } finally {
                        parameters = null;
                        params = null;
                        delete parameters;
                        delete params;
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'ChkAllSNOCitemCount', err);
        }
    };
    function getCloseWipData(div, action) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        allSNO.length = 0;
        try {
            var parameters = $.extend({}, copyLoginInfo,
              {
                  OrderNo: { type: 'string', value: options.orderNo },
                  CustId: { type: 'integer', value: custId },
                  IncludeOrder: { type: 'boolean', value: true },
                  WorkType: { type: 'integer', value: 4 }
              });
            var params = getParameters(riadllName,
                  riaClassName,
                  'GetCloseWipData',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            $.each(tmp.Table.rows, function (idx, row) {
                                allSNO.push(row.SNO);
                            });
                           
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetCloseWipData-Server', err);

                    } finally {
                        parameters = null;
                        params = null;
                        delete parameters;
                        delete params;
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'GetCloseWipData', err);
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
                                changeElementId(div,formName);
                                initData(div, function () {
                                    $(div).triggerHandler('loaded', [this, options]);
                                    if ($(options.container).attr('class').indexOf('jqx-window') != undefined) {
                                        if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                            options.containerIsWindow = true;
                                            var csw = $.data(div, formName).options.container;
                                            csw.on("winClosing", function () {
                                                if (isRenderSO1144B) { return;}
                                                csw.csWindow('close');
                                            });
                                        };
                                    };
                                });
                            }
                    catch (err) {
                        errorHandle(formName, 'formLoaded_success', err);
                    }
                });



            //$.ajax({
            //    url: 'SO1000\\' + formName + '.html',
            //    type: "get",
            //    datatype: 'html',
            //    success: function (msg) {
            //        try {
            //            $(div).html(msg);
            //            changeElementId(div, formName);
            //            initData(div, function () {
            //                $(div).triggerHandler('loaded', [this, options]);
            //                if ($(options.container).attr('class').indexOf('jqx-window') != undefined) {
            //                    if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
            //                        options.containerIsWindow = true;
            //                        var csw = $.data(div, formName).options.container;
            //                        csw.on("winClosing", function () {
            //                            if (isRenderSO1144B) { return; }
            //                            csw.csWindow('close');
            //                        });
            //                    };
            //                };
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




            //$.ajax({
            //    url: 'SO1000\\' + formName + '.html?v=' + formatDateTime(new Date(), "datetime3"),
            //    type: "get",
            //    datatype: 'html',
            //    success: function (msg) {
            //        try {
            //            $(div).html(msg);
            //            changeElementId(div,formName);
            //            initData(div, function () {
            //                $(div).triggerHandler('loaded', [this, options]);
            //                if ($(options.container).attr('class').indexOf('jqx-window') != undefined) {
            //                    if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
            //                        options.containerIsWindow = true;
            //                        var csw = $.data(div, formName).options.container;
            //                        csw.on("winClosing", function () {
            //                            if (isRenderSO1144B) { return;}
            //                            csw.csWindow('close');
            //                        });
            //                    };
            //                };
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
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            shouldRegPriv = false;
            options.isSaved = false;
            changeLanguage(div);
            renderControl(div);
            $(headerId + 'btnExit').bind('click', function () {
                if ($(this).jqxButton('disabled')) { return; };
                if (options.containerIsWindow) {
                    $($.data(div, formName).options.container).csWindow('close');
                };
            });
            
            if (options.orderNo == '') {
                if (options.parameters[paraTableName] != undefined) {
                    if (options.parameters[paraTableName].rows.length > 0) {
                        options.orderNo = options.parameters[paraTableName].rows[0].ORDERNO;
                    };
                };
                               
            };
            if (options.defRefNo == undefined) { options.defRefNo = null; };
            if (custId == -1) {
                if (options.parameters[paraTableName] != undefined) {
                    if (options.parameters[paraTableName].rows.length > 0) {
                        custId = options.parameters[paraTableName].rows[0].CUSTID;
                    };
                };
            };
            if (options.orderno == '') {
                messageBox(options.language.NoDataQuery, messageType.critical);
                return;
            };
            chkReturnCode(div, function () {
                renderSO1118A5(div, function () {
                    addHandler(div, function () {
                        if (options.autoSave != undefined) {
                            if (options.autoSave) {
                                //$(headerId + 'btnOK').trigger('click');
                                //$(headerId + 'btnOK').click();
                                executeSO1185A(div);
                            };
                        };                        
                    });
                });
            });           
        } catch (err) {
            errorHandle(formName, 'initData', err);

        } finally {
            if ($.isFunction(action)) { action(); };
        }
    };
    function canEdit( inParams, act) {
        if (inParams[paraTableName] == undefined) {
            if ($.isFunction(act)) {
                act([false, 'OrderNo does not exist']);
            };
        };
        if (inParams[paraTableName].rows.length == 0) {
            if ($.isFunction(act)) {
                act([false, 'OrderNo does not exist']);
            };
        };
        if (inParams[paraTableName].rows[0]['ORDERNO'] == undefined) {
            if ($.isFunction(act)) {
                act([false, 'OrderNo does not exist']);
            };
        };
        if (inParams[paraTableName].rows[0]['ORDERNO'] == null) {
            if ($.isFunction(act)) {
                act([false, 'OrderNo does not exist']);
            };
        };
        
        try {
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: inParams.loginInfo } });
            var parameters = $.extend({}, paraLoginInfo,
              {
                  OrderNo: { type: 'string', value: inParams[paraTableName].rows[0]['ORDERNO'] }
              });
            var params = getParameters(riadllName,
                  riaClassName,
                  'CanEdit',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            if ($.isFunction(act)) {                              
                                act([data.ResultBoolean, data.ErrorMessage]);
                            };                            
                        }
                        else {                            
                            if ($.isFunction(act)) {                               
                                act([false, data.ErrorMessage]);
                            };                            
                        }
                    } catch (err) {
                        errorHandle(formName, 'CanEdit-Server', err);

                    } finally {
                        delete paraLoginInfo;
                        delete parameters;
                        delete params;
                        parameters = null;
                        params = null;
                        paraLoginInfo = null;
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'CanEdit', err);
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