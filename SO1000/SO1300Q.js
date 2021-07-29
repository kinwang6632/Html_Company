(function ($) {
    var formName = 'SO1300Q';
    var riadllName = 'CableSoft.SO.RIA.Building.Web.dll';
    var riaClassName = ' CableSoft.SO.RIA.Building.Web.dsBuilding';
    var copyLoginInfo = {};
    var grdAdpData = {};
    var paraTableName = 'building';
    var MduId = 'X';
    var SeqNo = "-1"    
    var windowsId = '';
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
            return canEdit(params, param2);
          
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
                            options: $.extend({}, new defaults(), new SO1300Q(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.SO1300Q_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO1300Q', err);
        }
    };
    function renderControl(div,action) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = '#' + $(div).prop('id');
        var grdColumns = [];
        var grdDatafields = [];
        var grdGroupCol = [];
        var fontSize = 13;
        fontSize = parseInt($($(options.container)[0]).css('font-size'));
        //-----------------------------------------------------------------------------
        $(headerId + "dtResvTime").csDateTime({
            formatString: 'yyyy/MM/dd HH:mm:ss',
            value: null,
            height: 25,
            showCalendarButton: true,
            width: 200
        });
        controls.push({ name: 'dtResvTime', type: 'csDateTime', level: 2 });
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------
        $(headerId + 'btnSave').jqxButton($.extend({}, imagePosition, {
            width: 90,
            height: 25,
            imgSrc: imageScr.save.imgSrc
        }));
        controls.push({ name: 'btnSave', type: 'jqxButton', level: 2 });
        $(headerId + 'btnSave > img').css('top', '2px');
       
        //-----------------------------------------------------------------------------
        //-----------------------------------------------------------------------------
        $(headerId + 'btnExit').jqxButton($.extend({}, imagePosition, {
            width: 90,
            height: 25,
            imgSrc: imageScr.exit.imgSrc
        }));
        controls.push({ name: 'btnExit', type: 'jqxButton', level: 2 });
        $(headerId + 'btnExit > img').css('top', '2px');
        //-----------------------------------------------------------------------------
        grdColumns.push({
            text: '#', sortable: false, filterable: false, editable: false,
            groupable: false, draggable: false, resizable: false,
            datafield: '', columntype: 'number', width: 30,
          
            cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                return "<div class='" +windowsId + formName +"rownum'  style='margin:6px;'>" + (value + 1) + "</div>";
            }
        });
       
        grdColumns.push({
            text: lang.colCUSTID,
            datafield: 'CUSTID',
            width: 90,
            editable: false,
            
            cellsalign: 'center',
            align: 'center',
           
        });
        grdColumns.push({
            text: lang.colCUSTNAME,
            datafield: 'CUSTNAME',
            width: 110,
            editable: false,
            cellsalign: 'center',
            align: 'center',
        })
        grdColumns.push({
            text: lang.colMAINCUST,
            datafield: 'MAINCUST',
            width: 70,
            editable: false,
            cellsalign: 'center',
            align: 'center',
            columntype: 'checkbox',
        })
      
        $.each(options.initData.SO001.columns, function (index, ary) {
            $.each(ary, function (key, value) {
                if (key.toUpperCase() == 'name'.toUpperCase()) {
                    switch (value) {
                        case 'custid'.toUpperCase():
                            grdDatafields.push({ name: 'CUSTID', type: 'integer' });
                            break;
                        case 'CUSTNAME'.toUpperCase():
                            grdDatafields.push({ name: 'CUSTNAME', type: 'string' });
                            break;
                        case 'MAINCUST'.toUpperCase():
                            grdDatafields.push({ name: 'MAINCUST', type: 'boolean' });
                            break;
                        case 'INSTADDRESS'.toUpperCase():
                            grdDatafields.push({ name: 'INSTADDRESS', type: 'string' });
                            break;
                        default:
                           
                            grdGroupCol.push({ text: value, name: value });
                            grdColumns.push({
                                text: value,
                                datafield: value,
                                width: (fontSize*value.length)-5,
                                editable: false,
                                cellsalign: 'center',
                                align: 'center',
                                //columntype:'custom',
                                createwidget: function (row, column, value, htmlElement) {
                                    var apparentWord = lang.normal;
                                    if (value[1] == '1') {
                                        apparentWord = lang.promotion;
                                    };                                 
                                    var aTop = '0px';
                                    var aLeft = '0px';
                                    var htmlString = "<div class='" + windowsId + formName + column.replace(/\s/g, '') +
                                            "checkValue' style='position: absolute;top:" + aTop + ";left:" + aLeft + ";'>" +
                                            "<span class='" + windowsId + formName + "showWord'>" + apparentWord + "</span></div>";
                                    var html = $(htmlString);
                                    $(htmlElement).append(html);
                                    html.jqxCheckBox({ checked: false });
                                    if (value[1] == '0') {
                                        html.jqxCheckBox({ disabled: true });
                                    }
                                    aTop = (($($(htmlElement)[0]).height() - $(html).height()) / 2).toString() + 'px';
                                    aLeft = (($($(htmlElement)[0]).width() - $(html).width()) / 2).toString() + 'px';
                                    $($(html)[0]).css({ top: aTop, left: aLeft });
                                    
                                    var index = function (div, row) {
                                        var custid = $($(div).parents().find('.' + windowsId + formName + 'custid')[row.boundindex]).text();
                                        var grdIndex = parseInt($($(div).parents().find('.' + windowsId + formName + 'rownum')[row.boundindex]).text());
                                        if (isNaN(grdIndex) && custid == '') { return NaN };
                                        if (!isNaN(grdIndex)) {
                                            if (options.initData.SO001.rows[grdIndex - 1]['CUSTID'].toString() == custid) {
                                                return grdIndex - 1;
                                            };
                                        };
                                        
                                        var length = options.initData.SO001.rows.length - 1
                                        for (var i = 0; i <= length; i++) {
                                            if (options.initData.SO001.rows[i]['custid'.toUpperCase()].toString() == custid) {
                                                return i;
                                            }
                                        };
                                    }(html, row);
                                    if (!isNaN(index)) {
                                        if (options.initData.SO001.rows[index][column][0] == '1') {
                                            html.jqxCheckBox({ checked: true });
                                        }
                                    }; 
                                    $(headerId + 'grdData').jqxGrid('scrolloffset', 0, 0); //for resizing csWindows
                                    
                                    html.unbind('click');                                    
                                    /*(html.click(function (event) {                                       
                                        if (event.args.checked) {
                                            value = '1' + value[1];
                                        } else { value = '0' + value[1]; }
                                        var grdIndex = parseInt($($(div).parents().find('.' + windowsId+ formName + 'rownum')[row.boundindex]).text());
                                        var index = function (div,row) {
                                            var custid = $($(div).parents().find('.' + windowsId + formName + 'custid')[row.boundindex]).text();
                                            
                                            if (options.initData.SO001.rows[grdIndex -1]['CUSTID'].toString() == custid) {
                                                return grdIndex -1;
                                            };
                                            var length = options.initData.SO001.rows.length - 1
                                            for (var  i = 0;  i <= length; i++) {
                                                if (options.initData.SO001.rows[i]['custid'.toUpperCase()].toString() == custid) {
                                                    return i;
                                                }
                                            };
                                        }(this,row);                                  
                                        options.initData.SO001.rows[index][column] = value;
                                       
                                    });                               */
                                    html.click(function (event) { 
                                        if ($(this).jqxCheckBox('checked')) {
                                            value = '1' + value[1];
                                        } else { value = '0' + value[1]; }
                                        var grdIndex = parseInt($($(div).parents().find('.' + windowsId + formName + 'rownum')[row.boundindex]).text());
                                        var index = function (div, row) {
                                            var custid = $($(div).parents().find('.' + windowsId + formName + 'custid')[row.boundindex]).text();

                                            if (options.initData.SO001.rows[grdIndex - 1]['CUSTID'].toString() == custid) {
                                                return grdIndex - 1;
                                            };
                                            var length = options.initData.SO001.rows.length - 1
                                            for (var i = 0; i <= length; i++) {
                                                if (options.initData.SO001.rows[i]['custid'.toUpperCase()].toString() == custid) {
                                                    return i;
                                                }
                                            };
                                        }(this, row);
                                        options.initData.SO001.rows[index][column] = value;

                                    });
                                },
                                initwidget: function (row, column, value, htmlElement) {                                    
                                    var chkBox = $(htmlElement).find('.' + windowsId + formName + column.replace(/\s/g, '') + 'checkValue');                                    
                                    var bln = false;
                                    if (options.initData.SO001.rows[row][column][0] == "1") {                                    
                                        bln = true;
                                    };
                                    if (value[1] == "1") {
                                        $($(chkBox)[0]).find("." + windowsId + formName + "showWord").text(lang.promotion);
                                        $(chkBox).jqxCheckBox({ disabled: false });
                                    } else {
                                        $($(chkBox)[0]).find("." + windowsId + formName + "showWord").text(lang.normal);
                                        $(chkBox).jqxCheckBox({ disabled: true });
                                    }

                                    if ($(chkBox).length > 0) {
                                        $(chkBox).jqxCheckBox({ checked: bln });
                                    } else {                                       
                                    };
                                    
                                 
                                },                               
                            }) 
                            grdDatafields.push({ name: value, type: 'string' });
                            break;
                    }
                };               
            });
        });
        grdColumns.push({
            text: lang.colINSTADDRESS,
            datafield: 'INSTADDRESS',
            width: 220,
            editable: false,
            cellsalign: 'left',
            align: 'left',
            //columntype: 'checkbox',
        })
        grdAdpData = {
            datatype: "json",
            datafields: grdDatafields,
            updaterow: function (rowid, rowdata, commit) {
                commit(true);
            },
        };

       
        
        //-----------------------------------------------------------------------------
       
        var dataAdapter1 = new $.jqx.dataAdapter(grdAdpData);
        grdAdpData.localdata = options.initData.SO001;
        dataAdapter1.dataBind();
        $(headerId + 'grdData').jqxGrid({
            width: '99.7%',
            height: '99%',
            sortable: true,
            altrows: true,
            editable: true,
            //groupable:true,
            source: dataAdapter1,
            //pageable: true,
            columnsresize: true,
            columns: grdColumns,
            columngroups:grdGroupCol,
            localization: options.localization,
            
        });
        // grdAdpData.localdata = $.extend({}, options.initData.Table);
        
        $(headerId + 'grdData').one("bindingcomplete", function (event) {
           
            $(this).jqxGrid('setcolumnproperty', 'CUSTID', 'cellclassname', function (row, columnfield, value) {
                return windowsId + formName + 'custid';
            });
            if ($.isFunction(action)) { action(); };
        })
        
        $(headerId + 'grdData').jqxGrid('updatebounddata');
        controls.push({ name: 'grdData', type: 'jqxGrid', level: 2 });
        //-----------------------------------------------------------------------------
     
    };
    function formDestroy(div) {
        try {

            var options = $.data(div, formName).options;
            var controls = $.data(div, formName).options.controls;
            var headerId = '#' + $(div).prop('id');                     
            MduId = 'X';
            SeqNo = "-1"    
            windowsId = '';
            unHandler(div);
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

            $.data(div, formName).options.language = null;
            delete $.data(div, formName).options.language;
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
        };
    };
    function unHandler(div, action) {
        var headerId = '#' + $(div).attr('id');
        $(headerId + 'btnSave').bind('click', div, btnOKClick);
        $(headerId + 'btnExit').unbind('click');
        $(headerId + 'grdData').unbind('columnresized');
        $(headerId + 'dtResvTime').off('focusin');
        /*
        $(headerId + 'btnOK').unbind('click', btnOKClick);
        $(headerId + 'btnExit').unbind('click'); */
    };
   
    function isDataOK(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var selectCount = 0;
        var result = true;
        if ($(headerId + 'dtResvTime').csDateTime('getText') == null) {
            messageBox(options.language.mustResvTime, messageType.information);
            result = false;
            return result;
        };
        $.each(options.initData.SO018A.rows, function (index, row) {
            selectCount = 0;
            $.each(options.initData.SO001.rows, function (index2, row2) {
                if (row2[row['ToColumnName'.toUpperCase()]][0] == '1') {
                    selectCount += 1
                };
            })
            if (row['Cnt'.toUpperCase()].toString() != selectCount.toString()) {
                var msg = options.language.warnigMsg;
                msg = msg.replace('{0}', row['ToColumnName'.toUpperCase()]);
                msg = msg.replace('{1}', selectCount);
                msg = msg.replace('{2}', row['Cnt'.toUpperCase()]);
                messageBox(msg , 
                                null, null, function (flag) {
                
                });

                result = false;
                return result
            }
            if (!result) { return result; };
        });
        return result;
    };
    function getSelectData(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var result = {};
        $.extend(true, result, options.initData.SO001);
        result.columns.push({ name: 'RESVTIME', type: 'string' });
        result.rows = [];
        var length = options.initData.SO001.rows.length - 1;
        var length2 = options.initData.SO018A.rows.length - 1;
        for (i = 0; i <= length; i++) {
            //haveSelect = false;
            for (j = 0; j <= length2; j++) {
                if (options.initData.SO001.rows[i][options.initData.SO018A.rows[j]['ToColumnName'.toUpperCase()]][0] == "1") {
                    var rw = $.extend(true, {}, options.initData.SO001.rows[i]);
                    rw.RESVTIME = $(headerId + "dtResvTime").csDateTime('getText');
                    result.rows.push(rw);
                    break;
                    //haveSelect = true;
                };
            };
        };

        return result;
    };
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event).attr('id');
        var ds = { Source: {}, SO018A: {}};
        if (isDataOK(event.data)) {
            var oSelectData = getSelectData(event.data);
            $.extend(true, ds.Source, oSelectData);
            $.extend(true, ds.SO018A, options.initData.SO018A);
            try {
                var parameters = $.extend({}, copyLoginInfo,
                   { dsSource: { type: 'string', value: ds } });

                var params = getParameters(riadllName,
                       riaClassName,
                       'SaveData',
                       JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        try {
                            if (data.ErrorCode == 0) {
                                messageBox(options.language.saveOk, messageType.information);                                                               
                            }
                            else {
                                messageBox(data.ErrorMessage, messageType.critical);

                            }
                        } catch (err) {
                            errorHandle(formName, 'SaveData-Server', err);

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
                errorHandle(formName, 'SaveData', err);                
            } finally {

            };
        }
        
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            $(headerId + 'grdData').on('columnresized', function (event) {
                var column = event.args.columntext;
                var newwidth = event.args.newwidth
                var o = $(this).find('.' + windowsId + formName + column.replace(/\s/g, '') + 'checkValue');
                if (o.length > 0) {
                    var aLeft = ((newwidth - $(o[0]).width()) / 2).toString() + 'px';
                    o.css({ left: aLeft });
                }
            });
            $(headerId + 'dtResvTime').off('focusin');
            $(headerId + 'dtResvTime').on('focusin', function () {
                if ($(this).csDateTime('getText') == null) {
                    $(this).csDateTime('setDate', Date.now());
                };                
            });
            $(headerId + 'btnSave').unbind('click');
            $(headerId + 'btnSave').bind('click', div, btnOKClick);
            $(headerId + 'btnExit').unbind('click');
            $(headerId + 'btnExit').bind('click', function () {                
                if ($(this).jqxButton('disabled')) { return; };
                if (options.containerIsWindow) {
                    $($.data(div, formName).options.container).csWindow('close');
                };
            }); 
         
            
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
                        windowsId = $(div)[0].id;
                        if (windowsId == undefined) {
                            windowsId = ''
                        };
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
    function canEdit(data, action) {

        try {
            //var copyLoginInfo = $(true, {}, data.loginInfo);
            var copyLoginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, copyLoginInfo,
              { MDUID: { type: 'string', value: data[paraTableName].rows[0]['MDUID'] } },
              { SEQNO: { type: 'string', value: data[paraTableName].rows[0]['SEQNO'] } });
        
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
    function QueryData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend({}, copyLoginInfo,
               { MDUID: { type: 'string', value: MduId } },
               { SEQNO: { type: 'string', value: SeqNo } });

            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryData',
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
                           
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        
                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryData-Server', err);
                        
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
            errorHandle(formName, 'QueryData', err);
            changeMode(div);
        } finally {

        };
    };
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        try {
            MduId = options.parameters[paraTableName].rows[0]["MDUID"];
            SeqNo = options.parameters[paraTableName].rows[0]["SEQNO"]
            QueryData(div, function () {
                changeLanguage(div);
                renderControl(div, function () {
                    addHandler(div);
                });
            });
            /*
            shouldRegPriv = false;
            options.isSaved = false;
            changeLanguage(div);
            renderControl(div);
            if (options.orderNo == '') {
                messageBox(options.language.NoDataQuery, messageType.critical);
                return;
            };
            chkReturnCode(div, function () {
                renderSO1118A5(div, function () {
                    addHandler(div, function () {
                    });
                });
            }); */
        } catch (err) {
            errorHandle(formName, 'initData', err);

        } finally {
            if ($.isFunction(action)) { action(); };
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