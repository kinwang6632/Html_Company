(function ($) {
    var formName = 'SO1100U';
    var riadllName = 'CableSoft.SO.RIA.Facility.VOD.Calculate.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Facility.VOD.Calculate.Web.Calculate';
    var copyLoginInfo = {};
    var ParaTableName = 'VODCalculate'.toUpperCase();
    var PrepareTableName = 'Para';
    var FaciTableName = 'chooseFaci';
    var ExcelTableName = 'ImportExcel';
    var FaciTable = {};
   
    var PrepareTable = {};
    var otherForm = [];
    var ExcelTable = {};
    var ResultMessage = null;
    var dsSource = {};
    var CacluResult = {};
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
                            options: $.extend({}, new defaults(), new SO1100U(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1100U_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1100U', err);
        }
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = '#' + $(div).prop('id');
        //-----------------------------------------------------------------------------    
       
        $(headerId + 'headExpander').jqxExpander({
            width: '100%',
            height: '100%',
            toggleMode: 'none',
            showArrow: false
        });
        controls.push({ name: $(div).prop('id') + 'headExpander', type: 'jqxExpander', level: 2 });
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------    
        $(headerId + "txtCustId").jqxMaskedInput({
            height: 25,
            width: '95%',
            mask: '[1-9]9999999',
            promptChar: ''
        });
        controls.push({ name: $(div).prop('id') + 'txtCustId', type: 'jqxMaskedInput', level: 2 });
        //-----------------------------------------------------------------------------    
        //-----------------------------------------------------------------------------    
        $(headerId + "txtStb").jqxInput({
            height: 25,
            width: '95%',
        });
        controls.push({ name: $(div).prop('id') + 'txtStb', type: 'jqxInput', level: 2 });
        //-----------------------------------------------------------------------------    
        //-----------------------------------------------------------------------------    
        $(headerId + "txtMVodId").jqxInput({
            height: 25,
            width: '95%',
        });
        controls.push({ name: $(div).prop('id') + 'txtMVodId', type: 'jqxInput', level: 2 });
        //-----------------------------------------------------------------------------    
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnStb').jqxButton({
            width: 85,
            height: 25,
        });
        controls.push({ name: $(div).prop('id') + 'btnStb', type: 'jqxButton', level: 2 });
        //-----------------------------------------------------------------------------    
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnMvodId').jqxButton({
            width: 85,
            height: 25,
        });
        controls.push({ name: $(div).prop('id') + 'btnMvodId', type: 'jqxButton', level: 2 });
        //-----------------------------------------------------------------------------  
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
            width: 85,
            imgSrc: imageScr.ok.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnOK', type: 'jqxButton', level: 2 });
        //-----------------------------------------------------------------------------   
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
            width: 85,
            imgSrc: imageScr.exit.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnCancel', type: 'jqxButton', level: 2 });
        //-----------------------------------------------------------------------------   
        //-----------------------------------------------------------------------------    
        $(headerId + 'btnPrevRpt').jqxButton($.extend({}, imagePosition, {
            width: 130,
            imgSrc: imageScr.print.imgSrc,
            height: 25
        }));
        controls.push({ name: $(div).prop('id') + 'btnPrevRpt', type: 'jqxButton', level: 2 });
        //-----------------------------------------------------------------------------   
        //-----------------------------------------------------------------------------    
        $(headerId + "txtCloseDate").csDateTime({
            formatString: 'yyyy/MM/dd',
            value: null,
            height: 25,
            //showCalendarButton: false,
            width: '95%'
        });
        controls.push({ name: $(div).prop('id') + 'txtCloseDate', type: 'csDateTime', level: 2 });
        //-----------------------------------------------------------------------------   
        //-----------------------------------------------------------------------------    
        $(headerId + "txtShouldDate").csDateTime({
            formatString: 'yyyy/MM/dd',
            value: null,
            height: 25,
            //showCalendarButton: false,
            width: '95%'
        });
        controls.push({ name: $(div).prop('id') + 'txtShouldDate', type: 'csDateTime', level: 2 });
        //-----------------------------------------------------------------------------  
        //-----------------------------------------------------------------------------    
        $(headerId + "chkTran1").jqxCheckBox({
            width: '170px',
            height: 25,
            checked: true,
        });
        controls.push({ name: $(div).prop('id') + 'chkTran1', type: 'jqxCheckBox', level: 2 });
        //-----------------------------------------------------------------------------  
        //-----------------------------------------------------------------------------    
        $(headerId + "chkTran2").jqxCheckBox({
            width: '170px',
            height: 25,
            checked: false,
        });
        controls.push({ name: $(div).prop('id') + 'chkTran2', type: 'jqxCheckBox', level: 2 });
        //-----------------------------------------------------------------------------  
        //-----------------------------------------------------------------------------    
        $(headerId + "chkRun").jqxCheckBox({
            width: '170px',
            height: 25,
            checked: false,
        });
        controls.push({ name: $(div).prop('id') + 'chkRun', type: 'jqxCheckBox', level: 2 });
        //-----------------------------------------------------------------------------  
        //-----------------------------------------------------------------------------    
        $(headerId + "chkForceAmount").jqxCheckBox({
            width: '170px',
            height: 25,
            checked: false,
        });
        controls.push({ name: $(div).prop('id') + 'chkForceAmount', type: 'jqxCheckBox', level: 2 });
        //-----------------------------------------------------------------------------  
        //-----------------------------------------------------------------------------    
        $(headerId + "csCompcode").csList({
            source: null,
            codeNoWidth:50,
            width: '220px',
            height: '25px',            
            showColumnHeaders: false,
            //readOnly: true,
            //disabled:true,
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
        if (options.refNo != undefined) {
            $(headerId + "csCompcode").csList('disabled', true);
        };        
        controls.push({ name: $(div).prop('id') + 'csCompcode', type: 'csList', level: 2 });
        //-----------------------------------------------------------------------------  
        //-----------------------------------------------------------------------------    
        $(headerId + "csServiceType").csList({
            source: null,
            codeNoWidth: 50,
            width: '220px',
            height: '25px',
            showColumnHeaders: false,
            readOnly: true,
            disabled: true,
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
        controls.push({ name: $(div).prop('id') + 'csServiceType', type: 'csList', level: 2 });
        //-----------------------------------------------------------------------------  
        //-----------------------------------------------------------------------------
        $(headerId + 'txtUploadField').csUploadFile($.extend({}, {
            loginInfo: $.extend(true, {}, options.loginInfo),
            container: $(headerId + 'txtUploadField'),
            editMode: options.editMode
        }));
        controls.push({ name: $(div).prop('id') + 'txtUploadField', type: 'csUploadFile', level: 2 });
        //-----------------------------------------------------------------------------

        /*
        var headerId = '#' + $(div).prop('id');
        try {
            //-----------------------------------------------------------------------------
            $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.ok.imgSrc
            }));
            controls.push({ name: 'btnOK', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnExit').jqxButton($.extend({}, imagePosition, {
                width: 90,
                height: 25,
                imgSrc: imageScr.exit.imgSrc
            }));
            controls.push({ name: 'btnCancel', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------         
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        }; */
    };
    function formDestroy(div) {
        try {

            var options = $.data(div, formName).options;
            var controls = $.data(div, formName).options.controls;
            var headerId = '#' + $(div).prop('id');
            otherForm.forEach(function (element) {
                $(element[0]).off();
                $(element[0])[element[1]]('destroy');
            });
            unHandler(div);
            ParaTableName = null;
            FaciTableName = null;
            delete FaciTable;
            FaciTable = null;
            PrepareTableName = null;
            delete PrepareTable;
            PrepareTable = null;
            ExcelTableName = null;
            delete ExcelTable;
            ExcelTable = null;
            ResultMessage = null;
            delete dsSource;
            dsSource = null;
            delete CacluResult;
            CacluResult = null;
            

             otherForm.length=0;
             otherForm = null;
          /*
            for (j = 3; j >= 0; j--) {
                for (i = 0; i < controls.length; i++) {
                    if (controls[i].level == j) {
                        var o = $('#' +  controls[i].name);
                        if (o.length > 0) {
                            $(o[0]).off();
                            $(o[0])[controls[i].type]('destroy');
                        }
                    };
                };
            }; */
            destroyControls(controls);
            deleteJSONObject(options);
            delete $.data(div, formName).options.language;
            $.data(div, formName).options.language = null;
            delete $.data(div, formName).options;
            $.data(div, formName).options = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).defaults;
            $.data(div, formName).defaults = null;                      
            $(div).children().remove();

        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        };
    };
    function unHandler(div, action) {
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'btnStb').unbind('click');
        $(headerId + 'btnMvodId').unbind('click');
        $(headerId + 'btnOK').unbind('click');
        $(headerId + 'btnPrevRpt').off('click', div, btnPrevRptClick);
        $(headerId + 'btnCancel').off('click');
        $(headerId + 'csCompcode').unbind('selectedIndexChanged');
    };
    function btnStbClick(event) {
        if ($(this).jqxButton('disabled')) { return; }
        ShowSO1131E(event.data, true);
    };
    function btnMvodIdClick(event) {
        if ($(this).jqxButton('disabled')) { return; }
        ShowSO1131E(event.data, false);
    };
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).attr('id');
        if ($(this).jqxButton('disabled')) { return; };
        if (!isDataOK(event.data)) { return;};
        PrepareData(event.data, function () {
            CalculateBill(event.data, function () {
                printDetail(event.data, function () {
                    CreateBillNo(event.data, function () {
                        DeleteView(event.data, function () {
                            if ($(headerId + 'chkRun').jqxCheckBox('checked')) {
                                messageBox(options.language.CalculateComplete, messageType.information);
                            };                            
                        });

                    });
                });
            });
        });
        
    };
    function btnPrevRptClick(event) {
        var headerId = '#' + $(event.data).attr('id');
        if ($(this).jqxButton('disabled')) { return; };
        printPrevious(event.data);
    };
    function chkCompSelected(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        //if ($.isFunction(act)) { act(true) };        
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { Mid: { type: 'string', value: 'SO32E0' } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkAuthority',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {

                            if ($.isFunction(act)) { act(true) };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical, null, function (flag) {
                                if ($.isFunction(act)) { act(false) };
                            });

                        };
                    } catch (err) {
                        errorHandle(formName, 'ChkAuthority-Server', err);
                        addHandler(div);

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
            errorHandle(formName, 'chkCompSelected', err);
        } finally {

        };
    };
    function csCompCodeSelected(event) {        
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var currentComp = options.loginInfo.loginInfo.rows[0].compcode;        
        options.loginInfo.loginInfo.rows[0].compcode = $(this).csList('codeNo');
        unHandler(event.data);
        chkCompSelected(event.data, function (r) {
            if (r) {
                //refreshUI(event.data);
                $(headerId + "csCompcode").csList('disabled', false);
                $(headerId + 'txtCloseDate').csDateTime('setText', null);
                $(headerId + 'txtShouldDate').csDateTime('setText', null);
                $(headerId + "txtStb").jqxInput('val', null);
                $(headerId + 'txtMVodId').jqxInput('val', null);
                FaciTable[FaciTableName].rows[0].FACISEQNO = null;
                FaciTable[FaciTableName].rows[0].MVODID = null;
                
                QueryDefaultValue(event.data, function () {
                    addHandler(event.data, function () {
                    });
                });
                //addHandler(event.data);                
            } else {                
                options.loginInfo.loginInfo.rows[0].compcode = currentComp;
                unHandler(event.data);
                $(headerId + "csCompcode").csList('codeNo', currentComp);
                addHandler(event.data);
            };
        })
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'btnStb').unbind('click')
            $(headerId + 'btnStb').on('click', div, btnStbClick);
            $(headerId + 'btnMvodId').unbind('click');
            $(headerId + 'btnMvodId').on('click', div, btnMvodIdClick);
            $(headerId + 'btnOK').unbind('click');
            $(headerId + 'btnOK').on('click', div, btnOKClick);
            $(headerId + 'btnPrevRpt').off('click', div, btnPrevRptClick);
            $(headerId + 'btnPrevRpt').on('click', div, btnPrevRptClick);
            $(headerId + 'btnCancel').off('click');
            $(headerId + 'btnCancel').on('click', function () {
                $(options['container']).csWindow('close');
            });
            $(headerId + 'csCompcode').unbind('selectedIndexChanged');
            $(headerId + 'csCompcode').bind('selectedIndexChanged',div,csCompCodeSelected);
            /*
            $(headerId + 'btnOK').unbind('click');
            $(headerId + 'btnOK').bind('click', div, btnOKClick);
            $(headerId + 'btnExit').unbind('click');
            $(headerId + 'btnExit').bind('click', function () {
                if ($(this).jqxButton('disabled')) { return; };
                if (options.containerIsWindow) {
                    $($.data(div, formName).options.container).csWindow('close');
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
                                    var csw = $.data(div, formName).options.container;
                                    csw.on("winClosing", function () {                                       
                                        csw.csWindow('close');
                                    });
                                };
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
    function formatStringDate(d, f, emptyPrompt) {
        try {
            Date.prototype.eeMMdd = function () {
                var ee = (parseInt(this.getFullYear().toString()) - 1911).toString();                
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based                         
                var dd = this.getDate().toString();
                return ee + '/' + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                   ((dd.length == 1) ? '0' + dd : dd);
            };
            Date.prototype.yyyyMM = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based                         
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM);
            };
            Date.prototype.yyyyMMdd = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
                var dd = this.getDate().toString();
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                   ((dd.length == 1) ? '0' + dd : dd);
            };
            Date.prototype.yyyyMMddHH = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
                var dd = this.getDate().toString();
                var hh = this.getHours().toString();
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                   ((dd.length == 1) ? '0' + dd : dd) + ' ' + ((hh.length == 1) ? '0' + hh : hh);
            };
            Date.prototype.yyyyMMddHHmm = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
                var dd = this.getDate().toString();
                var hh = this.getHours().toString();
                var m = this.getMinutes().toString();
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                   ((dd.length == 1) ? '0' + dd : dd) + ' ' + ((hh.length == 1) ? '0' + hh : hh) + ':' +
                   ((m.length == 1) ? '0' + m : m);
            };
            Date.prototype.yyyyMMddHHmmss = function () {
                var yyyy = this.getFullYear().toString();
                var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
                var dd = this.getDate().toString();
                var hh = this.getHours().toString();
                var m = this.getMinutes().toString();
                var ss = this.getSeconds().toString();
                return yyyy + '/' + ((MM.length == 1) ? '0' + MM : MM) + '/' +
                    ((dd.length == 1) ? '0' + dd : dd) + ' ' + ((hh.length == 1) ? '0' + hh : hh) + ':' +
                    ((m.length == 1) ? '0' + m : m) + ':' + ((ss.length == 1) ? '0' + ss : ss);
            };
            Date.prototype.HHmm = function () {
                var hh = this.getHours().toString();
                var m = this.getMinutes().toString();
                return ((hh.length == 1) ? '0' + hh : hh) + ':' +
                    ((m.length == 1) ? '0' + m : m)
            };
            Date.prototype.HHmmss = function () {
                var hh = this.getHours().toString();
                var m = this.getMinutes().toString();
                var ss = this.getSeconds().toString();
                return ((hh.length == 1) ? '0' + hh : hh) + ':' +
                    ((m.length == 1) ? '0' + m : m) + ':' + ((ss.length == 1) ? '0' + ss : ss);
            };
            var ret = '';
            switch (f) {
                case 'yyyyMMdd':
                    ret = d.yyyyMMdd();
                    break;
                case 'yyyyMMddHHmmss':
                    ret = d.yyyyMMddHHmmss();
                    break;
                case 'yyyyMM':
                    ret = d.yyyyMM();
                    break;
                case 'yyyyMMddHH':
                    ret = d.yyyyMMddHH();
                    break;
                case 'yyyyMMddHHmm':
                    ret = d.yyyyMMddHHmm();
                    break;
                case 'HHmm':
                    ret = d.HHmm();
                    break;
                case 'HHmmss':
                    ret = d.HHmmss();
                    break;
                case 'eeMMdd':
                    ret = d.eeMMdd();
                    break;
            };
            if (ret.length > 0 && emptyPrompt) {
                ret = ret.replace(/\D*/g, '');
            };
            return ret;
        }
        catch (err) {
            errorHandle(formName, 'formtStringDate', err);
        }
    };
    function getConditionData(div) {
        try {
            var options = $.data(div, formName).options;
            var table = getConditionStru();
            var lang = options.language;            
            //var col = ["fieldName", "fieldValue", "fieldDesc", "headName"];
            var row = {};
            
            //結算日期期限
            row["fieldName".toUpperCase()] = "CloseDate_1";
            row["fieldValue".toUpperCase()] = getControlObject(div, 'txtCloseDate').csDateTime('getText');
            row["fieldDesc".toUpperCase()] = getControlObject(div, 'txtCloseDate').csDateTime('getText');
            row["headName".toUpperCase()] = row["fieldName".toUpperCase()] + "," + lang.lable11;
            table.condition.rows.push(row);
            //客編
            row = {};            
            row["fieldName".toUpperCase()] = "CustId_1";
            row["fieldValue".toUpperCase()] = getControlObject(div, 'txtCustId').jqxMaskedInput('val');
            row["fieldDesc".toUpperCase()] = getControlObject(div, 'txtCustId').jqxMaskedInput('val')
            row["headName".toUpperCase()] = row["fieldName".toUpperCase()] + "," + lang.lable8;
            table.condition.rows.push(row);
            //txtStb 設備序號
            row = {};
            row["fieldName".toUpperCase()] = "StbSNo_1";
            row["fieldValue".toUpperCase()] = getControlObject(div, 'txtStb').jqxInput('val');
            row["fieldDesc".toUpperCase()] = getControlObject(div, 'txtStb').jqxInput('val');
            row["headName".toUpperCase()] = row["fieldName".toUpperCase()] + "," + lang.lable9;
            table.condition.rows.push(row);
            //MVodId
            'txtMVodId'
            row = {};
            row["fieldName".toUpperCase()] = "MVodId_1";
            row["fieldValue".toUpperCase()] = getControlObject(div, 'txtMVodId').jqxInput('val');
            row["fieldDesc".toUpperCase()] = getControlObject(div, 'txtMVodId').jqxInput('val');
            row["headName".toUpperCase()] = row["fieldName".toUpperCase()] + "," + lang.lable10;
            table.condition.rows.push(row);
            //應收日期
            row = {};
            row["fieldName".toUpperCase()] = "ShouldDate_1";
            row["fieldValue".toUpperCase()] = getControlObject(div, 'txtShouldDate').csDateTime('getText');
            row["fieldDesc".toUpperCase()] = getControlObject(div, 'txtShouldDate').csDateTime('getText');
            row["headName".toUpperCase()] = row["fieldName".toUpperCase()] + "," + lang.lable13;
            table.condition.rows.push(row);
            //公司別
            row = {};
            row["fieldName".toUpperCase()] = "CompCode_1";
            row["fieldValue".toUpperCase()] = getControlObject(div, 'csCompcode').csList('codeNo');
            row["fieldDesc".toUpperCase()] = getControlObject(div, 'csCompcode').csList('description')
            row["headName".toUpperCase()] = row["fieldName".toUpperCase()] + "," + lang.lable4;
            table.condition.rows.push(row);
            //服務類別
            row = {};
            row["fieldName".toUpperCase()] = "ServiceType_1";
            row["fieldValue".toUpperCase()] = getControlObject(div, 'csServiceType').csList('codeNo');
            row["fieldDesc".toUpperCase()] = getControlObject(div, 'csServiceType').csList('description');
            row["headName".toUpperCase()] = row["fieldName".toUpperCase()] + "," + lang.lable5;
            table.condition.rows.push(row);
            //View
            row = {};
            var content = null;
            if (ResultMessage != null) {
                content = ResultMessage.split(",")[0].toString().split(';')[0];
            };
            row["fieldName".toUpperCase()] = "ResultMessage";
            row["fieldValue".toUpperCase()] = content;
            row["fieldDesc".toUpperCase()] = content;
            row["headName".toUpperCase()] = content;
            table.condition.rows.push(row);
            
            //結果訊息
            /*
            if (options['ResultData'] != undefined) {
                row = {};
                row["fieldName".toUpperCase()] = "ResultMessage_1";
                row["fieldValue".toUpperCase()] = options['ResultData']['ResultData'].rows[0]['SO091Data'];
                row["fieldDesc".toUpperCase()] = options['ResultData']['ResultData'].rows[0]['Message'];
                row["headName".toUpperCase()] = row["fieldName".toUpperCase()] + "," + lang.ResultMessage;
                table.condition.rows.push(row);
            } */
            return table;
        }
        catch (err) {
            errorHandle(formName, 'getConditionData', err);
        }
    }
    function printPrevious(div) {
        try {
            var options = $.data(div, formName).options;
            options["conditionData"] = getConditionData(div);
            var syspId = 'SO1100U2';          
            printBydynamicReport(div, options, syspId, function () {
            }, true, true);
        }
        catch (err) {
            errorHandle(formName, 'printPrevious', err);
        }
    }
    function printDetail(div,action) {
        try {            
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).attr('id');
            
            if (!$(headerId + 'chkTran1').jqxCheckBox('checked') && (!$(headerId + 'chkTran2').jqxCheckBox('checked'))) {
                if ($.isFunction(action)) {
                    action();
                };
            };
            options["conditionData"] = getConditionData(div);
            var syspId = 'SO1100U2';
           
            if (ResultMessage.split(",")[2].toString() == '0') {                
                if ($(headerId + 'chkTran1').jqxCheckBox('checked')) {
                    messageBox(options.language.NoCalculateData, null, null, function () {
                        if (ResultMessage.split(",")[1].toString() == '0') {
                            if ($(headerId + 'chkTran2').jqxCheckBox('checked')) {
                                messageBox(options.language.NoNoneCalculateData, null, null, function () {
                                    if ($.isFunction(action)) {
                                        action();
                                    };
                                    return;
                                });
                            };
                        } else {
                            syspId = 'SO1100U1';
                            if ($(headerId + 'chkTran2').jqxCheckBox('checked')) {
                                printBydynamicReport(div, options, syspId, function () {
                                    if ($.isFunction(action)) {
                                        action();
                                    };
                                }, true);
                            };
                        };
                    });
                } else {
                    if ($(headerId + 'chkTran2').jqxCheckBox('checked')) {
                        if (ResultMessage.split(",")[1].toString() == '0') {
                            messageBox(options.language.NoNoneCalculateData, null, null, function () {
                                if ($.isFunction(action)) {
                                    action();
                                };
                                return;
                            });
                        } else {
                            syspId = 'SO1100U1';
                            printBydynamicReport(div, options, syspId, function () {
                                if ($.isFunction(action)) {
                                    action();
                                };
                            }, true);
                        }
                    };
                };
                                               
            } else {
                if ($(headerId + 'chkTran1').jqxCheckBox('checked')) {
                    printBydynamicReport(div, options, syspId, function () {                        
                        if (ResultMessage.split(",")[1].toString() == '0') {
                            if ($(headerId + 'chkTran2').jqxCheckBox('checked')) {
                                messageBox(options.language.NoNoneCalculateData, null, null, function () {
                                    if ($.isFunction(action)) {
                                        action();
                                    };
                                    return;
                                });
                            };
                            
                        } else {
                            syspId = 'SO1100U1';
                            if ($(headerId + 'chkTran2').jqxCheckBox('checked')) {
                                printBydynamicReport(div, options, syspId, function () {
                                    if ($.isFunction(action)) {
                                        action();
                                    };
                                }, true);
                            }
                           
                        };
                    }, true);
                } else {
                    if (ResultMessage.split(",")[1].toString() == '0') {
                        if ($(headerId + 'chkTran2').jqxCheckBox('checked')) {
                            messageBox(options.language.NoNoneCalculateData, null, null, function () {
                                if ($.isFunction(action)) {
                                    action();
                                };
                                return;
                            });
                        };

                    } else {
                        syspId = 'SO1100U1';
                        if ($(headerId + 'chkTran2').jqxCheckBox('checked')) {
                            printBydynamicReport(div, options, syspId, function () {
                                if ($.isFunction(action)) {
                                    action();
                                };
                            }, true);
                        }

                    };
                };
                
            };
         
        }
        catch (err) {
            errorHandle(formName, 'printDetail', err);
        }
    }
    function jsonDate(jdate) {
        try {
            var ary = jdate.split(/[^0-9]/);
            //2011-06-21T14:27:28.00
            ary = $.grep(ary, function (value) { return $.isNumeric(value) });
            var len = 7 - ary.length;
            if (len > 0) {
                for (i = 0; i < len; i++) {
                    ary.push(0);
                };
            };
            if (jdate.indexOf('下午') > 0 || jdate.toLowerCase().indexOf('pm') > 0) {
                ary[3] = parseInt(ary[3]) + 12;
            };
            return new Date(ary[0], parseInt(ary[1]) - 1, ary[2], ary[3], ary[4], ary[5], ary[6]);
        }
        catch (err) {
            errorHandle(formName, 'jsonDate', err);
        };
    };
    function isDataOK(div) {
        var headerId = '#' + $(div).attr('id');
        var options = $.data(div, formName).options;
        if ($(headerId + 'txtCloseDate').csDateTime('getText') == null) {
            messageBox(options.language.MustEndDate, null, null, function () {
                $(headerId + 'txtCloseDate').csDateTime('focus');
            });
            return false;
        };
        if (!$(headerId + 'chkTran1').jqxCheckBox('checked') && !$(headerId + 'chkTran2').jqxCheckBox('checked') && !$(headerId + 'chkRun').jqxCheckBox('checked')) {
            messageBox(options.language.MustChoose, null, null, function () {
                return false;
            });
            return;            
        }
       
        return true;
    };
    function ShowSO1131E(div, isSTB) {
        var faciPara = {
            chooseFaci: {
                columns: [{ name: 'CUSTID', type: 'integer' },
                    { name: 'SERVICETYPE', type: 'string' },
                    { name: 'FACISEQNO', type: 'string' },
                    { name: 'FACISNO', type: 'string' },
                    { name: 'MVODID', type: 'string' },
                ],
                rows: [{
                    CUSTID: null,
                    SERVICETYPE: null,
                    FACISEQNO: null,
                    FACISNO: null,
                    MVODID: null,
                }]
            }
        };
        try {
            var options = $.data(div, formName).options;
            var width = options.container.width();;
            var height = $(div).height();;
            var objectName = "SO1131E";
            var method;
            var x = ($(options.container).width() - width) / 2;
            var y = 26;
            var data = {};
            var headerId = '#' + $(div).attr('id');
            var isIncludeDVR = false;
            var isCanMutilChoose = false;
            var isQueryMVodID = false;
            
            
            FaciTable[FaciTableName].rows[0].CUSTID =parseInt( $(headerId + 'txtCustId').jqxMaskedInput('val'));
            FaciTable[FaciTableName].rows[0].SERVICETYPE = $(headerId + 'csServiceType').csList('codeNo');
            faciPara['chooseFaci'].rows[0].CUSTID = parseInt($(headerId + 'txtCustId').jqxMaskedInput('val'));
            faciPara['chooseFaci'].rows[0].SERVICETYPE = $(headerId + 'csServiceType').csList('codeNo');
            if (isSTB) {
                faciPara['chooseFaci'].rows[0].FACISEQNO = FaciTable[FaciTableName].rows[0].STBFACISEQNO;
                faciPara['chooseFaci'].rows[0].FACISNO = FaciTable[FaciTableName].rows[0].STBFACISNO;
            } else {
                isCanMutilChoose = true;
                isQueryMVodID = true;
                faciPara['chooseFaci'].rows[0].FACISEQNO = FaciTable[FaciTableName].rows[0].MVODIDFACISEQNO;
            };
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),
                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                hasClosing: false,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language.ShowSO1131C + " [SO1131E]", winOptions);

            $('#' + win.windowId).one('close', function () {
                otherForm.length = 0;
                otherForm = [];
                var r = $.extend(true, {}, $.data($('#' + win.contentId)[0], objectName).options);
                if (r.faciData.rows.length > 0) {                  
                    if (isSTB) {
                        $(headerId + "txtStb").jqxInput('val', null);
                        FaciTable[FaciTableName].rows[0].FACISNO = null;
                        FaciTable[FaciTableName].rows[0].STBFACISNO = null;
                        FaciTable[FaciTableName].rows[0].FACISEQNO = null;
                        FaciTable[FaciTableName].rows[0].STBFACISEQNO = null;
                        if (r.faciData.rows[0]['faciSNO'.toUpperCase()] != undefined) {
                            if (r.faciData.rows[0]['faciSNO'.toUpperCase()] != '') {
                                FaciTable[FaciTableName].rows[0].FACISNO = r.faciData.rows[0]['faciSNO'.toUpperCase()];
                                FaciTable[FaciTableName].rows[0].STBFACISNO = r.faciData.rows[0]['faciSNO'.toUpperCase()];
                                $(headerId + "txtStb").jqxInput('val', r.faciData.rows[0]['faciSNO'.toUpperCase()]);
                            };
                        };
                        if (r.faciData.rows[0]['SEQNO'.toUpperCase()] != undefined) {
                            if (r.faciData.rows[0]['SEQNO'.toUpperCase()] != '') {
                                FaciTable[FaciTableName].rows[0].FACISEQNO = r.faciData.rows[0]['SEQNO'.toUpperCase()];
                                FaciTable[FaciTableName].rows[0].STBFACISEQNO = r.faciData.rows[0]['SEQNO'.toUpperCase()];
                            };
                        };
                    } else {
                        $(headerId + 'txtMVodId').jqxInput('val', null);
                        FaciTable[FaciTableName].rows[0].MVODID = null;
                        FaciTable[FaciTableName].rows[0].MVODIDFACISNO = null;
                        FaciTable[FaciTableName].rows[0].MVODIDFACISEQNO = null;
                        if (r.MVodID != null) {
                            FaciTable[FaciTableName].rows[0].MVODID = r.MVodID;
                            //$(headerId + 'txtMVodId').jqxInput('val', r.MVodID);
                        };
                       
                        $.each(r.faciData.rows, function (index, value) {
                            if (value['FACISNO'] != undefined ) {
                                if (value['FACISNO'] != null) {
                                    if (FaciTable[FaciTableName].rows[0].MVODIDFACISNO == null) {
                                        FaciTable[FaciTableName].rows[0].MVODIDFACISNO = value['FACISNO']
                                    } else {
                                        FaciTable[FaciTableName].rows[0].MVODIDFACISNO = FaciTable[FaciTableName].rows[0].MVODIDFACISNO + ',' + value['FACISNO'];
                                    };
                                };                                
                            };
                            if (value['SEQNO'] != undefined) {
                                if (value['SEQNO'] != null) {
                                    if (FaciTable[FaciTableName].rows[0].MVODIDFACISEQNO == null) {
                                        FaciTable[FaciTableName].rows[0].MVODIDFACISEQNO = value['SEQNO']
                                    } else {
                                        FaciTable[FaciTableName].rows[0].MVODIDFACISEQNO = FaciTable[FaciTableName].rows[0].MVODIDFACISEQNO  + ',' + value['SEQNO'];
                                    };
                                };
                            };
                        });
                        $(headerId + 'txtMVodId').jqxInput('val', FaciTable[FaciTableName].rows[0].MVODIDFACISNO);
                    };
                };
               
                $('#' + win.contentId)[objectName]('destroy');
                $('#' + win.windowId).csWindow('destroy');
                //options.childForm.length = 0;
                deleteJSONObject(data);
                
                delete r;
                r = null;
            });
            $('#' + win.contentId)[objectName]({
                    loginInfo: cloneJSON(options.loginInfo),
                    container: $('#' + win.windowId),
                    parameters: cloneJSON(faciPara),
                    theme: options.theme,
                    includeDVR: isIncludeDVR,
                    canMutilChoose: isCanMutilChoose,
                    isQueryMVodID : isQueryMVodID,
                    localization:cloneJSON( options.localization)
             });
            otherForm.push(['#' + win.contentId, objectName]);
        }
        catch (err) {
            errorHandle(formName, 'ShowSO1131E', err);
        } finally {
            delete faciPara;
            faciPara = null;
        }
    };
    function DeleteView(div, action) {
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { ViewName: { type: 'string', value: ResultMessage } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'DeleteView',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {                           
                            delete d;
                            d = null;
                            delete data;
                            data = null;
                            if ($.isFunction(action)) { action() };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };
                    } catch (err) {
                        errorHandle(formName, 'DeleteView-Server', err);
                        addHandler(div);

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
            errorHandle(formName, 'DeleteView', err);
        } finally {

        };
    };
    function CreateBillNo(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (!$(headerId + 'chkRun').jqxCheckBox('checked')) {
            if ($.isFunction(action)) { action() };
            return;
        };
        if (dsSource.Result.rows.length == 0) {
            if ($.isFunction(action)) { action() };
            return;
        };
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { dsSource: { type: 'string', value: dsSource } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'CreateBillNo',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            //ResultMessage = data.ResultXML;
                            var d = JSON.parse(data.ResultXML);
                            CacluResult = {};
                            $.extend(true,CacluResult, d);
                            if (d.SO062 != undefined) {
                                if (d.SO062.rows.length > 0) {
                                    if (d.SO062.rows[0].TRANDATE != undefined) {
                                        var dd = jsonDate(d.SO062.rows[0].TRANDATE);
                                        $(headerId + 'lblTranDate').text(formatStringDate(dd, 'eeMMdd', false));
                                    };
                                    if (d.SO062.rows[0].UPDTIME != undefined) {
                                        $(headerId + 'lblUpdTime').text(d.SO062.rows[0].UPDTIME);
                                    };
                                    if (d.SO062.rows[0].UPDEN != undefined) {
                                        $(headerId + 'lblUpdEn').text(d.SO062.rows[0].UPDEN);
                                    };
                                };
                            };
                            
                       
                                                                
                      
                            /*
                            delete options.initData;
                            options.initData = {};
                            $.extend(true, options.initData, d);
                            $(headerId + 'csCompcode').csList('source', options.initData.CompCode.rows);
                            $(headerId + 'csCompcode').csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                            $(headerId + 'csServiceType').csList('source', options.initData.ServiceType.rows);
                            $(headerId + 'csServiceType').csList('codeNo', 'D');
                            $(headerId + 'lblTranDate').text('');
                            $(headerId + 'lblUpdEn').text('');
                            $(headerId + 'lblUpdTime').text('');
                            if (options.initData.ClosePara.rows.length > 0) {
                                $(headerId + 'lblTranDate').text(options.initData.ClosePara.rows[0]['TranDate'.toUpperCase()]);
                                $(headerId + 'lblUpdTime').text(options.initData.ClosePara.rows[0]['UpdTime'.toUpperCase()]);
                                $(headerId + 'lblUpdEn').text(options.initData.ClosePara.rows[0]['UpdEn'.toUpperCase()]);
                            };
                            $(headerId + 'lblPara35').text('0');
                            $(headerId + 'lblPara36').text('0');
                            if (options.initData.ChargePara.rows.length > 0) {
                                $(headerId + 'lblPara35').text(options.initData.ChargePara.rows[0]['Para35'.toUpperCase()]);
                                $(headerId + 'lblPara36').text(options.initData.ChargePara.rows[0]['Para36'.toUpperCase()]);

                            }; */
                            delete d;
                            d = null;
                            delete data;
                            data = null;
                            if ($.isFunction(action)) { action() };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };
                    } catch (err) {
                        errorHandle(formName, 'CreateBillNo-Server', err);
                        addHandler(div);

                    } finally {
                        parameters = null;
                        params = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete params;
                    };
                }
            },3600);

        } catch (err) {
            errorHandle(formName, 'CalculateBill', err);
        } finally {

        };
    };
    function CalculateBill(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        dsSource.Result.rows.length = 0;
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { dsSource: { type: 'string', value: PrepareTable } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'CalculateBill',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            ResultMessage = data.ResultXML;
                            if (data.ResultDataSet.Result.length > 0) {
                                $.extend(true, dsSource.Result.rows, data.ResultDataSet.Result);
                            };
                            
                            //var d = JSON.parse(data.ResultXML);
                            //$.extend(ResultData, d, true);
                            /*
                            delete options.initData;
                            options.initData = {};
                            $.extend(true, options.initData, d);
                            $(headerId + 'csCompcode').csList('source', options.initData.CompCode.rows);
                            $(headerId + 'csCompcode').csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                            $(headerId + 'csServiceType').csList('source', options.initData.ServiceType.rows);
                            $(headerId + 'csServiceType').csList('codeNo', 'D');
                            $(headerId + 'lblTranDate').text('');
                            $(headerId + 'lblUpdEn').text('');
                            $(headerId + 'lblUpdTime').text('');
                            if (options.initData.ClosePara.rows.length > 0) {
                                $(headerId + 'lblTranDate').text(options.initData.ClosePara.rows[0]['TranDate'.toUpperCase()]);
                                $(headerId + 'lblUpdTime').text(options.initData.ClosePara.rows[0]['UpdTime'.toUpperCase()]);
                                $(headerId + 'lblUpdEn').text(options.initData.ClosePara.rows[0]['UpdEn'.toUpperCase()]);
                            };
                            $(headerId + 'lblPara35').text('0');
                            $(headerId + 'lblPara36').text('0');
                            if (options.initData.ChargePara.rows.length > 0) {
                                $(headerId + 'lblPara35').text(options.initData.ChargePara.rows[0]['Para35'.toUpperCase()]);
                                $(headerId + 'lblPara36').text(options.initData.ChargePara.rows[0]['Para36'.toUpperCase()]);

                            }; */
                            delete data;
                            data = null;
                            if ($.isFunction(action)) { action() };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };
                    } catch (err) {
                        errorHandle(formName, 'CalculateBill-Server', err);
                        addHandler(div);

                    } finally {
                        parameters = null;
                        params = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete params;
                    };
                }
            },3600);

        } catch (err) {
            errorHandle(formName, 'CalculateBill', err);
        } finally {

        };
    };
    function QueryDefaultValue(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');       
        try {
            var parameters = $.extend({}, getParaLoginInfo(div, formName),
              { ServiceType: { type: 'string', value: 'D' } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryDefaultValue',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var d = JSON.parse(data.ResultXML);
                            delete options.initData;
                            options.initData = {};
                            $.extend(true, options.initData, d);
                            $(headerId + 'csCompcode').csList('source', options.initData.CompCode.rows);
                            $(headerId + 'csCompcode').csList('codeNo', options.loginInfo.loginInfo.rows[0].compcode);
                            $(headerId + 'csServiceType').csList('source', options.initData.ServiceType.rows);
                            $(headerId + 'csServiceType').csList('codeNo', 'D');                           
                            $(headerId + 'lblTranDate').text('');
                            $(headerId + 'lblUpdEn').text('');
                            $(headerId + 'lblUpdTime').text('');
                            if (options.initData.ClosePara.rows.length > 0) {
                                if (options.initData.ClosePara.rows[0]['TranDate'.toUpperCase()] != null) {
                                    var d = jsonDate(options.initData.ClosePara.rows[0]['TranDate'.toUpperCase()]);
                                    //$(headerId + 'lblAcceptTime').text(formatStringDate(d, 'yyyyMMddHHmmss', false));
                                    $(headerId + 'lblTranDate').text(formatStringDate(d, 'eeMMdd', false));
                                };
                                                                
                                $(headerId + 'lblUpdTime').text(options.initData.ClosePara.rows[0]['UpdTime'.toUpperCase()]);
                                $(headerId + 'lblUpdEn').text(options.initData.ClosePara.rows[0]['UpdEn'.toUpperCase()]);
                            };
                            $(headerId + 'lblPara35').text('0');
                            $(headerId + 'lblPara36').text('0');
                            if (options.initData.ChargePara.rows.length > 0) {
                                $(headerId + 'lblPara35').text(options.initData.ChargePara.rows[0]['Para35'.toUpperCase()]);
                                $(headerId + 'lblPara36').text(options.initData.ChargePara.rows[0]['Para36'.toUpperCase()]);
                                
                            };
                            if (!chkPriv(div, 'SO32E021')) {
                                $(headerId + 'chkRun').jqxCheckBox({ disabled: true });
                                $(headerId + 'chkRun').jqxCheckBox({ checked: false });
                            };
                            if ($.isFunction(action)) { action() };
                        }
                        else {                           
                            messageBox(data.ErrorMessage, messageType.critical);
                        };
                    } catch (err) {
                        errorHandle(formName, 'QueryDefaultValue-Server', err);
                        addHandler(div);

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
            errorHandle(formName, 'QueryDefaultValue', err);
        } finally {

        };
    };
    function PrepareData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');        
        PrepareTable[PrepareTableName].rows[0].PARA35 = 0;
        PrepareTable[PrepareTableName].rows[0].PARA36 = 0;
        PrepareTable[PrepareTableName].rows[0].CUSTID = -1;
        PrepareTable[PrepareTableName].rows[0].SERVICETYPE = 'D';
        PrepareTable[PrepareTableName].rows[0].FACISEQNO = null;
        PrepareTable[PrepareTableName].rows[0].MVODID = null;
        PrepareTable[PrepareTableName].rows[0].ENDDATE = null;
        PrepareTable[PrepareTableName].rows[0].SHOULDDATE = null;
        PrepareTable[PrepareTableName].rows[0].FORCEAMOUNT = false;
        PrepareTable[PrepareTableName].rows[0].COMPCODE = null;
        PrepareTable[PrepareTableName].rows[0].PARA35 = parseInt(options.initData.ChargePara.rows[0]['Para35'.toUpperCase()]);
        PrepareTable[PrepareTableName].rows[0].PARA36 = parseInt(options.initData.ChargePara.rows[0]['Para36'.toUpperCase()]);
        if ($(headerId + 'txtCustId').jqxMaskedInput('val') != '') {
            PrepareTable[PrepareTableName].rows[0].CUSTID = parseInt($(headerId + 'txtCustId').jqxMaskedInput('val'));
        };
        PrepareTable[PrepareTableName].rows[0].SERVICETYPE = $(headerId + 'csServiceType').csList('codeNo');
        PrepareTable[PrepareTableName].rows[0].COMPCODE = options.loginInfo.loginInfo.rows[0].compcode;
        if (FaciTable[FaciTableName].rows[0].FACISEQNO != null) {
            PrepareTable[PrepareTableName].rows[0].FACISEQNO = FaciTable[FaciTableName].rows[0].FACISEQNO;
        };
        if (FaciTable[FaciTableName].rows[0].MVODID != null) {
            PrepareTable[PrepareTableName].rows[0].MVODID = FaciTable[FaciTableName].rows[0].MVODID;
        };
        PrepareTable[PrepareTableName].rows[0].ENDDATE = $(headerId + 'txtCloseDate').csDateTime('getText');
        if ($(headerId + 'txtShouldDate').csDateTime('getText') != null) {
            PrepareTable[PrepareTableName].rows[0].SHOULDDATE = $(headerId + 'txtShouldDate').csDateTime('getText');
        };
        if ($(headerId + 'chkForceAmount').jqxCheckBox('checked')) {
            PrepareTable[PrepareTableName].rows[0].FORCEAMOUNT = true;
        };
        PrepareTable[ExcelTableName].rows.length = 0;
        if ($(headerId + 'txtUploadField').csUploadFile('getFiles') != '') {
            $(headerId + 'txtUploadField').one('load', function (e, filename) {
                importExcel(div, filename, function () {                    
                    if ($.isFunction(action)) { action(); };
                });
            });
            $(headerId + 'txtUploadField').one('error', function (event, errmsg) {
                messageBox(errmsg, messageType.critical);                
            });
            $(headerId + 'txtUploadField').csUploadFile('uploadFiles');
        } else {
            if ($.isFunction(action)) { action(); };
        }
    };
    function importExcel(div, xlsFileName, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var loginInfo = getParaLoginInfo(div, formName);
        try {
            //prepareData(div);
            var parameters = $.extend({}, loginInfo,
                  { xlsFileName: { type: 'string', value: xlsFileName } });

            var params = getParameters(riadllName,
                  riaClassName,
                  'ImportExcel',
                  JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            messageBox(data.ErrorMessage, messageType.critical);
                            return;
                            //if ($.isFunction(action)) { action() };
                        } else {
                            if (data.ResultXML != '') {
                                var d = JSON.parse(data.ResultXML);
                                if (d.ImportExcel.rows.length > 0) {
                                    PrepareTable[ExcelTableName].rows = d.ImportExcel.rows;
                                };
                                if ($.isFunction(action)) { action() };
                                delete d;
                                d = null;
                                /*
                                
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

                                            showSO3311G(div, d.ImportError.rows[0].ErrorName, action);
                                        } else {
                                            if ($.isFunction(action)) { action() };
                                        };
                                    } finally {
                                        delete d;
                                        d = null;
                                    };
                                });
                                //d.ImportError.rows[0].ErrorName */


                            } else {

                            };
                        };
                    } catch (err) {
                        errorHandle(formName, 'importExcel-Server', err);
                        //if ($.isFunction(action)) { action() };
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
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        otherForm = [];
        ParaTableName = 'VODCalculate'.toUpperCase();
        if (options.parentDataTableName != undefined) {
            ParaTableName = options.parentDataTableName;
        };
        PrepareTableName = 'Para';
        FaciTableName = 'chooseFaci';
        ExcelTableName = 'ImportExcel';
         FaciTable = {            
             chooseFaci: {
                columns: [{ name: 'CUSTID', type: 'integer' },
                    { name: 'SERVICETYPE', type: 'string' },
                    { name: 'FACISEQNO', type: 'string' },
                    { name: 'FACISNO', type: 'string' },
                    { name: 'MVODID', type: 'string' },
                    { name: 'STBFACISEQNO', type: 'string' },
                    { name: 'STBFACISNO', type: 'string' },
                    { name: 'MVODIDFACISEQNO', type: 'string' },
                    { name: 'MVODIDFACISNO', type: 'string' }
                ],                
                rows: [{
                    CUSTID: null,
                    SERVICETYPE: null,
                    FACISEQNO: null,
                    FACISNO: null,
                    MVODID: null,
                    STBFACISEQNO: null,
                    STBFACISNO: null,
                    MVODIDFACISEQNO: null,
                    MVODIDFACISNO: null
                }]
            }
         };
         PrepareTable = {
             Para: {
                 columns: [{ name: 'PARA35', type: 'integer' },
                     { name: 'PARA36', type: 'integer' },
                     { name: 'CUSTID', type: 'integer' },
                     { name: 'SERVICETYPE', type: 'string' },
                     { name: 'FACISEQNO', type: 'string' },
                     { name: 'MVODID', type: 'string' },
                     { name: 'ENDDATE', type: 'string' },
                     { name: 'SHOULDDATE', type: 'string' },
                     { name: 'FORCEAMOUNT', type: 'boolean' },
                     { name: 'COMPCODE', type: 'integer' }
                 ],
                 rows: [{
                     PARA35: 0,
                     PARA36: 0,
                     CUSTID: -1,
                     SERVICETYPE: 'D',
                     FACISEQNO: null,
                     MVODID: null,
                     ENDDATE: null,
                     SHOULDDATE: null,
                     FORCEAMOUNT: false,
                     COMPCODE:null
                 }]
             },
             ImportExcel: {
                 columns: [{ name: 'CUSTID', type: 'integer' },
                     { name: 'VODACCOUNTID', type: 'string' },
                     { name: 'FACISNO', type: 'string' }                    
                 ],
                 rows: []
             }
         };
         dsSource = {
             Result: {
                 columns: [{ name: 'COMPCODE', type: 'integer' },
                     { name: 'CUSTID', type: 'integer' },
                     { name: 'ENDDATE', type: 'date' },
                     { name: 'FACICODE', type: 'integer' },
                     { name: 'FACISNO', type: 'string' },
                     { name: 'FLAG', type: 'integer' },
                     { name: 'HASOVERCREDIT', type: 'integer' },
                     { name: 'HASOVERCREDIT2', type: 'integer' },
                     { name: 'MINUSEDATE', type: 'date' },
                     { name: 'MUSTPAYCREDIT', type: 'integer' },
                     { name: 'MUSTPAYCREDIT2', type: 'integer' },
                     { name: 'NOPAYCREDIT', type: 'integer' },
                     { name: 'OVERCREDIT', type: 'integer' },
                     { name: 'OVERCREDIT2', type: 'integer' },
                     { name: 'PARA35', type: 'integer' },
                     { name: 'PARA36', type: 'integer' },
                     { name: 'PREPAY', type: 'integer' },
                     { name: 'PRESENT', type: 'integer' },
                     { name: 'PRESENTX', type: 'integer' },
                     { name: 'RANKX', type: 'integer' },
                     { name: 'RESEQNO', type: 'string' },
                     { name: 'SEQNO', type: 'string' },
                     { name: 'SERVICETYPE', type: 'string' },
                     { name: 'SHOULDDATE', type: 'date' },
                     { name: 'UNPAY', type: 'integer' },
                     { name: 'VODACCOUNTID', type: 'string' }
                 ],
                 rows: []
             }            
         };
        try {
            changeLanguage(div);
            renderControl(div);           
            $(headerId + 'txtCustId').jqxMaskedInput({ disabled: true });
            $(headerId + 'txtMVodId').jqxInput({ disabled: true });
            $(headerId + 'txtStb').jqxInput({ disabled: true });
            $(headerId + 'chkRun').jqxCheckBox({ checked: true });
            $(headerId + 'chkTran1').jqxCheckBox({ checked: true });
            $(headerId + 'chkTran2').jqxCheckBox({ checked: true });
            $(headerId + 'btnStb').jqxButton({ disabled: true });
            $(headerId + 'btnMvodId').jqxButton({ disabled: true });
            if (!$.isEmptyObject(options.parameters)) {
                if (options.parameters[ParaTableName] != undefined) {
                    if (options.parameters[ParaTableName].rows.length > 0) {
                        if (options.parameters[ParaTableName].rows[0]['CustId'.toUpperCase()] != undefined) {
                            $(headerId + 'txtCustId').val(options.parameters[ParaTableName].rows[0]['CustId'.toUpperCase()]);
                            $(headerId + 'ImportExcel').css('visibility', 'hidden');
                            $(headerId + 'btnStb').jqxButton({ disabled: false });
                            $(headerId + 'btnMvodId').jqxButton({ disabled: false });
                            $(headerId + 'chkForceAmount').jqxCheckBox({ checked: true });
                            $(headerId + 'chkRun').jqxCheckBox({ checked: false });
                            $(headerId + 'chkTran1').jqxCheckBox({ checked: true });
                            $(headerId + 'chkTran2').jqxCheckBox({ checked: false });
                            
                        };
                    };
                };
            };
            QueryDefaultValue(div, function () {
                addHandler(div, function () {
                });
            });
         
        } catch (err) {
            errorHandle(formName, 'initData', err);

        } finally {
            if ($.isFunction(action)) { action(); };
        }
    };
    function chkPriv(div, privName) {
        var options = $.data(div, formName).options;
        var result = false;
        $.each(options.initData.Priv.rows, function (index, value) {
            if (value['MID'].toUpperCase() == privName.toUpperCase()) {
                if (value['GROUPX'] == 1) {
                    result = true;
                    return;
                }
            };
        });
        return result;
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