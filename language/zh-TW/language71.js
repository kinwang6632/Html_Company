//客戶主檔查詢
if ($.fn.SO1100A) {
    var SO1100A = (function () {
        this.language = {
            btnSearch: '搜尋',
            btnCancel: '關閉',

            custAppendTitle: '新增客戶主檔 [SO1100BA]'
        };
    });
};
//客戶主檔編輯
if ($.fn.SO1100BA) {
    var SO1100BA = (function () {
        this.language = {
            lblCustId: '客戶編號',
            lblCustName: '客戶名稱',
            lblClassCode1: '客戶類別一',
            lblClassCode2: '客戶類別二',
            lblClassCode3: '客戶類別三',
            lblHomeID: '家戶編號',
            gilAddressName: '裝機地址',
            lblMduId: '大樓名稱',
            lblChargeType: '收費屬性',
            chargeTypeItem1: '一般',
            chargeTypeItem2: '大樓個收',
            chargeTypeItem3: '大樓統收',
            lblChargeNote: '收費備註',
            lblCustNote: '備註',
            txtContent: '內容',
            lblInitTime: '建檔時間',
            lblInitUser: '建檔人員',
            lblUpdTime: '異動時間',
            lblUpdEn: '異動人員',
            btnSave: '存檔',
            btnQuite: '取消',

            stateView: '顯示',
            stateAdd: '新增',
            stateEdit: '修改',

            subFormTitle1: '選擇發票流水號',
            subFormTitle2: '裝機地址重覆',

            quiteNote: '新增或修改未存檔,是否真的要離開?',
            loadCheck: '呼叫端未傳入客戶資料!',
            so001Check: '此客戶編號查無SO001資料!',
            saveCheck1: '輸入[收費備註]時,限制其長度不得超過200!',
            saveCheck2: '輸入[備註]時,限制其長度不得超過2000!',
            newCustIdCheck: '新的客戶編號產生失敗',
            idCheck: '此ID〈{0}〉查無申請人資料!',
            addressCheck: '是否一併更新發票收費、郵寄地址?',

            SO114EATitle: '申請人管理'
        };
    });
};
//客戶主檔註銷
if ($.fn.SO1100BA1) {
    var SO1100BA1 = (function () {
        this.language = {
            lblDelDate: '作廢日期',
            lblDelCode: '作廢原因',
            btnOK: '確定',
            btnQuit: '離開',

            loadCheck1: '非註銷模式,不得使用此功能!',
            loadCheck2: '呼叫端未傳入客戶資料!',
            saveCheck1: '註銷日期需有值!',
            saveCheck2: '註銷原因需有值!',

            saveResult1: '註銷成功!!',
            saveResult2: '註銷失敗!!'
        };
    });
};
//客戶主檔註銷還原
if ($.fn.SO1100BA2) {
    var SO1100BA2 = (function () {
        this.language = {
            btnOK: '確定',
            btnQuit: '離開',

            loadCheck: '呼叫端未傳入客戶資料!',

            saveResult1: '註銷還原成功!!',
            saveResult2: '註銷還原失敗!!'
        };
    });
};
//選擇發票流水號
if ($.fn.SO1100BA3) {
    var SO1100BA3 = (function () {
        this.language = {
            colINVSEQNO: '流水編號',
            colCHARGETITLE: '收件人',
            colINVOICETYPE: '發票種類',
            colINVNO: '統一編號',
            colINVTITLE: '發票抬頭',
            colINVADDRESS: '發票地址',
            colCHARGEADDRESS: '收費地址',
            colMAILADDRESS: '郵寄地址',

            btnOK: '確定',

            invoiceType0: '不開',
            invoiceType2: '二聯式',
            invoiceType3: '三聯式',

            quiteNote: '發票流水號為必選，不可取消'
        };
    });
};
//裝機地址重覆
if ($.fn.SO1100BA4) {
    var SO1100BA4 = (function () {
        this.language = {
            colCUSTID: '客戶編號',
            colCUSTNAME: '客戶名稱',
            colCUSTSTATUSNAME: '客戶狀態',
            colWIPNAME1: '派工狀態1',
            colWIPNAME3: '派工狀態3',
            colINITTIME: '建檔時間',
            colINSTADDRESS: '裝機地址',

            btnSelect: '確定',
            btnQuit: '離開'
        };
    });
};

//發票抬頭編輯
if ($.fn.SO1100C) {
    var SO1100C = (function () {
        this.language = {
            lblInvSeqNo: '流水編號',
            lblChargeTitle: '收 件 人',
            lblInvoiceType: '發票種類',
            lblInvTitle: '發票抬頭',
            lblInvNo: '統一編號',
            lblInvAddress: '發票地址',
            lblUseInv: '發票用途',
            lblChooseProduct: '指定費用',
            btnChooseProduct: '指定費用',
            lblDenRecCode: '受贈單位',
            lblDenRec: '發票開立種類',
            lblApplyInvDate: '申請電子發票證明聯日期',
            lblDenRecDate: '受贈日期',
            txtPreInv: '是否預開發票',
            lblLoveNum: '捐贈碼',//'愛心碼',
            lblCarrierTypeCode: '客戶載具類別',
            lblCarrierId1: '客戶載具顯碼',
            lblA_CarrierId1: '會員載具顯碼',
            lblUpdTime: '異動時間',
            lblUpdEn: '異動人員',
            gilAddressCharge: '收費地址',
            gilAddressMail: '郵寄地址',
            txtBillMailKind: '電子帳單',

            invoiceType1: '0.免稅',
            invoiceType2: '2.二聯式',
            invoiceType3: '3.三聯式',
            denRec1: '0.電子發票證明聯',
            denRec2: '1.雲端發票',//'1.電子發票',
            productColumn1: '服務編號',
            productColumn2: '客戶編號',
            productColumn3: '家戶編號',
            productColumn4: '裝機地址',
            productColumn5: '產品名稱',
            productColumn6: '設備序號',

            stateView: '顯示',
            stateAppend: '新增',
            stateEdit: '修改',

            SO1100C1Title: '指定費用',

            invoiceCheck1: '公司戶必須開立三聯式發票',
            invoiceCheck2: '非公司戶必須開立二聯式發票',
            useInvCheck: '三聯式發票不可捐贈!',
            quiteNote: '新增或修改未存檔,是否真的要離開?',
            saveCheck01: '系統業者參數檔未啟用雲端發票,僅可開立0.電子發票證明聯!',//'系統業者參數檔未啟用電子發票,僅可開立0.電子計算機發票!',
            saveCheck02: '捐贈時,受贈單位與捐贈碼欄位必須至少要輸入一項!',//'捐贈時,受贈單位與愛心碼欄位必須至少要輸入一項!',
            saveCheck03: '收件人', //收件人欄位必須有值!
            saveCheck04: '發票種類為[3：三聯式]時，統一編號必須有值!',
            saveCheck05: '發票種類為[3：三聯式]時，發票抬頭必須有值!',
            saveCheck06: '發票種類為[3：三聯式]時，發票地址必須有值!',
            saveCheck07: '發票開立種類為[0：電子發票證明聯]時，其日期必須有值!',
            saveCheck08: '指定費用項目,不允許取消勾選!〈服務編號為{0}〉',
            saveCheck09: '客戶載具類別無值,客戶載具顯碼不可輸入'
        };
    });
};
//指定費用
if ($.fn.SO1100C1) {
    var SO1100C1 = (function () {
        this.language = {
            gridTitle1: '產品資料',
            col1CHOOSE: '選擇',
            col1CUSTID: '客戶編號',
            col1PRODUCTNAME: '產品名稱',
            col1DECLARANTNAME: '申請人',
            col1INSTADDRESS: '裝機地址',
            col1FACISNO: '設備序號',
            col1SERVICEID: '服務編號',
            col1HOMEID: '家戶編號',

            gridTitle2: '非產品類週期',
            col2CHOOSE: '選擇',
            col2CUSTID: '客戶編號',
            col2DECLARANTNAME: '申請人',
            col2CITEMCODE: '收費項目',
            col2CITEMNAME: '收費項目名稱',
            col2STOPFLAG: '停用',
            col2PERIOD: '期數',
            col2AMOUNT: '金額',
            col2ACCOUNTNO: '扣款帳號',
            col2CMNAME: '收費方式',
            col2STARTDATE: '起始日',
            col2STOPDATE: '截止日',
            col2FACISNO: '設備序號',
            col2INVSEQNO: '發票流水號',

            gridTitle3: '收費單資料',
            col3CHOOSE: '選擇',
            col3CUSTID: '客戶編號',
            col3DECLARANTNAME: '申請人',
            col3BILLNO: '單據編號',
            col3CITEMCODE: '收費項目',
            col3CITEMNAME: '收費項目名稱',
            col3REALPERIOD: '期數',
            col3SHOULDAMT: '金額',
            col3ACCOUNTNO: '扣款帳號',
            col3CMNAME: '收費方式',
            col3REALSTARTDATE: '起始日',
            col3REALSTOPDATE: '截止日',
            col3FACISNO: '設備序號',
            col3INVSEQNO: '發票流水號',

            gridTitle4: '主檔資料',
            col4CHOOSE: '選擇',
            col4CUSTID: '客戶編號',
            col4CUSTNAME: '申請人',

            btnGrid1All: '全選',
            btnGrid2All: '全選',
            btnGrid3All: '全選',
            btnGrid4All: '全選',
            btnGrid1UnAll: '全不選',
            btnGrid2UnAll: '全不選',
            btnGrid3UnAll: '全不選',
            btnGrid4UnAll: '全不選',
            btnOK: '確定',
            btnCancel: '取消'
        };
    });
};

//設定斷線
if ($.fn.SO111BA) {
    var SO111BA = (function () {
        this.language = {
            btnOK: '確定',

            loadCheck1: '呼叫端未傳入客戶資料!',
            loadCheck2: '前端未傳入必要欄位：客戶編號!',
            loadCheck3: '客戶編號長度過長!',
            loadCheck4: '互電流水號長度過長!'
        };
    });
};
//取消斷線
if ($.fn.SO111BB) {
    var SO111BB = (function () {
        this.language = {
            btnOK: '確定',

            loadCheck1: '呼叫端未傳入客戶資料!',
            loadCheck2: '前端未傳入必要欄位：客戶編號!',
            loadCheck3: '客戶編號長度過長!'
        };
    });
};
//取消斷線(多選)
if ($.fn.SO111BC) {
    var SO111BC = (function () {
        this.language = {
            btnOK: '確定',

            loadCheck1: '呼叫端未傳入客戶資料!',
            loadCheck2: '前端未傳入必要欄位：客戶編號!',
            loadCheck3: '客戶編號長度過長!'
        };
    });
};

//週期性收費編輯
if ($.fn.SO1131A) {
    var SO1131A = (function () {
        this.language = {
            lblServiceType: '服務別',
            lblCitemCode: '收費項目',
            lblProServiceID: '產品編號',
            lblPeriodType: '週期種類',
            lblFaciSNo: '設備序號',
            btnHouse: '查詢設備明細',
            txtStopFlag: '停用',
            lblStopDate: '停用日期',
            lblPeriod: '每期月數',
            txtCustAllot: '客戶指定',
            lblAmount: '收費金額',
            lblStartDate: '有效期限',
            lblEndDate: '至',
            lblClctDate: '次收費日',
            lblClctStopDate: '出單到期日',
            lblDiscountDate1: '總優惠期限',
            lblDiscountDate2: '至',

            tbItem1: '優惠組合',
            tbItem2: '發票抬頭',
            tbItem3: '帳戶資訊',
            tbItem4: '費率表',

            chkBundle: '是否綁約',
            chkLongPayFlag: '長繳別註記',
            chkPeriodFlag: '指定繳別出單',
            btnBPCode: '顯示階段式優惠',
            lblOrderNo: '訂單單號',
            lblContNo: '合約',
            btnContract: '合約歷程',
            lblContStartDate: '合約期限',
            lblContEndDate: '至',
            btnViewChange: '多階異動記錄',
            lblBpCode: '優惠組合',
            lblDiscountDate3: '優待階段',
            lblDiscountDate4: '至',
            lblDiscountAmt: '優待金額',
            lblBundleMon: '綁約月數',
            lblPromCode: '促銷方案',
            lblPenalType: '違約時計價依據',
            lblExpireType: '優惠到期計價依據',
            lblInvSeqNo: '發 票 抬 頭 流 水 號',
            lblChargeTitle: '收  件  人',
            lblInvoiceType: '發 票 種 類',
            lblInvNo: '統 一 編 號',
            lblInvTitle: '發 票 抬 頭',
            lblInvAddress: '發 票 地 址',
            lblChargeAddress: '收 費 地 址',
            lblMailAddress: '郵 寄 地 址',
            lblInvoiceKind: '發 票 開 立 種 類',
            lblPTCode: '付款種類',
            lblCMCode: '收費方式',
            lblBankCode: '銀行名稱',
            lblAccountNo: '扣款帳號',
            lblCust: '客戶類別費率表',
            lblMdu: '大樓費率表',
            colCustCITEMNAME: '收費項目',
            colCustPERIOD: '期數',
            colCustAMOUNT: '金額',
            colMduCITEMNAME: '收費項目',
            colMduPERIOD: '期數',
            colMduAMOUNT: '金額',
            btnEdit: '修改',
            btnSave: '存檔',
            btnCancel: '取消',

            periodType1: '產品',
            periodType2: '設備收費',
            periodType3: '無',
            penalType1: '1.回溯牌價',
            penalType2: '2.優惠價',
            penalType3: '3.優惠平均價',
            penalType4: '4.應收/實收金額',
            expireType1: '1.恢復最新公告牌價',
            expireType2: '2.以最後一階繼續優惠',
            expireType3: '3.到期不出',
            expireType4: '4.接新約',
            expireType5: '5.約滿不跨階',
            invoiceType1: '不開',
            invoiceType2: '二聯式',
            invoiceType3: '三聯式',
            invoiceKind1: '電子發票證明聯',//'電子計算機發票',
            invoiceKind2: '雲端發票',//'電子發票',

            faciSNoTip: '設備流水號：',
            stateView: '顯示',
            stateAppend: '新增',
            stateEdit: '修改',
            titleSO1131A2: '產品明細',
            titleSO1131B: '階段式優惠資料 [SO1131B]',
            titleSO1131E: '設備明細 [SO1131E]',
            titleSO1131I: '合約歷程瀏覽 [CSR11213]',
            titleSO1131J: '多階異動記錄 [CSR11214]',

            quiteNote: '新增或修改未存檔,是否真的要離開?',
            checkBPCode1: '請先指定收費項目!',
            checkBPCode2: '請先指定設備!',
            saveCheckItem01: '服務別',
            saveCheckItem02: '收費項目',
            saveCheckItem03: '期數',
            saveCheckItem04: '收費金額',
            saveCheckItem05: '有效起始日',
            saveCheckItem06: '有效截止日',
            saveCheckItem07: '次收費日',
            saveCheckItem08: '設備流水號',
            saveCheckItem09: '產品編號',
            saveCheckItem10: '週期種類',
            saveCheck01: '該收費項目為BY機收費項目，請選擇設備!',
            saveCheck02: '有效期限，截止日不可小於起始日!',
            saveCheck03: '總優惠期限，截止日不可小於起始日!'
        };
    });
};
//週期性收費作廢
if ($.fn.SO1131A1) {
    var SO1131A1 = (function () {
        this.language = {
            lblCancelDate: '作廢日期',
            lblCancelCode: '作廢原因',
            btnOK: '確定',
            btnCancel: '取消',

            loadCheck1: '非作廢模式,不得使用此功能!',
            loadCheck2: '呼叫端未傳入週期性收費資料!',
            saveCheck1: '作廢日期需有值!',
            saveCheck2: '作廢原因需有值!',

            saveResult1: '作廢成功!!',
            saveResult2: '作廢失敗!!'
        };
    });
};
//週期性收費編輯-查詢產品編號
if ($.fn.SO1131A2) {
    var SO1131A2 = (function () {
        this.language = {
            col1PRODSTATUSNAME: '狀態',
            col1SERVICEID: '產品編號',
            col1PRODUCTCODE: '產品代碼',
            col1PRODUCTNAME: '產品名稱',
            col1INSTDATE: '裝機日期',

            col2AUTOSERIALNO: '自動編號',
            col2FACICODE: '品名代碼',
            col2FACINAME: '項目名稱',
            col2BUYCODE: '買賣方式代碼',
            col2BUYNAME: '買賣方式',
            col2DUEDATE: '租借到期日',
            col2INSTDATE: '安裝日期',
            col2SNO: '安裝單號',

            btnOK: '確定',
            btnCancel: '取消'
        };
    });
};

