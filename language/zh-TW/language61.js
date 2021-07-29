if ($.fn.SO1112A) {
    var SO1112A = (function () {
        this.language = {
            lblSNo: '派工單號:',
            lblServName: ' 服務區:',
            lblClassName: '客戶類別:',
            lblCustId: '客戶編號:',
            lblCustName: '客戶名稱:',
            lblTel1: '電話(1):',
            lblInstAddress: '裝機地址:',
            lblServiceType: '服務別',
            lblAcceptName1: '受理人員:',
            lblServiceCode: '服務申告',
            lblPrintUserName1: '列印人員:',
            lblResvTime: '預約時間',
            lblAcceptTime1: '受理時間:',
            lblCallOKTime: '線上回報時間',
            lblPrtCount1: '列印次數:',
            lblResvFlagTime: '客戶指定時間',
            chkFlag: '優先維修',
            lblClsTime1: '日結時間:',
            lblGroupCode: '工程組別',
            lblPrintTime1: '列印時間:',
            lblWorkerEn1: '工作人員一',
            lblWorkUnit: '派工點數',
            lblWorkerEn2: '工作人員二',
            btnBillNo: '順收月費',
            lblMemo: '備註',
            grpClose: '結案',
            lblFinTime: '完工時間',
            lblMFCode1: '故障代號一',
            lblMFCode2: '故障代號二',
            lblReturnCode: '退單原因',
            lblReturnDescCode: '退單原因分類',
            lblSatiCode: '服務滿意度',
            lblSignEn: '簽收人員',
            lblSignDate: '簽收日期',
            lblFaciItem: '設備項目',
            colFaciName: '品名',
            colFaciSNO: '物品序號',
            lblCitem: '收費項目',
            lblShouldSub: '應收小計:',
            colCitemCode: '代號',
            colCitemName: '收費項目名稱',
            colOldAmt: '原應收$',
            colSHOULDAMT: '出單$',
            colREALSTARTDATE: '有效期限',
            colRealStopDate: '至',
            colRealPeriod: '期數',
            colRealAmt: '實收$',
            colCancelFlag: '作廢?',
            colClctName: '收費人員',
            colType: '日結?',
            colAddFlag: '來源?',
            colBillNo: '單據編號',
            colItem: '項次',
            colROWID: 'ROWID',
            btnSave: '存檔',
            btnReserve2: '預約明細查詢',
            btnViewPR: '指定變更設備',
            btnCancel: '離開',
            lblFinUnit:'完工點數',
            stateAdd: '新增',
            stateEdit: '修改',
            stateDel: '刪除',
            stateView: '顯示',
            btnCancel2: '取消',
            MustResvTime: '需設定預約時間!',
            MustServiceContext: '需設定申告內容!',
            changeWorkEn: '工單收費資料已有收費人員,是否要將收費人員改成工作人員1??',
            MustServiceType: '請撰擇服務別!',
            MustServiceCode: '請撰擇服務申告!',
            ChangeBillData: '是否一併將未收資料改為已收?',
            UpdBillData: '是否一併更新已收之相關資料(含週期性收費項目)??',
            NoWipTable: '無傳入工單資料表!',
            NoWipData: '無工單資料!',
            SNoErr: '工單單號有誤!',
            QuitAsk: '新增或修改未存檔,是否真的要離開?',
            SaveOK: '存檔成功!!',
            LoadSO111XDErr: '載入指定變更設備有誤！',
            LoadSO1115AName: '預約時間',
            FinTimeErr: '完工日期不可為未來日期!',
            ShowForm7: '預約明細查詢 ',
            ShowForm5: '收費資料 ',
            ShowForm4: '設備資料 ',
            WasCancelNotEdit : "該筆收費資料已作廢,不可修改!",
            WasCloseNotEdit : "該筆收費資料已日結,不可修改!",
            WasChargeNotEdit: "該筆收費資料已收費,不可修改!",
            CloseDataNotEdit: "結清資料不能修改!",
            DelBillAsk: "是否刪除此筆收費資料?",
            ShowForm6: "作廢原因",
            MoveFaciNotDel: '移機轉入設備不能刪除!!',
            MoveNewAdrAsk: "該戶移機中,是否將本工單之地址同步為移機新址?",
            sureDelete: "是否確定要刪除?",
            mustServCode: '服務申告需有值',
            isAddNormal : "自定",
            isAddClose : "結清",
            isAddChange: "更換",
            isNotClose : "未",
            isClose: "已",
            btnPrintBillFlag: '順收月費',
            liSO111XD: '指定變更',
            FaciAndChg: '設備與收費資料',
            
        };
    });   
};
if ($.fn.SO111XD) {
    var SO111XD = (function () {
        this.language = {
            TabItem1: '正常狀態的設備',
            TabItem2: ' 工單指定設備',
            btnChangeFaci: '指定變更',
            btnCPEMAC: 'CPE MAC',
            colFaciStatus: '設備狀態',
            colFaciWipStatus: '派工狀態',
            colFaciCommandStatus: '開通狀態',
            colFaciName: '品名',
            colFaciSNo: '物品序號',
            colSmartCardNo: '智慧卡序號',
            colDeclarantName: '設備申請人',
            colBuyName: '買賣方式',
            colInstDate: '安裝日期  ',
            colCMBaudno: '代碼',
            colCMBaudRate: 'CM速率',
            colFixIPCount: '固定IP數',
            colDynIPCount: '動態IP數',
            colInstName1: '安裝人員1',
            colInstName2: '安裝人員2',
            colSeqNo: '設備流水號',
            colDVRAuthSizeCode: 'DVR授權容量代碼',
            btnCancelChange: '取消變更設備',
            colKind: '異動屬性',
            colFaciCode: '品名代碼',
            colFaciName2: '項目名稱',
            colFaciSNo2: '物品序號',
            colOCMBaudRate: '舊速率',
            colNCMBaudRate: '新速率',
            colODynIPCount: '舊IP數(動)',
            colNDynIPCount: '新IP數(動)',
            colOFixIPCount: '舊IP數(固)',
            colNFixIPCount: '新IP數(固)',
            colODVRAuthSizeCode: '舊授權容量',
            colNDVRAuthSizeCode: '新授權容量',
            colOIPAddress: '舊IP ',
            colNIPAddress: '新IP',
            colOCPEMAC: '舊CPE MAC',
            colNCPEMAC: '新CPE MAC',
            colOCPEIPAddress: '舊CPE IP ADDRESS',
            colNCPEIPAddress: '新CPE IP ADDRESS',
            colOPromName: '舊促銷方案',
            colNPromName: '新促銷方案',
            colOBPName: '舊優惠組合',
            colNBPName: '新優惠組合',
            colDelete003Citem: '異動收費項目',
            colSeqNo2: '設備流水號',
            colChooseServiceID: '選取產品編號',
            colChoose: '選擇',
            colFaciSNo3: '物品序號',
            colServiceId: '產品ID',
            colProductName: '產品名稱',
            colCitemName: '收費項目',
            colPeriod: '期數',
            colAmount: '金額',
            colStartDate: '起始日',
            colStopDate: '截止日',
            colBPName: '優惠組合',
            colContNo: '合約編號',
            colContStartDate: '合約起始日',
            colContStopDate: '合約截止日',
            colFaciSeqNo: '設備流水號',
            colCitemCode: '收費項目代碼',


            InformatStr2: ' 訊息:',
            InformatStr: '訊息',
            NoParaData: '前端無任何資料傳入!',
            NoChangeFacilityData: '前端無傳入ChangeFacility資料!',
            NoFacilityData: '前端無傳入Facility資料!',
            NoPrFacilityData: '前端無傳入PRFacility資料!',
            MoveDown: '移拆',
            Down: '拆除',
            Change: '更換',
            ChangeInstall: '換裝',
            AddNew: '新增',
            Maintain: '維修',
            NoSNo: '無工單單號無法變更!',
            NotChangeFaci: '該設備已做{0}設備,不允許再做變更!!',
            NotSpace: '指定變更類型不允許空白!',
            MustBaund: '請選擇速率',
            BaundDouble: '速率與目前相同,請重新選擇!',
            MustIP: '請選擇IP',
            IPDouble: 'IP數與目前相同,請重新選擇',
            IPNotSame: '固定IP數與選擇IP數不同,請重新設定!',
            MustQt: '請選擇容量',
            QtDouble: '容量與目前相同,請重新選擇!',
            AccChannel: '頻道停權',
            PauseChannel: '暫停頻道',
            ResumeChannel: '恢復頻道',
            DownSpeed: '降速',
            UpSpeed: '升速',
            DVRDown: 'DVR降容量',
            DVRUp: 'DVR升容量',
            ChangeChannel: '頻道更換',
            PromChannel: '頻道促變',
            ChangeProm: '促案變更',
            InformatStr3: '訊息--',
            WasCancel: '已作廢',
            WasClose: '已日結',
            Speed: '速率',
            FixIP: '固定IP',
            DynIP: '動態IP',
            Capacity: '容量',
            chkOK: '是',
            chkNo: '否',
            noAnyData: '前端無任何資料傳入！',
            noChangeFacility: '前端無傳入ChangeFacility資料！',
            noFacilityData: '前端無傳入Facility資料！',
            noPRFacility: "前端無傳入PRFacility資料！",
            noWip: "前端無傳入Wip資料！",
            selectChgFaci: "請選擇要取消的設備!",
            filterAutoMatain: '派拆',
            IPNeedtodiff: '新舊IP數需不同',
            CannotCancelChange: '異動屬性為換裝,無法取消異動!!',
            NewIPSameOldIP: '新舊IP數相同',
            CannotUpdChanging: '該設備已做更換設備,不允許再變更!!',
            SNO: '工單單號',
            HasFinTime: '已線上回報,不允許變更設備序號,請由取消線上回報來處理!!',
            Retrieve: '取回',
            PromChange: '促案變更',
            AheadCondi: '續約',
            MoveInst:'移裝',
            KindNotCancel: '異動屬性為{0},無法取消異動!!',
            PRHaveFin: '該設備拆機單已完工不能變更指定設備!!',
    };

    })
};
if ($.fn.SO111xCEA) {
    var SO111xCEA = (function () {
        this.language = {
            lblCPEMAC: 'CPE MAC',
            lblIP: 'IP Address',
            lblStopDate: '停用時間',
            colCPEMAC: 'CPE MAC',
            colIPAddress: 'IP Address',
            colStopDate: '停用時間',
            btnSave: '存檔',
            btnAdd: '新增',
            btnDelete: '停用',
            btnEdit: '修改',
            btnCancel: '結束',

            QuitAsk: '新增或修改未存檔,是否真的要離開?',
            InformatStr3: '提示...',
            QuitAsk2: '固定IP數{0}個, CPE MAC 設定{1}個, 是否要離開?',
            NoParaData: '前端無任何資料傳入',
            InformatStr: '訊息',
            ErrStr: '訊息--GetCPEMAC',
            InformatStr2: ' 訊息:',
            Cancel: '取消',
            Quit: '離開',
            NotStop: '資料已停用!無法再停用',
            WasStop: '資料已停用!'
        };

    })
};
if ($.fn.SO111FA) {
    var SO111FA = (function () {
        this.language = {
            btnFind: '尋找',
            colCodeNo: 'CODENO',
            colDescription: 'DESCRIPTION',
            btnOK: '確定',
            btnCancel: '取消',
            NoData: '查無資料!!!',
            InformatStr: '訊息',
            CustName: '客戶姓名',
            CustTel: '客戶電話',
            CustIntro: '客戶介紹..',
            EmpName: '員工姓名',
            EmpCode: '員工編號',
            EmpIntro: '員工介紹..',
            IntroName: '介紹人姓名',
            IntroTel: '介紹人電話',
            Intro: '介紹人..',
            CodeStr: '編號',
            MustValue: '[{0}] 或 [{1}] 兩者之一必須有值!!',
            WaringStr: '警告',
            NoParaData: '前端無任何資料傳入',
            NoInputData: '前端未傳入參考號資訊',
            NoRefNo: '無參考號資料'
        };

    })
};
if ($.fn.SO1100D) {
    var SO1100D = (function () {
        this.language = {
        lblProposer  : "申請人",
        lblId  : "身份證號",
        lblCMCode  : "收費方式",
        lblPTCode  : "付款種類",
        lblBankCode  : "銀行",
        lblAccountId  : "帳號/卡號",
        lblCVC2  : "檢查碼",
        lblCardName  : "信用卡別",
        lblHide  : "信用卡有效期限 (西曆MM/YYYY)",
        lblACHNo  : "ACH用戶號碼",
        lblAccountOwner  : "帳號所有人",
        lblAccOwnerID: "帳號所有人身分證號",
        chkFore: "外籍人士",
        chkFore2  : "外籍人士",
        lblMediaCode  : "介紹媒介",
        lblIntroId  : "介紹人代碼",
        csmACH  : "ACH授權交易別",
        lblSendDate  : "送件日期",
        lblContiDate  : "銀行核印日期",
        lblSnactionDate  : "核准日期",
        lblAcceptTime  : "受理時間",
        btnACHDetail  : "ACH授權細項查詢",
        chkStopFlag  : "停用",
        lblStopDate  : "停用日期",
        chkDeAut  : "取消授權",
        lblAuthStopDate  : "授權截止日",
        lblAchSN  : "申請書單號",
        csmProduct  : "指定產品",
        csmCharge  : "待收資料",
        lblUpdTime  : "異動時間:",
        lblUpdEn  : "異動人員:",
        lblNote  : "備註",
        btnSave  : "存檔",
        btnEdit  : "修改",
        btnCancel  : "取消",
        Cancel  : "取消",
        Edit  : "修改",
        AddNew  : "新增",
        View  : "顯示",
        Quit  : "離開",
        NoParaData  : "前端無任何資料傳入",
        NoMasterData  : "前端未傳入MasterId資訊",
        NoAccMasterData  : "Account資料檔無Masterid資料",
        csmCodeStr  : "代碼",
        csmCitemStr  : "收費項目",
        csmBillNoStr  : "單據編號",
        csmItemStr  : "項次",
        csmPeriodStr  : "期數",
        csmAmtStr  : "金額",
        csmCMCodeStr  : "收費方式",
        csmAccStr  : "帳號",
        csmStarDateStr  : "起始日",
        csmStopDateStr: "截止日",
        csmCustIdStr: '客戶編號',
        csmHomeIdStr: '家戶編號',
        csmInstallAddressStr: '裝機地址',
        csmServiceIdStr  : "服務編號",
        csmPrdStr  : "產品名稱",
        csmFaciStr  : "設備序號",
        QuitAsk  : "新增或修改未存檔,是否真的要離開?",
        PromStr  : "提示...",
        InformatStr  : "訊息",
        SaveOK  : "資料儲存完成!",
        SaveFail  : "資料儲存失敗!",
        ChoiceClear  : "選擇清除待收資料",
        VoidOK  : "作廢完成!",
        NotView  : "新增模式無法瀏灠資料!",
        VoidAsk: "已取消清空待收單的扣款帳號,待收單將繼續使用先前指定的帳號扣款,是否繼續停用帳號?",
        AskStr  : "詢問",
        QuitAskStr  : "是否確定離開?",
        CarkFail  : "信用卡卡號驗證失敗!",
        CompIdFail  : "公司之統一編號檢查錯誤!",
        IdFail  : "身份證檢查錯誤!",
        chkLength  : "請確認本欄位長度 ! ",
        CompIdLen  : "八碼為 -- 公司之統一編號",
        IdLen  : "十碼為 -- 個人之身份證字號",
        FormatErr  : "格式輸入有誤!",
        Owner  : "聯絡人",
        AccOwner  : "帳號所有人",
        AccOwnerErr  : "帳號所有人身份證號檢核有誤!",
        ChkIdErr  : "身份證檢查錯誤!",
        MustAcc  : "請輸入帳號!",
        MustCMCode  : "收費方式無值!",
        MustCard  : "無信用卡別!",
        CustErr  : "代碼輸入錯誤,找不到對應的客戶資料!",
        EmErr  : "代碼輸入錯誤,找不到對應的員工資料!",
        SaleErr  : "代碼輸入錯誤,找不到對應的銷售點資料!",
        MustIntro  : "請先選擇介紹媒介!",
        colRecordType  : "資料狀態",
        colAchtNo  : "ACH 代碼",
        colAchDesc  : "ACH 交易說明",
        colAuthorizeStatus  : "授權狀態",
        colCitemNameStr  : "週期性項目",
        colStopFlag  : "停用",
        colStopDate  : "停用日期",
        colUpdEn  : "異動人員",
        colUpdTime  : "異動時間",
        chkNo  : "否",
        chkOK  : "是",
        ApplyACH  : "申請授權",
        CancelACH  : "取消授權",
        ApplyACHing  : "授權中",
        ApplyOK  : "已授權成功",
        ACHCancelOK  : "已取消授權",
        ACHFail  : "授權失敗",
        ACHWait  : "待提出",
        colChoose  : "選擇",
        colBillNo  : "單據編號",
        colItem  : "項次",
        colCitemCode  : "收費項目代碼",
        colCitemName  : "收費項目",
        colRealPeriod  : "收費期數",
        colShouldAmt  : "應收金額",
        colCMName  : "收費方式",
        colRealStartDate  : "有效起始日",
        colRealStopDate  : "有效截止日",
        btnOK: "確定",
        ACTHLog: 'ACH授權細項',
        SO137SEQNO: 'SEQNO傳入申請人SEQNO有誤',
        NOSO137Data: '找不到申請人資料',
        btnProduct: '指定費用',
        AskSaveWithSnaction: "核准日期尚未填入，確認是否存檔"
        
        };

    })
};
if ($.fn.SO1100D2) {
    var SO1100D2 = (function () {
        this.language = {
            colChoose : "選擇",
            colBillNo : "單據編號",
            colItem : "項次",
            colCitemCode : "收費項目代碼",
            colCitemName : "收費項目",
            colRealPeriod : "收費期數",
            colShouldAmt : "應收金額",
            colCMName : "收費方式",
            colRealStartDate : "有效起始日",
            colRealStopDate : "有效截止日",
            btnOK: "確定",
            colCustId:"客戶編號"
        };

    })
};
if ($.fn.SO1100D1) {
    var SO1100D1 = (function () {
        this.language = {
         colRecordType   : "資料狀態",
         colAchtNo   : "ACH 代碼",
        colAchDesc   : "ACH 交易說明",
        colAuthorizeStatus   : "授權狀態",
        colCitemNameStr   : "週期性項目",
        colStopFlag   : "停用",
        colStopDate: "停用日期",
        colNote:'備註',
        colUpdEn   : "異動人員",
        colUpdTime: "異動時間",
        NoParaData: "前端無任何資料傳入",
        NoMasterData: "前端未傳入MasterId資訊",
        NoAccMasterData: "Account資料檔無Masterid資料",
        ApplyACH: "申請授權",
        CancelACH: "取消授權",
        ApplyACHing : "授權中",
        ApplyOK : "已授權成功",
        ACHCancelOK : "已取消授權",
        ACHFail : "授權失敗",
        ACHWait: "待提出",
        chkNo : "否",
        chkOK: "是",
        lblNote:'備註'
        };

    })
};
if ($.fn.SO1100D3) {
    var SO1100D3 = (function () {
        this.language = {
            colCHOOSE: "選擇",
            colSERVICEID: "服務編號",
            colPRODUCTNAME:"產品名稱",
            colCUSTID: "客戶編號",
            colINSTADDRESS: "裝機地址",
            colFACISNO: "設備序號",
            colHOMEID: "家戶編號",
            colDECLARANTNAME: "申請人",
            colCITEMCODE: "收費項目",
            colCITEMNAME: "收費項目名稱",
            colSTOPFLAG: "停用",
            colPERIOD: "期數",
            colAMOUNT: "金額",
            colACCOUNTNO: "扣款帳號",
            colCMNAME: "收費方式",
            colSTARTDATE: "起始日",
            colSTOPDATE: "截止日",
            colBILLNO:"單據編號",
            colREALPERIOD: "期數",
            colSHOULDAMT: "金額",
            colREALSTARTDATE: "起始日",
            colREALSTOPDATE:"截止日",
            btnOK: '確定',
            btnCancel: '取消',
            btnAll:'全選',
            btnCancelAll: '全不選',
            productBar: '產品資料',
            nonePeriodBar: '非產品類週期',
            BillNoBar: '收費單資料',
            
        };

    })
};
if ($.fn.dynamicUpdate) {
    var dynamicUpdate = (function () {
        this.language = {
            btnOK: "確定",
            btnCancel: "取消",
            btnExit: "離開",
            noSysProgramId: '無sysProgramId傳入',
            AskStr  : "新增或修改未存檔,是否真的要離開?",
            PromptStr  : "提示...",
            InformatStr  : "訊息",
            View  : "顯示",
            Cancel  : "取消",
            AddNew  : "新增",
            Delete  : "刪除",
            Edit  : "修改",
            Quite  : "離開",
            InformatStr2  : "訊息--{0}",
            NneQueryData  : "無任何Query資料!",
            SaveFail  : "儲存失敗!",
            SaveOK  : "儲存完成!"
        };
    })
};
if ($.fn.dynTextFileOut) {
    var dynTextFileOut = function () {
        this.language = {};
        this.language.company = "公司別";
        this.language.inType = "登入格式";
        this.language.sourceText = "資料來源";
        this.language.fileError = "檔案上傳失敗,失敗原因:{0}";
        this.language.btnLogFile = "重新下載檔案";
        this.language.btnOk = "確定";
        this.language.btnClear = "清除";
        this.language.btnExit = "離開";

        this.language.executeOk = "執行成功!!";
        this.language.executeError = "執行錯誤,錯誤原因: {0}!!"
    };    
};
if ($.fn.dynUpdateGrid) {
    var dynUpdateGrid = function () {
        this.language = {
            lblCompCode: "公司別",
            btnSave: "儲存",
            btnAppend: "新增",
            btnEdit: "修改",
            btnDelete: "刪除",
            btnCancel: "取消",
            btnCopy:"跨區複製",
            InformatStr: "訊息",
            NoneComp: "無任何公司別!",
            View: "顯示",
            Cancel: "取消",
            AddNew: "新增",
            Delete: "刪除",
            Edit: "修改",
            Quite: "離開",
            NoneProgramId: "沒有指定ProgramId!",
            ErrStr: "錯誤",
            NoneFoundSO1111A: "找不到SO1111A設定檔!",
            NoneFoundSO1111B: "找不到SO1111B設定檔!",
            InformatStr2: " 訊息:",
            NonePara: "未傳入Parameter參數!",
            NoneTable: "未傳入Parameter Table 資料!",
            NoDataEdit: "無任何資料可編輯!",
            SaveFail: "儲存失敗!",
            NoDelData: "無任何資料可刪除!",
            DelAsk: "是否確定刪除此筆資料?",
            AskStr: "詢問",
            refreshDynGridFail: '資料儲存成功，但更新GRID失敗',
            DelOK : "刪除成功",
            SaveOK: "儲存成功",
            QuitAsk: "新增或修改未存檔,是否真的要離開?",
            ShowCopyForm:"跨區複製"
        };
    }
};
if ($.fn.dynCopyToOther) {
    var dynCopyToOther = function () {
        this.language = {
            lblCompCode: "公司別",
            csmCompCode: "公司別",
            grpTitle: "複製選項",
            lblExists  : "跨區代碼已存在時",
            optNoneCover  : "不覆蓋",
            optCover  : "刪除後重新覆蓋",
            btnOK  : "確定",
            btnExit  : "離開",
            mustChooseComp  : "請選擇公司別!",
            CopyOK: "複製成功!",
            noSource:'無傳入任何資料'
        };
    }
};
if ($.fn.SO3311A) {
    var SO3311A = function () {
        this.language = {
            txtCompCode  : "公司別",
            txtClctYM  : "收費年月",
            txtDefCMDate  : "預設入帳日期",
            txtDefCMCode  : "預設收費方式",
            txtDefClctEn  : "預設收費人員",
            txtDefPTCode  : "預設付款種類",
            txtDefRealPeriod  : "預設實收期數",
            txtDefSTCode  : "預設短收原因",
            txtDefNote  : "預設備註欄",
            btnOK  : "確定",
            btnFastEntry  : "快速登錄",
            btnCancel  : "取消",
            InformatStr  : "訊息",
            InformatStr2  : " 訊息:",
            ShowForm  : "[SO3311B] 收費單/劃撥單登錄",
            ShowSO1131C: "[SO3311C] 收費單/劃撥單登錄",
            
            
            mustCompany: '公司別必需有值！',
            mustDefCMDate: '預設入帳日期必需有值！',
            mustDefCMCode: '預設收費方式必需有值！',
            mustDefPTCode: '預設付款種類必需有值！',
            txtDefRealAmt: "預設實收金額",
            mustExitAll:'請先離開所有功能',
            PayDescription1: '1.當預設實收金額>0，單一單號包含多筆資料時，仍依應收金額入帳； ',
            PayDescription2: '2.若預設實收金額為０或單一單號只有一筆資料，才依預設實收金額入帳。',
           
                                    
            
        };
    }
};
if ($.fn.SO3311B) {
    var SO3311B = function () {
        this.language = {
            txtBillCnt0: "登錄單據數:",
            txtTotalAmt0: "登錄總金額:",
            btnQuery: "已登查詢",
            btnExit: "結束",
            txtClctEn: "收費人員",
            txtCMDate: "入帳日期",
            txtCMCode: "收費方式",
            txtPTCode: "付款種類",
            txtManualNo: "手開單號",
            txtNote: "備    註",
            txtBillNo: "單據登錄",
            lblSTCode: "短收原因",
            btnDelete: "作廢",
            CUSTID: "客戶編號",
            CITEMNAME: "收費項目",
            SHOULDAMT: "出單金額",
            REALPERIOD: "期數",
            REALAMT: "實收金額",
            REALSTARTDATE: "期限起始日",
            REALSTOPDATE: "期限截止日",
            CANCELFLAGNAME: "作廢",
            NOTE: "備註",
            MustBillDate: "請輸入入帳日期!",
            chkOK: "是",
            chkNo: "否",
            NotCancel: "已作發資料不可再作廢",
            ShowForm3: "收費作廢原因編輯",
            EndForm: "[SO3311D] 結束收費資料登入",
            NoData: "查無資料!",
            ShowForm2: "[SO3311E] 收費資料已登瀏覽",                      
        };
    }
};
if ($.fn.SO3311F) {
    var SO3311F = function () {
        this.language = {
            btnOK: "確定",
            btnCancel: "取消",
            lblCancelDate: "作廢日期",
            lblCancelReason: "作廢原因",
            CancelDateMustField: "[  作廢日期  ] 為必要欄位,須有值 !!",
            CancelReasonMustField: "[  作廢原因  ] 為必要欄位,須有值 !!",
            CancelInfo: "作廢日期",

        };
    }
};
if ($.fn.SO3311D) {
    var SO3311D = function () {
        this.language = {
            btnQuit: "結束並儲存",
            btnReturn: "取消登錄資料",          
        };
    }
};
if ($.fn.SO3311E) {
    var SO3311E = function () {
        this.language = {            
            btnDelTemp: '刪除暫存資料',
            btnPrint: '列印',
            btnCancel: '取消',
            colEntryNo: '序號',
            colBillNo: '單據編號',
            colItem: '項次',
            colPrtSNo: '印單序號',
            colMediaBillNo: '媒體單號',
            colCustId: '客戶編號',
            colCustName: '客戶姓名',
            colCitemName: '收費項目',
            colShouldAmt: '出單金額',
            colShouldDate: '應收日期',
            colRealAmt: '實收金額',
            colRealDate: '實收日期',
            colRealPeriod: '期數',
            colRealStartDate: '起始日',
            colRealStopDate: '截止日'
           
        };
    }
};
if ($.fn.SO3311C) {
    var SO3311C = function () {
        this.language = {
            txtBillCnt0: "登錄單據數:",
            txtTotalAmt0: "登錄總金額:",
            txtBillNo: "單據登錄",
            txtUpload: "匯入EXCEL資料",
            btnDelete: "刪除暫存資料",
            btnExit: "結束",
            ENTRYNO: '序號',
            BILLNO: '單據編號',
            CITEMNAME:'收費項目',
            ITEM: '項次',
            CUSTID: '客戶編號',
            CUSTSTATUSNAME: '客戶狀態',
            CUSTNAME: '客戶姓名',
            REALPERIOD: '期數',
            REALAMT: '實收金額',
            REALSTARTDATE: '起始日',
            REALSTOPDATE: '截止日',
            PRTSNO: '印單序號',
            MEDIABILLNO: '媒體單號',
            NOTE: '備註',
            EndForm: "[SO3311D] 結束收費資料登入",
            btnImport: '匯入',
            mustSelectFile:'請先選擇要匯入的檔案',
            ImportComplete: "匯入成功筆數: {0}{1}匯入失敗筆數: {2}",
            ShowForm4: "問題資料瀏覽",
            ImportDescription: '1.匯入格式說明：xls格式,抬頭為中文工單單號',
            ImportDescription2:'2.預設實收金額=0時，匯入檔無論單一單號有幾筆資料，一律都入0元;' +
                                        '反之預設實收金額>0或未設，一律以應收金額入帳。'
        
        };
    }
};
if ($.fn.SO3311G) {
    var SO3311G = function () {
        this.language = {
            btnSave: '存檔下載',
            btnExit :'結束',
        };
    }
};
if ($.fn.SO1131E) {
    var SO1131E = function () {
        this.language = {
            colChoose  : "選擇",
            colFaciStatus  : "狀態",
            colFaciSNo  : "物品序號",
            colDeclarantName  : "申請人姓名",
            colFaciCode  : "代碼",
            colFaciName  : "項目名稱",
            colCMBaudNo  : "代碼",
            colCMBaudRate  : "CM速率",
            colFixIPCount  : "固定IP",
            colDynIPCount  : "動態IP",
            colInstDate  : "裝機日期",
            colPRDate  : "拆機日期",
            colInitPlace  : "裝置點",
            colModelName  : "型號名稱",
            colBuyName  : "買賣方式",
            colSmartCardNo  : "智慧卡序號",
            colDueDate  : "租借到期日",
            colContractCust  : "綁約戶",
            colContractDate  : "綁約到期日",
            colSeqNo  : "設備流水號",
            colVodAccountId  : "VODACCOUNTID",
            btnOK  : "確定",
            btnCancel  : "取消",

            NoParaData  : "前端無任何資料傳入",
            NoFaciData  : "前端未傳入設備資料",
            InformatStr2: " 訊息:",
            grdChecked: '是',
            grdNoChecked: '否',
        };
    }
};
if ($.fn.SO3316A) {
    var SO3316A = function () {
        this.language = {
            lblCompCode: "公司別",
            lblEnterKind: "登錄格式",
            grpHeader: "條件",
            lblStopDate: "停用日期",
            chkAuthStop: "授權失敗停用",
            lblSource: "資料來源",
            btnOK: "確定",
            btnCancel: "離開",
            OldKind: "原格式",
            NewKind: "新格式",
            InformatStr2: " 訊息:",
            InputSource: "請輸入資料來源!",
            InformatStr: "訊息",
            ErrStr: "錯誤",
            CancelDownLoad: "使用者取消下載!",
            DownLoadErr: "下載錯誤!{0}{1}",
            mustCompany: '公司別為必選!',
            mustFmt: '登錄格式為必選!',
            mustSelectFile: "請先選擇資料來源!"
        };
    };
  
};
if ($.fn.SO1144J) {
    var SO1144J = function () {
        this.language = {
            btnOK: "確定",
            btnExit: "離開",
            NoOrderData  : "無任何訂單單號!無法執行作業",
            InformatStr  : "訊息",
            RunFail  : "執行失敗!",
            BackOrder  : "退單",
            ShowForm  : "訂單管理[SO1144B]",
            NoDataQuery: "無任何訂單資料可查詢!",
            NotFoundCustId: '查詢不到客編，無法繼續',
            LoadSO1118A5Err:'載入SO1118A5HTML錯誤',
            WaringStr: "警告",
            chgBillToFinBill : '是否一併將未收資料改為已收?'
        };
    };
};
if ($.fn.ChangeClctEn) {
    var ChangeClctEn = function () {
        this.language = {
            lblCompCode  : "公司別",
            lblGroupType  : "群組類別",
            btnFind  : "查詢",
            lblClctYear  : "收集年月",
            lblCreateTime  : "產單時間",
            lblBillNo  : "單據編號",
            lblCust  : "客戶編號",
            csmStrtCode  : "街道範圍",
            csmClctEn  : "原收費人員",
            csmServiceType  : "服務別",
            csmMduId  : "大樓編號",
            Street  : "街道",
            MduId  : "大樓",
            BillNo  : "單據編號",
            CustId  : "客戶編號",
            CLCTEN: "收費人員代號",
            CLCTNAME: "員工姓名",
            GROUPCODE: "群組代碼",
            GROUPNAME: "群組名稱",
            COUNT: "張數",
            NEWCLCTEN: "新收費人員代號",
            NEWCLCTNAME: "新收費人員名稱",
            btnOK  : "執行",
            lblField  : "異動資料",
            chkOldClctEn  : "原收費人員",
            chkClctEn: "收費人員",
            CommonCodeNo: '代碼',
            CommonDescription: '名稱',
            ServiceType: '服務別',
            MduIdButton: '大樓編號',
            NoDataUpd : "無指定任何資料更新!",    
            NoDataRun : "無任何資料可執行!",
            EditOK : "修改完成!",    
            NoneQuery : "查詢不到任何資料!"    
        };
    };
};
if ($.fn.SO3279A) {
    var SO3279A = function () {
        this.language = {
            lblComp: "公司別",
            lblApplyNumber: "申請代號",
            lblSendDate: "送件日期",
            lblApplyDate: "申請日期",
            lblDateFrom: "至",
            lblDateFrom2: "至",
            lblStopDate: "終止日期",
            lblBank: "承辦銀行",
            lblDatapath:'資料檔路徑及檔名',
            btnFetch: "授權扣款提出",
            btnTaken: '授權扣款提回',
            btnCancel: '離開',
            gimBillHeadFmt: '多帳戶產生依據',
            csMultiCode: '代碼',
            csMultiDescription: '名稱',
            gimCitemCode: '收 費 項 目',
            applyType: '1.申請',
            stopType: '2.終止',
            mustSelectFile: '請選擇資料檔位置',
            mustChooseComp: '公司別為必要欄位',
            mustBankId: '承辦銀行為必要欄位',
            mustSendDate: '送件日期為必要欄位',
            mustPropDate1: '申請起日為必要欄位',
            mustPropDate2: '申請迄日為必要欄位',
            mustStopDate1: '終止起日為必要欄位',
            mustStopDate2: '終止迄日為必要欄位',
        };
    };
};
if ($.fn.SO1100U) {
    var SO1100U = function () {
        this.language = {
            lblHeader: "上次結算記錄",
            lable1: "結算截止日:",
            lable2: "上次執行結算時間:",
            lable3: "上次執行結算人員:",
            lable4: "公司別",
            lable5: "服務類別",
            lable6: "VOD結算作業金額限額",
            lable7: "VOD結算作業月數限額",
            lable8: '客編',
            lable9: "STB設備流水號",
            lable10: 'MVodID',
            lable11: '結算日期期限',
            lable12: ' (含此日之前的資料將被結算)',
            lable13: '應收日期',
            chkTran1: '產生預計結算明細報表',
            chkTran2: '產生未執行結算明細報表',
            chkRun: '執行結算作業',
            chkForceAmount: '不依據參數金額結算',
            lblSource: '檔案路徑',
            btnOK: '確定',
            btnCancel: '離開',
            btnPrevRpt: '上次統計結果',
            btnMvodId: '設備',
            btnStb: '設備',
            ShowSO1131C: '挑選設備',
            MustEndDate: "請填入結算日期期限!",
            MustChoose: "請選擇要執行的項目!",
            NoCalculateData: "無結算資料!",
            NoNoneCalculateData: "無未執行結算資料",
            CalculateComplete: "結算作業完成!",
            NoPreCalculateData: "無預計執行結算資料"
        };
    };
};
if ($.fn.SO3510A) {
    var SO3510A = function () {
        this.language = {
            takeDate: "領單日期",
            firstLetter: "字頭",
            lblRemind: "(大小寫是不一樣的喔)",
            lblSeqno: "流水號",
            btnAdd: "新增",
            btnEdit: "修改",
            btnDel: "刪除",
            btnReuse: "銷單續用",
            btnExit: '離開',
            btnClean: '清除',
            btnFind:'尋找',
            takePerson:'領單人員',
            colEMPNAME: "領單人員",
            colGETPAPERDATE: '領單日期',
            colPREFIX: '字頭',
            colBEGINNUM: '起始單號',
            colENDNUM: '截止單號',
            colTOTALPAPERCOUNT: '合計張數',
            colOPERATOR: '異動人員',
            colRETURNDATE: '退回日期',
            colCLEARDATE: '清除日期',
            colNOTE: '備註',
            colUPDTIME: '異動時間',
            noneData: '查無資料',
           
        };
    };
};
if ($.fn.SO3510A1) {
    var SO3510A1 = function () {
        this.language = {
            lblSeqNo: "流水號",
            lblCount: "張數",
            lblRETURNDATE: "退回日期",
            lblCLEARDATE: "清查日期",
            lblGetPaperDate: "領單日期",
            lblEmpName: "領單人員",
            lblNote: "備註",
            lblPrefix: "字頭",
            lblRemider: '(大小寫不一樣)',
            AddMode: '新增',
            EditMode: '修改',
            btnSave: '存檔',
            btnCancel: '取消',
            QuitAskStr: '新增或修改未存檔,是否真的要離開?',
            mustGetPaperDate: '領單日需有值!',
            mustEmpName: '領單人員需有值!',
            mustBeginNum: '起始號碼需有值!',
            mustCount: '張數需有值!',
            mustPrefix: '字頭需有值!',
            SaveOK:'儲存成功!',
        };
    };
};
if ($.fn.SO3510A2) {
    var SO3510A2 = function () {
        this.language = {
           
            btnOK: '確定',
            btnCancel: '取消',
            noData: '無任何資料!',           
            btnCancel: '取消',
            QuitAskStr: '是否確認刪除?',          
            SaveOK: '刪除完成!',
        };
    };
};
if ($.fn.SO3510A3) {
    var SO3510A3 = function () {
        this.language = {           
            lblGetPaperDate: "領單日期",
            lblEmpName: "領單人員",
            lblBeginNum:'起始流水號',
            lblCount: '張數',
            lblOBeginNum: '原始起始流水號',
            lblOEndNum: '原截止始流水號',
            btnOK: '確定',
            btnExit: '結束',
            noData:'無任何資料!',
            lblSeqNo: "流水號",
            lblCount: "張數",
            lblRETURNDATE: "退回日期",
            lblCLEARDATE: "清查日期",            
            lblNote: "備註",
            lblPrefix: "字頭",
            lblRemider: '(大小寫不一樣)',
            AddMode: '新增',
            EditMode: '修改',
            btnSave: '存檔',
            btnCancel: '取消',
            QuitAskStr: '新增或修改未存檔,是否真的要離開?',
            mustGetPaperDate: '領單日需有值!',
            mustEmpName: '領單人員需有值!',
            mustBeginNum: '起始流水號需有值!',
            mustCount: '張數需有值!',
            mustPrefix: '字頭需有值!',           
            SaveOK: '更新完成!',
        };
    };
};
if ($.fn.SO3510A4) {
    var SO3510A4 = function () {
        this.language = {
            lblCompCode: "公司別",
            lblPaperNum: "作廢單號(含字頭)",
            btnFind: '查詢',
            btnOK: '作廢',
            btnExit: '結束',
            colPAPERNUM: '單號',
            colEMPNAME: '領單人員',
            colGETPAPERDATE: "領單日期",
            colBILLNO: "單據編號",
            colCUSTID: "客戶編號",
            colOPERATOR: "異動人員",
            colUPDTIME: "異動時間",         
            SaveOK: '作廢成功!',
            mustPaperNum1: '請輸入起始單號',
            mustPaperNum2: '請輸入截止單號',
            noneQuery: '查無資料',
            QueryFirst: '請先查詢資料',
            hadBillNo: '已有單據編號,無法作廢',
            AskQuestion:'是否作廢此批單據?[共 {0} 張]'
        };
    };
};
if ($.fn.SO3510A5) {
    var SO3510A5 = function () {
        this.language = {
            lblCompCode: "公司別",
            lblBillNo:'收費單號',
            lblPaperNum: "對應之收開單號",
            lblNewPaperNum:"新手開單號",
            btnFind: '查詢',
            btnOK: '更新',
            btnExit: '結束',
            colCUSTNAME: "客戶姓名",
            colBILLNO: "單據編號",
            colMANUAlNO: '手開單號',
            colITEM:'項次',
            colCITEMNAME: '收費項目名稱',
            colSHOULDAMT:'應收金額',            
            colCUSTID: "客戶編號",
            colREALDATE: '實收日期',
            colREALAMT: '實收金額',
            colCLCTNAME: '收費人員',
            colCMNAME: '收費方式',
            colSTNAME:'短收原因',
            
            SaveOK: '更新完成!',
            mustBillNo: '收費單號需有值',
            mustPaperNum2: '請輸入截止單號',
            noneQuery: '查無此收費單號',
            QueryFirst: '請先查詢資料',
            hadBillNo: '已有單據編號,無法作廢',
            mustNewPaperNum :'請輸入新手開單號',
            AskQuestion: '確定要將{0}之手開單號{1}換成{2}?',
            spaceManualNo:'空白'
        };
    };
};
if ($.fn.SO3272A3) {
    var SO3272A3 = function () {
        this.language = {
            lblCompCode: "公司別",
            lblFormat: '登入格式',
            lblBillHeadFmt: "多帳戶設定",
            lblShouldDate: "應收日期",
            lblShouldDateTo: '至',
            lblCreateTime: '產生時間',
            lblCreateTimeTo: '至',
            chkNormal: "包含一般戶",
            chkZero: "單張帳單合計總額<=0 是否要產生",
            chkExcI: '排除I單中帳單註記是空值',
            chkIgnorCredit:'信用卡過期資料一併產生',
            lblCondition: '條件',
            lblDataSetting: '資料設定',
            lblCustId: '客編',
            lblStoreNum: "商店代號",
            lblSendDate: '送件日期',
            lblAuthBatch: '授權批次',
            lblClientId: '端末機代號',
            lblBillMemo: '帳單提列訊息',
            btnOK: '確定',
            btnExit: '離開',
            TxtcsmBankCode: '銀行名稱',
            TxtcsmCMCode: '收費方式',
            TxtcsmAreaCode: '行政區',
            TxtcsmServCode: '服務區',
            TxtcsmCustStatus: '客戶狀態',
            TxtcsmCustClass: '客戶類別',
            TxtcsmClctEn: '收費員',
            TxtcsmOldClctEn: '原收費員',
            TxtcsmCreateEn: '產生人員',
            TxtcsmUCCode: '未收原因',
            TxtcsmCitemCode: '收費項目',
            TxtcsmBillType: '單據類別',
            TxtcsmPayType: '繳付類別',
            TxtcsmAMduId: '套房編號',
            TxtcsmEMduid: '此部份大樓要產生',
            TxtcsmNMduid: '此部份大樓不產生',
            csmCodeNo: '代碼',
            csmDescriptioncsm: '名稱',
            cboKind: '台北富邦銀行',
            mustComp: '公司別需有值!',
            mustBillFmt: '多帳號設定需有值!',
            mustShouldDate1: '應收日期起日需有值!',
            mustShouldDate2: '應收日期迄日需有值',
            mustBank: '銀行別需有值!',
            storeNum: '商店代號需有值!',
            mustSendDate: '送件日期需有值!',
            mustBatch: '授權批次需有值!',
            mustClientId: '端末機代號需有值!',
            chkFubonIntegrate: '財金平台格式',
            mustCMCode:'收費方式需有值!'
        };
    };
    //櫃檯繳款A   
};
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

