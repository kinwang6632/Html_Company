(function($) {
    var formName = 'csPrinting';
    var rptSvc = '';
    var rptIfraTag = 'rptIfra';
    var rptFormTag = 'rptForm';
    var rptParaTag = 'rptParam';
    var rptIfraID = '';
    var rptFormID = '';
    var rptParaID = '';
    var tgtFrmID;
    var ifraStyle = 'overflow: auto !important; height: 99%; width: 100%; border: currentColor; border-image: none; margin-top: 10px;';
    var opt;
    $.fn[formName] = function(options, param, param2) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, param2);
                }
                return;
            }
            options = options || {};
            return this.each(function() {
                var state = $.data(this, formName);
                if (state) {
                    $.extend(state.options, options);
                } else {
                    $.data(this, formName, {
                        options: $.extend({}, new defaults(), options)
                    });
                    init(this);
                }
            });
        } catch (err) {
            errorHandle(formName, '$.fn.csPrinting', err);
        }
    };
    var methods = {
        options: function(jq) {
            return $.data(jq[0], formName).options;
        },
        theme: function(jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        localization: function(jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        destroy: function(jq) {
            return jq.each(function() {
                destroy(this);
            });
        },
        GetReportConditionsSchema: function(jq) {
            return GetReportConditionsSchema();
        },
        PreviewReport: function(jq) {
            return PreviewReport($(jq)[0]);

        },
        PreviousReport: function(jq) {
            return PreviousReport($(jq)[0]);
        },
        Release: function(jq, action) {
            return Release($(jq)[0], action);
        }
    };
    var defaults = (function() {
        this.language = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.refNo = 0;
        this.parameters = {};
        this.controls = [];
        this.isSaved = false;
        this.theme = $.jqx.theme;
        this.initData = {};
        this.localization = null;
        this.container = null;
        this.actionType = 1;
        this.timeout = 1200;
        this.title = '';
        this.winRef;
    });
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, which) {
                return typeof args[which] != 'undefined' ? args[which] : match;
            });
        };
    }
    function init(div) {
        try {
            var opt = $.data(div, formName).options;
            renderControls(div);
            if (opt.actionType == 1) {
                PreviewReport(div);
            }
        } catch (err) {
            errorHandle(formName, 'init', err);
        }
    }
    function renderControls(div) {
        try {
            var cntr = $(div);
            var opt = $.data(div, formName).options;
            var language = opt.language;
            var parentID = $(div).prop('id');
            rptFormID = parentID + rptFormTag;
            rptParaID = parentID + rptParaTag;
            var rptContTag;
            var rptCont;
            var rptFile;
            var field = getParametersTable(opt.loginInfo.loginInfo.rows[0], 'ReportServicePath');
            rptSvc = opt.loginInfo.loginInfo.rows[0][field];
            rptFile = opt.parameters.Parameters.rows[0].REPORTFILE; // ['REPORTFILE']
            timeout = 1200 || opt.timeout;
            if (rptFile) {
                rptSvc += '?rptFile={0}'.format(rptFile);
            }
            if (timeout) {
                //rptSvc += '?timeout={0}&title={1}'.format(timeout, encodeURIComponent(opt.title));
                rptSvc += '&timeout={0}'.format(timeout);
            }
            console.log(rptSvc);
            rptIfraID = parentID + rptIfraTag;
            rptContTag =
                '<iframe name="{0}" id="{0}" style="{1}" width="100%" height="99%" frameBorder="0" scrolling="yes">' +
                '</iframe>' +
                '<form id="{2}" action="{3}" target="{0}" method="post" style="display:none;">' +
                '    <input type="hidden" name="ReportParams" id="{4}" />' +
                '</form>';
            rptCont = rptContTag.format(rptIfraID, ifraStyle, rptFormID, rptSvc, rptParaID);
            $(rptCont).appendTo(cntr);
        } catch (err) {
            errorHandle(formName, 'renderControls', err);
        }
    }
    function GetReportConditionsSchema(action) {
        try {
            //欄位名稱, 欄位描述, 欄位值一, 欄位值二, 文字顯示
            var condColsNam = ['FieldName', 'FieldDesc', 'Field1Value', 'Field2Value', 'DisplayText'];
            var condColsTyp = ['string', 'string', 'string', 'string', 'string'];
            var condColsLth = condColsNam.length;
            var condCols = [];
            for (var i = 0; i < condColsLth; i++) {
                condCols.push({
                    name: condColsNam[i].toUpperCase(),
                    type: condColsTyp[i]
                });
            }
            //程式代號, 功能代號, 報表名稱, 報表抬頭, 公司名稱
            //, DllName, ClassName, True, CondProgID, QueryProgID
            //, ReportProgID, 報表條件ReportCondition, IndexKey, False
            var paraColsNam = ['ProgramID', 'MID', 'ReportFile', 'ReportTitle', 'CompanyName',
                'DllName', 'ClassName', 'SaveResult', 'CondProgID', 'QueryProgID',
                'ReportProgID', 'ReportCondition', 'IndexKey', 'PreviousReport'
            ];
            var paraColsTyp = ['string', 'string', 'string', 'string', 'string',
                'string', 'string', 'boolean', 'string', 'string',
                'string', 'string', 'string', 'boolean'
            ];
            var paraColsLth = paraColsNam.length;
            var paraCols = [];
            for (var j = 0; j < paraColsLth; j++) {
                paraCols.push({
                    name: paraColsNam[j].toUpperCase(),
                    type: paraColsTyp[j]
                });
            }
            //公式名, 公式值
            var fomuColsNam = ['FormulaName', 'FormulaValue'];
            var fomuColsTyp = ['string', 'string'];
            var fomuColsLth = fomuColsNam.length;
            var fomuCols = [];
            for (var k = 0; k < fomuColsLth; k++) {
                fomuCols.push({
                    name: fomuColsNam[k].toUpperCase(),
                    type: fomuColsTyp[k]
                });
            }
            var schema = {
                Conditions: {
                    columns: condCols
                },
                Parameters: {
                    columns: paraCols
                },
                Formulas: {
                    columns: fomuCols
                }
            };
            action([true, schema]);
        } catch (err) {
            errorHandle(formName, 'GetReportConditionsSchema', err);
        }
    }
    function Release(div, action) {
        try {
            var iFra = $(div).find('#' + $(div).prop('id') + rptIfraTag); // rptIfraID
            if (iFra) {
                if (iFra.length > 0) {
                    var contWin = iFra[0].contentWindow;
                    if (contWin) {
                        //contWin.postMessage('ReleaseYourBrain', rptSvc.replace('CSReport.aspx', ''));
                        contWin.postMessage('ReleaseYourBrain' + ':' + $(div).prop('id'), rptSvc);
                        action(true);
                    }
                }
            }
        } catch (err) {
            errorHandle(formName, 'Release', err);
            action(false);
        }
    }
    function PreviewReport(div) {
        try {
            var cntr = $(div);
            var opt = $.data(div, formName).options;
            //$('#' + rptParaID).val(JSON.stringify(opt.parameters));
            $('#' + rptParaID).val(JSON.stringify($.extend({}, opt.loginInfo, opt.parameters)));
            $('#' + rptFormID).submit();
            if ($(opt.container).attr('class').indexOf('jqx-window') > 0) {
                $(opt.container).csWindow('open');
            }
        } catch (err) {
            errorHandle(formName, 'PreviewReport', err);
        }
    }
    function PreviousReport(div) {
        try {
            var opt = $.data(div, formName).options;
            $('#' + rptParaID).val(JSON.stringify($.extend({}, opt.loginInfo, opt.parameters)));
            $('#' + rptFormID).submit();
            if ($(opt.container).attr('class').indexOf('jqx-window') > 0) {
                $(opt.container).csWindow('open');
            }
        } catch (err) {
            errorHandle(formName, 'PreviousReport', err);
        }
    }
    function destroy(div) {
        try {
            if ($.data(div, formName) == null) {
                return;
            }
            var opt = $.data(div, formName).options;
            if (opt == null || opt.length == 0) {
                return;
            }
            var controls = opt.controls;
            destroyControls(controls);
            opt.length = 0;
            opt = null;
            $.data(div, formName, null);
            return true;
        } catch (err) {
            errorHandle(formName, 'destroy', err);
        }
    }
})(jQuery);
