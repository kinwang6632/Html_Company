(function ($, window, undefined) {
   var formName = 'SO1144K';
   var riadllName = 'CableSoft.SO.RIA.Order.ChoosePresent.Web.dll';
   var riaClassName = 'CableSoft.SO.RIA.Order.ChoosePresent.Web.dsChoosePresent';
   $.fn[formName] = function (options, param, param2) {
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
                  options: $.extend({}, new defaults(), new SO1144K(), options)
               });
               init(this);
            }
            state = null;
         });
      }
      catch (err) {
         errorHandle(formName, '$.fn.SO1144K', err);
      }
   };
   var methods = {
      options: function (div) {
         return getSelf(div).options;
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
      destroy: function (jq) {
         return jq.each(function (idx, element) {
            formDestroy(getSelf($(element)), 0);
         });
      },
      resize9: function (jq, params) {
         try {
            return jq.each(function () {
               formResize(getSelf(jq), params);
            });
         } catch (err) {
            errorHandle(formName, 'resize', err);
         }
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
      }

   };
   var defaults = (function () {
      this.language = {};
      this.loginInfo = {};
      this.editMode = 0;
      this.refNo = 0;
      this.parameters = {};
      this.controls = [];
      this.isSaved = false;
      this.theme = $.jqx.theme;
      this.localization = null;
      this.parentData = {};
      this.disabled = false;
      this.riaData = null;
      this.presentGridId = [];
      this.addValueCount = 0;
      this.presentCount = 0;
      this.chooseFlag = 0; //0:未選 1:選取中 2:選取完整
   });
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
         var $elem = self.$activeElement;

         //如果有指定了 width及height,便予以定值
         try {
            if (params !== undefined) {
               if (params['width'] !== undefined && $.isNumeric(params['width'])) {
                  $elem.width(params['width']);
                  options.width = params['width'];
               }
               if (params['height'] !== undefined && $.isNumeric(params['height'])) {
                  $elem.height(params['height']);
               }
            }

            var oo;
            var controls = self.options.controls;
            for (var i = 0, cnt = controls.length; i <= cnt - 1; i++) {
               oo = $('#' + controls[i].name);
               if (controls[i].type === 'jqxPanel') {
                  oo.jqxPanel('width', oo.parent().width());
               } else if (controls[i].type === 'jqxInput') {
                  oo.outerWidth(oo.parent().width());
               } else if (controls[i].type === 'jqxComboBox') {
                  oo.jqxComboBox('width', oo.parent().width());
               } else if (controls[i].type === 'jqxCheckBox') {
                  oo.jqxCheckBox('width', oo.parent().width());
               } else if (controls[i].type === 'csList') {
                  oo.csList('resize');
               }
               else {
                  //oo[controls[i].type]('width', oo.parent().width());
               }
            }

            oo = null;
            controls = null;
         } catch (err) {
            errorHandle(formName, 'formResize-->width_height', err);
            return false;
         }

         self = null;
         options = null;
         $elem = null;
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
         if (level == undefined || level == null) {
            level = 0;
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

   function init(div) {
      try {
         var self = $.data(div, formName);
         self.$activeElement = $(div);
         getData(self);

         self = null;
      }
      catch (err) {
         errorHandle(formName, 'init', err);
      }
   }
   function getData(self) {
      try {
         //var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: self.options.loginInfo.loginInfo } });
         var paraLoginInfo = getParaLoginInfo(self.$activeElement[0], formName);
         var parameters = $.extend({}, paraLoginInfo, {
            EditMode: { type: 'int32', value: self.options.editMode },
            Type: { type: 'int32', value: 0 },
            Order: { type: 'string', value: JSON.stringify(self.options.parameters) },
         });
         var params = getParameters(riadllName, riaClassName,
               'QueryCanPresent',
               JSON.stringify(parameters));
         getServerData(params, {
            success: function (data) {
               if (data != undefined) {
                  delete self.options.riaData;
                  self.options.riaData = $.parseJSON(data.ResultXML);
                  renderControls(self);
                  setDefaultValue(self);
               }
               else {
                  //messageBox(data.ErrorMessage, messageType.critical);
               }
               paraLoginInfo = null;
               parameters = null;
               params = null;
            }
         });
      }
      catch (err) {
         errorHandle(formName, 'renderControls', err);
      }
   }
   function renderControls(self) {
      try {
         $.get("/SO1000/SO1144K.html", function (data, status, xhr) {
            var options = self.options;
            var lang = options.language;
            var theme = options.theme;
            var hh = 24;

            self.$activeElement.append(data);

            //可選贈品
            //panel
            var oo; 
            //oo = self.$activeElement.find('div[data-id="pnlCanChoosePresent"]');
            //oo.jqxPanel({ theme: options.theme, width: '100%', height: 300 });
            //oo = self.$activeElement.find('div[data-id="pnlAddValue"]');
            //oo.jqxPanel({ theme: options.theme, width: '100%', height: 200 });

            //tabcontrol
            var $tabCanChoose = self.$activeElement.find('div[data-id="tabCanChoose"]');
            $tabCanChoose.csTabs({
               headerHeight: 22,
               width: '100%',
               height: 300,
               showCloseButtons: false,
               selectionTracker: true,
               animationType: 'fade',
               scrollable: true
            });
            options.controls.push({ name: $tabCanChoose[0]['id'], type: 'csTabs', level: 2 });
            options.tabCanChooseId = $tabCanChoose[0]['id'];

            var source;
            var dataAdapter

            var cellEdit = function (row) {
               if (arguments[1] == 'SELECTED') {
                  return true;
               }
               else {
                  return false;
               }
            };
            var presentColumns = [
                  { text: lang.SELECTED, datafield: 'SELECTED', width: 40, cellsalign: 'center', columntype: 'checkbox', align: 'center', cellbeginedit: cellEdit }, //選取
                  { text: lang.ARTICLENO, datafield: 'ARTICLENO', width: 60, align: 'center', cellbeginedit: cellEdit }, //贈品代碼
                  { text: lang.ARTICLENAME, datafield: 'ARTICLENAME', width: 150, align: 'center', cellbeginedit: cellEdit }, //贈品名稱
                  { text: lang.MAKE, datafield: 'MAKE', width: 100, align: 'center', cellbeginedit: cellEdit }, //型號
                  { text: lang.BPNAME, datafield: 'BPNAME', width: 180, align: 'center', cellbeginedit: cellEdit }, //優惠方案
                  { text: lang.UNITPRICE, datafield: 'UNITPRICE', width: 60, cellsformat: 'c', cellsalign: 'right', align: 'center', cellbeginedit: cellEdit },     //單價
                  { text: lang.WORKNAME, datafield: 'WORKNAME', width: 150, align: 'center', cellbeginedit: cellEdit } //派工類別
            ];
           
           
            //依 CanPresent_A 集合來產TabItem
            var selectTypes = [lang.SELECTTYPE, lang.SELECTTYPE1, lang.SELECTTYPE2, lang.SELECTTYPE3, lang.SELECTTYPE4, lang.SELECTTYPE5, lang.SELECTTYPE6, lang.SELECTTYPE7, lang.SELECTTYPE8, lang.SELECTTYPE9];
            var itemText, tabId, html, row, tabKey, canChangePresents = [], data;
            var o, iPos = 0, gridId;
            for (var i = 0, iCnt = options.riaData.CanPresent_A.rows.length; i < iCnt; i++) {
               row = options.riaData.CanPresent_A.rows[i];
               tabKey = String.format('{0}_{1}_{2}', row.PRESENTCODE, row.GIFTOPTION, row.BPCODE);
               o = $.grep(canChangePresents, function (item) {
                  return item == tabKey;
               });
               if (o.length <= 0) {
                  iPos += 1;
                  canChangePresents.push(tabKey);
                  data = $.grep(options.riaData.CanPresent_A.rows, function (item) {
                     return item.PRESENTCODE == row.PRESENTCODE && item.GIFTOPTION == row.GIFTOPTION && item.BPCODE == row.BPCODE;
                  });
                  source = {
                     localdata: data,
                     datatype: "array",
                     datafields:
                     [
                        { name: 'SELECTED', type: 'boolean' },
                        { name: 'ARTICLENO', type: 'string' },
                        { name: 'ARTICLENAME', type: 'string' },
                        { name: 'MAKE', type: 'string' },
                        { name: 'BPNAME', type: 'string' },
                        { name: 'UNITPRICE', type: 'number' },
                        { name: 'WORKNAME', type: 'string' }
                     ]
                     //datatype: "local"
                  };

                  dataAdapter = new $.jqx.dataAdapter(source);
                  source = null;

                  if (row.GIFTOPTION == 1) {
                     itemText = String.format(lang.GiftOpt1_FormatString, selectTypes[row.SELECTTYPE]);
                  } else if (row.GIFTOPTION == 2) {
                     itemText = Strin.format(lang.GiftOpt2_FormatString, row.CITEMNAME_F2, selectTypes[row.SELECTTYPE]);
                  } else if (row.GIFTOPTION == 3) {
                     itemText = String.format(lang.GiftOpt3_FormatString, row.ORDERPRICE1, row.ORDERPRICE2, selectTypes[row.SELECTTYPE]);
                  } else {
                     itemText = '????';
                  }

                  gridId = String.format('grdPresent_{0}', iPos)
                  if (iPos > 1) {
                     tabId = 'tabItem_' + getUniqueId();
                     html = String.format('<div style="width:99.8%;height:100%;"><div data-id="{0}"></div></div>', gridId);
                     $tabCanChoose.csTabs('addAt', iPos - 1, itemText, html);
                  }
                  $tabCanChoose.csTabs('setTitleAt', iPos - 1, itemText);

                  oo = self.$activeElement.find(String.format('div[data-id="{0}"]', gridId));
                  oo = oo.jqxGrid({
                     width: '100%',
                     height: '100%',
                     source: dataAdapter,
                     editable: true,
                     enabletooltips: true,
                     theme: theme,
                     columns: presentColumns
                  });
                  options.controls.push({ name: oo[0]['id'], type: 'jqxGrid', level: 3 });
                  options.presentGridId.push({ gridId: gridId, id: oo[0]['id'] });
               }
            }
            $tabCanChoose.csTabs('select', 0);

            selectTypes = null;
            itemText = null;
            itemText = null;
            tabId = null;
            html = null;
            row = null;
            tabKey = null;
            canChangePresents = null;
            data = null;
            


            //加值購
            source = {
               localdata: options.riaData.CanPresent_B.rows,
               datatype: "array",
               datafields:
               [
                  { name: 'SELECTED', type:        'boolean' },
                  { name: 'TYPE', type:            'number' },
                  { name: 'GIFTKIND', type:        'number' },
                  { name: 'GIFTOPTION', type:      'number' },
                  { name: 'SELECTTYPE', type:      'number' },
                  { name: 'ARTICLENAME', type:     'string' },
                  { name: 'PRODUCTCODENAME', type: 'number' },
                  { name: 'CITEMNAME_F2', type:    'string' },
                  { name: 'ORDERPRICERANGE', type: 'string' }
               ]
               //datatype: "local"
            };

            dataAdapter = new $.jqx.dataAdapter(source);
            source = null;

            oo = self.$activeElement.find('div[data-id="grdAddValue"]');
            oo = oo.jqxGrid({
               width: '100%',
               height: 150,
               source: dataAdapter,
               editable: true,
               enabletooltips: true,
               theme: theme,
               columns: [
                  { text: lang.SELECTED, datafield: 'SELECTED', width: 40, cellsalign: 'center', columntype: 'checkbox', align: 'center', cellbeginedit: cellEdit }, //選取
                  { text: lang.TYPE, datafield: 'TYPE', width: 40, cellsalign: 'center', hidden: true, align: 'center', cellbeginedit: cellEdit }, //種類
                  { text: lang.GIFTKIND, datafield: 'GIFTKIND', width: 40, cellsalign: 'center', hidden: true, align: 'center', cellbeginedit: cellEdit }, //贈品種類
                  {
                     text: lang.GIFTOPTION, datafield: 'GIFTOPTION', width: 80, cellsalign: 'center', align: 'center', cellbeginedit: cellEdit,
                     cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                        return renderGIFTOPTION(self.options.language, row, columnfield, value, defaulthtml, columnproperties);
                     }
                  }, //贈送方式
                  {
                     text: lang.SELECTTYPE, datafield: 'SELECTTYPE', width: 80, cellsalign: 'center', align: 'center', cellbeginedit: cellEdit,
                     cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                        return renderSELECTTYPE(self.options.language, row, columnfield, value, defaulthtml, columnproperties);
                     }
                  }, //選贈模式
                  { text: lang.ARTICLENAME, datafield: 'ARTICLENAME', width: 150, align: 'center', cellbeginedit: cellEdit },     //贈品名稱
                  { text: lang.PRODUCTCODENAME, datafield: 'PRODUCTCODENAME', width: 150, align: 'center', cellbeginedit: cellEdit }, //依附產品
                  { text: lang.CITEMNAME_F2, datafield: 'CITEMNAME_F2', width: 200, align: 'center', cellbeginedit: cellEdit },    //加購項目
                  {
                     text: lang.ORDERPRICERANGE, datafield: 'ORDERPRICERANGE', width: 120, align: 'center', cellbeginedit: cellEdit,
                     cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties, rowData) {
                     return defaulthtml;
                        //return renderORDERPRICERANGE(self.options.language, row, columnfield, value, defaulthtml, columnproperties, rowData);
                     }
                  }  //滿額贈金額
               ]
            });
            options.controls.push({ name: oo[0]['id'], type: 'jqxGrid', level: 3 });
            options.addValueGridId = oo[0]['id'];

            oo = self.$activeElement.find('input[data-id="btnOk"]').jqxButton($.extend({}, imagePosition, {theme: theme, width: 90, imgSrc: imageScr.ok.imgSrc, height: hh, value: lang.btnOk }));
            //oo.prop('id', getUniqueId());            //oo = self.$activeElement.find('input[data-id="btnOk"]').jqxButton({ theme: theme, width: 90, height: hh, disabled: true, value: lang.btnOk });
            options.controls.push({ name: oo[0]['id'], type: 'jqxButton', level: 3 });
            options.btnOkId = oo[0]['id'].replace('_jqxButton','');

            oo = self.$activeElement.find('input[data-id="btnCancel"]').jqxButton($.extend({}, imagePosition, { theme: theme, width: 90, imgSrc: imageScr.cancel.imgSrc, height: hh, value: lang.btnCancel }));
            //oo = self.$activeElement.find('input[data-id="btnCancel"]').jqxButton({ theme: theme, width: 90, height: hh, value: lang.btnCancel });
            options.controls.push({ name: oo[0]['id'], type: 'jqxButton', level: 3 });
            options.btnCancelId = oo[0]['id'].replace('_jqxButton', '');


            //關閉
            var $elem = self.$activeElement.find('#' + options.btnCloseId);
            $elem.on('click', self, function (e) {
               close(e.data);
            });
            //關閉 XXX
            if (options.container != null) {
               if (options.container.attr('class').indexOf('jqx-window') > 0) {
                  options.container.on('winClosing', function (e) {
                     close(self);
                  });
               }
            }
          
            options = null;
            theme = null;
            hh = null;
            oo = null;
            dataAdapter = null;

            changeLanguage(self);

            addHandertControls(self);
         }); //end get
      }
      catch (err) {
         errorHandle(formName, 'renderControls', err);
      }
   }
   function addHandertControls(self) {
      try {
         var options = self.options;
         var $elem;
         var $tabCanChoose = self.$activeElement.find('#' + options.tabCanChooseId);
         for (var i = 0, iCnt = $tabCanChoose.csTabs('length'); i < iCnt; i++) {
            $elem = self.$activeElement.find('#' + options.presentGridId[i].id);
            $elem.on('cellvaluechanged', self, function (e) {
               if (e.args.datafield !== 'SELECTED') {
                  return;
               }

               var _self = e.data;
               var _options = _self.options;
               var data = $(this).jqxGrid('source');

               checkCanChooseState(_self, data);

               //檢查至少要選到一項以上
               var o = $.grep(data.records, function (item) {
                  return item.SELECTED == true;
               });
               if (o != undefined) {
                  _options.presentCount = o.length;
               }

               //有依條件 選取完整==3
               if (_options.chooseFlag == 3 && (_options.presentCount + _options.addValueCount > 0)) {
                  _self.$activeElement.find('#' + _options.btnOkId).jqxButton('disabled', false);
               } else {
                  _self.$activeElement.find('#' + _options.btnOkId).jqxButton('disabled', true);
               }
               _options = null;
               data = null;
               o = null;
            });
         }
        
         $elem = self.$activeElement.find('#' + options.addValueGridId);
         $elem.on('cellvaluechanged', self, function (e) {
            if (e.args.datafield !== 'SELECTED') {
               return;
            }

            var _self = e.data;
            var _options = _self.options;
            var data = $(this).jqxGrid('source');

            //檢查至少要選到一項以上
            var o = $.grep(data.records, function (item) {
               return item.SELECTED == true;
            });
            if (o != undefined) {
               _options.addValueCount = o.length;
            }

            //有依條件 選取完整==3
            if (_options.presentCount + _options.addValueCount > 0) {
               _self.$activeElement.find('#' + _options.btnOkId).jqxButton('disabled', false);
            } else {
               _self.$activeElement.find('#' + _options.btnOkId).jqxButton('disabled', true);
            }
            _self = null;
            _options = null;
            data = null;
            o = null;
         });
        
         //確定
         var $elem1 = self.$activeElement.find('#' + options.btnOkId);
         $elem1.on('click', self, function (e) {
            //把有勾選的項目Update到大ORDER中
            updateSource(e.data);
         });

         //關閉
         $elem1 = self.$activeElement.find('#' + options.btnCancelId);
         $elem1.on('click', self, function (e) {
            var _self = e.data;
            _self.options.isSaved = false;
            _self.options.editMode = editMode.view;
            close(_self);
            _self = null;
         });
         //關閉 XXX
         if (options.container != null) {
            if (options.container.attr('class').indexOf('jqx-window') > 0) {
               options.container.on('winClosing', function (e) {
                  var _self = e.data;
                  _self.options.isSaved = false;
                  _self.options.editMode = editMode.view;
                  close(_self);
                  _self = null;
               });
            }
         }
         options = null;
         $elem = null;
         $tabCanChoose = null;
      }
      catch (err) {
         errorHandle(formName, 'addHandertControls', err);
      }
   }
   function checkCanChooseState(self, data) {
      var options = self.options;
      var $tabCanChoose = self.$activeElement.find('#' + options.tabCanChooseId);
      var selIndex = $tabCanChoose.csTabs('val');

      //多選X 條件是否已勾選完全?
      var result = $.grep(data.records, function (item) {
         return item.SELECTED == true;
      });
      if (result.length > 0) { //有選取任一項
         if (result.length == data.originaldata[0].SELECTTYPE) { //且 符合多選X時
            options.chooseFlag = 3;
         } else { //單選
            if (data.originaldata[0].SELECTTYPE == 0) { // 且 為單選時
               options.chooseFlag = 3;
            } else { //選取中
               options.chooseFlag = 1;
            }
         }
      } else {  //未選 
         options.chooseFlag = 0;
      }
      changeTabDisable(options, $tabCanChoose, selIndex, $tabCanChoose.csTabs('length'));

      options = null;
      $tabCanChoose = null;
      selIndex = null;
      result = null;
   }
   function changeTabDisable(options, $tabCanChoose, selIndex, len) {
      //多選選取中(false), 需鎖定其它頁簽
      if (options.chooseFlag == 1) { //選取中
         for (var i = 0; i < len; i++) {
            if (selIndex != i) {
               $tabCanChoose.csTabs('disableAt', i);
            }
         }
      } else if (options.chooseFlag == 0 || options.chooseFlag == 3) {  //已符合多選X條件時, 解除其它頁簽鎖定
         for (var i = 0; i < len; i++) {
            if (selIndex != i) {
               $tabCanChoose.csTabs('enableAt', i);
            }
         }
      }
   }
   function updateSource(self) {
      var options = self.options;
      var lang = options.language;
      var $tabCanChoose, $elem, data, row, item, item2, newRow, presentData, chargeData;
      var cd135F2Data = [];

      //可選贈品
      $tabCanChoose = self.$activeElement.find('#' + options.tabCanChooseId);
      for (var i = 0, iCnt = $tabCanChoose.csTabs('length') ; i < iCnt; i++) {
         $elem = self.$activeElement.find('#' + options.presentGridId[i].id);
         data = $elem.jqxGrid('source');
         for (var i = 0, iCnt = data.records.length; i < iCnt; i++) {
            item = data.records[i];
            if (item.SELECTED == true) {
               item2 = data.originaldata[i];
               cd135F2Data.push({
                  Selected: item.SELECTED,
                  AddPrice: 0,
                  ArticleNo: item2.ARTICLENO,
                  ArticleName: item2.ARTICLENAME,
                  BPCode: item2.BPCODE,
                  BPName: item2.BPNAME,
                  CItemCode: item2.CITEMCODE,
                  GiftKind: 1,
                  GiftOption: item2.GIFTOPTION,
                  Item: item2.ITEM,
                  Make: item2.MAKE,
                  PresentCode: item2.PRESENTCODE,
                  Priority: item2.PRIORITY,
                  Quantity: item2.QUANTITY,
                  UnitPrice: item2.UNITPRICE,
                  UseQty: item2.USEQTY,
                  WorkCode: item2.WORKCODE,
                  WorkName: item2.WORKNAME
               });
            }
         }
      }

      //加值購
      $elem = self.$activeElement.find('#' + options.addValueGridId);
      data = $elem.jqxGrid('source');
      for (var i = 0, iCnt = data.records.length; i < iCnt; i++) {
         item = data.records[i];
         if (item.SELECTED == true) {
            item2 = data.originaldata[i];
            cd135F2Data.push({
               Selected: item.SELECTED,
               AddPrice: item2.ADDPRICE,
               ArticleNo: item2.ARTICLENO,
               ArticleName: item2.ARTICLENAME,
               BPCode: item2.BPCODE,
               BPName: item2.BPNAME,
               CItemCode: item2.CITEMCODE,
               GiftKind: 2,
               GiftOption: item2.GIFTOPTION,
               Item: item2.ITEM,
               Make: item2.MAKE,
               PresentCode: item2.PRESENTCODE,
               Priority: item2.PRIORITY,
               Quantity: item2.QUANTITY,
               UnitPrice: item2.UNITPRICE,
               UseQty: item2.USEQTY,
               WorkCode: item2.WORKCODE,
               WorkName: item2.WORKNAME
            });
         }
      }

      getOrderPresent(self, cd135F2Data);
   }
   function getOrderPresent(self, cd135F2Data) {
      try {
         //var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: self.options.loginInfo.loginInfo } });
         var paraLoginInfo = getParaLoginInfo(self.$activeElement[0], formName);
         var parameters = $.extend({}, paraLoginInfo, {
            dsOrder: { type: 'string', value: JSON.stringify(self.options.parameters) },
            _lstAutoSerialNo: { type: 'string', value: JSON.stringify(cd135F2Data) },
         });
         var params = getParameters(riadllName, riaClassName,
               'GetOrderPresent',
               JSON.stringify(parameters));
         getServerData(params, {
            success: function (data) {
               if (data != undefined) {
                  delete self.options.parameters.Charge;
                  delete self.options.parameters.Present;
                  var riaData = $.parseJSON(data.ResultXML);
                  self.options.parameters.Charge = riaData.Charge;
                  self.options.parameters.Present = riaData.Present;
                  
                  riaData.length = 0;
                  riaData = null;

                  self.options.isSaved = true;
                  options.editMode = editMode.view;
                  close(self);
               }
               else {
                  //messageBox(data.ErrorMessage, messageType.critical);
               }
               paraLoginInfo = null;
               parameters = null;
               params = null;
            }
         });
      }
      catch (err) {
         errorHandle(formName, 'getOrderPresent', err);
      }
   }
   function updateToOrder() {
      //到source取出原記錄, 並設定新值
      for (var j = 0, jCnt = data2.length; j < jCnt; j++) {
         row = data2[j];
         if (item.PRESENTCODE == row.PRESENTCODE && item.GIFTOPTION == row.GIFTOPTION && item.BPCODE == row.BPCODE && item.ARTICLENO == row.ARTICLENO) {
            row.SELECTED = data.records[i].SELECTED;

            //回填到大ORDER中
            chargeData = self.options.parameters.Charge;
            presentData = self.options.parameters.Present;

            newRow = 1;
            //parameters
         }
      }
   }
   function setDefaultValue(self) {

   }

   function renderGIFTOPTION(lang, row, columnfield, value, defaulthtml, columnproperties) {
      var fmtStr = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">{0}</div>';
      switch (value) {
         case 1:
            value = String.format(fmtStr, lang.GIFTOPTION1);
            break;
         case 2:
            value = String.format(fmtStr, lang.GIFTOPTION2);
            break;
         case 3:
            value = String.format(fmtStr, lang.GIFTOPTION3);
            break;
         default:
            value = '';
      }
      return value;
   }
   function renderSELECTTYPE(lang, row, columnfield, value, defaulthtml, columnproperties) {
      var fmtStr = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">{0}</div>';
      switch (value) {
         case 1:
            value = String.format(fmtStr, lang.SELECTTYPE1);
            break;
         case 2:
            value = String.format(fmtStr, lang.SELECTTYPE2);
            break;
         case 3:
            value = String.format(fmtStr, lang.SELECTTYPE3);
            break;
         case 4:
            value = String.format(fmtStr, lang.SELECTTYPE4);
            break;
         case 5:
            value = String.format(fmtStr, lang.SELECTTYPE5);
            break;
         case 6:
            value = String.format(fmtStr, lang.SELECTTYPE6);
            break;
         case 7:
            value = String.format(fmtStr, lang.SELECTTYPE7);
            break;
         case 8:
            value = String.format(fmtStr, lang.SELECTTYPE8);
            break;
         case 9:
            value = String.format(fmtStr, lang.SELECTTYPE9);
            break;
         default:
            value = String.format(fmtStr, lang.SELECTTYPE);
      }
      return value;
   }
   function renderORDERPRICERANGE(lang, row, columnfield, value, defaulthtml, columnproperties, rowData) {
      var fmtStr = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">{0:###,###0}~{1:###,###0}</div>';
      return String.format(fmtStr, rowData.ORDERPRICE1, rowData.ORDERPRICE2);
   }
   
   function changeLanguage(self) {
      try {
         var lang = self.options.language;
         self.$activeElement.find('div[data-id="lblCanChoose"]').text(lang.Section1);
         self.$activeElement.find('div[data-id="lblAddValue"]').text(lang.Section2);
         lang = null;
      } catch (err) {
         errorHandle(formName, 'changeLanguage', err);
      }
   }
   function close(self) {
      try {
         var options = self.options;
         if (options.container != null) {
            if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
               if (options.editMode != editMode.view && options.isSaved != true) {
                  messageBox(options.language.SureNoSaveExit, messageType.yesno, null, function (flag) {
                     if (flag == 'yes') {
                        $(options.container).jqxWindow('close');
                        formDestroy(self);
                     }
                  });
               }
               else {
                  $(options.container).jqxWindow('close');
                  formDestroy(self);
               }
            }
         }
      }
      catch (err) {
         errorHandle(formName, 'close', err);
      }
   };
   
   
})(jQuery, window);