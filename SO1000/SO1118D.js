(function ($) {
    var formName = 'SO1118D';
    var riadllName = 'CableSoft.SO.RIA.Wip.CallOk.Web.dll';
    var riaClassName = 'CableSoft.SO.RIA.Wip.CallOk.Web.CallOk';
    var orderTableName = "Order";
    $.fn[formName] = function (options, param, param2) {
        try {
            if (typeof options == 'string') {
                if (options == 'canEdit') {
                    return canEdit(param, param2);
                }
                else {
                    return $(this)['SO1118A'](options, param, param2);
                }
            }
            $.extend(options, { isOrder: true });
            $(this)['SO1118A'](options);
        }
        catch (err) {
            errorHandle(formName, '$.fn.' + formName, err);
        }
    };
    function canEdit(params, action) {
        try {
            var checkPara = checkParameters(editMode.view, params);
            if (checkPara[0] == false) {
                action(checkPara);
            }
            else {
                checkCanEdit(params, function (d) {
                    action([d.ResultBoolean, d.ErrorMessage]);
                });
            }
        }
        catch (err) {
            errorHandle(formName, 'canEdit', err);
        }
    };
    //檢核參數是否正確
    function checkParameters(em, data) {
        try {
            //檢核table 存不存在
            var table = data[orderTableName];
            if (table == null) return ([false, 'table ' + orderTableName + ' not exist!!']);
            //檢核欄位存不存在
            //新增檢核客戶編號
            if (table.rows[0]['CustId'.toUpperCase()] == null) {
                return ([false, 'column custId not exist!!']);
            }
            if (table.rows[0]['orderNo'.toUpperCase()] == null) {
                return ([false, 'column orderNo not exist!!']);
            }
            return ([true]);
        }
        catch (err) {
            errorHandle(formName, 'checkParameters', err);
        }
    };

    function checkCanEdit(data, action) {
        try {
            var order = getParametersTable(data, orderTableName);
            var paraLoginInfo = $.extend({}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
            var parameters = $.extend({}, cloneJSON(paraLoginInfo), {
                OrderNo: { type: 'string', value: data[order].rows[0]['OrderNo'.toUpperCase()] },
                IsReturn: { type: 'boolean', value: (data.refNo == 3) },
                WorkType: { type: 'int16', value: data.refNo }
            });
            var params = getParameters(riadllName,
                riaClassName,
                "CanEdit_Order",
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (d) {
                    action(d);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'checkCanEdit', err);
        }
    }
})(jQuery);