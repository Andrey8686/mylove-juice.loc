$(function ($) {


    $(".nicescroll-block").niceScrollExt({
        cursorwidth : 12,
        cursorcolor : "#8d181b",
        cursoropacitymin : 1,
        cursorborder : "2px solid #fad970",
        railpadding : {
            top:0,
            right: -8,
            left:0,
            bottom:0
        }
    });




    $(document).mouseup(function (e) {
        var menuBtn = $(".navbar > button");
        var container = $(".navbar > div");
        if (container.has(e.target).length === 0 && menuBtn.attr("aria-expanded") == "true" && $(window).width() < 992){
            menuBtn.click();
        }
    });


    NiceText();


    TitlePageHtemeInit();

    $("input[type=radio]").RadioTheme();
    $("input[type=checkbox]").CheckboxTheme();
    SelectTheme.Init();




    $('.carousel').carousel({
        interval: false
    });



    $(".nicescroll-block-lk").niceScrollCor({
        xl: 540,
        lg: 540,
        md: 520,
        sm: "auto",
        xs: "auto",
    });

    $(".nicescroll-block-pomosch").niceScrollCor2({
        xl: 110,
        lg: 100,
        md: 90,
        sm: "auto",
        xs: "auto",
    });

    $(".nicescroll-block-winners").niceScrollCor({
        xl: 300,
        lg: 300,
        md: 260,
        sm: "auto",
        xs: "auto",
    });

    AskQuestion.Init();



    $("input[type=file]").each(function () {
        var input = $(this);
        var label = $(this).prev().find("> span");
        input.change(function () {
            var ar = $(this).val().split('\\');
            label.text(ar[ar.length - 1]);
        });
    });


    $(".page-winners .btn-collapse-block").click(function () {
        $(this).find("span").text($(this).attr("aria-expanded") == "true" ? "+" : "-");
    });







    $(".timer").TimeLeft();
    $("[data-reason]").Reason();



    $(".feedback__form").FormValidation();




});






