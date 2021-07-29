(function ($) {
    var formName = 'WipUtility';
    $.fn.WipUtility = function (options, param) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param);
                }
            }
            return;
        }
        catch (err) {
            errorHandle(formName, '$.fn.WipUtility', err);
        }
    };
    var methods = {
        chkCitemStatusOk: function (jq, params) {
            return chkCitemStatusOk(params);
        },
        getFaciPriv: function (jq, params) {
            return getFaciPriv(params);
        },
        getChargePriv: function (jq, params) {
            return getChargePriv(params);
        },
        getClosePriv: function (jq, params) {
            return getClosePriv(params);
        },
        getUserPriv: function (jq, params) {
            return getUserPrivX(params.groupId, params.privName, params.privData);
        }
    };
    //檢核收費是否已收或開發票
    function chkCitemStatusOk(charge) {
        try {
            var lang = new SO1111A().language;
            var cLength = charge.length;
            var errorMsg;
            for (var i = 0 ; i < cLength; i++) {
                //已收費
                if (charge.rows['UCCODE'] == null) {
                    errorMsg = lang.chargePayCheckChargeRange();
                }
                //已開發票
                if (charge.rows['GUINO'] != null) {
                    errorMsg = lang.chargePayCheckChargeRange();
                }
            }
            return [true, errorMsg];

        }
        catch (err) {
            errorHandle(formName, 'chkCitemStatusOk', err);
        }
    };
    function getFaciPriv(options) {
        try {
            var privName = '';
            switch (options.editMode) {
                case editMode.append:
                    privName = 'SO111' + options.wipType + 'H1';
                    break;
                case editMode.edit:
                    privName = 'SO111' + options.wipType + 'H2';
                    break;
                case editMode.delete:
                    privName = 'SO111' + options.wipType + 'H3';
                    break;
                case editMode.view:
                    return true;
            }
            return getUserPrivX(options.groupId, privName, options.privData);
        }
        catch (err) {
            errorHandle(formName, 'getFaciPriv', err);
        }
    };
    function getChargePriv(options) {
        try {
            var privName1 = '';
            var privName2 = '';
            switch (options.editMode) {
                case editMode.append:
                    privName1 = 'SO111' + options.wipType + 'B1';
                    privName2 = 'SO1144D1';
                    break;
                case editMode.edit:
                    privName1 = 'SO111' + options.wipType + 'B2';
                    privName2 = 'SO1144D2';
                    break;
                case editMode.delete:
                    privName1 = 'SO111' + options.wipType + 'B3';
                    privName2 = 'SO1144D3';
                    break;
                case editMode.view:
                    return true;
            }
            return (getUserPrivX(options.groupId, privName1, options.privData) &&
                (options.isOrder == false || getUserPrivX(options.groupId, privName2, options.privData)));
        }
        catch (err) {
            errorHandle(formName, 'getChargePriv', err);
        }
    };
    function getClosePriv(options) {
        try {
            var privRef = '';
            var privName = 'SO111' + options.wipType;
            var priv1 = getUserPrivX(options.groupId, privName + '61', options.privData);
            var priv2 = getUserPrivX(options.groupId, privName + '62', options.privData);
            var priv3 = getUserPrivX(options.groupId, privName + '63', options.privData);
            if (options.wipRefNo > 0) {
                if (options.wipRefNo <= 9) {
                    privRef = options.wipRefNo;
                }
                else {
                    privRef = String.fromCharCode('A'.charCodeAt() + (options.wipRefNo - 10));
                }
                priv1 = priv1 && getUserPrivX(options.groupId, privName + '61' + privRef, options.privData);
                priv2 = priv2 && getUserPrivX(options.groupId, privName + '62' + privRef, options.privData);
                priv3 = priv3 && getUserPrivX(options.groupId, privName + '63' + privRef, options.privData);
            }
            var finishPriv = (priv1 || priv2);
            var returnPriv = priv3;
            var shouldRegPriv = priv1;
            return [true, finishPriv, returnPriv, shouldRegPriv];
        }
        catch (err) {
            errorHandle(formName, 'getClosePriv', err);
        }
    };
    function getUserPrivX(groupId, privName, privData) {
        try {
            //if (groupId == 0) {
            //    return false;
            //}
            //else {
            var rows;
            if (Array.isArray(privData)) {
                rows = privData;
            }
            else {
                rows = privData.rows;
            }
            var pLength = rows.length;
            for (var i = 0 ; i < pLength; i++) {
                if (rows[i]['MID'] == privName) {
                    return (rows[i]['GROUPX'] == 1);
                }
            }
            return false;
            //}
        }
        catch (err) {
            errorHandle(formName, 'getUserPrivX', err);
        }
    };
})(jQuery);