//臨櫃補單
if ($.fn.SO1131D) {
    var SO1131D = (function () {
        this.language = {
            lblPeriod: '產生期數',
            lblClctStopDate: '收費單截止日',
            lblNote1: '空白則以原期數產單',
            lblNote2: '客戶指定費用以原指定期數出單',
            lblWhere: '連動條件',
            chkDeclarantName: '申請人',
            chkAccountNo: '扣款帳號',
            chkFacisNo: '設備序號',
            colSELECTED: '選擇',
            colORDERNO: '訂單單號',
            colACCOUNTNO: '帳號',
            colDECLARANTNAME: '申請人姓名',
            colFACISNO: '設備序號',
            colCITEMCODE: '收費代碼',
            colCITEMNAME: '收費項目',
            colPERIOD: '期數',
            colAMOUNT: '應收金額',
            colSTARTDATE: '收費起日',
            colSTOPDATE: '收費迄日',
            btnOK: '確定',
            btnCancel: '取消',

            loadCheck1: '前端未傳入臨櫃補單資料!',
            loadCheck2: '未傳入客戶編號或者客戶編號有誤!',
            loadCheck3: '未傳入作廢原因!',
            saveCheck1: '請選擇資料!',

            titleSO1131D: '過單確認 [SO1131D1]'
        };
    });
};
//過單確認
if ($.fn.SO1131D1) {
    var SO1131D1 = (function () {
        this.language = {
            colSERVICETYPE: '服務別',
            colBILLNO: '單據編號',
            colITEM: '項次',
            colFACISNO: '設備序號',
            colCITEMNAME: '收費項目',
            colSHOULDDATE: '應收日期',
            colSHOULDAMT: '應收金額',
            colREALSTARTDATE: '收費起日',
            colREALSTOPDATE: '收費迄日',

            lblSumAmt: '金額小計',

            btnOK: '確定',
            btnCancel: '取消'
        };
    });
};

//顯示產品資訊
if ($.fn.SO1133A) {
    var SO1133A = (function () {
        this.language = {};
        this.language.lProduct = "產品";
        this.language.lProdStatusName = "產品狀態";
        this.language.lFaciName = "設備品名";
        this.language.lFaciSNo = "設備序號";
        this.language.lOrderNo = "訂單單號";
        this.language.lCitem = "收費項目";
        this.language.lPeriod = "期數(繳別)";
        this.language.lAmount = "金額";
        this.language.lProdClass = "產品客戶類別";
        this.language.lStartDate = "有效期限起始日";
        this.language.lStopDate = "有效期限截止日";
        this.language.lInstDate = "安裝時間";
        this.language.lInstSNo = "裝機單號";
        this.language.lOpenDate = "開訊時間";
        this.language.lReInstSNo = "軟開單號";
        this.language.lCloseDate = "關訊時間";
        this.language.lStopSNo = "軟關單號";
        this.language.lPRDate = "拆機時間";
        this.language.lPRSNo = "拆機單號";
        this.language.lUpdEn = "異動人員";
        this.language.lUpdTime = "異動時間";

        this.language.btnEdit = "修改";
        this.language.btnSave = "存檔";
        this.language.btnExit = "離開";
        this.language.btnCancel = "取消";

        this.language.view = "顯示";
        this.language.edit = "修改";
    });
}

//批次修改產品
if ($.fn.SO1133B) {
    var SO1133B = (function () {
        this.language = {
            lblProdClassCode: '新產品客戶類別',
            lblWhere: '連動條件',
            chkDeclarantName: '申請人',
            chkFacisNo: '設備序號',
            btnOK: '確定',
            btnCancel: '取消',

            colSELECTED: '核取',
            colDECLARANTNAME: '申請人',
            colPRODUCTNAME: '產品',
            colFACISNO: '設備序號',
            colCITEMCODE: '收費項目代碼',
            colCITEMNAME: '收費項目',
            colPRODCLASSCODE: '產品客戶類別代碼',
            colPRODCLASSNAME: '產品客戶類別',

            loadCheck1: '前端未傳入批次修改產品資料!',
            loadCheck2: '未傳入客戶編號或者客戶編號有誤!',
            saveCheck1: '請選擇產品資料!',
            saveCheck2: '請設定修改條件!',

            saveResult1: '批次修改成功!!',
            saveResult2: '批次修改失敗!!'
        };
    });
};

//訂單查詢
if ($.fn.SO1144A) {
    var SO1144A = (function () {
        this.language = {};
        this.language.lWip = "工單資料";
        this.language.lProduct = "產品資料";
        this.language.lCharge = "收費資料";
        this.language.lFacility = "設備資料";
        this.language.lPresent = "商贈品資料";
    });
};

//申請人過戶
if ($.fn.SO1145A) {
    var SO1145A = (function () {
        this.language = {
            lblID: '新申請人(ID/姓名)',
            lblOoderNo: '訂單單號',
            lblChoFaci: '選取過戶設備',
            lblChoCust: '選擇客戶',
            btnQueryProp: '新申請人',
            btnOK: '確定',
            btnCancel: '取消',

            colChoFaciSELECTED: '選取',
            colChoFaciSERVICETYPE: '服務別',
            colChoFaciID: 'ID',
            colChoFaciDECLARANTNAME: '申請人姓名',
            colChoFaciFACINAME: '設備名稱',
            colChoFaciFACISNO: '設備序號',
            colChoFaciINITPLACENAME: '裝置點',

            colChoCustCUSTID: '客戶編號',
            colChoCustINSTADDRNO: '地址編號',
            colChoCustINSTADDRESS: '地址',
            colChoCustAREANAME: '行政區',
            colChoCustSERVAREA: '服務區',

            loadCheck1: '呼叫端未傳入所需資料!',
            loadCheck2: '前端未傳入必要欄位：客戶編號!',
            saveCheck1: '未選擇過戶設備!',
            saveCheck2: '設備ID與客戶ID相同，不可過戶!',
            saveCheck3: '申請人ID',
            saveCheck4: '未選擇客戶!',
            saveCheck5: '未指定新申請人!',
            sourceCheck: '查無可過戶設備!',

            saveResult1: '過戶成功!!',
            saveResult2: '過戶失敗!!',

            formTitle1: '申請人管理',
            formTitle2: '客戶主檔新增',
            formTitle3: '選擇發票流水號'
        };
    });
};

