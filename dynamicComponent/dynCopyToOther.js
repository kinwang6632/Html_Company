(function ($) {
    var formName = 'dynCopyToOther';
    var riadllName = 'CableSoft.RIA.Dynamic.DynamicUpdate.Web.dll';
    var riaClassName = 'CableSoft.RIA.Dynamic.DynamicUpdate.Web.DynamicUpdate';
    var defaults = (function () {
        this.language = {};        
        this.loginInfo = {};
        this.sysProgramId = '';        
        this.isAutoClosed = true;
        this.editMode = 0;
        this.parameters = {};
        this.controls = [];
        this.containerIsWindow = false;
        this.theme = '';
        this.localization = null;
        this.isSaved = false;
        this.copyLoginInfo = {};
        this.isExecute = false;
        this.isCoverData = false;
        this.selectedCompID = [];
        
    });
    function formClosed(div) {
        var options = $.data(div, formName).options;
        if (options['closed']) {
            //options['closed'](options.returnValue);
        }
        $(options['container']).csWindow('close');
    };
    function formResize(div) {
      
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

            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var controls = $.data(div, formName).options.controls;
            
            removeHandler(div);
            destroyControls(controls);
            deleteJSONObject(options);
            $(div).children().remove(); 
            /*
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
            }; */
            /*
            $(div).children().remove();
            $.data(div, formName).options = null;
            delete $.data(div, formName).options;
            $.data(div, formName).methods = null;
            delete $.data(div, formName).methods;
            $.data(div, formName).defaults = null;
            delete $.data(div, formName).defaults; */

        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        };
    };
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
              
        setTheme: function (jq, params) {
            return jq.each(function () {
                return parameter(jq[0], 'theme', params);
            });
        },
        resize: function (jq) {
            return jq.each(function () {
                formResize(this);
            });
        },
        theme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
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
    };
    $.fn.dynCopyToOther = function (options, param, param2) {
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
                    if ($.isEmptyObject(state)) { state = undefined; };
                    if (state) {
                        $.extend(state.options, options);
                    }
                    else {
                        $.data(this, formName, {
                            options: $.extend({}, new defaults(), new dynCopyToOther(), options)
                        });
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.dyCopyToOther', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.dynamicUpdate', err);
        }
    };
    function formLoaded(div) {
        var options = $.data(div, formName).options;
        options.copyLoginInfo = getParaLoginInfo(div, formName);
        try {
            loadForm(options,
              'dynamicComponent\\' + formName + '.html',
              function (msg) {
                  try {
                      $(div).html(msg);
                      changeElementId(div);
                      initData(div, options.editMode, function () {
                          $(div).triggerHandler('loaded', [this, options]);
                          if ($(options.container).attr('class') != undefined) {
                              if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                  options.containerIsWindow = true;

                              };
                          };

                      });
                  }
                  catch (err) {
                      errorHandle(formName, 'formLoaded_success', err);
                  }
              });



            //$.ajax({
            //    url: 'dynamicComponent\\' + formName + '.html',
            //    type: "get",
            //    datatype: 'html',
            //    success: function (msg) {
            //        try {
            //            $(div).html(msg);
            //            changeElementId(div);
            //            initData(div, options.editMode, function () {
            //                $(div).triggerHandler('loaded', [this, options]);
            //                if   ($(options.container).attr('class') != undefined ) {
            //                    if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
            //                        options.containerIsWindow = true;
                                 
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
        } catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
       
    };
    function winClosing(event) {

    };
    function queryCanChooseComp(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            var parameters = $.extend(true,{}, options.copyLoginInfo);

            var params = getParameters('CableSoft.RIA.Dynamic.DynUpdateGrid.Web.dll',
                   'CableSoft.RIA.Dynamic.DynUpdateGrid.Web.DynUpdateGrid',
                   'GetCompCode',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            tmp.Table.rows = $.grep(tmp.Table.rows, function (row, index) {                                
                                 return row.CODENO != options.loginInfo.loginInfo.rows[0].compcode;
                            });
                           

                            $(headerId + 'csmCompCode').csMulti('source', tmp.Table.rows);
                            delete tmp;
                            tmp = null;
                            if ($.isFunction(action)) { action(); };
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);

                        };
                    } catch (err) {
                        errorHandle(formName, 'queryCanChooseComp-Server', err);
                        
                    } finally {
                        parameters = null;
                        params = null;
                        delete parameters;
                        delete params;
                    };
                }
            });

        } catch (err) {
            errorHandle(formName, 'queryCanChooseComp', err);
           
        } finally {

        };
    };
    function initData(div, e, action) {
        var options = $.data(div, formName).options;
        try {
            changeLanguage(div);
            renderControl(div);
            
            if ($.isEmptyObject(options.parameters) && options.isExecute) {
                //noSource
                messageBox(options.language.noSource, messageType.critical);
            } else {
                queryCanChooseComp(div, function () {
                    addHandler(div);
                });
            };
            
            
        } catch (err) {
            errorHandle(formName, 'initData', err);
        } finally {
            if ($.isFunction(action)) { action(); };
        }
    };
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = '#' + $(div).prop('id');
        try {
            //-----------------------------------------------------------------------------            
            $(headerId + 'GroupBox1').jqxExpander({
                width: '100%',
                height: '95%',
                toggleMode: 'none',
                showArrow: false
            });
            controls.push({ name: $(div).prop('id')+'GroupBox1', type: 'jqxExpander', level: 1 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------
            $(headerId + 'csmCompCode').csMulti({
                //     source: data2,
                buttonText: options.language.csmCompCode,
                width: '99%',
                buttonWidth: 50,
                //widthDesc: 150,                                                
            });
            $(headerId + 'csmCompCode').csMulti('disabled', false);
            controls.push({ name: $(div).prop('id')+'csmCompCode', type: 'csMulti', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------            
            $(headerId + "optNoneCover").jqxRadioButton({ width: 120, height: 25, checked: true });
            controls.push({ name:$(div).prop('id')+ 'optNoneCover', type: 'jqxRadioButton', level: 2 });
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------            
            $(headerId + "optCover").jqxRadioButton({ width: 120, height: 25 });
            controls.push({ name:$(div).prop('id')+ 'optCover', type: 'jqxRadioButton', level: 2 });
            //-----------------------------------------------------------------------------
           
            //------------------------------------------------------------------------
            $(headerId + 'btnOK').jqxButton($.extend({}, imagePosition, {
                width: 75,
                height: 25,
                imgSrc: imageScr.ok.imgSrc
            }));
            controls.push({ name:$(div).prop('id')+ 'btnOK', type: 'jqxButton', level: 2 });
            $(headerId + 'btnOK > img').css('top', '2px');
            //------------------------------------------------------------------------
            //------------------------------------------------------------------------
            $(headerId + 'btnExit').jqxButton($.extend({}, imagePosition, {
                width: 75,
                height: 25,
                imgSrc: imageScr.exit.imgSrc
            }));
            controls.push({ name:$(div).prop('id')+ 'btnExit', type: 'jqxButton', level: 2 });
            $(headerId + 'btnExit > img').css('top', '2px');
            //------------------------------------------------------------------------
        } catch (err) {
            errorHandle(formName, 'renderControl', err);
        }
    };
    function recoverAllControl(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnOK').jqxButton({ disabled: false });
        $(headerId + 'btnExit').jqxButton({ disabled: false });
        $(headerId + 'optNoneCover').jqxRadioButton({ disabled: false });
        $(headerId + 'optCover').jqxRadioButton({ disabled: false });
        $(headerId + 'csmCompCode').csMulti('disabled', false);
    };

    function disableAllControl(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnOK').jqxButton({ disabled: true });
        $(headerId + 'btnExit').jqxButton({ disabled: true });
        $(headerId + 'optNoneCover').jqxRadioButton({ disabled: true });
        $(headerId + 'optCover').jqxRadioButton({ disabled: true });
        $(headerId + 'csmCompCode').csMulti('disabled', true);
    };
    function removeHandler(div, action) {
        var headerId = '#' + $(div).prop('id');
        $(headerId + 'btnOK').off('click');
        $(headerId + 'btnExit').off('click');
    };
    function addHandler(div, action) {
        
        var headerId = '#' + $(div).prop('id');
        try {
            $(headerId + 'btnOK').off('click');
            $(headerId + 'btnOK').on('click', div, btnOKClick);
            $(headerId + 'btnExit').off('click');
            $(headerId + 'btnExit').on('click', div, btnExitClick);
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
        } finally {

        };
    };
    function btnExitClick(event) {
        var options = $.data(event.data, formName).options;
        if ($(this).jqxButton('disabled')) { return; };
        if (options.containerIsWindow) {
            $($.data(event.data, formName).options.container).csWindow('close');
        };
    };
    function btnOKClick(event) {
        var options = $.data(event.data, formName).options;
        var headerId = '#' + $(event.data).prop('id');
        if ($(this).jqxButton('disabled')) { return; };
        try {
            //getChooseList
            var o = $(headerId + 'csmCompCode').csMulti('getChooseList');
            if (o == '') {
                'mustChooseComp'
                messageBox(options.language.mustChooseComp, messageType.critical);
            } else {
                options.isSaved = true;
                if (options.isExecute) {
                    //disableAllControl(event.data);
                    executeCopy(event.data, function () { recoverAllControl(event.data); });
                } else {
                    var o = $(headerId + 'csmCompCode').csMulti('getChooseList');
                    $.each(o.split(','), function (index, value) {
                        options.selectedCompID.push(value);
                    });
                   options.isCoverData = $(headerId + 'optCover').jqxRadioButton('checked');
                    if (options.containerIsWindow) {
                        $($.data(event.data, formName).options.container).csWindow('close');
                    };
                };
                
            };
            
        } catch (err) {
            errorHandle(formName, 'btnOKClick', err);
        } finally {

        }
    };
    function executeCopy(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var isCoverData = false;
        var ds = {
            SELECTEDCOMP: {
                columns: [{ name: 'COMPID', type: 'integer' }                    
                ],
                rows: []
            }
        };
        isCoverData = $(headerId + 'optCover').jqxRadioButton('checked');
        
        try {
            var o = $(headerId + 'csmCompCode').csMulti('getChooseList');
            $.each(o.split(','), function (index, value) {                
                ds.SELECTEDCOMP.rows.push({ COMPID: parseInt(value) });
            });
            try {
                var parameters = $.extend({}, options.copyLoginInfo,
                    { sysProgramId: { type: 'string', value: options.sysProgramId } },
                    { IsCover: { type: 'boolean', value: isCoverData } },
                    { dsSource: { type: 'string', value: $.extend({}, options.parameters ) } },
                    { dsCopyComps: { type: 'string', value: ds } });

                var params = getParameters(riadllName,
                       riaClassName,
                       'CopyToOtherDB',
                       JSON.stringify(parameters));
                getServerData(params, {
                    success: function (data) {
                        try {
                            if (data.ErrorCode == 0) {
                                if (data.ResultXML != '') {
                                    messageBox(data.ResultXML, messageType.information);
                                } else {
                                    messageBox(options.language.CopyOK, messageType.critical);
                                };                               
                                if ($.isFunction(action)) { action(); };
                            }
                            else {
                                messageBox(data.ErrorMessage, messageType.critical);

                            };
                            delete data;
                            data = null;
                        } catch (err) {
                            errorHandle(formName, 'CopyToOtherDB-Server', err);

                        } finally {
                            parameters = null;
                            params = null;
                            delete parameters;
                            delete params;
                        };
                    }
                });

            } catch (err) {
                errorHandle(formName, 'queryCanChooseComp', err);

            } finally {

            };

        } catch (err) {
            if ($.isFunction(action)) { action(); };
            errorHandle(formName, 'executeCopy', err);
            
        } finally {
            delete ds;
            ds = null;
        };

    }
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var idArray = $('*[id^=' + $(div).prop('id') + ']');

        try {
            idArray.each(function (index, value) {
                var idStr = $(value).attr('id');
                if (idStr.indexOf('csmCompCode') >= 0) { return };
               
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