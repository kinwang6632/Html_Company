(function ($) {
    var formName = 'INV1120A1';
    var riadllName = 'CableSoft.INV.RIA.CreateInvoice.Web.dll';
    var riaClassName = 'CableSoft.INV.RIA.CreateInvoice.Web.Invoice';
    var findClick = false;
    //var copyLoginInfo = {};     
    const CreateMethodEnums = Object.freeze({ previous: 1, after: 2,local:3,normal:4 });
    var defaults = (function () {
        this.language = {};
        this.initData = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.parameters = {};
        this.controls = [];
        this.theme = '';        
        this.isSaved = false;
        this.container = null;
        this.localization = {};
        this.refNo = 1;
        this.InvId = '-X'
        this.dynGridId;
        this.realinvmonth = null;
        this.choiceyearmonth = null;
        this.lastinvdate = null;
        this.inv099uploadflag = 0;
        this.inv099fixflag = 0;
        this.scrData = {};
        this.containerIsWindow = true;
        this.howtocreate = CreateMethodEnums.local;
    });
    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        setTheme: function (jq, params, param2, params3) {
            return jq.each(function () {
                setTheme(this, params);
            });
        },
        localization: function (jq, params, param2, params3) {
            return parameter(jq[0], 'localization', params);
        },
        close: function (jq) {

            return jq.each(function () {
                formClosed(this);
            });
        },
        caculatePrice: function (jq, params, param2, params3) {
           return caculateSingelPrice(params);
            
        },

        destroy: function (jq) {
            return jq.each(function () {
                formDestroy(this);
            });
        },
        canView: function (jq, params, param2, params3) {
            return param2([true, null]);
        },
        canAppend: function (jq, params, param2, params3) {
            return param2([true, null]);
        },
        canEdit: function (jq, params, param2, params3) {
            
            return _CanEdit(params, param2, params3);
            
            
        },
        canDelete: function (jq, params, param2, params3) {
            return param2([true, null]);
        },
        canPrint: function (jq, params, param2, params3) {
            return param2([true, null]);
        },

    };
    function parameter(div, paraName, params) {
        try {
            controlParameter(div, formName, paraName, params);
        }
        catch (err) {
            errorHandle(formName, 'parameter', err);
        }
    };
    
    $.fn[formName] = function (options, param, param2) {
        try {
            if (typeof options == 'string') {
                if (methods[options]) {
                    return methods[options](this, param, param2);
                }
                return;
            }
            options = options || {};
            return this.each(function () {
                try {
                    var state = $.data(this, formName);
                    if (state) {
                        $.extend(state.options, options);
                    }
                    else {
                        $.data(this, formName, {
                            options: $.extend({}, new defaults(), new INV1120A1(), options)
                        });
                        findClick = false;
                        formLoaded(this);
                    }

                }
                catch (err) {
                    errorHandle(formName, '$.fn.INV1120A1_each', err);
                }

            });
        }
        catch (err) {
            errorHandle(formName, '$.fn.INV1120A1', err);
        }
    };
    function createSO111FA(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        try {
            
            var winOptions = $.extend({}, {
                width: 600, height: 300,
                maxWidth: 1028,
                maxHeight: 900,
                keyboardCloseKey: 'none',
                resizable: true,
                haveClosing: false
            })
            var result = createcsWindow(div, null, winOptions);
            var xp = 'center';
            var yp = 0;
            if (options.containerIsWindow) {
                xp = ($(options.container).csWindow('width') - $('#' + result['windowId']).csWindow('width')) / 2;
                yp = ($(options.container).csWindow('height') - $('#' + result['windowId']).csWindow('height')) / 2;
            };
            $('#' + result['windowId']).csWindow({ position: { x: xp, y: 0 } });
            $('#' + result['contentId']).SO111FA($.extend({}, {
                loginInfo: cloneJSON(options.loginInfo),
                container: '#' + result['windowId'],
                localization: cloneJSON(options.localization),

                mediaRefNo: 5

            }));
            
            $('#' + result['windowId']).on('close', function () {
                $('#' + result['windowId']).off('close');
                
                try {
                    var returnOptions = $('#' + result['contentId']).SO111FA('options');
                    if (returnOptions.introData.rows.length > 0) {
                       // $(headerId + 'txtIntroId').jqxInput('val', returnOptions.introData.rows[0]['CODENO']);
                       // $(headerId + 'lblIntroName').jqxInput('val', returnOptions.introData.rows[0]['DESCRIPTION']);
                    }
                } catch (err) {
                    errorHandle(formName, 'windowClose', err);
                } finally {
                    $('#' + result['windowId']).off('close');
                    $('#' + result['contentId']).SO111FA('destroy');
                    $('#' + result['windowId']).csWindow('destroy');
                  
                };
            });
        } catch (err) {
            
            errorHandle(formName, 'createSO111FA', err);
        } finally {

        };
    };
    function generateRow(o) {
        var ret = {};
        $.each(o.columns, function (i, v) {           
            ret[v.name] = null;
            ret[v.name] = v.name.toUpperCase() == 'IDENTIFYID1' ? '1':ret[v.name];
            ret[v.name] = v.name.toUpperCase() == 'IDENTIFYID2' ? 0:ret[v.name];
           
        })
        return ret;
    };
    function _CanEdit(data,act) {
        
        var loginInfo = $.extend(true, {}, { loginInfo: { type: 'loginInfo', value: data.loginInfo } });
        var lang = new INV1120A1();
        if (data.INV007.rows.length == 0) {
            act(false, lang.noInvId);
            return;
        };
        try {
            //var ds = {ds:data};

            var parameters = $.extend({}, loginInfo,
                    { invid: { type: 'string', value: data.INV007.rows[0].INVID } });


            var params = getParameters(riadllName,
                   riaClassName,
                   'CanEdit',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                           // var tmp = JSON.parse(data.ResultXML);
                         //   options.initData = null;
                        //    options.initData = {};
                      //      $.extend(options.initData, tmp)

                          //  $(headerId + 'csGiveUnitId').csList('source', options.initData['INV041'].rows)
                            
                            if (typeof act === 'function') {
                                act([data.ResultBoolean, data.ErrorMessage])
                            };
                            //setCsInvUseId(div);

                            

                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            
                            
                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryData-Server', err);
                        
                        //changeMode(div, options.editMode);
                    } finally {
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };

                }
            });
            

        } catch (err) {
            errorHandle(formName, 'CanEdit', err);
            
        } finally {
            lang = null;
            loginInfo = null;
            delete loginInfo;
        }
    }
    function writeDataToCloneData() {
        //var options = $.data(div, formName).options;
        //var headerId = '#' + $(div).prop('id');
        if (arguments.length < 3) { throw Error('arguments error') };
        if (typeof arguments[1] != 'string') { throw Error('arguments error [not a tablename]') };
        var tableName = arguments[1];
        try {
            var headerId = arguments[2];
            if (tableName.toUpperCase() == 'INV007') {
                var options = $.data(arguments[0], formName).options;                
                var lang = options.language;
                this['INVID'] = $(headerId + 'txtInvNo').val();
                switch ($(headerId + 'txtHowToCreate').val()) {
                    case lang.HowtoCreate1: this['HowToCreate'.toUpperCase()] = '1'; break;
                    case lang.HowtoCreate2: this['HowToCreate'.toUpperCase()] = '2'; break;
                    case lang.HowtoCreate3: this['HowToCreate'.toUpperCase()] = '3'; break;
                    case lang.HowtoCreate4: this['HowToCreate'.toUpperCase()] = '4'; break;
                };
                this['IsObsolete'.toUpperCase()] = $(headerId + 'txtIsObsolete').val() == lang.scrYes ? 'Y' : 'N';
                this['CanModify'.toUpperCase()] = $(headerId + 'txtCanModify').val() == lang.scrYes ? 'Y' : 'N';
                //this['ObsoleteId'.toUpperCase()]
                this['RandomNum'] = $(headerId + 'txtRandomNum').val() || null;
                this['PrintCount'.toUpperCase()] = parseInt($(headerId + 'txtPrintCount').val().replace(/,/g, '') || 0);
                this['SaleAmount'.toUpperCase()] = parseInt($(headerId + 'txtSaleAmount').val().replace(/,/g, '') || 0);
                this['TaxAmount'.toUpperCase()] = parseInt($(headerId + 'txtTaxAmount').val().replace(/,/g, '') || 0);
                this['InvAmount'.toUpperCase()] = parseInt($(headerId + 'txtInvAmount').val().replace(/,/g, '') || 0);
                this['InvDate'.toUpperCase()] = $(headerId + 'txtInvDate').csDateTime('getDate');
                switch ($(headerId + 'txtInvFormat').val()) {
                    case lang.InvFormat1: this['InvFormat'.toUpperCase()] = '1'; break;
                    case lang.InvFormat2: this['InvFormat'.toUpperCase()] = '2'; break;
                    case lang.InvFormat3: this['InvFormat'.toUpperCase()] = '3'; break;
                };
                this['INVOICEKIND'] = $(headerId + 'chkEInv').jqxCheckBox('checked') ? 1 : 0;
                this['CUSTID'] = $(headerId + 'txtCustId').val();
                this['CUSTSNAME'] = $(headerId + 'txtCustName').val() || null;
                this['INVTITLE'] = $(headerId + 'txtInvTitle').val() || null;
                this['BusinessId'.toUpperCase()] = $(headerId + 'txtBusinessId').val() || null;
                this['InvAddr'.toUpperCase()] = $(headerId + 'txtInvAddr').val() || null;
                this['ChargeDate'.toUpperCase()] = $(headerId + 'txtChargeDate').csDateTime('getDate') || null;
                this['ObsoleteReason'.toUpperCase()] = $(headerId + 'txtObsoleteReason').val() || null;
                this['MailAddr'.toUpperCase()] = $(headerId + 'txtMailAddr').val() || null;
                this['ZipCode'.toUpperCase()] = $(headerId + 'txtZipCode').val() || null;
                this['DestroyReason'.toUpperCase()] = $(headerId + 'txtDestroyReason').val() || null;
                this['InstAddr'.toUpperCase()] = $(headerId + 'txtInstAddr').val() || null;
                this['Memo1'.toUpperCase()] = $(headerId + 'txtMemo1').val() || null;
                this['Memo2'.toUpperCase()] = $(headerId + 'txtMemo2').val() || null;
                this['TAXTYPE'] = '3';
                if ($(headerId + 'rdoTax2').jqxRadioButton('checked')) { this['TAXTYPE'] = '2'; };
                if ($(headerId + 'rdoTax1').jqxRadioButton('checked')) { this['TAXTYPE'] = '1'; };
                this['TaxRate'.toUpperCase()] = parseFloat($(headerId + 'txtRate').val() || 0);
                this['Contmobile'.toUpperCase()] = $(headerId + 'txtContmobile').val() || null;
                this['Email'.toUpperCase()] = $(headerId + 'txtEmail').val() || null;
                this['AutoUploadFlag'.toUpperCase()] = $(headerId + 'chkAutoUploadFlag').jqxCheckBox('checked') ? 1 : 0;
                this['FIXFlag'.toUpperCase()] = $(headerId + 'chkFIXFlag').jqxCheckBox('checked') ? 1 : 0;
                this['UploadFlag'.toUpperCase()] = $(headerId + 'chkUploadFlag').jqxCheckBox('checked') ? 1 : 0;
                this['DestroyFlag'.toUpperCase()] = $(headerId + 'chkDestroyFlag').jqxCheckBox('checked') ? 1 : 0;
                this['ObUploadFlag'.toUpperCase()] = $(headerId + 'chkObUploadFlag').jqxCheckBox('checked') ? 1 : 0;
                //this['PrizeFileFirst'.toUpperCase()] = $(headerId + 'chkObUploadFlag').jqxCheckBox('checked') ? 1 : 0;
                this['LoveNum'.toUpperCase()] = $(headerId + 'txtLoveNum').val() || null;
                this['CarrierType'.toUpperCase()] = $(headerId + 'txtCarrierType').val() || null;
                this['CarrierId1'.toUpperCase()] = $(headerId + 'txtCarrierId1').val() || null;
                this['A_CarrierId1'.toUpperCase()] = $(headerId + 'txtA_CarrierId1').val() || null;
                this['CarrierId2'.toUpperCase()] = $(headerId + 'txtCarrierId2').val() || null;
                this['A_CarrierId2'.toUpperCase()] = $(headerId + 'txtA_CarrierId2').val() || null;
                this['InvUseId'.toUpperCase()] = $(headerId + 'csInvUseId').csList('codeNo') || null;
                this['InvUseDesc'.toUpperCase()] = $(headerId + 'csInvUseId').csList('description') || null;
                this['GiveUnitId'.toUpperCase()] = $(headerId + 'csGiveUnitId').csList('codeNo') || null;
                this['GiveUnitDesc'.toUpperCase()] = $(headerId + 'csGiveUnitId').csList('description') || null;
                if (options.initData.INV007.rows.length > 0) {
                    this['ISPAST'] = options.initData.INV007.rows[0]['ISPAST'];
                } else {
                    this['ISPAST'] = 'N';
                };

            } else {
                var v = arguments[0];
                this['InvID'.toUpperCase()] = $(arguments[2] + 'txtInvNo').val();
                this['BillID'.toUpperCase()] = v['BillID'.toUpperCase()] || null;
                this['BillIDItemNo'.toUpperCase()] = v['BillIDItemNo'.toUpperCase()] || null;
                this['Seq'.toUpperCase()] = v['Seq'.toUpperCase()] || 1;
                this['StartDate'.toUpperCase()] = v['StartDate'.toUpperCase()] || null;
                this['EndDate'.toUpperCase()] = v['EndDate'.toUpperCase()] || null;
                this['ItemID'.toUpperCase()] = v['ItemID'.toUpperCase()];
                this['Description'.toUpperCase()] = v['Description'.toUpperCase()];
                this['Quantity'.toUpperCase()] = parseInt(v['Quantity'.toUpperCase()] || 1);
                this['UnitPrice'.toUpperCase()] = parseFloat(v['UnitPrice'.toUpperCase()] || 0);
                this['TaxAmount'.toUpperCase()] = parseInt(v['TaxAmount'.toUpperCase()] || 0);
                this['TotalAmount'.toUpperCase()] = parseInt(v['TotalAmount'.toUpperCase()] || 0);
                this['ChargeEn'.toUpperCase()] = v['ChargeEn'.toUpperCase()] || null;
                this['ServiceType'.toUpperCase()] = v['ServiceType'.toUpperCase()] || null;
                this['SaleAmount'.toUpperCase()] = parseInt(v['SaleAmount'.toUpperCase()] || 0);
                this['LinkToMIS'.toUpperCase()] = v['LinkToMIS'.toUpperCase()] || null;
                this['FacisNo'.toUpperCase()] = v['FacisNo'.toUpperCase()] || null;
                this['AccountNo'.toUpperCase()] = v['AccountNo'.toUpperCase()] || null;
                this['COMBCITEMCODE'.toUpperCase()] = v['COMBCITEMCODE'.toUpperCase()] || null;
                this['COMBCITEMNAME'.toUpperCase()] = v['COMBCITEMNAME'.toUpperCase()] || null;
                this['SmartCardNo'.toUpperCase()] = v['SmartCardNo'.toUpperCase()] || null;
                this['CMMac'.toUpperCase()] = v['CMMac'.toUpperCase()] || null;

                this['NEWADD'.toUpperCase()] = v['NEWADD'.toUpperCase()];
            };


            return true;
        } catch (err) {
            errorHandle(formName, 'writeDataToInv007', err);
            return false;
        };

    };
    function scrTorcd(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var inv007Clone = $.extend(true, {}, options.initData.INV007);
        var inv008Clone = $.extend(true, {}, options.initData.INV008);
       // var inv008AClone = $.extend(true, {}, options.initData.INV008A);                
        try {
            inv008Clone.rows = [];
            if (inv007Clone.rows.length == 0) {
                inv007Clone.rows.push(generateRow(inv007Clone));
                inv007Clone.rows[0].COMPID = options.loginInfo.loginInfo.rows[0].compcode + '';
            };
            if (writeDataToCloneData.apply(inv007Clone.rows[0], [div, 'INV007', headerId]) == false) {
                throw Error('write inv007 to clone fail');
            };
            $.each($(options.dynGridId).jqxGrid('getrows'), function (i, v) {
                inv008Clone.rows.push(generateRow(inv008Clone));
                if (writeDataToCloneData.apply(inv008Clone.rows[i], [v, 'INV008', headerId]) == false) {
                    throw Error('write inv008 to clone fail');
                };
            });
            var ds = {
                INV007: inv007Clone,
                INV008: inv008Clone
            };

            options.scrData = {
                INV007: inv007Clone,
                INV008: inv008Clone
            };

            return true;
        } catch (err) {
            errorHandle(formName, 'scrTorcd', err);
        } finally {

        };
    };
    function validateSave(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var lang = options.language;
        try {
            if ($(headerId + 'txtBusinessId').val() != '') {
                var result = invNoVerify($(headerId + 'txtBusinessId').val());
                if (result[0] == false) {
                    messageBox(result[1], messageType.critical, null, function () {
                        $(headerId + 'txtBusinessId').jqxMaskedInput('focus')
                    });
                    return false;
                };

            };
            if (parseInt($(headerId + 'txtInvAmount').val()) <= 0) {
                messageBox(lang.MustInvAmount, messageType.critical);
                return false;
            };
            if ($(headerId + 'rdoTax1').jqxRadioButton('checked')) {
                if ($(headerId + 'txtRate').jqxNumberInput('getDecimal') <= 0) {
                    messageBox(lang.mustTaxRate, messageType.critical, null, function () {
                        $(headerId + 'txtRate').jqxNumberInput('focus');
                    });
                    return false;
                };
            };
            
            if ($(headerId + 'txtInvFormat').val() == lang.InvFormat3) {
                if (!$(headerId + 'txtBusinessId').val()) {
                    messageBox(lang.mustBussinessId, messageType.critical, null, function () {
                        $(headerId + 'txtBusinessId').jqxMaskedInput('focus');
                    });
                    return false;
                };
            };
            if ($(options.dynGridId).jqxGrid('getrows').length == 0) {
                messageBox(lang.mustInv008, messageType.critical);
                return false;
            };
            if ($(headerId + "txtInvNo").val() == '') {
                messageBox(lang.mustInvNo, messageType.critical);
                return false;

            };
            if ($(headerId + 'csInvUseId').csList('codeNo')) {

                if (($(headerId + 'csInvUseId').csList('selectedItem').REFNO || 0) == 1) {
                    //if (!$(headerId + 'txtLovenum').val())
                    if (($(headerId + 'txtLoveNum').val() || $(headerId + 'csGiveUnitId').csList('codeNo')) == false) {
                        messageBox(lang.mustDonate, messageType.critical);
                        return false;
                    };
                    
                };
            };
            if ($(headerId + "txtCustId").val() == '') {
                messageBox(lang.mustCustId, messageType.critical, null, function () {
                    $(headerId + 'txtCustId').jqxInput('focus')
                });
                return false;
            };
            if ($(headerId + "txtCustName").val() == '') {
                messageBox(lang.mustCustName, messageType.critical, null, function () {
                    $(headerId + 'txtCustName').jqxInput('focus')
                });
                return false;
            };
            if ($(headerId + 'txtBusinessId').val()) {
                if ($(headerId + 'chkEInv').jqxCheckBox('checked')) {
                    messageBox(lang.cannotBusiness, messageType.critical);
                    return false;
                };
            };
            /*
            if ($(headerId + 'txtBusinessId').val() ) {
                if (options.inv099uploadflag === 1) {
                    messageBox(lang.cannotUploadFlag, messageType.critical);
                    return false;
                };
            }; */
            if (($(headerId + 'csInvUseId').csList('codeNo'))) {

                if ($(headerId + 'txtBusinessId').val()) {
                    if (($(headerId + 'csInvUseId').csList('selectedItem').REFNO || 0) == 1) {
                        messageBox(lang.cannotDonate, messageType.critical);
                        return false;
                    }

                }
            };
            if ($(headerId + 'chkFIXFlag').jqxCheckBox('checked')) {
                if (options.howtocreate == CreateMethodEnums.local) {
                    if (!$(headerId + 'txtA_CarrierId1').val()) {
                        messageBox(lang.notgetA_CARRIERID1, messageType.critical);
                        return false;
                    }

                }
            }
            

           
            
            return true
        } catch (err) {
            errorHandle(formName, 'validateSave', err);
        } finally {

        };

    };
    
    function renderControl(div) {
        var options = $.data(div, formName).options;
        var controls = options.controls;
        var lang = options.language;
        var headerId = $(div).prop('id');
        var d = $.Deferred();
        try {


            $('#' + headerId + 'invtab').csTabs({
                width: '99.7%',
                height: '99%',
                keyboardNavigation:false,
            })
            controls.push({ name: headerId + 'invtab', type: 'csTabs', level: 2 });

            $('#' + headerId + 'btnINV099').jqxButton({ width: 20, height: 25,disabled:true })
            controls.push({ name: headerId + 'btnINV099', type: 'jqxButton', level: 1 });
            $('#' + headerId + 'btnSave').jqxButton($.extend({}, imagePosition, {
                width: 80,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.save.imgSrc,
                disabled:true,
                height: 25
            }));

            $('#' + headerId + 'btnSave > img').css('top', '2px');
            controls.push({ name: headerId + 'btnSave', type: 'jqxButton', level: 1 });

            $('#' + headerId + 'btnExit').jqxButton($.extend({}, imagePosition, {
                width: 80,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.exit.imgSrc,
                disabled: false,
                height: 25
            }));

            $('#' + headerId + 'btnExit > img').css('top', '2px');
            controls.push({ name: headerId + 'btnExit', type: 'jqxButton', level: 1 });


            $('#' + headerId + 'btnfindCust').jqxButton($.extend({}, imagePosition, {
                width: 40,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.query.imgSrc,
                disabled:true,
                height: 25
            }))
            controls.push({ name: headerId + 'btnfindCust', type: 'jqxButton', level: 1 });



            $('#' + headerId + 'btndetailAdd').jqxButton($.extend({}, imagePosition, {
                width: 50,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.append.imgSrc,
                disabled:true,
                height: 25
            }))
            $('#' + headerId + 'btndetailAdd > img').css('top', '2px');
            controls.push({ name: headerId + 'btndetailAdd', type: 'jqxButton', level: 1 });

            $('#' + headerId + 'btndetailEdit').jqxButton($.extend({}, imagePosition, {
                width: 50,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.edit.imgSrc,
                disabled: true,
                height: 25
            }));
            $('#' + headerId + 'btndetailEdit > img').css('top', '2px');
            controls.push({ name: headerId + 'btndetailEdit', type: 'jqxButton', level: 1 });
            

            $('#' + headerId + 'btndetailDel').jqxButton($.extend({}, imagePosition, {
                width: 50,
                imgWidth: 20,
                imgHeight: 20,
                imgSrc: imageScr.delete.imgSrc,
                disabled: true,
                height: 25
            }));
            $('#' + headerId + 'btndetailDel > img').css('top', '2px');
            controls.push({ name: headerId + 'btndetailDel', type: 'jqxButton', level: 1 });

            $("#" + headerId + "txtInvNo").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtInvNo', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtMainInvNo").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtMainInvNo', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtInvFormat").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtInvFormat', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtHowToCreate").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtHowToCreate', type: 'jqxInput', level: 0 });
            $("#" + headerId + "txtDataType").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtDataType', type: 'jqxInput', level: 0 });
            $("#" + headerId + "txtInvDate").csDateTime({ width: '110px', disabled: true })
            controls.push({ name: headerId + 'txtInvDate', type: 'csDateTime', level: 0 });

            $("#" + headerId + "txtCustId").jqxInput({ width: 90, disabled: true })
            controls.push({ name: headerId + 'txtCustId', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtCustName").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtCustName', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtInvTitle").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtInvTitle', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtBusinessId").jqxMaskedInput({ width: '100%', disabled: true, mask: '99999999', promptChar:'' })
            controls.push({ name: headerId + 'txtBusinessId', type: 'jqxMaskedInput', level: 0 });

            $("#" + headerId + "txtIsObsolete").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtIsObsolete', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtInvAddr").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtInvAddr', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtChargeDate").csDateTime({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtChargeDate', type: 'csDateTime', level: 0 });

            $("#" + headerId + "txtObsoleteReason").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtObsoleteReason', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtMailAddr").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtMailAddr', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtZipCode").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtZipCode', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtDestroyReason").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtDestroyReason', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtInstAddr").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtInstAddr', type: 'jqxInput', level: 0 });
            $("#" + headerId + "csInvUseId").csList({
                source: null,
                codeNoWidth: 25,
                width:'140px',
                //height: '23px',
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
                disabled: true,

                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false
            });
            controls.push({ name: headerId + 'csInvUseId', type: 'csList', level: 0 });

            $("#" + headerId + "txtPrintCount").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtPrintCount', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtCanModify").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtCanModify', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtMemo1").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtMemo1', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtSaleAmount").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtSaleAmount', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtTaxAmount").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtTaxAmount', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtInvAmount").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtInvAmount', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtMainSaleAmount").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtMainSaleAmount', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtMainTaxAmount").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtMainTaxAmount', type: 'jqxInput', level: 0 });


            $("#" + headerId + "txtMainInvAmount").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtMainInvAmount', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtMemo2").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtMemo2', type: 'jqxInput', level: 0 });

            $("#" + headerId + "rdoTax1").jqxRadioButton({ width: 50, height: 25, checked: true, disabled: true })
            controls.push({ name: headerId + 'rdoTax1', type: 'jqxRadioButton', level: 0 });

            $("#" + headerId + "rdoTax2").jqxRadioButton({ width: 60, height: 25, disabled: true })
            controls.push({ name: headerId + 'rdoTax2', type: 'jqxRadioButton', level: 0 });

            $("#" + headerId + "rdoTax3").jqxRadioButton({ width: 50, height: 25, disabled: true })
            controls.push({ name: headerId + 'rdoTax3', type: 'jqxRadioButton', level: 0 });

            $("#" + headerId + "txtRate").jqxNumberInput({ width: 40, disabled: true, inputMode: 'simple', })
            controls.push({ name: headerId + 'txtRate', type: 'jqxNumberInput', level: 0 });

            $("#" + headerId + "txtContmobile").jqxMaskedInput({ width: '100%', disabled: true, mask: '9999999999', promptChar:''   })
            controls.push({ name: headerId + 'txtContmobile', type: 'jqxMaskedInput', level: 0 });

            $("#" + headerId + "txtEmail").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtEmail', type: 'jqxInput', level: 0 });

            $("#" + headerId + "chkPrizeType").jqxCheckBox({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'chkPrizeType', type: 'jqxCheckBox', level: 0 });


            $('#' + headerId + 'chkDEPOSITMK').jqxCheckBox({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'chkDEPOSITMK', type: 'jqxCheckBox', level: 0 });
            $("#" + headerId + "chkAutoUploadFlag").jqxCheckBox({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'chkAutoUploadFlag', type: 'jqxCheckBox', level: 0 });

            $("#" + headerId + "chkFIXFlag").jqxCheckBox({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'chkFIXFlag', type: 'jqxCheckBox', level: 0 });

            $("#" + headerId + "chkUploadFlag").jqxCheckBox({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'chkUploadFlag', type: 'jqxCheckBox', level: 0 });

            $("#" + headerId + "chkDestroyFlag").jqxCheckBox({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'chkDestroyFlag', type: 'jqxCheckBox', level: 0 });

            $("#" + headerId + "chkObUploadFlag").jqxCheckBox({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'chkObUploadFlag', type: 'jqxCheckBox', level: 0 });

            $("#" + headerId + "chkEInv").jqxCheckBox({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'chkEInv', type: 'jqxCheckBox', level: 0 });

            
            $("#" + headerId + "txtPrizeFileFirst").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtPrizeFileFirst', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtLoveNum").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtLoveNum', type: 'jqxInput', level: 0 });

            $("#" + headerId + "csGiveUnitId").csList({
                source: null,
                codeNoWidth: 40,
                width: '180px',
                //height: '23px',
                showColumnHeaders: false,
                //theme: 'energyblue',
                //selectedIndex: -1,
                disabled: true,
                readOnly: false,
                codeNoReadOnly: false,
                popupWidth: null,
                popupHeight: null,
                autoFitAllCols: false,
                descriptionReadOnly: false
            });
            controls.push({ name: headerId + 'csGiveUnitId', type: 'csList', level: 0 });

            $("#" + headerId + "txtCreateInvDate").csDateTime({
                width: 175,
                formatString: 'yyyy/MM/dd HH:mm:ss',
                disabled: true
            });
            controls.push({ name: headerId + 'txtCreateInvDate', type: 'csDateTime', level: 0 });

            $("#" + headerId + "txtPrintEn").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtPrintEn', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtlblPrintTime").csDateTime({
                width: 175,
                disabled: true,
                formatString: 'yyyy/MM/dd HH:mm:ss'
            })
            controls.push({ name: headerId + 'txtlblPrintTime', type: 'csDateTime', level: 0 });

            $("#" + headerId + "txtUploadTime").csDateTime({
                width: 175,
                disabled: true,
                formatString: 'yyyy/MM/dd HH:mm:ss'
            })
            controls.push({ name: headerId + 'txtUploadTime', type: 'csDateTime', level: 0 });

            $("#" + headerId + "txtOBUPLOADTIME").csDateTime({
                width: 175,
                disabled: true,
                formatString: 'yyyy/MM/dd HH:mm:ss'
            })
            controls.push({ name: headerId + 'txtOBUPLOADTIME', type: 'csDateTime', level: 0 });

            $("#" + headerId + "txtDestroyUploadTime").csDateTime({
                width: 175,
                disabled: true,
                formatString: 'yyyy/MM/dd HH:mm:ss'
            })
            controls.push({ name: headerId + 'txtDestroyUploadTime', type: 'csDateTime', level: 0 });

            $("#" + headerId + "txtCarrierType").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtCarrierType', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtCarrierId1").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtCarrierId1', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtA_CarrierId1").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtA_CarrierId1', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtRandomNum").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtRandomNum', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtCarrierId2").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtCarrierId2', type: 'jqxInput', level: 0 });

            $("#" + headerId + "txtA_CarrierId2").jqxInput({ width: '100%', disabled: true })
            controls.push({ name: headerId + 'txtA_CarrierId2', type: 'jqxInput', level: 0 });
            
            return d.resolve(div);
        } catch (err) {
            
            errorHandle(formName, 'renderControl', err);
            return d.reject('renderControl')
        }
        
        
    };
    function formDestroy(div) {
        

            var options = $.data(div, formName).options;
            var headId = $(div).attr('id');
            try {
           
                var controls = $.data(div, formName).options.controls;
                unHandler(div);
                $(div).find('*').off();
                destroyControls(controls);
                deleteJSONObject(options);

                $.data(div, formName).options.language = null;
                delete $.data(div, formName).options.language;
                $.data(div, formName).options = null;
                delete $.data(div, formName).options;
                $.data(div, formName).methods = null;
                delete $.data(div, formName).methods;
                $.data(div, formName).defaults = null;
                delete $.data(div, formName).defaults;
                $(div).children().remove();

        }
        catch (err) {
            errorHandle(formName, 'formDestroy', err);
        };
    };
    
    function QueryINV099(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);

        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');

            var parameters = $.extend({}, loginInfo,
                    { InvDate: { type: 'date', value: $(headerId + 'txtInvDate').csDateTime('getDate') } });


            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryINV099',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            options.initData.INV099 = null;
                            options.initData.INV099 = {};
                            $.extend(true,options.initData.INV099, tmp)
                            if (typeof act === 'function') { act() }



                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            //changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryINV099-Server', err);
                        //changeMode(div, options.editMode);
                    } finally {
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };

                }
            });

        } catch (err) {
            errorHandle(formName, 'QueryINV099', err);
            changeMode(div, options.editMode);
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function chkInvNo(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        
        try {
            var aMonth, aYear,aDate;
            aMonth = $(headerId + 'txtInvDate').csDateTime('getDate').getMonth() + 1;
            aYear = $(headerId + 'txtInvDate').csDateTime('getDate').getFullYear();
            aDate = $(headerId + 'txtInvDate').csDateTime('getText');
            if (aMonth % 2 == 0) {
                aMonth = aMonth - 1
            };
            var yyyymm = null;
            if (aMonth < 10) {
                yyyymm = (aYear + '') + '0' + ( aMonth +'')
            } else {
                yyyymm = (aYear + '') + (aMonth + '');
            }
            if (options.editMode == editMode.append) {
                if (options.choiceyearmonth) {
                    if (options.choiceyearmonth != yyyymm) {
                        $(headerId + 'txtInvNo').val('');
                        $(headerId + 'txtInvFormat').val('');
                        $(headerId + 'txtMainInvNo').val('');
                        options.choiceyearmonth = null;
                        options.lastinvdate = null;
                        return false;
                    } else {
                        if (Date.parse(aDate) < Date.parse(options.lastinvdate)) {
                            messageBox(options.language.inv099LastDateErr, messageType.critical, null,
                               function () {
                                   //$('#' + headerId + 'txtInvDate').csDateTime('focus')
                               });
                        }
                    }
                };
            } else {

            }
            
            return true;
        } catch (err) {
            errorHandle(formName, 'chkInvNo', err);
        } finally {
            aDate = null;
        }
    }
    function INV099Click(div, headerId,options) {
        if (!$('#' + headerId + 'txtInvDate').csDateTime('getDate')) {

            if ($(this).jqxButton('disabled') == false) { return; }
            messageBox(lang.plsInvDate, messageType.critical, null,
                    function () {
                        $('#' + headerId + 'txtInvDate').csDateTime('focus')
                    });
            return false;
        }
        ShowINV099(div, function (r) {
            if (r.isSaved) {
               
                $('#' + headerId + 'txtInvNo').val(r.inv099.PREFIX + r.inv099.CURNUM)
                $('#' + headerId + 'txtMainInvNo').val(r.inv099.PREFIX + r.inv099.CURNUM)
                $('#' + headerId + 'txtInvFormat').val(r.inv099.INVFORMATDESC)
                $('#' + headerId + 'chkFIXFlag').jqxCheckBox({ checked: r.inv099.UPLOADFLAG2 === 1 })
                //$('#' + headerId + 'txtBusinessId').jqxMaskedInput({ disabled: r.inv099.UPLOADFLAG2 === 1 })
                if ($('#' + headerId + 'txtBusinessId').jqxMaskedInput('disabled')) {
                    //$('#' + headerId + 'txtBusinessId').jqxMaskedInput('clear');
                };
                /*
                $('#' + headerId + 'chkEInv').jqxCheckBox({ checked: r.inv099.INVFORMATDESC == options.language.InvFormat1 });
                $('#' + headerId + 'chkEInv').jqxCheckBox({ disabled: r.inv099.INVFORMATDESC != options.language.InvFormat1 });
                if ($('#' + headerId + 'chkEInv').jqxCheckBox('checked')) {
                    if ($('#' + headerId + 'txtBusinessId').jqxMaskedInput('disabled') == false) {
                        $('#' + headerId + 'txtBusinessId').jqxMaskedInput({ disabled: true });
                        $('#' + headerId + 'txtBusinessId').jqxMaskedInput('clear');
                    }
                }; */
                options.inv099uploadflag = r.inv099.UPLOADFLAG2;
                options.choiceyearmonth = r.inv099.YEARMONTH;
                options.lastinvdate = r.inv099.LASTINVDATE;
                $('#' + headerId + 'txtInvDate').csDateTime('setText', options.lastinvdate);
                //changeMode(div);
            }
        });
    }
    function detailDelClick(headerId) {
        //var rowid =  $(this).jqxGrid('getrows')[$(this).jqxGrid('selectedrowindex')];
        if ($(this).jqxGrid('getboundrows').length == 0) { return;}
        var rowIndex = $(this).jqxGrid('selectedrowindex');
        var uid = $(this).jqxGrid('getboundrows')[rowIndex].uid;
        $(this).jqxGrid('deleterow',uid);
        $(this).jqxGrid('refreshdata');
        $(this).jqxGrid({ selectedrowindex:0});
        caculateINVAmount.apply(this, [headerId]);

    };
    function caculateSingelPrice(obj) {

        var TOTALAMOUNT = 0, SALEAMOUNT = 0, TAXAMOUNT = 0, UNITPRICE = 0,
            Quantity = 0;
        var rate = obj.RATE || 0;
        
        Quantity = obj['Quantity'.toUpperCase()];
        obj['TOTALAMOUNT'] = Math.abs(obj['TOTALAMOUNT'] || 0);
        obj['SALEAMOUNT'] = Math.abs(obj['SALEAMOUNT'] || 0);
        obj['TAXAMOUNT'] = Math.abs(obj['TAXAMOUNT'] || 0);
        obj['UNITPRICE'] = Math.abs(obj['UNITPRICE'] || 0);
        obj['QUANTITY'] = Math.abs(obj['QUANTITY'] || 0);
        switch (obj['kind'.toUpperCase()]) {
            case "Quantity".toUpperCase():                
                UNITPRICE = obj['UNITPRICE'.toUpperCase()];
                SALEAMOUNT =  Math.round(Quantity * UNITPRICE);
                TAXAMOUNT = rate == 0? 0 : Math.round(SALEAMOUNT * rate / 100);
                TOTALAMOUNT = SALEAMOUNT + TAXAMOUNT;
                break;
            case "UNITPRICE":
                UNITPRICE = obj['UNITPRICE'.toUpperCase()] || 0;
                if (obj['TAXAMOUNT'] != 0 && obj['SALEAMOUNT'] != 0 && obj['TOTALAMOUNT'] != 0 && false) {
                    TOTALAMOUNT = obj['TOTALAMOUNT'] || 0;
                    SALEAMOUNT = Math.round(Quantity * UNITPRICE) || 0;
                    TAXAMOUNT = TOTALAMOUNT - SALEAMOUNT;
                } else {
                    SALEAMOUNT = Math.round(Quantity * UNITPRICE) || 0;
                    TAXAMOUNT = rate == 0 ? 0 : SALEAMOUNT * rate / 100;
                    TOTALAMOUNT = SALEAMOUNT + TAXAMOUNT;
                };
                if (UNITPRICE == 0) {
                    SALEAMOUNT = 0;
                    TAXAMOUNT = 0;
                    TOTALAMOUNT = 0;
                };
                break;
            case "TOTALAMOUNT":
                UNITPRICE = obj['UNITPRICE'.toUpperCase()] || 0;
                TOTALAMOUNT = obj['TOTALAMOUNT'] || 0;
                if (obj['TOTALAMOUNT']  == 0) {
                    SALEAMOUNT = 0;
                    UNITPRICE = 0;
                    TAXAMOUNT = 0;
                } else {          
                    SALEAMOUNT = rate == 0 ? TOTALAMOUNT : Math.round(TOTALAMOUNT / (1 + (rate / 100)));
                    TAXAMOUNT = TOTALAMOUNT - SALEAMOUNT;
                    UNITPRICE = Math.round( (SALEAMOUNT / Quantity) *100) /100;
                        
                };
                break;
            case "SALEAMOUNT":
                UNITPRICE = obj['UNITPRICE'.toUpperCase()] || 0;
                TOTALAMOUNT = obj['TOTALAMOUNT'] || 0;
                SALEAMOUNT = obj.SALEAMOUNT;
                if (obj['SALEAMOUNT'] == 0) {
                    TOTALAMOUNT = 0;
                    SALEAMOUNT = 0;
                    UNITPRICE = 0;
                    TAXAMOUNT = 0;
                };
                if (obj.TOTALAMOUNT != 0 && obj.TAXAMOUNT !=0 && obj.UNITPRICE !=0) {
                    SALEAMOUNT = obj.SALEAMOUNT;
                    TAXAMOUNT = TOTALAMOUNT - SALEAMOUNT;
                } else {
                    TAXAMOUNT = rate == 0 ? obj['TAXAMOUNT'] : Math.round(SALEAMOUNT * rate / 100);
                    TOTALAMOUNT = SALEAMOUNT + TAXAMOUNT;
                    UNITPRICE = Math.round((SALEAMOUNT / Quantity) * 100) / 100;
                };
                break;
            case "TAXAMOUNT":
                UNITPRICE = obj['UNITPRICE'.toUpperCase()] || 0;
                TOTALAMOUNT = obj['TOTALAMOUNT'] || 0;
                TAXAMOUNT = obj.TAXAMOUNT;
                SALEAMOUNT = TOTALAMOUNT - TAXAMOUNT;
                break;
            default:
                UNITPRICE = obj['UNITPRICE'.toUpperCase()];
                SALEAMOUNT = Math.round(Quantity * UNITPRICE);
                TAXAMOUNT = rate == 0 ? 0 : Math.round(SALEAMOUNT * rate / 100);
                TOTALAMOUNT = SALEAMOUNT + TAXAMOUNT;
                break;
        };
        if (obj.SIGN == '-') {
            TOTALAMOUNT = TOTALAMOUNT * -1;
            SALEAMOUNT = SALEAMOUNT * -1;
            TAXAMOUNT = TAXAMOUNT * -1;
            UNITPRICE = UNITPRICE * -1;
        };

        return {
            TOTALAMOUNT: TOTALAMOUNT,
            SALEAMOUNT: SALEAMOUNT,
            TAXAMOUNT: TAXAMOUNT,
            UNITPRICE: UNITPRICE,
            QUANTITY: Quantity
        };
        
    }
    function caculateINVAmount(headerId) {
        var aTotal = 0, aSale = 0, aTax = 0;
        if (headerId.toUpperCase().indexOf('#') < 0) { headerId = '#' + headerId };
        $(this).jqxGrid('getboundrows').forEach(function (v) {
            aSale += v['SaleAmount'.toUpperCase()] || 0;
            aTotal += v['TotalAmount'.toUpperCase()] || 0;
            aTax += v['TaxAmount'.toUpperCase()] || 0;
            //var single = $.extend({}, v);
            //single.KIND = 'TotalAmount'.toUpperCase();
            //single.RATE = $('#' + headerId + 'txtRate').val();
            // var data = caculateSingelPrice(single);
        });



        $( headerId + "txtSaleAmount").val(aSale);
        $( headerId + "txtTaxAmount").val(aTax);
        $( headerId + "txtInvAmount").val(aTotal)
    };
    function clearMainInfo(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        $(headerId + "txtCustName").val('');        
        $(headerId + "txtInvTitle").val('');
        $(headerId + "txtBusinessId").jqxMaskedInput('clear');        
        $(headerId + "txtInvAddr").val('');
        $(headerId + "txtInstAddr").val('');
        $(headerId + "txtMailAddr").val('');        
        $(headerId + "txtZipCode").val('');
        $(headerId + "txtContmobile").jqxMaskedInput('clear');        
        $(headerId + "txtEmail").val('');
        
        
    };
    function txtCustIdChange(event, div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        $(options.dynGridId).jqxGrid('clear');
        clearMainInfo(div);
        caculateINVAmount.apply($(options.dynGridId), [headerId]);
    };
    function unHandler(div, action) {
        var headerId =  $(div).attr('id');
        
        
        $('#' + headerId + 'btnExit').off('click');
        $('#' + headerId + 'btnfindCust').off('click');
        $('#' + headerId + 'csInvUseId').off('selectedIndexChanged')
        $('#' + headerId + 'txtInvDate').off('blur');
        $('#' + headerId + 'txtCustId').off('blur');
        $('#' + headerId + 'txtCustId').off('change');
        $('#' + headerId + 'btnSave').off('click');
        $('#' + headerId + 'btndetailEdit').off('click');
        $('#' + headerId + 'btndetailDel').off('click');
        $('#' + headerId + 'txtCustId').off('blur');
        $('#' + headerId + 'btnINV099').off('click');
        $('#' + headerId + 'btnfindCust').off('click');
        $('#' + headerId + 'txtRate').off('valueChanged');
        $('[id^=' + $(div).attr('id') + 'rdoTax]').off('checked');
        $('#' + headerId + 'txtBusinessId').off('valueChanged');
        $('#' + headerId + 'txtBusinessId').off('blur');
        $('#' + headerId + 'csInvUseId').off('selectedIndexChanged');
        
        $('#' + headerId + 'btndetailAdd').off('click');
    };
    function txtRateValueChanged(options, headerId) {
        var grdrows = $(options.dynGridId).jqxGrid('getrows');
        if ($('#' + headerId + 'rdoTax1').jqxRadioButton('checked') == false) { return; };
        var len =  grdrows.length;
        for (var i = 0; i < len ; i++) {
            var grdrow = $(options.dynGridId).jqxGrid('getrowdata', i);
            grdrow.RATE = parseFloat($(this).jqxNumberInput('getDecimal'));
            grdrow.KIND = 'TOTALAMOUNT';
            var o = caculateSingelPrice(grdrow);
            for (var prop in o) {
                $(options.dynGridId).jqxGrid('setcellvalue', i , prop, o[prop]);
            };            
        };
        
        caculateINVAmount.apply($(options.dynGridId), [headerId]);
    }
    function btnfindCustClick(div, headerId,options) {
        if ($(this).jqxButton('disabled') == true) { return; }
        findClick = true;
        //if ($('#' + headerId + 'txtCustId').val() == '') {
        //    $(options.dynGridId).jqxGrid('clear');
        //    messageBox('請輸入客編', messageType.critical, null,
        //            function () {
        //                clearMainInfo(div);
        //                $('#' + headerId + 'txtCustId').jqxInput('focus')

        //            });
        //    return false;
        //};

        
        if (options.howtocreate != CreateMethodEnums.normal) {
            ShowSOCust(div, fillDataFromSO);
        } else {
            ShowSOCust(div, fillDataFromInv);
        };
            
        
        

    };
    function fillDataFromInv(div, r) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        unHandler(div);
        if (r.isSaved) {
            $(headerId + 'txtCustId').val(r.so138.CUSTID);
            $(headerId + 'txtCustName').val(r.so138.TITLESNAME);
            $(headerId + 'txtInvTitle').val(r.so138.TITLENAME);            
            $(headerId + 'txtBusinessId').val(r.so138.BUSINESSID);           
            $(headerId + 'txtInvAddr').val(r.so138.INVADDR);
            $(headerId + 'txtZipCode').val(r.so138.MZIPCODE);
            $(headerId + 'txtMailAddr').val(r.so138.MAILADDR);
        };
        addHandler(div);
    };
    function fillDataFromSO(div,r) {
        var options = $.data(div, formName).options;
        var headerId =  $(div).attr('id');
        var rows = [];
        var aSale = 0, aTax = 0, aTotal = 0;
        unHandler(div);
        try {
            if (r.isSaved) {
                $(options.dynGridId).jqxGrid({ selectedrowindex: 0 });

                $('#' + headerId + 'txtInvTitle').val(r.so138.INVTITLE || '');
                $('#' + headerId + 'txtCustId').val(r.so138.CUSTID);               
                $('#' + headerId + 'txtBusinessId').val(r.so138.INVNO || '');
                $('#' + headerId + 'chkEInv').jqxCheckBox({ checked: false });
                if (r.so138.INVOICEKIND === 1) {
                    $('#' + headerId + 'chkEInv').jqxCheckBox({ checked: true });
                };
                $('#' + headerId + 'txtInvAddr').val(r.so138['InvAddress'.toUpperCase()] || '');
                //$('#' + headerId + 'chkEInv').jqxCheckBox({ checked: r.so138.INVOICEKIND || 0 == 0 ? false : true });
                $("#" + headerId + "txtEmail").val(r.so138.EMAIL || '');
                $("#" + headerId + "txtMailAddr").val(r.so138.MAILADDRESS || '');
                $("#" + headerId + "txtInstAddr").val(r.so138.INSTADDRESS || '');
                $("#" + headerId + "txtContmobile").val(r.so138.TEL3 || '');
                $("#" + headerId + "txtCustName").val(r.so138.CUSTNAME || '');
                $("#" + headerId + "txtCarrierType").val(r.so138['CarrierTypeCode'.toUpperCase()] || '');
                $("#" + headerId + "txtCarrierId1").val(r.so138['CarrierId1'.toUpperCase()] || '');
                $("#" + headerId + "txtCarrierId2").val(r.so138['CarrierId2'.toUpperCase()] || '');
                $("#" + headerId + "txtA_CarrierId1").val(r.so138['A_CarrierId1'.toUpperCase()] || '');
                $("#" + headerId + "txtA_CarrierId2").val(r.so138['A_CarrierId2'.toUpperCase()] || '');
                $("#" + headerId + "txtLoveNum").val(r.so138['LoveNum'.toUpperCase()] || '');
                $("#" + headerId + 'txtZipCode').val(r.so138['ZipCode'.toUpperCase()] || '');
                if (r.so138['InvPurposeCode'.toUpperCase()]) {
                    $("#" + headerId + "csInvUseId").csList('codeNo', r.so138['InvPurposeCode'.toUpperCase()] || '');
                };
                if (r.so138['DENRECCODE'.toUpperCase()]) {
                    $("#" + headerId + "csGiveUnitId").csList('codeNo', r.so138['DENRECCODE'.toUpperCase()] || '');
                };
                switch (r.bill[0].TAXCODE) {
                    case 1:
                        if ($("#" + headerId + "rdoTax1").jqxRadioButton('checked') == false) {
                            $("#" + headerId + "rdoTax1").jqxRadioButton({ checked: true });
                        };
                        var RateChanged = false;
                        if ($("#" + headerId + "txtRate").val() != r.bill[0].RATE1) {
                            RateChanged = true;
                        };
                        $("#" + headerId + "txtRate").val(r.bill[0].RATE1 || 5);
                        if (RateChanged) {
                            txtRateValueChanged.apply($('#' + headerId + 'txtRate'), [options, headerId]);
                        };

                        break;
                    case 2:
                        if ($("#" + headerId + "rdoTax2").jqxRadioButton('checked') == false) {
                            $("#" + headerId + "rdoTax2").jqxRadioButton({ checked: true });
                            $("#" + headerId + "txtRate").val(0);
                        };
                        break;
                    case 3:
                        if ($("#" + headerId + "rdoTax3").jqxRadioButton('checked') == false) {
                            $("#" + headerId + "rdoTax3").jqxRadioButton({ checked: true });
                            $("#" + headerId + "txtRate").val(0);
                        };
                        break;
                    default:
                        if ($("#" + headerId + "rdoTax1").jqxRadioButton('checked') == false) {
                            $("#" + headerId + "rdoTax1").jqxRadioButton({ checked: true });
                        };
                        break;
                };
                var seq = $(options.dynGridId).jqxGrid('getrows').length == 0 ? 0 : Math.max(...$(options.dynGridId).jqxGrid('getrows').map(v=>v.SEQ));
                if (options.howtocreate != 4) {
                    $.each(r.bill, function (i, v) {
                        var calculatePrice = function (v, ret) {
                            var TOTALAMOUNT = v.SOURCE2 == 33 && v.UCCODE ? v.SHOULDAMT : v.REALAMT;
                            TOTALAMOUNT = TOTALAMOUNT || 0;
                            var rate = v.RATE1 || 0;
                            rate = v.TAXCODE == 1 ? rate || 5 : 0;
                            rate = v.TAXCODE == 1 ? rate / 100 : 0;

                            switch (ret) {
                                case 'UNITPRICE'.toUpperCase():
                                    var o = rate == 0 ? TOTALAMOUNT : Math.round(TOTALAMOUNT / (1 + rate))
                                    return v.SIGN == '+' ? o : o * -1
                                    break;
                                case 'SALEAMOUNT'.toUpperCase():
                                    var o = rate == 0 ? TOTALAMOUNT : Math.round(TOTALAMOUNT / (1 + rate))
                                    return v.SIGN == '+' ? o : o * -1
                                    break;
                                case 'TAXAMOUNT'.toUpperCase():
                                    var o = rate == 0 ? 0 : TOTALAMOUNT - Math.round(TOTALAMOUNT / (1 + rate))
                                    return v.SIGN == '+' ? o : o * -1
                                    break;
                                case 'TOTALAMOUNT'.toUpperCase():
                                    return v.SIGN == '+' ? TOTALAMOUNT : TOTALAMOUNT * -1
                                    break;
                            }
                        };
                        var o = {
                            IDENTIFYID1: '0',
                            IDENTIFYID2: 1,
                            INVID: $('#' + headerId + 'txtInvNo').val(),
                            BILLID: v.BILLNO,
                            BILLIDITEMNO: v.ITEM,
                            SEQ: seq + 100 + i,
                            STARTDATE: v.REALSTARTDATE,
                            ENDDATE: v.REALSTOPDATE,
                            ITEMID: v.CITEMCODE,
                            DESCRIPTION: v.CITEMNAME,
                            QUANTITY: 1,
                            TOTALAMOUNT: (v.SIGN || '+') == '+' ? parseFloat(calculatePrice(this, 'TOTALAMOUNT')) : parseFloat(calculatePrice(this, 'TOTALAMOUNT') * -1),
                            TAXCODE: v.TAXCODE,
                            TAXNAME: v.TAXNAME,
                            UNITPRICE: (v.SIGN || '+') == '+' ? parseFloat(calculatePrice(this, 'UNITPRICE')) : parseFloat(calculatePrice(this, 'UNITPRICE') * -1),
                            SALEAMOUNT: (v.SIGN || '+') == '+' ? parseFloat(calculatePrice(this, 'SALEAMOUNT')) : parseFloat(calculatePrice(this, 'SALEAMOUNT') * -1),
                            TAXAMOUNT: (v.SIGN || '+') == '+' ? parseFloat(calculatePrice(this, 'TAXAMOUNT')) : parseFloat(calculatePrice(this, 'TAXAMOUNT') * -1),
                            SERVICETYPE: v.SERVICETYPE,
                            CHARGEEN: v.CLCTNAME,
                            SIGN: v.SIGN || '+',
                            SOURCE: v.SOURCE2,
                            COMBCITEMCODE: v['COMBCITEMCODE'.toUpperCase()],
                            COMBCITEMNAME: v['COMBCITEMNAME'.toUpperCase()],
                            LINKTOMIS: v['LinkToMIS'.toUpperCase()],
                            CREDITCARD4D: null, //7972 cancel
                            FACISNO: v.SHOWFACI == 1 ? v.FACISNO : v.SERVICETYPE === 'P' ? v.FACISNO : null,
                            SMARTCARDNO: v.SHOWFACI == 1 ? v.SMARTCARDNO : null,
                            ACCOUNTNO: null, //7972 cancel
                            NEWADD: 1
                        };
                        aSale += o.SALEAMOUNT;
                        aTax += o.TAXAMOUNT;
                        //aTotal += o.TOTALAMOUNT;
                        rows.push(o)
                    });

                    $(options.dynGridId).jqxGrid('addrow', null, rows);
                    caculateINVAmount.apply($(options.dynGridId), [headerId]);
                };

            };
        } catch (err) {
            errorHandle(formName, 'fillDataFromSO', err);
        } finally {
            addHandler(div);
        };
        
        
    };
    function acceptEditOrInsDetail(mode, r, div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        if (mode == editMode.append) {
            //var newrow = generateRow(options.initData.INV008);
            r.inv008.SEQ = $(options.dynGridId).jqxGrid('getrows').length > 0 ? Math.max(...$(options.dynGridId).jqxGrid('getrows').map(v=>v.SEQ)) + 100 : 100;
            $(options.dynGridId).jqxGrid('addrow', null, r.inv008);
        } else {
            var clone008 = generateRow(options.initData.INV008);
            for (o in clone008) {
                $(options.dynGridId).jqxGrid('setcellvaluebyid', r.inv008.uid, o, r.inv008[o]);
            };
        };
        caculateINVAmount.apply($(options.dynGridId), [headerId]);
        //$(options.dynGridId).jqxGrid({ selectedrowindex: 0 });
    };
    function addHandler(div, action) {
        var options = $.data(div, formName).options;
        var headerId = $(div).attr('id');
        var d = $.Deferred();
        
        try {
            $('#' + headerId + 'btnExit').off('click');
            $('#' + headerId + 'btnExit').on('click', function (event) {             
                try {
                    if ($(this).jqxButton('disabled')) return;
                    if (options.containerIsWindow) {
                        if (options.editMode == editMode.view) {
                            options.closingOK = true;
                            if (options.containerIsWindow == true) {
                                $(options.container).csWindow('close');
                                return;
                            }
                        } else {
                            $(options.container).triggerHandler('winClosing');
                            return;
                        };
                        
                    };
                   
                    
                } catch (err) {
                    errorHandle(formName, 'btnExit', err);
                    
                };
            });

            $('#' + headerId + 'btndetailEdit').off('click');
            $('#' + headerId + 'btndetailEdit').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; };
                showINV1120A13.apply($(options.dynGridId), [div, editMode.edit, acceptEditOrInsDetail]);
            });
            $('#' + headerId + 'btndetailAdd').off('click');
            $('#' + headerId + 'btndetailAdd').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; };
                //showINV1120A13.apply($(options.dynGridId), [div, editMode.append, acceptEditOrInsDetail]);
                switch (options.howtocreate) {
                    case CreateMethodEnums.local:
                        btnfindCustClick.apply(this, [div, headerId, options]);
                        break;
                    case CreateMethodEnums.normal:
                        showINV1120A13.apply($(options.dynGridId), [div, editMode.append, acceptEditOrInsDetail]);
                        break;
                    default:
                        btnfindCustClick.apply(this, [div, headerId, options]);
                        break;
                };                
            });

            
            $('#' + headerId + 'btndetailDel').off('click');
            $('#' + headerId + 'btndetailDel').on('click', function () {
                if ($(this).jqxButton('disabled')) { return; };
                if ($(options.dynGridId).jqxGrid('getrows').length == 0) { return; }
                messageBox(options.language.DelAsk, messageType.yesno, null, function (flag) {
                    if (flag == 'yes') {
                        detailDelClick.apply($(options.dynGridId),[headerId]);
                    } else {
                        
                    };
                });
            });
                
            
            $('#' + headerId + 'btnSave').off('click');
            $('#' + headerId + 'btnSave').on('click', function () {
                if ($(this).jqxButton('disabled')) { return;}
                if (validateSave(div) == false) { return false; };
                if (scrTorcd(div) == false) { return false };
                Save(div);
            })
            $('#' + headerId + 'txtInvDate').off('blur');
            $('#' + headerId + 'txtInvDate').on('blur', function () {
                if ($(this).csDateTime('getText') == null) { return; };

                if ($(this).csDateTime('disabled')) {
                    return;
                } {
                    chkInvNo(div);

                };

            });           
            //$('#' + headerId + 'txtCustId').off('blur');
            //$('#' + headerId + 'txtCustId').on('blur', function (e) {
                
            //    if ($(this).val() == '') { return; }
                
            //    if (findClick) {
            //        findClick=false;
            //        return;
            //    };
                
            //    chkSOCustId(div);
            //})
            $('#' + headerId + 'txtCustId').off('change');
            $('#' + headerId + 'txtCustId').on('change', function (e) {
                txtCustIdChange.apply(this, [e, div]);
            });
            $('#' + headerId + 'btnINV099').off('click');
            $('#' + headerId + 'btnINV099').on('click', function () {
                INV099Click.apply(this, [div,headerId,options]);
               
            })
            $('[id^=' + $(div).attr('id') + 'rdoTax]').off('checked')
            $('[id^=' + $(div).attr('id') + 'rdoTax]').on('checked', function (event) {
                unHandler(div);
                $('#'+ headerId + 'txtRate').jqxNumberInput({ disabled: true })
                if (this.id == headerId + 'rdoTax1') {
                    $('#' + headerId + 'txtRate').jqxNumberInput({ disabled: false })
                    $('#' + headerId + 'txtRate').val('5.00');
                } else {
                    $('#' + headerId + 'txtRate').jqxNumberInput({ disabled: true })
                    $('#' + headerId + 'txtRate').val('0.00');

                };
                $('#' + headerId + 'txtSaleAmount').val(0);
                $('#' + headerId + 'txtTaxAmount').val(0);
                $('#' + headerId + 'txtInvAmount').val(0);
                $(options.dynGridId).jqxGrid('clear');
                addHandler(div);
            })
            $('#' + headerId + 'txtRate').off('valueChanged');
            $('#' + headerId + 'txtRate').on('valueChanged', function (event) {
                txtRateValueChanged.apply($(this),[options,headerId]);
            });
            $('#' + headerId + 'txtBusinessId').off('valueChanged')
            $('#' + headerId + 'txtBusinessId').on('valueChanged', function (event) {
                var value = event.args.value;
                
                if (value.length > 0) {
                    //$('#' + headerId + 'csInvUseId').csList('clearDisplayValue');
                    //$('#' + headerId + 'csInvUseId').csList('disabled', true);
                    $('#' + headerId + 'txtLoveNum').val('');
                    $('#' + headerId + 'csGiveUnitId').csList('disabled', true)
                    $('#' + headerId + 'csGiveUnitId').csList('clearDisplayValue');
                    $('#' + headerId + 'txtLoveNum').jqxInput({ disabled: true });
                    
                } else {
                    $('#' + headerId + 'txtLoveNum').jqxInput({ disabled: false });
                    $('#' + headerId + 'csGiveUnitId').csList('disabled', false);
                    $('#' + headerId + 'csGiveUnitId').csList('clearDisplayValue');

                };
                setCsInvUseId(div);

            });
            $('#' + headerId + 'txtBusinessId').off('blur');
            $('#' + headerId + 'txtBusinessId').on('blur', function (event) {
                if ($(this).val() == 0) { retun; };
                var result = invNoVerify($(this).val());
                if (!result[0]) {
                    messageBox(result[1], messageType.critical, null, function (flag) {
                        $('#' + headerId + 'txtBusinessId').jqxMaskedInput('focus');
                        //$(this).jqxMaskedInput('focus');
                        
                    });
                };
            })
            
            $('#' + headerId + 'csInvUseId').off('selectedIndexChanged');
            $('#' + headerId + 'csInvUseId').on('selectedIndexChanged', function (event) {
                $('#' + headerId + 'csGiveUnitId').csList('disabled', true)
                $('#' + headerId + 'txtLoveNum').jqxInput({ disabled: true })
                if ($(this).csList('codeNo') != '') {
                    if ($(this).csList('selectedItem').REFNO === 1) {
                        $('#' + headerId + 'csGiveUnitId').csList('disabled', false)
                        $('#' + headerId + 'txtLoveNum').jqxInput({ disabled: false })
                    } else {
                        $('#' + headerId + 'csGiveUnitId').csList('clearDisplayValue')
                        $('#' + headerId + 'txtLoveNum').val('');
                    }

                } else {
                    $('#' + headerId + 'csGiveUnitId').csList('clearDisplayValue')
                    $('#' + headerId + 'txtLoveNum').val('');
                }

            });
            $('#' + headerId + 'btnfindCust').off('click');
            $('#' + headerId + 'btnfindCust').on('click', function (e) {
                btnfindCustClick.apply(this, [div, headerId, options]);
                //if ($(this).jqxButton('disabled') == true) { return; }
                //findClick = true;
                //if ($('#' + headerId + 'txtCustId').val() == '') {
                //    $(options.dynGridId).jqxGrid('clear');
                //    messageBox('請輸入客編', messageType.critical, null,
                //            function () {
                //                clearMainInfo(div);
                //                $('#' + headerId + 'txtCustId').jqxInput('focus')
                                
                //            });
                //    return false;
                //};
                                
                //chkSOCustId(div)
                //.then(function (e) {
                //    ShowSOCust(e, function (r) {
                //        var rows = [];
                //        var aSale = 0, aTax = 0, aTotal = 0;

                        

                //        if (r.isSaved) {

                //            $(options.dynGridId).jqxGrid({ selectedrowindex: 0 });
                            
                //            $('#' + headerId + 'txtInvTitle').val(r.so138.INVTITLE || '');
                //            $('#' + headerId + 'txtBusinessId').val(r.so138.INVNO || '');
                //            $('#' + headerId + 'txtInvAddr').val(r.so138['InvAddress'.toUpperCase()] || '');
                //            //$('#' + headerId + 'chkEInv').jqxCheckBox({ checked: r.so138.INVOICEKIND || 0 == 0 ? false : true });
                //            $("#" + headerId + "txtEmail").val(r.so138.EMAIL || '');
                //            $("#" + headerId + "txtMailAddr").val(r.so138.MAILADDR || '');
                //            $("#" + headerId + "txtInstAddr").val(r.initData.SO001.rows[0].INSTADDRESS || '');
                //            $("#" + headerId + "txtContmobile").val(r.initData.SO001.rows[0].TEL3 || '');
                //            $("#" + headerId + "txtCustName").val(r.initData.SO001.rows[0].CUSTNAME || '');
                //            $("#" + headerId + "txtCarrierType").val(r.so138['CarrierTypeCode'.toUpperCase()] || '');
                //            $("#" + headerId + "txtCarrierId1").val(r.so138['CarrierId1'.toUpperCase()] || '');
                //            $("#" + headerId + "txtCarrierId2").val(r.so138['CarrierId2'.toUpperCase()] || '');
                //            $("#" + headerId + "txtA_CarrierId1").val(r.so138['A_CarrierId1'.toUpperCase()] || '');
                //            $("#" + headerId + "txtA_CarrierId2").val(r.so138['A_CarrierId2'.toUpperCase()] || '');
                //            $("#" + headerId + "txtLoveNum").val(r.so138['LoveNum'.toUpperCase()] || '');
                //            if (r.so138['InvPurposeCode'.toUpperCase()]) {
                //                $("#" + headerId + "csInvUseId").csList('codeNo', r.so138['InvPurposeCode'.toUpperCase()] || '');
                //            };
                //            if (r.so138['DENRECCODE'.toUpperCase()]) {
                //                $("#" + headerId + "csGiveUnitId").csList('codeNo', r.so138['DENRECCODE'.toUpperCase()] || '');
                //            };
                //            switch (r.bill[0].TAXCODE) {
                //                case 1:
                //                    if ($("#" + headerId + "rdoTax1").jqxRadioButton('checked') == false) {
                //                        $("#" + headerId + "rdoTax1").jqxRadioButton({ checked: true });
                //                    };
                //                    var RateChanged = false;
                //                    if ($("#" + headerId + "txtRate").val() != r.bill[0].RATE1) {
                //                        RateChanged = true;                                        
                //                    };
                //                    $("#" + headerId + "txtRate").val(r.bill[0].RATE1 || 5);
                //                    if (RateChanged) {
                //                        txtRateValueChanged.apply($('#' + headerId + 'txtRate'), [options, headerId]);
                //                    };
                                    
                //                    break;
                //                case 2:
                //                    if ($("#" + headerId + "rdoTax2").jqxRadioButton('checked') == false) {
                //                        $("#" + headerId + "rdoTax2").jqxRadioButton({ checked: true });
                //                    };
                //                    break;
                //                case 3:
                //                    if ($("#" + headerId + "rdoTax3").jqxRadioButton('checked') == false) {
                //                        $("#" + headerId + "rdoTax3").jqxRadioButton({ checked: true });
                //                    };
                //                    break;
                //                default:
                //                    if ($("#" + headerId + "rdoTax1").jqxRadioButton('checked') == false) {
                //                        $("#" + headerId + "rdoTax1").jqxRadioButton({ checked: true });
                //                    };
                //                    break;
                //            };
                //            var seq = $(options.dynGridId).jqxGrid('getrows').length == 0 ? 0 : Math.max(...$(options.dynGridId).jqxGrid('getrows').map(v=>v.SEQ));
                //            $.each(r.bill, function (i, v) {
                //                var calculatePrice = function (v, ret) {
                //                    var TOTALAMOUNT = v.SOURCE2 == 33 && v.UCCODE ? v.SHOULDAMT : v.REALAMT;
                //                    TOTALAMOUNT = TOTALAMOUNT || 0;
                //                    var rate = v.RATE1 || 0;
                //                    rate = v.TAXCODE == 1 ? rate || 5 : 0;
                //                    rate = v.TAXCODE == 1 ? rate / 100 : 0;

                //                    switch (ret) {
                //                        case 'UNITPRICE'.toUpperCase():
                //                            var o = rate == 0 ? TOTALAMOUNT : Math.round(TOTALAMOUNT / (1 + rate))
                //                            return v.SIGN == '+' ? o : o * -1
                //                            break;
                //                        case 'SALEAMOUNT'.toUpperCase():
                //                            var o = rate == 0 ? TOTALAMOUNT : Math.round(TOTALAMOUNT / (1 + rate))
                //                            return v.SIGN == '+' ? o : o * -1
                //                            break;
                //                        case 'TAXAMOUNT'.toUpperCase():
                //                            var o = rate == 0 ? 0 : TOTALAMOUNT - Math.round(TOTALAMOUNT / (1 + rate))
                //                            return v.SIGN == '+' ? o : o * -1
                //                            break;
                //                        case 'TOTALAMOUNT'.toUpperCase():
                //                            return v.SIGN == '+' ? TOTALAMOUNT : TOTALAMOUNT * -1
                //                            break;
                //                    }
                //                };
                //                var o = {
                //                    IDENTIFYID1: '0',
                //                    IDENTIFYID2: 1,
                //                    INVID: $('#' + headerId + 'txtInvNo').val(),
                //                    BILLID: v.BILLNO,
                //                    BILLIDITEMNO: v.ITEM,
                //                    SEQ: seq + 1 + i,
                //                    STARTDATE: v.REALSTARTDATE,
                //                    ENDDATE: v.REALSTOPDATE,
                //                    ITEMID: v.CITEMCODE,
                //                    DESCRIPTION: v.CITEMNAME,
                //                    QUANTITY: 1,
                //                    TOTALAMOUNT: (v.SIGN || '+') == '+' ? parseFloat( calculatePrice(this, 'TOTALAMOUNT') ):parseFloat( calculatePrice(this, 'TOTALAMOUNT') * -1),
                //                    TAXCODE: v.TAXCODE,
                //                    TAXNAME: v.TAXNAME,
                //                    UNITPRICE: (v.SIGN || '+') == '+' ? parseFloat(calculatePrice(this, 'UNITPRICE')) : parseFloat(calculatePrice(this, 'UNITPRICE') * -1),
                //                    SALEAMOUNT: (v.SIGN || '+') == '+' ? parseFloat(calculatePrice(this, 'SALEAMOUNT')) : parseFloat(calculatePrice(this, 'SALEAMOUNT') * -1),
                //                    TAXAMOUNT: (v.SIGN || '+') == '+' ?parseFloat( calculatePrice(this, 'TAXAMOUNT')) :parseFloat( calculatePrice(this, 'TAXAMOUNT') * -1),
                //                    SERVICETYPE: v.SERVICETYPE,
                //                    CHARGEEN: v.CLCTNAME,
                //                    SIGN: v.SIGN || '+',
                //                    SOURCE: v.SOURCE2,
                //                    COMBCITEMCODE: v['COMBCITEMCODE'.toUpperCase()],
                //                    COMBCITEMNAME: v['COMBCITEMNAME'.toUpperCase()],
                //                    LINKTOMIS: v['LinkToMIS'.toUpperCase()],
                //                    CREDITCARD4D: null, //7972 cancel
                //                    FACISNO: v.SHOWFACI == 1 ? v.FACISNO : v.SERVICETYPE === 'P' ? v.FACISNO : null,
                //                    SMARTCARDNO: v.SHOWFACI == 1 ? v.SMARTCARDNO : null,
                //                    ACCOUNTNO: null, //7972 cancel
                //                    NEWADD: 1
                //                };
                //                aSale += o.SALEAMOUNT;
                //                aTax += o.TAXAMOUNT;
                //                //aTotal += o.TOTALAMOUNT;
                //                rows.push(o)
                //            });
                           

                //            $(options.dynGridId).jqxGrid('addrow', null, rows);
                //            caculateINVAmount.apply($(options.dynGridId), [headerId]);
                //        };
                //    });
                //})
                //.fail(function () {
                //    clearMainInfo(div);
                //    //$(options.dynGridId).jqxGrid('clear');
                //})
                
                
               
            });
            
            
            return d.resolve(div)
        } catch (err) {
            errorHandle(formName, 'addHandler', err);
            return d.reject('addHandler');
        } finally {

        }
    };
    function refreshInv008(r) {

    }
    function formLoaded(div) {
        try {
            var options = $.data(div, formName).options;
            //copyLoginInfo = getParaLoginInfo(div, formName);
            try {
                var options = $.data(div, formName).options;
                loadForm(options,
                    'INV1000\\' + formName + '.html',
                    function (msg) {
                        try {
                            $(div).html(msg);
                            changeElementId(div);
                            
                            initData(div,  function () {
                                if ($(options.container).attr('class').indexOf('jqx-window') > 0) {
                                    options.containerIsWindow = true;
                                    var csw = $.data(div, formName).options.container;
                                    
                                        csw.on("winClosing", function () {
                                            if (options.editMode == editMode.view) {
                                                options.closingOK = true;
                                                csw.csWindow('close');
                                                return;
                                            };
                                            messageBox(options.language.QuitAsk, messageType.yesno, null, function (flag) {
                                                if (flag == 'yes') {
                                                    options.closingOK = true;
                                                    options.isSaved = false;
                                                    csw.csWindow('close');

                                                } else {
                                                    // changeMode(div, options.editMode);
                                                };
                                            });
                                        });
                                    
                                };
                                $(div).triggerHandler('loaded', [this, options]);
                            });
                        }
                        catch (err) {
                            errorHandle(formName, 'formLoaded_success', err);
                        }
                    });
                
            }
            catch (err) {
                errorHandle(formName, 'formLoaded', err);
            }


           
        }
        catch (err) {
            errorHandle(formName, 'formLoaded', err);
        }
    };
    function chkSOCustId(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).prop('id');
        var loginInfo = getParaLoginInfo(div, formName);
        var d = $.Deferred();
        if ($(headerId + 'txtCustId').val() == false) { return d.resolve(div); };

        try {
           

            var parameters = $.extend({}, loginInfo,
                    { custid: { type: 'string', value: $(headerId + 'txtCustId').val() } });


            var params = getParameters(riadllName,
                   riaClassName,
                   'QuerySOCustId',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            // options.initData = null;
                            //options.initData = {};
                            //$.extend(options.initData, tmp)
                            if (tmp.SO001) {
                                if (tmp.SO001.rows.length > 0) {
                                    $(headerId + 'txtCustName').val(tmp.SO001.rows[0].CUSTNAME)
                                    d.resolve(div);
                                } else {
                                    messageBox(options.language.noCustIdQuery, messageType.critical, null,
                                      function () {
                                          $(headerId + 'txtCustName').val('');

                                      });
                                    return d.reject('NO CustId')
                                }

                            } else {
                                return d.reject('NO CustId')
                            }


                            if (typeof act === 'function') { act() }
                            //setCsInvUseId(div);



                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            return d.reject('chkSOCustId')
                            //changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'chkSOCustId-Server', err);
                        return d.reject('chkSOCustId')
                        //changeMode(div, options.editMode);
                    } finally {
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };

                }
            });
            return d.promise();

        } catch (err) {
            errorHandle(formName, 'chkSOCustId', err);
            return d.reject('chkSOCustId');
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function Save(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);
        var d = $.Deferred();
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');

            var parameters = $.extend({}, loginInfo,
                    { EditMode: { type: 'integer', value: options.editMode } },
                    { ds: { type: 'string', value: options.scrData } });


            var params = getParameters(riadllName,
                   riaClassName,
                   'Save',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            if (data.ResultBoolean) {
                                options.isSaved = true;
                                if (typeof act === 'function') { act() }
                                if (data.Message) {
                                    messageBox(data.Message, messageType.information, null, function () {
                                        options.editMode = editMode.view;
                                        $(options.container).triggerHandler('winClosing');
                                        $(div).triggerHandler('close');

                                    });
                                    return;
                                } else {
                                    options.editMode = editMode.view;
                                    $(options.container).triggerHandler('winClosing');
                                    return;
                                };
                            };
                          
              

                            return d.resolve(div);

                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            options.isSaved = false;
                            return d.reject('Save')
            
                        }
                    } catch (err) {
                        errorHandle(formName, 'Save-Server', err);
                        return d.reject('Save')
            
                    } finally {
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };

                }
            });
            return d.promise();

        } catch (err) {
            errorHandle(formName, 'Save', err);
            return d.reject('Save');
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function QueryData(div, act) {
        var loginInfo = getParaLoginInfo(div, formName);
        var d = $.Deferred();
        try {           
            var options = $.data(div, formName).options;           
            var headerId = '#' + $(div).prop('id');

            var parameters = $.extend({}, loginInfo,
                    { EditMode: { type: 'integer', value: options.editMode } },
                    { InvId: { type: 'string', value: options.InvId } });
                   

            var params = getParameters(riadllName,
                   riaClassName,
                   'QueryData',
                   JSON.stringify(parameters));
            getServerData(params, {
                success: function (data) {
                    try {
                        if (data.ErrorCode == 0) {
                            var tmp = JSON.parse(data.ResultXML);
                            options.initData = null;
                            options.initData = {};
                            $.extend(options.initData, tmp)
                            
                            $(headerId + 'csGiveUnitId').csList('source',options.initData['INV041'].rows)
                            
                            if (typeof act === 'function') {act()}
                            //setCsInvUseId(div);

                            return d.resolve(div);
                                                    
                        }
                        else {
                            messageBox(data.ErrorMessage, messageType.critical);
                            return d.reject('QueryData')
                            //changeMode(div, options.editMode);
                        }
                    } catch (err) {
                        errorHandle(formName, 'QueryData-Server', err);
                        return d.reject('QueryData')
                        //changeMode(div, options.editMode);
                    } finally {                        
                        params = null;
                        parameters = null;
                        data = null;
                        delete data;
                        delete parameters;
                        delete param;
                    };
                    
                }
            });
            return d.promise();
            
        } catch (err) {
            errorHandle(formName, 'QueryData', err);
            return d.reject('QueryData');
        } finally {
            loginInfo = null;
            delete loginInfo;
        }
    };
    function renderDynmicGrid(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var d = $.Deferred();
        try {
            $(headerId + 'iSec_1').on('loaded', function () {
                try {
                    var o = $(this).dynamicGrid('getControl');
                    options.dynGridId = '#' + $(this).dynamicGrid('getControl').name;
                    $(options.dynGridId).jqxGrid('hidecolumn', 'TAXCODE');
                    $(options.dynGridId).jqxGrid('hidecolumn', 'SOURCE')
                    $(options.dynGridId).jqxGrid('hidecolumn', 'COMBCITEMCODE');
                    $(options.dynGridId).jqxGrid('hidecolumn', 'COMBCITEMNAME');
                    $(options.dynGridId).jqxGrid('hidecolumn', 'CREDITCARD4D');
                    $(options.dynGridId).jqxGrid('hidecolumn', 'ACCOUNTNO');
                    $(options.dynGridId).jqxGrid('hidecolumn', 'SEQ');
                    $(options.dynGridId).jqxGrid('hidecolumn', 'NEWADD');
                   
                    if (typeof act === 'function') {
                        act();
                    }
                  return    d.resolve(div)
                } catch (err) {
                  return   d.reject('renderDynmicGrid--Loaded')
                }
               
            })
            var cloneIniData = $.extend(true, {}, options.initData)
            if (cloneIniData.INV007.rows.length === 0) {
                cloneIniData.INV007.rows.push({INVID:options.InvId})
            }
            $(headerId + 'iSec_1').dynamicGrid({
                loginInfo: $.extend(true, {}, options.loginInfo),
                container: $(headerId + 'iSec_1'),
                width: $(headerId + 'iSec_1').width() - 10,
                height: $(headerId + 'iSec_1').height() - 10,
                sysProgramId: 'INV1120A1',
                parentData:cloneIniData,
                localization: options.localization,
            });
            return d.promise();
        } catch (err) {
            errorHandle(formName, 'renderDynmicGrid', err);
           return   d.reject('renderDynmicGrid')
        } finally {
            
        }
        
        
      
    }
    function lockMasterControl(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
    }
    function changeMode(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var lang = options.language;
        var d = $.Deferred();


        try {
            $(headerId + 'chkEInv').jqxCheckBox({ disabled: false });
            $(headerId + 'csInvUseId').csList('disabled', false);
            $(headerId + 'csGiveUnitId').csList('disabled', false);
            $(headerId + 'txtLoveNum').jqxInput({ disabled: false });
            $(headerId + 'txtBusinessId').jqxMaskedInput({ disabled: false })
            switch (options.editMode) {
                case editMode.append:
                    $(headerId + 'txtEditMode').text(lang.stateAdd);
                    $(headerId + 'txtInvDate').csDateTime({ disabled: false })
                    $(headerId + 'txtCustId').jqxInput({ disabled: false })
                    $(headerId + 'txtCustName').jqxInput({ disabled: false })
                    $(headerId + 'txtInvTitle').jqxInput({ disabled: false })

                    $(headerId + "txtInvAddr").jqxInput({ disabled: false })
                    $(headerId + "txtChargeDate").csDateTime({ disabled: false })
                    $(headerId + 'txtMailAddr').jqxInput({ disabled: false });
                    $(headerId + 'txtZipCode').jqxInput({ disabled: false });
                    $(headerId + 'txtInstAddr').jqxInput({ disabled: false });
                    $(headerId + 'txtMemo1').jqxInput({ disabled: false });
                    $(headerId + 'txtMemo2').jqxInput({ disabled: false });
                    $('[id^=' + $(div).attr('id') + 'rdoTax]').jqxRadioButton({ disabled: false });
                    $(headerId + 'txtContmobile').jqxMaskedInput({ disabled: false });
                    $(headerId + 'txtEmail').jqxInput({ disabled: false });
                    $(headerId + 'txtRate').jqxNumberInput({ disabled: false });
                    if ($(options.dynGridId).jqxGrid('getrows').length == 0) {
                        $(headerId + 'txtRate').val('5.00');
                    
                    };
                    //$(headerId + 'txtRate').val($(headerId + 'rdoTax1').jqxCheckBox('checked') ? '5.00' : '0');                    
                    $(headerId + 'txtLoveNum').jqxInput({ disabled: false });
                    $(headerId + 'btndetailDel').jqxButton({ disabled: false });
                    $(headerId + 'btndetailAdd').jqxButton({ disabled: false });
                    $(headerId + 'btndetailEdit').jqxButton({ disabled: false });
                    $(headerId + 'btnfindCust').jqxButton({ disabled: false });
                    $(headerId + 'btnINV099').jqxButton({ disabled: false });
                    $(headerId + 'btnSave').jqxButton({ disabled: false });

                    break;
                case editMode.edit:
                    $(headerId + 'txtEditMode').text(lang.stateEdit);
                    $(headerId + 'btnINV099').jqxButton({ disabled: true });
                    $(headerId + 'txtCustName').jqxInput({ disabled: false })
                    $(headerId + 'btnfindCust').jqxButton({ disabled: false });

                    $(headerId + 'btndetailDel').jqxButton({ disabled: false });
                    $(headerId + 'btndetailAdd').jqxButton({ disabled: false });
                    $(headerId + 'btndetailEdit').jqxButton({ disabled: false });
                    $(headerId + 'btnSave').jqxButton({ disabled: false });

                    $(headerId + 'txtBusinessId').jqxMaskedInput({ disabled: false });
                    $(headerId + "txtInvAddr").jqxInput({ disabled: false })
                    $(headerId + "txtChargeDate").csDateTime({ disabled: false });
                    $(headerId + 'txtMailAddr').jqxInput({ disabled: false })
                    $(headerId + 'txtZipCode').jqxInput({ disabled: false })
                    $(headerId + 'txtInstAddr').jqxInput({ disabled: false })
                    $(headerId + 'txtMemo1').jqxInput({ disabled: false })
                    $(headerId + 'txtMemo2').jqxInput({ disabled: false })
                    $(headerId + 'csGiveUnitId').csList('disabled', false);
                    $(headerId + 'csInvUseId').csList('disabled', false);
                    //               $('[id^=' + $(div).attr('id') + 'rdoTax]').jqxRadioButton({ disabled: false });
                    $(headerId + 'txtContmobile').jqxMaskedInput({ disabled: false })
                    $(headerId + 'txtEmail').jqxInput({ disabled: false });
                    $(headerId + 'txtLoveNum').jqxInput({ disabled: false });

                    break;
                case editMode.view:
                    $(headerId + 'txtEditMode').text(lang.stateView);
                    $(headerId + 'chkEInv').jqxCheckBox({ disabled: true });
                    $(headerId + 'csInvUseId').csList('disabled', true);
                    $(headerId + 'csGiveUnitId').csList('disabled', true);
                    $(headerId + 'txtLoveNum').jqxInput({ disabled: true });
                    $(headerId + 'txtBusinessId').jqxMaskedInput({ disabled: true });
                    break;
            };

            //if ($(headerId + 'txtDestroyUploadTime').csDateTime('getDate')) {
            //    if ($(headerId + 'txtDestroyUploadTime').csDateTime('getDate') >( $(headerId + 'txtUploadTime').csDateTime('getDate') || null)) {
            //        if ($(headerId + 'txtDestroyUploadTime').csDateTime('getDate') > ($(headerId + 'txtlblPrintTime').csDateTime('getDate') || null) ) {

            //        };
            //    };

            //};

            if ($(headerId + 'txtInvFormat').val()) {
                if ($(headerId + 'txtInvFormat').val() != lang.InvFormat1) {
                    $(headerId + 'chkEInv').jqxCheckBox({ disabled: true });
                };
            };

            if ($(headerId + 'txtInvFormat').val() == lang.InvFormat3) {
                $(headerId + 'txtBusinessId').jqxMaskedInput({ disabled: false });
            };

            if ($(headerId + 'chkEInv').jqxCheckBox('checked')) {
                $(headerId + 'txtBusinessId').jqxMaskedInput({ disabled: true });
                $(headerId + 'txtBusinessId').jqxMaskedInput('clear');
            }
            if ($(headerId + 'chkUploadFlag').jqxCheckBox('checked')) {
                $(headerId + 'txtBusinessId').jqxMaskedInput({ disabled: true });
                $(headerId + 'txtBusinessId').jqxMaskedInput('clear');
                $(headerId + 'csInvUseId').csList('disabled', true);
                $(headerId + 'csGiveUnitId').csList('disabled', true);
                $(headerId + 'txtLoveNum').jqxInput({ disabled: true });
            };
            if ($(headerId + 'txtBusinessId').val()) {
                $(headerId + 'csGiveUnitId').csList('disabled', true);
                $(headerId + 'txtLoveNum').jqxInput({ disabled: true });
                $(headerId + 'csGiveUnitId').csList('clear');
                // $(headerId + 'csInvUseId').csList('clear');
                //$(headerId + 'csInvUseId').csList('disabled', true);
                $(headerId + 'txtLoveNum').val('');
            };
            if ($(headerId + 'txtUploadTime').csDateTime('getDate')) {
                $(headerId + 'csInvUseId').csList('disabled', true);
                $(headerId + 'csGiveUnitId').csList('disabled', true);
                $(headerId + 'txtLoveNum').jqxInput({ disabled: true });
                $(headerId + 'txtBusinessId').jqxMaskedInput({ disabled: true })
            };
            if ($(headerId + 'chkUploadFlag').jqxCheckBox('checked') || $(headerId + 'chkObUploadFlag').jqxCheckBox('checked')) {
                $(headerId + 'btndetailDel').jqxButton({ disabled: true });
                $(headerId + 'btndetailEdit').jqxButton({ disabled: true });
                $(headerId + 'btndetailDel').jqxButton({ disabled: true });
                $(headerId + 'txtLoveNum').jqxInput({ disabled: true });
                $(headerId + 'chkEInv').jqxCheckBox({ disabled: true });
                $(headerId + 'txtBusinessId').jqxMaskedInput({ disabled: true });
                $(headerId + 'txtChargeDate').csDateTime({ disabled: true });

            };
            if ($(headerId + "txtUploadTime").csDateTime('getDate')) {
                $(headerId + 'csInvUseId').csList('disabled', true);
                $(headerId + 'csGiveUnitId').csList('disabled', true);
                $(headerId + 'txtLoveNum').jqxInput({ disabled: true });
            };





            return d.resolve(div);
        } catch (err) {
            errorHandle(formName, 'changeMode', err);
            return d.reject('changeMode');
        };
    };
    function showCurrency(num) {
        if (num == null) { return null; };
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    function rcdToscr(div, act) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var d = $.Deferred();
        try {
            var ds = $(headerId + 'iSec_1').dynamicGrid('getRows', true);
            for (prop in ds) {
                console.log(prop);
            };


            if (options.editMode == editMode.append) {
                if (options.refNo == 4) {
                    $(headerId + 'txtHowToCreate').val(options.language.HowtoCreate4);
                } else {
                    $(headerId + 'txtHowToCreate').val(options.language.HowtoCreate3);
                }
                
                $(headerId + 'txtIsObsolete').val(options.language.scrNo);
                $(headerId + 'txtCanModify').val(options.language.scrYes)
                $(headerId + 'txtPrintCount').val('0')
                $(headerId + 'txtSaleAmount').val('0')
                $(headerId + 'txtTaxAmount').val('0')
                $(headerId + 'txtMainSaleAmount').val('0')
                $(headerId + 'txtMainTaxAmount').val('0')
                $(headerId + 'txtMainInvAmount').val('0')
                $(headerId + 'txtInvAmount').val('0')
                $(headerId + 'txtInvDate').csDateTime('setDate', new Date())
            } else {
                if (options.initData.INV007.rows.length > 0) {
                    $(headerId + 'txtInvNo').val(options.initData.INV007.rows[0].INVID)
                    $(headerId + 'txtMainInvNo').val(options.initData.INV007.rows[0].MAININVID)
                    switch (options.initData.INV007.rows[0]['InvFormat'.toUpperCase()]) {
                        case '1':
                            $(headerId + 'txtInvFormat').val(options.language.InvFormat1);
                            break;
                        case '2':
                            $(headerId + 'txtInvFormat').val(options.language.InvFormat2);
                            break;
                        case '3':
                            $(headerId + 'txtInvFormat').val(options.language.InvFormat3);
                            break;                      
                    }
                    $(headerId + 'chkDEPOSITMK').jqxCheckBox({ checked: options.initData.INV007.rows[0].DEPOSITMK == 'Y' ? true : false });
                     
                    switch (options.initData.INV007.rows[0]['HOWTOCREATE'.toUpperCase()]) {
                        case '1':
                            $(headerId + 'txtHowToCreate').val(options.language.HowtoCreate1);
                            break;
                        case '2':
                            $(headerId + 'txtHowToCreate').val(options.language.HowtoCreate2);
                            break;
                        case '3':
                            $(headerId + 'txtHowToCreate').val(options.language.HowtoCreate3);
                            break;
                        case '4':
                            $(headerId + 'txtHowToCreate').val(options.language.HowtoCreate4);
                            break;
                    }
                    $(headerId + 'txtInvDate').csDateTime('setDate', options.initData.INV007.rows[0]['InvDate'.toUpperCase()])
                    $(headerId + 'txtCustId').val(options.initData.INV007.rows[0]['CUSTID'])
                    $(headerId + 'txtCustName').val(options.initData.INV007.rows[0]['CUSTSNAME'])
                    $(headerId + 'txtInvTitle').val(options.initData.INV007.rows[0]['INVTITLE'])
                    $(headerId + 'txtBusinessId').val(options.initData.INV007.rows[0]['BusinessId'.toUpperCase()])
                    $(headerId + 'txtIsObsolete').val(options.language.scrNo)
                    if (options.initData.INV007.rows[0]['IsObsolete'.toUpperCase()] === 'Y') {
                        $(headerId + 'txtIsObsolete').val(options.language.scrYes)
                    }
                    
                    $(headerId + 'txtInvAddr').val(options.initData.INV007.rows[0]['InvAddr'.toUpperCase()])
                    if (options.initData.INV007.rows[0]['CHARGEDATE'.toUpperCase()]) {
                        $(headerId + 'txtChargeDate').csDateTime('setDate', options.initData.INV007.rows[0]['ChargeDate'.toUpperCase()])
                    }
                    $(headerId + 'txtObsoleteReason').val(options.initData.INV007.rows[0]['ObsoleteReason'.toUpperCase()])
                    $(headerId + 'txtMailAddr').val(options.initData.INV007.rows[0]['MailAddr'.toUpperCase()])
                    $(headerId + 'txtZipCode').val(options.initData.INV007.rows[0]['ZipCode'.toUpperCase()])
                    $(headerId + 'txtDestroyReason').val(options.initData.INV007.rows[0]['DestroyReason'.toUpperCase()])
                    $(headerId + 'txtInstAddr').val(options.initData.INV007.rows[0]['InstAddr'.toUpperCase()])
                    $(headerId + 'txtPrintCount').val(options.initData.INV007.rows[0]['PrintCount'.toUpperCase()])
                    $(headerId + 'txtCanModify').val(options.language.scrNo)
                    if (options.initData.INV007.rows[0]['CanModify'.toUpperCase()] === 'Y') {
                        $(headerId + 'txtCanModify').val(options.language.scrYes)
                    }
                    
                    $(headerId + 'txtMemo1').val(options.initData.INV007.rows[0]['Memo1'.toUpperCase()])
                    $(headerId + 'txtSaleAmount').val(showCurrency(options.initData.INV007.rows[0]['SaleAmount'.toUpperCase()] || 0));
                    $(headerId + 'txtTaxAmount').val(showCurrency(options.initData.INV007.rows[0]['TaxAmount'.toUpperCase()] || 0));
                    $(headerId + 'txtMainSaleAmount').val(showCurrency(options.initData.INV007.rows[0]['MainSaleAmount'.toUpperCase()] || 0));
                    $(headerId + 'txtMainTaxAmount').val(showCurrency(options.initData.INV007.rows[0]['MainTaxAmount'.toUpperCase()] || 0));
                    $(headerId + 'txtMainInvAmount').val(showCurrency(options.initData.INV007.rows[0]['MainInvAmount'.toUpperCase()] || 0));
                    $(headerId + 'txtInvAmount').val(showCurrency(options.initData.INV007.rows[0]['InvAmount'.toUpperCase()] || 0));
                    $(headerId + 'txtMemo2').val(options.initData.INV007.rows[0]['Memo2'.toUpperCase()])
                    switch ( options.initData.INV007.rows[0].TAXTYPE) {
                        case '3': $(headerId + 'rdoTax3').jqxRadioButton({ checked: true }); break;
                        case '2': $(headerId + 'rdoTax2').jqxRadioButton({ checked: true }); break;
                        case '1': $(headerId + 'rdoTax1').jqxRadioButton({ checked: true }); break;
                    }
                    $(headerId + 'txtRate').val(options.initData.INV007.rows[0]['TaxRate'.toUpperCase()])
                    $(headerId + 'txtContmobile').val(options.initData.INV007.rows[0]['Contmobile'.toUpperCase()])
                    $(headerId + 'txtEmail').val(options.initData.INV007.rows[0]['Email'.toUpperCase()])
                   
                    $(headerId + 'chkPrizeType').jqxCheckBox({ checked:false});
                    if (options.initData.INV007.rows[0]['PrizeType'.toUpperCase()]) {
                        $(headerId + 'chkPrizeType').jqxCheckBox({ checked: true });
                    };
                    $(headerId + 'chkAutoUploadFlag').jqxCheckBox({ checked: options.initData.INV007.rows[0]['AutoUploadFlag'.toUpperCase()] === 1 })
                    $(headerId + 'chkFIXFlag').jqxCheckBox({ checked: options.initData.INV007.rows[0]['FIXFlag'.toUpperCase()] === 1 })
                    $(headerId + 'chkUploadFlag').jqxCheckBox({ checked: options.initData.INV007.rows[0]['UploadFlag'.toUpperCase()] === 1 })
                    $(headerId + 'chkDestroyFlag').jqxCheckBox({ checked: options.initData.INV007.rows[0]['DestroyFlag'.toUpperCase()] === 1 })
                    $(headerId + 'chkObUploadFlag').jqxCheckBox({ checked: options.initData.INV007.rows[0]['ObUploadFlag'.toUpperCase()] === 1 })
                    $(headerId + 'chkEInv').jqxCheckBox({ checked: options.initData.INV007.rows[0]['InvoiceKind'.toUpperCase()] === 1 })
                    if (options.initData.INV007.rows[0]['PRIZEFILE'.toUpperCase()]) {
                        $(headerId + 'txtPrizeFileFirst').val(options.initData.INV007.rows[0]['PRIZEFILE'.toUpperCase()].toString().substr(0, 1));
                    } else {
                        $(headerId + 'txtPrizeFileFirst').val('');
                    };
                    
                    $(headerId + 'txtLoveNum').val(options.initData.INV007.rows[0]['LoveNum'.toUpperCase()])
                    if (options.initData.INV007.rows[0]['CreateInvDate'.toUpperCase()]) {
                        $(headerId + 'txtCreateInvDate').csDateTime('setDate', options.initData.INV007.rows[0]['CreateInvDate'.toUpperCase()])
                    }
                    if (options.initData.INV007.rows[0]['DATATYPE'.toUpperCase()]) {
                        switch (options.initData.INV007.rows[0]['DATATYPE'.toUpperCase()].toUpperCase()) {
                            case 'X':
                                $(headerId + 'txtDataType').val(options.language.DATATYPEX);
                                break;
                            case 'A':
                                $(headerId + 'txtDataType').val(options.language.DATATYPEA);
                                break;
                            case 'B':
                                $(headerId + 'txtDataType').val(options.language.DATATYPEB);
                                break;
                            case 'Y':
                                $(headerId + 'txtDataType').val(options.language.DATATYPEY);
                                break;
                        };




                    };

                    if (options.initData.INV007.rows[0]['PrintTime'.toUpperCase()]) {
                        $(headerId + 'txtlblPrintTime').csDateTime('setDate', options.initData.INV007.rows[0]['PrintTime'.toUpperCase()])
                    }
                    if (options.initData.INV007.rows[0]['UploadTime'.toUpperCase()]) {
                        $(headerId + 'txtUploadTime').csDateTime('setDate', options.initData.INV007.rows[0]['UploadTime'.toUpperCase()])
                    }
                    if (options.initData.INV007.rows[0]['OBUPLOADTIME'.toUpperCase()]) {
                        $(headerId + 'txtOBUPLOADTIME').csDateTime('setDate', options.initData.INV007.rows[0]['OBUPLOADTIME'.toUpperCase()])
                    }
                    if (options.initData.INV007.rows[0]['DestroyUploadTime'.toUpperCase()]) {
                        $(headerId + 'txtDestroyUploadTime').csDateTime('setDate', options.initData.INV007.rows[0]['DestroyUploadTime'.toUpperCase()])
                    }
                    $(headerId + 'txtCarrierType').val(options.initData.INV007.rows[0]['CarrierType'.toUpperCase()]);
                    $(headerId + 'txtCarrierId1').val(options.initData.INV007.rows[0]['CarrierId1'.toUpperCase()]);
                    $(headerId + 'txtA_CarrierId1').val(options.initData.INV007.rows[0]['A_CarrierId1'.toUpperCase()]);
                    $(headerId + 'txtRandomNum').val(options.initData.INV007.rows[0]['RandomNum'.toUpperCase()]);
                    $(headerId + 'txtCarrierId2').val(options.initData.INV007.rows[0]['CarrierId2'.toUpperCase()]);
                    $(headerId + 'txtA_CarrierId2').val(options.initData.INV007.rows[0]['A_CarrierId2'.toUpperCase()]);
                    $(headerId + 'csGiveUnitId').csList('codeNo', options.initData.INV007.rows[0]['GiveUnitId'.toUpperCase()] || '' );
                   // $(headerId + 'csInvUseId').csList('codeNo', options.initData.INV007.rows[0]['InvUseId'.toUpperCase()] || '');

                    $(headerId + 'csInvUseId').csList('setDisplayValue',
                       {
                           CODENO: options.initData.INV007.rows[0]['InvUseId'.toUpperCase()] || '',
                           DESCRIPTION: options.initData.INV007.rows[0]['InvUseDesc'.toUpperCase()] || ''
                       });
                }
            }
            return d.resolve(div);

        } catch (err) {
            errorHandle(formName, 'rcdToscr', err);
           return   d.reject('rcdToscr');
        } finally {

        }
    }
    
    function setCsInvUseId(div) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        var d = $.Deferred();
        var inv028Rows = [];
        try {
            var code = $(headerId + 'csInvUseId').csList('codeNo') || -99;
                $.each(options.initData.INV028.rows, (index, value) => {
                    if ($(headerId + 'txtBusinessId').val() != '') {
                        if (!value['RefNo'.toUpperCase()] || value['RefNo'.toUpperCase()] === null) {
                            inv028Rows.push(value)
                        } else {
                            if (value['REFNO'] != 999 && value['REFNO'] != 1) {
                                inv028Rows.push(value)
                            }
                        }

                    } else {
                        if (!value['RefNo'.toUpperCase()] || value['RefNo'.toUpperCase()] === null) {
                            inv028Rows.push(value)
                        } else {
                            if (value['REFNO'] != 999) {
                                inv028Rows.push(value)
                            }
                        }
                    }
                })
                $(headerId + 'csInvUseId').csList('source', inv028Rows);
                $(headerId + 'csInvUseId').csList('codeNo', code);
                return d.resolve(div);
            }
        catch (err) {
            errorHandle(formName, 'setCsInvUseId', err);
            return d.reject('setCsInvUseId');
        }
      
    }
    function initData(div, action) {
        var options = $.data(div, formName).options;
        var headerId = '#' + $(div).attr('id');
        if (options.editMode != editMode.append) {

            if (options.parameters.INV007 != undefined) {
                if (options.parameters.INV007.rows.length > 0) {
                    options.InvId = options.parameters.INV007.rows[0].INVID
                    options.refNo = parseInt(options.parameters.INV007.rows[0]['HOWTOCREATE'.toUpperCase()] || 3);
                };

            };
        };        
        switch (options.refNo) {
            case 1:
                options.howtocreate = CreateMethodEnums.previous;
                break;
            case 2:
                options.howtocreate = CreateMethodEnums.after;
            case 3:
                options.howtocreate = CreateMethodEnums.local;
                break;
            case 4:
                options.howtocreate = CreateMethodEnums.normal;
                break;
            default:
                options.howtocreate = CreateMethodEnums.local;
                break;
        };
      
            try {
            
                //renderControl(div)
                //addHandler(div);
                changeLanguage(div);
                $.when(renderControl(div))
                .then(QueryData)
                .then(function () {
                    var d = $.Deferred();
                    if (options.editMode != editMode.append) {
                        options.howtocreate = parseInt(options.initData.INV007.rows[0]['HowToCreate'.toUpperCase()]);
                        return  d.resolve(div);
                    } else {
                        return d.resolve(div);
                    }
                })
                .then(renderDynmicGrid)
                .then(rcdToscr)
                .then(setCsInvUseId)
                .then(changeMode)
                .then(addHandler)
                .done(action)
                .fail(function (fnName) { console.log(fnName) })

                /*
                 QueryData(div, function () {
                     renderDynmicGrid(div, function () {
                         rcdToscr(div)
                     })
                 }); */
            
           
                /*
                shouldRegPriv = false;
                options.isSaved = false;
                changeLanguage(div);
                renderControl(div);
                if (options.orderNo == '') {
                    messageBox(options.language.NoDataQuery, messageType.critical);
                    return;
                };
                chkReturnCode(div, function () {
                    renderSO1118A5(div, function () {
                        addHandler(div, function () {
                        });
                    });
                }); */
            } catch (err) {
                errorHandle(formName, 'initData', err);

            } finally {
                //if ($.isFunction(action)) { action(); };
            }
        };
    function formClosed(div) {

        var options = $.data(div, formName).options;
        if (options['closed']) {
            //options['closed'](options.returnValue);
        };
        $(options['container']).jqxWindow('close');
    };
    function setTheme(div, params) {
        var controls = $.data(div, formName).options.controls;
        for (i = 0; i < controls.length; i++) {
            var o = $('#' + $(div).prop('id') + controls[i].name);
            if (o.length > 0) {
                $(o[0])[controls[i].type]({ theme: params });
            }
        }
    };
    function ShowSOCust(div, action) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var width = 940;
            var height = 500;
            
            width = $(div).width();
            height = $(div).height()

            if (width > $(div).width()) width = $(div).width();
            if (height > $(div).height()) height = $(div).height();
            var x = ($(options.container).width() - width) / 2;
            var y = ($(options.container).height() - height) / 2;
            var x = $(div)[0].offsetLeft;
            var y = $(div)[0].offsetTop;
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),

                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };
           
            var billitem =[];
            billitem.push("'x1'");
            var index8a = options.initData.INV008A.rows.length;
            $(options.dynGridId).jqxGrid('getrows').forEach(function (v) {
                if (v['BillID'.toUpperCase()] && v['BillIDItemNo'.toUpperCase()]) {
                    billitem.push("'" + v['BillID'.toUpperCase()] + v['BillIDItemNo'.toUpperCase()] + "'")
                };
                for (var i = 0; i < index8a; i++) {
                    if (v['SEQ'] = options.initData.INV008A.rows[i].SEQ) {
                        if (options.initData.INV008A.rows[i].BILLID && options.initData.INV008A.rows[i].BILLIDITEMNO) {
                            billitem.push("'" + options.initData.INV008A.rows[i].BILLID + options.initData.INV008A.rows[i].BILLIDITEMNO + "'")
                        };
                    };
                };
            });
           
            var dsData = {
                custid: $(headerId + 'txtCustId').val() || '-11',
                existsbill: billitem.join(','),                
                inv007: $.extend(true, {}, options.initData.INV007),
                inv008: $(options.dynGridId).jqxGrid('getrows'),
                inv008a: $.extend(true, {}, options.initData.INV008A),
                guino:$(headerId+'txtInvNo').val() || 'X'
            };
            if (options.howtocreate == CreateMethodEnums.local) {
                if (!$.isNumeric(dsData.custid)) {
                    messageBox(options.language.onlyNum, messageType.critical, null, function () {
                        $(headerId + 'txtCustId').jqxInput('focus');
                    });
                    return;
                };
            };
            var win = createcsWindow(options.container, options.language.chooseCustTitle, winOptions);
            $('#' + win.windowId).one('close', function () {
                var r = $.extend(true, {}, $.data($('#' + win.contentId)[0]).INV1120A12.options);
                $('#' + win.contentId)['INV1120A12']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                if (typeof action == 'function') {
                    action(div,r);
                }

                
            });


            $('#' + win.contentId)['INV1120A12']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),                
                theme: options.theme,
                refNo: options.howtocreate,
                parameters: dsData,
                lock: options.editMode == editMode.edit,
                newflow:options.initData['INV001'].rows[0].NEWFLOW || 0,
                taxrate :$(headerId + 'txtRate').jqxNumberInput('getDecimal') || 0,
                localization: options.localization
            });
        
        }
        catch (err) {
            errorHandle(formName, 'ShowSOCust', err);
        }
    };
    function showINV1120A13(div,Mode, action) {
        try {
            if (Mode == editMode.edit) {
                if ($(this).jqxGrid('getrows').length == 0) { return; }
            };
            
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var width = 940;
            var height = 500;
            width = $(div).width();
            height = $(div).height()
            if (width > $(div).width()) width = $(div).width();
            if (height > $(div).height()) height = $(div).height();
            var x = ($(options.container).width() - width) / 2;
            var y = ($(options.container).height() - height) / 2;
             x = $(div)[0].offsetLeft;
             y =  $(div)[0].offsetTop;
             y =  ($(div)[0].offsetHeight / 4 ) ;
            var winOptions = {
                width: width ,
                height: height /2,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),

                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };
            var ds = {};
            var taxcode = 1;
            var rate = $(headerId + 'txtRate').jqxNumberInput('getDecimal') || 0;
            if ($(headerId + 'rdoTax2').jqxRadioButton('checked')) {
                taxcode = 2;
                rate = 0;
            };
            if ($(headerId + 'rdoTax3').jqxRadioButton('checked')) {
                taxcode = 3;
                rate = 0;
            };
            var rowIndex = $(options.dynGridId).jqxGrid('selectedrowindex') || 0;
            if (rowIndex == -1) { rowIndex = 0 };
            var data = $(options.dynGridId).jqxGrid('getrowdata', rowIndex);
            if (Mode == editMode.edit) {
                if (data['LinkToMIS'.toUpperCase()] == 'Y') {
                    messageBox(options.language.NoModifyMisData, messageType.critical);
                    return;
                };
                if (data['MergeFlag'.toUpperCase()]) {
                    messageBox(options.language.MergeData, messageType.critical);
                    return;
                };
                ds = {
                    inv008: $.extend({}, data),
                    rate: rate,
                    taxcode:taxcode
                }
            } else {
                var inv008Clone = $.extend(true, {}, options.initData.INV008);
                ds.inv008 = generateRow(inv008Clone);
                ds.inv008['Quantity'.toUpperCase()] = 1;
                ds.rate = rate;
                ds.taxcode = taxcode;
            };


            var win = createcsWindow(options.container, options.language.detailEditTitle, winOptions);
            $('#' + win.windowId).one('close', function () {
                $(headerId + "invInfo1 *").prop("disabled", false);
                $(headerId + "invInfo2 *").prop("disabled", false);
                $("button, input[type='button']").jqxButton({ disabled: false });
                var r = $.extend(true, {}, $.data($('#' + win.contentId)[0]).INV1120A13.options);
                $('#' + win.contentId)['INV1120A13']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                if (r.isSaved) {
                    if (typeof action == 'function') {
                        action(Mode, r,div);
                    };
                };
            });

            
            
            $('#' + win.contentId)['INV1120A13']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                editMode :editMode,
                //invdate: $(headerId + 'txtInvDate').csDateTime('getDate'),
                parameters : ds,
                theme: options.theme,
                localization: options.localization
            });
            $(headerId + "invInfo1 *").prop("disabled", true)
            $(headerId + "invInfo2 *").prop("disabled", true)
            $("button, input[type='button']").jqxButton({ disabled: true });
        }
        catch (err) {
            errorHandle(formName, 'showINV1120A13', err);
        }
    };
    function getGridCurrentRow(div) {
        var options = $.data(div, formName).options;
        var rowIndex = $(options.dynGridId).jqxGrid('selectedrowindex') || 0;
        var data = $(options.dynGridId).jqxGrid('getrowdata', rowIndex);
        return data;
    };

    function ShowINV099(div, action) {
        try {
            var options = $.data(div, formName).options;
            var headerId = '#' + $(div).prop('id');
            var width = 940;
            var height = 500;
            width = $(div).width();
            height = $(div).height()
            if (width > $(div).width()) width = $(div).width();
            if (height > $(div).height()) height = $(div).height();
            var x = ($(options.container).width() - width) / 2;
            var y = ($(options.container).height() - height) / 2;
            var x = $(div)[0].offsetLeft;
            var y = $(div)[0].offsetTop;
            var winOptions = {
                width: width,
                height: height,
                maxWidth: $(options.container).width(),
                maxHeight: $(options.container).height(),

                position: { x: x, y: y },
                closeButtonAction: 'close',
                resizable: true,
                theme: options.theme
            };
            var win = createcsWindow(options.container, options.language.chooseInvNoTitle, winOptions);
            $('#' + win.windowId).one('close', function () {
                var r = $.extend(true, {}, $.data($('#' + win.contentId)[0]).INV1120A11.options);                
                $('#' + win.contentId)['INV1120A11']('destroy');
                $('#' + win.windowId).csWindow('destroy');
                if (typeof action == 'function') {
                    action(r);
                }
                
               // if ($.isFunction(action)) { action(); };
            });

            
            $('#' + win.contentId)['INV1120A11']({
                loginInfo: cloneJSON(options.loginInfo),
                container: $('#' + win.windowId),
                invdate : $(headerId + 'txtInvDate' ).csDateTime('getDate'),                
                theme: options.theme,
                localization: options.localization
            });
            //options.childForm.length = 0;
            //options.childForm.push(['#' + win.contentId, 'INV1120A11']);
            //options.childForm.push(['#' + win.windowId, 'csWindow']);
        }
        catch (err) {
            errorHandle(formName, 'ShowINV099', err);
        }
    };
    function changeLanguage(div) {
        var lang = $.data(div, formName).options.language;
        //var idArray = $("*[id]");
        var d = $.Deferred();
        var idArray = $('*[id^=' + $(div).prop('id') + ']')
        try {
            idArray.each(function (index, value) {
                var idStr = $(value).attr('id');
                if (idStr.replace($(div).prop('id'), "") != "") {
                    if (lang[idStr.replace($(div).prop('id'), "")] != null) {
                        $('#' + idStr).val(lang[idStr.replace($(div).prop('id'), "")]);
                        $('#' + idStr).text(lang[idStr.replace($(div).prop('id'), "")]);
                    }
                }
            });
            idArray.length = 0;
            idArray = [];
            idArray = null;
            return d.resolve(div);
        }
        catch (err) {

            errorHandle(formName, 'changeLanguage', err);
            return d.reject('changeLanguage')
        }
    };
})(jQuery);