//申請人管理
if ($.fn.SO114EA) {
    var SO114EA = (function () {
        this.language = {
            lblDeclarantName_Q: '申請人姓名',
            lblID: '第一證件號碼',
            btnQuery: '尋找',
            lblDeclarantName_D: '姓名',
            lblBirthday: "生日",
            lblSex: "性別",
            radSex1: "男",
            radSex2: "女",
            chkMarried: "已婚",
            lblIDKind1: "證件一",
            lblContTel: "聯絡電話",
            lblContTel1: '(區碼)',
            lblContTel2: '(分機)',
            lblID1: "證號一",
            chkNoDocuments: '暫無證件',
            lblOfficeTel: "公司電話",
            lblOfficeTel1: '(區碼)',
            lblOfficeTel2: '(分機)',
            lblIDKind2: "證件二",
            lblContmobile: "行動電話",
            lblPrefix: "稱謂",
            lblID2: "證號二",
            lblBoss: "負責人",
            lblBossID: "負責人證號",
            chkCompany: "公司戶",
            CustAttribute: '身份',
            lblDomicileAddress: '戶籍地址',
            lblMemberId: '會員編號',
            lblDateline: '通訊地址',
            lblWebAuthCode: '網路認證碼',
            lblA_CarrierId1: '會員載具顯碼',
            lblActiveTime: '網路會員啟用時間',
            lblA_CarrierId2: '會員載具隱碼',
            lblNote: '申請人備註',
            lblUpdEn: '異動人員',
            lblUpdTime: '異動時間',
            lblEmail2: '常用Email',
            chkActive: "會員",
            lblBindingTel: '綁定',
            lblMain_Email: '主要Email',
            lblWeb_Account: '次要Email',
            tbItem1: '申請人明細',
            tbItem2: '聯絡資訊',
            tbItem3: '客戶資料',
            tbItem4: '帳單&發票載具',
            tbItem5: '帳號資料',
            tbItem6: '異動紀錄',

            Item1colDECLARANTNAME: '姓名',
            Item1colPREFIX: '稱謂',
            Item1colCONTTEL: '聯絡電話',
            Item1colSEXTUAL: '性別',
            Item1colBIRTHDAY: '生日',
            Item1colIDKINDNAME1: '證件種類名稱一',
            Item1colID: '第一證件號碼',
            Item1colCOMPANY: '公司戶',
            Item1colMARRIED: '已婚',
            Item1colDOMICILEADDRESS: '戶籍地址',
            Item1colUPDEN: '異動人員',
            Item1colUPDTIME: '異動時間',

            Item2colROWNUM: '項次',
            Item2colSTOPFLAG: '停用',
            Item2colPRIORITY: '優先序',
            Item2colCONTACTCNT: '次數',
            Item2colTELNAME: '種類',
            Item2colTEL: '資料',
            Item2colEXT: '分機',
            Item2colCONTTIME1: '非聯絡時段一',
            Item2colCONTTIME2: '非聯絡時段二',
            Item2colCONTTIME3: '非聯絡時段三',
            Item2colACCEPTSMSFLAG1: 'DM簡訊',
            Item2colACCEPTSMSFLAG2: '催收簡訊',
            Item2colTELNOTE: '電話備註',

            Item3colCUSTID: '客編',
            Item3colHOMEID: '家戶編號',
            Item3colRELATION: '關係',
            Item3colMEMBERTYPE: '身份',
            Item3colINSTADDRESS: '裝機地址',
            Item3colPRODUCTLIST: '申裝產品',

            Item4colINVSEQNO: '發票流水號',
            Item4colCUSTLIST: '指定客編',
            Item4colPRODUCTNAMELIST: '指定客編及產品',
            Item4colCHARGETITLE: '收件人',
            Item4colINVOICETYPE: '發票種類',
            Item4colINVOICEKIND: '發票開立種類',
            Item4colINVNO: '統編',
            Item4colINVTITLE: '發票抬頭',
            Item4colA_CARRIERID1: '會員載具顯碼',
            Item4colINVADDRESS: '發票地址',
            Item4colINVPURPOSENAME: '發票用途',

            Item5colSTOPFLAG: '停用',
            Item5colSTOPDATE: '停用日期',
            Item5colACCEPTNAME: '受理人員',
            Item5colACCEPTTIME: '受理日期',
            Item5colBANKNAME: '銀行名稱',
            Item5colCARDNAME: '信用卡名稱',
            Item5colSTOPYM: '信用卡有效期限',
            Item5colACCOUNTNAME: '帳號所有人',
            Item5colACCOUNTID: '帳號/卡號',
            Item5colACHCUSTID: 'ACH用戶編號',
            Item5colSENDDATE: '送件日期',
            Item5colUPDEN: '異動人員',
            Item5colNEWUPDTIME: '異動時間',
            Item5colNOTE: '備註',
            Item5colCUSTLIST: '指定客編',
            Item5colPRODUCTNAMELIST: '指定客編及產品',

            Item6colFUNCTYPE: '種類',
            Item6colUPDEN: '異動人員',
            Item6colUPDTIME: '異動時間',
            Item6colDECLARANTNAME: '原姓名',
            Item6colDECLARANTNAMEB: '新姓名',
            Item6colPREFIX: '原稱謂',
            Item6colPREFIXB: '新稱謂',
            Item6colCONTTEL: '原聯絡電話',
            Item6colCONTTELB: '新聯絡電話',
            Item6colCONTMOBILE: '原行動電話',
            Item6colCONTMOBILEB: '新行動電話',
            Item6colSEXTUAL: '原性別',
            Item6colSEXTUALB: '新性別',
            Item6colBIRTHDAY: '原生日',
            Item6colBIRTHDAYB: '新生日',
            Item6colEMAIL2: '原常用E-mail',
            Item6colEMAIL2B: '新常用E-mail',
            Item6colIDKINDNAME1: '原證件種類一',
            Item6colIDKINDNAME1B: '新證件種類一',
            Item6colID: '原第一證號',
            Item6colIDB: '新第一證號',
            Item6colIDKINDNAME: '原證件種類二',
            Item6colIDKINDNAMEB: '新證件種類二',
            Item6colID2: '原第二證號',
            Item6colID2B: '新第二證號',
            Item6colCOMPANY: '原公司戶',
            Item6colCOMPANYB: '新公司戶',
            Item6colBOSS: '原負責人',
            Item6colBOSSB: '新負責人',
            Item6colBOSSID: '原負責人ID',
            Item6colBOSSIDB: '新負責人ID',
            Item6colMARRIED: '原已婚',
            Item6colMARRIEDB: '新已婚',
            Item6colDOMICILEADDRESS: '原戶籍地址',
            Item6colDOMICILEADDRESSB: '新戶籍地址',
            Item6colDATELINE: '原通訊地址',
            Item6colDATELINEB: '新通訊地址',
            Item6colOPTYPE: '異動種類',
            Item6colREASONNAME: '異動原因',
            Item6colCONTENT1: '異動內容',

            btnChoose: '選定',
            btnSave: '存檔',
            btnAdd: '新增',
            btnEdit: '修改',
            btnClose1: '離開',
            btnClose2: '取消',

            stateAdd: '新增',
            stateEdit: '修改',
            stateView: '顯示',

            LoadCheck1: '呼叫端未傳入申請人資料!',
            LoadCheck2: '前端未傳入必要欄位:客戶編號!',
            LoadCheck3: '前端未傳入必要欄位:姓名!',
            LoadCheck4: '前端未傳入必要欄位:ID!',
            LoadCheck5: '前端未傳入必要欄位:裝機地址!',
            dynCheck: '未指定申請人',
            QueryCheck1: '申請人姓名或第一證件號碼請至少輸入一個!',
            QueryCheck2: '查無資料!',
            SubAddCheck1: '僅有在顯示模式時,方可於此新增聯絡電話',
            SubEditCheck1: '僅有在顯示模式時,方可於此修改聯絡電話',
            SubAddCheck2: '僅有在顯示模式時,方可於此新增帳單&發票載具',
            SubEditCheck2: '僅有在顯示模式時,方可於此修改帳單&發票載具',
            SubViewCheck2: '僅有在顯示模式時,方可於此檢視帳單&發票載具',
            SubAddCheck3: '僅有在顯示模式時,方可於此新增帳號資訊',
            SubEditCheck3: '僅有在顯示模式時,方可於此修改帳號資訊',
            SubViewCheck3: '僅有在顯示模式時,方可於此檢視帳號資訊',
            SubEditCheck4: '綁定EAMIL資料,不允許修改',
            saveCheck01: '[申請人姓名]為必要欄位,需有值!',
            saveCheck02: '[證件種類一]為必要欄位,需有值!',
            saveCheck03: '[第一證件號碼]為必要欄位,需有值!',
            saveCheck04: '[聯絡電話]為必要欄位,需有值!',
            saveCheck05: '輸入[申請人姓名]時,限制其長度不得超過50!',
            saveCheck06: '輸入[第一證件號碼]時,限制其長度不得超過20!',
            saveCheck07: '輸入[第二證件號碼]時,限制其長度不得超過20!',
            saveCheck08: '輸入[負責人]時,限制其長度不得超過50!',
            saveCheck09: '輸入[負責人證號]時,限制其長度不得超過10!',
            saveCheck10: '輸入[申請人備註]時,限制其長度不得超過2000!',
            saveCheck11: '輸入[戶籍地址]時,限制其長度不得超過90!',
            saveCheck12: '輸入[通訊地址]時,限制其長度不得超過90!',
            saveCheck13: '[身分證]輸入錯誤!是否存檔?',
            saveCheck14: '[統一編號]輸入錯誤!',
            saveCheck15: '公司戶第一證件種類必須為統一編號!',
            saveCheck16: '公司戶需填負責人姓名!',
            saveCheck17: '公司戶需填負責人ID!',
            saveCheck18: '手機號碼必須為09開頭!',
            saveCheck19: '手機號碼必須為為10碼!',
            saveCheck20: '[{0}]必須為{1}碼!',
            saveCheck21: '[{0}]第一碼必須為英文!',
            saveCheck22: '[{0}]第二碼必須為1或2!',
            saveCheck23: '輸入[常用Email]時,限制其長度不得超過50!',
            saveCheck24: '常用Email格式不符!',
            saveCheck25: '[{0}]第二碼必須為8或9!',

            SaveResult1: '存檔成功!!',
            quiteNote: '新增或修改未存檔,是否真的要離開?',

            prefixItem1: '先生',
            prefixItem2: '小姐',
            prefixItem3: '女士',
            Menu1Item1: '新增聯絡資訊',
            Menu1Item2: '修改聯絡資訊',
            Menu2Item1: '新增帳單&發票載具',
            Menu2Item2: '修改帳單&發票載具',
            Menu2Item3: '檢視帳單&發票載具',
            Menu3Item1: '新增帳號資訊',
            Menu3Item2: '修改帳號資訊',
            Menu3Item3: '檢視帳號資訊',
            editLogTitle: '異動紀錄',
            SexItem1: '男',
            SexItem2: '女',
            FuncTypeItem1: '修改',
            FuncTypeItem2: '刪除',
            FuncTypeItem3: '新增',
            InvTypeItem1: '不開',
            InvTypeItem2: '二聯式',
            InvTypeItem3: '三聯式',
            InvKindItem1: '電子發票證明聯',//'電子計算機發票',
            InvKindItem2: '雲端發票',//'電子發票',
            opType1: '修改',
            opType2: '刪除',
            menu1Add: '新增',
            menu1Edit: '修改',
            menu2Add: '新增',
            menu2Edit: '修改',
            menu2View: '單筆檢視',
            menu2Log: '異動記錄',
            menu3Add: '新增',
            menu3Edit: '修改',
            menu3View: '單筆檢視',
            menu3Log: '異動記錄'
        };
    });
};
//聯絡資訊編輯
if ($.fn.SO114EB) {
    var SO114EB = (function () {
        this.language = {
            lblTelType: '聯絡種類',
            lblTel: '資料',
            lblContTime1: '非聯絡時段一',
            lblContTime2: '非聯絡時段二',
            lblContTime3: '非聯絡時段三',
            lblAcceptSMSFlag1: 'DM促銷簡訊',
            lblAcceptSMSFlag2: '催收簡訊',
            lblReturn: '回填申請人',
            lblUpdTel: '同步更新聯絡電話',
            lblPriority: '優先順序',
            lblContactCnt: '聯絡次數',
            lblStopFlag: '停用',
            lblDataSource: '資料來源',
            lblTelNote: '電話備註',
            lblUpdEn: '異動人員',
            lblUpdTime: '異動時間',
            btnOK: '存檔',
            btnCancel: '取消',

            loadCheck1: '呼叫端未傳入申請人電話資料!',
            formCheck1: '電話種類必須有值!',
            formCheck2: '電話號碼必須有值!',
            formCheck3: '必須有值且符合行動電話格式!',
            formCheck4: 'E-mail必須有值!',
            formCheck5: 'E-mail格式有誤!',
            formCheck6: '優先順序必須為數字!',
            formCheck7: '優先順序不得為0!',
            formCheck8: '此為申請人聯絡電話之一，請先選擇其它電話回填申請人，再停用!',
            formCheck9: '此為申請人常用Email，請先選擇其它資料回填，再停用!',
            quiteNote: '新增或修改未存檔,是否真的要離開?',
            quiteSaveNote: '該電話為申請人手機,確定停用?',

            stateAdd: '新增',
            stateEdit: '修改',
            pleaseCloseIME: '請切換至英數模式!'
        };
    });
};
//申請更名
if ($.fn.SO114EC) {
    var SO114EC = (function () {
        this.language = {
            lblChoPro: '選取要更名的申請人',

            colChoProID: 'ID',
            colChoProDECLARANTNAME: '申請人姓名',

            btnOK: '確定',
            btnCancel: '取消',

            loadCheck1: '呼叫端未傳入所需資料!',
            loadCheck2: '前端未傳入必要欄位：客戶編號!',
            loadCheck3: '查無申請人資料!',
            enterCheck: '未選擇申請人!',
            privCheck: '無申請人修改權限!',

            SO114EATitle: '申請人管理'
        };
    });
};

//DTV入庫1
if ($.fn.SO1620B1) {
    var SO1620B1 = (function () {
        this.language = {};
        this.language.lImportDate = "入庫日期";
        this.language.lFaciCode = "設備名稱";
        this.language.lModelCode = "設備型號";
        this.language.lVendorCode = "設備廠商";
        this.language.lImportBatch = "入庫批號";
        this.language.lCartonNo = "紙箱編號";
        this.language.lBoxNo = "盒子序號";
        this.language.lImportReason = "入庫原因";
        this.language.gbxDVR = "DVR設備";

        this.language.lHDSize = "硬碟容量";
        this.language.lHDSize2 = "(GB)";
        this.language.lExHDNo = "接盒序號";
        this.language.lExHDMode = "接盒廠牌型號";
        this.language.lFaciSNo = "請輸入設備序號";
        this.language.lFaciSNo2 = "(可用BarCode刷)";
        this.language.lMACNo = "MAC序號";
        this.language.lLoadFile = "匯入資料檔";
        this.language.lMemo1 = "格式說明:";
        this.language.lDTVMemo = "STB設備：TXT格式,抬頭為S/N, CA_SN, MAC, NUID";
        this.language.lICCMemo = "ICC設備：TXT格式,抬頭為CartonNo, BoxNo, ICCNO";
        this.language.lDVRMemo = "DVR設備：TXT格式,抬頭為HDD Casing, HDD Casing S/N, HDD Model Name, HDD SN, HDD Capacity";

        this.language.btnOk = "確定";
        this.language.btnExit = "離開";
        this.language.sureNoSaveExit = "新增或修改未存檔，是否真的要離開?";
    });
};
//DTV入庫2
if ($.fn.SO1620B2) {
    var SO1620B2 = (function () {
        this.language = {};
        this.language.lImportDate = "入庫日期";
        this.language.lFaciCodeD = "機上盒名稱";
        this.language.lModelCodeD = "機上盒型號";
        this.language.lVendorCodeD = "機上盒廠商";
        this.language.lImportBatch = "入庫批號";

        this.language.lImportReason = "入庫原因";
        this.language.lFaciCodeI = "智慧卡名稱";
        this.language.lModelCodeI = "智慧卡型號";
        this.language.lVendorCodeI = "智慧卡廠商";

        this.language.lLoadFile = "匯入資料檔";
        this.language.lMemo1 = "格式說明:";
        this.language.lMemo2 = "EXCEL格式,抬頭為STB serial number, STB model, Paring key, MAC address, HDCP key,";
        this.language.lMemo3 = "Smart card serial number, Smart card model, carton number, pallet number,";
        this.language.lMemo4 = "Ethernet MAC address, WAN MAC address";

        this.language.btnOk = "確定";
        this.language.btnExit = "離開";
        this.language.sureNoSaveExit = "新增或修改未存檔，是否真的要離開?";
    });
};
//DTV出庫1
if ($.fn.SO1620C1) {
    var SO1620C1 = (function () {
        this.language = {};
        this.language.gbxCondition = "查詢條件";
        this.language.btnFind = "查詢";
        this.language.lImportDate = "入庫日期";
        this.language.lFaciCode = "設備名稱";
        this.language.lModelCode = "設備型號";
        this.language.lVendorCode = "設備廠商";
        this.language.lImportBatch = "入庫批號";
        this.language.lCartonNo = "紙箱編號";
        this.language.lBoxNo = "盒子序號";
        this.language.lExportReason = "出庫原因";

        this.language.gData_FACISTATUS = "設備狀態";
        this.language.gData_FACIWIPSTATUS = "派工狀態";
        this.language.gData_FACICOMMANDSTATUS = "開通狀態";
        this.language.gData_MODELNAME = "設備型號";
        this.language.gData_FACINAME = "設備名稱";
        this.language.gData_FACISNO = "設備序號";
        this.language.gData_CUSTID = "客戶編號";
        this.language.gData_CUSTNAME = "客戶名稱";
        this.language.gData_IMPORTDATE = "入庫日期";
        this.language.gData_IMPORTBATCH = "入庫批號";
        this.language.gData_CARTONNO = "紙箱編號";
        this.language.noData = "查無資料!!";
        this.language.faciDup = "此物品序號已重複輸入!";

        this.language.lFaciSNo = "請輸入設備序號";
        this.language.lFaciSNo2 = "(可用BarCode刷)";
        this.language.lLoadFile = "匯入資料檔";
        this.language.lMemo1 = "格式說明:";
        this.language.lDTVMemo = "STB設備：TXT格式,抬頭為S/N, CA_SN, MAC, NUID";
        this.language.lICCMemo = "ICC設備：TXT格式,抬頭為CartonNo, BoxNo, ICCNO";
        this.language.lDVRMemo = "DVR設備：TXT格式,抬頭為HDD Casing, HDD Casing S/N, HDD Model Name, HDD SN, HDD Capacity";

        this.language.pleaseCheckData = "請勾選要處理的資料!!";
        this.language.btnOk = "確定";
        this.language.btnExit = "離開";
        this.language.sureNoSaveExit = "新增或修改未存檔，是否真的要離開?";
    });
};
//DTV出庫2
if ($.fn.SO1620C2) {
    var SO1620C2 = (function () {
        this.language = {};
        this.language.gbxCondition = "查詢條件";
        this.language.btnFind = "查詢";

        this.language.lImportDate = "入庫日期";
        this.language.lFaciCodeD = "機上盒名稱";
        this.language.lModelCodeD = "機上盒型號";
        this.language.lVendorCodeD = "機上盒廠商";
        this.language.lExportBatch = "出庫批號";

        this.language.lExportReason = "出庫原因";
        this.language.lFaciCodeI = "智慧卡名稱";
        this.language.lModelCodeI = "智慧卡型號";
        this.language.lVendorCodeI = "智慧卡廠商";

        this.language.gData_STBNO = "機上盒序號";
        this.language.gData_ICCNO = "智慧卡序號";
        this.language.gData_MACADDRESS = "MAC序號";
        this.language.gData_ETHERNETMAC = "EthernetMAC序號";
        this.language.gData_WANMAC = "WANMAC序號";
        this.language.gData_IMPORTDATE = "入庫日期";
        this.language.gData_STBFACINAME = "機上盒名稱";
        this.language.gData_ICCFACINAME = "智慧卡名稱";
        this.language.gData_STBMODELNAME = "機上盒型號";
        this.language.gData_ICCMODELNAME = "智慧卡型號";
        this.language.gData_STBVENDORNAME = "機上盒廠商";
        this.language.gData_ICCVENDORNAME = "智慧卡廠商";
        this.language.gData_IMPORTBATCH = "入庫批號";
        this.language.gData_CARTONNO = "紙箱編號";
        this.language.noData = "查無資料!!";
        this.language.faciDup = "此物品序號已重複輸入!";

        this.language.lFaciSNo = "輸入機上盒序號";
        this.language.lFaciSNo2 = "(可用BarCode刷)";
        this.language.lLoadFile = "匯入資料檔";

        this.language.lMemo1 = "格式說明:";
        this.language.lMemo2 = "EXCEL格式,抬頭為STB serial number, STB model, Paring key, MAC address, HDCP key,";
        this.language.lMemo3 = "Smart card serial number, Smart card model, carton number, pallet number,";
        this.language.lMemo4 = "Ethernet MAC address, WAN MAC address";

        this.language.pleaseCheckData = "請勾選要處理的資料!!";
        this.language.btnOk = "確定";
        this.language.btnExit = "離開";
        this.language.sureNoSaveExit = "新增或修改未存檔，是否真的要離開?";
    });
};
//CM入庫
if ($.fn.SO1630B) {
    var SO1630B = (function () {
        this.language = {};
        this.language.lImportDate = "匯入日期";
        this.language.lModeID = "CM/EMTA";
        this.language.lFlag = "MAC序號以何為主";

        this.language.lLoadFile = "匯入資料檔";

        this.language.modelID1 = "0.EMTA";
        this.language.modelID2 = "1.CM";
        this.language.flag1 = "1.HFC";
        this.language.flag2 = "2.EtherNet";
        this.language.flag3 = "3.MTA";

        this.language.lMemo1 = "格式說明:";
        this.language.lMemo2 = "EXCEL格式,抬頭為Tracking #, cartonnumber, Model #, ChassisSN,";
        this.language.lMemo3 = "CustomerSN, HFCMAC, EthernetMAC, MTAMAC";

        this.language.btnOk = "確定";
        this.language.btnExit = "離開";
        this.language.sureNoSaveExit = "新增或修改未存檔，是否真的要離開?";
        this.language.fileError = "檔案上傳失敗,失敗原因:{0}";
        this.language.importResult = "入庫作業失敗!!";
    });
};
//CM出庫
if ($.fn.SO1630C) {
    var SO1630C = (function () {
        this.language = {};
        this.language.gbxCondition = "查詢條件";
        this.language.btnFind = "查詢";
        this.language.btnClear = "清除";

        this.language.lMACAddress = "MAC Address";
        this.language.lImportDate = "MAC匯入日期";
        this.language.lUseStatus = "使用狀況";
        this.language.lFlag = "MAC序號以何為主";

        this.language.modeID1 = "EMTA";
        this.language.modeID2 = "CM";

        this.language.flag1 = "1.HFC";
        this.language.flag2 = "2.EtherNet";
        this.language.flag3 = "3.MTA";

        this.language.useStatus1 = "未使用(在庫)";
        this.language.useStatus2 = "全部";

        this.language.gData_HFCMAC = "HFCMAC序號";
        this.language.gData_ETHERNETMAC = "EtherNetMAC序號";
        this.language.gData_MTAMAC = "MTAMAC序號";
        this.language.gData_CUSTOMERSN = "機器序號";
        this.language.gData_CHASSISSN = "基版序號";
        this.language.gData_MODELNO = "機種";
        this.language.gData_CMISSUE = "匯入日期";
        this.language.gData_MODEID = "設備型式";
        this.language.gData_MODELCODE = "型號代碼";
        this.language.gData_ACTSTATUS = "SPM設定狀態";


        this.language.noData = "查無資料!!";
        this.language.faciDup = "此物品序號已重複輸入!";

        this.language.lLoadFile = "匯入資料檔";
        this.language.lMemo1 = "格式說明:";
        this.language.lMemo2 = "EXCEL格式,抬頭為設備序號";

        this.language.pleaseCheckData = "請勾選要處理的資料!!";
        this.language.btnOk = "確定";
        this.language.btnExit = "離開";
        this.language.sureNoSaveExit = "新增或修改未存檔，是否真的要離開?";
    });
};
//CP入庫
if ($.fn.SO1640B) {
    var SO1640B = (function () {
        this.language = {
            lblEBTIssue: '門號匯入日',
            lblCPImportMode: '門號匯入模式',
            lblLoadFile: '檔案路徑',
            lblMemo1: '匯入格式說明：',
            lblMemo2: 'EXCEL格式,抬頭為MG ID, 門號, 門號狀態, 保管到期日',

            cpImportMode0: '0-台固',
            cpImportMode1: '1-亞太',
            cpImportMode2: '2-速博',

            btnOK: '確定',
            btnCancel: '取消',

            fileError: "檔案上傳失敗,失敗原因:{0}",
            importResult: "入庫作業失敗!!"
        };
    });
};
//IP設備入庫
if ($.fn.SO1650B) {
    var SO1650B = (function () {
        this.language = {
            lblIPIssue: 'IP匯入日',
            lblLoadFile: '檔案路徑',
            lblMemo1: '匯入格式說明：',
            lblMemo2: 'EXCEL格式,抬頭為網路編號, IP',

            btnOK: '確定',
            btnCancel: '取消',

            fileError: "檔案上傳失敗,失敗原因:{0}",
            importResult: "入庫作業失敗!!"
        };
    });
};

