(function ($) {
	var formName = 'csList';
	var defCodeNoWidth = 60;
	var defWidth = 250;

	$.fn.csList = function (options, param, param2) {
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
				  options: $.extend({}, new defaults(), new csList(), options)
				});
				init(this);
			}
			state = null;
		 });
	  }
	  catch (err) {
		 errorHandle(formName, '$.fn.csList', err);
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
		 return jq.each(function (idx, element) {
			formDestroy(getSelf($(element)));
		 });
	  },
	  resize: function (div, params) {
		 return formResize( getSelf(div), params);
	  },
	  codeNo: function (div, params, params2) {
		 return _codeNo(div, params, params2);
	  },
	  description: function (div, params, params2) {
		 return _description(div, params, params2);
	  },
	  checkDataOk: function (div) {
		 return checkDataOk(div);
	  },
	  disabled: function (div, params) {
		 return _disabled(div, params);
	  },
	  onlyDropDown: function (div, params) {
		  return _onlyDropDown(div, params);
	  },
	  setDisplayValue: function (div, params) {
		 return _setDisplayValue(div, params);
	  },
	  focus: function (div) {
		 return _focus(div);
	  },
	  selectedItem: function (div) {
		 return getSelf(div).options.selectedItem;
	  },
	  source: function (div, params) {
		 return _source(div, params);
	  },
	  clearDisplayValue: function (div) {
		 return _clearDisplayValue(div);
	  },
	  selectedIndex: function (div, params) {
		return _selectedIndex(div, params);
	  },
	  popupHeight: function (div, params) {
		 return _popupHeight(div, params);
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
	  this.checkChange = true;
	  this.checkFilter = true;
	  this.isGridShow = false;
	  this.showColumnHeaders = false;
	  this.selectedIndex = -1;
	  this.disabled = false;
	  this.popupHeight = 100;
	  this.autoFitAllCols = false;
	  this.selectedItem = null;
	  this.codeNoField = null;
	  this.descriptionField = null;
	  this.codeNo = null;
	  this.description = null;
	  this.displayValue = null;
	  this.autoHeight = true;
	  this.isUpper = false;
		this.isOnlyDropDown = false;
		this.popupWidth = 0; //如果有給值, 就以它為準
	};
	function getSelf(jq) {
	  if (jq.length > 0) {
		 var oo = $.data(jq[0], formName);
		 if (oo === undefined) {
			 if (jq.parent().length>0)
				 oo = $.data(jq.parent()[0], formName);
			 else 
				 return undefined;
		 }
		 return oo;
	  } else {
		 return undefined;
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
	function formResize(self, params) {
	  try {
		 var options = self.options;
		 var controls = options.controls;
		 //for (var i = 0, iCnt = controls.length; i < iCnt; i++) {
		 //   if (controls[i].type.toUpperCase().indexOf('GRID') >= 0) {
		 //      var o = $('#' + controls[i].name);
		 //      o.each(function () {
		 //         $(this)[controls[i].type]('height', getGridHeight(div));
		 //      });
		 //   }
		 //}

		 var $elem = self.$activeElement;
		 //如果有指定了 width及height,便予以定值
		 if (params !== undefined && params !== null) {
			 if (convertNullToString(params).toString().indexOf('%') > 0) {
				 self.$activeElement.width(params);
				 options.width = self.$activeElement.width();
			 } else {
				 if (params['width'] !== undefined && $.isNumeric(params['width'])) {
					 $elem.width(params['width']);
					 options.width = params['width'];
				 }
				 if (params['height'] !== undefined && $.isNumeric(params['height'])) {
					 $elem.height(params['height']);
					 options.height = params['height'];
				 }
			 }
		 }

		 var width;
		 if (options.width === undefined) {
			if (self.$activeElement.parent().width === undefined) {
				width = defWidth;
			} else {
				width = self.$activeElement.parent().width();
			}
		 } else {
			if (options.width == 0) {
				width = self.$activeElement.parent().width();
			} else {
				self.$activeElement.width(options.width);
				width = self.$activeElement.width();
			}
		 }
		  //保留呼叫的設定值, 供resize時判斷用==>0-->100%
		 //options.width = width;
		 options.activeWidth = width;

		 var $csl = self.$activeElement.find('#' + options.dropDownId);
		 $csl.jqxDropDownButton('width', width - 1.5);
		 options.dropDownButtonWidth = width - 1.5;

		 var $txtDesc = $('#' + options.descId);
		 var $child = $($elem.children().children()[2]);
		 $child.css('width', 20);
		 

		 var dWidth = width - options.codeNoWidth - 36;
		 if ($elem.css('padding-left') && $elem.css('padding-left') > 0) {
			dWidth -= Number($elem.css('padding-left'));
		 }
		 if ($elem.css('padding-right') && $elem.css('padding-right') > 0) {
			dWidth -= Number($elem.css('padding-right'));
		 }
		 if ($child.css('margin-left') && $child.css('margin-left') > 0) {
			dWidth -= Number($child.css('margin-left'));
		 }
		 if ($child.css('margin-right') && $child.css('margin-right') > 0) {
			dWidth -= Number($child.css('margin-right'));
		 }

		 $txtDesc.jqxInput({ width: Math.floor(dWidth) });

		 if (options.columns !== undefined && options.columns.length > 0) {
			options.columns[0].width = options.codeNoWidth + 5;
			if (options.columns.length === 2) {
				options.columns[1].width = width - options.columns[0].width - 5;
			}

			if (options.gridId !== undefined && options.gridId !== '') {
				$('#' + options.gridId).jqxGrid({ columns: options.columns });
				$('#' + options.gridId).jqxGrid('render');
			}
		 }

		 self = null;
		 options = null;
		 controls = null;
		 $elem = null;
		 width = null;
		 $txtDesc = null;
		 $child = null;
		 dWidth = null;
	  }
	  catch (err) {
		 errorHandle(formName, 'formResize', err);
	  }
	}
	function formDestroy(self) {
	  try {
		 if (self === undefined || self === null) {
			return false;
		 }
		 //self.options.source.length = 0;
		 //self.options.source = null;
		 //$('#' + self.options.gridId).jqxGrid('clear');
		 //$('#' + self.options.gridId).jqxGrid('destroy');

		 //var obj = self.$activeElement;
		 //$('*', obj).each(function () {
		 //   var events = $.data(this, 'events') && $.each(events, function (i, e1) {
		 //      $(e).unbind(i + '.*');
		 //   });
		 //   if ($.data(this)['jqxWidget'] != undefined && $.data(this)['jqxWidget']['events'] != undefined) {
		 //      $(this).off($.data(this)['jqxWidget']['events'].join());
		 //   }
		 //   $.event.remove(this);
		 //   $.removeData(this);
		 //});
		 //$('*', obj).each(function () {
		 //   $.event.remove(this);
		 //   $.removeData(this);
		 //});

		 $('#' + self.options.dropDownId).jqxDropDownButton('close');
		 //$('#' + self.options.dropDownId).jqxDropDownButton('setContent', '');
		 //$('#' + self.options.dropDownId).jqxDropDownButton('destroy');
		 
		 $(document).off('click.' + self.options.dropDownId);
		 
		 var controls = self.options.controls;
		 //for (var j = 5; j >= 0; j--) {
		 //  for (var i = controls.length - 1; i >= 0; i--) {
		 //     var o = $('#' + controls[i].name);
		 //     //2016/11/01 jqx Bug 沒有把scroll 事件清除
		 //     if (controls[i]['type'] == 'jqxDropDownButton') {
		 //  	  //$($("#" + controls[i]['name']).parents()).off();
		 //  	  $("#" + controls[i]['name']).parents().off('scroll.dropdownbutton' + controls[i]['name']);
		 //     }
		 //     $(o).off();

		 //     if (controls[i].level === j) {
		 //  	  if (controls[i].type === 'style') {
		 //  		 $('#' + controls[i].name).remove();
		 //  	  } else if (controls[i].type === 'function') {
		 //  		 controls[i].name = null;
		 //  	  }
		 //  	  else {
		 //  		 var o = $('#' + controls[i].name);
		 //  		 o.each(function () {
		 //  			$(this).off();
		 //  			$(this)[controls[i].type]('destroy');
		 //  		    //controls.splice(i, 1);
		 //  			if (controls[i]['type'] == 'jqxDropDownButton') {
		 //  			   $('#dropDownButtonArrow' + controls[i].name).off().remove();
		 //  			   $('#dropDownButtonWrapper' + controls[i].name).off().remove();
		 //  			   $('#dropDownButtonContent' + controls[i].name).off().remove();
		 //  			   $('#dropDownButtonPopup' + controls[i].name).off().remove();
		 //  			} else {
		 //  			   $(this).remove();
		 //  			}
		 //  		 });
		 //  	  }
		 //     }
		 //  }
		 //}
		 destroyControls(self.options.controls);
		 deleteJSONObject(self.options);
		 offElementEvents(self.$activeElement);
		 $.data(self.$activeElement, formName, null);
		 self.$activeElement.off();

		 $(document).off('mousedown.' + self.options.dropDownId).remove();
		 self.$activeElement.off().remove();

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

		 $.cleanData(self.$activeElement, true);
		  //self.$activeElement[0].children[0].remove();
		 for (var item in self) {
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
	function _codeNo(jq, params, params2) {
	  try {
		  var oo = getSelf(jq);
		  if (oo === undefined) return;

		 var lang = oo.options.language;
		 if (params !== undefined && params !== null) {

			 if (params === undefined || params === null || params === '') {
				//alert(lang.codeNo_Mustbe); //'codeNo不可為空值!'
				_clearDisplayValue(jq);
				return true;
			}
			if (oo.options.source === undefined || oo.options.source === null || oo.options.source.length === 0) {
				//alert(lang.source_Mustbe); //'source不可為空值!'
				return false;
			}
			//從source取出對應的description來顯示
			if ($.isNumeric(params) || typeof params === 'string') {
				var o = {};
				o[oo.options.codeNoField] = params;
				setListValue(oo, o);
				o = null;
			} else {
				setListValue(oo, params);
			}
			// 自定義事件回呼
			oo.$activeElement.triggerHandler('selectedIndexChanged');
			oo = null;

			return true;
		 } else {
			  if (params === null || params === '') {
					//alert(lang.codeNo_Mustbe); //'codeNo不可為空值!'
					_clearDisplayValue(jq);
					return true;
			  }

			var ooo;
			if (oo.options.codeNo === null) {
				ooo = '';
			} else {
				ooo = oo.options.codeNo;
			}

			return ooo;
		 }
	  } catch (err) {
		 errorHandle(formName, 'codeNo', err);
	  }
	}
	function _description(jq, params, params2) {
	  try {
		 var oo = getSelf(jq);
		 var lang = oo.options.language;
		 if (params !== undefined && params !== null) {
			if (params === '') {
				//alert(lang.description_Mustbe); //'description不可為空值!'
				return false;
			}
			if (oo.options.source === undefined || oo.options.source === null) {
				//alert(lang.source_Mustbe); //'source不可為空值!'
				return false;
			}
			//從source取出對應的codeNo來顯示
			if (typeof params === 'string') {
				var o = {};
				o[oo.options.descriptionField] = params;
				setListDesc(oo, o);
				o = null;
			} else {
				setListDesc(oo, params);
			}
			// 自定義事件回呼
			oo.$activeElement.triggerHandler('selectedIndexChanged');
			oo = null;

			return true;
		 } else {
			var ooo;
			if (oo.options.codeNo === null) {
				ooo = '';
			} else {
				ooo = oo.options.description;
			}
			return ooo;
		 }
	  } catch (err) {
		 errorHandle(formName, 'description', err);
	  }
	}
	function _disabled(jq, params) {
	  try {
		 var oo = getSelf(jq);
		 if (params !== undefined && params !== null) {
			 if (oo.options.source !== undefined && oo.options.source !== null && oo.options.source.length > 0) {
				 var $csl = $('#' + oo.options.dropDownId);
				 if (oo.options.isOnlyDropDown == false) {
					 $csl.jqxDropDownButton('disabled', params);
					 $csl.find('div, input, textarea, select').attr('readonly', params);
				 } 
				 oo.options.disabled = params;
				 $csl = null;
			 } else {
				 ////params = true;
				 var $csl = $('#' + oo.options.dropDownId);
				 $csl.jqxDropDownButton('disabled', params);
				 $csl.find('div, input, textarea, select').attr('readonly', params);
				 oo.options.disabled = params;
				 $csl = null;
				 //messageBox(oo.options.language.NoData);
			 }
		 } else {
			 return oo.options.disabled;
		 }
		 oo = null;
	  } catch (err) {
		 errorHandle(formName, 'disabled', err);
	  }
	}
	function _onlyDropDown(jq, params) {
		try {
			var oo = getSelf(jq);
			var $csl = $('#' + oo.options.dropDownId);
			if (params !== undefined && params !== null) {
				$csl.find('input[data-csList="txtCodeNo"]').attr('readonly', params);
				$csl.find('input[data-csList="txtDesc"]').attr('readonly', params);
				//$csl.find('div, input, textarea, select').attr('readonly', params);
				if (params == true) {
					//$csl.find('select').attr('readonly', false);
					//$csl.find('div').attr('readonly', false);
					$csl.jqxDropDownButton('disabled', false);
				}
				oo.options.isOnlyDropDown = params;
			} else {
				return oo.options.isOnlyDropDown;
			}
			$csl = null;
		} catch (err) {
			errorHandle(formName, '_readOnly', err);
		}
	}
	function _setDisplayValue(jq, params) {
	   try {
		  var oo = getSelf(jq);
		  if (params !== null && params !== undefined) {
			  var $txtCodeNo = $('#' + oo.options.codeId);
			  var $txtDesc = $('#' + oo.options.descId);

			  if (params[oo.options.codeNoField] == undefined) {
				  oo.options.codeNoField = 'CODENO';
				  oo.options.descriptionField = 'DESCRIPTION';
			  }
			  $txtCodeNo.jqxInput('val', params[oo.options.codeNoField]);
			  $txtDesc.jqxInput('val', params[oo.options.descriptionField]);

			  oo.options.codeNo = params[oo.options.codeNoField];
			  oo.options.description = params[oo.options.descriptionField];
			  if (oo.options.source == undefined || oo.options.source == null || oo.options.source.length <= 0) {
				  oo.options.selectedItem = params;
			  } else {
				  //取得有無對應的row Data
				  var code = oo.options.codeNo + '';
				  var o = $.grep(oo.options.source, function (item) {
					  if (item[oo.options.codeNoField] !== undefined && item[oo.options.codeNoField] !== null && code !== undefined && code !== null) {
						  return item[oo.options.codeNoField].toString() === code.toString();
					  } else {
						  return false;
					  }
				  });
				  if (o.length > 0)
					  oo.options.selectedItem = o[0];
				  else
					  oo.options.selectedItem = params;
				  o = null;
				  code = null;
			  }

			  $txtCodeNo = null;
			  $txtDesc = null;
		  } else {
			  //messageBox(oo.options.language.NoData_setDisplayValue);
		  }
		  oo = null;
	  } catch (err) {
		 errorHandle(formName, 'setDisplayValue', err);
	  }
	  return true;
	}
	function _focus(jq) {
	  try {
		 var oo = getSelf(jq);
		 if (oo != undefined) {
			$('#' + oo.options.codeId).jqxInput('focus');
			oo = null;
		 }
	  } catch (err) {
		 errorHandle(formName, 'focus', err);
	  }
	  return true;
	}
	function _source(jq, params) {
	  try {
		 var oo = getSelf(jq);
		 if (params !== undefined) {
			  if (oo.options.gridId !== undefined && oo.options.gridId !== '') {
					$('#' + oo.options.gridId).jqxGrid('clearselection');
					$('#' + oo.options.gridId).jqxGrid('clear');
			  }

			 //檢查資料源中是否有 定義的codeNoField+descriptionField 欄位
			  //var msg = '';
			  //if (params.length > 0) {
			  //   if (params[0][oo.options.codeNoField] == undefined) {
			  //      msg += String.format(oo.options.language.Source_Field_NG, oo.options.codeNoField);
			  //   }
			  //   if (params[0][oo.options.descriptionField] == undefined) {
			  //      msg += String.format(oo.options.language.Source_Field_NG, oo.options.descriptionField);
			  //   }
			  //   if (msg != '') {
			  //      //alert(jq[0]['id'] + '：' + msg);
			  //      //messageBox(msg, messageType.critical);
			  //      //return;
			  //   }
			  //}

			  //如果  定義的codeNoField+descriptionField 欄位 不存在資料集中
			  //就重取 第1/2欄位當做 codeNoField+descriptionField 的預設值
			  if (params !== null && params.length > 0) {
				  var keys;
				  if (params[0][oo.options.codeNoField] == undefined || params[0][oo.options.descriptionField] == undefined) {
						keys = Object.keys(params[0]);
						oo.options.codeNoField = keys[0];
						oo.options.descriptionField = keys[1];
				  }
			  }

			//oo.options.gridId = '';
			var $txtCodeNo = $('#' + oo.options.codeId);
			var $txtDesc = $('#' + oo.options.descId);
			$txtCodeNo.jqxInput('val', '');
			$txtDesc.jqxInput('val', '');
			if (params == null) {
				$txtDesc.prop('placeholder', getLocalization().emptydatastring);
			} else {
				$txtDesc.prop('placeholder', '');
			}
			$txtCodeNo = null;
			$txtDesc = null;

			

			var source =
			 {
				localdata: params,
				datatype: "array"
			 };

			var dataAdapter = new $.jqx.dataAdapter(source, {});
			oo.options.source = params;
			oo.options.codeNo = '';
			oo.options.description = '';

			_renderBaseData(oo, dataAdapter);

			oo = null;
			source = null;
			dataAdapter = null;
		 } else {
			return oo.options.source;
		 }
	  } catch (err) {
		 errorHandle(formName, 'source', err);
	  }
	}
	function _clearDisplayValue(jq) {
	  try {
		 var oo = getSelf(jq);
		 var $txtCodeNo = $('#' + oo.options.codeId);
		 var $txtDesc = $('#' + oo.options.descId);
		 var hasValue = false;
		 if ($txtCodeNo.jqxInput('val') !== '') hasValue = true;
		 $txtCodeNo.jqxInput('val', '');
		 $txtDesc.jqxInput('val', '');
		 oo.options.codeNo = null;
		 oo.options.description = null;
		 oo.options.selectedItem = null;

		 // 自定義事件回呼
		 oo.$activeElement.triggerHandler('clearValued');
		 if (hasValue == true) {
			 // 自定義事件回呼
			  oo.$activeElement.triggerHandler('selectedIndexChanged');
		 }

		 oo = null;
		 $txtCodeNo = null;
		 $txtDesc = null;
	  } catch (err) {
		 errorHandle(formName, 'clearDisplayValue', err);
	  }
	  return true;
	}
	function _selectedIndex(jq, params) {
	  try {
		  var oo = getSelf(jq);
		  if (oo.options.source === undefined || oo.options.source === null || oo.options.source.length === 0) {
			  return false;
		  }

		 if (params !== undefined && $.isNumeric(params) === true) {
			 if (oo.options.selectedIndex === -1 && params === -1) {
				 return;
			 }
				 
			oo.options.selectedIndex = params;
			if (oo.options.gridId !== undefined && oo.options.gridId !== '') {
				//var grid = $('#' + oo.options.gridId);
				//$('#' + oo.options.gridId).jqxGrid('selectrow', params);
				 //grid.jqxGrid('selectedrowindex', params);
				 if (params != -1) {
					  var o = $('#' + oo.options.gridId).jqxGrid('getrowdata', params);
					  if (o == undefined) {
							//o = grid.jqxGrid('source').records[params];
							o = $('#' + oo.options.gridId).jqxGrid('source').records[params]
					  }
					  setListValue(oo, o);
				 } else {
					  $('#' + oo.options.gridId).jqxGrid('clearselection');
				 }

				// 自定義事件回呼
				oo.$activeElement.triggerHandler('selectedIndexChanged');
			} else {
				methods['setDisplayValue'](jq, oo.options.source[params]);
				// 自定義事件回呼
				oo.$activeElement.triggerHandler('selectedIndexChanged');
			}
		 } else {
			if (oo.options.gridId !== undefined && oo.options.gridId !== '') {
				oo.options.selectedIndex = $('#' + oo.options.gridId).jqxGrid('getselectedrowindex');
			}
			//計算selectedIndex
			for (var i = 0, iCnt = oo.options.source.length; i < iCnt; i++) {
			   if (oo.options.source[i][oo.options.codeNoField] == oo.options.codeNo) {
				  oo.options.selectedIndex = i;
				  break;
			   }
			}
			return oo.options.selectedIndex;
		 }
	  } catch (err) {
		 errorHandle(formName, 'codeNo', err);
	  }
	}
	function _popupHeight(jq, params) {
	  try {
		 var oo = getSelf(jq);
		 if (params !== undefined && params !== null) {
			oo.options.popupHeight = params;
		 } else {
			return oo.options.popupHeight;
		 }
		 oo = null;
	  } catch (err) {
		 errorHandle(formName, '_popupHeight', err);
	  }
	}



	//取得或設定CodeNo 值
	function accessorCodeNo(div, params, params2) {
	  try {
		 var options = div.options;
		 if (!params2) { params2 = true; }
		 //有值則為設值
		 if (params !== undefined) {
			options.checkChange = params2;
			$('#' + options.codeId).val(params);
			options.checkChange = true;
		 }
		 else {  //取值
			return options.codeNo;
		 }
	  }
	  catch (err) {
		 errorHandle(formName, 'accessorCodeNo', err);
	  }
	}
	//取得或設定Description 值
	function accessorDescription(div, params, params2) {
	  try {
		 var options = div.options;
		 if (!params2) { params2 = true; }
		 //有值則為設值
		 if (params !== undefined) {
			options.checkChange = params2;
			$('#' + options.descId).val(params);
			options.checkChange = true;
		 }
		 else {  //取值
			return options.description;
		 }
	  }
	  catch (err) {
		 errorHandle(formName, 'accessorDescription', err);
	  }
	}
	//檢核資料是否正確
	function checkDataOk(div) {
	  try {
		 var options = $.data(div, formName).options;
		 var data = options.data;
		 var columns = options.columns;
		 var codeValue = accessorCodeNo(div);
		 var descValue = accessorDescription(div);
		 if (codeValue.length === 0 && descValue.length === 0) {
			return true;
		 }
		 else if (codeValue.length > 0 && descValue.length > 0) {
			for (var i = 0, iCnt = data.length; i < icnt; i++) {
				if (data[i][columns[0].datafield] === codeValue) {
				  return data[i][columns[1].datafield] === descValue;
				}
			}
		 }
		 else {
			return false;
		 }
	  }
	  catch (err) {
		 errorHandle(formName, 'checkDataOk', err);
	  }
	}

	function init(div) {
	  try {
		 var self = $.data(div, formName);
		 self.$activeElement = $(div);
		 renderControls(self);
		 addHandertControls(self);
		 if (self.options.isOnlyDropDown == true) {
			 _onlyDropDown(self.$activeElement, self.options.isOnlyDropDown);
		 }
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
		 options.dropDownId = '';
		 options.gridId = '';
		 options.codeId = '';
		 options.descId = '';

		 var width = options.width;
		 var height = self.$activeElement.height();
		 var codeNoWidth = options.codeNoWidth;
		 if (!codeNoWidth || codeNoWidth === 0) { codeNoWidth = defCodeNoWidth; }
		 if (!width || width === 0) {
			//width = self.$activeElement.width();
			width = self.$activeElement.parent().width();
			self.$activeElement.width(width);
		 } else {
			self.$activeElement.width(width);
			width = self.$activeElement.width();
		 }
		
		 if (options.source === undefined) {
			 options.source = null;
		 }

		 var source = { localdata: options.source, datatype: "array" };
		 var dataAdapter = new $.jqx.dataAdapter(source);
		 source = null;


		 /*
		 if (options.source === undefined) { return; }
		 if (options.source !== null && $.isArray(options.source) === false) {
			alert('單選元件目前只接受陣列型別的資料!!');
			return;
		 }
		 */

		 var _codeno = "CODENO", _description = "DESCRIPTION";
		 //直接取用第一個欄位及第二個欄位來當做預欄位
		 if (options.source !== undefined && options.source !== null && options.columns === undefined) {
			var keys;
			if (options.source !== null && options.source.length > 0) {
				keys = Object.keys(options.source[0]);
				_codeno = keys[0];
				_description = keys[1];
				keys = null;

				options.columns = [
					{ text: lang.codeCaption, datafield: _codeno, width: options.codeNoWidth + 5 },
					{ text: lang.descriptionCaption, datafield: _description, width: width - (options.codeNoWidth + 5) - 5 }
				];
			} else {
				//alert(getElementId(self.$activeElement[0]) + '==>無資料!');
				//取displayValue的欄位來當預設欄位
				if (options.displayValue !== undefined && options.displayValue !== null) {
				  keys = Object.keys(options.displayValue);
				  _codeno = keys[0];
				  _description = keys[1];
				  keys = null;
				}
			}
		 } else {
			if (options.columns !== undefined && options.columns !== null) {
				_codeno = options.columns[0]['datafield'];
				_description = options.columns[1]['datafield'];
			}
		 }
		 options.codeNoField = _codeno;
		 options.descriptionField = _description;
		 _codeno = null;
		 _description = null;


		 if (options.columns !== undefined && options.columns.length > 0) {
			options.columns[0].width = options.codeNoWidth + 5;
			if (options.columns.length === 2) {
				options.columns[1].width = width - options.columns[0].width - 5;
			}
		 }

		 var $elem = self.$activeElement;
		 $('<div data-csList="cslMain" style="height:100%"><div data-csList="popup_grid"></div></div>').appendTo(self.$activeElement);
		 var $csl = $elem.find('div[data-csList="cslMain"]');
		 $csl.prop('id', self.$activeElement[0]['id'] + getUniqueId());
		 $csl.jqxDropDownButton({
			width: '100%',
			height: options.height,
			disabled: options.disabled,
			enableBrowserBoundsDetection: true,
			theme: options.theme
		 });
		 options.controls.push({ name: $csl[0]['id'], type: 'jqxDropDownButton', level: 1 });
		 options.dropDownId = $csl[0]['id'];
		  //清掉元件內部產生的tabindex屬性
		 $elem.find('div[data-csList="cslMain"]').find('div[tabindex]').removeAttr('tabindex');
		 //$csl.on('close', function (event) {
		 //   $('#' + options.descId).focus();
		 //});
		 //$csl.on('focusin', function (event) {
		 //    self.$activeElement.triggerHandler('lostFocus');
		 //});
		 //$csl.on('focusout', function (event) {
		 //    self.$activeElement.triggerHandler('gotFocus');
		 //});
		 

		 //$csl.css('boder-right', '6px');
		 //:
		 //$csl.css('border', 'solid');
		 //$csl.css('border-width', '1px');
		  //$csl.css('border-color', 'aqua');

		 //var $csl = $('#' + self.options.dropDownId);
		 //$csl.find('input').appendTo('body');

		  //placeholder="無資料...
		 $('<input type="text" data-csList="txtDesc" />').insertBefore($csl.children()[0]);
		 $('<input type="text" data-csList="txtCodeNo" />').insertBefore($csl.children()[0]);
		 
		 //$('<input type="text" data-csList="txtCodeNo"/>').insertBefore($csl);
		 //$('<input type="text" data-csList="txtDesc"/>').insertBefore($csl);
		 var $txtCodeNo = $csl.find('input[data-csList="txtCodeNo"]');
		 $txtCodeNo.prop('id', self.$activeElement[0]['id'] + 'txtCodeNo' + getUniqueId());
		 var $txtDesc = $csl.find('input[data-csList="txtDesc"]');
		 $txtDesc.prop('id', self.$activeElement[0]['id'] + 'txtDesc' + getUniqueId());
		 //$txtDesc.prop('placeholder', getLocalization().emptydatastring);
		 $txtCodeNo.css('float', 'left');
		 $txtDesc.css('float', 'left');
		 $csl.find('div, input, textarea, select').attr('readonly', options.disabled);
		 //$csl.attr('readonly', options.readOnly);

		 var $child = $($csl.children()[2]);
		 $txtCodeNo.jqxInput({
			width: codeNoWidth, height: '100%', theme: options.theme
		 });
		 options.codeId = $txtCodeNo[0]['id'];
		 
		 options.controls.push({ name: $txtCodeNo[0]['id'], type: 'jqxInput', level: 2 });
		 //$txtCodeNo.prop('readonly', options.readOnly);
		 $txtDesc.jqxInput({
		 height: '100%', theme: options.theme
		 });
		 codeNoWidth = null;
		 options.controls.push({ name: $txtDesc[0]['id'], type: 'jqxInput', level: 2 });
		 options.descId = $txtDesc[0]['id'];
		 //$csl.parent().find('input').insertBefore($csl.children()[0]);

		 $child.css('width',20);
		 $child.css('float', 'left');
		 $('#dropDownButtonContent' + $csl[0]['id']).css('display', 'none');
		 $child = null;

		 $txtCodeNo.css({ "border-top": 0, "border-bottom": 0, "border-left": 0, "border-radius": 0 });
		 $txtDesc.css({ "border-top": 0, "border-bottom": 0, "border-left": 0, "border-radius": 0 });
		 
		 //最後為UI重新做一次resize
		 formResize(self);

		 //如果無資料
		 if (options.source === undefined || options.source === null || options.source.length === 0) {
			$csl.jqxDropDownButton('disabled', true);
			$csl.find('div, input, textarea, select').attr('readonly', true);
			//options.disabled = true;
		 } else {
			 //未指定disabled屬性時
			 if (options.disabled == null) {
				 $csl.jqxDropDownButton('disabled', false);
				 $csl.find('div, input, textarea, select').attr('readonly', false);
				 //options.disabled = false;
			 } else {
				 $csl.jqxDropDownButton('disabled', options.disabled);
				 $csl.find('div, input, textarea, select').attr('readonly', options.disabled);
			 }
		 }

		 //直接填入預設顯示的資料
		 if (options.displayValue !== undefined && options.displayValue !== null) {
			setListValue(self, options.displayValue);
		 }


		 // 自定義事件回呼
		 self.$activeElement.triggerHandler('loadCompleted');

		 self = null;
		 //options = null;
		 width = null;
		 height = null;
		 codeNoWidth = null;
		 $csl = null;
		 $txtCodeNo = null;
		 $txtDesc = null;
		 $elem = null;
	  }
	  catch (err) {
		 errorHandle(formName, 'renderControls', err);
	  }
	}
	function addHandertControls(div) {
	  try {
		 var self = div;
		 var options = self.options;
		 var $csl = $('#' + options.dropDownId);
		 var $txtCodeNo = $('#' + options.codeId);
		 var $txtDesc = $('#' + options.descId);

		 //委派代碼資料異動時
		 var timeoutId = 0;
		 $txtCodeNo.off();
		 $txtCodeNo.on('input blur focus keydown keyup', function (events) {
			 if (arguments.length == 0) return;
			 var args = arguments;
			 var type = args[0].type;
			 var val = $(this).val();
			 options.val = val;
			 if (type === 'input') {
				 try {
					 //clearTimeout(timeoutId);
					 //timeoutId = setTimeout(function () {
						 
					 //}, 5);
					 accessorDescription(self, '', false);
					 if (!val || val.length === 0) {
						 options.codeNo = null;
						 options.description = null;
						 options.selectedItem = null;

						 $txtDesc.prop('placeholder', '');

						 // 自定義事件回呼
						 self.$activeElement.triggerHandler('selectedIndexChanged');
						 return;
					 }

					 $csl = $('#' + options.dropDownId);
					 if (options.checkChange) {
						 if (options.checkFilter) {
							 if ($csl.jqxDropDownButton('isOpened') === false) {
								 //$csl.jqxDropDownButton('open');
							 } else {
								 filterData(self, options.codeNoField, val);
							 }
						 }

						 var data = options.source;
						 for (var i = 0, iCnt = data.length; i < iCnt; i++) {
							 if (data[i][options.codeNoField].toString().toUpperCase() === val.toUpperCase()) {
								 $csl.jqxDropDownButton('close');
								 accessorDescription(self, data[i][options.descriptionField], false);
								 if (options.gridId !== undefined && options.gridId !== '') {
									 var $jqxgrid = $('#' + options.gridId);
									 if ($jqxgrid.length > 0) {
										 $jqxgrid.jqxGrid('clearfilters');
										 $jqxgrid.jqxGrid('selectrow', i);
									 }
									 $jqxgrid = null;
								 }
								 setListValue(self, data[i]);

								 // 自定義事件回呼
								 self.$activeElement.triggerHandler('selectedIndexChanged');
								 break;
							 }
						 }
						 data = null;
						 $('#' + options.codeId).jqxInput('focus');
					 }
				 }
				 catch (err) {
					 errorHandle(formName, 'addHandertControls_codeInput', err);
				 }
			 } else if (type === 'blur') {
				  try {
						//檢查CodeNo是否有對應的Description項目, 若沒有, 便清空CodeNo
						if ($.trim($txtCodeNo.jqxInput('val')) != '') {
							 if ($.trim($txtDesc.jqxInput('val')) == '') {
								  $txtCodeNo.jqxInput('val', '');
								  options.codeNo = null;
								  options.description = null;
								  options.selectedItem = null;
								  _selectedIndex(self.$activeElement, -1);
							 }
						}
					 // 自定義事件回呼
					  self.$activeElement.triggerHandler('codeNo_lostFocus');
					  self.$activeElement.triggerHandler('lostFocus');

				 } catch (err) {
					 errorHandle(formName, 'txtCodeNo_lostFocus', err);
				 }
			 } else if (type === 'focus') {
				 try {
					 // 自定義事件回呼
					  self.$activeElement.triggerHandler('codeNo_gotFocus');
					  self.$activeElement.triggerHandler('gotFocus');
					 //if (self.options.gridId === '') {
						//$csl.jqxDropDownButton('open');
						//$txtCodeNo.jqxInput('focus');
					 //}
				 } catch (err) {
					 errorHandle(formName, 'txtCodeNo_gotFocus', err);
				 }
			 } else if (type === 'keydown') {
				 var key = events.charCode ? events.charCode : events.keyCode ? events.keyCode : 0;
				 if (key === 13 || key === 9) {
					 $('#' + options.dropDownId).jqxDropDownButton('close');
					 $txtDesc.jqxInput('focus');
				 } else if (key === 40) {
					 $csl.jqxDropDownButton('open');
					 if (options.gridId !== undefined && options.gridId !== '') {
						 $('#' + options.gridId).jqxGrid('focus');
					 }
				 }
			 } else if (type === 'keyup') {
				 if (options.isUpper == true) {
					 $(this).val($(this).val().toUpperCase());
				 }
			 }
		 });
		
		  //委派名稱資料異動時
		 $txtDesc.off();
		 $txtDesc.on('input blur focus click', self, function (events) {
			var _self = arguments[0].data;
			var _options = _self.options;
			var type = arguments[0].type;
			if (type === 'input') {
				try {
					var val = $(this).val();
					val = $.trim(val);
					_options.val = val;
					accessorCodeNo(_self, '', false);
				  if (!val || val.length === 0) {
					 _options.codeNo = null;
					 _options.description = null;
					 _options.selectedItem = null;

					 //if (_options.selectedIndex !== -1) {
						 // 自定義事件回呼
						  _self.$activeElement.triggerHandler('selectedIndexChanged');
					 //}
					 return;
				  }
				 
				  $csl = $('#' + _options.dropDownId);
				  if (_options.checkChange) {
					 if (_options.checkFilter) {
						if ($csl.jqxDropDownButton('isOpened') === false) {
							$csl.jqxDropDownButton('open');
						} else {
							filterData(_self, _options.descriptionField, val);
						}
					 }

					 var data = _options.source;
					 for (var i = 0, iCnt = data.length; i < iCnt; i++) {
						if (data[i][_options.descriptionField].toString() === val) {
							$csl.jqxDropDownButton('close');
							accessorCodeNo(_self, data[i][_options.codeNoField], false);
							if (_options.gridId !== undefined && _options.gridId !== '') {
							  var $jqxgrid = $('#' + _options.gridId);
							  $jqxgrid.jqxGrid('clearfilters');
							  $jqxgrid.jqxGrid('selectrow', i);
							  $jqxgrid = null;
							}
							setListValue(_self, data[i]);
							// 自定義事件回呼
							_self.$activeElement.triggerHandler('selectedIndexChanged');
							break;
						}
					 }
					 data = null;
					 setTimeout(function () {
						 try {
							 $('#' + _options.descId)[0].focus();
						 }
						 catch (e) { }
					 }, 0);
					 //setTimeout(function () {
						
						 //$('#' + _options.descId).jqxInput('focus');
						 //$('#' + _options.descId).focus();
					 //}, 4000);
				  }
				}
				catch (err) {
				  errorHandle(formName, 'addHandertControls_descInput', err);
				}
			} else if (type === 'blur') {
				try {
					//$csl.jqxDropDownButton('close');
				  // 自定義事件回呼
					 _self.$activeElement.triggerHandler('description_lostFocus');
					 _self.$activeElement.triggerHandler('lostFocus');
				} catch (err) {
				  errorHandle(formName, 'txtDesc_lostFocus', err);
				}
			} else if (type === 'focus') {
				try {
					//if ($csl.jqxDropDownButton('isOpened') === false) {
					//    $csl.jqxDropDownButton('open');
					//}
				  // 自定義事件回呼
					 _self.$activeElement.triggerHandler('description_gotFocus');
					 _self.$activeElement.triggerHandler('gotFocus');
				} catch (err) {
				  errorHandle(formName, 'txtCodeNo_gotFocus', err);
				}
			}
			else if (type === 'keyup') {
				var key = events.charCode ? events.charCode : events.keyCode ? events.keyCode : 0;
				if (key === 13) {
					$('#' + options.dropDownId).jqxDropDownButton('close');
				} else if (key === 40) {
					$csl.jqxDropDownButton('open');
					if (options.gridId !== undefined && options.gridId !== '') {
						$('#' + options.gridId).jqxGrid('focus');
					}
				} else {
					events.preventDefault();
				}
			} else if (type === 'click') {
				if (options.disabled == false) {
					if ($csl.jqxDropDownButton('isOpened') === false && options.source !== null) {
						$csl.jqxDropDownButton('open');
						setTimeout(function () {
							try {
								//$('#' + _options.descId)[0].focus();
								$('#' + _options.descId).focus();
								//$('#' + _options.descId)[0].click();
								//$('#' + _options.descId).first().click();
								// 自定義事件回呼
								_self.$activeElement.triggerHandler('description_gotFocus');
								_self.$activeElement.triggerHandler('gotFocus');
							}
							catch (e) { }
						}, 200);
					}
				}
			}
			_self = null;
			//_options = null;
		 }); //$txtDesc.on
		  //委派點選下拉時
		  $csl.off('open');
		 $csl.on('open', self, function () {
			var _self = arguments[0].data;
			var _options = _self.options;

			if (_options.source === undefined || _options.source === null || _options.source.length === 0) {
				return;
			}

			try {
				var $jqxgrid;
				$jqxgrid = $('#dropDownButtonPopup' + _self.options.dropDownId).find('div[data-csList="popup_grid"]');
				if (_options.gridId == undefined || _options.gridId == null || _options.gridId == '') {
					$jqxgrid.prop('id', self.$activeElement[0]['id'] + 'popup_grid' + getUniqueId());
				}

				var ww = _options.dropDownButtonWidth - 2;
				if (_options.popupWidth > 0) { //如果有給值, 就以它為準
					if (ww < _options.popupWidth) {
						ww = _options.popupWidth;
						_options.activeWidth = ww;
					}
				}

				if (_options.columns !== undefined && _options.columns.length > 0) {
					_options.columns[0].width = _options.codeNoWidth + 5;
					if (_options.columns.length === 2) {
						_options.columns[1].width = _options.activeWidth - _options.columns[0].width - 20;
					}
				}


				if (_options.isGridShow === false && (_self.options.gridId === undefined || _self.options.gridId === '')) {
				  var source =
					  {
						 localdata: _options.source,
						 datatype: "array"
					  };

				  var dataAdapter = new $.jqx.dataAdapter(source, {
				  });
				  source = null;

				  //計算筆數, 自動給高度
				  if (_options.autoHeight === true && _options.source !== null) {
					 var rowCount = _options.source.length;
					 if (rowCount < 3) {
						rowCount = 8;
					 } else if (rowCount < 15) {
						//rowCount = 10;
					 } else {
						rowCount = 10;
					 }
					 _options.popupHeight = rowCount * 21;
				  } 

				  var gridOptions = {
					 width: ww,
					 height: _options.popupHeight,
					 rowsheight: 20,
					 //autoheight: true,
					 source: dataAdapter,
					 pageable: false,
					 sortable: false,
					 altrows: false,
					 enabletooltips: true,
					 editable: false,
					 selectedrowindex: _options.selectedIndex,
					 columnsautoresize: _options.autoFitAllCols,
					 showheader: _self.options.showColumnHeaders,
					 selectionmode: 'singlerow',
					 theme: _options.theme,
					 showtoolbar: false, showstatusbar: false,
					 filterable: false,
					 keyboardnavigation: false,
					 columns: _options.source === null ? [] : _options.columns,
					 ready: function (event) {
						var data = $jqxgrid.jqxGrid('getdisplayrows');
						for (var i = 0, iCnt = data.length; i < iCnt; i++) {
							if (data[i][_self.options.codeNoField].toString() === _self.options.codeNo) {
							  $jqxgrid.jqxGrid('selectrow', i);
							  break;
							}
						}
						data = null;
						// 自定義事件回呼
						_self.$activeElement.triggerHandler('dataLoadCompleted');

						//$jqxgrid.jqxGrid('focus');
					 }
				  };
				  
					try {
						$jqxgrid.jqxGrid(gridOptions);
					} catch (e) {			      }
				  
				  _options.controls.push({ name: $jqxgrid[0]['id'], type: 'jqxGrid', level: 3 });
				  _self.options.gridId = $jqxgrid[0]['id'];
				  gridOptions = null;
				  dataAdapter = null;
				  width = null;

				  if ($('#' + options.codeId).val() == '' && $('#' + options.descId).val() == '') {
					  _self.options.val = '';
				  }

				  if (_self.options.val !== undefined && _self.options.val !== null && _self.options.val !== '' && _self.options.description == '') {
					  filterData(_self, _options.codeNoField, _self.options.val);
				  } else {
					  try {
						  $jqxgrid.jqxGrid('clearfilters');
					  } catch (e) {				     }
				  }

				  $(document).off('click.' + _self.options.dropDownId);
				  $(document).on('click.' + _self.options.dropDownId, this, function (event) {
					  closeDropDownMenu_CsList(event);
				  });

				 

				  //formResize(_self);
				  //if (options.isRender == false) {
					 // options.isRender = true;
					 // $csl.jqxDropDownButton('close');
				  //}


					//rowselect
				  $jqxgrid.off('rowclick keyup');
				  $jqxgrid.on('rowclick keyup', _self, function (event) {
					 var _self = arguments[0].data;
					 var type = arguments[0].type;
					 if (type === 'rowclick') {
						try {
							var data;
							if (event.args.row === undefined) {
								data = $(this).jqxGrid('getrowdata', $(this).jqxGrid('getrowboundindex', event.args.rowindex + 1));
							} else {
								data = event.args.row.bounddata;
							}
							//如果選取的是同一筆row,便不進行後續動作
							if (data[_self.options.codeNoField] !=undefined && data[_self.options.codeNoField].toString() === _self.options.codeNo)
								return;
								
							setListValue(_self, data);

							$csl.jqxDropDownButton('close');
							//$jqxgrid.jqxGrid('clearfilters');

							// 自定義事件回呼
							_self.$activeElement.triggerHandler('selectedIndexChanged');
						} catch (err) {
							errorHandle(formName, 'jqxgrid_on_rowselect', err);
						}
					 } else if (type === 'keyup') {
						var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
						if (key === 13) {
							 $('#' + _self.options.gridId).triggerHandler('rowclick');
						} else if (key === 27) {
							$('#' + _self.options.dropDownId).jqxDropDownButton('close');
						} else if (key === 38) {
							var pos = $('#' + options.gridId).jqxGrid('getselectedrowindex');
							if (pos <= 0) {
								$('#' + options.codeId).focus();
							}
						}
					 }

					 _self = null;
					 type = null;
				  }); //end onrowselect
				} else {
				  //jqxGrid 已存在
				  if ($jqxgrid.jqxGrid('theme') !== _options.theme) {
					 $jqxgrid.jqxGrid('theme', _options.theme);
				  }

				  if ($jqxgrid.jqxGrid('source').data === null) {
					 source = { localdata: _options.source, datatype: "array" };
					 dataAdapter = new $.jqx.dataAdapter(source, {});
					 $jqxgrid.jqxGrid('source', dataAdapter);
					 source = null;
					 dataAdapter = null;
				  }

				  if ($('#' + options.codeId).val() == '' && $('#' + options.descId).val() == '') {
					  _self.options.val = '';
				  }

				  if (_self.options.val !== undefined && _self.options.val !== null && _self.options.val !== '' && _self.options.description == '') {
					  filterData(_self, _options.codeNoField, _self.options.val);
				  }
				}

				_options.isGridShow = true;
				//$(document).on('click.' + self.options.dropDownId, this, function (event) {
				//   closeDropDownMenu_CsList(event);
				//});

			  

				//整調popup_Grid的高度, 以後有時間再改成自動移到上方
				/*
				var hh;
				var gGB = Math.abs($jqxgrid.offset().top + $jqxgrid.jqxGrid('height'));
				if (gGB >= $('body').height()) {
				  hh = Math.abs($('body').height() - $jqxgrid.offset().top);
				  if (hh < _options.popupMiniHeight) {
					 hh = _options.popupMiniHeight;
				  }
				  $jqxgrid.jqxGrid('height', hh);
				} else {
				  if (_options.popupHeight !== undefined && _options.popupHeight !== null) {
					 $jqxgrid.jqxGrid('height', _options.popupHeight);
				  }
				}
				hh = null;
				gGB = null;
				*/
				//計算筆數, 自動給高度
				if (_options.autoHeight === true && _options.source !== null) {
					var rowCount = _options.source.length;
					if (rowCount < 3) {
						rowCount = 8;
					} else if (rowCount < 15) {
						//rowCount = 10;
					} else {
						rowCount = 10;
					}
					_options.popupHeight = rowCount * 21;
				} 

				if (_options.popupHeight !== undefined && _options.popupHeight !== null) {
				  $jqxgrid.jqxGrid('height', _options.popupHeight);
				}


				 //檢查位置, 若是向上彈==>需重新計算位置
				var $csl = $('#' +_self.options.dropDownId);
				var $pop = $('#dropDownButtonPopup' + _self.options.dropDownId);
				if ($csl.offset().top > $pop.offset().top) {
					 $pop.offset({ left: $pop.offset().left, top: $csl.offset().top - $pop.height() });
				}
			  
				// 自定義事件回呼
				_self.$activeElement.triggerHandler('dropDownButtonClick');

				try {
				  var selectedrowindex = $jqxgrid.jqxGrid('selectedrowindex');
				  $jqxgrid.jqxGrid('ensurerowvisible', selectedrowindex);
				}
				catch (err) {}

				// 自定義事件回呼
				_self.$activeElement.triggerHandler('popupOpened');

				$jqxgrid = null;
			} catch (err) {
				errorHandle(formName, 'csl_on_open', err);
			}
			_self = null;
		 });  //$csl.on_open


		  //委派收合時
		 $csl.off('close');
		 $csl.on('close', self, function () {
			 var _self = arguments[0].data;
			 if (_self.options.source === undefined || _self.options.source === null || _self.options.source.length === 0) {
				 return;
			 }

			 try {
				 var $jqxgrid = $('#' + _self.options.gridId);
				 try {
					 $jqxgrid.jqxGrid('clearfilters');
				 } catch (e) {			    }
				
				//$(document).off('click.' + _self.options.dropDownId);
				//$(document).off('click', closeDropDownMenu_CsList);

				$txtCodeNo.jqxInput('val', _self.options.codeNo);
				$txtDesc.jqxInput('val', _self.options.description);

				// 自定義事件回呼
				_self.$activeElement.triggerHandler('dropDownButtonClick');
				_self.$activeElement.triggerHandler('popupClosed');
			} catch (err) {
				errorHandle(formName, 'csl_on_close', err);
			}
			_self = null;
			$jqxgrid = null;
		 }); //$csl.on_close

		 //$(window).on('resize', self, function () {
		 //   var _self = arguments[0].data;
		 //   try {
		 //      if (_self === undefined || _self.length === 0) {
		 //         return false;
		 //      }

		 //      formResize(_self);
		 //   } catch (err) {
		 //      errorHandle(formName, 'window_on_resize', err);
		 //   }
		 //});

		
		 //self = null;
		 //options = null;
		 data = null;
		 codeId = null;
		 descId = null;
		 dropDownId = null;
	  }
	  catch (err) {
		 errorHandle(formName, 'addHandertControls', err);
	  }
	}
  

	function setListValue(self, row) {
	  var options = self.options;
	  try {
		 var $txtCodeNo = $('#' + options.codeId);
		 var $txtDesc = $('#' + options.descId);
		 //$txtCodeNo.jqxInput('val', '');
		 //$txtDesc.jqxInput('val', '');

		 if (options.source === null || options.source.length === 0) {
			if (row !== undefined || row === null) {
				options.codeNo = row[options.codeNoField].toString();
				options.description = row[options.descriptionField];
				options.selectedItem = row;
				$('#' + options.codeId).jqxInput('val', options.codeNo);
				$('#' + options.descId).jqxInput('val', options.description);
			}
			return;
		 }

		 var code = row[options.codeNoField] + '';
		 var o = $.grep(options.source, function (item) {
			if (item[options.codeNoField] !== null && code !== null) {
				return item[options.codeNoField].toString() === code.toString();
			} else {
				return false;
			}
		 });

		 if (o.length === 0 || row === null) {
			options.codeNo = null;
			options.description = null;
			options.selectedItem = null;
			options.selectedIndex = -1;
		 } else {
			options.codeNo = code;
			$txtCodeNo.jqxInput('val', code);

			var desc = row[options.descriptionField];
			if (desc === undefined || desc === null || desc === '') {
				if (o.length > 0) {
				  desc = o[0][options.descriptionField];
				}
			}

			if ($.isArray(o) === true && o.length > 0) {
			   options.selectedItem = o[0];
			   //計算selectedIndex
			   for (var i = 0, iCnt = options.source.length; i < iCnt; i++) {
				  if (options.source[i][options.codeNoField] == options.codeNo) {
					 options.selectedIndex = i;
					 break;
				  }
			   }
			}

			$txtDesc.jqxInput('val', desc);
			options.description = desc;

			// 自定義事件回呼
			  //self.$activeElement.triggerHandler('selectedIndexChanged');

			desc = null;
			$txtCodeNo = null;
			$txtDesc = null;
		 }
		 code = null;
		 o = null;

		 // 自定義事件回呼
			//self.$activeElement.triggerHandler('clearValued');
	  } catch (err) {
		 errorHandle(formName, 'setListValue', err);
	  }

	} 
	function setListDesc(self, row) {
	  var options = self.options;
	  try {
		 if (options.source === null || options.source.length === 0) {
			return;
		 }

		 var desc = row[options.descriptionField];
		 var o = $.grep(options.source, function (item) {
			 if (item[options.descriptionField] !== null && desc !== null) {
				 if (item[options.descriptionField] != undefined || item[options.descriptionField] != null) {
					 return item[options.descriptionField].toString() === desc.toString();
				 } else {
					 return false;
				 }
			} else {
				return false;
			}
		 });

		 if (o.length === 0 || row === null || options.source === null) {
			options.codeNo = null;
			options.description = null;
			options.selectedItem = null;
		 } else {
			var $txtCodeNo = $('#' + options.codeId);
			var $txtDesc = $('#' + options.descId);
			options.description = desc;
			$txtDesc.jqxInput('val', desc);
			var codeNo = row[options.codeNoField];
			if (codeNo === undefined || codeNo === null || codeNo === '') {
				if (o.length > 0) {
				  codeNo = o[0][options.codeNoField];
				}
			}

			if ($.isArray(o) === true && o.length > 0) {
				options.selectedItem = o[0];
			}

			$txtCodeNo.jqxInput('val', codeNo);
			options.codeNo = codeNo;

			code = null;
			$txtCodeNo = null;
			$txtDesc = null;
		 }
		 desc = null;
		 o = null;
	  } catch (err) {
		 errorHandle(formName, 'setListDesc', err);
	  }

	} 
	function closeDropDownMenu_CsList(args) {
		if ($(args.target).data('cslist') === 'txtDesc') return;
		if ($(args.target)[0]['id'] !== undefined && $(args.target)[0]['id'].indexOf('jqxScroll') >= 0) return;
		if (args.target !== undefined && (args.target.outerHTML.indexOf('arrow-down') >= 0 || args.target.outerHTML.indexOf('arrow-up') >= 0)) return;
			
	  var oo = $(document.activeElement).children(0);
	  if (oo.length > 0) {
		 if (oo[0]['id'].length > 0 && oo[0]['id'].indexOf('dropDownButton') !== 0) {
			$(args.data).jqxDropDownButton('close');
		 } else {
			if (oo[0]['id'].indexOf(args.data.id) < 0) {
				$(args.data).jqxDropDownButton('close');
			}
		 }
	  } else {
		 $(args.data).jqxDropDownButton('close');
	  }
	}
	function filterData(div, datafield, value) {
		try {
			if (div.options.gridId == undefined || div.options.gridId == '') return;

			var $jqxgrid = $('#' + div.options.gridId);
			$jqxgrid.jqxGrid('clearfilters');
			if (value.length > 0) {
				var filtergroup = new $.jqx.filter();
				var filter_or_operator = 1;
				var filtervalue = value;
				var filtercondition = 'CONTAINS';
				var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
				filtergroup.addfilter(filter_or_operator, filter1);
				$jqxgrid.jqxGrid('addfilter', datafield, filtergroup);
				$jqxgrid.jqxGrid('applyfilters');

				filtergroup = null;
				filter_or_operator = null;
				filtervalue = null;
				filtercondition = null;
				filter1 = null;
			}
			gridId = null;
		}
		catch (err) {
			errorHandle(formName, 'filterData', err);
		}
	}
	function _renderBaseData(self, dataAdapter) {
	  var options = self.options;
	  var width = self.$activeElement.width();
	  var codeNoWidth = options.codeNoWidth;
	  var _codeno = "CODENO", _description = "DESCRIPTION";
		//直接取用第一個欄位及第二個欄位來當做預欄位
	  var keys;
	  if (options.columns === undefined) {
		  if (options.source !== null && options.source.length > 0) {
			  keys = Object.keys(options.source[0]);
			  _codeno = keys[0];
			  _description = keys[1];
			options.columns = [
				{ text: options.language.codeCaption, datafield: _codeno, width: options.codeNoWidth + 5 },
				{ text: options.language.descriptionCaption, datafield: _description, width: width - (options.codeNoWidth + 5) - 5 },
			];
		 } else {
			//取displayValue的欄位來當預設欄位
			if (options.displayValue !== null && options.displayValue.length > 0) {
				keys = Object.keys(options.displayValue);
				_codeno = keys[0];
				_description = keys[1];
			}
		 }
	  } else {
		  if (options.source !== null && options.source.length > 0) {
			  keys = Object.keys(options.source[0]);
			  _codeno = keys[0];
			  _description = keys[1];
			  //檢查columns的datafield是否有一樣? 如果不一樣就變更
			  if (options.columns[0]['datafield'] != options.codeNoField || options.columns[1]['datafield'] != options.descriptionField) {
				  options.columns[0]['datafield'] = _codeno;
				  options.columns[1]['datafield'] = _description;
				  if (options.gridId !== undefined && options.gridId !== '') {
					  $('#' + options.gridId).jqxGrid({ columns: options.columns });
					  $('#' + options.gridId).jqxGrid('render');
				  }
			  }
		  }
		  _codeno = options.columns[0]['datafield'];
		  _description = options.columns[1]['datafield'];
	  }
	  options.codeNoField = _codeno;
	  options.descriptionField = _description;
	  _codeno = null;
	  _description = null;
	  keys = null;

	  if (options.columns !== undefined && options.columns.length > 0) {
		 options.columns[0].width = options.codeNoWidth + 5;
		 if (options.columns.length === 2) {
			options.columns[1].width = width - options.columns[0].width - 5;
		 }
	  }

	  //如果無資料 
	  var $csl = $('#' + options.dropDownId);
	  if (options.source === undefined || options.source === null || options.source.length === 0) {
		  $csl.jqxDropDownButton('disabled', true);
		  $csl.find('div, input, textarea, select').attr('readonly', true);
		  //options.disabled = true;
	  } else {
		  //未指定disabled屬性時
		  if (options.isOnlyDropDown == false) {
			  if (options.disabled === null || options.disabled === false) {
				  $csl.jqxDropDownButton('disabled', false);
				  $csl.find('div, input, textarea, select').attr('readonly', false);
				  //options.disabled = false;
			  } else {
				  $csl.jqxDropDownButton('disabled', options.disabled);
				  $csl.find('div, input, textarea, select').attr('readonly', options.disabled);
			  }
		  } else {
			  _onlyDropDown(self.$activeElement, options.isOnlyDropDown);
		  }
		  

		  //if (options.gridId == '') {
			 // options.isRender = false;
			 // setTimeout(function (options) {
				//  $csl.jqxDropDownButton('open');
			 // }, 100);
		  //}
	  }

	  options = null;
	  width = null;
	  codeNoWidth = null;
	  //$csl = null;
	  //resize(self);
	}
	
	
})(jQuery);