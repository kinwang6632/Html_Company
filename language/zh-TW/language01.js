//Utility
//var utility = {
//    language: {
//        prompt: '提示!!',
//        yes: "是(Y)",
//        no: "否(N)",
//        cancel: "取消",
//        ok: "確定",
//        mustBe: "[{0}]為必要欄位"
//    }
//};
var utility = (function () {
    this.language = {};
    this.language.noEncryptKey = '請重新登入!!';
    this.language.prompt = '提示!!';
    this.language.yes = '是(Y)';
    this.language.no = '否(N)';
    this.language.cancel = '取消';
    this.language.ok = '確定';
    this.language.mustBe = '[{0}]為必要欄位';
    this.language.IDLengthMustBe = "所輸入身分證號的長度必須為10!!";
    this.language.IDFirstWordMustBe = "身分證號的第一碼必須是英文字!!";
    this.language.IDError = "身分證號輸入錯誤!!";
    this.language.invIDLengthMustBe = "所輸入統一編號的長度必須為8碼!!";
    this.language.invIDError = "統一編號輸入錯誤!!";
    this.language.downloadFile = "下載檔案";

    this.language.VISAError = '(VISA): 長度必須為 16, 且第1碼必需為4。';
    this.language.MASTERError = '(MASTER): 長度必須為 16, 且第1碼必需為5。';
    this.language.JCBError = 'JCB): 長度必須為 16, 且第1碼必需為3。';
    this.language.NCCError = '(聯合信用卡): 長度必須為 15。';
    this.language.AEError = '(美國運通卡): 長度必須為 15。';
    this.language.DCError = '(大來卡): 長度必須為 14。';
    this.language.columnYes = '是';
    this.language.columnNo = '否';
    this.language.lengthToLong = "[{0}]欄位長度太長:{1},可輸入長度為:{2}";
    
    this.language.preFix = ["先生", "小姐", "女士"];
    this.language.pleaseChoose = "請選";
    this.language.checkManagerPDD = "主管驗證";
    this.language.noManagerCheckCannotEdit = "無主管認證無法修改";
    this.language.noManagerCheckCannotDel = "無主管認證無法刪除";
});

//SO5D00
if ($.fn.SO5D00A) {
    var SO5D00A = (function () {
        this.language = {};
        this.language.noReport = 'no Report !!';
    });
};
//動態連結程式
if ($.fn.dynLinkProgram) {
    var dynLinkProgram = (function () {
        this.language = {};
        this.language.noReportProgramId = "報表程式代號:{0}不存在!!";
        this.language.title = "上次執行參數";

    });
};
//動態條件
if ($.fn.dynamicCondition) {
    var dynamicCondition = (function () {
        this.language = {};
        this.language.codeNo = "代碼";
        this.language.description = "名稱";
        this.language.mustBe = "[{0}]為必要欄位";
        this.language.dupData = "[{0}]重複!!";
        this.language.lengthToLong = "[{0}]欄位長度太長:{1},可輸入長度為:{2}";
        this.language.btnSave = "存檔";
        this.language.btnExit = "取消";
    });
};
//upLoad 元件
if ($.fn.csUploadFile) {
    var csUploadFile = (function () {
        this.language = {};
        this.language.chooseFile = "選檔案";
    });
};
//upLoad 元件
if ($.fn.csDownloadFile) {
    var csDownloadFile = (function () {
        this.language = {};
        this.language.download = "下載檔案";
    });
};
//dateTime 元件
if ($.fn.csDateTime) {
    var csDateTime = (function () {
        this.language = {};
        this.language.dateError = "日期格式錯誤";
        this.language.timeError = "時間格式錯誤";
        this.language.pleaseCloseIME = "請切換至英數模式!";
    });
};