//拆機工單
if ($.fn.SO1113A) {
    var SO1113A = function () {
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
        this.language.lPRCode = "派工類別";
        this.language.lResvTime = "預約時間";
        this.language.lReasonCode = "停拆機原因";
        this.language.lReasonDescCode = "停拆機原因細項";

        this.language.lCustRunCode = "客戶流向";
        this.language.lResvFlagTime = "客戶指定時間";

        this.language.lReInstDate = "復機預約日期";

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
        this.language.lBPCode = "優待組合";
        this.language.lBulletinCode = "消息來源";
        this.language.lGroupCode = "工程組別";
        this.language.lWorkerEn1 = "工程人員";
        this.language.lWorkerEn2 = "工程人員二";
        this.language.lCallOkTime = "線上回報時間";
        this.language.gbxAddress = "地址資料";
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
        this.language.lPrtCount = "列印次數:";
        this.language.lClsTime = "日結時間:";
        this.language.lSub1 = "設備項目";
        this.language.lSub2 = "收費項目";
        this.language.lSumAmount = "應收小計:";
        this.language.btnExtend = "續約項目";
        this.language.lNewTel1 = "施工聯絡電話";
        this.language.btnOtherCharge = "其他收費";
        this.language.g1ReInstAddress = "移機新址";
        this.language.g1NewChargeAddrNo = "新收費地址";
        this.language.g1NewMailAddrNo = "新郵寄地址";

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
        this.language.btnExtend = "續約資訊";
        this.language.btnPresent = "贈品資訊";
        this.language.btnExit = "取消";
        this.language.editStaus = "顯示";
        this.language.lblReInstDate = "復機預約時間";
        this.language.lblReInstDate2 = "拆機預約時間";
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
        this.language.choosePRCode = "請先選擇拆機類別";
        this.language.chooseResvTime = "請先指定預約時間";
        this.language.chooseReInstAddress = "請先指定移機新址";

        this.language.chargePayCheckChargeRange = "已有收費項目已入帳(暫收)或已實收,請注意收費期間是否正確";
        this.language.chargeInvCheckChargeRange = "已有收費項目開立發票,請注意收費期間是否正確";
        this.language.sureChangeClctToWorkEn = "工單收費資料已有收費人員,是否要將收費人員改成工作人員1??";

        this.language.FormChooseAddress = "同區移機-選地址 [SO1113B]"
        this.language.FormPRReasonData = "移機-停拆移機原因 [SO1113C]"
        this.language.customerAddNew = "新增客戶資料";
        this.language.removeGotoNewAddr = "同區移機";
        this.language.GearingPR = "連動拆機";
        this.language.UpdCustErr = "客戶資料異動失敗!";
        this.language.UpdInstWipErr = "拆機工單資料異動失敗!";
        this.language.CancelOtherWipData = "取消派工其它服務別工單...";
        this.language.ChooseCustDataErr = "選取客戶資料失敗!"

        this.language.WasCancelNotEdit = "該筆收費資料已作廢,不可修改!",
        this.language.WasCloseNotEdit = "該筆收費資料已日結,不可修改!",
        this.language.WasChargeNotEdit = "該筆收費資料已收費,不可修改!",
        this.language.CloseDataNotEdit = "結清資料不能修改!"
        this.language.subFormTitle2 = "裝機地址重覆"
    };
};
if ($.fn.SO1113A1) {
    var SO1113A1 = (function () {
        this.language = {};

        this.language.btnOk = "確定";
        this.language.btnExit = "離開";
        this.language.Message = "訊息";
        this.language.Prompt = "提示";
        this.language.NoIntoWipData = "無傳入工單資料表!";
        this.language.NoWipData = "無工單資料!";
        this.language.SNOErr = "工單單號有誤!";
        this.language.CustidErr = "客戶編號有誤!";
        this.language.ServiceTypeErr = "服務別有誤!";
        this.language.DeleteSuccess = "刪除成功!";
    });
};

