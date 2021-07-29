(function ($, window, undefined) {
	var formName = 'csAddress3';
	var riadllName = 'Cablesoft.RIA.Utility.GiAddress.Web.dll';
	var riaClassName = 'Cablesoft.RIA.Utility.GiAddress.Web.dsGiAddress3';

	$.fn.csAddress3 = function (options, param, param2) {
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
						options: $.extend({}, new defaults(), new csAddress3(), options)
					});
					init(this);
				}
				state = null;
			});
		}
		catch (err) {
			errorHandle(formName, '$.fn.csAddress3', err);
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
		destroy: function (jq) {
			return jq.each(function (idx, element) {
				formDestroy(getSelf($(element)), 0);
			});
		},
		resize: function (jq, params) {
			try {
				return jq.each(function () {
					formResize(getSelf(jq), params);
				});
			} catch (err) {
				errorHandle(formName, 'resize', err);
			}
		},
		disabled: function (div, params) {
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
		clearDisplayValue: function (div, params) {
			_clearDisplayValue(getSelf(div));
		},
		clear: function (div, params) {
			_clearDisplayValue(getSelf(div));
		},
		address: function (div, params) {
			return getSelf(div).options.address;
		},
		address1: function (div, params) {
			return getSelf(div).options.address1;
		},
		addressInfo: function (div, params) {
			var options = getSelf(div).options;
			 var SO014 = options.SO014;
			if (SO014 == undefined) return null;

			var addrSortDataRow = options.addrSortData['Table1'].rows[0];

			var oo = {
				cityCode: SO014.CityCode,
				cityName: SO014.CityName,
				areaCode: SO014.AreaCode,
				strtCode: SO014.StrtCode,
				strtName: SO014.StrtName,
				ord: SO014.Ord,
				lin: SO014.Lin,
				section: SO014.Section,
				lane: SO014.Lane,
				alley: SO014.Alley,
				alley2: SO014.Alley2,
				no1A: SO014.No1A,
				no2A: SO014.No2A,
				no1B: SO014.No1B,
				no2B: SO014.No2B,
				flourA: SO014.FlourA,
				flourB: SO014.FlourB,
				noe: SO014.Noe,
				address: SO014.Address,
				addrFlagA: SO014.AddrFlagA,
				addrFlagB: SO014.AddrFlagB,
				addrSortA: addrSortDataRow['AddrSortA'],
				addrSortB: addrSortDataRow['AddrSortB'],
				addrSortA1: addrSortDataRow['AddrSortA1'],
				addrSortB1: addrSortDataRow['AddrSortB1'],
				addrSortA2: addrSortDataRow['AddrSortA2'],
				addrSortB2: addrSortDataRow['AddrSortB2'],
				LNFlag: options.LNFlag
			};
			return oo;
		},
		addrSort: function (div, params) {
			return getSelf(div).options.orderStr1;
		},
		addrSortA: function (div, action) {
			if (getSelf(div).options.addrSortData !== undefined)
				return getSelf(div).options.addrSortData['Table1'].rows[0]['AddrSortA'];
			else return '';
			//getAddrMap(getSelf(div), 'A', function (event) {
			//    action(event);
			//});
		},
		addrSortB: function (div, action) {
			if (getSelf(div).options.addrSortData !== undefined)
				return getSelf(div).options.addrSortData['Table1'].rows[0]['AddrSortB'];
			else return '';
			//getAddrMap(getSelf(div), 'B', function (event) {
			//    action(event);
			//});
		},
		addrSortA1: function (div, action) {
			if (getSelf(div).options.addrSortData !== undefined)
				return getSelf(div).options.addrSortData['Table1'].rows[0]['AddrSortA1'];
			else return '';
			//getAddrMap(getSelf(div), 'A1', function (event) {
			//    action(event);
			//});
		},
		addrSortB1: function (div, action) {
			if (getSelf(div).options.addrSortData !== undefined)
				return getSelf(div).options.addrSortData['Table1'].rows[0]['AddrSortB1'];
			else return '';
			//getAddrMap(getSelf(div), 'B1', function (event) {
			//    action(event);
			//});
		},
		addrSortA2: function (div, action) {
			if (getSelf(div).options.addrSortData !== undefined)
				return getSelf(div).options.addrSortData['Table1'].rows[0]['AddrSortA2'];
			else return '';
			//getAddrMap(getSelf(div), 'A2', function (event) {
			//    action(event);
			//});
		},
		addrSortB2: function (div, action) {
			if (getSelf(div).options.addrSortData !== undefined)
				return getSelf(div).options.addrSortData['Table1'].rows[0]['AddrSortB2'];
			else return '';
			//getAddrMap(getSelf(div), 'B2', function (event) {
			//    action(event);
			//});
		},
		focus: function (div) {
			return _focus(getSelf(div));
		},

		cityCode: function (div, params1, params2) {
			if (params1 != undefined) {
				//getSelf(div).$activeElement.find('div[data-csAdr3="cslStrt"]').csList('codeNo', params1);
				//if (params2 == undefined || params2 == true)
				//    address_Validation({ data: getSelf(div) }, true);
			}
			else
				return '';
		},
		cityName: function (div, params1, params2) {
			if (params1 != undefined) {
				//getSelf(div).$activeElement.find('div[data-csAdr3="cslStrt"]').csList('codeNo', params1);
				//if (params2 == undefined || params2 == true)
				//    address_Validation({ data: getSelf(div) }, true);
			}
			else
				return '';
		},
		areaCode: function (div, params1, params2) {
			if (params1 != undefined) {
				//getSelf(div).$activeElement.find('div[data-csAdr3="cslStrt"]').csList('codeNo', params1);
				//if (params2 == undefined || params2 == true)
				//    address_Validation({ data: getSelf(div) }, true);
			}
			else
				return '';
		},
		areaName: function (div, params1, params2) {
			if (params1 != undefined) {
				//getSelf(div).$activeElement.find('div[data-csAdr3="cslStrt"]').csList('codeNo', params1);
				//if (params2 == undefined || params2 == true)
				//    address_Validation({ data: getSelf(div) }, true);
			}
			else
				return '';
		},
		strtCode: function (div, params1, params2) {
			if (params1 != undefined) {
				getSelf(div).$activeElement.find('div[data-csAdr3="cslStrt"]').csList('codeNo', params1);
				if (params2 == undefined || params2 == true)
					address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('div[data-csAdr3="cslStrt"]').csList('codeNo');
		},
		ord: function (div, params1, params2) {
			if (params1 != undefined) {
				getSelf(div).$activeElement.find('input[data-csAdr3="txtORD"]').val(params1)
				if (params2 == undefined || params2 == true)
					 address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('input[data-csAdr3="txtORD"]').val();
		},
		lin: function (div, params1, params2) {
			if (params1 != undefined) {
				getSelf(div).$activeElement.find('input[data-csAdr3="txtLin"]').val(params1)
				if (params2 == undefined || params2 == true)
					 address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('input[data-csAdr3="txtLin"]').val();
		},
		section: function (div, params1, params2) {
			if (params1 != undefined) {
				getSelf(div).$activeElement.find('input[data-csAdr3="txtSection"]').val(params1)
				if (params2 == undefined || params2 == true)
					 address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('input[data-csAdr3="txtSection"]').val();
		},
		lane: function (div, params1, params2) {
			if (params1 != undefined) {
				getSelf(div).$activeElement.find('div[data-csAdr3="cmbLane"]').val(params1)
				if (params2 == undefined || params2 == true)
					 address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('div[data-csAdr3="cmbLane"]').val();
		},
		alley: function (div, params1, params2) {
			if (params1 != undefined) {
				getSelf(div).$activeElement.find('div[data-csAdr3="cmbAlley"]').val(params1)
				if (params2 == undefined || params2 == true)
					 address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('div[data-csAdr3="cmbAlley"]').val();
		},
		alley2: function (div, params1, params2) {
			if (params1 != undefined) {
				getSelf(div).$activeElement.find('div[data-csAdr3="cmbAlley2"]').val(params1)
				if (params2 == undefined || params2 == true)
					 address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('div[data-csAdr3="cmbAlley2"]').val();
		},

		no1A: function (div, params1, params2) {
			if (params1 != undefined) {
				getSelf(div).$activeElement.find('input[data-csAdr3="txtNo1A"]').val(params1)
				if (params2 == undefined || params2 == true)
					 address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('input[data-csAdr3="txtNo1A"]').val();
		},
		no2A: function (div, params, params2) {
			if (params != undefined) {
				getSelf(div).$activeElement.find('input[data-csAdr3="txtNo2A"]').val(params);
				if (params2 == undefined || params2 == true)
					 address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('input[data-csAdr3="txtNo2A"]').val();
		},
		no1B: function (div, params, params2) {
			if (params != undefined)  {
				getSelf(div).$activeElement.find('input[data-csAdr3="txtNo1B"]').val(params)
				if (params2 == undefined || params2 == true)
					 address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('input[data-csAdr3="txtNo1B"]').val();
		},
		no2B: function (div, params, params2) {
			if (params != undefined) {
				getSelf(div).$activeElement.find('input[data-csAdr3="txtNo2B"]').val(params)
				if (params2 == undefined || params2 == true)
					 address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('input[data-csAdr3="txtNo2B"]').val();
		},
		flourA: function (div, params, params2) {
			if (params != undefined) {
				getSelf(div).$activeElement.find('input[data-csAdr3="txtFlourA"]').val(params)
				if (params2 == undefined || params2 == true)
					 address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('input[data-csAdr3="txtFlourA"]').val();
		},
		flourB: function (div, params, params2) {
			if (params != undefined)  {
				getSelf(div).$activeElement.find('input[data-csAdr3="txtFlourB"]').val(params)
				if (params2 == undefined || params2 == true)
					 address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('input[data-csAdr3="txtFlourB"]').val();
		},
		noE: function (div, params, params2) {
			if (params != undefined) {
				getSelf(div).$activeElement.find('div[data-csAdr3="cmbNoe"]').jqxComboBox('selectIndex', params)
				if (params2 == undefined || params2 == true)
					address_Validation({ data: getSelf(div) }, null);
			}
			else
				return getSelf(div).$activeElement.find('div[data-csAdr3="cmbNoe"]').jqxComboBox('getSelectedIndex');
		},
		setDisplayValue: function (div, params) {
			var options = getSelf(div).options;
			if (params != undefined) {
				var  fName = 'strtCode';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'ord';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'lin';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'section';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'lane';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'alley';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'alley2';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'no1A';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'no2A';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'no1B';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'no2B';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'flourA';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'flourB';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
				fName = 'noE';
				if (params[fName] != undefined || params[fName] != null)
					methods[fName](div, params[fName]);
			}
		},
		scrToRcd: function (div, action) {
			_ScrToRcd(getSelf(div), function (event) {
				if (event[0] == true)
					action(event[1]);
				else
					action(null);
			});
		},
		isDataOK: function (div, params) {
			return _isDataOK(div, params);
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
		this.width = 800;
		this.address = '';
		this.filterAreaCode = false;
		this.edableFilterAreaCode = true;
		this.LNFlag = -1; //CD017.LNFlag==>若【鄰】無值,　則警告【此街道鄰必填】
	};
	function getSelf(jq) {
		if (jq.length > 0) {
			var oo = $.data(jq[0], formName);
			if (oo === undefined) {
				oo = $.data(jq.parent()[0], formName);
			}
			return oo;
		} else {
			return undefined;
		}
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
						oo.jqxPanel({ width: self.$activeElement.width() - 12 });
						//oo.jqxPanel({ height: self.$activeElement.height() - 8 });
					} else if (controls[i].type === 'jqxInput') {
						oo.outerWidth(oo.parent().width());
					} else if (controls[i].type === 'jqxComboBox') {
						oo.jqxComboBox({ width: oo.parent().width() });
					} else if (controls[i].type === 'jqxCheckBox') {
						oo.jqxCheckBox({ width: oo.parent().width() });
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
			deleteJSONObject(self.options);
			//options.length = 0;
			//options = null;
			offElementEvents(self.$activeElement);
			$.data(self.$activeElement, formName, null);
			$(self.$activeElement).off();


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
	function _focus(self) {
		if (self != undefined && self.options.strtId != undefined) {
			var oo = self.$activeElement.find('#' + self.options.strtId);
			oo.csList('focus');
			oo = null;
		}
	}
	function _isDataOK(jq, params) {
		var options = getSelf(jq).options;
		//若【鄰】無值,　則警告【此街道鄰必填】。 
		if (options.LNFlag == 1) {
			if (options.SO014.Lin == '') {
				if (params == true) {
					messageBox(options.language.LNFlag_Must, messageType.critical);
				}
				return [false, options.language.LNFlag_Must];
			}
		}
		return [true, ''];
	}

	function init(div) {
		try {
			var self = $.data(div, formName);
			self.$activeElement = $(div);
			Query_UI_Data(self);
			self = null;
		}
		catch (err) {
			errorHandle(formName, 'init', err);
		}
	}
	function Query_UI_Data(self) {
		try {
			var options = self.options;
			//var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
			var paraLoginInfo = getParaLoginInfo(self.$activeElement[0], formName);
			var parameters = $.extend({}, paraLoginInfo, {
				OwnerName: { type: 'string', value: '' },
				CompyCode: { type: 'integer', value: options.loginInfo.loginInfo.rows[0].compcode }
			});
			var params = getParameters(riadllName,
				riaClassName,
				'Query_UI_Data',
				JSON.stringify(parameters));
			getServerData(params, {
				success: function (data) {
					if (data != undefined && data.ErrorCode == 0) {
						var oo = JSON.parse(data.ResultXML);
						if (oo !== undefined && oo['SO041'] !== undefined && oo['SO041']['rows'] !== undefined && oo['SO041']['rows'].length > 0) {
							options.orthodox = oo['SO041']['rows'][0]['ADDRTYPE'];
							options.initData = oo;
						} else {
							options.orthodox = '';
							options.initData = null;
						}

						//localStorage.setItem("Adr1_AllInOne_Data", data.ResultXML);
						options = null;
						oo = null;

						renderControls(self);
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
	function renderControls(div) {
		try {
		   var self = div;
		   var options = self.options;
			loadForm(options,
						'Component/csAddress3.html',
					  function (msg) {
						  try {
							  var lang = options.language;
							  var theme = options.theme;
							  var res = options.initData;
							  var hh = 23;

							  $Adr3 = $(msg);
							  self.$activeElement.append($Adr3);
							  self.$activeElement.width(options.width);
							  $Adr3 = self.$activeElement.find('div[data-csAdr3="csAdr3Main"]');

							  //新地址格式要補做 縣市/區村鄉
							  oo = $Adr3.find('label[data-csAdr3="lblAddress"]').jqxInput({ theme: theme });
							  oo.css('border', 'none');
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });


							  var data;
							  if (self.options.filterAreaCode == false) {
								  data = res.STRT['rows'];
							  } else {
								  data = getRowByKeyValue(self.options.initData.STRT['rows'], 'EXTRAAREAFLAG', 1, true);
							  }
							  oo = $Adr3.find('div[data-csAdr3="cslStrt"]').csList({
								  theme: theme,
								  //width: '55%',
								  source: data, codeNoWidth: 70, height: hh
							  });
							  options.controls.push({ name: csId(oo), type: 'csList', level: 3 });
							  options.strtId = csId(oo);
							  oo.on('selectedIndexChanged', self, function (args) {
								  address_Validation(args, this);
								  //指定LNFlag值
								  var oo = $('#' + options.strtId).csList('selectedItem');
								  if (oo != null && oo['LNFLAG'] != undefined) {
									  options.LNFlag = oo['LNFLAG'];
								  } else {
									  options.LNFlag = -1;
								  }
							  });

							  oo = $Adr3.find('div[data-csAdr3="chkEXTRAAREAFLAG"]').jqxCheckBox({ theme: theme, checked: self.options.filterAreaCode, disabled: !self.options.edableFilterAreaCode  });
							  options.controls.push({ name: oo[0]['id'], type: 'jqxCheckBox', level: 3 });
							  oo.on('change', self, function (e) {
								  if (e.args.checked == false) {
									  $Adr3.find('div[data-csAdr3="cslStrt"]').csList('source', e.data.options.initData.STRT['rows']);
									  e.data.options.filterAreaCode = false;
								  } else {
									  $Adr3.find('div[data-csAdr3="cslStrt"]').csList('source', getRowByKeyValue(e.data.options.initData.STRT['rows'], 'EXTRAAREAFLAG', 1, true));
									  e.data.options.filterAreaCode = true;
								  }
							  });

							  oo = $Adr3.find('input[data-csAdr3="txtORD"]').jqxInput({ theme: theme, height: hh, maxLength: 6 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('keyup change', self, address_Validation);

							  oo = $Adr3.find('input[data-csAdr3="txtLin"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('keyup change', self, address_Validation);

							  oo = $Adr3.find('input[data-csAdr3="txtSection"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('keyup change', self, address_Validation);

							  oo = $Adr3.find('div[data-csAdr3="cmbLane"]').jqxComboBox({
								  theme: theme,
								  height: hh,
								  source: res.LANE['rows'],
								  displayMember: "DESCRIPTION", valueMember: "DESCRIPTION"
							  });
							  oo.jqxComboBox('width', oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxComboBox', level: 3 });
							  oo.on('keyup change', self, address_Validation);
							  options.cmbLaneId = oo[0]['id'];
							  //請比照WIN版，地址元件巷、弄、衖三個欄位，key入的中文字必須存在CD023
							  //(1 = 巷, 2 = 弄, 3 = 衖), 但Key但Key阿拉伯數字則不受限,
							  oo.on('focusout', function (event) {
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
										  }
									  }
								  } else {
									  //change
								  }
							  });

							  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
							  oo = $Adr3.find('div[data-csAdr3="cmbAlley"]').jqxComboBox({
								  theme: theme,
								  height: hh,
								  source: res.ALLEY['rows'],
								  displayMember: "DESCRIPTION", valueMember: "DESCRIPTION"
							  });
							  oo.jqxComboBox('width', oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxComboBox', level: 3 });
							  oo.on('keyup change', self, address_Validation);
							  options.cmbAlleyId = oo[0]['id'];
							  oo.on('focusout', function (event) {
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
										  }
									  }
								  } else {
									  //change
								  }
							  });

							  oo = $Adr3.find('div[data-csAdr3="cmbAlley2"]').jqxComboBox({
								  theme: theme,
								  height: hh,
								  source: res.ALLEY2['rows'],
								  displayMember: "DESCRIPTION", valueMember: "DESCRIPTION"
							  });
							  oo.jqxComboBox('width', oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxComboBox', level: 3 });
							  oo.on('keyup change', self, address_Validation);
							  options.cmbAlley2Id = oo[0]['id'];
							  oo.on('focusout', function (event) {
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
										  }
									  }
								  } else {
									  //change
								  }
							  });

							  oo = $Adr3.find('input[data-csAdr3="txtNo1A"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('keyup change', self, address_Validation);

							  oo = $Adr3.find('input[data-csAdr3="txtNo2A"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('keyup change', self, address_Validation);

							  oo = $Adr3.find('input[data-csAdr3="txtNo1B"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('keyup change', self, address_Validation);

							  oo = $Adr3.find('input[data-csAdr3="txtNo2B"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('keyup change', self, address_Validation);

							  oo = $Adr3.find('input[data-csAdr3="txtFlourA"]').jqxInput({ theme: theme, height: hh, maxLength: 3, disabled: true });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('keyup change', self, address_Validation);

							  oo = $Adr3.find('input[data-csAdr3="txtFlourB"]').jqxInput({ theme: theme, height: hh, maxLength: 3, disabled: true });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('keyup change', self, address_Validation);

							  var ary = [lang.EVEN1, lang.EVEN2, lang.EVEN3];
							  oo = $Adr3.find('div[data-csAdr3="cmbNoe"]').jqxComboBox({
								  theme: theme,
								  height: hh,
								  source: ary,
								  displayMember: "DESCRIPTION", valueMember: "DESCRIPTION"
							  });
							  oo.jqxComboBox('width', oo.parent().width());
							  oo.jqxComboBox('selectIndex', 0);
							  options.controls.push({ name: oo[0]['id'], type: 'jqxComboBox', level: 3 });
							  oo.on('keyup change', self, address_Validation);

							  oo = $Adr3.jqxPanel({ theme: theme, height: 116 });
							  options.controls.push({ name: oo[0]['id'], type: 'jqxPanel', level: 1 });

							  oo = $Adr3.find('div[data-csAdr3="btnClear"]');
							  oo.on('click', self, resetData);

							  formResize(self);

							  changeLanguage(self);

							  // 自定義事件回呼
							  self.$activeElement.trigger('loadCompleted');

							  //options = null;
							  theme = null;
							  res = null;
							  hh = null;
						  }
						  catch (err) {
							  errorHandle(formName, 'renderControls', err);
						  }
					  });

		
		}
		catch (err) {
			errorHandle(formName, 'renderControls', err);
		}
	}
	function changeLanguage(self) {
		try {
			var lang = self.options.language;
			self.$activeElement.find('label[data-csAdr1="lblAddressTitle"]').text(lang.lblAddressTitle);
			self.$activeElement.find('label[data-csAdr1="lblStrt"]').text(lang.lblStrt);
			self.$activeElement.find('label[data-csAdr1="lblORD"]').text(lang.lblORD);
			self.$activeElement.find('label[data-csAdr1="lblLin"]').text(lang.lblLin);
			self.$activeElement.find('label[data-csAdr1="lblSection"]').text(lang.lblSection);
			self.$activeElement.find('label[data-csAdr1="lblLane"]').text(lang.lblLane);

			self.$activeElement.find('label[data-csAdr1="lblAlley"]').text(lang.lblAlley);
			self.$activeElement.find('label[data-csAdr1="lblAlley2"]').text(lang.lblAlley2);
			self.$activeElement.find('label[data-csAdr1="lblNo1A"]').text(lang.lblNo1A);
			self.$activeElement.find('label[data-csAdr1="lblNo2A"]').text(lang.lblNo2A);
			self.$activeElement.find('label[data-csAdr1="lblFlour"]').text(lang.lblFlour);
			self.$activeElement.find('label[data-csAdr1="lblNoe"]').text(lang.lblNoe);
			lang = null;
		} catch (err) {
			errorHandle(formName, 'changeLanguage', err);
		}
	}

	function csId(e) {
		//return $('#' + e[0]['id']).next();
		return e.children(0)[0]['id'];
	}
	function address_Validation(args, para) {
		try {
			var self = args.data;
			//處理 號1 和 號2 同步的程序
			//if ($(this).data('csadr3') == 'txtNo1')
			//    self.$activeElement.find('input[data-csAdr3="txtNo4"]').jqxInput('val', $(this).val());
			//if ($(this).data('csadr3') == 'txtNo2')
			//    self.$activeElement.find('input[data-csAdr3="txtNo5"]').jqxInput('val', $(this).val());

			//檢查, 如果No1和No4有值, 便鎖定樓欄位, 不允許輸入
			if (self.$activeElement.find('input[data-csAdr3="txtNo1A"]').jqxInput('val') != '' &&
				self.$activeElement.find('input[data-csAdr3="txtNo1B"]').jqxInput('val') != '') {
				//號至號一樣就可以KEY
				if (self.$activeElement.find('input[data-csAdr3="txtNo1A"]').jqxInput('val') != self.$activeElement.find('input[data-csAdr3="txtNo1B"]').jqxInput('val') ||
					self.$activeElement.find('input[data-csAdr3="txtNo2A"]').jqxInput('val') != self.$activeElement.find('input[data-csAdr3="txtNo2B"]').jqxInput('val')
					) {
					self.$activeElement.find('input[data-csAdr3="txtFlourA"]').jqxInput({ disabled: true });
					self.$activeElement.find('input[data-csAdr3="txtFlourB"]').jqxInput({ disabled: true });
				} else {
					self.$activeElement.find('input[data-csAdr3="txtFlourA"]').jqxInput({ disabled: false });
					self.$activeElement.find('input[data-csAdr3="txtFlourB"]').jqxInput({ disabled: false });
				}
			} else {
				self.$activeElement.find('input[data-csAdr3="txtFlourA"]').jqxInput({ disabled: false });
				self.$activeElement.find('input[data-csAdr3="txtFlourB"]').jqxInput({ disabled: false });
			}

			//排序字串
			var uiSO014 = getAddrString(self);
			_getOrderString1(self);
			_getOrderString2(self);

			if (para == undefined || para == null) {
				//回Server取組好的排序字串
				getAddrMap(self, '', function (event) {
				});
			}

			return true;
		} catch (err) {
			errorHandle(formName, 'address_Validation ', err);
		}

		return false;
	} //end address_Validation
	function getFormData(self, data) {
		try {
			var $csAdr3 = self.$activeElement;
			var ooo = {};
			var oo;

			oo = $csAdr3.find('label[data-csAdr3="lblAddress"]').val();
			if (oo !== '')
				ooo.address = o;
			else
				ooo.address = '';

			oo = $csAdr3.find('div[data-csAdr3="cslStrt"]').csList('selectedItem');
			if (oo !== undefined && oo !== null) {
				ooo.StrtCode = o[0];
				ooo.StrtName = o[1];
			}
			else {
				ooo.StrtCode = '';
				ooo.StrtName = '';
			}
			return ooo;
		} catch (err) {
			errorHandle(formName, 'getFormData ', err);
		}

		return null;
	} //end getFormData
	function resetData(params) {
		_clearDisplayValue(params.data);
	}
	function _clearDisplayValue(self) {
		try {
			self.$activeElement.find('input').each(function (index) {
				$(this).val('');
			});

			if (self.options.SO014 !== undefined)
				self.options.SO014.Address = '';
			self.$activeElement.find('label[data-csAdr3="lblAddress"]').text('');
		} catch (err) {
			errorHandle(formName, 'resetData', err);
		}
	}

	function getAddrString(self) {
		var options = self.options;
		var lang = options.language;
		var $csAdr3 = self.$activeElement;
		var addrStr = '', tmpStr = '', tmpStr2 = '';
		var oo;
		var SO014 = { VersionMode: options.orthodox, CityCode: '', CityName: '', AreaCode: '', AreaName: '' };

		try {
			if (options.orthodox === 1) {
				oo = $csAdr3.find('div[data-csAdr3="cslCity"]');
				tmpstr = oo.csList('description');
				SO014.CityCode = '';
				SO014.CityName = '';
				if (tmpstr !== '') {
					addrStr += tmpstr;
					SO014.CityCode = oo.csList('codeNo');
					SO014.CityName = tmpstr;
				}

				oo = $csAdr3.find('div[data-csAdr3="cslArea"]');
				tmpstr = oo.csList('description');
				SO014.AreaCode = '';
				if (tmpstr !== '') {
					addrStr += tmpstr;
					SO014.AreaCode = oo.csList('codeNo');
					//SO014.AreaName = tmpstr;
				}

				oo = $csAdr3.find('div[data-csAdr3="cslStrt"]');
				tmpstr = oo.csList('description');
				SO014.StrtCode = '';
				if (tmpstr !== '') {
					addrStr += tmpstr;
					SO014.StrtCode = oo.csList('codeNo').toString();
					SO014.StrtName = tmpstr;
				}
			}
			else {
				oo = $csAdr3.find('div[data-csAdr3="cslStrt"]');
				tmpstr = oo.csList('description');
				SO014.StrtCode = '';
				if (tmpstr !== '') {
					addrStr += tmpstr;
					SO014.StrtCode = oo.csList('codeNo').toString();
					SO014.StrtName = tmpstr;
				}
			}

			tmpstr = $csAdr3.find('input[data-csAdr3="txtORD"]').jqxInput('val');
			SO014.Ord = tmpstr;
			//if (tmpstr !== '') {
			//	addrStr += tmpstr + lang.lblLin; //'鄰'
			//}

			tmpstr = $csAdr3.find('input[data-csAdr3="txtLin"]').jqxInput('val');
			SO014.Lin = tmpstr;
			if (tmpstr !== '') {
				addrStr += tmpstr + lang.lblLin; //'鄰'
			}

			tmpstr = $csAdr3.find('input[data-csAdr3="txtSection"]').jqxInput('val');
			SO014.Section = tmpstr;
			if (tmpstr !== '') {
				addrStr += tmpstr + lang.lblSection; //'段'
			}

			tmpstr = $csAdr3.find('div[data-csAdr3="cmbLane"]').find('input').val(); //jqxComboBox('val');
			SO014.Lane = tmpstr;
			if ($.isNumeric(tmpstr.replace('-', '')) === true) {
				if (tmpstr !== '') {
					addrStr += tmpstr + lang.lblLane; //'巷'
				}
			} else {
				if (tmpstr !== '') {
					addrStr += tmpstr;
				}
			}

			tmpstr = $csAdr3.find('div[data-csAdr3="cmbAlley"]').find('input').val(); //jqxComboBox('val');
			SO014.Alley = tmpstr;
			if ($.isNumeric(tmpstr.replace('-', '')) === true) {
				if (tmpstr !== '') {
					addrStr += tmpstr + lang.lblAlley; //'弄'
				}
			} else {
				if (tmpstr !== '') {
					addrStr += tmpstr;
				}
			}

			tmpstr = $csAdr3.find('div[data-csAdr3="cmbAlley2"]').find('input').val(); //jqxComboBox('val');
			SO014.Alley2 = tmpstr;
			if ($.isNumeric(tmpstr.replace('-', '')) === true) {
				if (tmpstr !== '') {
					addrStr += tmpstr + lang.lblAlley2; //'衖'
				}
			} else {
				if (tmpstr !== '') {
					addrStr += tmpstr;
				}
			}

			tmpstr = $csAdr3.find('input[data-csAdr3="txtNo1A"]').jqxInput('val');
			SO014.No1A = '';
			SO014.No2A = '';
			if (tmpstr !== '') {
				tmpstr2 = $csAdr3.find('input[data-csAdr3="txtNo2A"]').jqxInput('val');
				if (tmpstr2 !== '') {
					addrStr += tmpstr + '-' + tmpstr2 + lang.lblNo1A; //'號'
					SO014.No1A = tmpstr;
					SO014.No2A = tmpstr2;
				} else {
					addrStr += tmpstr + lang.lblNo1A; //'號'
					SO014.No1A = tmpstr;
				}
			}
			options.address1 = addrStr;


			tmpstr = $csAdr3.find('input[data-csAdr3="txtNo1B"]').jqxInput('val');
			SO014.No1B = '';
			SO014.No2B = '';
			if (tmpstr !== '') {
				tmpstr2 = $csAdr3.find('input[data-csAdr3="txtNo2B"]').jqxInput('val');
				if (tmpstr2 !== '') {
					addrStr += lang.lblNo2A + tmpstr + '-' + tmpstr2 + lang.lblNo1A; // '至' '號'
					SO014.No1B = tmpstr;
					SO014.No2B = tmpstr2;
				} else {
					addrStr += lang.lblNo2A + tmpstr + lang.lblNo1A;  // '至' '號'
					SO014.No1B = tmpstr;
					SO014.No2B = '';
				}
			}

			tmpstr = $csAdr3.find('input[data-csAdr3="txtFlourA"]').jqxInput('val');
			SO014.FlourA = tmpstr;
			if (tmpstr !== '') {
				addrStr += tmpstr + lang.lblFlour; //'樓A'
				options.address1 += tmpstr + lang.lblFlour;
			}

			tmpstr = $csAdr3.find('input[data-csAdr3="txtFlourB"]').jqxInput('val');
			SO014.FlourB = tmpstr;
			if (tmpstr !== '') {
				addrStr += lang.lblNo2A + tmpstr + lang.lblFlour; //'樓B'
			}

			tmpstr = $csAdr3.find('div[data-csAdr3="cmbNoe"]').jqxComboBox('getSelectedIndex').toString();
			SO014.Noe = '';
			if (tmpstr !== '') {
				if (tmpstr === '1') {
					addrStr += lang.EVEN21; //'(單)'
					SO014.Noe = tmpstr;
				} else if (tmpstr === '2') {
					addrStr += lang.EVEN31; //'(雙)'
					SO014.Noe = tmpstr;
				} else {
					SO014.Noe = '0';
				}
			}

			$csAdr3.find('label[data-csAdr3="lblAddress"]').text(addrStr);
			SO014.Address = addrStr;

			options.SO014 = SO014;
			options.address = addrStr;
		} catch (err) {
			errorHandle(formName, 'getAddrString ', err);
		}

		options = null;
		$csAdr3 = null;
		tmpStr = null;
		tmpStr2 = null;
		oo = null;
		addrStr = null;

		return SO014;
	}
	function getAddrMap(self, AddrMapType, action) {
		try {
			var options = self.options;
			if (options['SO014']['StrtCode'] == '') //|| options['SO014']['No1'] == '' || options['SO014']['No4'] == ''
				return;

			var paraLoginInfo = getParaLoginInfo(self.$activeElement[0], formName);
			var parameters = $.extend({}, paraLoginInfo, {
				inData: { type: 'string', value: JSON.stringify(options.SO014) },
				AddrMapType: { type: 'string', value: AddrMapType}
			});
			var params = getParameters(riadllName,
				riaClassName,
				'getAddrMap_HTML',
				JSON.stringify(parameters));
			getServerData(params, {
				success: function (data) {
					if (data != undefined && data.ErrorCode == 0) {
						options.addrSortData = JSON.parse(data.ResultXML);
						if (options.SO014 != undefined) {
							options.SO014['AddrFlagA'] = options.addrSortData['Table1'].rows[0]['AddrFlagA'];
							options.SO014['AddrFlagB'] = options.addrSortData['Table1'].rows[0]['AddrFlagB'];
						}
						action([true, '']);
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
			},120,false);
		} catch (err) {
			errorHandle(formName, 'getAddrMap', err);
		}
	}
	function _ScrToRcd(self, action) {
		try {
			var options = self.options;
			var paraLoginInfo = getParaLoginInfo(self.$activeElement[0], formName);
			var parameters = $.extend({}, paraLoginInfo, {
				TableName: { type: 'string', value: 'SO023' },
				AddrSortA: { type: 'string', value: options['addrSortData']['Table1'].rows[0]['AddrSortA'] },
				CompCode: { type: 'integer', value: options.loginInfo.loginInfo.rows[0]['compcode'] }
			});
			var params = getParameters(riadllName,
				riaClassName,
				'QuerySF_GetAddrMap',
				JSON.stringify(parameters));
			getServerData(params, {
				success: function (data) {
					if (data != undefined) {
						action([true, data]);
					}
					else {
						if (typeof data === 'string') {
							messageBox(data, messageType.critical);
						} else {
							messageBox(data.ErrorMessage, messageType.critical);
						}
						action([false, null]);
					}
					options = null;
					params = null;
				}
			}, 120, false);
		} catch (err) {
			errorHandle(formName, 'ScrToRcd', err);
		}
	}
	
	//取串好之排序起始字串
	function _getOrderString1(self) {
		try {
			var options = self.options;
			var lang = options.language;
			var SO014 = options.SO014;
			var orderStr1 = '';
			var flag = 0;

			if (SO014 === undefined || SO014.Address === undefined || SO014.Address === '') {
				return '';
			}

			orderStr1 = getPreFix(self);
			orderStr1 += SO014.Lin.spaceLeft2(4, ' ').right2(4) + SO014.Section.spaceLeft2(4, ' ').right2(4);

			if (SO014.Lane !== '') {
				orderStr1 += newOrderString(SO014.Lane, true);
				flag = flag + 8;
			}

			if (SO014.Alley !== '') {
				orderStr1 += newOrderString(SO014.Alley, false);
				flag = flag + 4;
			}

			if (SO014.Alley2 !== '') {
				orderStr1 += newOrderString(SO014.Alley2, false);
				flag = flag + 2;
			}

			if (SO014.No1A !== '') {
				orderStr1 += SO014.No1A.spaceLeft2(4, ' ').right2(4) + SO014.No2A.spaceLeft2(4, ' ').right2(4);
				flag = flag + 1;
			}

			//最後調整
			if (options.orthodox === 1) {
				orderStr1 = orderStr1.spaceRight2(88, ' ').leftB2(88);
			} else {
				orderStr1 = orderStr1.spaceRight2(82, ' ').leftB2(82);
			}
			//依公式調整AddrFlag
			orderStr1 += adjFlag(flag);
			orderStr1 += SO014.FlourA.spaceLeft2(3, ' ').right2(3);

			if (options.orthodox === 1) {
				if (SO014.CityName.right2(1) !== lang.CITY) { //'市'
					orderStr1 = orderStr1.left2(3) + SO014.AreaCode.spaceRight2(3, ' ').left2(3) + orderStr1.substring(7);
				}
			}

			if (SO014.StrtCode === '') {
				orderStr1 = '';
			}
			options.orderStr1 = orderStr1.spaceRight2(50, ' ').left2(110);

			return orderStr1;
		} catch (err) {
			errorHandle(formName, '_getOrderString1', err);
		}
	}
	//取串好之排序截止字串
	function _getOrderString2(self) {
		try {
			var options = self.options;
			var lang = options.language;
			var SO014 = options.SO014;
			var orderStr2 = '';
			var flag = 0;

			if (SO014 === undefined || SO014.Address === undefined || SO014.Address === '' || SO014.No2A === '' || SO014.No2B === '') {
				return '';
			}

			//若樓1、樓2皆有值，則串上樓2後就回傳
			if (SO014.FlourA !== '' && SO014.FlourB !== '') {
				if (options.orthodox === 1) {
					orderStr2 = options.orderStr1.spaceRight2(89, ' ').leftB2(89);
				} else {
					orderStr2 = options.orderStr1.spaceRight2(83, ' ').leftB2(83);
				}
				return orderStr2
			}

			//開始組合字串
			//若鄰、段、號1、號2、至號1、至號2皆無值
			orderStr2 = getPreFix(self);
			if (SO014.Lane === '' && SO014.Section === '' && SO014.No1A === '' && SO014.No2A === '' && SO014.No1B === '' && SO014.No2B === '') {
				orderStr2 += '9999';
			} else if (SO014.Lane !== '' && SO014.Section === '') {
				//若鄰有值，但段無值
				orderStr2 += SO014.Lin.spaceLeft2(4, ' ').right2(4)
				orderStr2 += '9999';
			} else {
				//其他
				orderStr2 += SO014.Lin.spaceLeft2(4, ' ').right2(4) + SO014.Section.spaceLeft2(4, ' ').right2(4);
			}
			//組合巷的排序字串
			if (SO014.Lane !== '') {
				orderStr2 += newOrderString(SO014.Lane, true);
				flag = flag + 8;
			}
			//組合弄的排序字串
			if (SO014.Alley !== '') {
				orderStr2 += newOrderString(SO014.Alley, false);
				flag = flag + 4;
			}
			//組合衖的排序字串
			if (SO014.Alley2 !== '') {
				orderStr2 += newOrderString(SO014.Alley2, false);
				flag = flag + 2;
			}
			//組合號的排序字串
			if (SO014.No1A === '' && SO014.No2A === '') {
				//若[號1]及[至號1]皆無值
				orderStr2 += '99999999';
				flag = flag + 1;
			} else {
				//其他〈僅[至號1]有值〉
				if (SO014.No2A !== '') {
					//若[至號2]有值
					if (SO014.No2B !== '') {
						orderStr2 += SO014.No1B.spaceLeft2(4, ' ').right2(4) + SO014.No2B.spaceLeft2(4, ' ').right2(4);
					} else {
						orderStr2 += SO014.No1B.spaceLeft2(4, ' ').right2(4) + '9999';
					}
				}
				flag = flag + 1;
			}
			//最後調整
			if (options.orthodox === 1) {
				orderStr2 = orderStr2.spaceRight2(88, ' ').leftB2(88);
			} else {
				orderStr2 = orderStr2.spaceRight2(82, ' ').leftB2(82);
			}
			//將字串串上AddrFlag，但不記錄在AddrFlag裡面
			//依公式調整AddrFlag
			orderStr2 += adjFlag(flag);
			//原本 83 碼 (含 AddrFlag) 現行因對應到樓，放寬至 86 碼
			//若[樓2]無值
			if (SO014.FlourB === '') {
				orderStr2 += '999';
			} else {
				//若[樓2]有值
				orderStr2 += SO014.FlourB.spaceLeft2(3, ' ').right2(3);
			}
			options.orderStr2 = orderStr2;

			return orderStr2;
		} catch (err) {
			errorHandle(formName, '_getOrderString2', err);
		}
	}
	function adjFlag(oldValue) {
		var rtnValue = 0;

		switch (oldValue) {
			case 0:
			case 12:
			case 14:
			case 15:
				rtnValue = 8;
				break;
			case 1:
			case 2:
			case 8:
				rtnValue = oldValue;
				break;
			case 3:
				rtnValue = 2;
				break;
			case 4:
			case 5:
				rtnValue = 3;
				break;
			case 6:
			case 7:
				rtnValue = 4;
				break;
			case 9:
				rtnValue = 5;
				break;
			case 10:
			case 11:
				rtnValue = 6;
				break;
			case 13:
				rtnValue = 7;
				break;
		}
		return rtnValue;
	}
	function getPreFix(self) {
		try {
			var options = self.options;
			var SO014 = options.SO014;
			var rtnValue = '';

			if (options.orthodox === 1) {
				rtnValue = SO014.CityCode.spaceLeft2(3, ' ').right2(3);
				if (SO014.CityName.right2(1) === lang.CITY) { //'市'
					rtnValue = rtnValue.spaceRight2(3, ' ');
				} else {
					rtnValue = rtnValue + SO014.StrtCode.spaceRight2(3, ' ').left2(3);
				}
				rtnValue += SO014.StrtCode.spaceLeft2(6, ' ').right2(6);
			} else {
				rtnValue = SO014.StrtCode.spaceLeft2(6, ' ').right2(6);
			}
			options = null;
			SO014 = null;

			return rtnValue;
		} catch (err) {
			errorHandle(formName, 'getPreFix ', err);
		}
	}
	function space(length) {
		var str = '';
		for (i = 0; i <= length; i++) {
			i++;
			str += ' ';
		}
		return str;
	}
	function patchSpace(originalStr, patchSpaceSide, sLength) {
		try {
			var oriStrLen = 0;
			var rtnValue = '';

			oriStrLen = originalStr.BLength();
			if (patchSpaceSide === 1) {
				rtnValue = originalStr.spaceLeft2(sLength, ' ');
				rtnValue = originalStr.spaceLeft2(sLength - oriStrLen, ' ');
			} else {
				rtnValue = originalStr.spaceRight2(sLength - oriStrLen, ' ');
			}
		} catch (err) {
			errorHandle(formName, 'patchSpace', err);
		}
		return rtnValue;
	}
	function newOrderString(strSource, blnIsLane) {
		try {
			var rtnValue = '';

			if (strSource.length === 0) {
				rtnValue = rtnValue.spaceLeft2(10, ' ');
			}

			if ($.isNumeric(strSource) === true) {
				if (strSource.length <= 4) {
					if (blnIsLane === true) {
						rtnValue = strSource.spaceLeft2(4, ' ').right2(4).spaceRight2(36, ' ');
					} else {
						rtnValue = strSource.spaceLeft2(4, ' ').right2(4).spaceRight2(6, ' ');
					}
					return rtnValue;
				} else {
					if (blnIsLane === true) {
						rtnValue = strSource.spaceLeft2(40, ' ').right2(40);
					} else {
						rtnValue = strSource.spaceLeft2(10, ' ').right2(10);
					}
					return rtnValue;
				}
			}


			var retval = strSource.indexOf('-', 0);
			if (retval > 0) {
				rtnValue = strSource.left2(retval - 1).spaceLeft2(4, ' ').rightB2(4) + '-' +
					strSource.mid(retval + 1).trim().spaceLeft2(5, ' ').rightB2(5);
				if (blnIsLane === true) {
					rtnValue = rtnValue.spaceRight2(30, ' ');
				}
				return rtnValue;
			} else {
				if (blnIsLane === true) {
					rtnValue = strSource.spaceRight2(40, ' ').leftB2(40);
				} else {
					rtnValue = strSource.spaceRight2(10, ' ').leftB2(10);
				}
			}

			return rtnValue;
		} catch (err) {
			errorHandle(formName, 'newOrderString', err);
		}
	}

	String.prototype.BLength = function () {
		var arr = this.match(/[^\x00-\xff]/ig);
		return arr === null ? this.length : this.length + arr.length;
	};
	String.prototype.padLeft2 = function (len, sign) {
		var tlen = this.BLength();
		var result = this;
		for (var i = 0; i <= len; i++)
			result = sign + result;
		return result;
	};
	String.prototype.padRight2 = function (len, sign) {
		var tlen = this.BLength();
		var result = this;
		for (var i = 0; i <= len - tlen; i++)
			result = result + sign;
		return result;
	};
	String.prototype.left2 = function (len) {
		return this.substring(0, len);
	};
	String.prototype.right2 = function (len) {
		return this.substring(this.length - len, this.length);
	};
	String.prototype.leftB2 = function (len) {
		if (!/\d+/.test(len)) return this;
		var str = this.substr(0, len);
		//if (!mode) return str;

		//依中文字位置來計算補正後的截取之座標
		var n = 0;
		for (i = 0; i < len; i++) {
			if (str.charCodeAt(i) > 225) {
				n += 2;
			}
			if (n >= len) {
				len = n / 2;
				break;
			}
		}
		if (n <= len) {
			len = n / 2 + (len - n);
		}
		return this.substr(0, len);
	};
	String.prototype.rightB2 = function (len) {
		if (!/\d+/.test(len)) return this;
		var str = this.substr(this.length - len);
		//if (!mode) return str;

		//依中文字位置來計算補正後的截取之座標
		var n = 0;
		for (i = str.length; i >= 0; i--) {
			if (str.charCodeAt(i) > 225) {
				n += 2;
			}
			if (n >= len) {
				len = n / 2;
				break;
			}
		}
		if (n <= len) {
			len = n / 2 + (len - n);
		}
		return this.substr(this.length - len);
	};
	String.prototype.mid2 = function (startnum, len) {
		if (!/\d+/.test(len)) return this;
		return this.substr(startnum, len);
	};
	String.prototype.trim2 = function () {
		var trimmed = this.replace(/^\s+|\s+$/g, '');
		return trimmed;
	};
	String.prototype.ltrim2 = function () {
		var trimmed = this.replace(/^\s+/g, '');
		return trimmed;
	};
	String.prototype.rtrim2 = function () {
		var trimmed = this.replace(/\s+$/g, '');
		return trimmed;
	};
	String.prototype.spaceLeft2 = function space(length) {
		var str = '';
		for (i = 0; i < length; i++) {
			str += ' ';
		}
		return str + this;
	};
	String.prototype.spaceRight2 = function space(length) {
		var str = '';
		for (i = 0; i < length; i++) {
			str += ' ';
		}
		return this + str;
	};


})(jQuery, window);