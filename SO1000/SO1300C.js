(function ($) {
    var formName = 'SO1300C';
    var riadllName = 'CableSoft.SO.RIA.Building.Web.dll';
    var riaClassName = ' CableSoft.SO.RIA.Building.Web.dsBuilding';
    var copyLoginInfo = {};
    var paraTableName = 'building';
    var iSec_1Loaded = false;
    var iSec_2Loaded = false;
    var iSec_3Loaded = false;
    var iSec_4Loaded = false;
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
        resize: function (jq, params) {
            return jq.each(function () {
                formResize(this, params);
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
                            options: $.extend({}, new defaults(), new SO1300C(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1300C_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1300C', err);
        }
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        
        var headerId = '#' + $(div).prop('id');
        try {
            //-----------------------------------------------------------------------------
            $(headerId + "csServiceType").csList({
                source: null,
                codeNoWidth: 50,
                width: '220px',
                height: '25px',
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
            controls.push({ name: 'csServiceType', type: 'csList', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'TabControl1').csTabs({
                width: '99.8%',
                height: '95%',
                scrollable: true
            });
            controls.push({ name: 'TabControl1', type: 'csTabs', level: 1 });
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            $(headerId + 'btnQuit').jqxButton($.extend({}, imagePosition, {
                width: 70,
                height: 25,
                imgSrc: imageScr.exit.imgSrc
            }));
            controls.push({ name: 'btnQuit', type: 'jqxButton', level: 2 });
            //-----------------------------------------------------------------------------     
            
           
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        } finally {

        }; 
    };
    function formResize(div, params) {
        try {
            var options = $.data(div, formName).options;
            var controls = options.controls;
            var msg = "";
            for (var i = 0; i < controls.length; i++) {
                var o = $('#' + controls[i].name);
                o.each(function () {
                    $(this)[controls[i].type]('resize');
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
    };
    function formDestroy(div) {
        try {

            var options = $.data(div, formName).options;
            var controls = $.data(div, formName).options.controls;
            var headerId = '#' + $(div).prop('id');          
            unHandler(div);
            if (iSec_1Loaded) {
                $(headerId + 'iSec_1').dynamicGrid('destroy');
            };
            if (iSec_2Loaded) {
                $(headerId + 'iSec_2').dynamicGrid('destroy');
            };
            if (iSec_3Loaded) {
                $(headerId + 'iSec_3').dynamicGrid('destroy');
            };
            if (iSec_4Loaded) {
                $(headerId + 'iSec_4').dynamicGrid('destroy');
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
           
            iSec_1Loaded = false;
            iSec_2Loaded = false;
            iSec_3Loaded = false;
            iSec_4Loaded = false;
            deleteJSONObject(options);
            $(div).children().remove();
            /*
            $.data(div, formName).options.language = null;
            delete $.data(div, formName).options.language;
            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults;           
            $(div).children().remove(); */


        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        };
    };
    function unHandler(div, action) {
        var headerId = '#' + $(div).attr('id');
        var options = $.data(div, formName).options;
        if (options.containerIsWindow) {
            $(options.container).unbind('resized');
        };
        $(headerId + 'TabControl1').unbind('resize');
        $(headerId + 'csServiceType').unbind('selectedIndexChanged');
        $(headerId + 'btnQuit').unbind('click');
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'csServiceType').unbind('selectedIndexChanged');
            $(headerId + 'csServiceType').on('selectedIndexChanged', function () {
                renderDynGrid(div, function () {
                    
                });
            });
            $(headerId + 'TabControl1').unbind('resize');
            $(headerId + 'TabControl1').on('resize', function () {
                var selectedItem = $(headerId + 'TabControl1').jqxTabs('selectedItem');
                selectedItem += 1;
                $(headerId + 'iSec_' + selectedItem).dynamicGrid('resize', { height: $(headerId + 'iSec_' + selectedItem).height });
            });
            $(headerId + 'btnQuit').unbind('click');
            $(headerId + 'btnQuit').on('click', function () {
                if (options.containerIsWindow) {
                    $(options['container']).csWindow('close');
                };
            });

            if (options.containerIsWindow) {
                $(options.container).unbind('resized');
                $(options.container).on('resized', function (event) {
                    var selectedItem = $(headerId + 'TabControl1').jqxTabs('selectedItem');
                    selectedItem += 1;
                    $(headerId + 'iSec_' + selectedItem).dynamicGrid('resize', { height: $(headerId + 'iSec_' + selectedItem).height() });
                })
            };
           
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        }
    };
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            copyLoginInfo = getParaLoginInfo(div, formName);
            $.ajax({
                url: 'SO1000\\' + formName + '.html',
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
            });
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');

        try {
            if ($.isEmptyObject(options.parameters)) {
                messageBox(options.language.NoInData, messageType.critical);
                return;
            };
            if (options.parameters[paraTableName] == undefined) {
                messageBox(options.language.NoInData, messageType.critical);
                return;
            };
            if (options.parameters[paraTableName].rows.length == 0) {
                messageBox(options.language.NoDataByBuilding, messageType.critical);
                return;
            };
            changeLanguage(div);
            renderControl(div);
            load_data(div, function () {
                renderDynGrid(div, function () {
                    addHandler(div);
                });
            });
          
        } catch (err) {
            errorHandle(formName, 'initData', err);

        } finally {
            if ($.isFunction(action)) { action(); };
        }
    };
    function renderDynGrid(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            
            if ($(headerId + 'csServiceType').csList('codeNo') == '') { return; };                        
            if (iSec_1Loaded) {
                for (i = 1; i < 4; i++) {
                    $(headerId + 'iSec_' + i).dynamicGrid('destroy');
                };
            };                        
            var ds = { building: {} };
            $.extend(true, ds.building, options.parameters[paraTableName]);
            ds.building.rows[0]['ServiceType'.toUpperCase()] = $(headerId + 'csServiceType').csList('codeNo');
            $(headerId + 'iSec_1').one('loaded', function () {
                iSec_1Loaded = true;
            });
            $(headerId + 'iSec_2').one('loaded', function () {
                iSec_2Loaded = true;
            });
            $(headerId + 'iSec_3').one('loaded', function () {
                iSec_3Loaded = true;
            });
            $(headerId + 'iSec_4').one('loaded', function () {
                iSec_4Loaded = true;
            });
            $(headerId + 'iSec_1').dynamicGrid({                               
                loginInfo: $.extend(true,{}, options.loginInfo),
                container: $(headerId + 'iSec_1'),
                width: $(headerId + 'iSec_1').width()-10,
                height:$(headerId + 'iSec_1').height()-10,
                sysProgramId: 'SO1300C1',                
                parentData: ds,                
                localization: options.localization,
            });
            
            $(headerId + 'iSec_2').dynamicGrid({
                loginInfo: $.extend(true, {}, options.loginInfo),
                container: $(headerId + 'iSec_2'),
                sysProgramId: 'SO1300C2',
                parentData: ds,
                localization: options.localization,
            });
            $(headerId + 'iSec_3').dynamicGrid({
                loginInfo: $.extend(true, {}, options.loginInfo),
                container: $(headerId + 'iSec_3'),
                sysProgramId: 'SO1300C3',
                parentData: ds,
                localization: options.localization,
            });
            $(headerId + 'iSec_4').dynamicGrid({
                loginInfo: $.extend(true, {}, options.loginInfo),
                container: $(headerId + 'iSec_4'),
                sysProgramId: 'SO1300C4',
                parentData: ds,
                localization: options.localization,
            });   
            if ($.isFunction(action)) { action(); };
        } catch (err) {
            errorHandle(formName, 'renderDynGrid', err);
        } finally {

        };
    };
    function load_data(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {

            var parameters = $.extend({}, copyLoginInfo);

            var params = getParameters(riadllName,
                   riaClassName,
                   'Query_CD046',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var d = JSON.parse(data.ResultXML);
                            $(headerId + 'csServiceType').csList('source', d.Table.rows);
                            $(headerId + 'csServiceType').csList('codeNo', 'C');                           
                            delete d;
                            d = null;
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        };

                    } catch (err) {
                        errorHandle(formName, 'Query_CD046-Server', err);
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
            errorHandle(formName, 'load_data', err);

        } finally {

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