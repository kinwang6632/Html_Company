(function ($) {
    var formName = "csTabs";
    var liDefHeight = 18;
    $.fn['csTabs'] = function (options, param, param2, param3) {
        try {
            if (typeof options == 'string') {
                if (options != 'destroy' && options.indexOf('set') < 0) {
                    var val = invokeMethod(this, options, param, param2, param3);
                    changeHeader($(this)[0]);
                    return val;
                }
                else {
                    invokeMethod(this, options, param, param2, param3);
                    if (options !== 'destroy') {
                        changeHeader($(this)[0]);
                    }
                    return;
                }
            }
            options = options || {};
            var state = $.data($(this)[0], formName);
            if (state) {
                $.extend(state.options.realOptions, options);
                var val = $(this).jqxTabs(options);
                changeHeader($(this)[0]);
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
            errorHandle(formName, '$.fn.csTabs', err);
        }
    };
    var defaults = (function () {
        this.realOptions = {};
        this.theme = $.jqx.theme;
        this.headerHeight = 22;
    });
    function invokeMethod(div, options, param, param2, param3) {
        try {
            var val;
            var type = 'jqxTabs';
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
                    delete $.data($(div)[0], formName);
                    $(document).off('mouseup.tab' + $(div).prop('id'));
                    $(document).off('mouseleave.tab' + $(div).prop('id'));
                    offElementEvents($(div));
                }
                val = $(div)[type](options);
            }
            if (options != 'destroy') {
                return val;
            }
            else {
                $(div).remove();
                return;
            };
        }
        catch (err) {
            errorHandle(formName, 'invokeMethod', err);
        }
    };
    function changeHeader(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.headerHeight != 28) {
                var header = $($(div).find('.jqx-tabs-header')[0]);
                header.css('height', options.headerHeight);
                header.css('padding-top', (options.headerHeight - 16) / 2);
                header.find('ul').css('height', options.headerHeight);
                var liHeight = $(header.find('li')[0]).height();
                if (liHeight > options.headerHeight) {
                    header.find('li').height(options.headerHeight);
                    header.find('li').css('padding-top', 0);
                    header.find('li').css('padding-bottom', 0);
                }
                else {
                    //header.find('li').css('height', options.headerHeight - 2);
                    if (liHeight < liDefHeight) {
                        liHeight = liDefHeight;
                        header.find('li').height(liDefHeight);
                    }
                    var liPadding = options.headerHeight - liHeight;
                    header.find('li').css('padding-top', Math.floor(liPadding / 2));
                    header.find('li').css('padding-bottom', Math.floor(liPadding - Math.floor(liPadding / 2)));
                }
                if (options.height != null) {
                    //$(div).jqxTabs({ height: options.height });
                }
            }
        }
        catch (err) {
            errorHandle(formName, 'changeHeader', err);
        }
    }
    function init(div) {
        try {
            var options = $.data(div, formName).options;
            if (options.realOptions.headerHeight != null) {
                options.headerHeight = options.realOptions.headerHeight;
                delete options.realOptions.headerHeight;
            }
            $(div).jqxTabs(options.realOptions);
            changeHeader(div);
        }
        catch (err) {
            errorHandle(formName, 'init', err);
        }
    };
})(jQuery);