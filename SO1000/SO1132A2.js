(function ($) {
    var formName = 'SO1132A2';

    var methods = {
        options: function (jq) {
            return $.data(jq[0], formName).options;
        },
        theme: function (jq, params) {
            return parameter(jq[0], 'theme', params);
        },
        localization: function (jq, params) {
            return parameter(jq[0], 'localization', params);
        },
        destroy: function (jq) {
            return jq.each(function () {
                formDestroy(this);
            });
        },
        resize: function (jq, params) {
            return jq.each(function () {
                formResize(this, params);
            });
        },
        canEdit: function (jq, params, param2) {
            return canEdit(params, param2);
        },
    };
    var defaults = (function () {
        this.language = {};
        this.loginInfo = {};
        this.editMode = 0;
        this.refNo = 0;
        this.parameters = {};
        this.controls = [];
        this.theme = $.jqx.theme;
        this.localization = null;
        this.container = null;
    });

    $.fn.SO1132A2 = function (options, param, param2) {
        try {
            //param.doProcessMark = 1;
            if (typeof options == 'string') {
                if (methods["canEdit"]) {
                    //return methods['canEdit'](this, param, param2);
                    return $(this).SO1132A('canReverse', param, param2);
                }
                return $(this).SO1132A(options, param, param2);
            }
            return $(this).SO1132A($.extend({}, options, { editMode: editMode.append, doProcessMark: 1 }));
        }
        catch (err) {
            errorHandle(formName, '$.fn.' + formName, err);
        }
    };
    function canEdit(params, action) {
        try {
            return $.fn.SO1132A('canEdit', params, action);
        }
        catch (err) {
            errorHandle(formName, 'canEdit', err);
        }
    };

})(jQuery);