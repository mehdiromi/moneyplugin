$(function () {
    //when document ready, init the plugin so any exisiting DOM element of this plugin inits with the plugin behaviour
    $('.money').money();
    //$.fn.money();   
    //$(".money").each(function () {
    //    $(this).money();
    //});
    //$(document).ready(function () {
    //    $(".money").each(function () {
    //        $(this).money();
    //    });
    //});    
});
(function ($) {
    var origAppend = $.fn.append;
    $.fn.append = function () {
        //$('#log2').append( $(arguments[0]).prop('outerHTML')  + ' ');
        //alert($(arguments[0]).prop('outerHTML'));

        if ( $(arguments[0]).prop('outerHTML').indexOf('money') > -1) 
        //if (arguments[0].attr('class') == 'money')
        {
            var event = jQuery.Event("append");
            event.args = arguments;
            event.code = 45;
            return origAppend.apply(this, arguments).trigger(event);
        }
        else 
        {
            return origAppend.apply(this, arguments);
        }
    };
})(jQuery);
(function ($) {
    var origAddClass = $.fn.addClass;
    
    $.fn.addClass = function () {
        //$('#log').val($('#log').val() + arguments[0] + ' ');
        //if (arguments[0] == 'money') {
        if ($.inArray('money', arguments) > -1 ) {
            return origAddClass.apply(this, arguments).trigger("append");
        }
        else {
            return origAddClass.apply(this, arguments);
        }
    };
})(jQuery);


//(function ($) {
//    var methods = ['addClass', 'toggleClass', 'removeClass'];

//    $.map(methods, function (method) {
//        // store the original handler function
//        var originalMethod = $.fn[method];

//        $.fn[method] = function () {
//            return originalMethod.apply(this, arguments).trigger("myEvent");
//        };
//    });
//})(jQuery);


//(function ($) {
//    var methods = ['addClass', 'toggleClass', 'removeClass'];

//    $.map(methods, function (method) {
//        // store the original handler function
//        var originalMethod = $.fn[method];

//        $.fn[method] = function () {
//            // execute the original hanlder
//            var oldClass = this[0].className;
//            var result = originalMethod.apply(this, arguments);
//            var newClass = this[0].className;

//            // trigger the custom event
//            this.trigger(method, [oldClass, newClass]);

//            // return the original handler
//            return result;
//        };
//    });
//}(this.jQuery || this.Zepto));

