(function ($) {
   var formName = 'csMulti';
   var defbuttonWidth = 80; 
   var defWidth = 250;

   $.fn.csMulti = function (options, param, param2) {
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
                  options: $.extend({}, new defaults(), new csMulti(), options)
               });
               init(this);
            }
            state = null;
         });
      }
      catch (err) {
         errorHandle(formName, '$.fn.csMulti', err);
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
            }
         });
      },
      setGlobalization: function (jq, params) {
         return jq.each(function () {
            setParameter(this, 'localization', params);
         });
      },
      destroy: function (jq) {
         formDestroy(getSelf(jq));
      },
      resize: function (jq, params) {
         formResize(getSelf(jq), params);
      },
      disabled: function (div, params) {
         return _disabled(div, params);
      },
      readOnly: function (div, params) {
          return _readOnly(div, params);
      },
      source: function (div, params) {
         return _source(div, params);
      },
      showList: function (jq) {
          try {
              //$(this.selector).find('button[data-csCC="btncsCC1"]').first().click();
              renderWindow(getSelf(jq));
          } catch (err) {
              errorHandle('', 'showList', err);
          }
      },
      hideList: function (jq) {
         try {
            var $_csw = $.find('div[data-csCC="cswMain"]');
            $_csw.csWindow('close');
            $_csw = null;
         } catch (err) {
            errorHandle('', 'hideList', err);
         }
      },
      clearChoose: function (div) {
         return _clearChoose(div);
      },
      clearItemSource: function (div) {
         return _clearItemSource(div);
      },
      getChooseList: function (div) {
         return _getChooseList(div);
      },
      getChooseQuoteList: function (div) {
         return _getChooseQuoteList(div);
      },
      getChooseListName: function (div) {
         return _getChooseListName(div);
      },
      getChooseQuoteListName: function (div) {
         return _getChooseQuoteListName(div);
      },
      getChooseItems: function (div) {
         return _getChooseItems(div);
      },
      setDisplayValue: function (div, params) {
         return _setDisplayValue(div, params);
      },
      selectAll: function (div, params) {
         return _selectAll(div, params);
      },    
       //getChooseOrd /getChooseOrdList
       getChooseOrd: function (div) {
           return _getChooseOrd(div);
      },
      getChooseOrdList: function (div) {
          return _getChooseOrdList(div);
      },
      chooseChanged: function (div) {
          return getSelf(div).options.chooseChanged;
      },
      buttonTextColor: function (div, params) {
         return _buttonTextColor(div, params);
      }
   };
   var defaults = function () {
      this.language = {};
      //this.loginInfo = {};
      //this.editMode = 0;
      //this.refNo = 0;
      this.parameters = {};
      this.controls = [];
      //this.isSaved = false;
      this.theme = $.jqx.theme;
      this.localization = null;
      this.strId_Default = '';    //預設值 CodeNo
      this.formTitle = '';        //子視窗標題
      this.buttonText = '';       //按鈕標題按鈕內容
      this.buttonWidth = 80;      //按鈕寬度
      this.width = 400;           //寬度
      this.winWidth = 400;        //寬度
      this.winHeight = 500;       //高度
      this.buttonHeight = 28;     //高度
      this.idTitle = '';          //Codeno抬頭
      this.descTitle = '';        //Description抬頭
      this.showOrdColumn = false; //是否要秀勾選順序欄
      this.orderByChoose = false; //是否要依選取順序串字串
      this.widthID = 'auto';      //複選表格ID 欄位寬度 
      this.widthDesc = 'auto';    //複選表格Description 欄位寬度 
      this.selectAll = false;     //狀態是否為 選取全部
      this.disabled = false;      //元件唯讀==>顯示用
      this.codeNoField = null;
      this.descriptionField = null;
      this.source = null;
      this.showCodeNoList = false;
      this.isReadOnly = false;
      this.isShowSelected = false; //是否只顯示 有勾選 的項目
      this.chooseChanged = false;  //是否有改變了選取的項目;
      this.buttonTextColor = '';
   };
   function getSelf(jq) {
       try {
           var oo = $.data(jq[0], formName);
           if (oo === undefined) {
               oo = $.data(jq.parent()[0], formName);
           }
           return oo;
       } catch (err) {
           errorHandle(formName, 'getSelf', err);
       }
   }
   function setParameter(div, paraName, params) {
      try {
         if (!paraName || !params) { return; }
         var options = div.options;
         var controls = options.controls;
         //options.theme = params;
         for (var i = 0, iCnt = controls.length; i < iCnt; i++) {
            if (controls[i].type.indexOf('jqx') >= 0) {
               var o = $('#' + controls[i].name);
               //var pa = '{ "' + paraName + '": "' + params + '" }';
               //o.each(function () {
               //    $(this)[controls[i].type]({ [paraName]: params });
               //});
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
            //$($(div).find('[data-id=codeno]')[0])
         }
      }
      catch (err) {
         errorHandle(formName, 'setParameter', err);
      }
   }
   function formResize(div, params) {
      try {
         var options = div.options;
         var $elem = div.$activeElement;

         //如果有指定了\width及height,便予以定值
         try {
            if (params !== undefined) {
               if (params['width'] !== undefined && $.isNumeric(params['width'])) {
                  $elem.width(params['width']);
                  options.width = params['width'];
               }
               if (params['height'] !== undefined && $.isNumeric(params['height'])) {
                  options.buttonHeight = params['height'];
               }
            }
         } catch (err) {
            errorHandle(formName, 'formResize-->width_height', err);
            return false;
         }

         var $btncsCC1 = $elem.find('button[data-csCC="btncsCC1"]');
         var $btncsCC2 = $elem.find('button[data-csCC="btncsCC2"]');
         var $txtcsCC3 = $elem.find('input[data-csCC="txtcsCC3"]');
         var ccWidth = $elem.width() - $btncsCC1.outerWidth() - $btncsCC2.outerWidth() - 9;
         if ($elem.css('padding-left') && $elem.css('padding-left') > 0) {
            ccWidth -= Number($elem.css('padding-left'));
         }
         if ($elem.css('padding-right') && $elem.css('padding-right') > 0) {
            ccWidth -= Number($elem.css('padding-right'));
         }
         $txtcsCC3.jqxInput({ width: ccWidth });
         $btncsCC1.jqxButton('height', options.buttonHeight);
         $btncsCC2.jqxButton('height', options.buttonHeight);
         $txtcsCC3.jqxInput('height', options.buttonHeight - 3);

         options = null;
         $elem = null;
         $btncsCC1 = null;
         $btncsCC2 = null;
         $txtcsCC3 = null;
         ccWidth = null;

      } catch (err) {
         errorHandle(formName, 'formResize', err);
      }
   }
   function formDestroy(self, level) {
      try {
         if (self === undefined || self === null) {
            return false;
         }

         if (level === undefined || level == null) {
            level = 0;
         }

         var options = self.options;
         var controls = options.controls;
         for (var j = 5; j >= level; j--) {
            for (var i = controls.length - 1; i >= 0; i--) {
               //$($("#" + controls[i]['name']).parents()).off();

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
                        //controls.splice(i, 1);
                     });
                  }
               }
            }
         }
         var controls_2 = controls.filter(function (item) {
            return item['level'] >= 2;
         });
         destroyControls(controls_2);
         //$(document).off('keydown.' + self.options.csmId);
         //$(document).off('mousemove.' + self.options.csmId);
         //$(document).off('mouseup.' + self.options.csmId);

         if (level > 0) {
            return;
         }

         destroyControls(self.options.controls);
         deleteJSONObject(self.options);
         offElementEvents(self.$activeElement);
         $.data(self.$activeElement, formName, null);
         self.$activeElement.off();

         $('#' + self.options.csmId).off().remove();
         self.$activeElement.off().remove();
         controls.length = 0;
         controls = null;


         for (var item in options) {
            if ($.isArray(options[item]) === true) {
               if (item !== 'source') {
                  options[item].length = 0;
               }
            }
            options[item] = null;
            delete options[item];
         }
         options.length = 0;
         options = null;

          $.cleanData(self.$activeElement, true);
          //self.$activeElement[0].children[0].remove();
          for (var item in self) {
            if($.isArray(self[item]) === true) {
               if (item !== 'options') {
                  self[item].length = 0;
                  }
               }  
            self[item]= null;
            delete self[item];
         }
         self.length = 0;
         self = null;
      }
      catch (err) {
         errorHandle(formName, 'formDestroy', err);
      }
   }
   function _disabled(div, params) {
      try {
         var oo = getSelf(div);
         if (params !== undefined && params !== null) {
            oo.$activeElement.find('button[data-csCC="btncsCC1"]').jqxButton('disabled', params);
            oo.$activeElement.find('button[data-csCC="btncsCC2"]').jqxButton('disabled', params);
            oo.$activeElement.find('input[data-csCC="txtcsCC3"]').jqxInput('disabled', params);
            oo.options.disabled = params;
         } else {
            return oo.options.disabled;
         }
         oo = null;
      } catch (err) {
          errorHandle(formName, '_disabled', err);
      }
   }
   function _readOnly(div, params) {
       try {
           var oo = getSelf(div);
           if (params !== undefined && params !== null) {
               oo.$activeElement.find('button[data-csCC="btncsCC1"]').jqxButton('disabled', false);
               oo.$activeElement.find('button[data-csCC="btncsCC2"]').jqxButton('disabled', params);
               oo.$activeElement.find('input[data-csCC="txtcsCC3"]').jqxInput('disabled', true);
               oo.options.isReadOnly = params;
           } else {
               return oo.options.isReadOnly;
           }
           oo = null;
       } catch (err) {
           errorHandle(formName, '_readOnly', err);
       }
   }
   function _source(div, params) {
      try {
          var oo = getSelf(div);
          if (params !== undefined && params !== null) {
              //否則, 直接取用第一個欄位及第二個欄位來當做預欄位
              if (oo.options.columns === undefined || oo.options.columns === null) {
                  if (params !== null && params.length > 0) {
                      var keys = Object.keys(params[0]);
                      oo.options.codeNoField = keys[0];
                      oo.options.descriptionField = keys[1];
                      keys = null;
                  }
              }

              oo.options.source = params;
              //oo.options.disabled = false;
              if (oo.options.isReadOnly == false) {
                  //考量到UI一次產生時, 不會填入source, 所以在二次指定source時, 須把 oo.options.disabled再指定一次給UI
                  oo.$activeElement.find('button[data-csCC="btncsCC1"]').jqxButton('disabled', oo.options.disabled);
                  oo.$activeElement.find('button[data-csCC="btncsCC2"]').jqxButton('disabled', oo.options.disabled);
              ////oo.$activeElement.find('button[data-csCC="btncsCC2"]').first().click();
              }
              clearDispValue(getSelf(div));
              oo = null;
          } else {
              return oo.options.source;
          }
      } catch (err) {
         errorHandle(formName, '_source', err);
      }
   }
   function _clearChoose(div) {
      try {
         clearDispValue(getSelf(div));
      } catch (err) {
         errorHandle(formName, '_clearChoose', err);
      }
   }
   function _clearItemSource(div) {
      try {
         var oo = getSelf(div);
         //oo.$activeElement.find('button[data-csCC="btncsCC2"]').first().click();
         clearDispValue(oo);
         oo.options.source = [];
         oo.options.disabled = true;

         oo.$activeElement.find('button[data-csCC="btncsCC1"]').jqxButton('disabled', true);
         oo.$activeElement.find('button[data-csCC="btncsCC2"]').jqxButton('disabled', true);
         oo = null;
      } catch (err) {
         errorHandle('', '_clearItemSource', err);
      }
   }
   function _getChooseList(div) {
      try {
         var oo = getSelf(div);
         var o = oo.$activeElement.find('div[data-pid="csMulti"]').data('data-codeno');
         if (o === undefined) {
            o = '';
         }

         oo = null;
         return o;
      } catch (err) {
         errorHandle(formName, '_getChooseList', err);
      }
   }
   function _getChooseQuoteList(div) {
      try {
         var oo = getSelf(div);
         var o = oo.$activeElement.find('div[data-pid="csMulti"]').data('data-codenoQuote');
         if (o === undefined) {
            o = '';
         }

         oo = null;
         return o;
      } catch (err) {
         errorHandle(formName, '_getChooseQuoteList', err);
      }
   }
   function _getChooseListName(div) {
      try {
         var oo = getSelf(div);
         var o = oo.$activeElement.find('div[data-pid="csMulti"]').data('data-description');
         if (o === undefined) {
            o = '';
         }

         oo = null;
         return o;
      } catch (err) {
         errorHandle(formName, '_getChooseListName', err);
      }
   }
   function _getChooseQuoteListName(div) {
      try {
         var oo = getSelf(div);
         var o = oo.$activeElement.find('div[data-pid="csMulti"]').data('data-descriptionQuote');
         if (o === undefined) {
            o = '';
         }

         oo = null;
         return o;
      } catch (err) {
         errorHandle(formName, '_getChooseQuoteListName', err);
      }
   }
   function _getChooseItems(div) {
      try {
         var oo = getSelf(div);
         if (oo.options.source !== undefined || oo.options.source.length > 0) {
            var arr = oo.options.source.filter(function (value) {
               return value.sel === 1;
            });
         } else {
            return oo.options.source;
         }
         oo = null;
         return arr;
      } catch (err) {
         errorHandle(formName, '_getChooseItems', err);
      }
   }
     //getChooseOrd /getChooseOrdList
   function _getChooseOrd(div) {
       var options = getSelf(div).options;
       var result = _getChooseItems(div);
       result = sortObject(result, options.codeNoField);
       var str = '';
       for (var i = 0, icnt = result.length; i < icnt; i++) {
           str += result[i]['ord'] + ',';
       }
       str = str.substr(0, str.length - 1);
       return str;
   }
   function _getChooseOrdList(div) {
       var options = getSelf(div).options;
       var result = _getChooseItems(div);
       result = sortObject(result, options.codeNoField);
       var str = '';
       for (var i = 0, icnt = result.length; i < icnt; i++) {
           str += result[i][options.codeNoField] + ',';
       }
       str = str.substr(0, str.length - 1);
       return str;
   }
   function _getChooseOrdQuoteList(div) {
       var options = getSelf(div).options;
       var result = _getChooseItems(div);
       result = sortObject(result, options.codeNoField);
       var str = '';
       for (var i = 0, icnt = result.length; i < icnt; i++) {
           str += result[i][options.codeNoField] + '','';
       }
       if (str.length > 2)
           str = str.substr(0, str.length - 2);
       return str;
   }
   function _setDisplayValue(div, params) {
      try {
         if (params === undefined) {
            return;
         }

         var oo = getSelf(div);
         //補上其它屬性相對應之值
         if (params === null || params === '') {
            clearDispValue(oo);
         } else {
            if (oo.options.source == null)
                 return;

            //如果為物件便予以還原成內部用的變數群
            if (typeof params == 'object') {
                oo.options.displayValue = params['displayValue'];
                oo.options.displayOrd = isEmpty(params['displayOrd']) == true ? null : params['displayOrd'].split(',');
            } else {
                oo.options.displayValue = params;
            }

            proc_Default_Selected(oo);

            var arr = {};
            if (oo.options.orderByChoose) {
                arr = $.grep(oo.options.source, function (element, index) {
                    return element.sel > 0;
                });
                arr.sort(function (a, b) {
                    return a.ord - b.ord;
                });
            }
            else {
                arr = $.grep(oo.options.source, function (element, index) {
                    return element.sel > 0;
                });
            }
          
            proc_CodeNoInfo(oo, arr);

            refreshDataInfo(oo, 0);

            arr = null;
         }
         oo = null;
      } catch (err) {
         errorHandle(formName, '_setDisplayValue', err);
      }
   }
   function _selectAll(div, params) {
      try {
         var oo = getSelf(div);
         if (params !== undefined && params !== null) {
            if ($.type(params) === 'boolean') {
               selectAll(oo, params);
            }
         } else {
            return oo.options.selectAll;
         }
         oo = null;
      } catch (err) {
         errorHandle(formName, '_selectAll', err);
      }
   }
   function _buttonTextColor(div, params) {
      try {
         var oo = getSelf(div);
         if (params !== undefined && params !== null) {
            oo.$activeElement.find('button[data-csCC="btncsCC1"]').css({ color: params });
         } else {
            return oo.options.buttonTextColor;
         }
         oo = null;
      } catch (err) {
         errorHandle(formName, '_buttonTextColor', err);
      }
   }
   function init(div) {
      try {
         var self = $.data(div, formName);
         self.$activeElement = $(div);
         renderControls(self);
         addHandertControls(self);
      }
      catch (err) {
         errorHandle(formName, 'init', err);
      }
   }
   function renderControls(div) {
      try {
         var self = div;
         var options = self.options;
         var lang = self.options.language;
         var hh = options.buttonHeight;

         options.chooseId = '';
         options.clearId = '';
         options.descId = '';

         if (options.buttonText === '') options.buttonText = lang.buttonText;

         if (options.idTitle === '') options.idTitle = lang.idTitle;
         if (options.descTitle === '') options.descTitle = lang.descTitle;

         var width = options.width;
         //var height = self.$activeElement.height();
         var buttonWidth = options.buttonWidth;


         if (!buttonWidth || buttonWidth === 0) { buttonWidth = defbuttonWidth; }
         if (!width || width === 0) {
            width = self.$activeElement.width();
         } else {
            self.$activeElement.width(width);
            width = self.$activeElement.width();
         }

         var _codeno = 'CODENO', _description = 'DESCRIPTION';
         //檢查columns有無指定自訂欄位?? 如果有, 就取出做為預設值
         if (options.columns !== undefined && options.columns.length > 1) {
            _codeno = options.columns[0]['datafield'];
            _description = options.columns[1]['datafield'];
         } else {
            //否則, 直接取用第一個欄位及第二個欄位來當做預欄位
            if (options.source !== null && options.source.length > 0) {
               var keys = Object.keys(options.source[0]);
               _codeno = keys[0];
               _description = keys[1];
               keys = null;
            }
         }
         options.codeNoField = _codeno;
         options.descriptionField = _description;
         _codeno = null;
         _description = null;

        
         // 處理第一層元素生成
         var $el_Main = $('<div data-pid="csMulti" id="csMulti_' + getUniqueId() + '" style="float:left;">' +
                              '<span>' +
                                 '<button data-csCC="btncsCC1" style="display:inline;">' + options.buttonText + '</button>' +
                                 '<button data-csCC="btncsCC2" style="display:inline; background-image:url(Images/s_del.png); background-repeat:no-repeat; background-position:center center;background-size:20px 20px;; vertical-align:bottom;"></button>' +
                                 '<input type="text" readonly data-csCC="txtcsCC3" style="display:inline;" />' +
                              '</span>' +
                           '</div>');

         self.$activeElement.append($el_Main);
         var $btncsCC1 = $el_Main.find('button[data-csCC="btncsCC1"]');
         $btncsCC1.prop('id', self.$activeElement[0]['id'] + 'btncsCC1' + getUniqueId());
         var $btncsCC2 = $el_Main.find('button[data-csCC="btncsCC2"]');
         $btncsCC2.prop('id', self.$activeElement[0]['id'] + 'btncsCC2' + getUniqueId());
         var $txtcsCC3 = $el_Main.find('input[data-csCC="txtcsCC3"]');
         $txtcsCC3.prop('id', self.$activeElement[0]['id'] + 'txtcsCC3' + getUniqueId());

         $el_Main = self.$activeElement.find('div[data-pid="csMulti"]');
         $el_Main.prop('id', self.$activeElement[0]['id'] + getUniqueId());
         options.csmId = $el_Main[0]['id'];
         $el_Main = null;

         $btncsCC1.jqxButton({
            width: buttonWidth,
            height: hh,
            theme: options.theme,
            disabled: options.disabled
         });
         options.controls.push({ name: $btncsCC1[0]['id'], type: 'jqxButton', level: 1 });
         options.chooseId = $btncsCC1[0]['id'];
         if (options.buttonTextColor != '') {
            $btncsCC1.css({ color: options.buttonTextColor });
         }

         $btncsCC2.jqxButton({
            width: '30',
            height: hh,
            theme: options.theme,
            disabled: options.disabled
         });
         options.controls.push({ name: $btncsCC2[0]['id'], type: 'jqxButton', level: 1 });
         options.clearId = $btncsCC2[0]['id'];

         var ccWidth = $(self.$activeElement).width() - $btncsCC1.outerWidth() - $btncsCC2.outerWidth();
         $txtcsCC3.jqxInput({
            width: ccWidth,
            height: hh - 3,
            minLength: 1,
            theme: options.theme
         });
         ccWidth = null;
         options.controls.push({ name: $txtcsCC3[0]['id'], type: 'jqxInput', level: 1 });
         options.descId = $txtcsCC3[0]['id'];

         if (options.selectAll === true) {
            selectAll(self, true);
         }

         _setDisplayValue(self.$activeElement, options.displayValue);
          /*
         if (options.selectAll === false & options.displayValue !== undefined && options.displayValue !== null && options.displayValue !== '') {
            //將codeno 置換成description字串供顯示用
            $txtcsCC3.jqxInput('val', getDescriptionByCodeno(options.source,
                                                               options.displayValue,
                                                               options.codeNoField,
                                                               options.descriptionField));
            //初始化元件公開屬性的預設值 By displayValue
            var codeno = '', desc = '', codenoQuote = '', descQuote = '';
            var arr = options.source;
            var tmpCodeno, tmpDesc;
            var oo = options.displayValue.split(',');
            var iCnt = 1;
            for (var i = 0; cnt = oo.length, i < cnt; i++) {
               var o = $.grep(arr, function (item) {
                  if (item[options.codeNoField] !== null && oo[i] !== null) {
                     return item[options.codeNoField].toString() === oo[i];
                  } else {
                     return false;
                  }
               });

               if (o.length > 0) {
                  o[0]['ord'] = iCnt++;
                  o[0]['sel'] = 1;
                  tmpCodeno = o[0][options.codeNoField];
                  tmpDesc = o[0][options.descriptionField];
                  codeno += tmpCodeno + ",";
                  desc += tmpDesc + ",";
                  codenoQuote += "'" + tmpCodeno + "',";
                  descQuote += "'" + tmpDesc + "',";
               }
               o = null;
            }
            oo = null;
            arr = null;
            tmpCodeno = null;
            tmpDesc = null;
            iCnt = null;

            if (desc.length > 2) {
               codeno = codeno.substr(0, codeno.length - 1);
               desc = desc.substr(0, desc.length - 1);
               codenoQuote = codenoQuote.substr(0, codenoQuote.length - 1);
               descQuote = descQuote.substr(0, descQuote.length - 1);

               var $csMulti = self.$activeElement.find('div[data-pid="csMulti"]');
               $csMulti.data("data-codeno", codeno);
               $csMulti.data("data-description", desc);
               $csMulti.data("data-codenoQuote", codenoQuote);
               $csMulti.data("data-descriptionQuote", descQuote);
               $csMulti = null;
            }
         }
          */
         
         //最後為UI重新做一次resize
         formResize(self);

         //如果無資料
         if (options.source === null || options.source.length === 0) {
            $btncsCC1.jqxButton('disabled', true);
            $btncsCC2.jqxButton('disabled', true);
         }
          //如果isReadOnly=true
         if (options.isReadOnly === true) {
             $btncsCC1.jqxButton('disabled', false);
             $btncsCC2.jqxButton('disabled', true);
         }


         // 自定義事件回呼
         self.$activeElement.triggerHandler('loadCompleted');
         
       //  $txtcsCC3.attrchange({
       //      trackValues: true, /* Default to false, if set to true the event object is 
       //         updated with old and new value.*/
       //      callback: function (event) {
       //          var oo = 1;
       //          oo = 100;
       //          //event               - event object
       //          //event.attributeName - Name of the attribute modified
       //          //event.oldValue      - Previous value of the modified attribute
       //          //event.newValue      - New value of the modified attribute
       //          //Triggered when the selected elements attribute is added/updated/removed
       //      }
       //});
       

         self = null;
         options = null;
         width = null;
         buttonWidth = null;
         $btncsCC1 = null;
         $btncsCC2 = null;
         $txtcsCC3 = null;
      }
      catch (err) {
         errorHandle(formName, 'renderControls', err);
      }
   }
   function renderWindow(div) {
      try {
         var self = div;
         var options = self.options;
         var lang = options.language;
         var hh = options.buttonHeight;
         options.windowId = '';
       
         if (options.formTitle === null || options.formTitle === '') {
            options.formTitle = options.buttonText;
         }

         // 自定義事件回呼
         self.$activeElement.triggerHandler('chooseButtonClick_Before');

         //處理子視窗生成,並隱藏等待呼叫
         var $el_Csw = $('<div data-csCC="cswMain">' +
                           '<div data-csCC="cswHeader">' +
                              '<span>' +
                                 '<img src="Images/View2.png" alt="" style="margin:-3px; margin-right:15px;"><span>' + options.formTitle + '</span>' +
                              '</span>' +
                           '</div>' +
                           '<div data-csCC="csw_Content" style="overflow:hidden; margin-left:10px; margin-right:10px;">' +
                              '<div data-csCC="searchPanel" style="margin:3px 5px 3px 0px;">' +
                                 '<span data-csCC="search" style="margin-left:5px;display:inline-block;">' +
                                    '<button style="padding:4px 16px;" id="radCodeNo">' + options.idTitle + '</button>' +
                                    '<button style="padding:4px 16px;" id="radDescription">' + options.descTitle + '</button>' +
                                 '</span>' +
                                 '<input type="text" data-csCC="txtSearch" style="width:160px; margin-left:6px; vertical-align:top;" />' +
                                 '<button data-csCC="btnShowSelectItems" style="width:60px;margin-left:6px;vertical-align:top;">' + lang.btnShowSelectItems + '</button>' +
                              '</div>' +
                              '<div data-csCC="grdMain"></div>' +
                              '<div style="text-align: center;border: ridge;">' +
                                 '<span data-csCC="dataInfo" style="color:blue;"></span>' +
                              '</div>' +
                              '<div style="margin:4px 0px 5px 6px;">' +
                                 '<span>' +
                                    '<button data-csCC="btncsOK" style="padding-right:12px;"><img src="images/s_OK2.png" style="margin-right:8px;width:20px;height:20px;" /><span style="vertical-align: super;">' + lang.btncsOK + '</span></button>' +
                                    '<button data-csCC="btncsSelAll" style="margin-left:10px; margin-right:10px; padding-right:12px;"><img src="images/OK1.png" style="margin-right:8px;width:20px;height:20px;"/><span style="vertical-align: super;">' + lang.btncsSelAll + '</span></button>' +
                                    '<button data-csCC="btncsClear" style="padding-right:10px; padding-right:12px;"><img src="images/s_clear.png" style="margin-right:8px;width:20px;height:20px;" /><span style="vertical-align: super;">' + lang.btncsClear + '</span></button>' +
                                    '<button data-csCC="btncsCancel" style="margin-left:35px; padding-right:12px;"><img src="images/s_Cancel.png" style="margin-right:8px;width:20px;height:20px;" /><span style="vertical-align: super;">' + lang.btncsCancel + '</span></button>' +
                                 '</span>' +
                              '</div>' +
                           '</div>' +
                           '</div>');

         self.$activeElement.append($el_Csw);
         $el_Csw = null;

         var $csw = self.$activeElement.find('div[data-csCC="cswMain"]');
         $csw.prop('id', self.$activeElement[0]['id'] + 'cswMain' + getUniqueId());
         $csw.csWindow({
            autoOpen: false, isModal: true, showCollapseButton: false, showCloseButton: false,
            theme: options.theme,
            maxHeight: 800, maxWidth: 900, minHeight: 200, minWidth: 200, height: options.winHeight, width: options.winWidth,
            initContent: function () {
               try {
                  var $cswContent = $csw.find('div[data-csCC="csw_Content"]');
                  $cswContent.prop('id', self.$activeElement[0]['id'] + 'csw_Content' + getUniqueId());
                  var $radSearch = $cswContent.find('span[data-csCC="search"]');
                  $radSearch.prop('id', self.$activeElement[0]['id']+ 'search' +getUniqueId());
                  var $txtSearch = $cswContent.find('input[data-csCC="txtSearch"]');
                  $txtSearch.prop('id', self.$activeElement[0]['id']+ 'txtSearch' +getUniqueId());

                  $txtSearch.jqxInput({
                     height: hh,
                     theme: options.theme
                  });
                  options.controls.push({ name: $txtSearch[0]['id'], type: 'jqxInput', level: 3 });

                  $radSearch.jqxButtonGroup({ mode: 'radio', theme: options.theme, height: hh });
                  $radSearch.jqxButtonGroup('setSelection', 0);
                  options.controls.push({ name: $radSearch[0]['id'], type: 'jqxButtonGroup', level: 3 });

                  var $btncsOK = $cswContent.find('button[data-csCC="btncsOK"]');
                  $btncsOK.prop('id', self.$activeElement[0]['id'] + 'btncsOK' + getUniqueId());
                  var $btncsSelAll = $cswContent.find('button[data-csCC="btncsSelAll"]');
                  $btncsSelAll.prop('id', self.$activeElement[0]['id'] + 'btncsSelAll' + getUniqueId());
                  var $btncsClear = $cswContent.find('button[data-csCC="btncsClear"]');
                  $btncsClear.prop('id', self.$activeElement[0]['id'] + 'btncsClear' + getUniqueId());
                  var $btncsCancel = $cswContent.find('button[data-csCC="btncsCancel"]');
                  $btncsCancel.prop('id', self.$activeElement[0]['id'] + 'btncsCancel' + getUniqueId());
                  var $btnShowSelectItems = $cswContent.find('button[data-csCC="btnShowSelectItems"]');
                  $btnShowSelectItems.prop('id', self.$activeElement[0]['id']+ 'btnShowSelectItems' +getUniqueId());

                  $btncsOK.jqxButton({ theme: options.theme, height: hh });
                  $btncsSelAll.jqxButton({ theme: options.theme, height: hh });
                  $btncsClear.jqxButton({ theme: options.theme, height: hh });
                  $btncsCancel.jqxButton({ theme: options.theme, height: hh });
                  $btnShowSelectItems.jqxButton({ theme: options.theme, height: hh });
                  options.controls.push({ name: $btncsOK[0]['id'], type: 'jqxButton', level: 3 });
                  options.controls.push({ name: $btncsSelAll[0]['id'], type: 'jqxButton', level: 3 });
                  options.controls.push({ name: $btncsClear[0]['id'], type: 'jqxButton', level: 3 });
                  options.controls.push({ name: $btncsCancel[0]['id'], type: 'jqxButton', level: 3 });
                  options.controls.push({ name: $btnShowSelectItems[0]['id'], type: 'jqxButton', level: 3 });

                  if (options.disabled === true) {
                     $btncsOK.jqxButton({ disabled: true });
                     $btncsSelAll.jqxButton({ disabled: true });
                     $btncsClear.jqxButton({ disabled: true });
                  }
                  if (options.isReadOnly === true) {
                      $btncsOK.jqxButton({ disabled: true });
                      $btncsSelAll.jqxButton({ disabled: true });
                      $btncsClear.jqxButton({ disabled: true });
                  }



                  var $csGrid = $cswContent.find('div[data-csCC="grdMain"]');
                  $csGrid.prop('id', self.$activeElement[0]['id']+ 'grdMain' +getUniqueId());
                  $cswContent = null;

                  var descWidth = 0;
                  var colString = '[';
                  if (options.showOrdColumn) {
                      colString += '{ "text": "順序", "datafield": "ord", "width": 45, "align": "center", "cellsalign": "center", "cellsformat": "f", "editable": false },';
                      descWidth += 45;
                  }

                  var strReadOnly = '';
                  if (options.disabled === true || options.isReadOnly === true) {
                     strReadOnly = ', "editable": false';
                  }

                  colString += '{ "text": "選取", "datafield": "sel", "width": 45, "align": "center", "columntype": "checkbox"' + strReadOnly + ' },';
                  descWidth += 45;
                  strReadOnly = null;

                  var idWidth = 0;
                  if (options.widthID !== null && options.widthID > 0) {
                      idWidth = options.widthID;
                  } else {
                     idWidth = 80;
                  }

                  descWidth += idWidth;
                  if (options.widthDesc !== null) {
                      if (options.widthDesc > 0) {
                          descWidth = options.widthDesc;
                      } else {
                          descWidth = options.winWidth - descWidth - 50;
                      }
                  } else {
                      descWidth = options.winWidth - descWidth - 50;
                  }


                  if (options.columns !== undefined && options.columns !== null && options.columns.length > 0) {
                     for (var i = 0; cnt = options.columns.length, i < cnt; i++) {
                        colString += '{ "text": "' + options.columns[i]['text'] + '", "datafield": "' + options.columns[i]['datafield'] + '"';
                        if (options.columns[i]['width'] !== undefined) {
                              colString += ', "width": ' + options.columns[i]['width'] + ', "align": "center", "editable": false';
                           if (options.columns[i]['hidden']!==undefined) {
                              colString += ', "hidden": ' + options.columns[i]['hidden'] + ' },';
                           } else {
                              colString += ' },';
                           }
                        } else {
                              colString += ', "width": "30%", "align": "center", "editable": false';
                           if (options.columns[i]['hide'] !== undefined) {
                              colString += ', "hidden": ' + options.columns[i]['hidden'] + ' },';
                           } else {
                              colString += ' },';
                           }
                        }
                     }
                     colString = colString.substr(0, colString.length - 1);
                  } else {
                      colString += '{ "text": "' + options.idTitle + '", "datafield": "' + options.codeNoField + '", "width": ' + idWidth + ', "align": "center", "editable": false },' +
                          '{ "text": "' + options.descTitle + '", "datafield": "' + options.descriptionField + '", "width": ' + descWidth + ', "align": "center", "editable": false }';
                  }
                  //if (options.columnNames != null && options.columnNames.length > 0) {
                  //   if (options.columnTitles != null && options.columnTitles.length > 0) {
                  //      if (options.columnNames.length == options.columnTitles.length) {
                  //         for (var i = 0; cnt = options.columnNames.length, i < cnt; i++) {
                  //            colString += ',{ "text": "' + options.columnTitles[i] + '", "datafield": "' + options.columnNames[i] + '", "width": "30%", "editable": false }';
                  //         }
                  //      }
                  //   }
                  //}
                  colString += ']';

                  var cols = JSON.parse(colString);
                  colString = null;
                  idWidth = null;
                  descWidth = null;

                  proc_Default_Selected(self);

                  var source = {
                     localdata: options.source,
                     datatype: "array"
                     //datatype: "local"
                  };

                  var dataAdapter = new $.jqx.dataAdapter(source);
                  source = null;

                  $csGrid.jqxGrid({
                     width: '100%',
                     height: '79%',
                     source: dataAdapter,
                     rowsheight: 20,
                     editable: true,
                     columnsresize:true,
                     enabletooltips: true,
                     theme: options.theme,
                     localization: $.jqx.localization,
                     columns: cols
                     //columns: [
                     //  { text: '順序', datafield: 'ord', width: 45, cellsalign: 'left', cellsformat: 'f', editable: false },
                     //  { text: '選取', datafield: 'sel', width: 45, columntype: 'checkbox' },
                     //  { text: '代碼', datafield: 'codeno', width: 80, editable: false },
                     //  { text: '名稱', datafield: 'description', width: 150, editable: false }
                     //]
                  });
                  options.controls.push({ name: $csGrid[0]['id'], type: 'jqxGrid', level: 3 });
                  cols = null;
                  dataAdapter = null;

                  refreshDataInfo(self, 0);
                
                  addHandertWindow(self);

                  $csGrid.off();
                  $csGrid.on('rowdoubleclick', self, function (event) {
                      try {
                          var _self = arguments[0].data;
                          if (_self.options.isReadOnly == true) return;

                          $csGrid.off('cellvaluechanged');
                          grd_cellvaluechanged(_self, this, event, 1);

                          $csGrid.on('cellvaluechanged', function (event) {
                              try {
                                  if (event.args.datafield === 'sel') {
                                      grd_cellvaluechanged(_self, this, event, 0);
                                  }
                              } catch (err) {
                                  errorHandle(formName, 'csGrid_on_cellvaluechanged', err);
                              }
                          });
                      } catch (err) {
                          errorHandle(formName, 'csGrid_on_rowdoubleclick', err);
                      }
                  });

                  $csGrid.off();
                  $csGrid.on('cellvaluechanged', self, function (event) {
                      try {
                          var _self = arguments[0].data;
                          if (event.args.datafield === 'sel') {
                              grd_cellvaluechanged(_self, this, event, 0);
                          }
                      } catch (err) {
                          errorHandle(formName, 'csGrid_on_cellvaluechanged', err);
                      }
                  });

                  // 自定義事件回呼
                  self.$activeElement.triggerHandler('chooseButtonClick');

                  self = null;
                  options = null;
               } catch (err) {
                  errorHandle(formName, 'windiow_initContent', err);
               }
            } //end initContent
         }); // end csWindow
         //options.controls.push({ name: $csw[0]['id'], type: 'csWindow', level: 2 });
         options.windowId = $csw[0]['id'];
         //$($csw.remove()).insertAfter($el_Main);

         //var $csMulti = self.$activeElement.find('div[data-pid="csMulti"]');
         //var codeno = $csMulti.data("data-codeno");
         //var desc = $csMulti.data("data-description");

         $csw.csWindow('open');
      }
      catch (err) {
         errorHandle(formName, 'renderWindow', err);
      }
   }
   function addHandertControls(div) {
      try {
         var self = div;
         var $btncsCC1 = self.$activeElement.find('button[data-csCC="btncsCC1"]');
         var $btncsCC2 = self.$activeElement.find('button[data-csCC="btncsCC2"]');

         //選擇
         $btncsCC1.off();
         $btncsCC1.on('click', self, function () {
             try {
                 var _self = arguments[0].data;
                 _self.options.chooseChanged = false;
                 //開選擇子視窗
                 renderWindow(_self);
                 _self = null;

                 return false;
             } catch (err) {
                 errorHandle(formName, '$btncsCC1_click', err);
             }
         });

         //清除
         $btncsCC2.off();
         $btncsCC2.on('click', self, function () {
            try {
               var _self = arguments[0].data;
               var _options = _self.options;
               if (_options.source !== undefined && _options.source !== null) {
                  for (var i = 0; cnt = _options.source.length, i < cnt; i++) {
                     _options.source[i].sel = 0;
                     _options.source[i].ord = null;
                  }
               }

               var _$csMulti = $('#' + _options.csmId);
               var _$txtcsCC3 = $('#' + _options.descId);
               _$txtcsCC3.val('');

               _$csMulti.data("data-codeno", '');
               _$csMulti.data("data-description", '');
               _$csMulti.data("data-codenoQuote", '');
               _$csMulti.data("data-descriptionQuote", '');
               //_self.$activeElement.find('div[data-pid="csMulti"]').data("data-codeno", '');
               //_self.$activeElement.find('div[data-pid="csMulti"]').data("data-description", '');
               //_self.$activeElement.find('div[data-pid="csMulti"]').data("data-codenoQuote", '');
               //_self.$activeElement.find('div[data-pid="csMulti"]').data("data-descriptionQuote", '');
               _$csMulti = null;
               _$txtcsCC3 = null;
               _options.displayValue = '';

               // 自定義事件回呼
               _self.$activeElement.triggerHandler('clearButtonClick');
               _self = null;

               return false;
            } catch (err) {
               errorHandle(formName, '@@clearButtonClick', err);
            }
         });

         //$(window).on('resize', self, function () {
         //   var _self = arguments[0].data;
         //   try {
         //      if (_self === undefined || _self.length === 0) {
         //         return false;
         //      }

         //      formResize(_self);
         //      _self = null;
         //   } catch (err) {
         //      errorHandle(formName, 'window_on_resize', err);
         //   }
         //});

         self = null;
         options = null;
         $btncsCC1 = null;
         $btncsCC2 = null;
      }
      catch (err) {
         errorHandle(formName, 'addHandertControls', err);
      }
   }
   function addHandertWindow(div) {
      try {
         var self = div;
         var $csw = $('#' + self.options.windowId);
         var $radSearch = $csw.find('span[data-csCC="search"]');
         var $txtSearch = $csw.find('input[data-csCC="txtSearch"]');
         var $btncsOK = $csw.find('button[data-csCC="btncsOK"]');
         var $btncsSelAll = $csw.find('button[data-csCC="btncsSelAll"]');
         var $btncsClear = $csw.find('button[data-csCC="btncsClear"]');
         var $btncsCancel = $csw.find('button[data-csCC="btncsCancel"]');
         var $btnShowSelectItems = $csw.find('button[data-csCC="btnShowSelectItems"]');
         
         //替生成的子視窗按鈕掛事件
         //搜尋種類
         $radSearch.off();
         $radSearch.on('click', { self: self, $csw: $csw }, function () {  //按了搜尋種類鈕
            try {
               var options = arguments[0].data.self.options;
               var _$csw = arguments[0].data.$csw;
               var _$SearchText = _$csw.find('input[data-csCC="txtSearch"]');
               var $csGrid = _$csw.find('div[data-csCC="grdMain"]');
               var inData = _$SearchText.val();
               if ($.trim(inData) === "") {
                  $csGrid.jqxGrid('clearfilters');
                  return;
               }

               var _$searchtype = _$csw.find('span[data-csCC="search"]');
               var searchType = _$searchtype.jqxButtonGroup('getSelection');
               var datafield = options.codeNoField;
               if (searchType === 1) {
                  datafield = options.descriptionField;
               }

               $csGrid.jqxGrid('clearfilters');
               var filtertype = 'stringfilter';
               var filtergroup = new $.jqx.filter();
               var filter_or_operator = 1;
               var filtervalue = inData;
               var filtercondition = 'CONTAINS';
               var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
               filtergroup.addfilter(filter_or_operator, filter);
               $csGrid.jqxGrid('addfilter', datafield, filtergroup);
               $csGrid.jqxGrid('applyfilters');

               _$searchtype = null;
               searchType = null;
               datafield = null;
               filtertype = null;
               filtergroup = null;
               filter_or_operator = null;
               filtervalue = null;
               filtercondition = null;
               filter = null;
  
               options = null;
               _$csw = null;
               _$SearchText = null;
               $csGrid = null;
               inData = null;
            } catch (err) {
               errorHandle(formName, 'onSearchTypeClick', err);
            }
         });
         $radSearch = null;

         //搜尋目標文字
         $txtSearch.off();
         $txtSearch.on('keyup', { self: self, $csw: $csw }, function () {  //變更了搜尋文字
            try {
               var options = arguments[0].data.self.options;
               var _$csw = arguments[0].data.$csw;
               var $csGrid = _$csw.find('div[data-csCC="grdMain"]');
               if ($.trim(this.value) === "") {
                  $csGrid.jqxGrid('clearfilters');
                  $csGrid = null;
                  return;
               }

               var _$searchtype = _$csw.find('span[data-csCC="search"]');
               var searchType = _$searchtype.jqxButtonGroup('getSelection');
               var datafield = options.codeNoField;
               if (searchType === 1) {
                  datafield = options.descriptionField;
               }

               $csGrid.jqxGrid('clearfilters');
               var filtertype = 'stringfilter';
               var filtergroup = new $.jqx.filter();
               var filter_or_operator = 1;
               var filtervalue = this.value;
               var filtercondition = 'CONTAINS';
               var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
               filtergroup.addfilter(filter_or_operator, filter);
               $csGrid.jqxGrid('addfilter', datafield, filtergroup);
               $csGrid.jqxGrid('applyfilters');

               _$csw = null;
               $csGrid = null;
               _$searchtype = null;
               searchType = null;
               datafield = null;
               filtertype = null;
               filtergroup = null;
               filter_or_operator = null;
               filtervalue = null;
               filtercondition = null;
               filter = null;
            } catch (err) {
               errorHandle(formName, 'search_Apply', err);
            }
         });
         $txtSearch = null;

         //確定
         $btncsOK.off();
         $btncsOK.on('click', { self: self, $csw: $csw }, function () {   //按了確定鈕
            try {
               var _self = arguments[0].data.self;
               var _$csw = arguments[0].data.$csw;
               var _options = _self.options;
               $(this).siblings().prop('disabled', true);

               var arr;
               if (_options.orderByChoose) {
                  //var arr = _options.source.map(function (element, index, array) {
                  //   return element.ord > 0;
                  //});
                  arr = $.grep(_options.source, function (element, index) {
                     return element.ord > 0;
                  });
                  arr.sort(function (a, b) {
                     return a.ord - b.ord;
                  });
               }
               else {
                  arr = _options.source;
                  //arr = $.grep(_options.source, function (element, index) {
                  //   return element.sel > 0;
                  //});
               }
               proc_CodeNoInfo(_self, arr);

               $(this).siblings().prop('disabled', false);


               //釋放csWindow
               formDestroy(_self, 2);

               _$csw.csWindow('close');
               _$csw.csWindow('destroy');


               // 自定義事件回呼
               _self.$activeElement.triggerHandler('chooseCompleted');

               _self = null;
               _$csw = null;
               _options = null;
               arr = null;
            } catch (err) {
               errorHandle(formName, 'onOKClick', err);
            }
         });
         $btncsOK = null;

         //按了全部顯示/顯示已選擇項目==>已選取
         $btnShowSelectItems.off();
         $btnShowSelectItems.on('click', { self: self, $csw: $csw }, function () {
             try {
                 var options = arguments[0].data.self.options;
                 var lang = options.language;
                 var _$csw = arguments[0].data.$csw;
                 var $csGrid = _$csw.find('div[data-csCC="grdMain"]');
                 var $txtSearch = _$csw.find('input[data-csCC="txtSearch"]');
                 $txtSearch.val(''); //清空篩選值
                 if (options.isShowSelected == true) {
                     $(this).css({ color: 'black' });
                     options.isShowSelected = false;
                     $csGrid.jqxGrid('clearfilters');
                     $csGrid = null;
                     _$csw = null;
                     $csGrid = null;
                     lang = null;
                     options = null;
                     return;
                 } else {
                     $(this).css({ color: '#e17009' });
                     options.isShowSelected = true;
                     $csGrid.jqxGrid('clearfilters');
                     var datafield = 'sel';
                     var filtertype = 'booleanfilter';
                     var filtergroup = new $.jqx.filter();
                     var filter_or_operator = 1;
                     var filtervalue = true;
                     var filtercondition = 'EQUAL';
                     var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
                     filtergroup.addfilter(filter_or_operator, filter);
                     $csGrid.jqxGrid('addfilter', datafield, filtergroup);
                     $csGrid.jqxGrid('applyfilters');
                     _$csw = null;
                     $csGrid = null;
                     datafield = null;
                     filtertype = null;
                     filtergroup = null;
                     filter_or_operator = null;
                     filtervalue = null;
                     filtercondition = null;
                     filter = null;
                 }
             } catch (err) {
                 errorHandle(formName, 'search_Apply', err);
             }
         });
         $btnShowSelectItems = null;

         //全選
         $btncsSelAll.off();
         $btncsSelAll.on('click', { self: self, $csw: $csw }, function () {   //按了全選鈕
            try {
               var options = arguments[0].data.self.options;
               var _$csw = arguments[0].data.$csw;
               var $csGrid = _$csw.find('div[data-csCC="grdMain"]');
               var rows = $csGrid.jqxGrid('getrows');
               for (var i = 0; cnt = rows.length, i < cnt; i++) {
                  rows[i].sel = 1;
                  rows[i].ord = i + 1;
                  if (rows[i]['dataindex'] === undefined) {
                      options.source[i].sel = 1;
                      options.source[i].ord = i + 1;
                  } else {
                      options.source[rows[i]['dataindex']].sel = 1;
                      options.source[rows[i]['dataindex']].ord = i + 1;
                  }
               }
               $csGrid.jqxGrid('updatebounddata');//refreshdata
               options.selectAll = true;

               refreshDataInfo(arguments[0].data.self, 0);

               options = null;
               _$csw = null;
               $csGrid = null;
               rows = null;
            } catch (err) {
               errorHandle(formName, 'onSelAllClick', err);
            }
         });
         $btncsSelAll = null;

         //全不選
         $btncsClear.off();
         $btncsClear.on('click', { self: self, $csw: $csw }, function () {   //按了全不選鈕
            try {
               var options = arguments[0].data.self.options;
               var _$csw = arguments[0].data.$csw;
               var $csGrid = _$csw.find('div[data-csCC="grdMain"]');
               var rows = $csGrid.jqxGrid('getrows');
               for (var i = 0; cnt = rows.length, i < cnt; i++) {
                  rows[i].sel = 0;
                  rows[i].ord = null;
                  if (rows[i]['dataindex'] === undefined) {
                      options.source[i].sel = 0;
                      options.source[i].ord = null;
                  } else {
                      options.source[rows[i]['dataindex']].sel = 0;
                      options.source[rows[i]['dataindex']].ord = null;
                  }
               }
               $csGrid.jqxGrid('updatebounddata');//refreshdata
               options.selectAll = false;

               refreshDataInfo(arguments[0].data.self, 0);

               options = null;
               _$csw = null;
               $csGrid = null;
               rows = null;
            } catch (err) {
               errorHandle(formName, 'onClearClick', err);
            }
         });
         $btncsClear = null;

         //取消
         $btncsCancel.off();
         $btncsCancel.on('click', self, function () {   //按了取消鈕
            try {
               var _self = arguments[0].data;
               var _options = _self.options;
               var _$csw = $('#' + _self.options.windowId);
               var $csGrid = _$csw.find('div[data-csCC="grdMain"]');
               //清掉所有, 再以前次codeList為基準 並勾選
               var _$csMulti = _self.$activeElement.find('div[data-pid="csMulti"]');
               var codeList = _$csMulti.data("data-codeno");
               if (codeList !== undefined && codeList !== null) {
                  var oo = codeList.split(',');
                  var rows = $csGrid.jqxGrid('getrows');
                  var iCnt = 1;
                  for (var i = 0; cnt = rows.length, i < cnt; i++) {
                     var o = $.grep(oo, function (item) {
                        if (item !== null && rows[i][_options.codeNoField] !== null) {
                           return item.toString() === rows[i][_options.codeNoField];
                        } else {
                           return false;
                        }
                     });

                     if (rows[i]['dataindex'] === undefined) {
                         if (o.length > 0) {
                             _options.source[i].sel = 1;
                             _options.source[i].ord = iCnt;
                             iCnt++;
                         } else {
                             _options.source[i].sel = 0;
                             _options.source[i].ord = null;
                         }
                     } else {
                         if (o.length > 0) {
                             _options.source[rows[i]['dataindex']].sel = 1;
                             _options.source[rows[i]['dataindex']].ord = iCnt;
                             iCnt++;
                         } else {
                             _options.source[rows[i]['dataindex']].sel = 0;
                             _options.source[rows[i]['dataindex']].ord = null;
                         }
                     }
                     o = null;
                  }
                  oo = null;
                  rows = null;
                  iCnt = null;
               }

               //$csGrid.jqxGrid('updatebounddata');
               //$csGrid.jqxGrid('refresh');
              
               //釋放csWindow
               formDestroy(_self, 2);

               _$csw.csWindow('close');
               _$csw.csWindow('destroy');
                               

               // 自定義事件回呼
               _self.$activeElement.triggerHandler('chooseCanceled');

               _self = null;
               _$csw = null;
               $csGrid = null;
               _$csMulti = null;
               codeList = null;
            } catch (err) {
               errorHandle(formName, 'onCancelClick', err);
            }
         });
         $btncsCancel = null;

         self = null;
         $csw = null;
      }
      catch (err) {
         errorHandle(formName, 'addHandertControls', err);
      }
   }
   function proc_Default_Selected(self) {
      try {
          var options = self.options;
          if (options.source == null) return false;

         if (options.source.length > 0) {  //&& options.source[0].sel === undefined
            var ds = options.source;
            for (var i = 0; cnt = ds.length, i < cnt; i++) {
               ds[i].ord = null;
               ds[i].sel = 0;
            }

            if (options.displayValue !== undefined && options.displayValue !== null && options.displayValue !== '') {
               var oo = [], idx = 0;
               options.displayValue = options.displayValue + '';
               oo = options.displayValue.split(',');
               for (var i = 0, cnt = oo.length; i < cnt; i++) {
                  var o = $.grep(ds, function (item) {
                     if (item[options.codeNoField] !== null && oo[i] !== null) {
                        return item[options.codeNoField].toString() === oo[i];
                     } else {
                        return false;
                     }
                  });

                  if (o.length > 0) {
                    if (options.displayOrd != undefined)
                        o[0].ord = options.displayOrd[idx];
                    else
                        o[0].ord = i + 1;
                    o[0].sel = 1;
                    idx += 1;
                  }
                  o = null;
               }
               oo = null;
            }
            ds = null;
         }
         options = null;
      } catch (err) {
         errorHandle(formName, 'proc_Default_Selected', err);
      }
   }
   function proc_CodeNoInfo(self, arr) {
      try {
          var options = self.options,
              lang = options.language,
              codeno = '', desc = '', codenoQuote = '', descQuote = '',
              ordValue = '', ordList = '',
              isAll = true,
              tmpCodeno, tmpDesc;
         for (var i = 0; cnt = arr.length, i < cnt; i++) {
            if (arr[i].sel === 1) {
               tmpCodeno = arr[i][options.codeNoField];
               tmpDesc = arr[i][options.descriptionField];
               codeno += tmpCodeno + ",";
               desc += tmpDesc + ",";
               codenoQuote += "'" + tmpCodeno + "',";
               descQuote += "'" + tmpDesc + "',";
               //options.source[i].sel = 1;
                //檢查如果有options.orderByChoose==true
               if (options.orderByChoose == true) {
                   if (arr[i].ord != undefined && $.isNumeric(arr[i].ord)) {
                       ordValue += arr[i].ord + ",";
                       ordList += tmpCodeno + ",";
                   }
               }
            } else {
               //options.source[i].sel = 0;
               isAll = false;
            }
         }
         tmpCodeno = null;
         tmpDesc = null;

         if (desc.length > 1) {
            codeno = codeno.substr(0, codeno.length - 1);
            desc = desc.substr(0, desc.length - 1);
            codenoQuote = codenoQuote.substr(0, codenoQuote.length - 1);
            descQuote = descQuote.substr(0, descQuote.length - 1);
            ordValue = ordValue.substr(0, ordValue.length - 1);
            ordList = ordList.substr(0, ordList.length - 1);
         }


         var o = $.grep(arr, function (item) {
            return item.sel > 0;
         });
         //var oo = $.grep(options.source, function (item) {
         //   return item.sel > 0;
         //});
         if (options.source.length > 0 && o.length === options.source.length) {
            isAll = true;
         } else {
            isAll = false;
         }
         options.selectAll = isAll;
         o = null;

         var _$csMulti = self.$activeElement.find('div[data-pid="csMulti"]');
         var _$txtcsCC3 = _$csMulti.find('input[data-csCC="txtcsCC3"]');
         //_$txtcsCC3.off();
         if (options.selectAll === true) {
            _$txtcsCC3.val('(' + lang.btncsSelAll + ')');  //全選
         } else {
             if (options.showCodeNoList == true) {
                 _$txtcsCC3.val(codeno);
             } else {
                 _$txtcsCC3.val(desc);
             }
         }

         _$txtcsCC3 = null;

         var _codeno;
         _codeno = _$csMulti.data("data-codeno");

         _$csMulti.data("data-codeno", codeno);
         _$csMulti.data("data-description", desc);
         _$csMulti.data("data-codenoQuote", codenoQuote);
         _$csMulti.data("data-descriptionQuote", descQuote);
         _$csMulti = null;

         options.displayValue = codeno;

         if (codeno !== _codeno) {
            // 自定義事件回呼
             self.$activeElement.triggerHandler('chooseChanged');
             options.chooseChanged = true;
         } else {
             options.chooseChanged = false;
         }
                  
         codeno = null;
         desc = null;
         codenoQuote = null;
         descQuote = null;
         isAll = null;
         rows = null;
      } catch (err) {
         errorHandle(formName, 'proc_CodeNoInfo', err);
      }

      return true;
   }
   function resize(self, data) {
      try {
         var $elem = self.$activeElement;

         //如果有指定了\width及height,便予以定值
         try {
            if (data !== undefined) {
               if (data['width'] !== undefined && $.isNumeric(data['width'])) {
                  $elem.width(data['width']);
                  options.width = data['width'];
               }
               if (data['height'] !== undefined && $.isNumeric(data['height'])) {
                  //$elem.height(data['height']);
                  options.buttonHeight = data['height'];
               }
            }
         } catch (err) {
            errorHandle(formName, 'resize-->width_height', err);
            return false;
         }

         var $btncsCC1 = $elem.find('button[data-csCC="btncsCC1"]');
         var $btncsCC2 = $elem.find('button[data-csCC="btncsCC2"]');
         var $txtcsCC3 = $elem.find('input[data-csCC="txtcsCC3"]');
         var ccWidth = $elem.width() - $btncsCC1.outerWidth() - $btncsCC2.outerWidth() - 9;
         if ($elem.css('padding-left') && $elem.css('padding-left') > 0) {
            ccWidth -= Number($elem.css('padding-left'));
         }
         if ($elem.css('padding-right') && $elem.css('padding-right') > 0) {
            ccWidth -= Number($elem.css('padding-right'));
         }
         $txtcsCC3.jqxInput({ width: ccWidth });
         $btncsCC1.jqxButton('height', options.height);
         $btncsCC2.jqxButton('height', options.height);
         $txtcsCC3.jqxInput('height', options.height - 3);
         $btncsCC1 = null;
         $btncsCC2 = null;
         $txtcsCC3 = null;
         ccWidth = null;

      } catch (err) {
         errorHandle(formName, 'resize', err);
      }
   }
   function getDescriptionByCodeno(data, codeno, key, desc) {
      var rtnStr = '';
      var strTmp = '';

      try {
         if (data !== null && codeno !== '') {
            var oo = [];
            strTmp = codeno;
            try {
               oo = strTmp.split(',');
            } catch (e) { }
            for (var i = 0, cnt = oo.length; i < cnt; i++) {
               var o = $.grep(data, function (item) {
                  if (item[key] !== null && oo[i] !== null) {
                     return item[key].toString() === oo[i];
                  } else {
                     return false;
                  }
               });

               if (o.length > 0) {
                  rtnStr += o[0][desc] + ',';
               } else {
                  rtnStr += '?????,';
               }
               o = null;
            }

            if (oo.length > 0) {
               rtnStr = rtnStr.substr(0, rtnStr.length - 1);
            }
            oo = null;
         }
      } catch (err) {
         errorHandle('', 'getDescriptionByCodeno', err);
      }
      return rtnStr;
   }
   function selectAll(self, args) {
      try {
         var options = self.options;
         var rows = options.source;
         for (var i = 0; cnt = rows.length, i < cnt; i++) {
            rows[i].sel = args ? 1 : 0;
            if (options.showOrdColumn === true) {
               rows[i].ord = i + 1;
            } else {
               rows[i].ord = null;
            }
         }
         proc_CodeNoInfo(self, rows);

         options.selectAll = true;

         rows = null;
         options = null;
      } catch (err) {
         errorHandle(formName, 'selectAll', err);
      }
   }
   function grd_cellvaluechanged(self, div, event, command) {
      try {
         var options = self.options;
         if (options.disabled === true) {
            return;
         }

         var $csGrid = $(div);
         if (command === 1) {  //rowdoubleclick
            var rows = $csGrid.jqxGrid('getrows');
            var _data = $csGrid.jqxGrid('getrowdata', event.args.rowindex);
            var ord = Math.max.apply(Math, rows.map(function (o) { return $.isNumeric(o.ord) ? o.ord : 0; }));
            if (_data.sel === 0) {
               $csGrid.jqxGrid('setcellvalue', event.args.rowindex, "sel", 1);
               options.source[event.args.rowindex].sel = 1;

               if (options.orderByChoose) {
                  $csGrid.jqxGrid('setcellvalue', event.args.rowindex, "ord", ord + 1);
                  options.source[event.args.rowindex].ord = ord + 1;
               }
            } else {
               if (_data.ord < ord) {
                  ord = _data.ord;
                  for (var i = 0; cnt = rows.length, i < cnt; i++) {
                      if (rows[i].ord == null) continue;

                      if (rows[i].ord > ord) {
                          if (rows[i]['dataindex'] == undefined) {
                              rows[i].ord -= 1;
                              options.source[i].ord = rows[i].ord;
                          } else {
                              rows[rows[i]['dataindex']].ord -= 1;
                              options.source[rows[i]['dataindex']].ord = rows[i].ord;
                          }
                     } else if (rows[i].ord === ord) {
                        rows[i].ord = null;
                        rows[i].sel = 0;
                        if (rows[i]['dataindex'] == undefined) {
                            options.source[i].ord = null;
                            options.source[i].sel = 0;
                        } else {
                            options.source[rows[i]['dataindex']].ord = null;
                            options.source[rows[i]['dataindex']].sel = 0;
                        }
                     }
                  }
                  $csGrid.jqxGrid('updatebounddata');//updatebounddata & refreshdata
               } else {
                  $csGrid.jqxGrid('setcellvalue', event.args.rowindex, "sel", 0);
                  options.source[event.args.rowindex].sel = 0;

                  if (options.orderByChoose) {
                     $csGrid.jqxGrid('setcellvalue', event.args.rowindex, "ord", null);
                     options.source[event.args.rowindex].ord = null;
                  }
               }
            }
            row = null;
            _data = null;
            ord = null;
         } else { //cellvaluechanged
            var rows = $csGrid.jqxGrid('getrows');
            var _data = $csGrid.jqxGrid('getrowdata', event.args.rowindex);
            var ord = Math.max.apply(Math, rows.map(function (o) { return $.isNumeric(o.ord) ? o.ord : 0; }));
            if (_data.sel === 1) {
               options.source[event.args.rowindex].sel = 1;

               if (options.orderByChoose) {
                  $csGrid.jqxGrid('setcellvalue', event.args.rowindex, "ord", ord + 1);
                  options.source[event.args.rowindex].ord = ord + 1;
               }
            } else {
               if (_data.ord !== null) {
                  if (_data.ord < ord) {
                     ord = _data.ord;
                     for (var i = 0; cnt = rows.length, i < cnt; i++) {
                        if (rows[i].ord == null) continue;

                        if (rows[i].ord > ord) {
                           rows[i].ord -= 1;
                           options.source[i].ord = rows[i].ord;
                        } else if (rows[i].ord === ord) {
                           rows[i].ord = null;
                           rows[i].sel = 0;
                           if (rows[i]['dataindex'] === undefined) {
                              options.source[i].ord = rows[i].ord;
                              options.source[i].sel = rows[i].sel;
                           } else {
                              options.source[rows[i].dataindex].ord = rows[i].ord;
                              options.source[rows[i].dataindex].sel = rows[i].sel;
                           }
                        }
                     }
                     $csGrid.jqxGrid('updatebounddata');//updatebounddata  & refreshdata
                  } else {
                     options.source[event.args.rowindex].sel = 0;

                     if (options.orderByChoose) {
                        $csGrid.jqxGrid('setcellvalue', event.args.rowindex, "ord", null);
                        options.source[event.args.rowindex].ord = null;
                     }
                  }
               }
            }
            row = null;
            _data = null;
            ord = null;
         }
         refreshDataInfo(self, event.args.rowindex + 1);

         options = null;
         $csGrid = null;
      } catch (err) {
         errorHandle(formName, 'grd_cellvaluechanged', err);
      }
   } // end grd_cellvaluechanged
   function clearDispValue(self) {
      try {
         var _options = self.options;
         if (_options.source !== undefined && _options.source !== null) {
            for (var i = 0, cnt = _options.source.length; i < cnt; i++) {
               _options.source[i].sel = 0;
               _options.source[i].ord = null;
            }
         }

         var _$csMulti = $('#' + _options.csmId);
         var _$txtcsCC3 = $('#' + _options.descId);
         _$txtcsCC3.val('');

         _$csMulti.data("data-codeno", '');
         _$csMulti.data("data-description", '');
         _$csMulti.data("data-codenoQuote", '');
         _$csMulti.data("data-descriptionQuote", '');
         _$csMulti = null;
         _$txtcsCC3 = null;
         _options.displayValue = '';

         // 自定義事件回呼
         self.$activeElement.triggerHandler('clearButtonClick');
      } catch (err) {
         errorHandle(formName, '@@clearButtonClick', err);
      }
   }
   function refreshDataInfo(self, postion) {
      //#8104 希望WEB多選元件可以像Win版顯示總筆數、已選取個數
      var options = self.options;
      if (options.source && options.source.length > 0) {
         var rows = options.source;
         var result = $.grep(options.source, function (element, index) {
            return element.sel > 0;
         });
         var $csDataInfo = $('#' + options.windowId).find('span[data-csCC="dataInfo"]');
         $csDataInfo.html(String.format(options.language.dataInfo, postion, rows.length, result.length));
         result = null;
         rows = null;
      }
      options = null;
   }

})(jQuery);