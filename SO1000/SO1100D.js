(function ($) {
    var formName = "SO1100D";
    var riadllName = "CableSoft.SO.RIA.Customer.Account.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Customer.Account.Web.Account";
    var fieldPrivTableName = "FieldPriv";
    var userPrivTableName = "Priv";
    var otherForm = [];
    var defaults = (function () {
        this.language = {};        
        this.initData = {};
        this.loginInfo = {};
        this.isACH = false;
        this.editMode = 0;
        this.dsSave = {};
        this.parameters = {};
        this.masterId = -1;
        this.custId = -1;
        this.controls = [];
        this.isSaved = false;
        this.isAutoClosed = true;
        this.containerIsWindow = false;
        this.seqNo = -1;
        this.theme = '';
        this.returnMasterid = -1;
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
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            otherForm.forEach(function (element) {
                $(element[0]).off();
                $(element[0])[element[1]]('destroy');
            });
            otherForm.length = 0;
            otherForm = null;
            unBindHandler(div);
            $('body').off('scroll.' + 'datetimeinput' + $(div).prop('id') + 'txtHide');                        
            var controls = $.data(div, formName).options.controls;
           
            destroyControls(controls);
            deleteJSONObject(options);
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
            return canView(params, param2);
        },
        canAppend: function (jq, params, param2) {
            return canAppend(params, param2);
        },
        canEdit: function (jq, params, param2) {
            return canEdit(params, param2);
        },
        canDelete: function (jq, params, param2) {
            return canDelete(params, param2);
        },
        canPrint: function (jq, params, param2) {
            return canPrint(params, param2);
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
    $.fn.SO1100D = function (options, param, param2) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param,param2);
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
                            options: $.extend({}, new defaults(), new SO1100D(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1100D_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1100D', err);
        }
    };
    function canPrint(data, action) {

        try {
            var loginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend(true, {}, loginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'CanPrint',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if ($.isFunction(action)) {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }
                }
            });
        } catch (err) {
            errorHandle(formName, 'canPrint', err);
        };
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
    function canDelete(data, action) {

        try {
            var loginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend(true, {}, loginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'CanDelete',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if ($.isFunction(action)) {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }
                }
            });
        } catch (err) {
            errorHandle(formName, 'canDelete', err);
        };
    };
    function canEdit(data, action) {

        try {
            var loginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend(true, {},loginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'CanEdit',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if ($.isFunction(action)) {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }
                }
            });
        } catch (err) {
            errorHandle(formName, 'canEdit', err);
        };
    };
    function canAppend(data, action) {

        try {
            var loginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend(true, {}, loginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'CanAppend',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if ($.isFunction(action)) {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }
                }
            });
        } catch (err) {
            errorHandle(formName, 'canAppend', err);
        };
    };
    function canView(data, action) {

        try {
            var loginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend(true, {}, loginInfo);
            var params = getParameters(riadllName,
                riaClassName,
                'CanView',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    if ($.isFunction(action)) {
                        action([d.ResultBoolean, d.ErrorMessage]);
                    }
                }
            });
        } catch (err) {
            errorHandle(formName, 'canView', err);
        };
    };
    function winClosing(event) {
        var options = $.data(event.data, formName).options;
        if (options.editMode == editMode.view) {
            $($.data(event.data, formName).options.container).csWindow('close');
            return;
        };
        disableAllControl(event.data);        
        messageBox(options.language.QuitAskStr, messageType.yesno, null, function (flag) {
            if (flag == 'yes') {
                $($.data(event.data, formName).options.container).csWindow('close');
            } else {
                changeMode(event.data);
            };
        });
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            /*
            if (options.loginInfo.loginInfo.value == undefined) {
                options.loginInfo = $.extend(true, {}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
            }; */
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
                                csw.on("winClosing", div, winClosing);


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
                        initData(div, options.editMode, function () {
                            $(div).triggerHandler('loaded', [this, options]);
                            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                options.containerIsWindow = true;
                                var csw = $.data(div, formName).options.container;
                                csw.on("winClosing",div, winClosing);
                                
                             
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
    function chkAuthorities(div, priv) {
        var options = $.data(div, formName).options;
        var result = false;
        try {
            if (options.initData.Priv == undefined) { return false; };
            if (options.initData.Priv.rows.length == 0) { return false; };
            $.each(options.initData.Priv.rows, function (index, row) {

                if (row['MID'].toString().toUpperCase() == priv.toUpperCase()) {
                    result = (row['GROUPX'.toUpperCase()] == 1);
                    return result;
                };

            });
            return result;
        } catch (err) {
            errorHandle(formName, 'chkAuthorities', err);
            return false
        } finally {

        }
    };
    function formatStringDate(d, f, emptyPrompt) {
        try {
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
    function rcdToScr(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            if (options.initData.Declared.rows.length == 0) {
                messageBox(options.language.NOSO137Data, messageType.critical);
                return false;
            };
            $(headerId + 'txtID').jqxInput('val', options.initData.Declared.rows[0]['ID']);
            $(headerId + 'cboProposer').jqxInput('val', options.initData.Declared.rows[0]['DECLARANTNAME']);
            //$(headerId + 'cboProposer').jqxDropDownList('selectItem', options.initData.Declared.rows[0]['DECLARANTNAME']);
            //$(headerId + 'cboProposer').jqxInput('val', options.initData.Declared.rows[0]['DECLARANTNAME']);
            if (options.editMode == editMode.append) {
                if ($.isFunction(action)) { action() };
                return true;
            };
            if (options.initData.Account.rows.length == 0) {
                if ($.isFunction(action)) { action() };
                return true ;
            };
            if (options.initData.Account.rows[0]['Proposer'.toUpperCase()] != null) {
                //$(headerId + 'cboProposer').jqxDropDownList('selectItem', options.initData.Account.rows[0]['Proposer'.toUpperCase()]);
                $(headerId + 'cboProposer').jqxInput('val', options.initData.Declared.rows[0]['DECLARANTNAME']);
            };
            

            //$(headerId + 'txtID').jqxMaskedInput({ value: null });
           
            
            if (options.initData.Account.rows[0]['Alien'.toUpperCase()] != undefined) {
                if (options.initData.Account.rows[0]['Alien'.toUpperCase()]) {
                    $(headerId + 'chkFore').jqxCheckBox('check');
                };
            };
            
            /*
            $(headerId + 'gilCMCode').csList('codeNo',
                 options.initData.Account.rows[0]['CMcode'.toUpperCase()]); */
           // $(headerId + 'gilCMCode').csList('clearDisplayValue');
            if (options.initData.Account.rows[0]['CMcode'.toUpperCase()] != undefined) {
                if (options.initData.Account.rows[0]['CMcode'.toUpperCase()] != null) {
                    $(headerId + 'gilCMCode').csList('codeNo', options.initData.Account.rows[0]['CMcode'.toUpperCase()]);
                    if ($(headerId + 'gilCMCode').csList('description') == undefined || $(headerId + 'gilCMCode').csList('description') == null) {
                        $(headerId + 'gilCMCode').csList('setDisplayValue',
                        {
                            CODENO: options.initData.Account.rows[0]['CMcode'.toUpperCase()],
                            DESCRIPTION: options.initData.Account.rows[0]['CMName'.toUpperCase()],
                        });
                    };
                    
                };
            };
            
            /*
            $(headerId + 'gilPTCode').csList('codeNo',
                 options.initData.Account.rows[0]['PTCode'.toUpperCase()]); */
            $(headerId + 'gilPTCode').csList('clearDisplayValue');
            if (options.initData.Account.rows[0]['PTCode'.toUpperCase()] != undefined) {
                if (options.initData.Account.rows[0]['PTCode'.toUpperCase()] != null) {
                    $(headerId + 'gilPTCode').csList('setDisplayValue', {
                        CODENO: options.initData.Account.rows[0]['PTCode'.toUpperCase()],
                        DESCRIPTION: options.initData.Account.rows[0]['PTName'.toUpperCase()],
                    });
                };
            };
          
            /*
            $(headerId + 'gilBankCode').csList('codeNo',
                 options.initData.Account.rows[0]['BankCode'.toUpperCase()]); */
            $(headerId + 'gilBankCode').csList('clearDisplayValue');
            if (options.initData.Account.rows[0]['BankCode'.toUpperCase()] != undefined) {
                if (options.initData.Account.rows[0]['BankCode'.toUpperCase()] != null) {
                    $(headerId + 'gilBankCode').csList('setDisplayValue', {
                        CODENO: options.initData.Account.rows[0]['BankCode'.toUpperCase()],
                        DESCRIPTION: options.initData.Account.rows[0]['BankName'.toUpperCase()],
                    });
                };
            };
            


            $(headerId + 'txtAccountNo').jqxMaskedInput('val','');
            if (options.initData.Account.rows[0]['AccountID'.toUpperCase()] != undefined) {
                //$(headerId + 'txtAccountNo').jqxMaskedInput('val', options.initData.Account.rows[0]['AccountID'.toUpperCase()]);
                $(headerId + 'txtAccountNo').jqxMaskedInput({ value: options.initData.Account.rows[0]['AccountID'.toUpperCase()] });
            };
            
            if (options.initData.Account.rows[0]['CVC2'.toUpperCase()] != undefined) {
                $(headerId + 'txtCVC2').jqxMaskedInput('val', options.initData.Account.rows[0]['CVC2'.toUpperCase()]);
            } else {
                $(headerId + 'txtCVC2').jqxMaskedInput('val', null);
            };
            
            
            $(headerId + 'gilCardName').csList('clearDisplayValue');
            if (options.initData.Account.rows[0]['CardCode'.toUpperCase()] != undefined) {
                if (options.initData.Account.rows[0]['CardCode'.toUpperCase()] != null) {
                    //$(headerId + 'gilCardName').csList('codeNo', options.initData.Account.rows[0]['CardCode'.toUpperCase()]);
                    $(headerId + 'gilCardName').csList('setDisplayValue', {
                        CODENO: options.initData.Account.rows[0]['CardCode'.toUpperCase()],
                        DESCRIPTION: options.initData.Account.rows[0]['CardName'.toUpperCase()],
                    }); 
                    //$(headerId + 'gilCardName').csList('codeNo', options.initData.Account.rows[0]['CardCode'.toUpperCase()]);
                };
            };
           

            $(headerId + 'txtHide').jqxDateTimeInput('setDate', null);
            //$(headerId + 'txtHide').csDateTime('setDate', null);
            if (options.initData.Account.rows[0]['StopYM'.toUpperCase()] != undefined) {
                if (options.initData.Account.rows[0]['StopYM'.toUpperCase()] != null) {
                    var stopYM = options.initData.Account.rows[0]['StopYM'.toUpperCase()];
                    var y = stopYM.toString().substr(stopYM.toString().length - 4);
                    var m = stopYM.toString().substr(0, stopYM.toString().length - 4);
                    var d = new Date(parseInt(y), parseInt(m) - 1);
                     $(headerId + 'txtHide').jqxDateTimeInput('setDate', d);
                    //$(headerId + 'txtHide').csDateTime('setDate', d);
                } else {
                    $(headerId + 'txtHide').jqxDateTimeInput('setDate', null);
                   // $(headerId + 'txtHide').csDateTime('setDate', null);
                };
            };
           

            $(headerId + 'txtAccountOwner').jqxInput('val', null);
            if (options.initData.Account.rows[0]['AccountName'.toUpperCase()] != undefined) {
                $(headerId + 'txtAccountOwner').jqxInput('val',
                                options.initData.Account.rows[0]['AccountName'.toUpperCase()]);
            };
            

            $(headerId + 'txtAccOwnerID').jqxMaskedInput('val','');
            if (options.initData.Account.rows[0]['AccountNameID'.toUpperCase()] != undefined) {
                $(headerId + 'txtAccOwnerID').jqxMaskedInput('val',
                                options.initData.Account.rows[0]['AccountNameID'.toUpperCase()]);
            };
            

            if (options.initData.Account.rows[0]['AccountAlien'.toUpperCase()] == 1) {
                $(headerId + 'chkFore2').jqxCheckBox('check');
            };
            $(headerId + 'gilMediaCode').csList('clearDisplayValue');
            if (options.initData.Account.rows[0]['MediaCode'.toUpperCase()] != undefined) {
                if (options.initData.Account.rows[0]['MediaCode'.toUpperCase()] != null) {
                    $(headerId + 'gilMediaCode').csList('setDisplayValue', {
                        CODENO: options.initData.Account.rows[0]['MediaCode'.toUpperCase()],
                        DESCRIPTION: options.initData.Account.rows[0]['MediaName'.toUpperCase()],
                    });
                };
            };
            /*
            $(headerId + 'gilMediaCode').csList('codeNo',
                    options.initData.Account.rows[0]['MediaCode'.toUpperCase()]); */

            $(headerId + 'txtIntroId').jqxInput('val', null);
            if (options.initData.Account.rows[0]['IntroID'.toUpperCase()] != undefined) {
                $(headerId + 'txtIntroId').jqxInput('val',
                           options.initData.Account.rows[0]['IntroID'.toUpperCase()]);
            };
            $(headerId + 'lblIntroName').jqxInput('val', null);
            if (options.initData.Account.rows[0]['IntroName'.toUpperCase()] != undefined) {
                $(headerId + 'lblIntroName').jqxInput('val',
                            options.initData.Account.rows[0]['IntroName'.toUpperCase()]);
            };

            
            $(headerId + 'dtSendDate').csDateTime('clear');
            if (options.initData.Account.rows[0]['SendDate'.toUpperCase()] != undefined) {
                $(headerId + 'dtSendDate').csDateTime('setDate',
                                 options.initData.Account.rows[0]['SendDate'.toUpperCase()]);
            };
            
            $(headerId + 'dtContiDate').csDateTime('clear');
            if (options.initData.Account.rows[0]['PropDate'.toUpperCase()] != undefined) {
                $(headerId + 'dtContiDate').csDateTime('setDate',
                               options.initData.Account.rows[0]['PropDate'.toUpperCase()]);
            };
           
            $(headerId + 'dtSnactionDate').csDateTime('clear');
            if (options.initData.Account.rows[0]['SnactionDate'.toUpperCase()] != undefined) {
                $(headerId + 'dtSnactionDate').csDateTime('setDate',
                                options.initData.Account.rows[0]['SnactionDate'.toUpperCase()]);
            };
            
            $(headerId + 'edtAcceptTime').csDateTime('clear');
            if (options.initData.Account.rows[0]['AcceptTime'.toUpperCase()] != undefined) {
                $(headerId + 'edtAcceptTime').csDateTime('setDate',
                                options.initData.Account.rows[0]['AcceptTime'.toUpperCase()]);
            };
            

            $(headerId + 'gilAcceptName').csList('codeNo',
                   options.initData.Account.rows[0]['AcceptEn'.toUpperCase()]);

            if (options.initData.Account.rows[0]['StopFlag'.toUpperCase()] == 1) {
                $(headerId + 'chkStopFlag').jqxCheckBox('check');
            } else { $(headerId + 'chkStopFlag').jqxCheckBox('uncheck'); };
            $(headerId + 'dtStopDate').csDateTime('clear');
            if (options.initData.Account.rows[0]['StopDate'.toUpperCase()] != undefined) {
                $(headerId + 'dtStopDate').csDateTime('setDate',
                               options.initData.Account.rows[0]['StopDate'.toUpperCase()]);
            };
            

            if (options.initData.Account.rows[0]['DeAuthorize'.toUpperCase()] == 1) {
                $(headerId + 'chkDeAut').jqxCheckBox('check');
            } else { $(headerId + 'chkDeAut').jqxCheckBox('uncheck'); };
            $(headerId + 'dtAuthStopDate').csDateTime('clear');
            if (options.initData.Account.rows[0]['AuthorizeStopDate'.toUpperCase()] != undefined) {
                $(headerId + 'dtAuthStopDate').csDateTime('setDate',
                           options.initData.Account.rows[0]['AuthorizeStopDate'.toUpperCase()]);
            };
            $(headerId + 'txtUpdEn').text('');
            if (options.initData.Account.rows[0]['UpdEn'.toUpperCase()] != undefined) {
                $(headerId + 'txtUpdEn').text(options.initData.Account.rows[0]['UpdEn'.toUpperCase()]);
            };


            // $(headerId + 'txtUpdTime').text(options.initData.Account.rows[0]['UpdTime'.toUpperCase()]);
            $(headerId + 'txtUpdTime').text('');
            if (options.initData.Account.rows[0]['NewUpdTime'.toUpperCase()] != undefined) {
                var d = new Date(options.initData.Account.rows[0]['NewUpdTime'.toUpperCase()]);

                $(headerId + 'txtUpdTime').text(formatStringDate(d, 'yyyyMMddHHmmss', false));
            };
            
            if (options.initData.Account.rows[0]['Note'.toUpperCase()] != undefined) {
                $(headerId + 'txtMemo').jqxTextArea('val',
                                    options.initData.Account.rows[0]['Note'.toUpperCase()]);
            };
            
            $(headerId + 'txtACHcustID').jqxMaskedInput('val','');
            if (options.initData.Account.rows[0]['ACHCustID'.toUpperCase()] != undefined) {
                $(headerId + 'txtACHcustID').jqxMaskedInput('val',
                                        options.initData.Account.rows[0]['ACHCustID'.toUpperCase()]);
            };
            
            $(headerId + 'txtAchSN').jqxInput('val','');
            if (options.initData.Account.rows[0]['ACHSN'.toUpperCase()] != undefined) {
                $(headerId + 'txtAchSN').jqxInput('val',
                           options.initData.Account.rows[0]['ACHSN'.toUpperCase()]);
            };
            if (options.initData.Account.rows.length > 0) {
                var bankLength = options.initData.BankCode.rows.length;
                var achType = 1;
                for (var i = 0; i <= bankLength -1; i++) {
                    if (options.initData.Account.rows[0]['BANKCODE'] == options.initData.BankCode.rows[i].CODENO) {
                        achType = options.initData.BankCode.rows[i]['ACHTYPE'];
                        break;
                    };
                };
                var o = jQuery.grep(options.initData.ACHTNo.rows, function (row) {
                    return row['ACHTYPE'] == achType;
                });
                $(headerId + 'csmACH').csMulti('source', o);
            };
            
            $(headerId + 'csmACH').csMulti('clearChoose');
            if (options.initData.Account.rows[0]['ACHTDESC'.toUpperCase()] != undefined) {
                if (options.initData.Account.rows[0]['ACHTDESC'.toUpperCase()] != null) {
                    if (options.initData.Account.rows[0]['ACHTNO'.toUpperCase()] != undefined) {
                        var achtNo = options.initData.Account.rows[0]['ACHTNO'.toUpperCase()];
                        achtNo = achtNo.toString().replace(/'/g, '');
                        $(headerId + 'csmACH').csMulti('setDisplayValue', achtNo);
                    };
                } else {
                    $(headerId + 'csmACH').csMulti('clearChoose');
                };
            };
            $(headerId + 'csmCharge').csMulti('clearChoose');
            if (options.initData.Account.rows[0]['CitemStr2'.toUpperCase()] != undefined) {
                if (options.initData.Account.rows[0]['CitemStr2'.toUpperCase()] != null) {
                    var citemStr2 = options.initData.Account.rows[0]['CitemStr2'.toUpperCase()];
                    //citemStr2 = citemStr2.toString().replace("'", '');
                    citemStr2 = citemStr2.replace(/'/g, '');
                    $(headerId + 'csmCharge').csMulti('setDisplayValue', citemStr2);
                } else {
                    $(headerId + 'csmCharge').csMulti('clearChoose');
                };
            };
            /*
            $(headerId + 'csmProduct').csMulti('clearChoose');
            if (options.initData.ChooseProduct != undefined) {
                if (options.initData.ChooseProduct.rows.length > 0) {
                    var serviceId = [];
                    $.each(options.initData.ChooseProduct.rows,
                        function (index, row) {
                            serviceId.push(row['ServiceId'.toUpperCase()]);
                        });

                    $(headerId + 'csmProduct').csMulti('setDisplayValue', serviceId.toString());
                };
            }; */


            if (options.initData.IsAchBank != undefined) {
                if (options.initData.IsAchBank.rows.length > 0) {
                    if (options.initData.IsAchBank.rows[0].ResultBoolean == 0) {
                        /*
                        $(headerId + 'dtSnactionDate').csDateTime({ disabled: false });
                        $(headerId + 'dtSendDate').csDateTime({ disabled: false });
                        $(headerId + 'txtACHcustID').jqxMaskedInput({ disabled: true });
                        $(headerId + 'csmACH').csMulti('disabled', true);
                        $(headerId + 'btnACHDetail').jqxButton({ disabled: true }); */
                        options.isACH = false;
                    } else {
                        /*
                        $(headerId + 'dtSnactionDate').csDateTime({ disabled: true });
                        $(headerId + 'dtSendDate').csDateTime({ disabled: true });
                        //$(headerId + 'txtACHcustID').jqxMaskedInput({ disabled: true });
                        $(headerId + 'csmACH').csMulti('disabled', false);
                        $(headerId + 'btnACHDetail').jqxButton({ disabled: false });
                        $(headerId + 'txtAccountNo').jqxMaskedInput({ disabled: $(headerId + 'dtSendDate').csDateTime('getText') != null }); */
                        
                        options.isACH = true;
                    };
                };
            };
            if (!chkAuthorities(div,'SO1100G0')) {
                if (options.initData.Account.rows[0].ID != null) {
                    
                    //$(headerId + 'txtID').jqxMaskedInput({ mask: '[A-Z|0-9][0-9]#AAAA###' });
                    //$(headerId + 'txtID').jqxMaskedInput({ mask: 'LLLLLLLLLL' });
                    $(headerId + 'txtID').jqxInput('val',
                        options.initData.Account.rows[0]['ID'].toString().substr(0,3) +
                        'XXXX' + 
                        options.initData.Account.rows[0]['ID'].toString().substr(options.initData.Account.rows[0]['ID'].toString().length-3) ); 
                };
                if (options.initData.Account.rows[0]['AccountNameID'.toUpperCase()] != null) {
                    $(headerId + 'txtAccOwnerID').jqxMaskedInput({ mask: '[A-Z|0-9][0-9]#AAAA###' });
                    $(headerId + 'txtAccOwnerID').jqxMaskedInput('val',
                        options.initData.Account.rows[0]['AccountNameID'.toUpperCase()].toString().substr(0, 3) +
                        'XXXX' +
                        options.initData.Account.rows[0]['AccountNameID'.toUpperCase()].toString().substr(
                                options.initData.Account.rows[0]['AccountNameID'.toUpperCase()].toString().length - 3));
                };
            };

            if (!chkAuthorities(div, 'SO1100G9')) {
                //$(headerId + 'txtAccountNo').jqxMaskedInput('val', options.initData.Account.rows[0]['AccountID'.toUpperCase()]);
                if (options.initData.Account.rows[0]['AccountID'.toUpperCase()] != null) {
                    $(headerId + 'txtAccountNo').jqxMaskedInput({ mask: '#####AAA##AA####' });
                    $(headerId + 'txtAccountNo').jqxMaskedInput('val','');
                    $(headerId + 'txtAccountNo').jqxMaskedInput('val',
                            options.initData.Account.rows[0]['AccountID'.toUpperCase()].toString().substr(0, 5) +
                            'XXX' +
                            options.initData.Account.rows[0]['AccountID'.toUpperCase()].toString().substr(9, 2) +
                            'XX' +
                            options.initData.Account.rows[0]['AccountID'.toUpperCase()].toString().substr(
                                            options.initData.Account.rows[0]['AccountID'.toUpperCase()].toString().length - 4)
                        );
                    $(headerId + 'txtAccountNo').jqxMaskedInput({ disabled: true });
                };
            };
            if (!chkAuthorities(div, 'SO1100G7')) {
                if (options.initData.Account.rows[0]['StopYM'.toUpperCase()] != undefined) {
                    if (options.initData.Account.rows[0]['StopYM'.toUpperCase()] != null) {
                        $(headerId + 'txtHide').jqxDateTimeInput('val', 'XX/XX');
                        //$(headerId + 'txtHide').jqxMaskedInput({ mask: '##/##' });
                        //$(headerId + 'txtHide').jqxMaskedInput('val', 'XX/XX');
                    };                    
                };
            };
            if ($.isFunction(action)) { action(); };
            return true;
        } catch (err) {
            errorHandle(formName, 'rcdToScr', err);
            changeMode(div);
            return false;
        } finally {

        };
    }
    function disableAllControl(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');        
        try {
            $(headerId + 'cboProposer').jqxInput({ disabled: true });            
            $(headerId + 'csmACH').csMulti('disabled', true);
            //$(headerId + 'csmProduct').csMulti('disabled', true);
            $(headerId + 'csmCharge').csMulti('disabled',true);
            $(headerId + 'edtAcceptTime').csDateTime({ disabled: true });
            $(headerId + 'txtAccountNo').jqxMaskedInput({ disabled: true });
            $(headerId + 'txtAccountOwner').jqxInput({ disabled: true });
            $(headerId + 'txtAccOwnerID').jqxMaskedInput({ disabled: true });
            $(headerId + 'txtACHcustID').jqxMaskedInput({ disabled: true });
            $(headerId + 'txtAchSN').jqxInput({ disabled: true });
            $(headerId + 'txtCVC2').jqxMaskedInput({ disabled: true });
            $(headerId + 'txtHide').jqxDateTimeInput({ disabled: true });
            //$(headerId + 'txtHide').csDateTime({ disabled: true });
            $(headerId + 'txtID').jqxInput({ disabled: true });
            $(headerId + 'txtMemo').jqxTextArea({ disabled: true });            
            $(headerId + 'dtAuthStopDate').csDateTime({ disabled: true });
            $(headerId + 'dtContiDate').csDateTime({ disabled: true });
            $(headerId + 'dtSendDate').csDateTime({ disabled: true });
            $(headerId + 'dtSnactionDate').csDateTime({ disabled: true });
            $(headerId + 'dtStopDate').csDateTime({ disabled: true });
            $(headerId + 'lblIntroName').jqxInput({ disabled: true });
            $(headerId + 'txtIntroId').jqxInput({ disabled: true });
            $(headerId + 'gilBankCode').csList('disabled', true);
            $(headerId + 'gilCardName').csList('disabled', true);
            $(headerId + 'gilCMCode').csList('disabled', true);
            //$(headerId + 'gilIntroCode').csList('clearDisplayValue');
            $(headerId + 'gilMediaCode').csList('disabled', true);
            $(headerId + 'gilPTCode').csList('disabled', true);
            $(headerId + 'gilAcceptName').csList('disabled', true);
            $(headerId + 'chkDeAut').jqxCheckBox({ disabled: true });
            $(headerId + 'chkFore').jqxCheckBox({ disabled: true });
            $(headerId + 'chkFore2').jqxCheckBox({ disabled: true });
            $(headerId + 'chkStopFlag').jqxCheckBox({ disabled: true });
            $(headerId + 'btnSave').jqxButton({ disabled: true });
            $(headerId + 'btnEdit').jqxButton({ disabled: true });
            $(headerId + 'btnCancel').jqxButton({ disabled: true });
            $(headerId + 'btnProduct').jqxButton({ disabled: true });
            $(headerId + 'btnDelProduct').jqxButton({ disabled: true });
            if ($.isFunction(action)) { action(); };            
            return true;
        } catch (err) {
            changeMode(div);
            errorHandle(formName, 'disableAllControl', err);
            return false;
        } finally {

        };
    }
    function clearAllControl(div, action) {

        var headerId = '#' + $(div).prop('id');
        try {
            //$(headerId + 'cboProposer').jqxDropDownList('clearSelection');
            //$(headerId + 'cboProposer').jqxDropDownList('selectIndex', 0);
            $(headerId + 'cboProposer').jqxInput('val', '');
            $(headerId + 'csmACH').csMulti('clearChoose');
            //$(headerId + 'csmProduct').csMulti('clearChoose');
            $(headerId + 'csmCharge').csMulti('clearChoose');

            $(headerId + 'edtAcceptTime').csDateTime('clear');
            $(headerId + 'txtAccountNo').jqxMaskedInput('clear');
            $(headerId + 'txtAccountOwner').jqxInput('val', '');
            $(headerId + 'txtAccOwnerID').jqxMaskedInput('clear');
            $(headerId + 'txtACHcustID').jqxMaskedInput('clear');
            $(headerId + 'txtAchSN').jqxInput('val', '');
            $(headerId + 'txtCVC2').jqxMaskedInput('clear');
            $(headerId + 'txtHide').val(null);
            //$(headerId + 'txtHide').val(null);
            //$(headerId + 'txtID').jqxMaskedInput('clear');
            $(headerId + 'txtMemo').jqxTextArea('val', '');
            $(headerId + 'txtUpdEn').text('');
            $(headerId + 'txtUpdTime').text('');
            $(headerId + 'dtAuthStopDate').csDateTime('clear');
            $(headerId + 'dtContiDate').csDateTime('clear');
            $(headerId + 'dtSendDate').csDateTime('clear');
            $(headerId + 'dtSnactionDate').csDateTime('clear');
            $(headerId + 'dtStopDate').csDateTime('clear');
            $(headerId + 'lblIntroName').jqxInput('val', '');
            $(headerId + 'txtIntroId').jqxInput('val', '');
            $(headerId + 'gilBankCode').csList('clearDisplayValue');
            $(headerId + 'gilCardName').csList('clearDisplayValue');
            $(headerId + 'gilCMCode').csList('clearDisplayValue');
            //$(headerId + 'gilIntroCode').csList('clearDisplayValue');
            $(headerId + 'gilMediaCode').csList('clearDisplayValue');
            $(headerId + 'gilPTCode').csList('clearDisplayValue');
            $(headerId + 'gilAcceptName').csList('clearDisplayValue');
            $(headerId + 'chkDeAut').jqxCheckBox('uncheck');
            $(headerId + 'chkFore').jqxCheckBox('uncheck');
            $(headerId + 'chkFore2').jqxCheckBox('uncheck');
            $(headerId + 'chkStopFlag').jqxCheckBox('uncheck');
            $(headerId + 'txtProduct').text('');
            if ($.isFunction(action)) { action(); };
            return true;
        } catch (err) {
            changeMode(div);
            errorHandle(formName, 'clearAllControl', err);
            return false;
        } finally {

        };
    };
    function changeFieldColor(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            $(headerId + 'lblAccountOwner').text(options.language.Owner);
            $(headerId + 'lblAccountOwner').css('color', 'black');
            $(headerId + 'lblCardName').css('color', 'black');
            $(headerId + 'lblHide').css('color', 'black');
            $(headerId + 'lblAccOwnerID').css('color', 'black');
            if ($(headerId + 'gilCMCode').csList('codeNo') != '') {
                var refNo = $(headerId + 'gilCMCode').csList('selectedItem').REFNO;
                if (refNo == 2 || refNo == 4) {
                    $(headerId + 'lblAccountOwner').text(options.language.AccOwner);
                    $(headerId + 'lblAccountOwner').css('color', 'red');
                    $(headerId + 'lblAccOwnerID').css('color', 'red');
                    if (refNo == 4) {
                        $(headerId + 'lblCardName').css('color', 'red');
                        $(headerId + 'lblHide').css('color', 'red');
                    };
                };
            };            
            if ($.isFunction(action)) { action(); };
            return true;
        } catch (err) {
            changeMode(div);
            errorHandle(formName, 'changeFieldColor', err);
            return false;
        } finally {

        };
    };
    function changeMode(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var isReadonly = true;
        try {
            var IsCanEdit = chkAuthorities(div, 'SO1100G2');
            var IsCanAppend = chkAuthorities(div, 'SO1100G1');
             
            $(headerId + 'btnCancel').jqxButton({
                imgSrc: imageScr.cancel.imgSrc,
                value: options.language.Cancel
            });
            if (options.editMode != editMode.view) {
                if (!IsCanEdit) { options.editMode = editMode.view };
            };
            if (options.editMode == options.append) {
                if (!IsCanAppend) { options.editMode = editMode.view };
            };
            $(headerId + 'btnEdit').jqxButton({ disabled: true });
            switch (options.editMode) {               
                case (editMode.edit): 
                    isReadonly = false;
                    $(headerId + 'btnCancel').jqxButton({ disabled: false });
                    $(headerId + 'btnSave').jqxButton({ disabled: false });
                    $(headerId + 'btnSave').jqxButton({ disabled: false });
                    //$(headerId + 'txtStatusMode').jqxInput('val', options.language.Edit);
                    $(headerId + 'txtStatusMode').text(options.language.Edit);
                    break;
                
                case (editMode.append): 
                    isReadonly = false;
                    $(headerId + 'btnCancel').jqxButton({ disabled: false });
                    $(headerId + 'btnSave').jqxButton({ disabled: false });
                    $(headerId + 'btnSave').jqxButton({ disabled: false });
                    //$(headerId + 'txtStatusMode').jqxInput('val', options.language.AddNew);
                    $(headerId + 'txtStatusMode').text(options.language.AddNew);
                    //default value
                    $(headerId + 'edtAcceptTime').csDateTime('setDate', new Date());
                    $(headerId + 'dtContiDate').csDateTime('setDate', $(headerId + 'edtAcceptTime').csDateTime('getDate'));
                    if ($(headerId + 'cboProposer').jqxInput('val') != null) {
                        $(headerId + 'txtAccountOwner').jqxInput('val', $(headerId + 'cboProposer').jqxInput('val'));
                    };
                    $(headerId + 'gilAcceptName').csList('codeNo', options.loginInfo.loginInfo.rows[0]['entryid']);
                    break;
                
                default: 
                    isReadonly = true;
                    //$(headerId + 'txtStatusMode').jqxInput('val', options.language.View);
                    $(headerId + 'txtStatusMode').text(options.language.View);
                    $(headerId + 'btnCancel').jqxButton({
                        imgSrc: imageScr.exit.imgSrc,
                        value: options.language.Quit
                    });
                    $(headerId + 'btnCancel').jqxButton({ disabled: false });
                    $(headerId + 'btnEdit').jqxButton({ disabled: false });
                    break;
                
            };
            if (options.initData.Account.rows.length == 0) {
                if (options.editMode == editMode.view) {
                    $(headerId + 'btnEdit').jqxButton({ disabled: false });
                    //$(headerId + 'cboProposer').jqxDropDownList('clear');
                };
            };
            if (options.editMode == editMode.view) { return; };
            if (options.isACH) {
                $(headerId + 'dtSnactionDate').csDateTime({ disabled: true });
                $(headerId + 'dtSendDate').csDateTime({ disabled: true });
                //$(headerId + 'txtACHcustID').jqxMaskedInput({ disabled: true });
                $(headerId + 'csmACH').csMulti('disabled', false);
                $(headerId + 'btnACHDetail').jqxButton({ disabled: false });
                $(headerId + 'txtAccountNo').jqxMaskedInput({ disabled: $(headerId + 'dtSendDate').csDateTime('getText') != null });
            } else {
                $(headerId + 'dtSnactionDate').csDateTime({ disabled: false });
                $(headerId + 'dtSendDate').csDateTime({ disabled: false });
                $(headerId + 'txtACHcustID').jqxMaskedInput({ disabled: true });
                $(headerId + 'csmACH').csMulti('disabled', true);
                $(headerId + 'btnACHDetail').jqxButton({ disabled: true });
                
            };
                        
            if (!IsCanEdit) { isReadonly = true };
            $(headerId + 'cboProposer').jqxInput({ disabled: true });            
            if (options.isACH) {
                $(headerId + 'csmACH').csMulti('disabled', isReadonly);
            };
            //$(headerId + 'csmProduct').csMulti('disabled', isReadonly );
            $(headerId + 'csmCharge').csMulti('disabled', isReadonly);
            $(headerId + 'edtAcceptTime').csDateTime({ disabled: isReadonly });
            if (!options.isACH) {
                $(headerId + 'txtAccountNo').jqxMaskedInput({ disabled: isReadonly });
            };
            
            $(headerId + 'txtAccountOwner').jqxInput({ disabled: isReadonly });
            $(headerId + 'txtAccOwnerID').jqxMaskedInput({ disabled: isReadonly });
            $(headerId + 'txtAchSN').jqxInput({ disabled: isReadonly });
            $(headerId + 'txtCVC2').jqxMaskedInput({ disabled: isReadonly });
            $(headerId + 'txtHide').jqxDateTimeInput({ disabled: isReadonly });
            //$(headerId + 'txtHide').csDateTime({ disabled: isReadonly });
            //            $(headerId + 'txtID').jqxMaskedInput({ disabled: isReadonly });
            $(headerId + 'txtID').jqxInput({ disabled: true });
            $(headerId + 'txtMemo').jqxTextArea({ disabled: isReadonly });
            $(headerId + 'dtAuthStopDate').csDateTime({ disabled: isReadonly });
            $(headerId + 'dtContiDate').csDateTime({ disabled: isReadonly });
            if (!options.isACH) {
                $(headerId + 'dtSnactionDate').csDateTime({ disabled: isReadonly });
            };            
            if (!options.isACH) {
                $(headerId + 'dtSendDate').csDateTime({ disabled: isReadonly });
            };
            $(headerId + 'dtStopDate').csDateTime({ disabled: isReadonly });
            $(headerId + 'gilAcceptName').csList('disabled', isReadonly);
            $(headerId + 'gilBankCode').csList('disabled', isReadonly);
            $(headerId + 'gilCardName').csList('disabled', isReadonly);
            $(headerId + 'gilCMCode').csList('disabled', isReadonly);
            $(headerId + 'gilMediaCode').csList('disabled', isReadonly);
            $(headerId + 'gilPTCode').csList('disabled', isReadonly);
            $(headerId + 'chkDeAut').jqxCheckBox({ disabled: isReadonly });
            $(headerId + 'chkFore').jqxCheckBox({ disabled: isReadonly });
            $(headerId + 'chkFore2').jqxCheckBox({ disabled: isReadonly });
            $(headerId + 'chkStopFlag').jqxCheckBox({ disabled: isReadonly });
            $(headerId + 'txtIntroId').jqxInput({ disabled: isReadonly });
            $(headerId + 'btnFind').jqxInput({ disabled: isReadonly });
            $(headerId + 'btnProduct').jqxButton({ disabled: isReadonly });
            $(headerId + 'btnDelProduct').jqxButton({ disabled: isReadonly });
            if (!chkAuthorities(div,'SO1100GB')) {
                $(headerId + 'gilCMCode').csList('disabled', true);
            };
            if (!chkAuthorities(div, 'SO1100GA')) {
                $(headerId + 'txtAccountNo').jqxMaskedInput({ disabled: true });
            };
            if (!chkAuthorities(div, 'SO1100G6')) {
                $(headerId + 'txtHide').jqxDateTimeInput({ disabled: true });
            };
            if (!IsCanEdit) {
                $(headerId + 'btnEdit').jqxButton({ disabled: isReadonly });
            };
        } catch (err) {
            errorHandle(formName, 'changeMode', err);
            return false;
        } finally {
            disableAllFieldPriv(options.controls, options.initData[fieldPrivTableName], options.initData[userPrivTableName]);
        };
    };
    function assignControlData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            if (options.initData.Account.rows.length > 0) {
                if (options.editMode != editMode.append) {
                    options.custId = options.initData.Account.rows[0]['CUSTID'];
                    options.masterId = options.initData.Account.rows[0]['MASTERID'];
                };                
            };
            //------------------------------------------------------------------------------
            // cboProposer
            $(headerId +'cboProposer').jqxInput('val','');
            //if (options.initData.Proposer.rows.length > 0) {
            //    $.each(options.initData.Proposer.rows, function (index, value) {
            //        $(headerId + 'cboProposer').jqxDropDownList('addItem', value.DECLARANTNAME);
            //    });                
            //};
            //------------------------------------------------------------------------------

            //------------------------------------------------------------------------------
            //csmProduct
            //$(headerId + 'csmProduct').csMulti('clearItemSource');
            //$(headerId + 'csmProduct').csMulti('source', options.initData.CanChooseProduct.rows);
            //------------------------------------------------------------------------------

            //------------------------------------------------------------------------------
            //csmCharge
            $(headerId + 'csmCharge').csMulti('source', options.initData.CanChooseCharge.rows);
            //------------------------------------------------------------------------------

            //------------------------------------------------------------------------------
            //csmACH
            //$(headerId + 'csmACH').csMulti('clearItemSource');
            $(headerId + 'csmACH').csMulti('source', options.initData.ACHTNo.rows);
            //------------------------------------------------------------------------------

            //------------------------------------------------------------------------------
            //gilMediaCode            
            $(headerId + 'gilMediaCode').csList('source', options.initData.MediaCode.rows);
            //------------------------------------------------------------------------------

            //------------------------------------------------------------------------------
            //gilAcceptName            
            $(headerId + 'gilAcceptName').csList('source', options.initData.AcceptName.rows);
            //------------------------------------------------------------------------------

            //------------------------------------------------------------------------------
            //gilCMCode            
            $(headerId + 'gilCMCode').csList('source', options.initData.CMCode.rows);
            //------------------------------------------------------------------------------

            //------------------------------------------------------------------------------
            //gilBankCode            
            $(headerId + 'gilBankCode').csList('source', options.initData.BankCode.rows);
            //------------------------------------------------------------------------------

            //------------------------------------------------------------------------------
            //gilCardName            
            $(headerId + 'gilCardName').csList('source', options.initData.CardCode.rows);
            //------------------------------------------------------------------------------

            //------------------------------------------------------------------------------
            //gilPTCode            
            $(headerId + 'gilPTCode').csList('source', options.initData.PTCode.rows);
            //------------------------------------------------------------------------------
            if ($.isFunction(action)) { action(); };
            return true;
        } catch (err) {
            errorHandle(formName, 'assignControlData', err);
            changeMode(div);
            return false;
        } finally {

        };
    };

    function QueryAllData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, options.copyLoginInfo,
               { MasterId: { type: 'integer', value: options.masterId } },
               { SEQNO: { type: 'integer', value: options.seqNo } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryNewAllData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);                            
                            options.initData = null;
                            delete options.initData;
                            options.initData = {};
                            $.extend(options.initData, tmp);
                            var strDescription = [];
                            
                             if (options.initData['OldChooseProduct'].rows.length > 0) {
                                 $.each(options.initData['OldChooseProduct'].rows, function (index, value) {
                                    strDescription.push(value['PRODUCTNAME']);                                   
                                });
                            };
                             $(headerId + 'txtProduct').val(strDescription.toString());
                             strDescription.length = 0;
                             strDescription = null;
                            //canChooseProduct = { CanChooseNonePeriod: {}, GetCanChooseBillNo: {}, CanChooseProduct: {} };
                            //$.extend(true, canChooseProduct.CanChooseNonePeriod, tmp.CanChooseNonePeriod);
                            if ($.isFunction(action)) { action(); };                           
                        }
                        else {                            
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div); 
                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryAllData-Server', err);
                        changeMode(div);                        
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
            changeMode(div);
        } finally {

        };
    };
    function unBindHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            /*
            if (options.containerIsWindow) {
                $($.data(div, formName).options.container).off("winClosing");                
            }; */
            //$(headerId + 'txtID').unbind('change', txtIDChange);
            $(headerId + 'gilCMCode').unbind('selectedIndexChanged', gilCMCodeSelectChanged);
            $(headerId + 'gilBankCode').unbind('selectedIndexChanged', gilBankCodeSelectChanged);
            $(headerId + 'txtAccountNo').unbind('change', txtAccountNoChanged);
            $(headerId + 'gilCardName').unbind('selectedIndexChanged', gilCardNameSelectChanged);
            $(headerId + 'dtSnactionDate').unbind('focus', dtSnactionDateFocus);
            $(headerId + 'txtAccOwnerID').unbind('change', txtAccOwnerIDChange);
            $(headerId + 'txtIntroId').unbind('change', txtIntroIdChange);
            $(headerId + 'btnFind').unbind('click', btnFindClick);
            $(headerId + 'btnSave').unbind('click', btnSaveClick);
            $(headerId + 'chkStopFlag').unbind('change', chkStopFlagChange);
            $(headerId + 'btnCancel').unbind('click', btnCancelClick);
            $(headerId + 'btnEdit').unbind('click', btnEditClick);
            $(headerId + 'btnACHDetail').unbind('click', btnACHDetailClick);
            $(headerId + 'btnACHDetail').off();
            //$(headerId + 'txtID').unbind('change');            
            $(headerId + 'gilCMCode').unbind('selectedIndexChanged');
            $(headerId + 'gilCMCode').unbind('selectedIndexChanged');            
            $(headerId + 'gilBankCode').unbind('selectedIndexChanged');
            $(headerId + 'txtAccountNo').unbind('change');
            $(headerId + 'txtAccountNo').unbind('change');
            $(headerId + 'gilCardName').unbind('selectedIndexChanged');
            $(headerId + 'dtSnactionDate').unbind('focus');
            $(headerId + 'txtAccOwnerID').unbind('change');
            $(headerId + 'txtIntroId').unbind('change');
            $(headerId + 'btnFind').unbind('click');
            $(headerId + 'btnSave').unbind('click');
            $(headerId + 'chkStopFlag').unbind('change');
            $(headerId + 'btnCancel').unbind('click');
            $(headerId + 'btnEdit').unbind('click');
            $(headerId + 'btnACHDetail').unbind('click');
            $(headerId + 'btnProduct').unbind('click');
            $(headerId + 'btnDelProduct').unbind('click');
            $(options.container).unbind('keydown');
            $(options.container).off('keydown');
           
            //$(headerId + 'txtID').off('blur');
        } catch (err) {
            errorHandle(formName, 'unBindHandler', err);
        } finally {

        };
    };
    function bindHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            /*
            if (options.containerIsWindow) {
                $($.data(div, formName).options.container).off("winClosing");
                $($.data(div, formName).options.container).on("winClosing", div, winClosing);
            }; */
            //$(headerId + 'txtID').unbind('change', txtIDChange);
            $(headerId + 'gilCMCode').unbind('selectedIndexChanged', gilCMCodeSelectChanged);
            $(headerId + 'gilBankCode').unbind('selectedIndexChanged', gilBankCodeSelectChanged);
            $(headerId + 'txtAccountNo').unbind('change',  txtAccountNoChanged);
            $(headerId + 'gilCardName').unbind('selectedIndexChanged', gilCardNameSelectChanged);
            $(headerId + 'dtSnactionDate').unbind('focus', dtSnactionDateFocus);
            $(headerId + 'txtAccOwnerID').unbind('change', txtAccOwnerIDChange);
            $(headerId + 'txtIntroId').unbind('change', txtIntroIdChange);
            $(headerId + 'btnFind').unbind('click', btnFindClick);
            $(headerId + 'btnSave').unbind('click',  btnSaveClick);
            $(headerId + 'chkStopFlag').unbind('change', chkStopFlagChange);
            $(headerId + 'btnCancel').unbind('click', btnCancelClick);
            $(headerId + 'btnEdit').unbind('click',  btnEditClick);
            $(headerId + 'btnACHDetail').unbind('click', btnACHDetailClick);
            $(headerId + 'btnProduct').unbind('click', btnProductClick);
            $(headerId + 'btnDelProduct').unbind('click');
            $(options.container).unbind('keydown');
            $(options.container).off('keydown');

            //$(headerId + 'txtID').bind('change', div, txtIDChange);
            $(headerId + 'gilCMCode').bind('selectedIndexChanged', div, gilCMCodeSelectChanged);            
            $(headerId + 'gilBankCode').bind('selectedIndexChanged', div, gilBankCodeSelectChanged);            
            $(headerId + 'txtAccountNo').bind('change', div, txtAccountNoChanged);            
            $(headerId + 'gilCardName').bind('selectedIndexChanged', div, gilCardNameSelectChanged);            
            $(headerId + 'dtSnactionDate').bind('focus', div, dtSnactionDateFocus);            
            $(headerId + 'txtAccOwnerID').bind('change', div, txtAccOwnerIDChange);            
            $(headerId + 'txtIntroId').bind('change', div, txtIntroIdChange);            
            $(headerId + 'btnFind').bind('click', div, btnFindClick);            
            $(headerId + 'btnSave').bind('click', div, btnSaveClick);            
            $(headerId + 'chkStopFlag').bind('change', div, chkStopFlagChange);            
            $(headerId + 'btnCancel').bind('click', div, btnCancelClick);            
            $(headerId + 'btnEdit').bind('click', div, btnEditClick);
            $(headerId + 'btnACHDetail').bind('click', div, btnACHDetailClick);
            $(headerId + 'btnProduct').bind('click', div, btnProductClick);
            $(headerId + 'btnDelProduct').bind('click', div, btnDelProductClick);
            $(options.container).bind('keydown', options, frmKeydown);
        } catch (err) {
            errorHandle(formName, 'bindHandler', err);
        } finally {

        };
    };
    function btnDelProductClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        try {
            
            
                if (options.initData['Account'].rows.length == 0) {
                    options.initData['Account'] = copyToNewTable(div, 'Account', true);
                };
                //citemstr
                if (options.initData['Account'].rows[0]['CitemStr'.toUpperCase()] == undefined) {
                    $.extend(options.initData['Account'].rows[0], { CITEMSTR: null });
                };
                options.initData['Account'].rows[0]['CITEMSTR'] = null;
              
                //citemstr2
                if (options.initData['Account'].rows[0]['CitemStr2'.toUpperCase()] == undefined) {
                    $.extend(options.initData['Account'].rows[0], { CITEMSTR2: null });
                };
                options.initData['Account'].rows[0]['CITEMSTR2'] = null;
               
                //ServiceID
                
                options.initData['ChooseProduct'].rows.length = 0;
                $(headerId + 'txtProduct').val('');
               
                    
        } catch (err) {
            errorHandle(formName, 'SO1100D3_windowClose', err);
        } finally {

            //unBindHandler(div);
            //changeMode(div);
            //bindHandler(div);
        };
    };
    function btnProductClick(event) {
        if ($(this).jqxButton('disabled')) { return; };
        showSO1100D3(event.data);
    };
    function showSO1100D3(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var divName = 'div' + getUniqueId();
            var div2Name = 'div2' + getUniqueId();
            $('<div id="' + divName + '"><div>' + options.language.btnProduct + '</div><div id="' + div2Name + '"></div></div>').appendTo('body');
            var divWindows = $('#' + divName);
            $(divWindows).csWindow($.extend({}, {
                width: 900, height: 600,
                maxWidth: 1028,
                maxHeight: 900,
                keyboardCloseKey: 'none',
                isModal: true,
                haveClosing: false
            }));
            var divContainer = $('#' + div2Name);

            $(divContainer).SO1100D3($.extend({}, {
                loginInfo: cloneJSON( options.loginInfo),
                container: divWindows,
                parameters: cloneJSON( options.initData),
                editMode: options.editMode,
                ACHTNO: $(headerId + 'csmACH').csMulti('getChooseQuoteList'),
                ACHTDESC: $(headerId + 'csmACH').csMulti('getChooseQuoteListName'),
                seqNo : options.seqNo,
                localization:cloneJSON( options.localization)
            }));
            otherForm.push([divContainer, 'SO1100D3']);
            $(divWindows).on('close',
             function () {
                 $(divWindows).off('close');
                 try {
                     otherForm.length = 0;
                     otherForm = [];
                     var returnOptions = $(divContainer).SO1100D3('options');
                     if (returnOptions.isSaved) {
                         if (options.initData['Account'].rows.length == 0) {
                             options.initData['Account'] = copyToNewTable(div, 'Account', true);
                         };
                         //citemstr
                         if (options.initData['Account'].rows[0]['CitemStr'.toUpperCase()] == undefined) {
                             $.extend(options.initData['Account'].rows[0], { CITEMSTR: null });
                         };
                         if (returnOptions.citemStr.length == 0) {
                             options.initData['Account'].rows[0]['CITEMSTR'] = null;
                         } else {
                             options.initData['Account'].rows[0]['CITEMSTR'] = returnOptions.citemStr.toString();
                         };
                         //citemstr2
                         if (options.initData['Account'].rows[0]['CitemStr2'.toUpperCase()] == undefined) {
                             $.extend(options.initData['Account'].rows[0], { CITEMSTR2: null });
                         };
                         if (returnOptions.citemStr2.length == 0) {
                             options.initData['Account'].rows[0]['CITEMSTR2'] = null;
                         } else {
                             options.initData['Account'].rows[0]['CITEMSTR2'] = returnOptions.citemStr2.toString();
                         };
                         //ServiceID
                         var strDescription = [];
                         options.initData['ChooseProduct'].rows.length = 0;
                         if (returnOptions.serviceId.length > 0) {
                             $.each(returnOptions.serviceId, function (index, value) {
                                 strDescription.push(value['PRODUCTNAME']);
                                 var o = {};
                                 $.each(options.initData['ChooseProduct'].columns, function (index, column) {
                                     o[column['name']] = null;
                                 });
                                 o['CUSTID'] = options.custId;
                                 o['SERVICEID'] = parseInt(value['SERVICEID']);
                                 options.initData['ChooseProduct'].rows.push(o);
                             });

                         };
                         $(headerId + 'txtProduct').val(strDescription.toString());
                     };
                    
                     $(divContainer).SO1100D3('destroy');
                     $(divWindows).csWindow('destroy');
                    
                 } catch (err) {
                     errorHandle(formName, 'SO1100D3_windowClose', err);
                 } finally {

                     //unBindHandler(div);
                     //changeMode(div);
                     //bindHandler(div);
                 };
             });
        } catch (err) {
            //unBindHandler(div);
            //changeMode(div);
            //bindHandler(div);
            errorHandle(formName, 'showSO1100D3', err);
        };
    };
    function showSO1100D3_1(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        
        try {
            disableAllControl(div);
            unBindHandler(div);
            
            var x = $(div)[0].offsetLeft;
            var y = $(div)[0].offsetTop;
            var winOptions = $.extend({}, {
                width: $(div).width(), height: $(div).height(),
                maxWidth: $(options.container).csWindow('width'),
                maxHeight: $(options.container).csWindow('height'),
                keyboardCloseKey: 'none',
                resizable: true,
                position: { x: x, y: y },
                haveClosing: false,

            });
            var result = createcsWindow(div, options.language.btnProduct, winOptions);
            var xp = 'center';
            var yp = 0;
            if (options.containerIsWindow) {
                xp = ($(options.container).csWindow('width') - $('#' + result['windowId']).csWindow('width')) / 2;
                yp = ($(options.container).csWindow('height') - $('#' + result['windowId']).csWindow('height')) / 2;
            };

            $('#' + result['windowId']).csWindow({ position: { x: xp, y: 0 } });

            $('#' + result['contentId']).SO1100D3($.extend({}, {
                loginInfo: $.extend(true,{}, options.loginInfo),
                container: $('#' + result['windowId']),
                parameters:$.extend(true,{},options.initData),
                editMode: options.editMode,
                localization: options.localization
            }));

            $('#' + result['windowId']).on('close',
                function () {
                    $('#' + result['windowId']).off('close');
                    try {
                        var returnOptions = $('#' + result['contentId']).SO1100D3('options');
                        if (returnOptions.isSaved) {
                            if (options.initData['Account'].rows.length == 0) {
                                options.initData['Account'] = copyToNewTable(div, 'Account', true);
                            };
                            //citemstr
                            if (options.initData['Account'].rows[0]['CitemStr'.toUpperCase()] == undefined) {
                                $.extend(options.initData['Account'].rows[0], { CITEMSTR: null });
                            };
                            if (returnOptions.citemStr.length == 0) {
                                options.initData['Account'].rows[0]['CITEMSTR'] = null;
                            } else {
                                options.initData['Account'].rows[0]['CITEMSTR'] = returnOptions.citemStr.toString();
                            };
                            //citemstr2
                            if (options.initData['Account'].rows[0]['CitemStr2'.toUpperCase()] == undefined) {
                                $.extend(options.initData['Account'].rows[0], { CITEMSTR2: null });
                            };
                            if (returnOptions.citemStr.length == 0) {
                                options.initData['Account'].rows[0]['CITEMSTR2'] = null;
                            } else {
                                options.initData['Account'].rows[0]['CITEMSTR2'] = returnOptions.citemStr2.toString();
                            };
                            //ServiceID
                            var strDescription = [];
                            options.initData['ChooseProduct'].rows.length = 0;
                            if (returnOptions.serviceId.length > 0) {
                                $.each(returnOptions.serviceId, function (index, value) {
                                    strDescription.push(value['PRODUCTNAME']);
                                    var o = {};
                                    $.each(options.initData['ChooseProduct'].columns, function (index, column) {
                                        o[column['name']] = null;
                                    });
                                    o['CUSTID'] = options.custId;
                                    o['SERVICEID'] = parseInt(value['SERVICEID']);
                                    options.initData['ChooseProduct'].rows.push(o);
                                });
                               
                            };
                            $(headerId + 'txtProduct').val(strDescription.toString());
                        };
                        $('#' + result['windowId']).off('close');
                        $('#' + result['contentId']).SO1100D3('destroy');
                        $('#' + result['windowId']).csWindow('destroy');
                        /*
                        var returnOptions = $('#' + result['contentId']).SO111FA('options');
                        if (returnOptions.introData.rows.length > 0) {
                            $(headerId + 'txtIntroId').jqxInput('val', returnOptions.introData.rows[0]['CODENO']);
                            $(headerId + 'lblIntroName').jqxInput('val', returnOptions.introData.rows[0]['DESCRIPTION']);
                        } */
                    } catch (err) {
                        errorHandle(formName, 'SO1100D3_windowClose', err);
                    } finally {

                        unBindHandler(div);
                        changeMode(div);
                        bindHandler(div);
                    };
                });
        } catch (err) {
            unBindHandler(div);
            changeMode(div);
            bindHandler(div);
            errorHandle(formName, 'showSO1100D3', err);
        } finally {

        };

    }
    function btnACHDetailClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return };
        if (options.editMode == editMode.append) {
            messageBox(options.language.NotView, messageType.critical);
            return;
        };
        showSO1100D1(event.data);
        
    };
    function btnEditClick(event) {
        var options = $.data(event.data, formName).options;
        if ($(this).jqxButton('disabled')) { return; };
        options.editMode = editMode.edit;
        changeMode(event.data);
    }
    function btnCancelClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return; };
        try {
            disableAllControl(event.data);
            switch (options.editMode) {
                case editMode.append: 
                    if (options.containerIsWindow) {
                        $(options.container).triggerHandler('winClosing');
                    };
                    break;
                
                case editMode.edit: 
                    if (options.containerIsWindow) {
                        $(options.container).triggerHandler('winClosing');
                    } else {
                        unBindHandler(event.data);
                        options.editMode = editMode.view;
                        rcdToScr(event.data);
                        changeMode(event.data);
                        bindHandler(event.data);
                    }
                    
                    break;
                
                default: 
                    if (options.containerIsWindow) {
                        $(options.container).triggerHandler('winClosing');
                    };
                    break;
                
            };
        } catch (err) {
            changeMode(event);
            errorHandle(formName, 'bindHandler', err);
        } finally {

        };
    };
    function chkStopFlagChange(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxCheckBox('disabled')) { return };
        if (event.args.checked) {
            if ($(headerId + 'dtStopDate').csDateTime('getText') == null) {
                $(headerId + 'dtStopDate').csDateTime('setDate', new Date());
            };            
        } else {
            $(headerId + 'dtStopDate').csDateTime('clear');
        };
    };
    function closeSO1100D2(event) {
        var options = $.data(event.data.div, formName).options;
        var headerId = '#' + $(event.data.div).prop('id');
        var winResult = event.data.result;
        var action = event.data.action;
        var div = event.data.div;
        $('#' + winResult['windowId']).off('close', closeSO1100D2);
        try {
            otherForm.length = 0;
            otherForm = [];
            var returnOptions = $('#' + winResult['contentId']).SO1100D2('options');
            var pkBillNo = '';
            var unSelect = '';
            if (returnOptions.isSaved) {
                pkBillNo = returnOptions.selectCharge;
                unSelect = returnOptions.unSelectCharge;
            } else {
                pkBillNo = returnOptions.defaultCharge;
            };
            if (!returnOptions.isSaved) {
                messageBox(options.language.VoidAsk, messageType.yesno, null, function (flag) {
                    if (flag.toUpperCase() != 'yes'.toUpperCase()) {
                        unBindHandler(div);
                        changeMode(div);
                        bindHandler(div);
                        return;
                    } else {
                        if (pkBillNo != '') {
                            var o = pkBillNo.split(',');
                            $.each(o, function (key, value) {
                                var row = { BILLNO: value.substr(0, 15), ITEM: value.substr(15) };
                                options.initData.VoidBillNo.rows.push(row);
                               
                            });                           
                        };
                        if (unSelect == '') {
                            $(headerId + 'csmCharge').csMulti('clearChoose');
                        } else {
                            $(headerId + 'csmCharge').csMulti('setDisplayValue', unSelect);
                        };
                        if ($.isFunction(action)) { action(); };
                    };

                    return;
                });
            } else {
                if (pkBillNo != '') {
                    var o = pkBillNo.split(',');
                    $.each(o, function (key, value) {
                        var row = { BILLNO: value.substr(0, 15), ITEM: value.substr(15) };
                        options.initData.VoidBillNo.rows.push(row);

                    });
                };
                if (unSelect == '') {
                    $(headerId + 'csmCharge').csMulti('clearChoose');
                } else {
                    $(headerId + 'csmCharge').csMulti('setDisplayValue', unSelect);
                };
                if ($.isFunction(action)) { action(); };
            };
            /*
            if (returnOptions.introData.rows.length > 0) {
                $(headerId + 'txtIntroId').jqxInput('val', returnOptions.introData.rows[0]['CODENO']);
                $(headerId + 'lblIntroName').jqxInput('val', returnOptions.introData.rows[0]['DESCRIPTION']);
            } */
        } catch (err) {
            errorHandle(formName, 'windowClose', err);
            unBindHandler(div);
            changeMode(div);
            bindHandler(div);
        } finally {
            $('#' + winResult['windowId']).off('close', closeSO1100D2);
            $('#' + winResult['windowId']).unbind('close');
            $('#' + winResult['contentId']).SO1100D2('destroy');
            $('#' + winResult['windowId']).csWindow('destroy');

        };
    };
    function showSO1100D1(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var ds = { Data: { Account: {} } };
        try {
            disableAllControl(div);
            unBindHandler(div);
            ds['Data']['Account'] = $.extend({}, options.initData.Account);
            var winOptions = $.extend({}, {
                width: 600, height: 370,
                maxWidth: $(options.container).csWindow('width'),
                maxHeight: $(options.container).csWindow('height'),
                keyboardCloseKey: 'none',
                resizable: true,
                haveClosing: false,
                
            });
            var result = createcsWindow(div, options.language.ACTHLog, winOptions);
            var xp = 'center';
            var yp = 0;
            if (options.containerIsWindow) {
                xp = ($(options.container).csWindow('width') - $('#' + result['windowId']).csWindow('width')) / 2;
                yp = ($(options.container).csWindow('height') - $('#' + result['windowId']).csWindow('height')) / 2;
            };
           
            $('#' + result['windowId']).csWindow({ position: { x: xp, y: 0 } });
            
            $('#' + result['contentId']).SO1100D1($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: '#' + result['windowId'],
                parameters:cloneJSON(ds),
                editMode: options.editMode,
                localization: cloneJSON(options.localization)
            }));
            otherForm.push(['#' + result['contentId'], 'SO1100D1'])
            
            $('#' + result['windowId']).on('close',
                function () {
                    $('#' + result['windowId']).off('close');
                    try {
                        $('#' + result['windowId']).off('close');
                        $('#' + result['contentId']).SO1100D1('destroy');
                        $('#' + result['windowId']).csWindow('destroy');
                        otherForm.length = 0;
                        otherForm = [];
                    } catch (err) {
                        errorHandle(formName, 'SO1100D1_windowClose', err);
                    } finally {

                        unBindHandler(div);
                        changeMode(div);
                        bindHandler(div);
                    };
                });
        } catch (err) {
            unBindHandler(div);
            changeMode(div);
            bindHandler(div);
            errorHandle(formName, 'showSO1100D1', err);
        } finally {

        };
       
    }
    function showSO1100D2(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var needToShow = false;
        if (!$(headerId + 'chkStopFlag').jqxCheckBox('checked')) {
            if ($.isFunction(action)) {
                action();
            };
            return;
        };
        try {
          //  unBindHandler(div);
          //  disableAllControl(div);
            if (options.initData['Account'].rows.length > 0) {
                $.each(options.initData.CanChooseCharge.rows,
              function (index, row) {
                  if (row['AccountNo'.toUpperCase()] == options.initData['Account'].rows[0]['AccountId'.toUpperCase()]) {
                      needToShow = true;
                      return false;
                  };
              });
            };
          
            if (needToShow) {
                var ds = { Data: { CanChooseCharge: {}}};
                ds['Data']['CanChooseCharge'] = $.extend({}, options.initData.CanChooseCharge);
                var winOptions = $.extend({}, {
                    width: 600, height: 370,
                    maxWidth: $(options.container).csWindow('width'),
                    maxHeight: $(options.container).csWindow('height'),
                    keyboardCloseKey: 'none',
                    resizable: true,
                    haveClosing: false,                    
                });
                
                var result = createcsWindow(div, options.language.ChoiceClear, winOptions);
                var xp = 'center';
                var yp = 0;
                if (options.containerIsWindow) {
                    xp = ($(options.container).csWindow('width') - $('#' + result['windowId']).csWindow('width')) / 2;
                    yp = ($(options.container).csWindow('height') - $('#' + result['windowId']).csWindow('height')) / 2;
                };
                $('#' + result['windowId']).csWindow({ position: { x: xp, y: 0 } });
                $('#' + result['contentId']).SO1100D2($.extend({}, {
                    loginInfo: cloneJSON( options.loginInfo),
                    container: '#' + result['windowId'],
                    parameters:cloneJSON( ds ),
                    accountNo: options.initData['Account'].rows[0]['AccountId'.toUpperCase()],
                    defaultCharge :$(headerId + 'csmCharge').csMulti('getChooseList'),                    
                    editMode: options.editMode,
                    localization:cloneJSON( options.localization)
                }));
                otherForm.push(['#' + result['contentId'], 'SO1100D2']);
                var o = { div: div, result: result, action: action };
                $('#' + result['windowId']).on('close', o, closeSO1100D2); 
            } else {
                if ($.isFunction(action)) { action(); };
            };
           
        } catch (err) {
            unBindHandler(div);
            changeMode(div);
            bindHandler(div);
            errorHandle(formName, 'createSO1100D2', err);
        } finally {

        };
    };
    function createSO111FA(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {                        
            unBindHandler(div);
            disableAllControl(div);
            var winOptions = $.extend({}, {
                width: 600, height: 300,
                maxWidth: 1028,
                maxHeight: 900,
                keyboardCloseKey: 'none',                                
                resizable: true,
                haveClosing: false
            })
            var result = createcsWindow(div, null, winOptions);
            var xp = 'center';
            var yp = 0;
            if (options.containerIsWindow) {
                 xp = ($(options.container).csWindow('width') - $('#' + result['windowId']).csWindow('width')) / 2;
                 yp = ($(options.container).csWindow('height') - $('#' + result['windowId']).csWindow('height')) / 2;
            };            
            $('#' + result['windowId']).csWindow({ position: { x: xp, y: 0 } });
            $('#' + result['contentId']).SO111FA($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: '#' + result['windowId'],
                localization: cloneJSON(options.localization),
                                                              
                mediaRefNo: $(headerId + 'gilMediaCode').csList('selectedItem').REFNO,
                
            }));
            otherForm.push(['#' + result['contentId'], 'SO111FA'])
            $('#' + result['windowId']).on('close', function () {
                $('#' + result['windowId']).off('close');
                otherForm.length = 0;
                otherForm = [];
                try {
                    var returnOptions = $('#' + result['contentId']).SO111FA('options');
                    if (returnOptions.introData.rows.length > 0) {
                        $(headerId + 'txtIntroId').jqxInput('val', returnOptions.introData.rows[0]['CODENO']);
                        $(headerId + 'lblIntroName').jqxInput('val', returnOptions.introData.rows[0]['DESCRIPTION']);
                    }
                } catch (err) {
                    errorHandle(formName, 'windowClose', err);
                } finally {
                    $('#' + result['windowId']).off('close');
                    $('#' + result['contentId']).SO111FA('destroy');
                    $('#' + result['windowId']).csWindow('destroy');
                    unBindHandler(div);
                    changeMode(div);
                    bindHandler(div);
                };                             
            });
        } catch (err) {
            unBindHandler(div);
            changeMode(div);
            bindHandler(div);
            errorHandle(formName, 'createSO111FA', err);
        } finally {

        };
    };
    function isDataOK(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            if ($(headerId + 'txtAccOwnerID').val() != '') {
                if (chkAuthorities(div, 'SO1100G0')) {
                    var rt = chkID(div, $(headerId + 'txtAccOwnerID').val().toUpperCase());
                    if (!rt[0]) {
                        messageBox(options.language.AccOwnerErr, messageType.critical, null, function (flag) {
                            bindHandler(div);
                            changeMode(div);                           
                            $(headerId + 'txtAccOwnerID').jqxMaskedInput('focus');
                            return;
                        });                        
                        return false;
                    };
                };                
            };
            /*
            if ($(headerId + 'txtID').jqxMaskedInput('value') != '') {
                if (chkAuthorities(div, 'SO1100G0')) {
                    var rt = chkID(div, $(headerId + 'txtID').jqxMaskedInput('value'));
                    if (!rt[0]) {
                        messageBox(options.language.ChkIdErr, messageType.critical, null, function (flag) {
                            bindHandler(div);
                            changeMode(div);
                            $(headerId + 'txtID').jqxMaskedInput('focus');
                            return;
                        });
                        
                        return false;
                    };
                };
            }; */
            if ($(headerId + 'txtAccountNo').val() == '') {
                messageBox(options.language.MustAcc, messageType.critical, null, function (flag) {
                    bindHandler(div);
                    changeMode(div);
                    $(headerId + 'txtAccountNo').jqxMaskedInput('focus');
                    return;
                });
                return false;
            };
            if ($(headerId + 'gilCMCode').csList('codeNo') == '') {
                messageBox(options.language.MustCMCode, messageType.critical);
                return false;
            };
            var CMCodeRefno = $(headerId + 'gilCMCode').csList('selectedItem').REFNO;
            if (CMCodeRefno == 4) {
                if ($(headerId + 'gilCardName').csList('codeNo') == '') {
                    messageBox(options.language.MustCard, messageType.critical);
                    return false;
                };
                var rt = chkAccountNo(div, $(headerId + 'txtAccountNo').val());
                if (!rt[0]) {
                    messageBox(rt[1], messageType.critical, null, function (flag) {
                        bindHandler(div);
                        changeMode(div);
                        $(headerId + 'txtAccountNo').jqxMaskedInput('focus');
                        return false;
                    });
                    return false;
                };
                
            };
            return true;
            /*
            if (chkAuthorities(div, 'SO1100G0')) {
                if chkAccountNo(div,$(headerId+'').)
            }; */
        } catch (err) {
            errorHandle(formName, 'isDataOK', err);
        } finally {

        };
    };
    function chkSnactionDate(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var CMCodeRefno = $(headerId + 'gilCMCode').csList('selectedItem').REFNO;
        if (CMCodeRefno == 4) {
            if ($(headerId + 'dtSnactionDate').csDateTime('getText') == null) {
                messageBox(options.language.AskSaveWithSnaction, messageType.yesno, null, function (flag) {
                    if (flag == 'yes') {
                        if ($.isFunction(act)) { act(); };
                    } else {
                        bindHandler(div);
                        changeMode(div);

                        // changeMode(event.data);
                        return;
                    };
                });
            } else {
                if ($.isFunction(act)) { act(); };
            };
        } else {
            if ($.isFunction(act)) { act(); };
        };
    };
    function btnSaveClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return; };
        if (options.editMode == editMode.view) { return; };
        try {

            unBindHandler(event.data);
            disableAllControl(event.data);
            //isDataOK
            delete options.initData['VoidBillNo'];
            options.initData['VoidBillNo'] = null;
            options.initData['VoidBillNo'] = createVoidData()['VoidBillNo'];            
            if (!isDataOK(event.data)) {
                changeMode(event.data);
                bindHandler(event.data);
                return;
            } else {
              
                showSO1100D2(event.data, function () {
                    scrToRcd(event.data, function () {
                        chkData(event.data, function () {
                            chkSnactionDate(event.data, function () {
                                saveData(event.data, function () {
                                    options.isSaved = true;
                                    options.editMode = editMode.view;

                                    if (options.isAutoClosed == true && options.containerIsWindow) {
                                        bindHandler(event.data);
                                        $(options.container).triggerHandler('winClosing');
                                        return;
                                    } else {
                                        rcdToScr(event.data);
                                        changeMode(event.data);
                                        bindHandler(event.data);
                                    };

                                });
                            });
                           
                        });
                    });
                });
                
                
                /*
                if ($(headerId + 'chkStopFlag').jqxCheckBox('checked')) {
                    $.each(options.initData.CanChooseCharge.rows,
                        function (index, row) {

                        });
                    //var found = options.initData.CanChooseCharge.rows.eac
                } else {
                    scrToRcd(event.data,
                        function () {
                            chkData(event.data, function () {
                                showSO1100D2(event.data,
                                    function () {
                                        saveData(event.data, function () {
                                            options.isSaved = true;
                                            options.editMode = editMode.view;
                                            bindHandler(event.data);
                                            if (options.isAutoClosed == true && options.containerIsWindow) {
                                                $(options.container).triggerHandler('winClosing');
                                                return;
                                            } else {
                                                rcdToScr(event.data);
                                                changeMode(event.data);
                                            };

                                        });
                                    });
                                
                            });
                        });
                }; */
            };
        } catch (err) {            
            errorHandle(formName, 'btnSaveClick', err);
            changeMode(event.data);
            bindHandler(event.data);
        } finally {

        };
    };
    function saveData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, options.copyLoginInfo,
               { EditMode: { type: 'integer', value: options.editMode } },
               { dsAccount: { type: 'string', value: options.dsSave } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'SaveNewData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            delete options.initData.Account;
                            options.initData.Account = null;
                            options.initData['Account'] = $.extend({}, tmp.Account);
                            options.returnMasterid = tmp.Account.rows[0].MASTERID;
                            options.initData.ChooseProduct = $.extend({}, tmp.ChooseProduct);
                            options.initData.CanChooseCharge = $.extend({}, tmp.CanChooseCharge);
                            delete options.initData.IsAchBank;
                            options.initData.IsAchBank = null;
                            options.initData['IsAchBank'] = $.extend({}, tmp.IsAchBank);
                            options.isACH = false;
                            if (tmp.IsAchBank.rows[0].ResultBoolean == 1) {
                                options.isACH = true;
                            };
                            delete tmp;
                            tmp = null;
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(event.data);
                            bindHandler(event.data);
                        }
                    } catch (err) {
                        errorHandle(formName, 'saveData-Server', err);
                        changeMode(div);
                        bindHandler(event.data);
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
    function chkData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, options.copyLoginInfo,
               { EditMode: { type: 'integer', value: options.editMode } },
               { dsAccount: { type: 'string', value: options.dsSave } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'ChkDataOk',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div);                            
                            bindHandler(div);
                        }
                    } catch (err) {
                        errorHandle(formName, 'chkData-Server', err);                        
                        changeMode(div);
                        bindHandler(div);
                    } finally {
                        parameters = null;
                        params = null;                      
                        delete parameters;
                        delete params;
                    };
                }
            });

        } catch (err) {
            errorHandle(formName, 'chkData', err);
            changeMode(div);
            bindHandler(div);
        } finally {

        };
    };
    function scrToRcd(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            delete options.dsSave;
            options.dsSave = {};
            options.dsSave['OldProduct'] = $.extend(true, {}, options.initData.OldChooseProduct)
            //options.dsSave['ChangeProduct'] = copyToNewTable(div, 'ChooseProduct', false);
            options.dsSave['ChangeProduct'] = $.extend(true, {}, options.initData.ChooseProduct)
            options.dsSave['OldAccount'] = $.extend(true,{}, options.initData.Account);
            options.dsSave['Declared'] = $.extend(true,{}, options.initData.Declared);
            if (options.editMode == editMode.append) {
                var citemstr = null;
                var citemstr2 = null;
                if (options.initData['Account'].rows.length > 0) {
                    citemstr = options.initData['Account'].rows[0]['citemstr'.toUpperCase()];
                    citemstr2 = options.initData['Account'].rows[0]['citemstr2'.toUpperCase()];
                };
                options.dsSave['OldAccount'].rows.length = 0;
                options.dsSave['Account'] = copyToNewTable(div, 'Account', true);
                options.dsSave['Account'].rows[0]['citemstr'.toUpperCase()] = citemstr;
                options.dsSave['Account'].rows[0]['citemstr2'.toUpperCase()] = citemstr2;
            } else {
                options.dsSave['Account'] = $.extend(true,{}, options.initData.Account);
            };                        
            options.dsSave['OldAch'] = createOldAch()['OldAch'];
            options.dsSave['VoidBillNo'] = $.extend(true,{}, options.initData.VoidBillNo)
            
            //options.dsSave['Account'].rows[0]['CUSTID'] = options.custId;
            options.dsSave['Account'].rows[0]['CUSTID'] = null;
            options.dsSave['Account'].rows[0]['MASTERID'] = options.masterId;
            
            if (options.dsSave['OldAccount'].rows.length > 0) {
                if (options.dsSave['OldAccount'].rows[0]['ACHTNO'] != null) {
                    options.dsSave['OldAch'].rows[0]['ACHTNO'] = options.dsSave['OldAccount'].rows[0]['ACHTNO'];
                    options.dsSave['OldAch'].rows[0]['ACHTDESC'] = options.dsSave['OldAccount'].rows[0]['ACHTDESC'];
                };
                options.dsSave['Account'].rows[0]['CUSTID'] = options.dsSave['OldAccount'].rows[0]['CUSTID'];
                options.dsSave['Account'].rows[0]['MASTERID'] = options.dsSave['OldAccount'].rows[0]['MASTERID'];
            };
            //Proposer
            options.dsSave['Account'].rows[0]['Proposer'.toUpperCase()] = $(headerId + 'cboProposer').jqxInput('val');
            //ID
            if ($(headerId + 'txtID').jqxInput('val') != '') {
                options.dsSave['Account'].rows[0]['ID'.toUpperCase()] = $(headerId + 'txtID').jqxInput('val');
            } else { options.dsSave['Account'].rows[0]['ID'.toUpperCase()] = null; };
            //Alien
            if ($(headerId + 'chkFore').jqxCheckBox('checked')) {
                options.dsSave['Account'].rows[0]['Alien'.toUpperCase()] = 1;
            } else { options.dsSave['Account'].rows[0]['Alien'.toUpperCase()] = 0; };
            //CardCode,CardName
            if ($(headerId + 'gilCardName').csList('codeNo') != '') {
                options.dsSave['Account'].rows[0]['CardCode'.toUpperCase()] = parseInt($(headerId + 'gilCardName').csList('codeNo'));
                options.dsSave['Account'].rows[0]['CardName'.toUpperCase()] = $(headerId + 'gilCardName').csList('description');;
            } else {
                options.dsSave['Account'].rows[0]['CardCode'.toUpperCase()] = null;
                options.dsSave['Account'].rows[0]['CardName'.toUpperCase()] = null;
            }
            //CMcode、CMName
            if ($(headerId + 'gilCMCode').csList('codeNo') != '') {
                options.dsSave['Account'].rows[0]['CMcode'.toUpperCase()] = parseInt($(headerId + 'gilCMCode').csList('codeNo'));
                options.dsSave['Account'].rows[0]['CMName'.toUpperCase()] = $(headerId + 'gilCMCode').csList('description');
            } else {
                options.dsSave['Account'].rows[0]['CMcode'.toUpperCase()] = null;
                options.dsSave['Account'].rows[0]['CMName'.toUpperCase()] = null;
            };
            //PTCode、PTName
            if ($(headerId + 'gilPTCode').csList('codeNo') != '') {
                options.dsSave['Account'].rows[0]['PTCode'.toUpperCase()] = parseInt($(headerId + 'gilPTCode').csList('codeNo'));
                options.dsSave['Account'].rows[0]['PTName'.toUpperCase()] = $(headerId + 'gilPTCode').csList('description');
            } else {
                options.dsSave['Account'].rows[0]['PTCode'.toUpperCase()] = null;
                options.dsSave['Account'].rows[0]['PTName'.toUpperCase()] = null;
            };
            //BankCode、BankName
            if ($(headerId + 'gilBankCode').csList('codeNo') != '') {
                options.dsSave['Account'].rows[0]['BankCode'.toUpperCase()] = parseInt($(headerId + 'gilBankCode').csList('codeNo'));
                options.dsSave['Account'].rows[0]['BankName'.toUpperCase()] = $(headerId + 'gilBankCode').csList('description');
            } else {
                options.dsSave['Account'].rows[0]['BankCode'.toUpperCase()] = null;
                options.dsSave['Account'].rows[0]['BankName'.toUpperCase()] = null;
            };
            //IntroID、IntroName
            if ($(headerId + 'txtIntroId').jqxInput('val') != '') {
                options.dsSave['Account'].rows[0]['IntroID'.toUpperCase()] = $(headerId + 'txtIntroId').jqxInput('val');
                options.dsSave['Account'].rows[0]['IntroName'.toUpperCase()] = $(headerId + 'lblIntroName').jqxInput('val');
            } else {
                options.dsSave['Account'].rows[0]['IntroID'.toUpperCase()] = null;
                options.dsSave['Account'].rows[0]['IntroName'.toUpperCase()] = null;
            };
            //AccountID          
            if (chkAuthorities(div, 'SO1100G9')) {
                options.dsSave['Account'].rows[0]['AccountID'.toUpperCase()] = $(headerId + 'txtAccountNo').val();
            } else {
                if (options.dsSave['OldAccount'].rows.length > 0) {
                    options.dsSave['Account'].rows[0]['AccountID'.toUpperCase()] = options.dsSave['OldAccount'].rows[0]['AccountID'.toUpperCase()]
                } else { options.dsSave['Account'].rows[0]['AccountID'.toUpperCase()] = null; };
            };            
            if (options.editMode == editMode.append) {
                options.dsSave['Account'].rows[0]['AccountID'.toUpperCase()] = $(headerId + 'txtAccountNo').val();
            };
            //CVC2
            if ($(headerId + 'txtCVC2').jqxMaskedInput('value') != '') {
                options.dsSave['Account'].rows[0]['CVC2'.toUpperCase()] = $(headerId + 'txtCVC2').jqxMaskedInput('value');
            } else { options.dsSave['Account'].rows[0]['CVC2'.toUpperCase()]; };

            //StopYM
            
            if ($(headerId + 'txtHide').jqxDateTimeInput('val') != '') {
                options.dsSave['Account'].rows[0]['StopYM'.toUpperCase()] =
                            parseInt($(headerId + 'txtHide').jqxDateTimeInput('val').replace(/\D*/g, ''));
            }
            else {
                options.dsSave['Account'].rows[0]['StopYM'.toUpperCase()] = null;
             };

            //if ($(headerId + 'txtHide').csDateTime('getText') != '') {
            //    options.dsSave['Account'].rows[0]['StopYM'.toUpperCase()] =
            //                parseInt($(headerId + 'txtHide').csDateTime('getText').replace(/\D*/g, ''));
           // }
           //  else {
           //      options.dsSave['Account'].rows[0]['StopYM'.toUpperCase()] = null;
           //  };

            //AccountName
            if ($(headerId + 'txtAccountOwner').jqxInput('val') != '') {
                options.dsSave['Account'].rows[0]['AccountName'.toUpperCase()] = $(headerId + 'txtAccountOwner').jqxInput('val');
            } else { options.dsSave['Account'].rows[0]['AccountName'.toUpperCase()] = null; };
            //AccountNameID
            if ($(headerId + 'txtAccOwnerID').val() != '') {
                options.dsSave['Account'].rows[0]['AccountNameID'.toUpperCase()] = $(headerId + 'txtAccOwnerID').val().toUpperCase();
            } else { options.dsSave['Account'].rows[0]['AccountNameID'.toUpperCase()] = null; };
            //AccountAlien
            if ($(headerId + 'chkFore2').jqxCheckBox('checked')) {
                options.dsSave['Account'].rows[0]['AccountAlien'.toUpperCase()] = 1;
            } else { options.dsSave['Account'].rows[0]['AccountAlien'.toUpperCase()] = 0; };

            //MediaCode、MediaName
            if ($(headerId + 'gilMediaCode').csList('codeNo') != '') {
                options.dsSave['Account'].rows[0]['MediaCode'.toUpperCase()] = parseInt($(headerId + 'gilMediaCode').csList('codeNo'));
                options.dsSave['Account'].rows[0]['MediaName'.toUpperCase()] = $(headerId + 'gilMediaCode').csList('description');
            } else {
                options.dsSave['Account'].rows[0]['MediaCode'.toUpperCase()] = null;
                options.dsSave['Account'].rows[0]['MediaName'.toUpperCase()] = null;
            };
            
            //SendDate
            if ($(headerId + 'dtSendDate').csDateTime('getText') != '') {
                options.dsSave['Account'].rows[0]['SendDate'.toUpperCase()] = $(headerId + 'dtSendDate').csDateTime('getDate');
            } else {
                options.dsSave['Account'].rows[0]['SendDate'.toUpperCase()] = null;
            };
            //PropDate
            if ($(headerId + 'dtContiDate').csDateTime('getText') != '') {
                options.dsSave['Account'].rows[0]['PropDate'.toUpperCase()] = $(headerId + 'dtContiDate').csDateTime('getDate');
            } else { options.dsSave['Account'].rows[0]['PropDate'.toUpperCase()] = null; };
            //SnactionDate
            if ($(headerId + 'dtSnactionDate').csDateTime('getText') != '') {
                options.dsSave['Account'].rows[0]['SnactionDate'.toUpperCase()] = $(headerId + 'dtSnactionDate').csDateTime('getDate');
            } else { options.dsSave['Account'].rows[0]['SnactionDate'.toUpperCase()] = null; };

            //AcceptTime
            if ($(headerId + 'edtAcceptTime').csDateTime('getText') != '') {
                options.dsSave['Account'].rows[0]['AcceptTime'.toUpperCase()] = $(headerId + 'edtAcceptTime').csDateTime('getDate');
            } else { options.dsSave['Account'].rows[0]['AcceptTime'.toUpperCase()] = null; };
            //AcceptEn、AcceptName
            if ($(headerId + 'gilAcceptName').csList('codeNo') != '') {
                options.dsSave['Account'].rows[0]['AcceptEn'.toUpperCase()] = $(headerId + 'gilAcceptName').csList('codeNo');
                options.dsSave['Account'].rows[0]['AcceptName'.toUpperCase()] = $(headerId + 'gilAcceptName').csList('description');
            } else {
                options.dsSave['Account'].rows[0]['AcceptEn'.toUpperCase()] = null;
                options.dsSave['Account'].rows[0]['AcceptName'.toUpperCase()] = null;
            };

            //StopFlag
            if ($(headerId + 'chkStopFlag').jqxCheckBox('checked')) {
                options.dsSave['Account'].rows[0]['StopFlag'.toUpperCase()] = 1;
            } else { options.dsSave['Account'].rows[0]['StopFlag'.toUpperCase()] = 0; };

            //StopDate
            if ($(headerId + 'dtStopDate').csDateTime('getText') != '') {
                options.dsSave['Account'].rows[0]['StopDate'.toUpperCase()] = $(headerId + 'dtStopDate').csDateTime('getDate');
            } else { options.dsSave['Account'].rows[0]['StopDate'.toUpperCase()] = null; };

            //DeAuthorize
            if ($(headerId + 'chkDeAut').jqxCheckBox('checked')) {
                options.dsSave['Account'].rows[0]['DeAuthorize'.toUpperCase()] = 1;
            } else { options.dsSave['Account'].rows[0]['DeAuthorize'.toUpperCase()] = 0; };
            //AuthorizeStopDate
            if ($(headerId + 'dtAuthStopDate').csDateTime('getText') != '') {
                options.dsSave['Account'].rows[0]['AuthorizeStopDate'.toUpperCase()] = $(headerId + 'dtAuthStopDate').csDateTime('getDate');
            } else { options.dsSave['Account'].rows[0]['AuthorizeStopDate'.toUpperCase()] = null; };
            //Note
            if ($(headerId + 'txtMemo').jqxTextArea('val') != '') {
                options.dsSave['Account'].rows[0]['Note'.toUpperCase()] = $(headerId + 'txtMemo').jqxTextArea('val');
            } else { options.dsSave['Account'].rows[0]['Note'.toUpperCase()] = null; };
            //ACHCustID
            if ($(headerId + 'txtACHcustID').jqxMaskedInput('val') != '') {
                options.dsSave['Account'].rows[0]['ACHCustID'.toUpperCase()] = $(headerId + 'txtACHcustID').jqxMaskedInput('val');
            } else { options.dsSave['Account'].rows[0]['ACHCustID'.toUpperCase()] = null; };
            //ACHSN
            if ($(headerId + 'txtAchSN').jqxInput('val') != '') {
                options.dsSave['Account'].rows[0]['ACHSN'.toUpperCase()] = $(headerId + 'txtAchSN').jqxInput('val');
            } else { options.dsSave['Account'].rows[0]['ACHSN'.toUpperCase()] = null; };
            //ACHTNO、ACHTDESC
            if ($(headerId + 'csmACH').csMulti('getChooseQuoteList') != '') {
                options.dsSave['Account'].rows[0]['ACHTNO'.toUpperCase()] = $(headerId + 'csmACH').csMulti('getChooseQuoteList');
                options.dsSave['Account'].rows[0]['ACHTDESC'.toUpperCase()] = $(headerId + 'csmACH').csMulti('getChooseQuoteListName');
            } else {
                options.dsSave['Account'].rows[0]['ACHTNO'.toUpperCase()] = null;
                options.dsSave['Account'].rows[0]['ACHTDESC'.toUpperCase()] = null;
            };
          


            //csmProduct
            /*
            if ($(headerId + 'csmProduct').csMulti('getChooseList') != '') {
                $.each($(headerId + 'csmProduct').csMulti('getChooseList').split(','), function (index, value) {
                    //accoding to columns to generate row
                    var o = {};
                    $.each(options.dsSave['ChangeProduct'].columns, function (index, column) {
                        o[column['name']] = null;
                    });
                    o['CUSTID'] = options.custId;
                    o['SERVICEID'] = parseInt(value);
                    options.dsSave['ChangeProduct'].rows.push(o);
                });               
            }; */
            //CitemStr2
            /*
            var o = [];
            if ($(headerId + 'csmProduct').csMulti('getChooseList') != '') {
                $.each($(headerId + 'csmProduct').csMulti('getChooseList').split(','), function (index, value) {
                    $.each(options.initData.CanChooseCharge.rows, function (index, row) {
                        if (value == row.SERVICEID) {
                            o.push("'" + row['PKBILLNO'] + "'");
                        };
                    });
                });                
            };
            if (o.length > 0) {
                options.dsSave['Account'].rows[0]['CitemStr2'.toUpperCase()] = o.toString();
            } else { options.dsSave['Account'].rows[0]['CitemStr2'.toUpperCase()] = null; };
            o.length = 0;
            o = null; */
            if ($.isFunction(action)) { action(); };
        } catch (err) {
            errorHandle(formName, 'scrToRcd', err);
        } finally {

        };
    };
    function createVoidData() {
        var VoidBillNo = {
            type: 'string',
            VoidBillNo: {
                columns: [{ name: 'BILLNO', type: 'string' },
                        { name: 'ITEM', type: 'string' }
                ],
                rows: []
            }
        };
        return VoidBillNo;
    };
    function createOldAch() {
        var OldAch = {
            type: 'string',
            OldAch: {
                columns: [{ name: 'ACHTNO', type: 'string' },
                        { name: 'ACHTDESC', type: 'string' }
                ],
                rows: [{
                    ACHTNO: null,
                    ACHTDESC: null
                }]
            }
        };
        return OldAch;
    };
    function copyToNewTable(div, tableName,isNewRow) {
        var options = $.data(div, formName).options;
        var copyTable = $.extend({}, options.initData[tableName]);
        delete copyTable.rows;
        copyTable.rows = null;
        copyTable.rows = [];
        if (isNewRow) {
            var o = {};
            $.each(copyTable.columns, function (index, column) {
                o[column['name']] = null;
            });
            copyTable.rows.push(o);
            //return copyTable;
        };
        return copyTable;
    };
    function createAccountTable(div) {
        var options = $.data(div, formName).options;
        var copyAccount = $.extend({}, options.initData.Account);
        delete copyAccount.rows;
        copyAccount.rows = null;
        copyAccount.rows = [];
        var obj = {}
        $.each(copyAccount.columns, function (index, column) {
            obj[column['name']] = null;
        });
        /*
        if (copyAccount.rows.length > 0) {
            $.each(copyAccount.rows[0], function (key, value) {
                copyAccount.rows[0][key] = null;
            })
        }; */
        
    }
    function btnFindClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if (options.editMode == editMode.view) { return; };
        if ($(this).jqxButton('disabled')) { return; };
        try {
            var refno = 0;
            if ($(headerId + 'gilMediaCode').csList('codeNo') == '') {
                messageBox(options.language.MustIntro, messageType.critical);
                return;
            };
            refno = $(headerId + 'gilMediaCode').csList('selectedItem').REFNO;
            if (refno == null) { refno = 0 };
            if (refno == 0) {
                messageBox(options.language.MustIntro, messageType.critical);
                return;
            };
            createSO111FA(event.data);
        } catch (err) {
            errorHandle(formName, 'btnFindClick', err);
        } finally {

        }
    };
    function dtSnactionDateFocus(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).csDateTime('disabled')) { return; };
        if (options.editMode == editMode.view) { return;}
        //alert('test');
        try {
            //unBindHandler(event.data);
            if ($(this).csDateTime('getText') == null) {
                $(this).csDateTime('setDate', new Date());
            };
            
        } catch (err) {
            
        } finally {
            //bindHandler(event.data);
        };
    };
    function getAccountMask(div,action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var mask = '';
        
        for (i = 0; i < 24; i++) {
            mask = mask + '#';
        };
        if ($(headerId + 'gilCMCode').csList('codeNo') == '' && $(headerId + 'gilBankCode').csList('codeNo') == '') {
            return mask;
        };
        if ($(headerId + 'gilCMCode').csList('codeNo') != '') {
            var refno = $(headerId + 'gilCMCode').csList('selectedItem').REFNO;
            mask = '';
            if (refno == 2 || refno == 4) {
                if ($(headerId + 'gilCardName').csList('codeNo') != '') {
                    switch (refno) {
                        case 4: 
                            switch ($(headerId + 'gilCardName').csList('selectedItem').REFNO) {
                                case 5:
                                    for (i = 0; i < 15; i++) {
                                        mask = mask + '#';
                                    };
                                    break;

                                case 6:
                                    for (i = 0; i < 14; i++) {
                                        mask = mask + '#';
                                    };
                                    break;

                                default: 
                                    for (i = 0; i < 16; i++) {
                                        mask = mask + '#';
                                    };
                                    break;
                                };
                             break;
                            
                        default: 
                            var len = $(headerId + 'gilCardName').csList('selectedItem').CARDNOLEN;
                            for (i = 0; i < len; i++) {
                                mask = mask + '#';
                            };
                            break;
                        
                    };
                } else {
                    if ($(headerId + 'gilBankCode').csList('codeNo') != '') {
                        var len = $(headerId + 'gilBankCode').csList('selectedItem').ACTLENGTH;
                        for (i = 0; i < len; i++) {
                            mask = mask + '#';
                        };
                    };
                };
            } else {
                if ($(headerId + 'gilBankCode').csList('codeNo') != '') {
                    var len = $(headerId + 'gilBankCode').csList('selectedItem').ACTLENGTH;                   
                    for (i = 0; i < len; i++) {
                        mask = mask + '#';
                    };
                };
            };
        };
        if (mask == '') {
            for (i = 0; i < 24; i++) {
                mask = mask + '#';
            };
        };
        return mask;
    };
    function chkBankType(div,bankCode, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var originalAch = '';
        try {
            var parameters = $.extend({}, options.copyLoginInfo,
              { BankCode: { type: 'integer', value: bankCode } });
              
            var params = getParameters(riadllName,
                   riaClassName,
                   'IsACHBank',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            options.isACH = false;
                            if (data.ResultBoolean) { options.isACH = true };
                            if (!options.isACH) {
                                $(headerId + 'csmACH').csMulti('clearChoose');
                            } else {                                
                                var o = jQuery.grep(options.initData.ACHTNo.rows, function (row) {
                                    return row['ACHTYPE'] == $(headerId + 'gilBankCode').csList('selectedItem').ACHTYPE;
                                });
                               
                                if ($(headerId + 'csmACH').csMulti('getChooseList') != undefined) {
                                    if ($(headerId + 'csmACH').csMulti('getChooseList') != null) {
                                        if ($(headerId + 'csmACH').csMulti('getChooseList') != '') {
                                            originalAch = $(headerId + 'csmACH').csMulti('getChooseList');
                                            
                                        };
                                    }
                                }
                                $(headerId + 'csmACH').csMulti('source', o);
                                if (originalAch != '') { $(headerId + 'csmACH').csMulti('setDisplayValue', originalAch); }
                            };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            //changeMode(div, options.editMode);
                        };
                        if ($.isFunction(action)) { action(); };
                    } catch (err) {
                        errorHandle(formName, 'chkBankType-Server', err);
                        changeMode(div);
                        unBindHandler(div )
                        bindHandler(div);
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
            errorHandle(formName, 'chkBankType', err);
        } finally {

        };
    };
    function getVirtualAccount(div,refno, bankCode, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (refno == 2 || refno == 4) {
            if ($.isFunction(action)) { action() };
            return true;
        };
        try {
            var parameters = $.extend({}, options.copyLoginInfo,
              { CustId: { type: 'integer', value: options.custId } },
              { BankCode: { type: 'integer', value: bankCode } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'GetVirtualAccount',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            $(headerId + 'txtAccountNo').jqxMaskedInput('val', data.ResultXML);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            //changeMode(div, options.editMode);
                        };
                        if ($.isFunction(action)) { action(); };
                    } catch (err) {
                        errorHandle(formName, 'getVirtualAccount-Server', err);
                        changeMode(div);
                        unBindHandler(div)
                        bindHandler(div);
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
            errorHandle(formName, 'getVirtualAccount', err);
            changeMode(div);
            unBindHandler(div)
            bindHandler(div);
        } finally {

        };
    };
    function txtIntroIdChange(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxInput('val') == '') {
            $(headerId + 'lblIntroName').jqxInput('val', '');            
            return;
        };
        if ($(this).jqxInput('disabled')) { return };
        try {
            unBindHandler(event.data);
            disableAllControl(event.data);
            var refno = 0;
            if ($(headerId + 'gilMediaCode').csList('codeNo') != '') {
                refno = $(headerId + 'gilMediaCode').csList('selectedItem').REFNO;
                if (refno == null) { refno = 0; };
            };
            if (refno == 0) {
                $(headerId + 'lblIntroName').jqxInput('val', '');
                $(this).jqxInput('val', '');
                bindHandler(event.data);
                changeMode(event.data);
                return;
            };
            var parameters = $.extend({}, options.copyLoginInfo,
            { MediaRefNo: { type: 'integer', value: refno } },            
            { searchWord: { type: 'string', value: $(this).jqxInput('val') } });

            var params = getParameters('CableSoft.SO.RIA.Customer.IntroMedia.Web.dll',
                   'CableSoft.SO.RIA.Customer.IntroMedia.Web.IntroMedia',
                   'keyCodeSearch',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            if (tmp.Table.rows.length > 0) {
                                $(headerId + 'lblIntroName').jqxInput('val',
                                    tmp.Table.rows[0]['Description'.toUpperCase()]);
                            } else {
                                switch (refno) {
                                    case 2: 
                                        messageBox(options.language.EmErr, messageType.critical);
                                        break;
                                    
                                    case 3: 
                                        messageBox(options.language.SaleErr, messageType.critical);
                                        break;
                                    
                                    default: 
                                        messageBox(options.language.CustErr, messageType.critical);
                                        break;
                                    
                                };
                                $(headerId + 'lblIntroName').jqxInput('val', '');
                                $(headerId + 'txtIntroId').jqxInput('val', '');
                            };
                           
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            $(headerId + 'lblIntroName').jqxInput('val', '');
                            $(this).jqxInput('val', '');
                            //changeMode(div, options.editMode);
                        };
                        changeMode(event.data);
                        unBindHandler(event.data)
                        bindHandler(event.data);
                    } catch (err) {
                        errorHandle(formName, 'searchWord-Server', err);
                        $(headerId + 'lblIntroName').jqxInput('val', '');
                        $(this).jqxInput('val', '');
                        changeMode(event.data);
                        unBindHandler(event.data)
                        bindHandler(event.data);
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
            bindHandler(event.data);
            changeMode(event.data);
            errorHandle(formName, 'searchWord', err);
        } finally {

        };
    };
    function chkAccountNo(div,acc) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var result = [true, 0];
        var refno = 0;
        try {
            if ($(headerId + 'gilCMCode').csList('codeNo') != '') {
                refno = $(headerId + 'gilCMCode').csList('selectedItem').REFNO;
                if (refno == null) { refno = 0 };
            };
            if (refno == 4) {
                if ($(headerId + 'gilCardName').csList('codeNo') != '') {
                    var type = $(headerId + 'gilCardName').csList('selectedItem').REFNO;
                    if (type == null) { type = 0 } else {type = type -1}
                    result = creditCardVerify(type, acc);
                    /*
                    if (!result[0]) {
                        messageBox(result[1], messageType.critical, null, function (flag) {
                    
                            $(headerId + 'txtAccountNo').jqxMaskedInput('focus');
                            return false;
                    
                        });
                    }; */
                    return result;
                };
            };
            return result;
        } catch (err) {
            errorHandle(formName, 'chkAccountNo', err);
            return false;
        } finally {

        };
    };
    function txtAccountNoChanged(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxMaskedInput('disabled')) { return; };
        if ($(this).val() == '') { return; };
        
        try {
            unBindHandler(event.data);
            //var rt = chkAccountNo(event.data, event.args.text);
            var rt = chkAccountNo(event.data, $(this).val())
            if (!rt[0]) {
                messageBox(rt[1], messageType.critical, null, function (flag) {

                    $(this).jqxMaskedInput('focus');
                    return false;

                });
                //$(this).jqxMaskedInput('focus');
            };
            /*
            var refno = 0;
            if ($(headerId + 'gilCMCode').csList('codeNo') != '') {
                refno = $(headerId + 'gilCMCode').csList('selectedItem').REFNO;
                if (refno == null) {refno = 0};
            };
            if (refno == 4) {
                if ($(headerId + 'gilCardName').csList('codeNo') != '') {
                    var type = $(headerId + 'gilCardName').csList('selectedItem').REFNO;
                    if (type == null) { type = 0 };                                      
                    var result = creditCardVerify(type, event.args.text);
                    if (!result[0]) {
                        messageBox(result[1], messageType.critical, null, function (flag) {
                            //bindHandler(event.data);
                            //changeMode(event.data);
                            //var origin = $(headerId + 'txtID').jqxMaskedInput('value');
                            //$(headerId + 'txtID').jqxMaskedInput('clear');                        
                            //$(headerId + 'txtID').jqxMaskedInput('val', origin);
                            $(headerId + 'txtAccountNo').jqxMaskedInput('focus');
                            //return;
                        });
                    };
                };
            }; */
        } catch (err) {
            errorHandle(formName, 'txtAccountNoChanged', err);
        } finally {
            bindHandler(event.data);
        };
    };
    function gilCardNameSelectChanged(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).csList('codeNo') == '') { return; };
        unBindHandler(event.data);
        try {
            var maskWord = getAccountMask(event.data);
            var originAcc = $(headerId + 'txtAccountNo').val();
            $(headerId + 'txtAccountNo').jqxMaskedInput({ mask: maskWord });
            $(headerId + 'txtAccountNo').jqxMaskedInput('val','');
            $(headerId + 'txtAccountNo').jqxMaskedInput('val', originAcc);
        } catch (err) {
            errorHandle(formName, 'gilCardNameSelectChanged', err);
        } finally {
            bindHandler(event.data);
        };
    };
    function gilBankCodeSelectChanged(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).csList('codeNo') == '') { return; };
        unBindHandler(event.data);
        disableAllControl(event.data);
        try {
            var maskWord = getAccountMask(event.data);
            var originAcc = $(headerId + 'txtAccountNo').val();
            $(headerId + 'txtAccountNo').jqxMaskedInput({ mask: maskWord });
            $(headerId + 'txtAccountNo').jqxMaskedInput('val','');
            $(headerId + 'txtAccountNo').jqxMaskedInput('val', originAcc);
            chkBankType(event.data, $(this).csList('codeNo'),
                    function () {
                        var refno = 0;
                        if ($(headerId + 'gilCMCode').csList('codeNo') != '' ) {
                            refno = $(headerId + 'gilCMCode').csList('selectedItem').REFNO;                            
                            if ( refno == null ) {refno = 0} ;
                        };
                        getVirtualAccount(event.data, refno, $(headerId + 'gilBankCode').csList('codeNo'),
                            function () {
                                changeMode(event.data);
                                bindHandler(event.data);
                            });                        
                    }
                )
        } catch (err) {
            errorHandle(formName, 'gilBankCodeSelectChanged', err);
        } finally {

        };
    };
    function gilCMCodeSelectChanged(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).csList('codeNo') == '') { return; };
        try {
            
            disableAllControl(event.data);
            unBindHandler(event.data);
            changeFieldColor(event.data);
            var maskWord = getAccountMask(event.data);
            var originAcc = $(headerId + 'txtAccountNo').val();
            $(headerId + 'txtAccountNo').jqxMaskedInput({ mask: maskWord });
            $(headerId + 'txtAccountNo').jqxMaskedInput('val','');
            $(headerId + 'txtAccountNo').jqxMaskedInput('val', originAcc);
            if ($(this).csList('selectedItem').REFNO == 4) {
                $.each(options.initData.PTCode.rows, function (index, row) {
                    if (row.REFNO == 4) {
                        $(headerId + 'gilPTCode').csList('codeNo', row.CODENO);
                        return true;
                    };

                });
            };
           
            //changeMode(event.data);
            //bindHandler(event.data);            
        } catch (err) {
            errorHandle(formName, 'gilCMCodeSelectChanged', err);
        } finally {
            changeMode(event.data);
            bindHandler(event.data);
        };
    };
    function txtAccOwnerIDChange(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if (!chkAuthorities(event.data, 'SO1100G0')) { return; };
        //if (event.args.text == '') { return; };
        if ($(this).val() == '') { return; };
        try {
            if ($(this).val() != '') {
                disableAllControl(event.data);
                unBindHandler(event.data);
                disableAllControl(event.data);
                unBindHandler(event.data);
                var rt = chkID(event.data, $(this).val().toUpperCase());
                if (rt[0]) {
                    bindHandler(event.data);
                    changeMode(event.data);
                } else {
                    messageBox(rt[1], messageType.critical, null, function (flag) {
                        bindHandler(event.data);
                        changeMode(event.data);
                        //var origin = $(headerId + 'txtID').jqxMaskedInput('value');
                        //$(headerId + 'txtID').jqxMaskedInput('clear');                        
                        //$(headerId + 'txtID').jqxMaskedInput('val', origin);
                        $(headerId + 'txtAccOwnerID').jqxMaskedInput('focus');
                        return;
                    });
                };

                /*
                if (chkID(event.data, 'txtAccOwnerID', event.args.text)) {
                    bindHandler(event.data);
                    changeMode(event.data);
                }; */
                return;
                if (event.args.text.length != 8 && event.args.text.length != 10) {
                    var msg = options.language.chkLength + '\r' +
                                 options.language.CompIdLen + '\r' +
                                 options.language.IdLen;

                    messageBox(msg, messageType.critical, null, function (flag) {
                        bindHandler(event.data);
                        changeMode(event.data);
                        //var origin = $(headerId + 'txtID').jqxMaskedInput('value');
                        //$(headerId + 'txtID').jqxMaskedInput('clear');                        
                        //$(headerId + 'txtID').jqxMaskedInput('val', origin);
                        $(headerId + 'txtAccOwnerID').jqxMaskedInput('focus');
                        return;
                    });
                };
                switch (event.args.text.length) {
                    case 8: 
                        var result = invNoVerify(event.args.text);
                        if (!result[0]) {
                            messageBox(result[1], messageType.critical, null, function (flag) {
                                bindHandler(event.data);
                                changeMode(event.data);
                                //var origin = $(headerId + 'txtID').jqxMaskedInput('value');
                                //$(headerId + 'txtID').jqxMaskedInput('clear');                        
                                //$(headerId + 'txtID').jqxMaskedInput('val', origin);
                                $(headerId + 'txtAccOwnerID').jqxMaskedInput('focus');
                                return;
                            });
                        }
                        break;
                    
                    case 10: 
                        var result = IDVerify(event.args.text);
                        if (!result[0]) {
                            messageBox(result[1], messageType.critical, null, function (flag) {
                                bindHandler(event.data);
                                changeMode(event.data);
                                //var origin = $(headerId + 'txtID').jqxMaskedInput('value');
                                //$(headerId + 'txtID').jqxMaskedInput('clear');                        
                                //$(headerId + 'txtID').jqxMaskedInput('val', origin);
                                $(headerId + 'txtAccOwnerID').jqxMaskedInput('focus');
                                return;
                            });
                        }
                        break;
                    
                };
                bindHandler(event.data);
                changeMode(event.data);
            };
        } catch (err) {
            bindHandler(event.data);
            changeMode(event.data);
            errorHandle(formName, 'txtAccOwnerIDChange', err);
        } finally {


        };
    };
    function chkID(div, txt) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');        
        try {
            if (txt.length != 8 && txt.length != 10) {
                
                var msg = options.language.chkLength + '\r' +
                             options.language.CompIdLen + '\r' +
                             options.language.IdLen;
                /*
                messageBox(msg, messageType.critical, null, function (flag) {
                    bindHandler(div);
                    changeMode(div);
                    //var origin = $(headerId + 'txtID').jqxMaskedInput('value');
                    //$(headerId + 'txtID').jqxMaskedInput('clear');                        
                    //$(headerId + 'txtID').jqxMaskedInput('val', origin);
                    $(headerId + ctr).jqxMaskedInput('focus');
                }); */
                return  [false,msg];
            };
            switch (txt.length) {
                case 8: 
                    var result = invNoVerify(txt);
                    if (!result[0]) {
                        /*
                        messageBox(result[1], messageType.critical, null, function (flag) {
                            bindHandler(div);
                            changeMode(div);
                            //var origin = $(headerId + 'txtID').jqxMaskedInput('value');
                            //$(headerId + 'txtID').jqxMaskedInput('clear');                        
                            //$(headerId + 'txtID').jqxMaskedInput('val', origin);
                            //$(headerId + 'txtID').jqxMaskedInput('focus');
                            $(headerId + ctr).jqxMaskedInput('focus');                            
                        });   */                     
                        return result;
                    } else {                        
                        return [true];
                    }
                    break;
                
                case 10: 
                    var result = IDVerify(txt);
                    if (!result[0]) {
                        /*
                        messageBox(result[1], messageType.critical, null, function (flag) {
                            bindHandler(div);
                            changeMode(div);
                            //var origin = $(headerId + 'txtID').jqxMaskedInput('value');
                            //$(headerId + 'txtID').jqxMaskedInput('clear');                        
                            //$(headerId + 'txtID').jqxMaskedInput('val', origin);
                            // $(headerId + 'txtID').jqxMaskedInput('focus');
                            $(headerId + ctr).jqxMaskedInput('focus');
                        }); */
                        return result;
                    } else { return [true];};
                    break;
                
            };
                        
        } catch (err) {
            errorHandle(formName, 'txtAccOwnerIDChange', err);
            return false;
        } finally {

        };
    }
    function txtIDChange(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if (!chkAuthorities(event.data, 'SO1100G0')) { return; };
        if (event.args.text == '') { return; };
        try {
            if (event.args.text != '') {
                disableAllControl(event.data);
                unBindHandler(event.data);
                var rt = chkID(event.data, event.args.text);
                if (rt[0]) {
                    bindHandler(event.data);
                    changeMode(event.data);
                } else {
                    messageBox(rt[1], messageType.critical, null, function (flag) {
                        bindHandler(event.data);
                        changeMode(event.data);
                        //var origin = $(headerId + 'txtID').jqxMaskedInput('value');
                        //$(headerId + 'txtID').jqxMaskedInput('clear');                        
                        //$(headerId + 'txtID').jqxMaskedInput('val', origin);
                        //$(headerId + 'txtID').jqxMaskedInput('focus');
                        return;
                    });
                };
                /*
                if (chkID(event.data, 'txtID', event.args.text)) {
                  
                }; */

                return;
                if (event.args.text.length != 8 && event.args.text.length != 10) {
                    var msg = options.language.chkLength + '\r' +
                                 options.language.CompIdLen + '\r' +
                                 options.language.IdLen;

                    messageBox(msg, messageType.critical, null, function (flag) {
                        bindHandler(event.data);
                        changeMode(event.data);
                        //var origin = $(headerId + 'txtID').jqxMaskedInput('value');
                        //$(headerId + 'txtID').jqxMaskedInput('clear');                        
                        //$(headerId + 'txtID').jqxMaskedInput('val', origin);
                        //$(headerId + 'txtID').jqxMaskedInput('focus');
                        return;
                    });
                };
                switch (event.args.text.length) {
                    case 8:
                        var result = invNoVerify(event.args.text);
                        if (!result[0]) {
                            messageBox(result[1], messageType.critical, null, function (flag) {
                                bindHandler(event.data);
                                changeMode(event.data);
                                //var origin = $(headerId + 'txtID').jqxMaskedInput('value');
                                //$(headerId + 'txtID').jqxMaskedInput('clear');                        
                                //$(headerId + 'txtID').jqxMaskedInput('val', origin);
                                //$(headerId + 'txtID').jqxMaskedInput('focus');
                                return;
                            });
                        }
                        break;

                    case 10:
                        var result = IDVerify(event.args.text);
                        if (!result[0]) {
                            messageBox(result[1], messageType.critical, null, function (flag) {
                                bindHandler(event.data);
                                changeMode(event.data);
                                //var origin = $(headerId + 'txtID').jqxMaskedInput('value');
                                //$(headerId + 'txtID').jqxMaskedInput('clear');                        
                                //$(headerId + 'txtID').jqxMaskedInput('val', origin);
                                //$(headerId + 'txtID').jqxMaskedInput('focus');
                                return;
                            });
                        }
                        break;

                };
                bindHandler(event.data);
                changeMode(event.data);
            };
        } catch (err) {
            bindHandler(event.data);
            changeMode(event.data);
            errorHandle(formName, 'txtIDChange', err);
        } finally {


        };
    };
    function frmKeydown(e) {
        try {
            
            if (e.ctrlKey && e.which == 119) {
                messageBox(formName + JSON.stringify(e.data, null, '\t'), null, null, null, { width: 800, height: 500 });
            }
        }
        catch (err) {
            //errorHandle(formName, 'frmAddHandler_keydown', err, true);
        }
    };
    function initData(div, e, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(options.container).bind('keydown', options, frmKeydown);
        try {
            otherForm = [];
            unBindHandler(div);            
            changeLanguage(div);
            options.copyLoginInfo = getParaLoginInfo(div, formName);
            renderControl(div);
            //$(options.container).on('keydown', frmKeydown);
            

            if ($.isEmptyObject(options.parameters)) {
                messageBox(options.language.NoMasterData, messageType.critical);
                if ($.isFunction(action)) { action() };
                return;
            }
            if (options.parameters.account == undefined) {
                messageBox(options.language.NoMasterData, messageType.critical);
                if ($.isFunction(action)) { action() };
                return;
            };
            if (options.parameters.account.rows.length == 0) {
                messageBox(options.language.NoMasterData, messageType.critical);
                if ($.isFunction(action)) { action() };
                return;
            };
            /*
            if (options.editMode == editMode.append) {
                if (options.parameters.account.rows[0].CUSTID == undefined) {
                    messageBox(options.language.NoMasterData, messageType.critical);
                    if ($.isFunction(action)) { action() };
                    return;
                } else { options.custId = options.parameters.account.rows[0].CUSTID };
            } else {
                if (options.parameters.account.rows[0].MASTERID == undefined) {
                    messageBox(options.language.NoMasterData, messageType.critical);
                    if ($.isFunction(action)) { action() };
                    return;
                } else { options.masterId = options.parameters.account.rows[0].MASTERID };
            } */
            if (options.parameters.account.rows[0].SEQNO == undefined) {
                messageBox(options.language.SO137SEQNO, messageType.critical);
                if ($.isFunction(action)) { action() };
                return;
            };
            if (options.parameters.account.rows[0].SEQNO == null) {
                messageBox(options.language.SO137SEQNO, messageType.critical);
                if ($.isFunction(action)) { action() };
                return;
            };
            options.seqNo = options.parameters.account.rows[0].SEQNO;
            if (options.editMode == editMode.append) {
                /*
                if (options.parameters.account.rows[0].CUSTID == undefined) {
                    messageBox(options.language.NoMasterData, messageType.critical);
                    if ($.isFunction(action)) { action() };
                    return;
                } else { options.custId = options.parameters.account.rows[0].CUSTID }; */
            } else {
                if (options.parameters.account.rows[0].MASTERID == undefined) {
                    messageBox(options.language.NoMasterData, messageType.critical);
                    if ($.isFunction(action)) { action() };
                    return;
                } else { options.masterId = options.parameters.account.rows[0].MASTERID };
            }
            QueryAllData(div,
                function () {
                    if (!assignControlData(div)) { return; };
                    if (!clearAllControl(div)) { return; };
                    if (!disableAllControl(div)) { return; };
                    if (!rcdToScr(div)) { return; };
                    if (!changeFieldColor(div)) { return };
                    if ($(headerId + 'gilBankCode').csList('codeNo') != '') {
                        chkBankType(div, $(headerId + 'gilBankCode').csList('codeNo'),
                            function () { changeMode(div) });
                            
                    } else {
                        changeMode(div);
                    }
                    
                    
                    if ($.isFunction(action)) { action(); };
                    bindHandler(div);}
                );
            /*
            QueryAllData(div,
                function () {                    
                    assignControlData(div, 
                        function () {                            
                            clearAllControl(div,
                                function () {
                                    disableAllControl(div);
                                    rcdToScr(div,
                                        function () { changeMode(div) })
                                })
                        });                                                                      
                    }
                ); */
            /*
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
            } else {
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
            if ($.isFunction(action)) { action(); };
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
            $(headerId +'cboProposer').jqxInput({
                width: '95%',
                height: '20px',
                //placeHolder: "",
                disabled: true
            });
            controls.push({ name: $(div).prop('id') + 'cboProposer', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "txtID").jqxInput({
                width: 100,
                height: '20px',
                //promptChar:'',
                //mask: '[A-Z|0-9][0-9]########'
            });
            controls.push({ name: $(div).prop('id') + 'txtID', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + "txtProduct").jqxInput({
                width: '99.5%',
                height: '25px',
                disabled:true,
                //promptChar:'',
                //mask: '[A-Z|0-9][0-9]########'
            });
            controls.push({ name: $(div).prop('id') + 'txtProduct', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------

            $(headerId + "txtAccOwnerID").jqxMaskedInput({
                width: '120px',
                height: '20px',
                promptChar:'',
                mask: '[A-Z|0-9][0-9]########'
            });
            controls.push({ name: $(div).prop('id') + 'txtAccOwnerID', type: 'jqxMaskedInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "txtAccountNo").jqxMaskedInput({
                width: '98%',
                height: '20px',
                promptChar: '',
                mask: '####################'
            });
            controls.push({ name: $(div).prop('id') + 'txtAccountNo', type: 'jqxMaskedInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "txtCVC2").jqxMaskedInput({
                width: '25px',
                height: '20px',
                promptChar: '',
                mask: '###'
            });
            controls.push({ name: $(div).prop('id') + 'txtCVC2', type: 'jqxMaskedInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId+ "txtACHcustID").jqxMaskedInput({
                width: 155,
                height: 20,
                promptChar: '',
                mask: '###########'
            });
            controls.push({ name:$(div).prop('id') + 'txtACHcustID', type: 'jqxMaskedInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "chkFore").jqxCheckBox({
                width: '98%',
                height: 22,
                checked: false,
            });
            controls.push({ name: $(div).prop('id') + 'chkFore', type: 'jqxCheckBox', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "chkFore2").jqxCheckBox({
                width: '98%',
                height: 22,
                checked: false,
            });
            controls.push({ name: $(div).prop('id') + 'chkFore2', type: 'jqxCheckBox', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "chkStopFlag").jqxCheckBox({
                width: '98%',
                height: 22,
                checked: false,
            });
            controls.push({ name: $(div).prop('id') + 'chkStopFlag', type: 'jqxCheckBox', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "chkStopFlag").jqxCheckBox({
                width: '98%',
                height: 22,
                checked: false,
            });
            controls.push({ name: $(div).prop('id') + 'chkStopFlag', type: 'jqxCheckBox', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "chkDeAut").jqxCheckBox({
                width: '98%',
                height: 22,
                checked: false,
            });
            controls.push({ name: $(div).prop('id') + 'chkDeAut', type: 'jqxCheckBox', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "gilCMCode").csList({
                source: null,
                codeNoWidth: 50,
                width: '170px',
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
            controls.push({ name: $(div).prop('id') + 'gilCMCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "gilPTCode").csList({
                source: null,
                codeNoWidth: 40,
                width: '165px',
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
            controls.push({ name: $(div).prop('id') + 'gilPTCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "gilCardName").csList({
                source: null,
                codeNoWidth: 40,
                width: '165px',
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

            controls.push({ name: $(div).prop('id') + 'gilCardName', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "gilBankCode").csList({
                source: null,
                codeNoWidth: 40,
                width: '200px',
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
            controls.push({ name: $(div).prop('id') + 'gilBankCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "gilMediaCode").csList({
                source: null,
                codeNoWidth: 40,
                width: '165px',
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
            controls.push({ name:$(div).prop('id') + 'gilMediaCode', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "gilAcceptName").csList({
                source: null,
                codeNoWidth: 85,
                width: '270px',
                height: '22px',
                showColumnHeaders: false,
                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false,
                columns: [
                       { text: 'EMPNO', datafield: 'EMPNO' },
                       { text: 'EMPNAME', datafield: 'EMPNAME' }
                ]
            });
            controls.push({ name:$(div).prop('id') + 'gilAcceptName', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            
            $(headerId + "txtHide").jqxDateTimeInput({
                formatString: 'MM/yyyy',
                showCalendarButton: false,
                value: null,
                height: 22,
                width: 80
            }); 
            /*
            $(headerId + "txtHide").csDateTime({
                formatString: 'MM/yyyy',
                //showCalendarButton: false,
                value: null,
                height: 22,
                width: 80
            }); */
            controls.push({ name: $(div).prop('id') + 'txtHide', type: 'jqxDateTimeInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "txtAccountOwner").jqxInput({
                height: 22,
                width: 155,
            });
            controls.push({ name:$(div).prop('id') + 'txtAccountOwner', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "txtIntroId").jqxInput({
                width: 80,
                height: 20,
            });
            controls.push({ name: $(div).prop('id') + 'txtIntroId', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "lblIntroName").jqxInput({
                width: '95%',
                height: 20,
                disabled: true
            });
            controls.push({ name:$(div).prop('id') + 'lblIntroName', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "txtAchSN").jqxInput({
                width: 160,
                height: 20,
            });
            controls.push({ name:$(div).prop('id') + 'txtAchSN', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            /*
            $(headerId + "txtStatusMode").jqxInput({
                width: 50,
                height: 23,
                disabled: true,
            });
            controls.push({ name: 'txtStatusMode', type: 'jqxInput', level: 2 }); */
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnFind').jqxButton({
                width: 40,
                height: 25,
            });
            controls.push({ name: $(div).prop('id') + 'btnFind', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnSave').jqxButton($.extend({}, imagePosition, {
                width: 65,
                height: 25,
                imgSrc: imageScr.save.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnSave', type: 'jqxButton', level: 2 });
            $(headerId + 'btnSave > img').css('top', '2px');
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'btnProduct').jqxButton($.extend({},  {
                width: 70,
                height: 25,
//                imgSrc: imageScr.save.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnProduct', type: 'jqxButton', level: 2 });
            $(headerId + 'btnProduct > img').css('top', '2px');
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'btnDelProduct').jqxButton($.extend({}, imagePosition, {
                width: 30,
                height: 25,
                imgSrc: imageScr.delete.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnDelProduct', type: 'jqxButton', level: 2 });
            $(headerId + 'btnDelProduct > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnEdit').jqxButton($.extend({}, imagePosition, {
                width: 65,
                height: 25,
                imgSrc: imageScr.edit.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnEdit', type: 'jqxButton', level: 2 });
            $(headerId + 'btnEdit > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                width: 65,
                height: 25,
                imgSrc: imageScr.cancel.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnCancel', type: 'jqxButton', level: 2 });
            $(headerId + 'btnCancel > img').css('top', '2px');
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnACHDetail').jqxButton($.extend({}, imagePosition, {
                width: 255,
                height: 25,
            }));
            controls.push({ name:$(div).prop('id') + 'btnACHDetail', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'dtSendDate').csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                width: 115,
                height: 22
            });
            controls.push({ name:$(div).prop('id') + 'dtSendDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'dtContiDate').csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                width: 115,
                height: 22
            });
            controls.push({ name:$(div).prop('id') + 'dtContiDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'dtSnactionDate').csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                width: 110,
                height: 22
            });
            controls.push({ name:$(div).prop('id') + 'dtSnactionDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'edtAcceptTime').csDateTime({
                formatString: 'yyyy/MM/dd HH:mm:ss',
                value: null,
                width: 170,
                height: 22
            });
            controls.push({ name:$(div).prop('id') + 'edtAcceptTime', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'dtStopDate').csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                width: 110,
                height: 22
            });
            controls.push({ name: $(div).prop('id') + 'dtStopDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'dtAuthStopDate').csDateTime({
                formatString: 'yyyy/MM/dd',
                value: null,
                width: 150,
                height: 22
            });
            controls.push({ name: $(div).prop('id') + 'dtAuthStopDate', type: 'csDateTime', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            /*
            $(headerId + 'csmProduct').csMulti({
                //     source: data2,
                buttonText: lang.csmProduct,
                width: 590,
                buttonWidth: 80,
                //widthDesc: 150, 
                winWidth: 800,
                winHeight: 500,
                isReadOnly: false,                
                columns: [                   
                    { text: lang.csmServiceIdStr, datafield: 'SERVICEID', width: 70 },
                    { text: lang.csmPrdStr, datafield: 'PRODUCTNAME', width: 120 },
                    { text: lang.csmCustIdStr, datafield: 'CUSTID', width: 80 },                    
                    { text: lang.csmInstallAddressStr, datafield: 'INSTADDRESS', width: 250 },
                    { text: lang.csmFaciStr, datafield: 'FACISNO', width: 110 },
                    { text: lang.csmHomeIdStr, datafield: 'HOMEID', width: 80 }
                ]
            }); */
            //controls.push({ name: 'csmProduct', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'csmCharge').csMulti({
                //     source: data2,
                buttonText: lang.csmCharge,
                width: 297,
                //width: 200,
                buttonWidth: 80,
                winWidth:800,
                winHeight:500,
                //widthDesc: 150,                                
                isReadOnly: false,
                columns: [
                     { text: 'PKBILLNO', datafield: 'PKBILLNO', width: 100, hidden: true },
                    { text: 'DESCRIPTION', datafield: 'DESCRIPTION', width: 100, hidden: true },
                    { text: lang.csmCodeStr, datafield: 'CITEMCODE', width: 70 },
                    { text: lang.csmCitemStr, datafield: 'CITEMNAME', width: 180 },
                    { text: lang.csmBillNoStr, datafield: 'BILLNO', width: 150 },
                    { text: lang.csmItemStr, datafield: 'ITEM', width: 60 },
                    { text: lang.csmPeriodStr, datafield: 'REALPERIOD', width: 60 },
                    { text: lang.csmAmtStr, datafield: 'SHOULDAMT', width: 100 },
                    { text: lang.csmCMCodeStr, datafield: 'CMNAME', width: 100 },
                    { text: lang.csmAccStr, datafield: 'ACCOUNTNO', width: 140 },
                    { text: lang.csmStarDateStr, datafield: 'REALSTARTDATE', width: 100 },
                    { text: lang.csmStopDateStr, datafield: 'REALSTOPDATE', width: 100 }
                   
                ]
            });
            controls.push({ name: $(div).prop('id') + 'csmCharge', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'csmACH').csMulti({
                //     source: data2,
                buttonText: 'ACH授權交易別',
                width: 255,
                buttonWidth: 110,
                //widthDesc: 150,                                
                isReadOnly: false,
            });
            controls.push({ name: $(div).prop('id') + 'csmACH', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'txtMemo').jqxTextArea({
                width: '99%',
                height: 40
                //disabled: !aCanUse
            });
            controls.push({ name: $(div).prop('id') + 'txtMemo', type: 'jqxTextArea', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + "pnl").jqxPanel({
                //height: '95%',
                //width: '65%',
                height: 150,
                width: 260,
                autoUpdate: true
            });
            controls.push({ name: $(div).prop('id') + 'pnl', type: 'jqxPanel', level: 1 });
            //-----------------------------------------------------------------------------
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        };
    };
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var idArray = $('*[id^=' + $(div).prop('id') + ']');
      
        try {
            idArray.each(function (index, value) {
                var idStr = $(value).attr('id');
                if (idStr.indexOf('csmProduct') >= 0) { return };
                if (idStr.indexOf('csmCharge') >= 0) { return };
                if (idStr.indexOf('csmACH') >= 0) { return };
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