$.fn.FormValidation = function () {
    var main = $(this);
    var submit = main.find("button, :submit, :button");
    var fields = main.find("[required]");

    var errorWin = "" +
        "<div class=\"modal fade\" id=\"form-error\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"\" aria-hidden=\"true\">\n" +
        "    <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n" +
        "        <div class=\"modal-content\">\n" +
        "            <span class=\"icon-close\" data-dismiss=\"modal\"></span>\n" +
        "            <h2>Ошибка!</h2>\n" +
        "            <div class=\"form-error-text ml-4 mr-4 mb-4\"></div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</div>";

    if (!$("body").find(".form-error").length) $("body").append(errorWin);

    submit.click(function () {
        var errAr = [];

        for (var i = 0; i < fields.length; i++) {
            var fild = fields[i];
            if (fild.tagName.toLowerCase() == "input") {
                if ($(fild).attr("type") == "email") {
                    if ($(fild).hasAttr("data-ifempty") && $(fild).data("ifempty").length && !$(fild).val().length) {
                        errAr.push($(fild).data("ifempty"));
                    }
                    else if ($(fild).hasAttr("data-ifnotmatch") && $(fild).data("ifnotmatch").length && !$(fild).val().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {
                        errAr.push($(fild).data("ifnotmatch"));
                    }
                }
                else if ($(fild).attr("type") == "checkbox") {
                    if ($(fild).hasAttr("data-ifempty") && $(fild).data("ifempty").length && !$(fild).is(":checked")) {
                        errAr.push($(fild).data("ifempty"));
                    }
                }
                else if ($(fild).attr("type") == "file") {
                    if ($(fild).hasAttr("data-ifempty") && $(fild).data("ifempty").length && !$(fild).val().length) {
                        errAr.push($(fild).data("ifempty"));
                    }
                    else if ($(fild).hasAttr("data-ifnotmatch") && $(fild).data("ifnotmatch").length && $(fild).val().length && $(fild).attr("accept").length && !($(fild).attr("accept").indexOf(fild.files[0].type) + 1)) {
                        errAr.push($(fild).data("ifnotmatch"));
                    }
                }
            }
            else if (fild.tagName.toLowerCase() == "select") {
                if ($(fild).hasAttr("data-ifempty") && $(fild).data("ifempty").length && !$(fild).val().length) {
                    errAr.push($(fild).data("ifempty"));
                }
            }
            else if (fild.tagName.toLowerCase() == "textarea") {
                if ($(fild).hasAttr("data-ifempty") && $(fild).data("ifempty").length && !$(fild).val().length) {
                    errAr.push($(fild).data("ifempty"));
                }
            }
        }


        if (errAr.length) {
            $("#form-error").modal("show").find(".modal-content > div").html(errAr.join(",<br />") + ".");
            return false;
        }
    });
};










$.fn.Reason = function () {
    var main = $(this);
    var body = $("body");

    var reason = body.find(".lk-reason");

    if (!reason.length) {
        body.append("<div class='lk-reason'><div><span></span><img src='/images/reason-arrow.png' alt='' /></div></div>");
        reason = body.find(".lk-reason");
    }

    main.mousemove(function (e) {
        reason.css({top:e.pageY - 40,left:e.pageX}).show().find("span").text($(this).data("reason"));
    });
    main.mouseleave(function (e) {
        reason.hide();
    });

};





$.fn.TimeLeft = function () {
    var main = $(this);
    var d = main.find(".day");
    var h = main.find(".hour");
    var m = main.find(".min");

    var date1 = new Date("11/1/2018");

    setTime();
    setInterval(setTime, 1000);

    function setTime() {
        var date2 = new Date();
        var t = Math.abs((date1.getTime() - date2.getTime()) / 1000);

        var dd = Math.floor(t / (3600 * 24));
        var hh = Math.floor((t - 3600 * 24 * dd) / 3600);
        var mm = Math.floor((t - (3600 * 24 * dd + 3600 * hh)) / 60) + 1;

        d.text(dd);
        h.text(hh < 10 ? "0"+ hh : hh);
        m.text(mm < 10 ? "0"+ mm : mm);
    }

};













var AskQuestion = {
    Flag: false,
    IsOpen: false,
    Init: function () {
        this.main = $(".ask-question");
        this.btn = this.main.find(".aq-btn");

        this.btn.click(function () {
            if (AskQuestion.IsOpen) {
                AskQuestion.Close();
            }
            else {
                AskQuestion.Open();
            }
        });
    },
    Open: function () {
        if (this.Flag) return;
        this.Flag = true;
        AskQuestion.main.animate({right: "-4px"}, 200, function () {
            AskQuestion.Flag = false;
            AskQuestion.IsOpen = true;

        });
    },
    Close: function () {
        if (this.Flag) return;
        this.Flag = true;
        AskQuestion.main.animate({right: "-238px"}, 200, function () {
            AskQuestion.Flag = false;
            AskQuestion.IsOpen = false;
        });
    }
};






var UwsWidget = {
    InitDefault: function() {
        UwsWidget.buttons = {}
        UwsWidget.inputText = {};



        UwsWidget.main = $(".uws-widget");
        UwsWidget.inputText = UwsWidget.main.find("input[name=captcha], input[type=email], input[type=password], input[type=tel], input[type=text]");
        UwsWidget.buttons = UwsWidget.main.find("button");
        UwsWidget.main.find(".uws-dialog *[class!=checkbox-block]").removeAttr("class");


        $(UwsWidget.buttons[0]).addClass("icon-close");
    },
    ClosingListener: function() {
        $("body").removeAttr("style").removeClass("modal-open");
    },
    AddClosingListener: function() {
        $("body").addClass("modal-open");
        $(".uws-dialog-backdrop").click(UwsWidget.ClosingListener);
        $(UwsWidget.buttons[0]).click(UwsWidget.ClosingListener);
    },
    SetPlaceholder: function() {
        UwsWidget.inputText.each(function () {
            var label = $($(this).prev("label")).remove();
            $(this).attr("placeholder", label.text());
        });
    },
    SignIn: function () {
        this.intervalId = setInterval(function () {
            UwsWidget.InitDefault();
            if (UwsWidget.inputText.length == 2 && UwsWidget.buttons.length == 8) {
                clearInterval(UwsWidget.intervalId);


                UwsWidget.AddClosingListener();



                UwsWidget.SetPlaceholder();

                UwsWidget.main.find("h1").text("Вход");

                $(UwsWidget.buttons[1]).addClass("btn-fb").html("<img src='/images/btn-fb.png'>").attr("onclick", "UwsWidget.CheckForm()");
                $(UwsWidget.buttons[2]).addClass("btn-ok").html("<img src='/images/btn-ok.png'>").attr("onclick", "UwsWidget.CheckForm()");
                $(UwsWidget.buttons[3]).addClass("btn-vk").html("<img src='/images/btn-vk.png'>").attr("onclick", "UwsWidget.CheckForm()");

                $(UwsWidget.buttons[4]).addClass("button-theme order-1").html("<span><span>" + $(UwsWidget.buttons[4]).text() + "</span></span>");
                $(UwsWidget.buttons[6]).addClass("button-theme order-4").html("<span><span>" + $(UwsWidget.buttons[6]).text() + "</span></span>").attr("onclick", "UwsWidget.SignUp()");

                $(UwsWidget.buttons[5]).addClass("btn btn-link order-2").attr("onclick", "UwsWidget.RestorePassword()");
                $(UwsWidget.buttons[7]).addClass("btn btn-link order-3").attr("onclick", "UwsWidget.ConfirmEmail()");
            }
        }, 10);
    },
    CheckForm: function() {
        UwsWidget.main = $(".uws-widget");
        if (UwsWidget.main.find("#uws-sign-in").length) {
            UwsWidget.SignIn();
        }
        else {
            UwsWidget.SignUp();
        }
    },
    UpdateProfile: function () {
        this.intervalId = setInterval(function () {
            UwsWidget.InitDefault();


            if (UwsWidget.inputText.length == 5 && UwsWidget.buttons.length == 5) {
                clearInterval(UwsWidget.intervalId);

                UwsWidget.AddClosingListener();

                UwsWidget.SetPlaceholder();

                UwsWidget.main.find("input[type=checkbox]").CheckboxTheme();

                UwsWidget.main.find("input[name=captcha]").attr("type", "text");

                $(UwsWidget.buttons[1]).addClass("btn-fb").html("<img src='/images/btn-fb.png'>");
                $(UwsWidget.buttons[2]).addClass("btn-ok").html("<img src='/images/btn-ok.png'>");
                $(UwsWidget.buttons[3]).addClass("btn-vk").html("<img src='/images/btn-vk.png'>");

                $(UwsWidget.buttons[4]).addClass("button-theme").html("<span><span>" + $(UwsWidget.buttons[4]).text() + "</span></span>");
            }
        }, 10);
    },
    SignUp: function () {
        this.intervalId = setInterval(function () {
            UwsWidget.InitDefault();


            if (UwsWidget.inputText.length == 6 && UwsWidget.buttons.length == 7) {
                clearInterval(UwsWidget.intervalId);

                UwsWidget.AddClosingListener();

                UwsWidget.SetPlaceholder();

                UwsWidget.main.find("input[type=radio]").RadioTheme();
                UwsWidget.main.find("input[type=checkbox]").CheckboxTheme();

                $(UwsWidget.main.find(".checkbox-block label")[0]).html("Я согласен с <a href=\"//mylove-juice.ru/files/rules.pdf\" target=\"_blank\">Правилами Акции</a>");

                UwsWidget.main.find("input[name=captcha]").attr("type", "text");



                $(UwsWidget.buttons[1]).addClass("btn-fb").html("<img src='/images/btn-fb.png'>").attr("onclick", "UwsWidget.CheckForm()");
                $(UwsWidget.buttons[2]).addClass("btn-ok").html("<img src='/images/btn-ok.png'>").attr("onclick", "UwsWidget.CheckForm()");
                $(UwsWidget.buttons[3]).addClass("btn-vk").html("<img src='/images/btn-vk.png'>").attr("onclick", "UwsWidget.CheckForm()");



                $(UwsWidget.buttons[4]).addClass("refresh").html("<span class='icon-refresh'><span>");

                $(UwsWidget.buttons[5]).addClass("button-theme").html("<span><span>" + $(UwsWidget.buttons[5]).text() + "</span></span>");

                $(UwsWidget.buttons[6]).addClass("btn btn-link").attr("onclick", "UwsWidget.SignIn()");
            }
        }, 10);
    },
    RestorePassword: function () {
        this.intervalId = setInterval(function () {
            UwsWidget.InitDefault();
            if (UwsWidget.buttons.length == 3 && UwsWidget.inputText.length == 2) {
                clearInterval(UwsWidget.intervalId);

                UwsWidget.AddClosingListener();

                UwsWidget.SetPlaceholder();

                UwsWidget.main.find("h1").text("Восстановление").after("<h1>пароля</h1>");

                $(UwsWidget.inputText[1]).parent().hide();


                $(UwsWidget.buttons[1]).addClass("button-theme").html("<span><span>" + $(UwsWidget.buttons[1]).text() + "</span></span>");

                $(UwsWidget.buttons[2]).addClass("btn btn-link").attr("onclick", "UwsWidget.SignIn()");
            }
        }, 10);
    },
    DropPassword: function () {
        this.intervalId = setInterval(function () {
            UwsWidget.InitDefault();
            if (UwsWidget.inputText.length == 2) {
                clearInterval(UwsWidget.intervalId);

                UwsWidget.AddClosingListener();

                UwsWidget.SetPlaceholder();

                $(UwsWidget.buttons[1]).addClass("button-theme").html("<span><span>" + $(UwsWidget.buttons[1]).text() + "</span></span>");
            }
        }, 10);
    },
    ConfirmEmail: function () {
        this.intervalId = setInterval(function () {
            UwsWidget.InitDefault();
            if (UwsWidget.buttons.length == 2 && UwsWidget.inputText.length == 1) {
                clearInterval(UwsWidget.intervalId);

                UwsWidget.AddClosingListener();

                UwsWidget.SetPlaceholder();

                UwsWidget.main.find("h1").text("Подтверждение").after("<h1>e-mail</h1>");

                $(UwsWidget.buttons[1]).addClass("button-theme").html("<span><span>" + $(UwsWidget.buttons[1]).text() + "</span></span>");
            }
        }, 10);
    },
    ConfirmPhone: function () {
        this.intervalId = setInterval(function () {
            UwsWidget.InitDefault();
            if (UwsWidget.inputText.length) {
                clearInterval(UwsWidget.intervalId);

                UwsWidget.AddClosingListener();

                UwsWidget.SetPlaceholder();

                UwsWidget.main.find("h1").text("Подтверждение").after("<h1>телефона</h1>");

                $(UwsWidget.buttons[1]).addClass("button-theme").html("<span><span>" + $(UwsWidget.buttons[1]).text() + "</span></span>");
            }
        }, 10);
    }
};







$.fn.niceScrollCor = function (e) {
    var main = $(this);


    if (main.length) {

        setInterval(Check, 100)


        $(window).resize(Check);



        function Check() {
            var w = $(window);
            if (w.width() >= 1200) {
                main.height(e.xl == "auto" ? "auto" : w.height() - e.xl);
            }
            else if (w.width() >= 992) {
                main.height(e.lg == "auto" ? "auto" : w.height() - e.lg);
            }
            else if (w.width() >= 768) {
                main.height(e.md == "auto" ? "auto" : w.height() - e.md);
            }
            else if (w.width() >= 576) {
                main.height(e.sm == "auto" ? "auto" : w.height() - e.sm);
            }
            else {
                main.height(e.xs == "auto" ? "auto" : w.height() - e.xs);
            }
        }
    }
};




function c(t) {
    console.log(t);
}

$.fn.niceScrollCor2 = function (e) {
    var main = $(this);


    if (main.length) {

        var idI = setInterval(function () {
            main.height(1);
        }, 10);


        setInterval(Check, 100);

        $(window).resize(function () {
            main.height(300);
            Check();
        });



        function Check() {
            clearInterval(idI);

            var w = $("main");
            if (w.width() >= 1200) {
                main.height(e.xl == "auto" ? "auto" : w.height() - e.xl);
            }
            else if (w.width() >= 992) {
                main.height(e.lg == "auto" ? "auto" : w.height() - e.lg);
            }
            else if (w.width() >= 768) {
                main.height(e.md == "auto" ? "auto" : w.height() - e.md);
            }
            else if (w.width() >= 576) {
                main.height(e.sm == "auto" ? "auto" : w.height() - e.sm);
            }
            else {
                main.height(e.xs == "auto" ? "auto" : w.height() - e.xs);
            }
        }
    }
};






$.fn.niceScrollExt = function (e) {
    var main = $(this);
    var wraper = $(this).find("> div");


    if (main.length) {
        main.niceScroll(e);
        setInterval(function () {
            main.getNiceScroll().resize();
            if (main.height() >= wraper.height()) {
                $(".nicescroll-rails-vr").hide();
                main.css({
                    "touch-action" : "manipulation"
                });
            } else {
                $(".nicescroll-rails-vr").show();
                main.css({
                    "touch-action" : "none"
                });
            }
        }, 100);
    }
};







function TitlePageHtemeInit() {
    $(".title-page").each(function () {
        var main = $(this);
        if (!main.find(".title-page-shadow").length) {
            main.html(main.text() + "<span class=\"title-page-shadow\">" + main.text() + "</span>");
        }
    });
}

function NiceText() {
    $(".nice-text").each(function () {
        var main = $(this);
        if (!main.find(".title-page-shadow").length) {
            main.html(main.html() + "<span class=\"nice-text-shadow\">" + main.html() + "</span>");
        }
    });
}



$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};