//CP帳務資料拋轉
if ($.fn.SO1640F) {
    var SO1640F = (function () {
        this.language = {
            lblCompCode: '公司別',

            tbItem1: '帳務項目對應設定',
            lblCPProperty: '電信項目屬性',
            lblCPCitemCode: '電信帳單項目代碼/名稱',
            lblCitemCode1: '收費項目 (借貸 : + )',
            lblCPAdjCitemCode: '電信帳單調改項目代碼',
            lblTaxCode1: '稅率 (借貸 : + )',
            lblCPGroupCode: '電信帳單群組代碼/名稱',
            lblCitemCode2: '收費項目 (借貸 : - )',
            lblCPItem: '電信列印順序',
            lblTaxCode2: '稅率 (借貸 : - )',
            lblCPTax: '電信稅率',
            lblTFNHead: '收費項目前導字串',
            colCitemCode1: '收費項目代碼(+)',
            colCitemName1: '收費項目名稱(+)',
            colTaxName1: '稅率(+)',
            colCitemCode2: '收費項目代碼(-)',
            colCitemName2: '收費項目名稱(-)',
            colTaxName2: '稅率(-)',
            colCPCitemCode: '電信帳單項目代碼',
            colCPCitemName: '電信帳單項目名稱',
            colCPAdjCitemCode: '電信帳單調改項目代碼',
            colCPGroupCode: '電信帳單群組代碼',
            colCPGroupName: '電信帳單群組名稱',
            colCPItem: '電信列印順序',
            colTFNHead: '收費項目前導字串',
            btnSave: '存檔',
            btnPrint: '列印',
            btnAdd: '新增',
            btnEdit: '修改',
            btnCancel: '離開',
            btnCancel2: '取消',

            cPProperty1: '1.通信費',
            cPProperty2: '2.月租費',
            cPProperty3: '3.退租費',
            cPProperty4: '4.通信退費',
            cPTaxY: 'Y.應稅',
            cPTaxN: 'N.應稅零稅',
            cPTaxF: 'F.免稅',

            stateView: '顯示',
            stateAppend: '新增',
            stateEdit: '修改',

            lengthCheck: '輸入[{0}]時,限制其長度不得超過{1}碼!',
            saveCheck01: '收費項目(借貸:+) 與 收費項目(借貸:-) 至少其中一個須有值',
            saveCheck02: '收費項目(借貸:+) 與 收費項目(借貸:-) 皆有值時,其稅率須相同',
            saveCheck03: '當[電信項目屬性]=1或4時,收費項目(借貸:+)須為非週期性項目',
            saveCheck04: '當[電信項目屬性]=2或3時,收費項目(借貸:+)須為週期性項目',
            saveCheck05: '當[電信項目屬性]=1或4時,收費項目(借貸:-)須為非週期性項目',
            saveCheck06: '當[電信項目屬性]=2或3時,收費項目(借貸:-)須為週期性項目',

            saveResult1: '存檔成功!!',
            saveResult2: '存檔失敗!!',

            tbItem2: '資料匯入',

            tbSubItem2_1: 'CP通信費資料匯入',
            lblAddressType2_1: '收費單之地址依據',
            rbAddressType2_1_1: '裝機地址',
            rbAddressType2_1_2: '收費地址',
            lblShouldDay2_1: '應收日',
            lblShouldDayNote2_1: '(應收日須介於 1～31 之間)',
            lblImportPath2_1: '匯入檔案',
            btnImport2_1: '匯入',
            btnExit2_1: '離開',

            tbSubItem2_2: 'CP通話明細資料匯入',
            lblDetailType2_2: '通話明細種類',
            rbDetailType2_2_1: '每日',
            rbDetailType2_2_2: '每月',
            lblImportFile2_2_1: '檢核匯入檔名',
            lblImportFile2_2_2: '檢核匯入檔名',
            lblImportPath2_2: '匯入檔案',
            btnImport2_2: '匯入',
            btnExit2_2: '離開',

            tbSubItem2_3: '基本資料核對匯入',
            lblImportPath2_3: '檢核匯入檔名',
            btnImport2_3: '匯入',
            btnExit2_3: '離開',

            tbItem3: '資料匯出',

            tbSubItem3_1: 'CP通信費銷帳資料匯出',
            lblRealDate3_1_1: '實收日期',
            lblRealDate3_1_2: '至',
            lblExportFile3_1: '拋轉檔名',
            lblExportDate3_1: '拋轉日期',
            lblExportPath3_1: '匯出檔案路徑',
            btnExport3_1: '匯出',
            btnExit3_1: '離開',
            begin3_1: '(起)',
            end3_1: '(迄)',

            tbSubItem3_2: 'CP月租費資料匯出',
            lblRealDate3_2_1: '實收日期',
            lblRealDate3_2_2: '至',
            lblExportMonth3_2: '帳款拋轉月份',
            lblCanExport3_2: '前期預收是否拋轉',
            lblExportFile3_2: '拋轉檔名',
            lblExportDate3_2: '拋轉日期',
            lblExportPath3_2: '匯出檔案路徑',
            btnExport3_2: '匯出',
            btnExit3_2: '離開',

            tbSubItem3_3: 'CP退租資料匯出',
            cmPrCode3_3: '拆機類別',
            cmReasonCode3_3: '停拆機原因',
            lblPrDate3_3_1: '拆機完工日(退租日)',
            lblPrDate3_3_2: '至',
            lblExportRefDate3_3: '帳款拋轉參考日',
            lblExportFile3_3: '拋轉檔名',
            lblExportDate3_3: '拋轉日期',
            lblExportPath3_3: '匯出檔案路徑',
            btnExport3_3: '匯出',
            btnExit3_3: '離開',

            tbSubItem3_4: 'CMCP強拆資料匯出',
            cmPrCode3_4: '拆機類別',
            cmReasonCode3_4: '停拆機原因',
            lblPrDate3_4_1: '拆機完工日(退租日)',
            lblPrDate3_4_2: '至',
            lblExportFile3_4: '拋轉檔名',
            lblExportDate3_4: '拋轉日期',
            lblExportPath3_4: '匯出檔案路徑',
            btnExport3_4: '匯出',
            btnExit3_4: '離開',

            tbSubItem3_5: 'CP通信退費資料匯出',
            lblRealDate3_5_1: '實收日期',
            lblRealDate3_5_2: '至',
            lblExportFile3_5: '拋轉檔名',
            lblExportDate3_5: '拋轉日期',
            lblExportPath3_5: '匯出檔案路徑',
            btnExport3_5: '匯出',
            btnExit3_5: '離開',

            tbSubItem3_6: '過期門號匯出',
            lblKeepDate3_6_1: '保管日期',
            lblKeepDate3_6_2: '至',
            lblExportFile3_6: '匯出檔名',
            lblExportPath3_6: '匯出檔案路徑',
            btnExport3_6: '匯出',
            btnExit3_6: '離開',

            form2_2Check1: '請先指定每日檢核匯入檔名',
            form2_2Check2: '請先指定每月檢核匯入檔名',
            form2_2Check3: '匯入檔案名稱與[檢核匯入檔名]不符',

            quiteNote: '新增或修改未存檔,是否真的要離開?',
            fileError: '檔案上傳失敗,失敗原因:{0}',
        };
    });
};