(function ($) {
    $.fn.moneyHooked = function () {
        return this
        .each(function () {
            $(this)
                .EvalMoney().addClass('isHooked');
        });
    };
    $.fn.money = function ()
    {
        $(".money").on("keypress.money", function (e) {
            //$('#log').val($('#log').val() + 'keypress ' + e.which);
            //0=48, 9= 57, - = 45, + = 43,  . = 46,  , = 44,  $= 36
            var validChars = [45,46,48,49,50,51,52,53,54,55,56,57];
            var $this = $(this);
            var currentValue = $this.val();  //before key pressed
            //$('#log').val($('#log').val() + 'current val  ' + currentValue + '\n\r');
            //alert(e.which);
            //( && currentValue.indexOf('.') != -1  && e.which == 46)  ||
            //alert(currentValue.length);
            //if (e.which == 46 && currentValue.length > 0 && currentValue.indexOf('.') != -1 ) {
            //    return false;
            //}

            //doesnt match with valid chars:
           //if ( $.inArray(e.which, validChars) == -1 ) {
           //     return false;
           //}

            //$('#log').val($('#log').val() + '. pos ' + currentValue.indexOf('.') + '\n\r');
            $('#log').val($('#log').val() + ' press ');

        });

        $(".money").on("keydown.money", function (e) {
            //0=48, 9= 57, - = 45, + = 43,  . = 46,  , = 44,  $= 36
            //home, end , left, right 35 36 37 38
            //backspace 8, enter 13,  tab 9 , esc 27,  delete  46
            //var validChars = [   45, 46,   48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
            //if ( $.inArray(e.which, validChars) == -1 ) {
            //    e.preventDefault();
            //    e.stopPropagation();
            //    return false;
            //}
            //alert(e.which);
            $('#log').val($('#log').val() +  e.which  + ':DN ');
           // alert('after return false');
            //return false;

        });

        $(".money").on("keyup.money", function (e) {
            var validControlChars = [35,36,37,38, ];
            //alert(e.which);
            var $this = $(this);
            var pos = $this.caret();
            mv = commafy2($this.val());
            $this.val(mv.value);
            //$this.caret(pos + mv.caret);

            //$(this).EvalMoney();
            //$(this).caret(pos);            
            $('#log').val($('#log').val() + 'Up' + '\n\r');

        });

        //$(".money").on("blur.money", function (e) {
        //    $(this).moneyHooked();
        //});

        $("body").on("append", function (e) {
            //var arg0 = e.args[0];
            //alert($(e.args[0]).prop('outerHTML'));
            //alert(e.args);
            alert(e.target.outerHTML )
            $(".money:not(.isHooked)").moneyHooked();
        });
        //$(this).on("blur.money", function () {
        //    $(".money:not(.isHooked)").moneyHooked();
        //});
        return $(this).moneyHooked();

        //return this
        //.each(function () {
        //    $(this)
        //    .on('mouseenter',
        //        function () {
        //            $('body')
        //            .append(element);
        //        })
        //    .on('mouseleave',
        //        function () {
        //            element.remove();
        //        });
        //});
       

        //this.bind("blur.money", function () {
        //    //alert('clicked');
        //    $(this).ToMoney();
        //});

        //$("body").on("change", function () {
        //    $(this).ToMoney();
        //});

        //$("body").on("focus", ".money", function () {
        //    $(this).ToMoney();
        //});

        



       // return $(this).ToMoney().blur($.fn.money.blur).keyup($.fn.money.keyup);
    }

    //$.fn.money.keyup = function()
    //{
    //    //$(this).ToMoney();
    //    return this;
    //}
    //$.fn.money.blur = function ()
    //{
    //    $(this).ToMoney();
    //    return this;
    //}

    //$.fn.rVal = function () {
    //    if (this[0]) {
    //        var ele = $(this[0]);
    //        if (ele.hasClass('money')) {
    //            return $(this).MoneyToFloat() ;
    //        } else {
    //            return ele.val();
    //        }
    //    }
    //    return undefined;
    //};
    //jQuery.fn.xVal = jQuery.fn.val;
    //jQuery.fn.val = function (value) {
    //    if (value != undefined) {
    //        return this.xVal(value);
    //    }
    //    if (this[0]) {
    //        var ele = $(this[0]);
    //        if (ele.hasClass('money')) {
    //            return $(this).MoneyToFloat();
    //        } else {
    //            return ele.xVal();
    //        }
    //    }
    //    return undefined;
    //};



    $.fn.EvalMoney = function () {
        if ($(this).length > 0) {
            var T = '';            
            if ($(this).val().length > 0) {
                T = T + $(this).val();                
            }
            if (T.indexOf('$') >= 0) {
                T = T.replace(/\$/g, '');
            }
            if (T.indexOf(',') >= 0) {
                T = T.replace(/\,/g, '');
            }
            if (!isNaN(T) && isFinite(T) & T != '' ) {
                if (T >= 0) {
                    $(this).val('$' + parseFloat(T).toFixed(2));
                    $(this).commafy();
                }
                else {
                    $(this).val('-$' + parseFloat(-1 * T).toFixed(2));
                    $(this).commafy();
                }
            }
            else if( T != '')  {
                $(this).val('$0.00');
            }            
        }
        else {
            $(this).val('$0.00');
        }
        return this;
    };

  

    $.fn.MoneyToFloat = function () {
        if ($(this).length > 0 && $(this).val().length > 0) {
            T = $(this).val();
            if (T.indexOf('$') >= 0) {
                T = T.replace(/\$/g, '');
            }
            if (T.indexOf(',') >= 0) {
                T = T.replace(/\,/g, '');
            }
            return parseFloat((!isNaN(T) && isFinite(T)) ? T : 0);
        }
        else {
            return 0;
        }
    };

    commafy2 = function (nStr) {

        //var regex = new RegExp(/\./g)
        //var count = "This is some text .".match(regex).length;

        nStr += '';
        origcount = nStr.replace(/\,/g, '').length;

        nStr = nStr.replace(/\$/g, '');
        nStr = nStr.replace(/\,/g, '');
        
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        var count = 0;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
            count++;
        }
        caretmovecount= 1;
        if(origcount < count) {
            caretmovecount = 2;
        }
        return ({ "value": '$' + x1 + x2, "caret": caretmovecount });
    };


    $.fn.commafy = function () {
        nStr = $(this).val();
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        $(this).val(x1 + x2);
    };


    //$.fn.AddDealer = function (update_id) {
    //    this.bind("click.AddDealer", function () {
    //        //$(update_id).html("content_upated");
    //        //alert("test" +  this.id);
    //        var Data = JSON.stringify($('#aspnetForm').find("input,textarea,select,hidden").not("#AppRoot,#__EVENTTARGET,#__EVENTARGUMENT,#__VIEWSTATE,#__EVENTVALIDATION").serializeObject());
    //        //$('#dvSessionExpired').text(Data);
    //        Submit(Data);
    //        return false;
    //    });

    //};
    //alert('xo');



    //$(".money").each(function (i) {
    //    $(this).ToMoney();
    //    $('#log').val($('#log').val() + i);
    //    $(this).cl();

    //});

   


})(jQuery);

