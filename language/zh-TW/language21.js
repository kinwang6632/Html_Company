//登入
if ($.fn.login) {
    var login = function () {
        this.language = {
            userId: "帳號",
            p9assw9ord: "密碼",
            mustBe: "[{0}]為必要欄位",
            inputError: "[{0}]輸入錯誤",
            zoomToOne: "請按【Ctrl+0】將檢視比率設成100%",
            gbxSecurityWarning: '資安警語',
            account_Stop: '該帳號已停用，無法登入系統',
            p9assw9ord_Stop: '密碼已超過期限,請再重新設定新密碼',
            reTryString: '(您還有{0}次機會!!)',
            lock_Account: '密碼連續輸入錯誤超過系統允許次數, 系統已鎖住帳號!',
            SecurityWarning: '資安警語',
            CM003_Stop: '人事小檔已停用，請確認',
            changeP9assw9ord: '重設密碼',
            AD_NodFound: '該AD帳號或密碼錯誤!',
            Site_AD_Data: '站台的AD參數相關設定不完整!',
            auto_Login_Fail: '參數不足或不完整, 無法自動登入!',
            accountMost5: '同一組帳號最多只能有5筆線上登入!\n系統將移除一筆最早的登入記錄, 並正式登入!',
            accountOnlyone: '同一組帳號最多只能有1筆線上登入!'
        };
    };
};

//csList
if ($.fn.csList) {
    var csList = (function () {
        this.language = {
            codeCaption : '代碼',
            descriptionCaption : '名稱',
            codeNo_Mustbe : 'codeNo不可為空值!',
            source_Mustbe : 'source不可為空值!',
            description_Mustbe : 'description不可為空值!',
            NoData: 'source為空值,  不能Enabled!',
            Source_Field_NG: '欄位[{0}]不存在source中!\n',
            //NoData_setDisplayValue: '傳入setDisplayValue不可為空值,  不能Enabled!',
        };
    });
};

//csAddress1
if ($.fn.csAddress1) {
    var csAddress1 = (function () {
       this.language = {
            chkEXTRAAREAFLAG:'僅經營區',
            lblTitle: '地址資料管理',
            lblStrt: '街道',
            lblLin: '鄰',
            lblSection: '段',
            lblLane: '巷',
            lblAlley: '弄',
            lblAlley2: '衖',
            lblNo1: '號',
            lblFlour: '樓',
            lblNo3: '之',
            lblRoom: '其它',
            lblCity2: '縣市名',
            lblBourg: '村里',
            lblClctEn: '收費人員',
            lblArea: '行政區',
            lblBT: '建築型態',
            lblZip: '郵遞區號',
            lblMDU: '大樓編號',
            lblServ: '服務區',
            lblCircuitNo: '網路編號',
            lblClctArea: '收費區',
            lblSales: '業務區',
            lblNetPointNo: '網點編碼',
            lblFirstInstDate: '首裝日',
            lblCircuitStatus: '線路狀態',
            lblJumpCableChangeDa: 'Jump Cable更換時間',
            lblCircuitLayout: '線路佈局',
            lblNote: '備註',

            view: "顯示",
            edit: "修改",
            addNew: "新增",
         
            ADDRCLASSCODE: '客戶類別',
            CIRCUITSTATUS1: '無線路',
            CIRCUITSTATUS2: '裝機完工',
            CIRCUITSTATUS3: '移機完工',
            CIRCUITSTATUS4: '修改裝機地址',

            noAddrData: '輸入的地址資料不完整!',
            btnOk: '確定',
            btnCancel: '取消',
            LaneAlley_Exist_CD023: '欄位需對應下拉選項的內容!',
            btnPrev: '上一筆',
            btnNext: '一筆',
            syncData_Inv_PostMail:'是否同步修正發票資料收費地址及郵寄地址?',
            LNFlag_Must: '此街道【鄰】必填!',
            AddrSort_Exists: '地址重覆!',
            MduId_Mustbe: '大樓編號為必填',
            No1_Mustbe: '【號】為必填'
        };
    });
};

//csAddress2
if ($.fn.csAddress2) {
    var csAddress2 = (function () {
       this.language = {
          chkEXTRAAREAFLAG: '僅經營區',
            lblAddressTitle: '地址：',
            lblStrt: '街道',
            lblLin: '鄰',
            lblSection: '段',
            lblLane: '巷',
            chkDoor: '是否路面',

            lblAlley: '弄',
            lblAlley2: '衖',
            lblNo1: '號',
            lblFlour: '樓',
            lblNo3: '之',
            lblRoom: '其它',
            lblNo2: '至',
            lblEven: '單雙號',

            EVEN1: '不分',
            EVEN2: '單',
            EVEN3: '雙',

            EVEN21: '(單)',
            EVEN31: '(雙)',
            DOOR: '(路面)',
            CITY: '市',
            LaneAlley_Exist_CD023: '欄位需對應下拉選項的內容!',
            LNFlag_Must: '此街道【鄰】必填!'
        };
    });
};

//csAddress3
if ($.fn.csAddress3) {
    var csAddress3 = (function () {
       this.language = {
          chkEXTRAAREAFLAG: '僅經營區',
            lblAddressTitle: '地址：',
            lblORD: '順序編號',
            lblStrt: '街道',
            lblLin: '鄰',
            lblSection: '段',
            lblLane: '巷',

            lblAlley: '弄',
            lblAlley2: '衖',
            lblNo1A: '號',
            lblFlour: '樓',
            lblNo2A: '至',
            lblNoe: '單雙號',

            EVEN1: '不分',
            EVEN2: '單',
            EVEN3: '雙',

            EVEN21: '(單)',
            EVEN31: '(雙)',
            LaneAlley_Exist_CD023: '欄位需對應下拉選項的內容!',
            LNFlag_Must: '此街道【鄰】必填!'
        };
    });
};

//csMulti
if ($.fn.csMulti) {
    var csMulti = (function () {
        this.language = {
            buttonText: '按我選擇',
            idTitle: '代碼',
            descTitle: '名稱',
            btncsOK: '確定',
            btncsSelAll: '全選',
            btncsClear: '清除',
            btncsCancel: '取消',
            btnShowSelectItems: '已選取',
            dataInfo: '目前:{0}&nbsp;&nbsp;&nbsp;&nbsp;總共:{1}&nbsp;&nbsp;&nbsp;&nbsp;選取:{2}'
        };
    });
};

//SO0000B
if ($.fn.SO0000B) {
    var SO0000B = (function () {
        this.language = {
            tabItem_CustQuery: '客戶查詢',
            noDefineHtmlName: '{0}:未載入或不存在!',
            logout: "登出【{0} {1}/{2}】",
            showMenu: "按一下! 顯示功能表!",
            LoginInfo_Need: "沒有傳入loginInfo物件!",
            switch_DBOWNER: ".切換資料區",
            Title_CanChooseCompCode: '請先選擇資料區',
            success_Logout:'已經登出！將轉往重新登入頁面!',
            editingAlert: '無法進行切換! 尚有功能處於編修模式中!',
            editingAlertA: '無法進行切換! 尚有功能【{0}】處於編修模式中!\n',
            editingAlertKey: '顯示',
            noData_SO029: '取不到功能表資料! 可能是權限不足!',
            btnDestroyMenu:'全釋放',
            tabCustQuery_Main_Last:'請先關閉其它頁簽!'
        };
    });
};

//SO0000B1
if ($.fn.SO0000B1) {
    var SO0000B1 = (function () {
        this.language = {
            AllMessage : "全部訊息一覽表"
        };
    });
};

//SO0000B2
if ($.fn.SO0000B2) {
    var SO0000B2 = (function () {
        this.language = {
            SureNoSaveExit: "新增或修改未存檔，是否真的要離開?",
            btnPrev: '上一頁',
            btnNext: '下一頁',
            lblDay1: '每頁',
            lblDay2: '天',
            lblToDay1: '基準日:',
            btnClose: '離開',

            BOARDTIME: '公告時間',
            CODENO: '公司別',
            SUBJECT: '摘要',
            CONTENT: '內容',
            BOARDDATE: '公告區間',
            BOARDEN: '公告人員',
            SHOWSECOND: '秒數',
            UPDTIME: '異動時間',
            UPDEN: '異動人員'
        };
    });
};

//SO1100B
if ($.fn.SO1100B) {
    var SO1100B = (function () {
        this.language = {
            csw_cv_MduName: '大樓資料顯示[CSR1100A11]',
            csw_cv_Tel: '聯絡電話一覽表[CSR1100A05]',
            csw_cv_Contact: '互動-新增來電[CSR119021]',
            csw_cv_SpeakingSkill: "客戶話術",

            lblInstPoint: '裝機點資料：',
            lblPrice: '應收金額：',
            lblCircuitNo: '網路編號：',
            lblFirstInstDate: '首裝日：',

            hFlag: '可裝CATV',
            fttxFlag: '可裝FTTX',
            hsiFlag: '可裝CM',
            dualCable: '雙向區',

            hFlag_NG: '不可裝CATV',
            fttxFlag_NG: '不可裝FTTX',
            hsiFlag_NG: '不可裝CM',
            dualCable_NG: '非雙向區',

            lblAreaName: '行政區：',
            lblServName: '服務區：',
            lblBTName: '建築型態：',
            lblMDUName: '大樓名稱：',
            lblAddrClassName: '地址類別：',
            lblContTel: '電話：',
            lblpriceId: '應收金額：',
            lblContMobile: '行動電話：',
            lblBirthday: '生日：',
            lblCustAttribute: '身份：',
            lblIdNote: '特殊備註：',
            lblDomicileAddress: '通訊地址：',
            lblGRDProductState: '產品狀態彙總表',
            IDLostString: '缺',
            lblViewType_AD: '地址模式',
            lblViewType_ID: 'ID模式',

            dollar: '元',
            Fault1_Error: '斷訊中!!',
            Fault1_Normal: '是否曾被標示斷訊!!',
            statusMsg1: '故障區域中,起迄:{0} ~ {1},<br />原因1:{2},<br />原因2:{3},<br />說明:{4}',
            reason1: '原因1',
            reason2: '原因2',
            description: '說明:',
            strTmp2: '是否若落於故障區!!\n',
            strTmp3: 'CM產品訊號!!\n',
            strTmp4: 'DTV產品訊號!!\n',
            strTmp5: 'CP或VoIP產品訊號!!\n',
            payMethod: '"現付制"',
            install: '裝機中',
            vpr: '拆機中',
            vpr2: '拆機中',

            N_NAME: '產品',
            SALE: '促銷',
            INSTALL: '裝中',
            NORMAL: '正常',
            PR1: '拆中',
            PR2: '已拆',

            refresh_ViewData_g1: '已拆',
            refresh_ViewData_g2: '為空值, 無法進行View Type切換!',
            refresh_ViewData_g3: '欄位:CUSTID為空值, 無法進行客編切換!',

            noData: '查無資料!',
            scaleUndefined: '此倍率不在計算範圍(100%~150%)內!',
            noData_MenuList_M1: '未在web.config內設定Key為DynamicAllInOneMulti且值含 M1 的sysProgramId值, 以做為CV右上方功能表的開頭!'
        };
    });
};

//SO1100B1
if ($.fn.SO1100B1) {
    var SO1100B1 = (function () {
        this.language = {
            ARTICLENO: "贈品代碼",
            ARTICLENAME: "贈品名稱",
            MAKE: "型號",
            BPNAME: "優惠方案",
            UNITPRICE: "單價",
            WORKNAME: "派工類別",
        };
    });
};

//SO1131B
if ($.fn.SO1131B) {
    var SO1131B = (function () {
        this.language = {
            lblPromCode: "促銷方案",
            lblContNo: "合約編號",
            lblBPCode: "優惠組合",
            lblContMonth: "合約月數",
            lblStopFlag: "停用",
            lblPunish: "違約處份",
            lblStopDate: "停用日期",
            lblDiscountAmt: "優待金額",
            lblPeriod: "每次期數",
            lblContStartDate: "合約期限",
            lblDash1: "至",
            lblMonthAmt: "單月金額",
            lblDayAmt: "單日金額",
            lblDiscountDate1: "優惠期限",
            lblDash2: "至",
            lblOldContStopDate1: "原始合約到期日",
            lblPromtion: "促銷方案說明",
            lblOldDiscountDate2: "原始優惠到期日",

            DISCOUNTDATE1: "優待起始日",
            DISCOUNTDATE2: "優待截止日",
            PERIOD: "期數",
            DISCOUNTAMT: "優待金額",
            MONTHAMT: "單月金額",
            DAYAMT: "單日金額",
            PUNISH: "違約處份",
            STOPFLAG: "停用",
            STOPDATE: "停用日期",
            UPDTIME: "異動時間",
            UPDEN: "異動人員",

            btnSave: "存檔",
            btnEdit: "修改",
            btnStopFlag3: "停用",
            btnAppend: "新增",
            btnExit: "離開",
            btnCancel: "取消",

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            updateSuccess: "寫入完成!",
            promCode_Need: "[促銷方案]欄位為必填!",
            bpCode_Need: "[優惠組合]欄位為必填!",
            contNo_Need: "[優惠組合]欄位為必填!",
            discountAmt_Need: "[優待金額]欄位為必填!",
            period_Need: "期數不可為零！",
            monthAmt_Need: "[單月金額]欄位為必填!",
            dayAmt_Need: "[單日金額]欄位為必填!",
            contStartDate_Need: "[合約期限]欄位為必填!",
            discountDate1_Need: "[優惠期限]欄位為必填!",
            contStartDate_NG: "合約期限截止日不可小於起始日!!",
            discountDate1_NG: "優惠期限截止日不可小於起始日!!",
            NoData: '無優惠資料可供做預設值!',
            noDataByCycle_Need: "週期項目無記錄!",
            noDataByBPCode_Need: "優惠組合無記錄!",
            notMapLongPay_Need: "對應不到優惠組合長繳別註記,無法調整對應多階金額資料!",
            haveLongPay_NoDataByCitemCode_Need: "優惠組合有設定長繳別,但週期項目未設定!"
        };
    });
};