$.fn.CheckboxTheme = function () {
    $(this).each(function () {
        var main = $(this);
        var  mainParent = main.parent();
        var label = mainParent.find("label");

        if (mainParent.hasClass("checkbox-block")) {
            return false;
        }

        mainParent.addClass("checkbox-block").prepend("<i></i>");
        if (main.hasAttr("id") && label.length) label.attr("for", main.attr("id"));

        if (main.is(":checked") && main.is(":disabled")) {
            mainParent.addClass("checked-disabled");
        }
        else if (!main.is(":checked") && main.is(":disabled")) {
            mainParent.addClass("disabled");
        }
        else if (main.is(":checked") && !main.is(":disabled")) {
            mainParent.addClass("checked");
        }

        mainParent.find("label").removeAttr("for");

        mainParent.find("i").click(function () {


            if (main.is(":disabled")) return false;

            main.click();

            if (!main.is(":checked")) {
                //main.prop("checked", false);
                mainParent.removeClass("checked");
            }
            else {
                //main.prop("checked", true);
                mainParent.addClass("checked");
            }
            return false;
        });
    });
};


$.fn.RadioTheme = function () {
    $(this).each(function () {
        var main = $(this);
        var mainParent = main.parent();

        if (mainParent.hasClass("theme-radio")) return false;

        mainParent.addClass("theme-radio").prepend("<i></i>");

        if (main.hasAttr("checked") && main.hasAttr("disabled")) mainParent.addClass("checked-disabled");
        else if (!main.hasAttr("checked") && main.hasAttr("disabled")) mainParent.addClass("disabled");
        else if (main.hasAttr("checked") && !main.hasAttr("disabled")) mainParent.addClass("checked");

        mainParent.find("label").removeAttr("for");

        mainParent.find("i").click(function () {

            var input = $(this).parent().find("input");
            var name = input.attr("name");
            var allInputs = $("input[name=" + name + "]");
            allInputs.each(function () {
                $(this).prop("checked", false).parent().removeClass("checked");
            });
            input.prop("checked", true).parent().addClass("checked");
        });
    });
};