//i 秘書
if ($.fn.dynamicGrid) {
    var dynamicGrid = (function () {
        this.language = {};
        this.language.choose = '選';
        this.language.lExport = '匯出Excel';
        this.language.lDetail = '瀏覽明細表';
        this.language.fieldName = "欄位名稱";
        this.language.fieldValue = "欄位內容";
        this.language.settingError = "設定檔有誤!!";
        this.language.noItemChar = '項次';
        this.language.noMenuHead = "沒設定Menu 程式代號[{0}]";
        this.language.listFields = "加入清單";
        this.language.listName = "清單";
        this.language.fileNull = "HTMLName為空值";
        this.language.fileNotExist = "HTMLName:{0}不存在";
        this.language.dataDup = "資料重複!!";
        this.language.sureDelete = "是否確定要刪除?";
        this.language.btnDownloadFile = "下載檔案";
    });
};
//動態查詢瀏覽
if ($.fn.dynConditionGrid) {
    var dynConditionGrid = (function () {
        this.language = {};
        this.language.btnFind = "尋找";
        this.language.btnClear = "清除";
        this.language.btnExport = "匯出";
        this.language.noFindData = "查無資料";
        this.language.company = "公司別";
    });
};
//登入
if ($.fn.login) {
    var login = function () {
        this.language = {};
        this.language.userId = "帳號";
        
        this.language.mustBe = "[{0}]為必要欄位";
        this.language.inputError = "[{0}]輸入錯誤";
    };
};
//裝機工單
if ($.fn.SO1111A) {
    var SO1111A = function () {
        this.language = {};
        this.language.lSno = "派工單號:";
        this.language.lOrderNo = "訂單單號:";
        this.language.lContName = "申請人姓名:";
        this.language.lContTel = "申請人電話:";
        this.language.lContmobile = "申請人手機:";
        this.language.lID = "申請人證號:";
        this.language.lServName = "服務區:";
        this.language.lAcceptEn = "受理人員:";
        this.language.lAcceptTime = "受理時間:";
        this.language.btnIVR = "IVR 回單";
        this.language.lServiceType = "服務別";
        this.language.lInstCode = "派工類別";
        this.language.lResvTime = "預約時間";
        this.language.btnReserve = "預";
        this.language.chkResvFlag = "客戶指定時間";
        this.language.chkPrintBillFlag = "順收月費";
        this.language.lInstCount = "裝機台數";
        this.language.lPinCode = "吊牌號碼";
        this.language.lWorkUnit = "派工點數";
        this.language.lNote = "備註";
        this.language.gbxInto = "介紹人";
        this.language.lMediaCode = "介紹媒介";
        this.language.lIntroId = "介紹人";
        this.language.lPromCode = "促銷方案";
        this.language.lBPCode = "優惠組合";
        this.language.lBulletinCode = "消息來源";
        this.language.lGroupCode = "工程組別";
        this.language.lWorkerEn1 = "工程人員一";
        this.language.lWorkerEn2 = "工程人員二";
        this.language.lCallOkTime = "線上回報時間";
        this.language.gbxClose = "結案";
        this.language.lFinTime = "完工時間";
        this.language.lReturnCode = "退單原因";
        this.language.lReturnDescCode = "退單原因分類";
        this.language.lSatiCode = "服務滿意度";
        this.language.lSignDate = "簽收日期";
        this.language.lSignEn = "簽收人員";
        this.language.lFinUnit = "完工點數";
        this.language.lPrintUserName = "列印人員:";
        this.language.lPrintTime = "列印時間:";
        this.language.lPrtCount = "工單列印次數:";
        this.language.lClsTime = "日結時間:";
        this.language.lSub1 = "設備項目";
        this.language.lSub2 = "收費項目";
        this.language.lTotalAmtB = "應收小計";
        this.language.btnExtend = "續約項目";
        this.language.btnOtherCharge = "其他收費";

        this.language.gFacility_FACINAME = "品名";
        this.language.gFacility_FACISNO = "物品序號";
        this.language.gFacility_MODELNAME = "設備型號";
        this.language.gFacility_DVRAUTHSIZECODE = "容量";
        this.language.gFacility_CMBAUDRATE = "速率";
        this.language.gFacility_FIXIPCOUNT = "固IP";
        this.language.gFacility_DYNIPCOUNT = "動IP";

        this.language.gCharge_CITEMCODE = "代號";
        this.language.gCharge_CITEMNAME = "收費項目名稱";
        this.language.gCharge_OLDAMT = "原應收$";
        this.language.gCharge_SHOULDAMT = "出單$";
        this.language.gCharge_REALSTARTDATE = "有效期限";
        this.language.gCharge_REALSTOPDATE = "至";
        this.language.gCharge_REALPERIOD = "期數";
        this.language.gCharge_REALAMT = "實收$";
        this.language.gCharge_CANCELFLAG = "作廢?";
        this.language.gCharge_CLCTNAME = "收費人員";
        this.language.gCharge_TYPE = "日結?";
        this.language.gCharge_ADDFLAG = "來源?";
        this.language.gCharge_BILLNO = "單據編號";
        this.language.gCharge_ITEM = "項次";

        this.language.btnSave = "存檔";
        this.language.btnReserve2 = "預約明細";
        this.language.btnViewPR = "指定變更設備";
        this.language.btnChangeProd = "指定變更產品";
        this.language.btnExtend = "續約資訊";
        this.language.btnPresent = "贈品資訊";
        this.language.btnExit = "取消";
        this.language.editStaus = "顯示";
        this.language.mustNumber = "需為數字!";

        this.language.lSumAmount = "應收小計:";

        this.language.title = "裝機工單";
        this.language.sureNoSaveExit = "新增或修改未存檔，是否真的要離開?";
        this.language.append = "新增";
        this.language.edit = "修改";
        this.language.view = "顯示";
        this.language.exit = "離開";
        this.language.cancel = "取消";
        this.language.sureSaveCharge = "是否一併將未收資料改為已收?";
        this.language.codeNo = "代碼";
        this.language.description = "名稱";
        this.language.chooseFacility = "選取設備";
        this.language.saveOk = "存檔成功!!";
        this.language.isNotClose = "未";
        this.language.isClose = "已";
        this.language.isYes = "是";
        this.language.isNo = "否";
        this.language.isAddNormal = "自定";
        this.language.isAddClose = "結清";
        this.language.isAddChange = "更換";
        this.language.introIdErrorNoCustomer = "代碼輸入錯誤，找不到對應的客戶資料!";
        this.language.introIdErrorNoEmpName = "代碼輸入錯誤，找不到對應的員工資料!";
        this.language.introIdErrorNoIntroName = "代碼輸入錯誤，找不到對應的銷售點資料!";
        this.language.finDateCannotBeFuture = "完工日期不可為未來日期!";
        this.language.moveInCannotDelete = "移機轉入設備不能刪除!!";
        this.language.reInstFaciCannotDelete = "換裝設備不能刪除!!";

        this.language.sureDelete = "是否確定要刪除?";
        this.language.facilityDetail = "設備資料管理";
        this.language.delChargeDetail = "作廢收費資料";
        this.language.chargeDetail = "收費資料管理";
        this.language.wipKindAppend = "新增";
        this.language.resvDetail = "預約明細";
        this.language.resvPoint = "勤務派工";
        this.language.chooseFacilityKind = "指定變更設備";
        this.language.extendDetail = "續約資訊";
        this.language.otherSevChargeDetail = "其他服務別收費";
        this.language.chooseIntro = "選取介紹人";
        this.language.chooseInstCode = "請先選擇裝機類別";

        this.language.chargePayCheckChargeRange = "已有收費項目已入帳(暫收)或已實收,請注意收費期間是否正確";
        this.language.chargeInvCheckChargeRange = "已有收費項目開立發票,請注意收費期間是否正確";
        this.language.sureChangeClctToWorkEn = "工單收費資料已有收費人員,是否要將收費人員改成工作人員1??";
    };
};
//批次修改期數
if ($.fn.SO1119A) {
    var SO1119A = function () {
        this.language = {};
        this.language.lResvTime = "預約時間";
        this.language.lNote = "備註";
        this.language.btnOk = "確定";
        this.language.btnExit = "取消";
        this.language.btnReserve = "預";

        this.language.dgData_CHOOSE = "選取";
        this.language.dgData_PRODSTATUSNAME = "產品狀態";
        this.language.dgData_FACISNO = "設備序號";
        this.language.dgData_DECLARANTNAME = "申請人";
        this.language.dgData_SERVICEID = "產品ID";
        this.language.dgData_PRODUCTCODE = "產品代碼";
        this.language.dgData_PRODUCTNAME = "產品名稱";
        this.language.dgData_CITEMNAME = "收費項目";

        this.language.dgData_BPNAME = "優惠組合";
        this.language.dgData_CONTNO = "合約編號";
        this.language.dgData_CONTSTARTDATE = "合約起日";
        this.language.dgData_CONTSTOPDATE = "合約迄日";
        this.language.dgData_FACISEQNO = "設備流水號";
        this.language.dgData_WORKCODE = "派工代碼";
        this.language.dgData_WORKNAME = "派工名稱";
        this.language.pleaseChooseData = "請勾選要軟復資料!!"
        this.language.executeOk = "執行成功!!";
        this.language.executeError = "執行錯誤,錯誤原因: {0}!!"
    };
};
if ($.fn.SO111AA) {
    var SO111AA = function () {
        this.language = {};
        this.language.lResvTime = "預約時間";
        this.language.lReasonCode = "軟關原因";
        this.language.lNote = "備註";
        this.language.btnOk = "確定";
        this.language.btnExit = "取消";
        this.language.btnReserve = "預";

        this.language.dgData_CHOOSE = "選取";
        this.language.dgData_PRODSTATUSNAME = "產品狀態";
        this.language.dgData_FACISNO = "設備序號";
        this.language.dgData_DECLARANTNAME = "申請人";
        this.language.dgData_SERVICEID = "產品ID";
        this.language.dgData_PRODUCTCODE = "產品代碼";
        this.language.dgData_PRODUCTNAME = "產品名稱";
        this.language.dgData_CITEMNAME = "收費項目";

        this.language.dgData_BPNAME = "優惠組合";
        this.language.dgData_CONTNO = "合約編號";
        this.language.dgData_CONTSTARTDATE = "合約起日";
        this.language.dgData_CONTSTOPDATE = "合約迄日";
        this.language.dgData_FACISEQNO = "設備流水號";
        this.language.dgData_WORKCODE = "派工代碼";
        this.language.dgData_WORKNAME = "派工名稱";
        this.language.pleaseChooseData = "請勾選要軟關資料!!"
        this.language.executeOk = "執行成功!!";
        this.language.executeError = "執行錯誤,錯誤原因: {0}!!"
    };
};
//批次修改期數
if ($.fn.SO1131F) {
    var SO1131F = function () {
        this.language = {};
        this.language.lPeriod = "期數";
        this.language.chkCMCode = "收費方式";
        this.language.chkPTCode = "付款種類";

        this.language.gbxSync = "連動勾選";
        this.language.chkProposer = "申請人";
        this.language.chkFaciSNo = "設備序號";

        this.language.btnOk = "確定";
        this.language.btnExit = "取消";
        
        
        this.language.dgData_CHOOSE = "選取";
        this.language.dgData_DECLARANTNAME = "申請人";
        this.language.dgData_FACISNO = "物品序號";
        this.language.dgData_PRODUCTNAME = "產品名稱";
        this.language.dgData_CITEMNAME = "收費項目";
        this.language.dgData_PERIOD = "期數";
        this.language.dgData_AMOUNT = "金額";
        this.language.dgData_STARTDATE = "起始日";
        this.language.dgData_STOPDATE = "截止日";
        this.language.dgData_CMNAME = "收費方式";
        this.language.dgData_PTNAME = "付款種類";
        this.language.dgData_BPNAME = "優惠組合";
        this.language.dgData_CONTNO = "合約編號";
        this.language.dgData_CONTSTARTDATE = "合約起日";
        this.language.dgData_CONTSTOPDATE = "合約迄日";
        this.language.dgData_FACISEQNO = "設備流水號";

        this.language.chooseOneItem = "請至少選一項執行!!";
        this.language.chooseGridData = "請選取欲調整的週期收費!!";

        this.language.lMemo1 = "1.若有對應產品資料，修改收費方式、付款種類會一併更新產品資料檔。";
        this.language.lMemo2 = "2.勾選的資料 收費方式為銀行、信用卡類，則一律不異動，請由申請人管理帳號頁籤處理。";
        this.language.executeOk = "執行成功!!";
        this.language.executeError = "執行錯誤,錯誤原因: {0}!!"
    };
};
//訂單試算
if ($.fn.SO1144L) {
    var SO1144L = function () {
        this.language = {};
        this.language.lCTotal = "C 服務小計";
        this.language.lDTotal = "D 服務小計";
        this.language.lITotal = "I 服務小計";
        this.language.lPTotal = "P 服務小計";
        this.language.lPresent = "贈品金額";
        this.language.lCheckAmt = "本票金額";
        this.language.lOrderAmt = "訂購總金額";
        this.language.lTotalAmt = "總計金額";
        this.language.btnWip = "工單明細";
        this.language.btnFacility = "設備明細";
        this.language.btnInvoice = "發票金額合計";
        this.language.lPlus = "新增(優惠組合或自訂新增)     小計";
        this.language.gPlus_XWORKNAME = "派工類別";
        this.language.gPlus_BPCODE = "優惠代碼";
        this.language.gPlus_BPNAME = "優惠組合名稱";
        this.language.gPlus_CITEMCODE = "收費代碼";
        this.language.gPlus_CITEMNAME = "收費名稱";
        this.language.gPlus_REALPERIOD = "期數";
        this.language.gPlus_REALSTARTDATE = "起始日期";
        this.language.gPlus_REALSTOPDATE = "截止日期";
        this.language.gPlus_SHOULDAMT = "應收金額";
        this.language.lMinus = "取消(結清)     小計";
        this.language.gMins_XWORKNAME = "派工類別";
        this.language.gMins_CITEMCODE = "收費代碼";
        this.language.gMins_CITEMNAME = "收費名稱";
        this.language.gMins_REALPERIOD = "期數";
        this.language.gMins_REALSTARTDATE = "起始日期";
        this.language.gMins_REALSTOPDATE = "截止日期";
        this.language.gMins_SHOULDAMT = "應收金額";


        this.language.gPresent_GIFTKIND = "贈送項目";
        this.language.gPresent_DEPENDCODE = "優惠代碼";
        this.language.gPresent_DEPENDNAME = "優惠名稱";
        this.language.gPresent_ARTICLENO = "贈品代碼";
        this.language.gPresent_ARTICLENAME = "贈品名稱";
        this.language.gPresent_AMOUNT = "數量";
        this.language.gPresent_PRICE = "單價";

        this.language.gFaci_BPCODE = "優惠代碼";
        this.language.gFaci_BPNAME = "優惠名稱";
        this.language.gFaci_FACICODE = "設備代碼";
        this.language.gFaci_FACINAME = "設備名稱";
        this.language.gFaci_CMBAUDRATE = "速率";
        this.language.gFaci_FACISEQNO = "設備流水號";

        this.language.gWip_BPCODE = "優惠代碼";
        this.language.gWip_BPNAME = "優惠名稱";
        this.language.gWip_WORKERTYPE = "派工別";
        this.language.gWip_CODENO = "派工代碼";
        this.language.gWip_DESCRIPTION = "派工名稱";

        this.language.Present = "贈品";
        this.language.AddMoneyPresent = "加值購";
        this.language.ChannelPresent = "贈送頻道";

        this.language.gInv_INVCOMPCODE = "發票公司別";
        this.language.gInv_TAXDESCRIPTION = "課稅別";
        this.language.gInv_TOTALAMT = "應收金額";
        this.language.amountSmallZero = "發票公司別:{0}, 課稅別: {1}, 金額小於0";
    };
};
//批次出單-設定檔
if ($.fn.SO32B0A) {
    var SO32B0A = function () {
        this.language = {};
        this.language.lCompCode = "公司別";
        this.language.cmSyncCompCode = "同步公司別";
        this.language.lBatchId = "批次序號";
        this.language.lCaption = "說明";

        this.language.dgMaster_BATCHID = "批號";
        this.language.dgMaster_CAPTION = "說明";
        this.language.dgMaster_UPDTIME = "異動時間";
        this.language.dgMaster_UPDEN = "異動人員";

        this.language.dupData = "{0}:{1}重複!!";

        this.language.dgDetail = "設定子檔";
        this.language.dgDetail_PRGCODE = "可選程式";
        this.language.dgDetail_PROGRAMID = "程式代號";
        this.language.dgDetail_ORD = "順序";
        this.language.dgDetail_MODETYPE = "種類";
        this.language.dgDetail_PARAMETERS = "參數內容";
        this.language.dgDetail_CAPTION = "說明";
        this.language.dgDetail_FILEOUTCAPTION = "電子檔檔名";
        this.language.dgDetail_SQLQUERY = "檢核語法";

        this.language.MODETYPE0 = "程式";
        this.language.MODETYPE1 = "檢核語法";

        this.language.btnSave = "存檔";
        this.language.btnAdd = "新增";
        this.language.btnEdit = "修改";
        this.language.btnDelete = "刪除";

        this.language.btnDetailCheck = "檢核";
        this.language.btnOk = "立即執行";
        this.language.btnResvTime = "預約執行";
        this.language.btnSetting = "出單設定";
        this.language.btnExecLog = "執行記錄";
        this.language.btnCopyOther = "跨區複製";

        this.language.dataDup = "{0}重覆!!";

        this.language.sureDelete = "是否確定要刪除?";
        this.language.sureExecute = "確定要立刻執行?";

        this.language.append = "新增";
        this.language.edit = "修改";
        this.language.view = "顯示";
        this.language.exit = "離開";
        this.language.cancel = "取消";

        this.language.btnExit = "取消";
    };
};
//批次出單 - Grid
if ($.fn.SO32B0B) {
    var SO32B0B = function () {
        this.language = {};
        this.language.liExcel = "匯出Excel";
    };
};
//批次出單-子檔
if ($.fn.SO32B0C) {
    var SO32B0C = function () {
        this.language = {};
        this.language.lResvTime = "預約時間";

        this.language.btnOk = "確定";
        this.language.btnExit = "取消";
    };
};
//批次出單-執行記錄
if ($.fn.SO32B0D) {
    var SO32B0D = function () {
        this.language = {};
        this.language.lBatchId = "批次序號";
        this.language.lCaption = "說明";
        this.language.lCount = "查詢次數";

        this.language.dgMaster_BATCHID = "批號";
        this.language.dgMaster_ACCEPTTIME = "受理時間";
        this.language.dgMaster_ENTRYID = "人員代號";
        this.language.dgMaster_ENTRYNAME = "執行人員";
        this.language.dgMaster_RESVTIME = "預約時間";

        this.language.dgDetail_BATCHID = "批號";
        this.language.dgDetail_PROGRAMID = "程式代號";
        this.language.dgDetail_PARAMETERS = "參數內容";
        this.language.dgDetail_ISEXEC = "已執行";
        
        this.language.dgDetail_ORD = "順序";
        this.language.dgDetail_EXECTIME = "執行時間";
        this.language.dgDetail_EXECSTATUS = "狀態";
        this.language.dgDetail_EXECMESSAGE = "執行訊息";
        this.language.dgDetail_EXECPROGRESS = "執行進度";

        this.language.dgDetail_FINISHTIME = "完成時間";
        this.language.dgDetail_FILENAME = "下載檔案";
        this.language.dgDetail_FILEOUTCAPTION = "電子檔類別";
        this.language.dgDetail_MODETYPE = "種類";

        this.language.dgDetail_CAPTION = "說明";
        this.language.dgDetail_ERRORCOUNT = "錯誤筆數";

        this.language.custId = "客編";
        this.language.comments = "原因說明";

        this.language.MODETYPE0 = "程式";
        this.language.MODETYPE1 = "檢核語法";

        this.language.EXECSTATUS0 = "成功";
        this.language.EXECSTATUS0_1 = "待執行";
        this.language.EXECSTATUS1 = "失敗";

        this.language.btnDownloadFile = "下載檔案";
        this.language.btnErrorLog = "錯誤資料";
        this.language.btnQuery = "查詢";

        this.language.btnExit = "取消";
    };
};
//批次出單-子檔
if ($.fn.SO32B0E) {
    var SO32B0E = function () {
        this.language = {};
        this.language.lCheckCaptions = "欄位設定";
        this.language.lSQLQuery = "檢核語法";
        this.language.lSample = "方法:欄位名稱1,中文名稱1,寬度1;欄位名稱2,中文名稱2,寬度2;... 範例:CompCode,公司別,50;CustId,客編,100;...";

        this.language.btnOk = "確定";
        this.language.btnExit = "取消";
    };
};
//批次修改期數
if ($.fn.showPreviousPara) {
    var showPreviousPara = function () {
        this.language = {};
        this.language.lExecTime = "執行時間";
        this.language.lEntryName = "執行人員";
        this.language.lExecStatus = "執行狀態";
        this.language.lExecMessage = "執行結果訊息";
        this.language.btnExit = "取消";
        this.language.finish = "完成";
        this.language.fail = "失敗";

        this.language.dgData_FIELDCAPTION = "參數名稱";
        this.language.dgData_FIELDVALUE = "參數值";
        this.language.dgData_FIELDDESC = "參數中文";

    };
};
//檢核主管
if ($.fn.checkManagerPWD) {
    var checkManagerPWD = function () {
        this.language = {};
        this.language.lUserId = "使用者代號";
        this.language.lPDD = "使用者密碼";
        this.language.btnOk = "確定";
        this.language.btnExit = "取消";

    };
};
if ($.fn.SO1144B1) {
    var SO1144B1 = (function () {
        this.language = {};
        this.language.gbxFilter = "方案推薦";
        this.language.gbxProduct = "銷售產品";
        this.language.dgProduct_Header = "銷售產品";
        this.language.lPromCode = "促案";
        this.language.lCMBaudRate = "速率";
        this.language.cmProductCode = "產品";

        this.language.dgProduct_CHOOSE = "選取";
        this.language.dgProduct_PRODUCTCODE = "代碼";
        this.language.dgProduct_PRODUCTNAME = "產品名稱";

        this.language.gbxPromCode = "方案推薦";
        this.language.dgPromCode_Header = "方案推薦";
        this.language.dgPromCode_CODENO = "代碼";
        this.language.dgPromCode_DESCRIPTION = "優組名稱";
        this.language.dgPromCode_BUNDLEMON = "綁約";
        this.language.dgPromCode_BUNDLEPRODNOTE = "合約說明";
        this.language.dgPromCode_PROMNAME = "促案名稱";
        this.language.dgPromCode_PRODUCTCODES0 = "產品(綁)";
        this.language.dgPromCode_PRODUCTCODES1 = "產品(選)";

        this.language.gbxOrderItem = "訂購清單";
        this.language.dgOrderItem_ORDERITEM = "項次";
        this.language.dgOrderItem_PROMNAME = "促案名稱";
        this.language.dgOrderItem_BPNAME = "優惠組合";
        this.language.dgOrderItem_ISNOPROM = "無促案";
        this.language.dgOrderItem_WORKNAME = "派工別";
        this.language.dgOrderItem_FACINAMES = "設備";
        this.language.dgOrderItem_HASPRESENT = "贈品";
        
        this.language.btnHasProduct = "現有產品";

        this.language.dgHasProduct_Header = "現有產品";
        this.language.dgHasProduct_CHOOSE = "選取";
        this.language.dgHasProduct_PRODUCTNAME = "產品名稱";
        this.language.dgHasProduct_MONTHAMT = "月額";
        this.language.dgHasProduct_CONTSTATUS = "合約狀態";
        this.language.dgHasProduct_PRODSTATUSNAME = "產品狀態";
        this.language.dgHasProduct_CONTSTOPDATE = "合約到期日";
        this.language.dgHasProduct_FACISNOS = "授權設備";
        this.language.dgHasProduct_CMNAME = "速率";
        this.language.dgHasProduct_SERVICEID = "產品編號";

        this.language.mustDeleteLast = "{0}需從最後一台開始刪除!";

        this.language.sureDelete = "是否確定要刪除?";
        this.language.NoWipCanDelete = "無工單可刪除!";
        this.language.BPCodeCannotDelete = "優惠組合資料不可刪除!!";
        this.language.BPCodeCannotEdit = "優惠組合資料不可修改!!";

        this.language.btnAdd = "加入訂購";
    });
};
if ($.fn.SO1144B2) {
    var SO1144B2 = (function () {
        this.language = {};
        this.language.lCMBaudRate = "速率";
        this.language.lCloseDate = "結清日期";
        this.language.gbxHasProduct = "現有產品";
        this.language.lHasProduct = "現有產品";
        this.language.dgHasProduct_CHOOSE = "選";
        this.language.dgHasProduct_WIPSTATUS = "工單狀態";
        this.language.dgHasProduct_PRODUCTNAME = "產品名稱";
        this.language.dgHasProduct_CONTSTATUS = "合約狀態";
        this.language.dgHasProduct_MONTHAMT = "月額";
        this.language.dgHasProduct_MINUSAMT = "價差";
        this.language.dgHasProduct_PUNISHSTATUS = "違約";
        this.language.dgHasProduct_PRODSTATUSNAME = "產品狀態";
        this.language.dgHasProduct_CONTSTOPDATE = "合約到期日";
        this.language.dgHasProduct_FACISNOS = "授權設備";
        this.language.dgHasProduct_SERVICEID = "產品編號";
        this.language.wipStatusChange = "促變";
        this.language.wipStatusPR = "拆產品";

        this.language.gbxProduct = "銷售產品";
        this.language.lProduct = "銷售產品";
        this.language.dgProduct_CHOOSE = "選";
        this.language.dgProduct_PRODUCTCODE = "代碼";
        this.language.dgProduct_PRODUCTNAME = "產品名稱";
        this.language.dgProduct_MONTHAMT = "月額";
        this.language.dgProduct_DISCOUNTAMT = "折扣$";
        this.language.dgProduct_AMOUNT = "月合計";
        this.language.dgProduct_PERIOD = "繳別";
        this.language.dgProduct_BUNDLEMON = "綁約月數";

        this.language.gbxFacility = "附掛設備";
        this.language.lFacility = "附掛設備";
        this.language.dgFacility_TYPE = "類別";
        this.language.dgFacility_CHOOSE = "選";
        this.language.dgFacility_FACINAME = "設備名稱";
        this.language.dgFacility_FACISNO = "序號";
        this.language.dgFacility_MODELNAME = "型號";
        this.language.dgFacility_INITPLACENAME = "裝置點";
        this.language.dgFacility_AMOUNT = "金額";
        this.language.dgFacility_CMBAUDRATE = "速率";
        this.language.dgFacility_BUYNAME = "買賣方式";
        this.language.dgFacility_PTNAME = "付款種類";
        this.language.dgFacility_CITEMNAME = "收費項目";
        this.language.dgFacility_SEQNO = "設備流水號";
        this.language.dgFacility_INSTDATE = "裝機時間";

        this.language.dgFacility_TYPE0 = "新增";
        this.language.dgFacility_TYPE1 = "現有";
        this.language.dgFacility_TYPE1_2 = "裝中";
        this.language.dgFacility_TYPE2 = "現訂";
        this.language.dgFacility_TYPENO = "無";

        this.language.gbxSaleFacility = "可售設備";
        this.language.lSaleFacility = "可售設備";
        this.language.dgSaleFacility_CHOOSE = "選";
        this.language.dgSaleFacility_FACINAME = "設備名稱";
        this.language.dgSaleFacility_AMOUNT = "金額";
        this.language.dgSaleFacility_CMBAUDRATE = "速率";
        this.language.dgSaleFacility_BUYNAME = "買賣方式";
        this.language.dgSaleFacility_CITEMNAME = "收費項目";

        this.language.lPeriod = "繳別";
        this.language.dgPeriod_PRODUCTNAME = "產品名稱";
        this.language.dgPeriod_MASTERSALE = "主推";
        this.language.dgPeriod_PERIOD = "繳別";
        this.language.lCMCode = "收費方式";

        this.language.btnAdd = "訂購";
        this.language.btnAddOther = "加入&繼續訂購";
        this.language.cmdExit = "取消";
        this.language.edit = "修改";
        this.language.append = "新增";
        this.language.view = "顯示";

        this.language.ChoosePresent = "贈品挑選";
        this.language.PleaseChoosePresent = "請挑選贈品!!";
        this.language.PleaseChooseFacility = "請選擇附掛設備:{0}!!";
        this.language.PleaseChooseProduct = "請先選擇產品!!";
        this.language.ChangePromCloseMustBe = "互動參考號為促案變更, 需選取結清收費!!";

    });
};
if ($.fn.SO1144B21) {
    var SO1144B21 = (function () {
        this.language = {};

        this.language.gbxSaleFacility = "可售設備";
        this.language.lSaleFacility = "可售設備";
        this.language.dgSaleFacility_CHOOSE = "選";
        this.language.dgSaleFacility_FACINAME = "設備名稱";
        this.language.dgSaleFacility_AMOUNT = "金額";
        this.language.dgSaleFacility_CMBAUDRATE = "速率";
        this.language.dgSaleFacility_BUYNAME = "買賣方式";
        this.language.dgSaleFacility_CITEMNAME = "收費項目";

        this.language.btnAdd = "確定";
    });
};
if ($.fn.SO1144B3) {
    var SO1144B3 = (function () {
        this.language = {};
        this.language.lPTCode = "付款種類";
        this.language.lCMCode = "收費方式";
        this.language.lContName = "本票開票人";
        this.language.lCheckNo = "本票票號";
        this.language.lAmount = "金額";
        this.language.btnOk = "確定";
    });
};
if ($.fn.SO1144B4) {
    var SO1144B4 = (function () {
        this.language = {};
        this.language.lServiceType = "服務別";
        this.language.lInstCode = "派工類別";
        this.language.btnOk = "確定";
    });
};
if ($.fn.SO1144B5) {
    var SO1144B5 = (function () {
        this.language = {};
        this.language.lNextPeriod = "下期繳別";
    });
};
if ($.fn.SO1144B6) {
    var SO1144B6 = (function () {
        this.language = {};
        this.language.btnProposer = "申請人";
        this.language.lProposerName = "申請人姓名";
        this.language.lPreFix = "稱謂";
        this.language.lMiss = "小姐";
        this.language.lSir = "先生";
        this.language.lContTel = "電話";
        this.language.lContmobile = "行動電話";
        this.language.lIDKindCode1 = "證件1";
        this.language.lID1 = "證號1";
        this.language.lIDKindCode = "證件2";
        this.language.lID2 = "證號2";
        this.language.lSextual = "性別";
        this.language.lFemale = "女";
        this.language.lMale = "男";
        this.language.lBirthday = "生日";
        this.language.lCompany = "公司戶";
        this.language.lMarried = "已婚";
        this.language.lDeclarantTime = "聯絡時間";
        this.language.lDomicileAddress = "戶籍地址";
        this.language.lEmail = "E-Mail";
        this.language.lUseEmail = "常用E-Mail";
        this.language.lDateline = "通訊地址";
        this.language.lBoss = "負責人姓名";
        this.language.lBossId = "負責人ID";
        this.language.lClassCode = "客戶類別";
        this.language.lCustAttribute = "客戶特性";

        this.language.lContactMan = "聯絡人";
        this.language.lContName2 = "聯絡人姓名";
        this.language.lContTel2 = "聯絡人電話";
        this.language.lSextual2 = "性別";
        this.language.lIDKindCode3 = "證件種類";
        this.language.lID3 = "證件號碼";
        this.language.lContTelBirthDay = "聯絡人生日";
        this.language.lContTime = "聯絡時間";
        this.language.lDOMICILEADDRESS3 = "戶籍地址";

        this.language.lAgentMan = "代理人";
        this.language.lAgentName = "代理人姓名";
        this.language.lAgentTel = "代理人電話";
        this.language.lSextual3 = "性別";
        this.language.lIDKindCode2 = "證件種類";
        this.language.lAgentID = "證件號碼";
        this.language.lAgentBirthDay = "代理人生日";
        this.language.lDomicileAddress2 = "戶籍地址";

        this.language.lChooseOk = "確定";
        this.language.lCancel = "取消";

        this.language.lRIAError = "RIA 呼叫錯誤!!";
        this.language.lNoDataIn = "前端無任何資料傳入";
        this.language.lNoOrderDataIn = "前端未傳入訂單資訊";

        this.language.lOrderDataNoCustId = "訂單資料檔中無客戶編號資料";
        this.language.lOrderDataNoOrderNo = "訂單資料檔中無訂單編號資料";
        this.language.lProposerProcess = "申請人管理";
        this.language.lSureSave = "是否存檔?";

        this.language.gFaci_Title = "選取設備申請人";
        this.language.gFaci_FACISNO = "設備序號";
        this.language.gFaci_FACINAME = "設備項目";
        this.language.gFaci_INITPLACENAME = "裝置點";
        this.language.gFaci_DECLARANTNAME = "申請人姓名";
        this.language.gFaci_IDKINDNAME1 = "證件種類1";
        this.language.gFaci_ID = "證號1";

    });
};
if ($.fn.SO1144B7) {
    var SO1144B7 = (function () {
        this.language = {};
        this.language.lPayDate = "下次繳款日";

        this.language.dgPayDate_PRODUCTNAME = "產品名稱";
        this.language.dgPayDate_SERVICETYPE = "服務別";
        this.language.dgPayDate_DECLARANTNAME = "申請人";
        this.language.dgPayDate_FACISNO = "設備序號";
        this.language.dgPayDate_CITEMCODE = "收費代碼";
        this.language.dgPayDate_CITEMNAME = "收費名稱";
        this.language.dgPayDate_PERIOD = "期數";
        this.language.dgPayDate_AMOUNT = "金額";
        this.language.dgPayDate_STARTDATE = "起始日";
        this.language.dgPayDate_STOPDATE = "截止日";
        this.language.dgPayDate_CLCTDATE = "下收日";              
    });
};
if ($.fn.SO1144B8) {
    var SO1144B8 = (function () {
        this.language = {};
        this.language.lResvTime = "預約時間";
        this.language.btnReserve = "一般裝機";
        this.language.btnReserveMT = "維修順裝";
        this.language.btnReservePR = "拆機順裝";
        this.language.tReserveMTPR = "維/拆順裝";
        this.language.btnReserve2 = "預約明細";
        this.language.lChangeReason = "修改原因";

        this.language.lCATVTime = "C份數";
        this.language.lDTVTime = "D份數";

        this.language.dgReserveMTPR_WORKERTYPE = "單別";
        this.language.dgReserveMTPR_SNO = "工單單號";
        this.language.dgReserveMTPR_WORKCODE = "派工代碼";
        this.language.dgReserveMTPR_WORKNAME = "派工名稱";
        this.language.dgReserveMTPR_ACCEPTTIME = "受理時間";
        this.language.dgReserveMTPR_RESVTIME = "預約時間";
        this.language.dgReserveMTPR_WORKEREN1 = "工程代號1";

        this.language.dgReserveMTPR_WORKERNAME1 = "工程人員1";
        this.language.dgReserveMTPR_WORKEREN2 = "工程代號2";
        this.language.dgReserveMTPR_WORKERNAME2 = "工程人員2";
        this.language.dgReserveMTPR_MNAME = "管派類別";

        this.language.lOverCATVTime = "C份數需大於0,小於等於{0}";
        this.language.lOverDTVTime = "D份數需大於0,小於等於{0}";

        this.language.PleaseChooseProduct = "請先選擇產品!!";
    });
};
if ($.fn.SO1144B9) {
    var SO1144B9 = (function () {
        this.language = {};
        this.language.lMediaCode = "介紹媒介";
        this.language.lIntroId = "介紹人";
        this.language.btnFindIntro = "";
        this.language.lBulletinCode = "消息來源";
        this.language.lNote = "備註";
        this.language.mustNumber = "需為數字!";
        this.language.introIdErrorNoCustomer = "代碼輸入錯誤，找不到對應的客戶資料!";
        this.language.introIdErrorNoEmpName = "代碼輸入錯誤，找不到對應的員工資料!";
        this.language.introIdErrorNoIntroName = "代碼輸入錯誤，找不到對應的銷售點資料!";

        this.language.chooseIntro = "選取介紹人";
    });
};
if ($.fn.SO1144BA) {
    var SO1144BA = (function () {
        this.language = {};
        this.language.lProduct = "產品資料";
        this.language.lCharge = "收費資料";
        this.language.lFacility = "設備資料";
        this.language.lPresent = "贈品資料";
        this.language.lClose = "結清資料";

        this.language.gbxOrderItem = "訂購清單";
        this.language.dgOrderItem_ORDERITEM = "項次";
        this.language.dgOrderItem_PROMNAME = "促案名稱";
        this.language.dgOrderItem_BPNAME = "優惠組合";
        this.language.dgOrderItem_ISNOPROM = "無促案";
        this.language.dgOrderItem_WORKNAME = "派工別";
        this.language.dgOrderItem_FACINAMES = "設備";
        this.language.dgOrderItem_HASPRESENT = "贈品";

        this.language.gbxWip = "工單資料";
        this.language.dgWip_ORDERITEM = "項次";
        this.language.dgWip_WORKERTYPE = "單別";
        this.language.dgWip_WORKCODE = "派工代碼";
        this.language.dgWip_WORKNAME = "派工名稱";
        this.language.dgWip_SNO = "工單單號";
        this.language.dgWip_RESVTIME = "預約時間";
        this.language.dgWip_WORKUNIT = "點數";
        this.language.dgWip_FINTIME = "完成時間";
        this.language.dgWip_RETURNNAME = "退單原因";

        this.language.dgProduct_ORDERITEM = "項次";
        this.language.dgProduct_BPCODE = "優組代碼";
        this.language.dgProduct_BPNAME = "優惠組合";
        this.language.dgProduct_PRODUCTCODE = "產品代碼";
        this.language.dgProduct_PRODUCTNAME = "產品名稱";
        this.language.dgProduct_FACISEQNO = "設備流水號";
        this.language.dgProduct_WORKNAME = "派工類別";
        this.language.dgProduct_FACISNO = "設備序號";

        this.language.dgCharge_ORDERITEM = "項次";
        this.language.dgCharge_ASSIGNPROD = "種類";
        this.language.dgCharge_CITEMCODE = "收費代碼";
        this.language.dgCharge_CITEMNAME = "收費名稱";
        this.language.dgCharge_BPCODE = "優組代碼";
        this.language.dgCharge_BPNAME = "優組名稱";
        this.language.dgCharge_PERIOD = "期數";
        this.language.dgCharge_AMOUNT = "金額";
        this.language.dgCharge_FACISEQNO = "設備流水號";
        this.language.dgCharge_FACISNO = "設備序號";
        this.language.dgCharge_NEXTPERIOD = "下收期數";
        this.language.dgCharge_STARTDATE = "起始日";
        this.language.dgCharge_STOPDATE = "截止日";
        this.language.dgCharge_WORKNAME = "派工類別";
        this.language.dgCharge_SALEPOINTNAME = "點數行銷辦法";
        this.language.dgCharge_STBSEQNO = "贈點流水號";
        this.language.dgCharge_BANKCODE = "銀行代碼";
        this.language.dgCharge_BANKNAME = "銀行名稱";
        this.language.dgCharge_ACCOUNTNO = "帳號";
        this.language.dgCharge_INVSEQNO = "發票流水號";

        this.language.dgFacility_ORDERITEM = "項次";
        this.language.dgFacility_BPCODE = "優組代碼";
        this.language.dgFacility_BPNAME = "優組名稱";
        this.language.dgFacility_FACICODE = "設備代碼";
        this.language.dgFacility_FACINAME = "設備名稱";
        this.language.dgFacility_CMBAUDRATE = "速率";
        this.language.dgFacility_FACISEQNO = "設備流水號";
        this.language.dgFacility_WORKNAME = "派工類別";
        this.language.dgFacility_STBSNO = "STB流水號";

        this.language.dgPresent_ORDERITEM = "項次";
        this.language.dgPresent_GIFTKIND = "贈送項目";
        this.language.dgPresent_DEPENDCODE = "優組代碼";
        this.language.dgPresent_DEPENDNAME = "優組名稱";
        this.language.dgPresent_ARTICLENO = "贈品代碼";
        this.language.dgPresent_ARTICLENAME = "贈品名稱";
        this.language.dgPresent_AMOUNT = "數量";
        this.language.dgPresent_PRICE = "單價";

        this.language.dgClose_SBILLNO = "原單號";
        this.language.dgClose_SITEM = "原項次";
        this.language.dgClose_PRODUCTCODE = "代碼";
        this.language.dgClose_PRODUCTNAME = "產品名稱";
        this.language.dgClose_CITEMCODE = "收費代碼";
        this.language.dgClose_CITEMNAME = "收費名稱";
        this.language.dgClose_REALDATE = "實收日期";
        this.language.dgClose_REALSTARTDATE = "應收起日";
        this.language.dgClose_REALSTOPDATE = "應收迄日";
        this.language.dgClose_SHOULDAMT = "應收金額";
        this.language.dgClose_AMOUNT = "結清金額";
        this.language.dgClose_SERVICEID = "產品編號";
        this.language.dgClose_WORKNAME = "派工類別";

        this.language.chkFilterItem = "過濾";
        this.language.chooseFaci = "選取設備";
        this.language.changeWipCode = "變更派工類別";

        this.language.isClose = "結清";
        this.language.isNormal = "一般";
        this.language.btnChoosePresent = "贈品挑選";
        this.language.sureDelete = "是否確定要刪除?";
        this.language.NoWipCanDelete = "無工單可刪除!";
        this.language.BPCodeCannotDelete = "優惠組合資料不可刪除!!";
        this.language.BPCodeCannotEdit = "優惠組合資料不可修改!!";
        this.language.FaciItemConnotEdit = "設備產生的收費資料不可修改!!";

    });
};
if ($.fn.SO1144B) {
    var SO1144B = (function () {
        this.language = {};
        this.language.orderNo = "訂單單號:";
        this.language.custId = "客編:";

        this.language.gbxProposer = "申請人";
        this.language.btnProposer = "申請人";

        this.language.gbxProdProm = "方案推薦";
        this.language.btnProdProm = "方案推薦";

        this.language.gbxSaleProd = "銷售方案";
        this.language.btnSaleProd = "銷售方案";

        this.language.gbxPresent = "贈品/加值購";
        this.language.btnPresent = "贈品/加值購";

        this.language.changeDeposit = "改保證金";

        this.language.gbxNoProm = "無促案";
        this.language.btnNoProm = "無促案";

        this.language.gbxBuy = "訂購清單";
        this.language.btnBuy = "訂購清單";

        this.language.gbxPayDate = "改繳款日";
        this.language.btnPayDate = "改繳款日";

        this.language.gbxChangeNextPeriod = "改下期繳別";
        this.language.btnChangeNextPeriod = "改下期繳別";

        this.language.gbxResvTime = "預約時間";
        this.language.btnResvTime = "預約時間";

        this.language.gbxSaleFaci = "可售設備";
        this.language.btnSaleFaci = "可售設備";

        this.language.gbxMedia = "介紹媒介";
        this.language.btnMedia = "介紹媒介";

        this.language.gbxOrderList = "訂購明細";
        this.language.btnOrderList = "訂購明細";

        this.language.gbxCalculate = "試算";
        this.language.btnCalculate = "試算";

        this.language.append = "新增";
        this.language.edit = "修改";
        this.language.view = "顯示";

        this.language.mediaCode = "介紹媒介";
        this.language.introId = "介紹人";
        this.language.bulletinCode = "消息來源";

        this.language.buyPromCount = "促案:{0}";
        this.language.buyProductCount = "產品:{0}";
        this.language.presentCount = "贈品/加值購:{0}";
        this.language.buyNoPromCount = "無促案:{0}";
        this.language.btnBuy = "";
        this.language.pleaseChooseProduct = "請先選擇產品!!";
        this.language.noCustomer = "請先指定客戶!!";
        this.language.SureNoSaveExit = "新增或修改未存檔，是否真的要離開?";

        this.language.btnSave = "存檔";
        this.language.btnExit = "取消";
    });
};
if ($.fn.SO1144D) {
    var SO1144D = (function () {
        this.language = {};
        this.language.lServiceType = "服務類別";
        this.language.lProductCode = "產品";
        this.language.lInstCode = "派工類別";
        this.language.lOrderItem = "訂購項次";
        this.language.lCitemCode = "收費項目";
        this.language.lFaciSeqNo = "設備流水號";
        this.language.btnFinFaciNo = "查詢設備明細";
        this.language.lCMCode = "收費方式";
        this.language.lPTCode = "付款種類";
        this.language.lPeriod = "期數";
        this.language.lAmount = "金額";
        this.language.lStartDate = "有效起始日";
        this.language.lStopDate = "有效截止日";

        this.language.amountMustPlus = "金額需大於等於0";
        this.language.amountMustMinus = "金額需小於等於0";


        this.language.chooseFaci = "選取設備";
        this.language.noProm = "無促案";

        this.language.btnSave = "存檔";
        this.language.btnExit = "取消";


        this.language.append = "新增";
        this.language.edit = "修改";
        this.language.view = "顯示";

        this.language.sureNoSaveExit = "新增或修改未存檔，是否真的要離開?";

    });
};
if ($.fn.SO1144BB) {
    var SO1144BB = (function () {
        this.language = {};
        this.language.lWorkCode = "派工類別";
        this.language.mustDiff = "新派工類別需與舊的不同";
        this.language.btnOK = "確定";
        this.language.btnExit = "取消";

    });
};
if ($.fn.SO1114A) {
    var SO1114A = (function () {
        this.language = {
            //lcodeno: '代碼', 
            //ldescription: '名稱', 
            //lrefno: '參考號',
            //stopFlag: '停用',
            //lsnolength: '物料序號長度',
            //lfacId: '物料編號',
            //lservicetype: '服務別',
            //lcpimportmode: '門號匯入模式',
            //lrefacisnorefno: '母機設備參考號',
            //lmodelcodestr: '對應設備型號',
            //btnSave: '存檔',
            //btnAppend: '新增',
            //btnEdit: '修改',
            //btnCopyToOtherDB: '跨區複製',
            //btnExit: '取消',
            //btnquit: '離開',
            //view: '顯示',

            //mustBe: '[{0}]為必要欄位!!',
            //gdata_codeno: '代碼',
            //gdata_description: '名稱',
            //gdata_refno: '參考號',
            //gdata_stopflag: '停用',
            //gdata_updtime: '異動時間',
            //gdata_upden: '異動人員',
            //ltbuycode: '買賣付款方式',
            //ltwipcode: '派工類別',

            //d1grid_faciname: '設備項目',
            //d1grid_buyname: '買賣方式',
            //d1grid_ptname: '付款種類',
            //d1grid_citemname: '收費項目',
            //d1grid_stopflag: '停用',
            //d1grid_amount: '金額',
            //d1grid_mincount: '最少幾台',
            //d1grid_maxcount: '最多幾台',
            //d1grid_totalperiod: '總期數',

            //d2grid_workername: '工單別',
            //d2grid_workname: '派工類別'
            CreateErr: 'BLL/DAL錯誤!',
            MustWipType: '請至少選擇一項派工類別!',

            lServCode: '服務區',
            rDateType1: 'A.預約日期',
            rDateType0: 'B.受理日期',
            lWipType: '派工類別',
            ChkbInst: '裝機',
            ChkbMaintain: '維修',
            ChkbPR: '停拆機',
            ChkbReInt: '移機',
            lPointCount: '派工點數小計:',
            QueryButton: '查詢',
            OKButton: '確定',
            CancelButton: '離開',

            TIMEPERIOD: '時段',
            RESVTIME: '預約時間',
            SNO: '派工單號',
            WORKNAME: '工作類別',
            MNAME: '管派類別',
            WORKUNIT: '派工點數',
            CUSTID: '客戶編號',
            CUSTNAME: '姓名',
            TEL1: '電話(1)',
            ADDRESS: '地址'
        };
    });
};