//業務預約管理
if ($.fn.SO1800A) {
    var SO1800A = (function () {
        this.language = {
            lblCompCode: '公司別',
            chkAll: '搜尋全部',
            lblQueryCondition: '條件搜尋',
            lblSalesEn: '業務人員',
            lblAcceptTime: '受理時間',
            lblStatus: '狀態',
            chk1: '保留',
            chk2: '取消',
            chk3: '已約',
            btnAdd: '新增',
            btnUpd: '修改',
            btnDel: '取消預約',
            btnSet: '複合式派工點數設定',
            btnQuery: '查詢',
            btnQuit: '離開',

            colSALESEN: '業務人員代碼',
            colSALESNAME: '業務人員',
            colSNO: '工單單號',
            colCUSTID: '客戶編號',
            colRESVTIME: '預約時間',
            colFLAG: '狀態',
            colUPDTIME: '異動時間',
            colUPDEN: '異動人員',
            colOVERTIME: '過期時間',
            colACCEPTTIME: '受理時間',

            flag1: '過期',
            flag2: '已約',
            flag3: '取消',
            flag4: '保留',

            addTitle: '業務預約-新增',
            editTitle: '業務預約-修改',
            workUnitTitle: '複合式派工點數設定',

            queryCheck1: '無查詢權限!',
            queryCheck2: '請至少輸入一項查詢條件!',
            addCheck: '無新增權限!',
            editCheck1: '無修改權限!',
            editCheck2: '狀態為已約,不可修改!',
            editCheck3: '狀態為取消,不可修改!',
            delCheck1: '無取消權限!',
            delCheck2: '狀態為已約,無法取消!',
            delCheck3: '已取消,無法再次取消!',
            privCheck: '無權限操作此功能!',

            queryResult: '查無資料!',
            delNote: '是否確定要取消預約?',
            delResult1: '取消成功!',
            delResult2: '取消失敗!'
        };
    });
};
//業務預約編輯
if ($.fn.SO1800B) {
    var SO1800B = (function () {
        this.language = {
            lblSalesEn: '業務人員',
            lblCodeNo: '多品選項',
            lblCustId: '客戶編號',
            lblResvTime: '預約時間',
            btnTime: '裝機預約',
            btnService: '維修順裝',
            btnRemove: '拆機順裝',
            btnQPoint: '點數查詢',
            btnSave: '存檔',
            btnCancel: '取消',

            toolTip1: '維修順裝機選單按鍵',
            toolTip2: '拆機順裝機選單按鍵',

            quiteNote: '新增或修改未存檔,是否真的要離開?',

            multiProCheck1: '至少必須選擇一項產品!',
            multiProCheck2: '未選擇管派類別!',
            timeCheck1: '請先決定客戶編號!',
            timeCheck2: '不能預約過去的時間!',
            timeCheck3: '無維修順裝機件!',
            timeCheck4: '無拆機順裝機件!',
            checkMessage1: '、裝機預約',
            checkMessage2: '、維修順裝',
            checkMessage3: '、拆機順裝',
            checkMessage4: '，點數設定已停用！',
            checkMessage5: '，查無產品點數設定，故由裝機類別代碼檔代入點數！',
            checkMessage6: '，查無產品點數設定！',

            resvTimeTitle: '預約派工',
            serviceTitle: '維修派工一覽表',
            prTitle: '停拆移機派工一覽表',

            saveResult1: '存檔成功!!',
            saveResult2: '存檔失敗!!',
        };
    });
};
//派工一覽表
if ($.fn.SO1800C) {
    var SO1800C = (function () {
        this.language = {
            colRESVTIME: '預約時間',
            colSNO: '工單單號',
            colWORKTYPE: '派工類別'
        };
    });
};

//故障區域管理
if ($.fn.SO2500B) {
    var SO2500B = (function () {
        this.language = {
            lblAffectPercent: '影響戶數百分比',
            lblAffectNum: '影響總戶數',
            lblCAffectNum: '服務別C',
            lblDAffectNum: '服務別D',
            lblIAffectNum: '服務別I',
            lblPAffectNum: '服務別P',
            lblSNo: '故障編號',
            lblIvrFileName: '故障語音代碼',
            chkShowMalfunction: '公佈故障訊息',
            lblDescription: '說　　　　明',
            lblErrorTime: '故障發生時間',
            lblCallTime: '通報時間',
            lblEndTime: '預定修復時間',
            lblArrivalTime: '抵達時間',
            cmWorkerEn: '工程人員',
            lblMFCode1: '故障原因一',
            lblMFCode2: '故障原因二',
            lblFinTime: '結案時間',
            lblAcceptTime: '受理時間',
            lblAcceptEn: '受理人員',
            lblReturnCode: '退單原因',

            tbItem1: '故障區域',
            tbItem2: '故障大樓/NODENO/網路編號',
            btnAdd: '新增',
            btnEdit: '修改',
            btnDelete: '刪除',
            lblNote: '(順序,地址範圍,服務區,行政區)',
            btnMdu: '新增故障大樓',
            btnNodeNo: '新增故障NODENO',
            btnCircuitNo: '新增網路編號',
            cmMdu: '故障大樓',
            radNode1: '依地址對應篩選',
            radNode2: '依地址明細篩選',
            cmNodeNo: '故障NodeNo',
            radCircuit1: '依地址對應篩選',
            radCircuit2: '依地址明細篩選',
            cmCircuit: '故障網路編號',

            colRANGE: '擷取範圍',
            colORD: '順序編號',
            colADDRESS: '地址',
            colSERVCODE: '服務區',
            colAREACODE: '行政區',
            colMDUID: '大樓編號',
            colMDUNAME: '大樓名稱',
            colNODENO: 'NODENO',
            colCIRCUITNO: '網路編號',

            btnSave: '存檔',
            btnCancel: '取消',

            workStatus1: '未完工',
            workStatus2: '退單',
            workStatus3: '已完工',
            stateView: '顯示',
            stateAppend: '新增',
            stateEdit: '修改',

            quiteNote: '新增或修改未存檔,是否真的要離開?',
            editCheck: '此為區段範圍地址,無法修改,請直接刪除,再新增!',
            deleteNote1: '確定刪除,這個動作將無法回復!',
            deleteNote2: '且會刪除其相關範圍內的地址!',
            loadCheck1: '故障區域序號長度過長!',
            loadCheck2: '此序號查無故障區域資料!',
            addCheck: '已有新增,請勿重複選取!',
            saveCheck: '結案時間有值時,[故障原因一]為必填欄位!',

            saveResult1: '存檔成功!!',
            saveResult2: '存檔失敗!!',

            subTitle: '故障區域設定'
        };
    });
};
//故障區域設定子檔管理
if ($.fn.SO2500B1) {
    var SO2500B1 = (function () {
        this.language = {
            chkRange: '擷取此範圍內的所有地址',

            btnSave: '存檔',
            btnCancel: '取消',

            quiteNote: '資料未存檔,確定放棄?',
            saveCheck1: '街道',
            saveCheck2: '順序編號',
            saveCheck3: '至號1',
            saveCheck4: '同一街道中順序編號不可以重複!',

            stateView: '顯示',
            stateAppend: '新增',
            stateEdit: '修改',

            saveNote: '此範圍共新增了{0}筆資料!',
        };
    });
};
//維修整批回單
if ($.fn.SO2500C) {
    var SO2500C = (function () {
        this.language = {
            lblCondition: '條件',
            lblAcceptTime1: '受理日期',
            lblAcceptTime2: '至',
            lblResvTime1: '預約日期',
            lblResvTime2: '至',
            cmServiceCode: '維修申告類別',
            cmNodeNo: 'NodeNo',
            cmMduId: '大樓編號',
            cmCircuitNo: '網路編號',
            cmServCode: '服務區',

            lblLeft: '預設值',
            lblWorkerEn1: '工作人員一',
            lblWorkerEn2: '工作人員二',
            lblSignEn: '簽收人員',
            lblSignDate: '簽收日期',

            lblRight: '個收戶選項',
            radClose: '整批完工',
            radReturnCode: '整批退單',
            lblFinTime: '完工日期',
            lblMFCode1: '故障原因一',
            lblMFCode2: '故障原因二',
            lblReturnCode: '退單原因',

            lblSelect: '選擇所有資料',
            lblSelectPlus: '清除所有資料',
            lblCount: '勾選筆數 / 總筆數',

            colCHOOSE: '選取',
            colCUSTID: '客戶編號',
            colCUSTNAME: '客戶名稱',
            colTEL1: '電話',
            colSNO: '單據編號',
            colFINTIME: '完工時間',
            colWORKEREN1: '工作人員代號1',
            colWORKERNAME1: '工作人員名稱1',
            colWORKEREN2: '工作人員代號2',
            colWORKERNAME2: '工作人員名稱2',
            colMFCODE1: '故障代碼1',
            colMFNAME1: '故障名稱1',
            colMFCODE2: '故障代碼2',
            colMFNAME2: '故障名稱2',
            colSIGNEN: '簽收人員代號',
            colSIGNNAME: '簽收人員名稱',
            colSIGNDATE: '簽收日期',
            colRETURNCODE: '退單原因代碼',
            colRETURNNAME: '退單原因',
            colUPDEN: '異動人員',
            colUPDTIME: '異動時間',
            colADDRSORT: '排序字串',
            colACCEPTEN: '受理人員代號',
            colACCEPTNAME: '受理人員姓名',
            colCOMPCODE: '公司別',
            colACCEPTTIME: '受理時間',
            colNOTE: '備註',
            colSERVICETYPE: '服務型態',
            colADDRESS: '地址',
            colADDRNO: '地址編號',
            colCALLOKTIME: '回報完工時間',
            colCLSEN: '日結人員代碼',
            colCLSTIME: '日結帳時間',
            colFINUNIT: '完工點數',
            colGROUPCODE: '工程組別',
            colGROUPNAME: '工程組名稱',
            colNODENO: 'NODE#',
            colOLDSNO: '舊單號',
            colPRINTTIME: '列印時間',
            colPRINTUSERNAME: '列印人員名稱',
            colPRIORITY: '優先處理',
            colPRTCLSTIME: '日結帳報表列時間',
            colPRTCOUNT: '工單列印次數',
            colRESVTIME: '預約時間',
            colSATICODE: '服務滿意度代碼',
            colSATINAME: '服務滿意度',
            colSERVCODE: '服務區代碼',
            colSERVICECODE: '申告代碼',
            colSERVICENAME: '申告名稱',
            colWORKUNIT: '派工點數',
            colWORKEREN3: '工作人員代號3',
            colSALESCODE: '業務區代碼',
            colSALESNAME: '業務區',

            btnOK: '確定',
            btnQuery: '維修單搜尋',
            btnCancel: '取消',

            loadCheck: '故障區域序號長度過長!',
            saveCheck: '您沒有選擇要作業的工單,系統不會作任何回單的動作!',
            okNote: '是否一併將未收資料改為已收?',
            queryResult: '無符合資料!',
            saveResult1: '執行完畢,筆數={0}!',
            saveResult2: '執行失敗!!',
        };
    });
};

//發票拋檔(含報表)
if ($.fn.SO4131A) {
    var SO4131A = (function () {
        this.language = {
            lblCompCode: '公司別',
            lblSystemVer: '系統版本',
            lblCustId1: '客戶編號',
            lblCustId2: '至',
            cmServiceType: '服務類別',
            cmClassCode: '客戶類別',
            cmBillType: '單據類別',
            cmCitemCode: '收費項目',
            cmClctEn: '收費人員',
            cmMduId: '大樓資料',
            cmCMCode: '收費方式',
            cmServCode: '服務區',
            lblRealDate1: '實收日期',
            lblRealDate2: '至',
            lblShouldDate1: '應收日期',
            lblShouldDate2: '至',
            lblUpdDate1: '異動日期',
            lblUpdDate2: '至',
            lblInvType: '發票種類',
            lblAddrType: '寄件地址',
            chkCitem1: '收費項目金額小於0是否拋檔',
            chkCitem2: '收費項目金額等於0是否拋檔',
            lblUpdEn: '異動人員',
            chkCityArea: '是否匯出縣市行政區字串',
            lblOrderType: '排序方式',
            lblGroupEmp: '人員依據',
            radUpdEn: '異動人員',
            radClctEn: '收費人員',
            chkProReport: '產生發票明細報表',
            chkFileOut: '產生發票拋帳檔',
            btnOK: '確定',
            btnCancel: '取消',
            btnPrevRpt: '上次統計結果',

            systemVer0: '開博舊版發票系統',
            systemVer1: '開博新版發票系統',
            billType1: '收費單',
            billType2: '裝機單',
            billType3: '停拆移機單',
            billType4: '維修單',
            billType5: '臨時收費單',
            invType1: '所有',
            invType2: '二聯式',
            invType3: '三聯式',
            addrType1: '裝機地址',
            addrType2: '收費地址',
            addrType3: '郵寄地址',
            orderType1: '客戶編號',
            orderType2: '單據編號',

            saveCheck01: '產生發票明細或產生發票拋檔二者需擇一!',
            downloadResult: '拋檔失敗!!',
        };
    });
};
//發票拋檔(會員制)
if ($.fn.SO4132A) {
    var SO4132A = (function () {
        this.language = {
            lblCompCode: '公司別',
            lblSystemVer: '系統版本',
            lblCustId1: '客戶編號',
            lblCustId2: '至',
            cmServiceType: '服務類別',
            cmClassCode: '客戶類別',
            cmBillType: '單據類別',
            cmCitemCode: '收費項目',
            cmClctEn: '收費人員',
            cmMduId: '大樓資料',
            cmCMCode: '收費方式',
            cmServCode: '服務區',
            lblRealDate1: '實收日期',
            lblRealDate2: '至',
            lblShouldDate1: '應收日期',
            lblShouldDate2: '至',
            lblUpdDate1: '異動日期',
            lblUpdDate2: '至',
            lblInvType: '發票種類',
            lblAddrType: '寄件地址',
            chkCitem1: '收費項目金額小於0是否拋檔',
            chkCitem2: '收費項目金額等於0是否拋檔',
            lblUpdEn: '異動人員',
            chkCityArea: '是否匯出縣市行政區字串',
            lblOrderType: '排序方式',
            lblGroupEmp: '人員依據',
            radUpdEn: '異動人員',
            radClctEn: '收費人員',
            chkProReport: '產生發票明細報表',
            chkFileOut: '產生發票拋帳檔',
            btnOK: '確定',
            btnCancel: '取消',
            btnPrevRpt: '上次統計結果',

            systemVer0: '開博舊版發票系統',
            systemVer1: '開博新版發票系統',
            billType1: '收費單',
            billType2: '裝機單',
            billType3: '停拆移機單',
            billType4: '維修單',
            billType5: '臨時收費單',
            invType1: '所有',
            invType2: '二聯式',
            invType3: '三聯式',
            addrType1: '裝機地址',
            addrType2: '收費地址',
            addrType3: '郵寄地址',
            orderType1: '客戶編號',
            orderType2: '單據編號',

            saveCheck01: '產生發票明細或產生發票拋檔二者需擇一!',
            saveCheck02: '請選擇[收費項目]值,並檢查該服務是否有設定會員制的收費項目!',
            downloadResult: '拋檔失敗!!',
        };
    });
};
//預開發票抛檔(含報表)
if ($.fn.SO4141A) {
    var SO4141A = (function () {
        this.language = {
            lblCompCode: '公司別',
            lblSystemVer: '系統版本',
            lblCustId1: '客戶編號',
            lblCustId2: '至',
            cmServiceType: '服務類別',
            cmClassCode: '客戶類別',
            cmBillType: '單據類別',
            cmCitemCode: '收費項目',
            cmClctEn: '收費人員',
            cmCMCode: '收費方式',
            cmServCode: '服務區',
            lblShouldDate1: '應收日期',
            lblShouldDate2: '至',
            lblUpdDate1: '異動日期',
            lblUpdDate2: '至',
            lblRealDate1: '實收日期',
            lblRealDate2: '至',
            lblInvType: '發票種類',
            lblAddrType: '寄件地址',
            lblGroupCust: '客戶種類',
            radAll: '全部客戶',
            radPreInvoice: '預收客戶',
            lblUpdEn: '異動人員',
            lblOrderType: '排序方式',
            chkCityArea: '是否匯出縣市行政區字串',
            chkCitem1: '收費項目金額小於0是否拋檔',
            chkCitem2: '收費項目金額等於0是否拋檔',
            chkProReport: '產生發票明細報表',
            chkFileOut: '產生發票拋帳檔',
            btnOK: '確定',
            btnCancel: '取消',
            btnPrevRpt: '上次統計結果',

            systemVer0: '開博舊版發票系統',
            systemVer1: '開博新版發票系統',
            billType1: '收費單',
            billType2: '裝機單',
            billType3: '停拆移機單',
            billType4: '維修單',
            billType5: '臨時收費單',
            billType6: '分期總額單',
            invType1: '所有',
            invType2: '二聯式',
            invType3: '三聯式',
            addrType1: '裝機地址',
            addrType2: '收費地址',
            addrType3: '郵寄地址',
            orderType1: '客戶編號',
            orderType2: '單據編號',

            saveCheck01: '產生發票明細或產生發票拋檔二者需擇一!',
            downloadResult: '拋檔失敗!!',
        };
    });
};
//預開發票抛檔(會員制)
if ($.fn.SO4142A) {
    var SO4142A = (function () {
        this.language = {
            lblCompCode: '公司別',
            lblSystemVer: '系統版本',
            lblCustId1: '客戶編號',
            lblCustId2: '至',
            cmServiceType: '服務類別',
            cmClassCode: '客戶類別',
            cmBillType: '單據類別',
            cmCitemCode: '收費項目',
            cmClctEn: '收費人員',
            cmCMCode: '收費方式',
            cmServCode: '服務區',
            lblShouldDate1: '應收日期',
            lblShouldDate2: '至',
            lblUpdDate1: '異動日期',
            lblUpdDate2: '至',
            lblRealDate1: '實收日期',
            lblRealDate2: '至',
            lblInvType: '發票種類',
            lblAddrType: '寄件地址',
            lblGroupCust: '客戶種類',
            radAll: '全部客戶',
            radPreInvoice: '預收客戶',
            lblUpdEn: '異動人員',
            lblOrderType: '排序方式',
            chkCityArea: '是否匯出縣市行政區字串',
            chkCitem1: '收費項目金額小於0是否拋檔',
            chkCitem2: '收費項目金額等於0是否拋檔',
            chkProReport: '產生發票明細報表',
            chkFileOut: '產生發票拋帳檔',
            btnOK: '確定',
            btnCancel: '取消',
            btnPrevRpt: '上次統計結果',

            systemVer0: '開博舊版發票系統',
            systemVer1: '開博新版發票系統',
            billType1: '收費單',
            billType2: '裝機單',
            billType3: '停拆移機單',
            billType4: '維修單',
            billType5: '臨時收費單',
            billType6: '分期總額單',
            invType1: '所有',
            invType2: '二聯式',
            invType3: '三聯式',
            addrType1: '裝機地址',
            addrType2: '收費地址',
            addrType3: '郵寄地址',
            orderType1: '客戶編號',
            orderType2: '單據編號',

            saveCheck01: '產生發票明細或產生發票拋檔二者需擇一!',
            saveCheck02: '請選擇[收費項目]值,並檢查該服務是否有設定會員制的收費項目!',
            downloadResult: '拋檔失敗!!',
        };
    });
};