//SO1132C
if ($.fn.SO1132C) {
    var SO1132C = (function () {
        this.language = {
            gbxSource:"合併單據區",
            lCombineAmt:"合併後金額:",
            lCombineAmt3: "元",

            lbltabItem_A:'單據合併',
            lbltabItem_B: '產生媒體單號',
            lbltabItem_C: '拆單',
            lbltabItem_D: '清除扣款帳號',

            dgLeft_MEDIABILLNO:"媒體單號",
            dgLeft_SHOULDAMT:"應收總計",

            dgRight_BILLNO:"單據編號",
            dgRight_ACCOUNTNO:"帳號",
            dgRight_DECLARANTNAME:"申請人",
            dgRight_FACISNO:"設備序號",
            dgRight_CITEMNAME:"收費項目",
            //dgRight_OLDAMT:"原應收$",
            dgRight_SHOULDAMT:"應收金額",
            dgRight_REALPERIOD:"期數",
            dgRight_REALSTARTDATE:"起始日",
            dgRight_REALSTOPDATE:"截止日",

            gbxTarget:"被合併單據區",
            chkBillNo:"單據編號",
            chkAccountNo:"帳號",
            chkFaciSeqNo:"設備序號",
            chkDeclarantName:"申請人",

            dgTarget_CHOOSE:"選擇",
            dgTarget_MEDIABILLNO:"媒體單號",
            dgTarget_CITIBANKATM:"虛擬帳號",
            dgTarget_BILLNO:"單據編號",
            dgTarget_ACCOUNTNO:"帳號",
            dgTarget_DECLARANTNAME:"申請人",
            dgTarget_FACISNO:"設備序號",
            dgTarget_CITEMNAME:"收費項目",
            //dgTarget_OLDAMT:"原應收$",
            dgTarget_SHOULDAMT:"應收金額",
            dgTarget_REALPERIOD:"期數",
            dgTarget_REALSTARTDATE:"起始日",
            dgTarget_REALSTOPDATE:"截止日",

            btnOk:' 併單',
            btnQuit:'離開',
            btnSO1132D1:' 重產虛擬帳號',

            pleaseChooseData:"請勾選要合併資料!!",

            executeOk:"執行成功!!",
            executeError:"執行錯誤,錯誤原因: {0}!!" ,
            NoFocusRow: "請指定左上方任一媒體單號!!",
            condition1: '合併後總金額({0}＜0元), 無法併單。',
            condition2: '發票系統公司別={0},課稅別={1},合計應收金額({2}＜0元), 無法併單。',


            //拆單功能
            gbxSourcePR:"拆單單據區",
            dgPRLeft_MEDIABILLNO:"媒體單號",
            dgPRLeft_SHOULDAMT:"應收總計",

            CHOOSEPR:"選擇",
            dgPRRight_BILLNO:"單據編號",
            dgPRRight_ACCOUNTNO:"帳號",
            dgPRRight_DECLARANTNAME:"申請人",
            dgPRRight_FACISNO:"設備序號",
            dgPRRight_CITEMNAME:"收費項目",
            dgPRRight_SHOULDAMT:"應收金額",
            dgPRRight_REALPERIOD:"期數",
            dgPRRight_REALSTARTDATE:"起始日",
            dgPRRight_REALSTOPDATE:"截止日",

            btnOkPR:'拆單',
            NoChoose: '請勾選欲拆單的項目!',


           //清除扣款帳號
            gbxSourceClear: "清除扣款帳號區",
            dgClearLeft_ACCOUNTNO: "帳號",
            dgClearLeft_SHOULDAMT: "應收總計",

            CHOOSEClear: "選擇",
            dgClearRight_BILLNO: "單據編號",
            dgClearRight_BANKNAME: "銀行別",
            dgClearRight_DECLARANTNAME: "申請人",
            dgClearRight_FACISNO: "設備序號",
            dgClearRight_CITEMNAME: "收費項目",
            dgClearRight_SHOULDAMT: "應收金額",
            dgClearRight_UCNAME: '未收原因',

            btnOkClear: '清空帳號',
            btnAllClear:'全選',
            NoChooseClear: '請勾選欲清除扣款帳號的項目!'
        };
    });
};

//SO1132D
if ($.fn.SO1132D) {
    var SO1132D = (function () {
        this.language = {
            gbxCondition: "連動條件",
            chkDeclarantName: "申請人",
            chkAccountNo: "扣款帳號",
            chkOrder: "訂單單號",
            lblMediaBillNoInfo1: "1. 『同時產生則媒體單號相同,若不需為同一個請分開產生即可』",
            lblMediaBillNoInfo2: "2. 合計金額＞0會一併產生虛擬帳號",

            CHOOSE: "選擇",
            MEDIABILLNO: "媒體單號",
            CITIBANKATM: "虛擬帳號",
            ORDERNO: "訂單單號",
            ACCOUNTNO: "扣款帳號",
            DECLARANTNAME: "申請人",
            FACISNO: "設備序號",
            CITEMCODE: "收費代碼",
            CITEMNAME: "收費項目名稱",
            REALPERIOD: "期數",
            SHOULDDATE: "應收日期",
            SHOULDAMT: "應收金額",
            REALSTARTDATE: "收費起始日",
            REALSTOPDATE: "收費截止日",
            BILLCLOSEDATE: "帳單截止日",
            BARCODECLOSEDATE: "條碼截止日",

            btnOk: '確定',
            btnCancel: '取消',

            executeOk: "執行成功!!",
            executeError: "執行錯誤,錯誤原因: {0}!!"
        };
    });
};

//SO1132D1
if ($.fn.SO1132D1) {
    var SO1132D1 = (function () {
        this.language = {
            btnOk: '確定',

            executeOk: "執行成功!!",
            executeError: "執行錯誤,錯誤原因: {0}!!"
        };
    });
};

//SO1144K
if ($.fn.SO1144K) {
    var SO1144K = (function () {
        this.language = {
            SELECTED: "選取",
            ARTICLENO: "贈品代碼",
            ARTICLENAME: "贈品名稱",
            MAKE: "型號",
            BPNAME: "優惠方案",
            UNITPRICE: "單價",
            WORKNAME: "派工類別",

            //SELECTED:"選取",
            TYPE: "種類",
            GIFTKIND: "贈品種類",
            GIFTOPTION: "贈送方式",
            SELECTTYPE: "選贈模式",
            ARTICLENAME2: "贈品名稱",
            PRODUCTCODENAME: "依附產品",
            CITEMNAME_F2: "加購項目",
            ORDERPRICERANGE: "滿額贈金額",
            ADDPRICE: "加購金額",

            GIFTOPTION1: "無條件",
            GIFTOPTION2: "依附產品",
            GIFTOPTION3: "依金額",

            SELECTTYPEa: "單選",
            SELECTTYPE1: "多選1",
            SELECTTYPE2: "多選2",
            SELECTTYPE3: "多選3",
            SELECTTYPE4: "多選4",
            SELECTTYPE5: "多選5",
            SELECTTYPE6: "多選6",
            SELECTTYPE7: "多選7",
            SELECTTYPE8: "多選8",
            SELECTTYPE9: "多選9",

            CHFREETYPE1: "永久免費",
            CHFREETYPE2: "永久免費",
            CHFREETYPE3: "永久免費",

            GiftOpt1_FormatString: "無條件, {0}",
            GiftOpt2_FormatString: "依附{0}, {1}",
            GiftOpt3_FormatString: "{0}~{1}滿額贈, {2}",


            btnOk: '確定',
            btnCancel: '取消',

            check_selCount: "請從贈品單中, 挑選可選贈品!!",
            check_SELECTTYPE1: "請補足 [單選] 之條件!!",
            check_SELECTTYPEx: "請補足 [多選{0}] 之條件!!",
            SureNoSaveExit: "新增或修改未存檔，是否真的要離開?",

            Section1: "可選贈品",
            Section2: "加值購",
            addValueError: '未符合{0}選{1}規則!'
        };
    });
};

//SO1148A
if ($.fn.SO1148A) {
    var SO1148A = (function () {
        this.language = {
           lblOrderNo: "訂單單號",
           lblGiftKind: '贈品種類',
            chkCancelFlag: "作廢",
            lblGiftName: "商贈品",
            lblMake: "型號",
            lblPrice: "單價",
            lblConversionNo: "兌換卷號",
            lblAmount: "數量",
            lblConversionDate: "兌換日期",
            lblSubTotal: "小計",
            lblAmounta: "數量",
            lblDependType: "依附種類",
            lblProcEn: "處理人員",
            lblBPCode: "優惠組合",
            chkBackGift: "退回別",
            lblBackDate: "退回日期",
            lblDependCode: "促銷方案",
            lblBackEn: "經辦退回人員",

            dependType_Non: "無",
            dependType_BPCode: "優惠組合",
            dependType_DependCode: "促案",

            btnChgHistory: '更換記錄',
            btnSave: '存檔',
            btnExit: '離開',
            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: "取消",
           
            noDataByPresent: "前端未傳入Present資料!",
            noDataByAutoSerial: "傳入的AutoSerialNo為空白值!",
            noDataByCustID: "傳入的CustID為空白值!",
            noDataBy_SO105c: "資料異常, 在SO105C中取不到指定條件的記錄!",
            changeHistory: "更換記錄",
            giftNameMustbe: "[商贈品]為必填欄位!!",
            gifKindMustbe: '[贈品種類]為必填欄位!!',
            priceMustbe: "[單價]為必填欄位!!",
            amountMustbe: "[數量]為必填欄位!!",
            conversionNoMustbe: '[兌換卷號]為必填欄位!!',
            conversionDate: '[兌換日期]為必填欄位!!',
            dependTypeMustbe: "[依附種類]為必填欄位!!",
            bPCodeMustbe: "依附種類為[優惠組合], 故[優惠組合]為必填欄位!!",
            dependCodeMustbe: "依附種類為[促案], 故[促案]為必填欄位!!",
            noInData: "前端無任何資料傳入!",

            saveOk: "存檔完成!",
            saveError: "執行錯誤,錯誤原因: {0}!!"
        };
    });
};

//SO1148A1
if ($.fn.SO1148A1) {
    var SO1148A1 = (function () {
        this.language = {
            gbxWorkA: "舊資料",
            lblGiftNameA: "商贈品",
            lblPriceA: "單價",
            lblAmountA: "數量",
            lblSubTotalA: "小計",
            lblMakeA: "型號",
            gbxWorkB: "新資料",
            lblGiftNameB: "商贈品",
            lblPriceB: "單價",
            lblAmountB: "數量",
            lblSubTotalB: "小計",
            lblMakeB: "型號",
            lblChangeTime: "更換時間",

            btnSave: '存檔',
            btnExit: '離開',

            noDataByPresent: "前端未傳入Present資料",
            assignEdit: "請指定EditMode=1",
            noDataByAutoSerial: "傳入的AutoSerialNo為空白值!",
            noDataByCustID: "傳入的CustID為空白值!",
            giftNameMustbe: "[商贈品]為必填欄位!!",
            priceMustbe: "[單價]為必填欄位!!",
            amountMustbe: "[數量]為必填欄位!!",
            changeTimeMustbe: "[更換時間]為必填欄位!!",
            dataNotChange: "新舊資料一樣!",

            CancelFlag_Must:'已作廢資料不能進行更換!',

            saveOk: "存檔完成!",
            saveError: "執行錯誤,錯誤原因: {0}!!"
        };
    });
};

//SO1148A2
if ($.fn.SO1148A2) {
    var SO1148A2 = (function () {
        this.language = {
            ARTICLENAMEA: "原商贈品名稱",
            PRICEA: "原單價",
            AMOUNTA: "原數量",
            SUBTOTALA: "原小計",
            MAKEA: "原型號",
            ARTICLENAMEB: "新商贈品名稱",
            PRICEB: "新單價",
            AMOUNTB: "新數量",
            SUBTOTALB: "新小計",
            MAKEB: "新型號",
            CHANGETIME: "更換時間",
            UPDEN: "異動人員",
            NEWUPDTIME: "異動時間",

            btnExit: '離開'
        };
    });
};