//預約件點數
if ($.fn.SO1115A) {
    var SO1115A = function () {
        this.language = {
            lServCode: '服務區:',
            lMCode : '管派類別:',
            lDisplayType : '顯示方式:',

            btnAll: '全區',
            btnReset : '重設',
            btnLastWeek : '上一週',
            btnNextWeek : '下一週',

            lMemo1: '紅色:預約件數已滿',
            lMemo2 : '綠色:預約件數未滿',
            lMemo3 : '淺紫:現在預約時段',

            lDisplayType0: '1.派工件數',
            lDisplayType1 : '2.派工點數',
            lDisplayType2 : '3.派工件/點數',

            aWeekday0: '(日)',
            aWeekday1 : '(一)',
            aWeekday2 : '(二)',
            aWeekday3 : '(三)',
            aWeekday4 : '(四)',
            aWeekday5 : '(五)',
            aWeekday6 : '(六)',

            gResv_TIMEPERIOD: '時段',
            gResv_A: '可約',
            gResv_F: '已約',
            gResv_S: '保留',
            gResv_TOTAL: '合計',

            Title: '勤務派工 [SO1115A]',

            //IsNotClose : '未',
            //IsClose : '已',
            //IsYes : '是',
            //IsNo : '否',

            //RIAError : 'RIA Error!!',
            };
    };
};
//勤務派工總表
if ($.fn.SO1116A) {
    var SO1116A = function () {
        this.language = {

            liWkUnit: '裝機配額',
            liWkUnit2: '維修管障',

            Title: '勤務派工總表 [SO1116A]',


            //RIAError : 'RIA Error!!',
        };
    };
};
//裝機配額
if ($.fn.SO1116A1) {
    var SO1116A1 = function () {
        this.language = {

            lServCode: '群    組',
            lDisplayType: '顯示方式',
            lWipTime: '預約日期',

            btnFind: '查  詢',
            btnLastWeek: '上一週',
            btnNextWeek: '下一週',

            lDisplayType0: '1.派工件數',
            lDisplayType1: '2.派工點數',
            lDisplayType2: '3.派工件/點數',

            gResv_TIMEPERIOD: '時段',
            gResv_A: '可約',
            gResv_F: '已約',
            gResv_S: '保留',
            gResv_R: '剩餘',
            gResv_TOTAL: '合計',

            aWeekday0: '(日)',
            aWeekday1: '(一)',
            aWeekday2: '(二)',
            aWeekday3: '(三)',
            aWeekday4: '(四)',
            aWeekday5: '(五)',
            aWeekday6: '(六)',

            titleCaption: '工單明細資料',

            //RIAError : 'RIA Error!!',
        };
    };
};
//維修管障
if ($.fn.SO1116A2) {
    var SO1116A2 = function () {
        this.language = {

            lServCode: '群    組',
            lDisplayType: '顯示方式',
            lWipTime: '預約日期',

            btnFind: '查  詢',
            btnLastWeek: '上一週',
            btnNextWeek: '下一週',

            lDisplayType0: '1.派工件數',
            lDisplayType1: '2.派工點數',
            lDisplayType2: '3.派工件/點數',

            gResv_TIMEPERIOD: '時段',
            gResv_A: '可約',
            gResv_F: '已約',
            gResv_S: '保留',
            gResv_R: '剩餘',
            gResv_TOTAL: '合計',
            gResv_CUST: '客編',

            aWeekday0: '(日)',
            aWeekday1: '(一)',
            aWeekday2: '(二)',
            aWeekday3: '(三)',
            aWeekday4: '(四)',
            aWeekday5: '(五)',
            aWeekday6: '(六)',

            titleCaption: '工單明細資料',

            //RIAError : 'RIA Error!!',
        };
    };
};
//派工明細表
if ($.fn.SO1116B) {
    var SO1116B = function () {
        this.language = {
            //gridColumnName
            //預約時間、派工單號、派工類別(名稱)、派工點數、客編、客戶姓名、電話、工單地址、完工時間、退單原因(名稱)
            gWip_RESVTIME: '預約時間',
            gWip_SNO: '派工單號',
            gWip_WORKTYPE: '派工類別',
            gWip_WORKUNIT: '派工點數',
            gWip_CUSTID: '客編',
            gWip_CUSTNAME: '客戶姓名',
            gWip_TEL1: '電話',
            gWip_ADDRESS: '工單地址',
            gWip_FINTIME: '完工時間',
            gWip_RETURNNAME: '退單原因',

            //RIAError : 'RIA Error!!',
        };
    };
};

