var chargeUtilityName = "chargeUtility";
//身分證檢核
function IDVerify(id) {
    try {
        var lang = new utility().language;
        if (id.length !== 10) {
            return [false, lang.IDLengthMustBe];
        }
        if (id.substr(0, 1).charCodeAt(0) < 65 || id.substr(0, 1).charCodeAt(0) > 90) {
            return [false, lang.IDFirstWordMustBe];
        }
        tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO"
        A1 = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
        A2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
        Mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);

        if (id.length != 10) return [false, lang.IDError];
        i = tab.indexOf(id.charAt(0));
        if (i == -1) return [false, lang.IDError];
        sum = A1[i] + A2[i] * 9;

        for (i = 1; i < 10; i++) {
            v = parseInt(id.charAt(i));
            if (isNaN(v)) return [false, lang.IDError];
            sum = sum + v * Mx[i];
        }
        if (sum % 10 != 0) {
            return [false, lang.IDError];
        }
        else {
            return [true];
        }
    }
    catch (err) {
        errorHandle(chargeUtilityName, 'IDVerify', err);
    }
};

//統一編號檢核
function invNoVerify(taxId) {
    try {
        var lang = new utility().language;
        if (taxId.length !== 8) {
            return [false, lang.invIDLengthMustBe];
        }
        var invalidList = "00000000,11111111";
        if (/^\d{8}$/.test(taxId) == false || invalidList.indexOf(taxId) != -1) {
            return [false, lang.invIDError];
        }

        var validateOperator = [1, 2, 1, 2, 1, 2, 4, 1],
            sum = 0,
            calculate = function (product) { // 個位數 + 十位數
                var ones = product % 10,
                    tens = (product - ones) / 10;
                return ones + tens;
            };
        for (var i = 0; i < validateOperator.length; i++) {
            sum += calculate(taxId[i] * validateOperator[i]);
        }
        var ok = sum % 10 == 0 || (taxId[6] == "7" && (sum + 1) % 10 == 0);
        if (ok != true) {
            return [ok, lang.invIDError];
        }
        else {
            return [ok];
        }
    }
    catch (err) {
        errorHandle(chargeUtilityName, 'invNoVerify', err);
    }
};
///訊息種類
var creditCardType = {
    VISA: 0,
    MASTER: 1,
    JCB: 2,
    NCC: 3,
    AE: 4,
    DC: 5
};

//信用卡檢核
function creditCardVerify(type, accountId) {
    try {
        //'(1)	Type = 1 (VISA): 長度必須為 16, 且第1碼必需為4。
        //'(2)	Type = 2 (MASTER): 長度必須為 16, 且第1碼必需為5。
        //'(3)	Type = 3 (JCB): 長度必須為 16, 且第1碼必需為3。
        //'(4)	Type = 4 (聯合信用卡):。
        //'(5)	Type = 5 (美國運通卡): 長度必須為 15。
        //'(6)	Type = 6 (大來卡): 長度必須為 14。
        var lang = new utility().language;
        switch (type) {
            case creditCardType.VISA:
                if (accountId.length !== 16 || accountId.toString().substr(0, 1) !== '4') {
                    return [false, lang.VISAError];
                }
                break;
            case creditCardType.MASTER:
                if (accountId.length !== 16 || accountId.toString().substr(0, 1) !== '5') {
                    return [false, lang.MASTERError];
                }
                break;
            case creditCardType.JCB:
                if (accountId.length !== 16 || accountId.toString().substr(0, 1) !== '3') {
                    return [false, lang.JCBError];
                }
                break;
            case creditCardType.NCC:
                if (accountId.length !== 15) {
                    return [false, lang.NCCError];
                }
                break;
            case creditCardType.AE:
                if (accountId.length !== 15) {
                    return [false, lang.AEError];
                }
                break;
            case creditCardType.DC:
                if (accountId.length !== 14) {
                    return [false, lang.DCError];
                }
                break;
        }
        return [true];
    }
    catch (err) {
        errorHandle(chargeUtilityName, 'creditCardVerify', err);
    }
}