//SO6770A
if ($.fn.SO6770A) {
    var SO6770A = (function () {
        this.language = {
            lblCompCode: "公司別:",
            lblOnSalesDate: "產品上架日:",
            lblDash: "至",

            CODENO: "優惠組合代碼",
            DESCRIPTION: "優惠組合名稱",
            ONSALESTARTDATE: "上架日(起)",
            ONSALESTOPDATE: "上架日(迄)",
            KINDFUNCTIONNAME: "計費機制",
            PRIORITY: "銷售優先順序",
            UPDTIME: "異動時間",
            UPDEN: "異動人員",
            STOPFLAG: "停用",

            btnFind: "尋找",
            btnClear: "清除",
            btnBPMaintain: "優惠組合",
            btnCopy: "跨區複製",
            //btnImportData: "批次匯入",
            //btnSO6770A1:"批次設定",
            btnSO6770A2: "產品組合",
            btnSO6770A3: "贈品",
            btnSO6770A4: "一次性費用",
            btnSO6770A5: "合約",
            btnSO6770A6: "違約金設定",
            btnSO6770A7: "違約金減免",
            btnSO6770A8: "批次匯入",
            btnEnd: "離開",

            //Code
            csmBPCode: "優惠組合",
            csmProduct: "產品組合",
            csmBundleMon: "綁約月數",
            chkStopFlag: "顯示停用",
            btnSO6770B_Titile: "優惠組合【SO6770B】",
            btnSO6770A1_Titile:"設備【SO6770A1】",
            btnSO6770A2_Titile: "產品組合【SO6770A2】",
            btnSO6770A3_Titile: "贈品【SO6770A3】",
            btnSO6770A4_Titile: "一次性費用【SO6770A4】",
            btnSO6770A5_Titile: "合約【SO6770A5】",
            btnSO6770A6_Titile: "違約金設定【SO6770A6】",
            btnSO6770A7_Titile: "違約金減免【SO6770A7】",
            btnSO6770A8_Titile: "批次匯入【SO6770A8】",
            btnCopy_Titile: "跨區複製",
            date_Error: "[上架起日]不可大於[上架迄日]!!",
            CellCustomizing_Yes: "是",
            CellCustomizing_No: "否",
            gridFootText: "第 {0} 筆 / 共 {1} 筆",
            Success_Download_Log: "成功!",
            Cancel_Download: "取消!",
            Error_Download: "下載出錯!"
        };
    });
};

//SO6770A1
if ($.fn.SO6770A1) {
    var SO6770A1 = (function () {
        this.language = {
            lblCodeNo: '代碼',
            lblDescription: '名稱',
            lblRefNo: '參考號',
            chkStopFlag: '停用',
            lblFaciCode: '設備代碼',
            lblModelCode: '型號代碼',
            csmInstCodeStr: '派工類別',
            lblWarranty: '保固月數',

            CODENO: '代碼',
            DESCRIPTION: '名稱',
            REFNO: '參考號',
            STOPFLAG: '停用',
            UPDTIME: '異動時間',
            UPDEN: '異動人員',
            FACICODE: '設備',
            MODELCODE: '型號',
            INSTCODESTR: '派工類別',
            WARRANTY: '保固月數',

            btnAdd: '新增',
            btnEdit: '修改',
            btnSave: '存檔',
            btnCopy: '跨區複製',
            btnExit: '離開',

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: "取消",
            exit: "離開",

            txtCodeNo: '[代碼]欄位為必填!',
            txtDescription: '[名稱]欄位為必填!',
            txtBundleMon: '[綁約月數]欄位為必填!',

            btnSyncDataToDB_Titile: "跨區複製--設備【SO6770A1】",
            CodeNo_Exists: '{0}：代碼已存在!',

            executeOk: "存檔完成!!",
            executeError: "執行錯誤,錯誤原因: {0}!!",
            CodeNo_Exists_CD135G5: '代碼已設定在優惠組合[{0}]，不允許修改!',
        };
    });
};

//SO6770A2
if ($.fn.SO6770A2) {
    var SO6770A2 = (function () {
        this.language = {
            btnOk: '確定',
            lblCodeNo: '代碼',
            lblDescription: '名稱',
            lblRefNo: '參考號',
            lblStopFlag: '停用',
            lbltabItem_A: '產品參數',
            lbltabItem_B: '收費參數',

            //grdCD135A
            CODENO: '代碼',
            DESCRIPTION: '名稱',
            REFNO: '參考號',
            STOPFLAG: '停用',
            UPDTIME: '異動時間',
            UPDEN: '異動人員',

            //grdCD135A1
            PRODUCTNAME: '產品',
            CITEMNAME: '收費項目',
            KINDFUNCTION_DESC: '計費機制',
            DEFCMBAUDNO_DESC: 'CM速率',
            PAYNOW: '現付制',
            LONGPAYFLAG: '長繳別',
            BUNDLECODE_DESC: '合約',

            //grdCD135A2
            PRODUCTNAMEa: '產品',
            CITEMCODE: '收費代碼',
            CITEMNAMEa: '收費項目',
            MONTHAMT: '單月金額',
            MAINPERIOD:'主推期數',
            EXPIRETYPE_DESC: '到期計價依據',
            CMBAUDNO_DESC: 'CM速率',
            FIXIPCOUNT: '固定IP',
            DYNIPCOUNT: '動態IP',

            CellCustomizing_Yes: "是",
            CellCustomizing_No: "否",
            yes: '是',
            no: '否',

            btnAdd: '新增',
            btnEdit: '修改',
            btnSave: '存檔',
            btnCopy: '跨區複製',
            btnCopyLocal: '本區複製',
            btnExit: '離開',
            btnViewItemProduct: '檢視',
            btnAddItemProduct: '新增',
            btnDeleteItemProduct: '刪除',
            btnEditItemProduct: '修改',
            btnViewItemCitem: '檢視',
            btnAddItemCitem: ' 新增',
            btnDeleteItemCitem: ' 刪除',
            btnEditItemCitem: ' 修改',
            btnExpandCitem: ' 擴大編輯畫面',

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: "取消",
            exit: "離開",
            winTitleA21: '產品參數 【SO6770A21】',
            winTitleA22: '收費參數 【SO6770A22】',
            DelAsk: "是否確定刪除此筆資料?",
            btnSyncDataToDB_Titile: "跨區複製--產品組合【SO6770A23】",
            btnSyncDataToDB_Local_Titile: '本區複製--產品組合【SO6770A24】',

            CodeNo_Mustbe: '[代碼]為必填欄位!',
            Description_Mustbe: '[名稱]為必填欄位!',
            Product_Mustbe: '[產品參數]必需先設定產品項目!',

            executeOk: "存檔完成!!",
            executeError: "執行錯誤,錯誤原因: {0}!!",
            CodeNo_Exists: '{0}：代碼已存在!',
            CodeNo_Exists_CD135G1: '代碼已設定在優惠組合[{0}]，不允許修改!',
            noData: '無資料',
            charge_Period_NG:'收費參數的[主推期數], 沒有一致!'
        }
    });
};

//SO6770A21
if ($.fn.SO6770A21) {
    var SO6770A21 = (function () {
        this.language = {
           btnSave: '存檔',
           btnExit:'離開',

           view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: '取消',

            lblProductCode: '產品名稱',
            lblCitemCode: '正項收費',
            lblCitemCode2: '負項收費',
            lblDefCMBaudNo: 'CM速率',
            lblKindFunction: '計費機制',
            lblBundleCode: '合約代碼',
            lblMonthAmt: '銷售價',
            lblDiscountAmt: '優惠價',
            //lblFreeMon: '免費月份',
            lblBPStopDate: '特定優惠截止日',
            chkPaynow: '現付制',
            chkLONGPAYFlag: '長繳別',
            chkPeriodFlag: '指定繳別出單',
            csmCD0124C: '不適用多品優惠',

            ProductCode: '[產品名稱]欄位為必填!',
            CitemCode: '[正項收費]欄位為必填!',
            CitemCode2: '[負項收費]欄位為必填!',
            Value_Error1: '[銷售價], 只允許輸入正項金額!',
            Value_Error2: '[優惠價], 只允許輸入正項金額!',
            txtMonthAmt_MustBe: '[銷售價]欄位為必填!',
            txtDiscountAmt_MustBe: '[優惠價]欄位為必填!',
            txtMonthAmt_ValueError: '[銷售價]欄位不能為負值!',
            txtDiscountAmt_ValueError: '[優惠價]欄位不能為負值!',
            CMCodeNotFind_Error: '本[收費項目]對應的[CM速率]不存在或已停用!'

        };
    });
};

//SO6770A22
if ($.fn.SO6770A22) {
    var SO6770A22 = (function () {
        this.language = {
           btnSave: '存檔',
           btnExit: '離開',
            btnAdd: '新增',
            btnDelete: '刪除',

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: '取消',

            gbxWorkTop: '收費參數',
            gbxWorkBottom: '階段式優惠參數',
            lblProductCode: '產品名稱',
            lblMainPeriod: '主推繳別',
            lblMonthAmt: '銷售單月金額',
            lblDayAmt: '單日金額',
            lblCitemCode: '收費項目',
            lblPFlagCode: '首期不足月項目',
            lblPFlag1: '破月期數(派工單)',
            lblCMBaudNo: 'CM速率',
            lblPFlag2: '破月期數(月費單)',
            lblFixIPCount: '固定IP數',
            lblExpireType: '到期計價依據',
            lblSalePointCode: '點數辦法',
            lblAuthTunerCount: '授權Tuner數',

            lblStepNo: '多階方案說明',
            lblPeriod: '繳別',
            lblMasterSale: '主推',
            lblStopFlag_A3: '停用',

            LEVELITEM: '項次',
            MON: '使用月數',
            MON1: '期間',
            PERIOD: '繳費期數',
            DISCOUNTRATE: '折扣率',
            DISCOUNTAMT: '優惠金額',
            MONTHAMT: '單月金額',
            DAYAMT: '單日金額',

            StepName: '方案',
            winTitleA23: '展開 【SO6770A23】',

            ProductCode_Mustbe: '[產品名稱]欄位為必填!',
            CitemCode_Mustbe: '[收費項目]欄位為必填!',
            ExpireType_Mustbe: '[到期計價依據]欄位為必填!',
            Description_Period_Mustbe: '[多繳別方案說明] 及 [期數] 欄位為必填!',
            CMBaudNo_Mustbe: '[固定IP數] 或 [動態IP數] 欄位為必填!',
            MasterSale_Mustbe: '請指定一個[主推多階] 項目!',
            MasterSale_ResultCount: '只能指定一個[主推多階] 項目!',
            No_LevelData: '沒有可供回填的多階資料! 請再次檢查設定!',
            TabisLast_Mustbe: '必須是最後一個頁籤才能刪除!',
            CD135A4_NoData: '方案基本資料不完整!',
            MainPeriod_Map_Mustbe: '[主推繳別] 無對應的 [方案]!'
        };
    });
};

//SO6770A23
if ($.fn.SO6770A23) {
    var SO6770A23 = (function () {
        this.language = {
            btnOk: '確定',
            btnCancel: '取消',

            lblExpand: '展開數',
            chkEqualPeriod: '使用月數同繳費期數',

            Period_Mustbe:'[展開數]為必填欄位!'
        };
    });
};


//SO6770A3
if ($.fn.SO6770A3) {
    var SO6770A3 = (function () {
        this.language = {
            lblCodeNo: '代碼',
            lblDescription: '名稱',
            lblRefNo: '參考號',
            lblStopFlag: '停用',
            lbltabItem_A: '商贈品設定',

            //grdCD135F
            CODENO: '代碼',
            DESCRIPTION: '名稱',
            REFNO: '參考號',
            STOPFLAG: '停用',
            UPDTIME: '異動時間',
            UPDEN: '異動人員',

            //grdCD135F1
            PRESENTCODE:'贈品代碼',
            ARTICLENAME:'贈品名稱',
            GIFTOPTION_DESC: '贈送方式',
            GIFTKIND_DESC: '種類',
            SELECTTYPE_DESC: '選贈模式',
            PENALCODE_DESC: '違約金',

            CellCustomizing_Yes: "是",
            CellCustomizing_No: "否",
            Tips: "提示",

            btnSave: '存檔',
            btnAdd: '新增',
            btnEdit: '修改',
            btnCopy: '跨區複製',
            btnExit: '離開',
            btnViewItem: '檢視',
            btnAddItem: '新增',
            btnDeleteItem: '刪除',
            btnEditItem: '修改',

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: "取消",
            exit: "離開",
            
            codeNo_Mustbe:'[代碼]欄位為必填!',

            winTitleA31: '贈品參數設定 【SO6770A31】',
            DelAsk: "是否確定刪除此筆資料?",
            btnSyncDataToDB_Titile: "跨區複製--商贈品【SO6770A3】",

            executeOk: "存檔完成!!",
            executeError: "執行錯誤,錯誤原因: {0}!!",
            CodeNo_Exists: '{0}：代碼已存在!',
            CodeNo_Exists_CD135G4: '代碼已設定在優惠組合[{0}]，不允許修改!',
        }
    });
};

