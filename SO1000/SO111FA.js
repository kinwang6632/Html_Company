(function ($) {
    var formName = "SO111FA";
    var riadllName = "CableSoft.SO.RIA.Customer.IntroMedia.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Customer.IntroMedia.Web.IntroMedia";
    var defaults = (function () {
        this.language = {};                
        this.loginInfo = {};
        this.editMode = 0;        
        this.parameters = {};
        this.controls = [];
        this.introData = {};
        this.dsIntro = {};
        this.mediaRefNo = -1;        
        this.containerIsWindow = false;
        this.localization = null;
    })
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
    $.fn.SO111FA = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new SO111FA(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO111FA_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO111FA', err);
        }
    };
    function formClosed(div) {
        /*
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close'); */
    };
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    function formDestroy(div) {
        try {
            var controls = $.data(div, formName).options.controls;
            unBindHandler(div);
            destroyControls(controls);
            deleteJSONObject(options);
            $.data(div, formName).options.language = null;
            delete $.data(div, formName).options.language;
            $.data(div, formName).options.dsIntro = null;
            delete $.data(div, formName).options.dsIntro;
            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults;
            
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
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

    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            loadForm(options,
                'SO1000\\' + formName + '.html',
                function (msg) {
                    try {
                        $(div).html(msg);
                        changeElementId(div);
                        $(options.container).on('keydown', function (e) {
                            try {
                                if (e.ctrlKey && e.which == 119) {
                                    messageBox(formName + JSON.stringify(options, null, '\t'), null, null, null, { width: 800, height: 500 });
                                }
                            }
                            catch (err) {
                                //errorHandle(formName, 'frmAddHandler_keydown', err, true);
                            }
                        });
                        initData(div, options.editMode, function () {
                            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                options.containerIsWindow = true;
                                var csw = $.data(div, formName).options.container;
                                csw.on("winClosing", function () {
                                    csw.csWindow('close');
                                });
                            };
                            $(div).triggerHandler('loaded', [this, options]);
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
                        $(options.container).on('keydown', function (e) {
                            try {
                                if (e.ctrlKey && e.which == 119) {
                                    messageBox(formName +  JSON.stringify(options, null, '\t'), null, null, null, { width: 800, height: 500 });
                                }
                            }
                            catch (err) {
                                //errorHandle(formName, 'frmAddHandler_keydown', err, true);
                            }
                        });
                        initData(div, options.editMode, function () {                            
                            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                options.containerIsWindow = true;
                                var csw = $.data(div, formName).options.container;
                                csw.on("winClosing", function () {
                                    csw.csWindow('close');
                                });
                            };
                            $(div).triggerHandler('loaded', [this, options]);
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
    function disableAllControl(div, e) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            $(headerId + 'txtName').jqxInput({ disabled: true });
            $(headerId + 'txtNo').jqxInput({ disabled: true });
            $(headerId + 'btnFind').jqxButton({ disabled: true });
            $(headerId + 'grdIntro').jqxGrid({ disabled: true });
            $(headerId + 'btnOK').jqxButton({ disabled: true });
            $(headerId + 'btnCancel').jqxButton({ disabled: true });
        } catch (err) {
            errorHandle(formName, 'disableAllControl', err);
        } finally {

        };
    };
    function unBindHandler(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnFind').off('click');
        $(headerId + 'grdIntro').off('rowdoubleclick');
        $(headerId + 'btnCancel').off('click');
        $(headerId + 'btnOK').off('click');
    };
    function bindHandler(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnFind').off('click');
        $(headerId + 'btnFind').bind('click', div, btnFindClick);
        $(headerId + 'grdIntro').off('rowdoubleclick');
        $(headerId + 'grdIntro').bind('rowdoubleclick', div, grdIntrodoubleclick);
        $(headerId + 'btnOK').off('click');
        $(headerId + 'btnOK').bind('click', div, btnOKClick);
        $(headerId + 'btnCancel').off('click');
        $(headerId + 'btnCancel').on('click',function () {
            createIntroData(div);
            $(options.container).triggerHandler('close');
        });
    };
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return; }
        try {
            var rowIndex = $(headerId + 'grdIntro').jqxGrid('selectedrowindex');
            createIntroData(event.data);
            assignData(event.data, rowIndex);
            
        } catch (err) {
            errorHandle(formName, 'btnOKClick', err);
        } finally {

        };
    }
    function grdIntrodoubleclick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        try {
            disableAllControl(event.data);
            unBindHandler(event.data);
            assignData(event.data, event.args.rowindex);
            
        } catch (err) {
            errorHandle(formName, 'grdIntroSelected', err);
        } finally {

        };
    };
    function assignData(div, rowIndex) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            createIntroData(div);
            $.each(options.dsIntro.columns, function (index, value) {
                options.introData.columns.push(options.dsIntro.columns[index]);
            });
            options.introData.rows.push(options.dsIntro.rows[rowIndex]);
            $(options.container).triggerHandler('close');
        } catch (err) {
            errorHandle(formName, 'assignData', err);
        } finally {

        }
    };
    function createIntroData(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        options.introData = null;
        delete options.introData;
        options.introData = {};
        options.introData = {         
                columns: [],             
                rows: []            
        };
       // return dsData;
    };
    function btnFindClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return };
        try {            
            unBindHandler(event.data);
            // isDataOK
            if ($(headerId + 'txtName').jqxInput('val') == '' && $(headerId + 'txtNo').jqxInput('val') == '') {
                var msg = options.language.MustValue;
                msg = msg.replace('{0}', $(headerId + 'lblName').text());
                msg = msg.replace('{1}', $(headerId + 'lblNo').text());
                messageBox(msg, messageType.critical);
                bindHandler(event.data);
                $(headerId + 'txtName').jqxInput('focus');
                return;
            };
            //Query Data
            queryData(event.data,
                function () {
                    refreshGrid(event.data,
                        function () {
                            changeMode(event.data);
                            bindHandler(event.data);
                        })
                });
        } catch (err) {
            errorHandle(formName, 'btnFindClick', err);
        } finally {

        };
        
    };
    function refreshGrid(div, e) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var data1 = options.dsIntro;
            options.grdIntro.localdata = data1;            
            $(headerId + 'grdIntro').on('bindingcomplete', function (event) {
                $(headerId + 'grdIntro').jqxGrid('refresh');
                $(headerId + 'grdIntro').jqxGrid('scrolloffset', 0, 0);
                $(headerId + 'grdIntro').jqxGrid({ selectedrowindex: 0 });
                $(headerId + 'grdIntro').off('bindingcomplete');
                if ($(headerId + 'grdIntro').jqxGrid('getrows').length == 0) {
                    messageBox(options.language.NoData, messageType.critical, null, function () {
                        $(headerId + 'txtName').jqxInput('focus');
                    });
                };
                if ($.isFunction(e)) { e(); };
            });
            $(headerId + 'grdIntro').jqxGrid('updatebounddata');
        } catch (err) {
            errorHandle(formName, 'refreshGrid', err);
            changeMode(div);
        } finally {

        };
    }
    function queryData(div, e) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');        
        disableAllControl(div);
        try {
            
            var parameters = $.extend({},  getParaLoginInfo(div, formName), {
                MediaRefNo: { type: 'integer', value: options.mediaRefNo },
                Search1: { type: 'string', value: $(headerId +'txtName').jqxInput('val') },
                Search2: { type: 'string', value: $(headerId + 'txtNo').jqxInput('val') }
            });
            var params = getParameters(riadllName,
              riaClassName,
              'GetIntroData',
              JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            
                            var tmp = JSON.parse(data.ResultXML);
                            delete options.dsIntro;
                            options.dsIntro = {};
                            $.extend(options.dsIntro, tmp.Table);                           
                            delete tmp;
                            tmp = null;
                            if ($.isFunction(e)) { e() };
                        }
                        else {
                            
                            messageBox(data.ErrorMessage, messageType.critical, null, function () {
                                changeMode(div);
                            });
                            
                        };
                    } catch (err) {
                        errorHandle(formName, 'GetIntroData-Server', err);
                        changeMode(div);
                    } finally {
                        delete parameters;
                        delete param;
                        delete data;
                        parameters = null;
                        param = null;
                        data = null;
                    };
                }
            });
        } catch (err) {            
            errorHandle(formName, 'queryData', err);
            changeMode(div);
        } finally {
           
        };
    };
    function changeMode(div, e) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            unBindHandler(div);
            $(headerId + 'txtName').jqxInput({ disabled: false });
            $(headerId + 'txtNo').jqxInput({ disabled: false });
            $(headerId + 'btnFind').jqxButton({ disabled: false });
            $(headerId + 'grdIntro').jqxGrid({ disabled: false });
            $(headerId + 'btnCancel').jqxButton({ disabled: false });
            if ($(headerId + 'grdIntro').jqxGrid('getrows').length > 0) {
                $(headerId + 'btnOK').jqxButton({ disabled: false });
            } else {
                $(headerId + 'btnOK').jqxButton({ disabled: true });
            };
            $(headerId + 'txtName').jqxInput('focus');
        } catch (err) {
            errorHandle(formName, 'changeMode', err);
        } finally {
            bindHandler(div);
        };
    };
    function initData(div, e, action) {
        var options = $.data(div, formName).options;
        try {

            unBindHandler(div);
            //disableAllControl(div);
            changeLanguage(div);            
            renderControl(div);
            chkMustField(div);
            defaultValue(div);
            changeMode(div);         

        } catch (err) {
            errorHandle(formName, 'initData', err);
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
            $(headerId + 'txtName').jqxInput({
                height: 25,
                width: '97%'
            });
            controls.push({ name: $(div).prop('id') + 'txtName', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId +'txtNo').jqxInput({
                height: 25,
                width: '97%'
            });
            controls.push({ name: $(div).prop('id') + 'txtNo', type: 'jqxInput', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'btnFind').jqxButton($.extend({}, imagePosition,{
                width: '95%',
                height: 40,
                imgSrc: imageScr.query.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnFind', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 70,
                height: 30,
                imgSrc: imageScr.ok.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnOK', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnCancel').jqxButton($.extend({}, imagePosition, {
                width: 70,
                height: 30,
                imgSrc: imageScr.cancel.imgSrc
            }));
            controls.push({ name: $(div).prop('id') + 'btnCancel', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            options.grdIntro = {
                datatype: "json"
            };
            var dataAdapter1 = new $.jqx.dataAdapter(options.grdIntro);
            $(headerId + "grdIntro").jqxGrid({
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
                        datafield: '', columntype: 'number', width: 60,
                        cellsrenderer: function (row, column, value) {
                            return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                        }
                    },
                    { text: lang.CodeStr, datafield: 'CODENO', width: 130, cellsalign: 'center', align: 'center' },
                    { text: lang.CustName, datafield: 'DESCRIPTION', width: 250, cellsalign: 'left', align: 'left' }
                ],
                localization: options.localization
            });
            $(headerId + "grdIntro").jqxGrid('localizestrings', options.localization);
            controls.push({ name: $(div).prop('id') + 'grdIntro', type: 'jqxGrid', level: 2 });
            //-----------------------------------------------------------------------------

           
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        };
    };
    function chkMustField(div,e) {
        var options = $.data(div, formName).options;
        try {
            if (options.mediaRefNo > -1) {
                if ($.isFunction(e)) { e(); };
                return true;                
            };
            if ($.isEmptyObject(options.parameters) || options.parameters['intro'] == undefined) {
                messageBox(options.language.NoInputData, messageType.critical);
                return false;
            };
            if (options.parameters['intro'].rows.length == 0) {
                messageBox(options.language.NoRefNo, messageType.critical);
                return false;
            };
            if (options.parameters['intro'].rows[0].refNo == null) {
                messageBox(options.language.NoRefNo, messageType.critical);
                return false;
            };
            options.mediaRefNo = options.parameters['intro'].rows[0].refNo;
            return true;
        } catch (err) {
            errorHandle(formName, 'chkMustField', err);
        } finally {

        };
    };
    function defaultValue(div, e) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            switch (options.mediaRefNo) {
                case 1:
                    {
                        $(headerId + 'lblName').text(options.language.CustName);
                        $(headerId + 'lblNo').text(options.language.CustTel);
                        $(options.container).csWindow({ title: options.language.CustIntro });
                        options.keyWord = 'custName';
                        break;
                    };
                case 2:
                    {
                        $(headerId + 'lblName').text(options.language.EmpName);
                        $(headerId + 'lblNo').text(options.language.EmpCode);
                        $(options.container).csWindow({ title: options.language.EmpIntro });
                        options.keyWord = 'empName';
                        break;
                    };
                case 3:
                    {
                        $(headerId + 'lblName').text(options.language.IntroName);
                        $(headerId + 'lblNo').text(options.language.IntroTel);
                        $(options.container).csWindow({ title: options.language.Intro });
                        options.keyWord = 'nameP';
                        break;
                    };
                default: {
                    $(headerId + 'lblName').text(options.language.CustName);
                    $(headerId + 'lblNo').text(options.language.CustTel);
                    $(options.container).csWindow({ title: options.language.CustIntro });
                    options.keyWord = 'custName';
                    break;
                }
            };
            $(headerId + "grdIntro").jqxGrid('setcolumnproperty', 'CODENO', 'text', options.language.CodeStr);
            $(headerId + "grdIntro").jqxGrid('setcolumnproperty', 'DESCRIPTION', 'text', $(headerId + 'lblName').text());
            createIntroData(div);
        } catch (err) {
            errorHandle(formName, 'defaultValue', err);
        } finally {

        };
    };
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;        
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