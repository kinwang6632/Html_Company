(function ($) {
    var formName = "csWindow";
    var buttonHeight = 28;
    var buttonWidth = 120;
    var minEndId = "min";
    $.fn['csWindow'] = function (options, param, param2, param3) {
        try {
            if (typeof options == 'string') {
                if (options != 'destroy' && options.indexOf('set') < 0) {
                    return invokeMethod(this, options, param, param2, param3);
                }
                else {
                    invokeMethod(this, options, param, param2, param3);
                    return;
                }
            }
            options = options || {};
            var state = $.data($(this)[0], formName);
            if (state) {
                $.extend(state.options.realOptions, options);
                var val = $(this).jqxWindow(options);
                return val;
            }
            else {
                $.data($(this)[0], formName, {
                    options: $.extend({}, new defaults(), { realOptions: cloneJSON(options) },
                        options)
                });
                init($(this)[0]);
            }
        }
        catch (err) {
            errorHandle(formName, '$.fn.csWindow', err, true, true);
        }
    };
    var defaults = (function () {
        this.realOptions = {};
        this.hasClosing = true;
        this.hideHeader = false;
        this.theme = $.jqx.theme;
        this.minPosition = "left bottom";
    });
    function invokeMethod(div, options, param, param2, param3) {
        try {
            var val;
            var type = 'jqxWindow';
            if (param3 != null) val = $(div)[type](options, param, param2, param3);
            else if (param2 != null) val = $(div)[type](options, param, param2);
            else if (param != null) {
                if (options == 'theme') {
                    $(div)[type]({ theme: param });
                }
                else {
                    val = $(div)[type](options, param);
                }
            }
            else {
                if (options == 'destroy') {
                    var winOpts = $.data($(div)[0], formName);
                    if (winOpts != null) {
                        //2018/09/26 Jacky 刪除最小化的Container
                        var control = $($(winOpts.options.minContainer).find("[role='wincontainer']")[0]);
                        if (control.length > 0) {
                            if (control.find('.jqx-button').length == 0) {
                                offElementEvents($(control));
                                control.remove();
                            }
                        }
                        changeParentWinColor($(div)[0]);
                        delete $.data($(div)[0], formName);
                    }
                    var id = $(div).prop('id');
                    //2018/08/01 Jacky 刪除最小化icon
                    if ($("#" + id + "_" + minEndId).length > 0) {
                        offElementEvents($("#" + id + "_" + minEndId));
                        destroySingleControl({ name: id + "_" + minEndId, type: "jqxButton" });
                    }
                    //$(div).find(".jqx-window-collapse-button").off()
                    //$($($(div).find('.jqx-window-header')[0]).find('.jqx-window-close-button')[0]).off();
                    offElementEvents(div);
                    val = $(div)[type](options);
                    deleteBodyData(id);
                    offEvents(id);
                    //$(div).off();
                }
                else {
                    val = $(div)[type](options);
                }
            }
            return val;
        }
        catch (err) {
            errorHandle(formName, 'invokeMethod', err, true, true);
        }
    };
    function deleteBodyData(id) {
        try {
            return;
            //jqxwindowModal
            //jqxwindowsList
            //jqxwindowsModallist
            var opts = $.data(document.body, "jqxwindowModal");
            if (opts && $(opts).prop("id") == id) {
                $.data(document.body, "jqxwindowModal", null);
                opts = null;
            }

            var wins = ["jqxwindowsList", "jqxwindowsModallist"];
            for (var w = 0; w < wins.length; w++) {
                var opts = $.data(document.body, wins[w]);
                var doWa = false;
                if (opts) {
                    for (var wa = 0; wa < opts.length; wa++) {
                        if ($(opts[wa]).prop("id") == id) {
                            opts[wa] = null;
                            delete opts[wa];
                            doWa = true;
                        }
                    }
                }
                if (doWa == true) { $.data(document.body, wins[w], opts.filter(function (e) { return e })); }
                opts = null;
            }
        }
        catch (err) {
            //errorHandle(formName, 'invokeMethod', err, true, true);
        }
    }
    function offEvents(id) {
        try {
            return;
            //補第三方元件的漏洞
            $(document).off('keydown.window' + id);
            $(document).off('mouseup.resize.' + id);
            $(document).off('mouseup.' + id + ".resize");
            $(document).off('mouseup.' + id);
            $(document).off('mousemove.resize.' + id);
            $(document).off('mousemove.' + id + ".resize");
            $(document).off('mousemove.' + id);
            $(document).off('resize.' + id);

        }
        catch (err) {
            errorHandle(formName, 'offEvents', err, true, true);
        }
    }
    function init(div) {
        try {
            var options = $.data(div, formName).options;
            var hasClosing = options.realOptions.hasClosing || options.realOptions.haveClosing;
            if (options.realOptions.hasClosing != null) {
                delete options.realOptions.hasClosing;
            }
            if (options.realOptions.haveClosing != null) {
                delete options.realOptions.haveClosing;
            }
            if (options.realOptions.hideHeader != null) {
                delete options.realOptions.hideHeader;
            }
            if (options.realOptions.minContainer != null) {
                delete options.realOptions.minContainer;
            }
            if (options.realOptions.minPosition != null) {
                delete options.realOptions.minPosition;
            }
            changeParentWinColor(div, true);
            checkSize(div);
            //2019/04/16 Jacky 將esc 拿掉
            options.realOptions.keyboardCloseKey = 0;
            $(div).jqxWindow(options.realOptions);
            if (options.hideHeader == true) {
                $(div).find(".jqx-window-header").css("display", "none");
            }
            winMoving(div);
            winClosingEvent(div);
            winColor(div);
            winHide(div);
        }
        catch (err) {
            errorHandle(formName, 'init', err, true, true);
        }
    };
    function checkSize(div) {
        try {
            var options = $.data(div, formName).options;
            //2018/12/06 Jacky 增加檢核避免出現invaild minwidth
            var minWidth = options.realOptions["minWidth"];
            var maxWidth = options.realOptions["maxWidth"];
            var minHeight = options.realOptions["minHeight"];
            var maxHeight = options.realOptions["maxHeight"];
            if (minWidth != null && maxWidth != null) {
                if (minWidth.toString().indexOf("%") >= 0 && maxWidth.toString().indexOf("%") >= 0) {
                    if (minWidth > maxWidth) {
                        options.realOptions["minWidth"] = options.realOptions["maxWidth"];
                    }
                }
                if (minWidth.toString().indexOf("%") < 0 && maxWidth.toString().indexOf("%") < 0) {
                    if (minWidth > maxWidth) {
                        options.realOptions["minWidth"] = options.realOptions["maxWidth"];
                    }
                }
            }
            if (minHeight != null && maxHeight != null) {
                if (minHeight.toString().indexOf("%") >= 0 && maxHeight.toString().indexOf("%") >= 0) {
                    if (minHeight > maxHeight) {
                        options.realOptions["minHeight"] = options.realOptions["maxHeight"];
                    }
                }
                if (minHeight.toString().indexOf("%") < 0 && maxHeight.toString().indexOf("%") < 0) {
                    if (minHeight > maxHeight) {
                        options.realOptions["minHeight"] = options.realOptions["maxHeight"];
                    }
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'checkSize', err, true, true);
        }
    }
    function winHide(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.minContainer == null) {
                options.showCollapseButton = false;
                $(div).jqxWindow({ showCollapseButton: false });
                return;
            }
            //var parents = $(div).parents();
            //for (var i = 0 ; i < parents.length; i++) {
            //    if ($(parents[i]).hasClass("jqx-window")) {
            //        return;
            //    }
            //}
            var collapseBtn = $(div).find(".jqx-window-collapse-button");
            collapseBtn.css({
                "background-position-x": "-48px",
                "background-position-y": "-128px"
            });
            collapseBtn.off("click");
            collapseBtn.on('click', function () {
                try {
                    //最小化
                    var floatValue = "left";
                    var top = $(options.minContainer).height() - buttonHeight - 4;
                    var isTop = false;
                    if (isEmpty(options.minPosition) != true) {
                        var pos = options.minPosition.split(" ");
                        for (var i = 0; i < pos.length; i++) {
                            switch (pos[i]) {
                                case "right":
                                    floatValue = "right";
                                    break;
                                case "top":
                                    top = 0;
                                    isTop = true;
                            }
                        }
                    }
                    var minId = $(options.minContainer).prop("id");
                    var realId;
                    if (isEmpty(minId) == true) { return; }
                    else { realId = minId + "_btnDIV"; }
                    if ($("#" + realId).length == 0) {
                        $("<div role='wincontainer' id='" + realId + "'></div>").appendTo(options.minContainer);
                        $("#" + realId).css({
                            "position": "absolute",
                            'z-index': 9999,
                            top: top,
                            height: 30,
                            width: "99%"
                        });
                    }
                    $(div).css("display", "none");
                    var btns = $("#" + realId).find(".jqx-button");
                    //var idx = btns.length;
                    //if (idx > 0) {
                    //    var maxBtnId = $(btns[idx - 1]).prop('id');
                    //    idx = parseInt(maxBtnId.split("_")[maxBtnId.split("_").length - 1]) + 1;
                    //}
                    //var btnId = realId + "_" + idx;
                    var btnId = $(div).prop('id') + "_" + minEndId;
                    $("<input id='" + btnId + "'/>").appendTo($("#" + realId));
                    $("#" + btnId).css({
                        "float": floatValue,
                        "margin-left": 2
                    });
                    var btnOptions = {
                        height: buttonHeight - 2,
                        width: buttonWidth,
                        value: $(div).jqxWindow('title'),
                        textPosition: "left"
                    }
                    var oImg = $(div).find(".jqx-window-header").find("img");
                    if (oImg.length > 0) {
                        var oSpan = $(div).find(".jqx-window-header").find("span");
                        btnOptions.value = $(oSpan).text();
                        //$.extend(btnOptions,
                        //     imagePosition, { imgSrc: oImg.attr("src") });

                    }
                    var trimValue = btnOptions.value.split(" ");
                    btnOptions.value = trimValue[0];
                    if (btnOptions.value.lengthB() > 14) {
                        btnOptions.value = btnOptions.value.substrB(0, 14) + "...";
                    }
                    //btnOptions.value += ">>";
                    $("#" + btnId).jqxButton(btnOptions);
                    //$('#' + btnId).find('img').css('top', (buttonHeight - 2 - $('#' + btnId).find("img").height()) / 2 - 1);
                    if (isTop) {
                        $("#" + btnId).css({
                            "border-bottom-left-radius": 5,
                            "border-bottom-right-radius": 5
                        });
                    }
                    else {
                        $("#" + btnId).css({
                            "border-top-left-radius": 5,
                            "border-top-right-radius": 5
                        });
                    }
                    //var x = $("<div class='jqx-grid-cell-selected-" + $.jqx.theme + "'>").appendTo('body');
                    var x = $("<div class='jqx-widget-header-" + $.jqx.theme + "'>").appendTo('body');
                    var backgroundcolor = x.css('background-color');
                    var color = x.css('color');
                    x.remove();
                    //jqx-grid-cell-selected-ui-redmond2
                    $("#" + btnId).css({
                        "background": backgroundcolor,
                        "border-width": 1,
                        color: color,
                        opacity: 0.75
                    });
                    $("#" + btnId).off("click");
                    $("#" + btnId).on("click", function () {
                        try {
                            //$(div).css("opacity", 0);
                            //var i = 0;
                            //var show = function () {
                            //    if (i > 1) {
                            //        clearInterval(myTime);
                            //        $(div).css("opacity", "");
                            //        $(div).jqxWindow('focus');
                            //        return;
                            //    }
                            //    $(div).css("opacity", i);
                            //    i += 0.05;
                            //};
                            //var myTime = setInterval(show, 10);
                            $(div).css("display", "");
                            destroySingleControl({ name: btnId, type: "jqxButton" });
                        }
                        catch (err) {
                            errorHandle(formName, 'winHide_btn_click', err, true, true);
                        }
                    });
                    var img = $("<img src='images/s_4arrow_white.png' width='16' height='16' style='float:right;top:1px;margin-right:2px;'></img>").appendTo("#" + btnId);

                }
                catch (err) {
                    errorHandle(formName, 'winHide_click', err, true, true);
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'winHide', err, true, true);
        }
    }
    function winMoving(div) {
        try {
            var options = $.data(div, formName).options;
            var winId = $(div).prop("id");
            var header = $($(div).find('.jqx-window-header')[0]);
            header.off("mousedown mouseup mousemove");
            var isDown = false;
            var mousePosition = {};
            header.on("mousedown", function (e) {
                mousePosition = { top: e.pageY - $(div).position().top, left: e.pageX - $(div).position().left };
                isDown = true;
            });
            header.on("mouseup", function () {
                isDown = false;
            });
            $(document).on("mouseup." + winId, function () {
                isDown = false;
            });
            $(document).on("mousemove." + winId, function (e) {
                if (isDown) {
                    var parentWins = $(div).parents();
                    var minTop = 0;
                    var minLeft = 0;
                    for (var i = 0; i < parentWins.length; i++) {
                        if ($(parentWins[i]).hasClass('jqx-window')) {
                            minTop += $(parentWins[i]).position().top;
                            minLeft += $(parentWins[i]).position().left;
                        }
                    }
                    //var top = e.pageY - mousePosition.top + minTop;
                    //var left = e.pageX - mousePosition.left + minLeft;
                    //if (top < minTop) { top = minTop; }
                    //if (left < minLeft) { left = minLeft; }
                    var top = e.pageY - mousePosition.top + minTop;
                    var left = e.pageX - mousePosition.left + minLeft;
                    if (top < minTop) { top = minTop; }
                    $(div).offset({ top: top, left: left });
                }
            });
        }
        catch (err) {
            errorHandle(formName, 'winMoving', err, true, true);
        }
    }
    function createwinClosingEvent(div) {
        try {
            var winId = $(div).prop("id");
            var closingFlag = ($._data($('#' + winId)[0], 'events')['winClosing'] != null);
            var closeFlag = ($._data($('#' + winId)[0], 'events')['close'] != null);
            if (closingFlag) {
                $('#' + winId).triggerHandler($.Event("winClosing"));
            }
            else {
                if (closeFlag) {
                    $('#' + winId).csWindow('close');
                }
                else {
                    offEvents(winId);
                    $('#' + winId).csWindow('destroy');
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'createwinClosingEvent', err, true, true);
        }
    }
    function winClosingEvent(div) {
        try {
            var options = $.data(div, formName).options;
            //if (options.hasClosing == true) {
            var closeButton = $($(div).find('.jqx-window-header')[0]).find('.jqx-window-close-button')[0];
            $(closeButton).off('click');
            var winId = $(div).prop("id");
            $(closeButton).on('click', function () {
                //var closingFlag = ($._data($('#' + winId)[0], 'events')['winClosing'] != null);
                //var closeFlag = ($._data($('#' + winId)[0], 'events')['close'] != null);
                //if (closingFlag) {
                //    $('#' + winId).triggerHandler($.Event("winClosing"));
                //}
                //else {
                //    if (closeFlag) {
                //        $('#' + winId).csWindow('close');
                //    }
                //    else {
                //        offEvents(winId);
                //        $('#' + winId).csWindow('destroy');
                //    }
                //}
                createwinClosingEvent(div);
            });
            //}
        }
        catch (err) {
            errorHandle(formName, 'winClosingEvent', err, true, true);
        }
    }
    function changeParentWinColor(div, revertFlag) {
        try {
            var options = $.data(div, formName).options;
            var header = $($(div).find('.jqx-window-header')[0]);
            var parentWins = $(div).parents();
            for (var i = 0; i < parentWins.length; i++) {
                if ($(parentWins[i]).hasClass('jqx-window')) {
                    var header = $($(parentWins[i]).find('.jqx-window-header')[0]);
                    if (revertFlag == true) {
                        changeColor($(parentWins[i]), true);
                    }
                    else {
                        changeColor($(parentWins[i]));
                    }
                    break;
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'changeParentWinColor', err, true, true);
        }
    }
    function winColor(div) {
        try {
            changeColor(div);
        }
        catch (err) {
            errorHandle(formName, 'winColor', err, true, true);
        }
    }
    function changeColor(div, focusFlag) {
        try {
            var options = $.data($(div)[0], formName).options;
            var header = $($(div).find('.jqx-window-header')[0]);
            if (focusFlag == true) {
                //header.addClass("jqx-expander-header-expanded-" + options.theme);
                //header.addClass("jqx-expander-header-" + options.theme);
                header.css({ opacity: 0.3 });
            }
            else {
                //header.removeClass("jqx-expander-header-expanded-" + options.theme);
                //header.removeClass("jqx-expander-header-" + options.theme);
                header.css({ opacity: "" });
            }
            //var color = "yellow";
            //header.css({
            //    'color': color,
            //    //  'background': bColor
            //});
            //}
        }
        catch (err) {
            errorHandle(formName, 'changeColor', err, true, true);
        }
    }
})(jQuery);