//SO6770A31
if ($.fn.SO6770A31) {
    var SO6770A31 = (function () {
        this.language = {
            gbxGiftOptionLeft: '贈品設定',
            gbxGiftOptionRight: '贈品種類',
            gbxGiftOptionBottom: '商贈品明細',

            radGiftOptionA: '無條件',
            radGiftOptionB: '依附產品',
            radGiftOptionC: '依金額',
            radGiftKindA: '贈品',
            radGiftKindB: '加值購',

            csmProductCode: '產品',
            csmCMBaudNo: '適用速率',
            lblSelectType: '選贈模式',
            lblPenalCode: '違約代碼',

            btnSave: '存檔',
            btnExit: '離開',
            btnAddItem: '新增',
            btnDeleteItem: '刪除',
            btnEditItem: '修改',

            ARTICLENO_DESC: '商贈品',
            PRIORITY: '優先順序',
            ADDPRICE: '加購金額',
            CITEMCODE_DESC: '正項費用',
            DISCITEMCODE_DESC: '負項費用',
            QUANTITY: '限制量',
            USEQTY: '已使用量',
            WORKCODE: '派工類別',

            CellCustomizing_Yes: "是",
            CellCustomizing_No: "否",

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: "取消",
            exit: "離開",

            winTitleA32: '贈品明細設定 【SO6770A32】',
            DelAsk: "是否確定刪除此筆資料?",

            DataError: '[贈送條件]欄位值為不可空值!',
            ProductCode_Mustbe: '當贈送方式為[依附產品]時, [產品]欄位為必填!',
            OrderPrice1_doNot_GT_OrderPrice2: '[金額1]不可大於[金額2]!',
            OrderPrice_Mustbe: '贈送方式為[金額]時, [金額]欄位為必填!")',
            SelectType_Mustbe: '[選贈模式]欄位為必填!',
            noSave_Quit: '是否未存檔就離開?',
            ProMinCount_doNot_GT_ProMaxCount: '[產品最小值]不可大於[產品最大值]!',
            ProXCount_Mustbe: '當贈送方式為[依附產品]時, [產品任選]欄位為必填!")',
            ProMinCount_doNot_0: '[產品最小值]不能為0 !',
            ProductCodeCount_ProMaxCount: '[產品最大值]只能小於等於選取的產品數!',
        }
    });
};

//SO6770A32
if ($.fn.SO6770A32) {
    var SO6770A32 = (function () {
       this.language = {
            gbxAddValue: '加值購',

            lblGiftKind: '贈品種類',
            lblWorkCode: '派工代碼',
            lblArticleNo: '商贈品',
            lblCitemCode: '正項費用',
            lblCitemCode2: '負項費用',
            lblQuantity: '限制數量',
            lblAddPrice: '加購金額',
            lblUseQty: '已使用量',
            lblPriority: '銷售順序',
            
            btnSave: '存檔',
            btnCancel: '取消',

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: "取消",
            exit: "離開",

            GiftKind_Must: '[贈品種類]欄位為必填!',
            ArticleNo_Must: '[商贈品]欄位為必填!',
            Quantity_Must: '[限制數量]欄位值需大於等於0',
            UseQty_Must: '[已使用量]欄位值需大於等於0"',
            AddPrice_Must: '[加購金額]欄位值需大於等於0',
            CitemCode_Must: '[正項費用] 欄位為必填!'
        };
    });
};

//SO6770A4
if ($.fn.SO6770A4) {
    var SO6770A4 = (function () {
        this.language = {
            executeOk: '存檔完成!!',
            executeError: '執行錯誤,錯誤原因: {0}!!',

            btnAdd: '新增',
            btnEdit: '修改',
            btnSave: '存檔',
            btnCopy: '跨區複製',
            btnExit: '離開',

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: "取消",
            exit: "離開",

            lblCodeNo: '代碼',
            lblDescription: '名稱',
            lblRefNo: '參考號',
            chkStopFlag: '停用',
            lblCitemCode: '收費項目',
            csmInstCodeStr: '派工類別 ',
            lblAmount: '銷售牌價',
            lblPenalCode: '違約金代碼',
            lblDiscountAmt: '優惠金額',
            lblPenalType: '違約計價依據',
            cslMainCitemCode: '正項收費',
            csmProductCodeStr: '產品',
            lblMainCitemCode: '正項收費',

            CODENO: '代碼',
            DESCRIPTION: '名稱',
            CITEMCODE_DESC: '收費項目',
            AMOUNT: '銷售牌價',
            DISCOUNTAMT: '優惠金額',
            //INSTCODESTR_DESC: '派工類別',
            PENALCODE_DESC: '違約金代碼',
            PENALTYPE_DESC: '違約時之計價依據',
            REFNO: '參考號',
            STOPFLAG: '停用',
            UPDTIME: '異動時間',
            UPDEN: '異動人員',
          
            CellCustomizing_Yes: "是",
            CellCustomizing_No: "否",

            CodeNo_Mustbe: '[代碼]欄位為必填!',
            Description_Mustbe: '[名稱]欄位為必填!',
            CitemCode_Mustbe: '[收費項目]欄位為必填!',

            btnSyncDataToDB_Titile: "跨區複製--非產品費用【SO6770A4】",
            CodeNo_Exists: '{0}：代碼已存在!',
            Product_None: '產品任選=0, 不可選取產品!',
            Product_Count_NG: '產品任選值, 要介於【{0}～{1}】之間!',
            txtFaciMin_Max: '設備台數 【最小值】 不可大於 【最大值】!',
            txtProMin_Max: '產品台數 【最小值】 不可大於 【最大值】!',
            csmInstCodeStr_Mustbe: '【派工類別】為必填!',
            resultCD019_Null: '收費項目【{0}】, 不存在或已停用! 【派工類別】將顯示全部的【服務別】項目!',

            gbxMainCitemCode: '符合條件',
            lblProMinCount: '產品任選',
            lblFaciMinCount: '設備台數',
            lblFaciMaxCount: '-',
            lblProMaxCount:'-',

            CodeNo_Exists_CD135G3: '代碼已設定在優惠組合[{0}]，不允許修改!',
        };
    });
};

//SO6770A5
if ($.fn.SO6770A5) {
    var SO6770A5 = (function () {
        this.language = {
            executeOk: '存檔完成!!',
            executeError: '執行錯誤,錯誤原因: {0}!!',

            btnAdd: '新增',
            btnEdit: '修改',
            btnSave: '存檔',
            btnCopy: '跨區複製',
            btnExit: '離開',

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: "取消",
            exit: "離開",

            lblCodeNo: '代碼',
            lblDescription: '名稱',
            lblBundleMon: '綁約月數',
            chkStopFlag: '停用',
            lblPenalType: '違約計價依據',
            lblRefNo: '參考號',
            lblchkPenalCode: '違約代碼',
            lblDisPenalCode: '違約減免代碼',

            CODENO: '代碼',
            DESCRIPTION: '名稱',
            BUNDLEMON: '綁約月數',
            PENALTYPE_DESC: '違約計價依據',
            PENALCODE_DESC: '違約名稱',
            DISPENALCODE_DESC: '違約減免代碼',
            REFNO: '參考號',
            STOPFLAG: '停用',
            UPDTIME: '異動時間',
            UPDEN: '異動人員',

            CellCustomizing_Yes: "是",
            CellCustomizing_No: "否",

            txtCodeNo: '[代碼]欄位為必填!',
            txtDescription: '[名稱]欄位為必填!',
            txtBundleMon: '[綁約月數]欄位為必填!',

            btnSyncDataToDB_Titile: "跨區複製--合約【SO6770A5】",
            CodeNo_Exists: '{0}：代碼已存在!',
            CodeNo_Exists_BundleCode: '代碼已設定在產品組合[{0}]，不允許修改!',
        };
    });
};

//SO6770A6
if ($.fn.SO6770A6) {
    var SO6770A6 = (function () {
        this.language = {
            gbxPenalCodeBottom: '階段式違約參數',

            executeOk: '存檔完成!!',
            executeError: '執行錯誤,錯誤原因: {0}!!',

            btnAdd: '新增',
            btnEdit: '修改',
            btnSave: '存檔',
            btnCopy: '跨區複製',
            btnExit: '離開',

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: "取消",
            exit: "離開",

            lblCodeNo: '代碼',
            lblDescription: '名稱',
            lblRefNo: '參考號',
            chkStopFlag: '停用',
            chkIsProduct: '產品類',
            btnMonthExtend: '展開 >',

            //C
            CODENO: '代碼',
            DESCRIPTION: '名稱',
            //MONTHAMT: '總金額',
            REFNO: '參考號',
            STOPFLAG: '停用',
            UPDTIME: '異動時間',
            UPDEN: '異動人員',
            //C2
            ITEM: '項次',
            MONTHSTART: '月數(起)',
            MONTHSTOP: '月數(訖)',
            MONTHAMT: '總金額',
            DECREASEAMT: '按月遞減',
            //C1
            PENALMON: '未滿月數',
            PENALAMT: '違約金額',

            CellCustomizing_Yes: "是",
            CellCustomizing_No: "否",
            Tips: "提示",

            MonthStop_GT_MonthStart: '合約月數(迄)不可小於合約月數(起)',
            MonthAmt_GT_DecreaseAmt: '綁約總金額不可小於按月遞減金額',
            Month_Must_continue: '合約月數(起)必須連續，且不可與上筆合約月數(迄)重疉',
            NoData: '尚未指定階段達約金條件!',
            ISPRODUCT: '非產品類 時,收費項目為必填欄位!',
            txtCodeNo: '[代碼]欄位為必填!',
            txtDescription: '[名稱]欄位為必填!',
            cslDisCitemCode: '減免收費項目為必填欄位',

            btnSyncDataToDB_Titile: "跨區複製--違約金設定【SO6770A6】",
            CodeNo_Exists:'{0}：代碼已存在!',
            FieldValue_Mustbe_4: '違約金參數欄位不完整! 自動展開失效!',
            CodeNo_Exists_CD135G6: '代碼已設定在優惠組合[{0}]，不允許修改!',
        };
    });
};
     
//SO6770A7
if ($.fn.SO6770A7) {
    var SO6770A7 = (function () {
        this.language = {
            lblCodeNo: '代碼',
            lblDescription: '名稱',
            lblDisCitemCode: '減免收費',
            lblRefNo: '參考號',
            lblStopFlag: '停用',
            lbltabItem_A: '減免明細',

            //grdCD135D
            CODENO: '代碼',
            DESCRIPTION: '名稱',
            REFNO: '參考號',
            DISCITEMCODE_DESC: '收費項目',
            STOPFLAG: '停用',
            UPDTIME: '異動時間',
            UPDEN: '異動人員',

            //grdCD135D1
            PERCENT1: '減免範圍',
            MAXDISPERCENT: '百分比',
            MAXDISAMT: '固定金額',

            yes: '是',
            no: '否',
            CellCustomizing_Yes: "是",
            CellCustomizing_No: "否",
            Tips: "提示",

            btnSave: '存檔',
            btnAdd: '新增',
            btnEdit: '修改',
            btnCopy: '跨區複製',
            btnExit: '離開',
            btnAddItem: '新增',
            btnDeleteItem: '刪除',
            btnEditItem: '修改',

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: "取消",
            exit: "離開",

            winTitleA71: '減免明細參數 【SO6770A71】',
            DelAsk: "是否確定刪除此筆資料?",
            btnSyncDataToDB_Titile: "跨區複製--違約金減免【SO6770A7】",

            executeOk: "存檔完成!!",
            executeError: "執行錯誤,錯誤原因: {0}!!",
            CodeNo_Exists: '{0}：代碼已存在!'
        }
    });
};

//SO6770A71
if ($.fn.SO6770A71) {
    var SO6770A71 = (function () {
        this.language = {
            lblPercent: '可減免範圍',
            gbxDisPenalCodeBottom: '減免上限參數',
            radMaxDisPercent: '限百分比',
            radMaxDisAmt: '固定金額',

            btnSave: '存檔',
            btnCancel: '取消',

            view: "顯示",
            edit: "修改",
            addNew: "新增",

            Percent_Mustbe: '[百分比]欄位為必填!',
            Percent_Mustbe_GT_0: '[百分比]欄位值需大於0',
            MaxDisPercent_Mustbe: '[百分比減免上限]欄位為必填!',
            MaxDisPercent_Between_Percent12: '[百分比減免上限]欄位值需介於 [減免上/下限]之間!',
            MaxDisAmt_Mustbe: '[固定金額減免上限]欄位為必填!',
            MaxDisAmt_GT_999: '[固定金額減免上限] 不可超過3位數!'
        }
    });
};

//SO6770A8
if ($.fn.SO6770A8) {
    var SO6770A8 = (function () {
        this.language = {
            lblFilePath: '匯入資料檔',
            btnOk: '確定',
            btnCancel: '取消',
            File_Mustbe: '請指定檔案!',
           
            executeOk: "批次匯入成功!!",
            executeError: "執行錯誤,錯誤原因: {0}!!"
        };
    });
};

//SO6770A9
if ($.fn.SO6770A9) {
    var SO6770A9 = (function () {
        this.language = {
            csmCompCode: '公司別',
            btnOk: '確定',
            btnCancel: '取消',

            comp_Mustbe:'必須指定公司別!',
            executeOk: "執行完畢!!",
            executeError: "執行錯誤,錯誤原因: {0}!!"
        };
    });
};

