(function ($, window, undefined) {
	 var formName = 'csAddress2';
	 var riadllName = 'Cablesoft.RIA.Utility.GiAddress.Web.dll';
	 var riaClassName = 'Cablesoft.RIA.Utility.GiAddress.Web.dsGiAddress2';

	 $.fn.csAddress2 = function (options, param, param2) {
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
								options: $.extend({}, new defaults(), new csAddress2(), options)
						  });
						  init(this);
					 }
					 state = null;
				});
		  }
		  catch (err) {
				errorHandle(formName, '$.fn.csAddress2', err);
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
		  getAddressString: function (div, params) {
				return getSelf(div).options.Address;
		  },
		  getQryString: function (div, params) {
				return _getQryString(getSelf(div));
		  },
		  getOrderString1: function (div, params) {
				return _getOrderString1(getSelf(div));
		  },
		  getOrderString2: function (div, params) {
				return _getOrderString2(getSelf(div));
		  },
		  focus: function (div) {
				return _focus(getSelf(div));
		  },
		  getAddrInfo: function (div) {
				return _getAddrInfo(div);
		  },
		  isDataOK: function (div,params) {
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
		  this.tableName = 'E';
		  this.AndStrtCode = false;
		  this.isProcess = false;
		  this.width = 800;
		  this.orderStr1;
		  this.Address = '';
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
								oo.jqxPanel('width', self.$activeElement.width() - 12);
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

	 function init(div) {
		  try {
				var self = $.data(div, formName);
				self.$activeElement = $(div);
				getAddrType(self);
				self = null;
		  }
		  catch (err) {
				errorHandle(formName, 'init', err);
		  }
	 }
	 function getAddrType(self) {
		  try {
				var options = self.options;
				//var paraLoginInfo = $.extend({}, { loginInfo: { type: 'logininfo', value: options.loginInfo.loginInfo } });
				var paraLoginInfo = getParaLoginInfo(self.$activeElement[0], formName);
				var parameters = $.extend({}, paraLoginInfo, {
					 OwnerName: { type: 'string', value: '' },
					 CompyCode: { type: 'Integer', value: options.loginInfo.loginInfo.rows[0].compcode }
				});
				var params = getParameters(riadllName,
				 riaClassName,
				 'QueryAddrType',
				 JSON.stringify(parameters));
				getServerData(params, {
					 success: function (data) {
						  if (data != undefined && data.ErrorCode == 0) {
								var oo = JSON.parse(data.ResultXML);
								if (oo !== undefined && oo['SO041'] !== undefined && oo['SO041']['rows'] !== undefined && oo['SO041']['rows'].length > 0) {
									 options.orthodox = oo['SO041']['rows'][0]['ADDRTYPE'];
									 options.initData2 = oo;
								} else {
									 options.orthodox = '';
									 options.initData2 = null;
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
					  'Component/csAddress2.html',
					  function (msg) {
						  try {
							  var lang = options.language;
							  var theme = options.theme;
							  var res = options.initData2;
							  var hh = 23;

							  $Adr2 = $(msg);
							  self.$activeElement.append($Adr2);
							  self.$activeElement.width(options.width);
							  $Adr2 = self.$activeElement.find('div[data-csAdr2="csAdr2Main"]');
							  //oo = $Adr2.jqxPanel({ theme: theme, width: options.width, height:200 });
							  //options.controls.push({ name: oo[0]['id'], type: 'jqxPanel', level: 1 });
							  //oo.on('resize', self, function () {
							  //   var _self = arguments[0].data;
							  //   try {
							  //      if (_self === undefined || _self.length === 0) {
							  //         return false;
							  //      }
							  //      formResize(_self);
							  //      //$(this).csList('resize');
							  //   } catch (err) {
							  //      errorHandle(formName, 'csList_on_resize', err);
							  //   }
							  //});
							  //$(window).on('resize', oo, function () {
							  //   var _oo = arguments[0].data;
							  //   try {
							  //      if (_oo === undefined || _oo.length === 0) {
							  //         return false;
							  //      }
							  //      _oo.width(_oo.width() + 1);
							  //   } catch (err) {
							  //      errorHandle(formName, 'csList_on_resize', err);
							  //   }
							  //});


							  //新地址格式要補做 縣市/區村鄉
							  oo = $Adr2.find('label[data-csAdr2="lblAddress"]').jqxInput({ theme: theme });
							  oo.css('border', 'none');
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });

							  var data;
							  if (self.options.filterAreaCode == false) {
								  data = res.STRT['rows'];
							  } else {
								  data = getRowByKeyValue(self.options.initData2.STRT['rows'], 'EXTRAAREAFLAG', 1, true);
							  }
							  oo = $Adr2.find('div[data-csAdr2="cslStrt"]').csList({
								  theme: theme,
								  //width: '55%',
								  source: data, codeNoWidth: 70, height: hh - 2
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

							  oo = $Adr2.find('div[data-csAdr2="chkEXTRAAREAFLAG"]').jqxCheckBox({ theme: theme, checked: self.options.filterAreaCode, disabled: !self.options.edableFilterAreaCode });
							  options.controls.push({ name: oo[0]['id'], type: 'jqxCheckBox', level: 3 });
							  oo.on('change', self, function (e) {
								  if (e.args.checked == false) {
									  $Adr2.find('div[data-csAdr2="cslStrt"]').csList('source', e.data.options.initData2.STRT['rows']);
									  e.data.options.filterAreaCode = false;
								  } else {
									  $Adr2.find('div[data-csAdr2="cslStrt"]').csList('source', getRowByKeyValue(e.data.options.initData2.STRT['rows'], 'EXTRAAREAFLAG', 1, true));
									  e.data.options.filterAreaCode = true;
								  }
							  });

							  oo = $Adr2.find('input[data-csAdr2="txtLin"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('change', self, address_Validation);
							  //oo.on('resize', self, function () {
							  //   var _self = arguments[0].data;
							  //   try {
							  //      if (_self === undefined || _self.length === 0) {
							  //         return false;
							  //      }

							  //      formResize(_self);
							  //   } catch (err) {
							  //      errorHandle(formName, 'cmbLane_on_resize', err);
							  //   }
							  //});

							  oo = $Adr2.find('input[data-csAdr2="txtSection"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('change', self, address_Validation);

							  oo = $Adr2.find('div[data-csAdr2="cmbLane"]').jqxComboBox({
								  theme: theme,
								  height: hh,
								  source: res.LANE['rows'],
								  displayMember: "DESCRIPTION", valueMember: "DESCRIPTION"
							  });
							  oo.jqxComboBox('width', oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxComboBox', level: 3 });
							  oo.on('change', self, address_Validation);
							  options.cmbLaneId = oo[0]['id'];
							  //請比照WIN版，地址元件巷、弄、衖三個欄位，key入的中文字必須存在CD023
							  //(1 = 巷, 2 = 弄, 3 = 衖), 但Key但Key阿拉伯數字則不受限,
							  oo.on('focusout', function (event) { //
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

							  oo = $Adr2.find('div[data-csAdr2="chkDoor"]').jqxCheckBox({ theme: theme, checked: false });
							  //oo.jqxCheckBox('width', oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxCheckBox', level: 3 });
							  oo.on('change', self, address_Validation);


							  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
							  oo = $Adr2.find('div[data-csAdr2="cmbAlley"]').jqxComboBox({
								  theme: theme,
								  height: hh,
								  source: res.ALLEY['rows'],
								  displayMember: "DESCRIPTION", valueMember: "DESCRIPTION"
							  });
							  oo.jqxComboBox('width', oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxComboBox', level: 3 });
							  options.cmbAlleyId = oo[0]['id'];
							  oo.on('change', self, address_Validation);
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

							  oo = $Adr2.find('div[data-csAdr2="cmbAlley2"]').jqxComboBox({
								  theme: theme,
								  height: hh,
								  source: res.ALLEY2['rows'],
								  displayMember: "DESCRIPTION", valueMember: "DESCRIPTION"
							  });
							  oo.jqxComboBox('width', oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxComboBox', level: 3 });
							  oo.on('change', self, address_Validation);
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

							  oo = $Adr2.find('input[data-csAdr2="txtNo1"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('input', self, address_Validation);

							  oo = $Adr2.find('input[data-csAdr2="txtNo2"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('input', self, address_Validation);

							  oo = $Adr2.find('input[data-csAdr2="txtFlour"]').jqxInput({ theme: theme, height: hh, maxLength: 3 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('input', self, address_Validation);

							  oo = $Adr2.find('input[data-csAdr2="txtNo3"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('input', self, address_Validation);

							  oo = $Adr2.find('input[data-csAdr2="txtRoom"]').jqxInput({ theme: theme, height: hh, maxLength: 20 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('input', self, address_Validation);

							  oo = $Adr2.find('input[data-csAdr2="txtNo4"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('input', self, address_Validation);

							  oo = $Adr2.find('input[data-csAdr2="txtNo5"]').jqxInput({ theme: theme, height: hh, maxLength: 4 });
							  oo.outerWidth(oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxInput', level: 3 });
							  oo.on('input', self, address_Validation);

							  var ary = [lang.EVEN1, lang.EVEN2, lang.EVEN3];
							  oo = $Adr2.find('div[data-csAdr2="cmbEven"]').jqxComboBox({
								  theme: theme,
								  height: hh,
								  source: ary,
								  displayMember: "DESCRIPTION", valueMember: "DESCRIPTION",
								  selectedIndex: 0
							  });
							  oo.jqxComboBox('width', oo.parent().width());
							  options.controls.push({ name: oo[0]['id'], type: 'jqxComboBox', level: 3 });
							  oo.on('change', self, address_Validation);

							  oo = $Adr2.jqxPanel({ theme: theme, height: 100 });
							  options.controls.push({ name: oo[0]['id'], type: 'jqxPanel', level: 1 });

							  oo = $Adr2.find('div[data-csAdr2="btnClear"]');
							  oo.on('click', self, resetData);

							  formResize(self);

							  changeLanguage(self);

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
				self.$activeElement.find('label[data-csAdr1="lblLin"]').text(lang.lblLin);
				self.$activeElement.find('label[data-csAdr1="lblSection"]').text(lang.lblSection);
				self.$activeElement.find('label[data-csAdr1="lblLane"]').text(lang.lblLane);
				self.$activeElement.find('div[data-csAdr1="chkDoor"]').text(lang.chkDoor);

				self.$activeElement.find('label[data-csAdr1="lblAlley"]').text(lang.lblAlley);
				self.$activeElement.find('label[data-csAdr1="lblAlley2"]').text(lang.lblAlley2);
				self.$activeElement.find('label[data-csAdr1="lblNo1"]').text(lang.lblNo1);
				self.$activeElement.find('label[data-csAdr1="lblFlour"]').text(lang.lblFlour);
				self.$activeElement.find('label[data-csAdr1="lblNo3"]').text(lang.lblNo3);
				self.$activeElement.find('label[data-csAdr1="lblRoom"]').text(lang.lblRoom);
				self.$activeElement.find('label[data-csAdr1="lblNo2"]').text(lang.lblNo2);
				self.$activeElement.find('label[data-csAdr1="lblEven"]').text(lang.lblEven);
				lang = null;
		  } catch (err) {
				errorHandle(formName, 'changeLanguage', err);
		  }
	 }

	 function csId(e) {
		  //return $('#' + e[0]['id']).next();
		  return e.children(0)[0]['id'];
	 }
	 function address_Validation(args) {
		  try {
				var self = args.data;
				//處理 號1 和 號2 同步的程序
				if ($(this).data('csadr2') == 'txtNo1')
					 self.$activeElement.find('input[data-csAdr2="txtNo4"]').jqxInput('val', $(this).val());
				if ($(this).data('csadr2') == 'txtNo2')
					 self.$activeElement.find('input[data-csAdr2="txtNo5"]').jqxInput('val', $(this).val());

				//排序字串
				var uiSO014 = getAddrString(self);

				return true;
		  } catch (err) {
				errorHandle(formName, 'address_Validation ', err);
		  }

		  return false;
	 } //end address_Validation
	 function getFormData(self, data) {
		  try {
				var $csAdr2 = self.$activeElement;
				var ooo = {};
				var oo;

				oo = $csAdr2.find('label[data-csAdr2="lblAddress"]').val();
				if (oo !== '')
					 ooo.Address = o;
				else
					 ooo.Address = '';

				oo = $csAdr2.find('div[data-csAdr2="cslStrt"]').csList('selectedItem');
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

				self.options.SO014.Address = '';
				self.$activeElement.find('label[data-csAdr2="lblAddress"]').text('');
		  } catch (err) {
				errorHandle(formName, 'resetData', err);
		  }
	 }

	 function getAddrString(self) {
		  var options = self.options;
		  var lang = options.language;
		  var $csAdr2 = self.$activeElement;
		  var addrStr = '', tmpStr = '', tmpStr2 = '';
		  var oo;
		  var SO014 = { VersionMode: options.orthodox, CityCode: '', CityName: '', AreaCode: '', AreaName: '' };

		  try {
				if (options.orthodox === 1) {
					 oo = $csAdr2.find('div[data-csAdr2="cslCity"]');
					 tmpstr = oo.csList('description');
					 SO014.CityCode = '';
					 SO014.CityName = '';
					 if (tmpstr !== '') {
						  addrStr += tmpstr;
						  SO014.CityCode = oo.csList('codeNo');
						  SO014.CityName = tmpstr;
					 }

					 oo = $csAdr2.find('div[data-csAdr2="cslArea"]');
					 tmpstr = oo.csList('description');
					 SO014.AreaCode = '';
					 if (tmpstr !== '') {
						  addrStr += tmpstr;
						  SO014.AreaCode = oo.csList('codeNo');
						  //SO014.AreaName = tmpstr;
					 }

					 oo = $csAdr2.find('div[data-csAdr2="cslStrt"]');
					 tmpstr = oo.csList('description');
					 SO014.StrtCode = '';
					 if (tmpstr !== '') {
						  addrStr += tmpstr;
						  SO014.StrtCode = oo.csList('codeNo').toString();
						  //SO014.StrtName = tmpstr;
					 }
				}
				else {
					 oo = $csAdr2.find('div[data-csAdr2="cslStrt"]');
					 tmpstr = oo.csList('description');
					 SO014.StrtCode = '';
					 if (tmpstr !== '') {
						  addrStr += tmpstr;
						  SO014.StrtCode = oo.csList('codeNo').toString();
						  //SO014.StrtName = tmpstr;
					 }
				}

				tmpstr = $csAdr2.find('input[data-csAdr2="txtLin"]').jqxInput('val');
				SO014.Lin = tmpstr;
				if (tmpstr !== '') {
					 addrStr += tmpstr + lang.lblLin; //'鄰'
				}

				tmpstr = $csAdr2.find('input[data-csAdr2="txtSection"]').jqxInput('val');
				SO014.Section = tmpstr;
				if (tmpstr !== '') {
					 addrStr += tmpstr + lang.lblSection; //'段'
				}

				tmpstr = $csAdr2.find('div[data-csAdr2="cmbLane"]').find('input').val(); //jqxComboBox('val');
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

				tmpstr = $csAdr2.find('div[data-csAdr2="cmbAlley"]').find('input').val(); //jqxComboBox('val');
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

				tmpstr = $csAdr2.find('div[data-csAdr2="cmbAlley2"]').find('input').val(); //jqxComboBox('val');
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

				tmpstr = $csAdr2.find('input[data-csAdr2="txtNo1"]').jqxInput('val');
				SO014.No1 = '';
				SO014.No2 = '';
				if (tmpstr !== '') {
					 tmpstr2 = $csAdr2.find('input[data-csAdr2="txtNo2"]').jqxInput('val');
					 if (tmpstr2 !== '') {
						  addrStr += tmpstr + '-' + tmpstr2 + lang.lblNo1; //'號'
						  SO014.No1 = tmpstr;
						  SO014.No2 = tmpstr2;
					 } else {
						  addrStr += tmpstr + lang.lblNo1; //'號'
						  SO014.No1 = tmpstr;
					 }
				}

				tmpstr = $csAdr2.find('input[data-csAdr2="txtFlour"]').jqxInput('val');
				SO014.Flour = tmpstr;
				if (tmpstr !== '') {
					 addrStr += tmpstr + lang.lblFlour; //'樓'
				}

				tmpstr = $csAdr2.find('input[data-csAdr2="txtNo3"]').jqxInput('val');
				SO014.No3 = tmpstr;
				if (tmpstr !== '') {
					 addrStr += lang.lblNo3 + tmpstr; //'之'
				}

				tmpstr = $csAdr2.find('input[data-csAdr2="txtRoom"]').jqxInput('val');
				SO014.Room = tmpstr;
				if (tmpstr !== '') {
					 addrStr += tmpstr;
				}

				tmpstr = $csAdr2.find('input[data-csAdr2="txtNo4"]').jqxInput('val');
				SO014.No4 = '';
				SO014.No5 = '';
				if (tmpstr !== '') {
					 tmpstr2 = $csAdr2.find('input[data-csAdr2="txtNo5"]').jqxInput('val');
					 if (tmpstr2 !== '') {
						  addrStr += lang.lblNo2 + tmpstr + '-' + tmpstr2 + lang.lblNo1; // '至' '號'
						  SO014.No4 = tmpstr;
						  SO014.No5 = tmpstr2;
					 } else {
						  addrStr += lang.lblNo2 + tmpstr + lang.lblNo1;  // '至' '號'
						  SO014.No4 = tmpstr;
						  SO014.No5 = '';
					 }
				}

				tmpstr = $csAdr2.find('div[data-csAdr2="cmbEven"]').jqxComboBox('getSelectedIndex').toString();
				SO014.Even = '';
				if (tmpstr !== '') {
					 if (tmpstr === '1') {
						  addrStr += lang.EVEN21; //'(單)'
						  SO014.Even = tmpstr;
					 } else if (tmpstr === '2') {
						  addrStr += lang.EVEN31; //'(雙)'
						  SO014.Even = tmpstr;
					 } else {
						  SO014.Even = '0';
					 }
				}

				tmpstr = $csAdr2.find('div[data-csAdr2="chkDoor"]').val();
				SO014.Door = tmpstr;
				if (tmpstr == true) {
					 addrStr += lang.DOOR; //'(路面)'
				}


				$csAdr2.find('label[data-csAdr2="lblAddress"]').text(addrStr);
				SO014.Address = addrStr;

				options.SO014 = SO014;
				options.Address = addrStr;
		  } catch (err) {
				errorHandle(formName, 'getAddrString ', err);
		  }

		  options = null;
		  $csAdr2 = null;
		  tmpStr = null;
		  tmpStr2 = null;
		  oo = null;
		  addrStr = null;

		  return SO014;
	 }
	 function _getQryString(self) {
		  try {
				var options = self.options;
				var SO014 = options.SO014;
				var tableName = options.tableName;
				var qryStr = '';

				if (SO014 === undefined || SO014.Address === undefined || SO014.Address === '') {
					 return '';
				}

				if (SO014.No1 === '' && SO014.No2 === '' && SO014.No3 === '' && SO014.No4 === '' && SO014.No5 === ''
										&& SO014.Room === '' && SO014.Flour === '') {
					 qryStr = tableName + ".ADDRESS LIKE '" + SO014.Address + "%'";
					 qryStr = qryStr.replace(lang.EVEN21, ''); //'(單)'
					 qryStr = qryStr.replace(lang.EVEN31, ''); //'(雙)'
					 qryStr = qryStr.replace(lang.DOOR, '');   //'(路面)'

					 if (options.AndStrtCode === true) {
						  qryStr += 'AND' + tableName + '.STRTCODE=' + SO014.StrtCode;
					 }
				} else {
					 var OrderString1 = _getOrderString1(self);
					 var OrderString2 = _getOrderString2(self);
					 if (OrderString2 === '') {
						  if (options.orthodox === 1) {
								if (SO014.CityName.indexOf('') < 0) {
									 qryStr += tableName + ".ADDRSORT1='" + OrderString1 + "'";
								} else {
									 qryStr += tableName + ".ADDRSORT='" + OrderString1 + "'";
								}
						  } else {
								qryStr += tableName + ".ADDRSORT='" + OrderString1 + "'";
						  }
					 } else {
						  if (options.orthodox === 1) {
								if (SO014.CityName.indexOf('') < 0) {
									 qryStr += tableName + ".ADDRSORT1>='" + OrderString1 + "' AND " + tableName + ".ADDRSORT1<='" + OrderString2 + "'";
								} else {
									 qryStr += tableName + ".ADDRSORT>='" + OrderString1 + "' AND " + tableName + ".ADDRSORT<='" + OrderString2 + "'";
								}
						  } else {
								qryStr += tableName + ".ADDRSORT>='" + OrderString1 + "' AND " + tableName + ".ADDRSORT<='" + OrderString2 + "'";
						  }
					 }
				}

				if (SO014.Even !== '' && SO014.Even !== '0') {
					 if (SO014.Alley2 !== '') {
						  qryStr += ' AND ' + tableName + '.NOE4=' + SO014.Even;
					 } else if (SO014.Alley !== '') {
						  qryStr += ' AND ' + tableName + '.NOE3=' + SO014.Even;
					 } else if (SO014.Lane !== '') {
						  qryStr += ' AND ' + tableName + '.NOE2=' + SO014.Even;
					 } else {
						  qryStr += ' AND ' + tableName + '.NOE1=' + SO014.Even;
					 }
				}

				if (SO014.Door === true) {
					 if (SO014.Alley2 !== '') {
						  qryStr += ' AND ' + tableName + '.DOOR4=1';
					 } else if (SO014.Alley2 !== '') {
						  qryStr += ' AND ' + tableName + '.DOOR3=1';
					 } else if (SO014.Lane !== '') {
						  qryStr += ' AND ' + tableName + '.DOOR2=1';
					 } else {
						  qryStr += ' AND ' + tableName + '.DOOR1=1';
					 }
				}

				options = null;
				SO014 = null;
				tableName = null;

				return qryStr;
		  } catch (err) {
				errorHandle(formName, '_getQryString ', err);
		  }
	 }
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

				if (SO014.No1 !== '') {
					 orderStr1 += SO014.No1.spaceLeft2(4, ' ').right2(4) + SO014.No2.spaceLeft2(4, ' ').right2(4);
					 flag = flag + 1;
				}


				if (options.orthodox === 1) {
					 orderStr1 = orderStr1.spaceRight2(88, ' ').leftB2(88);
				} else {
					 orderStr1 = orderStr1.spaceRight2(82, ' ').leftB2(82);
				}

				orderStr1 += adjFlag(flag);
				orderStr1 += SO014.Flour.spaceLeft2(3, ' ').right2(3) + SO014.No3.spaceLeft2(4, ' ').right2(4) + patchSpace(SO014.Room, 2, 20);

				if (options.orthodox === 1) {
					 if (SO014.CityName.right2(1) !== lang.CITY) { //'市'
						  orderStr1 = orderStr1.left2(3) + SO014.AreaCode.spaceRight2(3, ' ').left2(3) + orderStr1.substring(7);
					 }
				}

				if (SO014.StrtCode === '') {
					 orderStr1 = '';
				}

				options.orderStr1 = orderStr1;

				options = null;
				SO014 = null;
				flag = null;

				return orderStr1;
		  } catch (err) {
				errorHandle(formName, '_getOrderString1', err);
		  }
	 }
	 function _getOrderString2(self) {
		  try {
				var options = self.options;
				var SO014 = options.SO014;
				var orderStr1 = options.orderStr1;
				var orderStr2 = '';
				var flag = 0;
				var cr255 = String.fromCharCode(255) + String.fromCharCode(255) + String.fromCharCode(255) + String.fromCharCode(255);
				var xFlag = false;

				if (SO014 === undefined || SO014.Address === undefined || SO014.Address === '') {
					 return '';
				}

				if (SO014.Lin === '' && SO014.Section === '' && SO014.Lane === '' && SO014.Alley === '' && SO014.Alley2 === '' &&
				SO014.No1 === '' && SO014.No2 === '' && SO014.Flour === '' &&
				SO014.No3 === '' && SO014.No4 === '' && SO014.No5 === '' && SO014.Room === '') {
					 orderStr2 = getPreFix(self) + cr255;
					 return orderStr2;
				}

				if (SO014.Lin === '' && SO014.Section === '' && SO014.Lane === '' && SO014.Alley === '' && SO014.Alley2 === '' &&
				SO014.No4 === '' && SO014.No5 === '') {

					 orderStr2 = getPreFix(self) + '9999';
					 flag = true;
				}

				if (SO014.Lin !== '' && SO014.Section === '' && SO014.Lane === '' && SO014.Alley === '' && SO014.Alley2 === '' &&
				SO014.No4 === '' && SO014.No5 === '') {
					 orderStr2 = getPreFix(self) + SO014.Lin.spaceLeft2(4, ' ').right2(4) + '9999';
					 flag = true;
				}

				if (SO014.Lin === '' && SO014.Section !== '' && SO014.Lane === '' && SO014.Alley === '' && SO014.Alley2 === '' &&
				SO014.No4 === '' && SO014.No5 === '') {
					 orderStr2 = getPreFix(self).spaceRight2(4, ' ') + SO014.Section.spaceLeft2(4, ' ').right2(4) + cr255;
					 flag = true;
				}

				if (SO014.Lin !== '' && SO014.Section !== '' && SO014.Lane === '' && SO014.Alley === '' && SO014.Alley2 === '' &&
				SO014.No4 === '' && SO014.No5 === '') {
					 orderStr2 = getPreFix(self) + SO014.Lin.spaceLeft2(4, ' ').right2(4) + SO014.Section.spaceLeft2(4, ' ').right2(4) + cr255;
					 flag = true;
				}

				if (!xFlag) {
					 orderStr2 = '';
					 if (SO014.Lin === '' && SO014.Section === '' && SO014.No1 === '' && SO014.No2 === '' &&
						SO014.No3 === '' && SO014.No4 === '') {
						  orderStr2 = getPreFix(self) + '    ' + '    ';
						  flag = true;
					 } else if (SO014.Lin !== '' && SO014.Section === '') {
						  orderStr2 = getPreFix(self) + SO014.Lin.spaceLeft2(4, ' ').right2(4) + '    ';
					 } else {
						  orderStr2 = getPreFix(self) + SO014.Lin.spaceLeft2(4, ' ').right2(4) + SO014.Section.spaceLeft2(4, ' ').right2(4);
					 }

					 if (SO014.Lane !== '') {
						  orderStr2 += newOrderString(SO014.Lane, true);
						  flag = flag + 8;
					 }

					 if (SO014.Alley !== '') {
						  orderStr2 += newOrderString(SO014.Alley, false);
						  flag = flag + 4;
					 }

					 if (SO014.Alley2 !== '') {
						  orderStr2 += newOrderString(SO014.Alley2, false);
						  flag = flag + 2;
					 }


					 if (SO014.No1 === '' && SO014.No4 === '') {
						  orderStr2 += '9999' + '9999';
						  flag = flag + 1;
					 } else if (SO014.No4 === '') {
						  if (SO014.Flour === '' && SO014.No3 === '' && SO014.Room === '') {
								if (options.orthodox === 1) {
									 orderStr2 = (orderStr2 + '9999' + '9999').leftB2(88) + cr255; //
								} else {
									 orderStr2 = (orderStr2 + '9999' + '9999').leftB2(82) + cr255; //
								}
						  } else {
								if (options.orthodox === 1) {
									 if (orderStr1.trim().BLength === 86) {
										  orderStr2 = orderStr2;                //
									 } else {
										  orderStr2 = orderStr2 + cr255;        //
									 }
								} else {
									 if (orderStr1.trim().BLength === 80) {
										  orderStr2 = orderStr2;                //
									 } else {
										  orderStr2 = orderStr2 + cr255;        //
									 }
								}
						  }
						  flag = flag + 1;
					 } else {
						  if (SO014.No4 !== '') {
								if (SO014.No5 === '') {
									 //orderStr2 += SO014.No4.spaceLeft2(4, ' ').right2(4) + '9999';
									 orderStr2 += SO014.No4.spaceLeft2(4, ' ').right2(4) + '    ';
								} else {
									 orderStr2 += SO014.No4.spaceLeft2(4, ' ').right2(4) + SO014.No5.spaceLeft2(4, ' ').right2(4);
								}
						  }
						  flag = flag + 1;

						  if (options.orthodox === 1) {
								orderStr2 = orderStr2.spaceRight2(88, ' ').leftB2(88);
						  } else {
								orderStr2 = orderStr2.spaceRight2(82, ' ').leftB2(82);
						  }
						  orderStr2 = (orderStr2 + adjFlag(flag)); //.spaceRight2(27, ' ');
						  //因為要加串樓+之+其它 所以不串右方空白
						  //無條件加串 樓+之+其它-->以得到精準查詢
						  orderStr2 += SO014.Flour.spaceLeft2(3, ' ').right2(3) + SO014.No3.spaceLeft2(4, ' ').right2(4) + patchSpace(SO014.Room, 2, 20);
					 }
				}

				if (options.orthodox === 1) {
					 if (SO014.CityName.right2(1) !== lang.CITY) { //'市'
						  orderStr2 = orderStr2.left2(3) + SO014.AreaCode.spaceRight2(3, ' ').left2(3) + orderStr2.substring(7);
					 }
				}

				if (SO014.StrtCode === '') {
					 orderStr2 = '';
				}
				else {
					 //2019/03/22 Jacky Add 後面補上chr(255)
					 var l = orderStr2.lengthB() - orderStr2.rtrim().lengthB();
					 orderStr2 = orderStr2.rtrim() + "".padRight(l, String.fromCharCode(255));
				}

				orderStr1 = null;
				options = null;
				SO014 = null;
				flag = null;
				cr255 = null;
				xFlag = null;

				return orderStr2;
		  } catch (err) {
				errorHandle(formName, '_getOrderString2', err);
		  }
	 }
	 function _getAddrInfo(jq) {
		  try {
				var options = getSelf(jq).options;
				var lang = options.language;
				var SO014 = options.SO014;
				if (SO014 != undefined && SO014 != null) {
					 SO014.Door_Desc = SO014.Door == true ? lang.DOOR : '';
					 if (SO014.Even == '1') {
						  SO014.Even_Desc = lang.EVEN21;
					 } else if (SO014.Even == '2') {
						  SO014.Even_Desc = lang.EVEN31;
					 } else {
						  SO014.Even_Desc = '';
					 }
					 SO014.LNFlag = options.LNFlag;

					 return SO014;
				} else {
					 return null;
				}
		  } catch (err) {
				errorHandle(formName, '_getAddrInfo', err);
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
					 rtnValue = strSource.left2(retval).spaceLeft2(4, ' ').rightB2(4) + '-' +
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