//收費資料管理 新增/修改/顯示
if ($.fn.SO1132A) {
    var SO1132A = function () {
        this.language = {
            //左側
            lBillNo:'單據編號',
            lItem: '項次',
            lServiceType: '服務別',
            lCitemCode: '收費項目',
            lProductCode: '產品編號',
            btnProductCode:'查詢產品',
            lPeriodType: '週期種類',
            lPeriodType0: '0.產品',
            lPeriodType1: '1.設備收費',
            lPeriodType2: '2.無',
            lFaciSno: '設備序號',
            lFaciSeqNo:'設備流水號:',
            btnFaciSno: '查詢設備',
            lShouldDate: '應收日期',
            lRealPeriod: '期數',
            lRealStartDate: '有效期限',
            lRealStopDate: '至',
            lShouldAmt: '出單金額',
            lCMCode: '收費方式',
            lPTCode: '付款種類',
            lUCCode: '未收原因',
            lRealDate: '收費日期',
            lRealAmt: '實收金額',
            lSTType: '短收類別',
            lSTType1: "1.短收",
            lSTType2: "2.調改",
            lSTCode: '短收原因',
            lSTCode2: '調改原因',
            lClctEn: '收費人員',
            lManualNo: '手開單號',
            lCancelCode: '作廢原因',
            lClassCode: '產單客戶類別',
            lCheckNo: '票據號碼',
            lCheckDueDate: '到期日',
            lNextPeriod: '下期期數',
            lNextAmt: '下期金額',

            //右側
            //1.優惠組合
            ltBPCODE: '優惠組合',
            lBPCode: '優惠組合',
            lOrderNo: '訂單編號',
            lPromCode: '促銷方案',
            lDiscountDate: '優惠期間',
            lDiscountDate2: '至',
            lDiscountAmt: '優待金額',
            lContNo: '合約編號',
            lContDate: '合約期間',
            lContDate2: '至',
            lSalePointCode: '點數行銷辦法',
            lSTBSeqNo: '贈送設備',
            chkPunish: '違約處份',

            //2.發票資訊
            ltINVOICE: '發票資訊',
            lGUINo: '發票號碼',
            lInvSeqNo: '發票流水號',
            lChargeTitle: '收件人',
            lInvoiceType: '發票種類',
            //0=不開, 2=二聯式, 3=三聯式
            lInvoiceType0: '免開',
            lInvoiceType1: '二聯式',
            lInvoiceType2: '三聯式',
            lInvNo: '統一編號',
            lInvTitle: '發票抬頭',
            lInvAddress: '發票地址',
            lChargeAddress: '收費地址',
            lMailAddress: '郵寄地址',
            lInvoiceKind: '發票開立種類',
            //0=電子計算機發票,1=電子發票
            lInvoiceKind0: '電子計算機發票',
            lInvoiceKind1: '電子發票',
            lPreInvoice: '開立別',
            lPreInvoice0:'0.後開',
            lPreInvoice1:'1.預開',
            lPreInvoice2:'2.現開',
            lPreInvoice3:'3.折讓',
            lPreInvoice4:'4.產生折讓單',
            lInvPurposeCode: '發票用途',
            lPMarkType: '沖帳種類',
            optNoDiscount: '一般',
            optDiscount:'折讓',

            //3.帳號資訊
            ltACCOUNT: '帳號資訊',
            lBankCode: '銀行名稱',
            lAccountNo: '扣帳帳號',            
            lAuthorizeNo: '信用卡授權碼',

            //4.費率表
            ltRATE: '費率表',
            //gbxCustRate: '客戶類別費率表',
            //gbxMduRate: '大樓費率表',
            lblCust: '客戶類別費率表',
            lblMdu: '大樓費率表',
            colCustCITEMNAME: '收費項目',
            colCustPERIOD: '期數',
            colCustAMOUNT: '金額',
            colMduCITEMNAME: '收費項目',
            colMduPERIOD: '期數',
            colMduAMOUNT: '金額',

            //5.結清/備註
            ltCLOSENOTE: '結清/備註',
            //gbxNoteClose: '結清',
            //gbxNotePopu: '一般備註',
            lblNoteClose: '結清',
            lblNotePopu: '一般備註',
            chkCheven: '結清',
            lEvenDate: '結清日',
            lSBillNo: '結清單號',
            lSItem: '項次',
            lCloseSNo: '結清工單',
            lChevenCode: '結清原因',
            lCloseNote: '結清備註',

            //異動時間&人員
            lUptTime0: '異動時間:',
            lUpdEn0: '異動人員:',

            //最下排button
            btnSave: '存檔',
            btnEdit: '修改',
            btnExit: '離開',
            lEditMode: '顯示',
            lAppend:'新增',

            title: '收費資料管理 [SO1132A]',
            titleSO1131A2: '產品明細 [SO1131A2]',
            titleSO1131E: '設備明細 [SO1131E]',

            quiteNote: '新增或修改未存檔,是否真的要離開?',
            sReProcessMark:'沖帳單號:{0},項次:{1}',
            ssReProcessMark:'沖帳單號:{0},項次:{1},折讓發票號碼:{2}',
            noAddPeriod:'所選的代碼不存在客戶的週期性收費資料,不可新增!',
            para7: '有效期限超過系統預設天數，是否接受此日期!',

            chkTable: '前端未傳入[simple]資料表',
            chkColumnCustid: '未傳入必要欄位資料[客戶編號]',
            chkColumnBillNo: '未傳入必要欄位資料[單據編號]',
            chkColumnItem: '未傳入必要欄位資料[項次]',
            chkColumnFaciSNo: '未傳入必要欄位資料[設備序號]',
            chkProcessMark: '沖帳的收費日期不可小於原單號的實收日期',


            //RIAError : 'RIA Error!!',
        };
    };
};
//收費資料管理 作廢BillNo+Item
if ($.fn.SO1132A1) {
    var SO1132A1 = function () {
        this.language = {
            lCancelDate: '作廢日期',
            lCancelCode: '作廢原因',

            btnSave: '確定',
            btnExit: '離開',
            deleteOK: '已作廢!',
            needCancelCode: '作廢原因需有值!',

            chkTable: '前端未傳入[simple]資料表，無法進行作廢重產',
            chkEditMode: '傳入非[刪除模式]，無法進行作廢重產',
            chkColumnBillNo: '單據編號無值，無法進行依單據編號作廢重產',
            chkColumnItem: '項次無值，無法進行依項次作廢重產',

            //RIAError : 'RIA Error!!',
        };
    };
};
//收費資料管理 作廢MediaBillNo
if ($.fn.SO1132A11) {
    var SO1132A11 = function () {
        this.language = {
            lCancelDate: '作廢日期',
            lCancelCode: '作廢原因',

            btnSave: '確定',
            btnExit: '離開',
            deleteOK: '已作廢!',
            needCancelCode: '作廢原因需有值!',

            chkTable: '前端未傳入[simple]資料表，無法進行作廢重產',
            chkEditMode: '傳入非[刪除模式]，無法進行作廢重產',
            chkColumnMediaBillNo: '媒體單號無值，無法進行依媒體單號作廢重產',

            //RIAError : 'RIA Error!!',
        };
    };
};
//收費資料管理 作廢MediaBillNo+ServiceType
if ($.fn.SO1132A12) {
    var SO1132A12 = function () {
        this.language = {
            lCancelDate: '作廢日期',
            lCancelCode: '作廢原因',

            btnSave: '確定',
            btnExit: '離開',
            deleteOK: '已作廢!',
            needCancelCode: '作廢原因需有值!',

            //RIAError : 'RIA Error!!',
        };
    };
};