//SO6770B
if ($.fn.SO6770B) {
    var SO6770B = (function () {
        this.language = {
           winTitle_append: '優惠組合 新增【SO6770B1】',
           winTitle_edit: '優惠組合 修改【SO6770B1】',
            btnSyncDataToDB_Titile: "跨區複製--優惠組合【SO6770B】",
            btnSO6770A8_Titile: "批次匯入【SO6770A8】",
            gbxWorkA: '優惠組合',
            lblDependCode: '促銷方案',
            lblBPCode: '優惠組合',
            lblImportData: '匯入優組',

            btnQuery:'查詢',
            btnAdd:'新增',
            btnEdit:'修改',
            btnDelete: '單一清除',
            btnReset: '畫面清除',
            btnImportData: "批次匯入",
            btnSave: '批次存檔',
            btnExit:'離開',

            btnQuery_A:'產品組合',
            btnQuery_B:'一次性費用',
            btnQuery_C:'商贈品',
            btnQuery_D:'排它優組',
            btnQuery_E: '設備',
            btnQuery_F: '違約金',
            lbltabItem_A: '產品組合',
            lbltabItem_B: '一次性費用',
            lbltabItem_C: '商贈品',
            lbltabItem_D: '排它優組',
            lbltabItem_E: '設備',
            lbltabItem_F: '違約金',
            tipstabItem_A: '產品組合->',
            tipstabItem_B: '一次性費用->',
            tipstabItem_C: '商贈品->',
            tipstabItem_D: '排它優組->',
            tipstabItem_E: '設備->',
            tipstabItem_F: '違約金->',
            csmBPCode:'優惠組合',
            csmBPCodeG1:'產品組合',
            csmBPCodeG2:'排它優組',
            csmBPCodeG3:'一次性費用',
            csmBPCodeG4: '商贈品',
            csmBPCodeG5: '設備',
            csmBPCodeG6: '違約金',
            csmBPCodeG6A: '產品/速率',

            grdCD135_CODENO:'優惠組合代碼',
            grdCD135_DESCRIPTION:'優惠組合名稱',
            BPCode: '優惠組合↓',

            NoBPCodeStr:'本促案代碼尚未設定過優惠組合資料!',
            NoBPCodeData:'本促案代碼設定的優惠組合字串, 對應不到優惠組合的設定資料!',
            NoData_By_BPCode:'集合中沒有對應的BPCode資料!',
            Delete_yesno:'您確定要剔除本筆記錄??',
            btnFitWidth_A1:'最適欄寬',
            btnFitWidth_B1:'最適欄寬',
            btnFitWidth_C1:'最適欄寬',
            btnFitWidth_D1: '最適欄寬',
            btnFitWidth_E1: '最適欄寬',
            btnFitWidth_F1: '最適欄寬',
            executeOk:"存檔完成!!",
            executeError: "執行錯誤,錯誤原因: {0}!!",
            fileError: "檔案上傳失敗,失敗原因:{0}",
            Have_ProGroupCode_Need:'需先設定產品組合!',
            noProductData: '無產品資料可供設定!',
            ProductCodeExists_By_ProGroupCode: '[產品組合代碼:{0} 名稱:{1}]之產品:[{2}]重覆，不允許設定!{3}',
            NoData_CD135A1_ChooseProGroupCode: 'CD135A1中沒有對應的資料!',
            Product_NoData: '未選取任何產品!'
        };
    });
};

//SO6770B1
if ($.fn.SO6770B1) {
    var SO6770B1 = (function () {
        this.language = {
            winTitle: '優惠組合 資料維護【SO6770B1】',
            winTitleA22: '收費參數 【SO6770A22】',
            winTitleA4: '一次性費用 【SO6770A4】',
            winTitleB3: '新增違約金【SO6770B3】',
            winTitleA6: '階段式違約參數【SO6770A6】',
            lblBPCode: '代碼',
            lblBPName: '名稱',
            lblRefNo: '參考號',
            lblOnSalesDate: '上架期間',
            chkStopFlag: '停用',
            chkPenal: '違約計算一致',
            lblDash: "至",
            lblCanStopTime: '可暫停次數',
            lblCanStopDay: '可暫停天數',
            lblCanUseType: '適用平台',
            lblEPGOrd:'EPG順序',
            chkLessAmtCantCProm: 'I服務單月金額變小, 不可促變(合約內)',
            chkSyncClose: '連動結清',
            Type_Any: '不分',

            lbltabItem_A2: '產品組合',
            lbltabItem_F2: '違約金',
            lbltabItem_B2: '一次性費用',
            lbltabItem_C2: '商贈品',
            lbltabItem_D2: '設備',
            lbltabItem_E2: '排它優組',

            lbltabItem_A: '話術說明',
            lbltabItem_B: '合約說明',
            lbltabItem_C: '檢附條件',
            lbltabItem_D: '工單列印說明',

            btnConditional: "檢附條件",
            btnSave: "存檔",
            btnCancel: "取消",
            btnAddNewG1: '新增',
            btnAddNewG6: '新增',
            btnAddNewG3: '新增',
            btnAddNewG4: '新增',
            btnAddNewG5: '新增',
            btnAddNewG2: '新增',
            btnDeleteG1: '刪除',
            btnDeleteG6: '刪除',
            btnDeleteG3: '刪除',
            btnDeleteG4: '刪除',
            btnDeleteG5: '刪除',
            btnDeleteG2: '刪除',
            btnEditG6: '修改',

            csmBPCodeG1: '產品組合',
            csmBPCodeG3: '一次性費用',
            csmBPCodeG4: '商贈品',
            csmBPCodeG5: '設備',
            csmBPCodeG2: '排它優組',

            append: "新增",
            edit: "修改",
            view: "顯示",

            SELECTED:'刪除',
            PROGROUPCODE: '代碼',
            PROGROUPCODE_DESC: '名稱',

            tipstabItem_F: '違約金->',
            CitemCode: '產品及速率↓',

            SELECTEDa: '刪除',
            PENALCODE: '違約金代碼',
            DESCRIPTION: '違約金名稱',
            PRODUCTCODESTR: '產品',
            CMBAUDNOSTR: 'CM速率',

            NOTPERIODCITEMCODE: '代碼',
            NOTPERIODCITEMCODE_DESC: '名稱',

            PRESENTCODE: '代碼',
            PRESENTCODE_DESC: '名稱',
            PENALCODE_DESC: '違約金',

            PREFACI: '代碼',
            PREFACI_DESC: '名稱',

            REJECTBPCODE: '代碼',
            REJECTBPCODE_DESC: '名稱',
            
            PRODUCTCODE_DESC: '產品名稱',
            CITEMCODE: '收費項目',
            CITEMCODE_DESC: '收費項目名稱',
            MONTHAMT: '單月金額',
            MAINPERIOD: '主推期數',
            KINDFUNCTION_DESC: '計費機制',
            CMBAUDNO_DESC: '速率',
            BUNDLEFLAG: '合約',
            LONGPAYFLAG: '長繳別',
            PAYNOW: '現付制',

            AMOUNT: '銷售價',
            DISCOUNTAMT: '優惠價',
            PENALTYPE_DESC: '違約價依據',
            INSTCODESTR_DESC: '派工類別',

            GIFTOPTION_DESC: '贈送方式',
            GIFTKIND_DESC: '贈品種類',
            SELECTTYPE_DESC: '選贈模式',
            ARTICLENO: '商贈品代碼',
            ARTICLENAME: '商贈品名稱',

            FACICODE: '設備名稱',
            MODELCODE: '型號',

            PRODUCTCODESTR_DESC:'產品',
            CMBAUDNOSTR_DESC: 'CM速率',

            codeNoMustbe: '[代碼]欄位為必填!',
            descriptionMustbe: '[代碼]欄位為必填!',
            OnSalesDateMustbe: '[上架起日] 及 [下架迄日]為必填欄位!',
            OnSalesDateCheck: '[上架起日]不可大於等於[下架迄日]!!',
            codeNoExists: '代碼:[{0}]已存在!',
            NoPriv111: '沒有新增[EPG]的權限!',
            NoPriv121: '沒有修改[EPG]的權限!',
            wordTooLong: '輸入的字串, 超過最長為10的限制!',
            Have_ProGroupCode_Need:'需先設定產品組合!',

            executeOk: "存檔成功!!",
            executeError: "執行錯誤,錯誤原因: {0}!!",
            ProductCodeExists_By_ProGroupCode: '產品重覆[產品組合代碼:{0} 名稱:{1}]，不允許設定!{2}',
            NoData_CD135A1_ChooseProGroupCode: 'CD135A1中沒有對應的資料!'
        };
    });
};

//SyncDataToDB
if ($.fn.SyncDataToDB) {
    var SyncDataToDB = (function () {
        this.language = {
            csmCodeNo: '代碼',
            csmCompCode: '公司別',
            gbxCopyTop: '複製選項',
            lblCodeNoExists: '跨區代碼已存在時',
            radDel: '刪除後重新覆蓋',
            radNotDel: '不覆蓋',

            btnOk: '確定',
            btnExit: '離開',

            CodeNo_Mustbe: '[代碼]欄位不可為空白!',
            CompCode_Mustbe: '[公司別]欄位不可為空白!',
            Check_Parameter_Pair_1: '參數:[Code_FieldList]內容為[CodeNo,Descripion]!',
            Check_Parameter_Pair_2: '參數:[Code_FieldList + Code_TableNameList]為必要參數!',
            Check_Parameter_Pair_3: '參數:[Copy_Option]為必要參數!',
        }
    });
};

//SO1300B
if ($.fn.SO1300B) {
    var SO1300B = (function () {
        this.language = {
            lblMduID : '大樓編號',
            lblMduName: '大樓名稱',
            lblComp: '公司別',
            lblFlag: '狀態',
            txtFlag: '正常',
            lblDevEn: '開發人員',
            lblPipelineCode: '管線類別',
            lblEngAmt: '工程費用',
            lblClassCode: '客戶類別',

            lbltabItem_A: 'A.基本資料',
            lblContName123: '聯絡人1/2/3',
            lblContPhone1: '聯絡電話(1)',
            lblContPhone2: '聯絡電話(2)',
            lblClctMethod: '收費方式',
            lblTotalCnt: '總戶數',
            lblImmigrateCnt: '遷入戶數',

            chkComputeCnt: '統收代表戶不算於正常戶中',

            lblAcceptCnt: '建檔戶數',
            lblPerInstCnt: '個收有效戶數',
            lblInstCnt: '統收有效戶數',
            lblInvalidCnt: '無效戶數',

            lblAcceptCnt1: '建檔戶數',
            lblPerInstCnt1: '個收有效戶數',
            lblInstCnt1: '統收有效戶數',
            lblInvalidCnt1: '無效戶數',

            lblAcceptCnt2: '建檔戶數',
            lblPerInstCnt2: '個收有效戶數',
            lblInstCnt2: '統收有效戶數',
            lblUnInstCnt2: '停拆/待拆戶數',

            lblAcceptCnt3: '建檔戶數',
            lblPerInstCnt3: '個收有效戶數',
            lblInstCnt3: '統收有效戶數',
            lblUnInstCnt3: '停拆/待拆戶數',

            gbxAllChargeInfo: '統收資料',

            lblMainCustId: '統收客編',
            lblMainCustName: '統收姓名',
            lblBCAmount: '基本台統收金額',
            lblBCPeriod: '基本台期數',
            lblNote: '備註',
            lblUpdTime: '異動時間',
            lblUpdEn: '異動人員',
            lblNotea: '備註',

            lbltabItem_B: 'B.合約資料',
            lblCStartDate: '合約期限',
            lblDash: '至',
            lblCSignDate: '簽約日',
            lblCSignEn: '簽約人員',
            lblBCAmount_B: '統收金額',
            lblBCPeriod_B: '統收期數',
            lblContractStatus: '合約狀況',
            lblContent: '合約內容',
            lblCTotalCountC: '合約總戶數',
            lblCContractCountC: '合約簽約戶數',
            lblCContractAmountC: '合約單月簽約金額',
            lblCTotalCountD: '合約總戶數',
            lblCContractCountD: '合約簽約戶數',
            lblCContractAmountD: '合約單月簽約金額',
            lblCTotalCountI: '合約總戶數',
            lblCContractCountI: '合約簽約戶數',
            lblCContractAmountI: '合約單月簽約金額',

            lbltabItem_C: 'C.涵蓋地址',
            lbltabItem_D: 'D.設備資料',

            lbltabItem_A2: 'CATV',
            lbltabItem_B2: 'CM',
            lbltabItem_C2: 'DTV',
            lbltabItem_D2: 'CP',

            lbltabItem_A3: 'CATV',
            lbltabItem_B3: 'CM',
            lbltabItem_C3: 'DTV',

            btnSave: '存檔',
            btnBatchOrder: '批次派工',
            btnExit: '離開',

            title_SO1300Q:'大樓整批派工【SO1300Q】',

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: "取消",
            exit: "離開",

            //Code
            NoInData: '前端無任何資料傳入',
            NoDataByBuilding: '前端未傳入Building資料',
            NoDataByMduID: '傳入的MDUID不可為空值!',
            adrMainAddrNo: '主要地址',
            adrContAddrNo: '聯絡地址',
            DeleteFault: '刪除失敗！',
            NoDataByMenuInfo: '條件==>{0}, 取不到功能表項目可供顯示!',
            isExpress: '用計算的????',

            MduIDMustbe: '[大樓編號]不可為空值!',
            MduNameMustbe: '[大樓名稱]不可為空值!',
            CompCodeMustbe: '[公司別]不可為空值!',
            MainAddressMustbe: '[主要地址]不可為空值!',
            ContAddressMustbe: '[聯絡地址]不可為空值!',
            ClctMethod: '[收費方式]不可為空值!',
            CustIDMustbe: '合約資料的[統收代表戶編號]不可為空值!',
            MduIDExist: '輸入的大樓編號[{0}]已存在!',
            SaveSuccess: '存檔成功!',
            NoDataByCustID: '查無此客編!',
            SO018_Data_Need: '[無有效大樓合約資料]',

            lblCMCStatusCode: '管委會狀態',
            lblContractSort: '合約類別',
            lblFeedback: '回饋方式',
            lblFeedbackAmt: '回饋金額',
            lblFeedbackPeriod: '回饋期數',
            executeError: "執行錯誤,錯誤原因: {0}!!",
            ClctMethod_Change: '收費方式改變!!您是否要直接調整收費資料!!',
            ClctMethod_Change_3: '收費方式改變!!需批次調整個收/統收收費資料'
        };
    });
};

