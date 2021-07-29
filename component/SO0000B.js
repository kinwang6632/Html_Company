(function ($, window, undefined) { 
    var formName = 'SO0000B';
    var riadllName = 'CableSoft.RIA.Dynamic.Menu.Web.dll';
    var riaClassName = 'CableSoft.RIA.Dynamic.Menu.Web.dsDynamicMenu';
    //var closeButton = '<div class="jqx-tabs-close-button" data-cv="closeButton_{0}" style="height: 100%; width: 16px; float: right; font-size: 1px; display: block; margin-top: 1px;"></div>';
    //var closeButton_energyblue2 = '<div class="jqx-tabs-close-button jqx-tabs-close-button-energyblue2" data-cv="closeButton_{0}" style="width: 16px; height: 100%; font-size: 1px; margin-top: 1px; float: left; display: block;"></div>';
   //var closeButton_ui_redmond = '<div class="jqx-tabs-close-button jqx-tabs-close-button-ui-redmond" data-cv="closeButton_{0}" style="width: 16px; height: 100%; font-size: 1px; margin-top: 1px; float: left; display: block;"></div>';

    $.fn.SO0000B = function (options, param, param2) {
        try {
            if (typeof options === 'string') {
                if (methods[options]) {
                    return methods[options](this, param, param2);
                }
                else {
                    var opt = methods['options'](this);
                    if (opt[options]) {
                        return opt[options];
                    }
                    opt = null;
                }
                return;
            }
            options = options || {};
            return this.each(function () {
                var state = $.data(this, formName);
                if (state) {
                    $.extend(state.options, options);
                }
                else {
                    $.data(this, formName, {
                        options: $.extend({}, new defaults(), new SO0000B(), options)
                    });
                    init(this);
                }
                state = null;
            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.SO0000B', err);
        }
    };
    var methods = {
        options: function (div) {
            return $.data(div[0], formName).options;
        },
        theme: function (jq, params) {
            return jq.each(function () {
                if (params !== undefined) {
                    var oo = getSelf(jq);
                    setParameter(oo, 'theme', params);
                    oo.options.theme = params;
                    oo = null;
                }
            });
        },
        setParameter: function (jq, paraName, params) {
            return jq.each(function () {
                if (params !== undefined) {
                    setParameter(getSelf(jq), paraName, params);
                    oo = null;
                }
            });
        },
        setGlobalization: function (jq, params) {
            return jq.each(function () {
                setParameter(this, 'localization', params);
            });
        },
        destroy9: function (jq) {
            return jq.each(function (idx, element) {
                formDestroy(getSelf($(element)), 0);
            });
        },
        resize: function (jq, params) {
            formResize(getSelf(jq), params);
        },
        disabled9: function (div, params) {
            try {
                var oo = getSelf(div);
                if (params !== undefined && params !== null) {
                    setParameter(oo, 'disabled', params);
                    //$elem.find('div, input, textarea, select').attr('readonly', params);
                    oo.options.disable = params;
                } else {
                    return oo.options.disable;
                }
                oo = null;
            } catch (err) {
                errorHandle(formName, 'disabled', err);
            }
        },
        addCVTabItem: function (div, params) {
            try {
                if (params !== undefined && params !== null) {
                    _addCVTabItem(getSelf(div), params);
                }
            } catch (err) {
                errorHandle(formName, 'addCVTabItem', err);
            }
        },
        logout: function(div){
            logout_SO025A(getSelf(div), function () {
            });
        }
    };
    var defaults = function () {
        this.language = {};
        this.loginInfo = {};
        //this.editMode = 0;
        //this.refNo = 0;
        this.parameters = {};
        this.controls = [];
        //this.isSaved = false;
        this.theme = $.jqx.theme;
        this.localization = null;
        this.disabled = false;
        this.mid = '';
        this.menuId = 'csDynamicMenu';
        this.tabCustQueryId = 'tabMenu'; //'tabCustQuery';
        this.index = 0;
        this.menuShow = false;
        this.cv_loginInfo = {};
        this.custQueryFlag = false;
    };
    function getSelf(jq) {
        var oo = $.data(jq[0], formName);
        if (oo === undefined) {
            oo = $.data(jq.parent()[0], formName);
        }
        return oo;
    }
    function setParameter(div, paraName, params) {
        try {
            if (!paraName) { return; }
            var options = div.options;
            var controls = options.controls;
            for (var i = 0, iCnt = controls.length; i < iCnt; i++) {
                if (controls[i].type.indexOf('jqx') >= 0) {
                    var o = $('#' + controls[i].name);
                    var pa = {};
                    pa[paraName] = params;
                    o.each(function () {
                        $(this)[controls[i].type](pa);
                    });
                } else {
                    var o = $('#' + controls[i].name);
                    o.each(function () {
                        $(this)[controls[i].type](paraName, params);
                    });
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'setParameter', err);
        }
    }
    function formResize(div, params) {
        try {
            var self = div;
            var options = self.options;

            try {
                //$(window).off('resize');
                var oo = $('#' + options.tabMenuId);
                //var ooo = $('#' + options.menuId);
                //oo.csTabs({ height: oo.parent().height() });
                //oo.csTabs({ height: oo.parent().outerHeight() });
                //oo.csTabs({ height: oo.parent().outerHeight() - ooo.outerHeight() - 10 });
                oo.csTabs({ height: params });
                oo = null;
                //ooo = null;
            } catch (err) {
                errorHandle(formName, 'formResize-->width_height', err);
                return false;
            }
            self = null;
            options = null;
        }
        catch (err) {
            errorHandle(formName, 'formResize', err);
        }
        return true;
    }
    function formDestroy(div, level) {
        var self = div;
        try {
            if (self === undefined || self === null) {
                return false;
            }

            var controls = self.options.controls;
            for (var j = 5; j >= level; j--) {
                for (var i = controls.length - 1; i >= 0; i--) {
                    if (controls[i].level === j) {
                        if (controls[i].type === 'style') {
                            $('#' + controls[i].name).remove();
                        } else if (controls[i].type === 'function') {
                            controls[i].name = null;
                        }
                        else {
                            var o = $('#' + controls[i].name);
                            o.each(function () {
                                $(this).off();
                                $(this)[controls[i].type]('destroy');
                                controls.splice(i, 1);
                            });
                        }
                    }
                }
            }


            if (level > 0) {
                return;
            }
            destroyControls(self.options.controls);
            controls.length = 0;
            controls = null;


            for (var item in self.options) {
                if ($.isArray(self.options[item]) === true) {
                    if (item !== 'source') {
                        self.options[item].length = 0;
                    }
                }
                self.options[item] = null;
                delete self.options[item];
            }
            self.options.length = 0;
            self.options = null;

            //self.$activeElement[0].children[0].remove();
            $.cleanData(self.$activeElement, true);
            for (item in self) {
                if ($.isArray(self[item]) === true) {
                    if (item !== 'options') {
                        self[item].length = 0;
                    }
                }
                self[item] = null;
                delete self[item];
            }
            self.length = 0;
            self = null;
        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        }
    }
    function _addCVTabItem(self, params) {
        try {
            if (params.loginInfo == undefined) {
                messageBox(self.options.language.LoginInfo_Need);
                return false;
            }

            self.cv_loginInfo = cloneJSON(params.loginInfo);
            var $tabMenu = self.$activeElement.parent().find('#' + self.options.tabMenuId);
            var text = self.cv_loginInfo.loginInfo.rows[0].compcode + '.【】'; //params.data.INSTADDRESS
            var titleText = '<span data-cv="tabTitle_' + params.data.ADDRNO + '" style="margin-left:0px;">' + text + '</span>';

            //檢查cvItem是否已經存在, 如果存在就跳顯 
            //var rtnValue = getTabItemIndexByTitle(self.$activeElement.parent().find('#' + self.options.tabMenuId), text);
            var rtnValue = getTabItemIndexByAddrNo(self.$activeElement.parent().find('#' + self.options.tabMenuId), params.data.ADDRNO);
            if (rtnValue >= 0) {
                $tabMenu.csTabs('select', rtnValue);
            } else { //否則就新增一個TabMenu
                //依cvInfo 參數解析出ViewType 及 相關必要參數
                var tabId = 'cvItem_addr_' + params.data.ADDRNO;  //cvItem_Id_
                var html = '<div id = "' + tabId + '" style="height:100%;margin:6px 2px 0px 2px;"></div>';
                self.options.tabId = tabId;

                //var _closeButton = closeButton.replace('data-cv=""', 'data-cv="closeButton_' + params.data.ADDRNO + '"');
                //var _closeButton = String.format(closeButton, params.data.ADDRNO);
                //if (self.options.theme == 'energyblue2') {
                //    _closeButton = String.format(closeButton_energyblue2, params.data.ADDRNO, $.jqx.theme, self.options.theme);
                //} else {
                //    _closeButton = String.format(closeButton_ui_redmond, params.data.ADDRNO, $.jqx.theme, self.options.theme);
                //}
                //_closeButton = '';

                //$tabMenu.csTabs('addAt', 1, titleText + _closeButton, html);
                $tabMenu.csTabs('addAt', 1, titleText, html);
                //移除自動長出來的捲軸
                var scroll = $tabMenu.find('#' + tabId);
                scroll.parent().css('overflow', 'hidden');
                scroll = null;

                //因為元件的removed 太早清了, 不能做destroy 只好自己做   
                //$tabMenu.find('.jqx-tabs-close-button').on('click', { $tabMenu: $tabMenu, CVId: tabId, titleText: titleText }, function (e) {
                //改成取出建立在 ul="tabMenu_List"中的li集合
                var $closeButton = $tabMenu.find('ul[data-mnu="tabMenu_List"] li').eq(1).find('.jqx-tabs-close-button');
                $closeButton.off();
                //$tabMenu.find('div[data-cv="closeButton_' + params.data.ADDRNO + '"]').on('click', { $tabMenu: $tabMenu, CVId: tabId }, function (e) {
               $closeButton.on('click', { $tabMenu: $tabMenu, CVId: tabId, tabTitle: 'tabTitle_' + params.data.ADDRNO }, function (e) {
                    $(this).off();
                    var _self = e.data;
                    var title = _self.$tabMenu.find('span[data-cv=' + e.data.tabTitle + ']');
                    //明確取得 X 所在的頁簽index
                    //var _rtnValue = getTabItemIndexByTitle(_self.$tabMenu, _self.$tabMenu.csTabs('getTitleAt', _self.$tabMenu.csTabs('val')));
                    var _rtnValue = getTabItemIndexByTitle(_self.$tabMenu, title.text());
                    if (_rtnValue >= 0) {
                        //關閉CV時, 需將CV做destroy
                        try {
                            $(_self.$tabMenu.find('#' + _self.CVId)[0]).SO1100B('destroy');
                        } catch (e) { }
                        _self.$tabMenu.csTabs('removeAt', _rtnValue);
                    }
                    _rtnValue = null;
                    return false;
                });
                //$tabMenu.csTabs('select', 1);

               //建立CV TabItem及內容
                createTabCVContent(self, $tabMenu.find('#' + tabId), params);
            }
            $tabMenu = null;
            titleText = null;
            rtnValue = null;
        } catch (err) {
            errorHandle(formName, '_addCVTabItem', err);
        }
    } //_addCVTabItem

    function init(div) {
        try {
            var self = $.data(div, formName);
            self.$activeElement = $(div);
            getMenuData(self);
            self.options.URL_Para = JSON.parse(sessionStorage.getItem('URL_Para'));
            self = null;
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    }
    //function initSL(self) {
    //    $("#Menu2_Content").load("http://192.168.10.80:8010/Default.aspx", "{CompCode:3,GroupID:50,EntryID:TEST,EntryName:TEST50,MID:SO2000}");
    //    $("#Menu2_Content").css("height", screen.availHeight - 200);
    //    $("#Menu3_Content").load("http://192.168.10.80:8010/Default.aspx", "{CompCode:3,GroupID:50,EntryID:TEST,EntryName:TEST50,MID:SO3000}");
    //    $("#Menu3_Content").css("height", screen.availHeight - 200);
    //    $("#Menu4_Content").load("http://192.168.10.80:8010/Default.aspx", "{CompCode:3,GroupID:50,EntryID:TEST,EntryName:TEST50,MID:SO4000}");
    //    $("#Menu4_Content").css("height", screen.availHeight - 200);
    //    $("#Menu5_Content").load("http://192.168.10.80:8010/Default.aspx", "{CompCode:3,GroupID:50,EntryID:TEST,EntryName:TEST50,MID:SO5000}");
    //    $("#Menu5_Content").css("height", screen.availHeight - 200);
    //    $("#Menu6_Content").load("http://192.168.10.80:8010/Default.aspx", "{CompCode:3,GroupID:50,EntryID:TEST,EntryName:TEST50,MID:SO6000}");
    //    $("#Menu6_Content").css("height", screen.availHeight - 200);
    //    $("#Menu7_Content").load("http://192.168.10.80:8010/Default.aspx", "{CompCode:3,GroupID:50,EntryID:TEST,EntryName:TEST50,MID:SO7000}");
    //    $("#Menu7_Content").css("height", screen.availHeight - 200);
    //    $("#Menu8_Content").load("http://192.168.10.80:8010/Default.aspx", "{CompCode:3,GroupID:50,EntryID:TEST,EntryName:TEST50,MID:SO8000}");
    //    $("#Menu8_Content").css("height", screen.availHeight - 200);
    //}

    function getMenuData(self) {
        try {
           self.$activeElement.parent().find('div[data-mnu="tabCustQuery"]').hide();
           self.options.HTML = self.$activeElement.parent().find('div[data-mnu="SO0000B"]').html();

            //var loginInfo = self.options.loginInfo;
            //var params = getParameters('getKey', 'getKey', 'getKey', loginInfo);
            //getServerData(params, { success: initOk });

            //$('body').attr('disabled', true);

            //function initOk(data) {
            //   $('body').removeAttr('disabled');
            try {
                //var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: self.options.loginInfo } });
                var paraLoginInfo = getParaLoginInfo(self.$activeElement[0], formName,120);
                var parameters = $.extend({}, paraLoginInfo);
                var params = getParameters(riadllName, riaClassName,
                    'QueryMainMenu_HTML',
                    JSON.stringify(parameters));
                $('body').attr('disabled', true);
                getServerData(params, {
                    success: function (data) {
                        $('body').removeAttr('disabled');
                        if (data != undefined && data.ErrorCode == 0) {
                            delete self.options.menuData;
                            self.options.menuData = $.parseJSON(data.ResultXML);
                            if (self.options.menuData.MainMenu.rows.length > 0) {
                               renderControls(self);
                               addHandertControls(self);
                            } else {
                               messageBox(self.options.language.noData_SO029, messageType.critical, null, function () {
                                  window.location.href = "login.html?Key=" + guid();
                               });
                            }
                        }
                        else {
                            if (typeof data === 'string') {
                                messageBox(data, messageType.critical);
                            } else {
                                messageBox(data.ErrorMessage, messageType.critical);
                            }
                        }
                        paraLoginInfo = null;
                        parameters = null;
                        params = null;
                    }
                });
            }
            catch (err) {
                errorHandle(formName, 'initOk ', err);
            }
            //}
        }
        catch (err) {
            errorHandle(formName, 'renderControls', err);
        }
    }

    function renderControls(self) {
        var options = self.options;
        var lang = options.language;
        var data = self.options.menuData['MainMenu'].rows;
        var filtered_json = find_in_object(data, { parentid: '-1' });
        if (filtered_json.length > 0) {
           ////切換資料區
           //var oo = {}, cnt = 0;
           //if (data[data.length - 1]['parentid'] != -1) {
           //   oo = find_in_object(data, { parentid: data[data.length - 1]['parentid'] });
           //   cnt = oo.length + 1;
           //   data.push({ id: data.length + 1, parentid: data[data.length - 1]['parentid'], text: cnt + lang.switch_DBOWNER, value: 'switch' });
           //} else {
           //   oo = find_in_object(data, { parentid: data[data.length - 1]['id'] });
           //   cnt = oo.length + 1;
           //   data.push({ id: data.length + 1, parentid: data[data.length - 1]['id'], text: cnt + lang.switch_DBOWNER, value: 'switch' });
           //}
           //登出
           data.push({ id: data.length + 1, parentid: -1, text: String.format(lang.logout, options['menuData']['CompyName'].rows[0]['CompyName'], options.loginInfo.loginInfo.rows[0].entryid, options.loginInfo.loginInfo.rows[0].entryname), value: 'quit' });
        }

        var source = {
            datatype: "json",
            datafields: [
                { name: 'id' },
                { name: 'parentid' },
                { name: 'text' },
                { name: 'value' }
            ],
            id: 'id',
            localdata: data
        };
        //data = null;

        var dataAdapter = new $.jqx.dataAdapter(source);
        dataAdapter.dataBind();
        source = null;
        filtered_json.length = 0;
        filtered_json = null;

        var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);

        var $menu = self.$activeElement.parent().find('div[data-mnu="csDynamicMenu"]');
        //self.options.menuData['MenuType'].rows[0]['MenuType'] = 2;
        if (self.options.menuData['MenuType'].rows[0]['MenuType'] == 1) {
           // 1:下拉多欄位全展式功能表
           var mnuData = [];
           transHTML(self, records, mnuData, $menu, 1);
           $menu = $menu.jqxMenu({
              width: 'auto', height: 25,
              autoOpen: false,
              autoCloseOnMouseLeave: true,
              showTopLevelArrows: false,
              theme: self.options.theme,
              autoSizeMainItems: false
           });
           $menu.on('shown', self, function (e) {
              $(".jqx-menu-popup.jqx-menu-popup").css({ left: 1 });
              //$(".jqx-menu-popup.jqx-menu-popup").show();
           });
           fixMenuCss(self);
        } else if (self.options.menuData['MenuType'].rows[0]['MenuType'] == 2) {
           // 2:下拉多欄位二層式功能表
           var mnuData = [];
           transHTML(self, records, mnuData, $menu, 2);
           $menu = $menu.jqxMenu({
              width: 'auto', height: 25,
              autoOpen: false,
              autoCloseOnMouseLeave: false,
              autoCloseOnClick: false,
              showTopLevelArrows: false,
              theme: self.options.theme,
              autoSizeMainItems: false
           });
           $menu.on('shown', function (e) {
              self.options.shown = true;
              $(".jqx-menu-popup.jqx-menu-popup").css({ left: 1 });
              //$(".jqx-menu-popup.jqx-menu-popup").show();
           });
           $menu.on('closed', function (e) {
              self.options.shown = false;
              $("div[id^='popupItem_']").each(function () {
                 $(this).jqxMenu('close');
              });
           });
           //補作第三層功能表的render
           $("div[id^='popupItem_']").each(function () {
              var dataSub = [];
              var subDataA = find_in_object(data, { parentid: $(this).attr('parentid') });
              if (subDataA.length > 0) {
                 $.merge(dataSub, subDataA);
              }
              for (var i = 0, iCnt = subDataA.length; i < iCnt; i++) {
                 var subDataB = find_in_object(data, { parentid: subDataA[i]['id'] });
                 if (subDataB.length > 0) {
                    $.merge(dataSub, subDataB);
                 }
              }


              //var dataSub = find_in_object(data, { parentid: $(this).attr('parentid') });
              //dataSub.unshift(data[$(this).attr('parentid') - 1]);
              var sourceSub = {
                 datatype: "json",
                 datafields: [
                     { name: 'id' },
                     { name: 'parentid' },
                     { name: 'text' },
                     { name: 'value' }
                 ],
                 id: 'id',
                 localdata: dataSub
              };
              dataSub = null;
              var dataAdapterSub = new $.jqx.dataAdapter(sourceSub);
              dataAdapterSub.dataBind();
              sourceSub = null;
              var recordsSub = dataAdapterSub.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
              var $menuSub = $(this).jqxMenu({
                 source: recordsSub,
                 width: 200,
                 mode: 'popup',
                 theme: self.options.theme,
                 autoCloseOnClick: true,
                 autoSizeMainItems: true,
                 animationShowDuration: 500,
                 enableHover: true,
                 autoOpen: false,
                 autoOpenPopup: false,
                 minimizeWidth: -1 //做為強制要求jqxMenu的popmenu子項, 以母項的座標來計算現的位置
              });
              options.controls.push({ name: $menuSub[0]['id'], type: 'jqxMenu', level: 2 });
              dataAdapterSub = null;
              recordsSub = null;
              $('#' + $menuSub[0]['id'].replace('popupItem_', 'mnu_')).on('mousedown', function (e) {
                 $("div[id^='popupItem_']").each(function () {
                    $(this).jqxMenu('close');
                 });
                 var leftClick = isLeftClick(e) || $.jqx.mobile.isTouchDevice();
                 if (leftClick) {
                    var scrollTop = $(window).scrollTop();
                    var scrollLeft = $(window).scrollLeft();
                    var posLeft = $(e.currentTarget).offset().left + $(e.currentTarget).width();
                    $('#' + this['id'].replace('mnu_', 'popupItem_')).jqxMenu('open', parseInt(posLeft) + scrollLeft, parseInt(e.clientY) + scrollTop);
                    return false;
                 } else {
                    return false;
                 }
              });
              $(document).on('mousedown', function (e) {
                 if (self.options.shown == true) {
                    //$('#' + self.options.menuId).jqxMenu('close');
                    if (self.options.menuItem != '') {
                       setTimeout(function () {
                          try {
                             $('#' + self.options.menuId).jqxMenu('closeItem', options.menuItem);
                          } catch (e) {
                          }
                       }, 2000)
                      
                    }
                 }
                 //return false;
              });
           });
           fixMenuCss(self);
           //補作第三層功能表的render
           //$("div[id^='mnu_SO']").each(function () {
           //   var dataSub = find_in_object(data, { parentid: $(this).attr('parentid') });
           //   dataSub.unshift(data[$(this).attr('parentid') - 1]);
           //   var sourceSub = {
           //      datatype: "json",
           //      datafields: [
           //          { name: 'id' },
           //          { name: 'parentid' },
           //          { name: 'text' },
           //          { name: 'value' }
           //      ],
           //      id: 'id',
           //      localdata: dataSub
           //   };
           //   dataSub = null;
           //   var dataAdapterSub = new $.jqx.dataAdapter(sourceSub);
           //   dataAdapterSub.dataBind();
           //   sourceSub = null;
           //   var recordsSub = dataAdapterSub.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
           //   var $menuSub = $(this).jqxMenu({
           //      source: recordsSub,
           //      width: 'auto', height: 31,
           //      mode: 'horizontal',
           //      theme: self.options.theme,
           //      autoOpen: true,
           //      autoCloseOnClick: true,
           //      autoSizeMainItems: true,
           //      autoCloseOnMouseLeave: true,
           //      clickToOpen: true,
           //      autoOpenPopup: true,
           //      animationShowDuration: 500,
           //      enableHover: true,
           //      autoCloseInterval:6000
           //   });
           //   dataAdapterSub = null;
           //   recordsSub = null;
           //   $menuSub.on('itemclick', function (e) {
           //      $('#' + (parseFloat($(this).attr('parentid')) + 1)).parent().parent().parent().hide();
           //   });
           //   $menuSub.on('shown', function (e) {
           //      $('#' + (parseFloat($(this).attr('parentid')) + 1)).parent().parent().parent().show();
           //      $('#' + (parseFloat($(this).attr('parentid')) + 1)).parent().parent().parent().css({ left: $(this).position().left + $(this).width() });
           //   });
           //});
        } else {
           // 0:下拉樹狀功能表 預設值
           $menu = $menu.jqxMenu({
              source: records,
              width: 'auto',
              height: 25,
              mode: 'horizontal',
              //animationShowDelay: 500,
              //animationHideDelay: 800,
              theme: self.options.theme,
              autoOpen: true,
              //clickToOpen: true,
              autoCloseOnClick: true,
              autoSizeMainItems: false,
              autoCloseOnMouseLeave: true,
              animationHideDelay:3000
           });
        }
        options.controls.push({ name: $menu[0]['id'], type: 'jqxMenu', level: 1 });
        options.menuId = $menu[0]['id'];
        //$('#'+ options.menuId).on('initialized', function () {
        //   var i = 0;
        //});
        $menu.on('mouseover', function (e) {
            $(this).css('zIndex', 99999);
            if ($(this).height() < 5) {
                $('div[data-mnu="mnuImg"]').css('zIndex', 0).hide();
                $(this).css('height', 25);
                formResize(self, '96%');
            }
            //$(this).fadeIn(3000);
            //$(this).fadeIn();
            //$(this).css('opacity', 1);
            //$(this).css('height', 25);
        });
        $menu.on('dblclick', function (e) {
            $(this).css('zIndex', 0);
            $(this).css('height', 0);
            formResize(self, '99%');
            $('div[data-mnu="mnuImg"]').css('zIndex', 1).show();
            if (self.options.URL_Para.isTest == 1) {
               autoRunner(self);
            }
        });
        fixMenuCss(self);
        //$menu.on('mouseout', function (e) {
        //$(this).css('zIndex', 0);
        //$(this).fadeOut();
        //$(this).slideUp(3000);
        //if (e.data.menuShow == false) {
        //    $(this).css('opacity', 0);
        //}
        //$(this).css('height', 5);
        //});
        //$menu.on('shown', self, function (e) {
        //    $(e.args.subMenuElement).parent().width(188);
        //    $(e.args.subMenuElement).width(185);
        //    $(e.args.subMenuElement).find('li').width(166);
        //    if (e.args.level > 0) {
        //        $(e.args.subMenuElement).parent().css('left', 36 * e.args.level);
        //    } else {
        //        //$(e.args.subMenuElement).parent().parent().width(188);
        //    }

        //});
        //$menu.on('closed', self, function (e) {
        //    $(this).css('zIndex', 0);
        //});
        //$menu.on('itemclick', self, function (e) {
        //    $(this).css('zIndex', 0);
        //});
        records = null;

        // create tabMenu.
        var $tabMenu = self.$activeElement.parent().find('div[data-mnu="tabMenu"]');
        $tabMenu.csTabs({
            theme: self.options.theme,
            headerHeight: 20,
            width: 'auto',
            height: $('body').height(),
            showCloseButtons: true,
            selectionTracker: true,
            //animationType: 'fade',
            scrollable: true,
            keyboardNavigation: false
            //toggleMode: 'mouseenter'
        });
        options.controls.push({ name: $tabMenu[0]['id'], type: 'csTabs', level: 1 });
        options.tabMenuId = $tabMenu[0]['id'];
        $tabMenu.css('zIndex', 0);
        $menu.css('zIndex', 99999);
        $tabMenu.on('click', self, function (e) {
            var _self = e.data;
            _self.$activeElement.parent().find('#' + _self.options.menuId).css('zIndex', 0);
            //找出所有的CVMenu, 並close
            var oo = $('div[data-mnu="cvMenu"]');
            if (oo.length > 0) {
                $('div[data-mnu="cvMenu"]').jqxMenu('close');
            }
        });


        //$tabMenu.sizeChanged(function (){
        //    formResize(self, '98%');
        //});

        //$(window).on('resize', self, function (e) {
        //    formResize(e.data);
        //});
        /* 不能用 因為太早清掉了, 沒子做內容的destroy
       $tabMenu.on('removed', self, function (e) {
           var _self = e.data;
           //關閉CV時, 需將CV做destroy
           $(_self.$tabMenu.find('#' + _self.CVId)[0]).SO1100B('destroy');
           _self = null;
       });
        */

        //將預產的tabItem隱藏
        //$tabMenu.find('.jqx-tabs-title').each(function (index, element) {
        //   if (index >= 0) {
        //      $(this).hide();
        //   }
        //});
        //$("#tabMenu").csTabs('disableAt', 0);
        //$tabMenu.hide();

        var $unLock = $('div[data-mnu="mnuImg"]');
        var oo = $unLock.jqxTooltip({ theme: options.theme, content: lang.showMenu, position: 'mouse', autoHideDelay: 15000 });
        options.controls.push({ name: oo[0]['id'], type: 'jqxTooltip', level: 1 });
        $unLock.on('click', function () {
            $('div[data-mnu="mnuImg"]').css('zIndex', 0).hide();
            $menu.css('height', 25);
            formResize(self, '96%');
        });

        //初始化CV Menu
        //createCVMenu(self);
        changeLanguage(self);

        formResize(self, '96%');


        //如果有指定預設的MID==>執行的項目-->如:客服管理<--合Login時再實作
        if (self.options.mid !== '') {
            //$tabMenu.show();
            //客服管理
            self.$activeElement.parent().find('div[data-mnu="mnuSO1000"]').show();
            $tabMenu.csTabs('select', 0);
            //1系列Tab
            //$tabCustQuery.show();
            //var $elem = $('#tabCustQuery_Main_Content');
            //createCustQryContent(self, $elem);
            //createTabMenuContent(self, $elem, 'SO1100A');
        }

       //載入跑馬燈
        if (self.options['menuData']['Marquee'] != undefined) {
           $('div[data-mnu="csMarquee"]').SO0000B1({
              loginInfo: self.options.loginInfo,
              theme: $.jqx.theme,
              parameters: { Marquee: cloneJSON(self.options['menuData']['Marquee']) },
              container: $('body'),
              localization: $.jqx.localization,
           });
        } else if (self.options['menuData']['Exception'] != undefined) {
           messageBox(self.options['menuData']['Exception'].rows[0]['Message'], messageType.critical)
        }

        //initSL(self);
        lang = null;
    }
    function transHTML(self, records, mnuData, $menu, menuType) {
       //var options = self.options;
       //var lang = options.language;
       //先把母層取出
       //var records = find_in_object(data, { parentid: '-1' });
       for (var i = 0, iCnt = records.length; i < iCnt; i++) {
          mnuData.push({
             id: records[i]['id'],
             label: records[i]['label'],
             leaf: records[i]['leaf'],
             level: records[i]['level'],
             parentid: records[i]['parentid'],
             text: records[i]['text'],
             value: records[i]['value']
          });
          //把子項層全部拉成同一層
          if (records[i]['items'] != undefined) {
             changeRecordsLevel(records[i]['items'], mnuData)
          }
       }
       //依整理好的資料, 產出HTML
       if (menuType == 1) {
          renderMenu(self, mnuData, $menu);
       } else {
          renderMenu3(self, mnuData, $menu);
       }
    }
    function fixMenuCss(self) {
       switch (self.options.theme) {
          case 'ui-redmond2':
             $($.find('.jqx-menu-item-top')).css('font-size', 14);
             $($.find('.jqx-menu-ul li')).css('font-size', 14);
             $($.find('.megamenu-ul li a:link')).css('color', '#5c9ccc');
             //$($.find('.megamenu-ul li a:visited')).css('color', '#5c9ccc');
             //$($.find('.megamenu-ul li a:hover')).css('background-color', 'yellow');
             //$($.find('.megamenu-ul li a:active')).css('color', 'red');
             $($.find('.jqx-menuitem-header')).css('color', 'blue');
             break;
          default:
             $($.find('.jqx-menu-item-top')).css('font-size', 14);
             $($.find('.jqx-menu-ul li')).css('font-size', 14);
             $($.find('.megamenu-ul li a:link')).css('color', '#2d628a');
             //$($.find('.megamenu-ul li a:hover')).css('color', '#2d628a');
             //$($.find('.megamenu-ul li a:visited')).css('color', '#2d628a');
             $($.find('.jqx-menuitem-header')).css('color', '#2d628a');
             break;
       }
    }
    function changeRecordsLevel(records, mnuData) {
       //先把子項層全部拉成同一層
       for (var i = 0, iCnt = records.length; i < iCnt; i++) {
          mnuData.push({
             id: records[i]['id'],
             label: records[i]['label'],
             leaf: records[i]['leaf'],
             level: records[i]['level'],
             parentid: records[i]['parentid'],
             text: records[i]['text'],
             value: records[i]['value']
          });
          if (records[i]['items'] != undefined) {
             changeRecordsLevel(records[i]['items'], mnuData)
          }
       }
    }
    function renderMenu(self, records, $menu) {
       //計算可視區的寬度, 當作下拉Panel的寬度
       var pnlWidth = $('body').width() - 8;
       var groupCount = -1, groupWidth = 200;
       var mnuContent = '<ul>\n';
       for (var i = 0, iCnt = records.length; i < iCnt; i++) {
          //if (i == 242) {
          //    mnuContent = '';
          //}


          if (records[i]['level'] == 0) {
             //計算每個群的最大寬度
             groupCount = find_in_object(records, { parentid: records[i]['id'] }).length;
             groupWidth = Math.ceil((pnlWidth - 20) / groupCount);
             if (groupWidth > 180) {
                groupWidth = 180;
             }

             //母層格式
             //群組 開頭
             if (records[i]['value'] != 'quit') {
                mnuContent += '\t<li id="item' + i + '">\n';
                mnuContent += '\t\t' + records[i]['text'] + '\n';
                mnuContent += '\t\t<ul style="width: ' + pnlWidth + 'px;">\n';
             } else {
                mnuContent += '\t<li id="item' + i + '" item-value="' + records[i]['value'] + '">\n';
                mnuContent += '\t\t' + records[i]['text'] + '\n';
             }


             //結束
             if ((i + 1) < iCnt) {
                //mnuContent += '';
                //mnuContent += '\t</li>\n';
             } else {
                if (records[i]['value'] != 'quit') {
                   mnuContent += '\t\t</ul>\n';
                }

                mnuContent += '\t</li>\n';
             }
          } else if (records[i]['level'] == 1) {
             //子層格式
             if (records[i]['leaf'] != true) {
                mnuContent += '\t\t\t<li style="list-style: none;margin-top: 8px;" ignoretheme="true">\n';
                mnuContent += '\t\t\t\t<div>\n';
                mnuContent += '\t\t\t\t\t<div style="float: left; width: ' + groupWidth + 'px;">\n';
                mnuContent += '\t\t\t\t\t\t<div class="jqx-menuitem-header" style="color: inherit; margin-left: 5px; padding-bottom: 5px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<b>' + records[i]['text'] + '</b>\n';
                mnuContent += '\t\t\t\t\t\t</div>\n';
             } else {
                mnuContent += '\t\t\t<li style="list-style: none;margin-top: 8px;" ignoretheme="true">\n';
                mnuContent += '\t\t\t\t<div>\n';
                mnuContent += '\t\t\t\t\t<div style="float: left; width: ' + groupWidth + 'px;">\n';
                mnuContent += '\t\t\t\t\t\t<div class="jqx-menuitem-header" style="color: inherit; margin-left: 5px; padding-bottom: 5px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<b>' + records[i]['text'] + '</b>\n';
                mnuContent += '\t\t\t\t\t\t</div>\n';

                mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 15px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<li item-value="' + records[i]['value'] + '"><a href="#">' + records[i]['text'] + '</a></li>\n';
                mnuContent += '\t\t\t\t\t\t</ul>\n';
                mnuContent += '\t\t\t\t\t</div>\n';
                mnuContent += '\t\t\t\t</div>\n';
                mnuContent += '\t\t\t</li>\n';
                if ((i + 1) < iCnt) {
                   if (records[i + 1]['parentid'] == -1) {
                      mnuContent += '\t\t</ul>\n';
                   }
                }
                continue;
             }

             //結束
             if ((i + 1) < iCnt) {
                //檢查下一筆是否為同層 且 有子層
                if (records[i + 1]['leaf'] != true) {
                   if (records[i + 1]['level'] == 0) {
                      mnuContent += '\t\t</ul>\n';
                      mnuContent += '\t</li>\n';
                   }
                } else {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      //mnuContent += '\t\t</ul>\n';
                      //mnuContent += '\t</li>\n';
                   } else {
                      if (records[i]['level'] <= records[i + 1]['level']) {
                         //子層 開頭
                         mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 15px;">\n';
                      } else {
                         //子層 結束
                         mnuContent += '\t\t\t</ul>\n';
                         mnuContent += '\t\t</li>\n';
                      }
                   }
                }
             } else {
                mnuContent += '\t\t</ul>\n';
                mnuContent += '\t</li>\n';
             }
          } else if (records[i]['level'] == 2) {
             //子層格式
             if (records[i]['leaf'] != true) {
                mnuContent += '\t\t\t\t\t\t<div class="jqx-menuitem-header" style="color: inherit; margin-left: 15px; padding-bottom: 5px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<b>' + records[i]['text'] + '</b>\n';
                mnuContent += '\t\t\t\t\t\t</div>\n';
             } else {
                mnuContent += '\t\t\t\t\t\t\t<li><a href="#">' + records[i]['text'] + '</a></li>\n';
             }

             //結束
             if ((i + 1) < iCnt) {
                //檢查下一筆是否為同層 且 有子層
                if (records[i + 1]['leaf'] != true) {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      mnuContent += '\t\t\t\t\t\t</ul>\n';
                   } else if (records[i]['level'] >= records[i + 1]['level']) {
                      if (records[i + 1]['level'] == 1) {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                         mnuContent += '\t\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t</li>\n';
                         //mnuContent += '\t\t</ul>\n';
                         //mnuContent += '\t</li>\n';
                      } else {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                         mnuContent += '\t\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t</li>\n';
                         mnuContent += '\t\t</ul>\n';
                         mnuContent += '\t</li>\n';
                      }
                   }
                } else {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      //mnuContent += '\t\t\t</ul>\n';
                      //mnuContent += '\t\t</li>\n';
                   } else {
                      if (records[i]['level'] <= records[i + 1]['level']) {
                         //子層 開頭
                         mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 25px;">\n';
                      } else {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                         mnuContent += '\t\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t</li>\n';

                      }
                   }
                }
             }
          } else if (records[i]['level'] == 3) {
             //子層格式
             if (records[i]['leaf'] != true) {
                mnuContent += '\t\t\t\t\t\t<div class="jqx-menuitem-header" style="color: inherit; margin-left: 25px; padding-bottom: 5px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<b>' + records[i]['text'] + '</b>\n';
                mnuContent += '\t\t\t\t\t\t</div>\n';
             } else {
                mnuContent += '\t\t\t\t\t\t\t<li><a href="#">' + records[i]['text'] + '</a></li>\n';
             }

             //結束
             if ((i + 1) < iCnt) {
                //檢查下一筆是否為同層 且 有子層
                if (records[i + 1]['leaf'] != true) {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      mnuContent += '\t\t\t\t\t\t</ul>\n';
                   } else if (records[i]['level'] >= records[i + 1]['level']) {
                      if (records[i + 1]['level'] == 1) {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                         //回群組頭
                         mnuContent += '\t\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t</li>\n';
                      } else {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                      }
                   }
                } else {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      //mnuContent += '\t\t\t</ul>\n';
                      //mnuContent += '\t\t</li>\n';
                   } else {
                      if (records[i]['level'] <= records[i + 1]['level']) {
                         //子層 開頭
                         mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 30px;">\n';
                      } else if (records[i]['level'] >= records[i + 1]['level']) {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                         //子層 開頭
                         mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 15px;">\n';
                      } else {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                      }
                   }
                }
             }
          } else if (records[i]['level'] == 4) {
             //子層格式
             if (records[i]['leaf'] != true) {
                mnuContent += '\t\t\t\t\t\t<div class="jqx-menuitem-header" style="color: inherit; margin-left: 25px; padding-bottom: 5px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<b>' + records[i]['text'] + '</b>\n';
                mnuContent += '\t\t\t\t\t\t</div>\n';
             } else {
                mnuContent += '\t\t\t\t\t\t\t<li><a href="#">' + records[i]['text'] + '</a></li>\n';
             }

             //結束
             if ((i + 1) < iCnt) {
                //檢查下一筆是否為同層 且 有子層
                if (records[i + 1]['leaf'] != true) {
                   if (records[i]['level'] == records[i + 1]['level']) {

                   }
                } else {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      //mnuContent += '\t\t\t</ul>\n';
                      //mnuContent += '\t\t</li>\n';
                   } else {
                      if (records[i]['level'] <= records[i + 1]['level']) {
                         //子層 開頭
                         mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 35px;">\n';
                      } else if (records[i]['level'] >= records[i + 1]['level']) {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                         //子層 開頭
                         mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 25px;">\n';
                      } else {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                      }
                   }
                }
             }

          } else if (records[i]['level'] == 5) {
             //子層格式
             if (records[i]['leaf'] != true) {
                mnuContent += '\t\t\t\t\t\t<div class="jqx-menuitem-header" style="color: inherit; margin-left: 25px; padding-bottom: 5px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<b>' + records[i]['text'] + '</b>\n';
                mnuContent += '\t\t\t\t\t\t</div>\n';
             } else {
                mnuContent += '\t\t\t\t\t\t\t<li><a href="#">' + records[i]['text'] + '</a></li>\n';
             }

             //結束
             if ((i + 1) < iCnt) {
                //檢查下一筆是否為同層 且 有子層
                if (records[i + 1]['leaf'] != true) {
                   if (records[i]['level'] == records[i + 1]['level']) {

                   }
                } else {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      //mnuContent += '\t\t\t</ul>\n';
                      //mnuContent += '\t\t</li>\n';
                   } else {
                      if (records[i]['level'] <= records[i + 1]['level']) {
                         //子層 開頭
                         mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 40px;">\n';
                      } else if (records[i]['level'] >= records[i + 1]['level']) {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                         //子層 開頭
                         mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 40px;">\n';
                      } else {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                      }
                   }
                }
             }

          }
       }
       mnuContent += '</ul>'
       $menu[0].innerHTML = mnuContent;
    }
    function renderMenu2(self, records, $menu) {
       var itemValue = {};
       //計算可視區的寬度, 當作下拉Panel的寬度
       var pnlWidth = $('body').width() - 9;
       var groupCount = -1, groupWidth = 200;
       var mnuContent = '<ul>\n';
       for (var i = 0, iCnt = records.length; i < iCnt; i++) {
          //if (i == 242) {
          //    mnuContent = '';
          //}


          if (records[i]['level'] == 0) {
             //計算每個群的最大寬度
             groupCount = find_in_object(records, { parentid: records[i]['id'] }).length;
             groupWidth = Math.ceil((pnlWidth - 20) / groupCount);
             if (groupWidth > 200) {
                groupWidth = 200;
             }

             //母層格式
             //群組 開頭
             if (records[i]['value'] != 'quit') {
                mnuContent += '\t<li id="item' + i + '">\n';
                mnuContent += '\t\t' + records[i]['text'] + '\n';
                mnuContent += '\t\t<ul style="width: ' + pnlWidth + 'px;opacity:0.95;">\n';
             } else {
                mnuContent += '\t<li id="item' + i + '" item-value="' + records[i]['value'] + '">\n';
                mnuContent += '\t\t' + records[i]['text'] + '\n';
             }


             //結束
             if ((i + 1) < iCnt) {
                //mnuContent += '';
                //mnuContent += '\t</li>\n';
             } else {
                if (records[i]['value'] != 'quit') {
                   mnuContent += '\t\t</ul>a\n';
                }

                mnuContent += '\t</li>\n';
             }
          } else if (records[i]['level'] == 1) {
             //子層格式
             if (records[i]['leaf'] != true) {
                mnuContent += '\t\t\t<li style="list-style: none;margin-top: 8px;" ignoretheme="true">\n';
                mnuContent += '\t\t\t\t<div>\n';
                mnuContent += '\t\t\t\t\t<div style="float: left; width: ' + groupWidth + 'px;">\n';
                mnuContent += '\t\t\t\t\t\t<div class="jqx-menuitem-header" style="color: inherit; margin-left: 5px; padding-bottom: 5px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<b>' + records[i]['text'] + '</b>\n';
                mnuContent += '\t\t\t\t\t\t</div>\n';
             } else {
                mnuContent += '\t\t\t<li style="list-style: none;margin-top: 8px;" ignoretheme="true">\n';
                mnuContent += '\t\t\t\t<div>\n';
                mnuContent += '\t\t\t\t\t<div style="float: left; width: ' + groupWidth + 'px;">\n';
                mnuContent += '\t\t\t\t\t\t<div class="jqx-menuitem-header" style="color: inherit; margin-left: 5px; padding-bottom: 5px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<b>' + records[i]['text'] + '</b>\n';
                mnuContent += '\t\t\t\t\t\t</div>\n';

                mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 15px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<li item-value="' + records[i]['value'] + '"><a href="#">' + records[i]['text'] + '</a></li>\n';
                mnuContent += '\t\t\t\t\t\t</ul>\n';
                mnuContent += '\t\t\t\t\t</div>\n';
                mnuContent += '\t\t\t\t</div>\n';
                mnuContent += '\t\t\t</li>\n';
                if ((i + 1) < iCnt) {
                   if (records[i + 1]['parentid'] == -1) {
                      mnuContent += '\t\t</ul>\n';
                      mnuContent += '\t</li>\n';
                   }
                }
                continue;
             }

             //結束
             if ((i + 1) < iCnt) {
                //檢查下一筆是否為同層 且 有子層
                if (records[i + 1]['leaf'] != true) {
                   if (records[i + 1]['level'] == 0) {
                      mnuContent += '\t\t</ul>\n';
                      mnuContent += '\t</li>\n';
                   }
                } else {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      //mnuContent += '\t\t</ul>\n';
                      //mnuContent += '\t</li>\n';
                   } else {
                      if (records[i]['level'] <= records[i + 1]['level']) {
                         //子層 開頭
                         mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 15px;">\n';
                      } else {
                         //子層 結束
                         mnuContent += '\t\t\t</ul>\n';
                         mnuContent += '\t\t</li>\n';
                      }
                   }
                }
             } else {
                mnuContent += '\t\t</ul>\n';
                mnuContent += '\t</li>\n';
             }
          } else if (records[i]['level'] == 2) {
             //子層格式
             if (records[i]['leaf'] != true) {
                itemValue = $.parseJSON(decodeURIComponent(records[i]['value']));
                mnuContent += '\t\t\t\t\t\t<div id="mnu_' + itemValue['MID'] + '" parentid="' + records[i]['id'] + '" item-value="' + records[i]['value'] + '" style="background:white;color:rgb(92,156,204);border: none;font-size:14px;">' + records[i]['text'] + '</div>\n';
             } else {
                if (records[i]['level'] < records[i - 1]['level']) {
                   //子層 開頭
                   mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 15px;">\n';
                   mnuContent += '\t\t\t\t\t\t\t<li item-value="' + records[i]['value'] + '"><a href="#">' + records[i]['text'] + '</a></li>\n';
                } else {
                   mnuContent += '\t\t\t\t\t\t\t<li item-value="' + records[i]['value'] + '"><a href="#">' + records[i]['text'] + '</a></li>\n';
                }
             }

             //結束
             if ((i + 1) < iCnt) {
                //檢查下一筆是否為同層 且 有子層
                if (records[i + 1]['leaf'] != true) {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      mnuContent += '\t\t\t\t\t\t</ul>\n';
                   } else if (records[i]['level'] >= records[i + 1]['level']) {
                      if (records[i + 1]['level'] == 1) {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                         mnuContent += '\t\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t</li>\n';
                      } else {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                         mnuContent += '\t\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t</li>\n';
                         mnuContent += '\t\t</ul>\n';
                         mnuContent += '\t</li>\n';
                      }
                   }
                } else {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      //mnuContent += '\t\t\t</ul>\n';
                      //mnuContent += '\t\t</li>\n';
                   } else {
                      if (records[i]['level'] < records[i + 1]['level']) {
                         //子層 開頭
                         ////mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 25px;">\n';
                      } else {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                         mnuContent += '\t\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t</li>\n';
                      }
                   }
                }
             }
          } else {
             if (records[i + 1]['level'] == 1) {
                //子層 結束
                mnuContent += '\t\t\t\t\t</div>\n';
                mnuContent += '\t\t\t\t</div>\n';
                mnuContent += '\t\t\t</li>\n';
             }
          }
       }
       mnuContent += '</ul>'
       $menu[0].innerHTML = mnuContent;
    }
    function renderMenu3(self, records, $menu) {
       var itemValue = {};
       //計算可視區的寬度, 當作下拉Panel的寬度
       var pnlWidth = $('body').width() - 9;
       var groupCount = -1, groupWidth = 200;
       var mnuContent = '<ul>\n', padStr = '';
       for (var i = 0, iCnt = records.length; i < iCnt; i++) {
          if (i >= 72) {
             mnuContent = mnuContent;
          }


          if (records[i]['level'] == 0) {
             //計算每個群的最大寬度
             groupCount = find_in_object(records, { parentid: records[i]['id'] }).length;
             groupWidth = Math.ceil((pnlWidth - 20) / groupCount);
             if (groupWidth > 200) {
                groupWidth = 200;
             }

             //母層格式
             //群組 開頭
             if (records[i]['value'] != 'quit') {
                if (groupCount == 7) {
                   padStr = 'padding-left:' + ((pnlWidth - groupWidth * 7) / 2) + 'px;';
                } else if (groupCount == 6) {
                   padStr = 'padding-left:' + ((pnlWidth - groupWidth * 6) / 2) + 'px;';
                } else if (groupCount == 5) {
                   padStr = 'padding-left:' + ((pnlWidth - groupWidth * 5) / 2) + 'px;';
                } else if (groupCount == 4) {
                   padStr = 'padding-left:' + ((pnlWidth - groupWidth * 4) / 2) + 'px;';
                } else if (groupCount == 3) {
                   padStr = 'padding-left:400px;';
                } else if (groupCount == 2) {
                   padStr = 'padding-left:400px;';
                } else if (groupCount == 1) {
                   padStr = 'padding-left:350px;';
                } else {
                   padStr = 'padding-left:2px;';
                }
                mnuContent += '\t<li id="item' + i + '">\n';
                mnuContent += '\t\t' + records[i]['text'] + '\n';
                mnuContent += '\t\t<ul style="width: ' + pnlWidth + 'px;opacity:0.95;' + padStr + '">\n';
             } else {
                mnuContent += '\t<li id="item' + i + '" item-value="' + records[i]['value'] + '">\n';
                mnuContent += '\t\t' + records[i]['text'] + '\n';
             }


             //結束
             if ((i + 1) < iCnt) {
                if (records[i + 1]['level'] == 0) {
                   mnuContent += '\t\t</ul>\n';
                   mnuContent += '\t</li>\n';
                }
                //mnuContent += '';
                //mnuContent += '\t</li>\n';
             } else {
                if (records[i]['value'] != 'quit') {
                   mnuContent += '\t\t</ul>a\n';
                }
                
                mnuContent += '\t</li>\n';
             }
          } else if (records[i]['level'] == 1) {
             //子層格式
             if (records[i]['leaf'] != true) {
                mnuContent += '\t\t\t<li style="list-style: none;margin-top: 8px;" ignoretheme="true">\n';
                mnuContent += '\t\t\t\t<div>\n';
                mnuContent += '\t\t\t\t\t<div style="float: left; width: ' + groupWidth + 'px;">\n';
                mnuContent += '\t\t\t\t\t\t<div class="jqx-menuitem-header" style="color: inherit; margin-left:5px;padding-bottom:4px;max-width:150px;border-width:3px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<b>' + records[i]['text'] + '</b>\n';
                mnuContent += '\t\t\t\t\t\t</div>\n';
             } else {
                mnuContent += '\t\t\t<li style="list-style: none;margin-top: 8px;" ignoretheme="true">\n';
                mnuContent += '\t\t\t\t<div>\n';
                mnuContent += '\t\t\t\t\t<div style="float: left; width: ' + groupWidth + 'px;">\n';
                mnuContent += '\t\t\t\t\t\t<div class="jqx-menuitem-header" style="color: inherit; margin-left:5px;padding-bottom:4px;max-width:150px;border-width:3px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<b>' + records[i]['text'] + '</b>\n';
                mnuContent += '\t\t\t\t\t\t</div>\n';

                mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 15px;">\n';
                mnuContent += '\t\t\t\t\t\t\t<li item-value="' + records[i]['value'] + '"><a href="#">' + records[i]['text'] + '</a></li>\n';
                mnuContent += '\t\t\t\t\t\t</ul>\n';
                mnuContent += '\t\t\t\t\t</div>\n';
                mnuContent += '\t\t\t\t</div>\n';
                mnuContent += '\t\t\t</li>\n';
                if ((i + 1) < iCnt) {
                   if (records[i + 1]['parentid'] == -1) {
                      mnuContent += '\t\t</ul>\n';
                      mnuContent += '\t</li>\n';
                   }
                }
                continue;
             }

             //結束
             if ((i + 1) < iCnt) {
                //檢查下一筆是否為同層 且 有子層
                if (records[i + 1]['leaf'] != true) {
                   if (records[i + 1]['level'] == 0) {
                      mnuContent += '\t\t</ul>\n';
                      mnuContent += '\t</li>\n';
                   }
                } else {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      //mnuContent += '\t\t</ul>\n';
                      //mnuContent += '\t</li>\n';
                   } else {
                      if (records[i]['level'] <= records[i + 1]['level']) {
                         //子層 開頭
                         mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 15px;">\n';
                      } else {
                         //子層 結束
                         mnuContent += '\t\t\t</ul>\n';
                         mnuContent += '\t\t</li>\n';
                      }
                   }
                }
             } else {
                mnuContent += '\t\t</ul>\n';
                mnuContent += '\t</li>\n';
             }
          } else if (records[i]['level'] == 2) {
             //子層格式
             if (records[i]['leaf'] != true) {
                itemValue = $.parseJSON(decodeURIComponent(records[i]['value']));
                mnuContent += '\t\t\t\t\t\t<div id="mnu_' + itemValue['MID'] + '" class="contextMenu" style="margin-left:15px;line-height:25px;color:rgb(92,156,204);font-size:14px;"><span style="border: none; background-color: transparent; float: right; margin-top: 6px;margin-right: 16px;" class="jqx-menu-item-arrow-right jqx-menu-item-arrow-right-ui-redmond2 jqx-icon-arrow-right jqx-icon-arrow-right-ui-redmond2"></span>' + records[i]['text'] + '</div><div id="popupItem_' + itemValue['MID'] + '" parentid="' + records[i]['id'] + '" item-value="' + records[i]['value'] + '"></div>\n';
             } else {
                if (records[i]['level'] < records[i - 1]['level']) {
                   //子層 開頭
                   mnuContent += '\t\t\t\t\t\t<ul class="megamenu-ul" style="margin-left: 15px;">\n';
                   mnuContent += '\t\t\t\t\t\t\t<li item-value="' + records[i]['value'] + '"><a href="#">' + records[i]['text'] + '</a></li>\n';
                } else {
                   mnuContent += '\t\t\t\t\t\t\t<li item-value="' + records[i]['value'] + '"><a href="#">' + records[i]['text'] + '</a></li>\n';
                }
             }

             //結束
             if ((i + 1) < iCnt) {
                //檢查下一筆是否為同層 且 有子層
                if (records[i + 1]['leaf'] != true) {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      mnuContent += '\t\t\t\t\t\t</ul>\n';
                   } else if (records[i]['level'] >= records[i + 1]['level']) {
                      if (records[i + 1]['level'] == 1) {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                         mnuContent += '\t\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t</li>\n';
                      } else {
                         //子層 結束
                         mnuContent += '\t\t\t\t\t\t</ul>\n';
                         mnuContent += '\t\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t\t</div>\n';
                         mnuContent += '\t\t\t</li>\n';
                         mnuContent += '\t\t</ul>\n';
                         mnuContent += '\t</li>\n';
                      }
                   }
                } else {
                   if (records[i]['level'] == records[i + 1]['level']) {
                      //mnuContent += '\t\t\t</ul>\n';
                      //mnuContent += '\t\t</li>\n';
                   } else {
                      if (records[i]['level'] < records[i + 1]['level']) {
                         if (records[i]['leaf'] != true) {
                            if (records[i]['level'] != records[i + 1]['level']) {
                               //功能表的結束 回到根層
                               //mnuContent += '\t\t\t\t\t</div>\n';
                               //mnuContent += '\t\t\t\t</div>\n';
                               //mnuContent += '\t\t\t</li>\n';
                               //mnuContent += '\t\t</ul>\n';
                            }
                         }
                      } else {
                         if (records[i + 1]['level'] == 0) {
                            //子層 結束 回到根層
                            mnuContent += '\t\t\t\t\t\t</ul>\n';
                            mnuContent += '\t\t\t\t\t</div>\n';
                            mnuContent += '\t\t\t\t</div>\n';
                            mnuContent += '\t\t\t</li>\n';
                            mnuContent += '\t\t</ul>\n';
                            mnuContent += '\t</li>\n';
                         } else {
                            //子層 結束
                            mnuContent += '\t\t\t\t\t\t</ul>\n';
                            mnuContent += '\t\t\t\t\t</div>\n';
                            mnuContent += '\t\t\t\t</div>\n';
                            mnuContent += '\t\t\t</li>\n';
                         }
                      }
                   }
                }
             }
          } else {
             if (records[i + 1]['level'] == 1) {
                //子層 結束
                mnuContent += '\t\t\t\t\t</div>\n';
                mnuContent += '\t\t\t\t</div>\n';
                mnuContent += '\t\t\t</li>\n';
             } else if (records[i + 1]['level'] == 0) {
                //子層 結束
                mnuContent += '\t\t\t\t\t</div>\n';
                mnuContent += '\t\t\t\t</div>\n';
                mnuContent += '\t\t\t</li>\n';
                mnuContent += '\t\t</ul>\n';
             }
          }
       }
       mnuContent += '</ul>'
       $menu[0].innerHTML = mnuContent;
    }


    function addHandertControls(self) {
        try {
            var options = self.options;
            var lang = options.language;
            var menuId = self.options.menuId;

            self.$activeElement.parent().find('#' + menuId + ',div[id^="popupItem_"]').on('itemclick', function (event) {
               if (event.args['id'].indexOf('item') >= 0) {
                  options.menuItem = event.args['id'];
               } 
              
                var rowData = {};
                var itemValue = $(event.args).attr('item-value');
                if (itemValue == 'quit') {
                   logout_SO025A(self, function (e) {
                      sessionStorage.removeItem('loginResult');
                      //window.location.replace("login.html?Key=" + guid());
                      window.location.href = "login.html?Key=" + guid();
                      return;
                   });
                } else if (itemValue == 'switch') {
                   showSwitchDB(self);
                   return false;
                } else {
                   if (itemValue != undefined) {
                      rowData = $.parseJSON(decodeURIComponent(itemValue));
                      if (convertNullToString(rowData.SYSPROGRAMID) == '') {
                         return false;
                      }
                   } else {
                      return false;
                   }
                }

                $("div[id^='popupItem_']").each(function () {
                   $(this).jqxMenu('close');
                });
               //$(".jqx-menu-popup.jqx-menu-popup").hide();
                if (options.menuItem != '') {
                   $('#' + self.options.menuId).jqxMenu('closeItem', options.menuItem);
                }

                var sId = '', progId = '', titleText = '';
                if (rowData.SYSPROGRAMID === undefined) {
                    sId = $(event.args).text().substring(0, 1);
                    if (sId === '1') {
                        return false;
                    }
                } else {
                    progId = rowData.SYSPROGRAMID;
                    if (progId != 'Customer.Query')
                        titleText = String.format('{0}【{1}】', $(event.args).text(), progId);
                    else
                        titleText = $(event.args).text();
                    sId = progId.substring(0, 4);

                    if (progId === '' && titleText === '') {
                        return false;
                    }
                }

                var $tabMenu = self.$activeElement.parent().find("#" + options.tabMenuId);
                $tabMenu.show();
                if (options.custQueryFlag != true) {
                    self.$activeElement.parent().find('li[data-mnu="mnuSO1000"]').hide();
                }
                //$tabMenu.on('tabclick', function (e) {
                //    try {
                //        //取出頁簽內裝的子功能, 執行一次resize
                //        var oo = $(this).csTabs('getContentAt', e.args.item);
                //        var winId = $(oo.find('div[winid]')[0]).attr('winid');
                //        var contentId = $(oo.find('div[winid]')[0]).attr('contentid');
                //        var htmlName = $(oo.find('div[winid]')[0]).attr('htmlname');
                //        if (winId !== undefined && contentId != undefined) {
                //            $('#' + contentId)[htmlName]('resize');
                //        } else {
                //            //oo[oo.HTMLNAME]('resize');
                //        }
                //    } catch (err) {
                //        errorHandle(formName, '$tabMenu_selected', err);
                //    }
                //});

                //客服管理

                if (sId === 'Cust') {
                    options.custQueryFlag = true;
                    self.$activeElement.parent().find('li[data-mnu="mnuSO1000"]').show();
                    $tabMenu.csTabs('select', 0);
                    if ($($tabMenu.csTabs('getContentAt', 0)).text().trim() === '') {
                        $tabMenu.csTabs('setTitleAt', 0, titleText);
                        var $elem = self.$activeElement.parent().find('div[data-mnu="tabCustQuery_Main_Content"]');
                        $elem.prop('id', 'tabCustQuery_Main_Content_' + getUniqueId());
                        createTabMenuContent(self, $elem, rowData, undefined, $($tabMenu.csTabs('getContentAt', 0)));
                        $elem = null;
                    }
                } else {
                    //檢查TabMenu是否已經存在, 如果存在就跳顯 
                    var rtnValue = getTabItemIndexByTitle($tabMenu, titleText);
                    if (rtnValue >= 0) {
                        $tabMenu.csTabs('select', rtnValue);
                    } else { //否則就新增一個TabMenu
                        var tabId = 'tabItem_' + progId;
                        var html = '', expandId = null, $expand, win = null;
                        if (rowData.HTMLNAME != undefined && rowData.HTMLNAME != null && rowData.FORMWIDTH != undefined && rowData.FORMWIDTH > 0 && rowData.FORMHEIGHT != undefined && rowData.FORMHEIGHT > 0) {
                            //用csWindow包住子功能
                            expandId = tabId + '_csw_' + getUniqueId();
                            html = '<div id = "' + expandId + '" style="height:100%;margin:0px 3px 0px 3px;"></div>';
                            //html = '<div id = "' + expandId + '" style="height:' + ($tabMenu.height()-80) + ';margin:0px 3px 0px 3px;"></div>';
                            // WINID="" CONTENTID="" HTMLNAME="' + rowData.HTMLNAME + '"
                            /*
                            //用jqxExpand包住子功能
                            //expandId = tabId + '_gbx_' + getUniqueId();
                            html = '<div id="' + expandId + '" style="margin-left:auto;margin-right:auto;margin-top:2px;"><div>' + rowData.PROMPT + '</div><div style="overflow-x:hidden;">';
                            //子功能
                            //html += '<div id = "' + tabId + '" style="width:100%;height:100%;margin-left:auto;margin-right:auto;margin-top:2px;margin-bottom:2px;;padding:20px;border:1px outset blue;"></div>';
                            html += '<div id = "' + tabId + '" style="width:100%;height:100%;margin-left:auto;margin-right:auto;margin-top:2px;"></div>';
                            html += '</div ></div >';
                            */
                        } else {
                            //試....用csWindow包住子功能
                            expandId = tabId + '_csw_' + getUniqueId();
                            //html = '<div id = "' + tabId + '" style="height:100%;margin:0px 3px 0px 3px;"></div>';
                            html = '<div id = "' + expandId + '" style="height:100%;margin:0px 3px 0px 3px;"></div>';
                            // WINID="" CONTENTID="" HTMLNAME="' + rowData.HTMLNAME + '"
                        }

                        //var _closeButton = closeButton.replace('data-cv=""', 'data-cv="closeButton_' + progId + '"');
                        //$tabMenu.csTabs('addLast', titleText + _closeButton, html); //addAt
                        $tabMenu.csTabs('addLast', titleText, html); //addAt
                        if (expandId != null) {
                            //Render csWindow
                            win = showTabWindow(self, $tabMenu, expandId, rowData);
                            //$('#' + expandId).attr('winid', win.windowId);
                            //$('#' + expandId).attr('contentid', win.contentId);
                            //$('#' + expandId).attr('htmlname', rowData.HTMLNAME);
                            //$('#' + win.contentId).css('overflow', 'scroll');
                        }

                        /*
                        if (expandId != null) {
                          //Render jqxExpand
                          $tabMenu.find('#' + expandId).jqxExpander({
                            theme: options.theme,
                            showArrow: false,
                            expanded: true,
                            toggleMode: 'none',
                            width: rowData.FORMWIDTH,
                            height: rowData.FORMHEIGHT
                          });
                        }
                        */

                        //因為元件的removed 太早清了, 不能做destroy 只好自己做
                        //$tabMenu.find('.jqx-tabs-close-button').on('click', { $tabMenu: $tabMenu, CVId: tabId, htmlName: rowData.HTMLNAME, titleText: titleText }, function (e) {
                        //改成取出建立在 ul="tabMenu_List"中的li集合
                        var $closeButton = $tabMenu.find('ul[data-mnu="tabMenu_List"] li').eq($tabMenu.csTabs('val')).find('.jqx-tabs-close-button');
                        $closeButton.off();
                        //$tabMenu.find('div[data-cv="closeButton_' + progId + '"]').on('click', { $tabMenu: $tabMenu, CVId: tabId, htmlName: rowData.HTMLNAME, titleText: titleText }, function (e) {
                        $closeButton.on('click', { $tabMenu: $tabMenu, CVId: tabId, htmlName: rowData.HTMLNAME, titleText: titleText, expandId: expandId }, function (e) {
                            $(this).off();
                            var _self = e.data;
                            //明確取得 X 所在的頁簽index
                            var _rtnValue = getTabItemIndexByTitle(_self.$tabMenu, _self.titleText);  //$(this).prev().parent().text()
                            if (_rtnValue >= 0) {
                                //關閉TabItem時, 需將TabItem做destroy
                                try {
                                    $(_self.$tabMenu.find('#' + _self.CVId)[0])[_self.htmlName]('destroy');
                                    if (expandId != null) {
                                        _self.$tabMenu.find('#' + expandId).csWindow('destroy');
                                    }
                                } catch (e) { }
                                _self.$tabMenu.csTabs('removeAt', _rtnValue);
                            }
                            _rtnValue = null;
                            return false;
                        });

                        var $elem;
                        if (win == null) {
                            $elem = $tabMenu.find('#' + tabId);
                        } else {
                            $elem = $tabMenu.find('#' + win.contentId);
                        }
                        createTabMenuContent(self, $elem, rowData, win, $($tabMenu.csTabs('getContentAt', $tabMenu.csTabs('val'))));
                        tabId = null;
                        html = null;
                    }
                }

                sId = null;
                progId = null;
                titleText = null;
                menuId = null;
                rowData = null;
                //$tabMenu = null;
            });  //itemclick
        }
        catch (err) {
            errorHandle(formName, 'addHandertControls', err);
        }
    }
    function showTabWindow(self, $tabMenu, expandId, rowData) {
       try {
          var options = self.options;
            var adjFlag = false;
            //取得頁簽的高度
            if (($tabMenu.height() - 40) < rowData.FORMHEIGHT) {
                rowData.FORMHEIGHT = $tabMenu.height() - 40;
                adjFlag = true;   //true??????
            }

            var width = rowData.FORMWIDTH + 10;
            var height = rowData.FORMHEIGHT + 30;
            if (adjFlag == true)
                height = rowData.FORMHEIGHT

            var winOptions
            if (rowData.FORMWIDTH == undefined || rowData.FORMHEIGHT == undefined) {
                winOptions = {
                    width: '100%',
                    height: $tabMenu.height(),
                    minHeight: 80,
                    minWidth: 80,
                    maxWidth: $('body').width(),
                    maxHeight: $('body').height(),
                    position: { x: 0, y: 60 },
                    closeButtonAction: 'close',
                    hasClosing: false,
                    resizable: false,
                    theme: $.jqx.theme,
                    hideHeader: true
                };
            } else {
                width = $('body').width() > width ? width : $('body').width();
                height = $('body').height() > height ? height : $('body').height();
                var x = ($('body').width() - width) / 2;
                var y = (($('body').height() - height) / 2);
                if (adjFlag == true)
                    y = (($('body').height() - height) / 2) + 25;
                winOptions = {
                    width: width,
                    height: height,
                    minHeight: 80,
                    minWidth: 80,
                    maxWidth: $('body').width(),
                    maxHeight: $('body').height(),
                    position: { x: x, y: y },
                    closeButtonAction: 'close',
                    hasClosing: false,
                    resizable: false,
                    theme: $.jqx.theme
                };
            }
            var win = createcsWindow($('#' + expandId), rowData.PROMPT + '【' + rowData.SYSPROGRAMID + '】', winOptions);
            //options.controls.push({ name: win.contentId, type: rowData.HTMLNAME, level: 1000 });
            $('#' + win.windowId).on('close', function (e) {
                if (rowData.HTMLNAME != undefined)
                    $('#' + win.contentId)[rowData.HTMLNAME]('destroy');
                $(this).csWindow('destroy');
                $tabMenu.csTabs('removeAt', $tabMenu.val());
            });
            return win;
        } catch (err) {
            errorHandle(formName, 'showTabWinddow', err);
        }
    }
    function changeLanguage(self) {
        try {
            var lang = self.options.language;
            self.$activeElement.parent().find('div[data-mnu="tabItem_CustQuery"]').text(lang.tabItem_CustQuery);
        } catch (err) {
            errorHandle(formName, 'changeLanguage', err);
        }
    }

    function find_in_object(my_object, my_criteria) {

        return my_object.filter(function (obj) {
            return Object.keys(my_criteria).every(function (c) {
                return obj[c] == my_criteria[c];
            });
        });
    }
    function getTabItemIndexByAddrNo($elem, addrNo) {
        var iPos = -1;
        var tabText = 'cvItem_addr_' + addrNo;
        for (var i = 0, cnt = $elem.csTabs('length'); i < cnt; i++) {
            if ($($elem.csTabs('getContentAt', i)).find('div[id="' + tabText + '"]').length > 0) {
                iPos = i;
                break;
            }
        }

        return iPos;
    }
    function getTabItemIndexByTitle($elem, itemText) {
        var iPos = -1;
        iPos = itemText.indexOf('】');
        if (iPos > 0) {
            itemText = itemText.substring(0, iPos + 1);
        }

        iPos = -1;
        for (var i = 0, cnt = $elem.csTabs('length'); i <= cnt - 1; i++) {
            if ($elem.csTabs('getTitleAt', i) === itemText) {
                iPos = i;
                break;
            }
        }

        return iPos;
    }
    function toDataSet(tbName, rowData) {
        try {
            var ds = {},
                columns = [],
                rows = [],
                keys = Object.keys(rowData);

            for (var i = 0, cnt = keys.length; i <= cnt - 1; i++) {
                columns.push({ 'name': keys[i], 'type': 'string' });
            }

            rows.push(rowData);
            ds[tbName] = { 'columns': columns, 'rows': rows };

            keys = null;
            columns = null;
            rows = null;

            return ds;
        } catch (err) {
            errorHandle(formName, 'toDataSet', err);
        }
    }
    function logout_SO025A(self, action) {
        try {
            var paraLoginInfo = getParaLoginInfo(self.$activeElement[0], formName);
            var parameters = $.extend({}, paraLoginInfo,
                { SO025A_rowId: { type: 'string', value: $.jqx.SO025A_rowId } },
                { isLogoutAll: { type: 'integer', value: 0 } });
            var params = getParameters(riadllName, riaClassName,
                'Logout_SO025A',
                JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    if (data != undefined && data.ErrorCode == 0) {
                        delete parameters;
                        delete params;
                        if (data.ResultBoolean == true) {
                           messageBox(self.options.language.success_Logout, null, null, function () {
                              action([true]);
                           });
                        }
                        else {
                            action([false, data.ErrorMessage]);
                        }
                    } else {
                        if (typeof data === 'string') {
                            messageBox(data, messageType.critical);
                        } else {
                            messageBox(data.ErrorMessage, messageType.critical);
                        }
                    }
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'logout_SO025A ', err);
        }
    }


    function createTabMenuContent(self, $elem, rowData, win, tabContainer) {
        try {
            var loginInfo = self.options.loginInfo;
            var lang = self.options.language;
            //$elem.height(screen.availHeight - 120); //212
            if (convertNullToString(rowData.HTMLNAME) != '') {
                //HTML5 
                if ($elem[rowData.HTMLNAME] != undefined) {
                    //if (rowData.FORMWIDTH != undefined && rowData.FORMWIDTH > 0 && rowData.FORMHEIGHT != undefined && rowData.FORMHEIGHT > 0) {
                    //    $elem.width(rowData.FORMWIDTH);
                    //    $elem.height(rowData.FORMHEIGHT)
                    //    //if ($elem.height() < rowData.FORMHEIGHT) {
                    //    //    rowData.FORMHEIGHT = $elem.height();
                    //    //} else {
                    //    //    $elem.height(rowData.FORMHEIGHT);
                    //    //}
                    //}
                    var container = $elem;
                    if (win !== undefined && win !== null) {
                        container = $('#' + win.windowId);
                    }
                    $elem.on('loaded', function (event) {
                        $elem[rowData.HTMLNAME]('resize');
                    })
                    $elem[rowData.HTMLNAME]($.extend({}, {
                        loginInfo: cloneJSON(loginInfo),
                        container: container,
                        //programId: programId,
                        sysProgramId: rowData.SYSPROGRAMID,
                        parentData: null,
                        tabContainer: tabContainer,
                        theme: self.options.theme,
                        localization: self.options.localization,
                        refNo: rowData.REFNO
                    }));
                    self.options.controls.push({ name: $elem[0]['id'], type: rowData.HTMLNAME, isMenuItem: true, level: 1002 });
                } else {
                    messageBox(String.format(lang.noDefineHtmlName, rowData.HTMLNAME), messageType.critical);
                    return false;
                }
            } else {
                //Silverlight
                //load_Silverlight(self, $elem, rowData);
            }
            loginInfo = null;
            lang = null;

            return true;
        }
        catch (err) {
            errorHandle(formName, 'createTabMenuContent ', err);
        }
        return false;
    } //createTabMenuContent
    function createTabCVContent(self, $elem, parentData) {
        try {
            $elem.SO1100B($.extend({}, {
                loginInfo: cloneJSON(self.cv_loginInfo),
                container: $elem,
                parentData: parentData, //parentData.data
                tabMenuId: self.options.tabMenuId,
                tabId: self.options.tabId,
                theme: self.options.theme,
                localization: self.options.localization
            }));
            self.options.controls.push({ name: $elem[0]['id'], type: 'SO1100B', level: 1001 });
            return "";
        }
        catch (err) {
            errorHandle(formName, 'createTabCVContent ', err);
        }
    } 
    
    function showSwitchDB(self, cvSpeakingSkillId, rowData) {
       var options = self.options;
       var width = 280;
       var height = 355;
       width = $(options.container).width() > width ? width : $(options.container).width();
       height = $(options.container).height() > height ? height : $(options.container).height();
       var x = ($(options.container).width() - width) / 2;
       var y = ($(options.container).height() - height) / 2;
       var winOptions = {
          width: width,
          height: height,
          minHeight: 200,
          minWidth: 100,
          maxWidth: $(options.container).width(),
          maxHeight: $(options.container).height(),
          position: { x: x, y: y },
          closeButtonAction: 'close',
          hasClosing: true,
          resizable: false,
          theme: options.theme
       };
       var $elem = $('#cswCanChooseCompCode');
       $elem.show();
       var win = createcsWindow($elem, options.language['Title_CanChooseCompCode'], winOptions);
       $('#' + win.contentId).SO0000B3({
          loginInfo: self.options.loginInfo,
          theme: self.options.theme,
          container: $('#' + win.windowId),
          parameters: null,
          localization: $.jqx.localization,
       });
       $('#' + win.windowId).on('close', function (e) {
          var suboptions = $('#' + win.contentId)['SO0000B3']('options');
          $(this).csWindow('destroy');

          //切換功能表程序
          if (suboptions.isSaved == true && options.loginInfo.loginInfo.rows[0]['compcode'] != suboptions.SelCompCode) {
            var controls = options.controls;
             //先檢查所有已執行的功能的editMode值, 如果全部為View, 才允許切換
            var result = $('.csslEditMode');
            var isExit = false;
            result.each(function (a, b) {
               if (b.innerText != self.options.language.editingAlertKey) {
                  messageBox(self.options.language.editingAlert, messageType.critical);
                  isExit = true;
               }
            });
            if (isExit == true) {
               return false;
            }

            //var msg = '';
            //for (var i = controls.length - 1; i >= 0; i--) {
            //   var o = $('#' + controls[i].name);
            //   o.each(function () {
            //      if (controls[i]['isMenuItem']) {
            //         var opt = $(this)[controls[i].type]('options');
            //         if (opt != undefined && opt.editMode != undefined) {
            //            if (opt.editMode != editMode.view) {
            //               msg += string.format(self.options.language.editingAlert, $(this)[controls[i].name]), messageType.critical;
            //               return false;
            //            }
            //         }
            //      }
            //   });
            //}
            //if (msg != '') {
            //   messageBox(msg, messageType.critical);
            //   return false;
            //}

             //關掉 全部的子功能
             for (var i = controls.length - 1; i >= 0; i--) {
                var o = $('#' + controls[i].name);
                o.each(function () {
                   $(this).off();
                   $(this)[controls[i].type]('destroy');
                   controls.splice(i, 1);
                });
             }
             options.loginInfo.loginInfo.rows[0]['compcode'] = suboptions.SelCompCode;
             //var $tabenu = $('#' + options['tabMenuId']);
             //for (var i = $tabenu.csTabs('length') - 1; i >= 1; i--)
             //   $tabenu.csTabs('removeAt', i);
             options.custQueryFlag = false;
             self.$activeElement.parent().find('div[data-mnu="SO0000B"]').html(self.options.HTML);
             self.$activeElement.parent().find('li[data-mnu="mnuSO1000"]').hide();
             //重取新公司的選單資料
             init(self.$activeElement[0]);
          }
          //跑URL方式, 不符架構原本採destroy 的作法
          //if (suboptions.isSaved == true && self.options.loginInfo.loginInfo.rows[0]['compcode'] != suboptions.SelCompCode) {
          //   var oo = sessionStorage.getItem('loginResult');
          //   oo = JSON.parse(oo);
          //   var lo = { loginInfo: JSON.parse(oo.parameters.ResultXML) };
          //   lo.loginInfo.rows[0]['compcode'] = suboptions.SelCompCode;
          //   oo.parameters.ResultXML = JSON.stringify(lo['loginInfo']);
          //   sessionStorage.setItem('loginResult', JSON.stringify(oo));
          //   window.location.replace("index.html?ver=" + $.jqx.CCB_Version);
          //} 
       });
    }
    
    function load_Silverlight(self, $elem, rowData) {
        var loData = self.options.loginInfo.loginInfo.rows[0];
        var params = String.format('CompCode:{0},GroupID:{1},EntryID:{2},EntryName:{3},isCustomQuery:{4},XAPName:{5},DLLName:{6},ClassName:{7},SysProgramId:{8},FormWidth:{9},FormHeight:{10},ItemCaption:{11},RefNo:{12}',
            loData.compcode,
            loData.groupid,
            loData.entryid,
            loData.entryname,
            0,
            rowData.XAPNAME,
            rowData.DLLNAME,
            rowData.CLASSNAME,
            rowData.SYSPROGRAMID,
            rowData.FORMWIDTH == undefined ? 0 : rowData.FORMWIDTH,
            rowData.FORMHEIGHT == undefined ? 0 : rowData.FORMHEIGHT,
            encodeURIComponent(rowData.PROMPT),
            rowData.REFNO
        );
        params = '{' + params + '}';
        $elem.load("Default.aspx", params);
        //$elem.css("height", screen.availHeight - 200);
    }
    function isLeftClick(event) {
       var leftclick;
       if (!event) var event = window.event;
       if (event.which) leftclick = (event.which == 1);
       else if (event.button) leftclick = (event.button == 0);
       return leftclick;
    }

    //可在Javascript中使用如同C#中的string.format
    //使用方式 : var fullName = String.format('Hello. My name is {0} {1}.', 'FirstName', 'LastName');
    String.format = function () {
        var s = arguments[0];
        if (s == null) return "";
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = getStringFormatPlaceHolderRegEx(i);
            s = s.replace(reg, arguments[i + 1] == null ? "" : arguments[i + 1]);
        }
        return cleanStringFormatResult(s);
    };
    //可在Javascript中使用如同C#中的string.format (對jQuery String的擴充方法)
    //使用方式 : var fullName = 'Hello. My name is {0} {1}.'.format('FirstName', 'LastName');
    String.prototype.format = function () {
        var txt = this.toString();
        for (var i = 0; i < arguments.length; i++) {
            var exp = getStringFormatPlaceHolderRegEx(i);
            txt = txt.replace(exp, arguments[i] == null ? "" : arguments[i]);
        }
        return cleanStringFormatResult(txt);
    };
    //讓輸入的字串可以包含{}
    function getStringFormatPlaceHolderRegEx(placeHolderIndex) {
        return new RegExp('({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm');
    }
    //當format格式有多餘的position時，就不會將多餘的position輸出
    //ex:
    // var fullName = 'Hello. My name is {0} {1} {2}.'.format('firstName', 'lastName');
    // 輸出的 fullName 為 'firstName lastName', 而不會是 'firstName lastName {2}'
    function cleanStringFormatResult(txt) {
        if (txt == null) return "";
        return txt.replace(getStringFormatPlaceHolderRegEx("\\d+"), "");
    }

    function autoRunner(self) {
       var data = '';
       var comp = $.data($('#tabCustQuery_Main_Content_0cgSO1100A')[0])['dynConditionGrid']['options'].loginInfo.loginInfo.rows[0]['compcode']
       if (comp == 1) {
          data = '';
       } else if (comp == 3) {
          data = '';
       }

       if (data == '') {
          data = prompt('请输入測試用[客編清單]', '');
          if (data == null && data == "") {
             return false;
          }
       }
       
       try {
          //取動態查詢瀏覽 id
          var $div = self.$activeElement.find('div[data-mnu="tabCustQuery_Main_Content"]');
          var rows = data.split(' ');
          //指定客編條件 並 填入客編
          var i = 0;
          autoProc(self, $div, rows, i);
       } catch (e) {}
    }
    function autoProc(self, $div, rows, i) {
       getControlObject($div, 'cgSO1100Acondtabs_0r_0').click();
       getControlObject($div, 'cgSO1100Acondtabs_0_CustId_A1_1').val(rows[i]);
       getControlObject($div, 'cgSO1100Acondtabs_0_CustId_A1_2').val(rows[i]);

       //觸發查詢
       getControlObject($div, 'cgSO1100Aheadbtnfind').click();
       self.$activeElement.find('div[data-id="cgSO1100A"]').on('afterFindClick', function () {
          //alert('afterFindClick');
       });
       //self.$activeElement.find('div[data-cv="cv_Main"]').parent().on('loaded', function () {
       //   alert('CV loaded');
       //});


       //CV Refresh完成後, 結束CV, 回到客戶查詢畫面
       if (i == 0) {
          $('#' + self.options.tabMenuId).on('loaded', function () {
             //alert('CV loaded');
             var t1 = setTimeout(function () {
                clearTimeout(t1);
                $('#' + self.options.tabMenuId).find('ul[data-mnu="tabMenu_List"] li').eq(1).find('.jqx-tabs-close-button').click();
                if (i == parseInt(self.options.URL_Para.count)) return false;
                var t2 = setTimeout(function () {
                   clearTimeout(t2);
                   i = i + 1;
                   if (i < rows.length) {
                      autoProc(self, $div, rows, i);
                   }
                }, self.options.URL_Para.w2);
             }, self.options.URL_Para.w1);
          });
       }
    }
    //function sleepB(delay) {
    //   return function () {
    //      return new Promise(function (resolve, reject) {
    //         setTimeout(resolve, delay);
    //      });
    //   }
    //}
    //function sleepA(milliseconds) {
    //   var start = new Date().getTime();
    //   for (var i = 0; i < 1e7; i++) {
    //      if ((new Date().getTime() - start) > milliseconds) {
    //         break;
    //      }
    //   }
    //}
})(jQuery, window);