//跨服務結清
if ($.fn.SO1132B) {
    var SO1132B = function () {
        this.language = {};
        this.language.lTranDate = "結清日";
        this.language.lSTType = "日數計算原則";
        this.language.stType1 = "日平均";
        this.language.stType2 = "月平均-美規";
        this.language.stType3 = "月平均-歐規";
        this.language.lProcess = "計算基礎";
        this.language.displayType1 = "以日計算";
        this.language.displayType2 = "以月計算(月底)";
        this.language.displayType3 = "以月計算(週期)";
        this.language.lProcessItem = "處理項目";
        this.language.processItem1 = "拆機/設備";
        this.language.processItem2 = "頻道結清";
        this.language.processItem3 = "促案變更";
        this.language.processItem4 = "CM升降速";
        this.language.processItem5 = "頻道更換(拆裝)";
        this.language.processItem6 = "DVR升降容量";
        this.language.processItem7 = "頻道更換(裝機)";
        this.language.processItem8 = "PVR拆機";
        this.language.processItem9 = "頻道結清(不退保證金)";
        this.language.btnCalculate = "試算";

        this.language.gbxCharge = "產品資訊";
        this.language.gbxPresent = "贈品";
        this.language.gbxProdCharge = "費用產生";
        this.language.btnCalculate = "試算";

        this.language.lCloseAmt = "試算金額";
        this.language.lChevenCode = "結清原因";
        this.language.lSTCode = "短收原因";

        this.language.chkTback = "未收部分補收";
        this.language.chkRollOut = "退費是否轉出";

        this.language.chkRollOut = "退費是否轉出";
        this.language.chkPenalAmt = "僅顯示違約金";
        this.language.chkPenal = "不產生違約金";
        this.language.chkNatural = "產生優惠還原";

        this.language.gCharge_CHOOSE = "選取";
        this.language.gCharge_PROMNAME = "促銷方案";
        this.language.gCharge_BPNAME = "優惠組合";
        this.language.gCharge_PRODUCTNAME = "產品名稱";
        this.language.gCharge_CITEMNAME = "收費項目";
        this.language.gCharge_SHOULDDATE = "應收日期";
        this.language.gCharge_REALPERIOD = "期數";
        this.language.gCharge_SHOULDAMT = "應收金額";
        this.language.gCharge_REALSTARTDATE = "收費起日";
        this.language.gCharge_REALSTOPDATE = "收費迄日";
        this.language.gCharge_REALDATE = "實收日期";
        this.language.gCharge_REALAMT = "實收金額";
        this.language.gCharge_FACISNO = "設備序號";
        this.language.gCharge_PROFACISTR = "依附設備流水號";

        this.language.gbxProdCharge_CANCEL = "作廢";
        this.language.gbxProdCharge_CITEMNAME = "產品名稱";
        this.language.gbxProdCharge_SHOULDDATE = "應收日期";
        this.language.gbxProdCharge_REALPERIOD = "期數";
        this.language.gbxProdCharge_SHOULDAMT = "應收金額";
        this.language.gbxProdCharge_REALSTARTDATE = "收費起日";
        this.language.gbxProdCharge_REALSTOPDATE = "收費迄日";
        this.language.gbxProdCharge_FACISNO = "設備序號";
        this.language.gbxProdCharge_CLOSENOTE = "結清備註";

        this.language.btnFaci = "設備";
        this.language.btnOk = "確定";
        this.language.btnExit = "離開";

        this.language.pleaseCheckData = "請勾選要處理的資料!!";
        this.language.closeWipSetting = "結清工單設定";
        this.language.showInstWip = "裝機工單-新增";
        this.language.closeErr = "結清失敗";
        this.language.closeSuc = "結清完成";

        this.language.noWipFinClose = "該頻道之工單尚未完工結案,不得進行{0}";
        this.language.noCHProductLog = "該頻道無對應的產品記錄,不得進行{0}";
        this.language.no2FaciClose = "同服務別,一次只能結清一台計費設備!";
        this.language.mustTranDate = "結清日需有值!";

    };
};
//跨服務結清 指定派工類別
if ($.fn.SO1132B1) {
    var SO1132B1 = function () {
        this.language = {};
        this.language.lReasonCodeC = "CATV停拆機原因";
        this.language.lReasonDescCodeC = "原因細項";
        this.language.lReasonCodeD = "DTV停拆機原因";
        this.language.lReasonDescCodeD = "原因細項";
        this.language.lReasonCodeI = "CM停拆機原因";
        this.language.lReasonDescCodeI = "原因細項";
        this.language.lReasonCodeP = "CP停拆機原因";
        this.language.lReasonDescCodeP = "原因細項";
        this.language.lResvTime = "預約時間";
        this.language.lNote = "工單備註";

        this.language.gData_BILLTYPE = "單別";
        this.language.gData_SERVICETYPE = "服務";
        this.language.gData_WORKCODE = "派工代碼";
        this.language.gData_WORKNAME = "派工名稱";
        this.language.gData_OLDCITEMNAME = "所勾選的產品依據";
        this.language.gData_NEWCITEMNAME = "新產生的收費項目";

        this.language.btnReserve = "預約派工";
        this.language.btnReserve2 = "預約明細";
        this.language.btnOk = "確定";
        this.language.btnExit = "離開";
    };
};