//SO1300C
if ($.fn.SO1300C) {
    var SO1300C = (function () {
        this.language = {
            lblServiceType: '服務類別',
            tbNewCustom: '建檔客戶',
            tbNormalCustom: '有效客戶',
            tbPRCustom: '拆機/拆機中客戶',
            tbPromCustom: '註銷促銷中客戶',
            btnQuit: '關閉',

            NoInData: '前端無任何資料傳入',
            NoDataByBuilding: '前端未傳入Building資料'
        };
    });
};

//SO1300E
if ($.fn.SO1300E) {
    var SO1300E = (function () {
        this.language = {
            lblServiceType: '服務類別',
            lblOption: '選擇項目:',
            radCustClass: '更改客戶類別',
            radClcAttribute: '更新收費屬性',
            ccMduName: '大樓名稱',
            ccCustStatus: '客戶狀態',
            ccCustClass: '客戶類別',
            lblCustClass: '新客戶類別',
            lblClcAttribute: '新收費屬性',
            btnOK: '確定',
            btnCancel: '取消',

            NoInData: '前端無任何資料傳入',
            NoDataByBuilding: '前端未傳入Building資料',
            ServiceTypeMustbe: '[服務別]欄位必須有值!',
            MduNameMustbe: '[大樓名稱]不可為空值!',
            ClassCodeORCustClassMustbe: '[客戶狀態] 或 [客戶類別]欄位, 其中一項必須有值!',
            CustClassMustbe: '[新客戶類別]欄位必須有值!',
            ClctAttribMustbe: '[新收費屬性]欄位必須有值!',
            AdjectSuccess: '共計有{0}筆調整成功!'
        };
    });
};

//SO1300F
if ($.fn.SO1300F) {
    var SO1300F = (function () {
        this.language = {
            gbxContractInfo: '合約資料',
            lblSeqNo: '合約編號',
            lblCNO: '合約單號',
            lblContractSortCode: '合約類別',
            lblContent: '合約內容',
            lblMainCustId: '統收客編',
            lblMainCustName: '統收姓名',
            lblCStartDate: '合約期限:',
            lblDash: '至',
            lblBCPeriod: '統收期數',
            lblBCAmount: '統收金額',
            lblContractStatus: '合約狀態',
            lblFeedbackAmt: '回饋金額',
            lblFeedbackPeriod: '回饋期數',
            lblFeedbackCode: '回饋方式',
            lblCSignEn: '簽約人員',
            lblCSignDate: '簽約日',
            lblCExpiryDate: '合約終止日',
            lbltabItem_F1:'合約資料',
            lbltabItem_F2: '簽約產品',
            lblPromCode: '促銷方案',
            lblBPCode: '優惠組合',
            lblPeriod: '期數',
            lblProdtctAmt: '產品合計金額:',

            SEQNO: '合約編號',
            CNO: '合約單號',
            MAINCUSTNAME: '統收姓名',
            MAINCUSTID: '統收客編',
            BCPERIOD: '統收期數',
            BCAMOUNT: '統收金額',
            FEEDBACKAMT: '回饋金額',
            FEEDBACKPERIOD: '回饋期數',
            CSTARTDATE_DESC: '合約期限',
            CSIGNDATE: '簽約日',
            CEXPIRYDATE: '合約終止日',
            CONTRACTSORTCODE_DESC: '合約類別',
            CONTRACTSTATUS_DESC: '合約狀態',
            FEEDBACKCODE_DESC: '回饋方式',
            CSIGNNAME: '簽約人員',

            PRODUCTCODE: '產品代碼',
            PRODUCTNAME: '產品名稱',
            CMBAUDNO_DESC: '速率',
            CNT: '戶數',
            MONTHAMT: '單月$',
            MONTHSUM: '月合計',
            TOTALAMT: '總金額',

            lblBCAmount_B3: '統收金額',
            lblBCPeriod_B3: '期數',
            lblContractStatusa: '合約狀況',
            lblContenta: '合約內容',

            lblCTotalCountC: '合約總戶數',
            lblCContractCountC: '合約簽約戶數',
            lblCContractAmountC: '合約單月簽約金額',
            lblCTotalCountD: '合約總戶數',
            lblCContractCountD: '合約簽約戶數',
            lblCContractAmountD: '合約單月簽約金額',
            lblCTotalCountI: '合約總戶數',
            lblCContractCountI: '合約簽約戶數',
            lblCContractAmountI: '合約單月簽約金額',

            lbltabItem_A3: 'CATV',
            lbltabItem_B3: 'CM',
            lbltabItem_C3: 'DTV',
          
            btnSave: '存檔',
            btnAdd: '新增',
            btnEdit: '修改',
            btnExit: '離開',

            btnAddItem: '新增',
            btnEditItem: '修改',

            view: "顯示",
            edit: "修改",
            addNew: "新增",
            cancel: "取消",
            exit: "離開",

            //Code
            NoInData: '前端無任何資料傳入',
            NoDataByBuilding: '前端未傳入Building資料',
            NoDataByCont: '無預設合約內容!',
            txtCNO: '[合約單號]不可為空值!',
            dteCStartDate: '[合約起始日]不可為空值!',
            dteCDueDate: '[合約截止日]不可為空值!',
            dteCSignDate: '[簽約日]不可為空值!',
            cslContractStatus: '[合約狀態]不可為空值!',
            SaveSuccess: '存檔成功!',
            AutoserialNo: '自動編號',
            PK_isExist: '請確認合約簽約日與其他合約資料相同!',
            NotFound_CustName: '{0}：{1}，無該客編!',
            MainCustIDMustbe: '[統收客編]欄位不可為空值或不完整!',
           
        };
    });
};

//SO1300G
if ($.fn.SO1300G) {
    var SO1300G = (function () {
        this.language = {
            lblServiceType: '服務類別',
            lblOption: '選擇項目:',
            radCustClass: '更改客戶類別',
            radClcAttribute: '更新收費屬性',
            ccMduName: '大樓名稱',
            ccCustStatus: '客戶狀態',
            ccCustClass: '客戶類別',
            lblCustClass: '新客戶類別',
            lblClcAttribute: '新收費屬性',
            btnOK: '確定',
            btnCancel: '離開',

            NoInData: '前端無任何資料傳入',
            NoDataByBuilding: '前端未傳入Building資料',
            ServiceTypeMustbe: '[服務別]欄位必須有值!',
            MduNameMustbe: '[大樓名稱]不可為空值!',
            ClassCodeORCustClassMustbe: '[客戶狀態] 或 [客戶類別]欄位, 其中一項必須有值!',
            CustClassMustbe: '[新客戶類別]欄位必須有值!',
            ClctAttribMustbe: '[新收費屬性]欄位必須有值!',
            AdjectSuccess: '共計有{0}筆調整成功!'
        };
    });
};

//SO1300H
if ($.fn.SO1300H) {
    var SO1300H = (function () {
        this.language = {
            NoInData: '前端無任何資料傳入',
            NoDataByBuilding: '前端未傳入Building資料',
            NoDataByContent: '無 [預設合約內容] 資訊!',
            ContentMustbe: '[預設合約]欄位必須有值!',
            SaveSuccess: '存檔成功!',
            LoadSO038Fail: '無法載入SO038資料，請重新執行',
            btnOK: '確定',
            btnCancel: '取消'
        };
    });
};

//SO1300J
if ($.fn.SO1300J) {
    var SO1300J = (function () {
        this.language = {
            lblServiceType: '服務類別',
            lblAllChargeCustom: '統收戶資料',
            lblMainCustID: '統收客編',
            lblFlag: '客戶狀態',
            lblMainCustNotes: '註:統收戶之基本台設定將改為下列內容',
            lblCitemCode: '新收費項目',
            lblPeriod: '期數',
            lblAmount: '金額',
            lblStartDate: '起始日期',
            lblStopDate: '截止日期',
            lblClctDate: '次收日',
            lblDash: '至',
            lblOneChargeOpt: '個收戶選項',
            ccCustStatus: '客戶狀態',
            ccCustClass: '客戶類別',
            lblAdjCitemCode: '調整方式(將刪除下列項目, 若不設定則代表所有週期性收費)',
            ccCitemCode: '收費項目',
            chkOption1: 'A.拆機客戶出自動結案裝機單, 並轉為正常戶',
            lblFinTime: '完工時間',
            lblGroupCode: '工程組別',
            lblcsWorkEn1: '工程人員一',
            lblcsWorkEn2: '工程人員二',
            chkOption2: 'B.待拆客戶自動將拆機單退單, 並轉為正常戶',
            lblSignEn: '簽收人員',

            btnOK: '確定',
            btnCancel: '取消',

            NoInData: '前端無任何資料傳入',
            NoDataByConditionGrid: '前端未傳入ConditionGrid資料',
            FaciCancel: '停機',
            FaciPR: '拆機',
            FaciStop: '註銷',
            FaciProm: '促銷',
            FaciPR2: '拆機中',
            MainCustIDMustbe: '[統收客編]欄位不可為空值!',
            CitemCodeMustbe: '[新收費項目]欄位不可為空值!',
            PeriodMustbe: '[期數]欄位不可為空值!',
            AmountMustbe: '[金額]欄位不可為空值!',
            StartDateMustbe: '[起始日期]欄位不可為空值!',
            StopDateMustbe: '[截止日期]欄位不可為空值!',
            ClctDateMustbe: '[次收日]欄位不可為空值!',
            FinTimeMustbe: '有勾選了==>A.拆機客戶出自動結案裝機單, 並轉為正常戶. [完工時間]欄位不可為空值!',
            WorkEn1Mustbe: '有勾選了==>A.拆機客戶出自動結案裝機單, 並轉為正常戶. [工程人員一]欄位不可為空值!',
            SignEnAMustbe: '有勾選了==>A.拆機客戶出自動結案裝機單, 並轉為正常戶. [簽收人員]欄位不可為空值!',
            SignEnBMustbe: '有勾選了==>B.待拆客戶自動將拆機單退單, 並轉為正常戶. [簽收人員]欄位不可為空值!',
            AdjectSuccess : '調整完成!',
            DataIsNothing: '回傳值為空值!',

            NoDataByContent: '無 [預設合約內容] 資訊!',
            ContentMustbe: '[預設合約]欄位必須有值!',
            SaveSuccess: '存檔成功!',
            NotFound_CustName: '{0}：{1}，無該客編!',
            errorCode_2: '裝機類別代碼無參考號5(拆機復機)',
            errorCode_3: '停拆移機類別代碼無參考號2(拆機)或5(未繳費拆機)',
            errorCode_4: '退單原因代碼無參考號2(資料註銷)',
            errorCode_8: '週期收費資料取值有誤,請檢查是否有建立Sequence(序列)',

            errorCode_99_cd035: '客戶狀態代碼找不到代碼=',
            errorCode_99_cd035B: '(正常)',
            errorCode_99_so001: '客戶相關基本資料不存在',
            errorCode_99_so014: '地址資料找不到地址編號=',
            errorCode_99_so009: '停拆移機資料找不到客編=',
            errorCode_99_updateso009: '更新停拆移機資料錯誤',
            errorCode_99_so001_CompCode: '客戶資料的公司別不存在!客編=',
            errorCode_99_so001_CustName: '客戶資料的客戶姓名不存在! 客編='
        };
    });
};

//SO1300K
if ($.fn.SO1300K) {
    var SO1300K = (function () {
        this.language = {
            lblServiceType: '服務類別',
            lblAllChargeInfo: '統收戶資料',
            lblMainCustID: '統收客編',
            lblFlag: '客戶狀態',
            lblAdjectCitem: '原週期性收費項目(此戶將被調整成個收戶一樣之項目)',
            lblAdjectCitem2: '原週期性收費項目(此戶將被調整成個收戶一樣之項目)',
            gbOneCustomOPT: '個收戶選項',
            lblCitemCode1: '收費項目',
            lblPeriod1: '期數',
            lblAmount1: '金額',
            lblStartDate1: '起始日期',
            lblStopDate1: '截止日期',
            lblClctDate1: '次收日',
            lblDash: '至',
            lblDash2: '至',
            lblDash3: '至',
            lblDash4: '至',

            btnOK: '確定',
            btnCancel: '取消',
            ccCustStatus: '客戶狀態',
            ccCustClass: '客戶類別',

            NoInData: '前端無任何資料傳入',
            NoDataByConditionGrid: '前端未傳入ConditionGrid資料',
            FaciCancel: '停機',
            FaciPR: '拆機',
            FaciStop: '註銷',
            FaciProm: '促銷',
            FaciPR2: '拆機中',
            CitemCodeMustbe: '請至少設定一組收費項目',
            DoCitemCodeMustbe: '與該收費項目同組的欄位, 皆為必要欄位!',
            AdjectSuccess: '調整完成!',
            DataIsNothing: '回傳值為空值!',
            SO1300K_Loaded_1: '[統收客編]不可為空值!',
            SO1300K_Loaded_2: '此大樓沒有統收戶資料!'
        };
    });
};

