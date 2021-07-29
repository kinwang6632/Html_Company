(function ($) {
    var formName = "SO111XD";
    var riadllName = "CableSoft.SO.RIA.Facility.ChangeFaci.Web.dll"
    var riaClassName = "CableSoft.SO.RIA.Facility.ChangeFaci.Web.ChangeFaci";
    var riaChooseFacidllName = 'CableSoft.SO.RIA.Facility.ChooseFaci.Web.dll';
    var riaChooseFaciClassName = 'CableSoft.SO.RIA.Facility.ChooseFaci.Web.ChooseFaci';
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
        this.isSaved = true;
        this.wipType = 0;
        this.wipData = {};
        this.wipDataCopy = {};
        this.isWip = false;
        this.custId = 0;
        this.sno = '';
        this.showUi = true;
        this.faciSeqno = '';
        this.serviceType = 'X';
        this.wipRefNo = 0;
        this.canCancel = false;
        this.canDo = false;
        this.privCancelGetFaci = false;
        this.reInstAcrossFlag = false;
        this.containerIsWindow = false;
        this.commonData = {};
        this.tabSelectedItem = 0;
        this.theme = '';        
        this.triggerChange = false;
        this.localization = null;
        this.isAutoAddMatain = false;
        this.autoFaciSeqNo = '';
        this.createKind = false;
        this.createKind2 = false;
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
            /*
            return jq.each(function () {
                formClosed(this);
            }); */
        },
        
        destroy: function (jq) {            
            return jq.each(function () {
                formDestroy(this);
            }); 
        },
        refreshData:function(jq,params) {
            
            var optionsCopy =  $(jq)[formName]('options');
            try {                          
               
                if (params == 'clearGrid') {                    
                    $('#' + $(jq).attr('id') + 'grdNormal').jqxGrid('clear');
                    $('#' + $(jq).attr('id') + 'grdChange').jqxGrid('clear');
                    $('#' + $(jq).attr('id') + 'grdChange').jqxGrid('clear');
                } else {
                    unBindHandler(jq);
                    
                    $.each(params, function (key, obj) {
                        $.each(optionsCopy.wipData, function (key2, obj2) {
                            if (key.toUpperCase() == key2.toUpperCase()) {
                                delete optionsCopy.wipData[key2];
                                optionsCopy.wipData[key2] = params[key];
                                return;
                            };
                        });
                    });
                    if (params.serviceType != undefined) { optionsCopy.serviceType = params.serviceType };
                    if (params.sno != undefined) { optionsCopy.sno = params.sno };
                    optionsCopy.triggerChange = params.triggerChange;
                    optionsCopy.isAutoAddMatain = params.isAutoAddMatain;
                    optionsCopy.autoFaciSeqNo = params.autoFaciSeqNo;                    
                    $.data(jq, formName, { options: optionsCopy }); 
                    disableAllcontrol(jq);
                    chkMustField(jq, function () {
                        getAllChangeData(jq);
                    });
                };
               
            } catch (err) {
                errorHandle(formName, 'refreshData', err);
            }; 
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
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    $.fn.SO111XD = function (options, param, param2) {
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
                            options: $.extend({}, new defaults(), new SO111XD(), options)
                        });
                        formLoaded(this);
                    }                    
                  
                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO111XD_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO111XD', err);
        }
    };
    function formDestroy(div) {
        var options = $.data(div, formName).options;
        unBindHandler(div);
        try {
            var controls = $.data(div, formName).options.controls;
            //for (j = 3; j >= 0; j--) {
            //    for (i = 0; i < controls.length; i++) {
            //        if (controls[i].level == j) {
            //            var o = $('#' + controls[i].name);
            //            if (o.length > 0) {
                            
            //                $(o[0]).off();
                            
            //                $(o[0])[controls[i].type]('destroy');
            //            }
            //        }
                    
            //    };
            //    $.data(div, formName).options.language = null;
            //    delete $.data(div, formName).options.language;
            //    $.data(div, formName).options.wipDataCopy = null;
            //    delete $.data(div, formName).options.wipDataCopy;
            //};
            $(div).removeClass();
            destroyControls(controls);
            deleteJSONObject(options);
            
            $(div).children().remove();            
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
                            
                            //if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                            //    options.containerIsWindow = true;
                            //    var csw = $.data(div, formName).options.container;
                            //    csw.on("winClosing", function () {
                            //        csw.csWindow('close');
                            //    });
                            //}; 

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
          
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function chkMustField(div,act) {
        var options =  $.data(div, formName).options;
        try {
            options.wipDataCopy = null;
            delete options.wipDataCopy;
            options.wipDataCopy = {};
            if (options.isWip == false) {
                if ($.isEmptyObject(options.parameters)) {
                    messageBox(options.language.noAnyData, messageType.critical);
                    changeMode(div);
                    return false;
                };
                options.wipDataCopy = $.extend(true, {}, options.parameters);
            } else {
                options.wipDataCopy = $.extend(true, {}, options.wipData);
            };
            $.each(options.wipDataCopy, function (key, obj) {
                switch (key.toUpperCase()) {
                    case "WIP":
                        {
                            if (key != 'Wip') {
                                options.wipDataCopy.Wip = options.wipDataCopy[key];
                                delete options.wipDataCopy[key];
                            };
                            break;
                        };
                    case "CHANGEFACILITY":
                        {
                            if (key != 'ChangeFacility') {
                                options.wipDataCopy.ChangeFacility = options.wipDataCopy[key];
                                delete options.wipDataCopy[key];
                            };
                            break;
                        };
                    case "FACILITY":
                        {
                            if (key != 'Facility') {
                                options.wipDataCopy.Facility = options.wipDataCopy[key];
                                delete options.wipDataCopy[key];
                            };
                            break;
                        };
                    case "PRFACILITY":
                        {
                            if (key != 'PrFacility') {
                                options.wipDataCopy.PrFacility = options.wipDataCopy[key];
                                delete options.wipDataCopy[key];
                            };
                            break;
                        };
                };
            });


            if (options.wipDataCopy.Wip == undefined && options.wipDataCopy.wip == undefined) {
                messageBox(options.language.noWip, messageType.critical);
                changeMode(div);
                return false;
            } else {
                if (options.wipDataCopy.wip != undefined) {
                    options.wipDataCopy.Wip = options.wipDataCopy.wip;
                    delete options.wipDataCopy.wip;
                };
            };
            if (options.wipDataCopy.ChangeFacility == undefined) {
                messageBox(options.language.noChangeFacility, messageType.critical);
                return false;
            };
            if (options.wipDataCopy.Facility == undefined) {
                messageBox(options.language.noFacilityData, messageType.critical);
                return false;
            };
            if (options.wipDataCopy.PrFacility == undefined) {
                messageBox(options.language.noPRFacility, messageType.critical);
                return false;
            };
            if (options.serviceType == 'X' && options.wipDataCopy.Wip.rows.length > 0) {
                options.serviceType = options.wipDataCopy.Wip.rows[0]['SERVICETYPE'];
            };

            if (options.custId == 0 && options.wipDataCopy.Wip.rows.length > 0) {
                options.custId = options.wipDataCopy.Wip.rows[0]['CUSTID'];
            };            
            if (options.sno != '') {
                if (options.sno == '' && options.wipDataCopy.Wip.rows.length > 0) {
                    options.sno = options.wipDataCopy.Wip.rows[0]['SNO'];
                };
            };            
            if ($.isFunction(act)) {
                act();
            }            
        } catch (err) {
            errorHandle(formName, 'ChkMustField', err);
            changeMode(div);
        };
    };
    function DefaultFacilityTmpSchema(div) {
        try {

        } catch (err) {
            errorHandle(formName, 'DefaultFacilityTmpSchema', err);
        };
    };
    function initData(div, e, action) {
        var options = $.data(div, formName).options;
        try {
            unBindHandler(div);
            changeLanguage(div);
            renderControl(div);
            disableAllcontrol(div);
            chkMustField(div, function () {
                getAllChangeData(div);
                action();
            });
            
            
            
        } catch (err) {
            errorHandle(formName, 'init', err);
        };           
    };
    function getCanChangeFaci(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var loginInfo = getParaLoginInfo(div, formName);
        var ds = { Wip: {}};
        try {
            /*
            var parameters = $.extend(true, {}, options.loginInfo, {
                CustId: {
                    type: 'integer', value: options.custId
                },
                ServiceType: { type: 'string', value: options.serviceType },
                IncludePR: { type: 'boolean', value: false },
                IncludeDVR: { type: 'boolean', value: false },
                IncludeFilter: { type: 'boolean', value: false }
            }); */
            $.extend(true,ds.Wip,options.wipData.Wip)
            var parameters = $.extend(true, {}, loginInfo, {
                CustId: {
                    type: 'integer', value: options.custId
                },
                ServiceType: { type: 'string', value: options.serviceType },
                IncludePR: { type: 'boolean', value: false },
                IncludeDVR: { type: 'boolean', value: false },
                IncludeFilter: { type: 'boolean', value: false },
                WipType: { type: 'Integer', value: options.wipType },
                wipData :{type:'string',value:ds}
            });
            ds = null;
            delete ds;
            var params = getParameters(riadllName,
                riaClassName,
                'GetCanChangeFaci',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            delete options.wipDataCopy.canChagneFaci;
                            options.wipDataCopy.canChagneFaci = {};
                            var tmp = JSON.parse(data.ResultXML);
                            $.extend(true, options.wipDataCopy.canChagneFaci, tmp.Table);
                            delete tmp;
                            tmp = null;
                            getFacilityStatus(div);
                            //getCanChangeFaci(div);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);

                        };
                    } catch (err) {
                        errorHandle(formName, 'getCanChangeFaci-Server', err);

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
            errorHandle(formName, 'getCanChangeFaci', err);
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function getFacilityStatus(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var loginInfo = getParaLoginInfo(div, formName);
        try {
            var dsWipData = { ChooseFacility: {} };
            $.extend(true, dsWipData.ChooseFacility, options.wipDataCopy.canChagneFaci);
            /*
            var parameters = $.extend(true, {}, options.loginInfo, {
                ServiceType: { type: 'string', value: null },
                dsWipData: { type: 'string', value: dsWipData },
                IncludePR: { type: 'boolean', value: false },
                IncludeDVR: { type: 'boolean', value: false },
                IncludeFilter: { type: 'boolean', value: false }
            }); */
            var parameters = $.extend(true, {}, loginInfo, {
                ServiceType: { type: 'string', value: null },
                dsWipData: { type: 'string', value: dsWipData },
                IncludePR: { type: 'boolean', value: false },
                IncludeDVR: { type: 'boolean', value: false },
                IncludeFilter: { type: 'boolean', value: false }
            });
            var params = getParameters(riaChooseFacidllName,
               riaChooseFaciClassName,
               'QueryChooseFaci',
               JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            options.wipDataCopy.facilityTemp = null;
                            delete options.wipDataCopy.facilityTemp;
                            options.wipDataCopy.facilityTemp = {};
                            delete options.wipDataCopy.canChagneFaci;
                            options.wipDataCopy.canChagneFaci = {};
                            var tmp = JSON.parse(data.ResultXML);
                            $.extend(true, options.wipDataCopy.facilityTemp, tmp.ChooseFacility);
                            $.extend(true, options.wipDataCopy.canChagneFaci, tmp.ChooseFacility);                         
                            tmp = null;
                            delete tmp;
                            if ($(headerId + 'grdNormal').jqxGrid('getselectedrowindex') == -1) {
                                $(headerId + 'grdNormal').jqxGrid({ selectedrowindex: 0 });
                            };
                            refreshGrid(div, function () { getCanChangeKind(div) });
                           // refreshGrid(div, function () { });
                            
                            //initialGrid(div);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);

                        };
                    } catch (err) {
                        errorHandle(formName, 'getCanChangeFaci-Server', err);

                    } finally {
                        parameters = null;
                        param = null;
                        data = null;
                        delete parameters;
                        delete param;
                        delete data;
                       
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'getFacilityStatus', err);

        } finally {
            dsWipData.ChooseFacility = null;
            delete dsWipData.ChooseFacility;
            dsWipData = null;
            delete dsWipData;
            loginInfo = null;
            delete loginInfo;
        };
    };
   
    function getAllChangeData(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');      
        var dsChangeFacility = { ds: {} };
        var loginInfo = getParaLoginInfo(div, formName);
        $.extend(true, dsChangeFacility.ds, options.wipDataCopy.ChangeFacility);
        try {
            /*
            var parameters = $.extend(true, {}, options.loginInfo, {
                dsChangeFacility: { type: 'string', value: dsChangeFacility }
            }); */
            var parameters = $.extend(true, {}, loginInfo, {
                dsChangeFacility: { type: 'string', value: dsChangeFacility }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetAllChangeData',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            delete options.wipDataCopy.facilityTemp;
                            options.wipDataCopy.facilityTemp = {};
                            var tmp = JSON.parse(data.ResultXML);                           
                            $.extend(true, options.wipDataCopy.facilityTemp, tmp.Facility);
                            delete tmp;
                            tmp = null;
                            getCanChangeFaci(div);
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetAllChangeData-Server', err);

                    } finally {
                        delete parameters;
                        delete param;
                        delete dsChangeFacility;
                        delete data;
                        parameters = null;
                        param = null;
                        dsChangeFacility = null;
                        data = null;
                    };
                }
            });

        } catch (err) {
            errorHandle(formName, 'init', err);
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    }
   /*
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var idArray = $('*[id^=' + $(div).prop('id') + ']')
        try {
            idArray.each(function (index, value) {
                var idStr = $(value).attr('id');
                if (idStr.replace($(div).prop('id'), "") != "") {
                    if (lang[idStr.replace($(div).prop('id'), "")] != null) {
                        $('#' + idStr).text(lang[idStr.replace($(div).prop('id'), "")]);
                    }
                }
            });
            while (idArray.length > 0) {
                idArray.pop();
            };
            idArray.length = 0;            
            idArray = null;
        }
        catch (err) {
            errorHandle(formName, 'changeLanguage', err);
        }
    }; */
    function renderControl(div) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var lang = options.language;
            var height = $(div).innerHeight();
            var headerId = $(div).prop('id');
           /*---------------------------------------------------------------------*/
            $('#' + headerId +'jqxTabs').csTabs({
                width: '99.7%',
                height: '99%'
            });
            controls.push({ name: $(div).prop('id') + 'jqxTabs', type: 'csTabs', level: 0 });
            /*---------------------------------------------------------------------*/
            
            $('#' + headerId +'cboType').jqxDropDownList({
                width: 100,
                placeHolder: ""
            });
            controls.push({ name: $(div).prop('id')  + 'cboType', type: 'jqxDropDownList', level: 2 }); 
            /*
            $('#' + headerId + 'cboType').csList({
                source: null,
                codeNoWidth: 50,
                width: 180,
                height: '25px',
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
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
            controls.push({ name: 'cboType', type: 'csList', level: 2 }); */
            /*---------------------------------------------------------------------*/
            $('#' + headerId+ 'btnChangeFaci').jqxButton({
                width: 65
            });
            controls.push({ name: $(div).prop('id') + 'btnChangeFaci', type: 'jqxButton', level: 2 });
            /*---------------------------------------------------------------------*/
            $('#' + headerId +'btnCPEMAC').jqxButton({
                width: 65
            });
            controls.push({ name:$(div).prop('id') + 'btnCPEMAC', type: 'jqxButton', level: 2 });
            /*---------------------------------------------------------------------*/
            $('#' + headerId +'btnCancelChange').jqxButton({
                width: 120
            });
            controls.push({ name:$(div).prop('id') + 'btnCancelChange', type: 'jqxButton', level: 2 });
           
          

            renderGrid(div);

            controls.push({ name: $(div).prop('id') + 'grdNormal', type: 'jqxGrid', level: 2 });
            controls.push({ name: $(div).prop('id') + 'grdChange', type: 'jqxGrid', level: 2 });
            controls.push({ name:$(div).prop('id') + 'grdDelete003', type: 'jqxGrid', level: 2 });


        }
        catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function addgilKind(div,kind) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        //var lang = options.language;
        //var height = $(div).innerHeight();
        var headerId = $(div).prop('id');
        if (kind == 1) {
            if (!options.createKind) {
                /*---------------------------------------------------------------------*/
                $('#' + headerId + 'gilKind').csList({
                    source: null,
                    codeNoWidth: 60,
                    width: '100%',
                    height: 25,
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
                controls.push({ name: $(div).prop('id') + 'gilKind', type: 'csList', level: 2 });
                /*---------------------------------------------------------------------*/
            };
            options.createKind = true;
        } else {
            if (!options.createKind2) {
                /*---------------------------------------------------------------------*/
                $('#' + headerId + 'gilKind2').csList({
                    source: null,
                    codeNoWidth: 50,
                    width: 200,
                    height: 25,
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
                controls.push({ name: $(div).prop('id') + 'gilKind2', type: 'csList', level: 2 });
                /*---------------------------------------------------------------------*/
            };
            options.createKind2 = true;
        };
    };
    function renderGrid(div) {
        try {
            var options = $.data(div, formName).options;
            var lang = options.language;
            var headId = $(div).attr('id');
            options.grdNormal = {
                datatype: "json",
                datafields: [
                   { name: 'FACISTATUS', type: 'string' },
                   { name: 'FACIWIPSTATUS', type: 'string' },
                   { name: 'FACICOMMANDSTATUS', type: 'string' },
                   { name: 'FACINAME', type: 'string' },
                   { name: 'FACISNO', type: 'string' },
                   { name: 'SMARTCARDNO', type: 'string' },
                   { name: 'DECLARANTNAME', type: 'string' },
                   { name: 'BUYNAME', type: 'string' },
                   { name: 'INSTDATE', type: 'date' },
                   { name: 'CMBAUDNO', type: 'integer' },
                   { name: 'CMBAUDRATE', type: 'string' },
                   { name: 'FIXIPCOUNT', type: 'integer' },
                   { name: 'DYNIPCOUNT', type: 'integer' },
                   { name: 'INSTNAME1', type: 'string' },
                   { name: 'SEQNO', type: 'string' },
                   { name: 'DVRAUTHSIZECODE', type: 'integer' }
                ]
            };
            options.grdChange = {
                datatype: "json",
                datafields: [
                  { name: 'KIND',type: 'string' },
                    { name: 'FACICODE', type: 'string' },
                    { name: 'FACINAME', type: 'string' },
                    { name: 'FACISNO', type: 'string' },
                    { name: 'OCMBAUDRATE', type: 'string' },
                    { name: 'NCMBAUDRATE', type: 'string' },
                    { name: 'ODYNIPCOUNT', type: 'string' },
                    { name: 'NDYNIPCOUNT', type: 'string' },
                    { name: 'OFIXIPCOUNT', type: 'string' },
                    { name: 'NFIXIPCOUNT', type: 'string' },
                    { name: 'ODVRAUTHSIZECODE', type: 'string' },
                    { name: 'NDVRAUTHSIZECODE', type: 'string' },
                    { name: 'OIPADDRESS', type: 'string' },
                    { name: 'NIPADDRESS', type: 'string' },
                    { name: 'OCPEMAC', type: 'string' },
                    { name: 'NCPEMAC', type: 'string' },
                    { name: 'OCPEIPADDRESS', type: 'string' },
                    { name: 'NCPEIPADDRESS', type: 'string' },
                    { name: 'OPROMNAME', type: 'string' },
                    { name: 'NPROMNAME', type: 'string' },
                    { name: 'OBPNAME', type: 'string' },
                    { name: 'NBPNAME', type: 'string' },
                    { name: 'DELETE003CITEM', type: 'string' },
                    { name: 'SEQNO', type: 'string' },
                    { name: 'CHOOSESERVICEID', type: 'string' },
                    { name: 'SMARTCARDNO', type: 'string' },
                    { name: 'STBSNO', type: 'string' },
                    { name: 'RESEQNO', type: 'string' },
                    { name: 'REFNO', type: 'integer' },
                ]
            };
            options.grdDelete003 = {
                datatype: "json",
                datafields: [
                   { name: 'CHOOSE', type: 'boolean' },
                   { name: 'FACISNO', type: 'string' },
                   { name: 'SERVICEID', type: 'string' },
                   { name: 'PRODUCTNAME', type: 'string' },
                   { name: 'CITEMNAME', type: 'string' },
                   { name: 'PERIOD', type: 'integer' },
                   { name: 'AMOUNT', type: 'integer' },
                   { name: 'STARTDATE', type: 'date' },
                   { name: 'STOPDATE', type: 'date' },
                   { name: 'BPNAME', type: 'string' },
                   { name: 'CONTNO', type: 'string' },
                   { name: 'CONTSTARTDATE', type: 'date' },
                   { name: 'CONTSTOPDATE', type: 'date' },
                   { name: 'FACISEQNO', type: 'string' },
                   { name: 'CITEMCODE', type: 'string' }]
                   
            };
            var dataAdapter1 = new $.jqx.dataAdapter(options.grdNormal);
            var dataAdapter2 = new $.jqx.dataAdapter(options.grdChange);
           // var dataAdapter3 = new $.jqx.dataAdapter(options.grdDelete003);
            /*-------------------------------------------------------------*/
            $('#' + headId + 'grdNormal').jqxGrid({
                width: '100%',
                // height: '99%',
                height:$('#' + headId + 'jqxTabs').csTabs('height'),
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
                    { text: lang.colFaciStatus, datafield: 'FACISTATUS', width: 70, cellsalign: 'center', align: 'center' },
                    { text: lang.colFaciWipStatus, datafield: 'FACIWIPSTATUS', width: 70, cellsalign: 'center', align: 'center' },
                    { text: lang.colFaciCommandStatus, datafield: 'FACICOMMANDSTATUS', width: 70, cellsalign: 'center', align: 'center' },
                    { text: lang.colFaciName, datafield: 'FACINAME', width: 120 },
                    { text: lang.colFaciSNo, datafield: 'FACISNO', width: 120 },
                    { text: lang.colSmartCardNo, datafield: 'SMARTCARDNO', width: 120 },
                    { text: lang.colDeclarantName, datafield: 'DECLARANTNAME', width: 100 },
                    { text: lang.colBuyName, datafield: 'BUYNAME', width: 60 },
                    { text: lang.colInstDate, datafield: 'INSTDATE', width: 150, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd HH:mm:ss' },
                    { text: lang.colCMBaudno, datafield: 'CMBAUDNO', width: 60 },
                    { text: lang.colCMBaudRate, datafield: 'CMBAUDRATE', width: 70 },
                    { text: lang.colFixIPCount, datafield: 'FIXIPCOUNT', width: 60 },
                    { text: lang.colDynIPCount, datafield: 'DYNIPCOUNT', width: 60 },
                    { text: lang.colInstName1, datafield: 'INSTNAME1', width: 80, cellsalign: 'center', align: 'center' },
                    { text: lang.colInstName2, datafield: 'INSTNAME2', width: 80, cellsalign: 'center', align: 'center' },
                    { text: lang.colSeqNo, datafield: 'SEQNO', width: 80, hidden: true },
                    { text: lang.colDVRAuthSizeCode, datafield: 'DVRAUTHSIZECODE', width: 80, hidden: true }
                ],
                localization: options.localization
            });
            //dataAdapter1 = null;
            //delete dataAdapter1;
            /*-------------------------------------------------------------*/
            $('#' + headId + 'grdChange').jqxGrid({
                //width: '99.7%',
                width: $('#' + headId + 'jqxTabs').csTabs('width'),
                //height: '99%',
                height: $('#' + headId + 'jqxTabs').csTabs('height'),
                source: dataAdapter2,
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
                    { text: lang.colKind, datafield: 'KIND', width: 90, cellsalign: 'center', align: 'center' },
                    { text: lang.colFaciCode, datafield: 'FACICODE', width: 60 },
                    { text: lang.colFaciName2, datafield: 'FACINAME', width: 150 },
                    { text: lang.colFaciSNo2, datafield: 'FACISNO', width: 110 },
                    { text: lang.colOCMBaudRate, datafield: 'OCMBAUDRATE', width: 70 },
                    { text: lang.colNCMBaudRate, datafield: 'NCMBAUDRATE', width: 70 },
                    { text: lang.colODynIPCount, datafield: 'ODYNIPCOUNT', width: 80 },
                    { text: lang.colNDynIPCount, datafield: 'NDYNIPCOUNT', width: 80 },
                    { text: lang.colOFixIPCount, datafield: 'OFIXIPCOUNT', width: 80 },
                    { text: lang.colNFixIPCount, datafield: 'NFIXIPCOUNT', width: 80 },
                    { text: lang.colODVRAuthSizeCode, datafield: 'ODVRAUTHSIZECODE', width: 80 },
                    { text: lang.colNDVRAuthSizeCode, datafield: 'NDVRAUTHSIZECODE', width: 80 },
                    { text: lang.colOIPAddress, datafield: 'OIPADDRESS', width: 130 },
                    { text: lang.colNIPAddress, datafield: 'NIPADDRESS', width: 130 },
                    { text: lang.colOCPEMAC, datafield: 'OCPEMAC', width: 130 },
                    { text: lang.colNCPEMAC, datafield: 'NCPEMAC', width: 130 },
                    { text: lang.colOCPEIPAddress, datafield: 'OCPEIPADDRESS', width: 140 },
                    { text: lang.colNCPEIPAddress, datafield: 'NCPEIPADDRESS', width: 140 },
                    { text: lang.colOPromName, datafield: 'OPROMNAME', width: 150 },
                    { text: lang.colNPromName, datafield: 'NPROMNAME', width: 150 },
                    { text: lang.colOBPName, datafield: 'OBPNAME', width: 150 },
                    { text: lang.colNBPName, datafield: 'NBPNAME', width: 150 },
                    { text: lang.colDelete003Citem, datafield: 'DELETE003CITEM', width: 120 },
                    { text: lang.colSeqNo2, datafield: 'SEQNO', width: 200, hidden: false },
                    { text: lang.colChooseServiceID, datafield: 'CHOOSESERVICEID', width: 200 },
                    { text: 'SMARTCARDNO', datafield: 'SMARTCARDNO', width: 120, hidden: false },
                    { text: 'STBSNO', datafield: 'STBSNO', width: 200, hidden: false },
                    { text: 'RESEQNO', datafield: 'RESEQNO', width: 200, hidden: false },
                    { text: 'REFNO', datafield: 'REFNO', width: 200, hidden: false },
                ],
                localization: options.localization
            });
            //dataAdapter2 = null;
            //delete dataAdapter2;
            /*-------------------------------------------------------------*/
            $('#' + headId + 'grdDelete003').jqxGrid({
                width: '100%',
                height: '99%',
                //source: dataAdapter3,
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
                        text: lang.colChoose,
                        datafield: 'CHOOSE',
                        width: 50,
                        editable: false,
                        threestatecheckbox: false,
                        columntype: 'checkbox',
                        cellsalign: 'center',
                        align: 'center'
                    },
                    { text: lang.colFaciSNo3, datafield: 'FACISNO', width: 120, editable: false },
                    { text: lang.colServiceId, datafield: 'SERVICEID', width: 110, editable: false },
                    { text: lang.colProductName, datafield: 'PRODUCTNAME', width:150, editable: false },
                    { text: lang.colCitemName, datafield: 'CITEMNAME', width: 200, editable: false },
                    { text: lang.colPeriod, datafield: 'PERIOD', width: 60, cellsalign: 'center', align: 'center', editable: false },
                    { text: lang.colAmount, datafield: 'AMOUNT', width: 70, editable: false },
                    { text: lang.colStartDate, datafield: 'STARTDATE', width: 90, editable: false, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colStopDate, datafield: 'STOPDATE', width: 90, editable: false, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colBPName, datafield: 'BPNAME', width: 120, editable: false },
                    { text: lang.colContNo, datafield: 'CONTNO', width: 100, editable: false },
                    { text: lang.colContStartDate, datafield: 'CONTSTARTDATE', width: 100, editable: false, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colContStopDate, datafield: 'CONTSTOPDATE', width: 100, editable: false, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                    { text: lang.colFaciSeqNo, datafield: 'FACISEQNO', width: 150, editable: false },
                    { text: lang.colCitemCode, datafield: 'CITEMCODE', width: 130, hidden: true, editable: false }
                ],
                localization: options.localization
            });

        }
        catch (err) {
            errorHandle(formName, 'renderGrid', err);
        }
    };
    function getFaciName(div, act) {
        try {

        } catch (err) {

        } finally {

        };
    };
    function getFaciCode(div,seqNo) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var retResult = { faciCode: '', faciName: '' };
        try {
            if (options.wipDataCopy.Facility != undefined) {
                $.each(options.wipDataCopy.Facility.rows, function (key, row) {
                    if (row.SEQNO == seqNo) {
                        retResult.faciCode = row.FACICODE;
                        retResult.faciName = row.FACINAME;
                        return retResult;
                    };
                });
            };
            if (retResult.faciCode == '') {
                if (options.wipDataCopy.PrFacility != undefined) {
                    $.each(options.wipDataCopy.PrFacility.rows, function (key, row) {
                        if (row.SEQNO == seqNo) {
                            retResult.faciCode = row.FACICODE;
                            retResult.faciName = row.FACINAME;
                            return retResult;
                        };
                    });
                };
            }
           
        } catch (err) {
            errorHandle(formName, 'getFaciCode', err);
        } finally {
            return retResult;
        };
    };
    function isChargeChoose(div, curServiceId, changeServiceId) {
        var options = $.data(div, formName).options;
        var headId = '#' + $(div).attr('id');
        var aryServiceId = [];
        try {
            //var ary = jdate.split(/[^0-9]/);
            // var serviceId = $(headId + 'grdChange').jqxGrid('getcellvalue', changeRowIndex, "CHOOSESERVICEID");
            if (changeServiceId == undefined) { return false; };
            if (changeServiceId == null) { return false; };
            aryServiceId = changeServiceId.split(/[,]/);
            if (aryServiceId.indexOf(curServiceId.toString()) > -1) { return true; };
            return false;
        } catch (err) {
            errorHandle(formName, 'isChargeChoose', err);
        } finally {
            aryServiceId.length = 0;
            aryServiceId = null;
        };
    };
    function isGrdDelEditable(div, kind, act) {
        var options = $.data(div, formName).options;
        var headId = '#' + $(div).attr('id');
        $(headId + 'SO111XDgrdDelete003').hide();
        try {            
            switch (kind) {
                case options.language.AccChannel:
                case options.language.Down:
                case options.language.PauseChannel:
                case options.language.ResumeChannel:
                    {
                        if (options.wipDataCopy.period.rows.length > 0) {
                            $(headId + 'SO111XDgrdDelete003').show();
                            return true;
                        } else {
                            return false;
                        }
                        break;
                    };
                case options.language.DownSpeed:
                case options.language.UpSpeed:
                case options.language.DVRDown:
                case options.language.DVRUp:
                case options.language.ChangeChannel:
                case options.language.PromChannel:
                case options.language.ChangeProm:
                    {
                        if (options.wipDataCopy.period.rows.length > 0) {
                            $(headId + 'SO111XDgrdDelete003').show();
                        };
                        return false;
                        break;
                    };
                default:
                    {                                      
                        return false;
                        break;
                    };
            };
        } catch (err) {
            errorHandle(formName, 'isGrdDelEditable', err);
        } finally {

        };
    };
      
    function refreshDelGrid(div,rowIndex, act) {
        var options = $.data(div, formName).options;
        var headId = $(div).attr('id');
        var lang = options.language;
        var loginInfo = getParaLoginInfo(div, formName);
        $('#' + headId + 'SO111XDgrdDelete003').hide();
        try {
            /*
            var parameters = $.extend(true, {}, options.loginInfo, {
                CustId: { type: 'integer', value: options.custId },
                //FaciSeqno: { type: 'string', value: data2.rows[indexgrdChang].FACISEQNO },
                FaciSeqno: { type: 'string', value: $('#' + headId + 'grdChange').jqxGrid('getcellvalue', rowIndex, "FACISEQNO") },
                ServiceType: { type: 'string', value: options.serviceType },
            }); */
            var parameters = $.extend(true, {}, loginInfo, {
                CustId: { type: 'integer', value: options.custId },
                //FaciSeqno: { type: 'string', value: data2.rows[indexgrdChang].FACISEQNO },
                FaciSeqno: { type: 'string', value: $('#' + headId + 'grdChange').jqxGrid('getcellvalue', rowIndex, "FACISEQNO") },
                ServiceType: { type: 'string', value: options.serviceType },
            });
            var params = getParameters(riadllName,
                                                   riaClassName,
                                                   'GetPeriodCharge',
                                                       JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            if (options.wipDataCopy.period != undefined) {
                                options.wipDataCopy.period = null;
                            };
                            delete options.wipDataCopy.period;
                            options.wipDataCopy.period = {};
                            var tmp = JSON.parse(data.ResultXML);
                            $.extend(true, options.wipDataCopy.period, tmp.Table);
                            tmp = null;
                            delete tmp;
                           var changeServiceId = $('#' + headId + 'grdChange').jqxGrid('getcellvalue', rowIndex, "CHOOSESERVICEID");
                           $.each(options.wipDataCopy.period.rows, function (index, row) {
                                var o = new Object({ CHOOSE: isChargeChoose(div, row.SERVICEID, changeServiceId) });
                                $.extend(true, options.wipDataCopy.period.rows[index], o);
                                delete o;
                            });
                            
                            
                            delete options.grdDelete003;
                            options.grdDelete003 = {
                                datatype: "json",
                                datafields: [
                                   { name: 'CHOOSE', type: 'boolean' },
                                   { name: 'FACISNO', type: 'string' },
                                   { name: 'SERVICEID', type: 'string' },
                                   { name: 'PRODUCTNAME', type: 'string' },
                                   { name: 'CITEMNAME', type: 'string' },
                                   { name: 'PERIOD', type: 'integer' },
                                   { name: 'AMOUNT', type: 'integer' },
                                   { name: 'STARTDATE', type: 'date' },
                                   { name: 'STOPDATE', type: 'date' },
                                   { name: 'BPNAME', type: 'string' },
                                   { name: 'CONTNO', type: 'string' },
                                   { name: 'CONTSTARTDATE', type: 'date' },
                                   { name: 'CONTSTOPDATE', type: 'date' },
                                   { name: 'FACISEQNO', type: 'string' },
                                   { name: 'CITEMCODE', type: 'string' }]

                            };
                            var dataAdapter3 = new $.jqx.dataAdapter(options.grdDelete003);
                            var columns = [];
                            if (!$('#' + headId + 'grdDelete003').jqxGrid('isBindingCompleted')) {
                                $('#' + headId + 'grdDelete003').jqxGrid({
                                    width: '100%',
                                    height: '99%',
                                    source: dataAdapter3,
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
                                            text: lang.colChoose,
                                            datafield: 'CHOOSE',
                                            width: 50,
                                            editable: isGrdDelEditable(div, $('#' + $(div).prop('id') + 'grdChange').jqxGrid('getcellvalue', rowIndex, "KIND")),
                                            threestatecheckbox: false,
                                            columntype: 'checkbox',
                                            cellsalign: 'center',
                                            align: 'center'
                                        },
                                        { text: lang.colFaciSNo3, datafield: 'FACISNO', width: 120, editable: false },
                                        { text: lang.colServiceId, datafield: 'SERVICEID', width: 110, editable: false },
                                        { text: lang.colProductName, datafield: 'PRODUCTNAME', width: 150, editable: false },
                                        { text: lang.colCitemName, datafield: 'CITEMNAME', width: 200 },
                                        { text: lang.colPeriod, datafield: 'PERIOD', width: 60, cellsalign: 'center', align: 'center', editable: false },
                                        { text: lang.colAmount, datafield: 'AMOUNT', width: 70, editable: false },
                                        { text: lang.colStartDate, datafield: 'STARTDATE', width: 90, editable: false, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                                        { text: lang.colStopDate, datafield: 'STOPDATE', width: 90, editable: false, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                                        { text: lang.colBPName, datafield: 'BPNAME', width: 120, editable: false },
                                        { text: lang.colContNo, datafield: 'CONTNO', width: 100, editable: false },
                                        { text: lang.colContStartDate, datafield: 'CONTSTARTDATE', width: 100, editable: false, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                                        { text: lang.colContStopDate, datafield: 'CONTSTOPDATE', width: 100, editable: false, cellsalign: 'center', align: 'center', cellsformat: 'yyyy/MM/dd' },
                                        { text: lang.colFaciSeqNo, datafield: 'FACISEQNO', width: 150, editable: false },
                                        { text: lang.colCitemCode, datafield: 'CITEMCODE', width: 130, hidden: true, editable: false }
                                    ]
                                });
                            }
                            
                            
                            
                            var dataAdapter3 = new $.jqx.dataAdapter(options.grdDelete003);
                            var data3 = $.extend(true, {}, options.wipDataCopy.period);
                            options.grdDelete003.localdata = data3;
                            $('#' + $(div).prop('id') + 'grdDelete003').jqxGrid({ source: dataAdapter3 });
                            dataAdapter3 = null;
                            delete dataAdapter3;
                            $('#' + $(div).prop('id') + 'grdDelete003').on("bindingcomplete", function (event) {
                                $('#' + $(div).prop('id') + 'grdDelete003').unbind('bindingcomplete');
                               
                               // $('#' + $(div).prop('id') + 'grdDelete003').jqxGrid('setcolumnproperty', 'CHOOSE', 'editable', true);
                                if ($.isFunction(act)) { act(); };
                            });
                          
                            $('#' + $(div).prop('id') + 'grdDelete003').jqxGrid('updatebounddata');
                            $('#' + $(div).prop('id') + 'grdDelete003').jqxGrid({ selectedrowindex: 0 });
                            //$('#' + $(div).prop('id') + 'grdDelete003').jqxGrid('setcolumnproperty', 'CHOOSE', 'editable', true);
                            
                             
                            //data3 = null;
                            //delete data3;
                            //dataAdapter3 = null;
                            //delete dataAdapter3;
                           

                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            changeMode(div);
                        };
                    } catch (err) {
                        errorHandle(formName, 'GetPeriodCharge-Server', err);
                        changeMode(div);
                    } finally {
                        parameters = null;
                        param = null;
                        data = null;
                        delete parameters;
                        delete param;
                        delete data;
                    };
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'refreshDelGrid', err);
        } finally {
            loginInfo = null;
            delete loginInfo;
        };
    };
    function refreshGrid(div, act) {
        var indexGrdChang = -1;
        //var div = $('#' + id)[0];
        var loginInfo = getParaLoginInfo(div, formName);
        try {
            var options = $.data(div, formName).options;
            var data1 = options.wipDataCopy.canChagneFaci;
            //indexgrdChang = $('#' + $(div).prop('id') + 'grdChange').jqxGrid('selectedrowindex');
            if (options.wipDataCopy.changeFacilityCopy != undefined) {
                options.wipDataCopy.changeFacilityCopy = null;
                delete options.wipDataCopy.changeFacilityCopy;
            };
            options.wipDataCopy.changeFacilityCopy = {};
            $.extend(true, options.wipDataCopy.changeFacilityCopy, options.wipDataCopy.ChangeFacility);
            options.wipDataCopy.changeFacilityCopy.columns.push({ name: 'FACICODE', type: 'integer' });
            options.wipDataCopy.changeFacilityCopy.columns.push({ name: 'FACINAME', type: 'string' });
            $.each(options.wipDataCopy.changeFacilityCopy.rows, function (key, row) {
                var o = getFaciCode(div, row.SEQNO);
                $.extend(true, row, { FACICODE: o.faciCode });
                $.extend(true, row, { FACINAME: o.faciName });
                o = null;
                delete o;
            });
            $.each(options.wipDataCopy.changeFacilityCopy.rows,
                function (index, changeFacilityrow) {
                    options.wipDataCopy.canChagneFaci.rows = $.grep(options.wipDataCopy.canChagneFaci.rows,
                        function (row) {
                            return row.SEQNO != changeFacilityrow.SEQNO;
                        });
                });

            var data2 = options.wipDataCopy.changeFacilityCopy;
            options.grdNormal.localdata = data1;
            options.grdChange.localdata = data2;

            var dataAdapter1 = new $.jqx.dataAdapter(options.grdNormal);
            $('#' + $(div).prop('id') + 'grdNormal').jqxGrid({ source: dataAdapter1 });
            $('#' + $(div).prop('id') + 'grdNormal').jqxGrid('updatebounddata');
            $('#' + $(div).prop('id') + 'grdChange').on("bindingcomplete", function (event) {
                $('#' + $(div).prop('id') + 'grdChange').unbind('bindingcomplete');
                indexGrdChange = $('#' + $(div).prop('id') + 'grdChange').jqxGrid('getselectedrowindex');
                if (indexGrdChange == -1) { indexGrdChange = 0; };
                $('#' + $(div).prop('id') + 'grdChange').jqxGrid({ selectedrowindex: indexGrdChange });
                refreshDelGrid(div, indexGrdChange, act);
                //refreshDelGrid(div, indexGrdChange);
                               
            });
                
                if (data2.rows.length > 0) {
                    var seqNoAry = [];
                    seqNoAry.push("'-1'");
                    for (var i = 0; i < data2.rows.length; i++) {
                        seqNoAry.push("'" + data2.rows[i]['SEQNO'] + "'");
                    };
                    var parameters = $.extend(true, {}, loginInfo, {
                        SeqNos: { type: 'string', value: seqNoAry.toString() },
                        CustId: {
                            type: 'integer', value: options.custId
                        },
                    });
                    var params = getParameters(riadllName,
                       riaClassName,
                       'GetFaciCode',
                       JSON.stringify(parameters));
                    getServerData(params, {
                        success: function (data) {
                            try {
                                if (data.ErrorCode == 0) {
                                    var tmp = JSON.parse(data.ResultXML);
                                    var len = options.wipDataCopy.changeFacilityCopy.rows.length;
                                    for (var i = 0 ; i < len ; i++) {
                                        var len2 = tmp.Table.rows.length;
                                        for (var j = 0 ; j < len2; j++) {
                                            if (options.wipDataCopy.changeFacilityCopy.rows[i]['SEQNO'] == tmp.Table.rows[j]['SEQNO']) {
                                                if (tmp.Table.rows[j]['SMARTCARDNO'] != undefined) {
                                                    $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { SMARTCARDNO: tmp.Table.rows[j]['SMARTCARDNO'] });
                                                } else { $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { SMARTCARDNO: '' }); }
                                                if (tmp.Table.rows[j]['STBSNO'] != undefined) {
                                                    $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { STBSNO: tmp.Table.rows[j]['STBSNO'] });
                                                } else { $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { STBSNO: '' }) };
                                                if (tmp.Table.rows[j]['RESEQNO'] != undefined) {
                                                    $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { RESEQNO: tmp.Table.rows[j]['RESEQNO'] });
                                                } else { $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { RESEQNO: '' }); };
                                                if (tmp.Table.rows[j]['REFNO'] != undefined) {
                                                    $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { REFNO: tmp.Table.rows[j]['REFNO'] });
                                                } else { $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { REFNO: -1 }); };
                                            }
                                            
                                        };
                                        if (options.wipDataCopy.changeFacilityCopy.rows[i].FACICODE == '') {
                                            for (var j = 0; j < len2 ; j++) {
                                                if (options.wipDataCopy.changeFacilityCopy.rows[i]['SEQNO'] == tmp.Table.rows[j]['SEQNO']) {
                                                    $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { FACICODE: tmp.Table.rows[j]['FACICODE'] });
                                                    $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { FACINAME: tmp.Table.rows[j]['FACINAME'] });

                                                    break;
                                                } else {
                                                    
                                                };
                                            };
                                        };
                                        if (options.wipDataCopy.changeFacilityCopy.rows[i].FACICODE == '') {
                                            for (var j = 0 ; j < options.wipDataCopy.Facility.rows.length; j++) {
                                                if (options.wipDataCopy.changeFacilityCopy.rows[i]['SEQNO'] == options.wipDataCopy.Facility.rows[j].SEQNO) {
                                                    $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { FACICODE: options.wipDataCopy.Facility.rows[j]['FACICODE'] });
                                                    $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { FACINAME: options.wipDataCopy.Facility.rows[j]['FACINAME'] });
                                                    break;
                                                };
                                            };
                                        }
                                    };
                                                                      
                                    
                                    tmp = null;
                                    delete tmp;                                   
                                    parameters = null;
                                    delete parameters;
                                    params = null;
                                    delete params;
                                }
                                else {
                                    messageBox(data.ErrorMessage, messageType.critical);
                                    changeMode(div);
                                };
                            } catch (err) {
                                errorHandle(formName, 'GetFaciCode-Server', err);
                                changeMode(div);
                            } finally {
                                parameters = null;
                                param = null;
                                data = null;
                                delete parameters;
                                delete param;
                                delete data;
                                seqNoAry.length = 0;
                                var dataAdapter2 = new $.jqx.dataAdapter(options.grdChange);
                                $('#' + $(div).prop('id') + 'grdChange').jqxGrid({ source: dataAdapter2 });
                                $('#' + $(div).prop('id') + 'grdChange').jqxGrid('updatebounddata');
                            };
                        }
                    });
                } else {
                    
                    $('#' + $(div).prop('id') + 'grdChange').jqxGrid('clear');
                   

                    $('#' + $(div).prop('id') + 'grdDelete003').jqxGrid('clear');

                    $('#' + $(div).prop('id') + 'grdChange').jqxGrid('scrolloffset', 0, 0);
                    $('#' + $(div).prop('id') + 'grdDelete003').jqxGrid('scrolloffset', 0, 0);
                    $('#' + $(div).prop('id') + 'SO111XDgrdDelete003').hide();
                   
                    
                }; 
            } catch (err) {
                errorHandle(formName, 'refreshGrid', err);
                changeMode(div);
            } finally {
                loginInfo = null;
                delete loginInfo;
                if ($.isFunction(act)) { act(); };
            };
        
    };
    
    function initialGrid(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);
        try {
            //var rowindex = $('#' + $(div).prop('id') + 'grdData1').jqxGrid('getselectedrowindex');
            var options = $.data(div, formName).options;
            var data1 = options.wipDataCopy.canChagneFaci;
            
            if (options.wipDataCopy.changeFacilityCopy != undefined) {
                options.wipDataCopy.changeFacilityCopy = null;
                delete options.wipDataCopy.changeFacilityCopy;
            };
            options.wipDataCopy.changeFacilityCopy = {};
            $.extend(true, options.wipDataCopy.changeFacilityCopy, options.wipDataCopy.ChangeFacility);
            options.wipDataCopy.changeFacilityCopy.columns.push({ name: 'FACICODE', type: 'integer' });
            options.wipDataCopy.changeFacilityCopy.columns.push({ name: 'FACINAME', type: 'string' });
            options.wipDataCopy.changeFacilityCopy.columns.push({ name: 'SMARTCARDNO', type: 'string' });
            options.wipDataCopy.changeFacilityCopy.columns.push({ name: 'STBSNO', type: 'string' });
            var data2 = options.wipDataCopy.changeFacilityCopy;
            options.grdNormal.localdata = data1;
            options.grdChange.localdata = data2;
            
            $('#' + $(div).prop('id') + 'grdNormal').jqxGrid('updatebounddata');
            $('#' + $(div).prop('id') + 'grdNormal').jqxGrid({ selectedrowindex: 0 });
            $('#' + $(div).prop('id') + 'grdChange').jqxGrid('updatebounddata');
            if (data2.rows.length > 0) {
                var seqNoAry = [];
                for (var i = 0; i < data2.rows.length; i++) {
                    seqNoAry.push("'" +data2.rows[i]['SEQNO'] +"'");
                };
                var parameters = $.extend(true, {}, loginInfo, {
                    SeqNos: { type: 'string', value: seqNoAry.toString() },
                    CustId: { type: 'integer', value: options.custId },
                });
                var params = getParameters(riadllName,
                   riaClassName,
                   'GetFaciCode',
                   JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        try {
                            if (data.ErrorCode == 0) {                              
                                var tmp = JSON.parse(data.ResultXML);
                                for (var i = 0 ; i < options.wipDataCopy.changeFacilityCopy.rows.length ; i++) {

                                    for (var j = 0; j < tmp.Table.rows.length ; j++) {
                                        if (options.wipDataCopy.changeFacilityCopy.rows[i]['SEQNO'] == tmp.Table.rows[j]['SEQNO']) {
                                            $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { FACICODE: tmp.Table.rows[j]['FACICODE'] });
                                            $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { FACINAME: tmp.Table.rows[j]['FACINAME'] });
                                            if (tmp.Table.rows[j]['SMARTCARDNO'] != undefined) {
                                                $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { SMARTCARDNO: tmp.Table.rows[j]['SMARTCARDNO'] });
                                            };
                                            if (tmp.Table.rows[j]['STBSNO'] != undefined) {
                                                $.extend(true, options.wipDataCopy.changeFacilityCopy.rows[i], { STBSNO: tmp.Table.rows[j]['STBSNO'] });
                                            };
                                            break;
                                        };
                                    };
                                };
                                tmp = null;
                                delete tmp;
                                $('#' + $(div).prop('id') + 'grdChange').jqxGrid('updatebounddata');
                                $('#' + $(div).prop('id') + 'grdChange').jqxGrid({ selectedrowindex: 0 });
                                parameters = null;
                                delete parameters;
                                params = null;
                                delete params;
                                /*
                                var parameters = $.extend(true, {}, options.loginInfo, {
                                    CustId: { type: 'integer', value: options.custId },
                                    FaciSeqno: { type: 'string', value: data2.rows[0].FACISEQNO },
                                    ServiceType: { type: 'string', value: options.serviceType },
                                }); */
                                var parameters = $.extend(true, {},  getParaLoginInfo(div, formName), {
                                    CustId: { type: 'integer', value: options.custId },
                                    FaciSeqno: { type: 'string', value: data2.rows[0].FACISEQNO },
                                    ServiceType: { type: 'string', value: options.serviceType },
                                });
                                var params = getParameters(riadllName,
                                                    riaClassName,
                                                    'GetPeriodCharge',
                                                        JSON.stringify(parameters));
                                getServerData(params, {
                                    success: function (data) {
                                        try {
                                            if (data.ErrorCode == 0) {
                                                delete options.wipDataCopy.period;
                                                options.wipDataCopy.period = {};
                                                var tmp = JSON.parse(data.ResultXML);
                                                $.extend(true, options.wipDataCopy.period, tmp.Table);
                                                tmp = null;
                                                delete tmp;
                                                var data3 = options.wipDataCopy.period;
                                                options.grdDelete003.localdata = data3;
                                                $('#' + $(div).prop('id') + 'grdDelete003').jqxGrid('updatebounddata');
                                                getCanChangeKind(div, act);
                                            }
                                            else {
                                                messageBox(data.ErrorMessage, messageType.critical);
                                            };
                                        } catch (err) {
                                            errorHandle(formName, 'GetPeriodCharge-Server', err);
                                        } finally {
                                            parameters = null;
                                            param = null;
                                            data = null;
                                            delete parameters;
                                            delete param;
                                            delete data;
                                        };
                                    }
                                });
                            }
                            else {
                                messageBox(data.ErrorMessage, messageType.critical);
                            };
                        } catch (err) {
                            errorHandle(formName, 'GetFaciCode-Server', err);
                        } finally {
                            parameters = null;
                            param = null;
                            data = null;
                            delete parameters;
                            delete param;
                            delete data;
                            seqNoAry.length = 0;

                        };
                    }
                });                         
            } else {
                if ($.isFunction(act)) {
                    act();
                } else {
                    getCanChangeKind(div, act);
                }
                
            };
        
            return;
        }
        catch (err) {
            errorHandle(formName, 'initialGrid', err);
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function getPeriodCharge(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {

        } catch (err) {
            errorHandle(formName, 'getPeriodCharge', err);
        } finally {

        };
    };
    function getCanChangeKind(div ,act) {        
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        
        try {
            /*
            var parameters = $.extend(true, {}, options.loginInfo, {
                WipType: { type: 'integer', value: options.wipType - 1 },
                WipRefNo: { type: 'integer', value: options.wipRefNo },
                ReInstAcrossFlag: { type: 'boolean', value: options.reInstAcrossFlag },
            }); */
            var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                WipType: { type: 'integer', value: options.wipType - 1 },
                WipRefNo: { type: 'integer', value: options.wipRefNo },
                ReInstAcrossFlag: { type: 'boolean', value: options.reInstAcrossFlag },
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetCanChangeKind',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {                            
                            delete options.wipDataCopy.canChangeKind;
                            options.wipDataCopy.canChangeKind = {};
                            var tmp = JSON.parse(data.ResultXML);
                            $.extend(true, options.wipDataCopy.canChangeKind, tmp.CanChangeKind);
                            
                            $(headerId + 'cboType').jqxDropDownList('clear');
                            /*
                            for (var i = 0; i < options.wipDataCopy.canChangeKind.rows.length; i++) {
                                $(headerId + 'cboType').jqxDropDownList('addItem', options.wipDataCopy.canChangeKind.rows[i]['Kind']);
                            };
                            if (options.wipDataCopy.canChangeKind.rows.length > 0) {
                                $(headerId + 'cboType').jqxDropDownList({ selectedIndex: 0 });
                            };*/
                            var source =
                                    {
                                        datatype: "json",
                                        datafields: [
                                                  { name: 'Kind', type: 'string' },
                                                  { name: 'KindCode', type: 'integer' }
                                        ]                                   
                                    };
                            source.localdata = options.wipDataCopy.canChangeKind;
                            var dataAdapter = new $.jqx.dataAdapter(source);
                            $(headerId + 'cboType').jqxDropDownList({ source: dataAdapter, displayMember: "Kind", valueMember: "KindCode" });
                            if (options.wipDataCopy.canChangeKind.rows.length > 0) {
                                $(headerId + 'cboType').jqxDropDownList({ selectedIndex: 0 });
                            };
                            dource = null;
                            delete source;
                            dataAdapter = null;
                            delete dataAdapter;
                            delete tmp;
                            tmp = null;
                            setInputData(div, act);
                            
                            return;
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    } catch (err) {
                        errorHandle(formName, 'GetCanChangeKind-Server', err);

                    } finally {
                        parameters = null;
                        param = null;
                        data = null;
                        delete parameters;
                        delete param;
                        delete dsChangeFacility;
                        delete data;                        
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'getCanChangeKind', err);
        } finally {
           
        };
    }
   
    function getCPEMAC(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var OCPEMAC = {
                type: 'string',
                OCPEMAC: {
                    columns: [{ name: 'SEQNO', type: 'string' },
                        { name: 'CPEMAC', type: 'string' },
                        { name: 'STOPDATE', type: 'string' },
                        { name: 'IPADDRESS', type: 'string' },
                    ],
                    rows: []
                }
            };
            var faciSeqNo = 'X';
            var rows = $(headerId + 'grdNormal').jqxGrid('getrows');
            if (options.wipDataCopy.OCPEMAC == undefined) {
                $.extend(true, options.wipDataCopy, OCPEMAC);
            };            
            if (rows.length > 0) {
                var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                if (rowindex === -1) { rowindex = 0 };
                faciSeqNo = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO")
            };
            if (options.wipDataCopy.CPEMAC != undefined) {
                var len = options.wipDataCopy.CPEMAC.length;
                for (var i = 0; i < len; i++) {
                    if (options.wipDataCopy.CPEMAC.rows[i].SEQNO == faciSeqNo) {
                        if ($.isFunction(act)) { act(); return; };
                        return;
                    };
                };
            };
            /*
            var parameters = $.extend(true, {}, options.loginInfo, {
                CustId: { type: 'integer', value: options.custId },
                FaciSeqNo: { type: 'string', value: faciSeqNo }
            }); */
            var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                CustId: { type: 'integer', value: options.custId },
                FaciSeqNo: { type: 'string', value: faciSeqNo }
            });
            var params = getParameters(riadllName,
                riaClassName,
                'GetCPEMAC',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);                                                        
                            if (options.wipDataCopy.CPEMAC != undefined) {
                                options.wipDataCopy.CPEMAC = null;
                                delete options.wipDataCopy.CPEMAC;
                            };
                            options.wipDataCopy.CPEMAC = {}
                            $.extend(true, options.wipDataCopy.CPEMAC, tmp.Table);
                            tmp = null;
                            delete tmp;
                            //delete those exists data to avoid duplication of data  
                            options.wipDataCopy.OCPEMAC.rows =
                                $.grep(options.wipDataCopy.OCPEMAC.rows, function (row) {
                                        return row.SEQNO != faciSeqNo;
                                });
                            var len = options.wipDataCopy.CPEMAC.rows.length;
                            for (var i = 0 ; i < len; i++) {
                                options.wipDataCopy.OCPEMAC.rows.push({
                                    SEQNO: faciSeqNo,
                                    IPADDRESS: options.wipDataCopy.CPEMAC.rows[i].IPADDRESS,
                                    CPEMAC: options.wipDataCopy.CPEMAC.rows[i].CPEMAC,
                                    STOPDATE: options.wipDataCopy.CPEMAC.rows[i].STOPDATE,
                                });
                            };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    } catch (err) {
                        errorHandle(formName, 'getCMRateCode-Server', err);

                    } finally {
                        if (data.ErrorCode == 0) {
                            if ($.isFunction(act)) {
                                act();
                            };
                        };
                        parameters = null;
                        param = null;
                        data = null;
                        delete parameters;
                        delete param;
                        delete dsChangeFacility;
                        delete data;

                    };
                }
            });

        } catch (err) {
            errorHandle(formName, 'getCPEMAC', err);
        } finally {

        };
    }
    function getIPCount(type, div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var rows = $(headerId + 'grdNormal').jqxGrid('getrows');
            if (rows.length === 0) {
                if ($.isFunction(act)) {
                    act();
                };
            } else {
                var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                var fieldName = '';
                switch (type) {
                    case 0: { fieldName = 'FIXIPCOUNT'; break; };
                    case 1: { fieldName = 'DYNIPCOUNT'; break; };
                };
                if (rowindex === -1) { rowindex = 0 };
                var ipCount = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, fieldName);
                if (ipCount == null) { ipCount = 0 };
                /*
                var parameters = $.extend(true, {}, options.loginInfo, {
                    Type: { type: 'integer', value: type },
                    IPCount: { type: 'integer', value: ipCount },
                    ZeroIPCount: {type:'boolean',value :(options.wipType == 3 || type != 0)}
                }); */
                var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                    Type: { type: 'integer', value: type },
                    IPCount: { type: 'integer', value: ipCount },
                    ZeroIPCount: { type: 'boolean', value: (options.wipType == 3 || type != 0) }
                });
                var params = getParameters(riadllName,
                    riaClassName,
                    'GetIPCount',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        try {
                            if (data.ErrorCode == 0) {
                                var tmp = JSON.parse(data.ResultXML);
                                switch (type) {
                                    case 0: {
                                        addgilKind(div, 1);
                                        $(headerId + 'gilKind').csList('source', tmp.Table.rows);                                       
                                        break;
                                    };
                                    case 1: {
                                        addgilKind(div, 2);
                                        $(headerId + 'gilKind2').csList('source', tmp.Table.rows);                                        
                                        break;
                                    };
                                }                                
                                tmp = null;
                                delete tmp;
                                parameters = null;
                                param = null;
                                data = null;
                                delete parameters;
                                delete param;
                                delete dsChangeFacility;
                                delete data;
                                if ($.isFunction(act)) {
                                    act();
                                };
                            }
                            else {
                                messageBox(data.ErrorMessage, messageType.critical);
                            }
                        } catch (err) {
                            errorHandle(formName, 'getIPCount-Server(' + type.toString() + ')' , err);

                        } finally {
                            parameters = null;
                            param = null;
                            data = null;
                            delete parameters;
                            delete param;
                            delete dsChangeFacility;
                            delete data;
                        };
                    }
                });
            };
        } catch (err) {
            errorHandle(formName, 'GetIPCount', err);
        } finally {

        };
    }
    function getCMRateCode(type, div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var rows = $(headerId + 'grdNormal' ).jqxGrid('getrows');
            if (rows.length === 0 ) {
                if ($.isFunction(act)) {
                    act();
                };
            } else {
                var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                if (rowindex === -1) { rowindex = 0 };
                var cmRateCode = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "CMBAUDNO")
                if (cmRateCode == null) { cmRateCode = 0 };
                /*
                var parameters = $.extend(true, {}, options.loginInfo, {
                    Type: { type: 'integer', value: type },
                    CMRateCode: { type: 'integer', value: cmRateCode }
                }); */
                var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                    Type: { type: 'integer', value: type },
                    CMRateCode: { type: 'integer', value: cmRateCode }
                });
                var params = getParameters(riadllName,
                    riaClassName,
                    'GetCMRateCode',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        try {
                            if (data.ErrorCode == 0) {                                
                                var tmp = JSON.parse(data.ResultXML);
                                addgilKind(div, 1);
                                $(headerId + 'gilKind').csList('source', tmp.Table.rows);
                                tmp = null;
                                delete tmp;

                            }
                            else {
                                messageBox(data.ErrorMessage, messageType.critical);
                            }
                        } catch (err) {
                            errorHandle(formName, 'getCMRateCode-Server', err);

                        } finally {
                            if (data.ErrorCode == 0) {
                                if ($.isFunction(act)) {
                                    act();
                                };
                            };
                            parameters = null;
                            param = null;
                            data = null;
                            delete parameters;
                            delete param;
                            delete dsChangeFacility;
                            delete data;
                           
                        };
                    }
                });
            }
            

        } catch (err) {
            errorHandle(formName, 'getCMRateCode', err);
        } finally {

        };
    };
    function getDVRSizeCode(type, div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var rows = $(headerId + 'grdNormal').jqxGrid('getrows');
            if (rows.length === 0) {
                if ($.isFunction(act)) {
                    act();
                };
            } else {
                var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                if (rowindex === -1) { rowindex = 0 };
                var dvrSizeCode = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "DVRAuthSizeCode".toUpperCase())
                if (dvrSizeCode == null) { dvrSizeCode = 0 };
                /*
                var parameters = $.extend(true, {}, options.loginInfo, {
                    Type: { type: 'integer', value: type },
                    DVRSizeCode: { type: 'integer', value: dvrSizeCode }
                }); */
                var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                    Type: { type: 'integer', value: type },
                    DVRSizeCode: { type: 'integer', value: dvrSizeCode }
                });
                var params = getParameters(riadllName,
                    riaClassName,
                    'GetDVRSizeCode',
                    JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        try {
                            if (data.ErrorCode == 0) {
                                var tmp = JSON.parse(data.ResultXML);
                                addgilKind(div, 1);
                                $(headerId + 'gilKind').csList('source', tmp.Table.rows);
                                tmp = null;
                                delete tmp;

                            }
                            else {
                                messageBox(data.ErrorMessage, messageType.critical);
                            }
                        } catch (err) {
                            errorHandle(formName, 'GetDVRSizeCode-Server', err);

                        } finally {
                            if (data.ErrorCode == 0) {
                                if ($.isFunction(act)) {
                                    act();
                                };
                            };
                            parameters = null;
                            param = null;
                            data = null;
                            delete parameters;
                            delete param;
                            delete dsChangeFacility;
                            delete data;

                        };
                    }
                });
            }
        } catch (err) {
            errorHandle(formName, 'getDVRSizeCode', err);
        } finally {

        };
    }
    function test(msg) {
        alert(msg);
    }
    function setInputData(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (act == undefined) { act = function () { changeMode(div) }; };
        try {
                        
            $(headerId + 'grpKind').hide();
            $(headerId + 'grpKind2').hide();
            //
            //$(headerId + 'grpKind').show();
            //$(headerId + 'grpKind2').show();

            $(headerId + 'btnCPEMAC').hide();          
            var item = $(headerId + 'cboType').jqxDropDownList('getSelectedItem');
            /*
            if (options.wipDataCopy.canChagneFaci == undefined) {
                act();
                return;
            };*/
            if (options.wipDataCopy.canChagneFaci.rows.length === 0) {
                act();
                return;
            };
            switch (item.value) {
                case 104:
                    {
                        $(headerId + 'grpKind').show();
                        $(headerId + 'txtKind').text(options.language.Speed);
                        getCMRateCode(1, div,act );
                        break;
                    };
                case 105:
                    {
                        $(headerId + 'grpKind').show();
                        $(headerId + 'txtKind').text(options.language.Speed);
                        getCMRateCode(0, div,act);
                        break;
                    };
                case 114:
                    {
                        $(headerId + 'grpKind').show();
                        $(headerId + 'grpKind2').show();
                        $(headerId + 'btnCPEMAC').show();
                        $(headerId + 'txtKind').text(options.language.FixIP);
                        $(headerId + 'txtKind2').text(options.language.DynIP);
                        getIPCount(0, div,
                                   function () {
                                       getIPCount(1, div,
                                           function () { getCPEMAC(div, act) });
                                   });
                        break;
                    };
                case 106:
                    {
                        $(headerId + 'grpKind').show();
                        $(headerId + 'txtKind').text(options.language.Capacity);                     
                        getDVRSizeCode(0, div, act);                     
                        break;
                    };
                case 107:
                    {
                        $(headerId + 'grpKind').show();
                        $(headerId + 'txtKind').text(options.language.Capacity);
                        getDVRSizeCode(1, div, act);
                        break;
                    };
                default: {
                    
                    act(); 
                    /*
                    $(headerId + 'grpKind').show();
                    $(headerId + 'grpKind2').show();
                    $(headerId + 'btnCPEMAC').show();
                    $(headerId + 'txtKind').text(options.language.Speed);
                    $(headerId + 'txtKind').text(options.language.FixIP);
                    $(headerId + 'txtKind2').text(options.language.DynIP);
                    $(headerId + 'txtKind').text(options.language.Capacity);
                    //getDVRSizeCode(0, div, act);
                    //getCMRateCode(0, div,act);
                    
                    getIPCount(0, div,
                        function () {
                            getIPCount(0, div,
                                function () { getCPEMAC(div, act) });
                        });  */

                    break;
                };
            };
        } catch (err) {
            errorHandle(formName, 'setInputData', err);
        } finally {

        };
    };
    function grdNormalRowSelected(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        disableAllcontrol(event.data);
        try {
            var item = $(headerId + 'cboType').jqxDropDownList('getSelectedItem');
            switch (item.value) {
                case 106, 107:
                    {                      
                        getDVRSizeCode(0, event.data, function () { changeMode(event.data) });                      
                        break;
                    };
                case 107:
                    {
                        getDVRSizeCode(1, event.data, function () { changeMode(event.data) });
                        break;
                    }
                default: {
                    //getDVRSizeCode(0, event.data, function () { changeMode(event.data) });
                    changeMode(event.data);
                    break;
                };
            };
        } catch (err) {
            errorHandle(formName, 'grdNormalRowSelected', err);
        };
    };
    function cboTypeSelected(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        try {
            disableAllcontrol(event.data);
            unBindHandler(event.data);
           
            setInputData(event.data, function () { changeMode(event.data)});
        } catch (err) {
            errorHandle(formName, 'cboTypeSelected', err);
        } finally {
            
        };
    };
    function isDataOK(div,act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var item = $(headerId + 'cboType').jqxDropDownList('getSelectedItem');
            if (item.label == '' || item.label == null) {
                messageBox(options.language.NotSpace, null, null, function () {
                    changeMode(div);
                    return;
                });
                return;
            } else {
                switch (item.value)
                {
                    case 104:
                        {
                            if ($(headerId + 'gilKind').csList('codeNo') = '') {
                                messageBox(options.language.MustBaund, null, null, function () {
                                    changeMode(div);
                                    return;
                                })
                                return;
                            };
                            
                            break;
                        };
                    case 105:
                        {
                            if ($(headerId + 'gilKind').csList('codeNo') = '') {
                                messageBox(options.language.MustBaund, null, null, function () {
                                    changeMode(div);
                                    return;
                                })
                                return;
                            };                            
                            break;
                        };
                    case 114:
                        {
                            var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                            if ($(headerId + 'gilKind').csList('codeNo') == '' && $(headerId + 'gilKind2').csList('codeNo') == '') {
                                messageBox(options.language.MustIP, null, null, function () {
                                    changeMode(div);
                                    return;
                                })
                                return;
                            }
                            else {
                                if ($(headerId + 'gilKind').csList('codeNo') != '' && $(headerId + 'gilKind2').csList('codeNo') != '') {                                    
                                    var dynGrdIPCount = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "DYNIPCOUNT");
                                    var fixGrdIPCount = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "FIXIPCOUNT");                                  
                                    if ($(headerId + 'gilKind2').csList('selectedItem').IPQUANTITY == dynGrdIPCount &&
                                            $(headerId + 'gilKind').csList('selectedItem').IPQUANTITY == fixGrdIPCount) {
                                        messageBox(options.language.IPDouble, null, null,
                                                function () {
                                                        changeMode(div);
                                                        return;
                                                });
                                        return;
                                    };                                                                       
                                };
                                var faciSeqNo = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO");
                                var FixIPCount = 0;
                                fixIPCount = getCPEMACCount(div,faciSeqNo);
                                if ($(headerId + 'gilKind').csList('selectedItem').IPQUANTITY != fixIPCount) {
                                    messageBox(options.language.IPNotSame, null, null,
                                               function () {
                                                   changeMode(div);
                                                   showSO111xCEA(div);
                                                   return;
                                               });
                                    return;
                                };                                
                            };
                            break;
                        };
                    case 106: {
                        var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                        if ($(headerId + 'gilKind').csList('codeNo') == '') {
                            messageBox(options.language.MustQt, null, null, function () {
                                changeMode(div);
                                return;
                            })
                            return;
                        };
                        if ($(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "CMBAUDRATE") == $(headerId + 'gilKind').csList('codeNo')) {
                            messageBox(options.language.QtDouble, null, null, function () {
                                changeMode(div);
                                return;
                            })
                            return;
                        };
                        break;
                    };
                    case 107: {
                        var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                        if ($(headerId + 'gilKind').csList('codeNo') == '') {
                            messageBox(options.language.MustQt, null, null, function () {
                                changeMode(div);
                                return;
                            })
                            return;
                        };
                        if ($(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "CMBAUDRATE") == $(headerId + 'gilKind').csList('codeNo')) {
                            messageBox(options.language.QtDouble, null, null, function () {
                                changeMode(div);
                                return;
                            })
                            return;
                        };
                        break;
                    };
                };
                if ($.isFunction(act)) { act() };
            };                   
        } catch (err) {            
            errorHandle(formName, 'isDataOK', err);
            changeMode(div);
        } finally {
            return;
        };
    };
    function getCPEMACCount(div, faciSeqno) {
        var options = $.data(div, formName).options;        
        try {
            var cpeMacCount = 0;
            if (options.wipDataCopy.CPEMAC != undefined) {
                var len = options.wipDataCopy.CPEMAC.rows.length;
                for (var i = 0 ; i < len; i++) {
                    if (options.wipDataCopy.CPEMAC.rows[i].SEQNO == faciSeqno) {
                        if (options.wipDataCopy.CPEMAC.rows[i].STOPDATE == null) {
                            cpeMacCount++;
                        };
                    }
                };
            };
            return cpeMacCount;
        } catch (err) {
            throw err;
        } finally {

        };
    }
    function chkDataOK(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            String.format = function () {
                var s = arguments[0];
                for (var i = 0; i < arguments.length - 1; i++) {
                    var reg = new RegExp("\\{" + i + "\\}", "gm");
                    s = s.replace(reg, arguments[i + 1]);
                }

                return s;
            }
            var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
            var faciWipStatus = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "FACIWIPSTATUS");
            if (options.language.Down == faciWipStatus || options.language.MoveDown == faciWipStatus
                    || options.language.Change == faciWipStatus) {
                if (options.sno == '') {
                    if (options.wipDataCopy.Wip != undefined) {
                        if (options.wipDataCopy.Wip.rows.length > 0) {
                            options.sno = options.wipDataCopy.Wip.rows[0].SNO;
                        };
                    };
                };
                if (options.sno == '') {
                    messageBox(options.language.NoSNo, null, null, function () {
                        changeMode(div);
                        return;
                    })
                    return;
                };
                if (options.showUi) {
                    options.faciSeqno = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO")
                };
                /*
                var parameters = $.extend(true, {}, options.loginInfo, {
                    SeqNo: { type: 'string', value: options.faciSeqno },
                    SNO: { type: 'string', value: options.sno }
                }); */
                var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                    SeqNo: { type: 'string', value: options.faciSeqno },
                    SNO: { type: 'string', value: options.sno }
                });
                var params = getParameters(riadllName,
                       riaClassName,
                       'ChkDataOK',
                       JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        try {
                            if (!data.ResultBoolean) {
                                messageBox(data.ErrorMessage, messageType.critical);
                                return;
                            }
                            else {
                                if (data.ErrorCode == -1) {
                                    messageBox(String.format(options.language.NotChangeFaci,
                                        $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "FACIWIPSTATUS")
                                        ), messageType.critical);
                                    return;
                                };

                            }
                        } catch (err) {
                            errorHandle(formName, 'chkDataOK-Server', err);
                        } finally {
                            if (!data.ResultBoolean) {
                                changeMode(div);
                            } else {
                                if ($.isFunction(act)) {
                                    act();
                                };
                            };
                            parameters = null;
                            param = null;
                            data = null;
                            delete parameters;
                            delete param;
                            delete dsChangeFacility;
                            delete data;

                        };
                    }
                });
            } else {
                if ($.isFunction(act)) {
                    act();
                };
            };
         
          
        } catch (err) {
            errorHandle(formName, 'chkDataOK', err);
        } finally {
            return;
        };
    };
    function getReInstFaci(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            if (options.showUi) {
                var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                options.faciSeqno = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO");
            };
            /*
            var parameters = $.extend(true, {}, options.loginInfo, {
                SNO: { type: 'string', value: options.sno },
                FaciSeqNo: { type: 'string', value: options.faciSeqno }
            }); */
            var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                SNO: { type: 'string', value: options.sno },
                FaciSeqNo: { type: 'string', value: options.faciSeqno },
                dsSourceWip: { type: 'string', value: options.wipDataCopy }
            });
            var params = getParameters(riadllName,
                   riaClassName,
                   'GetReInstFaci',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            if (options.showUi) {
                                messageBox(data.ErrorMessage, messageType.critical);
                                changeMode(div);
                               
                            } else {

                            };

                            return;


                        }
                        else {
                            var tmp = JSON.parse(data.ResultXML);
                            $.each(tmp, function (key, value) {
                                var len = value.rows.length;                                
                                for (var i = 0 ;i<len;i++) {
                                    var add = true;
                                    var len2 = options.wipDataCopy[key].rows.length;
                                    for (j = 0 ; j < len2; j++) {
                                        if (value.rows[i]['FACISNO'] == options.wipDataCopy[key].rows[j]['FACISNO']) {
                                            if (value.rows[i]['FACISNO'] != null) { add = false; break };
                                        }                                                                                
                                    };
                                    if (add) {
                                        options.wipDataCopy[key].rows.push(value.rows[i]);
                                    };
                                };
                            });
                            addChangeFaciTemp(div, act);
                            tmp = null;
                            delete tmp;
                           
                        };
                    } catch (err) {
                        errorHandle(formName, 'GetReInstFaci-Server', err);

                        changeMode(div);
                    } finally {
                        parameters = null;
                        param = null;
                        data = null;
                        delete parameters;
                        delete param;
                        delete data;
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'getReInstFaci', err);
        } finally {

        };
    };
    function autoAddMatain(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            /*
            if (options.showUi) {
                var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                options.faciSeqno = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO");
            }; */
         
            var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                SNO: { type: 'string', value: options.sno },
                FaciSeqNo: { type: 'string', value: options.autoFaciSeqNo }
            });
            var params = getParameters(riadllName,
                   riaClassName,
                   'GetMaintainFaci',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            if (options.showUi) {
                                messageBox(data.ErrorMessage, messageType.critical);
                            } else {

                            };

                            return;
                        }
                        else {
                            var tmp = JSON.parse(data.ResultXML);
                            $.merge(options.wipDataCopy.ChangeFacility.rows, tmp.ChangeFacility.rows)
                            tmp = null;
                            delete tmp;
                            if (options.showUi) {
                                addChangeFaciTemp(div, act);
                            } else {
                                if ($.isFunction(act)) {
                                    act();
                                };
                            }
                        };
                    } catch (err) {
                        errorHandle(formName, 'getMaintainFaci-Server', err);

                        changeMode(div);
                    } finally {
                        parameters = null;
                        param = null;
                        data = null;
                        delete parameters;
                        delete param;
                        delete data;
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'getMaintainFaci', err);
        } finally {

        };
    };
    function getMaintainFaci(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        
        try {
            if (options.showUi) {
                var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                options.faciSeqno = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO");
            };
            /*
            var parameters = $.extend(true, {}, options.loginInfo, {
                SNO: { type: 'string', value: options.sno },
                FaciSeqNo: { type: 'string', value: options.faciSeqno }               
            }); */
            var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                SNO: { type: 'string', value: options.sno },
                FaciSeqNo: { type: 'string', value: options.faciSeqno },
                dsSourceWip: {type:'string',value:options.wipDataCopy}
            });
            var params = getParameters(riadllName,
                   riaClassName,
                   'GetMaintainFaci',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            if (options.showUi) {
                                messageBox(data.ErrorMessage, messageType.critical);
                            } else {

                            };

                            return;
                        }
                        else {
                            var tmp = JSON.parse(data.ResultXML);
                            $.merge(options.wipDataCopy.ChangeFacility.rows, tmp.ChangeFacility.rows)
                            tmp = null;
                            delete tmp;
                            if (options.showUi) {
                                addChangeFaciTemp(div, act);
                            } else {
                                if ($.isFunction(act)) {
                                    act();
                                };
                            }                            
                        };
                    } catch (err) {
                        errorHandle(formName, 'getMaintainFaci-Server', err);

                        changeMode(div);
                    } finally {                        
                        parameters = null;
                        param = null;
                        data = null;
                        delete parameters;
                        delete param;
                        delete data;                                                
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'getMaintainFaci', err);
        } finally {

        };
    }
    function getPRFaci(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            if (options.showUi) {
                var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                options.faciSeqno = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO");
            };
            /*
            var parameters = $.extend(true, {}, options.loginInfo, {
                SNO: { type: 'string', value: options.sno },
                FaciSeqNo: { type: 'string', value: options.faciSeqno }
            }); */
            var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                SNO: { type: 'string', value: options.sno },
                FaciSeqNo: { type: 'string', value: options.faciSeqno },
                dsSourceWip: {type:'string',value:options.wipDataCopy}
            });
            var params = getParameters(riadllName,
                   riaClassName,
                   'GetPRFaci',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            if (options.showUi) {
                                messageBox(data.ErrorMessage, messageType.critical);
                                changeMode(div);

                            } else {

                            };

                            return;


                        }
                        else {
                            var tmp = JSON.parse(data.ResultXML);
                            $.each(tmp, function (key, value) {
                                var len = value.rows.length;
                                for (var i = 0 ; i < len; i++) {
                                    var add = true;
                                    var len2 = options.wipDataCopy[key].rows.length;
                                    for (j = 0 ; j < len2; j++) {
                                        if (value.rows[i]['FACISNO'] == options.wipDataCopy[key].rows[j]['FACISNO']) {
                                            if (value.rows[i]['FACISNO'] != null) { add = false; break };
                                        }
                                    };
                                    if (add) {
                                        options.wipDataCopy[key].rows.push(value.rows[i]);
                                    };
                                };
                            });
                            addChangeFaciTemp(div, act);
                            tmp = null;
                            delete tmp;

                        };
                    } catch (err) {
                        errorHandle(formName, 'getPRFaci-Server', err);

                        changeMode(div);
                    } finally {
                        parameters = null;
                        param = null;
                        data = null;
                        delete parameters;
                        delete param;
                        delete data;
                    };
                }
            });
           
        } catch (err) {
            errorHandle(formName, 'getPRFaci', err);
        } finally {

        };
    };
    function getMovePRFaci(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            if (options.showUi) {
                var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                options.faciSeqno = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO");
            };
            /*
            var parameters = $.extend(true, {}, options.loginInfo, {
                SNO: { type: 'string', value: options.sno },
                FaciSeqNo: { type: 'string', value: options.faciSeqno }
            }); */
            var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                SNO: { type: 'string', value: options.sno },
                FaciSeqNo: { type: 'string', value: options.faciSeqno },
                dsSourceWip: {type:'string',value:options.wipDataCopy}
            });
            var params = getParameters(riadllName,
                   riaClassName,
                   'GetMovePRFaci',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            if (options.showUi) {
                                messageBox(data.ErrorMessage, messageType.critical);
                                changeMode(div);

                            } else {

                            };

                            return;


                        }
                        else {
                            var tmp = JSON.parse(data.ResultXML);
                            $.each(tmp, function (key, value) {
                                var len = value.rows.length;
                                for (var i = 0 ; i < len; i++) {
                                    var add = true;
                                    var len2 = options.wipDataCopy[key].rows.length;
                                    for (j = 0 ; j < len2; j++) {
                                        if (value.rows[i]['FACISNO'] == options.wipDataCopy[key].rows[j]['FACISNO']) {
                                            if (value.rows[i]['FACISNO'] != null) { add = false; break };
                                        }
                                    };
                                    if (add) {
                                        options.wipDataCopy[key].rows.push(value.rows[i]);
                                    };
                                };
                            });
                            addChangeFaciTemp(div, act);
                            tmp = null;
                            delete tmp;

                        };
                    } catch (err) {
                        errorHandle(formName, 'getMovePRFaci-Server', err);

                        changeMode(div);
                    } finally {
                        parameters = null;
                        param = null;
                        data = null;
                        delete parameters;
                        delete param;
                        delete data;
                    };
                }
            });

        } catch (err) {
            errorHandle(formName, 'getMovePRFaci', err);
        } finally {
            
        };
    };

    function getServiceIdAndCitemCode(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            if (options.showUi) {
                var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                options.faciSeqno = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO");
            };
            /*
            var parameters = $.extend(true, {}, options.loginInfo, {
                CustId: { type: 'integer', value: options.custId },
                FaciSeqNo: { type: 'string', value: options.faciSeqno }
            }); */
            var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                CustId: { type: 'integer', value: options.custId },
                FaciSeqNo: { type: 'string', value: options.faciSeqno }
            });
            var params = getParameters(riadllName,
                   riaClassName,
                   'GetServiceIdAndCitemCode',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            if (options.showUi) {
                                messageBox(data.ErrorMessage, messageType.critical);
                                changeMode(div);

                            } else {

                            };

                            return;


                        }
                        else {
                            var tmp = JSON.parse(data.ResultXML);
                            $.each(tmp, function (key, tb) {
                                if (tmp[key].rows.length > 0) {
                                    options.riaChooseServiceID =tb.rows[0].ChooseServiceID;
                                    options.riaDelete003Citem = tb.rows[0].Delete003Citem;
                                };
                            });                          
                            tmp = null;
                            delete tmp;
                            if ($.isFunction(act)) { act(); };

                        };
                    } catch (err) {
                        errorHandle(formName, 'GetServiceIdAndCitemCode-Server', err);

                        changeMode(div);
                    } finally {
                        parameters = null;
                        param = null;
                        data = null;
                        delete parameters;
                        delete param;
                        delete data;
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'getServiceIdAndCitemCode', err);
        } finally {

        };

    };
    function getChangeFacility(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var wipTemp = { Table: {}};
        var inChangeFacility = { Table: {} };
        var faciRow = { Table: {} };
        var changeFacility = { Table: {} };
        var seqNo = '';
        var kindCode = -1;
        try {
            if (options.showUi) {
                var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                seqNo = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO");
            };
            if (seqNo == '') {
                if ($.isFunction(act)) { act() };
                return;
            };
            $.extend(true, wipTemp.Table, options.wipDataCopy.Wip);
            $.extend(true, inChangeFacility.Table, options.wipDataCopy.canChagneFaci);
            $.extend(true, faciRow.Table, options.wipDataCopy.canChagneFaci);
            $.extend(true, changeFacility.Table, options.wipDataCopy.ChangeFacility);
            inChangeFacility.Table.rows = $.grep(inChangeFacility.Table.rows, function () { return false });
            faciRow.Table.rows = $.grep(faciRow.Table.rows, function () { return false });
            $.each(options.wipDataCopy.canChagneFaci.rows, function (key, value) {
                if (value.SEQNO == seqNo) {
                    inChangeFacility.Table.rows.push(value);
                    faciRow.Table.rows.push(value);
                    return;
                };
            });
            kindCode = $(headerId + 'cboType').jqxDropDownList('getSelectedItem').value;
            /*
            var parameters = $.extend(true, {}, options.loginInfo, {
                Kind: { type: 'integer', value: kindCode },
                dtWipRow: { type: 'string', value: wipTemp },
                dtFaciRow: { type: 'string', value: faciRow },
                dtInChangeDataRow: { type: 'string', value: inChangeFacility },
                DeleteCitems: { type: 'string', value: options.riaDelete003Citem },
                ChooseServiceIDs: { type: 'string', value: options.riaChooseServiceID },
                dtChangeFacility: { type: 'string', value: changeFacility }
            }); */
            var parameters = $.extend(true, {}, getParaLoginInfo(div, formName), {
                Kind: { type: 'integer', value: kindCode },
                dtWipRow: { type: 'string', value: wipTemp },
                dtFaciRow: { type: 'string', value: faciRow },
                dtInChangeDataRow: { type: 'string', value: inChangeFacility },
                DeleteCitems: { type: 'string', value: options.riaDelete003Citem },
                ChooseServiceIDs: { type: 'string', value: options.riaChooseServiceID },
                dtChangeFacility: { type: 'string', value: changeFacility }
            });
            var params = getParameters(riadllName,
                   riaClassName,
                   'GetChangeFacility',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (!data.ResultBoolean) {
                            if (options.showUi) {
                                messageBox(data.ErrorMessage, messageType.critical);
                                changeMode(div);

                            } else {

                            };

                            return;


                        }
                        else {
                            var tmp = JSON.parse(data.ResultXML);
                            $.each(tmp, function (key, value) {
                                if (options.wipDataCopy[key] != undefined) {
                                    options.wipDataCopy[key].rows = $.grep(options.wipDataCopy[key].rows, function (row) { return false });
                                    var len = value.rows.length;
                                    for (var i = 0 ; i < len; i++) {
                                        options.wipDataCopy[key].rows.push(value.rows[i]);
                                    };                                    
                                };
                                if (tmp.Table != undefined) {
                                    options.wipDataCopy.ChangeFacility.rows = $.grep(options.wipDataCopy.ChangeFacility.rows, function (row) { return false; });
                                    var len = value.rows.length;
                                    for (var i = 0 ; i < len; i++) {
                                        options.wipDataCopy['ChangeFacility'].rows.push(value.rows[i]);
                                    };
                                };
                                //WriteChangeFacility
                                if (options.showUi) {
                                    
                                    $.each(options.wipDataCopy.ChangeFacility.rows, function (key, row) {
                                        if (row.SEQNO == seqNo ) {
                                            switch (kindCode) {
                                                case 104:
                                                case 105:
                                                    {
                                                        row['NCMBAUDNO'] = $(headerId + 'gilKind').csList('codeNo');
                                                        row['NCMBAUDRATE'] = $(headerId + 'gilKind').csList('description');
                                                        row['OCMBAUDNO'] = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "CMBAUDNO");
                                                        row['OCMBAUDRATE'] = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "CMBAUDRATE");
                                                        break;
                                                    };
                                                case 114:
                                                    {
                                                        var nIPAddressAry = [];
                                                        var nCPEMacAry = [];
                                                        var oIPAddressAry = [];
                                                        var oCPEMacAry = [];

                                                        if ($(headerId + 'gilKind').csList('codeNo') != '') {
                                                            row['NFixIPCount'.toUpperCase()] = $(headerId + 'gilKind').csList('selectedItem').IPQUANTITY;
                                                            row['ODynIPCount'.toUpperCase()] = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "DynIPCount".toUpperCase());
                                                        };
                                                        $.each(options.wipDataCopy.CPEMAC.rows, function (key,cpeRow) {
                                                            if (cpeRow.SEQNO == seqNo) {
                                                                if (cpeRow.STOPDATE == null) {
                                                                    if (cpeRow['IPAddress'.toUpperCase()] != null) {
                                                                        nIPAddressAry.push("'" + cpeRow['IPAddress'.toUpperCase()] + "'");
                                                                    };
                                                                    if (cpeRow['CPEMAC'.toUpperCase()] != null) {
                                                                        nCPEMacAry.push("'" + cpeRow['CPEMAC'.toUpperCase()] + "'");
                                                                    };
                                                                };
                                                            };
                                                        });
                                                        $.each(options.wipDataCopy.OCPEMAC.rows, function (key, oCpeRow) {
                                                            if (oCpeRow.SEQNO == seqNo) {
                                                                if (oCpeRow.STOPDATE == null) {
                                                                    if (oCpeRow['IPAddress'.toUpperCase()] != null) {
                                                                        oIPAddressAry.push("'" + oCpeRow['IPAddress'.toUpperCase()] + "'");
                                                                    };
                                                                    if (oCpeRow['CPEMAC'.toUpperCase()] != null) {
                                                                        oCPEMacAry.push("'" + oCpeRow['CPEMAC'.toUpperCase()] + "'");
                                                                    };
                                                                };
                                                            };
                                                        });
                                                        if (!(oIPAddressAry.toString() == nIPAddressAry.toString()) ||
                                                            !(oCPEMacAry.toString() == nCPEMacAry.toString())) {
                                                            if (oIPAddressAry.length > 0) { row['OCPEIPAddress'.toUpperCase()] = oIPAddressAry.toString() };
                                                            if (nIPAddressAry.length > 0) { row['NCPEIPAddress'.toUpperCase()] = nIPAddressAry.toString() };
                                                            if (oCPEMacAry.length > 0) { row['OCPEMAC'.toUpperCase()] = oCPEMacAry.toString() };
                                                            if (nCPEMacAry.length > 0) { row['NCPEMAC'.toUpperCase()] = nCPEMacAry.toString() };
                                                        };
                                                        nIPAddressAry.length = 0;
                                                        nCPEMacAry.length = 0;
                                                        oIPAddressAry.length = 0;
                                                        oCPEMacAry.length = 0;
                                                        break;
                                                    }
                                                case 106:
                                                case 107:
                                                    {
                                                        row['NDVRAuthSizeCode'.toUpperCase()] = $(headerId + 'gilKind').csList('selectedItem').DVRSIZE;
                                                        row['ODVRAuthSizeCode'.toUpperCase()] = $(headerId + 'gilKind').csList('description');
                                                        break;
                                                    };
                                            };
                                        };
                                       
                                    });
                                };
                              
                            });
                            addChangeFaciTemp(div, act);
                            tmp = null;
                            delete tmp;

                        };
                    } catch (err) {
                        errorHandle(formName, 'getPRFaci-Server', err);

                        changeMode(div);
                    } finally {
                        parameters = null;
                        param = null;
                        data = null;
                        delete parameters;
                        delete param;
                        delete data;
                    };
                }
            });
        } catch (err) {
            errorHandle(formName, 'getChangeFacility', err);
        } finally {
            wipTemp = null;
            inChangeFacility = null;
            faciRow = null;
            delete wipTemp;
            delete inChangeFacility;
            delete faciRow;
        };
    };
    function addChangeFaciTemp(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var result = false;
        try {
            var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
            var seqNo = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO");
            var item = $(headerId + 'cboType').jqxDropDownList('getSelectedItem');
            var len = options.wipDataCopy.canChagneFaci.rows.length;
            var smartCardNo = 'XX';
            for (var i = 0 ; i < len; i++) {
                if (options.wipDataCopy.canChagneFaci.rows[i].SEQNO == seqNo) {
                    options.wipDataCopy.facilityTemp.rows.push(options.wipDataCopy.canChagneFaci.rows[i]);                    
                    smartCardNo = options.wipDataCopy.canChagneFaci.rows[i].SMARTCARDNO;
                    break;
                };                
            };
            

            options.wipDataCopy.canChagneFaci.rows=  $.grep(options.wipDataCopy.canChagneFaci.rows, function (row) {
                return row.SEQNO != seqNo;
            });
            
            if (item.value == 201 || item.value == 202 || item.value == 304 || item.value == 308) {
                len = options.wipDataCopy.canChagneFaci.rows.length;
                for (var i = 0 ; i < len; i++) {
                    if (options.wipDataCopy.canChagneFaci.rows[i].FACISNO == smartCardNo) {
                        options.wipDataCopy.facilityTemp.rows.push(options.wipDataCopy.canChagneFaci.rows[i]);
                    };
                };
                options.wipDataCopy.canChagneFaci.rows = $.grep(options.wipDataCopy.canChagneFaci.rows, function (row) {
                    if (row.FACISNO == null) { return true };
                                             return row.FACISNO != smartCardNo;
                });
                len = options.wipDataCopy.canChagneFaci.rows.length;
                for (var i = 0 ; i < len; i++) {
                    if (options.wipDataCopy.canChagneFaci.rows[i].STBSNO == seqNo) {
                        options.wipDataCopy.facilityTemp.rows.push(options.wipDataCopy.canChagneFaci.rows[i]);
                    };
                };
                options.wipDataCopy.canChagneFaci.rows = $.grep(options.wipDataCopy.canChagneFaci.rows, function (row) {
                    return row.STBSNO != seqNo;
                });
            };
            /*
            $(headerId + 'grdNormal').jqxGrid('updatebounddata');
            $(headerId + 'grdChange').jqxGrid('updatebounddata'); */
            refreshGrid(div, act);
            
            result = true;
        } catch (err) {
            errorHandle(formName, 'addChangeFaciTemp', err);
        } finally {
        
            
        };
    };
    function changeFaci(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var item;
            var kindcode = -1;
            if (options.showUi) {
                item = $(headerId + 'cboType').jqxDropDownList('getSelectedItem');
                kindcode = item.value;
                
            } else {
                if (options.wipDataCopy.canChangeKind != undefined) {
                    if (options.wipDataCopy.canChangeKind.rows.length > 1) {
                        kindcode = options.wipDataCopy.canChangeKind.rows[0].KindCode;
                    };
                };
            };
            switch ( kindcode ) {
                case 201: {
                    getMaintainFaci(div, act);
                    break;
                };
                case 202: {                    
                    getReInstFaci(div, act);
                    break;
                };
                case 304: {
                    getPRFaci(div, act);
                    break;
                };
                case 308: {
                    getMovePRFaci(div, act);
                    break;
                };
                default: {
                    getServiceIdAndCitemCode(div, function ()
                        {
                        getChangeFacility(div, act)
                        });
                    break;
                };
            }

            //if ($.isFunction(act)) { act();};
        } catch (err) {
            errorHandle(formName, 'changeFaci', err);
        } finally {

        };
    };
    function btnChangeFaciClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        options.triggerChange = true;
        //var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
        try {
            if ($(this).jqxButton('disabled')) { return; };
            if ($.isEmptyObject($(headerId + 'grdNormal').jqxGrid('getrows'))) { return; };
            disableAllcontrol(event.data);
            unBindHandler(event.data);
            
            isDataOK(event.data,
                function () { chkDataOK(event.data, 
                    function () {
                        changeFaci(event.data ,
                            function () {
                                changeMode(event.data, function () {
                                    $(headerId + 'jqxTabs').csTabs({ selectedItem: 1 });
                                });
                                
                            })
                    })
                });
        } catch (err) {
            errorHandle(formName, 'btnChangeFaciClick', err);
        } finally {

        };
    };
    function delChangeFaciTemp(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var seqNo = '';
        var faciSNo = '';
        var smartCardNo = '';
        var stbSNo = '';
        if (options.showUi) {
            var rowindex = $(headerId + 'grdChange').jqxGrid('getselectedrowindex');
            if (rowindex == -1) {
                messageBox(options.language.selectChgFaci, messageType.critical );
                changeMode(div);
                return
            };
            seqNo = $(headerId + 'grdChange').jqxGrid('getcellvalue', rowindex, "SEQNO");
            if ($(headerId + 'grdChange').jqxGrid('getcellvalue', rowindex, "FACISNO") != undefined) {
                faciSNo = $(headerId + 'grdChange').jqxGrid('getcellvalue', rowindex, "FACISNO");
            };
            if ($(headerId + 'grdChange').jqxGrid('getcellvalue', rowindex, "SMARTCARDNO") != undefined) {
                smartCardNo = $(headerId + 'grdChange').jqxGrid('getcellvalue', rowindex, "SMARTCARDNO");
            };
            if ($(headerId + 'grdChange').jqxGrid('getcellvalue', rowindex, "STBSNO") != undefined) {
                stbSNo = $(headerId + 'grdChange').jqxGrid('getcellvalue', rowindex, "STBSNO");
            };
            var DVRarray = [];
            var ICCarray = [];
            var grdRows = $(headerId + 'grdChange').jqxGrid('getrows');
            if (smartCardNo != '') {
                
                for (var i = 0; i < grdRows.length; i++) {
                    if (grdRows[i].REFNO == 9) {
                        DVRarray.push(grdRows[i].SEQNO);
                    };
                    if (grdRows[i].FACISNO == smartCardNo) {
                        ICCarray.push(grdRows[i].SEQNO);
                    }
                };
                var DVRClong = $.merge([], DVRarray);
                var ICCClong = $.merge([], ICCarray);
                for (var i = 0; i < options.wipDataCopy.Facility.rows.length; i++) {
                    for (var j = 0; j < DVRClong.length; j++) {
                        if (options.wipDataCopy.Facility.rows[i].RESEQNO == DVRClong[j]) {
                            DVRarray.push(options.wipDataCopy.Facility.rows[i].SEQNO);
                        };
                    };
                    for (var j = 0; j < ICCClong.length; j++) {
                        if (options.wipDataCopy.Facility.rows[i].RESEQNO == ICCClong[j]) {
                            ICCarray.push(options.wipDataCopy.Facility.rows[i].SEQNO);
                        };
                    };
                    if (options.wipDataCopy.Facility.rows[i].RESEQNO == seqNo) {
                        ICCarray.push(options.wipDataCopy.Facility.rows[i].SEQNO);
                    };
                };
                grdRows.length = 0;
                grdRows = null;
                delete grdRows;
            } else {
                for (var i = 0; i < options.wipDataCopy.Facility.rows.length; i++) {
                    if (options.wipDataCopy.Facility.rows[i].RESEQNO == seqNo) {
                        ICCarray.push(options.wipDataCopy.Facility.rows[i].SEQNO);
                    }
                }
            };
            
        };
        if (seqNo == '') {
            changeMode(div);
            return;
        };
        
        var rwFacilityTemp = [];
        if (options.wipDataCopy.facilityTemp.rows.length > 0) {
            rwFacilityTemp = $.grep(options.wipDataCopy.facilityTemp.rows, function (row) {
                if (row.SEQNO == seqNo) { return true };
                if (row.FACISNO == smartCardNo) { return true; };
                if (row.stbSNo == seqNo) { return true; };
            });
            
        };
        var wipFacility = {};
        $.extend(true, wipFacility, options.wipDataCopy.Facility);
        try {
            if (rwFacilityTemp.length > 0) {                
                for (var i = 0; i < rwFacilityTemp.length; i++) {
                    options.wipDataCopy.facilityTemp.rows = $.grep(options.wipDataCopy.facilityTemp.rows,
                        function (row) {
                            return row.SEQNO != rwFacilityTemp[i]['SEQNO'];
                        });


                    options.wipDataCopy.canChagneFaci.rows = $.grep(options.wipDataCopy.canChagneFaci.rows,
                            function (row) {

                                return row.SEQNO != rwFacilityTemp[i]['SEQNO'];
                            });
                    
                    if (rwFacilityTemp[i].RESEQNO != undefined) {
                        
                    };

                    options.wipDataCopy.canChagneFaci.rows.push(rwFacilityTemp[i]);

                };
                
              
            } else {
                seqNo = '';
                if ($(headerId + 'grdChange').jqxGrid('getcellvalue', rowindex, "KIND") == options.language.ChangeInstall) {
                    var rwFaciRow = $.grep(options.wipDataCopy.Facility.rows, function (row) {
                        return row.SEQNO = $(headerId + 'grdChange').jqxGrid('getcellvalue', rowindex, "SEQNO");
                    });
                    if (rwFaciRow.length > 0) {
                        seqNo = rwFaciRow[0].RESEQNO;                        
                    };
                    var rwTmp = $.grep(options.wipDataCopy.facilityTemp.rows, function (row) {
                        if (row.SEQNO == seqNo) { return true };
                    });
                    if (rwTmp.length > 0) {
                        faciSNo = rwTmp[0].FACISNO;
                        options.wipDataCopy.canChagneFaci.rows.push(rwTmp[0]);
                        options.wipDataCopy.facilityTemp.rows = $.grep(options.wipDataCopy.facilityTemp.rows,
                           function (row) {
                               return row.SEQNO != seqNo;
                           });
                    };
                    rwTmp.length = 0;
                    rwTmp = null;
                    rwFaciRow.length = 0;
                    rwFaciRow = null;
                };
                
                if (seqNo == '') {
                    seqNo = $(headerId + 'grdChange').jqxGrid('getcellvalue', rowindex, "SEQNO");
                    var rwCount = $.grep(options.wipDataCopy.ChangeFacility.rows, function (row) {
                        return row.SEQNO = seqNo;
                    });
                    if (rwCount.length == 0) { seqNo = '' };
                    seqNo = rwCount[0].SEQNO;
                    faciSNo = rwCount[0].FACISEQNO;
                    rwCount.length = 0;
                    rwCount = null;
                };                              
            };
            if (seqNo != '') {
                $.each(options.wipDataCopy, function (tableName, table) {
                    switch (tableName.toUpperCase()) {
                        case "Facility".toUpperCase(): {
                            options.wipDataCopy[tableName].rows = $.grep(options.wipDataCopy[tableName].rows, function (row) {
                                return row.RESEQNO != seqNo;
                            });
                            for (var i = 0 ; i < rwFacilityTemp.length; i++) {
                                options.wipDataCopy[tableName].rows = $.grep(options.wipDataCopy[tableName].rows, function (row) {
                                    return row.RESEQNO != rwFacilityTemp[i].SEQNO;
                                });
                            }
                            break;
                        };
                        case "changeFacility".toUpperCase(): {
                            
                            var rwFacility = $.grep(wipFacility.rows, function (row) {
                                return true;
                            });
                            options.wipDataCopy[tableName].rows = $.grep(options.wipDataCopy[tableName].rows,
                               function (row) {
                                   var bln = true;
                                   if (row.SEQNO == seqNo) { bln = false; };                                   
                                   var len = rwFacility.length;
                                   for (var i = 0; i < len; i++) {
                                       if (DVRarray.length > 0) {
                                           if (row.SEQNO == rwFacility[i].SEQNO) { bln = false; };
                                           if (row.SEQNO == rwFacility[i].RESEQNO) { bln = false };
                                       } else {
                                           if (row.SEQNO == seqNo) { bln = false };
                                           if (row.RESEQNO == seqNo) { bln = false };                                           
                                       };                                       
                                   };

                                   if (row.FACISNO == smartCardNo) { bln = false };
                                   if (bln) {
                                       for (var i = 0; i < ICCarray.length; i++) {
                                           if (row.SEQNO == ICCarray[i]) { bln = false };
                                       }
                                   }
                                   if (!bln) {
                                       for (var i = 0; i < DVRarray.length; i++) {
                                           if (row.SEQNO == DVRarray[i]) { bln = true; };
                                       }
                                   }
                                   
                                   return bln;
                               });
                        };
                        case "PrFacility".toUpperCase(): {
                            
                            var rwFacility = $.grep(wipFacility.rows, function (row) {
                                //return row.RESEQNO == seqNo;
                                return true;
                                }); 
                            options.wipDataCopy[tableName].rows = $.grep(options.wipDataCopy[tableName].rows,
                                function (row) {
                                    var bln = true;
                                    if (row.SEQNO == seqNo) { bln = false };                                    
                                    var len = rwFacility.length;                                   
                                    for (var i = 0; i < len; i++) {
                                        if (DVRarray.length > 0) {
                                            if (row.SEQNO == rwFacility[i].SEQNO) { bln = false; };
                                            if (row.SEQNO == rwFacility[i].RESEQNO) { bln = false };
                                        } else {
                                            if (row.SEQNO == seqNo) { bln = false };
                                            if (row.RESEQNO == seqNo) { bln = false };

                                        };

                                    };
                                    if (row.FACISNO == smartCardNo) { bln = false };
                                    if (bln) {
                                        for (var i = 0; i < ICCarray.length; i++) {
                                            if (row.SEQNO == ICCarray[i]) { bln = false };
                                        }; 
                                    }
                                    if (!bln) {
                                        for (var i = 0; i < DVRarray.length; i++) {
                                            if (row.SEQNO == DVRarray[i]) { bln = true };
                                        };
                                    }
                                    
                                     return bln;
                                });                                                      
                            break;
                        };
                        case "CpeMac".toUpperCase() :{
                            //ClearSO004C
                            options.wipDataCopy[tableName].rows = $.grep(options.wipDataCopy[tableName].rows, function (row) {
                                return row.SEQNO != seqNo;
                            });
                            break;
                        }
                        case "OCPEMAC".toUpperCase(): {
                            var len = options.wipDataCopy[tableName].rows.length;
                            for (var i = 0; i < len; i++) {
                                var newRow = new Object(
                                {
                                    CUSTID: null,
                                    FACISNO: null,
                                    SEQNO: null,
                                    CPEMAC: null,
                                    IPADDRESS: null,
                                    STOPDATE: null,
                                    IPSN: null,
                                    UPDATETIIME: null
                                });
                                newRow.SEQNO = SEQNO
                                newRow.FACISNO = faciSNo;                                                                
                                newRow.CUSTID = optins.custId;
                                newRow.CPEMAC = options.wipDataCopy[tableName].rows[i].CPEMAC;
                                newRow.IPADDRESS = options.wipDataCopy[tableName].rows[i].IPADDRESS;
                                newRow.STOPDATE = options.wipDataCopy[tableName].rows[i].STOPDATE;
                                options.wipDataCopy.CPEMAC.rows.push(newRow);
                                delete newRow;
                            };                            
                            break;
                        };
                    };
                });
            }
            if ($.isFunction(act)) {
                act();
            };
            //alert('yes');
        } catch (err) {
            errorHandle(formName, 'delChangeFaciTemp', err);
            changeMode(div);
        } finally {
            rwFacilityTemp.length = 0;
            rwFacilityTemp = null;
            wipFacility = null;
            delete wipFacility;
        };
    };
    function btnCancelChangeClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        options.triggerChange = true;
        try {
            if ($(this).jqxButton('disabled')) { return; };
            if ($.isEmptyObject($(headerId + 'grdChange').jqxGrid('getrows'))) { return; };
            disableAllcontrol(event.data);
            unBindHandler(event.data);
            delChangeFaciTemp(event.data, function ()
                {
                refreshGrid(event.data, function ()
                    {
                    changeMode(event.data);
                    $(headerId + 'grdChange').jqxGrid({ selectedrowindex: 0 })
                    $(headerId + 'jqxTabs').csTabs({ selectedItem: 1 });
                    })
                }
            );
        } catch (err) {
            errorHandle(formName, 'btnCancelChangeClick', err);
        } finally {

        };
    };
    function grdChangeSelected(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        try {

            disableAllcontrol(event.data);
            unBindHandler(event.data);           
            refreshDelGrid(event.data, event.args.rowindex,  function () { changeMode(event.data) });
        } catch (err) {
            errorHandle(formName, 'grdChangeSelected', err);
        } finally {

        };
    }
    function grdDelChoiceChanged(event) {
        
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        var aryChangeServiceId = [];
        var aryChangeDeleteCitem = [];
        
        //var o = $(headerId + 'grdDelete003').jqxGrid('getcolumnproperty', 'CHOOSE', 'editable');
        unBindHandler(event.data);
        disableAllcontrol(event.data);
        var grdChangeSelectedrowindex = $(headerId + 'grdChange').jqxGrid('selectedrowindex');
        try {
            var grdChangeServiceId = $(headerId + 'grdChange').jqxGrid('getcellvalue', grdChangeSelectedrowindex, 'CHOOSESERVICEID');
            var grdChangeDeleteCitem = $(headerId + 'grdChange').jqxGrid('getcellvalue', grdChangeSelectedrowindex,  'DELETE003CITEM' );
            var seqno = $(headerId + 'grdChange').jqxGrid('getcellvalue', grdChangeSelectedrowindex,  'SEQNO' );
            if (grdChangeServiceId != undefined) {
                if (grdChangeServiceId != null) {
                    if (grdChangeServiceId != '') {
                        aryChangeServiceId = grdChangeServiceId.split(/[,]/);
                    };
                };                
            };
            if (grdChangeDeleteCitem != undefined) {
                if (grdChangeDeleteCitem != null) {
                    if (grdChangeDeleteCitem != '') {
                        aryChangeDeleteCitem = grdChangeDeleteCitem.split(/[,]/);
                    };
                };
            };
             if (event.args.newvalue) {
                 aryChangeServiceId.push($(headerId + 'grdDelete003').jqxGrid('getcellvalue', event.args.rowindex, 'SERVICEID').toString());
                 aryChangeDeleteCitem.push($(headerId + 'grdDelete003').jqxGrid('getcellvalue', event.args.rowindex, 'CITEMCODE').toString());
                 
             } else {
                 aryChangeServiceId = $.grep(aryChangeServiceId, function (value) { return value != $(headerId + 'grdDelete003').jqxGrid('getcellvalue', event.args.rowindex, 'SERVICEID').toString() });
                 aryChangeDeleteCitem = $.grep(aryChangeDeleteCitem, function (value) { return value != $(headerId + 'grdDelete003').jqxGrid('getcellvalue', event.args.rowindex, 'CITEMCODE').toString() });
             };
             $(headerId + 'grdChange').jqxGrid('setcellvalue', grdChangeSelectedrowindex, 'CHOOSESERVICEID', aryChangeServiceId.toString());
             $(headerId + 'grdChange').jqxGrid('setcellvalue', grdChangeSelectedrowindex, 'DELETE003CITEM', aryChangeDeleteCitem.toString());
             $.each(options.wipDataCopy.ChangeFacility.rows, function (index) {
                 if (options.wipDataCopy.ChangeFacility.rows[index].SEQNO == seqno) {
                     if (aryChangeDeleteCitem.length == 0) {
                         options.wipDataCopy.ChangeFacility.rows[index].DELETE003CITEM = null;
                     } else {
                         options.wipDataCopy.ChangeFacility.rows[index].DELETE003CITEM = aryChangeDeleteCitem.toString();
                     };
                     if (aryChangeServiceId.length == 0) {
                         options.wipDataCopy.ChangeFacility.rows[index].CHOOSESERVICEID = null;
                     } else {
                         options.wipDataCopy.ChangeFacility.rows[index].CHOOSESERVICEID = aryChangeServiceId.toString();
                     };
                 };
             })
             options.triggerChange = true;
        } catch (err) {
            options.triggerChange = false;
            errorHandle(formName, 'grdDelChoiceChanged', err);
        } finally {
            aryChangeServiceId.length = 0;
            aryChangeServiceId = null;
            changeMode(event.data);
        };
    };
    function unBindHandler(div) {
        var headerId = '#' + $(div).prop('id');
        //var options = $.data(div, formName).options;
        var options =$(div)[formName]('options');
        $(headerId + 'grdNormal').unbind('rowselect');
        $(headerId + 'cboType').unbind('select');
        $(headerId + 'btnChangeFaci').unbind('click');
        $(headerId + 'btnCancelChange').unbind('click');
        $(headerId + 'grdChange').unbind('rowselect');
        $(headerId + 'grdDelete003').unbind('cellvaluechanged');
        $(headerId + 'jqxTabs').unbind('selected');
        if (options.createKind) {
            $(headerId + 'gilKind').unbind('selectedIndexChanged');
        };
        
        /*
        $(headerId + 'grdNormal').off();
        $(headerId + 'cboType').off();
        $(headerId + 'btnChangeFaci').off();
        $(headerId + 'btnCancelChange').off();
        $(headerId + 'grdChange').off();
        $(headerId + 'grdDelete003').off();
        $(headerId + 'jqxTabs').off(); */
    };
    function showSO111xCEA(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if ($(headerId + 'grdNormal').jqxGrid('getrows').length <= 0 ) {return;};
        var CPEMAC = $.extend(true, {}, options.wipDataCopy.CPEMAC);
        var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
        var faciSeqNo = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO");
        var fixIPCount = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "FIXIPCOUNT");
        try {
            disableAllcontrol(div);
            if (fixIPCount == '' || fixIPCount == null) { fixIPCount = 0; };
            CPEMAC.rows = $.grep(CPEMAC.rows, function (row) {
                return row.SEQNO == faciSeqNo;
            });
            if ($(headerId + 'gilKind').csList('codeNo') != '') {
                fixIPCount = $(headerId + 'gilKind').csList('selectedItem').IPQUANTITY;
            };            
            var divName = 'div' + getUniqueId();
            var div2Name = 'div2' + getUniqueId();
            $('<div id="' + divName + '"><div>[ CPE MAC ]</div><div id="' + div2Name + '"></div></div>').appendTo('body');
            var divSO111xCEA = $('#' + divName);
            $(divSO111xCEA).csWindow($.extend({}, {
                width: 570, height: 370,
                maxWidth: 1028,
                maxHeight: 900,
                keyboardCloseKey: 'none',
                haveClosing: true
            }));
            var div2SO111xCEA = $('#' + div2Name);

            $(div2SO111xCEA).SO111xCEA($.extend({}, {
                //loginInfo: $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } }),
                loginInfo: $.extend({}, options.loginInfo),
                container: divSO111xCEA,
                CPEMAC: CPEMAC,
                fixIPCount: fixIPCount,
                faciSeqNo: faciSeqNo,
                editMode: editMode.append,
                localization:options.localization,
            }));
            $(divSO111xCEA).on('close', function (event) {
                try {
                    $(divSO111xCEA).unbind('close');
                    $(divSO111xCEA).off();
                    var ret = $(div2SO111xCEA).SO111xCEA('options');
                    options.wipDataCopy.CPEMAC.rows = $.grep(options.wipDataCopy.CPEMAC.rows, function (row) {
                        return row.SEQNO != faciSeqNo;
                    });
                    $.each(ret.CPEMAC.rows, function (index, row) {
                        options.wipDataCopy.CPEMAC.rows.push(row);
                    });
                    $(div2SO111xCEA).SO111xCEA('destroy');
                    $(divSO111xCEA).csWindow('destroy');
                } catch (err) {
                    errorHandle(formName, 'showSO111xCEA_close', err);
                } finally {
                    changeMode(div);
                }
               
            });
        } catch (err) {
            errorHandle(formName, 'showSO111xCEA', err);
        } finally {
            delete CPEMAC;
        };
    }
    function gilKindSelected(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        try {
            var kindCode = $(headerId + 'cboType').jqxDropDownList('getSelectedItem').value;
            if (kindCode == 114 ) {
                var rowindex = $(headerId + 'grdNormal').jqxGrid('getselectedrowindex');
                var faciSeqNo = $(headerId + 'grdNormal').jqxGrid('getcellvalue', rowindex, "SEQNO");
                var FixIPCount = 0;
                fixIPCount = getCPEMACCount(event.data, faciSeqNo);
                if (fixIPCount != $(headerId + 'gilKind').csList('selectedItem').IPQUANTITY) {
                    messageBox(options.language.IPNeedtodiff, messageType.information);
                    $(headerId + 'gilKind').csList('clearDisplayValue');
                    //showSO111xCEA(event.data);
                };
            };
            
        } catch (err) {
            errorHandle(formName, 'gilKindSelected', err);
        }
        finally {

        };
    }
    function btnCPEMACClick(event) {
        try {
            showSO111xCEA(event.data);
        } catch (err) {
            errorHandle(formName, 'btnCPEMACClick', err);
        } finally {
           
        };
    };
    function bindHandler(div) {
        var options = $.data(div, formName).options;
        try {
            var headerId = '#' + $(div).prop('id');
            $(headerId + 'grdNormal').unbind('rowselect');
            $(headerId + 'cboType').unbind('select');
            $(headerId + 'btnChangeFaci').unbind('click');
            $(headerId + 'btnCancelChange').unbind('click');
            $(headerId + 'grdChange').unbind('rowselect');
            $(headerId + 'grdDelete003').unbind('cellvaluechanged');
            $(headerId + 'jqxTabs').unbind('selected');
            if (options.createKind) {
                $(headerId + 'gilKind').unbind('selectedIndexChanged');
            };
            

            $(headerId + 'grdNormal').unbind('rowselect');
            $(headerId + 'cboType').unbind('select');
            $(headerId + 'btnChangeFaci').unbind('click');
            $(headerId + 'btnCancelChange').unbind('click');
            $(headerId + 'grdChange').unbind('rowselect');
            $(headerId + 'grdDelete003').unbind('cellvaluechanged');
            $(headerId + 'jqxTabs').unbind('selected');
            $(headerId + 'btnCPEMAC').unbind('click');

            $(headerId + 'grdNormal').bind('rowselect', div, grdNormalRowSelected);
            $(headerId + 'cboType').bind('select', div, cboTypeSelected);
            $(headerId + 'btnChangeFaci').bind('click', div, btnChangeFaciClick);
            $(headerId + 'btnCancelChange').bind('click', div, btnCancelChangeClick);
            $(headerId + 'grdChange').bind('rowselect', div, grdChangeSelected);
            $(headerId + 'grdDelete003').bind('cellvaluechanged', div, grdDelChoiceChanged);
            if (options.createKind) {
                $(headerId + 'gilKind').bind('selectedIndexChanged', div, gilKindSelected);
            };
            
            $(headerId + 'btnCPEMAC').bind('click', div, btnCPEMACClick);
            $(headerId +'jqxTabs').on('selected', function (event) {
                if (event.args.item == 1 ) {
                    try {
                        var position = $(headerId + 'grdChange').jqxGrid('scrollposition');
                        $(headerId + 'grdChange').jqxGrid('scrolloffset', 0, position.top);
                        position = $(headerId + 'grdDelete003').jqxGrid('scrollposition');
                        $(headerId + 'grdDelete003').jqxGrid('scrolloffset', 0, position.top);
                        if ($(headerId + 'grdChange').jqxGrid('selectedrowindex') == -1) {
                            $(headerId + 'grdChange').jqxGrid({ selectedrowindex: 0 });
                        };
                    } catch (err) {

                    } finally {

                    }                 
                } else {
    //                $(headerId + 'grdNormal').jqxGrid({ selectedrowindex: 0 });
                }
            });
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {
            return;
        };
    }
    function disableAllcontrol(div) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            options.tabSelectedItem = $(headerId + 'jqxTabs').csTabs('selectedItem');
            $(headerId + 'jqxTabs').csTabs('disable');
            $(headerId + 'cboType').jqxDropDownList({ disabled: true });
            $(headerId + 'btnChangeFaci').jqxButton({ disabled: true });
            $(headerId + 'btnCPEMAC').jqxButton({ disabled: true });
            $(headerId + 'btnCancelChange').jqxButton({ disabled: true });
            if (options.createKind) {
                $(headerId + 'gilKind').csList('disabled', true);
            };
            if (options.createKind2) {
                $(headerId + 'gilKind2').csList('disabled', true);
            };
            
            $(headerId + 'grdNormal').jqxGrid({ disabled: true });
            $(headerId + 'grdChange').jqxGrid({ disabled: true });
            $(headerId + 'grdDelete003').jqxGrid({ disabled: true });
            $(headerId + 'jqxTabs').csTabs({ selectedItem: options.tabSelectedItem });
        }
        catch (err) {
            errorHandle(formName, 'disableAllcontrol', err);
        };
    };
    function changeMode(div, act) {        
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        if (!options.showUi) { return; };
        try {           
            $(headerId + 'jqxTabs').csTabs({ disabled: false });
            $(headerId + 'cboType').jqxDropDownList({ disabled: false });
            $(headerId + 'btnChangeFaci').jqxButton({ disabled: false });
            $(headerId + 'btnCPEMAC').jqxButton({ disabled:false });
            $(headerId + 'btnCancelChange').jqxButton({ disabled: false });
            if (options.createKind) {
                $(headerId + 'gilKind').csList('disabled', false);
            };
            if (options.createKind2) {
                $(headerId + 'gilKind2').csList('disabled', false);
            };
            
            $(headerId + 'grdNormal').jqxGrid({ disabled: false });
            $(headerId + 'grdChange').jqxGrid({ disabled: false });
            $(headerId + 'grdDelete003').jqxGrid({ disabled: false });
            var flag = false;
            switch (options.editMode) {
                case editMode.append: { flag = true; break; };
                case editMode.edit: { flag = true; break; };
                default: { flag = false; break; };
            };
            $(headerId + 'btnChangeFaci').jqxButton({ disabled: !(flag && options.canDo) });
            $(headerId + 'btnCancelChange').jqxButton({ disabled: !(flag && options.canCancel) });
            if (!flag || !options.canDo) {
                $(headerId + 'grpKind').hide();
                $(headerId + 'grpKind2').hide();
                //
                //$(headerId + 'grpKind').show();
                //$(headerId + 'grpKind2').show();
                $(headerId + 'btnCPEMAC').hide();
            };
            $(headerId + 'jqxTabs').csTabs({ selectedItem: options.tabSelectedItem });
            
            if (options.triggerChange) {
                synSourceData(div);
            };
            //#7803 Auto add facility to the status of mataintain by kin 2018/06/05
            if (options.isAutoAddMatain) {
                options.isAutoAddMatain = false;
                var rows = $(headerId + 'grdNormal').jqxGrid('getrows');
                var isExec = false;
                if (rows != undefined) {
                    if (rows.length > 0) {
                        $.each(rows, function (index, value) {
                            if (value.SEQNO == options.autoFaciSeqNo) {
                                if (value.FACISTATUS.toString().indexOf(options.language.filterAutoMatain) < 0) {
                                    isExec = true;
                                    return;
                                } else {
                                    return;
                                };
                            };
                        });
                    };
                };
                if (isExec) {
                    var item = $(headerId + "cboType").jqxDropDownList('getItemByValue', 201);
                    if (item == undefined) { isExec = false };
                    isExec = true;
                };
                
                if (isExec) {
                    autoAddMatain(div, function () {
                        options.triggerChange = true;
                        if (options.triggerChange) {
                            options.triggerChange = false;
                            $(div).triggerHandler('changed');
                            //$(div).trigger('so111xdChanged');
                        };
                    });
                };
                
            };

            if ($.isFunction(act)) {
                act();
            };
        } catch (err) {
            errorHandle(formName, 'changeMode', err);
        } finally {

            unBindHandler(div);
            //$(headerId + 'grdNormal').jqxGrid({ selectedrowindex: 0 });
            
            if (options.triggerChange) {
               $(div).triggerHandler('changed');
                //$(div).trigger('so111xdChanged');
            };
            $(div).triggerHandler('refreshCompleted');
            bindHandler(div);
            options.triggerChange = false;
        };
    };
    function synSourceData(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            if (options.isWip) {
                $.each(options.wipData, function (key, obj) {
                    $.each(options.wipDataCopy, function (key2, obj2) {
                        if (key2.toUpperCase() == key.toUpperCase()) {
                            $.extend(options.wipData[key], options[key2]);
                        };
                    });
                });
                $.extend(options.wipData['ChangeFacility'], options.wipDataCopy['ChangeFacility']);
                //options.wipDataCopy.ChangeFacility.rows = options.wipDataCopy.changeFacilityCopy.rows;
                return;
            };
            
            $.each(options.parameters, function (key, obj) {
                $.each(options.wipDataCopy, function (key2, obj2) {
                    if (key.toUpperCase() == key2.toUpperCase()) {
                        $.extend(true, options.parameters[key], options.wipDataCopy[key2]);
                    };
                })
            });
            $.extend(options.wipData['ChangeFacility'], options.wipDataCopy['ChangeFacility']);
            //options.wipDataCopy.ChangeFacility.rows = options.wipDataCopy.changeFacilityCopy.rows;
            return;
        } catch (err) {
            errorHandle(formName, 'synSourceData', err);
        } finally {

        }
    }
    function formClosed(div) {
        var options = $.data(div, formName).options;
        /*
        var options = $.data(div, formName).options;
        if (options['closed']) {
            options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close'); */
        
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