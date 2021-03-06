(function(w, d) {
    var atc_url = "//addtocalendar.com/atc/"
      , atc_version = "1.5"
      , b = d.documentElement;
    if (!Array.indexOf) {
        Array.prototype.indexOf = function(e) {
            for (var t = 0, n = this.length; t < n; t++) {
                if (this[t] == e) {
                    return t
                }
            }
            return -1
        }
    }
    if (!Array.prototype.map) {
        Array.prototype.map = function(e) {
            var t = [];
            for (var n = 0, r = this.length; n < r; n++) {
                t.push(e(this[n]))
            }
            return t
        }
    }
    var isArray = function(e) {
        return Object.prototype.toString.call(e) === "[object Array]"
    }
    ;
    var isFunc = function(e) {
        return Object.prototype.toString.call(e) === "[object Function]"
    }
    ;
    var ready = function(e, t) {
        function u() {
            if (!n) {
                if (!t.body)
                    return setTimeout(u, 13);
                n = true;
                if (i) {
                    var e, r = 0;
                    while (e = i[r++])
                        e.call(null );
                    i = null
                }
            }
        }
        function a() {
            if (r)
                return;
            r = true;
            if (t.readyState === "complete")
                return u();
            if (t.addEventListener) {
                t.addEventListener("DOMContentLoaded", s, false);
                e.addEventListener("load", u, false)
            } else {
                if (t.attachEvent) {
                    t.attachEvent("onreadystatechange", s);
                    e.attachEvent("onload", u);
                    var n = false;
                    try {
                        n = e.frameElement == null
                    } catch (i) {}
                    if (b.doScroll && n)
                        f()
                } else {
                    o = e.onload;
                    e.onload = function(e) {
                        o(e);
                        u()
                    }
                }
            }
        }
        function f() {
            if (n)
                return;
            try {
                b.doScroll("left")
            } catch (e) {
                setTimeout(f, 1);
                return
            }
            u()
        }
        var n = false, r = false, i = [], s, o;
        if (t.addEventListener) {
            s = function() {
                t.removeEventListener("DOMContentLoaded", s, false);
                u()
            }
        } else {
            if (t.attachEvent) {
                s = function() {
                    if (t.readyState === "complete") {
                        t.detachEvent("onreadystatechange", s);
                        u()
                    }
                }
            }
        }
        return function(e) {
            a();
            if (n) {
                e.call(null )
            } else {
                i.push(e)
            }
        }
    }(w, d);
    if (w.addtocalendar && typeof w.addtocalendar.start == "function")
        return;
    if (!w.addtocalendar)
        w.addtocalendar = {};
    addtocalendar.languages = {
        de: "In den Kalender",
        en: "Add to Calendar",
        es: "Añadir al Calendario",
        fr: "Ajouter au calendrier",
        hi: "कैलेंडर में जोड़ें",
        "in": "Tambahkan ke Kalender",
        ja: "カレンダーに追加",
        ko: "캘린더에 추가",
        pt: "Adicionar ao calendário",
        ru: "Добавить в календарь",
        uk: "Додати в календар",
        zh: "添加到日历"
    };
    addtocalendar.calendar_urls = {};
    addtocalendar.loadSettings = function(element) {
        var settings = {
            language: "auto",
            "show-list-on": "click",
            calendars: ["iCalendar", "Google Calendar", "Outlook", "Outlook Online", "Yahoo! Calendar"],
            secure: "auto",
            "on-button-click": function() {},
            "on-calendar-click": function() {}
        };
        for (var option in settings) {
            var pname = "data-" + option;
            var eattr = element.getAttribute(pname);
            if (eattr != null ) {
                if (isArray(settings[option])) {
                    settings[option] = eattr.replace(/\s*,\s*/g, ",").replace(/^\s+|\s+$/g, "").split(",");
                    continue
                }
                if (isFunc(settings[option])) {
                    var fn = window[eattr];
                    if (isFunc(fn)) {
                        settings[option] = fn
                    } else {
                        settings[option] = eval("(function(mouseEvent){" + eattr + "})")
                    }
                    continue
                }
                settings[option] = element.getAttribute(pname)
            }
        }
        return settings
    }
    ;
    addtocalendar.load = function() {
        ready(function() {
            var e = {
                iCalendar: "ical",
                "Google Calendar": "google",
                Outlook: "outlook",
                "Outlook Online": "outlookonline",
                "Yahoo! Calendar": "yahoo"
            };
            var t = -(new Date).getTimezoneOffset().toString();
            var n = addtocalendar.languages;
            var r = document.getElementsByTagName("*");
            for (var i = 0; i < r.length; i++) {
                var s = r[i].className;
                if (s.length && s.split(" ").indexOf("addtocalendar") != -1) {
                    var o = addtocalendar.loadSettings(r[i]);
                    var u = o["calendars"].length == 1;
                    var a = "http:";
                    if (o["secure"] == "auto") {
                        a = location.protocol == "https:" ? "https:" : "http:"
                    } else if (o["secure"] == "true") {
                        a = "https:"
                    }
                    var f = a + atc_url;
                    var l = r[i].id;
                    var c = n["en"];
                    if (o["language"] == "auto") {
                        var h = "no_lang";
                        if (typeof navigator.language === "string") {
                            h = navigator.language.substr(0, 2)
                        } else if (typeof navigator.browserLanguage === "string") {
                            h = navigator.browserLanguage.substr(0, 2)
                        }
                        if (n.hasOwnProperty(h)) {
                            c = n[h]
                        }
                    } else if (n.hasOwnProperty(o["language"])) {
                        c = n[o["language"]]
                    }
                    var p = ["utz=" + t, "uln=" + navigator.language, "vjs=" + atc_version];
                    var d = r[i].getElementsByTagName("var");
                    var v = -1;
                    for (var m = 0; m < d.length; m++) {
                        var g = d[m].className.replace("atc_", "");
                        var y = d[m].innerHTML;
                        if (g == "event") {
                            v++;
                            continue
                        }
                        if (g == d[m].className) {
                            if (g == "atc-body") {
                                c = y
                            }
                            continue
                        }
                        if (v == -1) {
                            continue
                        }
                        p.push("e[" + v + "][" + g + "]" + "=" + encodeURIComponent(y))
                    }
                    var b = l == "" ? "" : l + "_link";
                    var w = document.createElement("ul");
                    w.className = "atcb-list";
                    var E = "";
                    var S = "";
                    for (var x in o["calendars"]) {
                        if (!e.hasOwnProperty(o["calendars"][x])) {
                            continue
                        }
                        var T = e[o["calendars"][x]];
                        var N = l == "" ? "" : 'id="' + l + "_" + T + '_link"';
                        var C = f + T + "?" + p.join("&");
                        if (u) {
                            S = C
                        } else {
                            E += '<li class="atcb-item"><a ' + N + ' class="atcb-item-link" href="' + C + '" target="_blank">' + o["calendars"][x] + "</a></li>"
                        }
                    }
                    w.innerHTML = E;
                    if (r[i].getElementsByClassName("atcb-link")[0] == undefined) {
                        var k = document.createElement("a");
                        k.className = "atcb-link";
                        k.innerHTML = c;
                        k.id = b;
                        k.tabIndex = 1;
                        if (u) {
                            k.href = S;
                            k.target = "_blank"
                        }
                        r[i].appendChild(k);
                        if (!u) {
                            r[i].appendChild(w)
                        }
                    } else {
                        var k = r[i].getElementsByClassName("atcb-link")[0];
                        if (!u) {
                            k.parentNode.appendChild(w)
                        }
                        k.tabIndex = 1;
                        if (k.id == "") {
                            k.id = b
                        }
                        if (u) {
                            k.href = S;
                            k.target = "_blank"
                        }
                    }
                    r[i].getElementsByClassName("atcb-link")[0].addEventListener("click", o["on-button-click"], false);
                    var L = r[i].getElementsByClassName("atcb-item-link");
                    for (var m = 0; m < L.length; m++) {
                        L[m].addEventListener("click", o["on-calendar-click"], false)
                    }
                }
            }
        })
    }
    ;
    addtocalendar.load()
})(window, document)