//信用卡入帳
if ($.fn.SO1132E) {
    var SO1132E = function () {
        this.language = {

            lCustId: '客戶編號',
            lCustName: '客戶名稱',
            lAmount: '總金額',
            lRealDate: '入帳日期',
            lCMCode: '預設收費方式',
            lPTCode: '預設付款種類',
            lClctEn: '預設收費人員',
            lAccountNo: '信用卡號',
            lCardExpDate: '有效期限(mmyy)',
            lAuthorizeCode: '檢查碼',
            lCardCode: '信用卡別',

            btnSave: '確定',
            btnExit: '離開',

            needRealDate: '入帳日期為必填欄位',
            needAccountNo: '信用卡號為必填欄位',
            needCardExpDate: '有效期限為必填欄位',
            needAuthorizeCode: '檢查碼為必填欄位',
            needCardCode: '信用卡別為必填欄位',
            needAccNo:'信用卡號需為16碼',
            needCard4: '有效期限需為四碼',
            needAuth3: '檢查碼需為三碼,美國運通為四碼',
            mustAccNumber: '信用卡號需全為數字',
            mustDateNumber: '有效期限需全為數字',
            mustAuthNumber: '檢查碼需全為數字',
            success: '刷卡成功',

            //RIAError : 'RIA Error!!',
        };
    };
};
//預約件點數
if ($.fn.SO1115A) {
    var SO1115A = function () {
        this.language = {
            lServCode: '服務區:',
            lMCode : '管派類別:',
            lDisplayType : '顯示方式:',

            btnAll: '全區',
            btnReset : '重設',
            btnLastWeek : '上一週',
            btnNextWeek : '下一週',

            lMemo1: '紅色:預約件數已滿',
            lMemo2 : '綠色:預約件數未滿',
            lMemo3 : '淺紫:現在預約時段',

            lDisplayType0: '1.派工件數',
            lDisplayType1 : '2.派工點數',
            lDisplayType2 : '3.派工件/點數',

            aWeekday0: '(日)',
            aWeekday1 : '(一)',
            aWeekday2 : '(二)',
            aWeekday3 : '(三)',
            aWeekday4 : '(四)',
            aWeekday5 : '(五)',
            aWeekday6 : '(六)',

            gResv_TIMEPERIOD: '時段',
            gResv_A: '可約',
            gResv_F: '已約',
            gResv_S: '保留',
            gResv_TOTAL: '合計',

            Title: '勤務派工 [SO1115A]',

            //IsNotClose : '未',
            //IsClose : '已',
            //IsYes : '是',
            //IsNo : '否',

            //RIAError : 'RIA Error!!',
            };
    };
};
//勤務派工總表
if ($.fn.SO1116A) {
    var SO1116A = function () {
        this.language = {

            liWkUnit: '裝機配額',
            liWkUnit2: '維修管障',

            Title: '勤務派工總表 [SO1116A]',


            //RIAError : 'RIA Error!!',
        };
    };
};
//裝機配額
if ($.fn.SO1116A1) {
    var SO1116A1 = function () {
        this.language = {

            lServCode: '群    組',
            lDisplayType: '顯示方式',
            lWipTime: '預約日期',

            btnFind: '查  詢',
            btnLastWeek: '上一週',
            btnNextWeek: '下一週',

            lDisplayType0: '1.派工件數',
            lDisplayType1: '2.派工點數',
            lDisplayType2: '3.派工件/點數',

            gResv_TIMEPERIOD: '時段',
            gResv_A: '可約',
            gResv_F: '已約',
            gResv_S: '保留',
            gResv_R: '剩餘',
            gResv_TOTAL: '合計',

            aWeekday0: '(日)',
            aWeekday1: '(一)',
            aWeekday2: '(二)',
            aWeekday3: '(三)',
            aWeekday4: '(四)',
            aWeekday5: '(五)',
            aWeekday6: '(六)',

            titleCaption: '工單明細資料',

            //RIAError : 'RIA Error!!',
        };
    };
};
//維修管障
if ($.fn.SO1116A2) {
    var SO1116A2 = function () {
        this.language = {

            lServCode: '群    組',
            lDisplayType: '顯示方式',
            lWipTime: '預約日期',

            btnFind: '查  詢',
            btnLastWeek: '上一週',
            btnNextWeek: '下一週',

            lDisplayType0: '1.派工件數',
            lDisplayType1: '2.派工點數',
            lDisplayType2: '3.派工件/點數',

            gResv_TIMEPERIOD: '時段',
            gResv_A: '可約',
            gResv_F: '已約',
            gResv_S: '保留',
            gResv_R: '剩餘',
            gResv_TOTAL: '合計',
            gResv_CUST: '客編',

            aWeekday0: '(日)',
            aWeekday1: '(一)',
            aWeekday2: '(二)',
            aWeekday3: '(三)',
            aWeekday4: '(四)',
            aWeekday5: '(五)',
            aWeekday6: '(六)',

            titleCaption: '工單明細資料',

            //RIAError : 'RIA Error!!',
        };
    };
};
//派工明細表
if ($.fn.SO1116B) {
    var SO1116B = function () {
        this.language = {
            //gridColumnName
            //預約時間、派工單號、派工類別(名稱)、派工點數、客編、客戶姓名、電話、工單地址、完工時間、退單原因(名稱)
            gWip_RESVTIME: '預約時間',
            gWip_SNO: '派工單號',
            gWip_WORKTYPE: '派工類別',
            gWip_WORKUNIT: '派工點數',
            gWip_CUSTID: '客編',
            gWip_CUSTNAME: '客戶姓名',
            gWip_TEL1: '電話',
            gWip_ADDRESS: '工單地址',
            gWip_FINTIME: '完工時間',
            gWip_RETURNNAME: '退單原因',

            //RIAError : 'RIA Error!!',
        };
    };
};