//SO1300N
if ($.fn.SO1300N) {
    var SO1300N = (function () {
        this.language = {
            lblServiceType: '服務類別',
            lblCondition: '選取條件',
            ccMduName: '大樓名稱',
            ccCustStatus: '客戶狀態',
            ccCustClass: '客戶類別',
            ccCitemCode: '收費項目',
            chkMainCanAppend: '統收子戶如無該週期性項目是否自動新增',
            btnOK: '確定',
            btnCancel: '取消',

            NoInData: '前端無任何資料傳入',
            NoDataByBuilding: '前端未傳入Building資料',
            ServiceTypeMustbe: '[服務別]欄位必須有值!',
            MduNameMustbe: '[大樓名稱]欄位必須有值!',
            CitemCodeMustbe: '[收費項目]欄位必須有值!',
            AdjectSuccess: '共計有{0}筆調整成功!'
        };
    });
};

//DTV配對SO1620D
if ($.fn.SO1620D) {
    var SO1620D = (function () {
        this.language = {
            lOperatorLAB: '操作模式',

            lOperator1: '新品開機開頻道',
            lOperator2: '新品開機配對',
            lOperator3: '舊品開機配對',
            lOperator4: '舊品回收測試',

            lOperatorDesc1: '開機->開頻道->開試看頻道',
            lOperatorDesc2: '開機->開試看頻道',
            lOperatorDesc3: '開機->開試看頻道->取消所有頻道->開試看頻道',
            lOperatorDesc4: '開機->開試看頻道->取消所有頻道',

            lOpenFaci: '開機',
            lOpenChannel: '開頻道',
            lOpenTrialChannel: '開試看頻道',
            lCloseAllChannel: '取消所有頻道',

            lSTBNO: '機上盒序號',
            chkAutoPair: '使用配對檔',
            lSmartCardNo: '智慧卡序號',

            lProductType: '產品類型',
            cmCitemCode: '產品項目',
            cmChannelCode: '試看頻道',

            lZipCode: 'Zip Code',
            lBATID: 'BAT區碼',
            lStopDate: '收視截止日',

            lAddDays: '工作緩衝日',
            lLoadFile: '匯入資料檔',
            lblNote1: '開試看頻道有選, 表示會送試看頻道 預設天數+工作緩衝日, 為試看截止日',
            chkvUAGo: '使用智慧卡(vUA)立即燒機配對',

            gData_STBNO: '機上盒序號',
            gData_ICCNO: '智慧卡序號',
            gData_OPENSTATUS: '開機',
            gData_CHANNELSTATUS: '開頻道',
            gData_TMPCHANNELSTATUS: '開試看頻道',
            gData_CLOSECHANNELSTATUS: '取消所有頻道',
            gData_TMPCHANNELSTATUS2: '開試看頻道',
            gData_OPENERROR: '開機訊息',
            gData_OPENCHANNELERROR: '開頻道訊息',
            gData_OPENTMPCHANNELERROR: '開試看頻道訊息',
            gData_CLOSECHANNELERROR: '取消所有頻道訊息',
            gData_OPENTMPCHANNELERROR2: '開試看頻道訊息',

            lMemo: '格式說明:csv格式,無抬頭,欄位為機上盒序號,智慧卡序號',

            statusFinish: '完成',
            statusError: '錯誤',
            statusNever: '未執行',
            statusProcess: '處理中',

            noData: '無資料!!',
            btnClear: '清除',
            btnOk: '確定',
            btnExit: '離開',
            channelStr_Mustbe: '頻道必須有值!',
            fileError : "檔案上傳失敗,失敗原因:{0}"
        };
    });
};

//SO1200B
if ($.fn.SO1200B) {
    var SO1200B = (function () {
        this.language = {
        };
    });
};

//SO1200C
if ($.fn.SO1200C) {
    var SO1200C = (function () {
        this.language = {
            gbxWorkTop: '潛在客戶參數',
            chkCustomInfo: '產生各地址上的潛在客戶',
            lblDefCustName: '預設客戶名稱',
            lblDefTel: '預設電話',
            lblDefInvoiceType: '預設發票種類',
            lblDefClctType: '預設收費方式',
            lblStatus:'本次共計產生==>新地址{0}筆, 重覆{1}筆',

            btnCleanCustom: '清除潛在客戶參數',
            btnDeleteItem: '刪除單筆',
            btnDeleteAll: '刪除全部',
            btnCheckAddrSort: '地址狀態檢核',
            btnImport: '正式過入',

            ADDRNO: '地址編號',
            STRTCODE: '街道代碼',
            STRTNAME: '街道名稱',
            LIN: '鄰',
            SECTION: '段',
            LANE: '巷',
            ALLEY: '弄',
            ALLEY2: '衖',
            NO1: '號1',
            NO2: '號2',
            FLOUR: '樓',
            NO3: '號3',
            ROOM: '其它(號室)',
            ADDRFLAG: '地址辨識',
            ADDRESS: '地址字串',
            ADDRSORT: '排序字串(資料排序用)',

            DearCustom: '貴客戶',
            ExpandResult: '本次共計產生==>符合條件的地址{0}筆',
            CheckResult: '地址狀態檢結果==>新地址{0}筆, 重覆{1}筆',
            NoAfterMustValue: '[號]的值, 須有值!',
            NoValueMustS2L: '[號]的值, 須由小到大!',
            NoValueMustSAndE: '[號]的起訖, 必須有值!',
            DashValueMustS2L: '[至]的值, 須由小到大!',
            FlourValueMustS2L: '[樓]的值, 須由小到大!',
            wirteDB_Success:'成功過入SO014中'
        };
    });
};

//SO4110A
if ($.fn.SO4110A) {
    var SO4110A = (function () {
        this.language = {
            ll:'上次日結帳記錄',
            lblMediaBillNoIno1: '1. 『同時產生則媒體單號相同{0},若不需為同一個請分開產生即可』',
            lblMediaBillNoIno2: '2. 合計金額>0會一併產生虛擬帳號',
           
            btnPrint: '確定',
            btnPrePrint: '上次統計結果',
            btnExit: '離開',

            lblTranDate: '過帳截止日期',
            lblUpdTime: '執行時間',
            lblUpdEn: '執行人員',
            lblActYM: '帳款歸屬年月',

            CHOOSE: "選擇",
            SERVICETYPE: '服務別',
            TRANDATE: '過帳截止日期',
            UPDTIME: '執行時間',
            UPDEN: '執行人員',
            ACTYM: '帳款歸屬年月',

            lblCMDate1: '收費日期期限',
            lblCMDate1A: '(含此日之前的資料將被日結)',
            lblA1Code: '庫存現金之會計科目',
            lblA2Code: '銷項稅額之會計科目',
            lblA3Code: 'STB應收之會計科目',
            lblCompCode: '公司別',
            lblServiceType: '服務類別',
            lblVouPath: '傳票檔路徑',

            gbxWorkA: '上次日結帳記錄',
            gbxWorkB: '其它選項',
            gbxWorkC: '資料種類',

            chkTran1: '正式日結',
            chkTran2: '日結順拋檔',
            chkGenVou: '會計拋帳檔',
            opt1: '1.各項明細',
            opt2: '2.各項加總',

            dteActYM_Mustbe: '歸屬年月, 為必填欄位!',
            dteCMDate1_Mustbe: '過帳截止日, 為必填欄位!',
            dteCMDate1_GT_Now: '日結日期必須小於等於今天',
            dteCMDate1_LT_txtTranDate: '服務別:{0}==>[過帳截止日]需大於等於[上次日結之過帳截止日]!',
            cslA1Code_Mustbe: '庫存現金之會計科目, 為必填欄位!',
            cslA2Code_Mustbe: '銷項稅額之會計科目, 為必填欄位!',
            cslA3Code_Mustbe: 'STB應收之會計科目, 為必填欄位!',
            cslCompCode_Mustbe: '公司別, 為必填欄位!',
            csmServiceType_Mustbe: '未勾選服務別!',
            csmServiceType_MustbeB: '服務類別, 為必填欄位!',
            txtVouPath_Mustbe: '請先由 [公司別代碼管理](SO6580A) 設定此公司的傳票檔路徑。',
            noServiceType_SO062:'上方表格區內無對應的服務別:',

            compTitle2: '有線電視(股)公司',
            dteActYM2: '帳款歸屬年月=',
            dteActYM: '帳款歸屬年月',
            dteCMDate12: '收費日期期限=',
            dteCMDate1: '收費日期期限(含此日之前的資料將被日結)',
            cslA1Code2: '庫存現金之會計科目=',
            cslA1Code: '庫存現金之會計科目',
            cslA2Code2: '銷項稅額之會計科目=',
            cslA2Code: '銷項稅額之會計科目',
            cslA3Code2: 'STB應收之會計科目=',
            cslA3Code: 'STB應收之會計科目',
            cslCompCode2: '公司別=',
            cslCompCode: '公司別',
            csmServiceType2: '服務類別=',
            csmServiceType: '服務類別',
            chkTran12: '是否正式日結',
            chkTran1a: '是否正式日結',
            opt12: '資料種類=各項明細',
            opt1a: '1.列印各項明細',
            opt22: '資料種類=各項加總',
            opt2a: '2.列印各項加總',
            ResultMessage: '結果訊息',
            SO4110A1: '日結帳明細報表 [SO4110A1]',
            SO4110A2: '日結拋帳傳票報表 [SO4110A2]',
            saveError: "執行錯誤,錯誤原因: {0}!!"
        };
    });
};

//SO7370A
if ($.fn.SO7370A) {
   var SO7370A = (function () {
      this.language = {
         lCompCode: '公司別',
         lResvTime: '設定時間',
         lServCode: '服務區',
         lServiceType: '服務別',
         gbxResvUnit: '派工件數',
         gbxResvPoint: '派工點數',

         gWorkCount_TIMEPERIOD: "時段",
         gWorkUnit_TIMEPERIOD: "時段",

         lCopy: '複製派工服務件/點數',

         btnEdit: '修改',
         btnSave: '存檔',
         btnCopy: '複製',
         cancel: '取消',
         exit: '離開',

         No_ResvData: '時段設定檔沒有該服務相關的設定!'
      };
   });
};

//SO7370B
if ($.fn.SO7370B) {
   var SO7370B = (function () {
      this.language = {
         gbxSource: '來源',
         lSResvTime: '日期',
         lSServCode: '服務區',
         lSServiceType: '服務別',

         gbxTarget: '目的',
         lTResvTime: '年月',
         lTServCode: '服務區',
         lTType: '型態',
         optWork: '工作日',
         optHoliday: '假日',
         lTServiceType: '服務別',

         lMemo1: '* 請確認休假日期[SO7380A]是否己設定完成',
         lMemo2: '* 請確認來源及目的之管派類別及時段相同',

         copyOk: '複製完成',

         btnSave: '存檔',
         btnExit: '離開',
      };
   });
};

//SO6880A1
if ($.fn.SO6880A1) {
   var SO6880A1 = (function () {
      this.language = {
         
      };
   });
};

//SO7360A
if ($.fn.SO7360A) {
   var SO7360A = (function () {
      this.language = {};
      this.language.lCompCode = '公司別';
      this.language.lServiceType = '服務別';

      this.language.gData_TIMEPERIOD = "時段";
      this.language.sureDelete = "是否刪除?";
      this.language.saveOk = "存檔成功";
      this.language.btnSave = '存檔';
      this.language.cancel = '取消';
   });
};

//SO7380A
if ($.fn.SO7380A) {
   var SO7380A = (function () {
      this.language = {};
      this.language.lCompCode = '公司別';
      this.language.lWorkYY = "年";
      this.language.lWorkMM = "月";
      this.language.gridTips = "滑鼠左鍵設定假日,右鍵取消假日";
      this.language.lNotesL = "說明:";
      this.language.lNotesR = "滑鼠左鍵設定假日,右鍵取消假日";
      this.language.gData_WEEK0 = "日";
      this.language.gData_WEEK1 = "一";
      this.language.gData_WEEK2 = "二";
      this.language.gData_WEEK3 = "三";
      this.language.gData_WEEK4 = "四";
      this.language.gData_WEEK5 = "五";
      this.language.gData_WEEK6 = "六";

      this.language.gbxMemo = '假日設定';
      this.language.lColorBlue = '假日未休';
      this.language.lColorRed = '假日休假';
      this.language.lColorWhite = '非假日';

      this.language.gData_TIMEPERIOD = "時段";
      this.language.saveOk = "存檔成功";
      this.language.btnSave = '存檔';
      this.language.cancel = '取消';
   });
};

//SO6770A10
if ($.fn.SO6770A10) {
   var SO6770A10 = (function () {
      this.language = {

      };
   });
};

//csMenu
if ($.fn.csMenu) {
   var csMenu = (function () {
      this.language = {

      };
   });
};

//SO1100V
if ($.fn.SO1100V) {
   var SO1100V = (function () {
      this.language = {
         btnAdd: '新增',
         btnEdit: '修改',

         lblVodCredit: '預借點數',
         lblPrePay: '儲值點數',
         lblPresent: '+ 贈送點數',
         lblNoPayCredit: '未付費點數',
         lblSum: '= 剩餘點數',

         lbltabItem_A: '異動記錄',
         lbltabItem_B: '點數/影片對應記錄',
         FormEdit: '資料編輯[SO1100V1]',
         gbxRecord:'點數記錄',

         CloseBillNo_BeClose: '己結算資料不允許修改!',
         CD108_RefNo_2: '非贈送類資料,不允許修改!'
      };
   });
};