var SelectTheme = {
    Flag: false,
    Init: function () {
        this.Build();
        $(document).click(function (e) {
            SelectTheme.main.each(function () {
                var b = $(this).parent();
                if (!b.has(e.target).length) b.find("ul").hide();
            });
        });
    },
    Reload: function (id) {
        $(id).parent().parent().html($(id).remove());
        SelectTheme.Init();
    },
    Build: function () {
        this.main = $("select");
        this.main.each(function () {
            var main = $(this);
            if ($(this).parent().hasClass("theme_select")) return true;
            $(this).wrap("<div class='theme_select'></div>");
            var optionAr = $(this).find("option");
            var defaultOptions = $(this).find(":selected").text();
            defaultOptions = defaultOptions.length ? defaultOptions : $(this).hasAttr("placeholder") ? $(this).attr("placeholder") : "";
            var newSelect = "<div onclick='SelectTheme.OpenList(this)'><div class='ts_selected_item'>" + defaultOptions + "</div><div class='ts_arrow'><span class='icon-arrow-down'></span></div></div><ul class='ts_list'>";
            for (var i = 0; i < optionAr.length; i++) {
                if ($(optionAr[i]).is(":selected")) {
                    newSelect += "<li class='selected' value='" + $(optionAr[i]).val() + "'>" + $(optionAr[i]).text() + "</li>";
                }
                else {
                    newSelect += "<li value='" + $(optionAr[i]).val() + "'>" + $(optionAr[i]).text() + "</li>";
                }
            }
            newSelect += "</ul>";

            $(this).parent().append(newSelect);

            main.parent().find("ul li").click(function () {
                main.find("[selected]").prop("selected", false);
                main.parent().find("[class=selected]").removeAttr("class");
                $(this).addClass("selected");
                main.parent().find(".ts_selected_item").html(main.find($(this).attr("value").length ? "[value=" + $(this).attr("value") + "]" : "option:first-child").prop("selected", true).html());
                $(this).parent().hide();
                main.change();
            });

            SelectTheme.Cor(main);
            $(window).resize(function() {
                SelectTheme.Cor(main);
            });
        });
    },
    Cor: function (main) {
        var w = main.parent().width();
        main.parent().find(".ts_selected_item").width(w - 32 - 40);
    },
    OpenList: function (btn) {
        SelectTheme.Flag = true;
        var list = $(btn).next();
        if (list.is(":visible")) list.hide();
        else list.show();
        SelectTheme.Flag = false;
    }
};
function afterOpenPopup() {
}