//預收收入報表(一般)
if ($.fn.SO5A11A) {
    var SO5A11A = (function () {
        this.language = {
            lblRealDate: '實收日期',
            lblShouldDate: '應收日期',
            lblRefDate: '參考日期',
            lblCompCode: '公 司 別',
            lblYear: '收費起始日超幾年視為錯誤期限',
            lblServiceType: '服務類別',
            lblCustId: '客戶編號',
            chkPrintLog: '是否列印異常報表',
            lblNote: ' 請注意 : 非週期收費項目空白代表 <不選> ',
            cmCitemGroup: '週期性收費群組',
            cmCitemCode: '週期性收費項目',
            cmNoCitemCode: '非週期收費項目',
            cmClassCode: '客戶類別',
            cmBillType: '單據類別',
            cmServCode: '服務區',
            cmAreaCode: '行政區',
            cmStrtCode: '街道編號',
            cmOrder: '排序方式',
            cmMduId: '大樓編號',
            cmAccountItem: '會計科目',
            cmBPCode: '優惠組合',
            lblCircuitNo: '網路編號',
            radCircuitNo: '只印空白網路編號',
            radAll: '全部',
            lblReportType: '報表格式',
            radSummaric: '彙總表',
            radDetail: '明細表',
            radPen: '逐筆明細表',
            lblCharge: '收費資料',
            radCharge: '僅印有預收',
            radChargeAll: '全部',
            lblAmount: '統計金額',
            radNoTax: '未稅',
            radTax: '己稅',
            lblCustStatus: '統計對象',
            radCustAll: '全部',
            radMdu: '大樓戶',
            radNormal: '非大樓戶',
            chkUseIFRS: 'IFRS',
            btnPrint: '列印',
            btnPrevRpt: '上次統計結果',
            btnExcel: '匯成Excel',
            btnExit: '結束',
            btnNight: 'Night-run報表',

            billType1: '收費單',
            billType2: '裝機單',
            billType3: '停拆移機單',
            billType4: '維修單',
            billType5: '臨時收費單',
            orderType1: '單據編號',
            orderType2: '收費人員',
            orderType3: '客戶編號',
            orderType4: '收費日期',
            orderType5: '地址',
            orderType6: '服務區',

            subTitle: 'Night-run報表',

            saveCheck1: "實收起始日超過{0}年視為錯誤期限!",
            saveCheck2: "[大樓編號]及統計對象[非大樓戶]不可同時選擇!",
            resultErr: "後端程式呼叫失敗!",
            noData: "查無資料!",
            noError: "無異常資料!",
            printLogTimeTotal: "執行總花費時間：{0}秒",
        };
    });
};
//預收收入報表(NightRun報表)
if ($.fn.SO5A11B) {
    var SO5A11B = (function () {
        this.language = {
            lblServiceType: '服務類別',
            lblShouldDate: '歸屬年月',
            cmCitemCode: '週期性收費項目',
            cmClassCode: '客戶類別',
            btnNightReport: '產生 Night Run 報表',
            
        };
    });
};
//預收收入報表(已日結)
if ($.fn.SO5A12A) {
    var SO5A12A = (function () {
        this.language = {
            lblRealDate: '實收日期',
            lblShouldDate: '應收日期',
            lblRefDate: '參考日期',
            lblCompCode: '公 司 別',
            lblYear: '收費起始日超幾年視為錯誤期限',
            lblServiceType: '服務類別',
            lblCustId: '客戶編號',
            lblNote: ' 請注意 : 非週期收費項目空白代表 <不選> ',
            cmCitemGroup: '週期性收費群組',
            cmCitemCode: '週期性收費項目',
            cmNoCitemCode: '非週期收費項目',
            cmClassCode: '客戶類別',
            cmBillType: '單據類別',
            cmServCode: '服務區',
            cmAreaCode: '行政區',
            cmStrtCode: '街道編號',
            cmOrder: '排序方式',
            cmMduId: '大樓編號',
            cmAccountItem: '會計科目',
            cmBPCode: '優惠組合',
            lblCircuitNo: '網路編號',
            radCircuitNo: '只印空白網路編號',
            radAll: '全部',
            lblReportType: '報表格式',
            radSummaric: '彙總表',
            radDetail: '明細表',
            radPen: '逐筆明細表',
            lblCharge: '收費資料',
            radCharge: '僅印有預收',
            radChargeAll: '全部',
            lblAmount: '統計金額',
            radNoTax: '未稅',
            radTax: '己稅',
            lblCustStatus: '統計對象',
            radCustAll: '全部',
            radMdu: '大樓戶',
            radNormal: '非大樓戶',
            btnPrint: '列印',
            btnPrevRpt: '上次統計結果',
            btnExcel: '匯成Excel',
            btnChkLog: '異常資料',
            btnNight: 'Night-Run異常報表',
            btnExit: '結束',
            
            billType1: '收費單',
            billType2: '裝機單',
            billType3: '停拆移機單',
            billType4: '維修單',
            billType5: '臨時收費單',
            orderType1: '單據編號',
            orderType2: '收費人員',
            orderType3: '客戶編號',
            orderType4: '收費日期',
            orderType5: '地址',
            orderType6: '服務區',

            subTitle: 'Night-Run異常報表',

            saveCheck1: "實收起始日超過{0}年視為錯誤期限!",
            saveCheck2: "[大樓編號]及統計對象[非大樓戶]不可同時選擇!",
            //resultErr: "後端程式呼叫失敗!",
            //noData: "查無資料!",
            //noError: "無異常資料!",
            //printLogTimeTotal: "執行總花費時間：{0}秒",
        };
    });
};
//預收收入報表(NightRun異常報表)
if ($.fn.SO5A12B) {
    var SO5A12B = (function () {
        this.language = {
            lblRealDate: '實收日期',
            btnNightReport: '產生NightRun異常報表',

        };
    });
};

//收費項目代碼
if ($.fn.SO6430A) {
    var SO6430A = (function () {
        this.language = {
            lblCompCode: '公司別',
            lblCodeNo: '代碼',
            lblDescription: '名稱',
            lblServiceType: '服務類別',
            lblRefNo: '參考號',
            lblSign: '借貸符號(+/-)',
            lblRelationRefNo: '對應項目參考號',
            lblProductCode: '產品代碼',
            lblPeriod: '預設期數',
            lblAmount: '預設金額',
            lblTaxCode: '稅率',
            lblCMCode: 'CM速率',
            chkStopFlag: '停用',
            chkSyncSP: '同步優惠組合收費項目',

            tbItem1: '會計類',
            tbItem2: '設定類',
            tbItem3: '退費類',
            tbItem4: '費率表',
            tbItem5: '頻道明細',

            lblAccIdP1: '當期收入科目',
            lblAccIdM1: '當期預收科目',
            lblAccIdP2: '次期收入科目',
            lblAccIdM2: '次期預收科目',

            chkPeriodFlag: '週期性費用',
            chkMemberFlag: '為會員制之收費項目',
            chkByHouse: '以戶為單位',
            chkNoReplaceFlag: '不更新週期',
            chkNoShowCitem: '不顯示週期',
            chkIsFreeCharge: '免費',
            chkUseBoxMaxSize: '依據STB設備型號給DVR授權容量',
            chkMasterProduct: '付費頻道主商品',
            chkNoContCM: '無約升降速',
            chkPayChBasic: '付費基本頻道',
            chkSTBOnlinePay: '可線上刷卡',
            chkFreeFlag: '註記試看的收費項目',
            lblCitemType: '收費項目類別',
            lblCanUseType: '適合設備',
            lblResvDay: '預約(完工)日加n天',
            lblApportionMon: 'A1報表分攤月數',
            lblCPDescription: '帳單別名',
            lblAliasName: '收費別名',
            cmDTVCitemStr: 'DTV收費項目',
            lblPayCHDependCode: '付費頻道依存收費項目',
            lblMCitemCode: '主收費項目代碼',
            lblDVRSizeCode: 'DVR錄影時間',
            lblOverPayCode: '溢繳收費項目',
            lblDeOverPayCode: '折抵上期溢繳收費項目',
            lblCitemClassCode1: '收費項目分類1',
            lblCitemClassCode2: '收費項目分類2',

            chkCloseMonth: '結清逐筆以月計算(週期)',
            lblDiscountRate: '折扣率',
            lblBackAmount: '退費日額',
            lblReturnCode: '退費對應項目',
            lblDeficiencyCode: '不足月收費項目',
            lblRetBalanceCode: '退費補償對應項目',
            lblFillChargeCode: '結清補收對應項目',
            lblDiscountCode: '折讓對應項目',
            lblNaturalcode: '優惠還原調整項目',
            lblRollOutCode: '轉出收費項目',
            lblPenalCitemCode: '違約金收費項目',
            lblReimburseCode: '斷訊補償收費項目',
            cmReturnCombCitem: '退費需合併項目',

            btnAddPrice: '',
            btnEditPrice: '',
            btnDeletePrice: '',
            btnAddChDetial: '',
            btnEditChDetial: '',
            btnDeleteChDetial: '',

            colCitemCODENO: '代碼',
            colCitemDESCRIPTION: '名稱',
            colCitemREFNO: '參考號',
            colCitemRELATIONREFNO: '對應項目參考號',
            colCitemSERVICETYPE: '服務類別',
            colCitemCPDESCRIPTION: '帳單別名',
            colCitemSIGN: '借貸',
            colCitemPERIODFLAG: '是否週期性費用',
            colCitemMEMBERFLAG: '為會員制之收費項目',
            colCitemAMOUNT: '預設金額',
            colCitemACCIDP1: '當期收入科目',
            colCitemCMNAME: 'CM速率',
            colCitemTAXNAME: '稅率名稱',
            colCitemRETURNNAME: '退費對應項目名稱',
            colCitemDEFICIENCYNAME: '不足月收費項目名稱',
            colCitemRETBALANCENAME: '退費補償對應項目名稱',
            colCitemFILLCHARGENAME: '結清補收收費項目名稱',
            colCitemDISCOUNTNAME: '折讓對應項目',
            colCitemRESVDAY: '預約(完工)日加n天',
            colCitemSTOPFLAG: '停用',
            colCitemUPDEN: '異動人員',
            colCitemUPDTIME: '異動時間',

            colPriceCLASSNAME: '客戶類別',
            colPricePERIOD: '期數',
            colPriceAMOUNT: '金額',
            colPriceDAYAMT: '單日金額',
            colPriceTRUNCAMT: '金額歸整',
            colPricePFLAG1: '破月期數(裝機單)',
            colPricePFLAG2: '破月期數(收費單)',

            colChDetialCODENO: '頻道代碼',
            colChDetialDESCRIPTION: '頻道名稱',

            btnSave: '存檔',
            btnPrint: '列印',
            btnAdd: '新增',
            btnEdit: '修改',
            btnCombine: '合併收費項目設定',
            btnCopy: '跨區複製',
            btnCancel: '離開',
            btnCancel2: '取消',

            stateView: '顯示',
            stateAppend: '新增',
            stateEdit: '修改',

            subTitle1: '新增費率',
            subTitle2: '修改費率',
            subTitle3: '新增頻道',
            subTitle4: '修改頻道',
            subTitle5: '收費項目合併設定檔',
            subTitle6: '跨區複製',

            quiteNote: '新增或修改未存檔,是否真的要離開?',
            saveCheck01: '代碼',
            saveCheck02: '名稱',
            saveCheck03: '輸入[名稱]時,限制其長度不得超過40!',
            saveCheck04: '借貸符號',
            saveCheck05: '輸入[借貸符號]時,其值僅能為[+]或[-]!',
            saveCheck06: '[預設期數]需大於0',
            saveCheck07: '服務別',
            saveCheck08: '稅率',
            saveCheck09: '輸入[帳單別名]時,限制其長度不得超過40!',
            saveCheck10: '輸入[收費別名]時,限制其長度不得超過40!',
            saveCheck11: '預設期數',
            privCheck: '無收費項目合併權限!',

            saveResult1: '存檔成功!!',
            saveResult2: '存檔失敗!!',
            saveResult3: '稅率有改變，合併收費項目內容將清除，必須重選!!',
            copyResult1: '跨區複製成功!!',
            copyResult2: '跨區複製失敗!!',

            tfItem1: '是',
            tfItem2: '否',
            pfItem0: '等於期數',
            pfItem1: '小於期數',
            pfItem2: '大於期數',
            canUseType0: '不分',
            canUseType1: 'Nagra',
            canUseType2: 'NSTV'
        };
    });
};
//收費項目代碼-牌價表編輯
if ($.fn.SO6430A1) {
    var SO6430A1 = (function () {
        this.language = {
            lblClassCode: '客戶類別',
            lblPeriod: '期數',
            lblAmount: '金額',
            lblDayAmt: '單日金額',
            lblTruncAmt: '金額歸整',
            lblPFlag1: '破月期數(裝機單)',
            lblPFlag2: '破月期數(收費單)',
            btnOK: '確定',
            btnCancel: '取消',

            pFlag0: '等於期數',
            pFlag1: '小於期數',
            pFlag2: '大於期數',

            loadCheck1: '呼叫端未傳入牌價表資料!',
            saveCheck1: '[期數]需有值!',
            saveCheck2: '[金額]需有值!',
            saveCheck3: '[單日金額]需有值!',
            saveCheck4: '[金額歸整]需有值!',
            saveCheck5: '[破月期數(裝機單)]需有值!',
            saveCheck6: '[破月期數(收費單)]需有值!',
            saveCheck7: '資料重複，請重新操作!'
        };
    });
};
//收費項目代碼-頻道明細編輯
if ($.fn.SO6430A2) {
    var SO6430A2 = (function () {
        this.language = {
            lblChDetial: '頻道',
            btnOK: '確定',
            btnCancel: '取消',

            loadCheck1: '呼叫端未傳入頻道明細資料!',
            saveCheck1: '[頻道]需有值!',
            saveCheck2: '資料重複，請重新操作!'
        };
    });
};
//收費項目代碼-收費項目合併設定檔視窗
if ($.fn.SO6430A3) {
    var SO6430A3 = (function () {
        this.language = {
            lblCodeNo: '代碼',
            lblDescription: '名稱',
            lblTaxCode: '稅率',
            radSign1: '正項(+)',
            radSign2: '負項(-)',
            cmCitemCodeStr: '收費項目',
            chkStopFlag: '停用',
            btnSave: '存檔',
            btnAdd: '新增',
            btnEdit: '修改',
            btnCancel: '離開',
            btnCancel2: '取消',

            stateView: '顯示',
            stateAppend: '新增',
            stateEdit: '修改',

            quiteNote: '新增或修改未存檔,是否真的要離開?',

            loadCheck1: '呼叫端未傳入頻道明細資料!',
            loadCheck2: '非週期性收費，不允許收費項目合併!',
            saveCheck1: '[收費項目]為必要欄位，必須有值!',
            saveResult1: '存檔成功!',
            saveResult2: '存檔失敗!'
        };
    });
};