if ($.fn.SO1113B) {
    var SO1113B = (function () {
        this.language = {};
        this.language.chkNoCust = "查無客戶";

        this.language.gData_STATUSCATV = "CATV狀態";
        this.language.gData_STATUSCM = "CM狀態";
        this.language.gData_STATUSDTV = "DTV狀態";
        this.language.gData_CUSTID = "客戶編號";
        this.language.gData_CUSTNAME = "客戶名稱";
        this.language.gData_TEL1 = "聯絡電話"; //"電話1"
        //this.language.gData_TEL2 = "電話2";
        this.language.gData_TEL3 = "行動電話"; // "電話3"
        this.language.gData_HSIFLAG = "CM可裝";
        this.language.gData_DUALCABLE = "雙向";
        this.language.gData_FTTXFLAG = "提供FTTx";
        this.language.gData_ADDRNO = "地址編號";
        this.language.gData_ADDRESS = "地址";
        this.language.gData_AREANAME = "行政區";
        this.language.gData_SERVNAME = "服務區";
        this.language.gData_CLCTNAME = "收費員";
        this.language.gData_CANCEL = "註銷";
        this.language.cancelCustNoWip = "註銷客戶不可派單!";
        this.language.serviceKindGetErr = "業者服務種類取得失敗!";
        this.language.setGetDependService = "該HomePass 點無客戶裝{0},可能需再加裝{0}服務!!";
        this.language.btnOk = "確定";
        this.language.btnExit = "離開";
    });
};
if ($.fn.SO1113C) {
    var SO1113C = (function () {
        this.language = {};

        this.language.gData_SERVICETYPE = "服務別";
        this.language.gData_PRCODE = "停拆機代碼";
        this.language.gData_PRNAME = "停拆機類別";
        this.language.gData_REASONCODE = "原因代碼";
        this.language.gData_REASONNAME = "停拆機原因";

        this.language.noPRReason = "服務別{0}停拆機原因需有值!!";
        this.language.noPRCode = "服務別{0}停拆機類別需有值!!";

        this.language.btnOk = "確定";
        this.language.btnExit = "離開";
    });
};
if ($.fn.dynUpdateGrid2) {
    var dynUpdateGrid2 = function () {
        this.language = {
            lblCompCode: "公司別",
            btnSave: "儲存",
            btnAppend: "新增",
            btnEdit: "修改",
            btnDelete: "刪除",
            btnCancel: "取消",
            btnCopy: "跨區複製",
            InformatStr: "訊息",
            dataDouble:'重複!!',
            NoneComp: "無任何公司別!",
            View: "顯示",
            Cancel: "取消",
            AddNew: "新增",
            Delete: "刪除",
            Edit: "修改",
            Quite: "離開",
            NoneProgramId: "沒有指定ProgramId!",
            ErrStr: "錯誤",
            NoneFoundSO1111A: "找不到SO1111A設定檔!",
            NoneFoundSO1111B: "找不到SO1111B設定檔!",
            InformatStr2: " 訊息:",
            NonePara: "未傳入Parameter參數!",
            NoneTable: "未傳入Parameter Table 資料!",
            NoDataEdit: "無任何資料可編輯!",
            SaveFail: "儲存失敗!",
            NoDelData: "無任何資料可刪除!",
            DelAsk: "是否確定刪除此筆資料?",
            AskStr: "詢問",
            refreshDynGridFail: '資料儲存成功，但更新GRID失敗',
            DelOK: "刪除成功",
            SaveOK: "儲存成功",
            QuitAsk: "新增或修改未存檔,是否真的要離開?",
            ShowCopyForm: "跨區複製",
            dupData : "[{0}]重複!!",
        };
    }
};
if ($.fn.INV1120A1) {
    var INV1120A1 = function () {
        this.language = {
            chkDEPOSITMK: '大平台已匯款註記',
            btnExit: '離開',
            stateAdd: '新增',
            stateEdit: '修改',
            stateDel: '刪除',
            stateView: '顯示',
            TabItem1: "發票主資訊",
            TabItem2: "發票次資訊",
            lblInvNo: "發票號碼",
            lblMainInvNo: "主發票號碼",
            lblInvFormat: "發票格式",
            lblHowToCreate: "發票來源",
            lblInvDate: "發票日期",
            lblCustId: "客編",
            lblCustName: '客戶名稱',
            lblInvTitle: "發票抬頭",
            lblBusinessId: "統一編號",
            lblContmobile: "行動電話",
            lblIsObsolete: "作廢否",
            lblInvAddr: "發票地址",
            lblChargeDate: "收費日期",
            lblObsoleteReason: "作廢原因",
            lblMailAddr: "郵寄地址",
            lblZipCode: "郵遞區號",
            lblDestroyReason: "註銷原因",
            lblInstAddr: "裝機地址",
            lblInvUseId: " 發票用途",
            lblPrintCount: "列印次數",
            lblCanModify: "可否修改",
            lblSaleAmount: "銷售額",
            lblTaxAmount: "稅額",
            lblInvAmount: "總金額",
            lblMainSaleAmount: "主發票銷售額",
            lblMainTaxAmount: "主發票稅額",
            lblMainInvAmount: '主發票總金額',
            lblMemo1: "備註一",
            lblMemo2: "備註二",
            lblTaxType: "稅別",
            rdoTax1: "應稅",
            chkEInv: "雲端發票",
            btnSave:"存檔",

            rdoTax2: "零稅率",
            rdoTax3: "免稅",
            Email: "常用E-MAIL",
            chkPrizeType: " 中獎註記",
            chkAutoUploadFlag: "自動上傳註記",
            chkFIXFlag: "雲端發票專用字軌",
            chkUploadFlag: "已產生上傳檔",
            chkDestroyFlag: "已註銷上傳檔",
            chkObUploadFlag: "已產生作廢檔",
            lblPrizeFileFirst: "中獎清冊檔名",
            lblLoveNum: "捐贈碼",
            lblGiveUnitId: '受贈單位',
            lblCreateInvDate: "發票開立時間",
            lblPrintEn: "列印人員",
            lbllblPrintTime: "列印時間",
            lblUploadTime: "上傳時間",


            lblOBUPLOADTIME: "作廢上傳時間",
            lblDestroyUploadTime: "註銷上傳時間",
            lblCarrierType: "客戶載具類別號碼",
            lblCarrierId1: " 客戶載具顯碼",
            lblA_CarrierId1: "會員載具顯碼",
            lblRandomNum: "發票防偽隨機碼",
            lblCarrierId2: "客戶載具隱碼",
            lblA_CarrierId2: "會員載具隱碼",
            QuitAsk: "資料尚未存檔,是否確定離開?",
            DelAsk: "是否刪除此筆資料?",
            HowtoCreate1: "預開",
            HowtoCreate2: "後開",
            HowtoCreate3: "現場開立",
            HowtoCreate4: "一般開立",
            scrYes: "是",
            scrNo: "否",
            InvFormat1: "雲端",
            InvFormat2: "手二",
            InvFormat3: "手三",
            MustInvAmount: "發票金額必須大於0。",
            mustTaxRate: "稅率必須大於0",
            mustBussinessId: "此張為手工三聯式發票, 必須輸入統編。",
            mustInv008: "發票明細必須輸入",
            mustInvNo: "發票號碼必須輸入",
            mustDonate: "發票為捐贈，愛心碼或受贈單位需有值！",
            mustCustId: "客戶編號必須輸入",
            mustCustName: "客戶名稱必須輸入",
            inv099LastDateErr: "您輸入的發票日期小於【最後發票開立日】。",
            plsInvDate: "請輸入發票日期",
            noCustIdQuery: "查無客編",
            chooseCustTitle: " [選擇客戶資料] INV1120A12",
            NoModifyMisData: "此筆資料為客服系統資料, 無法修改",
            MergeData: "合併資料,無法修改",
            detailEditTitle: "[編輯明細] INV1120A13",
            chooseInvNoTitle: "[選擇發票號碼] INV1120A11",
            noInvId:"'無發票資料!'",
            onlyNum: "客編只能輸入數字",
            lblDataType: '資料類別',
            DATATYPEX: 'X-社福團體',
            DATATYPEA: 'A-會員廠商',
            DATATYPEB: 'B-非會員廠商',
            DATATYPEY: 'Y-無載具紙本',
            cannotBusiness: '統一編號有值，不可設定為 [ 雲端發票 ]！',
            cannotUploadFlag: '統一編號有值，不可選取上傳發票字軌！',
            cannotDonate: '(營業人)發票不可為【捐贈】。',
            notgetA_CARRIERID1 :'無法取得會員載具資訊，無法存檔！',
        };
    }
};
if ($.fn.INV1120A11) {
    var INV1120A11 = function () {
        this.language = {
            TabItem1: "發票主資訊",
            TabItem2: "發票次資訊",
            lblInvNo: "發票號碼",
            lblMainInvNo: "主發票號碼",
            lblInvFormat: "發票格式",
            lblHowToCreate: "發票來源",
            lblInvDate: "發票日期",
            lblCustId: "客編",
            lblCustName: '客戶名稱',
            lblInvTitle: "發票抬頭",
            lblBusinessId: "統一編號",
            lblContmobile: "行動電話",
            lblIsObsolete: "作廢否",
            lblInvAddr: "發票地址",
            lblChargeDate: "收費日期",
            lblObsoleteReason: "作廢原因",
            lblMailAddr: "郵寄地址",
            lblZipCode: "郵遞區號",
            lblDestroyReason: "註銷原因",
            lblInstAddr: "裝機地址",
            lblInvUseId: " 發票用途",
            lblPrintCount: "列印次數",
            lblCanModify: "可否修改",
            lblSaleAmount: "銷售額",
            lblTaxAmount: "稅額",
            lblInvAmount: "總金額",
            lblMainSaleAmount: "主發票銷售額",
            lblMainTaxAmount: "主發票稅額",
            lblMainInvAmount: '主發票總金額',
            lblMemo1: "備註一",
            lblMemo2: "備註二",
            lblTaxType: "稅別",
            rdoTax1: "應稅",


            rdoTax2: "零稅率",
            rdoTax3: "免稅",
            Email: "常用E-MAIL",
            chkPrizeType: " 中獎註記:",
            chkAutoUploadFlag: "自動上傳註記",
            chkFIXFlag: "雲端發票專用字軌",
            chkUploadFlag: "已產生上傳檔",
            chkDestroyFlag: "已註銷上傳檔",
            chkObUploadFlag: "已產生作廢檔",
            lblPrizeFileFirst: "中獎清冊檔名",
            lblLoveNum: "捐贈碼",
            lblGiveUnitId: '受贈單位',
            lblCreateInvDate: "發票開立時間",
            lblPrintEn: "列印人員",
            lbllblPrintTime: "列印時間",
            lblUploadTime: "上傳時間",


            lblOBUPLOADTIME: "作廢上傳時間",
            lblDestroyUploadTime: "註銷上傳時間",
            lblCarrierType: "客戶載具類別號碼",
            lblCarrierId1: " 客戶載具顯碼:",
            lblA_CarrierId1: "會員載具顯碼",
            lblRandomNum: "發票防偽隨機碼",
            lblCarrierId2: "客戶載具隱碼",
            lblA_CarrierId2: "會員載具隱碼",
            colYEARMONTH: "使用年月",
            colINVFORMATDESC: "格式",
            colUPLOADFLAG: "雲端發票上傳註記",
            colPREFIX: '字軌',
            colSTARTNUM: '起始號碼',
            colENDNUM: '結束號碼',
            colCURNUM: '目前可用號碼',
            colLASTINVDATE: '最後發票開立日',
            colMEMO: '備註'

        };
    }
};
if ($.fn.INV1120A12) {
    var INV1120A12 = function () {
        this.language = {
            lblCustId: "客編",
            lblCustName: "客戶名稱",
            btnOK: "確定",
            btnCancel: "取消",
            lblQuery:'查詢條件',
            plsQueryWhere: '請輸入查詢條件',
            plsQueryMethod: "請選擇查詢方式",
            onlyNum: "只能輸入數字",
            noData: "查無資料!!",
            noChoice: "無選擇任何資料",
            noSameTax: "所選稅率不完全相同",
            noSameDetail: "所選稅率與發票明細資料不相同",
            colCustId: "客編",
            colCUSTSNAME: "客戶簡稱",
            colTITLESNAME: "抬頭簡稱",
            colTITLENAME: "抬頭全名",
            colCUSTNAME: "客戶全名",
            colBUSINESSID: "統一編號",
            colTEL1: "電話1",
            colTEL2: "電話2",
            colTEL3: "電話3",
            colINVADDR: "發票地址",
            colMAILADDR: "寄件地址",
            colMailAddress: "郵寄地址",
            colInvTitle: "抬頭",
            colZIPCODE: "郵遞區號",
            colInvSeqNo: "發票抬頭流水號",
            colInvoiceKind2: "發票種類",
            colDENRECCODE: "受贈單位",
            colDENRECNAME: "受贈單位名稱",
            colChoose: "選擇",
            colsource: "單號種類",
            colBILLNO: "單號",
            colITEM: "項次",
            colCITEMNAME: "收費項目",
            colSHOULDDATE: "應收日",
            colSHOULDAMT: "應收金額",
            colREALDATE: "實收日",
            colREALPERIOD: "收費期數",
            colREALSTARTDATE: "有效起始日期",
            colREALSTOPDATE: "有效截止日期",
            colCLCTNAME: "收費人員姓名",
            colSTNAME: "短收原因",
            colTAXNAME: "稅別",
            colRATE1: "稅率一",
            colACCOUNTNO: "扣款帳號",
            colSERVICETYPE: "服務別",
            colINSTADDRESS:"裝機地址",
            colINVOICEKIND: '發票種類',
            colDENRECCODE: '受贈單位',
            colDENRECNAME: '受贈單位名稱',
            notsameSO033Acc: '您所選取之未日結資料的 Account No 與抬頭資料的 Account No 不一樣!',
            notsameSO034Acc: '您所選取之已日結資料的 Account No 與抬頭資料的 Account No 不一樣!',
            notsameSO033Seq: '您所選取之未日結資料的 發票抬頭流水號 與抬頭資料的 發票抬頭流水號 不一樣!',
            notsameSO034Seq: '您所選取之已日結資料的 發票抬頭流水號 與抬頭資料的 發票抬頭流水號 不一樣!',
        
        };
    }
};
if ($.fn.INV1120A13) {
    var INV1120A13 = function () {
        this.language = {            
            btnOK: "確定",
            btnCancel: "取消",
            lblCMMac: 'Mac序號',
            lblSmartCardNo: 'DTV智慧卡號',
            lblAccountNo: '帳號/卡號',
            lblFacisNo: '設備序號',
            lblTotalAmount: '總金額',
            lblSaleAmount: '銷售額',
            lblTaxAmount: '稅額',
            lblUnitPrice: '單價',
            lblQuantity: '數量',
            lblItemID: '品名',
            lblServiceType: '服務別',
            lblEndDate: '有效截止日',
            lblStartDate: '有效起始日',
            lblBillIDItemNo: '收費單號項次',
            lblBillID: '收費單號',
            mustPrice: "單價不充許為0",
            mustItemId: "品名不充許空白",

        };
    }
};
if ($.fn.INV1110A) {
    var INV1110A = function () {
        this.language = {
            TabItem1: "開立查詢畫面",
            TabItem2: "查詢結果",
            TabItem3: '開立結果',
            lblCreateTitle: '發票開立',
            lblCreateKind: '開立發票種類',
            lblChargeDate: '收費日期',
            lblHowtoCreate: '開立方式',
            lblInvDate: '發票日期',
            chkSameInvDate: '發票日期同收費日期',
            lblCreateDetailTitle: '發票開立明細',
            lblExecuteEn: '操作者',
            lblQuery: '查詢條件',
            lblExcept: '預計發票開立統計',
            lblNoExcept: '不開立發票統計',
            lblInvCount: '發票張數',
            lblNoInvCount: '發票張數',
            lblSaleAmount: '總銷售額',
            lblNoSaleAmount: "總銷售額",
            lblTaxAmount: "總   稅   額",
            lblNoTaxAmount: "總   稅   額",
            lblInvAmount: "總   金   額",
            lblNoInvAmount: "總   金   額",
            lblValidCounts: '可用發票',
            lblorder: '排序方式',
            btnCreate: '開立',
            btnReQuery: '重新查詢',
            lblCreateResult: '開立結果',
            lblSaleAmount3: '銷貨總額',
            lblTaxAmount3: '稅金總額',
            lblInvAmount3: '總額',
            lblAssignInvCount: '發票開立張數',
            lblStartInvID: '發票開立起始號碼',
            lblStopInvID: '發票開立截止號碼',
            lblInvoiceKind1: '電子計算機',
            lblInvoiceKind2: '雲端發票',
            lblKindSaleAmount: '銷售總額',
            lblKindTaxAmount: '稅金總額',
            lblKindInvAmount: '總計',
            lblKindCreateCount: '開立張數',
            btnOver: '結束',
            colYEARMONTH: "使用年月",
            colINVFORMATDESC: "格式",
            colUPLOADFLAG: "上傳註記",
            colPREFIX: '字軌',
            colSTARTNUM: '起始號碼',
            colENDNUM: '結束號碼',
            colCURNUM: '目前可用號碼',
            colLASTINVDATE: '最後發票開立日',
            colMEMO: '備註',
            plsDateCorrect: '請輸入正確的日期範圍,例如：2001/01/01~2001/02/28！',
            plsChargeDate:'請輸入收費日期!',
            plsInvDate: "請輸入發票日期",
            UPLOADFLAGYes:"是",
            UPLOADFLAGNo:"否",
            haveInvNo: '此字軌已選過',
            invStartMustBigger: '開始收費日期必須大於或等於選取發票字軌的最後發票開立日。',
            InvDateMustBigger: '發票日期必須大於等於字軌的最後發票開立日',
            MustinvCreateKind: '請輸入開立發票種類',
            MustHowtoCreate: '請輸入開立方式',
            mustInvPrefix: '請確定此次開立所用到的字軌為何!',
            txtExecuteEn: "",
            //txtQuery: "",
            txtQuery1: "",
            txtQuery2: "",
            txtQuery3: "",
            txtStartInvID: "",
            txtStopInvID: "",
            QueryResult1: '公司簡稱: {0}  ({1})',
            QueryResult2: '發票日期: {0}',
            QueryResult3: '收費日期: {0} ~ {1}',
            showInfo1: '預計開立發票資料查詢',
            showInfo2: '不開立發票資料查詢',
            readyCreateInv: "此次開立所用到的字軌為:",
            ReportCondition1:'Log時間',
            ReportCondition2: '公司別',
            btnExcept: '明細',
            btnNoExcept: '明細',
        };
    }
};
if ($.fn.INV1110A2) {
    var INV1110A2 = function () {
        this.language = {
            btnExit: "離開",
            colSEQ: "流水號",
            colCustId:"客編",
            colTitle: "發票抬頭",
            colTEL: "電話",
            colBUSINESSID: "統編",
            colZIPCODE: "郵遞區號",
            colINVADDR: "發票地址",
            colMAILADDR: "寄件地址",
            colCHARGEDATE: "收費日",
            colDESCRIPTION: "稅別",
            colTAXRATE: "稅率",
            colSALEAMOUNT: "銷售額",
            colTAXAMOUNT: "稅額",
            colINVAMOUNT: "發票金額",
            colHOWTOCREATE: "開立來源",
            colCHARGETITLE: "收件人",
            colUPTTIME: "異動時間",
            colUPTEN: "異動人員",
            colBILLID: "收費單號",
            colBILLIDITEMNO: "項次",
            colITEMDESCRIPTION: "品名",
            colTAXDESCRIPTION: "稅別",
            colQUANTITY: "數量",
            colUNITPRICE: "單價",
            colTOTALAMOUNT: "總金額",
            colSTARTDATE: "有效日起",
            colENDDATE: "有效日迄",
            colCHARGEEN: "收費人員",
            colSERVICETYPE: "服務別",
            

            
        };
    }
};