//收費資料管理 新增/修改/顯示
if ($.fn.SO1132A) {
    var SO1132A = function () {
        this.language = {
            //左側
            lBillNo:'單據編號',
            lItem: '項次',
            lServiceType: '服務別',
            lCitemCode: '收費項目',
            lProductCode: '產品編號',
            btnProductCode:'查詢產品',
            lPeriodType: '週期種類',
            lPeriodType0: '0.產品',
            lPeriodType1: '1.設備收費',
            lPeriodType2: '2.無',
            lFaciSno: '設備序號',
            lFaciSeqNo:'設備流水號:',
            btnFaciSno: '查詢設備',
            lShouldDate: '應收日期',
            lRealPeriod: '期數',
            lRealStartDate: '有效期限',
            lRealStopDate: '至',
            lShouldAmt: '出單金額',
            lCMCode: '收費方式',
            lPTCode: '付款種類',
            lUCCode: '未收原因',
            lRealDate: '收費日期',
            lRealAmt: '實收金額',
            lSTType: '短收類別',
            lSTType1: "1.短收",
            lSTType2: "2.調改",
            lSTCode: '短收原因',
            lSTCode2: '調改原因',
            lClctEn: '收費人員',
            lManualNo: '手開單號',
            lCancelCode: '作廢原因',
            lClassCode: '產單客戶類別',
            lCheckNo: '票據號碼',
            lCheckDueDate: '到期日',
            lNextPeriod: '下期期數',
            lNextAmt: '下期金額',

            //右側
            //1.優惠組合
            ltBPCODE: '優惠組合',
            lBPCode: '優惠組合',
            lOrderNo: '訂單編號',
            lPromCode: '促銷方案',
            lDiscountDate: '優惠期間',
            lDiscountDate2: '至',
            lDiscountAmt: '優待金額',
            lContNo: '合約編號',
            lContDate: '合約期間',
            lContDate2: '至',
            lSalePointCode: '點數行銷辦法',
            lSTBSeqNo: '贈送設備',
            chkPunish: '違約處份',

            //2.發票資訊
            ltINVOICE: '發票資訊',
            lGUINo: '發票號碼',
            lInvSeqNo: '發票流水號',
            lChargeTitle: '收件人',
            lInvoiceType: '發票種類',
            //0=不開, 2=二聯式, 3=三聯式
            lInvoiceType0: '免開',
            lInvoiceType1: '二聯式',
            lInvoiceType2: '三聯式',
            lInvNo: '統一編號',
            lInvTitle: '發票抬頭',
            lInvAddress: '發票地址',
            lChargeAddress: '收費地址',
            lMailAddress: '郵寄地址',
            lInvoiceKind: '發票開立種類',
            //0=電子計算機發票,1=電子發票
            lInvoiceKind0: '電子計算機發票',
            lInvoiceKind1: '電子發票',
            lPreInvoice: '開立別',
            lPreInvoice0:'0.後開',
            lPreInvoice1:'1.預開',
            lPreInvoice2:'2.現開',
            lPreInvoice3:'3.折讓',
            lPreInvoice4:'4.產生折讓單',
            lInvPurposeCode: '發票用途',
            lPMarkType: '沖帳種類',
            optNoDiscount: '一般',
            optDiscount:'折讓',

            //3.帳號資訊
            ltACCOUNT: '帳號資訊',
            lBankCode: '銀行名稱',
            lAccountNo: '扣帳帳號',            
            lAuthorizeNo: '信用卡授權碼',

            //4.費率表
            ltRATE: '費率表',
            //gbxCustRate: '客戶類別費率表',
            //gbxMduRate: '大樓費率表',
            lblCust: '客戶類別費率表',
            lblMdu: '大樓費率表',
            colCustCITEMNAME: '收費項目',
            colCustPERIOD: '期數',
            colCustAMOUNT: '金額',
            colMduCITEMNAME: '收費項目',
            colMduPERIOD: '期數',
            colMduAMOUNT: '金額',

            //5.結清/備註
            ltCLOSENOTE: '結清/備註',
            //gbxNoteClose: '結清',
            //gbxNotePopu: '一般備註',
            lblNoteClose: '結清',
            lblNotePopu: '一般備註',
            chkCheven: '結清',
            lEvenDate: '結清日',
            lSBillNo: '結清單號',
            lSItem: '項次',
            lCloseSNo: '結清工單',
            lChevenCode: '結清原因',
            lCloseNote: '結清備註',

            //異動時間&人員
            lUptTime0: '異動時間:',
            lUpdEn0: '異動人員:',

            //最下排button
            btnSave: '存檔',
            btnEdit: '修改',
            btnExit: '離開',
            lEditMode: '顯示',
            lAppend:'新增',

            title: '收費資料管理 [SO1132A]',
            titleSO1131A2: '產品明細 [SO1131A2]',
            titleSO1131E: '設備明細 [SO1131E]',

            quiteNote: '新增或修改未存檔,是否真的要離開?',
            sReProcessMark:'沖帳單號:{0},項次:{1}',
            ssReProcessMark:'沖帳單號:{0},項次:{1},折讓發票號碼:{2}',
            noAddPeriod:'所選的代碼不存在客戶的週期性收費資料,不可新增!',
            para7: '有效期限超過系統預設天數，是否接受此日期!',

            chkTable: '前端未傳入[simple]資料表',
            chkColumnCustid: '未傳入必要欄位資料[客戶編號]',
            chkColumnBillNo: '未傳入必要欄位資料[單據編號]',
            chkColumnItem: '未傳入必要欄位資料[項次]',
            chkColumnFaciSNo: '未傳入必要欄位資料[設備序號]',
            chkProcessMark: '沖帳的收費日期不可小於原單號的實收日期',


            //RIAError : 'RIA Error!!',
        };
    };
};
//收費資料管理 作廢BillNo+Item
if ($.fn.SO1132A1) {
    var SO1132A1 = function () {
        this.language = {
            lCancelDate: '作廢日期',
            lCancelCode: '作廢原因',

            btnSave: '確定',
            btnExit: '離開',
            deleteOK: '已作廢!',
            needCancelCode: '作廢原因需有值!',

            chkTable: '前端未傳入[simple]資料表，無法進行作廢重產',
            chkEditMode: '傳入非[刪除模式]，無法進行作廢重產',
            chkColumnBillNo: '單據編號無值，無法進行依單據編號作廢重產',
            chkColumnItem: '項次無值，無法進行依項次作廢重產',

            //RIAError : 'RIA Error!!',
        };
    };
};
//收費資料管理 作廢MediaBillNo
if ($.fn.SO1132A11) {
    var SO1132A11 = function () {
        this.language = {
            lCancelDate: '作廢日期',
            lCancelCode: '作廢原因',

            btnSave: '確定',
            btnExit: '離開',
            deleteOK: '已作廢!',
            needCancelCode: '作廢原因需有值!',

            chkTable: '前端未傳入[simple]資料表，無法進行作廢重產',
            chkEditMode: '傳入非[刪除模式]，無法進行作廢重產',
            chkColumnMediaBillNo: '媒體單號無值，無法進行依媒體單號作廢重產',

            //RIAError : 'RIA Error!!',
        };
    };
};
//收費資料管理 作廢MediaBillNo+ServiceType
if ($.fn.SO1132A12) {
    var SO1132A12 = function () {
        this.language = {
            lCancelDate: '作廢日期',
            lCancelCode: '作廢原因',

            btnSave: '確定',
            btnExit: '離開',
            deleteOK: '已作廢!',
            needCancelCode: '作廢原因需有值!',

            //RIAError : 'RIA Error!!',
        };
    };
};