//產品代碼
if ($.fn.SO68L0A) {
    var SO68L0A = (function () {
        this.language = {
            lblCompCode: '公司別',
            lblCodeNo: '代碼',
            lblDescription: '名稱',
            lblRefNo: '參考號',
            lblShortCode: '簡碼',
            lblProductGroup: '產品群組',
            lblDependCode: '依存產品代碼',
            lblProductType: '產品種類',
            lblCanDependCount: '可依存產品數',
            lblServiceType: '服務別',
            lblProdMainCode: '大項類別',
            chkStopFlag: '停用',

            tbItem1: '收費項目',
            tbItem2: '對應派工類別',
            tbItem3: '產品所需設備',
            tbItem4: '產品頻道',
            tbItem1Note: '請設定正負項月費、正負項退費項目、不足月費、違約金收費項目、斷訊補償收費項目、保證金',
            tbItem2Note: '裝機類 請設定參考號1新裝、2分機、3加裝設備、5拆機復機、14促案變更、16頻道授權、21恢復頻道、26頻道促變<br/><div style="text-align:left;">停拆移類 請設定參考號2拆機、6拆設備、10頻道停權、15暫停頻道<div />',
            btnCitem: '收費項目檔',
            btnAddWork: '',
            btnEditWork: '',
            btnDeleteWork: '',
            btnInstCode: '裝機類別檔',
            btnPrCode: '停拆移機檔',
            btnAddFaci: '',
            btnEditFaci: '',
            btnDeleteFaci: '',
            btnModelCode: '設備檔',
            btnAddCh: '',
            btnEditCh: '',
            btnDeleteCh: '',
            btnChannelCode: '頻道檔',
            cmCitem_Hide: '收費項目',
            cmChannel_Hide: '產品頻道',

            colProductCODENO: '代碼',
            colProductDESCRIPTION: '名稱',
            colProductREFNO: '參考號',
            colProductSHORTCODE: '簡碼',
            colProductDEPENDNAME: '依存產品',
            colProductPRODUCTTYPE: '產品種類',
            colProductSERVICETYPE: '服務別',
            colProductCANDEPENDCOUNT: '可依存產品數',
            colProductPRODMAINCODE: '產品大項類別',
            colProductSTOPFLAG: '停用',
            colProductUPDEN: '異動人員',
            colProductUPDTIME: '異動時間',

            colCitemCODENO: '收費項目代碼',
            colCitemDESCRIPTION: '收費項目名稱',
            colCitemREFNO: '參考號',
            colCitemSIGN: '借貸',
            colCitemSTOPFLAG: '停用',
            colCitemPERIODFLAG: '是否週期費用',
            colCitemRETURNNAME: '退費收費項目',

            colWorkWORKERTYPE: '派工種類',
            colWorkWORKCODE: '派工代碼',
            colWorkWORKNAME: '派工類別',
            colWorkINCLUDEFACI: '包含設備',

            colFaciFACICODE: '設備代碼',
            colFaciFACINAME: '設備項目',
            colFaciWORKNAME: '派工種類',

            colChCODENO: '頻道代碼',
            colChDESCRIPTION: '頻道名稱',

            btnSave: '存檔',
            btnAdd: '新增',
            btnEdit: '修改',
            btnCopy: '跨區複製',
            btnWorkSet: '複合式派工點數設定',
            btnCancel: '離開',
            btnCancel2: '取消',

            productType0: '一般',
            productType1: 'VOD',
            productType2: 'SVOD',
            productType3: 'PVOD',
            workTypeI: '裝機類',
            workTypeP: '停拆移類',

            quiteNote: '新增或修改未存檔,是否真的要離開?',
            saveCheck01: '代碼',
            saveCheck02: '名稱',
            saveCheck03: '輸入[名稱]時,限制其長度不得超過40!',
            saveCheck04: '輸入[簡碼]時,限制其長度不得超過3!',
            saveCheck05: '輸入[產品群組]時,限制其長度不得超過40!',
            saveCheck06: '服務別',

            stateView: '顯示',
            stateAppend: '新增',
            stateEdit: '修改',

            subWorkTitle1: '新增派工類別',
            subWorkTitle2: '修改派工類別',
            subFaciTitle1: '新增所需設備',
            subFaciTitle2: '修改所需設備',
            subChTitle1: '新增產品頻道',
            subChTitle2: '修改產品頻道',
            citemTitle: '收費項目代碼',
            instTitle: '裝機代碼檔',
            prTitle: '停拆移機代碼檔',
            modelTitle: '品名編號代碼檔',
            channelTitle: '頻道代碼檔',
            copyTitle: '跨區複製',
            cWorkTitle: '複合式派工點數',

            saveResult1: '存檔成功!!',
            saveResult2: '存檔失敗!!',
            copyResult1: '跨區複製成功!!',
            copyResult2: '跨區複製失敗!!'
        };
    });
};
//產品代碼-複合式派工點數設定
if ($.fn.SO68L0A1) {
    var SO68L0A1 = (function () {
        this.language = {
            tbInst: '一般裝機',
            tbMaintain: '維修順裝',
            tbPr: '拆機順裝',
            chkStopFlag: '停用',
            colDESCRIPTION: '派工管派',
            colTOTALPOINT1: '總點數',
            colDETIALITEM1: '裝機類點數',
            colTOTALPOINT2: '總點數',
            colDETIALITEM2: '裝佔用維修點數',
            colTOTALPOINT3: '總點數',
            colDETIALITEM3: '裝佔用拆退點數',
            colGROUP1: '一般',
            colGROUP2: '維修',
            colGROUP3: '拆機',

            btnAdd: '新增',
            btnEdit: '修改',
            btnSave: '存檔',
            btnCancel: '離開',
            btnCancel2: '取消',

            stateView: '顯示',
            stateAppend: '新增',
            stateEdit: '修改',

            quiteNote: '新增或修改未存檔,是否真的要離開?',

            saveCheck1: '至少必須選擇一項產品!',
            saveCheck2: '未選擇管派類別!',
            saveCheck3: '未輸入點數!',
            saveResult1: '存檔成功!',
            saveResult2: '存檔失敗!'
        };
    });
};
//產品代碼-派工類別編輯
if ($.fn.SO68L0A2) {
    var SO68L0A2 = (function () {
        this.language = {
            lblWorkerType: '派工種類',
            lblWorkCode: '派工類別',
            chkIncludeFaci: '需附掛設備',
            btnOK: '確定',
            btnCancel: '取消',

            workerTypeI: '裝機類',
            workerTypeP: '停拆移機類',

            loadCheck1: '呼叫端未傳入對應派工資料!',
            saveCheck1: '[派工種類]需有值!',
            saveCheck2: '[派工類別]需有值!',
            saveCheck3: '資料重複，請重新操作!'
        };
    });
};
//產品代碼-所需設備編輯
if ($.fn.SO68L0A3) {
    var SO68L0A3 = (function () {
        this.language = {
            lblFaciCode: '設備項目',
            lblWorkCode: '派工類別',
            btnOK: '確定',
            btnCancel: '取消',

            loadCheck1: '呼叫端未傳入所需設備資料!',
            saveCheck1: '[設備項目]需有值!',
            saveCheck2: '資料重複，請重新操作!'
        };
    });
};
//產品代碼-產品頻道編輯
if ($.fn.SO68L0A4) {
    var SO68L0A4 = (function () {
        this.language = {
            lblChCode: '頻道內容',
            btnOK: '確定',
            btnCancel: '取消',

            loadCheck1: '呼叫端未傳入所需設備資料!',
            saveCheck1: '[頻道內容]需有值!',
            saveCheck2: '資料重複，請重新操作!'
        };
    });
};