//SO1100V1
if ($.fn.SO1100V1) {
   var SO1100V1 = (function () {
      this.language = {
         lblNoPayCredit: '未付費點數',
         lblPrePay: '儲值點數',
         lblPresent: '贈送點數',

         gbxWorkA: '點數積點明細',

         lblFaciSNo: '設備序號',
         lblAddCredit: '新增點數',
         lblCreditTypeCode: '積點種類',
         lblServiceType: '服務類別',
         lblModifyReason: '異動原因',
         lblReqDep: '要求修改單位',
         lblReqEn: '要求修改人員',
         lblReqNotes: '修改原因',
         chkStopFlag: '停用',

         btnOk: '確定',
         btnCancel: '取消',

         view: "顯示",
         edit: "修改",
         addNew: "新增",
         
         NoDataByVodCredit: '前端未傳入VodCredit資料',
         AddCreditMustbe : '[新增點數]為必填欄位!!',
         CreditTypeCodeMustbe  : '[積點種類]為必填欄位!!',
         ServiceTypeMustbe  : '[服務類別]為必填欄位!!',
         ModifyReasonMustbe : '[異動原因]為必填欄位!!',
         ReqDepMustbe  : '[要求修改單位]為必填欄位!!',
         ReqEnMustbe  : '[要求修改人員]為必填欄位!!',
         ReqNotesMustbe  : '[修改原因]為必填欄位!!',
         Error_NoRow  : '異常! 找不到目前編輯中的Row!!',
         saveOk: "存檔完成!",
         saveError: "執行錯誤,錯誤原因: {0}!!"
      };
   });
};

//SO0000B3
if ($.fn.SO0000B3) {
   var SO0000B3 = (function () {
      this.language = {
         gbxCanChooseCompCode: '資 料 區',

         btnOk: '確定',
         btnCancel: '取消',
         
         CODENO: '代碼',
         DESCRIPTION: '名稱',

         checkPriv_Error: '無法切換至目標公司別:{0}, 權限不足!'
      };
   });
};

//SO6770B3
if ($.fn.SO6770B3) {
   var SO6770B3 = (function () {
      this.language = {
         lblcslPenalCode: '違約金',
         cslPenalCode: '違約金代碼',
         csmProductCode: '產品/速率',
         
         btnOk: '確定',
         btnCancel: '取消',

         view: "顯示",
         edit: "修改",
         addNew: "新增",

         PenalCode_Mustbe: '[違約金代碼]為必填欄位!',
         ProductCode_Mustbe: '[產品/速率]為必填欄位!',
         noProductData: '無產品資料可供設定!'
      };
   });
};

//SO1300Q
if ($.fn.SO1300Q) {
   var SO1300Q = function () {
      this.language = {
         btnSave: '存檔',
         btnExit: '離開',

         normal: '正常',
         promotion: '促銷',
         colCUSTID: '客編',
         colCUSTNAME: '姓名',
         colMAINCUST: '統收戶',
         colINSTADDRESS: '裝機地址',
         warnigMsg: '本次勾選的產品[{0}],數量:{1}' +
                     '\n' + '不相等簽約戶數:{2}',
         lblResvTime: '預約時間',
         mustResvTime: '預約時間需有值',
         saveOk: '儲存完成'
      };
   };
};

//SO1146A
if ($.fn.SO1146A) {
   var SO1146A = function () {
      this.language = {
         gbxTop: '請選擇需啟動的產品',

         btnOk: '確定',
         btnExit: '離開',

         CHOOSE: '選擇',
         DECLARANTNAME: '申請人姓名',
         PRODUCTNAME: '產品',
         FACISEQNO: '設備流水號',
         FACISNO: '設備序號',
         PRODSTATUSNAME: '開通狀態',

         saveOk: '申請完畢',
         executeError: "執行錯誤,錯誤原因: {0}!!",
         pleaseChooseData: "請勾選產品",
      };
   };
};

//SO1146B
if ($.fn.SO1146B) {
   var SO1146B = function () {
      this.language = {
         gbxTop: '請選擇需取消的產品',

         btnOk: '確定',
         btnExit: '離開',

         CHOOSE: '選擇',
         DECLARANTNAME: '申請人姓名',
         PRODUCTNAME: '產品',
         FACISEQNO: '設備流水號',
         FACISNO: '設備序號',
         PRODSTATUSNAME: '開通狀態',

         saveOk: '取消完畢',
         executeError: "執行錯誤,錯誤原因: {0}!!",
         pleaseChooseData: "請勾選產品",
         title_SO1131D: '臨櫃補單[SO1131D]',
      };
   };
};
//SyncDataToDB_Local
if ($.fn.SyncDataToDB_Local) {
   var SyncDataToDB_Local = (function () {
      this.language = {
         lblProGroupCode: '產品組合代碼',
         lblProGroupCode2: '複製至新代碼',
         gbxCopyTop: '複製選項',
         lblCodeNoExists: '本區代碼已存在時',
         radDel: '刪除後重新覆蓋',
         radNotDel: '不覆蓋',

         btnOk: '確定',
         btnExit: '離開',

         ProGroupCode_Mustbe: '[產品組合代碼]欄位不可為空白!',
         CodeNo_Mustbe: '[代碼]欄位不可為空白!',
         Description_Mustbe: '[名稱]欄位不可為空白!',
         Copy_Local_OK: '代碼複製成功!'
      }
   });
};
//SO1300R
if ($.fn.SO1300R) {
   var SO1300R = function () {
      this.language = {
         radAddNew: '新增',
         radClear: '清除',
         lLoadFile: '匯入名單',
         lblNotes: '格式說明:EXCEL格式，抬頭為PROID,CUSTID',

         btnOk: '確定',
         btnExit: '離開',

         saveOk: '取消完畢',
         executeError: "執行錯誤,錯誤原因: {0}!!",
         file_Mustbe: '請選取[專案戶名單]檔案!',
         fileError: "檔案上傳失敗,失敗原因:{0}",
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

//SO1120A
if ($.fn.SO1120A) {
    var SO1120A = (function () {
        this.language = {
            view: '瀏覽',
            edit: '修改',
            append: '新增',
            txtbkServiceType: '服務別',
            txtbkModelCode: '設備型號',
            txtbkFaciCode: '品名項目',
            txtbkFaciSNo: '物品序號',
            txtbkSmartCardNo: '智慧卡序號',
            txtbkDVRNo: 'DVR序號',
            txtbkPinCode: '吊牌號碼',
            txtbkFaciStatus: '設備狀態',
            txtbkWipStatus: '派工狀態',
            txtbkOpenStatus: '開通狀態',
            txtbkFaciStatus2: '拆機/取回',
            txtbkWipStatus2: '拆機',
            txtbkOpenStatus2: '關機',
            txtbkBoxMac: 'Box',
            txtbkReFaciSNo: '母機序號',
            txtbkInitPlaceNo: '設備裝置點',
            txtFaciAccessory: '型號配件',
            txtbkBuyCode: '買賣方式',
            txtbkDueDate: '租借到期日',
            txtbkClassCode1: '客戶類別1',
            txtbkClassCode3: '客戶類別3',
            txtbkNote: '備註',
            txtbkClassCode2: '客戶類別2',
            ccCustAttribute: '客戶特性',
            MustValue: '必要欄位須有值',
            WaringStr2: '警告!!',
            FaciName: '品名項目',
            BuyType: '買賣方式',
            tabCaptions: ["設備狀態", "申請資料", "CM資訊", "DVR資訊", "CP資訊",
                "帳號/發票", "保證金/合約", "VOD資訊", "數位證件", "電腦設備"],
            CPNumber: "CP電話號碼",
            sureNoSaveExit: "新增或修改未存檔，是否真的要離開?",
            btnSave: '存檔',
            btnEdit: '修改',
            btnExit: '取消'
        };
    });
};
//SO1120A1
if ($.fn.SO1120A1) {
    var SO1120A1 = (function () {
        this.language = {
            txtbkInstSNO: '安裝單號',
            txtbkDEReasonCode: '遺失原因',
            txtbkPRSNO: '拆除單號',
            txtbkInstDate: '安裝時間',
            txtbkGetDate: '取回時間',
            txtbkPRDate: '拆除時間',
            txtbkInstEn1: '安裝人員1',
            txtbkOpenDate: '開機時間',
            txtbkPREn1: '拆除人員1',
            txtbkInstEn2: '安裝人員2',
            txtbkCloseDate: '關機時間',
            txtbkPREn2: '拆除人員2',
            txtbkMediaCode: '介紹媒體',
            txtbkIntroId: '介紹人',
            txtbkSEQNO: '設備流水號'
        };
    });
};
//SO1120A2
if ($.fn.SO1120A2) {
    var SO1120A2 = (function () {
        this.language = {
            ProposerManage: '申請人管理',
        };
    });
};
//SO1120A3
if ($.fn.SO1120A3) {
    var SO1120A3 = (function () {
        this.language = {
            txtbkCMBaudRate: 'CM速率',
            txtbkEnableAccount: '帳號啟用',
            txtbkAccountStatus: '開通狀態',
            txtbkDialAccount: '撥接帳號',
            txtbkDisableAccount: '帳號停用',
            txtbkAccountStatusMsg: '回覆訊息',
            txtbkDialPaxxwxxd: '撥接密碼',
            txtbkVendorCode2: '路由',
            txtbkEmail: 'E-Mail',
            txtbkProbationRateNo: '試用速率',
            txtbkVendorCode: '供應商',
            txtbkFixIPCount: '固定IP數',
            txtbkProbationStopDate: '預計試用截止日',
            txtbkDynIPCount: '動態IP數',
            txtbkIPAddress: 'CP IP位址'
        };
    });
};
//SO1120A4
if ($.fn.SO1120A4) {
    var SO1120A4 = (function () {
        this.language = {
            txtbkPSTBSNo: 'STB序號',
            txtbkPSmartCardNo: '智慧卡序號',
            txtbkDVRSizeCode: 'DVR實際容量',
            txtbkDVRAuthSizeCode: 'DVR授權容量'
        };
    });
};
//SO1120A5
if ($.fn.SO1120A5) {
    var SO1120A5 = (function () {
        this.language = {
            txtbkGateway: 'MG ID',
            txtbkTFNServiceID: '帳務合約編號',
            txtbkRGID: 'RG序號',
            txtbkPortNo: '用戶端EMTA Port Line',
            txtbkNOCINIT: 'EBT NOCINIT設定狀態',
            txtbkEMNo: '3G虛擬號碼',
            txtbkEBTContNo: '合約編號',
            txtbkContDate: 'EBT合約生效日'
        };
    });
};
//SO1120A6
if ($.fn.SO1120A6) {
    var SO1120A6 = (function () {
        this.language = {
            lblInvSeqNo: '發 票 抬 頭 流 水 號',
            lblInvAddress: '發 票 地 址',
            lblChargeTitle: '收  件  人',
            lblChargeAddress: '收 費 地 址',
            lblInvoiceType: '發 票 種 類',
            lblMailAddress: '郵 寄 地 址',
            lblInvNo: '統 一 編 號',
            lblInvoiceKind: '發 票 開 立 種 類',
            lblInvTitle: '發 票 抬 頭',

            txtbkAccountSeqNo: '帳務序號',
            txtbkBankCode: '銀行名稱',
            txtbkAccountNo: '帳號/卡號',
            txtbkCMCode: '收費方式',
            txtbkPTCode: '付款種類',
            btnASSign: '選擇發票抬頭',
            btnAccSet: '指定帳號',
            btnAccClear: '清除帳號'
        };
    });
};
//SO1120A7
if ($.fn.SO1120A7) {
    var SO1120A7 = (function () {
        this.language = {
            chkContractCust: '合約戶',
            txtbkContNo: '合約編號',
            txtbkDepositPTCode: '保證金付款種類',
            txtbkBPCode: '優惠組合',
            txtbkContName: '本票開票人',
            txtbkContractDate: '合約到期日',
            txtbkCheckNo: '本票票號',
            txtbkPenalSum: '違約金',
            txtbkDeposit: '保證金'
        };
    });
};
//SO1120A8
if ($.fn.SO1120A8) {
    var SO1120A8 = (function () {
        this.language = {
            view: '瀏覽',
            edit: '修改',
            append: '新增'
        };
    });
};
//SO1120A9
if ($.fn.SO1120A9) {
    var SO1120A9 = (function () {
        this.language = {

        };
    });
};
//SO1120AA
if ($.fn.SO1120AA) {
    var SO1120AA = (function () {
        this.language = {
            txtbkOS: '作業系統',
            txtbkComputer: '電腦設備',
            txtbkMemorySize: '記憶體',
            txtbkPCCount: '電腦台數',
            txtbkBrowser: '瀏覽器',
            txtbkNetCardSpeed: '網路卡速度(Mbps)',
            txtbkMailSystem: '郵件軟體',
            txtbkPeripheral: '其他週邊設備',
            chkNetCardFlag: '自備網路卡'
        };
    });
};
//SO1120AD
if ($.fn.SO1120AD) {
    var SO1120AD = (function () {
        this.language = {
            txtbkCancelCode: "作廢原因",
            txtbkCancelDate: "作廢日期",
            view: "瀏覽",
            edit: "修改",
            append: "新增",
            Delete: "刪除",
            btnOK: "確定",
            btnExit: "取消",
            sureNoSaveExit: "新增或修改未存檔，是否真的要離開?",
            NoFacility: "無對應設備資料，請查核?"
        };
    });
};