//跨服務結清
if ($.fn.SO1132B) {
    var SO1132B = function () {
        this.language = {};
        this.language.lTranDate = "結清日";
        this.language.lSTType = "日數計算原則";
        this.language.stType1 = "日平均";
        this.language.stType2 = "月平均-美規";
        this.language.stType3 = "月平均-歐規";
        this.language.lProcess = "計算基礎";
        this.language.displayType1 = "以日計算";
        this.language.displayType2 = "以月計算(月底)";
        this.language.displayType3 = "以月計算(週期)";
        this.language.lProcessItem = "處理項目";
        this.language.processItem1 = "拆機/設備";
        this.language.processItem2 = "頻道結清";
        this.language.processItem3 = "促案變更";
        this.language.processItem4 = "CM升降速";
        this.language.processItem5 = "頻道更換(拆裝)";
        this.language.processItem6 = "DVR升降容量";
        this.language.processItem7 = "頻道更換(裝機)";
        this.language.processItem8 = "PVR拆機";
        this.language.processItem9 = "頻道結清(不退保證金)";
        this.language.btnCalculate = "試算";

        this.language.gbxCharge = "產品資訊";
        this.language.gbxPresent = "贈品";
        this.language.gbxProdCharge = "費用產生";
        this.language.btnCalculate = "試算";

        this.language.lCloseAmt = "試算金額";
        this.language.lChevenCode = "結清原因";
        this.language.lSTCode = "短收原因";

        this.language.chkTback = "未收部分補收";
        this.language.chkRollOut = "退費是否轉出";

        this.language.chkRollOut = "退費是否轉出";
        this.language.chkPenalAmt = "僅顯示違約金";
        this.language.chkPenal = "不產生違約金";
        this.language.chkNatural = "產生優惠還原";

        this.language.gCharge_CHOOSE = "選取";
        this.language.gCharge_PROMNAME = "促銷方案";
        this.language.gCharge_BPNAME = "優惠組合";
        this.language.gCharge_PRODUCTNAME = "產品名稱";
        this.language.gCharge_CITEMNAME = "收費項目";
        this.language.gCharge_SHOULDDATE = "應收日期";
        this.language.gCharge_REALPERIOD = "期數";
        this.language.gCharge_SHOULDAMT = "應收金額";
        this.language.gCharge_REALSTARTDATE = "收費起日";
        this.language.gCharge_REALSTOPDATE = "收費迄日";
        this.language.gCharge_REALDATE = "實收日期";
        this.language.gCharge_REALAMT = "實收金額";
        this.language.gCharge_FACISNO = "設備序號";
        this.language.gCharge_PROFACISTR = "依附設備流水號";

        this.language.gbxProdCharge_CANCEL = "作廢";
        this.language.gbxProdCharge_CITEMNAME = "產品名稱";
        this.language.gbxProdCharge_SHOULDDATE = "應收日期";
        this.language.gbxProdCharge_REALPERIOD = "期數";
        this.language.gbxProdCharge_SHOULDAMT = "應收金額";
        this.language.gbxProdCharge_REALSTARTDATE = "收費起日";
        this.language.gbxProdCharge_REALSTOPDATE = "收費迄日";
        this.language.gbxProdCharge_FACISNO = "設備序號";
        this.language.gbxProdCharge_CLOSENOTE = "結清備註";

        this.language.btnFaci = "設備";
        this.language.btnOk = "確定";
        this.language.btnExit = "離開";

        this.language.pleaseCheckData = "請勾選要處理的資料!!";
        this.language.closeWipSetting = "結清工單設定";
        this.language.showInstWip = "裝機工單-新增";
        this.language.closeErr = "結清失敗";
        this.language.closeSuc = "結清完成";

        this.language.noWipFinClose = "該頻道之工單尚未完工結案,不得進行{0}";
        this.language.noCHProductLog = "該頻道無對應的產品記錄,不得進行{0}";
        this.language.no2FaciClose = "同服務別,一次只能結清一台計費設備!";
        this.language.mustTranDate = "結清日需有值!";

    };
};
//跨服務結清 指定派工類別
if ($.fn.SO1132B1) {
    var SO1132B1 = function () {
        this.language = {};
        this.language.lReasonCodeC = "CATV停拆機原因";
        this.language.lReasonDescCodeC = "原因細項";
        this.language.lReasonCodeD = "DTV停拆機原因";
        this.language.lReasonDescCodeD = "原因細項";
        this.language.lReasonCodeI = "CM停拆機原因";
        this.language.lReasonDescCodeI = "原因細項";
        this.language.lReasonCodeP = "CP停拆機原因";
        this.language.lReasonDescCodeP = "原因細項";
        this.language.lResvTime = "預約時間";
        this.language.lNote = "工單備註";

        this.language.gData_BILLTYPE = "單別";
        this.language.gData_SERVICETYPE = "服務";
        this.language.gData_WORKCODE = "派工代碼";
        this.language.gData_WORKNAME = "派工名稱";
        this.language.gData_OLDCITEMNAME = "所勾選的產品依據";
        this.language.gData_NEWCITEMNAME = "新產生的收費項目";

        this.language.btnReserve = "預約派工";
        this.language.btnReserve2 = "預約明細";
        this.language.btnOk = "確定";
        this.language.btnExit = "離開";
    };
};

//信用卡入帳
if ($.fn.SO1132E) {
    var SO1132E = function () {
        this.language = {

            lCustId: '客戶編號',
            lCustName: '客戶名稱',
            lAmount: '總金額',
            lRealDate: '入帳日期',
            lCMCode: '預設收費方式',
            lPTCode: '預設付款種類',
            lClctEn: '預設收費人員',
            lAccountNo: '信用卡號',
            lCardExpDate: '有效期限(mmyy)',
            lAuthorizeCode: '檢查碼',
            lCardCode: '信用卡別',

            btnSave: '確定',
            btnExit: '離開',

            needRealDate: '入帳日期為必填欄位',
            needAccountNo: '信用卡號為必填欄位',
            needCardExpDate: '有效期限為必填欄位',
            needAuthorizeCode: '檢查碼為必填欄位',
            needCardCode: '信用卡別為必填欄位',
            needAccNo:'信用卡號需為16碼',
            needCard4: '有效期限需為四碼',
            needAuth3: '檢查碼需為三碼,美國運通為四碼',
            mustAccNumber: '信用卡號需全為數字',
            mustDateNumber: '有效期限需全為數字',
            mustAuthNumber: '檢查碼需全為數字',
            success: '刷卡成功',

            //RIAError : 'RIA Error!!',
        };
    };
};

//動態批次
if ($.fn.dynExecBatch) {
    var dynExecBatch = function () {
        this.language = {};
        this.language.company = "公司別";
        this.language.btnOk = "確定";
        this.language.btnClear = "清除";
        this.language.btnExit = "離開";
        this.language.btnLogFile = "LOG檔案";

        this.language.executeOk = "執行成功!!";
        this.language.executeError = "執行錯誤,錯誤原因: {0}!!"
    };
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

//櫃檯繳款A
if ($.fn.SO3318A) {
    var SO3318A = function () {
        this.language = {};
        this.language.lCompCode = "公司別";
        this.language.lRealDate = "入帳日期";
        this.language.lCMCode = "收費方式";
        this.language.lClctEn = "收費人員";
        this.language.lPTCode = "付款種類";
        this.language.titleName = "櫃檯繳款登錄"

        this.language.notDateFormat = "日期不合法!";
        this.language.dateOverNow = "此日期超過今天日期!";
        this.language.overSafeDate = "此日期已超過系統設定的安全期限!";
        this.language.overCloseDate = "之前已做過日結,不可使用之前日期入帳!";

        this.language.btnOk = "確定";
        this.language.btnExit = "離開";

        this.language.executeOk = "執行成功!!";
        this.language.executeError = "執行錯誤,錯誤原因: {0}!!";
    };
};
//櫃檯繳款B
if ($.fn.SO3318B) {
    var SO3318B = function () {
        this.language = {};
        this.language.lBillCnt = "登錄單據數:";
        this.language.lTotalAmt = "登錄總金額:";
        this.language.lClctEn = "收費人員";
        this.language.lRealDate = "入帳日期";
        this.language.lCMCode = "收費方式";
        this.language.lPTCode = "付款種類";
        this.language.lBillNo = "單據登錄";
        this.language.btnEdit = "修改";
        this.language.btnCancel = "取消登錄";

        this.language.chkPayGateway = "信用卡線上刷卡";
        this.language.btnEditPT = "修改付款種類";
        this.language.btnCarrierId1 = "客戶資訊";

        this.language.btnInvAdd = "發票開立";
        this.language.btnInvPrint = "發票列印";
        this.language.lCutDay = "會計日期";
        this.language.btnSaveCharge = "收費結轉";
        this.language.btnPrint = "列印日報表";

        this.language.gData_ENTRYNO = "序號";
        this.language.gData_BILLNO = "單據編號";
        this.language.gData_CUSTID = "客戶編號";
        this.language.gData_CUSTSTATUSNAME = "客戶狀態";
        this.language.gData_WIPSTATUSNAME = "派工狀態";
        this.language.gData_CUSTNAME = "客戶姓名";
        this.language.gData_CITEMNAME = "收費項目";
        this.language.gData_REALPERIOD = "期數";
        this.language.gData_REALAMT = "實收金額";
        this.language.gData_REALSTARTDATE = "起始日";
        this.language.gData_REALSTOPDATE = "截止日";
        this.language.gData_CMNAME = "收費方式";
        this.language.gData_PTNAME = "付款種類";
        this.language.gData_PRTSNO = "印單序號";
        this.language.gData_MEDIABILLNO = "媒體單號";
        this.language.gData_NOTE = "備註";
        this.language.gData_UPDEN = "異動人員";
        this.language.gData_UPDTIME = "異動時間";

        this.language.gData_ERRORNOTE = "錯誤說明";

        this.language.rptFormName = "櫃台繳款日報表";
        this.language.errFormName = "櫃台繳款異常表";

        this.language.simpleFormEdit = "收費資料管理-修改模式";

        this.language.sureDelete = "確定取消登錄??"

        this.language.deleteOk = "取消登錄成功!";
        this.language.finalCheckCutDate = "請最後確認一次會計日期,確認後再按一次收費結轉!";
        this.language.lRealDate2 = "實收日";

        this.language.chargeDouble = "收費資料與週期性收費有重複部份,確定存檔?";
        this.language.ucCodeErr = "此單據之未收原因,為已收,請查明是否重覆收款";
        this.language.ucCodeErr2 = "此單據之未收原因,已為櫃台已收,請查明是否重覆收款";
        this.language.barcodeDate = "此單據條碼繳費截止日{0}延展{1}天,條碼繳費延展日為{2}";

        this.language.btnExit = "離開";
    };
};
//櫃檯繳款B1 修改付款種類
if ($.fn.SO3318B1) {
    var SO3318B1 = function () {
        this.language = {
            lPTCode: '付款種類',

            btnSave: '確定',
            btnExit: '離開',

            needPTCode: '若為修改存檔,付款種類為必填值',

            //RIAError : 'RIA Error!!',
        };
    };
};
//櫃檯繳款B2 客戶資訊
if ($.fn.SO3318B2) {
    var SO3318B2 = function () {
        this.language = {

            lCarrierTypeCode: '客戶載具類別號碼',
            lCarrierId1: '客戶載具顯碼1',
            lLoveNum: '捐贈碼',
            lCardLastNo: '信用卡末四碼',

            cardLastNotNull: '收費方式為信用卡,須輸入信用卡末四碼',
            carrierId1NotNull: '客戶載具顯碼1為必填欄位',

            btnSave: '確定',
            btnExit: '離開',

            //RIAError : 'RIA Error!!',
        };
    };
};

//使用者管理
if ($.fn.SO7100A) {
    var SO7100A = function () {
        this.language = {};
        this.language.lUserId = "使用者代號:";
        this.language.lOldPD = "舊密碼:";
        this.language.lNewPD = "新密碼:";
        this.language.lNewPD2 = "確認新密碼:";

        this.language.lPDToShort = "密碼位數比系統規定位數少,請重設密碼!!";

        this.language.lMemo = "此功能用來更改登入本系統使用者之密碼，確認新密碼之後， 按下確定之後，新的密碼就會生效";

        this.language.btnCopy = "跨區複製";
        this.language.btnSave = "存檔";
        this.language.btnExit = "離開";
    };
};
//重設密碼
if ($.fn.SO7110A) {
    var SO7110A = function () {
        this.language = {};
        this.language.resetOK = "已重設!";
    };
};

////結清選擇設備
//if ($.fn.SO1132B2) {
//    var SO1132B2 = function () {
//        this.language = {};
//        this.language.gFacility_CHOOSE = "選取";
//        this.language.gFacility_SERVICETYPE = "服務別";
//        this.language.gFacility_FACISNO = "設備序號";
//        this.language.gFacility_FACINAME = "品名";
//        this.language.gFacility_MODELNAME = "設備型號";
//        this.language.gFacility_BUYNAME = "買賣方式";
//        this.language.gFacility_INSTDATE = "安裝日期";
//        this.language.gFacility_DECLARANTNAME = "設備申請人";
//        this.language.gFacility_DEPOSIT = "保證金";
//        this.language.gFacility_PENALSUM = "違約金";
//        this.language.gFacility_CONTRACTCUST = "綁約戶";
//        this.language.gFacility_CONTRACTDATE = "綁約到期日";
//        this.language.gFacility_CONTNO = "合約編號";
//        this.language.btnOk = "確定";
//        this.language.btnExit = "離開";
//    };
//};

if ($.fn.SO2130A) {
    var SO2130A = (function () {
        this.language = {};
        this.language.lCompCode = "公司別";
        this.language.optSNo = "工單單號";
        this.language.optOrderNo = "訂單單號";
        this.language.lSNoCount = "已登錄單數";
        this.language.lOrderNoCount = "已登錄單數";
        this.language.gbxFaci = "登錄序號";

        this.language.btnOk = "確定";
        this.language.btnExit = "離開";
    });
};