//多品優惠代碼
if ($.fn.SO68M0A) {
    var SO68M0A = (function () {
        this.language = {
            lblCompCode: '公司別',
            lblSelCondition: '搜尋條件',
            chkSelAll: '搜尋全部',
            lblBeginDate: '生效期間',
            chkStopFlag: '停用',
            lblDiscountType: '優惠依據',
            radDiscountType1: '依戶計算',
            radDiscountType2: '依設備計算',
            lblCalPrinciples: '計算原則',
            radCalPrinciples1: '只有上網(一台設備)or數位(一台設備)視為一個產品',
            radCalPrinciples2: 'N台設備，不同速率/不同容量視為多個產品',
            radCalPrinciples3: 'N台設備(CM)，N個產品(DTV)',
            lblDiscountBy: '折扣方式',
            radDiscountBy1: '總金額百分比',
            radDiscountBy2: '固定金額折扣',

            colCODENO: '代碼',
            colDESCRIPTION: '多品名稱',
            colSTARTDATE: '生效起日',
            colSTOPDATE: '生效訖日',
            colDISCOUNTTYPE: '優惠依據',
            colSTOPFLAG: '停用',
            colCITEMREFNO: '收費參考號',
            colPRODUCTNAMESTR: '適用產品',
            colUPDTIME: '異動時間',
            colUPDEN: '異動人員',

            btnAdd: '新增',
            btnEdit: '修改',
            btnView: '顯示明細',
            btnCopy: '跨區複製',
            btnCencal: '清除查詢條件',
            btnQuery: '查詢',

            discountType1: '依戶計算',
            discountType2: '依設備計算',

            subTitle1: '多品優惠新增',
            subTitle2: '多品優惠修改',
            subTitle3: '多品優惠明細',
            subTitle4: '跨區複製',

            saveResult1: '存檔成功!!',
            saveResult2: '存檔失敗!!',
            copyResult1: '跨區複製成功!!',
            copyResult2: '跨區複製失敗!!'
        };
    });
};
//多品優惠代碼-編輯
if ($.fn.SO68M0A1) {
    var SO68M0A1 = (function () {
        this.language = {
            lblCodeNo: '代碼',
            lblDescription: '名稱',
            chkOrderOnly: '限訂購優惠',
            chkStopFlag: '停用',
            lblRefNo: '參考號',
            lblCitemRefNo: '收費參考號',
            lblStartDate: '生效期間',
            lblDiscountType: '優惠依據',
            radDiscountType1: '依戶',
            radDiscountType2: '依設備',
            cmProductCodeStr: '適用產品',
            cmMduIdStr: '大樓',
            cmCircuitNoStr: '網路編號',
            cmAreaCodeStr: '行政區',

            tbItem1: '子檔清單',
            colCD124ADISCOUNTITEM: '項次',
            colCD124APRODNAMELIST: '優惠對象產品',
            colCD124ACMRATENAMELIST: '速率',
            colCD124AAMOUNT1: '優惠金額(起)',
            colCD124AAMOUNT2: '優惠金額(迄)',
            colCD124APERIOD1: '期數(起)',
            colCD124APERIOD2: '期數(迄)',
            colCD124ADVRSIZENAMELIST: 'DVR容量',
            colCD124ADISCOUNTAMOUNT: '折扣金額',
            colCD124ARATE: '折扣率',
            colCD124ANOTE: '備註',
            colCD124AUPDTIME: '異動時間',
            colCD124AUPDEN: '異動人員',

            btnUnfoldCD124A: '展開',
            btnRefreshCD124A: '重新編號',

            tbItem2: '排除清單',
            colCD124CPROGROUPCODE: '產品組合代碼',
            colCD124CPROGROUPNAME: '產品組合名稱',
            colCD124CPRODUCTNAME: '產品',
            colCD124CCITEMNAME: '收費項目',

            btnSave: '存檔',
            btnCancel: '取消',

            stateView: '顯示',
            stateAppend: '新增',
            stateEdit: '修改',

            discountType1: '只有上網(一台設備)or數位(一台設備)視為一個產品',
            discountType2: 'N台設備，不同速率/不同容量視為多個產品',
            discountType3: 'N台設備(CM)，N個產品(DTV)',

            quiteNote: '新增或修改未存檔,是否真的要離開?',

            discountCodeCheck: '優惠代碼已被使用，請換其它代碼!',
            refNoCheck: '此參考號已被其他優惠使用，請換其他號碼!',
            paraCheck1: '優惠代碼',
            paraCheck2: '收費參考號',
            paraCheck3: '適用產品',
            discountCheck1: '存在產品組合，不可修改!',
            discountCheck2: '存在產品組合，不可刪除',
            saveCheck01: '代碼',
            saveCheck02: '名稱',
            saveCheck03: '輸入[名稱]時,限制其長度不得超過40!',
            saveCheck04: '生效日期',
            saveCheck05: '收費參考號',
            saveCheck06: '適用產品',
            saveCheck07: '至少必須設定一項多品優惠子檔!',
            saveCheck08: '項次{0}，多品優惠子檔的[優惠對象產品]不可為空值!',
            saveCheck09: '項次{0}，多品優惠子檔，產品[{1}]不在[適用產品]清單內!',
            saveCheck10: '項次{0}，多品優惠子檔，未設定分配比率代碼!',
            saveCheck11: '項次{0}，分配比率代碼檔，[產品代碼]不可為空值!',
            saveCheck12: '項次{0}，分配比率代碼檔，[收費項目]不可為空值!',
            saveCheck13: '項次{0}，分配比率代碼檔，產品{1}不在[適用產品]清單內!',
            saveCheck14: '項次{0}，分配比率代碼檔，收費項目{1}與目前[收費參考號]不符!',
            saveCheck15: '排除優惠明細子檔，產品{0}不在[適用產品]清單內!',

            subTitle1: '新增子檔清單',
            subTitle2: '修改子檔清單',
            subTitle3: '新增排除清單',
            subTitle4: '修改排除清單',
            subTitle5: '新增子檔展開'
        };
    });
};
//多品優惠代碼--多品優惠子檔
if ($.fn.SO68M0A2) {
    var SO68M0A2 = (function () {
        this.language = {
            lblItem: '項次：',
            lblCalPrinciples: '優惠計價依據：',
            lblDiscountType: '優惠種類：',
            lblAmount1: '單月購買總金額',
            lblAmount2: '至',
            lblPeriod1: '期數',
            lblPeriod2: '至',
            lblDiscountEn: '優惠條件：',
            cmProduct: '產品',
            cmCMRate: '速率',
            cmDVR: '容量',
            radCalPrinciples1: '依戶',
            radCalPrinciples2: '依設備',
            lblDiscountBy: '折扣方式：',
            radDiscountBy1: '總金額百分比',
            radDiscountBy2: '固定金額折扣',
            lblNote1: '備註',
            lblNote2: '分配比率',
            lblNote3: '優惠折扣項目',
            btnOK: '確定',
            btnCancel: '取消',

            saveCheck01: '[優惠數量]、[單月購買總金額]及[期數]必須擇一輸入!',
            saveCheck02: '[優惠條件]未選擇CM，不得輸入[優惠對象速率]!',
            saveCheck03: '[優惠條件]未選擇DTV，不得輸入[優惠對象容量]!',
            saveCheck04: '[總金額百分比]及[固定金額折扣]必須擇一輸入!',
            saveCheck05: '[備註]長度不得超過2000碼!',
            saveCheck06: '未輸入[優惠折扣項目]!',
            saveCheck07: '未輸入[分配比率]!',
            saveCheck08: '未分配產品!',
            saveCheck09: '所選擇的產品未在[優惠對象產品]清單內!',
            saveCheck10: '分配比率合計必須為100，目前合計為',
            saveCheck11: '[優惠條件]的產品項目，為必要欄位，必須有值!',
            saveCheck12: '[優惠條件]的產品項目，有產品不在[適用產品]清單內!',
            saveCheck13: '已存在相同[優惠對象產品]的資料，是否仍要存檔?',
            saveCheck14: '必須選擇擇[優惠計價依據]!'
        };
    });
};
//多品優惠代碼--多品優惠排除子檔
if ($.fn.SO68M0A3) {
    var SO68M0A3 = (function () {
        this.language = {
            lblProduct: '產品',
            lblCitem: '收費項目',
            btnOK: '確定',
            btnCancel: '取消',

            saveCheck1: '請至少輸入一種產品或收費項目!',
            saveCheck2: '產品+收費項目的組合重複!'
        };
    });
};
//多品優惠代碼--多品優惠子檔展開
if ($.fn.SO68M0A4) {
    var SO68M0A4 = (function () {
        this.language = {
            lblDiscountEn: '優惠條件：',
            cmProduct: '產品',
            cmCMRate: '速率',
            cmDVR: '容量',
            lblProdChos: '產品任選',
            lblAmount1: '單月購買總金額',
            lblAmount2: '至',
            lblPeriod1: '期數',
            lblPeriod2: '至',
            lblDiscountBy: '折扣方式：',
            radDiscountBy1: '總金額百分比',
            radDiscountBy2: '固定金額折扣',
            lblNote1: '備註',
            btnOK: '確定',
            btnCancel: '取消',

            saveCheck01: '必須選擇擇[優惠計價依據]!',
            saveCheck02: '[優惠條件]的產品項目，為必要欄位，必須有值!',
            saveCheck03: '[產品任選]的數量不得超過產品數量!',
            saveCheck04: '[優惠條件]未選擇CM，不得輸入[優惠對象速率]!',
            saveCheck05: '[優惠條件]未選擇DTV，不得輸入[優惠對象容量]!',
            saveCheck06: '[總金額百分比]及[固定金額折扣]必須擇一輸入!',
            saveCheck07: '[備註]長度不得超過2000碼!',
        };
    });
};

//使用者權限設定(MSO)
if ($.fn.SO7220A) {
    var SO7220A = (function () {
        this.language = {
            lblCompCode: '公司別',

            btnOk: '設定',
            btnSave: '存檔',
            btnCancel: '取消',
            chkUptoAllRight: '勾選項目於此 SO 的所有群組均開放',

            lblGroupName: '群組名稱',
            lblSupervisor: '主管',
            lblGroupId: '授權群組',
            btnCopyToOther: '跨區複製群組',
            cmSupervisor2: '副主管',
            cmOnlyseevisor: '僅能檢視',
            lblRange: '群組設定範圍',
            radStartEnd: '起始結束組群',
            btnSet: '指定群組',
            btnSet2: '完成設定',
            btnAdd: '新增',
            btnEdit: '修改',
            btnDelete: '刪除',
            btnSaveM: '存檔',
            btnCancelM: '離開',
            btnCancelM2: '取消',
            colGROUPID: '權限組別',
            colGROUPNAME: '群組名稱',
            colGROUPRANGE: '群組範圍',
            colSUPERVISOR: '主管',
            colUPDEN: '異動人員',
            colUPDTIME: '異動時間',

            colPROMPT: '權限名稱',

            group: '群組',
            quiteNote: '新增或修改未存檔,是否放棄?',
            delNote: '確定要刪掉本筆記錄?',
            subTitle: '資料區清單',

            setCheck: '群組欄位必須有值!',
            saveCheck1: '群組範圍必需介於 1 ~ 200 之間!',
            saveCheck2: '此使用者已賦予其他權限!',
            saveResult1: '存檔成功!',
            saveResult2: '存檔失敗!',
            delResult1: '刪除成功!',
            delResult2: '刪除失敗!',
        };
    });
};
//跨區複製群組
if ($.fn.SO7220A1) {
    var SO7220A1 = (function () {
        this.language = {
            lblCompanys: '相關資料區',
            btnOK: '確定',
            btnCancel: '取消',

            saveCheck1: '沒有選取任何公司資料,不進行任何同步作業!',
            saveCheck2: '沒有選取任何群組資料,不進行任何同步作業!',
            saveNote1: '以下開始將組別權限,複製到所指定的公司別資料區\n一旦完成異動程序，所有的動作將無法復原,你確認要繼續嗎?',
            saveNote2: '你取消了異動的操作,程式將中止同步作業!',
            saveNote3: '同步作業開始,這是無法復原的程序!',
            saveResult1: '同步作業完成!',
            saveResult2: '同步作業失敗!'
        };
    });
};
//使用者權限設定(SO)
if ($.fn.SO7220B) {
    var SO7220B = (function () {
        this.language = {
            lblCompCode: '公司別',

            btnOk: '設定',
            btnSave: '存檔',
            btnCancel: '取消',
            btnCopy: '權限複製',
            chkUptoAllRight: '所有群組給予功能權限',
            colPROMPT: '權限名稱',

            lblGroupName: '群組名稱',
            lblSupervisor: '主管',
            lblGroupId: '授權群組',
            lblRange: '群組設定範圍',
            radStartEnd: '起始結束組群',
            btnSet: '指定群組',
            btnSet2: '完成設定',
            lblNote: '設定說明',
            lblNote1: '1.填入所要設定的權限組別 如 1,2,3 .....',
            lblNote2: '2.按下設定權限操作按鈕',
            lblNote3: '3.右邊出現相關權限設定樹狀結構圖',
            lblNote4: '4.點選所要設定的權限方塊勾選或取消',
            lblNote5: '5.按存檔完成權限設定工作',
            lblNote6: '　按取消離開權限設定工作',
            lblNote7: '6.【所有群組給予功能權限】',
            lblNote8: '　勾選：將所勾選之功能選項，給予所有群組',
            lblNote9: '　不勾選：將所勾選之功能選項，所有群組權限收回',

            all: '共用權限',
            group: '群組',

            saveResult1: '存檔成功!',
            saveResult2: '存檔失敗!',
            saveResult3: '複製完成!',
            saveResult4: '複製失敗!',
        };
    });
};

//公佈欄
if ($.fn.SO8100A) {
    var SO8100A = (function () {
        this.language = {
            lblBoardTime: '公告時間：',
            lblBoardEn: '公告人員：',
            lblSubject: '摘要：',
            txtSubject: '摘要',
            lblContent: '內容：',
            txtContent: '內容',
            lblBoardDate1: '公布起訖時間：',
            txtBoardDate1: '公布起訖時間',
            lblFontColor: '播放字色：',
            lblShowSecond: '播放秒數：',
            txtStopFlag: '暫停',
            txtGroupIDStr: '顯示對象',

            colBOARDTIME: '公告時間',
            colBOARDEN: '公告人員',
            colSUBJECT: '摘要',
            colCONTENT: '內容',
            colBOARDDATE1: '公布起始',
            colBOARDDATE2: '公布截止',
            colSTOPFLAG: '停用',
            colUPDTIME: '異動時間',
            colUPDEN: '異動人員',
            colSHOWSECOND: '播放秒數',

            btnAdd: '新增',
            btnEdit: '修改',
            btnUpdate: '存檔',
            btnSearch: '查詢',
            btnCancel1: '離開',
            btnCancel2: '取消',

            stateAdd: '新增',
            stateEdit: '修改',
            stateView: '顯示',

            mustBe: '[{0}]為必要欄位!!',
            lengthBe: '[{0}]長度不得超越{1}碼!!',

            FormTitle: '查詢條件選擇'
        };
    });
};
//公佈欄查詢條件
if ($.fn.SO8100B) {
    var SO8100B = (function () {
        this.language = {
            radAll: '搜尋全部',
            radSubject: '摘要',
            radContent: '內容',
            radStopFlag: '是否暫停',
            radBoardDate: '公布起迄時間',

            chkStopFlag: "勾選表示搜尋'停用'的條件",
            btnSearch: '搜尋',
            btnCancel: '關閉',
        };
    });
};

//動態入帳
if ($.fn.dynTextFileIn) {
    var dynTextFileIn = function () {
        this.language = {};
        this.language.company = "公司別";
        this.language.inType = "登入格式";
        this.language.sourceText = "資料來源";
        this.language.fileError = "檔案上傳失敗,失敗原因:{0}";
        this.language.btnLogFile = "LOG檔案";
        this.language.btnOk = "確定";
        this.language.btnClear = "清除";
        this.language.btnExit = "離開";

        this.language.executeOk = "執行成功!! {0}";
        this.language.executeError = "執行錯誤,錯誤原因: {0}!!"
    };
};

//動態後端
if ($.fn.dynDBStoreFunction) {
    var dynDBStoreFunction = function () {
        this.language = {};
        this.language.company = "公司別";
        this.language.btnOk = "確定";
        this.language.btnClear = "清除";
        this.language.btnExit = "離開";

        this.language.executeOk = "執行成功!!";
        this.language.executeError = "執行錯誤,錯誤原因: {0}!!"
    };
};