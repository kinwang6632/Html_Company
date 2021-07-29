(function ($, window, undefined) {
	var formName = 'csAddress1';
	var riadllName = 'Cablesoft.RIA.Utility.GiAddress.Web.dll';
	var riaClassName = 'Cablesoft.RIA.Utility.GiAddress.Web.dsGiAddress1';
	var defButtonWidth = 80;
	var defButtonHeight = 25;
	var defWidth = 250;

	$.fn.csAddress1 = function (options, param, param2) {
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
						options: $.extend({}, new defaults(), new csAddress1(), options)
					});
					init(this);
				}
				state = null;
			});
		}
		catch (err) {
			errorHandle(formName, '$.fn.csAdr1', err);
		}
	};
	var methods = {
		options: function (div) {
			return $.data(div[0], formName).options;
		},
		theme: function (jq, params) {
			return jq.each(function (idx, element) {
				if (params !== undefined) {
					var oo = getSelf($(element));
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
			return formDestroy(getSelf(jq));
		},
		resize: function (jq, params) {
			formResize(getSelf(jq), params);
		},
		disabled: function (div, params) {
			return _disabled(div, params);
		},
		source: function (div, params) {
			return _source(div, params);
		},
		getAddrInfo: function (div) {
			return _getAddrInfo(div);
		},
		getAddrInfo2: function (div) {
			return _getAddrInfo2(div);
		},
		addrNo: function (div, params) {
			return _addrNo(div, params);
		},
		clearDisplayValue: function (div) {
			return _clearDisplayValue(div);
		},
		readOnly: function (div, params) {
			return _readOnly(div, params);
		}
	};
	var defaults = function () {
		this.language = {};
		this.loginInfo = {};
		this.editMode = editMode.view;
		//this.refNo = 0;
		this.parameters = {};
		this.controls = [];
		//this.isSaved = false;
		this.theme = $.jqx.theme;
		this.localization = null;
		this.disabled = false;
		this.isProcess = false;
		this.buttonText = '';
		this.isReadOnly = false;
		this.include = false; //是否由SO1200A(地址管理)所呼叫:true  一般單純的應用:false
		this.filterAreaCode = false;
		this.edableFilterAreaCode = true;
		this.LNFlag = -1; //CD017.LNFlag==>若【鄰】無值,　則警告【此街道鄰必填】
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
						options.buttonHeight = params['height'];
					}
				} else {
					//由容器決定寬度
					options.width = $elem.parent().width();
					$elem.width(options.width);
				}
			} catch (err) {
				errorHandle(formName, 'formResize-->width_height', err);
				return false;
			}

			var $txtcsAdr2 = $elem.find('input[data-csAdr1="txtcsAdr2"]');
			var adr3Width = $elem.width() - options.buttonWidth - $txtcsAdr2.width() - 16;
			var $txtcsAdr3 = $elem.find('input[data-csAdr1="txtcsAdr3"]');
			$txtcsAdr3.width(adr3Width);

			self = null;
			options = null;
			$elem = null;
			$txtcsAdr2 = null;
			adr3Width = null;
			$txtcsAdr3 = null;
		}
		catch (err) {
			errorHandle(formName, 'formResize', err);
		}
	}
	function formDestroy(div, level) {
		var self = div;
		try {
			if (self === undefined || self === null) {
				return false;
			}

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

			var controls = self.options.controls;
			//for (var j = 50; j >= level; j--) {
			//   for (var i = controls.length - 1; i >= 0; i--) {
			//      var o = $('#' + controls[i].name);
			//      $(o).off();
			//		if (controls[i].level === j) {
			//			if (controls[i].type === 'style') {
			//				$('#' + controls[i].name).remove();
			//			} else if (controls[i].type === 'function') {
			//				controls[i].name = null;
			//			}
			//			else {
			//				var o = $('#' + controls[i].name);
			//				o.each(function () {
			//					$(this).off();
			//					$(this)[controls[i].type]('destroy');
			//					//controls.splice(i, 1);
			//				});
			//			}
			//		}
			//	}
			//}
			var controls_2 = controls.filter(function (item) {
				return item['level'] >= 2;
			});
			destroyControls(controls_2);

			if (level > 0) {   //self.options.include!=true && 
				return;
			}
			destroyControls(self.options.controls);
			deleteJSONObject(self.options);
			//options.length = 0;
			//options = null;
			offElementEvents(self.$activeElement);
			$.data(self.$activeElement, formName, null);
			$(self.$activeElement).off();

			$(document).off('mouseup.button' + self.options.buttonId).remove();
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
	function _disabled(jq, params) {
		try {
			var oo = getSelf(jq);
			var options = oo.options;
			if (params !== undefined && params !== null) {
				oo.$activeElement.find('input[data-csAdr1="btncsAdr1"]').jqxButton('disabled', params);
				oo.options.disable = params;
			} else {
				return oo.options.disable;
			}
			oo = null;
			options = null;
		} catch (err) {
			errorHandle(formName, '_disabled', err);
		}
	}
	function _source(jq, params) {
		try {
			var oo = getSelf(jq);
			if (params !== undefined & params !== null) {
				oo.options.addrNo = null;

				var $txtcsAdr2 = oo.$activeElement.find('input[data-csAdr1="txtcsAdr2"]');
				$txtcsAdr2.jqxInput('val', '');
				var $txtcsAdr3 = oo.$activeElement.find('input[data-csAdr1="txtcsAdr3"]');
				$txtcsAdr3.jqxInput('val', '');
				oo.SO014 = params;
			} else {
				return oo.SO014;
			}
		} catch (err) {
			errorHandle(formName, 'source', err);
		}
	}
	function _getAddrInfo(jq) {
		try {
			var options = getSelf(jq).options;
			if (options.isSaved == false) {
				if (options.OLD_SO014 != undefined) {
					return options.OLD_SO014;
				} else {
					return null;
				}
			} else {
				//isSaved == true
				if (options.SO014 == undefined) {
					options.initData['Table'].rows[0]['LNFlag'] = options.LNFlag;
					return options.initData['Table'].rows[0];
				} else {
					options.SO014.LNFlag = options.LNFlag;
					return options.SO014;
				}
			}
		} catch (err) {
			return null;
			//errorHandle(formName, '_getAddrInfo', err);
		}
	}
	function _getAddrInfo2(jq) {
		try {
			return getSelf(jq).options.SO017;
		} catch (err) {
			return null;
			//errorHandle(formName, '_getAddrInfo2', err);
		}
	}
	function _addrNo(jq, params) {
		try {
			var oo = getSelf(jq);
			if (params !== undefined && params !== null && params !== '') {
				oo.options.addrNo = params;
				getBaseData(oo, 0);
			} else {
				if (oo.options.addrNo == undefined || oo.options.addrNo == null || oo.options.addrNo == '') {
					if (oo.options['SO014'] != undefined) {
						oo.options.addrNo = oo.options['SO014']['ADDRNO'];
					}
				}
				//ADDRNO
				return oo.options.addrNo;
			}

			oo = null;
		} catch (err) {
			errorHandle(formName, '_resize', err);
		}
	}
	function _clearDisplayValue(jq) {
		try {
			var oo = getSelf(jq);
			var $txtcsAdr2 = oo.$activeElement.find('input[data-csAdr1="txtcsAdr2"]');
			$txtcsAdr2.jqxInput('val', '');
			var $txtcsAdr3 = oo.$activeElement.find('input[data-csAdr1="txtcsAdr3"]');
			$txtcsAdr3.jqxInput('val', '');
			//oo.$activeElement.find('input[data-csAdr1="btncsAdr1"]').jqxButton('disabled', true);

			oo.options.addrNo = '';
			oo.options.SO014 = null;

			oo = null;
			$txtcsAdr2 = null;
			$txtcsAdr3 = null;
		} catch (err) {
			errorHandle(formName, 'resize', err);
		}
	}

	function _readOnly(div, params) {
		try {
			var oo = getSelf(div);
			if (params !== undefined && params !== null) {
				if (params == true) {
					oo.options.editMode = editMode.view;
				} else {
					oo.options.editMode = editMode.edit;
				}
				oo.options.isReadOnly = params;
			} else {
				return oo.options.isReadOnly;
			}
			oo = null;
		} catch (err) {
			errorHandle(formName, '_readOnly', err);
		}
	}


	function init(div) {
		try {
			var self = $.data(div, formName);
			self.$activeElement = $(div);
			if (self.options.include == true) {
				getAddrType(self);
			} else {
				renderControls(self);
				addHandertControls(self);

				getBaseData(self, 0);
			}
			self = null;
		}
		catch (err) {
			errorHandle(formName, 'init', err);
		}
	}
	function getBaseData(self, changeType) {
		try {
			var options = self.options;
			if (options.addrNo === undefined || options.addrNo === null) {
				return false;
			}

			//var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
			var paraLoginInfo = getParaLoginInfo(self.$activeElement[0], formName);
			var parameters = $.extend({}, paraLoginInfo, {
				OwnerName: { type: 'string', value: '' },
				AddrNo: { type: 'string', value: options.addrNo }
			});
			var params = getParameters(riadllName, riaClassName,
				'QuerySO014ByAddrNo',
				JSON.stringify(parameters));
			getServerData(params, {
				success: function (data) {
					if (data != undefined && data.ErrorCode == 0) {
						if (options.initData === undefined) {
							options.initData = null;
							delete options.initData;
							options.initData = JSON.parse(data.ResultXML);

							//renderControls(self);
							//addHandertControls(self);
						} else {
							options.initData = JSON.parse(data.ResultXML);
						}

						if (options.initData['Table']['rows'].length > 0) {
							action(self, 'view');
						} else {
							//formResize(self);
							options.SO014 = cloneDefaultData(self);
						}
						//進行 上一筆/下一筆 的Refresh
						if (changeType == 1) {
							dataRefresh2(self);
						}
					}
					else {
						if (typeof data === 'string') {
							messageBox(data, messageType.critical);
						} else {
							messageBox(data.ErrorMessage, messageType.critical);
						}
					}
					options = null;
					params = null;
					paraLoginInfo = null;
					parameters = null;
				}
			});
		}
		catch (err) {
			errorHandle(formName, 'getBaseData', err);
		}
	} //end getBaseData
	function cloneDefaultData(self) {
		var data = {};
		for (var i = 0, icnt = self.options.initData2.SO014_Schema.columns.length; i < icnt; i++) {
			data[self.options.initData2.SO014_Schema.columns[i].name] = '';
		}

		return data;
	}

	function renderControls(div) {
		try {
			var self = div;
			var options = self.options;
			var lang = options.language;
			options.buttonId = '';
			options.StrtId = '';
			options.AddressId = '';

			var width = options.width;
			var buttonHeight = options.buttonHeight;
			if (!buttonHeight || buttonHeight === 0) { buttonHeight = defButtonHeight; }
			if (options.buttonHeight === undefined || options.buttonHeight === null) {
				buttonHeight = self.$activeElement.height();
			}

			var buttonWidth = options.buttonWidth;
			if (!buttonWidth || buttonWidth === 0) { buttonWidth = defButtonWidth; }
			if (!width || width === 0) {
				width = self.$activeElement.width();
			} else {
				self.$activeElement.width(width);
				width = self.$activeElement.width();
			}

			if (options.buttonText === undefined || options.buttonText === null || options.buttonText === '') {
				options.buttonText = lang.lblTitle;
			}

			// 處理第一層元素生成
			var $el_Main = $('<span data-pid="csAdr1">' +
				'<input type="button" value=' + options.buttonText + ' data-csAdr1="btncsAdr1" style="display:inline;;vertical-align:central;" />' +
				'<input data-csAdr1="txtcsAdr2" type="text" readonly style="display:inline;;vertical-align:central;text-align:center;font-weight:bold" />' +
				'<input data-csAdr1="txtcsAdr3" type="text" readonly style="display:inline;vertical-align:central;border:none;" />' +
				'</span>');

			self.$activeElement.append($el_Main);


			var $btncsAdr1 = $el_Main.find('input[data-csAdr1="btncsAdr1"]');
			$btncsAdr1.prop('id', 'btncsAdr1_' + getUniqueId());
			var $txtcsAdr2 = $el_Main.find('input[data-csAdr1="txtcsAdr2"]');
			$txtcsAdr2.prop('id', 'txtcsAdr2_' + getUniqueId());
			var $txtcsAdr3 = $el_Main.find('input[data-csAdr1="txtcsAdr3"]');
			$txtcsAdr3.prop('id', 'txtcsAdr3_' + getUniqueId());
			$el_Main = null;

			$btncsAdr1.jqxButton({ theme: options.theme, width: buttonWidth, height: buttonHeight });
			options.controls.push({ name: $btncsAdr1[0]['id'], type: 'jqxButton', level: 1 });
			options.buttonId = $btncsAdr1[0]['id'];

			$txtcsAdr2.jqxInput({ theme: options.theme, width: 45, height: buttonHeight - 2 });
			options.controls.push({ name: $txtcsAdr2[0]['id'], type: 'jqxInput', level: 1 });
			options.StrtId = $txtcsAdr2[0]['id'];

			var adr3Width;
			adr3Width = width - buttonWidth - $txtcsAdr2.width() - 16;
			$txtcsAdr3.jqxInput({ theme: options.theme, width: adr3Width, height: buttonHeight - 2 });
			options.controls.push({ name: $txtcsAdr3[0]['id'], type: 'jqxInput', level: 1 });
			options.AddressId = $txtcsAdr3[0]['id'];

			//最後為UI重新做一次resize
			formResize(self);

			// 自定義事件回呼
			self.$activeElement.trigger('loadCompleted');

			self = null;
			options = null;
			width = null;
			buttonHeight = null;
			height = null;
			buttonWidth = null;
			$csAdr1 = null;
			$btncsAdr1 = null;
			$txtcsAdr2 = null;
			$txtcsAdr3 = null;
			adr3Width = null;
		}
		catch (err) {
			errorHandle(formName, 'renderControls', err);
		}
	}

	function addHandertControls(div) {
		try {
			var self = div;
			var options = self.options;
			//var $btncsAdr1 = $('#' + options.buttonId);
			var $csw = self.csw;

			//選擇
			$('#' + options.buttonId).on('click', self, function () {
				var _self = arguments[0].data;
				var _options = _self.options;
				var localData;
				if (_options.SO014 != undefined) {
					_options.OLD_SO014 = cloneJSON(_options.SO014);
				}
				//if (_options.initData2 === undefined) {
				//	oo = localStorage.getItem("Adr1_AllInOne_Data");
				//	if (oo !== '') {
				//		localData = $.parseJSON(oo);
				//	}
				//}

				if (localData === undefined || typeof localData !== "string") {
					//先取 orthodox 資料
					getAddrType(_self);
				} else {
					_options.initData2 = localData;
					//直接取本地端的快取資料
					renderWindow(_self);
				}

				_options = null;
				localData = null;
			});

			//$(window).on('resize', self, function () {
			//	var _self = arguments[0].data;
			//	try {
			//		if (_self === undefined || _self.length === 0) {
			//			return false;
			//		}

			//		formResize(_self);
			//	} catch (err) {
			//		errorHandle(formName, 'window_on_resize', err);
			//	}
			//});


			self = null;
			options = null;
			//$btncsAdr1 = null;
		}
		catch (err) {
			errorHandle(formName, 'addHandertControls', err);
		}
	}
	function action(self, actionType) {
		try {
			var options = self.options;
			if (self.options.include == false) {
				var txtcsAdr2, txtcsAdr3;
				txtcsAdr2 = self.$activeElement.find('input[data-csAdr1="txtcsAdr2"]');
				txtcsAdr3 = self.$activeElement.find('input[data-csAdr1="txtcsAdr3"]');
				txtcsAdr2.jqxInput('val', options.initData['Table']['rows'][0]['STRTCODE']);
				txtcsAdr3.jqxInput('val', options.initData['Table']['rows'][0]['ADDRESS']);
				txtcsAdr2 = null;
				txtcsAdr3 = null;
				options.SO014 = options.initData['Table']['rows'][0];
			} else {
				if (options.initData['SO014'] != undefined) {
					options.SO014 = options.initData['SO014']['rows'][0];
				}
				 else {
					options.SO014 = options.initData['Table']['rows'][0];
				}
			}
							
			options.addrNo = options.SO014.ADDRNO;
			if (options.initData['SO017'] != undefined) {
				options.SO017 = options.initData['SO017']['rows'][0];
			}

			//self.$activeElement.find('input[data-csAdr1="btncsAdr1"]').jqxButton({ disabled: false });

			if (actionType == 'view') {
				// 自定義事件回呼
				self.$activeElement.trigger('dataLoadCompleted');
			}

			options = null;
		} catch (err) {
			errorHandle(formName, 'action', err);
		}
	} // end action
	function getAddrType(self) {
		try {
			var options = self.options;
			//var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
			var paraLoginInfo = getParaLoginInfo(self.$activeElement[0], formName);
			var parameters = $.extend({}, paraLoginInfo, {
				OwnerName: { type: 'string', value: '' },
				CompyCode: { type: 'Integer', value: options.loginInfo.loginInfo.rows[0].compcode },
				AddrNo: { type: 'Integer', value: options.include == true ? options.addrNo : -1 }
			});
			var params = getParameters(riadllName,
				riaClassName,
				'QueryAddrType',
				JSON.stringify(parameters));
			getServerData(params, {
				success: function (data) {
					if (data != undefined && data.ErrorCode == 0) {
						var oo = JSON.parse(data.ResultXML);
						options.orthodox = oo['SO041']['rows'][0]['ADDRTYPE'];
						options.initData2 = oo;
						if (options.include == true) {
							if (oo['SO014'] !== undefined && oo['SO014'].rows.length > 0)
								options.SO014 = oo['SO014'].rows[0];
							else
								options.SO014 = {};
						} 
							
						//localStorage.setItem("Adr1_AllInOne_Data", data.ResultXML);
						options = null;
						oo = null;
						renderWindow(self);
					}
					else {
						if (typeof data === 'string') {
							messageBox(data, messageType.critical);
						} else {
							messageBox(data.ErrorMessage, messageType.critical);
						}
					}
					options = null;
					params = null;
				}
			});
		} catch (err) {
			errorHandle(formName, 'onChooseFunctionClick', err);
		}
	}


	function renderWindowByInclude(self) {
		try {
			try {
				var options = self.options;
				var res = options.initData2;
				self.csw = self.$activeElement;
				var rwSO014 = options.SO014;
				if (rwSO014 === undefined) {
					rwSO014 = cloneDefaultData(self);
				}

				setDataToScreen(self, rwSO014, onOKClick, onCancelClick);
				changeLanguage(self);
				changeEditMode(self, options.editMode);
				rwSO014 = null;
				res = null;
			} catch (err) {
				errorHandle(formName, 'initContent', err);
			}
		}
		catch (err) {
			errorHandle(formName, 'renderWindowByInclude', err);
		}
	}
	//建立子視窗
	function renderWindow(self) {
		try {
			 var options = self.options;
			//處理子視窗生成,並隱藏等待呼叫
			loadForm(options,
			'Component/csAddress1.html',
			function (msg) {
				try {
					$csw = $(msg);
					self.$activeElement.append($csw);
					$csw = self.$activeElement.find('div[data-csAdr1="cswMain"]');
					$csw.prop('id', 'csAdr1_cswMain_' + getUniqueId());

					//檢查是否是經由地址管理呼叫(SO1200A)
					if (options.include == true) {
						renderWindowByInclude(self);
						frmAddHandler(self, $csw[0]['id']);
						return;
					}

					$csw.csWindow({
						theme: options.theme,
						keyboardCloseKey: 'escc',
						keyboardNavigation: false,
						autoOpen: false,
						isModal: !options.include,
						draggable: false,
						showCollapseButton: false,
						showCloseButton: false,
						maxHeight: 600, maxWidth: 800, minHeight: 200, minWidth: 700, height: 496, width: 750,
						initContent: function () {
							try {
								var res = options.initData2;
								var rwSO014 = options.SO014;
								//首次生成, 把windows快取下來, 以利後續多程序使用
								self.csw = $csw;
								if (rwSO014 === undefined) {
									rwSO014 = cloneDefaultData(self);
								}

								setDataToScreen(self, rwSO014, onOKClick, onCancelClick);
								changeLanguage(self);
								if (options.include == true) {
									changeEditMode(self, options.editMode);
								} else {
									changeEditMode(self, options.editMode);
								}
								rwSO014 = null;
								res = null;
							} catch (err) {
								errorHandle(formName, 'initContent', err);
							}

							options = null;
						} //ininContent
					}); // end csWindow
					options.controls.push({ name: $csw[0]['id'], type: 'csWindow', level: 1 });

					$csw.csWindow('open');

					//把本體上移對齊前層cWindow
					//var parentWins = self.$activeElement.parents();
					//var meTop = 0;
					//var meLeft = 0;
					//for (var i = 0; i < parentWins.length; i++) {
					//	if ($(parentWins[i]).hasClass('jqx-window')) {
					//		//meTop += $(parentWins[i]).position().top;
					//		//meLeft += $(parentWins[i]).position().left;
					//		meTop += $(parentWins[i]).offset().top;
					//		meLeft += $(parentWins[i]).offset().left;
					//		//$csw.csWindow('move', meTop, meLeft);
					//		$csw.offset({ top: meTop, left: $csw.offset().left });
					//		break;
					//	}
					//}
						

					frmAddHandler(self, $csw[0]['id']);
				}
				catch (err) {
					errorHandle(formName, 'renderWindow', err);
				}
			});

		
		} catch (err) {
			errorHandle(formName, 'renderWindow', err);
		}

	} //end _createWindowX
	function csId(e) {
		//return $('#' + e[0]['id']).next();
		return e.children(0)[0]['id'];
	}
	function setDataToScreen(self, rwSO014) {
		try {
			var options = self.options;
			var lang = options.language;
			var oo;
			var level = 20;
			var hh = 25; //options.buttonHeight;
			var res = options.initData2;
			var theme = options.theme;
			var _$csw = self.csw;
			var $cswContent = _$csw.find('div[data-csAdr1="csw_Content"]');
			options.IsNewAddr = 0;

			oo = $cswContent.find('div[data-csAdr1="area1"]');
			oo.prop('id', 'csAdr1_area1_' + getUniqueId());
			oo.jqxPanel({ theme: options.theme, width: 723, height: 105 });
			options.controls.push({ name: oo[0]['id'], type: 'jqxPanel', level: level });

			level += 1;
			//新地址格式要補做 縣市/區村鄉
			self.firstSection = ['cslStrt', 'txtLin', 'txtSection', 'cmbLane', 'cmbAlley', 'cmbAlley2', 'txtNo1', 'txtNo2', 'txtFlour', 'txtNo3', 'txtRoom', 'txtCity', 'txtArea'];
			//self.secondSection = ['txtNetPointNo', 'dtetFirstInstDate', 'txtCircuitStatus', 'txtJumpCableChangeDate', 'txtCircuitLayout', 'txtNote'];

			oo = $cswContent.find('label[data-csAdr1="lblAddress"]')
			oo.prop('id', 'csAdr1_lblAddress_' + getUniqueId());
			oo.text(convertNullToString(rwSO014.ADDRESS));
			oo.css('border', 'none');

			//需要在parent在顯示 的況下, 才能正確計算, 故移到最下方再建立
			//oo = $cswContent.find('span[data-csAdr1="cslStrt"]').csList({
			//	theme: theme,
			//	source: res.STRT['rows'], codeNoWidth: 70, width: '82%', height: hh,
			//	displayValue: { CODENO: rwSO014['STRTCODE'], DESCRIPTION: rwSO014['STRTNAME'] }
			//});
			//options.controls.push({ name: csId(oo), type: 'csList', level: level });

			oo = $cswContent.find('input[data-csAdr1="txtLin"]');
			oo.prop('id', 'csAdr1_txtLin_' + getUniqueId());
			oo.jqxInput({ theme: theme, width: '7%', height: hh, maxLength: 4, value: convertNullToString(rwSO014.LIN) });
			options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: level });

			oo = $cswContent.find('input[data-csAdr1="txtSection"]');
			oo.prop('id', 'csAdr1_txtSection_' + getUniqueId());
			oo.jqxInput({ theme: theme, width: '7%', height: hh, maxLength: 4, value: convertNullToString(rwSO014.SECTION) });
			options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: level });

			oo = $cswContent.find('span[data-csAdr1="cmbLane"]');
			oo.prop('id', 'csAdr1_cmbLane_' + getUniqueId());
			oo.jqxComboBox({
				theme: theme,
				width: '19%',
				source: res.LANE['rows'],
				displayMember: "DESCRIPTION", valueMember: "DESCRIPTION"
			});
			oo.val(convertNullToString(rwSO014['LANE']));
			options.controls.push({ name: oo[0]['id'], type: 'jqxComboBox', level: level });
			options.cmbLaneId = oo[0]['id'];
			//請比照WIN版，地址元件巷、弄、衖三個欄位，key入的中文字必須存在CD023
			//(1 = 巷, 2 = 弄, 3 = 衖), 但Key但Key阿拉伯數字則不受限,
			$('#' + options.cmbLaneId).on('focusout', function (event) {
				var args = event.args;
				if (args == undefined) {
					//input
					var vv = $('#' + options.cmbLaneId).find('input');
					var valK = $(vv[0]).val();
					if (valK == '') return;

					if ($.isNumeric(valK.replace('-', '')) == true) {
						//不用檢查
					} else {
						//檢查是否存在CD023中
						var arr = $('#' + options.cmbLaneId).jqxComboBox('source');
						if (arr.length > 0) {
							var result = $.grep(arr, function (item) {
								if (item['DESCRIPTION']) {
									return item['DESCRIPTION'] == valK;
								} else {
									return false;
								}
							});
							if (result.length == 0) {
								if (options.isAlert != 1) {
									options.isAlert = 1;
									messageBox(lang.LaneAlley_Exist_CD023, messageType.critical, null, function (r) {
										options.isAlert = 0;
										$('#' + options.cmbLaneId).jqxComboBox('focus');
									});
								}
							}
							result = null;
						}
						arr = null;
					}
					vv = null;
					valK = null;
				} else {
					//change
				}
			});

			oo = $cswContent.find('span[data-csAdr1="cmbAlley"]');
			oo.prop('id', 'csAdr1_cmbAlley_' + getUniqueId());
			oo.jqxComboBox({
				theme: theme, width: '17%',
				source: res.ALLEY['rows'],
				displayMember: "DESCRIPTION", valueMember: "DESCRIPTION"
			});
			oo.val(convertNullToString(rwSO014['ALLEY']));
			options.controls.push({ name: oo[0]['id'], type: 'jqxComboBox', level: level });
			options.cmbAlleyId = oo[0]['id'];
			$('#' + options.cmbAlleyId).on('focusout', function (event) {
				var args = event.args;
				if (args == undefined) {
					//input
					var vv = $('#' + options.cmbAlleyId).find('input');
					var valK = $(vv[0]).val();
					if (valK == '') return;

					if ($.isNumeric(valK.replace('-', '')) == true) {
						//不用檢查
					} else {
						//檢查是否存在CD023中
						var arr = $('#' + options.cmbAlleyId).jqxComboBox('source');
						if (arr.length > 0) {
							var result = $.grep(arr, function (item) {
								if (item['DESCRIPTION']) {
									return item['DESCRIPTION'] == valK;
								} else {
									return false;
								}
							});
							if (result.length == 0) {
								messageBox(lang.LaneAlley_Exist_CD023, messageType.critical, null, function (r) {
									$('#' + options.cmbAlleyId).jqxComboBox('focus');
								});
							}
							result = null;
						}
						arr = null;
					}
					vv = null;
					valK = null;
				} else {
					//change
				}
				args = null;
			});

			oo = $cswContent.find('span[data-csAdr1="cmbAlley2"]');
			oo.prop('id', 'csAdr1_cmbAlley2_' + getUniqueId());
			oo.jqxComboBox({
				theme: theme, width: '13%',
				source: res.ALLEY2['rows'],
				displayMember: "DESCRIPTION", valueMember: "DESCRIPTION"
			});
			oo.val(convertNullToString(rwSO014['ALLEY2']));
			options.controls.push({ name: oo[0]['id'], type: 'jqxComboBox', level: level });
			options.cmbAlley2Id = oo[0]['id'];
			$('#' + options.cmbAlley2Id).on('focusout', function (event) {
				var args = event.args;
				if (args == undefined) {
					//input
					var vv = $('#' + options.cmbAlley2Id).find('input');
					var valK = $(vv[0]).val();
					if (valK == '') return;

					if ($.isNumeric(valK.replace('-', '')) == true) {
						//不用檢查
					} else {
						//檢查是否存在CD023中
						var arr = $('#' + options.cmbAlley2Id).jqxComboBox('source');
						if (arr.length > 0) {
							var result = $.grep(arr, function (item) {
								if (item['DESCRIPTION']) {
									return item['DESCRIPTION'] == valK;
								} else {
									return false;
								}
							});
							if (result.length == 0) {
								messageBox(lang.LaneAlley_Exist_CD023, messageType.critical, null, function (r) {
									$('#' + options.cmbAlley2Id).jqxComboBox('focus');
								});
							}
							result = null;
						}
						arr = null;
					}
					vv = null;
					valK = null;
				} else {
					//change
				}
				options.cmbAlley2Id = null;
			});

			oo = $cswContent.find('input[data-csAdr1="txtNo1"]');
			oo.prop('id', 'csAdr1_txtNo1_' + getUniqueId());
			oo.jqxInput({ theme: theme, width: '8%', height: hh, maxLength: 4, value: convertNullToString(rwSO014.NO1) });
			options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: level });

			oo = $cswContent.find('input[data-csAdr1="txtNo2"]');
			oo.prop('id', 'csAdr1_txtNo2_' + getUniqueId());
			oo.jqxInput({ theme: theme, width: '6.7%', height: hh, maxLength: 4, value: convertNullToString(rwSO014.NO2) });
			options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: level });

			oo = $cswContent.find('input[data-csAdr1="txtFlour"]');
			oo.prop('id', 'csAdr1_txtFlour_' + getUniqueId());
			oo.jqxInput({ theme: theme, width: '5.6%', height: hh, maxLength: 3, value: convertNullToString(rwSO014.FLOUR) });
			options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: level });

			oo = $cswContent.find('input[data-csAdr1="txtNo3"]');
			oo.prop('id', 'csAdr1_txtNo3_' + getUniqueId());
			oo.jqxInput({ theme: theme, width: '6%', height: hh, maxLength: 4, value: convertNullToString(rwSO014.NO3) });
			options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: level });

			oo = $cswContent.find('input[data-csAdr1="txtRoom"]');
			oo.prop('id', 'csAdr1_txtRoom_' + getUniqueId());
			oo.jqxInput({ theme: theme, width: '12%', height: hh, maxLength: 20, value: convertNullToString(rwSO014.ROOM) });
			options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: level });


			level += 1;
			//下方區域
			oo = $cswContent.find('input[data-csAdr1="txtCity"]');
			oo.prop('id', 'csAdr1_txtCity_' + getUniqueId());
			oo.jqxInput({ theme: theme, width: 60, height: hh, maxLength: 20, value: convertNullToString(rwSO014.CITYNAME) });
			options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: level });

			oo = $cswContent.find('span[data-csAdr1="csmAddrClass"]');
			oo.prop('id', 'csAdr1_csmAddrClass_' + getUniqueId());
			oo.csMulti({
				buttonText: lang.ADDRCLASSCODE, //客戶類別
				source: res.CustClassCode['rows'], buttonWidth: 65, width: 260, maxLength: 20,
				displayValue: convertNullToString(rwSO014['ADDRCLASSCODE'])
			});
			options.controls.push({ name: csId(oo), type: 'csMulti', level: level });

			oo = $cswContent.find('span[data-csAdr1="cslClctEn"]');
			oo.prop('id', 'csAdr1_cslClctEn_' + getUniqueId());
			oo.csList({
				theme: theme,
				source: res.ClctEnCode['rows'], codeNoWidth: 80, width: 220,
				displayValue: { EMPNO: convertNullToString(rwSO014['CLCTEN']), EMPNAME: convertNullToString(rwSO014['CLCTNAME']) }
			});
			options.controls.push({ name: csId(oo), type: 'csList', level: level });

			oo = $cswContent.find('span[data-csAdr1="cslArea"]');
			oo.prop('id', 'csAdr1_cslArea_' + getUniqueId());
			oo.csList({
				theme: theme,
				source: res.AreaCode['rows'], codeNoWidth: 70, width: 220,
				displayValue: { CODENO: convertNullToString(rwSO014['AREACODE']), DESCRIPTION: convertNullToString(rwSO014['AREANAME']) }
			});
			options.controls.push({ name: csId(oo), type: 'csList', level: level });

			//cswContent.find('span[data-csAdr1="cslArea"]').jqxComboBox({ height: 24 });
			oo = $cswContent.find('span[data-csAdr1="cslBT"]');
			oo.prop('id', 'csAdr1_cslBT_' + getUniqueId());
			oo.csList({
				theme: theme,
				source: res.BTCode['rows'], codeNoWidth: 80, width: 220,
				displayValue: { CODENO: convertNullToString(rwSO014['BTCODE']), DESCRIPTION: convertNullToString(rwSO014['BTNAME']) }
			});
			options.controls.push({ name: csId(oo), type: 'csList', level: level });

			//要實作過濾CityCode+AreaCode+StrtCode的村里清單效果
			oo = $cswContent.find('span[data-csAdr1="cslBourg"]');
			oo.prop('id', 'csAdr1_cslBourg_' + getUniqueId());
			oo.csList({
				theme: theme,
				source: res.BourgCode['rows'], codeNoWidth: 50, width: 165,
				displayValue: { CODENO: convertNullToString(rwSO014['BOURGCODE']), DESCRIPTION: convertNullToString(rwSO014['BOURGNAME']) }
			});
			options.controls.push({ name: csId(oo), type: 'csList', level: level });

			oo = $cswContent.find('input[data-csAdr1="txtZip"]');
			oo.prop('id', 'csAdr1_txtZip_' + getUniqueId());
			oo.jqxInput({ theme: theme, width: 60, height: hh, maxLength: 6, value: convertNullToString(rwSO014.ZIPCODE) });
			options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: level });

			oo = $cswContent.find('span[data-csAdr1="cslMDU"]');
			oo.prop('id', 'csAdr1_cslMDU_' + getUniqueId());
			oo.csList({
				theme: theme,
				source: res.MduId['rows'], codeNoWidth: 60, width: 220,
				displayValue: { MDUID: convertNullToString(rwSO014['MDUID']), NAME: convertNullToString(rwSO014['MDUNAME']) }
			});
			options.controls.push({ name: csId(oo), type: 'csList', level: level });

			oo = $cswContent.find('span[data-csAdr1="cslServ"]');
			oo.prop('id', 'csAdr1_cslServ_' + getUniqueId());
			oo.csList({
				theme: theme,
				source: res.ServCode['rows'], codeNoWidth: 60, width: 220,
				displayValue: { CODENO: convertNullToString(rwSO014['SERVCODE']), DESCRIPTION: convertNullToString(rwSO014['SERVNAME']) }
			});
			options.controls.push({ name: csId(oo), type: 'csList', level: level });

			oo = $cswContent.find('input[data-csAdr1="txtCircuitNo"]');
			oo.prop('id', 'csAdr1_txtCircuitNo_' + getUniqueId());
			oo.jqxInput({ theme: theme, width: 150, height: hh, maxLength: 20, value: convertNullToString(rwSO014.CIRCUITNO) });
			options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: level });

			oo = $cswContent.find('span[data-csAdr1="cslClctArea"]');
			oo.prop('id', 'csAdr1_cslClctArea_' + getUniqueId());
			oo.csList({
				theme: theme,
				source: res.ClctAreaCode['rows'], codeNoWidth: 60, width: 220,
				displayValue: { CODENO: convertNullToString(rwSO014['CLCTAREACODE']), DESCRIPTION: convertNullToString(rwSO014['CLCTAREANAME']) }
			});
			options.controls.push({ name: csId(oo), type: 'csList', level: level });

			oo = $cswContent.find('span[data-csAdr1="cmbNodeNo"]');
			oo.prop('id', 'csAdr1_cmbNodeNo_' + getUniqueId());
			oo.jqxComboBox({
				theme: theme,
				width: 180,
				source: res.NodeNo['rows'],
				displayMember: "CODENO", valueMember: "CODENO"
			});
			oo.jqxComboBox('val', convertNullToString(rwSO014['NODENO']))
			options.controls.push({ name: oo[0]['id'], type: 'jqxComboBox', level: level });
			//oo = $cswContent.find('span[data-csAdr1="cslNodeNo"]').csList({
			//	theme: theme,
			//	source: res.NodeNo['rows'], codeNoWidth: 60, width: 220,
			//	displayValue: { CODENO: convertNullToString(rwSO014['NODENO']), DESCRIPTION: convertNullToString(rwSO014['NODENO']) }
			//});
			//options.controls.push({ name: csId(oo), type: 'csList', level: level });

			oo = $cswContent.find('span[data-csAdr1="cslSales"]');
			oo.prop('id', 'csAdr1_cslSales_' + getUniqueId());
			oo.csList({
				theme: theme,
				source: res.SalesCode['rows'], codeNoWidth: 60, width: 220,
				displayValue: { CODENO: convertNullToString(rwSO014['SALESCODE']), DESCRIPTION: convertNullToString(rwSO014['SALESNAME']) }
			});
			options.controls.push({ name: csId(oo), type: 'csList', level: level });

			oo = $cswContent.find('input[data-csAdr1="txtNetPointNo"]');
			oo.prop('id', 'csAdr1_txtNetPointNo_' + getUniqueId());
			oo.jqxInput({ theme: theme, width: 180, height: hh, value: convertNullToString(rwSO014.NETPOINTNO) });
			options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: level });

			var emFlag = true;
			if (options.editMode == editMode.edit) {
				emFlag = false;
			}
			oo = $cswContent.find('span[data-csAdr1="chkDualCable"]');
			oo.prop('id', 'csAdr1_chkDualCable_' + getUniqueId());
			oo.jqxCheckBox({ theme: theme, width: 50, height: hh, disabled: emFlag });
			oo.val(convertNullToString(rwSO014.DUALCABLE) == '' ? false : true);
			options.controls.push({ name: oo[0]['id'], type: 'jqxCheckBox', level: level });

			oo = $cswContent.find('span[data-csAdr1="chkHFlag"]');
			oo.prop('id', 'csAdr1_chkHFlag_' + getUniqueId());
			oo.jqxCheckBox({ theme: theme, width: 95, height: hh, disabled: emFlag });
			oo.css('color', rwSO014.HFLAG ? 'blue' : 'red').val(rwSO014.HFLAG == '' ? false : true);
			options.controls.push({ name: oo[0]['id'], type: 'jqxCheckBox', level: level });

			oo = $cswContent.find('span[data-csAdr1="chkHSIFlag"]');
			oo.prop('id', 'csAdr1_chkHSIFlag_' + getUniqueId());
			oo.jqxCheckBox({ theme: theme, width: 70, height: hh, disabled: emFlag });
			oo.css('color', rwSO014.HSIFLAG ? 'blue' : 'red').val(rwSO014.HSIFLAG == '' ? false : true);
			options.controls.push({ name: oo[0]['id'], type: 'jqxCheckBox', level: level });

			oo = $cswContent.find('span[data-csAdr1="chkFTTxFlag"]');
			oo.prop('id', 'csAdr1_chkFTTxFlag_' + getUniqueId());
			oo.jqxCheckBox({ theme: theme, width: 95, height: hh, disabled: emFlag });
			oo.css('color', rwSO014.FTTXFLAG ? 'blue' : 'red').val(rwSO014.FTTXFLAG == '' ? false : true);
			options.controls.push({ name: oo[0]['id'], type: 'jqxCheckBox', level: level });

			//oo = $cswContent.find('input[data-csAdr1="dtetFirstInstDate"]').jqxDateTimeInput({ theme: theme, formatString: 'yyyy/MM/dd HH:mm', showTimeButton: false, showCalendarButton: false, width: 120, height: hh, disabled: true, value: rwSO014.FIRSTINSTDATE == '' ? undefined : rwSO014.FIRSTINSTDATE });
			//options.controls.push({ name: oo[0]['id'], type: 'jqxDateTimeInput', level: level });
			//var fid = self.$activeElement[0]['id'] + getUniqueId();
			//$cswContent.find('div[data-csAdr1="dtetFirstInstDate"]').prop('id', fid);
			oo = $cswContent.find('div[data-csAdr1="dtetFirstInstDate"]');
			oo.prop('id', 'csAdr1_dtetFirstInstDate_' + getUniqueId());
			oo.csDateTime({
				theme: theme, width: 141, height: hh, disabled: true,
				formatString: 'yyyy/MM/dd HH:mm',
				showCalendarButton: false,
				value: null
			});
			oo.csDateTime('setDate', rwSO014.FIRSTINSTDATE == undefined ? null : rwSO014.FIRSTINSTDATE);
			options.controls.push({ name: oo[0]['id'], type: 'csDateTime', level: level });
			options.fid = oo[0]['id'];

			var ary = [{ CODENO: 0, DESCRIPTION: lang.CIRCUITSTATUS1 }, { CODENO: 1, DESCRIPTION: lang.CIRCUITSTATUS2 }, { CODENO: 2, DESCRIPTION: lang.CIRCUITSTATUS3 }, { CODENO: 3, DESCRIPTION: lang.CIRCUITSTATUS4 }];
			oo = $cswContent.find('span[data-csAdr1="cslCircuitStatus"]');
			oo.prop('id', 'csAdr1_cslCircuitStatus_' + getUniqueId());
			var _codeno = '', _desc = '';
			if (rwSO014['CIRCUITSTATUS'] != undefined && rwSO014['CIRCUITSTATUS'] != '') {
				_codeno =rwSO014['CIRCUITSTATUS'];
				_desc = ary[_codeno]['DESCRIPTION'];
			}
			oo.csList({
				theme: theme,
				source: ary, codeNoWidth: 60, width: 220,
				displayValue: { CODENO: _codeno, DESCRIPTION: _desc }
				//displayValue: options.editMode == editMode.append ? '' : { CODENO: convertNullToString(rwSO014['CIRCUITSTATUS']), DESCRIPTION: ary[rwSO014['CIRCUITSTATUS']]['DESCRIPTION'] }
			});
			options.controls.push({ name: csId(oo), type: 'csList', level: level });

			//oo = $cswContent.find('input[data-csAdr1="txtCircuitStatus"]');
			//oo.prop('id', 'csAdr1_txtCircuitStatus_' + getUniqueId());
			//oo.jqxInput({ theme: theme, width: 115, height: hh, disabled: true, value: rwSO014.CIRCUITSTATUS == '' ? '' : ary[rwSO014.CIRCUITSTATUS] });
			//options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: level });

			//oo = $cswContent.find('input[data-csAdr1="txtJumpCableChangeDate"]').csDateTime({ theme: theme, width: 110, height: hh, disabled: true, value: rwSO014.JUMPCABLECHANGEDATE == undefined ? null : rwSO014.JUMPCABLECHANGEDA });
			//options.controls.push({ name: oo[0]['id'], type: 'csDateTime', level: level });
			//var jid = self.$activeElement[0]['id'] + getUniqueId();
			//$cswContent.find('div[data-csAdr1="txtJumpCableChangeDate"]').prop('id', jid);
			oo = $cswContent.find('div[data-csAdr1="txtJumpCableChangeDate"]');
			oo.prop('id', 'csAdr1_txtJumpCableChangeDate_' + getUniqueId());
			oo.csDateTime({
				theme: theme, width: 126, height: hh, disabled: true,
				formatString: 'yyyy/MM/dd',
				showCalendarButton: false,
				value: null
			});
			oo.csDateTime('setDate', rwSO014.JUMPCABLECHANGEDATE == undefined ? null : rwSO014.JUMPCABLECHANGEDATE);
			options.controls.push({ name: oo[0]['id'], type: 'csDateTime', level: level });
			options.jid = oo[0]['id'];

			oo = $cswContent.find('TextArea[data-csAdr1="txtCircuitLayout"]');
			oo.prop('id', 'csAdr1_txtCircuitLayout_' + getUniqueId());
			oo.jqxTextArea({ theme: theme, width: 340, height: 55, disabled: false });
			oo.val(convertNullToString(rwSO014.CIRCUITLAYOUT));
			options.controls.push({ name: oo[0]['id'], type: 'jqxTextArea', level: level });

			oo = $cswContent.find('TextArea[data-csAdr1="txtNote"]');
			oo.prop('id', 'csAdr1_txtNote_' + getUniqueId());
			oo.jqxTextArea({ theme: theme, width: 216, height: 48, disabled: false });
			oo.val(convertNullToString(rwSO014.NOTE));
			options.controls.push({ name: oo[0]['id'], type: 'jqxTextArea', level: level });

			var $btncsOK = $cswContent.find('input[data-csAdr1="btncsAdr1OK"]');
			$btncsOK.prop('id', 'csAdr1_btncsAdr1OK_' + getUniqueId());
			var $btncsCancel = $cswContent.find('input[data-csAdr1="btncsAdr1Cancel"]');
			$btncsCancel.prop('id', 'csAdr1_btncsAdr1Cancel_' + getUniqueId());
			var $btnPrev = $cswContent.find('input[data-csAdr1="btnPrev"]');
			$btnPrev.prop('id', 'csAdr1_btnPrev_' + getUniqueId());
			var $btnNext = $cswContent.find('input[data-csAdr1="btnNext"]');
			$btnNext.prop('id', 'csAdr1_btnNext_' + getUniqueId());


			oo = $btncsOK.jqxButton({ width: 100, height: 28, theme: theme, disabled: rwSO014.ADDRESS != '' ? false : true });
			if (options.editMode == editMode.view) {
				oo.jqxButton({ disabled: true });
				$cswContent.find('label[data-csAdr1="txtStatus"]').prop('id', 'csAdr1_txtStatus_' + getUniqueId()).text(lang.view);
			} else {
				$cswContent.find('label[data-csAdr1="txtStatus"]').prop('id', 'csAdr1_txtStatus_' + getUniqueId()).text(lang.edit);
			}
			//oo = $btncsOK.jqxButton($.extend({}, imagePosition, { theme: theme, width: 100, imgSrc: imageScr.ok.imgSrc, height: hh, disabled: true }));
			//value: lang.btnOk
			//$btncsOK.jqxButton({
			//   width: 80,
			//   height: 25,
			//   theme: 'energyblue2',
			//   imgSrc: '/images/ok2.png',
			//   imgPosition: 'left',
			//   textPosition: "center",
			//   imgWidth: 18, 
			//   imgHeight: 18,
			//   value: '存檔',
			//   textImageRelation: "imageBeforeText"
			//});
			options.controls.push({ name: $btncsOK[0]['id'], type: 'jqxButton', level: level });

			oo = $btncsCancel.jqxButton({ width: 100, height: 28, theme: theme });
			//$btncsCancel.jqxButton($.extend({}, imagePosition, { theme: theme, width: 100, imgSrc: imageScr.ok.imgSrc, height: hh, value: lang.btnCancel }));
			//$btncsCancel.jqxButton({
			//   theme: theme, value: '取消', width: 80, height: 25, imgWidth: 18, imgHeight: 18,
			//   imgPosition: 'left', imgSrc: '/images/undo2.png', textPosition: "center", textImageRelation: "imageBeforeText"
			//});
			options.controls.push({ name: $btncsCancel[0]['id'], type: 'jqxButton', level: level });

			oo = $btnPrev.jqxButton({ width: 100, height: 28, theme: theme });
			options.controls.push({ name: $btnPrev[0]['id'], type: 'jqxButton', level: level });
			oo = $btnNext.jqxButton({ width: 100, height: 28, theme: theme });
			options.controls.push({ name: $btnNext[0]['id'], type: 'jqxButton', level: level });

			$cswContent.show();

			var data;
			if (self.options.filterAreaCode == false) {
				data = res.STRT['rows'];
			} else {
				data = getRowByKeyValue(self.options.initData2.STRT['rows'], 'EXTRAAREAFLAG', 1, true);
			}
			oo = $cswContent.find('span[data-csAdr1="cslStrt"]');
			oo.prop('id', 'csAdr1_cslStrt_' + getUniqueId());
			oo.csList({
				theme: theme, checkFilter: true,
				source: data, codeNoWidth: 70, width: '80%', height: hh,
				//displayValue: { CODENO: rwSO014['STRTCODE'], DESCRIPTION: rwSO014['STRTNAME'] }
			});
			options.controls.push({ name: oo[0]['id'], type: 'csList', level: level });
			//options.controls.push({ name: csId(oo), type: 'csList', level: level });
			options.cslStrtId = oo[0]['id'];
			$('#' + options.cslStrtId).on('selectedIndexChanged', { self: self, csw: _$csw }, function (args) {
				//getAddrString(this, args);
				address_Validation(args, this);
				//指定LNFlag值
				var oo = $('#' + options.cslStrtId).csList('selectedItem');
				if (oo != null && oo['LNFLAG'] != undefined) {
					options.LNFlag = oo['LNFLAG'];
				} else {
					options.LNFlag = -1;
				}
			});
			$('#' + options.cslStrtId).csList('codeNo', rwSO014['STRTCODE']);

			oo = $cswContent.find('div[data-csAdr1="chkEXTRAAREAFLAG"]');
			oo.prop('id', 'csAdr1_chkEXTRAAREAFLAG_' + getUniqueId());
			oo.jqxCheckBox({ theme: theme, checked: self.options.filterAreaCode, disabled: !self.options.edableFilterAreaCode });
			options.controls.push({ name: oo[0]['id'], type: 'jqxCheckBox', level: level });
			options.chkEXTRAAREAFLAGId = oo[0]['id'];
			$('#' + options.chkEXTRAAREAFLAGId).on('change', self, function (e) {
				if (e.args.checked == false) {
					self.csw.find('span[data-csAdr1="cslStrt"]').csList('source', e.data.options.initData2.STRT['rows']);
					e.data.options.filterAreaCode = false;
				} else {
					self.csw.find('span[data-csAdr1="cslStrt"]').csList('source', getRowByKeyValue(e.data.options.initData2.STRT['rows'], 'EXTRAAREAFLAG', 1, true));
					e.data.options.filterAreaCode = true;
				}
			});

			//替生成的子視窗按鈕掛事件
			//確定
			//jqxget($btncsOK).on('click', function () {
			$btncsOK.on('click', self, function () {
				var _self = arguments[0].data;
				//若【鄰】無值,　則警告【此街道鄰必填】。 
				if (_self.options.LNFlag == 1) {
					if (_self.csw.find('input[data-csAdr1="txtLin"]').val() == '') {
						messageBox(_self.options.language.LNFlag_Must, messageType.critical);
						return false;
					}
				}
				//當建築型態為大樓(SO014.BTCode=CD021.codeno and cd021.refno=1)，存檔時需檢核大樓編號為必填。
				var o = _self.csw.find('span[data-csAdr1="cslBT"]');
				var oo = o.csList('selectedItem');
				if (oo) {
					if (oo['REFNO'] == 1) {
						oo = _self.csw.find('span[data-csAdr1="cslMDU"]');
						if (oo.csList('codeNo') == '') {
							messageBox(_self.options.language.MduId_Mustbe, messageType.critical);
							return false;
						}
					}
				}

				onOKClick(_self);
				_self = null;
			});

			//
			//_$csw.on('change', '*[data-csAdr1]', { self: self, csw: _$csw }, address_Validation);
			_$csw.on('change', '*[data-role]', { self: self, csw: _$csw }, address_Validation);


			//取消
			//jqxget($btncsCancel).on('click', function () {
			$btncsCancel.on('click', self, function () {
				var _self = arguments[0].data;
				onCancelClick(_self);
				_self = null;
			});

			if (self.options.include == undefined) {
				self.csw.find('input[data-csAdr1="btnPrev"]').jqxButton({ disabled: true });
				self.csw.find('input[data-csAdr1="btnNext"]').jqxButton({ disabled: true });
			} else {
				if (self.options.editMode == editMode.append) {
					self.csw.find('input[data-csAdr1="btnPrev"]').jqxButton({ disabled: true });
					self.csw.find('input[data-csAdr1="btnNext"]').jqxButton({ disabled: true });
				} else {
					//上一筆
					$btnPrev.on('click', self, function () {
						var _self = arguments[0].data;
						onChangeAddrNo(_self, -1);
						_self = null;
					});
					//下一筆
					$btnNext.on('click', self, function () {
						var _self = arguments[0].data;
						onChangeAddrNo(_self, 1);
						_self = null;
					});
					onChangeAddrNo(self, 0);
				}
			}
			self.isProcess = false;


			// 自定義事件回呼
			self.$activeElement.trigger('ChooseButtonClick');

			// 自定義事件回呼
			self.$activeElement.trigger('popupLoadCompleted');

			//options = null;
			oo = null;
			_$csw = null;
			theme = null;
			$cswContent = null;
			res = null;
			hh = null;
		} catch (err) {
			errorHandle(formName, 'setDataToScreen', err);
		}
	}
	function changeEditMode(self, mode) {
		try {
			var options = self.options;
			var lang = options.language;
			options.editMode = mode;

			//SO1200地址資料管理的[客戶類別]、[Jump Cable更換時間]二個項目在WIN版並沒有顯示，麻煩WEB請拿掉
			if (options.include == true) {
				self.csw.find('span[data-csAdr1="csmAddrClass"]').hide();
				self.csw.find('label[data-csAdr1="lblJumpCableChangeDa"]').hide();
				self.csw.find('div[data-csAdr1="txtJumpCableChangeDate"]').hide();
			}
			//在SO1200新增、修改模式 首裝日、線路狀態需可修改，線路狀態下拉清單為0.無線路、1.裝機完工、2.移機完工、3.修改裝機地址。
			//SO1200新增模式CATV可裝、CM可裝、提供FTTX、雙向應該要可以修改,現在都被鎖住。(請注意,新增、修改都要OK)
			switch (mode) {
				default:
				case editMode.view:
					self.csw.find('label[data-csAdr1="txtStatus"]').text(lang.view);
					break;
				case editMode.edit:
					self.csw.find('label[data-csAdr1="txtStatus"]').text(lang.edit);
					//注意！！！在非SO1200功能，如CV客戶資料的裝機地址，首裝日、線路狀態必須為不可異動
					if (options.include == false) {
						//非SO1200功能
						$('#' + self.options.fid).csDateTime({ disabled: true });
						self.csw.find('span[data-csAdr1="cslCircuitStatus"]').csList('disabled', true);
					} else {
						//在SO1200新增、修改模式 首裝日、線路狀態需可修改，線路狀態下拉清單為0.無線路、1.裝機完工、2.移機完工、3.修改裝機地址。
						$('#' + self.options.fid).csDateTime({ disabled: false });
						self.csw.find('span[data-csAdr1="cslCircuitStatus"]').csList('disabled', false);
						//SO1200新增模式CATV可裝、CM可裝、提供FTTX、雙向應該要可以修改,現在都被鎖住。(請注意,新增、修改都要OK)
						self.csw.find('span[data-csAdr1="chkHFlag"]').jqxCheckBox({ disabled: false });
						self.csw.find('span[data-csAdr1="chkHSIFlag"]').jqxCheckBox({ disabled: false });
						self.csw.find('span[data-csAdr1="chkFTTxFlag"]').jqxCheckBox({ disabled: false });
						self.csw.find('span[data-csAdr1="chkDualCable"]').jqxCheckBox({ disabled: false });
					}
					break;
				case editMode.append:
					self.csw.find('label[data-csAdr1="txtStatus"]').text(lang.addNew);
					//在SO1200功能
					$('#' + self.options.fid).csDateTime({ disabled: false });
					self.csw.find('span[data-csAdr1="cslCircuitStatus"]').csList('disabled', false);
					//SO1200新增模式CATV可裝、CM可裝、提供FTTX、雙向應該要可以修改,現在都被鎖住。(請注意,新增、修改都要OK)
					self.csw.find('span[data-csAdr1="chkHFlag"]').jqxCheckBox({ disabled: false });
					self.csw.find('span[data-csAdr1="chkHSIFlag"]').jqxCheckBox({ disabled: false });
					self.csw.find('span[data-csAdr1="chkFTTxFlag"]').jqxCheckBox({ disabled: false });
					self.csw.find('span[data-csAdr1="chkDualCable"]').jqxCheckBox({ disabled: false });
					break;
			}
			options = null;
			lang = null;
		} catch (err) {
			var ooo = new Error();
			errorHandle(formName, 'changeEditMode', err + '\nErreo=>' + ooo.stack);
			ooo = null;
		}
	}

	function onChangeAddrNo(_self, changeType) {
		var options = _self.options;
		if (options.parentDataTableName != undefined) {
			//計算目前置
			if (options.addrIndex == undefined) {
				options.addrIndex = 0;
				var data = options.parameters[options.parentDataTableName + '_ALL'].rows;
				for (var i = 0; i < data.length; i++) {
					if (data[i]['ADDRNO'] == options.addrNo) {
						options.addrIndex = i + changeType;
						options.activeAddrNo = data[options.addrIndex]['ADDRNO'];
						options.dataLen = data.length;
						break;
					}
				}
			} else {
				options.addrIndex = options.addrIndex + changeType;
				options.activeAddrNo = options.parameters[options.parentDataTableName + '_ALL'].rows[options.addrIndex]['ADDRNO'];
			}

			//檢查 上一筆/下一筆 按鈕的可用性
			if (options.addrIndex == 0) {
				_self.csw.find('input[data-csAdr1="btnPrev"]').jqxButton({ disabled: true });
			}
			if (options.addrIndex > 0) {
				_self.csw.find('input[data-csAdr1="btnPrev"]').jqxButton({ disabled: false });
			}
			if (options.addrIndex == options.dataLen - 1) {
				_self.csw.find('input[data-csAdr1="btnNext"]').jqxButton({ disabled: true });
			}
			if (options.addrIndex < options.dataLen - 1) {
				_self.csw.find('input[data-csAdr1="btnNext"]').jqxButton({ disabled: false });
			}

			//依changeType進行addrNo切換重取程序
			options.addrNo = options.activeAddrNo;
			if (changeType != 0) {
				getBaseData(_self, 1);
			}
		} else {
			_self.csw.find('input[data-csAdr1="btnPrev"]').jqxButton({ disabled: true });
			_self.csw.find('input[data-csAdr1="btnNext"]').jqxButton({ disabled: true });
		}

	}
	function changeLanguage(self) {
		try {
			var lang = self.options.language;
			if (self.options.include == true) {
				self.csw.find('span[data-csAdr1="lblTitle"]').text('');
			} else {
				self.csw.find('span[data-csAdr1="lblTitle"]').text(lang.lblTitle);
			}
			
			self.csw.find('label[data-csAdr1="lblStrt"]').text(lang.lblStrt);
			self.csw.find('label[data-csAdr1="lblLin"]').text(lang.lblLin);
			self.csw.find('label[data-csAdr1="lblSection"]').text(lang.lblSection);
			self.csw.find('label[data-csAdr1="lblLane"]').text(lang.lblLane);
			self.csw.find('label[data-csAdr1="lblAlley"]').text(lang.lblAlley);
			self.csw.find('label[data-csAdr1="lblAlley2"]').text(lang.lblAlley2);
			self.csw.find('label[data-csAdr1="lblNo1"]').text(lang.lblNo1);
			self.csw.find('label[data-csAdr1="lblFlour"]').text(lang.lblFlour);
			self.csw.find('label[data-csAdr1="lblNo3"]').text(lang.lblNo3);
			self.csw.find('label[data-csAdr1="lblRoom"]').text(lang.lblRoom);
			self.csw.find('td[data-csAdr1="lblCity2"]').text(lang.lblCity2);
			self.csw.find('td[data-csAdr1="lblArea"]').text(lang.lblArea);
			self.csw.find('td[data-csAdr1="lblBourg"]').text(lang.lblBourg);
			self.csw.find('td[data-csAdr1="lblBT"]').text(lang.lblBT);
			self.csw.find('label[data-csAdr1="lblZip"]').text(lang.lblZip);
			self.csw.find('td[data-csAdr1="lblMDU"]').text(lang.lblMDU);
			self.csw.find('td[data-csAdr1="lblServ"]').text(lang.lblServ);
			self.csw.find('td[data-csAdr1="lblCircuitNo"]').text(lang.lblCircuitNo);
			self.csw.find('td[data-csAdr1="lblClctArea"]').text(lang.lblClctArea);
			self.csw.find('td[data-csAdr1="lblSales"]').text(lang.lblSales);
			self.csw.find('td[data-csAdr1="lblNetPointNo"]').text(lang.lblNetPointNo);
			self.csw.find('td[data-csAdr1="lblFirstInstDate"]').text(lang.lblFirstInstDate);
			self.csw.find('label[data-csAdr1="lblCircuitStatus"]').text(lang.lblCircuitStatus);
			self.csw.find('label[data-csAdr1="lblJumpCableChangeDa"]').text(lang.lblJumpCableChangeDa);
			self.csw.find('span[data-csAdr1="lblCircuitLayout"]').text(lang.lblCircuitLayout);
			self.csw.find('td[data-csAdr1="lblNote"]').text(lang.lblNote);
			lang = null;
		} catch (err) {
			errorHandle(formName, 'changeLanguage', err);
		}
	}


	//按了確定鈕
	function onOKClick(self) {
		try {
			//IMS 8389 當修改的地址資料只有街道,沒有號，修改存檔會出現error, 
			//為避免此狀況, 請卡新增、修改時, 號這個欄位必須有值。
			if (self.options.editMode == editMode.append || self.options.editMode == editMode.edit) {
				if (self.csw.find('input[data-csAdr1="txtNo1"]').val() == '') {
					messageBox(self.options.language.No1_Mustbe);
					return;
				}
			}
			

			//如果是地址管理介接過來, 先檢查AddrSort是否已存在
			if (self.options.include == true) { 
				if (self.options.IsNewAddr == 0) {
					//新增模式, 檢查
					if (self.options.editMode == editMode.append) {
						messageBox(self.options.language.AddrSort_Exists);
						return false;
					} else {
						//修改模式, 檢查
						if (self.options.initData['SO014'].rows.length > 0) {
							if (self.options.initData['SO014'].rows[0]['ADDRNO'] != self.options.addrNo) {
								messageBox(self.options.language.AddrSort_Exists);
								return false;
							}
						}
					}
				}
			} else {
			   //不針對地址管理介接過來的情況

			}


			$(this).siblings().prop('disabled', true);

			//打包表單資料, 供回寫SO014用
			var formData = getFormData(self);
			var SO014Data = transData(self, formData);
			//補上新的AddrNo==>以最後結果的 AddrNo做為更新SO138的依據
			SO014Data['ADDRNO'] = self.options.activeAddrNo == undefined ? self.options.addrNo : self.options.activeAddrNo;
			if (self.options.editMode != editMode.edit) {
				if (self.options['SO014'] != undefined) {
					SO014Data['ADDRNO'] = self.options['SO014']['ADDRNO'];
				}
			}
			

			updateDataToDB(self, SO014Data, function (e, _self, flag) {
				if (e === false) {
					$(this).siblings().prop('disabled', false);
					return false;
				} else {
					//異動地址資料後請同WIN版，詢問[是否同步修正發票資料收費地址及郵寄地址]?
					if (flag == 'update') {
						self.options.isSaved = true;
						if (self.options.include == true) {
							messageBox(self.options.language.syncData_Inv_PostMail, messageType.yesno, null, function (_flag) {
								if (_flag == 'yes') {
									//進行更新程序
									updateDataToDB_SO138(self, SO014Data, function (e, _self, flag) {
									});
								}

								//更新前一層顯示資訊
								var $csAdr1 = self.$activeElement.find('span[data-pid="csAdr1"]');
								var $_txtcsAdr2 = $csAdr1.find('input[data-csAdr1="txtcsAdr2"]');
								var $_txtcsAdr3 = $csAdr1.find('input[data-csAdr1="txtcsAdr3"]');
								$_txtcsAdr2.val(formData.cslStrt_1);
								$_txtcsAdr3.val(formData.lblAddress);

								formData = null;
								SO014Data = null;

								var _$csw = self.csw;
								formDestroy(self, 2);

								// 自定義事件回呼
								self.$activeElement.trigger('ChooseCompleted', 'newAddress');

								_$csw.off();
								_$csw.csWindow('close');
								_$csw.csWindow('destroy');

								$csAdr1 = null;
								$_txtcsAdr2 = null;
								$_txtcsAdr3 = null;
								
								_$csw = null;
							});
						} else {
							//更新前一層顯示資訊
							var $csAdr1 = self.$activeElement.find('span[data-pid="csAdr1"]');
							var $_txtcsAdr2 = $csAdr1.find('input[data-csAdr1="txtcsAdr2"]');
							var $_txtcsAdr3 = $csAdr1.find('input[data-csAdr1="txtcsAdr3"]');
							$_txtcsAdr2.val(formData.cslStrt_1);
							$_txtcsAdr3.val(formData.lblAddress);

							formData = null;
							SO014Data = null;

							var _$csw = self.csw;
							formDestroy(self, 2);

							// 自定義事件回呼
							self.$activeElement.trigger('ChooseCompleted', 'newAddress');

							_$csw.off();
							_$csw.csWindow('close');
							_$csw.csWindow('destroy');

							$csAdr1 = null;
							$_txtcsAdr2 = null;
							$_txtcsAdr3 = null;
							
							_$csw = null;
						}
					}
				}
			});
		} catch (err) {
			errorHandle(formName, 'onOKClick', err);
		}
	}
	//按了取消鈕
	function onCancelClick(self) {
		try {
			var _$csw = self.csw;
			self.options.isSaved = false;
			self.options.OLD_SO014 = undefined;
			self.options.LNFlag = -1;

			//var $csAdr1 = self.$activeElement.find('span[data-pid="csAdr1"]');
			formDestroy(self, 3);

			// 自定義事件回呼
			self.$activeElement.trigger('ChooseCompleted', 'cancel');

			_$csw.off();
			_$csw.csWindow('close');
			_$csw.csWindow('destroy');
			//$csAdr1 = null;

			_$csw = null;
		} catch (err) {
			errorHandle(formName, 'onCancelClick', err);
		}
	}
	function dataRefresh(self, data) {
		try {
			var lang = self.options.language;
			var rwSO014 = {};
			if (data.SO014['rows'].length > 0) {
				rwSO014 = data.SO014['rows'][0];
				self.options.SO014 = rwSO014;
			}
			var rwMap2 = data.AdrMap2['rows'][0];
			var _$csw = self.csw;
			var $cswContent = _$csw.find('div[data-csAdr1="csw_Content"]');

			/*//
			//_$csw.find('label[data-csAdr1="lblAddress"]').text(rwSO014['ADDRESS']);
			$cswContent.find('span[data-csAdr1="cslStrt"]').csList('setDisplayValue', { CODENO: rwSO014['STRTCODE'], DESCRIPTION: rwSO014['STRTNAME'] });

			$cswContent.find('input[data-csAdr1="txtLin"]').jqxInput('val', rwSO014['LIN']);
			$cswContent.find('input[data-csAdr1="txtSection"]').jqxInput('val', rwSO014['SECTION']);
			$cswContent.find('span[data-csAdr1="cmbLane"]').jqxComboBox('val', rwSO014['LANE']);
			$cswContent.find('span[data-csAdr1="cmbAlley"]').jqxComboBox('val', rwSO014['ALLEY']);
			$cswContent.find('span[data-csAdr1="cmbAlley2"]').jqxComboBox('val', rwSO014['ALLEY2']);
			$cswContent.find('input[data-csAdr1="txtNo1"]').jqxInput('val', rwSO014['NO1']);
			$cswContent.find('input[data-csAdr1="txtNo2"]').jqxInput('val', rwSO014['NO2']);
			$cswContent.find('input[data-csAdr1="txtFlour"]').jqxInput('val', rwSO014['FLOUR']);
			$cswContent.find('input[data-csAdr1="txtNo3"]').jqxInput('val', rwSO014['NO3']);
			$cswContent.find('input[data-csAdr1="txtRoom"]').jqxInput('val', rwSO014['ROOM']);
			*/

			//下方區域==>如果是 已存在地址, 以現值為優先
			if (rwMap2.ISNEWADDR == 0) {
				$cswContent.find('input[data-csAdr1="txtCity"]').jqxInput().val(convertNullToString(rwSO014['CITYNAME']));
				//$cswContent.find('span[data-csAdr1="csmAddrClass"]').csMulti('setDisplayValue', rwSO014['ADDRCLASSCODE']);
				$cswContent.find('span[data-csAdr1="cslClctEn"]').csList('setDisplayValue', { EMPNO: convertNullToString(rwSO014['CLCTEN']), EMPNAME: convertNullToString(rwSO014['CLCTNAME']) });
				$cswContent.find('span[data-csAdr1="cslArea"]').csList('setDisplayValue', { CODENO: convertNullToString(rwSO014['AREACODE']), DESCRIPTION: convertNullToString(rwSO014['AREANAME']) });
				$cswContent.find('span[data-csAdr1="cslBT"]').csList('setDisplayValue', { CODENO: convertNullToString(rwSO014['BTCODE']), DESCRIPTION: convertNullToString(rwSO014['BTNAME']) });
				//要實作過濾CityCode+AreaCode+StrtCode的村里清單效果
				$cswContent.find('span[data-csAdr1="cslBourg"]').csList('setDisplayValue', { CODENO: convertNullToString(rwSO014['BOURGCODE']), DESCRIPTION: convertNullToString(rwSO014['BOURGNAME']) });
				$cswContent.find('input[data-csAdr1="txtZip"]').jqxInput().val(convertNullToString(rwSO014['ZIPCODE']));
				$cswContent.find('span[data-csAdr1="cslMDU"]').csList('setDisplayValue', { MDUID: convertNullToString(rwSO014['MDUID']), NAME: convertNullToString(rwSO014['MDUNAME']) });
				$cswContent.find('span[data-csAdr1="cslServ"]').csList('setDisplayValue', { CODENO: convertNullToString(rwSO014['SERVCODE']), DESCRIPTION: convertNullToString(rwSO014['SERVNAME']) });
				$cswContent.find('input[data-csAdr1="txtCircuitNo"]').jqxInput().val(convertNullToString(rwSO014['CIRCUITNO']));
				$cswContent.find('span[data-csAdr1="chkDualCable"]').jqxCheckBox().val(rwSO014['DUALCABLE'] == 0 ? false : true);
				$cswContent.find('span[data-csAdr1="cslClctArea"]').csList('setDisplayValue', { CODENO: convertNullToString(rwSO014['CLCTAREACODE']), DESCRIPTION: convertNullToString(rwSO014['CLCTAREANAME']) });
				$cswContent.find('span[data-csAdr1="cmbNodeNo"]').jqxComboBox('val', convertNullToString(rwSO014['NODENO']));
				//$cswContent.find('span[data-csAdr1="cslNodeNo"]').csList('setDisplayValue', { CODENO: rwSO014['NODENO'], DESCRIPTION: rwSO014['NODENO'] });
				$cswContent.find('span[data-csAdr1="cslSales"]').csList('setDisplayValue', { CODENO: convertNullToString(rwSO014['SALESCODE']), DESCRIPTION: convertNullToString(rwSO014['SALESNAME']) });
				$cswContent.find('input[data-csAdr1="txtNetPointNo"]').jqxInput().val(rwSO014['NETPOINTNO'] === undefined ? '' : rwSO014['NETPOINTNO']);
				$cswContent.find('span[data-csAdr1="chkHFlag"]').jqxCheckBox().css('color', rwSO014['HFLAG'] ? 'blue' : 'red').val(rwSO014['HFLAG'] == 0 ? false : true);
				$cswContent.find('span[data-csAdr1="chkHSIFlag"]').jqxCheckBox().css('color', rwSO014['HSIFLAG'] ? 'blue' : 'red').val(rwSO014['HSIFLAG'] == 0 ? false : true);
				$cswContent.find('span[data-csAdr1="chkFTTxFlag"]').jqxCheckBox().css('color', rwSO014['FTTXFLAG'] ? 'blue' : 'red').val(rwSO014['FTTXFLAG'] == 0 ? false : true);
				//$cswContent.find('input[data-csAdr1="dtetFirstInstDate"]').jqxDateTimeInput().val(rwSO014['FIRSTINSTDATE'] === undefined ? null : rwSO014['FIRSTINSTDATE']);
				$('#' + self.options.fid).csDateTime('setDate', rwSO014['FIRSTINSTDATE'] == undefined ? null : rwSO014['FIRSTINSTDATE']);
				//var ary = [lang.CIRCUITSTATUS1, lang.CIRCUITSTATUS2, lang.CIRCUITSTATUS3, lang.CIRCUITSTATUS4];
				$cswContent.find('span[data-csAdr1="cslCircuitStatus"]').csList('codeNo', convertNullToString(rwSO014['CIRCUITSTATUS']));
				//$cswContent.find('input[data-csAdr1="txtCircuitStatus"]').jqxInput().val(rwSO014['CIRCUITSTATUS'] === undefined ? '' : ary[rwSO014['CIRCUITSTATUS']]);
				//$cswContent.find('input[data-csAdr1="txtJumpCableChangeDate"]').jqxInput().val(rwSO014 === undefined ? '' : rwSO014['JUMPCABLECHANGEDATE']);
				$('#' + self.options.jid).csDateTime('setDate', rwSO014['JUMPCABLECHANGEDATE'] == undefined ? null : rwSO014['JUMPCABLECHANGEDATE']);
				$cswContent.find('TextArea[data-csAdr1="txtCircuitLayout"]').jqxTextArea().val(rwSO014 === undefined ? '' : rwSO014['CIRCUITLAYOUT']);
				$cswContent.find('TextArea[data-csAdr1="txtNote"]').jqxTextArea().val(rwSO014 === undefined ? '' : rwSO014['NOTE']);
			} else {
				$cswContent.find('input[data-csAdr1="txtCity"]').jqxInput().val(convertNullToString(rwMap2['P_CITYNAME']));
				//$cswContent.find('span[data-csAdr1="csmAddrClass"]').csMulti('setDisplayValue', rwMap2['ADDRCLASSCODE']);
				$cswContent.find('span[data-csAdr1="cslClctEn"]').csList('setDisplayValue', { EMPNO: convertNullToString(rwMap2['P_CLCTEN']), EMPNAME: convertNullToString(rwMap2['P_CLCTNAME']) });
				$cswContent.find('span[data-csAdr1="cslArea"]').csList('setDisplayValue', { CODENO: convertNullToString(rwMap2['P_AREACODE']), DESCRIPTION: convertNullToString(rwMap2['P_AREANAME']) });
				$cswContent.find('span[data-csAdr1="cslBT"]').csList('setDisplayValue', { CODENO: convertNullToString(rwMap2['P_BTCODE']), DESCRIPTION: convertNullToString(rwMap2['P_BTNAME']) });
				//要實作過濾CityCode+AreaCode+StrtCode的村里清單效果
				$cswContent.find('span[data-csAdr1="cslBourg"]').csList('setDisplayValue', { CODENO: convertNullToString(rwMap2['P_BOURGCODE']), DESCRIPTION: convertNullToString(rwMap2['P_BOURGNAME']) });
				$cswContent.find('input[data-csAdr1="txtZip"]').jqxInput().val(convertNullToString(rwMap2.P_ZIPCODE));
				$cswContent.find('span[data-csAdr1="cslMDU"]').csList('setDisplayValue', { MDUID: convertNullToString(rwMap2['P_MDUID']), NAME: convertNullToString(rwMap2['P_MDUNAME']) });
				$cswContent.find('span[data-csAdr1="cslServ"]').csList('setDisplayValue', { CODENO: convertNullToString(rwMap2['P_SERVCODE']), DESCRIPTION: convertNullToString(rwMap2['P_SERVNAME']) });
				$cswContent.find('input[data-csAdr1="txtCircuitNo"]').jqxInput().val(convertNullToString(rwMap2.P_CIRCUITNO));
				$cswContent.find('span[data-csAdr1="chkDualCable"]').jqxCheckBox().val(rwMap2.P_DUALCABLE == 0 ? false : true);
				$cswContent.find('span[data-csAdr1="cslClctArea"]').csList('setDisplayValue', { CODENO: convertNullToString(rwMap2['P_CLCTAREACODE']), DESCRIPTION: convertNullToString(rwMap2['P_CLCTAREANAME']) });
				$cswContent.find('span[data-csAdr1="cmbNodeNo"]').jqxComboBox('val', convertNullToString(rwMap2['P_NODENO']));
				//$cswContent.find('span[data-csAdr1="cslNodeNo"]').csList('setDisplayValue', { CODENO: rwMap2['P_NODENO'], DESCRIPTION: rwMap2['P_NODENO'] });
				$cswContent.find('span[data-csAdr1="cslSales"]').csList('setDisplayValue', { CODENO: convertNullToString(rwMap2['P_SALESCODE']), DESCRIPTION: convertNullToString(rwMap2['P_SALESNAME']) });
				$cswContent.find('input[data-csAdr1="txtNetPointNo"]').jqxInput().val(rwSO014.NETPOINTNO === undefined ? '' : rwSO014.NETPOINTNO);
				$cswContent.find('span[data-csAdr1="chkHFlag"]').jqxCheckBox().css('color', rwMap2.P_HFLAG ? 'blue' : 'red').val(rwMap2.P_HFLAG == 0 ? false : true);
				$cswContent.find('span[data-csAdr1="chkHSIFlag"]').jqxCheckBox().css('color', rwMap2.P_HSIFLAG ? 'blue' : 'red').val(rwMap2.P_HSIFLAG == 0 ? false : true);
				$cswContent.find('span[data-csAdr1="chkFTTxFlag"]').jqxCheckBox().css('color', rwMap2.P_FTTXFLAG ? 'blue' : 'red').val(rwMap2.P_FTTXFLAG == 0 ? false : true);
				//$cswContent.find('input[data-csAdr1="dtetFirstInstDate"]').jqxDateTimeInput().val(rwSO014.FIRSTINSTDATE === undefined ? null : rwSO014.FIRSTINSTDATE);
				$('#' + self.options.fid).csDateTime('setDate', rwSO014.FIRSTINSTDATE == undefined ? null : rwSO014.FIRSTINSTDATE);
				//var ary = [lang.CIRCUITSTATUS1, lang.CIRCUITSTATUS2, lang.CIRCUITSTATUS3, lang.CIRCUITSTATUS4];
				$cswContent.find('span[data-csAdr1="cslCircuitStatus"]').csList('codeNo', convertNullToString(rwSO014.CIRCUITSTATUS));
				//$cswContent.find('input[data-csAdr1="txtCircuitStatus"]').jqxInput().val(rwSO014.CIRCUITSTATUS === undefined ? '' : ary[rwSO014.CIRCUITSTATUS]);
				//$cswContent.find('input[data-csAdr1="txtJumpCableChangeDate"]').jqxInput().val(rwSO014 === undefined ? '' : rwSO014.JUMPCABLECHANGEDATE);
				$('#' + self.options.jid).csDateTime('setDate', rwSO014.JUMPCABLECHANGEDATE == undefined ? null : rwSO014.JUMPCABLECHANGEDATE);
				$cswContent.find('TextArea[data-csAdr1="txtCircuitLayout"]').jqxTextArea().val(rwSO014 === undefined ? '' : rwSO014.CIRCUITLAYOUT);
				$cswContent.find('TextArea[data-csAdr1="txtNote"]').jqxTextArea().val(rwSO014 === undefined ? '' : rwSO014.NOTE);
			}

			self.options.IsNewAddr = rwMap2.ISNEWADDR;
			if (rwMap2.ISNEWADDR === 0) {
				if (self.options.editMode == editMode.view) {
					$cswContent.find('input[data-csAdr1="btncsAdr1OK"]').jqxButton('disabled', true);
				} else {
					$cswContent.find('input[data-csAdr1="btncsAdr1OK"]').jqxButton('disabled', false); //true
				}
			} else {
				$cswContent.find('input[data-csAdr1="btncsAdr1OK"]').jqxButton('disabled', false);
			}

			_$csw = null;
			$cswContent = null;
			rwSO014 = null;
			rwMap2 = null;
			ary = null;
		} catch (err) {
			errorHandle(formName, 'dataRefresh ', err);
		}
	}
	function dataRefresh2(self) {
		try {
			var lang = self.options.language;
			var rwSO014 = self.options.initData['Table'].rows[0];
			var _$csw = self.csw;

			self.isProcess = true;
			//_$csw.find('label[data-csAdr1="lblAddress"]').text(rwSO014['ADDRESS']);
			_$csw.find('span[data-csAdr1="cslStrt"]').csList('setDisplayValue', { CODENO: rwSO014['STRTCODE'], DESCRIPTION: rwSO014['STRTNAME'] });
			_$csw.find('input[data-csAdr1="txtLin"]').jqxInput('val', convertNullToString(rwSO014['LIN']));
			_$csw.find('input[data-csAdr1="txtSection"]').jqxInput('val', convertNullToString(rwSO014['SECTION']));
			_$csw.find('span[data-csAdr1="cmbLane"]').jqxComboBox('val', convertNullToString(rwSO014['LANE']));
			_$csw.find('span[data-csAdr1="cmbAlley"]').jqxComboBox('val', convertNullToString(rwSO014['ALLEY']));
			_$csw.find('span[data-csAdr1="cmbAlley2"]').jqxComboBox('val', convertNullToString(rwSO014['ALLEY2']));
			_$csw.find('input[data-csAdr1="txtNo1"]').jqxInput('val', convertNullToString(rwSO014['NO1']));
			_$csw.find('input[data-csAdr1="txtNo2"]').jqxInput('val', convertNullToString(rwSO014['NO2']));
			_$csw.find('input[data-csAdr1="txtFlour"]').jqxInput('val', convertNullToString(rwSO014['FLOUR']));
			_$csw.find('input[data-csAdr1="txtNo3"]').jqxInput('val', convertNullToString(rwSO014['NO3']));
			_$csw.find('input[data-csAdr1="txtRoom"]').jqxInput('val', convertNullToString(rwSO014['ROOM']));
			self.isProcess = false;
			var args = {};
			args.data = {};
			args.data.self = self;
			args.data.csw = self.csw;
			address_Validation(args, _$csw.find('input[data-csAdr1="txtNo1"]')[0]);
			_$csw = null;
		} catch (err) {
			errorHandle(formName, 'dataRefresh2', err);
		}
	}
	function resetData(self) {
		try {
			var _$csw = self.csw;
			var $cswContent = _$csw.find('div[data-csAdr1="csw_Content"]');

			$cswContent.find('input[data-csAdr1="txtLin"]').jqxInput('val', '');
			$cswContent.find('input[data-csAdr1="txtSection"]').jqxInput('val', '');
			$cswContent.find('span[data-csAdr1="cmbLane"]').jqxComboBox('val', '');
			$cswContent.find('span[data-csAdr1="cmbAlley"]').jqxComboBox('val', '');
			$cswContent.find('span[data-csAdr1="cmbAlley2"]').jqxComboBox('val', '');
			$cswContent.find('input[data-csAdr1="txtNo1"]').jqxInput('val', '');
			$cswContent.find('input[data-csAdr1="txtNo2"]').jqxInput('val', '');
			$cswContent.find('input[data-csAdr1="txtFlour"]').jqxInput('val', '');
			$cswContent.find('input[data-csAdr1="txtNo3"]').jqxInput('val', '');
			$cswContent.find('input[data-csAdr1="txtRoom"]').jqxInput('val', '');

			//下方區域
			$cswContent.find('input[data-csAdr1="txtCity"]').jqxInput('val', '');
			$cswContent.find('span[data-csAdr1="csmAddrClass"]').csMulti('clearChoose');
			$cswContent.find('span[data-csAdr1="cslClctEn"]').csList('clearDisplayValue');
			$cswContent.find('span[data-csAdr1="cslArea"]').csList('clearDisplayValue');
			$cswContent.find('span[data-csAdr1="cslBT"]').csList('clearDisplayValue');
			$cswContent.find('span[data-csAdr1="cslBourg"]').csList('clearDisplayValue');
			$cswContent.find('input[data-csAdr1="txtZip"]').jqxInput('val', '');
			$cswContent.find('span[data-csAdr1="cslMDU"]').csList('clearDisplayValue');
			$cswContent.find('span[data-csAdr1="cslServ"]').csList('clearDisplayValue');
			$cswContent.find('input[data-csAdr1="txtCircuitNo"]').jqxInput('val', '');
			$cswContent.find('span[data-csAdr1="chkDualCable"]').jqxCheckBox('val', false);
			$cswContent.find('span[data-csAdr1="cslClctArea"]').csList('clearDisplayValue');
			$cswContent.find('span[data-csAdr1="cmbNodeNo"]').jqxComboBox('val', '');
			//$cswContent.find('span[data-csAdr1="cslNodeNo"]').csList('clearDisplayValue');
			$cswContent.find('span[data-csAdr1="cslSales"]').csList('clearDisplayValue');
			$cswContent.find('input[data-csAdr1="txtNetPointNo"]').jqxInput('val', '');
			$cswContent.find('span[data-csAdr1="chkHFlag"]').jqxCheckBox().css('color', 'blue').val(false);
			$cswContent.find('span[data-csAdr1="chkHSIFlag"]').jqxCheckBox().css('color', 'blue').val(false);
			$cswContent.find('span[data-csAdr1="chkFTTxFlag"]').jqxCheckBox().css('color', 'blue').val(false);
			//$cswContent.find('input[data-csAdr1="dtetFirstInstDate"]').jqxDateTimeInput('val', '');
			$('#' + self.options.fid).csDateTime('setText', '');
			$cswContent.find('span[data-csAdr1="cslCircuitStatus"]').csList('clearDisplayValue');
			//$cswContent.find('input[data-csAdr1="txtCircuitStatus"]').jqxInput('val', '');
			//$cswContent.find('input[data-csAdr1="txtJumpCableChangeDate"]').jqxInput('val', '');
			$('#' + self.options.jid).csDateTime('setText', '');
			$cswContent.find('TextArea[data-csAdr1="txtCircuitLayout"]').jqxTextArea('val', '');
			$cswContent.find('TextArea[data-csAdr1="txtNote"]').jqxTextArea('val', '');

			_$csw = null;
			$cswContent = null;
		} catch (err) {
			errorHandle(formName, 'dataRefresh ', err);
			return false;
		}
		return true;
	}
	function getFormData(self, data) {
		try {
			var oo = self.csw.find('[data-csAdr1]');
			if (oo.length > 0) {
				var $_el;
				var itemString = '{';
				var strData;
				for (var i = 0, len = oo.length; i < len; i++) {
					$_el = $(oo[i]);
					strData = $_el.data('csadr1');
					if (strData === undefined) continue;

					if (strData.substr(0, 3) === 'txt') {
						itemString += '"' + strData + '":"' + $_el.val() + '",';
					} else if (strData.substr(0, 3) === 'csl') {
						itemString += '"' + strData + '_1":"' + $_el.csList('codeNo') + '",';
						itemString += '"' + strData + '_2":"' + $_el.csList('description') + '",';
					} else if (strData.substr(0, 3) === 'csm') {
						itemString += '"' + strData + '":"' + $_el.csMulti('getChooseList') + '",';
					} else if (strData.substr(0, 3) === 'cmb') {
						var ooo = $_el.find('input').val(); //jqxComboBox('val');
						if (ooo !== undefined) {
							itemString += '"' + strData + '":"' + ooo + '",';
						} else {
							itemString += '"' + strData + '":"",';
						}
					} else if (strData.substr(0, 3) === 'lbl') {
						itemString += '"' + strData + '":"' + $_el.text() + '",';
					} else if (strData.substr(0, 4) === 'dtet') {
						itemString += '"' + strData + '":"' + $_el.text() + '",';
					} else {
						itemString += '"' + strData + '":"' + $_el.val() + '",';
					}



				}
				if (itemString.length > 2) itemString = itemString.substr(0, itemString.length - 1);
				itemString += '}';
				strData = null;
				$_el = null;
				$_el = null;

				var ooo = $.parseJSON(itemString);
				itemString = null;

				return ooo;
			}
			oo = null;
		} catch (err) {
			errorHandle(formName, 'getFormData ', err);
		}

		return null;
	} //end getFormData
	function transData(self, data) {
		var options = self.options;
		var oo = {};
		if (options.initData !== undefined) {
			if (options.initData['AdrMap2'] !== undefined) {
				oo['ADDRNO'] = options.initData['AdrMap2']['rows'][0]['P_ADDRNO'];
				oo['ADDRSORT'] = options.initData['AdrMap2']['rows'][0]['P_ADDRSORT'];
				oo['NOE1'] = options.initData['GetOrderString']['rows'][0]['NOE1'];
				oo['NOE2'] = options.initData['GetOrderString']['rows'][0]['NOE2'];
				oo['NOE3'] = options.initData['GetOrderString']['rows'][0]['NOE3'];
				oo['NOE4'] = options.initData['GetOrderString']['rows'][0]['NOE4'];
				oo['DOOR1'] = options.initData['GetOrderString']['rows'][0]['DOOR1'];
				oo['DOOR2'] = options.initData['GetOrderString']['rows'][0]['DOOR2'];
				oo['DOOR3'] = options.initData['GetOrderString']['rows'][0]['DOOR3'];
				oo['DOOR4'] = options.initData['GetOrderString']['rows'][0]['DOOR4'];
				oo['ADDRFLAG'] = options.initData['GetOrderString']['rows'][0]['ADDRFLAG'];
			} else {
				oo['ADDRNO'] = options.initData['Table']['rows'][0]['ADDRNO'];
				oo['ADDRSORT'] = options.initData['Table']['rows'][0]['ADDRSORT'];
			}
		} else {
			if (options.initData2['AdrMap2'] !== undefined) {
				oo['ADDRNO'] = options.initData2['AdrMap2']['rows'][0]['P_ADDRNO'];
				oo['ADDRSORT'] = options.initData2['AdrMap2']['rows'][0]['P_ADDRSORT'];
				oo['NOE1'] = options.initData2['GetOrderString']['rows'][0]['NOE1'];
				oo['NOE2'] = options.initData2['GetOrderString']['rows'][0]['NOE2'];
				oo['NOE3'] = options.initData2['GetOrderString']['rows'][0]['NOE3'];
				oo['NOE4'] = options.initData2['GetOrderString']['rows'][0]['NOE4'];
				oo['DOOR1'] = options.initData2['GetOrderString']['rows'][0]['DOOR1'];
				oo['DOOR2'] = options.initData2['GetOrderString']['rows'][0]['DOOR2'];
				oo['DOOR3'] = options.initData2['GetOrderString']['rows'][0]['DOOR3'];
				oo['DOOR4'] = options.initData2['GetOrderString']['rows'][0]['DOOR4'];
			} else { 
				oo['ADDRNO'] = -1;
				oo['ADDRSORT'] ='';
				//if (options.initData2['SO014'] == undefined) {
				//	oo['ADDRNO'] = options['SO014']['rows'][0]['ADDRNO'];
				//	oo['ADDRSORT'] = options['SO014']['rows'][0]['ADDRSORT'];
				//} else {
				//	oo['ADDRNO'] = options.initData2['SO014']['rows'][0]['ADDRNO'];
				//	oo['ADDRSORT'] = options.initData2['SO014']['rows'][0]['ADDRSORT'];
				//  }
			}
		}
		

		oo['ADDRESS'] = data['lblAddress'];
		oo['STRTCODE'] = data['cslStrt_1'];
		oo['STRTNAME'] = data['cslStrt_2'];
		oo['LIN'] = data['txtLin'];
		oo['SECTION'] = data['txtSection'];
		oo['LANE'] = data['cmbLane'];
		oo['ALLEY'] = data['cmbAlley'];
		oo['ALLEY2'] = data['cmbAlley2'];
		oo['NO1'] = data['txtNo1'];
		oo['NO2'] = data['txtNo2'];
		oo['FLOUR'] = data['txtFlour'];
		oo['NO3'] = data['txtNo3'];
		oo['ROOM'] = data['txtRoom'];
		oo['CITYNAME'] = data['txtCity'];
		oo['ADDRCLASSCODE'] = data['csmAddrClass'];
		oo['CLCTEN'] = data['cslClctEn_1'];
		oo['CLCTNAME'] = data['cslClctEn_2'];
		oo['AREACODE'] = data['cslArea_1'];
		oo['AREANAME'] = data['cslArea_2'];
		oo['BTCODE'] = data['cslBT_1'];
		oo['BTNAME'] = data['cslBT_2'];
		oo['BOURGCODE'] = data['cslBourg_1'];
		oo['BOURGNAME'] = data['cslBourg_2'];
		oo['ZIPCODE'] = data['txtZip'];
		oo['MDUID'] = data['cslMDU_1'];
		oo['MDUNAME'] = data['cslMDU_2'];
		oo['SERVCODE'] = data['cslServ_1'];
		oo['SERVNAME'] = data['cslServ_2'];
		oo['CIRCUITNO'] = data['txtCircuitNo'];
		oo['DUALCABLE'] = data['chkDualCable'];
		oo['CLCTAREACODE'] = data['cslClctArea_1'];
		oo['CLCTAREANAME'] = data['cslClctArea_2'];
		oo['NODENO'] = data['cmbNodeNo'];
		//oo['NODENO'] = data['cslNodeNo_1'];
		oo['SALESCODE'] = data['cslSales_1'];
		oo['SALESNAME'] = data['cslSales_2'];
		oo['NETPOINTNO'] = data['txtNetPointNo'];
		oo['HFLAG'] = data['chkHFlag'];
		oo['HSIFLAG'] = data['chkHSIFlag'];
		oo['FTTXFLAG'] = data['chkFTTxFlag'];
		oo['FIRSTINSTDATE'] = data['dtetFirstInstDate'];
		oo['CIRCUITSTATUS'] = data['cslCircuitStatus_1'];
		//oo['CIRCUITSTATUS'] = data['txtCircuitStatus'];
		oo['JUMPCABLECHANGEDATE'] = data['txtJumpCableChangeDate'];
		oo['CIRCUITLAYOUT'] = data['txtCircuitLayout'];
		oo['NOTE'] = data['txtNote'];
		options = null;

		//options.initData.SO014.rows[0] = oo;
		return oo;
	}

	function address_Validation(args, div) {
		try {
			try{
				if (args.data.self.isProcess === true) {
					return false;
				}
			} catch (err) {
				errorHandle(formName, 'address_Validation ', err);
			}
			
			if (args.data.csw.find('input[data-csAdr1="txtNo1"]').val() === '') {
				return false;
			}
			if (args.data.csw.find('span[data-csAdr1="cslStrt"]').csList('codeNo') === '') {
				return false;
			}
			//if (args.data.csw.find('span[data-csAdr1="cslStrt"]').csList('selectedIndex') == -1) {
			//	return false;
			//}


			/*
			var oo = getElementId(this);
			if (oo === 'cslStrt') {
				args.data.self.isProcess = true;
				resetData(args.data.self);
				args.data.self.isProcess = false;
				oo = null;
				return false;
			}
			oo = null;
			*/

			//getAddrString(this, args);
			//getOrderString(this, args);
			if (isDataOk(div == undefined ? this : div, args) === true) {
				return false;
			} else {
				return false;
			}

			/*
			$.when($.getJSON("api/Address/Address_Validation", {
				inData: encodeURIComponent(JSON.stringify(getFormData({ "Orthodox": self.options.SO014[0].ORTHODOX })))
			}))
			.then(function (res, status, xhr) {
				var oo = res;
				if (res.AddrString) {
					$csw.find('label[data-csAdr1="lblAddress"]').text(res.AddrString[0].Message);
				}
				//self.$activeElement.find('label[data-csAdr1="txtcsAdr2"]').text(res[0].STRTCODE); 
				//self.$activeElement.find('label[data-csAdr1="txtcsAdr3"]').text(res[0].ADDRESS);

				//self.options.SO014 = res;

				//self.$activeElement.find('input[data-csAdr1="btncsAdr1"]').jqxButton({ disabled: false });
			}, goFailure);
			*/
		} catch (err) {
			errorHandle(formName, 'address_Validation ', err);
		}
		return false;
	} //end address_Validation
	function getAddrString(ele, args) {
		var _$csw = args.data.csw;
		var $cswContent = _$csw.find('div[data-csAdr1="csw_Content"]');
		var addrStr = '', tmpStr = '', tmpStr2 = '';
		var oo;
		var SO014 = { VersionMode: args.data.self.options.orthodox };
		var lang = args.data.self.options.language;

		try {
			if (args.data.self.options.orthodox === 1) {
				oo = $cswContent.find('span[data-csAdr1="cslCity"]');
				tmpstr = oo.csList('description');
				if (tmpstr !== '') {
					addrStr += tmpstr;
					SO014.CityCode = oo.csList('codeNo');
					SO014.CityName = tmpstr;
				}

				oo = $cswContent.find('span[data-csAdr1="cslArea"]');
				tmpstr = oo.csList('description');
				if (tmpstr !== '') {
					addrStr += tmpstr;
					SO014.AreaCode = oo.csList('codeNo');
					//SO014.AreaName = tmpstr;
				}

				oo = $cswContent.find('span[data-csAdr1="cslStrt"]');
				tmpstr = oo.csList('description');
				if (tmpstr !== '') {
					addrStr += tmpstr;
					SO014.StrtCode = oo.csList('codeNo');
					//SO014.StrtName = tmpstr;
				}
			}
			else {
				oo = $cswContent.find('span[data-csAdr1="cslStrt"]');
				tmpstr = oo.csList('description');
				if (tmpstr !== '') {
					addrStr += tmpstr;
					SO014.StrtCode = oo.csList('codeNo');
					//SO014.StrtName = tmpstr;
				}
			}

			tmpstr = $cswContent.find('input[data-csAdr1="txtLin"]').jqxInput('val');
			if (tmpstr !== '') {
				addrStr += tmpstr + lang.lblLin; //'鄰'
				SO014.Lin = tmpstr;
			}

			tmpstr = $cswContent.find('input[data-csAdr1="txtSection"]').jqxInput('val');
			if (tmpstr !== '') {
				addrStr += tmpstr + lang.lblSection; //'段'
				SO014.Section = tmpstr;
			}

			tmpstr = $cswContent.find('span[data-csAdr1="cmbLane"]').find('input').val(); //jqxComboBox('val');
			if ($.isNumeric(tmpstr.replace('-', '')) === true) {
				if (tmpstr !== '') {
					addrStr += tmpstr + lang.lblLane; //'巷'
					SO014.Lane = tmpstr;
				}
			} else {
				if (tmpstr !== '') {
					addrStr += tmpstr;
					SO014.Lane = tmpstr;
				}
			}

			tmpstr = $cswContent.find('span[data-csAdr1="cmbAlley"]').find('input').val(); //jqxComboBox('val');
			if ($.isNumeric(tmpstr.replace('-', '')) === true) {
				if (tmpstr !== '') {
					addrStr += tmpstr + lang.lblAlley; //'弄'
					SO014.Alley = tmpstr;
				}
			} else {
				if (tmpstr !== '') {
					addrStr += tmpstr;
					SO014.Alley = tmpstr;
				}
			}

			tmpstr = $cswContent.find('span[data-csAdr1="cmbAlley2"]').find('input').val(); //jqxComboBox('val');
			if ($.isNumeric(tmpstr.replace('-', '')) === true) {
				if (tmpstr !== '') {
					addrStr += tmpstr + lang.lblAlley2; //'衖'
					SO014.Alley2 = tmpstr;
				}
			} else {
				if (tmpstr !== '') {
					addrStr += tmpstr;
					SO014.Alley2 = tmpstr;
				}
			}

			tmpstr = $cswContent.find('input[data-csAdr1="txtNo1"]').jqxInput('val');
			if (tmpstr !== '') {
				tmpstr2 = $cswContent.find('input[data-csAdr1="txtNo2"]').jqxInput('val');
				if (tmpstr2 !== '') {
					addrStr += tmpstr + '-' + tmpstr2 + lang.lblNo1; //'號'
					SO014.No1 = tmpstr;
					SO014.No2 = tmpstr2;
				} else {
					addrStr += tmpstr + lang.lblNo1; //'號'
					SO014.No1 = tmpstr;
				}
			}

			tmpstr = $cswContent.find('input[data-csAdr1="txtFlour"]').jqxInput('val');
			if (tmpstr !== '') {
				addrStr += tmpstr + lang.lblFlour; //'樓'
				SO014.Flour = tmpstr;
			}

			tmpstr = $cswContent.find('input[data-csAdr1="txtNo3"]').jqxInput('val');
			if (tmpstr !== '') {
				addrStr += lang.lblNo3 + tmpstr; //'之'
				SO014.No3 = tmpstr;
			}

			tmpstr = $cswContent.find('input[data-csAdr1="txtRoom"]').jqxInput('val');
			if (tmpstr !== '') {
				addrStr += tmpstr;
				SO014.Room = tmpstr;
			}

			$cswContent.find('label[data-csAdr1="lblAddress"]').text(addrStr);
		} catch (err) {
			errorHandle(formName, 'getAddrString ', err);
		}

		_$csw = null;
		$cswContent = null;
		tmpStr = null;
		tmpStr2 = null;
		oo = null;
		addrStr = null;

		return SO014;
	}
	function isDataOk(ele, args) {
		try {
			//依 有效輸入 進行地址資訊取回程序
			var o = $.grep(args.data.self.firstSection, function (item) {
				return item === $(ele).data('csadr1');
			});

			if (o.length > 0) {
				args.data.self.isProcess = true;
				//排序字串
				var uiSO014 = getAddrString(ele, args);
				//到Server端檢查是否為有效地址==>有-->回傳SO016
				try {
					var options = args.data.self.options;
					//var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
					var paraLoginInfo = getParaLoginInfo(args.data.self.$activeElement[0], formName);
					var parameters = $.extend({}, paraLoginInfo, {
						strJSON: { type: 'string', value: uiSO014 }
					});  // { type: 'string', value: uiSO014 }
					var params = getParameters(riadllName,
						riaClassName,
						'CheckAddrSortString',
						JSON.stringify(parameters), 'noProcessData');
					getServerData(params, {
						success: function (data) {
							if (data != undefined && data.ErrorCode == 0) {
								options.initData = null;
								delete options.initData;
								options.initData = JSON.parse(data.ResultXML);
								dataRefresh(args.data.self, options.initData);
							}
							else {
								if (typeof data === 'string') {
									messageBox(data, messageType.critical);
								} else {
									messageBox(data.ErrorMessage, messageType.critical);
								}
							}
							args.data.self.isProcess = false;
							options = null;
							params = null;
						}
					});
				}
				catch (err) {
					errorHandle(formName, 'isDataOk_getServerData', err);
				}
			} else {
				args.data.self.csw.find('input[data-csAdr1="btncsAdr1OK"]').jqxButton('disabled', false);
				o = null;
				return false;
			}
			o = null;
		} catch (err) {
			errorHandle(formName, 'isDataOk ', err);
		}

		return true;
	} 
	function updateDataToDB(self, data, callback) {
		try {
			var options = self.options;
			var lang = options.language;
			//var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
			var paraLoginInfo = getParaLoginInfo(self.$activeElement[0], formName);
			var parameters = $.extend({}, paraLoginInfo, {
				Orthodox: { type: 'int32', value: options.orthodox },
				//如果是一般性地址元件1, 便強制傳入  2:新增
				editMode: { type: 'int32', value: options.include == false ? 2 : options.editMode }, 
				IsNewAddr: { type: 'int32', value: options.IsNewAddr },
				strJSON: { type: 'string', value: JSON.stringify(data) }
			});
			var params = getParameters(riadllName,
				riaClassName,
				'updateDataToDB',
				JSON.stringify(parameters));
			getServerData(params, {
				success: function (data) {
					if (data != undefined && data.ErrorCode == 0) {
						if (data.ResultXML == '') {
							messageBox(lang.noAddrData, messageType.critical);
							callback(false);
							return false;
						}

						options.initData = null;
						delete options.initData;
						options.initData = JSON.parse(data.ResultXML);
						if (options.initData['Table'].rows.length > 0) {
							options.SO014 = options.initData['Table']['rows'][0];
							options.addrNo = options.SO014['ADDRNO'];
						}
						callback(true, self, 'update');
					}
					else {
						if (typeof data === 'string') {
							messageBox(data, messageType.critical);
						} else {
							messageBox(data.ErrorMessage, messageType.critical);
						}
					}
					options = null;
					params = null;
					parameters = null;
					paraLoginInfo = null;
					callback(false);
				}
			});
		}
		catch (err) {
			errorHandle(formName, 'updateDataToDB', err);
		}
		return true;
	}
	function updateDataToDB_SO138(self, data, callback) {
		try {
			var options = self.options;
			var lang = options.language;
			//var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
			var paraLoginInfo = getParaLoginInfo(self.$activeElement[0], formName);
			var parameters = $.extend({}, paraLoginInfo, {
				Orthodox: { type: 'int32', value: options.orthodox },
				editMode: { type: 'int32', value: options.editMode },
				IsNewAddr: { type: 'int32', value: 9 },
				strJSON: { type: 'string', value: JSON.stringify(data) }
			});
			var params = getParameters(riadllName,
				riaClassName,
				'updateDataToDB',
				JSON.stringify(parameters));
			getServerData(params, {
				success: function (data) {
					if (data != undefined && data.ErrorCode == 0) {
						callback(true, self, 'update');
					}
					else {
						if (typeof data === 'string') {
							messageBox(data, messageType.critical);
						} else {
							messageBox(data.ErrorMessage, messageType.critical);
						}
					}
					options = null;
					params = null;
					parameters = null;
					paraLoginInfo = null;
					callback(false);
				}
			});
		}
		catch (err) {
			errorHandle(formName, 'updateDataToDB', err);
		}
		return true;
	}
	function frmAddHandler(self, cswId) {
		try {
			//var options = $.data(div, formName).options;
			//var options = self.options;
			//if (options.container != null) {
			//   if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
			//      $(options.container).on('winClosing', function (e) {
			//         close(div)
			//      });
			//   }
			//}
			//else {
			//}
			$('#' + cswId).on('winClosing', function (e) {
				formDestroy(self, 3);
				$('#' + cswId).jqxWindow('close');
				$('#' + cswId).csWindow('destroy');

				// 自定義事件回呼
				self.$activeElement.trigger('ChooseCompleted', 'cancel');
			});
			$('#' + cswId).on('keydown', function (e) {
				try {
					if (e.ctrlKey && e.which == 119) {
						showParameters(options);
						//messageBox(JSON.stringify(options, null, '\t'), null, null, null, { width: 800, height: 500 });
						return false;
					}
				}
				catch (err) {
					errorHandle(formName, 'frmAddHandler_keydown', err, true);
				}
			});
		}
		catch (err) {
			errorHandle(formName, 'frmAddHandler', err);
		}
	};
	


	function BLength(s) {
		var arr = s.match(/[^\x00-\xff]/ig);
		return arr === null ? s.length : s.length + arr.length;
	}
	String.prototype.padLeft = function (len, sign) {
		var tlen = this.BLength();
		var result = this;
		for (var i = 0; i < len; i++)
			result = sign + result;
		return result;
	};
	String.prototype.padRight = function (len, sign) {
		var tlen = BLength(this);
		var result = this;
		for (var i = 0; i < len - tlen; i++)
			result = result + sign;
		return result;
	};
	String.prototype.left = function (len) {
		return this.substring(0, len);
	};
	String.prototype.right = function (len) {
		return this.substring(this.length - len, this.length);
	};
	String.prototype.mid = function (startnum, len) {
		if (!/\d+/.test(startnum)) return this;
		return this.substr(startnum, len);
	};
	function padLeft(str, lenght) {
		if (str.length >= lenght)
			return str;
		else
			return padLeft("0" + str, lenght);
	}
	function padRight(str, lenght) {
		if (str.length >= lenght)
			return str;
		else
			return padRight(str + "0", lenght);
	}



})(jQuery, window);